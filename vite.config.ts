import { defineConfig } from "vite";
import vinext from "vinext";
import tailwindcss from "@tailwindcss/vite";
import { cloudflare } from "@cloudflare/vite-plugin";

export default defineConfig({
  // Tailwind runs through its Vite plugin here. The empty inline PostCSS config stops Vite from also
  // loading postcss.config.mjs (that file is only for the regular `next` build).
  css: { postcss: { plugins: [] } },
  plugins: [
    vinext(),
    tailwindcss(),
    cloudflare({
      // Load the Worker settings from cloudflare.config.ts (experimental in this plugin version).
      experimental: { newConfig: true },
      viteEnvironment: {
        name: "rsc",
        childEnvironments: ["ssr"],
      },
    }),
  ],
});
