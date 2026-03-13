import { hexToHsl } from "../utils/colorUtils";

export function generateShades(baseColor: string, count: number) {
  const { h, s } = hexToHsl(baseColor);

  const shades = [];
  const step = 80 / (count - 1);

  for (let i = 0; i < count; i++) {
    const lightness = 90 - step * i;
    shades.push(`hsl(${h}, ${s}%, ${lightness}%)`);
  }

  return shades;
}
