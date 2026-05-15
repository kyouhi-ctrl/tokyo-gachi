import type { AreaId, CuisineId } from './types';

export interface CuisineMeta {
  id: CuisineId;
  label_zh: string;
  label_jp: string;
  emoji: string;
  color: string;
}

export interface AreaMeta {
  id: AreaId;
  label_zh: string;
  label_jp: string;
}

export const CUISINES: CuisineMeta[] = [
  { id: 'sushi',       label_zh: '寿司/刺身',   label_jp: '寿司・刺身',   emoji: '🍣', color: 'bg-rose-100 text-rose-700' },
  { id: 'ramen',       label_zh: '拉面',         label_jp: 'ラーメン',     emoji: '🍜', color: 'bg-amber-100 text-amber-700' },
  { id: 'tempura',     label_zh: '天妇罗',       label_jp: '天ぷら',       emoji: '🍤', color: 'bg-yellow-100 text-yellow-700' },
  { id: 'yakitori',    label_zh: '烧鸟/居酒屋',  label_jp: '焼鳥・居酒屋', emoji: '🍢', color: 'bg-orange-100 text-orange-700' },
  { id: 'tonkatsu',    label_zh: '炸猪排',       label_jp: 'とんかつ',     emoji: '🍱', color: 'bg-lime-100 text-lime-700' },
  { id: 'soba',        label_zh: '乌冬/荞麦',    label_jp: 'うどん・そば', emoji: '🥢', color: 'bg-emerald-100 text-emerald-700' },
  { id: 'yakiniku',    label_zh: '烧肉/和牛',    label_jp: '焼肉・和牛',   emoji: '🥩', color: 'bg-red-100 text-red-700' },
  { id: 'kaiseki',     label_zh: '怀石/高级',    label_jp: '懐石・高級',   emoji: '🍵', color: 'bg-violet-100 text-violet-700' },
  { id: 'okonomiyaki', label_zh: '章鱼烧/大阪烧', label_jp: 'たこ焼き',    emoji: '🐙', color: 'bg-pink-100 text-pink-700' },
  { id: 'hotpot',      label_zh: '火锅',         label_jp: '鍋',           emoji: '🍲', color: 'bg-orange-100 text-orange-700' },
  { id: 'unagi',       label_zh: '鳗鱼',         label_jp: 'うなぎ',       emoji: '🦪', color: 'bg-amber-100 text-amber-800' },
  { id: 'donburi',     label_zh: '咖喱/丼饭',    label_jp: 'カレー・丼',   emoji: '🍛', color: 'bg-yellow-100 text-yellow-800' },
  { id: 'other',       label_zh: '其他',         label_jp: 'その他',       emoji: '🍽️', color: 'bg-gray-100 text-gray-700' },
];

export const AREAS: AreaMeta[] = [
  { id: 'shinjuku',      label_zh: '新宿',     label_jp: '新宿' },
  { id: 'shibuya',       label_zh: '涩谷',     label_jp: '渋谷' },
  { id: 'ginza',         label_zh: '银座',     label_jp: '銀座' },
  { id: 'asakusa',       label_zh: '浅草',     label_jp: '浅草' },
  { id: 'akihabara',     label_zh: '秋叶原',   label_jp: '秋葉原' },
  { id: 'roppongi',      label_zh: '六本木',   label_jp: '六本木' },
  { id: 'ueno',          label_zh: '上野',     label_jp: '上野' },
  { id: 'ikebukuro',     label_zh: '池袋',     label_jp: '池袋' },
  { id: 'tokyo-station', label_zh: '东京站',   label_jp: '東京駅' },
  { id: 'harajuku',      label_zh: '原宿',     label_jp: '原宿' },
  { id: 'other',         label_zh: '其他',     label_jp: 'その他' },
];

export const CUISINE_MAP: Record<CuisineId, CuisineMeta> = CUISINES.reduce(
  (acc, c) => ({ ...acc, [c.id]: c }),
  {} as Record<CuisineId, CuisineMeta>,
);

export const AREA_MAP: Record<AreaId, AreaMeta> = AREAS.reduce(
  (acc, a) => ({ ...acc, [a.id]: a }),
  {} as Record<AreaId, AreaMeta>,
);

export function priceLabel(level: 1 | 2 | 3 | 4): string {
  return '¥'.repeat(level);
}
