import { ScoreContext } from "@/hooks";
import { Odometer } from "@/components";
import { Team } from "@/types";
import { useContext } from "react";
import clsx from "clsx";

interface ScoreBoxProps extends React.HTMLAttributes<HTMLDivElement> {
  variant: Team;
}

const ScoreBoxHeader = ({ variant: name }: ScoreBoxProps) => {
  return (
    <span className="text-8xl lg:text-[12rem] flex items-center justify-center select-none">
      {name}
    </span>
  );
};

export const ScoreBox = ({ variant: name }: ScoreBoxProps) => {
  const { scores, increment, decrement } = useContext(ScoreContext);

  const handleIncrement = (e: React.MouseEvent) => {
    e.preventDefault();
    increment(name);
  };

  const handleDecrement = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation(); // prevent increment handler call
    decrement(name);
  };

  return (
    <section
      className={clsx(
        "w-full h-full",
        name === "B" && "bg-primary",
        name === "A" && "bg-secondary"
      )}
    >
      <div
        className={clsx(
          "relative flex items-center px-10 w-full h-full portrait:rotate-90 landscape:lg:rotate-0",
          name === "A" && "justify-end",
          name === "B" && "justify-start"
        )}
        onClick={handleIncrement}
      >
        <div
          className={clsx(
            "flex bg-white p-10 gap-10 shadow-2xl",
            name === "A" && "pl-10 rounded-l-full",
            name === "B" && "pr-10 rounded-r-full"
          )}
          onClick={handleDecrement}
        >
          {name == "A" && <ScoreBoxHeader variant={name} />}
          <div className="min-w-24 lg:min-w-48">
            <Odometer value={scores[name]} digit={1} />
          </div>
          {name == "B" && <ScoreBoxHeader variant={name} />}
        </div>
      </div>
    </section>
  );
};
