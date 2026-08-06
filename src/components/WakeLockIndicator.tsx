import { RiSunLine } from "react-icons/ri";
import { clsx } from "clsx";

interface WakeLockIndicatorProps {
  isActive: boolean;
}

export const WakeLockIndicator = ({ isActive }: WakeLockIndicatorProps) => {
  if (!isActive) return null;

  return (
    <div
      className={clsx(
        "absolute bottom-4 left-4 z-40 pointer-events-none select-none",
        "flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium",
        "bg-surface/80 text-foreground/80 border border-border/40 shadow-sm backdrop-blur-md",
        "animate-in fade-in slide-in-from-bottom-2 duration-300"
      )}
      title="Keep Screen Awake is active"
      aria-label="Keep Screen Awake is active"
    >
      <RiSunLine className="w-3.5 h-3.5 text-primary animate-pulse" />
      <span>Keep Awake</span>
    </div>
  );
};
