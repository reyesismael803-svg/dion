/* Atlas Tipológico — datos 2: Comercio, Gastronomía y ocio nocturno, Oficinas, Uso mixto */
window.TAX = window.TAX || [];

TAX.push({c:"COM", n:"Comercio y servicios", f:"bloque",
d:"Edificaciones para comprar, vender e intercambiar bienes y servicios, desde el kiosco hasta el centro comercial regional. Se ordenan por tamaño, formato de venta y agrupación.",
s:[
{n:"Comercio minorista pequeño", f:"modulo", t:[
["Kiosco comercial",1,"Módulo mínimo de venta (prensa, snacks, recargas) en espacio público o dentro de edificios.","Menor que un local; no tiene interior para el cliente.","Permiso de uso de espacio público|Cierre seguro|Visibilidad"],
["Local comercial",2,"Espacio de venta en planta baja con vitrina hacia la calle; base de casi todo el comercio urbano.","Unidad genérica que se adapta a muchos giros.","Frente y vitrina|Altura para mezzanine|Baño y bodega mínimos","bloque"],
["Tienda de barrio / abarrotes",1,"Pequeño comercio de productos básicos, a menudo en la planta baja de la vivienda del dueño.","Escala doméstica; vende a vecinos por cercanía.","Relación con la vivienda|Bodega|Horarios extendidos","casa"],
["Minimarket / tienda de conveniencia",2,"Autoservicio pequeño (100–400 m²) con horario extendido y productos de consumo inmediato.","Frente al supermercado, menos variedad y más horario.","Refrigeración|Recorrido corto|Seguridad nocturna","bloque"],
["Boutique / tienda de moda",2,"Local de ropa o accesorios donde el diseño interior refuerza la marca.","La experiencia y la imagen importan más que el volumen.","Probadores|Iluminación de producto|Escaparate","bloque"],
["Showroom",2,"Espacio de exhibición de productos (muebles, autos, acabados) donde se muestra más de lo que se vende en sitio.","Exhibe; la venta y la bodega pueden estar en otro lugar.","Flexibilidad de montaje|Iluminación|Doble altura","bloque"],
["Farmacia",2,"Local de dispensación de medicamentos con mostrador, bodega controlada y, a veces, consultorio.","Requiere condiciones sanitarias y de almacenamiento reguladas.","Temperatura de medicamentos|Área de controlados|Atención 24 h","En Ecuador la ARCSA otorga el permiso de funcionamiento.","bloque"],
["Panadería / pastelería",2,"Local con obrador (hornos, amasado) y área de venta, a veces con mesas.","Combina producción y venta en el mismo lugar.","Extracción de calor y humos|Flujo de harinas|Normas sanitarias","bloque"],
["Florería",1,"Tienda de flores con cámara fría y área de armado de arreglos.","La cadena de frío define la planta.","Cámara fría|Agua y drenaje|Exhibición","En Ecuador es relevante por la industria florícola de exportación."],
["Óptica",1,"Local de venta de lentes con gabinete de optometría.","Incluye un pequeño espacio clínico.","Gabinete oscuro|Taller de montaje|Exhibición"],
["Pop-up store",1,"Tienda temporal (días o meses) para lanzar o probar una marca.","Es efímera y desmontable.","Montaje rápido|Instalaciones temporales|Impacto visual"],
["Puesto de mercado",1,"Unidad de venta dentro de un mercado: mesón, bodega mínima y exhibición.","Es parte de un mercado; no funciona aislado.","Agua y desagüe|Lavado|Ventilación"]
]},
{n:"Gran superficie", f:"nave", t:[
["Supermercado",3,"Autoservicio de alimentos y hogar (1.000–5.000 m²) con cajas, bodega, cámaras y carga.","Más variedad que el minimarket y menos que el hipermercado.","Andén de carga|Cámaras frías|Estacionamiento"],
["Hipermercado",4,"Gran superficie (más de 5.000 m²) de alimentos y no alimentos, con estacionamiento masivo.","Añade electrodomésticos, ropa y otros al supermercado.","Accesos vehiculares|Carga pesada|Grandes luces estructurales"],
["Tienda por departamentos",4,"Gran tienda de varios niveles organizada en secciones (moda, hogar, belleza).","Organiza por departamentos y suele ser ancla de un mall.","Circulación vertical|Secciones flexibles|Bodega por piso","bloque"],
["Big box / tienda de categoría",4,"Nave comercial grande especializada (ferretería, electrónica, juguetes).","Una sola categoría a gran escala.","Estanterías altas|Carga|Estacionamiento"],
["Home center / ferretería de gran formato",4,"Big box de construcción y hogar con patio de materiales y área de carga para clientes.","Incluye patio exterior y despacho de materiales pesados.","Patio de carga|Montacargas|Cubiertas altas"],
["Club de precios / mayorista",4,"Nave de venta por membresía o al por mayor, con estanterías tipo bodega.","El almacén es la sala de venta.","Racks industriales|Paletizado|Estacionamiento"],
["Concesionario de autos",3,"Showroom de vehículos con oficinas de venta, taller de servicio y patio.","Combina exhibición, venta y taller.","Accesos vehiculares|Taller y fosas|Vitrina a la vía","bloque"],
["Outlet",4,"Conjunto de tiendas de marcas con descuento, en calles abiertas o edificio, fuera de la ciudad.","Formato de descuento; arquitectura sencilla.","Accesibilidad vial|Calles peatonales|Bajo costo","campus"]
]},
{n:"Centros y agrupaciones comerciales", f:"bloque", t:[
["Centro comercial / mall",5,"Edificio cerrado con tiendas, anclas, patio de comidas, cines y estacionamiento, con recorridos climatizados.","Controla todo el recorrido; el strip mall se abre a la calle.","Anclas y recorrido|Estacionamiento masivo|Evacuación y ventilación","En Ecuador destacan Quicentro, San Marino, Mall del Sol, entre otros.","nave"],
["Plaza comercial / strip mall",3,"Hilera de locales con estacionamiento al frente, de acceso directo desde la calle.","Abierto, sin corredores interiores.","Visibilidad desde la vía|Estacionamiento frontal|Letreros"],
["Galería / pasaje comercial",3,"Calle interior cubierta que atraviesa una manzana con locales a ambos lados.","Conecta dos calles; su escala es menor que un mall.","Iluminación cenital|Dos accesos|Ventilación"],
["Lifestyle center",4,"Centro comercial al aire libre con calles peatonales, restaurantes y entretenimiento.","Espacio abierto y paisajismo, frente al mall cerrado.","Clima y cubiertas parciales|Paisaje|Mezcla de usos","campus"],
["Power center",4,"Agrupación de varios big box con estacionamiento compartido.","Anclas grandes sin tiendas pequeñas en medio.","Circulación vehicular|Carga|Señalética","nave"],
["Mercado municipal",3,"Edificio público de venta de alimentos frescos organizado en puestos por giro (carnes, mariscos, legumbres, comidas).","Gestionado por el municipio; el supermercado es privado y de autoservicio.","Zonificación por giro|Lavado y drenaje|Carga y descarga","En Ecuador los administran los GAD; el MSP y el municipio exigen normas de higiene.","nave"],
["Mercado artesanal",3,"Espacio de venta de artesanías y productos típicos, orientado a turistas y compradores locales.","Vende artesanía, no alimentos; tiene carácter cultural y turístico.","Exhibición de producto|Seguridad de bodegas|Ubicación turística","Referentes: Mercado Artesanal La Mariscal (Quito), Plaza de Ponchos (Otavalo).","nave"],
["Mercado mayorista",4,"Centro de abastecimiento a granel para comerciantes: grandes naves, patios de camiones y bodegas.","Vende por volumen a revendedores.","Maniobra de camiones|Básculas|Gestión de desechos","nave"],
["Recinto ferial",4,"Terreno con naves y explanadas para ferias periódicas de comercio, ganado o productos.","Uso intermitente; necesita flexibilidad.","Explanadas|Instalaciones temporales|Accesos masivos","abierto"],
["Bazar / zoco",3,"Mercado de callejones cubiertos con tiendas especializadas, típico de Medio Oriente y norte de África.","Es un tejido urbano más que un edificio.","Sombra|Calles estrechas|Ventilación natural"],
["Mercado de pulgas",2,"Mercado de objetos usados, antigüedades y segunda mano, habitualmente temporal.","Uso temporal en espacio público o galpón.","Puestos desmontables|Permiso municipal|Baños","abierto"],
["Food hall / mercado gourmet",3,"Mercado curado de puestos de comida y productos gourmet con mesas compartidas.","Más curado y comercial que un patio de comidas.","Extracción por puesto|Mesas comunes|Bar central","nave"],
["Mercado flotante",2,"Mercado en embarcaciones sobre ríos o canales, como en Tailandia.","La venta ocurre sobre el agua.","Muelles|Flujo de botes|Residuos","abierto"],
["Duty free",3,"Tienda libre de impuestos en aeropuertos, puertos o fronteras.","Solo para viajeros; controlada por aduanas.","Recorrido obligatorio|Seguridad|Bodega fiscal"]
]},
{n:"Servicios personales y comerciales", f:"bloque", t:[
["Estación de servicio / gasolinera",2,"Surtidores de combustible bajo marquesina, tienda de conveniencia, baños y aire/agua.","Programa técnico de tanques, surtidores y seguridad.","Tanques enterrados y distancias|Maniobra de vehículos|Normas de hidrocarburos","En Ecuador la regula la Agencia de Regulación y Control de Energía y Recursos Naturales (ARCERNNR).","pabellon"],
["Electrolinera",1,"Estación de carga de vehículos eléctricos con cargadores rápidos y área de espera.","El tiempo de espera (20–40 min) pide servicios de estancia.","Potencia eléctrica disponible|Sombra|Cafetería","pabellon"],
["Lavadero de autos / autolavado",2,"Instalación de lavado manual o túnel automático con tratamiento de aguas.","Programa técnico de agua y drenaje.","Trampa de grasas y lodos|Reciclaje de agua|Filas de espera","nave"],
["Taller mecánico / tecnicentro",2,"Taller de reparación de vehículos con elevadores, fosas y bodega de repuestos.","Industrial ligero en zona urbana.","Ruido y aceites|Altura para elevadores|Zonificación municipal","nave"],
["Agencia bancaria",2,"Oficina de atención financiera con cajas, asesores, bóveda y cajeros automáticos.","Programa de seguridad (bóveda, blindajes) que otras oficinas no tienen.","Seguridad y blindaje|Filas y turnos|Autobanco"],
["Casa de cambio / cooperativa",2,"Oficina financiera pequeña para cambio de divisas o servicios de ahorro y crédito.","Menor escala que el banco.","Ventanillas seguras|Cámaras|Accesibilidad","En Ecuador las cooperativas de ahorro y crédito tienen gran presencia, supervisadas por la SEPS."],
["Peluquería / barbería",1,"Local de corte y cuidado del cabello con estaciones, lavacabezas y espera.","Programa pequeño con alta carga de agua.","Lavacabezas y drenaje|Iluminación|Ventilación"],
["Centro de estética / spa urbano",2,"Local de tratamientos faciales, corporales y masajes en cabinas privadas.","Cabinas privadas y ambiente de calma.","Privacidad acústica|Duchas|Esterilización"],
["Lavandería",1,"Local de lavado y secado, autoservicio o con personal.","Programa técnico de agua, vapor y ventilación.","Extracción de humedad|Carga eléctrica|Desagües"],
["Centro de copiado / servicios",1,"Local de impresión, copias y servicios varios.","Pequeño comercio de servicios.","Ventilación de equipos|Mostrador|Carga eléctrica"],
["Mini-bodegas / self storage",3,"Edificio de trasteros de alquiler para particulares y empresas, con acceso controlado.","Almacena bienes de terceros por unidades.","Pasillos para carros|Seguridad|Ascensores de carga","nave"]
]}
]});

TAX.push({c:"GAS", n:"Gastronomía y vida nocturna", f:"bloque",
d:"Espacios para comer, beber, bailar y reunirse. Se diferencian por el tipo de servicio, la experiencia, el horario y la relación entre cocina, barra y público.",
s:[
{n:"Restauración", f:"bloque", t:[
["Restaurante fine dining",2,"Restaurante de alta cocina con menú degustación, servicio de sala especializado y cocina muy equipada.","La proporción cocina/salón es mayor y el ambiente es protagonista.","Cocina abierta o mesa del chef|Acústica de sala|Bodega de vinos"],
["Restaurante casual",2,"Restaurante de servicio a la mesa con menú accesible y ambiente relajado.","Más rotación y menor ticket que el fine dining.","Rotación de mesas|Flujo cocina-sala|Baños accesibles"],
["Restaurante temático",2,"Restaurante cuyo diseño interior recrea un tema o cultura (étnico, cine, época).","La escenografía es parte del producto.","Concepto de diseño|Materiales|Iluminación"],
["Cafetería / café de especialidad",2,"Local de café y repostería con barra, mesas y, a menudo, espacio para trabajar.","Barra central y estancias largas, frente al restaurante.","Barra y máquinas|Enchufes y wifi|Terraza","En Ecuador crece el café de especialidad de Loja, Zamora y Galápagos."],
["Comida rápida / fast food",2,"Local de servicio rápido en mostrador, con cocina estandarizada y alto flujo.","Operación estandarizada de cadena.","Flujo de filas|Cocina modular|Manual de marca"],
["Drive-thru",2,"Restaurante con carril vehicular para pedir y recoger sin bajar del auto.","El carril y las ventanillas definen la implantación.","Cola de vehículos|Ventanillas|Salida a la vía","pabellon"],
["Heladería",1,"Local de helados con vitrina refrigerada y área de consumo.","Programa corto centrado en frío.","Vitrinas|Obrador si produce|Terraza"],
["Pizzería",2,"Restaurante especializado con horno de leña o eléctrico visible.","El horno es foco de diseño y técnico.","Chimenea|Temperatura|Delivery"],
["Marisquería / cevichería",2,"Restaurante especializado en pescados y mariscos, con cadena de frío estricta.","Exigencias de frío e higiene elevadas.","Cámaras frías|Olores|Lavado","Muy característica de la Costa ecuatoriana; en Manabí y Guayas se habla de 'cevicherías' y 'picanterías'."],
["Picantería / comida típica",2,"Local de comida tradicional regional, a menudo familiar.","Identidad cultural y cocina tradicional.","Fogones o leña|Mesas compartidas|Ambiente local","En Ecuador: picanterías, fritaderías, huecas y asaderos."],
["Asadero / parrilla / steakhouse",2,"Restaurante centrado en carnes a la brasa con parrilla visible.","La parrilla y su extracción son clave.","Extracción de humo|Parrilla visible|Cámara de maduración"],
["Food court / patio de comidas",3,"Área de mesas compartidas rodeada de locales de comida rápida, típica de centros comerciales.","Mesas comunes para varios operadores.","Limpieza y bandejas|Extracción por local|Aforo","nave"],
["Dark kitchen / cocina fantasma",2,"Cocinas solo para delivery, sin salón, con varias marcas operando en un mismo lugar.","No tiene público; solo repartidores.","Recepción de repartidores|Extracción|Ubicación logística","nave"],
["Comedor popular / comedor comunitario",2,"Espacio de alimentación a bajo costo o gratuito para comunidades vulnerables.","Fines sociales; operación sencilla.","Cocina de volumen|Mesas largas|Higiene"],
["Cocina central / catering",3,"Planta de producción de alimentos para distribución a eventos, empresas, hospitales o aerolíneas.","Industria alimentaria; no atiende público.","Flujos limpio/sucio|Cadena de frío|Carga","nave"],
["Restaurante rooftop",2,"Restaurante en la azotea de un edificio, con terraza, vistas y cubierta ligera.","La ubicación en cubierta impone retos estructurales y de acceso.","Cargas en losa|Viento y lluvia|Ascensor y evacuación"],
["Restaurante mirador / giratorio",3,"Restaurante en lo alto de una torre con vista panorámica, a veces sobre una plataforma giratoria.","La vista y el mecanismo son el producto.","Mecanismo de giro|Acceso vertical|Evacuación","mastil"],
["Food truck park",2,"Terreno con estacionamiento para camiones de comida, mesas, baños y ambiente.","Los locales son vehículos.","Conexiones eléctricas|Mesas y sombra|Baños","abierto"]
]},
{n:"Bares", f:"bloque", t:[
["Bar",2,"Local de bebidas con barra, mesas y música ambiental.","La barra es el centro del programa.","Barra y bodega|Acústica|Baños por aforo"],
["Pub",2,"Bar de tradición británica/irlandesa con cerveza de barril, comida y deportes.","Ambiente social de barrio y comida.","Pantallas|Chopperas|Madera y calidez"],
["Cervecería artesanal / brewpub",2,"Bar que produce su propia cerveza, con tanques visibles.","Integra producción industrial ligera.","Tanques y drenaje|Cargas de piso|Olores"],
["Bar de cócteles",2,"Bar especializado en coctelería de autor.","Barra técnica y ambiente íntimo.","Estación de coctelería|Iluminación baja|Aforo reducido"],
["Speakeasy",2,"Bar oculto con acceso discreto, inspirado en la época de la Prohibición.","El acceso secreto es parte de la experiencia.","Entrada escondida|Evacuación a pesar del secreto|Acústica"],
["Rooftop bar",2,"Bar en la azotea con terraza y vistas, frecuentemente con DJ.","Ubicación en cubierta y exposición al clima.","Cubiertas retráctiles|Barandas|Ruido hacia vecinos"],
["Vinoteca / wine bar",2,"Bar de vinos con cava climatizada y degustación.","La cava define el diseño.","Temperatura de cava|Exhibición de botellas|Maridaje"],
["Lounge",2,"Espacio de estar con sofás, música y coctelería, más relajado que una discoteca.","Se conversa sentado; no hay pista de baile protagonista.","Mobiliario|Iluminación|Zonas VIP"],
["Karaoke",2,"Local con salas privadas o escenario para cantar.","Salas acústicamente aisladas.","Aislamiento de salas|Equipos|Servicio a salas"],
["Bar de tapas / piqueos",2,"Bar de pequeñas porciones para compartir, de pie o en barra.","Comida y bebida integradas en la barra.","Barra larga|Cocina pequeña|Rotación"]
]},
{n:"Ocio nocturno y entretenimiento", f:"bloque", t:[
["Discoteca / club nocturno",3,"Local para bailar con pista, cabina de DJ, barras, zona VIP y sistema de sonido e iluminación.","La pista y el sonido definen el diseño; el bar no tiene pista central.","Aislamiento acústico|Evacuación y aforo|Control de acceso","En Ecuador los permisos de funcionamiento y horarios los fija cada GAD; bomberos certifica aforo."],
["Sala de conciertos pequeña / live music venue",3,"Local con escenario, pista y barra para música en vivo de 200–1.500 personas.","El escenario es el foco, a diferencia de la discoteca.","Acústica y aislamiento|Carga de equipos|Camerinos"],
["Beach club",3,"Club frente al mar con piscina, camas de playa, restaurante, bar y DJ.","Opera de día y frente al mar.","Sombra|Piscina y duchas|Acceso a playa","campus"],
["Salón de eventos / recepciones",3,"Salón para bodas, fiestas y eventos corporativos con cocina de apoyo y pista.","Uso por reserva; la discoteca es de acceso público.","Flexibilidad de montaje|Cocina de catering|Estacionamiento"],
["Casino",3,"Sala de juegos de azar con mesas, máquinas, bares y espectáculos.","Regulación estricta de juegos y seguridad.","Legalidad en el país|Vigilancia|Diseño sin relojes ni ventanas","Prohibidos en Ecuador desde 2011."],
["Sala de bingo / juegos",2,"Local de juegos de mesa o bingo con zona de venta de alimentos.","Menor escala y regulación que el casino.","Ventilación|Aforo|Mesas"],
["Cabaret / sala de espectáculos",3,"Local con escenario para shows, cena y bebidas.","Combina restaurante y espectáculo.","Tramoya|Visuales|Camerinos"],
["Billar / sala de juegos",2,"Local con mesas de billar, dardos o juegos de mesa y bar.","Mesas grandes definen la modulación.","Distancia entre mesas|Iluminación sobre mesa|Bar"]
]}
]});

TAX.push({c:"OFI", n:"Oficinas y trabajo", f:"torre",
d:"Espacios para el trabajo administrativo, profesional y de servicios. Se clasifican por escala, calidad (clases A, B, C), modelo de ocupación y nivel de flexibilidad.",
s:[
{n:"Oficina profesional", f:"bloque", t:[
["Estudio / oficina pequeña",2,"Oficina para un profesional o equipo pequeño (arquitectos, abogados, contadores) de hasta 200 m².","Escala de pocas personas; no necesita edificio propio.","Sala de reuniones|Archivo|Imagen profesional"],
["Consultorio profesional",1,"Espacio de atención a clientes (psicología, asesoría, legal) con sala de espera.","Atiende clientes uno a uno.","Privacidad acústica|Espera|Accesibilidad"],
["Home office / taller en casa",1,"Espacio de trabajo integrado en la vivienda, con acceso independiente si recibe clientes.","Mezcla vivienda y trabajo.","Separación de ruidos|Acceso de clientes|Iluminación","casa"],
["Coworking",3,"Oficina compartida con puestos flexibles, oficinas privadas, salas y áreas sociales, alquilada por membresía.","El espacio es un servicio; la oficina tradicional es de un solo inquilino.","Mix de puestos|Salas de llamadas|Comunidad y eventos"],
["Business center / oficinas por horas",2,"Oficinas equipadas alquiladas por horas o días con recepción y secretaría.","Uso esporádico con servicios de apoyo.","Recepción|Salas equipadas|Reservas"],
["Call center / contact center",3,"Oficina de alta densidad de puestos para atención telefónica, con descanso y acústica controlada.","Densidad de puestos muy alta y turnos 24 h.","Acústica|Áreas de descanso|Climatización","nave"]
]},
{n:"Edificios de oficinas", f:"torre", t:[
["Edificio de oficinas clase C",3,"Edificio de oficinas básico, antiguo o con pocos servicios, de renta baja.","Menos tecnología, estacionamiento y amenidades que las clases A y B.","Renovación de instalaciones|Plantas pequeñas|Accesibilidad","bloque"],
["Edificio de oficinas clase B",3,"Edificio de calidad media con servicios estándar para empresas medianas.","Buena calidad sin los estándares premium.","Plantas eficientes|Estacionamiento|Seguridad","bloque"],
["Edificio de oficinas clase A",4,"Edificio de alto estándar: plantas libres amplias, fachada eficiente, ascensores rápidos, certificación ambiental.","Los estándares de mercado (plantas, altura, sistemas) definen la clase.","Planta libre y modulación|Certificación LEED o EDGE|Estacionamiento y seguridad"],
["Torre corporativa",4,"Edificio en altura para sede de una empresa o multiinquilino, en distritos financieros.","Es la clase A en altura, con imagen urbana fuerte.","Núcleo y eficiencia de planta|Fachada|Lobby"],
["Rascacielos de oficinas",5,"Torre de más de 150 m con ascensores zonificados, sky lobbies y pisos técnicos.","Su escala exige ingeniería especial.","Túnel de viento|Transporte vertical|Evacuación"],
["Sede corporativa / headquarters",4,"Edificio diseñado a medida para una empresa, expresando su identidad y cultura.","Hecho a medida para un solo usuario.","Programa de la organización|Imagen de marca|Espacios de encuentro","bloque"],
["Campus corporativo",5,"Conjunto de edificios de una empresa en un gran predio con paisaje y servicios (comedor, gimnasio, guardería).","Varios edificios y paisaje, frente a la torre compacta.","Plan maestro|Movilidad interna|Servicios al empleado","campus"],
["Oficina flexible / flex office",3,"Oficina con contratos flexibles gestionada por un operador, entre coworking y oficina tradicional.","Contratos cortos y espacio listo para usar.","Divisiones móviles|Servicios incluidos|Escalabilidad","bloque"]
]},
{n:"Parques de negocio e innovación", f:"campus", t:[
["Parque empresarial",5,"Conjunto de edificios de oficinas en un entorno planificado con servicios comunes.","Varias empresas en un recinto; el campus es de una sola.","Vías y estacionamientos|Servicios compartidos|Paisaje"],
["Parque tecnológico",5,"Recinto que reúne empresas tecnológicas, universidades y laboratorios para fomentar la innovación.","Vinculado a investigación y universidad.","Laboratorios y oficinas|Conectividad|Incentivos","En Ecuador, el proyecto Yachay (Urcuquí) fue concebido como ciudad del conocimiento."],
["Incubadora / aceleradora",3,"Edificio para startups con oficinas pequeñas, mentoría, laboratorios y salas de eventos.","Da apoyo a empresas en etapa inicial.","Espacios compartidos|Salas de demostración|Flexibilidad","bloque"],
["Distrito de innovación",5,"Zona urbana mixta que concentra empresas, centros de investigación, vivienda y servicios, como el 22@ de Barcelona.","Escala urbana y mezcla de usos.","Normativa urbana|Transporte|Espacio público"],
["Bolsa de valores / centro financiero",4,"Edificio de mercado de valores y entidades financieras con salas de operaciones.","Sistemas tecnológicos y de seguridad críticos.","Redundancia tecnológica|Seguridad|Imagen institucional"]
]}
]});

TAX.push({c:"MIX", n:"Uso mixto y grandes desarrollos", f:"torre",
d:"Edificios y piezas urbanas que combinan vivienda, comercio, oficinas, hospedaje y equipamientos. Van desde el edificio con locales en planta baja hasta la ciudad planificada.",
s:[
{n:"Edificios mixtos", f:"torre", t:[
["Edificio de uso mixto",3,"Edificio que combina usos por niveles: comercio en planta baja, oficinas o vivienda arriba.","A diferencia del edificio monofuncional, requiere accesos, núcleos y normativas distintas por uso.","Accesos separados por uso|Compatibilidad de usos y ruidos|Estacionamientos por uso","En Ecuador la compatibilidad de usos la define el PUGS (Plan de Uso y Gestión del Suelo) de cada cantón.","bloque"],
["Vivienda-comercio (casa-tienda)",2,"Vivienda con local comercial en planta baja, típica de barrios populares y centros históricos.","Escala doméstica del uso mixto.","Acceso independiente a la vivienda|Crecimiento en altura|Fachada comercial","casa"],
["Torre de uso mixto",4,"Torre que apila comercio, oficinas, hotel y vivienda con núcleos y lobbies separados.","Varios usos en altura con transferencias estructurales.","Lobbies por uso|Transferencias estructurales|Operación compartida"],
["Podio con torres",5,"Plataforma comercial o de estacionamientos de varios niveles sobre la que se levantan una o más torres.","El podio unifica la manzana y las torres liberan espacio.","Cubierta del podio como jardín|Estructura de transferencia|Accesos"],
["Hotel residencial / branded residences",4,"Edificio que combina hotel y residencias privadas con servicios de la marca hotelera.","Los propietarios reciben servicios del hotel.","Accesos separados|Servicios compartidos|Contrato con la marca"]
]},
{n:"Desarrollos urbanos", f:"campus", t:[
["Manzana de uso mixto",5,"Desarrollo que ocupa una manzana completa con varios edificios, calles interiores y plazas.","Escala de manzana, frente al edificio individual.","Permeabilidad peatonal|Etapas|Espacio público"],
["Desarrollo orientado al transporte (DOT/TOD)",5,"Desarrollo denso y mixto alrededor de una estación de transporte masivo.","Se organiza a partir de la estación.","Radio caminable 500–800 m|Densidad y usos|Conexión con la estación","En Quito el Metro abrió la discusión de desarrollos alrededor de sus estaciones."],
["Waterfront / frente de agua",5,"Regeneración de frentes marítimos, fluviales o portuarios con usos mixtos y espacio público.","El borde de agua estructura el proyecto.","Riesgo de inundación|Acceso público al borde|Usos portuarios","El Malecón 2000 de Guayaquil es un referente de regeneración de borde fluvial."],
["Ciudad planificada / ciudad nueva",5,"Ciudad diseñada desde cero con trazado, zonificación, infraestructura y equipamientos.","Todo se planifica antes de habitarse.","Plan maestro|Infraestructura|Gobernanza"],
["Smart city / distrito inteligente",5,"Distrito con sensores, datos y gestión digital de movilidad, energía y servicios.","La capa digital es tan importante como la física.","Infraestructura de datos|Privacidad|Interoperabilidad"],
["Ciudad lineal",5,"Ciudad organizada a lo largo de un eje de transporte, como la propuesta de Arturo Soria o The Line en Arabia Saudita.","Su forma es una franja continua.","Transporte en el eje|Servicios a lo largo|Escalabilidad","lineal"],
["Arcología",5,"Megaestructura que reúne ciudad y ecología en un solo edificio, concepto de Paolo Soleri (Arcosanti).","Una ciudad entera en un edificio.","Escala extrema|Sistemas cerrados|Visión experimental","torre"]
]}
]});
