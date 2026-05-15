/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // 输出为纯静态 HTML / JS，方便部署到 Cloudflare Pages、GitHub Pages、Vercel 等
  output: 'export',
  images: {
    unoptimized: true, // 静态导出模式下必须关掉 next/image 优化
  },
  trailingSlash: true, // Cloudflare Pages 对带尾斜杠的路由更友好
};

module.exports = nextConfig;
