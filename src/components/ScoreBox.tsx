import { Odometer } from "@/components";
import { Team } from "@/types";
import clsx from "clsx";

interface ScoreBoxProps extends React.HTMLAttributes<HTMLDivElement> {
  variant: "R" | "L";
  label: Team;
  value: number;
  increaseFn: (label: Team) => void;
  decreaseFn: (label: Team) => void;
}

type ScoreBoxLabelProps = Omit<
  ScoreBoxProps,
  "variant" | "value" | "increaseFn"
>;

const ScoreBoxLabel = ({ label, decreaseFn }: ScoreBoxLabelProps) => {
  const handleDecrement = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    decreaseFn(label);
  };
  return (
    <button
      className="text-8xl lg:text-[12rem] flex items-center justify-center select-none cursor-pointer bg-transparent border-0 p-0 font-brand"
      onClick={handleDecrement}
      aria-label={`Decrease Team ${label} score`}
    >
      {label}
    </button>
  );
};

export const ScoreBox = ({
  variant,
  label,
  value: state,
  increaseFn,
  decreaseFn,
}: ScoreBoxProps) => {
  const handleIncrement = (e: React.MouseEvent) => {
    e.preventDefault();
    increaseFn(label);
  };

  return (
    <section
      className={clsx(
        "w-full h-full",
        label === "B" && "bg-score-canvas-b",
        label === "A" && "bg-score-canvas-a",
      )}
    >
      <div
        className={clsx(
          "relative flex items-center px-10 w-full h-full portrait:rotate-90 landscape:lg:rotate-0",
          variant === "L" && "justify-end",
          variant === "R" && "justify-start",
        )}
        onClick={handleIncrement}
      >
        <div
          className={clsx(
            "flex p-10 gap-10 shadow-2xl",
            variant === "L" &&
              "pl-10 rounded-l-full bg-score-pill-a text-score-pill-text-a",
            variant === "R" &&
              "pr-10 rounded-r-full bg-score-pill-b text-score-pill-text-b",
          )}
        >
          {variant == "L" && (
            <ScoreBoxLabel label={label} decreaseFn={decreaseFn} />
          )}
          <div className="min-w-24 lg:min-w-48">
            <Odometer value={state} digit={1} />
          </div>
          {variant == "R" && (
            <ScoreBoxLabel label={label} decreaseFn={decreaseFn} />
          )}
        </div>
      </div>
    </section>
  );
};
