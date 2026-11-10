import React, { useEffect, useState } from "react";
import { ColorPalette, DisplayMode, Theme } from "@/types";
import {
  getCssVar,
  updateMetaTag,
  updateRootBackgroundColor,
} from "@/utils/themeDom";
import { ThemeContext } from "./themeContext";

const DEFAULT_PALETTE: ColorPalette = "origin";
const DEFAULT_MODE: DisplayMode = "light";

function isValidPalette(value: string | null): value is ColorPalette {
  return value === "origin" || value === "premium-warm";
}

function isValidMode(value: string | null): value is DisplayMode {
  return value === "light" || value === "dark" || value === "amoled";
}

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [palette, setPaletteState] = useState<ColorPalette>(() => {
    try {
      const savedPalette = localStorage.getItem("theme_palette");
      if (isValidPalette(savedPalette)) {
        return savedPalette;
      }
      const legacyTheme = localStorage.getItem("theme");
      if (legacyTheme === "premium-warm") {
        return "premium-warm";
      }
      if (legacyTheme === "origin" || legacyTheme === "amoled") {
        return "origin";
      }
    } catch (e) {
      console.error("Failed to access localStorage", e);
    }
    return DEFAULT_PALETTE;
  });

  const [mode, setModeState] = useState<DisplayMode>(() => {
    try {
      const savedMode = localStorage.getItem("theme_mode");
      if (isValidMode(savedMode)) {
        return savedMode;
      }
      const legacyTheme = localStorage.getItem("theme");
      if (legacyTheme === "amoled") {
        return "amoled";
      }
      if (legacyTheme === "origin" || legacyTheme === "premium-warm") {
        return "light";
      }
    } catch (e) {
      console.error("Failed to access localStorage", e);
    }
    return DEFAULT_MODE;
  });

  useEffect(() => {
    const html = document.documentElement;

    html.classList.remove(
      "theme-origin",
      "theme-amoled",
      "theme-premium-warm",
      "palette-origin",
      "palette-premium-warm",
      "mode-light",
      "mode-dark",
      "mode-amoled",
      "dark"
    );

    html.classList.add(`palette-${palette}`, `mode-${mode}`);
    if (mode === "dark" || mode === "amoled") {
      html.classList.add("dark");
    }

    // Read colors from CSS variables (single source of truth)
    // Class must be applied first before reading computed style
    // Note: theme-color drives the PWA safe-area chrome (status bar / nav bar).
    // Use --bg so the safe area always matches the app background (black in AMOLED, charcoal in Dark, etc.).
    const bgColor = getCssVar("--bg");
    updateMetaTag("theme-color", bgColor);
    updateMetaTag("background-color", bgColor);
    updateRootBackgroundColor(bgColor);

    try {
      localStorage.setItem("theme_palette", palette);
      localStorage.setItem("theme_mode", mode);
    } catch (e) {
      console.error("Failed to save theme to localStorage", e);
    }
  }, [palette, mode]);

  const setPalette = (newPalette: ColorPalette) => {
    setPaletteState(newPalette);
  };

  const setMode = (newMode: DisplayMode) => {
    setModeState(newMode);
  };

  const resetTheme = () => {
    setPaletteState(DEFAULT_PALETTE);
    setModeState(DEFAULT_MODE);
  };

  // Backward compatibility mapping
  const legacyTheme: Theme =
    mode === "amoled"
      ? "amoled"
      : palette === "premium-warm"
        ? "premium-warm"
        : "origin";

  const setTheme = (newTheme: Theme) => {
    if (newTheme === "amoled") {
      setModeState("amoled");
    } else if (newTheme === "premium-warm") {
      setPaletteState("premium-warm");
      setModeState("light");
    } else {
      setPaletteState("origin");
      setModeState("light");
    }
  };

  return (
    <ThemeContext.Provider
      value={{
        palette,
        setPalette,
        mode,
        setMode,
        resetTheme,
        theme: legacyTheme,
        setTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};
