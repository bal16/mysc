import { VitePWAOptions } from "vite-plugin-pwa";

export default {
  registerType: "prompt",
  includeAssets: ["favicon.ico", "apple-touch-icon.png"],
  manifest: {
    name: "Peteika-mysc",
    short_name: "mysc-app",
    description: "Simple score counting app",
    icons: [
      {
        src: "/android-chrome-192x192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "favicon",
      },
      {
        src: "/android-chrome-512x512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "favicon",
      },
      {
        src: "/apple-touch-icon.png",
        sizes: "180x180",
        type: "image/png",
        purpose: "apple touch icon",
      },
      {
        purpose: "maskable",
        sizes: "1024x1024",
        src: "maskable_icon.png",
        type: "image/png",
      },
      {
        purpose: "maskable",
        sizes: "512x512",
        src: "maskable_icon_x512.png",
        type: "image/png",
      },
    ],
    theme_color: "#0099f9",
    background_color: "#fff",
    display: "standalone",
    scope: "/",
    start_url: "/",
    orientation: "landscape",
  },
} as Partial<VitePWAOptions>;
