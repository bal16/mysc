export const vibrate = (pattern: number | number[]): void => {
  if (typeof navigator !== "undefined" && "vibrate" in navigator) {
    navigator.vibrate(pattern);
  }
};

export const hapticPatterns = {
  tap: 50, // increment / decrement
  reset: [50, 50, 50], // reset — triple-pulse
} as const;
