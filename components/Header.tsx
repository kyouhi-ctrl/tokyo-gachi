'use client';

import { useLang } from './LangContext';

interface HeaderProps {
  searchValue: string;
  onSearch: (v: string) => void;
}

export default function Header({ searchValue, onSearch }: HeaderProps) {
  const { lang, setLang, t } = useLang();

  return (
    <header className="sticky top-0 z-30 border-b border-ink-100 bg-white/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center gap-4 px-4 py-3 md:gap-6 md:py-4">
        {/* Logo */}
        <a href="/" className="flex shrink-0 items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand-500 shadow-sm">
            <svg viewBox="0 0 36 36" className="h-7 w-7" aria-hidden>
              <ellipse cx="18" cy="24" rx="12" ry="7" fill="white" />
              <ellipse cx="18" cy="16" rx="10.5" ry="5" fill="#FFCBA4" />
              <rect x="6" y="21.5" width="24" height="3" rx="1.5" fill="rgba(0,0,0,0.55)" />
            </svg>
          </div>
          <div className="hidden flex-col leading-tight sm:flex">
            <span className="text-base font-bold text-ink-900">{t.siteName}</span>
            <span className="text-[11px] text-ink-500">{t.siteTagline}</span>
          </div>
          <span className="text-base font-bold text-ink-900 sm:hidden">{t.siteName}</span>
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
              placeholder={t.searchPlaceholder}
              className="h-10 w-full rounded-full border border-ink-200 bg-white pl-10 pr-4 text-sm text-ink-800 placeholder:text-ink-400 focus:border-brand-400 focus:outline-none focus:ring-2 focus:ring-brand-100"
            />
          </div>
        </div>

        {/* Language switch */}
        <button
          onClick={() => setLang(lang === 'zh' ? 'en' : 'zh')}
          className="flex h-10 shrink-0 items-center gap-1.5 rounded-full border border-ink-200 px-3 text-sm font-medium text-ink-700 transition hover:border-ink-300 hover:bg-ink-50"
        >
          <svg className="h-4 w-4 text-ink-500" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9 9 0 100-18 9 9 0 000 18zM3.6 9h16.8M3.6 15h16.8M12 3a14 14 0 010 18M12 3a14 14 0 000 18" />
          </svg>
          {t.langButton}
        </button>
      </div>
    </header>
  );
}
