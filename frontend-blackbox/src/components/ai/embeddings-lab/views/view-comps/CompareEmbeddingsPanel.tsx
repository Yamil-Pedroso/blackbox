import { useState } from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { useCompareEmbeddings } from "../../../../../lib/hooks/ai/useEmbeddings";

function similarityLabel(similarity: number, t: (key: string) => string): string {
  if (similarity >= 0.75) return t("embeddingsLab.compare.high");
  if (similarity >= 0.4) return t("embeddingsLab.compare.medium");
  return t("embeddingsLab.compare.low");
}

export function CompareEmbeddingsPanel() {
  const { t } = useTranslation("exploreMiniAppsAi");
  const [textA, setTextA] = useState(t("embeddingsLab.compare.defaultA"));
  const [textB, setTextB] = useState(t("embeddingsLab.compare.defaultB"));
  const { data, isLoading, error, execute } = useCompareEmbeddings();
  const percentage = data
    ? Math.max(0, Math.min(100, data.similarity * 100))
    : 0;

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    void execute({ textA, textB });
  }

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <form onSubmit={handleSubmit} className="grid gap-4">
        <label className="grid gap-2 text-sm font-semibold text-primary">
          {t("embeddingsLab.compare.first")}
          <textarea
            value={textA}
            onChange={(event) => setTextA(event.target.value)}
            rows={5}
            className="border border-neutral-800 bg-main-bg px-4 py-3 font-ibm-plex-mono text-sm font-normal text-primary outline-none focus:border-green"
          />
        </label>
        <label className="grid gap-2 text-sm font-semibold text-primary">
          {t("embeddingsLab.compare.second")}
          <textarea
            value={textB}
            onChange={(event) => setTextB(event.target.value)}
            rows={5}
            className="border border-neutral-800 bg-main-bg px-4 py-3 font-ibm-plex-mono text-sm font-normal text-primary outline-none focus:border-green"
          />
        </label>
        {error && (
          <p className="border border-red-400/20 bg-red-400/10 p-3 text-sm text-red-300">
            {error}
          </p>
        )}
        <button
          type="submit"
          disabled={isLoading}
          className="min-h-11 bg-green px-5 font-ibm-plex-mono text-xs font-semibold text-black transition hover:opacity-90 disabled:opacity-50"
        >
          {isLoading
            ? t("embeddingsLab.compare.loading")
            : t("embeddingsLab.compare.button")}
        </button>
      </form>

      <div className="flex min-h-80 items-center justify-center border border-neutral-800 bg-main-bg p-6 text-primary">
        {!data ? (
          <p className="max-w-sm text-center text-sm text-secondary">
            {t("embeddingsLab.compare.empty")}
          </p>
        ) : (
          <motion.div
            initial={{ scale: 0.96, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="w-full"
          >
            <p className="text-center font-ibm-plex-mono text-xs uppercase text-green">
              {similarityLabel(data.similarity, t)}
            </p>
            <p className="mt-3 text-center text-6xl font-semibold">
              {percentage.toFixed(1)}%
            </p>
            <p className="mt-2 text-center text-sm text-secondary">
              {data.meaning}
            </p>
            <div className="mt-6 h-4 overflow-hidden border border-neutral-800 bg-secondary-bg">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${percentage}%` }}
                className="h-full bg-green"
              />
            </div>
            <p className="mt-5 text-center font-ibm-plex-mono text-xs text-secondary">
              {t("embeddingsLab.compare.cosine", {
                similarity: data.similarity.toFixed(4),
                dimensions: data.dimensions,
              })}
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
}
