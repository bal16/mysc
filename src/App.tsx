import {
  ResetButton,
  MainLayout,
  SettingsModal,
  WakeLockIndicator,
  PWABadge,
} from "@/components";
import { ScoreProvider } from "@/providers";
import { useWakeLock, useHaptics } from "@/hooks";
import { useState } from "react";

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const wakeLock = useWakeLock();
  const haptics = useHaptics();

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
          haptics={haptics}
        />
        <PWABadge />
      </ScoreProvider>
    </div>
  );
}

export default App;
