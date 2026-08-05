import { IScoreContext } from "@/types";
import { createContext } from "react";

const defaultValues: IScoreContext = {
  state: { A: 0, B: 0, step: 1, isSwapped: false },
  increment: () => {},
  decrement: () => {},
  reset: () => {},
  set: () => {},
  swap: () => {},
};

export const ScoreContext = createContext<IScoreContext>(defaultValues);
