import { useState } from "react";
import { useTranslation } from "react-i18next";
import { NormalGenerationPanel } from "./view-comps/NormalGenerationPanel";
import { StreamingGenerationPanel } from "./view-comps/StreamingGenerationPanel";
import { TokenizationPreviewPanel } from "./view-comps/TokenizationPreviewPanel";

type InferenceView = "tokenize" | "generate" | "stream";

const TokenInferenceView = () => {
  const { t } = useTranslation("exploreMiniAppsAi");
  const [activeView, setActiveView] = useState<InferenceView>("tokenize");
  const views: Array<{
    id: InferenceView;
    label: string;
    description: string;
  }> = [
    {
      id: "tokenize",
      label: t("autoregressiveInference.tabs.tokenize.label"),
      description: t("autoregressiveInference.tabs.tokenize.description"),
    },
    {
      id: "generate",
      label: t("autoregressiveInference.tabs.generate.label"),
      description: t("autoregressiveInference.tabs.generate.description"),
    },
    {
      id: "stream",
      label: t("autoregressiveInference.tabs.stream.label"),
      description: t("autoregressiveInference.tabs.stream.description"),
    },
  ];

  return (
    <section className="overflow-hidden border border-neutral-800 bg-secondary-bg text-primary">
      <header className="border-b border-neutral-800 px-5 py-7 sm:px-8">
        <p className="font-ibm-plex-mono text-xs uppercase text-green">
          {t("autoregressiveInference.header.eyebrow")}
        </p>
        <h2 className="mt-3 text-3xl sm:text-4xl">
          {t("autoregressiveInference.header.title")}
        </h2>
        <p className="mt-3 max-w-3xl font-ibm-plex-mono text-sm leading-6 text-secondary">
          {t("autoregressiveInference.header.description")}
        </p>
      </header>

      <div
        className="grid border-b border-neutral-800 md:grid-cols-3"
        role="tablist"
        aria-label={t("autoregressiveInference.tabs.aria")}
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
        {activeView === "tokenize" && <TokenizationPreviewPanel t={t} />}
        {activeView === "generate" && <NormalGenerationPanel t={t} />}
        {activeView === "stream" && <StreamingGenerationPanel t={t} />}
      </div>

      <aside className="border-t border-neutral-800 bg-main-bg p-5 sm:p-8">
        <p className="font-ibm-plex-mono text-xs uppercase text-green">
          {t("autoregressiveInference.aside.title")}
        </p>
        <p className="mt-2 max-w-4xl text-sm leading-6 text-secondary">
          {t("autoregressiveInference.aside.description")}
        </p>
      </aside>
    </section>
  );
};

export default TokenInferenceView;
