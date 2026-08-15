/**
 * Budget di performance (§6 del BRIEF): il bundle iniziale della home deve
 * restare sotto i 200 KB gzip, escluse le librerie grafo (che sono in chunk
 * caricati solo dalle rotte che le usano). Questo script somma i gzip di
 * tutti gli asset JS/CSS referenziati da dist/index.html e fallisce sopra
 * la soglia. Uso: node scripts/verifica-bundle.mjs (dopo astro build).
 */
import { readFileSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { gzipSync } from 'node:zlib';

const RADICE = resolve(import.meta.dirname, '..');
const DIST = join(RADICE, 'dist');
const SOGLIA_KB = 200;

const html = readFileSync(join(DIST, 'index.html'), 'utf-8');
const asset = new Set();
// script/stili classici, isole Astro (component-url / renderer-url) e import
// inline; il base path del sito è qualunque, si aggancia al segmento /_astro/
const relativo = (url) => url.slice(url.indexOf('/_astro/') + 1);
for (const confronto of html.matchAll(/(?:src|href|component-url|renderer-url)="([^"]*\/_astro\/[^"]+\.(?:js|css))"/g)) {
  asset.add(relativo(confronto[1]));
}
for (const confronto of html.matchAll(/import\("([^"]*\/_astro\/[^"]+\.js)"\)/g)) {
  asset.add(relativo(confronto[1]));
}
if (asset.size === 0) {
  console.error('✗ nessun asset trovato in dist/index.html: controllo inattendibile (base path cambiato?)');
  process.exit(1);
}
// dipendenze statiche di primo livello dei moduli raccolti (le isole importano
// React e i chunk condivisi via import statici relativi)
const daVisitare = [...asset];
while (daVisitare.length > 0) {
  const percorso = daVisitare.pop();
  if (!percorso.endsWith('.js')) continue;
  const sorgente = readFileSync(join(DIST, percorso), 'utf-8');
  for (const confronto of sorgente.matchAll(/from"\.\/([^"]+\.js)"|import"\.\/([^"]+\.js)"/g)) {
    const nome = `_astro/${confronto[1] ?? confronto[2]}`;
    if (!asset.has(nome)) {
      asset.add(nome);
      daVisitare.push(nome);
    }
  }
}

let totale = 0;
const righe = [];
for (const percorso of [...asset].sort()) {
  const contenuto = readFileSync(join(DIST, percorso));
  const gz = gzipSync(contenuto, { level: 9 }).length;
  totale += gz;
  righe.push(`  ${(gz / 1024).toFixed(1).padStart(7)} KB  ${percorso}`);
}

const totaleKb = totale / 1024;
console.log(`Bundle della home (${asset.size} asset):`);
for (const riga of righe) console.log(riga);
console.log(`  totale: ${totaleKb.toFixed(1)} KB gzip (soglia: ${SOGLIA_KB} KB)`);

if (totaleKb > SOGLIA_KB) {
  console.error(`✗ budget superato di ${(totaleKb - SOGLIA_KB).toFixed(1)} KB`);
  process.exit(1);
}
console.log('✓ budget rispettato');
