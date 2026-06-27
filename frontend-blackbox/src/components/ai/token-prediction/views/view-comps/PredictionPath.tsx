import { motion } from "framer-motion";
import type { PredictionPathResponse } from "../../../../../types/ai/tokenPrediction.types";

interface PredictionPathProps {
  path: PredictionPathResponse;
}

export function PredictionPath({ path }: PredictionPathProps) {
  return (
    <section className="border border-neutral-800 bg-main-bg p-5">
      <p className="font-ibm-plex-mono text-xs uppercase text-green">
        Actual selection path
      </p>
      <p className="mt-2 text-sm leading-6 text-secondary">
        These are the branches that became the final sentence. Alternatives
        remain visible in the tree but were not selected.
      </p>
      <div className="mt-4 flex flex-wrap items-center gap-2">
        {path.path.map((item, index) => (
          <motion.div
            key={`${item.position}-${item.token}`}
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.04 }}
            className="flex items-center gap-2"
          >
            <span
              className="border border-green/40 bg-green/10 px-2.5 py-1.5 font-ibm-plex-mono text-xs font-semibold text-primary"
              title={`${(item.probability * 100).toFixed(2)}%`}
            >
              {item.token.replace(/\s/g, "·")}
            </span>
            {index < path.path.length - 1 && (
              <span className="text-green">→</span>
            )}
          </motion.div>
        ))}
      </div>
    </section>
  );
}
