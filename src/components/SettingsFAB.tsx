import { RiSettingsLine } from "react-icons/ri";
import { clsx } from "clsx";

interface SettingsFABProps {
  onClick: () => void;
}

export const SettingsFAB = ({ onClick }: SettingsFABProps) => {
  return (
    <button
      onClick={onClick}
      className={clsx(
        "absolute top-4 right-4 z-40",
        "flex items-center justify-center w-11 h-11 rounded-full",
        "bg-surface text-foreground border border-border/50",
        "shadow-sm hover:shadow-md backdrop-blur-md",
        "transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]",
        "hover:bg-muted hover:scale-105 hover:rotate-90",
        "active:scale-95",
        "focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
      )}
      aria-label="Open Settings"
    >
      <RiSettingsLine className="w-5 h-5 text-foreground" />
    </button>
  );
};
