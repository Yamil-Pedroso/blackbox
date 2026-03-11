import { useRef } from "react";
import { useTranslation } from "react-i18next";
//import UIUXComparisonPhone from "../../components/ui-ux/UIUXComparisonPhone";
import { useGsapPageAnimation } from "../../lib/hooks/useGSAPAanimation";
import FeatureHeader from "../../components/common/header/FeatureHeader";

interface DesignPrinciple {
  title: string;
  color: string;
}

interface ProjectFlow {
  title: string;
  description: string;
}

const UIUXPage = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { t } = useTranslation("uiux");

  const designPrinciples = t("designPrinciples", {
    returnObjects: true,
  }) as DesignPrinciple[];

  const projectFlow = t("projectFlow", {
    returnObjects: true,
  }) as ProjectFlow[];

  useGsapPageAnimation(
    containerRef as React.RefObject<HTMLDivElement>,
    (tl) => {
      tl.from(".uiux-hero", {
        y: 60,
        opacity: 0,
        duration: 0.9,
        ease: "power3.out",
        stagger: 0.15,
      });

      tl.fromTo(
        ".uiux-rect",
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          ease: "power3.out",
          stagger: 0.15,
        },
        "-=0.6",
      );

      tl.from(
        ".uiux-process",
        {
          y: 80,
          opacity: 0,
          duration: 1,
          ease: "power3.out",
          stagger: 0.2,
        },
        "-=0.4",
      );
    },
    [],
  );

  return (
    <div
      ref={containerRef}
      className="relative min-h-screen px-6 md:px-10 xl:px-8 py-12 text-primary overflow-hidden"
    >
      <FeatureHeader label="uiux" content="uiux" />

      <div className="mt-20 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {designPrinciples.map((item, index) => (
          <div
            key={index}
            className="uiux-rect flex items-center justify-center shadow-xl"
            style={{ backgroundColor: item.color }}
          >
            <h3 className="text-[1rem] md:text-3xl font-bold uppercase text-white text-center px-4">
              {item.title}
            </h3>
          </div>
        ))}
      </div>

      <div className="mt-32 space-y-24">
        {projectFlow.map((step, index) => (
          <div
            key={index}
            className="uiux-process grid md:grid-cols-2 gap-10 items-center"
          >
            <div
              className={`${index % 2 === 0 ? "order-1" : "order-2"} space-y-4`}
            >
              <h2 className="font-geist text-3xl md:text-4xl font-bold">
                {step.title}
              </h2>
              <p className="font-ibm-plex-mono text-lg opacity-80 leading-relaxed">
                {step.description}
              </p>
            </div>
            <div
              className={`${
                index % 2 === 0 ? "order-2" : "order-1"
              } h-64 bg-linear-to-br from-neutral-800 to-neutral-700 flex items-center justify-center`}
            >
              <span className="font-ibm-plex-mono text-xl uppercase tracking-widest opacity-40">
                Visual Placeholder
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UIUXPage;
