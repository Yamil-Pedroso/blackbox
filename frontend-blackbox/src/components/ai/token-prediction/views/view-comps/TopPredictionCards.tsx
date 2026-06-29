import { motion } from "framer-motion";
import type { TFunction } from "i18next";
import type { TokenPredictionStep } from "../../../../../types/ai/tokenPrediction.types";

interface TopPredictionCardsProps {
  steps: TokenPredictionStep[];
  t: TFunction<"exploreMiniAppsAi">;
}

export function TopPredictionCards({ steps, t }: TopPredictionCardsProps) {
  return (
    <section className="min-w-0">
      <p className="font-ibm-plex-mono text-xs uppercase text-green">
        {t("tokenPrediction.cards.eyebrow")}
      </p>
      <h3 className="mt-1 text-2xl font-semibold text-primary">
        {t("tokenPrediction.cards.title")}
      </h3>
      <p className="mt-2 max-w-3xl text-sm leading-6 text-secondary">
        {t("tokenPrediction.cards.description")}
      </p>

      <div className="mt-6 grid gap-4 lg:grid-cols-2">
        {steps.map((step) => (
          <article
            key={step.position}
            className="border border-neutral-800 bg-main-bg p-4 shadow-sm"
          >
            <div className="flex items-center justify-between gap-3 border-b border-neutral-800 pb-3">
              <div>
                <p className="font-ibm-plex-mono text-[10px] uppercase text-secondary">
                  {t("tokenPrediction.cards.position", {
                    position: step.position,
                  })}
                </p>
                <p className="mt-1 font-ibm-plex-mono text-sm font-semibold text-primary">
                  {t("tokenPrediction.cards.chosen", {
                    token: step.generatedToken.replace(/\s/g, "·"),
                  })}
                </p>
              </div>
              <span className="border border-green/40 bg-green/10 px-2 py-1 font-ibm-plex-mono text-xs font-semibold text-green">
                {(step.selectedProbability * 100).toFixed(1)}%
              </span>
            </div>

            <div className="mt-4 grid gap-3">
              {step.topPredictions.map((candidate, index) => {
                const isChosen = candidate.token === step.generatedToken;
                const percentage = Math.min(
                  100,
                  Math.max(0, candidate.probability * 100),
                );

                return (
                  <div key={`${candidate.token}-${index}`}>
                    <div className="mb-1 flex justify-between gap-3 font-ibm-plex-mono text-[11px]">
                      <span
                        className={`truncate font-bold ${
                          isChosen ? "text-green" : "text-secondary"
                        }`}
                      >
                        {candidate.token.replace(/\s/g, "·")}
                      </span>
                      <span className="text-secondary">
                        {percentage.toFixed(2)}%
                      </span>
                    </div>
                    <div className="h-2 overflow-hidden bg-secondary-bg">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${percentage}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.55, delay: index * 0.035 }}
                        className={`h-full ${
                          isChosen ? "bg-green" : "bg-secondary"
                        }`}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
