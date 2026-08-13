// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';

// Deploy previsto: GitHub Pages del repository (project page).
// Il sito vive quindi sotto /correspondentia-theatri/: ogni link interno
// passa da withBase() (src/lib/percorsi-url.ts), che usa import.meta.env.BASE_URL.
export default defineConfig({
  site: 'https://francescocorbosiero.github.io',
  base: '/correspondentia-theatri',
  trailingSlash: 'ignore',
  integrations: [react()],
  vite: {
    plugins: [tailwindcss()],
  },
  build: {
    inlineStylesheets: 'auto',
  },
});
