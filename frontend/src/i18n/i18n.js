import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import enNavbar from './locales/en/navbar.json';
import esNavbar from './locales/es/navbar.json';

const resources = {
    en: {
        navbar: enNavbar
    },
    es: {
        navbar: esNavbar
    }
};

i18n.use(initReactI18next).init({
    resources,
    lng: 'en',
    fallbackLng: 'en',
    initImmediate: false,
    interpolation: {
        escapeValue: false
    }
});

export default i18n;
