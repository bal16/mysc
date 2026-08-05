import { ScoreContext } from "@/hooks";
import { Score, Team } from "@/types";
import { getLocalScore, removeLocalScore, setLocalScore } from "@/utils";
import { useEffect, useReducer, useMemo, type ReactNode, type FC } from "react";
import { scoreReducer, defaultState } from "@/models/scoreModel";

type ScoreProviderProps = {
  children: ReactNode;
};

export const ScoreProvider: FC<ScoreProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(scoreReducer, defaultState);

  useEffect(function loadState() {
    const local = getLocalScore();
    if (!local) {
      return;
    }
    dispatch({ type: "SET", key: "A", value: local.A });
    dispatch({ type: "SET", key: "B", value: local.B });
    dispatch({ type: "SET", key: "step", value: local.step });
    dispatch({ type: "SET", key: "isSwapped", value: local.isSwapped });
  }, []);

  useEffect(
    function trackState() {
      if (state === defaultState) return;
      setLocalScore("A", state.A);
      setLocalScore("B", state.B);
      setLocalScore("step", state.step);
      setLocalScore("isSwapped", state.isSwapped);
    },
    [state],
  );

  const increase = (team: Team) => {
    dispatch({ type: "INCREMENT", team });
  };

  const decrease = (team: Team) => {
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

  const swap = () => {
    dispatch({ type: "SWAP" });
  };

  const contextValue = useMemo(
    () => ({
      state,
      increase,
      decrease,
      reset,
      set,
      swap,
    }),
    [state]
  );

  return (
    <ScoreContext.Provider value={contextValue}>
      {children}
    </ScoreContext.Provider>
  );
};
