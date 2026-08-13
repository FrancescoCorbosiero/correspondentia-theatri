import type { TipoNodo } from './costanti';

/**
 * Glifi per tipo di nodo: path SVG minimi (viewBox 0 0 24 24, stroke o fill
 * monocromo) usati in legenda, elenco, pannello e — come data-URI — dentro i
 * nodi Sigma. Il tipo è sempre comunicato anche a testo: il glifo è un
 * rinforzo, non l'unico canale.
 */
export const GLIFI_TIPO: Record<TipoNodo, string> = {
  // rombo: le sei macro-aree
  parte: 'M12 3 L21 12 L12 21 L3 12 Z',
  // onda: una corrente
  corrente: 'M3 9 Q7.5 4.5 12 9 T21 9 M3 15 Q7.5 10.5 12 15 T21 15',
  // cerchio con punto: un concetto
  concetto: 'M12 4 A8 8 0 1 0 12.01 4 Z M12 10.5 A1.5 1.5 0 1 0 12.01 10.5 Z',
  // mano/strumento stilizzato: triangolo con base, una pratica
  pratica: 'M12 4 L20 18 L4 18 Z',
  // stella a quattro punte: un simbolo
  simbolo: 'M12 2 L14.5 9.5 L22 12 L14.5 14.5 L12 22 L9.5 14.5 L2 12 L9.5 9.5 Z',
  // busto: una persona
  persona: 'M12 4 A4 4 0 1 0 12.01 4 Z M4 20 Q4 13 12 13 Q20 13 20 20 Z',
  // libro aperto: un'opera
  opera: 'M4 5 Q8 3.5 12 5.5 L12 19.5 Q8 17.5 4 19 Z M20 5 Q16 3.5 12 5.5 L12 19.5 Q16 17.5 20 19 Z',
  // clessidra: un evento datato
  evento: 'M6 3 L18 3 L18 7 L13 12 L18 17 L18 21 L6 21 L6 17 L11 12 L6 7 Z',
  // goccia rovesciata / segnaposto: un luogo
  luogo: 'M12 21 Q5 13.5 5 9.5 A7 7 0 0 1 19 9.5 Q19 13.5 12 21 Z M12 7 A2.5 2.5 0 1 0 12.01 7 Z',
};

/** SVG completo come stringa, per i data-URI dei nodi Sigma. */
export function svgGlifo(tipo: TipoNodo, colore = '#ffffff'): string {
  const path = GLIFI_TIPO[tipo];
  const usaStroke = tipo === 'corrente';
  const attributi = usaStroke
    ? `fill="none" stroke="${colore}" stroke-width="2.4" stroke-linecap="round"`
    : `fill="${colore}" fill-rule="evenodd"`;
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="${path}" ${attributi}/></svg>`;
}

export function dataUriGlifo(tipo: TipoNodo, colore = '#ffffff'): string {
  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svgGlifo(tipo, colore))}`;
}
