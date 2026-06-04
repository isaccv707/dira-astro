// @ts-check
import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import node from "@astrojs/node";
import icon from "astro-icon";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";

// https://astro.build/config
export default defineConfig({
  integrations: [
    react({
      experimentalReactChildren: true,
    }),
    icon({
      include: {
        lucide: ["*"],
        tabler: ["*"],
        logos: ["*"],
        "simple-icons": ["*"],
      },
    }),
    sitemap(),
  ],
  output: "server",
  adapter: node({
    mode: "standalone",
  }),
  server: {
    host: true,
    port: process.env.PORT ? parseInt(process.env.PORT) : 4321,
  },
  vite: {
    plugins: [tailwindcss()],
    ssr: {
      noExternal: ["framer-motion", "@emotion/react"],
    },
  },
});
