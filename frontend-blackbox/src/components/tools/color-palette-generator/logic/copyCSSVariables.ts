export function copyCSSVariables(palette: string[]) {
  const steps = [100, 200, 300, 400, 500, 600, 700, 800, 900];

  const variables = palette
    .map((color, i) => `  --color-${steps[i]}: ${color};`)
    .join("\n");

  return `:root {\n${variables}\n}`;
}
