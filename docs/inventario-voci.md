# Inventario delle voci di Correspondentia Theatri

Documento della fase 2 (§8.2 del BRIEF): l’elenco completo delle voci proposte con tipo,
parte, peso, periodo e archi dichiarati. Gli archi `contiene` (parte → voce) sono derivati
automaticamente dal campo `parte` e non compaiono qui. Generato da `scripts/scaffold/genera-voci.ts`;
la fonte di verità a valle della generazione sono i file in `src/content/voci/`.

**Totale: 234 voci** — parte: 6, corrente: 38, concetto: 45, pratica: 20, simbolo: 21, persona: 53, opera: 25, evento: 14, luogo: 12 — 470 archi dichiarati (più i contiene derivati).

## Parte I — Definizione ed epistemologia (18 voci)

| id | titolo | tipo | peso | periodo | archi |
|---|---|---|---|---|---|
| `esoterismo` | Esoterismo | concetto | 5 | — | deriva da → esoterico-essoterico; elabora → sapere-rifiutato; elabora → discorso-del-sapere-superiore |
| `invenzione-di-tradizione` | Invenzione di tradizione | concetto | 5 | — | rilegge → leggenda-templare; rilegge → prisca-theologia |
| `metodo-di-studio` | Metodo e trappole dello studio | concetto | 4 | — | elabora → invenzione-di-tradizione; elabora → pseudoepigrafia |
| `sapere-rifiutato` | Sapere rifiutato | concetto | 4 | — | deriva da → datazione-di-casaubon |
| `statuto-del-segreto` | Statuto del segreto | concetto | 4 | — | elabora → velo-e-occultamento |
| `esoterico-essoterico` | Esoterico ed essoterico | concetto | 3 | — | — |
| `studio-accademico` | Lo studio accademico dell’esoterismo | concetto | 3 | — | elabora → esoterismo; deriva da → religionismo |
| `discorso-del-sapere-superiore` | Discorso del sapere superiore | concetto | 2 | — | — |
| `religionismo` | Religionismo | concetto | 2 | — | — |
| `parte-1-definizione` | I. Definizione ed epistemologia | parte | 5 | — | — |
| `faivre` | Antoine Faivre | persona | 4 | 1934–2021 | elabora → esoterismo; elabora → corrispondenze; elabora → studio-accademico |
| `scholem` | Gershom Scholem | persona | 4 | 1897–1982 | rilegge → cabala; elabora → zohar; elabora → convegni-di-eranos; elabora → religionismo |
| `yates` | Frances Yates | persona | 4 | 1899–1981 | rilegge → ermetismo; rilegge → rosacrocianesimo; rilegge → arte-della-memoria; elabora → donne-ed-esoterismo |
| `corbin` | Henry Corbin | persona | 3 | 1903–1978 | elabora → mundus-imaginalis; rilegge → sufismo; elabora → convegni-di-eranos; elabora → religionismo |
| `eliade` | Mircea Eliade | persona | 3 | 1907–1986 | rilegge → iniziazione; rilegge → alchimia; elabora → convegni-di-eranos; elabora → religionismo |
| `hanegraaff` | Wouter Hanegraaff | persona | 3 | 1961–2026 | elabora → sapere-rifiutato; elabora → studio-accademico; si oppone a → alchimia-e-psicologia |
| `von-stuckrad` | Kocku von Stuckrad | persona | 2 | 1966–2026 | elabora → discorso-del-sapere-superiore |
| `pseudoepigrafia` | Pseudoepigrafia | pratica | 3 | — | — |

## Parte II — Correnti storiche (127 voci)

| id | titolo | tipo | peso | periodo | archi |
|---|---|---|---|---|---|
| `donne-ed-esoterismo` | Protagoniste: donne ed esoterismo | concetto | 3 | — | rilegge → spiritismo; rilegge → teosofia; rilegge → wicca |
| `leggenda-templare` | Leggenda templare | concetto | 3 | — | elabora → invenzione-di-tradizione |
| `alchimia` | Alchimia | corrente | 5 | 100–1750 | elabora → trasmutazione; pratica → opera-alchemica; usa il simbolo → ouroboros; usa il simbolo → coniunctio; usa il simbolo → pietra-filosofale; usa il simbolo → uccelli-alchemici; usa il simbolo → uovo; influenza → paracelsismo |
| `cabala` | Cabala ebraica | corrente | 5 | 1170–2026 | elabora → emanazione; usa il simbolo → albero-sefirotico; usa il simbolo → numeri-e-geometria; elabora → velo-e-occultamento; pratica → vie-contemplative |
| `ermetismo` | Ermetismo | corrente | 5 | 100–2026 | contemporaneo di → neoplatonismo; elabora → corrispondenze; elabora → macrocosmo-microcosmo; pratica → astrologia; pratica → talismani; influenza → alchimia; influenza → magia-rinascimentale |
| `gnosticismo` | Gnosticismo | corrente | 5 | 100–400 | elabora → gnosi; contemporaneo di → ermetismo; usa il simbolo → serpente; influenza → catarismo; influenza → teosofia-cristiana; influenza → manicheismo |
| `magia-rinascimentale` | Magia rinascimentale | corrente | 5 | 1460–1620 | deriva da → neoplatonismo; deriva da → ermetismo; deriva da → magia-medievale; elabora → prisca-theologia; elabora → corrispondenze; pratica → magia-naturale; pratica → magia-cerimoniale; pratica → talismani; pratica → arte-della-memoria |
| `neoplatonismo` | Neoplatonismo | corrente | 5 | 204–529 | elabora → emanazione; si oppone a → gnosticismo; pratica → teurgia; usa il simbolo → luce-e-tenebra; influenza → cabala |
| `teosofia` | Teosofia (Società Teosofica) | corrente | 5 | 1875–2026 | deriva da → spiritismo; elabora → concordanza-delle-tradizioni; elabora → corpo-sottile; influenza → antroposofia; influenza → new-age; influenza → esoterismo-e-arte |
| `cabala-cristiana` | Cabala cristiana | corrente | 4 | 1486–1700 | deriva da → cabala; elabora → prisca-theologia; influenza → occultismo |
| `cabala-luriana` | Cabala luriana | corrente | 4 | 1550–2026 | deriva da → cabala; elabora → emanazione; elabora → reintegrazione |
| `golden-dawn` | Golden Dawn | corrente | 4 | 1888–2026 | deriva da → occultismo; usa il simbolo → albero-sefirotico; pratica → magia-cerimoniale; pratica → vie-contemplative; influenza → thelema; influenza → wicca |
| `massoneria` | Massoneria | corrente | 4 | 1717–2026 | pratica → iniziazione; pratica → sistema-dei-gradi; usa il simbolo → casa-e-tempio; elabora → invenzione-di-tradizione; influenza → esoterismo-e-politica |
| `misteri-eleusini` | Misteri eleusini | corrente | 4 | -1450–392 | pratica → iniziazione; usa il simbolo → morte-e-rinascita; elabora → statuto-del-segreto; attribuzione infondata → massoneria |
| `new-age` | New Age | corrente | 4 | 1970–2026 | deriva da → teosofia; elabora → concordanza-delle-tradizioni; si oppone a → catena-iniziatica |
| `occultismo` | Occultismo | corrente | 4 | 1854–1920 | deriva da → cabala; elabora → tarocchi; pratica → magia-cerimoniale; influenza → golden-dawn |
| `pitagorismo` | Pitagorismo | corrente | 4 | -530–300 | usa il simbolo → numeri-e-geometria; pratica → iniziazione; pratica → vie-contemplative; elabora → esoterico-essoterico; influenza → neoplatonismo; influenza → esoterismo-e-musica |
| `rosacrocianesimo` | Rosacroce | corrente | 4 | 1614–2026 | elabora → invenzione-di-tradizione; usa il simbolo → rosa-e-croce; deriva da → alchimia; influenza → alti-gradi; attribuzione infondata → massoneria |
| `spiritismo` | Spiritismo | corrente | 4 | 1848–2026 | deriva da → mesmerismo; influenza → teosofia; elabora → donne-ed-esoterismo |
| `tradizionalismo` | Tradizionalismo | corrente | 4 | 1921–2026 | elabora → concordanza-delle-tradizioni; elabora → catena-iniziatica; si oppone a → occultismo; si oppone a → spiritismo; influenza → esoterismo-e-politica |
| `wicca` | Wicca | corrente | 4 | 1954–2026 | deriva da → golden-dawn; elabora → invenzione-di-tradizione; usa il simbolo → morte-e-rinascita; elabora → donne-ed-esoterismo |
| `alti-gradi` | Alti gradi massonici | corrente | 3 | 1740–2026 | deriva da → massoneria; elabora → leggenda-templare; deriva da → cabala-cristiana |
| `antroposofia` | Antroposofia | corrente | 3 | 1912–2026 | deriva da → teosofia |
| `magia-medievale` | Magia medievale | corrente | 3 | 1100–1500 | deriva da → ermetismo; pratica → astrologia; pratica → talismani; pratica → magia-cerimoniale; influenza → magia-rinascimentale |
| `martinismo` | Martinismo | corrente | 3 | 1754–2026 | pratica → teurgia; elabora → reintegrazione; deriva da → massoneria |
| `mesmerismo` | Mesmerismo | corrente | 3 | 1774–1850 | influenza → spiritismo; influenza → sogni |
| `mitraismo` | Mitraismo | corrente | 3 | 50–400 | pratica → sistema-dei-gradi; usa il simbolo → ponte-e-scala; contemporaneo di → misteri-eleusini |
| `orfismo` | Orfismo | corrente | 3 | -600–400 | contemporaneo di → misteri-eleusini; influenza → pitagorismo; usa il simbolo → morte-e-rinascita; usa il simbolo → specchio |
| `paracelsismo` | Paracelsismo | corrente | 3 | 1530–1700 | deriva da → alchimia; elabora → segnature; influenza → teosofia-cristiana |
| `templari` | Templari | corrente | 3 | 1119–1314 | influenza → leggenda-templare; attribuzione infondata → alti-gradi; attribuzione infondata → rosacrocianesimo |
| `teosofia-cristiana` | Teosofia cristiana | corrente | 3 | 1600–1800 | elabora → emanazione; influenza → martinismo; influenza → esoterismo-e-letteratura |
| `thelema` | Thelema | corrente | 3 | 1904–2026 | deriva da → golden-dawn; pratica → magia-cerimoniale; influenza → magia-del-caos |
| `catarismo` | Catarismo | corrente | 2 | 1150–1330 | influenza → leggenda-templare |
| `magia-del-caos` | Magia del caos | corrente | 2 | 1975–2026 | deriva da → thelema; elabora → teoria-del-simbolo |
| `manicheismo` | Manicheismo | corrente | 2 | 240–1400 | usa il simbolo → luce-e-tenebra |
| `misteri-isiaci` | Misteri di Iside | corrente | 2 | -300–400 | contemporaneo di → misteri-eleusini; usa il simbolo → morte-e-rinascita |
| `quarta-via` | Quarta Via | corrente | 2 | 1912–2026 | pratica → vie-contemplative; elabora → dinamiche-settarie |
| `sufismo` | Sufismo | corrente | 2 | 800–2026 | elabora → esoterico-essoterico; elabora → catena-iniziatica; pratica → vie-contemplative |
| `alchimia-taoista` | Alchimia interiore taoista | corrente | 1 | 700–2026 | elabora → trasmutazione; contemporaneo di → alchimia |
| `tantra` | Tantra | corrente | 1 | 500–2026 | elabora → corpo-sottile; usa il simbolo → serpente |
| `datazione-di-casaubon` | 1614 · La datazione di Casaubon | evento | 5 | 1614–1614 | elabora → corpus-hermeticum; si oppone a → prisca-theologia; influenza → ermetismo |
| `scoperta-di-nag-hammadi` | 1945 · La scoperta di Nag Hammadi | evento | 4 | 1945–1945 | elabora → gnosticismo |
| `traduzione-del-corpus-hermeticum` | 1463 · Ficino traduce il Corpus Hermeticum | evento | 4 | 1463–1463 | elabora → corpus-hermeticum; influenza → prisca-theologia; influenza → magia-rinascimentale |
| `convegni-di-eranos` | 1933 · I convegni di Eranos | evento | 3 | 1933–2026 | influenza → studio-accademico; elabora → religionismo; elabora → donne-ed-esoterismo |
| `fatti-di-hydesville` | 1848 · I fatti di Hydesville | evento | 3 | 1848–1848 | elabora → spiritismo |
| `fondazione-della-golden-dawn` | 1888 · Fondazione della Golden Dawn | evento | 3 | 1888–1888 | elabora → golden-dawn |
| `fondazione-della-gran-loggia` | 1717 · Fondazione della Gran Loggia | evento | 3 | 1717–1717 | elabora → massoneria |
| `fondazione-della-societa-teosofica` | 1875 · Fondazione della Società Teosofica | evento | 3 | 1875–1875 | elabora → teosofia |
| `processo-dei-templari` | 1307–1314 · Processo dei templari | evento | 3 | 1307–1314 | elabora → templari; influenza → leggenda-templare |
| `rogo-di-giordano-bruno` | 1600 · Rogo di Giordano Bruno | evento | 3 | 1600–1600 | elabora → giordano-bruno |
| `chiusura-di-eleusi` | 392 · Chiusura di Eleusi | evento | 2 | 392–392 | elabora → misteri-eleusini |
| `commissione-sul-mesmerismo` | 1784 · La commissione reale sul magnetismo animale | evento | 2 | 1784–1784 | elabora → mesmerismo; elabora → esoterismo-e-scienza |
| `interdizione-della-scuola-di-atene` | 529 · Interdizione della scuola di Atene | evento | 2 | 529–529 | elabora → neoplatonismo; influenza → magia-medievale |
| `alessandria` | Alessandria d’Egitto | luogo | 5 | -300–640 | — |
| `firenze` | Firenze | luogo | 4 | 1439–1600 | — |
| `londra` | Londra | luogo | 4 | 1580–2026 | — |
| `antico-egitto` | Antico Egitto (reale e immaginato) | luogo | 3 | — | attribuzione infondata → tarocchi; attribuzione infondata → massoneria; attribuzione infondata → templari; influenza → ermetismo |
| `atene` | Atene | luogo | 3 | -600–529 | — |
| `parigi` | Parigi | luogo | 3 | 1250–1950 | — |
| `roma` | Roma | luogo | 3 | -100–1600 | — |
| `safed` | Safed | luogo | 3 | 1530–1600 | — |
| `ascona` | Ascona | luogo | 2 | 1900–1988 | — |
| `il-cairo` | Il Cairo | luogo | 2 | 1904–1951 | — |
| `new-york` | New York | luogo | 2 | 1848–1900 | — |
| `provenza-e-catalogna` | Provenza e Catalogna | luogo | 2 | 1150–1300 | — |
| `corpus-hermeticum` | Corpus Hermeticum | opera | 5 | 100–300 | elabora → ermetismo; pratica → pseudoepigrafia; elabora → macrocosmo-microcosmo |
| `zohar` | Zohar | opera | 5 | 1280–1290 | elabora → cabala; pratica → pseudoepigrafia; elabora → emanazione; usa il simbolo → albero-sefirotico |
| `de-occulta-philosophia` | De occulta philosophia | opera | 4 | 1510–1533 | elabora → magia-rinascimentale; elabora → magia-naturale; elabora → magia-cerimoniale; influenza → golden-dawn |
| `enneadi` | Enneadi | opera | 4 | 250–301 | elabora → neoplatonismo; elabora → emanazione |
| `fama-fraternitatis` | Fama Fraternitatis | opera | 4 | 1614–1615 | elabora → rosacrocianesimo; elabora → invenzione-di-tradizione |
| `tavola-di-smeraldo` | Tavola di Smeraldo | opera | 4 | 750–850 | elabora → corrispondenze; influenza → alchimia; pratica → pseudoepigrafia |
| `atalanta-fugiens` | Atalanta fugiens | opera | 3 | 1617–1617 | elabora → alchimia; elabora → esoterismo-e-musica |
| `de-mysteriis` | De mysteriis | opera | 3 | 295–305 | elabora → teurgia; influenza → magia-cerimoniale |
| `de-vita` | De vita libri tres | opera | 3 | 1489–1489 | elabora → magia-rinascimentale; elabora → talismani; elabora → astrologia |
| `dogme-et-rituel` | Dogme et rituel de la haute magie | opera | 3 | 1854–1856 | elabora → occultismo; elabora → tarocchi |
| `dottrina-segreta` | La dottrina segreta | opera | 3 | 1888–1888 | elabora → teosofia; elabora → concordanza-delle-tradizioni |
| `liber-al` | Liber AL vel Legis | opera | 3 | 1904–1904 | elabora → thelema |
| `nozze-chimiche` | Le nozze chimiche di Christian Rosenkreutz | opera | 3 | 1616–1616 | elabora → rosacrocianesimo; usa il simbolo → coniunctio; usa il simbolo → opera-alchemica |
| `oratio-de-hominis-dignitate` | Oratio de hominis dignitate | opera | 3 | 1486–1486 | influenza → magia-rinascimentale |
| `picatrix` | Picatrix | opera | 3 | 950–1000 | elabora → magia-medievale; elabora → talismani |
| `sefer-yetzirah` | Sefer Yetzirah | opera | 3 | 200–600 | influenza → cabala; usa il simbolo → numeri-e-geometria |
| `lamine-auree` | Lamine auree orfiche | opera | 2 | -400–-200 | deriva da → orfismo |
| `oracoli-caldaici` | Oracoli Caldaici | opera | 2 | 150–200 | influenza → teurgia; influenza → neoplatonismo |
| `rosarium-philosophorum` | Rosarium philosophorum | opera | 2 | 1550–1550 | usa il simbolo → coniunctio; influenza → alchimia-e-psicologia |
| `parte-2-correnti` | II. Correnti storiche | parte | 5 | — | — |
| `agrippa` | Cornelio Agrippa | persona | 5 | 1486–1535 | elabora → de-occulta-philosophia; elabora → magia-rinascimentale; deriva da → cabala-cristiana; pratica → magia-cerimoniale |
| `blavatsky` | Helena Petrovna Blavatsky | persona | 5 | 1831–1891 | elabora → teosofia; elabora → dottrina-segreta; elabora → donne-ed-esoterismo |
| `crowley` | Aleister Crowley | persona | 5 | 1875–1947 | elabora → thelema; elabora → liber-al; deriva da → golden-dawn; pratica → magia-cerimoniale |
| `eliphas-levi` | Éliphas Lévi | persona | 5 | 1810–1875 | elabora → occultismo; elabora → dogme-et-rituel; elabora → tarocchi; elabora → esoterismo |
| `ermete-trismegisto` | Ermete Trismegisto | persona | 5 | — | attribuzione infondata → corpus-hermeticum; attribuzione infondata → tavola-di-smeraldo; elabora → pseudoepigrafia |
| `ficino` | Marsilio Ficino | persona | 5 | 1433–1499 | elabora → corpus-hermeticum; elabora → de-vita; elabora → prisca-theologia; deriva da → neoplatonismo; deriva da → picatrix; pratica → talismani; elabora → esoterismo-e-musica; elabora → magia-rinascimentale |
| `plotino` | Plotino | persona | 5 | 204–270 | elabora → neoplatonismo; elabora → enneadi; elabora → emanazione; si oppone a → gnosticismo |
| `giamblico` | Giamblico | persona | 4 | 245–325 | elabora → teurgia; elabora → de-mysteriis; elabora → neoplatonismo |
| `giordano-bruno` | Giordano Bruno | persona | 4 | 1548–1600 | elabora → arte-della-memoria; elabora → magia-rinascimentale; deriva da → ermetismo; elabora → rogo-di-giordano-bruno |
| `guenon` | René Guénon | persona | 4 | 1886–1951 | elabora → tradizionalismo; si oppone a → occultismo; pratica → sufismo; elabora → catena-iniziatica |
| `isaac-luria` | Isaac Luria | persona | 4 | 1534–1572 | elabora → cabala-luriana; elabora → emanazione; elabora → reintegrazione |
| `jacob-boehme` | Jacob Böhme | persona | 4 | 1575–1624 | elabora → teosofia-cristiana; deriva da → paracelsismo; influenza → esoterismo-e-letteratura |
| `john-dee` | John Dee | persona | 4 | 1527–1608 | elabora → magia-rinascimentale; influenza → golden-dawn; pratica → magia-cerimoniale |
| `paracelso` | Paracelso | persona | 4 | 1493–1541 | elabora → paracelsismo; elabora → segnature; elabora → alchimia; elabora → immaginazione |
| `pico-della-mirandola` | Giovanni Pico della Mirandola | persona | 4 | 1463–1494 | elabora → oratio-de-hominis-dignitate; elabora → cabala-cristiana; elabora → magia-rinascimentale; deriva da → ficino |
| `platone` | Platone | persona | 4 | -428–-348 | influenza → neoplatonismo; elabora → anima-mundi |
| `pseudo-dionigi` | Pseudo-Dionigi Areopagita | persona | 4 | 470–530 | deriva da → neoplatonismo; elabora → pseudoepigrafia; usa il simbolo → luce-e-tenebra |
| `steiner` | Rudolf Steiner | persona | 4 | 1861–1925 | elabora → antroposofia; deriva da → teosofia |
| `swedenborg` | Emanuel Swedenborg | persona | 4 | 1688–1772 | elabora → corrispondenze; elabora → teosofia-cristiana; influenza → esoterismo-e-letteratura; influenza → spiritismo |
| `abulafia` | Abraham Abulafia | persona | 3 | 1240–1291 | elabora → cabala; pratica → vie-contemplative |
| `evola` | Julius Evola | persona | 3 | 1898–1974 | elabora → tradizionalismo; elabora → esoterismo-e-politica |
| `gardner` | Gerald Gardner | persona | 3 | 1884–1964 | elabora → wicca; elabora → invenzione-di-tradizione |
| `gioacchino-da-fiore` | Gioacchino da Fiore | persona | 3 | 1135–1202 | elabora → tempo-ciclico; influenza → new-age |
| `gurdjieff` | George Ivanovič Gurdjieff | persona | 3 | 1866–1949 | elabora → quarta-via; pratica → vie-contemplative |
| `ildegarda-di-bingen` | Ildegarda di Bingen | persona | 3 | 1098–1179 | elabora → macrocosmo-microcosmo; elabora → donne-ed-esoterismo |
| `martinez-de-pasqually` | Martinez de Pasqually | persona | 3 | 1727–1774 | elabora → martinismo; pratica → teurgia; elabora → reintegrazione |
| `mesmer` | Franz Anton Mesmer | persona | 3 | 1734–1815 | elabora → mesmerismo; elabora → commissione-sul-mesmerismo |
| `newton` | Isaac Newton | persona | 3 | 1642–1727 | pratica → alchimia; elabora → esoterismo-e-scienza |
| `pitagora` | Pitagora | persona | 3 | -570–-495 | influenza → pitagorismo |
| `proclo` | Proclo | persona | 3 | 412–485 | elabora → neoplatonismo; influenza → pseudo-dionigi |
| `saint-martin` | Louis-Claude de Saint-Martin | persona | 3 | 1743–1803 | elabora → martinismo; deriva da → jacob-boehme |
| `valentino` | Valentino | persona | 3 | 100–160 | elabora → gnosticismo |
| `zosimo-di-panopoli` | Zosimo di Panopoli | persona | 3 | 250–320 | elabora → alchimia; usa il simbolo → morte-e-rinascita |
| `apuleio` | Apuleio | persona | 2 | 124–170 | elabora → misteri-isiaci |
| `basilide` | Basilide | persona | 2 | 100–160 | elabora → gnosticismo |
| `christian-rosenkreutz` | Christian Rosenkreutz | persona | 2 | — | attribuzione infondata → rosacrocianesimo; elabora → fama-fraternitatis |
| `jabir-ibn-hayyan` | Jabir ibn Hayyan | persona | 2 | 721–815 | elabora → alchimia; elabora → pseudoepigrafia |
| `maria-l-ebrea` | Maria l’Ebrea | persona | 2 | 200–300 | elabora → alchimia; elabora → donne-ed-esoterismo |
| `orfeo` | Orfeo | persona | 2 | — | attribuzione infondata → orfismo; usa il simbolo → morte-e-rinascita |
| `porfirio` | Porfirio | persona | 2 | 234–305 | elabora → enneadi; si oppone a → teurgia |
| `shimon-bar-yochai` | Shimon bar Yochai | persona | 2 | 100–170 | attribuzione infondata → zohar |
| `starhawk` | Starhawk | persona | 2 | 1951–2026 | elabora → wicca; elabora → donne-ed-esoterismo |

## Parte III — Concetti strutturali (15 voci)

| id | titolo | tipo | peso | periodo | archi |
|---|---|---|---|---|---|
| `corrispondenze` | Corrispondenze | concetto | 5 | — | elabora → macrocosmo-microcosmo; influenza → talismani |
| `emanazione` | Emanazione, caduta, reintegrazione | concetto | 5 | — | elabora → reintegrazione; usa il simbolo → morte-e-rinascita |
| `trasmutazione` | Trasmutazione | concetto | 5 | — | influenza → opera-alchemica; elabora → gnosi; influenza → iniziazione |
| `anima-mundi` | Natura vivente e anima mundi | concetto | 4 | — | influenza → magia-naturale; elabora → corrispondenze |
| `gnosi` | Gnosi e conoscenza interiore | concetto | 4 | — | — |
| `immaginazione` | Immaginazione (imaginatio) | concetto | 4 | — | elabora → mundus-imaginalis |
| `macrocosmo-microcosmo` | Macrocosmo e microcosmo | concetto | 4 | — | influenza → astrologia; influenza → inconscio-collettivo |
| `concordanza-delle-tradizioni` | Concordanza delle tradizioni | concetto | 3 | — | — |
| `mundus-imaginalis` | Mundus imaginalis | concetto | 3 | — | — |
| `prisca-theologia` | Prisca theologia | concetto | 3 | — | deriva da → ermetismo; influenza → concordanza-delle-tradizioni |
| `reintegrazione` | Reintegrazione | concetto | 3 | — | — |
| `segnature` | Dottrina delle segnature | concetto | 3 | — | — |
| `velo-e-occultamento` | Occultamento, velo, rivelazione | concetto | 3 | — | influenza → teoria-del-simbolo |
| `tempo-ciclico` | Tempo ciclico e qualità del momento | concetto | 2 | — | influenza → astrologia; influenza → sincronicita |
| `parte-3-concetti` | III. Concetti strutturali | parte | 5 | — | — |

## Parte IV — Pratiche e vie (24 voci)

| id | titolo | tipo | peso | periodo | archi |
|---|---|---|---|---|---|
| `studio-di-carlson` | 1985 · Il test di Carlson su Nature | evento | 2 | 1985–1985 | elabora → astrologia |
| `clavicula-salomonis` | Clavicula Salomonis | opera | 2 | 1500–1700 | elabora → magia-cerimoniale; pratica → pseudoepigrafia |
| `rider-waite-smith` | Mazzo Rider-Waite-Smith | opera | 2 | 1909–1909 | elabora → tarocchi; deriva da → golden-dawn; elabora → donne-ed-esoterismo |
| `parte-4-pratiche` | IV. Pratiche e vie | parte | 5 | — | — |
| `van-gennep` | Arnold van Gennep | persona | 2 | 1873–1957 | rilegge → iniziazione |
| `astrologia` | Astrologia | pratica | 5 | — | elabora → macrocosmo-microcosmo; elabora → tempo-ciclico; elabora → studio-di-carlson |
| `dinamiche-settarie` | Dinamiche settarie e discernimento | pratica | 5 | — | — |
| `iniziazione` | Iniziazione | pratica | 5 | — | usa il simbolo → morte-e-rinascita; elabora → sistema-dei-gradi |
| `opera-alchemica` | L’opera alchemica | pratica | 5 | — | usa il simbolo → uccelli-alchemici; usa il simbolo → coniunctio; usa il simbolo → uovo; usa il simbolo → pietra-filosofale; usa il simbolo → acqua; usa il simbolo → fuoco |
| `rischi-della-pratica` | Rischi della pratica | pratica | 5 | — | elabora → dinamiche-settarie |
| `divinazione` | Divinazione | pratica | 4 | — | elabora → tarocchi; elabora → i-ching; elabora → geomanzia |
| `magia-cerimoniale` | Magia cerimoniale | pratica | 4 | — | elabora → struttura-del-rituale; elabora → talismani |
| `tarocchi` | Tarocchi | pratica | 4 | — | elabora → invenzione-di-tradizione; usa il simbolo → albero-sefirotico |
| `teurgia` | Teurgia | pratica | 4 | — | elabora → emanazione |
| `arte-della-memoria` | Arte della memoria | pratica | 3 | — | usa il simbolo → casa-e-tempio |
| `catena-iniziatica` | Catena iniziatica e trasmissione | pratica | 3 | — | — |
| `corpo-sottile` | Corpo sottile | pratica | 3 | — | elabora → rischi-della-pratica |
| `magia-naturale` | Magia naturale | pratica | 3 | — | elabora → corrispondenze |
| `sistema-dei-gradi` | Sistema dei gradi | pratica | 3 | — | usa il simbolo → ponte-e-scala |
| `struttura-del-rituale` | Anatomia di un rituale | pratica | 3 | — | usa il simbolo → casa-e-tempio; elabora → tempo-ciclico |
| `talismani` | Talismani | pratica | 3 | — | elabora → corrispondenze; elabora → tempo-ciclico |
| `vie-contemplative` | Vie contemplative | pratica | 3 | — | — |
| `geomanzia` | Geomanzia | pratica | 2 | — | deriva da → astrologia |
| `i-ching` | I Ching | pratica | 2 | — | elabora → sincronicita |

## Parte V — Linguaggio simbolico (23 voci)

| id | titolo | tipo | peso | periodo | archi |
|---|---|---|---|---|---|
| `teoria-del-simbolo` | Simbolo, segno, allegoria | concetto | 4 | — | — |
| `parte-5-simboli` | V. Linguaggio simbolico | parte | 5 | — | — |
| `albero-sefirotico` | Albero sefirotico | simbolo | 5 | — | elabora → emanazione; deriva da → albero |
| `serpente` | Serpente | simbolo | 5 | — | elabora → ouroboros |
| `albero` | Albero | simbolo | 4 | — | elabora → albero-sefirotico |
| `morte-e-rinascita` | Morte e rinascita | simbolo | 4 | — | — |
| `acqua` | Acqua | simbolo | 3 | — | — |
| `casa-e-tempio` | Casa, tempio, edificio | simbolo | 3 | — | — |
| `coniunctio` | Coniunctio e androgino | simbolo | 3 | — | elabora → sole-e-luna |
| `fuoco` | Fuoco | simbolo | 3 | — | — |
| `labirinto` | Labirinto | simbolo | 3 | — | — |
| `luce-e-tenebra` | Luce e tenebra | simbolo | 3 | — | — |
| `numeri-e-geometria` | Numeri e geometria | simbolo | 3 | — | — |
| `ouroboros` | Ouroboros | simbolo | 3 | — | — |
| `pietra-filosofale` | Pietra filosofale | simbolo | 3 | — | — |
| `rosa-e-croce` | Rosa e croce | simbolo | 3 | — | — |
| `sole-e-luna` | Sole e Luna | simbolo | 3 | — | — |
| `deserto` | Deserto | simbolo | 2 | — | — |
| `montagna` | Montagna | simbolo | 2 | — | — |
| `ponte-e-scala` | Ponte e scala | simbolo | 2 | — | — |
| `specchio` | Specchio | simbolo | 2 | — | — |
| `uccelli-alchemici` | Gli uccelli alchemici | simbolo | 2 | — | — |
| `uovo` | Uovo | simbolo | 2 | — | — |

## Parte VI — Ricezioni moderne (27 voci)

| id | titolo | tipo | peso | periodo | archi |
|---|---|---|---|---|---|
| `esoterismo-e-complottismo` | Esoterismo e complottismo | concetto | 5 | — | rilegge → esoterismo |
| `alchimia-e-psicologia` | L’alchimia come processo psichico | concetto | 4 | — | rilegge → alchimia |
| `archetipi` | Archetipi | concetto | 4 | — | — |
| `individuazione` | Individuazione | concetto | 4 | — | rilegge → opera-alchemica; elabora → se-junghiano |
| `esoterismo-e-arte` | Esoterismo e arte | concetto | 3 | — | rilegge → teosofia; rilegge → astrologia |
| `esoterismo-e-letteratura` | Esoterismo e letteratura | concetto | 3 | — | rilegge → teosofia-cristiana; rilegge → golden-dawn |
| `esoterismo-e-politica` | Esoterismo e politica | concetto | 3 | — | rilegge → tradizionalismo; rilegge → teosofia |
| `esoterismo-e-scienza` | Esoterismo e scienza | concetto | 3 | — | rilegge → alchimia; elabora → studio-di-carlson |
| `inconscio-collettivo` | Inconscio collettivo | concetto | 3 | — | elabora → archetipi |
| `occulture` | Occulture | concetto | 3 | — | deriva da → new-age |
| `ombra` | Ombra | concetto | 3 | — | elabora → individuazione |
| `se-junghiano` | Sé | concetto | 3 | — | usa il simbolo → pietra-filosofale |
| `sincronicita` | Sincronicità | concetto | 3 | — | rilegge → divinazione |
| `sogni` | Sogni e interpretazione | concetto | 3 | — | deriva da → divinazione |
| `anima-animus` | Anima e Animus | concetto | 2 | — | — |
| `esoterismo-e-cinema` | Esoterismo e cinema | concetto | 2 | — | elabora → viaggio-dell-eroe; rilegge → gnosticismo; usa il simbolo → labirinto |
| `esoterismo-e-musica` | Esoterismo e musica | concetto | 2 | — | usa il simbolo → numeri-e-geometria; deriva da → pitagorismo |
| `miti-e-fiabe` | Miti e fiabe | concetto | 2 | — | rilegge → iniziazione |
| `viaggio-dell-eroe` | Il viaggio dell’eroe | concetto | 2 | — | deriva da → iniziazione |
| `psicologia-e-alchimia` | Psicologia e alchimia | opera | 3 | 1944–1944 | elabora → alchimia-e-psicologia; rilegge → alchimia |
| `flauto-magico` | Il flauto magico | opera | 2 | 1791–1791 | deriva da → massoneria; usa il simbolo → iniziazione; elabora → esoterismo-e-musica |
| `melencolia-i` | Melencolia I | opera | 2 | 1514–1514 | elabora → esoterismo-e-arte; usa il simbolo → numeri-e-geometria; usa il simbolo → astrologia |
| `pendolo-di-foucault` | Il pendolo di Foucault | opera | 2 | 1988–1988 | elabora → esoterismo-e-complottismo; elabora → esoterismo-e-letteratura; rilegge → leggenda-templare |
| `parte-6-ricezioni` | VI. Ricezioni moderne | parte | 5 | — | — |
| `jung` | Carl Gustav Jung | persona | 5 | 1875–1961 | elabora → inconscio-collettivo; elabora → archetipi; elabora → individuazione; elabora → sincronicita; elabora → psicologia-e-alchimia; rilegge → alchimia; elabora → convegni-di-eranos |
| `hilma-af-klint` | Hilma af Klint | persona | 3 | 1862–1944 | elabora → esoterismo-e-arte; deriva da → teosofia; elabora → donne-ed-esoterismo |
| `yeats` | W.B. Yeats | persona | 3 | 1865–1939 | elabora → golden-dawn; elabora → esoterismo-e-letteratura |

## Archi `attribuzione_infondata`

Le genealogie leggendarie, ognuna con la nota che spiega perché l’attribuzione non regge:

- **misteri-eleusini → massoneria**: La continuità fra i misteri antichi e la massoneria, rivendicata dagli alti gradi settecenteschi, non ha alcuna base documentaria: fra la chiusura di Eleusi e il 1717 corrono tredici secoli senza catena.
- **templari → alti-gradi**: La discendenza templare rivendicata dalla Stretta Osservanza (1751) è un’invenzione settecentesca: nessuna catena documentata collega l’ordine sciolto nel 1314 alla massoneria.
- **templari → rosacrocianesimo**: L’accostamento templari-rosacroce è una saldatura romantica posteriore: i manifesti del 1614 non menzionano i templari.
- **rosacrocianesimo → massoneria**: La continuità fra la fraternità del 1614 (mai esistita come organizzazione) e la massoneria è rivendicazione settecentesca senza base documentaria.
- **orfeo → orfismo**: I testi orfici sono opera di autori diversi lungo secoli: l’attribuzione al cantore mitico è il gesto fondativo della corrente, non un dato storico.
- **ermete-trismegisto → corpus-hermeticum**: L’attribuzione dei trattati a un sapiente egizio primordiale è pseudoepigrafia: i testi sono greci, di età imperiale, come dimostrato da Casaubon nel 1614.
- **ermete-trismegisto → tavola-di-smeraldo**: La Tavola compare in ambiente arabo fra VIII e IX secolo: l’attribuzione a Ermete è parte del suo dispositivo di autorità.
- **shimon-bar-yochai → zohar**: L’attribuzione dello Zohar al maestro del II secolo è pseudoepigrafia: lingua, fonti e contesto rimandano alla Castiglia degli anni Ottanta del Duecento (Scholem).
- **christian-rosenkreutz → rosacrocianesimo**: Il fondatore è un personaggio del racconto dei manifesti (Andreae parlerà di ludibrium): nessuna attestazione indipendente della sua esistenza o della fraternità originaria.
- **antico-egitto → tarocchi**: L’origine egizia dei tarocchi, proposta da Court de Gébelin nel 1781 e ripresa da Lévi, è smentita: il mazzo nasce come gioco di carte nell’Italia del Quattrocento.
- **antico-egitto → massoneria**: L’origine egizia della massoneria è una costruzione degli alti gradi e dei riti «egizi» settecenteschi (Cagliostro): l’istituzione nasce a Londra nel 1717.
- **antico-egitto → templari**: La custodia templare di una sapienza egizia è un anello inventato della catena Egitto→Templari→Rosacroce→Massoneria: nessuna fonte medievale la attesta.
