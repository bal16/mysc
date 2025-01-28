import { IScoreContext } from "@/types";
import  { createContext } from "react";


const defaultValues: IScoreContext = {
  scores: { A: 0, B: 0, step:1 },
  increment: () => {},
  decrement: () => {},
  reset: () => {},
  set: () => {},
};

export const ScoreContext = createContext<IScoreContext>(defaultValues);


