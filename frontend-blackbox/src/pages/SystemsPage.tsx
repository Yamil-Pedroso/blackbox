import { useEffect, useRef } from "react";
import SectionHero from "../components/common/SectionHero";
import SectionLabel from "../components/common/SectionLabel";
import SystemsContainer from "@/components/systems/SystemsContainer";
import gsap from "gsap";
import { useTranslation } from "react-i18next";

const SystemsPage = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { t } = useTranslation("systems");

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline();

      tl.from(".systems-hero", {
        y: 60,
        opacity: 0,
        duration: 0.9,
        ease: "power3.out",
        stagger: 0.15,
      });

      tl.from(
        ".systems-block",
        {
          y: 60,
          opacity: 0,
          duration: 0.9,
          ease: "power3.out",
        },
        "-=0.4",
      );

      tl.from(
        ".systems-meta",
        {
          y: 40,
          opacity: 0,
          duration: 0.8,
          ease: "power3.out",
          stagger: 0.1,
        },
        "-=0.5",
      );

      tl.from(
        ".systems-actions",
        {
          y: 40,
          opacity: 0,
          duration: 0.8,
          ease: "power3.out",
          stagger: 0.08,
        },
        "-=0.4",
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="p-8 max-w-6xl space-y-20">
      <section className="space-y-6">
        <div className="systems-hero">
          <SectionLabel text={t("label")} />
        </div>

        <div className="systems-hero">
          <SectionHero
            title={t("hero.title")}
            description={t("hero.description")}
          />
        </div>
      </section>

      <SystemsContainer />
    </div>
  );
};

export default SystemsPage;
