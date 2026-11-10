import { useTheme } from "@/hooks/useTheme";
import { ColorPalette, DisplayMode } from "@/types";
import { SettingsSelectOption } from "./SettingsSelectOption";
import { clsx } from "clsx";

export const ThemeSwitcher = () => {
  const { palette, setPalette, mode, setMode } = useTheme();

  const selectClassName = clsx(
    "bg-surface text-foreground border border-border rounded-md px-3 py-2 outline-none transition-all cursor-pointer",
    "focus:ring-2 focus:ring-primary/20 focus:border-primary hover:border-primary/50"
  );

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <label
          htmlFor="color-palette-select"
          className="text-foreground font-medium"
        >
          Color Palette
        </label>
        <select
          id="color-palette-select"
          value={palette}
          onChange={(e) => setPalette(e.target.value as ColorPalette)}
          className={selectClassName}
        >
          <SettingsSelectOption value="origin">Origin</SettingsSelectOption>
          <SettingsSelectOption value="premium-warm">
            Premium Warm
          </SettingsSelectOption>
        </select>
      </div>

      <div className="flex flex-col gap-2">
        <label
          htmlFor="display-mode-select"
          className="text-foreground font-medium"
        >
          Display Mode
        </label>
        <select
          id="display-mode-select"
          value={mode}
          onChange={(e) => setMode(e.target.value as DisplayMode)}
          className={selectClassName}
        >
          <SettingsSelectOption value="light">Light</SettingsSelectOption>
          <SettingsSelectOption value="dark">Dark</SettingsSelectOption>
          <SettingsSelectOption value="amoled">AMOLED</SettingsSelectOption>
        </select>
      </div>
    </div>
  );
};
