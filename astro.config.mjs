// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';
import node from '@astrojs/node';

// https://astro.build/config
export default defineConfig({
  integrations: [react()],
  output: 'server',
  adapter: node({
    mode: 'standalone'
  }),
  server: {
    host: true,
    port: process.env.PORT ? parseInt(process.env.PORT) : 4321
  },
  vite: {
    plugins: [tailwindcss()],
    ssr: {
      noExternal: ["framer-motion", "@emotion/react"],
    }
  },
});