'use client';

import { useMemo, useState } from 'react';
import Header from '@/components/Header';
import FilterBar from '@/components/FilterBar';
import FeaturedSection from '@/components/FeaturedSection';
import RestaurantGrid, { type LocStatus, type SortBy } from '@/components/RestaurantGrid';
import RestaurantModal from '@/components/RestaurantModal';
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
          CUISINE_MAP[r.cuisine].label_zh,
          AREA_MAP[r.area].label_zh,
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

  // 距离功能可用 = 已定位 且 数据里至少有一家店带坐标
  const hasCoords = useMemo(() => RESTAURANTS.some((r) => r.lat != null), []);

  // 判断用户是否离东京很远（行前规划场景）
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

      {/* Hero / Tagline */}
      <section className="mx-auto max-w-6xl px-4 pt-6">
        <div className="rounded-3xl bg-gradient-to-br from-brand-50 via-white to-amber-50 p-6 sm:p-8">
          <h1 className="font-display text-2xl font-bold text-ink-900 sm:text-3xl">
            东京值得去的日料店，<span className="text-brand-600">一目了然</span>
          </h1>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-ink-600 sm:text-base">
            为来日旅游的中文游客精选 · 每周自动同步 Google 评分 · 不收钱、不带货、只看口碑
          </p>
          <div className="mt-3 flex flex-wrap gap-3 text-xs text-ink-500">
            <span className="inline-flex items-center gap-1">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
              数据自动每周更新
            </span>
            <span className="inline-flex items-center gap-1">
              <span className="h-1.5 w-1.5 rounded-full bg-amber-500" />
              中文卡片 · 一键 Google 地图导航
            </span>
          </div>
        </div>
      </section>

      {/* 定位提示横幅 */}
      {locStatus === 'granted' && farAway && (
        <section className="mx-auto max-w-6xl px-4 pt-4">
          <div className="rounded-xl border border-amber-200 bg-amber-50 px-4 py-2.5 text-sm text-amber-800">
            你似乎不在东京附近，距离数字仅供参考 —— 行前规划建议直接用上方「区域」筛选。
          </div>
        </section>
      )}
      {locStatus === 'granted' && !hasCoords && (
        <section className="mx-auto max-w-6xl px-4 pt-4">
          <div className="rounded-xl border border-amber-200 bg-amber-50 px-4 py-2.5 text-sm text-amber-800">
            定位成功，但店铺坐标尚未拉取 —— 运行一次数据更新后即可显示距离。
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
        <p>东京日料严选 · 评分数据来自 Google Maps，仅供参考</p>
      </footer>
    </main>
  );
}
