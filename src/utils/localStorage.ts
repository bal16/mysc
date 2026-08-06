import { Score } from "@/types";

/**
 * Retrieves the score from local storage.
 *
 * The score is stored as a pair of number strings under the keys "A" and "B".
 * If either key is missing, the corresponding score is set to 0.
 *
 * @returns The current score.
 */
export const getLocalScore = (): Score => {
  const localAString = localStorage.getItem("A");
  const localBString = localStorage.getItem("B");
  const localStepString = localStorage.getItem("step");
  const localIsSwappedString = localStorage.getItem("isSwapped");
  return {
    A: localAString ? Number(localAString) : 0,
    B: localBString ? Number(localBString) : 0,
    step: localStepString ? Number(localStepString) : 1,
    isSwapped:
      localIsSwappedString == "false" ? false : localIsSwappedString == "true",
  };
};

export const setLocalScore = (key: keyof Score, value: Score[keyof Score]) =>
  localStorage.setItem(key, String(value));

export const removeLocalScore = (key: keyof Score) =>
  localStorage.removeItem(key);

export const getWakeLockPreference = (): boolean => {
  try {
    const value = localStorage.getItem("wakeLockEnabled");
    return value === null ? true : value === "true";
  } catch (e) {
    console.error("Failed to access localStorage", e);
    return true;
  }
};

export const setWakeLockPreference = (enabled: boolean): void => {
  try {
    localStorage.setItem("wakeLockEnabled", String(enabled));
  } catch (e) {
    console.error("Failed to save to localStorage", e);
  }
};
