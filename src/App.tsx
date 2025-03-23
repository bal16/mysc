// import { MainPage, SettingsPage } from "@/pages";
// import { SettingsButton } from "@/components";
import { AppProvider } from "@/providers";
import { MainLayout } from "@/components/MainLayout";

function App() {
  return (
    <div className="relative h-[100dvh] overflow-hidden w-[100dvw] text-foreground">
      <AppProvider>
        <MainLayout />
        {/* <SettingsButton /> */}
      </AppProvider>
    </div>
  );
}

export default App;
