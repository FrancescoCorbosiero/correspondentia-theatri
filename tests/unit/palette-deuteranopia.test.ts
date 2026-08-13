import { describe, expect, it } from 'vitest';
import { COLORI_BASE, COLORI_PARTE, deltaE, rgbAHex, simulaDeuteranopia } from '../../src/lib/palette';

/**
 * §7 del BRIEF: «sei tinte desaturate distinguibili anche in deuteranopia —
 * verificare con un simulatore, non a occhio». Questo test È il simulatore:
 * proietta i sei colori di parte nello spazio visivo deutan (matrice di
 * Machado et al. 2009, severità 1.0) e impone una distanza percettiva minima
 * fra tutte le coppie, sia in visione tipica sia simulata.
 */
const SOGLIA_TIPICA = 20;
const SOGLIA_DEUTAN = 12;

describe('palette delle sei parti', () => {
  const coppie: Array<[number, number]> = [];
  for (let i = 1; i <= 6; i++) for (let j = i + 1; j <= 6; j++) coppie.push([i, j]);

  it('le sei tinte sono distinguibili in visione tipica', () => {
    for (const [i, j] of coppie) {
      const d = deltaE(COLORI_PARTE[i]!, COLORI_PARTE[j]!);
      expect(d, `ΔE(${i},${j}) = ${d.toFixed(1)} troppo bassa`).toBeGreaterThanOrEqual(SOGLIA_TIPICA);
    }
  });

  it('le sei tinte restano distinguibili in deuteranopia simulata', () => {
    for (const [i, j] of coppie) {
      const a = rgbAHex(simulaDeuteranopia(COLORI_PARTE[i]!));
      const b = rgbAHex(simulaDeuteranopia(COLORI_PARTE[j]!));
      const d = deltaE(a, b);
      expect(d, `deutan ΔE(${i},${j}) = ${d.toFixed(1)} troppo bassa (${a} vs ${b})`).toBeGreaterThanOrEqual(
        SOGLIA_DEUTAN
      );
    }
  });

  it('ogni tinta contrasta con la pergamena di fondo', () => {
    for (let i = 1; i <= 6; i++) {
      const d = deltaE(COLORI_PARTE[i]!, COLORI_BASE.pergamena);
      expect(d, `parte ${i} troppo vicina al fondo`).toBeGreaterThanOrEqual(30);
    }
  });
});
