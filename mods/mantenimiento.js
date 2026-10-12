/* DION · mantenimiento.js — Mantenimiento de la edificación (última estación del recorrido)
   Módulo: DION_MOD.mantenimiento
   Inventario de sistemas → vida útil (ISO 15686 método factorial) → plan preventivo con calendario anual →
   correctivo y predictivo (IoT/BMS) → costos y ciclo de vida → manual de uso + CSV + COBie → entrega a operación.
   Ecuador primero (NEC, NTE INEN, Ley de Propiedad Horizontal, Cuerpo de Bomberos, MSP/ARCSA), luego mundo
   (ISO 15686, ISO 41001, ISO 55000, EN 13306, ASHRAE 180, NFPA 10/25/72/99/110, ASME A17.1, COBie, ISO 19650-3).
   Todos los valores son REFERENCIALES de prediseño y deben verificarse con fabricantes y especialistas. */
(function(){
"use strict";
window.DION_MOD = window.DION_MOD || {};
var DM = window.DION_MOD;
var P = "m-mantenimiento";

/* ───────────────────────── utilidades ───────────────────────── */
function fmt(n,d){ d=d||0; if(n==null||isNaN(n)) return "—"; return Number(n).toLocaleString("es-EC",{minimumFractionDigits:d,maximumFractionDigits:d}); }
function money(n){ return "$"+fmt(n,0); }
function moneyK(n){ if(Math.abs(n)>=1e6) return "$"+fmt(n/1e6,2)+" M"; if(Math.abs(n)>=1e4) return "$"+fmt(n/1e3,0)+" k"; return money(n); }
function hash(s){ var h=2166136261; s=String(s); for(var i=0;i<s.length;i++){ h^=s.charCodeAt(i); h=Math.imul(h,16777619);} return h>>>0; }
function debounce(fn,ms){ var t; return function(){ var a=arguments; clearTimeout(t); t=setTimeout(function(){ fn.apply(null,a); },ms); }; }
function E(s){ return String(s==null?"":s).replace(/[&<>"']/g,function(c){ return {"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]; }); }
function clone(o){ return JSON.parse(JSON.stringify(o)); }
function csvCell(v){ v=String(v==null?"":v); return /[",;\n]/.test(v)?'"'+v.replace(/"/g,'""')+'"':v; }
function csv(rows){ return "﻿"+rows.map(function(r){ return r.map(csvCell).join(","); }).join("\r\n"); }
function slug(s){ return String(s||"proyecto").normalize("NFD").replace(/[̀-ͯ]/g,"").replace(/[^A-Za-z0-9]+/g,"-").replace(/^-|-$/g,"").toLowerCase()||"proyecto"; }

var MES=["Ene","Feb","Mar","Abr","May","Jun","Jul","Ago","Sep","Oct","Nov","Dic"];
var MESL=["Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"];
var FREQ={D:{n:"Diaria",y:365,c:"#B6FF3C"},S:{n:"Semanal",y:52,c:"#D9F25A"},M:{n:"Mensual",y:12,c:"#38E1FF"},T:{n:"Trimestral",y:4,c:"#4F7DFF"},
  Se:{n:"Semestral",y:2,c:"#B26BFF"},A:{n:"Anual",y:1,c:"#FF6FA8"},Q:{n:"Quinquenal",y:0.2,c:"#FFC24B"},E:{n:"Eventual",y:0,c:"#FF5C7A"}};
var FORD=["D","S","M","T","Se","A","Q","E"];
var RESP={U:{n:"Propietario / usuario",c:"#B6FF3C"},A:{n:"Administrador",c:"#38E1FF"},T:{n:"Técnico especializado",c:"#FFB547"}};

/* ───────────────────────── glifos ───────────────────────── */
var GLY={
 est:'<path d="M4 21V8M12 21V8M20 21V8M2 8h20M2 21h20M4 12l8-4 8 4"/>',
 cub:'<path d="M2 12L12 4l10 8"/><path d="M5 10v10h14V10"/><path d="M9 20v-5h6v5"/>',
 fac:'<rect x="4" y="3" width="16" height="18" rx="1"/><path d="M12 3v18M4 9h16M4 15h16"/>',
 pis:'<path d="M3 20l9-5 9 5M3 15l9-5 9 5M7.5 17.5l9-5M7.5 12.5l9 5"/>',
 pin:'<rect x="3" y="3" width="14" height="6" rx="1"/><path d="M17 6h3v6h-8v3"/><rect x="10.5" y="15" width="3" height="6" rx="1"/>',
 san:'<path d="M12 3C8 9 6 12 6 15a6 6 0 0012 0c0-3-2-6-6-12z"/><path d="M9.5 15.5a2.5 2.5 0 002.5 2.5"/>',
 ele:'<path d="M13 2L4 14h7l-1 8 9-12h-7z"/>',
 sci:'<path d="M12 3c1 4 5 5 5 10a5 5 0 01-10 0c0-3 2-4 2-6 1 1 2 2 3 2 0-3-1-4 0-6z"/>',
 hvac:'<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="1.6"/><path d="M12 10.4C11 7 13 5 15 6M13.6 12.8c3.4.8 4.4 3.3 2.6 4.7M10.4 12.8c-2.6 2.4-5 1.6-5-.6"/>',
 asc:'<rect x="5" y="2" width="14" height="20" rx="1"/><path d="M12 2v20M8.5 9l-1.5 2h3zM15.5 13l1.5-2h-3z"/>',
 seg:'<path d="M3 7h12l3 3v3l-3 3H3z"/><circle cx="9" cy="11.5" r="2.5"/><path d="M18 10l3-2v8l-3-2"/>',
 ver:'<path d="M12 21v-8"/><path d="M12 13c-5 0-7-4-6-9 5 0 7 4 6 9zM12 15c4 0 6-3 5-7-4 0-6 3-5 7z"/>',
 pool:'<path d="M2 15c2.5 2 5 2 7.5 0s5-2 7.5 0 3.5 1.5 5 0M2 19c2.5 2 5 2 7.5 0s5-2 7.5 0 3.5 1.5 5 0"/><path d="M7 13V4h3M15 13V4h3M7 8h8"/>',
 esp:'<circle cx="12" cy="12" r="9"/><path d="M10 7h4v3h3v4h-3v3h-4v-3H7v-4h3z"/>',
 check:'<path d="M4 12l5 5L20 6"/>', dl:'<path d="M12 3v12M7 10l5 5 5-5M4 20h16"/>', cal:'<rect x="3" y="5" width="18" height="16" rx="1"/><path d="M3 10h18M8 3v4M16 3v4"/>',
 warn:'<path d="M12 3l10 18H2z"/><path d="M12 10v5M12 18v.5"/>', sens:'<circle cx="12" cy="12" r="2"/><path d="M7.8 7.8a6 6 0 000 8.4M16.2 7.8a6 6 0 010 8.4M5 5a10 10 0 000 14M19 5a10 10 0 010 14"/>',
 book:'<path d="M4 4h7a2 2 0 012 2v14a2 2 0 00-2-2H4zM20 4h-7a2 2 0 00-2 2v14a2 2 0 012-2h7z"/>', key:'<circle cx="7.5" cy="15.5" r="4"/><path d="M10.5 12.5L20 3M16 7l3 3M14 9l2 2"/>',
 coin:'<ellipse cx="12" cy="6" rx="8" ry="3"/><path d="M4 6v6c0 1.7 3.6 3 8 3s8-1.3 8-3V6M4 12v6c0 1.7 3.6 3 8 3s8-1.3 8-3v-6"/>',
 clock:'<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 3"/>', flag:'<path d="M5 21V4M5 4h12l-2 4 2 4H5"/>'
};
function gly(k,s,col){ return '<svg class="'+P+'-g" width="'+(s||20)+'" height="'+(s||20)+'" viewBox="0 0 24 24" fill="none" stroke="'+(col||"currentColor")+'" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">'+(GLY[k]||GLY.esp)+'</svg>'; }

/* ───────────────────────── datos: sistemas ─────────────────────────
   cap = % del costo de obra que representa el sistema (capital) · am = % anual de su capital en mantenimiento preventivo
   comps: [nombre, vida útil de referencia (años) RSL, sensibilidad al ambiente exterior 0–1, % del capital del sistema que se reemplaza al fin de vida] */
var SYS=[
 {id:"est",n:"Estructura",c:"#38E1FF",cap:24,am:0.15,ref:"NEC-SE-HM · NEC-SE-DS · ISO 15686-1/-2",comps:[["Estructura principal (pórticos, losas, cimentación)",100,0.25,0],["Juntas de dilatación y sísmicas (sellos)",15,0.5,2],["Protección anticorrosiva de elementos metálicos expuestos",10,1,4]]},
 {id:"cub",n:"Cubierta e impermeabilización",c:"#4F7DFF",cap:5,am:1.2,ref:"Fabricante de membrana · ASTM D7877 · NEC-HS (aguas lluvias)",comps:[["Impermeabilización (membrana asfáltica / poliuretano / PVC)",15,0.6,35],["Canales, bajantes y sumideros",25,0.8,10],["Sellos de pasantes, botaguas y anclajes de equipos",8,0.7,5],["Cubierta liviana (panel / galvalume) si existe",30,1,40]]},
 {id:"fac",n:"Fachadas y carpinterías",c:"#7C6CFF",cap:12,am:0.8,ref:"AAMA 609/610 · ASTM C1193 · fabricante",comps:[["Ventanería de aluminio y vidrio",35,0.8,35],["Sellos de silicona perimetrales",12,0.7,6],["Revestimiento de fachada / enlucido exterior",30,0.6,25],["Puertas interiores y de emergencia",25,0.2,12],["Herrajes, cierrapuertas y barras antipánico",12,0.5,5]]},
 {id:"pis",n:"Pisos, cielos y acabados",c:"#B26BFF",cap:12,am:1.0,ref:"Fabricante · ISO 15686-8 · ISO 21542 (accesibilidad)",comps:[["Pisos de porcelanato / cerámica",40,0.1,40],["Pisos vinílicos homogéneos / resinas (zonas húmedas o clínicas)",15,0.05,25],["Juntas, emporados y zócalos",10,0.1,5],["Cielo raso (fibromineral / gypsum)",20,0.3,20],["Barandas y pasamanos",30,0.6,5]]},
 {id:"pin",n:"Pintura y protección superficial",c:"#E36BE0",cap:3,am:0.5,ref:"ISO 4628 · ISO 12944 · fabricante",comps:[["Pintura exterior (elastomérica / acrílica)",8,0.9,55],["Pintura interior (látex / epóxica)",6,0.1,35],["Esmalte anticorrosivo en metales",5,1,10]]},
 {id:"san",n:"Instalaciones sanitarias",c:"#2BB3FF",cap:7,am:2.0,ref:"NEC-HS · NTE INEN 1108 · fabricantes",comps:[["Bombas de agua potable",12,0.4,12],["Cisterna (impermeabilización interior)",15,0.2,6],["Calentadores de agua",12,0.5,8],["Tuberías de agua y desagüe (PVC / PP-R / cobre)",50,0.1,30],["Grifería y piezas sanitarias",20,0.2,20],["Válvulas, flotadores y reductoras de presión",10,0.3,5],["Trampa de grasa y cajas de revisión",25,0.2,4]]},
 {id:"ele",n:"Instalaciones eléctricas",c:"#FFC24B",cap:9,am:1.5,ref:"NEC-SB-IE · NFPA 70B · NFPA 110 · CNEL / empresa eléctrica",comps:[["Transformador / cámara de transformación",30,0.6,15],["Tableros, breakers y diferenciales",25,0.5,15],["Iluminación LED (50 000 h)",15,0.3,15],["Cableado y canalizaciones",35,0.1,25],["Tomacorrientes e interruptores",20,0.2,6],["Puesta a tierra y pararrayos",25,0.6,4]]},
 {id:"sci",n:"Sistema contra incendios",c:"#FF8A5C",cap:3,am:3.0,ref:"Reglamento de Prevención de Incendios (Ecuador) · NTE INEN 739 · NFPA 10/25/72",comps:[["Detectores de humo y calor",10,0.3,25],["Panel de alarma y notificación",15,0.2,20],["Extintores portátiles",12,0.4,10],["Luces de emergencia y señalética",8,0.3,10],["Gabinetes y mangueras",10,0.3,8],["Puertas cortafuego",30,0.3,8]]},
 {id:"hvac",n:"Climatización y ventilación (HVAC)",c:"#4FFFB0",cap:8,am:4.0,ref:"ASHRAE 180 · ASHRAE 62.1/170 · fabricante",comps:[["Equipos de climatización (split / VRF / chiller)",15,0.8,55],["Ductos y difusores",30,0.2,15],["Extractores y ventiladores",15,0.6,10],["Tuberías de refrigerante y aislamiento",25,0.5,10]]},
 {id:"asc",n:"Transporte vertical",c:"#D9F25A",cap:3,am:5.0,ref:"ASME A17.1 / EN 81-20 · NTE INEN 2299 · ordenanza GAD",comps:[["Ascensor (máquina, control y cabina)",25,0.3,60],["Cables / cintas de tracción",10,0.3,8],["Operador de puertas",12,0.3,6]]},
 {id:"seg",n:"Seguridad, TI y BMS",c:"#FF5C7A",cap:3,am:4.0,ref:"ISO 16484 (BMS) · IEC 62443 · LOPDP Ecuador 2021",comps:[["Cámaras CCTV",7,0.6,30],["Grabador NVR y discos",5,0.1,15],["Control de accesos y cerraduras",10,0.3,15],["Red de datos (switches, AP)",8,0.1,20]]},
 {id:"ver",n:"Áreas verdes y exteriores",c:"#7CFF6B",cap:1.5,am:12,ref:"ANSI A300 · ordenanza de arbolado del GAD · FLL",comps:[["Sistema de riego automático",15,0.4,20],["Vegetación (árboles, arbustos, césped)",30,0.2,15],["Drenajes de jardineras y pavimentos exteriores",20,0.3,15]]},
 {id:"pool",n:"Piscina",c:"#38C8FF",cap:1.5,am:10,ref:"OMS Guías para aguas recreativas · ordenanza GAD / ARCSA",comps:[["Bombas y filtros",10,0.4,25],["Revestimiento y juntas del vaso",20,0.3,30],["Clorador / dosificador",8,0.4,8]]},
 {id:"esp",n:"Equipos especiales de la tipología",c:"#B6FF3C",cap:4,am:4.0,ref:"Según tipología",comps:[]}
];
var SYSI={}; SYS.forEach(function(s){ SYSI[s.id]=s; });

/* Equipos especiales por categoría: comps + tareas propias */
var ESPC={
 SAL:{n:"Equipos especiales de salud",comps:[["Red de gases medicinales (O₂, aire, vacío)",25,0.3,20],["Válvulas de zona y alarmas de gases",15,0.3,8],["Autoclaves / central de esterilización",15,0.2,25],["Sistema de llamado de enfermería",12,0.1,10],["Blindaje y equipos de imagen (rayos X)",20,0.1,30]],
  tasks:["Gases medicinales: presiones, alarmas de zona y prueba de fugas en tomas|M|T|NFPA 99 · ISO 7396-1","Certificación anual de la red de gases (pureza, caudal, identificación por colores)|A|T|NFPA 99 · ISO 7396-1 · MSP / ARCSA","Autoclaves: prueba Bowie-Dick diaria e indicador biológico semanal|D|T|ISO 17665","Llamado de enfermería: prueba de todos los puntos (camas, baños)|T|T|UL 1069 · fabricante","Levantamiento radiométrico de salas de imagen|A|T|Autoridad de control nuclear (MEM, Ecuador) · OIEA","Limpieza y control del almacenamiento de desechos sanitarios|S|A|Reglamento interministerial de gestión de desechos sanitarios (Ecuador)"]},
 EDU:{n:"Laboratorios y juegos",comps:[["Campanas de extracción de laboratorio",15,0.3,25],["Duchas y lavaojos de emergencia",15,0.3,5],["Juegos infantiles y mobiliario exterior",12,0.8,20]],
  tasks:["Duchas y lavaojos de emergencia: activación semanal|S|A|ANSI Z358.1","Campanas de laboratorio: velocidad de captura|A|T|ASHRAE 110","Juegos infantiles: inspección de anclajes, bordes y superficies de impacto|M|A|EN 1176 / EN 1177 · ASTM F1487"]},
 GAS:{n:"Cocina profesional",comps:[["Campana y ductos de extracción de grasa",20,0.4,25],["Cámaras frías y refrigeración",12,0.5,30],["Línea de gas (GLP) y válvulas",25,0.4,10]],
  tasks:["Limpieza profesional de campanas, filtros y ductos de grasa|T|T|NFPA 96","Cámaras frías: temperatura, burletes y descongelamiento|S|A|ARCSA (BPM) · fabricante","Línea de GLP: prueba de hermeticidad y detectores de gas|A|T|NTE INEN 2260 · NFPA 54"]},
 HOS:{n:"Equipos de hospedaje",comps:[["Lavandería industrial",12,0.3,30],["Cocina y cámaras frías",12,0.5,30],["Cerraduras electrónicas de habitaciones",8,0.2,15]],
  tasks:["Lavandería: limpieza de ductos de secadoras (pelusa) y revisión de rodamientos|M|T|NFPA 211 · fabricante","Campanas de cocina y ductos de grasa|T|T|NFPA 96","Cerraduras: baterías y auditoría de aperturas|T|A|fabricante"]},
 IND:{n:"Equipos industriales y logísticos",comps:[["Puertas seccionales y rampas niveladoras",15,0.5,25],["Puente grúa / polipastos",25,0.5,30],["Piso industrial (juntas y endurecedor)",25,0.1,20]],
  tasks:["Puertas seccionales y niveladores: resortes, sensores y topes|T|T|EN 13241 · fabricante","Puente grúa: inspección anual por tercero y prueba de carga|A|T|ASME B30.2 · NTE INEN / MDT","Piso industrial: resellado de juntas y reparación de bordes|A|T|ACI 302.1R"]},
 DEP:{n:"Equipamiento deportivo",comps:[["Iluminación deportiva",15,0.6,30],["Superficie deportiva (sintética / madera)",10,0.6,40],["Graderíos y barandas",40,0.6,10]],
  tasks:["Cepillado y relleno de césped sintético / limpieza de duela|S|A|EN 15330 · FIFA Quality","Iluminación deportiva: niveles de lux y reorientación|A|T|EN 12193","Graderíos: anclajes, barandas y evacuación|Se|T|NFPA 101 · EN 13200"]},
 CIE:{n:"Laboratorios científicos",comps:[["Cabinas de bioseguridad",12,0.2,30],["Campanas de extracción",15,0.3,25],["Gases especiales y regulación",20,0.3,15]],
  tasks:["Certificación de cabinas de bioseguridad|A|T|NSF/ANSI 49 · EN 12469","Campanas: velocidad de captura|A|T|ASHRAE 110","Gases especiales: fugas y manorreductores|T|T|CGA · NFPA 55"]},
 CUL:{n:"Escena y audiovisuales",comps:[["Tramoya, varas y motores",25,0.2,30],["Butacas",20,0.1,20],["Audio, video e iluminación escénica",10,0.1,40]],
  tasks:["Tramoya: inspección de cables, frenos y contrapesos|A|T|ANSI E1.4 · DGUV 17","Butacas: anclajes y mecanismos de abatimiento|Se|A|EN 12727","Prueba de audio/video y luminarias escénicas|M|T|fabricante"]},
 EVE:{n:"Escena y audiovisuales",comps:[["Rigging y motores",20,0.2,30],["Mamparas móviles",20,0.1,20],["Audio, video y traducción simultánea",10,0.1,40]],
  tasks:["Rigging: inspección de puntos de colgado y motores|A|T|ANSI E1.4 · BS 7905","Mamparas móviles: rieles y sellos acústicos|Se|T|fabricante","Prueba de audio, video y cabinas de interpretación|M|T|ISO 4043"]},
 TRA:{n:"Equipos de transporte",comps:[["Escaleras y rampas mecánicas",25,0.4,60],["Pantallas de información",8,0.3,30],["Sistema de manejo de equipaje / accesos",15,0.2,30]],
  tasks:["Escaleras mecánicas: peines, pasamanos, frenos|M|T|ASME A17.1 / EN 115","Pantallas de información: brillo, píxeles muertos|T|T|fabricante","Torniquetes y control de tarifa: calibración|M|T|fabricante"]},
 REL:{n:"Equipos religiosos y funerarios",comps:[["Horno crematorio y filtros",20,0.3,40],["Campanario / audio",30,0.4,10],["Cámaras frigoríficas",12,0.4,30]],
  tasks:["Horno crematorio: refractario, quemadores y emisiones|T|T|Autoridad ambiental (MAATE) · fabricante","Cámaras frigoríficas: temperatura y sellos|S|A|fabricante"]},
 AGR:{n:"Equipos agropecuarios",comps:[["Riego tecnificado",12,0.6,30],["Silos y transportadores",25,0.6,30]],tasks:["Riego: filtros y goteros|M|A|fabricante","Silos: corrosión y anclajes|A|T|fabricante"]},
 SEG:{n:"Equipos de emergencia",comps:[["Sistemas de comunicación crítica",10,0.2,40],["Helipuerto / iluminación de emergencia",20,0.6,20]],tasks:["Comunicaciones críticas: prueba con ECU 911|M|T|ECU 911 · fabricante","Helipuerto: señalización y luces|T|T|OACI Anexo 14 · DGAC"]}
};

/* Tareas preventivas: "sistema|tarea|frecuencia|responsable|norma|meses (opcional: LL0 antes de lluvias, LL1 después, o lista 0-11)" */
var TASKS_RAW=[
 "est|Recorrido visual de fisuras, deformaciones, desprendimientos y humedad en losas, vigas y columnas; registrar con foto y fecha|Se|A|NEC-SE-HM · ISO 15686-7",
 "est|Inspección estructural por ingeniero civil: fisuras > 0,3 mm, corrosión de armaduras, asentamientos y juntas sísmicas|A|T|NEC-SE-DS · ACI 562 · ACI 201.1R",
 "est|Revisión y resellado de juntas de dilatación y sísmicas|A|T|NEC-SE-DS · fabricante del sellante",
 "est|Retoque de protección anticorrosiva en elementos metálicos expuestos (en la costa, anual)|A|T|ISO 12944 · SSPC-PA 1",
 "est|Ensayos de carbonatación (fenolftaleína) y cloruros en hormigón expuesto|Q|T|ISO 15686-2 · EN 14630 · ACI 222R",
 "est|Controlar que no se perforen vigas/losas ni se agreguen cargas no previstas (tanques, equipos, ampliaciones)|M|A|Ley de Propiedad Horizontal · reglamento interno",
 "est|Evaluación rápida post-sismo (etiquetado verde/amarillo/rojo) antes de reocupar|E|T|NEC-SE-RE · ATC-20",
 "cub|Limpieza de canales, bajantes, sumideros y rejillas (hojas, arena, nidos)|M|A|NEC-HS (aguas lluvias) · fabricante",
 "cub|Inspección de impermeabilización antes del invierno: ampollas, fisuras, traslapes, remates y pasantes|A|T|ASTM D7877 · fabricante|LL0",
 "cub|Inspección después del invierno y prueba de estanqueidad localizada donde hubo filtraciones|A|T|ASTM D5957 · fabricante|LL1",
 "cub|Resellado de pasantes, sombreretes, anclajes de equipos y botaguas|A|T|fabricante",
 "cub|Cubierta metálica: tornillos, arandelas de neopreno, traslapes y puntos de óxido|Se|T|ISO 12944 · fabricante",
 "cub|Renovación de la capa reflectiva / protección UV de la membrana|Q|T|fabricante · ASTM C1549 (SRI)",
 "cub|Verificar líneas de vida y anclajes para trabajo en altura|A|T|D.E. 2393 (Ecuador) · ANSI Z359 · EN 795",
 "fac|Limpieza de vidrios y perfiles (en la costa, con agua dulce para retirar sal)|M|A|AAMA 609/610",
 "fac|Limpieza y lubricación de rieles, felpas, bisagras y cerraduras|T|A|fabricante",
 "fac|Revisión de siliconas y sellos perimetrales de ventanas; reemplazar si están agrietados|A|T|ASTM C1193 · fabricante",
 "fac|Inspección de anclajes de revestimientos y elementos que puedan caer a la vía pública|A|T|ordenanza GAD · NYC Local Law 11 (referencia)",
 "fac|Ajuste de cierrapuertas, puertas de evacuación y barras antipánico|T|T|NFPA 101 · NFPA 80",
 "fac|Protección (barniz / aceite) de carpintería de madera exterior|A|T|fabricante|LL1",
 "fac|Lavado general de fachada y revisión de manchas de humedad|Q|T|ISO 15686-7",
 "pis|Limpieza diaria según el tipo de piso (pH neutro en porcelanato/piedra; desinfectante en vinil clínico)|D|U|fabricante",
 "pis|Revisión de piezas sueltas, rotas o resbaladizas y de juntas (riesgo de caída)|T|A|ISO 21542 · NTE INEN 2854",
 "pis|Sellado de piedra natural u hormigón pulido|A|T|fabricante",
 "pis|Pulido, cristalizado o encerado en zonas de alto tránsito|Se|T|fabricante",
 "pis|Cielos rasos: reemplazar placas manchadas e investigar la filtración que las causó|T|A|fabricante",
 "pis|Barandas y pasamanos: firmeza, anclajes y corrosión|Se|A|NTE INEN 2244 · ISO 21542",
 "pin|Inspección de pintura exterior: caleo, ampollas, hongos y eflorescencias|A|A|ISO 4628|LL1",
 "pin|Limpieza de hongos/moho con fungicida y lavado a presión moderada|A|T|fabricante|LL1",
 "pin|Repintado exterior completo|Q|T|ISO 15686 · fabricante",
 "pin|Retoques de pintura interior en pasillos y zonas de alto tránsito|A|T|fabricante",
 "pin|Retoque de esmalte anticorrosivo en rejas, barandas y estructuras metálicas|Se|T|ISO 12944-5",
 "san|Lectura del medidor con todo cerrado para detectar fugas ocultas|S|A|empresa de agua del cantón",
 "san|Revisión de fugas en grifería, inodoros (prueba de colorante) y llaves de paso|M|A|NEC-HS · fabricante",
 "san|Lavado y desinfección de cisterna y tanques; análisis de calidad del agua|Se|T|NTE INEN 1108 · OMS",
 "san|Bombas: presión, ruido, vibración, temperatura, alternancia y sello mecánico|M|T|fabricante · Hydraulic Institute",
 "san|Tanque hidroneumático: precarga de aire y calibración del presostato|T|T|fabricante",
 "san|Limpieza de trampas de grasa|M|A|ordenanza de descargas del GAD / empresa de agua",
 "san|Limpieza de cajas de revisión, sumideros y desarenadores|T|A|NEC-HS|LL0",
 "san|Calentadores: purga de sedimentos, ánodo de sacrificio y válvula de alivio|Se|T|fabricante · ASME",
 "san|Agua caliente: control de Legionella (≥ 60 °C en acumulación, ≥ 50 °C en retorno)|M|T|ASHRAE 188 · OMS",
 "san|Calibración de válvulas reductoras de presión y flotadores|A|T|fabricante",
 "san|Video-inspección de colectores y bajantes principales|Q|T|EN 13508-2",
 "ele|Recorrido de luminarias y tomas en áreas comunes; reemplazo de lámparas|S|A|NEC-SB-IE",
 "ele|Reajuste de bornes, limpieza de tableros y prueba de diferenciales (botón de test)|Se|T|NFPA 70B · NEC-SB-IE",
 "ele|Termografía infrarroja de tableros y conexiones|A|T|NFPA 70B · NETA MTS",
 "ele|Medición de resistencia de puesta a tierra y revisión del pararrayos (época seca)|A|T|IEEE 81 · IEC 62305 · NFPA 780|LL1",
 "ele|Transformador: temperatura, fugas, nivel y análisis de aceite|A|T|IEEE C57.106 · empresa eléctrica (CNEL / EEQ)",
 "ele|Medición de calidad de energía (armónicos, factor de potencia, desbalance)|A|T|IEEE 519 · regulación ARCERNNR",
 "sci|Inspección visual de extintores: presión, sello, ubicación y señalética|M|A|NTE INEN 739 · NFPA 10",
 "sci|Mantenimiento y recarga de extintores por empresa calificada|A|T|NTE INEN 739 · NFPA 10",
 "sci|Prueba hidrostática de cilindros de extintores|Q|T|NFPA 10",
 "sci|Prueba de detectores, estaciones manuales, sirenas y luces estroboscópicas|Se|T|NFPA 72",
 "sci|Prueba del panel de alarma, baterías y comunicación a central|T|T|NFPA 72",
 "sci|Luces de emergencia: prueba de 30 s mensual y de 90 min anual|M|A|NFPA 101 · NTE INEN-ISO 3864",
 "sci|Simulacro de evacuación con brigadas|Se|A|Reglamento de Prevención de Incendios · Cuerpo de Bomberos",
 "sci|Inspección del Cuerpo de Bomberos y renovación del permiso de funcionamiento|A|A|Ley de Defensa contra Incendios · Cuerpo de Bomberos del cantón|0",
 "sci|Gabinetes y mangueras: inspección y prueba de presión|A|T|NFPA 1962 · NFPA 25",
 "sci|Puertas cortafuego: cierre automático, sellos intumescentes y señalética|Se|T|NFPA 80",
 "hvac|Limpieza o cambio de filtros (en salud, según presión diferencial)|M|T|ASHRAE 180 · ASHRAE 170",
 "hvac|Limpieza de bandejas y drenajes de condensado (algas, olores)|M|T|ASHRAE 180",
 "hvac|Limpieza de serpentines con producto anticorrosivo (costa)|T|T|ASHRAE 180 · fabricante",
 "hvac|Medición de presiones, amperaje, temperatura de suministro y ΔT|T|T|ASHRAE 180",
 "hvac|Bandas, rodamientos y balanceo de ventiladores y extractores|Se|T|fabricante",
 "hvac|Balanceo de aire y verificación de presiones entre salas|A|T|ASHRAE 170 · AABC / NEBB",
 "hvac|Detección de fugas de refrigerante y registro|A|T|Protocolo de Montreal · Enmienda de Kigali",
 "hvac|Limpieza e inspección de ductos|Q|T|NADCA ACR · ASHRAE 62.1",
 "asc|Mantenimiento preventivo por empresa autorizada (frenos, cables, puertas, nivelación)|M|T|ASME A17.1 / EN 81-20 · fabricante",
 "asc|Prueba del rescate automático y del intercomunicador de cabina|M|T|EN 81-28",
 "asc|Inspección de seguridad por tercero certificado (paracaídas, limitador, amortiguadores)|A|T|ASME A17.2 · EN 81-20 · ordenanza GAD",
 "asc|Limpieza de foso y cuarto de máquinas; iluminación y ventilación|T|A|fabricante",
 "asc|Reemplazo de cables / cintas de tracción según desgaste medido|Q|T|ISO 4344 · fabricante",
 "seg|Verificar grabación, fecha/hora y días de almacenamiento|S|A|política interna · LOPDP (Ecuador)",
 "seg|Limpieza de domos y lentes (sal y polvo) y reajuste de encuadres|T|T|fabricante",
 "seg|Actualización de firmware, cambio de contraseñas y respaldo de configuraciones|T|T|IEC 62443 · LOPDP (Ecuador, 2021)",
 "seg|Control de accesos: cerraduras, lectores y liberación automática por alarma de incendio|Se|T|NFPA 101 · UL 294",
 "seg|BMS: alarmas, tendencias, sensores fuera de rango y respaldo de base de datos|M|T|ISO 16484 · ASHRAE 135 (BACnet)",
 "seg|Calibración de sensores (temperatura, humedad, CO₂)|A|T|ISO 16484 · fabricante",
 "ver|Riego (costa: diario en época seca jun–nov; según lluvia en invierno)|D|U|—",
 "ver|Corte de césped, deshierbe y recolección de hojas|S|A|—",
 "ver|Poda de formación y seguridad; retirar ramas sobre cubiertas y cables|Se|T|ANSI A300 · ordenanza de arbolado del GAD|LL0",
 "ver|Fertilización y control integrado de plagas|T|T|—",
 "ver|Revisión de riego automático: goteros, aspersores y controlador|T|A|fabricante",
 "ver|Limpieza de drenajes de jardineras, rejillas y pavimentos exteriores|T|A|FLL (Alemania)|LL0",
 "pool|Medir cloro libre (1–3 ppm) y pH (7,2–7,6); registrar|D|A|OMS · ordenanza GAD / ARCSA",
 "pool|Retrolavado de filtros; limpieza de skimmers y cestas|S|A|fabricante",
 "pool|Aspirado y cepillado de paredes y fondo|S|A|—",
 "pool|Bombas, clorador y dosificadores: revisión|M|T|fabricante",
 "pool|Revisión de revestimiento y juntas del vaso (vaciado parcial)|A|T|fabricante"
];

/* Tecnologías de la estación «Tecnología» → sistema donde se mantienen: id|sistema|componente|vida|tarea|frecuencia|norma */
var TECM_RAW=[
 "knx|seg|Bus KNX y actuadores|20|Revisión de escenas, actuadores y respaldo del proyecto ETS|A|ISO/IEC 14543-3",
 "dali|seg|Control DALI de iluminación|15|Escaneo de direcciones DALI y reemplazo de drivers fallidos|Se|IEC 62386",
 "bms|seg|BMS (sistema de gestión del edificio)|15|Depuración de alarmas y tendencias del BMS|M|ISO 16484",
 "modbus|seg|Pasarelas Modbus / BACnet|15|Verificar comunicación de pasarelas|T|ASHRAE 135",
 "presencia|seg|Sensores de presencia|10|Prueba de sensores de presencia|Se|fabricante",
 "persianas|fac|Persianas motorizadas|12|Lubricación y límites de motores de persianas|Se|fabricante",
 "cctv|seg|Cámaras CCTV|7|—|—|—",
 "acceso|seg|Control de accesos|10|—|—|—",
 "intrusion|seg|Alarma de intrusión|10|Prueba de sensores de intrusión y sirena|T|EN 50131",
 "perimetral|seg|Seguridad perimetral|10|Revisión de barreras y cerco perimetral|T|fabricante",
 "videoportero|seg|Videoporteros|10|Prueba de videoporteros|Se|fabricante",
 "panico|seg|Botones de pánico|10|Prueba de botones de pánico con central|T|fabricante",
 "incendio|sci|Detección y alarma direccionable|15|—|—|—",
 "vesda|sci|Detección por aspiración (VESDA)|12|Prueba de humo y cambio de filtro VESDA|Se|NFPA 72 · fabricante",
 "megafonia|sci|Megafonía de evacuación|12|Prueba de mensajes de evacuación|T|EN 54-16 · NFPA 72",
 "rociadores|sci|Red de rociadores automáticos|50|—|—|—",
 "presion|sci|Presurización de escaleras|20|Prueba de presurización de escaleras|Se|NFPA 92",
 "agente|sci|Extinción por agente limpio|20|Pesaje de cilindros y prueba de hermeticidad del recinto|Se|NFPA 2001",
 "gas|sci|Detección de gas|10|Calibración de detectores de gas|Se|fabricante",
 "cableado|seg|Cableado estructurado|25|Certificación de puntos críticos de red|Q|ANSI/TIA-568",
 "fibra|seg|Red de fibra óptica|25|Medición OTDR de enlaces troncales|Q|ANSI/TIA-568",
 "wifi|seg|Red Wi-Fi|6|Revisión de cobertura y firmware de AP|Se|IEEE 802.11",
 "datacenter|seg|Cuarto de datos|15|Temperatura, humedad y limpieza del cuarto de datos|M|ANSI/TIA-942",
 "fv|ele|Paneles fotovoltaicos e inversores|25|Limpieza de paneles (polvo y sal) y lectura de producción|T|IEC 62446-2",
 "bess|ele|Baterías de almacenamiento (BESS)|12|Estado de carga, temperatura y balanceo de celdas|M|IEC 62933 · NFPA 855",
 "ev|ele|Cargadores de vehículos eléctricos|10|Prueba de cargadores y conectores|Se|IEC 61851",
 "ups|ele|UPS y baterías|6|Prueba de autonomía de UPS y estado de baterías|T|IEEE 1188",
 "generador|ele|Generador de emergencia|25|—|—|—",
 "medicion|ele|Submedición de energía|15|Verificación de medidores y lecturas|Se|IEC 62053",
 "solart|san|Colectores solares térmicos|20|Limpieza de colectores y revisión de fluido|Se|ISO 9806",
 "grises|san|Reciclaje de aguas grises|15|Limpieza de filtros y dosificación de cloro de aguas grises|M|NSF/ANSI 350",
 "lluvia|san|Captación de agua lluvia|20|Limpieza de prefiltros y tanque de agua lluvia|T|ASPE 63|LL0",
 "ptar|san|Planta de tratamiento (PTAR)|20|Muestreo de efluente y retiro de lodos|M|TULSMA (Ecuador) · autoridad ambiental",
 "medagua|san|Medidores inteligentes de agua|12|Lectura y alertas de consumo anómalo|M|fabricante",
 "riego|ver|Riego inteligente|12|—|—|—",
 "bombeo|san|Bombeo de velocidad variable|15|Revisión de variadores de frecuencia|Se|fabricante",
 "hvac|hvac|HVAC eficiente (VRF / chiller)|18|—|—|—",
 "iaq|hvac|Sensores de calidad de aire|8|Calibración de sensores de CO₂ y PM2.5|A|ISO 16000 · fabricante",
 "erv|hvac|Recuperador de energía (ERV)|15|Limpieza del núcleo del recuperador|Se|fabricante",
 "tubos|asc|Correo neumático|20|Revisión de estaciones y desviadores del correo neumático|T|fabricante",
 "amr|asc|Robots de logística (AMR)|8|Baterías y mapas de los robots|T|ISO 3691-4",
 "ascensores|asc|Ascensores de alta eficiencia|25|—|—|—",
 "montacargas|asc|Montacargas|25|Mantenimiento de montacargas|M|ASME A17.1",
 "residuos|asc|Recolección neumática de residuos|20|Limpieza de buzones y válvulas|T|fabricante",
 "parqueo|seg|Guiado de parqueo|10|Sensores y pantallas de guiado|Se|fabricante",
 "fachada|fac|Fachada dinámica|25|Revisión de actuadores de fachada|Se|fabricante",
 "bipv|fac|Fotovoltaica integrada (BIPV)|25|Limpieza e inspección de módulos BIPV|Se|IEC 62446",
 "gemelo|seg|Gemelo digital|10|Sincronizar el gemelo digital con cambios ejecutados|T|ISO 19650-3",
 "iot|seg|Red de sensores IoT|8|Baterías y conectividad de sensores IoT|T|fabricante",
 "cmms|seg|Software de mantenimiento (CMMS)|10|Cierre de órdenes de trabajo e indicadores (MTBF, MTTR)|M|ISO 55000 · EN 15341",
 "ciber|seg|Ciberseguridad OT|5|Parches y auditoría de ciberseguridad OT|T|IEC 62443",
 "gasesmed|esp|Gases medicinales centralizados|25|—|—|—",
 "llamado|esp|Llamado de enfermería IP|12|—|—|—",
 "rtls|esp|Localización en tiempo real (RTLS)|8|Baterías de etiquetas RTLS|T|fabricante",
 "infantil|esp|Seguridad infantil (anti-sustracción)|10|Prueba del sistema anti-sustracción de recién nacidos|M|fabricante",
 "sonido|seg|Sonido ambiental|12|Prueba de zonas de audio|Se|fabricante",
 "av|seg|Salas audiovisuales|8|Prueba de proyectores y pantallas|T|fabricante"
];
var TECM={}; TECM_RAW.forEach(function(l){ var a=l.split("|"); TECM[a[0]]={s:a[1],n:a[2],L:+a[3],t:a[4],f:a[5],nm:a[6],mo:a[7]}; });

/* Materiales (prefijo de id de la estación Materiales) → capa y consejo de mantenimiento */
var MATF={
 hor:["Hormigón","Fisuras, carbonatación y cloruros; recubrimiento ≥ 4 cm en ambiente marino",0.3],
 ace:["Acero","Repintado anticorrosivo; galvanizado o dúplex en la costa (ISO 12944 C4–C5)",1],
 mad:["Madera","Protector UV y fungicida cada 2–3 años; control de termitas",0.8],
 bam:["Bambú / guadúa","Preservado (bórax) y resellado cada 2 años; proteger de lluvia y sol directo",0.9],
 tie:["Tierra","Revoque de cal y aleros amplios; reparar erosión tras cada invierno",0.9],
 mam:["Mampostería","Juntas y eflorescencias; hidrofugar caras expuestas",0.4],
 pie:["Piedra","Sellado periódico; limpieza sin ácidos",0.3],
 cer:["Cerámica","Juntas y piezas sueltas; limpieza pH neutro",0.15],
 vid:["Vidrio","Limpieza mensual; sellos de silicona cada 10–15 años",0.3],
 pla:["Placas","Sensibles a humedad: reparar filtraciones de inmediato",0.4],
 ais:["Aislante","Proteger de humedad y UV; revisar continuidad",0.4],
 alu:["Aluminio","Lavado con agua dulce; anodizado clase marina en la costa",0.6],
 cob:["Cobre","Pátina natural; revisar uniones",0.3], zin:["Zinc","Evitar contacto con acero y cemento húmedo",0.6],
 pol:["Polímero","Degradación UV: revisar fragilidad y decoloración",0.6],
 bio:["Biomaterial","Control de humedad y hongos; tratamientos periódicos",0.8],
 aca:["Acabado","Limpieza según fabricante; retoques",0.3],
 cub:["Cubierta","Tornillería, traslapes y canales; revisión antes del invierno",0.9]
};
var CAPSYS={est:"est",env:"fac",cub:"cub",pis:"pis",int:"pis"};

/* Correctivo: sistema|falla|síntomas|causa probable|solución|prioridad (1 urgente – 3 programable) */
var FALLAS_RAW=[
 "est|Corrosión de armadura|Fisuras paralelas a varillas, manchas de óxido, desprendimiento del recubrimiento|Carbonatación o cloruros (ambiente salino), recubrimiento insuficiente|Picar hasta acero sano, limpiar, pasivar, mortero de reparación; protección superficial|1",
 "est|Fisuras en mampostería|Fisuras diagonales o en encuentros muro–columna|Asentamiento, contracción, falta de juntas o sismo|Evaluar si es activa (testigos de yeso); sellar o reforzar con malla|2",
 "cub|Filtraciones en cubierta|Manchas en cielo raso, goteo con lluvia, placas caídas|Membrana fisurada, traslapes abiertos, pasantes sin sellar, canales tapados|Localizar con prueba de agua, parchar o reemplazar membrana; destapar canales|1",
 "cub|Canales desbordados|Agua cayendo por fachada, manchas verticales|Bajantes subdimensionadas o tapadas|Limpieza, rejillas de protección, aumentar diámetro de bajante|2",
 "fac|Filtración por ventanas|Agua en antepechos, pintura soplada bajo ventanas|Siliconas degradadas, drenajes del perfil tapados|Retirar y renovar sellos; limpiar drenajes (weep holes)|2",
 "fac|Puertas que no cierran|Roce, cierrapuertas sin fuerza, cerradura dura|Asentamiento, bisagras flojas, humedad (madera hinchada)|Ajuste, cambio de bisagras/cierrapuertas, sellar madera|3",
 "pis|Piezas de piso sopladas|Sonido hueco, levantamiento, fisuras|Mal adherido, sin juntas de dilatación, humedad del contrapiso|Retirar, juntas perimetrales, reinstalar con adhesivo flexible|2",
 "pin|Hongos y moho|Manchas negras/verdes en fachadas y baños|Humedad relativa alta, falta de ventilación, pintura sin fungicida|Limpieza con hipoclorito/fungicida, pintura con aditivo antihongos, ventilar|3",
 "pin|Eflorescencias y ampollas|Polvo blanco, pintura que se levanta|Humedad por capilaridad o filtración|Eliminar la fuente de humedad, cepillar, sellador y repintar|3",
 "san|Baja presión de agua|Duchas débiles en pisos altos|Bomba o presostato descalibrado, filtro tapado, fuga|Revisar presostato y precarga, limpiar filtros, buscar fugas|2",
 "san|Fuga oculta|Consumo alto, medidor gira con todo cerrado, humedad en pisos|Tubería perforada o unión fallada|Detección acústica o termográfica; reparar tramo|1",
 "san|Malos olores en desagües|Olor a alcantarilla en baños|Sifones secos, ventilación sanitaria tapada|Llenar sifones, rejillas con sello, destapar ventilación|3",
 "san|Agua turbia o con olor|Color, sabor u olor en grifos|Cisterna sin limpieza, ingreso de agua externa|Lavado y desinfección, análisis INEN 1108, revisar tapas|1",
 "ele|Disparo frecuente de breakers|Cortes en circuitos específicos|Sobrecarga, fuga a tierra, humedad en cajas|Medir corrientes, aislamiento; redistribuir cargas|2",
 "ele|Punto caliente en tablero|Olor a quemado, decoloración, termografía > 15 °C sobre referencia|Bornes flojos, sobrecarga|Desenergizar, reajustar o reemplazar; registrar|1",
 "ele|Generador no arranca|Falla en prueba semanal|Batería descargada, combustible contaminado, precalentador|Cargador de baterías, filtrar combustible, servicio técnico|1",
 "sci|Falsas alarmas|Alarmas sin fuego|Detectores sucios, humedad, insectos|Limpieza o reemplazo; verificar ubicación|2",
 "sci|Extintor descargado|Manómetro en rojo, sello roto|Uso o fuga|Recarga inmediata por empresa calificada (NTE INEN 739)|1",
 "hvac|Equipo no enfría|Temperatura alta, compresor ciclando|Filtros sucios, falta de refrigerante, serpentín corroído|Limpieza, detección de fugas, recarga; serpentín con recubrimiento anticorrosivo|2",
 "hvac|Goteo de condensado|Agua bajo evaporadores, manchas en cielo|Drenaje tapado por algas, bandeja fisurada|Destapar, tabletas biocidas, trampa en el drenaje|2",
 "asc|Ascensor detenido entre pisos|Personas atrapadas|Corte de energía, falla de puertas, sensores|Protocolo de rescate; empresa autorizada 24/7|1",
 "seg|Cámara sin imagen|Pantalla negra, imagen borrosa|PoE caído, lente sucio, humedad en domo|Reiniciar puerto, limpiar, sellar domo|3",
 "ver|Árbol con riesgo|Ramas secas, inclinación, raíces levantando pisos|Poda inadecuada, especie inadecuada|Evaluación arbórea, poda de seguridad o reemplazo|2",
 "pool|Agua verde o turbia|Color verde, paredes resbaladizas|Cloro bajo, pH alto, filtración insuficiente|Supercloración, ajuste de pH, retrolavado; cerrar uso|1",
 "esp|Alarma de gases medicinales|Presión baja/alta en panel de zona|Fuga, consumo excesivo, falla en central|Protocolo de contingencia (cilindros de reserva), localizar fuga|1"
];
var FALLAS=FALLAS_RAW.map(function(l){ var a=l.split("|"); return {s:a[0],f:a[1],sy:a[2],ca:a[3],so:a[4],p:+a[5]}; });

/* Predictivo: sensores IoT/BMS */
var SENS=[
 {id:"vib",n:"Vibración en bombas y motores",s:"san",u:"mm/s RMS",min:0.8,max:7.1,lim:4.5,nm:"ISO 10816-3 / ISO 20816",q:"Anticipa fallas de rodamientos y desalineación semanas antes de la rotura.",tec:["iot","bms"]},
 {id:"term",n:"Temperatura de tableros (termografía continua)",s:"ele",u:"°C",min:28,max:75,lim:60,nm:"NFPA 70B",q:"Detecta conexiones flojas antes de un incendio eléctrico.",tec:["iot","bms","medicion"]},
 {id:"dp",n:"Presión diferencial en filtros HVAC",s:"hvac",u:"Pa",min:60,max:320,lim:250,nm:"ASHRAE 180 · ISO 16890",q:"Cambia filtros cuando lo necesitan, no por calendario.",tec:["bms","iaq"]},
 {id:"co2",n:"CO₂ y humedad interior",s:"hvac",u:"ppm",min:420,max:1400,lim:1000,nm:"ASHRAE 62.1 · ISO 16000",q:"Indica ventilación insuficiente y riesgo de moho (HR > 65 %).",tec:["iaq","bms"]},
 {id:"agua",n:"Caudal nocturno de agua",s:"san",u:"L/h",min:0,max:180,lim:40,nm:"medidores inteligentes",q:"Un consumo nocturno constante delata fugas ocultas.",tec:["medagua","iot"]},
 {id:"hum",n:"Sensores de humedad en cubierta y losas",s:"cub",u:"% HR",min:40,max:98,lim:85,nm:"fabricante",q:"Localiza filtraciones antes de que aparezcan manchas.",tec:["iot"]},
 {id:"corr",n:"Sondas de corrosión en hormigón (costa)",s:"est",u:"µA/cm²",min:0.05,max:1.2,lim:0.5,nm:"ASTM G109 · RILEM",q:"Vigila la velocidad de corrosión del acero en elementos expuestos a sal.",tec:["iot","gemelo"]},
 {id:"asc",n:"Monitoreo remoto de ascensores",s:"asc",u:"viajes/día",min:80,max:900,lim:750,nm:"EN 81-28 · fabricante",q:"Cuenta arranques, fallas de puerta y nivelación para programar servicio.",tec:["ascensores","iot"]},
 {id:"gen",n:"Generador: horas, batería y combustible",s:"ele",u:"V batería",min:11.2,max:13.8,lim:12.2,nm:"NFPA 110",q:"Alerta batería baja y combustible degradado.",tec:["bms","generador"]},
 {id:"kw",n:"Energía por sistema (submedición)",s:"ele",u:"kWh/día",min:300,max:1600,lim:1300,nm:"ISO 50001",q:"Un consumo que sube sin cambio de uso indica equipos degradándose.",tec:["medicion","bms"]}
];

/* Checklist de entrega a operación */
var CK=[
 ["Documentación técnica",[["asb","Planos as-built de arquitectura, estructura e instalaciones (firmados)"],["mem","Memorias técnicas y de cálculo actualizadas"],["esp","Especificaciones técnicas y fichas de materiales instalados"],["bit","Libro de obra y registro de cambios"],["leg","Permiso de construcción, aprobaciones del GAD y del Cuerpo de Bomberos"]]],
 ["Garantías y contratos",[["gar","Listado de garantías por equipo con plazos y garante"],["cc","Responsabilidad del constructor: 5 años por ruina (Código Civil, art. 1937)"],["rec","Actas de recepción provisional y definitiva (obra pública: LOSNCP)"],["ctm","Contratos de mantenimiento: ascensores, HVAC, SCI, generador"]]],
 ["Manuales",[["fab","Manuales de fabricantes (operación y mantenimiento) de cada equipo"],["man","Manual de uso y mantenimiento del edificio para propietario/usuario"],["emr","Plan de emergencia y evacuación aprobado"],["rph","Reglamento interno y declaratoria de propiedad horizontal (si aplica)"]]],
 ["Pruebas y puesta en marcha",[["cmx","Comisionamiento: pruebas de presión, eléctricas, HVAC y SCI documentadas"],["sim","Simulacro inicial y prueba integrada de alarmas"],["agu","Análisis de agua potable (NTE INEN 1108) antes de ocupar"],["ope","Permiso de funcionamiento / licenciamiento (MSP-ACESS en salud)"]]],
 ["Capacitación",[["cap1","Capacitación a administrador y técnicos de operación"],["cap2","Capacitación de brigadas (incendio, evacuación, primeros auxilios)"],["cap3","Entrega de llaves, claves y accesos (registro firmado)"],["rep","Stock inicial de repuestos y materiales de reposición (pintura, piezas de piso)"]]],
 ["Modelo BIM y datos (AIM)",[["lod","Modelo BIM as-built LOD 500 / LOIN de operación"],["aim","AIM — modelo de información del activo (ISO 19650-3)"],["cob","Entrega COBie (Component, Type, Job, Spare)"],["ifc","Archivo IFC abierto + nomenclatura de espacios y equipos con código QR"]]]
];

/* Costo referencial $/m² (estándar medio) por categoría — mismo orden de magnitud que la estación Costos */
var M2REF={RES:550,HOS:900,COM:650,GAS:750,OFI:850,MIX:780,SAL:1350,EDU:650,CUL:1000,REL:700,GOB:800,SEG:850,SOC:600,DEP:750,PUB:120,EVE:950,TRA:1100,IND:420,AGR:300,INF:900,CIE:1400,EFI:400,FUT:1000};
var STDI={eco:0,medio:1,alto:2,lujo:3};
var STDF=[0.7,1,1.26,1.7];
/* RPF: calibración del costo de reposición frente a referencias de renovación (BCIS / BOMA: 1–2 % anual del valor de reposición) */
var RPF=0.4;
var CATF={SAL:1.4,CIE:1.35,HOS:1.25,TRA:1.2,EVE:1.1,CUL:1.1,GAS:1.15,IND:0.9,RES:0.85,AGR:0.7,EFI:0.8};

/* ───────────────────────── modelo ───────────────────────── */
var US={tab:"inv",scroll:{},open:{},mes:null,sfil:"all",fil:"all",lista:"sem",ffil:"all"};

function catOf(ctx){ return (ctx.tipo&&ctx.tipo.cat&&ctx.tipo.cat.c)||"MIX"; }
function mods(ctx){ return (ctx.P&&ctx.P.mods)||{}; }
function rainMonths(ctx){ var z=ctx.clima&&ctx.clima.zona; if(z==="sierra") return [8,5]; if(z==="amazonia") return [6,0]; if(z==="galapagos") return [11,5]; return [10,5]; }
function extDef(ctx){ var z=ctx.clima&&ctx.clima.zona, t=ctx.clima&&ctx.clima.tipo; if(z==="galapagos") return "mar"; if(z==="costa") return (ctx.clima.elev||0)<20?"cos":"hum"; if(z==="amazonia"||t==="calido-humedo") return "hum"; return "tem"; }
var EXT={mar:{n:"Marino < 1 km",f:0.6,d:"Niebla salina directa (ISO 9223 C5): el acero y el aluminio pierden la mitad de su vida"},cos:{n:"Costero 1–10 km",f:0.75,d:"Brisa salina + humedad alta (C4): costa ecuatoriana, estuarios del Guayas"},hum:{n:"Cálido húmedo interior",f:0.85,d:"Humedad > 75 % y lluvias intensas (C3): hongos, moho, corrosión moderada"},tem:{n:"Templado / andino",f:1,d:"Sierra: radiación UV alta y ciclos térmicos; corrosión baja (C2)"}};
var QC={b:{n:"Básica",f:0.9},n:{n:"Normal",f:1},a:{n:"Alta (supervisada)",f:1.1}};
var GM={c:{n:"Solo correctivo",f:0.75},n:{n:"Ocasional",f:0.9},p:{n:"Plan preventivo",f:1.1},pp:{n:"Preventivo + predictivo",f:1.2}};
var USO={a:{n:"Intensivo 24/7",f:0.85},n:{n:"Normal",f:1},b:{n:"Bajo",f:1.1}};

function defState(ctx,sv){
  var cat=catOf(ctx);
  return {
    off:sv.off||{}, ext:sv.ext||extDef(ctx), qc:sv.qc||"n", gm:sv.gm||"p", uso:sv.uso||((cat==="SAL"||cat==="SEG"||cat==="TRA")?"a":"n"),
    vd:sv.vd||((cat==="SAL"||cat==="SEG"||cat==="GOB")?75:cat==="EFI"?25:50), H:sv.H||50, r:sv.r!=null?sv.r:4, fondo:sv.fondo!=null?sv.fondo:100,
    hecho:sv.hecho||{}, ck:sv.ck||{}, conf:sv.conf||{}
  };
}

function buildModel(ctx,st){
  var cat=catOf(ctx), M=mods(ctx), N=(ctx.P&&ctx.P.norm)||{}, pisos=+N.pisos||(+N.altura?Math.round(N.altura/3.5):2);
  var mat=M.materiales||null, tec=M.tecnologia&&M.tecnologia.on?M.tecnologia.on:null, ins=M.instalaciones||null, est=M.estructura||null;
  var zc=ctx.clima&&ctx.clima.zona;
  /* aplicabilidad automática */
  var auto={est:1,cub:1,fac:1,pis:1,pin:1,san:1,ele:1,sci:1,
    hvac:(ins&&ins.pclim!=null?ins.pclim>0:(zc!=="sierra"||/SAL|CIE|OFI|EVE|CUL|TRA|HOS|COM/.test(cat))),
    asc:(pisos>=3||cat==="SAL"||cat==="TRA"||cat==="HOS"||(tec&&(tec.ascensores||tec.montacargas))),
    seg:(cat!=="AGR"&&cat!=="EFI")||!!tec, ver:(ctx.area||0)>0||cat==="PUB", pool:/HOS|DEP/.test(cat),
    esp:!!ESPC[cat]};
  var why={hvac:ins&&ins.pclim!=null?"Instalaciones: "+ins.pclim+" % climatizado":(zc==="costa"?"Clima cálido húmedo":"Tipología"),asc:pisos>=3?pisos+" pisos (normativa)":"Tipología",pool:"Tipología "+cat,esp:ESPC[cat]?ESPC[cat].n:""};
  var rm=rainMonths(ctx), ef=EXT[st.ext]||EXT.hum, G=(GM[st.gm]||GM.p).f, C=(QC[st.qc]||QC.n).f, F=(USO[st.uso]||USO.n).f;
  var systems=[], tasks=[];
  SYS.forEach(function(S0){
    var s={id:S0.id,n:S0.id==="esp"&&ESPC[cat]?ESPC[cat].n:S0.n,c:S0.c,cap:S0.cap,am:S0.am,ref:S0.id==="esp"&&ESPC[cat]?"Según tipología "+(ctx.tipo?ctx.tipo.n:cat):S0.ref,
      auto:!!auto[S0.id],src:{"Tipología":1},comps:[],notes:[]};
    s.on=st.off[s.id]!=null?!st.off[s.id]:s.auto;
    if(why[s.id]&&s.auto) s.why=why[s.id];
    var base=S0.id==="esp"?(ESPC[cat]?ESPC[cat].comps:[]):S0.comps;
    base.forEach(function(c){ s.comps.push({n:c[0],L:c[1],k:c[2],rp:c[3],src:"Tipología"}); });
    systems.push(s);
  });
  var SI={}; systems.forEach(function(s){ SI[s.id]=s; });
  /* estructura elegida */
  if(est&&est.sis){
    var sn={hap:"pórticos de hormigón armado",dual:"sistema dual H.A.",mam:"mampostería confinada",ace:"acero estructural",mix:"mixto acero–hormigón",mad:"madera / CLT",gua:"guadúa",pos:"losas postensadas",cas:"cáscaras de hormigón",ten:"tensoestructura"}[est.sis]||est.sis;
    SI.est.src.Estructura=1; SI.est.comps[0].n="Estructura principal: "+sn; SI.est.comps[0].src="Estructura";
    if(/ace|mix/.test(est.sis)){ SI.est.comps.push({n:"Pintura intumescente / anticorrosiva del acero",L:12,k:1,rp:6,src:"Estructura"}); SI.est.notes.push("Acero: en la costa exige sistema de pintura ISO 12944 C4/C5 y retoque anual."); }
    if(/mad|gua/.test(est.sis)){ SI.est.comps.push({n:"Tratamiento preservante y anti-termitas",L:5,k:0.9,rp:4,src:"Estructura"}); SI.est.notes.push("Madera/guadúa: mantener seca, ventilada y protegida del sol; inspección anual de termitas."); }
    if(est.sis==="ten"){ SI.cub.comps.push({n:"Membrana tensada (PVC/PTFE) y cables",L:20,k:0.7,rp:50,src:"Estructura"}); }
    if(est.sis==="pos") SI.est.notes.push("Postensado: no perforar losas sin escanear los cables (GPR).");
  }
  /* materiales por capa */
  if(mat&&mat.capas){
    Object.keys(mat.capas).forEach(function(cp){
      var sid=CAPSYS[cp]; if(!sid||!SI[sid]) return;
      (mat.capas[cp]||[]).forEach(function(id){
        var pre=String(id).split("-")[0], f=MATF[pre]; if(!f) return;
        var nm=String(id).split("-").slice(1).join(" ")||id;
        SI[sid].src.Materiales=1;
        SI[sid].notes.push(f[0]+" ("+nm+"): "+f[1]);
        if(f[2]>=0.8&&sid!=="est") SI.pin.src.Materiales=1;
      });
    });
  }
  /* instalaciones */
  if(ins){
    SI.san.src.Instalaciones=1;
    SI.san.comps[0].n=ins.tq==="elev"?"Bombas de elevación a tanque elevado":"Sistema hidroneumático (bombas + tanque de presión)";
    if(ins.tq==="elev") SI.san.comps.push({n:"Tanque elevado",L:25,k:0.6,rp:6,src:"Instalaciones"});
    if(ins.dias) SI.san.notes.push("Reserva de agua de "+ins.dias+" día(s): lavar y desinfectar la cisterna cada 6 meses.");
    if(+ins.gp>0){ SI.ele.src.Instalaciones=1; SI.ele.comps.push({n:"Generador de emergencia ("+ins.gp+" % de la carga)",L:25,k:0.5,rp:20,src:"Instalaciones"}); }
    if(ins.roc===true||(ins.roc==null&&(cat==="SAL"||pisos>4))){ SI.sci.src.Instalaciones=1; SI.sci.comps.push({n:"Red de rociadores y bomba contra incendios",L:40,k:0.3,rp:15,src:"Instalaciones"}); }
    if(ins.pclim!=null) SI.hvac.src.Instalaciones=1;
  } else {
    if(cat==="SAL"||cat==="SEG"||cat==="TRA"||cat==="CIE"||pisos>4) SI.ele.comps.push({n:"Generador de emergencia",L:25,k:0.5,rp:20,src:"Tipología"});
    if(cat==="SAL"||pisos>4||cat==="EVE") SI.sci.comps.push({n:"Red de rociadores y bomba contra incendios",L:40,k:0.3,rp:15,src:"Tipología"});
  }
  /* tecnología */
  var tecTasks=[];
  if(tec){
    Object.keys(tec).forEach(function(id){
      if(!tec[id]) return; var m=TECM[id]; if(!m||!SI[m.s]) return;
      var s=SI[m.s]; s.src["Tecnología"]=1;
      if(!s.comps.some(function(c){ return c.n===m.n; })) s.comps.push({n:m.n,L:m.L,k:0.3,rp:6,src:"Tecnología"});
      if(m.t&&m.t!=="—") tecTasks.push(m.s+"|"+m.t+"|"+m.f+"|T|"+m.nm+(m.mo?"|"+m.mo:""));
      if(id==="generador"&&!s.comps.some(function(c){return /Generador/.test(c.n);})) s.comps.push({n:"Generador de emergencia",L:25,k:0.5,rp:20,src:"Tecnología"});
    });
  }
  /* generador: tareas solo si existe */
  var hasGen=SI.ele.comps.some(function(c){ return /Generador/.test(c.n); });
  var hasRoc=SI.sci.comps.some(function(c){ return /rociadores/.test(c.n); });
  var extra=[];
  if(hasGen) extra=extra.concat(["ele|Generador: arranque semanal en vacío 30 min; niveles de combustible, aceite, refrigerante y baterías|S|A|NFPA 110 · fabricante","ele|Generador: prueba con carga ≥ 30 % y transferencia automática|M|T|NFPA 110","ele|Generador: cambio de aceite y filtros (250 h o anual) y análisis del combustible|A|T|fabricante · NFPA 110"]);
  if(hasRoc) extra=extra.concat(["sci|Bomba contra incendios: arranque semanal (diésel 30 min / eléctrica 10 min)|S|T|NFPA 25","sci|Rociadores: válvulas, manómetros y prueba de drenaje principal|T|T|NFPA 25","sci|Prueba anual de caudal de la bomba contra incendios|A|T|NFPA 25"]);
  if(ESPC[cat]) extra=extra.concat(ESPC[cat].tasks.map(function(t){ return "esp|"+t; }));
  /* vida útil ajustada (ISO 15686-8, método factorial simplificado) */
  systems.forEach(function(s){
    s.comps.forEach(function(c){
      var e=1-c.k*(1-ef.f);
      c.Lr=Math.max(2,Math.round(c.L*e*C*F*G));
      c.Ln=Math.max(2,Math.round(c.L*e*C*F*0.75));
      c.fac=e*C*F*G;
    });
    s.Lmin=s.comps.length?Math.min.apply(null,s.comps.map(function(c){return c.Lr;})):0;
  });
  /* tareas */
  var idx=0;
  TASKS_RAW.concat(extra,tecTasks).forEach(function(l){
    var a=l.split("|"); var s=SI[a[0]]; if(!s) return;
    var t={id:"t"+(hash(l)%1e7).toString(36),s:a[0],t:a[1],f:a[2],r:a[3],nm:a[4]||"—",i:idx++};
    var mo=a[5], o=hash(l);
    if(t.f==="D"||t.f==="S"||t.f==="M") t.m=[0,1,2,3,4,5,6,7,8,9,10,11];
    else if(t.f==="E") t.m=[];
    else if(mo==="LL0"||mo==="LL1"){ t.m=[mo==="LL0"?rm[0]:rm[1]]; if(t.f==="Se") t.m.push((t.m[0]+6)%12); if(t.f==="T") t.m=[0,3,6,9].map(function(k){ return (k+t.m[0])%12; }); }
    else if(mo!=null&&mo!=="") t.m=mo.split(",").map(Number);
    else if(t.f==="T"){ var q=o%3; t.m=[q,q+3,q+6,q+9]; }
    else if(t.f==="Se"){ var h=o%6; t.m=[h,h+6]; }
    else t.m=[o%12];
    t.m.sort(function(x,y){return x-y;});
    t.w=o%4;
    tasks.push(t);
  });
  var on=systems.filter(function(s){ return s.on; }), onI={}; on.forEach(function(s){ onI[s.id]=1; });
  var tOn=tasks.filter(function(t){ return onI[t.s]; });
  return {cat:cat,systems:systems,SI:SI,on:on,tasks:tOn,tasksAll:tasks,ef:ef,rm:rm,pisos:pisos,hasGen:hasGen};
}

function costModel(ctx,st,md){
  var M=mods(ctx), cs=M.costos, cat=md.cat, N=(ctx.P&&ctx.P.norm)||{};
  var cus=+N.cus||1.2, Amax=Math.round((ctx.area||1000)*cus), src="estimado", A=Amax, m2=M2REF[cat]||800, obra;
  if(cs&&(cs.std||cs.m2!=null||cs.pct!=null)){
    A=Math.max(1,Math.round(Amax*((cs.pct!=null?cs.pct:100)/100)));
    m2=cs.m2!=null?+cs.m2:Math.round((M2REF[cat]||800)*STDF[STDI[cs.std]!=null?STDI[cs.std]:1]);
    obra=A*m2*(1+((cs.ind!=null?cs.ind:20)/100)); src="Ingeniería de costos";
  } else obra=A*m2*1.2;
  var kf=CATF[cat]||1, gm=st.gm==="c"?0.6:st.gm==="n"?0.8:st.gm==="pp"?1.08:1;
  var rows=md.on.map(function(s){
    var cap=obra*s.cap/100, ann=cap*s.am/100*kf*gm, rep=0;
    s.comps.forEach(function(c){ rep+=cap*c.rp*RPF/100/Math.max(1,c.Lr); });
    return {s:s,cap:cap,ann:ann,rep:rep};
  });
  var ann=rows.reduce(function(a,r){return a+r.ann;},0), rep=rows.reduce(function(a,r){return a+r.rep;},0);
  /* serie de ciclo de vida */
  var H=st.H, r=st.r/100, ser=[], pv=0, nom=0, pvM=0, pvR=0;
  for(var y=1;y<=H;y++){
    var R=0;
    rows.forEach(function(rw){ rw.s.comps.forEach(function(c){ if(c.rp>0&&y%c.Lr===0&&y<H) R+=rw.cap*c.rp*RPF/100; }); });
    var d=Math.pow(1+r,y), m=ann;
    pvM+=m/d; pvR+=R/d; nom+=m+R;
    ser.push({y:y,m:m,R:R,pv:obra+pvM+pvR});
  }
  pv=obra+pvM+pvR;
  /* fondo de reserva: anualidad de reemplazos vs. fórmula de Peters (Alemania) */
  var peters=(obra/A)*1.5/80*0.7*A;
  var fondo=Math.max(rep,peters)*st.fondo/100;
  return {A:A,Amax:Amax,m2:m2,obra:obra,src:src,rows:rows,ann:ann,rep:rep,ser:ser,pv:pv,pvM:pvM,pvR:pvR,nom:nom,peters:peters,fondo:fondo,kf:kf};
}

/* ───────────────────────── CSS ───────────────────────── */
function cssText(){
  var C="linear-gradient(var(--c),var(--c))";
  return "."+P+"{container-type:inline-size;position:relative;height:100%;min-height:420px;display:flex;flex-direction:column;overflow:hidden;color:var(--ink);font-family:var(--f-b);font-size:14px;line-height:1.4;"+
  "background:radial-gradient(ellipse at 12% -10%,rgba(var(--acc-rgb),.10),transparent 55%),radial-gradient(ellipse at 100% 110%,rgba(var(--done-rgb),.06),transparent 50%),linear-gradient(rgba(var(--acc-rgb),.035) 1px,transparent 1px) 0 0/100% 28px,linear-gradient(90deg,rgba(var(--acc-rgb),.035) 1px,transparent 1px) 0 0/28px 100%,var(--bg)}"+
  "."+P+" *{box-sizing:border-box}:where(."+P+") button{font:inherit;color:inherit}"+
  "."+P+"-top{flex:none;display:flex;align-items:center;gap:6px;padding:8px 10px;border-bottom:1px solid var(--line2);background:linear-gradient(180deg,rgba(var(--acc-rgb),.07),rgba(3,8,14,.75));overflow-x:auto;scrollbar-width:none}."+P+"-top::-webkit-scrollbar{display:none}"+
  "."+P+"-tab{flex:none;min-height:40px;padding:0 13px;border:1px solid var(--line);background:rgba(3,8,14,.4);color:var(--muted);font-family:var(--f-d);font-size:9.5px;letter-spacing:.15em;text-transform:uppercase;cursor:pointer;white-space:nowrap;clip-path:polygon(9px 0,100% 0,100% calc(100% - 9px),calc(100% - 9px) 100%,0 100%,0 9px);transition:.2s}"+
  "."+P+"-tab:hover{color:var(--ink);border-color:var(--line2)}"+
  "."+P+"-tab[aria-selected=true]{color:var(--acc);border-color:var(--acc);background:rgba(var(--acc-rgb),.12);box-shadow:inset 0 0 14px rgba(var(--acc-rgb),.25);text-shadow:0 0 8px rgba(var(--acc-rgb),.6)}"+
  "."+P+"-fin{flex:none;margin-left:auto;min-height:40px;padding:0 16px;border:1px solid var(--done);background:rgba(var(--done-rgb),.08);color:var(--done);font-family:var(--f-d);font-size:9.5px;letter-spacing:.15em;text-transform:uppercase;cursor:pointer;white-space:nowrap;box-shadow:0 0 14px rgba(var(--done-rgb),.2)}"+
  "."+P+"-fin:hover{background:rgba(var(--done-rgb),.18)}"+
  "."+P+"-main{flex:1;min-height:0;overflow:auto;padding:12px;scrollbar-width:thin;scrollbar-color:rgba(var(--acc-rgb),.35) transparent}"+
  "."+P+"-card{--c:rgba(var(--acc-rgb),.85);position:relative;background:"+C+" 0 0/12px 1px no-repeat,"+C+" 0 0/1px 12px no-repeat,"+C+" 100% 0/12px 1px no-repeat,"+C+" 100% 0/1px 12px no-repeat,"+C+" 0 100%/12px 1px no-repeat,"+C+" 0 100%/1px 12px no-repeat,"+C+" 100% 100%/12px 1px no-repeat,"+C+" 100% 100%/1px 12px no-repeat,var(--glass);border:1px solid var(--line);padding:12px;margin-bottom:10px}"+
  "."+P+"-h{font-family:var(--f-d);font-size:10.5px;letter-spacing:.18em;text-transform:uppercase;color:var(--acc);margin:0 0 8px;text-shadow:0 0 10px rgba(var(--acc-rgb),.45);display:flex;align-items:center;gap:8px;flex-wrap:wrap}"+
  "."+P+"-h2{font-family:var(--f-d);font-size:12px;letter-spacing:.12em;text-transform:uppercase;color:var(--ink);margin:0 0 6px}"+
  "."+P+"-mono{font-family:var(--f-m)}."+P+"-mut{color:var(--muted)}."+P+"-fnt{color:var(--faint);font-size:12px}"+
  "."+P+"-p{margin:0 0 8px;color:var(--muted);font-size:13px}"+
  "."+P+"-btn{min-height:40px;padding:0 14px;border:1px solid var(--line2);background:rgba(var(--acc-rgb),.06);color:var(--ink);cursor:pointer;font-family:var(--f-d);font-size:9.5px;letter-spacing:.13em;text-transform:uppercase;transition:.15s;display:inline-flex;align-items:center;justify-content:center;gap:8px}"+
  "."+P+"-btn:hover{border-color:var(--acc);color:var(--acc);box-shadow:0 0 12px rgba(var(--acc-rgb),.2)}"+
  "."+P+"-btn.ok{border-color:var(--done);color:var(--done)}"+
  "."+P+"-chips{display:flex;gap:6px;flex-wrap:wrap;padding:2px 0 6px}"+
  "."+P+"-chips.sc{flex-wrap:nowrap;overflow-x:auto;scrollbar-width:thin}"+
  "."+P+"-chip{flex:none;min-height:40px;padding:0 13px;border-radius:20px;border:1px solid var(--line);background:rgba(3,8,14,.5);color:var(--muted);cursor:pointer;font-size:12.5px;white-space:nowrap;display:inline-flex;align-items:center;gap:6px;transition:.15s}"+
  "."+P+"-chip:hover{color:var(--ink);border-color:var(--line2)}"+
  "."+P+"-chip.on{border-color:var(--acc);color:var(--acc);background:rgba(var(--acc-rgb),.12);box-shadow:0 0 10px rgba(var(--acc-rgb),.2)}"+
  "."+P+"-chip i{width:8px;height:8px;border-radius:50%;display:inline-block}"+
  "."+P+"-rng{width:100%;height:40px;accent-color:var(--acc);background:transparent;cursor:pointer}"+
  "."+P+"-pv{display:inline-flex;align-items:center;gap:6px;border:1px solid var(--warn);color:var(--warn);font-family:var(--f-m);font-size:10px;letter-spacing:.1em;padding:2px 7px;background:rgba(255,92,122,.08);text-transform:uppercase}"+
  "."+P+"-okt{display:inline-flex;align-items:center;gap:6px;border:1px solid var(--done);color:var(--done);font-family:var(--f-m);font-size:10px;letter-spacing:.1em;padding:2px 7px;text-transform:uppercase}"+
  "."+P+"-pre{display:inline-flex;align-items:center;gap:6px;border:1px solid rgba(var(--acc-rgb),.6);color:var(--acc);font-family:var(--f-m);font-size:10px;letter-spacing:.12em;padding:2px 7px;text-transform:uppercase;background:rgba(var(--acc-rgb),.06)}"+
  "."+P+"-warnbox{border-color:var(--warn)!important;box-shadow:0 0 0 1px rgba(255,92,122,.15),inset 0 0 18px rgba(255,92,122,.06)}"+
  "."+P+"-kpis{display:grid;grid-template-columns:repeat(auto-fit,minmax(150px,1fr));gap:8px;margin-bottom:10px}"+
  "."+P+"-kpi{border:1px solid var(--line);background:rgba(3,8,14,.55);padding:10px 12px;position:relative;overflow:hidden}"+
  "."+P+"-kpi::after{content:'';position:absolute;left:0;top:0;width:3px;height:100%;background:var(--k,var(--acc));box-shadow:0 0 10px var(--k,var(--acc))}"+
  "."+P+"-kpi b{display:block;font-family:var(--f-m);font-size:19px;color:var(--ink);font-weight:600;margin-top:2px}"+
  "."+P+"-kpi span{font-family:var(--f-d);font-size:8.5px;letter-spacing:.16em;color:var(--muted);text-transform:uppercase}"+
  "."+P+"-kpi i{font-style:normal;font-size:11px;color:var(--faint);display:block}"+
  "."+P+"-row{display:flex;gap:8px;align-items:center;flex-wrap:wrap}."+P+"-sp{flex:1}"+
  "."+P+"-scan{pointer-events:none;position:absolute;inset:0;background:linear-gradient(180deg,transparent 0,rgba(var(--acc-rgb),.06) 50%,transparent 100%);background-size:100% 220px;animation:"+P+"-scan 7s linear infinite;mix-blend-mode:screen}"+
  "@keyframes "+P+"-scan{0%{background-position:0 -220px}100%{background-position:0 calc(100% + 220px)}}"+
  "@keyframes "+P+"-pulse{0%,100%{opacity:.35}50%{opacity:1}}"+
  "@keyframes "+P+"-rot{to{transform:rotate(360deg)}}"+
  "."+P+"-g{flex:none;filter:drop-shadow(0 0 3px rgba(var(--acc-rgb),.55))}"+
  /* inventario */
  "."+P+"-sg{display:grid;grid-template-columns:repeat(auto-fill,minmax(260px,1fr));gap:10px}"+
  "."+P+"-sc{margin:0;display:flex;flex-direction:column;gap:8px;transition:.2s}"+
  "."+P+"-sc.off{opacity:.45;filter:saturate(.3)}"+
  "."+P+"-sh{display:flex;gap:10px;align-items:center}"+
  "."+P+"-ico{width:44px;height:44px;flex:none;display:grid;place-items:center;border:1px solid var(--sc);color:var(--sc);background:radial-gradient(circle,rgba(255,255,255,.06),transparent 70%);clip-path:polygon(8px 0,100% 0,100% calc(100% - 8px),calc(100% - 8px) 100%,0 100%,0 8px)}"+
  "."+P+"-ico svg{filter:drop-shadow(0 0 4px var(--sc))}"+
  "."+P+"-sw{flex:none;width:58px;height:40px;border:1px solid var(--line2);background:rgba(0,0,0,.35);border-radius:20px;position:relative;cursor:pointer;padding:0}"+
  "."+P+"-sw::after{content:'';position:absolute;top:7px;left:7px;width:24px;height:24px;border-radius:50%;background:var(--faint);transition:.2s}"+
  "."+P+"-sw[aria-pressed=true]{border-color:var(--done);box-shadow:0 0 10px rgba(var(--done-rgb),.3)}"+
  "."+P+"-sw[aria-pressed=true]::after{left:25px;background:var(--done);box-shadow:0 0 10px var(--done)}"+
  "."+P+"-src{display:flex;gap:4px;flex-wrap:wrap}"+
  "."+P+"-src span{font-family:var(--f-m);font-size:9.5px;letter-spacing:.06em;padding:2px 6px;border:1px solid var(--line2);color:var(--muted);text-transform:uppercase}"+
  "."+P+"-src span.x{border-color:rgba(var(--done-rgb),.6);color:var(--done)}"+
  "."+P+"-cl{list-style:none;margin:0;padding:0;font-size:12.5px}"+
  "."+P+"-cl li{display:grid;grid-template-columns:1fr auto;gap:2px 8px;padding:6px 0;border-bottom:1px dashed rgba(120,200,255,.1)}"+
  "."+P+"-cl li b{font-family:var(--f-m);font-weight:500;color:var(--acc)}"+
  "."+P+"-cl li small{grid-column:1/-1;color:var(--faint);font-size:11px}"+
  "."+P+"-note{font-size:12px;color:var(--muted);border-left:2px solid var(--done);padding:4px 8px;margin:4px 0;background:rgba(var(--done-rgb),.04)}"+
  "."+P+"-more{min-height:40px;width:100%;border:1px dashed var(--line2);background:transparent;color:var(--muted);cursor:pointer;font-family:var(--f-d);font-size:9px;letter-spacing:.14em;text-transform:uppercase}"+
  "."+P+"-more:hover{color:var(--acc);border-color:var(--acc)}"+
  /* vida útil */
  "."+P+"-fx{display:grid;grid-template-columns:repeat(auto-fit,minmax(240px,1fr));gap:10px}"+
  "."+P+"-vl{display:grid;grid-template-columns:minmax(150px,240px) 1fr 64px;gap:4px 10px;align-items:center;font-size:12.5px;padding:3px 0}"+
  "."+P+"-vl .n{overflow:hidden;text-overflow:ellipsis;white-space:nowrap}"+
  "."+P+"-vl .v{font-family:var(--f-m);text-align:right;color:var(--ink)}"+
  "."+P+"-vt{position:relative;height:16px;background:rgba(var(--acc-rgb),.05);border:1px solid rgba(120,200,255,.08)}"+
  "."+P+"-vt i{position:absolute;top:2px;bottom:2px;left:0;background:linear-gradient(90deg,rgba(var(--acc-rgb),.25),var(--vc,var(--acc)));box-shadow:0 0 8px var(--vc,var(--acc))}"+
  "."+P+"-vt s{position:absolute;top:-2px;bottom:-2px;width:1px;background:rgba(255,255,255,.55)}"+
  "."+P+"-vt u{position:absolute;top:0;bottom:0;width:2px;background:var(--warn);box-shadow:0 0 6px var(--warn)}"+
  "."+P+"-vt em{position:absolute;top:50%;width:5px;height:5px;margin:-2.5px 0 0 -2.5px;transform:rotate(45deg);background:var(--bg);border:1px solid #FFC24B}"+
  "."+P+"-vh{font-family:var(--f-d);font-size:9px;letter-spacing:.16em;color:var(--sc);text-transform:uppercase;margin:12px 0 4px;display:flex;align-items:center;gap:6px}"+
  /* calendario */
  "."+P+"-cal{display:grid;grid-template-columns:minmax(300px,420px) 1fr;gap:12px;align-items:start}"+
  "."+P+"-wh svg{width:100%;height:auto;display:block;touch-action:manipulation}"+
  "."+P+"-wh .sec{cursor:pointer;transition:.15s}"+
  "."+P+"-wh .sec:hover{fill:rgba(56,225,255,.10)}"+
  "."+P+"-hand{transform-origin:0 0;animation:"+P+"-pulse 2.4s ease-in-out infinite}"+
  "."+P+"-ring{transform-origin:0 0;animation:"+P+"-rot 60s linear infinite}"+
  "."+P+"-gt{overflow-x:auto}"+
  "."+P+"-gt table{border-collapse:separate;border-spacing:2px;width:100%;min-width:520px;font-size:11px}"+
  "."+P+"-gt th{font-family:var(--f-d);font-size:8px;letter-spacing:.12em;color:var(--muted);font-weight:400;text-transform:uppercase;padding:3px}"+
  "."+P+"-gt th.s{text-align:left;white-space:nowrap;max-width:150px;overflow:hidden;text-overflow:ellipsis}"+
  "."+P+"-gt td{height:30px;text-align:center;font-family:var(--f-m);cursor:pointer;border:1px solid rgba(120,200,255,.08)}"+
  "."+P+"-gt td.cur{outline:1px solid var(--acc);box-shadow:0 0 8px rgba(var(--acc-rgb),.5)}"+
  "."+P+"-tl{list-style:none;margin:0;padding:0}"+
  "."+P+"-tk{display:grid;grid-template-columns:44px 1fr;gap:4px 10px;align-items:start;padding:6px 0;border-bottom:1px dashed rgba(120,200,255,.1)}"+
  "."+P+"-cb{width:40px;height:40px;border:1px solid var(--line2);background:rgba(0,0,0,.35);cursor:pointer;display:grid;place-items:center;color:transparent;padding:0;clip-path:polygon(7px 0,100% 0,100% calc(100% - 7px),calc(100% - 7px) 100%,0 100%,0 7px)}"+
  "."+P+"-cb[aria-pressed=true]{border-color:var(--done);color:var(--done);background:rgba(var(--done-rgb),.12);box-shadow:inset 0 0 10px rgba(var(--done-rgb),.3)}"+
  "."+P+"-tk .tt{font-size:13px}"+
  "."+P+"-tk.dn .tt{color:var(--faint);text-decoration:line-through}"+
  "."+P+"-tk .mt{display:flex;gap:6px;flex-wrap:wrap;font-family:var(--f-m);font-size:10px;color:var(--faint);margin-top:3px}"+
  "."+P+"-tg{border:1px solid currentColor;padding:1px 5px;letter-spacing:.06em}"+
  "."+P+"-prog{height:6px;background:rgba(var(--done-rgb),.1);position:relative;overflow:hidden;margin:6px 0}"+
  "."+P+"-prog i{position:absolute;inset:0 auto 0 0;background:linear-gradient(90deg,rgba(var(--done-rgb),.4),var(--done));box-shadow:0 0 8px var(--done)}"+
  /* fallas y sensores */
  "."+P+"-fg{display:grid;grid-template-columns:repeat(auto-fill,minmax(280px,1fr));gap:10px}"+
  "."+P+"-fc{margin:0}"+
  "."+P+"-fc dl{display:grid;grid-template-columns:auto 1fr;gap:4px 8px;margin:6px 0 0;font-size:12.5px}"+
  "."+P+"-fc dt{font-family:var(--f-d);font-size:7.5px;letter-spacing:.14em;color:var(--faint);text-transform:uppercase;padding-top:3px}"+
  "."+P+"-fc dd{margin:0;color:var(--muted)}"+
  "."+P+"-p1{color:var(--warn)}."+P+"-p2{color:#FFC24B}."+P+"-p3{color:var(--acc)}"+
  "."+P+"-sn svg{width:100%;height:60px;display:block}"+
  /* costos */
  "."+P+"-cg{display:grid;grid-template-columns:1fr 1fr;gap:10px}"+
  "."+P+"-br{display:grid;grid-template-columns:minmax(110px,190px) 1fr 82px;gap:6px 10px;align-items:center;font-size:12px;padding:3px 0}"+
  "."+P+"-br .t{height:14px;background:rgba(var(--acc-rgb),.05);position:relative}"+
  "."+P+"-br .t i{position:absolute;inset:2px auto 2px 0}"+
  "."+P+"-br .t i+i{box-shadow:0 0 6px currentColor}"+
  "."+P+"-br b{font-family:var(--f-m);font-weight:500;text-align:right}"+
  "."+P+"-lcc svg{width:100%;height:auto;display:block}"+
  "."+P+"-sl label{display:flex;justify-content:space-between;font-size:12px;color:var(--muted)}"+
  "."+P+"-sl b{font-family:var(--f-m);color:var(--acc)}"+
  /* manual y entrega */
  "."+P+"-dg{display:grid;grid-template-columns:repeat(auto-fill,minmax(220px,1fr));gap:10px}"+
  "."+P+"-dl{margin:0;display:flex;flex-direction:column;gap:8px;min-height:150px}"+
  "."+P+"-dl .btn{margin-top:auto}"+
  "."+P+"-toc{columns:2 260px;column-gap:20px;font-size:12.5px;color:var(--muted);margin:0;padding-left:18px}"+
  "."+P+"-toc li{margin:3px 0;break-inside:avoid}."+P+"-toc li::marker{color:var(--acc);font-family:var(--f-m)}"+
  "."+P+"-ckg{display:grid;grid-template-columns:repeat(auto-fill,minmax(300px,1fr));gap:10px}"+
  "."+P+"-ci{display:grid;grid-template-columns:44px 1fr;gap:8px;align-items:center;padding:4px 0;font-size:13px;border-bottom:1px dashed rgba(120,200,255,.08)}"+
  "."+P+"-ci.dn span{color:var(--muted)}"+
  "."+P+"-ring2 svg{width:120px;height:120px}"+
  "."+P+"-end{display:flex;flex-direction:column;align-items:center;gap:10px;padding:18px;text-align:center}"+
  "."+P+"-big{min-height:56px;padding:0 28px;border:1px solid var(--done);background:linear-gradient(90deg,rgba(var(--done-rgb),.12),rgba(var(--acc-rgb),.12));color:var(--done);font-family:var(--f-d);font-size:12px;letter-spacing:.2em;text-transform:uppercase;cursor:pointer;box-shadow:0 0 22px rgba(var(--done-rgb),.35),inset 0 0 14px rgba(var(--done-rgb),.2)}"+
  "."+P+"-big:hover{background:rgba(var(--done-rgb),.22)}"+
  "."+P+"-fq{display:grid;grid-template-columns:repeat(7,1fr);gap:6px;margin-bottom:10px}"+
  "."+P+"-fq div{border:1px solid var(--line);border-top:2px solid var(--k);background:rgba(3,8,14,.55);padding:6px 8px;box-shadow:inset 0 8px 14px -12px var(--k)}"+
  "."+P+"-fq b{display:block;font-family:var(--f-m);font-size:17px;font-weight:600}"+
  "."+P+"-fq span{font-family:var(--f-d);font-size:7.5px;letter-spacing:.12em;color:var(--muted);text-transform:uppercase}"+
  "@container (max-width:760px){."+P+"-cal{grid-template-columns:1fr}."+P+"-cg{grid-template-columns:1fr}}"+
  "@container (max-width:560px){."+P+"-main{padding:8px}."+P+"-vl{grid-template-columns:1fr 52px}."+P+"-vl .n{grid-column:1/-1;white-space:normal}."+P+"-vl .v{grid-column:2}."+P+"-br{grid-template-columns:1fr 76px}."+P+"-br .n{grid-column:1/-1}."+P+"-sg,."+P+"-fg,."+P+"-ckg{grid-template-columns:1fr}."+P+"-kpi b{font-size:16px}."+P+"-fq{grid-template-columns:repeat(4,1fr)}."+P+"-fin{font-size:8.5px;padding:0 10px}}"+
  "@media (prefers-reduced-motion:reduce){."+P+"-scan,."+P+"-hand,."+P+"-ring{animation:none}}";
}

/* ───────────────────────── módulo ───────────────────────── */
DM.mantenimiento={
  titulo:"Mantenimiento de la edificación",
  sub:"Operación, vida útil, plan preventivo y manual de uso",
  render:function(el,ctx){
    if(!document.getElementById("mod-mantenimiento-css")){ var stl=document.createElement("style"); stl.id="mod-mantenimiento-css"; stl.textContent=cssText(); document.head.appendChild(stl); }
    var sv=ctx.get("mantenimiento")||{};
    var st=defState(ctx,sv);
    var md, cm;
    function recompute(){ md=buildModel(ctx,st); cm=costModel(ctx,st,md); }
    recompute();
    var save=debounce(function(){
      var res={sistemas:md.on.map(function(s){return s.id;}),tareas:md.tasks.length,mantAnual:Math.round(cm.ann),reemplazoAnual:Math.round(cm.rep),fondoAnual:Math.round(cm.fondo),lcc:Math.round(cm.pv),horizonte:st.H,vidaDiseno:st.vd,entrega:ckPct()};
      var o=clone(st); o.resumen=res;
      Promise.resolve(ctx.set("mantenimiento",o)).catch(function(){ ctx.toast("No se pudo guardar el mantenimiento"); });
    },600);
    function ch(){ recompute(); save(); }

    el.innerHTML="";
    var root=document.createElement("div"); root.className=P; el.appendChild(root);
    var TABS=[["inv","1 · Inventario"],["vida","2 · Vida útil"],["plan","3 · Plan preventivo"],["corr","4 · Correctivo y predictivo"],["cost","5 · Costos"],["man","6 · Manual y COBie"],["ent","7 · Entrega"]];
    if(!TABS.some(function(t){return t[0]===US.tab;})) US.tab="inv";
    function top(){ return '<div class="'+P+'-top" role="tablist">'+TABS.map(function(t){ return '<button class="'+P+'-tab" role="tab" data-act="tab" data-v="'+t[0]+'" aria-selected="'+(t[0]===US.tab)+'">'+t[1]+'</button>'; }).join("")+'<button class="'+P+'-fin" data-act="fin">Proyecto completo ✓</button></div>'; }
    root.innerHTML=top()+'<div class="'+P+'-main"></div><div class="'+P+'-scan"></div>';
    var main=root.querySelector("."+P+"-main");
    main.addEventListener("scroll",function(){ US.scroll[US.tab]=main.scrollTop; },{passive:true});

    var now=new Date(), curM=now.getMonth(), curY=now.getFullYear(), curW=Math.min(3,Math.floor((now.getDate()-1)/7));
    if(US.mes==null) US.mes=curM;
    function wk(){ var d=new Date(Date.UTC(curY,now.getMonth(),now.getDate())); var dn=d.getUTCDay()||7; d.setUTCDate(d.getUTCDate()+4-dn); var y0=new Date(Date.UTC(d.getUTCFullYear(),0,1)); return d.getUTCFullYear()+"-S"+Math.ceil(((d-y0)/864e5+1)/7); }
    function pkey(t,m){ return (t.f==="D"||t.f==="S")?wk():(curY+"-"+(m!=null?m:curM)); }
    function isDone(t,m){ return !!st.hecho[pkey(t,m)+"|"+t.id]; }
    function ckPct(){ var n=0,d=0; CK.forEach(function(g){ g[1].forEach(function(i){ n++; if(st.ck[i[0]]) d++; }); }); return n?Math.round(d/n*100):0; }
    function pre(txt){ return '<span class="'+P+'-pre">PREDISEÑO · '+E(txt)+'</span>'; }
    function verif(k,lab){ return st.conf[k]?'<span class="'+P+'-okt">'+gly("check",12)+' '+E(lab||"Confirmado")+'</span>':'<span class="'+P+'-pv">'+gly("warn",12)+' POR VERIFICAR</span><button class="'+P+'-btn" data-act="conf" data-v="'+k+'">'+gly("check",14)+' Confirmar</button>'; }
    function sysChip(id,cur,act){ var s=md.SI[id]; return '<button class="'+P+'-chip'+(cur===id?' on':'')+'" data-act="'+act+'" data-v="'+id+'"><i style="background:'+s.c+';box-shadow:0 0 6px '+s.c+'"></i>'+E(s.n)+'</button>'; }
    function sysChips(cur,act){ return '<div class="'+P+'-chips sc"><button class="'+P+'-chip'+(cur==="all"?' on':'')+'" data-act="'+act+'" data-v="all">Todos</button>'+md.on.map(function(s){ return sysChip(s.id,cur,act); }).join("")+'</div>'; }

    /* ── 1 · Inventario ── */
    function vInv(){
      var nC=md.on.reduce(function(a,s){return a+s.comps.length;},0), M=mods(ctx);
      var srcs=[["Materiales",!!(M.materiales&&M.materiales.capas)],["Estructura",!!(M.estructura&&M.estructura.sis)],["Instalaciones",!!M.instalaciones],["Tecnología",!!(M.tecnologia&&M.tecnologia.on)],["Costos",!!M.costos]];
      var s='<div class="'+P+'-card"><div class="'+P+'-h">'+gly("book",16)+' Inventario de componentes y sistemas</div>'+
        '<p class="'+P+'-p">Base del plan de mantenimiento: <b>qué</b> hay en el edificio y <b>dónde</b>. Prellenado según la tipología <b>'+E(ctx.tipo?ctx.tipo.n:"—")+'</b> ('+E(md.cat)+') y lo elegido en otras estaciones. Activa o apaga sistemas con el interruptor.</p>'+
        '<div class="'+P+'-kpis"><div class="'+P+'-kpi"><span>Sistemas activos</span><b>'+md.on.length+' / '+md.systems.length+'</b><i>ISO 41001 · inventario de activos</i></div>'+
        '<div class="'+P+'-kpi"><span>Componentes</span><b>'+nC+'</b><i>se exportan a COBie «Component/Type»</i></div>'+
        '<div class="'+P+'-kpi"><span>Tareas preventivas</span><b>'+md.tasks.length+'</b><i>'+md.tasks.filter(function(t){return t.r==="T";}).length+' requieren técnico</i></div>'+
        '<div class="'+P+'-kpi" style="--k:var(--done)"><span>Datos de otras salas</span><b>'+srcs.filter(function(x){return x[1];}).length+' / 5</b><i>'+srcs.map(function(x){return (x[1]?"● ":"○ ")+x[0];}).join(" · ")+'</i></div></div>'+
        (srcs.some(function(x){return !x[1];})?'<div class="'+P+'-chips sc">'+srcs.filter(function(x){return !x[1];}).map(function(x){ var k={Materiales:"materiales",Estructura:"estructura",Instalaciones:"instalaciones","Tecnología":"tecnologia",Costos:"costos"}[x[0]]; return '<button class="'+P+'-chip" data-act="open" data-v="'+k+'">Completar '+E(x[0])+' →</button>'; }).join("")+'</div>':'')+
        '</div><div class="'+P+'-sg">';
      md.systems.forEach(function(sy){
        var op=!!US.open[sy.id], cs=op?sy.comps:sy.comps.slice(0,3);
        s+='<div class="'+P+'-card '+P+'-sc'+(sy.on?'':' off')+'" style="--sc:'+sy.c+';--c:'+sy.c+'">'+
          '<div class="'+P+'-sh"><div class="'+P+'-ico">'+gly(sy.id,24,sy.c)+'</div><div style="flex:1;min-width:0"><div class="'+P+'-h2" style="margin:0">'+E(sy.n)+'</div><div class="'+P+'-fnt '+P+'-mono">'+sy.comps.length+' comp. · vida mín. '+(sy.Lmin||"—")+' a'+(sy.why?' · '+E(sy.why):'')+'</div></div>'+
          '<button class="'+P+'-sw" data-act="sys" data-v="'+sy.id+'" aria-pressed="'+sy.on+'" aria-label="Incluir '+E(sy.n)+'"></button></div>'+
          '<div class="'+P+'-src">'+Object.keys(sy.src).map(function(k){ return '<span class="'+(k!=="Tipología"?'x':'')+'">'+E(k)+'</span>'; }).join("")+(sy.auto?'':'<span>Opcional</span>')+'</div>'+
          (sy.comps.length?'<ul class="'+P+'-cl">'+cs.map(function(c){ return '<li><span>'+E(c.n)+'</span><b>'+c.Lr+' a</b>'+(c.src!=="Tipología"?'<small>de '+E(c.src)+'</small>':'')+'</li>'; }).join("")+'</ul>':'<div class="'+P+'-fnt">Sin equipos especiales para esta tipología.</div>')+
          (op?sy.notes.map(function(n){ return '<div class="'+P+'-note">'+E(n)+'</div>'; }).join("")+'<div class="'+P+'-fnt">Referencia: '+E(sy.ref)+'</div>':'')+
          ((sy.comps.length>3||sy.notes.length)?'<button class="'+P+'-more" data-act="more" data-v="'+sy.id+'">'+(op?'Menos':'Ver todo ('+sy.comps.length+')'+(sy.notes.length?' · '+sy.notes.length+' nota'+(sy.notes.length>1?'s':''):''))+'</button>':'')+
          '</div>';
      });
      return s+'</div>';
    }

    /* ── 2 · Vida útil ── */
    function chipsOf(obj,key,cur){ return '<div class="'+P+'-chips">'+Object.keys(obj).map(function(k){ return '<button class="'+P+'-chip'+(cur===k?' on':'')+'" data-act="set" data-k="'+key+'" data-v="'+k+'">'+E(obj[k].n)+' <span class="'+P+'-mono '+P+'-fnt">×'+obj[k].f+'</span></button>'; }).join("")+'</div>'; }
    function vVida(){
      var zc=ctx.clima||{}, ef=md.ef;
      var s='<div class="'+P+'-card"><div class="'+P+'-h">'+gly("clock",16)+' Vida útil de diseño y de componentes '+pre("ISO 15686-8 · método factorial")+'</div>'+
        '<p class="'+P+'-p">Vida útil estimada <b class="'+P+'-mono">ESL = RSL × A·B·C·D·E·F·G</b>. RSL = vida de referencia (ISO 15686 / fabricantes / BCIS-HAPM). Aquí se agrupan: <b>E</b> ambiente exterior, <b>C</b> calidad de ejecución, <b>F</b> uso, <b>G</b> nivel de mantenimiento. Ecuador: la NEC fija el sismo de diseño para 475 años de periodo de retorno (≈ 10 % en 50 años), es decir, una vida útil de diseño implícita de 50 años; las edificaciones esenciales (salud, emergencia) usan importancia I = 1,5.</p>'+
        '<div class="'+P+'-h2">Vida útil de diseño del edificio</div><div class="'+P+'-chips">'+[[25,"Temporal / modular"],[50,"Normal (EN 1990, NEC)"],[75,"Esencial / institucional"],[100,"Monumental / patrimonio"]].map(function(v){ return '<button class="'+P+'-chip'+(st.vd===v[0]?' on':'')+'" data-act="vd" data-v="'+v[0]+'"><b class="'+P+'-mono">'+v[0]+' a</b> '+v[1]+'</button>'; }).join("")+'</div>'+
        '<div class="'+P+'-fx"><div><div class="'+P+'-h2">E · Ambiente exterior</div>'+chipsOf(EXT,"ext",st.ext)+'<div class="'+P+'-fnt">'+E(ef.d)+'. Clima del proyecto: '+E(zc.zona||"—")+' · '+E(zc.tipo||"—")+' · '+fmt(zc.elev||0)+' m s.n.m.</div></div>'+
        '<div><div class="'+P+'-h2">C · Calidad de ejecución</div>'+chipsOf(QC,"qc",st.qc)+'<div class="'+P+'-h2">F · Intensidad de uso</div>'+chipsOf(USO,"uso",st.uso)+'</div>'+
        '<div><div class="'+P+'-h2">G · Nivel de mantenimiento</div>'+chipsOf(GM,"gm",st.gm)+'<div class="'+P+'-fnt">El marcador ◆ muestra la vida si solo se hace mantenimiento correctivo: la diferencia es lo que gana el plan.</div></div></div>'+
        '<div class="'+P+'-row" style="margin-top:8px">'+verif("vu","Vida útil confirmada")+'</div></div>';
      var vd=st.vd, mx=Math.min(130,Math.max(vd,60,Math.max.apply(null,md.on.map(function(x){ return x.comps.reduce(function(a,c){ return Math.max(a,c.Lr,c.L); },0); })))*1.04);
      s+='<div class="'+P+'-card'+(st.conf.vu?'':' '+P+'-warnbox')+'"><div class="'+P+'-h">Componentes vs. vida de diseño ('+vd+' años) <span class="'+P+'-sp"></span><span class="'+P+'-fnt '+P+'-mono">│ referencia · ◆ sin plan · ▌ reemplazos</span></div>';
      md.on.forEach(function(sy){
        if(!sy.comps.length) return;
        s+='<div class="'+P+'-vh" style="--sc:'+sy.c+'">'+gly(sy.id,14,sy.c)+E(sy.n)+'</div>';
        sy.comps.forEach(function(c){
          var w=Math.min(100,c.Lr/mx*100), nrep=c.Lr<vd?Math.ceil(vd/c.Lr)-1:0, ticks="";
          for(var k=1;k<=nrep&&k<12;k++) ticks+='<u style="left:'+(c.Lr*k/mx*100).toFixed(2)+'%"></u>';
          s+='<div class="'+P+'-vl"><span class="n" title="'+E(c.n)+'">'+E(c.n)+'</span><div class="'+P+'-vt" style="--vc:'+(c.Lr<10?'var(--warn)':sy.c)+'"><i style="width:'+w.toFixed(1)+'%"></i><s style="left:'+Math.min(100,c.L/mx*100).toFixed(1)+'%"></s><em style="left:'+Math.min(100,c.Ln/mx*100).toFixed(1)+'%"></em>'+ticks+'<s style="left:'+(vd/mx*100).toFixed(1)+'%;background:var(--done);width:2px;box-shadow:0 0 6px var(--done)"></s></div><span class="v">'+c.Lr+' a'+(nrep?' <span style="color:var(--warn)">×'+nrep+'</span>':'')+'</span></div>';
        });
      });
      s+='<p class="'+P+'-fnt" style="margin-top:10px">Mundo: ISO 15686-1 (planificación de vida útil), -2 (predicción), -7 (retroalimentación desde la operación), -8 (método factorial), -9 (declaraciones de producto); EN 1990 (50 a edificios, 100 a monumentales); Brasil NBR 15575 (VUP mínima 50 a estructura, 13 a fachada, 20 a cubierta); Reino Unido BCIS/HAPM <i>Life Expectancy of Building Components</i>; Japón: plan de reparación a largo plazo (長期修繕計画) obligatorio en condominios con ciclos de 12 años para fachadas e impermeabilización.</p></div>';
      return s;
    }

    /* ── 3 · Plan preventivo ── */
    function wheel(){
      var R=[["Q",36,52],["A",55,77],["Se",80,102],["T",105,127],["M",130,152]], sel=US.mes, s='<svg viewBox="-180 -180 360 360" role="group" aria-label="Calendario anual de mantenimiento">';
      s+='<defs><radialGradient id="'+P+'-rg"><stop offset="0" stop-color="rgba(56,225,255,.18)"/><stop offset="1" stop-color="rgba(56,225,255,0)"/></radialGradient></defs><circle r="175" fill="url(#'+P+'-rg)"/>';
      s+='<g class="'+P+'-ring"><circle r="166" fill="none" stroke="rgba(56,225,255,.25)" stroke-dasharray="1 5"/></g>';
      function arc(r0,r1,a0,a1){ var c=Math.cos,sn=Math.sin; return "M"+(r0*c(a0)).toFixed(2)+","+(r0*sn(a0)).toFixed(2)+"L"+(r1*c(a0)).toFixed(2)+","+(r1*sn(a0)).toFixed(2)+"A"+r1+","+r1+" 0 0 1 "+(r1*c(a1)).toFixed(2)+","+(r1*sn(a1)).toFixed(2)+"L"+(r0*c(a1)).toFixed(2)+","+(r0*sn(a1)).toFixed(2)+"A"+r0+","+r0+" 0 0 0 "+(r0*c(a0)).toFixed(2)+","+(r0*sn(a0)).toFixed(2)+"Z"; }
      var rain=md.rm;
      for(var m=0;m<12;m++){
        var a0=-Math.PI/2+m*Math.PI/6+0.012, a1=a0+Math.PI/6-0.024, am=(a0+a1)/2;
        s+='<path class="sec" d="'+arc(32,158,a0,a1)+'" fill="'+(m===sel?'rgba(56,225,255,.16)':'rgba(56,225,255,.02)')+'" stroke="'+(m===sel?'#38E1FF':'rgba(120,200,255,.14)')+'" data-act="mes" data-v="'+m+'"><title>'+MESL[m]+'</title></path>';
        R.forEach(function(rr){
          var ts=md.tasks.filter(function(t){ return t.f===rr[0]&&t.m.indexOf(m)>=0; });
          var rm=(rr[1]+rr[2])/2, cap=rr[0]==="M"?1:Math.max(1,Math.floor((a1-a0)*rm/7));
          if(rr[0]==="M"){ if(ts.length) s+='<path d="'+arc(rr[1]+4,rr[2]-4,a0+.03,a1-.03)+'" fill="rgba(56,225,255,'+(m===sel?.35:.16)+')" pointer-events="none"/><text x="'+(rm*Math.cos(am)).toFixed(1)+'" y="'+(rm*Math.sin(am)+3).toFixed(1)+'" text-anchor="middle" font-family="JetBrains Mono,monospace" font-size="9" fill="#E4EEFA" pointer-events="none">'+ts.length+'</text>'; return; }
          ts.slice(0,cap).forEach(function(t,j){
            var n=Math.min(ts.length,cap), aa=a0+(a1-a0)*(j+0.5)/n, sy=md.SI[t.s];
            s+='<circle cx="'+(rm*Math.cos(aa)).toFixed(1)+'" cy="'+(rm*Math.sin(aa)).toFixed(1)+'" r="3.2" fill="'+sy.c+'" style="filter:drop-shadow(0 0 3px '+sy.c+')" pointer-events="none"/>';
          });
          if(ts.length>cap) s+='<text x="'+(rm*Math.cos(a1-.05)).toFixed(1)+'" y="'+(rm*Math.sin(a1-.05)).toFixed(1)+'" font-size="7" fill="#8CA0B6" font-family="JetBrains Mono,monospace" pointer-events="none">+'+(ts.length-cap)+'</text>';
        });
        var lx=168*Math.cos(am), ly=168*Math.sin(am)+3;
        s+='<text x="'+lx.toFixed(1)+'" y="'+ly.toFixed(1)+'" text-anchor="middle" font-family="Michroma,Arial Black,sans-serif" font-size="8" letter-spacing="1" fill="'+(m===sel?'#38E1FF':m===curM?'#B6FF3C':'#8CA0B6')+'" pointer-events="none">'+MES[m].toUpperCase()+'</text>';
        if(m===rain[0]||m===rain[1]) s+='<text x="'+(158*Math.cos(am)).toFixed(1)+'" y="'+(158*Math.sin(am)+3).toFixed(1)+'" text-anchor="middle" font-size="8" fill="#2BB3FF" pointer-events="none">'+(m===rain[0]?'☂':'☀')+'</text>';
      }
      R.forEach(function(rr){ s+='<circle r="'+rr[1]+'" fill="none" stroke="rgba(120,200,255,.12)" pointer-events="none"/><text x="3" y="'+(-rr[1]-3)+'" font-size="6.5" fill="'+FREQ[rr[0]].c+'" font-family="JetBrains Mono,monospace" pointer-events="none">'+FREQ[rr[0]].n.toUpperCase()+'</text>'; });
      var ah=-Math.PI/2+(curM+(now.getDate()-1)/31)*Math.PI/6;
      s+='<g class="'+P+'-hand"><line x1="0" y1="0" x2="'+(160*Math.cos(ah)).toFixed(1)+'" y2="'+(160*Math.sin(ah)).toFixed(1)+'" stroke="#B6FF3C" stroke-width="1.4" style="filter:drop-shadow(0 0 4px #B6FF3C)"/><circle cx="'+(160*Math.cos(ah)).toFixed(1)+'" cy="'+(160*Math.sin(ah)).toFixed(1)+'" r="3.5" fill="#B6FF3C"/></g>';
      var dn=md.tasks.filter(function(t){return t.f==="D";}).length, sn=md.tasks.filter(function(t){return t.f==="S";}).length, nm=md.tasks.filter(function(t){ return t.m.indexOf(sel)>=0&&t.f!=="D"&&t.f!=="S"; }).length;
      s+='<circle r="31" fill="#03060B" stroke="#38E1FF" stroke-opacity=".5" pointer-events="none"/><text y="-8" text-anchor="middle" font-family="Michroma,Arial Black,sans-serif" font-size="8" fill="#38E1FF" pointer-events="none">'+MES[sel].toUpperCase()+'</text><text y="8" text-anchor="middle" font-family="JetBrains Mono,monospace" font-size="15" fill="#E4EEFA" pointer-events="none">'+nm+'</text><text y="19" text-anchor="middle" font-size="6" fill="#8CA0B6" font-family="JetBrains Mono,monospace" pointer-events="none">+'+dn+' D · '+sn+' S</text>';
      return s+'</svg>';
    }
    function gantt(){
      var s='<div class="'+P+'-gt"><table><thead><tr><th class="s">Sistema</th>'+MES.map(function(m,i){ return '<th style="'+(i===curM?'color:var(--done)':'')+'">'+m+'</th>'; }).join("")+'</tr></thead><tbody>';
      md.on.forEach(function(sy){
        var ts=md.tasks.filter(function(t){ return t.s===sy.id&&/T|Se|A|Q/.test(t.f); }), fix=md.tasks.filter(function(t){ return t.s===sy.id&&/^(D|S|M)$/.test(t.f); }).length;
        if(!ts.length&&!fix) return;
        s+='<tr><th class="s" style="color:'+sy.c+'">'+E(sy.n)+'</th>';
        for(var m=0;m<12;m++){ var n=ts.filter(function(t){ return t.m.indexOf(m)>=0; }).length, a=Math.min(.75,n*.18+(fix?.06:0));
          s+='<td data-act="mes" data-v="'+m+'" class="'+(m===US.mes?'cur':'')+'" style="background:'+sy.c+Math.round(a*255).toString(16).padStart(2,"0")+';color:'+(n?'#E4EEFA':'transparent')+'">'+(n||'·')+'</td>'; }
        s+='</tr>';
      });
      return s+'</tbody></table></div><div class="'+P+'-fnt">Celdas = tareas trimestrales, semestrales, anuales y quinquenales del mes; el fondo tenue indica tareas diarias, semanales o mensuales permanentes. Toca un mes.</div>';
    }
    function taskItem(t,m){
      var dn=isDone(t,m), sy=md.SI[t.s];
      return '<li class="'+P+'-tk'+(dn?' dn':'')+'"><button class="'+P+'-cb" data-act="hecho" data-v="'+t.id+'" data-m="'+(m!=null?m:"")+'" aria-pressed="'+dn+'" aria-label="Marcar hecha">'+gly("check",18)+'</button><div><div class="tt">'+E(t.t)+'</div><div class="mt"><span class="'+P+'-tg" style="color:'+sy.c+'">'+E(sy.n)+'</span><span class="'+P+'-tg" style="color:'+FREQ[t.f].c+'">'+FREQ[t.f].n+'</span><span class="'+P+'-tg" style="color:'+RESP[t.r].c+'">'+RESP[t.r].n+'</span><span>'+E(t.nm)+'</span></div></div></li>';
    }
    function vPlan(){
      var sem=md.tasks.filter(function(t){ return t.f==="D"||t.f==="S"||(t.m.indexOf(curM)>=0&&t.f!=="E"&&t.w===curW); });
      var mes=md.tasks.filter(function(t){ return t.m.indexOf(curM)>=0&&t.f!=="D"&&t.f!=="S"; });
      var L=US.lista==="sem"?sem:mes, dn=L.filter(function(t){ return isDone(t,curM); }).length;
      var s='<div class="'+P+'-card"><div class="'+P+'-h">'+gly("cal",16)+' Plan de mantenimiento preventivo '+pre("ISO 41001 · EN 13306 · SFG20")+'</div>'+
        '<div class="'+P+'-fq">'+FORD.filter(function(f){return f!=="E";}).map(function(f){ var n=md.tasks.filter(function(t){return t.f===f;}).length; return '<div style="--k:'+FREQ[f].c+'"><b>'+n+'</b><span>'+FREQ[f].n+'</span></div>'; }).join("")+'</div>'+
        '<div class="'+P+'-cal"><div class="'+P+'-wh">'+wheel()+'</div><div>'+
        '<div class="'+P+'-chips"><button class="'+P+'-chip'+(US.lista==="sem"?' on':'')+'" data-act="lista" data-v="sem">Esta semana · '+sem.length+'</button><button class="'+P+'-chip'+(US.lista==="mes"?' on':'')+'" data-act="lista" data-v="mes">Este mes ('+MESL[curM]+') · '+mes.length+'</button></div>'+
        '<div class="'+P+'-row"><span class="'+P+'-mono '+P+'-fnt">'+dn+' / '+L.length+' hechas</span></div><div class="'+P+'-prog"><i style="width:'+(L.length?dn/L.length*100:0)+'%"></i></div>'+
        '<ul class="'+P+'-tl">'+L.map(function(t){ return taskItem(t,curM); }).join("")+'</ul></div></div></div>';
      s+='<div class="'+P+'-card"><div class="'+P+'-h">Calendario anual por sistema</div>'+gantt()+'</div>';
      var sel=US.mes, fil=US.fil;
      var ML=md.tasks.filter(function(t){ return t.m.indexOf(sel)>=0&&(fil==="all"||t.s===fil); }).sort(function(a,b){ return FORD.indexOf(a.f)-FORD.indexOf(b.f); });
      s+='<div class="'+P+'-card"><div class="'+P+'-h">Tareas de '+MESL[sel]+' <span class="'+P+'-fnt '+P+'-mono">'+ML.length+'</span></div>'+sysChips(fil,"fil");
      ["U","A","T"].forEach(function(r){ var g=ML.filter(function(t){return t.r===r;}); if(!g.length) return; s+='<div class="'+P+'-vh" style="--sc:'+RESP[r].c+'">'+E(RESP[r].n)+' · '+g.length+'</div><ul class="'+P+'-tl">'+g.map(function(t){ return taskItem(t,sel); }).join("")+'</ul>'; });
      var ev=md.tasks.filter(function(t){ return t.f==="E"; });
      if(ev.length) s+='<div class="'+P+'-vh" style="--sc:var(--warn)">Eventuales (tras sismo, inundación o incendio)</div><ul class="'+P+'-tl">'+ev.map(function(t){ return taskItem(t,null); }).join("")+'</ul>';
      s+='<p class="'+P+'-fnt">☂ revisión antes de lluvias ('+MESL[md.rm[0]]+') · ☀ revisión después ('+MESL[md.rm[1]]+'). Costa ecuatoriana: invierno de diciembre a mayo. Responsables según Ley de Propiedad Horizontal: el administrador ejecuta el mantenimiento de bienes comunes; cada propietario, el de su unidad.</p></div>';
      return s;
    }

    /* ── 4 · Correctivo y predictivo ── */
    function spark(se){
      var r=hash(se.id), pts=[], n=40, v=(se.min+se.lim)/2;
      for(var i=0;i<n;i++){ r=(Math.imul(r,1103515245)+12345)>>>0; var j=(r/4294967296-.5)*(se.max-se.min)*.12; v=Math.max(se.min,Math.min(se.max,v+j+(i>28?(se.lim-se.min)*.04:0))); pts.push(v); }
      var X=function(i){ return (i/(n-1)*300).toFixed(1); }, Y=function(v){ return (56-(v-se.min)/(se.max-se.min)*50).toFixed(1); };
      var d=pts.map(function(v,i){ return (i?"L":"M")+X(i)+","+Y(v); }).join(""), over=pts[n-1]>=se.lim;
      return '<svg viewBox="0 0 300 60" preserveAspectRatio="none"><line x1="0" x2="300" y1="'+Y(se.lim)+'" y2="'+Y(se.lim)+'" stroke="#FF5C7A" stroke-dasharray="4 3" stroke-width="1"/><path d="'+d+'L300,60L0,60Z" fill="rgba(56,225,255,.08)"/><path d="'+d+'" fill="none" stroke="'+(over?'#FF5C7A':'#38E1FF')+'" stroke-width="1.5" style="filter:drop-shadow(0 0 3px '+(over?'#FF5C7A':'#38E1FF')+')" vector-effect="non-scaling-stroke"/></svg>';
    }
    function vCorr(){
      var f=US.ffil, onI={}; md.on.forEach(function(s){ onI[s.id]=1; });
      var FL=FALLAS.filter(function(x){ return onI[x.s]&&(f==="all"||x.s===f); });
      var s='<div class="'+P+'-card"><div class="'+P+'-h">'+gly("warn",16)+' Mantenimiento correctivo · fallas típicas</div><p class="'+P+'-p">EN 13306 distingue: <b>correctivo</b> (después de la falla), <b>preventivo</b> (por calendario o uso) y <b>predictivo / basado en condición</b> (por medición). Meta de un edificio bien operado: ≤ 20 % de horas en correctivo. Prioridad 1 = atender en &lt; 4 h.</p>'+sysChips(f,"ffil")+'</div><div class="'+P+'-fg">';
      FL.forEach(function(x){ var sy=md.SI[x.s];
        s+='<div class="'+P+'-card '+P+'-fc" style="--c:'+sy.c+'"><div class="'+P+'-row">'+gly(x.s,18,sy.c)+'<span class="'+P+'-h2" style="margin:0;flex:1">'+E(x.f)+'</span><span class="'+P+'-mono '+P+'-p'+x.p+'" style="font-size:11px">P'+x.p+'</span></div><dl><dt>Síntomas</dt><dd>'+E(x.sy)+'</dd><dt>Causa</dt><dd>'+E(x.ca)+'</dd><dt>Solución</dt><dd style="color:var(--ink)">'+E(x.so)+'</dd></dl></div>'; });
      s+='</div>';
      var tec=(mods(ctx).tecnologia||{}).on||{};
      s+='<div class="'+P+'-card"><div class="'+P+'-h">'+gly("sens",16)+' Mantenimiento predictivo · sensores IoT / BMS <span class="'+P+'-pv">Curvas simuladas</span></div><p class="'+P+'-p">Ecuador: aún poco usado fuera de hospitales, aeropuertos y centros comerciales grandes; en el mundo se integra con el BMS, un CMMS (software de órdenes de trabajo) y el gemelo digital (ISO 19650-3, ISO 55000). Las curvas muestran cómo se vería la tendencia y su umbral de alarma.</p><div class="'+P+'-fg">';
      SENS.filter(function(se){ return onI[se.s]; }).forEach(function(se){
        var act=se.tec.some(function(t){ return tec[t]; }), sy=md.SI[se.s];
        s+='<div class="'+P+'-card '+P+'-fc '+P+'-sn" style="--c:'+sy.c+';margin:0"><div class="'+P+'-row">'+gly("sens",18,sy.c)+'<span class="'+P+'-h2" style="margin:0;flex:1">'+E(se.n)+'</span>'+(act?'<span class="'+P+'-okt">En Tecnología</span>':'<span class="'+P+'-fnt">sugerido</span>')+'</div>'+spark(se)+'<div class="'+P+'-row '+P+'-fnt '+P+'-mono"><span>umbral '+fmt(se.lim,se.lim<2?2:0)+' '+E(se.u)+'</span><span class="'+P+'-sp"></span><span>'+E(se.nm)+'</span></div><div class="'+P+'-p" style="margin:4px 0 0">'+E(se.q)+'</div></div>';
      });
      s+='</div>'+(Object.keys(tec).length?'':'<div class="'+P+'-row" style="margin-top:8px"><button class="'+P+'-btn" data-act="open" data-v="tecnologia">Elegir sensores en Tecnología →</button></div>')+'</div>';
      return s;
    }

    /* ── 5 · Costos ── */
    function lccChart(){
      var ser=cm.ser, W=640, H=220, L=54, B=24, T=12, Rr=12, mx=0;
      ser.forEach(function(p){ mx=Math.max(mx,p.m+p.R); });
      mx=mx||1; var bw=(W-L-Rr)/ser.length;
      var s='<svg viewBox="0 0 '+W+' '+H+'" role="img" aria-label="Costo anual de mantenimiento y reemplazos en el ciclo de vida">';
      for(var g=0;g<=4;g++){ var y=T+(H-T-B)*g/4; s+='<line x1="'+L+'" x2="'+(W-Rr)+'" y1="'+y+'" y2="'+y+'" stroke="rgba(120,200,255,.1)"/><text x="'+(L-4)+'" y="'+(y+3)+'" text-anchor="end" font-size="9" font-family="JetBrains Mono,monospace" fill="#55677C">'+moneyK(mx*(1-g/4))+'</text>'; }
      ser.forEach(function(p,i){
        var x=L+i*bw, hm=p.m/mx*(H-T-B), hr=p.R/mx*(H-T-B), y0=H-B;
        s+='<rect x="'+(x+.5).toFixed(1)+'" y="'+(y0-hm).toFixed(1)+'" width="'+Math.max(1,bw-1).toFixed(1)+'" height="'+hm.toFixed(1)+'" fill="rgba(56,225,255,.55)"/>';
        if(hr>0) s+='<rect x="'+(x+.5).toFixed(1)+'" y="'+(y0-hm-hr).toFixed(1)+'" width="'+Math.max(1,bw-1).toFixed(1)+'" height="'+hr.toFixed(1)+'" fill="#FFC24B" style="filter:drop-shadow(0 0 3px #FFC24B)"><title>Año '+p.y+': reemplazos '+money(p.R)+'</title></rect>';
        if(p.y%5===0||p.y===1) s+='<text x="'+(x+bw/2).toFixed(1)+'" y="'+(H-8)+'" text-anchor="middle" font-size="9" font-family="JetBrains Mono,monospace" fill="#8CA0B6">'+p.y+'</text>';
      });
      var pm=cm.pv, d=ser.map(function(p,i){ return (i?"L":"M")+(L+i*bw+bw/2).toFixed(1)+","+(T+(H-T-B)*(1-(p.pv-cm.obra)/(pm-cm.obra||1))).toFixed(1); }).join("");
      s+='<path d="'+d+'" fill="none" stroke="#B6FF3C" stroke-width="1.8" style="filter:drop-shadow(0 0 4px #B6FF3C)"/>';
      s+='<text x="'+(W-Rr)+'" y="'+(T+10)+'" text-anchor="end" font-size="9" font-family="JetBrains Mono,monospace" fill="#B6FF3C">O&amp;M acumulado (VP) → '+moneyK(cm.pvM+cm.pvR)+'</text>';
      return s+'</svg><div class="'+P+'-row '+P+'-fnt"><span><i style="display:inline-block;width:10px;height:10px;background:rgba(56,225,255,.55)"></i> mantenimiento anual</span><span><i style="display:inline-block;width:10px;height:10px;background:#FFC24B"></i> reemplazos de componentes</span><span style="color:var(--done)">— acumulado en valor presente</span></div>';
    }
    function sl(k,lab,val,min,max,step,txt){ return '<div class="'+P+'-sl"><label for="'+P+'-'+k+'">'+lab+' <b data-o="'+k+'">'+txt+'</b></label><input id="'+P+'-'+k+'" class="'+P+'-rng" type="range" min="'+min+'" max="'+max+'" step="'+step+'" value="'+val+'" data-act="sl" data-k="'+k+'"></div>'; }
    function vCost(){
      var c=cm, mx=Math.max.apply(null,c.rows.map(function(r){ return r.ann+r.rep; }).concat([1]));
      var ph=/RES|MIX|OFI|COM/.test(md.cat);
      var s='<div class="'+P+'-card'+(st.conf.co?'':' '+P+'-warnbox')+'"><div class="'+P+'-h">'+gly("coin",16)+' Costos de mantenimiento y ciclo de vida '+pre("ISO 15686-5 · BS 8544")+'<span class="'+P+'-sp"></span>'+verif("co","Costos confirmados")+'</div>'+
        '<p class="'+P+'-p">Costo de obra '+(c.src==="estimado"?'<b>estimado</b>: área construible '+fmt(c.Amax)+' m² (terreno '+fmt(ctx.area)+' m² × CUS '+fmt((ctx.P.norm||{}).cus||1.2,2)+') × '+money(c.m2)+'/m² referencial × 1,20 de indirectos.':'tomado de <b>Ingeniería de costos</b>: '+fmt(c.A)+' m² × '+money(c.m2)+'/m² + indirectos.')+' Factor de tipología ×'+c.kf+'.</p>'+
        '<div class="'+P+'-kpis"><div class="'+P+'-kpi"><span>Costo de obra</span><b>'+moneyK(c.obra)+'</b><i>'+E(c.src)+'</i></div>'+
        '<div class="'+P+'-kpi"><span>Mantenimiento anual</span><b>'+moneyK(c.ann)+'</b><i>'+fmt(c.ann/c.obra*100,2)+' % de la obra · '+money(c.ann/c.A/12)+'/m²·mes</i></div>'+
        '<div class="'+P+'-kpi" style="--k:#FFC24B"><span>Reemplazos (anualizado)</span><b>'+moneyK(c.rep)+'</b><i>'+fmt(c.rep/c.obra*100,2)+' % de la obra</i></div>'+
        '<div class="'+P+'-kpi" style="--k:var(--done)"><span>Fondo de reserva sugerido</span><b style="color:var(--done)">'+moneyK(c.fondo)+'/año</b><i>'+money(c.fondo/c.A/12)+'/m²·mes</i></div>'+
        '<div class="'+P+'-kpi" style="--k:#B26BFF"><span>Ciclo de vida '+st.H+' a (VP)</span><b>'+moneyK(c.pv)+'</b><i>obra '+fmt(c.obra/c.pv*100,0)+' % · O&amp;M '+fmt((c.pvM+c.pvR)/c.pv*100,0)+' %</i></div></div>'+
        '<div class="'+P+'-cg"><div>'+sl("r","Tasa de descuento real",st.r,0,12,0.5,fmt(st.r,1)+" %")+'<div class="'+P+'-fnt">Sector público Ecuador: la tasa social de descuento de la Secretaría de Planificación ha sido 12 % nominal; para comparar alternativas privadas use 3–6 % real.</div></div>'+
        '<div><div class="'+P+'-h2">Horizonte de análisis</div><div class="'+P+'-chips">'+[30,40,50].map(function(h){ return '<button class="'+P+'-chip'+(st.H===h?' on':'')+'" data-act="H" data-v="'+h+'">'+h+' años</button>'; }).join("")+'</div></div></div></div>';
      s+='<div class="'+P+'-cg"><div class="'+P+'-card"><div class="'+P+'-h">Costo anual por sistema</div>';
      c.rows.slice().sort(function(a,b){ return (b.ann+b.rep)-(a.ann+a.rep); }).forEach(function(r){
        s+='<div class="'+P+'-br"><span class="n" style="color:'+r.s.c+'">'+E(r.s.n)+' <span class="'+P+'-fnt">'+fmt(r.s.am*c.kf,1)+' %/a</span></span><div class="t" style="color:'+r.s.c+'"><i style="width:'+((r.ann+r.rep)/mx*100).toFixed(1)+'%;background:'+r.s.c+'55"></i><i style="width:'+(r.ann/mx*100).toFixed(1)+'%;background:'+r.s.c+'"></i></div><b>'+moneyK(r.ann+r.rep)+'</b></div>';
      });
      s+='<div class="'+P+'-fnt">Barra sólida = preventivo anual (% del capital del sistema); tenue = reemplazos anualizados. Referencias: BOMA, IFMA, RICS NRM 3, BCIS.</div></div>';
      s+='<div class="'+P+'-card"><div class="'+P+'-h">Fondo de reserva</div>'+
        '<div class="'+P+'-kpis"><div class="'+P+'-kpi"><span>Por reemplazos</span><b>'+moneyK(c.rep)+'</b><i>Σ costo de reposición ÷ vida útil</i></div><div class="'+P+'-kpi"><span>Fórmula de Peters (DE)</span><b>'+moneyK(c.peters)+'</b><i>costo/m² × 1,5 ÷ 80 × 0,7</i></div></div>'+
        sl("fondo","Aporte adoptado",st.fondo,50,150,5,st.fondo+" %")+
        '<p class="'+P+'-p">'+(ph?'<b>Ecuador · Ley de Propiedad Horizontal</b> y su reglamento: las expensas comunes cubren administración, conservación y reparación de bienes comunes; el reglamento interno debe fijar un <b>fondo común de reserva</b> (porcentaje de las expensas aprobado por la asamblea) para reparaciones mayores. Distribuir según alícuotas. ':'<b>Ecuador · uso institucional</b>: incluir la partida de mantenimiento en el presupuesto anual del operador (en salud pública: MSP / IESS; plan anual de mantenimiento hospitalario). ')+'Mundo: Alemania (Peters, WEG §19), Japón (修繕積立金 obligatorio), Singapur (sinking fund por ley), Chile (fondo de reserva ≥ 5 % de gastos comunes, Ley 21.442).</p></div></div>';
      s+='<div class="'+P+'-card '+P+'-lcc"><div class="'+P+'-h">Costo de ciclo de vida · '+st.H+' años</div>'+lccChart()+'<p class="'+P+'-fnt">Regla conocida (Royal Academy of Engineering, 1998): por cada 1 de construcción se gastan ≈ 5 en mantenimiento y operación y ≈ 200 en el personal que usa el edificio a lo largo de su vida. Diseñar para mantener es la decisión de mayor retorno.</p></div>';
      return s;
    }

    /* ── 6 · Manual, CSV y COBie ── */
    function manualMD(){
      var p=ctx.P||{}, loc=p.loc||{}, L=[];
      L.push("# Manual de uso y mantenimiento del edificio","","**Proyecto:** "+(p.nombre||"—")+"  ","**Tipología:** "+(ctx.tipo?ctx.tipo.n+" ("+ctx.tipo.cat.n+")":"—")+"  ","**Ubicación:** "+[loc.parroquia,loc.ciudad,loc.canton,loc.provincia,loc.pais].filter(Boolean).join(", ")+"  ","**Fecha de emisión:** "+now.toISOString().slice(0,10)+"  ","**Vida útil de diseño:** "+st.vd+" años  ","","> Documento de PREDISEÑO generado en DION. Valores referenciales: verificar con fabricantes, contratistas y especialistas antes de la entrega.","");
      L.push("## 1. Objeto y marco normativo","","Este manual entrega al propietario, al administrador y a los usuarios la información para operar, conservar y mantener el edificio durante su vida útil.","","**Ecuador:** Norma Ecuatoriana de la Construcción (NEC-SE-HM, NEC-SE-DS, NEC-HS, NEC-SB-IE), NTE INEN 739 (extintores), NTE INEN 1108 (agua potable), Reglamento de Prevención, Mitigación y Protección contra Incendios, Ley de Propiedad Horizontal y su reglamento (bienes comunes, administrador, fondo de reserva), Código Civil art. 1937 (responsabilidad del constructor 5 años), D.E. 2393 (seguridad en trabajos de mantenimiento), Ley Orgánica de Protección de Datos Personales (CCTV), ordenanzas del GAD cantonal.","","**Internacional:** ISO 15686 (vida útil y costo de ciclo de vida), ISO 41001 (gestión de instalaciones), ISO 55000 (gestión de activos), EN 13306 / EN 15341 (terminología e indicadores), ISO 19650-3 y COBie (información para operación), ASHRAE 180, NFPA 10/25/72/99/110, ASME A17.1 / EN 81-20, NBR 5674 y NBR 14037 (Brasil, manual de uso).","");
      L.push("## 2. Inventario de sistemas y componentes","","| Sistema | Componente | Vida útil estimada (años) | Origen |","|---|---|---:|---|");
      md.on.forEach(function(s){ s.comps.forEach(function(c){ L.push("| "+s.n+" | "+c.n+" | "+c.Lr+" | "+c.src+" |"); }); });
      L.push("");
      md.on.forEach(function(s){ if(s.notes.length){ L.push("**"+s.n+" — notas de materiales:**"); s.notes.forEach(function(n){ L.push("- "+n); }); L.push(""); } });
      L.push("## 3. Vida útil (ISO 15686-8)","","Factores aplicados: ambiente exterior "+md.ef.n+" (×"+md.ef.f+" según sensibilidad), ejecución "+QC[st.qc].n+" (×"+QC[st.qc].f+"), uso "+USO[st.uso].n+" (×"+USO[st.uso].f+"), mantenimiento "+GM[st.gm].n+" (×"+GM[st.gm].f+").","","Componentes con vida menor a la de diseño se reemplazan: planificar su recambio en el fondo de reserva.","");
      L.push("## 4. Plan de mantenimiento preventivo","");
      FORD.forEach(function(f){ var g=md.tasks.filter(function(t){return t.f===f;}); if(!g.length) return; L.push("### "+FREQ[f].n,"","| Sistema | Tarea | Responsable | Meses | Norma / manual |","|---|---|---|---|---|"); g.forEach(function(t){ L.push("| "+md.SI[t.s].n+" | "+t.t+" | "+RESP[t.r].n+" | "+(t.m.length===12?"todos":t.m.length?t.m.map(function(m){return MES[m];}).join(", "):"tras evento")+" | "+t.nm+" |"); }); L.push(""); });
      L.push("### Calendario anual","");
      for(var m=0;m<12;m++){ var g=md.tasks.filter(function(t){ return t.m.indexOf(m)>=0&&/T|Se|A|Q/.test(t.f); }); L.push("- **"+MESL[m]+"** ("+g.length+"): "+(g.map(function(t){ return t.t.split(/[;:(]/)[0].trim(); }).join(" · ")||"solo rutinas")); }
      L.push("","## 5. Mantenimiento correctivo y predictivo","","| Sistema | Falla | Síntomas | Causa | Solución | Prioridad |","|---|---|---|---|---|---|");
      var onI={}; md.on.forEach(function(s){ onI[s.id]=1; });
      FALLAS.filter(function(x){ return onI[x.s]; }).forEach(function(x){ L.push("| "+md.SI[x.s].n+" | "+x.f+" | "+x.sy+" | "+x.ca+" | "+x.so+" | P"+x.p+" |"); });
      L.push("","**Predictivo (sensores sugeridos):**",""); SENS.filter(function(se){ return onI[se.s]; }).forEach(function(se){ L.push("- "+se.n+" — umbral "+se.lim+" "+se.u+" ("+se.nm+"). "+se.q); });
      L.push("","## 6. Costos de mantenimiento (prediseño)","","- Costo de obra de referencia: "+money(cm.obra)+" ("+cm.src+")","- Mantenimiento preventivo anual: "+money(cm.ann)+" ("+fmt(cm.ann/cm.obra*100,2)+" % de la obra)","- Reemplazos anualizados: "+money(cm.rep),"- Fondo de reserva sugerido: "+money(cm.fondo)+" por año ("+money(cm.fondo/cm.A/12)+"/m² por mes)","- Costo de ciclo de vida a "+st.H+" años (valor presente, "+st.r+" %): "+money(cm.pv),"","| Sistema | Preventivo anual | Reemplazos anualizados |","|---|---:|---:|");
      cm.rows.forEach(function(r){ L.push("| "+r.s.n+" | "+money(r.ann)+" | "+money(r.rep)+" |"); });
      L.push("","## 7. Uso correcto del edificio (propietario y usuarios)","",
        "- No perforar vigas, columnas ni losas; no agregar cargas (tanques, jardineras, pisos) sin autorización de un ingeniero estructural.",
        "- No modificar fachadas, ventanas ni colores en propiedad horizontal sin aprobación de la asamblea.",
        "- No conectar equipos de alto consumo sin verificar la capacidad del circuito; no puentear breakers.",
        "- No arrojar grasas, toallas ni plásticos a inodoros y desagües.",
        "- Ventilar baños y cocinas a diario (la humedad de la costa favorece el moho).",
        "- No obstruir rutas de evacuación, puertas cortafuego, extintores ni gabinetes.",
        "- Reportar de inmediato manchas de humedad, fisuras nuevas, olores a quemado o ruidos en bombas y ascensores.",
        "- Usar productos de limpieza indicados por el fabricante de cada acabado.","");
      L.push("## 8. Emergencias","","- ECU 911 (emergencias, bomberos, policía): **911**","- Empresa eléctrica del cantón, empresa de agua, empresa de ascensores (24/7), administrador: completar teléfonos","- Ubicación de llaves de corte: agua (cisterna y medidor), electricidad (tablero general), gas (válvula general)","- Punto de encuentro: indicar en el plan de emergencia","");
      L.push("## 9. Entrega a operación","");
      CK.forEach(function(g){ L.push("**"+g[0]+"**"); g[1].forEach(function(i){ L.push("- ["+(st.ck[i[0]]?"x":" ")+"] "+i[1]); }); L.push(""); });
      L.push("## 10. Bitácora de mantenimiento","","| Fecha | Sistema / equipo | Tarea | Responsable | Observaciones | Firma |","|---|---|---|---|---|---|","|  |  |  |  |  |  |","","---","Generado con DION · estación Mantenimiento de la edificación.");
      return L.join("\n");
    }
    function planCSV(){
      var rows=[["Sistema","Tarea","Frecuencia","Veces_por_año","Meses","Responsable","Norma_o_manual"]];
      md.tasks.forEach(function(t){ rows.push([md.SI[t.s].n,t.t,FREQ[t.f].n,FREQ[t.f].y,t.m.length===12?"Todos":t.m.map(function(m){return MES[m];}).join(" "),RESP[t.r].n,t.nm]); });
      return csv(rows);
    }
    var CB="operacion@proyecto.ec", CO=now.toISOString().slice(0,19);
    function tname(s,c){ return (s.n+" - "+c.n).slice(0,120); }
    function cobieType(){
      var rows=[["Name","CreatedBy","CreatedOn","Category","Description","AssetType","Manufacturer","ModelNumber","WarrantyDurationParts","WarrantyDurationUnit","ReplacementCost","ExpectedLife","DurationUnit"]];
      md.on.forEach(function(s){ var cap=cm.obra*s.cap/100; s.comps.forEach(function(c){ rows.push([tname(s,c),CB,CO,s.n,c.n,"Fixed","n/a","n/a",c.Lr<10?1:2,"year",Math.round(cap*c.rp*RPF/100),c.Lr,"year"]); }); });
      return csv(rows);
    }
    function cobieComp(){
      var rows=[["Name","CreatedBy","CreatedOn","TypeName","Space","Description","ExtSystem","ExtObject","ExtIdentifier","SerialNumber","InstallationDate","WarrantyStartDate","TagNumber","BarCode","AssetIdentifier"]];
      md.on.forEach(function(s){ s.comps.forEach(function(c,i){ var tag=s.id.toUpperCase()+"-"+String(i+1).padStart(3,"0"); rows.push([tag+" "+c.n.slice(0,60),CB,CO,tname(s,c),"n/a","Ubicar en planos as-built","DION","IfcBuildingElement",tag,"n/a","n/a","n/a",tag,"n/a",tag]); }); });
      return csv(rows);
    }
    function cobieJob(){
      var rows=[["Name","CreatedBy","CreatedOn","Category","Status","TypeName","Description","Duration","DurationUnit","Start","TaskStartUnit","Frequency","FrequencyUnit","Priors","ResourceNames"]];
      var FU={D:[1,"day"],S:[1,"week"],M:[1,"month"],T:[3,"month"],Se:[6,"month"],A:[1,"year"],Q:[5,"year"],E:[0,"n/a"]};
      md.tasks.forEach(function(t,i){ var s=md.SI[t.s], c=s.comps[0]; rows.push(["JOB-"+String(i+1).padStart(3,"0"),CB,CO,"PM","Not Started",c?tname(s,c):s.n,t.t+" ("+t.nm+")",1,"hour",t.m.length?MES[t.m[0]]:"n/a","month",FU[t.f][0],FU[t.f][1],"n/a",RESP[t.r].n]); });
      return csv(rows);
    }
    function dl(k){
      var b=slug((ctx.P&&ctx.P.nombre)||"proyecto");
      try{
        if(k==="md") ctx.download(b+"-manual-uso-mantenimiento.md",manualMD());
        else if(k==="csv") ctx.download(b+"-plan-mantenimiento.csv",planCSV());
        else if(k==="ct") ctx.download(b+"-COBie-Type.csv",cobieType());
        else if(k==="cc") ctx.download(b+"-COBie-Component.csv",cobieComp());
        else if(k==="cj") ctx.download(b+"-COBie-Job.csv",cobieJob());
        else if(k==="all"){ dl("md"); dl("csv"); dl("ct"); dl("cc"); dl("cj"); return; }
        ctx.toast("Archivo listo para guardar");
      }catch(e){ ctx.toast("No se pudo generar el archivo"); }
    }
    function vMan(){
      var nC=md.on.reduce(function(a,s){return a+s.comps.length;},0);
      var docs=[["md","book","Manual de uso y mantenimiento","Markdown · 10 capítulos: inventario, vida útil, plan, fallas, costos, uso correcto, emergencias, entrega, bitácora.","#38E1FF"],
        ["csv","cal","Plan preventivo (CSV)",md.tasks.length+" tareas con frecuencia, meses, responsable y norma. Abre en Excel / Google Sheets.","#B6FF3C"],
        ["ct","key","COBie · Type",nC+" tipos con vida esperada (ExpectedLife) y costo de reposición.","#FFC24B"],
        ["cc","key","COBie · Component",nC+" componentes con etiqueta (TagNumber) para QR en obra.","#FF6FA8"],
        ["cj","key","COBie · Job",md.tasks.length+" trabajos con frecuencia y recurso: se importan a un CMMS.","#B26BFF"]];
      var s='<div class="'+P+'-card"><div class="'+P+'-h">'+gly("book",16)+' Manual de uso y mantenimiento · exportes</div><p class="'+P+'-p">Ecuador no tiene aún un formato obligatorio de manual de uso (salvo los requisitos de propiedad horizontal y los planes de mantenimiento hospitalario del MSP); en Chile es obligatorio entregarlo con la vivienda (OGUC), en Brasil se rige por NBR 14037 y en Francia por el <i>DIUO / carnet d’information du logement</i>. COBie (NBIMS-US, BS 1192-4) es la hoja de cálculo estándar para pasar del BIM a la operación.</p>'+
        '<div class="'+P+'-row"><button class="'+P+'-btn ok" data-act="dl" data-v="all">'+gly("dl",16)+' Descargar todo (5 archivos)</button></div></div><div class="'+P+'-dg">';
      docs.forEach(function(d){ s+='<div class="'+P+'-card '+P+'-dl" style="--c:'+d[4]+'"><div class="'+P+'-row">'+gly(d[1],22,d[4])+'<span class="'+P+'-h2" style="margin:0">'+E(d[2])+'</span></div><div class="'+P+'-p">'+E(d[3])+'</div><button class="'+P+'-btn btn" data-act="dl" data-v="'+d[0]+'">'+gly("dl",16)+' Descargar</button></div>'; });
      s+='</div><div class="'+P+'-card"><div class="'+P+'-h">Contenido del manual</div><ol class="'+P+'-toc">'+["Objeto y marco normativo (Ecuador y mundo)","Inventario de sistemas y componentes","Vida útil (ISO 15686-8)","Plan preventivo por frecuencia y calendario anual","Correctivo (fallas) y predictivo (sensores)","Costos, ciclo de vida y fondo de reserva","Uso correcto del edificio","Emergencias y llaves de corte","Entrega a operación (checklist)","Bitácora de mantenimiento"].map(function(x){ return '<li>'+E(x)+'</li>'; }).join("")+'</ol></div>';
      return s;
    }

    /* ── 7 · Entrega ── */
    function ring(p){ var r=50, c=2*Math.PI*r; return '<svg viewBox="0 0 120 120"><circle cx="60" cy="60" r="'+r+'" fill="none" stroke="rgba(182,255,60,.12)" stroke-width="8"/><circle cx="60" cy="60" r="'+r+'" fill="none" stroke="#B6FF3C" stroke-width="8" stroke-linecap="round" stroke-dasharray="'+(c*p/100).toFixed(1)+' '+c.toFixed(1)+'" transform="rotate(-90 60 60)" style="filter:drop-shadow(0 0 6px #B6FF3C)"/><text x="60" y="66" text-anchor="middle" font-family="JetBrains Mono,monospace" font-size="20" fill="#E4EEFA">'+p+'%</text></svg>'; }
    function vEnt(){
      var p=ckPct();
      var s='<div class="'+P+'-card"><div class="'+P+'-row"><div class="'+P+'-ring2">'+ring(p)+'</div><div style="flex:1;min-width:200px"><div class="'+P+'-h">'+gly("flag",16)+' Checklist de entrega a operación</div><p class="'+P+'-p">Cierre del proyecto (fase 7 de RIBA «En uso», ISO 19650-3 «fase operativa»). Sin esta entrega el plan de mantenimiento no se puede ejecutar: el edificio pasa del equipo de diseño y construcción al propietario y al administrador.</p></div></div></div><div class="'+P+'-ckg">';
      CK.forEach(function(g){
        var d=g[1].filter(function(i){ return st.ck[i[0]]; }).length;
        s+='<div class="'+P+'-card" style="margin:0"><div class="'+P+'-h">'+E(g[0])+' <span class="'+P+'-sp"></span><span class="'+P+'-mono '+P+'-fnt">'+d+'/'+g[1].length+'</span></div>';
        g[1].forEach(function(i){ var on=!!st.ck[i[0]]; s+='<div class="'+P+'-ci'+(on?' dn':'')+'"><button class="'+P+'-cb" data-act="ck" data-v="'+i[0]+'" aria-pressed="'+on+'" aria-label="'+E(i[1])+'">'+gly("check",18)+'</button><span>'+E(i[1])+'</span></div>'; });
        s+='</div>';
      });
      s+='</div><div class="'+P+'-card '+P+'-end"><div class="'+P+'-h2">Fin del recorrido del proyecto</div><p class="'+P+'-p" style="max-width:560px">Del lugar y la norma al diseño, la técnica, el costo y ahora la operación: el edificio queda listo para vivir sus '+st.vd+' años de vida útil de diseño con un plan de '+md.tasks.length+' tareas y un fondo de reserva de '+moneyK(cm.fondo)+' al año.</p><button class="'+P+'-big" data-act="fin">Proyecto completo ✓</button></div>';
      return s;
    }

    function paint(){
      var V={inv:vInv,vida:vVida,plan:vPlan,corr:vCorr,cost:vCost,man:vMan,ent:vEnt};
      main.innerHTML=(V[US.tab]||vInv)();
      main.scrollTop=US.scroll[US.tab]||0;
    }
    function reTop(){ root.querySelectorAll("."+P+"-tab").forEach(function(b){ b.setAttribute("aria-selected",String(b.getAttribute("data-v")===US.tab)); }); }

    root.addEventListener("click",function(ev){
      var b=ev.target.closest("[data-act]"); if(!b||!root.contains(b)) return;
      var a=b.getAttribute("data-act"), v=b.getAttribute("data-v");
      if(a==="tab"){ US.tab=v; reTop(); paint(); return; }
      if(a==="fin"){ save(); ctx.toast("Proyecto completo: diseño, técnica, costo y operación ✓"); ctx.next(); return; }
      if(a==="open"){ ctx.open(v); return; }
      if(a==="sys"){ var sy=md.SI[v]; st.off[v]=sy.on; if(st.off[v]===!sy.auto) delete st.off[v]; ch(); paint(); return; }
      if(a==="more"){ US.open[v]=!US.open[v]; paint(); return; }
      if(a==="set"){ st[b.getAttribute("data-k")]=v; ch(); paint(); return; }
      if(a==="vd"){ st.vd=+v; ch(); paint(); return; }
      if(a==="H"){ st.H=+v; ch(); paint(); return; }
      if(a==="conf"){ st.conf[v]=true; ch(); paint(); ctx.toast("Confirmado"); return; }
      if(a==="mes"){ US.mes=+v; paint(); return; }
      if(a==="lista"){ US.lista=v; paint(); return; }
      if(a==="fil"){ US.fil=v; paint(); return; }
      if(a==="ffil"){ US.ffil=v; paint(); return; }
      if(a==="hecho"){ var t=md.tasks.filter(function(x){ return x.id===v; })[0]; if(!t) return; var m=b.getAttribute("data-m"); var k=pkey(t,m===""?null:+m)+"|"+t.id; if(st.hecho[k]) delete st.hecho[k]; else st.hecho[k]=1;
        /* poda: conservar solo el último año */ var ks=Object.keys(st.hecho); if(ks.length>600) ks.slice(0,ks.length-600).forEach(function(x){ delete st.hecho[x]; });
        save(); paint(); return; }
      if(a==="ck"){ st.ck[v]=!st.ck[v]; if(!st.ck[v]) delete st.ck[v]; save(); paint(); return; }
      if(a==="dl"){ dl(v); return; }
    });
    root.addEventListener("input",function(ev){
      var t=ev.target; if(t.getAttribute("data-act")!=="sl") return;
      var k=t.getAttribute("data-k"), v=+t.value;
      var o=root.querySelector('[data-o="'+k+'"]'); if(o) o.textContent=k==="r"?fmt(v,1)+" %":v+" %";
    });
    root.addEventListener("change",function(ev){
      var t=ev.target; if(t.getAttribute("data-act")!=="sl") return;
      st[t.getAttribute("data-k")]=+t.value; ch(); paint();
    });
    paint();
    return function(){ save(); };
  }
};
})();
