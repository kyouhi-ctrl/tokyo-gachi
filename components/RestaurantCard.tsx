'use client';

import { AREA_MAP, CUISINE_MAP, type CuisineMeta, priceLabel } from '@/lib/constants';
import type { Restaurant } from '@/lib/types';

interface Props {
  restaurant: Restaurant;
  variant?: 'grid' | 'featured';
  onClick: (r: Restaurant) => void;
}

export default function RestaurantCard({ restaurant, variant = 'grid', onClick }: Props) {
  const cuisine = CUISINE_MAP[restaurant.cuisine];
  const area = AREA_MAP[restaurant.area];

  if (variant === 'featured') {
    return (
      <button
        onClick={() => onClick(restaurant)}
        className="group flex w-72 shrink-0 flex-col overflow-hidden rounded-2xl border border-ink-100 bg-white text-left shadow-card transition hover:-translate-y-0.5 hover:shadow-cardHover"
      >
        <CoverImage restaurant={restaurant} className="h-40 w-full" />
        <div className="flex flex-1 flex-col gap-2 p-4">
          <CuisineTag cuisine={cuisine} />
          <div>
            <div className="line-clamp-1 font-display text-base font-bold text-ink-900">
              {restaurant.name_jp}
            </div>
            <div className="line-clamp-1 text-xs text-ink-500">
              {restaurant.name_zh} · {restaurant.name_romaji}
            </div>
          </div>
          <div className="flex items-center justify-between text-sm">
            <Rating rating={restaurant.google_rating} count={restaurant.review_count} />
            <span className="text-ink-500">📍 {area.label_zh}</span>
          </div>
          <p className="line-clamp-2 text-xs leading-relaxed text-ink-600">
            {restaurant.description_zh}
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
        <div className="flex items-center justify-between">
          <CuisineTag cuisine={cuisine} />
          <span className="text-sm font-semibold text-ink-700">
            {priceLabel(restaurant.price_range)}
          </span>
        </div>

        <div>
          <div className="line-clamp-1 font-display text-lg font-bold text-ink-900">
            {restaurant.name_jp}
          </div>
          <div className="line-clamp-1 text-xs text-ink-500">
            {restaurant.name_zh} · {restaurant.name_romaji}
          </div>
        </div>

        <div className="flex items-center justify-between text-sm">
          <Rating rating={restaurant.google_rating} count={restaurant.review_count} />
          <span className="text-ink-500">📍 {area.label_zh}</span>
        </div>

        <p className="line-clamp-2 text-sm leading-relaxed text-ink-600">
          {restaurant.description_zh}
        </p>

        {restaurant.tags.length > 0 && (
          <div className="mt-1 flex flex-wrap gap-1.5">
            {restaurant.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-ink-50 px-2 py-0.5 text-[11px] text-ink-600"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </button>
  );
}

function CuisineTag({ cuisine }: { cuisine: CuisineMeta }) {
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-medium ${cuisine.color}`}
    >
      <span>{cuisine.emoji}</span>
      <span>{cuisine.label_zh}</span>
    </span>
  );
}

function Rating({ rating, count }: { rating: number; count: number }) {
  return (
    <span className="inline-flex items-center gap-1 text-ink-800">
      <svg className="h-4 w-4 text-amber-400" viewBox="0 0 20 20" fill="currentColor">
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.957a1 1 0 00.95.69h4.162c.969 0 1.371 1.24.588 1.81l-3.367 2.446a1 1 0 00-.364 1.118l1.287 3.957c.3.922-.755 1.688-1.54 1.118l-3.366-2.446a1 1 0 00-1.176 0l-3.367 2.446c-.784.57-1.838-.196-1.539-1.118l1.287-3.957a1 1 0 00-.364-1.118L2.064 9.384c-.783-.57-.38-1.81.588-1.81h4.162a1 1 0 00.95-.69l1.285-3.957z" />
      </svg>
      <span className="font-semibold">{rating.toFixed(1)}</span>
      <span className="text-xs text-ink-500">({count.toLocaleString()})</span>
    </span>
  );
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
