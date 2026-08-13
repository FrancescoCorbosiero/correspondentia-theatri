import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import type { DocRicerca } from '../../lib/tipi-grafo';
import { withBase } from '../../lib/percorsi-url';
import { ETICHETTE_TIPO_NODO } from '../../lib/costanti';
import { NOMI_PARTE_BREVI } from '../../lib/palette';

/**
 * Command palette globale (Cmd/Ctrl+K, §5.11): FlexSearch sull'indice leggero
 * pre-generato (titoli, alias, sommari). L'indice full-text vive su /cerca.
 */
export default function SearchPalette() {
  const [aperta, setAperta] = useState(false);
  const [query, setQuery] = useState('');
  const [documenti, setDocumenti] = useState<DocRicerca[] | null>(null);
  const [indice, setIndice] = useState<{ search: (q: string, n?: number) => unknown[] } | null>(null);
  const [attivo, setAttivo] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);

  // apertura: scorciatoia globale + bottone in testata
  useEffect(() => {
    const suTasto = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setAperta((a) => !a);
      } else if (e.key === 'Escape') {
        setAperta(false);
      }
    };
    const suApri = () => setAperta(true);
    window.addEventListener('keydown', suTasto);
    document.getElementById('apri-ricerca')?.addEventListener('click', suApri);
    return () => {
      window.removeEventListener('keydown', suTasto);
      document.getElementById('apri-ricerca')?.removeEventListener('click', suApri);
    };
  }, []);

  // caricamento pigro dell'indice alla prima apertura
  useEffect(() => {
    if (!aperta || documenti) return;
    Promise.all([
      fetch(withBase('/data/ricerca-voci.json')).then((r) => r.json() as Promise<DocRicerca[]>),
      import('flexsearch'),
    ]).then(([docs, FlexSearch]) => {
      const Index = (FlexSearch as unknown as { Index: new (o: object) => { add: (i: number, t: string) => void; search: (q: string, n?: number) => unknown[] } }).Index;
      const idx = new Index({ tokenize: 'forward', charset: 'latin:advanced' });
      docs.forEach((d, i) => idx.add(i, `${d.titolo} ${d.alias.join(' ')} ${d.sommario}`));
      setDocumenti(docs);
      setIndice(idx);
    });
  }, [aperta, documenti]);

  useEffect(() => {
    if (aperta) {
      setQuery('');
      setAttivo(0);
      const t = setTimeout(() => inputRef.current?.focus(), 30);
      return () => clearTimeout(t);
    }
  }, [aperta]);

  const risultati = useMemo(() => {
    if (!documenti) return [];
    const q = query.trim();
    if (!q) {
      // senza query: le voci di peso maggiore come punti d'ingresso
      return [...documenti].sort((a, b) => b.peso - a.peso).slice(0, 7);
    }
    if (!indice) return [];
    const ids = indice.search(q, 8) as number[];
    return ids.map((i) => documenti[i]!).filter(Boolean);
  }, [query, documenti, indice]);

  const vaiA = useCallback((id: string) => {
    location.href = withBase(`/voce/${id}`);
  }, []);

  const suTastoInput = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setAttivo((a) => Math.min(a + 1, risultati.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setAttivo((a) => Math.max(a - 1, 0));
    } else if (e.key === 'Enter' && risultati[attivo]) {
      vaiA(risultati[attivo]!.id);
    }
  };

  if (!aperta) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-black/35 p-4 pt-[12vh]"
      onClick={(e) => {
        if (e.target === e.currentTarget) setAperta(false);
      }}
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-label="Ricerca rapida"
        className="mx-auto max-w-lg rounded-lg border border-bordo bg-rialzato shadow-xl overflow-hidden"
      >
        <div className="border-b border-bordo p-2">
          <label htmlFor="palette-input" className="sr-only">
            Cerca una voce
          </label>
          <input
            id="palette-input"
            ref={inputRef}
            type="search"
            role="combobox"
            aria-expanded={risultati.length > 0}
            aria-controls="palette-risultati"
            aria-activedescendant={risultati[attivo] ? `palette-opzione-${risultati[attivo]!.id}` : undefined}
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setAttivo(0);
            }}
            onKeyDown={suTastoInput}
            placeholder="Cerca una voce… (Esc per chiudere)"
            autoComplete="off"
            className="w-full bg-transparent px-2 py-1.5 outline-none"
          />
        </div>
        <ul id="palette-risultati" role="listbox" aria-label="Risultati" className="max-h-[50vh] overflow-y-auto">
          {!documenti && (
            <li className="px-4 py-3 text-sm" role="status" style={{ color: 'var(--testo-tenue)' }}>
              Caricamento dell’indice…
            </li>
          )}
          {documenti && risultati.length === 0 && (
            <li className="px-4 py-3 text-sm" style={{ color: 'var(--testo-tenue)' }}>
              Nessuna voce trovata per «{query}». Prova la{' '}
              <a className="underline text-accento" href={`${withBase('/cerca')}?q=${encodeURIComponent(query)}`}>
                ricerca nel testo completo
              </a>
              .
            </li>
          )}
          {risultati.map((d, i) => (
            <li key={d.id} role="option" id={`palette-opzione-${d.id}`} aria-selected={i === attivo}>
              <button
                type="button"
                onClick={() => vaiA(d.id)}
                onMouseEnter={() => setAttivo(i)}
                className={`w-full text-start px-4 py-2 border-b border-bordo/60 ${i === attivo ? 'bg-incassato' : ''}`}
              >
                <span className="font-medium text-sm">{d.titolo}</span>
                <span className="ms-2 text-xs" style={{ color: 'var(--testo-tenue)' }}>
                  {ETICHETTE_TIPO_NODO[d.tipo]} · {NOMI_PARTE_BREVI[d.parte]}
                </span>
                <span className="block text-xs truncate" style={{ color: 'var(--testo-tenue)' }}>
                  {d.sommario}
                </span>
              </button>
            </li>
          ))}
        </ul>
        <p className="px-4 py-2 text-[0.7rem] border-t border-bordo" style={{ color: 'var(--testo-tenue)' }}>
          ↑↓ per scorrere · Invio per aprire ·{' '}
          <a className="underline" href={withBase('/cerca')}>
            ricerca completa
          </a>
        </p>
      </div>
    </div>
  );
}
