import { ResetButton, MainLayout, SettingsModal, WakeLockIndicator } from "@/components";
import { ScoreProvider } from "@/providers";
import { useWakeLock } from "@/hooks";
import { useState } from "react";

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const wakeLock = useWakeLock();

  return (
    <div className="relative h-screen overflow-hidden w-screen text-foreground">
      <ScoreProvider>
        <MainLayout onOpenSettings={() => setIsModalOpen(true)} />
        <ResetButton />
        <WakeLockIndicator isActive={wakeLock.isActive} />
        <SettingsModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          wakeLock={wakeLock}
        />
      </ScoreProvider>
    </div>
  );
}

export default App;

