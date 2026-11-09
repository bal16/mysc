import { RiCloseLine, RiResetLeftLine } from "react-icons/ri";
import { clsx } from "clsx";

interface ConfirmResetModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title?: string;
  message?: string;
  confirmLabel?: string;
}

export const ConfirmResetModal = ({
  isOpen,
  onClose,
  onConfirm,
  title = "Reset Score?",
  message = "Are you sure you want to reset the score? This action cannot be undone.",
  confirmLabel = "Reset",
}: ConfirmResetModalProps) => {
  if (!isOpen) return null;

  const content = (
    <>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 flex items-center justify-center rounded-full bg-muted/50">
            <RiResetLeftLine className="w-5 h-5 text-foreground/80" />
          </div>
          <h2
            id="confirm-reset-title"
            className="text-xl font-semibold tracking-tight"
          >
            {title}
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

      <p className="text-foreground/70">{message}</p>

      <div className="flex gap-3 mt-auto">
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
          {confirmLabel}
        </button>
      </div>
    </>
  );

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
          "p-6 sm:p-8 pb-8 flex flex-col gap-6",
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
        aria-labelledby="confirm-reset-title"
      >
        {content}
      </div>
    </>
  );
};
