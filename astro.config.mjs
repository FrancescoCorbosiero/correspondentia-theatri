// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';

// Deploy previsto: GitHub Pages del repository (project page).
// Il sito vive quindi sotto /correspondentia-theatri/: ogni link interno
// passa da withBase() (src/lib/percorsi-url.ts), che usa import.meta.env.BASE_URL.
const BASE = '/correspondentia-theatri';

/**
 * I corpi delle voci linkano con percorsi radice ("/voce/ficino"): questo
 * plugin antepone la base del sito a ogni href radice nel Markdown reso.
 * @returns {(tree: any) => void}
 */
function rehypeBaseLinks() {
  /** @param {any} nodo */
  const visita = (nodo) => {
    if (nodo.type === 'element' && nodo.tagName === 'a') {
      const href = nodo.properties?.href;
      if (typeof href === 'string' && href.startsWith('/') && !href.startsWith(`${BASE}/`)) {
        nodo.properties.href = `${BASE}${href}`;
      }
    }
    for (const figlio of nodo.children ?? []) visita(figlio);
  };
  return (albero) => visita(albero);
}

export default defineConfig({
  site: 'https://francescocorbosiero.github.io',
  base: BASE,
  trailingSlash: 'ignore',
  integrations: [react()],
  markdown: {
    rehypePlugins: [rehypeBaseLinks],
  },
  vite: {
    plugins: [tailwindcss()],
  },
  build: {
    inlineStylesheets: 'auto',
  },
});
