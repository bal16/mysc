import { clsx } from "clsx";

interface HapticsToggleProps {
  isSupported: boolean;
  isEnabled: boolean;
  onToggle: () => void;
}

export const HapticsToggle = ({
  isSupported,
  isEnabled,
  onToggle,
}: HapticsToggleProps) => {
  if (!isSupported) return null;

  return (
    <div className="flex items-center justify-between gap-4 py-1">
      <div className="flex flex-col gap-0.5">
        <label
          className="text-foreground font-medium cursor-pointer"
          onClick={onToggle}
        >
          Haptic Feedback
        </label>
        <span className="text-xs text-foreground/60">
          Vibrate on score changes
        </span>
      </div>
      <button
        type="button"
        role="switch"
        aria-checked={isEnabled}
        aria-label="Haptic Feedback"
        onClick={onToggle}
        className={clsx(
          "relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent",
          "transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-primary/20",
          isEnabled ? "bg-primary" : "bg-muted"
        )}
      >
        <span
          className={clsx(
            "pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-md ring-0",
            "transition duration-200 ease-in-out",
            isEnabled ? "translate-x-5" : "translate-x-0"
          )}
        />
      </button>
    </div>
  );
};
