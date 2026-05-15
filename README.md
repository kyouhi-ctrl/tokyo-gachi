# 东京ガチ日料 / Tokyo Gachi

> 东京值得去的日料店铺导航 — 为来日中文游客精选

Next.js 14 (App Router) + Tailwind CSS 的静态/半静态网站，数据来源于 `data/restaurants.json` 并通过 GitHub Action 每周自动从 Google Places API 同步评分、评论数与封面图。

---

## 🚀 快速开始

```bash
cd tokyo-gachi
npm install
npm run dev
# 访问 http://localhost:3000
```

构建生产版本：

```bash
npm run build
npm run start
```

## 📁 目录结构

```
tokyo-gachi/
├── app/
│   ├── layout.tsx          # 全局 layout + 字体
│   ├── page.tsx            # 主页（筛选 + 列表）
│   └── globals.css         # Tailwind + 全局样式
├── components/
│   ├── Header.tsx          # 顶栏 + 搜索
│   ├── FilterBar.tsx       # 菜系 / 区域筛选
│   ├── FeaturedSection.tsx # 口碑推荐横向滚动
│   ├── RestaurantGrid.tsx  # 全部店铺网格
│   ├── RestaurantCard.tsx  # 店铺卡片（grid / featured）
│   └── RestaurantModal.tsx # 详情弹窗
├── data/
│   └── restaurants.json    # 店铺数据（手动维护核心字段）
├── lib/
│   ├── types.ts            # TypeScript 类型
│   └── constants.ts        # 菜系/区域元数据 + 颜色
├── scripts/
│   └── update-ratings.js   # Google Places 同步脚本
├── .github/workflows/
│   └── update-ratings.yml  # 每周自动更新
└── public/images/          # 店铺封面图（脚本下载到这里）
```

## 📝 添加 / 编辑店铺

编辑 [`data/restaurants.json`](data/restaurants.json)，每条记录字段：

| 字段 | 说明 | 是否手动 |
|---|---|---|
| `id` | URL / 文件名安全的唯一 slug | 手动 |
| `name_jp` / `name_zh` / `name_romaji` | 日文 / 中文 / 罗马字店名 | 手动 |
| `cuisine` | 见 `lib/constants.ts` 的 CUISINES.id | 手动 |
| `area` | 见 `lib/constants.ts` 的 AREAS.id | 手动 |
| `price_range` | 1–4 (¥–¥¥¥¥) | 手动 |
| `google_place_id` | Google Place ID。**写 `CHANGE_ME_xxx` 即可让脚本自动查找** | 半自动 |
| `google_rating` / `review_count` | 评分 & 评论数 | **自动同步** |
| `description_zh` | 一句中文卖点 | 手动 |
| `tags` | `["英文菜单", "需预约"]` 等 | 手动 |
| `address` / `maps_url` | 地址 / 地图链接 | **自动同步** |
| `image_url` | 封面图（脚本会下载到 `/images/{id}.jpg`） | **自动同步** |
| `featured` | 是否进入「口碑推荐」横向滚动 | 手动 |
| `last_updated` | 数据更新日期 | **自动同步** |

### 添加新店的最简流程

```jsonc
{
  "id": "new-shop-slug",
  "name_jp": "店名",
  "name_zh": "中文名",
  "name_romaji": "Romaji",
  "cuisine": "sushi",
  "area": "ginza",
  "price_range": 3,
  "google_place_id": "CHANGE_ME_new_shop",  // 脚本会自动找
  "google_rating": 0,
  "review_count": 0,
  "description_zh": "一句中文卖点",
  "tags": [],
  "address": "東京都中央区銀座…",            // 地址越准，自动匹配越靠谱
  "maps_url": "",
  "image_url": "",
  "featured": false,
  "last_updated": "2026-05-15"
}
```

下次脚本运行时会自动：
1. 用 `name_jp + address` 通过 Find Place API 查到真正的 `place_id` 并写回；
2. 拉取最新评分、评论数、官方地图链接；
3. 下载第一张官方照片到 `public/images/<id>.jpg`。

## 🤖 自动数据更新

### 一次性手动跑（本地）

```bash
export GOOGLE_PLACES_API_KEY=AIzaSy...
npm run update-data
```

### 自动每周跑（GitHub Action）

1. 在 Google Cloud Console 启用 **Places API**，创建一个 API Key（建议加 Application Restriction：限 IP 或仅服务端）。
2. 在 GitHub 仓库 → Settings → Secrets and variables → **Actions** → New repository secret：
   - Name: `GOOGLE_PLACES_API_KEY`
   - Value: 你的 API Key
3. 推送代码后，[`.github/workflows/update-ratings.yml`](.github/workflows/update-ratings.yml) 会：
   - 每周一 UTC 02:00 自动跑（也可在 Actions 页面手动 `workflow_dispatch`）
   - 跑完如果有变化，自动 commit & push 到 main 分支
   - Vercel 检测到 push 自动重新部署

### 费用估算

- Place Details: ~$0.017 / 次
- Find Place: ~$0.017 / 次（仅首次需要）
- Place Photo: 免费的 first photo + 后续低价
- 20 家店 × 每周 = 约 **$0.34 / 周 ≈ $18 / 年**

> GCP 新账号有 $200 / 月免费额度，初期完全不花钱。

## 🌐 部署到 Vercel

1. 把项目推到 GitHub。
2. 登录 [vercel.com](https://vercel.com) → Import Project → 选择仓库。
3. 全部默认设置即可（Next.js 自动识别）。
4. 设置自定义域名（可选）。

无需任何环境变量 —— API Key 只在 GitHub Action 里用，前端不会暴露。

## 🛠 后期扩展路线

| 功能 | 方案 |
|---|---|
| 繁体 / 英文 / 日文 | 用 `next-intl` 或自建 i18n，把 `description_zh` 拆为 `description: { zh, en, ja, zh_tw }` |
| 收藏 / 评论 | 加 Supabase / Firebase；改成 ISR 而非完全静态 |
| 地图模式 | 接 Mapbox / Google Maps Embed，依据 `place_id` 显示 marker |
| SEO 单店详情页 | 给每条数据生成 `/r/[id]` 路由（`generateStaticParams`） |
| 提交店铺 | 加一个简单的 issue 模板或 Cloudflare Form |

## ⚠️ 注意事项

- `data/restaurants.json` 里所有 `google_place_id` 当前都是占位符（`CHANGE_ME_*`）。第一次跑 `update-data` 脚本时它们会被自动替换成真实 ID 并写回，之后就稳定了。
- 描述、标签、价格区间属于编辑判断，自动脚本不会改写它们。
- Google Maps 评分会变动，描述里的「米其林三星」等信息请定期手动核查。

---

数据仅供参考，请以店家实际营业信息为准。
