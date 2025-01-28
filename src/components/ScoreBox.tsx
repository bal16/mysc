import { ScoreContext } from "@/hooks";
import { DeButton, Odometer } from "@/components";
import { Team } from "@/types";
import { useContext } from "react";

interface ScoreBoxProps extends React.HTMLAttributes<HTMLDivElement> {
  name: Team;
}

export const ScoreBox = ({ name }: ScoreBoxProps) => {
  const { scores, increment, decrement } = useContext(ScoreContext);

  return (
    <div className="w-full h-full flex items-center justify-center rotate-90 lg:rotate-0 relative">
      <div onClick={() => increment(name)}>
        <Odometer value={scores[name]} digit={1} />
      </div>
      <DeButton onClick={() => decrement(name)} value={scores["step"]} />
    </div>
  );
};
