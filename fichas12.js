/* Fichas — INF Infraestructura, CIE Ciencia, EFI Efímera, FUT Emergentes */
F("INF","Planta de agua potable",{w:"Para potabilizar agua para una ciudad o comunidad.",
q:[["¿Procesos?","Captación, coagulación, floculación, sedimentación, filtración y desinfección."],["¿Laboratorio?","Control de calidad."],["¿Seguridad?","Químicos y acceso."],["¿Arquitecto?","Edificios de control y paisaje."]],
p:["Salud pública","Esencial","Duradera"],c:["Costos","Técnica","Operación"],
i:["Flujo hidráulico por gravedad","Laboratorio","Bodega de químicos"]});
F("INF","Planta de tratamiento de aguas residuales (PTAR)",{w:"Para depurar aguas servidas.",
q:[["¿Olores?","Control y distancia."],["¿Lodos?","Tratamiento."],["¿Reutilización?","Riego."],["¿Normativa?","Ambiental."]],
p:["Ambiente","Salud","Obligatoria"],c:["Olores","Costos","Operación"],
i:["Distancia","Lodos","Paisaje"]});
F("INF","Tanque / reservorio",{w:"Para almacenar agua.",
q:[["¿Cota?","Por gravedad."],["¿Material?","Hormigón."],["¿Seguridad?","Cerramiento."],["¿Sismo?","Diseño especial."]],
p:["Abastecimiento","Simple","Duradero"],c:["Impacto visual","Mantenimiento","Seguridad"],
i:["Cota","Estructura","Cerramiento"]});
F("INF","Estación de bombeo",{w:"Para impulsar agua.",
q:[["¿Ruido?","Aislar."],["¿Energía?","Respaldo."],["¿Mantenimiento?","Accesos."],["¿Tamaño?","Pequeño."]],
p:["Esencial","Pequeña","Simple"],c:["Ruido","Energía","Mantenimiento"],
i:["Aislamiento","Respaldo","Accesos"]});
F("INF","Represa",{w:"Para embalsar agua o generar energía.",
q:[["¿Geología?","Crítica."],["¿Impacto?","Ambiental y social."],["¿Seguridad?","Monitoreo."],["¿Arquitecto?","Edificios de control."]],
p:["Agua y energía","Riego","Control de crecidas"],c:["Impacto","Costos","Riesgo"],
i:["Geología","Monitoreo","Paisaje"]});
F("INF","Central hidroeléctrica",{w:"Para generar electricidad con agua.",
q:[["¿Casa de máquinas?","Turbinas."],["¿Ejemplos?","Coca Codo Sinclair, Paute."],["¿Impacto?","Ambiental."],["¿Operación?","24 h."]],
p:["Energía renovable","Escala","Duradera"],c:["Impacto","Costos","Sedimentos"],
i:["Casa de máquinas","Accesos","Control"]});
F("INF","Central termoeléctrica",{w:"Para generar electricidad con combustibles.",
q:[["¿Emisiones?","Control."],["¿Ruido?","Aislar."],["¿Combustible?","Almacenamiento."],["¿Respaldo?","Sí."]],
p:["Respaldo","Rápida","Estable"],c:["Emisiones","Costos","Ruido"],
i:["Chimeneas","Aislamiento","Seguridad"]});
F("INF","Parque solar",{w:"Para energía solar a escala.",
q:[["¿Terreno?","Grande."],["¿Orientación?","Óptima."],["¿Mantenimiento?","Limpieza."],["¿Almacenamiento?","Baterías opcionales."]],
p:["Renovable","Modular","Bajo mantenimiento"],c:["Suelo","Intermitencia","Impacto visual"],
i:["Orientación","Drenaje","Cerramiento"]});
F("INF","Parque eólico",{w:"Para energía eólica.",
q:[["¿Recurso?","Estudio de viento."],["¿Aves?","Impacto."],["¿Accesos?","Grandes piezas."],["¿Ejemplo?","Villonaco."]],
p:["Renovable","Poco suelo","Duradera"],c:["Aves","Ruido","Paisaje"],
i:["Accesos","Distancias","Subestación"]});
F("INF","Subestación eléctrica",{w:"Para transformar energía.",
q:[["¿Distancias?","Seguridad."],["¿Cerramiento?","Sí."],["¿Ruido?","Transformadores."],["¿Paisaje?","Barreras."]],
p:["Esencial","Compacta","Duradera"],c:["Seguridad","Ruido","Impacto visual"],
i:["Distancias","Cerramiento","Barreras vegetales"]});
F("INF","Central nuclear",{w:"Para energía nuclear.",
q:[["¿Ecuador?","No tiene."],["¿Seguridad?","Extrema."],["¿Refrigeración?","Agua."],["¿Residuos?","Gestión."]],
p:["Sin emisiones de CO₂","Escala","Estable"],c:["Riesgo","Costos","Residuos"],
i:["Contención","Refrigeración","Emergencia"]});
F("INF","Planta de biogás / biomasa",{w:"Para energía de residuos orgánicos.",
q:[["¿Digestores?","Sí."],["¿Olores?","Control."],["¿Materia prima?","Asegurar."],["¿Uso?","Energía y abono."]],
p:["Circular","Renovable","Reduce residuos"],c:["Olores","Operación","Suministro"],
i:["Digestores","Distancias","Almacenamiento"]});
F("INF","Estación de hidrógeno",{w:"Para vehículos de hidrógeno.",
q:[["¿Existe en Ecuador?","No aún."],["¿Seguridad?","Alta."],["¿Almacenamiento?","A presión."],["¿Futuro?","Transporte pesado."]],
p:["Cero emisiones","Futuro","Innovación"],c:["Costos","Seguridad","Demanda"],
i:["Distancias","Ventilación","Almacenamiento"]});
F("INF","Relleno sanitario",{w:"Para disposición final de residuos.",
q:[["¿Impermeabilización?","Geomembranas."],["¿Lixiviados?","Tratamiento."],["¿Gases?","Captación."],["¿Cierre?","Plan."]],
p:["Necesario","Controlado","Energía de biogás"],c:["Impacto","Suelo","Rechazo vecinal"],
i:["Impermeabilización","Lixiviados","Gases"]});
F("INF","Planta de reciclaje",{w:"Para recuperar materiales.",
q:[["¿Bandas?","Clasificación."],["¿Recicladores?","Inclusión."],["¿Carga?","Sí."],["¿Incendio?","Riesgo."]],
p:["Circular","Empleo","Ambiental"],c:["Mercado","Operación","Incendio"],
i:["Bandas","Incendio","Carga"]});
F("INF","Punto limpio / centro de acopio de reciclaje",{w:"Para recibir reciclables de ciudadanos.",
q:[["¿Contenedores?","Por material."],["¿Acceso?","Vehicular y peatonal."],["¿Horario?","Definido."],["¿Educación?","Señalética."]],
p:["Participación","Bajo costo","Ambiental"],c:["Limpieza","Vandalismo","Uso"],
i:["Contenedores","Señalética","Acceso"]});
F("INF","Planta de valorización energética",{w:"Para convertir residuos en energía.",
q:[["¿Emisiones?","Filtros."],["¿Uso público?","CopenHill tiene pista de esquí."],["¿Escala?","Grande."],["¿Imagen?","Hito."]],
p:["Energía","Reduce rellenos","Hito"],c:["Emisiones","Costos","Rechazo"],
i:["Filtros","Usos públicos","Paisaje"]});
F("INF","Estación de transferencia",{w:"Para transferir residuos a camiones grandes.",
q:[["¿Olores?","Control."],["¿Maniobra?","Camiones."],["¿Limpieza?","Constante."],["¿Ubicación?","Estratégica."]],
p:["Eficiencia","Logística","Costos"],c:["Olores","Tráfico","Rechazo"],
i:["Maniobra","Lavado","Cerramiento"]});
F("INF","Torre de telecomunicaciones",{w:"Para antenas.",
q:[["¿Altura?","Según cobertura."],["¿Cimentación?","Especial."],["¿Normativa?","Arcotel y municipal."],["¿Mimetizada?","Posible."]],
p:["Conectividad","Pequeña","Esencial"],c:["Impacto visual","Rechazo","Normativa"],
i:["Cimentación","Cerramiento","Mimetización"]});
F("INF","Torre mirador de TV",{w:"Para telecomunicaciones con mirador.",
q:[["¿Turismo?","Mirador y restaurante."],["¿Ascensores?","Rápidos."],["¿Viento?","Estudio."],["¿Hito?","Sí."]],
p:["Turismo","Hito","Ingresos"],c:["Costos","Estructura","Mantenimiento"],
i:["Estructura","Ascensores","Evacuación"]});
F("INF","Estación meteorológica / sismológica",{w:"Para medición científica.",
q:[["¿Ubicación?","Representativa."],["¿Energía?","Solar."],["¿Protección?","Cerramiento."],["¿Datos?","Transmisión."]],
p:["Ciencia","Prevención","Pequeña"],c:["Vandalismo","Mantenimiento","Acceso"],
i:["Ubicación","Energía","Protección"]});

F("CIE","Laboratorio de investigación",{w:"Para investigación científica.",
q:[["¿Módulo?","Repetible de laboratorio."],["¿Extracción?","Campanas."],["¿Flexibilidad?","Mesones móviles."],["¿Instalaciones?","Gases, vacío, agua pura."]],
p:["Conocimiento","Prestigio","Colaboración"],c:["Costos","Técnica","Energía"],
i:["Módulo","Extracción","Instalaciones accesibles"]});
F("CIE","Laboratorio de bioseguridad (BSL-3/4)",{w:"Para patógenos peligrosos.",
q:[["¿Presión?","Negativa."],["¿Esclusas?","Sí."],["¿Efluentes?","Tratamiento."],["¿Normas?","Internacionales."]],
p:["Salud pública","Investigación","Estratégico"],c:["Costos","Riesgo","Técnica"],
i:["Presiones","Esclusas","Efluentes"]});
F("CIE","Centro de I+D corporativo",{w:"Para innovación empresarial.",
q:[["¿Prototipos?","Talleres."],["¿Confidencialidad?","Accesos."],["¿Colaboración?","Espacios."],["¿Flexibilidad?","Alta."]],
p:["Innovación","Competitividad","Talento"],c:["Costos","Cambios","Confidencialidad"],
i:["Talleres","Accesos","Flexibilidad"]});
F("CIE","Estación científica / biológica",{w:"Para investigación en campo.",
q:[["¿Autonomía?","Alta."],["¿Impacto?","Bajo."],["¿Alojamiento?","Sí."],["¿Ejemplo?","Charles Darwin, Yasuní."]],
p:["Ciencia","Conservación","Educación"],c:["Logística","Costos","Clima"],
i:["Autonomía","Bajo impacto","Laboratorio"]});
F("CIE","Estación antártica / polar",{w:"Para investigación polar.",
q:[["¿Ecuador?","Estación Pedro Vicente Maldonado."],["¿Aislamiento?","Extremo."],["¿Montaje?","Rápido."],["¿Autonomía?","Total."]],
p:["Ciencia","Soberanía","Cooperación"],c:["Clima","Logística","Costos"],
i:["Aislamiento","Prefabricación","Autonomía"]});
F("CIE","Acelerador de partículas / sincrotrón",{w:"Para física de partículas.",
q:[["¿Escala?","Enorme."],["¿Blindaje?","Sí."],["¿Precisión?","Extrema."],["¿Ejemplo?","CERN."]],
p:["Ciencia de frontera","Cooperación","Prestigio"],c:["Costos","Técnica","Escala"],
i:["Blindaje","Precisión","Energía"]});
F("CIE","Radiotelescopio",{w:"Para observación en radio.",
q:[["¿Interferencias?","Evitar."],["¿Estructura?","Precisa."],["¿Ubicación?","Remota."],["¿Datos?","Centro."]],
p:["Ciencia","Cooperación","Prestigio"],c:["Costos","Técnica","Ubicación"],
i:["Estructura","Interferencias","Datos"]});
F("CIE","Banco de semillas / germoplasma",{w:"Para conservar semillas.",
q:[["¿Temperatura?","Muy baja."],["¿Seguridad?","Alta."],["¿Resiliencia?","Frente a desastres."],["¿Ejemplo?","Svalbard."]],
p:["Seguridad alimentaria","Conservación","Estratégico"],c:["Energía","Costos","Técnica"],
i:["Frío","Seguridad","Resiliencia"]});

F("EFI","Pabellón temporal",{w:"Para eventos, bienales o exposiciones.",
q:[["¿Duración?","Semanas o meses."],["¿Reutilización?","Ideal."],["¿Estructura?","Ligera."],["¿Permisos?","Temporales."]],
p:["Experimentación","Impacto","Rapidez"],c:["Temporalidad","Costos","Clima"],
i:["Montaje","Desmontaje","Reutilización"]});
F("EFI","Arquitectura inflable",{w:"Para cubiertas o espacios temporales sostenidos por aire.",
q:[["¿Ventiladores?","Continuos."],["¿Anclajes?","Sí."],["¿Evacuación?","Plan."],["¿Viento?","Límites."]],
p:["Rápida","Liviana","Llamativa"],c:["Energía","Viento","Durabilidad"],
i:["Ventiladores","Anclajes","Salidas"]});
F("EFI","Arquitectura tensil / carpa",{w:"Para membranas tensadas.",
q:[["¿Material?","PVC o PTFE."],["¿Mástiles?","Sí."],["¿Drenaje?","Pendientes."],["¿Durabilidad?","Años."]],
p:["Grandes luces","Ligera","Estética"],c:["Mantenimiento","Viento","Costos"],
i:["Anclajes","Drenaje","Tensado"]});
F("EFI","Módulo contenedor comercial",{w:"Para comercio en contenedores.",
q:[["¿Aislamiento?","Sí."],["¿Transporte?","Fácil."],["¿Instalaciones?","Integradas."],["¿Permisos?","Municipales."]],
p:["Rápido","Móvil","Imagen"],c:["Calor","Espacio","Corrosión"],
i:["Aislamiento","Vanos","Instalaciones"]});
F("EFI","Food truck",{w:"Para cocina móvil.",
q:[["¿Normas?","Sanitarias."],["¿Energía?","Generador o toma."],["¿Permisos?","Por ubicación."],["¿Diseño?","Compacto."]],
p:["Móvil","Inversión baja","Flexible"],c:["Espacio","Permisos","Clima"],
i:["Extracción","Agua","Energía"]});
F("EFI","Casa rodante / RV",{w:"Para vivir o viajar en un vehículo.",
q:[["¿Autonomía?","Agua y energía."],["¿Peso?","Límite."],["¿Espacio?","Multifuncional."],["¿Normativa?","Vehicular."]],
p:["Libertad","Movilidad","Experiencia"],c:["Espacio","Mantenimiento","Estacionamiento"],
i:["Peso","Autonomía","Almacenamiento"]});
F("EFI","Instalación artística",{w:"Para arte espacial.",
q:[["¿Seguridad?","Público."],["¿Montaje?","Plan."],["¿Interacción?","Diseñada."],["¿Duración?","Variable."]],
p:["Cultura","Impacto","Experimentación"],c:["Seguridad","Costos","Temporalidad"],
i:["Seguridad","Montaje","Iluminación"]});
F("EFI","Escenografía",{w:"Para teatro, cine o eventos.",
q:[["¿Montaje?","Rápido."],["¿Transporte?","Modular."],["¿Materiales?","Livianos e ignífugos."],["¿Visual?","Clave."]],
p:["Creatividad","Impacto","Portafolio"],c:["Vida corta","Costos","Transporte"],
i:["Modularidad","Ignifugación","Transporte"]});
F("EFI","Refugio de emergencia modular",{w:"Para desastres.",
q:[["¿Despliegue?","Rápido."],["¿Clima?","Adaptado."],["¿Transporte?","Compacto."],["¿Duración?","Temporal."]],
p:["Rapidez","Salva vidas","Transportable"],c:["Confort","Temporalidad","Costos"],
i:["Transporte","Montaje","Ventilación"]});

F("FUT","Rascacielos de madera masiva",{w:"Para edificios en altura con estructura de madera de ingeniería.",
q:[["¿Resiste el fuego?","La madera masiva se carboniza en superficie y protege su núcleo; se diseña con esa capa de sacrificio."],["¿Normativa?","En Ecuador aún limitada; requiere justificación técnica."],["¿Ventaja?","Menor huella de carbono y obra más rápida."],["¿Ejemplos?","Mjøstårnet (Noruega), Ascent (EE. UU.)."]],
p:["Menor huella de carbono","Obra seca y rápida","Calidez"],c:["Normativa inmadura","Humedad","Costo del material importado"],
i:["Núcleos de hormigón o híbridos","Protección contra humedad en obra","Diseño contra incendio"]});
F("FUT","Edificio de energía positiva",{w:"Para producir más energía de la que se consume.",
q:[["¿Cómo?","Envolvente eficiente más renovables."],["¿Monitoreo?","Sí."],["¿Costo?","Mayor inicial."],["¿Retorno?","Ahorro."]],
p:["Sostenible","Ahorro","Imagen"],c:["Inversión","Técnica","Espacio para paneles"],
i:["Envolvente","Renovables","Monitoreo"]});
F("FUT","Edificio regenerativo",{w:"Para mejorar el ambiente.",
q:[["¿Qué hace?","Capta carbono, agua, genera hábitat."],["¿Certificación?","Living Building Challenge."],["¿Costo?","Alto."],["¿Materiales?","Locales."]],
p:["Ambiental","Innovación","Imagen"],c:["Costos","Complejidad","Normativa"],
i:["Ciclos cerrados","Biodiversidad","Materiales"]});
F("FUT","Ciudad flotante",{w:"Para adaptación al nivel del mar.",
q:[["¿Existe?","Prototipos (Oceanix Busan)."],["¿Anclaje?","Sí."],["¿Servicios?","Autónomos."],["¿Escala?","Barrios."]],
p:["Resiliencia climática","Innovación","Nuevo suelo"],c:["Costos","Técnica","Normativa"],
i:["Anclaje","Autonomía","Módulos"]});
F("FUT","Hábitat submarino",{w:"Para investigación o turismo bajo el agua.",
q:[["¿Presión?","Diseño."],["¿Aire?","Soporte vital."],["¿Acceso?","Buceo o cápsula."],["¿Ejemplos?","Hoteles submarinos en Maldivas."]],
p:["Experiencia","Ciencia","Innovación"],c:["Costos","Riesgo","Mantenimiento"],
i:["Estructura","Soporte vital","Evacuación"]});
F("FUT","Hábitat lunar / marciano",{w:"Para asentamientos fuera de la Tierra.",
q:[["¿Material?","Regolito impreso."],["¿Radiación?","Protección."],["¿Presión?","Interna."],["¿Estado?","Investigación."]],
p:["Frontera","Innovación","Tecnologías derivadas"],c:["Costos","Riesgo","Tecnología"],
i:["Radiación","Presión","Autonomía"]});
F("FUT","Hotel espacial",{w:"Para turismo orbital.",
q:[["¿Gravedad?","Cero."],["¿Soporte vital?","Total."],["¿Estado?","Proyectos."],["¿Costo?","Muy alto."]],
p:["Experiencia única","Innovación","Mercado futuro"],c:["Costos","Riesgo","Tecnología"],
i:["Gravedad cero","Soporte vital","Acoplamiento"]});
F("FUT","Edificio adaptable / reconvertible",{w:"Para cambiar de uso sin demoler.",
q:[["¿Cómo?","Alturas y cargas generosas, núcleos flexibles."],["¿Costo?","Algo mayor."],["¿Beneficio?","Vida útil."],["¿Tendencia?","Oficina a vivienda."]],
p:["Vida útil larga","Sostenible","Flexible"],c:["Costo inicial","Diseño","Normativa"],
i:["Alturas","Cargas","Fachada modular"]});
F("FUT","Hub de drones",{w:"Para logística con drones.",
q:[["¿Espacio aéreo?","Regulación."],["¿Recarga?","Sí."],["¿Seguridad?","Sí."],["¿Ubicación?","Urbana."]],
p:["Rapidez","Innovación","Logística"],c:["Normativa","Ruido","Privacidad"],
i:["Recarga","Seguridad","Plataformas"]});
F("FUT","Torre de captura de carbono",{w:"Para filtrar CO₂ del aire.",
q:[["¿Energía?","Necesaria."],["¿Almacenamiento?","Del CO₂."],["¿Estado?","Prototipos."],["¿Paisaje?","Integración."]],
p:["Clima","Innovación","Imagen"],c:["Energía","Costos","Escala"],
i:["Energía","Almacenamiento","Paisaje"]});
F("FUT","Centro logístico autónomo",{w:"Para almacenes operados por robots.",
q:[["¿Luz?","Mínima."],["¿Personal?","Mínimo."],["¿Energía?","Alta."],["¿Seguridad?","Sí."]],
p:["Eficiencia","24 h","Escala"],c:["Inversión","Empleo","Tecnología"],
i:["Robots","Energía","Seguridad"]});
F("FUT","Estación de intercambio de baterías",{w:"Para cambiar baterías de vehículos eléctricos.",
q:[["¿Tiempo?","Minutos."],["¿Automatización?","Sí."],["¿Almacenamiento?","Baterías."],["¿Estándar?","Por marca."]],
p:["Rapidez","Innovación","Eficiencia"],c:["Estandarización","Costos","Seguridad"],
i:["Automatización","Ventilación","Seguridad"]});
F("FUT","Refugio climático",{w:"Para protegerse de olas de calor.",
q:[["¿Climatización?","Sí."],["¿Agua?","Sí."],["¿Accesibilidad?","Total."],["¿Uso normal?","Biblioteca o centro comunitario."]],
p:["Resiliencia","Salud","Comunidad"],c:["Energía","Gestión","Uso esporádico"],
i:["Climatización","Agua","Accesibilidad"]});
