import { measure } from "yampe-observability/dist/index.cjs";

import {
  DEFAULT_TOKENIZER_MODEL_ID,
  findTokenizerModel,
  TOKENIZER_MODELS,
} from "./config/models";
import { getTokenizerProvider } from "./providers/tokenizer-provider.factory";
import { estimateTokenizerCost } from "./tokenizer-cost.service";
import {
  AnalyzeTokenizerInput,
  LatencyRating,
  LatencyStats,
  ModelConfig,
  ObservabilityMeasurement,
  TokenAnalysisResult,
  TokenizeInput,
  TokenizeResult,
} from "./tokenizer.types";

//Badge de calificación: first, best, fast, average, slow, worst

const BILLING_DISCLAIMER =
  "This is an estimate. Exact billing depends on provider tokenization, request framing, cached tokens, reasoning tokens, service tier, and usage metadata returned by the provider API.";

type StoredLatencyStats = Omit<LatencyStats, "lastMs" | "rating"> & {
  totalMs: number;
};

const latencyStatsByLabel = new Map<string, StoredLatencyStats>();

function roundLatency(value: number) {
  return Number(value.toFixed(2));
}

function rateLatency(
  durationMs: number,
  previousStats: StoredLatencyStats | undefined,
  nextBestMs: number,
  nextWorstMs: number,
  nextAverageMs: number,
): LatencyRating {
  if (!previousStats) {
    return "first";
  }

  if (durationMs <= nextBestMs) {
    return "best";
  }

  if (durationMs >= nextWorstMs) {
    return "worst";
  }

  const averageBand = nextAverageMs * 0.1;

  if (Math.abs(durationMs - nextAverageMs) <= averageBand) {
    return "average";
  }

  return durationMs < nextAverageMs ? "fast" : "slow";
}

function recordLatency(
  label: string,
  durationMs: number,
): ObservabilityMeasurement {
  const previousStats = latencyStatsByLabel.get(label);
  const nextCount = (previousStats?.count ?? 0) + 1;
  const nextTotalMs = (previousStats?.totalMs ?? 0) + durationMs;
  const nextBestMs = Math.min(previousStats?.bestMs ?? durationMs, durationMs);
  const nextWorstMs = Math.max(
    previousStats?.worstMs ?? durationMs,
    durationMs,
  );
  const nextAverageMs = nextTotalMs / nextCount;
  const rating = rateLatency(
    durationMs,
    previousStats,
    nextBestMs,
    nextWorstMs,
    nextAverageMs,
  );

  latencyStatsByLabel.set(label, {
    count: nextCount,
    totalMs: nextTotalMs,
    bestMs: nextBestMs,
    averageMs: nextAverageMs,
    worstMs: nextWorstMs,
  });

  const stats: LatencyStats = {
    count: nextCount,
    lastMs: roundLatency(durationMs),
    bestMs: roundLatency(nextBestMs),
    averageMs: roundLatency(nextAverageMs),
    worstMs: roundLatency(nextWorstMs),
    rating,
  };

  console.log(
    `[yampe-observability] ${label} summary: last=${stats.lastMs}ms rating=${stats.rating} best=${stats.bestMs}ms avg=${stats.averageMs}ms worst=${stats.worstMs}ms count=${stats.count}`,
  );

  return {
    label,
    durationMs,
    stats,
  };
}

export function listTokenizerModels(): readonly ModelConfig[] {
  return TOKENIZER_MODELS;
}

export async function tokenizeText(
  input: TokenizeInput,
): Promise<TokenizeResult> {
  const measured = await measure("tokenizer-educational", async () => {
    const model = findTokenizerModel("educational");

    if (!model) {
      throw new Error("Educational tokenizer model is not configured");
    }

    return getTokenizerProvider("educational").tokenize(input, model);
  });

  return {
    ...measured.data,
    observability: recordLatency(measured.label, measured.durationMs),
  };
}

export async function analyzeText(
  input: AnalyzeTokenizerInput,
): Promise<TokenAnalysisResult> {
  const measured = await measure("tokenizer-analysis", async () => {
    const model =
      findTokenizerModel(input.selectedModel) ??
      findTokenizerModel(DEFAULT_TOKENIZER_MODEL_ID);

    if (!model) {
      throw new Error("Default tokenizer model is not configured");
    }

    const provider = getTokenizerProvider(model.tokenizerType);

    const tokenization = provider.tokenize(input, model);

    const inputTokens = tokenization.tokenCount;

    return {
      ...tokenization,
      characterCount: Array.from(input.text).length,
      wordCount: input.text.match(/\p{L}+(?:['’]\p{L}+)*/gu)?.length ?? 0,
      inputTokens,
      estimatedOutputTokens: input.estimatedOutputTokens,
      selectedModel: model,
      costEstimate: estimateTokenizerCost({
        model,
        inputTokens,
        estimatedOutputTokens: input.estimatedOutputTokens,
      }),
      disclaimer: BILLING_DISCLAIMER,
    };
  });

  return {
    ...measured.data,
    observability: recordLatency(measured.label, measured.durationMs),
  };
}
