export type CuisineId =
  | 'sushi'
  | 'ramen'
  | 'tempura'
  | 'yakitori'
  | 'tonkatsu'
  | 'soba'
  | 'yakiniku'
  | 'kaiseki'
  | 'okonomiyaki'
  | 'hotpot'
  | 'unagi'
  | 'donburi'
  | 'other';

export type AreaId =
  | 'shinjuku'
  | 'shibuya'
  | 'ginza'
  | 'asakusa'
  | 'akihabara'
  | 'roppongi'
  | 'ueno'
  | 'ikebukuro'
  | 'tokyo-station'
  | 'harajuku'
  | 'other';

export interface Restaurant {
  id: string;
  name_jp: string;
  name_zh: string;
  name_romaji: string;
  cuisine: CuisineId;
  area: AreaId;
  price_range: 1 | 2 | 3 | 4;
  google_place_id: string;
  google_rating: number;
  review_count: number;
  description_zh: string;
  /** 英文描述，全量翻译后写入 */
  description_en?: string;
  tags: string[];
  address: string;
  maps_url: string;
  image_url: string;
  featured: boolean;
  last_updated: string;
  /** 经纬度，由 update-ratings.js 从 Places API 拉取后写入 */
  lat?: number;
  lng?: number;
}
