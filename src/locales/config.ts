export type LocaleType = keyof typeof localeMap;

export const localeMap = {
  zh_CN: 'zh_CN',
  en_US: 'en_US',
} as const;