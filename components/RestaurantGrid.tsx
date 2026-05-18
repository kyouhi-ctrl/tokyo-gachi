'use client';

import RestaurantCard from './RestaurantCard';
import { useLang } from './LangContext';
import type { Restaurant } from '@/lib/types';
import type { LatLng } from '@/lib/geo';
import type { UIStrings } from '@/lib/i18n';

export type SortBy = 'recommended' | 'rating' | 'distance';
export type LocStatus = 'idle' | 'loading' | 'granted' | 'denied';

interface Props {
  restaurants: Restaurant[];
  totalCount: number;
  userLocation: LatLng | null;
  sortBy: SortBy;
  onSortChange: (s: SortBy) => void;
  locStatus: LocStatus;
  onRequestLocation: () => void;
  onCardClick: (r: Restaurant) => void;
}

export default function RestaurantGrid({
  restaurants,
  totalCount,
  userLocation,
  sortBy,
  onSortChange,
  locStatus,
  onRequestLocation,
  onCardClick,
}: Props) {
  const { lang, t } = useLang();

  const count = restaurants.length;
  const countText =
    lang === 'en'
      ? count === totalCount
        ? `${count} restaurants`
        : `${count} of ${totalCount}`
      : count === totalCount
        ? `共 ${count} 家`
        : `共 ${count} / ${totalCount} 家`;

  return (
    <section className="mx-auto max-w-6xl px-4 py-8">
      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-baseline gap-2">
          <h2 className="font-display text-xl font-bold text-ink-900 md:text-2xl">
            {t.gridTitle}
          </h2>
          <span className="text-sm text-ink-500">{countText}</span>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <LocationButton status={locStatus} onClick={onRequestLocation} t={t} />
          <SortControl
            sortBy={sortBy}
            onSortChange={onSortChange}
            distanceEnabled={locStatus === 'granted'}
            t={t}
          />
        </div>
      </div>

      {restaurants.length === 0 ? (
        <EmptyState t={t} />
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {restaurants.map((r) => (
            <RestaurantCard
              key={r.id}
              restaurant={r}
              userLocation={userLocation}
              onClick={onCardClick}
            />
          ))}
        </div>
      )}
    </section>
  );
}

function LocationButton({
  status,
  onClick,
  t,
}: {
  status: LocStatus;
  onClick: () => void;
  t: UIStrings;
}) {
  if (status === 'granted') {
    return (
      <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1.5 text-sm font-medium text-emerald-700">
        <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
        </svg>
        {t.locGranted}
      </span>
    );
  }

  const label =
    status === 'loading' ? t.locLoading : status === 'denied' ? t.locDenied : t.locShow;

  return (
    <button
      onClick={onClick}
      disabled={status === 'loading'}
      className="inline-flex items-center gap-1.5 rounded-full border border-ink-200 bg-white px-3 py-1.5 text-sm font-medium text-ink-700 transition hover:border-ink-300 hover:bg-ink-50 disabled:opacity-60"
    >
      <svg className="h-4 w-4 text-brand-500" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 010-5 2.5 2.5 0 010 5z" />
      </svg>
      {label}
    </button>
  );
}

function SortControl({
  sortBy,
  onSortChange,
  distanceEnabled,
  t,
}: {
  sortBy: SortBy;
  onSortChange: (s: SortBy) => void;
  distanceEnabled: boolean;
  t: UIStrings;
}) {
  const options: { id: SortBy; label: string; disabled?: boolean }[] = [
    { id: 'recommended', label: t.sortRecommended },
    { id: 'rating', label: t.sortRating },
    { id: 'distance', label: t.sortDistance, disabled: !distanceEnabled },
  ];
  return (
    <div className="inline-flex rounded-full border border-ink-200 bg-white p-0.5">
      {options.map((o) => (
        <button
          key={o.id}
          onClick={() => !o.disabled && onSortChange(o.id)}
          disabled={o.disabled}
          title={o.disabled ? t.sortDistanceHint : undefined}
          className={`rounded-full px-3 py-1 text-sm font-medium transition ${
            sortBy === o.id
              ? 'bg-ink-900 text-white'
              : o.disabled
                ? 'cursor-not-allowed text-ink-300'
                : 'text-ink-600 hover:text-ink-900'
          }`}
        >
          {o.label}
        </button>
      ))}
    </div>
  );
}

function EmptyState({ t }: { t: UIStrings }) {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-ink-200 bg-white py-16 text-center">
      <div className="mb-3 text-5xl">🍣</div>
      <p className="text-base font-medium text-ink-700">{t.emptyTitle}</p>
      <p className="mt-1 text-sm text-ink-500">{t.emptySub}</p>
    </div>
  );
}
