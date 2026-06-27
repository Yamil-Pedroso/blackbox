import { motion } from "framer-motion";
import type { TokenPredictionStep } from "../../../../../types/ai/tokenPrediction.types";

interface PredictionTimelineProps {
  steps: TokenPredictionStep[];
}

export function PredictionTimeline({ steps }: PredictionTimelineProps) {
  return (
    <section className="min-w-0">
      <div className="flex items-end justify-between gap-4">
        <div>
          <p className="font-ibm-plex-mono text-xs uppercase text-green">
            Chosen sequence
          </p>
          <h3 className="mt-1 text-xl font-semibold text-primary">
            Prediction timeline
          </h3>
        </div>
        <span className="font-ibm-plex-mono text-xs text-secondary">
          {steps.length} positions
        </span>
      </div>

      <div className="mt-5 overflow-x-auto pb-3">
        <div className="flex min-w-max items-center">
          {steps.map((step, index) => (
            <motion.div
              key={`${step.position}-${step.generatedToken}`}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.06 }}
              className="flex items-center"
            >
              <div className="min-w-24 border border-green/30 bg-green/10 px-3 py-3 text-center">
                <p className="max-w-36 truncate font-ibm-plex-mono text-sm font-semibold text-primary">
                  {step.generatedToken.replace(/\s/g, "·")}
                </p>
                <p className="mt-1 font-ibm-plex-mono text-[10px] font-semibold text-green">
                  {(step.selectedProbability * 100).toFixed(1)}%
                </p>
              </div>
              {index < steps.length - 1 && (
                <span className="mx-2 text-lg text-secondary">→</span>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
