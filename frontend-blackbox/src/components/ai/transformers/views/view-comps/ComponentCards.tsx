import {
  Binary,
  BrainCircuit,
  GitMerge,
  Layers3,
  MoveHorizontal,
  Network,
  Sigma,
  Waypoints,
} from "lucide-react";
import { useTranslation } from "react-i18next";

const icons = [
  Waypoints,
  Network,
  MoveHorizontal,
  BrainCircuit,
  GitMerge,
  Sigma,
  Binary,
  Layers3,
];

const ComponentCards = () => {
  const { t } = useTranslation("exploreMiniAppsAi");
  const components = t("transformers.components", {
    returnObjects: true,
  }) as Array<{ title: string; body: string }>;

  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
      {components.map((component, index) => {
        const Icon = icons[index] ?? Layers3;

        return (
          <article
            key={component.title}
            className="min-h-48 border border-neutral-800 bg-secondary-bg p-5 transition-colors hover:border-green/60"
          >
            <Icon className="mb-7 h-6 w-6 text-green" />
            <h3 className="mb-3 text-lg text-primary">{component.title}</h3>
            <p className="font-ibm-plex-mono text-xs leading-relaxed text-secondary">
              {component.body}
            </p>
          </article>
        );
      })}
    </div>
  );
};

export default ComponentCards;
