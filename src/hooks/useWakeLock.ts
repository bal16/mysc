import { useState, useEffect, useRef, useCallback } from "react";
import { getWakeLockPreference, setWakeLockPreference } from "@/utils";

export interface UseWakeLockReturn {
  isSupported: boolean;
  isEnabled: boolean;
  isActive: boolean;
  toggle: () => void;
}

export const useWakeLock = (): UseWakeLockReturn => {
  const isSupported =
    typeof navigator !== "undefined" && "wakeLock" in navigator;

  const [isEnabled, setIsEnabled] = useState<boolean>(() =>
    getWakeLockPreference()
  );
  const [isActive, setIsActive] = useState<boolean>(false);
  const sentinelRef = useRef<WakeLockSentinel | null>(null);

  const requestLock = useCallback(async () => {
    if (!isSupported || !isEnabled) return;
    if (sentinelRef.current && !sentinelRef.current.released) {
      setIsActive(true);
      return;
    }

    try {
      const sentinel = await navigator.wakeLock.request("screen");
      sentinelRef.current = sentinel;
      setIsActive(true);

      sentinel.addEventListener("release", () => {
        setIsActive(false);
        sentinelRef.current = null;
      });
    } catch (e) {
      console.warn("Failed to request wake lock", e);
      setIsActive(false);
      sentinelRef.current = null;
    }
  }, [isSupported, isEnabled]);

  const releaseLock = useCallback(async () => {
    if (sentinelRef.current) {
      try {
        await sentinelRef.current.release();
      } catch (e) {
        console.warn("Failed to release wake lock", e);
      } finally {
        sentinelRef.current = null;
        setIsActive(false);
      }
    }
  }, []);

  useEffect(() => {
    if (isEnabled) {
      requestLock();
    } else {
      releaseLock();
    }
  }, [isEnabled, requestLock, releaseLock]);

  useEffect(() => {
    if (!isSupported) return;

    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible" && isEnabled) {
        requestLock();
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      releaseLock();
    };
  }, [isSupported, isEnabled, requestLock, releaseLock]);

  const toggle = useCallback(() => {
    setIsEnabled((prev) => {
      const next = !prev;
      setWakeLockPreference(next);
      return next;
    });
  }, []);

  return {
    isSupported,
    isEnabled,
    isActive,
    toggle,
  };
};
