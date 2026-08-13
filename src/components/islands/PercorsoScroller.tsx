import { useEffect, useMemo, useRef, useState } from 'react';
import { caricaGrafo, coloriTema, preferisceMenoMovimento } from '../../lib/grafo-client';
import type { DatiGrafo } from '../../lib/tipi-grafo';

interface Props {
  /** id delle voci del percorso, in ordine di tappa */
  tappe: string[];
}

/**
 * La mappa del percorso (§5.6): il grafo in miniatura con il cammino che si
 * evidenzia man mano che si scorre il testo. SVG puro sulle coordinate
 * ForceAtlas2 pre-calcolate: niente librerie, niente layout a runtime.
 * Con prefers-reduced-motion le transizioni sono disattivate dal CSS globale.
 */
export default function PercorsoScroller({ tappe }: Props) {
  const [dati, setDati] = useState<DatiGrafo | null>(null);
  const [passo, setPasso] = useState(0);
  const [colori, setColori] = useState(() => ({ evidenzia: '#6b2d5c', contesto: '#d9d2c1', testo: '#1a1a2e' }));
  const riferimento = useRef<HTMLDivElement>(null);

  useEffect(() => {
    caricaGrafo().then(setDati, () => {});
    const t = coloriTema();
    setColori({ evidenzia: t.parte[3]!, contesto: t.bordo, testo: t.testo });
  }, []);

  // osserva le tappe nel testo: l'ultima visibile determina il passo corrente
  useEffect(() => {
    const elementi = Array.from(document.querySelectorAll<HTMLElement>('.tappa-percorso'));
    if (elementi.length === 0) return;
    const osservatore = new IntersectionObserver(
      (voci) => {
        for (const voce of voci) {
          if (voce.isIntersecting) {
            const indice = elementi.indexOf(voce.target as HTMLElement);
            if (indice >= 0) setPasso((p) => Math.max(p, indice + 1));
          }
        }
      },
      { rootMargin: '0px 0px -55% 0px' }
    );
    for (const el of elementi) osservatore.observe(el);
    return () => osservatore.disconnect();
  }, [dati]);

  const geometria = useMemo(() => {
    if (!dati) return null;
    const xs = dati.nodi.map((n) => n.x);
    const ys = dati.nodi.map((n) => n.y);
    const minX = Math.min(...xs);
    const maxX = Math.max(...xs);
    const minY = Math.min(...ys);
    const maxY = Math.max(...ys);
    const larghezza = 360;
    const altezza = 300;
    const margine = 16;
    const scala = Math.min(
      (larghezza - margine * 2) / (maxX - minX || 1),
      (altezza - margine * 2) / (maxY - minY || 1)
    );
    const px = (x: number) => (x - minX) * scala + margine + (larghezza - margine * 2 - (maxX - minX) * scala) / 2;
    const py = (y: number) => (y - minY) * scala + margine + (altezza - margine * 2 - (maxY - minY) * scala) / 2;
    const perId = new Map(dati.nodi.map((n) => [n.id, n]));
    const punti = tappe
      .map((id) => perId.get(id))
      .filter(Boolean)
      .map((n) => ({ id: n!.id, titolo: n!.titolo, x: px(n!.x), y: py(n!.y), parte: n!.parte }));
    return { larghezza, altezza, px, py, punti };
  }, [dati, tappe]);

  if (!dati || !geometria) {
    return <div ref={riferimento} className="h-72 rounded border border-bordo" style={{ background: 'var(--sfondo-incassato)' }} />;
  }

  const { larghezza, altezza, px, py, punti } = geometria;
  const istantaneo = preferisceMenoMovimento();

  return (
    <div ref={riferimento}>
      <svg
        viewBox={`0 0 ${larghezza} ${altezza}`}
        className="w-full rounded border border-bordo"
        style={{ background: 'var(--sfondo-incassato)' }}
        role="img"
        aria-label={`Mappa del percorso: ${punti.length} tappe evidenziate sul grafo dell'atlante`}
      >
        {/* contesto: tutte le voci come punti tenui */}
        {dati.nodi.map((n) => (
          <circle key={n.id} cx={px(n.x)} cy={py(n.y)} r={1.4} fill={colori.contesto} />
        ))}
        {/* cammino percorso finora */}
        {punti.slice(0, Math.max(passo, 1)).map((p, i) => {
          const succ = punti[i + 1];
          const attivo = i < passo - 1;
          return (
            succ &&
            attivo && (
              <line
                key={`filo-${p.id}`}
                x1={p.x}
                y1={p.y}
                x2={succ.x}
                y2={succ.y}
                stroke={colori.evidenzia}
                strokeWidth={1.8}
                strokeDasharray="none"
                opacity={0.85}
                style={istantaneo ? undefined : { transition: 'opacity 300ms' }}
              />
            )
          );
        })}
        {/* tappe */}
        {punti.map((p, i) => {
          const visitata = i < passo;
          return (
            <g key={p.id} opacity={visitata ? 1 : 0.35} style={istantaneo ? undefined : { transition: 'opacity 300ms' }}>
              <circle
                cx={p.x}
                cy={p.y}
                r={visitata ? 7 : 4.5}
                fill={visitata ? `var(--parte-${p.parte})` : colori.contesto}
                stroke={visitata ? colori.evidenzia : 'none'}
                strokeWidth={1.5}
              />
              <text
                x={p.x}
                y={p.y + 0.5}
                textAnchor="middle"
                dominantBaseline="middle"
                fontSize={7}
                fill="#ffffff"
                fontFamily="Inter Variable, sans-serif"
                fontWeight={600}
              >
                {i + 1}
              </text>
            </g>
          );
        })}
      </svg>
      <p className="mt-1 text-xs" role="status" style={{ color: 'var(--testo-tenue)' }}>
        Tappa {Math.max(passo, 1)} di {punti.length}
      </p>
    </div>
  );
}
