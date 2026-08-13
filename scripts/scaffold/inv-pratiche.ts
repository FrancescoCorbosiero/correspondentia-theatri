import { type DefVoce } from './tipi';

/** Pratiche e vie (Parte IV), più la pseudoepigrafia come tecnica testuale (Parte I). */
export const PRATICHE: DefVoce[] = [
  {
    id: 'pseudoepigrafia',
    titolo: 'Pseudoepigrafia',
    tipo: 'pratica',
    parte: 1,
    peso: 3,
    alias: ['pseudoepigrafo', 'falsa attribuzione'],
    sommario:
      'Attribuire le proprie idee a un autore antico e prestigioso — Ermete, Salomone, Shimon bar Yochai — per collocarle in un tempo originario: non un incidente ma una tecnica del campo, da conoscere per leggere le fonti.',
    fonti: ['Hanegraaff, Esotericism and the Academy'],
  },
  {
    id: 'iniziazione',
    titolo: 'Iniziazione',
    tipo: 'pratica',
    parte: 4,
    peso: 5,
    alias: ['riti di passaggio', 'morte simbolica'],
    sommario:
      'Lo schema tripartito di van Gennep — separazione, margine, aggregazione — caricato di un contenuto specifico: la fine dell’uomo vecchio. Eliade: l’iniziazione ripete la cosmogonia, il candidato rifà su di sé ciò che il mondo ha fatto all’origine.',
    archi: [
      ['morte-e-rinascita', 'usa_simbolo', 'La morte simbolica come prezzo del passaggio'],
      ['sistema-dei-gradi', 'elabora', 'La soglia moltiplicata in scala'],
    ],
    fonti: ['van Gennep, I riti di passaggio', 'Turner, Il processo rituale'],
  },
  {
    id: 'sistema-dei-gradi',
    titolo: 'Sistema dei gradi',
    tipo: 'pratica',
    parte: 4,
    peso: 3,
    alias: ['gradi iniziatici', 'gerarchia iniziatica'],
    sommario:
      'Tre funzioni simultanee: pedagogica, protettiva, sociale. Tre gradi nella massoneria simbolica, sette nel mitraismo, dieci nella Golden Dawn, trentatré nel Rito Scozzese: la logica è costante, i numeri variano.',
    archi: [
      ['ponte-e-scala', 'usa_simbolo', 'La scala graduata come immagine della progressione'],
    ],
  },
  {
    id: 'catena-iniziatica',
    titolo: 'Catena iniziatica e trasmissione',
    tipo: 'pratica',
    parte: 4,
    peso: 3,
    alias: ['silsila', 'regolarità', 'autoiniziazione'],
    sommario:
      'La linea che collega il praticante alla fonte: garanzia di autenticità e veicolo di un’influenza ritenuta irriducibile all’informazione. Contro di essa, l’autoiniziazione — oggi maggioritaria di fatto, novità del Novecento.',
    fonti: ['Sedgwick, Against the Modern World'],
  },
  {
    id: 'opera-alchemica',
    titolo: 'L’opera alchemica',
    tipo: 'pratica',
    parte: 4,
    peso: 5,
    alias: ['magnum opus', 'nigredo', 'albedo', 'rubedo', 'solve et coagula'],
    sommario:
      'La successione di operazioni sulla materia prima in vaso chiuso, scandita dai colori: nigredo, albedo, citrinitas, rubedo. Il metodo in una formula: solve et coagula. Presentata come struttura simbolica e storia della chimica, mai come procedimento.',
    archi: [
      ['uccelli-alchemici', 'usa_simbolo', 'Corvo, cigno, fenice: i colori in forma d’uccello'],
      ['coniunctio', 'usa_simbolo', 'Lo schema nuziale accanto alla scala dei colori'],
      ['uovo', 'usa_simbolo', 'Il vaso sigillato: nulla si trasforma se non in ambiente separato'],
      ['pietra-filosofale', 'usa_simbolo', 'Il compimento dell’opera al rosso'],
      ['acqua', 'usa_simbolo', 'Solve: la dissoluzione è un’operazione acquea'],
      ['fuoco', 'usa_simbolo', 'La gradazione del fuoco come vera abilità dell’operatore'],
    ],
    fonti: ['Principe, The Secrets of Alchemy'],
  },
  {
    id: 'magia-naturale',
    titolo: 'Magia naturale',
    tipo: 'pratica',
    parte: 4,
    peso: 3,
    alias: ['magia naturalis'],
    sommario:
      'L’operare sulle proprietà occulte delle sostanze — erbe, pietre, suoni, profumi — senza implicare intelligenze estranee: nel Rinascimento la meno sospetta delle magie, già a metà strada verso la scienza sperimentale.',
    archi: [
      ['corrispondenze', 'elabora', 'Applicare le simpatie del cosmo come fa l’agricoltore'],
    ],
    fonti: ['Walker, Spiritual and Demonic Magic'],
  },
  {
    id: 'magia-cerimoniale',
    titolo: 'Magia cerimoniale',
    tipo: 'pratica',
    parte: 4,
    peso: 4,
    alias: ['magia rituale', 'evocazione'],
    sommario:
      'Il genere dei grimori: riti complessi con nomi divini, cerchi, sigilli, tempi astrologici, strumenti consacrati. Il presupposto: l’operatore agisce con l’autorità di nomi superiori a quelli delle entità evocate.',
    archi: [
      ['struttura-del-rituale', 'elabora', 'I sette momenti ricorrenti, dal bagno preparatorio alla licenza'],
      ['talismani', 'elabora'],
    ],
  },
  {
    id: 'teurgia',
    titolo: 'Teurgia',
    tipo: 'pratica',
    parte: 4,
    peso: 4,
    sommario:
      'Il rito il cui scopo non è ottenere effetti ma purificare e innalzare l’anima, e in cui l’iniziativa è attribuita al divino: da Giamblico in poi, la distinzione fra teurgia e magia coincide con quella fra ascesa e utilità.',
    archi: [
      ['emanazione', 'elabora', 'La risalita rituale lungo la scala della processione'],
    ],
    fonti: ['Giamblico, De mysteriis'],
  },
  {
    id: 'struttura-del-rituale',
    titolo: 'Anatomia di un rituale',
    tipo: 'pratica',
    parte: 4,
    peso: 3,
    alias: ['cerchio magico', 'diario magico'],
    sommario:
      'I sette momenti ricorrenti del rituale occidentale: preparazione, delimitazione dello spazio, scelta del tempo, apertura, operazione, chiusura, registrazione. L’ultimo è il più trascurato e il più significativo: dove c’è registro c’è autocorrezione.',
    archi: [
      ['casa-e-tempio', 'usa_simbolo', 'Il templum: lo spazio ritagliato'],
      ['tempo-ciclico', 'elabora', 'Giorno e ora planetaria, fase lunare'],
    ],
  },
  {
    id: 'astrologia',
    titolo: 'Astrologia',
    tipo: 'pratica',
    parte: 4,
    peso: 5,
    alias: ['oroscopo', 'carta natale', 'astrologia giudiziaria'],
    sommario:
      'Sistema simbolico completo e internamente coerente: segni, case, pianeti, aspetti. Per due millenni disciplina universitaria; sulle pretese predittive, gli studi controllati del Novecento non hanno prodotto conferme. Le due cose vanno dette insieme.',
    archi: [
      ['macrocosmo-microcosmo', 'elabora', 'Il cielo alla nascita come mappa della persona'],
      ['tempo-ciclico', 'elabora', 'Transiti, rivoluzioni, elezioni'],
      ['studio-di-carlson', 'elabora', 'Il test in doppio cieco pubblicato su Nature nel 1985'],
    ],
    fonti: ['Garin, Lo zodiaco della vita'],
  },
  {
    id: 'divinazione',
    titolo: 'Divinazione',
    tipo: 'pratica',
    parte: 4,
    peso: 4,
    alias: ['mantica', 'oracoli'],
    sommario:
      'Le tecniche per ottenere indicazioni tramite segni, giustificate in tre modi: astrale, oracolare, acausale. La ricerca non ne ha stabilito il valore predittivo; le funzioni osservabili — rompere la paralisi, precisare la domanda — spiegano la persistenza. Il rischio speculare è la delega.',
    archi: [
      ['tarocchi', 'elabora'],
      ['i-ching', 'elabora'],
      ['geomanzia', 'elabora'],
    ],
  },
  {
    id: 'tarocchi',
    titolo: 'Tarocchi',
    tipo: 'pratica',
    parte: 4,
    peso: 4,
    alias: ['arcani', 'tarot'],
    sommario:
      'Nascono come gioco di carte nell’Italia del Quattrocento; l’uso divinatorio è documentato dal Settecento, l’interpretazione esoterica — origine egizia, lettere ebraiche — è un’invenzione di Court de Gébelin e Lévi. Efficacissima, e infondata.',
    archi: [
      ['invenzione-di-tradizione', 'elabora', 'L’«antico Egitto» dei tarocchi nasce a Parigi nel 1781'],
      ['albero-sefirotico', 'usa_simbolo', 'La corrispondenza occultistica con i ventidue sentieri'],
    ],
    fonti: ['Decker–Depaulis–Dummett, A Wicked Pack of Cards'],
  },
  {
    id: 'i-ching',
    titolo: 'I Ching',
    tipo: 'pratica',
    parte: 4,
    peso: 2,
    alias: ['Libro dei Mutamenti', 'Yijing'],
    sommario:
      'Il classico cinese dei sessantaquattro esagrammi: non un mazzo di immagini ma un sistema binario di situazioni in trasformazione. La traduzione di Wilhelm, con la prefazione di Jung, ne ha determinato la ricezione occidentale.',
    archi: [
      ['sincronicita', 'elabora', 'Jung lo presenta come caso esemplare di corrispondenza acausale'],
    ],
  },
  {
    id: 'geomanzia',
    titolo: 'Geomanzia',
    tipo: 'pratica',
    parte: 4,
    peso: 2,
    sommario:
      'Sedici figure ottenute da punti tracciati a caso, di origine araba: la divinazione dotta per eccellenza del Medioevo europeo, con un apparato di case e giudizi calcato sull’astrologia. Oggi quasi dimenticata.',
    archi: [
      ['astrologia', 'deriva_da', 'L’apparato interpretativo ricalca case e giudizi astrologici'],
    ],
  },
  {
    id: 'vie-contemplative',
    titolo: 'Vie contemplative',
    tipo: 'pratica',
    parte: 4,
    peso: 3,
    alias: ['meditazione', 'concentrazione', 'visualizzazione'],
    sommario:
      'Il nucleo tecnico comune alle tradizioni: concentrazione su un supporto, visualizzazione strutturata, esame di sé serale. L’ambito in cui esoterismo e mistica si sovrappongono di più, e le tradizioni sono più concrete.',
    fonti: ['Faivre, Accès de l’ésotérisme occidental'],
  },
  {
    id: 'arte-della-memoria',
    titolo: 'Arte della memoria',
    tipo: 'pratica',
    parte: 4,
    peso: 3,
    alias: ['mnemotecnica', 'loci'],
    sommario:
      'Da tecnica retorica — luoghi e immagini in un edificio interiore — a strumento magico: con Bruno le immagini non servono a ricordare ma a ordinare l’anima secondo il cosmo. Una tecnica che passa dal profano al sacro senza cambiare struttura.',
    archi: [
      ['casa-e-tempio', 'usa_simbolo', 'L’edificio interiore come teatro della memoria'],
    ],
    fonti: ['Yates, L’arte della memoria'],
  },
  {
    id: 'corpo-sottile',
    titolo: 'Corpo sottile',
    tipo: 'pratica',
    parte: 4,
    peso: 3,
    alias: ['chakra', 'corpo astrale', 'corpo eterico'],
    sommario:
      'Centri e canali attribuiti all’uomo oltre il corpo fisico: chakra e nadi, campi di cinabro, latifa, corrispondenze sefirotiche. L’immagine corrente dei sette chakra colorati è in larga parte una costruzione teosofica novecentesca.',
    archi: [
      ['rischi-della-pratica', 'elabora', 'Le tecniche respiratorie intensive richiedono le cautele che le tradizioni stesse prescrivevano'],
    ],
  },
  {
    id: 'talismani',
    titolo: 'Talismani',
    tipo: 'pratica',
    parte: 4,
    peso: 3,
    alias: ['magia astrale', 'immagini astrologiche'],
    sommario:
      'Oggetti costruiti e consacrati in momenti astrologicamente scelti per attrarre un influsso determinato: il cuore operativo della magia astrale, dal Picatrix al De vita di Ficino.',
    archi: [
      ['corrispondenze', 'elabora', 'Il fondamento teorico: operare sul corrispondente'],
      ['tempo-ciclico', 'elabora', 'L’elezione del momento'],
    ],
  },
  {
    id: 'rischi-della-pratica',
    titolo: 'Rischi della pratica',
    tipo: 'pratica',
    parte: 4,
    peso: 5,
    alias: ['inflazione', 'bypass spirituale', 'slittamento psichico'],
    sommario:
      'Inflazione, bypass spirituale, isolamento, slittamento psichico: i rischi documentati della pratica intensa senza controllo esterno, e i segnali per riconoscerli. Se compaiono, la cosa da fare non è intensificare né interpretare, ma interrompere e parlarne con un medico.',
    archi: [
      ['dinamiche-settarie', 'elabora', 'Dal rischio individuale a quello di gruppo'],
    ],
  },
  {
    id: 'dinamiche-settarie',
    titolo: 'Dinamiche settarie e discernimento',
    tipo: 'pratica',
    parte: 4,
    peso: 5,
    alias: ['segnali di allarme', 'criterio dei frutti', 'abusi spirituali'],
    sommario:
      'I segnali strutturali che non dipendono dalla dottrina: leader sopra le regole, uscita punita, richieste economiche crescenti, isolamento dai legami. E il criterio classico di verifica di una via: non le esperienze straordinarie, i frutti.',
  },
];
