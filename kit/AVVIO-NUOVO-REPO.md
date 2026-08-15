# Avvio · il repo-fabbrica Correspondentia

Hai in mano l'archivio del **repo-fabbrica**: motore del sito (Astro + pipeline
dati + viste + test + CI), kit di replica (`kit/`) e semi pronti (`kit/semi/`).
Da questo repository si generano gli atlanti sui vari argomenti-nodo.

## 1 · Metti la fabbrica su un repo

```bash
# in una cartella vuota
unzip correspondentia-fabbrica.zip
git init && git add -A && git commit -m "Fabbrica Correspondentia"
git remote add origin <url-del-tuo-repo>
git push -u origin main
```

Poi verifica che giri (l'istanza di riferimento, l'esoterismo, funziona subito):

```bash
npm ci
npm run dev        # → http://localhost:4321/correspondentia-theatri/
npm test           # 28 test verdi
```

## 2 · Genera un progetto da un seme esistente

In `kit/semi/` trovi i semi già pronti e validati
(es. `seme-informatica.json` — progetto «Calculemus», 170 voci).

1. Crea il repository del nuovo progetto **come copia della fabbrica**
   (nuovo repo da questo template, o copia dei file).
2. Copia il seme scelto in `kit/seme.json`.
3. In `astro.config.mjs` imposta `BASE` al nome del nuovo repository
   (es. `/calculemus`).
4. Apri una sessione **Claude Code** sul nuovo repository e incolla il
   contenuto di `kit/PROMPT-COSTRUISCI-SITO.md`: adatterà il motore alla
   tassonomia del seme, rigenererà i contenuti e scriverà corpi, volume,
   diagrammi e blog nelle fasi previste, verificando tutto (unit, e2e,
   budget) prima di chiudere.
5. Per pubblicare: **Settings → Pages → Source: GitHub Actions** sul nuovo
   repository.

## 3 · Genera il seme di un argomento nuovo

1. Incolla `kit/PROMPT-GENERA-SEME.md` a Claude (qualsiasi interfaccia)
   con l'argomento e i materiali che hai. Il prompt prima **valuta
   l'argomento-nodo** (rubrica a sei criteri, con verdetto esplicito e
   proposte di riperimetrazione se non regge), poi produce il seme JSON.
2. Salvalo in `kit/semi/<nome>.json` e validalo:

   ```bash
   npx tsx kit/valida-seme.ts kit/semi/<nome>.json
   ```

   Correggi gli errori (bloccanti) e valuta gli avvisi (soglie di qualità:
   densità di archi, coperture di fonti e datazioni, voci orfane, pesi).
3. Rivedi l'inventario a mano: è il punto di controllo che rende buono un
   atlante. Poi torna al passo 2.

## Riferimenti

- `kit/LEGGIMI.md` — il flusso completo e i limiti onesti del kit
- `kit/SEME.schema.json` — la specifica formale del formato seme
- `kit/esempio/seme-esoterismo.json` — il seme dell'istanza di riferimento,
  estratto dal contenuto reale (`npm run seme:controlla` lo tiene allineato
  in CI)
- `README.md` — architettura del motore, comandi, qualità, deploy
