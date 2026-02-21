import { Link, useRouterState } from "@tanstack/react-router";
import { GiHamburgerMenu } from "react-icons/gi";
import { BsInfoCircle } from "react-icons/bs";
import { useState, useEffect, useRef } from "react";
import { useTheme } from "../lib/hooks/useTheme";
import assets from "../assets";
import gsap from "gsap";
import { useTranslation } from "react-i18next";
import Button from "../components/common/Button";

/*interface TopNavbarProps {
  itemsMenu?: { name: string; to: string }[];
  itemsMenu2?: string[];
} */

type LayoutMode = "mobile" | "medium" | "large";

const TopNavbar = () => {
  const pathname = useRouterState({
    select: (state) => state.location.pathname,
  });

  const { t } = useTranslation("topNavbar");
  const { theme, toggleTheme } = useTheme();

  const headerRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const [layout, setLayout] = useState<LayoutMode>("mobile");
  const [infoOpen, setInfoOpen] = useState(false);
  const [adminInfoOpen, setAdminInfoOpen] = useState(false);

  // 🔹 Translated Menu
  const itemsMenu = [
    { name: t("menu.home"), to: "/" },
    { name: t("menu.tools"), to: "/tools" },
    { name: t("menu.ai"), to: "/ai" },
    { name: t("menu.systems"), to: "/systems" },
    { name: t("menu.experiments"), to: "/experiments" },
    { name: t("menu.miniGames"), to: "/mini-games" },
  ];

  // 🔹 Translated Status Items
  const itemsMenu2 = [t("status.open"), t("status.location"), t("status.time")];

  const defaultInfoItems = [
    {
      title: t("info.location"),
      icon: assets.map,
      size: "w-4 h-4",
    },
    {
      title: t("info.languages"),
      icon: assets.lan_gray,
      size: "w-6 h-6",
    },
    {
      title: "+41 79 532 65 19",
      icon: assets.phone_gray,
      size: "w-4 h-4",
    },
  ];

  const currentTime = new Date().toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  useEffect(() => {
    const updateLayout = () => {
      if (window.innerWidth >= 1370) {
        setLayout("large");
      } else if (window.innerWidth >= 810) {
        setLayout("medium");
      } else {
        setLayout("mobile");
      }
    };

    updateLayout();
    window.addEventListener("resize", updateLayout);

    return () => window.removeEventListener("resize", updateLayout);
  }, []);

  useEffect(() => {
    if (!headerRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".animate-section",
        { opacity: 0, y: -10 },
        {
          opacity: 1,
          y: 0,
          duration: 0.4,
          ease: "power2.out",
          stagger: 0.05,
        },
      );
    }, headerRef);

    return () => ctx.revert();
  }, [layout]);

  useEffect(() => {
    if (!dropdownRef.current) return;

    if (infoOpen) {
      gsap.fromTo(
        dropdownRef.current,
        { opacity: 0, y: -10 },
        { opacity: 1, y: 0, duration: 0.3, ease: "power2.out" },
      );
    }
  }, [infoOpen]);

  return (
    <header
      ref={headerRef}
      className="w-full h-8 border-b border-neutral-800 flex items-center justify-between large:px-4 bg-secondary-bg relative"
    >
      {/* MOBILE + MEDIUM LEFT */}
      {layout !== "large" && (
        <div className="flex items-stretch gap-4 animate-section">
          <div className="w-8 h-8 bg-neutral-700">
            <img
              src={assets.avatar}
              alt="Logo"
              className="w-full h-full object-cover"
            />
          </div>
          <button onClick={() => setInfoOpen(!infoOpen)}>
            <BsInfoCircle className="text-secondary text-[18px]" />
          </button>
        </div>
      )}

      {/* LARGE */}
      {layout === "large" && (
        <div className="flex w-full h-full items-stretch animate-section">
          <div className="w-71 h-full border-r border-neutral-800 flex items-center px-4">
            <h1 className="font-ibm-plex-mono text-secondary text-[12px]">
              {t("brand")}
            </h1>
          </div>

          <ul className="flex gap-10 flex-1 mx-10 items-center">
            {itemsMenu.map((item) => {
              const isActive = pathname === item.to;

              return (
                <Link key={item.name} to={item.to}>
                  <li
                    className={`relative font-ibm-plex-mono text-[12px] cursor-pointer transition-colors duration-300 ${
                      isActive ? "text-primary" : "text-secondary"
                    }`}
                  >
                    {item.name}
                    <div
                      className={`absolute left-0 -bottom-1.25 h-px transition-all duration-700 ${
                        isActive ? "w-full bg-primary" : "w-0"
                      }`}
                    />
                  </li>
                </Link>
              );
            })}
          </ul>

          <div className="flex items-center gap-6">
            {itemsMenu2.map((item) => (
              <span
                key={item}
                className="font-ibm-plex-mono text-secondary text-[12px]"
              >
                {item === t("status.open") ? (
                  <span className="relative inline-flex items-center gap-2 bg-green/10 px-3 py-1 rounded-md">
                    <span className="relative flex justify-center items-center h-2 w-2">
                      <span className="absolute h-full w-full rounded-full bg-green opacity-40 animate-ping"></span>
                      <span className="relative h-1.5 w-1.5 rounded-full bg-green"></span>
                    </span>
                    <span className="text-green">{item}</span>
                  </span>
                ) : item === t("status.time") ? (
                  <span>
                    {t("status.time")} {currentTime}
                  </span>
                ) : (
                  item
                )}
              </span>
            ))}

            <button
              onClick={toggleTheme}
              className="text-secondary hover:text-primary transition-colors duration-300"
            >
              {theme === "dark" ? (
                <img
                  className="w-4 h-4 cursor-pointer"
                  src={assets.sun_gray}
                  alt="Sun"
                />
              ) : (
                <img
                  className="w-3 h-3 cursor-pointer"
                  src={assets.moon_black}
                  alt="Moon"
                />
              )}
            </button>
          </div>
        </div>
      )}

      {/* MEDIUM */}
      {layout >= "medium" && (
        <div className="flex items-center gap-6 animate-section px-4">
          <span className="font-ibm-plex-mono text-secondary text-[12px]">
            {t("brand")}
          </span>

          <button
            onClick={toggleTheme}
            className="text-secondary hover:text-primary transition-colors"
          >
            {theme === "dark" ? (
              <img
                className="w-4 h-4 cursor-pointer"
                src={assets.sun_gray}
                alt="Sun"
              />
            ) : (
              <img
                className="w-3 h-3 cursor-pointer"
                src={assets.moon_black}
                alt="Moon"
              />
            )}
          </button>

          <button
            onClick={() => setAdminInfoOpen(!adminInfoOpen)}
            className="text-secondary hover:text-primary transition-colors"
          >
            <GiHamburgerMenu className="text-secondary text-[18px]" />
          </button>
        </div>
      )}

      {/* INFO DROPDOWN */}
      {infoOpen && layout !== "large" && (
        <div
          ref={dropdownRef}
          className="absolute top-full left-0 w-full bg-secondary-bg p-6 z-50"
        >
          <div className="flex items-center space-x-4 mb-6">
            <div className="w-10 h-10 bg-neutral-700">
              <img
                src={assets.avatar}
                alt="avatar"
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <h2 className="font-ibm-plex-mono text-secondary text-[17px]">
                Yamil Pedroso
              </h2>
              <p className="font-ibm-plex-mono text-secondary text-[13px]">
                {t("profile.role")}
              </p>
            </div>
          </div>

          <div className="mt-6 flex flex-col gap-4">
            <p className="font-ibm-plex-mono text-secondary text-[14px] leading-relaxed">
              {t("profile.description")}
            </p>

            {/* Info List */}
            <nav>
              <ul className="space-y-4">
                {defaultInfoItems.map((item) => (
                  <li
                    key={item.title}
                    className="font-ibm-plex-mono text-secondary text-[13px] flex items-center gap-3"
                  >
                    <div className="flex items-center justify-center">
                      <img
                        src={item.icon}
                        alt={item.title}
                        className={`${item.size} object-contain`}
                        style={{ imageRendering: "pixelated" }}
                      />
                    </div>

                    <span>{item.title}</span>
                  </li>
                ))}
              </ul>
            </nav>

            {/* Status Section */}
            <div className="border-t border-neutral-800 pt-6">
              <h3 className="font-ibm-plex-mono text-secondary text-[12px] uppercase tracking-widest mb-4">
                {t("status.title")}
              </h3>

              <div className="space-y-2 font-ibm-plex-mono text-secondary text-sm">
                <div className="flex justify-between">
                  <span>{t("status.modules")}</span>
                  <span>5</span>
                </div>

                <div className="flex justify-between">
                  <span>{t("status.version")}</span>
                  <span>v1.0</span>
                </div>

                <div className="flex justify-between">
                  <span>{t("status.state")}</span>
                  <span className="text-green">{t("status.active")}</span>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-auto pt-6 border-t border-neutral-800 flex gap-4 mb-3.5">
            <Button
              className="bg-white text-tertiary text-[13px]"
              onClick={() => {}}
            >
              {t("buttons.schedule")}
            </Button>

            <Button
              className="border border-white text-white text-[13px]"
              onClick={() => {}}
            >
              {t("buttons.journey")}
            </Button>
          </div>
        </div>
      )}

      {/* ADMIN DROPDOWN */}
      {adminInfoOpen && (layout === "medium" || layout === "mobile") && (
        <div
          ref={dropdownRef}
          className="absolute top-full right-0 w-48 bg-secondary-bg p-4 z-50"
        >
          <ul className="flex flex-col border border-neutral-800 items-end">
            {itemsMenu.map((item) => (
              <Link key={item.name} to={item.to}>
                <li className="text-secondary font-ibm-plex-mono text-[11px] hover:text-primary transition-colors mt-1.5 border border-transparent hover:border-primary rounded-sm px-2 py-1">
                  {item.name}
                </li>
              </Link>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
};

export default TopNavbar;
