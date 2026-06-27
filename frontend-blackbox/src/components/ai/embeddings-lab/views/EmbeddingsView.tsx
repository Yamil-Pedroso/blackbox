import { useState } from "react";
import { CompareEmbeddingsPanel } from "./view-comps/CompareEmbeddingsPanel";
import { GenerateEmbeddingPanel } from "./view-comps/GenerateEmbeddingPanel";
import { GroupEmbeddingsPanel } from "./view-comps/GroupEmbeddingsPanel";
import { SemanticSearchPanel } from "./view-comps/SemanticSearchPanel";

type EmbeddingsView = "generate" | "compare" | "search" | "group";

const views: Array<{
  id: EmbeddingsView;
  label: string;
  description: string;
}> = [
  {
    id: "generate",
    label: "Generate Embedding",
    description: "Turn text into a numerical vector.",
  },
  {
    id: "compare",
    label: "Compare Texts",
    description: "Measure semantic similarity.",
  },
  {
    id: "search",
    label: "Semantic Search",
    description: "Rank documents by meaning.",
  },
  {
    id: "group",
    label: "Group Texts",
    description: "Discover simple concept clusters.",
  },
];
const EmbeddingsView = () => {
  const [activeView, setActiveView] = useState<EmbeddingsView>("generate");

  return (
    <section className="overflow-hidden border border-neutral-800 bg-secondary-bg text-primary">
      <header className="border-b border-neutral-800 px-5 py-7 sm:px-8">
        <p className="font-ibm-plex-mono text-xs uppercase text-green">
          Semantic vectors
        </p>
        <h2 className="mt-3 text-3xl sm:text-4xl">Embeddings Lab</h2>
        <p className="mt-3 max-w-3xl font-ibm-plex-mono text-sm leading-6 text-secondary">
          Explore how text becomes coordinates, how cosine similarity compares
          meaning, and how embeddings power search, grouping, and RAG.
        </p>
      </header>

      <div
        className="grid border-b border-neutral-800 sm:grid-cols-2 xl:grid-cols-4"
        role="tablist"
        aria-label="Embedding learning views"
      >
        {views.map((view) => (
          <button
            key={view.id}
            type="button"
            role="tab"
            aria-selected={activeView === view.id}
            onClick={() => setActiveView(view.id)}
            className={`min-h-24 border-b border-neutral-800 px-5 py-4 text-left transition sm:border-r sm:border-neutral-800 xl:border-b-0 ${
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
        {activeView === "generate" && <GenerateEmbeddingPanel />}
        {activeView === "compare" && <CompareEmbeddingsPanel />}
        {activeView === "search" && <SemanticSearchPanel />}
        {activeView === "group" && <GroupEmbeddingsPanel />}
      </div>

      <aside className="border-t border-neutral-800 bg-main-bg p-5 sm:p-8">
        <p className="font-ibm-plex-mono text-xs uppercase text-green">
          Learning note
        </p>
        <p className="mt-2 max-w-4xl text-sm leading-6 text-secondary">
          The local provider is a deterministic educational vectorizer, not a
          neural embedding model. Set{" "}
          <code className="font-ibm-plex-mono font-semibold text-primary">EMBEDDINGS_PROVIDER</code> to{" "}
          <code className="font-ibm-plex-mono font-semibold text-primary">hugging-face</code> and provide{" "}
          <code className="font-ibm-plex-mono font-semibold text-primary">HF_API_KEY</code> to use the
          remote feature-extraction provider. The provider abstraction is ready
          for OpenAI, Ollama, and Transformers.js adapters.
        </p>
      </aside>
    </section>
  );
};

export default EmbeddingsView;
