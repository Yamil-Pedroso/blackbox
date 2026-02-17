import { useEffect, useRef } from "react";
import { Link } from "@tanstack/react-router";
import SectionHero from "../components/common/SectionHero";
import SectionLabel from "../components/common/SectionLabel";
import gsap from "gsap";

const experiments = [
  {
    title: "Booking Platform Simulation",
    description:
      "End-to-end booking UI simulation including search, availability calendar, pricing logic, multi-step flow and payment states.",
    tag: "Product System",
    status: "Active",
    route: "/experiments/booking-simulation",
  },
  {
    title: "Scroll Physics Engine",
    description:
      "Custom inertia-based scroll behavior using velocity tracking and frame interpolation.",
    tag: "Motion",
    status: "Active",
  },
  {
    title: "Shader Noise Study",
    description:
      "Fragment shader experiment exploring procedural noise and dynamic color blending.",
    tag: "WebGL",
    status: "Prototype",
  },
  {
    title: "3D Layout Morph",
    description:
      "FLIP-based transformation system between grid and compact layouts.",
    tag: "Animation",
    status: "Archived",
  },
];

const ExperimentsPage = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline();

      tl.from(".exp-hero", {
        y: 60,
        opacity: 0,
        duration: 0.9,
        ease: "power3.out",
        stagger: 0.15,
      });

      tl.from(
        ".exp-item",
        {
          y: 60,
          opacity: 0,
          duration: 0.8,
          ease: "power3.out",
          stagger: 0.15,
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
        <div className="exp-hero">
          <SectionLabel text="Research & Exploration" />
        </div>

        <div className="exp-hero">
          <SectionHero
            title="Experiments Lab"
            description="A controlled environment for rendering research, motion systems and interactive prototypes. Each entry represents a technical study."
          />
        </div>
      </section>

      <section className="relative">
        <div className="hidden md:block absolute left-3 top-0 bottom-0 w-px bg-neutral-800" />

        <div className="space-y-16">
          {experiments.map((exp) => (
            <div key={exp.title} className="exp-item group relative md:pl-12">
              <div className="hidden md:block absolute left-1.75 top-1 w-3 h-3 rounded-full bg-neutral-600 group-hover:bg-primary transition-colors" />

              <div className="flex flex-wrap items-center gap-4 text-xs font-ibm-plex-mono text-secondary">
                <span>{exp.tag}</span>
                <span
                  className={`${
                    exp.status === "Active"
                      ? "text-green"
                      : exp.status === "Prototype"
                        ? "text-yellow-400"
                        : "text-neutral-500"
                  }`}
                >
                  {exp.status}
                </span>
              </div>

              <h2 className="text-2xl md:text-3xl xl:text-4xl font-geist text-primary mt-3 group-hover:translate-x-2 transition-transform duration-300">
                {exp.title}
              </h2>

              <p className="text-secondary font-ibm-plex-mono text-sm md:text-base max-w-2xl mt-4 leading-relaxed">
                {exp.description}
              </p>

              {exp.route ? (
                <Link to={exp.route}>
                  <button className="mt-4 text-sm font-ibm-plex-mono text-secondary opacity-70 group-hover:opacity-100 transition-opacity">
                    Launch →
                  </button>
                </Link>
              ) : (
                <button className="mt-4 text-sm font-ibm-plex-mono text-secondary opacity-50 cursor-not-allowed">
                  Coming Soon
                </button>
              )}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default ExperimentsPage;
