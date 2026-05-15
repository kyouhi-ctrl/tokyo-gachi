'use client';

import RestaurantCard from './RestaurantCard';
import type { Restaurant } from '@/lib/types';

interface Props {
  restaurants: Restaurant[];
  onCardClick: (r: Restaurant) => void;
}

export default function FeaturedSection({ restaurants, onCardClick }: Props) {
  if (restaurants.length === 0) return null;

  return (
    <section className="mx-auto max-w-6xl px-4 pt-6">
      <div className="mb-3 flex items-end justify-between">
        <div>
          <h2 className="font-display text-xl font-bold text-ink-900 md:text-2xl">
            🔥 东京口碑推荐
          </h2>
          <p className="mt-0.5 text-xs text-ink-500">
            编辑精选 · 来日必吃的代表性日料店
          </p>
        </div>
        <span className="hidden text-xs text-ink-400 md:inline">← 滑动查看更多 →</span>
      </div>

      <div className="scrollbar-hide -mx-4 flex gap-3 overflow-x-auto px-4 pb-2 md:gap-4">
        {restaurants.map((r) => (
          <RestaurantCard
            key={r.id}
            restaurant={r}
            variant="featured"
            onClick={onCardClick}
          />
        ))}
      </div>
    </section>
  );
}
