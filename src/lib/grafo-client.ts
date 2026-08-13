/**
 * Utilità lato client per le viste grafo: caricamento di graph.json,
 * visibilità secondo i filtri, ego-network, componenti connesse.
 */
import type { ArcoGrafo, DatiGrafo, NodoGrafo } from './tipi-grafo';
import type { StatoGrafo } from './percorsi-url';
import { INTERVALLO_TEMPO, withBase } from './percorsi-url';
import { TIPI_ARCO, TIPI_NODO, type TipoArco, type TipoNodo } from './costanti';

let cache: Promise<DatiGrafo> | null = null;

/** Carica (una sola volta) il grafo pre-costruito. */
export function caricaGrafo(): Promise<DatiGrafo> {
  if (!cache) {
    cache = fetch(withBase('/data/graph.json')).then((r) => {
      if (!r.ok) throw new Error(`graph.json: ${r.status}`);
      return r.json() as Promise<DatiGrafo>;
    });
  }
  return cache;
}

export interface FiltriEffettivi {
  tipi: Set<TipoNodo>;
  archi: Set<TipoArco>;
  parti: Set<number>;
  da: number;
  a: number;
  leggendarie: boolean;
}

export function filtriDaStato(stato: StatoGrafo): FiltriEffettivi {
  return {
    tipi: new Set(stato.tipi ?? [...TIPI_NODO]),
    archi: new Set(stato.archi ?? TIPI_ARCO.filter((t) => t !== 'attribuzione_infondata')),
    parti: new Set(stato.parti ?? [1, 2, 3, 4, 5, 6]),
    da: stato.da ?? INTERVALLO_TEMPO[0],
    a: stato.a ?? INTERVALLO_TEMPO[1],
    leggendarie: stato.leggendarie ?? false,
  };
}

/** Un nodo senza periodo è atemporale: mai filtrato dal tempo. */
export function nodoInTempo(nodo: NodoGrafo, da: number, a: number): boolean {
  if (!nodo.periodo) return true;
  return nodo.periodo.da <= a && nodo.periodo.a >= da;
}

export function nodoVisibile(nodo: NodoGrafo, f: FiltriEffettivi): boolean {
  return f.tipi.has(nodo.tipo) && f.parti.has(nodo.parte) && nodoInTempo(nodo, f.da, f.a);
}

export function arcoVisibile(
  arco: ArcoGrafo,
  f: FiltriEffettivi,
  visibiliNodi: (id: string) => boolean
): boolean {
  if (arco.tipo === 'attribuzione_infondata' && !f.leggendarie) return false;
  if (!f.archi.has(arco.tipo)) return false;
  return visibiliNodi(arco.da) && visibiliNodi(arco.a);
}

/** Mappa id → nodo. */
export function indicePerId(dati: DatiGrafo): Map<string, NodoGrafo> {
  return new Map(dati.nodi.map((n) => [n.id, n]));
}

/** Adiacenza non orientata (senza contiene, salvo includiContiene). */
export function adiacenza(
  dati: DatiGrafo,
  opzioni: { includiContiene?: boolean; includiLeggendarie?: boolean } = {}
): Map<string, Set<string>> {
  const adj = new Map<string, Set<string>>();
  const aggiungi = (a: string, b: string) => {
    if (!adj.has(a)) adj.set(a, new Set());
    adj.get(a)!.add(b);
  };
  for (const arco of dati.archi) {
    if (arco.tipo === 'contiene' && !opzioni.includiContiene) continue;
    if (arco.tipo === 'attribuzione_infondata' && !opzioni.includiLeggendarie) continue;
    aggiungi(arco.da, arco.a);
    aggiungi(arco.a, arco.da);
  }
  return adj;
}

/** Ego-network fino a `gradi` passi dal nodo (adiacenza data). */
export function egoNetwork(
  centro: string,
  adj: Map<string, Set<string>>,
  gradi: 1 | 2 = 1
): Set<string> {
  const dentro = new Set<string>([centro]);
  let frontiera = [centro];
  for (let g = 0; g < gradi; g++) {
    const prossima: string[] = [];
    for (const nodo of frontiera) {
      for (const vicino of adj.get(nodo) ?? []) {
        if (!dentro.has(vicino)) {
          dentro.add(vicino);
          prossima.push(vicino);
        }
      }
    }
    frontiera = prossima;
  }
  return dentro;
}

/** Componente connessa del nodo, limitata ai nodi ammessi dal predicato. */
export function componenteConnessa(
  centro: string,
  adj: Map<string, Set<string>>,
  ammesso: (id: string) => boolean
): Set<string> {
  const dentro = new Set<string>();
  if (!ammesso(centro)) return dentro;
  dentro.add(centro);
  const coda = [centro];
  while (coda.length > 0) {
    const nodo = coda.shift()!;
    for (const vicino of adj.get(nodo) ?? []) {
      if (ammesso(vicino) && !dentro.has(vicino)) {
        dentro.add(vicino);
        coda.push(vicino);
      }
    }
  }
  return dentro;
}

/** Archi entranti e uscenti di un nodo, raggruppati per tipo. */
export function archiPerTipo(dati: DatiGrafo, id: string): {
  uscenti: Map<TipoArco, ArcoGrafo[]>;
  entranti: Map<TipoArco, ArcoGrafo[]>;
} {
  const uscenti = new Map<TipoArco, ArcoGrafo[]>();
  const entranti = new Map<TipoArco, ArcoGrafo[]>();
  for (const arco of dati.archi) {
    if (arco.da === id) {
      if (!uscenti.has(arco.tipo)) uscenti.set(arco.tipo, []);
      uscenti.get(arco.tipo)!.push(arco);
    } else if (arco.a === id) {
      if (!entranti.has(arco.tipo)) entranti.set(arco.tipo, []);
      entranti.get(arco.tipo)!.push(arco);
    }
  }
  return { uscenti, entranti };
}

export function preferisceMenoMovimento(): boolean {
  return typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/** Legge i colori correnti (tema chiaro/scuro) dalle CSS custom properties. */
export function coloriTema(): {
  parte: Record<number, string>;
  testo: string;
  tenue: string;
  sfondo: string;
  bordo: string;
} {
  const stile = getComputedStyle(document.documentElement);
  const leggi = (nome: string, fallback: string) => stile.getPropertyValue(nome).trim() || fallback;
  return {
    parte: {
      1: leggi('--parte-1', '#31639c'),
      2: leggi('--parte-2', '#8c3a2e'),
      3: leggi('--parte-3', '#6b2d5c'),
      4: leggi('--parte-4', '#b08a3e'),
      5: leggi('--parte-5', '#3e7a74'),
      6: leggi('--parte-6', '#8b86af'),
    },
    testo: leggi('--testo', '#1a1a2e'),
    tenue: leggi('--testo-tenue', '#5c5a6b'),
    sfondo: leggi('--sfondo', '#f7f4ee'),
    bordo: leggi('--bordo', '#d9d2c1'),
  };
}

/** Dimensione del nodo dal peso (1-5). */
export function dimensioneDaPeso(peso: number): number {
  return 3.5 + peso * 2.1;
}
