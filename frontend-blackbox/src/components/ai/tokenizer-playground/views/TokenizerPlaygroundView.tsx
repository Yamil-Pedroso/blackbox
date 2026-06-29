import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import type { TFunction } from "i18next";
import { useTranslation } from "react-i18next";
import {
  Binary,
  Calculator,
  ChevronRight,
  CircleDollarSign,
  Eraser,
  FileText,
  Info,
  Layers3,
  LoaderCircle,
  Play,
  Sparkles,
  Timer,
} from "lucide-react";
import { useTokenizer } from "../../../../lib/hooks/ai/useTokenizer";
import {
  formatEstimatedCost,
  formatTokenValue,
} from "../../../../lib/tokenizerFormatters";
import type {
  LatencyRating,
  TokenizerAnalysis,
  TokenizerModel,
  TokenType,
} from "../../../../types/ai/tokenizer.types";

const tokenStyles: Record<TokenType, string> = {
  word: "border-cyan-400/25 bg-cyan-400/10 text-cyan-100",
  number: "border-amber-400/25 bg-amber-400/10 text-amber-100",
  punctuation: "border-fuchsia-400/25 bg-fuchsia-400/10 text-fuchsia-100",
  whitespace: "border-slate-500/30 bg-slate-500/10 text-slate-300",
  special: "border-emerald-400/25 bg-emerald-400/10 text-emerald-100",
};

const accuracyStyles = {
  exact: "border-green/30 bg-green/10 text-green",
  estimated: "border-amber-300/30 bg-amber-300/10 text-amber-300",
  educational: "border-green/30 bg-green/10 text-green",
} as const;

const latencyRatingStyles: Record<LatencyRating, string> = {
  first: "border-cyan-300/20 bg-cyan-300/10 text-cyan-300",
  best: "border-emerald-300/20 bg-emerald-300/10 text-emerald-300",
  fast: "border-lime-300/20 bg-lime-300/10 text-lime-300",
  average: "border-sky-300/20 bg-sky-300/10 text-sky-300",
  slow: "border-amber-300/20 bg-amber-300/10 text-amber-300",
  worst: "border-red-300/20 bg-red-300/10 text-red-300",
};

function buildInsights(
  data: TokenizerAnalysis,
  t: TFunction<"exploreMiniAppsAi">,
): string[] {
  return [
    t("tokenizerPlayground.insights.counted", {
      model: data.selectedModel.displayName,
      tokens: data.inputTokens,
      words: data.wordCount,
    }),
    data.tokenizerAccuracy === "exact"
      ? t("tokenizerPlayground.insights.exact")
      : t("tokenizerPlayground.insights.fallback"),
    t("tokenizerPlayground.insights.outputBudget", {
      tokens: data.estimatedOutputTokens,
    }),
    t("tokenizerPlayground.insights.conversion", {
      rate: data.costEstimate.usdToChfRate,
    }),
  ];
}

function getProviders(models: TokenizerModel[]): string[] {
  return [...new Set(models.map((model) => model.provider))];
}

const TokenizerPlaygroundView = () => {
  const { t } = useTranslation("exploreMiniAppsAi");
  const [text, setText] = useState(t("tokenizerPlayground.exampleText"));
  const [provider, setProvider] = useState("OpenAI");
  const [selectedModel, setSelectedModel] = useState("gpt-4o-mini");
  const [estimatedOutputTokens, setEstimatedOutputTokens] = useState(500);
  const [includeSpaces, setIncludeSpaces] = useState(false);
  const { data, error, isLoading, models, modelsError, analyze, reset } =
    useTokenizer();

  const providers = useMemo(() => getProviders(models), [models]);
  const disclaimerBullets = t("tokenizerPlayground.disclaimer.bullets", {
    returnObjects: true,
    rate: data?.costEstimate.usdToChfRate,
  }) as string[];
  const providerModels = useMemo(
    () => models.filter((model) => model.provider === provider),
    [models, provider],
  );

  function handleProviderChange(nextProvider: string) {
    setProvider(nextProvider);
    const firstModel = models.find((model) => model.provider === nextProvider);

    if (firstModel) {
      setSelectedModel(firstModel.modelId);
    }
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    void analyze({
      text,
      selectedModel,
      estimatedOutputTokens,
      includeSpaces,
    });
  }

  function handleClear() {
    setText("");
    reset();
  }

  return (
    <section className="relative w-full min-w-0 overflow-hidden border border-neutral-800 bg-secondary-bg text-primary">
      <header className="relative border-b border-neutral-800 px-4 py-6 sm:px-7 sm:py-8 lg:px-9">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl">
            <p className="flex items-center gap-2 font-ibm-plex-mono text-xs uppercase text-green">
              <Binary className="h-4 w-4" />
              {t("tokenizerPlayground.header.eyebrow")}
            </p>
            <h2 className="mt-3 text-3xl text-primary sm:text-4xl lg:text-5xl">
              {t("tokenizerPlayground.header.title")}
            </h2>
            <p className="mt-4 max-w-2xl font-ibm-plex-mono text-sm leading-relaxed text-secondary">
              {t("tokenizerPlayground.header.description")}
            </p>
          </div>

          <div
            className="flex flex-wrap gap-2 lg:max-w-sm lg:justify-end"
            aria-label={t("tokenizerPlayground.header.legend")}
          >
            {(Object.keys(tokenStyles) as TokenType[]).map((type) => (
              <span
                key={type}
                className={`rounded-full border px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide sm:text-xs ${tokenStyles[type]}`}
              >
                {t(`tokenizerPlayground.tokenLabels.${type}`)}
              </span>
            ))}
          </div>
        </div>
      </header>

      <form
        onSubmit={handleSubmit}
        className="relative border-b border-neutral-800 p-4 sm:p-7 lg:p-9"
      >
        <div className="mb-4 flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center border border-neutral-800 bg-main-bg text-green">
            <FileText className="h-5 w-5" />
          </div>
          <div>
            <h3 className="font-bold text-primary">
              {t("tokenizerPlayground.form.title")}
            </h3>
            <p className="text-xs text-secondary">
              {t("tokenizerPlayground.form.description")}
            </p>
          </div>
        </div>

        <label className="grid gap-2 text-sm font-bold text-primary">
          {t("tokenizerPlayground.form.text")}
          <textarea
            value={text}
            onChange={(event) => setText(event.target.value)}
            rows={7}
            placeholder={t("tokenizerPlayground.form.placeholder")}
            className="min-h-40 min-w-0 resize-y border border-neutral-800 bg-main-bg px-4 py-3 font-ibm-plex-mono text-sm font-normal leading-6 text-primary outline-none transition placeholder:text-secondary/50 focus:border-green sm:min-h-44"
          />
        </label>

        <div className="mt-5 grid min-w-0 gap-4 sm:grid-cols-2 xl:grid-cols-[1fr_1fr_0.8fr]">
          <label className="grid min-w-0 gap-2 text-sm font-bold text-primary">
            {t("tokenizerPlayground.form.provider")}
            <select
              value={provider}
              onChange={(event) => handleProviderChange(event.target.value)}
              disabled={models.length === 0}
              className="min-h-12 min-w-0 border border-neutral-800 bg-main-bg px-3 font-ibm-plex-mono text-sm font-normal text-primary outline-none transition focus:border-green"
            >
              {providers.map((providerName) => (
                <option key={providerName} value={providerName}>
                  {providerName}
                </option>
              ))}
            </select>
          </label>

          <label className="grid min-w-0 gap-2 text-sm font-bold text-primary">
            {t("tokenizerPlayground.form.model")}
            <select
              value={selectedModel}
              onChange={(event) => setSelectedModel(event.target.value)}
              disabled={providerModels.length === 0}
              className="min-h-12 min-w-0 border border-neutral-800 bg-main-bg px-3 font-ibm-plex-mono text-sm font-normal text-primary outline-none transition focus:border-green"
            >
              {providerModels.map((model) => (
                <option key={model.modelId} value={model.modelId}>
                  {model.displayName}
                </option>
              ))}
            </select>
          </label>

          <label className="grid min-w-0 gap-2 text-sm font-bold text-primary">
            {t("tokenizerPlayground.form.estimatedOutputTokens")}
            <input
              type="number"
              min={0}
              max={1_000_000}
              step={1}
              value={estimatedOutputTokens}
              onChange={(event) =>
                setEstimatedOutputTokens(Number(event.target.value))
              }
              className="min-h-12 min-w-0 border border-neutral-800 bg-main-bg px-3 font-ibm-plex-mono text-sm font-normal text-primary outline-none transition focus:border-green"
            />
          </label>
        </div>

        <div className="mt-5 flex flex-col gap-4 border-t border-neutral-800 pt-5 sm:flex-row sm:items-center sm:justify-between">
          <label className="flex cursor-pointer items-start gap-3 text-sm font-medium leading-5 text-secondary sm:max-w-lg">
            <input
              type="checkbox"
              checked={includeSpaces}
              onChange={(event) => setIncludeSpaces(event.target.checked)}
              className="mt-0.5 size-4 shrink-0 accent-green"
            />
            {t("tokenizerPlayground.form.includeSpaces")}
          </label>

          <div className="grid grid-cols-1 gap-2.5 min-[380px]:grid-cols-2 sm:flex">
            <button
              type="button"
              onClick={handleClear}
              disabled={isLoading}
              className="inline-flex min-h-11 items-center justify-center gap-2 border border-neutral-800 bg-main-bg px-5 font-ibm-plex-mono text-xs font-semibold text-secondary transition hover:border-green/50 hover:text-primary disabled:opacity-50"
            >
              <Eraser className="h-4 w-4" />
              {t("tokenizerPlayground.form.clear")}
            </button>
            <button
              type="submit"
              disabled={isLoading || models.length === 0}
              className="inline-flex min-h-11 items-center justify-center gap-2 bg-green px-5 font-ibm-plex-mono text-xs font-semibold text-black shadow-[0_12px_30px_rgba(0,255,136,0.12)] transition hover:-translate-y-0.5 hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:translate-y-0"
            >
              {isLoading ? (
                <LoaderCircle className="h-4 w-4 animate-spin" />
              ) : (
                <Play className="h-4 w-4 fill-current" />
              )}
              {isLoading
                ? t("tokenizerPlayground.form.analyzing")
                : t("tokenizerPlayground.form.analyze")}
            </button>
          </div>
        </div>
      </form>

      {(error || modelsError) && (
        <p
          role="alert"
          className="m-4 rounded-xl border border-red-400/20 bg-red-400/10 p-4 text-sm text-red-300 sm:m-7"
        >
          {error ?? modelsError}
        </p>
      )}

      <div aria-live="polite">
        {isLoading ? (
          <div className="flex min-h-72 items-center justify-center p-6">
            <div className="text-center">
              <LoaderCircle className="mx-auto size-9 animate-spin text-green" />
              <p className="mt-4 text-sm font-semibold text-secondary">
                {t("tokenizerPlayground.loading")}
              </p>
            </div>
          </div>
        ) : data ? (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="grid grid-cols-2 border-b border-neutral-800 lg:grid-cols-4">
              {[
                [t("tokenizerPlayground.summary.characters"), data.characterCount],
                [t("tokenizerPlayground.summary.words"), data.wordCount],
                [t("tokenizerPlayground.summary.inputTokens"), data.inputTokens],
                [
                  t("tokenizerPlayground.summary.outputEstimate"),
                  data.estimatedOutputTokens,
                ],
              ].map(([label, value]) => (
                <div
                  key={label}
                  className="border-b border-r border-neutral-800 p-4 even:border-r-0 lg:border-b-0 lg:even:border-r lg:last:border-r-0 sm:p-5"
                >
                  <p className="font-ibm-plex-mono text-[10px] uppercase text-secondary sm:text-xs">
                    {label}
                  </p>
                  <strong className="mt-2 block text-2xl font-semibold text-primary sm:text-3xl">
                    {value}
                  </strong>
                </div>
              ))}
            </div>

            <div className="grid xl:grid-cols-[1.25fr_0.75fr]">
              <div className="min-w-0 border-b border-neutral-800 p-4 sm:p-7 xl:border-b-0 xl:border-r xl:border-neutral-800">
                <div className="border border-neutral-800 bg-main-bg p-4">
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div className="min-w-0">
                      <p className="font-ibm-plex-mono text-xs uppercase text-green">
                        {t("tokenizerPlayground.visualization")}
                      </p>
                      <h3 className="mt-2 break-words text-xl font-semibold text-primary">
                        {data.selectedModel.displayName}
                      </h3>
                      <p className="mt-1 font-ibm-plex-mono text-xs text-secondary">
                        {data.selectedModel.provider}
                      </p>
                    </div>
                    <span
                      className={`border px-2.5 py-1 font-ibm-plex-mono text-[10px] font-semibold uppercase tracking-wide ${accuracyStyles[data.tokenizerAccuracy]}`}
                    >
                      {data.tokenizerAccuracy}
                    </span>
                  </div>

                  <p className="mt-4 border-l-2 border-green/60 bg-secondary-bg px-3 py-2 text-xs leading-5 text-secondary">
                    {data.tokenizerNotes}
                  </p>
                </div>

                <div
                  data-lenis-prevent
                  className="mt-5 grid max-h-[32rem] grid-cols-2 gap-2 overflow-y-auto overscroll-contain pr-1 min-[430px]:grid-cols-3 sm:flex sm:flex-wrap sm:gap-3"
                >
                  {data.tokens.map((token) => (
                    <article
                      key={token.id}
                      className={`min-w-0 border p-3 shadow-[0_10px_30px_rgba(0,0,0,0.08)] sm:min-w-24 ${tokenStyles[token.type]}`}
                    >
                      <div className="flex items-center justify-between gap-3 font-ibm-plex-mono text-[10px] font-semibold uppercase">
                        <span>#{token.id}</span>
                        <span>{token.type}</span>
                      </div>
                      <p className="mt-2 break-all font-ibm-plex-mono text-sm font-semibold">
                        {formatTokenValue(token.value, token.type)}
                      </p>
                    </article>
                  ))}
                </div>
              </div>

              <aside className="bg-main-bg/40 p-4 sm:p-7">
                {data.observability && (
                  <div className="mb-6 overflow-hidden border border-neutral-800 bg-secondary-bg p-4 shadow-[0_18px_50px_rgba(0,0,0,0.12)]">
                    <div className="flex items-center justify-between gap-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center border border-neutral-800 bg-main-bg text-green">
                          <Timer className="h-5 w-5" />
                        </div>
                        <div>
                          <p className="font-ibm-plex-mono text-[10px] uppercase text-green">
                            {t("tokenizerPlayground.latency.title")}
                          </p>
                          <p className="mt-1 text-xs text-secondary">
                            {t("tokenizerPlayground.latency.subtitle")}
                          </p>
                        </div>
                      </div>
                      <span
                        className={`rounded-full border px-2.5 py-1 text-[10px] font-black uppercase tracking-wide ${
                          data.observability.stats
                            ? latencyRatingStyles[data.observability.stats.rating]
                            : "border-green/20 bg-green/10 text-green"
                        }`}
                      >
                        {data.observability.stats?.rating ??
                          t("tokenizerPlayground.latency.measured")}
                      </span>
                    </div>

                    <div className="mt-5 grid gap-3 border border-neutral-800 bg-main-bg p-4">
                      <strong className="font-ibm-plex-mono text-3xl font-semibold leading-none text-primary">
                        {(
                          data.observability.stats?.lastMs ??
                          data.observability.durationMs
                        ).toFixed(2)}
                        <span className="ml-1 text-base text-green">ms</span>
                      </strong>
                      <div className="flex flex-wrap items-center gap-2 text-xs">
                        <span className="border border-neutral-800 bg-secondary-bg px-2 py-1 font-ibm-plex-mono text-primary">
                          {data.observability.label}
                        </span>
                        <span className="text-secondary">
                          {t("tokenizerPlayground.latency.requestMeasured")}
                        </span>
                      </div>
                    </div>

                    {data.observability.stats && (
                      <div className="mt-4 grid grid-cols-2 gap-2 text-xs sm:grid-cols-4">
                        {[
                          [
                            t("tokenizerPlayground.latency.best"),
                            `${data.observability.stats.bestMs.toFixed(2)}ms`,
                          ],
                          [
                            t("tokenizerPlayground.latency.average"),
                            `${data.observability.stats.averageMs.toFixed(2)}ms`,
                          ],
                          [
                            t("tokenizerPlayground.latency.worst"),
                            `${data.observability.stats.worstMs.toFixed(2)}ms`,
                          ],
                          [
                            t("tokenizerPlayground.latency.runs"),
                            data.observability.stats.count,
                          ],
                        ].map(([label, value]) => (
                          <div
                            key={label}
                            className="border border-neutral-800 bg-main-bg p-3"
                          >
                            <p className="font-ibm-plex-mono font-bold uppercase text-secondary">
                              {label}
                            </p>
                            <strong className="mt-1 block break-all font-ibm-plex-mono text-sm text-primary">
                              {value}
                            </strong>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}

                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center border border-neutral-800 bg-main-bg text-green">
                    <CircleDollarSign className="h-5 w-5" />
                  </div>
                  <p className="font-ibm-plex-mono text-xs uppercase text-green">
                    {t("tokenizerPlayground.cost.title")}
                  </p>
                </div>
                <div className="mt-5 grid gap-4 sm:grid-cols-2 xl:grid-cols-1">
                  {[
                    [
                      t("tokenizerPlayground.cost.input"),
                      formatEstimatedCost(
                        data.costEstimate.inputCostUSD,
                        "USD",
                      ),
                    ],
                    [
                      t("tokenizerPlayground.cost.output"),
                      formatEstimatedCost(
                        data.costEstimate.outputCostUSD,
                        "USD",
                      ),
                    ],
                    [
                      t("tokenizerPlayground.cost.totalUsd"),
                      formatEstimatedCost(
                        data.costEstimate.totalCostUSD,
                        "USD",
                      ),
                    ],
                    [
                      t("tokenizerPlayground.cost.totalChf"),
                      formatEstimatedCost(
                        data.costEstimate.totalCostCHF,
                        "CHF",
                      ),
                    ],
                  ].map(([label, value]) => (
                    <div
                      key={label}
                      className="border-b border-neutral-800 pb-4 last:border-b-0"
                    >
                      <p className="font-ibm-plex-mono text-xs font-bold uppercase text-secondary">
                        {label}
                      </p>
                      <strong className="mt-1 block break-all font-mono text-xl">
                        {value}
                      </strong>
                    </div>
                  ))}
                </div>
              </aside>
            </div>

            <div className="grid border-t border-neutral-800 lg:grid-cols-2">
              <div className="border-b border-neutral-800 p-4 sm:p-7 lg:border-b-0 lg:border-r">
                <h3 className="flex items-center gap-2 text-lg font-semibold text-primary">
                  <Sparkles className="h-5 w-5 text-green" />
                  {t("tokenizerPlayground.insights.title")}
                </h3>
                <div className="mt-4 grid gap-3">
                  {buildInsights(data, t).map((insight, index) => (
                    <div
                      key={insight}
                      className="grid grid-cols-[2rem_1fr] gap-3"
                    >
                      <span className="font-ibm-plex-mono text-xs font-semibold text-green">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <p className="text-sm leading-6 text-secondary">
                        {insight}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-4 sm:p-7">
                <h3 className="flex items-center gap-2 text-lg font-semibold text-primary">
                  <Calculator className="h-5 w-5 text-green" />
                  {t("tokenizerPlayground.pricing.title")}
                </h3>
                <dl className="mt-4 grid gap-3 text-sm">
                  <div className="flex justify-between gap-4">
                    <dt className="text-secondary">
                      {t("tokenizerPlayground.pricing.input")}
                    </dt>
                    <dd className="break-all font-ibm-plex-mono font-bold text-primary">
                      {formatEstimatedCost(
                        data.selectedModel.inputPricePerMillionUSD,
                        "USD",
                      )}
                    </dd>
                  </div>
                  <div className="flex justify-between gap-4">
                    <dt className="text-secondary">
                      {t("tokenizerPlayground.pricing.output")}
                    </dt>
                    <dd className="break-all font-ibm-plex-mono font-bold text-primary">
                      {formatEstimatedCost(
                        data.selectedModel.outputPricePerMillionUSD,
                        "USD",
                      )}
                    </dd>
                  </div>
                  <div className="flex justify-between gap-4">
                    <dt className="text-secondary">
                      {t("tokenizerPlayground.pricing.updated")}
                    </dt>
                    <dd className="text-right font-semibold text-primary">
                      {data.selectedModel.pricingLastUpdated}
                    </dd>
                  </div>
                </dl>
              </div>
            </div>

            <aside className="border-t border-neutral-800 bg-main-bg/40 p-4 sm:p-7">
              <div className="grid gap-5 lg:grid-cols-[0.35fr_0.65fr]">
                <div>
                  <p className="flex items-center gap-2 font-ibm-plex-mono text-xs uppercase text-green">
                    <Info className="h-4 w-4" />
                    {t("tokenizerPlayground.disclaimer.eyebrow")}
                  </p>
                  <h3 className="mt-2 text-xl font-semibold text-primary">
                    {t("tokenizerPlayground.disclaimer.title")}
                  </h3>
                  <p className="mt-3 text-sm leading-6 text-secondary">
                    {t("tokenizerPlayground.disclaimer.body")}
                  </p>
                </div>

                <ul className="grid gap-3 text-sm leading-6 text-secondary md:grid-cols-2">
                  {disclaimerBullets.map((bullet, index) => (
                    <li
                      key={bullet}
                      className={`border-l-2 border-green/60 pl-3 ${
                        index === disclaimerBullets.length - 1
                          ? "md:col-span-2"
                          : ""
                      }`}
                    >
                      {bullet}
                    </li>
                  ))}
                </ul>
              </div>

              <p className="mt-5 border-t border-neutral-800 pt-4 text-xs leading-5 text-secondary">
                {data.disclaimer}
              </p>
            </aside>
          </motion.div>
        ) : (
          <div className="flex min-h-72 items-center justify-center p-5 text-center sm:min-h-80 sm:p-8">
            <div className="max-w-md">
              <div className="mx-auto flex h-14 w-14 items-center justify-center border border-neutral-800 bg-main-bg text-green">
                <Layers3 className="h-6 w-6" />
              </div>
              <p className="mt-5 text-xl font-semibold text-primary">
                {t("tokenizerPlayground.empty.title")}
              </p>
              <p className="mt-2 text-sm leading-6 text-secondary">
                {t("tokenizerPlayground.empty.description")}
              </p>
              <div className="mt-5 inline-flex items-center gap-2 font-ibm-plex-mono text-xs uppercase text-green">
                {t("tokenizerPlayground.empty.cta")}
                <ChevronRight className="h-4 w-4" />
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default TokenizerPlaygroundView;
