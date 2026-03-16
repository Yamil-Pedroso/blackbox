import { useRef } from "react";
import AppCreationFlow from "@/components/tools/AppCreationFlow";
import { useGsapPageAnimation } from "@/lib/hooks/useGSAPAanimation";
import { useTranslation } from "react-i18next";
import FeatureHeader from "@/components/common/header/FeatureHeader";
import PresentationCard from "@/components/tools/common/layouts/PresentationCard";
import type { ToolTypes } from "@/components/tools/common/types/toolTypes";

const ToolsPage = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  const { t: tPalette } = useTranslation("colorPaletteGenerator");
  const { t: tRegex } = useTranslation("regexVisualizer");
  const { t: tAccessibility } = useTranslation("accessibilityPlayground");

  const paletteTools = tPalette("items", {
    returnObjects: true,
  }) as ToolTypes[];
  const regexTools = tRegex("items", { returnObjects: true }) as ToolTypes[];
  const accessibilityTools = tAccessibility("items", {
    returnObjects: true,
  }) as ToolTypes[];

  const tools = [...paletteTools, ...regexTools, ...accessibilityTools];

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

      <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-10">
        {tools.map((tool) => (
          <PresentationCard key={tool.slug} tool={tool} />
        ))}
      </div>
    </div>
  );
};

export default ToolsPage;
