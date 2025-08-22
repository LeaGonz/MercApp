import i18n from "i18next"                         // principal motor i18n
import { initReactI18next } from "react-i18next"   // React integration
import LanguageDetector from "i18next-browser-languagedetector"

// Importing translation resources
import pt from "./languages/pt.json"
import es from "./languages/es.json"
import en from "./languages/en.json"

i18n
    .use(LanguageDetector)
    .use(initReactI18next)          // conect i18n with React
    .init({
        resources: {
            pt: { translation: pt },  // Portuguese translations
            es: { translation: es },  // Spanish translations
            en: { translation: en }   // English translations
        },
        // lng: "pt",                  // default language
        fallbackLng: "pt",          // fallback language if translation not found
        interpolation: {
            escapeValue: false      // React already does escaping
        },
        detection: {
            order: ["localStorage", "navigator"],  // order for language detection
            caches: ["localStorage"]    // save selected language in localStorage
        }
    })

export default i18n;