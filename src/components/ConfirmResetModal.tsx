import { RiCloseLine, RiResetLeftLine } from "react-icons/ri";
import { clsx } from "clsx";

interface ConfirmResetModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export const ConfirmResetModal = ({
  isOpen,
  onClose,
  onConfirm,
}: ConfirmResetModalProps) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="confirm-reset-title"
    >
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      <div
        className={clsx(
          "relative w-full max-w-sm bg-surface text-foreground rounded-2xl",
          "shadow-[0_20px_40px_-15px_rgba(0,0,0,0.15)] border border-border/50",
          "p-6 sm:p-8 flex flex-col gap-6",
          "transform transition-all animate-in fade-in zoom-in-95 duration-200"
        )}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 flex items-center justify-center rounded-full bg-muted/50">
              <RiResetLeftLine className="w-5 h-5 text-foreground/80" />
            </div>
            <h2
              id="confirm-reset-title"
              className="text-xl font-semibold tracking-tight"
            >
              Reset Score?
            </h2>
          </div>
          <button
            onClick={onClose}
            className={clsx(
              "w-10 h-10 flex items-center justify-center rounded-full bg-muted/50",
              "hover:bg-muted hover:scale-105 active:scale-95",
              "transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]",
              "focus:outline-none focus:ring-2 focus:ring-primary/20"
            )}
            aria-label="Close"
          >
            <RiCloseLine className="w-5 h-5 text-foreground/80" />
          </button>
        </div>

        <p className="text-foreground/70">
          Are you sure you want to reset the score? This action cannot be
          undone.
        </p>

        <div className="flex gap-3">
          <button
            onClick={onClose}
            className={clsx(
              "flex-1 py-3 rounded-xl font-medium",
              "bg-surface border border-border shadow-sm",
              "hover:bg-muted hover:shadow-md active:scale-[0.98]",
              "transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]",
              "focus:outline-none focus:ring-2 focus:ring-primary/20"
            )}
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className={clsx(
              "flex-1 py-3 rounded-xl font-medium",
              "bg-red-500 text-white shadow-sm",
              "hover:bg-red-600 active:scale-[0.98]",
              "transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]",
              "focus:outline-none focus:ring-2 focus:ring-red-500/40"
            )}
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  );
};
