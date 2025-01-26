import { useScore } from "@/hooks";
import { DeButton, Odometer } from "@/components";

interface ScoreBoxProps extends React.HTMLAttributes<HTMLDivElement> {
  name: "A" | "B";
}

export const ScoreBox = ({ name }: ScoreBoxProps) => {
  const { value, increase, decrease } = useScore(name);

  return (
    <div className="w-full h-full flex items-center justify-center rotate-90 md:rotate-0">
      <div onClick={increase} className="">
        <Odometer value={value} digit={1} />
      </div>
      {/* {value} */}
      <DeButton onClick={decrease} />
    </div>
  );
};
