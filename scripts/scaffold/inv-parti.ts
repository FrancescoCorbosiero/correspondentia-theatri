import { type DefVoce } from './tipi';

/** Le sei macro-aree del volume: nodi radice del grafo (peso 5, atemporali). */
export const PARTI: DefVoce[] = [
  {
    id: 'parte-1-definizione',
    titolo: 'I. Definizione ed epistemologia',
    tipo: 'parte',
    parte: 1,
    peso: 5,
    sommario:
      'Che cosa si sta chiamando «esoterismo», secondo chi e con quali problemi di metodo: le quattro definizioni principali, lo statuto del segreto, gli strumenti e le trappole dello studio.',
    fonti: ['Faivre, Accès de l’ésotérisme occidental', 'Hanegraaff, Esotericism and the Academy'],
  },
  {
    id: 'parte-2-correnti',
    titolo: 'II. Correnti storiche',
    tipo: 'parte',
    parte: 2,
    peso: 5,
    sommario:
      'L’asse cronologico del campo: dai culti misterici antichi al New Age, le correnti dell’esoterismo occidentale come fenomeni distinti legati da filiazioni precise, riscoperte databili e fraintendimenti produttivi.',
    fonti: ['Goodrick-Clarke, The Western Esoteric Traditions', 'Hanegraaff, Esotericism and the Academy'],
  },
  {
    id: 'parte-3-concetti',
    titolo: 'III. Concetti strutturali',
    tipo: 'parte',
    parte: 3,
    peso: 5,
    sommario:
      'Le poche idee ricorrenti che attraversano le correnti e ne costituiscono la grammatica: corrispondenze, macrocosmo e microcosmo, natura vivente, immaginazione, trasmutazione, gnosi, emanazione e ritorno.',
    fonti: ['Faivre, Accès de l’ésotérisme occidental'],
  },
  {
    id: 'parte-4-pratiche',
    titolo: 'IV. Pratiche e vie',
    tipo: 'parte',
    parte: 4,
    peso: 5,
    sommario:
      'Il piano operativo: iniziazione, opera alchemica, magia e teurgia, astrologia, divinazione, vie contemplative — descritte nella loro struttura e logica, mai istruite — con l’etica della pratica e i suoi rischi reali.',
    fonti: ['van Gennep, I riti di passaggio'],
  },
  {
    id: 'parte-5-simboli',
    titolo: 'V. Linguaggio simbolico',
    tipo: 'parte',
    parte: 5,
    peso: 5,
    sommario:
      'Albero, casa, acqua, fuoco, serpente, labirinto, morte e rinascita: i simboli ricorrenti del repertorio esoterico e il metodo per leggerli senza trasformarli in un dizionario di equivalenze fisse.',
  },
  {
    id: 'parte-6-ricezioni',
    titolo: 'VI. Ricezioni moderne',
    tipo: 'parte',
    parte: 6,
    peso: 5,
    sommario:
      'Ciò che la modernità ha fatto dei materiali esoterici: la psicologia del profondo, l’arte, la letteratura, il cinema, la cultura di massa. Riletture potentissime, spesso più note degli originali, ma riletture.',
    fonti: ['Jung, Psicologia e alchimia', 'Partridge, The Re-Enchantment of the West'],
  },
];
