'use client';

import { usePathname, useRouter } from 'next/navigation';
import { Language } from '@/i18n';

interface LanguageSwitcherProps {
  currentLang: Language;
}

const languageLabels: Record<Language, string> = {
  en: 'EN',
  zh: '中文',
};

export function LanguageSwitcher({ currentLang }: LanguageSwitcherProps) {
  const pathname = usePathname();
  const router = useRouter();

  const targetLang: Language = currentLang === 'en' ? 'zh' : 'en';

  const handleSwitch = () => {
    // Replace the language segment in the pathname
    const pathWithoutLang = pathname.replace(/^\/(en|zh)(\/|$)/, '/');
    const newPath = `/${targetLang}${pathWithoutLang === '/' ? '' : pathWithoutLang}`;
    router.push(newPath);
  };

  return (
    <button
      onClick={handleSwitch}
      className="rounded-md border border-gray-700 px-2.5 py-1 text-xs font-medium text-gray-300 transition-colors hover:border-purple-500 hover:text-purple-400"
      aria-label={`Switch to ${targetLang === 'en' ? 'English' : '中文'}`}
    >
      {languageLabels[targetLang]}
    </button>
  );
}

// Updated: 2026-05-26 - Phase 3 i18n