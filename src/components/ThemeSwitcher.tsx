import { useTheme } from "@/providers/ThemeProvider";
import { Theme } from "@/types";
import { SettingsSelectOption } from "./SettingsSelectOption";

export const ThemeSwitcher = () => {
  const { theme, setTheme } = useTheme();

  return (
    <div className="flex flex-col gap-2">
      <label className="text-foreground font-medium">Theme</label>
      <select
        value={theme}
        onChange={(e) => setTheme(e.target.value as Theme)}
        className="bg-surface text-foreground border border-border rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-primary"
      >
        <SettingsSelectOption value="origin">Origin</SettingsSelectOption>
        <SettingsSelectOption value="amoled">AMOLED</SettingsSelectOption>
        <SettingsSelectOption value="premium-warm">Premium Warm</SettingsSelectOption>
      </select>
    </div>
  );
};
