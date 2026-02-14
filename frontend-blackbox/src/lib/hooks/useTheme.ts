import { useEffect, useState } from "react";

type Theme = "dark" | "light";

export const useTheme = () => {
  const [theme, setTheme] = useState<Theme>("dark");

  useEffect(() => {
    const saved = localStorage.getItem("theme") as Theme | null;

    if (saved) {
      document.documentElement.classList.toggle("light", saved === "light");
      setTheme(saved);
    }
  }, []);

  const toggleTheme = () => {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);

    document.documentElement.classList.toggle("light", next === "light");
    localStorage.setItem("theme", next);
  };

  return { theme, toggleTheme };
};
