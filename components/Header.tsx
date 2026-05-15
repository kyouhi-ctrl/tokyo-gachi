'use client';

interface HeaderProps {
  searchValue: string;
  onSearch: (v: string) => void;
}

export default function Header({ searchValue, onSearch }: HeaderProps) {
  return (
    <header className="sticky top-0 z-30 border-b border-ink-100 bg-white/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center gap-4 px-4 py-3 md:gap-6 md:py-4">
        {/* Logo */}
        <a href="/" className="flex shrink-0 items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand-500 shadow-sm">
            <svg viewBox="0 0 36 36" className="h-7 w-7" aria-hidden>
              {/* 寿司饭 */}
              <ellipse cx="18" cy="24" rx="12" ry="7" fill="white" />
              {/* 鱼料（鲑鱼色） */}
              <ellipse cx="18" cy="16" rx="10.5" ry="5" fill="#FFCBA4" />
              {/* 海苔带 */}
              <rect x="6" y="21.5" width="24" height="3" rx="1.5" fill="rgba(0,0,0,0.55)" />
            </svg>
          </div>
          <div className="hidden flex-col leading-tight sm:flex">
            <span className="text-base font-bold text-ink-900">东京日料严选</span>
            <span className="text-[11px] text-ink-500">Tokyo Gourmet · 严选来日必吃</span>
          </div>
          <span className="text-base font-bold text-ink-900 sm:hidden">东京日料严选</span>
        </a>

        {/* Search */}
        <div className="ml-auto w-full max-w-md">
          <div className="relative">
            <svg
              className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-400"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M16 10.5a5.5 5.5 0 11-11 0 5.5 5.5 0 0111 0z" />
            </svg>
            <input
              type="text"
              value={searchValue}
              onChange={(e) => onSearch(e.target.value)}
              placeholder="搜索店名、菜系或区域…"
              className="h-10 w-full rounded-full border border-ink-200 bg-white pl-10 pr-4 text-sm text-ink-800 placeholder:text-ink-400 focus:border-brand-400 focus:outline-none focus:ring-2 focus:ring-brand-100"
            />
          </div>
        </div>

        {/* Language picker placeholder */}
        <button
          className="hidden h-10 shrink-0 items-center gap-1 rounded-full border border-ink-200 px-3 text-sm text-ink-600 hover:bg-ink-50 md:flex"
          title="语言切换 (后期上线)"
          disabled
        >
          <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9 9 0 100-18 9 9 0 000 18zM3.6 9h16.8M3.6 15h16.8M12 3a14 14 0 010 18M12 3a14 14 0 000 18" />
          </svg>
          简中
        </button>
      </div>
    </header>
  );
}
