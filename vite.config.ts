import { fileURLToPath, URL } from "node:url";
import vue from "@vitejs/plugin-vue";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";
import { VitePWA } from "vite-plugin-pwa";

// Static, backend-free PWA. `base` defaults to "/" for root hosting; the GitHub
// Pages workflow sets VITE_BASE to "/<repo>/" so deep links and assets resolve
// under the project sub-path.
export default defineConfig({
  base: process.env.VITE_BASE ?? "/",
  plugins: [
    vue(),
    tailwindcss(),
    VitePWA({
      registerType: "autoUpdate",
      includeAssets: ["favicon.svg", "apple-touch-icon.png"],
      manifest: {
        name: "MagicBox",
        short_name: "MagicBox",
        description: "Party games for the family — pass the phone and play.",
        theme_color: "#6d28d9",
        background_color: "#0c0a09",
        display: "standalone",
        display_override: ["fullscreen"],
        // start_url and scope are intentionally omitted: vite-plugin-pwa derives
        // them from Vite's `base`, so the installed PWA works at "/" or under a
        // GitHub Pages "/<repo>/" sub-path without edits.
        icons: [
          { src: "pwa-192x192.png", sizes: "192x192", type: "image/png" },
          { src: "pwa-512x512.png", sizes: "512x512", type: "image/png" },
          {
            src: "pwa-maskable-512x512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "maskable",
          },
        ],
      },
      workbox: {
        globPatterns: ["**/*.{js,css,html,svg,png,ico,woff2}"],
        // Single-page app: serve the shell for any deep-link route when offline.
        navigateFallback: "/index.html",
      },
    }),
  ],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
});
