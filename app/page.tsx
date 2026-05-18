'use client';

import { useMemo, useState } from 'react';
import Header from '@/components/Header';
import FilterBar from '@/components/FilterBar';
import FeaturedSection from '@/components/FeaturedSection';
import RestaurantGrid, { type LocStatus, type SortBy } from '@/components/RestaurantGrid';
import RestaurantModal from '@/components/RestaurantModal';
import { useLang } from '@/components/LangContext';
import { AREA_MAP, CUISINE_MAP } from '@/lib/constants';
import { haversineKm, type LatLng } from '@/lib/geo';
import type { AreaId, CuisineId, Restaurant } from '@/lib/types';
import data from '@/data/restaurants.json';

const RESTAURANTS = data as Restaurant[];

function distanceOf(loc: LatLng, r: Restaurant): number {
  if (r.lat == null || r.lng == null) return Infinity;
  return haversineKm(loc, { lat: r.lat, lng: r.lng });
}

export default function HomePage() {
  const { t } = useLang();

  const [cuisine, setCuisine] = useState<CuisineId | 'all'>('all');
  const [area, setArea] = useState<AreaId | 'all'>('all');
  const [search, setSearch] = useState('');
  const [active, setActive] = useState<Restaurant | null>(null);

  const [userLocation, setUserLocation] = useState<LatLng | null>(null);
  const [locStatus, setLocStatus] = useState<LocStatus>('idle');
  const [sortBy, setSortBy] = useState<SortBy>('recommended');

  const requestLocation = () => {
    if (typeof navigator === 'undefined' || !navigator.geolocation) {
      setLocStatus('denied');
      return;
    }
    setLocStatus('loading');
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setUserLocation({ lat: pos.coords.latitude, lng: pos.coords.longitude });
        setLocStatus('granted');
        setSortBy('distance');
      },
      () => setLocStatus('denied'),
      { enableHighAccuracy: false, timeout: 10000, maximumAge: 300000 },
    );
  };

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    const list = RESTAURANTS.filter((r) => {
      if (cuisine !== 'all' && r.cuisine !== cuisine) return false;
      if (area !== 'all' && r.area !== area) return false;
      if (q) {
        const blob = [
          r.name_jp,
          r.name_zh,
          r.name_romaji,
          r.description_zh,
          r.description_en ?? '',
          CUISINE_MAP[r.cuisine].label_zh,
          CUISINE_MAP[r.cuisine].label_en,
          AREA_MAP[r.area].label_zh,
          AREA_MAP[r.area].label_en,
          ...r.tags,
        ]
          .join(' ')
          .toLowerCase();
        if (!blob.includes(q)) return false;
      }
      return true;
    });

    if (sortBy === 'rating') {
      return [...list].sort((a, b) => b.google_rating - a.google_rating);
    }
    if (sortBy === 'distance' && userLocation) {
      return [...list].sort(
        (a, b) => distanceOf(userLocation, a) - distanceOf(userLocation, b),
      );
    }
    return list;
  }, [cuisine, area, search, sortBy, userLocation]);

  const featured = useMemo(
    () =>
      [...RESTAURANTS]
        .filter((r) => r.featured)
        .sort((a, b) => b.google_rating - a.google_rating),
    [],
  );

  const hasCoords = useMemo(() => RESTAURANTS.some((r) => r.lat != null), []);

  const farAway = useMemo(() => {
    if (!userLocation) return false;
    const withCoords = RESTAURANTS.filter((r) => r.lat != null);
    if (withCoords.length === 0) return false;
    const min = Math.min(...withCoords.map((r) => distanceOf(userLocation, r)));
    return min > 100;
  }, [userLocation]);

  const hasActiveFilter = cuisine !== 'all' || area !== 'all' || search.trim().length > 0;

  return (
    <main className="min-h-screen pb-20">
      <Header searchValue={search} onSearch={setSearch} />

      <FilterBar
        selectedCuisine={cuisine}
        selectedArea={area}
        onCuisineChange={setCuisine}
        onAreaChange={setArea}
      />

      {/* Hero — 照片 + 排版叠层 */}
      <section className="mx-auto max-w-6xl px-4 pt-6">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-ink-900 via-ink-800 to-[#3d1a14]">
          {/* 背景照片（缺失时回退到上面的暗色渐变） */}
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: 'url(/hero.jpg)' }}
          />
          {/* 暗色叠层，保证文字可读 */}
          <div className="absolute inset-0 bg-gradient-to-t from-ink-900/92 via-ink-900/55 to-ink-900/35" />

          <div className="relative px-6 py-14 sm:px-10 sm:py-20">
            <div className="mb-3 flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.22em] text-brand-300">
              <span className="h-px w-8 bg-brand-400" />
              東京 · 本物の日本料理
            </div>
            <h1 className="max-w-2xl font-display text-3xl font-bold leading-tight text-white sm:text-4xl md:text-5xl">
              {t.heroTitleMain}
              <span className="text-brand-400">{t.heroTitleAccent}</span>
            </h1>
            <p className="mt-4 max-w-xl text-sm leading-relaxed text-white/80 sm:text-base">
              {t.heroSubtitle}
            </p>
            <div className="mt-6 flex flex-wrap gap-x-5 gap-y-2 text-xs text-white/75">
              <span className="inline-flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                {t.heroBadge1}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-amber-400" />
                {t.heroBadge2}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* 定位提示横幅 */}
      {locStatus === 'granted' && farAway && (
        <section className="mx-auto max-w-6xl px-4 pt-4">
          <div className="rounded-xl border border-amber-200 bg-amber-50 px-4 py-2.5 text-sm text-amber-800">
            {t.bannerFar}
          </div>
        </section>
      )}
      {locStatus === 'granted' && !hasCoords && (
        <section className="mx-auto max-w-6xl px-4 pt-4">
          <div className="rounded-xl border border-amber-200 bg-amber-50 px-4 py-2.5 text-sm text-amber-800">
            {t.bannerNoCoords}
          </div>
        </section>
      )}

      {/* 仅在没有筛选时显示口碑推荐 */}
      {!hasActiveFilter && (
        <FeaturedSection
          restaurants={featured}
          userLocation={userLocation}
          onCardClick={setActive}
        />
      )}

      <RestaurantGrid
        restaurants={filtered}
        totalCount={RESTAURANTS.length}
        userLocation={userLocation}
        sortBy={sortBy}
        onSortChange={setSortBy}
        locStatus={locStatus}
        onRequestLocation={requestLocation}
        onCardClick={setActive}
      />

      <RestaurantModal
        restaurant={active}
        userLocation={userLocation}
        onClose={() => setActive(null)}
      />

      <footer className="mx-auto max-w-6xl px-4 pb-10 pt-2 text-center text-xs text-ink-400">
        <p>{t.footer}</p>
      </footer>
    </main>
  );
}
