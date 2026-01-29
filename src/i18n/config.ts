export const locales = ['ko', 'en', 'ja', 'zh-CN', 'zh-TW', 'th', 'ru'] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = 'ko';

export const localeNames: Record<Locale, string> = {
    ko: '한국어',
    en: 'English',
    ja: '日本語',
    'zh-CN': '中文(简体)',
    'zh-TW': '中文(繁體)',
    th: 'ไทย',
    ru: 'Русский',
};
