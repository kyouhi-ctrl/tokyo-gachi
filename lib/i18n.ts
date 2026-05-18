export type Lang = 'zh' | 'en';

export interface UIStrings {
  siteName: string;
  siteTagline: string;
  searchPlaceholder: string;
  langButton: string;
  filterCuisine: string;
  filterArea: string;
  all: string;
  heroTitleMain: string;
  heroTitleAccent: string;
  heroSubtitle: string;
  heroBadge1: string;
  heroBadge2: string;
  featuredTitle: string;
  featuredSubtitle: string;
  featuredScrollHint: string;
  gridTitle: string;
  locShow: string;
  locLoading: string;
  locDenied: string;
  locGranted: string;
  sortRecommended: string;
  sortRating: string;
  sortDistance: string;
  sortDistanceHint: string;
  emptyTitle: string;
  emptySub: string;
  distanceCardPrefix: string;
  modalAddress: string;
  modalDistanceNote: string;
  modalOpenMaps: string;
  bannerFar: string;
  bannerNoCoords: string;
  footer: string;
}

export const UI: Record<Lang, UIStrings> = {
  zh: {
    siteName: '东京日料严选',
    siteTagline: 'Tokyo Gourmet · 严选来日必吃',
    searchPlaceholder: '搜索店名、菜系或区域…',
    langButton: 'English',
    filterCuisine: '按菜系',
    filterArea: '按区域',
    all: '全部',
    heroTitleMain: '东京值得去的日料店，',
    heroTitleAccent: '一目了然',
    heroSubtitle:
      '为来日旅游的中文游客精选 · 每周自动同步 Google 评分 · 不收钱、不带货、只看口碑',
    heroBadge1: '数据自动每周更新',
    heroBadge2: '一键 Google 地图导航',
    featuredTitle: '东京口碑推荐',
    featuredSubtitle: '编辑精选 · 来日必吃的代表性日料店',
    featuredScrollHint: '← 滑动查看更多 →',
    gridTitle: '全部店铺',
    locShow: '显示离我的距离',
    locLoading: '定位中…',
    locDenied: '定位失败，点此重试',
    locGranted: '已显示距离',
    sortRecommended: '推荐',
    sortRating: '评分最高',
    sortDistance: '距离最近',
    sortDistanceHint: '先点「显示离我的距离」开启定位',
    emptyTitle: '没找到匹配的店铺',
    emptySub: '试试改变筛选条件，或者清空搜索词。',
    distanceCardPrefix: '直线',
    modalAddress: '地址',
    modalDistanceNote: '直线距离仅供参考，实际步行通常更长',
    modalOpenMaps: '用 Google 地图打开',
    bannerFar:
      '你似乎不在东京附近，距离数字仅供参考 —— 行前规划建议直接用上方「区域」筛选。',
    bannerNoCoords:
      '定位成功，但店铺坐标尚未拉取 —— 运行一次数据更新后即可显示距离。',
    footer: '东京日料严选 · 评分数据来自 Google Maps，仅供参考',
  },
  en: {
    siteName: 'Tokyo Gourmet',
    siteTagline: 'Curated Japanese dining in Tokyo',
    searchPlaceholder: 'Search by name, cuisine or area…',
    langButton: '简体中文',
    filterCuisine: 'By cuisine',
    filterArea: 'By area',
    all: 'All',
    heroTitleMain: "Tokyo's best Japanese dining, ",
    heroTitleAccent: 'all in one place',
    heroSubtitle:
      'Hand-picked for visitors to Japan · Google ratings synced weekly · No ads, no sponsorships — reputation only',
    heroBadge1: 'Data refreshed weekly',
    heroBadge2: 'One-tap Google Maps navigation',
    featuredTitle: "Editors' Picks",
    featuredSubtitle: 'Curated favorites — iconic Japanese restaurants',
    featuredScrollHint: '← swipe for more →',
    gridTitle: 'All Restaurants',
    locShow: 'Show distance from me',
    locLoading: 'Locating…',
    locDenied: 'Location failed — tap to retry',
    locGranted: 'Distance on',
    sortRecommended: 'Recommended',
    sortRating: 'Top rated',
    sortDistance: 'Nearest',
    sortDistanceHint: 'Tap "Show distance from me" first',
    emptyTitle: 'No restaurants found',
    emptySub: 'Try changing the filters or clearing your search.',
    distanceCardPrefix: '',
    modalAddress: 'Address',
    modalDistanceNote:
      'Straight-line distance — actual walking distance is longer',
    modalOpenMaps: 'Open in Google Maps',
    bannerFar:
      "You don't seem to be near Tokyo, so distances are approximate — use the area filter above for trip planning.",
    bannerNoCoords:
      "Location found, but restaurant coordinates aren't loaded yet — run a data update to enable distances.",
    footer: 'Tokyo Gourmet · Ratings from Google Maps, for reference only',
  },
};

/** 中文标签 → 英文标签 */
export const TAG_EN: Record<string, string> = {
  米其林三星: 'Michelin 3-star',
  米其林二星: 'Michelin 2-star',
  米其林一星: 'Michelin 1-star',
  米其林: 'Michelin',
  需提前预约: 'Reserve ahead',
  需预前预约: 'Reserve ahead',
  需预约: 'Reservation needed',
  '需预约（高峰）': 'Reserve at peak times',
  正装: 'Formal attire',
  传奇老店: 'Legendary institution',
  现金支付: 'Cash only',
  英文菜单: 'English menu',
  中文菜单: 'Chinese menu',
  游客友好: 'Tourist-friendly',
  需排队: 'Expect a queue',
  '24小时': 'Open 24h',
  适合家庭: 'Family-friendly',
  整理券制: 'Numbered-ticket system',
  百年老铺: 'Century-old shop',
  正宗: 'Authentic',
  均一价: 'Flat pricing',
  适合朋友聚会: 'Good for groups',
  适合聚会: 'Good for groups',
  适合多人: 'Good for groups',
  网红打卡: 'Instagram-worthy',
  网红: 'Trendy spot',
  必打卡: 'Must-visit',
  周二休: 'Closed Tuesdays',
  深夜营业: 'Open late',
  A5和牛: 'A5 wagyu',
  和牛: 'Wagyu',
  高端: 'Upscale',
  夜景: 'Night view',
  便宜: 'Budget-friendly',
  外带: 'Takeout',
  随到随吃: 'Walk-in OK',
  触控点单: 'Touch-panel ordering',
  海鲜丼: 'Seafood rice bowl',
  午市限定: 'Lunch only',
  午市推荐: 'Great for lunch',
  高速传送带: 'Express conveyor',
  蘸面tsukemen: 'Tsukemen',
  东京站内: 'Inside Tokyo Station',
  柚子盐: 'Yuzu salt',
  辣味: 'Spicy',
  挑战辣度: 'Spice challenge',
  个性体验: 'Unique experience',
  特色体验: 'Special experience',
  稀缺体验: 'Rare experience',
  热闹: 'Lively',
  自助烤海鲜: 'Grill-your-own seafood',
  自助烧烤: 'Grill-your-own',
  自助烤: 'Grill-your-own',
  百货店内: 'In a department store',
  历史感: 'Historic',
  适合庆祝: 'Good for celebrations',
  单人用餐: 'Solo dining',
  独旅友好: 'Solo-traveler friendly',
  神乐坂: 'Kagurazaka',
  昭和风: 'Showa-era vibe',
  浅草散步途中: 'Near an Asakusa stroll',
  吃到饱: 'All-you-can-eat',
  河畔景观: 'Riverside view',
  日本经典: 'Japanese classic',
  亲子丼: 'Oyakodon',
  和风口味: 'Japanese-style flavor',
  健康: 'Healthy',
  不忍池旁: 'By Shinobazu Pond',
  正宗江户风: 'Authentic Edo-style',
  洋食: 'Yoshoku (Western-style)',
  上野公园: 'Ueno Park',
  备长炭: 'Binchotan charcoal',
  份量大: 'Generous portions',
  分量大: 'Generous portions',
  性价比: 'Great value',
  牛舌专门: 'Beef-tongue specialist',
  仙台名物: 'Sendai specialty',
  大阪风: 'Osaka-style',
  大阪烧: 'Okonomiyaki',
  东京名物: 'Tokyo specialty',
  江户三大薮: "Edo's top soba",
  鱼介系: 'Seafood broth',
  浅草必吃: 'Asakusa must-eat',
  浅草地标: 'Asakusa landmark',
  江户料理: 'Edo cuisine',
  关东风: 'Kanto-style',
  寿喜锅: 'Sukiyaki',
  相扑文化: 'Sumo culture',
  口碑老店: 'Well-loved shop',
  酱油拉面: 'Shoyu ramen',
  本地人气: 'Local favorite',
  快速: 'Quick bite',
  表参道: 'Omotesando',
  石臼研磨: 'Stone-milled',
  隐秘名店: 'Hidden gem',
  无限续饭: 'Free rice refills',
  北海道食材: 'Hokkaido ingredients',
  北海道直送: 'Direct from Hokkaido',
  高品质回转: 'Premium conveyor sushi',
  欧风咖喱: 'European-style curry',
  特色: 'Distinctive',
  精肉直营: 'Butcher-direct',
  肉质好: 'Quality meat',
  浓厚系: 'Rich broth',
  名店: 'Famous shop',
  交通便利: 'Easy to reach',
  博多豚骨: 'Hakata tonkotsu',
  细面: 'Thin noodles',
  替玉无料: 'Free noodle refill',
  清爽: 'Light & refreshing',
  最高水准: 'Top-tier',
  餐具精美: 'Exquisite tableware',
  胡麻油炸: 'Sesame-oil fried',
  现代风格: 'Modern style',
  银座便利: 'Central Ginza',
  东京拉面发源: 'Birthplace of Tokyo ramen',
  六本木: 'Roppongi',
};

export function translateTag(tag: string, lang: Lang): string {
  if (lang === 'zh') return tag;
  return TAG_EN[tag] ?? tag;
}
