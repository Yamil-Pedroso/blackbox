import { useState } from "react";
import { Bot, GitBranch } from "lucide-react";
import { useTranslation } from "react-i18next";
import RagWorkbenchView from "./views/RagWorkbenchView";
import SimpleRagKnowledgeAssistant from "./views/SimpleRagKnowledgeAssistant";

type RagMiniAppView = "workbench" | "assistant";

const ExploreRagWorkbench = () => {
  const { t } = useTranslation("exploreMiniAppsAi");
  const [activeView, setActiveView] = useState<RagMiniAppView>("assistant");

  return (
    <section className="w-full px-5 py-8 md:px-10 xl:px-8">
      <div className="mb-4 grid gap-3 border border-neutral-800 bg-secondary-bg p-3 sm:grid-cols-2">
        <button
          type="button"
          onClick={() => setActiveView("assistant")}
          className={`flex min-h-16 items-center gap-3 border px-4 text-left transition ${
            activeView === "assistant"
              ? "border-green bg-green text-black"
              : "border-neutral-800 bg-main-bg text-secondary hover:border-green hover:text-primary"
          }`}
        >
          <Bot className="h-5 w-5 shrink-0" />
          <span>
            <span className="block text-sm font-semibold">
              {t("ragWorkbench.tabs.assistant")}
            </span>
            <span className="block font-ibm-plex-mono text-xs">
              {t("ragWorkbench.tabs.assistantHint")}
            </span>
          </span>
        </button>
        <button
          type="button"
          onClick={() => setActiveView("workbench")}
          className={`flex min-h-16 items-center gap-3 border px-4 text-left transition ${
            activeView === "workbench"
              ? "border-green bg-green text-black"
              : "border-neutral-800 bg-main-bg text-secondary hover:border-green hover:text-primary"
          }`}
        >
          <GitBranch className="h-5 w-5 shrink-0" />
          <span>
            <span className="block text-sm font-semibold">
              {t("ragWorkbench.tabs.workbench")}
            </span>
            <span className="block font-ibm-plex-mono text-xs">
              {t("ragWorkbench.tabs.workbenchHint")}
            </span>
          </span>
        </button>
      </div>

      {activeView === "assistant" ? (
        <SimpleRagKnowledgeAssistant />
      ) : (
        <RagWorkbenchView />
      )}
    </section>
  );
};

export default ExploreRagWorkbench;
