import { Route, Routes } from "react-router";
import { MainPage, SettingsPage } from "@/pages";
import { SettingsButton } from "@/components";
import { AppProvider } from "@/providers";

function App() {
  return (
    <div className="bg-slate-900 text-slate-50 w-screen h-screen overflow-hidden relative">
      <AppProvider>
        <MainPage />
        <div className="z-50">
          <Routes>
            {/* register the page here */}
            <Route path="/" element={<> </>} />
            <Route path="/settings" element={<SettingsPage />} />
          </Routes>
        </div>
        <SettingsButton />
      </AppProvider>
    </div>
  );
}

export default App;
