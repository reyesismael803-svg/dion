/* Atlas Tipológico — datos 4: Religioso y funerario, Gobierno, Seguridad, Social y comunitario, Deporte y recreación, Espacio público, Eventos */
window.TAX = window.TAX || [];

TAX.push({c:"REL", n:"Religioso y funerario", f:"cupula",
d:"Espacios para el culto, la espiritualidad, la vida comunitaria de fe y la despedida de los muertos. Su forma responde a liturgias, orientaciones y símbolos de cada tradición.",
s:[
{n:"Culto cristiano", f:"cupula", t:[
["Capilla",2,"Pequeño espacio de oración, aislado o dentro de otro edificio (hospital, colegio, cementerio).","Escala menor y sin función parroquial.","Orientación y luz|Altar|Sacristía mínima","casa"],
["Iglesia parroquial",3,"Templo sede de una parroquia con nave, presbiterio, sacristía, despacho y salones pastorales.","Tiene comunidad territorial y servicios pastorales.","Nave y aforo|Campanario|Salones de catequesis"],
["Catedral",4,"Templo principal de una diócesis donde está la sede (cátedra) del obispo.","Sede episcopal; mayor escala y simbolismo.","Programa litúrgico completo|Patrimonio|Afluencia"],
["Basílica",4,"Templo con título honorífico otorgado por el Papa, por su importancia histórica o devocional.","Es un título; puede ser catedral o no.","Peregrinaciones|Patrimonio|Accesos","Ej.: Basílica del Voto Nacional (Quito)."],
["Santuario",4,"Templo de peregrinación ligado a una devoción o aparición, con explanadas y servicios.","Recibe peregrinos masivos.","Explanadas|Servicios para peregrinos|Estacionamiento","Ej.: Santuario de El Quinche, El Cisne."],
["Templo evangélico / megaiglesia",4,"Auditorio de culto con escenario, sonido, iluminación y salas para miles de personas.","Formato de auditorio, sin nave tradicional.","Aforo y evacuación|Sonido e iluminación|Estacionamiento","bloque"],
["Salón del Reino / templo de otras denominaciones",2,"Salón de reuniones de testigos de Jehová u otras congregaciones, sobrio y funcional.","Espacio de reunión sin iconografía.","Aforo|Acústica|Bajo costo","bloque"],
["Monasterio / convento",4,"Conjunto donde vive una comunidad religiosa con claustro, iglesia, celdas y huerta.","Combina vivienda comunitaria y culto.","Claustro|Clausura|Autosuficiencia","campus"],
["Seminario",4,"Centro de formación de sacerdotes con aulas, residencia y capilla.","Educación más vida religiosa.","Residencia|Aulas|Capilla","campus"],
["Casa de retiros",3,"Alojamiento y espacios de oración para retiros espirituales.","Hospedaje con fines espirituales.","Silencio|Naturaleza|Habitaciones","campus"]
]},
{n:"Otras tradiciones", f:"cupula", t:[
["Sinagoga",3,"Templo judío con arca (Torá), bimá y áreas de estudio.","Orientación hacia Jerusalén.","Arca y bimá|Mikve si aplica|Seguridad"],
["Mezquita",3,"Templo islámico orientado a La Meca (quibla) con sala de oración, mihrab, minarete y abluciones.","Espacio de oración sin bancas y orientado.","Quibla|Abluciones|Separación por género"],
["Templo budista",3,"Espacio de meditación con salón de Buda, jardines y a veces monasterio.","Meditación y contemplación.","Salas de meditación|Jardines|Calzado"],
["Templo hindú",3,"Templo con santuario (garbhagriha), torre (shikhara) y circunvalación.","Recorrido ritual de circunvalación.","Orientación|Recorrido|Iconografía"],
["Gurdwara",3,"Templo sij con sala de oración y cocina comunitaria (langar) abierta a todos.","La cocina comunitaria es central.","Cocina de volumen|Comedor|Accesos"],
["Templo mormón",3,"Templo de la Iglesia de Jesucristo de los Santos de los Últimos Días con salas de ordenanzas.","Acceso restringido a miembros.","Salas rituales|Jardines|Simbolismo","Hay templos en Guayaquil y Quito."],
["Espacio interreligioso / sala de meditación",1,"Espacio neutral de recogimiento en aeropuertos, hospitales o universidades.","Sin símbolos de una fe específica.","Neutralidad|Luz|Silencio","modulo"],
["Huaca / espacio ceremonial andino",2,"Lugar sagrado de tradición andina para rituales (Inti Raymi, ofrendas), a menudo al aire libre.","Espacio natural o arqueológico, no templo cerrado.","Respeto a la comunidad|Orientación solar|Mínima intervención","Presente en la cosmovisión kichwa; ej.: celebraciones del Inti Raymi en Imbabura.","abierto"]
]},
{n:"Funerario", f:"bloque", t:[
["Sala de velación / funeraria",2,"Salas para velorios con cafetería, oficinas y áreas de preparación del cuerpo.","Acompaña el duelo antes del entierro o cremación.","Privacidad entre salas|Estacionamiento|Área técnica oculta"],
["Crematorio",2,"Edificio con hornos crematorios, sala de despedida y entrega de cenizas.","Instalación técnica con ceremonia.","Emisiones y chimenea|Sala de despedida|Flujos discretos"],
["Cementerio tradicional",4,"Terreno con tumbas, mausoleos y nichos organizado en calles.","Enterramiento en tierra y mausoleos.","Suelo y nivel freático|Trazado|Capacidad","abierto"],
["Cementerio parque / jardín",5,"Cementerio con lápidas al ras del césped en un paisaje de parque.","Predomina el paisaje sobre la construcción.","Paisajismo|Riego|Accesos","abierto"],
["Cementerio vertical",4,"Edificio de varios pisos con nichos y bóvedas para ciudades con poco suelo.","Densifica el enterramiento.","Estructura|Ventilación|Circulación vertical"],
["Columbario / osario",2,"Estructura de nichos para urnas con cenizas o restos óseos.","Solo urnas y restos; pequeña escala.","Nichos|Iluminación|Ceremonia"],
["Mausoleo / panteón familiar",1,"Construcción funeraria para una familia o personaje.","Una familia o persona.","Simbolismo|Materiales duraderos|Ventilación","casa"],
["Bosque funerario / entierro natural",4,"Espacio natural donde se entierran urnas biodegradables junto a árboles.","Sin construcciones; el árbol es el memorial.","Suelo|Registro de ubicaciones|Accesibilidad","abierto"]
]}
]});

TAX.push({c:"GOB", n:"Gobierno e institucional", f:"bloque",
d:"Sedes de los poderes del Estado y de las instituciones públicas. Representan autoridad y deben ser accesibles al ciudadano, seguras y eficientes.",
s:[
{n:"Poderes del Estado", f:"bloque", t:[
["Palacio presidencial / de gobierno",4,"Sede del poder ejecutivo con despachos, salones protocolares, residencia y seguridad.","Protocolo y seguridad máximos.","Salones de Estado|Seguridad|Patrimonio","El Palacio de Carondelet (Quito) es la sede del gobierno ecuatoriano."],
["Parlamento / asamblea legislativa",4,"Sede del poder legislativo con hemiciclo, salas de comisiones, despachos y acceso ciudadano.","El hemiciclo es el corazón del edificio.","Hemiciclo|Galerías de público|Prensa","Sede de la Asamblea Nacional del Ecuador en Quito."],
["Palacio de justicia / corte",4,"Sede judicial con salas de audiencia, despachos de jueces, archivo y celdas de tránsito.","Tres circulaciones separadas: público, jueces y detenidos.","Circulaciones separadas|Seguridad|Salas de audiencia","Complejos judiciales del Consejo de la Judicatura."],
["Juzgado / unidad judicial",3,"Edificio de juzgados de un cantón con salas de audiencias y atención ciudadana.","Menor escala que el palacio de justicia.","Salas de audiencia|Atención|Seguridad"],
["Fiscalía",3,"Oficinas del ministerio público con salas de entrevista, custodia de evidencias y atención a víctimas.","Investigación y atención a víctimas.","Cámara Gesell|Custodia de evidencias|Privacidad"],
["Ministerio / edificio de gobierno",4,"Sede administrativa de un ministerio con oficinas, atención al público y salas.","Oficina pública de gran escala.","Atención al público|Seguridad|Accesibilidad","torre"],
["Plataforma gubernamental",5,"Edificio que concentra varios ministerios y servicios en un solo lugar.","Agrupa instituciones para eficiencia.","Flujos masivos|Estacionamiento|Servicios comunes","Ecuador construyó plataformas gubernamentales en Quito (norte y sur) y Guayaquil."]
]},
{n:"Gobierno local", f:"bloque", t:[
["Palacio municipal / alcaldía",4,"Sede del gobierno local con despacho del alcalde, concejo, atención ciudadana y oficinas técnicas.","Autoridad local y cercanía ciudadana.","Sala de concejo|Atención|Espacio público frontal","En Ecuador son los GAD municipales o metropolitanos."],
["Prefectura / gobernación",4,"Sede del gobierno provincial o representación del ejecutivo.","Nivel provincial.","Oficinas|Salas|Protocolo","En Ecuador: prefecturas (GAD provinciales) y gobernaciones (representación del ejecutivo)."],
["Junta parroquial",2,"Sede del gobierno parroquial rural con sala de sesiones, oficinas y salón comunal.","Nivel más local de gobierno.","Salón comunal|Oficinas|Bajo costo","GAD parroquial rural en Ecuador.","casa"],
["Centro de atención ciudadana",3,"Oficina de trámites unificados con ventanillas, turnos y espera.","Servicio de trámites de varias instituciones.","Gestión de filas|Accesibilidad|Señalética"],
["Registro civil",2,"Oficina de identificación, nacimientos, matrimonios y defunciones con sala de ceremonias.","Incluye una sala de matrimonios.","Sala de ceremonias|Ventanillas|Archivo"],
["Notaría",2,"Oficina de fe pública con despacho, archivo y atención.","Archivo protocolar y confidencialidad.","Archivo|Privacidad|Atención"]
]},
{n:"Relaciones exteriores y finanzas públicas", f:"bloque", t:[
["Embajada",3,"Sede diplomática con cancillería, sección consular, residencia y alta seguridad.","Territorio del país representado.","Retiros de seguridad|Control de accesos|Residencia"],
["Consulado",2,"Oficina de servicios a ciudadanos en el extranjero (pasaportes, visas).","Servicio consular sin residencia diplomática.","Atención|Seguridad|Espera"],
["Sede de organismo internacional",4,"Oficinas de ONU, OEA, bancos multilaterales u otras organizaciones.","Protocolos internacionales.","Salas de conferencias|Traducción|Seguridad"],
["Banco central",4,"Sede de la autoridad monetaria con bóvedas, oficinas y museo.","Bóvedas y máxima seguridad.","Bóvedas|Seguridad|Museo numismático"],
["Casa de moneda",3,"Planta de acuñación o impresión de valores.","Industria de alta seguridad.","Seguridad|Maquinaria|Bóvedas","nave"],
["Oficina tributaria / aduana",3,"Oficinas de recaudación de impuestos o control aduanero.","Control y atención de contribuyentes.","Atención|Archivo|Seguridad","El SRI y el SENAE en Ecuador."],
["Oficina de correos",2,"Oficina de envíos postales con mostrador, clasificación y casilleros.","Logística postal.","Clasificación|Casilleros|Carga"],
["Archivo nacional",4,"Edificio para custodia de documentos del Estado.","Depósitos de largo plazo.","Control ambiental|Seguridad|Consulta"]
]}
]});

TAX.push({c:"SEG", n:"Seguridad y emergencia", f:"bloque",
d:"Edificaciones para proteger, vigilar, responder a emergencias, defender y administrar la privación de libertad. Deben funcionar incluso durante desastres (edificaciones esenciales).",
s:[
{n:"Policía y respuesta", f:"bloque", t:[
["Unidad de policía comunitaria (UPC)",2,"Pequeña estación barrial con atención ciudadana, oficina y dormitorio de guardia.","Escala barrial y cercanía.","Visibilidad|Atención|Dormitorio de guardia","Modelo UPC de la Policía Nacional del Ecuador."],
["Estación / comando de policía",3,"Sede policial con oficinas, armería, celdas de paso, garaje y dormitorios.","Mayor escala; incluye celdas y armería.","Armería|Celdas|Flota de vehículos"],
["Estación de bomberos",3,"Edificio con garaje de autobombas, dormitorios, torre de entrenamiento y tubo de descenso.","Respuesta en segundos: diseño para salir rápido.","Salida directa a la vía|Torre de secado de mangueras|Dormitorios","Edificación esencial según la NEC."],
["Centro integrado de emergencias",4,"Centro de atención de llamadas y coordinación de policía, bomberos, salud y tránsito.","Coordina, no despliega directamente.","Sala de monitoreo|Redundancia|Seguridad","En Ecuador, el Servicio Integrado de Seguridad ECU 911."],
["Centro de operaciones de emergencia (COE)",3,"Sala de crisis y coordinación ante desastres.","Toma de decisiones en crisis.","Redundancia energética|Comunicaciones|Resistencia sísmica"],
["Base de ambulancias / SAMU",2,"Base para ambulancias y personal de atención prehospitalaria.","Salida rápida de vehículos médicos.","Garaje|Desinfección|Descanso"],
["Puesto de salvavidas / torre de vigilancia",1,"Torre o caseta de vigilancia en playas o piscinas.","Visual elevada.","Altura|Visual|Primeros auxilios","mastil"]
]},
{n:"Defensa", f:"campus", t:[
["Base / cuartel militar",5,"Instalación de fuerzas armadas con comandancia, dormitorios, armerías, talleres y campos.","Recinto autosuficiente y restringido.","Perímetro|Autosuficiencia|Campos","campus"],
["Base naval / guardacostas",4,"Instalación naval con muelles, talleres y oficinas.","Frente de agua y embarcaciones.","Muelles|Talleres|Seguridad","lineal"],
["Base aérea",5,"Aeródromo militar con pistas, hangares y torres.","Pistas y hangares militares.","Pistas|Hangares|Seguridad","abierto"],
["Puesto fronterizo / centro binacional",3,"Control migratorio, aduanero y sanitario en fronteras.","Varios organismos en un punto de control.","Carriles de control|Oficinas|Revisión de carga","En Ecuador: CEBAF (Centro Binacional de Atención en Frontera) en Huaquillas y San Miguel."],
["Búnker / refugio antiaéreo",3,"Refugio subterráneo reforzado para protección civil o militar.","Protección extrema y autonomía.","Estructura reforzada|Ventilación filtrada|Autonomía"]
]},
{n:"Privación de libertad", f:"campus", t:[
["Centro de detención provisional",3,"Instalación para personas en espera de juicio.","Estancia corta y previa a sentencia.","Seguridad|Visitas|Separación"],
["Centro de privación de libertad / cárcel",5,"Complejo penitenciario con pabellones, talleres, educación, salud, visitas y seguridad perimetral.","Estancias largas con rehabilitación.","Clasificación por niveles|Rehabilitación|Seguridad perimetral","En Ecuador se denominan Centros de Privación de Libertad (CPL), administrados por el SNAI."],
["Centro de adolescentes infractores",3,"Centro socioeducativo para menores en conflicto con la ley, con aulas y talleres.","Enfoque educativo y no punitivo.","Escala pequeña|Educación|Espacios verdes"]
]}
]});

TAX.push({c:"SOC", n:"Social y comunitario", f:"bloque",
d:"Equipamientos para el encuentro, la asistencia social y la organización de la comunidad. Suelen ser de gestión pública, comunitaria o sin fines de lucro.",
s:[
{n:"Comunitario", f:"bloque", t:[
["Casa comunal",2,"Salón de reuniones de un barrio o comuna, con cocina y baños.","Gestionada por la comunidad.","Salón multiuso|Cocina|Bajo costo","Muy común en barrios y comunas de Ecuador.","casa"],
["Centro comunitario",3,"Edificio con salones, talleres, biblioteca y servicios para el barrio.","Más programa que la casa comunal.","Flexibilidad|Horarios|Seguridad"],
["Centro juvenil",2,"Espacio para jóvenes con talleres, deportes, música y apoyo.","Usuario joven.","Actividades|Ruido|Seguridad"],
["Club social",3,"Sede de un club con salones, restaurante, piscina y actividades para socios.","Acceso para socios.","Salones|Deportes|Estacionamiento"],
["Sede gremial / sindical / colegio profesional",3,"Oficinas y salones de una asociación, sindicato o colegio profesional.","Gestión y reuniones de un gremio.","Auditorio|Oficinas|Biblioteca","Ej.: Colegio de Arquitectos del Ecuador (CAE) y sus núcleos provinciales."],
["Logia / sede fraternal",2,"Sede de una organización fraternal con templo y salones.","Programa ritual propio.","Privacidad|Simbolismo|Salones"],
["Sede de ONG / fundación",2,"Oficinas y espacios de atención de una organización social.","Mezcla oficina y atención comunitaria.","Atención|Oficinas|Bajo costo"]
]},
{n:"Asistencia social", f:"bloque", t:[
["Centro gerontológico de día",2,"Centro donde adultos mayores pasan el día con terapias, alimentación y recreación, y vuelven a casa.","No hay alojamiento nocturno.","Accesibilidad|Terapias|Comedor","Modalidad del MIES en Ecuador."],
["Centro para personas con discapacidad",3,"Centro de terapias, formación y cuidado diurno.","Terapias y accesibilidad total.","Accesibilidad universal|Terapias|Transporte"],
["Casa de acogida",2,"Refugio confidencial para mujeres y niños víctimas de violencia.","Confidencialidad y protección.","Ubicación reservada|Seguridad|Atención psicológica","casa"],
["Albergue para personas sin hogar",3,"Alojamiento nocturno, alimentación, higiene y orientación.","Rotación diaria.","Duchas y lavandería|Guardarropa|Atención"],
["Banco de alimentos",3,"Bodega que recibe, clasifica y distribuye alimentos donados.","Logística de alimentos.","Cadena de frío|Carga|Clasificación","nave"],
["Centro de atención a migrantes y refugiados",3,"Espacio de acogida, orientación legal y servicios básicos.","Atención integral a población en movilidad.","Alojamiento temporal|Orientación|Salud"]
]}
]});

TAX.push({c:"DEP", n:"Deporte y recreación", f:"anillo",
d:"Instalaciones para la práctica y el espectáculo deportivo, el ejercicio y el entretenimiento activo. Van desde el gimnasio de barrio hasta el estadio olímpico y el parque temático.",
s:[
{n:"Grandes recintos", f:"anillo", t:[
["Estadio de fútbol",5,"Recinto con cancha reglamentaria y graderías para miles de espectadores, palcos, camerinos y prensa.","Una sola disciplina principal.","Evacuación masiva|Visuales|Normas FIFA","Ej.: Estadio Rodrigo Paz Delgado, Monumental de Guayaquil."],
["Estadio olímpico / atlético",5,"Estadio con pista atlética alrededor de la cancha.","La pista aleja al público del campo.","Pista y saltos|Graderías|Calentamiento"],
["Coliseo / arena multiuso",4,"Recinto cubierto para básquet, vóley, conciertos y eventos.","Cubierto y versátil.","Gran luz de cubierta|Acústica|Montaje rápido","En Ecuador el coliseo es la sala multiuso por excelencia."],
["Velódromo",4,"Pista de ciclismo peraltada con graderías.","Pista inclinada específica.","Peralte|Cubierta o abierta|Graderías"],
["Hipódromo",5,"Pista ecuestre para carreras con tribunas y caballerizas.","Caballos y apuestas.","Pista|Caballerizas|Tribunas","abierto"],
["Autódromo",5,"Circuito de carreras con boxes, tribunas y seguridad.","Motor y alta velocidad.","Escapatorias|Boxes|Ruido","abierto"],
["Plaza de toros",4,"Ruedo circular con graderías y corrales.","Circular por su espectáculo.","Ruedo|Corrales|Graderías","En Quito las corridas con muerte del animal están prohibidas desde la consulta de 2011."]
]},
{n:"Instalaciones deportivas", f:"nave", t:[
["Polideportivo",4,"Complejo con canchas cubiertas y descubiertas, piscina y gimnasio.","Varias disciplinas en un recinto.","Canchas múltiples|Vestidores|Estacionamiento","campus"],
["Complejo acuático / piscina olímpica",4,"Piscina reglamentaria de 50 m, fosa de clavados y graderías.","Agua y climatización son dominantes.","Tratamiento de agua|Deshumidificación|Graderías"],
["Gimnasio / fitness center",2,"Espacio con máquinas, pesas, salas de clases y vestidores.","Ejercicio individual y clases.","Cargas de piso|Ventilación|Vestidores","bloque"],
["Box de CrossFit / estudio funcional",2,"Nave con equipamiento funcional y pisos de impacto.","Entrenamiento de alta intensidad en nave abierta.","Piso de impacto|Ruido|Altura"],
["Estudio de yoga / pilates",1,"Sala tranquila con piso de madera, equipamiento de pilates y vestidores.","Pequeña escala y calma.","Acústica|Temperatura|Luz","bloque"],
["Club deportivo / country club",4,"Club con canchas, piscina, club house y actividades familiares.","Recreación social para socios.","Plan maestro|Club house|Deportes","campus"],
["Club de golf",5,"Campo de 9 o 18 hoyos con club house, driving range y mantenimiento.","Gran consumo de suelo y agua.","Riego|Paisaje|Club house","abierto"],
["Club de tenis / pádel",3,"Canchas de tenis o pádel con club house.","Canchas específicas.","Orientación de canchas|Iluminación|Vestidores","abierto"],
["Cancha sintética",2,"Cancha de fútbol 5 o 7 con césped artificial e iluminación, en alquiler por horas.","Negocio por horas y de barrio.","Drenaje|Iluminación|Mallas","abierto"],
["Cancha de ecuavóley",1,"Cancha de vóley ecuatoriano (red alta, tres jugadores) en barrios y parques.","Reglas y medidas propias de Ecuador.","Red a 2,85 m|Iluminación|Gradas","Deporte popular propio del Ecuador.","abierto"],
["Skatepark",2,"Parque con rampas, bowls y obstáculos de concreto para skate, BMX y patines.","Superficie esculpida para deportes urbanos.","Concreto pulido|Diseño de flujo|Sombra","abierto"],
["Rocódromo / centro de escalada",3,"Muros de escalada interior o exterior con zonas de bloque y cuerda.","Altura y anclajes estructurales.","Altura libre|Colchonetas|Anclajes"],
["Pista de hielo",3,"Pista de patinaje con sistema de refrigeración y graderías.","Refrigeración y humedad.","Refrigeración|Aislamiento|Deshumidificación"],
["Centro de alto rendimiento",4,"Complejo de entrenamiento de élite con residencias, medicina deportiva y laboratorio.","Atletas de élite en residencia.","Residencias|Medicina deportiva|Altura","En Ecuador existen centros de alto rendimiento como el de Carpuela (Imbabura).","campus"],
["Villa olímpica",5,"Barrio de vivienda para atletas durante unos juegos, reconvertido después en vivienda.","Diseñada para un evento y un uso posterior.","Legado posterior|Densidad|Servicios","campus"],
["Campo de tiro",3,"Polígono con líneas de tiro, blindajes y seguridad.","Seguridad balística.","Blindajes|Ruido|Control de armas","lineal"],
["Centro ecuestre",4,"Picaderos, caballerizas, pistas de salto y veterinaria.","Caballos y cuidados.","Caballerizas|Picadero cubierto|Estiércol","campus"],
["Marina / club náutico",4,"Muelles, amarres, rampa, varadero y club para embarcaciones deportivas.","Frente de agua para embarcaciones de recreo.","Muelles flotantes|Mareas|Combustible","lineal"],
["Estación de esquí",5,"Pistas, remontes, alquiler, escuela y alojamiento en montaña nevada.","Depende de la nieve y la pendiente.","Remontes|Nieve artificial|Hospedaje","abierto"],
["Bolera",3,"Pistas de bolos con máquinas, bar y juegos.","Pistas largas de medida fija.","Largo de pistas|Maquinaria|Bar"]
]},
{n:"Entretenimiento activo", f:"abierto", t:[
["Parque de diversiones",5,"Recinto con atracciones mecánicas, juegos y comida.","Atracciones mecánicas como protagonistas.","Seguridad de juegos|Filas|Aforo"],
["Parque temático",5,"Parque inmersivo basado en historias o temas, con atracciones, shows y hoteles.","Toda la experiencia está tematizada.","Narrativa|Operación oculta|Hoteles"],
["Parque acuático",5,"Toboganes, piscinas de olas y ríos lentos.","Todo gira en torno al agua.","Tratamiento de agua|Sombra|Vestidores"],
["Centro de entretenimiento familiar",3,"Edificio con juegos, trampolines, laser tag y cumpleaños.","Bajo techo y en centros comerciales.","Seguridad|Salas de fiestas|Ruido","bloque"],
["Escape room",1,"Salas tematizadas de acertijos cronometrados.","Salas pequeñas escenográficas.","Evacuación de emergencia|Escenografía|Cámaras","bloque"],
["Arena de e-sports / gaming",3,"Sala con escenario, puestos de juego, pantallas y transmisión.","Competencia digital con público.","Conectividad|Pantallas|Climatización","bloque"],
["Kartódromo",3,"Pista de karts con boxes y tribunas.","Motor a pequeña escala.","Seguridad|Ruido|Escapatorias"],
["Canopy / parque de aventura",2,"Tirolinas, puentes y circuitos en altura en entorno natural.","Actividades en altura en naturaleza.","Anclajes|Seguridad|Impacto","En Ecuador es popular en Baños y Mindo."]
]}
]});

TAX.push({c:"PUB", n:"Espacio público y paisaje", f:"abierto",
d:"Espacios abiertos de uso colectivo y el pequeño equipamiento que los acompaña. Estructuran la ciudad y son tan diseñables como un edificio.",
s:[
{n:"Plazas y parques", f:"abierto", t:[
["Plaza",3,"Espacio abierto pavimentado para el encuentro, rodeado de edificios y actividades.","Predomina lo duro sobre lo verde.","Sombra y bancas|Actividades en bordes|Drenaje","La plaza grande o plaza de armas es el centro fundacional de las ciudades ecuatorianas."],
["Parque de bolsillo",1,"Pequeño parque en un lote residual con bancas, vegetación y juegos.","Escala mínima.","Seguridad|Mantenimiento|Uso vecinal"],
["Parque barrial",2,"Parque con juegos, canchas y áreas verdes para un barrio.","Escala vecinal.","Juegos por edad|Iluminación|Cancha"],
["Parque urbano / metropolitano",5,"Gran parque con bosques, lagunas, senderos, deportes y equipamiento.","Escala de ciudad.","Ecología|Accesos|Seguridad","Ej.: Parque Metropolitano Guangüiltagua, La Carolina, Parque Samanes."],
["Parque lineal",4,"Parque alargado junto a ríos, quebradas o vías férreas antiguas.","Forma de corredor.","Conectividad|Ciclovía|Riesgo de inundación","lineal"],
["Malecón",4,"Paseo frente al mar o río con áreas de estar, comercio y miradores.","Borde de agua urbano.","Mareas|Sombra|Comercio","Muy característico de la Costa ecuatoriana: Guayaquil, Salinas, Manta."],
["Bulevar / paseo peatonal",3,"Calle con prioridad peatonal, arbolado y mobiliario.","Es una calle transformada.","Accesibilidad|Arbolado|Comercio"],
["Parque infantil",1,"Área de juegos para niños con pisos de seguridad.","Solo juego infantil.","Normas de juegos|Pisos amortiguantes|Sombra"],
["Parque canino",1,"Área cercada para perros con agua y bancas.","Usuario perros.","Cerramiento|Limpieza|Agua"],
["Huerto urbano",1,"Parcelas de cultivo comunitario en la ciudad.","Producción de alimento en la ciudad.","Agua|Suelo|Gestión comunitaria","Quito tiene el programa AGRUPAR de agricultura urbana."],
["Jardín / jardín temático",2,"Espacio verde diseñado con fines contemplativos.","Contemplación sobre actividad.","Especies|Riego|Recorrido"],
["Playa urbana",3,"Frente de playa acondicionado con servicios.","Borde natural urbano.","Duchas y baños|Salvavidas|Accesibilidad"]
]},
{n:"Pequeño equipamiento urbano", f:"modulo", t:[
["Parada de bus",1,"Refugio con cubierta, asientos e información.","Mínimo, pero repetido en toda la ciudad.","Sombra y lluvia|Información|Accesibilidad","pabellon"],
["Baterías sanitarias públicas",1,"Baños públicos en parques, plazas o terminales.","Uso intensivo y vandalismo.","Materiales resistentes|Limpieza|Accesibilidad"],
["Kiosco público / quiosco de música",1,"Glorieta en parques para música o reuniones.","Pabellón abierto simbólico.","Cubierta|Visual|Acústica","pabellon"],
["Pérgola / cubierta urbana",1,"Estructura ligera de sombra.","Solo sombra.","Estructura|Vegetación|Viento","pabellon"],
["Techo verde / jardín vertical",2,"Cubierta o muro vegetado con sustrato y riego.","Es una capa del edificio.","Cargas|Impermeabilización|Riego","abierto"],
["Puente peatonal",2,"Paso elevado o sobre ríos para peatones y ciclistas.","Solo peatones y ciclistas.","Rampas|Luz|Seguridad","lineal"],
["Ciclovía y biciparqueadero",1,"Infraestructura para bicicletas: carriles, estacionamientos y estaciones de alquiler.","Movilidad activa.","Seguridad|Continuidad|Sombra","lineal"]
]}
]});

TAX.push({c:"EVE", n:"Eventos, ferias y convenciones", f:"nave",
d:"Recintos para reuniones masivas, ferias comerciales, congresos y celebraciones. Requieren gran flexibilidad, accesos masivos y logística de montaje.",
s:[
{n:"Recintos", f:"nave", t:[
["Centro de convenciones",5,"Edificio con salas plenarias divisibles, salones de reunión, foyers, cocina y áreas de exposición.","Congresos con salas simultáneas.","Divisibilidad|Carga y montaje|Traducción simultánea","Ej.: Centro de Convenciones Metropolitano de Quito, Centro de Convenciones de Guayaquil."],
["Centro de exposiciones / feria",5,"Naves de gran luz para ferias comerciales con accesos de carga.","Grandes naves libres para stands.","Luces estructurales|Carga|Servicios en piso"],
["Salón de recepciones",3,"Salón para bodas y eventos sociales.","Eventos privados.","Cocina|Estacionamiento|Acústica","bloque"],
["Hacienda para eventos",3,"Hacienda con jardines, capilla y salones para bodas.","Paisaje y patrimonio como atractivo.","Jardines|Carpas|Estacionamiento","Muy popular en los valles de Quito y en Cuenca.","campus"],
["Pabellón de exposición universal",4,"Edificio nacional temporal para una Expo mundial.","Temporal y experimental.","Desmontaje|Identidad nacional|Flujos","pabellon"],
["Escenario de festival",3,"Estructura temporal para conciertos masivos al aire libre.","Temporal y técnica.","Cargas|Viento|Evacuación","pabellon"],
["Carpa / circo",3,"Estructura tensada desmontable para espectáculos itinerantes.","Itinerante.","Anclajes|Viento|Montaje","cupula"],
["Stand ferial",1,"Espacio de exhibición temporal de una marca en una feria.","Micro arquitectura efímera.","Montaje en horas|Marca|Iluminación","modulo"]
]}
]});
