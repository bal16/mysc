import { ScoreProvider } from "@/providers";

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  return <ScoreProvider>{children}</ScoreProvider>;
};