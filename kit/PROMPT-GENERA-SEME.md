# Prompt · Genera il seme di un atlante Correspondentia

> **Come usarlo.** Incolla questo file a Claude insieme a: (a) l'argomento-nodo
> proposto, (b) ogni materiale utile (appunti, bibliografie, una mappa grezza,
> vincoli editoriali), (c) facoltativamente `kit/esempio/seme-esoterismo.json`
> come riferimento di formato e densità. Il risultato è un unico file JSON
> conforme a `kit/SEME.schema.json`, pronto per `kit/PROMPT-COSTRUISCI-SITO.md`.

Sei l'architetto di un **atlante ipermediale a grafo**: un sito in cui un campo
del sapere è mappato come voci (nodi) e relazioni tipizzate (archi), con viste
multiple (grafo, timeline, percorsi narrati, volume lineare, ricerca) e una
regola epistemica centrale: **le relazioni documentate e quelle soltanto
dichiarate sono entrambe rappresentate, ma distinte** — le seconde spente di
default. Il tuo compito è trasformare un argomento proposto in un **seme**: il
file unico da cui l'intero sito può essere costruito.

Lavora nelle quattro fasi che seguono, nell'ordine. Non saltare la fase 1.

---

## 1 · Valida l'argomento-nodo

Un argomento regge questo trattamento solo se è un **campo di relazioni**, non
una lista di cose. Assegna un punteggio 1–5 a ciascun criterio:

| Criterio | Domanda | 5 | 1 |
|---|---|---|---|
| `entita-enumerabili` | Il campo si lascia scomporre in 150–300 entità nominabili di più tipi? | tipi diversi, confini netti | poche entità o confini arbitrari |
| `relazioni-tipizzabili` | Le entità sono legate da relazioni *di natura diversa* (derivazione, opposizione, uso, rilettura…)? | ≥5 tipi di relazione sensati | solo "è collegato a" |
| `profondita-temporale` | C'è uno sviluppo storico databile che renda significativa una timeline? | secoli di stratificazione | campo sincronico o atemporale |
| `doppio-registro` | Esiste una distinzione feconda fra ciò che è documentato e ciò che è dichiarato/leggendario/contestato? | il doppio registro è costitutivo del campo | nessuna pretesa da smontare |
| `letteratura-di-riferimento` | Esiste una letteratura affidabile da citare in calce alle voci? | storiografia/manualistica consolidata | solo fonti promozionali o folklore |
| `granularita-sostenibile` | Si può fissare una soglia di ingresso coerente (cosa è una voce e cosa no)? | criterio di soglia enunciabile in una frase | ogni scelta sarebbe arbitraria |

**Verdetto:**
- media ≥ 4 e nessun criterio ≤ 2 → `idoneo`;
- media ≥ 3 → `idoneo-con-adattamenti`: dichiara nelle note *quali* adattamenti
  (es. doppio registro disattivato, timeline secondaria, meno tipi di nodo);
- altrimenti → `non-idoneo`: **fermati qui.** Restituisci solo la valutazione,
  spiega perché, e proponi 2–3 riperimetrazioni che renderebbero l'argomento
  idoneo (allargarlo, restringerlo, o spostarne il fuoco sulle relazioni).

Il `doppio-registro` merita attenzione: quasi ogni campo maturo ne ha uno.
Attribuzioni spurie e pseudoepigrafi, genealogie di scuola inventate,
etimologie leggendarie, priorità di scoperta contese, canoni retrodatati,
influenze millantate. Se il punteggio è basso, chiediti prima se stai solo
guardando male; disattivalo (`doppioRegistro.attivo = false`) soltanto se
davvero non c'è nulla da distinguere.

## 2 · Adatta la tassonomia

Parti dalla tassonomia di riferimento e **piegala al dominio**; non
ereditarla passivamente.

- **Tipi di nodo** (6–9, escluso `parte` che è strutturale): quelli di
  riferimento sono `corrente, concetto, pratica, simbolo, persona, opera,
  evento, luogo`. Rinomina, elimina, aggiungi: un atlante del jazz vorrà
  `stile, musicista, disco, standard, locale, etichetta`; uno della
  crittografia `schema, attacco, primitiva, persona, macchina, evento`.
  Ogni tipo deve poter contare ≥ 5 voci, altrimenti non è un tipo.
- **Tipi di arco** (5–10): quelli di riferimento sono `influenza, deriva_da,
  si_oppone_a, usa_simbolo, pratica, elabora, rilegge, contemporaneo_di,
  contiene (derivato), attribuzione_infondata (leggendario)`. Mantieni
  la distinzione fra: archi **dichiarati** nelle voci, archi **derivati**
  dalla pipeline (`contiene` dalla parte; gli archi dai campi `luoghi`),
  archi **leggendari** (spenti di default, nota obbligatoria).
- **Doppio registro**: definisci in una frase il `criterio` che nel dominio
  separa documentato e dichiarato, e quali tipi di arco sono leggendari.

## 3 · Costruisci l'inventario (il lavoro vero)

Procedi a passate successive, mai in una sola colata:

1. **Soglia di ingresso.** Enuncia il criterio di ammissione di una voce
   (es. "ha una letteratura secondaria propria, non solo menzioni") e la
   copertura temporale/geografica. Scrivilo nelle note della valutazione.
2. **Parti** (4–8): la macro-struttura del volume lineare. Ogni parte ha
   titolo e sommario; ogni voce apparterrà a una parte. Le parti sono
   capitoli di lettura, non categorie tassonomiche: pensale come un indice.
3. **Censimento per tipo.** Per ciascun tipo di nodo, elenca le candidate a
   tappeto; poi filtra con la soglia. Obiettivo 150–300 voci (minimo 120).
   Se superi 300, alza la soglia; se non arrivi a 120, l'argomento è
   probabilmente sotto-perimetrato: torna alla fase 1.
4. **Pesi.** `5` = il nucleo che regge il campo (5–15% delle voci);
   `4` = snodi maggiori; `3` = voci piene; `2` = voci di contesto;
   `1` = voci satellite. Distribuzione sana: una piramide, non un plateau.
5. **Sommari.** 1–3 frasi per voce, informative e non promozionali: il
   sommario è ciò che appare in ricerca, nelle card e negli intestini del
   grafo. Datazione `periodo` (anni, a.C. negativi) dove ha senso: puntare
   a coprire ≥ 60% delle voci.
6. **Archi.** La passata più importante. Per ogni voce dichiara le relazioni
   *verso* altre voci (2–6 in media; densità complessiva ≥ 2 archi/voce):
   - ogni arco ha un tipo della tassonomia; niente tipi derivati a mano;
   - le relazioni leggendarie portano una `nota` che spiega perché non
     reggono (chi l'ha dichiarata, cosa dice la ricerca);
   - evita l'arco riflesso (A→B e B→A dello stesso tipo): dichiara dal lato
     più specifico;
   - a fine passata: **zero voci orfane** (senza archi né in entrata né in
     uscita) e nessun tipo di arco mai usato.
7. **Fonti.** In calce a ogni voce la letteratura reale di riferimento
   (autore, titolo — niente URL inventati, niente opere immaginarie).
   Obiettivo ≥ 80% delle voci con almeno una fonte. Se per una voce non
   sai citare nulla di reale, chiediti se la voce deve esistere.
8. **Percorsi d'autore** (3–6): sequenze narrate di 4–12 tappe che
   attraversano il grafo con una tesi (una genealogia, una polemica, un
   simbolo attraverso i contesti). Per ogni tappa una `traccia` di 1–3
   frasi: verrà sviluppata in fase di costruzione.
9. **Diagrammi** (0–5, facoltativi): le figure che il dominio chiede
   (una ruota, un albero, uno schema di fasi). Solo slug, titolo e
   descrizione: il disegno avverrà in fase di costruzione.

## 4 · Regole del progetto e uscita

- **Guardrail**: 3–8 regole epistemiche/etiche *specifiche del dominio*,
  vincolanti per chi scriverà i corpi. Modelli dal caso di riferimento:
  "descrivere le pratiche senza istruirle", "datazione reale e dichiarata
  sempre entrambe", "le dottrine indifendibili nominate come tali",
  "avvertenze concrete dove esistono rischi reali". Adattale: un atlante
  del vino avrà guardrail su salute e marketing; uno della crittografia
  su sicurezza operativa e snake-oil.
- **Lunghezze** per peso (parole del corpo): il riferimento è
  `1:[120,250] 2:[150,300] 3:[200,400] 4:[250,600] 5:[400,1500]`.
- **Nome del progetto**: proponi un nome proprio evocativo ma non kitsch,
  più sottotitolo descrittivo. Il nome non deve replicare "Correspondentia
  Theatri" (è il nome del caso di riferimento, non del motore).

**Uscita**: un unico blocco JSON valido secondo `kit/SEME.schema.json`,
`formato: "correspondentia-seme@1"`, con la valutazione della fase 1
compilata. Nessun testo fuori dal JSON (a meno di verdetto `non-idoneo`).

Prima di consegnare, ripassa questa lista:
- [ ] verdetto ≠ `non-idoneo` e note che motivano gli adattamenti
- [ ] ogni tipo di nodo ha ≥ 5 voci; ogni tipo di arco è usato ≥ 1 volta
- [ ] 120–300 voci; densità ≥ 2 archi/voce; zero orfane
- [ ] ogni arco leggendario ha la sua nota; ogni `verso` esiste
- [ ] parti numerate 1..N, ognuna con ≥ 8 voci
- [ ] ≥ 60% voci datate; ≥ 80% con fonti reali
- [ ] pesi a piramide (peso 5 ≤ 20%)
- [ ] 3–6 percorsi con tappe esistenti e tracce ≥ 40 caratteri
