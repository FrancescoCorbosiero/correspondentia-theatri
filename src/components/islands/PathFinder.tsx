import { useEffect, useMemo, useState } from 'react';
import { caricaGrafo } from '../../lib/grafo-client';
import type { ArcoGrafo, DatiGrafo, NodoGrafo } from '../../lib/tipi-grafo';
import { withBase } from '../../lib/percorsi-url';
import { ETICHETTE_TIPO_ARCO, ETICHETTE_TIPO_NODO, type TipoNodo } from '../../lib/costanti';

interface PassoCammino {
  nodo: NodoGrafo;
  /** arco che collega questo nodo al successivo, con la direzione reale */
  arco?: ArcoGrafo;
  inAvanti?: boolean;
}

/**
 * /percorsi/trova (§5.7): cammino minimo fra due voci, reso come catena di
 * frasi e disegnato sulla mappa del grafo. L'assenza di cammino è
 * un'informazione, non un errore. Le genealogie leggendarie sono escluse di
 * default; anche gli archi tassonomici "contiene" lo sono, per evitare
 * cammini banali che passano per le parti del volume.
 */
export default function PathFinder() {
  const [dati, setDati] = useState<DatiGrafo | null>(null);
  const [da, setDa] = useState('');
  const [a, setA] = useState('');
  const [usaContiene, setUsaContiene] = useState(false);
  const [usaLeggendarie, setUsaLeggendarie] = useState(false);
  const [cammino, setCammino] = useState<PassoCammino[] | null | 'nessuno'>(null);

  useEffect(() => {
    caricaGrafo().then((d) => {
      setDati(d);
      const parametri = new URLSearchParams(location.search);
      const pDa = parametri.get('da');
      const pA = parametri.get('a');
      if (pDa && d.nodi.some((n) => n.id === pDa)) setDa(pDa);
      if (pA && d.nodi.some((n) => n.id === pA)) setA(pA);
    }, () => {});
  }, []);

  const perId = useMemo(() => new Map((dati?.nodi ?? []).map((n) => [n.id, n])), [dati]);

  const gruppi = useMemo(() => {
    if (!dati) return [];
    const perTipo = new Map<TipoNodo, NodoGrafo[]>();
    for (const n of dati.nodi) {
      if (!perTipo.has(n.tipo)) perTipo.set(n.tipo, []);
      perTipo.get(n.tipo)!.push(n);
    }
    return [...perTipo.entries()]
      .sort(([x], [y]) => x.localeCompare(y))
      .map(([tipo, nodi]) => ({
        tipo,
        nodi: nodi.sort((x, y) => x.titolo.localeCompare(y.titolo, 'it')),
      }));
  }, [dati]);

  const calcola = async () => {
    if (!dati || !da || !a || da === a) return;
    const [{ default: Graph }, { bidirectional }] = await Promise.all([
      import('graphology'),
      import('graphology-shortest-path/unweighted'),
    ]);
    const g = new Graph({ type: 'undirected', multi: false });
    for (const n of dati.nodi) g.addNode(n.id);
    const archiScelti = new Map<string, ArcoGrafo>();
    for (const arco of dati.archi) {
      if (arco.tipo === 'contiene' && !usaContiene) continue;
      if (arco.tipo === 'attribuzione_infondata' && !usaLeggendarie) continue;
      const chiave = [arco.da, arco.a].sort().join('~');
      if (!g.hasEdge(arco.da, arco.a)) g.addEdge(arco.da, arco.a);
      // fra archi paralleli tieni il più "raccontabile": preferisci i non-contiene
      const precedente = archiScelti.get(chiave);
      if (!precedente || (precedente.tipo === 'contiene' && arco.tipo !== 'contiene')) {
        archiScelti.set(chiave, arco);
      }
    }
    const percorso = bidirectional(g, da, a);
    if (!percorso) {
      setCammino('nessuno');
      return;
    }
    const passi: PassoCammino[] = percorso.map((id, i) => {
      const nodo = perId.get(id)!;
      if (i === percorso.length - 1) return { nodo };
      const successivo = percorso[i + 1]!;
      const arco = archiScelti.get([id, successivo].sort().join('~'))!;
      return { nodo, arco, inAvanti: arco.da === id };
    });
    setCammino(passi);
  };

  const frase = (passo: PassoCammino, successivo: NodoGrafo): string => {
    const etichetta = ETICHETTE_TIPO_ARCO[passo.arco!.tipo];
    return passo.inAvanti
      ? `${passo.nodo.titolo} ${etichetta} ${successivo.titolo}`
      : `${successivo.titolo} ${etichetta} ${passo.nodo.titolo}`;
  };

  if (!dati) {
    return (
      <p role="status" className="text-sm">
        Caricamento del grafo…
      </p>
    );
  }

  const seleziona = (
    valore: string,
    imposta: (v: string) => void,
    etichetta: string,
    id: string
  ) => (
    <div className="min-w-0 grow">
      <label htmlFor={id} className="block text-sm font-medium mb-1">
        {etichetta}
      </label>
      <select
        id={id}
        value={valore}
        onChange={(e) => imposta(e.target.value)}
        className="w-full rounded border border-bordo bg-rialzato px-2 py-2 text-sm"
      >
        <option value="">— scegli una voce —</option>
        {gruppi.map((gruppo) => (
          <optgroup key={gruppo.tipo} label={ETICHETTE_TIPO_NODO[gruppo.tipo]}>
            {gruppo.nodi.map((n) => (
              <option key={n.id} value={n.id}>
                {n.titolo}
              </option>
            ))}
          </optgroup>
        ))}
      </select>
    </div>
  );

  return (
    <div className="max-w-2xl">
      <div className="flex flex-wrap gap-4 items-end">
        {seleziona(da, setDa, 'Dalla voce', 'trova-da')}
        {seleziona(a, setA, 'Alla voce', 'trova-a')}
        <button
          type="button"
          onClick={calcola}
          disabled={!da || !a || da === a}
          className="rounded bg-accento px-4 py-2 text-sm text-white hover:opacity-90 disabled:opacity-40"
        >
          Trova il cammino
        </button>
      </div>

      <div className="mt-3 flex flex-wrap gap-x-6 gap-y-1 text-sm">
        <label className="flex items-center gap-2 cursor-pointer">
          <input type="checkbox" checked={usaContiene} onChange={() => setUsaContiene((v) => !v)} />
          consenti passaggi per le parti del volume
        </label>
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={usaLeggendarie}
            onChange={() => setUsaLeggendarie((v) => !v)}
          />
          includi le genealogie leggendarie <span style={{ color: 'var(--testo-tenue)' }}>(attribuzioni infondate, segnalate)</span>
        </label>
      </div>

      <div className="mt-6" aria-live="polite">
        {cammino === 'nessuno' && (
          <div className="rounded border border-bordo bg-rialzato p-4">
            <p className="font-medium">Nessun cammino con i filtri attuali.</p>
            <p className="mt-1 text-sm" style={{ color: 'var(--testo-tenue)' }}>
              Non è un errore: significa che, escludendo le relazioni disattivate, le due voci
              appartengono a regioni non collegate del grafo. Puoi consentire i passaggi per le
              parti del volume o — sapendo che cosa sono — le genealogie leggendarie.
            </p>
          </div>
        )}
        {Array.isArray(cammino) && (
          <div>
            <h2 className="font-serif text-xl">
              {cammino.length - 1} {cammino.length - 1 === 1 ? 'passo' : 'passi'} da{' '}
              <em>{cammino[0]!.nodo.titolo}</em> a <em>{cammino[cammino.length - 1]!.nodo.titolo}</em>
            </h2>
            <ol className="mt-4 space-y-3">
              {cammino.map((passo, i) => {
                const successivo = cammino[i + 1]?.nodo;
                return (
                  <li key={passo.nodo.id} className="cammino-passo" style={{ ['--indice' as string]: i }}>
                    <a
                      className="font-medium underline decoration-dotted underline-offset-2 hover:text-accento"
                      href={withBase(`/voce/${passo.nodo.id}`)}
                    >
                      {passo.nodo.titolo}
                    </a>
                    <span className="ms-2 text-xs" style={{ color: 'var(--testo-tenue)' }}>
                      {ETICHETTE_TIPO_NODO[passo.nodo.tipo]}
                    </span>
                    {successivo && passo.arco && (
                      <p className="mt-1 text-sm ps-4 border-s-2" style={{ borderColor: `var(--parte-${passo.nodo.parte})` }}>
                        {frase(passo, successivo)}
                        {passo.arco.tipo === 'attribuzione_infondata' && (
                          <span className="block text-xs mt-0.5" style={{ color: '#b3475f' }}>
                            ⚠ attribuzione infondata{passo.arco.nota ? `: ${passo.arco.nota}` : ''}
                          </span>
                        )}
                        {passo.arco.tipo !== 'attribuzione_infondata' && passo.arco.nota && (
                          <span className="block text-xs mt-0.5" style={{ color: 'var(--testo-tenue)' }}>
                            {passo.arco.nota}
                          </span>
                        )}
                      </p>
                    )}
                  </li>
                );
              })}
            </ol>
            <p className="mt-4 text-sm">
              <a
                className="underline text-accento"
                href={withBase(`/grafo?nodo=${cammino[0]!.nodo.id}`)}
              >
                Apri il punto di partenza nel grafo →
              </a>
            </p>
          </div>
        )}
      </div>

      <style>{`
        @media (prefers-reduced-motion: no-preference) {
          .cammino-passo { animation: apparizione 260ms both; animation-delay: calc(var(--indice) * 90ms); }
          @keyframes apparizione { from { opacity: 0; transform: translateY(4px); } to { opacity: 1; transform: none; } }
        }
      `}</style>
    </div>
  );
}
