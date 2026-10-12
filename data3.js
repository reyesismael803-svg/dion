/* Atlas Tipológico — datos 3: Salud, Educación, Cultura */
window.TAX = window.TAX || [];

TAX.push({c:"SAL", n:"Salud", f:"bloque",
d:"Establecimientos para prevenir, diagnosticar, tratar y rehabilitar. Se ordenan por nivel de atención (complejidad) y especialidad; cada país los tipifica en su normativa sanitaria.",
s:[
{n:"Primer nivel de atención", f:"bloque", t:[
["Puesto de salud",1,"Unidad mínima en zonas rurales con atención de enfermería, promoción y prevención.","Es el establecimiento más básico, sin médico permanente.","Sala de atención y espera|Botiquín|Vivienda del personal si es remoto","Tipología del MSP para zonas rurales dispersas (Acuerdo Ministerial 5212 de tipología de establecimientos).","casa"],
["Consultorio médico general",1,"Espacio de consulta con camilla, escritorio, lavamanos y sala de espera.","Un solo profesional; no hay servicios de apoyo.","Lavamanos clínico|Privacidad|Accesibilidad","casa"],
["Consultorio odontológico",1,"Consulta dental con sillón, compresor, esterilización y rayos X intraoral.","Equipamiento dental con instalaciones de aire, agua y succión.","Compresor y succión aislados|Esterilización|Protección radiológica","casa"],
["Centro de salud tipo A / B / C",2,"Establecimiento de primer nivel del MSP: A atiende hasta ~10.000 personas; B y C añaden laboratorio, imágenes, odontología y, en el C, maternidad de corta estancia y emergencia.","El tipo lo define la población atendida y los servicios.","Población de referencia|Cartera de servicios|Flujos de pacientes","Tipología oficial del MSP Ecuador para el primer nivel."],
["Dispensario / subcentro",2,"Unidad de atención básica ligada a una institución (seguro social campesino, iglesia, empresa).","Atiende a una población institucional específica.","Consultorios|Farmacia básica|Espera","En Ecuador existen dispensarios del IESS y del Seguro Social Campesino."],
["Centro médico / policlínico",2,"Edificio con varios consultorios de especialidades, laboratorio y a veces imágenes, sin hospitalización.","Varias especialidades sin camas de internación.","Circulación de pacientes|Consultorios modulares|Apoyo diagnóstico"],
["Laboratorio clínico",2,"Local de toma de muestras y análisis con áreas técnicas separadas.","Área técnica con bioseguridad.","Toma de muestras|Bioseguridad|Gases y agua destilada"],
["Centro de imágenes",2,"Centro de diagnóstico por imagen: rayos X, ecografía, tomografía, resonancia.","Blindaje radiológico y magnético.","Blindaje de plomo|Jaula de Faraday para RM|Cargas de equipos"],
["Centro de vacunación",1,"Espacio para inmunización con cadena de frío y observación posvacunación.","Alto flujo y cadena de frío.","Refrigeración|Espera y observación|Flujo unidireccional"],
["Centro de fisioterapia y rehabilitación",2,"Espacio con gimnasio terapéutico, cubículos, hidroterapia y terapia ocupacional.","El espacio de movimiento es protagonista.","Accesibilidad total|Piscina terapéutica|Pisos"],
["Centro de diálisis",2,"Unidad de hemodiálisis con sillones, planta de tratamiento de agua y aislados.","La planta de agua es crítica.","Planta de ósmosis|Sillones por turno|Aislamiento"],
["Banco de sangre",2,"Centro de donación, procesamiento y almacenamiento de hemocomponentes.","Donación y almacenamiento en frío.","Salas de donación|Cadena de frío|Laboratorio"]
]},
{n:"Segundo nivel", f:"bloque", t:[
["Clínica",3,"Establecimiento privado con consultas, hospitalización limitada, quirófanos y apoyo diagnóstico.","Menor escala que un hospital general; generalmente privada.","Quirófanos y esterilización|Hospitalización|Emergencia"],
["Hospital del día / cirugía ambulatoria",3,"Centro para cirugías y tratamientos donde el paciente regresa a casa el mismo día.","No hay hospitalización prolongada.","Recuperación|Quirófanos|Flujos rápidos","El MSP lo contempla como 'hospital del día'."],
["Hospital básico",3,"Hospital de 15–70 camas con medicina interna, cirugía, pediatría, ginecología y emergencia.","Primer hospital de referencia en el territorio.","Emergencia|Centro obstétrico|Hospitalización","Tipología MSP para cabeceras cantonales."],
["Hospital general",4,"Hospital de más camas con especialidades, cuidados intensivos, quirófanos e imágenes.","Especialidades y UCI que el básico no tiene.","Zonificación por servicios|Circulaciones limpias y sucias|UCI"],
["Maternidad / hospital gineco-obstétrico",4,"Hospital especializado en embarazo, parto y neonatología.","Centrado en madre y recién nacido.","Salas de parto|Neonatología|Alojamiento conjunto"],
["Centro pediátrico",3,"Establecimiento de atención infantil: consultas, vacunación, emergencia pediátrica y a veces hospitalización corta.","Todo el diseño se adapta al niño y su acompañante: escala, color, juego.","Espacios lúdicos y de espera familiar|Separar niños sanos de enfermos|Seguridad infantil"],
["Hospital pediátrico",4,"Hospital completo para niños y adolescentes con especialidades, UCI pediátrica y alojamiento de padres.","Mayor complejidad que el centro pediátrico; incluye cirugía y cuidado crítico.","Alojamiento de padres|Humanización del ambiente|Aulas hospitalarias","Referente: Hospital Pediátrico Baca Ortiz (Quito)."],
["Centro de salud mental",3,"Establecimiento de psiquiatría y psicología ambulatoria y de hospitalización breve.","Diseño antisuicidio y ambientes calmos.","Herrajes seguros|Jardines terapéuticos|Supervisión discreta"],
["Centro de tratamiento de adicciones",3,"Centro residencial o ambulatorio para desintoxicación y rehabilitación.","Estancias largas con terapia grupal.","Habitaciones y comunidad|Seguridad|Áreas deportivas","En Ecuador los CETAD son regulados y licenciados por el MSP."],
["Clínica estética / cirugía plástica",3,"Clínica de procedimientos estéticos con quirófanos y recuperación de alto confort.","Imagen de lujo y privacidad.","Privacidad de pacientes|Quirófanos|Recuperación"]
]},
{n:"Tercer y cuarto nivel", f:"torre", t:[
["Hospital de especialidades",5,"Hospital de alta complejidad con todas las especialidades, trasplantes y cuidados críticos.","Referencia nacional o regional.","Helipuerto|Redundancia de sistemas|Plan maestro de crecimiento","Ej.: Hospital de Especialidades Eugenio Espejo, Carlos Andrade Marín (IESS)."],
["Hospital universitario",5,"Hospital que integra asistencia, docencia e investigación.","Suma aulas, laboratorios y residencias médicas.","Aulas y simulación|Investigación|Residencias"],
["Instituto oncológico",4,"Centro especializado en cáncer: radioterapia, quimioterapia, cirugía y cuidados paliativos.","Búnkers de radioterapia y medicina nuclear.","Búnker de acelerador lineal|Quimioterapia ambulatoria|Humanización","Ej.: SOLCA en Quito, Guayaquil y Cuenca."],
["Centro cardiovascular",4,"Hospital o unidad para cirugía cardíaca, hemodinamia y rehabilitación cardíaca.","Salas de hemodinamia y quirófanos híbridos.","Hemodinamia|UCI coronaria|Rehabilitación"],
["Centro de trauma / quemados",4,"Unidad de atención a politraumatizados y quemados graves.","Acceso inmediato desde ambulancias y helipuerto.","Recepción de trauma|Aislamiento de quemados|Helipuerto"],
["Ciudad hospitalaria / campus médico",5,"Conjunto de hospitales, institutos, investigación y servicios en un gran predio.","Varios hospitales especializados agrupados.","Movilidad interna|Energía centralizada|Crecimiento","campus"]
]},
{n:"Especiales y complementarios", f:"bloque", t:[
["Hospicio / cuidados paliativos",2,"Centro para personas en etapa terminal con enfoque en confort, familia y dignidad.","Prioriza bienestar y no curación.","Ambiente doméstico|Espacios para la familia|Jardines","casa"],
["Hospital de campaña / modular",3,"Hospital temporal y desplegable para emergencias, conflictos o pandemias.","Se instala en días.","Transportabilidad|Aislamientos|Energía autónoma","modulo"],
["Hospital flotante / barco hospital",3,"Buque con quirófanos y consultas que atiende poblaciones costeras o ribereñas.","Opera sobre el agua.","Estabilidad|Espacio compacto|Suministros","modulo"],
["Centro de medicina ancestral / intercultural",2,"Espacio de atención con saberes tradicionales (parteras, yachaks) articulado con la medicina occidental.","Integra la cosmovisión indígena en el espacio.","Parto vertical|Espacios rituales|Participación comunitaria","El MSP impulsa el parto culturalmente adecuado y la salud intercultural."],
["Spa médico / centro wellness",2,"Centro de prevención y bienestar con tratamientos supervisados médicamente.","Combina estética, bienestar y salud.","Hidroterapia|Consultorios|Ambiente relajante"],
["Centro de investigación biomédica",4,"Laboratorios para investigación médica con bioseguridad, bioterio y oficinas.","No atiende pacientes.","Niveles de bioseguridad|Bioterio|Flexibilidad de laboratorios"],
["Medicina legal / morgue",2,"Centro forense para autopsias, identificación y conservación de cuerpos.","Programa forense con cámaras frías.","Ventilación especial|Cámaras frías|Acceso discreto"],
["Clínica veterinaria",2,"Consulta, cirugía y hospitalización de animales de compañía.","Paciente animal: aislamiento acústico y de olores.","Separar perros y gatos|Aislados infecciosos|Lavado"],
["Hospital veterinario",3,"Hospital animal con imagen, UCI, cirugía y a veces grandes especies.","Mayor complejidad y a veces caballos o ganado.","Imagen diagnóstica|Grandes especies|24 horas"],
["Hotel de mascotas / guardería canina",2,"Alojamiento y cuidado temporal de mascotas con patios y áreas de juego.","Alojamiento, no clínica.","Ruido|Patios|Limpieza"],
["Refugio animal",2,"Centro de rescate, cuidado y adopción de animales.","Estancias largas y adopción.","Caniles|Aislamiento sanitario|Áreas de adopción","campus"]
]}
]});

TAX.push({c:"EDU", n:"Educación", f:"campus",
d:"Edificaciones para aprender, desde la estimulación temprana hasta el posgrado y la formación técnica. Se organizan por nivel educativo, modelo pedagógico y tipo de gestión.",
s:[
{n:"Educación inicial", f:"casa", t:[
["Guardería / sala cuna",2,"Espacio de cuidado para bebés y niños de 0–3 años con cunas, cambiadores, alimentación y juego.","Cuidado más que enseñanza formal.","Escala infantil|Baños y cambiadores|Patio seguro"],
["Centro de Desarrollo Infantil (CDI)",2,"Centro de cuidado y estimulación temprana para niños de 1–3 años, con alimentación y educadoras.","Modelo público con enfoque en desarrollo integral.","Salas por edades|Cocina|Patio","Modalidad del MIES en Ecuador; existe también 'Creciendo con Nuestros Hijos' (CNH) en atención domiciliaria."],
["Preescolar / educación inicial",2,"Aulas para niños de 3–5 años con rincones de aprendizaje, patio y baños adaptados.","Prepara para la escuela; mayor componente pedagógico.","Aulas con baño|Rincones|Patio cubierto"],
["Escuela Montessori / Waldorf / Reggio",2,"Centro con pedagogía alternativa y espacio preparado: materiales accesibles, huertos, talleres.","El espacio es 'el tercer maestro'.","Mobiliario a escala|Talleres|Naturaleza"]
]},
{n:"Educación básica y bachillerato", f:"campus", t:[
["Escuela primaria",3,"Aulas, laboratorios básicos, biblioteca, patio y canchas para niños de 6–12 años.","Tramo específico; aulas por grado.","Aulas por grado|Patio y cancha|Baños por edad"],
["Colegio secundario",3,"Aulas, laboratorios de ciencias, informática, talleres y canchas para adolescentes.","Laboratorios y talleres más especializados.","Laboratorios|Auditorio|Canchas"],
["Unidad educativa",4,"Institución que integra inicial, básica y bachillerato en un solo campus.","Todos los niveles juntos; bloques por edades.","Separación de bloques por edad|Accesos|Áreas deportivas","En Ecuador la LOEI denomina así a las instituciones con varios niveles."],
["Unidad Educativa del Milenio",4,"Modelo estatal ecuatoriano de unidad educativa estandarizada con bloques de aulas, laboratorios, biblioteca y canchas.","Diseño estándar del Ministerio de Educación.","Tipología estándar|Implantación|Mantenimiento","Programa emblemático del Ministerio de Educación del Ecuador."],
["Escuela rural / unidocente",2,"Escuela pequeña donde un docente atiende a varios grados en un aula.","Escala mínima y multigrado.","Aula multigrado|Vivienda del docente|Servicios autónomos","casa"],
["Escuela de educación especial",3,"Centro para estudiantes con discapacidad con aulas, terapias y adaptación total.","Espacios terapéuticos y accesibilidad total.","Aulas multisensoriales|Terapias|Transporte adaptado"],
["Colegio técnico",4,"Bachillerato técnico con talleres (mecánica, electricidad, agropecuaria).","Talleres industriales en el colegio.","Talleres con carga|Seguridad|Bodegas"],
["Internado",4,"Escuela con residencia para estudiantes, comedor y áreas de vida.","Suma vivienda y cuidado 24 h.","Dormitorios|Comedor|Supervisión"],
["Colegio internacional / bilingüe",4,"Colegio privado con programas internacionales (IB, Cambridge) y amplias instalaciones.","Estándares internacionales de infraestructura.","Instalaciones deportivas|Artes|Laboratorios"]
]},
{n:"Educación superior", f:"campus", t:[
["Campus universitario",5,"Conjunto de facultades, bibliotecas, laboratorios, residencias y espacios deportivos en un predio.","Es un pedazo de ciudad académica.","Plan maestro|Movilidad peatonal|Crecimiento"],
["Facultad / edificio académico",4,"Edificio de una facultad con aulas, talleres, laboratorios, oficinas y auditorio.","Un solo edificio dentro del campus.","Aulas flexibles|Talleres específicos|Espacios de estudio","bloque"],
["Instituto técnico / tecnológico",4,"Institución de educación superior técnica con talleres y laboratorios aplicados.","Formación práctica y corta.","Talleres|Relación con industria|Laboratorios","En Ecuador los regula el CES y la SENESCYT."],
["Conservatorio de música",3,"Escuela de música con cubículos de práctica, aulas acústicas y sala de conciertos.","La acústica y el aislamiento dominan.","Aislamiento entre cubículos|Sala de conciertos|Guardado de instrumentos","bloque"],
["Escuela de artes / diseño",3,"Talleres amplios, estudios de artistas, laboratorios digitales y galería.","Talleres con luz natural y ventilación.","Luz norte o difusa|Talleres sucios|Galería","nave"],
["Escuela de negocios / posgrado",3,"Edificio con aulas en herradura (case method), salas de trabajo y networking.","Aulas especiales y espacios de encuentro.","Aulas en herradura|Salas de grupo|Auditorio","bloque"],
["Aulario",3,"Edificio de aulas compartidas por varias facultades.","Solo aulas; uso común.","Circulación masiva|Aulas de distintos tamaños|Baños","bloque"]
]},
{n:"Formación no formal y especializada", f:"bloque", t:[
["Academia / centro de idiomas",2,"Aulas pequeñas para cursos de idiomas, preuniversitarios o refuerzo.","Cursos cortos y horarios flexibles.","Aulas pequeñas|Acústica|Recepción"],
["Centro de capacitación",3,"Edificio para formación profesional y corporativa con aulas y talleres.","Formación de adultos y empresas.","Aulas flexibles|Talleres|Alojamiento si es residencial"],
["Escuela de conducción",2,"Aulas teóricas, simuladores y pista de práctica.","Incluye pista de manejo.","Pista|Simuladores|Estacionamiento","abierto"],
["Escuela de cocina / gastronomía",3,"Cocinas didácticas, aulas demostrativas y restaurante escuela.","Cocinas industriales para enseñanza.","Extracción|Cocinas por alumno|Restaurante escuela"],
["Academia policial / militar",5,"Campus de formación con aulas, dormitorios, campos de entrenamiento y polígonos.","Formación con régimen de internado y entrenamiento físico.","Campos|Polígono de tiro|Dormitorios","campus"],
["Escuela de aviación / simuladores",3,"Aulas, simuladores de vuelo y acceso a pista.","Simuladores y relación con aeródromo.","Salas de simuladores|Hangar|Pista"],
["Escuela de danza / artes escénicas",3,"Salas con piso flotante, espejos y barras, y teatro de práctica.","Pisos y alturas específicos.","Piso flotante|Vestidores|Acústica"],
["Centro de formación artesanal",2,"Talleres para formación en oficios (carpintería, joyería, tejido).","Taller de oficios tradicionales.","Talleres|Ventilación|Exhibición","En Ecuador la Junta Nacional de Defensa del Artesano titula a los artesanos."]
]}
]});

TAX.push({c:"CUL", n:"Cultura", f:"bloque",
d:"Edificaciones para exhibir, conservar, representar y producir cultura. Se clasifican por disciplina (artes visuales, escénicas, libro, patrimonio) y por su relación con el público.",
s:[
{n:"Museos y exposiciones", f:"bloque", t:[
["Museo de arte",4,"Edificio para exhibir y conservar obras de arte con salas, reservas, restauración y servicios al público.","Las colecciones exigen control ambiental y seguridad.","Control de humedad y luz|Reservas|Carga de obras"],
["Museo de historia / antropología",4,"Museo de colecciones históricas y arqueológicas con salas temáticas y reservas.","Guion histórico y objetos patrimoniales.","Museografía|Reserva técnica|Accesibilidad","Ej.: Museo Nacional del Ecuador (MUNA)."],
["Museo de ciencias / interactivo",4,"Museo con exposiciones interactivas de ciencia y tecnología.","El visitante manipula; no solo contempla.","Espacios flexibles|Carga eléctrica|Grupos escolares"],
["Museo del niño",3,"Museo interactivo diseñado para aprendizaje infantil mediante el juego.","Todo está a escala infantil.","Seguridad|Escala|Zonas por edad"],
["Museo de sitio",3,"Museo junto a un sitio arqueológico o histórico que exhibe lo hallado allí.","Está donde ocurrió la historia.","Impacto en el sitio|Recorrido|Conservación","Ej.: museos de sitio de Ingapirca, Rumipamba, Tulipe."],
["Casa museo",2,"Vivienda histórica conservada como museo con su mobiliario original.","El edificio es la pieza principal.","Capacidad de carga|Conservación|Recorrido","casa"],
["Museo al aire libre / ecomuseo",4,"Museo que ocupa un territorio con edificios, paisajes y comunidades vivas.","Sin edificio único; integra el territorio.","Señalética|Rutas|Participación comunitaria","abierto"],
["Galería de arte",2,"Espacio de exhibición y venta de arte con muros blancos e iluminación flexible.","Comercial y temporal, frente al museo.","Iluminación|Muros flexibles|Bodega"],
["Kunsthalle / centro de arte contemporáneo",3,"Espacio de exhibiciones temporales sin colección permanente.","No colecciona; solo exhibe.","Grandes alturas|Carga|Flexibilidad"],
["Planetario",3,"Edificio con cúpula de proyección astronómica, salas educativas y exposiciones.","La cúpula de proyección define la forma.","Cúpula y proyección|Acústica|Aforo","cupula"],
["Acuario",4,"Edificio de exhibición de vida acuática con tanques, sistemas de soporte y recorridos.","Sistemas de agua de enorme complejidad.","Soporte de vida|Cargas de tanques|Recorrido"],
["Memorial / sitio de memoria",3,"Espacio conmemorativo que recuerda hechos o víctimas.","Carga simbólica por encima del programa.","Simbolismo|Recorrido emocional|Mantenimiento","abierto"],
["Pabellón expositivo",2,"Edificio para exposiciones temporales, a menudo en ferias o parques.","Temporal o flexible.","Montaje|Luz|Accesos","pabellon"]
]},
{n:"Artes escénicas y audiovisual", f:"bloque", t:[
["Teatro a la italiana",4,"Sala con escenario de embocadura, foso, tramoya, palcos y butacas en herradura.","El marco del escenario separa público y actores.","Caja escénica y tramoya|Visuales|Acústica"],
["Teatro black box",2,"Sala negra flexible, sin escenario fijo, para formatos experimentales.","Total flexibilidad de montaje.","Parrilla técnica|Graderías móviles|Aislamiento"],
["Teatro en arena / isabelino",3,"Sala donde el público rodea total o parcialmente el escenario.","Cercanía actor-público.","Visuales|Accesos de actores|Iluminación"],
["Auditorio",3,"Sala para conferencias, actos y presentaciones con escenario y buena acústica de palabra.","Prioriza la palabra y la proyección, no la tramoya.","Isóptica|Acústica|Cabina técnica"],
["Sala de conciertos",4,"Sala optimizada para música sinfónica o de cámara (shoebox o viñedo).","La acústica musical rige la forma.","Volumen acústico|Aislamiento|Órgano o escenario"],
["Teatro de ópera",5,"Edificio de gran caja escénica, foso orquestal, salas de ensayo y talleres.","Mayor complejidad escénica.","Caja escénica|Talleres|Ensayos"],
["Anfiteatro / teatro al aire libre",3,"Gradería al aire libre frente a un escenario, a veces en ladera.","Al aire libre, sin cubierta.","Pendiente natural|Acústica|Lluvia","abierto"],
["Cine / multicine",3,"Salas de proyección con isóptica escalonada, cabina, dulcería y circulación.","Salas de proyección, sin tramoya.","Isóptica|Aislamiento entre salas|Evacuación"],
["Cinemateca / cine de arte",2,"Sala de cine de autor con archivo fílmico y espacios de discusión.","Programación cultural y archivo.","Archivo climatizado|Sala pequeña|Café"],
["Autocine",3,"Explanada para ver películas desde el auto frente a una gran pantalla.","El auto es la butaca.","Pendiente de explanada|Pantalla|Transmisión de audio","abierto"],
["Estudio de grabación",2,"Salas de grabación y control aisladas acústicamente.","Aislamiento de caja dentro de caja.","Caja dentro de caja|Tratamiento acústico|Cableado"],
["Set / estudio de televisión y cine",4,"Platós de gran altura con parrilla de luces, talleres de escenografía y posproducción.","Espacios enormes y oscuros.","Altura libre|Aislamiento|Carga","nave"]
]},
{n:"Bibliotecas y archivos", f:"bloque", t:[
["Biblioteca pública",3,"Biblioteca abierta a la ciudadanía con colecciones, salas de lectura, espacios infantiles y digitales.","Servicio comunitario y abierto.","Zonificación silenciosa|Área infantil|Tecnología"],
["Biblioteca nacional",5,"Biblioteca que custodia el patrimonio bibliográfico de un país.","Depósito legal y conservación.","Depósitos climatizados|Restauración|Seguridad"],
["Biblioteca universitaria / CRAI",4,"Centro de recursos para el aprendizaje e investigación con salas grupales y de estudio.","Estudio y colaboración 24 h.","Salas grupales|Silencio|Horarios largos"],
["Biblioteca infantil",2,"Biblioteca a escala infantil con cuentacuentos y juego.","Escala y juego.","Mobiliario|Ruido|Colores"],
["Archivo histórico",3,"Edificio para custodia de documentos con depósitos controlados y sala de consulta.","El depósito es el núcleo.","Control ambiental|Protección de incendios|Consulta"],
["Mediateca",3,"Biblioteca multimedia con recursos digitales, audiovisuales y laboratorios.","Recursos digitales y producción.","Laboratorios|Conectividad|Flexibilidad"],
["Parque biblioteca",4,"Biblioteca integrada con espacio público en barrios vulnerables, modelo de Medellín.","Biblioteca más parque como herramienta urbana.","Espacio público|Programa social|Símbolo barrial","campus"]
]},
{n:"Centros culturales y de ciencia", f:"bloque", t:[
["Centro cultural",4,"Edificio multiprogramático con salas de exhibición, talleres, auditorio y biblioteca.","Reúne varias disciplinas.","Programación|Flexibilidad|Espacio público"],
["Casa de la cultura",3,"Sede de gestión cultural con salas de exposición, auditorio y talleres.","Institución de promoción cultural.","Salas|Talleres|Oficinas","En Ecuador la Casa de la Cultura Ecuatoriana (CCE) tiene núcleos en cada provincia."],
["Centro cultural comunitario",2,"Espacio barrial para talleres, reuniones y expresiones culturales locales.","Escala barrial y gestión comunitaria.","Salas multiuso|Bajo costo|Seguridad"],
["Fábrica de artes / estudios de artistas",3,"Antigua fábrica o edificio convertido en talleres y espacios de creación.","Producción artística, no exhibición.","Talleres|Luz|Carga"],
["Residencia artística",2,"Alojamiento y estudios para artistas visitantes.","Vivienda temporal más taller.","Estudios|Habitaciones|Espacio de muestra"],
["Centro de ciencia / exploratorio",4,"Centro interactivo de ciencia para público general y escolares.","Divulgación práctica.","Módulos interactivos|Grupos|Talleres"],
["Jardín botánico",4,"Colección viva de plantas con invernaderos, senderos, herbario e investigación.","Colección vegetal viva.","Invernaderos|Riego|Recorridos","abierto"],
["Zoológico / bioparque",5,"Parque con recintos para fauna, veterinaria, educación y recorridos.","Hábitats animales y bienestar.","Bienestar animal|Recintos|Seguridad","abierto"],
["Observatorio astronómico",2,"Edificio con cúpula giratoria para telescopio, en sitios de cielo oscuro.","La cúpula y la estabilidad del telescopio mandan.","Cielo oscuro|Aislar vibraciones|Cúpula giratoria","cupula"]
]}
]});
