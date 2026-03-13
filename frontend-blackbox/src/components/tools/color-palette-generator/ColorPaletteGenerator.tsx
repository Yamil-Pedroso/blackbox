import { useState } from "react";
import { Link } from "@tanstack/react-router";
import ColorPicker from "./components/ColorPicker";
import PaletteGrid from "./components/PaletteGrid";
import { usePalette } from "./hooks/usePalette";
import CopyPalette from "./components/CopyPalette";
import ShadeControl from "./components/ShadeControl";
import ExportCSSVariables from "./components/ExportCSSVariables";
import ExportTailwindPalette from "./components/ExportTailwindPalette";
import HarmonySelector from "./components/HarmonySelector";
import RandomPalette from "./components/RandomPalette";
import UIPreview from "./components/preview/UIPreview";
import AccessibilityChecker from "./components/accessibility/AccessibilityChecker";
import AIPaletteGenerator from "./components/ai/AIPaletteGenerator";
import ToolsSidePanel from "./components/sidepanel/ToolsSidePanel";
import SidePanelToggle from "./components/sidepanel/SidePanelToggle";
import Tooltip from "./components/ui/Tooltip";
import { motion } from "framer-motion";

export default function ColorPaletteGenerator() {
  const [panelOpen, setPanelOpen] = useState(false);

  const {
    baseColor,
    palette,
    shadeCount,
    harmony,
    setHarmony,
    generatePalette,
    changeShadeCount,
    applyExternalPalette,
  } = usePalette();

  const togglePanel = () => {
    setPanelOpen((prev) => !prev);
  };

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  } as const;

  const item = {
    hidden: { opacity: 0, y: 40 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  } as const;

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="h-screen bg-secondary-bg overflow-x-hidden overflow-y-auto"
    >
      <div className="max-w-425 mx-auto px-6 py-8 space-y-8">
        <motion.div variants={item}>
          <Link
            to="/tools"
            className="text-sm text-secondary hover:text-primary transition-colors"
          >
            ← Back to Tools
          </Link>
        </motion.div>

        <motion.h1
          variants={item}
          className="text-4xl md:text-5xl lg:text-6xl font-bold"
        >
          CHROMITA
        </motion.h1>

        <motion.div
          variants={item}
          className="border border-neutral-800 px-6 py-4"
        >
          <div className="grid gap-4 lg:grid-cols-3">
            <div className="flex flex-wrap gap-3 items-center">
              <Tooltip text="Select a base color for the palette">
                <ColorPicker value={baseColor} onChange={generatePalette} />
              </Tooltip>
              <Tooltip text="Change how many shades the palette contains">
                <ShadeControl
                  shadeCount={shadeCount}
                  onChange={changeShadeCount}
                />
              </Tooltip>
            </div>

            <div className="flex flex-wrap gap-3 items-center">
              <HarmonySelector harmony={harmony} setHarmony={setHarmony} />

              <Tooltip text="Generate a completely random palette">
                <RandomPalette onGenerate={generatePalette} />
              </Tooltip>
              <Tooltip text="Generate a palette using AI from a text prompt">
                <AIPaletteGenerator setPalette={applyExternalPalette} />
              </Tooltip>
            </div>

            <div className="flex flex-wrap gap-3 items-center lg:justify-end">
              <Tooltip text="Copy the entire palette to clipboard">
                <CopyPalette palette={palette} />
              </Tooltip>
              <Tooltip text="Export palette as CSS variables">
                <ExportCSSVariables palette={palette} />
              </Tooltip>
              <Tooltip text="Export palette as Tailwind config">
                <ExportTailwindPalette palette={palette} />
              </Tooltip>
            </div>
          </div>
        </motion.div>

        <motion.div variants={item} className="mt-6">
          <PaletteGrid colors={palette} />
        </motion.div>

        <ToolsSidePanel open={panelOpen}>
          <UIPreview palette={palette} />
          <AccessibilityChecker palette={palette} />
        </ToolsSidePanel>

        <SidePanelToggle open={panelOpen} toggle={togglePanel} />
      </div>
    </motion.div>
  );
}
