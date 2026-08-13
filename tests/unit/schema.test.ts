import { describe, expect, it } from 'vitest';
import { arcoSchema, periodoSchema, voceSchema } from '../../src/lib/schema';

const voceValida = {
  id: 'ficino',
  titolo: 'Marsilio Ficino',
  tipo: 'persona',
  parte: 2,
  sommario: 'Traduttore del Corpus Hermeticum, teorico della magia astrale medica.',
  periodo: { da: 1433, a: 1499 },
  luoghi: ['firenze'],
  alias: ['Ficinus'],
  peso: 3,
  archi: [{ verso: 'corpus-hermeticum', tipo: 'elabora', nota: 'Traduzione del 1463' }],
  fonti: ['Yates'],
};

describe('schema della voce (§3.4)', () => {
  it('accetta una voce completa valida', () => {
    expect(voceSchema.safeParse(voceValida).success).toBe(true);
  });

  it('rifiuta id non kebab-case', () => {
    for (const id of ['Ficino', 'ficino_x', 'ficino ', 'à-ficino', '-ficino', 'ficino-']) {
      expect(voceSchema.safeParse({ ...voceValida, id }).success).toBe(false);
    }
  });

  it('rifiuta tipo e parte fuori dominio', () => {
    expect(voceSchema.safeParse({ ...voceValida, tipo: 'santo' }).success).toBe(false);
    expect(voceSchema.safeParse({ ...voceValida, parte: 7 }).success).toBe(false);
    expect(voceSchema.safeParse({ ...voceValida, parte: 0 }).success).toBe(false);
  });

  it('rifiuta peso fuori da 1-5', () => {
    expect(voceSchema.safeParse({ ...voceValida, peso: 0 }).success).toBe(false);
    expect(voceSchema.safeParse({ ...voceValida, peso: 6 }).success).toBe(false);
  });

  it('rifiuta un periodo rovesciato', () => {
    expect(periodoSchema.safeParse({ da: 1600, a: 1500 }).success).toBe(false);
    expect(periodoSchema.safeParse({ da: -800, a: -900 }).success).toBe(false);
  });

  it('accetta anni negativi (a.C.) ordinati', () => {
    expect(periodoSchema.safeParse({ da: -600, a: -500 }).success).toBe(true);
  });
});

describe('schema degli archi (§3.3)', () => {
  it('rifiuta un arco attribuzione_infondata senza nota', () => {
    expect(arcoSchema.safeParse({ verso: 'massoneria', tipo: 'attribuzione_infondata' }).success).toBe(false);
    expect(
      arcoSchema.safeParse({ verso: 'massoneria', tipo: 'attribuzione_infondata', nota: 'breve' }).success
    ).toBe(false);
  });

  it('accetta attribuzione_infondata con nota esplicativa', () => {
    expect(
      arcoSchema.safeParse({
        verso: 'massoneria',
        tipo: 'attribuzione_infondata',
        nota: 'La filiazione templare è una costruzione settecentesca degli alti gradi.',
      }).success
    ).toBe(true);
  });

  it('rifiuta archi contiene dichiarati a mano (sono derivati)', () => {
    expect(arcoSchema.safeParse({ verso: 'ficino', tipo: 'contiene' }).success).toBe(false);
  });

  it('rifiuta tipi di arco sconosciuti', () => {
    expect(arcoSchema.safeParse({ verso: 'ficino', tipo: 'ispira' }).success).toBe(false);
  });
});
