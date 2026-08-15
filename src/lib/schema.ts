import { z } from 'zod';
import { TIPI_ARCO, TIPI_NODO } from './costanti';

/**
 * Schema condiviso fra le content collections di Astro e lo script di build
 * del grafo (scripts/build-data.ts). Rispecchia il §3 del BRIEF.
 * Le costanti e le etichette (senza dipendenze) vivono in costanti.ts;
 * qui vengono riesportate per comodità del codice lato build.
 */
export {
  ETICHETTE_TIPO_ARCO,
  ETICHETTE_TIPO_NODO,
  TIPI_ARCO,
  TIPI_NODO,
  type TipoArco,
  type TipoNodo,
} from './costanti';

export const kebabId = z
  .string()
  .regex(
    /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
    'id non valido: usare kebab-case ascii (es. "corpus-hermeticum")'
  );

export const arcoSchema = z
  .object({
    verso: kebabId,
    tipo: z.enum(TIPI_ARCO),
    nota: z.string().min(1).optional(),
  })
  .superRefine((arco, ctx) => {
    if (arco.tipo === 'contiene') {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message:
          'gli archi "contiene" sono derivati automaticamente dal campo "parte": non dichiararli a mano',
      });
    }
    if (arco.tipo === 'attribuzione_infondata' && (!arco.nota || arco.nota.trim().length < 10)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message:
          'ogni arco "attribuzione_infondata" richiede una "nota" che spieghi perché l\'attribuzione non regge',
      });
    }
  });

export const periodoSchema = z
  .object({
    da: z.number().int().gte(-3000).lte(2100),
    a: z.number().int().gte(-3000).lte(2100),
  })
  .refine((p) => p.da <= p.a, {
    message: 'periodo non valido: "da" deve precedere o eguagliare "a"',
  });

export const voceSchema = z.object({
  id: kebabId,
  titolo: z.string().min(1).max(120),
  tipo: z.enum(TIPI_NODO),
  parte: z.number().int().gte(1).lte(6),
  sommario: z.string().min(20).max(500),
  periodo: periodoSchema.optional(),
  luoghi: z.array(kebabId).default([]),
  alias: z.array(z.string().min(1)).default([]),
  peso: z.number().int().gte(1).lte(5),
  archi: z.array(arcoSchema).default([]),
  fonti: z.array(z.string().min(1)).default([]),
});

export type VoceFrontmatter = z.infer<typeof voceSchema>;

export const passoPercorsoSchema = z.object({
  voce: kebabId,
  titolo: z.string().min(1).optional(),
  /** narrazione della tappa: il testo che accompagna il cammino sul grafo */
  testo: z.string().min(40),
});

export const percorsoSchema = z.object({
  slug: kebabId,
  titolo: z.string().min(1),
  sottotitolo: z.string().min(1),
  ordine: z.number().int().gte(1),
  tappe: z.array(passoPercorsoSchema).min(4).max(12),
});

export type PercorsoFrontmatter = z.infer<typeof percorsoSchema>;

export const capitoloSchema = z.object({
  ordine: z.number().int().gte(0),
  titolo: z.string().min(1),
  sottotitolo: z.string().optional(),
});

/** Articolo del blog: il diario di redazione dell'atlante. */
export const articoloSchema = z.object({
  titolo: z.string().min(1).max(120),
  sommario: z.string().min(20).max(500),
  data: z.coerce.date(),
  tag: z.array(z.string().min(1)).default([]),
  autore: z.string().min(1).default('La redazione'),
});

export type ArticoloFrontmatter = z.infer<typeof articoloSchema>;
