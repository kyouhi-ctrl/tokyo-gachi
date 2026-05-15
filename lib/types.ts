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
  tags: string[];
  address: string;
  maps_url: string;
  image_url: string;
  featured: boolean;
  last_updated: string;
}
