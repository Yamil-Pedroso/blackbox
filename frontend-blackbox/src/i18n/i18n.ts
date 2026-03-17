import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

// Home
import enMain from "./locales/en/main.json";
import esMain from "./locales/es/main.json";
import deMain from "./locales/de/main.json";

// Features Header
import enHeaderFeatures from "./locales/en/features.json";
import esHeaderFeatures from "./locales/es/features.json";
import deHeaderFeatures from "./locales/de/features.json";

// Left Sidebar
import enLeftSidebar from "./locales/en/leftSidebar.json";
import esLeftSidebar from "./locales/es/leftSidebar.json";
import deLeftSidebar from "./locales/de/leftSidebar.json";

// Right Sidebar
import enRightSidebar from "./locales/en/rightSidebar.json";
import esRightSidebar from "./locales/es/rightSidebar.json";
import deRightSidebar from "./locales/de/rightSidebar.json";

// Top Navbar
import enTopNavbar from "./locales/en/topNavbar.json";
import esTopNavbar from "./locales/es/topNavbar.json";
import deTopNavbar from "./locales/de/topNavbar.json";

// --- Feature-specific translations ---
// Tools
import enTools from "./locales/en/tools/tools.json";
import esTools from "./locales/es/tools/tools.json";
import deTools from "./locales/de/tools/tools.json";

// Color Palette Generator - Tool
import colorPaletteGenerator_en from "./locales/en/tools/colorPaletteGenerator/colorPaletteGenerator.json";
import colorPaletteGenerator_es from "./locales/es/tools/colorPaletteGenerator/colorPaletteGenerator.json";
import colorPaletteGenerator_de from "./locales/de/tools/colorPaletteGenerator/colorPaletteGenerator.json";

// Color Palette Generator - Process - Tool
import colorPaletteGeneratorProcess_en from "./locales/en/tools/colorPaletteGenerator/colorPaletteGeneratorProcess.json";
import colorPaletteGeneratorProcess_es from "./locales/es/tools/colorPaletteGenerator/colorPaletteGeneratorProcess.json";
import colorPaletteGeneratorProcess_de from "./locales/de/tools/colorPaletteGenerator/colorPaletteGeneratorProcess.json";

// Regex Visualizer - Tool
import regexVisualizer_en from "./locales/en/tools/regexVisualizer/regexVisualizer.json";
import regexVisualizer_es from "./locales/es/tools/regexVisualizer/regexVisualizer.json";
import regexVisualizer_de from "./locales/de/tools/regexVisualizer/regexVisualizer.json";

// Regex Visualizer - Process - Tool
import regexVisualizerProcess_en from "./locales/en/tools/regexVisualizer/regexVisualizerProcess.json";
import regexVisualizerProcess_es from "./locales/es/tools/regexVisualizer/regexVisualizerProcess.json";
import regexVisualizerProcess_de from "./locales/de/tools/regexVisualizer/regexVisualizerProcess.json";

// Accessibility Playground - Tool
import accessibilityPlayground_en from "./locales/en/tools/accessibilityPlayground/accessibilityPlayground.json";
import accessibilityPlayground_es from "./locales/es/tools/accessibilityPlayground/accessibilityPlayground.json";
import accessibilityPlayground_de from "./locales/de/tools/accessibilityPlayground/accessibilityPlayground.json";

// Accessibility Playground - Process - Tool
import accessibilityPlaygroundProcess_en from "./locales/en/tools/accessibilityPlayground/accessibilityPlaygroundProcess.json";
import accessibilityPlaygroundProcess_es from "./locales/es/tools/accessibilityPlayground/accessibilityPlaygroundProcess.json";
import accessibilityPlaygroundProcess_de from "./locales/de/tools/accessibilityPlayground/accessibilityPlaygroundProcess.json";

// AI
import ai_en from "./locales/en/ai.json";
import ai_es from "./locales/es/ai.json";
import ai_de from "./locales/de/ai.json";

// Systems
import systems_en from "./locales/en/systems.json";
import systems_es from "./locales/es/systems.json";
import systems_de from "./locales/de/systems.json";

// Experiments
import exp_en from "./locales/en/experiments.json";
import exp_es from "./locales/es/experiments.json";
import exp_de from "./locales/de/experiments.json";

// Mini Games
import mini_en from "./locales/en/miniGames.json";
import mini_es from "./locales/es/miniGames.json";
import mini_de from "./locales/de/miniGames.json";

// Pending to Refactoring
import booking_en from "./locales/en/bookingSimulation.json";
import booking_es from "./locales/es/bookingSimulation.json";
import booking_de from "./locales/de/bookingSimulation.json";
// Pending to Refactoring
import booking_platform_en from "./locales/en/bookingPlatform.json";
import booking_platform_es from "./locales/es/bookingPlatform.json";
import booking_platform_de from "./locales/de/bookingPlatform.json";

// Pending to Refactoring
import uiux_en from "./locales/en/uiux.json";
import uiux_es from "./locales/es/uiux.json";
import uiux_de from "./locales/de/uiux.json";

// Full stack projects data
import fullStackData_en from "./locales/en/fs-web-projects/data.json";
import fullStackData_es from "./locales/es/fs-web-projects/data.json";
import fullStackData_de from "./locales/de/fs-web-projects/data.json";

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        topNavbar: enTopNavbar,
        main: enMain,
        headerFeatures: enHeaderFeatures,
        leftSidebar: enLeftSidebar,
        rightSidebar: enRightSidebar,
        tools: enTools,
        colorPaletteGenerator: colorPaletteGenerator_en,
        colorPaletteGeneratorProcess: colorPaletteGeneratorProcess_en,
        regexVisualizer: regexVisualizer_en,
        regexVisualizerProcess: regexVisualizerProcess_en,
        accessibilityPlayground: accessibilityPlayground_en,
        accessibilityPlaygroundProcess: accessibilityPlaygroundProcess_en,
        ai: ai_en,
        systems: systems_en,
        experiments: exp_en,
        miniGames: mini_en,
        bookingSimulation: booking_en,
        bookingPlatform: booking_platform_en,
        uiux: uiux_en,
        fullStackProjects: fullStackData_en,
      },
      es: {
        topNavbar: esTopNavbar,
        main: esMain,
        headerFeatures: esHeaderFeatures,
        leftSidebar: esLeftSidebar,
        rightSidebar: esRightSidebar,
        tools: esTools,
        colorPaletteGenerator: colorPaletteGenerator_es,
        colorPaletteGeneratorProcess: colorPaletteGeneratorProcess_es,
        regexVisualizer: regexVisualizer_es,
        regexVisualizerProcess: regexVisualizerProcess_es,
        accessibilityPlayground: accessibilityPlayground_es,
        accessibilityPlaygroundProcess: accessibilityPlaygroundProcess_es,
        ai: ai_es,
        systems: systems_es,
        experiments: exp_es,
        miniGames: mini_es,
        bookingSimulation: booking_es,
        bookingPlatform: booking_platform_es,
        uiux: uiux_es,
        fullStackProjects: fullStackData_es,
      },
      de: {
        topNavbar: deTopNavbar,
        main: deMain,
        headerFeatures: deHeaderFeatures,
        leftSidebar: deLeftSidebar,
        rightSidebar: deRightSidebar,
        tools: deTools,
        colorPaletteGenerator: colorPaletteGenerator_de,
        colorPaletteGeneratorProcess: colorPaletteGeneratorProcess_de,
        regexVisualizer: regexVisualizer_de,
        regexVisualizerProcess: regexVisualizerProcess_de,
        accessibilityPlayground: accessibilityPlayground_de,
        accessibilityPlaygroundProcess: accessibilityPlaygroundProcess_de,
        ai: ai_de,
        systems: systems_de,
        experiments: exp_de,
        miniGames: mini_de,
        bookingSimulation: booking_de,
        bookingPlatform: booking_platform_de,
        uiux: uiux_de,
        fullStackProjects: fullStackData_de,
      },
    },
    defaultNS: "main",
    fallbackLng: "en",
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
