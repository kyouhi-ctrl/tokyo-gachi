'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { UI, type Lang, type UIStrings } from '@/lib/i18n';

interface LangCtx {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: UIStrings;
}

const LangContext = createContext<LangCtx>({
  lang: 'zh',
  setLang: () => {},
  t: UI.zh,
});

export function LangProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>('zh');

  useEffect(() => {
    const saved = localStorage.getItem('lang');
    if (saved === 'en' || saved === 'zh') setLangState(saved);
  }, []);

  const setLang = (l: Lang) => {
    setLangState(l);
    try {
      localStorage.setItem('lang', l);
    } catch {
      /* localStorage 不可用时静默忽略 */
    }
    document.documentElement.lang = l === 'en' ? 'en' : 'zh-CN';
  };

  return (
    <LangContext.Provider value={{ lang, setLang, t: UI[lang] }}>
      {children}
    </LangContext.Provider>
  );
}

export function useLang() {
  return useContext(LangContext);
}
