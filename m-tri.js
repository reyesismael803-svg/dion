window.FLUJO_M = window.FLUJO_M || [];
FLUJO_M.push({
  id: "tri",
  orden: 8,
  n: "Geometría y trigonometría",
  corto: "Trigonometría",
  para: "Es la herramienta de medición y control del proyecto: con ella se calcula el área real del terreno, se verifican linderos, pendientes, rampas, escaleras, cubiertas, protecciones solares y replanteo. Se usa justo después del levantamiento del terreno y reaparece en cada decisión geométrica del anteproyecto, el proyecto técnico y la obra.",
  indice: [
    { t: "Unidad 1 · Geometría plana", items: [
      "1.1 Elementos primitivos — punto, recta, semirrecta, segmento, plano; posiciones relativas (paralelas, perpendiculares, secantes) y su construcción con regla y compás, base del dibujo técnico y del trazado en obra.",
      { t: "1.2 Ángulos", sub: [
        "1.2.1 Sistemas de medida: sexagesimal (°, ′, ″), centesimal (gon/grados g, usado por algunas estaciones totales) y radianes (π rad = 180°); conversión obligatoria antes de usar calculadora o Excel (las funciones trigonométricas de Excel trabajan en radianes).",
        "1.2.2 Clasificación: agudo, recto, obtuso, llano, cóncavo; complementarios (suman 90°) y suplementarios (suman 180°).",
        "1.2.3 Ángulos entre paralelas cortadas por una secante: alternos internos/externos, correspondientes, conjugados; aplicación a verificar paralelismo de linderos y ejes.",
        "1.2.4 Rumbo y azimut: azimut medido desde el Norte en sentido horario (0–360°); rumbo por cuadrantes (N 35° E); conversión entre ambos, clave para leer escrituras y planos catastrales."
      ]},
      { t: "1.3 Triángulos", sub: [
        "1.3.1 Clasificación por lados (equilátero, isósceles, escaleno) y por ángulos (acutángulo, rectángulo, obtusángulo); suma de ángulos interiores = 180°.",
        "1.3.2 Rectas y puntos notables: mediatrices (circuncentro), bisectrices (incentro), alturas (ortocentro), medianas (baricentro = centroide de la lámina triangular, 2/3 desde el vértice).",
        "1.3.3 Congruencia (LLL, LAL, ALA) y semejanza (AA, LAL, LLL); teorema de Tales; aplicación a escalas, perspectivas y medición indirecta de alturas por sombras.",
        "1.3.4 Teorema de Pitágoras y su recíproco; ternas pitagóricas (3-4-5, 5-12-13, 8-15-17) para escuadrar en obra con cinta métrica."
      ]},
      { t: "1.4 Polígonos", sub: [
        "1.4.1 Regulares e irregulares; suma de ángulos interiores = (n−2)·180°; ángulo central = 360°/n; apotema.",
        "1.4.2 Cuadriláteros: paralelogramos, trapecios, trapezoides; propiedades de diagonales; terrenos urbanos casi siempre son cuadriláteros irregulares.",
        "1.4.3 Descomposición de un polígono irregular en triángulos (triangulación) para calcular su área."
      ]},
      { t: "1.5 Circunferencia y círculo", sub: [
        "1.5.1 Elementos: radio, diámetro, cuerda, arco, flecha (sagita), tangente, secante; longitud L = 2πr; arco s = r·θ (θ en rad).",
        "1.5.2 Ángulos en la circunferencia: central, inscrito (mitad del central), semiinscrito; cuerda c = 2r·sen(θ/2); flecha f = r(1 − cos(θ/2)).",
        "1.5.3 Aplicación: curvas de ochave/esquinas redondeadas en linderos, radios de giro vehiculares, escaleras helicoidales, arcos y bóvedas."
      ]},
      { t: "1.6 Cónicas y curvas técnicas", sub: [
        "1.6.1 Elipse, parábola, hipérbola: definición focal y ecuación; la parábola es la forma de un cable con carga uniforme horizontal y del arco funicular de carga uniforme.",
        "1.6.2 Catenaria (y = a·cosh(x/a)): forma del cable bajo peso propio; su inversión da el arco funicular puro (Gaudí, Frei Otto).",
        "1.6.3 Espirales (Arquímedes, logarítmica) y óvalos de varios centros; trazado de rampas helicoidales y curvas de transición vial."
      ]}
    ]},
    { t: "Unidad 2 · Geometría del espacio, áreas y volúmenes", items: [
      "2.1 Posiciones de rectas y planos en el espacio; ángulo diedro; proyecciones ortogonales (base del sistema diédrico: planta, alzado, perfil).",
      { t: "2.2 Poliedros y cuerpos redondos", sub: [
        "2.2.1 Prisma: V = Ab·h; pirámide y cono: V = Ab·h/3; tronco de pirámide: V = h/3·(A1 + A2 + √(A1·A2)).",
        "2.2.2 Cilindro V = πr²h; esfera V = 4/3·πr³, A = 4πr²; casquete esférico (cúpulas).",
        "2.2.3 Teorema de Euler para poliedros convexos: C + V = A + 2; sólidos platónicos y cúpulas geodésicas.",
        "2.2.4 Superficies regladas: paraboloide hiperbólico (hypar), hiperboloide de una hoja, conoide; se construyen con rectas (encofrados de tablas rectas)."
      ]},
      { t: "2.3 Áreas y volúmenes aplicados", sub: [
        "2.3.1 Área de polígono por coordenadas (fórmula del agrimensor o de Gauss / shoelace): A = ½·|Σ(xi·yi+1 − xi+1·yi)|.",
        "2.3.2 Fórmula de Herón para triángulos conociendo sus tres lados: A = √(s(s−a)(s−b)(s−c)), s = semiperímetro; útil cuando solo se tienen medidas de linderos y diagonales.",
        "2.3.3 Volúmenes de movimiento de tierras: método de áreas medias entre secciones (V = (A1+A2)/2·d), método del prismoide (V = d/6·(A1 + 4Am + A2)) y método de cuadrícula (promedio de cotas por celda × área).",
        "2.3.4 Esponjamiento y compactación: el volumen excavado aumenta al removerse y disminuye al compactarse; los factores dependen del tipo de suelo (se toman del estudio geotécnico o del constructor, no de un valor fijo)."
      ]}
    ]},
    { t: "Unidad 3 · Trigonometría", items: [
      { t: "3.1 Razones trigonométricas", sub: [
        "3.1.1 En triángulo rectángulo: sen = CO/H, cos = CA/H, tan = CO/CA; recíprocas csc, sec, cot.",
        "3.1.2 Valores notables: 30°, 45°, 60° (sen 30° = 0,5; tan 45° = 1; cos 60° = 0,5).",
        "3.1.3 Círculo trigonométrico: signo de las funciones por cuadrante, ángulos negativos y mayores a 360°, reducción al primer cuadrante.",
        "3.1.4 Funciones inversas (arcsen, arccos, arctan) y el caso de atan2(y, x) para obtener azimuts sin ambigüedad de cuadrante."
      ]},
      { t: "3.2 Resolución de triángulos oblicuángulos", sub: [
        "3.2.1 Ley de senos: a/sen A = b/sen B = c/sen C = 2R; caso ambiguo LLA (0, 1 o 2 soluciones).",
        "3.2.2 Ley de cosenos: c² = a² + b² − 2ab·cos C; permite calcular un lado con dos lados y el ángulo incluido, o ángulos con los tres lados.",
        "3.2.3 Ley de tangentes y fórmulas de Briggs (semiángulos); área = ½·a·b·sen C.",
        "3.2.4 Aplicación: cerrar un polígono de linderos, calcular distancias inaccesibles (a través de un río o edificio), ángulos de armaduras."
      ]},
      { t: "3.3 Identidades trigonométricas", sub: [
        "3.3.1 Pitagórica: sen² + cos² = 1; 1 + tan² = sec².",
        "3.3.2 Suma y diferencia de ángulos, ángulo doble y mitad; transformación de suma a producto.",
        "3.3.3 Uso práctico: simplificar la fórmula de la altitud solar y de proyección de sombras; descomponer fuerzas (F·cos θ, F·sen θ)."
      ]},
      "3.4 Ecuaciones trigonométricas y funciones periódicas — modelan el recorrido solar diario y anual, la variación de temperatura y las oscilaciones (vibraciones estructurales).",
      { t: "3.5 Trigonometría esférica (nociones)", sub: [
        "3.5.1 Triángulo esférico, exceso esférico, teorema del coseno esférico; base de la astronomía de posición y de la geodesia.",
        "3.5.2 Triángulo astronómico (polo–cenit–astro): de él salen las ecuaciones de altitud y azimut solar."
      ]}
    ]},
    { t: "Unidad 4 · Geometría analítica y vectores", items: [
      { t: "4.1 Plano cartesiano", sub: [
        "4.1.1 Distancia entre puntos d = √(Δx² + Δy²); punto medio; división de un segmento en razón dada (subdivisión de lotes).",
        "4.1.2 Recta: pendiente m = Δy/Δx = tan α; formas punto-pendiente, general Ax + By + C = 0; rectas paralelas (m iguales) y perpendiculares (m1·m2 = −1); distancia de un punto a una recta (retiros).",
        "4.1.3 Intersección de rectas: ubicar vértices de retiros, ejes y ochaves.",
        "4.1.4 Circunferencia (x−h)² + (y−k)² = r²; parábola, elipse; ecuaciones paramétricas y polares."
      ]},
      { t: "4.2 Geometría analítica del espacio", sub: [
        "4.2.1 Coordenadas (x, y, z); ecuación del plano ax + by + cz = d; pendiente de un faldón de cubierta como plano.",
        "4.2.2 Superficies cuádricas; intersección de planos (limahoyas y limatesas son intersecciones de planos de cubierta)."
      ]},
      { t: "4.3 Vectores", sub: [
        "4.3.1 Vector libre y fijo; componentes, módulo, dirección, vector unitario.",
        "4.3.2 Suma, resta, producto por escalar; producto punto (ángulo entre direcciones, proyección) y producto cruz (normal a un plano, momento, área de paralelogramo).",
        "4.3.3 Aplicación: normal de una cubierta vs vector solar = ángulo de incidencia de radiación (paneles FV y ganancia térmica); descomposición de fuerzas en estática."
      ]},
      "4.4 Transformaciones geométricas — traslación, rotación, escala, simetría; matrices de transformación usadas por CAD/BIM para pasar de coordenadas locales de proyecto a coordenadas UTM."
    ]},
    { t: "Unidad 5 · Sistemas de coordenadas, cartografía y levantamiento", items: [
      { t: "5.1 Coordenadas geográficas y geodesia", ec: "Ecuador: la referencia oficial es SIRGAS-ECUADOR (compatible con WGS84 a nivel práctico de proyecto), administrada por el Instituto Geográfico Militar (IGM), con la Red GNSS de Monitoreo Continuo (REGME) para correcciones.", mundo: "Mundo: WGS84 (EPSG:4326) es el datum del GPS; cada país tiene su marco (ETRS89 en Europa, NAD83 en EE. UU.).", raro: "Poco común: Ecuador está atravesado por la línea equinoccial (latitud 0°); Guayaquil está a ≈ 2°10′ S, por lo que el sol pasa casi por el cenit dos veces al año.", sub: [
        "5.1.1 Latitud, longitud, altura elipsoidal vs altura ortométrica (sobre el nivel medio del mar); geoide y ondulación.",
        "5.1.2 Formatos: grados-minutos-segundos vs grados decimales; errores típicos de signo (sur y oeste son negativos: Guayaquil ≈ −2.17, −79.9).",
        "5.1.3 Datums antiguos: PSAD56 aparece en planos y catastros viejos del Ecuador; mezclar PSAD56 con WGS84 produce desplazamientos de cientos de metros."
      ]},
      { t: "5.2 Proyección UTM", ec: "Ecuador continental cae en las zonas UTM 17 Sur y 18 Sur; Guayaquil está en la zona 17S (EPSG:32717 en WGS84); Galápagos en zonas 15/16.", mundo: "Mundo: 60 husos de 6°, falso Este 500 000 m, falso Norte 10 000 000 m en el hemisferio sur.", sub: [
        "5.2.1 Coordenadas Este (E) y Norte (N) en metros; factor de escala y convergencia de meridianos (Norte de cuadrícula ≠ Norte geográfico ≠ Norte magnético).",
        "5.2.2 Declinación magnética: diferencia entre Norte magnético y geográfico; cambia con el tiempo; se consulta en modelos NOAA/IGRF antes de orientar con brújula.",
        "5.2.3 Distancia de cuadrícula vs distancia topográfica (en proyectos pequeños la diferencia es mínima, pero se declara el sistema)."
      ]},
      { t: "5.3 Pendientes y porcentajes", sub: [
        "5.3.1 Pendiente % = (Δh / distancia horizontal) × 100; en grados α = arctan(Δh/d); 100 % = 45°.",
        "5.3.2 Relación H:V (ej. taludes 1,5:1) y relación 1:n en rampas (1:12 ≈ 8,33 %).",
        "5.3.3 Longitud inclinada = √(d² + Δh²) = d / cos α (para cubiertas y rampas)."
      ]},
      { t: "5.4 Curvas de nivel y modelos del terreno", sub: [
        "5.4.1 Equidistancia; propiedades (no se cruzan, más juntas = más pendiente); interpolación lineal de cotas.",
        "5.4.2 Perfiles longitudinales y secciones transversales; divisorias y vaguadas; drenaje natural.",
        "5.4.3 Modelos TIN y DEM; mapas de pendientes por rangos (0–5 %, 5–15 %, 15–30 %, >30 %) para zonificar lo edificable."
      ]},
      { t: "5.5 Triangulación y levantamiento topográfico", mundo: "Mundo: planimetría (poligonal, radiación), altimetría (nivelación geométrica y trigonométrica); instrumentos: cinta, nivel, teodolito, estación total, GNSS RTK/PPK, escáner láser y fotogrametría con dron.", ec: "Ecuador: los levantamientos para trámite municipal suelen exigirse georreferenciados en WGS84 UTM 17S y firmados por profesional; el catastro municipal entrega la ficha y la geometría de referencia del predio.", sub: [
        "5.5.1 Triangulación clásica: red de triángulos con base medida y ángulos observados (ley de senos).",
        "5.5.2 Poligonal cerrada: error angular de cierre (suma teórica (n−2)·180° interna), compensación; error lineal y precisión relativa.",
        "5.5.3 Nivelación trigonométrica: Δh = D·sen(α) + hi − hp (altura instrumento y prisma).",
        "5.5.4 Radiación desde estación: X = X0 + D·sen(Az), Y = Y0 + D·cos(Az)."
      ]}
    ]},
    { t: "Unidad 6 · Geometría solar", items: [
      { t: "6.1 Esfera celeste y movimiento aparente del sol", sub: [
        "6.1.1 Declinación solar δ: varía entre +23,44° (solsticio de junio) y −23,44° (solsticio de diciembre), 0° en equinoccios; aproximación de Cooper: δ = 23,45°·sen(360/365·(284 + n)).",
        "6.1.2 Ángulo horario ω = 15° × (hora solar − 12); negativo en la mañana, positivo en la tarde.",
        "6.1.3 Hora solar verdadera vs hora oficial: corrección por longitud (4 min por grado respecto del meridiano del huso) y ecuación del tiempo (hasta ±16 min). Ecuador continental usa UTC−5 (meridiano 75° O); Guayaquil (≈ 79,9° O) tiene mediodía solar ≈ 20 min después de las 12:00 más la ecuación del tiempo."
      ]},
      { t: "6.2 Altitud y azimut solar", sub: [
        "6.2.1 Altitud: sen β = sen φ·sen δ + cos φ·cos δ·cos ω; al mediodía β = 90° − |φ − δ|.",
        "6.2.2 Azimut: cos Az = (sen δ − sen β·sen φ)/(cos β·cos φ), con el signo según mañana/tarde.",
        "6.2.3 Ángulo de incidencia sobre una superficie inclinada (producto punto entre vector solar y normal).",
        "6.2.4 Ángulo de sombra vertical (perfil, para aleros y parasoles horizontales): tan VSA = tan β / cos(Az − Az fachada); ángulo de sombra horizontal (para aletas verticales): HSA = Az − Az fachada."
      ]},
      { t: "6.3 Geometría solar en latitud ecuatorial", ec: "Ecuador (Guayaquil, φ ≈ 2°S): en el solsticio de junio el sol del mediodía está al NORTE (≈ 64° de altitud), en diciembre al SUR (≈ 69°); en los equinoccios pasa casi por el cenit. Las fachadas Este y Oeste reciben el sol más bajo y son las críticas; Norte y Sur se protegen fácilmente con aleros cortos.", mundo: "Mundo: en latitudes medias la fachada ecuatorial (sur en el hemisferio norte) recibe el sol invernal bajo; se diseña para captarlo en invierno y bloquearlo en verano.", raro: "Poco común: Japón regula el derecho al sol (nisshōken) con límites de horas de sombra proyectada sobre vecinos; en Reino Unido existen los 'rights to light' (Prescription Act 1832, Rights of Light Act 1959); Nueva York usó desde 1916 planos inclinados de exposición al cielo que generaron los rascacielos escalonados.", sub: [
        "6.3.1 Carta solar estereográfica y cilíndrica; transportador de sombras; máscaras de sombra de obstáculos.",
        "6.3.2 Herramientas: SunCalc, Andrew Marsh 3D Sun-Path, Climate Consultant, Ladybug (Grasshopper), análisis solar de Revit/SketchUp.",
        "6.3.3 Aleros: profundidad = altura a proteger × (1 / tan VSA) — equivalente a 'altura × tan del ángulo cenital de perfil'. Se dimensiona para el ángulo de corte elegido (hora y fecha)."
      ]}
    ]},
    { t: "Unidad 7 · Proporción, trazados reguladores y geometría compositiva", items: [
      { t: "7.1 Sistemas de proporción", raro: "Poco común: el ken japonés y el módulo del tatami (aprox. 2:1) rigen aún la planta de casas tradicionales; el Vastu Shastra indio y el mandala Vastu Purusha organizan la planta por una retícula de 8×8 o 9×9; el feng shui chino usa la brújula luopan.", sub: [
        "7.1.1 Número áureo φ = (1+√5)/2 ≈ 1,618; rectángulo áureo, serie de Fibonacci.",
        "7.1.2 Rectángulos dinámicos √2, √3, √5 (formato DIN A basado en √2).",
        "7.1.3 Proporciones musicales de Palladio (1:1, 2:3, 3:4, 1:2); órdenes clásicos y módulo (Vitruvio).",
        "7.1.4 Modulor de Le Corbusier (serie roja y azul basada en 1,83 m y 2,26 m); coordinación modular en bloques y paneles."
      ]},
      "7.2 Trazados reguladores — diagonales paralelas o perpendiculares que controlan huecos y volúmenes; retículas, ejes y simetrías; geometría fractal y patrones islámicos (teselaciones con simetrías de 5, 8, 10, 12).",
      "7.3 Geometría paramétrica y computacional — curvas NURBS, teselaciones, Voronoi, optimización de formas (Grasshopper, Dynamo), racionalización de superficies dobles en paneles planos."
    ]},
    { t: "Unidad 8 · Geometría de escaleras y rampas", items: [
      { t: "8.1 Escaleras", ec: "Ecuador: la NEC-HS-AU (Accesibilidad Universal) y la NTE INEN 2249 (escaleras) fijan dimensiones de huella, contrahuella, pasamanos y descansos; la regla de bomberos y NEC-HS-CI rige anchos de evacuación. Verificar siempre la versión vigente.", mundo: "Mundo: fórmula de Blondel (1675): 2h + b ≈ 62–64 cm (h = contrahuella, b = huella); los códigos (IBC, CTE DB-SUA) limitan contrahuella máxima y huella mínima.", raro: "Poco común: escaleras de 'paso alternado' (samba) admitidas en algunos códigos para accesos de servicio con pendientes muy fuertes; Japón conserva las escaleras-cajonera (kaidan-dansu).", sub: [
        "8.1.1 Pendiente de la escalera = h/b; ángulo cómodo alrededor de 30°–35°.",
        "8.1.2 Número de contrahuellas n = altura de piso a piso / h (redondear a entero y recalcular h); número de huellas = n − 1 por tramo recto.",
        "8.1.3 Longitud en planta = (n−1)·b + descansos; descansos cada cierto número máximo de peldaños según norma.",
        "8.1.4 Altura libre (headroom) medida en vertical desde la línea de nariz de los peldaños.",
        "8.1.5 Escaleras compensadas y helicoidales: la huella se mide sobre la línea de huella (a cierta distancia del borde interior)."
      ]},
      { t: "8.2 Rampas", ec: "Ecuador: NTE INEN 2245 (rampas) y NEC-HS-AU: la pendiente longitudinal máxima depende de la longitud del tramo (tramos cortos admiten más pendiente; tramos largos, menos), con descansos, bordillos y pasamanos a doble altura; pendiente transversal máxima reducida. Consultar la tabla vigente antes de fijar la rampa.", mundo: "Mundo: ADA (EE. UU.) 1:12 máximo (8,33 %) con tramos de hasta 9 m de recorrido; ISO 21542 como referencia de accesibilidad.", sub: [
        "8.2.1 Longitud = desnivel / pendiente; longitud inclinada real = √(L² + Δh²).",
        "8.2.2 Rampas vehiculares: pendiente de rampa recta y de rampa curva, transiciones de entrada y salida (cambios de pendiente) para evitar que el vehículo toque fondo.",
        "8.2.3 Rampas helicoidales: pendiente medida en el eje de circulación; el borde interior es más empinado."
      ]}
    ]},
    { t: "Unidad 9 · Geometría de cubiertas y aguas", items: [
      { t: "9.1 Planos de cubierta", sub: [
        "9.1.1 Faldón o agua; cumbrera, limatesa (arista saliente), limahoya (arista entrante), alero, canal, bajante.",
        "9.1.2 Trazado de cubiertas a igual pendiente: las limas son bisectrices de los ángulos de la planta; se resuelve con el método de las bisectrices.",
        "9.1.3 Longitud de la lima en esquina a 90° con pendientes iguales: proyección horizontal = √2·a; longitud real = √(2a² + Δh²)."
      ]},
      { t: "9.2 Área real de cubierta", sub: [
        "9.2.1 Área real = área en planta / cos α (α = ángulo de la pendiente); sirve para presupuesto de cubierta, cargas y paneles.",
        "9.2.2 Pendiente mínima según material: la fija el fabricante (tejas, fibrocemento, metálicas tipo steel panel, losas impermeabilizadas); a menor pendiente, más traslapes o impermeabilización continua.",
        "9.2.3 Superficie de captación pluvial = área en planta (no la inclinada) para dimensionar canales y bajantes."
      ], ec: "Ecuador (Guayaquil): lluvias intensas concentradas en la estación invernal (dic–may); pendientes y canales se dimensionan con intensidades del INAMHI y la normativa de Interagua/NEC para drenaje pluvial.", raro: "Poco común: techos de gran pendiente en los Alpes y Escandinavia por nieve; en el sudeste asiático, cubiertas de 'silla de montar' (Toraja, Minangkabau) con cumbreras curvas."}
    ]}
  ],
  fases: [
    { n: "Fase 0 · Datos geométricos del terreno", pasos: [
      { id: "tri-01", t: "Pedir ubicación exacta y fijar el sistema de coordenadas del proyecto",
        d: "Pedir país, provincia, cantón, ciudad, parroquia y clave catastral.\n- 1.1 Obtener coordenadas del predio (Google Maps / catastro) en grados decimales y convertir a UTM.\n- 1.2 Declarar el sistema: WGS84/SIRGAS UTM zona 17S (Guayaquil) o la que corresponda; unidades en metros.\n- 1.3 Verificar si planos antiguos usan PSAD56 y transformar antes de superponer.\n- 1.4 Definir el punto base del proyecto (0,0 local) y su equivalencia UTM + cota.",
        ec: "Catastro municipal (Guayaquil: Dirección de Catastro) entrega ficha con clave y, en muchos casos, geometría del predio; IGM publica la red geodésica y los parámetros SIRGAS-ECUADOR.",
        sale: "Ficha de georreferenciación: sistema, zona UTM, punto base, norte de cuadrícula y norte geográfico.",
        tags: ["doc", "bim"], fuentes: ["maps", "earth", "ec:igm", "gye:catastro", "q:catastro {canton}"] },
      { id: "tri-02", t: "Calcular el área del terreno irregular por coordenadas (fórmula de Gauss)",
        d: "Con las coordenadas de los vértices del levantamiento:\n- 2.1 Ordenar vértices en sentido horario o antihorario sin saltos (P1…Pn, cerrando en P1).\n- 2.2 Tabla en Excel: columnas X, Y, Xi·Yi+1, Xi+1·Yi.\n- 2.3 A = ½·|Σ(Xi·Yi+1 − Xi+1·Yi)|.\n- 2.4 Comprobar con triangulación (Herón o ½·a·b·sen C) y con el área del CAD/BIM.\n- 2.5 Calcular perímetro con la fórmula de distancia entre vértices consecutivos.",
        sale: "Hoja de cálculo de área y perímetro con cuadro de coordenadas de linderos.",
        tags: ["doc", "dis"] },
      { id: "tri-03", t: "Verificar linderos y área contra la escritura y el catastro",
        d: "- 3.1 Extraer de la escritura: medidas de cada lindero, colindantes y área declarada.\n- 3.2 Convertir rumbos/azimuts de la escritura a ángulos internos y comprobar la suma (n−2)·180°.\n- 3.3 Comparar medidas escritura vs levantamiento vs catastro; calcular diferencia absoluta y porcentual.\n- 3.4 Si la diferencia supera la tolerancia municipal, iniciar trámite de rectificación/regularización de excedentes o diferencias de área antes de diseñar al límite.",
        ec: "En Ecuador los excedentes o diferencias de área se regularizan por ordenanza municipal (COOTAD faculta al GAD); la escritura rectificada se inscribe en el Registro de la Propiedad.",
        sale: "Cuadro comparativo escritura / catastro / levantamiento con conclusión de área válida para diseño.",
        tags: ["doc"], fuentes: ["gye:catastro", "q:regularización excedentes diferencias de área {canton}"] },
      { id: "tri-04", t: "Revisar el levantamiento topográfico y cerrar la poligonal",
        d: "- 4.1 Solicitar levantamiento planialtimétrico con estación total o GNSS RTK, georreferenciado.\n- 4.2 Revisar error de cierre angular y lineal; exigir precisión relativa adecuada para lotes urbanos.\n- 4.3 Verificar que incluya: árboles, postes, pozos, bordillos, cotas de acera y vía, edificaciones vecinas y alturas.\n- 4.4 Si el terreno es grande o con vegetación, considerar dron fotogramétrico + puntos de control.",
        sale: "Plano topográfico validado (DWG/IFC) con cuadro de coordenadas, cotas y curvas de nivel.",
        tags: ["doc", "bim"], fuentes: ["ec:igm", "q:topografía georreferenciada {canton}"] },
      { id: "tri-05", t: "Elaborar mapa de pendientes y perfiles del terreno",
        d: "- 5.1 Generar superficie topográfica (TIN) en Civil 3D, Revit o QGIS.\n- 5.2 Clasificar pendientes por rangos: 0–5 %, 5–15 %, 15–30 %, >30 %.\n- 5.3 Trazar perfiles longitudinales y transversales por ejes principales del proyecto.\n- 5.4 Identificar divisorias, vaguadas y dirección de escorrentía.",
        sale: "Mapa de pendientes + perfiles con zonas aptas y zonas a evitar.",
        tags: ["dis", "bim"], fuentes: ["earth", "osm"] }
    ]},
    { n: "Fase 1 · Implantación, movimiento de tierras y visuales", pasos: [
      { id: "tri-06", t: "Trazar retiros y área edificable con geometría analítica",
        d: "- 6.1 Con los parámetros del IRM/uso de suelo (retiros frontal, laterales, posterior), desplazar cada lindero paralelamente la distancia exigida (offset).\n- 6.2 Obtener los vértices del polígono edificable por intersección de rectas.\n- 6.3 Calcular COS (área de ocupación / área del lote) y COS total con áreas analíticas.",
        sale: "Polígono de área edificable con coordenadas y cálculo de COS/CUS.",
        tags: ["dis"], fuentes: ["gye:usosuelo", "q:PUGS {canton}"] },
      { id: "tri-07", t: "Definir cotas de proyecto y calcular movimiento de tierras",
        d: "- 7.1 Fijar nivel ±0,00 respecto de la cota de acera (considerar drenaje e inundaciones).\n- 7.2 Cuadricular el terreno (ej. 5×5 m) y calcular corte/relleno por celda: V = área × (cota terreno − cota proyecto).\n- 7.3 Alternativa: secciones cada 5–10 m y método de áreas medias o prismoide.\n- 7.4 Balancear corte y relleno; aplicar esponjamiento/compactación según estudio de suelos.\n- 7.5 Diseñar taludes con relación H:V recomendada por el geotécnico.",
        ec: "En Guayaquil muchas zonas son planas y con suelos blandos o susceptibles a inundación (zonas de estero y sur); en cerros (norte y oeste) hay pendientes fuertes: verificar mapas de riesgo de la SNGR y el municipio.",
        sale: "Cuadro de volúmenes de corte y relleno + plano de plataformas y taludes.",
        tags: ["dis", "doc"], fuentes: ["ec:sngr", "q:mapa de riesgos inundación {canton}"] },
      { id: "tri-08", t: "Calcular pendientes de accesos, veredas y drenaje superficial",
        d: "- 8.1 Pendiente de acceso vehicular y peatonal desde la acera: % = Δh/d × 100.\n- 8.2 Pendientes mínimas de pisos exteriores para evacuar agua (del orden de 1–2 %) hacia rejillas o cunetas.\n- 8.3 Verificar que el acceso vehicular no invada la vereda pública con rampas (la rampa empieza dentro del lote).",
        sale: "Plano de cotas y pendientes de exteriores.",
        tags: ["dis"] },
      { id: "tri-09", t: "Estudiar visuales, conos de visión y privacidad",
        d: "- 9.1 Desde puntos clave (ventanas, terrazas, acceso) trazar conos de visión (ángulo horizontal cómodo ≈ 60°, campo total mayor) y líneas de vista verticales.\n- 9.2 Calcular con tangentes qué altura de vecino o árbol bloquea la vista: h = d·tan α.\n- 9.3 Revisar vistas hacia el proyecto desde vecinos (privacidad) y desde la calle (percepción del volumen).",
        sale: "Diagrama de visuales y decisiones de orientación de vanos.",
        tags: ["dis"], fuentes: ["earth", "maps"] }
    ]},
    { n: "Fase 2 · Geometría solar y protecciones", pasos: [
      { id: "tri-10", t: "Calcular la trayectoria solar del sitio (fechas críticas)",
        d: "- 10.1 Con la latitud del sitio (Guayaquil ≈ 2°S) calcular declinación para 21 jun, 21 dic y equinoccios.\n- 10.2 Calcular altitud β y azimut Az cada hora de 07:00 a 17:00 (hora solar) con las fórmulas o con SunCalc/Ladybug.\n- 10.3 Convertir hora solar a hora oficial (corrección por longitud y ecuación del tiempo).\n- 10.4 Dibujar la carta solar y superponer obstáculos (máscara de sombras).",
        sale: "Tabla de altitud/azimut por hora y fecha + carta solar del sitio.",
        tags: ["sost", "dis"], fuentes: ["suncalc", "solaratlas", "nasapower", "epw"] },
      { id: "tri-11", t: "Dimensionar aleros y parasoles horizontales por fachada",
        d: "- 11.1 Para cada fachada, obtener su azimut normal.\n- 11.2 Calcular el ángulo de sombra vertical: tan VSA = tan β / cos(Az − Az fachada).\n- 11.3 Profundidad del alero = altura de ventana a proteger / tan VSA (equivalente a altura × tan del ángulo cenital de perfil).\n- 11.4 Elegir el ángulo de corte (ej. proteger de 09:00 a 15:00 todo el año) y verificar con modelo 3D.\n- 11.5 En Guayaquil: Norte y Sur se protegen con aleros moderados; Este y Oeste requieren parasoles verticales, celosías o vegetación.",
        sale: "Cálculo de profundidad de aleros por fachada con ángulos de corte.",
        tags: ["sost", "dis"], fuentes: ["suncalc", "q:protección solar fachadas clima cálido húmedo"] },
      { id: "tri-12", t: "Dimensionar aletas verticales y celosías para fachadas Este y Oeste",
        d: "- 12.1 Ángulo de sombra horizontal HSA = Az − Az fachada.\n- 12.2 Separación entre aletas s = profundidad × tan(90° − HSA) según la hora a bloquear; o proporción profundidad/separación de lamas.\n- 12.3 Para lamas horizontales en celosía: separación = profundidad × tan VSA.\n- 12.4 Verificar iluminación natural resultante (no oscurecer en exceso).",
        sale: "Detalle geométrico de parasoles verticales/lamas con sus ángulos.",
        tags: ["sost", "dis"] },
      { id: "tri-13", t: "Calcular sombras proyectadas sobre vecinos y espacios exteriores",
        d: "- 13.1 Longitud de sombra = altura / tan β en la dirección opuesta al azimut solar.\n- 13.2 Estudio de sombras en fechas críticas y horas clave (modelo 3D).\n- 13.3 Ubicar patios, juegos, estancias exteriores en zonas de sombra útil en la tarde.",
        sale: "Estudio de sombras (diagramas por fecha/hora).",
        tags: ["sost", "dis"], fuentes: ["suncalc"] },
      { id: "tri-14", t: "Orientar e inclinar paneles solares o colectores",
        d: "- 14.1 En latitudes ecuatoriales la inclinación óptima es baja (cercana a la latitud), pero se da una inclinación mínima para autolimpieza con lluvia.\n- 14.2 Calcular ángulo de incidencia con producto punto entre vector solar y normal del panel.\n- 14.3 Verificar sombras entre filas: separación = altura del panel / tan β crítico.",
        sale: "Esquema de orientación, inclinación y separación de paneles.",
        tags: ["sost"], fuentes: ["solaratlas", "nasapower", "q:regulación ARCERNNR generación distribuida"] }
    ]},
    { n: "Fase 3 · Circulaciones: escaleras, rampas y estacionamientos", pasos: [
      { id: "tri-15", t: "Diseñar geométricamente las escaleras (Blondel y norma)",
        d: "- 15.1 Altura piso a piso H; proponer contrahuella h y calcular n = H/h (redondear, recalcular h).\n- 15.2 Huella b tal que 2h + b ≈ 62–64 cm, y dentro de los límites de NTE INEN 2249 / NEC-HS-AU.\n- 15.3 Longitud en planta = (n−1)·b + descansos; ancho según evacuación (NEC-HS-CI/Bomberos) y uso.\n- 15.4 Verificar altura libre, pasamanos, nariz y bordes; en escaleras de evacuación, tipo de escalera exigida por Bomberos.\n- 15.5 Para escaleras helicoidales, verificar huella sobre la línea de huella.",
        ec: "NTE INEN 2249 (escaleras), NEC-HS-AU y NEC-HS-CI (contra incendios); Benemérito Cuerpo de Bomberos de Guayaquil revisa escaleras de evacuación.",
        sale: "Cálculo de escalera (h, b, n, longitud, ancho) y detalle en corte.",
        tags: ["dis", "doc"], fuentes: ["ec:inen", "ec:nec", "gye:bomberos"] },
      { id: "tri-16", t: "Diseñar rampas peatonales accesibles (INEN 2245 / NEC-HS-AU)",
        d: "- 16.1 Desnivel a salvar Δh; elegir pendiente según la longitud del tramo en la tabla de NTE INEN 2245.\n- 16.2 Longitud L = Δh / pendiente; añadir descansos entre tramos y al inicio/final.\n- 16.3 Verificar ancho libre, bordillos, pasamanos a dos alturas, pendiente transversal y piso antideslizante.\n- 16.4 Si la rampa resulta muy larga, evaluar plataforma elevadora o ascensor.",
        ec: "Obligatorio en edificaciones de uso público; los centros de salud y educativos lo revisa además la entidad del sector (MSP/ACESS, MINEDUC).",
        sale: "Plano y corte de rampas con pendientes acotadas y cálculo.",
        tags: ["dis", "doc"], fuentes: ["ec:inen", "ec:nec", "q:NTE INEN 2245 rampas"] },
      { id: "tri-17", t: "Diseñar rampas vehiculares y sus transiciones",
        d: "- 17.1 Definir pendiente de rampa recta y curva según ordenanza municipal.\n- 17.2 Añadir tramos de transición al inicio y final (pendiente intermedia) para evitar golpes de parachoques.\n- 17.3 Verificar altura libre en todo el recorrido (perfil longitudinal).\n- 17.4 En rampas curvas, pendiente en el eje y radios interior/exterior.",
        sale: "Perfil longitudinal de rampa vehicular con transiciones.",
        tags: ["dis"], cuando: ["grande", "ph"], fuentes: ["q:ordenanza estacionamientos rampas {canton}"] },
      { id: "tri-18", t: "Trazar la geometría de estacionamientos y radios de giro",
        d: "- 18.1 Dimensiones de plaza y calle de maniobra según ángulo (90°, 60°, 45°, 30°).\n- 18.2 Verificar radios de giro interior/exterior con plantillas del vehículo tipo (auto, ambulancia, camión de basura, bomberos).\n- 18.3 Plazas accesibles con franja de transferencia según NTE INEN 2248.\n- 18.4 En centros de salud: bahía de ambulancia con giro y cota de acceso a emergencia.",
        ec: "Número y dimensiones de plazas: ordenanza municipal del cantón; accesibles: NTE INEN 2248.",
        sale: "Plano de estacionamientos con barridos de giro verificados.",
        tags: ["dis"], fuentes: ["ec:inen", "q:ordenanza estacionamientos {canton}"] }
    ]},
    { n: "Fase 4 · Cubiertas y envolvente", pasos: [
      { id: "tri-19", t: "Resolver la geometría de cubiertas (aguas, limas y cumbreras)",
        d: "- 19.1 Dibujar la planta de cubierta y aplicar el método de bisectrices para aguas a igual pendiente.\n- 19.2 Ubicar cumbreras, limatesas, limahoyas y canales; evitar limahoyas sobre espacios críticos.\n- 19.3 Calcular longitudes reales de limas y pendientes resultantes.",
        sale: "Planta de cubiertas con pendientes, sentidos de escurrimiento y limas.",
        tags: ["dis"] },
      { id: "tri-20", t: "Calcular pendientes y áreas reales de cubierta",
        d: "- 20.1 Pendiente mínima del material según ficha técnica del fabricante.\n- 20.2 Área real = área en planta / cos α; sumar traslapes y desperdicio según el material.\n- 20.3 Área de captación = área en planta, para canales y bajantes.\n- 20.4 Transmitir áreas reales a presupuesto y a cargas (estática).",
        sale: "Cuadro de áreas reales de cubierta y captación.",
        tags: ["dis", "doc"] },
      { id: "tri-21", t: "Verificar pendientes de canales, bajantes y losas de cubierta plana",
        d: "- 21.1 Pendiente de canales hacia bajantes y de losas planas hacia sumideros.\n- 21.2 Distancia máxima entre bajantes según área tributaria de captación.\n- 21.3 Cotas de impermeabilización y rebosaderos.",
        sale: "Plano de drenaje de cubiertas con pendientes acotadas.",
        tags: ["dis", "mant"], fuentes: ["ec:inamhi", "gye:interagua"] },
      { id: "tri-22", t: "Controlar proporciones y trazados reguladores de fachadas",
        d: "- 22.1 Definir retícula modular (coordinada con bloque, panel, perfilería).\n- 22.2 Aplicar un sistema de proporción (áureo, √2, Modulor) a vanos y llenos.\n- 22.3 Verificar alineaciones y ejes con el sistema estructural.",
        sale: "Alzados con trazados reguladores y retícula modular.",
        tags: ["dis"] }
    ]},
    { n: "Fase 5 · Documentación y replanteo en obra", pasos: [
      { id: "tri-23", t: "Preparar cuadro de coordenadas de ejes y puntos de replanteo",
        d: "- 23.1 Exportar coordenadas UTM de ejes, esquinas de cimentación y puntos de control.\n- 23.2 Incluir cota de nivel ±0,00 referenciada a un BM (banco de marca) fijo.\n- 23.3 Plano de replanteo con cuadro de coordenadas y distancias.",
        sale: "Plano de replanteo + archivo CSV de puntos para estación total/GNSS.",
        tags: ["doc", "bim"] },
      { id: "tri-24", t: "Supervisar el replanteo en obra por coordenadas",
        d: "- 24.1 Materializar BM y puntos de control fuera de la zona de excavación.\n- 24.2 Replantear por radiación desde estación: X = X0 + D·sen Az, Y = Y0 + D·cos Az.\n- 24.3 Comprobar escuadras con 3-4-5 y diagonales iguales en rectángulos.\n- 24.4 Registrar verificaciones en libro de obra.",
        ec: "El replanteo inicial suele verificarse con el inspector municipal/fiscalización; en obra pública, la fiscalización lo aprueba (LOSNCP).",
        sale: "Acta/registro de replanteo aprobado.",
        tags: ["doc"] },
      { id: "tri-25", t: "Verificar niveles, pendientes y plomos durante la construcción",
        d: "- 25.1 Nivelación de losas y pisos con nivel láser.\n- 25.2 Control de pendientes de rampas, cubiertas y drenajes antes de acabados.\n- 25.3 Verificar verticalidad (plomada/láser) de columnas y muros.\n- 25.4 Levantamiento as-built de lo ejecutado.",
        sale: "Registros de control dimensional y planos as-built.",
        tags: ["doc", "mant"] },
      { id: "tri-26", t: "Archivar memoria de cálculos geométricos del proyecto",
        d: "Compilar: georreferenciación, cálculo de área, comparación de linderos, movimiento de tierras, geometría solar, escaleras, rampas, cubiertas y replanteo, en una memoria técnica anexa al expediente.",
        sale: "Memoria de cálculos geométricos (PDF) en el expediente del proyecto.",
        tags: ["doc"] }
    ]}
  ]
});
