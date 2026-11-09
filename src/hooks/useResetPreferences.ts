import { useCallback } from "react";
import type { UseWakeLockReturn } from "./useWakeLock";
import type { UseHapticsReturn } from "./useHaptics";

interface ResetPreferencesArgs {
  setTheme: (theme: "origin" | "amoled" | "premium-warm") => void;
  wakeLock: UseWakeLockReturn;
  haptics: UseHapticsReturn;
  onShowOnboarding?: () => void;
}

export function useResetPreferences({
  setTheme,
  wakeLock,
  haptics,
  onShowOnboarding,
}: ResetPreferencesArgs) {
  return useCallback(() => {
    try {
      localStorage.removeItem("hasCompletedOnboarding");
      localStorage.removeItem("showOnboardingAgain");
      localStorage.removeItem("theme");
      localStorage.removeItem("theme_palette");
      localStorage.removeItem("theme_mode");
      localStorage.setItem("hapticsEnabled", "true");
      localStorage.setItem("wakeLockEnabled", "true");
    } catch (error) {
      console.error("Failed to reset preferences", error);
    }

    setTheme("origin");

    if (haptics.isSupported && !haptics.isEnabled) {
      haptics.toggle();
    }
    if (wakeLock.isSupported && !wakeLock.isEnabled) {
      wakeLock.toggle();
    }

    onShowOnboarding?.();
  }, [setTheme, wakeLock, haptics, onShowOnboarding]);
}
