import { type DefVoce } from './tipi';

/** Il linguaggio simbolico (Parte V): i simboli come nodi, le correnti che li usano come archi usa_simbolo. */
export const SIMBOLI: DefVoce[] = [
  {
    id: 'albero',
    titolo: 'Albero',
    tipo: 'simbolo',
    parte: 5,
    peso: 4,
    alias: ['albero cosmico', 'Yggdrasill', 'albero della vita'],
    sommario:
      'Il simbolo più diffuso: unisce tre livelli con un corpo vivo, immobile e in crescita. Asse del mondo, coppia della Genesi, albero rovesciato della cabala, arbor philosophica: la costante non è un significato ma una funzione.',
    archi: [
      ['albero-sefirotico', 'elabora', 'La sua declinazione cabalistica, a radici in alto'],
    ],
  },
  {
    id: 'albero-sefirotico',
    titolo: 'Albero sefirotico',
    tipo: 'simbolo',
    parte: 5,
    peso: 5,
    alias: ['sefirot', 'albero della vita cabalistico', 'etz chaim'],
    sommario:
      'Dieci sefirot in tre colonne, ventidue sentieri: insieme teoria dell’emanazione, mappa dell’anima e schema di corrispondenze. Probabilmente la struttura simbolica più utilizzata dell’intero esoterismo occidentale.',
    archi: [
      ['emanazione', 'elabora', 'Il diagramma dell’effusione divina per gradi'],
      ['albero', 'deriva_da', 'Declinazione rovesciata del simbolo arboreo: radici nell’Infinito'],
    ],
    fonti: ['Scholem, La Cabala'],
  },
  {
    id: 'casa-e-tempio',
    titolo: 'Casa, tempio, edificio',
    tipo: 'simbolo',
    parte: 5,
    peso: 3,
    alias: ['tempio interiore', 'pietra grezza', 'cantiere'],
    sommario:
      'Il simbolo di ciò che è costruito, cioè della persona come opera: il tempio come cosmo, il tempio interiore, la casa come psiche, la pietra da sgrossare, la rovina da ricostruire.',
  },
  {
    id: 'acqua',
    titolo: 'Acqua',
    tipo: 'simbolo',
    parte: 5,
    peso: 3,
    alias: ['acque primordiali', 'aqua permanens'],
    sommario:
      'Ambivalente per natura: origine indifferenziata, dissoluzione, purificazione, specchio, acqua viva. Purificarsi e dissolversi sono la stessa operazione vista da due punti di vista.',
  },
  {
    id: 'fuoco',
    titolo: 'Fuoco',
    tipo: 'simbolo',
    parte: 5,
    peso: 3,
    alias: ['fuoco segreto', 'fuoco lento'],
    sommario:
      'Distrugge e purifica con lo stesso gesto. Nell’alchimia è il fattore attivo per eccellenza, e la sua gradazione — il fuoco lento, il fuoco che non brucia — è la vera abilità dell’operatore. Nelle iniziazioni, la prova finale.',
  },
  {
    id: 'luce-e-tenebra',
    titolo: 'Luce e tenebra',
    tipo: 'simbolo',
    parte: 5,
    peso: 3,
    alias: ['caligine luminosa', 'illuminazione'],
    sommario:
      'La luce come modello stesso dell’emanazione, non solo metafora del conoscere. E la tenebra in due sensi opposti: privazione, oppure eccesso di luce — la caligine della teologia negativa, dove il buio è insufficienza dell’occhio.',
  },
  {
    id: 'serpente',
    titolo: 'Serpente',
    tipo: 'simbolo',
    parte: 5,
    peso: 5,
    alias: ['ofiti', 'kundalini', 'caduceo'],
    sommario:
      'Il simbolo più densamente contraddittorio del repertorio: sapienza e inganno, guarigione e veleno, rigenerazione, energia ascendente, profondità ctonia. La tensione fra i sensi è il punto, e la ragione della sua fortuna.',
    archi: [
      ['ouroboros', 'elabora', 'Il serpente chiuso in cerchio: caso speciale con logica propria'],
    ],
  },
  {
    id: 'ouroboros',
    titolo: 'Ouroboros',
    tipo: 'simbolo',
    parte: 5,
    peso: 3,
    alias: ['uroboro', 'serpente che si morde la coda'],
    sommario:
      'Il serpente che si morde la coda, con il motto «uno il tutto»: ciclo chiuso, autosufficienza, tempo che ritorna, materia che si consuma e si rigenera. Fra le più antiche immagini alchemiche documentate.',
  },
  {
    id: 'labirinto',
    titolo: 'Labirinto',
    tipo: 'simbolo',
    parte: 5,
    peso: 3,
    alias: ['labirinto di Chartres', 'Minotauro'],
    sommario:
      'Due tipi da non confondere: l’unicursale (un solo percorso: tema della pazienza) e il multicursale (bivi e vicoli ciechi: tema della scelta). Al centro del mito cretese non c’è un tesoro ma un mostro consanguineo.',
  },
  {
    id: 'morte-e-rinascita',
    titolo: 'Morte e rinascita',
    tipo: 'simbolo',
    parte: 5,
    peso: 4,
    alias: ['discesa agli inferi', 'seconda nascita'],
    sommario:
      'Lo schema che sostiene la ritualità iniziatica e gran parte della letteratura simbolica: il seme che marcisce, le divinità che tornano, la discesa agli inferi. La morte non è la fine ma il prezzo di ammissione, e chi torna torna sempre incompleto.',
  },
  {
    id: 'coniunctio',
    titolo: 'Coniunctio e androgino',
    tipo: 'simbolo',
    parte: 5,
    peso: 3,
    alias: ['nozze chimiche', 'Rebis', 'androgino'],
    sommario:
      'L’unione dei contrari — Sole e Luna, re e regina — figurata come androgino o Rebis: non figura sessuale ma ontologica, totalità anteriore alla divisione. E mai la fine: alla congiunzione segue sempre una nuova morte.',
    archi: [
      ['sole-e-luna', 'elabora', 'La coppia luminosa come suoi termini canonici'],
    ],
  },
  {
    id: 'specchio',
    titolo: 'Specchio',
    tipo: 'simbolo',
    parte: 5,
    peso: 2,
    sommario:
      'Duplica senza aggiungere: strumento di conoscenza (vedersi) e di inganno (scambiare l’immagine per la cosa). Il mondo sensibile come specchio dell’intelligibile; la trappola di Narciso; il supporto della visione divinatoria.',
  },
  {
    id: 'uovo',
    titolo: 'Uovo',
    tipo: 'simbolo',
    parte: 5,
    peso: 2,
    alias: ['uovo cosmico', 'uovo filosofico'],
    sommario:
      'Contiene tutto in forma non dispiegata: uovo cosmico delle cosmogonie, uovo filosofico degli alchimisti — il vaso sigillato. Il guscio è l’immagine della chiusura necessaria: nulla si trasforma se non in ambiente separato.',
  },
  {
    id: 'montagna',
    titolo: 'Montagna',
    tipo: 'simbolo',
    parte: 5,
    peso: 2,
    alias: ['Sinai', 'montagna dei filosofi'],
    sommario:
      'Il luogo alto e difficile della rivelazione: Sinai, Olimpo, la montagna dei filosofi. Implica ascesa, fatica, distacco; la sua cima è puntiforme — non ospita una folla.',
  },
  {
    id: 'deserto',
    titolo: 'Deserto',
    tipo: 'simbolo',
    parte: 5,
    peso: 2,
    sommario:
      'Il luogo della privazione e della prova, dove si va per essere spogliati. Non è vuoto ma tentazione: nella tradizione monastica è affollato di demoni proprio perché nulla distrae da se stessi.',
  },
  {
    id: 'ponte-e-scala',
    titolo: 'Ponte e scala',
    tipo: 'simbolo',
    parte: 5,
    peso: 2,
    alias: ['scala di Giacobbe', 'scala planetaria'],
    sommario:
      'Gli strumenti del passaggio fra livelli: il ponte stretto, con un sotto pericoloso, da attraversare in un solo verso; la scala graduata — di Giacobbe, mitraica, iniziatica — percorribile in entrambi i sensi.',
  },
  {
    id: 'sole-e-luna',
    titolo: 'Sole e Luna',
    tipo: 'simbolo',
    parte: 5,
    peso: 3,
    alias: ['oro e argento', 'zolfo e mercurio'],
    sommario:
      'La coppia luminosa fondamentale: fisso e mobile, costante e ciclico, diretto e riflesso, oro e argento. La loro congiunzione — l’eclissi delle incisioni alchemiche — è l’immagine standard dell’unione dei contrari.',
  },
  {
    id: 'rosa-e-croce',
    titolo: 'Rosa e croce',
    tipo: 'simbolo',
    parte: 5,
    peso: 3,
    sommario:
      'La rosa al centro della croce unisce la quaternità dello spazio manifestato e lo sviluppo organico centrato: l’emblema di una spiritualità che non nega il mondo ma lo fa fiorire nel punto di massima tensione.',
  },
  {
    id: 'uccelli-alchemici',
    titolo: 'Gli uccelli alchemici',
    tipo: 'simbolo',
    parte: 5,
    peso: 2,
    alias: ['corvo', 'cigno', 'fenice', 'pellicano'],
    sommario:
      'Il corvo del nigredo, il cigno o la colomba dell’albedo, la fenice della rubedo: la successione degli uccelli è uno dei modi con cui i testi indicano il progresso dell’opera senza nominare le sostanze.',
  },
  {
    id: 'numeri-e-geometria',
    titolo: 'Numeri e geometria',
    tipo: 'simbolo',
    parte: 5,
    peso: 3,
    alias: ['numerologia', 'tetraktys', 'quadratura del circolo'],
    sommario:
      'La numerologia esoterica non è aritmetica ma qualitativa: ogni numero è un principio. Uno origine, due polarità, tre risoluzione, quattro stabilità, sette gradualità, dieci totalità; cerchio, quadrato, spirale, punto.',
  },
  {
    id: 'pietra-filosofale',
    titolo: 'Pietra filosofale',
    tipo: 'simbolo',
    parte: 5,
    peso: 3,
    alias: ['lapis philosophorum', 'lapis'],
    sommario:
      'Il compimento dell’opera: agente di trasmutazione, medicina universale, e nei registri interiori figura del soggetto rigenerato. Jung vi leggerà il simbolo del Sé — una rilettura, non una decifrazione.',
  },
];
