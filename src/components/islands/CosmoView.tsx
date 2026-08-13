import { useEffect, useRef, useState } from 'react';
import { adiacenza, caricaGrafo, coloriTema, preferisceMenoMovimento } from '../../lib/grafo-client';
import type { DatiGrafo } from '../../lib/tipi-grafo';
import { INTERVALLO_TEMPO, withBase } from '../../lib/percorsi-url';
import { COLORI_ARCO } from '../../lib/palette';
import { ETICHETTE_TIPO_NODO } from '../../lib/costanti';

/**
 * /cosmo (§5.3): il grafo in tre dimensioni con l'asse Z = tempo — i nodi
 * antichi in profondità, i moderni in superficie. Le posizioni X/Y sono le
 * stesse del layout 2D (il cosmo è il grafo sollevato nel tempo, non un'altra
 * mappa). Se WebGL manca o l'utente preferisce il movimento ridotto, si
 * reindirizza alla vista 2D con un avviso.
 */
export default function CosmoView() {
  const contenitore = useRef<HTMLDivElement>(null);
  const [stato, setStato] = useState<'caricamento' | 'pronto' | 'ripiego'>('caricamento');

  useEffect(() => {
    // degradazione con grazia (§5.3)
    const sonda = document.createElement('canvas');
    const webgl = !!(sonda.getContext('webgl2') || sonda.getContext('webgl'));
    if (!webgl || preferisceMenoMovimento()) {
      setStato('ripiego');
      const t = setTimeout(() => {
        location.replace(withBase('/grafo?avviso=cosmo'));
      }, 2500);
      return () => clearTimeout(t);
    }

    let distruggi: (() => void) | undefined;
    let annullato = false;

    Promise.all([caricaGrafo(), import('react-force-graph-3d'), import('react-dom/client'), import('react')]).then(
      ([dati, forceGraphModulo, { createRoot }, React]) => {
        if (annullato || !contenitore.current) return;
        const ForceGraph3D = forceGraphModulo.default;
        const colori = coloriTema();

        const scalaZ = (anno: number) =>
          ((anno - INTERVALLO_TEMPO[0]) / (INTERVALLO_TEMPO[1] - INTERVALLO_TEMPO[0])) * 900 - 450;

        // z per gli atemporali: baricentro temporale dei vicini datati
        const adj = adiacenza(dati, { includiContiene: true, includiLeggendarie: true });
        const perId = new Map(dati.nodi.map((n) => [n.id, n]));
        const zPer = (id: string): number => {
          const nodo = perId.get(id)!;
          if (nodo.periodo) return scalaZ((nodo.periodo.da + nodo.periodo.a) / 2);
          const anniVicini = [...(adj.get(id) ?? [])]
            .map((v) => perId.get(v))
            .filter((v) => v?.periodo)
            .map((v) => (v!.periodo!.da + v!.periodo!.a) / 2);
          if (anniVicini.length === 0) return 0;
          return scalaZ(anniVicini.reduce((s, a) => s + a, 0) / anniVicini.length);
        };

        const nodi = dati.nodi.map((n) => ({
          id: n.id,
          nome: n.titolo,
          tipo: n.tipo,
          parte: n.parte,
          peso: n.peso,
          periodo: n.periodo,
          // posizioni fisse: niente simulazione, il 3D è informativo non scenografico
          fx: n.x * 3,
          fy: n.y * 3,
          fz: zPer(n.id),
        }));
        const archi = dati.archi
          .filter((a) => a.tipo !== 'attribuzione_infondata')
          .map((a) => ({ source: a.da, target: a.a, tipo: a.tipo }));

        const radice = createRoot(contenitore.current);
        const riferimentoGrafo = React.createRef<{
          cameraPosition: (p: object, l?: object, ms?: number) => void;
          scene: () => { fog: unknown };
        }>();

        const Componente = () =>
          React.createElement(ForceGraph3D as never, {
            ref: riferimentoGrafo,
            graphData: { nodes: nodi, links: archi },
            backgroundColor: colori.sfondo,
            nodeId: 'id',
            nodeLabel: (n: (typeof nodi)[number]) =>
              `<div style="font-family:sans-serif;font-size:12px;color:${colori.testo};background:${colori.sfondo}cc;padding:2px 6px;border-radius:3px">${n.nome}<br/><small>${ETICHETTE_TIPO_NODO[n.tipo]}${n.periodo ? ` · ${n.periodo.da}–${n.periodo.a}` : ''}</small></div>`,
            nodeVal: (n: (typeof nodi)[number]) => n.peso * 1.6,
            nodeColor: (n: (typeof nodi)[number]) => colori.parte[n.parte],
            nodeOpacity: 0.92,
            linkColor: (l: { tipo: string }) => COLORI_ARCO[l.tipo] ?? colori.bordo,
            linkOpacity: 0.25,
            linkWidth: 0.4,
            enableNodeDrag: false,
            warmupTicks: 0,
            cooldownTicks: 0,
            showNavInfo: false,
            onNodeClick: (n: (typeof nodi)[number] & { fx: number; fy: number; fz: number }) => {
              // volo di camera sul nodo, poi la voce al secondo click
              const distanza = 90;
              riferimentoGrafo.current?.cameraPosition(
                { x: n.fx, y: n.fy, z: n.fz + distanza },
                { x: n.fx, y: n.fy, z: n.fz },
                800
              );
              const ultimo = (window as { __ultimoNodoCosmo?: string }).__ultimoNodoCosmo;
              if (ultimo === n.id) location.href = withBase(`/voce/${n.id}`);
              (window as { __ultimoNodoCosmo?: string }).__ultimoNodoCosmo = n.id;
            },
          });
        radice.render(React.createElement(Componente));

        // nebbia per la profondità temporale
        const applicaNebbia = async () => {
          const { Fog, Color } = await import('three');
          const scena = riferimentoGrafo.current?.scene();
          if (scena) scena.fog = new Fog(new Color(colori.sfondo).getHex(), 300, 1400);
        };
        setTimeout(applicaNebbia, 400);

        setStato('pronto');
        distruggi = () => radice.unmount();
      },
      () => setStato('ripiego')
    );

    return () => {
      annullato = true;
      distruggi?.();
    };
  }, []);

  if (stato === 'ripiego') {
    return (
      <div role="alert" className="mx-auto max-w-xl p-10 text-center">
        <h2 className="font-serif text-2xl">La vista 3D non è disponibile qui</h2>
        <p className="mt-2 text-sm" style={{ color: 'var(--testo-tenue)' }}>
          Serve WebGL, e viene rispettata la preferenza per il movimento ridotto. Ti stiamo
          portando alla vista 2D, che contiene le stesse informazioni.
        </p>
        <p className="mt-4">
          <a className="underline text-accento" href={withBase('/grafo?avviso=cosmo')}>
            Vai subito al grafo 2D →
          </a>
        </p>
      </div>
    );
  }

  return (
    <div className="relative h-full">
      <div ref={contenitore} className="absolute inset-0" aria-hidden="true" />
      {stato === 'caricamento' && (
        <p role="status" className="absolute inset-0 grid place-content-center text-sm">
          Caricamento del cosmo…
        </p>
      )}
      <div
        className="absolute bottom-3 left-3 rounded border border-bordo bg-rialzato/90 px-3 py-2 text-xs max-w-xs"
        role="note"
      >
        <p>
          <strong>Asse di profondità = tempo</strong>: l’antico è lontano, il moderno in
          superficie. Doppio click su un nodo per aprire la voce.
        </p>
        <p className="mt-1" style={{ color: 'var(--testo-tenue)' }}>
          Le stesse informazioni, senza 3D: <a className="underline" href={withBase('/grafo')}>grafo 2D</a> ·{' '}
          <a className="underline" href={withBase('/grafo/elenco')}>elenco</a>
        </p>
      </div>
    </div>
  );
}
