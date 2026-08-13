import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import Graph from 'graphology';
import Sigma from 'sigma';
import { createNodeImageProgram } from '@sigma/node-image';
import type { DatiGrafo, NodoGrafo } from '../../../lib/tipi-grafo';
import {
  adiacenza,
  arcoVisibile,
  caricaGrafo,
  coloriTema,
  componenteConnessa,
  dimensioneDaPeso,
  egoNetwork,
  filtriDaStato,
  indicePerId,
  nodoVisibile,
  preferisceMenoMovimento,
  type FiltriEffettivi,
} from '../../../lib/grafo-client';
import { dataUriGlifo } from '../../../lib/icone';
import { COLORI_ARCO } from '../../../lib/palette';
import {
  INTERVALLO_TEMPO,
  analizzaStatoGrafo,
  serializzaStatoGrafo,
  withBase,
  type StatoGrafo,
} from '../../../lib/percorsi-url';
import { TIPI_ARCO, TIPI_NODO } from '../../../lib/costanti';
import Controlli from './Controlli';
import PannelloNodo from './PannelloNodo';

type Focus = { modo: 'cluster' | 'ego2'; nodo: string } | null;

/** Converte i filtri correnti in StatoGrafo per la query string. */
function statoDaFiltri(f: FiltriEffettivi, nodo: string | null): StatoGrafo {
  const stato: StatoGrafo = {};
  if (f.tipi.size < TIPI_NODO.length) stato.tipi = [...f.tipi];
  const archiDefault = TIPI_ARCO.filter((t) => t !== 'attribuzione_infondata');
  if (f.archi.size !== archiDefault.length || archiDefault.some((t) => !f.archi.has(t)))
    stato.archi = [...f.archi];
  if (f.parti.size < 6) stato.parti = [...f.parti];
  if (f.da !== INTERVALLO_TEMPO[0]) stato.da = f.da;
  if (f.a !== INTERVALLO_TEMPO[1]) stato.a = f.a;
  if (nodo) stato.nodo = nodo;
  if (f.leggendarie) stato.leggendarie = true;
  return stato;
}

export default function GraphView() {
  const contenitore = useRef<HTMLDivElement>(null);
  const svgOverlay = useRef<SVGSVGElement>(null);
  const sigmaRef = useRef<Sigma | null>(null);
  const grafoRef = useRef<Graph | null>(null);

  const [dati, setDati] = useState<DatiGrafo | null>(null);
  const [errore, setErrore] = useState<string | null>(null);
  const [filtri, setFiltri] = useState<FiltriEffettivi>(() =>
    filtriDaStato(typeof location !== 'undefined' ? analizzaStatoGrafo(location.search) : {})
  );
  const [selezionato, setSelezionato] = useState<string | null>(() =>
    typeof location !== 'undefined' ? (analizzaStatoGrafo(location.search).nodo ?? null) : null
  );
  const [focus, setFocus] = useState<Focus>(null);
  const [inRiproduzione, setInRiproduzione] = useState(false);
  const menoMovimento = useMemo(preferisceMenoMovimento, []);

  const perId = useMemo(() => (dati ? indicePerId(dati) : new Map<string, NodoGrafo>()), [dati]);
  const adj = useMemo(
    () => (dati ? adiacenza(dati, { includiContiene: true, includiLeggendarie: true }) : new Map()),
    [dati]
  );

  // refs specchiate per i reducer di sigma (che non ri-creiamo a ogni render)
  const filtriRef = useRef(filtri);
  const hoveredRef = useRef<string | null>(null);
  const selezionatoRef = useRef(selezionato);
  const focusRef = useRef<Focus>(focus);
  const insiemeFocusRef = useRef<Set<string> | null>(null);
  const coloriRef = useRef<ReturnType<typeof coloriTema> | null>(null);

  filtriRef.current = filtri;
  selezionatoRef.current = selezionato;
  focusRef.current = focus;

  // insieme dei nodi ammessi dal focus (cluster o vicinato di 2º grado)
  useEffect(() => {
    if (!dati || !focus) {
      insiemeFocusRef.current = null;
      sigmaRef.current?.refresh();
      return;
    }
    const ammessoDaiFiltri = (id: string) => {
      const n = perId.get(id);
      return !!n && nodoVisibile(n, filtriRef.current);
    };
    insiemeFocusRef.current =
      focus.modo === 'cluster'
        ? componenteConnessa(focus.nodo, adj, ammessoDaiFiltri)
        : egoNetwork(focus.nodo, adj, 2);
    sigmaRef.current?.refresh();
  }, [focus, dati, adj, perId, filtri]);

  // caricamento dati
  useEffect(() => {
    caricaGrafo().then(setDati, (e) => setErrore(String(e)));
  }, []);

  const nodoEVisibile = useCallback(
    (id: string): boolean => {
      const n = perId.get(id);
      if (!n || !nodoVisibile(n, filtriRef.current)) return false;
      const dentroFocus = insiemeFocusRef.current;
      return !dentroFocus || dentroFocus.has(id);
    },
    [perId]
  );

  // costruzione del grafo + sigma
  useEffect(() => {
    if (!dati || !contenitore.current) return;
    const colori = coloriTema();
    coloriRef.current = colori;

    const g = new Graph({ multi: true, type: 'directed' });
    for (const n of dati.nodi) {
      g.addNode(n.id, {
        x: n.x,
        y: n.y,
        label: n.titolo,
        size: dimensioneDaPeso(n.peso),
        color: colori.parte[n.parte],
        type: 'image',
        image: dataUriGlifo(n.tipo, '#ffffff'),
      });
    }
    for (const a of dati.archi) {
      if (a.tipo === 'attribuzione_infondata') continue; // resi dall'overlay SVG tratteggiato
      g.addDirectedEdgeWithKey(a.chiave, a.da, a.a, {
        size: a.tipo === 'contiene' ? 0.6 : 1.4,
        color: COLORI_ARCO[a.tipo],
        tipoArco: a.tipo,
        type: 'arrow',
      });
    }
    grafoRef.current = g;

    const sigma = new Sigma(g, contenitore.current, {
      allowInvalidContainer: true,
      defaultNodeType: 'image',
      nodeProgramClasses: { image: createNodeImageProgram({ padding: 0.28 }) },
      labelFont: '"Inter Variable", system-ui, sans-serif',
      labelSize: 11,
      labelColor: { color: colori.testo },
      labelRenderedSizeThreshold: 7,
      minCameraRatio: 0.03,
      maxCameraRatio: 15,
      stagePadding: 40,
      zIndex: true,
    });
    sigmaRef.current = sigma;

    const GRIGIO = () => (coloriRef.current ? coloriRef.current.bordo : '#d9d2c1');

    sigma.setSetting('nodeReducer', (nodo, attributi) => {
      const out = { ...attributi };
      if (!nodoEVisibile(nodo)) return { ...out, hidden: true };
      const hovered = hoveredRef.current;
      const selez = selezionatoRef.current;
      if (selez === nodo) {
        out.highlighted = true;
        out.zIndex = 3;
      }
      if (hovered && hovered !== nodo) {
        const vicini = adj.get(hovered);
        if (!vicini?.has(nodo)) {
          out.color = GRIGIO();
          out.label = '';
          out.image = null;
          out.zIndex = 0;
        } else {
          out.zIndex = 2;
        }
      }
      return out;
    });

    sigma.setSetting('edgeReducer', (arco, attributi) => {
      const out = { ...attributi };
      const [da, a] = sigma.getGraph().extremities(arco);
      const tipo = sigma.getGraph().getEdgeAttribute(arco, 'tipoArco');
      if (!filtriRef.current.archi.has(tipo) || !nodoEVisibile(da!) || !nodoEVisibile(a!))
        return { ...out, hidden: true };
      const hovered = hoveredRef.current;
      if (hovered && da !== hovered && a !== hovered) {
        out.color = GRIGIO();
        out.zIndex = 0;
      } else if (hovered) {
        out.zIndex = 2;
        out.size = (out.size ?? 1) * 1.6;
      }
      return out;
    });

    sigma.on('enterNode', ({ node }) => {
      hoveredRef.current = node;
      sigma.refresh();
    });
    sigma.on('leaveNode', () => {
      hoveredRef.current = null;
      sigma.refresh();
    });
    sigma.on('clickNode', ({ node }) => setSelezionato(node));
    sigma.on('clickStage', () => setSelezionato(null));

    // overlay SVG per le genealogie leggendarie (tratteggio reale)
    const ridisegnaOverlay = () => {
      const svg = svgOverlay.current;
      if (!svg) return;
      const { width, height } = sigma.getDimensions();
      svg.setAttribute('viewBox', `0 0 ${width} ${height}`);
      const mostra = filtriRef.current.leggendarie;
      const frammenti: string[] = [];
      if (mostra) {
        for (const a of dati.archi) {
          if (a.tipo !== 'attribuzione_infondata') continue;
          if (!nodoEVisibile(a.da) || !nodoEVisibile(a.a)) continue;
          const p1 = sigma.graphToViewport({ x: perId.get(a.da)!.x, y: perId.get(a.da)!.y });
          const p2 = sigma.graphToViewport({ x: perId.get(a.a)!.x, y: perId.get(a.a)!.y });
          frammenti.push(
            `<line x1="${p1.x.toFixed(1)}" y1="${p1.y.toFixed(1)}" x2="${p2.x.toFixed(1)}" y2="${p2.y.toFixed(1)}" stroke="${COLORI_ARCO.attribuzione_infondata}" stroke-width="1.8" stroke-dasharray="7 5" opacity="0.9" marker-end="url(#freccia-leggendaria)"/>`
          );
        }
      }
      svg.innerHTML =
        `<defs><marker id="freccia-leggendaria" viewBox="0 0 8 8" refX="7" refY="4" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0 0 L8 4 L0 8 Z" fill="${COLORI_ARCO.attribuzione_infondata}"/></marker></defs>` +
        frammenti.join('');
    };
    sigma.on('afterRender', ridisegnaOverlay);

    // il tema può cambiare a runtime: rileggi i colori e riapplica
    const osservatore = new MutationObserver(() => {
      const nuovi = coloriTema();
      coloriRef.current = nuovi;
      sigma.setSetting('labelColor', { color: nuovi.testo });
      g.forEachNode((id) => {
        const n = perId.get(id);
        if (n) g.setNodeAttribute(id, 'color', nuovi.parte[n.parte]);
      });
      sigma.refresh();
    });
    osservatore.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });

    return () => {
      osservatore.disconnect();
      sigma.kill();
      sigmaRef.current = null;
    };
  }, [dati]); // eslint-disable-line react-hooks/exhaustive-deps

  // refresh su cambio filtri/selezione
  useEffect(() => {
    sigmaRef.current?.refresh();
  }, [filtri, selezionato]);

  // stato → query string (condivisibile)
  useEffect(() => {
    if (!dati) return;
    const qs = serializzaStatoGrafo(statoDaFiltri(filtri, selezionato));
    history.replaceState(null, '', `${location.pathname}${qs}${location.hash}`);
  }, [filtri, selezionato, dati]);

  const vaiANodo = useCallback(
    (id: string) => {
      setSelezionato(id);
      const sigma = sigmaRef.current;
      const nodo = perId.get(id);
      if (!sigma || !nodo) return;
      const camera = sigma.getCamera();
      const posizione = sigma.getNodeDisplayData(id);
      if (posizione) {
        camera.animate(
          { x: posizione.x, y: posizione.y, ratio: Math.min(camera.ratio, 0.25) },
          { duration: menoMovimento ? 0 : 550 }
        );
      }
    },
    [perId, menoMovimento]
  );

  // selezione iniziale da URL: vola sul nodo quando sigma è pronto
  useEffect(() => {
    if (dati && selezionato && sigmaRef.current) {
      const t = setTimeout(() => vaiANodo(selezionato), 80);
      return () => clearTimeout(t);
    }
  }, [dati]); // eslint-disable-line react-hooks/exhaustive-deps

  // riproduzione temporale: il campo si popola dal -800 a oggi
  useEffect(() => {
    if (!inRiproduzione) return;
    const passo = 20;
    const intervallo = setInterval(() => {
      setFiltri((f) => {
        const prossimo = Math.min(f.a + passo, INTERVALLO_TEMPO[1]);
        if (prossimo === INTERVALLO_TEMPO[1]) setInRiproduzione(false);
        return { ...f, a: prossimo };
      });
    }, 90);
    return () => clearInterval(intervallo);
  }, [inRiproduzione]);

  const avviaRiproduzione = useCallback(() => {
    setFiltri((f) => ({ ...f, a: f.da }));
    setSelezionato(null);
    setInRiproduzione(true);
  }, []);

  const visibili = useMemo(() => {
    if (!dati) return 0;
    return dati.nodi.filter((n) => {
      if (!nodoVisibile(n, filtri)) return false;
      const dentroFocus = insiemeFocusRef.current;
      return !dentroFocus || dentroFocus.has(n.id);
    }).length;
  }, [dati, filtri, focus]);

  if (errore) {
    return (
      <div role="alert" className="p-6">
        <p>Impossibile caricare il grafo: {errore}</p>
        <p className="mt-2">
          <a className="underline text-accento" href={withBase('/grafo/elenco')}>
            Consulta l’elenco delle voci
          </a>
        </p>
      </div>
    );
  }

  const nodoSelezionato = selezionato ? (perId.get(selezionato) ?? null) : null;

  return (
    <div className="vista-grafo">
      <div className="vista-grafo-controlli" aria-label="Controlli del grafo">
        {dati && (
          <Controlli
            dati={dati}
            filtri={filtri}
            onCambia={(fn) => setFiltri((f) => fn(f))}
            onCerca={vaiANodo}
            inRiproduzione={inRiproduzione}
            onRiproduci={avviaRiproduzione}
            onFerma={() => setInRiproduzione(false)}
            riproduzioneDisponibile={!menoMovimento}
            visibili={visibili}
          />
        )}
      </div>

      <div className="vista-grafo-canvas" aria-hidden="false">
        <div
          ref={contenitore}
          className="absolute inset-0"
          role="application"
          aria-label="Grafo interattivo dell'atlante. La stessa informazione è disponibile nell'elenco accessibile."
        />
        <svg ref={svgOverlay} className="absolute inset-0 pointer-events-none" aria-hidden="true" />
        {!dati && (
          <p className="absolute inset-0 grid place-content-center text-sm" role="status">
            Caricamento del grafo…
          </p>
        )}
      </div>

      {dati && nodoSelezionato && (
        <PannelloNodo
          dati={dati}
          nodo={nodoSelezionato}
          onChiudi={() => {
            setSelezionato(null);
            setFocus(null);
          }}
          onVaiANodo={vaiANodo}
          onIsolaCluster={() => setFocus({ modo: 'cluster', nodo: nodoSelezionato.id })}
          onEspandiVicinato={() => setFocus({ modo: 'ego2', nodo: nodoSelezionato.id })}
          focusAttivo={focus?.modo ?? null}
          onMostraTutto={() => setFocus(null)}
        />
      )}
    </div>
  );
}
