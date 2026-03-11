export function hslStringToValues(hsl: string) {
  const match = hsl.match(/\d+/g);

  if (!match) return null;

  return {
    h: Number(match[0]),
    s: Number(match[1]),
    l: Number(match[2]),
  };
}
