import { useState, useEffect } from "react";

const HAPTICS_KEY = "hapticsEnabled";

export interface UseHapticsReturn {
  isSupported: boolean;
  isEnabled: boolean;
  toggle: () => void;
}

export function useHaptics(): UseHapticsReturn {
  const isSupported = "vibrate" in navigator;
  const [isEnabled, setIsEnabled] = useState(() => {
    try {
      const value = localStorage.getItem(HAPTICS_KEY);
      return value === null ? true : value === "true";
    } catch {
      return true;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(HAPTICS_KEY, String(isEnabled));
    } catch (e) {
      console.error("Failed to save haptics preference", e);
    }
  }, [isEnabled]);

  const toggle = () => setIsEnabled((prev) => !prev);

  return { isSupported, isEnabled, toggle };
}

export const getHapticsPreference = (): boolean => {
  try {
    const value = localStorage.getItem(HAPTICS_KEY);
    return value === null ? true : value === "true";
  } catch {
    return true;
  }
};
