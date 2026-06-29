import type { TFunction } from "i18next";
import type { TokenPredictionResponse } from "../../../../../types/ai/tokenPrediction.types";

interface PredictionStatsProps {
  prediction: TokenPredictionResponse;
  t: TFunction<"exploreMiniAppsAi">;
}

function percent(value: number): string {
  return `${(value * 100).toFixed(1)}%`;
}

export function PredictionStats({ prediction, t }: PredictionStatsProps) {
  const items = [
    [t("tokenPrediction.stats.totalTokens"), String(prediction.statistics.totalTokens)],
    [t("tokenPrediction.stats.averageProbability"), percent(prediction.statistics.averageProbability)],
    [t("tokenPrediction.stats.lowestProbability"), percent(prediction.statistics.lowestProbability)],
    [t("tokenPrediction.stats.highestProbability"), percent(prediction.statistics.highestProbability)],
    [t("tokenPrediction.stats.generationTime"), `${prediction.statistics.generationTimeMs} ms`],
    [t("tokenPrediction.stats.model"), prediction.model],
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
