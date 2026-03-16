export function explainRegex(pattern: string) {
  const explanations: { token: string; meaning: string }[] = [];

  if (pattern.includes("\\d")) {
    explanations.push({
      token: "\\d",
      meaning: "Digit (0-9)",
    });
  }

  if (pattern.includes("\\w")) {
    explanations.push({
      token: "\\w",
      meaning: "Word character (letter, number, underscore)",
    });
  }

  if (pattern.includes("\\s")) {
    explanations.push({
      token: "\\s",
      meaning: "Whitespace character",
    });
  }

  if (pattern.includes("+")) {
    explanations.push({
      token: "+",
      meaning: "One or more times",
    });
  }

  if (pattern.includes("*")) {
    explanations.push({
      token: "*",
      meaning: "Zero or more times",
    });
  }

  if (pattern.includes("?")) {
    explanations.push({
      token: "?",
      meaning: "Optional",
    });
  }

  return explanations;
}
