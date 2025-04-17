import { ResetButton, MainLayout } from "@/components";
import { ScoreProvider } from "@/providers";

function App() {

  return (
    <div className="relative h-screen overflow-hidden w-screen text-foreground">
      <ScoreProvider>
        <MainLayout />
        <ResetButton />
      </ScoreProvider>
    </div>
  );
}

export default App;
