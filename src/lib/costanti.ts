/**
 * Costanti dei tipi di nodo e arco (§3 del BRIEF), senza dipendenze:
 * importabili dal client senza trascinare Zod. Gli schemi di validazione
 * vivono in schema.ts (lato build) e riesportano da qui.
 */

export const TIPI_NODO = [
  'parte',
  'corrente',
  'concetto',
  'pratica',
  'simbolo',
  'persona',
  'opera',
  'evento',
  'luogo',
] as const;

export type TipoNodo = (typeof TIPI_NODO)[number];

export const TIPI_ARCO = [
  'influenza',
  'deriva_da',
  'si_oppone_a',
  'usa_simbolo',
  'pratica',
  'elabora',
  'rilegge',
  'contiene',
  'contemporaneo_di',
  'attribuzione_infondata',
] as const;

export type TipoArco = (typeof TIPI_ARCO)[number];

export const ETICHETTE_TIPO_NODO: Record<TipoNodo, string> = {
  parte: 'Parte',
  corrente: 'Corrente',
  concetto: 'Concetto',
  pratica: 'Pratica',
  simbolo: 'Simbolo',
  persona: 'Persona',
  opera: 'Opera',
  evento: 'Evento',
  luogo: 'Luogo',
};

export const ETICHETTE_TIPO_ARCO: Record<TipoArco, string> = {
  influenza: 'influenza',
  deriva_da: 'deriva da',
  si_oppone_a: 'si oppone a',
  usa_simbolo: 'usa il simbolo',
  pratica: 'pratica',
  elabora: 'elabora',
  rilegge: 'rilegge',
  contiene: 'contiene',
  contemporaneo_di: 'contemporaneo di',
  attribuzione_infondata: 'attribuzione infondata',
};
