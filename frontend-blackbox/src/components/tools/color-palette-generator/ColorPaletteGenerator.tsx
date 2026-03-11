import ColorPicker from "./components/ColorPicker";
import PaletteGrid from "./components/PaletteGrid";
import { usePalette } from "./hooks/usePalette";

export default function ColorPaletteGenerator() {
  const { baseColor, palette, generatePalette } = usePalette();

  return (
    <div className="space-y-8 p-10">
      <h1 className="text-2xl font-bold">Color Palette Generator</h1>

      <ColorPicker value={baseColor} onChange={generatePalette} />

      <PaletteGrid colors={palette} />
    </div>
  );
}
