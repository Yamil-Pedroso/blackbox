import { useState } from "react";
import { useGenerateTokenInference } from "../../../../../lib/hooks/ai/useTokenInference";
import type { TokenInferenceSettings } from "../../../../../types/ai/tokenInference.types";
import { GenerationControls } from "./GenerationControls";
import { TokenChips } from "./TokenChips";

const initialSettings: TokenInferenceSettings = {
  maxNewTokens: 80,
  temperature: 0.7,
  topP: 0.95,
};

export function NormalGenerationPanel() {
  const [prompt, setPrompt] = useState("Explain what React is");
  const [settings, setSettings] =
    useState<TokenInferenceSettings>(initialSettings);
  const { data, isLoading, error, execute, clear } =
    useGenerateTokenInference();

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    void execute({ prompt, ...settings });
  }

  async function copyResult() {
    if (data?.generatedText) {
      await navigator.clipboard.writeText(data.generatedText);
    }
  }

  return (
    <div className="grid gap-6">
      <form onSubmit={handleSubmit} className="grid gap-4">
        <label className="grid gap-2 text-sm font-semibold text-primary">
          Prompt
          <textarea
            value={prompt}
            onChange={(event) => setPrompt(event.target.value)}
            rows={5}
            className="border border-neutral-800 bg-main-bg px-4 py-3 font-ibm-plex-mono text-sm font-normal text-primary outline-none focus:border-green"
          />
        </label>
        <GenerationControls settings={settings} onChange={setSettings} />
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
          {isLoading ? "Generating..." : "Generate normally"}
        </button>
      </form>

      <div className="min-h-80 border border-neutral-800 bg-main-bg p-5 text-primary sm:p-6">
        {!data ? (
          <div className="flex min-h-72 items-center justify-center text-center text-sm text-secondary">
            The complete response and its approximate tokens will appear here.
          </div>
        ) : (
          <>
            <div className="flex flex-wrap justify-between gap-3 border-b border-neutral-800 pb-4">
              <div>
                <p className="font-ibm-plex-mono text-xs uppercase text-green">
                  Generated response
                </p>
                <p className="mt-1 font-ibm-plex-mono text-xs text-secondary">
                  {data.provider} · {data.model} · {data.tokenCount} tokens
                </p>
              </div>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => void copyResult()}
                  className="border border-neutral-800 bg-secondary-bg px-3 py-1.5 font-ibm-plex-mono text-xs font-semibold text-primary transition hover:border-green/50"
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
            <p className="mt-5 text-sm leading-7 text-primary">
              {data.generatedText}
            </p>
            <div className="mt-5">
              <TokenChips tokens={data.tokens} />
            </div>
          </>
        )}
      </div>
    </div>
  );
}
