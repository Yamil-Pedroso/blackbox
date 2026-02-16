import { useEffect, useRef } from "react";
import SectionHero from "../components/common/SectionHero";
import SectionLabel from "../components/common/SectionLabel";
import gsap from "gsap";

const SystemsPage = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline();

      tl.from(".systems-hero", {
        y: 60,
        opacity: 0,
        duration: 0.9,
        ease: "power3.out",
        stagger: 0.15,
      });

      tl.from(
        ".systems-block",
        {
          y: 60,
          opacity: 0,
          duration: 0.9,
          ease: "power3.out",
        },
        "-=0.4",
      );

      tl.from(
        ".systems-meta",
        {
          y: 40,
          opacity: 0,
          duration: 0.8,
          ease: "power3.out",
          stagger: 0.1,
        },
        "-=0.5",
      );

      tl.from(
        ".systems-actions",
        {
          y: 40,
          opacity: 0,
          duration: 0.8,
          ease: "power3.out",
          stagger: 0.08,
        },
        "-=0.4",
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="p-8 max-w-6xl space-y-20">
      <section className="space-y-6">
        <div className="systems-hero">
          <SectionLabel text="Backend Architecture" />
        </div>

        <div className="systems-hero">
          <SectionHero
            title="Systems Engineering"
            description="Backend architecture, secure authentication flows and structured service layers. This section demonstrates system-level thinking, not just CRUD applications."
          />
        </div>
      </section>

      <section className="systems-block border border-neutral-800 bg-secondary-bg p-8 space-y-8">
        <div className="space-y-4">
          <h2 className="text-primary font-geist text-3xl">
            Access Control Engine
          </h2>

          <p className="text-secondary font-ibm-plex-mono text-sm leading-relaxed max-w-3xl">
            A role-based authentication system built with Node.js, Express and
            PostgreSQL. Includes JWT access tokens, refresh tokens,
            middleware-based route protection and structured service layers.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 font-ibm-plex-mono text-sm text-secondary">
          <div className="systems-meta">
            <span className="block text-primary mb-2">Architecture</span>
            Controller → Service → Repository
          </div>

          <div className="systems-meta">
            <span className="block text-primary mb-2">Security</span>
            JWT + Role Guards
          </div>

          <div className="systems-meta">
            <span className="block text-primary mb-2">Status</span>
            <span className="text-green">In Development</span>
          </div>
        </div>

        <div className="pt-6 border-t border-neutral-800 flex flex-wrap gap-4">
          <button className="systems-actions border border-neutral-700 px-4 py-2 text-secondary font-ibm-plex-mono text-xs opacity-50 cursor-not-allowed">
            Live API Explorer (Coming Soon)
          </button>

          <button className="systems-actions border border-neutral-700 px-4 py-2 text-secondary font-ibm-plex-mono text-xs opacity-50 cursor-not-allowed">
            Architecture Diagram
          </button>

          <button className="systems-actions border border-neutral-700 px-4 py-2 text-secondary font-ibm-plex-mono text-xs opacity-50 cursor-not-allowed">
            Protected Route Demo
          </button>

          <button className="systems-actions border border-neutral-700 px-4 py-2 text-secondary font-ibm-plex-mono text-xs opacity-50 cursor-not-allowed">
            Real-time Logs
          </button>
        </div>
      </section>
    </div>
  );
};

export default SystemsPage;
