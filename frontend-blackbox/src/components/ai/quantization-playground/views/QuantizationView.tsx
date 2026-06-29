import { useState } from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { useQuantization } from "../../../../lib/hooks/ai/useQuantization";
import { useCompressionFlow } from "../../../../lib/hooks/ai/useCompressionFlow";
import { CompressionProgress } from "./view-comps/CompressionProgress";
import { QuantizedResultCard } from "./view-comps/QuantizedResultCard";
import type {
  QuantizationPrecision,
  QuantizationResult,
} from "../../../../types/ai/quantization.types";

const presets = [
  { key: 0, parameterCount: 1_000_000 },
  { key: 1, parameterCount: 8_000_000_000 },
  { key: 2, parameterCount: 70_000_000_000 },
] as const;

const precisionStyles: Record<QuantizationPrecision, string> = {
  FP32: "border-neutral-800 bg-main-bg text-primary",
  FP16: "border-green/40 bg-green/10 text-primary",
  INT8: "border-green/50 bg-green/15 text-primary",
  INT4: "border-neutral-700 bg-secondary-bg text-primary",
  INT2: "border-neutral-800 bg-main-bg text-primary",
};

function parseWeights(value: string): number[] | null {
  const parts = value
    .split(/[\s,;]+/)
    .map((part) => part.trim())
    .filter(Boolean);

  if (parts.length === 0) {
    return null;
  }

  const weights = parts.map(Number);
  return weights.every(Number.isFinite) ? weights : null;
}

function formatParameterCount(value: number): string {
  return new Intl.NumberFormat("en-US", {
    notation: "compact",
    maximumFractionDigits: 1,
  }).format(value);
}

function formatSize(value: number): string {
  if (value >= 1) {
    return `${value.toLocaleString("en-US", {
      maximumFractionDigits: 2,
    })} GB`;
  }

  return `${(value * 1_000).toLocaleString("en-US", {
    maximumFractionDigits: 2,
  })} MB`;
}

function formatError(value: number): string {
  return value.toLocaleString("en-US", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 8,
  });
}

function getModelName(parameterCount: number, presetLabels: string[]): string {
  return (
    presetLabels[
      presets.find((preset) => preset.parameterCount === parameterCount)
        ?.key ?? -1
    ] ??
    `${formatParameterCount(parameterCount)} model`
  );
}

function WeightPreview({ result }: { result: QuantizationResult }) {
  return (
    <div className="mt-4 flex flex-wrap gap-2">
      {result.quantizedWeights.map((weight, index) => (
        <span
          key={`${result.precision}-${index}`}
          className="border border-neutral-800 bg-main-bg px-2 py-1 font-ibm-plex-mono text-xs font-semibold text-primary"
        >
          {weight}
        </span>
      ))}
    </div>
  );
}

const QuantizationView = () => {
  const { t } = useTranslation("exploreMiniAppsAi");
  const [weightsText, setWeightsText] = useState(
    t("quantization.defaultWeights"),
  );
  const [parameterCount, setParameterCount] = useState(8_000_000_000);
  const [inputError, setInputError] = useState<string | null>(null);
  const { data, error, isLoading, analyze, reset } = useQuantization();
  const compression = useCompressionFlow(analyze);
  const presetCopies = t("quantization.presets", {
    returnObjects: true,
  }) as Array<{ label: string; detail: string }>;
  const guideBullets = t("quantization.guide.bullets", {
    returnObjects: true,
  }) as string[];

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const weights = parseWeights(weightsText);

    if (!weights) {
      setInputError(t("quantization.inputError"));
      return;
    }

    setInputError(null);
    void analyze({ weights, parameterCount });
  }

  function handleClear() {
    setWeightsText("");
    setInputError(null);
    reset();
    compression.resetCompression();
  }

  function handleCompress(targetPrecision: QuantizationPrecision) {
    const weights = parseWeights(weightsText);

    if (!weights) {
      setInputError(t("quantization.inputError"));
      return;
    }

    setInputError(null);
    void compression.startCompression({
      request: { weights, parameterCount },
      targetPrecision,
      modelName: getModelName(
        parameterCount,
        presetCopies.map((preset) => preset.label),
      ),
    });
  }

  return (
    <section className="overflow-hidden border border-neutral-800 bg-secondary-bg text-primary">
      <header className="border-b border-neutral-800 px-5 py-7 sm:px-8">
        <p className="font-ibm-plex-mono text-xs uppercase text-green">
          {t("quantization.header.eyebrow")}
        </p>
        <div className="mt-3 grid gap-4 lg:grid-cols-[1fr_auto] lg:items-end">
          <div>
            <h2 className="text-3xl sm:text-4xl">
              {t("quantization.header.title")}
            </h2>
            <p className="mt-3 max-w-3xl font-ibm-plex-mono text-sm leading-6 text-secondary">
              {t("quantization.header.description")}
            </p>
          </div>
          <div
            className="flex flex-wrap gap-2"
            aria-label={t("quantization.header.legend")}
          >
            {(Object.keys(precisionStyles) as QuantizationPrecision[]).map(
              (precision) => (
                <span
                  key={precision}
                  className={`border px-2.5 py-1 font-ibm-plex-mono text-xs font-semibold ${precisionStyles[precision]}`}
                >
                  {precision}
                </span>
              ),
            )}
          </div>
        </div>
      </header>

      <form
        onSubmit={handleSubmit}
        className="border-b border-neutral-800 p-5 sm:p-8"
      >
        <div className="grid gap-5 lg:grid-cols-[1fr_0.55fr]">
          <label className="grid gap-2 text-sm font-semibold text-primary">
            {t("quantization.form.weights")}
            <textarea
              value={weightsText}
              onChange={(event) => setWeightsText(event.target.value)}
              rows={6}
              placeholder={t("quantization.form.placeholder")}
              className="resize-y border border-neutral-800 bg-main-bg px-4 py-3 font-ibm-plex-mono text-sm font-normal leading-6 text-primary outline-none transition placeholder:text-secondary/50 focus:border-green"
            />
          </label>

          <div>
            <label className="grid gap-2 text-sm font-semibold text-primary">
              {t("quantization.form.parameters")}
              <input
                type="number"
                min={1}
                step={1}
                value={parameterCount}
                onChange={(event) =>
                  setParameterCount(Number(event.target.value))
                }
                className="min-h-11 border border-neutral-800 bg-main-bg px-4 font-ibm-plex-mono text-sm font-normal text-primary outline-none transition focus:border-green"
              />
            </label>

            <p className="mt-2 font-ibm-plex-mono text-xs font-semibold text-secondary">
              {t("quantization.form.scale", {
                value: formatParameterCount(parameterCount),
              })}
            </p>

            <div className="mt-4 grid gap-2">
              {presets.map((preset) => (
                <button
                  key={preset.parameterCount}
                  type="button"
                  onClick={() => setParameterCount(preset.parameterCount)}
                  className="flex min-h-11 items-center justify-between border border-neutral-800 bg-main-bg px-3 text-left text-sm font-semibold text-primary transition hover:border-green/50"
                >
                  <span>{presetCopies[preset.key]?.label}</span>
                  <span className="font-ibm-plex-mono text-xs text-green">
                    {presetCopies[preset.key]?.detail}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {(inputError || error) && (
          <p
            role="alert"
            className="mt-4 border border-red-400/20 bg-red-400/10 p-3 text-sm text-red-300"
          >
            {inputError ?? error}
          </p>
        )}

        <div className="mt-5 flex flex-wrap gap-3">
          <button
            type="submit"
            disabled={isLoading}
            className="min-h-11 bg-green px-5 font-ibm-plex-mono text-xs font-semibold text-black shadow-[0_10px_24px_rgba(0,255,136,0.12)] transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isLoading
              ? t("quantization.form.loading")
              : t("quantization.form.analyze")}
          </button>
          <button
            type="button"
            onClick={handleClear}
            disabled={isLoading}
            className="min-h-11 border border-neutral-800 bg-main-bg px-5 font-ibm-plex-mono text-xs font-semibold text-secondary transition hover:border-green/50 hover:text-primary disabled:opacity-50"
          >
            {t("quantization.form.clear")}
          </button>
        </div>
      </form>

      <div aria-live="polite">
        {isLoading && !data ? (
          <div className="flex min-h-80 items-center justify-center">
            <div className="text-center">
              <div className="mx-auto size-9 animate-spin border-2 border-green border-t-transparent" />
              <p className="mt-4 text-sm font-semibold text-secondary">
                {t("quantization.loading")}
              </p>
            </div>
          </div>
        ) : data ? (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="grid border-b border-neutral-800 sm:grid-cols-3">
              {[
                [
                  t("quantization.metrics.parameters"),
                  formatParameterCount(data.parameterCount),
                ],
                [
                  t("quantization.metrics.sampleWeights"),
                  data.originalWeights.length,
                ],
                [
                  t("quantization.metrics.fp32"),
                  formatSize(data.fp32EstimatedSizeGB),
                ],
              ].map(([label, value]) => (
                <div
                  key={label}
                  className="border-b border-neutral-800 p-5 last:border-b-0 sm:border-b-0 sm:border-r sm:last:border-r-0 sm:p-6"
                >
                  <p className="font-ibm-plex-mono text-xs uppercase text-secondary">
                    {label}
                  </p>
                  <strong className="mt-2 block text-3xl font-semibold text-primary">
                    {value}
                  </strong>
                </div>
              ))}
            </div>

            <div className="p-5 sm:p-8">
              <h3 className="text-lg font-semibold">
                {t("quantization.cards.title")}
              </h3>
              <p className="mt-1 text-sm text-secondary">
                {t("quantization.cards.description")}
              </p>

              <div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-5">
                {data.results.map((result) => (
                  <article
                    key={result.precision}
                    className={`border p-4 ${precisionStyles[result.precision]}`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <h4 className="text-xl font-semibold">
                          {result.precision}
                        </h4>
                        <p className="font-ibm-plex-mono text-xs font-semibold text-secondary">
                          {t("quantization.cards.bitsPerParameter", {
                            bits: result.bitsPerParameter,
                          })}
                        </p>
                      </div>
                      <span className="border border-neutral-800 bg-main-bg px-2 py-1 font-ibm-plex-mono text-xs font-semibold text-green">
                        {result.memoryReductionPercentage === 0
                          ? "0%"
                          : `-${result.memoryReductionPercentage}%`}
                      </span>
                    </div>
                    <strong className="mt-5 block text-2xl font-semibold">
                      {formatSize(result.estimatedSizeGB)}
                    </strong>
                    <p className="mt-1 font-ibm-plex-mono text-xs text-secondary">
                      {t("quantization.cards.avgError", {
                        value: formatError(result.averageAbsoluteError),
                      })}
                    </p>
                    <WeightPreview result={result} />
                    {t(`quantization.compressionLabels.${result.precision}`, {
                      defaultValue: "",
                    }) && (
                      <button
                        type="button"
                        onClick={() => handleCompress(result.precision)}
                        disabled={compression.status === "compressing"}
                        className="mt-4 min-h-10 w-full bg-green px-3 font-ibm-plex-mono text-xs font-semibold text-black transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        {compression.selectedTarget === result.precision &&
                        compression.status === "compressing"
                          ? t("quantization.cards.compressing")
                          : t(
                              `quantization.compressionLabels.${result.precision}`,
                            )}
                      </button>
                    )}
                  </article>
                ))}
              </div>
            </div>

            {compression.selectedTarget && (
              <CompressionProgress
                targetPrecision={compression.selectedTarget}
                progress={compression.progress}
                status={compression.status}
                currentStep={compression.currentStep}
                onReset={compression.resetCompression}
                t={t}
              />
            )}

            {compression.result && (
              <QuantizedResultCard result={compression.result} t={t} />
            )}

            <div className="border-t border-neutral-800 p-5 sm:p-8">
              <h3 className="text-lg font-semibold">
                {t("quantization.table.title")}
              </h3>
              <div className="mt-4 overflow-x-auto border border-neutral-800">
                <table className="w-full min-w-[820px] border-collapse text-left text-sm">
                  <thead className="bg-main-bg font-ibm-plex-mono text-xs uppercase text-secondary">
                    <tr>
                      <th className="px-4 py-3">
                        {t("quantization.table.precision")}
                      </th>
                      <th className="px-4 py-3">
                        {t("quantization.table.bits")}
                      </th>
                      <th className="px-4 py-3">
                        {t("quantization.table.estimatedSize")}
                      </th>
                      <th className="px-4 py-3">
                        {t("quantization.table.memorySaved")}
                      </th>
                      <th className="px-4 py-3">
                        {t("quantization.table.averageError")}
                      </th>
                      <th className="px-4 py-3">
                        {t("quantization.table.sampleWeights")}
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.results.map((result) => (
                      <tr
                        key={result.precision}
                        className="border-t border-neutral-800 bg-secondary-bg align-top"
                      >
                        <td className="px-4 py-3 font-semibold">
                          {result.precision}
                        </td>
                        <td className="px-4 py-3 font-ibm-plex-mono">
                          {result.bitsPerParameter}
                        </td>
                        <td className="px-4 py-3 font-semibold">
                          {formatSize(result.estimatedSizeGB)}
                        </td>
                        <td className="px-4 py-3">
                          {result.memoryReductionPercentage}%
                        </td>
                        <td className="px-4 py-3 font-ibm-plex-mono">
                          {formatError(result.averageAbsoluteError)}
                        </td>
                        <td className="max-w-md px-4 py-3 font-ibm-plex-mono text-xs leading-5">
                          {result.quantizedWeights.join(", ")}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <aside className="grid border-t border-neutral-800 bg-main-bg lg:grid-cols-[0.4fr_0.6fr]">
              <div className="border-b border-neutral-800 p-5 sm:p-8 lg:border-b-0 lg:border-r">
                <p className="font-ibm-plex-mono text-xs uppercase text-green">
                  {t("quantization.guide.eyebrow")}
                </p>
                <h3 className="mt-2 text-xl font-semibold">
                  {t("quantization.guide.title")}
                </h3>
                <p className="mt-3 text-sm leading-6 text-secondary">
                  {t("quantization.guide.body")}
                </p>
              </div>

              <div className="p-5 sm:p-8">
                <ul className="grid gap-3 text-sm leading-6 text-secondary md:grid-cols-2">
                  {guideBullets.map((bullet) => (
                    <li key={bullet} className="border-l-2 border-green pl-3">
                      {bullet}
                    </li>
                  ))}
                </ul>
                <p className="mt-5 border-t border-neutral-800 pt-4 text-xs leading-5 text-secondary">
                  {t("quantization.guide.disclaimer", {
                    disclaimer: data.disclaimer,
                  })}
                </p>
              </div>
            </aside>
          </motion.div>
        ) : (
          <div className="flex min-h-80 items-center justify-center p-8 text-center">
            <div className="max-w-md">
              <p className="text-xl font-semibold">
                {t("quantization.empty.title")}
              </p>
              <p className="mt-2 text-sm leading-6 text-secondary">
                {t("quantization.empty.description")}
              </p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default QuantizationView;
