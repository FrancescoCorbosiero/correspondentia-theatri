import { useEffect, useRef, useState } from 'react';
import {
  adiacenza,
  caricaGrafo,
  coloriTema,
  dimensioneDaPeso,
  egoNetwork,
  indicePerId,
  preferisceMenoMovimento,
} from '../../lib/grafo-client';
import { dataUriGlifo } from '../../lib/icone';
import { COLORI_ARCO } from '../../lib/palette';
import { withBase } from '../../lib/percorsi-url';

interface Props {
  /** id della voce al centro dell'ego-network */
  centro: string;
}

/**
 * Mini-grafo ego per la pagina voce (§5.5): Sigma in modalità statica,
 * al massimo ~30 nodi, click = navigazione alla voce. Il contenuto della
 * pagina resta completo anche senza questo componente (parità testuale).
 */
export default function EgoGraph({ centro }: Props) {
  const contenitore = useRef<HTMLDivElement>(null);
  const [pronto, setPronto] = useState(false);

  useEffect(() => {
    let distruggi: (() => void) | undefined;
    let annullato = false;

    Promise.all([caricaGrafo(), import('graphology'), import('sigma'), import('@sigma/node-image')]).then(
      ([dati, { default: Graph }, { default: Sigma }, { createNodeImageProgram }]) => {
        if (annullato || !contenitore.current) return;
        const perId = indicePerId(dati);
        const nodoCentro = perId.get(centro);
        if (!nodoCentro) return;

        const adj = adiacenza(dati, { includiContiene: false, includiLeggendarie: true });
        let dentro = egoNetwork(centro, adj, 1);
        if (dentro.size > 30) {
          // tiene i 29 vicini di peso maggiore
          const vicini = [...dentro]
            .filter((id) => id !== centro)
            .map((id) => perId.get(id)!)
            .sort((a, b) => b.peso - a.peso || a.id.localeCompare(b.id))
            .slice(0, 29)
            .map((n) => n.id);
          dentro = new Set([centro, ...vicini]);
        }

        const colori = coloriTema();
        const g = new Graph({ multi: true, type: 'directed' });
        for (const id of dentro) {
          const n = perId.get(id)!;
          g.addNode(id, {
            x: n.x,
            y: n.y,
            label: n.titolo,
            size: id === centro ? dimensioneDaPeso(n.peso) + 3 : dimensioneDaPeso(n.peso),
            color: colori.parte[n.parte],
            type: 'image',
            image: dataUriGlifo(n.tipo, '#ffffff'),
            highlighted: id === centro,
          });
        }
        for (const a of dati.archi) {
          if (a.tipo === 'contiene') continue;
          if (!dentro.has(a.da) || !dentro.has(a.a)) continue;
          g.addDirectedEdgeWithKey(a.chiave, a.da, a.a, {
            size: a.tipo === 'attribuzione_infondata' ? 1 : 1.3,
            color: COLORI_ARCO[a.tipo],
            type: 'arrow',
          });
        }

        const sigma = new Sigma(g, contenitore.current, {
          allowInvalidContainer: true,
          defaultNodeType: 'image',
          nodeProgramClasses: { image: createNodeImageProgram({ padding: 0.28 }) },
          labelFont: '"Inter Variable", system-ui, sans-serif',
          labelSize: 10,
          labelColor: { color: colori.testo },
          labelRenderedSizeThreshold: 6,
          stagePadding: 24,
          enableCameraRotation: false,
          minCameraRatio: 0.5,
          maxCameraRatio: 2,
        });
        sigma.on('clickNode', ({ node }) => {
          if (node !== centro) location.href = withBase(`/voce/${node}`);
        });
        // cursore a mano sui nodi
        sigma.on('enterNode', () => (contenitore.current!.style.cursor = 'pointer'));
        sigma.on('leaveNode', () => (contenitore.current!.style.cursor = 'default'));
        if (!preferisceMenoMovimento()) sigma.getCamera().animatedReset({ duration: 300 });
        setPronto(true);
        distruggi = () => sigma.kill();
      },
      () => {
        /* senza rete o senza WebGL la pagina resta completa: nessun errore visibile */
      }
    );

    return () => {
      annullato = true;
      distruggi?.();
    };
  }, [centro]);

  return (
    <figure aria-label="Mini-grafo delle voci vicine (le stesse relazioni sono elencate nel testo)">
      <div
        ref={contenitore}
        className="h-64 w-full rounded border border-bordo"
        style={{ background: 'var(--sfondo-incassato)' }}
      />
      <figcaption className="mt-1 text-xs" style={{ color: 'var(--testo-tenue)' }}>
        {pronto
          ? 'Ego-rete della voce: un click su un nodo apre la voce corrispondente.'
          : 'Caricamento del mini-grafo… (le relazioni sono comunque elencate qui sotto)'}
      </figcaption>
    </figure>
  );
}
