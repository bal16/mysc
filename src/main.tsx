import App from "@/App";
import "@/styles/index.css";
import { createRoot } from "react-dom/client";
import { StrictMode } from "react";
import { ThemeProvider } from "@/providers/ThemeProvider";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </StrictMode>
);
