import type { RegexToken } from "../types/regex.types";

export function parseRegex(pattern: string): RegexToken[] {
  const tokens = pattern.split(/(\(|\)|\+|\*|\?|\|)/);

  return tokens.filter(Boolean).map((token) => ({
    type: "literal",
    value: token,
  }));
}
