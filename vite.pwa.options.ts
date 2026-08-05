import { VitePWAOptions } from "vite-plugin-pwa";

export default {
  registerType: "prompt",
  includeAssets: [
    "favicon.ico",
    "apple-touch-icon.png",
    "Jaro/Jaro-Regular-VariableFont_opsz.ttf",
  ],
  manifest: {
    name: "mysc. myscore",
    short_name: "mysc.",
    description: "Simple score counting app",
    icons: [
      {
        src: "/android-chrome-192x192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/android-chrome-512x512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
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
    // theme_color & background_color are static defaults (used for install splash screen).
    // Runtime values are updated dynamically via <meta> tags in ThemeProvider.
    theme_color: "#1DA1F2",
    background_color: "#FDF6E3",
    display: "standalone",
    scope: "/",
    start_url: "/",
    orientation: "landscape",
    categories: ["games"],
  },
} as Partial<VitePWAOptions>;
