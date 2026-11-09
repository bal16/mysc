import { useContext, useState } from "react";
import { ScoreContext } from "@/hooks";
import { ConfirmResetModal } from "./ConfirmResetModal";
import {
  RiAddLine,
  RiCloseLine,
  RiSettingsLine,
  RiArrowLeftRightLine,
  RiResetLeftLine,
} from "react-icons/ri";
import { clsx } from "clsx";

interface SpeedDialFABProps {
  onOpenSettings: () => void;
}

export const SpeedDialFAB = ({ onOpenSettings }: SpeedDialFABProps) => {
  const { swap, reset } = useContext(ScoreContext);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);

  const close = () => setIsExpanded(false);

  const handleSettings = () => {
    close();
    onOpenSettings();
  };

  const handleSwap = () => {
    close();
    swap();
  };

  const handleReset = () => {
    close();
    setIsConfirmOpen(true);
  };

  const handleConfirmReset = () => {
    reset();
    setIsConfirmOpen(false);
  };

  return (
    <>
      {/* Backdrop to close when expanded */}
      {isExpanded && (
        <button
          type="button"
          aria-label="Close speed dial"
          onClick={close}
          className="fixed inset-0 z-30 cursor-default bg-transparent"
        />
      )}

      <div className="fixed bottom-4 right-4 z-40 flex flex-col items-end gap-3">
        {/* Sub-actions */}
        <div
          className={clsx(
            "flex flex-col items-end gap-3 transition-all duration-200",
            isExpanded
              ? "opacity-100 translate-y-0 pointer-events-auto"
              : "opacity-0 translate-y-2 pointer-events-none"
          )}
        >
          <button
            type="button"
            onClick={handleSettings}
            aria-label="Open Settings"
            className={clsx(
              "flex items-center gap-2 rounded-full bg-surface text-foreground border border-border/50",
              "shadow-md backdrop-blur-md px-4 h-11",
              "hover:bg-muted hover:scale-105 active:scale-95",
              "transition-all duration-200 ease-[cubic-bezier(0.16,1,0.3,1)]",
              "focus:outline-none focus:ring-2 focus:ring-primary/20"
            )}
          >
            <RiSettingsLine className="w-5 h-5" />
            <span className="text-sm font-medium">Settings</span>
          </button>

          <button
            type="button"
            onClick={handleSwap}
            aria-label="Swap Sides"
            className={clsx(
              "flex items-center gap-2 rounded-full bg-surface text-foreground border border-border/50",
              "shadow-md backdrop-blur-md px-4 h-11",
              "hover:bg-muted hover:scale-105 active:scale-95",
              "transition-all duration-200 ease-[cubic-bezier(0.16,1,0.3,1)]",
              "focus:outline-none focus:ring-2 focus:ring-primary/20"
            )}
          >
            <RiArrowLeftRightLine className="w-5 h-5" />
            <span className="text-sm font-medium">Swap Sides</span>
          </button>

          <button
            type="button"
            onClick={handleReset}
            aria-label="Reset Score"
            className={clsx(
              "flex items-center gap-2 rounded-full bg-surface text-foreground border border-border/50",
              "shadow-md backdrop-blur-md px-4 h-11",
              "hover:bg-muted hover:scale-105 active:scale-95",
              "transition-all duration-200 ease-[cubic-bezier(0.16,1,0.3,1)]",
              "focus:outline-none focus:ring-2 focus:ring-primary/20"
            )}
          >
            <RiResetLeftLine className="w-5 h-5" />
            <span className="text-sm font-medium">Reset Score</span>
          </button>
        </div>

        {/* Main FAB */}
        <button
          type="button"
          onClick={() => setIsExpanded((v) => !v)}
          aria-label={isExpanded ? "Close speed dial" : "Open speed dial"}
          aria-expanded={isExpanded}
          className={clsx(
            "flex items-center justify-center w-14 h-14 rounded-full",
            "border-2 border-surface bg-primary text-white shadow-lg",
            "hover:scale-105 active:scale-95",
            "transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]",
            "focus:outline-none focus:ring-2 focus:ring-primary/40"
          )}
        >
          {isExpanded ? (
            <RiCloseLine className="w-6 h-6" />
          ) : (
            <RiAddLine className="w-6 h-6" />
          )}
        </button>
      </div>

      <ConfirmResetModal
        isOpen={isConfirmOpen}
        onClose={() => setIsConfirmOpen(false)}
        onConfirm={handleConfirmReset}
      />
    </>
  );
};
