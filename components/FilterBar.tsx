'use client';

import { AREAS, CUISINES } from '@/lib/constants';
import type { AreaId, CuisineId } from '@/lib/types';

interface FilterBarProps {
  selectedCuisine: CuisineId | 'all';
  selectedArea: AreaId | 'all';
  onCuisineChange: (id: CuisineId | 'all') => void;
  onAreaChange: (id: AreaId | 'all') => void;
}

export default function FilterBar({
  selectedCuisine,
  selectedArea,
  onCuisineChange,
  onAreaChange,
}: FilterBarProps) {
  return (
    <section className="border-b border-ink-100 bg-white">
      <div className="mx-auto max-w-6xl px-4 py-4">
        {/* 菜系 */}
        <div>
          <div className="mb-2 text-xs font-medium uppercase tracking-wider text-ink-500">
            按菜系
          </div>
          <div className="scrollbar-hide -mx-1 flex gap-2 overflow-x-auto px-1 pb-1">
            <PillButton
              active={selectedCuisine === 'all'}
              onClick={() => onCuisineChange('all')}
              label="全部"
              emoji="🍽"
            />
            {CUISINES.map((c) => (
              <PillButton
                key={c.id}
                active={selectedCuisine === c.id}
                onClick={() => onCuisineChange(c.id)}
                label={c.label_zh}
                emoji={c.emoji}
              />
            ))}
          </div>
        </div>

        {/* 区域 */}
        <div className="mt-4">
          <div className="mb-2 text-xs font-medium uppercase tracking-wider text-ink-500">
            按区域
          </div>
          <div className="scrollbar-hide -mx-1 flex gap-2 overflow-x-auto px-1 pb-1">
            <PillButton
              active={selectedArea === 'all'}
              onClick={() => onAreaChange('all')}
              label="全部"
            />
            {AREAS.map((a) => (
              <PillButton
                key={a.id}
                active={selectedArea === a.id}
                onClick={() => onAreaChange(a.id)}
                label={a.label_zh}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function PillButton({
  active,
  onClick,
  label,
  emoji,
}: {
  active: boolean;
  onClick: () => void;
  label: string;
  emoji?: string;
}) {
  return (
    <button
      onClick={onClick}
      className={`flex shrink-0 items-center gap-1.5 whitespace-nowrap rounded-full border px-3.5 py-1.5 text-sm font-medium transition ${
        active
          ? 'border-ink-900 bg-ink-900 text-white shadow-sm'
          : 'border-ink-200 bg-white text-ink-700 hover:border-ink-300 hover:bg-ink-50'
      }`}
    >
      {emoji && <span className="text-[15px] leading-none">{emoji}</span>}
      <span>{label}</span>
    </button>
  );
}
