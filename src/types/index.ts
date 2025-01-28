export type Score = {
  A: number;
  B: number;
  step: number;
};
export interface IScoreContext {
  scores: Score;
  increment: (team: keyof Score) => void;
  decrement: (team: keyof Score) => void;
  set: (team: keyof Score, value: number) => void;
  reset: () => void;
}

export type Team = keyof Score;