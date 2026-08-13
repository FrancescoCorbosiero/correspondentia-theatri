import { useEffect, useMemo, useState } from 'react';
import type { DocCorpo, DocRicerca } from '../../lib/tipi-grafo';
import { withBase } from '../../lib/percorsi-url';
import { ETICHETTE_TIPO_NODO } from '../../lib/costanti';
import { NOMI_PARTE_BREVI } from '../../lib/palette';

interface Indici {
  voci: DocRicerca[];
  perId: Map<string, DocRicerca>;
  corpi: Map<string, string>;
  indiceTitoli: { search: (q: string, n?: number) => unknown[] };
  indiceCorpo: { search: (q: string, n?: number) => unknown[] };
  idPerPosizione: string[];
}

/** /cerca (§5.11): FlexSearch su titoli, alias, sommari e corpo completo. */
export default function CercaFullText() {
  const [indici, setIndici] = useState<Indici | null>(null);
  const [query, setQuery] = useState(
    () => new URLSearchParams(typeof location !== 'undefined' ? location.search : '').get('q') ?? ''
  );

  useEffect(() => {
    Promise.all([
      fetch(withBase('/data/ricerca-voci.json')).then((r) => r.json() as Promise<DocRicerca[]>),
      fetch(withBase('/data/ricerca-corpo.json')).then((r) => r.json() as Promise<DocCorpo[]>),
      import('flexsearch'),
    ]).then(([voci, corpi, FlexSearch]) => {
      const Index = (FlexSearch as unknown as { Index: new (o: object) => Indici['indiceTitoli'] & { add: (i: number, t: string) => void } }).Index;
      const indiceTitoli = new Index({ tokenize: 'forward', charset: 'latin:advanced' });
      const indiceCorpo = new Index({ tokenize: 'forward', charset: 'latin:advanced' });
      const idPerPosizione: string[] = [];
      const mappaCorpi = new Map(corpi.map((c) => [c.id, c.testo]));
      voci.forEach((v, i) => {
        idPerPosizione.push(v.id);
        indiceTitoli.add(i, `${v.titolo} ${v.alias.join(' ')} ${v.sommario}`);
        indiceCorpo.add(i, mappaCorpi.get(v.id) ?? '');
      });
      setIndici({
        voci,
        perId: new Map(voci.map((v) => [v.id, v])),
        corpi: mappaCorpi,
        indiceTitoli,
        indiceCorpo,
        idPerPosizione,
      });
    });
  }, []);

  // query nella barra degli indirizzi (condivisibile)
  useEffect(() => {
    const url = new URL(location.href);
    if (query) url.searchParams.set('q', query);
    else url.searchParams.delete('q');
    history.replaceState(null, '', url);
  }, [query]);

  const risultati = useMemo(() => {
    if (!indici || query.trim().length < 2) return [];
    const q = query.trim();
    const daTitoli = indici.indiceTitoli.search(q, 25) as number[];
    const daCorpo = indici.indiceCorpo.search(q, 25) as number[];
    const visti = new Set<number>();
    const ordinati: Array<{ doc: DocRicerca; nelCorpo: boolean }> = [];
    for (const i of daTitoli) {
      if (!visti.has(i)) {
        visti.add(i);
        ordinati.push({ doc: indici.voci[i]!, nelCorpo: false });
      }
    }
    for (const i of daCorpo) {
      if (!visti.has(i)) {
        visti.add(i);
        ordinati.push({ doc: indici.voci[i]!, nelCorpo: true });
      }
    }
    return ordinati.slice(0, 30);
  }, [indici, query]);

  const estratto = (id: string): string => {
    if (!indici) return '';
    const testo = indici.corpi.get(id) ?? '';
    const q = query.trim().toLowerCase();
    const posizione = testo.toLowerCase().indexOf(q.split(/\s+/)[0] ?? q);
    if (posizione < 0) return '';
    const inizio = Math.max(0, posizione - 70);
    const fine = Math.min(testo.length, posizione + q.length + 110);
    return `…${testo.slice(inizio, fine)}…`;
  };

  return (
    <div>
      <form role="search" onSubmit={(e) => e.preventDefault()} className="max-w-xl">
        <label htmlFor="cerca-input" className="block text-sm font-medium mb-1">
          Cerca in tutte le voci
        </label>
        <input
          id="cerca-input"
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="corrispondenze, Casaubon, tikkun…"
          autoComplete="off"
          className="w-full rounded border border-bordo bg-rialzato px-3 py-2"
        />
        <p className="mt-1 text-xs" style={{ color: 'var(--testo-tenue)' }}>
          {indici ? 'Indice caricato: titoli, alias, sommari e testo completo.' : 'Caricamento dell’indice…'}
        </p>
      </form>

      <div aria-live="polite" className="mt-6">
        {query.trim().length >= 2 && indici && (
          <p className="text-sm mb-3" style={{ color: 'var(--testo-tenue)' }}>
            {risultati.length === 0
              ? `Nessun risultato per «${query}».`
              : `${risultati.length} risultati per «${query}».`}
          </p>
        )}
        <ol className="space-y-4 max-w-2xl">
          {risultati.map(({ doc, nelCorpo }) => (
            <li key={doc.id} className="rounded border border-bordo bg-rialzato p-4">
              <a
                href={withBase(`/voce/${doc.id}`)}
                className="font-serif text-lg text-accento underline-offset-4 hover:underline"
              >
                {doc.titolo}
              </a>
              <span className="ms-2 text-xs" style={{ color: 'var(--testo-tenue)' }}>
                {ETICHETTE_TIPO_NODO[doc.tipo]} · {NOMI_PARTE_BREVI[doc.parte]}
              </span>
              <p className="mt-1 text-sm">{doc.sommario}</p>
              {nelCorpo && (
                <p className="mt-1 text-xs italic" style={{ color: 'var(--testo-tenue)' }}>
                  {estratto(doc.id)}
                </p>
              )}
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}
