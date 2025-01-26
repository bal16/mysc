import { Route, Routes } from "react-router";
import { HelloPage, MainPage } from "@/pages";
function App() {
  return (
    <div className="bg-slate-900 text-slate-50 w-full h-full">
      <MainPage />
      <div className="z-50">
        <Routes>
          {/* <Route path="/" element={<HelloPage msg="Bal" />} /> */}
          {/* register the page here */}
          <Route path="/" element={<> </>} />
          <Route path="/hello" element={<HelloPage msg="World" />} />

          {/* <Route path="/*" element={<NotFoundPage />} /> */}
        </Routes>
      </div>
    </div>
  );
}

export default App;
