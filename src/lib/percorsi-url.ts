/**
 * Helper per URL interni (il sito vive sotto una base path su GitHub Pages)
 * e per la serializzazione dello stato del grafo nella query string (§6).
 */
import { TIPI_ARCO, TIPI_NODO, type TipoArco, type TipoNodo } from './costanti';

export function withBase(percorso: string): string {
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  if (percorso === '/') return `${base}/`;
  return `${base}${percorso.startsWith('/') ? percorso : `/${percorso}`}`;
}

/** Stato condivisibile della vista grafo. */
export interface StatoGrafo {
  /** tipi di nodo visibili; undefined = tutti */
  tipi?: TipoNodo[];
  /** tipi di arco visibili; undefined = tutti (salvo attribuzione_infondata) */
  archi?: TipoArco[];
  /** parti visibili (1-6); undefined = tutte */
  parti?: number[];
  /** intervallo temporale [da, a] */
  da?: number;
  a?: number;
  /** nodo selezionato */
  nodo?: string;
  /** mostrare le genealogie leggendarie (default: no) */
  leggendarie?: boolean;
}

export const INTERVALLO_TEMPO: readonly [number, number] = [-800, 2030];

export function serializzaStatoGrafo(stato: StatoGrafo): string {
  const p = new URLSearchParams();
  if (stato.tipi && stato.tipi.length > 0) p.set('tipi', stato.tipi.join(','));
  if (stato.archi && stato.archi.length > 0) p.set('archi', stato.archi.join(','));
  if (stato.parti && stato.parti.length > 0) p.set('parti', stato.parti.join(','));
  if (stato.da !== undefined && stato.da !== INTERVALLO_TEMPO[0]) p.set('da', String(stato.da));
  if (stato.a !== undefined && stato.a !== INTERVALLO_TEMPO[1]) p.set('a', String(stato.a));
  if (stato.nodo) p.set('nodo', stato.nodo);
  if (stato.leggendarie) p.set('leggendarie', '1');
  const s = p.toString();
  return s ? `?${s}` : '';
}

export function analizzaStatoGrafo(query: string): StatoGrafo {
  const p = new URLSearchParams(query.startsWith('?') ? query.slice(1) : query);
  const stato: StatoGrafo = {};
  const tipi = p
    .get('tipi')
    ?.split(',')
    .filter((t): t is TipoNodo => (TIPI_NODO as readonly string[]).includes(t));
  if (tipi && tipi.length > 0) stato.tipi = tipi;
  const archi = p
    .get('archi')
    ?.split(',')
    .filter((t): t is TipoArco => (TIPI_ARCO as readonly string[]).includes(t));
  if (archi && archi.length > 0) stato.archi = archi;
  const parti = p
    .get('parti')
    ?.split(',')
    .map((n) => parseInt(n, 10))
    .filter((n) => Number.isInteger(n) && n >= 1 && n <= 6);
  if (parti && parti.length > 0) stato.parti = parti;
  const da = p.get('da');
  if (da !== null && Number.isFinite(Number(da))) stato.da = Number(da);
  const a = p.get('a');
  if (a !== null && Number.isFinite(Number(a))) stato.a = Number(a);
  const nodo = p.get('nodo');
  if (nodo && /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(nodo)) stato.nodo = nodo;
  if (p.get('leggendarie') === '1') stato.leggendarie = true;
  return stato;
}

/** Formatta un anno per l'interfaccia (anni negativi = a.C.). */
export function formattaAnno(anno: number): string {
  return anno < 0 ? `${-anno} a.C.` : String(anno);
}

export function formattaPeriodo(periodo?: { da: number; a: number }): string {
  if (!periodo) return '';
  if (periodo.da === periodo.a) return formattaAnno(periodo.da);
  return `${formattaAnno(periodo.da)} – ${formattaAnno(periodo.a)}`;
}
