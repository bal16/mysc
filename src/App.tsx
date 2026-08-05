import { ResetButton, MainLayout } from "@/components";
import { ScoreProvider } from "@/providers";
import { SettingsModal } from "./components/SettingsModal";
import { useState } from "react";

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="relative h-screen overflow-hidden w-screen text-foreground">
      <ScoreProvider>
        <MainLayout onOpenSettings={() => setIsModalOpen(true)} />
        <ResetButton />
        <SettingsModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      </ScoreProvider>
    </div>
  );
}

export default App;
