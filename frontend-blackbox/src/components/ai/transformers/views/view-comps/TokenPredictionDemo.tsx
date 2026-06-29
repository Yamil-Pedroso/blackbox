import { useMemo, useState } from "react";
import type { FormEvent } from "react";
import { Loader2, Play, RotateCcw } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useTransformerDemo } from "../../../../../lib/hooks/ai/useTransformerDemo";
import AttentionVisualizer from "./AttentionVisualizer";

const TokenPredictionDemo = () => {
  const { t } = useTranslation("exploreMiniAppsAi");
  const samplePrompts = t("transformers.demo.samplePrompts", {
    returnObjects: true,
  }) as string[];
  const loadingSteps = t("transformers.demo.loading", {
    returnObjects: true,
  }) as string[];
  const [prompt, setPrompt] = useState(samplePrompts[0]);
  const { data, loading, error, runDemo, clear } = useTransformerDemo();

  const activeAttention = useMemo(() => {
    if (!data?.attention.length) return null;
    return data.attention[data.attention.length - 1];
  }, [data]);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    void runDemo(prompt, "gpt-4.1-mini");
  };

  return (
    <div className="border border-neutral-800 bg-secondary-bg">
      <div className="border-b border-neutral-800 p-5">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <span className="font-ibm-plex-mono text-xs uppercase text-green">
              {t("transformers.demo.eyebrow")}
            </span>
            <h3 className="mt-2 text-2xl text-primary">
              {t("transformers.demo.title")}
            </h3>
            <p className="mt-2 max-w-2xl font-ibm-plex-mono text-xs leading-relaxed text-secondary">
              {t("transformers.demo.description")}
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            {samplePrompts.map((sample) => (
              <button
                key={sample}
                type="button"
                onClick={() => setPrompt(sample)}
                className="border border-neutral-800 px-3 py-2 font-ibm-plex-mono text-xs text-secondary transition-colors hover:border-green/50 hover:text-primary"
              >
                {sample}
              </button>
            ))}
          </div>
        </div>

        <form
          onSubmit={handleSubmit}
          className="mt-6 grid gap-3 lg:grid-cols-[1fr_auto_auto]"
        >
          <input
            value={prompt}
            onChange={(event) => setPrompt(event.target.value)}
            placeholder={t("transformers.demo.placeholder")}
            className="min-h-12 border border-neutral-800 bg-main-bg px-4 text-primary outline-none focus:border-green"
          />
          <button
            type="submit"
            disabled={loading}
            className="inline-flex min-h-12 items-center justify-center gap-2 border border-green/50 bg-green px-5 font-ibm-plex-mono text-xs text-black transition-opacity disabled:opacity-60"
          >
            {loading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Play className="h-4 w-4" />
            )}
            {t("transformers.demo.run")}
          </button>
          <button
            type="button"
            onClick={clear}
            className="inline-flex min-h-12 items-center justify-center gap-2 border border-neutral-800 px-5 font-ibm-plex-mono text-xs text-secondary hover:text-primary"
          >
            <RotateCcw className="h-4 w-4" />
            {t("transformers.demo.clear")}
          </button>
        </form>
      </div>

      {loading && (
        <div className="p-8">
          <div className="grid gap-4 md:grid-cols-3">
            {loadingSteps.map((label) => (
                <div
                  key={label}
                  className="h-28 animate-pulse border border-neutral-800 bg-main-bg p-4"
                >
                  <div className="mb-6 h-3 w-24 bg-neutral-800" />
                  <div className="h-8 w-full bg-neutral-800" />
                </div>
            ))}
          </div>
        </div>
      )}

      {!loading && !data && !error && (
        <div className="p-8 text-center font-ibm-plex-mono text-sm text-secondary">
          {t("transformers.demo.empty")}
        </div>
      )}

      {!loading && error && (
        <div className="border-b border-neutral-800 bg-yellow-500/10 px-5 py-3 font-ibm-plex-mono text-xs text-yellow-300">
          {error}
        </div>
      )}

      {!loading && data && (
        <div className="space-y-8 p-5">
          <div className="flex flex-wrap gap-2">
            {data.tokens.map((token, index) => (
              <span
                key={`${token}-${index}`}
                className="border border-neutral-800 bg-main-bg px-3 py-2 font-ibm-plex-mono text-xs text-primary"
              >
                {index + 1}. {token}
              </span>
            ))}
            <span className="border border-green/50 bg-green/10 px-3 py-2 font-ibm-plex-mono text-xs text-green">
              {t("transformers.demo.chosen")} {"->"} {data.chosenToken}
            </span>
          </div>

          <div className="grid gap-4 lg:grid-cols-3">
            <div className="border border-neutral-800 bg-main-bg p-4 lg:col-span-2">
              <h4 className="mb-4 text-primary">
                {t("transformers.demo.embeddingPreview")}
              </h4>
              <div className="grid gap-3 md:grid-cols-2">
                {data.embeddingsPreview.map((embedding) => (
                  <div
                    key={embedding.token}
                    className="border border-neutral-800 p-3"
                  >
                    <div className="mb-3 font-ibm-plex-mono text-xs text-green">
                      {embedding.token}
                    </div>
                    <div className="flex gap-2">
                      {embedding.values.map((value, index) => (
                        <div
                          key={`${embedding.token}-${index}`}
                          className="h-10 flex-1 border border-neutral-800 bg-secondary-bg"
                        >
                          <div
                            className="bg-green/70"
                            style={{
                              height: `${Math.abs(value) * 100}%`,
                              marginTop: value < 0 ? "50%" : undefined,
                            }}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="border border-neutral-800 bg-main-bg p-4">
              <h4 className="mb-4 text-primary">
                {t("transformers.demo.nextTokenProbabilities")}
              </h4>
              <div className="space-y-3">
                {data.nextTokenPredictions.map((prediction) => (
                  <div key={prediction.token}>
                    <div className="mb-1 flex justify-between font-ibm-plex-mono text-xs">
                      <span
                        className={
                          prediction.token === data.chosenToken
                            ? "text-green"
                            : "text-secondary"
                        }
                      >
                        {prediction.token}
                      </span>
                      <span className="text-secondary">
                        {Math.round(prediction.probability * 100)}%
                      </span>
                    </div>
                    <div className="h-2 bg-neutral-800">
                      <div
                        className={
                          prediction.token === data.chosenToken
                            ? "h-full bg-green"
                            : "h-full bg-blue-400"
                        }
                        style={{ width: `${prediction.probability * 100}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <AttentionVisualizer
            tokens={data.tokens}
            attention={data.attention}
          />

          {activeAttention && (
            <div className="border border-neutral-800 bg-main-bg p-4">
              <h4 className="mb-4 text-primary">
                {t("transformers.demo.highlightedPath", {
                  path: data.highlightedPath.join(" -> "),
                })}
              </h4>
              <div className="flex flex-wrap gap-2">
                {activeAttention.toTokens.map((target) => (
                  <span
                    key={target.token}
                    className="border border-neutral-800 px-3 py-2 font-ibm-plex-mono text-xs text-secondary"
                  >
                    {activeAttention.fromToken} {"->"} {target.token}:{" "}
                    {Math.round(target.weight * 100)}%
                  </span>
                ))}
              </div>
            </div>
          )}

          <div className="font-ibm-plex-mono text-xs text-secondary">
            {t("transformers.demo.approximation", {
              value: String(data.isApproximation),
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default TokenPredictionDemo;
