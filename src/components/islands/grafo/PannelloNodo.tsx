import type { DatiGrafo, NodoGrafo } from '../../../lib/tipi-grafo';
import { archiPerTipo, indicePerId } from '../../../lib/grafo-client';
import { formattaPeriodo, withBase } from '../../../lib/percorsi-url';
import { ETICHETTE_TIPO_ARCO, ETICHETTE_TIPO_NODO, type TipoArco } from '../../../lib/costanti';
import { NOMI_PARTE_BREVI } from '../../../lib/palette';

interface Props {
  dati: DatiGrafo;
  nodo: NodoGrafo;
  onChiudi: () => void;
  onVaiANodo: (id: string) => void;
  onIsolaCluster: () => void;
  onEspandiVicinato: () => void;
  focusAttivo: 'cluster' | 'ego2' | null;
  onMostraTutto: () => void;
}

/** Pannello laterale (bottom-sheet su mobile) della voce selezionata nel grafo. */
export default function PannelloNodo({
  dati,
  nodo,
  onChiudi,
  onVaiANodo,
  onIsolaCluster,
  onEspandiVicinato,
  focusAttivo,
  onMostraTutto,
}: Props) {
  const perId = indicePerId(dati);
  const { uscenti, entranti } = archiPerTipo(dati, nodo.id);

  const gruppo = (
    mappa: Map<TipoArco, (typeof dati.archi)[number][]>,
    direzione: 'uscenti' | 'entranti'
  ) =>
    [...mappa.entries()]
      .filter(([tipo]) => tipo !== 'contiene')
      .map(([tipo, archi]) => (
        <div key={`${direzione}-${tipo}`}>
          <h4 className="text-[0.7rem] uppercase tracking-wide font-semibold mt-3 mb-1"
              style={{ color: 'var(--testo-tenue)' }}>
            {direzione === 'uscenti' ? ETICHETTE_TIPO_ARCO[tipo] : `${ETICHETTE_TIPO_ARCO[tipo]} ← da`}
            {tipo === 'attribuzione_infondata' && (
              <span className="ms-1 normal-case font-normal">(genealogia leggendaria)</span>
            )}
          </h4>
          <ul className="space-y-1">
            {archi.map((arco) => {
              const altroId = direzione === 'uscenti' ? arco.a : arco.da;
              const altro = perId.get(altroId);
              if (!altro) return null;
              return (
                <li key={arco.chiave} className="text-sm leading-snug">
                  <button
                    type="button"
                    onClick={() => onVaiANodo(altroId)}
                    className="text-start underline decoration-dotted underline-offset-2 hover:text-accento focus-visible:text-accento"
                  >
                    {altro.titolo}
                  </button>
                  {arco.nota && (
                    <span className="block text-xs" style={{ color: 'var(--testo-tenue)' }}>
                      {arco.nota}
                    </span>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      ));

  return (
    <aside
      aria-label={`Dettagli della voce ${nodo.titolo}`}
      className="pannello-nodo bg-rialzato border-bordo flex flex-col"
    >
      <div className="flex items-start gap-2 p-4 pb-2">
        <div className="min-w-0">
          <p className="text-[0.7rem] uppercase tracking-wide" style={{ color: `var(--parte-${nodo.parte})` }}>
            {ETICHETTE_TIPO_NODO[nodo.tipo]} · {NOMI_PARTE_BREVI[nodo.parte]}
            {nodo.periodo && <span className="ms-2 normal-case">{formattaPeriodo(nodo.periodo)}</span>}
          </p>
          <h3 className="font-serif text-xl leading-tight mt-0.5">{nodo.titolo}</h3>
        </div>
        <button
          type="button"
          onClick={onChiudi}
          aria-label="Chiudi il pannello"
          className="ms-auto shrink-0 rounded border border-bordo px-2 py-0.5 text-sm hover:bg-incassato"
        >
          ✕
        </button>
      </div>

      <div className="px-4 pb-4 overflow-y-auto min-h-0">
        <p className="text-sm leading-relaxed">{nodo.sommario}</p>

        <p className="mt-3">
          <a
            href={withBase(`/voce/${nodo.id}`)}
            className="inline-block rounded bg-accento px-3 py-1.5 text-sm text-white hover:opacity-90"
          >
            Apri la voce completa →
          </a>
        </p>

        <div className="mt-3 flex flex-wrap gap-2 text-xs">
          <button
            type="button"
            onClick={focusAttivo === 'cluster' ? onMostraTutto : onIsolaCluster}
            aria-pressed={focusAttivo === 'cluster'}
            className="rounded border border-bordo px-2 py-1 hover:bg-incassato aria-pressed:bg-incassato"
          >
            {focusAttivo === 'cluster' ? 'Mostra tutto' : 'Isola il cluster'}
          </button>
          <button
            type="button"
            onClick={focusAttivo === 'ego2' ? onMostraTutto : onEspandiVicinato}
            aria-pressed={focusAttivo === 'ego2'}
            className="rounded border border-bordo px-2 py-1 hover:bg-incassato aria-pressed:bg-incassato"
          >
            {focusAttivo === 'ego2' ? 'Mostra tutto' : 'Vicinato di 2º grado'}
          </button>
        </div>

        {gruppo(uscenti, 'uscenti')}
        {gruppo(entranti, 'entranti')}
      </div>
    </aside>
  );
}
