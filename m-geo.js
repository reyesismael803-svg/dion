window.FLUJO_M = window.FLUJO_M || [];
FLUJO_M.push({
  id: "geo",
  orden: 5,
  n: "Geometría descriptiva y perspectiva",
  corto: "Geometría D.",
  para: "Es la ciencia de representar el espacio tridimensional en el plano con exactitud y de resolver problemas espaciales por procedimientos gráficos. En el flujo entra cuando el partido formal ya existe: define el sistema de representación, resuelve cubiertas, intersecciones, verdaderas magnitudes, sombras y perspectivas, y produce la documentación gráfica y las piezas para fabricación.",
  indice: [
    { t: "Unidad 1 · Fundamentos y sistemas de representación", items: [
      { t: "1.1 Proyección", sub: ["1.1.1 Elementos: centro de proyección, rayo proyectante, plano de proyección, objeto.", "1.1.2 Proyección cónica o central (centro a distancia finita) y cilíndrica o paralela (centro en el infinito).", "1.1.3 Cilíndrica ortogonal (rayos perpendiculares al plano) y oblicua.", "1.1.4 Invariantes proyectivos: incidencia, paralelismo (solo en paralela), razón simple (solo en paralela)."] },
      { t: "1.2 Sistema diédrico o de Monge", sub: ["1.2.1 Gaspard Monge, Géométrie descriptive (1799): dos planos perpendiculares (horizontal y vertical) y línea de tierra.", "1.2.2 Proyección horizontal (planta) y vertical (alzado); tercer plano de perfil (vista lateral).", "1.2.3 Cuadrantes y posiciones del punto.", "1.2.4 Métodos del primer diedro (europeo, ISO E) y tercer diedro (americano, ISO A)."], mundo: "Mundo: ISO 128-30 / ISO 5456-2 regulan la proyección ortogonal; EE. UU. usa tercer diedro, Europa y Latinoamérica mayoritariamente primer diedro.", ec: "Ecuador: la enseñanza y la práctica usan primer diedro con convenciones de planta-alzado-corte; las NTE INEN de dibujo técnico derivan de ISO." },
      { t: "1.3 Sistema acotado (planos acotados)", sub: ["1.3.1 Una sola proyección horizontal más cotas de altura.", "1.3.2 Escala de pendiente, intervalo, módulo, recta de máxima pendiente.", "1.3.3 Aplicaciones: topografía, curvas de nivel, explanaciones (desmonte y terraplén), cubiertas, vías."], ec: "Ecuador: la cartografía del IGM y los levantamientos topográficos de terrenos entregan curvas de nivel; el sistema acotado es la base de implantación y movimiento de tierras." },
      { t: "1.4 Sistema axonométrico", sub: ["1.4.1 Axonometría ortogonal: isométrica (tres ejes a 120°, coeficientes iguales ≈0,816; en la práctica se dibuja a escala 1), dimétrica (dos coeficientes iguales), trimétrica (tres distintos).", "1.4.2 Axonometría oblicua: perspectiva caballera (plano frontal en verdadera magnitud, eje de fugas a 30°/45° con coeficiente de reducción 1/2, 2/3 o 3/4).", "1.4.3 Perspectiva militar o planométrica: planta en verdadera magnitud girada (30°/60° o 45°) y alturas verticales; muy usada en arquitectura (axonometría 'de planta').", "1.4.4 Axonometría explotada, seccionada y de despiece.", "1.4.5 Vista de gusano (desde abajo, Choisy)."], raro: "Poco común: Auguste Choisy (Historia de la arquitectura, 1899) popularizó la axonometría 'en contrapicado' que une planta, sección y volumen; la vanguardia De Stijl (Van Doesburg) la convirtió en manifiesto." },
      { t: "1.5 Sistema cónico (perspectiva lineal)", sub: ["1.5.1 Elementos: punto de vista (PV), plano del cuadro (PC), plano geometral (PG), línea de tierra (LT), línea de horizonte (LH), punto principal (P), distancia principal, cono visual (≈60°).", "1.5.2 Puntos de fuga, rectas límite, puntos métricos.", "1.5.3 Tipos: frontal (1 punto de fuga), oblicua (2 puntos), aérea/de tres puntos (vertical fugada)."] },
      "1.6 Otros sistemas — proyección estereográfica (cartas solares), proyección gnomónica, anamorfosis, perspectiva curvilínea y esférica (panoramas 360°, realidad virtual)."
    ]},
    { t: "Unidad 2 · Elementos: punto, recta y plano", items: [
      { t: "2.1 Punto", sub: ["2.1.1 Proyecciones, cota y alejamiento.", "2.1.2 Punto en los bisectores."] },
      { t: "2.2 Recta", sub: ["2.2.1 Trazas de la recta.", "2.2.2 Posiciones: horizontal, frontal, de punta, vertical, paralela a la LT, de perfil, oblicua.", "2.2.3 Partes vistas y ocultas; cuadrantes que atraviesa."] },
      { t: "2.3 Plano", sub: ["2.3.1 Trazas del plano; determinación por tres puntos, recta y punto, dos rectas que se cortan o paralelas.", "2.3.2 Posiciones: horizontal, frontal, proyectante horizontal/vertical, paralelo a LT, que pasa por LT, oblicuo.", "2.3.3 Rectas notables del plano: horizontales, frontales, de máxima pendiente, de máxima inclinación."] },
      { t: "2.4 Relaciones", sub: ["2.4.1 Pertenencia.", "2.4.2 Intersección de planos, de recta y plano.", "2.4.3 Paralelismo.", "2.4.4 Perpendicularidad (recta-plano, plano-plano).", "2.4.5 Distancias: punto-punto, punto-recta, punto-plano, entre rectas que se cruzan.", "2.4.6 Ángulos: entre rectas, recta-plano, entre planos, con los planos de proyección."] }
    ]},
    { t: "Unidad 3 · Métodos para obtener verdaderas magnitudes", items: [
      "3.1 Concepto — solo las figuras paralelas al plano de proyección se ven en verdadera magnitud (VM); cubiertas inclinadas, rampas y fachadas oblicuas aparecen deformadas y su área real es mayor que la proyectada.",
      { t: "3.2 Abatimientos", sub: ["3.2.1 Girar el plano alrededor de una de sus trazas (charnela) hasta hacerlo coincidir con un plano de proyección.", "3.2.2 Triángulo de abatimiento; afinidad entre proyección y abatimiento.", "3.2.3 Desabatimiento para volver a las proyecciones."] },
      { t: "3.3 Giros", sub: ["3.3.1 Rotación del elemento alrededor de un eje perpendicular a un plano de proyección.", "3.3.2 Aplicación: VM de un segmento (longitud real de una arista de cubierta o de una rampa)."] },
      { t: "3.4 Cambios de plano", sub: ["3.4.1 Sustituir un plano de proyección por otro nuevo paralelo al elemento.", "3.4.2 Vistas auxiliares: primaria y secundaria.", "3.4.3 Aplicación: VM de caras oblicuas, ángulo diedro real entre faldones."] },
      "3.5 Fórmula de control — longitud real = √(proyección horizontal² + desnivel²); área real de faldón = área en planta / cos(α), donde α es el ángulo de la pendiente. Sirve para verificar cantidades de cubierta y para cotizar."
    ]},
    { t: "Unidad 4 · Superficies, sólidos, secciones e intersecciones", items: [
      { t: "4.1 Poliedros y superficies de revolución", sub: ["4.1.1 Poliedros regulares (platónicos) y semirregulares; prismas y pirámides.", "4.1.2 Cilindro, cono, esfera, toro.", "4.1.3 Representación en diédrico y axonométrico."] },
      { t: "4.2 Secciones planas", sub: ["4.2.1 Sección de prismas y pirámides por un plano: polígono sección y su VM.", "4.2.2 Secciones cónicas: elipse, parábola, hipérbola según ángulo del plano.", "4.2.3 Sección de cilindro y esfera.", "4.2.4 Uso arquitectónico: plantas y cortes son secciones planas del edificio."] },
      { t: "4.3 Intersecciones", sub: ["4.3.1 Intersección de dos planos (arista).", "4.3.2 Intersección recta-sólido (puntos de entrada y salida).", "4.3.3 Intersección de sólidos: prisma-prisma, prisma-pirámide, cilindro-cilindro (bóvedas de arista), cono-cilindro; métodos de planos auxiliares y esferas auxiliares.", "4.3.4 Penetración vs. mordedura (una o dos líneas de intersección).", "4.3.5 Uso: encuentros de volúmenes del partido, lucernarios, bóvedas, tuberías."] },
      { t: "4.4 Desarrollo de superficies", sub: ["4.4.1 Superficies desarrollables: poliedros, cilindro, cono, superficies tangenciales.", "4.4.2 No desarrollables: esfera, toro, paraboloides (se aproximan por husos o triangulación).", "4.4.3 Transformada de la sección en el desarrollo.", "4.4.4 Uso: patrones de corte de chapa, planchas, lonas, encofrados, maquetas."] },
      { t: "4.5 Curvas y superficies regladas", sub: ["4.5.1 Curvas: cónicas, hélice (escaleras helicoidales), espiral, catenaria, cicloide.", "4.5.2 Superficie reglada: generada por una recta que se desplaza.", "4.5.3 Paraboloide hiperbólico (hypar): doble curvatura negativa, doblemente reglado; se encofra con tablas rectas.", "4.5.4 Hiperboloide de una hoja: reglado, torres de enfriamiento, Gaudí, torre Shújov.", "4.5.5 Conoide: recta que se apoya en una recta directriz y una curva; cubiertas en diente de sierra, Escuelas de la Sagrada Familia (Gaudí).", "4.5.6 Helicoide, cilindroide."], mundo: "Mundo: Félix Candela (México) — Restaurante Los Manantiales (Xochimilco, 1958, ocho sectores de paraboloide hiperbólico), Pabellón de Rayos Cósmicos (UNAM, cáscara de ~1,5 cm), Iglesia de la Medalla Milagrosa; Vladímir Shújov, torres hiperboloides de acero.", raro: "Poco común: Uruguay — Eladio Dieste usó superficies regladas y 'bóvedas gausas' de ladrillo armado; España — L'Oceanogràfic de Valencia (Candela, 2003) fue su última obra." }
    ]},
    { t: "Unidad 5 · Cubiertas", items: [
      { t: "5.1 Conceptos", sub: ["5.1.1 Faldón (agua): plano inclinado; todos los faldones con la misma pendiente en el método clásico.", "5.1.2 Alero, cornisa, línea de alero.", "5.1.3 Cumbrera (limatesa horizontal), limatesa (arista saliente inclinada), limahoya (arista entrante, recoge agua), lima, canalón.", "5.1.4 Hastial/piñón (faldón vertical), buhardilla, lucernario."] },
      { t: "5.2 Resolución de cubiertas en sistema acotado", sub: ["5.2.1 Con igual pendiente, la intersección de dos faldones se proyecta sobre la bisectriz del ángulo que forman sus aleros (limatesa en ángulo convexo, limahoya en ángulo cóncavo).", "5.2.2 Aleros paralelos generan cumbrera horizontal a media distancia.", "5.2.3 Método: dibujar bisectrices, prolongar, encontrar los nudos donde concurren tres faldones y continuar hasta cerrar.", "5.2.4 Pendientes distintas: líneas de nivel de cada faldón (mismo intervalo de cota) y su intersección.", "5.2.5 Patios, cubiertas con desniveles de alero, cubiertas con hastiales."] },
      { t: "5.3 Pendiente y material", sub: ["5.3.1 Pendiente en %, grados o relación; la mínima depende del material y del fabricante.", "5.3.2 Teja cerámica: pendientes altas; fibrocemento y metálicas (tipo 'steel panel'/galvalume): bajas; losa plana: mínima para evacuación y con impermeabilización."], ec: "Ecuador: en costa las lluvias intensas de la temporada invernal (dic.–may.) exigen pendientes y canalones generosos; los fabricantes locales publican pendiente mínima y traslapes. Consulta intensidades del INAMHI para dimensionar desagües.", raro: "Poco común: Japón y Escandinavia — pendientes muy pronunciadas por nieve; Indonesia — cubiertas Tongkonan en forma de barca, geometría de doble curvatura con caña." },
      "5.4 Verificación — área real de cubierta (VM), longitud de limas y cumbreras, número de piezas, recorrido del agua hasta bajantes."
    ]},
    { t: "Unidad 6 · Sombras", items: [
      { t: "6.1 Conceptos", sub: ["6.1.1 Sombra propia (cara no iluminada del objeto) y arrojada (proyectada sobre otra superficie).", "6.1.2 Separatriz: línea que divide luz y sombra propia; su sombra es el contorno de la sombra arrojada.", "6.1.3 Foco puntual (sombra cónica) vs. foco impropio (sol, rayos paralelos)."] },
      { t: "6.2 Sombras en diédrico y axonométrico", sub: ["6.2.1 Rayo convencional a 45° (dirección de la diagonal del cubo) para fachadas: la sombra revela profundidad = voladizo.", "6.2.2 Sombra de punto, recta, plano, sólidos sobre planos de proyección y sobre otros sólidos.", "6.2.3 Sombra de voladizos, aleros, balcones, escaleras, nichos."] },
      { t: "6.3 Sombras con dirección solar real", sub: ["6.3.1 Posición solar: acimut y altura, función de latitud, fecha y hora (declinación, ecuación del tiempo).", "6.3.2 Carta solar estereográfica o cilíndrica; transportador de sombras (ángulo de sombra vertical y horizontal).", "6.3.3 Sombras en solsticios (21 jun y 21 dic) y equinoccios (≈20 mar y 22 sep) a 9:00, 12:00 y 15:00 como mínimo.", "6.3.4 Máscaras de sombra y diseño de protecciones solares."], ec: "Ecuador: en la línea ecuatorial el sol pasa cerca del cenit en los equinoccios y se desplaza al norte (junio) y al sur (diciembre) unos 23,4°; las fachadas este y oeste son las más castigadas, y las norte y sur se protegen con aleros horizontales cortos.", raro: "Poco común: en latitudes altas (Escandinavia) las sombras de invierno son tan largas que la normativa de derecho a la luz regula alturas; en Londres existe el 'Right to Light'." },
      "6.4 Sombras en perspectiva — punto de fuga de los rayos solares y de sus proyecciones; sol de frente, a la espalda o lateral.",
      "6.5 Reflejos — imagen simétrica respecto de la superficie reflectante (agua, vidrio) en perspectiva."
    ]},
    { t: "Unidad 7 · Perspectiva cónica", items: [
      { t: "7.1 Perspectiva de un punto de fuga (frontal/paralela)", sub: ["7.1.1 Un plano del objeto paralelo al cuadro; profundidades fugan a P.", "7.1.2 Uso: interiores, calles, corredores, secciones perspectivadas."] },
      { t: "7.2 Perspectiva de dos puntos de fuga (oblicua/angular)", sub: ["7.2.1 Verticales paralelas; dos familias de horizontales fugan a F1 y F2 en la LH.", "7.2.2 Uso: exteriores de esquina, vistas peatonales."] },
      { t: "7.3 Perspectiva de tres puntos de fuga", sub: ["7.3.1 Cuadro inclinado: las verticales también fugan (arriba en contrapicado, abajo en picado).", "7.3.2 Uso: vistas aéreas y de edificios altos."] },
      { t: "7.4 Métodos de construcción", sub: ["7.4.1 Método del arquitecto (de las intersecciones o de las visuales): planta y alzado, rayos desde el punto de vista cortan el cuadro.", "7.4.2 Método de los puntos métricos (de medición): trasladar medidas reales desde la LT con puntos métricos M1, M2.", "7.4.3 Método de la cuadrícula: retícula en perspectiva, luego se ubica el objeto.", "7.4.4 Método de las diagonales para dividir profundidades; división proporcional con el teorema de Tales.", "7.4.5 Perspectiva por restitución (a partir de una fotografía, para fotomontajes)."] },
      { t: "7.5 Parámetros que controla el arquitecto", sub: ["7.5.1 Altura del horizonte: 1,50–1,60 m para peatonal; alta para aérea; baja para monumentalidad.", "7.5.2 Distancia al cuadro y ángulo del cono visual (evitar deformación fuera de ~60°).", "7.5.3 Posición del punto de vista respecto al objeto (encuadre)."] },
      { t: "7.6 Perspectiva a mano alzada", sub: ["7.6.1 Encaje: horizonte, puntos de fuga (a menudo fuera del papel), proporción por la figura humana (la cabeza de las personas sobre la LH en vista peatonal).", "7.6.2 Línea: jerarquía de trazo, primer plano vs. fondo.", "7.6.3 Valor y sombra para volumen; perspectiva atmosférica.", "7.6.4 Croquis urbano (urban sketching) y bitácora."], raro: "Poco común: el movimiento Urban Sketchers (fundado en 2007 por Gabriel Campanario) tiene capítulos en Quito y Guayaquil." }
    ]},
    { t: "Unidad 8 · Normas de dibujo y representación", items: [
      { t: "8.1 Normas", sub: ["8.1.1 ISO 128 (principios de presentación, tipos y grosores de línea).", "8.1.2 ISO 5455 (escalas), ISO 5457 (formatos y marco), ISO 7200 (cuadro de rotulación), ISO 3098 (escritura), ISO 129 (acotación), ISO 4157 (designación de edificios y partes).", "8.1.3 Formatos serie A (A0 841×1189 mm … A4 210×297 mm)."], ec: "Ecuador: el INEN adoptó normas de dibujo técnico derivadas de ISO; además, cada municipio exige formato de láminas, cuadro de firmas, escalas y archivos digitales para permisos (consulta la ordenanza o el instructivo de aprobación de planos de {canton}).", mundo: "Mundo: EE. UU. usa el National CAD Standard (AIA/ CSI) y formatos ANSI; Reino Unido BS 1192 → ISO 19650 para nomenclatura de archivos." },
      { t: "8.2 Escalas", sub: ["8.2.1 Urbanas: 1:5000, 1:2000, 1:1000, 1:500.", "8.2.2 Anteproyecto: 1:200, 1:100.", "8.2.3 Proyecto: 1:100, 1:50.", "8.2.4 Detalle: 1:20, 1:10, 1:5, 1:2, 1:1.", "8.2.5 Escala gráfica obligatoria cuando se reproduce en otro tamaño."] },
      { t: "8.3 Líneas y grafismo", sub: ["8.3.1 Continua gruesa: elementos cortados.", "8.3.2 Continua media/fina: elementos vistos, cotas.", "8.3.3 Discontinua: ocultos o sobre el plano de corte.", "8.3.4 Trazo y punto: ejes y planos de corte.", "8.3.5 Achurados por material; poché."] },
      { t: "8.4 Rotulado y acotación", sub: ["8.4.1 Cajetín: proyecto, propietario, profesional y registro, contenido, escala, fecha, lámina N/M, código.", "8.4.2 Cotas parciales, totales y a ejes; niveles (N+0,00) en planta y corte.", "8.4.3 Norte, simbología, leyendas, referencias de corte y detalle."] }
    ]},
    { t: "Unidad 9 · Herramientas digitales", items: [
      { t: "9.1 Software", sub: ["9.1.1 CAD 2D: AutoCAD, BricsCAD, DraftSight.", "9.1.2 Modelado: SketchUp, Rhinoceros (NURBS, superficies regladas), Blender.", "9.1.3 BIM: Revit, ArchiCAD — vistas, cortes, axonometrías y sombras generadas del modelo.", "9.1.4 Paramétrico: Grasshopper (Ladybug para sol y sombra), Dynamo.", "9.1.5 Render y visualización: Enscape, Twinmotion, V-Ray, D5, Lumion.", "9.1.6 Dibujo digital a mano: Procreate, Morpholio Trace, Concepts."] },
      "9.2 Geometría digital — NURBS, mallas poligonales, desarrollo de superficies (Rhino: comando Unroll/Smash), análisis de curvatura, panelización.",
      "9.3 Fabricación digital — corte láser y CNC a partir de desarrollos, impresión 3D para maquetas, planos de corte con nesting.",
      "9.4 Sol y sombras digitales — ubicación geográfica y huso horario correctos (Ecuador continental UTC−5, Galápagos UTC−6); verificar el norte del proyecto (verdadero vs. magnético)."
    ]}
  ],
  fases: [
    { n: "Fase 0 · Estándar gráfico y sistema de representación", pasos: [
      { id: "geo-01", t: "Definir el estándar gráfico del proyecto (plantilla de oficina)",
        d: "- 1.1 Formato de lámina (A1/A3), márgenes, cajetín con datos del proyecto y del profesional.\n- 1.2 Tabla de grosores y tipos de línea por categoría (cortado, visto, oculto, ejes).\n- 1.3 Achurados por material, tipografía y tamaños de texto por escala.\n- 1.4 Simbología (norte, niveles, cortes, detalles, puertas, ventanas).\n- 1.5 Nomenclatura de archivos y capas/layers (ISO 13567 o ISO 19650 si es BIM).\n- 1.6 Guarda como plantilla (DWT / RTE / PLN).",
        ec: "Revisa el instructivo municipal de presentación de planos de {canton} (formato, cuadro de firmas, escalas mínimas, archivos digitales exigidos).",
        sale: "Plantilla gráfica del proyecto y manual de estilo de una página.", tags: ["doc", "bim"],
        fuentes: ["iso19650", "ec:inen", "q:requisitos presentación de planos {canton}"] },
      { id: "geo-02", t: "Definir sistemas de representación y escalas por fase",
        d: "- 2.1 Lista de productos gráficos: implantación, plantas, cortes, fachadas, axonometrías, perspectivas, detalles.\n- 2.2 Para cada uno: sistema (diédrico, acotado, axonométrico, cónico) y escala.\n- 2.3 Distingue concepto (1:500–1:200), anteproyecto (1:200–1:100), proyecto (1:100–1:50), detalle (1:20–1:1).",
        sale: "Tabla de productos gráficos con sistema y escala.", tags: ["doc"] },
      { id: "geo-03", t: "Armar el índice de láminas (listado de planos)",
        d: "- 3.1 Código por disciplina (A arquitectura, E estructura, IS/IE/IM instalaciones).\n- 3.2 Número, título, escala, fase, fecha de emisión.\n- 3.3 Orden de lectura: ubicación → implantación → plantas → cortes → fachadas → axonometrías → perspectivas → detalles.",
        sale: "Listado maestro de láminas.", tags: ["doc"] }
    ]},
    { n: "Fase 1 · Sitio y topografía (sistema acotado)", pasos: [
      { id: "geo-04", t: "Representar el terreno en sistema acotado con curvas de nivel",
        d: "- 4.1 Obtén el levantamiento topográfico (curvas cada 0,50 o 1,00 m) georreferenciado.\n- 4.2 Si no existe, usa cartografía base del IGM o modelos digitales de elevación solo para anteproyecto.\n- 4.3 Identifica pendientes, escorrentías, puntos altos y bajos.",
        ec: "Para permisos se exige levantamiento topográfico firmado por profesional; la cartografía IGM (1:50 000, 1:25 000 y la base 1:5000 en zonas urbanas) sirve para estudio preliminar.",
        sale: "Plano topográfico acotado del terreno.", tags: ["dis", "doc"],
        fuentes: ["ec:igm", "earth", "osm"] },
      { id: "geo-05", t: "Resolver plataformas, taludes y movimiento de tierras",
        d: "- 5.1 Define cotas de plataformas del edificio y exteriores.\n- 5.2 Traza taludes de desmonte y terraplén con su pendiente (escala de pendiente).\n- 5.3 Encuentra las líneas de intersección talud-terreno.\n- 5.4 Estima volúmenes de corte y relleno (método de secciones).",
        sale: "Plano de explanaciones con taludes y cortes transversales.", tags: ["dis"] },
      { id: "geo-06", t: "Trazar rampas y verificar su verdadera magnitud y pendiente",
        d: "- 6.1 Proyección horizontal y desnivel de cada tramo.\n- 6.2 Pendiente = desnivel / longitud horizontal; longitud real = √(L² + h²).\n- 6.3 Verifica pendientes máximas de accesibilidad y descansos.\n- 6.4 Rampas vehiculares: pendientes y curvas de transición.",
        ec: "Accesibilidad al medio físico: NTE INEN 2245 (rampas) y normas afines; revisar los límites de pendiente por longitud de tramo y los descansos exigidos.",
        sale: "Tabla de rampas con pendiente, longitud real y cumplimiento.", tags: ["dis"],
        fuentes: ["ec:inen"] }
    ]},
    { n: "Fase 2 · Resolución geométrica del volumen", pasos: [
      { id: "geo-07", t: "Resolver las intersecciones entre los volúmenes del partido",
        d: "- 7.1 Modela los volúmenes en diédrico o 3D.\n- 7.2 Obtén las líneas de intersección (planos auxiliares o booleanas en el software).\n- 7.3 Verifica que las aristas resultantes sean construibles (encuentro de muros, juntas, impermeabilización).\n- 7.4 Dibuja las intersecciones en planta, alzado y axonometría.",
        sale: "Lámina de intersecciones de volúmenes.", tags: ["dis"] },
      { id: "geo-08", t: "Resolver geométricamente las cubiertas",
        d: "- 8.1 Dibuja el contorno de aleros en planta.\n- 8.2 Fija la pendiente según el material y la lluvia local.\n- 8.3 Traza bisectrices, cumbreras, limatesas y limahoyas (o líneas de nivel si las pendientes difieren).\n- 8.4 Evita limahoyas contra muros y zonas donde el agua quede atrapada.\n- 8.5 Ubica canalones y bajantes siguiendo el recorrido del agua.",
        ec: "Dimensiona desagües con la intensidad de lluvia del INAMHI para la zona y la NEC-HS (hidrosanitaria).",
        sale: "Planta de cubiertas resuelta con pendientes, limas y desagües.", tags: ["dis", "mant"],
        fuentes: ["ec:inamhi", "ec:nec"] },
      { id: "geo-09", t: "Calcular verdaderas magnitudes de faldones y aristas de cubierta",
        d: "- 9.1 Área real de cada faldón = área en planta / cos α.\n- 9.2 Longitud real de limas y cumbreras (giro o cambio de plano).\n- 9.3 Ángulos diedros entre faldones (para piezas de remate).\n- 9.4 Tabla para presupuesto y pedido de material.",
        sale: "Tabla de verdaderas magnitudes de cubierta.", tags: ["dis", "doc"] },
      { id: "geo-10", t: "Verificar verdaderas magnitudes de superficies oblicuas y curvas",
        d: "- 10.1 Fachadas no paralelas a los ejes: vista auxiliar en VM.\n- 10.2 Superficies curvas: desarrollo o área por modelo 3D.\n- 10.3 Escaleras helicoidales y rampas curvas: desarrollo de la hélice para verificar pendiente real.",
        sale: "Vistas auxiliares en VM de las superficies no ortogonales.", tags: ["dis"] },
      { id: "geo-11", t: "Estudiar superficies regladas si el diseño las incluye",
        d: "- 11.1 Define la superficie (paraboloide hiperbólico, hiperboloide, conoide) por sus directrices.\n- 11.2 Genera las generatrices rectas: definen encofrado de tablas, costillas de madera o cables.\n- 11.3 Verifica con el estructural el espesor y los apoyos (superficie activa).\n- 11.4 Maqueta de hilos o impresión 3D.",
        sale: "Definición geométrica de la superficie reglada con generatrices.", tags: ["dis"],
        fuentes: ["q:paraboloide hiperbólico cubierta construcción"] }
    ]},
    { n: "Fase 3 · Sombras y asoleamiento real", pasos: [
      { id: "geo-12", t: "Obtener la trayectoria solar real del sitio",
        d: "- 12.1 Coordenadas exactas del proyecto y norte verdadero.\n- 12.2 Carta solar para la latitud (estereográfica).\n- 12.3 Acimut y altura solar en solsticios y equinoccios a 8:00, 10:00, 12:00, 14:00 y 16:00.\n- 12.4 Tabla de posiciones solares.",
        ec: "En Ecuador (latitud cercana a 0°) el sol está alto todo el año; el problema principal es la radiación este-oeste y la cenital sobre la cubierta.",
        sale: "Carta solar del sitio y tabla de posiciones solares.", tags: ["sost", "dis"],
        fuentes: ["suncalc", "solaratlas", "nasapower"] },
      { id: "geo-13", t: "Dibujar sombras propias y arrojadas del proyecto con el sol real",
        d: "- 13.1 En planta de implantación: sombras del edificio sobre el terreno y los vecinos en las fechas clave.\n- 13.2 En fachadas: sombras de aleros, voladizos y quiebrasoles.\n- 13.3 En axonometría: estudio volumétrico de sombras.\n- 13.4 Compara con las horas de uso de los espacios exteriores.",
        sale: "Lámina de estudio de sombras (fechas y horas clave).", tags: ["sost", "dis"],
        fuentes: ["suncalc"] },
      { id: "geo-14", t: "Dimensionar protecciones solares con máscaras de sombra",
        d: "- 14.1 Para cada fachada, ángulos de sombra vertical y horizontal necesarios.\n- 14.2 Dimensiona aleros, lamas y celosías con geometría (profundidad = altura del vano × tan del ángulo requerido).\n- 14.3 Superpón la máscara de sombra a la carta solar y verifica los periodos protegidos.",
        sale: "Diagramas de máscaras de sombra y dimensiones de protecciones.", tags: ["sost", "dis"],
        fuentes: ["suncalc", "epw", "ashrae"] },
      { id: "geo-15", t: "Simular sol y sombra en el modelo digital",
        d: "- 15.1 Configura ubicación, huso horario (UTC−5 continental) y norte en el software.\n- 15.2 Genera animación o secuencia horaria.\n- 15.3 Si hay Grasshopper/Ladybug, calcula horas de sol y radiación sobre fachadas usando archivo climático EPW.",
        sale: "Secuencia de imágenes o análisis de radiación.", tags: ["sost", "bim"],
        fuentes: ["epw", "meteoblue"] }
    ]},
    { n: "Fase 4 · Axonometrías y perspectivas", pasos: [
      { id: "geo-16", t: "Producir axonometrías explotadas y seccionadas",
        d: "- 16.1 Axonometría explotada por sistemas: estructura, envolvente, cubierta, instalaciones.\n- 16.2 Axonometría seccionada para mostrar la relación espacial interior.\n- 16.3 Axonometría militar desde la planta para explicar el partido.\n- 16.4 Etiquetas y numeración de componentes.",
        sale: "Láminas de axonometrías (explotada, seccionada, militar).", tags: ["dis", "doc"] },
      { id: "geo-17", t: "Definir y construir perspectivas peatonales",
        d: "- 17.1 Elige 3–5 puntos de vista que el usuario realmente vivirá (llegada, acceso, espacio principal, patio).\n- 17.2 Horizonte a 1,50–1,60 m; cono visual ≤ 60°.\n- 17.3 Construye a mano (método del arquitecto o puntos métricos) o en el modelo con cámara real.\n- 17.4 Incluye figuras humanas y vegetación a escala.",
        sale: "Perspectivas peatonales clave.", tags: ["dis"] },
      { id: "geo-18", t: "Producir perspectivas aéreas y de tres puntos de fuga",
        d: "- 18.1 Vista aérea para implantación y relación con el entorno.\n- 18.2 Tres puntos de fuga si el edificio es alto.\n- 18.3 Controla la deformación (evitar ángulos extremos).",
        sale: "Perspectivas aéreas del conjunto.", tags: ["dis"],
        fuentes: ["earth"] },
      { id: "geo-19", t: "Hacer croquis de perspectiva a mano alzada del proceso",
        d: "- 19.1 Croquis rápidos en visita de sitio y en reuniones con el cliente.\n- 19.2 Perspectivas de interiores de un punto de fuga para validar escala.\n- 19.3 Guarda todos en la bitácora con fecha.",
        sale: "Bitácora de croquis en perspectiva.", tags: ["dis", "doc"] },
      { id: "geo-20", t: "Restituir perspectiva para fotomontajes en el sitio",
        d: "- 20.1 Toma fotos del sitio con altura de cámara y ubicación registradas.\n- 20.2 Encuentra horizonte y puntos de fuga en la foto.\n- 20.3 Coloca el modelo con la misma cámara (match photo en SketchUp, cámara en Blender).",
        sale: "Fotomontajes realistas de inserción.", tags: ["dis"],
        fuentes: ["maps"] }
    ]},
    { n: "Fase 5 · Fabricación, verificación y archivo", pasos: [
      { id: "geo-21", t: "Desarrollar superficies para fabricación y maquetas",
        d: "- 21.1 Desarrolla (Unroll) las superficies desarrollables: chapas, planchas, lonas, encofrados.\n- 21.2 Aproxima las no desarrollables por paneles planos o husos.\n- 21.3 Añade pestañas, numeración y sentido de montaje.\n- 21.4 Optimiza el corte (nesting) y exporta a DXF para láser/CNC.",
        sale: "Planos de desarrollo y archivos de corte.", tags: ["dis", "doc"] },
      { id: "geo-22", t: "Verificar geometría y coherencia entre vistas",
        d: "- 22.1 Checklist: plantas, cortes y fachadas coinciden en ejes, niveles y dimensiones.\n- 22.2 Cortes pasan por los lugares correctos y están referenciados.\n- 22.3 Cubiertas coinciden en planta, cortes y fachadas.\n- 22.4 Si es BIM, detección de interferencias básicas.",
        sale: "Checklist de coherencia gráfica firmado.", tags: ["doc", "bim"] },
      { id: "geo-23", t: "Aplicar el estándar gráfico y rotular todas las láminas",
        d: "- 23.1 Cajetín completo, escala numérica y gráfica, norte, fecha y versión.\n- 23.2 Grosores de línea verificados en impresión de prueba.\n- 23.3 Exporta PDF vectorial y archivos nativos.",
        ec: "Para aprobación municipal, verifica que el cuadro de firmas incluya los registros profesionales exigidos (SENESCYT/colegio) y que las escalas cumplan el instructivo de {canton}.",
        sale: "Juego de láminas rotuladas en PDF.", tags: ["doc"],
        fuentes: ["q:instructivo aprobación de planos {canton}"] },
      { id: "geo-24", t: "Archivar los productos gráficos en el expediente",
        d: "- 24.1 Carpeta 03_Representacion: plantillas, láminas, modelos 3D, archivos de sol, fotos, desarrollos.\n- 24.2 Control de versiones (fecha_versión_contenido).\n- 24.3 Respaldo en nube y local.",
        sale: "Carpeta de representación completa y versionada.", tags: ["doc"],
        fuentes: ["iso19650"] }
    ]}
  ]
});
