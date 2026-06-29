import { useState } from "react";
import { useTranslation } from "react-i18next";
import { CompareEmbeddingsPanel } from "./view-comps/CompareEmbeddingsPanel";
import { GenerateEmbeddingPanel } from "./view-comps/GenerateEmbeddingPanel";
import { GroupEmbeddingsPanel } from "./view-comps/GroupEmbeddingsPanel";
import { SemanticSearchPanel } from "./view-comps/SemanticSearchPanel";

type EmbeddingsView = "generate" | "compare" | "search" | "group";

const views: EmbeddingsView[] = ["generate", "compare", "search", "group"];

const EmbeddingsView = () => {
  const { t } = useTranslation("exploreMiniAppsAi");
  const [activeView, setActiveView] = useState<EmbeddingsView>("generate");

  return (
    <section className="overflow-hidden border border-neutral-800 bg-secondary-bg text-primary">
      <header className="border-b border-neutral-800 px-5 py-7 sm:px-8">
        <p className="font-ibm-plex-mono text-xs uppercase text-green">
          {t("embeddingsLab.header.eyebrow")}
        </p>
        <h2 className="mt-3 text-3xl sm:text-4xl">
          {t("embeddingsLab.header.title")}
        </h2>
        <p className="mt-3 max-w-3xl font-ibm-plex-mono text-sm leading-6 text-secondary">
          {t("embeddingsLab.header.description")}
        </p>
      </header>

      <div
        className="grid border-b border-neutral-800 sm:grid-cols-2 xl:grid-cols-4"
        role="tablist"
        aria-label={t("embeddingsLab.tabs.aria")}
      >
        {views.map((view) => (
          <button
            key={view}
            type="button"
            role="tab"
            aria-selected={activeView === view}
            onClick={() => setActiveView(view)}
            className={`min-h-24 border-b border-neutral-800 px-5 py-4 text-left transition sm:border-r sm:border-neutral-800 xl:border-b-0 ${
              activeView === view
                ? "bg-green text-black"
                : "bg-main-bg text-primary hover:bg-secondary-bg"
            }`}
          >
            <span className="block text-sm font-semibold">
              {t(`embeddingsLab.tabs.${view}.label`)}
            </span>
            <span
              className={`mt-1 block font-ibm-plex-mono text-xs leading-5 ${
                activeView === view ? "text-black/70" : "text-secondary"
              }`}
            >
              {t(`embeddingsLab.tabs.${view}.description`)}
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
          {t("embeddingsLab.note.title")}
        </p>
        <p className="mt-2 max-w-4xl text-sm leading-6 text-secondary">
          {t("embeddingsLab.note.prefix")}{" "}
          <code className="font-ibm-plex-mono font-semibold text-primary">EMBEDDINGS_PROVIDER</code> to{" "}
          <code className="font-ibm-plex-mono font-semibold text-primary">hugging-face</code>{" "}
          {t("embeddingsLab.note.suffix")}{" "}
          <code className="font-ibm-plex-mono font-semibold text-primary">HF_API_KEY</code>{" "}
          {t("embeddingsLab.note.ending")}
        </p>
      </aside>
    </section>
  );
};

export default EmbeddingsView;
