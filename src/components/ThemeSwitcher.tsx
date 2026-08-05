import { useTheme } from "@/providers/ThemeProvider";
import { Theme } from "@/types";
import { SettingsSelectOption } from "./SettingsSelectOption";
import { clsx } from "clsx";

export const ThemeSwitcher = () => {
  const { theme, setTheme } = useTheme();

  return (
    <div className="flex flex-col gap-2">
      <label className="text-foreground font-medium">Theme</label>
      <select
        value={theme}
        onChange={(e) => setTheme(e.target.value as Theme)}
        className={clsx(
          "bg-surface text-foreground border border-border rounded-md px-3 py-2 outline-none transition-all cursor-pointer",
          "focus:ring-2 focus:ring-primary/20 focus:border-primary hover:border-primary/50"
        )}
      >
        <SettingsSelectOption value="origin">Origin</SettingsSelectOption>
        <SettingsSelectOption value="amoled">AMOLED</SettingsSelectOption>
        <SettingsSelectOption value="premium-warm">Premium Warm</SettingsSelectOption>
      </select>
    </div>
  );
};
