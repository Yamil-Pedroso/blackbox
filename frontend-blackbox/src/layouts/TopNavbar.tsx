import { Link, useRouterState } from "@tanstack/react-router";
import { GiHamburgerMenu } from "react-icons/gi";
import { BsInfoCircle } from "react-icons/bs";
import { FaMapMarkerAlt, FaPhone } from "react-icons/fa";
import { useState, useEffect, useRef } from "react";
import { FiSun, FiMoon } from "react-icons/fi";
import { useTheme } from "../lib/hooks/useTheme";
import assets from "../assets";
import gsap from "gsap";
import { LuLanguages } from "react-icons/lu";
import { useTranslation } from "react-i18next";

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

  // 🔹 Translated Info Items
  const infoItems = [
    { title: t("status.location"), icon: FaMapMarkerAlt },
    { title: t("profile.languages"), icon: LuLanguages },
    { title: "+41 79 532 65 19", icon: FaPhone },
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
              {theme === "dark" ? <FiSun size={16} /> : <FiMoon size={16} />}
            </button>
          </div>
        </div>
      )}

      {/* MEDIUM */}
      {layout === "medium" && (
        <div className="flex items-center gap-6 animate-section px-4">
          <span className="font-ibm-plex-mono text-secondary text-[12px]">
            {t("brand")}
          </span>

          <button
            onClick={toggleTheme}
            className="text-secondary hover:text-primary transition-colors"
          >
            {theme === "dark" ? <FiSun size={16} /> : <FiMoon size={16} />}
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
          className="absolute top-full left-0 w-full bg-secondary-bg border border-blue-600 p-6 z-50"
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
              <h2 className="font-ibm-plex-mono text-secondary text-[18px]">
                Yamil Pedroso
              </h2>
              <p className="font-ibm-plex-mono text-secondary text-[14px]">
                {t("profile.role")}
              </p>
            </div>
          </div>

          <ul className="space-y-5">
            {infoItems.map((item) => {
              const Icon = item.icon;
              const LanIcon = infoItems[1].icon;

              return (
                <li
                  key={item.title}
                  className="flex items-center gap-3 text-secondary font-ibm-plex-mono text-sm"
                >
                  {Icon === LuLanguages ? (
                    <LanIcon className="text-[1.2rem]" />
                  ) : (
                    <Icon className="text-[0.9rem]" />
                  )}
                  {item.title}
                </li>
              );
            })}
          </ul>
        </div>
      )}

      {/* ADMIN DROPDOWN */}
      {adminInfoOpen && (layout === "medium" || layout === "mobile") && (
        <div
          ref={dropdownRef}
          className="absolute top-full right-0 w-48 bg-secondary-bg border border-blue-700 p-4 z-50"
        >
          <ul className="space-y-3">
            {itemsMenu.map((item) => (
              <Link key={item.name} to={item.to}>
                <li className="text-secondary font-ibm-plex-mono text-sm hover:text-primary transition-colors">
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
