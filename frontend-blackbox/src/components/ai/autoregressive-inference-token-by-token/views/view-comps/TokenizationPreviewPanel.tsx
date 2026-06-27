import { useState } from "react";
import { useTokenizeText } from "../../../../../lib/hooks/ai/useTokenInference";
import { TokenChips } from "./TokenChips";

export function TokenizationPreviewPanel() {
  const [text, setText] = useState(
    "React is a JavaScript library for building user interfaces.",
  );
  const { data, isLoading, error, execute, clear } = useTokenizeText();

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    void execute({ text });
  }

  function handleClear() {
    setText("");
    clear();
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[0.75fr_1.25fr]">
      <form onSubmit={handleSubmit}>
        <label className="grid gap-2 text-sm font-semibold text-primary">
          Text to tokenize
          <textarea
            value={text}
            onChange={(event) => setText(event.target.value)}
            rows={8}
            className="border border-neutral-800 bg-main-bg px-4 py-3 font-ibm-plex-mono text-sm font-normal leading-6 text-primary outline-none focus:border-green"
          />
        </label>
        {error && (
          <p className="mt-4 border border-red-400/20 bg-red-400/10 p-3 text-sm text-red-300">
            {error}
          </p>
        )}
        <div className="mt-5 flex gap-3">
          <button
            type="submit"
            disabled={isLoading}
            className="min-h-11 bg-green px-5 font-ibm-plex-mono text-xs font-semibold text-black transition hover:opacity-90 disabled:opacity-50"
          >
            {isLoading ? "Tokenizing..." : "Preview tokens"}
          </button>
          <button
            type="button"
            onClick={handleClear}
            className="min-h-11 border border-neutral-800 bg-main-bg px-5 font-ibm-plex-mono text-xs font-semibold text-secondary transition hover:border-green/50 hover:text-primary"
          >
            Clear
          </button>
        </div>
      </form>

      <div className="min-h-80 border border-neutral-800 bg-main-bg p-5 text-primary sm:p-6">
        {!data ? (
          <div className="flex h-full min-h-72 items-center justify-center text-center text-sm text-secondary">
            Token chips will appear here with leading spaces shown as dots.
          </div>
        ) : (
          <>
            <div className="flex items-end justify-between border-b border-neutral-800 pb-4">
              <div>
                <p className="font-ibm-plex-mono text-xs uppercase text-green">
                  approximateTokenize
                </p>
                <p className="mt-1 text-sm text-secondary">
                  Educational tokenizer preview
                </p>
              </div>
              <strong className="text-4xl font-semibold">{data.tokenCount}</strong>
            </div>
            <div className="mt-5">
              <TokenChips tokens={data.tokens} />
            </div>
          </>
        )}
      </div>
    </div>
  );
}
