import { useState } from "react";
import { generateShades } from "../logic/generateShades";

export function usePalette() {
  const initialColor = "#656565";

  const [baseColor, setBaseColor] = useState(initialColor);
  const [palette, setPalette] = useState<string[]>(() =>
    generateShades(initialColor),
  );

  const generatePalette = (color: string) => {
    setBaseColor(color);
    setPalette(generateShades(color));
  };

  return { baseColor, palette, generatePalette };
}
