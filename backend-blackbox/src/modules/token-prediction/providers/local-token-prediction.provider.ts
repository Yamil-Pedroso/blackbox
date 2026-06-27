import { TokenPredictionDto } from "../tokenPrediction.dto";
import { TokenPredictionProvider } from "../tokenPrediction.interfaces";
import {
  ProviderPredictionResult,
  TokenPredictionCandidate,
} from "../tokenPrediction.types";

const alternatives = [
  " The",
  " A",
  " It",
  " feels",
  " resembles",
  " warm",
  " bright",
  " sunlight",
  " energy",
  " and",
  " like",
  " is",
  " can",
  " be",
  " described",
  " as",
  " a",
  " gentle",
  " vivid",
  " glow",
  ".",
];

function educationalAnswer(prompt: string): string {
  const normalized = prompt.toLowerCase();

  if (normalized.includes("orange") && normalized.includes("color")) {
    return "Orange feels like warm sunlight mixed with lively energy and a gentle, comforting glow.";
  }

  if (normalized.includes("react")) {
    return "React is a library that builds interfaces from reusable components and updates them as application state changes.";
  }

  if (normalized.includes("token")) {
    return "A language model predicts one token from a probability distribution, appends it to the context, and repeats the process.";
  }

  return "A language model builds this answer one token at a time by repeatedly choosing from a changing probability distribution.";
}

function tokenizeWithLeadingSpace(text: string): string[] {
  return text.match(/\s+\p{L}+(?:['’-]\p{L}+)*|\s+\p{N}+(?:[.,]\p{N}+)*|\p{L}+(?:['’-]\p{L}+)*|\p{N}+(?:[.,]\p{N}+)*|[^\s\p{L}\p{N}]/gu) ?? [];
}

function hashText(value: string): number {
  let hash = 2166136261;

  for (const character of value) {
    hash ^= character.codePointAt(0) ?? 0;
    hash = Math.imul(hash, 16777619);
  }

  return Math.abs(hash);
}

function buildCandidates(
  selectedToken: string,
  position: number,
  topK: number,
): TokenPredictionCandidate[] {
  const selectedWeight = 0.42 + (hashText(`${selectedToken}:${position}`) % 26) / 100;
  const candidates = [selectedToken];
  const startIndex = hashText(selectedToken) % alternatives.length;

  for (let offset = 0; candidates.length < topK; offset += 1) {
    const candidate = alternatives[(startIndex + offset) % alternatives.length];
    if (!candidates.includes(candidate)) {
      candidates.push(candidate);
    }
  }

  const remainingWeight = 1 - selectedWeight;
  const rawAlternativeWeights = candidates
    .slice(1)
    .map((_, index) => 1 / (index + 1.35));
  const weightTotal = rawAlternativeWeights.reduce(
    (total, value) => total + value,
    0,
  );

  return candidates.map((token, index) => ({
    token,
    probability:
      index === 0
        ? selectedWeight
        : (remainingWeight * rawAlternativeWeights[index - 1]) / weightTotal,
  }));
}

export class LocalTokenPredictionProvider
  implements TokenPredictionProvider
{
  readonly name = "local" as const;

  async predict(
    input: TokenPredictionDto,
  ): Promise<ProviderPredictionResult> {
    const generatedText = educationalAnswer(input.prompt);
    const tokens = tokenizeWithLeadingSpace(generatedText).slice(0, 24);

    return {
      generatedText: tokens.join(""),
      model: "educational-local",
      isApproximation: true,
      approximationReason:
        "Probabilities are deterministic educational values, not model logits.",
      predictionSteps: tokens.map((generatedToken, index) => {
        const topPredictions = buildCandidates(
          generatedToken,
          index + 1,
          input.topK,
        );

        return {
          position: index + 1,
          generatedToken,
          selectedProbability: topPredictions[0].probability,
          topPredictions,
        };
      }),
    };
  }
}
