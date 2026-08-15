/**
 * Pipeline dati di Correspondentia Theatri — fonte unica (§3.1 del BRIEF).
 *
 * Legge il frontmatter di tutte le voci in src/content/voci, valida con lo
 * schema Zod condiviso, deriva gli archi `contiene` dal campo `parte`,
 * verifica gli invarianti del grafo (riferimenti pendenti = errore di build),
 * calcola il layout ForceAtlas2 in modo deterministico e scrive:
 *
 *   - src/generated/graph.json      (importato dalle pagine a build time)
 *   - public/data/graph.json        (caricato dalle isole client)
 *   - public/data/ricerca-voci.json (indice leggero: palette di ricerca)
 *   - public/data/ricerca-corpo.json(indice full-text per /cerca)
 *
 * Uso: `npm run data` (invocato automaticamente da dev/build/test).
 */
import { mkdirSync, readFileSync, readdirSync, writeFileSync } from 'node:fs';
import { basename, join, resolve } from 'node:path';
import matter from 'gray-matter';
import { MultiDirectedGraph } from 'graphology';
import forceAtlas2 from 'graphology-layout-forceatlas2';
import { voceSchema, type VoceFrontmatter } from '../src/lib/schema';
import type { ArcoGrafo, DatiGrafo, DocCorpo, DocRicerca, NodoGrafo } from '../src/lib/tipi-grafo';

const RADICE = resolve(import.meta.dirname ?? '.', '..');
const DIR_VOCI = join(RADICE, 'src/content/voci');
const DIR_GENERATI = join(RADICE, 'src/generated');
const DIR_PUBBLICI = join(RADICE, 'public/data');

export interface VoceLetta {
  fm: VoceFrontmatter;
  corpo: string;
  file: string;
}

export class ErroreValidazione extends Error {
  constructor(public problemi: string[]) {
    super(`Validazione fallita (${problemi.length} problemi):\n` + problemi.map((p) => `  - ${p}`).join('\n'));
    this.name = 'ErroreValidazione';
  }
}

/** PRNG deterministico per il jitter iniziale del layout. */
function mulberry32(seme: number): () => number {
  let a = seme >>> 0;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export function leggiVoci(dir: string = DIR_VOCI): VoceLetta[] {
  const problemi: string[] = [];
  const voci: VoceLetta[] = [];
  let file: string[] = [];
  try {
    file = readdirSync(dir).filter((f) => f.endsWith('.md'));
  } catch {
    throw new ErroreValidazione([`cartella delle voci non trovata: ${dir}`]);
  }
  file.sort(); // ordine deterministico
  for (const nome of file) {
    const percorso = join(dir, nome);
    const grezzo = readFileSync(percorso, 'utf-8');
    const { data, content } = matter(grezzo);
    const esito = voceSchema.safeParse(data);
    if (!esito.success) {
      for (const errore of esito.error.issues) {
        problemi.push(`${nome} → ${errore.path.join('.') || '(radice)'}: ${errore.message}`);
      }
      continue;
    }
    const slug = basename(nome, '.md');
    if (esito.data.id !== slug) {
      problemi.push(`${nome} → l'id frontmatter "${esito.data.id}" non coincide con il nome del file "${slug}"`);
      continue;
    }
    voci.push({ fm: esito.data, corpo: content.trim(), file: nome });
  }
  const visti = new Map<string, string>();
  for (const v of voci) {
    const prec = visti.get(v.fm.id);
    if (prec) problemi.push(`id duplicato "${v.fm.id}" in ${prec} e ${v.file}`);
    visti.set(v.fm.id, v.file);
  }
  if (problemi.length > 0) throw new ErroreValidazione(problemi);
  return voci;
}

export interface GrafoCostruito {
  grafo: MultiDirectedGraph;
  voci: VoceLetta[];
  archi: ArcoGrafo[];
}

/**
 * Costruisce il grafo e verifica gli invarianti strutturali.
 * Gli archi `contiene` sono derivati dal campo `parte` di ogni voce
 * (fonte unica: lo schema rifiuta i `contiene` dichiarati a mano).
 */
export function costruisciGrafo(voci: VoceLetta[]): GrafoCostruito {
  const problemi: string[] = [];
  const grafo = new MultiDirectedGraph();
  const perId = new Map(voci.map((v) => [v.fm.id, v]));

  // nodi radice: esattamente una voce di tipo "parte" per ciascuna parte 1-6
  const radici = new Map<number, string>();
  for (const v of voci) {
    if (v.fm.tipo === 'parte') {
      if (radici.has(v.fm.parte)) problemi.push(`due nodi "parte" per la parte ${v.fm.parte}`);
      radici.set(v.fm.parte, v.fm.id);
    }
  }
  for (let n = 1; n <= 6; n++) {
    if (!radici.has(n)) problemi.push(`manca il nodo radice di tipo "parte" per la parte ${n}`);
  }

  for (const v of voci) grafo.addNode(v.fm.id, { ...v.fm });

  const archi: ArcoGrafo[] = [];
  const vistiArchi = new Set<string>();
  const aggiungiArco = (da: string, a: string, tipo: ArcoGrafo['tipo'], nota?: string, origine?: string) => {
    if (da === a) {
      problemi.push(`${origine ?? da}: arco riflessivo ${da} → ${a} non ammesso`);
      return;
    }
    if (!perId.has(a)) {
      problemi.push(`${origine ?? da}: riferimento pendente "${a}" (tipo ${tipo})`);
      return;
    }
    const chiave = `${da}->${a}:${tipo}`;
    if (vistiArchi.has(chiave)) {
      problemi.push(`${origine ?? da}: arco duplicato ${chiave}`);
      return;
    }
    vistiArchi.add(chiave);
    const arco: ArcoGrafo = nota ? { chiave, da, a, tipo, nota } : { chiave, da, a, tipo };
    archi.push(arco);
    grafo.addDirectedEdgeWithKey(chiave, da, a, { tipo, nota });
  };

  for (const v of voci) {
    for (const arco of v.fm.archi) aggiungiArco(v.fm.id, arco.verso, arco.tipo, arco.nota, v.file);
    for (const luogo of v.fm.luoghi) {
      const nodoLuogo = perId.get(luogo);
      if (!nodoLuogo) problemi.push(`${v.file}: luogo pendente "${luogo}"`);
      else if (nodoLuogo.fm.tipo !== 'luogo')
        problemi.push(`${v.file}: "${luogo}" è nei luoghi ma ha tipo "${nodoLuogo.fm.tipo}"`);
    }
  }

  // archi tassonomici derivati
  for (const v of voci) {
    if (v.fm.tipo === 'parte') continue;
    const radice = radici.get(v.fm.parte);
    if (radice) aggiungiArco(radice, v.fm.id, 'contiene');
  }

  // aciclicità di `contiene` (garantita per costruzione, verificata comunque)
  const soloContiene = new Map<string, string[]>();
  for (const a of archi) {
    if (a.tipo !== 'contiene') continue;
    const lista = soloContiene.get(a.da) ?? [];
    lista.push(a.a);
    soloContiene.set(a.da, lista);
  }
  const stato = new Map<string, 'aperto' | 'chiuso'>();
  const visita = (nodo: string, pila: string[]): void => {
    if (stato.get(nodo) === 'chiuso') return;
    if (stato.get(nodo) === 'aperto') {
      problemi.push(`ciclo in "contiene": ${[...pila, nodo].join(' → ')}`);
      return;
    }
    stato.set(nodo, 'aperto');
    for (const succ of soloContiene.get(nodo) ?? []) visita(succ, [...pila, nodo]);
    stato.set(nodo, 'chiuso');
  };
  for (const id of soloContiene.keys()) visita(id, []);

  // raggiungibilità: ogni nodo raggiungibile dalle radici (grafo non orientato)
  if (problemi.length === 0) {
    const raggiunti = new Set<string>();
    const coda: string[] = [...radici.values()];
    for (const r of coda) raggiunti.add(r);
    while (coda.length > 0) {
      const nodo = coda.shift()!;
      grafo.forEachNeighbor(nodo, (vicino) => {
        if (!raggiunti.has(vicino)) {
          raggiunti.add(vicino);
          coda.push(vicino);
        }
      });
    }
    for (const v of voci) {
      if (!raggiunti.has(v.fm.id)) problemi.push(`nodo non raggiungibile dalle radici: ${v.fm.id}`);
    }
  }

  if (problemi.length > 0) throw new ErroreValidazione(problemi);
  return { grafo, voci, archi };
}

/** Layout ForceAtlas2 deterministico: posizioni iniziali circolari con jitter seedato. */
export function calcolaLayout(grafo: MultiDirectedGraph): void {
  const n = grafo.order;
  const casuale = mulberry32(1614); // l'anno di Casaubon come seme
  const ids = [...grafo.nodes()].sort();
  ids.forEach((id, i) => {
    const angolo = (2 * Math.PI * i) / Math.max(n, 1);
    const raggio = 100 + casuale() * 40;
    grafo.setNodeAttribute(id, 'x', Math.cos(angolo) * raggio + (casuale() - 0.5) * 10);
    grafo.setNodeAttribute(id, 'y', Math.sin(angolo) * raggio + (casuale() - 0.5) * 10);
  });
  const impostazioni = forceAtlas2.inferSettings(grafo);
  forceAtlas2.assign(grafo, {
    iterations: 800,
    settings: { ...impostazioni, adjustSizes: false, scalingRatio: 12, gravity: 1.2 },
  });
}

/** Markdown → testo piano per l'indice full-text. */
export function testoPiano(md: string): string {
  return md
    .replace(/```[\s\S]*?```/g, ' ')
    .replace(/`([^`]*)`/g, '$1')
    .replace(/!\[[^\]]*\]\([^)]*\)/g, ' ')
    .replace(/\[([^\]]*)\]\([^)]*\)/g, '$1')
    .replace(/^#{1,6}\s+/gm, '')
    .replace(/[*_>#|]/g, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

export function serializza(costruito: GrafoCostruito): {
  dati: DatiGrafo;
  ricerca: DocRicerca[];
  corpi: DocCorpo[];
} {
  const { grafo, voci, archi } = costruito;
  const nodi: NodoGrafo[] = [...voci]
    .sort((x, y) => x.fm.id.localeCompare(y.fm.id))
    .map((v) => {
      const base: NodoGrafo = {
        id: v.fm.id,
        titolo: v.fm.titolo,
        tipo: v.fm.tipo,
        parte: v.fm.parte,
        peso: v.fm.peso,
        sommario: v.fm.sommario,
        luoghi: v.fm.luoghi,
        alias: v.fm.alias,
        x: Math.round((grafo.getNodeAttribute(v.fm.id, 'x') as number) * 100) / 100,
        y: Math.round((grafo.getNodeAttribute(v.fm.id, 'y') as number) * 100) / 100,
        grado: grafo.degree(v.fm.id),
      };
      if (v.fm.periodo) base.periodo = v.fm.periodo;
      return base;
    });

  const perTipo: Record<string, number> = {};
  const perParte: Record<string, number> = {};
  for (const nodo of nodi) {
    perTipo[nodo.tipo] = (perTipo[nodo.tipo] ?? 0) + 1;
    perParte[String(nodo.parte)] = (perParte[String(nodo.parte)] ?? 0) + 1;
  }

  const dati: DatiGrafo = {
    nodi,
    archi: [...archi].sort((x, y) => x.chiave.localeCompare(y.chiave)),
    statistiche: {
      numeroNodi: nodi.length,
      numeroArchi: archi.length,
      perTipo,
      perParte,
    },
  };

  const ricerca: DocRicerca[] = nodi.map((n) => ({
    id: n.id,
    titolo: n.titolo,
    tipo: n.tipo,
    parte: n.parte,
    peso: n.peso,
    sommario: n.sommario,
    alias: n.alias,
  }));

  const corpi: DocCorpo[] = voci
    .map((v) => ({ id: v.fm.id, testo: testoPiano(v.corpo) }))
    .sort((x, y) => x.id.localeCompare(y.id));

  return { dati, ricerca, corpi };
}

/**
 * Verifica i collegamenti interni nei corpi: ogni link markdown a /voce/<id>
 * deve puntare a una voce esistente, e nessun link deve incorporare la base
 * del sito (la base viene applicata da un plugin rehype a build time).
 */
export function validaCollegamenti(voci: VoceLetta[]): void {
  const ids = new Set(voci.map((v) => v.fm.id));
  const problemi: string[] = [];
  const schema = /\]\((\/[^)#\s]*)(?:#[^)\s]*)?\)/g;
  for (const v of voci) {
    for (const confronto of v.corpo.matchAll(schema)) {
      const href = confronto[1]!;
      if (href.startsWith('/correspondentia-theatri')) {
        problemi.push(`${v.file}: link con base hardcoded "${href}" (usare percorsi radice)`);
        continue;
      }
      const voce = href.match(/^\/voce\/([a-z0-9-]+)\/?$/);
      if (voce) {
        if (!ids.has(voce[1]!)) problemi.push(`${v.file}: link a voce inesistente "${voce[1]}"`);
      } else if (!/^\/(grafo|cosmo|tempo|voce|percorso|percorsi|simboli|diagrammi|leggi|cerca)(\/|$)/.test(href)) {
        problemi.push(`${v.file}: link interno non riconosciuto "${href}"`);
      }
    }
  }
  if (problemi.length > 0) throw new ErroreValidazione(problemi);
}

export function eseguiPipeline(dirVoci: string = DIR_VOCI): DatiGrafo {
  const voci = leggiVoci(dirVoci);
  validaCollegamenti(voci);
  const costruito = costruisciGrafo(voci);
  calcolaLayout(costruito.grafo);
  const { dati, ricerca, corpi } = serializza(costruito);

  mkdirSync(DIR_GENERATI, { recursive: true });
  mkdirSync(DIR_PUBBLICI, { recursive: true });
  writeFileSync(join(DIR_GENERATI, 'graph.json'), JSON.stringify(dati, null, 1));
  writeFileSync(join(DIR_PUBBLICI, 'graph.json'), JSON.stringify(dati));
  writeFileSync(join(DIR_PUBBLICI, 'ricerca-voci.json'), JSON.stringify(ricerca));
  writeFileSync(join(DIR_PUBBLICI, 'ricerca-corpo.json'), JSON.stringify(corpi));
  return dati;
}

const eseguitoDirettamente =
  process.argv[1] && resolve(process.argv[1]).includes('build-data');
if (eseguitoDirettamente) {
  try {
    const dati = eseguiPipeline();
    const s = dati.statistiche;
    console.log(
      `✓ grafo: ${s.numeroNodi} nodi, ${s.numeroArchi} archi ` +
        `(${Object.entries(s.perTipo).map(([t, n]) => `${t}:${n}`).join(', ')})`
    );
  } catch (errore) {
    if (errore instanceof ErroreValidazione) {
      console.error('✗ ' + errore.message);
      process.exit(1);
    }
    throw errore;
  }
}
