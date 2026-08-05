export type Score = {
  A: number;
  B: number;
  step: number;
  isSwapped: boolean;
};
export interface IScoreContext {
  state: Score;
  increase: (team: Team) => void;
  decrease: (team: Team) => void;
  set: (key: keyof Score, value: number) => void;
  reset: () => void;
  swap: () => void;
}

export type Team = "A" | "B";
