import { motion } from "framer-motion";
import type { CompressionResult } from "../../../../../types/ai/quantization.types";

interface QuantizedResultCardProps {
  result: CompressionResult;
}

function formatSize(value: number): string {
  return value >= 1
    ? `${value.toLocaleString("en-US", { maximumFractionDigits: 2 })} GB`
    : `${(value * 1_000).toLocaleString("en-US", {
        maximumFractionDigits: 2,
      })} MB`;
}

function formatError(value: number): string {
  return value.toLocaleString("en-US", {
    maximumFractionDigits: 8,
  });
}

export function QuantizedResultCard({ result }: QuantizedResultCardProps) {
  const compressionRatio =
    result.original.bitsPerParameter / result.compressed.bitsPerParameter;

  return (
    <motion.section
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      className="border-t border-neutral-800 bg-secondary-bg p-5 text-primary sm:p-8"
    >
      <div className="flex flex-col justify-between gap-3 md:flex-row md:items-end">
        <div>
          <p className="font-ibm-plex-mono text-xs uppercase text-green">
            Compressed model result
          </p>
          <h3 className="mt-2 text-2xl font-semibold">
            {result.modelName} {result.compressed.precision}
          </h3>
        </div>
        <span className="w-fit border border-green/40 bg-green/10 px-3 py-1.5 font-ibm-plex-mono text-sm font-semibold text-green">
          {compressionRatio}x smaller
        </span>
      </div>

      <div className="mt-6 grid overflow-hidden border border-neutral-800 bg-main-bg lg:grid-cols-2">
        <div className="border-b border-neutral-800 p-5 lg:border-b-0 lg:border-r">
          <p className="font-ibm-plex-mono text-xs uppercase text-secondary">Before</p>
          <h4 className="mt-2 text-xl font-semibold">{result.modelName} FP32</h4>
          <p className="mt-3 text-3xl font-semibold">
            {formatSize(result.original.estimatedSizeGB)}
          </p>
          <p className="mt-2 text-sm text-secondary">
            Large memory usage · High precision
          </p>
        </div>

        <div className="p-5">
          <p className="font-ibm-plex-mono text-xs uppercase text-green">After</p>
          <h4 className="mt-2 text-xl font-semibold">
            {result.modelName} {result.compressed.precision}
          </h4>
          <p className="mt-3 text-3xl font-semibold text-green">
            {formatSize(result.compressed.estimatedSizeGB)}
          </p>
          <p className="mt-2 text-sm text-secondary">
            Lower memory usage · Approximation error{" "}
            {formatError(result.compressed.averageAbsoluteError)}
          </p>
        </div>
      </div>

      <dl className="mt-5 grid gap-3 sm:grid-cols-3">
        <div className="border border-neutral-800 bg-main-bg p-4">
          <dt className="font-ibm-plex-mono text-xs uppercase text-secondary">
            Memory saved
          </dt>
          <dd className="mt-1 text-2xl font-semibold">
            {result.compressed.memoryReductionPercentage}%
          </dd>
        </div>
        <div className="border border-neutral-800 bg-main-bg p-4">
          <dt className="font-ibm-plex-mono text-xs uppercase text-secondary">
            Compression ratio
          </dt>
          <dd className="mt-1 text-2xl font-semibold">{compressionRatio}x</dd>
        </div>
        <div className="border border-neutral-800 bg-main-bg p-4">
          <dt className="font-ibm-plex-mono text-xs uppercase text-secondary">
            Average error
          </dt>
          <dd className="mt-1 font-ibm-plex-mono text-lg font-semibold">
            {formatError(result.compressed.averageAbsoluteError)}
          </dd>
        </div>
      </dl>

      <div className="mt-5">
        <p className="font-ibm-plex-mono text-xs uppercase text-secondary">
          Quantized sample weights
        </p>
        <div className="mt-2 flex flex-wrap gap-2">
          {result.compressed.quantizedWeights.map((weight, index) => (
            <span
              key={`${result.compressed.precision}-${index}`}
              className="border border-neutral-800 bg-main-bg px-2.5 py-1 font-ibm-plex-mono text-xs font-semibold text-primary"
            >
              {weight}
            </span>
          ))}
        </div>
      </div>
    </motion.section>
  );
}
