import { motion } from "framer-motion";
import type {
  CompressionStatus,
  QuantizationPrecision,
} from "../../../../../types/ai/quantization.types";

interface CompressionProgressProps {
  targetPrecision: QuantizationPrecision;
  progress: number;
  status: CompressionStatus;
  currentStep: string;
  onReset: () => void;
}

export function CompressionProgress({
  targetPrecision,
  progress,
  status,
  currentStep,
  onReset,
}: CompressionProgressProps) {
  const isComplete = status === "complete";

  return (
    <section className="border-t border-neutral-800 bg-main-bg p-5 text-primary sm:p-8">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <p className="font-ibm-plex-mono text-xs uppercase text-green">
            Visual compression flow
          </p>
          <h3 className="mt-2 text-xl font-semibold">FP32 to {targetPrecision}</h3>
          <p className="mt-2 text-sm text-secondary">{currentStep}</p>
        </div>
        <div className="flex items-center gap-4">
          <strong className="font-ibm-plex-mono text-3xl font-semibold">{progress}%</strong>
          <button
            type="button"
            onClick={onReset}
            className="min-h-10 border border-neutral-800 bg-secondary-bg px-4 font-ibm-plex-mono text-xs font-semibold text-primary transition hover:border-green/50"
          >
            Reset compression
          </button>
        </div>
      </div>

      <div
        className="mt-5 h-3 overflow-hidden bg-secondary-bg"
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={progress}
        aria-label={`Compression to ${targetPrecision}`}
      >
        <motion.div
          className="h-full bg-green"
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.12, ease: "linear" }}
        />
      </div>

      <p className="mt-3 text-xs text-secondary">
        {isComplete
          ? "The backend analysis and educational animation are complete."
          : "The backend request and visual learning animation are running in parallel."}
      </p>
    </section>
  );
}
