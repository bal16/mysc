import {
  Indicator,
  Indicators,
  MainLayout,
  SettingsSheet,
  PWABadge,
} from "@/components";
import { ScoreProvider } from "@/providers";
import { useWakeLock, useHaptics } from "@/hooks";
import {
  RiLightbulbFill,
  RiLightbulbLine,
  RiVolumeOffVibrateLine,
  RiVolumeVibrateLine,
} from "react-icons/ri";
import { useState } from "react";

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const wakeLock = useWakeLock();
  const haptics = useHaptics();

  return (
    <div className="relative h-screen overflow-hidden w-screen text-foreground">
      <ScoreProvider>
        <MainLayout onOpenSettings={() => setIsModalOpen(true)} />
        <Indicators>
          <Indicator
            isSupported={wakeLock.isSupported}
            isEnabled={wakeLock.isEnabled}
            onToggle={wakeLock.toggle}
            activeIcon={<RiLightbulbFill className="h-4 w-4" />}
            inactiveIcon={<RiLightbulbLine className="h-4 w-4" />}
            label="Keep Screen Awake"
          />
          <Indicator
            isSupported={haptics.isSupported}
            isEnabled={haptics.isEnabled}
            onToggle={haptics.toggle}
            activeIcon={<RiVolumeVibrateLine className="h-4 w-4" />}
            inactiveIcon={<RiVolumeOffVibrateLine className="h-4 w-4" />}
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
