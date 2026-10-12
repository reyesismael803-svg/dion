/* Atlas Tipológico — datos 5: Transporte, Industria y logística, Agropecuario, Infraestructura, Ciencia, Efímeras, Futuras */
window.TAX = window.TAX || [];

TAX.push({c:"TRA", n:"Transporte y movilidad", f:"lineal",
d:"Edificaciones donde se sube, baja, espera, transborda o guarda un medio de transporte. Su diseño se rige por flujos de personas y vehículos, seguridad y capacidad.",
s:[
{n:"Aéreo", f:"nave", t:[
["Aeropuerto internacional",5,"Terminal de pasajeros con migración, aduanas, seguridad, salas, mangas, pistas, torre y áreas de carga.","Controles internacionales y gran escala.","Flujos de salida y llegada|Crecimiento modular|Normas OACI","Ej.: Aeropuerto Mariscal Sucre (Quito), José Joaquín de Olmedo (Guayaquil)."],
["Aeropuerto doméstico / regional",4,"Terminal para vuelos nacionales con procesos más simples.","Sin migración ni aduana.","Escala|Seguridad|Estacionamiento"],
["Aeródromo / aeropuerto ecológico",3,"Pista y terminal pequeña para aviación general o destinos sensibles.","Pequeña escala o baja huella.","Pista corta|Impacto ambiental|Operación","El aeropuerto de Seymour en Baltra (Galápagos) funciona con energía renovable.","lineal"],
["Helipuerto",1,"Plataforma de aterrizaje de helicópteros en suelo o azotea.","Solo helicópteros.","Cargas|Aproximaciones libres|Seguridad contra incendio","abierto"],
["Vertipuerto",2,"Plataforma para aeronaves eléctricas de despegue vertical (eVTOL) o drones de pasajeros.","Tipología emergente para movilidad aérea urbana.","Carga eléctrica|Ruido|Integración con edificios","abierto"],
["Hangar",3,"Nave de gran luz para guardar y mantener aeronaves.","Luces estructurales enormes.","Puertas de gran luz|Altura|Talleres"],
["Terminal de carga aérea",4,"Nave logística para carga aérea con aduana y cámaras frías.","Carga, no pasajeros.","Frío|Aduana|Maniobra","Clave en Quito y Guayaquil por la exportación de flores."],
["Torre de control",2,"Torre con cabina de vista de 360° para control de tráfico aéreo.","Altura y visibilidad total.","Visibilidad|Estabilidad|Redundancia","mastil"]
]},
{n:"Terrestre", f:"nave", t:[
["Terminal terrestre",4,"Terminal de buses interprovinciales con andenes, boleterías, salas, comercio y servicios.","Buses de larga distancia.","Andenes y maniobras|Comercio|Seguridad","Término usado en Ecuador: Terminal Quitumbe, Carcelén, Terminal Terrestre de Guayaquil."],
["Estación de bus / BRT",2,"Parada cerrada de buses de tránsito rápido con pago previo y andén elevado.","Pago antes de subir y andén a nivel.","Andén al nivel del bus|Control de pago|Capacidad","En Quito: Trolebús y Ecovía; en Guayaquil: Metrovía.","lineal"],
["Estación de metro",3,"Estación subterránea o elevada con vestíbulo, andenes, accesos y ventilación.","Gran profundidad y flujos masivos.","Evacuación|Ventilación|Accesos","El Metro de Quito opera desde 2023."],
["Estación de tren",3,"Estación de pasajeros con andenes, vestíbulo y servicios.","Ferrocarril convencional.","Andenes|Patrimonio|Servicios","En Ecuador el Tren Crucero y sus estaciones patrimoniales (ej. Alausí, Nariz del Diablo)."],
["Estación de alta velocidad",5,"Gran estación para trenes de alta velocidad con comercio y conexiones.","Escala y velocidad mayores.","Intermodalidad|Comercio|Andenes largos"],
["Intercambiador modal",5,"Nodo donde se conectan varios modos (metro, bus, bici, taxi).","Integra varios sistemas.","Transbordos cortos|Señalética|Espacio público"],
["Estación de teleférico / cable",2,"Estación de cabinas colgantes para transporte urbano o turístico.","Transporte por cable.","Maquinaria|Andén de embarque|Torres","Ej.: TelefériQo de Quito, Aerovía de Guayaquil.","mastil"],
["Funicular",2,"Estación y vía inclinada para vagones arrastrados por cable.","Pendientes extremas.","Pendiente|Maquinaria|Andenes"],
["Estacionamiento / parqueadero",4,"Edificio de estacionamientos de varios niveles con rampas.","Solo guarda vehículos.","Rampas y radios|Ventilación|Reconversión futura","bloque"],
["Parqueadero automatizado",3,"Estacionamiento con sistemas robóticos que ubican los autos.","Sin rampas; máquinas mueven los autos.","Maquinaria|Tiempos|Mantenimiento","torre"],
["Estación de peaje",2,"Casetas y cubierta sobre carriles para cobro.","Control de pago vehicular.","Carriles|Cubierta|Automatización","pabellon"],
["Puente / viaducto",4,"Estructura para cruzar ríos, valles o vías.","Obra de infraestructura.","Luz|Cimentación|Sismo","lineal"],
["Túnel",4,"Paso subterráneo vial o ferroviario.","Obra subterránea.","Ventilación|Geología|Evacuación","lineal"]
]},
{n:"Acuático", f:"lineal", t:[
["Puerto marítimo",5,"Muelles, patios de contenedores, grúas, bodegas y aduana.","Carga masiva.","Calado|Grúas|Logística","Ej.: Puerto de Guayaquil, Posorja, Manta."],
["Terminal de cruceros",4,"Terminal de pasajeros para cruceros con migración y servicios.","Pasajeros marítimos.","Migración|Buses turísticos|Comercio","nave"],
["Muelle / embarcadero",2,"Plataforma de embarque para lanchas y botes.","Pequeña escala.","Mareas|Accesibilidad|Cubierta"],
["Puerto fluvial",3,"Muelles y terminal en ríos navegables.","Ríos y canoas.","Crecidas|Carga menor|Pasajeros","Clave en la Amazonía ecuatoriana: Coca, Misahuallí."],
["Astillero",4,"Instalación para construir y reparar embarcaciones con gradas y diques.","Industria naval.","Diques|Grúas|Talleres","nave"],
["Faro",1,"Torre con luz de señalización para navegación.","Señal marítima.","Altura|Visibilidad|Mantenimiento","mastil"]
]},
{n:"Espacial", f:"mastil", t:[
["Puerto espacial / base de lanzamiento",5,"Plataformas de lanzamiento, hangares de ensamblaje y control de misión.","Lanzamientos orbitales.","Distancias de seguridad|Ensamblaje vertical|Control","abierto"],
["Centro de control de misión",3,"Sala de control y comunicaciones para misiones espaciales.","Operación y monitoreo.","Redundancia|Pantallas|Seguridad","bloque"]
]}
]});

TAX.push({c:"IND", n:"Industria y logística", f:"nave",
d:"Edificaciones para producir, transformar, almacenar y distribuir bienes. Las definen los procesos, las cargas, la maniobra de vehículos y la seguridad industrial.",
s:[
{n:"Producción", f:"nave", t:[
["Taller artesanal",1,"Espacio de producción manual (carpintería, cerámica, joyería).","Producción manual en pequeño.","Ventilación|Ruido|Seguridad"],
["Microfábrica / manufactura ligera",2,"Planta pequeña de producción urbana (alimentos, textiles, electrónicos).","Industria compatible con la ciudad.","Compatibilidad de uso|Carga|Ruido"],
["Nave industrial",3,"Edificio de gran luz para cualquier actividad industrial o de almacenaje.","Contenedor genérico.","Luces|Altura|Andenes"],
["Planta de manufactura",4,"Fábrica organizada por línea de producción, bodegas y oficinas.","Proceso específico.","Layout del proceso|Seguridad industrial|Crecimiento"],
["Industria pesada",5,"Planta de siderurgia, cemento o química con grandes equipos.","Riesgo y escala mayores.","Impacto ambiental|Riesgo|Infraestructura"],
["Planta de alimentos y bebidas",4,"Planta con procesos sanitarios, cámaras y envasado.","Higiene sanitaria estricta.","Zonas limpias|Frío|Normas ARCSA","En Ecuador la ARCSA certifica BPM (Buenas Prácticas de Manufactura)."],
["Planta farmacéutica",4,"Planta con salas limpias, control de presión y validaciones.","Salas limpias clasificadas.","Salas limpias|Presiones|Validación"],
["Sala limpia / fábrica de semiconductores",5,"Fábrica con control extremo de partículas y vibraciones.","El nivel de limpieza es extremo.","Filtración HEPA/ULPA|Vibraciones|Energía"],
["Cervecería industrial / destilería",4,"Planta de producción de bebidas alcohólicas.","Procesos de fermentación.","Tanques|Olores|Carga"],
["Bodega de vinos / viñedo",3,"Edificio de elaboración y crianza de vinos con barricas y sala de catas.","Enoturismo y producción.","Temperatura|Barricas|Visitas"],
["Refinería / planta petroquímica",5,"Complejo de procesamiento de hidrocarburos.","Alto riesgo industrial.","Riesgo|Distancias|Ambiente","Ej.: Refinería de Esmeraldas.","abierto"],
["Planta de ensamblaje automotriz",5,"Línea de ensamblaje de vehículos con talleres de pintura.","Líneas largas y pintura.","Línea|Pintura|Logística"]
]},
{n:"Logística y almacenaje", f:"nave", t:[
["Bodega / almacén",3,"Nave para almacenar mercancías con racks y andenes.","Almacena; no produce.","Racks|Andenes|Seguridad"],
["Centro de distribución",4,"Nave logística de recepción, almacenaje, preparación y despacho.","Rotación rápida.","Andenes|Automatización|Patios"],
["Centro logístico de última milla",3,"Hub urbano de reparto a domicilio.","Cerca del consumidor.","Ubicación|Flota de reparto|Horarios"],
["Almacén frigorífico / cadena de frío",4,"Bodega con cámaras de refrigeración y congelación.","Aislamiento y frío.","Aislamiento|Pisos calefaccionados|Energía"],
["Dark store",2,"Pequeño almacén urbano para pedidos en línea de entrega rápida.","Sin público.","Ubicación|Preparación rápida|Repartidores"],
["Parque industrial",5,"Terreno urbanizado con lotes, vías e infraestructura para industrias.","Agrupa industrias.","Vías de carga|Servicios|Normativa","abierto"],
["Zona franca / zona especial de desarrollo",5,"Área con régimen aduanero y tributario especial para industria y exportación.","El régimen fiscal la define.","Control aduanero|Infraestructura|Incentivos","En Ecuador existen las ZEDE (Zonas Especiales de Desarrollo Económico).","abierto"],
["Patio de contenedores",4,"Explanada para almacenar y mover contenedores.","Solo contenedores y maquinaria.","Pavimentos|Grúas|Accesos","abierto"]
]},
{n:"Tecnología", f:"nave", t:[
["Centro de datos",4,"Edificio con salas de servidores, energía redundante y refrigeración.","Energía y frío son el programa.","Redundancia (Tier)|Refrigeración|Seguridad"],
["Centro de datos por inmersión / edge",2,"Centros pequeños cerca del usuario o con refrigeración líquida.","Escala pequeña o nueva tecnología.","Modularidad|Energía|Frío","modulo"],
["Laboratorio industrial / de ensayos",3,"Laboratorios de control de calidad y pruebas de materiales.","Pruebas técnicas.","Equipos|Vibración|Seguridad","bloque"]
]}
]});

TAX.push({c:"AGR", n:"Agropecuario y rural", f:"nave",
d:"Construcciones para cultivar, criar, procesar y almacenar productos del campo. Responden al clima, al proceso productivo y al bienestar animal.",
s:[
{n:"Producción agrícola", f:"nave", t:[
["Invernadero",2,"Estructura cubierta de plástico o vidrio para controlar clima de cultivos.","Clima controlado para plantas.","Ventilación|Riego|Orientación"],
["Florícola",4,"Finca de cultivo de flores de exportación con invernaderos, poscosecha y cuartos fríos.","Poscosecha y frío para exportar.","Invernaderos|Poscosecha|Cuartos fríos","El Ecuador es de los mayores exportadores de rosas; se concentran en Cayambe, Tabacundo y Cotopaxi.","campus"],
["Vivero",2,"Producción de plantas para venta o reforestación.","Producción de plántulas.","Sombra|Riego|Venta","abierto"],
["Granja vertical",3,"Edificio de cultivo en pisos con hidroponía y luz artificial.","Cultivo en altura en la ciudad.","Iluminación LED|Energía|Agua","torre"],
["Centro de acopio",3,"Galpón donde se reúne, clasifica y comercializa la producción de pequeños productores.","Punto de reunión de producción.","Clasificación|Frío|Carga"],
["Silo / granero",2,"Estructura de almacenaje de granos.","Almacén vertical de granos.","Humedad|Carga|Plagas","mastil"],
["Centro de beneficio de café / cacao",2,"Instalación para fermentar, secar y procesar café o cacao.","Poscosecha tropical.","Fermentación|Secaderos|Humedad","El cacao fino de aroma ecuatoriano y el café de Loja requieren estos espacios."],
["Empacadora bananera",3,"Galpón con tinas de lavado, selección y empaque de banano.","Poscosecha de banano.","Agua|Cables vía|Carga","El Ecuador es el mayor exportador de banano del mundo."],
["Trapiche / ingenio",3,"Molienda de caña para panela, aguardiente o azúcar.","Procesa caña de azúcar.","Molinos|Hornos|Humo"]
]},
{n:"Pecuario y acuícola", f:"nave", t:[
["Establo / lechería",3,"Instalación para ganado lechero con sala de ordeño y alimentación.","Ordeño y ganado.","Sala de ordeño|Estiércol|Bienestar animal"],
["Galpón avícola",3,"Nave para crianza de pollos o gallinas.","Aves en alta densidad.","Ventilación|Temperatura|Bioseguridad"],
["Porqueriza / granja porcina",3,"Instalación para crianza de cerdos.","Manejo de desechos intenso.","Biodigestor|Olores|Bioseguridad"],
["Caballerizas",2,"Boxes para caballos, guardarnés y picadero.","Caballos.","Ventilación|Boxes|Picadero"],
["Camaronera",4,"Piscinas de cultivo de camarón con compuertas y bodegas.","Acuicultura en piscinas costeras.","Manglares y ambiente|Bombeo|Laboratorio","El camarón es uno de los principales productos de exportación del Ecuador.","abierto"],
["Piscicultura / acuicultura",3,"Estanques o jaulas para peces (tilapia, trucha).","Peces en agua dulce o mar.","Agua|Oxigenación|Procesamiento","abierto"],
["Camal / matadero",3,"Planta de faenamiento de animales con cadena de frío.","Proceso sanitario estricto.","Flujos sucio/limpio|Frío|Desechos","En Ecuador los camales municipales están regulados por Agrocalidad."],
["Apiario",1,"Área de colmenas y sala de extracción de miel.","Abejas.","Distancias|Sala de extracción|Floración","abierto"]
]},
{n:"Vivienda y servicios rurales", f:"casa", t:[
["Casa de hacienda",3,"Casa principal de una hacienda con patios, capilla y áreas de servicio.","Centro de la hacienda productiva.","Patrimonio|Patios|Anexos","Arquitectura característica de la Sierra ecuatoriana."],
["Finca / granja integral",3,"Unidad productiva familiar con vivienda, cultivos y animales.","Producción diversificada familiar.","Ciclos cerrados|Agua|Vivienda","campus"],
["Centro de investigación agropecuaria",4,"Estación experimental con laboratorios, parcelas y bodegas.","Investigación agrícola.","Parcelas|Laboratorios|Bodegas","En Ecuador, las estaciones experimentales del INIAP.","campus"]
]}
]});

TAX.push({c:"INF", n:"Infraestructura y servicios urbanos", f:"nave",
d:"Edificaciones que hacen funcionar la ciudad: agua, energía, residuos y telecomunicaciones. Son técnicas, pero cada vez más se diseñan como arquitectura pública.",
s:[
{n:"Agua", f:"nave", t:[
["Planta de agua potable",4,"Planta con captación, floculación, filtración y desinfección.","Produce agua potable.","Procesos|Laboratorio|Seguridad"],
["Planta de tratamiento de aguas residuales (PTAR)",4,"Planta que depura aguas servidas antes de devolverlas al ambiente.","Trata aguas residuales.","Olores|Lodos|Distancias"],
["Tanque / reservorio",2,"Depósito de agua elevado o enterrado.","Almacena agua.","Estructura|Cota|Mantenimiento","cupula"],
["Estación de bombeo",1,"Edificio con bombas que impulsan agua o aguas servidas.","Bombeo.","Ruido|Mantenimiento|Energía","bloque"],
["Represa",5,"Obra de embalse para agua o energía.","Obra hidráulica mayor.","Geología|Impacto|Seguridad","lineal"]
]},
{n:"Energía", f:"nave", t:[
["Central hidroeléctrica",5,"Casa de máquinas con turbinas, conducciones y subestación.","Genera con agua.","Casa de máquinas|Conducción|Impacto","Ej.: Coca Codo Sinclair, Paute."],
["Central termoeléctrica",4,"Planta que genera electricidad quemando combustibles.","Combustión.","Emisiones|Ruido|Combustible"],
["Parque solar",5,"Campo de paneles fotovoltaicos con inversores y subestación.","Genera con el sol.","Orientación|Terreno|Conexión","abierto"],
["Parque eólico",5,"Aerogeneradores con subestación.","Genera con viento.","Recurso eólico|Aves|Accesos","Ej.: Villonaco (Loja).","mastil"],
["Subestación eléctrica",3,"Instalación de transformación y distribución de energía.","Transforma energía.","Distancias de seguridad|Cerramiento|Ruido","abierto"],
["Central nuclear",5,"Planta con reactor, contención y turbinas.","Fisión nuclear.","Seguridad extrema|Refrigeración|Residuos","cupula"],
["Planta de biogás / biomasa",3,"Planta que genera energía de residuos orgánicos.","Energía de residuos.","Digestores|Olores|Materia prima"],
["Estación de hidrógeno",1,"Estación de recarga de vehículos de hidrógeno.","Nuevo combustible.","Seguridad|Almacenamiento|Distancias","pabellon"]
]},
{n:"Residuos", f:"nave", t:[
["Relleno sanitario",5,"Terreno impermeabilizado para disposición final de residuos.","Disposición final.","Lixiviados|Gases|Cierre","abierto"],
["Planta de reciclaje",3,"Nave de separación y procesamiento de reciclables.","Recuperación de materiales.","Bandas|Carga|Recicladores de base"],
["Punto limpio / centro de acopio de reciclaje",1,"Lugar donde los ciudadanos dejan residuos separados.","Pequeña escala ciudadana.","Contenedores|Acceso|Limpieza","abierto"],
["Planta de valorización energética",4,"Planta que convierte residuos en energía; puede incluir usos públicos, como la pista de esquí de CopenHill en Copenhague.","Residuos a energía, a veces con uso recreativo.","Emisiones|Imagen urbana|Usos públicos"],
["Estación de transferencia",3,"Nave donde los camiones recolectores transfieren residuos a vehículos grandes.","Paso intermedio.","Maniobra|Olores|Limpieza"]
]},
{n:"Telecomunicaciones y medición", f:"mastil", t:[
["Torre de telecomunicaciones",2,"Torre de antenas de radio, TV o telefonía.","Soporte de antenas.","Altura|Cimentación|Radiación","mastil"],
["Torre mirador de TV",4,"Torre de comunicaciones con mirador y restaurante.","Suma uso turístico.","Ascensores|Viento|Estructura","mastil"],
["Estación meteorológica / sismológica",1,"Pequeña instalación de medición.","Medición científica.","Ubicación|Autonomía|Protección","El Instituto Geofísico de la EPN monitorea volcanes y sismos en Ecuador.","modulo"]
]}
]});

TAX.push({c:"CIE", n:"Ciencia e investigación", f:"bloque",
d:"Edificaciones para generar conocimiento: laboratorios, estaciones de campo y grandes instrumentos científicos. Exigen flexibilidad, instalaciones y seguridad.",
s:[
{n:"Laboratorios y centros", f:"bloque", t:[
["Laboratorio de investigación",3,"Edificio de laboratorios húmedos o secos con oficinas y salas de apoyo.","Investigación, no producción.","Flexibilidad de mesones|Extracción|Instalaciones"],
["Laboratorio de bioseguridad (BSL-3/4)",3,"Laboratorio de contención para patógenos peligrosos.","Contención máxima.","Presiones negativas|Esclusas|Tratamiento de efluentes"],
["Centro de I+D corporativo",4,"Investigación y desarrollo de una empresa con laboratorios y prototipos.","Innovación aplicada.","Prototipado|Confidencialidad|Colaboración"],
["Estación científica / biológica",2,"Base de investigación en campo con laboratorio, alojamiento y bodegas.","Investigación en el sitio natural.","Autonomía|Bajo impacto|Alojamiento","Ej.: Estación Científica Charles Darwin (Galápagos), Estación Yasuní.","campus"],
["Estación antártica / polar",3,"Base de investigación en clima extremo.","Clima extremo y aislamiento.","Aislamiento|Nieve|Autonomía","Ecuador tiene la Estación Pedro Vicente Maldonado en la Antártida.","modulo"],
["Acelerador de partículas / sincrotrón",5,"Instalación de gran escala para física de partículas.","Instrumento científico gigante.","Precisión|Blindaje|Escala","anillo"],
["Radiotelescopio",4,"Antena parabólica para observación de radio.","Observa ondas de radio.","Precisión|Cielo sin interferencias|Estructura","abierto"],
["Banco de semillas / germoplasma",2,"Bóveda de conservación de semillas a largo plazo, como la de Svalbard.","Conservación genética.","Temperatura|Seguridad|Resiliencia"]
]}
]});

TAX.push({c:"EFI", n:"Efímera, móvil y modular", f:"modulo",
d:"Arquitectura temporal, transportable o desmontable. Se diseña para montarse y desmontarse, viajar o responder a una emergencia.",
s:[
{n:"Temporal y móvil", f:"modulo", t:[
["Pabellón temporal",2,"Estructura experimental temporal para eventos, bienales o exposiciones.","Vida limitada.","Montaje|Reutilización|Impacto visual","pabellon"],
["Arquitectura inflable",2,"Estructura sostenida por aire para eventos o cubiertas temporales.","Presión de aire como estructura.","Ventiladores|Anclajes|Evacuación","cupula"],
["Arquitectura tensil / carpa",2,"Membrana tensada sobre mástiles para cubiertas temporales o permanentes.","Membrana en tensión.","Anclajes|Viento|Drenaje","pabellon"],
["Módulo contenedor comercial",1,"Local hecho con contenedores para comercio o cafeterías.","Contenedor reutilizado.","Aislamiento|Transporte|Instalaciones"],
["Food truck",1,"Vehículo adaptado como cocina móvil.","Móvil.","Normas sanitarias|Energía|Permisos"],
["Casa rodante / RV",1,"Vehículo habitable.","Vivienda-vehículo.","Autonomía|Peso|Almacenamiento"],
["Instalación artística",2,"Obra espacial temporal o permanente en espacio público o museo.","Arte que se recorre.","Seguridad|Montaje|Interacción","pabellon"],
["Escenografía",2,"Arquitectura para teatro, cine o eventos.","Solo para la escena.","Montaje|Transporte|Visual","pabellon"],
["Refugio de emergencia modular",1,"Unidad de refugio transportable para desastres.","Despliegue rápido.","Transporte|Montaje|Clima"]
]}
]});

TAX.push({c:"FUT", n:"Emergentes y del futuro", f:"torre",
d:"Tipologías nuevas, experimentales o en desarrollo, impulsadas por tecnología, cambio climático y nuevas formas de vivir. Algunas ya existen como prototipo; otras son propuestas.",
s:[
{n:"Nuevas formas de habitar", f:"torre", t:[
["Rascacielos de madera masiva",4,"Torre de madera contralaminada (CLT) o glulam con núcleos híbridos.","Madera como estructura principal en altura.","Resistencia al fuego|Normativa|Huella de carbono"],
["Edificio de energía positiva",3,"Edificio que produce más energía de la que consume.","Balance energético positivo.","Envolvente|Renovables|Monitoreo","bloque"],
["Edificio regenerativo",3,"Edificio que mejora el ambiente: capta carbono, purifica agua y crea hábitat.","Va más allá de la sostenibilidad.","Ciclos cerrados|Biodiversidad|Certificación","bloque"],
["Ciudad flotante",5,"Barrio modular sobre plataformas flotantes para adaptación al nivel del mar.","Urbanismo sobre el agua.","Anclaje|Servicios|Resiliencia","campus"],
["Hábitat submarino",2,"Estructura habitable bajo el agua para investigación o turismo.","Bajo el agua.","Presión|Aire|Acceso","cupula"],
["Hábitat lunar / marciano",2,"Asentamiento extraterrestre con regolito impreso, presurización y protección radiológica.","Fuera de la Tierra.","Presión|Radiación|Autonomía","cupula"],
["Hotel espacial",3,"Módulo orbital para turismo espacial.","En órbita.","Gravedad cero|Soporte de vida|Acoplamiento","modulo"],
["Edificio adaptable / reconvertible",3,"Edificio diseñado para cambiar de uso (oficina a vivienda) sin demolerse.","Diseño para el cambio.","Alturas y cargas generosas|Núcleos flexibles|Fachada","bloque"]
]},
{n:"Nueva infraestructura", f:"nave", t:[
["Hub de drones",2,"Base de drones de reparto con recarga y almacenaje.","Logística aérea autónoma.","Espacio aéreo|Recarga|Seguridad","bloque"],
["Torre de captura de carbono",3,"Estructura que filtra CO₂ del aire.","Infraestructura climática.","Energía|Almacenamiento de CO₂|Paisaje","mastil"],
["Centro logístico autónomo",4,"Almacén operado por robots sin iluminación ni personal permanente.","Sin personas en operación.","Robots|Energía|Seguridad"],
["Estación de intercambio de baterías",1,"Estación para cambiar baterías de vehículos eléctricos en minutos.","Cambio, no carga.","Automatización|Almacenamiento|Energía","pabellon"],
["Refugio climático",2,"Espacio público climatizado para olas de calor o eventos extremos.","Respuesta al cambio climático.","Climatización|Accesibilidad|Agua","pabellon"]
]}
]});
