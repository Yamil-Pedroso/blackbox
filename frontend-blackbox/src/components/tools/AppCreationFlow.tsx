import { useTranslation } from "react-i18next";
import { getStageInfo } from "@/lib/utils/toolStage";
interface AppCreationFlowProps {
  className?: string;
}

const AppCreationFlow = ({ className }: AppCreationFlowProps) => {
  const { t } = useTranslation("tools");

  const stages = t("stage", { returnObjects: true }) as {
    idea: string;
    problem: string;
    solution: string;
    features: string;
    uxFlow: string;
    architecture: string;
    implementation: string;
    testing: string;
    release: string;
  };
  const stageEntries = Object.entries(stages);

  return (
    <div
      className={`border border-neutral-800 p-6 bg-secondary-bg ${className}`}
    >
      <h3 className="text-primary font-geist text-xl mb-6">
        App Creation Flow
      </h3>

      <div className="flex flex-wrap gap-4">
        {stageEntries.map(([key, value], index) => (
          <div
            key={key}
            className="flex items-center text-xs font-ibm-plex-mono"
          >
            <span
              className={`px-3 py-2 border border-neutral-700 ${getStageInfo(key).color} flex items-center`}
            >
              {value}
            </span>

            {index < stageEntries.length - 1 && (
              <span className="mx-2 text-neutral-500">→</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AppCreationFlow;
