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
import AccessibilityChecker from "./components/accessibility/AccessibilityChecket";

export default function ColorPaletteGenerator() {
  const {
    baseColor,
    palette,
    shadeCount,
    harmony,
    setHarmony,
    generatePalette,
    changeShadeCount,
  } = usePalette();

  return (
    <div className="h-full bg-secondary-bg space-y-8 py-10 overflow-auto">
      <Link className="p-3.5" to="/tools">
        Back to Tools
      </Link>
      <h1 className="text-7xl font-bold p-3.5">Color Palette Generator</h1>

      <div className="flex justify-center gap-4">
        <ColorPicker value={baseColor} onChange={generatePalette} />
        <ShadeControl shadeCount={shadeCount} onChange={changeShadeCount} />
        <CopyPalette palette={palette} />
        <ExportCSSVariables palette={palette} />
        <ExportTailwindPalette palette={palette} />
        <HarmonySelector harmony={harmony} setHarmony={setHarmony} />
        <RandomPalette onGenerate={generatePalette} />
      </div>

      <PaletteGrid colors={palette} />

      <UIPreview palette={palette} />

      <AccessibilityChecker palette={palette} />
    </div>
  );
}
