import { useEffect, useRef } from "react";
import gsap from "gsap";

interface SectionHeroProps {
  title: string;
  description: string;
}

const SectionHero = ({ title, description }: SectionHeroProps) => {
  const titleRef = useRef<HTMLHeadingElement>(null);

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
          duration: 1,
          ease: "power4.out",
          stagger: 0.08,
        },
      );
    }, titleRef);

    return () => ctx.revert();
  }, []);

  const splitTitle = title.split(" ");

  return (
    <section className="space-y-8">
      <h1
        ref={titleRef}
        className="
          font-geist font-bold text-primary leading-[1.05] overflow-hidden
          text-4xl sm:text-5xl md:text-6xl xl:text-[5.75rem]
        "
      >
        {splitTitle.map((word, i) => (
          <span key={i} className="word inline-block mr-3 sm:mr-4">
            {i === splitTitle.length - 1 ? (
              <span className="text-secondary">{word}</span>
            ) : (
              `${word} `
            )}
          </span>
        ))}
      </h1>

      <p className="font-ibm-plex-mono text-secondary max-w-2xl text-sm md:text-base leading-relaxed">
        {description}
      </p>
    </section>
  );
};

export default SectionHero;
