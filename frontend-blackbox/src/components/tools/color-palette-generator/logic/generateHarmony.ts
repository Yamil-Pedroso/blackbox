function hexToHSL(hex: string) {
  let r = 0,
    g = 0,
    b = 0;

  r = parseInt(hex.substring(1, 3), 16) / 255;
  g = parseInt(hex.substring(3, 5), 16) / 255;
  b = parseInt(hex.substring(5, 7), 16) / 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);

  let h = 0,
    s = 0;
  const l = (max + min) / 2;

  if (max !== min) {
    const d = max - min;

    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      case b:
        h = (r - g) / d + 4;
        break;
    }

    h /= 6;
  }

  return {
    h: Math.round(h * 360),
    s: Math.round(s * 100),
    l: Math.round(l * 100),
  };
}

export function generateHarmony(hex: string, type: string) {
  const { h, s, l } = hexToHSL(hex);

  switch (type) {
    case "complementary":
      return [
        `hsl(${h}, ${s}%, ${l}%)`,
        `hsl(${(h + 180) % 360}, ${s}%, ${l}%)`,
      ];

    case "analogous":
      return [
        `hsl(${(h - 30 + 360) % 360}, ${s}%, ${l}%)`,
        `hsl(${h}, ${s}%, ${l}%)`,
        `hsl(${(h + 30) % 360}, ${s}%, ${l}%)`,
      ];

    case "triadic":
      return [
        `hsl(${h}, ${s}%, ${l}%)`,
        `hsl(${(h + 120) % 360}, ${s}%, ${l}%)`,
        `hsl(${(h + 240) % 360}, ${s}%, ${l}%)`,
      ];

    default:
      return [`hsl(${h}, ${s}%, ${l}%)`];
  }
}
