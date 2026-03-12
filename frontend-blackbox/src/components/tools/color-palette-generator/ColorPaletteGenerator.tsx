import { Link } from "@tanstack/react-router";
import ColorPicker from "./components/ColorPicker";
import PaletteGrid from "./components/PaletteGrid";
import { usePalette } from "./hooks/usePalette";

export default function ColorPaletteGenerator() {
  const { baseColor, palette, generatePalette } = usePalette();

  return (
    <div className="h-full bg-secondary-bg space-y-8 py-10">
      <Link className="p-3.5" to="/tools">
        Back to Tools
      </Link>
      <h1 className="text-2xl font-bold p-3.5">Color Palette Generator</h1>

      <ColorPicker value={baseColor} onChange={generatePalette} />

      <PaletteGrid colors={palette} />
    </div>
  );
}
