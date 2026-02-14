import { useEffect, useRef } from "react";
import gsap from "gsap";

const MainContent = () => {
  const titleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (!titleRef.current) return;

    const ctx = gsap.context(() => {
      const words = titleRef.current?.querySelectorAll(".word");

      if (!words) return;

      gsap.fromTo(
        words,
        {
          y: 100,
          opacity: 0,

          scale: 0.9,
        },
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
    <div className="flex bg-main-bg min-h-screen">
      <div className="p-8 space-y-6 w-full">
        <h1
          ref={titleRef}
          className="font-geist font-bold text-[5.75rem] text-primary leading-[1.1] overflow-hidden"
        >
          <span className="word inline-block mr-4">Welcome</span>
          <span className="word inline-block mr-4">to</span>
          <span className="word inline-block mr-4">the</span>
          <span className="word inline-block mr-4 text-secondary">
            Blackbox
          </span>
          <span className="word inline-block">Frontend!</span>
        </h1>

        <p className="font-ibm-plex-mono text-secondary max-w-3xl">
          This is the main entry point of the application. Use the navigation to
          explore different features and functionalities. The application is
          built using React, TypeScript, and TanStack Router for seamless
          routing and state management.
        </p>

        <p className="font-ibm-plex-mono text-secondary max-w-3xl">
          This is the main entry point of the application. Use the navigation to
          explore different features and functionalities.
        </p>
      </div>
    </div>
  );
};

export default MainContent;
