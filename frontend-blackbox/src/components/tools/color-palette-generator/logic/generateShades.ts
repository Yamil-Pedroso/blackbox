import { hexToHsl } from "../utils/colorUtils";

export function generateShades(baseColor: string) {
  const { h, s } = hexToHsl(baseColor);

  const shades = [];

  for (let i = 90; i >= 10; i -= 10) {
    shades.push(`hsl(${h}, ${s}%, ${i}%)`);
  }

  return shades;
}
