import { useState } from "react";

/**
 * Hook that returns an object with three properties:
 *  - value: The current score for the given key
 *  - handleChange: A function that increments the score for the given key by 1
 *  - resetValue: A function that resets the score for both keys to 0
 *
 * @param key The key to store the score under
 * @returns An object with the above properties
 */
export const useScore = (key: "A" | "B", step=1) => {
  const [score, setScore] = useState({
    A: 0,
    B: 0,
  });

  /**
   * Increments the score for the given key by 1.
   * Updates the state with the new score value.
   */

  const handleChange = () => {
    setScore((prev) => {
      return { ...prev, [key]: prev[key] + step };
    });
  };

  /**
   * Resets the score for both A and B to 0.
   */
  const resetValue = () => {
    setScore({ A: 0, B: 0 });
  };

  /**
   * Value of the score for the given key
   */
  const value = score[key];

  return { value, handleChange, resetValue };
};
