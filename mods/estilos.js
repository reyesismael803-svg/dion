/* DION · Contexto 3 · Historia de la arquitectura — Dashboard de estilos
   Módulo DION_MOD.estilos — línea de tiempo holográfica de estilos arquitectónicos
   con afinidad al proyecto (clima, tipología, región, sostenibilidad, vigencia). */
(function(){
'use strict';
window.DION_MOD = window.DION_MOD || {};
const KEY = 'estilos';

/* ───────────────────────── DATOS ───────────────────────── */
const CL = {H:'calido-humedo', S:'calido-seco', T:'templado', F:'frio', A:'andino'};
const LANES = [
  ['EC','Ecuador'], ['PC','América precolombina'], ['LA','Latinoamérica'], ['NA','Norteamérica'],
  ['EU','Europa'], ['AN','Antigüedad mediterránea y Próximo Oriente'], ['IS','Mundo islámico'],
  ['AF','África'], ['AS','Asia'], ['GL','Global / transnacional']
];
const LANEN = Object.fromEntries(LANES);
const FAMS = ['Prehistórico','Antiguo','Clásico','Precolombino','Medieval','Islámico','Asiático','Africano',
  'Renacimiento y Barroco','Colonial','Neoclásico','Historicismo','Moderno temprano','Moderno','Contemporáneo','Sostenible','Vernáculo'];
const ANDINOS = new Set(['caral','chavin','moche','nasca','tiwanaku','wari','chimu','inca','barroco-andino']);

function S(id,n,era,yi,yf,ln,familia,rasgos,materiales,clima,usos,autores,obras,sost,glifo){
  return {id, n, era, yi, yf, ln, region: LANEN[ln], familia, rasgos: rasgos.split('|'), materiales,
    clima: clima.split('').map(c => CL[c]), usos: usos ? usos.split(' ') : [], autores, obras: obras.split('|'), sost, glifo};
}

const D = [
/* ── Antigüedad y prehistoria ── */
S('neolitico','Neolítico protourbano','Neolítico precerámico y cerámico (Anatolia y Levante)',-9600,-5500,'AN','Prehistórico','Recintos circulares con pilares en T|Casas adosadas de adobe con acceso por la cubierta|Primeros asentamientos permanentes','Piedra caliza, adobe, madera, revoque de barro','ST','REL SOC RES','Comunidades neolíticas (anónimo)','Göbekli Tepe (Şanlıurfa, Turquía)|Çatalhöyük (Konya, Turquía)|Jericó (Cisjordania)',2,'adobe'),
S('megalitico','Megalítico','Neolítico y Edad del Bronce (fachada atlántica europea)',-4500,-1500,'EU','Prehistórico','Grandes bloques monolíticos|Dólmenes, menhires y crómlechs|Orientación astronómica','Piedra sin labrar o desbastada','TF','REL PUB CUL','Comunidades neolíticas (anónimo)','Stonehenge (Wiltshire, Reino Unido)|Newgrange (Meath, Irlanda)|Alineamientos de Carnac (Bretaña, Francia)',1,'dolmen'),
S('egipcio','Egipcio antiguo','Imperios Antiguo, Medio y Nuevo',-3000,-30,'AN','Antiguo','Pirámides y mastabas|Templos axiales con pilonos y salas hipóstilas|Muros en talud con relieves|Columnas papiriformes y lotiformes','Caliza, arenisca, granito, adobe','S','REL CUL GOB','Imhotep, Hemiunu, Senenmut','Complejo funerario de Zoser (Saqqara, Egipto)|Pirámides de Guiza (Guiza, Egipto)|Templo de Karnak (Luxor, Egipto)',1,'piramide'),
S('mesopotamico','Mesopotámico','Sumerio, acadio, babilónico y asirio',-3500,-539,'AN','Antiguo','Zigurats escalonados|Ladrillo de adobe y ladrillo vidriado|Arcos y bóvedas de ladrillo tempranos|Ciudades amuralladas','Adobe, ladrillo cocido y vidriado, betún','S','REL GOB SEG','Anónimo (constructores sumerios y babilonios)','Zigurat de Ur (Dhi Qar, Irak)|Puerta de Ishtar (Babilonia; hoy Museo de Pérgamo, Berlín)|Palacio de Sargón II (Jorsabad, Irak)',2,'zigurat'),
S('persa','Persa aqueménida','Imperio aqueménida',-550,-330,'AN','Antiguo','Salas hipóstilas (apadana)|Capiteles de doble prótomo de toro|Plataformas con escalinatas y relieves','Piedra caliza, cedro, ladrillo','S','GOB EVE CUL','Constructores de Ciro, Darío I y Jerjes','Persépolis (Fars, Irán)|Tumba de Ciro (Pasargada, Irán)|Palacio de Darío (Susa, Irán)',1,'columna'),
S('minoico','Minoico','Período palacial cretense',-2000,-1450,'AN','Antiguo','Palacios con patio central|Columnas de madera que se estrechan hacia la base|Pozos de luz y ventilación|Frescos','Piedra, madera, estuco pintado','ST','GOB CUL','Anónimo','Palacio de Cnosos (Creta, Grecia)|Palacio de Festo (Creta, Grecia)|Akrotiri (Santorini, Grecia)',2,'columna'),
S('micenico','Micénico','Edad del Bronce final griega',-1600,-1100,'AN','Antiguo','Murallas ciclópeas|Mégaron como núcleo palacial|Tumbas tholos con falsa cúpula','Bloques de piedra sin mortero','ST','SEG GOB','Anónimo','Puerta de los Leones (Micenas, Grecia)|Tesoro de Atreo (Micenas, Grecia)|Ciudadela de Tirinto (Argólida, Grecia)',1,'cupula'),
S('dorico','Griego · orden dórico','Períodos arcaico y clásico',-650,-400,'AN','Clásico','Columna sin basa con capitel de equino y ábaco|Friso de triglifos y metopas|Correcciones ópticas (éntasis, curvatura)','Mármol, caliza estucada','ST','CUL REL GOB','Ictino, Calícrates, Fidias','Partenón (Atenas, Grecia)|Templo de Hera II (Paestum, Italia)|Templo de Zeus (Olimpia, Grecia)',1,'columna'),
S('jonico','Griego · orden jónico','Arcaico y clásico (Jonia y Ática)',-560,-300,'AN','Clásico','Capitel de volutas|Columna esbelta con basa|Friso continuo','Mármol','ST','CUL REL EDU','Mnesicles, Calícrates, Quersifrón','Erecteion (Atenas, Grecia)|Templo de Atenea Niké (Atenas, Grecia)|Templo de Artemisa (Éfeso, Turquía)',1,'jonica'),
S('corintio','Griego · orden corintio','Clásico tardío y helenístico',-430,-30,'AN','Clásico','Capitel de hojas de acanto|Proporciones muy esbeltas|Uso inicial en interiores y monumentos','Mármol','ST','CUL REL GOB','Calímaco (atribuido), Policleto el Joven','Monumento corágico de Lisícrates (Atenas, Grecia)|Templo de Zeus Olímpico (Atenas, Grecia)|Tholos de Epidauro (Grecia)',1,'corintia'),
S('helenistico','Helenístico','Tras Alejandro Magno',-323,-31,'AN','Clásico','Escala monumental y escenográfica|Stoas y ágoras planificadas|Trazado hipodámico en retícula|Teatros en ladera','Mármol, piedra local','ST','CUL EDU PUB','Pitio, Hermógenes, Dinócrates','Altar de Pérgamo (hoy Museo de Pérgamo, Berlín)|Ciudad de Priene (Aydın, Turquía)|Didymaion (Dídima, Turquía)',2,'templo'),
S('etrusco','Etrusco','Italia central prerromana',-800,-100,'AN','Antiguo','Templo sobre podio con pórtico profundo|Arco de dovelas|Tumbas excavadas que reproducen casas','Toba volcánica, terracota, madera','T','REL','Anónimo','Porta Marzia (Perugia, Italia)|Necrópolis de la Banditaccia (Cerveteri, Italia)|Santuario de Portonaccio (Veyes, Italia)',1,'arco'),
S('romano','Romano','República e Imperio',-509,476,'AN','Clásico','Arco, bóveda y cúpula|Hormigón romano (opus caementicium)|Órdenes superpuestos y orden toscano|Acueductos, termas y calzadas','Hormigón, ladrillo, travertino, mármol','ST','CUL DEP GOB INF TRA PUB','Vitruvio, Apolodoro de Damasco, Rabirio','Panteón (Roma, Italia)|Coliseo (Roma, Italia)|Pont du Gard (Vers-Pont-du-Gard, Francia)',1,'arco'),
S('sasanida','Sasánida','Imperio persa sasánida',224,651,'AN','Antiguo','Iwán abovedado monumental|Cúpula sobre trompas|Bóvedas de ladrillo sin cimbra','Ladrillo, mampostería, yeso','S','GOB','Anónimo','Taq Kasra (Ctesifonte, Irak)|Palacio de Ardashir (Firuzabad, Irán)',1,'iwan'),
S('nubio','Nubio (Kush)','Reinos de Kerma, Napata y Meroe',-2500,350,'AF','Antiguo','Pirámides de pendiente pronunciada|Deffufas de adobe|Templos de influencia egipcia','Arenisca, adobe','S','REL','Anónimo','Pirámides de Meroe (Sudán)|Deffufa occidental (Kerma, Sudán)|Templo de Amón en Jebel Barkal (Sudán)',2,'piramide'),

/* ── Europa medieval ── */
S('paleocristiano','Paleocristiano','Tras el Edicto de Milán (313)',313,600,'EU','Medieval','Basílica de tres naves con ábside|Atrio y nártex|Cubierta de madera y mosaicos','Ladrillo, mármol reutilizado, madera','ST','REL','Anónimo','Basílica de Santa Sabina (Roma, Italia)|Santa Maria Maggiore (Roma, Italia)|Mausoleo de Santa Constanza (Roma, Italia)',1,'basilica'),
S('bizantino','Bizantino','Imperio romano de Oriente',330,1453,'EU','Medieval','Cúpula sobre pechinas|Planta central o de cruz griega|Mosaicos de fondo dorado|Luz que perfora la base de la cúpula','Ladrillo, mármol, mosaico de vidrio','ST','REL CUL','Antemio de Tralles, Isidoro de Mileto','Santa Sofía (Estambul, Turquía)|Basílica de San Vital (Rávena, Italia)|Basílica de San Marcos (Venecia, Italia)',1,'cupula'),
S('prerromanico','Prerrománico','Visigodo, asturiano, carolingio y otoniano',600,1000,'EU','Medieval','Muros masivos y vanos pequeños|Bóveda de cañón y arco de herradura visigodo|Westwerk carolingio','Sillería, mampostería','TF','REL','Odón de Metz','Capilla Palatina (Aquisgrán, Alemania)|Santa María del Naranco (Oviedo, España)|Iglesia de San Miguel (Hildesheim, Alemania)',1,'arco'),
S('stavkirke','Iglesias de madera escandinavas (stavkirke)','Noruega medieval',1100,1350,'EU','Medieval','Estructura de postes de madera|Cubiertas superpuestas muy inclinadas|Tallas de dragones y entrelazos','Madera de pino, alquitrán','F','REL','Anónimo','Iglesia de madera de Urnes (Noruega)|Iglesia de madera de Borgund (Noruega)',2,'pagoda'),
S('romanico','Románico','Europa occidental',1000,1200,'EU','Medieval','Arco de medio punto y bóveda de cañón|Muros gruesos con contrafuertes|Portadas y capiteles esculpidos','Piedra sillar','TF','REL EDU','Maestro Mateo, Gunzo (Cluny III)','Catedral de Santiago de Compostela (España)|Catedral de Pisa (Italia)|Abadía de Cluny (Francia)',2,'arco'),
S('cisterciense','Cisterciense','Reforma de San Bernardo',1098,1300,'EU','Medieval','Austeridad ornamental|Luz como materia|Planta modular claustral con enfermería','Piedra','TF','REL EDU SAL','Bernardo de Claraval (promotor)','Abadía de Fontenay (Francia)|Abadía de Le Thoronet (Francia)|Monasterio de Poblet (España)',2,'basilica'),
S('castillo','Militar medieval','Castillos y ciudades amuralladas',900,1500,'EU','Medieval','Torres del homenaje y murallas|Matacanes y almenas|Fosos y puentes levadizos','Piedra','TF','SEG GOB','Jaime de Saboya (James of St George)','Castillo de Conwy (Gales, Reino Unido)|Ciudadela de Carcasona (Francia)|Krak de los Caballeros (Siria)',1,'torre'),
S('gotico-temprano','Gótico temprano','Île-de-France',1140,1200,'EU','Medieval','Arco apuntado y bóveda de crucería|Alzado de cuatro niveles|Deambulatorio luminoso','Piedra caliza, vidrio','TF','REL','Abad Suger (promotor)','Basílica de Saint-Denis (Francia)|Catedral de Notre-Dame (París, Francia)|Catedral de Laon (Francia)',1,'ojiva'),
S('gotico-clasico','Gótico clásico','Francia',1194,1250,'EU','Medieval','Arbotantes exteriores|Alzado de tres niveles|Grandes vitrales','Piedra, vidrio','TF','REL','Robert de Luzarches, Jean d\'Orbais','Catedral de Chartres (Francia)|Catedral de Reims (Francia)|Catedral de Amiens (Francia)',1,'ojiva'),
S('gotico-radiante','Gótico radiante (rayonnant)','Francia y Europa',1240,1350,'EU','Medieval','Muro desmaterializado en vitrales|Tracería de barras|Grandes rosetones','Piedra, vidrio, plomo','TF','REL','Pierre de Montreuil, Jean de Chelles','Sainte-Chapelle (París, Francia)|Rosetones del transepto de Notre-Dame (París, Francia)|Coro de la Catedral de Colonia (Alemania)',1,'roseton'),
S('gotico-flamigero','Gótico flamígero','Francia, Flandes y España',1350,1530,'EU','Medieval','Tracería en forma de llama|Bóvedas estrelladas y nervios decorativos|Agujas caladas','Piedra','TF','REL GOB','Jean Texier, Simón de Colonia','Iglesia de Saint-Maclou (Ruan, Francia)|Capilla del Condestable, Catedral de Burgos (España)|Ayuntamiento de Bruselas (Bélgica)',1,'ojiva'),
S('gotico-perpendicular','Gótico perpendicular','Inglaterra',1350,1540,'EU','Medieval','Bóveda de abanico|Tracería rectilínea vertical|Ventanales enormes','Piedra, vidrio','TF','REL EDU','John Wastell, Robert y William Vertue','Capilla del King\'s College (Cambridge, Reino Unido)|Abadía de Bath (Reino Unido)|Capilla de Enrique VII, Abadía de Westminster (Londres)',1,'ojiva'),
S('gotico-ladrillo','Gótico de ladrillo (Backsteingotik)','Báltico y Liga Hanseática',1200,1550,'EU','Medieval','Ladrillo como material único|Hastiales escalonados|Volúmenes macizos','Ladrillo cocido y vidriado','F','REL GOB COM','Anónimo','Iglesia de Santa María (Lübeck, Alemania)|Castillo de Malbork (Polonia)',2,'ladrillo'),
S('isabelino','Gótico isabelino (hispanoflamenco)','Reyes Católicos',1474,1517,'EU','Medieval','Decoración heráldica|Fusión gótico-mudéjar|Claustros profusos','Piedra, yeso','ST','REL GOB','Juan Guas, Simón de Colonia','Monasterio de San Juan de los Reyes (Toledo, España)|Colegio de San Gregorio (Valladolid, España)',1,'ojiva'),
S('manuelino','Manuelino','Portugal de Manuel I',1490,1530,'EU','Medieval','Motivos marítimos: cuerdas, algas, esferas armilares|Columnas torsas|Portales exuberantes','Piedra lioz, caliza','T','REL SEG','Diogo de Boitaca, João de Castilho, Francisco de Arruda','Monasterio de los Jerónimos (Lisboa, Portugal)|Torre de Belém (Lisboa, Portugal)|Convento de Cristo (Tomar, Portugal)',1,'ojiva'),
S('mudejar','Mudéjar','Península ibérica cristiana',1100,1600,'EU','Medieval','Ladrillo aparejado decorativo|Armaduras y alfarjes de madera|Azulejos y yeserías','Ladrillo, yeso, madera, cerámica','ST','REL GOB CUL','Alarifes mudéjares (anónimo)','Torre de El Salvador (Teruel, España)|Palacio de Pedro I, Real Alcázar (Sevilla, España)|Sinagoga del Tránsito (Toledo, España)',2,'ladrillo'),
S('ruso','Ortodoxo ruso','De la Rus de Kiev a Moscovia',988,1700,'EU','Medieval','Cúpulas bulbosas doradas o policromas|Tejados en tienda (shatior)|Iglesias de madera ensamblada','Ladrillo, madera, cobre','F','REL','Barma y Póstnik Yákovlev','Catedral de San Basilio (Moscú, Rusia)|Iglesia de la Transfiguración (Kizhi, Rusia)|Catedral de Santa Sofía (Kiev, Ucrania)',1,'bulbo'),

/* ── Mundo islámico ── */
S('omeya','Islámico omeya','Omeyas de Damasco y de Córdoba',661,1031,'IS','Islámico','Arco de herradura con dovelas bicolores|Patio con fuente y sala hipóstila|Mosaicos y ataurique','Piedra, ladrillo, mármol, mosaico','ST','REL CUL','Constructores de Abd al-Malik, al-Walid I y Abd al-Rahman I','Cúpula de la Roca (Jerusalén)|Gran Mezquita de Damasco (Siria)|Mezquita de Córdoba (España)',2,'herradura'),
S('abasi','Islámico abasí','Califato abasí',750,1258,'IS','Islámico','Minarete helicoidal (malwiya)|Grandes recintos de ladrillo|Estuco tallado y arcos apuntados','Ladrillo cocido, adobe, estuco','S','REL GOB','Anónimo; Ahmad ibn Tulun (promotor)','Gran Mezquita de Samarra (Irak)|Mezquita de Ibn Tulun (El Cairo, Egipto)|Palacio de Ujaidir (Irak)',2,'minarete'),
S('mameluco','Islámico fatimí y mameluco','Egipto y Siria',909,1517,'IS','Islámico','Muqarnas en piedra|Cúpulas de piedra tallada|Mashrabiyas (celosías de madera)|Complejos funerarios con madrasa y hospital','Piedra, mármol, madera','S','REL EDU SAL','Anónimo','Mezquita de al-Azhar (El Cairo, Egipto)|Mezquita-madrasa del sultán Hasán (El Cairo, Egipto)|Complejo de Qalawun con bimaristán (El Cairo, Egipto)',2,'celosia'),
S('selyucida','Islámico selyúcida','Persia y Anatolia',1037,1300,'IS','Islámico','Planta de cuatro iwanes|Muqarnas|Ladrillo decorativo y caravasares','Ladrillo, piedra, azulejo','ST','REL HOS TRA','Anónimo','Mezquita del Viernes (Isfahán, Irán)|Caravasar Sultan Han (Aksaray, Turquía)|Madrasa Ince Minareli (Konya, Turquía)',2,'iwan'),
S('almohade','Islámico almorávide y almohade','Magreb y al-Ándalus',1040,1269,'IS','Islámico','Paños de sebka (rombos)|Arcos polilobulados y de lambrequines|Austeridad decorativa','Ladrillo, tapial, piedra','S','REL','Ahmad ibn Baso (Giralda)','Giralda (Sevilla, España)|Mezquita Kutubía (Marrakech, Marruecos)|Torre Hassan (Rabat, Marruecos)',2,'minarete'),
S('nazari','Islámico nazarí','Reino de Granada',1238,1492,'IS','Islámico','Patios con agua y vegetación|Yeserías y mocárabes|Arcos peraltados sobre columnas finas|Ventilación y sombra','Ladrillo, tapial, yeso, madera, azulejo','ST','HOS CUL PUB','Alarifes nazaríes (anónimo)','Alhambra (Granada, España)|Generalife (Granada, España)',3,'herradura'),
S('timurida','Islámico timúrida','Asia central e Irán',1370,1507,'IS','Islámico','Cúpulas bulbosas acanaladas sobre tambor alto|Mosaico de azulejo|Pishtaq monumental','Ladrillo, azulejo','ST','REL EDU','Qavam al-Din Shirazi','Mausoleo Gur-e Amir (Samarcanda, Uzbekistán)|Mezquita Bibi-Khanym (Samarcanda, Uzbekistán)|Mezquita de Goharshad (Mashhad, Irán)',2,'bulbo'),
S('safavida','Islámico persa safávida','Irán safávida',1501,1736,'IS','Islámico','Cúpulas de doble cáscara revestidas de azulejo|Plazas urbanas monumentales|Jardines persas (chahar bagh)|Puentes-presa','Ladrillo, azulejo haft rangi','ST','REL PUB COM','Ali Akbar Isfahani, Mohammad Reza Isfahani','Plaza Naqsh-e Yahán (Isfahán, Irán)|Mezquita del Shah (Isfahán, Irán)|Puente Khaju (Isfahán, Irán)',2,'bulbo'),
S('otomano','Islámico otomano','Imperio otomano (apogeo s. XVI-XVII)',1299,1922,'IS','Islámico','Cúpula central con semicúpulas en cascada|Minaretes de lápiz|Külliye: mezquita, escuela, hospital y baño|Azulejo de Iznik','Piedra, ladrillo, plomo, azulejo','ST','REL SAL EDU SOC','Mimar Sinan, Sedefkâr Mehmed Ağa','Mezquita de Süleymaniye (Estambul, Turquía)|Mezquita Selimiye (Edirne, Turquía)|Mezquita del Sultán Ahmed (Estambul, Turquía)',2,'minarete'),
S('mogol','Islámico mogol','India mogol',1526,1857,'IS','Islámico','Cúpula bulbosa sobre tambor|Chhatris (pabellones)|Jardín charbagh simétrico con agua|Incrustación de piedras (pietra dura)','Arenisca roja, mármol blanco','SH','REL CUL PUB','Ustad Ahmad Lahauri, Mirak Mirza Ghiyas','Taj Mahal (Agra, India)|Tumba de Humayun (Delhi, India)|Fatehpur Sikri (Uttar Pradesh, India)',2,'bulbo'),
S('badgir','Vernácula persa del desierto','Tradición iraní (vigente)',-500,null,'IS','Vernáculo','Torres de viento (badgir)|Qanat y aljibes enfriados|Patios hundidos y cúpulas de adobe','Adobe, ladrillo, revoque de barro y paja','S','RES HOS','Constructores tradicionales (memar)','Ciudad histórica de Yazd (Irán)|Jardín Dowlatabad (Yazd, Irán)|Casas históricas de Kashan (Irán)',3,'adobe'),

/* ── Renacimiento y Barroco ── */
S('renacimiento-temprano','Renacimiento temprano (Quattrocento)','Florencia',1420,1500,'EU','Renacimiento y Barroco','Proporción y perspectiva|Órdenes clásicos revividos|Arcadas sobre columnas|Cúpula de doble cáscara','Piedra serena, ladrillo, mármol','T','SAL CUL REL EDU','Filippo Brunelleschi, Leon Battista Alberti, Michelozzo','Cúpula de Santa Maria del Fiore (Florencia, Italia)|Ospedale degli Innocenti (Florencia, Italia)|Basílica de Sant\'Andrea (Mantua, Italia)',1,'cupula'),
S('alto-renacimiento','Alto Renacimiento','Roma',1500,1530,'EU','Renacimiento y Barroco','Planta central ideal|Monumentalidad serena|Palacio urbano con patio','Travertino, ladrillo, mármol','T','REL GOB RES','Donato Bramante, Rafael, Antonio da Sangallo el Joven','Tempietto de San Pietro in Montorio (Roma, Italia)|Palazzo Farnese (Roma, Italia)|Basílica de San Pedro, proyecto inicial (Ciudad del Vaticano)',1,'cupula'),
S('manierismo','Manierismo','Italia',1520,1600,'EU','Renacimiento y Barroco','Ruptura deliberada de reglas clásicas|Tensión y ambigüedad espacial|Escaleras escultóricas','Piedra, mármol, estuco','T','CUL GOB','Miguel Ángel, Giulio Romano, Giorgio Vasari','Biblioteca Laurenciana (Florencia, Italia)|Palazzo Te (Mantua, Italia)|Galería de los Uffizi (Florencia, Italia)',1,'columna'),
S('plateresco','Plateresco','España',1490,1560,'EU','Renacimiento y Barroco','Fachadas-retablo con grutescos|Medallones y candelieri|Estructura todavía gótica','Arenisca de Villamayor, piedra','ST','EDU GOB HOS','Rodrigo Gil de Hontañón, Juan de Álava, Diego de Riaño','Fachada de la Universidad de Salamanca (España)|Hostal de San Marcos (León, España)|Ayuntamiento de Sevilla (España)',1,'voluta'),
S('herreriano','Herreriano','España de Felipe II',1563,1650,'EU','Renacimiento y Barroco','Austeridad geométrica|Granito desnudo|Chapiteles de pizarra y bolas','Granito, pizarra','TF','REL GOB EDU','Juan de Herrera, Juan Bautista de Toledo, Juan Gómez de Mora','Monasterio de El Escorial (San Lorenzo de El Escorial, España)|Catedral de Valladolid (España)|Plaza Mayor (Madrid, España)',1,'templo'),
S('renacimiento-frances','Renacimiento francés','Valle del Loira y París',1515,1610,'EU','Renacimiento y Barroco','Castillos con tejados altos y chimeneas|Órdenes superpuestos|Escalera de doble hélice','Toba calcárea, pizarra','TF','HOS GOB CUL','Pierre Lescot, Philibert de l\'Orme, Domenico da Cortona','Castillo de Chambord (Francia)|Ala Lescot del Louvre (París, Francia)|Palacio de Fontainebleau (Francia)',1,'torre'),
S('tudor','Tudor e isabelino inglés','Inglaterra',1485,1603,'EU','Renacimiento y Barroco','Entramado de madera visible|Grandes ventanales con parteluz|Chimeneas agrupadas','Ladrillo, roble, vidrio','TF','RES EDU HOS','Robert Smythson','Palacio de Hampton Court (Londres, Reino Unido)|Hardwick Hall (Derbyshire, Reino Unido)',1,'ladrillo'),
S('palladianismo','Palladianismo','Véneto, Inglaterra y EE.UU.',1540,1800,'EU','Renacimiento y Barroco','Pórtico de templo aplicado a la residencia|Serliana|Simetría y proporciones armónicas','Ladrillo estucado, piedra','T','RES GOB CUL','Andrea Palladio, Inigo Jones, Lord Burlington','Villa Capra La Rotonda (Vicenza, Italia)|Basílica Palladiana (Vicenza, Italia)|Chiswick House (Londres, Reino Unido)',1,'templo'),
S('barroco-italiano','Barroco italiano','Roma y Turín',1600,1750,'EU','Renacimiento y Barroco','Plantas ovaladas y curvas|Fachadas cóncavo-convexas|Luz dramática y escenografía urbana','Travertino, estuco, mármol','T','REL PUB CUL','Gian Lorenzo Bernini, Francesco Borromini, Guarino Guarini','San Carlo alle Quattro Fontane (Roma, Italia)|Sant\'Andrea al Quirinale (Roma, Italia)|Columnata de la Plaza de San Pedro (Ciudad del Vaticano)',1,'voluta'),
S('clasicismo-frances','Barroco clasicista francés','Francia de Luis XIV',1630,1715,'EU','Renacimiento y Barroco','Cubierta a la mansarda|Jardín a la francesa con ejes|Fachadas rítmicas y sobrias','Piedra caliza, pizarra','T','GOB HOS PUB','Louis Le Vau, Jules Hardouin-Mansart, André Le Nôtre, Claude Perrault','Palacio de Versalles (Francia)|Los Inválidos (París, Francia)|Columnata del Louvre (París, Francia)',1,'cupula'),
S('barroco-espanol','Barroco español','España',1600,1750,'EU','Renacimiento y Barroco','Fachadas-telón|Plazas mayores porticadas|Retablos dorados','Granito, piedra, madera dorada','ST','REL PUB','Fernando de Casas Novoa, Alberto de Churriguera, Narciso Tomé','Fachada del Obradoiro (Santiago de Compostela, España)|Plaza Mayor (Salamanca, España)|Transparente de la Catedral de Toledo (España)',1,'voluta'),
S('churrigueresco','Churrigueresco','España y Nueva España',1690,1780,'EU','Renacimiento y Barroco','Estípite (pilastra de pirámide invertida)|Ornamentación desbordante|Retablo trasladado a la fachada','Piedra, madera dorada, estuco','ST','REL','José Benito de Churriguera, Pedro de Ribera, Lorenzo Rodríguez','Retablo de San Esteban (Salamanca, España)|Antiguo Hospicio de San Fernando (Madrid, España)|Sagrario Metropolitano (Ciudad de México)',1,'voluta'),
S('barroco-centroeuropeo','Barroco centroeuropeo','Austria, Baviera y Bohemia',1680,1760,'EU','Renacimiento y Barroco','Plantas elípticas entrelazadas|Obra de arte total|Iluminación indirecta','Ladrillo estucado, mármol, fresco','TF','REL CUL','Balthasar Neumann, Johann B. Fischer von Erlach, Jakob Prandtauer','Abadía de Melk (Austria)|Basílica de Vierzehnheiligen (Bad Staffelstein, Alemania)|Karlskirche (Viena, Austria)',1,'cupula'),
S('barroco-ingles','Barroco inglés','Inglaterra',1666,1730,'EU','Renacimiento y Barroco','Cúpulas y torres compuestas|Monumentalidad sobria|Reconstrucción tras el incendio de Londres','Piedra de Portland','T','REL GOB RES','Christopher Wren, John Vanbrugh, Nicholas Hawksmoor','Catedral de San Pablo (Londres, Reino Unido)|Palacio de Blenheim (Woodstock, Reino Unido)|Castle Howard (Yorkshire, Reino Unido)',1,'cupula'),
S('rococo','Rococó','Francia y Europa central',1730,1780,'EU','Renacimiento y Barroco','Rocalla asimétrica|Colores pastel y dorados|Interiores ligeros con espejos','Estuco, madera, espejo','T','CUL HOS REL','François de Cuvilliés, Dominikus Zimmermann, Georg W. von Knobelsdorff','Pabellón de Amalienburg (Múnich, Alemania)|Iglesia de Wies (Steingaden, Alemania)|Palacio de Sanssouci (Potsdam, Alemania)',1,'voluta'),

/* ── Neoclásico, historicismos y siglo XIX ── */
S('georgiano','Georgiano','Gran Bretaña e Irlanda',1714,1830,'EU','Neoclásico','Fachadas de proporción estricta|Terrazas urbanas y crescents|Ventanas de guillotina','Ladrillo, piedra de Bath','T','RES PUB','John Wood el Viejo, John Wood el Joven, Robert Adam','Royal Crescent (Bath, Reino Unido)|The Circus (Bath, Reino Unido)|New Town (Edimburgo, Reino Unido)',2,'templo'),
S('neoclasico','Neoclásico','Ilustración',1750,1850,'EU','Neoclásico','Retorno a la Antigüedad grecorromana|Pórticos y frontones puros|Volúmenes simples y simetría','Piedra, estuco','ST','CUL GOB EDU REL','Jacques-Germain Soufflot, Karl Friedrich Schinkel, Juan de Villanueva','Panteón (París, Francia)|Altes Museum (Berlín, Alemania)|Museo del Prado (Madrid, España)',1,'templo'),
S('visionario','Arquitectura revolucionaria (visionaria)','Francia de la Ilustración',1770,1800,'EU','Neoclásico','Geometría pura (esfera, cubo, pirámide)|Arquitectura parlante|Escala utópica','Piedra','T','IND CUL','Claude-Nicolas Ledoux, Étienne-Louis Boullée','Salinas Reales de Arc-et-Senans (Francia)|Rotonda de La Villette (París, Francia)|Cenotafio de Newton (proyecto, 1784)',1,'cupula'),
S('federal','Neoclásico americano (Federal y Greek Revival)','Estados Unidos',1780,1860,'NA','Neoclásico','Pórticos griegos y cúpulas|Ladrillo rojo con detalles blancos|Simbolismo republicano','Ladrillo, madera, mármol','TH','GOB EDU RES','Thomas Jefferson, Benjamin Latrobe, William Thornton','Capitolio (Washington D.C., EE.UU.)|Monticello (Charlottesville, EE.UU.)|Universidad de Virginia (Charlottesville, EE.UU.)',1,'templo'),
S('neoclasico-latam','Neoclásico republicano latinoamericano','Independencias y repúblicas',1790,1930,'LA','Neoclásico','Pórticos y frontones en edificios de Estado|Plazas cívicas|Teatros y capitolios','Ladrillo, piedra, estuco','TA','GOB CUL EDU','Joaquín Toesca, Thomas Reed','Palacio de La Moneda (Santiago, Chile)|Capitolio Nacional (Bogotá, Colombia)|Teatro Municipal de Santiago (Chile)',1,'templo'),
S('neogotico','Neogótico','Revival gótico',1740,1920,'EU','Historicismo','Arcos apuntados y agujas|Asimetría pintoresca|Ideal moral medieval','Piedra, ladrillo, hierro','TF','REL GOB EDU','Augustus Pugin, Charles Barry, Eugène Viollet-le-Duc, James Renwick','Palacio de Westminster (Londres, Reino Unido)|Iglesia Votiva (Viena, Austria)|Catedral de San Patricio (Nueva York, EE.UU.)',1,'ojiva'),
S('neorromanico','Neorrománico','Revival románico (incl. románico richardsoniano)',1830,1920,'EU','Historicismo','Arcos de medio punto masivos|Torres macizas|Sillería almohadillada','Piedra, ladrillo','TF','REL GOB EDU','Henry Hobson Richardson, Friedrich von Gärtner','Trinity Church (Boston, EE.UU.)|Ludwigskirche (Múnich, Alemania)|Allegheny County Courthouse (Pittsburgh, EE.UU.)',1,'arco'),
S('neomudejar','Neomudéjar y neoárabe','España y América',1870,1930,'EU','Historicismo','Ladrillo visto con arcos de herradura|Azulejería|Torres de inspiración islámica','Ladrillo, cerámica, hierro','ST','DEP EDU CUL','Emilio Rodríguez Ayuso, José Espeliú, Aníbal González','Plaza de toros de Las Ventas (Madrid, España)|Escuelas Aguirre (Madrid, España)|Plaza de España (Sevilla, España)',2,'herradura'),
S('haussmann','Urbanismo haussmanniano','París del Segundo Imperio',1853,1914,'EU','Historicismo','Bulevares y ejes|Manzana con alineación y altura reguladas|Redes de agua y alcantarillado','Piedra caliza, hierro forjado, zinc','T','MIX RES PUB','Georges-Eugène Haussmann, Jean-Charles Alphand','Bulevares de París (Francia)|Parque de las Buttes-Chaumont (París, Francia)',1,'portal'),
S('eclecticismo','Eclecticismo','Europa y América',1850,1930,'GL','Historicismo','Mezcla libre de estilos históricos|Ornamento como representación|Programas nuevos con lenguajes antiguos','Piedra, ladrillo, hierro, estuco','STA','CUL GOB COM EVE','Charles Garnier, Adamo Boari, Francesco Tamburini','Ópera Garnier (París, Francia)|Palacio de Bellas Artes (Ciudad de México)|Teatro Colón (Buenos Aires, Argentina)',1,'cupula'),
S('beaux-arts','Beaux-Arts','École des Beaux-Arts de París',1870,1930,'NA','Historicismo','Composición axial y jerarquizada|Escalinatas y salas monumentales|Integración de escultura','Piedra, acero oculto, mármol','T','TRA CUL EDU GOB','McKim, Mead & White; Carrère & Hastings; Charles Girault','Biblioteca Pública de Nueva York (EE.UU.)|Biblioteca Pública de Boston (EE.UU.)|Petit Palais (París, Francia)',1,'templo'),
S('hierro','Arquitectura del hierro y el cristal','Revolución industrial',1779,1910,'GL','Moderno temprano','Hierro fundido y forjado prefabricado|Grandes luces con vidrio|Estaciones, mercados y exposiciones','Hierro, vidrio','TH','TRA COM EVE IND','Joseph Paxton, Gustave Eiffel, Henri Labrouste','Crystal Palace (Londres, 1851, desaparecido)|Torre Eiffel (París, Francia)|Palacio de Cristal, antiguo Mercado Sur (Guayaquil, Ecuador)',1,'cercha'),
S('hospital-pabellones','Hospital de pabellones (higienismo)','Reforma sanitaria inspirada por Florence Nightingale',1854,1930,'EU','Moderno temprano','Pabellones aislados con ventilación cruzada|Galerías de conexión cubiertas|Jardines y asoleamiento entre pabellones','Ladrillo, hierro, piedra','TH','SAL EDU','Florence Nightingale (programa), Martin-Pierre Gauthier, Lluís Domènech i Montaner','Hospital Lariboisière (París, Francia)|St Thomas\' Hospital (Londres, Reino Unido)|Hospital de la Santa Creu i Sant Pau (Barcelona, España)',2,'portal'),
S('arts-crafts','Arts & Crafts','Gran Bretaña y EE.UU.',1860,1920,'EU','Moderno temprano','Honestidad material y oficio artesanal|Planta libre según el uso|Integración con el jardín','Ladrillo, madera, piedra local','TF','RES EDU','Philip Webb, William Morris, Greene & Greene, Charles Voysey','Red House (Bexleyheath, Reino Unido)|Gamble House (Pasadena, EE.UU.)|Standen (West Sussex, Reino Unido)',2,'ladrillo'),
S('art-nouveau','Art Nouveau','Bélgica y Francia',1890,1914,'EU','Moderno temprano','Línea en látigo y formas vegetales|Hierro y vidrio expresivos|Diseño total del interior','Hierro, vidrio, piedra, cerámica','T','RES COM TRA CUL','Victor Horta, Hector Guimard, Henry van de Velde','Casa Tassel (Bruselas, Bélgica)|Entradas del Metro de París (Francia)|Casa Horta (Bruselas, Bélgica)',1,'organica'),
S('modernisme','Modernismo catalán','Barcelona',1888,1926,'EU','Moderno temprano','Formas orgánicas y arcos catenarios|Trencadís y artes aplicadas|Hospitales y edificios públicos de pabellones','Ladrillo, piedra, cerámica, hierro forjado','T','REL SAL CUL RES','Antoni Gaudí, Lluís Domènech i Montaner, Josep Puig i Cadafalch','Sagrada Familia (Barcelona, España)|Hospital de Sant Pau (Barcelona, España)|Palau de la Música Catalana (Barcelona, España)',2,'catenaria'),
S('glasgow','Escuela de Glasgow','Escocia',1890,1914,'EU','Moderno temprano','Geometría vertical estilizada|Ventanales de taller|Interiores integrales','Piedra, madera, vidrio','F','EDU RES','Charles Rennie Mackintosh, Margaret Macdonald','Escuela de Arte de Glasgow (Reino Unido)|Hill House (Helensburgh, Reino Unido)',1,'reticula'),
S('secesion','Secesión vienesa','Viena',1897,1918,'EU','Moderno temprano','Geometría y ornamento contenido|Revestimientos de placas|Arte total (Wiener Werkstätte)','Mármol en placas, aluminio, vidrio','TF','CUL OFI SAL RES','Otto Wagner, Joseph Maria Olbrich, Josef Hoffmann','Edificio de la Secesión (Viena, Austria)|Caja Postal de Ahorros (Viena, Austria)|Sanatorio Purkersdorf (Austria)',1,'reticula'),
S('chicago','Escuela de Chicago','Chicago tras el incendio de 1871',1880,1910,'NA','Moderno temprano','Esqueleto de acero y ascensor|Ventana Chicago|Base, fuste y remate','Acero, terracota, vidrio','TF','OFI COM','William Le Baron Jenney, Louis Sullivan, Daniel Burnham, John Root','Edificio Wainwright (San Luis, EE.UU.)|Reliance Building (Chicago, EE.UU.)|Almacenes Carson Pirie Scott (Chicago, EE.UU.)',1,'rascacielos'),
S('prairie','Prairie School','Medio Oeste de EE.UU.',1900,1920,'NA','Moderno temprano','Horizontalidad y aleros profundos|Chimenea central|Planta abierta en cruz','Ladrillo romano, madera, vidrio emplomado','T','RES REL','Frank Lloyd Wright, Walter Burley Griffin, George W. Maher','Casa Robie (Chicago, EE.UU.)|Unity Temple (Oak Park, EE.UU.)|Casa Darwin D. Martin (Búfalo, EE.UU.)',2,'voladizo'),
S('werkbund','Deutscher Werkbund (protorracionalismo)','Alemania',1907,1930,'EU','Moderno temprano','Estética industrial|Muro cortina temprano|Estandarización','Acero, vidrio, ladrillo','TF','IND OFI','Peter Behrens, Walter Gropius, Adolf Meyer, Bruno Taut','Fábrica de turbinas AEG (Berlín, Alemania)|Fábrica Fagus (Alfeld, Alemania)|Colonia Weissenhof (Stuttgart, Alemania)',1,'reticula'),
S('futurismo','Futurismo italiano','Italia',1909,1920,'EU','Moderno temprano','Dinamismo y velocidad|Ciudad-máquina en varios niveles|Circulaciones expresadas en fachada','Hormigón, acero, vidrio (proyectos)','T','TRA FUT','Antonio Sant\'Elia, Mario Chiattone','La Città Nuova (proyecto, 1914)|Monumento a los Caídos (Como, Italia; sobre diseño de Sant\'Elia)',0,'rascacielos'),
S('ciudad-jardin','Ciudad jardín','Reino Unido y mundo',1898,1939,'EU','Moderno temprano','Baja densidad con cinturón verde|Viviendas con jardín|Autosuficiencia comunitaria','Ladrillo, teja','T','RES PUB','Ebenezer Howard, Raymond Unwin, Barry Parker','Letchworth Garden City (Reino Unido)|Welwyn Garden City (Reino Unido)',2,'hoja'),
S('indosarraceno','Indo-sarraceno (colonial británico)','India británica',1850,1930,'AS','Historicismo','Fusión gótica, mogol e hindú|Cúpulas, chhatris y arcos apuntados|Edificios públicos coloniales','Piedra, ladrillo, mármol','HS','TRA GOB EDU','Frederick William Stevens, William Emerson, Robert F. Chisholm','Estación Chhatrapati Shivaji (Bombay, India)|Victoria Memorial (Calcuta, India)',1,'bulbo'),
S('estalinista','Clasicismo socialista','URSS y bloque oriental',1933,1955,'EU','Historicismo','Monumentalismo con ornamento clásico|Rascacielos escalonados|Avenidas ceremoniales','Acero, ladrillo, piedra','F','GOB EDU CUL','Lev Rúdnev, Borís Iofán','Universidad Estatal de Moscú (Rusia)|Palacio de la Cultura y la Ciencia (Varsovia, Polonia)',0,'rascacielos'),

/* ── Moderno ── */
S('expresionismo','Expresionismo','Alemania y Países Bajos',1910,1933,'EU','Moderno','Formas escultóricas y dinámicas|Ladrillo y hormigón plásticos|Visión cristalina utópica','Ladrillo clinker, hormigón','TF','CUL CIE OFI','Erich Mendelsohn, Fritz Höger, Hans Poelzig, Rudolf Steiner','Torre Einstein (Potsdam, Alemania)|Chilehaus (Hamburgo, Alemania)|Goetheanum (Dornach, Suiza)',1,'organica'),
S('amsterdam','Escuela de Ámsterdam','Países Bajos',1910,1930,'EU','Moderno','Ladrillo modelado y expresivo|Vivienda social como monumento|Detalle artesanal','Ladrillo, teja','TF','RES SOC','Michel de Klerk, Piet Kramer, Johan van der Mey','Het Schip (Ámsterdam, Países Bajos)|Scheepvaarthuis (Ámsterdam, Países Bajos)',2,'ladrillo'),
S('constructivismo','Constructivismo ruso','URSS',1917,1932,'EU','Moderno','Estructura y función expresadas|Condensadores sociales|Composición dinámica','Hormigón, acero, vidrio','F','SOC CUL RES','Konstantín Mélnikov, Moiséi Guínzburg, Vladímir Shújov, hermanos Vesnín','Club obrero Rusakov (Moscú, Rusia)|Edificio Narkomfin (Moscú, Rusia)|Torre Shújov (Moscú, Rusia)',1,'decon'),
S('de-stijl','De Stijl (neoplasticismo)','Países Bajos',1917,1931,'EU','Moderno','Planos ortogonales que se deslizan|Colores primarios y no-colores|Espacio continuo','Ladrillo, madera, acero, revoque','T','RES CUL','Gerrit Rietveld, J. J. P. Oud, Theo van Doesburg','Casa Rietveld Schröder (Utrecht, Países Bajos)|Café De Unie (Róterdam, Países Bajos)',1,'reticula'),
S('bauhaus','Bauhaus','Weimar, Dessau y Berlín',1919,1933,'EU','Moderno','Función y producción industrial|Muro cortina y volúmenes asimétricos|Unidad de arte y técnica','Hormigón, acero, vidrio','TF','EDU OFI RES','Walter Gropius, Hannes Meyer, Ludwig Mies van der Rohe','Edificio de la Bauhaus (Dessau, Alemania)|Casas de los Maestros (Dessau, Alemania)|Ciudad Blanca (Tel Aviv, Israel)',1,'reticula'),
S('art-deco','Art Déco','Internacional',1920,1940,'GL','Moderno','Geometría escalonada y zigzag|Ornamento estilizado y lujoso|Rascacielos con coronamiento','Acero, hormigón, piedra, metales cromados','THS','OFI COM CUL HOS','William Van Alen, Shreve, Lamb & Harmon, Heitor da Silva Costa','Edificio Chrysler (Nueva York, EE.UU.)|Empire State Building (Nueva York, EE.UU.)|Cristo Redentor (Río de Janeiro, Brasil)',1,'rascacielos'),
S('streamline','Streamline Moderne','EE.UU.',1930,1945,'NA','Moderno','Esquinas curvas y franjas horizontales|Estética aerodinámica|Ojos de buey y vidrio en bloque','Hormigón, estuco, vidrio en bloque','HS','COM TRA HOS','Robert V. Derrah, Henry Hohauser','Edificio Coca-Cola (Los Ángeles, EE.UU.)|Distrito Art Déco de Miami Beach (EE.UU.)',1,'aerodinamica'),
S('racionalismo','Racionalismo italiano','Italia de entreguerras',1926,1943,'EU','Moderno','Geometría estricta y retícula|Transparencia y orden|Mármol y hormigón','Hormigón, mármol, vidrio','T','GOB EDU OFI','Giuseppe Terragni, Adalberto Libera, Gruppo 7','Casa del Fascio (Como, Italia)|Casa Malaparte (Capri, Italia)|Palazzo della Civiltà Italiana (Roma, Italia)',1,'reticula'),
S('moderno','Movimiento Moderno / Estilo Internacional','CIAM, Europa y mundo',1927,1975,'GL','Moderno','Pilotis, planta y fachada libres, ventana corrida, terraza jardín|Ausencia de ornamento|Muro cortina','Hormigón armado, acero, vidrio','TSH','OFI EDU RES SAL GOB','Le Corbusier, Ludwig Mies van der Rohe, Walter Gropius, Philip Johnson','Villa Savoye (Poissy, Francia)|Pabellón de Barcelona (España)|Edificio Seagram (Nueva York, EE.UU.)',1,'pilotis'),
S('sanatorio','Moderno nórdico y sanatorial','Escandinavia y Países Bajos',1928,1975,'EU','Moderno','Higienismo: sol, aire y terrazas de cura|Humanismo material (madera, ladrillo)|Diseño desde la experiencia del paciente','Hormigón, madera, ladrillo, vidrio','TF','SAL EDU CUL','Alvar Aalto, Erik Gunnar Asplund, Jan Duiker, Arne Jacobsen','Sanatorio de Paimio (Finlandia)|Sanatorio Zonnestraal (Hilversum, Países Bajos)|Biblioteca de Viipuri (Víborg, Rusia)',2,'pilotis'),
S('organico','Arquitectura orgánica','Wright y seguidores',1935,null,'NA','Moderno','Integración con el paisaje|Materiales naturales expresados|Espacio fluido y voladizos','Piedra local, madera, hormigón','TS','RES CUL HOS REL','Frank Lloyd Wright, Bruce Goff, John Lautner, Imre Makovecz','Casa de la Cascada (Mill Run, EE.UU.)|Museo Solomon R. Guggenheim (Nueva York, EE.UU.)|Taliesin West (Scottsdale, EE.UU.)',2,'voladizo'),
S('organico-europeo','Organicismo europeo','Alemania',1925,1980,'EU','Moderno','Planta que sigue la función y el movimiento|Formas no ortogonales|Auditorios centrados en el oyente','Hormigón, ladrillo, madera','TF','CUL EDU','Hans Scharoun, Hugo Häring','Filarmónica de Berlín (Alemania)|Granja Garkau (Scharbeutz, Alemania)|Escuela Geschwister-Scholl (Lünen, Alemania)',1,'organica'),
S('midcentury','Mid-Century Modern (Case Study Houses)','California y EE.UU.',1945,1970,'NA','Moderno','Acero ligero y grandes vidrios|Continuidad interior-exterior|Prefabricación doméstica','Acero, vidrio, madera','TS','RES','Charles y Ray Eames, Pierre Koenig, Richard Neutra','Casa Eames, Case Study #8 (Pacific Palisades, EE.UU.)|Casa Stahl, Case Study #22 (Los Ángeles, EE.UU.)|Casa Kaufmann (Palm Springs, EE.UU.)',2,'voladizo'),
S('googie','Googie','EE.UU. de posguerra',1945,1970,'NA','Moderno','Formas futuristas de la era espacial|Cubiertas inclinadas y bumeranes|Rótulos de neón','Acero, vidrio, hormigón','TS','COM GAS TRA','Pereira & Luckman, Armet & Davis, Paul R. Williams','Theme Building (Aeropuerto de Los Ángeles, EE.UU.)|Space Needle (Seattle, EE.UU.)',0,'aerodinamica'),
S('cascarones','Cascarones de hormigón','España, México, Italia',1930,1975,'GL','Moderno','Láminas delgadas de doble curvatura|Paraboloides hiperbólicos|Gran luz con poco material','Hormigón armado, ferrocemento','THS','DEP EVE REL TRA','Félix Candela, Pier Luigi Nervi, Eduardo Torroja','Restaurante Los Manantiales (Xochimilco, México)|Palazzetto dello Sport (Roma, Italia)|Hipódromo de la Zarzuela (Madrid, España)',2,'catenaria'),
S('brasil-carioca','Modernismo brasileño (Escuela Carioca)','Brasil',1936,1975,'LA','Moderno','Brise-soleil y cobogó|Pilotis y planta baja libre|Curvas libres y paisajismo tropical','Hormigón armado, azulejo, cobogó','H','GOB EDU CUL SAL REL','Oscar Niemeyer, Lúcio Costa, Affonso Eduardo Reidy, Roberto Burle Marx','Palacio Gustavo Capanema (Río de Janeiro, Brasil)|Conjunto de Pampulha (Belo Horizonte, Brasil)|Brasilia (Distrito Federal, Brasil)',2,'pilotis'),
S('mexicano-moderno','Modernismo mexicano e integración plástica','México',1930,1970,'LA','Moderno','Integración de murales y arquitectura|Ciudades universitarias|Funcionalismo social y hospitalario','Hormigón, piedra volcánica, mosaico','TS','EDU SAL GOB CUL','Mario Pani, Juan O\'Gorman, Enrique del Moral, José Villagrán García','Ciudad Universitaria UNAM (Ciudad de México)|Biblioteca Central UNAM (Ciudad de México)|Instituto Nacional de Cardiología (Ciudad de México)',1,'reticula'),
S('barragan','Arquitectura emocional (Barragán)','México',1940,1988,'LA','Moderno','Muros de color intenso|Luz, silencio y agua|Patios y jardines cerrados','Muro de carga, estuco pigmentado, madera','TS','RES REL HOS','Luis Barragán, Mathias Goeritz','Casa Luis Barragán (Ciudad de México)|Cuadra San Cristóbal (Atizapán, México)|Capilla de las Capuchinas (Tlalpan, Ciudad de México)',2,'reticula'),
S('villanueva','Modernismo venezolano (síntesis de las artes)','Venezuela',1940,1975,'LA','Moderno','Calados y celosías para clima tropical|Integración de arte (Calder, Léger, Vasarely)|Pasillos cubiertos ventilados','Hormigón, bloques calados','H','EDU CUL','Carlos Raúl Villanueva','Ciudad Universitaria de Caracas (Venezuela)|Aula Magna con nubes de Calder (Caracas, Venezuela)|Museo de Bellas Artes (Caracas, Venezuela)',3,'celosia'),
S('cubano','Modernismo cubano','Cuba',1950,1965,'LA','Moderno','Bóveda catalana de ladrillo|Formas orgánicas sensuales|Patios y sombra','Ladrillo, terracota, hormigón','H','EDU CUL HOS','Ricardo Porro, Vittorio Garatti, Roberto Gottardi, Max Borges','Escuelas Nacionales de Arte (La Habana, Cuba)|Cabaret Tropicana, Arcos de Cristal (La Habana, Cuba)',2,'catenaria'),
S('paulista','Brutalismo paulista','São Paulo',1950,1985,'LA','Moderno','Grandes losas y luces de hormigón|Espacio público bajo la cubierta|Rampas y continuidad urbana','Hormigón visto','HT','EDU CUL DEP','João Batista Vilanova Artigas, Paulo Mendes da Rocha, Lina Bo Bardi','FAU-USP (São Paulo, Brasil)|MASP (São Paulo, Brasil)|SESC Pompéia (São Paulo, Brasil)',2,'brutal'),
S('ladrillo-latam','Ladrillo latinoamericano (Dieste, Salmona)','Uruguay y Colombia',1955,2007,'LA','Moderno','Cerámica armada y bóvedas gausas|Ladrillo como piel y estructura|Recorridos, patios y agua','Ladrillo, cerámica armada','HTA','REL CUL EDU RES IND','Eladio Dieste, Rogelio Salmona','Iglesia de Cristo Obrero (Atlántida, Uruguay)|Torres del Parque (Bogotá, Colombia)|Biblioteca Virgilio Barco (Bogotá, Colombia)',3,'ladrillo'),
S('argentino','Brutalismo argentino','Argentina',1960,1990,'LA','Moderno','Volúmenes de hormigón suspendidos|Plaza pública bajo el edificio','Hormigón visto','T','CUL OFI','Clorindo Testa, SEPRA','Biblioteca Nacional Mariano Moreno (Buenos Aires, Argentina)|Banco de Londres y América del Sud (Buenos Aires, Argentina)',1,'brutal'),
S('tropical-modern','Modernismo tropical','África occidental, India y Sri Lanka',1945,1990,'GL','Moderno','Cubiertas voladas y aleros profundos|Ventilación cruzada y celosías|Orientación solar rigurosa','Hormigón, bloque calado, madera','H','EDU SAL GOB HOS','Maxwell Fry, Jane Drew, Geoffrey Bawa, Otto Koenigsberger','Universidad de Ibadán (Nigeria)|Parlamento de Sri Lanka (Kotte, Sri Lanka)|Hotel Kandalama (Dambulla, Sri Lanka)',3,'voladizo'),
S('brutalismo','Brutalismo','Reino Unido y mundo',1950,1980,'GL','Moderno','Hormigón visto (béton brut)|Volúmenes masivos y expresivos|Programas sociales ambiciosos','Hormigón, ladrillo','TF','RES EDU GOB CUL SAL','Le Corbusier, Alison y Peter Smithson, Chamberlin Powell & Bon, Paul Rudolph','Unité d\'Habitation (Marsella, Francia)|Barbican Estate (Londres, Reino Unido)|Ayuntamiento de Boston (EE.UU.)',1,'brutal'),
S('kahn','Monumentalidad moderna (Louis Kahn)','EE.UU., India y Bangladés',1950,1974,'NA','Moderno','Espacios servidos y sirvientes|Luz natural como material|Geometría platónica','Hormigón, ladrillo, travertino','TSH','CIE GOB CUL SAL','Louis I. Kahn','Instituto Salk (La Jolla, EE.UU.)|Asamblea Nacional (Daca, Bangladés)|Museo de Arte Kimbell (Fort Worth, EE.UU.)',2,'brutal'),
S('japon-moderno','Modernismo japonés','Japón',1950,1990,'AS','Moderno','Hormigón con lógica estructural tradicional|Grandes cubiertas suspendidas|Precisión constructiva','Hormigón, acero','TH','CUL DEP GOB','Kenzo Tange, Kunio Maekawa','Gimnasio Nacional Yoyogi (Tokio, Japón)|Museo Memorial de la Paz (Hiroshima, Japón)',1,'tension'),
S('metabolismo','Metabolismo','Japón',1960,1975,'AS','Moderno','Megaestructuras con cápsulas intercambiables|Crecimiento orgánico urbano|Prefabricación','Hormigón, acero, cápsulas prefabricadas','TH','RES OFI FUT','Kisho Kurokawa, Kiyonori Kikutake, Kenzo Tange, Fumihiko Maki','Torre Cápsula Nakagin (Tokio, Japón; demolida 2022)|Centro de Prensa y Radio de Yamanashi (Kofu, Japón)|Sky House (Tokio, Japón)',1,'modulo'),
S('estructuralismo','Estructuralismo holandés','Países Bajos',1959,1985,'EU','Moderno','Unidades repetidas en retícula|Espacio intermedio y apropiación|Arquitectura pensada para niños y comunidad','Hormigón, bloque, vidrio','TF','EDU SOC OFI SAL','Aldo van Eyck, Herman Hertzberger','Orfanato Municipal (Ámsterdam, Países Bajos)|Centraal Beheer (Apeldoorn, Países Bajos)|Escuela Montessori (Delft, Países Bajos)',2,'reticula'),

/* ── Contemporáneo y sostenible ── */
S('tensoestructuras','Arquitectura ligera y tensoestructuras','Alemania y mundo',1955,null,'GL','Contemporáneo','Membranas y redes de cables|Mínimo material, máxima luz|Formas halladas con modelos físicos','Cable de acero, membrana PTFE/PVC, acrílico','HST','DEP EVE EFI PUB TRA','Frei Otto, Günter Behnisch, Jörg Schlaich','Estadio Olímpico de Múnich (Alemania)|Pabellón de Alemania, Expo 67 (Montreal, Canadá)',2,'tension'),
S('geodesica','Geodésicas y estructuras espaciales','EE.UU. y mundo',1950,null,'GL','Contemporáneo','Cúpulas trianguladas|Ligereza y prefabricación|Máximo volumen con mínima superficie','Aluminio, acero, ETFE','TS','EVE CIE CUL EFI','R. Buckminster Fuller, Nicholas Grimshaw','Biosfera (Montreal, Canadá)|Eden Project (Cornualles, Reino Unido)',2,'geodesica'),
S('high-tech','High-tech','Reino Unido, Francia y Hong Kong',1970,null,'GL','Contemporáneo','Estructura e instalaciones a la vista|Prefabricación y flexibilidad|Tecnología como expresión','Acero, vidrio, aluminio','TF','OFI CUL TRA CIE SAL','Richard Rogers, Renzo Piano, Norman Foster, Michael Hopkins','Centro Pompidou (París, Francia)|Edificio Lloyd\'s (Londres, Reino Unido)|Sede del HSBC (Hong Kong)',1,'cercha'),
S('posmodernismo','Posmodernismo','EE.UU. y Europa',1965,1995,'GL','Contemporáneo','Ironía y referencias históricas|Color y ornamento recuperados|Frontones partidos y doble codificación','Estuco, piedra, acero, color','TS','OFI CUL COM RES','Robert Venturi, Denise Scott Brown, Michael Graves, Charles Moore','Casa Vanna Venturi (Filadelfia, EE.UU.)|Portland Building (Portland, EE.UU.)|Piazza d\'Italia (Nueva Orleans, EE.UU.)',0,'fronton'),
S('neorracionalismo','Neorracionalismo (La Tendenza)','Italia y Europa',1966,1995,'EU','Contemporáneo','Tipología y memoria urbana|Geometría elemental|Analogía con la ciudad','Hormigón, ladrillo, revoque','T','CUL REL RES','Aldo Rossi, Giorgio Grassi, Oswald Mathias Ungers','Cementerio de San Cataldo (Módena, Italia)|Complejo Gallaratese (Milán, Italia)|Bonnefantenmuseum (Maastricht, Países Bajos)',1,'templo'),
S('regionalismo-critico','Regionalismo crítico','Mundial (término de K. Frampton, 1983)',1950,null,'GL','Contemporáneo','Modernidad arraigada al lugar|Topografía, clima, luz y tectónica locales|Resistencia a la homogenización','Materiales locales, hormigón, piedra, ladrillo','HSTA','CUL EDU REL RES HOS','Jørn Utzon, Álvaro Siza, Mario Botta, Charles Correa','Iglesia de Bagsværd (Copenhague, Dinamarca)|Piscinas de las Mareas (Leça da Palmeira, Portugal)|Gandhi Smarak Sangrahalaya (Ahmedabad, India)',3,'voladizo'),
S('deconstructivismo','Deconstructivismo','Mundial (exposición del MoMA, 1988)',1988,null,'GL','Contemporáneo','Fragmentación y geometrías no euclidianas|Inestabilidad controlada|Diseño digital (CATIA)','Titanio, acero, vidrio, hormigón','TS','CUL EDU EVE','Frank Gehry, Daniel Libeskind, Zaha Hadid, Bernard Tschumi, Coop Himmelb(l)au','Museo Guggenheim (Bilbao, España)|Museo Judío (Berlín, Alemania)|Parc de la Villette (París, Francia)',0,'decon'),
S('minimalismo','Minimalismo','Japón, Suiza y España',1980,null,'GL','Contemporáneo','Reducción a lo esencial|Luz, materia y silencio|Precisión del detalle','Hormigón liso, piedra, madera, vidrio','TF','REL CUL RES HOS SAL','Tadao Ando, Peter Zumthor, John Pawson, Alberto Campo Baeza','Iglesia de la Luz (Ibaraki, Japón)|Termas de Vals (Suiza)|Caja General de Ahorros de Granada (España)',2,'reticula'),
S('blob','Blobitecture','Europa',1995,null,'GL','Contemporáneo','Formas amorfas continuas|Fachadas de paneles digitales|Pieles iluminadas','Acrílico, aluminio, acero','T','CUL COM','Peter Cook, Colin Fournier, Future Systems','Kunsthaus Graz (Austria)|Selfridges (Birmingham, Reino Unido)',0,'organica'),
S('neofuturismo','Neofuturismo','Mundial',2000,null,'GL','Contemporáneo','Formas fluidas y dinámicas|Tecnología y estructura espectaculares|Iconicidad urbana','Acero, hormigón blanco, GRC, vidrio','TS','CUL TRA EVE','Zaha Hadid, Santiago Calatrava, Jan Kaplický','Centro Heydar Aliyev (Bakú, Azerbaiyán)|Ciudad de las Artes y las Ciencias (Valencia, España)|Oculus del World Trade Center (Nueva York, EE.UU.)',0,'parametrica'),
S('parametrico','Parametricismo','Mundial (P. Schumacher, 2008)',2008,null,'GL','Contemporáneo','Geometría algorítmica|Gradientes y campos continuos|Fabricación digital','Acero, GRC, vidrio, madera laminada','THS','CUL OFI COM EVE TRA','Zaha Hadid Architects, Patrik Schumacher, Jürgen Mayer H.','MAXXI (Roma, Italia)|Galaxy SOHO (Pekín, China)|Metropol Parasol (Sevilla, España)',1,'parametrica'),
S('bioclimatica','Arquitectura bioclimática y pasiva','Mundial (V. Olgyay, 1963; Passivhaus, 1991)',1963,null,'GL','Sostenible','Orientación, sombra y ventilación natural|Masa térmica y aislamiento según el clima|Estrategias pasivas antes que equipos','Según clima: tierra, madera, hormigón, celosías','HSTFA','SAL EDU RES OFI HOS','Victor Olgyay, Ken Yeang, Wolfgang Feist, Renzo Piano','Menara Mesiniaga (Subang Jaya, Malasia)|Casa pasiva de Darmstadt-Kranichstein (Alemania)|Centro Cultural Jean-Marie Tjibaou (Numea, Nueva Caledonia)',3,'sol'),
S('biofilica','Sostenible y biofílica','Mundial',2000,null,'GL','Sostenible','Naturaleza integrada al edificio|Eficiencia energética y certificaciones (LEED, EDGE)|Bienestar y recuperación de los usuarios','Vegetación, madera, vidrio de control solar','HSTA','SAL EDU OFI RES HOS','Stefano Boeri, Moshe Safdie, CPG Consultants, WOHA','Bosco Verticale (Milán, Italia)|Hospital Khoo Teck Puat (Singapur)|Jewel Changi (Singapur)',3,'hoja'),
S('tropical-contemporaneo','Tropicalismo contemporáneo asiático','Singapur y Sudeste asiático',2000,null,'AS','Sostenible','Edificios-jardín de alta densidad|Fachadas porosas y vegetadas|Espacios comunes ventilados','Hormigón, vegetación, celosías','H','SAL RES HOS MIX','WOHA (Wong Mun Summ, Richard Hassell)','Kampung Admiralty (Singapur)|Parkroyal on Pickering (Singapur)|Oasia Hotel Downtown (Singapur)',3,'hoja'),
S('madera-masiva','Madera masiva (mass timber)','Europa y Norteamérica',2009,null,'GL','Sostenible','Paneles CLT y madera laminada|Construcción en seco prefabricada|Carbono almacenado','CLT, glulam, LVL','TF','RES OFI EDU SAL','Waugh Thistleton, Voll Arkitekter, Korb + Korb','Stadthaus Murray Grove (Londres, Reino Unido)|Mjøstårnet (Brumunddal, Noruega)|Ascent (Milwaukee, EE.UU.)',3,'modulo'),
S('tierra-contemporanea','Tierra cruda contemporánea','Mundial',1980,null,'GL','Sostenible','Tapial estabilizado y prefabricado|Masa térmica y regulación de humedad|Bajo carbono incorporado','Tierra apisonada, adobe, BTC','STA','RES EDU CUL IND','Martin Rauch, Herzog & de Meuron, Anna Heringer','Casa Rauch (Schlins, Austria)|Edificio de Hierbas Ricola (Laufen, Suiza)|Escuela METI (Rudrapur, Bangladés)',3,'adobe'),
S('bambu-asia','Bambú contemporáneo asiático','Indonesia y Vietnam',2005,null,'AS','Sostenible','Estructuras de bambú curvado|Cubiertas ventiladas de gran altura|Mano de obra local','Bambú, alang-alang, madera','H','EDU HOS GAS','Ibuku, John Hardy, Vo Trong Nghia','Green School (Bali, Indonesia)|Wind and Water Bar (Binh Duong, Vietnam)',3,'palafito'),
S('emergencia','Arquitectura de emergencia y papel','Mundial',1995,null,'GL','Contemporáneo','Montaje rápido y desmontable|Tubos de cartón y materiales donados|Dignidad en la crisis','Tubos de cartón, contenedores, madera','HSTA','EFI SOC SAL REL','Shigeru Ban','Paper Log Houses (Kobe, Japón)|Catedral de Cartón (Christchurch, Nueva Zelanda)',2,'modulo'),
S('modular','Modular y prefabricado','Mundial',1967,null,'GL','Contemporáneo','Módulos volumétricos de fábrica|Montaje en semanas|Crecimiento por adición','Acero, hormigón prefabricado, contenedores','HSTFA','SAL EFI RES EDU HOS','Moshe Safdie, China Construction Third Engineering Bureau','Habitat 67 (Montreal, Canadá)|Hospital Huoshenshan (Wuhan, China)',1,'modulo'),
S('impresion3d','Impresión 3D y fabricación robótica','Mundial',2018,null,'GL','Contemporáneo','Muros impresos in situ|Geometrías sin encofrado|Tierra o morteros especiales','Mortero cementicio, tierra, polímeros','STH','RES EFI FUT','ICON, WASP, Mario Cucinella Architects','Gaia, casa impresa en tierra (Massa Lombarda, Italia)|TECLA (Massa Lombarda, Italia)|Viviendas impresas de ICON (Austin, EE.UU.)',2,'parametrica'),
S('circular','Circular y regenerativa','Europa y mundo',2015,null,'GL','Sostenible','Diseño para el desmontaje|Materiales reutilizados (minería urbana)|Edificios de energía positiva','Ladrillo y madera reciclados, materiales de base biológica','HSTA','FUT RES OFI','Lendager Group, Snøhetta','Resource Rows (Copenhague, Dinamarca)|Powerhouse Brattørkaia (Trondheim, Noruega)',3,'hoja'),
S('nuevo-urbanismo','Nuevo urbanismo y nuevo clasicismo','EE.UU. y Reino Unido',1980,null,'NA','Contemporáneo','Barrios caminables y de uso mixto|Tipologías tradicionales|Códigos de forma','Madera, ladrillo, piedra','THS','RES MIX PUB','Andrés Duany, Elizabeth Plater-Zyberk, Léon Krier','Seaside (Florida, EE.UU.)|Poundbury (Dorset, Reino Unido)',1,'portal'),

/* ── Asia ── */
S('harappa','Harappa (valle del Indo)','Civilización del Indo',-2600,-1900,'AS','Antiguo','Ciudades en retícula ortogonal|Drenaje y baños públicos|Ladrillo estandarizado','Ladrillo cocido, adobe','S','INF RES PUB','Anónimo','Mohenjo-Daro (Sindh, Pakistán)|Harappa (Punyab, Pakistán)|Lothal (Guyarat, India)',2,'ladrillo'),
S('budista-india','Budista indio (estupas y chaityas)','India antigua',-250,600,'AS','Asiático','Estupa hemisférica con barandal y toranas|Santuarios excavados en roca|Circunvalación ritual','Piedra, ladrillo, roca excavada','SH','REL CUL','Anónimo (patrocinio de Ashoka)','Gran Estupa de Sanchi (Madhya Pradesh, India)|Cuevas de Ajanta (Maharashtra, India)|Chaitya de Karla (Maharashtra, India)',2,'estupa'),
S('nagara','Hindú nagara (norte de la India)','India del norte',600,1300,'AS','Asiático','Shikhara curvilíneo|Mandapas en secuencia axial|Plataforma elevada (jagati) y escultura profusa','Arenisca, granito','SH','REL','Anónimo (shilpins); tratados de Vastu Shastra','Templo Kandariya Mahadeva (Khajuraho, India)|Templo del Sol (Konark, India)|Templo Lingaraja (Bhubaneswar, India)',1,'shikhara'),
S('dravida','Hindú drávida (sur de la India)','India del sur',600,1700,'AS','Asiático','Vimana piramidal escalonado|Gopurams monumentales|Recintos concéntricos y estanques','Granito, ladrillo, estuco policromado','H','REL','Kunjara Mallan Raja Rama Perunthachan (Brihadisvara)','Templo Brihadisvara (Thanjavur, India)|Templo de Meenakshi (Madurai, India)|Templo de la Orilla (Mahabalipuram, India)',1,'shikhara'),
S('hoysala','Hindú vesara (Hoysala)','Karnataka',1000,1350,'AS','Asiático','Planta estrellada|Talla minuciosa en esteatita|Plataformas elevadas','Esteatita (piedra de jabón)','HS','REL','Anónimo','Templo Chennakeshava (Belur, India)|Templo Hoysaleswara (Halebidu, India)',1,'shikhara'),
S('jemer','Jemer','Imperio de Angkor',802,1431,'AS','Asiático','Templo-montaña (monte Meru)|Torres en forma de loto|Barays (grandes embalses)','Arenisca, laterita, ladrillo','H','REL INF','Anónimo (promotores Suryavarman II, Jayavarman VII)','Angkor Wat (Siem Riep, Camboya)|Bayón (Angkor Thom, Camboya)|Banteay Srei (Camboya)',2,'jemer'),
S('javanes','Budista e hindú de Java','Java central',750,950,'AS','Asiático','Mandala tridimensional en terrazas|Relieves narrativos|Estupas perforadas','Andesita','H','REL CUL','Gunadharma (tradición)','Borobudur (Magelang, Indonesia)|Prambanan (Yogyakarta, Indonesia)',1,'estupa'),
S('bagan','Birmano (Bagan)','Reino de Pagan',849,1287,'AS','Asiático','Miles de templos y estupas de ladrillo|Bóvedas verdaderas de ladrillo|Terrazas superpuestas','Ladrillo, estuco','HS','REL','Anónimo','Templo Ananda (Bagan, Myanmar)|Pagoda Shwezigon (Nyaung-U, Myanmar)',1,'estupa'),
S('tailandes','Tailandés (Sukhothai, Ayutthaya, Rattanakosin)','Tailandia',1238,null,'AS','Asiático','Cubiertas superpuestas con chofa|Prang y chedis|Mosaicos de cerámica y vidrio','Ladrillo, teca, estuco, cerámica','H','REL HOS GOB','Artesanos reales (anónimo)','Wat Arun (Bangkok, Tailandia)|Wat Phra Kaew (Bangkok, Tailandia)|Wat Chedi Luang (Chiang Mai, Tailandia)',2,'pagoda'),
S('china','China clásica','Dinastías Tang a Qing',618,1912,'AS','Asiático','Ménsulas dougong|Cubiertas curvas de teja vidriada|Patios (siheyuan) y eje norte-sur|Feng shui','Madera, teja, ladrillo, piedra','TFH','GOB REL RES CUL','Li Jie (Yingzao Fashi, 1103), Kuai Xiang, familia Yangshi Lei','Ciudad Prohibida (Pekín, China)|Templo del Cielo (Pekín, China)|Pagoda de madera de Yingxian (Shanxi, China)',2,'chino'),
S('jardin-chino','Jardín clásico chino','Suzhou y Jiangnan',960,1911,'AS','Asiático','Paisaje en miniatura con rocas y agua|Vistas enmarcadas y recorridos|Pabellones y galerías','Roca taihu, madera, teja','TH','PUB CUL HOS','Ji Cheng (tratado Yuanye, 1631)','Jardín del Administrador Humilde (Suzhou, China)|Jardín del Maestro de las Redes (Suzhou, China)',3,'chino'),
S('tulou','Tulou hakka','Fujian, China',1100,1960,'AS','Vernáculo','Edificio comunal circular fortificado|Muros de tierra apisonada muy gruesos|Patio central y anillos de habitaciones','Tierra apisonada, madera','HT','RES SOC SEG','Comunidades hakka','Grupo de Tianluokeng (Fujian, China)|Tulou Chengqi (Yongding, China)',3,'tulou'),
S('tibetano','Tibetano','Himalaya',600,null,'AS','Asiático','Muros en talud muy gruesos|Cubiertas planas y ventanas trapezoidales|Monasterios-fortaleza en ladera','Piedra, tierra apisonada, madera','FA','REL GOB','Anónimo','Palacio de Potala (Lhasa, China)|Templo de Jokhang (Lhasa, China)',3,'brutal'),
S('newar','Newar (pagoda nepalí)','Valle de Katmandú',1200,1800,'AS','Asiático','Pagodas de cubiertas múltiples|Puntales de madera tallada|Plazas Durbar','Ladrillo, madera tallada, teja','TA','REL PUB','Araniko','Plaza Durbar (Katmandú, Nepal)|Templo Nyatapola (Bhaktapur, Nepal)',2,'pagoda'),
S('hanok','Coreano (hanok)','Dinastía Joseon',1392,1910,'AS','Asiático','Suelo radiante ondol|Maru: suelo de madera ventilado|Cubierta curva sobre estructura de madera','Madera, tierra, papel hanji, teja','TF','RES HOS GOB','Anónimo','Palacio Gyeongbokgung (Seúl, Corea del Sur)|Aldea de Hahoe (Andong, Corea del Sur)',3,'chino'),
S('japones-budista','Japonés budista (Asuka–Nara)','Japón',593,794,'AS','Asiático','Pagodas de cinco pisos con pilar central (shinbashira)|Grandes salas de madera|Recinto con kondo y pagoda','Madera de hinoki, teja','TH','REL','Constructores de Baekje; Shōtoku Taishi (promotor)','Hōryū-ji (Ikaruga, Nara, Japón)|Tōdai-ji (Nara, Japón)',2,'pagoda'),
S('sintoista','Sintoísta','Japón',690,null,'AS','Asiático','Madera sin pintar sobre pilotes|Reconstrucción ritual cada 20 años (Ise)|Torii de acceso','Madera de hinoki, paja','TH','REL','Anónimo','Gran Santuario de Ise (Mie, Japón)|Izumo Taisha (Shimane, Japón)|Fushimi Inari Taisha (Kioto, Japón)',3,'torii'),
S('shinden','Japonés shinden-zukuri','Período Heian',794,1185,'AS','Asiático','Pabellón principal frente a jardín con estanque|Galerías que conectan pabellones|Espacios abiertos con persianas','Madera de ciprés, corteza','TH','RES HOS REL','Aristocracia Fujiwara (promotores)','Byōdō-in (Uji, Japón)|Palacio Imperial de Kioto, reconstrucción (Japón)',2,'torii'),
S('shoin','Japonés shoin-zukuri','Muromachi a Edo',1336,1700,'AS','Asiático','Tatami en todo el suelo|Tokonoma y estanterías chigaidana|Shoji y fusuma corredizos','Madera, papel, tatami','TH','RES HOS GOB','Anónimo','Tōgu-dō de Ginkaku-ji (Kioto, Japón)|Palacio Ninomaru, Castillo Nijō (Kioto, Japón)',2,'reticula'),
S('sukiya','Japonés sukiya-zukuri','Edo hasta hoy',1600,null,'AS','Asiático','Estética de la casa de té (wabi-sabi)|Materiales naturales sin pulir|Planta escalonada abierta al jardín','Madera, bambú, papel, tierra','TH','RES HOS GAS CUL','Sen no Rikyū, Kobori Enshū','Villa Imperial Katsura (Kioto, Japón)|Casa de té Tai-an, Myōki-an (Ōyamazaki, Japón)',3,'reticula'),
S('castillo-japones','Castillos japoneses','Azuchi-Momoyama y Edo temprano',1570,1650,'AS','Asiático','Tenshu de varios pisos|Base de piedra en talud|Cubiertas superpuestas con hastiales','Piedra, madera, yeso','TH','SEG CUL','Anónimo','Castillo de Himeji (Japón)|Castillo de Matsumoto (Japón)',1,'pagoda'),
S('minka','Minka (vernácula japonesa)','Japón rural',1600,null,'AS','Vernáculo','Gassho-zukuri: cubierta de paja muy inclinada|Hogar central irori|Estructura de madera ensamblada','Madera, paja, tierra','TFH','RES HOS AGR','Constructores rurales','Aldea de Shirakawa-gō (Gifu, Japón)|Aldeas de Gokayama (Toyama, Japón)',3,'palafito'),
S('sudeste-vernaculo','Vernácula del sudeste asiático','Indonesia, Malasia y Filipinas',1000,null,'AS','Vernáculo','Casas elevadas sobre pilotes|Cubiertas de gran pendiente y aleros|Ventilación por el piso y la cubierta','Madera, bambú, palma','H','RES HOS SOC','Pueblos minangkabau, toraja y malayos','Rumah Gadang (Sumatra Occidental, Indonesia)|Tongkonan (Tana Toraja, Indonesia)',3,'palafito'),
S('nomada','Arquitectura nómada (yurta y jaima)','Asia central y Sahara',-600,null,'AS','Vernáculo','Estructura desmontable y transportable|Celosía plegable y fieltro|Adaptación al viento, frío o calor','Madera, fieltro, lana, pelo de cabra','SF','EFI HOS RES','Pueblos mongoles, kazajos y beduinos','Ger mongol (Mongolia)|Jaima beduina (Sahara)',3,'yurta'),

/* ── Vernáculas de otras regiones ── */
S('inuit','Vernácula ártica (iglú y casa de turba)','Ártico y Atlántico norte',1000,null,'NA','Vernáculo','Domo de bloques de nieve|Entrada baja como trampa de frío|Muros de turba aislantes','Nieve, turba, piedra, madera de deriva','F','RES EFI','Pueblos inuit; comunidades islandesas','Iglú inuit (Ártico canadiense)|Granja de turba de Glaumbær (Islandia)',3,'iglu'),
S('mediterraneo','Vernácula mediterránea','Islas griegas, Andalucía y Apulia',1000,null,'EU','Vernáculo','Muros blancos encalados|Volúmenes cúbicos compactos|Patios, sombra y vanos pequeños','Piedra, cal, tierra','ST','RES HOS GAS','Constructores locales','Oia (Santorini, Grecia)|Trulli de Alberobello (Italia)|Pueblos blancos (Cádiz, España)',3,'adobe'),
S('pueblo','Ancestral Pueblo','Suroeste de EE.UU.',850,1300,'NA','Precolombino','Viviendas en acantilado|Kivas circulares ceremoniales|Mampostería y adobe con masa térmica','Arenisca, adobe, madera','S','RES REL','Pueblos ancestrales','Cliff Palace (Mesa Verde, EE.UU.)|Pueblo Bonito (Cañón del Chaco, EE.UU.)',3,'adobe'),
S('cahokia','Misisipiana (Cahokia)','Valle del Misisipi',800,1350,'NA','Precolombino','Grandes montículos de tierra|Plazas ceremoniales|Empalizadas y círculos de postes','Tierra, madera','T','REL GOB','Anónimo','Monks Mound (Cahokia, EE.UU.)|Woodhenge (Cahokia, EE.UU.)',2,'escalonada'),

/* ── África ── */
S('sahel','Sudano-saheliana','Sahel (Malí, Burkina Faso, Níger)',1200,null,'AF','Africano','Arquitectura de barro (banco) modelado|Toron: vigas salientes para el mantenimiento|Re-enlucido comunitario anual','Banco (barro, paja, manteca de karité), palma','S','REL RES EDU','Abu Ishaq es-Saheli, Ismaila Traoré','Gran Mezquita de Djenné (Malí)|Mezquita Djinguereber (Tombuctú, Malí)|Gran Mezquita de Agadez (Níger)',3,'banco'),
S('swahili','Swahili','Costa de África oriental',1000,1900,'AF','Africano','Piedra de coral y cal|Puertas talladas y barazas (bancos)|Casas de patio en tramas densas','Piedra coralina, cal, madera de mangle','H','RES REL COM','Anónimo','Gran Mezquita de Kilwa Kisiwani (Tanzania)|Stone Town (Zanzíbar, Tanzania)|Ciudad vieja de Lamu (Kenia)',3,'portal'),
S('etiope','Etíope excavado en roca','Lalibela',1181,1221,'AF','Africano','Iglesias monolíticas excavadas en roca|Zanjas y túneles de conexión|Planta de cruz','Toba volcánica (roca viva)','TA','REL','Anónimo (rey Lalibela, promotor)','Bete Giyorgis (Lalibela, Etiopía)|Bete Medhane Alem (Lalibela, Etiopía)',2,'basilica'),
S('zimbabue','Gran Zimbabue','Reino de Zimbabue',1100,1450,'AF','Africano','Muros curvos de piedra seca|Torre cónica|Recintos elípticos','Granito sin mortero','T','GOB SEG','Pueblo shona (anónimo)','Gran Recinto de Gran Zimbabue (Masvingo, Zimbabue)|Ruinas de Khami (Bulawayo, Zimbabue)',2,'torre'),
S('tierra-africa','Vernácula de tierra africana','África occidental y central',1500,null,'AF','Vernáculo','Domos y obuses de barro autoportantes|Pinturas murales geométricas|Recintos familiares agrupados','Tierra, paja, estiércol','SH','RES SOC','Pueblos musgum, kassena y dogon','Casas obús musgum (Camerún)|Tiébélé, aldea kassena (Burkina Faso)|Acantilado de Bandiagara (Malí)',3,'banco'),
S('fathy','Arquitectura de tierra de Hassan Fathy','Egipto',1945,1989,'AF','Sostenible','Bóveda y cúpula nubias sin cimbra|Malqaf (captador de viento) y patio|Autoconstrucción comunitaria','Adobe, ladrillo de barro','S','RES EDU REL SOC','Hassan Fathy','New Gourna (Luxor, Egipto)|Mezquita Dar al-Islam (Abiquiú, EE.UU.)',3,'cupula'),
S('kere','Africana contemporánea (Kéré)','Burkina Faso y mundo',2001,null,'AF','Sostenible','Bloque de tierra comprimida local|Doble cubierta ventilada|Construcción con la comunidad','Tierra comprimida, acero ligero, eucalipto','SH','EDU SAL SOC CUL','Diébédo Francis Kéré (Pritzker 2022)','Escuela primaria de Gando (Burkina Faso)|Centro de salud y promoción social de Léo (Burkina Faso)|Lycée Schorge (Koudougou, Burkina Faso)',3,'sol'),

/* ── América precolombina ── */
S('caral','Caral-Supe','Arcaico tardío andino',-3000,-1800,'PC','Precolombino','Edificios piramidales con plazas circulares hundidas|Shicras: bolsas de fibra con piedras (antisísmicas)|Ciudad sin murallas','Piedra, shicras, tierra, madera','S','REL GOB CUL','Anónimo','Ciudad Sagrada de Caral (Supe, Perú)|Áspero (Supe, Perú)',3,'escalonada'),
S('olmeca','Olmeca','Golfo de México',-1500,-400,'PC','Precolombino','Montículos y plataformas de tierra|Plazas alineadas|Cabezas colosales','Tierra, arcilla, basalto','H','REL GOB','Anónimo','La Venta (Tabasco, México)|San Lorenzo Tenochtitlan (Veracruz, México)',1,'escalonada'),
S('chavin','Chavín','Andes centrales',-1200,-500,'PC','Precolombino','Galerías subterráneas laberínticas|Cabezas clavas|Plaza circular hundida|Ductos de ventilación y drenaje','Piedra labrada','A','REL','Anónimo','Chavín de Huántar (Áncash, Perú)',2,'escalonada'),
S('zapoteca','Zapoteca y mixteca','Oaxaca',-500,1521,'PC','Precolombino','Acrópolis sobre cerro nivelado|Grecas de mosaico de piedra (Mitla)|Juego de pelota','Piedra, estuco','TS','REL GOB','Anónimo','Monte Albán (Oaxaca, México)|Mitla (Oaxaca, México)',1,'escalonada'),
S('teotihuacan','Teotihuacana','Valle de México',-100,550,'PC','Precolombino','Talud-tablero|Traza urbana orientada (~15,5° al este del norte)|Calzada axial monumental','Piedra, tezontle, estuco pintado','TS','REL PUB GOB','Anónimo','Pirámide del Sol (Teotihuacán, México)|Calzada de los Muertos (Teotihuacán, México)|Templo de Quetzalcóatl (Teotihuacán, México)',1,'escalonada'),
S('maya-clasico','Maya clásico (Petén)','Mesoamérica tropical',250,900,'PC','Precolombino','Pirámides-templo con crestería|Falsa bóveda (arco maya)|Acrópolis y plazas','Caliza, estuco','H','REL GOB CUL','Nobleza maya (promotores)','Tikal (Petén, Guatemala)|Palenque (Chiapas, México)|Copán (Honduras)',2,'escalonada'),
S('puuc','Maya Puuc','Yucatán',600,1000,'PC','Precolombino','Frisos de mosaico de piedra|Mascarones de Chaac|Columnillas adosadas y chultunes (aljibes)','Caliza tallada, núcleo de mampostería con cal','SH','REL GOB','Anónimo','Cuadrángulo de las Monjas (Uxmal, México)|Codz Poop (Kabah, México)|Gran Palacio (Sayil, México)',2,'escalonada'),
S('rio-bec','Maya Río Bec y Chenes','Campeche y Quintana Roo',550,900,'PC','Precolombino','Torres falsas con escalinatas no funcionales|Portadas zoomorfas|Palacios horizontales','Caliza, estuco','H','REL GOB','Anónimo','Becán (Campeche, México)|Xpuhil (Campeche, México)|Hochob (Campeche, México)',2,'escalonada'),
S('chichen','Maya-tolteca (Chichén Itzá)','Posclásico temprano',900,1200,'PC','Precolombino','Columnas serpentinas|Salas hipóstilas|Observatorio y orientación solar','Caliza','SH','REL GOB CIE','Anónimo','El Castillo de Kukulkán (Chichén Itzá, México)|Templo de los Guerreros (Chichén Itzá, México)|El Caracol (Chichén Itzá, México)',2,'escalonada'),
S('tolteca','Tolteca','Tula, Hidalgo',900,1150,'PC','Precolombino','Atlantes como columnas|Salas columnadas|Coatepantli (muro de serpientes)','Basalto, piedra','TS','REL GOB','Anónimo','Pirámide B y Atlantes (Tula, México)|Palacio Quemado (Tula, México)',1,'escalonada'),
S('mexica','Mexica (azteca)','Valle de México',1325,1521,'PC','Precolombino','Templo doble sobre basamento|Ciudad lacustre con chinampas y calzadas|Ampliaciones superpuestas','Tezontle, basalto, estuco','T','REL GOB INF AGR','Anónimo','Templo Mayor (Ciudad de México)|Tlatelolco (Ciudad de México)|Templo monolítico de Malinalco (Estado de México)',2,'escalonada'),
S('moche','Moche','Costa norte del Perú',100,800,'PC','Precolombino','Huacas de adobe con ladrillos marcados|Murales policromos superpuestos|Plataformas escalonadas','Adobe','S','REL GOB','Anónimo','Huacas del Sol y de la Luna (Trujillo, Perú)|Huaca Rajada, Sipán (Lambayeque, Perú)',2,'escalonada'),
S('nasca','Nasca','Costa sur del Perú',100,800,'PC','Precolombino','Puquios: acueductos subterráneos con ojos en espiral|Centro ceremonial de adobe|Geoglifos','Piedra, adobe, tierra','S','INF REL AGR','Anónimo','Puquios de Cantalloc (Nasca, Perú)|Cahuachi (Nasca, Perú)',3,'escalonada'),
S('tiwanaku','Tiwanaku','Altiplano del Titicaca',500,1000,'PC','Precolombino','Sillería con grapas de cobre|Templete semisubterráneo|Plataformas y portadas monolíticas','Andesita, arenisca','AF','REL GOB','Anónimo','Kalasasaya y Puerta del Sol (Tiwanaku, Bolivia)|Puma Punku (Tiwanaku, Bolivia)|Akapana (Tiwanaku, Bolivia)',2,'inca'),
S('wari','Wari','Andes centrales',600,1000,'PC','Precolombino','Recintos ortogonales planificados|Patios rodeados de galerías|Red de centros administrativos','Piedra, barro','A','GOB IND','Anónimo','Pikillacta (Cusco, Perú)|Huari (Ayacucho, Perú)',2,'inca'),
S('chimu','Chimú','Costa norte del Perú',900,1470,'PC','Precolombino','Ciudadelas amuralladas de adobe|Relieves de redes, peces y aves|Pozos (wachaques) y canales','Adobe, barro','S','GOB RES INF','Anónimo','Chan Chan (Trujillo, Perú)|Huaca Arco Iris (Trujillo, Perú)',3,'adobe'),
S('inca','Incaica','Tawantinsuyu',1438,1533,'PC','Precolombino','Sillería poligonal y almohadillada sin mortero|Vanos trapezoidales y muros en talud (sismorresistencia)|Andenes y Qhapaq Ñan|Integración con el paisaje sagrado','Granito, andesita, caliza','AF','REL GOB AGR INF TRA','Pachacútec (promotor), constructores incas','Machu Picchu (Cusco, Perú)|Sacsayhuamán (Cusco, Perú)|Coricancha (Cusco, Perú)',3,'inca'),

/* ── Latinoamérica ── */
S('maloca','Maloca amazónica','Amazonía noroccidental (Colombia, Brasil, Perú)',1000,null,'LA','Vernáculo','Gran casa comunal cónica o rectangular|Cubierta de palma hasta el suelo|La maloca como modelo del universo','Madera, palma, bejuco','H','SOC CUL RES','Pueblos tukano, uitoto y yagua','Malocas del río Vaupés (Colombia)|Malocas uitoto de La Chorrera (Amazonas, Colombia)',3,'maloca'),
S('colonial-hisp','Colonial hispanoamericano','Virreinatos de Nueva España, Perú y Nueva Granada',1521,1820,'LA','Colonial','Trazado en damero con plaza mayor (Leyes de Indias)|Casa de patio con zaguán y corredores|Balcones de madera y portales','Adobe, ladrillo, piedra, teja, madera','HSTA','RES REL GOB COM','Claudio de Arciniega, Francisco Becerra, Constantino de Vasconcelos','Catedral Metropolitana (Ciudad de México)|Centro histórico de Cartagena de Indias (Colombia)|Basílica y Convento de San Francisco (Lima, Perú)',2,'portal'),
S('fortificacion','Fortificaciones del Caribe','Sistema defensivo hispano',1586,1800,'LA','Colonial','Baluartes abaluartados|Murallas en talud|Garitas y bóvedas a prueba de bomba','Piedra coralina, cal','H','SEG CUL','Bautista Antonelli, Juan Bautista Antonelli, Antonio de Arévalo','Castillo de San Felipe de Barajas (Cartagena, Colombia)|Castillo de los Tres Reyes del Morro (La Habana, Cuba)|Castillo San Felipe del Morro (San Juan, Puerto Rico)',1,'torre'),
S('barroco-novohispano','Barroco novohispano','Nueva España',1650,1790,'LA','Colonial','Estípite y fachadas-retablo|Azulejo de Talavera y argamasa policroma|Cúpulas revestidas','Cantera, tezontle, Talavera, yesería','TS','REL','Lorenzo Rodríguez, Diego Durán Berruecos, Francisco Guerrero y Torres','Sagrario Metropolitano (Ciudad de México)|Iglesia de Santa Prisca (Taxco, México)|Capilla del Rosario (Puebla, México)',1,'voluta'),
S('barroco-andino','Barroco andino (mestizo)','Altiplano peruano-boliviano',1650,1780,'LA','Colonial','Talla plana en piedra con flora y fauna andinas|Sirenas, monos y máscaras|Portadas-retablo y capillas posas','Sillar, andesita, adobe','AF','REL','José Kondori (atribuido)','Iglesia de San Lorenzo de Carangas (Potosí, Bolivia)|Iglesia de la Compañía (Arequipa, Perú)|Iglesia de Santiago Apóstol (Pomata, Perú)',2,'voluta'),
S('barroco-mineiro','Barroco minero (Brasil)','Minas Gerais',1720,1810,'LA','Colonial','Plantas curvas y torres cilíndricas|Esteatita tallada|Contraste de cal blanca y piedra','Esteatita, cal, madera','T','REL','Antônio Francisco Lisboa (Aleijadinho), Manuel da Costa Ataíde','Iglesia de San Francisco de Asís (Ouro Preto, Brasil)|Santuario del Bom Jesus de Matosinhos (Congonhas, Brasil)',1,'voluta'),
S('misiones','Misiones jesuíticas','Guaraníes, Chiquitos y Moxos',1609,1767,'LA','Colonial','Plaza y templo como centro del pueblo|Galerías perimetrales en casas comunales|Talla en arenisca y madera por artesanos indígenas','Arenisca, adobe, madera','HT','REL EDU SOC','Martin Schmid, Giovanni Battista Primoli','San Ignacio Miní (Misiones, Argentina)|La Santísima Trinidad de Paraná (Itapúa, Paraguay)|San José de Chiquitos (Santa Cruz, Bolivia)',2,'portal'),
S('colonial-luso','Colonial luso-brasileño','Brasil colonial',1549,1822,'LA','Colonial','Sobrados y azulejo portugués|Iglesias con talla dorada|Ciudades en ladera','Piedra, cal, azulejo, madera','H','RES REL COM','Francisco Frias de Mesquita','Pelourinho (Salvador de Bahía, Brasil)|Centro histórico de Olinda (Brasil)|Paraty (Río de Janeiro, Brasil)',2,'portal'),
S('caribe-holandes','Colonial caribeño holandés','Curazao y Antillas',1634,1900,'LA','Colonial','Hastiales curvos holandeses|Fachadas de colores vivos|Galerías y persianas','Mampostería, cal, teja','H','RES COM','Anónimo','Punda y Otrobanda (Willemstad, Curazao)|Fuerte Ámsterdam (Willemstad, Curazao)',2,'portal'),
S('gingerbread','Gingerbread haitiano','Haití y Caribe',1881,1925,'LA','Vernáculo','Madera calada (fretwork)|Galerías y balcones envolventes|Cubiertas altas ventiladas','Madera, ladrillo, entramado','H','RES HOS','Georges Baussan, Léon Mathon, Joseph-Eugène Maximilien','Hotel Oloffson (Puerto Príncipe, Haití)|Casas de Pacot y Bois Verna (Puerto Príncipe, Haití)',3,'portal'),
S('neocolonial','Neocolonial (Spanish Colonial Revival)','Latinoamérica y California',1915,1945,'LA','Historicismo','Revival barroco y colonial|Patios, arcadas y teja|Búsqueda de identidad nacional','Ladrillo, estuco, teja','STH','GOB EDU RES','Ángel Guido, Ricardo de Jaxa Malachowski, Bertram Goodhue, William Mooser III','Palacio Arzobispal (Lima, Perú)|Balboa Park, Exposición Panamá-California (San Diego, EE.UU.)|Juzgado del Condado de Santa Bárbara (EE.UU.)',2,'portal'),
S('bambu-latam','Guadúa contemporánea','Colombia y trópico andino',1980,null,'LA','Sostenible','Guadúa con uniones rellenas de mortero|Grandes cubiertas voladas|Sismorresistencia por ligereza','Guadua angustifolia, mortero, teja','HA','REL CUL EVE HOS','Simón Vélez, Marcelo Villegas','Pabellón ZERI (Manizales, Colombia; versión en Expo 2000 Hannover)|Museo Nómada (Ciudad de México)|Catedral temporal de Pereira (Colombia)',3,'palafito'),
S('elemental','Vivienda incremental (Elemental)','Chile',2003,null,'LA','Contemporáneo','Media casa buena: el usuario completa|Densidad sin hacinamiento|Estructura que admite crecimiento','Hormigón, bloques, madera','TS','RES SOC','Alejandro Aravena (Pritzker 2016), Elemental','Quinta Monroy (Iquique, Chile)|Villa Verde (Constitución, Chile)',2,'modulo'),
S('urbanismo-social','Urbanismo social latinoamericano','Medellín y Bogotá',2004,null,'LA','Contemporáneo','Equipamientos de calidad en barrios vulnerables|Transporte y espacio público integrados|Arquitectura como reparación social','Hormigón, piedra, ladrillo','HTA','EDU CUL SOC PUB','Giancarlo Mazzanti, Alejandro Echeverri, Obranegra Arquitectos','Parque Biblioteca España (Medellín, Colombia)|Metrocable (Medellín, Colombia)|Colegio Santo Domingo Savio (Medellín, Colombia)',2,'decon'),
S('paraguay','Nuevo regionalismo paraguayo','Asunción',2000,null,'LA','Sostenible','Ladrillo y cascote reutilizados|Estructuras experimentales de bajo costo|Sombra y ventilación para clima cálido','Ladrillo, cerámica, hormigón','HS','SAL EDU RES','Solano Benítez, Gloria Cabral, Javier Corvalán','Centro de Rehabilitación Infantil Teletón (Asunción, Paraguay)|Oficinas Unilever (Villa Elisa, Paraguay)|Casa Hamaca (Luque, Paraguay)',3,'ladrillo'),
S('valparaiso','Escuela de Valparaíso (Ciudad Abierta)','Chile',1970,null,'LA','Contemporáneo','Arquitectura poética y experimental|Construcción in situ como obra abierta|Relación con dunas y mar','Madera, hormigón, ladrillo','T','EDU CUL EFI','Alberto Cruz, Godofredo Iommi, Fabio Cruz','Ciudad Abierta de Ritoque (Valparaíso, Chile)|Hospedería del Errante (Ritoque, Chile)',2,'organica'),

/* ── Ecuador ── */
S('valdivia','Formativo costero (Valdivia, Machalilla, Chorrera)','Costa ecuatoriana',-3800,-300,'EC','Precolombino','Aldeas ovaladas alrededor de una plaza|Casas elípticas de bahareque y paja|Montículos ceremoniales','Caña, madera, barro, paja','H','RES SOC REL','Comunidades valdivia','Real Alto (Chanduy, Santa Elena)|Loma Alta (Santa Elena)',3,'maloca'),
S('tolita','La Tolita (tolas)','Costa norte (Esmeraldas)',-600,400,'EC','Precolombino','Tolas: montículos artificiales de tierra|Centro ceremonial insular|Orfebrería en oro y platino','Tierra, madera, paja','H','REL','Anónimo','Sitio arqueológico Isla de La Tolita (San Lorenzo, Esmeraldas)',2,'escalonada'),
S('cochasqui','Caranqui (pirámides de Cochasquí)','Sierra norte',500,1500,'EC','Precolombino','Pirámides truncas con rampas|Cangahua tallada|Observación astronómica y calendario','Cangahua, tierra','A','REL CIE','Pueblo caranqui (anónimo)','Parque Arqueológico Cochasquí (Tocachi, Pichincha)|Tolas de Zuleta (Imbabura)',3,'escalonada'),
S('manteno','Manteño-huancavilca','Costa (Manabí, Santa Elena, Guayas)',500,1532,'EC','Precolombino','Asentamientos en cerros con terrazas|Cimientos de piedra y casas de caña|Albarradas: reservorios de agua lluvia','Piedra, caña, madera, tierra','HS','RES INF GOB','Pueblo manteño (anónimo)','Cerro de Hojas-Jaboncillo (Portoviejo, Manabí)|Albarradas de Santa Elena',3,'palafito'),
S('canari-inca','Cañari-inca','Sierra sur (Cañar, Azuay)',1470,1533,'EC','Precolombino','Templo elíptico (Castillo de Ingapirca)|Sillería almohadillada incaica|Nichos trapezoidales y kallankas','Andesita, piedra, adobe','A','REL GOB CIE','Túpac Yupanqui y Huayna Cápac (promotores), pueblo cañari','Complejo arqueológico de Ingapirca (Cañar)|Parque arqueológico Pumapungo (Cuenca)|Todos Santos (Cuenca)',3,'inca'),
S('quiteno','Colonial quiteño (Escuela Quiteña)','Real Audiencia de Quito',1534,1820,'EC','Colonial','Fachadas barrocas en piedra andesita|Interiores en pan de oro y artesonados mudéjares|Columnas salomónicas, claustros y atrios|Integración de escultura y pintura (Escuela Quiteña)','Andesita, ladrillo, adobe, cal, madera tallada, pan de oro','A','REL CUL EDU','Fray Jodoco Ricke, Marcos Guerra, Leonardo Deubler, Venancio Gandolfi, Bernardo de Legarda','Iglesia de la Compañía de Jesús (Quito)|Iglesia y Convento de San Francisco (Quito)|Convento de San Agustín (Quito)',2,'voluta'),
S('cuencano','Colonial y republicano cuencano','Cuenca y Azuay',1557,1950,'EC','Colonial','Casa de patio, traspatio y huerta|Adobe y bahareque con balcones de madera|Fachadas republicanas con latón policromado|Catedral neorrománica de cúpulas azules','Adobe, bahareque, teja, madera, latón, ladrillo','A','RES REL COM','Juan Bautista Stiehle (redentorista), maestros locales','Centro histórico de Cuenca (Patrimonio Mundial, 1999)|Catedral de la Inmaculada Concepción (Cuenca)|Monasterio del Carmen de la Asunción (Cuenca)',3,'portal'),
S('republicano-quito','Republicano e historicista quiteño','Quito republicano',1860,1940,'EC','Historicismo','Neoclásico en edificios de Estado|Neogótico religioso monumental|Arquitectos europeos contratados','Piedra, ladrillo, hormigón, hierro','A','GOB REL CUL','Francisco Schmidt, Emilio Tarlier, Francisco Durini','Basílica del Voto Nacional (Quito)|Teatro Nacional Sucre (Quito)|Palacio de Carondelet (Quito)',1,'ojiva'),
S('guayaquil-madera','Republicano de madera de Guayaquil','Guayaquil antes y después del Incendio Grande (1896)',1830,1945,'EC','Vernáculo','Portales (soportales) continuos sobre la acera|Estructura de madera (guayacán, laurel, mangle) y caña|Chazas y calados para ventilación cruzada|Balcones corridos y aleros','Madera, caña guadúa, quincha, zinc','H','COM RES MIX HOS','Maestros carpinteros guayaquileños (anónimo)','Barrio Las Peñas y calle Numa Pompilio Llona (Guayaquil)|Casa Julián Coronel y Hotel Ronquillo, Parque Histórico (Guayaquil)',3,'portal'),
S('guayaquil-eclectico','Eclecticismo republicano de Guayaquil','Reconstrucción tras 1896',1900,1950,'EC','Historicismo','Hormigón armado con lenguaje clásico|Soportales obligatorios por ordenanza|Torres y cúpulas de remate','Hormigón armado, hierro, madera','H','GOB COM MIX','Francesco Maccaferri y constructores italianos','Palacio Municipal de Guayaquil|Palacio de la Gobernación del Guayas (Guayaquil)|Torre Morisca, Torre del Reloj (Guayaquil)',1,'portal'),
S('zaruma','Madera y bahareque de Zaruma','Ciudad minera de El Oro',1890,1960,'EC','Vernáculo','Bahareque y madera adaptados a la pendiente|Balcones y portales tallados|Ornamento republicano en madera','Madera, bahareque, teja, zinc','TH','RES COM HOS','Maestros constructores zarumeños','Centro histórico de Zaruma (El Oro)|Iglesia Matriz de la Virgen del Carmen (Zaruma)',2,'portal'),
S('montubia','Vernácula montubia (casa de caña sobre pilotes)','Costa rural (Guayas, Los Ríos, Manabí)',1700,null,'EC','Vernáculo','Vivienda elevada sobre pilotes (inundación, fauna, humedad)|Paredes de caña guadúa picada que respiran|Cubierta a dos aguas de paja, bijao o zinc con alero|Portal frontal y escalera de caña','Caña guadúa, guayacán, laurel, bijao, paja','H','RES AGR HOS SOC','Constructores montubios (saber tradicional)','Viviendas rurales de la cuenca del Guayas (Daule, Vinces, Babahoyo)|Casas de caña de Manabí (Chone, Junín)',3,'palafito'),
S('afroesmeraldena','Vernácula afroesmeraldeña (palafitos de manglar)','Norte de Esmeraldas',1600,null,'EC','Vernáculo','Palafitos sobre esteros y manglar|Pasarelas comunitarias|Ventilación por suelo y paredes de tabla','Madera, chonta, palma, zinc','H','RES SOC','Comunidades afroecuatorianas','Viviendas de Borbón y Limones (Esmeraldas)|Comunidades del río Santiago (Esmeraldas)',3,'palafito'),
S('andina-tierra','Vernácula andina (bahareque, tapial, adobe)','Sierra ecuatoriana',1550,null,'EC','Vernáculo','Muros de tierra de gran masa térmica|Cubierta de teja o paja con alero protector|Corredor y patio soleado|Chozas de páramo de paja','Adobe, tapial, bahareque, teja, paja de páramo','AF','RES AGR HOS','Constructores campesinos e indígenas (mingas)','Viviendas rurales de Chimborazo y Cotopaxi|Pueblo patrimonial de Susudel (Oña, Azuay)|Hacienda La Ciénega (Lasso, Cotopaxi)',3,'adobe'),
S('amazonica','Amazónica ecuatoriana (jea shuar-achuar)','Amazonía (Pastaza, Morona Santiago)',1000,null,'EC','Vernáculo','Planta elíptica de gran altura|Cubierta de hoja de palma casi hasta el suelo|Paredes de chonta que ventilan|Espacios diferenciados (tankamash y ekent)','Chonta, madera, hojas de palma, bejuco','H','RES HOS SOC CUL','Pueblos shuar, achuar y kichwa amazónicos','Jea tradicional achuar (Pastaza)|Kapawi Ecolodge (Pastaza)',3,'maloca'),
S('ecuador-moderno','Moderno ecuatoriano','Quito y Guayaquil',1946,1985,'EC','Moderno','Ciudad universitaria y equipamientos estatales|Pilotis, losas y quiebrasoles|Integración de murales y arte','Hormigón armado, vidrio, piedra local','AH','EDU GOB HOS SAL','Gilberto Gatto Sobral, Karl Kohn, Otto Glass, Charles McKirahan, Milton Barragán Dumet','Ciudad Universitaria, Universidad Central del Ecuador (Quito)|Hotel Quito (Quito)|Templo de la Patria (Quito)',1,'pilotis'),
S('ecuador-tierra','Tierra contemporánea ecuatoriana','Sierra (Pichincha, Imbabura, Azuay)',1995,null,'EC','Sostenible','Tapial y adobe con técnicas sismorresistentes|Restauración patrimonial en tierra (Cuenca)|Diseño bioclimático andino','Tierra apisonada, adobe, BTC, madera, teja','A','RES EDU CUL HOS','Al Borde, Proyecto vlirCPM (Universidad de Cuenca), constructores de tapial','Casa Entre Muros (Tumbaco, Pichincha)|Rehabilitaciones en tierra del centro histórico de Cuenca',3,'adobe'),
S('al-borde','Contemporánea ecuatoriana de bajo costo','Al Borde, Natura Futura y afines',2007,null,'EC','Sostenible','Presupuestos mínimos y materiales del lugar|Mingas y diseño participativo|Caña, madera, tierra y reciclados','Caña guadúa, madera, tierra, materiales reciclados','HA','EDU SOC CUL RES','Al Borde (D. Barragán, P. Gangotena, M. Borja, E. Benavides), Natura Futura, Rama Estudio, Entre Nos Atelier','Escuela Nueva Esperanza (Cabuyal, Manabí)|Casa Entre Muros (Tumbaco, Pichincha)',3,'palafito'),
S('galapagos','Galápagos contemporánea','Archipiélago de Galápagos',1990,null,'EC','Sostenible','Mínimo impacto y bioseguridad|Energía renovable y captación de agua lluvia|Materiales reciclados y prefabricación liviana','Acero reciclado, madera certificada, piedra volcánica, paneles solares','HS','TRA HOS CIE','ECOGAL (Corporación América) y estudios locales','Aeropuerto Ecológico Seymour (Baltra)|Pikaia Lodge (Santa Cruz)',3,'sol')
];
const BYID = Object.fromEntries(D.map(s => [s.id, s]));

/* ───────────────────────── GLIFOS SVG ───────────────────────── */
const G = {
  dolmen:'<path d="M22 82V46M44 82V46M16 46h34l4-8H20zM64 82V36M82 82V30M58 30l28-6"/><path d="M6 84h88"/>',
  adobe:'<path d="M10 40l40-18 40 18M14 84V40h72v44M14 53h72M14 66h72M32 40v13M56 40v13M74 40v13M24 53v13M44 53v13M66 53v13M36 66v18M58 66v18"/>',
  piramide:'<path d="M8 82L50 18l42 64zM50 18l12 64"/><path d="M4 84h92"/>',
  zigurat:'<path d="M8 84h84V70H8zM18 70V56h64v14M28 56V42h44v14M38 42V30h24v12"/><path d="M50 84V30" stroke-dasharray="3 4"/>',
  escalonada:'<path d="M8 84h84l-6-12H14zM14 72l6-12h60l6 12M20 60l6-12h48l6 12M26 48l6-12h36l6 12M38 36V22h24v14M34 22h32"/><path d="M44 84V42h12v42"/>',
  columna:'<path d="M30 20h40M34 26h32M30 20l4 6M70 20l-4 6M38 26v52M62 26v52M46 26v52M54 26v52M30 78h40M26 84h48"/>',
  jonica:'<path d="M30 20h40M26 26h48M38 32v46M62 32v46M46 32v46M54 32v46M32 78h36M28 84h44"/><circle cx="28" cy="31" r="6"/><circle cx="72" cy="31" r="6"/>',
  corintia:'<path d="M30 16h40M34 20c4 4 4 10 0 14M66 20c-4 4-4 10 0 14M42 20c0 6 8 10 8 16M58 20c0 6-8 10-8 16M36 36h28M40 36v42M60 36v42M50 36v42M34 78h32M30 84h40"/>',
  templo:'<path d="M10 40L50 16l40 24zM14 40h72M18 46v32M34 46v32M50 46v32M66 46v32M82 46v32M10 78h80M6 84h88"/>',
  arco:'<path d="M8 82V36h84v46M8 44h84M18 82V62a10 10 0 0 1 20 0v20M40 82V62a10 10 0 0 1 20 0v20M62 82V62a10 10 0 0 1 20 0v20"/>',
  basilica:'<path d="M20 84V48h60v36M30 48V32h40v16M14 48l36-24 36 24M44 84V66a6 6 0 0 1 12 0v18M28 58v10M72 58v10M38 38v6M50 38v6M62 38v6"/>',
  cupula:'<path d="M18 84V56h64v28M14 56h72M22 56a28 28 0 0 1 56 0M50 28V18M46 18h8M30 84V68M70 84V68M44 84V68a6 6 0 0 1 12 0v16"/>',
  iwan:'<path d="M12 84V22h76v62M24 28h52M30 84V54Q30 34 50 28Q70 34 70 54v30M38 84V56Q38 42 50 36Q62 42 62 56"/>',
  herradura:'<path d="M22 86V60A28 28 0 1 1 78 60V86M30 86V62A20 20 0 1 1 70 62V86M50 22v8M34 32l4 6M66 32l-4 6M24 48l7 2M76 48l-7 2"/>',
  minarete:'<path d="M44 86V30h12v56M40 30h20M46 30V20h8v10M50 20v-8M42 48h16M42 66h16"/><path d="M10 86V64a12 12 0 0 1 24 0v22M66 86V64a12 12 0 0 1 24 0v22M6 86h88"/>',
  bulbo:'<path d="M50 10v8M50 18c-14 8-22 16-22 26 0 6 4 10 8 12h28c4-2 8-6 8-12 0-10-8-18-22-26zM28 56h44v28H28zM16 84h68M42 84V72a8 8 0 0 1 16 0v12M18 84V62M82 84V62M14 62h8M78 62h8"/>',
  celosia:'<rect x="16" y="16" width="68" height="68"/><path d="M16 33L33 16M16 50L50 16M16 67L67 16M16 84L84 16M33 84L84 33M50 84L84 50M67 84L84 67M33 16L84 67M16 16L84 84M16 33L67 84M50 16L84 50M16 50L50 84M16 67L33 84M67 16L84 33"/>',
  ojiva:'<path d="M24 86V50Q24 24 50 12Q76 24 76 50v36M32 86V52Q32 32 50 22Q68 32 68 52v34M50 22v64M32 58Q41 50 50 58Q59 50 68 58"/><circle cx="50" cy="42" r="7"/>',
  roseton:'<circle cx="50" cy="50" r="36"/><circle cx="50" cy="50" r="10"/><path d="M50 14v26M50 60v26M14 50h26M60 50h26M24.5 24.5l18.4 18.4M57.1 57.1l18.4 18.4M75.5 24.5L57.1 42.9M42.9 57.1L24.5 75.5"/>',
  torre:'<path d="M28 86V30h44v56M24 30h52V18h-8v6h-8v-6h-8v6h-8v-6h-8v6h-8v-6h-4zM44 86V70a6 6 0 0 1 12 0v16M38 42v10M62 42v10"/>',
  ladrillo:'<path d="M10 86V34h80v52M10 46h80M10 58h80M10 70h80M30 34v12M50 34v12M70 34v12M20 46v12M40 46v12M60 46v12M80 46v12M30 58v12M70 58v12"/><path d="M38 86V78a12 12 0 0 1 24 0v8"/>',
  voluta:'<path d="M20 86V44h60v42M14 44h72M20 44c0-14 12-22 30-26 18 4 30 12 30 26M50 18V8M44 86V64a6 6 0 0 1 12 0v22M30 56v12M70 56v12"/><circle cx="31" cy="34" r="4"/><circle cx="69" cy="34" r="4"/>',
  portal:'<path d="M8 86V30h84v56M4 30h92l-8-8H12zM8 56h84M8 60h84M20 86V60M40 86V60M60 86V60M80 86V60M16 36h12v14H16zM44 36h12v14H44zM72 36h12v14H72z"/>',
  palafito:'<path d="M12 50L50 20l38 30M20 44v18h60V44M24 62v22M40 62v22M60 62v22M76 62v22M30 48h12v8H30zM56 48h14v14"/><path d="M6 78q7-4 14 0t14 0t14 0t14 0t14 0t14 0"/>',
  maloca:'<path d="M8 84Q18 32 50 12Q82 32 92 84zM50 12V6M40 84V66h20v18M24 56h52M16 70h68"/>',
  estupa:'<path d="M14 80h72v6H14zM20 80a30 30 0 0 1 60 0M40 50h20v-6H40zM50 44V20M42 26h16M44 32h12M46 20h8M50 12v8"/>',
  shikhara:'<path d="M30 86V62h40v24M34 62C34 40 40 24 50 12c10 12 16 28 16 50M38 50h24M38 40h24M42 30h16M50 12V6M16 86V72h14M70 72h14v14M10 86h80"/>',
  pagoda:'<path d="M50 8v8M30 28Q50 24 70 28l-6-8H36zM34 28v10h32V28M24 48Q50 42 76 48l-8-10H32zM30 48v10h40V48M18 68Q50 62 82 68l-10-10H28zM26 68v18h48V68M14 86h72M46 86V76h8v10"/>',
  torii:'<path d="M10 20Q50 12 90 20l-2 7H12zM20 36h60M28 26v60M72 26v60M50 27v9M22 86h12M66 86h12"/>',
  chino:'<path d="M6 40Q50 30 94 40l-10-14H16zM18 40v8h64v-8M24 48v30M76 48v30M40 48v30M60 48v30M12 78h76M6 86h88M44 26V18h12v8"/>',
  jemer:'<path d="M8 86h84l-6-10H14zM20 76V60h60v16M28 60c0-12 3-20 7-26 4 6 7 14 7 26M58 60c0-12 3-20 7-26 4 6 7 14 7 26M42 48c0-16 4-26 8-36 4 10 8 20 8 36M40 60V48h20v12"/>',
  inca:'<path d="M8 86V28h84v58M8 42l16-2 14 3 18-2 16 2 20-1M8 56l20 1 14-2 18 2 32-1M8 70l16-1 22 2 16-1 30 1M40 86L43 50h14l3 36"/>',
  banco:'<path d="M14 86V40l6-10 6 10v46M74 86V40l6-10 6 10v46M26 86V54h48v32M8 86h84M20 50h-8M20 64h-8M80 50h8M80 64h8M38 54v-8M50 54v-8M62 54v-8M44 86V72a6 6 0 0 1 12 0v14"/>',
  cercha:'<path d="M8 86V52a42 36 0 0 1 84 0v34M8 86h84M20 86V54a30 26 0 0 1 60 0v32M50 16v70M8 64h84M30 26l-10 26M70 26l10 26M40 18l-8 34M60 18l8 34"/>',
  rascacielos:'<path d="M30 88V16h40v72M38 16V8h24v8M30 28h40M30 40h40M30 52h40M30 64h40M30 76h40M43 16v72M57 16v72M22 88h56"/>',
  pilotis:'<path d="M12 38h76v24H12zM12 50h76M22 62v22M38 62v22M62 62v22M78 62v22M46 84V70h14v14M54 28h18v10H54zM6 84h88"/>',
  voladizo:'<path d="M8 44h60v8H8zM32 28h62v8H32zM42 36v8M20 52v32M48 20h10v8H48zM6 84h88M58 52l-2 32"/><path d="M66 74q7-4 14 0t14 0"/>',
  reticula:'<rect x="14" y="14" width="72" height="72"/><path d="M14 40h72M44 14v72M44 62h42M66 40v46M14 66h30"/><rect x="18" y="44" width="22" height="18" fill="currentColor" opacity=".25" stroke="none"/>',
  organica:'<path d="M8 84C20 40 40 70 50 40S80 18 92 84M8 84h84M22 70c8-14 18-6 26-18M60 30c6 10 14 14 22 12"/>',
  catenaria:'<path d="M8 84Q29 8 50 84Q71 8 92 84M8 84h84M14 70h72M50 84V46"/>',
  brutal:'<path d="M12 86V44h30v42M42 86V22h46v64M12 44l10-8h20M42 56h46M42 70h46M52 22v-8h26v8M20 54h14v10H20z"/>',
  fronton:'<path d="M22 86V34h56v52M22 34l18-16M78 34L60 18M36 86V64h28v22M16 86h68"/><circle cx="50" cy="46" r="8"/>',
  decon:'<path d="M10 82L30 30l26 12-8 40zM40 22l46 10-10 30-34-8zM58 72l30-12 4 24H54zM6 86h88"/>',
  parametrica:'<path d="M8 70C30 40 60 80 92 30M8 78C30 50 60 86 92 40M8 86C30 60 60 92 92 52M8 62C30 30 60 74 92 20M8 54C30 22 60 66 92 12"/>',
  hoja:'<path d="M50 88V40M50 66C30 62 20 46 22 26c18 2 28 14 28 40zM50 54c4-20 16-30 34-30 0 20-14 32-34 30zM20 88h60"/>',
  sol:'<circle cx="72" cy="24" r="10"/><path d="M72 6v4M72 38v4M54 24h4M86 24h4M60 12l3 3M81 33l3 3M60 36l3-3M81 15l3-3M10 86V42h50v44M6 42h58M10 52h50M10 60h50M10 68h50M10 76h50"/>',
  geodesica:'<path d="M10 72a40 40 0 0 1 80 0zM10 72h80M30 72l20-38 20 38M30 72L18 50M70 72l12-22M18 50l32-16 32 16M18 50l12 22M82 50l-12 22M50 34V18M6 80h88"/>',
  tension:'<path d="M10 82L30 24 52 60 74 18 90 82M30 24Q40 50 52 60Q64 44 74 18M10 82Q50 58 90 82M30 24v60M74 18v66"/>',
  modulo:'<path d="M12 86V64h28v22zM40 86V64h28v22zM26 64V42h28v22zM54 64V42h28v22zM40 42V20h28v22zM6 86h88"/>',
  aerodinamica:'<path d="M10 86V50h52a24 24 0 0 1 24 24v12zM10 60h70M10 68h74M10 76h76M24 50V34h28v16M30 34V24h16v10"/>',
  yurta:'<path d="M12 86V54h76v32M6 54Q50 16 94 54M44 86V66h12v20M50 24v-8M22 54l28-28 28 28M12 70h76"/>',
  tulou:'<ellipse cx="50" cy="56" rx="40" ry="16"/><ellipse cx="50" cy="56" rx="22" ry="8"/><path d="M10 56v16M90 56v16M10 72q40 28 80 0M10 48Q50 22 90 48"/>',
  iglu:'<path d="M10 82a40 40 0 0 1 80 0zM10 82h80M40 82V70a10 10 0 0 1 20 0v12M18 62h64M30 48h40M30 82V62M70 82V62M50 62V48M40 48V42M60 48V42"/>'
};
function glyph(k, cls){
  const inner = (G[k] || G.templo).replace(/<(path|circle|rect|ellipse) /g, '<$1 pathLength="100" ');
  return '<svg class="'+(cls||'')+'" viewBox="0 0 100 100" aria-hidden="true"><g fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round">'+inner+'</g></svg>';
}

/* ───────────────────────── AFINIDAD ───────────────────────── */
const CATN = {RES:'Residencial',HOS:'Hospedaje y turismo',COM:'Comercio y servicios',GAS:'Gastronomía',OFI:'Oficinas',MIX:'Uso mixto',SAL:'Salud',EDU:'Educación',CUL:'Cultura',REL:'Religioso y funerario',GOB:'Gobierno',SEG:'Seguridad y emergencia',SOC:'Social y comunitario',DEP:'Deporte',PUB:'Espacio público y paisaje',EVE:'Eventos y convenciones',TRA:'Transporte',IND:'Industria y logística',AGR:'Agropecuario',INF:'Infraestructura',CIE:'Ciencia',EFI:'Efímera/modular',FUT:'Emergentes'};
const USOTXT = {SAL:'luz natural, ventilación, higiene y calma',EDU:'aulas luminosas, patios y escala humana',CUL:'espacios representativos y recorridos',REL:'atmósfera, luz y simbolismo',GOB:'representatividad y orden cívico',RES:'confort cotidiano y escala doméstica',HOS:'experiencia del lugar y confort',COM:'flexibilidad y relación con la calle',GAS:'atmósfera y relación con el entorno',OFI:'flexibilidad y eficiencia',MIX:'densidad y vida urbana',SEG:'robustez y control',SOC:'apropiación comunitaria',DEP:'grandes luces y ventilación',PUB:'integración con el paisaje',EVE:'grandes luces y flujos de público',TRA:'flujos y grandes cubiertas',IND:'luces amplias y modulación',AGR:'adaptación productiva al clima',INF:'eficiencia técnica',CIE:'precisión y flexibilidad',EFI:'montaje rápido y desmontable',FUT:'innovación material'};
const CLTXT = {'calido-humedo':'Clima cálido-húmedo: aleros, sombra y ventilación cruzada','calido-seco':'Clima cálido-seco: masa térmica, patios y sombra','templado':'Clima templado: orientación solar y protección moderada','frio':'Clima frío: compacidad, masa y aislamiento','andino':'Clima andino: inercia térmica, captación solar y sismorresistencia'};
const CLN = {'calido-humedo':'cálido-húmedo','calido-seco':'cálido-seco',templado:'templado',frio:'frío',andino:'andino'};
const CLADJ = {'calido-humedo':['calido-seco'],'calido-seco':['calido-humedo','templado'],templado:['andino','calido-seco'],frio:['andino'],andino:['frio','templado']};
const FAMPREF = {SAL:['Sostenible','Moderno','Contemporáneo'],EDU:['Moderno','Sostenible','Contemporáneo'],CUL:['Contemporáneo','Moderno','Clásico'],REL:['Medieval','Colonial','Renacimiento y Barroco'],GOB:['Neoclásico','Moderno','Contemporáneo'],RES:['Vernáculo','Moderno','Sostenible'],HOS:['Vernáculo','Sostenible','Asiático'],COM:['Contemporáneo','Moderno temprano','Moderno'],GAS:['Vernáculo','Contemporáneo','Sostenible'],OFI:['Moderno','Contemporáneo','Sostenible'],MIX:['Contemporáneo','Moderno','Sostenible'],SEG:['Moderno','Contemporáneo'],SOC:['Sostenible','Vernáculo','Contemporáneo'],DEP:['Moderno','Contemporáneo'],PUB:['Sostenible','Contemporáneo','Vernáculo'],EVE:['Contemporáneo','Moderno'],TRA:['Contemporáneo','Moderno temprano','Moderno'],IND:['Moderno temprano','Moderno','Contemporáneo'],AGR:['Vernáculo','Sostenible'],INF:['Contemporáneo','Sostenible'],CIE:['Contemporáneo','Moderno','Sostenible'],EFI:['Contemporáneo','Sostenible'],FUT:['Contemporáneo','Sostenible']};
const LATAM = new Set(['ECU','COL','PER','BOL','CHL','ARG','URY','PRY','BRA','VEN','MEX','GTM','HND','SLV','NIC','CRI','PAN','CUB','DOM','PRI','HTI','GUY','SUR','BLZ']);
const AF_MIN = 60;

function computeAff(ctx){
  const P = ctx.P || {}, loc = P.loc || {};
  const ct = ctx.clima && ctx.clima.tipo, cat = ctx.tipo && ctx.tipo.cat && ctx.tipo.cat.c;
  const iso = (P.iso || '').toUpperCase();
  const isEC = iso === 'ECU' || /ecuador/i.test(loc.pais || '');
  const isLA = isEC || LATAM.has(iso);
  const fp = FAMPREF[cat] || ['Contemporáneo','Moderno','Sostenible'];
  const nowY = new Date().getFullYear();
  const out = {};
  D.forEach(st => {
    let s = 0; const R = [];
    if (ct) {
      if (st.clima.includes(ct)) { s += 30; R.push([30, CLTXT[ct]]); }
      else if (st.clima.some(c => (CLADJ[ct] || []).includes(c))) { s += 12; R.push([10, 'Clima afín, requiere adaptar a ' + CLN[ct]]); }
    } else s += 12;
    if (cat) {
      if (st.usos.includes(cat)) { s += 22; R.push([22, 'Probado en ' + CATN[cat] + ': ' + USOTXT[cat]]); }
    } else s += 8;
    let rb = 0, rt = '';
    if (isEC) {
      if (st.ln === 'EC') { rb = 18; rt = 'Raíz ecuatoriana: identidad y saber local'; }
      else if (st.ln === 'PC') { rb = ANDINOS.has(st.id) ? 12 : 8; rt = ANDINOS.has(st.id) ? 'Herencia andina compartida con Ecuador' : 'Referente precolombino americano'; }
      else if (st.ln === 'LA') { rb = ANDINOS.has(st.id) ? 14 : 12; rt = 'Referente latinoamericano cercano'; }
      else if (st.ln === 'GL') { rb = 6; rt = ''; }
    } else if (isLA) {
      if (st.ln === 'LA') { rb = 16; rt = 'Referente latinoamericano'; }
      else if (st.ln === 'EC' || st.ln === 'PC') { rb = 10; rt = 'Referente regional americano'; }
      else if (st.ln === 'GL') rb = 6;
    } else if (st.ln === 'GL') rb = 8;
    s += rb; if (rt) R.push([rb, rt]);
    s += st.sost * 6;
    if (st.sost === 3) R.push([18, 'Alta adecuación bioclimática (3/3)']);
    else if (st.sost === 2) R.push([9, 'Buena respuesta bioclimática (2/3)']);
    if (st.yf == null) { const v = st.yi >= 1900 ? 10 : 6; s += v; R.push([v, st.yi >= 1900 ? 'Corriente vigente y contemporánea' : 'Tradición viva, aún se construye']); }
    else if (st.yf >= 1950) s += 4;
    const fi = fp.indexOf(st.familia);
    if (fi >= 0) { const b = [8,6,4][fi]; s += b; if (cat) R.push([b - 2, 'Familia ' + st.familia.toLowerCase() + ' afín a ' + CATN[cat].toLowerCase()]); }
    const p = Math.max(1, Math.min(99, Math.round(s / 106 * 100)));
    R.sort((a,b) => b[0] - a[0]);
    out[st.id] = {p, r: R.slice(0, 3).map(x => x[1])};
    if (!out[st.id].r.length) out[st.id].r = ['Referencia histórica; poca relación directa con este proyecto'];
  });
  return out;
}

/* ───────────────────────── ESCALA DE TIEMPO ───────────────────────── */
const KN = [-10000,-3000,-500,500,1400,1750,1900,1970,2030];
const UN = [0,0.7,2.0,3.0,4.1,5.3,6.5,8.1,9.6];
const UMAX = UN[UN.length - 1];
function U(y){
  if (y <= KN[0]) return 0;
  for (let i = 0; i < KN.length - 1; i++) if (y <= KN[i+1]) return UN[i] + (y - KN[i]) / (KN[i+1] - KN[i]) * (UN[i+1] - UN[i]);
  return UMAX;
}
const ERAS = [[-10000,-3000,'PREHISTORIA'],[-3000,476,'ANTIGÜEDAD'],[476,1453,'EDAD MEDIA'],[1453,1789,'EDAD MODERNA'],[1789,1945,'CONTEMPORÁNEA'],[1945,2030,'S. XX–XXI']];
const CAND = (() => {
  const lv = [[1000,-10000],[500,-3000],[100,-3000],[50,500],[25,1500],[10,1800],[5,1900],[1,1995]];
  const m = new Map();
  lv.forEach(([st, from], l) => { for (let y = Math.ceil(from / st) * st; y <= 2030; y += st) if (!m.has(y)) m.set(y, l); });
  return [...m.entries()].map(([y,l]) => ({y,l})).sort((a,b) => a.l - b.l || a.y - b.y);
})();
function fmtY(y){ if (y == null) return 'hoy'; if (y < 0) return Math.abs(y) + ' a.C.'; if (y < 1000) return y + ' d.C.'; return String(y); }
function fmtR(st){ return fmtY(st.yi) + ' – ' + fmtY(st.yf); }
function norm(s){ return String(s || '').normalize('NFD').replace(/[̀-ͯ]/g,'').toLowerCase(); }
const HAY = {}; D.forEach(s => { HAY[s.id] = norm([s.n, s.era, s.region, s.familia, s.rasgos.join(' '), s.materiales, s.autores, s.obras.join(' ')].join(' ')); });

/* ───────────────────────── CSS ───────────────────────── */
const CSS = `
.m-estilos{position:relative;height:100%;overflow:auto;container-type:inline-size;font-family:var(--f-b);color:var(--ink);background:radial-gradient(120% 80% at 70% 0%,rgba(var(--acc-rgb),.07),transparent 60%),var(--bg);-webkit-tap-highlight-color:transparent}
.m-estilos *{box-sizing:border-box}
.m-estilos button{font:inherit;color:inherit;cursor:pointer;border:0;background:none}
.m-estilos-in{display:flex;flex-direction:column;height:100%;min-height:520px}
.m-estilos-top{flex:none;padding:12px 14px 8px;display:flex;flex-direction:column;gap:10px;border-bottom:1px solid var(--line)}
.m-estilos-hd{display:flex;align-items:center;gap:12px;flex-wrap:wrap}
.m-estilos-logo{width:40px;height:40px;flex:none;color:var(--acc);border:1px solid var(--line2);border-radius:10px;display:grid;place-items:center;background:rgba(var(--acc-rgb),.06);box-shadow:inset 0 0 12px rgba(var(--acc-rgb),.15)}
.m-estilos-logo svg{width:28px;height:28px}
.m-estilos-tt{flex:1;min-width:180px}
.m-estilos-tt h2{margin:0;font-family:var(--f-d);font-size:13px;letter-spacing:.18em;font-weight:400;text-transform:uppercase}
.m-estilos-tt p{margin:3px 0 0;color:var(--muted);font-size:12px}
.m-estilos-kpis{display:flex;gap:8px;flex-wrap:wrap}
.m-estilos-kpi{font-family:var(--f-m);font-size:11px;padding:6px 10px;border:1px solid var(--line2);border-radius:8px;background:var(--panel);color:var(--muted);white-space:nowrap}
.m-estilos-kpi b{color:var(--ink);font-weight:600;margin-right:4px}
.m-estilos-kpi.lime b{color:var(--done)}
.m-estilos-ctl{display:flex;gap:8px;align-items:center;flex-wrap:wrap}
.m-estilos-search{flex:1 1 220px;min-width:180px;position:relative}
.m-estilos-search input{width:100%;height:40px;border-radius:10px;border:1px solid var(--line2);background:rgba(8,16,26,.9);padding:0 12px 0 36px;color:var(--ink);font-family:var(--f-b);font-size:14px;outline:none}
.m-estilos-search input:focus{border-color:var(--acc);box-shadow:0 0 0 3px rgba(var(--acc-rgb),.15)}
.m-estilos-search svg{position:absolute;left:11px;top:12px;width:16px;height:16px;color:var(--muted)}
.m-estilos-btn{height:40px;min-width:40px;padding:0 12px;border-radius:10px;border:1px solid var(--line2)!important;background:var(--panel)!important;font-family:var(--f-d)!important;font-size:9.5px!important;letter-spacing:.14em;text-transform:uppercase;display:inline-flex;align-items:center;justify-content:center;gap:6px;white-space:nowrap;transition:border-color .15s,box-shadow .15s,background .15s}
.m-estilos-btn:hover{border-color:var(--acc)!important}
.m-estilos-btn[aria-pressed="true"]{border-color:var(--done)!important;color:var(--done);background:rgba(var(--done-rgb),.08)!important;box-shadow:0 0 12px rgba(var(--done-rgb),.25)}
.m-estilos-btn.acc{border-color:rgba(var(--acc-rgb),.6)!important;color:var(--acc)}
.m-estilos-btn.go{border-color:var(--done)!important;color:#061006;background:var(--done)!important;box-shadow:0 0 18px rgba(var(--done-rgb),.35)}
.m-estilos-btn.warn{border-color:var(--warn)!important;color:var(--warn)}
.m-estilos-btn[hidden]{display:none}
.m-estilos-btn .n{font-family:var(--f-m);font-size:11px;letter-spacing:0}
.m-estilos-filt{display:none;flex-direction:column;gap:8px;padding:10px;border:1px solid var(--line);border-radius:12px;background:rgba(10,19,31,.6)}
.m-estilos-filt.on{display:flex}
.m-estilos-fl{display:flex;gap:8px;align-items:flex-start}
.m-estilos-fl>span{flex:none;width:64px;font-family:var(--f-d);font-size:9px;letter-spacing:.14em;color:var(--faint);padding-top:13px}
.m-estilos-chips{display:flex;gap:6px;flex-wrap:wrap}
.m-estilos-chip{min-height:36px;padding:0 11px;border-radius:18px;border:1px solid var(--line2);background:var(--panel2);font-size:12px;color:var(--muted)}
.m-estilos-chip[aria-pressed="true"]{border-color:var(--acc);color:var(--ink);background:rgba(var(--acc-rgb),.14);box-shadow:0 0 10px rgba(var(--acc-rgb),.2)}
.m-estilos-main{flex:1;min-height:0;display:grid;grid-template-columns:minmax(0,1fr) 340px}
.m-estilos-vp{position:relative;overflow:hidden;touch-action:none;user-select:none;-webkit-user-select:none;cursor:grab;background:#03060B;border-right:1px solid var(--line);outline:none;min-height:0}
.m-estilos-vp:focus-visible{box-shadow:inset 0 0 0 2px rgba(var(--acc-rgb),.5)}
.m-estilos-vp.drag{cursor:grabbing}
.m-estilos-vp.hov{cursor:pointer}
.m-estilos-cv{position:absolute;left:0;top:0;width:100%;height:100%;display:block}
.m-estilos-zc{position:absolute;right:10px;bottom:10px;display:flex;flex-direction:column;align-items:flex-end;gap:6px;z-index:5}
.m-estilos-zc .zr{display:flex;gap:6px}
.m-estilos-zc button{min-width:44px;height:44px;border-radius:10px;border:1px solid var(--line2);background:rgba(8,16,26,.9);font-family:var(--f-m);font-size:18px;color:var(--acc);display:inline-flex;align-items:center;justify-content:center;gap:6px;-webkit-backdrop-filter:blur(4px);backdrop-filter:blur(4px);transition:border-color .15s,box-shadow .15s}
.m-estilos-zc button:hover{border-color:var(--acc);box-shadow:0 0 12px rgba(var(--acc-rgb),.25)}
.m-estilos-zc button.t{font-family:var(--f-d);font-size:8.5px;letter-spacing:.14em;padding:0 12px;text-transform:uppercase}
.m-estilos-zc button.af{color:var(--done);border-color:rgba(var(--done-rgb),.55)}
.m-estilos-zc button svg{width:16px;height:16px}
.m-estilos-hint{position:absolute;left:74px;bottom:12px;z-index:5;font-family:var(--f-m);font-size:10px;color:var(--faint);pointer-events:none;background:rgba(3,6,11,.7);padding:4px 8px;border-radius:6px}
.m-estilos-lg{position:absolute;left:74px;top:8px;z-index:5;display:flex;gap:10px;flex-wrap:wrap;pointer-events:none;font-family:var(--f-m);font-size:10px;color:var(--muted);background:rgba(3,6,11,.62);padding:5px 9px;border-radius:8px;border:1px solid var(--line)}
.m-estilos-lg span{display:inline-flex;align-items:center;gap:5px}
.m-estilos-lg i{width:9px;height:9px;border-radius:50%;display:inline-block}
.m-estilos-lg .l1{background:var(--done);box-shadow:0 0 8px var(--done)}
.m-estilos-lg .l2{background:#FFC864;box-shadow:0 0 6px #FFC864}
.m-estilos-lg .l3{border:1.5px solid #fff}
.m-estilos-lg .l4{border:1.5px dashed var(--done);box-shadow:0 0 6px var(--done)}
.m-estilos-tip{position:absolute;left:0;top:0;z-index:6;pointer-events:none;max-width:260px;padding:8px 10px;border:1px solid var(--line2);border-radius:10px;background:rgba(6,12,20,.94);font-size:12px;box-shadow:0 0 18px rgba(var(--acc-rgb),.15);display:none}
.m-estilos-tip b{display:block;font-size:13px;line-height:1.25}
.m-estilos-tip span{display:block;font-family:var(--f-m);font-size:10.5px;color:var(--muted);margin-top:2px}
.m-estilos-tip em{font-style:normal;font-family:var(--f-m);color:var(--done)}
.m-estilos-tip small{display:block;font-size:10px;color:var(--faint);margin-top:4px}
.m-estilos-fc{position:absolute;left:0;top:0;z-index:7;width:262px;padding:10px 10px 10px 12px;border:1px solid rgba(var(--done-rgb),.45);border-radius:12px;background:rgba(6,12,20,.95);box-shadow:0 0 22px rgba(var(--done-rgb),.14);display:none;touch-action:manipulation}
.m-estilos-fc::before{content:"";position:absolute;left:-1px;top:-1px;width:10px;height:10px;border:2px solid var(--done);border-width:2px 0 0 2px;border-top-left-radius:5px}
.m-estilos-fc .hd{display:flex;gap:10px;align-items:center}
.m-estilos-fc .g{width:38px;height:38px;flex:none;color:var(--done);border:1px solid var(--line);border-radius:9px;display:grid;place-items:center}
.m-estilos-fc .g svg{width:30px;height:30px}
.m-estilos-fc .nm{font-weight:700;font-size:13px;line-height:1.2}
.m-estilos-fc .er{font-family:var(--f-m);font-size:10px;color:var(--muted);margin-top:2px}
.m-estilos-fc .af{font-family:var(--f-m);font-size:11px;color:var(--acc);margin-top:6px}
.m-estilos-fc .af.hi{color:var(--done)}
.m-estilos-fc .row{display:flex;gap:6px;margin-top:8px}
.m-estilos-fc .row button{height:40px;min-width:40px;padding:0 10px;border-radius:9px;border:1px solid var(--line2);background:var(--panel2);font-size:12px;color:var(--ink)}
.m-estilos-fc .row button.op{flex:1;font-family:var(--f-d);font-size:8.5px;letter-spacing:.14em;color:var(--acc);border-color:rgba(var(--acc-rgb),.6)}
.m-estilos-fc .row button.on{border-color:var(--done);color:var(--done);background:rgba(var(--done-rgb),.1)}
.m-estilos-fc .x{position:absolute;right:4px;top:4px;width:30px;height:30px;color:var(--muted);font-size:14px}
.m-estilos-empty{position:absolute;left:0;right:0;top:44px;display:flex;justify-content:center;pointer-events:none;z-index:4}
.m-estilos-empty[hidden]{display:none}
.m-estilos-empty span{font-size:12px;color:var(--warn);background:rgba(3,6,11,.85);border:1px solid var(--warn);padding:5px 10px;border-radius:8px}
.m-estilos-rec{min-height:0;overflow:auto;padding:12px;display:flex;flex-direction:column;gap:10px;background:linear-gradient(180deg,rgba(14,25,40,.6),rgba(3,6,11,.4))}
.m-estilos-h{font-family:var(--f-d);font-size:10px;letter-spacing:.18em;color:var(--acc);text-transform:uppercase;display:flex;align-items:center;gap:8px}
.m-estilos-h::after{content:"";flex:1;height:1px;background:linear-gradient(90deg,var(--line2),transparent)}
.m-estilos-ctx{display:flex;flex-wrap:wrap;gap:6px}
.m-estilos-ctx span{font-size:11px;padding:5px 9px;border-radius:7px;border:1px solid var(--line);background:var(--panel);color:var(--muted)}
.m-estilos-ctx span b{color:var(--ink);font-weight:600}
.m-estilos-ia{display:flex;flex-direction:column;gap:8px;padding:10px;border:1px solid var(--warn);border-radius:12px;background:rgba(255,92,122,.06)}
.m-estilos-ia.ok{border-color:var(--done);background:rgba(var(--done-rgb),.05)}
.m-estilos-ia p{margin:0;font-size:12px;color:var(--muted)}
.m-estilos-tag{display:inline-block;font-family:var(--f-d);font-size:8.5px;letter-spacing:.16em;padding:4px 7px;border-radius:5px;border:1px solid var(--warn);color:var(--warn)}
.m-estilos-tag.ok{border-color:var(--done);color:var(--done)}
.m-estilos-row{display:flex;gap:6px;flex-wrap:wrap}
.m-estilos-rc{position:relative;display:grid;grid-template-columns:auto 44px minmax(0,1fr) auto;gap:10px;align-items:center;padding:10px 10px 10px 8px;border:1px solid var(--line2);border-radius:12px;background:var(--glass);cursor:pointer;transition:border-color .15s,box-shadow .15s}
.m-estilos-rc::before,.m-estilos-rc::after{content:"";position:absolute;width:9px;height:9px;border-color:var(--acc);border-style:solid;opacity:.7}
.m-estilos-rc::before{left:-1px;top:-1px;border-width:2px 0 0 2px;border-top-left-radius:4px}
.m-estilos-rc::after{right:-1px;bottom:-1px;border-width:0 2px 2px 0;border-bottom-right-radius:4px}
.m-estilos-rc:hover{border-color:var(--acc);box-shadow:0 0 14px rgba(var(--acc-rgb),.18)}
.m-estilos-rc.hi{border-color:rgba(var(--done-rgb),.55)}
.m-estilos-rc.hi::before,.m-estilos-rc.hi::after{border-color:var(--done)}
.m-estilos-rc.iav{border-color:rgba(255,92,122,.6)}
.m-estilos-rc.chosen{background:rgba(var(--done-rgb),.07)}
.m-estilos-rk{font-family:var(--f-m);font-size:10px;color:var(--faint);writing-mode:vertical-rl;transform:rotate(180deg)}
.m-estilos-rg{width:44px;height:44px;border-radius:10px;border:1px solid var(--line);display:grid;place-items:center;color:var(--acc);background:rgba(var(--acc-rgb),.05)}
.m-estilos-rc.hi .m-estilos-rg{color:var(--done);background:rgba(var(--done-rgb),.06)}
.m-estilos-rg svg{width:34px;height:34px}
.m-estilos-rt{min-width:0}
.m-estilos-rt .nm{font-weight:700;font-size:13px;line-height:1.2}
.m-estilos-rt .er{font-family:var(--f-m);font-size:10px;color:var(--muted);margin-top:2px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.m-estilos-rt .why{font-size:11px;color:var(--muted);margin-top:4px;line-height:1.35}
.m-estilos-rt .why i{font-style:normal;color:var(--acc)}
.m-estilos-rc.hi .why i{color:var(--done)}
.m-estilos-rr{display:flex;flex-direction:column;align-items:center;gap:6px}
.m-estilos-ring{position:relative;width:44px;height:44px}
.m-estilos-ring svg{width:44px;height:44px;transform:rotate(-90deg)}
.m-estilos-ring b{position:absolute;inset:0;display:grid;place-items:center;font-family:var(--f-m);font-size:11px}
.m-estilos-mini{display:flex;gap:4px}
.m-estilos-mini button{width:40px;height:40px;border-radius:9px;border:1px solid var(--line2);background:var(--panel2);color:var(--muted);font-size:15px}
.m-estilos-mini button.on{border-color:var(--done);color:var(--done);background:rgba(var(--done-rgb),.1)}
.m-estilos-bar{flex:none;display:flex;align-items:center;gap:10px;padding:10px 14px;border-top:1px solid var(--line2);background:linear-gradient(0deg,rgba(3,6,11,.98),rgba(8,16,26,.94));position:sticky;bottom:0;z-index:6}
.m-estilos-bl{flex:none;font-family:var(--f-d);font-size:9.5px;letter-spacing:.16em;color:var(--muted);display:flex;align-items:center;gap:8px}
.m-estilos-bl b{font-family:var(--f-m);font-size:13px;color:var(--done);min-width:26px;height:26px;border-radius:13px;border:1px solid var(--done);display:grid;place-items:center;letter-spacing:0;box-shadow:0 0 10px rgba(var(--done-rgb),.3)}
.m-estilos-sc{flex:1;min-width:0;display:flex;gap:6px;overflow-x:auto;scrollbar-width:thin;padding:2px}
.m-estilos-sc em{font-style:normal;font-size:12px;color:var(--faint);align-self:center;white-space:nowrap}
.m-estilos-sel{flex:none;display:inline-flex;align-items:center;gap:6px;height:40px;padding:0 4px 0 12px;border-radius:20px;border:1px solid var(--line2);background:var(--panel2);font-size:12px;font-weight:600;cursor:pointer;white-space:nowrap}
.m-estilos-sel.pri{border-color:var(--done);color:var(--done);background:rgba(var(--done-rgb),.1);box-shadow:0 0 10px rgba(var(--done-rgb),.2)}
.m-estilos-sel button{width:32px;height:32px;border-radius:16px;color:var(--muted);font-size:16px}
.m-estilos-fx{position:absolute;left:0;right:0;z-index:20;display:flex;align-items:center;justify-content:center;padding:16px;background:rgba(2,5,9,.72);backdrop-filter:blur(4px);-webkit-backdrop-filter:blur(4px);animation:m-estilos-fade .2s ease-out}
@keyframes m-estilos-fade{from{opacity:0}to{opacity:1}}
.m-estilos-card{position:relative;width:min(980px,100%);max-height:100%;overflow:auto;display:grid;grid-template-columns:minmax(240px,340px) minmax(0,1fr);gap:18px;padding:20px;border:1px solid var(--line2);border-radius:16px;background:linear-gradient(160deg,rgba(14,25,40,.97),rgba(5,10,17,.97));box-shadow:0 0 40px rgba(var(--acc-rgb),.12),inset 0 0 30px rgba(var(--acc-rgb),.05);animation:m-estilos-rise .28s ease-out}
@keyframes m-estilos-rise{from{transform:translateY(14px) scale(.98);opacity:0}to{transform:none;opacity:1}}
.m-estilos-card::before,.m-estilos-card::after{content:"";position:absolute;width:18px;height:18px;border:2px solid var(--acc);pointer-events:none}
.m-estilos-card::before{left:-1px;top:-1px;border-width:2px 0 0 2px;border-top-left-radius:8px}
.m-estilos-card::after{right:-1px;bottom:-1px;border-width:0 2px 2px 0;border-bottom-right-radius:8px}
.m-estilos-x{position:absolute;right:10px;top:10px;width:40px;height:40px;border-radius:10px;border:1px solid var(--line2)!important;font-size:18px;color:var(--muted);z-index:2}
.m-estilos-holo{position:relative;width:100%;max-width:300px;aspect-ratio:1;margin:0 auto;perspective:700px}
.m-estilos-holo .ring{position:absolute;inset:0;color:var(--acc);animation:m-estilos-spin 22s linear infinite}
.m-estilos-holo .ring.r2{inset:9%;animation-duration:14s;animation-direction:reverse;opacity:.7}
@keyframes m-estilos-spin{to{transform:rotate(360deg)}}
.m-estilos-holo .disc{position:absolute;inset:16%;border-radius:50%;background:radial-gradient(circle,rgba(var(--acc-rgb),.16),rgba(var(--acc-rgb),.02) 65%,transparent 70%);overflow:hidden}
.m-estilos-holo .scan{position:absolute;left:0;right:0;height:30%;background:linear-gradient(180deg,transparent,rgba(var(--acc-rgb),.35),transparent);animation:m-estilos-scan 3.2s ease-in-out infinite;mix-blend-mode:screen}
@keyframes m-estilos-scan{0%{top:-30%}100%{top:100%}}
.m-estilos-holo .gly{position:absolute;inset:22%;color:var(--acc);filter:drop-shadow(0 0 6px rgba(var(--acc-rgb),.85));animation:m-estilos-sway 7s ease-in-out infinite;transform-style:preserve-3d}
.m-estilos-holo .gly svg{width:100%;height:100%}
.m-estilos-holo .gly path,.m-estilos-holo .gly circle,.m-estilos-holo .gly rect,.m-estilos-holo .gly ellipse{stroke-dasharray:100;stroke-dashoffset:100;animation:m-estilos-draw 1.6s ease-out forwards}
@keyframes m-estilos-draw{to{stroke-dashoffset:0}}
@keyframes m-estilos-sway{0%,100%{transform:rotateY(-22deg) rotateX(6deg)}50%{transform:rotateY(22deg) rotateX(-4deg)}}
.m-estilos-holo.hi .gly,.m-estilos-holo.hi .ring{color:var(--done)}
.m-estilos-holo.hi .gly{filter:drop-shadow(0 0 7px rgba(var(--done-rgb),.85))}
.m-estilos-holo::after{content:"";position:absolute;left:20%;right:20%;bottom:-6%;height:14%;border-radius:50%;background:radial-gradient(ellipse,rgba(var(--acc-rgb),.45),transparent 70%);filter:blur(4px)}
.m-estilos-pct{margin-top:12px;display:flex;flex-direction:column;gap:6px}
.m-estilos-pct .v{display:flex;align-items:baseline;justify-content:space-between;font-family:var(--f-d);font-size:9.5px;letter-spacing:.16em;color:var(--muted)}
.m-estilos-pct .v b{font-family:var(--f-m);font-size:26px;letter-spacing:0;color:var(--acc)}
.m-estilos-pct.hi .v b{color:var(--done);text-shadow:0 0 12px rgba(var(--done-rgb),.5)}
.m-estilos-meter{height:8px;border-radius:4px;background:rgba(var(--acc-rgb),.1);overflow:hidden;border:1px solid var(--line)}
.m-estilos-meter i{display:block;height:100%;background:linear-gradient(90deg,var(--acc),var(--done));box-shadow:0 0 10px rgba(var(--done-rgb),.6)}
.m-estilos-why{margin:4px 0 0;padding:0;list-style:none;display:flex;flex-direction:column;gap:5px}
.m-estilos-why li{font-size:12px;color:var(--ink);padding-left:16px;position:relative;line-height:1.35}
.m-estilos-why li::before{content:"";position:absolute;left:2px;top:6px;width:7px;height:7px;border:1px solid var(--done);transform:rotate(45deg)}
.m-estilos-info{min-width:0;display:flex;flex-direction:column;gap:12px}
.m-estilos-fam{font-family:var(--f-d);font-size:9px;letter-spacing:.18em;color:var(--acc);text-transform:uppercase;padding-right:44px}
.m-estilos-info h3{margin:0;font-family:var(--f-d);font-weight:400;font-size:clamp(16px,2.4cqi,22px);letter-spacing:.06em;line-height:1.3;text-transform:uppercase}
.m-estilos-era{font-family:var(--f-m);font-size:12px;color:var(--muted)}
.m-estilos-era b{color:var(--ink);font-weight:500}
.m-estilos-grid2{display:grid;grid-template-columns:1fr 1fr;gap:10px}
.m-estilos-box{border:1px solid var(--line);border-radius:10px;padding:10px;background:rgba(10,19,31,.6)}
.m-estilos-box h4{margin:0 0 6px;font-family:var(--f-d);font-weight:400;font-size:8.5px;letter-spacing:.18em;color:var(--faint);text-transform:uppercase}
.m-estilos-box ul{margin:0;padding-left:16px;font-size:12.5px;line-height:1.45}
.m-estilos-box p{margin:0;font-size:12.5px;line-height:1.45}
.m-estilos-box.wide{grid-column:1/-1}
.m-estilos-pills{display:flex;flex-wrap:wrap;gap:5px}
.m-estilos-pills span{font-size:11px;padding:3px 8px;border-radius:6px;border:1px solid var(--line2);color:var(--muted)}
.m-estilos-pills span.on{border-color:var(--done);color:var(--done)}
.m-estilos-sost{display:flex;gap:4px;align-items:center}
.m-estilos-sost i{width:22px;height:8px;border-radius:2px;background:rgba(var(--acc-rgb),.12);border:1px solid var(--line)}
.m-estilos-sost i.on{background:var(--done);box-shadow:0 0 8px rgba(var(--done-rgb),.5)}
.m-estilos-sost em{font-style:normal;font-family:var(--f-m);font-size:11px;color:var(--muted);margin-left:6px}
.m-estilos-acts{display:flex;flex-wrap:wrap;gap:8px}
.m-estilos-note{font-size:11px;color:var(--faint)}
.m-estilos-spin{width:14px;height:14px;border:2px solid currentColor;border-right-color:transparent;border-radius:50%;animation:m-estilos-spin .8s linear infinite}
.m-estilos-tabs{display:flex;gap:6px;flex:none}
.m-estilos-tab{flex:1;height:40px;border-radius:10px;border:1px solid var(--line2)!important;background:var(--panel)!important;font-family:var(--f-d)!important;font-size:8.5px!important;letter-spacing:.14em;text-transform:uppercase;color:var(--muted)!important;display:inline-flex;align-items:center;justify-content:center;gap:6px}
.m-estilos-tab b{font-family:var(--f-m);font-size:10.5px;letter-spacing:0;font-weight:500}
.m-estilos-tab[aria-selected="true"]{border-color:var(--acc)!important;color:var(--acc)!important;background:rgba(var(--acc-rgb),.1)!important;box-shadow:0 0 12px rgba(var(--acc-rgb),.18)}
.m-estilos-srt{display:flex;gap:6px;align-items:center;flex-wrap:wrap}
.m-estilos-srt em{font-style:normal;font-family:var(--f-m);font-size:10.5px;color:var(--muted);margin-left:auto}
.m-estilos-list{display:flex;flex-direction:column;gap:6px}
.m-estilos-li{display:grid;grid-template-columns:34px minmax(0,1fr) auto;gap:10px;align-items:center;min-height:48px;padding:6px 10px 6px 6px;border:1px solid var(--line);border-radius:10px;background:rgba(8,16,26,.7);cursor:pointer;transition:border-color .15s,background .15s}
.m-estilos-li:hover{border-color:var(--line2)}
.m-estilos-li .g{width:34px;height:34px;color:#FFC864;display:grid;place-items:center}
.m-estilos-li .g svg{width:28px;height:28px}
.m-estilos-li.hi .g{color:var(--done)}
.m-estilos-li .nm{font-size:12.5px;font-weight:600;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.m-estilos-li .er{font-family:var(--f-m);font-size:10px;color:var(--muted);white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.m-estilos-li .p{font-family:var(--f-m);font-size:12px;color:var(--muted);text-align:right}
.m-estilos-li .p i{display:block;font-style:normal;font-size:9px;color:var(--done)}
.m-estilos-li.hi .p{color:var(--done)}
.m-estilos-li.chosen{background:rgba(var(--done-rgb),.07);border-color:rgba(var(--done-rgb),.4)}
.m-estilos-li.foc,.m-estilos-rc.foc{border-color:var(--acc);box-shadow:inset 0 0 0 1px var(--acc),0 0 14px rgba(var(--acc-rgb),.2)}
.m-estilos-li:focus-visible,.m-estilos-rc:focus-visible{outline:2px solid var(--acc);outline-offset:2px}
@container (max-width:820px){
  .m-estilos-in{height:auto;min-height:0}
  .m-estilos-main{grid-template-columns:1fr}
  .m-estilos-vp{height:520px;border-right:0;border-bottom:1px solid var(--line)}
  .m-estilos-rec{overflow:visible}
  .m-estilos-list{max-height:560px;overflow:auto;padding-right:2px}
  .m-estilos-card{grid-template-columns:1fr;padding:16px}
  .m-estilos-holo{max-width:220px}
}
@container (max-width:520px){
  .m-estilos-vp{height:min(560px,72vh)}
  .m-estilos-grid2{grid-template-columns:1fr}
  .m-estilos-top{padding:10px}
  .m-estilos-hint,.m-estilos-lg{display:none}
  .m-estilos-zc button.t{padding:0 9px;font-size:8px}
  .m-estilos-fc{width:236px}
  .m-estilos-bar{flex-wrap:wrap;padding:8px 10px}
  .m-estilos-sc{order:3;flex-basis:100%}
  .m-estilos-bar .m-estilos-btn.go{margin-left:auto}
  .m-estilos-fl{flex-direction:column;gap:4px}
  .m-estilos-fl>span{padding-top:0}
  .m-estilos-fx{padding:6px}
}
@media (prefers-reduced-motion:reduce){
  .m-estilos-holo .ring,.m-estilos-holo .scan,.m-estilos-holo .gly{animation:none}
  .m-estilos-holo .gly path,.m-estilos-holo .gly circle,.m-estilos-holo .gly rect,.m-estilos-holo .gly ellipse{animation:none;stroke-dashoffset:0}
}
`;

/* ───────────────────────── GEOMETRÍA DE LA LÍNEA TEMPORAL ─────────────────────────
   Mundo: wx = columnas (0 = tronco; + derecha, − izquierda); u = tiempo escalado U(año).
   Cada familia es una rama que sale del tronco; cada estilo una sub-rama con columna propia. */
const NOWY = new Date().getFullYear();
const UNOW = U(NOWY);
function hash(n){ const x = Math.sin(n * 127.1 + 311.7) * 43758.5453; return x - Math.floor(x); }
function hstr(s){ let h = 2166136261; for (let i = 0; i < s.length; i++) { h ^= s.charCodeAt(i); h = Math.imul(h, 16777619); } return (h >>> 0) / 4294967296; }
const FAMLAY = [], NODE = {}, NODES = [];
let LMIN = -10, LMAX = 10;
(() => {
  const fams = FAMS.map((f, fi) => {
    const it = D.filter(s => s.familia === f).sort((a, b) => a.yi - b.yi || (a.yf == null ? 1e9 : a.yf) - (b.yf == null ? 1e9 : b.yf));
    if (!it.length) return null;
    const ends = [], slot = {};
    it.forEach(s => {
      const a = U(s.yi), e = s.yf == null ? 1e9 : Math.max(a + 0.02, U(s.yf));
      let j = ends.findIndex(x => x + 0.06 <= a);
      if (j < 0) { j = ends.length; ends.push(0); }
      ends[j] = e; slot[s.id] = j;
    });
    return {f, fi, it, n: ends.length, slot, u0: U(it[0].yi), u1: Math.max(...it.map(s => s.yf == null ? UNOW : U(s.yf))), live: it.some(s => s.yf == null), seed: hash(fi + 1) * 6.283};
  }).filter(Boolean).sort((a, b) => a.u0 - b.u0);
  const acc = {'1': 0, '-1': 0};
  fams.forEach(F => { F.side = acc['1'] <= acc['-1'] ? 1 : -1; acc[F.side] += F.n + 2; });
  [1, -1].forEach(sd => {
    let x = 1;
    fams.filter(F => F.side === sd).sort((a, b) => b.u0 - a.u0).forEach(F => {
      F.spine = sd * x;
      F.it.forEach(s => {
        NODE[s.id] = {id: s.id, st: s, F, sd, wx: sd * (x + 1 + F.slot[s.id]), u0: U(s.yi), u1: s.yf == null ? UNOW : Math.max(U(s.yi) + 0.02, U(s.yf)), live: s.yf == null, seed: hstr(s.id) * 6.283};
      });
      x += F.n + 2.2;
    });
    if (sd > 0) LMAX = x; else LMIN = -x;
  });
  FAMLAY.push(...fams);
  D.forEach((s, i) => { NODE[s.id].i = i; NODES.push(NODE[s.id]); });
})();
/* hebras decorativas del multiverso (procedurales, infinitas) */
function strand(c, k){
  const r = hash(c * 7.13 + k * 91.7), r2 = hash(c * 3.71 + k * 17.3), r3 = hash(c * 1.91 + k * 53.1), r4 = hash(c * 9.37 + k * 5.9);
  const span = Math.max(LMAX, -LMIN);
  return {u0: c * 0.3 + r * 0.3, life: 0.8 + r2 * 4.6, side: r3 < 0.5 ? -1 : 1, reach: span * (0.25 + r4 * 2.2), pw: 0.45 + r * 0.5, seed: r2 * 6.283, a: 0.35 + r3 * 0.65};
}
const BK = [[150,122,84],[222,165,72],[255,204,96],[212,242,92],[182,255,60]];
function bk(p){ return p >= 80 ? 4 : p >= 68 ? 3 : p >= 55 ? 2 : p >= 40 ? 1 : 0; }
function rgba(c, a){ return 'rgba(' + c[0] + ',' + c[1] + ',' + c[2] + ',' + a + ')'; }
const FIL = Array.from({length: 30}, (_, i) => {
  const h = k => hash(i * 13.7 + k * 3.3);
  const pal = [[255,190,90],[255,220,140],[255,165,70],[255,236,190],[255,205,110]];
  return {f1: 0.004 + h(1) * 0.006, f2: 0.012 + h(2) * 0.014, f3: 0.03 + h(3) * 0.04, p1: h(4) * 6.283, p2: h(5) * 6.283, p3: h(6) * 6.283,
    s1: 0.5 + h(7) * 0.9, s2: 0.4 + h(8) * 0.8, w1: 0.45 + h(9) * 0.35, c: pal[i % 5], a: 0.22 + h(10) * 0.38, lw: 0.6 + h(11) * 0.9};
});
let KMIN = 0.2;
const KMAX = 90, HMIN = 1.6, HMAX = 140, VY0 = 110, HEXP = 0.5;
function clamp(v, a, b){ return v < a ? a : v > b ? b : v; }

/* ───────────────────────── ESTADO DE MÓDULO ───────────────────────── */
let ui = null, uiPid = null, prevCleanup = null;
let measureCtx = null;
const TW = {};
function textW(s, font){
  const key = font + '|' + s;
  if (TW[key]) return TW[key];
  try {
    if (!measureCtx) { measureCtx = document.createElement('canvas').getContext('2d'); }
    measureCtx.font = font;
    return (TW[key] = Math.ceil(measureCtx.measureText(s).width));
  } catch (e) { return s.length * 7; }
}
function sprite(c){
  const cv = document.createElement('canvas'); cv.width = cv.height = 64;
  const g = cv.getContext('2d'); const gr = g.createRadialGradient(32, 32, 0, 32, 32, 32);
  gr.addColorStop(0, 'rgba(255,255,255,1)'); gr.addColorStop(0.12, rgba(c, 0.9)); gr.addColorStop(0.35, rgba(c, 0.32)); gr.addColorStop(1, rgba(c, 0));
  g.fillStyle = gr; g.fillRect(0, 0, 64, 64); return cv;
}
let SPR = null;
const F_LAB = '600 11.5px "Chakra Petch", system-ui, sans-serif';
const F_SUB = '500 9.5px "JetBrains Mono", ui-monospace, monospace';
const F_FAM = '400 8.5px Michroma, "Arial Black", sans-serif';
const F_TK = '500 9.5px "JetBrains Mono", ui-monospace, monospace';

DION_MOD[KEY] = {
  titulo: 'Contexto 3 · Historia de la arquitectura',
  sub: 'Dashboard de estilos',
  render(el, ctx){
    if (prevCleanup) { try { prevCleanup(); } catch (e) {} prevCleanup = null; }
    if (!document.getElementById('mod-estilos-css')) {
      const st = document.createElement('style'); st.id = 'mod-estilos-css'; st.textContent = CSS; document.head.appendChild(st);
    }
    if (!SPR) SPR = {lime: sprite([182,255,60]), gold: sprite([255,190,90]), white: sprite([230,240,255]), cyan: sprite([56,225,255])};
    const esc = ctx.esc || (s => String(s == null ? '' : s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c])));
    const P = ctx.P || {};
    const pid = P.id || P.nombre || 'p';
    if (!ui || uiPid !== pid) {
      const sv = (ctx.get && ctx.get(KEY)) || {};
      const v2 = sv.v === 2;
      ui = {k: v2 ? sv.k : null, h: v2 ? sv.h : null, cx: v2 ? sv.cx : 0, cy: v2 ? sv.cy : 5,
        fam: new Set(sv.fam || []), reg: new Set(sv.reg || []), solo: !!sv.solo, q: '', filt: false, ia: sv.ia || null,
        open: null, focus: null, tab: sv.tab === 'all' ? 'all' : 'rec', sort: sv.sort === 'af' ? 'af' : 'yi'};
      uiPid = pid;
    }
    let sel = Array.isArray(P.estilos) ? P.estilos.filter(id => BYID[id]) : [];
    let pri = P.estiloPrincipal && BYID[P.estiloPrincipal] ? P.estiloPrincipal : null;
    if (pri && !sel.includes(pri)) sel.unshift(pri);
    const AFF = computeAff(ctx);
    const ranked = D.slice().sort((a,b) => AFF[b.id].p - AFF[a.id].p);
    const nAf = D.filter(s => AFF[s.id].p >= AF_MIN).length;
    const TOP = new Set(ranked.slice(0, 16).map(s => s.id));
    let alive = true, raf = 0, saveT = 0;

    /* ── DOM base ── */
    el.innerHTML = '';
    const root = document.createElement('div');
    root.className = 'm-estilos';
    const tipoN = ctx.tipo ? ctx.tipo.n : '—';
    const catC = ctx.tipo && ctx.tipo.cat ? ctx.tipo.cat.c : '';
    const loc = P.loc || {};
    const lugar = [loc.canton || loc.ciudad, loc.provincia, loc.pais].filter(Boolean).join(', ') || '—';
    const clima = ctx.clima ? (CLN[ctx.clima.tipo] || ctx.clima.tipo) + (ctx.clima.zona ? ' · ' + ctx.clima.zona : '') : '—';
    root.innerHTML = `
<div class="m-estilos-in">
  <div class="m-estilos-top">
    <div class="m-estilos-hd">
      <div class="m-estilos-logo">${glyph('columna')}</div>
      <div class="m-estilos-tt"><h2>Línea temporal de estilos</h2><p>Tronco sagrado de la arquitectura · de la prehistoria (arriba) a hoy (abajo) · Ecuador primero, luego el mundo</p></div>
      <div class="m-estilos-kpis">
        <span class="m-estilos-kpi"><b>${D.length}</b>estilos</span>
        <span class="m-estilos-kpi lime"><b>${nAf}</b>afines ≥${AF_MIN}%</span>
        <span class="m-estilos-kpi" data-r="vis"><b>${D.length}</b>coinciden</span>
      </div>
    </div>
    <div class="m-estilos-ctl">
      <label class="m-estilos-search"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="7"/><path d="M20 20l-4-4"/></svg>
        <input type="search" placeholder="Buscar estilo, autor, obra, material…" aria-label="Buscar estilos" data-r="q"></label>
      <button class="m-estilos-btn" data-act="filt" aria-pressed="false">Filtros <span class="n" data-r="fn"></span></button>
      <button class="m-estilos-btn" data-act="solo" aria-pressed="${ui.solo}">Solo afines</button>
      <button class="m-estilos-btn acc" data-act="ia" hidden>✦ Afinar con IA</button>
    </div>
    <div class="m-estilos-filt" data-r="filt">
      <div class="m-estilos-fl"><span>FAMILIA</span><div class="m-estilos-chips" data-r="cf"></div></div>
      <div class="m-estilos-fl"><span>REGIÓN</span><div class="m-estilos-chips" data-r="cr"></div></div>
      <div class="m-estilos-row"><button class="m-estilos-btn" data-act="clr">Limpiar filtros</button></div>
    </div>
  </div>
  <div class="m-estilos-main">
    <div class="m-estilos-vp" data-r="vp" tabindex="0" aria-label="Línea temporal vertical de estilos: arrastra para mover en cualquier dirección, rueda o pellizco para zoom, doble toque en un nodo para abrir su ficha">
      <canvas class="m-estilos-cv" data-r="cv" aria-hidden="true"></canvas>
      <div class="m-estilos-lg"><span><i class="l1"></i>afinidad alta</span><span><i class="l2"></i>otros estilos</span><span><i class="l3"></i>elegido</span><span><i class="l4"></i>principal</span></div>
      <div class="m-estilos-empty" data-r="empty" hidden><span>Ningún estilo coincide con los filtros</span></div>
      <div class="m-estilos-hint">arrastra = mover · rueda/pellizco = zoom · ⇧+rueda = lateral · doble toque = ficha</div>
      <div class="m-estilos-tip" data-r="tip"></div>
      <div class="m-estilos-fc" data-r="fc"></div>
      <div class="m-estilos-zc">
        <div class="zr"><button data-z="-" aria-label="Alejar">−</button><button data-z="+" aria-label="Acercar">+</button></div>
        <button class="t" data-z="all" aria-label="Ver todo"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5"/></svg>Ver todo</button>
        <button class="t af" data-z="af" aria-label="Ir a estilos afines"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="3"/><circle cx="12" cy="12" r="8" stroke-dasharray="3 3"/></svg>Ir a afines</button>
      </div>
    </div>
    <aside class="m-estilos-rec" data-r="rec"></aside>
  </div>
  <div class="m-estilos-bar" data-r="bar"></div>
</div>`;
    el.appendChild(root);
    const $ = r => root.querySelector('[data-r="'+r+'"]');
    const vp = $('vp'), cv = $('cv'), tipEl = $('tip'), fcEl = $('fc');
    const g = cv.getContext('2d');

    /* ── chips de filtros ── */
    function chipsHTML(list, set){ return list.map(([v, l]) => `<button class="m-estilos-chip" data-v="${esc(v)}" aria-pressed="${set.has(v)}">${esc(l)}</button>`).join(''); }
    function paintFilters(){
      $('cf').innerHTML = chipsHTML(FAMS.map(f => [f, f]), ui.fam);
      $('cr').innerHTML = chipsHTML(LANES, ui.reg);
      const n = ui.fam.size + ui.reg.size; $('fn').textContent = n ? '(' + n + ')' : '';
      root.querySelector('[data-act="filt"]').setAttribute('aria-pressed', String(ui.filt));
      $('filt').classList.toggle('on', ui.filt);
    }
    paintFilters();

    function visible(st){
      if (ui.fam.size && !ui.fam.has(st.familia)) return false;
      if (ui.reg.size && !ui.reg.has(st.ln)) return false;
      if (ui.solo && AFF[st.id].p < AF_MIN) return false;
      if (ui.q && !HAY[st.id].includes(ui.q)) return false;
      return true;
    }
    const MATCH = new Uint8Array(D.length);
    let anyF = false, nMatch = D.length, LABORD = [];
    function refilter(){
      anyF = !!(ui.fam.size || ui.reg.size || ui.solo || ui.q);
      nMatch = 0;
      NODES.forEach(n => { MATCH[n.i] = visible(n.st) ? 1 : 0; nMatch += MATCH[n.i]; });
      $('vis').innerHTML = '<b>' + nMatch + '</b>coinciden';
      $('empty').hidden = nMatch > 0;
      relabel();
      if (ui.tab === 'all') paintRec();
      sched();
    }
    function relabel(){
      const sc = n => (n.id === ui.focus ? 1e6 : 0) + (n.id === pri ? 5e5 : 0) + (sel.includes(n.id) ? 2e5 : 0) + (ui.q && MATCH[n.i] ? 1e5 : 0) + (MATCH[n.i] ? 1e4 : 0) + AFF[n.id].p * 10 + (n.st.ln === 'EC' ? 5 : 0);
      LABORD = NODES.slice().sort((a, b) => sc(b) - sc(a));
    }

    /* ── cámara ── */
    let VW = 600, VH = 400, dpr = 1, inited = false;
    let H = 20, VY = 110, TH = 12, GAP = 22, T0 = 0;
    function dims(){
      VW = vp.clientWidth || 600; VH = vp.clientHeight || 400;
      dpr = Math.min(2, window.devicePixelRatio || 1);
      KMIN = clamp(0.5 * VH / ((UNOW + 0.5) * VY0), 0.05, 0.6);
      const w = Math.round(VW * dpr), h = Math.round(VH * dpr);
      if (cv.width !== w || cv.height !== h) { cv.width = w; cv.height = h; }
    }
    function camVals(){
      ui.k = clamp(ui.k, KMIN, KMAX); ui.h = clamp(ui.h, HMIN, HMAX);
      VY = VY0 * ui.k; H = ui.h;
      TH = clamp(7 + 6 * Math.sqrt(ui.k), 9, 30);
      GAP = TH + 10;
      const padX = VW / H * 0.9, padU = VH / VY * 0.9;
      ui.cx = clamp(ui.cx, LMIN - padX, LMAX + padX);
      ui.cy = clamp(ui.cy, -1.5 - padU, UMAX + 1.5 + padU);
    }
    function SX(wx){ return VW / 2 + (wx - ui.cx) * H + (wx > 0.01 ? GAP : wx < -0.01 ? -GAP : 0); }
    function SY(u){ return VH / 2 + (u - ui.cy) * VY; }
    function zoomAt(px, py, f){
      camVals();
      const wx = ui.cx + (px - VW / 2) / H, u = ui.cy + (py - VH / 2) / VY;
      ui.k *= f; ui.h *= Math.pow(f, HEXP);
      ui.k = clamp(ui.k, KMIN, KMAX); ui.h = clamp(ui.h, HMIN, HMAX);
      VY = VY0 * ui.k; H = ui.h;
      ui.cx = wx - (px - VW / 2) / H; ui.cy = u - (py - VH / 2) / VY;
      tween = null; poke(); saveSoon();
    }
    function panBy(dx, dy){ ui.cx -= dx / H; ui.cy -= dy / VY; tween = null; poke(); }
    let tween = null;
    function flyTo(k, h, cx, cy, ms){
      camVals();
      if (RM) { ui.k = k; ui.h = h; ui.cx = cx; ui.cy = cy; poke(); saveSoon(); return; }
      tween = {t0: performance.now(), d: ms || 700, a: {k: Math.log(ui.k), h: Math.log(ui.h), cx: ui.cx, cy: ui.cy}, b: {k: Math.log(clamp(k, KMIN, KMAX)), h: Math.log(clamp(h, HMIN, HMAX)), cx, cy}};
      inert = null; poke(); saveSoon();
    }
    function fitBox(x0, x1, u0, u1){
      dims();
      const both = x0 < 0 && x1 > 0;
      const k = (VH - 80) / (Math.max(u1 - u0, 0.04) * VY0);
      const kk = clamp(k, KMIN, KMAX), th = clamp(7 + 6 * Math.sqrt(kk), 9, 30);
      const h = (VW - 130 - (both ? 2 * (th + 10) : 0)) / Math.max(x1 - x0, 1);
      let cx = (x0 + x1) / 2;
      if (!both) cx += (x0 >= 0 ? -1 : 1) * (th + 10) / clamp(h, HMIN, HMAX);
      cx -= 30 / clamp(h, HMIN, HMAX);
      return [kk, clamp(h, HMIN, HMAX), cx, (u0 + u1) / 2];
    }
    function fitAll(anim){ const f = fitBox(LMIN, LMAX, -0.1, UNOW + 0.35); if (anim) flyTo(...f, 800); else { [ui.k, ui.h, ui.cx, ui.cy] = f; camVals(); } }
    function fitAfines(){
      const ids = (ui.ia && Array.isArray(ui.ia.orden) && ui.ia.orden.length ? ui.ia.orden.map(o => o.id) : ranked.map(s => s.id)).filter(id => NODE[id]).slice(0, 12);
      let x0 = 1e9, x1 = -1e9, u0 = 1e9, u1 = -1e9;
      ids.forEach(id => { const n = NODE[id]; x0 = Math.min(x0, n.wx - 2); x1 = Math.max(x1, n.wx + 2); u0 = Math.min(u0, n.u0 - 0.12); u1 = Math.max(u1, n.u0 + 0.25); });
      flyTo(...fitBox(x0, x1, u0, u1), 800);
    }
    function centerOn(id, keepZoom){
      const n = NODE[id]; if (!n) return;
      dims(); camVals();
      const k = keepZoom ? ui.k : Math.max(ui.k, 2.6), h = keepZoom ? ui.h : Math.max(ui.h, 16);
      const vy = VY0 * clamp(k, KMIN, KMAX);
      setFocus(id);
      flyTo(k, h, n.wx - n.sd * 60 / h, n.u0 + (VH * 0.1) / vy, 750);
    }

    /* ── animación ── */
    const RM = !!(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches);
    let ema = 16.7, LQ = 0, lqF = 0;
    let vpVis = true, last = 0, tAnim = 0, lastAct = performance.now(), frameN = 0, drag = null, inert = null, pinch = null;
    function sched(){ if (!raf && alive) raf = requestAnimationFrame(frame); }
    function poke(){ lastAct = performance.now(); sched(); }
    function frame(ts){
      raf = 0; if (!alive) return;
      const dt = last ? Math.min(50, ts - last) : 16; last = ts; frameN++;
      if (dt < 50) { ema = ema * 0.95 + dt * 0.05; if (ema > 23 && LQ < 2 && frameN - lqF > 90) { LQ++; lqF = frameN; } else if (ema < 17.5 && LQ > 0 && frameN - lqF > 240) { LQ--; lqF = frameN; } }
      let busy = !!(drag || pinch);
      if (tween) {
        const p = Math.min(1, (ts - tween.t0) / tween.d), e = p < .5 ? 4 * p * p * p : 1 - Math.pow(-2 * p + 2, 3) / 2;
        ui.k = Math.exp(tween.a.k + (tween.b.k - tween.a.k) * e); ui.h = Math.exp(tween.a.h + (tween.b.h - tween.a.h) * e);
        ui.cx = tween.a.cx + (tween.b.cx - tween.a.cx) * e; ui.cy = tween.a.cy + (tween.b.cy - tween.a.cy) * e;
        if (p >= 1) tween = null; busy = true;
      }
      if (inert) {
        ui.cx -= inert.vx * dt / H; ui.cy -= inert.vy * dt / VY;
        const f = Math.exp(-dt / 300); inert.vx *= f; inert.vy *= f;
        if (Math.abs(inert.vx) + Math.abs(inert.vy) < 0.01) { inert = null; saveSoon(); }
        busy = true;
      }
      if (!RM) tAnim += dt / 1000;
      const idle = !busy && ts - lastAct > 15000;
      if (!idle || frameN % 2 === 0) draw();
      const animOK = !RM && vpVis && !document.hidden && !ui.open;
      if (alive && (busy || animOK) && vpVis && !document.hidden) raf = requestAnimationFrame(frame); else last = 0;
    }

    /* ── dibujo ── */
    const NSX = new Float32Array(D.length), NSY = new Float32Array(D.length), NON = new Uint8Array(D.length);
    let NR = 3;
    function wob(y, y0, seed, amp){ return amp * Math.sin((y - y0) * 0.035 + seed) * Math.min(1, Math.max(0, (y - y0) / 50)); }
    function draw(){
      dims(); camVals();
      if (!inited) return;
      const t = tAnim;
      g.setTransform(dpr, 0, 0, dpr, 0, 0);
      g.globalCompositeOperation = 'source-over'; g.globalAlpha = 1;
      g.fillStyle = '#03060B'; g.fillRect(0, 0, VW, VH);
      const xT = SX(0), Y0 = SY(0), yNow = SY(UNOW);
      const uTop = ui.cy - VH / 2 / VY, uBot = ui.cy + VH / 2 / VY;
      // cuadrícula temporal
      const ticks = [];
      for (const c of CAND) {
        const y = SY(U(c.y)); if (y < 8 || y > VH - 6) continue;
        if (ticks.every(a => Math.abs(a.y - y) >= 28)) ticks.push({y, yr: c.y, l: c.l});
        if (ticks.length > 44) break;
      }
      g.lineWidth = 1;
      g.strokeStyle = 'rgba(56,225,255,.05)'; g.beginPath();
      ticks.forEach(a => { g.moveTo(66, a.y + .5); g.lineTo(VW, a.y + .5); }); g.stroke();
      // eras
      g.strokeStyle = 'rgba(56,225,255,.13)'; g.setLineDash([2, 6]); g.beginPath();
      ERAS.forEach(e => { const y = SY(U(e[0])); if (y > 0 && y < VH) { g.moveTo(66, y + .5); g.lineTo(VW, y + .5); } }); g.stroke(); g.setLineDash([]);
      // halo del tronco
      const gw = TH * 9;
      const lg = g.createLinearGradient(xT - gw, 0, xT + gw, 0);
      lg.addColorStop(0, 'rgba(255,170,60,0)'); lg.addColorStop(.5, 'rgba(255,180,80,.13)'); lg.addColorStop(1, 'rgba(255,170,60,0)');
      g.fillStyle = lg; g.fillRect(xT - gw, 0, gw * 2, VH);

      g.globalCompositeOperation = 'lighter';
      g.lineCap = 'round'; g.lineJoin = 'round';
      // 1 · líneas paralelas del multiverso a los lados (infinitas)
      {
        const edgeR = LMAX + 3, edgeL = LMIN - 3;
        const P = Math.max(3, Math.ceil(26 / H));
        const wx0 = ui.cx - (VW / 2 + 40) / H, wx1 = ui.cx + (VW / 2 + 40) / H;
        const paths = [new Path2D(), new Path2D(), new Path2D()];
        let cnt = 0;
        for (let j = Math.floor(wx0 / P); j <= Math.ceil(wx1 / P) && cnt < 90; j++) {
          const wx = j * P; if (wx < edgeR && wx > edgeL) continue;
          const dist = wx > 0 ? wx - edgeR : edgeL - wx, span = LMAX - LMIN;
          const b = dist < span * 0.4 ? 0 : dist < span * 1.4 ? 1 : 2;
          const x = SX(wx), sd = hash(j * 1.7) * 6.283, amp = 2 + hash(j * 4.1) * 4;
          const pth = paths[b]; cnt++;
          pth.moveTo(x + amp * Math.sin((-20 - Y0) * 0.012 + sd), -20);
          for (let y = -10; y <= VH + 20; y += 14) pth.lineTo(x + amp * Math.sin((y - Y0) * 0.012 + sd + t * 0.15), y);
        }
        const al = [.16, .09, .05];
        paths.forEach((p, i) => { g.strokeStyle = 'rgba(255,190,110,' + al[i] + ')'; g.lineWidth = 0.8; g.stroke(p); });
      }
      // 2 · hebras que se separan del tronco y se pierden
      {
        const near = new Path2D(), mid = new Path2D(), far = new Path2D();
        const cs = 0.3, cA = Math.floor((uTop - 5.5) / cs), cB = Math.ceil(uBot / cs);
        const stride = Math.max(1, Math.ceil((cB - cA) / 100));
        const PER = LQ >= 2 ? 1 : LQ ? 2 : 3;
        let drawn = 0;
        for (let c = cA - ((cA % stride) + stride) % stride; c <= cB; c += stride) {
          for (let kk = 0; kk < PER; kk++) {
            const s = strand(c, kk);
            const ya = SY(s.u0), yb = SY(s.u0 + s.life);
            if (yb < -20 || ya > VH + 20) continue;
            const xEnd = SX(s.side * (1 + s.reach));
            if ((s.side > 0 && xEnd < -20 && xT < -20) || (s.side < 0 && xEnd > VW + 20 && xT > VW + 20)) continue;
            if ((s.side > 0 && xT > VW + 20) || (s.side < 0 && xT < -20)) continue;
            const qa = clamp((-24 - ya) / (yb - ya), 0, 1), qb = clamp((VH + 24 - ya) / (yb - ya), 0, 1);
            if (qb <= qa) continue;
            const steps = clamp(Math.round((qb - qa) * (yb - ya) / 12), 2, 90);
            const wa = 4 + s.a * 9;
            let prev = null;
            for (let i = 0; i <= steps; i++) {
              const q = qa + (qb - qa) * i / steps, y = ya + (yb - ya) * q;
              const e = 1 - Math.pow(1 - q, 1 / s.pw);
              const x = xT + s.side * (TH * 0.4 + e * (s.reach * H + GAP)) + Math.sin((y - Y0) * 0.011 + s.seed + t * 0.3) * wa * Math.min(1, q * 4);
              const pth = q < .34 ? near : q < .7 ? mid : far;
              if (prev) { pth.moveTo(prev[0], prev[1]); pth.lineTo(x, y); }
              prev = [x, y];
            }
            drawn++;
          }
        }
        g.lineWidth = 0.9;
        g.strokeStyle = 'rgba(255,196,110,.26)'; g.stroke(near);
        g.strokeStyle = 'rgba(255,186,100,.13)'; g.stroke(mid);
        g.strokeStyle = 'rgba(255,176,90,.06)'; g.stroke(far);
      }
      // 3 · ramas de familia
      const LS = 26;
      const spineP = new Path2D();
      FAMLAY.forEach(F => {
        const xs = SX(F.spine), yA = SY(F.u0) - LS, Lt = clamp(Math.abs(xs - xT) * 0.55, 40, 320);
        const y0 = yA - Lt, ye = F.live ? VH + 60 : SY(F.u1) + 10;
        if (ye < -20 || y0 > VH + 20) { F.vis = false; return; }
        if (Math.max(xs, xT) < -30 || Math.min(xs, xT) > VW + 30) { F.vis = false; return; }
        F.vis = true; F.sx = xs; F.sy = yA;
        const x0 = xT + F.side * TH * 0.25;
        spineP.moveTo(x0, y0);
        spineP.bezierCurveTo(x0, y0 + Lt * 0.6, xs, yA - Lt * 0.6, xs, yA);
        const amp = Math.min(2, H * 0.2), yT = Math.max(yA, -20), yB = Math.min(ye, VH + 20);
        if (yB > yT) {
          if (yT > yA) spineP.moveTo(xs + wob(yT, yA, F.seed, amp), yT);
          for (let y = yT + 10; y < yB; y += 10) spineP.lineTo(xs + wob(y, yA, F.seed, amp), y);
          spineP.lineTo(xs + wob(yB, yA, F.seed, amp), yB);
        }
      });
      g.strokeStyle = 'rgba(255,180,80,.10)'; g.lineWidth = 5; g.stroke(spineP);
      g.strokeStyle = 'rgba(255,205,120,.62)'; g.lineWidth = 1.6; g.stroke(spineP);
      // 4 · ramas de estilo (agrupadas por afinidad)
      const fineP = new Path2D(), bp = [0,1,2,3,4].map(() => new Path2D()), dimP = new Path2D(), endP = [0,1,2,3,4].map(() => new Path2D()), hiP = new Path2D();
      const amp = Math.min(2.4, H * 0.22), bstep = amp < 1.2 ? 24 : 10;
      NR = clamp(1.8 + 1.5 * Math.log2(1 + ui.k * 2), 2.2, 6.2);
      NODES.forEach(n => {
        const F = n.F, xs = SX(F.spine), xc = SX(n.wx), yn = SY(n.u0);
        const yArr = SY(F.u0) - LS;
        const L = clamp(Math.abs(xc - xs) * 0.9 + 12, 18, 160);
        const y0 = Math.max(yn - L, yArr);
        const ye = n.live ? VH + 60 : SY(n.u1);
        NSX[n.i] = xc; NSY[n.i] = yn;
        NON[n.i] = (xc > -30 && xc < VW + 30 && yn > -30 && yn < VH + 30) ? 1 : 0;
        if (Math.max(xs, xc) < -12 || Math.min(xs, xc) > VW + 12 || ye < -12 || y0 > VH + 12) return;
        const m = MATCH[n.i], hot = n.id === ui.focus || n.id === pri || sel.includes(n.id);
        const pth = hot ? hiP : (anyF && !m) ? dimP : bp[bk(AFF[n.id].p)];
        pth.moveTo(xs, y0);
        const h = yn - y0;
        pth.bezierCurveTo(xs, y0 + h * 0.55, xc, yn - h * 0.55, xc, yn);
        const yT = Math.max(yn, -20), yB = Math.min(ye, VH + 20);
        if (yB > yT) {
          if (yT > yn) pth.moveTo(xc + wob(yT, yn, n.seed, amp), yT);
          for (let y = yT + bstep; y < yB; y += bstep) pth.lineTo(xc + wob(y, yn, n.seed, amp), y);
          const xe = xc + wob(yB, yn, n.seed, amp);
          pth.lineTo(xe, yB);
          if (H >= 7 && !LQ && !(anyF && !m)) {
            for (const o of [-1, 1]) {
              fineP.moveTo(xc + o * 1.2, Math.max(yT, yn + 2));
              for (let y = Math.max(yT, yn + 2) + 12; y < yB; y += 12) fineP.lineTo(xc + wob(y, yn, n.seed, amp) + o * (1.5 + 1.6 * Math.sin((y - Y0) * 0.022 + n.seed * 3 + o + t * 0.8)) * Math.min(1, (y - yn) / 40), y);
            }
          }
          if (!n.live && ye <= VH + 20) {
            const xq = xe - n.sd * Math.min(10, Math.max(4, H * 1.2));
            pth.quadraticCurveTo(xe, ye + 9, xq, ye + 15);
            if (!(anyF && !m)) endP[bk(AFF[n.id].p)].moveTo(xq + 1.6, ye + 15), endP[bk(AFF[n.id].p)].arc(xq, ye + 15, 1.6, 0, 6.283);
          }
        }
      });
      const wm = clamp(0.85 + 0.22 * Math.log2(ui.k + 1), 0.85, 1.7);
      const GA = [.035, .045, .06, .08, .11], CA = [.32, .48, .62, .78, .95], CW = [.85, .95, 1.1, 1.25, 1.55];
      g.strokeStyle = 'rgba(255,210,130,.16)'; g.lineWidth = 0.7; g.stroke(fineP);
      if (anyF) { g.strokeStyle = 'rgba(90,120,150,.16)'; g.lineWidth = 0.8; g.stroke(dimP); }
      for (let b = 0; b < 5; b++) {
        if (b >= 2) { g.strokeStyle = rgba(BK[b], GA[b] * 1.2); g.lineWidth = 4 * wm; g.stroke(bp[b]); }
        g.strokeStyle = rgba(BK[b], CA[b]); g.lineWidth = CW[b] * wm; g.stroke(bp[b]);
        g.fillStyle = rgba(BK[b], CA[b] * .8); g.fill(endP[b]);
      }
      g.strokeStyle = 'rgba(220,255,170,.16)'; g.lineWidth = 8 * wm; g.stroke(hiP);
      g.strokeStyle = 'rgba(235,255,200,.95)'; g.lineWidth = 1.9 * wm; g.stroke(hiP);
      // 5 · tronco: haz de filamentos trenzados
      if (xT > -gw && xT < VW + gw) {
        g.strokeStyle = 'rgba(255,235,190,.38)'; g.lineWidth = 2.2; g.beginPath(); g.moveTo(xT, -10); g.lineTo(xT, VH + 10); g.stroke();
        for (let i = 0; i < FIL.length; i += LQ >= 2 ? 2 : 1) {
          const f = FIL[i];
          g.beginPath();
          for (let y = -14; y <= VH + 14; y += 9) {
            const p = y - Y0;
            const br = 1 + 0.12 * Math.sin(p * 0.003 + t * 0.4);
            const x = xT + TH * br * (f.w1 * Math.sin(p * f.f1 + f.p1 - t * f.s1) + 0.32 * Math.sin(p * f.f2 + f.p2 + t * f.s2) + 0.14 * Math.sin(p * f.f3 + f.p3 - t * 1.6));
            if (y === -14) g.moveTo(x, y); else g.lineTo(x, y);
          }
          g.strokeStyle = rgba(f.c, f.a); g.lineWidth = f.lw; g.stroke();
        }
        // pulsos en el tronco
        if (!RM) for (let i = 0; i < 7; i++) {
          const y = ((t * 95 + i * (VH + 120) / 7) % (VH + 120)) - 60, p = y - Y0, f = FIL[i * 4];
          const x = xT + TH * (f.w1 * Math.sin(p * f.f1 + f.p1 - t * f.s1) + 0.32 * Math.sin(p * f.f2 + f.p2 + t * f.s2));
          const s = 18 + 6 * Math.sin(t * 3 + i);
          g.globalAlpha = .85; g.drawImage(SPR.gold, x - s / 2, y - s / 2, s, s);
        }
        g.globalAlpha = 1;
      }
      // pulsos en ramas afines y elegidas
      if (!RM) NODES.forEach(n => {
        if (!(TOP.has(n.id) || sel.includes(n.id))) return;
        if (anyF && !MATCH[n.i]) return;
        const per = 4.2, q = ((t / per + n.seed / 6.283) % 1);
        const F = n.F, xs = SX(F.spine), xc = NSX[n.i], yn = NSY[n.i];
        const y0 = Math.max(yn - clamp(Math.abs(xc - xs) * 0.9 + 12, 18, 160), SY(F.u0) - LS);
        let x, y;
        if (q < 0.35) {
          const s = q / 0.35, h = yn - y0, a = 1 - s;
          const cy1 = y0 + h * 0.55, cy2 = yn - h * 0.55;
          x = a*a*a*xs + 3*a*a*s*xs + 3*a*s*s*xc + s*s*s*xc;
          y = a*a*a*y0 + 3*a*a*s*cy1 + 3*a*s*s*cy2 + s*s*s*yn;
        } else {
          const ye = n.live ? yn + 300 : Math.min(SY(n.u1), yn + 300);
          y = yn + (ye - yn) * (q - 0.35) / 0.65; x = xc + wob(y, yn, n.seed, amp);
        }
        if (x < -10 || x > VW + 10 || y < -10 || y > VH + 10) return;
        const s = 9 + NR;
        g.globalAlpha = 0.9 * Math.sin(Math.PI * q); g.drawImage(SPR.lime, x - s / 2, y - s / 2, s, s);
      });
      g.globalAlpha = 1;
      // halos de nodos
      NODES.forEach(n => {
        if (!NON[n.i]) return;
        const x = NSX[n.i], y = NSY[n.i], a = AFF[n.id].p, m = !anyF || MATCH[n.i];
        if (!m) return;
        const af = clamp((a - 35) / 60, 0, 1);
        const s = NR * (4 + 7 * af) * (n.id === ui.focus ? 1.5 : 1);
        g.globalAlpha = af > 0.25 ? 0.3 + 0.7 * af : 0.45;
        g.drawImage(af > 0.25 ? SPR.lime : SPR.gold, x - s / 2, y - s / 2, s, s);
      });
      g.globalAlpha = 1;
      g.globalCompositeOperation = 'source-over';
      // futuro y antes del registro
      if (yNow < VH) {
        const fg = g.createLinearGradient(0, yNow, 0, Math.min(VH, yNow + 160));
        fg.addColorStop(0, 'rgba(3,6,11,0)'); fg.addColorStop(1, 'rgba(3,6,11,.42)');
        g.fillStyle = fg; g.fillRect(0, yNow, VW, VH - yNow);
      }
      // núcleos de nodos, anillos, corona
      NODES.forEach(n => {
        if (!NON[n.i]) return;
        const x = NSX[n.i], y = NSY[n.i], m = !anyF || MATCH[n.i], a = AFF[n.id].p;
        g.beginPath(); g.arc(x, y, m ? NR * 0.62 : NR * 0.42, 0, 6.283);
        g.fillStyle = !m ? 'rgba(120,150,180,.4)' : a >= 75 ? '#F2FFD8' : '#FFF1D2'; g.fill();
        if (ui.q && MATCH[n.i]) { g.setLineDash([2, 3]); g.strokeStyle = 'rgba(255,255,255,.85)'; g.lineWidth = 1.2; g.beginPath(); g.arc(x, y, NR + 6, 0, 6.283); g.stroke(); g.setLineDash([]); }
        if (sel.includes(n.id)) { g.strokeStyle = '#FFFFFF'; g.lineWidth = 1.7; g.beginPath(); g.arc(x, y, NR + 3.5, 0, 6.283); g.stroke(); }
        if (n.id === pri) {
          const R = NR + 8, rot = t * 0.5;
          g.strokeStyle = 'rgba(182,255,60,.95)'; g.lineWidth = 1.4; g.beginPath(); g.arc(x, y, R, 0, 6.283); g.stroke();
          g.beginPath();
          for (let i = 0; i < 12; i++) { const an = rot + i * Math.PI / 6, l = i % 2 ? 3 : 6; g.moveTo(x + Math.cos(an) * (R + 2), y + Math.sin(an) * (R + 2)); g.lineTo(x + Math.cos(an) * (R + 2 + l), y + Math.sin(an) * (R + 2 + l)); }
          g.stroke();
        }
        if (n.id === ui.focus) {
          const R = NR + 12 + 3 * Math.sin(t * 4);
          g.strokeStyle = 'rgba(56,225,255,.9)'; g.lineWidth = 1.4; g.setLineDash([5, 4]); g.lineDashOffset = -t * 20;
          g.beginPath(); g.arc(x, y, R, 0, 6.283); g.stroke(); g.setLineDash([]); g.lineDashOffset = 0;
        }
      });
      // línea de HOY
      if (yNow > -10 && yNow < VH + 10) {
        g.strokeStyle = 'rgba(182,255,60,.55)'; g.lineWidth = 1; g.setLineDash([6, 5]);
        g.beginPath(); g.moveTo(66, yNow + .5); g.lineTo(VW, yNow + .5); g.stroke(); g.setLineDash([]);
      }
      // etiquetas con anti-solape
      const placed = [];
      const hit = (x, y, w, h) => { for (const r of placed) if (x < r[0] + r[2] && x + w > r[0] && y < r[1] + r[3] && y + h > r[1]) return true; return false; };
      const xMin = 72, xMax = VW - 8;
      const vr0 = vp.getBoundingClientRect();
      [root.querySelector('.m-estilos-lg'), root.querySelector('.m-estilos-zc'), root.querySelector('.m-estilos-hint'), fcEl.style.display === 'block' ? fcEl : null].forEach(e2 => {
        if (!e2 || !e2.offsetWidth) return; const r = e2.getBoundingClientRect(); placed.push([r.left - vr0.left - 4, r.top - vr0.top - 4, r.width + 8, r.height + 8]);
      });
      // nodos en pantalla bloquean etiquetas (solo los más destacados, para no saturar)
      g.textBaseline = 'middle';
      const detail = ui.k >= 2.2;
      const famFirst = [];
      FAMLAY.forEach(F => { if (F.vis && F.sy > 14 && F.sy < VH - 10 && F.sx > xMin && F.sx < xMax) famFirst.push(F); });
      let nl = 0;
      const tryLabel = n => {
        const x = NSX[n.i], y = NSY[n.i];
        const name = n.st.n.length > 34 ? n.st.n.slice(0, 32) + '…' : n.st.n;
        const w = textW(name, F_LAB), sub = detail ? fmtR(n.st) + ' · ' + AFF[n.id].p + '%' : '';
        const w2 = sub ? textW(sub, F_SUB) : 0, W = Math.max(w, w2) + 8, Hh = sub ? 30 : 17;
        for (const side of [n.sd, -n.sd]) {
          const lx = side > 0 ? x + NR + 6 : x - NR - 6 - W, ly = y - (sub ? 9 : 0) - 8;
          if (lx < xMin || lx + W > xMax || ly < 2 || ly + Hh > VH - 2) continue;
          if (hit(lx, ly, W, Hh)) continue;
          placed.push([lx, ly, W, Hh]);
          return {n, lx: side > 0 ? lx + 3 : lx + W - 3, ly, side, name, sub};
        }
        return null;
      };
      const labs = [];
      // primero: foco, principal, elegidos
      LABORD.forEach(n => {
        if (!NON[n.i]) return;
        if (anyF && !MATCH[n.i] && !(n.id === ui.focus || n.id === pri || sel.includes(n.id))) return;
        if (nl > 140) return;
        if (labs.length < 6 && (n.id === ui.focus || n.id === pri || sel.includes(n.id))) { const L = tryLabel(n); if (L) { labs.push(L); nl++; } }
      });
      const famLabs = [];
      famFirst.forEach(F => {
        const txt = F.f.toUpperCase(), w = textW(txt, F_FAM) * 1.18 + 6;
        const lx = F.side > 0 ? F.sx + 6 : F.sx - 6 - w, ly = F.sy - 18;
        if (lx < xMin || lx + w > xMax || hit(lx, ly, w, 13)) return;
        placed.push([lx, ly, w, 13]); famLabs.push([F, txt, F.side > 0 ? lx + 3 : lx + w - 3, ly + 7]);
      });
      LABORD.forEach(n => {
        if (!NON[n.i] || nl > 140) return;
        if (n.id === ui.focus || n.id === pri || sel.includes(n.id)) return;
        if (anyF && !MATCH[n.i]) return;
        const L = tryLabel(n); if (L) { labs.push(L); nl++; }
      });
      g.font = F_FAM; g.lineWidth = 3; g.strokeStyle = 'rgba(3,6,11,.9)';
      try { g.letterSpacing = '1.5px'; } catch (e) {}
      famLabs.forEach(([F, txt, x, y]) => { g.textAlign = F.side > 0 ? 'left' : 'right'; g.strokeText(txt, x, y); g.fillStyle = 'rgba(255,200,110,.9)'; g.fillText(txt, x, y); });
      try { g.letterSpacing = '0px'; } catch (e) {}
      labs.forEach(L => {
        const n = L.n, a = AFF[n.id].p, isS = sel.includes(n.id);
        g.textAlign = L.side > 0 ? 'left' : 'right';
        const y1 = NSY[n.i] - (L.sub ? 6 : 0);
        g.font = F_LAB; g.lineWidth = 3.2; g.strokeStyle = 'rgba(3,6,11,.92)'; g.strokeText(L.name, L.lx, y1);
        g.fillStyle = n.id === ui.focus ? '#9DF2FF' : isS || n.id === pri ? '#FFFFFF' : a >= 75 ? '#D9FF9C' : a >= 55 ? '#F3E3BE' : 'rgba(225,210,180,.78)';
        g.fillText(L.name, L.lx, y1);
        if (L.sub) { g.font = F_SUB; g.strokeText(L.sub, L.lx, y1 + 13); g.fillStyle = 'rgba(160,180,200,.85)'; g.fillText(L.sub, L.lx, y1 + 13); }
      });
      // eje de años (costado izquierdo)
      const gg = g.createLinearGradient(0, 0, 86, 0);
      gg.addColorStop(0, 'rgba(3,6,11,.96)'); gg.addColorStop(.7, 'rgba(3,6,11,.85)'); gg.addColorStop(1, 'rgba(3,6,11,0)');
      g.fillStyle = gg; g.fillRect(0, 0, 86, VH);
      g.strokeStyle = 'rgba(120,200,255,.3)'; g.lineWidth = 1; g.beginPath(); g.moveTo(66.5, 0); g.lineTo(66.5, VH); g.stroke();
      g.font = F_TK; g.textAlign = 'right'; g.textBaseline = 'middle';
      g.beginPath();
      ticks.forEach(a => { g.moveTo(62, a.y + .5); g.lineTo(70, a.y + .5); g.fillStyle = a.l === 0 ? '#E4EEFA' : '#8CA0B6'; g.fillText(fmtY(a.yr), 60, a.y); });
      g.stroke();
      // nombres de eras (pegajosos a la derecha)
      g.font = F_FAM; g.textAlign = 'right';
      try { g.letterSpacing = '2px'; } catch (e) {}
      ERAS.forEach(e => {
        const y0 = SY(U(e[0])), y1 = SY(U(e[1]));
        if (y1 - y0 < 30 || y1 < 0 || y0 > VH) return;
        const y = clamp(y0 + 14, 14, y1 - 10);
        g.fillStyle = 'rgba(56,225,255,.42)'; g.fillText(e[2], VW - 64, y);
      });
      if (yNow > 8 && yNow < VH - 8) { g.textAlign = 'left'; g.fillStyle = '#B6FF3C'; g.fillText('HOY · ' + NOWY, 74, yNow - 9); g.fillStyle = 'rgba(182,255,60,.4)'; if (yNow + 22 < VH) g.fillText('FUTURO ▾', 74, yNow + 14); }
      const yAnt = SY(0);
      if (yAnt > 20 && yAnt < VH) { g.textAlign = 'left'; g.fillStyle = 'rgba(255,200,110,.45)'; g.fillText('▴ ANTES DEL 10 000 a.C.', 74, yAnt - 14); }
      try { g.letterSpacing = '0px'; } catch (e) {}
      // tarjeta de foco
      placeFocus();
    }

    /* ── tooltip y tarjeta de foco ── */
    let hov = null;
    function tipHTML(id){
      const st = BYID[id], a = AFF[id].p;
      return `<b>${esc(st.n)}</b><span>${esc(fmtR(st))} · ${esc(st.familia)}</span><span>${esc(st.region)}</span><span>Afinidad <em>${a}%</em>${sel.includes(id) ? ' · <em>' + (id === pri ? '★ principal' : 'elegido') + '</em>' : ''}</span><small>Toca para opciones · doble toque = ficha</small>`;
    }
    function showTip(id, x, y){
      if (!id) { tipEl.style.display = 'none'; hov = null; vp.classList.remove('hov'); return; }
      if (hov !== id) { tipEl.innerHTML = tipHTML(id); hov = id; }
      vp.classList.add('hov');
      tipEl.style.display = 'block';
      const w = tipEl.offsetWidth, h = tipEl.offsetHeight;
      let lx = x + 16, ly = y + 14;
      if (lx + w > VW - 6) lx = x - 16 - w; if (ly + h > VH - 6) ly = y - 14 - h;
      tipEl.style.transform = 'translate(' + Math.max(6, lx) + 'px,' + Math.max(6, ly) + 'px)';
    }
    function fcHTML(id){
      const st = BYID[id], a = AFF[id].p, isP = pri === id, isS = sel.includes(id) && !isP;
      return `<button class="x" data-act="unfocus" aria-label="Cerrar">✕</button>
        <div class="hd"><div class="g">${glyph(st.glifo)}</div><div><div class="nm">${esc(st.n)}</div><div class="er">${esc(fmtR(st))} · ${esc(st.region)}</div></div></div>
        <div class="af${a >= 75 ? ' hi' : ''}">AFINIDAD ${a}% · ${esc(st.familia)}</div>
        <div class="row"><button class="op" data-open="${id}">Abrir ficha</button>
          <button data-pick="pri" data-id="${id}" class="${isP ? 'on' : ''}" aria-label="Elegir como principal" title="Elegir como principal">★</button>
          <button data-pick="${isS ? 'del' : 'sec'}" data-id="${id}" class="${isS ? 'on' : ''}" aria-label="${isS ? 'Quitar' : 'Agregar como secundario'}" title="${isS ? 'Quitar' : 'Agregar como secundario'}">${isS ? '✓' : '+'}</button></div>`;
    }
    function setFocus(id){
      ui.focus = id || null;
      if (ui.focus) { fcEl.innerHTML = fcHTML(ui.focus); fcEl.style.display = 'block'; } else fcEl.style.display = 'none';
      root.querySelectorAll('[data-go]').forEach(e => e.classList.toggle('foc', e.dataset.go === ui.focus));
      relabel(); poke();
    }
    function placeFocus(){
      if (!ui.focus || !NODE[ui.focus]) { fcEl.style.display = 'none'; return; }
      const i = NODE[ui.focus].i, x = NSX[i], y = NSY[i];
      if (x < 0 || x > VW || y < 0 || y > VH) { fcEl.style.display = 'none'; return; }
      fcEl.style.display = 'block';
      const w = fcEl.offsetWidth || 262, h = fcEl.offsetHeight || 130;
      let lx = NODE[ui.focus].sd > 0 ? x - w - 22 : x + 22;
      if (lx < 74) lx = x + 22; if (lx + w > VW - 6) lx = x - w - 22;
      lx = clamp(lx, 6, Math.max(6, VW - w - 6));
      let ly = clamp(y - h / 2, 6, Math.max(6, VH - h - 6));
      if (VW < 420) { ly = y + 26 + h > VH - 120 ? Math.max(6, y - h - 26) : y + 26; lx = clamp(x - w / 2, 6, VW - w - 6); }
      fcEl.style.transform = 'translate(' + lx.toFixed(0) + 'px,' + ly.toFixed(0) + 'px)';
    }
    function nodeAt(px, py, rad){
      let best = null, bd = rad * rad;
      for (let i = 0; i < NODES.length; i++) {
        if (!NON[i]) continue;
        const dx = NSX[i] - px, dy = NSY[i] - py, d = dx * dx + dy * dy;
        if (d < bd) { bd = d; best = NODES[i].id; }
      }
      return best;
    }

    /* ── persistencia ── */
    function saveSoon(){
      clearTimeout(saveT);
      saveT = setTimeout(() => {
        if (!alive) return;
        try { ctx.set && ctx.set(KEY, Object.assign({}, ctx.get ? ctx.get(KEY) : {}, {v: 2, k: +(+ui.k).toFixed(4), h: +(+ui.h).toFixed(3), cx: +(+ui.cx).toFixed(3), cy: +(+ui.cy).toFixed(4), fam: [...ui.fam], reg: [...ui.reg], solo: ui.solo, ia: ui.ia, tab: ui.tab, sort: ui.sort})); } catch (e) {}
      }, 600);
    }
    function saveSel(msg){
      const patch = {estilos: sel.slice(), estiloPrincipal: pri};
      try { const pr = ctx.setP && ctx.setP(patch); if (pr && pr.catch) pr.catch(() => ctx.toast && ctx.toast('No se pudo guardar la selección')); } catch (e) {}
      if (msg && ctx.toast) ctx.toast(msg);
      relabel(); paintBar(); paintRec(); if (ui.open) paintFicha(ui.open);
      if (ui.focus) fcEl.innerHTML = fcHTML(ui.focus);
      poke();
    }
    function choose(id, mode){
      const st = BYID[id]; if (!st) return;
      if (mode === 'pri') { if (!sel.includes(id)) sel.push(id); pri = id; saveSel('Estilo principal: ' + st.n); }
      else if (mode === 'sec') { if (!sel.includes(id)) sel.push(id); if (pri === id) pri = null; saveSel('Agregado como secundario: ' + st.n); }
      else { sel = sel.filter(x => x !== id); if (pri === id) pri = sel[0] || null; saveSel('Quitado: ' + st.n); }
    }

    /* ── panel: recomendados + lista completa ── */
    function ringSVG(p, hi){
      const c = 2 * Math.PI * 18, col = hi ? 'var(--done)' : 'var(--acc)';
      return `<div class="m-estilos-ring"><svg viewBox="0 0 44 44"><circle cx="22" cy="22" r="18" fill="none" stroke="rgba(120,200,255,.14)" stroke-width="4"/><circle cx="22" cy="22" r="18" fill="none" stroke="${col}" stroke-width="4" stroke-linecap="round" stroke-dasharray="${(c * p / 100).toFixed(1)} ${c.toFixed(1)}"/></svg><b style="color:${col}">${p}%</b></div>`;
    }
    function recCard(st, i, why, iaFlag){
      const a = AFF[st.id], hi = a.p >= 75, isP = pri === st.id, isS = sel.includes(st.id) && !isP;
      const reasons = why ? `<i>IA:</i> ${esc(why)}` : a.r.slice(0, 2).map(r => `<i>▸</i> ${esc(r)}`).join('<br>');
      return `<div class="m-estilos-rc${hi ? ' hi' : ''}${iaFlag ? ' iav' : ''}${isP || isS ? ' chosen' : ''}${ui.focus === st.id ? ' foc' : ''}" data-go="${st.id}" role="button" tabindex="0" aria-label="${esc(st.n)}: ubicar en la línea temporal">
        <div class="m-estilos-rk">${String(i + 1).padStart(2, '0')}</div>
        <div class="m-estilos-rg">${glyph(st.glifo)}</div>
        <div class="m-estilos-rt"><div class="nm">${esc(st.n)}</div><div class="er">${esc(fmtR(st))} · ${esc(st.region)}</div><div class="why">${reasons}</div></div>
        <div class="m-estilos-rr">${ringSVG(a.p, hi)}<div class="m-estilos-mini">
          <button data-pick="pri" data-id="${st.id}" class="${isP ? 'on' : ''}" aria-label="Elegir como principal" title="Elegir como principal">★</button>
          <button data-pick="${isS ? 'del' : 'sec'}" data-id="${st.id}" class="${isS ? 'on' : ''}" aria-label="${isS ? 'Quitar' : 'Agregar como secundario'}" title="${isS ? 'Quitar' : 'Agregar como secundario'}">${isS ? '✓' : '+'}</button></div></div>
      </div>`;
    }
    function listRow(st){
      const a = AFF[st.id].p, isP = pri === st.id, isS = sel.includes(st.id);
      return `<div class="m-estilos-li${a >= 75 ? ' hi' : ''}${isS ? ' chosen' : ''}${ui.focus === st.id ? ' foc' : ''}" data-go="${st.id}" role="button" tabindex="0" aria-label="${esc(st.n)}: ubicar en la línea temporal">
        <div class="g">${glyph(st.glifo)}</div>
        <div style="min-width:0"><div class="nm">${isP ? '★ ' : ''}${esc(st.n)}</div><div class="er">${esc(fmtR(st))} · ${esc(st.familia)} · ${esc(st.region)}</div></div>
        <div class="p">${a}%${isS ? '<i>' + (isP ? 'PRINCIPAL' : 'ELEGIDO') + '</i>' : ''}</div></div>`;
    }
    function paintRec(){
      const rec = $('rec');
      let html = `<div class="m-estilos-tabs" role="tablist">
        <button class="m-estilos-tab" role="tab" data-act="tab" data-tab="rec" aria-selected="${ui.tab === 'rec'}">Recomendados <b>12</b></button>
        <button class="m-estilos-tab" role="tab" data-act="tab" data-tab="all" aria-selected="${ui.tab === 'all'}">Todos <b>${anyF ? nMatch + '/' : ''}${D.length}</b></button></div>`;
      if (ui.tab === 'all') {
        const list = D.filter(s => !anyF || MATCH[NODE[s.id].i]).sort(ui.sort === 'af' ? (a, b) => AFF[b.id].p - AFF[a.id].p : (a, b) => a.yi - b.yi);
        html += `<div class="m-estilos-srt"><button class="m-estilos-chip" data-act="sort" data-s="yi" aria-pressed="${ui.sort === 'yi'}">Cronológico</button><button class="m-estilos-chip" data-act="sort" data-s="af" aria-pressed="${ui.sort === 'af'}">Por afinidad</button><em>${list.length} estilos</em></div>
          <p class="m-estilos-note" style="margin:0">Usa el buscador y los filtros de arriba (familia, región, solo afines). Toca un estilo para ubicarlo; tócalo otra vez para abrir su ficha.</p>
          <div class="m-estilos-list">${list.map(listRow).join('') || '<p class="m-estilos-note">Ningún estilo coincide.</p>'}</div>`;
      } else {
        html += `<div class="m-estilos-ctx"><span>Proyecto <b>${esc(P.nombre || '—')}</b></span><span>Tipología <b>${esc(tipoN)}${catC ? ' · ' + esc(catC) : ''}</b></span><span>Clima <b>${esc(clima)}</b></span><span>Lugar <b>${esc(lugar)}</b></span></div>`;
        const ia = ui.ia && Array.isArray(ui.ia.orden) ? ui.ia.orden.filter(o => BYID[o.id]) : null;
        if (ia && ia.length) {
          html += `<div class="m-estilos-ia${ui.ia.ok ? ' ok' : ''}"><div class="m-estilos-row" style="align-items:center;justify-content:space-between"><span class="m-estilos-tag${ui.ia.ok ? ' ok' : ''}">${ui.ia.ok ? 'IA · CONFIRMADO' : 'IA · POR VERIFICAR'}</span>
            <div class="m-estilos-row">${ui.ia.ok ? '' : '<button class="m-estilos-btn go" data-act="iaok">Confirmar</button>'}<button class="m-estilos-btn warn" data-act="iano">Descartar</button></div></div>
            <p>Orden propuesto por IA a partir de los ${ia.length} mejores candidatos. Revisa cada razón antes de confirmar.</p></div>`;
          html += ia.slice(0, 15).map((o, i) => recCard(BYID[o.id], i, o.razon, !ui.ia.ok)).join('');
          html += `<div class="m-estilos-h" style="margin-top:6px">Ranking por reglas</div>`;
          html += ranked.slice(0, 12).filter(s => !ia.some(o => o.id === s.id)).map((s, i) => recCard(s, i, null, false)).join('');
        } else {
          html += ranked.slice(0, 12).map((s, i) => recCard(s, i, null, false)).join('');
        }
        html += `<p class="m-estilos-note">Toca una tarjeta para ubicar el estilo en la línea temporal; tócala otra vez para abrir su ficha. Afinidad (0–100) = clima (30) + tipología (22) + región (18) + adecuación bioclimática (18) + vigencia (10) + familia afín (8). Es una guía de diseño: puedes elegir cualquier estilo.</p>`;
      }
      const st = rec.scrollTop; const ls = rec.querySelector('.m-estilos-list'); const lst = ls ? ls.scrollTop : 0;
      rec.innerHTML = html; rec.scrollTop = st;
      const ls2 = rec.querySelector('.m-estilos-list'); if (ls2) ls2.scrollTop = lst;
    }

    /* ── barra de selección ── */
    function paintBar(){
      const chips = sel.map(id => { const s = BYID[id]; const isP = id === pri;
        return `<span class="m-estilos-sel${isP ? ' pri' : ''}" data-open="${id}" role="button" tabindex="0">${isP ? '★ ' : ''}${esc(s.n)}<button data-pick="del" data-id="${id}" aria-label="Quitar ${esc(s.n)}">×</button></span>`; }).join('');
      $('bar').innerHTML = `<div class="m-estilos-bl">TU SELECCIÓN <b>${sel.length}</b></div>
        <div class="m-estilos-sc">${chips || '<em>Toca un nodo y elige tu estilo principal (★) y secundarios (+)</em>'}</div>
        <button class="m-estilos-btn go" data-act="next">Siguiente estación →</button>`;
    }

    /* ── ficha holográfica ── */
    let fx = null;
    function paintFicha(id){
      const st = BYID[id]; if (!st) return;
      const a = AFF[st.id], hi = a.p >= 75, isP = pri === id, isS = sel.includes(id);
      const ct = ctx.clima && ctx.clima.tipo, cat = catC;
      const iaR = ui.ia && Array.isArray(ui.ia.orden) ? (ui.ia.orden.find(o => o.id === id) || {}).razon : null;
      if (!fx) { fx = document.createElement('div'); fx.className = 'm-estilos-fx'; root.appendChild(fx); }
      fx.style.top = root.scrollTop + 'px'; fx.style.height = root.clientHeight + 'px';
      fx.innerHTML = `<div class="m-estilos-card" role="dialog" aria-modal="true" aria-label="${esc(st.n)}">
        <button class="m-estilos-x" data-act="close" aria-label="Cerrar">✕</button>
        <div>
          <div class="m-estilos-holo${hi ? ' hi' : ''}">
            <svg class="ring" viewBox="0 0 100 100" fill="none" stroke="currentColor"><circle cx="50" cy="50" r="48" stroke-width=".6" stroke-dasharray="2 3" opacity=".7"/><circle cx="50" cy="50" r="44" stroke-width="1.2" stroke-dasharray="40 18 6 18" opacity=".8"/><path d="M50 0v6M50 94v6M0 50h6M94 50h6" stroke-width="1"/></svg>
            <svg class="ring r2" viewBox="0 0 100 100" fill="none" stroke="currentColor"><circle cx="50" cy="50" r="47" stroke-width=".8" stroke-dasharray="70 30 12 30"/></svg>
            <div class="disc"><div class="scan"></div></div>
            <div class="gly">${glyph(st.glifo)}</div>
          </div>
          <div class="m-estilos-pct${hi ? ' hi' : ''}">
            <div class="v"><span>AFINIDAD CON EL PROYECTO</span><b>${a.p}%</b></div>
            <div class="m-estilos-meter"><i style="width:${a.p}%"></i></div>
            <ul class="m-estilos-why">${a.r.map(r => `<li>${esc(r)}</li>`).join('')}${iaR ? `<li><span class="m-estilos-tag${ui.ia.ok ? ' ok' : ''}">${ui.ia.ok ? 'IA' : 'IA · POR VERIFICAR'}</span> ${esc(iaR)}</li>` : ''}</ul>
          </div>
        </div>
        <div class="m-estilos-info">
          <div class="m-estilos-fam">${esc(st.familia)} · ${esc(st.region)}</div>
          <h3>${esc(st.n)}</h3>
          <div class="m-estilos-era"><b>${esc(fmtR(st))}</b> · ${esc(st.era)}</div>
          <div class="m-estilos-grid2">
            <div class="m-estilos-box"><h4>Rasgos</h4><ul>${st.rasgos.map(r => `<li>${esc(r)}</li>`).join('')}</ul></div>
            <div class="m-estilos-box"><h4>Obras representativas</h4><ul>${st.obras.map(r => `<li>${esc(r)}</li>`).join('')}</ul></div>
            <div class="m-estilos-box"><h4>Materiales</h4><p>${esc(st.materiales)}</p></div>
            <div class="m-estilos-box"><h4>Autores / constructores</h4><p>${esc(st.autores)}</p></div>
            <div class="m-estilos-box"><h4>Climas donde funciona</h4><div class="m-estilos-pills">${st.clima.map(c => `<span class="${c === ct ? 'on' : ''}">${esc(CLN[c])}</span>`).join('')}</div></div>
            <div class="m-estilos-box"><h4>Usos afines</h4><div class="m-estilos-pills">${st.usos.map(u => `<span class="${u === cat ? 'on' : ''}">${esc(CATN[u] || u)}</span>`).join('') || '<span>—</span>'}</div></div>
            <div class="m-estilos-box wide"><h4>Adecuación bioclimática</h4><div class="m-estilos-sost">${[1,2,3].map(i => `<i class="${st.sost >= i ? 'on' : ''}"></i>`).join('')}<em>${st.sost}/3</em></div></div>
          </div>
          <div class="m-estilos-acts">
            <button class="m-estilos-btn go" data-pick="pri" data-id="${id}" ${isP ? 'disabled style="opacity:.6"' : ''}>★ ${isP ? 'Estilo principal' : 'Elegir como estilo principal'}</button>
            ${isS && !isP ? '' : `<button class="m-estilos-btn acc" data-pick="sec" data-id="${id}">+ ${isP ? 'Pasar a secundario' : 'Agregar como secundario'}</button>`}
            ${isS ? `<button class="m-estilos-btn warn" data-pick="del" data-id="${id}">Quitar</button>` : ''}
            <button class="m-estilos-btn" data-act="locate" data-id="${id}">Ver en la línea de tiempo</button>
          </div>
        </div>
      </div>`;
    }
    function openFicha(id){ showTip(null); ui.open = id; root.style.overflow = 'hidden'; paintFicha(id); const x = fx && fx.querySelector('.m-estilos-x'); if (x) x.focus({preventScroll: true}); }
    function closeFicha(){ ui.open = null; root.style.overflow = ''; if (fx) { fx.remove(); fx = null; } poke(); }

    /* ── IA ── */
    let sampler = null;
    (async () => {
      try { sampler = ctx.sample ? await ctx.sample() : null; } catch (e) { sampler = null; }
      if (alive && sampler) root.querySelector('[data-act="ia"]').hidden = false;
    })();
    async function afinarIA(btn){
      let s = null;
      try { s = await ctx.sample(); } catch (e) {}
      if (!s) { btn.hidden = true; return; }
      const top = ranked.slice(0, 30).map(st => ({id: st.id, n: st.n, epoca: fmtR(st), region: st.region, familia: st.familia, rasgos: st.rasgos.slice(0, 3), clima: st.clima, sost: st.sost, afinidad: AFF[st.id].p}));
      const prompt = `Eres asesor senior de diseño arquitectónico en Ecuador. Proyecto: "${P.nombre || ''}", tipología ${tipoN} (categoría ${CATN[catC] || catC || 'sin definir'}), ubicación ${lugar}, clima ${clima}, altitud ~${ctx.clima && ctx.clima.elev != null ? ctx.clima.elev : '?'} m, terreno ${ctx.area || 0} m².
Candidatos (JSON con afinidad calculada por reglas): ${JSON.stringify(top)}
Tarea: reordena y elige los 15 estilos más adecuados para inspirar el lenguaje arquitectónico de ESTE proyecto (clima, usuarios, normativa y contexto cultural ecuatoriano). Responde SOLO JSON válido con la forma {"orden":[{"id":"<id de la lista>","razon":"<máx. 140 caracteres, español de Ecuador, concreta>"}]}. Usa únicamente ids de la lista.`;
      const old = btn.innerHTML; btn.disabled = true; btn.innerHTML = '<i class="m-estilos-spin"></i> Analizando…';
      try {
        const r = await s.json(prompt, {modelTier: 'default'});
        const arr = r && Array.isArray(r.orden) ? r.orden : (Array.isArray(r) ? r : []);
        const seen = new Set();
        const orden = arr.filter(o => o && BYID[o.id] && !seen.has(o.id) && seen.add(o.id)).slice(0, 15).map(o => ({id: o.id, razon: String(o.razon || '').slice(0, 200)}));
        if (!orden.length) throw new Error('vacío');
        ui.ia = {orden, ok: false, t: Date.now()};
        saveSoon(); paintRec(); $('rec').scrollTop = 0;
        ctx.toast && ctx.toast('IA: ' + orden.length + ' estilos reordenados · POR VERIFICAR');
      } catch (e) {
        ctx.toast && ctx.toast('La IA no respondió correctamente. Intenta de nuevo.');
      } finally { if (alive) { btn.disabled = false; btn.innerHTML = old; } }
    }

    /* ── eventos ── */
    function scrollToVp(){
      const rr = root.getBoundingClientRect(), vr = vp.getBoundingClientRect();
      if (vr.top < rr.top - 40 || vr.top > rr.top + rr.height * 0.5) root.scrollTo({top: Math.max(0, root.scrollTop + vr.top - rr.top - 8), behavior: RM ? 'auto' : 'smooth'});
    }
    function goTo(id){
      if (ui.focus === id) { openFicha(id); return; }
      scrollToVp(); centerOn(id);
    }
    let qT = 0;
    $('q').addEventListener('input', e => {
      clearTimeout(qT);
      qT = setTimeout(() => { ui.q = norm(e.target.value.trim()); refilter(); }, 140);
    });
    $('q').addEventListener('keydown', e => {
      if (e.key === 'Enter') { e.preventDefault(); clearTimeout(qT); ui.q = norm(e.target.value.trim()); refilter(); const f = ranked.find(s => MATCH[NODE[s.id].i]); if (f) { scrollToVp(); centerOn(f.id); } }
    });
    root.addEventListener('click', e => {
      const t = e.target;
      const pick = t.closest('[data-pick]');
      if (pick) { e.stopPropagation(); choose(pick.dataset.id, pick.dataset.pick); return; }
      const actB = t.closest('[data-act]');
      if (actB) {
        const act = actB.dataset.act;
        if (act === 'filt') { ui.filt = !ui.filt; paintFilters(); requestAnimationFrame(() => poke()); }
        else if (act === 'solo') { ui.solo = !ui.solo; actB.setAttribute('aria-pressed', String(ui.solo)); refilter(); saveSoon(); }
        else if (act === 'clr') { ui.fam.clear(); ui.reg.clear(); paintFilters(); refilter(); saveSoon(); }
        else if (act === 'ia') afinarIA(actB);
        else if (act === 'iaok') { if (ui.ia) ui.ia.ok = true; saveSoon(); paintRec(); ctx.toast && ctx.toast('Recomendación IA confirmada'); }
        else if (act === 'iano') { ui.ia = null; saveSoon(); paintRec(); }
        else if (act === 'next') { try { ctx.next && ctx.next(); } catch (er) {} }
        else if (act === 'close') closeFicha();
        else if (act === 'tab') { ui.tab = actB.dataset.tab === 'all' ? 'all' : 'rec'; paintRec(); saveSoon(); }
        else if (act === 'sort') { ui.sort = actB.dataset.s === 'af' ? 'af' : 'yi'; paintRec(); saveSoon(); }
        else if (act === 'unfocus') setFocus(null);
        else if (act === 'locate') { const id = actB.dataset.id; closeFicha(); scrollToVp(); centerOn(id); }
        return;
      }
      const chip = t.closest('.m-estilos-chip');
      if (chip && chip.parentElement && chip.parentElement.dataset.r) {
        const set = chip.parentElement.dataset.r === 'cf' ? ui.fam : ui.reg, v = chip.dataset.v;
        set.has(v) ? set.delete(v) : set.add(v);
        paintFilters(); refilter(); saveSoon(); return;
      }
      if (fx && t === fx) { closeFicha(); return; }
      const go = t.closest('[data-go]');
      if (go) { goTo(go.dataset.go); return; }
      const op = t.closest('[data-open]');
      if (op) openFicha(op.dataset.open);
    });
    root.addEventListener('keydown', e => {
      if (e.key === 'Escape') { if (ui.open) { closeFicha(); return; } if (ui.focus) { setFocus(null); return; } }
      if ((e.key === 'Enter' || e.key === ' ') && e.target.matches) {
        if (e.target.matches('[data-go]')) { e.preventDefault(); goTo(e.target.dataset.go); }
        else if (e.target.matches('[data-open]') && !e.target.matches('button')) { e.preventDefault(); openFicha(e.target.dataset.open); }
      }
    });
    root.querySelector('.m-estilos-zc').addEventListener('click', e => {
      const b = e.target.closest('[data-z]'); if (!b) return;
      e.stopPropagation(); dims();
      const z = b.dataset.z;
      if (z === 'all') fitAll(true);
      else if (z === 'af') fitAfines();
      else { camVals(); const f = z === '+' ? 1.7 : 1 / 1.7; const k = ui.k * f, h = ui.h * Math.pow(f, HEXP);
        const wx = ui.cx, u = ui.cy; flyTo(k, h, wx, u, 320); }
    });
    // arrastre libre (X e Y) con inercia, pellizco, toque y doble toque
    const pts = new Map();
    let lastTap = {id: null, t: 0};
    function local(e){ const r = vp.getBoundingClientRect(); return {x: e.clientX - r.left, y: e.clientY - r.top}; }
    function onDown(e){
      if (e.target.closest('.m-estilos-zc') || e.target.closest('.m-estilos-fc')) return;
      if (e.button != null && e.button > 0) return;
      try { vp.setPointerCapture(e.pointerId); } catch (er) {}
      const p = local(e);
      pts.set(e.pointerId, p);
      tween = null; inert = null; showTip(null);
      if (pts.size === 1) drag = {x: p.x, y: p.y, lx: p.x, ly: p.y, lt: performance.now(), vx: 0, vy: 0, moved: false, type: e.pointerType};
      else if (pts.size === 2) {
        const [a, b] = [...pts.values()];
        camVals();
        const mx = (a.x + b.x) / 2, my = (a.y + b.y) / 2;
        pinch = {d: Math.hypot(a.x - b.x, a.y - b.y) || 1, k: ui.k, h: ui.h, wx: ui.cx + (mx - VW / 2) / H, u: ui.cy + (my - VH / 2) / VY};
        if (drag) drag.moved = true;
      }
      vp.classList.add('drag'); poke();
    }
    function onMove(e){
      const p = local(e);
      if (!pts.has(e.pointerId)) {
        if (e.pointerType === 'mouse' && !ui.open) { const id = nodeAt(p.x, p.y, 14); showTip(id, p.x, p.y); }
        return;
      }
      pts.set(e.pointerId, p);
      if (pts.size >= 2 && pinch) {
        const [a, b] = [...pts.values()];
        const f = (Math.hypot(a.x - b.x, a.y - b.y) || 1) / pinch.d, mx = (a.x + b.x) / 2, my = (a.y + b.y) / 2;
        ui.k = clamp(pinch.k * f, KMIN, KMAX); ui.h = clamp(pinch.h * Math.pow(f, HEXP), HMIN, HMAX);
        H = ui.h; VY = VY0 * ui.k;
        ui.cx = pinch.wx - (mx - VW / 2) / H; ui.cy = pinch.u - (my - VH / 2) / VY;
        poke();
      } else if (drag) {
        const dx = p.x - drag.lx, dy = p.y - drag.ly, now = performance.now(), dt = Math.max(1, now - drag.lt);
        if (Math.abs(p.x - drag.x) + Math.abs(p.y - drag.y) > 6) drag.moved = true;
        if (drag.moved) {
          panBy(dx, dy);
          drag.vx = drag.vx * 0.6 + (dx / dt) * 0.4; drag.vy = drag.vy * 0.6 + (dy / dt) * 0.4;
        }
        drag.lx = p.x; drag.ly = p.y; drag.lt = now;
      }
    }
    function onUp(e){
      if (!pts.has(e.pointerId)) return;
      const p = local(e);
      pts.delete(e.pointerId);
      if (pts.size < 2) pinch = null;
      if (pts.size === 0) {
        vp.classList.remove('drag');
        if (drag && !drag.moved && e.type === 'pointerup') {
          const id = nodeAt(p.x, p.y, drag.type === 'mouse' ? 14 : 24), now = performance.now();
          if (id) {
            if (lastTap.id === id && now - lastTap.t < 420) { lastTap = {id: null, t: 0}; openFicha(id); }
            else { lastTap = {id, t: now}; setFocus(id); }
          } else { lastTap = {id: null, t: 0}; if (ui.focus) setFocus(null); }
        } else if (drag && drag.moved) {
          if (performance.now() - drag.lt < 80 && Math.hypot(drag.vx, drag.vy) > 0.08 && !RM) inert = {vx: drag.vx, vy: drag.vy};
          saveSoon();
        }
        drag = null; poke();
      } else if (pts.size === 1) {
        const q = [...pts.values()][0];
        drag = {x: q.x, y: q.y, lx: q.x, ly: q.y, lt: performance.now(), vx: 0, vy: 0, moved: true, type: e.pointerType};
      }
    }
    function onLeave(e){ if (e.pointerType === 'mouse' && !pts.size) showTip(null); }
    function onWheel(e){
      e.preventDefault();
      const p = local(e);
      const dy = e.deltaMode === 1 ? e.deltaY * 16 : e.deltaMode === 2 ? e.deltaY * VH : e.deltaY;
      const dx = e.deltaMode === 1 ? e.deltaX * 16 : e.deltaMode === 2 ? e.deltaX * VW : e.deltaX;
      tween = null; inert = null; showTip(null);
      if (e.ctrlKey) { zoomAt(p.x, p.y, Math.exp(-dy * 0.01)); return; }
      if (e.shiftKey) { panBy(-(dx || dy), 0); saveSoon(); return; }
      if (Math.abs(dx) > Math.abs(dy) * 1.2) { panBy(-dx, 0); saveSoon(); return; }
      zoomAt(p.x, p.y, Math.exp(-dy * 0.0018));
    }
    function onKey(e){
      if (e.target !== vp) return;
      const step = 90;
      if (e.key === 'ArrowLeft') panBy(step, 0); else if (e.key === 'ArrowRight') panBy(-step, 0);
      else if (e.key === 'ArrowUp') panBy(0, step); else if (e.key === 'ArrowDown') panBy(0, -step);
      else if (e.key === '+' || e.key === '=') zoomAt(VW / 2, VH / 2, 1.4);
      else if (e.key === '-' || e.key === '_') zoomAt(VW / 2, VH / 2, 1 / 1.4);
      else if (e.key === '0') fitAll(true);
      else return;
      e.preventDefault(); saveSoon();
    }
    vp.addEventListener('pointerdown', onDown);
    vp.addEventListener('pointermove', onMove);
    vp.addEventListener('pointerup', onUp);
    vp.addEventListener('pointercancel', onUp);
    vp.addEventListener('pointerleave', onLeave);
    vp.addEventListener('wheel', onWheel, {passive: false});
    vp.addEventListener('keydown', onKey);
    vp.addEventListener('dblclick', e => e.preventDefault());

    let ro = null, io = null;
    function onResize(){
      if (!alive) return;
      dims();
      if (!inited && VW > 40 && VH > 40) { inited = true; if (needFit) { needFit = false; fitAll(false); } }
      if (fx) { fx.style.top = root.scrollTop + 'px'; fx.style.height = root.clientHeight + 'px'; }
      poke();
    }
    if (window.ResizeObserver) { ro = new ResizeObserver(() => onResize()); ro.observe(vp); ro.observe(root); }
    else window.addEventListener('resize', onResize);
    if (window.IntersectionObserver) {
      io = new IntersectionObserver(es => { vpVis = es.some(x => x.isIntersecting); if (vpVis) poke(); }, {threshold: 0});
      io.observe(vp);
    }
    const onVis = () => { if (!document.hidden) poke(); };
    document.addEventListener('visibilitychange', onVis);

    /* ── primer pintado ── */
    refilter(); paintRec(); paintBar();
    dims();
    let needFit = ui.k == null;
    if (VW > 40 && VH > 40) { inited = true; if (needFit) { needFit = false; fitAll(false); } }
    if (ui.k == null) { ui.k = 1; ui.h = 20; }
    camVals(); sched();
    if (ui.open && BYID[ui.open]) openFicha(ui.open);

    const cleanup = () => {
      alive = false;
      if (raf) cancelAnimationFrame(raf); raf = 0;
      clearTimeout(saveT); clearTimeout(qT);
      if (ro) ro.disconnect(); else window.removeEventListener('resize', onResize);
      if (io) io.disconnect();
      document.removeEventListener('visibilitychange', onVis);
    };
    prevCleanup = cleanup;
    return cleanup;
  }
};
})();
