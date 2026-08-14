/**
 * Sostituisce il corpo di una voce lasciando intatto il frontmatter.
 * Uso: node scripts/scaffold/sostituisci-corpo.mjs <id> <<'CORPO'
 * ...testo markdown...
 * CORPO
 */
import { readFileSync, writeFileSync } from 'node:fs';
import { join, resolve } from 'node:path';

const id = process.argv[2];
if (!id) {
  console.error('uso: sostituisci-corpo.mjs <id> < corpo.md');
  process.exit(1);
}
const percorso = resolve(join(import.meta.dirname, '../../src/content/voci', `${id}.md`));
const testo = readFileSync(percorso, 'utf-8');
const fine = testo.indexOf('\n---', 3);
if (!testo.startsWith('---') || fine === -1) {
  console.error(`${id}: frontmatter non trovato`);
  process.exit(1);
}
const frontmatter = testo.slice(0, fine + 4);
const corpo = readFileSync(0, 'utf-8').trim();
if (corpo.length < 200) {
  console.error(`${id}: corpo sospettosamente corto (${corpo.length} caratteri), rifiuto`);
  process.exit(1);
}
writeFileSync(percorso, `${frontmatter}\n\n${corpo}\n`);
console.log(`✓ ${id}: ${corpo.split(/\s+/).length} parole`);
