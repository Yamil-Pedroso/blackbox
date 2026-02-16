import { useEffect, useRef } from "react";
import { Link } from "@tanstack/react-router";
import HeaderCommentar from "./common/HeaderCommentar";
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
  const titleRef = useRef<HTMLHeadingElement>(null);

  // ================= HERO WORD ANIMATION =================
  useEffect(() => {
    if (!titleRef.current) return;

    const ctx = gsap.context(() => {
      const words = titleRef.current?.querySelectorAll(".word");
      if (!words) return;

      gsap.fromTo(
        words,
        { y: 100, opacity: 0, scale: 0.9 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 1.2,
          ease: "power4.out",
          stagger: 0.08,
        },
      );
    }, titleRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className="bg-main-bg">
      <div className="p-10 space-y-20 max-w-350 mx-auto">
        <section className="space-y-8">
          <HeaderCommentar text="Hero section" />

          <h1
            ref={titleRef}
            className="font-geist font-bold text-[5.5rem] text-primary leading-[1.05] overflow-hidden"
          >
            <span className="word inline-block mr-4">Enter</span>
            <span className="word inline-block mr-4">the</span>
            <span className="word inline-block mr-4 text-secondary">
              Blackbox
            </span>
          </h1>

          <p className="font-ibm-plex-mono text-secondary max-w-3xl text-[14px] leading-relaxed">
            Blackbox is a creative engineering environment where systems,
            experiments and interactive structures are designed and tested. This
            space combines frontend architecture, backend systems, artificial
            intelligence and real-time interaction.
          </p>
        </section>

        <section className="space-y-10">
          <HeaderCommentar text="Blackbox Modules" />

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10">
            {modules.map((module) => (
              <Link key={module.title} to={module.to}>
                <motion.div
                  whileHover={{ y: -6 }}
                  transition={{
                    type: "spring",
                    stiffness: 200,
                    damping: 18,
                  }}
                  className="group relative border border-neutral-800 bg-secondary-bg p-8 cursor-pointer overflow-hidden"
                >
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-linear-to-br from-primary/5 to-transparent pointer-events-none" />

                  <h3 className="text-primary font-geist text-2xl mb-4 relative z-10">
                    {module.title}
                  </h3>

                  <p className="text-secondary font-ibm-plex-mono text-sm leading-relaxed relative z-10">
                    {module.description}
                  </p>

                  <div className="mt-8 h-px w-0 bg-primary group-hover:w-full transition-all duration-700 relative z-10" />
                </motion.div>
              </Link>
            ))}
          </div>
        </section>

        <section className="pt-20 border-t border-neutral-800">
          <p className="text-secondary font-ibm-plex-mono text-sm max-w-2xl">
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
