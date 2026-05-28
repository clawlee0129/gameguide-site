import { en } from './en';
import { zh } from './zh';
import { DictionaryStructure } from './dictionaries';

export type Language = 'en' | 'zh';

const dictionaries: Record<Language, DictionaryStructure> = {
  en,
  zh,
};

/**
 * Get dictionary for a specific language
 * @param lang - Language code ('en' or 'zh')
 * @returns Dictionary for the specified language
 */
export function getDictionary(lang: Language): DictionaryStructure {
  return dictionaries[lang];
}

/**
 * Extract and validate language from route parameters
 * @param params - Route parameters object with optional lang property
 * @returns Validated language code, defaults to 'en'
 */
export function getLangFromParams(params: { lang?: string }): Language {
  const lang = params.lang;
  if (lang === 'en' || lang === 'zh') {
    return lang;
  }
  return 'en'; // Default language
}

/**
 * Get the opposite language for language switching
 * @param currentLang - Current language code
 * @returns Opposite language code
 */
export function getOppositeLanguage(currentLang: Language): Language {
  return currentLang === 'en' ? 'zh' : 'en';
}

/**
 * Get language from Accept-Language header
 * @param acceptLanguage - Accept-Language header value
 * @returns Detected language code, defaults to 'en'
 */
export function getLangFromHeader(acceptLanguage?: string): Language {
  if (!acceptLanguage) return 'en';
  
  const languages = acceptLanguage.split(',').map(lang => {
    const [code, q = 'q=1'] = lang.trim().split(';');
    const quality = parseFloat(q.split('=')[1] || '1');
    return { code: code.split('-')[0].toLowerCase(), quality };
  });
  
  // Sort by quality
  languages.sort((a, b) => b.quality - a.quality);
  
  // Check for Chinese first
  const chineseLang = languages.find(l => l.code === 'zh');
  if (chineseLang) return 'zh';
  
  // Default to English
  return 'en';
}

export default {
  getDictionary,
  getLangFromParams,
  getOppositeLanguage,
  getLangFromHeader,
};

// Updated: 2026-05-26 - Phase 3 i18n