import { useState, useMemo } from "react";
import { generateShades } from "../logic/generateShades";
import { generateHarmony } from "../logic/generateHarmony";

const DEFAULT_COLOR = "#656565";
const DEFAULT_SHADES = 9;

export function usePalette() {
  const [baseColor, setBaseColor] = useState(DEFAULT_COLOR);
  const [shadeCount, setShadeCount] = useState(DEFAULT_SHADES);
  const [harmony, setHarmony] = useState("monochrome");

  const [externalPalette, setExternalPalette] = useState<string[] | null>(null);

  const palette = useMemo(() => {
    if (externalPalette) {
      return externalPalette;
    }

    if (harmony === "monochrome") {
      return generateShades(baseColor, shadeCount);
    }

    return generateHarmony(baseColor, harmony);
  }, [baseColor, shadeCount, harmony, externalPalette]);

  const generatePalette = (color: string) => {
    setExternalPalette(null);
    setBaseColor(color);
  };

  const changeShadeCount = (count: number) => {
    setExternalPalette(null);
    setShadeCount(count);
  };

  const applyExternalPalette = (colors: string[]) => {
    setExternalPalette(colors);
  };

  return {
    baseColor,
    palette,
    shadeCount,
    harmony,
    setHarmony,
    generatePalette,
    changeShadeCount,
    applyExternalPalette,
  };
}
