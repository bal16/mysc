import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { VitePWA } from "vite-plugin-pwa";
import PWAOptions from "./VitePWAOptions";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), VitePWA(PWAOptions)],
  resolve: {
    alias: {
      "@": "/src",
    },
  },
});
