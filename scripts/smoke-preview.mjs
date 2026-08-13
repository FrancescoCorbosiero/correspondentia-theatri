import { chromium } from '@playwright/test';

const base = 'http://localhost:4321/correspondentia-theatri';
const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });
const pagina = await browser.newPage();
const erroriConsole = [];
pagina.on('console', (m) => {
  if (m.type() === 'error') erroriConsole.push(m.text());
});
pagina.on('pageerror', (e) => erroriConsole.push(`pageerror: ${e.message}`));

const controlla = async (percorso, attese) => {
  const risposta = await pagina.goto(`${base}${percorso}`, { waitUntil: 'networkidle' });
  const stato = risposta.status();
  const html = await pagina.content();
  const mancanti = attese.filter((a) => !html.includes(a));
  console.log(`${stato} ${percorso} ${mancanti.length === 0 ? 'OK' : 'MANCA: ' + mancanti.join(' | ')}`);
};

await controlla('/', ['Theatrum', 'Esplora il grafo', 'Percorsi']);
await controlla('/grafo', ['Controlli del grafo', 'elenco']);
await pagina.waitForTimeout(2500);
const canvas = await pagina.locator('.vista-grafo-canvas canvas').count();
console.log(`canvas sigma montati: ${canvas}`);
await controlla('/grafo/elenco', ['Elenco delle voci', 'Marsilio Ficino']);
await controlla('/voce/ficino', ['Marsilio Ficino', 'Relazioni', 'Voci vicine', 'DefinedTerm']);
await controlla('/voce/ermete-trismegisto', ['genealogia leggendaria']);
await controlla('/percorso/il-serpente', ['Tappa 1', 'serpente']);
await controlla('/cerca', ['Cerca']);
// palette: Ctrl+K sulla home
await pagina.goto(`${base}/`, { waitUntil: 'networkidle' });
await pagina.keyboard.press('Control+k');
await pagina.waitForTimeout(1200);
const dialogo = await pagina.locator('[role="dialog"][aria-label="Ricerca rapida"]').count();
console.log(`palette aperta: ${dialogo}`);
if (dialogo) {
  await pagina.fill('#palette-input', 'casaubon');
  await pagina.waitForTimeout(600);
  const opzioni = await pagina.locator('#palette-risultati [role="option"]').count();
  console.log(`risultati palette per "casaubon": ${opzioni}`);
}
console.log('errori console:', erroriConsole.length === 0 ? 'nessuno' : erroriConsole.slice(0, 6));
await browser.close();
