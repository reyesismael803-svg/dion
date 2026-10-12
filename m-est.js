window.FLUJO_M = window.FLUJO_M || [];
FLUJO_M.push({
  id: "est",
  orden: 9,
  n: "Estática",
  corto: "Estática",
  para: "Enseña a entender cómo viajan las cargas desde la cubierta hasta el suelo y a comprobar que cada elemento esté en equilibrio. En el flujo se usa al pasar del partido arquitectónico al anteproyecto: define el sistema estructural, estima cargas y reacciones y permite predimensionar y dialogar con el ingeniero estructural con criterio propio.",
  indice: [
    { t: "Unidad 1 · Principios generales", items: [
      { t: "1.1 Mecánica", sub: [
        "1.1.1 Ramas: mecánica de cuerpos rígidos (estática y dinámica), de cuerpos deformables (resistencia de materiales) y de fluidos.",
        "1.1.2 La estática estudia cuerpos en reposo o con velocidad constante (aceleración nula): ΣF = 0, ΣM = 0.",
        "1.1.3 Historia: Arquímedes (palanca), Stevin (paralelogramo de fuerzas), Varignon (momentos), Newton (leyes del movimiento)."
      ]},
      { t: "1.2 Conceptos fundamentales", sub: [
        "1.2.1 Cantidades básicas: longitud, tiempo, masa, fuerza.",
        "1.2.2 Idealizaciones: partícula (masa sin dimensiones), cuerpo rígido (no se deforma), fuerza concentrada (actúa en un punto).",
        "1.2.3 Leyes de Newton: inercia, F = m·a, acción y reacción (base de las reacciones en apoyos y de los DCL).",
        "1.2.4 Ley de gravitación; peso W = m·g, con g ≈ 9,81 m/s²."
      ]},
      { t: "1.3 Unidades de medición y sistema internacional", ec: "Ecuador: la NEC usa el SI (kN, kN/m², MPa), pero en obra y en planos antiguos siguen vivos kgf, kg/cm² y t/m². 1 kgf ≈ 9,81 N; 1 t/m² ≈ 9,81 kN/m²; 1 kg/cm² ≈ 0,098 MPa (210 kg/cm² ≈ 21 MPa).", mundo: "Mundo: SI obligatorio en la mayoría de países; EE. UU. usa sistema inglés (lb, kip, psf, psi, ksi) en ACI/AISC/ASCE 7.", raro: "Poco común: EE. UU. es de los pocos países que aún diseñan estructuras en unidades imperiales; muchas tablas de fabricantes de perfiles y cubiertas llegan en psf y ksi.", sub: [
        "1.3.1 Unidades base (m, kg, s) y derivadas (N = kg·m/s², Pa = N/m²).",
        "1.3.2 Prefijos (k, M, G, m, μ) y reglas de escritura; conversiones SI ↔ técnico ↔ inglés."
      ]},
      "1.4 Cálculos numéricos — homogeneidad dimensional, cifras significativas, redondeo (conservar más cifras en pasos intermedios), orden de magnitud y verificación de resultados.",
      "1.5 Procedimiento general de análisis — leer el problema, dibujar el esquema y el DCL, plantear ecuaciones, resolver, verificar unidades y sentido físico del resultado."
    ]},
    { t: "Unidad 2 · Vectores fuerza", items: [
      "2.1 Escalares y vectores — magnitud, dirección y sentido; notación; vectores libres, deslizantes y fijos.",
      "2.2 Operaciones vectoriales — multiplicación por escalar, suma (ley del paralelogramo y del triángulo), resta, descomposición en componentes.",
      "2.3 Suma vectorial de fuerzas — resolución trigonométrica con ley de senos y cosenos; descomposición en ejes no ortogonales.",
      "2.4 Suma de un sistema de fuerzas coplanares — componentes Fx = F·cos θ, Fy = F·sen θ; resultante FR = √(ΣFx² + ΣFy²), θ = arctan(ΣFy/ΣFx).",
      { t: "2.5 Vectores cartesianos", sub: [
        "2.5.1 Sistema derecho x, y, z; vectores unitarios i, j, k.",
        "2.5.2 Magnitud A = √(Ax² + Ay² + Az²); ángulos directores cos α = Ax/A, con cos²α + cos²β + cos²γ = 1.",
        "2.5.3 Suma de vectores cartesianos: sumar componentes."
      ]},
      "2.6 Vectores de posición — r = (xB−xA)i + (yB−yA)j + (zB−zA)k; describen la geometría de tensores, tirantes y cables en 3D.",
      "2.7 Vector fuerza dirigido a lo largo de una línea — F = F·u = F·(r/|r|); aplicación a tensores de cubiertas colgantes y arriostramientos.",
      "2.8 Producto punto — A·B = AB·cos θ; ángulo entre dos líneas; proyección de una fuerza sobre un eje (componentes paralela y perpendicular)."
    ]},
    { t: "Unidad 3 · Equilibrio de una partícula", items: [
      "3.1 Condiciones de equilibrio — ΣF = 0 (primera ley de Newton); en 2D: ΣFx = 0, ΣFy = 0; en 3D, además ΣFz = 0.",
      { t: "3.2 Diagrama de cuerpo libre (DCL)", sub: [
        "3.2.1 Aislar la partícula, dibujar todas las fuerzas externas conocidas y desconocidas con su dirección.",
        "3.2.2 Resortes: F = k·s (ley lineal); cables y poleas: tensión constante en cable continuo sobre polea sin fricción; cable solo trabaja a tracción.",
        "3.2.3 Apoyos lisos: la reacción es normal a la superficie."
      ]},
      "3.3 Sistemas de fuerzas coplanares — dos ecuaciones, hasta dos incógnitas; ej. lámpara colgada de dos cables, nudos de armaduras.",
      "3.4 Sistemas de fuerzas tridimensionales — tres ecuaciones escalares; ej. mástiles con vientos, nudos de estructuras espaciales, anclajes de toldos tensados."
    ]},
    { t: "Unidad 4 · Resultantes de un sistema de fuerzas", items: [
      "4.1 Momento de una fuerza, formulación escalar — M = F·d (d = brazo perpendicular); sentido horario/antihorario; unidades kN·m.",
      "4.2 Producto cruz — C = A × B, magnitud AB·sen θ, dirección por regla de la mano derecha; forma de determinante.",
      "4.3 Momento de una fuerza, formulación vectorial — MO = r × F; independiente del punto elegido sobre la línea de acción.",
      "4.4 Principio de momentos (teorema de Varignon) — el momento de una fuerza es igual a la suma de los momentos de sus componentes.",
      "4.5 Momento respecto a un eje específico — Ma = ua·(r × F) (triple producto escalar); aplicación a torsión en elementos.",
      "4.6 Momento de un par — dos fuerzas iguales, opuestas y no colineales; M = F·d, es vector libre; pares equivalentes.",
      "4.7 Simplificación de un sistema fuerza-par — reducir a una fuerza resultante y un momento en un punto O: FR = ΣF, MRO = ΣMO + ΣM.",
      "4.8 Simplificación adicional — sistemas concurrentes, coplanares y paralelos se reducen a una sola fuerza; caso general: llave de torsión (wrench).",
      { t: "4.9 Reducción de una carga distribuida simple", sub: [
        "4.9.1 La resultante es el área bajo el diagrama de carga: FR = ∫w(x)dx.",
        "4.9.2 Actúa en el centroide del diagrama: uniforme (L/2), triangular (L/3 desde el lado mayor), trapecial (descomponer).",
        "4.9.3 Aplicación: carga de losa sobre viga (kN/m), empuje de tierra y agua (triangular) sobre muros, presión de viento."
      ]}
    ]},
    { t: "Unidad 5 · Equilibrio de un cuerpo rígido", items: [
      "5.1 Condiciones de equilibrio — ΣF = 0 y ΣM = 0; en el plano: ΣFx = 0, ΣFy = 0, ΣMO = 0 (tres ecuaciones independientes).",
      { t: "5.2 Diagramas de cuerpo libre en 2D (apoyos)", sub: [
        "5.2.1 Rodillo/apoyo deslizante: 1 reacción perpendicular a la superficie.",
        "5.2.2 Articulación (pasador): 2 reacciones (Rx, Ry).",
        "5.2.3 Empotramiento: 3 reacciones (Rx, Ry, M).",
        "5.2.4 Cable, eslabón, collar: reacción en la dirección del elemento.",
        "5.2.5 Pesos propios y centro de gravedad; fuerzas internas no aparecen en el DCL."
      ]},
      "5.3 Ecuaciones de equilibrio — formas alternativas (dos de momento + una de fuerza, o tres de momentos en puntos no colineales); elegir puntos que eliminen incógnitas.",
      "5.4 Elementos de dos y tres fuerzas — dos fuerzas: iguales, opuestas y colineales (barras de armaduras, puntales, tirantes); tres fuerzas: concurrentes o paralelas.",
      { t: "5.5 Equilibrio en 3D", sub: [
        "5.5.1 Apoyos 3D: rótula esférica (3 fuerzas), bisagra, chumacera, empotramiento (3 fuerzas + 3 momentos).",
        "5.5.2 Seis ecuaciones escalares: ΣFx, ΣFy, ΣFz, ΣMx, ΣMy, ΣMz = 0."
      ]},
      { t: "5.6 Restricciones y determinación estática", sub: [
        "5.6.1 Estructura isostática: incógnitas = ecuaciones y restricciones adecuadas.",
        "5.6.2 Hiperestática: más incógnitas que ecuaciones; requiere compatibilidad de deformaciones (resistencia de materiales/análisis estructural). La mayoría de edificios de hormigón son hiperestáticos.",
        "5.6.3 Restricciones impropias: reacciones concurrentes o paralelas → mecanismo inestable aunque el número cuadre.",
        "5.6.4 Grado de hiperestaticidad de vigas, pórticos y armaduras."
      ]},
      { t: "5.7 Estabilidad global: volteo y deslizamiento", ec: "Ecuador: muros de contención y cimentaciones se verifican con la NEC-SE-GC (geotecnia y cimentaciones) usando factores de seguridad al volteo y al deslizamiento definidos allí, incluyendo condición sísmica.", mundo: "Mundo: FS al volteo = M resistente / M volcador; FS al deslizamiento = fricción + pasivo / empuje; la resultante debe caer en el tercio central de la base para no generar tracción en el suelo.", sub: [
        "5.7.1 Voladizos, marquesinas y rótulos: contrapeso y anclaje.",
        "5.7.2 Muros de contención: empuje activo, pasivo y en reposo; presión hidrostática si no hay drenaje."
      ]}
    ]},
    { t: "Unidad 6 · Análisis estructural", items: [
      { t: "6.1 Armaduras simples", sub: [
        "6.1.1 Hipótesis: nudos articulados, cargas solo en nudos, barras de dos fuerzas (tracción o compresión).",
        "6.1.2 Armadura simple: triángulo básico + 2 barras y 1 nudo nuevo; condición m = 2j − 3 (isostática en 2D).",
        "6.1.3 Tipologías de cubierta: Pratt, Howe, Warren, Fink, tijera, abanico; tipologías de puente."
      ]},
      "6.2 Método de nodos — equilibrio de cada nudo (ΣFx = 0, ΣFy = 0), empezando por uno con máximo dos incógnitas; convención tracción positiva.",
      "6.3 Elementos de fuerza cero — si en un nudo sin carga concurren dos barras no colineales, ambas son cero; si concurren tres y dos son colineales, la tercera es cero. Sirven para estabilidad y reducir longitudes de pandeo.",
      "6.4 Método de secciones — cortar máximo tres barras desconocidas y aplicar ΣM en el punto de intersección de dos de ellas; eficiente para barras intermedias.",
      "6.5 Armaduras espaciales — tetraedro básico; m = 3j − 6; malla espacial en cubiertas de gran luz (coliseos, mercados).",
      "6.6 Bastidores y máquinas — elementos multifuerza; desmembrar y aplicar acción-reacción en cada unión; pórticos articulados, tijeras, grúas."
    ]},
    { t: "Unidad 7 · Fuerzas internas", items: [
      "7.1 Cargas internas en elementos estructurales — en un corte: fuerza normal N, cortante V y momento flector M (en 3D además torsor y dos cortantes/momentos); convención de signos.",
      { t: "7.2 Ecuaciones y diagramas de cortante y momento", sub: [
        "7.2.1 Plantear V(x) y M(x) por tramos entre cargas concentradas o cambios de carga.",
        "7.2.2 Casos tipo: viga simplemente apoyada con carga uniforme (Mmáx = wL²/8, Vmáx = wL/2); con carga puntual central (PL/4); voladizo con carga uniforme (wL²/2) y puntual en extremo (PL); empotrada-empotrada uniforme (wL²/12 en apoyos, wL²/24 al centro).",
        "7.2.3 Punto de inflexión: momento cero; ubicación de empalmes y cambios de armado."
      ]},
      { t: "7.3 Relaciones carga–cortante–momento", sub: [
        "7.3.1 dV/dx = −w; dM/dx = V (convención usual); el cambio de cortante entre dos puntos es el área de carga, el cambio de momento es el área de cortante.",
        "7.3.2 Momento máximo donde V = 0; saltos en V por fuerzas puntuales y saltos en M por pares.",
        "7.3.3 Método gráfico rápido para dibujar diagramas."
      ]},
      "7.4 Cables — con cargas concentradas (polígono), con carga uniforme horizontal (parábola, T máx = √(T0² + (wL/2)²)) y con peso propio (catenaria); cubiertas colgantes y puentes colgantes.",
      "7.5 Arcos — funicular de las cargas (compresión pura); arco triarticulado isostático; empujes horizontales H = wL²/(8f) para arco parabólico con carga uniforme; necesidad de tensores o estribos."
    ]},
    { t: "Unidad 8 · Fricción (complemento Hibbeler)", items: [
      "8.1 Fricción seca — leyes de Coulomb: F ≤ μs·N; fricción cinética μk·N; ángulo de fricción φ = arctan μ.",
      "8.2 Problemas de deslizamiento inminente y volcamiento — cuñas, tornillos, bandas; aplicación a deslizamiento de muros, rampas y apoyos.",
      "8.3 Fricción en cimentaciones — coeficiente suelo-hormigón (del estudio geotécnico) resiste el deslizamiento de zapatas y muros."
    ]},
    { t: "Unidad 9 · Centro de gravedad, centroides (complemento)", items: [
      "9.1 Centro de gravedad, centro de masa y centroide — x̄ = Σx̃A/ΣA para áreas compuestas; teorema de Pappus-Guldinus para superficies y volúmenes de revolución.",
      "9.2 Centroides de figuras tipo — rectángulo, triángulo (h/3), semicírculo (4r/3π), perfiles I, T, L, C; tablas de fabricantes.",
      { t: "9.3 Aplicación arquitectónica", ec: "Ecuador: la NEC-SE-DS pide considerar la excentricidad entre centro de masa y centro de rigidez (torsión en planta) y penaliza irregularidades en planta y elevación con coeficientes φP y φE.", mundo: "Mundo: plantas en L, T o U generan torsión sísmica; se recomienda juntas o simetría.", raro: "Poco común: Japón aplica límites estrictos de excentricidad y rigidez relativa entre pisos (Rs, Re) en su norma de construcción.", sub: [
        "9.3.1 Centro de masa de cada piso vs centro de rigidez de columnas y muros.",
        "9.3.2 Estabilidad de elementos exentos (muros, tanques, rótulos, esculturas)."
      ]}
    ]},
    { t: "Unidad 10 · Momentos de inercia (complemento)", items: [
      "10.1 Momento de inercia de áreas — I = ∫y²dA; rectángulo bh³/12; círculo πr⁴/4; mide la rigidez a flexión de una sección (por eso una viga peraltada es más rígida que una ancha).",
      "10.2 Teorema de ejes paralelos (Steiner) — I = Ī + A·d²; secciones compuestas (vigas T, I, cajones).",
      "10.3 Radio de giro r = √(I/A) — base de la esbeltez en columnas (resistencia de materiales).",
      "10.4 Producto de inercia, momento polar J = Ix + Iy (torsión), ejes principales y círculo de Mohr para inercias.",
      "10.5 Momento de inercia de masa — interviene en dinámica y en análisis sísmico (inercia rotacional de los pisos)."
    ]},
    { t: "Unidad 11 · Trabajo virtual (complemento)", items: [
      "11.1 Principio de trabajo virtual — un sistema está en equilibrio si el trabajo virtual de las fuerzas para un desplazamiento compatible es cero.",
      "11.2 Energía potencial y estabilidad del equilibrio (estable, inestable, neutro); introduce el pandeo."
    ]},
    { t: "Unidad 12 · Cargas en edificaciones (puente a la práctica)", items: [
      { t: "12.1 Cargas permanentes (muertas)", ec: "Ecuador: NEC-SE-CG (Cargas no sísmicas) tabula pesos unitarios de materiales (hormigón armado ≈ 24 kN/m³, acero ≈ 78,5 kN/m³, mamposterías según tipo) y cargas de acabados.", sub: [
        "12.1.1 Peso propio de losa, vigas, columnas; acabados de piso, cielos falsos, instalaciones, mamposterías.",
        "12.1.2 Mampostería sobre losa como carga lineal o como carga repartida equivalente."
      ]},
      { t: "12.2 Cargas vivas (sobrecargas de uso)", ec: "Ecuador: NEC-SE-CG fija cargas vivas por ocupación (viviendas, oficinas, hospitales —salas, quirófanos, corredores—, escuelas, bibliotecas, estacionamientos, cubiertas) y permite reducción de carga viva por área tributaria en ciertos casos.", mundo: "Mundo: ASCE 7 (EE. UU.), Eurocódigo 1 (EN 1991), NCh1537 (Chile).", sub: [
        "12.2.1 Cubiertas accesibles vs inaccesibles; cargas de mantenimiento.",
        "12.2.2 Cargas concentradas y de impacto (equipos médicos, maquinaria, ascensores)."
      ]},
      { t: "12.3 Granizo, ceniza, lluvia y viento", ec: "Ecuador: NEC-SE-CG incluye carga de granizo para cubiertas en zonas altas (sierra, sobre cierta altitud) y velocidad básica de viento con factores de exposición y forma; en zonas de volcanes activos se evalúa acumulación de ceniza (Tungurahua, Cotopaxi, Sangay).", raro: "Poco común: Ecuador es de los pocos códigos que combinan granizo y ceniza volcánica como carga de cubierta; Japón y Canadá diseñan con grandes cargas de nieve; el Caribe y Filipinas con viento huracanado extremo.", sub: [
        "12.3.1 Encharcamiento (ponding) en cubiertas planas con drenaje obstruido.",
        "12.3.2 Viento: presión = f(velocidad, exposición, altura, forma); succión en aleros y cubiertas ligeras (levantamiento)."
      ]},
      { t: "12.4 Combinaciones de carga", ec: "Ecuador: NEC-SE-CG y NEC-SE-DS definen combinaciones de diseño por resistencia (ej. 1,4D; 1,2D + 1,6L + 0,5 máx(Lr, S, R); combinaciones con sismo E y viento W) alineadas con ASCE 7 / ACI 318.", sub: [
        "12.4.1 Cargas de servicio (para deflexiones y cimentación por esfuerzos admisibles) vs cargas mayoradas (para resistencia).",
        "12.4.2 Carga sísmica: se trata en NEC-SE-DS (dinámica/resistencia), pero su efecto se transmite por la misma trayectoria de cargas."
      ]},
      "12.5 Trayectoria de cargas y áreas tributarias — cubierta → correas → vigas → columnas/muros → cimentación → suelo; losas en una dirección (reparto a dos apoyos) y en dos direcciones (reparto trapecial/triangular a 45°)."
    ]}
  ],
  fases: [
    { n: "Fase 0 · Datos del sitio y del programa para estructura", pasos: [
      { id: "est-01", t: "Recopilar datos del sitio que definen cargas",
        d: "Pedir país, provincia, cantón, ciudad y ubicación exacta.\n- 1.1 Altitud (para granizo), exposición al viento (urbano denso, abierto, frente al mar/río), cercanía a volcanes (ceniza).\n- 1.2 Zona sísmica y tipo de suelo preliminar (NEC-SE-DS) — Guayaquil está en zona de alta sismicidad y con suelos blandos en amplias zonas.\n- 1.3 Solicitar o prever estudio de suelos (capacidad portante, nivel freático).",
        ec: "Mapa de zonificación sísmica NEC-SE-DS; estudios geotécnicos según NEC-SE-GC; microzonificación sísmica de Guayaquil cuando exista para el sector.",
        sale: "Ficha de datos de sitio para estructura (altitud, viento, sismo, suelo).",
        tags: ["doc"], fuentes: ["ec:nec", "ec:sngr", "earth", "windfinder", "q:microzonificación sísmica {ciudad}"] },
      { id: "est-02", t: "Clasificar los usos del programa según cargas vivas NEC-SE-CG",
        d: "- 2.1 Tomar el programa arquitectónico (áreas por espacio).\n- 2.2 Asignar a cada espacio su ocupación NEC-SE-CG y la carga viva correspondiente.\n- 2.3 Marcar espacios con cargas especiales: archivos, bibliotecas, equipos médicos pesados (imagenología), cuartos de máquinas, tanques, jardineras, piscinas.\n- 2.4 Ubicar cargas pesadas preferiblemente en planta baja o sobre apoyos directos.",
        sale: "Tabla programa × carga viva (kN/m²) y lista de cargas especiales.",
        tags: ["dis", "doc"], fuentes: ["ec:nec"] },
      { id: "est-03", t: "Identificar cargas especiales de la tipología",
        d: "- 3.1 Salud: equipos de imagen (RX, tomógrafo), blindajes de plomo, grupos electrógenos, tanques de oxígeno, cisternas.\n- 3.2 Educación: aglomeración en auditorios, bibliotecas, laboratorios.\n- 3.3 Alimentos: cámaras frías, cocinas industriales.\n- 3.4 Turismo: piscinas en terraza, jacuzzis, jardines.\n- 3.5 Pedir fichas técnicas con peso y huella del equipo.",
        sale: "Lista de equipos con pesos y ubicación para el ingeniero estructural.",
        tags: ["doc", "dis"], cuando: ["salud", "edu", "alim", "tur", "ind"] }
    ]},
    { n: "Fase 1 · Sistema estructural y trayectoria de cargas", pasos: [
      { id: "est-04", t: "Elegir el sistema estructural y su modulación",
        d: "- 4.1 Opciones: pórticos de hormigón armado, pórticos de acero, muros portantes, mampostería confinada/armada, estructura de madera o guadúa, sistemas mixtos.\n- 4.2 Definir retícula de ejes y luces típicas coherentes con el programa (aulas, habitaciones, parqueo bajo edificio).\n- 4.3 Buscar regularidad en planta y elevación (simetría, sin pisos blandos, sin grandes voladizos) para evitar penalizaciones φP/φE de la NEC-SE-DS.\n- 4.4 Alinear columnas verticalmente; evitar columnas que nacen sobre vigas (transferencias).",
        sale: "Planta de ejes estructurales con sistema elegido y luces típicas.",
        tags: ["dis"], fuentes: ["ec:nec", "archdaily"] },
      { id: "est-05", t: "Dibujar el diagrama de trayectoria de cargas",
        d: "- 5.1 Para cargas gravitacionales: cubierta → correas/losa → vigas → columnas → cimentación → suelo.\n- 5.2 Para cargas laterales (sismo/viento): diafragmas (losas) → pórticos/muros → cimentación.\n- 5.3 Marcar discontinuidades (voladizos, transferencias, dobles alturas, rampas) como puntos a revisar con el ingeniero.",
        sale: "Esquema 3D/axonométrico de trayectoria de cargas vertical y lateral.",
        tags: ["dis"] },
      { id: "est-06", t: "Idealizar apoyos y uniones de los elementos típicos",
        d: "- 6.1 Decidir qué uniones son empotradas (monolíticas de hormigón), articuladas (pernos en acero, madera) o deslizantes (apoyos de cubiertas sobre neopreno).\n- 6.2 Identificar si cada subsistema es isostático o hiperestático.\n- 6.3 Detectar restricciones impropias (mecanismos) en cubiertas ligeras y marquesinas.",
        sale: "Esquemas estáticos (modelos idealizados) de viga, pórtico y cubierta típicos.",
        tags: ["dis"] }
    ]},
    { n: "Fase 2 · Cargas y áreas tributarias", pasos: [
      { id: "est-07", t: "Calcular cargas muertas por m² de cada tipo de losa y cubierta",
        d: "- 7.1 Peso propio de losa (maciza o alivianada) + acabados + cielo falso + instalaciones.\n- 7.2 Mampostería: carga lineal (peso unitario × espesor × altura) o equivalente repartida.\n- 7.3 Cubierta ligera: panel metálico/fibrocemento + correas + instalaciones.\n- 7.4 Usar pesos unitarios de la NEC-SE-CG o fichas del fabricante.",
        sale: "Tabla de cargas muertas por sistema de piso y cubierta (kN/m²).",
        tags: ["doc"], fuentes: ["ec:nec"] },
      { id: "est-08", t: "Determinar cargas vivas, de granizo, ceniza y viento aplicables",
        d: "- 8.1 Carga viva por uso (tabla de est-02) y de cubierta (accesible/inaccesible).\n- 8.2 Granizo: solo si la altitud y pendiente de cubierta lo exigen según NEC-SE-CG (sierra).\n- 8.3 Ceniza: si el sitio está en zona de influencia volcánica.\n- 8.4 Viento: velocidad básica, exposición y altura; atención a succión en cubiertas ligeras y aleros grandes (costa).",
        ec: "En Guayaquil normalmente no aplica granizo; sí viento y sismo. En Quito, Ambato, Latacunga, Riobamba sí se revisa granizo y ceniza.",
        sale: "Tabla de cargas vivas y ambientales por zona del edificio.",
        tags: ["doc"], fuentes: ["ec:nec", "ec:inamhi", "windfinder"] },
      { id: "est-09", t: "Plantear las combinaciones de carga de servicio y últimas",
        d: "- 9.1 Servicio: D + L (para cimentación con esfuerzos admisibles y deflexiones).\n- 9.2 Últimas: 1,4D; 1,2D + 1,6L + 0,5Lr; combinaciones con sismo y viento según NEC.\n- 9.3 Identificar la combinación que gobierna para cada elemento típico.",
        sale: "Hoja de combinaciones de carga del proyecto.",
        tags: ["doc"], fuentes: ["ec:nec"] },
      { id: "est-10", t: "Calcular áreas tributarias de vigas, columnas y zapatas",
        d: "- 10.1 Losa en una dirección (relación de lados > 2): carga a las dos vigas largas en franjas.\n- 10.2 Losa en dos direcciones: reparto a 45° (triángulos y trapecios) → carga lineal equivalente en vigas.\n- 10.3 Columnas: área tributaria = mitad de luces adyacentes en cada dirección (interior, borde, esquina).\n- 10.4 Acumular cargas por piso para columna de planta baja: P = Σ(área trib. × carga por m²) + peso propio.",
        sale: "Planta de áreas tributarias y tabla de cargas acumuladas por columna tipo.",
        tags: ["dis", "doc"] }
    ]},
    { n: "Fase 3 · Análisis de elementos típicos", pasos: [
      { id: "est-11", t: "Dibujar DCL de los elementos típicos",
        d: "- 11.1 Viga interior, viga de borde, voladizo, columna, zapata, correa de cubierta, muro de contención.\n- 11.2 Incluir cargas distribuidas, puntuales (vigas que llegan), pesos propios y reacciones desconocidas.\n- 11.3 Reducir cargas distribuidas a resultantes en su centroide para comprobar equilibrio.",
        sale: "Lámina de DCL de elementos típicos.",
        tags: ["dis"] },
      { id: "est-12", t: "Calcular reacciones en apoyos con ecuaciones de equilibrio",
        d: "- 12.1 Aplicar ΣFx = 0, ΣFy = 0, ΣM = 0 a vigas isostáticas y voladizos.\n- 12.2 Para vigas continuas usar coeficientes aproximados (ACI) o software y comparar órdenes de magnitud.\n- 12.3 Reacciones → cargas sobre columnas/muros → sobre cimentación.",
        sale: "Tabla de reacciones por apoyo de elementos típicos.",
        tags: ["dis", "doc"] },
      { id: "est-13", t: "Trazar diagramas de cortante y momento de vigas típicas",
        d: "- 13.1 Casos base: simplemente apoyada (wL²/8), continua (coeficientes), voladizo (wL²/2).\n- 13.2 Usar relaciones dV/dx = −w y dM/dx = V para dibujar rápido.\n- 13.3 Ubicar momentos máximos positivos/negativos y puntos de inflexión (zonas para aberturas de instalaciones y empalmes).\n- 13.4 Pasar Mmáx y Vmáx a resistencia de materiales para peralte.",
        sale: "Diagramas V y M de vigas típicas con valores máximos.",
        tags: ["dis"] },
      { id: "est-14", t: "Predimensionar armaduras de cubierta",
        d: "- 14.1 Elegir tipología (Pratt, Howe, Warren, Fink) según luz y pendiente.\n- 14.2 Peralte de armadura en relación con la luz (del orden de L/10 a L/15 como criterio inicial, a confirmar).\n- 14.3 Cargas en nudos (correas sobre nudos); resolver por nodos o secciones las barras críticas (cordón superior en compresión, inferior en tracción, diagonales).\n- 14.4 Identificar elementos de fuerza cero y arriostramientos laterales.\n- 14.5 Verificar succión de viento: inversión de esfuerzos (cordón inferior puede comprimirse).",
        sale: "Esquema de armadura con fuerzas axiales en barras críticas.",
        tags: ["dis"], fuentes: ["q:armadura de cubierta predimensionamiento acero"] },
      { id: "est-15", t: "Analizar cables, tensores o arcos si el diseño los incluye",
        d: "- 15.1 Cubiertas colgantes o tensadas: flecha f, tensión horizontal T0 = wL²/(8f), tensión máxima en apoyos.\n- 15.2 Arcos: empuje horizontal H = wL²/(8f) → tensor o estribos.\n- 15.3 Anclajes: fuerzas en mástiles y vientos (equilibrio 3D).",
        sale: "Cálculo de tensiones/empujes y reacciones en anclajes.",
        tags: ["dis"] }
    ]},
    { n: "Fase 4 · Estabilidad global", pasos: [
      { id: "est-16", t: "Verificar volteo y deslizamiento de muros de contención",
        d: "- 16.1 Empuje del suelo (triangular) + sobrecarga + agua si aplica.\n- 16.2 FS volteo = ΣM resistentes / ΣM volcadores; FS deslizamiento = (μ·N + pasivo) / empuje, con valores mínimos de NEC-SE-GC.\n- 16.3 Resultante en el tercio central de la base.\n- 16.4 Drenaje del trasdós (lloraderos, geotextil, tubo perforado).",
        ec: "NEC-SE-GC exige verificaciones estáticas y sísmicas de muros; parámetros del suelo del estudio geotécnico.",
        sale: "Verificación de estabilidad de muros típicos.",
        tags: ["dis", "mant"], fuentes: ["ec:nec"] },
      { id: "est-17", t: "Verificar voladizos, marquesinas y elementos exentos",
        d: "- 17.1 Relación voladizo/tramo de anclaje (contrapeso).\n- 17.2 Momento de volteo de rótulos, parapetos, antepechos altos, tanques elevados por viento y sismo.\n- 17.3 Anclajes químicos o mecánicos con fuerzas de diseño.",
        sale: "Lista de elementos en voladizo/exentos con su verificación.",
        tags: ["dis"] },
      { id: "est-18", t: "Revisar centro de masa vs centro de rigidez en planta",
        d: "- 18.1 Calcular el centroide de las masas de cada piso (áreas × cargas).\n- 18.2 Estimar el centro de rigidez con la ubicación de columnas y muros.\n- 18.3 Si la excentricidad es grande, redistribuir muros/núcleos o crear juntas sísmicas.\n- 18.4 Revisar irregularidades en planta y elevación según NEC-SE-DS.",
        sale: "Diagrama de CM y CR por piso con decisión de ajustes.",
        tags: ["dis"], fuentes: ["ec:nec"] }
    ]},
    { n: "Fase 5 · Coordinación y documentación", pasos: [
      { id: "est-19", t: "Preparar el paquete de información para el ingeniero estructural",
        d: "- 19.1 Plantas con ejes, niveles y cortes.\n- 19.2 Tabla de usos y cargas vivas, cargas especiales y equipos.\n- 19.3 Restricciones arquitectónicas: peraltes máximos, luces deseadas, dobles alturas, voladizos, ductos.\n- 19.4 Modelo BIM/IFC arquitectónico si se trabaja en BIM.",
        sale: "Paquete de coordinación arquitectura–estructura.",
        tags: ["doc", "bim"], fuentes: ["ifc", "iso19650"] },
      { id: "est-20", t: "Coordinar el predimensionamiento con el cálculo estructural",
        d: "- 20.1 Comparar tus reacciones y diagramas con los del ingeniero (orden de magnitud).\n- 20.2 Ajustar secciones y peraltes en planos arquitectónicos.\n- 20.3 Detección de interferencias: vigas vs ductos, alturas libres, pases de instalaciones en zonas de bajo cortante/momento.\n- 20.4 Registrar acuerdos en actas.",
        sale: "Actas de coordinación y planos ajustados.",
        tags: ["doc", "bim"] },
      { id: "est-21", t: "Integrar la memoria estructural al expediente del permiso",
        d: "- 21.1 Verificar que la memoria de cálculo cite NEC-SE-CG, NEC-SE-DS, NEC-SE-GC y la norma de material.\n- 21.2 Firmas de responsabilidad del ingeniero estructural.\n- 21.3 Coherencia entre planos arquitectónicos y estructurales.",
        ec: "Los municipios (en Guayaquil, la Dirección de Control de Edificaciones / trámite de Registro de Construcción) solicitan planos y memoria estructural firmados; obras grandes pueden requerir revisión estructural adicional.",
        sale: "Memoria estructural y planos estructurales incorporados al expediente.",
        tags: ["doc"], fuentes: ["gye:muni", "q:requisitos permiso de construcción {canton}"] },
      { id: "est-22", t: "Registrar cargas de diseño para la operación del edificio",
        d: "- 22.1 Placa o tabla de cargas máximas admisibles por zona (bodegas, cubiertas accesibles, cuartos de equipos).\n- 22.2 Incluir en el manual de uso y mantenimiento: prohibición de cambios de uso sin revisión estructural.",
        sale: "Tabla de cargas admisibles por zona para el manual del usuario.",
        tags: ["mant", "doc"] }
    ]}
  ]
});
