import { ScoreContext } from "@/hooks";
import { Score, Team } from "@/types";
import { getLocalScore, removeLocalScore, setLocalScore } from "@/utils";
import { useEffect, useReducer, type ReactNode, type FC } from "react";
import { scoreReducer, defaultScore } from "@/models/scoreModel";

type ScoreProviderProps = {
  children: ReactNode;
};

export const ScoreProvider: FC<ScoreProviderProps> = ({ children }) => {
  const [scores, dispatch] = useReducer(scoreReducer, defaultScore);

  useEffect(() => {
    const local = getLocalScore();
    if (local) {
      dispatch({ type: "SET", key: "A", value: local.A });
      dispatch({ type: "SET", key: "B", value: local.B });
      dispatch({ type: "SET", key: "step", value: local.step });
    }
  }, []);

  useEffect(() => {
    if (scores === defaultScore) return;
    setLocalScore("A", scores.A);
    setLocalScore("B", scores.B);
    setLocalScore("step", scores.step);
  }, [scores]);

  const increment = (team: Team) => {
    dispatch({ type: "INCREMENT", team });
  };

  const decrement = (team: Team) => {
    dispatch({ type: "DECREMENT", team });
  };

  const reset = () => {
    dispatch({ type: "RESET" });
    removeLocalScore("A");
    removeLocalScore("B");
    removeLocalScore("step");
  };

  const set = (key: keyof Score, value: number) => {
    dispatch({ type: "SET", key, value });
  };

  return (
    <ScoreContext.Provider value={{ scores, increment, decrement, reset, set }}>
      {children}
    </ScoreContext.Provider>
  );
};
