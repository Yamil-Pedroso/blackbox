import { useRef } from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { useGsapPageAnimation } from "../lib/hooks/useGSAPAanimation";
import FeatureHeader from "../components/common/header/FeatureHeader";

const MiniGamesPage = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { t } = useTranslation("miniGames");

  const games = t("games", { returnObjects: true }) as {
    id: number;
    title: string;
    description: string;
  }[];

  useGsapPageAnimation(
    containerRef as React.RefObject<HTMLDivElement>,
    (tl) => {
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
    },
    [],
  );

  return (
    <div
      ref={containerRef}
      className="relative min-h-screen px-6 md:px-10 xl:px-8 py-8 text-primary overflow-hidden"
    >
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px)] bg-size-[100%_3px] opacity-20" />

      <FeatureHeader label="miniGames" content="miniGames" />

      <section className="mt-20 max-w-3xl mx-auto space-y-6 font-ibm-plex-mono relative z-10">
        <div className="games-hero text-secondary text-sm mb-6">
          {t("select")}
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
              {t("launch")}
            </span>
          </motion.div>
        ))}
      </section>

      <section className="unity-block mt-28 max-w-5xl space-y-8 relative z-10">
        <h2 className="font-geist text-2xl md:text-3xl text-primary">
          {t("unity.title")}
        </h2>

        <div className="border border-neutral-800 bg-secondary-bg aspect-video w-full flex items-center justify-center text-secondary font-ibm-plex-mono text-sm" />

        <p className="text-secondary font-ibm-plex-mono text-sm leading-relaxed max-w-3xl">
          {t("unity.description")}
        </p>
      </section>
    </div>
  );
};

export default MiniGamesPage;
