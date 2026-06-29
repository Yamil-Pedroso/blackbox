import { useTranslation } from "react-i18next";

const blockClass =
  "border border-neutral-800 bg-main-bg px-4 py-3 text-center font-ibm-plex-mono text-xs text-secondary";

const ArchitectureDiagram = () => {
  const { t } = useTranslation("exploreMiniAppsAi");
  const encoderBlocks = t("transformers.architectureDiagram.encoderBlocks", {
    returnObjects: true,
  }) as string[];
  const decoderBlocks = t("transformers.architectureDiagram.decoderBlocks", {
    returnObjects: true,
  }) as string[];

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <div className="border border-neutral-800 bg-secondary-bg p-5">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-primary text-xl">
            {t("transformers.architectureDiagram.encoder")}
          </h3>
          <span className="border border-green/30 px-2 py-1 font-ibm-plex-mono text-[11px] text-green">
            {t("transformers.architectureDiagram.encoderBadge")}
          </span>
        </div>
        <div className="space-y-3">
          {encoderBlocks.map((block) => (
            <div key={block} className={blockClass}>
              {block}
            </div>
          ))}
        </div>
      </div>

      <div className="border border-neutral-800 bg-secondary-bg p-5">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-primary text-xl">
            {t("transformers.architectureDiagram.decoder")}
          </h3>
          <span className="border border-blue-500/30 px-2 py-1 font-ibm-plex-mono text-[11px] text-blue-400">
            {t("transformers.architectureDiagram.decoderBadge")}
          </span>
        </div>
        <div className="space-y-3">
          {decoderBlocks.map((block) => (
            <div key={block} className={blockClass}>
              {block}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ArchitectureDiagram;
