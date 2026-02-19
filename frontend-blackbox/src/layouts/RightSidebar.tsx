import { useEffect, useRef } from "react";
import { useRouterState } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";

const routeKeyMap: Record<string, string> = {
  "/": "home",
  "/experiments": "experiments",
  "/tools": "tools",
  "/ai": "ai",
  "/systems": "systems",
  "/mini-games": "miniGames",
};

const RightSidebar = () => {
  const { i18n } = useTranslation();
  const { t } = useTranslation("rightSidebar");

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };
  const pathname = useRouterState({
    select: (state) => state.location.pathname,
  });

  const textRef = useRef<HTMLParagraphElement>(null);
  const hasAnimated = useRef(false);

  const baseRoute = pathname === "/" ? "/" : "/" + pathname.split("/")[1];

  const routeKey = routeKeyMap[baseRoute] || "home";

  const items = t(`routes.${routeKey}`, { returnObjects: true }) as string[];

  useEffect(() => {
    if (!textRef.current) return;

    const finalText = t("developmentStatus");

    if (hasAnimated.current) {
      textRef.current.innerText = finalText;
      return;
    }

    hasAnimated.current = true;

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
          setTimeout(typeNext, 2);
        }
      }, 15);
    };

    typeNext();
  }, [t, routeKey, pathname]);

  return (
    <aside className="border-l border-neutral-800 bg-secondary-bg hidden large:flex flex-col h-screen px-8 py-10">
      <div>
        <h3 className="font-ibm-plex-mono text-secondary text-[12px] uppercase tracking-widest">
          {t("sectionLabel")}
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

      <div className="flex gap-2 text-xs mt-6">
        <button onClick={() => changeLanguage("en")}>EN</button>
        <button onClick={() => changeLanguage("es")}>ES</button>
        <button onClick={() => changeLanguage("de")}>DE</button>
      </div>

      <div className="mt-auto pt-6 border-t border-neutral-800 mb-3.5 w-35">
        <p
          ref={textRef}
          className="font-ibm-plex-mono text-secondary text-xs opacity-70"
        />
      </div>
    </aside>
  );
};

export default RightSidebar;
