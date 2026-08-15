/**
 * Estrae il "seme" di questo sito: il file unico da cui un progetto
 * Correspondentia può essere rigenerato per un altro argomento-nodo.
 * Serve da esempio verificato del formato (kit/SEME.schema.json) e da
 * check di allineamento: `--verifica` confronta l'estratto con il file
 * committato in kit/esempio/ e fallisce se divergono.
 *
 * Uso:  tsx kit/estrai-seme.ts            (ri)scrive kit/esempio/seme-esoterismo.json
 *       tsx kit/estrai-seme.ts --verifica  confronta senza scrivere
 */
import { readFileSync, readdirSync, writeFileSync, existsSync, mkdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import matter from 'gray-matter';
import { ETICHETTE_TIPO_ARCO, ETICHETTE_TIPO_NODO, TIPI_ARCO, TIPI_NODO } from '../src/lib/costanti';

const RADICE = join(dirname(fileURLToPath(import.meta.url)), '..');
const USCITA = join(RADICE, 'kit/esempio/seme-esoterismo.json');

/* ── voci e parti ─────────────────────────────────────────────────────── */

const dirVoci = join(RADICE, 'src/content/voci');
const frontmatter = readdirSync(dirVoci)
  .filter((f) => f.endsWith('.md'))
  .sort()
  .map((f) => matter(readFileSync(join(dirVoci, f), 'utf8')).data);

const parti = frontmatter
  .filter((v) => v.tipo === 'parte')
  .sort((a, b) => a.parte - b.parte)
  .map((v) => ({ numero: v.parte, id: v.id, titolo: v.titolo, sommario: v.sommario }));

const voci = frontmatter
  .filter((v) => v.tipo !== 'parte')
  .map((v) => ({
    id: v.id,
    titolo: v.titolo,
    tipo: v.tipo,
    parte: v.parte,
    peso: v.peso,
    sommario: v.sommario,
    ...(v.periodo ? { periodo: v.periodo } : {}),
    ...(v.alias?.length ? { alias: v.alias } : {}),
    ...(v.luoghi?.length ? { luoghi: v.luoghi } : {}),
    archi: (v.archi ?? []).map((a: { verso: string; tipo: string; nota?: string }) => ({
      verso: a.verso,
      tipo: a.tipo,
      ...(a.nota ? { nota: a.nota } : {}),
    })),
    fonti: v.fonti ?? [],
  }));

/* ── percorsi ─────────────────────────────────────────────────────────── */

const dirPercorsi = join(RADICE, 'src/content/percorsi');
const percorsi = readdirSync(dirPercorsi)
  .filter((f) => f.endsWith('.md'))
  .sort()
  .map((f) => matter(readFileSync(join(dirPercorsi, f), 'utf8')).data)
  .sort((a, b) => a.ordine - b.ordine)
  .map((p) => ({
    slug: p.slug,
    titolo: p.titolo,
    sottotitolo: p.sottotitolo,
    ordine: p.ordine,
    tappe: p.tappe.map((t: { voce: string; testo: string }) => ({
      voce: t.voce,
      traccia: t.testo,
    })),
  }));

/* ── diagrammi (pagine su misura, facoltative) ────────────────────────── */

const dirDiagrammi = join(RADICE, 'src/pages/diagrammi');
const diagrammi = readdirSync(dirDiagrammi)
  .filter((f) => f.endsWith('.astro') && f !== 'index.astro')
  .sort()
  .map((f) => {
    const sorgente = readFileSync(join(dirDiagrammi, f), 'utf8');
    const titolo = sorgente.match(/titolo="([^"]+)"/)?.[1] ?? f.replace('.astro', '');
    return { slug: f.replace('.astro', ''), titolo };
  });

/* ── tassonomia e regole (costanti del progetto) ──────────────────────── */

const tassonomia = {
  tipiNodo: TIPI_NODO.filter((t) => t !== 'parte').map((t) => ({
    id: t,
    etichetta: ETICHETTE_TIPO_NODO[t],
  })),
  tipiArco: TIPI_ARCO.map((t) => ({ id: t, etichetta: ETICHETTE_TIPO_ARCO[t] })),
  archiDerivati: ['contiene'],
  doppioRegistro: {
    attivo: true,
    tipiLeggendari: ['attribuzione_infondata'],
    criterio:
      'Filiazioni e attribuzioni dichiarate dalla tradizione ma smentite o non documentate ' +
      '(pseudoepigrafi, catene iniziatiche inventate, datazioni leggendarie): esistono nel ' +
      'grafo, spente di default, con nota obbligatoria che spiega perché non reggono.',
  },
};

const regole = {
  guardrail: [
    'Descrivere dottrine e pratiche storiche senza mai istruirle (nessun manuale operativo).',
    'Per ogni pseudoepigrafe indicare datazione reale e datazione dichiarata.',
    'Le pretese verificabili smentite sono marcate come tali nel testo e nel grafo.',
    'Nota di realtà obbligatoria dove servono avvertenze concrete (es. tossicità delle operazioni alchemiche, trasmutazione irrealizzabile).',
    'Le dottrine indifendibili (es. razze-radici) vanno nominate come tali e contestualizzate storicamente.',
    'Ogni voce cita in calce letteratura accademica di riferimento reale.',
  ],
  lunghezze: { '1': [120, 250], '2': [150, 300], '3': [200, 400], '4': [250, 600], '5': [400, 1500] },
  fontiMinime: 1,
};

/* ── seme completo ────────────────────────────────────────────────────── */

const seme = {
  formato: 'correspondentia-seme@1',
  progetto: {
    nome: 'Correspondentia Theatri',
    argomento: 'esoterismo occidentale',
    sottotitolo: 'atlante ipermediale dell’esoterismo occidentale',
    lingua: 'it',
    descrizione:
      'Atlante navigabile a grafo dell’esoterismo occidentale: correnti, concetti, pratiche, ' +
      'simboli, persone, opere, eventi e luoghi da Alessandria al Novecento, con le genealogie ' +
      'leggendarie dichiarate come tali.',
  },
  valutazione: {
    verdetto: 'idoneo',
    criteri: {
      'entita-enumerabili': 5,
      'relazioni-tipizzabili': 5,
      'profondita-temporale': 5,
      'doppio-registro': 5,
      'letteratura-di-riferimento': 5,
      'granularita-sostenibile': 5,
    },
    note:
      'Caso di riferimento del formato: campo costituito da filiazioni (reali e dichiarate), ' +
      'entità dense di otto tipi su ~2500 anni, storiografia accademica consolidata ' +
      '(Yates, Faivre, Hanegraaff, Principe).',
  },
  tassonomia,
  parti,
  regole,
  voci,
  percorsi,
  diagrammi,
};

const json = JSON.stringify(seme, null, 2) + '\n';

if (process.argv.includes('--verifica')) {
  if (!existsSync(USCITA)) {
    console.error('✗ kit/esempio/seme-esoterismo.json non esiste: eseguire `npm run seme:estrai`');
    process.exit(1);
  }
  if (readFileSync(USCITA, 'utf8') !== json) {
    console.error(
      '✗ il seme di esempio non è allineato al contenuto del sito: eseguire `npm run seme:estrai` e committare'
    );
    process.exit(1);
  }
  console.log('✓ seme di esempio allineato al contenuto del sito');
} else {
  mkdirSync(dirname(USCITA), { recursive: true });
  writeFileSync(USCITA, json);
  console.log(
    `✓ seme estratto: ${voci.length} voci, ${parti.length} parti, ${percorsi.length} percorsi, ${diagrammi.length} diagrammi → kit/esempio/seme-esoterismo.json`
  );
}
