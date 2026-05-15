'use client';

import { useEffect } from 'react';
import { AREA_MAP, CUISINE_MAP, priceLabel } from '@/lib/constants';
import type { Restaurant } from '@/lib/types';

interface Props {
  restaurant: Restaurant | null;
  onClose: () => void;
}

export default function RestaurantModal({ restaurant, onClose }: Props) {
  useEffect(() => {
    if (!restaurant) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [restaurant, onClose]);

  if (!restaurant) return null;

  const cuisine = CUISINE_MAP[restaurant.cuisine];
  const area = AREA_MAP[restaurant.area];

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-black/50 p-0 sm:items-center sm:p-4"
      onClick={onClose}
    >
      <div
        className="relative max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-t-3xl bg-white shadow-2xl sm:rounded-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-ink-700 shadow-md backdrop-blur transition hover:bg-white"
          aria-label="关闭"
        >
          <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Hero */}
        {restaurant.image_url ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={restaurant.image_url}
            alt={restaurant.name_jp}
            className="h-56 w-full object-cover sm:h-64"
          />
        ) : (
          <div className="flex h-56 w-full items-center justify-center bg-gradient-to-br from-ink-100 to-ink-200 sm:h-64">
            <span className="text-7xl opacity-70">{cuisine.emoji}</span>
          </div>
        )}

        {/* Body */}
        <div className="px-6 py-5">
          <div className="flex flex-wrap items-center gap-2">
            <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-medium ${cuisine.color}`}>
              {cuisine.emoji} {cuisine.label_zh}
            </span>
            <span className="rounded-full bg-ink-50 px-2.5 py-0.5 text-xs text-ink-700">
              📍 {area.label_zh}
            </span>
            <span className="rounded-full bg-ink-50 px-2.5 py-0.5 text-xs font-semibold text-ink-700">
              {priceLabel(restaurant.price_range)}
            </span>
          </div>

          <h2 className="mt-3 font-display text-2xl font-bold text-ink-900">
            {restaurant.name_jp}
          </h2>
          <p className="mt-0.5 text-sm text-ink-500">
            {restaurant.name_zh} · {restaurant.name_romaji}
          </p>

          <div className="mt-3 flex items-center gap-3">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-50 px-3 py-1 text-sm font-semibold text-amber-700">
              <svg className="h-4 w-4 text-amber-400" viewBox="0 0 20 20" fill="currentColor">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.957a1 1 0 00.95.69h4.162c.969 0 1.371 1.24.588 1.81l-3.367 2.446a1 1 0 00-.364 1.118l1.287 3.957c.3.922-.755 1.688-1.54 1.118l-3.366-2.446a1 1 0 00-1.176 0l-3.367 2.446c-.784.57-1.838-.196-1.539-1.118l1.287-3.957a1 1 0 00-.364-1.118L2.064 9.384c-.783-.57-.38-1.81.588-1.81h4.162a1 1 0 00.95-.69l1.285-3.957z" />
              </svg>
              {restaurant.google_rating.toFixed(1)}
            </span>
            <span className="text-sm text-ink-500">
              基于 <strong className="text-ink-700">{restaurant.review_count.toLocaleString()}</strong> 条 Google 评价
            </span>
          </div>

          <p className="mt-4 text-[15px] leading-relaxed text-ink-700">
            {restaurant.description_zh}
          </p>

          {/* Tags */}
          {restaurant.tags.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-1.5">
              {restaurant.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-ink-200 px-2.5 py-0.5 text-xs text-ink-600"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          {/* Address */}
          <div className="mt-5 rounded-xl bg-ink-50 px-4 py-3">
            <div className="text-xs font-medium uppercase tracking-wider text-ink-500">地址</div>
            <div className="mt-1 text-sm text-ink-800">{restaurant.address}</div>
          </div>

          {/* CTA */}
          <a
            href={restaurant.maps_url}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-5 flex w-full items-center justify-center gap-2 rounded-full bg-brand-500 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-brand-600"
          >
            <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 010-5 2.5 2.5 0 010 5z" />
            </svg>
            用 Google 地图打开
          </a>

          <p className="mt-3 text-center text-[11px] text-ink-400">
            数据最后更新于 {restaurant.last_updated}
          </p>
        </div>
      </div>
    </div>
  );
}
