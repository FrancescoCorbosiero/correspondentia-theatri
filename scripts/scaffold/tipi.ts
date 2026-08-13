import type { TipoArco, TipoNodo } from '../../src/lib/schema';

/**
 * Formato compatto per l'inventario delle voci (fase 2 del BRIEF, §8.2).
 * Questi file sono la penna con cui è stato scritto il frontmatter iniziale:
 * il generatore (genera-voci.ts) li trasforma in file Markdown in
 * src/content/voci, che da quel momento sono la fonte unica (§3.1).
 * Il generatore è idempotente: riscrive il frontmatter ma conserva i corpi
 * già scritti.
 */
export type ArcoDef = [verso: string, tipo: TipoArco] | [verso: string, tipo: TipoArco, nota: string];

export interface DefVoce {
  id: string;
  titolo: string;
  tipo: TipoNodo;
  parte: 1 | 2 | 3 | 4 | 5 | 6;
  sommario: string;
  periodo?: [da: number, a: number];
  luoghi?: string[];
  alias?: string[];
  peso: 1 | 2 | 3 | 4 | 5;
  archi?: ArcoDef[];
  fonti?: string[];
}

/** Anno convenzionale per "tuttora vivo/attivo". */
export const OGGI = 2026;
