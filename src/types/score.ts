export type Score = {
  A: number;
  B: number;
  step: number;
};
export interface IScoreContext {
  scores: Score;
  increment: (team: Team) => void;
  decrement: (team: Team) => void;
  set: (key: keyof Score, value: number) => void;
  reset: () => void;
}

export type Team = "A" | "B";
