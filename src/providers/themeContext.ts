import { createContext } from "react";
import { ColorPalette, DisplayMode, Theme } from "@/types";

export interface ThemeContextType {
  palette: ColorPalette;
  setPalette: (palette: ColorPalette) => void;
  mode: DisplayMode;
  setMode: (mode: DisplayMode) => void;
  resetTheme: () => void;
  /** @deprecated Use palette and mode instead */
  theme: Theme;
  /** @deprecated Use setPalette and setMode instead */
  setTheme: (theme: Theme) => void;
}

export const ThemeContext = createContext<ThemeContextType | undefined>(
  undefined
);
