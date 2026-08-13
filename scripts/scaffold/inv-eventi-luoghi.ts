import { OGGI, type DefVoce } from './tipi';

/** Eventi datati (dalla cronologia sinottica) e luoghi. */
export const EVENTI: DefVoce[] = [
  {
    id: 'chiusura-di-eleusi',
    titolo: '392 · Chiusura di Eleusi',
    tipo: 'evento',
    parte: 2,
    peso: 2,
    periodo: [392, 392],
    luoghi: ['atene'],
    sommario:
      'I decreti teodosiani chiudono il santuario dopo circa un millennio di attività: finisce il più longevo culto misterico del Mediterraneo, e con lui il modello antico dell’iniziazione di massa.',
    archi: [['misteri-eleusini', 'elabora', 'La fine ordinata del culto']],
  },
  {
    id: 'interdizione-della-scuola-di-atene',
    titolo: '529 · Interdizione della scuola di Atene',
    tipo: 'evento',
    parte: 2,
    peso: 2,
    periodo: [529, 529],
    luoghi: ['atene'],
    sommario:
      'Giustiniano interdice l’insegnamento filosofico pagano: la scuola neoplatonica si disperde, i testi passano nel mondo siriaco e arabo, e torneranno in Occidente secoli dopo sotto altri nomi.',
    archi: [
      ['neoplatonismo', 'elabora', 'La fine istituzionale della scuola'],
      ['magia-medievale', 'influenza', 'La via araba del ritorno dei testi'],
    ],
  },
  {
    id: 'processo-dei-templari',
    titolo: '1307–1314 · Processo dei templari',
    tipo: 'evento',
    parte: 2,
    peso: 3,
    periodo: [1307, 1314],
    luoghi: ['parigi'],
    sommario:
      'Filippo il Bello fa arrestare i templari; confessioni estorte, ordine sciolto, Gran Maestro al rogo. Nessun tesoro segreto documentato: ma da questo trauma la posterità fabbricherà la più produttiva delle leggende.',
    archi: [
      ['templari', 'elabora', 'La fine dell’ordine storico'],
      ['leggenda-templare', 'influenza', 'La materia prima del mito posteriore'],
    ],
    fonti: ['Partner, The Murdered Magicians'],
  },
  {
    id: 'traduzione-del-corpus-hermeticum',
    titolo: '1463 · Ficino traduce il Corpus Hermeticum',
    tipo: 'evento',
    parte: 2,
    peso: 4,
    periodo: [1463, 1463],
    luoghi: ['firenze'],
    sommario:
      'Cosimo de’ Medici ordina a Ficino di interrompere Platone per dare la precedenza a Ermete: la traduzione, stampata nel 1471, inaugura la fortuna rinascimentale dell’ermetismo — sopra un errore di datazione.',
    archi: [
      ['corpus-hermeticum', 'elabora', 'L’ingresso del testo nella cultura latina'],
      ['prisca-theologia', 'influenza', 'L’errore di datazione fonda la catena dei sapienti'],
      ['magia-rinascimentale', 'influenza'],
    ],
    fonti: ['Yates, Giordano Bruno e la tradizione ermetica'],
  },
  {
    id: 'rogo-di-giordano-bruno',
    titolo: '1600 · Rogo di Giordano Bruno',
    tipo: 'evento',
    parte: 2,
    peso: 3,
    periodo: [1600, 1600],
    luoghi: ['roma'],
    sommario:
      'Bruno è arso in Campo de’ Fiori dopo otto anni di processo: la data-simbolo del conflitto fra speculazione ermetica e istituzione, e l’inizio della sua trasformazione in figura-martire.',
    archi: [['giordano-bruno', 'elabora', 'La fine del processo romano']],
  },
  {
    id: 'datazione-di-casaubon',
    titolo: '1614 · La datazione di Casaubon',
    tipo: 'evento',
    parte: 2,
    peso: 5,
    periodo: [1614, 1614],
    luoghi: ['londra'],
    alias: ['Casaubon 1614', 'Isaac Casaubon'],
    sommario:
      'Isaac Casaubon dimostra con argomenti filologici che il Corpus Hermeticum è un testo greco di età imperiale, non una rivelazione egizia primordiale: crolla l’edificio della prisca theologia.',
    archi: [
      ['corpus-hermeticum', 'elabora', 'Ne stabilisce la datazione reale'],
      ['prisca-theologia', 'si_oppone_a', 'La demolizione filologica della catena dei prisci theologi'],
      ['ermetismo', 'influenza', 'Ne determina l’uscita dalla cultura dotta'],
    ],
    fonti: ['Grafton, Defenders of the Text', 'Hanegraaff, Esotericism and the Academy'],
  },
  {
    id: 'fondazione-della-gran-loggia',
    titolo: '1717 · Fondazione della Gran Loggia',
    tipo: 'evento',
    parte: 2,
    peso: 3,
    periodo: [1717, 1717],
    luoghi: ['londra'],
    sommario:
      'Quattro logge londinesi si uniscono nella prima Gran Loggia; nel 1723 le Constitutions di Anderson daranno all’istituzione la sua forma: nasce la massoneria moderna — che si costruirà a posteriori un’origine antica.',
    archi: [['massoneria', 'elabora', 'L’atto di nascita documentato']],
  },
  {
    id: 'commissione-sul-mesmerismo',
    titolo: '1784 · La commissione reale sul magnetismo animale',
    tipo: 'evento',
    parte: 2,
    peso: 2,
    periodo: [1784, 1784],
    luoghi: ['parigi'],
    sommario:
      'La commissione con Lavoisier e Franklin stabilisce che gli effetti mesmerici sono reali ma dovuti all’immaginazione del paziente: senza saperlo, individua la suggestione. Un modello di controllo sperimentale ante litteram.',
    archi: [
      ['mesmerismo', 'elabora', 'Il verdetto che non fermò la pratica'],
      ['esoterismo-e-scienza', 'elabora', 'Il caso pilota della verifica di una pretesa'],
    ],
  },
  {
    id: 'fatti-di-hydesville',
    titolo: '1848 · I fatti di Hydesville',
    tipo: 'evento',
    parte: 2,
    peso: 3,
    periodo: [1848, 1848],
    luoghi: ['new-york'],
    sommario:
      'Le sorelle Fox riferiscono di comunicare con uno spirito tramite colpi codificati: in pochi anni lo spiritismo dilaga in America e in Europa. Margaret Fox confesserà poi il trucco, ritrattando in seguito la confessione.',
    archi: [['spiritismo', 'elabora', 'Il racconto di fondazione del movimento']],
  },
  {
    id: 'fondazione-della-societa-teosofica',
    titolo: '1875 · Fondazione della Società Teosofica',
    tipo: 'evento',
    parte: 2,
    peso: 3,
    periodo: [1875, 1875],
    luoghi: ['new-york'],
    sommario:
      'Blavatsky e Olcott fondano a New York la Società Teosofica: il primo movimento a portare massicciamente concetti indiani in Occidente e il modello organizzativo che tutte le correnti successive copieranno.',
    archi: [['teosofia', 'elabora']],
  },
  {
    id: 'fondazione-della-golden-dawn',
    titolo: '1888 · Fondazione della Golden Dawn',
    tipo: 'evento',
    parte: 2,
    peso: 3,
    periodo: [1888, 1888],
    luoghi: ['londra'],
    sommario:
      'Westcott, Mathers e Woodman fondano a Londra l’Hermetic Order of the Golden Dawn su documenti cifrati di dubbia origine: l’ordine durerà pochi anni, il suo sistema durerà un secolo.',
    archi: [['golden-dawn', 'elabora']],
  },
  {
    id: 'convegni-di-eranos',
    titolo: '1933 · I convegni di Eranos',
    tipo: 'evento',
    parte: 2,
    peso: 3,
    periodo: [1933, OGGI],
    luoghi: ['ascona'],
    sommario:
      'Olga Fröbe-Kapteyn inaugura ad Ascona gli incontri annuali dove Jung, Scholem, Corbin, Eliade e Kerényi si danno convegno: il luogo dove l’esoterismo passa da curiosità a oggetto di studio.',
    archi: [
      ['studio-accademico', 'influenza', 'L’anticamera religionista della disciplina'],
      ['religionismo', 'elabora'],
      ['donne-ed-esoterismo', 'elabora', 'Un’istituzione accademica creata e diretta da una donna'],
    ],
  },
  {
    id: 'scoperta-di-nag-hammadi',
    titolo: '1945 · La scoperta di Nag Hammadi',
    tipo: 'evento',
    parte: 2,
    peso: 4,
    periodo: [1945, 1945],
    sommario:
      'In Alto Egitto riemergono tredici codici copti con oltre cinquanta testi: per la prima volta gli gnostici parlano con la propria voce, dopo sedici secoli di conoscenza filtrata dai confutatori.',
    archi: [['gnosticismo', 'elabora', 'La restituzione della voce diretta']],
    fonti: ['Filoramo, L’attesa della fine'],
  },
  {
    id: 'studio-di-carlson',
    titolo: '1985 · Il test di Carlson su Nature',
    tipo: 'evento',
    parte: 4,
    peso: 2,
    periodo: [1985, 1985],
    sommario:
      'Il più noto studio controllato sulle pretese predittive dell’astrologia, in doppio cieco con astrologi consenzienti: i risultati non superano il caso. Un punto fermo sperimentale, da distinguere dal valore simbolico del sistema.',
    archi: [['astrologia', 'elabora', 'Il controllo sperimentale delle pretese verificabili']],
  },
];

export const LUOGHI: DefVoce[] = [
  {
    id: 'alessandria',
    titolo: 'Alessandria d’Egitto',
    tipo: 'luogo',
    parte: 2,
    peso: 5,
    periodo: [-300, 640],
    alias: ['Alessandria'],
    sommario:
      'Il crogiolo tardoantico: qui, fra I e IV secolo, si formano ermetismo, gnosticismo e alchimia greco-egizia, nell’incontro fra grecità, Egitto, ebraismo e cristianesimo nascente.',
    fonti: ['Fowden, The Egyptian Hermes'],
  },
  {
    id: 'antico-egitto',
    titolo: 'Antico Egitto (reale e immaginato)',
    tipo: 'luogo',
    parte: 2,
    peso: 3,
    alias: ['Egitto', 'egittosofia'],
    sommario:
      'Due Egitti da distinguere: quello storico di Thoth e dei templi, e quello immaginato — deposito di ogni sapienza originaria — a cui le genealogie leggendarie attribuiscono tarocchi, massoneria ed ermetismo.',
    archi: [
      ['tarocchi', 'attribuzione_infondata', 'L’origine egizia dei tarocchi, proposta da Court de Gébelin nel 1781 e ripresa da Lévi, è smentita: il mazzo nasce come gioco di carte nell’Italia del Quattrocento.'],
      ['massoneria', 'attribuzione_infondata', 'L’origine egizia della massoneria è una costruzione degli alti gradi e dei riti «egizi» settecenteschi (Cagliostro): l’istituzione nasce a Londra nel 1717.'],
      ['templari', 'attribuzione_infondata', 'La custodia templare di una sapienza egizia è un anello inventato della catena Egitto→Templari→Rosacroce→Massoneria: nessuna fonte medievale la attesta.'],
      ['ermetismo', 'influenza', 'L’ambiente egizio reale — Thoth, il sacerdozio dei templi tardi — dentro il sincretismo ermetico'],
    ],
    fonti: ['Hornung, L’Egitto esoterico'],
  },
  {
    id: 'atene',
    titolo: 'Atene',
    tipo: 'luogo',
    parte: 2,
    peso: 3,
    periodo: [-600, 529],
    sommario:
      'La processione verso Eleusi parte da qui; qui insegna Platone, e qui la scuola neoplatonica vive fino all’interdizione del 529: il luogo dove filosofia e mistero convivono per un millennio.',
  },
  {
    id: 'roma',
    titolo: 'Roma',
    tipo: 'luogo',
    parte: 2,
    peso: 3,
    periodo: [-100, 1600],
    sommario:
      'I misteri orientali nell’Urbe, Plotino che vi insegna, Valentino che sfiora l’episcopato; e poi la Roma dei processi: le novecento tesi proibite di Pico, il rogo di Bruno in Campo de’ Fiori.',
  },
  {
    id: 'provenza-e-catalogna',
    titolo: 'Provenza e Catalogna',
    tipo: 'luogo',
    parte: 2,
    peso: 2,
    periodo: [1150, 1300],
    alias: ['Provenza', 'Gerona'],
    sommario:
      'La culla della cabala: il Bahir appare in Provenza attorno al 1170, il gruppo di Gerona sistematizza la dottrina delle sefirot. Da qui la mistica ebraica speculativa si irradia verso la Castiglia dello Zohar.',
  },
  {
    id: 'safed',
    titolo: 'Safed',
    tipo: 'luogo',
    parte: 2,
    peso: 3,
    periodo: [1530, 1600],
    alias: ['Tzfat'],
    sommario:
      'La cittadina della Galilea dove, dopo l’espulsione dalla Spagna, si concentra la cabala cinquecentesca: qui Luria insegna tzimtzum, rottura dei vasi e tikkun a una cerchia che ne trasmetterà l’insegnamento orale.',
  },
  {
    id: 'firenze',
    titolo: 'Firenze',
    tipo: 'luogo',
    parte: 2,
    peso: 4,
    periodo: [1439, 1600],
    alias: ['Florentia'],
    sommario:
      'La città della riscoperta: qui Ficino traduce il Corpus Hermeticum per Cosimo de’ Medici, Pico congiunge cabala e magia, e il platonismo torna a essere una filosofia operativa.',
    fonti: ['Yates, Giordano Bruno e la tradizione ermetica'],
  },
  {
    id: 'londra',
    titolo: 'Londra',
    tipo: 'luogo',
    parte: 2,
    peso: 4,
    periodo: [1580, OGGI],
    sommario:
      'Dee a Mortlake, la Gran Loggia del 1717, la Society for Psychical Research, la Golden Dawn del 1888, la Wicca: la capitale della modernità esoterica organizzata.',
  },
  {
    id: 'parigi',
    titolo: 'Parigi',
    tipo: 'luogo',
    parte: 2,
    peso: 3,
    periodo: [1250, 1950],
    sommario:
      'La condanna del 1277, Mesmer e la commissione reale, Lévi e l’occultismo, Papus e il martinismo fin-de-siècle: il laboratorio francese del campo, fra università, salotti e librerie.',
  },
  {
    id: 'new-york',
    titolo: 'New York',
    tipo: 'luogo',
    parte: 2,
    peso: 2,
    periodo: [1848, 1900],
    alias: ['Hydesville'],
    sommario:
      'Lo stato dei fatti di Hydesville e la città dove nel 1875 nasce la Società Teosofica: il laboratorio americano della religiosità alternativa ottocentesca.',
  },
  {
    id: 'il-cairo',
    titolo: 'Il Cairo',
    tipo: 'luogo',
    parte: 2,
    peso: 2,
    periodo: [1904, 1951],
    sommario:
      'Qui Crowley riceve — secondo il suo racconto — il Liber AL nel 1904; qui Guénon vive dal 1930 come musulmano in ambiente sufi, fino alla morte: la città-cerniera fra esoterismo occidentale e Islam.',
  },
  {
    id: 'ascona',
    titolo: 'Ascona',
    tipo: 'luogo',
    parte: 2,
    peso: 2,
    periodo: [1900, 1988],
    alias: ['Monte Verità', 'Eranos'],
    sommario:
      'Dal Monte Verità dei riformatori di vita ai convegni di Eranos: il villaggio sul Lago Maggiore dove l’esoterismo novecentesco incontra la psicologia del profondo e diventa oggetto di studio.',
  },
];
