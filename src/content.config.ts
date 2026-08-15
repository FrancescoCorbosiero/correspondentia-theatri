import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { articoloSchema, capitoloSchema, percorsoSchema, voceSchema } from './lib/schema';

/**
 * Collections di Correspondentia Theatri.
 * - voci: le ~230 voci dell'atlante (una voce = un nodo del grafo, §3.1);
 * - percorsi: i percorsi curati d'autore (§5.6);
 * - capitoli: il volume lineare per /leggi, generato da contenuti/ dalla
 *   pipeline dati (LaTeX ripulito, testo altrimenti verbatim);
 * - blog: il diario di redazione (metodo, scelte editoriali, modi d'uso).
 */
export const collections = {
  voci: defineCollection({
    loader: glob({ pattern: '*.md', base: './src/content/voci' }),
    schema: voceSchema,
  }),
  percorsi: defineCollection({
    loader: glob({ pattern: '*.md', base: './src/content/percorsi' }),
    schema: percorsoSchema,
  }),
  capitoli: defineCollection({
    loader: glob({ pattern: '*.md', base: './src/generated/capitoli' }),
    schema: capitoloSchema,
  }),
  blog: defineCollection({
    loader: glob({ pattern: '*.md', base: './src/content/blog' }),
    schema: articoloSchema,
  }),
};
