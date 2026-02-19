import { useEffect, useRef } from "react";
import SectionHero from "../components/common/SectionHero";
import SectionLabel from "../components/common/SectionLabel";
import gsap from "gsap";
import { useTranslation } from "react-i18next";

const ToolsPage = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { t } = useTranslation("tools");

  const tools = t("items", { returnObjects: true }) as {
    title: string;
    description: string;
    stack: string;
    status: string;
  }[];

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline();

      tl.from(".tools-hero", {
        y: 60,
        opacity: 0,
        duration: 0.9,
        ease: "power3.out",
        stagger: 0.15,
      });

      tl.from(
        ".tool-card",
        {
          y: 60,
          opacity: 0,
          duration: 0.8,
          ease: "power3.out",
          stagger: 0.1,
        },
        "-=0.4",
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const getStatusColor = (status: string) => {
    if (status === "active") return "text-green";
    if (status === "inProgress") return "text-yellow-400";
    if (status === "prototype") return "text-neutral-400";
    return "text-neutral-500";
  };

  return (
    <div
      ref={containerRef}
      className="px-6 md:px-10 xl:px-8 py-8 max-w-6xl space-y-20"
    >
      <section className="space-y-6">
        <div className="tools-hero">
          <SectionLabel text={t("label")} />
        </div>

        <div className="tools-hero">
          <SectionHero
            title={t("hero.title")}
            description={t("hero.description")}
          />
        </div>
      </section>

      <section className="grid sm:grid-cols-2 xl:grid-cols-3 gap-10">
        {tools.map((tool) => (
          <div
            key={tool.title}
            className="tool-card group border border-neutral-800 bg-secondary-bg p-6 flex flex-col justify-between hover:border-primary transition-colors duration-300"
          >
            <div className="space-y-4">
              <h2 className="text-primary font-geist text-xl md:text-2xl">
                {tool.title}
              </h2>

              <p className="text-secondary font-ibm-plex-mono text-sm leading-relaxed">
                {tool.description}
              </p>

              <div className="flex flex-wrap gap-3 text-xs font-ibm-plex-mono text-secondary pt-2">
                <span>{tool.stack}</span>
                <span className={getStatusColor(tool.status)}>
                  {t(`status.${tool.status}`)}
                </span>
              </div>
            </div>

            <button className="mt-6 border border-neutral-700 px-4 py-2 text-xs font-ibm-plex-mono text-secondary group-hover:border-primary group-hover:text-primary transition-colors duration-300">
              {t("launch")}
            </button>
          </div>
        ))}
      </section>
    </div>
  );
};

export default ToolsPage;
