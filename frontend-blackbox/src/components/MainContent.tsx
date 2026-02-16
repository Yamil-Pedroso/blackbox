import { useEffect, useRef } from "react";
import { Link } from "@tanstack/react-router";
import SectionHero from "./common/SectionHero";
import SectionLabel from "./common/SectionLabel";
import gsap from "gsap";
import { motion } from "framer-motion";

const modules = [
  {
    title: "Experiments",
    to: "/experiments",
    description:
      "Rendering explorations, shader studies and advanced motion systems.",
  },
  {
    title: "Tools",
    to: "/tools",
    description:
      "Utility systems built with clean architecture and practical UX design.",
  },
  {
    title: "AI",
    to: "/ai",
    description:
      "Applied intelligence integrations, streaming pipelines and context systems.",
  },
  {
    title: "Systems",
    to: "/systems",
    description:
      "Backend architecture, authentication flows and real-time data structures.",
  },
  {
    title: "Mini-Games",
    to: "/mini-games",
    description:
      "Interactive mechanics and WebGL / Unity based gameplay experiments.",
  },
];

const MainContent = () => {
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
            <SectionLabel text="Hero Section" />
          </div>

          <div className="hero-animate">
            <SectionHero
              title="Welcome to the Blackbox"
              description="A sandbox environment for rendering research, motion systems and interactive prototypes. Each module represents a technical dimension of the Blackbox ecosystem."
            />
          </div>
        </section>

        <section className="space-y-10">
          <div className="hero-animate">
            <SectionLabel text="Blackbox Modules" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 md:gap-8 xl:gap-10">
            {modules.map((module) => (
              <Link key={module.title} to={module.to}>
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
                    {module.title}
                  </h3>

                  <p className="text-secondary font-ibm-plex-mono text-sm md:text-base leading-relaxed relative z-10">
                    {module.description}
                  </p>

                  <div className="mt-6 md:mt-8 h-px w-0 bg-primary group-hover:w-full transition-all duration-700 relative z-10" />
                </motion.div>
              </Link>
            ))}
          </div>
        </section>

        <section className="pt-16 md:pt-20 border-t border-neutral-800">
          <p className="footer-animate text-secondary font-ibm-plex-mono text-sm md:text-base max-w-xl">
            Blackbox is an evolving environment. Each module represents a
            dimension of engineering: rendering, architecture, intelligence,
            interaction and structured systems.
          </p>
        </section>
      </div>
    </div>
  );
};

export default MainContent;
