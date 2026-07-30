import { Score, Team } from "../types";

export type ScoreAction =
  | { type: "INCREMENT"; team: Team }
  | { type: "DECREMENT"; team: Team }
  | { type: "SET"; key: keyof Score; value: number }
  | { type: "RESET" };

export const defaultScore: Score = { A: 0, B: 0, step: 1 };

export function scoreReducer(state: Score, action: ScoreAction): Score {
  switch (action.type) {
    case "INCREMENT": {
      const current = state[action.team];
      if (current >= 100) return state;
      if (current + state.step > 100) return state;
      return { ...state, [action.team]: current + state.step };
    }
    case "DECREMENT": {
      const current = state[action.team];
      if (current <= 0) return state;
      if (current - state.step < 0) return state;
      return { ...state, [action.team]: current - state.step };
    }
    case "SET": {
      return { ...state, [action.key]: action.value };
    }
    case "RESET": {
      return defaultScore;
    }
    default:
      return state;
  }
}
