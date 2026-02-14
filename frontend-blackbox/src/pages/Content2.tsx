import { useEffect, useRef } from "react";
import gsap from "gsap";

const cards = [
  {
    title: "System Architecture",
    description:
      "Modular backend structure with scalable routing, layered services, and optimized database queries.",
  },
  {
    title: "AI Integration",
    description:
      "Semantic search, embeddings, and prompt-based logic integrated directly into business workflows.",
  },
  {
    title: "Performance Core",
    description:
      "Optimized rendering, lazy loading, caching strategies and controlled state management.",
  },
  {
    title: "Game Engine Concepts",
    description:
      "Interactive systems, state machines and physics-driven UI concepts inspired by game development.",
  },
];

const Content2 = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      const title = containerRef.current?.querySelector(".animated-title");
      const cardsEl = containerRef.current?.querySelectorAll(".animated-card");

      if (!title || !cardsEl) return;

      const tl = gsap.timeline();

      // Title entrance
      tl.fromTo(
        title,
        {
          y: 80,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,

          duration: 1,
          ease: "power4.out",
        },
      );

      // Cards stagger animation
      tl.fromTo(
        cardsEl,
        {
          y: 60,
          opacity: 0,
          scale: 0.95,
        },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.8,
          stagger: 0.12,
          ease: "power3.out",
        },
        "-=0.4",
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="flex bg-main-bg min-h-screen">
      <div className="p-8 space-y-10 w-full">
        <h1 className="animated-title font-geist font-bold text-[4.5rem] text-primary">
          Inside the <span className="text-secondary">Blackbox</span>
        </h1>

        <div className="grid grid-cols-2 gap-8">
          {cards.map((card, index) => (
            <div
              key={index}
              className="animated-card bg-secondary-bg border border-neutral-800 p-6 rounded-lg transition-all duration-300 hover:scale-[1.03] hover:border-primary hover:shadow-[0_0_40px_rgba(255,255,255,0.05)]"
            >
              <h2 className="font-geist text-xl text-primary mb-4">
                {card.title}
              </h2>
              <p className="font-ibm-plex-mono text-secondary text-sm leading-relaxed">
                {card.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Content2;
