# Prompt per Claude Code — Atlante ipermediale dell'esoterismo occidentale

> Copia questo file nella root del progetto vuoto come `BRIEF.md` e avvia Claude Code con:
> `claude "Leggi BRIEF.md e implementalo. Prima di scrivere codice, presentami il piano di lavoro diviso in fasi e attendi conferma."`
> Nella stessa cartella scompatta `contenuti-esoterismo.zip` in `contenuti/`.

---

## 1. Obiettivo

Costruire un sito statico che trasformi un volume di studio sull'esoterismo occidentale (72 pagine, fornite in Markdown in `contenuti/`) in un **atlante navigabile a grafo**, dove la struttura ipertestuale non è un accessorio della lettura ma la modalità primaria di esplorazione.

Il sito deve restare **completamente utilizzabile senza grafo**: ogni vista visuale ha un equivalente testuale accessibile. Il grafo è la porta principale, non l'unica.

Il tono del contenuto è divulgativo-accademico: rigoroso, non apologetico, non derisorio. Il design deve rispettare questo registro — sobrio ed erudito, non "misterioso". Niente pentacoli fluttuanti, niente font gotici, niente sfondi stellati. Pensare a un atlante storico o a un'edizione critica digitale, non a un sito di occultismo.

---

## 2. Stack tecnico

Da usare salvo problemi bloccanti, nel qual caso segnalare l'alternativa prima di deviare.

| Ambito | Scelta | Note |
|---|---|---|
| Framework | **Astro 5** + React islands | Contenuto statico, interattività solo dove serve |
| Linguaggio | TypeScript strict | |
| Modello dati grafo | **Graphology** | + `graphology-metrics`, `graphology-shortest-path`, `graphology-layout-forceatlas2` |
| Grafo 2D | **Sigma.js v3** (WebGL) | Regge migliaia di nodi; NON usare SVG per la vista principale |
| Grafo 3D | **react-force-graph-3d** (Three.js) | Vista "cosmo" |
| Diagrammi su misura | **D3 v7** | Albero sefirotico, radiale, timeline |
| Timeline | D3 custom (no librerie pesanti) | |
| Ricerca | **FlexSearch** | Indice pre-generato a build time |
| Stile | **Tailwind CSS** | Design token custom, vedi §7 |
| Contenuto | Markdown/MDX con frontmatter, via **Astro Content Collections** | Zod schema per validazione |
| Deploy | Statico (`astro build`) | Nessun backend, nessun database |

Vincoli: nessuna chiamata di rete a runtime; tutto pre-buildato. Bundle iniziale della home sotto i 200 KB gzip escluse le librerie grafo, che vanno caricate in lazy import solo sulle rotte che le usano.

---

## 3. Modello dei dati

### 3.1 Principio della fonte unica

Il grafo **non** è un file scritto a mano parallelo al contenuto: viene **derivato a build time** dal frontmatter delle voci. Una voce = un nodo. Gli archi sono dichiarati nel frontmatter della voce di partenza. Uno script di build valida (riferimenti pendenti = errore di build) e produce `public/data/graph.json` + l'indice di ricerca.

### 3.2 Tipi di nodo

```ts
type NodeType =
  | 'parte'      // le 6 macro-aree del volume — nodi radice
  | 'corrente'   // ermetismo, gnosticismo, cabala, alchimia, teosofia…
  | 'concetto'   // corrispondenze, trasmutazione, gnosi, velo…
  | 'pratica'    // iniziazione, teurgia, divinazione, arte della memoria…
  | 'simbolo'    // albero, serpente, labirinto, acqua…
  | 'persona'    // Ficino, Plotino, Blavatsky, Jung, Yates…
  | 'opera'      // Corpus Hermeticum, Zohar, De occulta philosophia…
  | 'evento'     // 1463 traduzione di Ficino, 1614 Casaubon, 1945 Nag Hammadi…
  | 'luogo'      // Alessandria, Safed, Firenze, Londra, Ascona…
```

### 3.3 Tipi di arco

Ogni arco è **diretto** e **tipizzato**. Il tipo determina colore, tratto e filtrabilità.

```ts
type EdgeType =
  | 'influenza'        // A influenza B (filiazione documentata)
  | 'deriva_da'        // B è derivazione diretta di A
  | 'si_oppone_a'      // divergenza dottrinale esplicita
  | 'usa_simbolo'      // corrente/opera → simbolo
  | 'pratica'          // corrente → pratica
  | 'elabora'          // persona → concetto/opera
  | 'rilegge'          // ricezione moderna: Jung → alchimia
  | 'contiene'         // parte → voce (struttura tassonomica)
  | 'contemporaneo_di' // co-occorrenza temporale rilevante
  | 'attribuzione_infondata' // ⚠️ genealogia mitica NON documentata
```

**`attribuzione_infondata` è una feature concettuale centrale, non un dettaglio.** Serve a rappresentare le catene che la tradizione rivendica e che la storiografia smentisce (Egitto → Templari → Rosacroce → Massoneria; tarocchi → antico Egitto; Zohar → Shimon bar Yochai). Va resa in tratteggio, in un colore distinto, disattivata di default, con un toggle etichettato "mostra le genealogie leggendarie" e una legenda che spiega la distinzione. Ogni arco di questo tipo ha un campo `nota` obbligatorio che spiega perché l'attribuzione non regge.

### 3.4 Frontmatter di una voce

```yaml
---
id: ficino                        # slug univoco, kebab-case
titolo: "Marsilio Ficino"
tipo: persona
parte: 2                          # 1-6, la macro-area di appartenenza
sommario: "Traduttore del Corpus Hermeticum, teorico della magia astrale."
periodo: { da: 1433, a: 1499 }    # anni; negativi per a.C.; opzionale
luoghi: [firenze]
alias: ["Marsilio Ficino", "Ficinus"]   # per la ricerca
peso: 3                           # 1-5, importanza → dimensione del nodo
archi:
  - { verso: corpus-hermeticum, tipo: elabora, nota: "Traduzione del 1463" }
  - { verso: prisca-theologia, tipo: elabora }
  - { verso: magia-astrale, tipo: pratica }
  - { verso: neoplatonismo, tipo: deriva_da }
  - { verso: picatrix, tipo: deriva_da, nota: "Fonte diretta del De vita III" }
fonti:
  - "Faivre, Accès de l'ésotérisme occidental"
  - "Yates, Giordano Bruno e la tradizione ermetica"
---
```

Corpo della voce: Markdown, 400–1500 parole a seconda del peso.

---

## 4. Contenuto: da 6 capitoli a ~200 voci

I file in `contenuti/` sono il volume in forma lineare. **Vanno smontati in voci autonome**, non copiati pari pari.

### 4.1 Procedura

1. Estrarre come voci tutte le entità già trattate esplicitamente (ogni sezione `##` e `###` è quasi sempre una voce).
2. Creare voci per persone e opere oggi solo citate di passaggio (Giamblico, Proclo, Abulafia, Luria, Dee, Agrippa, Böhme, Swedenborg, Lévi, Blavatsky, Steiner, Crowley, Guénon, Jung, Scholem, Corbin, Yates, Faivre, Hanegraaff; *Corpus Hermeticum*, *Zohar*, *Picatrix*, *De occulta philosophia*, *Atalanta fugiens*, manifesti rosacrociani, *Liber AL*).
3. Il glossario (`09_glossario.md`) fornisce già ~120 definizioni: ognuna diventa il `sommario` di una voce o una voce breve autonoma.
4. La cronologia (`08_cronologia.md`) fornisce i nodi `evento` e i campi `periodo`.
5. **Ampliare** ogni voce oltre il testo di partenza: dove il volume dedica un paragrafo, la voce web deve arrivare a 600–1200 parole. Aggiungere contesto, controversie storiografiche, ricezione successiva.

### 4.2 Regole di scrittura (vincolanti)

- **Distinguere sempre il piano descrittivo dal piano fattuale.** Ricostruire cosa una dottrina sosteneva e perché fosse sensata nel suo contesto; dire separatamente e senza ambiguità dove le sue pretese verificabili sono state smentite (trasmutazione metallica, astrologia predittiva, dottrina delle segnature).
- **Datazione reale vs. dichiarata**: ogni opera pseudoepigrafa deve avere entrambe.
- **Niente citazioni lunghe da opere sotto copyright.** Parafrasare. Citazioni brevi solo da testi di pubblico dominio e sempre sotto le 15 parole.
- **Le pratiche vanno descritte, non istruite.** Nessuna procedura riproducibile, nessuna ricetta, nessun dosaggio. Mantenere la nota sulla tossicità delle sostanze storiche del laboratorio alchemico e la sezione su etica, rischi e dinamiche settarie: sono parte del contenuto, non un disclaimer legale, e vanno resi come voci di primo piano, non nascosti in un footer.
- Nessun contenuto che presenti gruppi umani come responsabili occulti degli eventi storici; dove le fonti storiche contengono materiale razzista (razze-radici teosofiche, ariosofia) lo si nomina come tale e lo si contestualizza.

---

## 5. Le viste

### 5.1 `/` — Home
Ingresso a tre porte: **Esplora il grafo**, **Leggi il volume**, **Cerca**. Sotto, quattro percorsi curati d'autore (vedi §5.6). Nessun muro di testo.

### 5.2 `/grafo` — Vista 2D (principale)
Sigma.js + Graphology, layout ForceAtlas2 pre-calcolato a build time e salvato nelle coordinate dei nodi (il layout a runtime su ~200 nodi è accettabile ma deve partire da posizioni stabili, per evitare che il grafo "salti" a ogni caricamento).

Funzioni richieste:
- colore per `parte`, forma o icona per `tipo`, dimensione per `peso`;
- hover: evidenzia l'ego-network, sfuma il resto;
- click: apre il pannello laterale con sommario, tipo, periodo, archi in entrata/uscita raggruppati per tipo, link alla voce completa;
- pannello filtri: per tipo di nodo, per tipo di arco, per parte;
- **slider temporale** (dal -800 al 2030): filtra nodi e archi la cui esistenza non interseca l'intervallo; in modalità "riproduci" scorre e mostra il campo che si popola;
- ricerca con zoom-to-node;
- pulsante "isola cluster" e "espandi vicinato di secondo grado";
- **fallback accessibile**: `/grafo/elenco`, tabella ordinabile e filtrabile con le stesse informazioni, linkata visibilmente e raggiungibile da tastiera.

### 5.3 `/cosmo` — Vista 3D
`react-force-graph-3d`. Asse Z = tempo (i nodi antichi in profondità, i moderni in superficie): questo dà al 3D una funzione informativa e non solo scenografica. Nodi cliccabili con volo di camera, nebbia per la profondità, controlli orbitali. Deve degradare con grazia: se WebGL non è disponibile o `prefers-reduced-motion` è attivo, reindirizzare a `/grafo` con un avviso.

### 5.4 `/tempo` — Timeline
D3, orizzontale, a corsie per tipo di nodo, con zoom semantico (millenni → secoli → decenni). Sincronizzata con il grafo: selezionando un intervallo si può passare a `/grafo` con lo stesso filtro applicato.

### 5.5 `/voce/[id]` — Dossier
Testo lungo, sommario in cima, mini-grafo ego (Sigma in modalità statica, ~30 nodi), archi elencati e raggruppati per tipo con le note, periodo, fonti, "voci vicine". Navigazione a tastiera fra voci correlate.

### 5.6 `/percorso/[slug]` — Percorsi curati
Sequenze narrate di 6–10 voci, con il grafo che evidenzia il cammino man mano che si scorre. Almeno quattro da implementare:
- *Da Plotino a Jung*: come l'emanazione neoplatonica diventa individuazione;
- *La vita e la morte di una falsa antichità*: Ermete dal 1463 al 1614;
- *Come si inventa una tradizione*: manifesti rosacrociani → alti gradi → mito templare;
- *Il serpente*: un simbolo attraverso otto contesti.

### 5.7 `/percorsi/trova` — Ricerca di cammini
Due selettori di voce, cammino minimo con `graphology-shortest-path`, catena resa come sequenza di frasi ("Ficino **deriva da** Neoplatonismo, che **influenza** …"), animata sul grafo. Se non esiste cammino, dirlo esplicitamente — è un'informazione, non un errore.

### 5.8 `/simboli` — Atlante
Griglia dei nodi `simbolo`; per ciascuno, la voce e il sottografo delle correnti che lo impiegano.

### 5.9 `/diagrammi` — Diagrammi su misura (D3/SVG, non force-directed)
- **Albero sefirotico**: 10 sefirot + 22 sentieri, cliccabili, con pannello delle corrispondenze; disegnato a mano nelle coordinate canoniche, non generato da layout automatico.
- **Fasi dell'opera alchemica**: scrollytelling nigredo → albedo → citrinitas → rubedo, con la sequenza degli uccelli e il *solve et coagula*.
- **I tre mondi di Agrippa**: elementare, celeste, intellettuale, con le voci collegate a ciascun livello.
- **Ruota delle corrispondenze**: pianeti / metalli / giorni / organi, con avvertenza esplicita che si tratta di un sistema storico, non di medicina.

### 5.10 `/leggi` — Modalità lineare
Il volume nell'ordine originale, capitolo per capitolo, con indice laterale e progressione di lettura. Parità di contenuto: nulla deve esistere solo nel grafo.

### 5.11 `/cerca`
FlexSearch su titoli, alias, sommari e corpo. Command palette globale su `Cmd/Ctrl+K`.

---

## 6. Requisiti trasversali

- **Accessibilità**: WCAG 2.1 AA. Ogni vista grafica ha alternativa testuale; focus visibile; navigazione completa da tastiera; `aria-label` sui controlli; rispetto di `prefers-reduced-motion` (disattiva animazioni di layout e volo di camera).
- **Performance**: LCP < 2.5 s su connessione simulata 4G; librerie grafo in `import()` dinamico; immagini in AVIF/WebP con dimensioni esplicite.
- **URL condivisibili**: lo stato del grafo (filtri, intervallo temporale, nodo selezionato) va serializzato nella query string.
- **SEO**: ogni voce è una pagina statica con meta description dal `sommario` e JSON-LD `DefinedTerm`.
- **Responsive**: su mobile il grafo 2D resta usabile (pan/zoom touch, pannello a bottom-sheet); il 3D è offerto ma con avviso sul consumo.
- **Test**: Vitest per la validazione dello schema e per la costruzione del grafo (nessun arco pendente, nessun ciclo in `contiene`, ogni nodo raggiungibile); Playwright per i tre percorsi utente critici.

---

## 7. Direzione visiva

- Fondo chiaro pergamena (`#F7F4EE`), inchiostro (`#1A1A2E`), accento porpora (`#6B2D5C`), accento oro (`#8A6A2F`). Tema scuro come variante, non come default.
- Serif per il testo lungo (EB Garamond o Spectral), sans per l'interfaccia (Inter o Söhne).
- Colori dei cluster: sei tinte desaturate distinguibili anche in deuteranopia — verificare con un simulatore, non a occhio.
- Nessuna animazione decorativa. Le uniche animazioni ammesse sono quelle che comunicano un cambiamento di stato (transizione di layout, evidenziazione di un cammino).

---

## 8. Fasi di lavoro

Presentare il piano e attendere conferma prima di iniziare. Ordine suggerito:

1. **Scaffolding**: Astro + TS + Tailwind, content collections, schema Zod, script di build del grafo, test di validazione. Con 10 voci finte, per verificare la pipeline end-to-end.
2. **Estrazione contenuti**: smontare `contenuti/` in voci; produrre prima l'elenco completo degli id proposti con tipo, parte e archi, e **farlo approvare** prima di scrivere i corpi.
3. **Vista 2D + dossier + fallback elenco**. È il cuore: se il tempo finisce qui, il prodotto è già utile.
4. **Ampliamento dei contenuti** alle lunghezze target.
5. **Timeline, percorsi curati, ricerca di cammini**.
6. **3D, diagrammi su misura, atlante dei simboli**.
7. **Accessibilità, performance, test, deploy**.

Al termine di ogni fase: build verde, test verdi, breve resoconto di cosa è cambiato e di cosa resta.

---

## 9. Criteri di accettazione

- Da qualunque voce si raggiunge qualunque altra voce correlata in massimo tre click.
- Lo slider temporale mostra una differenza visibile e corretta fra il grafo al 300 d.C. e quello al 1600.
- Gli archi `attribuzione_infondata` sono spenti di default, hanno una legenda che ne spiega lo statuto e ognuno ha la sua nota.
- Il sito è integralmente consultabile con JavaScript delle viste grafo non caricato (le pagine voce e `/leggi` sono statiche).
- Nessuna voce contiene istruzioni operative riproducibili per pratiche rischiose.
- Ogni affermazione fattuale controversa è attribuita a chi la sostiene.
