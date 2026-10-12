/* DION · Arranque del proyecto: generador de carpetas (Matriz avanzada BIM + Índice de carpetas de la tesis)
   Basado en la herramienta ARCH-CORE // MATRIZ GEN del usuario, ahora con TODAS las tipologías del Atlas. */
(function(){
window.DION_MOD = window.DION_MOD || {};

/* --- rutas de la Matriz avanzada ({F} = código completo, {S} = código corto) --- */
const MATRIZ = `000.DOC_{S}/0D1.LIBR_{F}/0D11.PLND_{S}/0D111.Plantillas de Entidades
000.DOC_{S}/0D1.LIBR_{F}/0D11.PLND_{S}/0D112.Plantillas de Proyectos/01.Basicas
000.DOC_{S}/0D1.LIBR_{F}/0D11.PLND_{S}/0D112.Plantillas de Proyectos/02.Avanzadas
000.DOC_{S}/0D1.LIBR_{F}/0D11.PLND_{S}/0D113.Plantillas de Planimetria
000.DOC_{S}/0D1.LIBR_{F}/0D11.PLND_{S}/0D114.Plantillas de Materiales
000.DOC_{S}/0D1.LIBR_{F}/0D12.PRM_{S}
000.DOC_{S}/0D1.LIBR_{F}/0D13.PLNE_{S}
000.DOC_{S}/0D1.LIBR_{F}/0D14.PLNP_{S}
000.DOC_{S}/0D1.LIBR_{F}/0D15.OBE_{S}/0D151.Planimetria
000.DOC_{S}/0D1.LIBR_{F}/0D15.OBE_{S}/0D152.Genericos
000.DOC_{S}/0D1.LIBR_{F}/0D15.OBE_{S}/0D153.Mobiliarios
000.DOC_{S}/0D1.LIBR_{F}/0D15.OBE_{S}/0D154.Vanos/0D1.Perfiles de Vanos
000.DOC_{S}/0D1.LIBR_{F}/0D15.OBE_{S}/0D154.Vanos/0D1.Puertas
000.DOC_{S}/0D1.LIBR_{F}/0D15.OBE_{S}/0D154.Vanos/0D1.Ventanas
000.DOC_{S}/0D1.LIBR_{F}/0D15.OBE_{S}/0D154.Vanos/0D2.Paneles
000.DOC_{S}/0D1.LIBR_{F}/0D15.OBE_{S}/0D155.Coberturas-Paneles
000.DOC_{S}/0D1.LIBR_{F}/0D15.OBE_{S}/0D156.Luminarias
000.DOC_{S}/0D1.LIBR_{F}/0D15.OBE_{S}/0D157.Vegetacion
000.DOC_{S}/0D1.LIBR_{F}/0D15.OBE_{S}/0D158.Equipamiento Sanitario
000.DOC_{S}/0D1.LIBR_{F}/0D15.OBE_{S}/0D159.Electrodomesticos
000.DOC_{S}/0D1.LIBR_{F}/0D15.OBE_{S}/0D1510.Perfiles
000.DOC_{S}/0D1.LIBR_{F}/0D15.OBE_{S}/0D1511.Estructuras
000.DOC_{S}/0D1.LIBR_{F}/0D15.OBE_{S}/0D1512.Acabados
000.DOC_{S}/0D1.LIBR_{F}/0D15.OBE_{S}/0D1513.Parametricas Avanzadas
000.DOC_{S}/0D1.LIBR_{F}/0D16.MAT_{S}/0D161.ADK_{S}/Materiales Grid Studio
000.DOC_{S}/0D1.LIBR_{F}/0D16.MAT_{S}/0D162.TXE_{S}
000.DOC_{S}/0D1.LIBR_{F}/0D17.SHT_{S}
000.DOC_{S}/0D2.LEGL_{F}/0D21.CTR_{S}
000.DOC_{S}/0D2.LEGL_{F}/0D22.PRS_{S}
000.DOC_{S}/0D2.LEGL_{F}/0D23.ADC_{S}
000.DOC_{S}/0D2.LEGL_{F}/0D24.CDP_{S}
000.DOC_{S}/0D2.LEGL_{F}/0D25.VLD_{S}
000.DOC_{S}/0D2.LEGL_{F}/0D26.PEB_{S}
000.DOC_{S}/0D3.RECP_{F}/0D31.DATA_{S}/0D311.DWG_{S}
000.DOC_{S}/0D3.RECP_{F}/0D31.DATA_{S}/0D312.PDF_{S}
000.DOC_{S}/0D3.RECP_{F}/0D31.DATA_{S}/0D313.JPEG_{S}
000.DOC_{S}/0D3.RECP_{F}/0D31.DATA_{S}/0D314.SKP_{S}
000.DOC_{S}/0D3.RECP_{F}/0D31.DATA_{S}/0D315.DDP_{S}
000.DOC_{S}/0D4.DTP_{F}/0D41.LAS_{S}
000.DOC_{S}/0D4.DTP_{F}/0D42.RCS_{S}
000.DOC_{S}/0D4.DTP_{F}/0D43.RCP_{S}
000.DOC_{S}/0D4.DTP_{F}/0D44.OBJ_{S}
000.DOC_{S}/0D4.DTP_{F}/0D45.ORPH_{S}
000.DSIN_{S}/0DS1.ZGE_{S}
000.DSIN_{S}/0DS2.ZINT_{S}
000.ENT_{S}/0E1.DATA_{S}/0E11.RCS_{S}
000.ENT_{S}/0E1.DATA_{S}/0E12.ORPH_{S}
000.ENT_{S}/0E1.DATA_{S}/0E13.DWG_{S}
000.ENT_{S}/0E2.URB_{S}/0E21.VU_{S}
000.ENT_{S}/0E2.URB_{S}/0E22.MU_{S}
000.FED_{S}
001.STE_{S}/0S1.DATA_{S}/0S11.DWG_{S}
001.STE_{S}/0S1.DATA_{S}/0S12.PDF_{S}
001.STE_{S}/0S2.STG_{S}/0S21.S.INF_{S}
001.STE_{S}/0S2.STG_{S}/0S22.S.T1_{S}
001.STE_{S}/0S2.STG_{S}/0S23.S.T2_{S}
001.STE_{S}/0S2.STG_{S}/0S24.S.VP_{S}
001.STE_{S}/0S3.SCV_{S}/0S31.SCV.1_{S}
001.STE_{S}/0S3.SCV_{S}/0S32.SCV.2_{S}
001.STE_{S}/0S4.SCW_{S}/0S41.SCW.PNL_{S}
001.STE_{S}/0S4.SCW_{S}/0S42.SCW.VID_{S}
002.ARC_{S}/0A1.DATA_{S}/0A11.DWG_{S}
002.ARC_{S}/0A1.DATA_{S}/0A12.PDF_{S}
002.ARC_{S}/0A2.ARG_{S}/0A21.A.INF_{S}
002.ARC_{S}/0A2.ARG_{S}/0A22.A.T1_{S}
002.ARC_{S}/0A2.ARG_{S}/0A23.A.T2_{S}
002.ARC_{S}/0A2.ARG_{S}/0A24.A.PLZ_{S}
002.ARC_{S}/0A3.AINT_{S}/0A31.AI.INF_{S}
002.ARC_{S}/0A3.AINT_{S}/0A32.AI.T1_{S}
002.ARC_{S}/0A3.AINT_{S}/0A33.AI.T2_{S}
002.ARC_{S}/0A3.AINT_{S}/0A34.AI.PLZ_{S}
002.ARC_{S}/0A4.EQU_{S}/0A41.E.MED_{S}
002.ARC_{S}/0A4.EQU_{S}/0A42.E.IND_{S}
002.ARC_{S}/0A4.EQU_{S}/0A43.E.IS_{S}
003.MEP_{S}/0M1.MGEST_{S}/0M11.MGEST_{S}
003.MEP_{S}/0M1.MGEST_{S}/0M12.M.NWF_{S}
003.MEP_{S}/0M1.MGEST_{S}/0M13.M.NWD_{S}
003.MEP_{S}/0M2.MEC_{S}/0M21.MEC.3D_{S}
003.MEP_{S}/0M2.MEC_{S}/0M22.MEC.NWC_{S}
003.MEP_{S}/0M3.IS_{S}/0M31.AFC.3D_{S}
003.MEP_{S}/0M3.IS_{S}/0M32.DV.3D_{S}
003.MEP_{S}/0M3.IS_{S}/0M33.AFC.NWC_{S}
003.MEP_{S}/0M3.IS_{S}/0M34.DV.NWC_{S}
003.MEP_{S}/0M4.IE_{S}/0M41.IL.3D_{S}
003.MEP_{S}/0M4.IE_{S}/0M42.FZ.3D_{S}
003.MEP_{S}/0M4.IE_{S}/0M43.IL.NWC_{S}
003.MEP_{S}/0M4.IE_{S}/0M44.FZ.NWC_{S}
003.MEP_{S}/0M5.CI_{S}/0M51.CI.3D_{S}
003.MEP_{S}/0M5.CI_{S}/0M52.CI.NWC_{S}
003.MEP_{S}/0M6.GAS_{S}/0M61.GAS.3D_{S}
003.MEP_{S}/0M6.GAS_{S}/0M62.GAS.NWC_{S}
003.MEP_{S}/0M7.COM_{S}/0M71.DATA.3D_{S}
003.MEP_{S}/0M7.COM_{S}/0M72.INT.3D_{S}
003.MEP_{S}/0M7.COM_{S}/0M73.DATA.NWC_{S}
003.MEP_{S}/0M7.COM_{S}/0M74.INT.NWC_{S}
003.MEP_{S}/0M8.SEG_{S}/0M81.CCTV.3D_{S}
003.MEP_{S}/0M8.SEG_{S}/0M82.DET.3D_{S}
003.MEP_{S}/0M8.SEG_{S}/0M83.CCTV.NWC_{S}
003.MEP_{S}/0M8.SEG_{S}/0M84.DET.NWC_{S}
004.MRP_{S}/0MR1.EXT_{S}
004.MRP_{S}/0MR2.INT_{S}
004.MRP_{S}/0MR3.RND_{S}/0MR31.R.EXT_{S}
004.MRP_{S}/0MR3.RND_{S}/0MR32.R.INT_{S}
004.MRP_{S}/0MR4.MAT_{S}/0MR41.M.RVT_{S}
004.MRP_{S}/0MR4.MAT_{S}/0MR42.M.LM_{S}
005.BRR_{S}/0B1.AG_{S}
005.BRR_{S}/0B2.AP_{S}
005.BRR_{S}/0B3.BKP_{S}
006.ETG_{S}/0ET1.MDL_{S}/0ET11.CAD3D_{S}
006.ETG_{S}/0ET1.MDL_{S}/0ET12.RVT_{S}
006.ETG_{S}/0ET1.MDL_{S}/0ET13.NWC_{S}
006.ETG_{S}/0ET2.PLM_{S}/0ET21.PLT_{S}
006.ETG_{S}/0ET2.PLM_{S}/0ET22.CRT_{S}
006.ETG_{S}/0ET2.PLM_{S}/0ET23.ELEV_{S}
006.ETG_{S}/0ET2.PLM_{S}/0ET24.DET_{S}
006.ETG_{S}/0ET2.PLM_{S}/0ET25.V3D_{S}
006.ETG_{S}/0ET3.RND_{S}/0ET31.R.EXT_{S}
006.ETG_{S}/0ET3.RND_{S}/0ET32.R.INT_{S}
006.ETG_{S}/0ET4.PST_{S}/0ET41.P.RND_{S}
006.ETG_{S}/0ET4.PST_{S}/0ET42.P.PNL_{S}
006.ETG_{S}/0ET4.PST_{S}/0ET43.P.PLM_{S}`.split("\n");

/* --- Índice de carpetas (tesis, capítulos 1–12) --- */
const C24 = "CAPITULO 2. MARCO REFERENCIAL/2.4. Tabla de analisis del Marco Legal";
const CERT = "LEED|PCES|WELL Building Standard|EarthCheck|EDGE|Living Building Challenge|NZEB|Parksmart|Passivhaus|Active House|BREEAM|CASBEE|DGNB|Green Globes|Green Star|HQE|LBC|NABERS|Nordic Swan|Punto Verde".split("|");
const INDICE = [
 ...["00.1. Portada y Contraportada","00.2. Agradecimientos","00.3. Resumen","00.4. Indice General","00.5. Indice de Tablas","00.6. Indice de Figuras","00.7. Indice de Ilustraciones","00.8. Indice de Diagramas"].map(x => "00. PRELIMINARES/" + x),
 ...["1.1. Historiografia y relatos sobre la tematica","1.2. Linea de tiempo (Mundial, Regional, Local)","1.3. Ubicacion georreferencial, coordenadas y fotos","1.4. Planteamiento de problematicas (Citas)","1.5. Justificaciones (5)","1.6. Objetivos/1.6.1. Objetivo General","1.6. Objetivos/1.6.2. Objetivos Especificos (5)","1.7. Alcances de la investigacion","1.8. Limitaciones de la investigacion (5)"].map(x => "CAPITULO 1. INTRODUCCION/" + x),
 ...["2.1. Teorias generales a aplicar (5 citas)","2.2. Teorias especificas que tratan el tema (5 citas)","2.3. Glosario adaptado al tema (50 palabras)"].map(x => "CAPITULO 2. MARCO REFERENCIAL/" + x),
 ...["2.4.1.1. Constitucion de la Republica del Ecuador","2.4.1.2. Secretaria Nacional de Planificacion","2.4.1.3. Normativas y ordenanzas nacionales y locales","2.4.1.4. Ordenanzas municipales","2.4.1.5. Norma Ecuatoriana de la Construccion NEC","2.4.1.6. Sistema contra incendios S.C.I"].map(x => C24 + "/2.4.1. Normativa Nacional (Citas)/" + x),
 C24 + "/2.4.2. Normativas aplicables especificas al tema (5)",
 ...CERT.map((c, i) => C24 + "/2.4.3. Normativas nacionales e internacionales (5)/2.4.3.1. Certificaciones nacionales e internacionales/" + String(i + 1).padStart(2, "0") + ". " + c),
 "CAPITULO 2. MARCO REFERENCIAL/2.5. Conclusiones",
 ...["3.1. Metodologia y metodos de investigacion","3.2. Poblacion/3.2.1. Metodos de investigacion a aplicar","3.2. Poblacion/3.2.2. Muestra (300 a 500 personas)","3.2. Poblacion/3.2.3. Encuesta, graficos y analisis de resultados","3.3. Entrevistas (5 Profesionales)/3.3.1. Entrevista a arquitectos expertos","3.3. Entrevistas (5 Profesionales)/3.3.2. Entrevista a posibles usuarios","3.3. Entrevistas (5 Profesionales)/3.3.3. Entrevista a profesionales relacionados","3.3. Entrevistas (5 Profesionales)/3.3.4. Analisis de entrevistas","3.4. Conclusiones"].map(x => "CAPITULO 3. MARCO METODOLOGICO/" + x),
 ...["4.1. Nacionales (5)","4.2. Internacionales (5)"].flatMap(g => ["1. Imagenes, datos generales, ubicacion, autor y tiempo","2. Analisis funcional y organizacion espacial","3. Analisis conceptual y morfologico","4. Aplicacion de materiales","5. Innovaciones en el diseno"].map(x => "CAPITULO 4. CASOS ANALOGOS/" + g + "/" + g.slice(0, 4) + x)),
 "CAPITULO 4. CASOS ANALOGOS/4.3. Tabla de analisis cualitativo y comparativo", "CAPITULO 4. CASOS ANALOGOS/4.4. Conclusiones",
 ...["5.1. Tabla ponderada de posibles ubicaciones (5)","5.2. Ubicacion espacial, coordenadas UTM y delimitacion","5.3. Cartografia (GAD, Catastro)","5.4. Antecedentes historicos y arquitectonicos del area","5.5. Clima, temperaturas y presion atmosferica","5.6. Analisis grafico (Carta solar, impacto termico)","5.7. Analisis grafico (Vientos, afectacion del entorno)","5.8. Precipitaciones pluviales, inundaciones y aluviones","5.9. Vialidad, distancias y tiempos (5km)","5.10. Accesibilidad y circulacion (Vehicular, peatonal)","5.11. Analisis grafico sensorial y afectacion del entorno","5.12. Situacion urbana, uso de suelo e hitos","5.13. Equipamiento urbano (5km)","5.14. Tipo de suelo, estratos e historial sismico","5.15. Levantamiento topografico, niveles IGM y visuales","5.16. Tabla de Flora endemica (Existente y a proponer)","5.17. Tabla de Fauna endemica (Favorable y no favorable)","5.18. Problemas ambientales y antropogenicos"].map(x => "CAPITULO 5. ANALISIS DEL SITIO/" + x),
 ...["6.1. Factibilidad financiera","6.2. Factibilidad comercial (Autogestion)","6.3. Factibilidad organizacional y manejo","6.4. Factibilidad ambiental (Graficos)/6.4.1. Emplazamiento y parcela sostenible (PS)","6.4. Factibilidad ambiental (Graficos)/6.4.2. Eficiencia en consumo de agua (EA)","6.4. Factibilidad ambiental (Graficos)/6.4.3. Energia y atmosfera (EYA)","6.4. Factibilidad ambiental (Graficos)/6.4.4. Materiales y recursos","6.4. Factibilidad ambiental (Graficos)/6.4.5. Calidad ambiental en interiores y exteriores","6.4. Factibilidad ambiental (Graficos)/6.4.6. Innovaciones en el diseno","6.5. Conclusion"].map(x => "CAPITULO 6. FACTIBILIDAD/" + x),
 ...["7.1. FODA","7.2. CAME","7.3. PESTEL","7.4. POSTER","7.5. Tabla de programa de requerimientos y necesidades","7.6. Criterios de diseno arquitectonico (Forma y funcion)","7.7. Estrategias (Urbanas, arquitectonicas, constructivas)","7.8. Conclusion"].map(x => "CAPITULO 7. PROGRAMACION DEL PROYECTO/" + x),
 ...["8.1. Graficacion y analisis del Concepto","8.2. Esquema de estilo arquitectonico y autores","8.3. Tabla de areas (Analisis cientifico, tecnico, estetico, social)","8.4. Bocetos bidimensionales","8.5. Axonometrias de ambientes","8.6. Maqueteria generica (Digital y fisica)","8.7. Zonificacion general (2D y 3D)","8.8. Esquema funcional (Diagrama de burbujas)","8.9. Matriz de relaciones","8.10. Circulaciones directa e indirecta","8.11. Analisis COS, CUS, CAS","8.12. Analisis grafico aplicado (Funcion y forma)","8.13. Tabla cualitativa y cuantitativa de areas","8.14. Conclusion"].map(x => "CAPITULO 8. ANTEPROYECTO/" + x),
 ...["9.1. Ubicacion geografica e implantacion del entorno","9.2. Plantas generales y plantas especificas","9.3. Secciones transversales y longitudinales","9.4. Elevaciones generales y especificas","9.5. Implantacion general y especifica","9.6. Perspectivas exteriores e interiores","9.7. Diseno paisajistico y vegetacion","9.8. Diseno de pisos, paredes y cubiertas","9.9. Detalles arquitectonicos constructivos","9.10. Detalles de mobiliario","9.11. Maqueta (Fisica, digital, renders, recorridos)","9.12. Bastidores formato A1"].map(x => "CAPITULO 9. PROPUESTA ARQUITECTONICA/" + x),
 ...["10.1. Memoria Descriptiva (Proceso constructivo y materialidad)","10.2. Pre-Diseno estructural","10.3. Pre-Diseno de instalaciones (Sanitario, electrico, HVAC, domotica, SCI)","10.4. Presupuesto referencial","10.5. Cronograma referencial","10.6. Tabla de ponderacion de certificaciones aplicadas"].map(x => "CAPITULO 10. MEMORIA TECNICA/" + x),
 "CAPITULO 11. CONCLUSIONES Y RECOMENDACIONES/11.1. Conclusiones generales y especificas", "CAPITULO 11. CONCLUSIONES Y RECOMENDACIONES/11.2. Recomendaciones generales y especificas",
 ...["12.1. Borradores de textos y graficos del proyecto","12.2. Apuntes varios de investigacion","12.3. Fichas de encuestas y entrevistas","12.4. Bibliografia bajo norma APA"].map(x => "CAPITULO 12. BIBLIOGRAFIA Y ANEXOS/" + x)
];

/* --- códigos de tipología: los 11 de siempre + todas las del Atlas --- */
const BASE = [["000.","000. Código básico"],["TS01.","TS01. Tesis"],["VU01.","VU01. Vivienda unifamiliar"],["VM01.","VM01. Vivienda multifamiliar"],["VC01.","VC01. Vivienda comercio"],["CM01.","CM01. Comercio"],["OF01.","OF01. Oficinas"],["OC01.","OC01. Oficinas comercio"],["HH01.","HH01. Salud"],["ED01.","ED01. Educativo / Pabellón"],["TR01.","TR01. Equipamiento de transporte"]];
const PRE = {HOS:"HO",COM:"CM",GAS:"GA",OFI:"OF",MIX:"MX",SAL:"HH",EDU:"ED",CUL:"CU",REL:"RE",GOB:"GB",SEG:"SE",SOC:"SO",DEP:"DP",PUB:"EP",EVE:"EV",TRA:"TR",IND:"IN",AGR:"AG",INF:"IF",CIE:"CI",EFI:"EF",FUT:"FU"};
const nrm = s => String(s || "").normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();
function codes(){
  const T = (window.DION && window.DION.TYPES) || [], cnt = {}, out = [];
  T.forEach(t => { let p = PRE[t.cat] || "XX"; if (t.cat === "RES"){ const s = nrm(t.sub + " " + t.n); p = /multifam|colectiv|edificio|departament|torre/.test(s) ? "VM" : /unifam|casa|cabana|chalet|villa/.test(s) ? "VU" : "RS"; }
    cnt[p] = (cnt[p] || 0) + 1; out.push({id:t.id, code:p + String(cnt[p]).padStart(2, "0") + ".", n:t.n, cat:t.catn || t.cat, sub:t.sub}); });
  return out;
}
let CODES = null;
const getCodes = () => CODES || (CODES = codes());

function acro(text){
  if (!text) return "PRJ";
  const clean = String(text).normalize("NFD").replace(/[̀-ͯ]/g, "");
  const w = clean.trim().split(/\s+/).filter(x => x.length > 2);
  if (w.length >= 2) return w.map(x => x[0]).join("").substring(0, 4).toUpperCase();
  return clean.replace(/[^a-zA-Z0-9]/g, "").substring(0, 4).toUpperCase() || "PRJ";
}

/* --- ZIP solo de carpetas, compatible con el Explorador de Windows --- */
function zipDirs(paths){
  const d = new Date(), dt = (d.getHours() << 11) | (d.getMinutes() << 5) | (d.getSeconds() >> 1), dd = ((d.getFullYear() - 1980) << 9) | ((d.getMonth() + 1) << 5) | d.getDate();
  const set = new Set(); paths.forEach(p => { const parts = p.split("/"); for (let i = 1; i <= parts.length; i++) set.add(parts.slice(0, i).join("/") + "/"); });
  const list = [...set].sort(), loc = [], cen = []; let off = 0; const enc = new TextEncoder();
  for (const name of list){
    const nb = enc.encode(name), l = new Uint8Array(30 + nb.length), lv = new DataView(l.buffer);
    lv.setUint32(0, 0x04034b50, true); lv.setUint16(4, 20, true); lv.setUint16(6, 0x0800, true); lv.setUint16(10, dt, true); lv.setUint16(12, dd, true); lv.setUint16(26, nb.length, true); l.set(nb, 30); loc.push(l);
    const c = new Uint8Array(46 + nb.length), cv = new DataView(c.buffer);
    cv.setUint32(0, 0x02014b50, true); cv.setUint16(4, 20, true); cv.setUint16(6, 20, true); cv.setUint16(8, 0x0800, true); cv.setUint16(12, dt, true); cv.setUint16(14, dd, true); cv.setUint16(28, nb.length, true); cv.setUint32(38, 0x10, true); cv.setUint32(42, off, true); c.set(nb, 46); cen.push(c);
    off += l.length;
  }
  const cs = cen.reduce((a, c) => a + c.length, 0), e = new Uint8Array(22), ev = new DataView(e.buffer);
  ev.setUint32(0, 0x06054b50, true); ev.setUint16(8, list.length, true); ev.setUint16(10, list.length, true); ev.setUint32(12, cs, true); ev.setUint32(16, off, true);
  return {blob:new Blob([...loc, ...cen, e], {type:"application/zip"}), n:list.length};
}

const CSS = `
.m-arranque{container-type:inline-size;min-height:100%;padding:18px;background:radial-gradient(circle at 50% -10%,rgba(56,225,255,.12),transparent 60%),linear-gradient(rgba(56,225,255,.035) 1px,transparent 1px) 0 0/32px 32px,linear-gradient(90deg,rgba(56,225,255,.035) 1px,transparent 1px) 0 0/32px 32px}
.m-arranque-hd{display:flex;align-items:center;gap:12px;flex-wrap:wrap;border-bottom:1px solid var(--line2);padding-bottom:12px;margin-bottom:16px}
.m-arranque-hd b{font-family:var(--f-d);font-weight:400;letter-spacing:.16em;color:var(--acc);font-size:15px;text-shadow:0 0 12px rgba(var(--acc-rgb),.5)}
.m-arranque-badge{margin-left:auto;font-family:var(--f-m);font-size:10px;letter-spacing:.14em;background:#f59e0b;color:#03060B;padding:4px 10px;border-radius:3px;box-shadow:0 0 14px rgba(245,158,11,.45)}
.m-arranque-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:14px 18px}
@container (max-width:720px){.m-arranque-grid{grid-template-columns:1fr}}
.m-arranque-f{display:flex;flex-direction:column;gap:6px;min-width:0}
.m-arranque-f>span{font-family:var(--f-m);font-size:10px;letter-spacing:.16em;color:var(--acc)}
.m-arranque-f input,.m-arranque-f select{background:rgba(2,12,22,.95);border:1px solid rgba(var(--acc-rgb),.35);border-radius:4px;padding:11px 12px;font-weight:600;letter-spacing:.04em;min-height:44px;width:100%}
.m-arranque-f input:focus,.m-arranque-f select:focus{outline:none;border-color:var(--acc);box-shadow:0 0 14px rgba(var(--acc-rgb),.4)}
.m-arranque-tip{grid-column:1/-1;position:relative}
.m-arranque-list{position:absolute;z-index:5;left:0;right:0;top:100%;max-height:280px;overflow:auto;background:#030c16;border:1px solid var(--acc);border-radius:4px;margin-top:4px;box-shadow:0 12px 30px rgba(0,0,0,.6)}
.m-arranque-list button{display:flex;gap:10px;width:100%;text-align:left;border:0;background:none;padding:9px 12px;border-bottom:1px solid var(--line);min-height:40px;align-items:center}
.m-arranque-list button:hover,.m-arranque-list button.on{background:rgba(var(--acc-rgb),.12)}
.m-arranque-list code{font-family:var(--f-m);color:#f59e0b;min-width:58px}
.m-arranque-list small{margin-left:auto;color:var(--faint);font-size:11px}
.m-arranque-list i{display:block;font-style:normal;font-family:var(--f-m);font-size:10px;letter-spacing:.14em;color:var(--faint);padding:8px 12px 4px}
.m-arranque-modes{grid-column:1/-1;display:grid;grid-template-columns:repeat(3,1fr);gap:12px}
@container (max-width:720px){.m-arranque-modes{grid-template-columns:1fr}}
.m-arranque-mode{border:1px solid rgba(var(--acc-rgb),.3);background:rgba(var(--acc-rgb),.03);border-radius:4px;padding:14px;text-align:center;min-height:64px}
.m-arranque-mode b{display:block;font-family:var(--f-d);font-weight:400;font-size:11px;letter-spacing:.12em}
.m-arranque-mode small{color:var(--muted);font-size:12px}
.m-arranque-mode[aria-pressed="true"]{border-color:#f59e0b;background:rgba(245,158,11,.12);box-shadow:0 0 16px rgba(245,158,11,.4)}
.m-arranque-code{margin-top:16px;border:1px dashed var(--line2);border-radius:6px;padding:12px 14px;font-family:var(--f-m);font-size:12px;color:var(--done);word-break:break-all}
.m-arranque-code small{display:block;color:var(--faint);letter-spacing:.14em;font-size:10px;margin-bottom:4px}
.m-arranque-acts{display:grid;grid-template-columns:2fr 1fr;gap:12px;margin-top:14px}
@container (max-width:520px){.m-arranque-acts{grid-template-columns:1fr}}
.m-arranque-go{min-height:52px;border-radius:4px;font-family:var(--f-d);font-size:11px;letter-spacing:.16em;border:1px solid var(--acc);color:var(--acc);background:linear-gradient(90deg,rgba(var(--acc-rgb),.12),rgba(245,158,11,.12))}
.m-arranque-go:hover{background:linear-gradient(90deg,var(--acc),#f59e0b);color:#03060B}
.m-arranque-nx{min-height:52px;border-radius:4px;font-family:var(--f-d);font-size:11px;letter-spacing:.14em;border:0;background:var(--done);color:#03060B;box-shadow:0 0 20px rgba(var(--done-rgb),.4)}
.m-arranque-log{margin-top:14px;background:rgba(1,8,15,.95);border:1px solid var(--line2);border-radius:4px;padding:10px 14px;font-family:var(--f-m);font-size:11.5px;color:#38bdf8;max-height:130px;overflow:auto;white-space:pre-wrap}
.m-arranque-tree{margin-top:14px;font-family:var(--f-m);font-size:11px;color:var(--muted);max-height:220px;overflow:auto;border-left:1px solid var(--line2);padding-left:10px}
`;

let ui = {q:"", open:false, log:[]};
DION_MOD.arranque = {
  titulo:"Arranque · carpetas del proyecto", sub:"Matriz avanzada BIM + índice de carpetas de la tesis",
  render(el, ctx){
    if (!document.getElementById("mod-arranque-css")){ const s = document.createElement("style"); s.id = "mod-arranque-css"; s.textContent = CSS; document.head.appendChild(s); }
    const P = ctx.P, st = Object.assign({cliente:P.cliente || "", fecha:new Date().toISOString().slice(0, 10), modo:"AMBAS", code:"", tipoN:""}, ctx.get("arranque"));
    if (!st.code){ const c = getCodes().find(x => x.id === P.tipo); if (c){ st.code = c.code; st.tipoN = c.n; } else { st.code = "000."; st.tipoN = "Código básico"; } }
    const esc = ctx.esc;
    const tags = () => { const [y, m, d] = st.fecha.split("-"); const f = `${d}.${m}.${(y || "").slice(-2)}`, cp = acro(P.nombre), cc = acro(st.cliente);
      return {f, cp, full:`${st.code}${cc}_${cp}_V01_${f}`, sub:`${cc}.${cp}_${f}`, root:`PROYECTO_${cp}_${f}`}; };
    const log = m => { ui.log.unshift("> " + m); const L = el.querySelector(".m-arranque-log"); if (L) L.textContent = ui.log.slice(0, 40).join("\n"); };
    let saveT; const keep = () => { clearTimeout(saveT); saveT = setTimeout(() => { ctx.set("arranque", st); if (st.cliente !== (P.cliente || "")) ctx.setP({cliente:st.cliente}); }, 600); };
    function listHTML(){
      const q = nrm(ui.q), base = BASE.filter(b => !q || nrm(b[1]).includes(q)), all = getCodes().filter(c => !q || nrm(c.code + " " + c.n + " " + c.cat + " " + c.sub).includes(q)).slice(0, 400);
      return (base.length ? `<i>CÓDIGOS BASE</i>` + base.map(b => `<button data-pick="${b[0]}" data-n="${esc(b[1].slice(b[0].length + 1))}"><code>${b[0]}</code>${esc(b[1].slice(b[0].length + 1))}</button>`).join("") : "")
        + `<i>TODAS LAS TIPOLOGÍAS DEL ATLAS (${getCodes().length})</i>` + all.map(c => `<button data-pick="${c.code}" data-n="${esc(c.n)}" class="${c.code === st.code ? "on" : ""}"><code>${c.code}</code>${esc(c.n)}<small>${esc(c.cat)}</small></button>`).join("");
    }
    function draw(){
      const t = tags();
      el.innerHTML = `<div class="m-arranque">
        <div class="m-arranque-hd"><b>ARCH-CORE // MATRIZ GEN</b><span style="color:var(--muted);font-size:12px">Se crea el día 1, antes de cualquier archivo</span><span class="m-arranque-badge">SISTEMATIZACIÓN ${new Date().getFullYear()}</span></div>
        <div class="m-arranque-grid">
          <label class="m-arranque-f"><span>NOMBRE DEL PROYECTO</span><input value="${esc(P.nombre || "")}" readonly title="Se toma del proyecto"></label>
          <label class="m-arranque-f"><span>CLIENTE / ENTIDAD</span><input id="ar-cli" value="${esc(st.cliente)}" placeholder="Ej: GAD MUNICIPAL"></label>
          <label class="m-arranque-f"><span>FECHA DEL PROYECTO</span><input type="date" id="ar-fe" value="${esc(st.fecha)}"></label>
          <div class="m-arranque-f m-arranque-tip"><span>TIPOLOGÍA ARQUITECTÓNICA · CÓDIGO</span>
            <input id="ar-q" autocomplete="off" placeholder="Busca entre todas las tipologías…" value="${esc(ui.open ? ui.q : st.code + " " + st.tipoN)}">
            <div class="m-arranque-list" id="ar-list" ${ui.open ? "" : "hidden"}>${ui.open ? listHTML() : ""}</div></div>
          <div class="m-arranque-f" style="grid-column:1/-1"><span>ESTRUCTURA DE EXPORTACIÓN</span>
            <div class="m-arranque-modes">${[["MATRIZ","MATRIZ AVANZADA","Estructura técnica BIM/CAD"],["INDICE","ÍNDICE DE CARPETAS","Metodología de diseño · tesis"],["AMBAS","SISTEMA INTEGRAL","Ambas matrices"]].map(m => `<button class="m-arranque-mode" data-mode="${m[0]}" aria-pressed="${st.modo === m[0]}"><b>${m[1]}</b><small>${m[2]}</small></button>`).join("")}</div></div>
        </div>
        <div class="m-arranque-code"><small>CÓDIGO DEL PROYECTO</small>${esc(t.full)}<br><span style="color:var(--muted)">${esc(t.root)} · subcódigo ${esc(t.sub)}</span></div>
        <div class="m-arranque-acts"><button class="m-arranque-go" id="ar-zip">⭳ DESCARGAR ESTRUCTURA (.ZIP)</button><button class="m-arranque-nx" id="ar-next">SIGUIENTE ESTACIÓN →</button></div>
        <div class="m-arranque-log">${esc(ui.log.slice(0, 40).join("\n") || "> Motor listo. Revisa cliente, tipología y fecha y genera la estructura.")}</div>
        <details style="margin-top:12px"><summary style="cursor:pointer;color:var(--muted);font-size:12px">Ver árbol que se va a crear</summary><div class="m-arranque-tree">${paths().slice(0, 400).map(p => esc(p)).join("<br>")}</div></details>
      </div>`;
      bind();
    }
    function paths(){ const t = tags(); let out = [];
      if (st.modo !== "INDICE") out = out.concat(MATRIZ.map(p => `${t.root}/${t.full}/` + p.replace(/\{F\}/g, t.full).replace(/\{S\}/g, t.sub)));
      if (st.modo !== "MATRIZ") out = out.concat(INDICE.map(p => `${t.root}/INDICE DE CARPETAS AMARILLAS/` + p));
      return out; }
    function bind(){
      const q = el.querySelector("#ar-q"), L = el.querySelector("#ar-list");
      el.querySelector("#ar-cli").oninput = e => { st.cliente = e.target.value; keep(); upd(); };
      el.querySelector("#ar-fe").onchange = e => { st.fecha = e.target.value || st.fecha; keep(); upd(); };
      q.onfocus = () => { ui.open = true; ui.q = ""; q.value = ""; L.hidden = false; L.innerHTML = listHTML(); };
      q.oninput = () => { ui.q = q.value; L.innerHTML = listHTML(); };
      q.onblur = () => setTimeout(() => { if (ui.open){ ui.open = false; draw(); } }, 180);
      L.onpointerdown = e => e.preventDefault();
      L.onclick = e => { const b = e.target.closest("[data-pick]"); if (!b) return; st.code = b.dataset.pick; st.tipoN = b.dataset.n; ui.open = false; log("Tipología: " + st.code + " " + st.tipoN); keep(); draw(); };
      el.querySelectorAll("[data-mode]").forEach(b => b.onclick = () => { st.modo = b.dataset.mode; log("Modo: " + st.modo); keep(); draw(); });
      el.querySelector("#ar-next").onclick = () => ctx.next();
      el.querySelector("#ar-zip").onclick = async () => {
        if (!st.cliente.trim()){ log("[ALERTA] Falta el cliente / entidad."); ctx.toast("Escribe el cliente o entidad"); return; }
        const t = tags(), ps = paths(); log("Compilando código: " + t.full);
        const z = zipDirs(ps); log(`Creando ${z.n} carpetas…`);
        const fn = `Estructura_${t.cp}_${t.f}.zip`;
        try { await ctx.download(fn, z.blob); log("LISTO: " + fn + " (descomprímelo en tu disco: crea todas las carpetas)"); st.generado = Date.now(); ctx.set("arranque", st); ctx.setP({codigo:t.full}); }
        catch(e){ log("No se pudo descargar: " + (e && e.message || e)); }
      };
    }
    function upd(){ const t = tags(), c = el.querySelector(".m-arranque-code"); if (c) c.innerHTML = `<small>CÓDIGO DEL PROYECTO</small>${esc(t.full)}<br><span style="color:var(--muted)">${esc(t.root)} · subcódigo ${esc(t.sub)}</span>`; }
    draw();
  }
};
DION_MOD.arranque._paths = {MATRIZ, INDICE, acro, zipDirs, getCodes};
})();
