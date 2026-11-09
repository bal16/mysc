import { clsx } from "clsx";

interface IndicatorProps {
  isSupported: boolean;
  isEnabled: boolean;
  activeIcon: React.ReactNode;
  inactiveIcon: React.ReactNode;
  label: string;
  onToggle: () => void;
}

export const Indicator = ({
  isSupported,
  isEnabled,
  activeIcon,
  inactiveIcon,
  label,
  onToggle,
}: IndicatorProps) => {
  if (!isSupported) return null;

  return (
    <button
      type="button"
      onClick={onToggle}
      title={`${label}: ${isEnabled ? "On" : "Off"}`}
      aria-label={`${label}: ${isEnabled ? "On" : "Off"}`}
      aria-pressed={isEnabled}
      className={clsx(
        "flex h-10 w-10 items-center justify-center rounded-full border",
        "backdrop-blur-md shadow-sm transition-all duration-200",
        "hover:scale-105 active:scale-95",
        "focus:outline-none focus:ring-2 focus:ring-primary/20",
        "horizontal:rotate-0 vertical:rotate-90",
        isEnabled
          ? "border-primary/40 bg-primary/15 text-primary"
          : "border-border/50 bg-surface text-foreground/70"
      )}
    >
      {isEnabled ? activeIcon : inactiveIcon}
    </button>
  );
};
