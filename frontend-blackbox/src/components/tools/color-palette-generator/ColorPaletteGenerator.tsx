import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import ColorPicker from "./components/ColorPicker";
import PaletteGrid from "./components/PaletteGrid";
import { usePalette } from "./hooks/usePalette";
import CopyPalette from "./components/CopyPalette";
import ShadeControl from "./components/ShadeControl";
import CopyCSSVariables from "./components/CopyCSSVariables";
import CopyTailwindPalette from "./components/CopyTailwindPalette";
import ExportPalettePNG from "./components/ExportPalettePNG";
import ExportPaletteJSON from "./components/ExportPaletteJSON";
import HarmonySelector from "./components/HarmonySelector";
import RandomPalette from "./components/RandomPalette";
import UIPreview from "./components/preview/UIPreview";
import AccessibilityChecker from "./components/accessibility/AccessibilityChecker";
import AIPaletteGenerator from "./components/ai/AIPaletteGenerator";
import ToolsSidePanel from "./components/sidepanel/ToolsSidePanel";
import SidePanelToggle from "./components/sidepanel/SidePanelToggle";
import ImagePaletteExtractor from "./components/image-palette/ImagePaletteExtractor";
import { getRandomGradient } from "./hooks/useRandomGradient";
import Tooltip from "./components/ui/Tooltip";
import { motion } from "framer-motion";

export default function ColorPaletteGenerator() {
  const [panelOpen, setPanelOpen] = useState(false);
  const [titleGradient, setTitleGradient] = useState(getRandomGradient());

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

  useEffect(() => {
    const interval = setInterval(() => {
      setTitleGradient(getRandomGradient());
    }, 60000);

    return () => clearInterval(interval);
  }, []);

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
      className="h-screen bg-secondary-bg overflow-x-hidden overflow-y-auto px-10"
    >
      <div className=" max-w-375 mx-auto mt-6  space-y-6">
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
        <motion.div
          variants={item}
          className="space-y-2 text-center xl:text-left"
        >
          <h1
            className="text-5xl md:text-6xl font-bold bg-clip-text text-transparent"
            style={{ backgroundImage: titleGradient }}
          >
            CHROMITA
          </h1>
          <p className="text-neutral-400 text-sm">
            Generate, customize and export beautiful color palettes.
          </p>
        </motion.div>

        {/* Controls Panel */}
        <div className="flex flex-col-reverse lg:flex-row gap-6 lg:gap-12">
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
              <div className="flex flex-col justify-between space-y-4">
                <div className="space-y-4">
                  <p className="text-xs uppercase tracking-widest text-neutral-500">
                    Adjust Palette
                  </p>

                  <div className="flex flex-wrap gap-3">
                    <HarmonySelector
                      harmony={harmony}
                      setHarmony={setHarmony}
                    />

                    <Tooltip text="Change how many shades the palette contains">
                      <ShadeControl
                        shadeCount={shadeCount}
                        onChange={changeShadeCount}
                      />
                    </Tooltip>
                  </div>
                </div>

                <div className="flex flex-wrap gap-3 mt-4">
                  <p className="text-xs uppercase tracking-widest text-neutral-500">
                    Copy to clipboard
                  </p>
                  <div className="flex flex-wrap gap-3">
                    <Tooltip text="Copy the entire palette to clipboard">
                      <CopyPalette palette={palette} />
                    </Tooltip>

                    <Tooltip text="Copy palette as CSS variables">
                      <CopyCSSVariables palette={palette} />
                    </Tooltip>

                    <Tooltip text="Copy palette as Tailwind config">
                      <CopyTailwindPalette palette={palette} />
                    </Tooltip>
                  </div>
                </div>
              </div>

              {/* Export Actions */}
              <div className="space-y-4 lg:text-right">
                <p className="text-xs text-right uppercase tracking-widest text-neutral-500">
                  Export
                </p>

                <div className="flex flex-col gap-3 items-end">
                  <Tooltip text="Export palette as a PNG image">
                    <ExportPalettePNG palette={palette} />
                  </Tooltip>

                  <Tooltip text="Export palette as a JSON file">
                    <ExportPaletteJSON palette={palette} />
                  </Tooltip>
                </div>
              </div>
            </div>
          </motion.div>
          <div className="flex justify-center">
            <ImagePaletteExtractor setPalette={applyExternalPalette} />
          </div>
        </div>

        {/* Palette */}
        <motion.div
          variants={item}
          className="flex justify-center xl:justify-start"
        >
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
