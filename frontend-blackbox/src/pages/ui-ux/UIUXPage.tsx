import { useRef } from "react";
import { useTranslation } from "react-i18next";
import { useGsapPageAnimation } from "../../lib/hooks/useGSAPAanimation";
import FeatureHeader from "../../components/common/header/FeatureHeader";
import MagnetBtn from "@/components/ui-ux/MagnetBtn";
import UIUXLabIntro from "@/components/ui-ux/UIUXLabIntro";
import UIUXDeepMap from "@/components/ui-ux/UIUXDeepMap";
import UXThinkingCards from "@/components/ui-ux/UXThinkingCards";
import ComponentAnatomy from "@/components/ui-ux/ComponentAnatomy";
import MotionPrinciples from "@/components/ui-ux/MotionPrinciples";
import AccessibilityChecklist from "@/components/ui-ux/AccessibilityChecklist";
import BeforeAfterUX from "@/components/ui-ux/BeforeAfterUX";
import UIUXCaseStudyStrip from "@/components/ui-ux/UIUXCaseStudyStrip";
import assets from "../../assets";

interface DesignPrinciple {
  title: string;
  color: string;
}

interface ProjectFlow {
  title: string;
  description: string;
}

const UIUXPage = () => {
  const containerRef = useRef<HTMLDivElement>(null!);
  const { t } = useTranslation("uiux");

  const designPrinciples = t("designPrinciples", {
    returnObjects: true,
  }) as DesignPrinciple[];

  const projectFlow = t("projectFlow", {
    returnObjects: true,
  }) as ProjectFlow[];

  useGsapPageAnimation(
    containerRef,
    (tl) => {
      tl.from(".uiux-hero", {
        y: 60,
        opacity: 0,
        duration: 0.9,
        ease: "power3.out",
        stagger: 0.15,
      });

      tl.fromTo(
        ".uiux-reveal",
        { y: 70, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          ease: "power3.out",
          stagger: 0.12,
        },
        "-=0.5",
      );
    },
    [],
  );

  return (
    <div
      ref={containerRef}
      className="relative min-h-screen overflow-hidden px-6 py-12 text-primary md:px-10 xl:px-8"
    >
      <FeatureHeader label="uiux" content="uiux" />

      <UIUXLabIntro />

      <section className="uiux-reveal mt-20 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {designPrinciples.map((item, i) => (
          <MagnetBtn key={i} style={{ backgroundColor: item.color }}>
            <h3 className="p-6 text-center text-[1rem] font-bold uppercase text-white md:text-3xl">
              {item.title}
            </h3>
          </MagnetBtn>
        ))}
      </section>

      <UIUXDeepMap />

      <UXThinkingCards />

      <ComponentAnatomy />

      <MotionPrinciples />

      <AccessibilityChecklist />

      <BeforeAfterUX />

      <section className="mt-32 space-y-24">
        {projectFlow.map((step, index) => (
          <div
            key={index}
            className="uiux-reveal grid items-center gap-10 md:grid-cols-2"
          >
            <div
              className={`space-y-4 ${
                index % 2 === 0 ? "md:order-1" : "md:order-2"
              }`}
            >
              <span className="font-ibm-plex-mono text-sm uppercase tracking-[0.35em] opacity-50">
                Flow 0{index + 1}
              </span>

              <h2 className="font-geist text-3xl font-bold md:text-4xl">
                {step.title}
              </h2>

              <p className="font-ibm-plex-mono text-lg leading-relaxed opacity-80">
                {step.description}
              </p>
            </div>

            <div
              className={`overflow-hidden rounded-4xl border border-primary/10 bg-linear-to-br from-neutral-800 to-neutral-700 ${
                index % 2 === 0 ? "md:order-2" : "md:order-1"
              }`}
            >
              <img
                src={assets[`uiux_${index + 1}`]}
                alt={`Step ${index + 1}`}
                className="h-full w-full object-contain"
              />
            </div>
          </div>
        ))}
      </section>

      <UIUXCaseStudyStrip />
    </div>
  );
};

export default UIUXPage;
