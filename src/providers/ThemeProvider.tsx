import React, { createContext, useContext, useEffect, useState } from "react";
import { Theme } from "@/types";

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

function updateMetaTag(name: string, content: string) {
  let meta = document.querySelector<HTMLMetaElement>(`meta[name="${name}"]`);
  if (!meta) {
    meta = document.createElement("meta");
    meta.setAttribute("name", name);
    document.head.appendChild(meta);
  }
  meta.setAttribute("content", content);
}

function getCssVar(name: string): string {
  return getComputedStyle(document.documentElement).getPropertyValue(name).trim();
}

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [theme, setThemeState] = useState<Theme>(() => {
    try {
      const savedTheme = localStorage.getItem("theme");
      if (savedTheme === "origin" || savedTheme === "amoled" || savedTheme === "premium-warm") {
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

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
