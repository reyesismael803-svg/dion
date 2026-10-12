window.FLUJO_M = window.FLUJO_M || [];
FLUJO_M.push({
  id: "bim",
  orden: 7,
  n: "Metodología BIM",
  corto: "BIM",
  para: "Convierte el proyecto en un modelo de información gestionado (ISO 19650): define qué información se necesita, quién la produce, en qué formato, con qué nivel de detalle (LOD/LOIN) y cómo se intercambia en un entorno común de datos (CDE). Se usa desde el arranque (requisitos, BEP, carpetas y plantillas) y acompaña todo el flujo: modelado por disciplina, coordinación y detección de interferencias, 4D/5D, análisis energético, planimetría, entregables, as-built y operación (COBie).",
  indice: [
    { t: "Unidad 1 · Fundamentos y evolución del BIM", items: [
      "1.1 Definición — BIM (Building Information Modelling/Management) es el uso de una representación digital compartida de un activo construido para facilitar diseño, construcción y operación, y formar una base fiable de decisiones (definición ISO 19650-1 / ISO 29481). No es un software: es proceso + información + tecnología + personas.",
      { t: "1.2 Historia y conceptos precursores", sub: [
        "1.2.1 Charles Eastman, Building Description System (1974–75): base de datos de elementos paramétricos en lugar de dibujos.",
        "1.2.2 Graphisoft ArchiCAD 'Virtual Building' (1987), primer modelador de edificio para PC; Revit Technology Corp. (2000) comprada por Autodesk (2002), que populariza el término BIM junto a Jerry Laiserin.",
        "1.2.3 Curva de MacLeamy (2004): el esfuerzo de diseño se desplaza a fases tempranas, donde cambiar cuesta menos; justifica invertir en modelado temprano.",
        "1.2.4 Niveles de madurez Bew–Richards (2008): Nivel 0 (CAD 2D sin gestión), Nivel 1 (CAD 2D/3D con CDE y estándares, BS 1192), Nivel 2 (modelos federados por disciplina con intercambio estructurado — hoy 'BIM según ISO 19650'), Nivel 3 (modelo integrado en la nube, iBIM)."
      ]},
      { t: "1.3 OpenBIM vs. BIM cerrado", mundo: "Mundo: OpenBIM (buildingSMART International) usa estándares abiertos (IFC, BCF, IDS, bSDD) para intercambiar entre plataformas; BIM cerrado depende de un solo fabricante (RVT/NWD).", ec: "Ecuador: en práctica predomina el ecosistema Autodesk (Revit, Navisworks, AutoCAD); exporta siempre también IFC para archivo y para entes que no usan Revit.", raro: "Poco común: Finlandia (Senate Properties) exige IFC desde 2007 como formato contractual, no el nativo." },
      { t: "1.4 Beneficios y riesgos reales", sub: [
        "1.4.1 Beneficios: coordinación temprana (menos RFIs y órdenes de cambio), cuantificación automática, visualización para el cliente, datos para operación.",
        "1.4.2 Riesgos: modelos 'bonitos' sin información útil, sobre-modelado (LOD innecesario), dependencia de licencias, archivos pesados sin estrategia de links, falta de responsabilidades contractuales sobre el modelo.",
        "1.4.3 BIM 'solitario' (little bim) vs. BIM colaborativo (BIG BIM): usar Revit solo para dibujar planos no es implementar la metodología."
      ]}
    ]},
    { t: "Unidad 2 · Marco normativo internacional", items: [
      { t: "2.1 Serie ISO 19650 (Organización y digitalización de la información de edificios y obra civil)", mundo: "Mundo: sustituye a BS 1192:2007 y PAS 1192-2/-3/-5 del Reino Unido; adoptada como EN ISO 19650 en Europa y por múltiples países de Latinoamérica.", ec: "Ecuador: no se conoce adopción obligatoria nacional; verifica en el catálogo INEN si existe NTE INEN-ISO 19650 homologada antes de citarla en un pliego. Se usa como referencia contractual voluntaria.", sub: [
        "2.1.1 Parte 1 (2018) — Conceptos y principios: requisitos de información, modelos de información, ciclo de vida, CDE, roles.",
        "2.1.2 Parte 2 (2018) — Fase de desarrollo (entrega) de los activos: el proceso de 8 actividades (evaluación de necesidades → invitación → oferta → contratación → movilización → producción colaborativa → entrega del modelo → cierre).",
        "2.1.3 Parte 3 (2020) — Fase operacional de los activos: AIR, AIM y disparadores de intercambio en operación.",
        "2.1.4 Parte 4 (2022) — Intercambio de información: criterios para revisar y aceptar contenedores (estado, conformidad con LOIN, formatos).",
        "2.1.5 Parte 5 (2020) — Enfoque de seguridad (security-minded): triaje de sensibilidad, plan de gestión de seguridad, control de acceso en el CDE. Relevante en hospitales, infraestructura crítica y edificios de gobierno.",
        "2.1.6 Parte 6 (2025) — Información de salud y seguridad: identificación y comunicación de riesgos de SST a lo largo del ciclo de vida mediante el modelo.",
        "2.1.7 Anexos nacionales: el UK National Annex (2021) define campos de nombre y códigos de estado S0–S4, A, B, CR, muy copiados en Latinoamérica."
      ]},
      { t: "2.2 Estándares de datos y formatos abiertos", sub: [
        "2.2.1 ISO 16739-1 — IFC (Industry Foundation Classes). IFC 2x3 (heredado, aún común), IFC4 (ISO 16739-1:2018) e IFC 4.3 (ISO 16739-1:2024, incorpora infraestructura lineal). Model View Definitions: Coordination View 2.0, Reference View, Design Transfer View.",
        "2.2.2 BCF (BIM Collaboration Format, buildingSMART): intercambio de incidencias (punto de vista, captura, comentario, GUID del elemento) entre programas; versiones 2.1 y 3.0 (API).",
        "2.2.3 IDS (Information Delivery Specification, buildingSMART 1.0, 2024): archivo XML legible por máquina que especifica qué propiedades debe tener cada entidad IFC; permite validar automáticamente el LOIN.",
        "2.2.4 bSDD (buildingSMART Data Dictionary): diccionario en línea de clasificaciones y propiedades enlazables.",
        "2.2.5 ISO 29481 — IDM (Information Delivery Manual): mapas de proceso e intercambios.",
        "2.2.6 ISO 12006-2 (marco de clasificación) e ISO 12006-3 (modelo de diccionarios de datos).",
        "2.2.7 ISO 23386 / ISO 23387 — plantillas de datos de producto (Product Data Templates) y su gobernanza.",
        "2.2.8 ISO 22057 (2022) — plantillas de datos para declaraciones ambientales de producto (EPD) en BIM; permite llevar datos de carbono del producto al modelo.",
        "2.2.9 ISO 21597 — ICDD, contenedores de información enlazada para entregas.",
        "2.2.10 COBie (Construction Operations Building information exchange): hoja de cálculo/subconjunto IFC con Facility, Floor, Space, Zone, Type, Component, System, Assembly, Connection, Spare, Resource, Job, Document, Attribute, Coordinate, Issue, Impact. Origen US Army Corps of Engineers (2007); incorporado en NBIMS-US y en BS 1192-4:2014 (Reino Unido)."
      ]},
      { t: "2.3 Nivel de desarrollo y nivel de información", sub: [
        "2.3.1 LOD (Level of Development) según BIMForum LOD Specification (edición anual, basada en AIA E202/G202): LOD 100 símbolo/masa conceptual; LOD 200 elemento genérico con tamaño, forma y ubicación aproximados; LOD 300 elemento específico con geometría, ubicación y orientación precisas; LOD 350 LOD 300 + interfaces y conexiones con otros sistemas (coordinación); LOD 400 elemento con información de fabricación, montaje e instalación; LOD 500 verificado en campo (as-built) — BIMForum no lo define como progresión geométrica sino de verificación.",
        "2.3.2 Level of Detail (geometría, LOd) vs. Level of Information (datos, LOI): el Reino Unido los separa; un elemento puede tener geometría simple y mucha información.",
        "2.3.3 LOIN (Level of Information Need): EN 17412-1:2020, sustituida internacionalmente por ISO 7817-1:2024. Define para cada propósito, hito y actor la información geométrica (detalle, dimensionalidad, ubicación, apariencia, comportamiento paramétrico), alfanumérica (identificación y propiedades) y documental necesarias. Principio: la información mínima suficiente, no la máxima posible.",
        "2.3.4 Element Attribute Table / Matriz de progresión de LOD: tabla elemento × fase que fija el LOD y el responsable (MEA, Model Element Author)."
      ]},
      { t: "2.4 Sistemas de clasificación", mundo: "Mundo: la clasificación permite cuantificar, especificar y vincular costos y mantenimiento de forma consistente.", ec: "Ecuador: los presupuestos públicos se estructuran por rubros (formato de APU de la Cámara de la Construcción / SERCOP) sin clasificación internacional obligatoria; mapea tus rubros a Uniformat/MasterFormat en un parámetro compartido.", raro: "Poco común: Suecia usa CoClass; Dinamarca CCS / BIM7AA; España propone GuBIMclass; Países Bajos NL-SfB derivado de CI/SfB.", sub: [
        "2.4.1 Uniclass 2015 (NBS, Reino Unido): tablas Co complejos, En entidades, SL espacios/ubicaciones, EF elementos/funciones, Ss sistemas, Pr productos, TE herramientas y equipo, PM información del proyecto, Ro roles, Ac actividades, FI información de gestión.",
        "2.4.2 OmniClass (CSI/CSC, Norteamérica): 15 tablas (11 construcción por función, 12 por forma, 13 espacios por función, 21 elementos, 22 resultados de obra = MasterFormat, 23 productos, 31 fases, 32 servicios, 33 disciplinas, 34 roles organizacionales, 35 herramientas, 36 información, 41 materiales, 49 propiedades).",
        "2.4.3 Uniformat II (ASTM E1557): clasificación por elementos funcionales (A Subestructura, B Envolvente, C Interiores, D Servicios, E Equipamiento y mobiliario, F Construcción especial, G Obras exteriores); ideal para costos en fase de diseño.",
        "2.4.4 MasterFormat (CSI): 50 divisiones por resultado de obra/oficio; ideal para especificaciones técnicas y presupuestos de construcción.",
        "2.4.5 CI/SfB (histórico escandinavo-británico) y NRM (RICS, medición de costos en Reino Unido)."
      ]}
    ]},
    { t: "Unidad 3 · Gestión de la información según ISO 19650", items: [
      { t: "3.1 Roles y partes", sub: [
        "3.1.1 Parte que designa (appointing party): el cliente/promotor; define requisitos y acepta la información.",
        "3.1.2 Parte designada principal (lead appointed party): quien contrata con el cliente y coordina a los demás (normalmente el arquitecto líder o el constructor en diseño-construcción).",
        "3.1.3 Partes designadas (appointed parties) y equipos de trabajo (task teams): cada especialidad.",
        "3.1.4 Funciones de oficina: BIM Manager (estrategia, estándares, BEP), Coordinador BIM (federación, interferencias, reuniones), Modelador/Técnico BIM (producción), Gestor de información/CDE, Gestor de datos de activos (operación)."
      ]},
      { t: "3.2 Requisitos de información", sub: [
        "3.2.1 OIR (Organizational Information Requirements): qué necesita la organización del cliente para sus objetivos estratégicos (p. ej. gestión de su red de centros de salud).",
        "3.2.2 AIR (Asset Information Requirements): datos del activo para operarlo (equipos, garantías, planes de mantenimiento).",
        "3.2.3 PIR (Project Information Requirements): información para decisiones clave del proyecto (hitos, aprobaciones, costos).",
        "3.2.4 EIR (Exchange Information Requirements; antes Employer's Information Requirements): requisitos técnicos, de gestión y comerciales de cada intercambio: formatos, LOIN, fechas, clasificación, sistema de coordenadas, criterios de aceptación.",
        "3.2.5 PIM (Project Information Model) y AIM (Asset Information Model): el PIM se transforma en AIM al entregar."
      ]},
      { t: "3.3 Documentos de planificación", sub: [
        "3.3.1 BEP pre-contrato (en la oferta): propuesta de enfoque, capacidad del equipo, estrategia de federación, software, alta nivel de responsabilidades.",
        "3.3.2 BEP post-contrato (movilización): versión detallada y contractual: nomenclatura, coordenadas, matriz de LOD, calendario de entregas, procedimientos de coordinación, QA/QC.",
        "3.3.3 Matriz de responsabilidades (alto nivel y detallada): quién produce qué contenedor y elemento.",
        "3.3.4 TIDP (Task Information Delivery Plan) por equipo y MIDP (Master Information Delivery Plan) consolidado: lista de contenedores con fecha, LOIN, autor y estado esperado.",
        "3.3.5 Protocolo de información (anexo contractual, p. ej. CIC BIM Protocol 2.ª ed. 2018 en Reino Unido) y Plan de movilización."
      ]},
      { t: "3.4 CDE — Entorno Común de Datos", mundo: "Mundo: repositorio único con flujo controlado de estados y metadatos; puede ser ACC/BIM 360, Trimble Connect, Aconex, ProjectWise, Dalux, Viewpoint, BIMcollab, o soluciones propias.", ec: "Ecuador: estudios pequeños suelen usar Google Drive/OneDrive con carpetas por estado; es válido si se controlan permisos, estados y registro de documentos (hoja de control).", sub: [
        "3.4.1 WIP (Trabajo en curso): solo visible para el equipo autor; estado S0.",
        "3.4.2 Compartido (Shared): verificado y visible para otros equipos para coordinación (S1–S4).",
        "3.4.3 Publicado (Published): autorizado por el cliente para uso (A1…An, B1…Bn con comentarios).",
        "3.4.4 Archivo (Archive): histórico inmutable de todas las transacciones; incluye CR (registro as-built).",
        "3.4.5 Revisiones: P01.01, P01.02… (preliminar, WIP con versión menor), P01, P02 (preliminar compartida), C01, C02 (contractual/publicada)."
      ]},
      "3.5 Nomenclatura de contenedores — campos del UK NA: Proyecto–Originador–Volumen/Sistema–Nivel/Ubicación–Tipo–Función/Disciplina–Número (+ metadatos: estado, revisión, clasificación). Cada campo usa códigos definidos en el BEP; separador guion; sin espacios ni tildes para compatibilidad entre sistemas.",
      "3.6 Proceso de entrega ISO 19650-2 en 8 actividades: 5.1 evaluación de necesidades; 5.2 invitación a licitar; 5.3 respuesta a la licitación (BEP pre-contrato, capacidad); 5.4 designación (BEP post, MIDP); 5.5 movilización (pruebas de CDE, plantillas, formación); 5.6 producción colaborativa (verificar, revisar, compartir); 5.7 entrega del modelo de información (revisión y aceptación); 5.8 cierre del proyecto (archivo y lecciones aprendidas).",
      "3.7 Seguridad (ISO 19650-5): triaje de sensibilidad del activo, estrategia y plan de gestión de seguridad, control de acceso por roles, gestión de incidentes, cuidado al publicar modelos de hospitales, bancos, cárceles o infraestructuras críticas."
    ]},
    { t: "Unidad 4 · Dimensiones del BIM (3D–7D y más)", items: [
      "4.1 3D — Geometría paramétrica coordinada; base de todas las demás.",
      "4.2 4D — Tiempo: vinculación del modelo a un cronograma (Navisworks TimeLiner, Synchro 4D, Fuzor, Vico) para simular secuencia, logística de obra, grúas, acopios y fases.",
      "4.3 5D — Costo: cantidades extraídas del modelo (tablas de planificación, Navisworks Quantification, CostX, Presto, iTWO, Vico) enlazadas a precios unitarios/APU.",
      { t: "4.4 6D y 7D — Sostenibilidad y operación", mundo: "Mundo: no hay consenso; en gran parte de Europa y Latinoamérica 6D = sostenibilidad/energía y 7D = operación y mantenimiento; en EE. UU. y parte de la literatura se invierte (6D = FM, 7D = sostenibilidad). Declara siempre en el BEP qué significa cada dimensión.", raro: "Poco común: algunos autores añaden 8D (seguridad y salud / prevención de riesgos, alineado con ISO 19650-6), 9D (construcción lean) y 10D (industrialización).", sub: [
        "4.4.1 Sostenibilidad: análisis energético (Autodesk Insight / Green Building Studio, IES VE, DesignBuilder, OpenStudio-EnergyPlus, Ladybug Tools), luz natural, carbono incorporado (One Click LCA, Tally), exportación gbXML.",
        "4.4.2 Operación: COBie, planes de mantenimiento, garantías, integración con CAFM/CMMS (Maximo, Planon, Archibus), gemelo digital; ISO 55000 (gestión de activos) e ISO 41001 (facility management)."
      ]}
    ]},
    { t: "Unidad 5 · Ecosistema de herramientas", items: [
      { t: "5.1 Autoría (modelado)", sub: [
        "5.1.1 Arquitectura: Revit, ArchiCAD, Allplan, Vectorworks, BricsCAD BIM, Bonsai (antes BlenderBIM, IFC nativo, libre).",
        "5.1.2 Estructuras: Revit, Tekla Structures (LOD 400 acero/prefabricado), Advance Steel; análisis en Robot, ETABS, SAP2000, CYPECAD (vínculo analítico).",
        "5.1.3 MEP: Revit MEP, MagiCAD, CYPE MEP, Plancal; fabricación en Revit Fabrication.",
        "5.1.4 Diseño computacional: Dynamo, Grasshopper + Rhino.Inside.Revit, pyRevit para automatizar."
      ]},
      "5.2 Coordinación y revisión: Navisworks Manage (clash detective, TimeLiner, Quantification), Solibri (reglas y validación IFC), BIMcollab Zoom, Trimble Connect, Revizto, Dalux; visores gratuitos: Navisworks Freedom, BIMvision, usBIM.viewer+.",
      "5.3 CDE y gestión: Autodesk Construction Cloud (Docs, Build, Model Coordination), BIM 360 (heredado), Trimble Connect, Oracle Aconex, Bentley ProjectWise, Dalux Box.",
      "5.4 Captura de realidad: escáner láser (Leica, Faro, Trimble) → ReCap (RCP/RCS), E57/LAS; fotogrametría con dron (DroneDeploy, Pix4D, Agisoft Metashape) → ortofoto y nube; scan-to-BIM.",
      "5.5 Visualización: Enscape, Twinmotion, Lumion, D5 Render, V-Ray; exportación DAE/FBX/Datasmith; VR/AR (Unity Reflect, HoloLens, Trimble XR10, apps móviles AR).",
      { t: "5.6 Licenciamiento y hardware", ec: "Ecuador: licencias educativas gratuitas (Autodesk Education) sirven solo para estudio; su uso comercial viola la licencia y los archivos pueden quedar marcados. Para ejercicio profesional considera suscripciones oficiales o alternativas (ArchiCAD Solo, BricsCAD, Bonsai libre).", mundo: "Mundo: estación típica BIM — CPU de alta frecuencia monohilo (Revit es mayormente monohilo), 32–64 GB RAM, GPU dedicada, SSD NVMe." }
    ]},
    { t: "Unidad 6 · Técnica de modelado en Revit (práctica profesional)", items: [
      { t: "6.1 Plantillas y estándares de oficina", sub: [
        "6.1.1 Plantilla (.rte): unidades, estilos de objeto, grosores y patrones de línea, materiales, anotaciones, cajetín, plantillas de vista, filtros, navegador de proyecto organizado.",
        "6.1.2 Parámetros compartidos (.txt): mismos GUID en todas las familias y proyectos para que tablas y etiquetas funcionen; parámetros de proyecto vs. globales vs. de familia.",
        "6.1.3 Familias: de sistema (muros, suelos, cubiertas), cargables (.rfa) e in situ (evitar); anidadas/compartidas; paramétricas avanzadas con fórmulas y tipos de catálogo.",
        "6.1.4 Nomenclatura de vistas, planos, familias, tipos y materiales consistente con el BEP."
      ]},
      { t: "6.2 Estrategia de división del modelo", sub: [
        "6.2.1 Vínculos (links) Revit: un archivo por disciplina y, en proyectos grandes, por volumen (sótanos, torres, plaza) para limitar tamaño (< 300–500 MB orientativo) y permitir trabajo simultáneo.",
        "6.2.2 Worksharing: modelo central + locales, subproyectos (worksets) por sistema o zona; sincronizar con frecuencia; nunca abrir el central directamente.",
        "6.2.3 Copiar/Supervisar (Copy/Monitor) de niveles y rejillas desde el modelo de arquitectura o de estructura como fuente única.",
        "6.2.4 Fases y opciones de diseño: existente/demolición/nuevo; alternativas para el cliente."
      ]},
      { t: "6.3 Coordenadas y georreferenciación", ec: "Ecuador: marco de referencia SIRGAS-ECUADOR (compatible con WGS84) y proyección UTM; la mayor parte del Ecuador continental, incluida Guayaquil, está en zona 17 Sur; el extremo oriental en zona 18 Sur y Galápagos en zonas 15/16 Sur. Quito usa además un sistema local (TM-Quito / SIRES-DMQ). Confirma el sistema del levantamiento topográfico y del catastro municipal antes de fijar el Survey Point.", sub: [
        "6.3.1 Punto base del proyecto (Project Base Point) = origen interno del edificio (intersección de ejes A-1).",
        "6.3.2 Punto de reconocimiento (Survey Point) = coordenada real (Este, Norte, cota) del levantamiento.",
        "6.3.3 Norte verdadero vs. norte de proyecto; adquirir/publicar coordenadas compartidas desde el modelo de entorno.",
        "6.3.4 Origen interno de Revit: no modelar a más de ~32 km del origen (pérdida de precisión gráfica)."
      ]},
      "6.4 Tablas de planificación y cuantificación: cómputos de muros, pisos, puertas, ventanas, acabados por ambiente; tablas de materiales; claves de planificación; exportación a Excel/CSV.",
      "6.5 Exportación IFC: tabla de correspondencia categoría→IfcEntity, IfcExportAs/IfcExportType, Psets personalizados, versión IFC4 o 2x3 según el receptor; comprobar en un visor independiente."
    ]},
    { t: "Unidad 7 · Coordinación, calidad y detección de interferencias", items: [
      "7.1 Federación: el modelo federado agrupa los modelos de cada disciplina (RVT enlazados o NWC en Navisworks: NWF = archivo de trabajo con referencias, NWD = paquete publicado congelado).",
      { t: "7.2 Tipos de interferencia", sub: [
        "7.2.1 Duras (hard): dos elementos ocupan el mismo espacio (ducto atraviesa viga).",
        "7.2.2 Blandas o de holgura (clearance): no se respeta un espacio libre requerido (mantenimiento de equipos, aislamiento, radio de puerta, zona de acceso a tableros).",
        "7.2.3 De flujo de trabajo / 4D: secuencia imposible (instalar equipo antes de tener acceso)."
      ]},
      "7.3 Matriz de interferencias: disciplina × disciplina con tolerancias (p. ej. 0 mm para estructura vs. MEP rígido, holgura para ductos), prioridad de resolución (estructura > sanitarias por gravedad > ductos > tuberías a presión > bandejas eléctricas) y responsable.",
      "7.4 Ciclo de coordinación: ejecutar pruebas → agrupar → asignar → emitir BCF → reunión de coordinación (ICE / reunión BIM semanal) → corregir en el modelo nativo → re-ejecutar; registrar indicadores (interferencias abiertas/cerradas).",
      "7.5 Control de calidad del modelo: auditoría (advertencias de Revit, elementos duplicados, familias in situ, tamaño), verificación de datos (IDS, Solibri, Model Checker), verificación de nomenclatura y de coordenadas antes de compartir (S1)."
    ]},
    { t: "Unidad 8 · BIM en obra y operación", items: [
      "8.1 Modelo para construcción LOD 400: detalles de fabricación, planos de taller, prefabricación (acero, muros cortina, MEP en spools).",
      "8.2 Seguimiento de obra: RFIs vinculados al modelo, control de avance 4D, AR en campo (superposición del modelo), escaneo periódico para comparar lo construido (scan-vs-BIM).",
      "8.3 As-built (LOD 500 / registro CR): actualización del modelo con lo realmente construido, verificado en campo, con información de equipos instalados (marca, modelo, serie, garantía).",
      "8.4 Traspaso a operación: COBie, manuales O&M enlazados, planes de mantenimiento preventivo, gemelo digital con sensores IoT/BMS.",
      { t: "8.5 Contratos y responsabilidad", mundo: "Mundo: AIA E203/G202 (EE. UU.), ConsensusDocs 301, CIC BIM Protocol (Reino Unido), cláusulas NEC4; definen propiedad intelectual del modelo, si el modelo o los planos prevalecen, usos permitidos y responsabilidad por errores.", ec: "Ecuador: la LOSNCP y los pliegos SERCOP no establecen un anexo BIM estándar conocido; si el cliente pide BIM, incorpora al contrato: EIR, BEP, LOD por fase, formatos (RVT+IFC+PDF), propiedad del modelo y prevalencia de los planos firmados." }
    ]},
    { t: "Unidad 9 · Implementación BIM por país", items: [
      { t: "9.1 Ecuador", ec: "Ecuador: no se conoce, a la fecha, un mandato nacional que haga obligatorio BIM en la contratación pública ni una norma NEC específica de BIM (tómalo con cautela y verifica novedades en SERCOP, MIDUVI e INEN). La adopción es voluntaria: universidades (asignaturas y maestrías BIM), Colegio de Arquitectos del Ecuador y sus núcleos provinciales, cámaras de la construcción y comunidades profesionales promueven capacitación; constructoras y promotoras grandes lo usan en proyectos privados y algunas entidades lo han pedido en términos de referencia puntuales. Referentes regionales directos: Red BIM de Gobiernos Latinoamericanos (con apoyo del BID) — verifica la participación actual de Ecuador." },
      { t: "9.2 Latinoamérica", sub: [
        "9.2.1 Chile — Planbim (Corfo, desde 2016): Estándar BIM para Proyectos Públicos (2019) y exigencia progresiva de BIM en proyectos públicos desde 2020; publica guías, EIR tipo y plantillas.",
        "9.2.2 Perú — Plan BIM Perú (MEF): Decreto Supremo 289-2019-EF aprueba disposiciones para incorporar BIM progresivamente en la inversión pública; Guía Nacional BIM y adopción gradual por entidades hasta la obligatoriedad general (horizonte 2030).",
        "9.2.3 Colombia — Estrategia Nacional BIM 2020-2026 (DNP/MinVivienda): meta de uso de BIM en proyectos públicos a 2026 con implementación por fases.",
        "9.2.4 Brasil — Estratégia BIM BR; Decreto 10.306/2020 establece uso gradual en obras federales (fases desde 2021).",
        "9.2.5 México — Estrategia para la implementación BIM de la SHCP (2019) para proyectos de infraestructura federal.",
        "9.2.6 Argentina y Uruguay — planes y comités nacionales BIM con guías; adopción gradual en obra pública."
      ]},
      { t: "9.3 Resto del mundo", sub: [
        "9.3.1 Reino Unido — Government Construction Strategy 2011: BIM Level 2 obligatorio desde abril de 2016 en proyectos de la administración central; hoy 'UK BIM Framework' basado en ISO 19650.",
        "9.3.2 Singapur — BCA (Building and Construction Authority): e-submission de modelos BIM para aprobación de permisos (arquitectura desde 2013 en proyectos grandes y luego ampliado); CORENET X como plataforma integrada de aprobación.",
        "9.3.3 España — Comisión es.BIM y Plan de Incorporación de la Metodología BIM en la contratación pública (2023) con obligatoriedad escalonada.",
        "9.3.4 EE. UU. — NBIMS-US (National BIM Standard) y exigencias propias de GSA, USACE, VA y estados; sin mandato federal único.",
        "9.3.5 Países nórdicos — Finlandia (COBIM, Senate Properties), Noruega (Statsbygg), Dinamarca (Det Digitale Byggeri, 2007) fueron pioneros con IFC obligatorio.",
        "9.3.6 Alemania — Stufenplan Digitales Planen und Bauen (2015–2020) para infraestructura federal; Francia — Plan BIM 2022; Italia — Decreto BIM (DM 560/2017) progresivo por importe de obra.",
        "9.3.7 Emiratos (Dubai Municipality, circulares desde 2014 para edificios grandes), Hong Kong (proyectos públicos de gran presupuesto desde 2018), Corea del Sur (PPS en obra pública), China (normas nacionales GB/T de BIM), Australia/Nueva Zelanda (guías NATSPEC)."
      ]},
      { t: "9.4 Lo poco común", raro: "Poco común: Singapur aprueba permisos directamente sobre el modelo con verificación automática de reglas; Noruega (Statsbygg) usa verificación automática de accesibilidad y áreas en IFC; Estonia y Finlandia avanzan a permisos de construcción basados en BIM; Dinamarca exige clasificación en todos los objetos para obra pública." }
    ]},
    { t: "Unidad 10 · Implementación en un estudio o empresa", items: [
      "10.1 Diagnóstico de madurez (personas, procesos, tecnología) y plan de implementación por etapas con un proyecto piloto.",
      "10.2 Estándar BIM de la oficina: sistema de carpetas, codificación, plantillas, librerías de familias, manual de modelado, lista de chequeo de calidad.",
      "10.3 Formación por rol (modelador, coordinador, manager) y certificaciones (Autodesk Certified Professional, buildingSMART Professional Certification, BRE/BSI ISO 19650).",
      "10.4 Indicadores: horas por m² modelado, RFIs, interferencias detectadas antes de obra, desviación de cantidades, retrabajos evitados; retorno de inversión.",
      "10.5 Mejora continua: lecciones aprendidas por proyecto que actualizan plantillas, familias, BEP modelo y matriz de LOD."
    ]}
  ],
  fases: [
    { n: "Fase 0 · Requisitos, usos BIM y planificación (ISO 19650-2, act. 5.1–5.4)", pasos: [
      { id: "bim-01", t: "Levantar requisitos del cliente: OIR, AIR y PIR en taller con interesados",
        d: "Organiza un taller (presencial o virtual) con el promotor, operador futuro y especialistas.\n- 1.1 Pregunta para qué usará el cliente la información: aprobar diseño, licitar, construir, operar, vender, certificar.\n- 1.2 OIR: objetivos estratégicos de la organización (p. ej. red de centros, portafolio inmobiliario).\n- 1.3 AIR: qué datos de activos necesita para operar (equipos, garantías, áreas, acabados, mantenimiento).\n- 1.4 PIR: decisiones clave e hitos del proyecto (anteproyecto aprobado, permiso municipal, licitación, obra).\n- 1.5 Registra quién aprueba cada entrega y en qué formato lo puede abrir (muchos clientes solo leen PDF o visor gratuito).",
        ec: "Ecuador: la mayoría de clientes privados no conoce los términos OIR/AIR; tradúcelos a preguntas simples y documenta respuestas. En obra pública revisa si los TDR de SERCOP piden BIM y qué nivel.",
        sale: "Acta de taller + tabla de requisitos OIR/AIR/PIR firmada por el cliente.",
        tags: ["bim", "doc"], fuentes: ["iso19650", "ec:sercop"] },
      { id: "bim-02", t: "Definir los usos BIM y las dimensiones (3D–7D) que aplican al proyecto",
        d: "Construye una matriz Uso BIM × Fase (concepto, anteproyecto, proyecto, construcción, operación).\n- 2.1 Usos típicos: captura de realidad, modelado de condiciones existentes, diseño de autoría, revisión de diseño, análisis estructural, análisis energético/luz natural, coordinación 3D (clash), planimetría, cuantificación 5D, planificación 4D, visualización/render, planos de taller, seguimiento de obra, as-built, COBie/FM.\n- 2.2 Declara qué significa 6D y 7D en este proyecto (no hay consenso internacional).\n- 2.3 Justifica cada uso con un beneficio concreto; descarta los que no aporten (evita sobre-modelado).\n- 2.4 Para proyectos pequeños (vivienda, tiny house) suele bastar: autoría 3D, planimetría, cuantificación, visualización y análisis solar.",
        sale: "Matriz de usos BIM por fase aprobada.", tags: ["bim", "doc"], fuentes: ["iso19650", "q:BIM uses Penn State BIM Project Execution Planning Guide"] },
      { id: "bim-03", t: "Redactar los EIR: formatos, LOIN por hito, coordenadas y criterios de aceptación",
        d: "Documento de requisitos de intercambio (lo emite el cliente; si no lo tiene, lo propones tú).\n- 3.1 Técnicos: software y versión (p. ej. Revit 2025), formatos de entrega (RVT, IFC4, NWD, DWG, PDF), sistema de coordenadas, unidades, clasificación (Uniformat/Uniclass), nomenclatura.\n- 3.2 LOIN por hito: geometría, información alfanumérica y documentación mínima; opcional especificar en IDS para validación automática.\n- 3.3 Gestión: roles, CDE, frecuencia de intercambios, reuniones, seguridad (ISO 19650-5 si es edificio sensible).\n- 3.4 Comerciales: calendario de entregas, propiedad intelectual del modelo, prevalencia planos vs. modelo.\n- 3.5 Criterios de aceptación (ISO 19650-4): estado, nomenclatura, LOIN cumplido, sin advertencias críticas.",
        sale: "EIR (documento) + archivo IDS opcional.", tags: ["bim", "doc"], fuentes: ["iso19650", "ifc"] },
      { id: "bim-04", t: "Evaluar capacidad del equipo, software, hardware y licencias",
        d: "Antes de ofertar o arrancar:\n- 4.1 Lista de personas por rol (BIM manager, coordinador, modeladores por disciplina) y su experiencia.\n- 4.2 Versiones de software de todos los participantes (Revit no abre archivos de versión superior: fija una versión común).\n- 4.3 Hardware y conectividad (tamaño de modelos, sincronización en la nube).\n- 4.4 Licencias comerciales válidas (no usar licencias educativas en trabajos pagados).\n- 4.5 Riesgos y plan de formación.",
        ec: "Ecuador: verifica también la capacidad de los consultores de especialidades locales (muchos entregan en AutoCAD 2D); define si tú modelas su diseño a partir de DWG/PDF y con qué LOD.",
        sale: "Evaluación de capacidad y lista de riesgos BIM.", tags: ["bim", "doc"] },
      { id: "bim-05", t: "Elaborar el BEP pre-contrato (oferta)",
        d: "Plan de Ejecución BIM de oferta (carpeta 0D26 PEB · oferta).\n- 5.1 Enfoque propuesto a los EIR y usos BIM.\n- 5.2 Estrategia de federación y división de modelos.\n- 5.3 Equipo propuesto y matriz de responsabilidades de alto nivel.\n- 5.4 Software, CDE y calendario tentativo de entregas.\n- 5.5 Excepciones o supuestos (qué no se modelará).",
        sale: "BEP pre-contrato (PDF) archivado en 0D26.", tags: ["bim", "doc"], fuentes: ["iso19650"] },
      { id: "bim-06", t: "Cerrar el BEP post-contrato con matriz de responsabilidades, TIDP y MIDP",
        d: "Tras la firma, detalla y vuelve contractual el BEP (0D26 PEB · demanda/definitivo).\n- 6.1 Roles con nombres y contactos; autoridad para aprobar.\n- 6.2 Nomenclatura (FLUJO_COD), estructura de carpetas, estados y revisiones.\n- 6.3 Matriz de progresión LOD por elemento y fase: LOD 100 concepto, 200 anteproyecto, 300 proyecto, 350 coordinación, 400 fabricación/construcción, 500 as-built.\n- 6.4 TIDP por equipo (lista de contenedores con fecha) y MIDP consolidado.\n- 6.5 Procedimientos: coordinación, QA/QC, intercambios, reuniones, gestión de cambios.\n- 6.6 Revisión con interesados y firma.",
        sale: "BEP post-contrato firmado + MIDP (hoja de cálculo).", tags: ["bim", "doc"], cuando: ["grande", "pub"], fuentes: ["iso19650"] }
    ]},
    { n: "Fase 1 · Movilización: carpetas, codificación, CDE, plantillas y coordenadas (act. 5.5)", pasos: [
      { id: "bim-07", t: "Crear la carpeta madre y el árbol de carpetas codificado del proyecto",
        d: "Usa el árbol estándar (pestaña Codificación · Carpetas) y créalo completo el día 1.\n- 7.1 Carpeta madre 000 con nombre <Iniciales>_<ProyectoCorto>_V01 (ej. JCA_TRBU_V01).\n- 7.2 Crea solo las ramas que aplican (una vivienda no necesita 0M8 SEG ni torres), pero mantén los códigos para no renumerar.\n- 7.3 Nombra cada carpeta '<código>. <abreviatura> _<iniciales>.<ProyectoCorto>_<Vxx>_<dd.mm.aa>'.\n- 7.4 Copia a 0D1 LIBR las librerías de la oficina (plantillas, parámetros, familias, materiales, atajos).\n- 7.5 Sube el árbol al CDE y verifica permisos por carpeta.",
        sale: "Árbol de carpetas creado en disco y en el CDE.", tags: ["bim", "doc"] },
      { id: "bim-08", t: "Fijar la convención de nombres ISO 19650 y abrir el registro de documentos",
        d: "- 8.1 Define códigos de Proyecto (4–6 caracteres), Originador (3 letras por empresa), Volumen (INF, T1, T2, PLZ, ZZ), Nivel (B1, 00, 01…, RF, ZZ), Tipo (M3, DR, SH, RP…), Disciplina (A, S, IS, IE…) y Número (0001).\n- 8.2 Estado (S0–S4, A, B, CR) y revisión (P01.01, P01, C01) como sufijo o metadato.\n- 8.3 Convivencia con el código corto del usuario: la carpeta lleva el código de carpeta (0A22. A.T1 …) y el archivo el código ISO (TRBU-JCA-T1-ZZ-M3-A-0001).\n- 8.4 Abre un registro de documentos (Excel) con columnas: código, título, estado, revisión, fecha, autor, carpeta, observaciones.",
        sale: "Tabla de códigos del proyecto + registro de documentos.", tags: ["bim", "doc"], fuentes: ["iso19650"] },
      { id: "bim-09", t: "Configurar el CDE con estados WIP/Compartido/Publicado/Archivo y accesos",
        d: "- 9.1 Plataforma: Autodesk Construction Cloud (Docs + Model Coordination) si hay presupuesto; alternativa: Google Drive/OneDrive con carpetas por estado y permisos.\n- 9.2 Crea las áreas WIP (por equipo), Shared, Published y Archive; reglas de transición (verificar → revisar → aprobar).\n- 9.3 Permisos por rol (ISO 19650-5): el cliente solo ve Publicado; cada disciplina edita su WIP.\n- 9.4 Flujos: carga de modelos, seguimiento de incidencias (issues), control de versiones, transmittals.\n- 9.5 Prueba el flujo con un archivo piloto antes de producir.",
        ec: "Ecuador: si el proyecto es un centro de salud, edificio financiero o de seguridad, aplica triaje de sensibilidad y restringe la publicación de planos de instalaciones críticas.",
        sale: "CDE operativo con permisos y flujo de aprobación probado.", tags: ["bim", "doc"], fuentes: ["iso19650"] },
      { id: "bim-10", t: "Preparar la plantilla Revit: unidades, información de proyecto y parámetros compartidos",
        d: "Parte de la plantilla de oficina en 0D14 PLNP.\n- 10.1 Unidades: longitud en m o cm según planos (cotas en cm es habitual en Ecuador), áreas m² con 2 decimales, ángulos, pendientes en %.\n- 10.2 Información de proyecto: nombre, código, cliente, dirección, clave catastral, autor, estado, fase.\n- 10.3 Carga el archivo de parámetros compartidos 0D12 PRM (.txt): códigos ISO, clasificación Uniformat, código de acabado, LOD, fase, responsable (MEA), datos COBie.\n- 10.4 Parámetros de proyecto por categoría y parámetros globales (alturas de piso, espesores tipo).",
        sale: "Plantilla .rte del proyecto con unidades y parámetros cargados.", tags: ["bim"] },
      { id: "bim-11", t: "Completar la plantilla: familias base, materiales, estilos, filtros y nomenclatura de vistas y planos",
        d: "- 11.1 Carga familias base de 0D15 OBE (planimetría, genéricos, vanos, sanitarios, luminarias, mobiliario) y materiales 0D16 (biblioteca .adsklib + texturas) con códigos de material de 3 letras (HOR, BLO, POR…).\n- 11.2 Estilos de objeto, grosores y patrones de línea, patrones de relleno.\n- 11.3 Plantillas de vista (plantas, cortes, elevaciones, detalles, 3D, trabajo) y filtros por disciplina/sistema.\n- 11.4 Nomenclatura de vistas (PLT_00_ARQ, CRT_A-A…) y numeración de planos (A-101, S-201, IE-301…).\n- 11.5 Cajetín con parámetros vinculados y atajos de teclado de oficina (0D17 SHT .xml).\n- 11.6 Organización del navegador de proyecto por disciplina/uso.",
        sale: "Plantilla lista y guardada en 0D14 PLNP (versión del proyecto).", tags: ["bim", "doc"], fuentes: ["bimobject"] },
      { id: "bim-12", t: "Definir el origen de coordenadas compartidas y georreferenciar el proyecto",
        d: "- 12.1 Obtén el levantamiento topográfico con su sistema (UTM zona, datum) y cotas.\n- 12.2 Crea un archivo de coordenadas (o usa el modelo de entorno 0E) como fuente única.\n- 12.3 Ubica el Survey Point en un vértice conocido (Este, Norte, cota) y el Project Base Point en la intersección de ejes A-1.\n- 12.4 Rota el norte de proyecto para que los planos queden ortogonales; conserva el norte verdadero.\n- 12.5 Publica coordenadas compartidas a todos los links y compruébalo insertando cada modelo 'por coordenadas compartidas'.\n- 12.6 Documenta en el BEP los valores exactos.",
        ec: "Ecuador: SIRGAS-ECUADOR/WGS84, UTM zona 17 Sur para Guayaquil y la mayor parte del país; Quito puede usar TM-Quito. El IGM es la referencia de la red geodésica.",
        sale: "Tabla de coordenadas del proyecto y archivo de coordenadas compartidas.", tags: ["bim", "doc"], fuentes: ["ec:igm", "maps", "earth"] }
    ]},
    { n: "Fase 2 · Entorno, concepto LOD 100 y anteproyecto LOD 200", pasos: [
      { id: "bim-13", t: "Reunir datos del entorno: nube de puntos, ortofoto de dron y catastro limpio",
        d: "- 13.1 Nube de puntos: escaneo láser o fotogrametría; procesa en ReCap → .rcp/.rcs (0E11 RCS).\n- 13.2 Vuelo de dron (DroneDeploy u otro): ortofoto georreferenciada y modelo digital de superficie; guarda el enlace del proyecto DroneDeploy en 0D315 DDP y la ortofoto en 0E12 ORPH.\n- 13.3 Planos catastrales: limpia el DWG (purgar, capas, escala 1:1 en metros, mover a coordenadas reales) → 0E13.\n- 13.4 Registra fuente, fecha y precisión de cada dato.",
        ec: "Ecuador: el vuelo de drones está regulado por la Dirección General de Aviación Civil (DGAC); verifica permisos y zonas restringidas cerca de aeropuertos. El catastro lo entrega el municipio del cantón.",
        sale: "Datos de entorno ordenados en 0E1 DATA con metadatos.", tags: ["bim", "doc"], fuentes: ["gye:catastro", "q:catastro municipal {canton}", "q:DGAC Ecuador drones permiso", "earth"] },
      { id: "bim-14", t: "Modelar el entorno urbano: topografía, vías y masas urbanas por sectores",
        d: "- 14.1 Toposólido/superficie desde la nube o curvas de nivel.\n- 14.2 Vías urbanas (0E21 M.VU) por sectores (0E211, 0E212…): calzadas, aceras, bordillos.\n- 14.3 Masas urbanas (0E22 M.MU) de edificios vecinos con alturas aproximadas (para sombras, vistas y normativa).\n- 14.4 Vegetación existente relevante.\n- 14.5 Este modelo es la fuente de coordenadas compartidas.",
        sale: "Modelo de entorno (RVT) en 0E2 M.URB.", tags: ["bim", "dis"] },
      { id: "bim-15", t: "Modelar masas y zonificación general e interior en LOD 100",
        d: "- 15.1 Masas conceptuales (0DS1 ZGE) según el programa arquitectónico: volúmenes por uso, retiros y COS/CUS del IRM.\n- 15.2 Superficies de área por nivel y comparación automática con el programa (tabla de áreas).\n- 15.3 Zonificación interior (0DS2 ZINT) con habitaciones/áreas codificadas por zona y color.\n- 15.4 Estudios rápidos de asoleamiento y sombras sobre el entorno.\n- 15.5 Opciones de diseño para comparar alternativas.",
        sale: "Modelo LOD 100 + tabla programa vs. modelado.", tags: ["bim", "dis"], fuentes: ["suncalc"] },
      { id: "bim-16", t: "Dividir la arquitectura LOD 200 en links: niveles inferiores, torres y plaza",
        d: "- 16.1 Crea el archivo de niveles y rejillas maestro (Copy/Monitor en los demás).\n- 16.2 Un archivo por volumen: 0A21 A.INF (sótanos/niveles inferiores), 0A22 A.T1, 0A23 A.T2, 0A24 A.PLZ (plaza/exteriores).\n- 16.3 Activa worksharing (modelo central) si trabajan varias personas; subproyectos por zona o sistema.\n- 16.4 Vincula todos en un archivo contenedor de arquitectura.\n- 16.5 Proyecto pequeño: un solo archivo con worksets en lugar de links.",
        sale: "Modelos de arquitectura divididos y vinculados por coordenadas compartidas.", tags: ["bim"], cuando: ["grande"] },
      { id: "bim-17", t: "Modelar arquitectura LOD 200: muros, pisos, cubiertas, vanos y circulaciones verticales",
        d: "- 17.1 Tipos genéricos de muro/piso con espesor total correcto (capas se afinan en LOD 300).\n- 17.2 Vanos, puertas y ventanas genéricas con dimensiones aprobadas.\n- 17.3 Escaleras y rampas: regla de oficina '1 escalera por link' (0S31, 0S32…) para aislar cambios; ascensores como masas con foso y sala de máquinas.\n- 17.4 Habitaciones con nombre, número y código de zona; tablas de áreas por nivel.\n- 17.5 Aprobación del anteproyecto por el cliente → estado A1.",
        sale: "Modelo de anteproyecto LOD 200 aprobado.", tags: ["bim", "dis"] },
      { id: "bim-18", t: "Aprobar el equipamiento especial en anteproyecto y modelarlo en su link",
        d: "- 18.1 Lista de equipos (médico, industrial, cocina, sanitario especial) con dimensiones, pesos, holguras y requisitos de instalaciones.\n- 18.2 Modela en 0A4 EQU (0A41 E.MED, 0A42 E.IND, 0A43 E.IS) con familias de fabricante o genéricas con zona de servicio.\n- 18.3 Aprueba con el cliente/usuario en anteproyecto.\n- 18.4 Regla: una vez aprobados, los equipos se copian/supervisan en los modelos MEP para que las especialidades conecten ductos, tuberías y alimentaciones.",
        ec: "Ecuador: en salud, el equipamiento debe responder a la cartera de servicios y guías del MSP y a la tipología del establecimiento (ACESS licencia).",
        sale: "Link de equipamiento aprobado y lista de equipos con requisitos técnicos.", tags: ["bim", "dis"], cuando: ["salud", "ind", "alim", "edu", "grande"], fuentes: ["ec:msp", "ec:acess"] },
      { id: "bim-19", t: "Modelar mobiliario e interiores en links por volumen",
        d: "- 19.1 Archivos 0A31 AI.INF, 0A32 AI.T1, 0A33 AI.T2, 0A34 AI.PLZ (en proyectos pequeños, worksets).\n- 19.2 Familias de 0D153 mobiliario con parámetros de código, proveedor y costo.\n- 19.3 Acabados por habitación (piso, pared, cielo) con códigos de material de 3 letras.\n- 19.4 Tablas de mobiliario y acabados para cuantificar y licitar.",
        sale: "Modelos de interiores con tablas de mobiliario y acabados.", tags: ["bim", "dis"] }
    ]},
    { n: "Fase 3 · Proyecto técnico LOD 300/350: estructuras, fachadas y MEP", pasos: [
      { id: "bim-20", t: "Modelar estructuras en links: cimientos y sótanos, torres y vigas perimetrales",
        d: "- 20.1 Archivos 0S21 S.INF (sótanos y cimientos), 0S22 S.T1, 0S23 S.T2, 0S24 S.VP (viga perimetral).\n- 20.2 Niveles y rejillas por Copy/Monitor desde el maestro.\n- 20.3 Elementos con material estructural, sección y resistencia (f'c, fy) como parámetros; modelo analítico si se vincula a ETABS/SAP/Robot.\n- 20.4 Circulaciones verticales en 0S3 SCV con 1 escalera por link.\n- 20.5 Coordina ejes, losas y huecos con arquitectura; los muros estructurales viven en estructura, no en arquitectura.",
        ec: "Ecuador: el diseño lo firma el ingeniero estructural conforme a la NEC-SE (cargas, sísmico, hormigón, acero, cimentaciones); el modelo BIM debe reflejar las secciones del cálculo aprobado.",
        sale: "Modelos estructurales LOD 300 vinculados.", tags: ["bim", "dis"], fuentes: ["ec:nec"] },
      { id: "bim-21", t: "Modelar fachadas y muros cortina divididos por tipo y por tramo",
        d: "- 21.1 Regla: dividir fachadas por tipo (paneles opacos, vidrio, louvers) y por tramo (0S411–0S414 paneles; 0S421–0S424 vidrio).\n- 21.2 Muros cortina con rejilla, montantes y paneles de familia; parámetros de transmitancia (U), factor solar (SHGC) y transmisión visible para análisis energético.\n- 21.3 Anclajes y juntas en LOD 350/400 si el fabricante lo requiere.\n- 21.4 Tablas de paneles por tramo para fabricación.",
        sale: "Modelos de fachada por tipo/tramo con tabla de paneles.", tags: ["bim", "dis", "sost"] },
      { id: "bim-22", t: "Desarrollar arquitectura a LOD 300 y coordinación a LOD 350",
        d: "- 22.1 Sustituye tipos genéricos por tipos reales con capas (acabado, núcleo, aislamiento).\n- 22.2 Puertas y ventanas específicas con herrajes, resistencia al fuego y código.\n- 22.3 Cielos rasos con altura libre coordinada con MEP.\n- 22.4 LOD 350: pasos de instalaciones (shafts, huecos en losas y muros), soportes, interfaces entre sistemas.\n- 22.5 Verifica la matriz de LOD del BEP elemento por elemento.",
        sale: "Modelo arquitectónico LOD 300/350 conforme a la matriz.", tags: ["bim", "dis"] },
      { id: "bim-23", t: "Modelar instalaciones mecánicas (HVAC/ventilación) y exportar NWC",
        d: "- 23.1 Archivo 0M21 MEC (3D) vinculado a arquitectura y estructura por coordenadas compartidas.\n- 23.2 Equipos copiados desde el link de equipamiento; ductos, rejillas, difusores, unidades, extractores, con sistemas definidos.\n- 23.3 Holguras de mantenimiento como sólidos invisibles para detección de interferencias blandas.\n- 23.4 Exporta NWC a 0M22.",
        sale: "Modelo MEC + NWC.", tags: ["bim", "dis"], fuentes: ["ashrae"] },
      { id: "bim-24", t: "Modelar instalaciones sanitarias: agua fría/caliente (AFC) y desagüe y ventilación (DV)",
        d: "- 24.1 0M31 AFC: acometida, cisterna, bombeo, montantes, distribución, calentadores.\n- 24.2 0M32 DV: bajantes, colectores con pendiente real, ventilación, aguas lluvias.\n- 24.3 Prioridad en coordinación: las redes por gravedad mandan sobre las presurizadas.\n- 24.4 Exporta NWC (0M33, 0M34).",
        ec: "Ecuador: normas NEC-HS de hidrosanitarias y requisitos de la empresa de agua local (en Guayaquil, Interagua) para acometidas y factibilidad.",
        sale: "Modelos AFC y DV + NWC.", tags: ["bim", "dis"], fuentes: ["ec:nec", "gye:interagua"] },
      { id: "bim-25", t: "Modelar instalaciones eléctricas: iluminación (IL) y fuerza (FZ)",
        d: "- 25.1 0M41 IL: luminarias (familias 0D156 con datos fotométricos IES), circuitos, controles.\n- 25.2 0M42 FZ: tableros, bandejas, canalizaciones principales, tomacorrientes, transformador/cuarto eléctrico, generador.\n- 25.3 Holguras frente a tableros.\n- 25.4 Exporta NWC.",
        ec: "Ecuador: NEC-SB-IE (instalaciones eléctricas) y requisitos de la distribuidora CNEL EP o empresa eléctrica local para acometida y cámara de transformación.",
        sale: "Modelos IL/FZ + NWC.", tags: ["bim", "dis"], fuentes: ["ec:nec", "ec:cnel"] },
      { id: "bim-26", t: "Modelar el sistema contra incendios (0M5 CI)",
        d: "- 26.1 Red de rociadores, gabinetes, hidrantes, bombas, reserva de agua.\n- 26.2 Sistema de detección y alarma si aplica (o en 0M8 SEG · DET).\n- 26.3 Coordina con cielos rasos y estructura; exporta NWC.",
        ec: "Ecuador: Reglamento de Prevención, Mitigación y Protección contra Incendios y visto bueno del Cuerpo de Bomberos del cantón.",
        sale: "Modelo CI + NWC.", tags: ["bim", "dis"], fuentes: ["gye:bomberos", "nfpa"] },
      { id: "bim-27", t: "Modelar gas, comunicaciones y seguridad según requiera el proyecto",
        d: "- 27.1 0M6 GAS: GLP centralizado, medidores, ventilación de recintos (cocinas, calderas, laboratorios); gases medicinales en salud.\n- 27.2 0M7 COM: cableado estructurado (DATA), intercomunicadores (INT), cuartos de telecomunicaciones.\n- 27.3 0M8 SEG: CCTV, control de accesos, detección (DET).\n- 27.4 Exporta NWC por sistema.",
        sale: "Modelos de gas, comunicaciones y seguridad + NWC.", tags: ["bim", "dis"], fuentes: ["ec:inen"] }
    ]},
    { n: "Fase 4 · Federación, coordinación y dimensiones 4D–7D", pasos: [
      { id: "bim-28", t: "Crear el modelo federado RVT/NWF/NWD y la gestión de modelos MEP",
        d: "- 28.1 Archivo contenedor RVT con todos los links (para revisar en Revit).\n- 28.2 En Navisworks: añade los NWC de cada disciplina → guarda NWF (se actualiza al refrescar) en 0M12 / carpeta de modelo federado.\n- 28.3 Publica NWD congelado por hito (0M13) para revisión y para el cliente (se abre en Navisworks Freedom).\n- 28.4 Conjuntos de búsqueda (search sets) por disciplina/sistema/nivel para las pruebas.",
        sale: "NWF de trabajo + NWD publicado del hito.", tags: ["bim"] },
      { id: "bim-29", t: "Ejecutar la detección de interferencias y gestionar incidencias con BCF",
        d: "- 29.1 Matriz de interferencias (disciplina × disciplina, tolerancias, prioridades).\n- 29.2 Pruebas en Clash Detective: estructura vs. MEP, MEP vs. MEP, arquitectura vs. MEP (cielos, shafts), holguras.\n- 29.3 Agrupa por causa (un ducto que cruza 20 vigas es 1 problema) y asigna responsable.\n- 29.4 Exporta BCF (o issues en ACC) con captura y GUID; resuelve en reunión semanal de coordinación.\n- 29.5 Corrige en el modelo nativo, re-exporta NWC y repite; registra indicadores.\n- 29.6 Informe de interferencias por hito (0G).",
        sale: "Informe de interferencias + BCF + acta de reunión.", tags: ["bim", "doc"], fuentes: ["ifc"] },
      { id: "bim-30", t: "Auditar y validar los modelos antes de compartir (QA/QC, IFC, IDS)",
        d: "- 30.1 Revisa advertencias de Revit, duplicados, familias in situ, vistas sin uso, tamaño de archivo; purga.\n- 30.2 Verifica nomenclatura, coordenadas y parámetros obligatorios (tablas de control).\n- 30.3 Exporta IFC con la tabla de correspondencia y verifica en visor independiente; valida contra IDS si existe.\n- 30.4 Marca el contenedor S1 (apto para coordinación) solo tras aprobar la lista de chequeo.",
        sale: "Lista de chequeo QA firmada + IFC verificado.", tags: ["bim", "doc"], fuentes: ["ifc", "iso19650"] },
      { id: "bim-31", t: "Simular la construcción en 4D vinculando el modelo al cronograma",
        d: "- 31.1 Cronograma (MS Project, Primavera P6) con actividades a nivel de zona/nivel/sistema (carpeta 0PL).\n- 31.2 Parámetro 'Zona_Obra' o 'Fase_Obra' en los elementos para vincular automáticamente.\n- 31.3 Navisworks TimeLiner (o Synchro): reglas de enlace, simulación, logística de obra (grúa, acopios, accesos).\n- 31.4 Video de la simulación para el cliente y el constructor.",
        sale: "Simulación 4D (NWD + video) y cronograma vinculado.", tags: ["bim"], cuando: ["grande"] },
      { id: "bim-32", t: "Extraer cantidades para el presupuesto 5D",
        d: "- 32.1 Tablas de planificación por rubro (hormigón por elemento, acero estimado, mampostería, enlucidos, pisos, cielos, pintura, carpinterías, aparatos, luminarias, ductos, tuberías).\n- 32.2 Parámetro de clasificación (Uniformat/rubro) para agrupar; exporta a Excel.\n- 32.3 Cuantificación en Navisworks Quantification o CostX/Presto si se requiere trazabilidad al modelo.\n- 32.4 Enlaza a precios unitarios (APU) y compara con presupuesto referencial (carpeta 0C).\n- 32.5 Documenta lo que no sale del modelo (acero de refuerzo detallado, obras provisionales, indirectos).",
        ec: "Ecuador: presupuesto por rubros con APU; en obra pública, formato y análisis de precios según SERCOP; revisa precios de referencia de la Cámara de la Construcción de tu ciudad.",
        sale: "Cuadro de cantidades trazable al modelo + presupuesto 5D.", tags: ["bim", "doc"], fuentes: ["ec:sercop", "q:Cámara de la Construcción {ciudad} precios referenciales"] },
      { id: "bim-33", t: "Realizar el análisis energético y de carbono (6D sostenibilidad)",
        d: "- 33.1 Define espacios/zonas térmicas y parámetros de envolvente (U, SHGC).\n- 33.2 Análisis en Autodesk Insight/Green Building Studio (o gbXML a DesignBuilder/IES VE/OpenStudio) con archivo climático EPW del sitio.\n- 33.3 Optimiza orientación, protección solar, ventilación natural y dimensionamiento de HVAC.\n- 33.4 Carbono incorporado: materiales con EPD (datos según ISO 22057) y selección de alternativas de bajo carbono.\n- 33.5 Resultados a la carpeta 0SO y al informe de sostenibilidad (EDGE/LEED si aplica).",
        ec: "Ecuador: NEC-HS-EE (eficiencia energética) es la referencia normativa; la certificación EDGE es la más usada en vivienda y comercio local.",
        sale: "Informe energético y de carbono con decisiones de diseño.", tags: ["bim", "sost"], fuentes: ["epw", "edge", "leed", "ec:nec"] }
    ]},
    { n: "Fase 5 · Documentación y entregables", pasos: [
      { id: "bim-34", t: "Producir la planimetría y las láminas desde el modelo",
        d: "- 34.1 Juego de planos por disciplina con numeración A-1xx plantas, A-2xx elevaciones, A-3xx cortes, A-4xx ampliaciones, A-5xx detalles, A-6xx cuadros; S-, IS-, IE-, MEC-, CI-…\n- 34.2 Plantillas de vista aplicadas; etiquetas desde parámetros (no texto suelto).\n- 34.3 Cuadros de puertas, ventanas, acabados y áreas vinculados al modelo.\n- 34.4 Detalles 2D donde el 3D no aporta (se permite, pero dentro del RVT).\n- 34.5 Exporta PDF por plano y DWG si el municipio o consultores lo piden (0ET2 PLM).",
        ec: "Ecuador: el registro de planos municipal exige formato, cajetín y firmas de responsables técnicos (arquitecto y especialistas con registro SENESCYT); revisa requisitos del cantón.",
        sale: "Juego de planos PDF/DWG en 0ET2 PLM.", tags: ["bim", "doc"], fuentes: ["q:requisitos aprobación de planos {canton}"] },
      { id: "bim-35", t: "Revisar, aprobar y publicar cada entrega con estado y revisión",
        d: "- 35.1 Revisión interna (verificador distinto al autor).\n- 35.2 Transición a Compartido (S3/S4) para revisión del cliente; comentarios en BCF o en el CDE.\n- 35.3 Tras aprobación: Publicado A1 (o B1 con comentarios), revisión C01.\n- 35.4 Actualiza registro de documentos y transmittal.",
        sale: "Entrega publicada con registro y transmittal.", tags: ["bim", "doc"], fuentes: ["iso19650"] },
      { id: "bim-36", t: "Preparar y exportar el modelo para render (DAE/FBX a Lumion u otro)",
        d: "- 36.1 Copia depurada del modelo en 0MR (0MR1 EXT, 0MR2 INT) sin anotaciones ni elementos ocultos innecesarios.\n- 36.2 Materiales con nombres de 3 letras consistentes para reasignar rápido en el motor de render (0MR4 MAT: M.RVT / M.LM).\n- 36.3 Exporta DAE/FBX (o LiveSync) con coordenadas compartidas para que las actualizaciones encajen.\n- 36.4 Renders e imágenes a 0MR3 RND y postproducción a 0ET4 PST.",
        sale: "Modelo para render y renders exteriores/interiores.", tags: ["bim", "dis"] },
      { id: "bim-37", t: "Compilar los entregables finales: PDF unificado, modelos, NWD, IFC y renders",
        d: "- 37.1 PDF unificado con índice de planos (0ET26).\n- 37.2 Modelos RVT (con links vinculados y purgados), IFC y CAD3D en 0ET1 MDL.\n- 37.3 NWD federado de la entrega.\n- 37.4 Renders y paneles de presentación (0ET3, 0ET4).\n- 37.5 Informe BIM del hito: estado de interferencias, cantidades, LOD alcanzado.",
        sale: "Paquete de entrega completo en 0ET.", tags: ["bim", "doc"] }
    ]},
    { n: "Fase 6 · Construcción, as-built, operación y cierre (act. 5.7–5.8, ISO 19650-3)", pasos: [
      { id: "bim-38", t: "Dar soporte BIM en obra: RFIs, modelos LOD 400 y superposición en campo (AR)",
        d: "- 38.1 RFIs y órdenes de cambio vinculados a elementos del modelo (issues en el CDE).\n- 38.2 Modelos de fabricación LOD 400 de contratistas (acero, muros cortina, MEP) revisados contra el diseño.\n- 38.3 AR en campo (apps móviles, HoloLens) para verificar replanteo e instalaciones antes de cerrar cielos.\n- 38.4 Escaneos periódicos para comparar avance (scan-vs-BIM).",
        sale: "Registro de RFIs y cambios vinculado al modelo.", tags: ["bim", "doc"], cuando: ["grande"] },
      { id: "bim-39", t: "Actualizar el modelo as-built LOD 500 con lo realmente construido",
        d: "- 39.1 Recoge planos de obra, cambios aprobados y verificaciones topográficas/escaneo.\n- 39.2 Actualiza geometría y datos (equipos reales: marca, modelo, número de serie, fecha de instalación, garantía).\n- 39.3 Estado CR (registro as-constructed) en el CDE; archiva la versión de diseño.",
        sale: "Modelo as-built (RVT + IFC) en estado CR.", tags: ["bim", "doc", "mant"] },
      { id: "bim-40", t: "Entregar COBie, planes de mantenimiento (7D operación) y métricas de sostenibilidad",
        d: "- 40.1 Completa parámetros COBie (Facility, Floor, Space, Zone, Type, Component, System, Spare, Job, Document) y exporta con la extensión COBie de Revit o desde IFC.\n- 40.2 Enlaza manuales, fichas técnicas y garantías (0FM).\n- 40.3 Programa de mantenimiento preventivo por equipo (frecuencia, tarea, responsable).\n- 40.4 Métricas 6D: consumo esperado, línea base energética y de agua para comparar en operación.\n- 40.5 Formación del operador y, si existe, importación al CAFM/CMMS.",
        sale: "COBie (xlsx) + manual de operación y mantenimiento digital.", tags: ["bim", "mant", "sost"], fuentes: ["iso19650"] },
      { id: "bim-41", t: "Cerrar el proyecto en el CDE y documentar lecciones aprendidas",
        d: "- 41.1 Mueve todo a Archivo; verifica que el cliente tenga copia del AIM y de los entregables.\n- 41.2 Informe de cierre: flujos BIM usados, desafíos, indicadores (interferencias detectadas, RFIs, desviaciones de cantidades, horas).\n- 41.3 Actualiza plantillas, familias, parámetros compartidos, códigos y BEP modelo de la oficina (0D1 LIBR).\n- 41.4 Respaldo final (0B3 BKP) y política de retención.",
        sale: "Informe de cierre y lecciones aprendidas + librerías actualizadas.", tags: ["bim", "doc"] }
    ]}
  ]
});
