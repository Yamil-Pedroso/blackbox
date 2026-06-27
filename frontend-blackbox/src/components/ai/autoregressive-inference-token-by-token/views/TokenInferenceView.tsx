import { useState } from "react";
import { NormalGenerationPanel } from "./view-comps/NormalGenerationPanel";
import { StreamingGenerationPanel } from "./view-comps/StreamingGenerationPanel";
import { TokenizationPreviewPanel } from "./view-comps/TokenizationPreviewPanel";

type InferenceView = "tokenize" | "generate" | "stream";

const views: Array<{
  id: InferenceView;
  label: string;
  description: string;
}> = [
  {
    id: "tokenize",
    label: "Tokenization Preview",
    description: "Inspect approximate token boundaries.",
  },
  {
    id: "generate",
    label: "Normal Generation",
    description: "Receive one complete model response.",
  },
  {
    id: "stream",
    label: "Streaming Generation",
    description: "Watch SSE tokens arrive one by one.",
  },
];

const TokenInferenceView = () => {
  const [activeView, setActiveView] = useState<InferenceView>("tokenize");

  return (
    <section className="overflow-hidden border border-neutral-800 bg-secondary-bg text-primary">
      <header className="border-b border-neutral-800 px-5 py-7 sm:px-8">
        <p className="font-ibm-plex-mono text-xs uppercase text-green">
          Autoregressive inference
        </p>
        <h2 className="mt-3 text-3xl sm:text-4xl">
          Token-by-Token Lab
        </h2>
        <p className="mt-3 max-w-3xl font-ibm-plex-mono text-sm leading-6 text-secondary">
          See how text is split into units, compare a complete response with an
          SSE stream, and observe generation unfold one token at a time.
        </p>
      </header>

      <div
        className="grid border-b border-neutral-800 md:grid-cols-3"
        role="tablist"
        aria-label="Token inference views"
      >
        {views.map((view) => (
          <button
            key={view.id}
            type="button"
            role="tab"
            aria-selected={activeView === view.id}
            onClick={() => setActiveView(view.id)}
            className={`min-h-24 border-b border-neutral-800 px-5 py-4 text-left transition md:border-b-0 md:border-r md:border-neutral-800 ${
              activeView === view.id
                ? "bg-green text-black"
                : "bg-main-bg text-primary hover:bg-secondary-bg"
            }`}
          >
            <span className="block text-sm font-semibold">{view.label}</span>
            <span
              className={`mt-1 block font-ibm-plex-mono text-xs leading-5 ${
                activeView === view.id ? "text-black/70" : "text-secondary"
              }`}
            >
              {view.description}
            </span>
          </button>
        ))}
      </div>

      <div className="p-5 sm:p-8" role="tabpanel">
        {activeView === "tokenize" && <TokenizationPreviewPanel />}
        {activeView === "generate" && <NormalGenerationPanel />}
        {activeView === "stream" && <StreamingGenerationPanel />}
      </div>

      <aside className="border-t border-neutral-800 bg-main-bg p-5 sm:p-8">
        <p className="font-ibm-plex-mono text-xs uppercase text-green">
          What the animation means
        </p>
        <p className="mt-2 max-w-4xl text-sm leading-6 text-secondary">
          The local provider generates the complete educational answer first,
          then the SSE endpoint simulates provider streaming by emitting its
          approximate tokens with a short delay. A real provider adapter can
          later forward native token deltas from Hugging Face, OpenAI, Ollama,
          or Transformers.js through the same frontend contract.
        </p>
      </aside>
    </section>
  );
};

export default TokenInferenceView;
