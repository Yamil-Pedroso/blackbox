import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

import enMain from "./locales/en/main.json";
import esMain from "./locales/es/main.json";
import deMain from "./locales/de/main.json";
import enLeftSidebar from "./locales/en/leftSidebar.json";
import esLeftSidebar from "./locales/es/leftSidebar.json";
import deLeftSidebar from "./locales/de/leftSidebar.json";
import enRightSidebar from "./locales/en/rightSidebar.json";
import esRightSidebar from "./locales/es/rightSidebar.json";
import deRightSidebar from "./locales/de/rightSidebar.json";
import enTopNavbar from "./locales/en/topNavbar.json";
import esTopNavbar from "./locales/es/topNavbar.json";
import deTopNavbar from "./locales/de/topNavbar.json";
import enTools from "./locales/en/tools.json";
import esTools from "./locales/es/tools.json";
import deTools from "./locales/de/tools.json";
import ai_en from "./locales/en/ai.json";
import ai_es from "./locales/es/ai.json";
import ai_de from "./locales/de/ai.json";

import systems_en from "./locales/en/systems.json";
import systems_es from "./locales/es/systems.json";
import systems_de from "./locales/de/systems.json";

import exp_en from "./locales/en/experiments.json";
import exp_es from "./locales/es/experiments.json";
import exp_de from "./locales/de/experiments.json";

import mini_en from "./locales/en/miniGames.json";
import mini_es from "./locales/es/miniGames.json";
import mini_de from "./locales/de/miniGames.json";

import booking_en from "./locales/en/bookingSimulation.json";
import booking_es from "./locales/es/bookingSimulation.json";
import booking_de from "./locales/de/bookingSimulation.json";

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        topNavbar: enTopNavbar,
        main: enMain,
        leftSidebar: enLeftSidebar,
        rightSidebar: enRightSidebar,
        tools: enTools,
        ai: ai_en,
        systems: systems_en,
        experiments: exp_en,
        miniGames: mini_en,
        bookingSimulation: booking_en,
      },
      es: {
        topNavbar: esTopNavbar,
        main: esMain,
        leftSidebar: esLeftSidebar,
        rightSidebar: esRightSidebar,
        tools: esTools,
        ai: ai_es,
        systems: systems_es,
        experiments: exp_es,
        miniGames: mini_es,
        bookingSimulation: booking_es,
      },
      de: {
        topNavbar: deTopNavbar,
        main: deMain,
        leftSidebar: deLeftSidebar,
        rightSidebar: deRightSidebar,
        tools: deTools,
        ai: ai_de,
        systems: systems_de,
        experiments: exp_de,
        miniGames: mini_de,
        bookingSimulation: booking_de,
      },
    },
    defaultNS: "main",
    fallbackLng: "en",
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
