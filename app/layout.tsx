import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: '东京日料严选 | 东京值得去的日料店铺导航',
  description:
    '为来日中文游客精选的东京日料店铺导航，含寿司、拉面、天妇罗、烧鸟、和牛等。谷歌评分每周自动更新，专注真正靠谱的店。',
  keywords: ['东京', '日料', '寿司', '拉面', '美食推荐', 'Tokyo', '日本料理'],
  openGraph: {
    title: '东京日料严选',
    description: '东京值得去的日料店铺导航',
    locale: 'zh_CN',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh-CN">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link
          href="https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@400;500;700&family=Noto+Sans+SC:wght@400;500;700&family=Noto+Serif+JP:wght@500;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
