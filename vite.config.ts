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
    // Worker settings (name, entry, assets, flags) come from wrangler.jsonc.
    cloudflare({
      viteEnvironment: {
        name: "rsc",
        childEnvironments: ["ssr"],
      },
    }),
  ],
});
