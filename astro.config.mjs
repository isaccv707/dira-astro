// @ts-check
import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import node from "@astrojs/node";
import icon from "astro-icon";
import tailwindcss from "@tailwindcss/vite";

// https://astro.build/config
export default defineConfig({
  // Public origin. The sitemap is served by src/pages/sitemap.xml.ts because
  // @astrojs/sitemap only lists prerendered routes and every route here is SSR.
  site: process.env.PUBLIC_SITE_URL || "https://dyranalitica.com",
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
