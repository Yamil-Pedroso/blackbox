import { useEffect, useRef } from "react";
import { useRouterState } from "@tanstack/react-router";

const moduleInfoMap: Record<string, string[]> = {
  "/": ["Overview", "Blackbox Structure", "Modules"],
  "/experiments": ["Overview", "Purpose", "Planned Explorations", "Status"],
  "/tools": ["Overview", "Purpose", "Planned Utilities", "Status"],
  "/ai": ["Overview", "Purpose", "Planned Integrations", "Status"],
  "/systems": ["Overview", "Purpose", "Architecture Plan", "Status"],
  "/mini-games": ["Overview", "Purpose", "Planned Concepts", "Status"],
};

const RightSidebar = () => {
  const pathname = useRouterState({
    select: (state) => state.location.pathname,
  });

  const textRef = useRef<HTMLParagraphElement>(null);

  const baseRoute = pathname === "/" ? "/" : "/" + pathname.split("/")[1];

  const items = moduleInfoMap[baseRoute] || [];

  useEffect(() => {
    if (!textRef.current) return;

    const finalText = "Blackbox is currently in active development.";

    const chars =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    let currentIndex = 0;
    let currentText = "";

    textRef.current.innerText = "";

    const typeNext = () => {
      if (!textRef.current) return;
      if (currentIndex >= finalText.length) return;

      let scrambleCount = 0;
      const scrambleMax = 6;

      const scrambleInterval = setInterval(() => {
        if (!textRef.current) return;

        if (scrambleCount < scrambleMax) {
          const randomChar = chars[Math.floor(Math.random() * chars.length)];

          textRef.current.innerText = currentText + randomChar;

          scrambleCount++;
        } else {
          clearInterval(scrambleInterval);

          currentText += finalText[currentIndex];
          textRef.current.innerText = currentText;

          currentIndex++;
          setTimeout(typeNext, 40);
        }
      }, 15);
    };

    typeNext();
  }, [pathname]);

  return (
    <aside className="border-l border-neutral-800 bg-secondary-bg hidden large:flex flex-col h-screen px-8 py-10">
      <div>
        <h3 className="font-ibm-plex-mono text-secondary text-[12px] uppercase tracking-widest">
          Section
        </h3>

        <div className="border-t border-neutral-800 mt-4 mb-6" />

        <ul className="space-y-3 font-ibm-plex-mono text-secondary text-sm">
          {items.map((item) => (
            <li key={item} className="cursor-default opacity-80">
              {item}
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-auto pt-6 border-t border-neutral-800 mb-3.5 w-35">
        <p
          ref={textRef}
          className="font-ibm-plex-mono text-secondary text-xs opacity-70 "
        />
      </div>
    </aside>
  );
};

export default RightSidebar;
