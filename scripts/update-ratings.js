#!/usr/bin/env node
/**
 * Tokyo Gachi - Google Places auto-updater
 * ----------------------------------------
 * Reads data/restaurants.json and updates each entry with the latest
 * rating / review count / cover photo from the Google Places API.
 *
 *  - Entries whose `google_place_id` still starts with `CHANGE_ME_` will be
 *    auto-resolved by querying the Find Place endpoint using
 *    `name_jp + address`. The discovered place_id is then written back.
 *  - Photos are downloaded once and cached under public/images/<id>.jpg
 *    so the front-end never exposes the API key.
 *
 * Required env:
 *   GOOGLE_PLACES_API_KEY  - your Places API key (enable Places API in GCP)
 *
 * Usage:
 *   GOOGLE_PLACES_API_KEY=xxx node scripts/update-ratings.js
 */

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const DATA_PATH = path.join(ROOT, 'data', 'restaurants.json');
const IMAGES_DIR = path.join(ROOT, 'public', 'images');

const API_KEY = process.env.GOOGLE_PLACES_API_KEY;
if (!API_KEY) {
  console.error('❌  GOOGLE_PLACES_API_KEY env var is required.');
  process.exit(1);
}

const DETAILS_FIELDS = [
  'place_id',
  'name',
  'rating',
  'user_ratings_total',
  'formatted_address',
  'url',
  'photos',
].join(',');

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function findPlaceId(restaurant) {
  // Combine Japanese name + address for the best chance of a unique match
  const query = `${restaurant.name_jp} ${restaurant.address || ''}`.trim();
  const url = new URL('https://maps.googleapis.com/maps/api/place/findplacefromtext/json');
  url.searchParams.set('input', query);
  url.searchParams.set('inputtype', 'textquery');
  url.searchParams.set('fields', 'place_id,name,formatted_address');
  url.searchParams.set('language', 'zh-CN');
  url.searchParams.set('key', API_KEY);

  const res = await fetch(url);
  const json = await res.json();
  if (json.status !== 'OK' || !json.candidates?.length) {
    throw new Error(`Find Place failed for "${query}": ${json.status}`);
  }
  return json.candidates[0].place_id;
}

async function fetchPlaceDetails(placeId) {
  const url = new URL('https://maps.googleapis.com/maps/api/place/details/json');
  url.searchParams.set('place_id', placeId);
  url.searchParams.set('fields', DETAILS_FIELDS);
  url.searchParams.set('language', 'zh-CN');
  url.searchParams.set('key', API_KEY);

  const res = await fetch(url);
  const json = await res.json();
  if (json.status !== 'OK') {
    throw new Error(`Details API ${placeId}: ${json.status}`);
  }
  return json.result;
}

async function downloadPhoto(photoReference, outPath) {
  const url = new URL('https://maps.googleapis.com/maps/api/place/photo');
  url.searchParams.set('maxwidth', '800');
  url.searchParams.set('photoreference', photoReference);
  url.searchParams.set('key', API_KEY);

  const res = await fetch(url, { redirect: 'follow' });
  if (!res.ok) throw new Error(`Photo download failed: ${res.status}`);
  const buf = Buffer.from(await res.arrayBuffer());
  fs.writeFileSync(outPath, buf);
}

function todayIso() {
  return new Date().toISOString().slice(0, 10);
}

async function processRestaurant(r, idx, total) {
  const label = `[${idx + 1}/${total}] ${r.name_jp}`;
  try {
    // 1. Resolve place_id if needed
    let placeId = r.google_place_id;
    if (!placeId || placeId.startsWith('CHANGE_ME_')) {
      console.log(`🔎  ${label} – resolving place_id…`);
      placeId = await findPlaceId(r);
      r.google_place_id = placeId;
    }

    // 2. Pull latest details
    const details = await fetchPlaceDetails(placeId);
    if (typeof details.rating === 'number') r.google_rating = details.rating;
    if (typeof details.user_ratings_total === 'number') r.review_count = details.user_ratings_total;
    if (details.formatted_address) r.address = details.formatted_address;
    if (details.url) r.maps_url = details.url;

    // 3. Refresh photo (only if we don't already have a local one)
    const localImage = path.join(IMAGES_DIR, `${r.id}.jpg`);
    if (details.photos?.length && !fs.existsSync(localImage)) {
      try {
        if (!fs.existsSync(IMAGES_DIR)) fs.mkdirSync(IMAGES_DIR, { recursive: true });
        await downloadPhoto(details.photos[0].photo_reference, localImage);
        r.image_url = `/images/${r.id}.jpg`;
        console.log(`🖼   ${label} – saved cover photo`);
      } catch (err) {
        console.warn(`⚠️  ${label} – photo skipped: ${err.message}`);
      }
    } else if (fs.existsSync(localImage) && !r.image_url) {
      r.image_url = `/images/${r.id}.jpg`;
    }

    r.last_updated = todayIso();
    console.log(`✅  ${label} – ⭐ ${r.google_rating} (${r.review_count})`);
  } catch (err) {
    console.warn(`⚠️  ${label} – ${err.message}`);
  }

  // Gentle pacing – Places API allows ~50 QPS, we go way under that.
  await sleep(200);
}

async function main() {
  const raw = fs.readFileSync(DATA_PATH, 'utf8');
  const restaurants = JSON.parse(raw);

  console.log(`▶  Updating ${restaurants.length} restaurants…\n`);
  for (let i = 0; i < restaurants.length; i++) {
    await processRestaurant(restaurants[i], i, restaurants.length);
  }

  fs.writeFileSync(DATA_PATH, JSON.stringify(restaurants, null, 2) + '\n', 'utf8');
  console.log(`\n✨  Wrote ${DATA_PATH}`);
}

main().catch((err) => {
  console.error('Fatal:', err);
  process.exit(1);
});
