window.FLUJO_COD = {
  intro: "Sistema de codificación del estudio: conserva el código corto de carpetas del usuario (0A31. AI.INF _JC.TRBU_05.04.22) y lo complementa con una nomenclatura de archivos compatible con ISO 19650 (UK National Annex). Regla de convivencia: las CARPETAS se nombran con el código corto (orden y navegación), los ARCHIVOS entregables/compartidos con el código ISO (trazabilidad en el CDE), y ambos se relacionan en el registro de documentos. Sin espacios en códigos ISO, sin tildes ni ñ, separador guion (-) entre campos y guion bajo (_) antes de estado y revisión. Todos los códigos de cada tabla son únicos dentro de su grupo; se declaran en el BEP del proyecto.",
  esquema: {
    formato: "Carpeta: <CódCarpeta>. <Abrev> _<Iniciales>.<ProyCorto>_<Vxx>_<dd.mm.aa>  ·  Archivo ISO: <PROY>-<ORIG>-<VOL>-<NIV>-<TIPO>-<DISC>-<NNNN>_<ESTADO>_<REV>",
    ejemplo: "Carpeta: 0A22. A.T1 _JC.TRBU_V03_05.04.22  →  Archivo: TRBU-JCA-T1-ZZ-M3-A-0001_S1_P03.rvt  ·  Plano: TRBU-JCA-T1-05-DR-A-1105_A1_C01.pdf",
    partes: [
      ["CódCarpeta", "Código jerárquico de la carpeta del árbol del estudio (dígito 0 + letra de rama + subniveles numéricos).", "000, 0D15, 0A22, 0S411, 0M31"],
      ["Abrev", "Abreviatura de contenido de la carpeta (mayúsculas; punto para sub-abreviatura).", "LIBR, A.T1, AI.INF, SCW.PNL, E.MED"],
      ["Iniciales", "Iniciales del autor/originador o del cliente según el código corto del usuario.", "JC, JCA"],
      ["ProyCorto", "Código corto del proyecto (4 letras, igual al campo PROY).", "TRBU"],
      ["Vxx", "Versión de trabajo interna de la carpeta o archivo (dos dígitos).", "V01, V05"],
      ["dd.mm.aa", "Fecha de la versión (día.mes.año).", "05.04.22"],
      ["PROY", "Proyecto: 2–6 caracteres alfanuméricos, único en la cartera del estudio.", "TRBU, CPGY (centro pediátrico Guayaquil)"],
      ["ORIG", "Originador: 3 letras de la empresa o equipo que produce el contenedor.", "JCA (estudio), EST (consultor estructural), MEP, CLI (cliente)"],
      ["VOL", "Volumen o sistema: parte física del activo que contiene el archivo.", "INF, T1, T2, PLZ, VP, EXT, ZZ (varios), XX (no aplica)"],
      ["NIV", "Nivel o ubicación.", "B2, B1, 00, 01…, M1, RF, ZZ, XX"],
      ["TIPO", "Tipo de información (tabla Tipos).", "M3, DR, SH, RP, CM, CR"],
      ["DISC", "Disciplina/función (tabla Disciplinas).", "A, S, IS, IE, MEC, CI"],
      ["NNNN", "Número correlativo de 4 dígitos; en planos puede coincidir con el número de lámina.", "0001, 1105"],
      ["ESTADO", "Código de idoneidad/estado del CDE (tabla Estados).", "S0, S1, S3, A1, B1, CR"],
      ["REV", "Revisión: P = preliminar (P01.01 WIP menor, P01 compartida), C = contractual/publicada.", "P01.02, P03, C01"]
    ]
  },
  grupos: [
    { id: "disc", n: "Disciplinas y funciones", desc: "Código de disciplina (campo DISC). Columna nota: equivalente del UK National Annex ISO 19650 y rama de carpeta del estudio.", filas: [
      ["A", "Arquitectura", "UK NA: A · carpeta 0A"],
      ["AI", "Arquitectura interior / mobiliario", "UK NA: I · carpeta 0A3 AINT"],
      ["AP", "Paisajismo", "UK NA: L · carpeta 0P"],
      ["AU", "Urbanismo y planificación", "UK NA: T · estudios urbanos, IRM"],
      ["E", "Entorno / condiciones existentes", "carpeta 0E · modelo urbano"],
      ["T", "Topografía", "UK NA: G · carpeta 0T1"],
      ["G", "Geotecnia y mecánica de suelos", "carpeta 0T2"],
      ["S", "Estructuras", "UK NA: S · carpeta 0S"],
      ["F", "Fachadas y muros cortina", "UK NA: Y (especialista) · carpeta 0S4 SCW"],
      ["EQ", "Equipamiento especial", "carpeta 0A4 EQU"],
      ["EM", "Equipamiento médico", "0A41 E.MED"],
      ["CK", "Cocinas y lavanderías industriales", "subespecialidad de EQ"],
      ["M", "MEP general / gestión de modelos MEP", "carpeta 0M · 0M1 MGEST"],
      ["MEC", "Mecánicas: HVAC y ventilación", "UK NA: H/M · 0M2"],
      ["IS", "Instalaciones sanitarias (general)", "UK NA: P · 0M3"],
      ["AFC", "Agua fría y caliente", "0M31"],
      ["DV", "Desagüe y ventilación sanitaria", "0M32"],
      ["ALL", "Aguas lluvias y drenaje pluvial", "UK NA: D · ampliación de 0M3"],
      ["IE", "Instalaciones eléctricas (general)", "UK NA: E · 0M4"],
      ["IL", "Iluminación", "0M41"],
      ["FZ", "Fuerza / tomas / tableros", "0M42"],
      ["ER", "Energías renovables (fotovoltaica, solar térmica)", "vinculado a 0SO"],
      ["CI", "Contra incendios (extinción)", "0M5"],
      ["DI", "Detección y alarma de incendios", "0M8 · DET"],
      ["GAS", "Gas combustible (GLP / natural)", "0M6"],
      ["GM", "Gases medicinales", "salud · dentro de 0M6"],
      ["COM", "Comunicaciones: datos, voz, intercomunicadores", "0M7"],
      ["SEG", "Seguridad electrónica: CCTV, accesos", "0M8"],
      ["AUT", "Automatización / BMS / domótica", "integra MEC, IE, SEG"],
      ["V", "Transporte vertical: ascensores, escaleras mecánicas", "carpeta 0V"],
      ["AC", "Acústica", "estudios y aislamiento"],
      ["SO", "Sostenibilidad, energía y certificación", "carpeta 0SO · 6D"],
      ["C", "Costos y presupuestos (5D)", "UK NA: Q · carpeta 0C"],
      ["PL", "Planificación y programación de obra (4D)", "carpeta 0PL"],
      ["FM", "Operación y mantenimiento (7D)", "UK NA: F · carpeta 0FM"],
      ["BIM", "Gestión de información BIM", "BEP, MIDP, QA · carpeta 0G / 0D26"],
      ["CL", "Cliente / promotor", "UK NA: K"],
      ["CT", "Constructor / contratista", "UK NA: W"],
      ["SSO", "Seguridad y salud en obra", "ISO 19650-6"],
      ["SE", "Señalética y orientación", "wayfinding"],
      ["VI", "Vialidad, tránsito y estacionamientos", "UK NA: D/C"],
      ["R", "Visualización y render", "carpeta 0MR"],
      ["Z", "General / multidisciplinar", "UK NA: Z"]
    ]},
    { id: "tipo", n: "Tipos de información", desc: "Campo TIPO del nombre ISO (base UK National Annex + códigos propios).", filas: [
      ["M3", "Modelo 3D (nativo RVT, IFC)", "contenedor de modelo por disciplina"],
      ["M2", "Modelo 2D (DWG base, esquemas)", "CAD 2D gestionado"],
      ["CM", "Modelo combinado / federado", "NWF, NWD, RVT contenedor"],
      ["CR", "Informe de interferencias (clash rendition)", "reporte Navisworks + BCF"],
      ["DR", "Plano / lámina", "PDF, DWG exportado"],
      ["SH", "Cuadro / tabla (schedule)", "puertas, acabados, áreas"],
      ["SP", "Especificación técnica", "por rubro o por sistema"],
      ["RP", "Informe / memoria", "memoria descriptiva, técnica"],
      ["CA", "Cálculos", "estructural, hidráulico, eléctrico, HVAC"],
      ["BQ", "Presupuesto / cuadro de cantidades", "5D, APU"],
      ["PR", "Programa / cronograma", "MPP, P6, 4D"],
      ["MI", "Acta de reunión", "coordinación, cliente"],
      ["CO", "Correspondencia", "oficios, correos formales"],
      ["RI", "Solicitud de información (RFI)", "obra y diseño"],
      ["CH", "Orden / solicitud de cambio", "control de cambios"],
      ["TR", "Transmittal / hoja de envío", "registro de entregas"],
      ["SU", "Levantamiento / estudio de campo", "topografía, estado actual"],
      ["PC", "Nube de puntos", "RCP, RCS, E57, LAS"],
      ["OR", "Ortofoto / imagen georreferenciada", "TIF, JPG + mundo"],
      ["VS", "Visualización / render", "JPG, PNG"],
      ["AN", "Animación / video / recorrido", "MP4"],
      ["PP", "Presentación / lámina de concurso", "PDF, PPTX"],
      ["PH", "Fotografía", "registro de obra y sitio"],
      ["EP", "Plan de ejecución BIM (BEP)", "pre y post contrato"],
      ["IR", "Requisitos de información (EIR/OIR/AIR/PIR)", "cliente"],
      ["DP", "Plan de entrega (MIDP/TIDP)", "hoja de cálculo"],
      ["IE", "Intercambio de datos de activos (COBie)", "XLSX / IFC"],
      ["OM", "Manual de operación y mantenimiento", "PDF enlazado"],
      ["CT", "Contrato", "0D21"],
      ["LG", "Documento legal / permiso / licencia", "IRM, licencias, vistos buenos"],
      ["FM", "Familia / objeto BIM", "RFA"],
      ["TP", "Plantilla", "RTE, RFT, DWT"],
      ["EN", "Análisis energético / ambiental", "gbXML, informes"],
      ["QA", "Lista de chequeo / auditoría de calidad", "QA/QC de modelos"]
    ]},
    { id: "ext", n: "Formatos de archivo", desc: "Extensiones usadas en el flujo y dónde se guardan.", filas: [
      ["RVT", "Proyecto Revit", "modelos por disciplina"],
      ["RFA", "Familia Revit", "0D15 OBE"],
      ["RTE", "Plantilla de proyecto Revit", "0D14 PLNP"],
      ["RFT", "Plantilla de familia Revit", "0D11 PLND"],
      ["TXT", "Parámetros compartidos", "0D12 PRM"],
      ["XML", "Atajos de teclado / configuraciones", "0D17 SHT"],
      ["ADSKLIB", "Biblioteca de materiales Autodesk", "0D161 ADK"],
      ["NWC", "Caché de Navisworks por modelo", "por especialidad"],
      ["NWF", "Archivo de trabajo federado (referencias)", "0M12 / 0FD"],
      ["NWD", "Modelo federado publicado (congelado)", "0M13 / 0ET13"],
      ["IFC", "Industry Foundation Classes (ISO 16739)", "0ET14, archivo abierto"],
      ["BCF", "Incidencias BIM Collaboration Format", "0G"],
      ["IDS", "Especificación de entrega de información", "EIR"],
      ["DWG", "Dibujo AutoCAD", "DATA / planimetría"],
      ["DXF", "Intercambio CAD", "fabricación / corte"],
      ["PDF", "Documento portátil", "planos, informes"],
      ["SKP", "SketchUp", "0D314"],
      ["3DM", "Rhino", "geometría compleja"],
      ["RCP", "Proyecto ReCap (nube)", "0E11"],
      ["RCS", "Escaneo ReCap", "0E11"],
      ["E57", "Nube de puntos abierta", "intercambio de escaneo"],
      ["LAS", "Nube LiDAR", "dron / aéreo"],
      ["TIF", "Ortofoto GeoTIFF", "0E12"],
      ["DAE", "Collada (exportación a render)", "0MR"],
      ["FBX", "Exportación 3D para render/juegos", "0MR"],
      ["LS", "Proyecto Lumion (.ls + versión)", "0MR42 M.LM"],
      ["GBXML", "Modelo energético", "0SO"],
      ["XLSX", "Hoja de cálculo (COBie, MIDP, cantidades)", "0FM, 0C"],
      ["MPP", "Cronograma MS Project", "0PL"],
      ["JPG", "Imagen", "renders, fotos"],
      ["MP4", "Video", "4D, recorridos"],
      ["IES", "Datos fotométricos de luminaria", "familias 0D156"]
    ]},
    { id: "vol", n: "Volúmenes y zonas", desc: "Campo VOL: partición física del proyecto (coincide con la división de links).", filas: [
      ["ZZ", "Varios volúmenes / todo el proyecto", "modelos federados, informes"],
      ["XX", "No aplica", "documentos sin ubicación"],
      ["INF", "Niveles inferiores / sótanos / podio", "A.INF, S.INF, AI.INF"],
      ["T1", "Torre 1", "A.T1, S.T1"],
      ["T2", "Torre 2", "A.T2, S.T2"],
      ["T3", "Torre 3 (ampliable T4…)", "si existe"],
      ["PLZ", "Plaza / áreas exteriores de uso público", "A.PLZ"],
      ["VP", "Viga perimetral / anillo estructural", "S.VP"],
      ["EXT", "Exteriores / urbanización del predio", "vías internas, cerramientos"],
      ["CUB", "Cubierta / quinta fachada", "equipos en cubierta"],
      ["NUC", "Núcleo de circulación vertical", "escaleras, ascensores, ductos"],
      ["FAC", "Fachadas", "tramos de muro cortina"],
      ["PRQ", "Estacionamientos", "parqueos"],
      ["ANX", "Anexos / edificaciones auxiliares", "guardianía, cuarto de bombas"],
      ["URB", "Entorno urbano (fuera del predio)", "0E2"],
      ["S1", "Sector 1 de entorno", "0E211 / 0E221"],
      ["S2", "Sector 2 de entorno", "0E212 / 0E222"]
    ]},
    { id: "niv", n: "Niveles", desc: "Campo NIV: dos caracteres; los niveles de Revit se nombran igual (ej. 'N01 +3.60').", filas: [
      ["ZZ", "Varios niveles", "cortes, fachadas, modelos completos"],
      ["XX", "Sin nivel", "documentos"],
      ["B3", "Sótano 3", "de abajo hacia arriba B3, B2, B1"],
      ["B2", "Sótano 2", ""],
      ["B1", "Sótano 1", ""],
      ["FD", "Cimentación", "fundaciones, plintos, losas de cimentación"],
      ["00", "Planta baja", "nivel de acceso ±0.00"],
      ["M0", "Mezanine de planta baja", ""],
      ["01", "Piso 1 (primer piso alto)", "01, 02 … 99"],
      ["02", "Piso 2", ""],
      ["M1", "Mezanine de piso 1", ""],
      ["TT", "Planta tipo", "cuando varias plantas son idénticas"],
      ["RF", "Cubierta / terraza", "roof"],
      ["MQ", "Sala de máquinas / cuarto técnico en cubierta", ""],
      ["TN", "Terreno / emplazamiento", "implantación general"]
    ]},
    { id: "est", n: "Estados del CDE y revisiones", desc: "Códigos de idoneidad según ISO 19650 UK National Annex (2021) y revisiones.", filas: [
      ["S0", "Trabajo en curso (WIP)", "solo equipo autor; revisión P01.01, P01.02…"],
      ["S1", "Apto para coordinación", "Compartido; modelos y planos para federar"],
      ["S2", "Apto para información", "Compartido; referencia sin revisión formal"],
      ["S3", "Apto para revisión y comentarios", "Compartido; revisión por cliente/otros"],
      ["S4", "Apto para aprobación de fase", "Compartido; hito para aprobar"],
      ["S5", "Retirado (heredado BS 1192)", "no usar en proyectos nuevos"],
      ["A1", "Autorizado y aceptado — uso 1 (p. ej. licitación)", "Publicado; revisión C01…; A2, A3… para otros usos"],
      ["A2", "Autorizado — construcción", "Publicado"],
      ["A3", "Autorizado — fabricación", "Publicado"],
      ["B1", "Parcialmente aceptado con comentarios", "Publicado con observaciones; B2… sucesivos"],
      ["CR", "Registro as-built (as constructed record)", "Publicado/Archivo; modelo LOD 500"],
      ["P01.01", "Revisión preliminar con versión menor", "dentro de WIP"],
      ["P01", "Revisión preliminar", "S1–S4"],
      ["C01", "Revisión contractual", "A, B, CR"],
      ["ARC", "Archivado", "histórico inmutable del CDE"]
    ]},
    { id: "fase", n: "Fases del proyecto", desc: "Fases del flujo del estudio con equivalencia RIBA Plan of Work 2020 y LOD objetivo.", filas: [
      ["F0", "Estrategia y requisitos del cliente", "RIBA 0 · OIR/AIR · sin modelo"],
      ["F1", "Programa arquitectónico y estudios previos", "RIBA 1 · entorno, IRM, programa"],
      ["F2", "Diseño conceptual / partido", "RIBA 2 · LOD 100"],
      ["F3", "Anteproyecto", "RIBA 2–3 · LOD 200 · aprobación cliente"],
      ["F4", "Proyecto definitivo / técnico", "RIBA 3–4 · LOD 300"],
      ["F5", "Coordinación e ingeniería de detalle", "RIBA 4 · LOD 350"],
      ["F6", "Permisos y aprobaciones", "municipio, Bomberos, empresas de servicios"],
      ["F7", "Licitación y contratación", "cantidades 5D, especificaciones"],
      ["F8", "Construcción y fabricación", "RIBA 5 · LOD 400"],
      ["F9", "Entrega y cierre", "RIBA 6 · LOD 500 · COBie"],
      ["F10", "Operación y uso", "RIBA 7 · AIM · 7D"]
    ]},
    { id: "lod", n: "LOD y nivel de información", desc: "Secuencia LOD del estudio (BIMForum) con su LOIN resumido.", filas: [
      ["LOD100", "Concepto", "masas, áreas, volumen; datos: uso, área, costo por m²"],
      ["LOD200", "Anteproyecto", "elementos genéricos con tamaño y posición aproximados"],
      ["LOD300", "Proyecto", "elementos específicos con geometría precisa; datos de tipo y material"],
      ["LOD350", "Coordinación", "LOD 300 + interfaces, pasos, soportes, holguras"],
      ["LOD400", "Fabricación / construcción", "detalle de fabricación, montaje e instalación"],
      ["LOD500", "As-built", "verificado en obra; datos de equipos instalados"],
      ["LOIN-G", "LOIN geométrico", "detalle, dimensionalidad, ubicación, apariencia, comportamiento (ISO 7817-1)"],
      ["LOIN-A", "LOIN alfanumérico", "identificación + propiedades requeridas"],
      ["LOIN-D", "LOIN documental", "fichas, certificados, manuales asociados"]
    ]},
    { id: "sis", n: "Sistemas y elementos (Uniformat II nivel 2)", desc: "Parámetro de clasificación para cantidades, costos y especificaciones (ASTM E1557).", filas: [
      ["A10", "Cimentaciones", "estándar y especiales (pilotes)"],
      ["A20", "Construcción de sótanos", "excavación, muros de sótano"],
      ["B10", "Superestructura", "columnas, vigas, losas, escaleras estructurales, cubierta estructural"],
      ["B20", "Cerramiento exterior", "muros exteriores, ventanas, puertas exteriores, muros cortina"],
      ["B30", "Cubiertas", "impermeabilización, cubiertas, lucernarios"],
      ["C10", "Construcción interior", "tabiques, puertas interiores, accesorios"],
      ["C20", "Escaleras", "construcción y acabados de escaleras"],
      ["C30", "Acabados interiores", "paredes, pisos, cielos rasos"],
      ["D10", "Transporte vertical", "ascensores, montacargas, escaleras mecánicas"],
      ["D20", "Instalaciones sanitarias", "aparatos, AFC, desagües, aguas lluvias"],
      ["D30", "HVAC", "energía, generación, distribución, control"],
      ["D40", "Protección contra incendios", "rociadores, gabinetes, extintores"],
      ["D50", "Electricidad", "servicio y distribución, iluminación, comunicaciones y seguridad"],
      ["E10", "Equipamiento", "comercial, institucional, vehicular, otros"],
      ["E20", "Mobiliario y enseres", "fijo y móvil"],
      ["F10", "Construcciones especiales", "estructuras especiales, piscinas, instalaciones especiales"],
      ["F20", "Demolición selectiva", "demolición y retiro de peligrosos"],
      ["G10", "Preparación del sitio", "limpieza, movimiento de tierras"],
      ["G20", "Mejoras del sitio", "vías, parqueos, peatonales, paisajismo"],
      ["G30", "Redes civiles/mecánicas exteriores", "agua, alcantarillado, gas"],
      ["G40", "Redes eléctricas exteriores", "acometidas, alumbrado exterior"],
      ["G90", "Otras obras exteriores", "túneles de servicio, otros"],
      ["Z10", "Requisitos generales (CSI UniFormat 2010)", "indirectos, provisionales"]
    ]},
    { id: "mat", n: "Materiales y texturas (código de 3 letras)", desc: "Prefijo de nombre de material en Revit y en el motor de render: <COD>_<descripción>_<acabado> (ej. POR_60x60_Beige_Mate). Los del usuario se conservan.", filas: [
      ["FND", "Hormigón fundido in situ", "del usuario"],
      ["CEL", "Celosía (bloque/cerámica/hormigón calado)", "del usuario"],
      ["CCP", "Hormigón ciclópeo", "del usuario"],
      ["MAD", "Madera maciza", "del usuario"],
      ["ACE", "Acero estructural / pintado", "del usuario"],
      ["BLO", "Bloque de hormigón", "del usuario"],
      ["LOU", "Louver / quiebrasol", "del usuario (alias LUB)"],
      ["FCM", "Fibrocemento", "del usuario"],
      ["PVC", "PVC", "del usuario"],
      ["ALM", "Aluminio", "del usuario"],
      ["CES", "Césped", "del usuario"],
      ["TEJ", "Teja", "del usuario"],
      ["POR", "Porcelanato", "del usuario"],
      ["PIN", "Pintura", "del usuario"],
      ["GYP", "Gypsum / placa de yeso", "del usuario"],
      ["ESP", "Espejo / vidrio reflectivo", "del usuario"],
      ["PIE", "Piedra natural", "del usuario"],
      ["HOV", "Hormigón visto", "encofrado cuidado"],
      ["HPR", "Hormigón prefabricado", ""],
      ["HPU", "Hormigón pulido", "pisos industriales"],
      ["LAD", "Ladrillo", "visto o para enlucir"],
      ["ADO", "Adobe", "tierra cruda"],
      ["BAH", "Bahareque", "tradicional andino/costeño"],
      ["TAP", "Tapial / tierra apisonada", ""],
      ["GUA", "Caña guadúa", "Ecuador costa"],
      ["BAM", "Bambú laminado", ""],
      ["CLT", "Madera contralaminada (CLT)", ""],
      ["GLU", "Madera laminada encolada (glulam)", ""],
      ["TRP", "Tríplex / contrachapado", ""],
      ["MDF", "MDF", ""],
      ["MLM", "Melamina", ""],
      ["OSB", "Tablero OSB", ""],
      ["LAM", "Piso laminado", ""],
      ["DEC", "Deck (madera/compuesto)", "exteriores"],
      ["VID", "Vidrio claro / flotado", ""],
      ["VTP", "Vidrio templado", ""],
      ["VLM", "Vidrio laminado", ""],
      ["VDH", "Vidrio doble (DVH)", ""],
      ["VBL", "Bloque de vidrio", ""],
      ["INX", "Acero inoxidable", ""],
      ["GAL", "Acero galvanizado", ""],
      ["COR", "Acero corten", ""],
      ["MPF", "Metal perforado / expandido", ""],
      ["MLL", "Malla metálica", ""],
      ["ZNC", "Zinc / galvalume (cubierta)", "steel panel"],
      ["COB", "Cobre", ""],
      ["ACM", "Panel de aluminio compuesto", "fachadas"],
      ["PSW", "Panel sándwich", "cubiertas y cerramientos"],
      ["POL", "Policarbonato", ""],
      ["ACR", "Acrílico", ""],
      ["MEM", "Membrana tensada (PTFE/PVC)", ""],
      ["IMP", "Impermeabilización / membrana asfáltica", ""],
      ["CER", "Cerámica", ""],
      ["MRM", "Mármol", ""],
      ["GRN", "Granito", ""],
      ["CUA", "Cuarzo", "mesones"],
      ["TER", "Terrazo", ""],
      ["MCR", "Microcemento", ""],
      ["EPX", "Epóxico", "pisos sanitarios, industriales"],
      ["VIN", "Vinil / PVC en rollo", "salud: piso vinílico continuo"],
      ["ALF", "Alfombra", ""],
      ["CAU", "Caucho", ""],
      ["COC", "Corcho", ""],
      ["ENL", "Enlucido / revoque", ""],
      ["EST", "Estuco", ""],
      ["CAL", "Revestimiento de cal", ""],
      ["TEX", "Textil / tela", ""],
      ["PTP", "Papel tapiz", ""],
      ["HPL", "Laminado de alta presión (HPL)", "fenólico"],
      ["GRC", "Hormigón reforzado con fibra de vidrio (GRC)", ""],
      ["FIB", "Fibra de vidrio", ""],
      ["LNR", "Lana mineral / aislamiento", ""],
      ["EPS", "Poliestireno expandido", ""],
      ["ASF", "Asfalto", ""],
      ["ADQ", "Adoquín", ""],
      ["GRV", "Grava / ripio", ""],
      ["ARE", "Arena", ""],
      ["TIE", "Tierra / suelo", ""],
      ["AGU", "Agua", ""],
      ["VEG", "Vegetación / follaje", ""],
      ["MVE", "Muro verde / jardín vertical", ""],
      ["PAV", "Pavimento de hormigón", ""],
      ["GRA", "Grama sintética", ""]
    ]},
    { id: "proc", n: "Procesos constructivos", desc: "Sufijo o parámetro 'Proceso' para cuantificar y planificar (4D/5D).", filas: [
      ["FIS", "Fundido in situ", "hormigón vaciado en obra"],
      ["PRE", "Prefabricado", "elementos fabricados fuera de obra"],
      ["MOD", "Modular volumétrico", "módulos 3D"],
      ["SEC", "Construcción en seco", "steel framing, gypsum, paneles"],
      ["MAM", "Mampostería", "bloque, ladrillo con mortero"],
      ["MRE", "Mampostería reforzada/confinada", "NEC-SE-MP"],
      ["STF", "Steel framing", "perfilería liviana de acero"],
      ["WFR", "Wood framing", "entramado de madera"],
      ["SOL", "Soldado", "estructura metálica"],
      ["PER", "Empernado / apernado", "uniones metálicas"],
      ["ENS", "Ensamblado mecánico", "carpinterías, fachadas"],
      ["ADH", "Adherido", "revestimientos con adhesivo"],
      ["ANC", "Anclado", "fachadas ventiladas, piedra"],
      ["PRY", "Proyectado", "hormigón lanzado, aislamiento"],
      ["POS", "Postensado / pretensado", "losas, vigas"],
      ["EXC", "Excavación", "movimiento de tierras"],
      ["REL", "Relleno y compactación", ""],
      ["DEM", "Demolición", ""],
      ["IMR", "Impresión 3D", "construcción aditiva"],
      ["TRA", "Técnica tradicional / vernácula", "bahareque, tapial, guadúa"]
    ]},
    { id: "fam", n: "Familias Revit", desc: "Convención: <DISC>_<CAT>_<Descripción>_<Variante/Dimensión>_<Fabricante o GEN>. Tipos: <Ancho>x<Alto> o descripción corta. Ej.: A_PUE_Batiente-Simple_090x210_GEN.rfa; IE_LUM_Panel-LED_60x60_Philips.rfa; EM_EQM_Cuna-Neonatal_Estandar_GEN.rfa.", filas: [
      ["PUE", "Puertas", "0D154 vanos · A_PUE_Corrediza-Doble_180x210_GEN"],
      ["VEN", "Ventanas", "0D154 · A_VEN_Proyectable_120x150_GEN"],
      ["MRC", "Muros cortina (paneles/montantes)", "F_MRC_Panel-ACM_GEN"],
      ["MOB", "Mobiliario", "0D153 · AI_MOB_Escritorio_140x70_GEN"],
      ["MSI", "Mobiliario de sistemas / modulares", "AI_MSI_Estacion-Trabajo_4P_GEN"],
      ["CAS", "Casework / muebles fijos", "AI_CAS_Mueble-Cocina-Bajo_060_GEN"],
      ["SAN", "Aparatos sanitarios", "0D158 · IS_SAN_Inodoro-Tanque_GEN"],
      ["ELD", "Electrodomésticos", "0D159 · AI_ELD_Refrigeradora_GEN"],
      ["LUM", "Luminarias", "0D156 · IL_LUM_Downlight_Ø15_GEN"],
      ["DEL", "Dispositivos eléctricos", "FZ_DEL_Tomacorriente-Doble_GEN"],
      ["TAB", "Tableros eléctricos", "FZ_TAB_Distribucion_24C_GEN"],
      ["EQM", "Equipos mecánicos", "MEC_EQM_Split-Ducto_36kBTU_GEN"],
      ["TER", "Terminales de aire", "MEC_TER_Difusor-4V_60x60_GEN"],
      ["ACC", "Accesorios de tubería/ducto", "IS_ACC_Valvula-Compuerta_GEN"],
      ["ROC", "Rociadores", "CI_ROC_Colgante_K5.6_GEN"],
      ["GAB", "Gabinetes contra incendio", "CI_GAB_Clase-II_GEN"],
      ["DET", "Detectores y alarmas", "DI_DET_Humo-Fotoelectrico_GEN"],
      ["CAM", "Cámaras y dispositivos de seguridad", "SEG_CAM_Domo_GEN"],
      ["COMD", "Dispositivos de comunicaciones", "COM_COMD_Punto-Datos_GEN"],
      ["EQE", "Equipamiento especial", "0A4 · EQ_EQE_Campana-Industrial_GEN"],
      ["EQD", "Equipamiento médico", "0A41 · EM_EQD_Camilla-Pediatrica_GEN"],
      ["VEG", "Vegetación", "0D157 · AP_VEG_Arbol-Samán_GEN"],
      ["ENT", "Entourage (personas, vehículos)", "E_ENT_Vehiculo-Sedan_GEN"],
      ["COL", "Columnas estructurales", "0D1511 · S_COL_Rectangular-HA_GEN"],
      ["VIG", "Vigas / armazón estructural", "S_VIG_IPE_GEN"],
      ["CIM", "Cimentaciones", "S_CIM_Plinto-Aislado_GEN"],
      ["PRF", "Perfiles", "0D1510 · S_PRF_Tubo-Rect_100x50_GEN"],
      ["COB", "Coberturas / cubiertas", "0D155 · A_COB_Panel-Metalico_GEN"],
      ["ACB", "Acabados / modelos de acabado", "0D1512 · A_ACB_Zocalo_10_GEN"],
      ["GEN", "Modelo genérico", "0D152 · Z_GEN_Hueco-Paso-MEP_GEN"],
      ["ANO", "Anotación / símbolos / etiquetas", "0D151 planimetría · Z_ANO_Etiqueta-Habitacion"],
      ["CAJ", "Cajetín / marco de plano", "Z_CAJ_A1_Estudio"],
      ["PAV", "Paramétricas avanzadas", "0D1513 · A_PAV_Celosia-Parametrica_GEN"],
      ["BAR", "Barandas y pasamanos (tipos)", "A_BAR_Vidrio-Inox_110"]
    ]},
    { id: "vis", n: "Vistas y láminas", desc: "Láminas: <DISC>-<serie><nn> (A-101). Vistas: <TIPO>_<NIV/EJE>_<DISC>_<uso> (PLT_01_A_Presentacion). Las vistas de trabajo empiezan con 'TRB_' y no se colocan en planos.", filas: [
      ["x-0xx", "Generales: carátula, índice, notas, simbología, implantación", "A-001 carátula · A-002 índice"],
      ["x-1xx", "Plantas", "A-101 planta baja, A-102 piso 1… · S-101 cimentación"],
      ["x-2xx", "Elevaciones / fachadas", "A-201 fachada norte"],
      ["x-3xx", "Cortes / secciones", "A-301 corte A-A"],
      ["x-4xx", "Plantas y cortes ampliados", "A-401 baños tipo, escaleras"],
      ["x-5xx", "Detalles constructivos", "A-501 detalles de fachada"],
      ["x-6xx", "Cuadros y tablas", "A-601 puertas y ventanas"],
      ["x-7xx", "Cielos rasos / plantas reflejadas", "A-701"],
      ["x-8xx", "Acabados, interiores y mobiliario", "AI-801"],
      ["x-9xx", "Vistas 3D, perspectivas, isometrías", "A-901 · IS-901 isometría"],
      ["A-", "Prefijo arquitectura", "A-101"],
      ["S-", "Prefijo estructuras", "S-201 armado de vigas"],
      ["IS-", "Prefijo sanitarias", "IS-101 AFC planta baja"],
      ["IE-", "Prefijo eléctricas", "IE-301 diagramas unifilares"],
      ["MEC-", "Prefijo mecánicas", "MEC-101"],
      ["CI-", "Prefijo contra incendios", "CI-101"],
      ["PLT", "Vista de planta", "PLT_00_A_Presentacion"],
      ["CRT", "Vista de corte", "CRT_A-A_A"],
      ["ELEV", "Vista de elevación", "ELEV_Norte_A"],
      ["DET", "Vista de detalle", "DET_Fachada-01_A"],
      ["V3D", "Vista 3D", "V3D_Axonometria_Z"],
      ["TRB", "Vista de trabajo (no se imprime)", "TRB_01_MEC_Coordinacion"]
    ]},
    { id: "par", n: "Parámetros compartidos clave", desc: "Archivo 0D12 PRM (.txt). Prefijo del estudio para evitar choques con parámetros de fabricante.", filas: [
      ["JCA_Proyecto", "Código de proyecto (texto)", "Información de proyecto"],
      ["JCA_Originador", "Código de originador (texto)", "Información de proyecto"],
      ["JCA_Volumen", "Volumen/zona (texto)", "todas las categorías"],
      ["JCA_Estado", "Estado CDE S0–CR (texto)", "planos, información de proyecto"],
      ["JCA_Revision", "Revisión P/C (texto)", "planos"],
      ["JCA_Uniformat", "Clasificación Uniformat II (texto)", "tipos de todas las categorías"],
      ["JCA_Rubro", "Código de rubro de presupuesto (texto)", "5D"],
      ["JCA_Material_Cod", "Código de material de 3 letras (texto)", "tipos"],
      ["JCA_Proceso", "Proceso constructivo (texto)", "tipos"],
      ["JCA_LOD", "LOD del elemento (entero)", "ejemplares"],
      ["JCA_MEA", "Autor responsable del elemento (texto)", "ejemplares"],
      ["JCA_Fase_Obra", "Zona/fase de obra para 4D (texto)", "ejemplares"],
      ["JCA_Costo_Unit", "Costo unitario (moneda)", "tipos"],
      ["JCA_Acabado_Piso", "Código acabado piso (texto)", "habitaciones"],
      ["JCA_Acabado_Pared", "Código acabado pared (texto)", "habitaciones"],
      ["JCA_Acabado_Cielo", "Código acabado cielo (texto)", "habitaciones"],
      ["JCA_Zona", "Zona funcional del programa (texto)", "habitaciones/áreas"],
      ["JCA_Resist_Fuego", "Resistencia al fuego (texto, ej. RF-60)", "muros, puertas"],
      ["JCA_U_Valor", "Transmitancia U (W/m²K)", "muros, ventanas, cubiertas"],
      ["JCA_SHGC", "Factor solar (número)", "ventanas, muros cortina"],
      ["JCA_Carbono", "Carbono incorporado (kgCO2e/unidad)", "tipos · ISO 22057"],
      ["JCA_Fabricante", "Fabricante (texto)", "tipos · COBie"],
      ["JCA_Modelo", "Modelo (texto)", "tipos · COBie"],
      ["JCA_Serie", "Número de serie (texto)", "ejemplares · as-built"],
      ["JCA_Garantia", "Duración de garantía (texto)", "tipos · COBie"],
      ["JCA_Mant_Frecuencia", "Frecuencia de mantenimiento (texto)", "equipos · 7D"],
      ["JCA_Vida_Util", "Vida útil esperada (años)", "tipos · 7D"],
      ["JCA_Accesible", "Cumple accesibilidad NTE INEN (sí/no)", "puertas, baños, rampas"]
    ]},
    { id: "col", n: "Colores de disciplina", desc: "Colores sugeridos para filtros de vista, Navisworks y federado (HEX). Consistentes en todos los proyectos.", filas: [
      ["A", "Arquitectura", "#BDBDBD gris claro"],
      ["AI", "Interiores / mobiliario", "#D7B98E beige"],
      ["AP", "Paisajismo", "#6BAF5B verde"],
      ["E", "Entorno", "#E0E0E0 gris muy claro"],
      ["S", "Estructuras", "#8C8C8C gris hormigón"],
      ["F", "Fachadas / muros cortina", "#7FB3D5 celeste"],
      ["EQ", "Equipamiento especial", "#F5B041 naranja claro"],
      ["MEC", "Mecánicas HVAC — suministro", "#2E86C1 azul"],
      ["MER", "Mecánicas HVAC — retorno/extracción", "#AF7AC5 violeta"],
      ["AFC", "Agua fría", "#00BCD4 cian"],
      ["ACA", "Agua caliente", "#E74C3C rojo claro"],
      ["DV", "Desagüe y ventilación", "#8D6E63 marrón"],
      ["ALL", "Aguas lluvias", "#1ABC9C turquesa"],
      ["IL", "Iluminación", "#F4D03F amarillo"],
      ["FZ", "Fuerza / bandejas", "#F39C12 naranja"],
      ["CI", "Contra incendios", "#C0392B rojo"],
      ["GAS", "Gas", "#F1C40F amarillo intenso"],
      ["GM", "Gases medicinales", "#27AE60 verde (oxígeno), ver norma de colores de gases"],
      ["COM", "Comunicaciones", "#16A085 verde azulado"],
      ["SEG", "Seguridad", "#34495E azul oscuro"],
      ["V", "Transporte vertical", "#5D6D7E gris azulado"],
      ["CLH", "Interferencia abierta", "#FF00FF magenta"]
    ]}
  ]
};

window.FLUJO_CARPETAS = [
  { c: "000", n: "Carpeta madre", d: "Raíz del proyecto: <Iniciales>_<ProyCorto>_V01 (ej. JCA_TRBU_V01). Se crea el día 1 con todo el árbol; las ramas que no aplican se dejan vacías o se omiten sin renumerar. Espejo exacto en el CDE.", hijos: [
    { c: "0D", n: "Documentación del proyecto", d: "Todo lo que no es modelo de disciplina: librerías, legales, datos recibidos.", hijos: [
      { c: "0D1", n: "LIBR · Librerías", d: "Copia de la librería de oficina congelada para este proyecto (así una actualización de oficina no rompe el proyecto). Al cierre, lo mejorado vuelve a la librería de oficina.", hijos: [
        { c: "0D11", n: "PLND · Plantillas de diseño", d: "Plantillas de familia y de diseño.", hijos: [
          { c: "0D111", n: "Entidades", d: "Plantillas de familia (.rft) y entidades base." },
          { c: "0D112", n: "Proyectos", d: "Plantillas base de proyectos por tipología." },
          { c: "0D113", n: "Planimetría", d: "Cajetines, marcos de plano, leyendas." },
          { c: "0D114", n: "Materiales", d: "Plantillas de materiales con códigos de 3 letras." }
        ]},
        { c: "0D12", n: "PRM · Parámetros compartidos", d: "Archivo .txt único de parámetros compartidos (JCA_…). Nunca se edita un GUID; solo se añaden." },
        { c: "0D13", n: "PLNE · Plantillas de espacios / mock-ups", d: "Módulos tipo (baño accesible, consultorio, cocina, habitación) reutilizables como grupos o vínculos." },
        { c: "0D14", n: "PLNP · Plantillas de proyectos", d: "Plantilla .rte del proyecto (unidades, vistas, filtros, navegador)." },
        { c: "0D15", n: "OBE · Objetos (RFA)", d: "Familias cargables clasificadas; nombre según convención de familias.", hijos: [
          { c: "0D151", n: "Planimetría", d: "Anotaciones, etiquetas, símbolos, flechas de norte." },
          { c: "0D152", n: "Genéricos", d: "Modelos genéricos, huecos de paso MEP, masas." },
          { c: "0D153", n: "Mobiliarios", d: "Mobiliario fijo y móvil." },
          { c: "0D154", n: "Vanos", d: "Puertas, ventanas, portones, lucernarios." },
          { c: "0D155", n: "Coberturas", d: "Cubiertas, canales, bajantes, lucernarios de cubierta." },
          { c: "0D156", n: "Luminarias", d: "Luminarias con archivos IES." },
          { c: "0D157", n: "Vegetación", d: "Árboles, arbustos, cubresuelos (preferir especies nativas)." },
          { c: "0D158", n: "Equipamiento sanitario", d: "Inodoros, lavamanos, urinarios, duchas, grifería, accesorios accesibles." },
          { c: "0D159", n: "Electrodomésticos", d: "Cocinas, refrigeradoras, lavadoras." },
          { c: "0D1510", n: "Perfiles", d: "Perfiles de barrido y metálicos." },
          { c: "0D1511", n: "Estructuras", d: "Columnas, vigas, cimentaciones, conexiones." },
          { c: "0D1512", n: "Acabados", d: "Zócalos, molduras, revestimientos como familia." },
          { c: "0D1513", n: "Paramétricas avanzadas", d: "Familias con fórmulas, arreglos, celosías paramétricas, adaptativas." }
        ]},
        { c: "0D16", n: "MAT · Materiales", d: "Bibliotecas y texturas.", hijos: [
          { c: "0D161", n: "ADK · Biblioteca .adsklib", d: "Biblioteca de materiales Autodesk de la oficina." },
          { c: "0D162", n: "TXE · Texturas", d: "Imágenes de textura y mapas (relieve, normal) nombradas con el código de 3 letras." }
        ]},
        { c: "0D17", n: "SHT · Shortcuts", d: "Atajos de teclado de la oficina (.xml) para que todo el equipo trabaje igual." }
      ]},
      { c: "0D2", n: "LEGL · Documentos legales", d: "Documentación contractual y administrativa.", hijos: [
        { c: "0D21", n: "CTR · Contratos", d: "Contratos con cliente y subconsultores, adendas." },
        { c: "0D22", n: "PRS · Presupuestos", d: "Propuestas de honorarios y presupuestos de servicios." },
        { c: "0D23", n: "ADC · Actas de conformidad", d: "Actas de entrega-recepción y conformidad por hito." },
        { c: "0D24", n: "CDP · Comprobantes de pago", d: "Facturas y comprobantes." },
        { c: "0D25", n: "VLD · Validaciones", d: "Aprobaciones del cliente (A1…) y firmas de hitos." },
        { c: "0D26", n: "PEB · Plan de ejecución BIM", d: "BEP de oferta (pre-contrato) y de demanda/definitivo (post-contrato), EIR, MIDP, TIDP.", hijos: [
          { c: "0D261", n: "Oferta", d: "BEP pre-contrato." },
          { c: "0D262", n: "Demanda / definitivo", d: "EIR del cliente y BEP post-contrato firmado." }
        ]},
        { c: "0D27", n: "PRM.MUN · Permisos y aprobaciones", d: "Ampliación: IRM/línea de fábrica, aprobación de planos, licencias, vistos buenos de Bomberos, factibilidades de servicios, permiso ambiental." }
      ]},
      { c: "0D3", n: "RECP · Documentos recepcionados", d: "Todo lo que entrega el cliente o terceros, sin modificar (solo lectura).", hijos: [
        { c: "0D31", n: "DATA · Datos recibidos", d: "Separados por formato.", hijos: [
          { c: "0D311", n: "DWG", d: "Planos CAD recibidos." },
          { c: "0D312", n: "PDF", d: "Documentos y planos PDF recibidos." },
          { c: "0D313", n: "JPEG", d: "Fotografías e imágenes." },
          { c: "0D314", n: "SKP", d: "Modelos SketchUp." },
          { c: "0D315", n: "DDP · DroneDeploy", d: "Enlace al proyecto DroneDeploy (vuelo, mapa, modelo)." }
        ]}
      ]},
      { c: "0D4", n: "RCS/ORPH · Captura de realidad recibida", d: "Nubes de puntos y ortofotos originales tal como llegan; la versión procesada va a 0E1.", hijos: [
        { c: "0D41", n: "RCS · Nube de puntos original", d: "Escaneos y nubes crudas (E57, LAS, RCS)." },
        { c: "0D42", n: "ORPH · Ortofoto original", d: "Ortofotos y MDS del vuelo." }
      ]}
    ]},
    { c: "0DS", n: "Diseño conceptual", d: "Modelos LOD 100 de estudio; se congelan al aprobar el anteproyecto.", hijos: [
      { c: "0DS1", n: "ZGE · Zonificación general", d: "Masas conceptuales, volumetría, COS/CUS, retiros." },
      { c: "0DS2", n: "ZINT · Zonificación interior", d: "Zonificación por niveles con áreas vs. programa arquitectónico." }
    ]},
    { c: "0T", n: "Topografía y geotecnia", d: "Ampliación: estudios del terreno.", hijos: [
      { c: "0T1", n: "TOP · Levantamiento topográfico", d: "Planimetría, altimetría, coordenadas UTM del levantamiento, informe del topógrafo." },
      { c: "0T2", n: "GEO · Estudio de suelos", d: "Informe geotécnico, perforaciones, capacidad portante, nivel freático, perfil de suelo sísmico (NEC-SE-GC)." },
      { c: "0T3", n: "RSG · Riesgos", d: "Amenazas: inundación, licuefacción, deslizamientos (SNGR)." }
    ]},
    { c: "0E", n: "Entorno", d: "Contexto modelado; fuente de coordenadas compartidas.", hijos: [
      { c: "0E1", n: "DATA · Datos procesados del entorno", d: "Insumos procesados y georreferenciados.", hijos: [
        { c: "0E11", n: "RCS · Nube de puntos", d: "Nube procesada en ReCap (.rcp/.rcs) en coordenadas del proyecto." },
        { c: "0E12", n: "ORPH · Ortofoto", d: "Ortofoto georreferenciada recortada al sector." },
        { c: "0E13", n: "DWG · Planos catastrales limpios", d: "Catastro purgado, en metros, en coordenadas reales." }
      ]},
      { c: "0E2", n: "M.URB · Entorno urbano modelado", d: "Modelo del contexto por sectores.", hijos: [
        { c: "0E21", n: "M.VU · Vías urbanas", d: "Calzadas, aceras, bordillos por sector.", hijos: [
          { c: "0E211", n: "Sector 1", d: "Vías del sector 1." },
          { c: "0E212", n: "Sector 2", d: "Vías del sector 2." }
        ]},
        { c: "0E22", n: "M.MU · Masas urbanas", d: "Volúmenes de edificaciones vecinas.", hijos: [
          { c: "0E221", n: "Sector 1", d: "Masas del sector 1." },
          { c: "0E222", n: "Sector 2", d: "Masas del sector 2." }
        ]}
      ]}
    ]},
    { c: "0A", n: "Arquitectura", d: "Modelos arquitectónicos divididos en links por volumen.", hijos: [
      { c: "0A1", n: "DATA", d: "Insumos de arquitectura.", hijos: [
        { c: "0A11", n: "DWG", d: "Bases CAD de arquitectura." },
        { c: "0A12", n: "PDF", d: "Referencias PDF." }
      ]},
      { c: "0A2", n: "ARG · Arquitectura general", d: "Envolvente, muros, pisos, vanos, habitaciones. Archivo de niveles y rejillas maestro aquí.", hijos: [
        { c: "0A21", n: "A.INF · Niveles inferiores / sótanos", d: "Link de sótanos y podio." },
        { c: "0A22", n: "A.T1 · Torre 1", d: "Link de torre 1." },
        { c: "0A23", n: "A.T2 · Torre 2", d: "Link de torre 2." },
        { c: "0A24", n: "A.PLZ · Plaza", d: "Link de plaza y exteriores." },
        { c: "0A25", n: "AAB · Arquitectura (código AAB del usuario)", d: "Rama registrada en Miro como 0A2 AAB; confirmar su contenido (p. ej. áreas abiertas/bloques anexos) y asignarle este código para no duplicar 0A2." }
      ]},
      { c: "0A3", n: "AINT · Mobiliario e interiores", d: "Links de interiores por volumen; acabados por habitación.", hijos: [
        { c: "0A31", n: "AI.INF", d: "Interiores de niveles inferiores." },
        { c: "0A32", n: "AI.T1", d: "Interiores de torre 1." },
        { c: "0A33", n: "AI.T2", d: "Interiores de torre 2." },
        { c: "0A34", n: "AI.PLZ", d: "Mobiliario urbano de plaza." }
      ]},
      { c: "0A4", n: "EQU · Equipamiento especial", d: "Regla: los equipos se aprueban en anteproyecto y luego se copian/supervisan en los modelos MEP para conectar instalaciones.", hijos: [
        { c: "0A41", n: "E.MED · Médico", d: "Equipos médicos con holguras y requisitos (gases, eléctricos, blindaje)." },
        { c: "0A42", n: "E.IND · Industrial", d: "Maquinaria, cocinas y lavanderías industriales." },
        { c: "0A43", n: "E.IS · Sanitario", d: "Equipos sanitarios especiales (bombas, calentadores centrales, tratamiento)." }
      ]}
    ]},
    { c: "0P", n: "Paisajismo", d: "Ampliación: diseño de exteriores.", hijos: [
      { c: "0P1", n: "P.VEG · Vegetación", d: "Especies (nativas preferentes), arborización, cubresuelos." },
      { c: "0P2", n: "P.RIE · Riego y drenaje", d: "Riego, drenaje de jardines, captación de lluvia." },
      { c: "0P3", n: "P.MOB · Mobiliario urbano y pisos exteriores", d: "Bancas, luminarias exteriores, pavimentos." }
    ]},
    { c: "0S", n: "Estructuras", d: "Modelos estructurales en links, alineados con el cálculo aprobado.", hijos: [
      { c: "0S1", n: "DATA", d: "Insumos de estructuras.", hijos: [
        { c: "0S11", n: "DWG", d: "Planos estructurales CAD." },
        { c: "0S12", n: "PDF", d: "Memorias y planos PDF." }
      ]},
      { c: "0S2", n: "STG · Estructura general", d: "Links estructurales por volumen.", hijos: [
        { c: "0S21", n: "S.INF · Sótanos y cimientos", d: "Cimentación, muros de contención, losas de sótano." },
        { c: "0S22", n: "S.T1 · Torre 1", d: "Estructura torre 1." },
        { c: "0S23", n: "S.T2 · Torre 2", d: "Estructura torre 2." },
        { c: "0S24", n: "S.VP · Viga perimetral", d: "Viga/anillo perimetral." }
      ]},
      { c: "0S3", n: "SCV · Circulaciones verticales", d: "Regla: 1 escalera por link para aislar cambios.", hijos: [
        { c: "0S31", n: "Escalera 1", d: "Link escalera 1." },
        { c: "0S32", n: "Escalera 2", d: "Link escalera 2 (añadir 0S33… si hay más)." }
      ]},
      { c: "0S4", n: "SCW · Muros cortina", d: "Regla: dividir fachadas por tipo y por tramo.", hijos: [
        { c: "0S41", n: "SCW.PNL · Paneles", d: "Paneles opacos por tramo.", hijos: [
          { c: "0S411", n: "Tramo 1", d: "" }, { c: "0S412", n: "Tramo 2", d: "" }, { c: "0S413", n: "Tramo 3", d: "" }, { c: "0S414", n: "Tramo 4", d: "" }
        ]},
        { c: "0S42", n: "SCW.VID · Vidrio", d: "Paños de vidrio por tramo.", hijos: [
          { c: "0S421", n: "Tramo 1", d: "" }, { c: "0S422", n: "Tramo 2", d: "" }, { c: "0S423", n: "Tramo 3", d: "" }, { c: "0S424", n: "Tramo 4", d: "" }
        ]}
      ]}
    ]},
    { c: "0V", n: "Transporte vertical", d: "Ampliación: ascensores, montacargas, escaleras mecánicas; fichas de fabricante, fosos, salas de máquinas, cálculo de tráfico." },
    { c: "0M", n: "Especialidades (MEP)", d: "Cada especialidad en su RVT; exporta NWC para coordinación.", hijos: [
      { c: "0M1", n: "MGEST · Gestión de modelos MEP", d: "Federación de especialidades.", hijos: [
        { c: "0M11", n: "RVT contenedor MEP", d: "Archivo que vincula todas las especialidades." },
        { c: "0M12", n: "NWF", d: "Archivo de trabajo Navisworks MEP." },
        { c: "0M13", n: "NWD", d: "Publicado por hito." }
      ]},
      { c: "0M2", n: "MEC · Mecánicas", d: "HVAC y ventilación.", hijos: [
        { c: "0M21", n: "3D", d: "Modelo RVT." }, { c: "0M22", n: "NWC", d: "Exportación para coordinación." }
      ]},
      { c: "0M3", n: "IS · Sanitarias", d: "Hidrosanitarias.", hijos: [
        { c: "0M31", n: "AFC · Agua fría y caliente 3D", d: "Modelo RVT." },
        { c: "0M32", n: "DV · Desagüe y ventilación 3D", d: "Modelo RVT (incluye aguas lluvias si no se separa)." },
        { c: "0M33", n: "AFC · NWC", d: "" },
        { c: "0M34", n: "DV · NWC", d: "" }
      ]},
      { c: "0M4", n: "IE · Eléctricas", d: "Iluminación y fuerza.", hijos: [
        { c: "0M41", n: "IL · Iluminación", d: "Modelo RVT + NWC." },
        { c: "0M42", n: "FZ · Fuerza", d: "Modelo RVT + NWC." }
      ]},
      { c: "0M5", n: "CI · Contra incendios", d: "Extinción; RVT + NWC." },
      { c: "0M6", n: "GAS", d: "Gas combustible y, en salud, gases medicinales; RVT + NWC." },
      { c: "0M7", n: "COM · Comunicaciones", d: "Telecomunicaciones.", hijos: [
        { c: "0M71", n: "DATA · Datos", d: "Cableado estructurado." },
        { c: "0M72", n: "INT · Intercomunicadores", d: "Porteros, citófonos, llamado de enfermería." }
      ]},
      { c: "0M8", n: "SEG · Seguridad", d: "Seguridad electrónica.", hijos: [
        { c: "0M81", n: "CCTV", d: "Cámaras y grabación." },
        { c: "0M82", n: "DET · Detección", d: "Detección de incendio e intrusión." }
      ]}
    ]},
    { c: "0FD", n: "Modelo federado", d: "Federación global de todas las disciplinas (RVT contenedor, NWF, NWD por hito) e informes de interferencias." },
    { c: "0SO", n: "Sostenibilidad y energía (6D)", d: "Ampliación.", hijos: [
      { c: "0SO1", n: "EN · Análisis energético", d: "gbXML, EPW, resultados Insight/GBS/DesignBuilder." },
      { c: "0SO2", n: "LZ · Luz natural y asoleamiento", d: "Estudios solares y de iluminación natural." },
      { c: "0SO3", n: "CO2 · Carbono y materiales", d: "EPD, carbono incorporado." },
      { c: "0SO4", n: "CERT · Certificación", d: "EDGE/LEED/otras: evidencias y formularios." }
    ]},
    { c: "0PL", n: "Planificación 4D", d: "Ampliación: cronogramas (MPP/P6), simulaciones TimeLiner, videos, logística de obra." },
    { c: "0C", n: "Costos 5D", d: "Ampliación: cuadros de cantidades exportados, APU, presupuesto referencial, comparativos." },
    { c: "0G", n: "Gestión del proyecto", d: "Ampliación: coordinación y comunicación.", hijos: [
      { c: "0G1", n: "ACT · Actas", d: "Actas de reuniones (cliente, coordinación BIM)." },
      { c: "0G2", n: "RFI · Solicitudes de información", d: "RFIs de diseño y obra con respuesta." },
      { c: "0G3", n: "BCF · Incidencias", d: "Archivos BCF e informes de interferencias." },
      { c: "0G4", n: "TRM · Transmittals y registro de documentos", d: "Hojas de envío y registro maestro." },
      { c: "0G5", n: "CMB · Control de cambios", d: "Solicitudes y órdenes de cambio." }
    ]},
    { c: "0MR", n: "Modelo para render", d: "Copia depurada del modelo para visualización.", hijos: [
      { c: "0MR1", n: "EXT · Exterior", d: "Modelo exterior exportado (DAE/FBX)." },
      { c: "0MR2", n: "INT · Interior", d: "Modelos de interiores exportados." },
      { c: "0MR3", n: "RND · Renders", d: "Salidas del motor.", hijos: [
        { c: "0MR31", n: "R.EXT", d: "Renders exteriores." }, { c: "0MR32", n: "R.INT", d: "Renders interiores." }
      ]},
      { c: "0MR4", n: "MAT · Materiales", d: "Correspondencia de materiales.", hijos: [
        { c: "0MR41", n: "M.RVT", d: "Materiales de Revit (códigos de 3 letras)." }, { c: "0MR42", n: "M.LM", d: "Materiales y proyecto Lumion." }
      ]}
    ]},
    { c: "0B", n: "Borradores", d: "Nada de aquí se entrega.", hijos: [
      { c: "0B1", n: "AG · Apuntes generales", d: "Bocetos, notas, capturas." },
      { c: "0B2", n: "AP · Archivos de prueba", d: "Pruebas de familias, exportaciones, scripts." },
      { c: "0B3", n: "BKP · Backups", d: "Respaldos fechados; purgar según política." }
    ]},
    { c: "0ET", n: "Entregables", d: "Solo contenido publicado (A/B/CR) con nombre ISO.", hijos: [
      { c: "0ET1", n: "MDL · Modelos", d: "Modelos entregados.", hijos: [
        { c: "0ET11", n: "CAD3D", d: "" }, { c: "0ET12", n: "RVT", d: "" }, { c: "0ET13", n: "NWD", d: "" }, { c: "0ET14", n: "IFC", d: "Ampliación: formato abierto de archivo." }
      ]},
      { c: "0ET2", n: "PLM · Planimetría", d: "Láminas en PDF/DWG.", hijos: [
        { c: "0ET21", n: "PLT · Plantas", d: "" }, { c: "0ET22", n: "CRT · Cortes", d: "" }, { c: "0ET23", n: "ELEV · Elevaciones", d: "" }, { c: "0ET24", n: "DET · Detalles", d: "" }, { c: "0ET25", n: "V3D · Vistas 3D", d: "" }, { c: "0ET26", n: "PDF unificado", d: "Ampliación: juego completo con índice." }
      ]},
      { c: "0ET3", n: "RND · Renders", d: "", hijos: [
        { c: "0ET31", n: "R.EXT", d: "" }, { c: "0ET32", n: "R.INT", d: "" }
      ]},
      { c: "0ET4", n: "PST · Postproducción", d: "", hijos: [
        { c: "0ET41", n: "P.RND · Renders editados", d: "" }, { c: "0ET42", n: "P.PNL · Paneles", d: "" }, { c: "0ET43", n: "P.PLM · Planos editados", d: "" }
      ]}
    ]},
    { c: "0FM", n: "Operación y mantenimiento (7D)", d: "Ampliación: as-built, COBie, manuales, garantías, planes de mantenimiento.", hijos: [
      { c: "0FM1", n: "ASB · Modelos as-built (LOD 500)", d: "RVT/IFC en estado CR." },
      { c: "0FM2", n: "COBie", d: "Hoja COBie y validación." },
      { c: "0FM3", n: "O&M · Manuales y fichas técnicas", d: "Manuales de equipos, garantías, certificados." },
      { c: "0FM4", n: "PMP · Planes de mantenimiento", d: "Mantenimiento preventivo por equipo y frecuencia." }
    ]}
  ]}
];
