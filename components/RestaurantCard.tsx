'use client';

import { AREA_MAP, CUISINE_MAP, type CuisineMeta } from '@/lib/constants';
import type { Restaurant } from '@/lib/types';
import { formatDistance, haversineKm, type LatLng } from '@/lib/geo';
import { translateTag } from '@/lib/i18n';
import { useLang } from './LangContext';

interface Props {
  restaurant: Restaurant;
  variant?: 'grid' | 'featured';
  userLocation?: LatLng | null;
  onClick: (r: Restaurant) => void;
}

export default function RestaurantCard({
  restaurant,
  variant = 'grid',
  userLocation,
  onClick,
}: Props) {
  const { lang } = useLang();
  const cuisine = CUISINE_MAP[restaurant.cuisine];
  const area = AREA_MAP[restaurant.area];
  const areaLabel = lang === 'en' ? area.label_en : area.label_zh;

  const primaryName = lang === 'en' ? restaurant.name_romaji : restaurant.name_jp;
  const secondaryName =
    lang === 'en'
      ? restaurant.name_jp
      : `${restaurant.name_zh} · ${restaurant.name_romaji}`;
  const description =
    lang === 'en'
      ? restaurant.description_en || restaurant.description_zh
      : restaurant.description_zh;

  const distanceKm =
    userLocation && restaurant.lat != null && restaurant.lng != null
      ? haversineKm(userLocation, { lat: restaurant.lat, lng: restaurant.lng })
      : null;

  if (variant === 'featured') {
    return (
      <button
        onClick={() => onClick(restaurant)}
        className="group flex w-72 shrink-0 flex-col overflow-hidden rounded-2xl border border-ink-100 bg-white text-left shadow-card transition hover:-translate-y-0.5 hover:shadow-cardHover"
      >
        <CoverImage restaurant={restaurant} className="h-40 w-full" />
        <div className="flex flex-1 flex-col gap-2 p-4">
          <CuisineTag cuisine={cuisine} lang={lang} />
          <div>
            <div className="line-clamp-1 font-display text-base font-bold text-ink-900">
              {primaryName}
            </div>
            <div className="line-clamp-1 text-xs text-ink-500">{secondaryName}</div>
          </div>
          <div className="flex items-center justify-between text-sm">
            <Rating rating={restaurant.google_rating} count={restaurant.review_count} />
            <LocationLabel area={areaLabel} distanceKm={distanceKm} lang={lang} />
          </div>
          <p className="line-clamp-2 text-xs leading-relaxed text-ink-600">
            {description}
          </p>
        </div>
      </button>
    );
  }

  return (
    <button
      onClick={() => onClick(restaurant)}
      className="group flex flex-col overflow-hidden rounded-2xl border border-ink-100 bg-white text-left shadow-card transition hover:-translate-y-0.5 hover:shadow-cardHover"
    >
      <CoverImage restaurant={restaurant} className="h-44 w-full" />
      <div className="flex flex-1 flex-col gap-2 p-4">
        <CuisineTag cuisine={cuisine} lang={lang} />

        <div>
          <div className="line-clamp-1 font-display text-lg font-bold text-ink-900">
            {primaryName}
          </div>
          <div className="line-clamp-1 text-xs text-ink-500">{secondaryName}</div>
        </div>

        <div className="flex items-center justify-between text-sm">
          <Rating rating={restaurant.google_rating} count={restaurant.review_count} />
          <LocationLabel area={areaLabel} distanceKm={distanceKm} lang={lang} />
        </div>

        <p className="line-clamp-2 text-sm leading-relaxed text-ink-600">
          {description}
        </p>

        {restaurant.tags.length > 0 && (
          <div className="mt-1 flex flex-wrap gap-1.5">
            {restaurant.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-ink-50 px-2 py-0.5 text-[11px] text-ink-600"
              >
                {translateTag(tag, lang)}
              </span>
            ))}
          </div>
        )}
      </div>
    </button>
  );
}

function CuisineTag({ cuisine, lang }: { cuisine: CuisineMeta; lang: 'zh' | 'en' }) {
  return (
    <span
      className={`inline-flex w-fit items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-medium ${cuisine.color}`}
    >
      <span>{cuisine.emoji}</span>
      <span>{lang === 'en' ? cuisine.label_en : cuisine.label_zh}</span>
    </span>
  );
}

function Rating({ rating, count }: { rating: number; count: number }) {
  return (
    <span className="inline-flex items-center gap-1 text-ink-800">
      <svg className="h-4 w-4 text-amber-400" viewBox="0 0 20 20" fill="currentColor">
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.957a1 1 0 00.95.69h4.162c.969 0 1.371 1.24.588 1.81l-3.367 2.446a1 1 0 00-.364 1.118l1.287 3.957c.3.922-.755 1.688-1.54 1.118l-3.366-2.446a1 1 0 00-1.176 0l-3.367 2.446c-.784.57-1.838-.196-1.539-1.118l1.287-3.957a1 1 0 00-.364-1.118L2.064 9.384c-.783-.57-.38-1.81.588-1.81h4.162a1 1 0 00.95-.69l1.285-3.957z" />
      </svg>
      <span className="font-semibold">{rating > 0 ? rating.toFixed(1) : '—'}</span>
      <span className="text-xs text-ink-500">({count.toLocaleString()})</span>
    </span>
  );
}

function LocationLabel({
  area,
  distanceKm,
  lang,
}: {
  area: string;
  distanceKm: number | null;
  lang: 'zh' | 'en';
}) {
  if (distanceKm != null) {
    const label =
      lang === 'en' ? formatDistance(distanceKm) : `直线 ${formatDistance(distanceKm)}`;
    return (
      <span className="inline-flex items-center gap-1 text-ink-500">
        <span>📍 {area}</span>
        <span className="rounded-full bg-brand-50 px-1.5 py-0.5 text-[11px] font-semibold text-brand-600">
          {label}
        </span>
      </span>
    );
  }
  return <span className="text-ink-500">📍 {area}</span>;
}

function CoverImage({ restaurant, className }: { restaurant: Restaurant; className?: string }) {
  if (restaurant.image_url) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={restaurant.image_url}
        alt={restaurant.name_jp}
        className={`object-cover transition group-hover:scale-[1.02] ${className ?? ''}`}
      />
    );
  }
  const cuisine = CUISINE_MAP[restaurant.cuisine];
  return (
    <div
      className={`flex items-center justify-center bg-gradient-to-br from-ink-100 to-ink-200 ${className ?? ''}`}
    >
      <span className="text-6xl opacity-70" aria-hidden>
        {cuisine.emoji}
      </span>
    </div>
  );
}
