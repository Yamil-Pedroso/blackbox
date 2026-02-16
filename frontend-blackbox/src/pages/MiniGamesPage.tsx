import { useEffect, useRef } from "react";
import SectionHero from "../components/common/SectionHero";
import { motion } from "framer-motion";
import SectionLabel from "../components/common/SectionLabel";
import gsap from "gsap";

const games = [
  {
    id: 1,
    title: "Unity Micro Demo",
    description: "Short Unity WebGL prototype focused on mechanics.",
    type: "unity",
  },
  {
    id: 2,
    title: "Asteroid Runner",
    description: "WebGL-based endless runner experiment.",
    type: "web",
  },
  {
    id: 3,
    title: "Memory Grid",
    description: "Pattern recognition challenge.",
    type: "web",
  },
];

const MiniGamesPage = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline();

      tl.from(".games-hero", {
        y: 60,
        opacity: 0,
        duration: 0.9,
        ease: "power3.out",
        stagger: 0.15,
      });

      tl.from(
        ".game-item",
        {
          y: 60,
          opacity: 0,
          duration: 0.8,
          ease: "power3.out",
          stagger: 0.12,
        },
        "-=0.4",
      );

      tl.from(
        ".unity-block",
        {
          y: 60,
          opacity: 0,
          duration: 0.9,
          ease: "power3.out",
        },
        "-=0.3",
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative min-h-screen px-6 md:px-10 xl:px-8 py-8 text-primary overflow-hidden"
    >
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px)] bg-size-[100%_3px] opacity-20" />

      <section className="space-y-6 relative z-10">
        <div className="games-hero">
          <SectionLabel text="Interactive Playground" />
        </div>

        <div className="games-hero">
          <SectionHero
            title="Mini-Games Unity"
            description="A collection of Unity WebGL prototypes demonstrating interactive mechanics and real-time physics."
          />
        </div>

        <div className="games-hero font-ibm-plex-mono text-green text-sm flex justify-center items-center gap-1">
          <span>ARCADE MODE</span>
          <motion.span
            animate={{ opacity: [0, 1, 0] }}
            transition={{ repeat: Infinity, duration: 1 }}
          >
            _
          </motion.span>
        </div>
      </section>

      <section className="mt-20 max-w-3xl mx-auto space-y-6 font-ibm-plex-mono relative z-10">
        <div className="games-hero text-secondary text-sm mb-6">
          &gt; Select Game
        </div>

        {games.map((game, index) => (
          <motion.div
            key={game.id}
            whileHover={{ x: 6 }}
            transition={{ type: "spring", stiffness: 300, damping: 18 }}
            className="game-item group flex flex-col md:flex-row md:items-center md:justify-between border-b border-neutral-800 py-6 cursor-pointer hover:text-green transition-colors duration-300"
          >
            <div className="flex items-center gap-6">
              <span className="text-xs text-secondary">
                [{String(index + 1).padStart(2, "0")}]
              </span>

              <div>
                <div className="text-lg md:text-xl group-hover:text-green transition-colors">
                  {game.title.toUpperCase()}
                </div>
                <div className="text-xs text-secondary mt-1">
                  {game.description}
                </div>
              </div>
            </div>

            <span className="opacity-0 group-hover:opacity-100 text-green text-sm mt-4 md:mt-0 transition-opacity">
              ▶ LAUNCH
            </span>
          </motion.div>
        ))}
      </section>

      <section className="unity-block mt-28 max-w-5xl space-y-8 relative z-10">
        <h2 className="font-geist text-2xl md:text-3xl text-primary">
          Unity WebGL Demo
        </h2>

        <div className="border border-neutral-800 bg-secondary-bg aspect-video w-full flex items-center justify-center text-secondary font-ibm-plex-mono text-sm">
          {/*<iframe
            src="/unity-build/index.html"
            title="Unity Mini Game"
            className="w-full h-full"
          />*/}
        </div>

        <p className="text-secondary font-ibm-plex-mono text-sm leading-relaxed max-w-3xl">
          Embedded Unity WebGL prototype demonstrating real-time physics,
          collision detection and interactive mechanics inside the Blackbox
          environment.
        </p>
      </section>
    </div>
  );
};

export default MiniGamesPage;
