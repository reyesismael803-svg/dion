/* DION · Módulo "normas" — Contexto de normas del terreno (COS · CUS · CAS · retiros · alturas)
   Base de enlaces verificada el 2026-10-10. v:1 = enlace encontrado/leído en la web ese día;
   v:0 = sitio oficial que existe pero bloqueó la lectura automática (abrir y confirmar);
   v:"s" = no se confirmó un enlace directo -> búsqueda marcada como tal. */
window.DION_MOD = window.DION_MOD || {};
(function () {
  const K = "normas";
  const FECHA = "2026-10-10";
  const G = q => "https://www.google.com/search?q=" + encodeURIComponent(q);
  const S = (t, q, a, p) => ({ t, u: G(q), v: "s", a, p });
  const nrm = s => String(s || "").normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase().replace(/[^a-z0-9 ]+/g, " ").replace(/\s+/g, " ").trim();

  /* ───────────── BASE NACIONAL (ECUADOR) ───────────── */
  const NAC = {
    "2.4.1.1": [
      { t: "Constitución de la República del Ecuador 2008", u: "https://www.gob.ec/regulaciones/constitucion-republica-ecuador-2008-0", v: 1,
        a: "Arts. 14 (ambiente sano), 30–31 (hábitat y derecho a la ciudad), 47 núm. 10 (eliminar barreras arquitectónicas), 264 núm. 1–2 (el municipio planifica y controla el uso y ocupación del suelo), 375 (hábitat y vivienda), 389–390 (gestión de riesgos), 379 (patrimonio).",
        p: "Fundamento jurídico superior: justifica que el COS/CUS los fija el GAD y que el proyecto debe ser accesible, seguro y sostenible." }
    ],
    "2.4.1.2": [
      { t: "Secretaría Nacional de Planificación (sitio oficial)", u: "https://www.planificacion.gob.ec/", v: 0,
        a: "Rectora del Sistema Nacional Descentralizado de Planificación Participativa; publica el Plan Nacional de Desarrollo vigente y las guías para PDOT.",
        p: "Alinear el proyecto a los objetivos/ejes del PND (cita el objetivo y la meta que el proyecto ayuda a cumplir)." },
      { t: "Directrices para alinear PDOT al Plan Nacional de Desarrollo 2024–2025 (AME)", u: "https://ame.gob.ec/wp-content/uploads/2024/07/Directrices-para-alinear-pdot-al-plan-nacional-2024-2025.pdf", v: 1,
        a: "Cómo los GAD alinean su PDOT/PUGS a los objetivos del PND.",
        p: "Muestra la cadena PND → PDOT → PUGS → IRM que termina en el COS/CUS de tu lote." },
      S("Plan Nacional de Desarrollo 2025–2029 (documento oficial)", "Plan Nacional de Desarrollo 2025-2029 Ecuador site:planificacion.gob.ec",
        "Nuevo PND del período 2025–2029 (verifica nombre, ejes y objetivos en el documento oficial).", "Citar el objetivo nacional al que contribuye la tipología (salud, educación, vivienda, etc.).")
    ],
    "2.4.1.3": [
      S("LOOTUGS — Ley Orgánica de Ordenamiento Territorial, Uso y Gestión de Suelo (texto oficial)", "Ley Orgánica de Ordenamiento Territorial Uso y Gestión de Suelo site:gob.ec",
        "Art. 27 (contenido del PUGS), Arts. 17–19 (clasificación y subclasificación del suelo), Art. 72 (concesión onerosa de derechos para edificar sobre el CUS básico).",
        "Base legal de la zonificación, del aprovechamiento (COS/CUS) y de pagar por edificabilidad adicional."),
      { t: "Reglamento a la LOOTUGS", u: "https://www.gob.ec/regulaciones/reglamento-ley-organica-ordenamiento-territorial-uso-gestion-suelo", v: 1,
        a: "Desarrolla PUGS, componentes estructurante y urbanístico, tratamientos e instrumentos de gestión.", p: "Explica cómo se definen los polígonos de intervención territorial (PIT) donde cae tu lote." },
      { t: "COOTAD — Código Orgánico de Organización Territorial, Autonomía y Descentralización", u: "https://www.gob.ec/regulaciones/codigo-organico-organizacion-territorial-autonomia-descentralizacion-cootad", v: 1,
        a: "Arts. 54–55 (funciones y competencias exclusivas del GAD municipal: uso y ocupación del suelo), Art. 57 (ordenanzas), Art. 424 (área verde mínima en fraccionamientos).",
        p: "Justifica que la ordenanza municipal y la línea de fábrica/IRM son vinculantes." },
      { t: "Código Orgánico del Ambiente (COA)", u: "https://www.gob.ec/regulaciones/codigo-organico-ambiente", v: 1,
        a: "Libro III: regularización ambiental (certificado, registro o licencia según impacto).", p: "Define si el proyecto requiere registro o licencia ambiental antes del permiso de construcción." },
      { t: "SUIA — Sistema Único de Información Ambiental", u: "https://suia.ambiente.gob.ec/", v: 0,
        a: "Plataforma para el certificado de intersección y la regularización ambiental.", p: "Paso real: intersección con áreas protegidas/bosques y categoría de impacto." },
      { t: "Guía para el ingreso de información preliminar en SUIA (Municipio de Guayaquil)", u: "https://www.guayaquil.gob.ec/wp-content/uploads/2022/01/Guia-para-el-ingreso-de-informacion-preliminar-SUIA.pdf", v: 1,
        a: "Paso a paso del registro preliminar.", p: "Útil como anexo metodológico del capítulo." },
      { t: "Ley de Propiedad Horizontal", u: "https://www.gob.ec/regulaciones/ley-propiedad-horizontal-0", v: 1,
        a: "Régimen de bienes exclusivos y comunes; declaratoria municipal de PH.", p: "Aplica si el proyecto se vende o arrienda por unidades (vivienda, oficinas, locales, consultorios)." },
      { t: "Ley Orgánica de Discapacidades", u: "https://www.gob.ec/regulaciones/ley-organica-discapacidades-0", v: 1,
        a: "Obligación de accesibilidad universal en edificaciones públicas y privadas de uso público.", p: "Sustenta rampas, ascensor, baterías sanitarias y estacionamientos accesibles." },
      { t: "NTE INEN 2243 — Accesibilidad: vías de circulación peatonal (PDF, Quito Turismo)", u: "https://www.quito-turismo.gob.ec/descargas/concurso/bicentenario/cuerpos_normativos/F%20NTEINEN2243.pdf", v: 1,
        a: "Anchos mínimos de circulación peatonal y pendientes.", p: "Dimensionar veredas, accesos y circulaciones." },
      { t: "Servicio Ecuatoriano de Normalización (INEN) — catálogo NTE INEN", u: "https://www.normalizacion.gob.ec/", v: 0,
        a: "Serie de accesibilidad al medio físico NTE INEN 2239 (señalización), 2240–2242 (símbolos), 2243 (circulación), 2244 (agarraderas, bordillos, pasamanos), 2245 (rampas), 2246 (cruces), 2247 (corredores), 2248 (estacionamientos), 2249 (escaleras), 2293 (área higiénico-sanitaria), 2299 (ascensores), 2309 (puertas), 2314 (mobiliario urbano). Verifica cuáles fueron sustituidas por NTE INEN-ISO 21542.",
        p: "Lista de chequeo de accesibilidad del anteproyecto." },
      { t: "Instituto Nacional de Patrimonio Cultural (INPC)", u: "https://www.patrimoniocultural.gob.ec/", v: 1,
        a: "Ley Orgánica de Cultura: intervención en bienes y áreas patrimoniales requiere autorización.", p: "Si el lote está en área histórica o colinda con un bien inventariado, cambian alturas, retiros y materiales." },
      { t: "Ley Orgánica para la Gestión Integral del Riesgo de Desastres (Asamblea Nacional)", u: "https://www.asambleanacional.gob.ec/es/noticia/90365-proyecto-de-ley-de-gestion-integral-del-riesgo-de", v: 1,
        a: "Nota oficial del trámite de la ley; ubica el texto vigente en el Registro Oficial.", p: "Justifica el análisis de amenazas (inundación, sismo, licuefacción) del terreno." }
    ],
    "2.4.1.5": [
      { t: "MIDUVI — Documentos normativos NEC (página de descarga de todos los capítulos)", u: "https://www.habitatyvivienda.gob.ec/documentos-normativos-nec-norma-ecuatoriana-de-la-construccion/", v: 0,
        a: "Página oficial de descarga. Nota: en 2026 la rectoría de desarrollo urbano y vivienda aparece bajo el Ministerio de Infraestructura (Viceministerio de Desarrollo Urbano, Suelo y Vivienda); verifica si la página se trasladó.",
        p: "Descarga cada capítulo que vas a citar." },
      S("NEC-SE-CG Cargas (no sísmicas)", "NEC-SE-CG cargas no sismicas pdf site:habitatyvivienda.gob.ec", "Cargas muertas, vivas por uso, viento, granizo y combinaciones.", "Predimensionado de losas y cubiertas."),
      S("NEC-SE-DS Peligro sísmico / diseño sismorresistente", "NEC-SE-DS peligro sismico pdf site:habitatyvivienda.gob.ec", "Zonificación sísmica (factor Z), tipos de suelo A–F, espectro de diseño, derivas.", "Define juntas, regularidad en planta/elevación y altura razonable del volumen."),
      S("NEC-SE-CM Geotecnia y cimentaciones", "NEC-SE-CM geotecnia cimentaciones pdf site:habitatyvivienda.gob.ec", "Estudio de suelos, número de sondeos, cimentaciones.", "Suelos blandos de la costa: pilotes/losas de cimentación."),
      S("NEC-SE-HM Hormigón armado", "NEC-SE-HM hormigon armado pdf site:habitatyvivienda.gob.ec", "Diseño de elementos de hormigón armado.", "Modulación estructural y luces razonables."),
      S("NEC-SE-AC Estructuras de acero", "NEC-SE-AC estructuras de acero pdf site:habitatyvivienda.gob.ec", "Diseño en acero.", "Luces grandes, cubiertas, mezzanines."),
      S("NEC-SE-MP Mampostería estructural", "NEC-SE-MP mamposteria estructural pdf site:habitatyvivienda.gob.ec", "Mampostería confinada/reforzada.", "Proyectos de baja altura."),
      S("NEC-SE-MD Madera", "NEC-SE-MD estructuras de madera pdf site:habitatyvivienda.gob.ec", "Diseño en madera.", "Pabellones y cubiertas ligeras."),
      S("NEC-SE-GUADÚA Estructuras de guadúa", "NEC-SE-GUADUA estructuras de guadua pdf site:habitatyvivienda.gob.ec", "Diseño con bambú guadúa angustifolia.", "Arquitectura bioclimática de costa/amazonía."),
      S("NEC-SE-VIVIENDA Viviendas de hasta 2 pisos", "NEC-SE-VIVIENDA hasta 2 pisos luces 5 m pdf", "Requisitos simplificados para viviendas pequeñas.", "Tipologías residenciales pequeñas."),
      S("NEC-SE-RE Rehabilitación sísmica", "NEC-SE-RE rehabilitacion sismica pdf site:habitatyvivienda.gob.ec", "Evaluación y refuerzo de estructuras existentes.", "Reúso/adaptación de edificios."),
      S("NEC-HS-EE Eficiencia energética en edificaciones", "NEC-HS-EE eficiencia energetica edificaciones pdf", "Zonas climáticas, envolvente (transmitancias), ventilación e iluminación natural.", "Estrategias pasivas según la zona climática del terreno."),
      S("NEC-HS-AU Accesibilidad universal", "NEC-HS-AU accesibilidad universal pdf", "Rutas accesibles, rampas, ascensores, baños y estacionamientos accesibles.", "Lista de chequeo obligatoria del anteproyecto."),
      { t: "NEC-HS-CI Contra incendios (PDF, Cuerpo de Bomberos de Quito)", u: "https://lotaip.bomberosquito.gob.ec/transparencia/2022/prevencion/nec-hs-ci.pdf", v: 1,
        a: "Clasificación por ocupación, medios de egreso, compartimentación, sistemas de detección y extinción.", p: "Núcleos de escape, distancias de recorrido y anchos de salida." },
      S("NEC-HS-VIDRIO Vidrios", "NEC-HS-VIDRIO vidrio seguridad pdf", "Vidrio de seguridad, espesores y zonas de riesgo de impacto.", "Fachadas acristaladas y barandas."),
      S("NEC-HS-ER Energías renovables", "NEC-HS-ER energias renovables pdf site:habitatyvivienda.gob.ec", "Solar térmica y fotovoltaica.", "Paneles en cubierta: reserva de área."),
      S("NEC-HS-CL Climatización", "NEC-HS-CL climatizacion pdf site:habitatyvivienda.gob.ec", "Sistemas de climatización y ventilación.", "Cuartos técnicos y shafts."),
      S("NEC-SB-IE Instalaciones eléctricas", "NEC-SB-IE instalaciones electricas pdf", "Diseño de instalaciones eléctricas de baja tensión.", "Cuarto de transformador/tableros en planta baja."),
      S("NEC-SB-TE Telecomunicaciones", "NEC-SB-TE infraestructura telecomunicaciones pdf", "Infraestructura civil de telecomunicaciones.", "Ductos y cuartos de telecom."),
      { t: "NEC-SB-IG Instalaciones de gases combustibles", u: "https://www.gob.ec/regulaciones/norma-ecuatoriana-construccion-nec-sb-ig-instalaciones-gases-combustibles-uso-residencial-comercial-industrial", v: 1,
        a: "GLP/gas natural en uso residencial, comercial e industrial.", p: "Ubicación de centrales de gas y ventilación (cocinas, lavanderías)." },
      S("Norma Hidrosanitaria NHE Agua (NEC-11, cap. 16)", "Norma Hidrosanitaria NHE Agua NEC-11 capitulo 16 pdf", "Dotaciones, cisternas, redes de agua y desagüe.", "Volumen de cisterna y reserva contra incendios.")
    ],
    "2.4.1.6": [
      { t: "Reglamento de Prevención, Mitigación y Protección contra Incendios (Acuerdo 1257)", u: "https://www.gob.ec/regulaciones/reglamento-prevencion-mitigacion-proteccion-contra-incendio", v: 1,
        a: "Medios de egreso, extintores, bocas de incendio, rociadores, detección y alarma, señalización, iluminación de emergencia; visto bueno de planos por Bomberos.",
        p: "Requisito previo al permiso de construcción y al permiso de funcionamiento." },
      { t: "Reglamento de prevención (versión 2024, Bomberos Quito)", u: "https://lotaip.bomberosquito.gob.ec/transparencia/2024/archivos/rpmpci24.pdf", v: 1,
        a: "Texto consolidado publicado por el Cuerpo de Bomberos.", p: "Consulta rápida de requisitos por ocupación." },
      { t: "Reglamento de prevención (Benemérito Cuerpo de Bomberos de Guayaquil)", u: "https://bomberosguayaquil.gob.ec/wp-content/uploads/2018/07/3-Reglamento_Mitigacion_Prevencion_Incendios.pdf", v: 1,
        a: "Versión publicada por Bomberos Guayaquil.", p: "Referencia para proyectos en Guayas." },
      { t: "NEC-HS-CI Contra incendios", u: "https://lotaip.bomberosquito.gob.ec/transparencia/2022/prevencion/nec-hs-ci.pdf", v: 1,
        a: "Norma técnica de construcción para protección contra incendios.", p: "Compartimentación y escaleras protegidas." },
      { t: "NFPA 101 Life Safety Code (referencia internacional)", u: "https://www.nfpa.org/codes-and-standards/nfpa-101-standard-development/101", v: 1,
        a: "Medios de egreso por ocupación (salud, educación, reunión…).", p: "Respaldo técnico cuando la norma local remite a NFPA." },
      { t: "NFPA 13 Instalación de rociadores", u: "https://www.nfpa.org/codes-and-standards/nfpa-13-standard-development/13", v: 1,
        a: "Diseño de sistemas de rociadores automáticos.", p: "Reserva de agua, bombas y cuarto de bombas." }
    ]
  };

  /* ───────────── NORMATIVA ESPECÍFICA POR TEMA (ctx.tipo.cat.c) ───────────── */
  const TEMA = {
    SAL: [
      { t: "Acuerdo 00030-2020: Reglamento para establecer la tipología de establecimientos de salud", u: "https://www.gob.ec/regulaciones/acuerdo-00030-2020-reglamento-establecer-tipologia-establecimientos-salud-sistema-nacional-salud", v: 1,
        a: "Niveles de atención (I, II, III) y tipologías (centro de salud, centro especializado, hospital básico/general/especializado).", p: "Define el programa mínimo del establecimiento según su nivel." },
      { t: "IESS — Homologación de tipología por cartera de servicios", u: "https://www.iess.gob.ec/documents/10162/2907747/Homologacion+de+Tipologia+por+Cartera+de+Servicios.pdf", v: 1,
        a: "Cartera de servicios por tipología.", p: "Cruce entre servicios y espacios del programa." },
      { t: "Ministerio de Salud Pública (sitio oficial)", u: "https://www.salud.gob.ec/", v: 1,
        a: "Acuerdos ministeriales, guías y normas de infraestructura sanitaria.", p: "Busca guías de acabados y de diseño de establecimientos." },
      S("ACESS — licenciamiento de establecimientos de salud (requisitos de infraestructura)", "ACESS licenciamiento establecimientos de salud requisitos infraestructura Ecuador",
        "Requisitos para el permiso/licenciamiento de funcionamiento.", "Áreas mínimas y circulaciones verificadas en la licencia."),
      S("OPS — Hospitales seguros / índice de seguridad hospitalaria", "OPS hospitales seguros indice de seguridad hospitalaria", "Seguridad estructural, no estructural y funcional ante desastres.", "Criterios de resiliencia para salud (internacional).")
    ],
    EDU: [
      { t: "Acuerdo 0482-12: Estándares educativos (incluye estándares de infraestructura)", u: "https://educacion.gob.ec/wp-content/uploads/downloads/2017/12/Acuerdo-No-0482-12-Estandares-Educativos_05-12-2017.pdf", v: 1,
        a: "Estándares de calidad educativa, incluida infraestructura escolar.", p: "Áreas por alumno, espacios mínimos y servicios." },
      { t: "Programa Nacional de Infraestructura para la Universalización de la Educación", u: "https://educacion.gob.ec/wp-content/uploads/downloads/2017/08/programa-nacional-de-infraestructura-para-universalizacion-de-educacion-con-calidad-y-equidad.pdf", v: 1,
        a: "Tipologías de unidades educativas (mayor, menor, milenio).", p: "Referente de programa y dimensionamiento." },
      S("MINEDUC — Normas técnicas y estándares de infraestructura educativa", "Ministerio de Educación Ecuador normas tecnicas estandares infraestructura educativa", "Normas vigentes de diseño de espacios educativos.", "Aulas, laboratorios, baterías sanitarias.")
    ],
    HOS: [
      { t: "Reglamento de Alojamiento Turístico", u: "https://www.gob.ec/regulaciones/reglamento-alojamiento-turistico", v: 1,
        a: "Clasificación (hotel, hostal, resort, etc.), categorías y requisitos por estrellas.", p: "Áreas mínimas de habitación y servicios obligatorios." }
    ],
    TRA: [
      { t: "DGAC Ecuador — Biblioteca (RDAC / resoluciones)", u: "https://www.aviacioncivil.gob.ec/biblioteca/", v: 1,
        a: "Regulaciones Técnicas de Aviación Civil (RDAC); diseño de aeródromos en la parte correspondiente (verifica número de parte).", p: "Superficies limitadoras de obstáculos, franjas, zonas de seguridad." },
      { t: "OACI — Anexo 14, Vol. I: Diseño y operaciones de aeródromos", u: "https://store.icao.int/en/annex-14-aerodromes", v: 1,
        a: "Clave de referencia, pistas, calles de rodaje, plataformas, superficies de obstáculos.", p: "Base internacional del máster plan aeroportuario." },
      S("RDAC Parte 154 (diseño de aeródromos) Ecuador", "RDAC parte 154 diseño de aerodromos Ecuador DGAC", "Transposición nacional del Anexo 14.", "Límites de altura en el entorno del aeropuerto.")
    ],
    CUL: [
      { t: "INPC — Instituto Nacional de Patrimonio Cultural", u: "https://www.patrimoniocultural.gob.ec/", v: 1,
        a: "Autorizaciones para intervenir bienes y entornos patrimoniales.", p: "Museos, centros culturales y lotes en áreas históricas." }
    ],
    IND: [
      { t: "Código Orgánico del Ambiente (regularización por impacto)", u: "https://www.gob.ec/regulaciones/codigo-organico-ambiente", v: 1,
        a: "Licencia ambiental para actividades de mediano/alto impacto.", p: "Industria y logística suelen requerir licencia." },
      S("Compatibilidad de uso industrial en el PUGS del cantón", "uso de suelo industrial PUGS Ecuador bajo mediano alto impacto", "Tipos de industria por impacto y zonas permitidas.", "Ubicación, retiros mayores y franjas de amortiguamiento.")
    ],
    COM: [
      { t: "Ley de Propiedad Horizontal", u: "https://www.gob.ec/regulaciones/ley-propiedad-horizontal-0", v: 1, a: "Locales y oficinas por unidades.", p: "Áreas comunales y alícuotas." }
    ],
    RES: [
      { t: "Ley de Propiedad Horizontal", u: "https://www.gob.ec/regulaciones/ley-propiedad-horizontal-0", v: 1, a: "Vivienda colectiva por unidades.", p: "Áreas comunales, estacionamientos, alícuotas." }
    ]
  };
  TEMA.GAS = TEMA.COM; TEMA.OFI = TEMA.COM; TEMA.MIX = TEMA.COM.concat(TEMA.RES.slice(0, 0));
  TEMA.REL = TEMA.CUL; TEMA.AGR = TEMA.IND; TEMA.INF = TEMA.IND;

  /* ───────────── CERTIFICACIONES ───────────── */
  const CERT = [
    { id: "punto", t: "Punto Verde — Construcciones sostenibles (MAE, Ecuador)", u: "https://www.gob.ec/mae/tramites/emision-certificacion-ecuatoriana-ambiental-punto-verde-cea-construcciones-sostenibles", v: 1, a: "Certificación ecuatoriana voluntaria del Ministerio del Ambiente para construcciones sostenibles (energía, agua, residuos, materiales)." },
    { id: "casaec", t: "Casa Ecuador — certificación nacional de construcción sostenible (MIT, 2026) · noticia", u: "https://kchcomunicacion.com/?p=546529", v: 1, a: "Nueva (sep. 2026): cambio climático y resiliencia, biodiversidad, salud y bienestar, agua, energía, materiales, residuos y valor social. Ente certificador: Consejo Ecuatoriano de Edificación Sustentable." },
    { id: "pces", t: "PCES — no encontrada", u: G("PCES certificacion construccion sostenible Ecuador"), v: "s", a: "No se encontró ninguna certificación ecuatoriana oficial con la sigla PCES (búsqueda 2026-10-10). Lo vigente es Punto Verde (MAE) y Casa Ecuador (MIT). Confirma con tu docente qué significa." },
    { id: "leed", t: "LEED v4.1 / v5 (USGBC)", u: "https://www.usgbc.org/leed", v: 1, a: "Sitio, agua, energía, materiales, calidad ambiental interior; v5 (2025) agrega descarbonización, resiliencia y equidad." },
    { id: "edge", t: "EDGE (IFC – Banco Mundial)", u: "https://edgebuildings.com/resources/certification-faqs", v: 1, a: "Ahorro mínimo de 20% en energía, agua y energía incorporada en materiales frente a una línea base local. Muy usado en Ecuador." },
    { id: "well", t: "WELL v2 (IWBI)", u: "https://www.wellcertified.com/", v: 1, a: "Salud y bienestar: aire, agua, alimentación, luz, movimiento, confort térmico, sonido, materiales, mente, comunidad." },
    { id: "breeam", t: "BREEAM (BRE, Reino Unido)", u: "https://breeam.com/", v: 1, a: "Gestión, salud, energía, transporte, agua, materiales, residuos, ecología y contaminación." },
    { id: "phi", t: "Passivhaus (Passive House Institute)", u: "https://passivehouse.com/", v: 1, a: "Demanda energética muy baja, hermeticidad, sin puentes térmicos y ventilación con recuperación." },
    { id: "lbc", t: "Living Building Challenge (ILFI)", u: "https://living-future.org/lbc/", v: 1, a: "7 pétalos: lugar, agua, energía, salud, materiales (Red List), equidad, belleza; desempeño real medido 12 meses." },
    { id: "dgnb", t: "DGNB (Alemania)", u: "https://www.dgnb.de/en", v: 1, a: "Calidad ambiental, económica, sociocultural, técnica, de proceso y de sitio con enfoque de ciclo de vida." },
    { id: "casbee", t: "CASBEE (Japón)", u: "https://www.ibecs.or.jp/CASBEE/english/", v: 1, a: "Eficiencia ambiental BEE = calidad del edificio (Q) / carga ambiental (L)." },
    { id: "gg", t: "Green Globes (Green Building Initiative)", u: "https://thegbi.org/", v: 1, a: "Gestión, sitio, energía, agua, materiales, emisiones y ambiente interior (EE. UU./Canadá)." },
    { id: "gstar", t: "Green Star (Green Building Council of Australia)", u: "https://www.gbca.au/", v: 1, a: "Edificios responsables, saludables, resilientes y positivos; lugar, personas, naturaleza." },
    { id: "nabers", t: "NABERS (Australia)", u: "https://www.nabers.gov.au/", v: 1, a: "Desempeño operativo medido: energía, agua, residuos y ambiente interior (1–6 estrellas)." },
    { id: "hqe", t: "HQE (Alliance HQE-GBC / Cerway)", u: "https://www.hqegbc.org/", v: 1, a: "Energía, medio ambiente, salud y confort; certificación internacional vía Cerway." },
    { id: "parks", t: "Parksmart (GBCI)", u: "https://parksmart.gbci.org/", v: 1, a: "Estacionamientos sostenibles: gestión, programación y tecnología." },
    { id: "earth", t: "EarthCheck", u: "https://earthcheck.org/", v: 1, a: "Turismo y destinos: energía, agua, residuos, comunidad (hoteles, resorts)." },
    { id: "active", t: "Active House", u: "https://www.activehouse.info/", v: 1, a: "Confort (luz natural, aire, térmico), energía y ambiente en vivienda." },
    { id: "nzeb", t: "NZEB — Edificio de consumo de energía casi nulo (UE)", u: "https://energy.ec.europa.eu/topics/energy-efficiency/energy-performance-buildings/nearly-zero-energy-buildings_en", v: 0, a: "Concepto normativo europeo: demanda muy baja cubierta en gran parte con renovables in situ." }
  ];

  const INTL = [
    { t: "IBC 2024 — International Building Code (ICC)", u: "https://codes.iccsafe.org/content/IBC2024V1.0", v: 1, a: "Ocupaciones, tipos de construcción, alturas y áreas admisibles, egresos.", p: "Referente internacional de áreas/alturas por tipo de construcción." },
    { t: "ADA Standards for Accessible Design", u: "https://www.ada.gov/law-and-regs/design-standards/", v: 1, a: "Accesibilidad (EE. UU.).", p: "Comparativo con NEC-HS-AU / INEN." },
    { t: "ISO 19650-1 — Gestión de la información BIM", u: "https://www.iso.org/standard/68078.html", v: 1, a: "Conceptos y principios de gestión de información con BIM.", p: "Metodología de entrega del proyecto (Revit)." },
    { t: "NFPA 101 Life Safety Code", u: "https://www.nfpa.org/codes-and-standards/nfpa-101-standard-development/101", v: 1, a: "Seguridad humana.", p: "Egresos." },
    { t: "OACI (ICAO)", u: "https://www.icao.int/", v: 1, a: "Normas y métodos recomendados de aviación civil.", p: "Proyectos aeroportuarios." }
  ];

  /* ───────────── CANTONES ───────────── */
  const C = {};
  const add = (keys, o) => keys.forEach(k => C[nrm(k)] = o);
  add(["guayaquil"], {
    n: "Guayaquil", prov: "Guayas", irm: "Consulta de normas por código catastral + Registro de Construcción",
    docs: [
      { t: "M.I. Municipalidad de Guayaquil", u: "https://www.guayaquil.gob.ec/", v: 1, a: "Sitio oficial.", p: "Punto de partida." },
      { t: "Gacetas y Ordenanzas", u: "https://guayaquil.gob.ec/gacetas-y-ordenanzas/", v: 1, a: "Repositorio de ordenanzas vigentes (incluye la de actualización del PDOT y PUGS).", p: "Ubica la ordenanza PDOT/PUGS vigente y sus reformas." },
      { t: "Reforma a la Ordenanza Sustitutiva de Edificaciones y Construcciones (2015)", u: "https://www.guayaquil.gob.ec/wp-content/uploads/2021/10/2015-08-13-Reforma-ordenanza-sustitutiva-de-edificaciones-y-construcciones-del-canton-Guayaquil.pdf", v: 1, a: "Normas de edificación: retiros, alturas, estacionamientos, registro de construcción.", p: "Condiciones de edificación del proyecto." },
      { t: "Reforma a la Ordenanza Sustitutiva de Edificaciones y Construcciones (2011)", u: "https://www.guayaquil.gob.ec/wp-content/uploads/Documentos/Ordenanzas/Planificaci%C3%B3n%20Urbana/30-09-2011%20Reforma%20a%20la%20Ordenanza%20sustitutiva%20de%20edificaciones%20y%20construcciones%20del%20Cant%C3%B3n%20Guayaquil.pdf", v: 1, a: "Reforma previa.", p: "Historia normativa." },
      { t: "Gaceta 22 (2024): plan parcial de cambio de uso — remite a Tablas 136/137 del PUGS por PIT", u: "https://www.guayaquil.gob.ec/wp-content/uploads/Documentos/Gacetas/Periodo%202023-2027/Gaceta-22.pdf", v: 1, a: "Ejemplo real: cita la Ordenanza de actualización del PDOT 2019-2023 y PUGS, subzonas (ej. ZR-VC) y concesión onerosa de derechos.", p: "Muestra cómo se leen subzonas y PIT en Guayaquil." },
      S("PUGS de Guayaquil (anexos y mapas de subzonas)", "Guayaquil Plan de Uso y Gestión del Suelo PUGS anexos tabla 136 137 subzonas site:guayaquil.gob.ec", "Tablas de usos y aprovechamiento por PIT/subzona.", "COS, CUS, altura y lote mínimo de tu subzona."),
      { t: "Mapas de Guayaquil (visor municipal)", u: "https://mapa.guayaquil.gob.ec/", v: 1, a: "Visor geográfico municipal.", p: "Ubicar el predio, subzona y afectaciones." },
      { t: "Consulta de código predial", u: "https://guayaquil.gob.ec/consulta-de-codigo-predial/", v: 1, a: "Código catastral del predio.", p: "Dato necesario para pedir las normas del lote." },
      { t: "Trámite: Aprobación de registro de construcción en predio urbano (gob.ec)", u: "https://www.gob.ec/gadmg/tramites/aprobacion-registro-construccion-predio-urbano", v: 1, a: "Requisitos y pasos del permiso.", p: "Paso final del proceso real." }
    ],
    nota: "En Guayaquil el PUGS asigna normas por Polígono de Intervención Territorial (PIT) y subzona (ej. ZR, ZC, ZM, ZR-VC). Los valores de COS/CUS, altura y retiros se leen en las tablas de aprovechamiento del PUGS para tu subzona y se confirman con el código catastral."
  });
  add(["daule", "la aurora", "satelite la aurora"], {
    n: "Daule", prov: "Guayas", irm: "Informe de normas / línea de fábrica (Dirección de Planificación)",
    docs: [
      { t: "GAD Municipal de Daule", u: "https://www.daule.gob.ec/", v: 1, a: "Sitio oficial.", p: "Punto de partida." },
      { t: "Plan de Ordenamiento Territorial (página con PDOT y PUGS)", u: "https://www.daule.gob.ec/plan-de-ordenamiento-territorial/", v: 1, a: "Lista de documentos vigentes.", p: "Fuente primaria del PUGS." },
      { t: "Ordenanza que actualiza el PDOT 2023-2027 y el PUGS (R.O. 2097, 13-feb-2025)", u: "https://www.daule.gob.ec/wp-content/uploads/2025/02/ORDENANZA-QUE-ACTUALIZA-PLAN-DE-PDOT-2023-2027.pdf", v: 1, a: "Actualización vigente del PDOT y del PUGS.", p: "Zonificación y aprovechamiento vigente." },
      { t: "Gaceta 105: Segunda reforma PDOT 2021-2027 / PUGS 2021-2032 (normas de La Aurora, Anexos 1 y 2)", u: "https://www.daule.gob.ec/wp-content/uploads/2023/09/GACETA_105.pdf", v: 1, a: "Disp. Transitoria Quinta: aplica Anexos 1 y 2 de ocupación, edificabilidad y estacionamientos en la parroquia Satélite La Aurora. Edificación aislada; >3 niveles exige ascensor.", p: "Tabla de COS/CUS/lote mínimo/retiros de La Aurora." },
      { t: "Gacetas municipales", u: "https://www.daule.gob.ec/gacetas/", v: 1, a: "Ordenanzas publicadas.", p: "Reformas posteriores." },
      { t: "Trámites en línea", u: "https://www.daule.gob.ec/tramites-en-linea/", v: 1, a: "Servicios municipales.", p: "Solicitar normas/línea de fábrica." },
      { t: "Trámite: Aprobación de movimiento de tierra (gob.ec)", u: "https://www.gob.ec/gadmc-daule/tramites/aprobacion-movimiento-tierra", v: 1, a: "Relleno y nivelación de lotes.", p: "Terrenos bajos de La Aurora suelen requerir relleno." }
    ],
    nota: "Gaceta 105, Anexo 1 (La Aurora) — valores de referencia leídos en el documento (tabla mal extraída; confirma tu zona ZLA/ZR/ZRC/ZI): residencial/comercial lote 100–400 m², COS 0,80–1,00, CUS 2–4, hasta 3–5 niveles; equipamiento de mediano/bajo impacto lote 1.200 m², frente 20 m, COS 0,80, CUS 1,80, máx. 20 m, retiros 5/3/5 m; alto impacto lote 2.000 m², frente 50 m, COS 0,70, CUS 1,60, retiros 5/4/8 m.",
    ref: { cos: 0.8, cus: 1.8, retF: 5, retL: 3, retP: 5, altura: 20, pisos: 3, loteMin: 1200, frenteMin: 20, uso: "Equipamiento" }
  });
  add(["samborondon", "la puntilla"], {
    n: "Samborondón", prov: "Guayas", irm: "Certificado de uso de suelo / normas de la urbanización",
    docs: [
      { t: "GAD Municipal de Samborondón", u: "https://www.samborondon.gob.ec/", v: 1, a: "Sitio oficial.", p: "Punto de partida." },
      { t: "Ordenanzas", u: "https://www.samborondon.gob.ec/ordenanzas/", v: 1, a: "Ordenanzas vigentes, incluidas las de aprobación de urbanizaciones de La Puntilla.", p: "Cada urbanización tiene su propia ordenanza/normas." },
      { t: "PDyOT", u: "https://www.samborondon.gob.ec/pdyot/", v: 1, a: "Plan de Desarrollo y Ordenamiento Territorial (y PUGS asociado).", p: "Zonificación cantonal." },
      { t: "Trámites para certificado de uso de suelo", u: "https://www.samborondon.gob.ec/tramites-para-certificado-de-uso-de-suelo-y-permiso-para-letreros-de-establecimientos-comerciales/", v: 1, a: "Cómo obtener el certificado de uso de suelo.", p: "Confirmar compatibilidad de la tipología." },
      { t: "Guía de trámites", u: "https://www.samborondon.gob.ec/guia-de-tramites/", v: 1, a: "Requisitos de permisos.", p: "Permiso de construcción." },
      S("PUGS Samborondón (documento)", "Samborondon Plan de Uso y Gestion del Suelo PUGS ordenanza", "Normas de aprovechamiento.", "COS/CUS por zona.")
    ],
    nota: "En La Puntilla muchas urbanizaciones cerradas tienen normas propias aprobadas por ordenanza (retiros y alturas más estrictos que el PUGS). Pide también el reglamento interno de la urbanización."
  });
  add(["duran", "eloy alfaro"], {
    n: "Durán", prov: "Guayas", irm: "Normas de edificación / línea de fábrica",
    docs: [
      { t: "GAD Municipal de Durán", u: "https://www.duran.gob.ec/", v: 1, a: "Sitio oficial.", p: "Punto de partida." },
      { t: "Biblioteca (documentos municipales)", u: "https://duran.gob.ec/biblioteca/", v: 1, a: "Ordenanzas y planes.", p: "Buscar PDOT/PUGS." },
      { t: "Guía de trámites (requisitos)", u: "https://tramites.duran.gob.ec/#/requisitos", v: 1, a: "Requisitos de trámites.", p: "Línea de fábrica y permiso de construcción." },
      S("PUGS Durán", "Duran Guayas Plan de Uso y Gestion del Suelo PUGS ordenanza", "Zonificación.", "COS/CUS.")
    ]
  });
  add(["milagro", "san francisco de milagro"], {
    n: "Milagro", prov: "Guayas", irm: "Informe de regulación / línea de fábrica",
    docs: [
      { t: "GAD Municipal de Milagro", u: "https://milagro.gob.ec/", v: 1, a: "Sitio oficial.", p: "Punto de partida." },
      { t: "Manual de aplicación de la normativa del Plan Milagro 2040", u: "https://milagro.gob.ec/wp-content/uploads/2025/02/manual_aplicacion_normativa_pm2040.pdf", v: 1, a: "Cómo leer la normativa urbanística (zonas, aprovechamiento).", p: "Leer COS/CUS y retiros de tu zona." },
      S("PUGS Milagro (ordenanza)", "Milagro Plan de Uso y Gestion del Suelo ordenanza site:milagro.gob.ec", "Ordenanza del PUGS.", "Fuente primaria.")
    ]
  });
  add(["salinas"], {
    n: "Salinas", prov: "Santa Elena", irm: "Línea de fábrica",
    docs: [
      { t: "GAD Municipal de Salinas", u: "https://www.salinas.gob.ec/", v: 1, a: "Sitio oficial.", p: "Punto de partida." },
      { t: "PUGS Salinas (PDF)", u: "https://www.salinas.gob.ec/images/descargas/PLAN%20DE%20DESARROLLO%20LOCAL/PUGS%20Salinas.pdf", v: 1, a: "Plan de Uso y Gestión del Suelo.", p: "COS/CUS y alturas en zona costera." },
      { t: "Gaceta 139", u: "https://salinas.gob.ec/images/descargas/Gacetas/131-140/Gaceta_139.pdf", v: 1, a: "Ordenanzas publicadas.", p: "Reformas." }
    ],
    nota: "Zona costera: revisa además franjas de playa y bajamar (dominio público) y servidumbres."
  });
  add(["santa elena"], {
    n: "Santa Elena", prov: "Santa Elena", irm: "Línea de fábrica",
    docs: [
      S("GAD Municipal del cantón Santa Elena (sitio oficial)", "GAD Municipal cantón Santa Elena sitio oficial municipio", "No se confirmó el dominio municipal (santaelena.gob.ec corresponde al GAD Provincial).", "Ubicar el sitio del municipio."),
      S("PUGS Santa Elena", "Santa Elena canton Plan de Uso y Gestion del Suelo PUGS ordenanza", "Zonificación.", "COS/CUS.")
    ]
  });
  add(["playas", "general villamil"], {
    n: "Playas (General Villamil)", prov: "Guayas", irm: "Línea de fábrica",
    docs: [
      { t: "GAD Municipal de Playas", u: "https://www.playas.gob.ec/", v: 0, a: "Sitio oficial (bloqueó la lectura automática).", p: "Punto de partida." },
      S("PUGS Playas", "Playas General Villamil Plan de Uso y Gestion del Suelo PUGS", "Zonificación.", "COS/CUS.")
    ]
  });
  add(["quito", "distrito metropolitano de quito"], {
    n: "Quito (DMQ)", prov: "Pichincha", irm: "IRM — Informe de Regulación Metropolitana",
    docs: [
      { t: "Municipio del Distrito Metropolitano de Quito", u: "https://www.quito.gob.ec/", v: 1, a: "Sitio oficial.", p: "Punto de partida." },
      { t: "Manual del PUGS (Secretaría de Hábitat)", u: "https://habitat.quito.gob.ec/wp-content/uploads/2025/07/MANUAL-PUGS.pdf", v: 1, a: "Cómo leer el PUGS: tratamientos, aprovechamiento, edificabilidad.", p: "Interpretar el IRM." },
      { t: "Trámite: Emisión del IRM (gob.ec)", u: "https://www.gob.ec/gaddmq/tramites/emision-informe-regulacion-metropolitana-irm-0", v: 1, a: "Requisitos para obtener el IRM.", p: "Documento que confirma COS/CUS/altura/retiros." },
      { t: "Tu Ciudad en Línea (geoportal GeoQuito)", u: "https://geoquito.quito.gob.ec/portal/apps/sites/#/sistema-geoinformacion-tu-ciudad-en-linea", v: 1, a: "Información de predios y planificación.", p: "Consultar zonificación del predio." },
      { t: "Secretaría de Hábitat y Ordenamiento Territorial", u: "https://habitat.quito.gob.ec/", v: 1, a: "Normativa y guías de licencias (LMU).", p: "Licencia metropolitana urbanística." }
    ],
    nota: "El IRM de Quito expresa la zonificación con códigos tipo A604-50: letra = forma de ocupación (A aislada, B pareada, C continua…), 3 primeros dígitos = lote mínimo (600 m²) y pisos (04), último par = COS en PB (50%). Confirma la convención vigente en el Manual PUGS."
  });
  add(["ruminahui", "sangolqui"], {
    n: "Rumiñahui", prov: "Pichincha", irm: "Informe de regulación / línea de fábrica",
    docs: [
      { t: "GAD Municipal de Rumiñahui", u: "https://www.ruminahui.gob.ec/", v: 1, a: "Sitio oficial.", p: "Punto de partida." },
      { t: "Ordenanza 004-2025 reformatoria del PDOT y PUGS", u: "https://www.ruminahui.gob.ec/wp-content/uploads/2026/01/004-2025-ORDENANZA-REFORMATORIA-DE-LA-ORDENANZA-DE-APROBACION-DEL-PLAN-DE-DESARROLLO-Y-ORDENAMIENTO-TERRITORIAL-Y-EL-PLAN-DE-USO-Y-GESTION-DEL-SUUELO.pdf", v: 1, a: "Reforma vigente del PDOT/PUGS.", p: "Zonificación actual." }
    ]
  });
  add(["cuenca"], {
    n: "Cuenca", prov: "Azuay", irm: "Informe predial / certificado de afectación y licencia urbanística",
    docs: [
      { t: "GAD Municipal de Cuenca", u: "https://www.cuenca.gob.ec/", v: 1, a: "Sitio oficial.", p: "Punto de partida." },
      { t: "Planes PDOT-PUGS 2022", u: "https://www.cuenca.gob.ec/content/pdot-pugs-2022", v: 1, a: "PDOT y PUGS vigentes (con reformas 2025 en debate).", p: "Fuente primaria de COS/CUS." },
      { t: "Informe predial en línea", u: "https://enlinea.cuenca.gob.ec/#/informe-predial", v: 1, a: "Datos del predio.", p: "Normas del lote." },
      { t: "Trámite: permiso de construcción menor en áreas históricas (gob.ec)", u: "https://www.gob.ec/gadm-cuenca/tramites/areas-historicas-permiso-construccion-menor-gad-cuenca", v: 1, a: "Centro Histórico (Patrimonio UNESCO).", p: "Restricciones patrimoniales." }
    ],
    nota: "Centro Histórico de Cuenca es Patrimonio Mundial: alturas, retiros y materiales los fija la normativa de áreas históricas además del PUGS."
  });
  add(["manta"], {
    n: "Manta", prov: "Manabí", irm: "Informe de regulación / línea de fábrica",
    docs: [
      { t: "GAD Municipal de Manta", u: "https://manta.gob.ec/", v: 1, a: "Sitio oficial.", p: "Punto de partida." },
      { t: "Ordenanza 033-2021 PDOT-PUGS", u: "https://manta.gob.ec/db/PDOT/pdot-pugs%202022/ordenanza/ORDENANZA%20033-2021%20PDOT-PUGS%20firmada.pdf", v: 1, a: "Aprobación del PDOT y PUGS.", p: "Fuente primaria." },
      { t: "PUGS Manta v3.0 (documento técnico)", u: "https://manta.gob.ec/db/PDOT/pdot-pugs%202022/ordenanza/PUGS%20Manta%20v3.0_WR.pdf", v: 1, a: "Zonificación y aprovechamiento.", p: "COS/CUS por polígono." },
      { t: "Ordenanza 042-2022 reformatoria PDyOT y PUGS", u: "https://manta.gob.ec/db/PDOT/pdot-pugs%202022/ordenanza/ORDENANZA%20042-2022%20REFORMATORIA%20AL%20PDYOT%20Y%20PUGS.pdf", v: 1, a: "Reforma.", p: "Verificar cambios." }
    ]
  });
  add(["portoviejo"], {
    n: "Portoviejo", prov: "Manabí", irm: "IRRUR — Informe de Regulación Urbana y Rural (en línea)",
    docs: [
      { t: "GAD Municipal de Portoviejo", u: "https://www.portoviejo.gob.ec/", v: 1, a: "Sitio oficial.", p: "Punto de partida." },
      { t: "Certificado/Informe IRRUR en línea", u: "https://online.portoviejo.gob.ec/Certificados/IRRUR.aspx", v: 1, a: "Informe de regulación del predio.", p: "COS/CUS/retiros del lote." },
      { t: "GeoPortal municipal", u: "http://sig.portoviejo.gob.ec:8080/SIGCorporativo/Visores/PantallaInicio/inicio.html", v: 1, a: "Mapas y catastro.", p: "Ubicar el predio." },
      { t: "Repositorio LOTAIP (ordenanzas)", u: "https://www.portoviejo.gob.ec/transparencia/transparencia", v: 1, a: "Ordenanzas y planes.", p: "PUGS vigente." }
    ]
  });
  add(["machala"], {
    n: "Machala", prov: "El Oro", irm: "Línea de fábrica / informe de regulación",
    docs: [
      { t: "GAD Municipal de Machala", u: "https://www.machala.gob.ec/", v: 1, a: "Sitio oficial.", p: "Punto de partida." },
      { t: "Reforma a la ordenanza que actualiza el PDOT y aprueba el PUGS (2026)", u: "https://www.machala.gob.ec/wp-content/uploads/2026/03/2.-REFORMA_ORDENANZA_ACTUALIZA_PDOT_APRUEBA_PUGS_MACHALA.pdf", v: 1, a: "Reforma vigente.", p: "Fuente primaria." },
      { t: "PUGS — Ajuste y complemento 2024", u: "https://www.machala.gob.ec/wp-content/uploads/2025/07/PUGS-M-AJUSTE-Y-COMPLEMENTO-2024.pdf", v: 1, a: "Normas urbanísticas ajustadas.", p: "COS/CUS por polígono." },
      { t: "PUGS Fase IV, Vol. I — Modelo de gestión", u: "https://www.machala.gob.ec/documentosGAD/PUGS_Definitivo/FaseIVVolIModelodeGestion.pdf", v: 1, a: "Instrumentos de gestión del suelo.", p: "Concesión onerosa, cargas." }
    ]
  });
  add(["loja"], {
    n: "Loja", prov: "Loja", irm: "Informe predial de regulaciones de uso de suelo",
    docs: [
      { t: "GAD Municipal de Loja", u: "https://www.loja.gob.ec/", v: 1, a: "Sitio oficial.", p: "Punto de partida." },
      { t: "Plan de Desarrollo y Ordenamiento Territorial (instrumentos de planificación)", u: "https://www.loja.gob.ec/contenido/plan-de-desarrollo-y-ordenamiento-territorial", v: 1, a: "PDOT/PUGS.", p: "Fuente primaria." },
      { t: "Avalúos y Catastros", u: "https://www.loja.gob.ec/category/departamentos/avaluos-y-catastros", v: 1, a: "Departamento de catastro.", p: "Datos del predio." }
    ]
  });
  add(["ambato"], {
    n: "Ambato", prov: "Tungurahua", irm: "IPRUS — Informe Predial de Regulaciones de Uso de Suelo",
    docs: [
      { t: "GAD Municipalidad de Ambato", u: "https://www.ambato.gob.ec/", v: 0, a: "Sitio oficial (no leído).", p: "Punto de partida." },
      { t: "Ordenanza reformatoria PDOT 2050 / PUGS 2033 (gob.ec, 2026)", u: "https://www.gob.ec/sites/default/files/regulations/2026-07/Documento_Ordenanza-reformatoria-ordenanza-que-actualiza-plan-desarrollo-ordenamiento-territorial-2050-plan-uso-gesti%C3%B3n-suelo-2033-Ambato.pdf", v: 1, a: "Reforma vigente del PUGS 2033.", p: "Fuente primaria." },
      { t: "Trámite: IPRUS (gob.ec)", u: "https://www.gob.ec/gadma/tramites/emision-informe-predial-regularizacion-uso-suelo-iprus", v: 1, a: "Informe con COS/CUS/retiros del predio.", p: "Confirmar valores." },
      { t: "Trámite: ICUS — compatibilidad de uso de suelo (gob.ec)", u: "https://www.gob.ec/gadma/tramites/emision-informe-compatibilidad-uso-suelo-icus", v: 1, a: "Compatibilidad del uso propuesto.", p: "Confirmar que la tipología es permitida." }
    ]
  });
  add(["riobamba"], {
    n: "Riobamba", prov: "Chimborazo", irm: "Informe de regulación / línea de fábrica",
    docs: [
      { t: "GAD Municipal de Riobamba", u: "https://gadmriobamba.gob.ec/", v: 1, a: "Sitio oficial (ordenanzas en Transparencia).", p: "Punto de partida." },
      S("PUGS Riobamba", "Riobamba Plan de Uso y Gestion del Suelo PUGS ordenanza site:gadmriobamba.gob.ec", "Zonificación.", "COS/CUS.")
    ]
  });
  add(["ibarra", "san miguel de ibarra"], {
    n: "Ibarra", prov: "Imbabura", irm: "ICUS — Informe de compatibilidad de uso de suelo",
    docs: [
      { t: "GAD Municipal de Ibarra", u: "https://www.ibarra.gob.ec/", v: 1, a: "Sitio oficial.", p: "Punto de partida." },
      { t: "PDyOT de Ibarra", u: "https://www.ibarra.gob.ec/site/plan-de-desarrollo-y-ordenamiento-territorial-pdyot/", v: 1, a: "Plan de desarrollo y ordenamiento.", p: "Zonificación." },
      { t: "Trámite: Informe de compatibilidad de uso de suelo (gob.ec)", u: "https://www.gob.ec/gadmc-ibarra/tramites/informe-compatibilidad-uso-suelo-nuevorenovacion", v: 1, a: "Compatibilidad del uso.", p: "Confirmar tipología." },
      { t: "Trámite: ICUS en áreas patrimoniales (gob.ec)", u: "https://www.gob.ec/gadmc-ibarra/tramites/informe-compatibilidad-uso-suelo-areas-patrimoniales-icusp", v: 1, a: "Centro histórico.", p: "Restricciones patrimoniales." }
    ]
  });
  add(["santo domingo", "santo domingo de los colorados", "santo domingo de los tsachilas"], {
    n: "Santo Domingo", prov: "Santo Domingo de los Tsáchilas", irm: "Línea de fábrica / informe de regulación",
    docs: [
      { t: "GAD Municipal de Santo Domingo", u: "https://www.santodomingo.gob.ec/", v: 0, a: "Sitio oficial (bloqueó la lectura automática).", p: "Punto de partida." },
      S("PUGS Santo Domingo", "Santo Domingo Tsachilas Plan de Uso y Gestion del Suelo PUGS ordenanza municipio", "Zonificación.", "COS/CUS.")
    ]
  });
  add(["esmeraldas"], {
    n: "Esmeraldas", prov: "Esmeraldas", irm: "Línea de fábrica",
    docs: [
      { t: "GAD Municipal de Esmeraldas", u: "https://esmeraldas.gob.ec/", v: 1, a: "Sitio oficial.", p: "Punto de partida." },
      { t: "Ordenanza de infraestructura verde (2022)", u: "https://web2.esmeraldas.gob.ec/ordenanzas/2022/marzo/ORDENANZADA-INFRAESTRUCTURA-VERDE-2022.pdf", v: 1, a: "Áreas verdes y permeables.", p: "Relacionado con el CAS." },
      S("PUGS Esmeraldas", "Esmeraldas canton Plan de Uso y Gestion del Suelo PUGS ordenanza", "Zonificación.", "COS/CUS.")
    ]
  });
  add(["latacunga"], {
    n: "Latacunga", prov: "Cotopaxi", irm: "CUCS — Certificado de uso y compatibilidad de suelo",
    docs: [
      { t: "GAD Municipal de Latacunga", u: "https://www.latacunga.gob.ec/", v: 1, a: "Sitio oficial.", p: "Punto de partida." },
      { t: "Trámite: CUCS (gob.ec)", u: "https://www.gob.ec/gadmcl/tramites/emision-certificado-uso-compatibilidad-suelo-cucs-gadm-canton-latacunga", v: 1, a: "Uso y compatibilidad del suelo.", p: "Confirmar tipología." },
      { t: "Trámite: Concesión onerosa de derechos (gob.ec)", u: "https://www.gob.ec/gadmcl/tramites/concesion-onerosa-derechos-gadm-canton-latacunga", v: 1, a: "Pagar por edificabilidad adicional.", p: "Si superas el CUS básico." },
      S("PUGS Latacunga", "Latacunga Plan de Uso y Gestion del Suelo PUGS ordenanza", "Zonificación.", "COS/CUS.")
    ]
  });
  add(["babahoyo"], {
    n: "Babahoyo", prov: "Los Ríos", irm: "Línea de fábrica",
    docs: [
      { t: "GAD Municipal de Babahoyo", u: "https://babahoyo.gob.ec/", v: 1, a: "Sitio oficial.", p: "Punto de partida." },
      { t: "Plan de Desarrollo", u: "https://babahoyo.gob.ec/plan_desarrollo", v: 1, a: "PDOT.", p: "Zonificación." },
      { t: "Ordenanzas", u: "https://babahoyo.gob.ec/ordenanzas", v: 1, a: "Ordenanzas vigentes.", p: "PUGS y edificación." },
      { t: "Guía de trámites presenciales", u: "https://babahoyo.gob.ec/guia_tramites", v: 1, a: "Requisitos.", p: "Línea de fábrica." }
    ]
  });
  add(["quevedo"], {
    n: "Quevedo", prov: "Los Ríos", irm: "Línea de fábrica",
    docs: [
      { t: "GAD Municipal de Quevedo", u: "https://quevedo.gob.ec/", v: 1, a: "Sitio oficial.", p: "Punto de partida." },
      { t: "PDOT 2019-2023", u: "https://quevedo.gob.ec/plan-desarrollo-y-ordenamiento-territorial-2019-2023/", v: 1, a: "Plan de desarrollo y ordenamiento.", p: "Zonificación." },
      { t: "Planos del valor del suelo 2024/2025", u: "https://quevedo.gob.ec/planos-del-valor-del-suelo/", v: 1, a: "Valor del suelo urbano.", p: "Contexto económico del lote." },
      S("PUGS Quevedo", "Quevedo Plan de Uso y Gestion del Suelo PUGS ordenanza", "Zonificación.", "COS/CUS.")
    ]
  });
  add(["tena"], {
    n: "Tena", prov: "Napo", irm: "Línea de fábrica",
    docs: [
      { t: "GAD Municipal de Tena", u: "https://tena.gob.ec/", v: 1, a: "Sitio oficial.", p: "Punto de partida." },
      { t: "Ordenanza 132-GADMT-2025 — Código Urbano", u: "https://tena.gob.ec/TRANSPARENCIA/CODIGO%20URBANO/Ordenanza%20N.%20132-GADMT-2025_codigo_urbano.pdf", v: 1, a: "Normas urbanísticas y de edificación.", p: "COS/CUS, retiros y alturas." }
    ]
  });
  add(["santa cruz", "puerto ayora", "galapagos santa cruz"], {
    n: "Santa Cruz (Puerto Ayora)", prov: "Galápagos", irm: "Línea de fábrica + régimen especial de Galápagos",
    docs: [
      { t: "GAD Municipal de Santa Cruz", u: "https://www.santacruz.gob.ec/", v: 0, a: "Sitio oficial (bloqueó la lectura automática).", p: "Punto de partida." },
      { t: "Ordenanza de uso y ocupación del suelo urbano de Puerto Ayora, Bellavista y Santa Rosa (gob.ec)", u: "https://www.gob.ec/regulaciones/ordenanza-uso-ocupacion-suelo-urbano-puerto-ayora-bellavista-santa-rosa-conformidad-plan-ordenamiento-territorial-canton-santa-cruz-categorias-ordenamiento-territorial-urbanos-rurales", v: 1, a: "Uso y ocupación del suelo urbano.", p: "COS/CUS y alturas." },
      { t: "PDOT Santa Cruz 2012 (Consejo de Gobierno de Galápagos)", u: "https://www.gobiernogalapagos.gob.ec/wp-content/uploads/downloads/2013/08/PDOT-Santa-Cruz-2012_2_primero.pdf", v: 1, a: "PDOT histórico.", p: "Contexto." },
      S("LOREG — Ley Orgánica de Régimen Especial de Galápagos", "Ley Organica de Regimen Especial de la Provincia de Galapagos LOREG texto", "Régimen especial: residencia, ambiente, construcción.", "Restricciones adicionales.")
    ],
    nota: "Galápagos tiene régimen especial (LOREG, Consejo de Gobierno, Parque Nacional): agua, energía, materiales importados y residuos están muy restringidos."
  });

  /* ───────────── CSS ───────────── */
  const CSS = `
.m-normas{container-type:inline-size;height:100%;overflow:auto;color:var(--ink);font-family:var(--f-b);background:
 radial-gradient(900px 400px at 85% -10%,rgba(var(--acc-rgb),.07),transparent 60%),transparent;padding:14px 14px 90px;box-sizing:border-box}
.m-normas *{box-sizing:border-box}
.m-normas-top{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:8px;margin-bottom:10px}
.m-normas-kpi{position:relative;border:1px solid var(--line2);background:var(--glass);padding:9px 10px 8px;border-radius:4px;min-width:0}
.m-normas-kpi::before,.m-normas-card::before,.m-normas-doc::before{content:"";position:absolute;left:-1px;top:-1px;width:10px;height:10px;border-left:2px solid var(--acc);border-top:2px solid var(--acc)}
.m-normas-kpi b{display:block;font-family:var(--f-m);font-size:17px;color:var(--acc);white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.m-normas-kpi small,.m-normas-lbl{font-family:var(--f-d);font-size:8.5px;letter-spacing:.16em;color:var(--muted);text-transform:uppercase}
.m-normas-kpi b.m-normas-kb{font-size:12.5px;line-height:1.35;white-space:normal;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical}
.m-normas-kpi.warn{border-color:var(--warn)} .m-normas-kpi.warn b{color:var(--warn)} .m-normas-kpi.ok b{color:var(--done)}
.m-normas-tabs{display:flex;gap:6px;margin:6px 0 12px;overflow-x:auto;scrollbar-width:none}
.m-normas-tab{flex:none;min-height:42px;padding:0 14px;border:1px solid var(--line2);background:rgba(var(--acc-rgb),.03);color:var(--muted);font-family:var(--f-d);font-size:9.5px;letter-spacing:.14em;cursor:pointer;border-radius:3px;display:flex;align-items:center;gap:8px}
.m-normas-tab[aria-selected=true]{color:var(--bg);background:var(--acc);border-color:var(--acc);box-shadow:0 0 18px rgba(var(--acc-rgb),.35)}
.m-normas-tab svg{width:16px;height:16px}
.m-normas-grid{display:grid;grid-template-columns:1fr;gap:12px}
@container (min-width:900px){.m-normas-grid{grid-template-columns:minmax(380px,1fr) minmax(420px,1.15fr)}}
.m-normas-card{position:relative;border:1px solid var(--line2);background:var(--glass);border-radius:4px;padding:12px}
.m-normas-h{display:flex;align-items:center;gap:8px;font-family:var(--f-d);font-size:10.5px;letter-spacing:.16em;margin:0 0 10px;text-transform:uppercase}
.m-normas-h svg{width:18px;height:18px;flex:none}
.m-normas-h .m-normas-sp{flex:1}
.m-normas-params{display:grid;grid-template-columns:1fr;gap:8px}
@container (min-width:560px){.m-normas-params{grid-template-columns:1fr 1fr}}
.m-normas-p{position:relative;border:1px solid var(--warn);border-radius:4px;padding:8px 9px;background:rgba(255,92,122,.04);transition:border-color .2s,background .2s}
.m-normas-p.ok{border-color:rgba(var(--done-rgb),.7);background:rgba(var(--done-rgb),.04)}
.m-normas-phead{display:flex;align-items:baseline;justify-content:space-between;gap:6px}
.m-normas-phead b{font-family:var(--f-d);font-size:9.5px;letter-spacing:.12em;font-weight:400}
.m-normas-pd{display:block;font-style:normal;font-size:11px;color:var(--muted);line-height:1.25;margin:1px 0 4px;min-height:14px}
.m-normas-prow{display:flex;align-items:center;gap:6px}
.m-normas-prow .m-normas-range{flex:1;min-width:0;margin:0}
.m-normas-val{font-family:var(--f-m);font-size:20px;color:var(--ink);white-space:nowrap}
.m-normas-val small{font-size:11px;color:var(--muted);margin-left:2px}
.m-normas-btn{min-width:42px;min-height:42px;border:1px solid var(--line2);background:rgba(var(--acc-rgb),.06);color:var(--acc);font-family:var(--f-m);font-size:18px;border-radius:3px;cursor:pointer;display:inline-flex;align-items:center;justify-content:center;gap:6px;padding:0 10px;touch-action:manipulation}
.m-normas-btn svg{width:16px;height:16px;flex:none}
.m-normas-btn:hover{background:rgba(var(--acc-rgb),.14)}
.m-normas-btn.txt{font-family:var(--f-d);font-size:9.5px;letter-spacing:.14em}
.m-normas-btn.go{background:var(--acc);color:var(--bg);border-color:var(--acc);box-shadow:0 0 20px rgba(var(--acc-rgb),.35)}
.m-normas-btn.okb{color:var(--done);border-color:rgba(var(--done-rgb),.5);background:rgba(var(--done-rgb),.06)}
.m-normas-btn.wb{color:var(--warn);border-color:var(--warn);background:rgba(255,92,122,.06)}
.m-normas-range{width:100%;margin:6px 0 2px;accent-color:var(--acc);height:28px}
.m-normas-st{display:flex;align-items:center;justify-content:space-between;gap:6px;margin-top:6px}
.m-normas-chip{font-family:var(--f-d);font-size:8px;letter-spacing:.14em;padding:3px 6px;border:1px solid currentColor;border-radius:2px;color:var(--warn);white-space:nowrap}
.m-normas-chip.ok{color:var(--done)} .m-normas-chip.ac{color:var(--acc)} .m-normas-chip.mu{color:var(--muted)}
.m-normas-cf{min-height:40px;border:1px dashed var(--warn);background:transparent;color:var(--warn);font-family:var(--f-d);font-size:8.5px;letter-spacing:.12em;padding:0 10px;border-radius:3px;cursor:pointer}
.m-normas-cf.ok{border:1px solid rgba(var(--done-rgb),.6);color:var(--done)}
.m-normas-uso{display:flex;flex-wrap:wrap;gap:6px;margin-top:6px}
.m-normas-uso button{min-height:40px;padding:0 10px;border:1px solid var(--line2);background:transparent;color:var(--muted);font-family:var(--f-b);font-size:12px;border-radius:3px;cursor:pointer}
.m-normas-uso button[aria-pressed=true]{color:var(--bg);background:var(--acc);border-color:var(--acc)}
.m-normas-in{width:100%;min-height:42px;border:1px solid var(--line2);background:rgba(0,0,0,.25);color:var(--ink);padding:0 10px;font-family:var(--f-m);font-size:12px;border-radius:3px}
.m-normas-def{font-size:11.5px;color:var(--muted);line-height:1.45;border-left:2px solid rgba(var(--acc-rgb),.5);padding:4px 0 4px 10px;margin:8px 0}
.m-normas-def b{color:var(--ink)}
.m-normas-calc{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:8px}
@container (min-width:560px){.m-normas-calc{grid-template-columns:repeat(4,minmax(0,1fr))}}
.m-normas-m{border:1px solid var(--line);padding:8px;border-radius:3px;background:rgba(var(--acc-rgb),.03);min-width:0}
.m-normas-m b{display:block;font-family:var(--f-m);font-size:16px;color:var(--acc)}
.m-normas-m i{font-style:normal;font-size:10.5px;color:var(--muted);display:block;line-height:1.3}
.m-normas-bar{height:6px;background:rgba(255,255,255,.06);margin-top:6px;border-radius:3px;overflow:hidden}
.m-normas-bar>span{display:block;height:100%;background:linear-gradient(90deg,var(--acc),rgba(var(--acc-rgb),.4));box-shadow:0 0 8px var(--acc)}
.m-normas-bar.w>span{background:var(--warn);box-shadow:0 0 8px var(--warn)}
.m-normas-pre{display:inline-block;font-family:var(--f-d);font-size:8px;letter-spacing:.16em;color:var(--acc);border:1px solid var(--acc);padding:3px 6px;border-radius:2px}
.m-normas-alert{font-size:11.5px;color:var(--warn);margin-top:8px;line-height:1.4}
.m-normas-svg{width:100%;display:block;touch-action:none;user-select:none;background:
 linear-gradient(rgba(var(--acc-rgb),.05) 1px,transparent 1px) 0 0/22px 22px,linear-gradient(90deg,rgba(var(--acc-rgb),.05) 1px,transparent 1px) 0 0/22px 22px,rgba(2,6,12,.55);border:1px solid var(--line);border-radius:3px}
.m-normas-svg text{font-family:var(--f-m);font-size:10px;fill:var(--muted)}
.m-normas-svg .tA{fill:var(--acc)} .m-normas-svg .tD{fill:var(--done)} .m-normas-svg .tW{fill:var(--warn)}
.m-normas-edge{cursor:pointer}
.m-normas-vtabs{display:flex;gap:6px;margin-bottom:8px}
.m-normas-hint{font-size:11px;color:var(--faint);margin-top:6px}
.m-normas-sec{margin:0 0 14px}
.m-normas-sh{display:flex;align-items:center;gap:10px;margin:4px 0 8px}
.m-normas-sh .num{font-family:var(--f-m);color:var(--acc);font-size:12px;border:1px solid var(--line2);padding:4px 7px;border-radius:2px}
.m-normas-sh h4{margin:0;font-family:var(--f-d);font-size:10.5px;letter-spacing:.14em;font-weight:400;text-transform:uppercase}
.m-normas-sh::after{content:"";flex:1;height:1px;background:linear-gradient(90deg,var(--line2),transparent)}
.m-normas-docs{display:grid;grid-template-columns:1fr;gap:8px}
@container (min-width:720px){.m-normas-docs{grid-template-columns:1fr 1fr}}
@container (min-width:1150px){.m-normas-docs{grid-template-columns:1fr 1fr 1fr}}
.m-normas-doc{position:relative;display:flex;flex-direction:column;gap:5px;border:1px solid var(--line2);background:var(--glass);border-radius:4px;padding:10px 10px 10px 12px;min-width:0}
.m-normas-doc.s{border-style:dashed}
.m-normas-doc a{color:var(--ink);text-decoration:none;font-weight:600;font-size:13px;line-height:1.3;min-height:40px;display:flex;align-items:flex-start;gap:6px;word-break:break-word}
.m-normas-doc a:hover{color:var(--acc)}
.m-normas-doc a svg{flex:none;width:14px;height:14px;margin-top:2px;color:var(--acc)}
.m-normas-doc p{margin:0;font-size:11.5px;color:var(--muted);line-height:1.4}
.m-normas-doc p b{color:var(--ink);font-weight:500}
.m-normas-doc .u{font-family:var(--f-m);font-size:9.5px;color:var(--faint);overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.m-normas-chk{display:flex;align-items:center;gap:8px;min-height:42px;cursor:pointer;font-family:var(--f-d);font-size:9px;letter-spacing:.14em;color:var(--muted);border-top:1px solid var(--line);margin-top:4px;padding-top:4px}
.m-normas-chk input{width:22px;height:22px;accent-color:var(--done)}
.m-normas-chk.on{color:var(--done)}
.m-normas-leg{display:flex;flex-wrap:wrap;gap:8px;align-items:center;font-size:11px;color:var(--muted);margin-bottom:10px}
.m-normas-ia{border:1px dashed var(--warn);border-radius:4px;padding:10px;margin-top:10px;background:rgba(255,92,122,.04)}
.m-normas-ia ul{margin:6px 0;padding-left:18px;font-size:12px;color:var(--muted)}
.m-normas-ia a{color:var(--acc)}
.m-normas-foot{position:sticky;bottom:-76px;margin:18px -14px -76px;padding:10px 14px;display:flex;gap:8px;justify-content:space-between;align-items:center;background:rgba(3,6,11,.93);-webkit-backdrop-filter:blur(8px);backdrop-filter:blur(8px);border-top:1px solid var(--line2);flex-wrap:nowrap}
.m-normas-spin{display:inline-block;width:14px;height:14px;border:2px solid rgba(var(--acc-rgb),.3);border-top-color:var(--acc);border-radius:50%;animation:m-normas-r 0.8s linear infinite}
@keyframes m-normas-r{to{transform:rotate(360deg)}}
.m-normas-sh2{display:none}
@container (max-width:520px){.m-normas-lg{display:none}.m-normas-sh2{display:inline}.m-normas-foot .m-normas-hint{display:none}.m-normas-foot{justify-content:flex-end}.m-normas-svg text{font-size:11px}.m-normas-top{grid-template-columns:repeat(2,minmax(0,1fr))}.m-normas-val{font-size:18px}.m-normas{padding:10px 10px 90px}.m-normas-foot{margin:18px -10px -76px}}
`;

  /* ───────────── ICONOS ───────────── */
  const I = {
    par: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M4 20V10M4 6V4M12 20v-6M12 10V4M20 20v-4M20 12V4"/><circle cx="4" cy="8" r="2"/><circle cx="12" cy="12" r="2"/><circle cx="20" cy="14" r="2"/></svg>',
    src: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M12 21s-7-6.2-7-11.5A7 7 0 0 1 19 9.5C19 14.8 12 21 12 21z"/><circle cx="12" cy="9.5" r="2.5"/></svg>',
    law: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M12 3v18M5 21h14M4 8h16M7 8l-3 7h6zM17 8l-3 7h6z"/></svg>',
    lnk: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 4h6v6M20 4l-9 9M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5"/></svg>',
    srch: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="6"/><path d="M20 20l-4.5-4.5"/></svg>',
    cube: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M12 2l9 5v10l-9 5-9-5V7z"/><path d="M12 12l9-5M12 12v10M12 12L3 7"/></svg>',
    ai: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M12 3l1.8 4.7L18.5 9.5l-4.7 1.8L12 16l-1.8-4.7L5.5 9.5l4.7-1.8z"/><path d="M19 15l.8 2.2L22 18l-2.2.8L19 21l-.8-2.2L16 18l2.2-.8z"/></svg>',
    dl: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M12 4v11M7 10l5 5 5-5M5 20h14"/></svg>'
  };

  /* ───────────── PARÁMETROS ───────────── */
  const PAR = [
    { k: "cos", n: "COS", d: "Coef. de ocupación del suelo (planta baja)", min: 0, max: 1, st: 0.05, u: "", f: 2 },
    { k: "cus", n: "CUS", d: "Coef. de utilización del suelo (total)", min: 0, max: 12, st: 0.1, u: "", f: 2 },
    { k: "cas", n: "CAS", d: "Coef. de área de suelo permeable / absorción", min: 0, max: 1, st: 0.05, u: "", f: 2 },
    { k: "retF", n: "RETIRO FRONTAL", d: "Desde la línea de fábrica", min: 0, max: 30, st: 0.5, u: "m", f: 1 },
    { k: "retL", n: "RETIROS LATERALES", d: "A cada lindero lateral", min: 0, max: 20, st: 0.5, u: "m", f: 1 },
    { k: "retP", n: "RETIRO POSTERIOR", d: "Al lindero de fondo", min: 0, max: 20, st: 0.5, u: "m", f: 1 },
    { k: "altura", n: "ALTURA MÁXIMA", d: "Metros sobre nivel de acera", min: 0, max: 200, st: 0.5, u: "m", f: 1 },
    { k: "pisos", n: "PISOS MÁXIMOS", d: "Número de niveles permitidos", min: 1, max: 60, st: 1, u: "", f: 0 },
    { k: "loteMin", n: "LOTE MÍNIMO", d: "Superficie mínima de lote", min: 0, max: 20000, st: 10, u: "m²", f: 0 },
    { k: "frenteMin", n: "FRENTE MÍNIMO", d: "Longitud mínima de frente", min: 0, max: 200, st: 1, u: "m", f: 0 }
  ];
  const USOS = ["Residencial", "Comercial", "Mixto", "Equipamiento", "Industrial", "Protección / no urbanizable"];
  const DEF = { cos: 0.6, cus: 2.4, cas: 0.2, retF: 5, retL: 3, retP: 3, altura: 12, pisos: 4, loteMin: 0, frenteMin: 0 };

  /* ───────────── GEOMETRÍA ───────────── */
  const areaS = P => { let a = 0; for (let i = 0; i < P.length; i++) { const p = P[i], q = P[(i + 1) % P.length]; a += p[0] * q[1] - q[0] * p[1]; } return a / 2; };
  const cent = P => { const a = areaS(P); if (Math.abs(a) < 1e-9) { let x = 0, y = 0; P.forEach(p => { x += p[0]; y += p[1]; }); return [x / P.length, y / P.length]; } let cx = 0, cy = 0; for (let i = 0; i < P.length; i++) { const p = P[i], q = P[(i + 1) % P.length], c = p[0] * q[1] - q[0] * p[1]; cx += (p[0] + q[0]) * c; cy += (p[1] + q[1]) * c; } return [cx / (6 * a), cy / (6 * a)]; };
  const len = (a, b) => Math.hypot(b[0] - a[0], b[1] - a[1]);
  function cleanPoly(P) {
    if (!Array.isArray(P)) return null;
    let Q = P.filter(p => Array.isArray(p) && isFinite(p[0]) && isFinite(p[1])).map(p => [+p[0], +p[1]]);
    if (Q.length > 2 && len(Q[0], Q[Q.length - 1]) < 1e-6) Q.pop();
    Q = Q.filter((p, i) => len(p, Q[(i + 1) % Q.length]) > 1e-6);
    return Q.length >= 3 && Math.abs(areaS(Q)) > 1 ? Q : null;
  }
  /* Offset interno por lado: ds[i] = retiro del lado i (P[i]→P[i+1]). Devuelve polígono o null si colapsa. */
  function offsetPoly(P, ds) {
    const n = P.length, ccw = areaS(P) > 0, L = [];
    for (let i = 0; i < n; i++) {
      const a = P[i], b = P[(i + 1) % n], l = len(a, b), dx = (b[0] - a[0]) / l, dy = (b[1] - a[1]) / l;
      const nx = ccw ? -dy : dy, ny = ccw ? dx : -dx, d = ds[i] || 0;
      L.push({ p: [a[0] + nx * d, a[1] + ny * d], d: [dx, dy] });
    }
    const R = [];
    for (let i = 0; i < n; i++) {
      const A = L[(i - 1 + n) % n], B = L[i], den = A.d[0] * B.d[1] - A.d[1] * B.d[0];
      if (Math.abs(den) < 1e-9) { R.push(B.p.slice()); continue; }
      const t = ((B.p[0] - A.p[0]) * B.d[1] - (B.p[1] - A.p[1]) * B.d[0]) / den;
      R.push([A.p[0] + A.d[0] * t, A.p[1] + A.d[1] * t]);
    }
    for (let i = 0; i < n; i++) {
      const a = R[i], b = R[(i + 1) % n];
      if ((b[0] - a[0]) * L[i].d[0] + (b[1] - a[1]) * L[i].d[1] <= 0.01) return null;
    }
    const ar = areaS(R);
    if ((ar > 0) !== ccw || Math.abs(ar) < 1) return null;
    return R;
  }
  const scalePoly = (P, s, c) => P.map(p => [c[0] + (p[0] - c[0]) * s, c[1] + (p[1] - c[1]) * s]);

  /* ───────────── UTIL ───────────── */
  const fmt = (v, f) => (v == null || !isFinite(v)) ? "—" : Number(v).toLocaleString("es-EC", { minimumFractionDigits: f, maximumFractionDigits: f });
  const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
  let UI = { tab: "par", view: "axo", theta: -0.75, tilt: 0.62 };

  DION_MOD[K] = {
    titulo: "Contexto de normas del terreno",
    sub: "COS · CUS · CAS · retiros · alturas",
    render(el, ctx) {
      if (!document.getElementById("mod-" + K + "-css")) {
        const st = document.createElement("style"); st.id = "mod-" + K + "-css"; st.textContent = CSS; document.head.appendChild(st);
      }
      const esc = ctx.esc || (s => String(s == null ? "" : s).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c])));
      const P = ctx.P || {}, LOC = P.loc || {};
      const MS = Object.assign({ certs: {}, front: 0 }, ctx.get(K) || {});
      if (MS.tab) UI.tab = MS.tab;
      const N0 = P.norm || {};
      const V = {}; PAR.forEach(p => V[p.k] = (N0[p.k] != null && isFinite(+N0[p.k])) ? +N0[p.k] : DEF[p.k]);
      V.uso = N0.uso || ""; V.fuente = N0.fuente || "";
      const VER = Object.assign({}, N0.verificado || {});
      const isECU = (P.iso || "ECU") === "ECU";
      const cKey = nrm(LOC.canton), CAN = isECU ? (cKey ? (C[cKey] || null) : (C[nrm(LOC.ciudad)] || C[nrm(LOC.parroquia)] || null)) : null;
      const cat = ctx.tipo && ctx.tipo.cat ? ctx.tipo.cat.c : "";
      const tipoN = ctx.tipo ? ctx.tipo.n : (P.tipo || "proyecto");

      let poly = cleanPoly(P.terreno && P.terreno.local);
      const A = ctx.area > 0 ? ctx.area : (poly ? Math.abs(areaS(poly)) : 0);
      if (!poly && A > 0) { const s = Math.sqrt(A) / 2; poly = [[-s, -s], [s, -s], [s, s], [-s, s]]; }
      const realPoly = !!cleanPoly(P.terreno && P.terreno.local);
      if (poly && areaS(poly) < 0) poly = poly.slice().reverse();
      if (poly) { const c = cent(poly); poly = poly.map(p => [p[0] - c[0], p[1] - c[1]]); }
      let front = poly ? clamp(MS.front | 0, 0, poly.length - 1) : 0;

      el.innerHTML = "";
      const root = document.createElement("div"); root.className = "m-" + K; el.appendChild(root);

      /* save */
      let tP = 0, tM = 0, pendP = false, pendM = false;
      const doSaveP = () => { pendP = false;
        const o = {}; PAR.forEach(p => o[p.k] = V[p.k]); o.uso = V.uso; o.fuente = V.fuente; o.verificado = Object.assign({}, VER);
        o.cosLabel = "COS PB"; o.cusLabel = "CUS total"; o.casDef = "suelo permeable mínimo / área del lote";
        o.canton = LOC.canton || ""; { const d = new Date(); o.fecha = d.getFullYear() + "-" + String(d.getMonth() + 1).padStart(2, "0") + "-" + String(d.getDate()).padStart(2, "0"); }
        try { const r = ctx.setP({ norm: Object.assign({}, P.norm || {}, o) }); if (r && r.catch) r.catch(() => {}); } catch (e) {}
      };
      const doSaveM = () => { pendM = false; try { const r = ctx.set(K, Object.assign({}, MS, { tab: UI.tab, front })); if (r && r.catch) r.catch(() => {}); } catch (e) {} };
      const saveP = () => { pendP = true; clearTimeout(tP); tP = setTimeout(doSaveP, 600); };
      const saveM = () => { pendM = true; clearTimeout(tM); tM = setTimeout(doSaveM, 600); };

      const allOk = () => PAR.every(p => VER[p.k]) && VER.uso;
      const nOk = () => PAR.filter(p => VER[p.k]).length + (VER.uso ? 1 : 0);

      /* ───── top HUD ───── */
      const top = document.createElement("div"); top.className = "m-normas-top"; root.appendChild(top);
      const drawTop = () => {
        const ok = nOk(), tot = PAR.length + 1;
        top.innerHTML = `
          <div class="m-normas-kpi"><small>Cantón detectado</small><b title="${esc(LOC.canton || "")}">${esc(LOC.canton || "—")}</b><small>${esc(isECU ? (CAN ? "EN BASE DION" : "SIN FICHA · BÚSQUEDAS") : (LOC.pais || P.iso || "INTERNACIONAL"))}</small></div>
          <div class="m-normas-kpi"><small>Área del terreno</small><b>${fmt(A, 0)} m²</b><small>${realPoly ? "POLÍGONO DIBUJADO" : (A ? "SIN POLÍGONO · CUADRADO EQUIV." : "SIN TERRENO")}</small></div>
          <div class="m-normas-kpi ${ok === tot ? "ok" : "warn"}"><small>Parámetros confirmados</small><b>${ok}/${tot}</b><small>${ok === tot ? "CONFIRMADO CON IRM" : "POR VERIFICAR"}</small></div>
          <div class="m-normas-kpi"><small>Documento base</small><b class="m-normas-kb" title="${esc(CAN ? CAN.irm : "IRM / línea de fábrica")}">${esc(CAN ? CAN.irm : (isECU ? "IRM / línea de fábrica" : "Zoning code"))}</b><small>VERIF. ${FECHA}</small></div>`;
      };
      drawTop();

      /* ───── tabs ───── */
      const tabs = document.createElement("div"); tabs.className = "m-normas-tabs"; tabs.setAttribute("role", "tablist"); root.appendChild(tabs);
      const TABS = [["par", "Parámetros", "Parámetros + volumen", I.par], ["src", "Fuentes", "Fuentes del sitio", I.src], ["law", "Marco 2.4", "Marco legal 2.4", I.law]];
      const body = document.createElement("div"); root.appendChild(body);
      const drawTabs = () => {
        tabs.innerHTML = TABS.map(t => `<button class="m-normas-tab" role="tab" data-t="${t[0]}" aria-selected="${UI.tab === t[0]}">${t[3]}<span class="m-normas-sh2">${t[1].toUpperCase()}</span><span class="m-normas-lg">${t[2].toUpperCase()}</span></button>`).join("");
      };
      tabs.addEventListener("click", e => { const b = e.target.closest("[data-t]"); if (!b) return; UI.tab = b.dataset.t; saveM(); drawTabs(); drawBody(); });

      /* ───── doc card ───── */
      const badge = v => v === 1 ? `<span class="m-normas-chip ok">VERIFICADO ${FECHA}</span>` : v === 0 ? `<span class="m-normas-chip mu">OFICIAL · ABRIR Y CONFIRMAR</span>` : `<span class="m-normas-chip ac">BÚSQUEDA</span>`;
      const docCard = (d, extra) => `<div class="m-normas-doc ${d.v === "s" ? "s" : ""}">
          <a href="${esc(d.u)}" target="_blank" rel="noopener">${d.v === "s" ? I.srch : I.lnk}<span>${esc(d.t)}</span></a>
          <div>${badge(d.v)}</div>
          ${d.a ? `<p><b>Clave:</b> ${esc(d.a)}</p>` : ""}
          ${d.p ? `<p><b>En tu proyecto:</b> ${esc(d.p)}</p>` : ""}
          <div class="u">${esc(d.u.replace(/^https?:\/\//, ""))}</div>${extra || ""}</div>`;

      /* fallback / internacional */
      const cantonName = LOC.canton || LOC.ciudad || "";
      const prov = LOC.provincia || "";
      const fallbackEC = () => [
        S(`GAD Municipal de ${cantonName} (sitio oficial)`, `GAD Municipal ${cantonName} ${prov} sitio oficial gob.ec`, "Sitio del municipio.", "Punto de partida."),
        S(`PUGS de ${cantonName}`, `${cantonName} ${prov} "Plan de Uso y Gestión del Suelo" PUGS ordenanza`, "Plan de Uso y Gestión del Suelo vigente.", "COS/CUS, alturas y retiros por polígono."),
        S(`PDOT de ${cantonName}`, `${cantonName} ${prov} Plan de Desarrollo y Ordenamiento Territorial PDOT`, "Plan de desarrollo y ordenamiento.", "Visión cantonal y alineación al PND."),
        S(`Ordenanza de edificaciones de ${cantonName}`, `${cantonName} ordenanza de edificaciones y construcciones normas de arquitectura`, "Normas de arquitectura y urbanismo.", "Alturas de entrepiso, estacionamientos, voladizos."),
        S(`Línea de fábrica / IRM en ${cantonName}`, `${cantonName} línea de fábrica informe de regulación municipal requisitos gob.ec`, "Certificado con COS/CUS/retiros del predio.", "Documento para confirmar los parámetros."),
        S(`Trámites del GAD ${cantonName} en gob.ec`, `site:gob.ec ${cantonName} uso de suelo línea de fábrica trámite`, "Fichas oficiales de trámites.", "Requisitos y costos.")
      ];
      const city = LOC.ciudad || LOC.canton || "";
      const fallbackINT = () => [
        S(`Zoning code — ${city}`, `${city} ${LOC.pais || ""} zoning code ordinance official`, "Código de zonificación oficial.", "Usos, alturas, retiros."),
        S(`FAR / Floor Area Ratio — ${city}`, `${city} floor area ratio FAR zoning district`, "Equivale al CUS.", "Edificabilidad total."),
        S(`Lot coverage — ${city}`, `${city} maximum lot coverage zoning`, "Equivale al COS.", "Huella máxima."),
        S(`Setbacks & height limits — ${city}`, `${city} zoning setbacks height limit`, "Retiros y altura.", "Envolvente."),
        S(`Pervious / green area ratio — ${city}`, `${city} pervious surface ratio OR green area factor zoning`, "Equivale al CAS.", "Suelo permeable."),
        S(`Zoning map / GIS — ${city}`, `${city} zoning map GIS parcel viewer`, "Visor de parcelas.", "Ubicar la zona del lote.")
      ];
      const sitioDocs = () => isECU ? (CAN ? CAN.docs : fallbackEC()) : fallbackINT();
      const temaDocs = () => {
        const base = TEMA[cat] || [];
        const gen = S(`Normativa de diseño para ${tipoN} en ${isECU ? "Ecuador" : (LOC.pais || "el país")}`, `normativa diseño ${tipoN} ${isECU ? "Ecuador" : (LOC.pais || "")} norma técnica arquitectura`, "Norma técnica sectorial de la tipología.", "Áreas mínimas y relaciones funcionales del programa.");
        const intl = cat === "TRA" ? [] : [];
        return base.concat([gen], intl);
      };

      /* ───── BODY ───── */
      let vizBox = null, calcBox = null, paramsBox = null;
      function drawBody() {
        body.innerHTML = "";
        if (UI.tab === "par") drawPar();
        else if (UI.tab === "src") drawSrc();
        else drawLaw();
      }

      /* === PARÁMETROS === */
      function drawPar() {
        const g = document.createElement("div"); g.className = "m-normas-grid"; body.appendChild(g);
        const left = document.createElement("div"); left.className = "m-normas-card"; g.appendChild(left);
        left.innerHTML = `<div class="m-normas-h">${I.par}<span>Parámetros del lote</span><span class="m-normas-sp"></span><span class="m-normas-pre">PREDISEÑO</span></div>
          <div class="m-normas-def"><b>Fuente legal:</b> ${esc(CAN ? CAN.irm : (isECU ? "IRM / línea de fábrica del GAD" : "Zoning code local"))} — PUGS del cantón (LOOTUGS art. 27). Todos los valores inician <span style="color:var(--warn)">POR VERIFICAR</span> hasta que los confirmes con el documento municipal del predio.</div>
          <div class="m-normas-params"></div>
          <div class="m-normas-def"><b>CAS</b> = área de suelo permeable (absorbente, sin losa ni pavimento) ÷ área del lote. No todos los GAD lo usan con ese nombre: aparece como «área permeable mínima», «% de área verde», «COS libre» o no se exige. En otros países: <i>pervious surface ratio</i> o factor de biotopo (Berlín, BAF). Anota en «Fuente» cómo lo llama tu IRM.</div>
          <div class="m-normas-lbl" style="margin-top:6px">USO DE SUELO PRINCIPAL</div>
          <div class="m-normas-uso"></div>
          <div class="m-normas-st" style="margin-top:6px"><span class="m-normas-chip" data-usochip></span><button class="m-normas-cf" data-cfu>CONFIRMAR USO</button></div>
          <div class="m-normas-lbl" style="margin-top:10px">FUENTE (Nº de IRM / línea de fábrica, fecha)</div>
          <input class="m-normas-in" data-fuente maxlength="140" placeholder="Ej.: Línea de fábrica Nº 1234-2026, 10/10/2026">
          <div style="display:flex;gap:8px;flex-wrap:wrap;margin-top:10px">
            <button class="m-normas-btn txt okb" data-allok>✓ CONFIRMAR CON EL IRM</button>
            <button class="m-normas-btn txt wb" data-reset>MARCAR TODO POR VERIFICAR</button>
            ${CAN && CAN.ref ? `<button class="m-normas-btn txt" data-ref>CARGAR REFERENCIA ${esc(CAN.n.toUpperCase())}</button>` : ""}
            <button class="m-normas-btn txt" data-ia hidden>${I.ai}BUSCAR CON IA</button>
          </div>
          <div data-iabox></div>`;
        paramsBox = left.querySelector(".m-normas-params");
        paramsBox.innerHTML = PAR.map(p => `<div class="m-normas-p" data-p="${p.k}">
            <div class="m-normas-phead"><b>${p.n}</b><span class="m-normas-val" data-v="${p.k}"></span></div>
            <i class="m-normas-pd">${p.d}</i>
            <div class="m-normas-prow">
              <button class="m-normas-btn" data-dec="${p.k}" aria-label="Disminuir ${p.n}">−</button>
              <input type="range" class="m-normas-range" data-r="${p.k}" min="${p.min}" max="${p.max}" step="${p.st}" aria-label="${p.n}">
              <button class="m-normas-btn" data-inc="${p.k}" aria-label="Aumentar ${p.n}">+</button>
            </div>
            <div class="m-normas-st"><span class="m-normas-chip" data-c="${p.k}"></span><button class="m-normas-cf" data-cf="${p.k}"></button></div>
          </div>`).join("");
        const usoBox = left.querySelector(".m-normas-uso");
        const drawUso = () => {
          usoBox.innerHTML = USOS.map(u => `<button aria-pressed="${V.uso === u}" data-uso="${esc(u)}">${esc(u)}</button>`).join("");
          const ch = left.querySelector("[data-usochip]"), cf = left.querySelector("[data-cfu]");
          ch.className = "m-normas-chip" + (VER.uso ? " ok" : ""); ch.textContent = VER.uso ? "CONFIRMADO" : "POR VERIFICAR";
          cf.className = "m-normas-cf" + (VER.uso ? " ok" : ""); cf.textContent = VER.uso ? "✓ CONFIRMADO" : "CONFIRMAR USO";
        };
        drawUso();
        const fi = left.querySelector("[data-fuente]"); fi.value = V.fuente;
        fi.addEventListener("input", () => { V.fuente = fi.value; saveP(); });

        const syncP = k => {
          const p = PAR.find(x => x.k === k), box = paramsBox.querySelector(`[data-p="${k}"]`);
          box.classList.toggle("ok", !!VER[k]);
          box.querySelector(`[data-v="${k}"]`).innerHTML = fmt(V[k], p.f) + (p.u ? `<small>${p.u}</small>` : "");
          box.querySelector(`[data-r="${k}"]`).value = V[k];
          const ch = box.querySelector(`[data-c="${k}"]`); ch.className = "m-normas-chip" + (VER[k] ? " ok" : ""); ch.textContent = VER[k] ? "IRM ✓" : "POR VERIFICAR";
          const cf = box.querySelector(`[data-cf="${k}"]`); cf.className = "m-normas-cf" + (VER[k] ? " ok" : ""); cf.textContent = VER[k] ? "✓ CONFIRMADO" : "CONFIRMAR";
        };
        PAR.forEach(p => syncP(p.k));
        const setV = (k, v, keepVer) => {
          const p = PAR.find(x => x.k === k); v = clamp(Math.round(v / p.st) * p.st, p.min, p.max); v = +v.toFixed(4);
          if (v === V[k]) return; V[k] = v; if (!keepVer) VER[k] = false; syncP(k); refresh(); saveP();
        };
        left.addEventListener("click", e => {
          const t = e.target.closest("button"); if (!t) return;
          if (t.dataset.dec) { const p = PAR.find(x => x.k === t.dataset.dec); setV(p.k, V[p.k] - p.st); }
          else if (t.dataset.inc) { const p = PAR.find(x => x.k === t.dataset.inc); setV(p.k, V[p.k] + p.st); }
          else if (t.dataset.cf) { const k = t.dataset.cf; VER[k] = !VER[k]; syncP(k); drawTop(); saveP(); }
          else if (t.dataset.uso != null) { V.uso = t.dataset.uso; VER.uso = false; drawUso(); drawTop(); saveP(); }
          else if (t.hasAttribute("data-cfu")) { if (!V.uso) { ctx.toast && ctx.toast("Elige primero el uso de suelo"); return; } VER.uso = !VER.uso; drawUso(); drawTop(); saveP(); }
          else if (t.hasAttribute("data-allok")) { PAR.forEach(p => VER[p.k] = true); if (V.uso) VER.uso = true; PAR.forEach(p => syncP(p.k)); drawUso(); drawTop(); saveP(); ctx.toast && ctx.toast(V.uso ? "Parámetros confirmados con el IRM" : "Confirmados; falta elegir el uso de suelo"); }
          else if (t.hasAttribute("data-reset")) { Object.keys(VER).forEach(k => VER[k] = false); PAR.forEach(p => syncP(p.k)); drawUso(); drawTop(); saveP(); }
          else if (t.hasAttribute("data-ref")) { const r = CAN.ref; PAR.forEach(p => { if (r[p.k] != null) { V[p.k] = r[p.k]; VER[p.k] = false; syncP(p.k); } }); if (r.uso) { V.uso = r.uso; VER.uso = false; drawUso(); } refresh(); saveP(); ctx.toast && ctx.toast("Referencia cargada — POR VERIFICAR con tu IRM"); }
          else if (t.hasAttribute("data-ia")) runIA(t);
        });
        paramsBox.addEventListener("input", e => { const r = e.target.closest("[data-r]"); if (r) setV(r.dataset.r, +r.value); });

        /* IA */
        const iaBtn = left.querySelector("[data-ia]"), iaBox = left.querySelector("[data-iabox]");
        Promise.resolve().then(() => ctx.sample && ctx.sample()).then(s => { if (s && iaBtn.isConnected) iaBtn.hidden = false; }).catch(() => {});
        const drawIA = () => {
          const r = MS.ia; if (!r) { iaBox.innerHTML = ""; return; }
          const vals = PAR.filter(p => r[p.k] != null && isFinite(+r[p.k])).map(p => `${p.n}: <b style="color:var(--ink)">${fmt(+r[p.k], p.f)}${p.u ? " " + p.u : ""}</b>`).join(" · ");
          const fu = (r.fuentes || []).filter(f => f && f.u && /^https?:\/\//.test(f.u)).slice(0, 8);
          iaBox.innerHTML = `<div class="m-normas-ia"><div class="m-normas-h" style="margin-bottom:6px">${I.ai}<span>Sugerencia IA</span><span class="m-normas-sp"></span><span class="m-normas-chip">POR VERIFICAR</span></div>
            <div style="font-size:12px;color:var(--muted);line-height:1.5">${vals || "Sin valores numéricos."}${r.uso ? `<br>Uso: <b style="color:var(--ink)">${esc(r.uso)}</b>` : ""}${r.zona ? ` · Zona: <b style="color:var(--ink)">${esc(r.zona)}</b>` : ""}</div>
            ${r.nota ? `<div style="font-size:11.5px;color:var(--muted);margin-top:6px">${esc(r.nota)}</div>` : ""}
            ${fu.length ? `<ul>${fu.map(f => `<li><a href="${esc(f.u)}" target="_blank" rel="noopener">${esc(f.t || f.u)}</a> <span class="m-normas-chip">SIN VERIFICAR</span></li>`).join("")}</ul>` : ""}
            <div style="display:flex;gap:8px;flex-wrap:wrap"><button class="m-normas-btn txt" data-iause>USAR COMO POR VERIFICAR</button><button class="m-normas-btn txt wb" data-iadel>DESCARTAR</button></div></div>`;
          iaBox.querySelector("[data-iause]").onclick = () => { PAR.forEach(p => { if (r[p.k] != null && isFinite(+r[p.k])) { V[p.k] = clamp(+r[p.k], p.min, p.max); VER[p.k] = false; syncP(p.k); } }); if (r.uso && USOS.includes(r.uso)) { V.uso = r.uso; VER.uso = false; drawUso(); } refresh(); saveP(); drawTop(); };
          iaBox.querySelector("[data-iadel]").onclick = () => { delete MS.ia; saveM(); drawIA(); };
        };
        drawIA();
        async function runIA(btn) {
          let s = null; try { s = await ctx.sample(); } catch (e) {}
          if (!s) { btn.hidden = true; return; }
          btn.disabled = true; btn.innerHTML = `<span class="m-normas-spin"></span>BUSCANDO…`;
          const prompt = `Eres un asesor de normativa urbanística. Proyecto: "${P.nombre || tipoN}" (tipología: ${tipoN}). Ubicación: país ${LOC.pais || P.iso || ""}, provincia ${prov}, cantón ${LOC.canton || ""}, ciudad ${LOC.ciudad || ""}, parroquia ${LOC.parroquia || ""}, coordenadas ${LOC.lat || ""}, ${LOC.lon || ""}. Área del lote ${Math.round(A)} m².
Devuelve SOLO JSON con los valores PROBABLES según el PUGS/ordenanza vigente de ese cantón para un lote en esa ubicación y uso compatible: {"zona":"código o nombre de zona/polígono","uso":"Residencial|Comercial|Mixto|Equipamiento|Industrial|Protección / no urbanizable","cos":0-1,"cus":número,"cas":0-1 o null,"retF":m,"retL":m,"retP":m,"altura":m,"pisos":entero,"loteMin":m2,"frenteMin":m,"fuentes":[{"t":"título del documento oficial","u":"https://..."}],"nota":"advertencias y cómo confirmarlo (IRM/línea de fábrica)"}. Si no sabes un valor usa null. No inventes URLs: si no conoces una URL oficial exacta, omítela.`;
          try {
            const r = await s.json(prompt, { modelTier: "default" });
            if (r && typeof r === "object") { MS.ia = r; saveM(); drawIA(); }
            else ctx.toast && ctx.toast("La IA no devolvió datos útiles");
          } catch (e) { ctx.toast && ctx.toast("No se pudo consultar la IA"); }
          if (btn.isConnected) { btn.disabled = false; btn.innerHTML = `${I.ai}BUSCAR CON IA`; }
        }

        /* derecha: cálculos + vista */
        const right = document.createElement("div"); right.style.display = "grid"; right.style.gap = "12px"; right.style.alignContent = "start"; g.appendChild(right);
        const cc = document.createElement("div"); cc.className = "m-normas-card"; right.appendChild(cc);
        cc.innerHTML = `<div class="m-normas-h">${I.cube}<span>Aprovechamiento</span><span class="m-normas-sp"></span><span class="m-normas-pre">PREDISEÑO · PUGS/IRM</span></div><div data-calc></div>`;
        calcBox = cc.querySelector("[data-calc]");
        const vc = document.createElement("div"); vc.className = "m-normas-card"; right.appendChild(vc);
        vc.innerHTML = `<div class="m-normas-h">${I.cube}<span>Envolvente máxima</span><span class="m-normas-sp"></span></div>
          <div class="m-normas-vtabs"><button class="m-normas-btn txt" data-vw="axo">AXONOMETRÍA 3D</button><button class="m-normas-btn txt" data-vw="plan">PLANTA</button></div>
          <div data-viz></div><div class="m-normas-hint" data-hint></div>`;
        vizBox = vc.querySelector("[data-viz]");
        const drawVT = () => { vc.querySelectorAll("[data-vw]").forEach(b => b.classList.toggle("go", b.dataset.vw === UI.view)); vc.querySelector("[data-hint]").textContent = UI.view === "axo" ? "Arrastra con el dedo para girar e inclinar. Fantasma = envolvente (retiros × altura máx.); sólido = volumen teórico (huella COS × pisos CUS/COS)." : "Toca un lado del terreno para marcarlo como FRENTE (retiro frontal). El lado opuesto recibe el retiro posterior."; };
        vc.addEventListener("click", e => { const b = e.target.closest("[data-vw]"); if (b) { UI.view = b.dataset.vw; drawVT(); drawViz(); } });
        drawVT();
        refresh();
      }

      /* ── cálculos ── */
      function geom() {
        if (!poly) return null;
        const n = poly.length, fn = (() => { const a = poly[front], b = poly[(front + 1) % n], l = len(a, b); return [(b[1] - a[1]) / l, -(b[0] - a[0]) / l]; })();
        let rear = -1, best = 2;
        for (let i = 0; i < n; i++) { if (i === front) continue; const a = poly[i], b = poly[(i + 1) % n], l = len(a, b), o = [(b[1] - a[1]) / l, -(b[0] - a[0]) / l], d = o[0] * fn[0] + o[1] * fn[1]; if (d < best) { best = d; rear = i; } }
        if (best > -0.5) rear = -1;
        const ds = poly.map((_, i) => i === front ? V.retF : i === rear ? V.retP : V.retL);
        const env = offsetPoly(poly, ds);
        const envA = env ? Math.abs(areaS(env)) : 0;
        const cosA = V.cos * A;
        const hu = env ? (cosA < envA ? scalePoly(env, Math.sqrt(cosA / envA), cent(env)) : env) : null;
        const huA = hu ? Math.abs(areaS(hu)) : 0;
        return { env, envA, hu, huA, rear, ds };
      }
      function refresh() {
        drawTop();
        if (!calcBox) return;
        const gm = geom();
        const huellaN = V.cos * A, total = V.cus * A, perm = V.cas * A;
        const pisosRes = V.cos > 0 ? V.cus / V.cos : 0;
        const huellaReal = gm ? Math.min(huellaN, gm.envA) : huellaN;
        const pisosReal = huellaReal > 0 ? total / huellaReal : 0;
        const hPiso = V.pisos > 0 && V.altura > 0 ? V.altura / V.pisos : 0;
        const libre = A - huellaReal;
        const W = [];
        if (pisosRes > V.pisos + 1e-6) W.push(`CUS/COS = ${fmt(pisosRes, 1)} pisos supera los ${V.pisos} pisos permitidos: el CUS real queda limitado a ${fmt(V.cos * V.pisos, 2)} (concesión onerosa de derechos si el PUGS lo permite).`);
        if (gm && !gm.env && A > 0) W.push("Los retiros consumen todo el terreno: revisa valores o el lado marcado como frente.");
        if (gm && gm.env && huellaN > gm.envA + 0.5) W.push(`La huella COS (${fmt(huellaN, 0)} m²) no cabe dentro de los retiros (${fmt(gm.envA, 0)} m²): manda el área retirada.`);
        if (perm > libre + 0.5) W.push(`El área permeable mínima (${fmt(perm, 0)} m²) supera el suelo libre (${fmt(libre, 0)} m²).`);
        if (hPiso && hPiso < 2.7) W.push(`Altura/pisos = ${fmt(hPiso, 2)} m por piso: menor a una altura de entrepiso habitual (≥ 2,7–3,0 m).`);
        if (V.loteMin && A && A < V.loteMin) W.push(`El terreno (${fmt(A, 0)} m²) es menor que el lote mínimo (${fmt(V.loteMin, 0)} m²).`);
        if (!A) W.push("No hay área de terreno: dibuja el polígono del sitio en la estación de terreno.");
        const bar = (v, max, w) => `<div class="m-normas-bar ${w ? "w" : ""}"><span style="width:${clamp(max > 0 ? v / max * 100 : 0, 0, 100)}%"></span></div>`;
        calcBox.innerHTML = `<div class="m-normas-calc">
          <div class="m-normas-m"><i>Huella máxima = COS × A</i><b>${fmt(huellaN, 0)} m²</b>${bar(huellaN, A)}<i>${fmt(V.cos * 100, 0)}% del lote</i></div>
          <div class="m-normas-m"><i>Área construible = CUS × A</i><b>${fmt(total, 0)} m²</b>${bar(V.cus, Math.max(V.cus, V.cos * V.pisos, 1))}<i>bruta, todos los pisos</i></div>
          <div class="m-normas-m"><i>Permeable mín. = CAS × A</i><b>${fmt(perm, 0)} m²</b>${bar(perm, A, perm > libre)}<i>suelo libre: ${fmt(libre, 0)} m²</i></div>
          <div class="m-normas-m"><i>Pisos resultantes = CUS / COS</i><b>${fmt(pisosRes, 1)}</b>${bar(pisosRes, Math.max(V.pisos, pisosRes), pisosRes > V.pisos)}<i>máx. norma: ${V.pisos} · ${fmt(V.altura, 1)} m</i></div>
          <div class="m-normas-m"><i>Área dentro de retiros</i><b>${gm ? fmt(gm.envA, 0) + " m²" : "—"}</b>${bar(gm ? gm.envA : 0, A)}<i>${realPoly ? "polígono real" : "cuadrado equivalente"}</i></div>
          <div class="m-normas-m"><i>Huella efectiva</i><b>${fmt(huellaReal, 0)} m²</b>${bar(huellaReal, A)}<i>min(COS×A, retiros)</i></div>
          <div class="m-normas-m"><i>Pisos con huella efectiva</i><b>${fmt(pisosReal, 1)}</b>${bar(pisosReal, Math.max(V.pisos, pisosReal), pisosReal > V.pisos)}<i>para agotar el CUS</i></div>
          <div class="m-normas-m"><i>Altura por piso</i><b>${hPiso ? fmt(hPiso, 2) + " m" : "—"}</b>${bar(hPiso, 4.5, hPiso && hPiso < 2.7)}<i>altura ÷ pisos</i></div>
        </div>${W.map(w => `<div class="m-normas-alert">▲ ${esc(w)}</div>`).join("")}
        <div class="m-normas-hint">Norma usada: ${esc(CAN ? CAN.irm : "IRM / línea de fábrica")} · PUGS ${esc(LOC.canton || "")} · cálculo de prediseño, no sustituye el informe municipal.</div>`;
        drawViz(gm);
      }

      /* ── visualización ── */
      function drawViz(gm) {
        if (!vizBox) return;
        if (!poly) { vizBox.innerHTML = `<div class="m-normas-def">Sin terreno: dibuja el polígono del sitio para ver la envolvente.</div>`; return; }
        gm = gm || geom();
        if (UI.view === "plan") drawPlan(gm); else drawAxo(gm);
      }
      const ptsS = Q => Q.map(p => p[0].toFixed(1) + "," + p[1].toFixed(1)).join(" ");
      function drawPlan(gm) {
        const Wd = Math.round(clamp(vizBox.clientWidth || 520, 300, 620)), Ht = Math.round(Wd * 0.78), pad = 62;
        let x0 = Infinity, x1 = -Infinity, y0 = Infinity, y1 = -Infinity;
        poly.forEach(p => { x0 = Math.min(x0, p[0]); x1 = Math.max(x1, p[0]); y0 = Math.min(y0, p[1]); y1 = Math.max(y1, p[1]); });
        const s = Math.min((Wd - 2 * pad) / (x1 - x0 || 1), (Ht - 2 * pad) / (y1 - y0 || 1));
        const ox = Wd / 2 - (x0 + x1) / 2 * s, oy = Ht / 2 + (y0 + y1) / 2 * s;
        const T = p => [ox + p[0] * s, oy - p[1] * s];
        const n = poly.length, TP = poly.map(T);
        let h = `<svg class="m-normas-svg" viewBox="0 0 ${Wd} ${Ht}" role="img" aria-label="Planta del terreno con retiros">
          <defs><filter id="m-normas-gl" x="-20%" y="-20%" width="140%" height="140%"><feGaussianBlur stdDeviation="2.4" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter></defs>
          <polygon points="${ptsS(TP)}" fill="rgba(56,225,255,.05)" stroke="none"/>`;
        if (gm.env) h += `<polygon points="${ptsS(gm.env.map(T))}" fill="none" stroke="var(--acc)" stroke-width="1.2" stroke-dasharray="6 4" opacity=".9"/>`;
        if (gm.hu) h += `<polygon points="${ptsS(gm.hu.map(T))}" fill="rgba(182,255,60,.16)" stroke="var(--done)" stroke-width="1.5" filter="url(#m-normas-gl)"/>`;
        for (let i = 0; i < n; i++) {
          const a = TP[i], b = TP[(i + 1) % n], m = [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2];
          const isF = i === front, isR = i === gm.rear, col = isF ? "var(--done)" : isR ? "var(--warn)" : "var(--acc)";
          const L = len(poly[i], poly[(i + 1) % n]);
          const ex = (b[0] - a[0]), ey = (b[1] - a[1]), el2 = Math.hypot(ex, ey) || 1; let nx = ey / el2, ny = -ex / el2;
          const cx = Wd / 2, cy = Ht / 2; if ((m[0] + nx * 10 - cx) ** 2 + (m[1] + ny * 10 - cy) ** 2 < (m[0] - cx) ** 2 + (m[1] - cy) ** 2) { nx = -nx; ny = -ny; }
          const lx = m[0] + nx * 16, ly = m[1] + ny * 16;
          h += `<line x1="${a[0].toFixed(1)}" y1="${a[1].toFixed(1)}" x2="${b[0].toFixed(1)}" y2="${b[1].toFixed(1)}" stroke="${col}" stroke-width="${isF ? 3 : 1.6}" ${isF ? 'filter="url(#m-normas-gl)"' : ""}/>
            <line class="m-normas-edge" data-edge="${i}" x1="${a[0].toFixed(1)}" y1="${a[1].toFixed(1)}" x2="${b[0].toFixed(1)}" y2="${b[1].toFixed(1)}" stroke="transparent" stroke-width="22"/>
            <text x="${lx.toFixed(1)}" y="${(ly + 3).toFixed(1)}" text-anchor="middle" class="${isF ? "tD" : isR ? "tW" : ""}">${fmt(L, 1)} m${isF ? " · FRENTE r" + fmt(V.retF, 1) : isR ? " · POST. r" + fmt(V.retP, 1) : ""}</text>`;
        }
        TP.forEach(p => h += `<circle cx="${p[0].toFixed(1)}" cy="${p[1].toFixed(1)}" r="3" fill="var(--acc)"/>`);
        const gl = 40, sv = (() => { const c = [10, 20, 25, 50, 100, 200]; for (const v of c) if (v * s > 60) return v; return 500; })();
        h += `<g transform="translate(${Wd - 30},34)"><path d="M0 -16 L6 6 L0 2 L-6 6Z" fill="var(--acc)"/><text y="20" text-anchor="middle" class="tA">N</text></g>
          <g transform="translate(16,${Ht - 16})"><line x1="0" y1="0" x2="${(sv * s).toFixed(1)}" y2="0" stroke="var(--acc)" stroke-width="2"/><line x1="0" y1="-5" x2="0" y2="5" stroke="var(--acc)"/><line x1="${(sv * s).toFixed(1)}" y1="-5" x2="${(sv * s).toFixed(1)}" y2="5" stroke="var(--acc)"/><text x="${(sv * s / 2).toFixed(1)}" y="-8" text-anchor="middle" class="tA">${sv} m</text></g>
          <g transform="translate(14,18)"><rect width="10" height="10" fill="rgba(182,255,60,.3)" stroke="var(--done)"/><text x="16" y="9">huella máx. ${fmt(gm.huA, 0)} m²</text>
          <line x1="0" y1="22" x2="10" y2="22" stroke="var(--acc)" stroke-dasharray="3 2"/><text x="16" y="25">retiros · ${fmt(gm.envA, 0)} m²</text></g></svg>`;
        void gl;
        vizBox.innerHTML = h;
        vizBox.querySelectorAll("[data-edge]").forEach(e => e.addEventListener("click", () => { front = +e.dataset.edge; saveM(); refresh(); }));
      }
      function drawAxo(gm) {
        const Wd = Math.round(clamp(vizBox.clientWidth || 520, 300, 620)), Ht = Math.round(Wd * 0.82);
        const H = V.altura > 0 ? V.altura : V.pisos * 3;
        const pisosRes = V.cos > 0 ? V.cus / V.cos : 0;
        const huA = gm.huA || 0, total = V.cus * A;
        const nPis = huA > 0 ? Math.min(V.pisos, Math.max(1, Math.ceil(total / huA - 1e-6))) : 0;
        const hp = V.pisos > 0 ? H / V.pisos : 3;
        const Hs = nPis * hp;
        const th = UI.theta, tl = UI.tilt, ct = Math.cos(th), st = Math.sin(th), sT = Math.sin(tl), cT = Math.cos(tl);
        const pr = (x, y, z) => { const xr = x * ct - y * st, yr = x * st + y * ct; return [xr, -yr * sT - z * cT, yr]; };
        const all = [];
        poly.forEach(p => { all.push(pr(p[0], p[1], 0)); });
        if (gm.env) gm.env.forEach(p => all.push(pr(p[0], p[1], H)));
        all.push(pr(0, 0, H * 1.05));
        let x0 = Infinity, x1 = -Infinity, y0 = Infinity, y1 = -Infinity;
        all.forEach(p => { x0 = Math.min(x0, p[0]); x1 = Math.max(x1, p[0]); y0 = Math.min(y0, p[1]); y1 = Math.max(y1, p[1]); });
        const pad = 64, sc = Math.min((Wd - 2 * pad) / (x1 - x0 || 1), (Ht - 2 * pad) / (y1 - y0 || 1));
        const ox = Wd / 2 - (x0 + x1) / 2 * sc, oy = Ht / 2 - (y0 + y1) / 2 * sc;
        const S2 = (x, y, z) => { const p = pr(x, y, z); return [ox + p[0] * sc, oy + p[1] * sc, p[2]]; };
        const ps = Q => Q.map(p => p[0].toFixed(1) + "," + p[1].toFixed(1)).join(" ");
        let h = `<defs><filter id="m-normas-gl2" x="-20%" y="-20%" width="140%" height="140%"><feGaussianBlur stdDeviation="2" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter></defs>`;
        // terreno
        h += `<polygon points="${ps(poly.map(p => S2(p[0], p[1], 0)))}" fill="rgba(56,225,255,.07)" stroke="var(--acc)" stroke-width="1.4"/>`;
        // frente
        { const a = S2(...poly[front], 0), b = S2(...poly[(front + 1) % poly.length], 0); h += `<line x1="${a[0].toFixed(1)}" y1="${a[1].toFixed(1)}" x2="${b[0].toFixed(1)}" y2="${b[1].toFixed(1)}" stroke="var(--done)" stroke-width="3" filter="url(#m-normas-gl2)"/><text x="${((a[0] + b[0]) / 2).toFixed(1)}" y="${((a[1] + b[1]) / 2 + 14).toFixed(1)}" text-anchor="middle" class="tD">FRENTE</text>`; }
        const prism = (Q, z0, z1, fill, stroke, dash, sw) => {
          const n = Q.length, faces = [];
          for (let i = 0; i < n; i++) {
            const a = Q[i], b = Q[(i + 1) % n];
            const f = [S2(a[0], a[1], z0), S2(b[0], b[1], z0), S2(b[0], b[1], z1), S2(a[0], a[1], z1)];
            faces.push({ d: (f[0][2] + f[1][2]) / 2, f });
          }
          faces.sort((u, v) => v.d - u.d);
          let o = "";
          faces.forEach(F => o += `<polygon points="${ps(F.f)}" fill="${fill}" stroke="${stroke}" stroke-width="${sw}" ${dash ? `stroke-dasharray="${dash}"` : ""} stroke-linejoin="round"/>`);
          o += `<polygon points="${ps(Q.map(p => S2(p[0], p[1], z1)))}" fill="${fill}" stroke="${stroke}" stroke-width="${sw}" ${dash ? `stroke-dasharray="${dash}"` : ""}/>`;
          return o;
        };
        if (gm.env) {
          h += `<polygon points="${ps(gm.env.map(p => S2(p[0], p[1], 0)))}" fill="none" stroke="var(--acc)" stroke-dasharray="5 4" stroke-width="1"/>`;
          h += prism(gm.env, 0, H, "rgba(56,225,255,.035)", "rgba(56,225,255,.55)", "5 4", 1);
        }
        if (gm.hu && Hs > 0) {
          h += prism(gm.hu, 0, Hs, "rgba(182,255,60,.10)", "var(--done)", "", 1.3);
          for (let k = 1; k < nPis; k++) h += `<polygon points="${ps(gm.hu.map(p => S2(p[0], p[1], k * hp)))}" fill="none" stroke="rgba(182,255,60,.45)" stroke-width=".8"/>`;
        }
        // cota de altura
        if (gm.env) {
          let bi = 0, bx = Infinity; gm.env.forEach((p, i) => { const q = S2(p[0], p[1], 0); if (q[0] < bx) { bx = q[0]; bi = i; } });
          const p = gm.env[bi], a = S2(p[0], p[1], 0), b = S2(p[0], p[1], H);
          h += `<line x1="${(a[0] - 16).toFixed(1)}" y1="${a[1].toFixed(1)}" x2="${(b[0] - 16).toFixed(1)}" y2="${b[1].toFixed(1)}" stroke="var(--acc)" stroke-width="1"/>
            <line x1="${(a[0] - 22).toFixed(1)}" y1="${a[1].toFixed(1)}" x2="${(a[0] - 10).toFixed(1)}" y2="${a[1].toFixed(1)}" stroke="var(--acc)"/>
            <line x1="${(b[0] - 22).toFixed(1)}" y1="${b[1].toFixed(1)}" x2="${(b[0] - 10).toFixed(1)}" y2="${b[1].toFixed(1)}" stroke="var(--acc)"/>
            <text x="${(b[0] - 20).toFixed(1)}" y="${((a[1] + b[1]) / 2).toFixed(1)}" text-anchor="end" class="tA">H máx</text>
            <text x="${(b[0] - 20).toFixed(1)}" y="${((a[1] + b[1]) / 2 + 12).toFixed(1)}" text-anchor="end" class="tA">${fmt(H, 1)} m</text>`;
          if (gm.hu && Hs > 0 && Math.abs(Hs - H) > 0.2) {
            const q = gm.hu[0], c0 = S2(q[0], q[1], Hs);
            h += `<text x="${(c0[0] - 6).toFixed(1)}" y="${(c0[1] - 6).toFixed(1)}" text-anchor="end" class="tD">${nPis} pisos · ${fmt(Hs, 1)} m</text>`;
          }
        }
        // lados del terreno (cota del frente)
        { const a = poly[front], b = poly[(front + 1) % poly.length], A0 = S2(a[0], a[1], 0), B0 = S2(b[0], b[1], 0); h += `<text x="${((A0[0] + B0[0]) / 2).toFixed(1)}" y="${((A0[1] + B0[1]) / 2 + 26).toFixed(1)}" text-anchor="middle" class="tD">${fmt(len(a, b), 1)} m</text>`; }
        // brújula
        const nB = pr(0, 1, 0), nO = pr(0, 0, 0); const vx = nB[0] - nO[0], vy = nB[1] - nO[1], vl = Math.hypot(vx, vy) || 1;
        h += `<g transform="translate(${Wd - 34},${Ht - 34})"><circle r="16" fill="none" stroke="var(--line2)"/><line x1="0" y1="0" x2="${(vx / vl * 14).toFixed(1)}" y2="${(vy / vl * 14).toFixed(1)}" stroke="var(--acc)" stroke-width="2"/><text x="${(vx / vl * 24).toFixed(1)}" y="${(vy / vl * 24 + 3).toFixed(1)}" text-anchor="middle" class="tA">N</text></g>`;
        h += `<g transform="translate(12,18)"><text class="tA">ENVOLVENTE MÁX. ${fmt(gm.envA * H, 0)} m³</text>
          <text y="14" class="tD">TEÓRICO ${fmt(huA, 0)} m² × ${nPis} pisos</text>
          <text y="28">CUS/COS ${fmt(pisosRes, 1)} · entrepiso ${fmt(hp, 2)} m</text></g>`;
        lastGm = gm;
        let sv = vizBox.querySelector("svg[data-axo]");
        if (sv && sv.getAttribute("viewBox") === `0 0 ${Wd} ${Ht}`) { sv.innerHTML = h; return; }
        vizBox.innerHTML = `<svg class="m-normas-svg" data-axo="1" viewBox="0 0 ${Wd} ${Ht}" role="img" aria-label="Axonometría de la envolvente máxima">${h}</svg>`;
        sv = vizBox.querySelector("svg");
        let drag = null;
        sv.addEventListener("pointerdown", e => { drag = { x: e.clientX, y: e.clientY, th: UI.theta, tl: UI.tilt }; try { sv.setPointerCapture(e.pointerId); } catch (_) {} });
        sv.addEventListener("pointermove", e => {
          if (!drag) return;
          UI.theta = drag.th + (e.clientX - drag.x) * 0.012; UI.tilt = clamp(drag.tl + (e.clientY - drag.y) * 0.006, 0.12, 1.4);
          if (!raf) raf = requestAnimationFrame(() => { raf = 0; if (sv.isConnected) drawAxo(lastGm); });
        });
        const end = () => { drag = null; };
        sv.addEventListener("pointerup", end); sv.addEventListener("pointercancel", end);
      }
      let raf = 0, lastGm = null;

      /* === FUENTES === */
      function drawSrc() {
        const c = document.createElement("div"); body.appendChild(c);
        const docs = sitioDocs();
        const ver = docs.filter(d => d.v === 1).length;
        c.innerHTML = `<div class="m-normas-card" style="margin-bottom:12px">
            <div class="m-normas-h">${I.src}<span>${esc(isECU ? (CAN ? CAN.n + " · " + CAN.prov : (cantonName || "Cantón sin definir") + " · sin ficha en DION") : (city + " · " + (LOC.pais || P.iso || "")))}</span><span class="m-normas-sp"></span><span class="m-normas-chip ${CAN ? "ok" : "ac"}">${CAN ? ver + " ENLACES VERIFICADOS" : "BÚSQUEDAS SUGERIDAS"}</span></div>
            ${CAN && CAN.nota ? `<div class="m-normas-def">${esc(CAN.nota)}</div>` : ""}
            ${!isECU ? `<div class="m-normas-def">Fuera de Ecuador busca: <b>FAR</b> (≈ CUS), <b>lot coverage</b> (≈ COS), <b>setbacks</b>, <b>height limit</b> y <b>pervious/green area ratio</b> (≈ CAS) en el <i>zoning code</i> local.</div>` : ""}
            <div class="m-normas-lbl" style="margin:8px 0 4px">CÓMO OBTENER EL COS/CUS REAL DE ESTE TERRENO</div>
            <ol style="margin:0;padding-left:20px;font-size:12.5px;color:var(--muted);line-height:1.6">
              <li>Obtén el <b style="color:var(--ink)">código catastral</b> del predio (escritura, carta de impuesto predial o geoportal).</li>
              <li>Ubica el polígono/zona en el <b style="color:var(--ink)">PUGS</b> (mapa de aprovechamiento urbanístico).</li>
              <li>Solicita el <b style="color:var(--ink)">${esc(CAN ? CAN.irm : (isECU ? "IRM / línea de fábrica / informe de regulación" : "zoning verification letter"))}</b>: trae COS, CUS, altura, retiros, lote y frente mínimos, uso y afectaciones.</li>
              <li>Verifica compatibilidad del uso «${esc(tipoN)}» y si requiere <b style="color:var(--ink)">informe de compatibilidad</b> o concesión onerosa de derechos.</li>
              <li>Anota número y fecha del documento en «Fuente» y toca <b style="color:var(--done)">Confirmar con el IRM</b>.</li>
            </ol></div>
          <div class="m-normas-leg">${badge(1)} encontrado en la web · ${badge(0)} existe, bloqueó lectura · ${badge("s")} no confirmado: búsqueda</div>
          <div class="m-normas-docs">${docs.map(d => docCard(d)).join("")}</div>
          ${!isECU ? `<div class="m-normas-sh" style="margin-top:14px"><span class="num">INT</span><h4>Estándares internacionales</h4></div><div class="m-normas-docs">${INTL.map(d => docCard(d)).join("")}</div>` : ""}`;
      }

      /* === MARCO LEGAL 2.4 === */
      function lawSections() {
        const sec = [];
        if (isECU) {
          sec.push(["2.4.1.1", "Constitución de la República", NAC["2.4.1.1"]]);
          sec.push(["2.4.1.2", "Secretaría Nacional de Planificación", NAC["2.4.1.2"]]);
          sec.push(["2.4.1.3", "Normativas y ordenanzas nacionales y locales", NAC["2.4.1.3"]]);
          sec.push(["2.4.1.4", "Ordenanzas municipales · " + (CAN ? CAN.n : cantonName || "cantón"), sitioDocs()]);
          sec.push(["2.4.1.5", "Norma Ecuatoriana de la Construcción (NEC)", NAC["2.4.1.5"]]);
          sec.push(["2.4.1.6", "Sistema contra incendios (SCI)", NAC["2.4.1.6"]]);
        } else {
          sec.push(["2.4.1", "Normativa local (" + (LOC.pais || P.iso || "") + ")", fallbackINT()]);
          sec.push(["2.4.1.6", "Seguridad contra incendios", NAC["2.4.1.6"].filter(d => /NFPA/.test(d.t))]);
        }
        sec.push(["2.4.2", "Normativas específicas del tema · " + tipoN, temaDocs().concat(INTL.filter(d => cat === "TRA" ? true : !/OACI/.test(d.t)))]);
        return sec;
      }
      function drawLaw() {
        const c = document.createElement("div"); body.appendChild(c);
        const sec = lawSections();
        let h = `<div class="m-normas-card" style="margin-bottom:12px"><div class="m-normas-h">${I.law}<span>Capítulo 2.4 · Marco legal</span><span class="m-normas-sp"></span><button class="m-normas-btn txt" data-md>${I.dl}DESCARGAR REFERENCIAS .MD</button></div>
          <div class="m-normas-def">Orden del índice de tesis. Cada tarjeta trae el artículo clave y para qué sirve en «${esc(P.nombre || tipoN)}». Enlaces verificados el ${FECHA}; los de búsqueda deben confirmarse antes de citarlos.</div>
          <div class="m-normas-leg">${badge(1)} ${badge(0)} ${badge("s")}</div></div>`;
        sec.forEach(s => {
          h += `<div class="m-normas-sec"><div class="m-normas-sh"><span class="num">${s[0]}</span><h4>${esc(s[1])}</h4></div><div class="m-normas-docs">${s[2].map(d => docCard(d)).join("")}</div></div>`;
        });
        h += `<div class="m-normas-sec"><div class="m-normas-sh"><span class="num">2.4.3</span><h4>Certificaciones · marca las que vas a aplicar</h4></div><div class="m-normas-docs">${CERT.map(d => {
          const on = !!MS.certs[d.id];
          return docCard(d, `<label class="m-normas-chk ${on ? "on" : ""}"><input type="checkbox" data-cert="${d.id}" ${on ? "checked" : ""}>APLICAR EN EL PROYECTO</label>`);
        }).join("")}</div></div>`;
        c.innerHTML = h;
        c.addEventListener("change", e => {
          const i = e.target.closest("[data-cert]"); if (!i) return;
          MS.certs = Object.assign({}, MS.certs, { [i.dataset.cert]: i.checked }); i.parentElement.classList.toggle("on", i.checked); saveM();
        });
        c.querySelector("[data-md]").addEventListener("click", () => {
          let md = `# 2.4 Marco legal — ${P.nombre || tipoN}\n\nUbicación: ${[LOC.parroquia, LOC.canton, prov, LOC.pais].filter(Boolean).join(", ")}\nEnlaces verificados: ${FECHA}\n\n`;
          sec.forEach(s => { md += `## ${s[0]} ${s[1]}\n\n`; s[2].forEach(d => { md += `- **${d.t}**${d.v === "s" ? " (búsqueda)" : ""} — ${d.u}\n  - Clave: ${d.a || ""}\n  - En el proyecto: ${d.p || ""}\n`; }); md += "\n"; });
          md += `## 2.4.3 Certificaciones\n\n`; CERT.filter(d => MS.certs[d.id]).forEach(d => md += `- **${d.t}** — ${d.u}\n  - ${d.a}\n`);
          if (!CERT.some(d => MS.certs[d.id])) md += "- (ninguna marcada)\n";
          md += `\n## Parámetros del terreno (${allOk() ? "confirmados con IRM" : "POR VERIFICAR"})\n\n`;
          PAR.forEach(p => md += `- ${p.n}: ${fmt(V[p.k], p.f)} ${p.u} ${VER[p.k] ? "✓" : "(por verificar)"}\n`);
          md += `- Uso: ${V.uso || "—"}\n- Fuente: ${V.fuente || "—"}\n`;
          try { ctx.download("marco-legal-2.4.md", md); } catch (e) {}
        });
      }

      /* footer */
      const foot = document.createElement("div"); foot.className = "m-normas-foot";
      foot.innerHTML = `<span class="m-normas-hint" style="margin:0">${esc(isECU ? "Ecuador primero · luego mundo" : "Internacional")} · ${FECHA}</span><button class="m-normas-btn txt go" data-next>SIGUIENTE ESTACIÓN →</button>`;
      root.appendChild(foot);
      foot.querySelector("[data-next]").addEventListener("click", () => { try { ctx.next(); } catch (e) {} });

      drawTabs(); drawBody();
      return () => { if (pendP) { clearTimeout(tP); doSaveP(); } if (pendM) { clearTimeout(tM); doSaveM(); } if (raf) cancelAnimationFrame(raf); };
    }
  };
})();
