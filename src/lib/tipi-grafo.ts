import type { TipoArco, TipoNodo } from './costanti';

/** Nodo del grafo serializzato in graph.json (derivato dal frontmatter delle voci). */
export interface NodoGrafo {
  id: string;
  titolo: string;
  tipo: TipoNodo;
  parte: number;
  peso: number;
  sommario: string;
  periodo?: { da: number; a: number };
  luoghi: string[];
  alias: string[];
  /** posizione ForceAtlas2 pre-calcolata a build time */
  x: number;
  y: number;
  /** grado complessivo (entrata+uscita), utile per statistiche e ordinamenti */
  grado: number;
}

export interface ArcoGrafo {
  chiave: string;
  da: string;
  a: string;
  tipo: TipoArco;
  nota?: string;
}

export interface DatiGrafo {
  nodi: NodoGrafo[];
  archi: ArcoGrafo[];
  statistiche: {
    numeroNodi: number;
    numeroArchi: number;
    perTipo: Record<string, number>;
    perParte: Record<string, number>;
  };
}

/** Documento dell'indice di ricerca leggero (palette Cmd/Ctrl+K). */
export interface DocRicerca {
  id: string;
  titolo: string;
  tipo: TipoNodo;
  parte: number;
  peso: number;
  sommario: string;
  alias: string[];
}

/** Documento dell'indice full-text (/cerca): corpo in testo piano. */
export interface DocCorpo {
  id: string;
  testo: string;
}
