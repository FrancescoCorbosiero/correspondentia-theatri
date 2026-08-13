import { z } from 'zod';

/**
 * Schema condiviso fra le content collections di Astro e lo script di build
 * del grafo (scripts/build-data.ts). Rispecchia il §3 del BRIEF.
 */

export const TIPI_NODO = [
  'parte',
  'corrente',
  'concetto',
  'pratica',
  'simbolo',
  'persona',
  'opera',
  'evento',
  'luogo',
] as const;

export type TipoNodo = (typeof TIPI_NODO)[number];

export const TIPI_ARCO = [
  'influenza',
  'deriva_da',
  'si_oppone_a',
  'usa_simbolo',
  'pratica',
  'elabora',
  'rilegge',
  'contiene',
  'contemporaneo_di',
  'attribuzione_infondata',
] as const;

export type TipoArco = (typeof TIPI_ARCO)[number];

/** Etichette leggibili per l'interfaccia. */
export const ETICHETTE_TIPO_NODO: Record<TipoNodo, string> = {
  parte: 'Parte',
  corrente: 'Corrente',
  concetto: 'Concetto',
  pratica: 'Pratica',
  simbolo: 'Simbolo',
  persona: 'Persona',
  opera: 'Opera',
  evento: 'Evento',
  luogo: 'Luogo',
};

export const ETICHETTE_TIPO_ARCO: Record<TipoArco, string> = {
  influenza: 'influenza',
  deriva_da: 'deriva da',
  si_oppone_a: 'si oppone a',
  usa_simbolo: 'usa il simbolo',
  pratica: 'pratica',
  elabora: 'elabora',
  rilegge: 'rilegge',
  contiene: 'contiene',
  contemporaneo_di: 'contemporaneo di',
  attribuzione_infondata: 'attribuzione infondata',
};

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
