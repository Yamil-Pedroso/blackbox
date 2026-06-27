import { EmbeddingsProvider } from "../embeddings.interfaces";

const DIMENSIONS = 96;

const conceptAliases: Record<string, string> = {
  coding: "programming",
  coder: "programming",
  code: "programming",
  love: "positive",
  enjoy: "positive",
  react: "frontend",
  vue: "frontend",
  angular: "frontend",
  framework: "frontend",
  javascript: "programming",
  node: "programming",
  nodejs: "programming",
  dog: "animal",
  dogs: "animal",
  cat: "animal",
  cats: "animal",
  puppy: "animal",
  kitten: "animal",
  reset: "change",
  forgot: "password",
  credentials: "password",
};

const stopWords = new Set([
  "a",
  "an",
  "and",
  "are",
  "do",
  "from",
  "how",
  "i",
  "is",
  "my",
  "new",
  "the",
  "to",
  "your",
]);

function hashToken(token: string): number {
  let hash = 2_166_136_261;

  for (const character of token) {
    hash ^= character.codePointAt(0) ?? 0;
    hash = Math.imul(hash, 16_777_619);
  }

  return hash >>> 0;
}

function tokenize(text: string): string[] {
  return (
    text
      .toLowerCase()
      .replace(/node\.js/g, "nodejs")
      .match(/[\p{L}\p{N}]+/gu) ?? []
  )
    .filter((token) => !stopWords.has(token))
    .map((token) => conceptAliases[token] ?? token);
}

function normalize(vector: number[]): number[] {
  const magnitude = Math.sqrt(
    vector.reduce((sum, value) => sum + value * value, 0),
  );

  if (magnitude === 0) {
    return vector;
  }

  return vector.map((value) => value / magnitude);
}

function embedLocally(text: string): number[] {
  const vector = Array.from({ length: DIMENSIONS }, () => 0);
  const tokens = tokenize(text);

  for (const [position, token] of tokens.entries()) {
    const hash = hashToken(token);
    const index = hash % DIMENSIONS;
    const secondaryIndex = (hash >>> 8) % DIMENSIONS;
    const sign = (hash & 1) === 0 ? 1 : -1;
    const positionWeight = 1 / Math.sqrt(position + 1);

    vector[index] += sign * positionWeight;
    vector[secondaryIndex] += sign * 0.35;

    // A small deterministic projection keeps the educational vector visual.
    for (let dimension = 0; dimension < DIMENSIONS; dimension += 1) {
      vector[dimension] +=
        Math.sin((hash % 997) * (dimension + 1)) *
        0.012 *
        positionWeight;
    }
  }

  return normalize(vector);
}

export class LocalEmbeddingsProvider implements EmbeddingsProvider {
  readonly name = "local" as const;
  readonly model = "local-hashed-concepts-v1";

  async embed(texts: string[]): Promise<number[][]> {
    return texts.map(embedLocally);
  }
}
