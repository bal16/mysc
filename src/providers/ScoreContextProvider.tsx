import { ScoreContext } from "@/hooks";
import { Score, Team } from "@/types";
import { getLocalScore, removeLocalScore, setLocalScore } from "@/utils";
import { useState } from "react";

type ScoreProviderProps = {
  children: React.ReactNode;
};

export const ScoreProvider: React.FC<ScoreProviderProps> = ({ children }) => {
  const local = getLocalScore();
  const [scores, setScores] = useState<Score>(local || { A: 0, B: 0, step: 1 });

  const update = (team: Team, delta: number) => {
    setScores((prevScores) => ({
      ...prevScores,
      [team]: prevScores[team] + delta,
    }));
    setLocalScore(team, scores[team] + delta);
  };

  const increment = (team: Team) => {
    if (scores[team] >= 100) return;
    if (scores[team] + scores["step"] >= 100) return;
    update(team, scores["step"]);
  };

  const decrement = (team: Team) => {
    if (scores[team] <= 0) return;
    if (scores[team] - scores["step"] < 0) return;
    update(team, -scores["step"]);
  };

  const reset = () => {
    setScores({ A: 0, B: 0, step: 1 });
    removeLocalScore("A");
    removeLocalScore("B");
    removeLocalScore("step");
  };

  const set = (team: Team, value: number) => {
    setScores((prev) => ({ ...prev, [team]: value }));
    setLocalScore(team, value);
  };

  return (
    <ScoreContext.Provider value={{ scores, increment, decrement, reset, set }}>
      {children}
    </ScoreContext.Provider>
  );
};
