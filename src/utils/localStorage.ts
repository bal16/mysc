import { Score } from "@/types";

/**
 * Retrieves the score from local storage.
 *
 * The score is stored as a pair of number strings under the keys "A" and "B".
 * If either key is missing, the corresponding score is set to 0.
 *
 * @returns The current score.
 */
export const getLocalScore = () => {
  const localAString = localStorage.getItem("A");
  const localBString = localStorage.getItem("B");
  const local = {
    A: localAString ? Number(localAString) : 0,
    B: localBString ? Number(localBString) : 0,
  } as Score;
  return local;
};