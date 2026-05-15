'use client';

import RestaurantCard from './RestaurantCard';
import type { Restaurant } from '@/lib/types';

interface Props {
  restaurants: Restaurant[];
  totalCount: number;
  onCardClick: (r: Restaurant) => void;
}

export default function RestaurantGrid({ restaurants, totalCount, onCardClick }: Props) {
  return (
    <section className="mx-auto max-w-6xl px-4 py-8">
      <div className="mb-4 flex items-end justify-between">
        <h2 className="font-display text-xl font-bold text-ink-900 md:text-2xl">
          全部店铺
        </h2>
        <span className="text-sm text-ink-500">
          共 <span className="font-semibold text-ink-800">{restaurants.length}</span>
          {restaurants.length !== totalCount && (
            <span className="text-ink-400"> / {totalCount}</span>
          )}{' '}
          家
        </span>
      </div>

      {restaurants.length === 0 ? (
        <EmptyState />
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {restaurants.map((r) => (
            <RestaurantCard key={r.id} restaurant={r} onClick={onCardClick} />
          ))}
        </div>
      )}
    </section>
  );
}

function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-ink-200 bg-white py-16 text-center">
      <div className="mb-3 text-5xl">🍣</div>
      <p className="text-base font-medium text-ink-700">没找到匹配的店铺</p>
      <p className="mt-1 text-sm text-ink-500">试试改变筛选条件，或者清空搜索词。</p>
    </div>
  );
}
