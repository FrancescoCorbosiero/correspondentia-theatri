import { GLIFI_TIPO } from '../../../lib/icone';
import { COLORI_ARCO, NOMI_PARTE } from '../../../lib/palette';
import { ETICHETTE_TIPO_ARCO, ETICHETTE_TIPO_NODO, TIPI_ARCO, TIPI_NODO } from '../../../lib/costanti';

/** Legenda del grafo: colore = parte, glifo = tipo, colore d'arco = relazione. */
export default function Legenda() {
  return (
    <details className="text-xs border border-bordo rounded p-2 bg-rialzato">
      <summary className="cursor-pointer font-medium select-none">Legenda</summary>

      <h4 className="mt-2 font-semibold" style={{ color: 'var(--testo-tenue)' }}>
        Colore · parte del volume
      </h4>
      <ul className="mt-1 space-y-0.5">
        {[1, 2, 3, 4, 5, 6].map((n) => (
          <li key={n} className="flex items-center gap-2">
            <span
              aria-hidden="true"
              className="inline-block size-3 rounded-full"
              style={{ background: `var(--parte-${n})` }}
            />
            {NOMI_PARTE[n]}
          </li>
        ))}
      </ul>

      <h4 className="mt-3 font-semibold" style={{ color: 'var(--testo-tenue)' }}>
        Glifo · tipo di voce
      </h4>
      <ul className="mt-1 grid grid-cols-2 gap-x-3 gap-y-0.5">
        {TIPI_NODO.map((tipo) => (
          <li key={tipo} className="flex items-center gap-2">
            <svg viewBox="0 0 24 24" className="size-3.5 shrink-0" aria-hidden="true">
              <path
                d={GLIFI_TIPO[tipo]}
                fill={tipo === 'corrente' ? 'none' : 'currentColor'}
                stroke={tipo === 'corrente' ? 'currentColor' : 'none'}
                strokeWidth={tipo === 'corrente' ? 2.4 : 0}
                fillRule="evenodd"
              />
            </svg>
            {ETICHETTE_TIPO_NODO[tipo]}
          </li>
        ))}
      </ul>

      <h4 className="mt-3 font-semibold" style={{ color: 'var(--testo-tenue)' }}>
        Colore d’arco · relazione
      </h4>
      <ul className="mt-1 space-y-0.5">
        {TIPI_ARCO.map((tipo) => (
          <li key={tipo} className="flex items-center gap-2">
            <span
              aria-hidden="true"
              className="inline-block h-0.5 w-5"
              style={
                tipo === 'attribuzione_infondata'
                  ? {
                      backgroundImage: `repeating-linear-gradient(90deg, ${COLORI_ARCO[tipo]} 0 4px, transparent 4px 7px)`,
                    }
                  : { background: COLORI_ARCO[tipo] }
              }
            />
            {ETICHETTE_TIPO_ARCO[tipo]}
          </li>
        ))}
      </ul>

      <p className="mt-3 leading-snug border-t border-bordo pt-2">
        Gli archi <strong>tratteggiati</strong> sono genealogie <em>rivendicate dalla tradizione e
        smentite dalla storiografia</em> (per esempio: Egitto → Templari → Rosacroce → Massoneria).
        Sono spenti per impostazione predefinita; ogni arco porta una nota che spiega perché
        l’attribuzione non regge.
      </p>
    </details>
  );
}
