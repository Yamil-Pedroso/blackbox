import { useState } from "react";
import { motion } from "framer-motion";
import { useTokenInferenceStream } from "../../../../../lib/hooks/ai/useTokenInference";
import type { TokenInferenceSettings } from "../../../../../types/ai/tokenInference.types";
import { GenerationControls } from "./GenerationControls";
import { TokenChips } from "./TokenChips";

const initialSettings: TokenInferenceSettings = {
  maxNewTokens: 80,
  temperature: 0.7,
  topP: 0.95,
};

export function StreamingGenerationPanel() {
  const [prompt, setPrompt] = useState("Explain React");
  const [settings, setSettings] =
    useState<TokenInferenceSettings>(initialSettings);
  const { tokens, fullText, metadata, isStreaming, error, start, stop, clear } =
    useTokenInferenceStream();

  function handleStart(event: React.SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    start({ prompt, ...settings });
  }

  async function copyResult() {
    if (fullText) {
      await navigator.clipboard.writeText(fullText);
    }
  }

  return (
    <div className="grid gap-6">
      <form onSubmit={handleStart} className="grid gap-4">
        <label className="grid gap-2 text-sm font-semibold text-primary">
          Streaming prompt
          <textarea
            value={prompt}
            onChange={(event) => setPrompt(event.target.value)}
            rows={4}
            className="border border-neutral-800 bg-main-bg px-4 py-3 font-ibm-plex-mono text-sm font-normal text-primary outline-none focus:border-green"
          />
        </label>
        <GenerationControls settings={settings} onChange={setSettings} />
        {error && (
          <p className="border border-red-400/20 bg-red-400/10 p-3 text-sm text-red-300">
            {error}
          </p>
        )}
        <div className="flex flex-wrap gap-3">
          <button
            type="submit"
            disabled={isStreaming}
            className="min-h-11 bg-green px-5 font-ibm-plex-mono text-xs font-semibold text-black transition hover:opacity-90 disabled:opacity-50"
          >
            {isStreaming ? "Streaming..." : "Start stream"}
          </button>
          <button
            type="button"
            onClick={stop}
            disabled={!isStreaming}
            className="min-h-11 border border-red-400/20 bg-red-400/10 px-5 font-ibm-plex-mono text-xs font-semibold text-red-300 disabled:opacity-40"
          >
            Stop
          </button>
        </div>
      </form>

      <div className="min-h-96 border border-neutral-800 bg-main-bg p-5 text-primary sm:p-6">
        <div className="flex flex-wrap justify-between gap-3 border-b border-neutral-800 pb-4">
          <div>
            <p className="font-ibm-plex-mono text-xs uppercase text-green">
              Live token stream
            </p>
            <p className="mt-1 font-ibm-plex-mono text-xs text-secondary">
              {isStreaming
                ? "Receiving SSE token events..."
                : metadata
                  ? `${metadata.provider} · ${metadata.model}`
                  : "Ready to stream"}
            </p>
          </div>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => void copyResult()}
              disabled={!fullText}
              className="border border-neutral-800 bg-secondary-bg px-3 py-1.5 font-ibm-plex-mono text-xs font-semibold text-primary transition hover:border-green/50 disabled:opacity-40"
            >
              Copy
            </button>
            <button
              type="button"
              onClick={clear}
              className="border border-neutral-800 bg-secondary-bg px-3 py-1.5 font-ibm-plex-mono text-xs font-semibold text-primary transition hover:border-green/50"
            >
              Clear
            </button>
          </div>
        </div>

        {!fullText && !isStreaming ? (
          <div className="flex min-h-72 items-center justify-center text-center text-sm text-secondary">
            Tokens will appear one by one as SSE events arrive.
          </div>
        ) : (
          <>
            <motion.p
              layout
              className="mt-5 min-h-24 text-base leading-8 text-primary"
            >
              {fullText}
              {isStreaming && (
                <span className="ml-1 inline-block h-5 w-2 animate-pulse bg-green align-middle" />
              )}
            </motion.p>
            <div className="mt-5">
              <TokenChips
                tokens={tokens}
                activeIndex={isStreaming ? tokens.length - 1 : undefined}
              />
            </div>
            <p className="mt-5 font-ibm-plex-mono text-xs text-secondary">
              {tokens.length} token events received
            </p>
          </>
        )}
      </div>
    </div>
  );
}
