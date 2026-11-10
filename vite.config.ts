import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { VitePWA } from "vite-plugin-pwa";
import PWAOptions from "./vite.pwa.options";

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, ".", "");
  const appUrl =
    env.VITE_APP_URL ||
    (mode === "production"
      ? "https://mysc.vercel.app"
      : "http://localhost:5173");

  const domainMatch = appUrl.match(/^https?:\/\/([^/:]+)/);
  const appDomain = domainMatch ? domainMatch[1] : "localhost";

  return {
    plugins: [
      react(),
      tailwindcss(),
      VitePWA(PWAOptions),
      {
        name: "html-transform-env",
        transformIndexHtml: {
          order: "pre",
          handler(html) {
            return html
              .replaceAll("%VITE_APP_URL%", appUrl)
              .replaceAll("%VITE_APP_DOMAIN%", appDomain);
          },
        },
      },
    ],
    resolve: {
      alias: {
        "@": "/src",
      },
    },
  };
});
