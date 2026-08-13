import { type DefVoce } from './tipi';

/** Concetti: l'impianto teorico (P.I), la grammatica (P.III), le categorie della ricezione (P.VI). */
export const CONCETTI: DefVoce[] = [
  // ——— Parte I — Definizione ed epistemologia ———
  {
    id: 'esoterismo',
    titolo: 'Esoterismo',
    tipo: 'concetto',
    parte: 1,
    peso: 5,
    alias: ['esoterismo occidentale', 'ésotérisme'],
    sommario:
      'Non un’essenza ma una categoria costruita: il sostantivo nasce nel 1828, e nessuno prima del Settecento si definì «esoterista». Le quattro definizioni — Faivre, Hanegraaff, von Stuckrad, religionismo — e la definizione di lavoro del volume.',
    archi: [
      ['esoterico-essoterico', 'deriva_da', 'Il sostantivo ottocentesco deriva dalla coppia aggettivale antica'],
      ['sapere-rifiutato', 'elabora'],
      ['discorso-del-sapere-superiore', 'elabora'],
    ],
    fonti: ['Faivre, Accès de l’ésotérisme occidental', 'Hanegraaff, Esotericism and the Academy', 'von Stuckrad, Western Esotericism'],
  },
  {
    id: 'esoterico-essoterico',
    titolo: 'Esoterico ed essoterico',
    tipo: 'concetto',
    parte: 1,
    peso: 3,
    alias: ['esōterikós', 'exōterikós'],
    sommario:
      'La coppia «interno/esterno» nasce in ambito scolastico — Luciano sugli aristotelici — e riguarda la destinazione dei testi, non la natura delle verità: il segreto originario è pedagogico, ciò che non si può capire da soli.',
    fonti: ['Hanegraaff, Esotericism and the Academy'],
  },
  {
    id: 'sapere-rifiutato',
    titolo: 'Sapere rifiutato',
    tipo: 'concetto',
    parte: 1,
    peso: 4,
    alias: ['rejected knowledge'],
    sommario:
      'La definizione storico-critica di Hanegraaff: l’esoterismo non è un contenuto ma una posizione — ciò che la modernità europea ha espulso costruendo la propria identità, fra Riforma, rivoluzione scientifica e filologia.',
    archi: [
      ['datazione-di-casaubon', 'deriva_da', 'Il 1614 è uno dei tre colpi che producono l’espulsione'],
    ],
    fonti: ['Hanegraaff, Esotericism and the Academy'],
  },
  {
    id: 'discorso-del-sapere-superiore',
    titolo: 'Discorso del sapere superiore',
    tipo: 'concetto',
    parte: 1,
    peso: 2,
    alias: ['definizione discorsiva', 'von Stuckrad'],
    sommario:
      'La proposta di von Stuckrad: l’esoterismo come elemento strutturale del discorso religioso occidentale, riconoscibile ovunque compaia la rivendicazione di un sapere superiore e di una via privilegiata per accedervi.',
    fonti: ['von Stuckrad, Western Esotericism'],
  },
  {
    id: 'statuto-del-segreto',
    titolo: 'Statuto del segreto',
    tipo: 'concetto',
    parte: 1,
    peso: 4,
    alias: ['segreto', 'disciplina arcani'],
    sommario:
      'Cinque tipi da distinguere: pedagogico, di prudenza, rituale, strategico, strutturale. Davanti a un testo oscuro, chiedersi quale sia in gioco: molto spesso l’oscurità si dissolve conoscendo il contesto.',
    archi: [
      ['velo-e-occultamento', 'elabora', 'Il segreto strutturale sfocia nella necessità del simbolo'],
    ],
    fonti: ['Hanegraaff, Esotericism and the Academy'],
  },
  {
    id: 'metodo-di-studio',
    titolo: 'Metodo e trappole dello studio',
    tipo: 'concetto',
    parte: 1,
    peso: 4,
    alias: ['emico ed etico', 'anacronismo retroattivo'],
    sommario:
      'Gli errori più costosi del campo: anacronismo retroattivo, genealogia immaginaria, apologetica e derisione speculari, riduzionismo prematuro, fonti di terza mano. E la distinzione emico/etico come igiene di base.',
    archi: [
      ['invenzione-di-tradizione', 'elabora', 'Riconoscere l’invenzione non delegittima il fenomeno: lo storicizza'],
      ['pseudoepigrafia', 'elabora', 'Attribuzione e datazione reali contro quelle dichiarate'],
    ],
    fonti: ['Hanegraaff, Esotericism and the Academy'],
  },
  {
    id: 'invenzione-di-tradizione',
    titolo: 'Invenzione di tradizione',
    tipo: 'concetto',
    parte: 1,
    peso: 5,
    alias: ['invented tradition', 'genealogie leggendarie'],
    sommario:
      'Il meccanismo che genera catene Egitto → Templari → Rosacroce → Massoneria: non continuità documentate ma riprese, riscoperte e miti fondativi che producono la realtà che rivendicano. Concetto-cardine di questo atlante.',
    archi: [
      ['leggenda-templare', 'rilegge', 'Il caso templare come laboratorio del mito'],
      ['prisca-theologia', 'rilegge', 'Anche la catena dei prisci theologi è una genealogia costruita'],
    ],
    fonti: ['Hobsbawm–Ranger, L’invenzione della tradizione', 'Hanegraaff, Esotericism and the Academy'],
  },
  {
    id: 'studio-accademico',
    titolo: 'Lo studio accademico dell’esoterismo',
    tipo: 'concetto',
    parte: 1,
    peso: 3,
    alias: ['storia dell’esoterismo', 'ESSWE'],
    sommario:
      'Da Eranos alla cattedra di Faivre (1979), dal centro di Amsterdam (1999) all’associazione europea (2005): come il campo è passato da curiosità a oggetto di studio, e il problema del rapporto con il proprio oggetto.',
    archi: [
      ['esoterismo', 'elabora', 'La costruzione disciplinare della categoria'],
      ['religionismo', 'deriva_da', 'Ne eredita materiali e domande, correggendone il metodo'],
    ],
    fonti: ['Hanegraaff, Esotericism and the Academy'],
  },
  {
    id: 'religionismo',
    titolo: 'Religionismo',
    tipo: 'concetto',
    parte: 1,
    peso: 2,
    alias: ['approccio religionista', 'Eranos'],
    sommario:
      'L’approccio di Eliade, Corbin, Scholem e del circolo di Eranos: i fenomeni religiosi compresi sui generis, sul loro piano. Apporto immenso, ma oggi usato come miniera di intuizioni, non come metodo.',
    fonti: ['Hanegraaff, Esotericism and the Academy'],
  },

  // ——— Parte II — categorie storiografiche legate alle correnti ———
  {
    id: 'leggenda-templare',
    titolo: 'Leggenda templare',
    tipo: 'concetto',
    parte: 2,
    peso: 3,
    alias: ['mito templare', 'neotemplarismo'],
    sommario:
      'La leggenda dei templari depositari di un sapere segreto sopravvissuto al rogo: una costruzione settecentesca degli alti gradi massonici, non un dato medievale. Una delle invenzioni più produttive della storia del campo.',
    archi: [
      ['invenzione-di-tradizione', 'elabora', 'Caso esemplare: il mito genera organizzazioni reali'],
    ],
    fonti: ['Partner, The Murdered Magicians'],
  },
  {
    id: 'donne-ed-esoterismo',
    titolo: 'Protagoniste: donne ed esoterismo',
    tipo: 'concetto',
    parte: 2,
    peso: 3,
    alias: ['autorità femminile', 'medium'],
    sommario:
      'Uno dei pochi campi in cui l’autorità femminile ha potuto esercitarsi pubblicamente prima dell’emancipazione giuridica: dove il criterio è l’esperienza e non l’ordinazione, la barriera istituzionale non funziona. Con il suo rovescio: dottrine della polarità e logge che escludono.',
    archi: [
      ['spiritismo', 'rilegge', 'Le medium ottocentesche: la seduta come tribuna'],
      ['teosofia', 'rilegge', 'Blavatsky e Besant alla testa di un’organizzazione internazionale'],
      ['wicca', 'rilegge', 'Starhawk: stregoneria, femminismo, ecologia'],
    ],
    fonti: ['Owen, The Place of Enchantment'],
  },

  // ——— Parte III — Concetti strutturali ———
  {
    id: 'corrispondenze',
    titolo: 'Corrispondenze',
    tipo: 'concetto',
    parte: 3,
    peso: 5,
    alias: ['analogia', 'simpatia'],
    sommario:
      'Il principio per cui le cose sono legate anche da somiglianze strutturali reali, non solo da cause: il mondo come testo leggibile, l’azione a distanza, il noto che apre l’ignoto. Nel suo tempo non era superstizione: era la fisica disponibile.',
    archi: [
      ['macrocosmo-microcosmo', 'elabora', 'La forma più densa del principio'],
      ['talismani', 'influenza', 'Operare sulla cosa corrispondente equivale a operare sulla cosa'],
    ],
    fonti: ['Faivre, Accès de l’ésotérisme occidental'],
  },
  {
    id: 'macrocosmo-microcosmo',
    titolo: 'Macrocosmo e microcosmo',
    tipo: 'concetto',
    parte: 3,
    peso: 4,
    alias: ['homo signorum', 'uomo zodiacale'],
    sommario:
      'L’uomo come universo in piccolo e l’universo come uomo in grande: fonda la medicina astrologica verso l’esterno e, verso l’interno, l’idea che conoscere sé sia conoscere il tutto — fino alla psicologia del profondo.',
    archi: [
      ['astrologia', 'influenza', 'L’homo signorum e il salasso deciso sulle effemeridi'],
      ['inconscio-collettivo', 'influenza', 'Secolarizzato: l’inconscio prende il posto del cosmo'],
    ],
    fonti: ['Faivre, Accès de l’ésotérisme occidental'],
  },
  {
    id: 'anima-mundi',
    titolo: 'Natura vivente e anima mundi',
    tipo: 'concetto',
    parte: 3,
    peso: 4,
    alias: ['anima del mondo', 'natura vivente'],
    sommario:
      'La natura non come meccanismo ma come organismo animato, percorso da simpatie e antipatie: il presupposto della magia naturale rinascimentale, indistinguibile da ciò che allora si chiamava fisica.',
    archi: [
      ['magia-naturale', 'influenza', 'Se il cosmo è vivo, operare con le sue simpatie è fisica applicata'],
      ['corrispondenze', 'elabora'],
    ],
    fonti: ['Faivre, Accès de l’ésotérisme occidental'],
  },
  {
    id: 'segnature',
    titolo: 'Dottrina delle segnature',
    tipo: 'concetto',
    parte: 3,
    peso: 3,
    alias: ['signatura rerum'],
    sommario:
      'Ogni cosa porta impresso nella forma il segno della propria virtù: la noce per il cervello, il fiore giallo per l’itterizia. Smentita come criterio farmacologico — la somiglianza non predice l’attività biologica — ma storicamente feconda per l’osservazione.',
    fonti: ['Principe, The Secrets of Alchemy'],
  },
  {
    id: 'immaginazione',
    titolo: 'Immaginazione (imaginatio)',
    tipo: 'concetto',
    parte: 3,
    peso: 4,
    alias: ['imaginatio', 'phantasia'],
    sommario:
      'Nel lessico esoterico non fantasia arbitraria ma facoltà conoscitiva che percepisce forme reali di un ordine non sensibile — distinta dalla phantasia, il vaneggiare senza fondamento. L’organo delle mediazioni.',
    archi: [
      ['mundus-imaginalis', 'elabora', 'Corbin dà un nome al livello di realtà che l’imaginatio percepisce'],
    ],
    fonti: ['Corbin, L’immaginazione creatrice'],
  },
  {
    id: 'mundus-imaginalis',
    titolo: 'Mundus imaginalis',
    tipo: 'concetto',
    parte: 3,
    peso: 3,
    alias: ['mondo immaginale', 'immaginale'],
    sommario:
      'L’espressione coniata da Corbin per un livello di realtà intermedio fra sensibile e intelligibile, con leggi e geografie proprie: permette di chiedere a un’esperienza visionaria «che statuto ha», non «è vera o inventata».',
    fonti: ['Corbin, L’immaginazione creatrice'],
  },
  {
    id: 'trasmutazione',
    titolo: 'Trasmutazione',
    tipo: 'concetto',
    parte: 3,
    peso: 5,
    alias: ['seconda nascita', 'metamorfosi del soggetto'],
    sommario:
      'Il criterio di demarcazione del sapere esoterico: la conoscenza non lascia intatto chi la riceve. Tre registri da tenere insieme: materiale (smentito dalla chimica), interiore, ontologico.',
    archi: [
      ['opera-alchemica', 'influenza', 'Il registro materiale e la sua grammatica di fasi'],
      ['gnosi', 'elabora', 'Sapere che coincide con un mutamento di stato'],
      ['iniziazione', 'influenza', 'Il registro ontologico: la seconda nascita ritualizzata'],
    ],
    fonti: ['Faivre, Accès de l’ésotérisme occidental', 'Principe, The Secrets of Alchemy'],
  },
  {
    id: 'velo-e-occultamento',
    titolo: 'Occultamento, velo, rivelazione',
    tipo: 'concetto',
    parte: 3,
    peso: 3,
    alias: ['velo', 'esegesi a più sensi', 'PaRDeS'],
    sommario:
      'Il nascondimento come struttura del reale, non come accidente: il velo protegge in entrambe le direzioni. Con il corollario epistemologico delicato: una dottrina che spiega la propria non evidenza rischia l’infalsificabilità.',
    archi: [
      ['teoria-del-simbolo', 'influenza', 'Dove l’oggetto è indicibile, il simbolo diventa inevitabile'],
    ],
  },
  {
    id: 'gnosi',
    titolo: 'Gnosi e conoscenza interiore',
    tipo: 'concetto',
    parte: 3,
    peso: 4,
    alias: ['conoscenza salvifica'],
    sommario:
      'Distinta da pistis (fede) ed episteme (sapere dimostrativo): una conoscenza che coincide con un mutamento di stato di chi conosce e ha per oggetto la sua origine e identità. Non trasferibile per esposizione.',
    fonti: ['Jonas, Lo gnosticismo'],
  },
  {
    id: 'emanazione',
    titolo: 'Emanazione, caduta, reintegrazione',
    tipo: 'concetto',
    parte: 3,
    peso: 5,
    alias: ['prohodos', 'epistrophē', 'caduta'],
    sommario:
      'Lo schema in tre tempi che è la colonna vertebrale del campo: uscita dall’Uno, rottura, ritorno. Con il tratto distintivo esoterico: la riparazione richiede la cooperazione attiva dell’uomo, dotato di tecniche.',
    archi: [
      ['reintegrazione', 'elabora', 'Il terzo tempo dello schema'],
      ['morte-e-rinascita', 'usa_simbolo', 'La struttura narrativa che lo racconta'],
    ],
    fonti: ['Plotino, Enneadi', 'Scholem, Le grandi correnti della mistica ebraica'],
  },
  {
    id: 'reintegrazione',
    titolo: 'Reintegrazione',
    tipo: 'concetto',
    parte: 3,
    peso: 3,
    alias: ['tikkun', 'apocatastasi', 'ritorno'],
    sommario:
      'Il movimento di ritorno — epistrophē, tikkun, apocatastasi, opera al bianco — in cui l’uomo coopera attivamente alla riparazione del mondo: il termine centrale del martinismo e della cabala luriana.',
  },
  {
    id: 'tempo-ciclico',
    titolo: 'Tempo ciclico e qualità del momento',
    tipo: 'concetto',
    parte: 3,
    peso: 2,
    alias: ['kairos', 'elezione', 'età del mondo'],
    sommario:
      'Il tempo esoterico non è la linea omogenea della fisica ma un tessuto qualitativo: momenti favorevoli, cicli a più scale, ore planetarie. Scegliere il momento — l’elezione — è cooperare con la struttura del reale.',
    archi: [
      ['astrologia', 'influenza', 'L’elezione astrologica come tecnica del momento giusto'],
      ['sincronicita', 'influenza', 'La kairologia è il presupposto tacito della sincronicità'],
    ],
  },
  {
    id: 'prisca-theologia',
    titolo: 'Prisca theologia',
    tipo: 'concetto',
    parte: 3,
    peso: 3,
    alias: ['teologia antica', 'philosophia perennis'],
    sommario:
      'L’idea rinascimentale di una sapienza originaria trasmessa da una catena di antichi sapienti — Ermete, Orfeo, Zoroastro, Pitagora, Platone — fondata su datazioni poi smentite dalla filologia.',
    archi: [
      ['ermetismo', 'deriva_da', 'Nasce dalla datazione errata dei testi ermetici'],
      ['concordanza-delle-tradizioni', 'influenza', 'Il modello di ogni successiva sapienza unica'],
    ],
    fonti: ['Yates, Giordano Bruno e la tradizione ermetica'],
  },
  {
    id: 'concordanza-delle-tradizioni',
    titolo: 'Concordanza delle tradizioni',
    tipo: 'concetto',
    parte: 3,
    peso: 3,
    alias: ['philosophia perennis', 'unità delle religioni'],
    sommario:
      'L’idea che tutte le tradizioni autentiche dicano la stessa cosa: quasi sempre falsa come ipotesi storica, storicamente fecondissima come operazione culturale, rispettabile come atteggiamento etico. Tre piani da non confondere.',
    fonti: ['Hanegraaff, Esotericism and the Academy'],
  },

  // ——— Parte V — teoria del linguaggio simbolico ———
  {
    id: 'teoria-del-simbolo',
    titolo: 'Simbolo, segno, allegoria',
    tipo: 'concetto',
    parte: 5,
    peso: 4,
    alias: ['symbolon', 'metodo di lettura dei simboli'],
    sommario:
      'Il segno è convenzionale e univoco, l’allegoria è traducibile senza residuo, il simbolo no: ha più sensi simultanei in tensione. Con il metodo di lettura in sei passi e la regola: i dizionari di simboli sono repertori, mai tavole di equivalenza.',
    fonti: ['Eco, I limiti dell’interpretazione'],
  },

  // ——— Parte VI — Ricezioni moderne ———
  {
    id: 'inconscio-collettivo',
    titolo: 'Inconscio collettivo',
    tipo: 'concetto',
    parte: 6,
    peso: 3,
    sommario:
      'Lo strato psichico che Jung postula comune alla specie: non ricordi ma disposizioni ereditate che orientano l’organizzarsi dell’esperienza in immagini. L’argomento: la ricorrenza di motivi analoghi senza contatto culturale.',
    archi: [['archetipi', 'elabora', 'Le disposizioni che lo popolano']],
    fonti: ['Jung, Psicologia e alchimia', 'Shamdasani, Jung and the Making of Modern Psychology'],
  },
  {
    id: 'archetipi',
    titolo: 'Archetipi',
    tipo: 'concetto',
    parte: 6,
    peso: 4,
    alias: ['immagini archetipiche'],
    sommario:
      'Le disposizioni formali dell’inconscio collettivo. La distinzione che i divulgatori perdono: l’archetipo in sé è forma vuota non rappresentabile; ciò che si osserva sono le immagini archetipiche, sempre vestite culturalmente.',
    fonti: ['Jung, Psicologia e alchimia'],
  },
  {
    id: 'ombra',
    titolo: 'Ombra',
    tipo: 'concetto',
    parte: 6,
    peso: 3,
    sommario:
      'Tutto ciò che l’io esclude dalla propria immagine perché incompatibile con l’ideale di sé: non il male ma il rimosso, incluse qualità positive. La sua dinamica è la proiezione; il lavoro su di essa, la prima fase di ogni percorso.',
    archi: [['individuazione', 'elabora', 'Il confronto con l’Ombra come primo passaggio']],
    fonti: ['Jung, Psicologia e alchimia'],
  },
  {
    id: 'anima-animus',
    titolo: 'Anima e Animus',
    tipo: 'concetto',
    parte: 6,
    peso: 2,
    sommario:
      'La componente contrassessuale della psiche junghiana, mediatrice fra io e inconscio. È la parte più datata del sistema, costruita su una tipizzazione dei generi propria del suo tempo e oggi largamente riformulata.',
    fonti: ['Jung, Psicologia e alchimia'],
  },
  {
    id: 'se-junghiano',
    titolo: 'Sé',
    tipo: 'concetto',
    parte: 6,
    peso: 3,
    alias: ['Selbst', 'il Sé'],
    sommario:
      'Il centro e la totalità della psiche, che include l’io senza coincidervi: si esprime nei simboli di completezza — mandala, quaternità, la pietra alchemica.',
    archi: [['pietra-filosofale', 'usa_simbolo', 'Jung vi legge il simbolo del Sé']],
    fonti: ['Jung, Psicologia e alchimia'],
  },
  {
    id: 'individuazione',
    titolo: 'Individuazione',
    tipo: 'concetto',
    parte: 6,
    peso: 4,
    sommario:
      'Il processo per cui una persona diventa ciò che è, distinguendosi dalle identificazioni collettive e integrando le componenti scisse. Non perfezionamento morale né adattamento: differenziazione. Jung vi legge l’opera alchemica.',
    archi: [
      ['opera-alchemica', 'rilegge', 'Nigredo come confronto con l’Ombra, pietra come Sé'],
      ['se-junghiano', 'elabora', 'La meta del processo'],
    ],
    fonti: ['Jung, Psicologia e alchimia'],
  },
  {
    id: 'sincronicita',
    titolo: 'Sincronicità',
    tipo: 'concetto',
    parte: 6,
    peso: 3,
    sommario:
      'La coincidenza significativa fra evento psichico ed evento esterno, legati dal senso e non dalla causa. Difendibile come descrizione fenomenologica; problematica come ipotesi esplicativa: non produce previsioni verificabili.',
    archi: [
      ['divinazione', 'rilegge', 'La giustificazione acausale moderna della pratica divinatoria'],
    ],
    fonti: ['Shamdasani, Jung and the Making of Modern Psychology'],
  },
  {
    id: 'alchimia-e-psicologia',
    titolo: 'L’alchimia come processo psichico',
    tipo: 'concetto',
    parte: 6,
    peso: 4,
    alias: ['alchimia psicologica'],
    sommario:
      'La tesi junghiana: gli alchimisti proiettavano contenuti psichici sulla materia. Ha salvato un corpus dall’oblio, ma la storiografia ha mostrato che è una nuova opera novecentesca, non la decifrazione della vecchia.',
    archi: [
      ['alchimia', 'rilegge', 'Lettura potente e feconda, da studiare accanto all’alchimia storica, non al posto suo'],
    ],
    fonti: ['Jung, Psicologia e alchimia', 'Principe, The Secrets of Alchemy'],
  },
  {
    id: 'sogni',
    titolo: 'Sogni e interpretazione',
    tipo: 'concetto',
    parte: 6,
    peso: 3,
    alias: ['onirocritica', 'amplificazione'],
    sommario:
      'Due tradizioni da non confondere: l’onirocritica antica di Artemidoro, che prevede il futuro tenendo conto del sognatore, e il metodo junghiano, per cui il sogno descrive e compensa la situazione attuale della psiche.',
    archi: [
      ['divinazione', 'deriva_da', 'L’oniromanzia come ramo antico della pratica'],
    ],
  },
  {
    id: 'esoterismo-e-letteratura',
    titolo: 'Esoterismo e letteratura',
    tipo: 'concetto',
    parte: 6,
    peso: 3,
    alias: ['letteratura esoterica'],
    sommario:
      'Tre modi da distinguere: la letteratura come fonte (Goethe, Blake, Yeats, Pessoa), come materiale (romanticismo, simbolismo, Borges), come oggetto critico (Eco). Il repertorio esoterico attraversa il canone europeo.',
    archi: [
      ['teosofia-cristiana', 'rilegge', 'La dottrina delle corrispondenze di Swedenborg diventa programma poetico'],
      ['golden-dawn', 'rilegge', 'Yeats membro attivo per decenni'],
    ],
  },
  {
    id: 'esoterismo-e-arte',
    titolo: 'Esoterismo e arte',
    tipo: 'concetto',
    parte: 6,
    peso: 3,
    alias: ['arte e occulto', 'astrazione'],
    sommario:
      'Dai programmi astrologici di Palazzo Schifanoia alla Melencolia di Dürer, fino al fatto storicamente decisivo: l’astrazione novecentesca nasce, per una parte notevole dei suoi protagonisti, da premesse teosofiche e antroposofiche.',
    archi: [
      ['teosofia', 'rilegge', 'Kandinskij, Mondrian, af Klint'],
      ['astrologia', 'rilegge', 'I decani di Schifanoia richiedono una competenza tecnica perduta'],
    ],
  },
  {
    id: 'esoterismo-e-cinema',
    titolo: 'Esoterismo e cinema',
    tipo: 'concetto',
    parte: 6,
    peso: 2,
    sommario:
      'Il cinema eredita una struttura narrativa — il viaggio iniziatico — e un repertorio visivo: Jodorowsky, Tarkovskij, Lynch, Kubrick, l’horror occulto e la fantascienza gnostica del mondo-prigione.',
    archi: [
      ['viaggio-dell-eroe', 'elabora', 'La grammatica industriale della sceneggiatura'],
      ['gnosticismo', 'rilegge', 'La fantascienza del risveglio dal mondo simulato'],
      ['labirinto', 'usa_simbolo', 'La zona di Stalker come labirinto iniziatico'],
    ],
  },
  {
    id: 'esoterismo-e-musica',
    titolo: 'Esoterismo e musica',
    tipo: 'concetto',
    parte: 6,
    peso: 2,
    alias: ['armonia delle sfere', 'musica mundana'],
    sommario:
      'Un rapporto strutturale, non decorativo, perché passa per il numero: dall’armonia pitagorica delle sfere a Boezio, dagli inni orfici di Ficino al Flauto magico, fino a Skrjabin e all’iconografia pop.',
    archi: [
      ['numeri-e-geometria', 'usa_simbolo', 'Gli intervalli consonanti come prova della matematicità del cosmo'],
      ['pitagorismo', 'deriva_da', 'La musica come disciplina del quadrivio'],
    ],
  },
  {
    id: 'miti-e-fiabe',
    titolo: 'Miti e fiabe',
    tipo: 'concetto',
    parte: 6,
    peso: 2,
    alias: ['fiaba di magia', 'Propp'],
    sommario:
      'Tre letture in competizione: morfologica (Propp), iniziatica (le fiabe come traccia di riti di passaggio), psicologica (von Franz, Bettelheim). La posizione solida le tiene in quest’ordine: testo, struttura, simbolo.',
    archi: [
      ['iniziazione', 'rilegge', 'La casa nel bosco, il divoramento, il compito impossibile'],
    ],
    fonti: ['Propp, Morfologia della fiaba'],
  },
  {
    id: 'viaggio-dell-eroe',
    titolo: 'Il viaggio dell’eroe',
    tipo: 'concetto',
    parte: 6,
    peso: 2,
    alias: ['monomito', 'Campbell'],
    sommario:
      'Il modello unico di Campbell — separazione, prove, ritorno — considerato dagli studiosi eccessivamente livellante come tesi comparativa, ma diventato grammatica industriale di Hollywood attraverso i manuali di sceneggiatura.',
    archi: [
      ['iniziazione', 'deriva_da', 'Ricalca lo schema dei riti di passaggio'],
    ],
  },
  {
    id: 'occulture',
    titolo: 'Occulture',
    tipo: 'concetto',
    parte: 6,
    peso: 3,
    alias: ['cultura occulta diffusa'],
    sommario:
      'Il termine di Partridge per la condizione contemporanea: materiali esoterici che circolano diffusi nella cultura popolare — serie, videogiochi, social — senza appartenenza né adesione. Lo stato normale dell’immaginario attuale.',
    archi: [
      ['new-age', 'deriva_da', 'L’esito della logica di consumo applicata al repertorio'],
    ],
    fonti: ['Partridge, The Re-Enchantment of the West'],
  },
  {
    id: 'esoterismo-e-complottismo',
    titolo: 'Esoterismo e complottismo',
    tipo: 'concetto',
    parte: 6,
    peso: 5,
    alias: ['teorie del complotto', 'cospirazionismo'],
    sommario:
      'Parentela formale, differenza sostanziale: l’esoterismo cerca un ordine nascosto nel cosmo e chiede una trasformazione di sé; il complottismo cerca colpevoli fra gli uomini. Chi indica un gruppo umano come responsabile occulto del male non fa esoterismo: fa una struttura d’odio che ne usa il lessico.',
    archi: [
      ['esoterismo', 'rilegge', 'Il confine più frainteso del campo contemporaneo'],
    ],
    fonti: ['Eco, Il pendolo di Foucault (romanzo-diagnosi)', 'Partridge, The Re-Enchantment of the West'],
  },
  {
    id: 'esoterismo-e-politica',
    titolo: 'Esoterismo e politica',
    tipo: 'concetto',
    parte: 6,
    peso: 3,
    sommario:
      'Lo stesso repertorio ha servito emancipazione e reazione: massoneria costituzionale e ariosofia razzista, spiritismo abolizionista ed Evola. Non esiste una politica dei simboli: esistono usi, e si giudicano dalle affermazioni concrete.',
    archi: [
      ['tradizionalismo', 'rilegge', 'Il caso Evola e l’uso militante nel dopoguerra'],
      ['teosofia', 'rilegge', 'Le razze-radici: materiale poi arruolato da elaborazioni razziste, da nominare per ciò che sono'],
    ],
    fonti: ['Sedgwick, Against the Modern World'],
  },
  {
    id: 'esoterismo-e-scienza',
    titolo: 'Esoterismo e scienza',
    tipo: 'concetto',
    parte: 6,
    peso: 3,
    sommario:
      'Prima parentela, poi separazione (Sei-Settecento): astrologia/astronomia, alchimia/chimica. Oggi: gli enunciati verificabili cadono sotto controllo sperimentale — e in grande maggioranza non lo superano; quelli sul senso stanno su un altro piano, da non confondere.',
    archi: [
      ['alchimia', 'rilegge', 'Newton e Boyle: la separazione è un evento storico, non un dato di natura'],
      ['studio-di-carlson', 'elabora', 'Il caso esemplare del controllo sperimentale sulle pretese predittive'],
    ],
  },
];
