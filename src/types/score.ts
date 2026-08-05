export type Score = {
  A: number;
  B: number;
  step: number;
  isSwapped: boolean;
};
export interface IScoreContext {
  state: Score;
  increment: (team: Team) => void;
  decrement: (team: Team) => void;
  set: (key: keyof Score, value: number) => void;
  reset: () => void;
  swap: () => void;
}

export type Team = "A" | "B";
