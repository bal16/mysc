import {
  Indicator,
  Indicators,
  ResetButton,
  MainLayout,
  SettingsSheet,
  PWABadge,
} from "@/components";
import { ScoreProvider } from "@/providers";
import { useWakeLock, useHaptics } from "@/hooks";
import { RiSunLine, RiSmartphoneLine } from "react-icons/ri";
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
        <Indicators>
          <Indicator
            isSupported={wakeLock.isSupported}
            isEnabled={wakeLock.isEnabled}
            onToggle={wakeLock.toggle}
            icon={<RiSunLine className="h-4 w-4" />}
            label="Keep Screen Awake"
          />
          <Indicator
            isSupported={haptics.isSupported}
            isEnabled={haptics.isEnabled}
            onToggle={haptics.toggle}
            icon={<RiSmartphoneLine className="h-4 w-4" />}
            label="Haptic Feedback"
          />
        </Indicators>
        <SettingsSheet
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
