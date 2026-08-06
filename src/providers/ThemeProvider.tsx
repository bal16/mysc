import React, { useEffect, useState } from "react";
import { Theme } from "@/types";
import { getCssVar, updateMetaTag } from "@/utils/themeDom";
import { ThemeContext } from "./themeContext";

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [theme, setThemeState] = useState<Theme>(() => {
    try {
      const savedTheme = localStorage.getItem("theme");
      if (
        savedTheme === "origin" ||
        savedTheme === "amoled" ||
        savedTheme === "premium-warm"
      ) {
        return savedTheme as Theme;
      }
    } catch (e) {
      console.error("Failed to access localStorage", e);
    }
    return "origin"; // fallback
  });

  useEffect(() => {
    const html = document.documentElement;
    html.classList.remove("theme-origin", "theme-amoled", "theme-premium-warm");
    html.classList.add(`theme-${theme}`);

    // Read colors from CSS variables (single source of truth)
    // Class must be applied first before reading computed style
    updateMetaTag("theme-color", getCssVar("--primary"));
    updateMetaTag("background-color", getCssVar("--bg"));

    try {
      localStorage.setItem("theme", theme);
    } catch (e) {
      console.error("Failed to save theme to localStorage", e);
    }
  }, [theme]);

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
