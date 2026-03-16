export interface CheatItem {
  pattern: string;
  meaning: string;
}

export interface CheatCategory {
  title: string;
  items: CheatItem[];
}

export const regexCheatsheet: CheatCategory[] = [
  {
    title: "Character Classes",
    items: [
      { pattern: "\\d", meaning: "Digit (0-9)" },
      { pattern: "\\D", meaning: "Not a digit" },
      { pattern: "\\w", meaning: "Word character (letter, digit, underscore)" },
      { pattern: "\\W", meaning: "Not a word character" },
      { pattern: "\\s", meaning: "Whitespace" },
      { pattern: "\\S", meaning: "Not whitespace" },
      { pattern: ".", meaning: "Any character except newline" },
    ],
  },
  {
    title: "Quantifiers",
    items: [
      { pattern: "+", meaning: "One or more times" },
      { pattern: "*", meaning: "Zero or more times" },
      { pattern: "?", meaning: "Optional (0 or 1)" },
      { pattern: "{n}", meaning: "Exactly n times" },
      { pattern: "{n,}", meaning: "At least n times" },
      { pattern: "{n,m}", meaning: "Between n and m times" },
    ],
  },
  {
    title: "Anchors",
    items: [
      { pattern: "^", meaning: "Start of string" },
      { pattern: "$", meaning: "End of string" },
      { pattern: "\\b", meaning: "Word boundary" },
      { pattern: "\\B", meaning: "Not a word boundary" },
    ],
  },
  {
    title: "Groups & Alternation",
    items: [
      { pattern: "(abc)", meaning: "Capturing group" },
      { pattern: "a|b", meaning: "OR operator" },
      { pattern: "(?:abc)", meaning: "Non-capturing group" },
    ],
  },
  {
    title: "Common Patterns",
    items: [
      { pattern: "\\d+", meaning: "Find numbers" },
      { pattern: "\\w+", meaning: "Find words" },
      { pattern: "\\d{4}-\\d{2}-\\d{2}", meaning: "Date YYYY-MM-DD" },
      { pattern: "https?:\\/\\/[^\\s]+", meaning: "URL" },
      { pattern: "^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$", meaning: "Email" },
      { pattern: "task-\\d+", meaning: "Task ID" },
    ],
  },
];
