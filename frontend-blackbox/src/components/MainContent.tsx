import { useEffect, useRef } from "react";
import { Link } from "@tanstack/react-router";
import SectionLabel from "./common/SectionLabel";
import gsap from "gsap";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import FeatureHeader from "./common/header/FeatureHeader";
import assets from "../assets";

type ModuleKey =
  | "tools"
  | "ai"
  | "systems"
  | "experiments"
  | "uiux"
  | "webProjects";

const modules = [
  {
    key: "tools",
    to: "/tools",
    image: assets.tools,

    meta: "Toolkit",
  },
  {
    key: "ai",
    to: "/ai",
    image: assets.ai,

    meta: "Intelligence",
  },
  {
    key: "systems",
    to: "/systems",
    image: assets.systems,

    meta: "Architecture",
  },
  {
    key: "experiments",
    to: "/experiments",
    image: assets.experiments,

    meta: "Lab",
  },
  {
    key: "uiux",
    to: "/uiux",
    image: assets.uiux,

    meta: "Design",
  },
  {
    key: "webProjects",
    to: "/web-projects",
    image: assets.fullstack,

    meta: "Full-stack",
  },
  /*{ key: "miniGames", to: "/mini-games" },*/
] satisfies {
  key: ModuleKey;
  to: string;
  image: string;

  meta: string;
}[];

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
        <FeatureHeader label="home" content="home" />

        <section className="space-y-10">
          <div className="hero-animate">
            <SectionLabel text={t("modulesLabel")} />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 md:gap-8 xl:gap-10">
            {modules.map((module) => (
              <Link
                key={module.key}
                to={module.to}
                className="mx-auto block w-fit max-w-full"
              >
                <motion.div
                  whileHover={{ y: -8, scale: 1.015 }}
                  transition={{
                    type: "spring",
                    stiffness: 200,
                    damping: 18,
                  }}
                  className="
                    modules-animate
                    group relative mx-auto w-full max-w-76
                    cursor-pointer border border-neutral-800 bg-secondary-bg p-2
                    shadow-[0_20px_48px_rgba(0,0,0,0.32)]
                    transition-colors duration-500 hover:border-green/60
                    hover:shadow-[0_26px_64px_rgba(0,0,0,0.44)]
                  "
                >
                  <article className="relative flex aspect-[0.58] min-h-120 overflow-hidden border border-neutral-800 bg-main-bg text-white">
                    <img
                      src={module.image}
                      alt=""
                      aria-hidden="true"
                      className="absolute -top-5 inset-0 h-full w-full object-cover grayscale opacity-55 transition duration-700 group-hover:grayscale-0 group-hover:scale-105 group-hover:opacity-70"
                    />
                    <div className="absolute inset-0 bg-[linear-gradient(rgba(91,238,108,0.09)_1px,transparent_1px),linear-gradient(90deg,rgba(91,238,108,0.07)_1px,transparent_1px)] bg-size-[28px_28px]" />

                    <div className="absolute inset-x-0 bottom-0 h-2/3 bg-linear-to-t from-black via-black/80 to-transparent" />

                    <div className="absolute left-4 right-4 top-4 flex items-center justify-between border border-neutral-800 bg-black/55 px-3 py-2 backdrop-blur-sm">
                      <div className="flex gap-1.5">
                        {["Q", "K", "V"].map((label) => (
                          <span
                            key={label}
                            className="grid size-6 place-items-center border border-green/40 font-ibm-plex-mono text-[10px] text-green"
                          >
                            {label}
                          </span>
                        ))}
                      </div>
                      <span className="font-ibm-plex-mono text-[10px] uppercase tracking-[0.18em] text-secondary">
                        module
                      </span>
                    </div>

                    <div className="relative z-10 mt-auto flex h-full flex-col justify-end p-5">
                      <span className="mb-3 w-fit border border-green/30 px-2 py-1 font-ibm-plex-mono text-[9px] uppercase tracking-[0.16em] text-green">
                        {module.meta}
                      </span>

                      <h3 className="font-geist text-2xl font-medium leading-none text-primary md:text-2xl">
                        {t(`modules.${module.key}.title`)}
                      </h3>

                      <p className="mt-4 line-clamp-3 min-h-[4.5rem] border-l border-green/40 pl-3 font-ibm-plex-mono text-xs leading-relaxed text-secondary">
                        {t(`modules.${module.key}.description`)}
                      </p>

                      <span className="mt-6 inline-flex h-11 w-full items-center justify-center border border-green/40 bg-green px-5 font-ibm-plex-mono text-xs font-semibold uppercase tracking-[0.12em] text-black transition duration-300 group-hover:border-green group-hover:bg-transparent group-hover:text-green">
                        {t("moduleCta")}
                      </span>
                    </div>
                  </article>
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
