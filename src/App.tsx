import { ResetButton, MainLayout } from "@/components";
import { ScoreProvider } from "@/providers";
import { SettingsFAB } from "./components/SettingsFAB";
import { SettingsModal } from "./components/SettingsModal";
import { useState } from "react";

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="relative h-screen overflow-hidden w-screen text-foreground">
      <ScoreProvider>
        <MainLayout />
        <ResetButton />
        <SettingsFAB onClick={() => setIsModalOpen(true)} />
        <SettingsModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      </ScoreProvider>
    </div>
  );
}

export default App;
