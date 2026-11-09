import { useEffect, useMemo, useState } from "react";
import { useTheme } from "@/hooks/useTheme";
import { ThemeSwitcher } from "./ThemeSwitcher";
import { WakeLockToggle } from "./WakeLockToggle";
import { HapticsToggle } from "./HapticsToggle";
import {
  setOnboardingCompleted,
  setShowOnboardingAgain,
} from "@/utils/localStorage";
import { clsx } from "clsx";
import {
  RiArrowLeftLine,
  RiArrowRightLine,
  RiFullscreenLine,
  RiSmartphoneLine,
} from "react-icons/ri";

interface OnboardingPreferenceProps {
  isSupported: boolean;
  isEnabled: boolean;
  toggle: () => void;
}

interface OnboardingPWAInstallProps {
  canInstall: boolean;
  isStandalone: boolean;
  isIOS: boolean;
  promptInstall: () => Promise<void>;
}

interface OnboardingProps {
  wakeLock: OnboardingPreferenceProps;
  haptics: OnboardingPreferenceProps;
  pwaInstall: OnboardingPWAInstallProps;
  onComplete: () => void;
}

type SlideId = "welcome" | "rotate" | "install";

export const Onboarding = ({
  wakeLock,
  haptics,
  pwaInstall,
  onComplete,
}: OnboardingProps) => {
  useTheme();

  const [isMobilePortrait, setIsMobilePortrait] = useState<boolean>(() => {
    try {
      return window.matchMedia("(orientation: portrait) and (max-width: 767px)")
        .matches;
    } catch {
      return false;
    }
  });

  const [index, setIndex] = useState(0);
  const [showAgain, setShowAgain] = useState(false);

  const slideIds = useMemo<SlideId[]>(() => {
    const ids: SlideId[] = ["welcome"];
    if (isMobilePortrait) ids.push("rotate");
    if (pwaInstall.canInstall) ids.push("install");
    return ids;
  }, [isMobilePortrait, pwaInstall.canInstall]);

  useEffect(() => {
    if (index > slideIds.length - 1) {
      setIndex(Math.max(0, slideIds.length - 1));
    }
  }, [index, slideIds.length]);

  useEffect(() => {
    const mediaQuery = window.matchMedia(
      "(orientation: portrait) and (max-width: 767px)"
    );
    const handler = () => setIsMobilePortrait(mediaQuery.matches);
    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
  }, []);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        handleComplete();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleComplete = () => {
    setOnboardingCompleted();
    setShowOnboardingAgain(showAgain);
    onComplete();
  };

  const goFullscreenAndRotate = async () => {
    try {
      if (!document.fullscreenElement && document.fullscreenEnabled) {
        await document.documentElement.requestFullscreen();
      }
      const orientation = screen.orientation as {
        lock?: (orientation: string) => Promise<void>;
      } | null;
      if (orientation && typeof orientation.lock === "function") {
        await orientation.lock("landscape");
      }
    } catch (error) {
      console.warn("Fullscreen or orientation lock failed", error);
    }
  };

  const isLastSlide = index === slideIds.length - 1;
  const currentSlide = slideIds[index] ?? "welcome";

  const handleNext = () => {
    if (isLastSlide) {
      handleComplete();
    } else {
      setIndex((prev) => Math.min(prev + 1, slideIds.length - 1));
    }
  };

  const handleBack = () => {
    setIndex((prev) => Math.max(prev - 1, 0));
  };

  const renderSlide = () => {
    if (currentSlide === "welcome") {
      return (
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <h2 className="text-2xl font-semibold tracking-tight">
              Welcome to mysc.
            </h2>
            <p className="text-sm text-foreground/70">
              A fast badminton score counter. Set your preferences before you
              start playing.
            </p>
          </div>

          <div className="flex flex-col gap-5 p-5 bg-muted/30 rounded-2xl border border-border/40">
            <ThemeSwitcher />

            {haptics.isSupported && (
              <>
                <div className="w-full h-px bg-border/40" />
                <HapticsToggle
                  isSupported={haptics.isSupported}
                  isEnabled={haptics.isEnabled}
                  onToggle={haptics.toggle}
                />
              </>
            )}

            {wakeLock.isSupported && (
              <>
                <div className="w-full h-px bg-border/40" />
                <WakeLockToggle
                  isSupported={wakeLock.isSupported}
                  isEnabled={wakeLock.isEnabled}
                  onToggle={wakeLock.toggle}
                />
              </>
            )}
          </div>
        </div>
      );
    }

    if (currentSlide === "rotate") {
      return (
        <div className="flex flex-col items-center gap-5 text-center">
          <div className="flex items-center justify-center w-20 h-20 rounded-full bg-primary/10">
            <RiSmartphoneLine className="w-10 h-10 text-primary rotate-90" />
          </div>
          <div className="flex flex-col gap-2">
            <h2 className="text-2xl font-semibold tracking-tight">
              Rotate to landscape
            </h2>
            <p className="text-sm text-foreground/70">
              Landscape mode gives the scoreboard more room and a better viewing
              experience.
            </p>
          </div>
          <button
            type="button"
            onClick={goFullscreenAndRotate}
            className={clsx(
              "w-full py-3.5 rounded-xl font-medium",
              "bg-primary text-white shadow-sm",
              "hover:opacity-90 active:scale-[0.98]",
              "transition-all duration-200 ease-[cubic-bezier(0.16,1,0.3,1)]",
              "focus:outline-none focus:ring-2 focus:ring-primary/40"
            )}
          >
            <span className="inline-flex items-center justify-center gap-2">
              <RiFullscreenLine className="w-5 h-5" />
              Go Fullscreen &amp; Rotate
            </span>
          </button>
          <p className="text-xs text-foreground/50">
            If nothing happens, rotate your device manually to landscape.
          </p>
        </div>
      );
    }

    return (
      <div className="flex flex-col gap-5 text-center">
        <div className="flex flex-col gap-2">
          <h2 className="text-2xl font-semibold tracking-tight">
            Install the app
          </h2>
          <p className="text-sm text-foreground/70">
            Install mysc. to your home screen for faster access and an
            immersive, offline-ready experience.
          </p>
        </div>
        <button
          type="button"
          onClick={pwaInstall.promptInstall}
          className={clsx(
            "w-full py-3.5 rounded-xl font-medium",
            "bg-primary text-white shadow-sm",
            "hover:opacity-90 active:scale-[0.98]",
            "transition-all duration-200 ease-[cubic-bezier(0.16,1,0.3,1)]",
            "focus:outline-none focus:ring-2 focus:ring-primary/40"
          )}
        >
          Add to Home Screen
        </button>
        {pwaInstall.isIOS && !pwaInstall.canInstall && (
          <p className="text-xs text-foreground/50">
            On iOS, tap Share and choose "Add to Home Screen".
          </p>
        )}
      </div>
    );
  };

  const navigation = (
    <div className="flex items-center justify-between gap-3 pt-2">
      {slideIds.length > 1 && (
        <button
          type="button"
          onClick={handleComplete}
          className={clsx(
            "px-4 py-2 rounded-xl text-sm font-medium",
            "bg-muted/50 text-foreground/80",
            "hover:bg-muted active:scale-95",
            "transition-all duration-200"
          )}
        >
          Skip
        </button>
      )}

      {slideIds.length > 1 && (
        <div className="flex items-center gap-1.5">
          {slideIds.map((slide, slideIndex) => (
            <span
              key={slide}
              className={clsx(
                "h-2 rounded-full transition-all duration-200",
                slideIndex === index ? "w-6 bg-primary" : "w-2 bg-muted"
              )}
            />
          ))}
        </div>
      )}

      <div className="flex items-center gap-2">
        {index > 0 && (
          <button
            type="button"
            onClick={handleBack}
            aria-label="Previous step"
            className={clsx(
              "w-10 h-10 flex items-center justify-center rounded-xl",
              "bg-muted/50 text-foreground/80",
              "hover:bg-muted active:scale-95",
              "transition-all duration-200"
            )}
          >
            <RiArrowLeftLine className="w-5 h-5" />
          </button>
        )}
        <button
          type="button"
          onClick={handleNext}
          className={clsx(
            "px-4 py-2 rounded-xl text-sm font-medium",
            "bg-primary text-white shadow-sm",
            "hover:opacity-90 active:scale-95",
            "transition-all duration-200"
          )}
        >
          {isLastSlide ? (
            "Get Started"
          ) : (
            <span className="inline-flex items-center gap-1">
              Next
              <RiArrowRightLine className="w-4 h-4" />
            </span>
          )}
        </button>
      </div>
    </div>
  );

  if (isMobilePortrait) {
    return (
      <div
        className="fixed inset-0 z-[60] bg-surface text-foreground flex flex-col"
        role="dialog"
        aria-modal="true"
        aria-label="Onboarding"
      >
        <header className="flex items-center justify-between p-6 pb-2">
          {slideIds.length > 1 && (
            <span className="text-xs font-medium text-foreground/50">
              Step {index + 1} of {slideIds.length}
            </span>
          )}
        </header>
        <main className="flex-1 overflow-y-auto px-6 pb-6">
          {renderSlide()}
        </main>
        <footer className="p-6 pt-2 border-t border-border/40">
          <div className="flex flex-col gap-3">
            <label className="flex items-center gap-2 text-xs text-foreground/60">
              <input
                type="checkbox"
                checked={showAgain}
                onChange={(event) => setShowAgain(event.target.checked)}
                className="h-4 w-4 rounded border-border"
              />
              Show this guide again next time
            </label>
            {navigation}
          </div>
        </footer>
      </div>
    );
  }

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center p-4 sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-label="Onboarding"
    >
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        aria-hidden="true"
      />
      <div
        className={clsx(
          "relative w-full max-w-md max-h-[90vh] overflow-y-auto",
          "bg-surface text-foreground rounded-2xl shadow-[0_20px_40px_-15px_rgba(0,0,0,0.15)]",
          "border border-border/50 p-6 sm:p-8 flex flex-col gap-6"
        )}
      >
        {slideIds.length > 1 && (
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-foreground/50">
              Step {index + 1} of {slideIds.length}
            </span>
          </div>
        )}
        {renderSlide()}
        <div className="flex flex-col gap-3">
          <label className="flex items-center gap-2 text-xs text-foreground/60">
            <input
              type="checkbox"
              checked={showAgain}
              onChange={(event) => setShowAgain(event.target.checked)}
              className="h-4 w-4 rounded border-border"
            />
            Show this guide again next time
          </label>
          {navigation}
        </div>
      </div>
    </div>
  );
};
