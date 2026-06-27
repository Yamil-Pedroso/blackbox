import { env } from "../../core/config/env";
import { LocalTokenPredictionProvider } from "./providers/local-token-prediction.provider";
import { OpenAITokenPredictionProvider } from "./providers/openai-token-prediction.provider";
import { TokenPredictionDto } from "./tokenPrediction.dto";
import { TokenPredictionProvider } from "./tokenPrediction.interfaces";
import {
  PredictionPathResponse,
  PredictionTreeEdge,
  PredictionTreeNode,
  PredictionTreeResponse,
  TokenPredictionResponse,
} from "./tokenPrediction.types";

interface CachedPrediction {
  expiresAt: number;
  value: TokenPredictionResponse;
}

const predictionCache = new Map<string, CachedPrediction>();
const CACHE_DURATION_MS = 60_000;

function cacheKey(dto: TokenPredictionDto): string {
  return JSON.stringify(dto);
}

function createProvider(dto: TokenPredictionDto): TokenPredictionProvider {
  if (
    env.token_prediction_provider === "openai" &&
    dto.model !== "educational-local"
  ) {
    return new OpenAITokenPredictionProvider();
  }

  return new LocalTokenPredictionProvider();
}

function roundProbability(value: number): number {
  return Number(value.toFixed(6));
}

function statistics(probabilities: number[], generationTimeMs: number) {
  const safeProbabilities = probabilities.length > 0 ? probabilities : [0];

  return {
    totalTokens: probabilities.length,
    averageProbability: roundProbability(
      safeProbabilities.reduce((sum, value) => sum + value, 0) /
        safeProbabilities.length,
    ),
    lowestProbability: roundProbability(Math.min(...safeProbabilities)),
    highestProbability: roundProbability(Math.max(...safeProbabilities)),
    generationTimeMs,
  };
}

async function generatePrediction(
  dto: TokenPredictionDto,
): Promise<TokenPredictionResponse> {
  const key = cacheKey(dto);
  const cached = predictionCache.get(key);

  if (cached && cached.expiresAt > Date.now()) {
    return cached.value;
  }

  const startedAt = performance.now();
  let provider = createProvider(dto);
  let result;

  try {
    result = await provider.predict(dto);
  } catch (error) {
    if (provider.name !== "openai") {
      throw error;
    }

    console.warn(
      "OpenAI token probabilities were unavailable; using educational fallback:",
      error,
    );
    provider = new LocalTokenPredictionProvider();
    result = await provider.predict(dto);
    result.approximationReason =
      "The configured OpenAI request did not return usable log probabilities, so the educational fallback was used.";
  }

  const response: TokenPredictionResponse = {
    prompt: dto.prompt,
    provider: provider.name,
    ...result,
    predictionSteps: result.predictionSteps.map((step) => ({
      ...step,
      selectedProbability: roundProbability(step.selectedProbability),
      topPredictions: step.topPredictions.map((prediction) => ({
        ...prediction,
        probability: roundProbability(prediction.probability),
      })),
    })),
    statistics: statistics(
      result.predictionSteps.map((step) => step.selectedProbability),
      Math.round(performance.now() - startedAt),
    ),
  };

  predictionCache.set(key, {
    expiresAt: Date.now() + CACHE_DURATION_MS,
    value: response,
  });

  return response;
}

export async function predictTokens(
  dto: TokenPredictionDto,
): Promise<TokenPredictionResponse> {
  return generatePrediction(dto);
}

export async function buildPredictionTree(
  dto: TokenPredictionDto,
): Promise<PredictionTreeResponse> {
  const prediction = await generatePrediction(dto);
  const nodes: PredictionTreeNode[] = [
    {
      id: "prompt",
      label: dto.prompt,
      probability: 1,
      color: "#8b5cf6",
      kind: "prompt",
      step: 0,
      rank: 0,
      isChosen: true,
    },
  ];
  const edges: PredictionTreeEdge[] = [];
  let previousChosenId = "prompt";

  for (const step of prediction.predictionSteps) {
    const chosenId = `step-${step.position}-chosen`;
    nodes.push({
      id: chosenId,
      label: step.generatedToken,
      probability: step.selectedProbability,
      color: "#22d3ee",
      kind: "chosen",
      step: step.position,
      rank: 0,
      isChosen: true,
    });
    edges.push({
      id: `${previousChosenId}-${chosenId}`,
      source: previousChosenId,
      target: chosenId,
      weight: step.selectedProbability,
      isChosen: true,
    });

    step.topPredictions
      .filter((candidate) => candidate.token !== step.generatedToken)
      .slice(0, 3)
      .forEach((candidate, index) => {
        const alternativeId = `step-${step.position}-alternative-${index + 1}`;
        nodes.push({
          id: alternativeId,
          label: candidate.token,
          probability: candidate.probability,
          color: "#f59e0b",
          kind: "alternative",
          step: step.position,
          rank: index + 1,
          isChosen: false,
        });
        edges.push({
          id: `${previousChosenId}-${alternativeId}`,
          source: previousChosenId,
          target: alternativeId,
          weight: candidate.probability,
          isChosen: false,
        });
      });

    previousChosenId = chosenId;
  }

  return {
    prompt: prediction.prompt,
    model: prediction.model,
    provider: prediction.provider,
    isApproximation: prediction.isApproximation,
    nodes,
    edges,
    chosenPath: [
      "prompt",
      ...prediction.predictionSteps.map(
        (step) => `step-${step.position}-chosen`,
      ),
    ],
  };
}

export async function buildPredictionPath(
  dto: TokenPredictionDto,
): Promise<PredictionPathResponse> {
  const prediction = await generatePrediction(dto);

  return {
    prompt: prediction.prompt,
    generatedText: prediction.generatedText,
    model: prediction.model,
    provider: prediction.provider,
    isApproximation: prediction.isApproximation,
    path: prediction.predictionSteps.map((step) => ({
      position: step.position,
      token: step.generatedToken,
      probability: step.selectedProbability,
    })),
  };
}
