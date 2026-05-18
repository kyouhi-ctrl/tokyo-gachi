'use client';

import RestaurantCard from './RestaurantCard';
import { useLang } from './LangContext';
import type { Restaurant } from '@/lib/types';
import type { LatLng } from '@/lib/geo';

interface Props {
  restaurants: Restaurant[];
  userLocation?: LatLng | null;
  onCardClick: (r: Restaurant) => void;
}

export default function FeaturedSection({ restaurants, userLocation, onCardClick }: Props) {
  const { t } = useLang();
  if (restaurants.length === 0) return null;

  return (
    <section className="mx-auto max-w-6xl px-4 pt-6">
      <div className="mb-3 flex items-end justify-between">
        <div>
          <h2 className="font-display text-xl font-bold text-ink-900 md:text-2xl">
            🔥 {t.featuredTitle}
          </h2>
          <p className="mt-0.5 text-xs text-ink-500">{t.featuredSubtitle}</p>
        </div>
        <span className="hidden text-xs text-ink-400 md:inline">
          {t.featuredScrollHint}
        </span>
      </div>

      <div className="scrollbar-hide -mx-4 flex gap-3 overflow-x-auto px-4 pb-2 md:gap-4">
        {restaurants.map((r) => (
          <RestaurantCard
            key={r.id}
            restaurant={r}
            variant="featured"
            userLocation={userLocation}
            onClick={onCardClick}
          />
        ))}
      </div>
    </section>
  );
}
