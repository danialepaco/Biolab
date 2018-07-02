import ReactNative from 'react-native';
import I18n from 'react-native-i18n';

// Import all locales
import en from '../locales/en.json';
import es from '../locales/es.json';

// Should the app fallback to English if user locale doesn't exists
I18n.fallbacks = true;

// Define the supported translations
I18n.translations = {
    en,
    es,
};

const currentLocale = I18n.currentLocale().slice(0,2);

// Is it a RTL language?
export const isRTL = currentLocale.indexOf('he') === 0 || 
currentLocale.indexOf('ar') === 0;

// Allow RTL alignment in RTL languages
ReactNative.I18nManager.allowRTL(isRTL);

/**
 * The method we'll use instead of a regular string
 * @param {name} name the key.
 * @param {params} params values
 * @returns {number} The sum of the two numbers.
 */
export function strings(name, params = {}) {
    return I18n.t(name, params);
};

export default I18n;
