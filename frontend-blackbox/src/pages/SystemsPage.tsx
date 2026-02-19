import { useEffect, useRef } from "react";
import SectionHero from "../components/common/SectionHero";
import SectionLabel from "../components/common/SectionLabel";
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

      <section className="systems-block border border-neutral-800 bg-secondary-bg p-8 space-y-8">
        <div className="space-y-4">
          <h2 className="text-primary font-geist text-3xl">
            {t("engine.title")}
          </h2>

          <p className="text-secondary font-ibm-plex-mono text-sm leading-relaxed max-w-3xl">
            {t("engine.description")}
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 font-ibm-plex-mono text-sm text-secondary">
          <div className="systems-meta">
            <span className="block text-primary mb-2">
              {t("meta.architecture")}
            </span>
            Controller → Service → Repository
          </div>

          <div className="systems-meta">
            <span className="block text-primary mb-2">
              {t("meta.security")}
            </span>
            JWT + Role Guards
          </div>

          <div className="systems-meta">
            <span className="block text-primary mb-2">{t("meta.status")}</span>
            <span className="text-green">{t("meta.statusValue")}</span>
          </div>
        </div>

        <div className="pt-6 border-t border-neutral-800 flex flex-wrap gap-4">
          <button className="systems-actions border border-neutral-700 px-4 py-2 text-secondary font-ibm-plex-mono text-xs opacity-50 cursor-not-allowed">
            {t("actions.api")}
          </button>

          <button className="systems-actions border border-neutral-700 px-4 py-2 text-secondary font-ibm-plex-mono text-xs opacity-50 cursor-not-allowed">
            {t("actions.diagram")}
          </button>

          <button className="systems-actions border border-neutral-700 px-4 py-2 text-secondary font-ibm-plex-mono text-xs opacity-50 cursor-not-allowed">
            {t("actions.protected")}
          </button>

          <button className="systems-actions border border-neutral-700 px-4 py-2 text-secondary font-ibm-plex-mono text-xs opacity-50 cursor-not-allowed">
            {t("actions.logs")}
          </button>
        </div>
      </section>
    </div>
  );
};

export default SystemsPage;
