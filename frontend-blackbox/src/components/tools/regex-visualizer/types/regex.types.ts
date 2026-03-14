export type RegexTokenType =
  | "literal"
  | "groupStart"
  | "groupEnd"
  | "quantifier"
  | "alternation"
  | "characterClass"
  | "unknown";

export interface RegexToken {
  type: RegexTokenType;
  value: string;
}
