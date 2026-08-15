# Prompt · Costruisci un atlante Correspondentia da un seme

> **Come usarlo.** Apri una sessione di Claude Code su una copia di questo
> repository (template/fork di `correspondentia-theatri`), metti il seme in
> `kit/seme.json` (o allegalo al prompt chiedendo di salvarlo lì), e incolla
> questo file. Tutto ciò che segue è rivolto a Claude Code.

Questo repository è il **motore** di un atlante ipermediale a grafo: pipeline
dati con validazione Zod, viste (grafo 2D, cosmo 3D, timeline, percorsi,
volume lineare, ricerca, atlante dei simboli, blog), tema "strumento
cartografico", test unitari ed e2e, CI e deploy su GitHub Pages. Il contenuto
attuale (esoterismo occidentale) è **il caso di riferimento da sostituire**
con quello del seme. La UX non si tocca; cambia ciò che il seme dichiara.

## 0 · Valida il seme, poi decidi

```bash
npm ci
npx tsx kit/valida-seme.ts kit/seme.json
```

- Errori (✗): fermati e correggi il seme prima di tutto il resto.
- Avvisi (⚠): riportali all'utente nel riepilogo iniziale con il tuo piano
  (colmarli durante la costruzione o accettarli motivando).
- Verdetto `idoneo-con-adattamenti`: leggi le note della valutazione — sono
  vincoli di progetto (es. doppio registro disattivato ⇒ nascondi
  l'interruttore "leggendarie" in legenda e nello stato URL).

## 1 · Adatta il motore alla tassonomia

Nell'ordine, perché tutto il resto dipende da qui:

1. `src/lib/costanti.ts` — sostituisci `TIPI_NODO` (quelli del seme + `parte`),
   `TIPI_ARCO`, e le etichette con quelle del seme.
2. `src/lib/schema.ts` — rivedi i `superRefine` degli archi: la regola "arco
   derivato ⇒ mai dichiarato" va applicata ai tipi in `tassonomia.archiDerivati`;
   la regola "nota obbligatoria" ai tipi in `doppioRegistro.tipiLeggendari`.
3. `src/lib/grafo-client.ts` — il filtro degli archi spenti di default deve
   leggere i tipi leggendari del seme (non `attribuzione_infondata` cablato).
4. `src/lib/palette.ts` + `src/styles/global.css` — se le parti non sono 6,
   estendi/riduci `COLORI_PARTE` e le variabili `--parte-*` mantenendo la
   distinguibilità in deuteranopia: il test `palette-deuteranopia.test.ts`
   è il giudice, aggiornalo con il nuovo numero di parti e fallo passare.
5. Cerca ogni occorrenza residua dei tipi vecchi (`grep -rn` su `src/`,
   `scripts/`, `tests/`) — legenda, etichette dei dossier, controlli.

## 2 · Sostituisci il contenuto con il seme

1. **Svuota** `src/content/voci/`, `src/content/percorsi/`,
   `src/content/blog/`, `contenuti/` e le pagine di `src/pages/diagrammi/`
   (tranne `index.astro`).
2. **Genera le voci** da `kit/seme.json`: una `.md` per voce con frontmatter
   completo (id, titolo, tipo, parte, peso, sommario, periodo, alias, luoghi,
   archi, fonti) e un **corpo breve provvisorio** (2–4 frasi dal sommario +
   spunti). Le voci `parte-N` si generano dalle `parti` del seme. Scriviti
   uno script usa-e-getta in `kit/` per questa trasformazione: niente
   generazione a mano di 200 file.
3. **Percorsi**: una `.md` per percorso; le `tracce` diventano i `testo`
   delle tappe (se una traccia è sotto le 40 parole, sviluppala già ora).
4. **Identità**: nome e sottotitolo del progetto in `package.json`, `Base.astro`,
   `Intestazione`, `PiePagina`, `index.astro`, `README`, JSON-LD; `BASE` in
   `astro.config.mjs` = nome del nuovo repository; monogramma del marchio
   (2 lettere dal nome) in `Intestazione`, `PiePagina` e `favicon.svg`.
   Il tema resta quello del motore: è già indipendente dall'argomento.
5. Da qui in avanti la pipeline deve girare: `npm test` (schema + invarianti
   del grafo verdi) e `npm run build`. Non procedere con contenuti lunghi
   finché la base non è verde.

## 3 · Scrivi i contenuti (le fasi lunghe)

Nell'ordine che ha funzionato per il caso di riferimento:

1. **Corpi delle voci** alle lunghezze di `regole.lunghezze`, in lotti
   tematici (un tipo o una parte alla volta), rispettando **ogni guardrail**
   del seme in **ogni** corpo. Link interni `[titolo](/voce/id)` solo verso
   voci esistenti — la pipeline li valida e la build fallisce sui rotti.
   Committa per lotti, non in un colpo solo.
2. **Volume lineare**: scrivi i capitoli in `contenuti/` (un file per parte,
   più un capitolo introduttivo "come usare questo volume"), prosa continua
   che attraversa le voci della parte nell'ordine giusto. La pipeline li
   trasforma nei capitoli di `/leggi`.
3. **Diagrammi** (se il seme li dichiara): una pagina Astro ciascuno, SVG
   inline disegnato su misura, tema-consapevole (variabili CSS, mai colori
   fissi), con alternativa testuale completa.
4. **Blog**: 3 articoli iniziali del "diario di redazione" — perché questo
   atlante, come studiarci, la scelta epistemica del doppio registro nel
   dominio (o la sua assenza). Adatta, non copiare, quelli del riferimento.
5. **Home**: statistiche, porte e testi della home leggono già dai dati
   generati; verifica che i testi fissi non citino più il vecchio argomento.

## 4 · Verifica, deploy, definizione di fatto

- `npm test` · `npm run build` · `node scripts/verifica-bundle.mjs` ·
  `npx playwright test` (in locale con
  `PLAYWRIGHT_EXECUTABLE=/opt/pw-browsers/chromium` se l'ambiente lo
  richiede). Aggiorna le e2e dove citano titoli del vecchio argomento.
- `npx tsx kit/estrai-seme.ts` deve rigenerare un seme equivalente a quello
  di partenza (stessa struttura, stessi conteggi): è la prova che contenuto
  e seme sono allineati. Aggiorna `kit/esempio/` col nuovo seme.
- Screenshot di home (chiaro/scuro), un dossier voce, il grafo → all'utente.
- CI verde sul branch; per pubblicare: GitHub Pages → Source "GitHub Actions"
  (impostazione che solo l'utente può attivare).

**Fatto** significa: seme valido e allineato, zero voci col corpo
provvisorio, tutte le suite verdi, budget bundle rispettato, screenshot
consegnati. Se l'utente ha fissato un budget di tempo/token, la priorità è:
base verde (fasi 0–2) > corpi di peso 5 e 4 > volume > resto dei corpi >
diagrammi > blog.
