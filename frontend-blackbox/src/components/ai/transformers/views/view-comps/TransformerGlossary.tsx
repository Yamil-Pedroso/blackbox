import { useTranslation } from "react-i18next";

const TransformerGlossary = () => {
  const { t } = useTranslation("exploreMiniAppsAi");
  const terms = t("transformers.glossary", {
    returnObjects: true,
  }) as string[][];

  return (
    <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
      {terms.map(([term, definition]) => (
        <div key={term} className="border border-neutral-800 bg-secondary-bg p-4">
          <h3 className="text-primary">{term}</h3>
          <p className="mt-2 font-ibm-plex-mono text-xs leading-relaxed text-secondary">
            {definition}
          </p>
        </div>
      ))}
    </div>
  );
};

export default TransformerGlossary;
