import { expect, test } from '@playwright/test';

/**
 * I tre percorsi utente critici (§6 del BRIEF):
 * 1. home → grafo → selezione di un nodo → voce completa;
 * 2. ricerca rapida (Ctrl+K) → voce → relazioni;
 * 3. fallback accessibile: elenco navigato da tastiera → voce.
 */

test('1 · dalla home al grafo, dal grafo alla voce', async ({ page }) => {
  await page.goto('.');
  await expect(page).toHaveTitle(/Correspondentia Theatri/);

  // la porta principale
  await page.getByRole('link', { name: /Esplora il grafo/ }).click();
  await expect(page).toHaveURL(/\/grafo/);

  // il grafo si monta (canvas WebGL presenti) e il fallback è dichiarato
  await expect(page.locator('.vista-grafo-canvas canvas').first()).toBeAttached({ timeout: 20_000 });
  await expect(page.getByRole('link', { name: /elenco delle voci/i }).first()).toBeVisible();

  // ricerca interna con zoom-to-node → pannello → voce completa
  await page.getByLabel('Cerca nel grafo').fill('Casaubon');
  await page.getByRole('listbox', { name: 'Risultati della ricerca' }).getByRole('button').first().click();
  const pannello = page.getByRole('complementary', { name: /Dettagli della voce/ });
  await expect(pannello).toBeVisible();
  await pannello.getByRole('link', { name: /Apri la voce completa/ }).click();
  await expect(page).toHaveURL(/\/voce\/datazione-di-casaubon/);
  await expect(page.getByRole('heading', { level: 1 })).toContainText('Casaubon');
});

test('2 · ricerca rapida globale e dossier della voce', async ({ page }) => {
  await page.goto('.');
  // l'isola della palette si idrata in idle: insisti finché la scorciatoia non risponde
  const dialogo = page.getByRole('dialog', { name: 'Ricerca rapida' });
  await expect(async () => {
    await page.keyboard.press('Control+k');
    await expect(dialogo).toBeVisible({ timeout: 700 });
  }).toPass({ timeout: 15_000 });

  await dialogo.getByRole('combobox').fill('ficino');
  await expect(dialogo.getByRole('option').first()).toBeVisible({ timeout: 15_000 });
  await page.keyboard.press('Enter');

  await expect(page).toHaveURL(/\/voce\/ficino/);
  // il dossier: relazioni raggruppate, fonti, voci vicine, stato nel grafo
  await expect(page.getByRole('heading', { name: 'Relazioni' })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Voci vicine' })).toBeVisible();
  await expect(page.getByRole('link', { name: /Vedi questa voce nel grafo/ })).toBeVisible();
  // JSON-LD DefinedTerm presente
  const jsonLd = await page.locator('script[type="application/ld+json"]').textContent();
  expect(jsonLd).toContain('DefinedTerm');
});

test('3 · fallback accessibile: elenco da tastiera fino alla voce', async ({ page }) => {
  await page.goto('grafo/elenco');
  await expect(page.getByRole('heading', { level: 1 })).toContainText('Elenco delle voci');

  // filtro compilato da tastiera
  const filtro = page.getByLabel('Filtra per testo');
  await filtro.click();
  await page.keyboard.type('agrippa');
  await expect(page.locator('#conteggio-elenco')).toContainText(/voci mostrate/);

  // dal filtro alla prima riga risultato, solo con la tastiera
  const collegamento = page
    .locator('#tabella-elenco tbody tr:not([hidden])')
    .first()
    .getByRole('link');
  await expect(collegamento).toContainText('Agrippa');
  await collegamento.focus();
  await page.keyboard.press('Enter');
  await expect(page).toHaveURL(/\/voce\/agrippa/);

  // requisiti trasversali sulla pagina voce
  await expect(page.locator('html')).toHaveAttribute('lang', 'it');
  await expect(page.locator('a.salta-al-contenuto')).toBeAttached();
});

test('gli archi leggendari sono spenti di default e dichiarati in legenda', async ({ page }) => {
  await page.goto('grafo');
  const commutatore = page.getByRole('checkbox', { name: /genealogie leggendarie/i });
  await expect(commutatore).not.toBeChecked();
  await page.getByText('Legenda').click();
  await expect(page.getByText(/spenti per impostazione predefinita/)).toBeVisible();
});
