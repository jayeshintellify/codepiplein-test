import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from './en.json';
import es from './es.json';
import { getItem } from './common/localStorage';

i18n.use(initReactI18next).init({
  resources: {
    en: { translation: en },
    es: { translation: es },
  },
  lng: getItem('language') || 'en', // default language
  fallbackLng: getItem('language') || 'en', // fallback language if the selected one is not available
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
