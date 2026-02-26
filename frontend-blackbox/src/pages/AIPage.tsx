import { useRef } from "react";
import SectionHero from "../components/common/SectionHero";
import SectionLabel from "../components/common/SectionLabel";
import gsap from "gsap";
import SplitType from "split-type";
import { useTranslation } from "react-i18next";
import { useGsapPageAnimation } from "../lib/hooks/useGSAPAanimation";

const AIPage = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { t } = useTranslation("ai");

  const aiModules = t("modules", { returnObjects: true }) as {
    title: string;
    description: string;
  }[];

  useGsapPageAnimation(
    containerRef as React.RefObject<HTMLDivElement>,
    (tl) => {
      tl.from(".ai-hero", {
        y: 60,
        opacity: 0,
        duration: 0.9,
        ease: "power3.out",
        stagger: 0.15,
      });

      tl.from(
        ".ai-module",
        {
          y: 60,
          opacity: 0,
          duration: 0.8,
          ease: "power3.out",
          stagger: 0.12,
        },
        "-=0.4",
      );

      const description = document.querySelector(".ai-description");

      if (description) {
        const split = new SplitType(description as HTMLElement, {
          types: "words",
        });

        gsap.set(split.words, {
          display: "inline-block",
        });

        gsap.delayedCall(5, () => {
          const scatterTl = gsap.timeline();

          scatterTl.to(split.words, {
            x: () =>
              gsap.utils.random(-window.innerWidth / 2, window.innerWidth / 2),
            y: () =>
              gsap.utils.random(
                -window.innerHeight / 2,
                window.innerHeight / 2,
              ),
            rotation: () => gsap.utils.random(-40, 40),
            opacity: 0.3,
            filter: "blur(4px)",
            duration: 1.4,
            ease: "power3.out",
            stagger: {
              amount: 0.8,
            },
          });

          scatterTl.to(
            split.words,
            {
              x: 0,
              y: 0,
              rotation: 0,
              opacity: 1,
              filter: "blur(0px)",
              duration: 1.4,
              ease: "power3.inOut",
              stagger: {
                amount: 0.8,
              },
            },
            "+=0.5",
          );
        });
      }
    },
    [],
  );

  return (
    <div
      ref={containerRef}
      className="px-6 md:px-10 xl:px-8 py-8 max-w-6xl space-y-24"
    >
      <section className="space-y-6">
        <div className="ai-hero">
          <SectionLabel text={t("label")} />
        </div>

        <div className="ai-hero">
          <SectionHero
            title={t("hero.title")}
            description={
              <span className="ai-description">{t("hero.description")}</span>
            }
          />
        </div>
      </section>

      <section className="grid md:grid-cols-2 gap-16">
        {aiModules.map((module) => (
          <div
            key={module.title}
            className="ai-module group relative space-y-6 border-b border-neutral-800 pb-10 hover:border-primary transition-colors duration-300"
          >
            <h2 className="text-2xl md:text-3xl font-geist text-primary group-hover:translate-x-2 transition-transform duration-300">
              {module.title}
            </h2>

            <p className="text-secondary font-ibm-plex-mono text-sm leading-relaxed max-w-md">
              {module.description}
            </p>

            <button className="text-sm font-ibm-plex-mono text-secondary opacity-70 group-hover:opacity-100 transition-opacity">
              {t("explore")}
            </button>
          </div>
        ))}
      </section>
    </div>
  );
};

export default AIPage;
