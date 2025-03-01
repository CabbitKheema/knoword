import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { VitePWA } from "vite-plugin-pwa";

// https://vite.dev/config/
export default defineConfig({
  assetsInclude: ["**/*.md"],
  server: {
    port: 5000,
  },
  plugins: [
    react(),
    VitePWA({
      registerType: "prompt", // Ensures the app auto-checks for updates
      // devOptions: {
      //   enabled: true, // Enables PWA during development
      // },
      workbox: {
        // cleanupOutdatedCaches: true, // Cleans old caches
        globPatterns: ["**/*"],
        sourcemap: true,
      },
      includeAssets: ["**/*"],
      manifest: {
        name: "knoWord",
        short_name: "knoWord",
        description:
          "This is a progressive web app to help book readers find meaning of unfamiliar words in the books they read quickly and effortlessly.",
        theme_color: "#ffffff",
        icons: [
          {
            src: "/pwa-192x192.png",
            sizes: "192x192",
            type: "image/png",
            purpose: "any",
          },
          {
            src: "/pwa-512x512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "any",
          },
          {
            src: "/pwa-maskable-192x192.png",
            sizes: "192x192",
            type: "image/png",
            purpose: "maskable",
          },
          {
            src: "/pwa-maskable-512x512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "maskable",
          },
        ],
      },
    }),
  ],
});
