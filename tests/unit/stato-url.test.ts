import { describe, expect, it } from 'vitest';
import {
  INTERVALLO_TEMPO,
  analizzaStatoGrafo,
  formattaAnno,
  formattaPeriodo,
  serializzaStatoGrafo,
  type StatoGrafo,
} from '../../src/lib/percorsi-url';

describe('stato del grafo in query string (§6, URL condivisibili)', () => {
  it('serializza e rilegge uno stato completo (andata e ritorno)', () => {
    const stato: StatoGrafo = {
      tipi: ['persona', 'opera'],
      archi: ['influenza', 'attribuzione_infondata'],
      parti: [2, 3],
      da: -300,
      a: 1600,
      nodo: 'ficino',
      leggendarie: true,
    };
    const qs = serializzaStatoGrafo(stato);
    expect(analizzaStatoGrafo(qs)).toEqual(stato);
  });

  it('uno stato vuoto produce query vuota', () => {
    expect(serializzaStatoGrafo({})).toBe('');
    expect(analizzaStatoGrafo('')).toEqual({});
  });

  it('ignora valori fuori dominio senza esplodere', () => {
    const stato = analizzaStatoGrafo('?tipi=persona,drago&parti=2,9&nodo=<script>&archi=influenza,magia');
    expect(stato.tipi).toEqual(['persona']);
    expect(stato.parti).toEqual([2]);
    expect(stato.nodo).toBeUndefined();
    expect(stato.archi).toEqual(['influenza']);
  });

  it('omette gli estremi temporali di default', () => {
    expect(serializzaStatoGrafo({ da: INTERVALLO_TEMPO[0], a: INTERVALLO_TEMPO[1] })).toBe('');
  });
});

describe('formattazione degli anni', () => {
  it('anni negativi come a.C.', () => {
    expect(formattaAnno(-800)).toBe('800 a.C.');
    expect(formattaAnno(1614)).toBe('1614');
  });
  it('periodo puntuale come anno singolo', () => {
    expect(formattaPeriodo({ da: 1614, a: 1614 })).toBe('1614');
    expect(formattaPeriodo({ da: -600, a: 200 })).toBe('600 a.C. – 200');
  });
});
