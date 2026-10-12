window.FLUJO_M = window.FLUJO_M || [];
FLUJO_M.push({
  id: "res",
  orden: 10,
  n: "Resistencia de materiales",
  corto: "Resistencia",
  para: "Explica cómo los materiales se deforman y fallan bajo carga, y con eso permite elegir el material estructural, predimensionar losas, vigas, columnas y zapatas, controlar deflexiones y especificar calidades y ensayos. En el flujo va inmediatamente después de Estática: toma sus cargas, reacciones y momentos y los convierte en secciones, materiales y especificaciones verificables en obra.",
  indice: [
    { t: "Unidad 1 · Esfuerzo y deformación", items: [
      { t: "1.1 Esfuerzo", sub: [
        "1.1.1 Esfuerzo normal σ = P/A (tracción +, compresión −); unidades Pa, MPa (N/mm²), kg/cm².",
        "1.1.2 Esfuerzo cortante promedio τ = V/A; cortante simple y doble (pernos, pasadores).",
        "1.1.3 Esfuerzo de aplastamiento (bearing) en placas de apoyo y conexiones.",
        "1.1.4 Esfuerzo admisible y factor de seguridad (ASD) vs diseño por resistencia/estados límite (LRFD): φRn ≥ ΣγQ."
      ]},
      { t: "1.2 Deformación", sub: [
        "1.2.1 Deformación unitaria normal ε = δ/L (adimensional) y angular γ (rad).",
        "1.2.2 Diagrama esfuerzo-deformación: límite de proporcionalidad, límite elástico, fluencia (fy), endurecimiento, resistencia última (fu), estricción, rotura.",
        "1.2.3 Materiales dúctiles (acero) vs frágiles (hormigón a tracción, vidrio, fundición); tenacidad y resiliencia (áreas bajo la curva).",
        "1.2.4 Fluencia lenta (creep) y retracción del hormigón: deformaciones que crecen con el tiempo sin aumentar la carga."
      ]},
      { t: "1.3 Ley de Hooke y constantes elásticas", sub: [
        "1.3.1 σ = E·ε en el rango elástico; τ = G·γ.",
        "1.3.2 Módulo de elasticidad: acero ≈ 200 000 MPa; hormigón según f'c (ACI: Ec ≈ 4700·√f'c en MPa; la NEC-SE-HM da su propia expresión, verificar con agregados locales); madera según especie y dirección de fibra; aluminio ≈ 70 000 MPa.",
        "1.3.3 Coeficiente de Poisson ν = −εlat/εlong: acero ≈ 0,3; hormigón ≈ 0,15–0,2.",
        "1.3.4 G = E / (2(1+ν)); ley de Hooke generalizada en 3D.",
        "1.3.5 Deformaciones térmicas δT = α·ΔT·L; esfuerzos térmicos si la dilatación está restringida (justifica juntas)."
      ]}
    ]},
    { t: "Unidad 2 · Carga axial", items: [
      "2.1 Alargamiento de barras δ = PL/(AE); barras escalonadas y de sección variable.",
      "2.2 Principio de superposición y principio de Saint-Venant (concentración local de esfuerzos cerca de cargas y apoyos).",
      "2.3 Elementos estáticamente indeterminados a carga axial — compatibilidad de deformaciones; columnas compuestas acero-hormigón.",
      "2.4 Concentraciones de esfuerzos — agujeros, cambios bruscos de sección, esquinas de vanos en muros y losas (origen de fisuras diagonales en esquinas de ventanas)."
    ]},
    { t: "Unidad 3 · Torsión", items: [
      "3.1 Torsión en ejes circulares — τ = T·ρ/J; ángulo de giro φ = TL/(GJ).",
      "3.2 Secciones no circulares y de pared delgada — flujo de cortante q = T/(2Am) (secciones cerradas); secciones abiertas (perfiles C, I) son débiles a torsión.",
      "3.3 Torsión en edificios — vigas de borde que reciben losas en voladizo; torsión en planta por excentricidad sísmica (ver Estática)."
    ]},
    { t: "Unidad 4 · Flexión", items: [
      { t: "4.1 Flexión pura y fórmula de la flexión", sub: [
        "4.1.1 Eje neutro, hipótesis de secciones planas (Navier-Bernoulli).",
        "4.1.2 σ = M·y/I; módulo de sección S = I/c; secciones eficientes (I, cajón) alejan el material del eje neutro.",
        "4.1.3 Flexión asimétrica y ejes principales."
      ]},
      { t: "4.2 Vigas compuestas y de hormigón armado", sub: [
        "4.2.1 Sección transformada (n = Es/Ec).",
        "4.2.2 Hormigón armado: el acero toma la tracción, el hormigón la compresión; bloque de Whitney; cuantía mínima, balanceada y máxima.",
        "4.2.3 Falla dúctil (sub-reforzada) deseable vs falla frágil (sobre-reforzada).",
        "4.2.4 Vigas T (losa colaborante) y losas alivianadas nervadas."
      ]},
      "4.3 Flexión inelástica y momento plástico — Mp = Z·fy; rótulas plásticas; base del diseño sismorresistente por capacidad (columna fuerte – viga débil)."
    ]},
    { t: "Unidad 5 · Cortante transversal", items: [
      "5.1 Fórmula del cortante τ = VQ/(It); distribución parabólica en secciones rectangulares (τmáx = 1,5 V/A).",
      "5.2 Flujo de cortante en elementos compuestos — conectores de corte en losas colaborantes (steel deck), pernos y soldaduras de vigas armadas.",
      "5.3 Cortante en hormigón — fisuras diagonales; aporte del hormigón Vc y de estribos Vs; confinamiento en zonas de rótula plástica (NEC-SE-HM exige estribos cercanos en extremos de vigas y columnas).",
      "5.4 Punzonamiento en losas planas y zapatas — cortante en dos direcciones alrededor de la columna; capiteles, ábacos o espesor mayor."
    ]},
    { t: "Unidad 6 · Deflexiones", items: [
      { t: "6.1 Curva elástica", sub: [
        "6.1.1 EI·y″ = M(x); doble integración con condiciones de borde.",
        "6.1.2 Fórmulas tipo: simplemente apoyada con carga uniforme δ = 5wL⁴/(384EI); voladizo con carga uniforme δ = wL⁴/(8EI); con carga puntual en extremo δ = PL³/(3EI).",
        "6.1.3 Métodos: área-momento, viga conjugada, superposición, trabajo virtual (carga unitaria)."
      ]},
      { t: "6.2 Límites de deflexión", mundo: "Mundo (ACI 318/AISC): del orden de L/360 por carga viva inmediata en pisos, L/240 a L/480 para deflexión diferida según si hay elementos no estructurales frágiles susceptibles de dañarse; L/180 en cubiertas sin cielos frágiles.", ec: "Ecuador: NEC-SE-HM remite a ACI 318 para control de deflexiones y espesores mínimos; importante en losas que soportan mampostería de bloque (fisuración).", sub: [
        "6.2.1 Deflexión diferida por fluencia lenta del hormigón (multiplicador sobre la inmediata).",
        "6.2.2 Contraflecha en vigas de acero y armaduras de gran luz.",
        "6.2.3 Vibración de pisos: frecuencia natural mínima para confort (pasarelas, gimnasios, losas largas ligeras)."
      ]},
      "6.3 Vigas estáticamente indeterminadas — uso de compatibilidad de deflexiones para hallar reacciones (vigas continuas, empotradas)."
    ]},
    { t: "Unidad 7 · Transformación de esfuerzos y esfuerzos combinados", items: [
      "7.1 Estado plano de esfuerzos — transformación con ángulo θ; esfuerzos principales σ1, σ2 y cortante máximo.",
      "7.2 Círculo de Mohr — representación gráfica; orientación de fisuras (perpendiculares a σ1 en hormigón).",
      "7.3 Carga combinada — flexocompresión en columnas (σ = P/A ± M·c/I), núcleo central de la sección, cargas excéntricas en zapatas (presión trapecial o triangular en el suelo).",
      "7.4 Diagramas de interacción P–M de columnas de hormigón armado — la columna se verifica para pares (Pu, Mu).",
      "7.5 Criterios de falla — Tresca, von Mises (dúctiles), Mohr-Coulomb (hormigón, suelos, mampostería)."
    ]},
    { t: "Unidad 8 · Pandeo de columnas", items: [
      { t: "8.1 Carga crítica de Euler", sub: [
        "8.1.1 Pcr = π²EI/(KL)²; esfuerzo crítico σcr = π²E/(KL/r)².",
        "8.1.2 Factor de longitud efectiva K: empotrada-libre 2,0; articulada-articulada 1,0; empotrada-articulada ≈ 0,7; empotrada-empotrada 0,5 (valores teóricos; los de diseño son algo mayores).",
        "8.1.3 Esbeltez λ = KL/r; columnas cortas (fallan por aplastamiento), intermedias (inelásticas) y largas (Euler)."
      ]},
      "8.2 Columnas en la práctica — curvas de diseño AISC 360 (pandeo inelástico); efectos de esbeltez y magnificación de momentos en hormigón (ACI 318); pandeo local de alas y almas en perfiles delgados y pandeo lateral-torsional de vigas.",
      "8.3 Arriostramiento — reduce KL; pórticos arriostrados vs no arriostrados (desplazables); efectos P-Δ en edificios altos (la NEC-SE-DS los exige verificar mediante índice de estabilidad)."
    ]},
    { t: "Unidad 9 · Propiedades de materiales estructurales", items: [
      { t: "9.1 Hormigón", ec: "Ecuador: NEC-SE-HM fija f'c mínimo estructural de 21 MPa (≈ 210 kg/cm²); en Guayaquil es común 24–28 MPa y más en edificios altos. Premezclado según NTE INEN 1855; cemento según NTE INEN 2380 / INEN 490 (cementos hidráulicos y compuestos).", mundo: "Mundo: ACI 318 (EE. UU. y Latinoamérica), Eurocódigo 2 (Europa, clases C20/25, C30/37…), hormigones de alta resistencia y autocompactantes.", raro: "Poco común: el Panteón de Roma (s. II) sigue en pie con hormigón romano sin armadura, con agregados más ligeros hacia la cúpula; investigaciones recientes explican su autorreparación por clastos de cal.", sub: [
        "9.1.1 f'c a 28 días; relación agua/cemento (principal factor de resistencia y durabilidad).",
        "9.1.2 Resistencia a tracción baja (módulo de rotura del orden de 0,6–0,7·√f'c MPa); fisuración.",
        "9.1.3 Durabilidad: exposición a cloruros (costa, Guayaquil y ambiente salino), sulfatos (suelos), carbonatación; recubrimientos mínimos y relación a/c máxima por clase de exposición (ACI 318 cap. 19–20).",
        "9.1.4 Aditivos: plastificantes, retardantes (clima cálido), incorporadores de aire, fibras."
      ]},
      { t: "9.2 Acero de refuerzo", ec: "Ecuador: varillas corrugadas soldables fy = 420 MPa (≈ 4200 kg/cm²) según NTE INEN 2167; mallas electrosoldadas NTE INEN 2209; fabricantes locales (Adelca, Novacero, Andec).", mundo: "Mundo: ASTM A615 / A706 (soldable, sismorresistente) grado 60; B500 en Europa.", sub: [
        "9.2.1 Diámetros comerciales y áreas; empalmes por traslape y ganchos.",
        "9.2.2 Ductilidad: relación fu/fy y elongación mínima exigidas para zonas sísmicas."
      ]},
      { t: "9.3 Acero estructural", ec: "Ecuador: NEC-SE-AC (Estructuras de acero) remite a AISC 360 y AISC 341 (sísmico); perfiles laminados importados y perfiles armados/doblados en frío de producción local; soldadura AWS D1.1.", mundo: "Mundo: ASTM A36 (fy ≈ 250 MPa), A572 Gr. 50 y A992 (fy ≈ 345 MPa), A500 tubos; E ≈ 200 000 MPa; peso ≈ 78,5 kN/m³.", sub: [
        "9.3.1 Perfiles laminados (W, HEB, IPE), armados, conformados en frío (G, C, correas), tubulares.",
        "9.3.2 Conexiones empernadas y soldadas; conexiones precalificadas para pórticos especiales (AISC 358).",
        "9.3.3 Protección: pintura anticorrosiva, galvanizado, intumescente/ignífugo para resistencia al fuego."
      ]},
      { t: "9.4 Madera y guadúa", ec: "Ecuador: NEC-SE-MD (Estructuras de madera) con grupos estructurales de especies; NEC-SE-GUADÚA (estructuras de guadúa angustifolia Kunth) regula diseño con caña guadúa, preservación y uniones. La guadúa es abundante en Manabí, Guayas, Los Ríos, Esmeraldas.", mundo: "Mundo: madera laminada encolada (glulam), CLT (paneles de madera contralaminada), LVL; Eurocódigo 5, NDS (EE. UU.).", raro: "Poco común: Europa construye torres de madera CLT/glulam (Mjøstårnet en Noruega, ≈ 85 m); Colombia y Ecuador son referentes del bambú estructural (Simón Vélez); Japón mantiene la carpintería de ensambles sin clavos y pagodas de madera centenarias con pilar central (shinbashira).", sub: [
        "9.4.1 Anisotropía: resistencia paralela vs perpendicular a la fibra; contenido de humedad; clases de servicio.",
        "9.4.2 Durabilidad: preservación contra hongos e insectos, protección contra humedad por diseño (aleros, zócalos).",
        "9.4.3 Guadúa: uniones con pernos y mortero en entrenudos, preservación con sales de boro."
      ]},
      { t: "9.5 Mampostería", ec: "Ecuador: NEC-SE-MP (mampostería estructural: confinada y armada); bloques de hormigón según NTE INEN 3066; ladrillo; la mampostería no confinada falló masivamente en el terremoto del 16 de abril de 2016 (Manabí, Esmeraldas).", mundo: "Mundo: mampostería confinada (Chile, Perú, México), armada con celdas rellenas (EE. UU., TMS 402).", raro: "Poco común: Perú (Norma E.080) y otros países andinos regulan la construcción con tierra reforzada (adobe con geomalla o caña).", sub: [
        "9.5.1 Resistencia a compresión f'm del conjunto unidad + mortero; mortero tipos por resistencia.",
        "9.5.2 Comportamiento sísmico: fisura diagonal por cortante, volteo fuera del plano de muros altos sin arriostrar."
      ]},
      { t: "9.6 Aluminio, vidrio y otros", sub: [
        "9.6.1 Aluminio estructural: E ≈ 1/3 del acero (más deflexión), buena resistencia a corrosión, aleaciones 6061/6063 en perfilería; par galvánico con acero.",
        "9.6.2 Vidrio estructural: templado, laminado, termoendurecido; frágil; diseño por probabilidad de rotura.",
        "9.6.3 Polímeros reforzados con fibra (FRP) para refuerzo de estructuras existentes."
      ]}
    ]},
    { t: "Unidad 10 · Comportamiento sísmico, ductilidad y fatiga", items: [
      { t: "10.1 Ductilidad y diseño por capacidad", ec: "Ecuador: NEC-SE-DS define el espectro de diseño, el factor de reducción R según el sistema (mayor para pórticos especiales dúctiles), derivas máximas (0,02 para hormigón armado, acero y madera; 0,01 para mampostería) e irregularidades; Guayaquil se ubica en zona sísmica de alta peligrosidad (Z = 0,40) con suelos que amplifican (tipos D, E, F en amplias zonas).", mundo: "Mundo: ASCE 7 + ACI 318 cap. 18 / AISC 341; Eurocódigo 8.", sub: [
        "10.1.1 Ductilidad μ = δu/δy; disipación de energía por rótulas plásticas en vigas.",
        "10.1.2 Columna fuerte – viga débil; nudos confinados; detallado especial.",
        "10.1.3 Deriva de piso y daño a elementos no estructurales (mamposterías, fachadas de vidrio)."
      ]},
      { t: "10.2 Sistemas de protección sísmica", raro: "Poco común: Japón tiene miles de edificios con aislamiento de base y disipadores (tras Kobe 1995) y hasta viviendas unifamiliares aisladas; Chile masificó el aislamiento en hospitales y edificios altos tras 2010 y su norma NCh433 es referencia; Nueva Zelanda fue pionera (edificio William Clayton, 1981). En Ecuador ya existen edificios aislados en Guayaquil y Quito.", sub: [
        "10.2.1 Aislamiento de base: aisladores elastoméricos con núcleo de plomo, péndulos de fricción.",
        "10.2.2 Disipadores: viscosos, metálicos por fluencia (BRB), de fricción.",
        "10.2.3 Amortiguadores de masa sintonizada en torres (Taipei 101)."
      ]},
      "10.3 Fatiga — falla por ciclos repetidos por debajo de fy; curva S-N; relevante en puentes, grúas, conexiones soldadas de estructuras con vibración (pasarelas, maquinaria).",
      "10.4 Temperatura y fuego — pérdida de resistencia del acero a alta temperatura; recubrimiento del hormigón como protección; resistencia al fuego de elementos (NEC-HS-CI y NFPA)."
    ]},
    { t: "Unidad 11 · Normativa estructural", items: [
      { t: "11.1 Norma Ecuatoriana de la Construcción (NEC)", ec: "Ecuador: capítulos de seguridad estructural NEC-SE-CG (cargas no sísmicas), NEC-SE-DS (peligro sísmico y diseño sismorresistente), NEC-SE-RE (riesgo sísmico, evaluación y rehabilitación), NEC-SE-GC (geotecnia y cimentaciones), NEC-SE-HM (hormigón armado), NEC-SE-AC (acero), NEC-SE-MP (mampostería estructural), NEC-SE-MD (madera), NEC-SE-GUADÚA, NEC-SE-VIVIENDA (viviendas de hasta 2 pisos con luces de hasta 5 m). Publicada por el MIDUVI.", sub: [
        "11.1.1 Jerarquía: la NEC es obligatoria a nivel nacional; los GAD pueden exigir requisitos adicionales en ordenanzas.",
        "11.1.2 Remisiones: NEC-SE-HM → ACI 318; NEC-SE-AC → AISC 360/341; NEC-SE-GC → prácticas ASTM de ensayos de suelos."
      ]},
      { t: "11.2 Normas internacionales de referencia", mundo: "Mundo: ACI 318 (hormigón), AISC 360 (acero), AISC 341 (sísmico acero), ASCE 7 (cargas), TMS 402 (mampostería), NDS (madera), Eurocódigos EN 1990–1999, ISO 22156 (bambú).", raro: "Poco común: ISO 22156 es una de las pocas normas internacionales para bambú estructural; China y Japón tienen normas propias de bambú laminado y de carpintería tradicional." }
    ]},
    { t: "Unidad 12 · Ensayos y control de calidad", items: [
      { t: "12.1 Hormigón", ec: "Ecuador: NTE INEN 1576 (elaboración y curado de probetas en obra), NTE INEN 1573 (ensayo a compresión de cilindros), NTE INEN 1578 (asentamiento/slump), NTE INEN 1855 (hormigón premezclado); equivalentes ASTM C31, C39, C143, C94.", mundo: "Mundo: criterio ACI 318: frecuencia de muestreo mínima (por día de vaciado, por volumen y por área de losa); aceptación si el promedio de tres ensayos consecutivos ≥ f'c y ningún ensayo individual cae muy por debajo de f'c.", sub: [
        "12.1.1 Probetas cilíndricas ensayadas a 7, 14 y 28 días (a 7 días se espera una fracción importante de f'c; el valor de aceptación es a 28 días).",
        "12.1.2 Ensayos in situ ante resultados bajos: núcleos (extracción), esclerómetro, ultrasonido (orientativos).",
        "12.1.3 Curado: mantener humedad al menos los primeros días; en clima cálido de Guayaquil la evaporación rápida genera fisuras plásticas."
      ]},
      "12.2 Acero — certificados de calidad por lote (fy, fu, elongación), ensayo de tracción y doblado (NTE INEN 2167 / ASTM A370); inspección de soldaduras (visual, tintes penetrantes, ultrasonido, AWS D1.1).",
      "12.3 Mampostería y morteros — resistencia a compresión de bloques (INEN), prismas de mampostería, cubos de mortero.",
      "12.4 Madera y guadúa — contenido de humedad, densidad, clasificación visual; certificados de preservación.",
      "12.5 Suelos — ensayos de compactación (Proctor), densidad de campo, placa de carga; SPT y laboratorio del estudio geotécnico (NEC-SE-GC)."
    ]}
  ],
  fases: [
    { n: "Fase 0 · Elección de material y sistema", pasos: [
      { id: "res-01", t: "Evaluar condiciones del sitio que afectan el material",
        d: "Pedir país, provincia, cantón y ubicación exacta.\n- 1.1 Zona sísmica y tipo de suelo (NEC-SE-DS) → exigencia de ductilidad.\n- 1.2 Exposición ambiental: cloruros (costa/estuario), humedad, sulfatos en suelo, temperatura.\n- 1.3 Disponibilidad local de materiales y mano de obra calificada (hormigón premezclado, acero, guadúa, madera).\n- 1.4 Accesibilidad de la obra para bombas de hormigón, grúas, camiones de perfiles.",
        ec: "Guayaquil: zona sísmica alta, suelos blandos en amplias zonas, ambiente cálido húmedo con influencia salina del estero y el río Guayas → atención a corrosión del acero.",
        sale: "Ficha de condicionantes de material (sismo, suelo, exposición, logística).",
        tags: ["dis", "doc"], fuentes: ["ec:nec", "ec:sngr", "q:microzonificación sísmica {ciudad}"] },
      { id: "res-02", t: "Elegir el material estructural según tipología, sitio y carbono",
        d: "- 2.1 Comparar hormigón armado, acero, mixto, mampostería armada/confinada, madera, guadúa según: luces, altura, plazos, costo, mantenimiento, resistencia al fuego, huella de carbono.\n- 2.2 Tipología: hospitales y centros de salud → estructura con alto desempeño sísmico (considerar aislamiento/disipación); viviendas ≤ 2 pisos → NEC-SE-VIVIENDA; cubiertas de gran luz → acero o madera laminada.\n- 2.3 Estimar carbono incorporado (cemento y acero son los mayores emisores): optimizar secciones, cementos con adiciones, acero con contenido reciclado, madera/guadúa certificada.\n- 2.4 Documentar la decisión en matriz multicriterio.",
        sale: "Matriz multicriterio de elección de material con justificación.",
        tags: ["dis", "sost"], fuentes: ["edge", "q:huella de carbono incorporado materiales construcción Ecuador", "archdaily"] },
      { id: "res-03", t: "Definir el nivel de desempeño sísmico según uso",
        d: "- 3.1 Clasificar la categoría de la edificación y su factor de importancia según NEC-SE-DS (edificaciones esenciales como hospitales y bomberos tienen mayor exigencia).\n- 3.2 Decidir con el ingeniero si se evaluará aislamiento de base o disipadores.\n- 3.3 Establecer derivas objetivo y protección de elementos no estructurales.",
        ec: "Establecimientos de salud: el MSP y el programa de Hospitales Seguros (OPS/OMS) exigen continuidad de funcionamiento tras sismos.",
        sale: "Definición de categoría, importancia y objetivo de desempeño.",
        tags: ["dis", "doc"], cuando: ["salud", "edu", "pub", "grande"], fuentes: ["ec:nec", "ec:msp", "who"] }
    ]},
    { n: "Fase 1 · Predimensionamiento de elementos", pasos: [
      { id: "res-04", t: "Predimensionar losas por espesor mínimo (regla h = L/…)",
        d: "Regla de prediseño (ACI 318, sin cálculo de deflexiones):\n- 4.1 Losa maciza en una dirección: simplemente apoyada h ≈ L/20; un extremo continuo L/24; ambos continuos L/28; voladizo L/10.\n- 4.2 Losa nervada/alivianada en una dirección: L/16; L/18,5; L/21; voladizo L/8.\n- 4.3 Losas en dos direcciones: tablas ACI según perímetro y relación de lados.\n- 4.4 Losa alivianada con bloque: definir altura total (bloque + loseta) y peso.\n- 4.5 Marcar que es PREDISEÑO: el ingeniero confirma con cálculo de deflexiones.",
        sale: "Espesores preliminares de losas por paño con su luz y condición de apoyo.",
        tags: ["dis"], fuentes: ["ec:nec"] },
      { id: "res-05", t: "Predimensionar vigas (peralte y ancho)",
        d: "- 5.1 Peralte inicial con las mismas relaciones L/16 (apoyo simple), L/18,5, L/21, L/8 (voladizo) o por criterio práctico L/10–L/12 en pórticos sísmicos.\n- 5.2 Ancho b ≈ 0,4–0,6 h y no menor al mínimo de la NEC-SE-HM para vigas de pórticos especiales.\n- 5.3 Verificar con Mmáx de Estática: M ≈ φ·(cuantía)·b·d²… (orden de magnitud).\n- 5.4 Chequear que el peralte no rompa alturas libres de cielos e instalaciones.",
        sale: "Secciones preliminares de vigas tipo + impacto en cortes arquitectónicos.",
        tags: ["dis"], fuentes: ["ec:nec"] },
      { id: "res-06", t: "Predimensionar columnas (A ≈ P/(0,45 f'c) como regla de prediseño)",
        d: "Regla preliminar para columnas de hormigón armado con carga axial de servicio P:\n- 6.1 Tomar P acumulada de áreas tributarias (Estática, est-10).\n- 6.2 Área bruta Ag ≈ P / (0,45·f'c) para columnas interiores; usar un coeficiente menor (más área) en columnas de borde y esquina por mayores momentos.\n- 6.3 Respetar la dimensión mínima de la NEC-SE-HM para columnas de pórticos especiales y la relación entre lados.\n- 6.4 Verificar esbeltez KL/r en columnas altas o de doble altura.\n- 6.5 Columnas de acero: área y radio de giro con tablas AISC para la longitud efectiva.\n- 6.6 Dejar anotado que es PREDISEÑO sujeto al análisis sísmico (el sismo suele gobernar en Guayaquil).",
        sale: "Tabla de columnas tipo con carga estimada y sección preliminar.",
        tags: ["dis"], fuentes: ["ec:nec"] },
      { id: "res-07", t: "Predimensionar zapatas con la capacidad portante del estudio de suelos",
        d: "- 7.1 Obtener del estudio geotécnico: capacidad admisible qa, profundidad de desplante, nivel freático, asentamientos esperados, recomendaciones (zapatas aisladas, corridas, losa, pilotes).\n- 7.2 Área de zapata A ≈ (P servicio × factor por peso propio y relleno) / qa.\n- 7.3 Si las zapatas se tocan o superan cierta fracción de la planta → zapatas corridas o losa de cimentación.\n- 7.4 En suelos blandos de Guayaquil es habitual recurrir a pilotes o mejoramiento; no asumir zapatas sin estudio.\n- 7.5 Vigas de amarre/riostras entre zapatas (exigidas en zona sísmica).",
        ec: "NEC-SE-GC define número mínimo de sondeos según categoría de la edificación y las verificaciones de capacidad y asentamiento.",
        sale: "Planta preliminar de cimentación con dimensiones de zapatas o tipo de cimentación.",
        tags: ["dis"], fuentes: ["ec:nec", "q:estudio de suelos {ciudad}"] },
      { id: "res-08", t: "Predimensionar muros estructurales y mampostería",
        d: "- 8.1 Muros de corte de hormigón: espesor mínimo y cuantía en planta según NEC-SE-HM; ubicarlos simétricos (núcleos de escaleras/ascensores).\n- 8.2 Mampostería confinada o armada: espesor, densidad de muros por dirección, confinamientos (columnetas/vigas) según NEC-SE-MP.\n- 8.3 Mampostería no estructural: aislarla del pórtico o anclarla para evitar columna corta y volteo.",
        sale: "Planta de muros estructurales y criterios de mampostería.",
        tags: ["dis"], fuentes: ["ec:nec"] },
      { id: "res-09", t: "Predimensionar estructura de madera o guadúa si aplica",
        d: "- 9.1 Madera: grupo estructural de la especie (NEC-SE-MD), secciones comerciales, deflexión (suele gobernar).\n- 9.2 Guadúa: diámetros y espesores de pared, culmos múltiples, uniones empernadas con mortero, cimiento aislado de la humedad (NEC-SE-GUADÚA).\n- 9.3 Protección por diseño: aleros amplios, sobrecimiento, ventilación.",
        sale: "Esquema de secciones de madera/guadúa y detalles de unión preliminares.",
        tags: ["dis", "sost"], fuentes: ["ec:nec", "q:NEC-SE-GUADÚA diseño"] },
      { id: "res-10", t: "Predimensionar cubiertas metálicas y correas",
        d: "- 10.1 Correas: perfiles G/C doblados en frío; luz entre pórticos y separación según panel de cubierta (tabla del fabricante).\n- 10.2 Pórticos o armaduras: cordones y diagonales con fuerzas de Estática (est-14), esbeltez de barras comprimidas.\n- 10.3 Verificar succión de viento: anclajes y arriostramientos (tensores/cruces de San Andrés).",
        sale: "Secciones preliminares de correas y armaduras.",
        tags: ["dis"] }
    ]},
    { n: "Fase 2 · Deformaciones, juntas y durabilidad", pasos: [
      { id: "res-11", t: "Controlar deflexiones de losas, vigas y voladizos",
        d: "- 11.1 Calcular deflexión inmediata con fórmulas tipo (5wL⁴/384EI; wL⁴/8EI) usando inercia fisurada estimada.\n- 11.2 Añadir deflexión diferida (fluencia lenta).\n- 11.3 Comparar con límites L/360, L/240, L/480 según haya mampostería o acabados frágiles.\n- 11.4 Voladizos largos y losas que soportan mampostería: considerar contraflecha o mayor peralte.",
        sale: "Verificación de deflexiones de elementos críticos.",
        tags: ["dis", "mant"] },
      { id: "res-12", t: "Definir juntas sísmicas y de dilatación",
        d: "- 12.1 Juntas sísmicas: separar bloques irregulares (L, T, U) o de distinta altura; ancho según derivas máximas de ambos bloques (NEC-SE-DS) — también respecto a edificios vecinos.\n- 12.2 Juntas de dilatación térmica en edificios largos y cubiertas metálicas.\n- 12.3 Juntas de control en pisos y mampostería.\n- 12.4 Detalle arquitectónico de la junta: tapajuntas en pisos, muros, cubierta y fachada que permitan el movimiento.",
        ec: "La NEC-SE-DS exige separación mínima entre estructuras adyacentes para evitar golpeteo (pounding), frecuente en daños del sismo de 2016.",
        sale: "Plano de juntas y detalles constructivos de tapajuntas.",
        tags: ["dis", "mant"], fuentes: ["ec:nec", "familias-emseal"] },
      { id: "res-13", t: "Definir recubrimientos y medidas contra corrosión",
        d: "- 13.1 Clase de exposición (interior, intemperie, contacto con suelo, ambiente marino/cloruros).\n- 13.2 Recubrimientos mínimos del refuerzo según ACI 318 / NEC-SE-HM (mayor en contacto con suelo y a la intemperie).\n- 13.3 Relación a/c máxima y f'c mínima por durabilidad.\n- 13.4 Acero estructural: sistema de pintura (primer + intermedio + acabado) o galvanizado según ambiente; evitar pares galvánicos (aluminio-acero).\n- 13.5 Detalles que evitan agua estancada en estructuras metálicas.",
        sale: "Tabla de recubrimientos y sistemas de protección por elemento.",
        tags: ["mant", "doc"], fuentes: ["q:ACI 318 recubrimiento mínimo exposición"] },
      { id: "res-14", t: "Revisar resistencia al fuego de elementos estructurales",
        d: "- 14.1 Determinar la resistencia al fuego exigida por uso y altura (NEC-HS-CI, Bomberos).\n- 14.2 Hormigón: recubrimiento y espesores mínimos.\n- 14.3 Acero: pintura intumescente, recubrimientos proyectados, encamisados.\n- 14.4 Madera: sección de sacrificio (carbonización).",
        sale: "Especificación de protección al fuego de la estructura.",
        tags: ["doc", "mant"], cuando: ["grande", "salud", "edu", "tur", "pub"], fuentes: ["ec:nec", "gye:bomberos", "nfpa"] }
    ]},
    { n: "Fase 3 · Especificaciones técnicas de materiales", pasos: [
      { id: "res-15", t: "Especificar el hormigón por elemento",
        d: "- 15.1 f'c por elemento (cimentación, columnas, vigas, losas, muros, contrapisos no estructurales).\n- 15.2 Tamaño máximo de agregado, asentamiento, a/c máxima, tipo de cemento, aditivos.\n- 15.3 Premezclado vs hecho en obra; bombeo.\n- 15.4 Curado mínimo y protección en clima cálido.",
        ec: "Premezclado NTE INEN 1855; cemento según NTE INEN 2380/490; cita en especificaciones del rubro (formato de SERCOP en obra pública).",
        sale: "Especificación técnica de hormigones.",
        tags: ["doc"], fuentes: ["ec:inen", "ec:sercop"] },
      { id: "res-16", t: "Especificar acero de refuerzo y acero estructural",
        d: "- 16.1 Refuerzo: fy 420 MPa corrugado soldable (NTE INEN 2167), mallas electrosoldadas (NTE INEN 2209).\n- 16.2 Acero estructural: calidad (ASTM A36, A572 Gr50), perfiles, pernos (ASTM F3125), electrodos y procedimientos de soldadura (AWS D1.1), inspección.\n- 16.3 Protección anticorrosiva y contra fuego.",
        sale: "Especificación técnica de aceros.",
        tags: ["doc"], fuentes: ["ec:inen"] },
      { id: "res-17", t: "Especificar mampostería, morteros, madera y guadúa",
        d: "- 17.1 Bloques: resistencia y tipo (NTE INEN 3066), mortero por tipo y dosificación.\n- 17.2 Madera: especie, grupo, humedad máxima, preservación.\n- 17.3 Guadúa: edad de corte, secado, preservación, diámetros.",
        sale: "Especificación técnica de mampostería y materiales orgánicos.",
        tags: ["doc"], fuentes: ["ec:inen", "ec:nec"] },
      { id: "res-18", t: "Priorizar materiales de menor carbono incorporado en la especificación",
        d: "- 18.1 Cementos con adiciones (puzolánicos/compuestos) cuando la norma lo permita.\n- 18.2 Optimizar cuantías y secciones (menos material).\n- 18.3 Acero con contenido reciclado declarado por el fabricante.\n- 18.4 Madera y guadúa de fuentes legales/certificadas.\n- 18.5 Solicitar declaraciones ambientales de producto (EPD) si existen.",
        sale: "Anexo de criterios de bajo carbono en especificaciones.",
        tags: ["sost", "doc"], fuentes: ["edge", "leed", "q:EPD cemento Ecuador"] }
    ]},
    { n: "Fase 4 · Control de calidad en obra", pasos: [
      { id: "res-19", t: "Elaborar el plan de ensayos de calidad",
        d: "- 19.1 Hormigón: frecuencia de muestreo (por vaciado/volumen/área según ACI 318), probetas por muestra, edades de ensayo 7, 14 y 28 días, slump por camión.\n- 19.2 Acero: certificados por lote, ensayos de tracción y doblado por muestreo.\n- 19.3 Soldadura: inspección visual 100 %, ensayos no destructivos en uniones críticas.\n- 19.4 Suelos: compactación de rellenos (Proctor, densidad de campo).\n- 19.5 Definir laboratorio acreditado y responsable.",
        ec: "Laboratorios acreditados por el Servicio de Acreditación Ecuatoriano (SAE); en obra pública la fiscalización exige los ensayos como requisito para planillas.",
        sale: "Plan de ensayos (tabla elemento × ensayo × frecuencia × responsable).",
        tags: ["doc"], fuentes: ["ec:inen", "q:laboratorio acreditado SAE ensayos hormigón {ciudad}"] },
      { id: "res-20", t: "Controlar toma, curado y rotura de probetas",
        d: "- 20.1 Toma de muestras en obra según NTE INEN 1576: moldes, varillado, identificación, curado inicial.\n- 20.2 Transporte al laboratorio y curado estándar.\n- 20.3 Rotura a 7/14/28 días (NTE INEN 1573) y registro en base de datos por elemento.\n- 20.4 Criterio de aceptación a 28 días; si falla: núcleos, análisis estructural, refuerzo o demolición.",
        sale: "Registro de resultados de resistencia por elemento con aceptación/rechazo.",
        tags: ["doc"], fuentes: ["ec:inen"] },
      { id: "res-21", t: "Inspeccionar armaduras antes de cada vaciado",
        d: "- 21.1 Verificar diámetros, número, espaciamientos, estribos de confinamiento en zonas críticas, ganchos sísmicos.\n- 21.2 Recubrimientos con separadores.\n- 21.3 Longitudes de traslape y ubicación de empalmes (fuera de zonas de rótula).\n- 21.4 Firmar liberación de vaciado en libro de obra.",
        sale: "Checklist firmado de liberación de vaciado.",
        tags: ["doc"] }
    ]},
    { n: "Fase 5 · Coordinación y cierre", pasos: [
      { id: "res-22", t: "Coordinar el predimensionamiento con el cálculo estructural definitivo",
        d: "- 22.1 Entregar al ingeniero el predimensionamiento, cargas, materiales y restricciones arquitectónicas.\n- 22.2 Recibir secciones definitivas y actualizar planos/modelo BIM.\n- 22.3 Verificar coherencia arquitectura–estructura (alturas libres, vanos, ductos, juntas).\n- 22.4 Revisar planos estructurales: cuadro de materiales, recubrimientos, especificaciones y notas.",
        sale: "Planos arquitectónicos y estructurales coordinados.",
        tags: ["doc", "bim"], fuentes: ["ifc", "iso19650"] },
      { id: "res-23", t: "Documentar planos as-built estructurales y resultados de ensayos",
        d: "- 23.1 Registrar cambios de secciones o armados hechos en obra.\n- 23.2 Archivar certificados de materiales y ensayos por elemento.\n- 23.3 Entregar al propietario/administrador.",
        sale: "Dossier de calidad estructural + planos as-built.",
        tags: ["doc", "mant"] },
      { id: "res-24", t: "Incluir en el manual de mantenimiento la inspección estructural",
        d: "- 24.1 Frecuencia de inspección de fisuras, corrosión, juntas, anclajes, pintura de estructura metálica.\n- 24.2 Revisión tras sismos significativos (evaluación post-sismo, NEC-SE-RE).\n- 24.3 Prohibición de perforar vigas/columnas o cambiar cargas sin autorización técnica.",
        sale: "Capítulo estructural del manual de uso y mantenimiento.",
        tags: ["mant", "doc"], fuentes: ["ec:nec"] }
    ]}
  ]
});
