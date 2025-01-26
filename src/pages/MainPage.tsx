import { ScoreBox } from "@/components";

export const MainPage = () => {
  return (
    <div className="flex flex-col md:flex-row w-screen h-screen">
      <div className="border-slate-50 border w-full h-full">
        <ScoreBox name="A" />
      </div>
      <div className="border-slate-50 border w-full h-full">
        <ScoreBox name="B" />
      </div>
    </div>
  );
};
