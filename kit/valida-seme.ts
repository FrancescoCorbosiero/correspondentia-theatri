/**
 * Validatore dei semi Correspondentia (formato correspondentia-seme@1,
 * specificato in kit/SEME.schema.json). Due livelli:
 *   ✗ errori  — il seme non è costruibile (struttura, riferimenti, vincoli);
 *   ⚠ avvisi  — il seme è costruibile ma sotto le soglie di qualità
 *               raccomandate (densità, coperture, distribuzioni).
 * Esce con codice 1 solo in presenza di errori.
 *
 * Uso:  tsx kit/valida-seme.ts <percorso-del-seme.json>
 */
import { readFileSync } from 'node:fs';

const percorso = process.argv[2];
if (!percorso) {
  console.error('uso: tsx kit/valida-seme.ts <percorso-del-seme.json>');
  process.exit(1);
}

const errori: string[] = [];
const avvisi: string[] = [];
const kebab = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
/** i tipi della tassonomia sono identificatori di codice: snake_case ammesso */
const idTassonomia = /^[a-z0-9]+(?:[_-][a-z0-9]+)*$/;
const stringaPiena = (v: unknown): v is string => typeof v === 'string' && v.trim().length > 0;

let seme: any;
try {
  seme = JSON.parse(readFileSync(percorso, 'utf8'));
} catch (e) {
  console.error(`✗ impossibile leggere o interpretare ${percorso}: ${(e as Error).message}`);
  process.exit(1);
}

/* ── struttura di base ────────────────────────────────────────────────── */

if (seme.formato !== 'correspondentia-seme@1')
  errori.push(`formato: atteso "correspondentia-seme@1", trovato ${JSON.stringify(seme.formato)}`);

for (const campo of ['nome', 'argomento', 'lingua', 'descrizione'])
  if (!stringaPiena(seme.progetto?.[campo])) errori.push(`progetto.${campo}: mancante o vuoto`);

const verdetto = seme.valutazione?.verdetto;
if (!['idoneo', 'idoneo-con-adattamenti'].includes(verdetto))
  errori.push(
    `valutazione.verdetto: "${verdetto}" — un seme si costruisce solo con verdetto "idoneo" o "idoneo-con-adattamenti"`
  );
for (const [criterio, punteggio] of Object.entries(seme.valutazione?.criteri ?? {}))
  if (!Number.isInteger(punteggio) || (punteggio as number) < 1 || (punteggio as number) > 5)
    errori.push(`valutazione.criteri.${criterio}: punteggio non intero in 1..5`);

/* ── tassonomia ───────────────────────────────────────────────────────── */

const tipiNodo: string[] = (seme.tassonomia?.tipiNodo ?? []).map((t: any) => t.id);
const tipiArco: string[] = (seme.tassonomia?.tipiArco ?? []).map((t: any) => t.id);
const archiDerivati: string[] = seme.tassonomia?.archiDerivati ?? [];
const tipiLeggendari: string[] = seme.tassonomia?.doppioRegistro?.tipiLeggendari ?? [];

if (tipiNodo.length < 3) errori.push(`tassonomia.tipiNodo: ${tipiNodo.length} tipi (minimo 3)`);
if (tipiArco.length < 4) errori.push(`tassonomia.tipiArco: ${tipiArco.length} tipi (minimo 4)`);
for (const lista of [tipiNodo, tipiArco])
  for (const id of lista) {
    if (!idTassonomia.test(id)) errori.push(`tassonomia: id "${id}" non in snake/kebab-case`);
    if (lista.indexOf(id) !== lista.lastIndexOf(id)) errori.push(`tassonomia: id "${id}" duplicato`);
  }
if (tipiNodo.includes('parte'))
  errori.push('tassonomia.tipiNodo: "parte" è strutturale e non va dichiarato');
for (const t of [...tipiLeggendari, ...archiDerivati])
  if (!tipiArco.includes(t))
    errori.push(`tassonomia: "${t}" (leggendario/derivato) non è fra i tipiArco`);
if (seme.tassonomia?.doppioRegistro?.attivo && !stringaPiena(seme.tassonomia.doppioRegistro.criterio))
  errori.push('tassonomia.doppioRegistro: attivo ma senza "criterio"');

/* ── parti ────────────────────────────────────────────────────────────── */

const parti: any[] = seme.parti ?? [];
if (parti.length < 2) errori.push(`parti: ${parti.length} (minimo 2)`);
parti.forEach((p, i) => {
  if (p.numero !== i + 1) errori.push(`parti[${i}]: numeri non consecutivi da 1 (trovato ${p.numero})`);
  if (!stringaPiena(p.id) || !kebab.test(p.id)) errori.push(`parti[${i}]: id mancante o non kebab-case`);
  if (!stringaPiena(p.titolo) || !stringaPiena(p.sommario))
    errori.push(`parti[${i}] (${p.id}): titolo o sommario mancante`);
});
const numeriParte = new Set(parti.map((p) => p.numero));

/* ── voci ─────────────────────────────────────────────────────────────── */

const voci: any[] = seme.voci ?? [];
const idNoti = new Set<string>([...parti.map((p) => p.id)]);
for (const v of voci) {
  if (idNoti.has(v.id)) errori.push(`voci: id "${v.id}" duplicato`);
  idNoti.add(v.id);
}

let archiTotali = 0;
let archiLeggendari = 0;
const grado = new Map<string, number>();
for (const v of voci) {
  const dove = `voce "${v.id}"`;
  if (!stringaPiena(v.id) || !kebab.test(v.id)) errori.push(`${dove}: id mancante o non kebab-case`);
  if (!stringaPiena(v.titolo)) errori.push(`${dove}: titolo mancante`);
  if (!tipiNodo.includes(v.tipo)) errori.push(`${dove}: tipo "${v.tipo}" non in tassonomia`);
  if (!numeriParte.has(v.parte)) errori.push(`${dove}: parte ${v.parte} inesistente`);
  if (!Number.isInteger(v.peso) || v.peso < 1 || v.peso > 5) errori.push(`${dove}: peso non in 1..5`);
  if (!stringaPiena(v.sommario) || v.sommario.length < 20 || v.sommario.length > 500)
    errori.push(`${dove}: sommario mancante o fuori da 20..500 caratteri`);
  if (v.periodo && (!Number.isInteger(v.periodo.da) || !Number.isInteger(v.periodo.a) || v.periodo.da > v.periodo.a))
    errori.push(`${dove}: periodo non valido (da ≤ a, interi; anni a.C. negativi)`);
  for (const a of v.archi ?? []) {
    archiTotali += 1;
    if (!tipiArco.includes(a.tipo)) errori.push(`${dove}: arco di tipo "${a.tipo}" non in tassonomia`);
    if (archiDerivati.includes(a.tipo))
      errori.push(`${dove}: arco "${a.tipo}" è derivato automaticamente, non va dichiarato`);
    if (tipiLeggendari.includes(a.tipo)) {
      archiLeggendari += 1;
      if (!stringaPiena(a.nota) || a.nota.trim().length < 10)
        errori.push(`${dove}: arco leggendario "${a.tipo}" → "${a.verso}" senza nota esplicativa`);
    }
    grado.set(v.id, (grado.get(v.id) ?? 0) + 1);
    grado.set(a.verso, (grado.get(a.verso) ?? 0) + 1);
  }
  // anche il campo "luoghi" deriva archi nel grafo: conta per il grado
  for (const l of v.luoghi ?? []) {
    grado.set(v.id, (grado.get(v.id) ?? 0) + 1);
    grado.set(l, (grado.get(l) ?? 0) + 1);
  }
}
// riferimenti di archi e luoghi: dopo aver raccolto tutti gli id
for (const v of voci) {
  for (const a of v.archi ?? [])
    if (!idNoti.has(a.verso)) errori.push(`voce "${v.id}": arco verso "${a.verso}" inesistente`);
  for (const l of v.luoghi ?? [])
    if (!idNoti.has(l)) errori.push(`voce "${v.id}": luogo "${l}" inesistente`);
}

/* ── percorsi ─────────────────────────────────────────────────────────── */

const percorsi: any[] = seme.percorsi ?? [];
const slugVisti = new Set<string>();
for (const p of percorsi) {
  const dove = `percorso "${p.slug}"`;
  if (!stringaPiena(p.slug) || !kebab.test(p.slug)) errori.push(`${dove}: slug mancante o non kebab-case`);
  if (slugVisti.has(p.slug)) errori.push(`${dove}: slug duplicato`);
  slugVisti.add(p.slug);
  if (!stringaPiena(p.titolo) || !stringaPiena(p.sottotitolo)) errori.push(`${dove}: titolo o sottotitolo mancante`);
  if (!Number.isInteger(p.ordine) || p.ordine < 1) errori.push(`${dove}: ordine non intero ≥ 1`);
  const tappe = p.tappe ?? [];
  if (tappe.length < 4 || tappe.length > 12) errori.push(`${dove}: ${tappe.length} tappe (attese 4..12)`);
  for (const t of tappe) {
    if (!idNoti.has(t.voce)) errori.push(`${dove}: tappa verso voce inesistente "${t.voce}"`);
    if (!stringaPiena(t.traccia) || t.traccia.trim().length < 40)
      errori.push(`${dove}: traccia della tappa "${t.voce}" mancante o < 40 caratteri`);
  }
}

/* ── diagrammi (facoltativi) ──────────────────────────────────────────── */

for (const d of seme.diagrammi ?? []) {
  if (!stringaPiena(d.slug) || !kebab.test(d.slug)) errori.push(`diagrammi: slug mancante o non kebab-case`);
  if (!stringaPiena(d.titolo)) errori.push(`diagramma "${d.slug}": titolo mancante`);
}

/* ── soglie di qualità (avvisi) ───────────────────────────────────────── */

if (voci.length < 120) avvisi.push(`${voci.length} voci: sotto la soglia raccomandata (150-300, minimo 120)`);
if (voci.length > 0) {
  const densita = archiTotali / voci.length;
  if (densita < 2) avvisi.push(`densità archi dichiarati: ${densita.toFixed(2)} per voce (raccomandato ≥ 2)`);

  const orfane = voci.filter((v) => (grado.get(v.id) ?? 0) === 0).map((v) => v.id);
  if (orfane.length > 0)
    avvisi.push(`${orfane.length} voci senza alcun arco (né in uscita né in entrata): ${orfane.slice(0, 8).join(', ')}${orfane.length > 8 ? ', …' : ''}`);

  const conFonti = voci.filter((v) => (v.fonti ?? []).length >= (seme.regole?.fontiMinime ?? 1)).length;
  if (conFonti / voci.length < 0.8)
    avvisi.push(`copertura fonti: ${Math.round((conFonti / voci.length) * 100)}% (raccomandato ≥ 80%)`);

  const conPeriodo = voci.filter((v) => v.periodo).length;
  if (conPeriodo / voci.length < 0.6)
    avvisi.push(`copertura datazioni: ${Math.round((conPeriodo / voci.length) * 100)}% (raccomandato ≥ 60%)`);

  const peso5 = voci.filter((v) => v.peso === 5).length;
  if (peso5 === 0) avvisi.push('nessuna voce di peso 5: manca il nucleo portante');
  if (peso5 / voci.length > 0.2) avvisi.push(`${peso5} voci di peso 5 (${Math.round((peso5 / voci.length) * 100)}%): la gerarchia si appiattisce oltre il 20%`);

  for (const t of tipiNodo) {
    const n = voci.filter((v) => v.tipo === t).length;
    if (n === 0) avvisi.push(`tipo di voce "${t}" dichiarato ma mai usato`);
  }
  for (const p of parti) {
    const n = voci.filter((v) => v.parte === p.numero).length;
    if (n < 8) avvisi.push(`parte ${p.numero} ("${p.titolo}"): ${n} voci (raccomandate ≥ 8)`);
  }
}
if (seme.tassonomia?.doppioRegistro?.attivo && archiLeggendari === 0)
  avvisi.push('doppio registro attivo ma nessun arco leggendario nel seme');
if (percorsi.length < 3) avvisi.push(`${percorsi.length} percorsi d’autore (raccomandati ≥ 3)`);

/* ── rapporto ─────────────────────────────────────────────────────────── */

console.log(`Seme: ${percorso}`);
console.log(
  `  ${voci.length} voci · ${archiTotali} archi dichiarati (${archiLeggendari} leggendari) · ${parti.length} parti · ${percorsi.length} percorsi`
);
for (const e of errori) console.error(`  ✗ ${e}`);
for (const a of avvisi) console.warn(`  ⚠ ${a}`);
if (errori.length > 0) {
  console.error(`✗ seme NON valido: ${errori.length} errori, ${avvisi.length} avvisi`);
  process.exit(1);
}
console.log(
  avvisi.length > 0
    ? `✓ seme valido con ${avvisi.length} avvisi di qualità`
    : '✓ seme valido, nessun avviso'
);
