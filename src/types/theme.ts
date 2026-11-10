export type ColorPalette = "origin" | "premium-warm";
export type DisplayMode = "light" | "dark" | "amoled";

export interface ThemePreferences {
  palette: ColorPalette;
  mode: DisplayMode;
}

// Deprecated: Kept for backward compatibility
export type Theme = "origin" | "amoled" | "premium-warm";
