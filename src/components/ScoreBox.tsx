import { ScoreContext } from "@/hooks";
import { DeButton, Odometer } from "@/components";
import { Team } from "@/types";
import { useContext } from "react";
import clsx from "clsx";

interface ScoreBoxProps extends React.HTMLAttributes<HTMLDivElement> {
  variant: Team;
}

export const ScoreBox = ({ variant: name }: ScoreBoxProps) => {
  const { scores, increment, decrement } = useContext(ScoreContext);

  return (
    <section
      className={clsx(
        "w-full h-full",
        name === "B" && "bg-primary",
        name === "A" && "bg-secondary"
      )}
    >
      <div className="relative flex items-center justify-center w-full h-full portrait:rotate-90 landscape:lg:rotate-0">
        <div onClick={() => increment(name)}>
          <Odometer value={scores[name]} digit={1} />
        </div>
        <DeButton onClick={() => decrement(name)} value={scores.step} />
      </div>
    </section>
  );
};
