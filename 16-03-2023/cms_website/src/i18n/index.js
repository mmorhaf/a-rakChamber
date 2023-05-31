import en from "./en.json";
import ar from "./ar.json";
import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const language = Boolean(JSON.parse(localStorage.getItem("isRTL")))
  ? "ar"
  : "en";
i18n.use(initReactI18next).init({
  // we init with resources
  resources: {
    en: en,
    ar: ar,
  },

  lng: language,
  // debug: false,

  // have a common namespace used around the full app
  // ns: ["translations"],
  // defaultNS: "translations",

  //keySeparator: false, // we use content as keys

  interpolation: {
    //escapeValue: false, // not needed for react!!
    formatSeparator: ".",
  },

  // react: {
  //   wait: true,
  // },
});

export default i18n;
