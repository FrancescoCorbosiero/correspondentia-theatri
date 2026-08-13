import { useId, useMemo, useState } from 'react';
import type { DatiGrafo } from '../../../lib/tipi-grafo';
import type { FiltriEffettivi } from '../../../lib/grafo-client';
import { INTERVALLO_TEMPO, formattaAnno } from '../../../lib/percorsi-url';
import {
  ETICHETTE_TIPO_ARCO,
  ETICHETTE_TIPO_NODO,
  TIPI_ARCO,
  TIPI_NODO,
  type TipoArco,
  type TipoNodo,
} from '../../../lib/costanti';
import { NOMI_PARTE } from '../../../lib/palette';
import Legenda from './Legenda';

interface Props {
  dati: DatiGrafo;
  filtri: FiltriEffettivi;
  onCambia: (aggiorna: (f: FiltriEffettivi) => FiltriEffettivi) => void;
  onCerca: (id: string) => void;
  inRiproduzione: boolean;
  onRiproduci: () => void;
  onFerma: () => void;
  riproduzioneDisponibile: boolean;
  visibili: number;
}

/** Colonna dei controlli: ricerca, slider temporale, filtri, legenda. */
export default function Controlli({
  dati,
  filtri,
  onCambia,
  onCerca,
  inRiproduzione,
  onRiproduci,
  onFerma,
  riproduzioneDisponibile,
  visibili,
}: Props) {
  const idBase = useId();
  const [query, setQuery] = useState('');

  const risultati = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (q.length < 2) return [];
    return dati.nodi
      .filter(
        (n) =>
          n.titolo.toLowerCase().includes(q) ||
          n.id.includes(q) ||
          n.alias.some((a) => a.toLowerCase().includes(q))
      )
      .slice(0, 8);
  }, [query, dati]);

  const commuta = <T,>(insieme: Set<T>, valore: T, tutti: readonly T[]): Set<T> => {
    const nuovo = new Set(insieme);
    if (nuovo.has(valore)) nuovo.delete(valore);
    else nuovo.add(valore);
    // mai vuoto: ripristina tutto piuttosto che mostrare il nulla
    if (nuovo.size === 0) return new Set(tutti);
    return nuovo;
  };

  const casella = 'accent-[var(--accento)]';

  return (
    <div className="controlli-grafo space-y-3 text-sm">
      {/* Ricerca nel grafo */}
      <div role="search">
        <label htmlFor={`${idBase}-cerca`} className="block text-xs font-medium mb-1">
          Cerca nel grafo
        </label>
        <input
          id={`${idBase}-cerca`}
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Ficino, gnosi, serpente…"
          autoComplete="off"
          className="w-full rounded border border-bordo bg-rialzato px-2 py-1.5"
        />
        {risultati.length > 0 && (
          <ul className="mt-1 border border-bordo rounded bg-rialzato divide-y divide-bordo max-h-56 overflow-y-auto" role="listbox" aria-label="Risultati della ricerca">
            {risultati.map((n) => (
              <li key={n.id}>
                <button
                  type="button"
                  className="w-full text-start px-2 py-1.5 hover:bg-incassato focus-visible:bg-incassato"
                  onClick={() => {
                    onCerca(n.id);
                    setQuery('');
                  }}
                >
                  <span className="font-medium">{n.titolo}</span>
                  <span className="ms-2 text-xs" style={{ color: 'var(--testo-tenue)' }}>
                    {ETICHETTE_TIPO_NODO[n.tipo]}
                  </span>
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Slider temporale */}
      <fieldset className="border border-bordo rounded p-2">
        <legend className="text-xs font-medium px-1">
          Tempo · {formattaAnno(filtri.da)} – {formattaAnno(filtri.a)}
        </legend>
        <label htmlFor={`${idBase}-da`} className="sr-only">
          Anno iniziale
        </label>
        <input
          id={`${idBase}-da`}
          type="range"
          min={INTERVALLO_TEMPO[0]}
          max={INTERVALLO_TEMPO[1]}
          step={10}
          value={filtri.da}
          onChange={(e) => {
            const v = Number(e.target.value);
            onCambia((f) => ({ ...f, da: Math.min(v, f.a) }));
          }}
          className="w-full"
          aria-valuetext={`dal ${formattaAnno(filtri.da)}`}
        />
        <label htmlFor={`${idBase}-a`} className="sr-only">
          Anno finale
        </label>
        <input
          id={`${idBase}-a`}
          type="range"
          min={INTERVALLO_TEMPO[0]}
          max={INTERVALLO_TEMPO[1]}
          step={10}
          value={filtri.a}
          onChange={(e) => {
            const v = Number(e.target.value);
            onCambia((f) => ({ ...f, a: Math.max(v, f.da) }));
          }}
          className="w-full"
          aria-valuetext={`fino al ${formattaAnno(filtri.a)}`}
        />
        <div className="flex items-center gap-2 mt-1">
          {riproduzioneDisponibile ? (
            <button
              type="button"
              onClick={inRiproduzione ? onFerma : onRiproduci}
              className="rounded border border-bordo px-2 py-1 text-xs hover:bg-incassato"
              aria-pressed={inRiproduzione}
            >
              {inRiproduzione ? '⏸ Ferma' : '▶ Riproduci'}
            </button>
          ) : (
            <p className="text-xs" style={{ color: 'var(--testo-tenue)' }}>
              Riproduzione disattivata (movimento ridotto).
            </p>
          )}
          <button
            type="button"
            onClick={() => onCambia((f) => ({ ...f, da: INTERVALLO_TEMPO[0], a: INTERVALLO_TEMPO[1] }))}
            className="rounded border border-bordo px-2 py-1 text-xs hover:bg-incassato"
          >
            Tutto il tempo
          </button>
        </div>
      </fieldset>

      {/* Genealogie leggendarie */}
      <label className="flex gap-2 items-start border border-bordo rounded p-2 cursor-pointer hover:bg-incassato">
        <input
          type="checkbox"
          checked={filtri.leggendarie}
          onChange={() => onCambia((f) => ({ ...f, leggendarie: !f.leggendarie }))}
          className={`mt-0.5 ${casella}`}
        />
        <span>
          <span className="font-medium">Mostra le genealogie leggendarie</span>
          <span className="block text-xs" style={{ color: 'var(--testo-tenue)' }}>
            Attribuzioni rivendicate dalla tradizione e smentite dalla storiografia, in tratteggio.
          </span>
        </span>
      </label>

      {/* Filtri */}
      <details className="border border-bordo rounded p-2" open>
        <summary className="cursor-pointer text-xs font-medium select-none">
          Filtri <span style={{ color: 'var(--testo-tenue)' }}>({visibili} voci visibili)</span>
        </summary>

        <fieldset className="mt-2">
          <legend className="text-xs font-semibold">Parti</legend>
          <ul className="mt-1 space-y-0.5">
            {[1, 2, 3, 4, 5, 6].map((n) => (
              <li key={n}>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={filtri.parti.has(n)}
                    onChange={() => onCambia((f) => ({ ...f, parti: commuta(f.parti, n, [1, 2, 3, 4, 5, 6]) }))}
                    className={casella}
                  />
                  <span aria-hidden="true" className="size-2.5 rounded-full" style={{ background: `var(--parte-${n})` }} />
                  <span className="text-xs">{NOMI_PARTE[n]}</span>
                </label>
              </li>
            ))}
          </ul>
        </fieldset>

        <fieldset className="mt-3">
          <legend className="text-xs font-semibold">Tipi di voce</legend>
          <ul className="mt-1 grid grid-cols-2 gap-x-2 gap-y-0.5">
            {TIPI_NODO.map((tipo) => (
              <li key={tipo}>
                <label className="flex items-center gap-1.5 cursor-pointer text-xs">
                  <input
                    type="checkbox"
                    checked={filtri.tipi.has(tipo)}
                    onChange={() =>
                      onCambia((f) => ({ ...f, tipi: commuta(f.tipi, tipo as TipoNodo, TIPI_NODO) }))
                    }
                    className={casella}
                  />
                  {ETICHETTE_TIPO_NODO[tipo]}
                </label>
              </li>
            ))}
          </ul>
        </fieldset>

        <fieldset className="mt-3">
          <legend className="text-xs font-semibold">Relazioni</legend>
          <ul className="mt-1 grid grid-cols-2 gap-x-2 gap-y-0.5">
            {TIPI_ARCO.filter((t) => t !== 'attribuzione_infondata').map((tipo) => (
              <li key={tipo}>
                <label className="flex items-center gap-1.5 cursor-pointer text-xs">
                  <input
                    type="checkbox"
                    checked={filtri.archi.has(tipo)}
                    onChange={() =>
                      onCambia((f) => ({
                        ...f,
                        archi: commuta(f.archi, tipo as TipoArco, TIPI_ARCO),
                      }))
                    }
                    className={casella}
                  />
                  {ETICHETTE_TIPO_ARCO[tipo]}
                </label>
              </li>
            ))}
          </ul>
        </fieldset>
      </details>

      <Legenda />
    </div>
  );
}
