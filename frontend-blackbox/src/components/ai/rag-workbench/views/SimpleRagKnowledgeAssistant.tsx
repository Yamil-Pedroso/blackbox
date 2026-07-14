import { useMemo, useState } from "react";
import type { FormEvent, ReactNode } from "react";
import {
  Bot,
  Cpu,
  FileSearch,
  LoaderCircle,
  MessageSquareText,
  Network,
  Sparkles,
} from "lucide-react";
import { useTranslation } from "react-i18next";
import { useRagAssistant } from "../../../../lib/hooks/ai/useRag";
import type { RagAssistantRequest } from "../../../../types/ai/rag.types";

const toneOptions: Array<{
  value: NonNullable<RagAssistantRequest["tone"]>;
  labelKey: string;
}> = [
  { value: "explanatory", labelKey: "ragWorkbench.assistant.tones.explanatory" },
  { value: "concise", labelKey: "ragWorkbench.assistant.tones.concise" },
  { value: "support", labelKey: "ragWorkbench.assistant.tones.support" },
];

const answerModeOptions: Array<{
  value: NonNullable<RagAssistantRequest["answerMode"]>;
  labelKey: string;
  descriptionKey: string;
}> = [
  {
    value: "local",
    labelKey: "ragWorkbench.assistant.answerModes.local",
    descriptionKey: "ragWorkbench.assistant.answerModes.localDescription",
  },
  {
    value: "openai",
    labelKey: "ragWorkbench.assistant.answerModes.openai",
    descriptionKey: "ragWorkbench.assistant.answerModes.openaiDescription",
  },
];

const SimpleRagKnowledgeAssistant = () => {
  const { t } = useTranslation("exploreMiniAppsAi");
  const [knowledgeTitle, setKnowledgeTitle] = useState(
    t("ragWorkbench.assistant.defaults.title"),
  );
  const [knowledgeBase, setKnowledgeBase] = useState(
    t("ragWorkbench.assistant.defaults.knowledgeBase"),
  );
  const [question, setQuestion] = useState(
    t("ragWorkbench.assistant.defaults.question"),
  );
  const [tone, setTone] =
    useState<NonNullable<RagAssistantRequest["tone"]>>("explanatory");
  const [answerMode, setAnswerMode] =
    useState<NonNullable<RagAssistantRequest["answerMode"]>>("local");
  const { data, isLoading, error, execute } = useRagAssistant();

  const wordCount = useMemo(
    () => knowledgeBase.trim().split(/\s+/).filter(Boolean).length,
    [knowledgeBase],
  );

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    execute({
      knowledgeTitle,
      knowledgeBase,
      question,
      tone,
      answerMode,
    });
  }

  function askSuggestion(nextQuestion: string) {
    setQuestion(nextQuestion);
    execute({
      knowledgeTitle,
      knowledgeBase,
      question: nextQuestion,
      tone,
      answerMode,
    });
  }

  return (
    <section className="border-t border-neutral-800 bg-secondary-bg text-primary">
      <header className="border-b border-neutral-800 px-5 py-7 sm:px-8">
        <div className="flex flex-wrap items-start justify-between gap-5">
          <div>
            <p className="font-ibm-plex-mono text-xs uppercase text-green">
              {t("ragWorkbench.assistant.header.eyebrow")}
            </p>
            <h2 className="mt-3 text-3xl sm:text-4xl">
              {t("ragWorkbench.assistant.header.title")}
            </h2>
            <p className="mt-3 max-w-3xl font-ibm-plex-mono text-sm leading-6 text-secondary">
              {t("ragWorkbench.assistant.header.description")}
            </p>
          </div>
          <div className="border border-neutral-800 bg-main-bg px-4 py-3 font-ibm-plex-mono text-xs text-secondary">
            {t("ragWorkbench.assistant.header.badge")}
          </div>
        </div>
      </header>

      <form
        onSubmit={handleSubmit}
        className="grid gap-0 xl:grid-cols-[0.85fr_1.15fr]"
      >
        <section className="border-b border-neutral-800 p-5 sm:p-8 xl:border-b-0 xl:border-r">
          <div className="flex items-center gap-3">
            <FileSearch className="h-5 w-5 text-green" />
            <h3 className="text-xl font-semibold">
              {t("ragWorkbench.assistant.knowledge.title")}
            </h3>
          </div>

          <label className="mt-5 block">
            <span className="font-ibm-plex-mono text-xs uppercase tracking-[0.14em] text-secondary">
              {t("ragWorkbench.assistant.knowledge.titleLabel")}
            </span>
            <input
              value={knowledgeTitle}
              onChange={(event) => setKnowledgeTitle(event.target.value)}
              className="mt-2 min-h-11 w-full border border-neutral-800 bg-main-bg px-3 font-ibm-plex-mono text-sm outline-none focus:border-green"
            />
          </label>

          <label className="mt-4 block">
            <span className="font-ibm-plex-mono text-xs uppercase tracking-[0.14em] text-secondary">
              {t("ragWorkbench.assistant.knowledge.baseLabel")}
            </span>
            <textarea
              value={knowledgeBase}
              onChange={(event) => setKnowledgeBase(event.target.value)}
              className="mt-2 min-h-[24rem] w-full resize-y border border-neutral-800 bg-main-bg p-3 font-ibm-plex-mono text-sm leading-6 outline-none focus:border-green"
            />
          </label>

          <p className="mt-3 font-ibm-plex-mono text-xs text-secondary">
            {t("ragWorkbench.assistant.knowledge.wordCount", {
              count: wordCount,
            })}
          </p>
        </section>

        <section className="p-5 sm:p-8">
          <div className="flex items-center gap-3">
            <MessageSquareText className="h-5 w-5 text-green" />
            <h3 className="text-xl font-semibold">
              {t("ragWorkbench.assistant.chat.title")}
            </h3>
          </div>

          <label className="mt-5 block">
            <span className="font-ibm-plex-mono text-xs uppercase tracking-[0.14em] text-secondary">
              {t("ragWorkbench.assistant.chat.questionLabel")}
            </span>
            <textarea
              value={question}
              onChange={(event) => setQuestion(event.target.value)}
              className="mt-2 min-h-28 w-full resize-y border border-neutral-800 bg-main-bg p-3 font-ibm-plex-mono text-sm leading-6 outline-none focus:border-green"
            />
          </label>

          <div className="mt-5 grid gap-3 sm:grid-cols-3">
            {toneOptions.map((option) => (
              <button
                key={option.value}
                type="button"
                onClick={() => setTone(option.value)}
                className={`min-h-12 border px-3 font-ibm-plex-mono text-xs uppercase tracking-[0.12em] transition ${
                  tone === option.value
                    ? "border-green bg-green text-black"
                    : "border-neutral-800 bg-main-bg text-secondary hover:border-green hover:text-primary"
                }`}
              >
                {t(option.labelKey)}
              </button>
            ))}
          </div>

          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            {answerModeOptions.map((option) => {
              const isOpenAI = option.value === "openai";
              const Icon = isOpenAI ? Network : Cpu;

              return (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => setAnswerMode(option.value)}
                  className={`flex min-h-20 items-start gap-3 border p-4 text-left transition ${
                    answerMode === option.value
                      ? "border-green bg-green text-black"
                      : "border-neutral-800 bg-main-bg text-secondary hover:border-green hover:text-primary"
                  }`}
                >
                  <Icon className="mt-0.5 h-5 w-5 shrink-0" />
                  <span>
                    <span className="block font-ibm-plex-mono text-xs font-semibold uppercase tracking-[0.12em]">
                      {t(option.labelKey)}
                    </span>
                    <span className="mt-1 block font-ibm-plex-mono text-xs leading-5">
                      {t(option.descriptionKey)}
                    </span>
                  </span>
                </button>
              );
            })}
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="mt-6 inline-flex min-h-12 w-full items-center justify-center gap-2 border border-green/50 bg-green px-5 font-ibm-plex-mono text-xs font-semibold uppercase tracking-[0.12em] text-black transition disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isLoading && <LoaderCircle className="h-4 w-4 animate-spin" />}
            {isLoading
              ? t("ragWorkbench.assistant.chat.loading")
              : t("ragWorkbench.assistant.chat.submit")}
          </button>

          {error && (
            <p className="mt-4 border border-red-500/20 bg-red-500/10 p-4 font-ibm-plex-mono text-sm text-red-300">
              {error}
            </p>
          )}

          <div className="mt-6 min-h-[18rem] border border-neutral-800 bg-main-bg p-5">
            {!data && !isLoading && (
              <div className="flex h-full min-h-[14rem] flex-col items-center justify-center text-center">
                <Bot className="h-9 w-9 text-green" />
                <p className="mt-4 max-w-md font-ibm-plex-mono text-sm leading-6 text-secondary">
                  {t("ragWorkbench.assistant.empty")}
                </p>
              </div>
            )}

            {data && (
              <div>
                <p className="font-ibm-plex-mono text-xs uppercase tracking-[0.14em] text-green">
                  {t("ragWorkbench.assistant.answerLabel")}
                </p>
                <p className="mt-3 whitespace-pre-line font-ibm-plex-mono text-sm leading-7 text-secondary">
                  {data.answer}
                </p>

                <div className="mt-6 grid gap-3 md:grid-cols-3">
                  <AssistantMetric
                    label={t("ragWorkbench.assistant.metrics.chunks")}
                    value={data.metrics.totalChunks}
                  />
                  <AssistantMetric
                    label={t("ragWorkbench.assistant.metrics.retrieved")}
                    value={data.metrics.retrievedChunks}
                  />
                  <AssistantMetric
                    label={t("ragWorkbench.assistant.metrics.latency")}
                    value={`${data.metrics.durationMs}ms`}
                  />
                  <AssistantMetric
                    label={t("ragWorkbench.assistant.metrics.mode")}
                    value={t(
                      `ragWorkbench.assistant.answerModes.${data.answerMode}`,
                    )}
                  />
                  <AssistantMetric
                    label={t("ragWorkbench.assistant.metrics.model")}
                    value={data.metrics.model}
                  />
                </div>
              </div>
            )}
          </div>
        </section>
      </form>

      {data && (
        <section className="grid border-t border-neutral-800 xl:grid-cols-[1fr_1fr_0.8fr]">
          <AssistantPanel title={t("ragWorkbench.assistant.panels.citations")}>
            <div className="grid gap-3">
              {data.citations.map((citation) => (
                <article
                  key={citation.chunkId}
                  className="border border-neutral-800 bg-main-bg p-4"
                >
                  <p className="font-ibm-plex-mono text-xs uppercase text-green">
                    {citation.label}
                  </p>
                  <p className="mt-2 font-ibm-plex-mono text-xs leading-5 text-secondary">
                    {citation.text}
                  </p>
                </article>
              ))}
            </div>
          </AssistantPanel>

          <AssistantPanel title={t("ragWorkbench.assistant.panels.trace")}>
            <div className="grid gap-3">
              {data.trace.map((item) => (
                <article
                  key={item.step}
                  className="border border-neutral-800 bg-main-bg p-4"
                >
                  <p className="font-ibm-plex-mono text-xs uppercase text-green">
                    {item.step}
                  </p>
                  <p className="mt-2 font-ibm-plex-mono text-xs leading-5 text-secondary">
                    {item.detail}
                  </p>
                </article>
              ))}
            </div>
          </AssistantPanel>

          <AssistantPanel title={t("ragWorkbench.assistant.panels.suggestions")}>
            <div className="grid gap-3">
              {data.suggestions.map((suggestion) => (
                <button
                  key={suggestion}
                  type="button"
                  onClick={() => askSuggestion(suggestion)}
                  className="flex min-h-16 items-start gap-3 border border-neutral-800 bg-main-bg p-4 text-left font-ibm-plex-mono text-xs leading-5 text-secondary transition hover:border-green hover:text-primary"
                >
                  <Sparkles className="mt-0.5 h-4 w-4 shrink-0 text-green" />
                  {suggestion}
                </button>
              ))}
            </div>
          </AssistantPanel>
        </section>
      )}
    </section>
  );
};

function AssistantMetric({
  label,
  value,
}: {
  label: string;
  value: string | number;
}) {
  return (
    <div className="border border-neutral-800 bg-secondary-bg p-4">
      <p className="font-ibm-plex-mono text-[11px] uppercase tracking-[0.14em] text-green">
        {label}
      </p>
      <p className="mt-2 text-2xl font-semibold text-primary">{value}</p>
    </div>
  );
}

function AssistantPanel({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <section className="border-b border-neutral-800 p-5 sm:p-8 xl:border-r">
      <h3 className="mb-5 text-xl font-semibold text-primary">{title}</h3>
      {children}
    </section>
  );
}

export default SimpleRagKnowledgeAssistant;
