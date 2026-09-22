// English counterpart of the Chinese historical and visitor notes.
const SITE_EN = {
  "373": {
    "city": "Wiltshire",
    "period": "Neolithic–Bronze Age",
    "why": "Megalithic monuments show how prehistoric communities organised shared labour and ritual.",
    "see": "Compare stone arrangements, earthworks and burial landscapes rather than only the isolated stone circle.",
    "question": "Why invest so much collective work without modern machinery?"
  },
  "514": {
    "city": "Orkney",
    "period": "c. 3000 BCE",
    "why": "Settlements and ceremonial remains reveal everyday life alongside beliefs.",
    "see": "Compare the houses at Skara Brae with the Ring of Brodgar.",
    "question": "How were homes, tombs and ceremonial places connected?"
  },
  "404": {
    "city": "Athens",
    "period": "Mainly 5th century BCE",
    "why": "Athens expressed wealth, religion and civic identity on the Acropolis.",
    "see": "Look at the Parthenon, Propylaea and changes in elevation; distinguish restoration from original fabric.",
    "question": "How does public architecture express a city's view of itself?"
  },
  "393": {
    "city": "Delphi",
    "period": "Ancient Greece",
    "why": "A sanctuary shared by rival cities shows that political division could coexist with shared culture.",
    "see": "Follow the Sacred Way past city treasuries and the Temple of Apollo.",
    "question": "Why display rival cities' wealth in a common sanctuary?"
  },
  "91": {
    "city": "Rome",
    "period": "Ancient Rome to the modern era",
    "why": "Imperial public spaces and later church power overlap in the same city.",
    "see": "Compare the Roman Forum, Colosseum and later churches by their individual dates.",
    "question": "How did old buildings acquire new uses as power shifted?"
  },
  "430": {
    "city": "Hadrian's Wall / German Limes",
    "period": "Mainly 2nd century CE",
    "why": "This transnational property preserves parts of an imperial frontier system.",
    "see": "Choose a section and compare forts, gates and terrain.",
    "question": "Did the frontier simply block movement, or regulate it?"
  },
  "788": {
    "city": "Ravenna",
    "period": "5th–6th centuries",
    "why": "Western Roman, Ostrogothic and Byzantine rule left traces in one city.",
    "see": "Study the Justinian and Theodora mosaics in San Vitale.",
    "question": "Why place rulers at the centre of religious imagery?"
  },
  "356": {
    "city": "Istanbul",
    "period": "Byzantine, Ottoman and later periods",
    "why": "Successive empires reused the capital while changing the functions of its buildings.",
    "see": "Compare Hagia Sophia's architectural layers, the land walls and Ottoman buildings.",
    "question": "How do conquerors adapt an inherited capital?"
  },
  "3": {
    "city": "Aachen",
    "period": "Core begun c. 790–800",
    "why": "Charlemagne's palace chapel linked religion, kingship and imperial ambition.",
    "see": "Compare the octagonal core and upper gallery with the later Gothic choir.",
    "question": "How does architecture make authority visible?"
  },
  "697": {
    "city": "Jelling",
    "period": "10th century and later",
    "why": "A northern comparison for kingship and Christianisation alongside the Carolingian world.",
    "see": "Examine the relationship between the runestones, burial mounds and church.",
    "question": "How do words, images and religion tell a royal story?"
  },
  "272": {
    "city": "Lübeck",
    "period": "Mainly medieval",
    "why": "Merchant cities reveal trade networks and political power beyond dynastic courts.",
    "see": "Look at the town hall, brick churches and merchants' streets; distinguish surviving fabric from rebuilding.",
    "question": "How could commercial wealth support urban autonomy?"
  },
  "616": {
    "city": "Prague",
    "period": "Medieval to modern",
    "why": "Castle, bridge and old town bring royal power and urban life into one landscape.",
    "see": "Compare the positions of Prague Castle, St Vitus Cathedral and Charles Bridge.",
    "question": "How did rulers, clergy and citizens share and contest the city?"
  },
  "29": {
    "city": "Kraków",
    "period": "Medieval to modern",
    "why": "Royal, commercial and Jewish spaces reveal the city's multiple communities.",
    "see": "Explore Wawel Hill, the Main Market Square and Kazimierz.",
    "question": "Which communities shaped different parts of the city?"
  },
  "314": {
    "city": "Granada",
    "period": "Mainly 13th–15th centuries",
    "why": "Nasrid buildings preserve the court culture of Muslim rule in Iberia.",
    "see": "Observe courtyards, water channels, inscriptions and the Albayzín, noting their different dates.",
    "question": "How do water, writing and geometry express power?"
  },
  "174": {
    "city": "Florence",
    "period": "Medieval–Renaissance",
    "why": "Commercial wealth, civic politics and artistic patronage reinforced one another.",
    "see": "Compare the cathedral dome, Piazza della Signoria and Medici buildings.",
    "question": "Who paid for art, and who decided its message?"
  },
  "783": {
    "city": "Wittenberg / Eisleben",
    "period": "16th century and later commemoration",
    "why": "Buildings associated with Luther connect the Reformation to particular cities.",
    "see": "Visit the Castle Church, Town Church and house exhibitions; separate events from later memorial changes.",
    "question": "How did a local religious dispute spread across Europe?"
  },
  "540": {
    "city": "Saint Petersburg",
    "period": "Mainly 18th–19th centuries",
    "why": "An imperial capital's design expressed dynastic power and engagement with European culture.",
    "see": "Read the Neva waterfront, squares and palace axes together.",
    "question": "Why give a new capital such a deliberate spatial order?"
  },
  "1033": {
    "city": "Vienna",
    "period": "Medieval, Baroque and 19th century",
    "why": "Court spaces and the Ringstrasse allow comparison between imperial power and a modern metropolis.",
    "see": "Compare the Hofburg area and public buildings along the Ringstrasse.",
    "question": "How did a court capital adapt to civic society and population growth?"
  },
  "400": {
    "city": "Budapest",
    "period": "Multiple periods; major 19th-century growth",
    "why": "Urban expansion reveals tensions between national identity and Habsburg imperial structures.",
    "see": "Compare Buda Castle, the Parliament waterfront and Andrássy Avenue.",
    "question": "How can public buildings express both national and imperial identities?"
  },
  "371": {
    "city": "Shropshire",
    "period": "18th–19th centuries",
    "why": "The landscape connects raw materials, energy, manufacturing and transport.",
    "see": "Study the Iron Bridge, Coalbrookdale remains and the industrial valley.",
    "question": "Why did industry concentrate here?"
  },
  "729": {
    "city": "Weimar / Dessau / Bernau",
    "period": "Early 20th century",
    "why": "Modern design's social ambitions contrast with the political crises of the same period.",
    "see": "Examine the Dessau school's glass façade, functional layout and associated housing.",
    "question": "Can design transform ordinary lives?"
  },
  "31": {
    "city": "Oświęcim",
    "period": "1940–1945",
    "why": "A historical site and memorial to Nazi persecution and the Holocaust.",
    "see": "Use official interpretation, survivors' testimony and camp remains to understand systematic persecution.",
    "question": "How can individual lives help explain institutional violence without treating this as an ordinary attraction?"
  },
  "495": {
    "city": "Strasbourg",
    "period": "Medieval to 19th–20th centuries",
    "why": "Architecture records intertwined French and German histories; postwar cooperation is a related topic for further study.",
    "see": "Compare the streets, buildings and scale of the Grande-Île and Neustadt.",
    "question": "How does a border city accommodate changing national identities?"
  },
  "263": {
    "city": "Lisbon",
    "period": "16th century",
    "why": "Maritime expansion and royal patronage funded monumental building at Belém.",
    "see": "Compare monastery decoration, the tower and their relationship to the Tagus.",
    "question": "Where did the wealth come from, and who bore its costs?"
  },
  "83": {
    "city": "Versailles",
    "period": "Mainly 17th–18th centuries",
    "why": "Court society and the political crisis of 1789 can be studied at the same place.",
    "see": "Examine ceremonial rooms, the Hall of Mirrors and garden axes, comparing uses before and after the Revolution.",
    "question": "How did ceremony organise elites, and why did royal control fail?"
  },
  "975": {
    "city": "Essen",
    "period": "19th–20th centuries",
    "why": "Mining, coal washing and coking facilities reveal an integrated industrial system.",
    "see": "Follow coal through the shafts, washing plant and coke works.",
    "question": "How did technical systems change working lives and the regional economy?"
  },
  "965": {
    "city": "Utrecht",
    "period": "1924",
    "why": "An experimental house shows modernism reorganising everyday life.",
    "see": "Consider movable partitions, connected spaces and colours in relation to residents' needs.",
    "question": "How might different spaces change family life?"
  },
  "1349": {
    "city": "Amsterdam",
    "period": "17th century",
    "why": "A merchant republic's expansion combines commerce, engineering and social hierarchy.",
    "see": "Compare canal plots, merchants' houses and bridges, paying attention to the allocation of space.",
    "question": "How did global trade shape the city while concealing colonial relationships?"
  },
  "30": {
    "city": "Warsaw",
    "period": "Postwar reconstruction",
    "why": "Rebuilding made the city a place of choices about memory and identity.",
    "see": "Compare the Old Town Market Square and rebuilding interpretation with historical images.",
    "question": "Why can a reconstructed city retain historical value?"
  },
  "1181": {
    "city": "Le Havre",
    "period": "After 1945",
    "why": "Unlike Warsaw, this reconstruction adopted a modern architectural language.",
    "see": "Observe concrete modules, street plans and St Joseph's Church.",
    "question": "How should rebuilding balance an earlier appearance with new ways of living?"
  },
  "659": {
    "city": "County Meath",
    "period": "Neolithic",
    "why": "Passage tombs such as Newgrange reveal ritual and collective engineering.",
    "see": "Study mound forms, carved stones and passage alignments with site interpretation.",
    "question": "How were celestial events, burial and collective memory connected?"
  },
  "555": {
    "city": "Lake Mälaren",
    "period": "Viking Age",
    "why": "The Viking Age involved long-distance trade and settlement as well as conquest.",
    "see": "Compare harbour, settlement, defensive and burial remains with excavated objects.",
    "question": "Which networks connected this northern settlement to distant places?"
  },
  "59": {
    "city": "Bergen",
    "period": "Medieval trading tradition; later rebuilding",
    "why": "Harbour warehouses preserve the organisation of Hanseatic commerce.",
    "see": "Observe waterfront timber buildings, narrow passages and storage layouts, noting rebuilding after fires.",
    "question": "How did the journey from ship to storehouse shape a neighbourhood?"
  },
  "267": {
    "city": "Bern",
    "period": "From the 12th century; multiple layers",
    "why": "Streets and plots reveal long-term continuity in urban planning.",
    "see": "Study the main street, arcades, fountains and river bend.",
    "question": "Why did later rebuilding retain the medieval urban framework?"
  },
  "857": {
    "city": "Brussels",
    "period": "Medieval town hall and late-17th-century rebuilding",
    "why": "Guild houses and the town hall express corporate wealth and public identity.",
    "see": "Compare the emblems, scale and positions of guild façades and municipal buildings.",
    "question": "How does a square allow different groups to represent themselves?"
  },
  "902": {
    "city": "Sighişoara",
    "period": "Medieval onwards",
    "why": "A Transylvanian city provides an entry into migration, commerce and defence.",
    "see": "Look for evidence of guilds and civic organisation in walls, towers and streets.",
    "question": "How did migrant communities establish urban life in a frontier region?"
  },
  "822": {
    "city": "Tallinn",
    "period": "Medieval onwards",
    "why": "Baltic trade and political authority occupied distinct spaces in the upper and lower towns.",
    "see": "Compare the hilltop town, lower town, town hall and merchants' houses.",
    "question": "How do terrain and social status divide a city?"
  },
  "389": {
    "city": "Near Kraljevo",
    "period": "From the late 12th century",
    "why": "An Orthodox monastery connects Serbian dynasties with Byzantine culture.",
    "see": "Study stone church exteriors, frescoes and the whole monastic layout.",
    "question": "How did a local dynasty express its identity through religious art?"
  },
  "42": {
    "city": "Sofia",
    "period": "Medieval; notable 13th-century frescoes",
    "why": "Church painting provides evidence of medieval Bulgarian society and religious culture.",
    "see": "Look closely at figures, clothing, expressions and the relationship between building phases.",
    "question": "What can religious images reveal about their patrons and society?"
  },
  "780": {
    "city": "Vergina",
    "period": "Mainly 4th century BCE",
    "why": "Palace and royal tombs reveal Macedonian kingship.",
    "see": "Compare ceremonial palace spaces with the expression of status in burials.",
    "question": "What do these remains reveal about power and society?"
  },
  "511": {
    "city": "Peloponnese",
    "period": "13th–15th centuries",
    "why": "The hillside town preserves late Byzantine political and religious spaces.",
    "see": "Follow the castle, palace and churches through the levels of the town.",
    "question": "What do these remains reveal about power and society?"
  },
  "517": {
    "city": "Olympia",
    "period": "Ancient Greece",
    "why": "A shared sanctuary linked competition, worship and identity across city-states.",
    "see": "Compare the functions of the Temple of Zeus, stadium and training facilities.",
    "question": "What do these remains reveal about power and society?"
  },
  "1517": {
    "city": "Near Kavala",
    "period": "4th century BCE to Byzantine times",
    "why": "One city passed through Macedonian, Roman and Christian phases.",
    "see": "Observe the spatial relationship between the theatre, forum and early Christian basilicas.",
    "question": "What do these remains reveal about power and society?"
  },
  "941": {
    "city": "Argolis",
    "period": "2nd millennium BCE",
    "why": "Fortified centres and tombs reveal Mycenaean social organisation.",
    "see": "Compare the Lion Gate, massive walls and tholos tombs as expressions of defence and kingship.",
    "question": "What do these remains reveal about power and society?"
  },
  "530": {
    "city": "Cyclades",
    "period": "Ancient Greek and Hellenistic periods",
    "why": "A religious sanctuary also became a Mediterranean trading city.",
    "see": "Walk from temples to houses, shops and harbour areas.",
    "question": "What do these remains reveal about power and society?"
  },
  "493": {
    "city": "Rhodes",
    "period": "Medieval to Ottoman periods",
    "why": "The Knights' defences and later rulers left successive urban layers.",
    "see": "Study walls, the Street of the Knights and changing religious uses.",
    "question": "What do these remains reveal about power and society?"
  },
  "1733": {
    "city": "Crete",
    "period": "Bronze Age",
    "why": "Palatial architecture records Minoan administration, ritual and exchange.",
    "see": "Compare courtyards, storage and circulation; distinguish remains from reconstruction.",
    "question": "What do these remains reveal about power and society?"
  },
  "537": {
    "city": "Attica / Phocis / Chios",
    "period": "Middle Byzantine period",
    "why": "Three monasteries allow comparison of Byzantine architecture and mosaics.",
    "see": "Observe domes, spatial layouts and the placement of religious images.",
    "question": "What do these remains reveal about power and society?"
  },
  "978": {
    "city": "Corfu",
    "period": "Mainly Venetian rule",
    "why": "A strategic maritime position and Venetian fortifications shaped the town.",
    "see": "Compare the old and new fortresses with the dense street network.",
    "question": "What do these remains reveal about power and society?"
  },
  "456": {
    "city": "Thessaloniki",
    "period": "4th–15th centuries",
    "why": "Churches and urban monuments reveal the long continuity of the Eastern Roman world.",
    "see": "Compare church plans, frescoes and mosaics from different periods.",
    "question": "What do these remains reveal about power and society?"
  },
  "595": {
    "city": "Samos",
    "period": "Ancient Greece",
    "why": "Harbour, sanctuary and water engineering reveal an island city's organisation of resources.",
    "see": "Study the Heraion and the Tunnel of Eupalinos.",
    "question": "What do these remains reveal about power and society?"
  },
  "491": {
    "city": "Peloponnese",
    "period": "Ancient Greece",
    "why": "Healing, belief and public activity overlapped in the sanctuary.",
    "see": "Look beyond the theatre to the layout of healing and ritual facilities.",
    "question": "What do these remains reveal about power and society?"
  },
  "392": {
    "city": "Peloponnese",
    "period": "5th century BCE",
    "why": "A mountain sanctuary offers a case study in changing classical architecture.",
    "see": "Compare column orders and interior and exterior spaces; learn about conservation.",
    "question": "What do these remains reveal about power and society?"
  },
  "942": {
    "city": "Patmos",
    "period": "Medieval and later",
    "why": "Monastery and settlement show the continuity of an island religious centre.",
    "see": "Examine the monastery, defensive architecture and surrounding houses.",
    "question": "What do these remains reveal about power and society?"
  },
  "1695": {
    "city": "Epirus",
    "period": "Especially 18th–19th centuries",
    "why": "Mountain villages and stone bridges link transport, community and environment.",
    "see": "Compare how terrain shapes routes and public spaces between villages.",
    "question": "What do these remains reveal about power and society?"
  },
  "455": {
    "city": "Thessaly",
    "period": "Medieval monasteries",
    "why": "Rock formations and monasteries together form a mixed heritage property.",
    "see": "Consider monastery locations, historic access and the mountain landscape.",
    "question": "What do these remains reveal about power and society?"
  },
  "454": {
    "city": "Chalkidiki",
    "period": "Byzantine period to the present",
    "why": "Monastic communities and their environment form a mixed heritage property.",
    "see": "Study monastic buildings and art; check official access arrangements separately.",
    "question": "What do these remains reveal about power and society?"
  },
  "1719": {
    "city": "Mount Olympus",
    "period": "Natural landscape and long cultural associations",
    "why": "This mixed property links mountain ecology with the mountain's place in Greek culture.",
    "see": "Study cultural geography and ecology rather than treating the mountain as a building of one dynasty.",
    "question": "What does this landscape reveal about culture and society?"
  },
  "549": {
    "city": "Caserta",
    "period": "18th century",
    "why": "Palace, waterworks and production facilities express dynastic planning.",
    "see": "Observe palace axes, garden water features and the supply system.",
    "question": "What do these remains reveal about power and society?"
  },
  "1487": {
    "city": "Sicily",
    "period": "12th century",
    "why": "Norman royal buildings brought together several craft and religious traditions.",
    "see": "Compare the palace chapel, cathedral mosaics and architectural ornament.",
    "question": "What do these remains reveal about power and society?"
  },
  "825": {
    "city": "Aquileia",
    "period": "Roman to early Christian periods",
    "why": "Urban remains and the basilica connect Roman city life with Christianity's spread.",
    "see": "Study harbour remains, the city plan and floor mosaics.",
    "question": "What do these remains reveal about power and society?"
  },
  "831": {
    "city": "Sicily",
    "period": "Ancient Greece",
    "why": "A colonial city shows how the Greek world extended beyond today's borders.",
    "see": "Relate temples to the city's terrain and defensive boundaries.",
    "question": "What do these remains reveal about power and society?"
  },
  "829": {
    "city": "Campania",
    "period": "Roman period",
    "why": "Volcanic destruction preserved different forms of urban and domestic life.",
    "see": "Compare streets, baths, house paintings and commercial premises.",
    "question": "What do these remains reveal about power and society?"
  },
  "990": {
    "city": "Umbria",
    "period": "Medieval",
    "why": "Franciscan traditions and church art reflect changes in religious life.",
    "see": "Study painted narratives, pilgrimage spaces and their relationship with the town.",
    "question": "What do these remains reveal about power and society?"
  },
  "398": {
    "city": "Apulia",
    "period": "13th century",
    "why": "Frederick II's building connects royal power with a diverse intellectual background.",
    "see": "Examine the octagonal plan, stonework and architectural symbolism.",
    "question": "What do these remains reveal about power and society?"
  },
  "93": {
    "city": "Milan",
    "period": "15th century",
    "why": "Court patronage, monastic life and artistic experiment meet here.",
    "see": "Consider how the refectory painting's perspective relates to real space.",
    "question": "What do these remains reveal about power and society?"
  },
  "842": {
    "city": "Campania",
    "period": "Antiquity to the early modern period",
    "why": "A cultural landscape includes Greek cities and later religious centres.",
    "see": "Compare Paestum's temples, Velia's remains and Padula's charterhouse.",
    "question": "What do these remains reveal about power and society?"
  },
  "797": {
    "city": "Veneto",
    "period": "Roman to medieval periods",
    "why": "The city expanded upon Roman foundations.",
    "see": "Compare the arena, gates and medieval public squares.",
    "question": "What do these remains reveal about power and society?"
  },
  "1158": {
    "city": "Lazio",
    "period": "1st millennium BCE",
    "why": "Tombs offer evidence of Italian societies before Rome's rise.",
    "see": "Compare chamber layouts, paintings and settlement-like cemetery plans.",
    "question": "What do these remains reveal about power and society?"
  },
  "726": {
    "city": "Naples",
    "period": "Ancient Greece to modern times",
    "why": "Streets and buildings preserve layers of Mediterranean exchange.",
    "see": "Trace ancient streets alongside churches and dynastic buildings.",
    "question": "What do these remains reveal about power and society?"
  },
  "550": {
    "city": "Tuscany",
    "period": "Medieval",
    "why": "Towers and streets record competition between urban families.",
    "see": "Compare towers, squares and the town's boundaries.",
    "question": "What do these remains reveal about power and society?"
  },
  "717": {
    "city": "Tuscany",
    "period": "Medieval",
    "why": "Public architecture expresses the political and religious life of a self-governing city.",
    "see": "Study Piazza del Campo, the Palazzo Pubblico and cathedral.",
    "question": "What do these remains reveal about power and society?"
  },
  "789": {
    "city": "Tuscany",
    "period": "15th century",
    "why": "The small town centre illustrates Renaissance urban design.",
    "see": "Observe how square, palace and cathedral form a planned ensemble.",
    "question": "What do these remains reveal about power and society?"
  },
  "828": {
    "city": "Marche",
    "period": "Especially 15th century",
    "why": "The ducal palace and hill town reveal the organisation of court culture.",
    "see": "Study the palace courtyard, studiolo and urban terrain.",
    "question": "What do these remains reveal about power and society?"
  },
  "1024": {
    "city": "Sicily",
    "period": "After the 1693 earthquake",
    "why": "Reconstruction produced a group of Baroque towns.",
    "see": "Compare streets, church façades and squares in different towns.",
    "question": "What do these remains reveal about power and society?"
  },
  "1318": {
    "city": "Several Italian regions",
    "period": "568–774",
    "why": "A serial property records encounters between Roman traditions and a new kingdom.",
    "see": "Compare churches, decoration and spaces of power across the components.",
    "question": "What do these remains reveal about power and society?"
  },
  "395": {
    "city": "Pisa",
    "period": "Medieval",
    "why": "A religious ensemble connects with the wealth of a maritime city.",
    "see": "Read cathedral, baptistery, bell tower and cemetery as a whole.",
    "question": "What do these remains reveal about power and society?"
  },
  "94": {
    "city": "Lombardy",
    "period": "Prehistoric and later periods",
    "why": "Rock engravings record changing activities, symbols and societies over a long span.",
    "see": "Distinguish subjects and superimposed carvings; the images were not all made at once.",
    "question": "What do these remains reveal about power and society?"
  },
  "833": {
    "city": "Sardinia",
    "period": "Bronze Age",
    "why": "Stone towers and a settlement offer evidence of island social organisation.",
    "see": "Compare the central tower, surrounding towers and houses.",
    "question": "What do these remains reveal about power and society?"
  },
  "1200": {
    "city": "Sicily",
    "period": "Bronze Age and later",
    "why": "Necropolis and city illustrate distinct phases of Sicily's history.",
    "see": "Compare Pantalica's tombs, the Greek theatre and the layers of Ortygia.",
    "question": "What do these remains reveal about power and society?"
  },
  "670": {
    "city": "Basilicata",
    "period": "Long-lived settlement landscape",
    "why": "Rock settlements connect environmental adaptation, religious life and modern conservation.",
    "see": "Observe homes, water collection and rock-cut churches.",
    "question": "What do these remains reveal about power and society?"
  },
  "394": {
    "city": "Veneto",
    "period": "Medieval to early modern",
    "why": "A maritime trading republic relied on its lagoon and extensive commercial networks.",
    "see": "Study harbour spaces, the Arsenal, public squares and water transport.",
    "question": "What do these remains reveal about power and society?"
  },
  "1708": {
    "city": "Central and southern Italy",
    "period": "From 312 BCE",
    "why": "Road building illustrates Roman expansion and territorial integration.",
    "see": "Relate road surfaces, tombs and settlements along the route.",
    "question": "What do these remains reveal about power and society?"
  },
  "907": {
    "city": "Tivoli",
    "period": "2nd century CE",
    "why": "An imperial residence concentrated resources and architectural experiments.",
    "see": "Compare water courts, residential spaces and varied building forms.",
    "question": "What do these remains reveal about power and society?"
  },
  "1025": {
    "city": "Tivoli",
    "period": "16th century",
    "why": "Gardens and hydraulic engineering express a patron's status.",
    "see": "Study fountains, hillside axes and water technology.",
    "question": "What do these remains reveal about power and society?"
  },
  "832": {
    "city": "Sicily",
    "period": "Late Roman period",
    "why": "A large residence and mosaics reveal elite life and labour.",
    "see": "Compare reception areas, private spaces and image subjects.",
    "question": "What do these remains reveal about power and society?"
  },
  "488": {
    "city": "London",
    "period": "11th–16th centuries and later",
    "why": "Royal power after the Norman Conquest intersects with Tudor religious politics.",
    "see": "Study the White Tower, defences and histories of imprisonment during the Reformation.",
    "question": "Which remains support this interpretation, and which are later restorations or memorials?"
  },
  "496": {
    "city": "Canterbury",
    "period": "From the 6th century; multiple building phases",
    "why": "The ensemble connects Christianity's spread in England with medieval pilgrimage.",
    "see": "Compare the early church, abbey ruins and later cathedral.",
    "question": "Which remains support this interpretation, and which are later restorations or memorials?"
  },
  "428": {
    "city": "Bath",
    "period": "Roman period and 18th century",
    "why": "Roman bathing culture meets Georgian urban planning.",
    "see": "Compare ancient thermal facilities with 18th-century streets and houses.",
    "question": "Which remains support this interpretation, and which are later restorations or memorials?"
  },
  "728": {
    "city": "Edinburgh",
    "period": "Medieval to 18th–19th centuries",
    "why": "A medieval city expanded with Enlightenment-era planning.",
    "see": "Compare Old Town lanes with the New Town's regular blocks.",
    "question": "Which remains support this interpretation, and which are later restorations or memorials?"
  },
  "429": {
    "city": "Scotland",
    "period": "18th–19th centuries",
    "why": "The factory system is connected to experiments in improving workers' lives.",
    "see": "Study mills, workers' housing and communal facilities.",
    "question": "Which remains support this interpretation, and which are later restorations or memorials?"
  },
  "1030": {
    "city": "Derbyshire",
    "period": "18th–19th centuries",
    "why": "Water-powered textiles contributed to the emergence of modern factory production.",
    "see": "Examine relationships between river, power systems, mills and workers' settlements.",
    "question": "Which remains support this interpretation, and which are later restorations or memorials?"
  },
  "426": {
    "city": "London",
    "period": "Medieval to 19th century",
    "why": "Royal, religious and parliamentary power occupy related spaces.",
    "see": "Distinguish the medieval hall and abbey from the rebuilt 19th-century Parliament.",
    "question": "Which remains support this interpretation, and which are later restorations or memorials?"
  },
  "370": {
    "city": "Durham",
    "period": "From the 11th century",
    "why": "Norman rule relied on bishops who also exercised secular authority.",
    "see": "Compare how castle and cathedral together controlled the town and frontier.",
    "question": "Which remains support this interpretation, and which are later restorations or memorials?"
  },
  "168": {
    "city": "Speyer",
    "period": "From the 11th century",
    "why": "The cathedral expresses the relationship between imperial and ecclesiastical power.",
    "see": "Study Romanesque spaces, the crypt and royal burials.",
    "question": "Which remains support this interpretation, and which are later restorations or memorials?"
  },
  "1636": {
    "city": "Rhineland",
    "period": "Medieval",
    "why": "These places reveal religious and intellectual life in medieval Jewish communities.",
    "see": "Explore synagogue remains, ritual baths and cemeteries, looking beyond dynastic history.",
    "question": "Which remains support this interpretation, and which are later restorations or memorials?"
  },
  "897": {
    "city": "Eisenach",
    "period": "Medieval, 16th and 19th centuries",
    "why": "Luther's New Testament translation connects with later national historical memory.",
    "see": "Distinguish the medieval palace, Luther memorial spaces and 19th-century restoration.",
    "question": "Which remains support this interpretation, and which are later restorations or memorials?"
  },
  "846": {
    "city": "Weimar",
    "period": "18th–19th centuries",
    "why": "Literature, thought and court patronage developed in an Enlightenment setting.",
    "see": "Trace a cultural network through writers' homes, the library and gardens.",
    "question": "Which remains support this interpretation, and which are later restorations or memorials?"
  },
  "515": {
    "city": "Lorsch",
    "period": "Carolingian period",
    "why": "Monasteries organised royal relationships, land and knowledge.",
    "see": "Compare the surviving gate hall with the site's plan and archaeological reconstruction.",
    "question": "Which remains support this interpretation, and which are later restorations or memorials?"
  },
  "268": {
    "city": "St Gall",
    "period": "From the 8th century; mostly 18th-century buildings today",
    "why": "A Carolingian intellectual network is connected to the monastery's long continuity.",
    "see": "Study manuscripts and the monastic plan; the Baroque library is not an 8th-century interior.",
    "question": "Which remains support this interpretation, and which are later restorations or memorials?"
  },
  "1054": {
    "city": "Silesia",
    "period": "Mid-17th century",
    "why": "The churches reflect limited toleration of Protestant communities after the Thirty Years' War.",
    "see": "Observe how construction restrictions shaped timber structures, capacity and design.",
    "question": "Which remains support this interpretation, and which are later restorations or memorials?"
  },
  "32": {
    "city": "Near Kraków",
    "period": "Medieval onwards",
    "why": "Salt production connects royal income with a long history of mining technology.",
    "see": "Study galleries, transport and drainage, distinguishing mining phases.",
    "question": "Which remains support this interpretation, and which are later restorations or memorials?"
  },
  "80": {
    "city": "Normandy",
    "period": "Medieval",
    "why": "Monasticism, pilgrimage and defence meet in a tidal landscape.",
    "see": "Compare the abbey's levels, fortifications and bay terrain.",
    "question": "Which remains support this interpretation, and which are later restorations or memorials?"
  },
  "81": {
    "city": "Chartres",
    "period": "Mainly 12th–13th centuries",
    "why": "Gothic architecture worked together with medieval religious imagery.",
    "see": "Observe how stained glass, sculpture and structure organise the visitor's experience.",
    "question": "Which remains support this interpretation, and which are later restorations or memorials?"
  },
  "228": {
    "city": "Avignon",
    "period": "Especially 14th century",
    "why": "The papal court's residence made religious power visible in the city.",
    "see": "Study the Papal Palace, defensive architecture and surrounding urban spaces.",
    "question": "Which remains support this interpretation, and which are later restorations or memorials?"
  },
  "600": {
    "city": "Paris",
    "period": "Medieval to 19th–20th centuries",
    "why": "The riverbanks record dynasties, revolution and the making of a modern capital.",
    "see": "Compare the Louvre, Place de la Concorde and Eiffel Tower; the property is not all of Paris.",
    "question": "Which remains support this interpretation, and which are later restorations or memorials?"
  },
  "165": {
    "city": "Burgundy",
    "period": "12th century",
    "why": "Monastic reform linked work and community life.",
    "see": "Compare the functions of church, dormitory, cloister and production facilities.",
    "question": "Which remains support this interpretation, and which are later restorations or memorials?"
  },
  "85": {
    "city": "Dordogne",
    "period": "Palaeolithic",
    "why": "Cave art provides evidence of human activity before writing.",
    "see": "Distinguish original caves, areas closed for protection and replicas; follow official visitor arrangements.",
    "question": "Which remains support this interpretation, and which are later restorations or memorials?"
  },
  "313": {
    "city": "Córdoba",
    "period": "Roman, Islamic and Christian periods",
    "why": "The city connects al-Andalus with later changes of rule.",
    "see": "Study architectural layers in the Mosque-Cathedral and surrounding streets.",
    "question": "Which remains support this interpretation, and which are later restorations or memorials?"
  },
  "379": {
    "city": "Toledo",
    "period": "Antiquity to early modern times",
    "why": "Religious communities, political powers and craft traditions intersected here.",
    "see": "Compare synagogues, churches and the urban plan without assuming diversity always meant peaceful coexistence.",
    "question": "Which remains support this interpretation, and which are later restorations or memorials?"
  },
  "664": {
    "city": "Extremadura",
    "period": "Roman period",
    "why": "The ensemble reveals Roman urban organisation in Iberia.",
    "see": "Compare the theatre, bridges, water infrastructure and public spaces.",
    "question": "Which remains support this interpretation, and which are later restorations or memorials?"
  },
  "347": {
    "city": "Galicia",
    "period": "Medieval and later",
    "why": "Pilgrimage networks connected European regions.",
    "see": "Study the cathedral alongside pilgrims' services, streets and squares.",
    "question": "Which remains support this interpretation, and which are later restorations or memorials?"
  },
  "522": {
    "city": "Andalusia",
    "period": "16th century",
    "why": "Renaissance architecture spread and took local forms in Iberia.",
    "see": "Compare the architectural language of palaces, churches and public squares.",
    "question": "Which remains support this interpretation, and which are later restorations or memorials?"
  },
  "1367": {
    "city": "Elvas",
    "period": "Mainly from the 17th century",
    "why": "Frontier warfare and state defence adapted to artillery.",
    "see": "Study bastioned fortifications, defensive depth and water supply.",
    "question": "Which remains support this interpretation, and which are later restorations or memorials?"
  },
  "1344": {
    "city": "Wallonia",
    "period": "19th–20th centuries",
    "why": "Coal mining shaped industrial and working-class society.",
    "see": "Compare shafts, industrial buildings, workers' housing and communal spaces.",
    "question": "Which remains support this interpretation, and which are later restorations or memorials?"
  },
  "1486": {
    "city": "Telemark",
    "period": "Early 20th century",
    "why": "Hydropower and fertiliser production responded to global agricultural demand.",
    "see": "Follow the production network through power stations, transmission, factories, railways and ferries.",
    "question": "Which remains support this interpretation, and which are later restorations or memorials?"
  },
  "1567": {
    "city": "Western Front",
    "period": "1914–1918 and later commemoration",
    "why": "Mass warfare transformed the commemoration of individuals.",
    "see": "Compare cemeteries, memorials to the missing and different national approaches to remembrance.",
    "question": "Which remains support this interpretation, and which are later restorations or memorials?"
  },
  "1661": {
    "city": "Kaunas",
    "period": "1919–1939",
    "why": "State-building between the wars drove urban modernisation.",
    "see": "Relate public buildings and housing to the growth of a provisional capital.",
    "question": "Which remains support this interpretation, and which are later restorations or memorials?"
  },
  "95": {
    "city": "Adriatic coast",
    "period": "Medieval to early modern",
    "why": "A maritime trading city combined self-government with defence.",
    "see": "Examine how walls, harbour and public buildings served a commercial republic.",
    "question": "Which remains support this interpretation, and which are later restorations or memorials?"
  },
  "1313": {
    "city": "Almadén / Idrija",
    "period": "Ancient origins; major early modern trade",
    "why": "European mining connected with precious-metal production across the Atlantic.",
    "see": "Study mining, processing and working lives, asking about labour and environmental costs.",
    "question": "Which remains support this interpretation, and which are later restorations or memorials?"
  },
  "527": {
    "city": "Kyiv",
    "period": "From the 11th century",
    "why": "Kyivan Rus' and Byzantium exchanged religious and artistic traditions.",
    "see": "Compare 11th-century mosaics with later Ukrainian Baroque buildings.",
    "question": "How did local societies join wider European exchanges while retaining distinctive institutions?"
  },
  "604": {
    "city": "Veliky Novgorod",
    "period": "Medieval",
    "why": "An eastern European trading city fostered regional Orthodox art.",
    "see": "Relate churches and frescoes to the city's waterways.",
    "question": "How did local societies join wider European exchanges while retaining distinctive institutions?"
  },
  "541": {
    "city": "Vilnius",
    "period": "Medieval to early modern",
    "why": "The Grand Duchy of Lithuania's urban history includes several architectural traditions.",
    "see": "Compare the street pattern with Gothic, Renaissance and Baroque buildings.",
    "question": "How did local societies join wider European exchanges while retaining distinctive institutions?"
  },
  "852": {
    "city": "Riga",
    "period": "Medieval to early 20th century",
    "why": "Hanseatic commerce was followed by industrial-era urban expansion.",
    "see": "Compare the medieval core, timber buildings and Art Nouveau districts.",
    "question": "How did local societies join wider European exchanges while retaining distinctive institutions?"
  },
  "132": {
    "city": "Malta and Gozo",
    "period": "4th–3rd millennia BCE",
    "why": "Island communities organised the construction of large ritual buildings.",
    "see": "Compare temple plans, stone structures and decoration across the components.",
    "question": "How did local societies join wider European exchanges while retaining distinctive institutions?"
  },
  "1152": {
    "city": "Þingvellir",
    "period": "Assembly tradition from 930",
    "why": "North Atlantic settlers developed assemblies and legal traditions; this was not under Carolingian rule.",
    "see": "Study assembly remains, meeting spaces and the cultural landscape.",
    "question": "How did local societies join wider European exchanges while retaining distinctive institutions?"
  }
};
