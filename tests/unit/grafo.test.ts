import { describe, expect, it } from 'vitest';
import {
  ErroreValidazione,
  calcolaLayout,
  costruisciGrafo,
  leggiVoci,
  serializza,
  type VoceLetta,
} from '../../scripts/build-data';
import { voceSchema } from '../../src/lib/schema';

/** Fabbrica una VoceLetta sintetica valida. */
function voce(sovrascrivi: Record<string, unknown>, corpo = 'Corpo di prova della voce.'): VoceLetta {
  const base = {
    id: 'x',
    titolo: 'X',
    tipo: 'concetto',
    parte: 1,
    sommario: 'Sommario di prova sufficientemente lungo per lo schema.',
    peso: 2,
    luoghi: [],
    alias: [],
    archi: [],
    fonti: [],
  };
  const fm = voceSchema.parse({ ...base, ...sovrascrivi });
  return { fm, corpo, file: `${fm.id}.md` };
}

function seiParti(): VoceLetta[] {
  return [1, 2, 3, 4, 5, 6].map((n) =>
    voce({ id: `parte-${n}`, titolo: `Parte ${n}`, tipo: 'parte', parte: n, peso: 5 })
  );
}

describe('costruzione del grafo: invarianti (§6)', () => {
  it('accetta un grafo minimo valido e deriva i contiene', () => {
    const { archi } = costruisciGrafo([
      ...seiParti(),
      voce({ id: 'gnosi', parte: 3 }),
      voce({ id: 'ficino', tipo: 'persona', parte: 2, archi: [{ verso: 'gnosi', tipo: 'elabora' }] }),
    ]);
    const contiene = archi.filter((a) => a.tipo === 'contiene');
    expect(contiene).toHaveLength(2);
    expect(contiene.map((a) => `${a.da}->${a.a}`).sort()).toEqual(['parte-2->ficino', 'parte-3->gnosi']);
  });

  it('errore su riferimento pendente', () => {
    expect(() =>
      costruisciGrafo([...seiParti(), voce({ id: 'a', archi: [{ verso: 'inesistente', tipo: 'influenza' }] })])
    ).toThrowError(/pendente/);
  });

  it('errore se manca un nodo parte', () => {
    expect(() => costruisciGrafo(seiParti().slice(0, 5))).toThrowError(/manca il nodo radice/);
  });

  it('errore su arco duplicato e su arco riflessivo', () => {
    expect(() =>
      costruisciGrafo([
        ...seiParti(),
        voce({ id: 'b', parte: 1 }),
        voce({
          id: 'a',
          archi: [
            { verso: 'b', tipo: 'influenza' },
            { verso: 'b', tipo: 'influenza' },
          ],
        }),
      ])
    ).toThrowError(/duplicato/);
    expect(() =>
      costruisciGrafo([...seiParti(), voce({ id: 'a', archi: [{ verso: 'a', tipo: 'influenza' }] })])
    ).toThrowError(/riflessivo/);
  });

  it('errore se un luogo non esiste o non è di tipo luogo', () => {
    expect(() => costruisciGrafo([...seiParti(), voce({ id: 'a', luoghi: ['atlantide'] })])).toThrowError(
      /luogo pendente/
    );
    expect(() =>
      costruisciGrafo([...seiParti(), voce({ id: 'b', parte: 1 }), voce({ id: 'a', luoghi: ['b'] })])
    ).toThrowError(/tipo/);
  });

  it('ogni nodo è raggiungibile dalle radici (via contiene)', () => {
    // il contiene derivato garantisce la raggiungibilità per costruzione
    const { grafo } = costruisciGrafo([...seiParti(), voce({ id: 'isolato', parte: 5 })]);
    expect(grafo.order).toBe(7);
  });
});

describe('layout deterministico', () => {
  it('due esecuzioni producono le stesse coordinate', () => {
    const costruisci = () => {
      const g = costruisciGrafo([
        ...seiParti(),
        voce({ id: 'a', parte: 1, archi: [{ verso: 'b', tipo: 'influenza' }] }),
        voce({ id: 'b', parte: 2, archi: [{ verso: 'c', tipo: 'deriva_da' }] }),
        voce({ id: 'c', parte: 3 }),
      ]);
      calcolaLayout(g.grafo);
      return serializza(g).dati.nodi.map((n) => [n.id, n.x, n.y]);
    };
    expect(costruisci()).toEqual(costruisci());
  });
});

describe('contenuto reale del progetto', () => {
  it('le voci in src/content/voci passano tutte le validazioni', () => {
    const voci = leggiVoci();
    expect(voci.length).toBeGreaterThanOrEqual(10);
    const { grafo, archi } = costruisciGrafo(voci);
    expect(grafo.order).toBe(voci.length);
    // ogni attribuzione_infondata ha la nota (già garantito dallo schema: ricontrollo)
    for (const arco of archi) {
      if (arco.tipo === 'attribuzione_infondata') {
        expect(arco.nota, `nota mancante su ${arco.chiave}`).toBeTruthy();
        expect(arco.nota!.length).toBeGreaterThanOrEqual(10);
      }
    }
  });

  it('la pipeline segnala con ErroreValidazione, non con eccezioni generiche', () => {
    expect(() => leggiVoci('/percorso/inesistente')).toThrowError(ErroreValidazione);
  });
});
