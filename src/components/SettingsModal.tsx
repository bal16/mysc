import { useContext, useEffect } from "react";
import { ScoreContext } from "@/hooks";
import { SettingsNumberInput } from "./SettingsNumberInput";
import { ThemeSwitcher } from "./ThemeSwitcher";
import { WakeLockToggle } from "./WakeLockToggle";
import { HapticsToggle } from "./HapticsToggle";
import { RiCloseLine, RiArrowLeftRightLine } from "react-icons/ri";
import { clsx } from "clsx";

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  wakeLock?: {
    isSupported: boolean;
    isEnabled: boolean;
    toggle: () => void;
  };
  haptics?: {
    isSupported: boolean;
    isEnabled: boolean;
    toggle: () => void;
  };
}

export const SettingsModal = ({
  isOpen,
  onClose,
  wakeLock,
  haptics,
}: SettingsModalProps) => {
  const { state, set, swap } = useContext(ScoreContext);

  // Prevent scrolling on body when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Adaptive Panel */}
      <div
        className={clsx(
          "fixed z-50 bg-surface text-foreground overflow-y-auto",
          "p-6 sm:p-8 flex flex-col gap-8",
          "shadow-[0_20px_40px_-15px_rgba(0,0,0,0.15)] border border-border/50",
          "transform transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]",
          "portrait:inset-0 portrait:w-full portrait:max-w-none portrait:rounded-none portrait:h-full",
          "portrait:animate-in portrait:fade-in portrait:slide-in-from-right",
          "landscape:inset-y-0 landscape:right-0 landscape:w-96 landscape:max-w-[95vw] landscape:h-full landscape:rounded-none",
          "landscape:animate-in landscape:slide-in-from-right",
          "[&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
        )}
        role="dialog"
        aria-modal="true"
      >
        {/* Header */}
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-semibold tracking-tight">Settings</h2>
          <button
            onClick={onClose}
            className={clsx(
              "w-10 h-10 flex items-center justify-center rounded-full bg-muted/50",
              "hover:bg-muted hover:scale-105 active:scale-95",
              "transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]",
              "focus:outline-none focus:ring-2 focus:ring-primary/20"
            )}
            aria-label="Close Settings"
          >
            <RiCloseLine className="w-5 h-5 text-foreground/80" />
          </button>
        </div>

        {/* Content */}
        <div className="flex flex-col gap-6">
          {/* Score Adjustments grouped in a card-like area */}
          <div className="flex flex-col gap-4 p-5 bg-muted/30 rounded-2xl border border-border/40">
            <SettingsNumberInput
              label="Team A Score"
              value={state.A}
              onSave={(val) => set("A", val)}
            />

            <div className="w-full h-px bg-border/40" />

            <SettingsNumberInput
              label="Team B Score"
              value={state.B}
              onSave={(val) => set("B", val)}
            />

            <div className="w-full h-px bg-border/40" />

            <SettingsNumberInput
              label="Step (Points per click)"
              value={state.step}
              onSave={(val) => set("step", val)}
            />
          </div>

          <button
            onClick={swap}
            className={clsx(
              "flex items-center justify-center gap-3 w-full py-3.5 rounded-xl font-medium",
              "bg-surface border border-border shadow-sm",
              "hover:bg-muted hover:shadow-md active:scale-[0.98]",
              "transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]",
              "focus:outline-none focus:ring-2 focus:ring-primary/20"
            )}
          >
            <RiArrowLeftRightLine className="w-5 h-5 text-foreground/80" />
            Swap Sides
          </button>

          <div className="w-full h-px bg-border/40" />

          {/* Theme Settings */}
          <ThemeSwitcher />

          {wakeLock && wakeLock.isSupported && (
            <>
              <div className="w-full h-px bg-border/40" />
              <WakeLockToggle
                isSupported={wakeLock.isSupported}
                isEnabled={wakeLock.isEnabled}
                onToggle={wakeLock.toggle}
              />
            </>
          )}

          {haptics && haptics.isSupported && (
            <>
              <div className="w-full h-px bg-border/40" />
              <HapticsToggle
                isSupported={haptics.isSupported}
                isEnabled={haptics.isEnabled}
                onToggle={haptics.toggle}
              />
            </>
          )}
        </div>
      </div>
    </>
  );
};
