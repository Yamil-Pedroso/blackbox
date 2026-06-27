import type { TokenPredictionResponse } from "../../../../../types/ai/tokenPrediction.types";

interface PredictionStatsProps {
  prediction: TokenPredictionResponse;
}

function percent(value: number): string {
  return `${(value * 100).toFixed(1)}%`;
}

export function PredictionStats({ prediction }: PredictionStatsProps) {
  const items = [
    ["Total tokens", String(prediction.statistics.totalTokens)],
    ["Average probability", percent(prediction.statistics.averageProbability)],
    ["Lowest probability", percent(prediction.statistics.lowestProbability)],
    ["Highest probability", percent(prediction.statistics.highestProbability)],
    ["Generation time", `${prediction.statistics.generationTimeMs} ms`],
    ["Model", prediction.model],
  ];

  return (
    <section className="grid gap-px overflow-hidden border border-neutral-800 bg-neutral-800 sm:grid-cols-2 xl:grid-cols-3">
      {items.map(([label, value]) => (
        <div key={label} className="min-h-24 bg-main-bg p-4">
          <p className="font-ibm-plex-mono text-[10px] uppercase text-secondary">
            {label}
          </p>
          <p className="mt-2 break-words text-lg font-semibold text-primary">
            {value}
          </p>
        </div>
      ))}
    </section>
  );
}
