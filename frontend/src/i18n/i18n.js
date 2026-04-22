import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
// EN Imports
import enNavbar from './locales/en/navbar.json';
import enCommon from './locales/en/common.json';
import enFooter from './locales/en/footer.json';
import states from './locales/en/states.json';
// ES Imports
import esNavbar from './locales/es/navbar.json';
import esCommon from './locales/es/common.json';
import esFooter from './locales/es/footer.json';
import esStates from './locales/es/states.json';

const resources = {
    en: {
        common: enCommon,
        navbar: enNavbar,
        footer: enFooter,
        states: states
    },
    es: {
        common: esCommon,
        navbar: esNavbar,
        footer: esFooter,
        states: esStates
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
