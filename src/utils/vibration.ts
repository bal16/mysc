import { getHapticsPreference } from "./localStorage";

export const hapticPatterns = {
  increase: 40, // Short crisp tap
  decrease: [30, 50, 30], // Double subtle pulse (correction marker)
  reset: [100, 50, 200], // Long heavy warning (destructive)
  gamePoint: [60, 40, 60, 40, 100], // Attention pulse — not triggered yet
  setFinished: [80, 60, 80, 60, 250], // Heavy success — not triggered yet
} as const;

export type HapticName = keyof typeof hapticPatterns;

export const vibrate = (pattern: number | readonly number[]): boolean => {
  if (typeof navigator !== "undefined" && "vibrate" in navigator) {
    navigator.vibrate(pattern as number | number[]);
    return true;
  }
  return false;
};

export const triggerHaptic = (name: HapticName): boolean => {
  if (!getHapticsPreference()) {
    return false;
  }
  return vibrate(hapticPatterns[name]);
};

export const stopHaptic = (): boolean => {
  if (typeof navigator !== "undefined" && "vibrate" in navigator) {
    navigator.vibrate(0);
    return true;
  }
  return false;
};
