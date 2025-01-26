import { Score } from "@/types";
import { getLocalScore } from "@/utils";
import { useState } from "react";

/**
 * Hook that returns an object with three properties:
 *  - value: The current score for the given key
 *  - increase: A function that increments the score for the given key by 1
 *  - resetValue: A function that resets the score for both keys to 0
 *
 * @param key The key to store the score under
 * @returns An object with the above properties
 */
export const useScore = (key: "A" | "B", step = 1) => {
  const local = getLocalScore();

  const [score, setScore] = useState<Score>(local || { A: 0, B: 0 });

  /**
   * Increments the score for the given key by @param step defaults to 1.
   * Updates the state with the new score value.
   */

  const increase = () => {
    setScore((prev) => {
      localStorage.setItem(key, String(prev[key] + step));
      return { ...prev, [key]: prev[key] + step };
    });
  };

  /**
   * Resets the score for both A and B to 0.
   */
  const resetValue = () => {
    setScore({ A: 0, B: 0 });
    localStorage.removeItem("A");
    localStorage.removeItem("B");
  };
  /**
   * Increments the score for the given key by @param step defaults to 1.
   * Updates the state with the new score value.
   */
  const decrease = () => {
    if (score[key] === 0) return;
    step = -step;
    increase();
  };

  /**
   * Value of the score for the given key
   */
  const value = score[key];

  return { value, increase, resetValue, decrease };
};
