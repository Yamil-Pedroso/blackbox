export function copyTailwindPalette(palette: string[], name = "color") {
  const steps = [100, 200, 300, 400, 500, 600, 700, 800, 900];

  const values = palette
    .map((color, index) => `  ${steps[index]}: "${color}",`)
    .join("\n");

  return `${name}: {\n${values}\n}`;
}
