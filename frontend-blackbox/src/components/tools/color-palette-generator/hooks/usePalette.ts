import { useState, useMemo } from "react";
import { generateShades } from "../logic/generateShades";
import { generateHarmony } from "../logic/generateHarmony";

const DEFAULT_COLOR = "#656565";
const DEFAULT_SHADES = 9;

export function usePalette() {
  const [baseColor, setBaseColor] = useState(DEFAULT_COLOR);
  const [shadeCount, setShadeCount] = useState(DEFAULT_SHADES);
  const [harmony, setHarmony] = useState("monochrome");

  const palette = useMemo(() => {
    if (harmony === "monochrome") {
      return generateShades(baseColor, shadeCount);
    }

    return generateHarmony(baseColor, harmony);
  }, [baseColor, shadeCount, harmony]);

  const generatePalette = (color: string) => {
    setBaseColor(color);
  };

  const changeShadeCount = (count: number) => {
    setShadeCount(count);
  };

  return {
    baseColor,
    palette,
    shadeCount,
    harmony,
    setHarmony,
    generatePalette,
    changeShadeCount,
  };
}
