import { useScore } from "@/hooks";
import { Odometer } from "@/components";

interface ScoreBoxProps extends React.HTMLAttributes<HTMLDivElement> {
  name: "A" | "B";
}

export const ScoreBox = ({ name }: ScoreBoxProps) => {
  const { value, handleChange } = useScore(name);

  return (
    <div
      className="w-full h-full flex items-center justify-center rotate-90 md:rotate-0"
      onClick={handleChange}
    >
      <div>
        <Odometer value={value} digit={1} />
      </div>
      {/* {value} */}
    </div>
  );
};
