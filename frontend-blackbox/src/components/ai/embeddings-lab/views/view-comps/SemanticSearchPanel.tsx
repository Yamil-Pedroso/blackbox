import { useState } from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { useSemanticSearch } from "../../../../../lib/hooks/ai/useEmbeddings";

export function SemanticSearchPanel() {
  const { t } = useTranslation("exploreMiniAppsAi");
  const [query, setQuery] = useState(t("embeddingsLab.search.defaultQuery"));
  const [documentsText, setDocumentsText] = useState(
    t("embeddingsLab.search.defaultDocuments"),
  );
  const { data, isLoading, error, execute } = useSemanticSearch();

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const documents = documentsText
      .split("\n")
      .map((document) => document.trim())
      .filter(Boolean);
    void execute({ query, documents });
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr]">
      <form onSubmit={handleSubmit} className="grid gap-4">
        <label className="grid gap-2 text-sm font-semibold text-primary">
          {t("embeddingsLab.search.query")}
          <textarea
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            rows={3}
            className="border border-neutral-800 bg-main-bg px-4 py-3 font-ibm-plex-mono text-sm font-normal text-primary outline-none focus:border-green"
          />
        </label>
        <label className="grid gap-2 text-sm font-semibold text-primary">
          {t("embeddingsLab.search.documents")}
          <textarea
            value={documentsText}
            onChange={(event) => setDocumentsText(event.target.value)}
            rows={7}
            className="border border-neutral-800 bg-main-bg px-4 py-3 font-ibm-plex-mono text-sm font-normal leading-6 text-primary outline-none focus:border-green"
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
            ? t("embeddingsLab.search.loading")
            : t("embeddingsLab.search.button")}
        </button>
      </form>

      <div className="min-h-80 border border-neutral-800 bg-main-bg p-5 sm:p-6">
        {!data ? (
          <div className="flex h-full min-h-72 items-center justify-center text-center text-sm text-secondary">
            {t("embeddingsLab.search.empty")}
          </div>
        ) : (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <p className="font-ibm-plex-mono text-xs uppercase text-green">
              {t("embeddingsLab.search.matches")}
            </p>
            <div className="mt-4 grid gap-3">
              {data.results.map((result) => {
                const percentage = Math.max(
                  0,
                  Math.min(100, result.similarity * 100),
                );

                return (
                  <article
                    key={result.text}
                    className={`border p-4 ${
                      result.rank === 1
                        ? "border-green/60 bg-green/10"
                        : "border-neutral-800 bg-secondary-bg"
                    }`}
                  >
                    <div className="flex items-start gap-4">
                      <span className="flex size-8 shrink-0 items-center justify-center border border-neutral-800 bg-main-bg font-ibm-plex-mono text-sm font-semibold text-green">
                        {result.rank}
                      </span>
                      <div className="min-w-0 flex-1">
                        <div className="flex justify-between gap-3">
                          <p className="text-sm font-semibold text-primary">{result.text}</p>
                          <span className="font-ibm-plex-mono text-xs font-semibold text-green">
                            {percentage.toFixed(1)}%
                          </span>
                        </div>
                        <div className="mt-3 h-2 overflow-hidden bg-main-bg">
                          <div
                            className="h-full bg-green"
                            style={{ width: `${percentage}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
