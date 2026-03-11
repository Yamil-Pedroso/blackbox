export type Color = {
  hex: string;
  rgb: string;
  hsl: string;
};

export type ColorPalette = {
  baseColor: Color;
  shades: Color[];
};
