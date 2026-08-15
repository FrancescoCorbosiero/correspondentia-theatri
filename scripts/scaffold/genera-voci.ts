/**
 * Generatore delle voci (fase 2) — idempotente.
 *
 * Trasforma l'inventario tipizzato (inv-*.ts) nei file Markdown di
 * src/content/voci: riscrive sempre il frontmatter (l'inventario è la penna,
 * il file è la fonte), ma CONSERVA il corpo se già scritto. I corpi nuovi
 * ricevono il sommario più il segnaposto <!-- da-ampliare --> che la fase 4
 * sostituisce con il testo completo.
 *
 * Produce anche docs/inventario-voci.md (il deliverable di §8.2) e infine
 * esegue le validazioni della pipeline: ogni riferimento pendente è un errore.
 *
 * Uso: npx tsx scripts/scaffold/genera-voci.ts
 */
import { existsSync, mkdirSync, readFileSync, readdirSync, writeFileSync } from 'node:fs';
import { join, resolve } from 'node:path';
import matter from 'gray-matter';
import { ETICHETTE_TIPO_ARCO, voceSchema } from '../../src/lib/schema';
import { costruisciGrafo, leggiVoci } from '../build-data';
import { CONCETTI } from './inv-concetti';
import { CORRENTI } from './inv-correnti';
import { EVENTI, LUOGHI } from './inv-eventi-luoghi';
import { OPERE } from './inv-opere';
import { PARTI } from './inv-parti';
import { PERSONE } from './inv-persone';
import { PRATICHE } from './inv-pratiche';
import { SIMBOLI } from './inv-simboli';
import type { DefVoce } from './tipi';

const RADICE = resolve(import.meta.dirname ?? '.', '../..');
const DIR_VOCI = join(RADICE, 'src/content/voci');
const FILE_INVENTARIO = join(RADICE, 'docs/inventario-voci.md');
export const MARCATORE_STUB = '<!-- da-ampliare -->';

export const INVENTARIO: DefVoce[] = [
  ...PARTI,
  ...CORRENTI,
  ...CONCETTI,
  ...PRATICHE,
  ...SIMBOLI,
  ...PERSONE,
  ...OPERE,
  ...EVENTI,
  ...LUOGHI,
];

/** Escapa una stringa per YAML fra doppi apici. */
function y(s: string): string {
  return `"${s.replace(/\\/g, '\\\\').replace(/"/g, '\\"')}"`;
}

function frontmatterYaml(def: DefVoce): string {
  const righe: string[] = ['---'];
  righe.push(`id: ${def.id}`);
  righe.push(`titolo: ${y(def.titolo)}`);
  righe.push(`tipo: ${def.tipo}`);
  righe.push(`parte: ${def.parte}`);
  righe.push(`sommario: ${y(def.sommario)}`);
  if (def.periodo) righe.push(`periodo: { da: ${def.periodo[0]}, a: ${def.periodo[1]} }`);
  if (def.luoghi && def.luoghi.length > 0) righe.push(`luoghi: [${def.luoghi.join(', ')}]`);
  if (def.alias && def.alias.length > 0) righe.push(`alias: [${def.alias.map(y).join(', ')}]`);
  righe.push(`peso: ${def.peso}`);
  if (def.archi && def.archi.length > 0) {
    righe.push('archi:');
    for (const arco of def.archi) {
      const [verso, tipo, nota] = arco;
      righe.push(
        nota
          ? `  - { verso: ${verso}, tipo: ${tipo}, nota: ${y(nota)} }`
          : `  - { verso: ${verso}, tipo: ${tipo} }`
      );
    }
  }
  if (def.fonti && def.fonti.length > 0) {
    righe.push('fonti:');
    for (const f of def.fonti) righe.push(`  - ${y(f)}`);
  }
  righe.push('---');
  return righe.join('\n');
}

function corpoStub(def: DefVoce): string {
  return `${def.sommario}\n\n${MARCATORE_STUB}\n`;
}

export function genera(): { scritte: number; conservate: number; orfane: string[] } {
  mkdirSync(DIR_VOCI, { recursive: true });
  mkdirSync(join(RADICE, 'docs'), { recursive: true });

  // unicità degli id nell'inventario
  const visti = new Set<string>();
  for (const def of INVENTARIO) {
    if (visti.has(def.id)) throw new Error(`inventario: id duplicato "${def.id}"`);
    visti.add(def.id);
  }

  let scritte = 0;
  let conservate = 0;
  for (const def of INVENTARIO) {
    const percorso = join(DIR_VOCI, `${def.id}.md`);
    let corpo = corpoStub(def);
    if (existsSync(percorso)) {
      const esistente = matter(readFileSync(percorso, 'utf-8'));
      const corpoEsistente = esistente.content.trim();
      if (corpoEsistente.length > 0 && !corpoEsistente.includes(MARCATORE_STUB)) {
        corpo = corpoEsistente + '\n';
        conservate++;
      }
    }
    writeFileSync(percorso, `${frontmatterYaml(def)}\n\n${corpo}`);
    scritte++;
  }

  // file orfani: presenti su disco ma non nell'inventario
  const orfane = readdirSync(DIR_VOCI)
    .filter((f) => f.endsWith('.md'))
    .map((f) => f.replace(/\.md$/, ''))
    .filter((id) => !visti.has(id));

  scriviInventarioDoc();
  return { scritte, conservate, orfane };
}

function scriviInventarioDoc(): void {
  const perParte = new Map<number, DefVoce[]>();
  for (const def of INVENTARIO) {
    const lista = perParte.get(def.parte) ?? [];
    lista.push(def);
    perParte.set(def.parte, lista);
  }
  const conteggioTipi = new Map<string, number>();
  let totaleArchi = 0;
  for (const def of INVENTARIO) {
    conteggioTipi.set(def.tipo, (conteggioTipi.get(def.tipo) ?? 0) + 1);
    totaleArchi += def.archi?.length ?? 0;
  }

  const righe: string[] = [
    '# Inventario delle voci di Correspondentia Theatri',
    '',
    'Documento della fase 2 (§8.2 del BRIEF): l’elenco completo delle voci proposte con tipo,',
    'parte, peso, periodo e archi dichiarati. Gli archi `contiene` (parte → voce) sono derivati',
    'automaticamente dal campo `parte` e non compaiono qui. Generato da `scripts/scaffold/genera-voci.ts`;',
    'la fonte di verità a valle della generazione sono i file in `src/content/voci/`.',
    '',
    `**Totale: ${INVENTARIO.length} voci** — ` +
      [...conteggioTipi.entries()].map(([t, n]) => `${t}: ${n}`).join(', ') +
      ` — ${totaleArchi} archi dichiarati (più i contiene derivati).`,
    '',
  ];

  const nomiParte: Record<number, string> = {
    1: 'Parte I — Definizione ed epistemologia',
    2: 'Parte II — Correnti storiche',
    3: 'Parte III — Concetti strutturali',
    4: 'Parte IV — Pratiche e vie',
    5: 'Parte V — Linguaggio simbolico',
    6: 'Parte VI — Ricezioni moderne',
  };

  for (let n = 1; n <= 6; n++) {
    const voci = (perParte.get(n) ?? []).slice().sort((a, b) => {
      if (a.tipo !== b.tipo) return a.tipo.localeCompare(b.tipo);
      if (a.peso !== b.peso) return b.peso - a.peso;
      return a.id.localeCompare(b.id);
    });
    righe.push(`## ${nomiParte[n]} (${voci.length} voci)`, '');
    righe.push('| id | titolo | tipo | peso | periodo | archi |');
    righe.push('|---|---|---|---|---|---|');
    for (const def of voci) {
      const periodo = def.periodo
        ? `${def.periodo[0]}–${def.periodo[1]}`
        : '—';
      const archi = (def.archi ?? [])
        .map(([verso, tipo]) => `${ETICHETTE_TIPO_ARCO[tipo]} → ${verso}`)
        .join('; ');
      righe.push(
        `| \`${def.id}\` | ${def.titolo.replace(/\|/g, '\\|')} | ${def.tipo} | ${def.peso} | ${periodo} | ${archi.replace(/\|/g, '\\|') || '—'} |`
      );
    }
    righe.push('');
  }

  righe.push(
    '## Archi `attribuzione_infondata`',
    '',
    'Le genealogie leggendarie, ognuna con la nota che spiega perché l’attribuzione non regge:',
    ''
  );
  for (const def of INVENTARIO) {
    for (const arco of def.archi ?? []) {
      const [verso, tipo, nota] = arco;
      if (tipo === 'attribuzione_infondata') {
        righe.push(`- **${def.id} → ${verso}**: ${nota}`);
      }
    }
  }
  righe.push('');
  writeFileSync(FILE_INVENTARIO, righe.join('\n'));
}

const eseguitoDirettamente = process.argv[1] && resolve(process.argv[1]).includes('genera-voci');
if (eseguitoDirettamente) {
  const { scritte, conservate, orfane } = genera();
  console.log(`✓ ${scritte} voci scritte (${conservate} corpi conservati)`);
  if (orfane.length > 0) {
    console.error(`✗ file orfani non presenti in inventario: ${orfane.join(', ')}`);
    process.exit(1);
  }
  // validazione completa della pipeline sul risultato
  const voci = leggiVoci();
  const { grafo, archi } = costruisciGrafo(voci);
  const infondate = archi.filter((a) => a.tipo === 'attribuzione_infondata').length;
  console.log(`✓ grafo valido: ${grafo.order} nodi, ${archi.length} archi (${infondate} attribuzioni infondate, tutte con nota)`);
  // verifica schema (ridondante ma esplicita)
  for (const v of voci) voceSchema.parse(v.fm);
  console.log('✓ schema valido su tutte le voci');
}
