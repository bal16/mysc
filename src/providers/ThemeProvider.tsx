import React, { createContext, useContext, useEffect, useState } from "react";
import { Theme } from "@/types";

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

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
