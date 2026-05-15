export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-ink-50 text-center">
      <div className="text-6xl">🍣</div>
      <h1 className="text-2xl font-bold text-ink-900">页面不存在</h1>
      <p className="text-ink-500">找不到你要的页面，回到首页看看吧。</p>
      <a
        href="/"
        className="mt-2 rounded-full bg-brand-500 px-6 py-2.5 text-sm font-semibold text-white hover:bg-brand-600"
      >
        回到首页
      </a>
    </div>
  );
}
