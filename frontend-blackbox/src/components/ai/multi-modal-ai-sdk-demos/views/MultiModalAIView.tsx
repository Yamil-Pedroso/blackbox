import { useMemo, useState } from "react";
import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { apiClient } from "../../../../api/apiClient";

const apiBaseUrl =
  import.meta.env.VITE_API_URL ?? "http://localhost:3010/api/v1";

type StructuredBrief = {
  title: string;
  summary: string;
  audience: string;
  keyPoints: string[];
  nextExperiment: string;
};

type StructuredBriefResponse = {
  brief: StructuredBrief;
  metrics: {
    model: string;
    inputTokens: number | undefined;
    outputTokens: number | undefined;
    totalTokens: number | undefined;
  };
};

type SpeechResponse = {
  audio: string;
  mediaType: string;
  format: string;
  metrics: {
    model: string;
    voice: string;
  };
};

const cardBase = "border border-neutral-800 bg-secondary-bg";

const fieldBase =
  "border border-neutral-800 bg-main-bg px-4 py-3 font-ibm-plex-mono text-sm text-primary outline-none placeholder:text-secondary/50 focus:border-green";

const buttonBase =
  "min-h-11 border border-green/50 px-5 font-ibm-plex-mono text-xs font-semibold transition-opacity disabled:cursor-not-allowed disabled:opacity-50";

const MultiModalAIView = () => {
  const { t } = useTranslation("exploreMiniAppsAi");

  return (
    <section className="relative overflow-hidden border border-neutral-800 bg-secondary-bg px-5 py-8 text-primary md:px-10">
      <h1 className="relative text-center text-4xl text-primary md:text-6xl">
        <span className="block">{t("multiModalAi.titleTop")}</span>
        <span className="block text-secondary">
          {t("multiModalAi.titleBottom")}
        </span>
      </h1>

      <div className="relative mt-12 grid min-w-0 grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
        <StreamingTutorExample />
        <StructuredBriefExample />
        <ToolCallingExample />
        <SpeechExample />
      </div>
    </section>
  );
};

function StreamingTutorExample() {
  const { t } = useTranslation("exploreMiniAppsAi");
  const [input, setInput] = useState(
    t("multiModalAi.streaming.defaultInput"),
  );

  const transport = useMemo(
    () =>
      new DefaultChatTransport({
        api: `${apiBaseUrl}/ai-sdk/chat`,
      }),
    [],
  );

  const { messages, sendMessage, status, error, stop } = useChat({ transport });
  const busy = status === "submitted" || status === "streaming";

  function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!input.trim() || busy) return;
    sendMessage({ text: input });
    setInput("");
  }

  return (
    <ExamplePanel
      accent="cyan"
      title={t("multiModalAi.streaming.title")}
      description={t("multiModalAi.streaming.description")}
    >
      <div className="flex h-full flex-col">
        <ChatTranscript
          messages={messages}
          empty={t("multiModalAi.streaming.empty")}
        />

        {error && <ErrorText message={error.message} />}

        <form
          onSubmit={handleSubmit}
          className="mt-4 flex flex-1 flex-col gap-3"
        >
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            rows={3}
            className={`${fieldBase} resize-none`}
          />

          <div className="mt-auto flex flex-col gap-2 pt-4 sm:flex-row">
            <button
              type="submit"
              disabled={busy}
              className={`${buttonBase} flex-1 bg-green text-black hover:opacity-90`}
            >
              {busy
                ? t("multiModalAi.streaming.loading")
                : t("multiModalAi.streaming.send")}
            </button>

            {busy && (
              <button
                type="button"
                onClick={stop}
                className={`${buttonBase} border-neutral-800 bg-main-bg text-secondary hover:text-primary`}
              >
                {t("multiModalAi.streaming.stop")}
              </button>
            )}
          </div>
        </form>
      </div>
    </ExamplePanel>
  );
}

function StructuredBriefExample() {
  const { t } = useTranslation("exploreMiniAppsAi");
  const [topic, setTopic] = useState(t("multiModalAi.structured.defaultTopic"));
  const [data, setData] = useState<StructuredBriefResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!topic.trim()) return;

    setLoading(true);
    setError(null);

    try {
      const response = await apiClient.post<StructuredBriefResponse>(
        "/ai-sdk/structured-brief",
        { topic },
      );
      setData(response.data);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : t("multiModalAi.structured.fallbackError"),
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <ExamplePanel
      accent="amber"
      title={t("multiModalAi.structured.title")}
      description={t("multiModalAi.structured.description")}
    >
      <form onSubmit={handleSubmit} className="flex h-full flex-col gap-3">
        <input
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          className={fieldBase}
        />

        {error && <ErrorText message={error} />}

        {data && (
          <div
            data-lenis-prevent
            className="mt-1 max-h-72 overflow-y-auto overflow-x-hidden overscroll-contain border border-neutral-800 bg-main-bg p-5 shadow-inner sm:max-h-80 xl:max-h-60"
          >
            <p className="font-ibm-plex-mono text-xs uppercase text-green">
              {data.brief.audience}
            </p>

            <h3 className="mt-2 text-lg leading-7 text-primary sm:text-xl">
              {data.brief.title}
            </h3>

            <p className="mt-3 text-sm leading-6 text-secondary">
              {data.brief.summary}
            </p>

            <ul className="mt-4 space-y-2 text-sm text-secondary">
              {data.brief.keyPoints.map((point) => (
                <li
                  key={point}
                  className="border border-neutral-800 bg-secondary-bg px-3 py-2"
                >
                  {point}
                </li>
              ))}
            </ul>

            <p className="mt-4 text-sm font-semibold text-green">
              {t("multiModalAi.structured.next", {
                value: data.brief.nextExperiment,
              })}
            </p>

            <p className="mt-4 break-words text-xs text-secondary">
              {t("multiModalAi.structured.tokens", {
                model: data.metrics.model,
                tokens:
                  data.metrics.totalTokens ??
                  t("multiModalAi.structured.notAvailable"),
              })}
            </p>
          </div>
        )}

        <button
          disabled={loading}
          className={`${buttonBase} mt-auto bg-green text-black hover:opacity-90`}
        >
          {loading
            ? t("multiModalAi.structured.loading")
            : t("multiModalAi.structured.button")}
        </button>
      </form>
    </ExamplePanel>
  );
}

function ToolCallingExample() {
  const { t } = useTranslation("exploreMiniAppsAi");
  const [input, setInput] = useState(
    t("multiModalAi.tools.defaultInput"),
  );

  const transport = useMemo(
    () =>
      new DefaultChatTransport({
        api: `${apiBaseUrl}/ai-sdk/tool-chat`,
      }),
    [],
  );

  const { messages, sendMessage, status, error } = useChat({ transport });
  const busy = status === "submitted" || status === "streaming";

  function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!input.trim() || busy) return;
    sendMessage({ text: input });
    setInput("");
  }

  return (
    <ExamplePanel
      accent="fuchsia"
      title={t("multiModalAi.tools.title")}
      description={t("multiModalAi.tools.description")}
    >
      <div className="flex h-full flex-col">
        <ChatTranscript
          messages={messages}
          empty={t("multiModalAi.tools.empty")}
        />

        {error && <ErrorText message={error.message} />}

        <form
          onSubmit={handleSubmit}
          className="mt-4 flex flex-1 flex-col gap-3"
        >
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            rows={3}
            className={`${fieldBase} resize-none`}
          />

          <button
            disabled={busy}
            className={`${buttonBase} mt-auto bg-green text-black hover:opacity-90`}
          >
            {busy
              ? t("multiModalAi.tools.loading")
              : t("multiModalAi.tools.button")}
          </button>
        </form>
      </div>
    </ExamplePanel>
  );
}

function SpeechExample() {
  const { t } = useTranslation("exploreMiniAppsAi");
  const [text, setText] = useState(
    t("multiModalAi.speech.defaultText"),
  );
  const [voice, setVoice] = useState("alloy");
  const [instructions, setInstructions] = useState(
    t("multiModalAi.speech.defaultInstructions"),
  );
  const [data, setData] = useState<SpeechResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!text.trim()) return;

    setLoading(true);
    setError(null);
    setData(null);

    try {
      const response = await apiClient.post<SpeechResponse>("/ai-sdk/speech", {
        text,
        voice,
        instructions,
      });
      setData(response.data);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : t("multiModalAi.speech.fallbackError"),
      );
    } finally {
      setLoading(false);
    }
  }

  const audioSrc = data
    ? `data:${data.mediaType};base64,${data.audio}`
    : undefined;

  return (
    <ExamplePanel
      accent="emerald"
      title={t("multiModalAi.speech.title")}
      description={t("multiModalAi.speech.description")}
    >
      <form onSubmit={handleSubmit} className="flex h-full flex-col gap-3">
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          rows={4}
          className={`${fieldBase} resize-none`}
        />

        <select
          value={voice}
          onChange={(e) => setVoice(e.target.value)}
          className={fieldBase}
        >
          <option value="alloy">Alloy</option>
          <option value="ash">Ash</option>
          <option value="ballad">Ballad</option>
          <option value="coral">Coral</option>
          <option value="echo">Echo</option>
          <option value="sage">Sage</option>
          <option value="shimmer">Shimmer</option>
          <option value="verse">Verse</option>
        </select>

        <input
          value={instructions}
          onChange={(e) => setInstructions(e.target.value)}
          className={fieldBase}
        />

        {error && <ErrorText message={error} />}

        {audioSrc && data && (
          <div
            data-lenis-prevent
            className="mt-1 max-h-72 min-w-0 overflow-y-auto overflow-x-hidden overscroll-contain border border-neutral-800 bg-main-bg p-4 shadow-inner"
          >
            <audio controls src={audioSrc} className="w-full" />

            <p className="mt-3 break-words text-xs text-secondary">
              {data.metrics.model} · {data.metrics.voice} · {data.format}
            </p>
          </div>
        )}

        <button
          disabled={loading}
          className={`${buttonBase} mt-auto bg-green text-black hover:opacity-90`}
        >
          {loading
            ? t("multiModalAi.speech.loading")
            : t("multiModalAi.speech.button")}
        </button>
      </form>
    </ExamplePanel>
  );
}

function ChatTranscript({
  messages,
  empty,
}: {
  messages: ReturnType<typeof useChat>["messages"];
  empty: string;
}) {
  return (
    <div
      data-lenis-prevent
      className="
      h-[180px]
      overflow-y-auto
      overscroll-contain
      border border-neutral-800
      bg-main-bg
      p-4
      shadow-inner
    "
    >
      {messages.length === 0 ? (
        <p className="text-sm text-secondary">{empty}</p>
      ) : (
        <div className="space-y-4">
          {messages.map((message) => (
            <div key={message.id}>
              <p className="font-ibm-plex-mono text-xs uppercase text-green">
                {message.role}
              </p>

              <div className="mt-1 space-y-2 break-words text-sm leading-6 text-secondary">
                {message.parts.map((part, index) => {
                  if (part.type === "text") {
                    return <p key={index}>{part.text}</p>;
                  }

                  return (
                    <pre
                      key={index}
                      className="
                        overflow-x-auto
                        whitespace-pre-wrap
                        border border-neutral-800
                        bg-secondary-bg
                        p-3
                        text-xs
                        text-secondary
                      "
                    >
                      {JSON.stringify(part, null, 2)}
                    </pre>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
function ExamplePanel({
  accent,
  title,
  description,
  children,
}: {
  accent: "cyan" | "amber" | "fuchsia" | "emerald";

  title: string;
  description: string;
  children: React.ReactNode;
}) {
  const styles = {
    cyan: {
      badge: "border border-neutral-800 bg-main-bg text-green",
      glow: "from-green/10 via-transparent to-transparent",
    },
    amber: {
      badge: "border border-neutral-800 bg-main-bg text-green",
      glow: "from-green/10 via-transparent to-transparent",
    },
    fuchsia: {
      badge: "border border-neutral-800 bg-main-bg text-green",
      glow: "from-green/10 via-transparent to-transparent",
    },
    emerald: {
      badge: "border border-neutral-800 bg-main-bg text-green",
      glow: "from-green/10 via-transparent to-transparent",
    },
  }[accent];

  return (
    <motion.article
      initial={{ opacity: 0, y: 22 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55 }}
      whileHover={{ y: -6 }}
      className={`${cardBase} relative flex h-full min-h-[550px] min-w-0 flex-col overflow-hidden p-5 sm:p-6 xl:p-5`}
    >
      <div
        className={`pointer-events-none absolute inset-x-0 top-0 h-40 bg-gradient-to-b ${styles.glow}`}
      />

      <div className="relative flex h-full flex-col">
        <h2 className="mt-4 text-2xl leading-8 text-primary">
          {title}
        </h2>

        <p className="mt-2 font-ibm-plex-mono text-sm leading-6 text-secondary">
          {description}
        </p>

        <div className="mt-5 flex flex-1 flex-col min-w-0">{children}</div>
      </div>
    </motion.article>
  );
}
function ErrorText({ message }: { message: string }) {
  return (
    <p className="mt-3 border border-red-400/20 bg-red-400/10 p-3 text-sm text-red-300">
      {message}
    </p>
  );
}

export default MultiModalAIView;
