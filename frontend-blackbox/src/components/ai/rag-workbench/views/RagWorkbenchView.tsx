import { useMemo, useState } from "react";
import type { FormEvent, ReactNode } from "react";
import { Database, FileText, GitBranch, LoaderCircle, Search } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useRagQuery } from "../../../../lib/hooks/ai/useRag";
import type { RagChunk, RagRetrievedChunk } from "../../../../types/ai/rag.types";

const RagWorkbenchView = () => {
  const { t } = useTranslation("exploreMiniAppsAi");
  const sampleDocument = t("ragWorkbench.sampleDocument");
  const [sourceTitle, setSourceTitle] = useState(
    t("ragWorkbench.defaults.sourceTitle"),
  );
  const [sourceText, setSourceText] = useState(sampleDocument);
  const [question, setQuestion] = useState(
    t("ragWorkbench.defaults.question"),
  );
  const [chunkSize, setChunkSize] = useState(70);
  const [overlap, setOverlap] = useState(14);
  const [topK, setTopK] = useState(3);
  const { data, isLoading, error, execute } = useRagQuery();

  const wordCount = useMemo(
    () => sourceText.trim().split(/\s+/).filter(Boolean).length,
    [sourceText],
  );

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    execute({
      sourceTitle,
      sourceText,
      question,
      chunkSize,
      overlap,
      topK,
    });
  }

  return (
    <section className="border border-neutral-800 bg-secondary-bg text-primary">
      <header className="border-b border-neutral-800 px-5 py-7 sm:px-8">
        <p className="font-ibm-plex-mono text-xs uppercase text-green">
          {t("ragWorkbench.header.eyebrow")}
        </p>
        <h2 className="mt-3 text-3xl sm:text-4xl">
          {t("ragWorkbench.header.title")}
        </h2>
        <p className="mt-3 max-w-3xl font-ibm-plex-mono text-sm leading-6 text-secondary">
          {t("ragWorkbench.header.description")}
        </p>
      </header>

      <form onSubmit={handleSubmit} className="grid gap-0 xl:grid-cols-[0.9fr_1.1fr]">
        <section className="border-b border-neutral-800 p-5 sm:p-8 xl:border-b-0 xl:border-r">
          <div className="flex items-center gap-3">
            <FileText className="h-5 w-5 text-green" />
            <h3 className="text-xl font-semibold">
              {t("ragWorkbench.form.sourceSection")}
            </h3>
          </div>

          <label className="mt-5 block">
            <span className="font-ibm-plex-mono text-xs uppercase tracking-[0.14em] text-secondary">
              {t("ragWorkbench.form.titleLabel")}
            </span>
            <input
              value={sourceTitle}
              onChange={(event) => setSourceTitle(event.target.value)}
              className="mt-2 min-h-11 w-full border border-neutral-800 bg-main-bg px-3 font-ibm-plex-mono text-sm outline-none focus:border-green"
            />
          </label>

          <label className="mt-4 block">
            <span className="font-ibm-plex-mono text-xs uppercase tracking-[0.14em] text-secondary">
              {t("ragWorkbench.form.textLabel")}
            </span>
            <textarea
              value={sourceText}
              onChange={(event) => setSourceText(event.target.value)}
              className="mt-2 min-h-[22rem] w-full resize-y border border-neutral-800 bg-main-bg p-3 font-ibm-plex-mono text-sm leading-6 outline-none focus:border-green"
            />
          </label>

          <p className="mt-3 font-ibm-plex-mono text-xs text-secondary">
            {t("ragWorkbench.form.wordCount", { count: wordCount })}
          </p>
        </section>

        <section className="p-5 sm:p-8">
          <div className="flex items-center gap-3">
            <Search className="h-5 w-5 text-green" />
            <h3 className="text-xl font-semibold">
              {t("ragWorkbench.form.retrievalSection")}
            </h3>
          </div>

          <label className="mt-5 block">
            <span className="font-ibm-plex-mono text-xs uppercase tracking-[0.14em] text-secondary">
              {t("ragWorkbench.form.questionLabel")}
            </span>
            <textarea
              value={question}
              onChange={(event) => setQuestion(event.target.value)}
              className="mt-2 min-h-28 w-full resize-y border border-neutral-800 bg-main-bg p-3 font-ibm-plex-mono text-sm leading-6 outline-none focus:border-green"
            />
          </label>

          <div className="mt-5 grid gap-4 md:grid-cols-3">
            <NumberControl
              label={t("ragWorkbench.form.chunkSize")}
              value={chunkSize}
              min={40}
              max={220}
              onChange={setChunkSize}
            />
            <NumberControl
              label={t("ragWorkbench.form.overlap")}
              value={overlap}
              min={0}
              max={80}
              onChange={setOverlap}
            />
            <NumberControl
              label={t("ragWorkbench.form.topK")}
              value={topK}
              min={1}
              max={8}
              onChange={setTopK}
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="mt-6 inline-flex min-h-12 w-full items-center justify-center gap-2 border border-green/50 bg-green px-5 font-ibm-plex-mono text-xs font-semibold uppercase tracking-[0.12em] text-black transition disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isLoading && <LoaderCircle className="h-4 w-4 animate-spin" />}
            {isLoading
              ? t("ragWorkbench.form.loading")
              : t("ragWorkbench.form.submit")}
          </button>

          {error && (
            <p className="mt-4 border border-red-500/20 bg-red-500/10 p-4 font-ibm-plex-mono text-sm text-red-300">
              {error}
            </p>
          )}

          <div className="mt-6 grid gap-3 sm:grid-cols-3">
            <ConceptStat
              label={t("ragWorkbench.concepts.chunking")}
              value={t("ragWorkbench.concepts.chunkingValue")}
            />
            <ConceptStat
              label={t("ragWorkbench.concepts.overlap")}
              value={t("ragWorkbench.concepts.overlapValue")}
            />
            <ConceptStat
              label={t("ragWorkbench.concepts.topK")}
              value={t("ragWorkbench.concepts.topKValue")}
            />
          </div>
        </section>
      </form>

      {data && (
        <section className="border-t border-neutral-800">
          <div className="grid border-b border-neutral-800 md:grid-cols-4">
            <Metric
              label={t("ragWorkbench.metrics.chunks")}
              value={data.metrics.totalChunks}
            />
            <Metric
              label={t("ragWorkbench.metrics.retrieved")}
              value={data.metrics.retrievedChunks}
            />
            <Metric
              label={t("ragWorkbench.metrics.contextTokens")}
              value={data.metrics.contextTokenEstimate}
            />
            <Metric
              label={t("ragWorkbench.metrics.latency")}
              value={`${data.metrics.durationMs}ms`}
            />
          </div>

          <div className="grid gap-0 xl:grid-cols-[0.95fr_1.05fr]">
            <ResultPanel
              title={t("ragWorkbench.results.answer")}
              icon={<GitBranch className="h-5 w-5 text-green" />}
            >
              <p className="font-ibm-plex-mono text-sm leading-7 text-secondary">
                {data.answer}
              </p>
              <div className="mt-5 grid gap-3">
                {data.citations.map((citation) => (
                  <div
                    key={citation.chunkId}
                    className="border border-neutral-800 bg-main-bg p-4"
                  >
                    <p className="font-ibm-plex-mono text-xs uppercase text-green">
                      {citation.label}
                    </p>
                    <p className="mt-2 font-ibm-plex-mono text-xs leading-5 text-secondary">
                      {citation.text}
                    </p>
                  </div>
                ))}
              </div>
            </ResultPanel>

            <ResultPanel
              title={t("ragWorkbench.results.retrieved")}
              icon={<Database className="h-5 w-5 text-green" />}
            >
              <div className="grid gap-3">
                {data.retrievedChunks.map((chunk) => (
                  <RetrievedChunkCard key={chunk.id} chunk={chunk} />
                ))}
              </div>
            </ResultPanel>
          </div>

          <div className="grid gap-0 border-t border-neutral-800 xl:grid-cols-2">
            <ResultPanel title={t("ragWorkbench.results.allChunks")}>
              <div className="grid max-h-[30rem] gap-3 overflow-y-auto pr-2">
                {data.chunks.map((chunk) => (
                  <ChunkCard key={chunk.id} chunk={chunk} />
                ))}
              </div>
            </ResultPanel>

            <ResultPanel title={t("ragWorkbench.results.promptPreview")}>
              <pre className="max-h-[30rem] overflow-auto whitespace-pre-wrap border border-neutral-800 bg-main-bg p-4 font-ibm-plex-mono text-xs leading-5 text-secondary">
                {data.promptPreview}
              </pre>
            </ResultPanel>
          </div>
        </section>
      )}
    </section>
  );
};

function NumberControl({
  label,
  value,
  min,
  max,
  onChange,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  onChange: (value: number) => void;
}) {
  return (
    <label className="block border border-neutral-800 bg-main-bg p-4">
      <span className="font-ibm-plex-mono text-xs uppercase tracking-[0.14em] text-secondary">
        {label}
      </span>
      <input
        type="number"
        min={min}
        max={max}
        value={value}
        onChange={(event) => onChange(Number(event.target.value))}
        className="mt-3 h-10 w-full border border-neutral-800 bg-secondary-bg px-3 font-ibm-plex-mono text-sm outline-none focus:border-green"
      />
    </label>
  );
}

function ConceptStat({ label, value }: { label: string; value: string }) {
  return (
    <div className="border border-neutral-800 bg-main-bg p-4">
      <p className="font-ibm-plex-mono text-[11px] uppercase tracking-[0.14em] text-green">
        {label}
      </p>
      <p className="mt-2 text-sm text-primary">{value}</p>
    </div>
  );
}

function Metric({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="border-b border-neutral-800 p-5 md:border-b-0 md:border-r">
      <p className="font-ibm-plex-mono text-[11px] uppercase tracking-[0.14em] text-green">
        {label}
      </p>
      <p className="mt-2 text-2xl font-semibold text-primary">{value}</p>
    </div>
  );
}

function ResultPanel({
  title,
  icon,
  children,
}: {
  title: string;
  icon?: React.ReactNode;
  children: ReactNode;
}) {
  return (
    <section className="border-b border-neutral-800 p-5 sm:p-8 xl:border-r">
      <div className="mb-5 flex items-center gap-3">
        {icon}
        <h3 className="text-xl font-semibold text-primary">{title}</h3>
      </div>
      {children}
    </section>
  );
}

function RetrievedChunkCard({ chunk }: { chunk: RagRetrievedChunk }) {
  const { t } = useTranslation("exploreMiniAppsAi");

  return (
    <article className="border border-neutral-800 bg-main-bg p-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="font-ibm-plex-mono text-xs uppercase text-green">
          {t("ragWorkbench.results.rank", {
            rank: chunk.rank,
            id: chunk.id,
          })}
        </p>
        <p className="font-ibm-plex-mono text-xs text-secondary">
          {t("ragWorkbench.results.similarity", { value: chunk.similarity })}
        </p>
      </div>
      <p className="mt-3 font-ibm-plex-mono text-xs leading-5 text-secondary">
        {chunk.text}
      </p>
    </article>
  );
}

function ChunkCard({ chunk }: { chunk: RagChunk }) {
  const { t } = useTranslation("exploreMiniAppsAi");

  return (
    <article className="border border-neutral-800 bg-main-bg p-4">
      <p className="font-ibm-plex-mono text-xs uppercase text-green">
        {t("ragWorkbench.results.chunkMeta", {
          id: chunk.id,
          start: chunk.startWord,
          end: chunk.endWord,
          tokens: chunk.tokenEstimate,
        })}
      </p>
      <p className="mt-3 font-ibm-plex-mono text-xs leading-5 text-secondary">
        {chunk.text}
      </p>
    </article>
  );
}

export default RagWorkbenchView;
