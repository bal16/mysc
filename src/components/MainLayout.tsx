import { ScoreBox } from "@/components";

export const MainLayout = () => {
  return (
    <div className="flex landscape:flex-row portrait:flex-col w-full h-full font-brand landscape:lg:flex-row">
      <ScoreBox variant="A" />
      <ScoreBox variant="B" />
    </div>
  );
};
