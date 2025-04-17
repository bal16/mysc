import { ScoreContext } from "@/hooks";
import { SlideButton } from "@/components";
import { RiResetLeftLine } from "react-icons/ri";
import { useContext } from "react";

export const ResetButton = () => {
  const { reset } = useContext(ScoreContext);

  return (
    <SlideButton onClick={reset} className="bg-white">
      <RiResetLeftLine />
    </SlideButton>
  );
};
