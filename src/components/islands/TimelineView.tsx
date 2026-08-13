import { useEffect, useMemo, useRef, useState } from 'react';
import { select } from 'd3-selection';
import { zoom, type D3ZoomEvent, zoomIdentity } from 'd3-zoom';
import { scaleLinear } from 'd3-scale';
import { brushX, type D3BrushEvent } from 'd3-brush';
import { caricaGrafo, preferisceMenoMovimento } from '../../lib/grafo-client';
import type { DatiGrafo, NodoGrafo } from '../../lib/tipi-grafo';
import { INTERVALLO_TEMPO, formattaAnno, withBase } from '../../lib/percorsi-url';
import { ETICHETTE_TIPO_NODO, type TipoNodo } from '../../lib/costanti';

/** Corsie della timeline: solo i tipi con voci datate. */
const CORSIE: TipoNodo[] = ['evento', 'corrente', 'persona', 'opera', 'luogo'];
const ALTEZZA_RIGA = 16;
const LARGHEZZA = 1100;

interface Collocato {
  nodo: NodoGrafo;
  sottoriga: number;
}

/** Impacchettamento greedy degli intervalli in sottorighe per corsia. */
function impacchetta(nodi: NodoGrafo[]): { elementi: Collocato[]; righe: number } {
  const ordinati = [...nodi].sort((a, b) => a.periodo!.da - b.periodo!.da || b.peso - a.peso);
  const fineRighe: number[] = [];
  const elementi: Collocato[] = [];
  for (const nodo of ordinati) {
    const { da, a } = nodo.periodo!;
    let riga = fineRighe.findIndex((fine) => fine <= da - 8);
    if (riga === -1) {
      riga = fineRighe.length;
      fineRighe.push(0);
    }
    fineRighe[riga] = Math.max(a, da + 25); // riserva spazio minimo anche agli eventi puntuali
    elementi.push({ nodo, sottoriga: riga });
  }
  return { elementi, righe: Math.max(fineRighe.length, 1) };
}

/**
 * /tempo (§5.4): timeline D3 orizzontale a corsie per tipo, zoom semantico
 * (millenni → secoli → decenni), brush di selezione sincronizzato con /grafo.
 */
export default function TimelineView() {
  const [dati, setDati] = useState<DatiGrafo | null>(null);
  const [trasforma, setTrasforma] = useState(zoomIdentity);
  const [selezione, setSelezione] = useState<[number, number] | null>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const brushRef = useRef<SVGGElement>(null);
  const menoMovimento = useMemo(preferisceMenoMovimento, []);

  useEffect(() => {
    caricaGrafo().then(setDati, () => {});
  }, []);

  const scalaBase = useMemo(
    () => scaleLinear().domain(INTERVALLO_TEMPO).range([90, LARGHEZZA - 20]),
    []
  );
  const scala = useMemo(() => trasforma.rescaleX(scalaBase), [trasforma, scalaBase]);

  const corsie = useMemo(() => {
    if (!dati) return [];
    let y = 34;
    return CORSIE.map((tipo) => {
      const datati = dati.nodi.filter((n) => n.tipo === tipo && n.periodo);
      const { elementi, righe } = impacchetta(datati);
      const inizioY = y;
      const altezza = righe * ALTEZZA_RIGA + 14;
      y += altezza;
      return { tipo, elementi, righe, inizioY, altezza };
    });
  }, [dati]);

  const altezzaTotale = corsie.length > 0 ? corsie[corsie.length - 1]!.inizioY + corsie[corsie.length - 1]!.altezza + 10 : 300;

  // zoom semantico con rotella/trascinamento
  useEffect(() => {
    if (!svgRef.current) return;
    const comportamento = zoom<SVGSVGElement, unknown>()
      .scaleExtent([1, 60])
      .translateExtent([
        [0, 0],
        [LARGHEZZA, altezzaTotale],
      ])
      .filter((evento) => !(evento.target as Element).closest('.strato-brush'))
      .on('zoom', (evento: D3ZoomEvent<SVGSVGElement, unknown>) => setTrasforma(evento.transform));
    select(svgRef.current).call(comportamento);
    return () => {
      select(svgRef.current!).on('.zoom', null);
    };
  }, [altezzaTotale]);

  // brush di selezione dell'intervallo (striscia superiore)
  useEffect(() => {
    if (!brushRef.current) return;
    const comportamento = brushX<unknown>()
      .extent([
        [90, 0],
        [LARGHEZZA - 20, 24],
      ])
      .on('end', (evento: D3BrushEvent<unknown>) => {
        if (!evento.selection) {
          setSelezione(null);
          return;
        }
        const [x1, x2] = evento.selection as [number, number];
        setSelezione([Math.round(scala.invert(x1)), Math.round(scala.invert(x2))]);
      });
    select(brushRef.current).call(comportamento);
  }, [scala]);

  // tacche adattive: la granularità segue lo zoom (zoom semantico)
  const tacche = useMemo(() => {
    const [da, a] = scala.domain();
    const estensione = a - da;
    const passo =
      estensione > 2200 ? 500 : estensione > 1100 ? 200 : estensione > 500 ? 100 : estensione > 220 ? 50 : estensione > 90 ? 20 : 10;
    const inizio = Math.ceil(da / passo) * passo;
    const risultato: number[] = [];
    for (let t = inizio; t <= a; t += passo) risultato.push(t);
    return risultato;
  }, [scala]);

  if (!dati) {
    return (
      <p role="status" className="p-8 text-sm">
        Caricamento della timeline…
      </p>
    );
  }

  const atemporali = dati.nodi.filter((n) => !n.periodo).length;

  return (
    <div>
      <div className="flex flex-wrap items-center gap-3 text-sm mb-3">
        <p style={{ color: 'var(--testo-tenue)' }}>
          Rotella o pizzico per lo zoom (millenni → secoli → decenni); trascina sulla striscia in
          alto per selezionare un intervallo.
        </p>
        {selezione && (
          <a
            className="rounded bg-accento px-3 py-1.5 text-white hover:opacity-90"
            href={withBase(`/grafo?da=${selezione[0]}&a=${selezione[1]}`)}
          >
            Apri nel grafo: {formattaAnno(selezione[0])} – {formattaAnno(selezione[1])} →
          </a>
        )}
      </div>

      <div className="overflow-x-auto rounded border border-bordo" style={{ background: 'var(--sfondo-rialzato)' }}>
        <svg
          ref={svgRef}
          viewBox={`0 0 ${LARGHEZZA} ${altezzaTotale}`}
          width="100%"
          style={{ minWidth: 900, touchAction: 'none' }}
          role="group"
          aria-label={`Timeline delle voci datate dell'atlante. ${atemporali} voci atemporali non compaiono: sono nell'elenco completo.`}
        >
          {/* striscia del brush */}
          <g className="strato-brush" aria-hidden="true">
            <rect x={90} y={0} width={LARGHEZZA - 110} height={24} fill="var(--sfondo-incassato)" />
            <g ref={brushRef} />
          </g>

          {/* griglia temporale */}
          {tacche.map((t) => (
            <g key={t} aria-hidden="true">
              <line x1={scala(t)} x2={scala(t)} y1={24} y2={altezzaTotale} stroke="var(--bordo)" strokeWidth={0.6} />
              <text x={scala(t)} y={18} textAnchor="middle" fontSize={9.5} fill="var(--testo-tenue)">
                {formattaAnno(t)}
              </text>
            </g>
          ))}

          {/* corsie */}
          {corsie.map((corsia) => (
            <g key={corsia.tipo}>
              <line
                x1={0}
                x2={LARGHEZZA}
                y1={corsia.inizioY - 4}
                y2={corsia.inizioY - 4}
                stroke="var(--bordo)"
                strokeWidth={0.8}
                aria-hidden="true"
              />
              <text
                x={8}
                y={corsia.inizioY + 10}
                fontSize={10}
                fontWeight={600}
                fill="var(--testo-tenue)"
                aria-hidden="true"
              >
                {ETICHETTE_TIPO_NODO[corsia.tipo]}
              </text>
              {corsia.elementi.map(({ nodo, sottoriga }) => {
                const y = corsia.inizioY + sottoriga * ALTEZZA_RIGA + 4;
                const x1 = scala(nodo.periodo!.da);
                const x2 = scala(nodo.periodo!.a);
                const puntuale = nodo.periodo!.da === nodo.periodo!.a;
                const larghezzaBarra = Math.max(x2 - x1, 3);
                const visibile = x2 > 80 && x1 < LARGHEZZA;
                if (!visibile) return null;
                const mostraEtichetta = larghezzaBarra > 58 || (puntuale && trasforma.k > 3) || nodo.peso >= 5;
                return (
                  <a key={nodo.id} href={withBase(`/voce/${nodo.id}`)} aria-label={`${nodo.titolo}, ${formattaAnno(nodo.periodo!.da)}–${formattaAnno(nodo.periodo!.a)}`}>
                    {puntuale ? (
                      <path
                        d={`M ${x1} ${y + 1} l 5 5 l -5 5 l -5 -5 Z`}
                        fill={`var(--parte-${nodo.parte})`}
                        stroke="var(--sfondo-rialzato)"
                        strokeWidth={0.8}
                      >
                        <title>{`${nodo.titolo} (${formattaAnno(nodo.periodo!.da)})`}</title>
                      </path>
                    ) : (
                      <rect
                        x={x1}
                        y={y}
                        width={larghezzaBarra}
                        height={9}
                        rx={2.5}
                        fill={`var(--parte-${nodo.parte})`}
                        opacity={0.5 + nodo.peso * 0.1}
                      >
                        <title>{`${nodo.titolo} (${formattaAnno(nodo.periodo!.da)}–${formattaAnno(nodo.periodo!.a)})`}</title>
                      </rect>
                    )}
                    {mostraEtichetta && (
                      <text
                        x={puntuale ? x1 + 8 : Math.max(x1 + 3, 92)}
                        y={y + 8}
                        fontSize={9}
                        fill={puntuale || larghezzaBarra < 70 ? 'var(--testo)' : '#ffffff'}
                        style={{ pointerEvents: 'none' }}
                      >
                        {nodo.titolo.length > 34 ? `${nodo.titolo.slice(0, 32)}…` : nodo.titolo}
                      </text>
                    )}
                  </a>
                );
              })}
            </g>
          ))}
        </svg>
      </div>

      {!menoMovimento && (
        <p className="mt-2 text-xs" style={{ color: 'var(--testo-tenue)' }}>
          Doppio click per rientrare; lo zoom mantiene la posizione del cursore.
        </p>
      )}
    </div>
  );
}
