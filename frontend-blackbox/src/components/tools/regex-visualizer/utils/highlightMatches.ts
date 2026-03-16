export function highlightMatches(text: string, pattern: string) {
  try {
    const regex = new RegExp(pattern, "g");

    return text.replace(regex, (match) => {
      return `<mark>${match}</mark>`;
    });
  } catch {
    return text;
  }
}
