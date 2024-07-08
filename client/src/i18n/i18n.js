import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import translationEN from "../locales/en.json";
import translationVN from "../locales/vn.json";

export const locales = {
  en: " English",
  vi: "Tiếng việt",
};
const resources = {
  en: { translation: translationEN },
  vi: { translation: translationVN },
};
const getLanguage = () => {
  const lang = localStorage.getItem("i18nextLng");
  return lang || "en"; // Ngôn ngữ mặc định là tiếng Anh
};
i18next.use(LanguageDetector).use(initReactI18next).init({
  lng: getLanguage(),
  debug: false,
  resources,
});
