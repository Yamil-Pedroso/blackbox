import { useTranslation } from "react-i18next";

const TransformerResources = () => {
  const { t } = useTranslation("exploreMiniAppsAi");
  const resources = t("transformers.resources.items", {
    returnObjects: true,
  }) as string[];

  return (
    <div className="border border-neutral-800 bg-secondary-bg p-5">
      <h2 className="mb-4 text-2xl text-primary">
        {t("transformers.resources.title")}
      </h2>
      <div className="grid gap-3 md:grid-cols-2">
        {resources.map((resource, index) => (
          <div
            key={resource}
            className="flex items-center gap-3 border border-neutral-800 bg-main-bg p-4"
          >
            <span className="font-ibm-plex-mono text-xs text-green">
              0{index + 1}
            </span>
            <span className="text-sm text-secondary">{resource}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TransformerResources;
