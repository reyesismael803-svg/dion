/* Fichas — HOS Hospedaje y turismo */
F("HOS","Hotel urbano",{w:"Para turistas y viajeros de negocios que necesitan alojamiento bien ubicado en la ciudad, con servicios básicos de hotel.",
q:[["¿Cuántas habitaciones hacen rentable un hotel?","Depende de la ciudad y la tarifa; un estudio de factibilidad hotelera define el número óptimo."],["¿Qué porcentaje del área son habitaciones?","En hoteles urbanos, cerca del 60–70 % del área total."],["¿Necesito restaurante propio?","Al menos un área de desayunos; el restaurante completo depende de la categoría."],["¿Qué categoría puede tener?","El Reglamento de Alojamiento Turístico define requisitos para cada número de estrellas."]],
p:["Ocupación estable todo el año","Ubicación céntrica","Programa compacto"],c:["Terreno caro","Competencia con plataformas de alquiler","Estacionamientos limitados"],
i:["Módulo de habitación repetible de 3,6–4 m de ancho","Back of house con acceso de servicio independiente","Aislamiento acústico hacia la calle"]});
F("HOS","Hotel boutique",{w:"Para viajeros que buscan una experiencia única, de diseño y trato personalizado, en pocas habitaciones.",
q:[["¿Cuántas habitaciones tiene?","Normalmente entre 10 y 50."],["¿Puedo hacerlo en una casa antigua?","Sí, y es muy común; si es patrimonial necesita aprobación del ente de patrimonio."],["¿Cada habitación debe ser distinta?","No es obligatorio, pero la singularidad es parte del valor."],["¿Cómo se diferencia de un hostal?","Por el nivel de diseño, servicio y tarifa."]],
p:["Tarifas altas","Identidad fuerte","Buen uso de edificios existentes"],c:["Costo por habitación elevado","Operación intensiva en personal","Mercado de nicho"],
i:["Narrativa del lugar en todo el diseño","Instalaciones nuevas en muros antiguos sin dañarlos","Espacios sociales pequeños pero memorables"]});
F("HOS","Hotel de lujo (5 estrellas)",{w:"Para huéspedes de alto nivel que esperan servicio impecable, espacios amplios y amenidades completas.",
q:[["¿Qué exige una marca de lujo?","Manuales técnicos con áreas mínimas, materiales, sistemas y back of house muy detallados."],["¿Cuánto mide una habitación de lujo?","Suele superar los 35–45 m²."],["¿Cuántos restaurantes debe tener?","Normalmente dos o más, más bares y servicio a la habitación."],["¿Conviene tener operador?","Casi siempre; la marca aporta reservas y estándares."]],
p:["Tarifas y prestigio altos","Atrae eventos","Valoriza la zona"],c:["Inversión muy alta","Personal numeroso","Retorno lento"],
i:["Circulaciones de servicio totalmente separadas","Revisión del operador desde el anteproyecto","Acústica y climatización de alto nivel"]});
F("HOS","Hotel de negocios / ejecutivo",{w:"Para viajeros corporativos que necesitan dormir, trabajar y reunirse con eficiencia.",
q:[["¿Qué espacios son clave?","Salas de reuniones, business center, buen wifi y desayuno temprano."],["¿Necesita piscina?","No es esencial; un gimnasio sí es muy valorado."],["¿Dónde conviene ubicarlo?","Cerca de zonas financieras, centros de convenciones o aeropuertos."],["¿Cuál es el perfil de ocupación?","Alta entre semana y baja los fines de semana."]],
p:["Demanda estable entre semana","Programa eficiente","Ingresos por salones"],c:["Baja ocupación en fines de semana","Competencia de cadenas","Dependencia de la economía local"],
i:["Escritorio real en cada habitación","Salas divisibles","Check-in rápido y autoservicio"]});
F("HOS","Hotel de aeropuerto",{w:"Para pasajeros en tránsito, tripulaciones y viajeros con vuelos muy temprano o cancelados.",
q:[["¿Qué tan cerca debe estar?","Idealmente conectado o a pocos minutos de la terminal."],["¿Se alquila por horas?","Muchos ofrecen habitaciones de día."],["¿Cómo se controla el ruido?","Con ventanas acústicas y fachadas pesadas."],["¿Necesita estacionamiento grande?","Sí, y muchas veces transporte al terminal."]],
p:["Demanda constante","Operación 24 h","Poca estacionalidad"],c:["Ruido de aviones","Estancias muy cortas","Tarifas reguladas por competencia"],
i:["Ventanas con alto aislamiento acústico","Relojes y horarios de vuelo en el lobby","Almacenamiento de equipaje"]});
F("HOS","Apart-hotel",{w:"Para estancias largas de ejecutivos, familias o pacientes que necesitan cocina y más espacio.",
q:[["¿Qué diferencia tiene con un hotel?","Cada unidad tiene cocina y sala; menos servicios de restaurante."],["¿Se vende por unidades?","Puede ser, con un operador que alquila en nombre de los dueños."],["¿Cuánto mide cada unidad?","Entre 35 y 70 m² típicamente."],["¿Necesita lavandería?","Sí, de autoservicio o por servicio."]],
p:["Estancias largas y estables","Menor personal que un hotel","Atractivo para inversionistas"],c:["Mayor área por huésped","Desgaste de cocinas","Gestión de propietarios múltiples"],
i:["Kitchenette completa y extracción","Almacenamiento para estancias largas","Lavandería de autoservicio"]});
F("HOS","Hotel cápsula",{w:"Para viajeros de presupuesto bajo que solo necesitan dormir, cerca de terminales o centros urbanos.",
q:[["¿Cuánto mide una cápsula?","Aproximadamente 1 × 1 × 2 m."],["¿Es seguro?","Sí, con lockers, control de acceso y detección de incendios."],["¿Hay baños privados?","No, son compartidos y separados por género."],["¿Existe normativa?","En muchos países no hay categoría; se asimila a hostal."]],
p:["Muchas camas por m²","Tarifa baja","Diseño llamativo"],c:["Poca privacidad","Ventilación crítica","Normativa ambigua"],
i:["Ventilación individual en cada cápsula","Duchas suficientes para el aforo","Ruta de evacuación clara"]});
F("HOS","Motel / hotel de carretera",{w:"Para viajeros en auto que necesitan descansar en ruta.",
q:[["¿Qué lo caracteriza?","Estacionamiento frente a la habitación y servicios mínimos."],["¿Dónde ubicarlo?","En vías principales con buena visibilidad."],["¿Necesita restaurante?","Normalmente no; a veces cafetería."],["¿Cómo atraer clientes?","Con rotulación visible y buenas reseñas en línea."]],
p:["Bajo costo de operación","Construcción simple","Ubicación estratégica"],c:["Imagen poco valorada","Tarifa baja","Seguridad"],
i:["Iluminación nocturna","Acceso vehicular claro","Aislamiento del ruido de la vía"]});
F("HOS","Hotel lifestyle / de diseño",{w:"Para viajeros jóvenes y locales que buscan un hotel con vida social, diseño y marca.",
q:[["¿Qué es un lobby social?","Un espacio abierto con bar, café y cowork que también usa la gente de la ciudad."],["¿Habitaciones grandes?","Suelen ser compactas y bien diseñadas; el valor está en los espacios comunes."],["¿Qué ingresos adicionales genera?","Alimentos, bebidas y eventos."],["¿Necesita marca?","Hay marcas lifestyle, pero también independientes."]],
p:["Ingresos de alimentos y bebidas","Atrae público local","Marca fuerte"],c:["Ruido del lobby","Operación compleja","Diseño que envejece rápido"],
i:["Acústica del lobby","Programación de eventos","Terraza o rooftop activo"]});
F("HOS","Resort",{w:"Para vacaciones donde el huésped encuentra todo en un mismo lugar: descanso, comida, deporte y ocio.",
q:[["¿Cuánto terreno necesita?","Varias hectáreas; depende del número de habitaciones y amenidades."],["¿Qué infraestructura propia requiere?","Agua, tratamiento, energía de respaldo y a veces vías."],["¿Cómo se maneja la estacionalidad?","Con eventos, convenciones y ofertas para mercado local."],["¿Qué categoría en Ecuador?","El reglamento lo clasifica como resort, con requisitos propios."]],
p:["Estancia media más larga","Gasto alto por huésped","Paisaje como atractivo"],c:["Inversión muy alta","Estacionalidad","Operación compleja"],
i:["Plan maestro que preserve el paisaje","Recorridos de servicio ocultos","Planta de tratamiento de aguas propia"]});
F("HOS","Resort todo incluido",{w:"Para vacacionistas que prefieren pagar una sola tarifa con comida, bebida y actividades.",
q:[["¿Qué cambia en el diseño?","Más áreas de restaurante, bares y animación por habitación."],["¿Es rentable?","Sí, con alta ocupación y compras a escala."],["¿Cuántos restaurantes?","Varios temáticos más buffet principal."],["¿Qué pasa con las cocinas?","Son grandes y centralizadas con cocinas satélite."]],
p:["Ingreso asegurado por huésped","Alta ocupación","Operación estandarizada"],c:["Costos de alimentos","Menos gasto fuera del hotel","Desgaste intenso"],
i:["Cocina central y bodegas amplias","Flujos para evitar colas en comedores","Áreas de animación lejos de habitaciones"]});
F("HOS","Hotel spa / wellness",{w:"Para huéspedes que buscan descanso, salud y bienestar como motivo principal del viaje.",
q:[["¿Qué instalaciones son esenciales?","Piscinas termales o climatizadas, cabinas de tratamiento, sauna, vapor y áreas de relajación."],["¿Puede usar agua termal?","Sí, con concesión de uso del agua y análisis químico."],["¿Necesita personal médico?","Si ofrece tratamientos terapéuticos, sí."],["¿Qué ambiente se busca?","Silencio, naturaleza, materiales naturales y luz tenue."]],
p:["Tarifas altas","Estancias largas","Tendencia en crecimiento"],c:["Consumo de agua y energía","Personal especializado","Mantenimiento de piscinas"],
i:["Circuito hidrotermal bien secuenciado","Aislamiento acústico entre cabinas","Tratamiento y recirculación del agua"]});
F("HOS","Hotel casino",{w:"Para destinos donde el juego es legal y combina alojamiento, casino y espectáculos.",
q:[["¿Se puede hacer en Ecuador?","No, los casinos están prohibidos desde 2011."],["¿Qué define el diseño?","El recorrido hacia la sala de juego y la seguridad."],["¿Qué otros usos incluye?","Teatro, restaurantes, tiendas y convenciones."],["¿Qué normativa aplica?","La comisión de juegos del país donde se construya."]],
p:["Altos ingresos","Atrae turismo","Espectáculos"],c:["Ilegal en Ecuador","Impacto social","Seguridad compleja"],
i:["Vigilancia en todo el recorrido","Tesorería segura","Acústica y climatización intensivas"]});
F("HOS","Hotel histórico / parador",{w:"Para dar nueva vida a un edificio patrimonial convirtiéndolo en alojamiento de alto valor.",
q:[["¿Qué se puede modificar?","Lo que autorice la entidad de patrimonio según el grado de protección."],["¿Cómo meto baños en cada habitación?","Con núcleos húmedos ligeros y reversibles, estudiados caso por caso."],["¿Es más caro que construir nuevo?","Puede serlo, pero el valor histórico aumenta la tarifa."],["¿Qué pasa con la accesibilidad?","Se buscan soluciones compatibles: ascensores discretos, rampas."]],
p:["Valor histórico único","Rescata patrimonio","Tarifas premium"],c:["Restricciones patrimoniales","Sorpresas estructurales","Plazos largos"],
i:["Diagnóstico estructural y de humedad","Intervenciones reversibles","Aprobación temprana de patrimonio"]});
F("HOS","Hotel de montaña / ski lodge",{w:"Para turismo de montaña, andinismo o nieve, con abrigo y relación con el paisaje.",
q:[["¿Cómo se protege del frío?","Aislamiento, doble vidrio, calefacción y orientación solar."],["¿Qué pasa con el acceso?","Vías y a veces transporte especial en invierno."],["¿Qué espacios extra necesita?","Guardaequipos, secado de ropa y chimeneas."],["¿Aplica en Ecuador?","Como refugio o lodge de altura en el Cotopaxi, Chimborazo o Antisana."]],
p:["Paisaje extraordinario","Turismo de aventura","Experiencia cálida"],c:["Clima extremo","Accesos difíciles","Estacionalidad"],
i:["Cubiertas para cargas de nieve o granizo","Aislamiento continuo","Energía de respaldo"]});
F("HOS","Hotel flotante / hotel crucero fluvial",{w:"Para experiencias turísticas en ríos, lagos o bahías sobre una embarcación fija o navegable.",
q:[["¿Qué normativa aplica?","La marítima o fluvial más la turística."],["¿Cómo se abastece?","Con tanques de agua, generación y tratamiento a bordo."],["¿Es estable?","Se calcula estabilidad y anclaje para las condiciones del lugar."],["¿Existe en Ecuador?","Sí, en cruceros de Galápagos y embarcaciones en la Amazonía."]],
p:["Experiencia única","Ubicación privilegiada","Movilidad"],c:["Costos operativos","Mantenimiento náutico","Espacios reducidos"],
i:["Tratamiento de aguas residuales","Evacuación y seguridad","Materiales resistentes a humedad"]});
F("HOS","Hotel de hielo / efímero",{w:"Para destinos de invierno extremo que reconstruyen cada año un hotel de hielo como atracción.",
q:[["¿Cuánto dura?","Una temporada invernal."],["¿Hace frío dentro?","La temperatura se mantiene bajo cero; se duerme en sacos especiales."],["¿Tiene baños?","En un edificio cálido anexo."],["¿Se diseña cada año?","Sí, con artistas invitados."]],
p:["Atracción mundial","Arte efímero","Publicidad"],c:["Solo en climas extremos","Reconstrucción anual","Confort limitado"],
i:["Edificio cálido complementario","Diseño artístico anual","Seguridad térmica de huéspedes"]});
F("HOS","Hostal",{w:"Para viajeros con presupuesto moderado que buscan habitaciones privadas y servicio sencillo.",
q:[["¿Cuántas habitaciones mínimo?","El reglamento turístico fija el mínimo; debe verificarse la versión vigente."],["¿Baños privados?","Según la categoría; lo recomendable es que sí."],["¿Necesita recepción 24 h?","Según la categoría; al menos control de acceso."],["¿Puedo adaptarlo en una casa?","Sí, con permisos de cambio de uso y bomberos."]],
p:["Inversión moderada","Buena rentabilidad","Adaptable en casas"],c:["Competencia alta","Tarifas bajas","Mantenimiento constante"],
i:["Registro en el Ministerio de Turismo","Aislamiento acústico entre habitaciones","Áreas comunes acogedoras"]});
F("HOS","Hostel / albergue juvenil",{w:"Para mochileros y viajeros jóvenes que buscan precio bajo y vida social.",
q:[["¿Cuántas camas por dormitorio?","Entre 4 y 12 literas según el espacio y la ventilación."],["¿Qué es clave en el diseño?","Lockers, enchufes por cama, cortinas de privacidad y áreas sociales."],["¿Cocina compartida?","Sí, es muy valorada."],["¿Se separan por género?","Se ofrecen dormitorios mixtos y solo mujeres."]],
p:["Muchas camas por m²","Comunidad viajera","Bajo costo por huésped"],c:["Ruido","Desgaste","Tarifa baja"],
i:["Baño por cada 6–8 camas","Lockers con cargador","Terraza o bar social"]});
F("HOS","Bed & breakfast",{w:"Para anfitriones que convierten parte de su casa en hospedaje con desayuno.",
q:[["¿Cuántas habitaciones?","Pocas, normalmente 2 a 6."],["¿El anfitrión vive ahí?","Sí, es la esencia del B&B."],["¿Necesito registro?","Sí, en el Ministerio de Turismo según la categoría aplicable."],["¿Qué se ofrece además?","Desayuno casero y recomendaciones locales."]],
p:["Bajo costo inicial","Ingreso extra","Trato personal"],c:["Pérdida de privacidad familiar","Pocas unidades","Dependencia del anfitrión"],
i:["Separar zona familiar y de huéspedes","Cocina con capacidad para desayunos","Baños privados por habitación"]});
F("HOS","Casa de huéspedes",{w:"Para propietarios que alquilan habitaciones de su vivienda con servicios mínimos.",
q:[["¿Qué dice el reglamento ecuatoriano?","La casa de huéspedes es la vivienda del propietario con un número limitado de habitaciones para turistas."],["¿Incluye comida?","No necesariamente."],["¿Puedo hacerlo en un departamento?","Depende del reglamento del edificio y del GAD."],["¿Qué debo mejorar primero?","Baños, cerraduras y seguridad contra incendios."]],
p:["Inversión mínima","Ingreso complementario","Flexibilidad"],c:["Convivencia","Regulación municipal","Seguros"],
i:["Cerraduras individuales","Detector de humo y extintor","Normas de convivencia claras"]});
F("HOS","Hostería",{w:"Para descanso en entornos rurales o de valle, con jardines, recreación y restaurante propio.",
q:[["¿En qué se diferencia de un hotel?","En Ecuador debe estar fuera del casco urbano y tener áreas verdes y recreación."],["¿Qué amenidades conviene?","Piscina, canchas, juegos, senderos y salón de eventos."],["¿Cuántas habitaciones?","Según la categoría del reglamento."],["¿Sirve para eventos?","Sí, bodas y eventos corporativos son fuente clave de ingresos."]],
p:["Demanda de fin de semana","Eventos","Terreno más barato que en ciudad"],c:["Baja ocupación entre semana","Mantenimiento de jardines","Distancia"],
i:["Habitaciones en bloques bajos integrados al paisaje","Salón de eventos alejado de habitaciones","Tratamiento de aguas propio"]});
F("HOS","Hacienda turística",{w:"Para ofrecer hospedaje dentro de una hacienda productiva o histórica, con actividades del campo.",
q:[["¿Hay que mantener la producción?","Es lo ideal: es parte de la experiencia."],["¿Qué actividades se ofrecen?","Cabalgatas, ordeño, cocina tradicional, caminatas."],["¿Cómo se adaptan casas antiguas?","Con baños nuevos, refuerzo estructural y respeto al carácter."],["¿Qué categoría tiene?","'Hacienda turística' es categoría del reglamento ecuatoriano."]],
p:["Experiencia auténtica","Diversifica ingresos del campo","Patrimonio"],c:["Restauración costosa","Convivencia con la producción","Distancias"],
i:["Separar flujos de huéspedes y producción","Restauración respetuosa","Seguridad con animales"]});
F("HOS","Lodge",{w:"Para turismo de naturaleza en lugares remotos, con guianza y bajo impacto.",
q:[["¿Cómo se llega?","A menudo por río, sendero o vía secundaria; define toda la logística de obra."],["¿Qué energía se usa?","Solar, pequeñas hidroeléctricas o generadores con horario."],["¿Cómo se construye en la selva?","Con estructuras elevadas, madera local certificada y prefabricación."],["¿Participa la comunidad?","Es recomendable: empleo local y acuerdos comunitarios."]],
p:["Tarifas altas","Experiencia única","Conservación"],c:["Logística costosa","Mantenimiento en clima húmedo","Estacionalidad"],
i:["Plataformas elevadas y pasarelas","Mosquiteros y ventilación","Plan de manejo ambiental"]});
F("HOS","Eco-lodge",{w:"Para viajeros conscientes que buscan naturaleza con prácticas certificadas de sostenibilidad.",
q:[["¿Qué certificaciones hay?","Existen sellos de turismo sostenible nacionales e internacionales."],["¿Qué lo hace eco?","Energía renovable, tratamiento de aguas, materiales locales y beneficio comunitario."],["¿Cuesta más construirlo?","Algo más en sistemas, pero reduce costos operativos."],["¿Cómo se comunica al huésped?","Con recorridos que muestren los sistemas sostenibles."]],
p:["Diferenciación","Menor costo operativo","Imagen responsable"],c:["Inversión en sistemas","Certificación exigente","Tecnología en sitios remotos"],
i:["Humedales o biodigestores para aguas","Materiales locales certificados","Monitoreo de consumos"]});
F("HOS","Glamping",{w:"Para parejas y viajeros que quieren naturaleza con comodidad de hotel en estructuras ligeras.",
q:[["¿Qué estructuras se usan?","Tiendas safari, domos, burbujas, yurtas o cabañas ligeras."],["¿Tiene baño privado?","Lo ideal es que sí, integrado o anexo."],["¿Necesita permisos?","Sí, uso de suelo y registro turístico."],["¿Cuánto cuesta cada unidad?","Mucho menos que una habitación de hotel, con tarifas altas por noche."]],
p:["Inversión baja por unidad","Tarifa alta","Montaje rápido"],c:["Aislamiento térmico","Durabilidad","Clima extremo"],
i:["Privacidad entre unidades","Plataformas y drenaje","Iluminación nocturna suave"]});
F("HOS","Domo geodésico turístico",{w:"Para glamping con estructura esférica y vistas panorámicas.",
q:[["¿Resiste viento y lluvia?","Sí, bien anclado y con lona o paneles de calidad."],["¿Se condensa adentro?","Puede; se necesita ventilación y deshumidificación."],["¿Qué tamaño tiene?","Entre 5 y 8 m de diámetro típicamente."],["¿Hace calor con el sol?","Sí; conviene sombra, capa reflectiva o ubicación con árboles."]],
p:["Imagen atractiva","Montaje rápido","Vistas"],c:["Condensación","Temperatura interna","Mobiliario difícil"],
i:["Ventana panorámica orientada a la vista","Plataforma elevada","Ventilación superior"]});
F("HOS","Camping / campamento turístico",{w:"Para visitantes que traen su carpa o casa rodante y necesitan servicios básicos.",
q:[["¿Qué servicios mínimos?","Baterías sanitarias, duchas, agua potable, luz y zonas de fogata."],["¿Cuántas parcelas por hectárea?","Depende del tamaño de cada parcela y de las áreas comunes."],["¿Se puede alquilar equipos?","Sí, es un ingreso adicional."],["¿Qué seguridad necesita?","Control de acceso, iluminación y guardianía."]],
p:["Inversión mínima","Contacto con la naturaleza","Público amplio"],c:["Ingresos bajos","Dependencia del clima","Manejo de basura"],
i:["Parcelas niveladas y drenadas","Baterías sanitarias suficientes","Zonas de fogata seguras"]});
F("HOS","Refugio de montaña",{w:"Para andinistas y excursionistas en alta montaña que necesitan abrigo y seguridad.",
q:[["¿Qué capacidad tiene?","Pocas decenas de literas."],["¿Cómo se construye en altura?","Con materiales livianos transportables y prefabricación."],["¿Hay energía?","Normalmente solar con respaldo."],["¿Quién lo administra?","Guardaparques, clubes o concesionarios."]],
p:["Salva vidas","Apoya el turismo de aventura","Hito en el paisaje"],c:["Construcción muy difícil","Clima extremo","Mantenimiento"],
i:["Aislamiento térmico intenso","Resistencia a vientos","Almacenamiento de equipo"]});
F("HOS","Cabañas turísticas",{w:"Para turismo familiar o de pareja en unidades independientes dentro de un terreno con recepción.",
q:[["¿Cuántas cabañas?","Según terreno y demanda; se crece por etapas."],["¿Tienen cocina?","Pueden tener kitchenette para estancias largas."],["¿Qué áreas comunes?","Recepción, restaurante o BBQ, piscina y juegos."],["¿Qué materiales convienen?","Madera, piedra o mixtos según el entorno."]],
p:["Privacidad","Construcción por etapas","Integración al paisaje"],c:["Mayor infraestructura por unidad","Mantenimiento de exteriores","Recorridos largos"],
i:["Distribución que asegure privacidad y vistas","Senderos iluminados","Redes enterradas"]});
F("HOS","Serviced apartments",{w:"Para ejecutivos y familias en estancias de semanas o meses que quieren un hogar con servicio.",
q:[["¿Qué servicios incluye?","Limpieza, recepción, mantenimiento y a veces desayuno."],["¿Diferencia con apart-hotel?","Más doméstico, estancias más largas y menos servicios de hotel."],["¿Cómo se contrata?","Por semanas o meses."],["¿Se puede hacer en un edificio existente?","Sí, adaptando departamentos."]],
p:["Ocupación estable","Tarifa superior al alquiler normal","Poco personal"],c:["Amoblado y reposición","Gestión","Normativa"],
i:["Almacenamiento amplio","Lavadora en cada unidad","Recepción o acceso digital"]});
F("HOS","Tiempo compartido",{w:"Para vacacionistas que compran semanas de uso cada año en un complejo turístico.",
q:[["¿Qué compra el cliente?","El derecho de uso de una semana o puntos, no el inmueble completo."],["¿Qué unidades convienen?","Departamentos familiares de 1–3 dormitorios con cocina."],["¿Quién mantiene el complejo?","Un operador con cuotas anuales."],["¿Tiene mala fama?","Por ventas agresivas; la transparencia contractual es clave."]],
p:["Financiamiento anticipado","Ocupación alta","Fidelización"],c:["Regulación del consumidor","Reputación","Gestión compleja"],
i:["Unidades familiares con cocina","Amenidades de resort","Contratos claros y revisados legalmente"]});
F("HOS","Airbnb / alquiler de corta estancia",{w:"Para propietarios que alquilan departamentos o casas por noches en plataformas digitales.",
q:[["¿Es legal?","Depende de la ordenanza municipal y del reglamento del edificio."],["¿Qué hace que se alquile más?","Ubicación, fotos, diseño y comodidad."],["¿Necesito acceso sin llaves?","Es muy recomendable para check-in autónomo."],["¿Conviene amoblarlo?","Sí, con mobiliario resistente y bonito."]],
p:["Alta rentabilidad","Flexibilidad","Inversión moderada"],c:["Regulación cambiante","Conflicto con vecinos","Rotación"],
i:["Diseño fotogénico","Cerradura inteligente","Almacenamiento cerrado para el propietario"]});
F("HOS","Centro de información turística",{w:"Para orientar a visitantes en ciudades y destinos turísticos.",
q:[["¿Qué debe tener?","Mostrador, mapas, pantallas, baños y wifi."],["¿Dónde ubicarlo?","En plazas, terminales y entradas a la ciudad."],["¿Quién lo opera?","El GAD o el Ministerio de Turismo."],["¿Puede ser un kiosco?","Sí, un módulo pequeño bien señalizado."]],
p:["Servicio público útil","Pequeña inversión","Imagen del destino"],c:["Subutilización","Mantenimiento","Horarios"],
i:["Señalética visible","Accesibilidad","Punto de carga de celulares"]});
F("HOS","Mirador turístico",{w:"Para contemplar el paisaje de forma segura y convertir un punto de vista en destino.",
q:[["¿Qué seguridad necesita?","Barandas de altura adecuada, pisos antideslizantes y estructura calculada."],["¿Puede tener cafetería?","Sí, genera ingresos y mantenimiento."],["¿Qué impacto tiene?","Debe ser mínimo; se integra al paisaje."],["¿Se ilumina de noche?","Con cuidado para no contaminar el cielo."]],
p:["Atractivo turístico","Bajo costo","Hito"],c:["Viento y clima","Vandalismo","Accesos"],
i:["Voladizos calculados","Accesibilidad","Señalética interpretativa"]});
F("HOS","Parador turístico",{w:"Para viajeros en carretera que necesitan descanso, comida, baños y compras locales.",
q:[["¿Qué servicios incluye?","Restaurante, baños, tienda de productos locales, estacionamiento y mirador."],["¿Cuántos buses recibe?","Se dimensiona según el tráfico de la ruta."],["¿Quién lo opera?","Privados, comunidades o el GAD."],["¿Cómo atraer paradas?","Ubicación, visibilidad y buenos baños."]],
p:["Flujo constante","Promueve producción local","Servicio al viajero"],c:["Ubicación dependiente de la vía","Limpieza intensiva","Estacionalidad"],
i:["Estacionamiento para buses","Baterías sanitarias amplias","Venta de productos locales"]});
F("HOS","Centro de interpretación",{w:"Para explicar el valor natural o cultural de un sitio antes de recorrerlo.",
q:[["¿Qué diferencia tiene con un museo?","No custodia colecciones; interpreta el lugar."],["¿Qué espacios necesita?","Salas de exposición, auditorio pequeño, baños y punto de partida de recorridos."],["¿Quién lo diseña con el arquitecto?","Museógrafos, biólogos o historiadores."],["¿Cómo se integra al paisaje?","Con volumen bajo, materiales locales y vistas enmarcadas."]],
p:["Educación ambiental","Mejora la visita","Bajo impacto"],c:["Contenidos que envejecen","Financiamiento público","Mantenimiento"],
i:["Guion interpretativo antes del diseño","Grupos escolares","Bajo impacto en áreas protegidas"]});
F("HOS","Terminal de muelle turístico",{w:"Para embarcar pasajeros en tours marítimos o fluviales.",
q:[["¿Qué espacios necesita?","Boletería, sala de espera, baños, chalecos y muelle."],["¿Cómo se manejan las mareas?","Con muelles flotantes o rampas ajustables."],["¿Quién lo aprueba?","La autoridad portuaria y el GAD."],["¿Necesita sombra?","Sí, esperas cómodas y ventiladas."]],
p:["Organiza el turismo náutico","Seguridad","Imagen"],c:["Corrosión","Mareas","Aglomeraciones"],
i:["Muelle flotante","Materiales marinos","Accesibilidad a embarcaciones"]});
