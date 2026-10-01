import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'

import ka from './locales/ka/translation.json'
import en from './locales/en/translation.json'

export const SUPPORTED_LANGUAGES = ['ka', 'en'] as const
export type Language = typeof SUPPORTED_LANGUAGES[number]

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: 'ka',
    debug: import.meta.env.DEV,
    supportedLngs: [...SUPPORTED_LANGUAGES],
    interpolation: {
      escapeValue: false // React already escapes
    },
    resources: {
      ka: { translation: ka },
      en: { translation: en }
    },
    detection: {
      order: ['localStorage', 'navigator', 'htmlTag'],
      caches: ['localStorage']
    }
  }).then()

document.documentElement.lang = i18n.resolvedLanguage ?? 'ka'
i18n.on('languageChanged', (language) => {
  document.documentElement.lang = language
})

export default i18n
