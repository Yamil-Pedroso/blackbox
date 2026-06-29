import { useState } from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import {
  usePredictionPath,
  usePredictionTree,
  useTokenPrediction,
} from "../../../../lib/hooks/ai/useTokenPrediction";
import type { TokenPredictionRequest } from "../../../../types/ai/tokenPrediction.types";
import { PredictionPath } from "./view-comps/PredictionPath";
import { PredictionStats } from "./view-comps/PredictionStats";
import { PredictionTimeline } from "./view-comps/PredictionTimeline";
import { PredictionTree } from "./view-comps/PredictionTree";
import { TopPredictionCards } from "./view-comps/TopPredictionCards";

const TokenPredictionView = () => {
  const { t } = useTranslation("exploreMiniAppsAi");
  const [prompt, setPrompt] = useState(t("tokenPrediction.initialPrompt"));
  const [model, setModel] = useState("educational-local");
  const [topK, setTopK] = useState(10);
  const modelOptions = [
    {
      value: "educational-local",
      label: t("tokenPrediction.models.educationalLocal"),
    },
    {
      value: "gpt-4.1-mini",
      label: t("tokenPrediction.models.gpt41Mini"),
    },
    {
      value: "gpt-4o-mini",
      label: t("tokenPrediction.models.gpt4oMini"),
    },
  ];
  const prediction = useTokenPrediction();
  const tree = usePredictionTree();
  const path = usePredictionPath();
  const isLoading = prediction.isLoading || tree.isLoading || path.isLoading;
  const error = prediction.error ?? tree.error ?? path.error;

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const payload: TokenPredictionRequest = { prompt, model, topK };

    await Promise.all([
      prediction.execute(payload),
      tree.execute(payload),
      path.execute(payload),
    ]);
  }

  function clearAll() {
    setPrompt("");
    prediction.clear();
    tree.clear();
    path.clear();
  }

  async function copyResult() {
    if (prediction.data?.generatedText) {
      await navigator.clipboard.writeText(prediction.data.generatedText);
    }
  }

  return (
    <section className="min-w-0 overflow-hidden border border-neutral-800 bg-secondary-bg text-primary">
      <header className="border-b border-neutral-800 bg-secondary-bg px-5 py-8 sm:px-8">
        <p className="font-ibm-plex-mono text-xs uppercase text-green">
          {t("tokenPrediction.header.eyebrow")}
        </p>
        <div className="mt-3 flex flex-wrap items-end justify-between gap-5">
          <div>
            <h2 className="text-3xl sm:text-4xl">
              {t("tokenPrediction.header.title")}
            </h2>
            <p className="mt-3 max-w-3xl font-ibm-plex-mono text-sm leading-6 text-secondary">
              {t("tokenPrediction.header.description")}
            </p>
          </div>
          <div className="border border-neutral-800 bg-main-bg px-4 py-3">
            <p className="font-ibm-plex-mono text-[10px] uppercase text-green">
              {t("tokenPrediction.header.loopLabel")}
            </p>
            <p className="mt-1 font-ibm-plex-mono text-xs text-primary">
              {t("tokenPrediction.header.loopValue")}
            </p>
          </div>
        </div>
      </header>

      <form
        onSubmit={handleSubmit}
        className="grid gap-5 border-b border-neutral-800 p-5 sm:p-8 lg:grid-cols-[1fr_280px]"
      >
        <label className="grid gap-2 text-sm font-semibold text-primary">
          {t("tokenPrediction.form.prompt")}
          <textarea
            value={prompt}
            onChange={(event) => setPrompt(event.target.value)}
            rows={6}
            placeholder={t("tokenPrediction.form.placeholder")}
            className="resize-y border border-neutral-800 bg-main-bg px-4 py-3 font-ibm-plex-mono text-sm font-normal leading-6 text-primary outline-none transition placeholder:text-secondary/50 focus:border-green"
          />
        </label>

        <div className="grid content-start gap-4">
          <label className="grid gap-2 text-sm font-semibold text-primary">
            {t("tokenPrediction.form.model")}
            <select
              value={model}
              onChange={(event) => setModel(event.target.value)}
              className="min-h-11 border border-neutral-800 bg-main-bg px-3 font-ibm-plex-mono text-sm font-normal text-primary outline-none focus:border-green"
            >
              {modelOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </label>
          <label className="grid gap-2 text-sm font-semibold text-primary">
            {t("tokenPrediction.form.topK", { topK })}
            <input
              type="range"
              min="2"
              max="20"
              value={topK}
              onChange={(event) => setTopK(Number(event.target.value))}
              className="accent-green"
            />
          </label>
          <div className="grid grid-cols-2 gap-3">
            <button
              type="submit"
              disabled={isLoading || !prompt.trim()}
              className="min-h-11 bg-green px-4 font-ibm-plex-mono text-xs font-semibold text-black transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isLoading
                ? t("tokenPrediction.form.predicting")
                : t("tokenPrediction.form.predict")}
            </button>
            <button
              type="button"
              onClick={clearAll}
              className="min-h-11 border border-neutral-800 bg-main-bg px-4 font-ibm-plex-mono text-xs font-semibold text-secondary transition hover:border-green/50 hover:text-primary"
            >
              {t("tokenPrediction.form.clear")}
            </button>
          </div>
        </div>
      </form>

      {error && (
        <div className="m-5 border border-red-400/20 bg-red-400/10 p-4 text-sm text-red-300 sm:m-8">
          {error}
        </div>
      )}

      {!prediction.data && !isLoading && !error && (
        <div className="flex min-h-72 items-center justify-center p-8 text-center">
          <div className="max-w-lg">
            <div className="mx-auto grid size-16 place-items-center border border-neutral-800 bg-main-bg font-ibm-plex-mono text-xl font-semibold text-green">
              P(t)
            </div>
            <h3 className="mt-5 text-xl font-semibold">
              {t("tokenPrediction.empty.title")}
            </h3>
            <p className="mt-2 text-sm leading-6 text-secondary">
              {t("tokenPrediction.empty.description")}
            </p>
          </div>
        </div>
      )}

      {isLoading && !prediction.data && (
        <div className="grid min-h-72 place-items-center p-8">
          <div className="text-center">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 1.2, ease: "linear" }}
              className="mx-auto size-12 border-4 border-neutral-800 border-t-green"
            />
            <p className="mt-4 text-sm font-semibold text-secondary">
              {t("tokenPrediction.loading")}
            </p>
          </div>
        </div>
      )}

      {prediction.data && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="min-w-0 grid gap-8 p-5 sm:p-8"
        >
          <div
            className={`border p-4 ${
              prediction.data.isApproximation
                ? "border-green/30 bg-green/10"
                : "border-green/40 bg-green/10"
            }`}
          >
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="font-ibm-plex-mono text-xs font-semibold uppercase text-green">
                  {prediction.data.isApproximation
                    ? t("tokenPrediction.provider.educational")
                    : t("tokenPrediction.provider.real")}
                </p>
                <p className="mt-1 text-sm leading-6 text-secondary">
                  {prediction.data.approximationReason ??
                    t("tokenPrediction.provider.fallbackReason")}
                </p>
              </div>
              <span className="border border-neutral-800 bg-main-bg px-3 py-2 font-ibm-plex-mono text-xs font-semibold text-primary">
                {prediction.data.provider} / {prediction.data.model}
              </span>
            </div>
          </div>

          <section className="min-w-0 border border-neutral-800 bg-main-bg p-5 sm:p-6">
            <PredictionTimeline steps={prediction.data.predictionSteps} t={t} />
            <div className="mt-6 border-t border-neutral-800 pt-5">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="font-ibm-plex-mono text-xs uppercase text-secondary">
                    {t("tokenPrediction.result.generatedSentence")}
                  </p>
                  <p className="mt-2 max-w-4xl text-lg font-semibold leading-8 text-primary">
                    {prediction.data.generatedText}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => void copyResult()}
                  className="shrink-0 border border-neutral-800 bg-secondary-bg px-3 py-2 font-ibm-plex-mono text-xs font-semibold text-primary transition hover:border-green/50"
                >
                  {t("tokenPrediction.result.copy")}
                </button>
              </div>
            </div>
          </section>

          <PredictionStats prediction={prediction.data} t={t} />

          {path.data && <PredictionPath path={path.data} t={t} />}

          {tree.data && <PredictionTree tree={tree.data} t={t} />}

          <TopPredictionCards steps={prediction.data.predictionSteps} t={t} />

          <aside className="border-t border-neutral-800 pt-6">
            <p className="font-ibm-plex-mono text-xs uppercase text-green">
              {t("tokenPrediction.reading.title")}
            </p>
            <div className="mt-3 grid gap-4 text-sm leading-6 text-secondary md:grid-cols-3">
              <p>
                <strong className="block text-primary">
                  {t("tokenPrediction.reading.distribution")}
                </strong>
                {t("tokenPrediction.reading.distributionText")}
              </p>
              <p>
                <strong className="block text-primary">
                  {t("tokenPrediction.reading.selection")}
                </strong>
                {t("tokenPrediction.reading.selectionText")}
              </p>
              <p>
                <strong className="block text-primary">
                  {t("tokenPrediction.reading.newContext")}
                </strong>
                {t("tokenPrediction.reading.newContextText")}
              </p>
            </div>
          </aside>
        </motion.div>
      )}
    </section>
  );
};

export default TokenPredictionView;
