import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  AudioLines,
  Braces,
  Check,
  Clipboard,
  Languages,
  MessageCircleQuestion,
  RotateCcw,
  Sparkles,
  Tags,
  TextQuote,
} from "lucide-react";
import { usePipelines } from "../../../../lib/hooks/ai/usePipelines";
import type {
  ClassificationType,
  PipelineResponse,
} from "../../../../services/ai/pipelinesService";

type PipelineId =
  | "question-answering"
  | "summarization"
  | "translation"
  | "classification"
  | "text-generation"
  | "audio-generation";

type PipelineCard = {
  id: PipelineId;
  name: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  shortLabel: string;
};

const pipelineCards: PipelineCard[] = [
  {
    id: "question-answering",
    name: "Question Answering",
    description: "Ask a question against a supplied context.",
    icon: MessageCircleQuestion,
    shortLabel: "Q&A",
  },
  {
    id: "summarization",
    name: "Summarization",
    description: "Turn long text into a compact summary.",
    icon: TextQuote,
    shortLabel: "Summary",
  },
  {
    id: "translation",
    name: "Translation",
    description: "Translate text between language codes.",
    icon: Languages,
    shortLabel: "Translate",
  },
  {
    id: "classification",
    name: "Classification",
    description: "Run sentiment or future text classification tasks.",
    icon: Tags,
    shortLabel: "Classify",
  },
  {
    id: "text-generation",
    name: "Text Generation",
    description: "Generate text from a prompt and decoding options.",
    icon: Sparkles,
    shortLabel: "Generate",
  },
  {
    id: "audio-generation",
    name: "Audio Generation",
    description: "Prepare text-to-speech output through a provider.",
    icon: AudioLines,
    shortLabel: "Audio",
  },
];

function resultText(result: PipelineResponse | null) {
  if (!result) return "";
  if ("answer" in result) return result.answer;
  if ("summary" in result) return result.summary;
  if ("translation" in result) return result.translation;
  if ("label" in result)
    return `${result.label} (${Math.round(result.score * 100)}%)`;
  if ("generatedText" in result) return result.generatedText;
  return result.audioUrl ?? result.message;
}

const PipelinesArchitectureView = () => {
  const [activePipeline, setActivePipeline] =
    useState<PipelineId>("question-answering");
  const [question, setQuestion] = useState("Who created React?");
  const [context, setContext] = useState(
    "React was created by Facebook and Jordan Walke.",
  );
  const [summaryText, setSummaryText] = useState(
    "Pipelines are high-level APIs for common machine learning tasks. They make it easier to run inference for question answering, summarization, translation, classification, generation, and audio workflows.",
  );
  const [translationText, setTranslationText] = useState("Hello world");
  const [sourceLanguage, setSourceLanguage] = useState("en");
  const [targetLanguage, setTargetLanguage] = useState("es");
  const [classificationText, setClassificationText] = useState(
    "I love programming.",
  );
  const [classificationType, setClassificationType] =
    useState<ClassificationType>("sentiment-analysis");
  const [prompt, setPrompt] = useState("Explain what a Transformer model is.");
  const [temperature, setTemperature] = useState(0.7);
  const [maxNewTokens, setMaxNewTokens] = useState(200);
  const [topP, setTopP] = useState(0.95);
  const [audioText, setAudioText] = useState("Welcome to my application.");
  const [copied, setCopied] = useState(false);

  const {
    result,
    loading,
    error,
    clear,
    questionAnswering,
    summarize,
    translate,
    classify,
    generateText,
    generateAudio,
  } = usePipelines();

  const activeCard = useMemo(
    () => pipelineCards.find((card) => card.id === activePipeline),
    [activePipeline],
  );

  function runSelectedPipeline(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setCopied(false);

    if (activePipeline === "question-answering") {
      questionAnswering({ question, context });
      return;
    }

    if (activePipeline === "summarization") {
      summarize({ text: summaryText });
      return;
    }

    if (activePipeline === "translation") {
      translate({ text: translationText, sourceLanguage, targetLanguage });
      return;
    }

    if (activePipeline === "classification") {
      classify({ text: classificationText, classificationType });
      return;
    }

    if (activePipeline === "text-generation") {
      generateText({ prompt, temperature, maxNewTokens, topP });
      return;
    }

    generateAudio({ text: audioText, format: "mp3" });
  }

  async function copyResult() {
    await navigator.clipboard.writeText(resultText(result));
    setCopied(true);
  }

  function clearPanel() {
    clear();
    setCopied(false);
  }

  return (
    <section className="relative w-full min-w-0 max-w-full overflow-hidden border border-neutral-800 bg-secondary-bg text-primary">
      <header className="relative border-b border-neutral-800 px-3 py-5 min-[380px]:px-4 sm:px-7 sm:py-8 lg:px-10">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 font-ibm-plex-mono text-xs uppercase text-green">
              <Braces className="h-4 w-4" />
              Hugging Face pipelines
            </div>
            <h2 className="mt-3 text-[1.65rem] text-primary min-[380px]:text-3xl sm:text-4xl lg:text-5xl">
              Inference workspace
            </h2>
            <p className="mt-3 max-w-xl font-ibm-plex-mono text-sm leading-relaxed text-secondary">
              Select a task, configure its input and inspect the normalized
              provider response without leaving the workspace.
            </p>
          </div>

          <div className="grid grid-cols-3 gap-1.5 min-[380px]:gap-2 sm:flex">
            <HeaderStat label="Tasks" value="06" />
            <HeaderStat label="Input" value="Typed" />
            <HeaderStat label="Output" value="JSON" />
          </div>
        </div>
      </header>

      <div className="relative p-3 min-[380px]:p-4 sm:p-7 lg:p-10">
        <div className="mb-6">
          <p className="mb-3 font-ibm-plex-mono text-xs uppercase text-green">
            Select pipeline
          </p>
          <div
            data-lenis-prevent
            className="-mx-3 flex snap-x snap-mandatory gap-2 overflow-x-auto overscroll-x-contain px-3 pb-2 min-[380px]:-mx-4 min-[380px]:gap-3 min-[380px]:px-4 sm:mx-0 sm:grid sm:grid-cols-2 sm:overflow-visible sm:px-0 md:grid-cols-3 xl:grid-cols-6"
          >
            {pipelineCards.map((card) => (
              <button
                key={card.id}
                type="button"
                onClick={() => {
                  setActivePipeline(card.id);
                  clearPanel();
                }}
                className={`group min-w-[138px] snap-start rounded-xl border p-3 text-left transition duration-300 min-[380px]:min-w-[160px] min-[380px]:rounded-2xl min-[380px]:p-4 sm:min-w-0 ${
                  activePipeline === card.id
                    ? "border-green bg-green text-black shadow-[0_12px_30px_rgba(0,255,136,0.14)]"
                    : "border-neutral-800 bg-main-bg text-secondary hover:-translate-y-0.5 hover:border-green/50 hover:text-primary"
                }`}
              >
                <card.icon
                  className={`h-5 w-5 ${
                    activePipeline === card.id
                      ? "text-black"
                      : "text-green"
                  }`}
                />
                <span className="mt-3 block text-sm font-black min-[380px]:mt-5">
                  {card.shortLabel}
                </span>
                <span
                  className={`mt-1 hidden text-xs leading-5 xl:block ${
                    activePipeline === card.id
                      ? "text-black/70"
                      : "text-secondary"
                  }`}
                >
                  {card.name}
                </span>
              </button>
            ))}
          </div>
        </div>

        <div className="grid min-w-0 gap-6 xl:grid-cols-[minmax(0,1.05fr)_minmax(360px,0.95fr)]">
          <form
            onSubmit={runSelectedPipeline}
            className="min-w-0 border border-neutral-800 bg-secondary-bg p-3 shadow-sm min-[380px]:p-4 sm:p-6 lg:p-7"
          >
            <div className="mb-5 flex items-start gap-3 border-b border-neutral-800 pb-4 min-[380px]:gap-4 sm:mb-6 sm:pb-5">
              {activeCard && (
                <div className="flex h-10 w-10 shrink-0 items-center justify-center border border-neutral-800 bg-main-bg text-green min-[380px]:h-11 min-[380px]:w-11">
                  <activeCard.icon className="h-5 w-5" />
                </div>
              )}
              <div className="min-w-0">
                <p className="font-ibm-plex-mono text-xs uppercase text-green">
                  Active task
                </p>
                <h3 className="mt-1 break-words text-lg leading-6 text-primary min-[380px]:text-xl">
                  {activeCard?.name}
                </h3>
                <p className="mt-1 text-sm leading-6 text-secondary">
                  {activeCard?.description}
                </p>
              </div>
            </div>

            <div className="grid gap-5">
              {activePipeline === "question-answering" && (
                <>
                  <TextInput
                    label="Question"
                    value={question}
                    onChange={setQuestion}
                  />
                  <TextArea
                    label="Context"
                    value={context}
                    onChange={setContext}
                    rows={5}
                  />
                </>
              )}

              {activePipeline === "summarization" && (
                <TextArea
                  label="Text"
                  value={summaryText}
                  onChange={setSummaryText}
                  rows={7}
                />
              )}

              {activePipeline === "translation" && (
                <>
                  <TextArea
                    label="Text"
                    value={translationText}
                    onChange={setTranslationText}
                    rows={4}
                  />
                  <div className="grid gap-3 sm:grid-cols-2">
                    <TextInput
                      label="Source language"
                      value={sourceLanguage}
                      onChange={setSourceLanguage}
                    />
                    <TextInput
                      label="Target language"
                      value={targetLanguage}
                      onChange={setTargetLanguage}
                    />
                  </div>
                </>
              )}

              {activePipeline === "classification" && (
                <>
                  <TextArea
                    label="Text"
                    value={classificationText}
                    onChange={setClassificationText}
                    rows={4}
                  />
                  <label className="grid gap-2 text-sm font-semibold text-primary">
                    Classification type
                    <select
                      value={classificationType}
                      onChange={(event) =>
                        setClassificationType(
                          event.target.value as ClassificationType,
                        )
                      }
                      className="min-h-12 border border-neutral-800 bg-main-bg px-4 py-3 font-ibm-plex-mono text-sm font-normal text-primary outline-none transition focus:border-green"
                    >
                      <option value="sentiment-analysis">
                        sentiment-analysis
                      </option>
                      <option value="zero-shot-classification">
                        zero-shot-classification
                      </option>
                      <option value="text-classification">
                        text-classification
                      </option>
                    </select>
                  </label>
                </>
              )}

              {activePipeline === "text-generation" && (
                <>
                  <TextArea
                    label="Prompt"
                    value={prompt}
                    onChange={setPrompt}
                    rows={5}
                  />
                  <div className="grid gap-3 sm:grid-cols-3">
                    <NumberInput
                      label="Temperature"
                      value={temperature}
                      onChange={setTemperature}
                      step={0.1}
                    />
                    <NumberInput
                      label="Max new tokens"
                      value={maxNewTokens}
                      onChange={setMaxNewTokens}
                    />
                    <NumberInput
                      label="Top P"
                      value={topP}
                      onChange={setTopP}
                      step={0.05}
                    />
                  </div>
                </>
              )}

              {activePipeline === "audio-generation" && (
                <TextArea
                  label="Text"
                  value={audioText}
                  onChange={setAudioText}
                  rows={5}
                />
              )}

              {error && (
                <p className="border border-red-400/20 bg-red-400/10 p-3 text-sm text-red-300">
                  {error}
                </p>
              )}
            </div>

            <div className="mt-6 grid grid-cols-1 gap-2.5 border-t border-neutral-800 pt-4 min-[380px]:gap-3 sm:flex sm:flex-row sm:justify-end sm:pt-5">
              <button
                type="button"
                onClick={clearPanel}
                className="inline-flex min-h-11 items-center justify-center gap-2 border border-neutral-800 bg-main-bg px-4 font-ibm-plex-mono text-xs font-semibold text-secondary transition hover:border-green/50 hover:text-primary min-[380px]:min-h-12 min-[380px]:px-5"
              >
                <RotateCcw className="h-4 w-4" />
                Clear
              </button>
              <button
                type="submit"
                disabled={loading}
                className="inline-flex min-h-11 items-center justify-center gap-2 bg-green px-4 font-ibm-plex-mono text-xs font-semibold text-black shadow-[0_10px_24px_rgba(0,255,136,0.12)] transition hover:-translate-y-0.5 hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:translate-y-0 min-[380px]:min-h-12 min-[380px]:px-6"
              >
                {loading ? "Running pipeline..." : "Run pipeline"}
                {!loading && <ArrowRight className="h-4 w-4" />}
              </button>
            </div>
          </form>

          <ResultPanel result={result} copied={copied} onCopy={copyResult} />
        </div>
      </div>
    </section>
  );
};

function ResultPanel({
  result,
  copied,
  onCopy,
}: {
  result: PipelineResponse | null;
  copied: boolean;
  onCopy: () => void;
}) {
  return (
    <div className="min-w-0 border border-neutral-800 bg-main-bg p-3 text-primary shadow-[0_24px_60px_rgba(0,0,0,0.18)] min-[380px]:p-4 sm:p-6 xl:sticky xl:top-6 xl:self-start">
      {!result ? (
        <div className="flex min-h-56 flex-col items-center justify-center border border-dashed border-neutral-800 px-4 text-center min-[380px]:min-h-64 min-[380px]:px-6 sm:min-h-[420px] xl:min-h-[520px]">
          <div className="flex h-14 w-14 items-center justify-center border border-neutral-800 bg-secondary-bg text-green">
            <Braces className="h-6 w-6" />
          </div>
          <p className="mt-5 max-w-xs text-sm font-semibold leading-6 text-primary">
            Your pipeline output will appear here.
          </p>
          <p className="mt-2 max-w-xs text-xs leading-5 text-secondary">
            Run any task to inspect its response, metadata and raw JSON.
          </p>
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-4"
        >
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="font-ibm-plex-mono text-xs uppercase text-green">
                Pipeline result
              </p>
              <p className="mt-1 text-sm text-secondary">
                Normalized provider response
              </p>
            </div>
            <button
              type="button"
              onClick={onCopy}
              className="inline-flex items-center gap-2 border border-neutral-800 bg-secondary-bg px-4 py-2 font-ibm-plex-mono text-xs font-semibold text-primary transition hover:border-green/50"
            >
              {copied ? (
                <Check className="h-3.5 w-3.5" />
              ) : (
                <Clipboard className="h-3.5 w-3.5" />
              )}
              {copied ? "Copied" : "Copy"}
            </button>
          </div>

          <div
            data-lenis-prevent
            className="max-h-64 overflow-y-auto overscroll-contain border border-neutral-800 bg-secondary-bg p-4 sm:max-h-80"
          >
            <p className="whitespace-pre-wrap text-sm leading-6 text-primary">
              {resultText(result)}
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-3">
            <Metric label="Provider" value={result.meta.provider} />
            <Metric label="Model" value={result.meta.model} />
            <Metric label="Duration" value={`${result.meta.durationMs}ms`} />
          </div>

          <pre
            data-lenis-prevent
            className="max-h-64 overflow-auto overscroll-contain border border-neutral-800 bg-secondary-bg p-4 text-xs leading-5 text-secondary sm:max-h-80"
          >
            {JSON.stringify(result, null, 2)}
          </pre>
        </motion.div>
      )}
    </div>
  );
}

function TextInput({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <label className="grid min-w-0 gap-2 text-sm font-semibold text-primary">
      {label}
      <input
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="min-h-12 min-w-0 border border-neutral-800 bg-main-bg px-4 py-3 font-ibm-plex-mono text-sm font-normal text-primary outline-none transition focus:border-green"
      />
    </label>
  );
}

function TextArea({
  label,
  value,
  onChange,
  rows,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  rows: number;
}) {
  return (
    <label className="grid min-w-0 gap-2 text-sm font-semibold text-primary">
      {label}
      <textarea
        value={value}
        rows={rows}
        onChange={(event) => onChange(event.target.value)}
        className="min-w-0 resize-y border border-neutral-800 bg-main-bg px-4 py-3 font-ibm-plex-mono text-sm font-normal leading-6 text-primary outline-none transition focus:border-green"
      />
    </label>
  );
}

function NumberInput({
  label,
  value,
  onChange,
  step = 1,
}: {
  label: string;
  value: number;
  onChange: (value: number) => void;
  step?: number;
}) {
  return (
    <label className="grid min-w-0 gap-2 text-sm font-semibold text-primary">
      {label}
      <input
        type="number"
        value={value}
        step={step}
        onChange={(event) => onChange(Number(event.target.value))}
        className="min-h-12 min-w-0 border border-neutral-800 bg-main-bg px-4 py-3 font-ibm-plex-mono text-sm font-normal text-primary outline-none transition focus:border-green"
      />
    </label>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="min-w-0 border border-neutral-800 bg-secondary-bg p-2.5 min-[380px]:p-3">
      <p className="font-ibm-plex-mono text-xs uppercase text-secondary">
        {label}
      </p>
      <p className="mt-2 truncate font-ibm-plex-mono text-sm font-semibold text-primary">{value}</p>
    </div>
  );
}

function HeaderStat({ label, value }: { label: string; value: string }) {
  return (
    <div className="min-w-0 border border-neutral-800 bg-main-bg px-1.5 py-2.5 text-center min-[380px]:px-3 min-[380px]:py-3 sm:min-w-24 sm:px-4">
      <p className="truncate font-ibm-plex-mono text-[10px] uppercase text-secondary">
        {label}
      </p>
      <p className="mt-1 truncate font-ibm-plex-mono text-sm font-semibold text-primary">{value}</p>
    </div>
  );
}

export default PipelinesArchitectureView;
