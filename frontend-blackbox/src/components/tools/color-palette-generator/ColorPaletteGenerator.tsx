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
import { useState } from "react";

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

  return (
    <div className="min-h-screen overflow-y-auto bg-secondary-bg">
      <div className="max-w-425 mx-auto px-6 py-8 space-y-8">
        <Link
          to="/tools"
          className="text-sm text-secondary hover:text-primary transition-colors"
        >
          ← Back to Tools
        </Link>

        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold">
          Color Palette Generator
        </h1>

        <div className="bg-neutral-900/40 border border-neutral-800 rounded-xl px-6 py-4">
          <div className="grid gap-4 lg:grid-cols-3">
            <div className="flex flex-wrap gap-3 items-center">
              <ColorPicker value={baseColor} onChange={generatePalette} />
              <ShadeControl
                shadeCount={shadeCount}
                onChange={changeShadeCount}
              />
            </div>

            <div className="flex flex-wrap gap-3 items-center">
              <HarmonySelector harmony={harmony} setHarmony={setHarmony} />
              <RandomPalette onGenerate={generatePalette} />
              <AIPaletteGenerator setPalette={applyExternalPalette} />
            </div>

            <div className="flex flex-wrap gap-3 items-center lg:justify-end">
              <CopyPalette palette={palette} />
              <ExportCSSVariables palette={palette} />
              <ExportTailwindPalette palette={palette} />
            </div>
          </div>
        </div>

        <div className="mt-6">
          <PaletteGrid colors={palette} />
        </div>

        <ToolsSidePanel open={panelOpen}>
          <UIPreview palette={palette} />
          <AccessibilityChecker palette={palette} />
        </ToolsSidePanel>

        <SidePanelToggle open={panelOpen} toggle={togglePanel} />
      </div>
    </div>
  );
}
