# Guida di stile per le voci di Correspondentia Theatri

Vincolante per chiunque scriva o amplii un corpo di voce. Deriva dal §4.2 del BRIEF
e dal registro del volume sorgente in `contenuti/`.

## Che cosa toccare e che cosa no

- Si modifica **solo il corpo** della voce: tutto ciò che sta **dopo** la seconda riga `---`
  del file in `src/content/voci/<id>.md`.
- **Mai** toccare il frontmatter (id, titolo, tipo, parte, sommario, periodo, luoghi,
  alias, peso, archi, fonti): è la fonte del grafo, validata dalla build.
- Il segnaposto `<!-- da-ampliare -->` va **rimosso** e sostituito dal testo completo.
- Il corpo non ripete il sommario alla lettera: lo sviluppa.

## Lunghezze (per campo `peso` del frontmatter)

| peso | parole target |
|---|---|
| 5 | 900–1200 |
| 4 | 700–1000 |
| 3 | 500–800 |
| 2 | 300–500 |
| 1 | 200–350 |

## Registro

Divulgativo-accademico: rigoroso, non apologetico, non derisorio. Il modello è il volume
in `contenuti/`: frasi piene, andamento saggistico, nessun tono «misterioso», nessun
sensazionalismo, nessuna seconda persona. Si può essere eleganti e persino ironici dove
il materiale lo consente (l'ironia del volume è asciutta), mai sarcastici.

In pratica:

- corsivo per termini tecnici e titoli d'opera (*prisca theologia*, *De vita*);
- virgolette basse «» per citazioni brevi e usi segnalati;
- grassetto sobrio per gli snodi concettuali, non per enfasi decorativa;
- sezioni `##` solo per voci di peso ≥ 3; mai `#` (il titolo lo mette la pagina);
- niente elenchi puntati come scorciatoia: si usano quando l'elenco è la forma giusta.

## Regole vincolanti (dal §4.2 del BRIEF)

1. **Piano descrittivo vs piano fattuale, sempre distinti.** Ricostruire che cosa una
   dottrina sosteneva e perché fosse sensata nel suo contesto; dire separatamente e senza
   ambiguità dove le sue pretese verificabili sono state smentite (trasmutazione metallica,
   astrologia predittiva, segnature). Le due cose non si escludono: vanno entrambe dette.
2. **Datazione reale vs dichiarata** per ogni opera pseudoepigrafa, entrambe esplicite.
3. **Niente citazioni lunghe da opere sotto copyright.** Parafrasare. Citazioni testuali
   solo da testi di pubblico dominio, sotto le 15 parole, fra «».
4. **Le pratiche si descrivono, non si istruiscono.** Nessuna procedura riproducibile,
   nessuna ricetta, nessun dosaggio, nessuna sequenza operativa completa. Struttura, logica,
   storia: sì. Istruzioni: no. La tossicità storica del laboratorio alchemico e i rischi
   delle pratiche si dicono apertamente, come contenuto e non come disclaimer.
5. **Nessun contenuto che presenti gruppi umani come responsabili occulti degli eventi.**
   Dove le fonti storiche contengono materiale razzista (razze-radici teosofiche, ariosofia)
   lo si nomina come tale e lo si contestualizza; le formulazioni indifendibili si dicono
   indifendibili.
6. **Ogni affermazione controversa è attribuita**: «secondo Scholem», «la tesi di Yates»,
   «come ha mostrato Hutton». Il testo non parla mai dal pulpito dell'anonimato su punti
   discussi.

## Accuratezza

- La base fattuale sono i file in `contenuti/` più il sapere consolidato e non controverso.
- **Vietato inventare**: date precise, titoli, aneddoti, citazioni testuali e riferimenti
  bibliografici che non si è in grado di garantire. Nel dubbio: formulazione generica
  («all'inizio del secolo», «gli studiosi») o omissione.
- Il campo `fonti` del frontmatter non si tocca e non si duplica nel corpo; nel corpo si
  attribuiscono le tesi per nome, senza apparato di note.

## Struttura consigliata per tipo

- **corrente**: origine e contesto → dottrina/nucleo → sviluppo storico → eredità e riletture.
- **persona**: chi era e perché conta → l'opera/le idee → ricezione ed eredità. Non biografie
  complete: profili funzionali all'atlante.
- **concetto**: definizione precisa → logica interna → occorrenze principali nelle correnti →
  valutazione critica (dove si applica: statuto fattuale).
- **pratica**: che cos'è e a che scopo → struttura (descritta, mai istruita) → storia →
  statuto fattuale e rischi dove pertinenti.
- **simbolo**: mai «significa X». Occorrenze nei contesti (con le tensioni fra sensi) →
  funzione che la spiega. I dizionari di simboli sono repertori, non tavole di equivalenza.
- **opera**: che cos'è → contenuto → datazione reale e dichiarata → fortuna.
- **evento**: che cosa accadde → perché è uno snodo del campo.
- **luogo**: che cosa vi accadde e perché lì; il luogo come contesto, non cartolina.

## Collegamenti interni

- Collegare le altre voci quando compaiono nel testo: `[Ficino](/voce/ficino)`.
- Solo id esistenti (l'elenco completo è in `docs/inventario-voci.md`); la build fallisce
  sui collegamenti pendenti.
- Collegare la prima occorrenza rilevante, non ogni occorrenza; 3–8 link per voce sono
  una buona misura.
- Non linkare la voce a se stessa; non usare URL assoluti né il prefisso del sito.

## Esempio di attacco (registro)

> La *Fama Fraternitatis* non annuncia una scoperta: annuncia un'assenza ben costruita.
> La confraternita che invita i dotti d'Europa a farsi avanti non ha indirizzo, e chi
> scrive per essere ammesso — furono centinaia — non riceverà risposta, per l'ottima
> ragione che non c'è nessuno a rispondere.

Così: fatti precisi, giudizio storiografico esplicito, nessuna strizzata d'occhio al mistero.
