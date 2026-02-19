import { useEffect, useRef } from "react";
import { Link } from "@tanstack/react-router";
import SectionHero from "./common/SectionHero";
import SectionLabel from "./common/SectionLabel";
import gsap from "gsap";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

const modules = [
  { key: "experiments", to: "/experiments" },
  { key: "tools", to: "/tools" },
  { key: "ai", to: "/ai" },
  { key: "systems", to: "/systems" },
  { key: "miniGames", to: "/mini-games" },
];

const MainContent = () => {
  const { t } = useTranslation("main");
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline();

      // HERO
      tl.from(".hero-animate", {
        y: 60,
        opacity: 0,
        duration: 0.9,
        ease: "power3.out",
        stagger: 0.15,
      });

      // MODULE CARDS
      tl.from(
        ".modules-animate",
        {
          y: 60,
          opacity: 0,
          duration: 0.8,
          ease: "power3.out",
          stagger: 0.1,
        },
        "-=0.4",
      );

      // FOOTER
      tl.from(
        ".footer-animate",
        {
          y: 40,
          opacity: 0,
          duration: 0.8,
          ease: "power3.out",
        },
        "-=0.3",
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="bg-main-bg">
      <div className="px-6 sm:px-8 md:px-12 xl:px-8 py-8 md:py-16 xl:py-8 space-y-8 max-w-7xl mx-auto">
        <section className="space-y-8">
          <div className="hero-animate">
            <SectionLabel text={t("hero.label")} />
          </div>

          <div className="hero-animate">
            <SectionHero
              title={t("hero.title")}
              description={t("hero.description")}
            />
          </div>
        </section>

        <section className="space-y-10">
          <div className="hero-animate">
            <SectionLabel text={t("modulesLabel")} />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 md:gap-8 xl:gap-10">
            {modules.map((module) => (
              <Link key={module.key} to={module.to}>
                <motion.div
                  whileHover={{ y: -6 }}
                  transition={{
                    type: "spring",
                    stiffness: 200,
                    damping: 18,
                  }}
                  className="
                    modules-animate
                    group relative border border-neutral-800
                    bg-secondary-bg p-6 md:p-8
                    cursor-pointer overflow-hidden
                  "
                >
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-linear-to-br from-primary/5 to-transparent pointer-events-none" />

                  <h3 className="text-primary font-geist text-xl md:text-2xl mb-4 relative z-10">
                    {t(`modules.${module.key}.title`)}
                  </h3>

                  <p className="text-secondary font-ibm-plex-mono text-sm md:text-base leading-relaxed relative z-10">
                    {t(`modules.${module.key}.description`)}
                  </p>

                  <div className="mt-6 md:mt-8 h-px w-0 bg-primary group-hover:w-full transition-all duration-700 relative z-10" />
                </motion.div>
              </Link>
            ))}
          </div>
        </section>

        <section className="pt-16 md:pt-20 border-t border-neutral-800">
          <p className="footer-animate text-secondary font-ibm-plex-mono text-sm md:text-base max-w-xl">
            {t("footer")}
          </p>
        </section>
      </div>
    </div>
  );
};

export default MainContent;
