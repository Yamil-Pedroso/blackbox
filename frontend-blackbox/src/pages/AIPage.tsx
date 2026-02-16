import { useEffect, useRef } from "react";
import SectionHero from "../components/common/SectionHero";
import SectionLabel from "../components/common/SectionLabel";
import gsap from "gsap";

const aiModules = [
  {
    title: "Streaming Engine",
    description:
      "Token-level streaming pipeline with incremental rendering and context injection.",
  },
  {
    title: "Context Memory System",
    description:
      "Short-term and long-term memory handling using structured context storage.",
  },
  {
    title: "RAG Prototype",
    description:
      "Retrieval-Augmented Generation system with vector similarity search.",
  },
  {
    title: "Embedding Visualizer",
    description:
      "Interactive vector space visualization for semantic comparison.",
  },
];

const AIPage = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline();

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
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      className="px-6 md:px-10 xl:px-8 py-8 max-w-6xl space-y-24"
    >
      <section className="space-y-6">
        <div className="ai-hero">
          <SectionLabel text="Inteligence Layer" />
        </div>

        <div className="ai-hero">
          <SectionHero
            title="Artificial Intelligence Systems"
            description="This module explores structured AI integration, streaming pipelines, memory systems and retrieval-based architectures. Intelligence is treated as a system layer, not a feature."
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
              Explore →
            </button>
          </div>
        ))}
      </section>
    </div>
  );
};

export default AIPage;
