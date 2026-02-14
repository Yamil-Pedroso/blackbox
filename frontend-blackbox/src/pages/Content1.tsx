import { useEffect, useRef } from "react";
import ProjectsGallery from "../components/ProjectsGallery";
import gsap from "gsap";

const Content1 = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      const title = containerRef.current?.querySelector(
        ".animated-title",
      ) as HTMLElement | null;
      const paragraphs = containerRef.current?.querySelectorAll(
        ".animated-paragraph",
      ) as NodeListOf<HTMLElement> | undefined;

      if (!title || !paragraphs) return;

      const tl = gsap.timeline();

      // Title reveal animation
      tl.fromTo(
        title,
        {
          y: 120,
          opacity: 0,
          rotateX: 90,
          transformOrigin: "bottom center",
        },
        {
          y: 0,
          opacity: 1,
          rotateX: 0,

          duration: 1.2,
          ease: "power4.out",
        },
      );

      // Paragraph cascade animation
      tl.fromTo(
        paragraphs,
        {
          y: 40,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power3.out",
          stagger: 0.08,
        },
        "-=0.6",
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="flex bg-main-bg min-h-screen">
      <div className="p-8 space-y-4 w-full">
        <h1 className="animated-title font-geist font-bold text-[5.75rem] text-primary leading-[1.1] perspective-1000">
          Welcome to the <span className="text-secondary">Content 1!</span>
        </h1>

        {Array.from({ length: 1 }).map((_, i) => (
          <p
            key={i}
            className="animated-paragraph font-ibm-plex-mono text-secondary max-w-3xl"
          >
            This is the main entry point of the application. Use the navigation
            to explore different features and functionalities. The application
            is built using React, TypeScript, and TanStack Router for seamless
            routing and state management.
          </p>
        ))}
        <ProjectsGallery />
      </div>
    </div>
  );
};

export default Content1;
