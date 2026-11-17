import { VitePWAOptions } from "vite-plugin-pwa";

export default {
  registerType: "prompt",
  includeAssets: [
    "favicon.ico",
    "favicon.svg",
    "favicon-32x32.png",
    "apple-touch-icon.png",
    "Jaro/Jaro-Regular-VariableFont_opsz.ttf",
  ],
  manifest: {
    id: "/",
    name: "mysc. | Fast Badminton Score Counter for Every Game",
    short_name: "mysc.",
    description:
      "A fast, simple badminton score counter for casual matches, short games, and easy scorekeeping on every device.",
    lang: "en",
    dir: "ltr",
    start_url: "/",
    scope: "/",
    display: "standalone",
    orientation: "landscape",
    // theme_color & background_color are static defaults (used for install splash screen).
    // Runtime values are updated dynamically via <meta> tags in ThemeProvider.
    theme_color: "#1DA1F2",
    background_color: "#FDF6E3",
    categories: ["sports", "utilities"],
    prefer_related_applications: false,
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
        src: "/maskable_icon_x512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
      {
        src: "/maskable_icon.png",
        sizes: "1024x1024",
        type: "image/png",
        purpose: "maskable",
      },
    ],
    screenshots: [
      {
        src: "/screenshots/light-origin.webp",
        sizes: "1972x1109",
        type: "image/webp",
        label: "Badminton score counter in Light Origin theme",
      },
      {
        src: "/screenshots/light-warm.webp",
        sizes: "1972x1109",
        type: "image/webp",
        label: "Badminton score counter in Light Warm theme",
      },
      {
        src: "/screenshots/dark-warm.webp",
        sizes: "1972x1109",
        type: "image/webp",
        label: "Badminton score counter in Dark Warm theme",
      },
      {
        src: "/screenshots/dark-origin.webp",
        sizes: "1972x1109",
        type: "image/webp",
        label: "Badminton score counter in Dark Origin theme",
      },
      {
        src: "/screenshots/amoled-warm.webp",
        sizes: "1972x1109",
        type: "image/webp",
        label: "Badminton score counter in AMOLED Warm theme",
      },
      {
        src: "/screenshots/amoled-origin.webp",
        sizes: "1972x1109",
        type: "image/webp",
        label: "Badminton score counter in AMOLED Origin theme",
      },
    ],
  },
} as Partial<VitePWAOptions>;
