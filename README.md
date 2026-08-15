# Correspondentia Theatri

Atlante ipermediale dell'esoterismo occidentale: un volume di studio (in `contenuti/`)
smontato in **234 voci collegate a grafo** — correnti, concetti, pratiche, simboli, persone,
opere, eventi, luoghi — dove la struttura ipertestuale è la modalità primaria di esplorazione,
e ogni vista grafica ha un equivalente testuale accessibile.

Le **genealogie leggendarie** (Egitto → Templari → Rosacroce → Massoneria; tarocchi → antico
Egitto; Zohar → Shimon bar Yochai…) sono una feature concettuale centrale: archi
`attribuzione_infondata` tratteggiati, spenti di default, ognuno con la nota che spiega
perché l'attribuzione non regge.

## Viste

| Rotta | Contenuto |
|---|---|
| `/grafo` | Vista 2D principale (Sigma.js): filtri, slider temporale −800→2030 con riproduzione, ego-network, cluster, stato in query string |
| `/grafo/elenco` | Fallback accessibile: tabella completa ordinabile e filtrabile |
| `/cosmo` | Vista 3D (asse Z = tempo); degrada con grazia verso il 2D |
| `/tempo` | Timeline a corsie con zoom semantico, sincronizzata col grafo |
| `/voce/[id]` | Dossier statico: sommario, corpo, archi con note, fonti, mini-grafo ego |
| `/percorso/[slug]` | 4 percorsi d'autore con mappa del cammino sincronizzata allo scroll |
| `/percorsi/trova` | Cammino minimo fra due voci, reso come catena di frasi |
| `/simboli` | Atlante dei simboli con chi li impiega |
| `/diagrammi` | Albero sefirotico, fasi dell'opera, tre mondi di Agrippa, ruota delle corrispondenze |
| `/leggi` | Il volume lineare, capitolo per capitolo, con progressione di lettura |
| `/cerca` | Full-text FlexSearch; palette globale con `Ctrl/Cmd+K` |

## Architettura dei dati (fonte unica)

Il grafo **non** è un file parallelo al contenuto: viene derivato a build time dal frontmatter
delle voci in `src/content/voci/` (una voce = un nodo; gli archi sono dichiarati nella voce di
partenza; i `contiene` parte→voce sono derivati dal campo `parte`).

```
src/content/voci/*.md ──▶ scripts/build-data.ts ──▶ src/generated/graph.json (pagine statiche)
     (frontmatter Zod)        · validazioni bloccanti     public/data/graph.json (viste client)
                              · layout ForceAtlas2        public/data/ricerca-*.json (indici)
                                deterministico
contenuti/*.md ──────────▶ scripts/build-capitoli.ts ──▶ src/generated/capitoli/ (per /leggi)
```

Validazioni che **fermano la build**: riferimenti pendenti, archi duplicati o riflessivi,
cicli in `contiene`, nodi non raggiungibili, `attribuzione_infondata` senza nota, link interni
a voci inesistenti, id non kebab-case.

## Comandi

```bash
npm run dev        # pipeline dati + server di sviluppo
npm run build      # pipeline dati + build statica in dist/
npm test           # pipeline dati + Vitest (schema, invarianti grafo, palette, URL)
npm run test:e2e   # Playwright: i tre percorsi utente critici
npm run data       # solo la pipeline dati
node scripts/verifica-bundle.mjs   # budget: home < 200 KB gzip (dopo build)
```

L'inventario delle voci (id, tipi, pesi, archi) è documentato in `docs/inventario-voci.md`;
le regole redazionali in `docs/guida-di-stile.md`. Il brief completo è `BRIEF.md`.

## Qualità

- **Accessibilità**: ogni vista grafica ha l'alternativa testuale; navigazione completa da
  tastiera; `prefers-reduced-motion` rispettato (niente riproduzione automatica, camera senza
  animazioni); i sei colori di parte sono verificati in deuteranopia **da un test automatico**
  (matrici di Machado in `tests/unit/palette-deuteranopia.test.ts`).
- **Performance**: librerie grafo caricate solo sulle rotte che le usano; bundle della home
  ~72 KB gzip (soglia 200 KB, verificata in CI); nessuna chiamata di rete a runtime (font
  self-hosted, indici pre-generati).
- **Contenuti**: piano descrittivo e piano fattuale sempre distinti; datazione reale vs
  dichiarata per le pseudoepigrafe; le pratiche sono descritte, mai istruite.

## Deploy

GitHub Pages via Actions (`.github/workflows/deploy.yml`, attivo sul ramo `main`):
in **Settings → Pages** impostare *Source: GitHub Actions*. Il sito è configurato per
`https://francescocorbosiero.github.io/correspondentia-theatri/` (base path in
`astro.config.mjs`). La CI (`ci.yml`) esegue test unitari, build, budget bundle ed e2e.

## Replica per altri argomenti

Il sito è un'istanza di un motore riutilizzabile: il contenuto è separabile in un
**seme** (JSON con tassonomia, parti, voci, archi, regole) da cui un progetto
gemello su un altro argomento-nodo può essere generato e costruito. Il flusso in
tre passi — genera il seme (con validazione dell'argomento), valida il seme,
costruisci il sito con Claude Code — è documentato in **[`kit/LEGGIMI.md`](kit/LEGGIMI.md)**.
Il seme di questo stesso sito, estratto dal contenuto reale e validato in CI, è in
`kit/esempio/seme-esoterismo.json`.
