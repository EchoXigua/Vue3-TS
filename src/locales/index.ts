import { createI18n } from "vue-i18n";
import { localeMap } from './config';
import type { App } from 'vue';

async function createI18nOptions() {

  return {
    locale:'zh',
    // legacy: false,
    fallbackLocale: localeMap.zh_CN, // set fallback locale

    globalInjection: true,
    silentTranslationWarn: true, // true - warning off
    missingWarn: false,
    silentFallbackWarn: true,
  };
}

const options = await createI18nOptions()
export const i18n = createI18n(options)

export async function setupI18n(app: App) {
  app.use(i18n);
}