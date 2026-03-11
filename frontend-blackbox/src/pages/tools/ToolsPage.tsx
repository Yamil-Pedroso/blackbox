import { useRef } from "react";
import { Link } from "@tanstack/react-router";
import AppCreationFlow from "@/components/tools/AppCreationFlow";
import { useTranslation } from "react-i18next";
import { useGsapPageAnimation } from "../../lib/hooks/useGSAPAanimation";
import { getStageInfo, getStatusColor } from "../../lib/utils/toolStage";
import FeatureHeader from "../../components/common/header/FeatureHeader";

const ToolsPage = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { t } = useTranslation("colorPaletteGenerator");

  const tools = t("items", { returnObjects: true }) as {
    title: string;
    slug: string;
    description: string;
    stack: string;
    status: string;
    stage: string;
  }[];

  useGsapPageAnimation(
    containerRef as React.RefObject<HTMLDivElement>,
    (tl) => {
      tl.from(".tools-hero", {
        y: 60,
        opacity: 0,
        duration: 0.9,
        ease: "power3.out",
        stagger: 0.15,
      });

      tl.from(
        ".app-creation-flow",
        {
          x: -60,
          opacity: 0,
          duration: 0.8,
          ease: "power3.out",
        },
        "-=0.3",
      );

      tl.from(
        ".tool-card",
        {
          y: 60,
          opacity: 0,
          duration: 0.8,
          ease: "power3.out",
          stagger: 0.1,
        },
        "-=0.4",
      );
    },
    [],
  );

  return (
    <div
      ref={containerRef}
      className="px-6 md:px-10 xl:px-8 py-8 max-w-6xl space-y-20"
    >
      <FeatureHeader label="tools" content="tools" />
      <AppCreationFlow className="app-creation-flow" />

      <section className="grid sm:grid-cols-2 xl:grid-cols-3 gap-10">
        {tools.map((tool) => (
          <div
            key={tool.title}
            className="tool-card group border border-neutral-800 bg-secondary-bg p-6 flex flex-col justify-between hover:border-primary transition-colors duration-300"
          >
            <div className="space-y-4">
              <h2 className="text-primary font-geist text-xl md:text-2xl">
                {tool.title}
              </h2>

              <p className="text-secondary font-ibm-plex-mono text-sm leading-relaxed">
                {tool.description}
              </p>

              <div className="flex flex-wrap flex-col gap-3 text-xs font-ibm-plex-mono text-secondary pt-2">
                <span>{tool.stack}</span>
                <span className={getStatusColor(tool.status)}>
                  {t(`${tool.status}`)}
                </span>

                <span
                  className={`${getStageInfo(tool.stage).color} flex items-center`}
                >
                  {t(`${tool.stage}`.toUpperCase())}
                  {(() => {
                    const IconComponent = getStageInfo(tool.stage).icon;
                    return <IconComponent className="inline-block ml-2" />;
                  })()}
                </span>
              </div>
            </div>
            <Link
              to="/tools/$slug/process"
              params={{ slug: tool.slug }}
              className="relative mt-6 border border-neutral-700 px-4 py-2 text-center text-xs font-ibm-plex-mono text-secondary overflow-hidden group/process"
            >
              <span className="absolute inset-0 bg-secondary origin-left scale-x-0 transition-transform duration-300 ease-out group-hover/process:scale-x-100"></span>

              <span className="relative z-10 group-hover/process:text-black transition-colors duration-300">
                {t("viewProcess")}
              </span>
            </Link>

            <Link
              to="/tools/$slug/launch"
              params={{ slug: tool.slug }}
              className="relative mt-6 border border-neutral-700 px-4 py-2 text-center text-xs font-ibm-plex-mono text-secondary overflow-hidden group/launch"
            >
              <span className="absolute inset-0 bg-secondary origin-left scale-x-0 transition-transform duration-300 ease-out group-hover/launch:scale-x-100"></span>

              <span className="relative z-10 group-hover/launch:text-black transition-colors duration-300">
                {t("launch")}
              </span>
            </Link>
          </div>
        ))}
      </section>
    </div>
  );
};

export default ToolsPage;
