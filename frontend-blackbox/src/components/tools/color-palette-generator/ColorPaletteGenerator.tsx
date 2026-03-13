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
      transition: { staggerChildren: 0.15 },
    },
  } as const;

  const item = {
    hidden: { opacity: 0, y: 40 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  } as const;

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className=" h-screen bg-secondary-bg overflow-x-hidden overflow-y-auto"
    >
      <div className="max-w-375 mx-auto mt-6  space-y-6">
        {/* Back */}
        <motion.div variants={item}>
          <Link
            to="/tools"
            className="text-sm text-secondary hover:text-primary transition-colors"
          >
            ← Back to Tools
          </Link>
        </motion.div>

        {/* Title */}
        <motion.div variants={item} className="space-y-2">
          <h1 className="text-5xl md:text-6xl font-bold">CHROMITA</h1>
          <p className="text-neutral-400 text-sm">
            Generate, customize and export beautiful color palettes.
          </p>
        </motion.div>

        {/* Controls Panel */}
        <motion.div
          variants={item}
          className="border border-neutral-800 rounded-xl p-6 space-y-6 bg-neutral-900/30 backdrop-blur"
        >
          <div className="grid gap-8 lg:grid-cols-3">
            {/* Palette Creation */}
            <div className="space-y-4">
              <p className="text-xs uppercase tracking-widest text-neutral-500">
                Create Palette
              </p>

              <div className="flex flex-wrap gap-3">
                <Tooltip text="Generate a completely random palette">
                  <RandomPalette onGenerate={generatePalette} />
                </Tooltip>

                <Tooltip text="Select a base color for the palette">
                  <ColorPicker value={baseColor} onChange={generatePalette} />
                </Tooltip>

                <AIPaletteGenerator setPalette={applyExternalPalette} />
              </div>
            </div>

            {/* Palette Controls */}
            <div className="space-y-4">
              <p className="text-xs uppercase tracking-widest text-neutral-500">
                Adjust Palette
              </p>

              <div className="flex flex-wrap gap-3">
                <HarmonySelector harmony={harmony} setHarmony={setHarmony} />

                <Tooltip text="Change how many shades the palette contains">
                  <ShadeControl
                    shadeCount={shadeCount}
                    onChange={changeShadeCount}
                  />
                </Tooltip>
              </div>
            </div>

            {/* Export Actions */}
            <div className="space-y-4 lg:text-right">
              <p className="text-xs uppercase tracking-widest text-neutral-500">
                Export
              </p>

              <div className="flex flex-wrap gap-3 lg:justify-end">
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
          </div>
        </motion.div>

        {/* Palette */}
        <motion.div variants={item} className="mx-auto">
          <PaletteGrid colors={palette} />
        </motion.div>

        {/* Side Panel */}
        <ToolsSidePanel open={panelOpen}>
          <UIPreview palette={palette} />
          <AccessibilityChecker palette={palette} />
        </ToolsSidePanel>

        <SidePanelToggle open={panelOpen} toggle={togglePanel} />
      </div>
    </motion.div>
  );
}
