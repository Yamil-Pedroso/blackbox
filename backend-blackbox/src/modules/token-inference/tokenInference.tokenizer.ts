/**
 * Splits text into approximate word/punctuation units while preserving leading
 * whitespace so joining the resulting tokens reconstructs the original text.
 */
export function approximateTokenize(text: string): string[] {
  const pieces = text.match(/\s+|[\p{L}\p{N}]+|[^\s\p{L}\p{N}]/gu) ?? [];
  const tokens: string[] = [];
  let pendingWhitespace = "";

  for (const piece of pieces) {
    if (/^\s+$/u.test(piece)) {
      pendingWhitespace += piece;
      continue;
    }

    tokens.push(`${pendingWhitespace}${piece}`);
    pendingWhitespace = "";
  }

  if (pendingWhitespace && tokens.length > 0) {
    tokens[tokens.length - 1] += pendingWhitespace;
  }

  return tokens;
}
