/* =========================================================
   FLUJO DE PROYECTO — materias en orden, pasos, avance por líneas
   (depende de window.ATLAS, window.FLUJO_M, FLUJO_COD, FLUJO_CARPETAS)
   ========================================================= */
(function(){
"use strict";
const A = window.ATLAS; if (!A) return;
const {esc, pad, uid, toast, blobUrl, norm, BYID, TAX} = A;
const $ = s => document.querySelector(s);
const M = (window.FLUJO_M || []).slice().sort((a,b) => a.orden - b.orden);
const COD = window.FLUJO_COD || {grupos:[]}, CARP = window.FLUJO_CARPETAS || [];

/* ---------- índice global de pasos ---------- */
const STEPS = [], SBY = {}, MBY = {};
M.forEach(m => { MBY[m.id] = m; m._steps = []; m.fases.forEach((f, fi) => f.pasos.forEach(p => { const s = {p, m, f, fi, gi: STEPS.length}; STEPS.push(s); SBY[p.id] = s; m._steps.push(s); })); });

const LINES = [
  {k:"all",  n:"Proceso general", c:"var(--l-all)"},
  {k:"dis",  n:"Diseño",          c:"var(--l-dis)"},
  {k:"bim",  n:"BIM",             c:"var(--l-bim)"},
  {k:"sost", n:"Sostenibilidad",  c:"var(--l-sost)"},
  {k:"mant", n:"Mantenimiento",   c:"var(--l-mant)"},
  {k:"doc",  n:"Documentación",   c:"var(--l-doc)"}
];
const TAGN = {dis:"Diseño", bim:"BIM", sost:"Sostenibilidad", mant:"Mantenimiento", doc:"Documentación"};
const FLAGS = [
  ["pub","Promotor público","Contratación por SERCOP / LOSNCP"],
  ["ph","Propiedad horizontal","Unidades independientes con alícuotas"],
  ["venta","Venta o preventa","Se venden unidades a terceros (fideicomiso, punto de equilibrio)"],
  ["salud","Salud","Establecimiento regulado por MSP / ACESS"],
  ["edu","Educación","MINEDUC, MIES, centros de cuidado infantil"],
  ["alim","Alimentos y bebidas","Cocinas, restaurantes, plantas: ARCSA"],
  ["tur","Alojamiento turístico","Hoteles, hostales, hosterías: MINTUR"],
  ["ind","Industrial","Naves, plantas, bodegas industriales"],
  ["grande","Proyecto grande","≥ 1 500 m² o ≥ 4 pisos"],
  ["patr","Zona patrimonial","Centro histórico o bien inventariado (INPC)"]
];
const CUANDO_N = Object.fromEntries(FLAGS.map(f => [f[0], f[1]]));

/* ---------- enlaces por clave (ubicación del proyecto) ---------- */
const LINKS = {
  maps:{n:"Google Maps", u:"https://www.google.com/maps/search/?api=1&query={lat},{lon}", u0:"https://www.google.com/maps"},
  earth:{n:"Google Earth", u:"https://earth.google.com/web/search/{lat},{lon}", u0:"https://earth.google.com/web/"},
  osm:{n:"OpenStreetMap", u:"https://www.openstreetmap.org/?mlat={lat}&mlon={lon}#map=17/{lat}/{lon}", u0:"https://www.openstreetmap.org"},
  suncalc:{n:"SunCalc · asoleamiento", u:"https://www.suncalc.org/#/{lat},{lon},17/{hoy}/12:00/1/3", u0:"https://www.suncalc.org"},
  solaratlas:{n:"Global Solar Atlas", u:"https://globalsolaratlas.info/map?c={lat},{lon},11", u0:"https://globalsolaratlas.info"},
  meteoblue:{n:"Meteoblue · clima", u:"https://www.meteoblue.com/weather-maps#coords=13/{lat}/{lon}", u0:"https://www.meteoblue.com/weather-maps"},
  windfinder:{n:"Windfinder · vientos", u:"https://www.windfinder.com/#14/{lat}/{lon}", u0:"https://www.windfinder.com"},
  nasapower:{n:"NASA POWER · datos climáticos", u0:"https://power.larc.nasa.gov/data-access-viewer/"},
  epw:{n:"Archivos climáticos EPW", u0:"https://climate.onebuilding.org"},
  "ec:nec":{n:"NEC · Norma Ecuatoriana de la Construcción", u0:"https://www.habitatyvivienda.gob.ec/documentos-normativos-nec-norma-ecuatoriana-de-la-construccion/"},
  "ec:inen":{n:"INEN · normas técnicas", u0:"https://www.normalizacion.gob.ec"},
  "ec:suia":{n:"SUIA · regularización ambiental", u0:"https://suia.ambiente.gob.ec"},
  "ec:sercop":{n:"SERCOP · compras públicas", u0:"https://portal.compraspublicas.gob.ec"},
  "ec:inamhi":{n:"INAMHI · meteorología", u0:"https://www.inamhi.gob.ec"},
  "ec:igm":{n:"Geoportal IGM", u0:"https://www.geoportaligm.gob.ec"},
  "ec:sngr":{n:"Gestión de Riesgos (SNGR)", u0:"https://www.gestionderiesgos.gob.ec"},
  "ec:acess":{n:"ACESS", u0:"https://www.acess.gob.ec"},
  "ec:msp":{n:"Ministerio de Salud Pública", u0:"https://www.salud.gob.ec"},
  "ec:arcsa":{n:"ARCSA", u0:"https://www.controlsanitario.gob.ec"},
  "ec:mintur":{n:"Ministerio de Turismo", u0:"https://www.turismo.gob.ec"},
  "ec:mineduc":{n:"Ministerio de Educación", u0:"https://educacion.gob.ec"},
  "ec:mies":{n:"MIES", u0:"https://www.inclusion.gob.ec"},
  "ec:iess":{n:"IESS", u0:"https://www.iess.gob.ec"},
  "ec:sri":{n:"SRI", u0:"https://www.sri.gob.ec"},
  "ec:supercias":{n:"Superintendencia de Compañías", u0:"https://www.supercias.gob.ec"},
  "ec:inec":{n:"INEC · estadísticas", u0:"https://www.ecuadorencifras.gob.ec"},
  "ec:cnel":{n:"CNEL EP", u0:"https://www.cnelep.gob.ec"},
  "ec:inpc":{n:"Instituto Nacional de Patrimonio Cultural", u0:"https://www.patrimoniocultural.gob.ec"},
  "gye:catastro":{n:"Catastro urbano de Guayaquil", u0:"https://guayaquil.maps.arcgis.com/apps/webappviewer/index.html?id=ff782e6d8cd04fa3ab4696ab5ab9fed9", gye:1},
  "gye:usosuelo":{n:"Mapa de usos de suelo · Guayaquil", u0:"https://www.arcgis.com/apps/mapviewer/index.html?webmap=642a6cb279d74e2c83952a5a0835e897", gye:1},
  "gye:mimg":{n:"MIMG · consulta de uso de suelo", u0:"https://tramites4.guayaquil.gob.ec/usodesuelos/Consultas/SUS00001.aspx", gye:1},
  "gye:ruido":{n:"Ruido en Guayaquil (StoryMap)", u0:"https://storymaps.arcgis.com/stories/661c60d66b5442e48c47b9e133474ae8", gye:1},
  "gye:amb":{n:"ArcGIS · datos ambientales y urbanos", u0:"https://www.arcgis.com/apps/mapviewer/index.html?layers=cf160a2cd64943868b121f5acf6863b4", gye:1},
  "gye:muni":{n:"Municipio de Guayaquil", u0:"https://www.guayaquil.gob.ec", gye:1},
  "gye:bomberos":{n:"Bomberos de Guayaquil", u0:"https://www.bomberosguayaquil.gob.ec", gye:1},
  "gye:interagua":{n:"Interagua", u0:"https://www.interagua.com.ec", gye:1},
  iso19650:{n:"ISO 19650", u0:"https://www.iso.org/standard/68078.html"},
  leed:{n:"LEED (USGBC)", u0:"https://www.usgbc.org/leed"},
  edge:{n:"EDGE", u0:"https://edgebuildings.com"},
  well:{n:"WELL", u0:"https://www.wellcertified.com"},
  passivhaus:{n:"Passive House Institute", u0:"https://passivehouse.com"},
  breeam:{n:"BREEAM", u0:"https://breeam.com"},
  nfpa:{n:"NFPA · códigos", u0:"https://www.nfpa.org/codes-and-standards"},
  bimobject:{n:"BIMobject · familias", u0:"https://www.bimobject.com"},
  archdaily:{n:"ArchDaily", u0:"https://www.archdaily.com"},
  plataforma:{n:"Plataforma Arquitectura", u0:"https://www.plataformaarquitectura.cl"},
  scholar:{n:"Google Académico", u0:"https://scholar.google.com"},
  adobecolor:{n:"Adobe Color", u0:"https://color.adobe.com/es/create/color-wheel"},
  "familias-carrier":{n:"Carrier · familias Revit HVAC", u0:"https://www.carrier.com/us/en/commercial/software/revit-3d-templates/"},
  "familias-emseal":{n:"Sika Emseal · juntas BIM", u0:"https://www.emseal.com/expansion-joint-resources/bim-library-2/"},
  ashrae:{n:"ASHRAE · normas", u0:"https://www.ashrae.org/technical-resources/standards-and-guidelines"},
  who:{n:"OMS", u0:"https://www.who.int"},
  unhabitat:{n:"ONU-Hábitat", u0:"https://unhabitat.org"},
  ifc:{n:"buildingSMART · IFC", u0:"https://technical.buildingsmart.org/standards/ifc/"}
};
const hasLL = P => P && P.loc && isFinite(parseFloat(P.loc.lat)) && isFinite(parseFloat(P.loc.lon)) && P.loc.lat !== "" && P.loc.lon !== "";
const isGye = P => /guayaquil/.test(norm(P && P.loc && P.loc.canton || ""));
function fillT(t, P){
  const L = (P && P.loc) || {}, d = new Date();
  const o = BYID[P && P.tipo];
  return t.replace(/\{(\w+)\}/g, (_, k) => ({lat:L.lat, lon:L.lon, canton:L.canton||"", provincia:L.provincia||"", ciudad:L.ciudad||L.canton||"", pais:L.pais||"Ecuador", tipologia:o ? o.n : "", hoy:`${d.getFullYear()}.${pad(d.getMonth()+1)}.${pad(d.getDate())}`}[k] ?? ""));
}
function fuente(key, P){
  if (key.startsWith("q:")){ const q = fillT(key.slice(2), P).replace(/\s+/g," ").trim(); return {n:q, u:"https://www.google.com/search?q=" + encodeURIComponent(q), q:1}; }
  const L = LINKS[key]; if (!L) return null;
  if (L.gye && P && P.loc && P.loc.canton && !isGye(P)) return null;
  if (L.u && hasLL(P)) return {n:L.n, u:fillT(L.u, P)};
  return {n:L.n, u:L.u0, off: !!L.u};
}

/* ---------- coordenadas ---------- */
function parseCoords(s){
  s = String(s||"").trim(); if (!s) return null;
  let m = s.match(/!3d(-?\d+\.\d+)!4d(-?\d+\.\d+)/) || s.match(/@(-?\d+\.\d+),(-?\d+\.\d+)/) || s.match(/[?&]q(?:uery)?=(-?\d+\.\d+),\s*(-?\d+\.\d+)/);
  if (m) return {lat:+m[1], lon:+m[2]};
  m = s.match(/^(-?\d+(?:\.\d+)?)\s*[,; ]\s*(-?\d+(?:\.\d+)?)$/); if (m) return {lat:+m[1], lon:+m[2]};
  const re = /(\d+(?:\.\d+)?)\s*°\s*(\d+(?:\.\d+)?)?\s*['’′]?\s*(\d+(?:\.\d+)?)?\s*(?:"|”|″|'')?\s*([NSEWO])/gi; const parts = [...s.matchAll(re)];
  if (parts.length >= 2){ const v = p => { let x = +p[1] + (+p[2]||0)/60 + (+p[3]||0)/3600; if (/[SWO]/i.test(p[4])) x = -x; return x; }; return {lat:v(parts[0]), lon:v(parts[1])}; }
  return null;
}
function toUTM(lat, lon){
  const a = 6378137, f = 1/298.257223563, k0 = .9996, e2 = f*(2-f), ep2 = e2/(1-e2);
  const zone = Math.floor((lon + 180)/6) + 1, lon0 = ((zone-1)*6 - 180 + 3) * Math.PI/180;
  const φ = lat*Math.PI/180, λ = lon*Math.PI/180;
  const N = a/Math.sqrt(1 - e2*Math.sin(φ)**2), T = Math.tan(φ)**2, C = ep2*Math.cos(φ)**2, Aa = Math.cos(φ)*(λ - lon0);
  const Mm = a*((1 - e2/4 - 3*e2**2/64 - 5*e2**3/256)*φ - (3*e2/8 + 3*e2**2/32 + 45*e2**3/1024)*Math.sin(2*φ) + (15*e2**2/256 + 45*e2**3/1024)*Math.sin(4*φ) - (35*e2**3/3072)*Math.sin(6*φ));
  const x = k0*N*(Aa + (1-T+C)*Aa**3/6 + (5-18*T+T*T+72*C-58*ep2)*Aa**5/120) + 500000;
  let y = k0*(Mm + N*Math.tan(φ)*(Aa*Aa/2 + (5-T+9*C+4*C*C)*Aa**4/24 + (61-58*T+T*T+600*C-330*ep2)*Aa**6/720));
  if (lat < 0) y += 10000000;
  return {zone, hemi: lat < 0 ? "S" : "N", x, y};
}

/* ---------- estado ---------- */
let db = null, downloads = null, sample = null, unsub = null;
const F = {list: [], cur: null, page: "panel", mtab: {}, open: new Set(), showArch: false, pending: null, lib: false};
const P0 = () => F.list.find(x => x.id === F.cur);

function blank(){
  const now = Date.now();
  return {nombre:"", tipo:"", cliente:"", codigo:"", ini:"", creado:now, actualizado:now, estado:"activo", sesion:"",
    loc:{pais:"Ecuador", provincia:"", canton:"", ciudad:"", parroquia:"", direccion:"", lat:"", lon:"", catastro:""},
    datos:{terreno:"", construccion:"", pisos:""}, flags:{}, mat:{}, st:{}, nt:{}, lk:{}, im:{}, ap:{},
    bor:{programa:{filas:[], circ:25}, peticiones:[], ideas:"", correcciones:[], zon:[], burb:[], bocetos:[], rel:{}}, ej:[]};
}
function fix(P){ const b = blank(); for (const k in b){ if (P[k] === undefined) P[k] = b[k]; }
  for (const k of ["loc","datos","bor"]) P[k] = {...b[k], ...(P[k]||{})}; P.bor.programa = {...b.bor.programa, ...(P.bor.programa||{})}; return P; }

async function writeP(P){
  if (!P) return; P.actualizado = Date.now(); setSaved("busy");
  const {id, ...data} = P;
  try { if (db) await db.doc("flujos/" + id).set(JSON.parse(JSON.stringify(data))); setSaved("ok"); }
  catch(e){ setSaved("err"); toast(e && e.code === "quota_exceeded" ? "La base de datos está llena." : "No se pudo guardar el proyecto. Revisa la conexión."); }
}
let saveT = null;
function save(){ const P = P0(); if (!P) return; F.pending = P.id; setSaved("busy"); clearTimeout(saveT); saveT = setTimeout(() => { F.pending = null; writeP(F.list.find(x => x.id === P.id)); }, 700); }
function flush(){ if (F.pending){ clearTimeout(saveT); const id = F.pending; F.pending = null; writeP(F.list.find(x => x.id === id)); } }
function setSaved(st){ const el = $("#fl-saved"); if (!el) return; el.className = "saved " + st; el.lastChild.textContent = st === "ok" ? (db ? " Guardado" : " Solo en esta vista") : st === "busy" ? " Guardando…" : " Sin guardar"; }

/* ---------- aplicabilidad y avance ---------- */
const stOf = (P, id) => (P.st || {})[id] || "";
function autoOff(P, s){ const c = s.p.cuando; return !!(c && c.length && !c.some(k => (P.flags||{})[k])) && !["ok","wip","on"].includes(stOf(P, s.p.id)); }
function applies(P, s){ if ((P.mat||{})[s.m.id] === "no") return false; const st = stOf(P, s.p.id); if (st === "na") return false; return !autoOff(P, s); }
function lineStats(P, k, subset){
  const arr = (subset || STEPS).filter(s => (k === "all" || (s.p.tags||[]).includes(k)) && applies(P, s));
  let done = 0, last = -1;
  arr.forEach((s, i) => { const st = stOf(P, s.p.id); if (st === "ok"){ done++; last = i; } else if (st === "wip") done += .5; });
  const skipped = arr.filter((s, i) => i < last && stOf(P, s.p.id) !== "ok");
  const next = arr.filter((s, i) => i > last && stOf(P, s.p.id) !== "ok").slice(0, 4);
  return {n: arr.length, done, pct: arr.length ? done/arr.length : 0, skipped, next};
}
function allLines(P){ const out = {}; LINES.forEach(l => out[l.k] = lineStats(P, l.k)); const g = out.all;
  LINES.forEach(l => { const s = out[l.k]; s.behind = l.k !== "all" && g.done >= 5 && (g.pct - s.pct) > .15; }); return out; }
const pc = x => Math.round(x*100) + "%";

function suggestFlags(tipo){
  const o = BYID[tipo], f = {}; if (!o) return f; const c = o.cat.c, n = norm(o.n + " " + (o.sub ? o.sub.n : ""));
  if (c === "SAL") f.salud = 1; if (c === "EDU") f.edu = 1; if (c === "GAS") f.alim = 1; if (c === "HOS") f.tur = 1;
  if (c === "IND" || c === "AGR") f.ind = 1; if (["GOB","SEG","INF","TRA"].includes(c)) f.pub = 1;
  if (/edificio|condominio|departament|torre|conjunto|urbaniz|multifamiliar|living|mixto|oficinas|residencial/.test(n) && ["RES","MIX","OFI"].includes(c)){ f.ph = 1; f.venta = 1; }
  if (["MIX","OFI","EVE","DEP","TRA","INF"].includes(c) || /hospital|torre|centro comercial|estadio|aeropuerto/.test(n)) f.grande = 1;
  if (/restaurante|cafeter|bar|cocina|panader|food/.test(n)) f.alim = 1;
  return f;
}

/* ---------- estilos ---------- */
const CSS = `
:root{--l-all:#E4EEFA;--l-dis:#7FB2FF;--l-bim:#38E1FF;--l-sost:#B6FF3C;--l-mant:#FFB347;--l-doc:#C9A7FF}
#flujo .fwrap{max-width:1180px;margin:0 auto;padding:28px 22px 60px}
.fl-hero{display:flex;flex-wrap:wrap;gap:18px;align-items:flex-end;justify-content:space-between;margin-bottom:22px}
.fl-hero h1{font-family:var(--f-d);font-weight:400;font-size:clamp(20px,3vw,28px);letter-spacing:.08em;text-transform:uppercase;margin:4px 0 6px;text-wrap:balance}
.fl-hero h1 em{font-style:normal;color:var(--acc)}
.fl-hero p{color:var(--muted);max-width:66ch;margin:0}
.eyeb{font-family:var(--f-m);font-size:10.5px;letter-spacing:.16em;color:var(--acc);text-transform:uppercase}
.fl-seq{display:flex;flex-wrap:wrap;gap:6px;margin:0 0 26px;padding:0;list-style:none;counter-reset:m}
.fl-seq li{display:flex;align-items:center;gap:7px;font-size:12px;color:var(--muted);border:1px solid var(--line);border-radius:999px;padding:4px 11px 4px 5px}
.fl-seq li b{font-family:var(--f-m);font-weight:500;font-size:10px;color:var(--acc-ink);background:var(--acc);border-radius:999px;min-width:20px;height:20px;display:grid;place-items:center}
.fl-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(310px,1fr));gap:14px}
.fcard{border:1px solid var(--line2);border-radius:12px;background:var(--panel);padding:16px;display:flex;flex-direction:column;gap:12px;text-align:left;color:var(--ink);min-width:0}
.fcard:hover{border-color:var(--acc);box-shadow:var(--glow)}
.fcard h3{margin:0;font-family:var(--f-d);font-weight:400;font-size:14px;letter-spacing:.08em;text-transform:uppercase;overflow-wrap:anywhere}
.fcard .fmeta{font-size:12px;color:var(--muted);display:flex;flex-wrap:wrap;gap:4px 12px}
.minil{display:grid;grid-template-columns:92px 1fr 36px;gap:4px 8px;align-items:center;font-size:11px;color:var(--muted)}
.minil i{height:4px;border-radius:2px;background:rgba(255,255,255,.07);overflow:hidden;display:block}
.minil i u{display:block;height:100%}
.minil span.v{font-family:var(--f-m);text-align:right;font-variant-numeric:tabular-nums}
.fl-lib{display:flex;flex-wrap:wrap;gap:10px;margin-top:28px}
.fl-lib button{flex:1 1 260px;text-align:left;border:1px dashed var(--line2);border-radius:10px;background:none;padding:14px 16px;color:var(--ink)}
.fl-lib button:hover{border-color:var(--acc)}
.fl-lib small{display:block;color:var(--muted);font-size:12px;margin-top:3px}

#flov .ov{z-index:85}
#flov .fws{display:grid;grid-template-columns:250px minmax(0,1fr);height:100%}
#flov .fnav{border-right:1px solid var(--line);overflow:auto;padding:10px 0 20px;background:rgba(6,11,18,.7)}
#flov .fnav .grp{font-family:var(--f-m);font-size:9.5px;letter-spacing:.14em;color:var(--faint);text-transform:uppercase;padding:14px 16px 5px}
#flov .fnav button{display:grid;grid-template-columns:20px minmax(0,1fr) 34px;gap:8px;align-items:center;width:100%;text-align:left;border:0;background:none;padding:7px 14px 7px 16px;color:var(--muted);font-size:13px;border-left:2px solid transparent}
#flov .fnav button:hover{color:var(--ink)}
#flov .fnav button.on{color:var(--ink);border-left-color:var(--acc);background:rgba(var(--acc-rgb),.08)}
#flov .fnav .n{font-family:var(--f-m);font-size:10px;color:var(--acc)}
#flov .fnav .t{white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
#flov .fnav .p{font-family:var(--f-m);font-size:10px;text-align:right;color:var(--faint);font-variant-numeric:tabular-nums}
#flov .fnav button.off .t{text-decoration:line-through;opacity:.55}
#flov .fnav .bar{grid-column:2/4;height:2px;background:rgba(255,255,255,.06);border-radius:1px;overflow:hidden;margin-top:-2px}
#flov .fnav .bar u{display:block;height:100%;background:var(--acc)}
#flov .fmain{display:flex;flex-direction:column;min-height:0;min-width:0}
#flov .fbody{flex:1;min-height:0;overflow:auto;padding:22px 26px 40px}
#flov .fbody h2{font-family:var(--f-d);font-weight:400;font-size:16px;letter-spacing:.12em;text-transform:uppercase;margin:0 0 6px;text-wrap:balance}
#flov .fbody h3{font-family:var(--f-m);font-weight:500;font-size:11px;letter-spacing:.14em;text-transform:uppercase;color:var(--acc);margin:26px 0 10px}
#flov .lead{color:var(--muted);max-width:72ch;margin:0 0 16px}
.mhead{display:flex;flex-wrap:wrap;gap:12px 18px;align-items:flex-start;justify-content:space-between;margin-bottom:14px}
.mhead .num{font-family:var(--f-m);font-size:11px;color:var(--acc);letter-spacing:.12em}
.seg{display:inline-flex;border:1px solid var(--line2);border-radius:8px;overflow:hidden}
.seg button{border:0;background:none;color:var(--muted);padding:6px 12px;font-size:12.5px}
.seg button + button{border-left:1px solid var(--line2)}
.seg button[aria-pressed="true"]{background:rgba(var(--acc-rgb),.14);color:var(--acc)}
.seg button.no[aria-pressed="true"]{background:rgba(255,92,122,.12);color:var(--warn)}
.mtabs{display:flex;gap:4px;border-bottom:1px solid var(--line);margin:4px 0 18px;overflow-x:auto}
.mtabs button{border:0;background:none;color:var(--muted);padding:10px 14px;font-size:13px;border-bottom:2px solid transparent;white-space:nowrap}
.mtabs button[aria-selected="true"]{color:var(--ink);border-bottom-color:var(--acc)}
.fase{margin:0 0 20px}
.fase > .fh{display:flex;align-items:center;gap:10px;margin:0 0 8px}
.fase > .fh b{font-family:var(--f-m);font-weight:500;font-size:11px;letter-spacing:.1em;text-transform:uppercase;color:var(--ink)}
.fase > .fh span{font-family:var(--f-m);font-size:10.5px;color:var(--faint)}
.fstep{border:1px solid var(--line);border-radius:9px;background:rgba(255,255,255,.015);margin-bottom:6px}
.fstep.ok{border-color:rgba(var(--done-rgb),.35)}
.fstep.wip{border-color:rgba(var(--acc-rgb),.35)}
.fstep.na,.fstep.auto{opacity:.5}
.fstep.flash{box-shadow:0 0 0 2px var(--acc)}
.srow{display:grid;grid-template-columns:auto minmax(0,1fr) auto;gap:10px;align-items:center;padding:7px 10px}
.sst{display:flex;gap:3px}
.sst button{width:28px;height:28px;border-radius:6px;border:1px solid var(--line2);background:none;color:var(--faint);display:grid;place-items:center;padding:0}
.sst button:hover{color:var(--ink);border-color:var(--acc)}
.sst button.a-ok[aria-pressed="true"]{background:var(--done);border-color:var(--done);color:var(--done-ink)}
.sst button.a-wip[aria-pressed="true"]{background:rgba(var(--acc-rgb),.2);border-color:var(--acc);color:var(--acc)}
.sst button.a-na[aria-pressed="true"]{background:rgba(255,92,122,.14);border-color:var(--warn);color:var(--warn)}
.stt{border:0;background:none;text-align:left;color:var(--ink);padding:3px 0;min-width:0;display:flex;flex-direction:column;gap:3px}
.stt .ti{font-size:13.5px;line-height:1.35}
.stt .ti code{font-family:var(--f-m);font-size:10.5px;color:var(--faint);margin-right:6px}
.tg{display:flex;flex-wrap:wrap;gap:4px}
.tg i{font-style:normal;font-family:var(--f-m);font-size:9.5px;letter-spacing:.06em;padding:1px 6px;border-radius:3px;border:1px solid currentColor;opacity:.85}
.tg .c{color:var(--muted);border-style:dashed}
.sx{display:flex;gap:6px;align-items:center;font-family:var(--f-m);font-size:10.5px;color:var(--faint)}
.sdet{border-top:1px solid var(--line);padding:12px 14px 14px 14px;display:grid;gap:12px}
.sdet .txt{white-space:pre-wrap;font-size:13.5px;line-height:1.55;max-width:80ch;color:#CFDBEA}
.sdet .box{border-left:2px solid var(--acc);padding:6px 12px;background:rgba(var(--acc-rgb),.05);font-size:13px;white-space:pre-wrap;max-width:80ch}
.sdet .box.sale{border-left-color:var(--done);background:rgba(var(--done-rgb),.05)}
.sdet .box b{display:block;font-family:var(--f-m);font-weight:500;font-size:9.5px;letter-spacing:.14em;text-transform:uppercase;color:var(--faint);margin-bottom:3px}
.links{display:flex;flex-wrap:wrap;gap:6px}
.links a{font-size:12px;color:var(--ink);text-decoration:none;border:1px solid var(--line2);border-radius:999px;padding:3px 11px;display:inline-flex;gap:6px;align-items:center;max-width:100%;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.links a:hover{border-color:var(--acc);color:var(--acc)}
.links a.q{border-style:dashed;color:var(--muted)}
.links a.off{color:var(--muted)}
.links .lrm{border:0;background:none;color:var(--faint);padding:0 0 0 2px}
.addl{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1.4fr) auto;gap:6px}
.pgrid{display:flex;flex-wrap:wrap;gap:8px}
.pgrid figure{margin:0;position:relative;width:110px;height:82px;border-radius:6px;overflow:hidden;border:1px solid var(--line2);background:var(--panel2)}
.pgrid figure img{width:100%;height:100%;object-fit:cover;display:block}
.pgrid figure button{position:absolute;top:3px;right:3px;background:rgba(0,0,0,.6);border:0;color:#fff;border-radius:4px;font-size:12px;padding:0 5px}
.pgrid .addp{width:110px;height:82px;border:1px dashed var(--line2);border-radius:6px;background:none;color:var(--muted);font-size:12px;display:grid;place-items:center;text-align:center;padding:6px}
.pgrid .addp:hover{border-color:var(--acc);color:var(--acc)}
.idx{display:grid;gap:18px;max-width:86ch}
.idx .u > b{font-family:var(--f-d);font-weight:400;font-size:13px;letter-spacing:.08em;text-transform:uppercase;display:block;margin-bottom:8px;text-wrap:balance}
.idx ul{margin:0;padding-left:18px;display:grid;gap:7px}
.idx li{font-size:13.5px;line-height:1.5;color:#CFDBEA}
.idx li .kk{display:block;font-size:12.5px;color:var(--muted);margin-top:2px}
.idx li .kk b{font-family:var(--f-m);font-weight:500;font-size:9.5px;letter-spacing:.12em;text-transform:uppercase;margin-right:6px}
.idx li .kk.ec b{color:var(--acc)} .idx li .kk.mu b{color:var(--l-dis)} .idx li .kk.ra b{color:var(--l-mant)}
.idx li ul{margin-top:5px}
.dock{border-top:1px solid var(--line2);background:rgba(4,7,12,.96);padding:8px 16px calc(8px + env(safe-area-inset-bottom,0px));display:grid;grid-template-columns:repeat(6,minmax(0,1fr));gap:6px 14px;position:relative}
.dl{border:0;background:none;padding:4px 2px;text-align:left;color:var(--muted);display:grid;gap:4px;min-width:0}
.dl .h{display:flex;justify-content:space-between;gap:6px;font-size:11px;white-space:nowrap}
.dl .h b{font-family:var(--f-m);font-weight:500;color:var(--ink);font-variant-numeric:tabular-nums}
.dl .h em{font-style:normal;color:var(--warn);font-family:var(--f-m);font-size:9.5px;letter-spacing:.08em}
.dl .tr{height:6px;border-radius:3px;background:rgba(255,255,255,.07);overflow:hidden;position:relative}
.dl .tr u{display:block;height:100%;border-radius:3px;transition:width .4s}
.dl:hover .h span,.dl[aria-expanded="true"] .h span{color:var(--ink)}
.pop{position:absolute;bottom:calc(100% + 6px);width:min(420px,calc(100vw - 32px));background:var(--panel2);border:1px solid var(--line2);border-radius:10px;padding:14px;box-shadow:0 18px 50px -12px rgba(0,0,0,.8);z-index:5;font-size:12.5px;max-height:60vh;overflow:auto}
.pop h4{margin:0 0 2px;font-family:var(--f-d);font-weight:400;font-size:12px;letter-spacing:.1em;text-transform:uppercase}
.pop .psub{color:var(--muted);margin:0 0 10px}
.pop .lab{font-family:var(--f-m);font-size:9.5px;letter-spacing:.14em;text-transform:uppercase;margin:10px 0 5px;display:block}
.pop .lab.w{color:var(--warn)} .pop .lab.n{color:var(--done)}
.pop button.go{display:grid;grid-template-columns:70px minmax(0,1fr);gap:8px;width:100%;text-align:left;border:0;background:none;color:var(--ink);padding:5px 4px;border-radius:5px;font-size:12.5px}
.pop button.go:hover{background:rgba(var(--acc-rgb),.08)}
.pop button.go code{font-family:var(--f-m);font-size:10px;color:var(--faint)}
.lines-big{display:grid;gap:12px;max-width:820px}
.lb2{display:grid;grid-template-columns:150px minmax(0,1fr) 54px;gap:12px;align-items:center}
.lb2 .nm{font-size:13px}
.lb2 .nm small{display:block;color:var(--muted);font-size:11px}
.lb2 .tr{height:10px;border-radius:5px;background:rgba(255,255,255,.07);overflow:hidden}
.lb2 .tr u{display:block;height:100%}
.lb2 .v{font-family:var(--f-m);font-size:14px;text-align:right;font-variant-numeric:tabular-nums}
.mtable{width:100%;border-collapse:collapse;font-size:13px;min-width:560px}
.mtable th{font-family:var(--f-m);font-size:9.5px;letter-spacing:.12em;text-transform:uppercase;color:var(--faint);text-align:left;padding:8px;border-bottom:1px solid var(--line2);font-weight:500}
.mtable td{padding:8px;border-bottom:1px solid var(--line)}
.mtable td.num{font-family:var(--f-m);text-align:right;font-variant-numeric:tabular-nums}
.mtable button{border:0;background:none;color:var(--ink);padding:0;text-align:left}
.mtable button:hover{color:var(--acc)}
.nextcard{border:1px solid rgba(var(--acc-rgb),.4);border-radius:10px;padding:14px 16px;background:rgba(var(--acc-rgb),.05);display:flex;gap:14px;align-items:center;flex-wrap:wrap;max-width:820px}
.nextcard .t{flex:1;min-width:0}
.nextcard .t small{font-family:var(--f-m);font-size:10px;color:var(--acc);letter-spacing:.12em;text-transform:uppercase}
.flagg{display:grid;grid-template-columns:repeat(auto-fill,minmax(250px,1fr));gap:8px}
.flagg .ck small{display:block;color:var(--muted);font-size:11.5px}
.ubox{font-family:var(--f-m);font-size:12px;color:var(--muted);border:1px solid var(--line);border-radius:8px;padding:10px 12px;display:flex;flex-wrap:wrap;gap:6px 18px}
.ubox b{color:var(--ink);font-weight:500}
.matrix{border-collapse:collapse;font-size:11.5px}
.matrix th{font-weight:400;color:var(--muted);text-align:right;padding:2px 8px 2px 0;white-space:nowrap;max-width:190px;overflow:hidden;text-overflow:ellipsis}
.matrix td{width:26px;height:26px;padding:0}
.matrix td button{width:24px;height:24px;border:1px solid var(--line);border-radius:4px;background:none;font-family:var(--f-m);font-size:10px;color:var(--ink);padding:0}
.matrix td button.r1{background:rgba(var(--acc-rgb),.18)}
.matrix td button.r2{background:rgba(var(--acc-rgb),.45)}
.matrix td button.r3{background:var(--acc);color:var(--acc-ink)}
.matrix .top{text-align:center;padding:0 0 4px;font-family:var(--f-m);font-size:10px;color:var(--acc)}
.bubble{width:100%;max-width:760px;aspect-ratio:16/10;border:1px solid var(--line);border-radius:10px;background:radial-gradient(circle at 50% 50%,rgba(var(--acc-rgb),.05),transparent 70%)}
.bubble text{font-family:var(--f-b);font-size:11px;fill:var(--ink)}
.refs{display:grid;grid-template-columns:repeat(auto-fill,minmax(240px,1fr));gap:10px}
.ref{border:1px solid var(--line2);border-radius:10px;padding:12px;display:grid;gap:6px;min-width:0}
.ref a{color:var(--acc);font-size:12px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;display:block}
.ref img{width:100%;aspect-ratio:4/3;object-fit:cover;border-radius:6px}
.tree{font-size:13px;display:grid;gap:2px}
.tree details{margin-left:14px;border-left:1px solid var(--line);padding-left:10px}
.tree > details{margin-left:0}
.tree summary{cursor:pointer;padding:3px 0;list-style:none;display:flex;gap:8px;align-items:baseline;flex-wrap:wrap}
.tree summary::-webkit-details-marker{display:none}
.tree summary::before{content:"▸";color:var(--faint);font-size:10px;width:10px}
.tree details[open] > summary::before{content:"▾"}
.tree .leaf{margin-left:14px;border-left:1px solid var(--line);padding:3px 0 3px 30px}
.tree code{font-family:var(--f-m);font-size:11.5px;color:var(--acc)}
.tree .fn{font-family:var(--f-m);font-size:11px;color:var(--ink)}
.tree .dd{flex-basis:100%;color:var(--muted);font-size:12px;padding-left:18px}
.codg{display:grid;gap:22px}
.codg table{width:100%;border-collapse:collapse;font-size:12.5px;min-width:520px}
.codg td{padding:6px 8px;border-bottom:1px solid var(--line);vertical-align:top}
.codg td:first-child{font-family:var(--f-m);color:var(--acc);white-space:nowrap;width:1%}
.codg td:last-child{color:var(--muted)}
.aibox{border:1px solid var(--line2);border-radius:10px;padding:14px;display:grid;gap:10px;max-width:900px}
@media (max-width:900px){
  #flov .fws{grid-template-columns:1fr;grid-template-rows:auto minmax(0,1fr)}
  #flov .fnav{display:flex;overflow-x:auto;padding:0;border-right:0;border-bottom:1px solid var(--line)}
  #flov .fnav .grp,#flov .fnav .bar,#flov .fnav .p{display:none}
  #flov .fnav button{display:flex;white-space:nowrap;border-left:0;border-bottom:2px solid transparent;width:auto;padding:10px 12px}
  #flov .fnav button.on{border-bottom-color:var(--acc)}
  #flov .fbody{padding:18px 16px 30px}
  .dock{grid-template-columns:repeat(3,minmax(0,1fr));padding:6px 12px calc(6px + env(safe-area-inset-bottom,0px))}
  .lb2{grid-template-columns:110px minmax(0,1fr) 46px}
  .addl{grid-template-columns:1fr}
  .srow{grid-template-columns:minmax(0,1fr);}
  .sst{order:2}
}
@media (prefers-reduced-motion: reduce){ .dl .tr u{transition:none} }
`;
const st = document.createElement("style"); st.textContent = CSS; document.head.appendChild(st);
const host = document.createElement("div"); host.id = "flov"; document.body.appendChild(host);

/* ---------- home ---------- */
function linesMini(P){ const L = allLines(P); return `<div class="minil">${LINES.map(l => `<span>${l.n}</span><i><u style="width:${pc(L[l.k].pct)};background:${l.c}"></u></i><span class="v">${pc(L[l.k].pct)}</span>`).join("")}</div>`; }
function renderHome(){
  const el = $("#flujo"); if (!el) return;
  const act = F.list.filter(p => p.estado !== "archivado").sort((a,b) => (b.actualizado||0) - (a.actualizado||0));
  const arch = F.list.filter(p => p.estado === "archivado");
  const cards = act.map(P => { const o = BYID[P.tipo];
    return `<button class="fcard" data-fopen="${esc(P.id)}"><div><div class="eyeb">${o ? esc(o.code) + " · " + esc(o.n) : "Sin tipología"}</div><h3>${esc(P.nombre || "Proyecto sin nombre")}</h3></div>
      <div class="fmeta"><span>${esc([P.loc.canton, P.loc.provincia].filter(Boolean).join(", ") || "Ubicación pendiente")}</span>${P.cliente ? `<span>${esc(P.cliente)}</span>` : ""}<span>Editado ${new Date(P.actualizado||P.creado).toLocaleDateString("es-EC",{day:"numeric",month:"short"})}</span></div>
      ${linesMini(P)}</button>`; }).join("");
  el.innerHTML = `<div class="fwrap">
    <section class="fl-hero"><div><div class="eyeb">// Matriz de sistematización de proceso</div><h1>Flujo de <em>proyecto</em></h1>
      <p>Cada proyecto recorre las materias en orden. En cada una decides qué aplica, marcas los pasos y guardas notas, enlaces y fotos. Abajo verás seis líneas de avance: proceso general, diseño, BIM, sostenibilidad, mantenimiento y documentación.</p></div>
      <button class="btn pri" data-fnew>${A.ICON.plus} Nuevo proyecto</button></section>
    <ol class="fl-seq">${M.map(m => `<li><b>${pad(m.orden)}</b>${esc(m.n)}</li>`).join("")}</ol>
    ${act.length ? `<div class="fl-grid">${cards}</div>` : `<div class="empty">Aún no hay proyectos en el flujo. Crea el primero con <b>Nuevo proyecto</b>: le pones nombre, tipología y ubicación, y el flujo te propone qué pasos aplican.</div>`}
    ${arch.length ? `<p style="margin-top:18px"><button class="btn sm ghost" data-farch>${F.showArch ? "Ocultar" : "Ver"} archivados (${arch.length})</button></p>${F.showArch ? `<div class="fl-grid">${arch.map(P => `<button class="fcard" data-fopen="${esc(P.id)}" style="opacity:.7"><h3>${esc(P.nombre||"Proyecto")}</h3><div class="fmeta"><span>Archivado</span></div></button>`).join("")}</div>` : ""}` : ""}
    <div class="fl-lib"><button data-flib="cod"><b>Codificación BIM</b><small>${COD.grupos.reduce((a,g)=>a+g.filas.length,0)} códigos en ${COD.grupos.length} grupos: disciplinas, tipos, niveles, materiales, familias, vistas…</small></button>
      <button data-flib="carp"><b>Estructura de carpetas</b><small>Carpeta madre y árbol completo del proyecto, descargable en .zip</small></button></div>
  </div>`;
}

/* ---------- nuevo proyecto ---------- */
function newModal(){
  const ses = (A.S.sesiones || []).filter(s => !s.archivado);
  const m = document.createElement("div"); m.className = "modal"; m.innerHTML = `<form class="mbox hud" id="fl-newf" style="max-width:560px;width:100%">
    <h3 style="font-family:var(--f-d);font-weight:400;letter-spacing:.1em;text-transform:uppercase;margin:0 0 4px">Nuevo proyecto</h3>
    <p class="ro" style="margin:0 0 14px">Con la tipología y la ubicación el flujo decide qué pasos aplican y dónde buscar la información.</p>
    <div class="grid2">
      <label class="fl w2">Nombre del proyecto<input id="fn-nombre" required placeholder="Ej. Centro pediátrico La Puntilla"></label>
      <label class="fl w2">Tipología<select id="fn-tipo"><option value="">Elegir…</option>${TAX.map(c => `<optgroup label="${esc(c.n)}">${c.list.map(x => `<option value="${x.id}">${esc(x.n)}</option>`).join("")}</optgroup>`).join("")}</select></label>
      <label class="fl">Cantón<input id="fn-canton" placeholder="Guayaquil"></label>
      <label class="fl">Provincia<input id="fn-prov" placeholder="Guayas"></label>
      <label class="fl w2">Coordenadas o enlace de Google Maps<input id="fn-coord" placeholder="2°09'39.4&quot;S 79°53'56.1&quot;W  ó  -2.1609, -79.8989"></label>
      <label class="fl">Código corto<input id="fn-cod" maxlength="6" placeholder="TRBU"></label>
      <label class="fl">Iniciales<input id="fn-ini" maxlength="4" placeholder="JC"></label>
      ${ses.length ? `<label class="fl w2">Traer programa y peticiones de una sesión con cliente<select id="fn-ses"><option value="">No, empezar vacío</option>${ses.map(s => `<option value="${esc(s.id)}">${esc((s.cliente && s.cliente.nombre) || "Cliente")} · ${esc((BYID[s.tipo]||{}).n || "")}</option>`).join("")}</select></label>` : ""}
    </div>
    <div class="acts" style="margin-top:16px;justify-content:flex-end"><button type="button" class="btn ghost" data-mclose>Cancelar</button><button class="btn pri">Crear y abrir</button></div></form>`;
  document.body.appendChild(m);
  m.addEventListener("click", e => { if (e.target === m || e.target.closest("[data-mclose]")) m.remove(); });
  $("#fn-nombre").focus();
  $("#fl-newf").addEventListener("submit", async e => {
    e.preventDefault();
    const P = blank(); P.id = uid("f");
    P.nombre = $("#fn-nombre").value.trim(); P.tipo = $("#fn-tipo").value; P.flags = suggestFlags(P.tipo);
    P.loc.canton = $("#fn-canton").value.trim(); P.loc.provincia = $("#fn-prov").value.trim(); P.loc.ciudad = P.loc.canton;
    const c = parseCoords($("#fn-coord").value); if (c){ P.loc.lat = c.lat.toFixed(6); P.loc.lon = c.lon.toFixed(6); }
    P.codigo = $("#fn-cod").value.trim().toUpperCase(); P.ini = $("#fn-ini").value.trim().toUpperCase();
    const sid = $("#fn-ses") && $("#fn-ses").value; if (sid) importSession(P, sid);
    F.list.push(P); m.remove(); await writeP(P); openWS(P.id, "datos"); renderHome();
  });
}
function importSession(P, sid){
  const s = (A.S.sesiones || []).find(x => x.id === sid); if (!s) return;
  P.sesion = sid; if (!P.tipo && s.tipo){ P.tipo = s.tipo; P.flags = suggestFlags(s.tipo); }
  if (s.cliente && s.cliente.nombre) P.cliente = s.cliente.nombre;
  const t = s.terreno || {}; ["pais","provincia","canton","ciudad","direccion","catastro"].forEach(k => { if (t[k] && !P.loc[k]) P.loc[k] = t[k]; });
  if (t.mapa){ const c = parseCoords(t.mapa); if (c){ P.loc.lat = c.lat.toFixed(6); P.loc.lon = c.lon.toFixed(6); } }
  if (t.area) P.datos.terreno = t.area;
  const rows = ((s.programa||{}).filas || []).map(r => ({zona:r.zona||"", espacio:r.espacio||"", cant:r.cant??1, m2:r.m2??""}));
  if (rows.length) P.bor.programa.filas = P.bor.programa.filas.concat(rows);
  if ((s.programa||{}).circ) P.bor.programa.circ = s.programa.circ;
  (s.peticiones||[]).forEach(r => r.t && P.bor.peticiones.push({t:r.t, p:r.p||"2"}));
}

/* ---------- workspace ---------- */
function openWS(id, page){ F.cur = id; F.lib = false; F.page = page || "linea"; F.tcam = null; renderWS(); }
function openLib(page){ F.cur = null; F.lib = true; F.page = page; renderWS(); }
function closeWS(){ flush(); host.innerHTML = ""; F.cur = null; F.lib = false; renderHome(); }

function navHTML(P){
  const btn = (k, n, t, extra) => `<button data-fpage="${k}" class="${F.page===k?"on":""} ${extra||""}"><span class="n">${n}</span><span class="t">${esc(t)}</span></button>`;
  if (!P) return `<div class="grp">Biblioteca</div>${btn("cod","◆","Codificación BIM")}${btn("carp","▤","Estructura de carpetas")}`;
  let h = `<div class="grp">Proyecto</div>${btn("linea","━","Línea de flujo")}${btn("panel","◎","Panel de avance")}${btn("datos","⌂","Datos y ubicación")}${btn("bor","✎","Borrador")}${btn("ej","❖","Ejemplos y referencias")}<div class="grp">Materias en orden</div>`;
  M.forEach(m => { const s = lineStats(P, "all", m._steps), off = (P.mat||{})[m.id] === "no";
    h += `<button data-fpage="m:${m.id}" class="${F.page==="m:"+m.id?"on":""} ${off?"off":""}"><span class="n">${pad(m.orden)}</span><span class="t">${esc(m.n)}</span><span class="p">${off ? "—" : pc(s.pct)}</span><span class="bar"><u style="width:${off?0:pc(s.pct)}"></u></span></button>`; });
  h += `<div class="grp">Organización BIM</div>${btn("carp","▤","Estructura de carpetas")}${btn("cod","◆","Codificación")}`;
  return h;
}
function dockHTML(P){
  const L = allLines(P);
  return LINES.map(l => { const s = L[l.k];
    return `<button class="dl" data-dline="${l.k}" aria-expanded="false"><span class="h"><span>${l.n}</span>${s.behind ? `<em>REZAGADA</em>` : ""}<b>${pc(s.pct)}</b></span><span class="tr"><u style="width:${pc(s.pct)};background:${l.c}"></u></span></button>`; }).join("");
}
function popHTML(P, k){
  const l = LINES.find(x => x.k === k), s = lineStats(P, k), g = lineStats(P, "all");
  const go = x => `<button class="go" data-fgo="${x.p.id}"><code>${esc(x.m.corto)} · ${esc(x.p.id.split("-")[1])}</code><span>${esc(x.p.t)}</span></button>`;
  const sk = s.skipped.slice(0, 10);
  return `<h4 style="color:${l.c}">${l.n} · ${pc(s.pct)}</h4><p class="psub">${Math.round(s.done*10)/10} de ${s.n} pasos que aplican a este proyecto.${s.behind ? ` Va ${Math.round((g.pct-s.pct)*100)} puntos por detrás del proceso general.` : ""}</p>
    ${sk.length ? `<span class="lab w">Te estás saltando (${s.skipped.length})</span>${sk.map(go).join("")}${s.skipped.length > 10 ? `<p class="psub" style="margin:4px 0 0">y ${s.skipped.length-10} más.</p>` : ""}` : `<span class="lab n">Sin pasos saltados</span>`}
    ${s.next.length ? `<span class="lab" style="color:var(--acc)">Para continuar${k==="bim" ? " con la metodología" : ""}</span>${s.next.map(go).join("")}` : `<p class="psub">No quedan pasos pendientes en esta línea.</p>`}`;
}

function renderWS(){
  const P = P0(); if (!P && !F.lib){ host.innerHTML = ""; return; }
  const prevBody = host.querySelector(".fbody"), keep = prevBody && renderWS.last === F.page ? prevBody.scrollTop : 0; renderWS.last = F.page;
  const o = P && BYID[P.tipo];
  host.innerHTML = `<div class="ov" role="dialog" aria-label="Flujo de proyecto">
    <div class="ovh"><button class="iconbtn" data-fclose aria-label="Cerrar">←</button>
      <div class="ttl"><small>${P ? "Flujo de proyecto" + (o ? " · " + esc(o.n) : "") : "Biblioteca BIM"}</small><b>${P ? esc(P.nombre || "Proyecto sin nombre") : "Organización del proyecto"}</b></div>
      ${P ? `<span class="saved ok" id="fl-saved"><i></i> ${db ? "Guardado" : "Solo en esta vista"}</span>${downloads ? `<button class="btn sm" data-fexport>Exportar informe (.md)</button>` : ""}` : ""}</div>
    <div class="ovb" style="overflow:hidden"><div class="fws"><nav class="fnav">${navHTML(P)}</nav>
      <div class="fmain"><div class="fbody ${F.page === "linea" ? "tlmode" : ""}">${pageHTML(P)}</div></div></div></div>${P ? floatHTML(P) : ""}</div>`;
  const b = host.querySelector(".fbody"); if (b) b.scrollTop = keep;
  if (F.page === "bor") drawBubbles(P);
  if (P){ placeFloat(); requestAnimationFrame(() => { if (F.page === "linea") initTimeline(P); else drawMini(P); placeFloat(); }); }
}
function softRefresh(){ const P = P0(); if (!P) return;
  const nav = host.querySelector(".fnav"); if (nav) nav.innerHTML = navHTML(P);
  const fr = host.querySelector(".frows"); if (fr) fr.innerHTML = floatRowsHTML(P);
  const fx = host.querySelector("#fl-float .fx"); if (fx){ fx.querySelectorAll(":scope > div:not(.ml)").forEach(n => n.remove()); fx.insertAdjacentHTML("beforeend", floatDetailHTML(P)); }
  if (F.page === "linea") drawTimeline(P); else drawMini(P);
  const mn = $("#fl-mnum"); if (mn && F.page.startsWith("m:")){ const m = MBY[F.page.slice(2)], s = lineStats(P, "all", m._steps); mn.textContent = `MATERIA ${pad(m.orden)} · ${Math.round(s.done*10)/10} DE ${s.n} PASOS · ${pc(s.pct)}`; }
}

/* ---------- páginas ---------- */
function pageHTML(P){
  if (F.page === "cod") return pageCod();
  if (F.page === "carp") return pageCarp(P);
  if (!P) return "";
  if (F.page === "linea") return pageLinea(P);
  if (F.page === "panel") return pagePanel(P);
  if (F.page === "datos") return pageDatos(P);
  if (F.page === "bor") return pageBor(P);
  if (F.page === "ej") return pageEj(P);
  if (F.page.startsWith("m:")) return pageMateria(P, MBY[F.page.slice(2)]);
  return "";
}
function pagePanel(P){
  const L = allLines(P), g = L.all;
  const nxt = STEPS.find(s => applies(P, s) && stOf(P, s.p.id) !== "ok");
  return `<h2>Panel de avance</h2><p class="lead">El porcentaje cuenta solo los pasos que aplican a este proyecto. Un paso en curso vale medio. Toca una línea abajo para ver qué te estás saltando y qué sigue.</p>
    ${nxt ? `<div class="nextcard"><div class="t"><small>Siguiente paso recomendado · ${esc(nxt.m.n)}</small><div style="margin-top:3px">${esc(nxt.p.t)}</div></div><button class="btn pri sm" data-fgo="${nxt.p.id}">Ir al paso ${A.ICON.arrow}</button></div>` : `<div class="nextcard"><div class="t">Todos los pasos que aplican están hechos.</div></div>`}
    <h3>Líneas de avance</h3><div class="lines-big">${LINES.map(l => { const s = L[l.k]; return `<div class="lb2"><div class="nm">${l.n}<small>${Math.round(s.done*10)/10} / ${s.n} pasos${s.skipped.length ? ` · ${s.skipped.length} saltados` : ""}</small></div><div class="tr"><u style="width:${pc(s.pct)};background:${l.c}"></u></div><div class="v">${pc(s.pct)}</div></div>`; }).join("")}</div>
    <h3>Por materia</h3><div class="tbl-wrap"><table class="mtable"><thead><tr><th>#</th><th>Materia</th><th>¿Aplica?</th><th class="num">Pasos</th><th class="num">Hechos</th><th class="num">Avance</th></tr></thead><tbody>
    ${M.map(m => { const s = lineStats(P, "all", m._steps), off = (P.mat||{})[m.id] === "no"; return `<tr><td class="num">${pad(m.orden)}</td><td><button data-fpage="m:${m.id}">${esc(m.n)}</button></td><td>${off ? "No aplica" : "Sí"}</td><td class="num">${off ? "—" : s.n}</td><td class="num">${off ? "—" : Math.round(s.done*10)/10}</td><td class="num">${off ? "—" : pc(s.pct)}</td></tr>`; }).join("")}</tbody></table></div>`;
}
function fi(path, label, val, attrs, cls){ return `<label class="fl ${cls||""}">${label}<input data-fp="${path}" value="${esc(val ?? "")}" ${attrs||""}></label>`; }
function pageDatos(P){
  const L = P.loc, u = hasLL(P) ? toUTM(+L.lat, +L.lon) : null;
  const sug = suggestFlags(P.tipo);
  const quick = ["maps","earth","suncalc","solaratlas","meteoblue","windfinder","gye:catastro","gye:usosuelo","gye:mimg","ec:igm","ec:sngr","ec:inamhi"].map(k => fuente(k, P)).filter(Boolean);
  return `<h2>Datos y ubicación</h2><p class="lead">País, provincia, cantón y coordenadas definen la normativa, los trámites y los enlaces de análisis de sitio que verás en cada paso.</p>
    <div class="grid2">
      ${fi("nombre","Nombre del proyecto",P.nombre,"","w2")}
      <label class="fl w2">Tipología<select data-fp="tipo"><option value="">Elegir…</option>${TAX.map(c => `<optgroup label="${esc(c.n)}">${c.list.map(x => `<option value="${x.id}" ${x.id===P.tipo?"selected":""}>${esc(x.n)}</option>`).join("")}</optgroup>`).join("")}</select></label>
      ${fi("cliente","Cliente / promotor",P.cliente)}${fi("codigo","Código corto (carpetas)",P.codigo,'maxlength="6" style="text-transform:uppercase"')}${fi("ini","Iniciales",P.ini,'maxlength="4" style="text-transform:uppercase"')}
      ${fi("loc.pais","País",L.pais)}${fi("loc.provincia","Provincia",L.provincia)}${fi("loc.canton","Cantón",L.canton)}${fi("loc.ciudad","Ciudad",L.ciudad)}${fi("loc.parroquia","Parroquia",L.parroquia)}
      ${fi("loc.direccion","Dirección o referencia",L.direccion,"","w2")}${fi("loc.catastro","Clave catastral",L.catastro)}
      <label class="fl w2">Pegar coordenadas o enlace de mapa<input id="fl-coordin" placeholder="2°09'39.4&quot;S 79°53'56.1&quot;W · -2.1609, -79.8989 · enlace de Google Maps"></label>
      ${fi("loc.lat","Latitud",L.lat,'inputmode="decimal"')}${fi("loc.lon","Longitud",L.lon,'inputmode="decimal"')}
      ${fi("datos.terreno","Área del terreno (m²)",P.datos.terreno,'inputmode="decimal"')}${fi("datos.construccion","Área de construcción (m²)",P.datos.construccion,'inputmode="decimal"')}${fi("datos.pisos","N.º de pisos",P.datos.pisos,'inputmode="numeric"')}
    </div>
    ${u ? `<div class="ubox" style="margin-top:14px"><span>UTM WGS84 zona <b>${u.zone}${u.hemi}</b></span><span>Este <b>${u.x.toFixed(1)}</b> m</span><span>Norte <b>${u.y.toFixed(1)}</b> m</span><span>Lat/Lon <b>${(+L.lat).toFixed(6)}, ${(+L.lon).toFixed(6)}</b></span></div>` : ""}
    <h3>Enlaces del sitio</h3><div class="links">${quick.map(x => `<a href="${esc(x.u)}" target="_blank" rel="noopener" class="${x.off?"off":""}">${esc(x.n)}${x.off ? " · sin coordenadas" : ""}</a>`).join("")}</div>
    <h3>Condiciones del proyecto</h3><p class="lead">Activan o desactivan pasos específicos (SERCOP, ACESS, ARCSA, propiedad horizontal…). Las marcadas con ● las sugiere la tipología.</p>
    <div class="flagg">${FLAGS.map(([k,n,d]) => `<label class="ck ${(P.flags||{})[k]?"on":""}"><input type="checkbox" data-fflag="${k}" ${(P.flags||{})[k]?"checked":""}><span>${sug[k] ? "● " : ""}${esc(n)}<small>${esc(d)}</small></span></label>`).join("")}</div>
    ${(A.S.sesiones||[]).length ? `<h3>Sesión con cliente</h3><div class="acts"><select id="fl-sesimp" style="max-width:360px"><option value="">Elegir sesión…</option>${A.S.sesiones.filter(s=>!s.archivado).map(s => `<option value="${esc(s.id)}" ${s.id===P.sesion?"selected":""}>${esc((s.cliente&&s.cliente.nombre)||"Cliente")} · ${esc((BYID[s.tipo]||{}).n||"")}</option>`).join("")}</select><button class="btn sm" data-fsesimp>Traer programa y peticiones</button></div>` : ""}
    <h3>Proyecto</h3><div class="acts"><button class="btn sm" data-farchive>${P.estado === "archivado" ? "Reactivar proyecto" : "Archivar proyecto"}</button><button class="btn sm danger" data-fdel>Eliminar proyecto</button></div>`;
}

/* materia */
function fmtD(t){ return esc(t || ""); }
function tagHTML(p){ return `<span class="tg">${(p.tags||[]).map(t => `<i style="color:${LINES.find(l=>l.k===t).c}">${TAGN[t]}</i>`).join("")}${(p.cuando||[]).map(c => `<i class="c">${esc(CUANDO_N[c]||c)}</i>`).join("")}</span>`; }
function stepHTML(P, s){
  const p = s.p, stv = stOf(P, p.id), auto = autoOff(P, s), open = F.open.has(p.id);
  const cls = stv === "ok" ? "ok" : stv === "wip" ? "wip" : stv === "na" ? "na" : auto ? "auto" : "";
  const num = p.id.split("-")[1];
  let det = "";
  if (open){
    const fu = (p.fuentes||[]).map(k => fuente(k, P)).filter(Boolean);
    const lk = (P.lk||{})[p.id] || [], im = (P.im||{})[p.id] || [];
    det = `<div class="sdet">
      <div class="txt">${fmtD(p.d)}</div>
      ${p.ec ? `<div class="box"><b>En Ecuador</b>${fmtD(p.ec)}</div>` : ""}
      ${p.sale ? `<div class="box sale"><b>Entregable</b>${fmtD(p.sale)}</div>` : ""}
      ${fu.length ? `<div><span class="lbl">Dónde obtener la información</span><div class="links" style="margin-top:6px">${fu.map(x => `<a href="${esc(x.u)}" target="_blank" rel="noopener" class="${x.q?"q":""} ${x.off?"off":""}" title="${x.off?"Agrega coordenadas en Datos y ubicación para abrir el punto exacto":""}">${x.q ? "Buscar: " : ""}${esc(x.n)}</a>`).join("")}</div></div>` : ""}
      <label class="fl">Notas de este proyecto<textarea data-fnote="${p.id}" rows="3" placeholder="Qué encontraste, decisiones, datos, pendientes…">${esc((P.nt||{})[p.id] || "")}</textarea></label>
      <div><span class="lbl">Enlaces</span><div class="links" style="margin:6px 0">${lk.map((x,i) => `<a href="${esc(x.u)}" target="_blank" rel="noopener">${esc(x.t || x.u)}</a><button class="lrm" data-flkrm="${p.id}:${i}" aria-label="Quitar enlace">×</button>`).join("")}</div>
        <div class="addl"><input id="lkt-${p.id}" placeholder="Título"><input id="lku-${p.id}" placeholder="https://…" inputmode="url"><button class="btn sm" data-flkadd="${p.id}">${A.ICON.plus} Añadir</button></div></div>
      <div><span class="lbl">Fotos, capturas y bocetos</span><div class="pgrid" style="margin-top:6px">${im.map((x,i) => `<figure><img src="${esc(blobUrl(x.id))}" alt="" loading="lazy" data-fzoom="${esc(x.id)}"><button data-fimrm="${p.id}:${i}" aria-label="Quitar">×</button></figure>`).join("")}<button class="addp" data-fimadd="${p.id}">${A.ICON.cam}<span>Subir</span></button></div></div>
      ${auto ? `<div><button class="btn sm" data-fforce="${p.id}">Incluir este paso en el proyecto</button></div>` : ""}
    </div>`;
  }
  return `<div class="fstep ${cls}" id="st-${p.id}"><div class="srow">
    <div class="sst" role="group" aria-label="Estado del paso"><button class="a-ok" data-fst="${p.id}:ok" aria-pressed="${stv==="ok"}" title="Hecho">✓</button><button class="a-wip" data-fst="${p.id}:wip" aria-pressed="${stv==="wip"}" title="En curso">◐</button><button class="a-na" data-fst="${p.id}:na" aria-pressed="${stv==="na"}" title="No aplica a este proyecto">⊘</button></div>
    <button class="stt" data-ftog="${p.id}" aria-expanded="${open}"><span class="ti"><code>${num}</code>${esc(p.t)}</span>${tagHTML(p)}</button>
    <span class="sx">${auto ? "No aplica por condiciones" : ""}${((P.nt||{})[p.id] || ((P.lk||{})[p.id]||[]).length || ((P.im||{})[p.id]||[]).length) ? "● notas" : ""}</span></div>${det}</div>`;
}
function idxItem(it){
  if (typeof it === "string") return `<li>${esc(it)}</li>`;
  return `<li>${esc(it.t || "")}${it.ec ? `<span class="kk ec"><b>Ecuador</b>${esc(String(it.ec).replace(/^Ecuador:\s*/i,""))}</span>` : ""}${it.mundo ? `<span class="kk mu"><b>Mundo</b>${esc(String(it.mundo).replace(/^Mundo:\s*/i,""))}</span>` : ""}${it.raro ? `<span class="kk ra"><b>Poco común</b>${esc(String(it.raro).replace(/^Poco común:\s*/i,""))}</span>` : ""}${it.sub && it.sub.length ? `<ul>${it.sub.map(idxItem).join("")}</ul>` : ""}</li>`;
}
function pageMateria(P, m){
  if (!m) return "";
  const tab = F.mtab[m.id] || "pasos", off = (P.mat||{})[m.id] === "no", s = lineStats(P, "all", m._steps);
  const autoN = m._steps.filter(x => autoOff(P, x)).length;
  let body = "";
  if (tab === "indice") body = `<div class="idx">${m.indice.map(u => `<div class="u"><b>${esc(u.t)}</b><ul>${(u.items||[]).map(idxItem).join("")}</ul></div>`).join("")}</div>`;
  else if (tab === "aplica") body = `<div class="aibox"><p class="lead" style="margin:0">Cómo se aplica <b>${esc(m.n)}</b> a ${esc(P.nombre || "este proyecto")}${BYID[P.tipo] ? " (" + esc(BYID[P.tipo].n.toLowerCase()) + ")" : ""}${P.loc.canton ? " en " + esc(P.loc.canton) : ""}. Escríbelo tú o pídeselo a Claude: redacta la aplicación y propone una nota concreta para cada paso que aún no tenga nota.</p>
      ${sample ? `<div class="acts"><button class="btn pri sm" data-fai="${m.id}" ${F.aiBusy ? "disabled" : ""}>${F.aiBusy === m.id ? "Redactando… " + esc(F.aiMsg||"") : "Redactar con Claude"}</button></div>` : ""}
      <textarea data-fap="${m.id}" rows="16" placeholder="Aplicación de la materia al proyecto: normas, contratos, trámites, decisiones…">${esc((P.ap||{})[m.id] || "")}</textarea></div>`;
  else body = m.fases.map((f, fi) => { const ss = m._steps.filter(x => x.fi === fi), fs = lineStats(P, "all", ss);
      return `<section class="fase"><div class="fh"><b>${esc(f.n)}</b><span>${Math.round(fs.done*10)/10}/${fs.n}</span></div>${ss.map(x => stepHTML(P, x)).join("")}</section>`; }).join("");
  return `<div class="mhead"><div style="min-width:0;flex:1 1 380px"><div class="num" id="fl-mnum">MATERIA ${pad(m.orden)} · ${Math.round(s.done*10)/10} DE ${s.n} PASOS · ${pc(s.pct)}</div><h2>${esc(m.n)}</h2><p class="lead" style="margin:0">${esc(m.para||"")}</p></div>
    <div><span class="lbl" style="display:block;margin-bottom:5px">¿Aplica a este proyecto?</span><div class="seg"><button data-fmat="${m.id}:si" aria-pressed="${!off}">Sí aplica</button><button class="no" data-fmat="${m.id}:no" aria-pressed="${off}">No aplica</button></div></div></div>
    ${autoN && tab === "pasos" ? `<p class="ro" style="margin:0 0 12px">${autoN} paso${autoN>1?"s":""} quedan fuera por las condiciones del proyecto (se ven atenuados). Cámbialas en Datos y ubicación.</p>` : ""}
    <div class="mtabs" role="tablist"><button role="tab" data-fmtab="${m.id}:pasos" aria-selected="${tab==="pasos"}">Pasos para este proyecto</button><button role="tab" data-fmtab="${m.id}:indice" aria-selected="${tab==="indice"}">Entender la materia (índice)</button><button role="tab" data-fmtab="${m.id}:aplica" aria-selected="${tab==="aplica"}">Aplicación al proyecto</button></div>
    ${off ? `<div class="empty">Marcaste esta materia como no aplicable. Sus pasos no cuentan en el avance.</div>` : body}`;
}

/* borrador */
function photoRow(key, arr, label){ return `<div class="pgrid">${(arr||[]).map((x,i) => `<figure><img src="${esc(blobUrl(x.id))}" alt="" loading="lazy" data-fzoom="${esc(x.id)}"><button data-fbimrm="${key}:${i}" aria-label="Quitar">×</button></figure>`).join("")}<button class="addp" data-fbimadd="${key}">${A.ICON.cam}<span>${label}</span></button></div>`; }
function pageBor(P){
  const B = P.bor, rows = B.programa.filas || [], util = rows.reduce((a,r) => a + (+r.cant||0)*(+r.m2||0), 0), circ = +B.programa.circ || 0;
  const o = BYID[P.tipo], base = (A.PROG[o ? o.cat.c : ""] || []);
  const names = rows.map((r,i) => ({i, n: r.espacio || ("Espacio " + (i+1))})).slice(0, 28);
  return `<h2>Borrador</h2><p class="lead">Las primeras ideas del proyecto: áreas del programa, bocetos de zonificación, relaciones, peticiones del cliente, anotaciones y correcciones.</p>
    <h3>Programa arquitectónico inicial</h3>
    ${base.length ? `<div class="qchips" style="display:flex;flex-wrap:wrap;gap:5px;margin-bottom:10px">${base.map((b,i) => `<button class="chip" data-fpb="${i}">+ ${esc(b[1])}</button>`).join("")}</div>` : ""}
    <div class="tbl-wrap"><table class="tbl"><thead><tr><th style="width:20%">Zona</th><th>Espacio</th><th style="width:10%">Cant.</th><th style="width:12%">m² c/u</th><th style="width:12%" class="num">Subtotal</th><th style="width:34px"></th></tr></thead>
    <tbody>${rows.map((r,i) => `<tr><td><input data-fpr="${i}:zona" value="${esc(r.zona||"")}"></td><td><input data-fpr="${i}:espacio" value="${esc(r.espacio||"")}"></td><td><input class="num" data-fpr="${i}:cant" value="${esc(r.cant??1)}" inputmode="decimal"></td><td><input class="num" data-fpr="${i}:m2" value="${esc(r.m2??"")}" inputmode="decimal"></td><td class="num">${((+r.cant||0)*(+r.m2||0)).toFixed(1)}</td><td><button class="del" data-fprrm="${i}" aria-label="Quitar">×</button></td></tr>`).join("")}</tbody>
    <tfoot><tr><td colspan="4">Área útil</td><td class="num">${util.toFixed(1)} m²</td><td></td></tr><tr><td colspan="3">Circulación y muros</td><td><input class="num" data-fpcirc value="${esc(circ)}" inputmode="decimal" style="padding:4px 6px"></td><td class="num">%</td><td></td></tr><tr><td colspan="4"><b>Área bruta estimada</b></td><td class="num"><b>${(util*(1+circ/100)).toFixed(1)} m²</b></td><td></td></tr></tfoot></table></div>
    <div class="acts" style="margin-top:10px"><button class="btn sm" data-fpradd>${A.ICON.plus} Agregar espacio</button>${downloads ? `<button class="btn sm ghost" data-fprcsv>Descargar programa (.csv)</button>` : ""}</div>
    <h3>Matriz de relaciones</h3>
    ${names.length > 1 ? `<p class="lead">Toca cada celda para cambiar la relación: vacía (ninguna), 1 deseable, 2 necesaria, 3 indispensable. El diagrama de burbujas se dibuja solo con esta matriz y las áreas.</p>
    <div style="overflow-x:auto"><table class="matrix"><thead><tr><th></th>${names.map((x,xi) => `<th class="top" title="${esc(x.n)}">${xi+1}</th>`).join("")}</tr></thead><tbody>${names.map((a,ai) => `<tr><th><span class="mono" style="color:var(--acc);margin-right:6px">${ai+1}</span>${esc(a.n)}</th>${names.map((b,bi) => { if (bi <= ai) return "<td></td>"; const v = B.rel[a.i+"|"+b.i] || 0; return `<td><button class="r${v}" data-frel="${a.i}|${b.i}" aria-label="${esc(a.n)} con ${esc(b.n)}: ${v||"sin relación"}">${v||""}</button></td>`; }).join("")}</tr>`).join("")}</tbody></table></div>
    <h3>Diagrama de burbujas (generado)</h3><svg class="bubble" id="fl-bub" viewBox="0 0 800 500" role="img" aria-label="Diagrama de burbujas del programa"></svg>` : `<div class="empty">Agrega al menos dos espacios al programa para armar la matriz de relaciones y el diagrama de burbujas.</div>`}
    <h3>Bocetos de zonificación</h3>${photoRow("zon", B.zon, "Subir bocetos")}
    <h3>Bocetos de esquema de relaciones / burbujas</h3>${photoRow("burb", B.burb, "Subir bocetos")}
    <h3>Peticiones del cliente</h3>
    ${(B.peticiones||[]).map((r,i) => `<div class="req"><input data-fpe="${i}:t" value="${esc(r.t||"")}" placeholder="Ej. Sala de espera separada para niños con fiebre"><select data-fpe="${i}:p"><option value="1" ${r.p=="1"?"selected":""}>Imprescindible</option><option value="2" ${r.p=="2"?"selected":""}>Deseable</option><option value="3" ${r.p=="3"?"selected":""}>Opcional</option></select><button class="del" data-fperm="${i}" aria-label="Quitar">×</button></div>`).join("")}
    <div class="acts" style="margin-top:10px"><button class="btn sm" data-fpeadd>${A.ICON.plus} Agregar petición</button></div>
    <h3>Anotaciones e ideas</h3><textarea data-fbid rows="6" placeholder="Ideas de partido, conceptos, materiales, referencias que se te ocurren…">${esc(B.ideas||"")}</textarea>
    <h3>Otros bocetos y apuntes</h3>${photoRow("bocetos", B.bocetos, "Subir apuntes")}
    <h3>Correcciones</h3>
    ${(B.correcciones||[]).map((r,i) => `<div class="req" style="grid-template-columns:auto 1fr 150px auto"><input type="checkbox" data-fco="${i}:ok" ${r.ok?"checked":""} style="width:auto;accent-color:var(--done)" aria-label="Resuelta"><input data-fco="${i}:t" value="${esc(r.t||"")}" placeholder="Qué hay que corregir y quién lo pidió" style="${r.ok?"text-decoration:line-through;opacity:.6":""}"><input type="date" data-fco="${i}:f" value="${esc(r.f||"")}"><button class="del" data-fcorm="${i}" aria-label="Quitar">×</button></div>`).join("")}
    <div class="acts" style="margin-top:10px"><button class="btn sm" data-fcoadd>${A.ICON.plus} Agregar corrección</button></div>`;
}
function drawBubbles(P){
  const svg = $("#fl-bub"); if (!svg || !P) return;
  const rows = (P.bor.programa.filas||[]).slice(0, 28); if (rows.length < 2){ svg.innerHTML = ""; return; }
  const zones = [...new Set(rows.map(r => r.zona || "General"))], pal = ["#38E1FF","#B6FF3C","#FFB347","#C9A7FF","#7FB2FF","#FF8FB1","#6FFFD2","#FFE066"];
  const W = 800, H = 500, maxA = Math.max(1, ...rows.map(r => (+r.cant||1)*(+r.m2||10)));
  const N = rows.map((r,i) => { const a = (+r.cant||1)*(+r.m2||10); return {i, n: r.espacio || ("Espacio " + (i+1)), r: 16 + 44*Math.sqrt(a/maxA), z: zones.indexOf(r.zona || "General"), x: W/2 + Math.cos(i*2.4)*150, y: H/2 + Math.sin(i*2.4)*110, vx:0, vy:0}; });
  const E = []; for (const k in P.bor.rel){ const v = P.bor.rel[k]; if (!v) continue; const [a,b] = k.split("|").map(Number); if (N[a] && N[b]) E.push([N[a], N[b], v]); }
  for (let it = 0; it < 320; it++){
    const t = 1 - it/320;
    for (let i = 0; i < N.length; i++) for (let j = i+1; j < N.length; j++){ const a = N[i], b = N[j]; let dx = b.x-a.x, dy = b.y-a.y, d = Math.hypot(dx,dy) || .1; const min = a.r + b.r + 14; if (d < min*1.6){ const f = (min*1.6 - d)/d*.08; a.x -= dx*f; a.y -= dy*f; b.x += dx*f; b.y += dy*f; } }
    E.forEach(([a,b,v]) => { const dx = b.x-a.x, dy = b.y-a.y, d = Math.hypot(dx,dy) || .1, L = a.r + b.r + 30 - v*6, f = (d - L)/d*.02*v*t; a.x += dx*f; a.y += dy*f; b.x -= dx*f; b.y -= dy*f; });
    N.forEach(n => { n.x += (W/2 - n.x)*.004; n.y += (H/2 - n.y)*.004; n.x = Math.max(n.r+4, Math.min(W-n.r-4, n.x)); n.y = Math.max(n.r+4, Math.min(H-n.r-4, n.y)); });
  }
  svg.innerHTML = E.map(([a,b,v]) => `<line x1="${a.x.toFixed(1)}" y1="${a.y.toFixed(1)}" x2="${b.x.toFixed(1)}" y2="${b.y.toFixed(1)}" stroke="#8CA0B6" stroke-opacity="${.25+v*.2}" stroke-width="${v*1.6}" ${v===1?'stroke-dasharray="4 4"':""}/>`).join("") +
    N.map(n => `<g><circle cx="${n.x.toFixed(1)}" cy="${n.y.toFixed(1)}" r="${n.r.toFixed(1)}" fill="${pal[n.z%pal.length]}" fill-opacity=".18" stroke="${pal[n.z%pal.length]}" stroke-width="1.4"/><text x="${n.x.toFixed(1)}" y="${(n.y+4).toFixed(1)}" text-anchor="middle">${esc(n.n.length > 18 ? n.n.slice(0,17) + "…" : n.n)}</text></g>`).join("") +
    zones.map((z,i) => `<g><rect x="12" y="${12+i*18}" width="10" height="10" rx="2" fill="${pal[i%pal.length]}"/><text x="28" y="${21+i*18}" style="fill:#8CA0B6;font-size:11px">${esc(z)}</text></g>`).join("");
}
function pageEj(P){
  return `<h2>Ejemplos y referencias</h2><p class="lead">Guarda aquí los referentes del proyecto: publicaciones de Instagram, ArchDaily, Behance, videos o imágenes. Indica para qué sirve cada uno.</p>
    <div class="grid2" style="margin-bottom:10px"><label class="fl">Título<input id="ej-t" placeholder="Ej. Fachada con celosía de madera"></label><label class="fl">Enlace<input id="ej-u" placeholder="https://www.instagram.com/p/…" inputmode="url"></label>
    <label class="fl">Categoría<select id="ej-c">${["Concepto y forma","Fachadas","Interiores","Paisajismo","Detalles constructivos","Estructura","Instalaciones","Planimetría y láminas","Renders y postproducción","BIM y organización","Otro"].map(x => `<option>${x}</option>`).join("")}</select></label></div>
    <div class="acts" style="margin-bottom:16px"><button class="btn sm pri" data-fejadd>${A.ICON.plus} Guardar referencia</button><button class="btn sm" data-fejimg>${A.ICON.cam} Subir imágenes de referencia</button></div>
    ${(P.ej||[]).length ? `<div class="refs">${P.ej.map((r,i) => `<div class="ref">${r.img ? `<img src="${esc(blobUrl(r.img))}" alt="" loading="lazy" data-fzoom="${esc(r.img)}">` : ""}<span class="lbl">${esc(r.c||"")}</span><b style="font-weight:500">${esc(r.t || "Referencia")}</b>${r.u ? `<a href="${esc(r.u)}" target="_blank" rel="noopener">${esc(r.u.replace(/^https?:\/\/(www\.)?/,""))}</a>` : ""}<button class="btn sm ghost" data-fejrm="${i}" style="justify-self:start">Quitar</button></div>`).join("")}</div>` : `<div class="empty">Sin referencias todavía.</div>`}`;
}

/* carpetas */
const clean = s => String(s).replace(/[\\/:*?"<>|]/g, "-").replace(/\s+/g, " ").trim().replace(/[. ]+$/, "");
function fecha(){ const d = new Date(); return `${pad(d.getDate())}.${pad(d.getMonth()+1)}.${String(d.getFullYear()).slice(2)}`; }
function folderName(n, P){
  const ini = (P && P.ini) || "XX", code = (P && P.codigo) || "PROY", f = fecha();
  if (n.c === "000") return clean(`000. ${ini}_${code} _V01_${f}`);
  const parts = String(n.n).split(" · ");
  if (parts.length > 1) return clean(`${n.c}. ${parts[0]} _${ini}.${code}_${f}`);
  return clean(`${n.c}. ${n.n}`);
}
function treeHTML(nodes, P, depth){ return nodes.map(n => { const nm = folderName(n, P);
  if (!n.hijos || !n.hijos.length) return `<div class="leaf"><span class="fn">${esc(nm)}</span>${n.d ? `<div class="dd" style="padding-left:0">${esc(n.d)}</div>` : ""}</div>`;
  return `<details ${depth < 1 ? "open" : ""}><summary><span class="fn">${esc(nm)}</span>${n.d ? `<span class="dd">${esc(n.d)}</span>` : ""}</summary>${treeHTML(n.hijos, P, depth+1)}</details>`; }).join(""); }
function pageCarp(P){
  return `<h2>Estructura de carpetas</h2><p class="lead">La carpeta madre y su árbol completo, con los nombres en tu formato: código, abreviatura, iniciales, código del proyecto y fecha. ${P ? "Usa el código corto y las iniciales de este proyecto." : "Abre un proyecto para ver los nombres con su código."}</p>
    ${!P || !P.codigo ? `<p class="ro">Sin código corto se usa PROY. ${P ? "Complétalo en Datos y ubicación." : ""}</p>` : ""}
    <div class="acts" style="margin-bottom:14px">${downloads ? `<button class="btn sm pri" data-fzip>Descargar carpetas (.zip)</button><button class="btn sm" data-ftreetxt>Descargar árbol (.txt)</button>` : ""}<button class="btn sm ghost" data-fexpand>Desplegar todo</button></div>
    <div class="tree">${treeHTML(CARP, P, 0)}</div>`;
}
function treeTxt(nodes, P, pre){ return nodes.map((n,i) => { const last = i === nodes.length-1; return pre + (last ? "└── " : "├── ") + folderName(n, P) + (n.d ? "   # " + n.d : "") + "\n" + (n.hijos ? treeTxt(n.hijos, P, pre + (last ? "    " : "│   ")) : ""); }).join(""); }
/* zip sin compresión, solo carpetas + LEEME */
const CRC = (() => { const t = new Uint32Array(256); for (let n = 0; n < 256; n++){ let c = n; for (let k = 0; k < 8; k++) c = c & 1 ? 0xEDB88320 ^ (c >>> 1) : c >>> 1; t[n] = c >>> 0; } return b => { let c = 0xFFFFFFFF; for (let i = 0; i < b.length; i++) c = t[(c ^ b[i]) & 255] ^ (c >>> 8); return (c ^ 0xFFFFFFFF) >>> 0; }; })();
function makeZip(entries){
  const enc = new TextEncoder(), chunks = [], cd = []; let off = 0;
  const u16 = v => [v & 255, (v >>> 8) & 255], u32 = v => [v & 255, (v >>> 8) & 255, (v >>> 16) & 255, (v >>> 24) & 255];
  const d = new Date(), dt = ((d.getHours() << 11) | (d.getMinutes() << 5) | (d.getSeconds() >> 1)), dd = (((d.getFullYear()-1980) << 9) | ((d.getMonth()+1) << 5) | d.getDate());
  entries.forEach(e => {
    const name = enc.encode(e.name), data = e.data ? enc.encode(e.data) : new Uint8Array(0), crc = CRC(data);
    const lh = new Uint8Array([0x50,0x4b,3,4, ...u16(20), ...u16(0x0800), ...u16(0), ...u16(dt), ...u16(dd), ...u32(crc), ...u32(data.length), ...u32(data.length), ...u16(name.length), ...u16(0)]);
    chunks.push(lh, name, data);
    cd.push(new Uint8Array([0x50,0x4b,1,2, ...u16(20), ...u16(20), ...u16(0x0800), ...u16(0), ...u16(dt), ...u16(dd), ...u32(crc), ...u32(data.length), ...u32(data.length), ...u16(name.length), ...u16(0), ...u16(0), ...u16(0), ...u16(0), ...u32(e.dir ? 0x10 : 0), ...u32(off)]), name);
    off += lh.length + name.length + data.length;
  });
  const cdLen = cd.reduce((a,c) => a + c.length, 0);
  const end = new Uint8Array([0x50,0x4b,5,6, ...u16(0), ...u16(0), ...u16(entries.length), ...u16(entries.length), ...u32(cdLen), ...u32(off), ...u16(0)]);
  return new Blob([...chunks, ...cd, end], {type:"application/zip"});
}
function zipEntries(nodes, P, base, out){ nodes.forEach(n => { const p = base + folderName(n, P) + "/"; out.push({name:p, dir:1}); if (n.hijos) zipEntries(n.hijos, P, p, out); }); return out; }

/* codificación */
function pageCod(){
  const E = COD.esquema || {};
  const qv = norm(F.codq || "");
  const grupos = COD.grupos.map(g => ({...g, filas: qv ? g.filas.filter(r => norm(r.join(" ")).includes(qv)) : g.filas})).filter(g => g.filas.length);
  return `<h2>Codificación BIM</h2><p class="lead">${esc(COD.intro || "")}</p>
    ${E.formato ? `<div class="box" style="border-left:2px solid var(--acc);padding:10px 14px;background:rgba(var(--acc-rgb),.05);margin-bottom:12px;max-width:900px"><span class="lbl">Formato</span><div class="mono" style="font-size:12.5px;margin:4px 0 8px;overflow-wrap:anywhere">${esc(E.formato)}</div><span class="lbl">Ejemplo</span><div class="mono" style="font-size:12.5px;margin-top:4px;overflow-wrap:anywhere">${esc(E.ejemplo||"")}</div></div>` : ""}
    ${E.partes ? `<div class="tbl-wrap" style="margin-bottom:20px"><table class="mtable"><thead><tr><th>Campo</th><th>Qué es</th><th>Ejemplos</th></tr></thead><tbody>${E.partes.map(r => `<tr><td class="mono" style="color:var(--acc)">${esc(r[0])}</td><td>${esc(r[1])}</td><td style="color:var(--muted)">${esc(r[2]||"")}</td></tr>`).join("")}</tbody></table></div>` : ""}
    <label class="fl" style="max-width:420px;margin-bottom:10px">Buscar código<input id="fl-codq" value="${esc(F.codq||"")}" placeholder="Ej. porcelanato, IE, S2, puertas…"></label>
    <div class="codg">${grupos.map(g => `<section><h3 style="margin-top:6px">${esc(g.n)} · ${g.filas.length}</h3>${g.desc ? `<p class="ro" style="margin:0 0 8px;max-width:80ch">${esc(g.desc)}</p>` : ""}<div class="tbl-wrap"><table><tbody>${g.filas.map(r => `<tr><td>${esc(r[0])}</td><td>${esc(r[1])}</td><td>${esc(r[2]||"")}</td></tr>`).join("")}</tbody></table></div></section>`).join("") || `<div class="empty">Sin coincidencias.</div>`}</div>`;
}

/* ---------- informe ---------- */
function report(P){
  const L = allLines(P), o = BYID[P.tipo];
  let t = `# ${P.nombre || "Proyecto"}\n\n- Tipología: ${o ? o.n : "—"}\n- Ubicación: ${[P.loc.direccion, P.loc.parroquia, P.loc.canton, P.loc.provincia, P.loc.pais].filter(Boolean).join(", ")}\n- Coordenadas: ${hasLL(P) ? P.loc.lat + ", " + P.loc.lon : "—"}\n- Cliente: ${P.cliente || "—"}\n- Fecha: ${new Date().toLocaleDateString("es-EC")}\n\n## Avance\n\n| Línea | Avance | Pasos |\n|---|---|---|\n`;
  LINES.forEach(l => t += `| ${l.n} | ${pc(L[l.k].pct)} | ${Math.round(L[l.k].done*10)/10}/${L[l.k].n} |\n`);
  M.forEach(m => {
    if ((P.mat||{})[m.id] === "no"){ t += `\n## ${pad(m.orden)}. ${m.n}\n\nNo aplica a este proyecto.\n`; return; }
    t += `\n## ${pad(m.orden)}. ${m.n}\n\n`; if ((P.ap||{})[m.id]) t += `### Aplicación al proyecto\n\n${P.ap[m.id]}\n\n`;
    m.fases.forEach((f, fi) => { const ss = m._steps.filter(x => x.fi === fi && applies(P, x)); if (!ss.length) return; t += `### ${f.n}\n\n`;
      ss.forEach(x => { const s = stOf(P, x.p.id); t += `- [${s === "ok" ? "x" : " "}] ${x.p.t}${s === "wip" ? " (en curso)" : ""}\n`; const n = (P.nt||{})[x.p.id]; if (n) t += `  - Nota: ${n.replace(/\n/g, " ")}\n`; ((P.lk||{})[x.p.id]||[]).forEach(k => t += `  - Enlace: ${k.t ? k.t + " — " : ""}${k.u}\n`); }); t += "\n"; });
  });
  return t;
}

/* ---------- Claude: aplicación de la materia ---------- */
async function aiApply(mid){
  const P = P0(), m = MBY[mid]; if (!P || !m || !sample || F.aiBusy) return;
  const o = BYID[P.tipo];
  const ctx = `Proyecto: ${P.nombre || "(sin nombre)"}\nTipología: ${o ? o.n + " (" + o.cat.n + ")" : "no definida"}\nUbicación: ${[P.loc.direccion, P.loc.parroquia, P.loc.canton, P.loc.provincia, P.loc.pais || "Ecuador"].filter(Boolean).join(", ")}${hasLL(P) ? " (" + P.loc.lat + ", " + P.loc.lon + ")" : ""}\nTerreno: ${P.datos.terreno || "?"} m² · Construcción: ${P.datos.construccion || "?"} m² · Pisos: ${P.datos.pisos || "?"}\nCondiciones: ${FLAGS.filter(f => (P.flags||{})[f[0]]).map(f => f[1]).join(", ") || "ninguna especial"}\nPeticiones del cliente: ${(P.bor.peticiones||[]).map(x => x.t).filter(Boolean).join("; ") || "—"}`;
  const all = m._steps.filter(x => applies(P, x));
  const groups = []; for (let i = 0; i < all.length; i += 14) groups.push(all.slice(i, i + 14));
  F.aiBusy = mid; let resumen = [];
  try {
    for (let gi = 0; gi < groups.length; gi++){
      F.aiMsg = `${gi+1}/${groups.length}`; renderWS();
      const lista = groups[gi].map(x => `- ${x.p.id}: ${x.p.t} — ${String(x.p.d||"").slice(0, 260).replace(/\n/g, " ")}`).join("\n");
      const prompt = `Eres un arquitecto experto que ejerce en Ecuador. Aplica la materia universitaria "${m.n}" a este proyecto real.\n\n${ctx}\n\nPasos de la materia (id: título — descripción):\n${lista}\n\nPara CADA paso escribe una nota concreta (2 a 4 frases) de cómo se aplica a ESTE proyecto: qué norma, entidad, trámite, documento, dato o decisión corresponde, con nombres reales de instituciones del cantón cuando los sepas. Si un paso no aplica, dilo y explica por qué en una frase. No inventes cifras normativas: si no estás seguro de un valor, indica dónde verificarlo. Además escribe un resumen de 3 a 6 frases de cómo se aplica este bloque de la materia al proyecto.\nResponde SOLO con JSON: {"resumen":"...","pasos":[{"id":"...","nota":"..."}]}`;
      const r = await sample.json(prompt, {modelTier: "default"});
      if (r && r.resumen) resumen.push(r.resumen);
      const Pn = P0(); if (!Pn) break;
      (r && r.pasos || []).forEach(x => { if (SBY[x.id] && x.nota && !(Pn.nt||{})[x.id]){ Pn.nt[x.id] = "Claude: " + String(x.nota).trim(); } });
    }
    const Pn = P0(); if (Pn){ const prev = (Pn.ap||{})[mid] || ""; Pn.ap[mid] = (prev ? prev.trim() + "\n\n" : "") + resumen.join("\n\n"); save(); }
    toast("Listo: revisa la aplicación y las notas de cada paso.");
  } catch(e){
    const c = e && e.code;
    toast(c === "not_granted" ? "No se dio permiso para consultar a Claude." : c === "rate_limited" ? "Demasiadas consultas seguidas. Espera un momento." : "No se pudo completar la redacción. Inténtalo de nuevo.");
    if (c === "not_granted") sample = null;
  }
  F.aiBusy = null; F.aiMsg = ""; renderWS();
}

/* =========================================================
   LÍNEA DE FLUJO — pizarra con zoom (línea de tiempo con ramas)
   ========================================================= */
const TLCSS = `
#flov .fbody.tlmode{padding:0;overflow:hidden;position:relative}
.tlw{position:absolute;inset:0;overflow:hidden;cursor:grab;touch-action:none;background:
  radial-gradient(1200px 420px at 50% 45%,rgba(var(--acc-rgb),.06),transparent 70%),
  linear-gradient(var(--grid) 1px,transparent 1px),linear-gradient(90deg,var(--grid) 1px,transparent 1px);background-size:auto,44px 44px,44px 44px}
.tlw.drag{cursor:grabbing}
#tlworld{position:absolute;left:0;top:0;transform-origin:0 0;will-change:transform}
#tlworld svg{display:block;overflow:visible}
#tlworld svg text{font-family:var(--f-b)}
#tlworld .mc{cursor:pointer}
#tlworld .mc:hover rect.box{stroke:var(--acc)}
#tlworld .sd{cursor:pointer}
#tlworld .sd:hover{stroke:#fff;stroke-width:2}
.tlhud{position:absolute;left:14px;top:12px;display:flex;gap:8px;align-items:center;flex-wrap:wrap;z-index:3;pointer-events:none}
.tlhud .lvl{font-family:var(--f-m);font-size:10px;letter-spacing:.14em;color:var(--acc);background:var(--glass);border:1px solid var(--line);padding:5px 10px;border-radius:6px;text-transform:uppercase}
.tlhud .hint3{font-family:var(--f-m);font-size:10px;color:var(--muted);background:var(--glass);border:1px solid var(--line);padding:5px 10px;border-radius:6px}
.tlzoom{position:absolute;right:14px;top:12px;display:flex;flex-direction:column;border:1px solid var(--line2);background:var(--glass);border-radius:8px;overflow:hidden;z-index:3}
.tlzoom button{border:0;background:none;min-width:44px;padding:0 6px;height:36px;color:var(--muted);font-family:var(--f-m);font-size:16px;border-bottom:1px solid var(--line)}
.tlzoom button:last-child{border-bottom:0}
.tlzoom button.tx{font-size:9px;letter-spacing:.1em}
.tlzoom button:hover{color:var(--acc);background:rgba(var(--acc-rgb),.08)}
.tltip{position:absolute;z-index:6;max-width:320px;background:var(--panel2);border:1px solid var(--line2);border-radius:8px;padding:9px 11px;font-size:12.5px;pointer-events:none;box-shadow:0 14px 40px -10px rgba(0,0,0,.8)}
.tltip small{display:block;font-family:var(--f-m);font-size:9.5px;letter-spacing:.1em;text-transform:uppercase;color:var(--acc);margin-bottom:3px}
.tltip em{font-style:normal;display:block;margin-top:4px;font-family:var(--f-m);font-size:10px;color:var(--muted)}

/* ventana flotante de avance */
.flt{position:absolute;z-index:40;touch-action:none;user-select:none;-webkit-user-select:none;cursor:grab;width:min(300px,calc(100vw - 24px));padding:10px 12px;border-radius:12px;transition:background .25s,box-shadow .25s,border-color .25s;border:1px solid transparent}
.flt.dragging{cursor:grabbing;background:rgba(10,19,31,.72);border-color:var(--line2);backdrop-filter:blur(6px)}
.flt:hover{background:rgba(10,19,31,.45)}
.flt .fr{display:grid;grid-template-columns:104px minmax(0,1fr) 40px;gap:4px 10px;align-items:center;font-size:11.5px;padding:2px 0;color:#CFDBEA;text-shadow:0 1px 6px #000,0 0 2px #000}
.flt .fr span.v{font-family:var(--f-m);text-align:right;font-variant-numeric:tabular-nums;color:var(--ink)}
.flt .fr span.n em{font-style:normal;color:var(--warn);font-family:var(--f-m);font-size:9px;margin-left:4px}
.flt .fr i{height:4px;border-radius:2px;background:rgba(255,255,255,.1);overflow:hidden;display:block;box-shadow:0 0 0 1px rgba(0,0,0,.35)}
.flt .fr i u{display:block;height:100%;border-radius:2px;animation:fltb 2.2s ease-in-out infinite}
.flt .fr:nth-child(2) i u{animation-delay:.25s}.flt .fr:nth-child(3) i u{animation-delay:.5s}.flt .fr:nth-child(4) i u{animation-delay:.75s}.flt .fr:nth-child(5) i u{animation-delay:1s}.flt .fr:nth-child(6) i u{animation-delay:1.25s}
@keyframes fltb{0%,100%{opacity:1;box-shadow:0 0 8px currentColor}50%{opacity:.45;box-shadow:0 0 2px currentColor}}
.flt .grip2{display:flex;justify-content:space-between;align-items:center;font-family:var(--f-m);font-size:9px;letter-spacing:.14em;color:var(--faint);text-transform:uppercase;margin-bottom:4px;text-shadow:0 1px 4px #000}
.flt .grip2 b{font-weight:500;color:var(--acc);animation:fltb 2.2s infinite}
.flt.open{background:rgba(8,16,26,.96);border-color:var(--line2);box-shadow:0 20px 60px -16px rgba(0,0,0,.9);width:min(460px,calc(100vw - 24px))}
.flt .fx{margin-top:10px;display:grid;gap:10px;cursor:auto;max-height:min(52vh,460px);overflow:auto;padding-right:4px}
.flt .fx canvas{width:100%;height:92px;display:block;border:1px solid var(--line);border-radius:6px;background:rgba(255,255,255,.015);cursor:pointer;touch-action:none}
.flt .fx .ml{display:flex;justify-content:space-between;gap:8px;font-family:var(--f-m);font-size:9px;color:var(--faint);letter-spacing:.08em;text-transform:uppercase}
.flt .fx h5{margin:6px 0 3px;font-family:var(--f-m);font-weight:500;font-size:10px;letter-spacing:.12em;text-transform:uppercase}
.flt .fx .lab{display:block;font-family:var(--f-m);font-size:9px;letter-spacing:.12em;text-transform:uppercase;margin:5px 0 2px}
.flt .fx button.go{display:block;width:100%;text-align:left;border:0;background:none;color:var(--ink);font-size:12px;padding:3px 5px;border-radius:4px;line-height:1.3}
.flt .fx button.go:hover{background:rgba(var(--acc-rgb),.08)}
.flt .fx button.go code{font-family:var(--f-m);font-size:9.5px;color:var(--faint);margin-right:5px}
@media (prefers-reduced-motion: reduce){ .flt .fr i u,.flt .grip2 b{animation:none} }
`;
{ const st2 = document.createElement("style"); st2.textContent = TLCSS; document.head.appendChild(st2); }

const LANE = {all:0, dis:-1, bim:-2, doc:1, sost:2, mant:3};
const LCOL = {all:"#E4EEFA", dis:"#7FB2FF", bim:"#38E1FF", sost:"#B6FF3C", mant:"#FFB347", doc:"#C9A7FF"};
const TLH = 640, TY0 = 270, TU = 80;
F.tcam = null; F.fpos = null; F.fopen = false;
try { const v = JSON.parse(localStorage.getItem("flujo-ui2") || "{}"); if (v.p) F.fpos = v.p; } catch(e){}
function uiSave(){ try { localStorage.setItem("flujo-ui2", JSON.stringify({p:F.fpos})); } catch(e){} }

function tlLayout(P){
  const S = 17, segs = [], pts = []; let x = 150;
  const org = {x0:x, x1:x + 250}; x = org.x1 + 40;
  M.forEach(m => {
    const off = (P.mat||{})[m.id] === "no", x0 = x, sx = x0 + 200;
    if (off){ segs.push({m, x0, cx:x0+80, x1:x0 + 230, off:true, fases:[]}); x = x0 + 250; return; }
    let cur = sx; const fases = [];
    m.fases.forEach((f, fi) => { fases.push({f, x:cur}); m._steps.filter(s => s.fi === fi).forEach(s => { pts.push({s, x:cur}); cur += S; }); cur += S*0.8; });
    segs.push({m, x0, cx:x0+80, x1:cur + 30, fases}); x = cur + 70;
  });
  const end = {x0:x, x1:x + 260};
  return {W: end.x1 + 60, H: TLH, org, end, segs, pts, S};
}
function stepCls(P, s, skippedSet){
  const st = stOf(P, s.p.id);
  if ((P.mat||{})[s.m.id] === "no" || st === "na" || autoOff(P, s)) return "off";
  if (st === "ok") return "ok"; if (st === "wip") return "wip";
  return skippedSet.has(s.p.id) ? "skip" : "pend";
}
const lvlOf = s => s < .38 ? "macro" : s < 1.2 ? "medio" : "micro";
function drawTimeline(P){
  const svgEl = $("#tlsvg"); if (!svgEl || !P) return;
  const lvl = F.tlvl || "medio", L = tlLayout(P), y0 = TY0, u = TU*(lvl === "macro" && F.tcam ? Math.min(5, Math.max(1, .42/F.tcam.s)) : 1);
  const centers = [L.org.x0 + 125, ...L.segs.map(g => g.cx), L.end.x0 + 130];
  const pinch = x => { let d = 1e9; for (const c of centers) d = Math.min(d, Math.abs(x - c)); const t = Math.min(1, d/220); return .22 + .78*(t*t*(3-2*t)); };
  const laneY = (k, x) => k === "all" ? y0 : y0 + LANE[k]*u*pinch(x) + Math.sin(x/230 + LANE[k]*1.7)*5*pinch(x);
  const skipped = {}; LINES.forEach(l => skipped[l.k] = new Set(lineStats(P, l.k).skipped.map(s => s.p.id)));
  const nxt = STEPS.find(s => applies(P, s) && stOf(P, s.p.id) !== "ok");
  const NS = 'vector-effect="non-scaling-stroke"';
  let svg = `<defs><filter id="glow" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="3.2" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter></defs>`;
  L.segs.forEach((g, i) => { svg += `<rect x="${g.x0}" y="${y0 - u*2.6}" width="${g.x1 - g.x0}" height="${u*5.9}" rx="14" fill="${i%2 ? "rgba(255,255,255,.012)" : "rgba(56,225,255,.02)"}" stroke="rgba(120,200,255,.07)" ${NS}/>`; });
  ["bim","dis","doc","sost","mant"].forEach(k => {
    let d = ""; for (let x = 0; x <= L.W; x += 24){ d += (x ? "L" : "M") + x + "," + laneY(k, x).toFixed(1); }
    svg += `<path d="${d}" fill="none" stroke="${LCOL[k]}" stroke-opacity=".14" stroke-width="7"/><path d="${d}" fill="none" stroke="${LCOL[k]}" stroke-opacity=".6" stroke-width="1.4" ${NS}/>`;
    svg += `<text x="16" y="${(laneY(k, 16) + 4).toFixed(1)}" fill="${LCOL[k]}" font-size="10.5" font-family="var(--f-m)" letter-spacing="1.5">${LINES.find(l=>l.k===k).n.toUpperCase()}</text>`;
  });
  svg += `<line x1="0" y1="${y0}" x2="${L.W}" y2="${y0}" stroke="${LCOL.all}" stroke-opacity=".12" stroke-width="16"/><line x1="0" y1="${y0}" x2="${L.W}" y2="${y0}" stroke="${LCOL.all}" stroke-opacity=".85" stroke-width="2.4" ${NS} filter="url(#glow)"/>`;
  if (lvl !== "macro"){
    L.pts.forEach(({s, x}) => {
      const cls = stepCls(P, s, skipped.all);
      (s.p.tags||[]).forEach(t => { const ys = laneY(t, x), c = stepCls(P, s, skipped[t]);
        const op = c === "ok" ? .75 : c === "wip" ? .5 : c === "skip" ? .55 : c === "off" ? .06 : .16;
        svg += `<path d="M${x},${y0} C${x+L.S*.9},${((y0+ys)/2).toFixed(1)} ${x-L.S*.9},${((y0+ys)/2).toFixed(1)} ${x},${ys.toFixed(1)}" fill="none" stroke="${c === "skip" ? "#FF5C7A" : LCOL[t]}" stroke-opacity="${op}" stroke-width="${c === "ok" ? 1.4 : 1}" ${NS}/>`;
        svg += `<circle class="sd" data-sid="${s.p.id}" cx="${x}" cy="${ys.toFixed(1)}" r="${c === "off" ? 2 : 3.6}" fill="${c === "ok" ? LCOL[t] : c === "wip" ? "rgba(56,225,255,.35)" : "#04070C"}" stroke="${c === "skip" ? "#FF5C7A" : LCOL[t]}" stroke-opacity="${c === "off" ? .25 : 1}" stroke-width="1.3"/>`;
      });
      const col = cls === "ok" ? "#B6FF3C" : cls === "wip" ? "#38E1FF" : cls === "skip" ? "#FF5C7A" : cls === "off" ? "#33424F" : "#8CA0B6";
      svg += `<rect class="sd" data-sid="${s.p.id}" x="${x-4.5}" y="${y0-4.5}" width="9" height="9" transform="rotate(45 ${x} ${y0})" fill="${cls === "ok" ? col : "#04070C"}" stroke="${col}" stroke-width="1.5"/>`;
      if (lvl === "micro") svg += `<text x="${x}" y="${y0 + 22}" fill="#55677C" font-size="8.5" text-anchor="middle" font-family="var(--f-m)">${s.p.id.split("-")[1]}</text>`;
    });
    L.segs.forEach(g => g.fases.forEach((fz, fi) => { const yt = y0 - u*2.35;
      svg += `<line x1="${fz.x - 6}" y1="${yt + 8}" x2="${fz.x - 6}" y2="${y0 + u*3.1}" stroke="rgba(120,200,255,.16)" stroke-dasharray="2 5" ${NS}/>`;
      const nx = fi < g.fases.length - 1 ? g.fases[fi+1].x : g.x1, maxc = Math.floor((nx - fz.x - 10)/6.3);
      const full = fz.f.n, short = (full.match(/^(Fase \d+|Cap[íi]tulo \d+|\d+)/i) || [full.slice(0,6)])[0];
      const label = maxc >= full.length ? full : maxc >= 12 ? full.slice(0, maxc - 1) + "…" : maxc >= short.length ? short : "";
      if (label) svg += `<text x="${fz.x - 2}" y="${yt}" fill="#8CA0B6" font-size="10" font-family="var(--f-m)">${esc(label)}</text>`; }));
  } else {
    L.segs.forEach(g => { if (g.off) return; ["all","bim","dis","doc","sost","mant"].forEach(k => { const st = lineStats(P, k, g.m._steps); if (!st.n) return;
      const xa = g.x0 + 190, xb = g.x1 - 30, xm = xa + (xb - xa)*st.pct, y = k === "all" ? y0 : laneY(k, (xa+xb)/2);
      svg += `<line x1="${xa}" y1="${y.toFixed(1)}" x2="${xb}" y2="${y.toFixed(1)}" stroke="${LCOL[k]}" stroke-opacity=".22" stroke-width="5" stroke-linecap="round" ${NS}/>`;
      if (st.pct > 0) svg += `<line x1="${xa}" y1="${y.toFixed(1)}" x2="${xm.toFixed(1)}" y2="${y.toFixed(1)}" stroke="${LCOL[k]}" stroke-width="5" stroke-linecap="round" ${NS}/>`; }); });
  }
  const node = (x, y, w, h, t, sub, page, accent) => `<g class="mc" data-tlpage="${page}" data-cx="${x + w/2}" data-cy="${y + h/2}"><rect class="box" x="${x}" y="${y}" width="${w}" height="${h}" rx="7" fill="#0A131F" stroke="${accent||"rgba(120,200,255,.4)"}" stroke-width="1.2" ${NS}/><text x="${x+12}" y="${y+20}" fill="#E4EEFA" font-size="12" font-weight="600">${esc(t)}</text><text x="${x+12}" y="${y+36}" fill="#8CA0B6" font-size="10.5">${esc(sub)}</text></g>`;
  const ox = L.org.x0;
  svg += `<circle cx="${ox}" cy="${y0}" r="9" fill="#04070C" stroke="${LCOL.all}" stroke-width="2" filter="url(#glow)"/><text x="${ox}" y="${y0 - 18}" fill="#E4EEFA" text-anchor="middle" font-size="11" font-family="var(--f-m)" letter-spacing="2">INICIO</text>`;
  [["datos","Datos y ubicación",(P.loc.canton||"Ubicación pendiente"),-1.55],["bor","Borrador",`${(P.bor.programa.filas||[]).length} espacios · ${(P.bor.peticiones||[]).length} peticiones`,.55],["ej","Ejemplos",`${(P.ej||[]).length} referencias`,1.95]].forEach(([pg,t,sub,f]) => {
    const bx = ox + 60, by = y0 + f*u - 22;
    svg += `<path d="M${ox},${y0} C${ox+40},${y0} ${ox+20},${by+22} ${bx},${by+22}" fill="none" stroke="rgba(120,200,255,.4)" ${NS}/>` + node(bx, by, 170, 44, t, sub, pg);
  });
  const ex = L.end.x0 + 30;
  svg += `<circle cx="${L.end.x1 - 20}" cy="${y0}" r="9" fill="#04070C" stroke="#B6FF3C" stroke-width="2" filter="url(#glow)"/><text x="${L.end.x1 - 20}" y="${y0 - 18}" fill="#B6FF3C" text-anchor="middle" font-size="11" font-family="var(--f-m)" letter-spacing="2">ENTREGA</text>`;
  [["carp","Estructura de carpetas","Árbol BIM descargable",-1.2],["cod","Codificación","Disciplinas, archivos, láminas",.9]].forEach(([pg,t,sub,f]) => { const by = y0 + f*u - 22;
    svg += `<path d="M${ex},${by+22} C${ex+80},${by+22} ${L.end.x1-80},${y0} ${L.end.x1-20},${y0}" fill="none" stroke="rgba(182,255,60,.35)" ${NS}/>` + node(ex, by, 180, 44, t, sub, pg, "rgba(182,255,60,.5)"); });
  L.segs.forEach(g => { const m = g.m, st = lineStats(P, "all", m._steps), w = 160, h = 74, x = g.cx - w/2, y = y0 - h/2;
    const col = g.off ? "#55677C" : st.pct >= 1 ? "#B6FF3C" : st.done > 0 ? "#38E1FF" : "rgba(120,200,255,.5)";
    svg += `<g class="mc mat" data-tlpage="m:${m.id}" data-cx="${g.cx}" data-cy="${y0}"><rect x="${x-6}" y="${y-6}" width="${w+12}" height="${h+12}" rx="11" fill="${col}" opacity=".1"/>
      <rect class="box" x="${x}" y="${y}" width="${w}" height="${h}" rx="8" fill="#08101A" stroke="${col}" stroke-width="1.6" ${NS}/>
      <text x="${x+12}" y="${y+19}" fill="${col}" font-size="10" font-family="var(--f-m)" letter-spacing="1.5">MATERIA ${pad(m.orden)}</text>
      <text x="${x+12}" y="${y+38}" fill="${g.off ? "#55677C" : "#E4EEFA"}" font-size="13" font-weight="600">${esc(m.corto)}</text>
      <text x="${x+w-12}" y="${y+38}" fill="${col}" font-size="12" text-anchor="end" font-family="var(--f-m)">${g.off ? "—" : pc(st.pct)}</text>
      <rect x="${x+12}" y="${y+50}" width="${w-24}" height="4" rx="2" fill="rgba(255,255,255,.08)"/>${g.off ? "" : `<rect x="${x+12}" y="${y+50}" width="${((w-24)*st.pct).toFixed(1)}" height="4" rx="2" fill="${col}"/>`}
      <text x="${x+12}" y="${y+67}" fill="#8CA0B6" font-size="9.5" font-family="var(--f-m)">${g.off ? "NO APLICA" : `${Math.round(st.done*10)/10}/${st.n} PASOS`}</text></g>`; });
  const np = nxt && L.pts.find(p => p.s === nxt);
  if (np){ svg += `<line x1="${np.x}" y1="${y0 - u*2.5}" x2="${np.x}" y2="${y0 + u*3.2}" stroke="#38E1FF" stroke-width="1.5" stroke-dasharray="4 4" ${NS} filter="url(#glow)"><animate attributeName="stroke-opacity" values="1;.35;1" dur="2.4s" repeatCount="indefinite"/></line>
    <g class="sd mc" data-sid="${nxt.p.id}" data-cx="${np.x}" data-cy="${y0 + u*3.2 + 10}"><rect x="${np.x - 44}" y="${y0 + u*3.2}" width="88" height="20" rx="4" fill="#38E1FF"/><text x="${np.x}" y="${y0 + u*3.2 + 14}" fill="#021016" font-size="10" text-anchor="middle" font-family="var(--f-m)" letter-spacing="1.5">SIGUIENTE</text></g>`; }
  svgEl.setAttribute("width", L.W); svgEl.setAttribute("height", L.H); svgEl.setAttribute("viewBox", `0 0 ${L.W} ${L.H}`); svgEl.innerHTML = svg;
  F._tl = L; F._tlv = lvl; scaleCards(); drawMini(P);
}
/* zoom semántico: los cuadritos y títulos siguen legibles al alejar */
function scaleCards(){
  const cam = F.tcam; if (!cam) return; const q0 = Math.max(1, Math.min(6, .7/cam.s));
  const mats = [...document.querySelectorAll("#tlworld .mc.mat")].map(g => +g.dataset.cx);
  document.querySelectorAll("#tlworld .mc").forEach(g => { const cx = +g.dataset.cx, cy = +g.dataset.cy;
    let q = q0; if (g.classList.contains("mat")){ let gap = 1e9; mats.forEach(o => { if (o !== cx) gap = Math.min(gap, Math.abs(o - cx)); }); q = Math.max(1, Math.min(q0, (gap - 14)/172)); }
    else q = Math.max(1, Math.min(q0, 1.6));
    g.setAttribute("transform", q === 1 ? "" : `translate(${cx} ${cy}) scale(${q}) translate(${-cx} ${-cy})`); });
  document.querySelectorAll("#tlworld svg > text").forEach(t => t.setAttribute("font-size", (10.5*Math.min(4, Math.max(1, .8/cam.s))).toFixed(1)));
}
function tlSize(){ const w = $("#tlw"); return w ? {w: w.clientWidth, h: w.clientHeight} : {w: 800, h: 500}; }
function applyTCam(){
  const wd = $("#tlworld"), cam = F.tcam; if (!wd || !cam) return;
  wd.style.transform = `translate(${cam.x}px,${cam.y}px) scale(${cam.s})`;
  const lv = lvlOf(cam.s);
  if (lv !== F.tlvl){ F.tlvl = lv; drawTimeline(P0()); }
  else if (lv === "macro"){ if (!applyTCam.q){ applyTCam.q = requestAnimationFrame(() => { applyTCam.q = 0; drawTimeline(P0()); }); } }
  else { scaleCards(); drawMini(P0()); }
  const t = $("#tllvl"); if (t) t.textContent = lv === "macro" ? "Vista macro · materias" : lv === "medio" ? "Vista media · fases y pasos" : "Vista micro · cada paso numerado";
}
function camFit(){ const {w, h} = tlSize(), L = F._tl || tlLayout(P0()); const s = Math.min(w/(L.W + 80), (h - 40)/L.H); return {s, x:(w - L.W*s)/2, y:h*.5 - TY0*s}; }
function camStart(){ const {w, h} = tlSize(); const s = Math.max(.5, Math.min(1, h/(TLH + 40))); return {s, x:20 - 60*s, y:h*.45 - TY0*s}; }
let tanim = null;
function tfly(to, ms){
  cancelAnimationFrame(tanim);
  if (!F.tcam || ms === 0 || matchMedia("(prefers-reduced-motion: reduce)").matches){ F.tcam = to; applyTCam(); return; }
  const from = {...F.tcam}, t0 = performance.now(), D = ms || 500, {w, h} = tlSize();
  const c0 = {x:(w/2-from.x)/from.s, y:(h/2-from.y)/from.s}, c1 = {x:(w/2-to.x)/to.s, y:(h/2-to.y)/to.s}, l0 = Math.log(from.s), l1 = Math.log(to.s);
  const step = now => { let k = Math.min(1, (now - t0)/D); k = k < .5 ? 4*k*k*k : 1 - Math.pow(-2*k+2, 3)/2;
    const s = Math.exp(l0 + (l1-l0)*k), cx = c0.x + (c1.x-c0.x)*k, cy = c0.y + (c1.y-c0.y)*k; F.tcam = {s, x:w/2 - cx*s, y:h/2 - cy*s}; applyTCam(); if (k < 1) tanim = requestAnimationFrame(step); };
  tanim = requestAnimationFrame(step);
}
function tzoomAt(f, mx, my){ const c = F.tcam; if (!c) return; const s = Math.max(.08, Math.min(4, c.s*f)); F.tcam = {s, x: mx - (mx - c.x)*s/c.s, y: my - (my - c.y)*s/c.s}; applyTCam(); }
function tlCenterOn(wx, wy, s){ const {w, h} = tlSize(), c = F.tcam || camStart(); s = s || c.s; F.tcam = {s, x: w/2 - wx*s, y: h/2 - (wy ?? TY0)*s}; applyTCam(); }

function drawMini(P){
  const cv = $("#fl-mini"); if (!cv || !P) return;
  const L = F._tl || tlLayout(P), r = cv.getBoundingClientRect(), dpr = Math.min(2, window.devicePixelRatio || 1);
  if (!r.width) return;
  cv.width = Math.round(r.width*dpr); cv.height = Math.round(92*dpr); const c = cv.getContext("2d"); c.setTransform(dpr,0,0,dpr,0,0);
  const W = r.width, sx = W / L.W, rows = ["all","dis","bim","sost","mant","doc"], rh = 12, top = 8;
  c.clearRect(0,0,W,92);
  L.segs.forEach((g,i) => { c.fillStyle = i%2 ? "rgba(255,255,255,.025)" : "rgba(56,225,255,.035)"; c.fillRect(g.x0*sx, 0, (g.x1-g.x0)*sx, 92);
    c.fillStyle = g.off ? "#55677C" : "#8CA0B6"; c.font = "9px 'JetBrains Mono', monospace"; if ((g.x1-g.x0)*sx > 16) c.fillText(pad(g.m.orden), g.x0*sx + 3, 88); });
  const sk = {}; rows.forEach(k => sk[k] = new Set(lineStats(P, k).skipped.map(s => s.p.id)));
  rows.forEach((k, ri) => { const y = top + ri*rh;
    c.fillStyle = "rgba(255,255,255,.05)"; c.fillRect(0, y + 4, W, 2);
    L.pts.forEach(({s, x}) => { if (k !== "all" && !(s.p.tags||[]).includes(k)) return; const cl = stepCls(P, s, sk[k]); if (cl === "off") return;
      c.fillStyle = cl === "ok" ? LCOL[k] : cl === "wip" ? "rgba(56,225,255,.7)" : cl === "skip" ? "#FF5C7A" : "rgba(140,160,182,.35)";
      c.fillRect(Math.round(x*sx), y + (cl === "ok" ? 1 : 3), Math.max(1.5, L.S*sx*.8), cl === "ok" ? 8 : 4); }); });
  if (F.page === "linea" && F.tcam){ const {w} = tlSize(), vx = (-F.tcam.x/F.tcam.s)*sx, vw = (w/F.tcam.s)*sx;
    c.strokeStyle = "#38E1FF"; c.lineWidth = 1.5; c.fillStyle = "rgba(56,225,255,.08)"; c.fillRect(vx, 1, vw, 90); c.strokeRect(vx + .75, 1, Math.max(4, vw - 1.5), 90); }
}
/* ventana flotante */
function floatDetailHTML(P){
  const go = x => `<button class="go" data-fgo="${x.p.id}"><code>${esc(x.m.corto)} ${esc(x.p.id.split("-")[1])}</code>${esc(x.p.t)}</button>`;
  return LINES.map(l => { const s = lineStats(P, l.k);
    return `<div><h5 style="color:${l.c}">${l.n} · ${pc(s.pct)}</h5>${s.skipped.length ? `<span class="lab" style="color:var(--warn)">Saltados (${s.skipped.length})</span>${s.skipped.slice(0, 6).map(go).join("")}` : `<span class="lab" style="color:var(--done)">Sin pasos saltados</span>`}${s.next.length ? `<span class="lab" style="color:var(--acc)">Sigue</span>${s.next.slice(0,3).map(go).join("")}` : ""}</div>`; }).join("");
}
function floatRowsHTML(P){ const L = allLines(P); return LINES.map(l => { const s = L[l.k];
  return `<div class="fr"><span class="n">${l.n}${s.behind ? "<em>REZ.</em>" : ""}</span><i><u style="width:${pc(s.pct)};background:${l.c};color:${l.c}"></u></i><span class="v">${pc(s.pct)}</span></div>`; }).join(""); }
function floatHTML(P){
  return `<div class="flt ${F.fopen ? "open" : ""}" id="fl-float" role="group" aria-label="Avance del proyecto. Arrástralo a cualquier lugar; tócalo para ver el detalle.">
    <div class="grip2"><span>⠿ Avance del proyecto</span><b>●</b></div><div class="frows">${floatRowsHTML(P)}</div>
    ${F.fopen ? `<div class="fx"><div class="ml"><span>Mapa del flujo · toca para ir</span><span>verde hecho · rojo saltado</span></div><canvas id="fl-mini" aria-label="Mapa del flujo completo"></canvas>${floatDetailHTML(P)}</div>` : ""}</div>`;
}
function placeFloat(){
  const el = $("#fl-float"), ov = host.querySelector(".ov"); if (!el || !ov) return;
  const W = ov.clientWidth, H = ov.clientHeight, ew = el.offsetWidth, eh = el.offsetHeight;
  let p = F.fpos || {fx: 1, fy: 1};
  const x = Math.max(8, Math.min(W - ew - 8, p.fx*(W - ew))), y = Math.max(70, Math.min(H - eh - 8, p.fy*(H - eh)));
  el.style.left = x + "px"; el.style.top = y + "px";
}
function pageLinea(P){
  return `<div class="tlw" id="tlw"><div id="tlworld"><svg id="tlsvg" role="img" aria-label="Línea de flujo del proyecto"></svg></div></div>
    <div class="tlhud"><span class="lvl" id="tllvl"></span><span class="hint3">Arrastra para moverte · rueda o pellizco para zoom</span></div>
    <div class="tlzoom"><button data-tlz="in" aria-label="Acercar">+</button><button data-tlz="out" aria-label="Alejar">−</button><button class="tx" data-tlz="start" aria-label="Ir al inicio">INICIO</button><button class="tx" data-tlz="fit" aria-label="Ver todo">TODO</button></div>
    <div class="tltip" id="tltip" hidden></div>`;
}
function initTimeline(P){
  F.tlvl = null;
  if (!F.tcam) F.tcam = camStart();
  F.tlvl = lvlOf(F.tcam.s); drawTimeline(P); applyTCam();
}
/* eventos: pizarra y ventana flotante */
const tptr = new Map(); let tpan = null, tpinch = null, fdrag = null, mDrag = false;
host.addEventListener("pointerdown", e => {
  F._tlMoved = false;
  const fl = e.target.closest("#fl-float");
  if (fl){
    if (e.target.closest("#fl-mini")){ mDrag = true; try { e.target.setPointerCapture(e.pointerId); } catch(_){} miniGo(e); return; }
    if (e.target.closest(".fx")) return;
    const r = fl.getBoundingClientRect(); fdrag = {dx: e.clientX - r.left, dy: e.clientY - r.top, x0: e.clientX, y0: e.clientY, moved: false, id: e.pointerId};
    try { fl.setPointerCapture(e.pointerId); } catch(_){} return;
  }
  const w = e.target.closest("#tlw"); if (!w) return;
  cancelAnimationFrame(tanim); tptr.set(e.pointerId, {x:e.clientX, y:e.clientY});
  if (tptr.size === 1){ tpan = {x:e.clientX, y:e.clientY, moved:0}; }
  if (tptr.size === 2){ const [a,b] = [...tptr.values()]; tpinch = {d: Math.hypot(a.x-b.x, a.y-b.y), s: F.tcam.s}; }
});
function miniGo(e){ const cv = $("#fl-mini"), r = cv.getBoundingClientRect(), L = F._tl || tlLayout(P0()), wx = Math.max(0, Math.min(1, (e.clientX - r.left)/r.width))*L.W;
  if (F.page !== "linea"){ F.page = "linea"; renderWS(); requestAnimationFrame(() => tlCenterOn(wx)); return; } tlCenterOn(wx); }
window.addEventListener("pointermove", e => {
  if (fdrag && e.pointerId === fdrag.id){ const el = $("#fl-float"), ov = host.querySelector(".ov"); if (!el || !ov) return;
    if (!fdrag.moved && Math.hypot(e.clientX - fdrag.x0, e.clientY - fdrag.y0) < 5) return; fdrag.moved = true; el.classList.add("dragging");
    const r = ov.getBoundingClientRect(), W = ov.clientWidth - el.offsetWidth, H = ov.clientHeight - el.offsetHeight;
    const x = Math.max(8, Math.min(W - 8, e.clientX - r.left - fdrag.dx)), y = Math.max(8, Math.min(H - 8, e.clientY - r.top - fdrag.dy));
    el.style.left = x + "px"; el.style.top = y + "px"; F.fpos = {fx: W > 0 ? x/W : 0, fy: H > 0 ? y/H : 0}; return; }
  if (mDrag){ miniGo(e); return; }
  if (tptr.has(e.pointerId)){
    const prev = tptr.get(e.pointerId); tptr.set(e.pointerId, {x:e.clientX, y:e.clientY});
    const w = $("#tlw"); if (!w) return;
    if (tptr.size === 1 && tpan){ const dx = e.clientX - prev.x, dy = e.clientY - prev.y; tpan.moved += Math.abs(dx) + Math.abs(dy);
      if (tpan.moved > 4){ w.classList.add("drag"); F._tlMoved = true; } F.tcam = {...F.tcam, x: F.tcam.x + dx, y: F.tcam.y + dy}; applyTCam(); }
    else if (tptr.size === 2 && tpinch){ const [a,b] = [...tptr.values()], d = Math.hypot(a.x-b.x, a.y-b.y), r = w.getBoundingClientRect(); F._tlMoved = true;
      tzoomAt((tpinch.s*d/tpinch.d)/F.tcam.s, (a.x+b.x)/2 - r.left, (a.y+b.y)/2 - r.top); }
    return;
  }
  const sd = e.target.closest && e.target.closest("#tlw .sd"), tip = $("#tltip");
  if (tip){ if (sd && e.pointerType === "mouse"){ const s = SBY[sd.dataset.sid], P = P0(); if (!s || !P) return; const cls = stepCls(P, s, new Set(lineStats(P, "all").skipped.map(x => x.p.id)));
      tip.innerHTML = `<small>${esc(s.m.n)} · ${esc(s.f.n)}</small>${esc(s.p.t)}<em>${cls === "ok" ? "Hecho" : cls === "wip" ? "En curso" : cls === "skip" ? "Saltado: está antes del último paso que marcaste" : cls === "off" ? "No aplica a este proyecto" : "Pendiente"} · ${(s.p.tags||[]).map(t => TAGN[t]).join(", ")}</em>`;
      const b = host.querySelector(".fbody").getBoundingClientRect(); tip.hidden = false;
      let lx = e.clientX - b.left + 14, ly = e.clientY - b.top + 14; if (lx + 330 > b.width) lx = e.clientX - b.left - 334; if (ly + 110 > b.height) ly = e.clientY - b.top - 110; tip.style.left = lx + "px"; tip.style.top = ly + "px"; }
    else tip.hidden = true; }
});
const tEnd = e => {
  if (fdrag && e.pointerId === fdrag.id){ const el = $("#fl-float"); if (el) el.classList.remove("dragging");
    if (!fdrag.moved){ F.fopen = !F.fopen; const P = P0(); if (el && P){ el.outerHTML = floatHTML(P); placeFloat(); drawMini(P); } } else uiSave(); fdrag = null; return; }
  mDrag = false;
  tptr.delete(e.pointerId); if (tptr.size < 2) tpinch = null;
  if (tptr.size === 1){ const [a] = [...tptr.values()]; tpan = {x:a.x, y:a.y, moved: 99}; }
  if (!tptr.size){ tpan = null; const w = $("#tlw"); if (w) w.classList.remove("drag"); }
};
window.addEventListener("pointerup", tEnd); window.addEventListener("pointercancel", tEnd);
host.addEventListener("wheel", e => { const w = e.target.closest && e.target.closest("#tlw"); if (!w) return; e.preventDefault(); cancelAnimationFrame(tanim);
  const r = w.getBoundingClientRect(), dy = e.deltaMode === 1 ? e.deltaY*16 : e.deltaY;
  if (e.shiftKey){ F.tcam = {...F.tcam, x: F.tcam.x - dy}; applyTCam(); return; }
  tzoomAt(Math.exp(-dy*(e.ctrlKey ? .01 : .0018)), e.clientX - r.left, e.clientY - r.top); }, {passive:false});
window.addEventListener("resize", () => { if (!host.innerHTML) return; placeFloat(); if (F.page === "linea") applyTCam(); else drawMini(P0()); });

/* ---------- eventos ---------- */
function setPath(obj, path, val){ const k = path.split("."); let o = obj; for (let i = 0; i < k.length-1; i++){ o[k[i]] = o[k[i]] || {}; o = o[k[i]]; } o[k[k.length-1]] = val; }
async function dl(filename, data){ if (!downloads) return; try { await downloads.save({filename, data}); } catch(e){ if (e && e.code !== "declined") toast("No se pudo descargar el archivo."); } }
function goStep(id){
  const s = SBY[id]; if (!s) return; F.page = "m:" + s.m.id; F.mtab[s.m.id] = "pasos"; F.open.add(id); renderWS();
  const el = document.getElementById("st-" + id); if (el){ el.scrollIntoView({block:"center", behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth"}); el.classList.add("flash"); setTimeout(() => el.classList.remove("flash"), 1600); }
}
function closePop(){ host.querySelectorAll(".pop").forEach(p => p.remove()); host.querySelectorAll(".dl").forEach(b => b.setAttribute("aria-expanded","false")); }
function openPop(btn, sticky){
  const P = P0(); if (!P) return; closePop();
  const dock = btn.closest(".dock"), pop = document.createElement("div"); pop.className = "pop"; pop.innerHTML = popHTML(P, btn.dataset.dline); if (sticky) pop.dataset.sticky = "1";
  dock.appendChild(pop); btn.setAttribute("aria-expanded","true");
  const r = btn.getBoundingClientRect(), dr = dock.getBoundingClientRect(); let left = r.left - dr.left; left = Math.max(8, Math.min(left, dr.width - pop.offsetWidth - 8)); pop.style.left = left + "px";
}
host.addEventListener("pointerover", e => { const b = e.target.closest(".dl"); if (b && e.pointerType === "mouse" && !host.querySelector(".pop[data-sticky]")) openPop(b); });
host.addEventListener("pointerout", e => { if (e.pointerType !== "mouse") return; const to = e.relatedTarget; if (to && (to.closest && (to.closest(".dl") || to.closest(".pop")))) return; if (e.target.closest && (e.target.closest(".dl") || e.target.closest(".pop")) && !host.querySelector(".pop[data-sticky]")) closePop(); });

host.addEventListener("click", async e => {
  const t = e.target, P = P0();
  if (!t.closest(".pop") && !t.closest(".dl")) closePop();
  const c = sel => t.closest(sel);
  let b;
  if (c("[data-fclose]")) return closeWS();
  if ((b = c("[data-fpage]"))){ F.page = b.dataset.fpage; closePop(); renderWS(); const fb = host.querySelector(".fbody"); if (fb) fb.scrollTop = 0; return; }
  if ((b = c(".dl"))){ const was = b.getAttribute("aria-expanded") === "true" && host.querySelector(".pop[data-sticky]"); if (was) return closePop(); return openPop(b, true); }
  if ((b = c("[data-fgo]"))){ closePop(); return goStep(b.dataset.fgo); }
  if ((b = c("[data-tlz]"))){ const v = b.dataset.tlz, {w, h} = tlSize(); if (v === "fit") tfly(camFit(), 600); else if (v === "start") tfly(camStart(), 600); else { const f = v === "in" ? 1.5 : 1/1.5, c0 = F.tcam, sN = Math.max(.08, Math.min(4, c0.s*f)); tfly({s:sN, x:w/2 - (w/2 - c0.x)*sN/c0.s, y:h/2 - (h/2 - c0.y)*sN/c0.s}, 300); } return; }
  if ((b = c("#tlw .sd"))){ if (F._tlMoved){ F._tlMoved = false; return; } return goStep(b.dataset.sid); }
  if ((b = c("#tlw [data-tlpage]"))){ if (F._tlMoved){ F._tlMoved = false; return; } F.page = b.dataset.tlpage; renderWS(); return; }
  if ((b = c("[data-fzoom]"))){ const d = document.createElement("div"); d.className = "lb"; d.style.zIndex = 95; d.innerHTML = `<img src="${esc(blobUrl(b.dataset.fzoom))}" alt=""><div class="corner"><button class="btn" data-lbx>Cerrar</button></div>`; d.addEventListener("click", ev => { if (ev.target === d || ev.target.closest("[data-lbx]")) d.remove(); }); document.body.appendChild(d); return; }
  if (c("[data-fexpand]")){ host.querySelectorAll(".tree details").forEach(d => d.open = true); return; }
  if (c("[data-fzip]")){ const P2 = P0(); const ents = zipEntries(CARP, P2, "", []); ents.push({name: folderName(CARP[0], P2) + "/LEEME.txt", data: "Estructura de carpetas generada desde el Atlas.\nFormato: <Código>. <Abrev> _<Iniciales>.<ProyCorto>_<dd.mm.aa>\n\n" + treeTxt(CARP, P2, "")}); return dl(((P2 && P2.codigo) || "PROY") + "_carpetas.zip", makeZip(ents)); }
  if (c("[data-ftreetxt]")){ const P2 = P0(); return dl(((P2 && P2.codigo) || "PROY") + "_arbol-carpetas.txt", treeTxt(CARP, P2, "")); }
  if (!P) return;
  if (c("[data-fexport]")) return dl((P.nombre || "proyecto").replace(/[\\/:*?"<>|]/g, "") + " - flujo.md", report(P));
  if ((b = c("[data-fst]"))){ const [id, v] = b.dataset.fst.split(":"); P.st[id] = P.st[id] === v ? "" : v; if (!P.st[id]) delete P.st[id]; save(); const s = SBY[id]; const el = document.getElementById("st-" + id); if (el) el.outerHTML = stepHTML(P, s); softRefresh(); return; }
  if ((b = c("[data-ftog]"))){ const id = b.dataset.ftog; F.open.has(id) ? F.open.delete(id) : F.open.add(id); const el = document.getElementById("st-" + id); if (el) el.outerHTML = stepHTML(P, SBY[id]); return; }
  if ((b = c("[data-fforce]"))){ P.st[b.dataset.fforce] = "on"; save(); renderWS(); return; }
  if ((b = c("[data-fmat]"))){ const [mid, v] = b.dataset.fmat.split(":"); if (v === "no") P.mat[mid] = "no"; else delete P.mat[mid]; save(); renderWS(); return; }
  if ((b = c("[data-fmtab]"))){ const [mid, v] = b.dataset.fmtab.split(":"); F.mtab[mid] = v; renderWS(); return; }
  if ((b = c("[data-fai]"))) return aiApply(b.dataset.fai);
  if ((b = c("[data-flkadd]"))){ const id = b.dataset.flkadd, u = (document.getElementById("lku-" + id).value || "").trim(), tt = (document.getElementById("lkt-" + id).value || "").trim(); if (!/^https?:\/\//i.test(u)){ toast("Pega un enlace que empiece con http:// o https://"); return; } (P.lk[id] = P.lk[id] || []).push({t: tt, u}); save(); document.getElementById("st-" + id).outerHTML = stepHTML(P, SBY[id]); return; }
  if ((b = c("[data-flkrm]"))){ const [id, i] = b.dataset.flkrm.split(":"); P.lk[id].splice(+i, 1); save(); document.getElementById("st-" + id).outerHTML = stepHTML(P, SBY[id]); return; }
  if ((b = c("[data-fimadd]"))){ const id = b.dataset.fimadd; const files = await A.pickFiles("image/*,application/pdf", true); if (!files.length) return; toast("Subiendo " + files.length + " archivo(s)…"); const up = await A.uploadFiles(files); const Pn = P0(); if (!Pn) return; Pn.im[id] = [...(Pn.im[id]||[]), ...up.map(u => ({id: u.id}))]; save(); const el = document.getElementById("st-" + id); if (el) el.outerHTML = stepHTML(Pn, SBY[id]); softRefresh(); return; }
  if ((b = c("[data-fimrm]"))){ const [id, i] = b.dataset.fimrm.split(":"); P.im[id].splice(+i, 1); save(); document.getElementById("st-" + id).outerHTML = stepHTML(P, SBY[id]); return; }
  if ((b = c("[data-fbimadd]"))){ const k = b.dataset.fbimadd; const files = await A.pickFiles("image/*", true); if (!files.length) return; toast("Subiendo " + files.length + " imagen(es)…"); const up = await A.uploadFiles(files); const Pn = P0(); if (!Pn) return; Pn.bor[k] = [...(Pn.bor[k]||[]), ...up.map(u => ({id: u.id}))]; save(); renderWS(); return; }
  if ((b = c("[data-fbimrm]"))){ const [k, i] = b.dataset.fbimrm.split(":"); P.bor[k].splice(+i, 1); save(); renderWS(); return; }
  if (c("[data-fpradd]")){ P.bor.programa.filas.push({zona:"", espacio:"", cant:1, m2:""}); save(); renderWS(); return; }
  if ((b = c("[data-fpb]"))){ const o = BYID[P.tipo], r = (A.PROG[o ? o.cat.c : ""] || [])[+b.dataset.fpb]; if (r){ P.bor.programa.filas.push({zona:r[0], espacio:r[1], cant:1, m2:r[2]}); save(); renderWS(); } return; }
  if ((b = c("[data-fprrm]"))){ const i = +b.dataset.fprrm; P.bor.programa.filas.splice(i, 1); const nr = {}; for (const k in P.bor.rel){ let [x, y] = k.split("|").map(Number); if (x === i || y === i) continue; if (x > i) x--; if (y > i) y--; nr[x + "|" + y] = P.bor.rel[k]; } P.bor.rel = nr; save(); renderWS(); return; }
  if (c("[data-fprcsv]")){ const rows = [["Zona","Espacio","Cantidad","m2 c/u","Subtotal m2"], ...P.bor.programa.filas.map(r => [r.zona, r.espacio, r.cant, r.m2, ((+r.cant||0)*(+r.m2||0)).toFixed(2)])]; return dl((P.nombre || "programa") + " - programa.csv", "\ufeff" + rows.map(r => r.map(v => `"${String(v ?? "").replace(/"/g,'""')}"`).join(";")).join("\r\n")); }
  if ((b = c("[data-frel]"))){ const k = b.dataset.frel, v = ((P.bor.rel[k] || 0) + 1) % 4; if (v) P.bor.rel[k] = v; else delete P.bor.rel[k]; b.className = "r" + v; b.textContent = v || ""; save(); drawBubbles(P); return; }
  if (c("[data-fpeadd]")){ P.bor.peticiones.push({t:"", p:"2"}); save(); renderWS(); return; }
  if ((b = c("[data-fperm]"))){ P.bor.peticiones.splice(+b.dataset.fperm, 1); save(); renderWS(); return; }
  if (c("[data-fcoadd]")){ P.bor.correcciones.push({t:"", f:new Date().toISOString().slice(0,10), ok:false}); save(); renderWS(); return; }
  if ((b = c("[data-fcorm]"))){ P.bor.correcciones.splice(+b.dataset.fcorm, 1); save(); renderWS(); return; }
  if (c("[data-fejadd]")){ const u = $("#ej-u").value.trim(), tt = $("#ej-t").value.trim(); if (!u && !tt){ toast("Escribe un título o pega un enlace."); return; } if (u && !/^https?:\/\//i.test(u)){ toast("El enlace debe empezar con http:// o https://"); return; } P.ej.unshift({t: tt, u, c: $("#ej-c").value}); save(); renderWS(); return; }
  if (c("[data-fejimg]")){ const files = await A.pickFiles("image/*", true); if (!files.length) return; toast("Subiendo " + files.length + " imagen(es)…"); const up = await A.uploadFiles(files); const Pn = P0(); if (!Pn) return; const cat = ($("#ej-c") || {}).value || "Otro", tt = ($("#ej-t") || {}).value || ""; up.forEach(u => Pn.ej.unshift({t: tt, u: "", c: cat, img: u.id})); save(); renderWS(); return; }
  if ((b = c("[data-fejrm]"))){ P.ej.splice(+b.dataset.fejrm, 1); save(); renderWS(); return; }
  if (c("[data-fsesimp]")){ const sid = $("#fl-sesimp").value; if (!sid){ toast("Elige una sesión."); return; } importSession(P, sid); save(); renderWS(); toast("Programa y peticiones agregados al borrador."); return; }
  if (c("[data-farchive]")){ P.estado = P.estado === "archivado" ? "activo" : "archivado"; save(); renderWS(); toast(P.estado === "archivado" ? "Proyecto archivado." : "Proyecto reactivado."); return; }
  if ((b = c("[data-fdel]"))){ if (b.dataset.sure !== "1"){ b.dataset.sure = "1"; b.textContent = "Toca otra vez para eliminar definitivamente"; setTimeout(() => { if (b.isConnected){ b.dataset.sure = ""; b.textContent = "Eliminar proyecto"; } }, 4000); return; }
    const id = P.id; clearTimeout(saveT); F.pending = null; F.list = F.list.filter(x => x.id !== id); host.innerHTML = ""; F.cur = null; try { if (db) await db.doc("flujos/" + id).delete(); } catch(err){ toast("No se pudo eliminar en la base de datos."); } renderHome(); toast("Proyecto eliminado."); return; }
});
host.addEventListener("input", e => {
  const t = e.target, P = P0();
  if (t.id === "fl-codq"){ F.codq = t.value; const pos = t.selectionStart; renderWS(); const n = $("#fl-codq"); if (n){ n.focus(); n.setSelectionRange(pos, pos); } return; }
  if (!P) return;
  if (t.dataset.fp){ let v = t.value; if (t.dataset.fp === "codigo" || t.dataset.fp === "ini") v = v.toUpperCase(); setPath(P, t.dataset.fp, v); if (t.dataset.fp === "tipo"){ const s = suggestFlags(v); P.flags = {...s}; save(); renderWS(); return; } save(); if (t.dataset.fp === "nombre"){ const b = host.querySelector(".ovh .ttl b"); if (b) b.textContent = v || "Proyecto sin nombre"; } return; }
  if (t.id === "fl-coordin"){ const c = parseCoords(t.value); if (c){ P.loc.lat = c.lat.toFixed(6); P.loc.lon = c.lon.toFixed(6); save(); renderWS(); toast("Coordenadas actualizadas."); } return; }
  if (t.dataset.fnote){ const id = t.dataset.fnote; if (t.value) P.nt[id] = t.value; else delete P.nt[id]; save(); return; }
  if (t.dataset.fap){ P.ap[t.dataset.fap] = t.value; save(); return; }
  if (t.dataset.fpr){ const [i, k] = t.dataset.fpr.split(":"); P.bor.programa.filas[+i][k] = t.value; save(); return; }
  if (t.hasAttribute("data-fpcirc")){ P.bor.programa.circ = t.value; save(); return; }
  if (t.dataset.fpe){ const [i, k] = t.dataset.fpe.split(":"); P.bor.peticiones[+i][k] = t.value; save(); return; }
  if (t.hasAttribute("data-fbid")){ P.bor.ideas = t.value; save(); return; }
  if (t.dataset.fco){ const [i, k] = t.dataset.fco.split(":"); P.bor.correcciones[+i][k] = k === "ok" ? t.checked : t.value; save(); if (k === "ok") renderWS(); return; }
});
host.addEventListener("change", e => {
  const t = e.target, P = P0(); if (!P) return;
  if (t.dataset.fflag){ const k = t.dataset.fflag; if (t.checked) P.flags[k] = 1; else delete P.flags[k]; t.closest(".ck").classList.toggle("on", t.checked); save(); softRefresh(); return; }
  if (t.dataset.fpr || t.hasAttribute("data-fpcirc")) renderWS();
});
document.addEventListener("keydown", e => {
  if (!host.innerHTML || e.key !== "Escape") return;
  if (document.querySelector(".lb") || document.querySelector(".modal")) return;
  if (host.querySelector(".pop")){ closePop(); e.stopImmediatePropagation(); return; }
  e.stopImmediatePropagation(); closeWS();
}, true);

$("#flujo") && $("#flujo").addEventListener("click", e => {
  const b = e.target.closest("[data-fopen]"); if (b) return openWS(b.dataset.fopen, "linea");
  if (e.target.closest("[data-fnew]")) return newModal();
  if (e.target.closest("[data-farch]")){ F.showArch = !F.showArch; return renderHome(); }
  const l = e.target.closest("[data-flib]"); if (l) return openLib(l.dataset.flib);
});

/* ---------- datos ---------- */
function subscribe(){
  if (!db) return; if (unsub) unsub();
  unsub = db.collection("flujos").onSnapshot(sn => {
    const inc = sn.docs.map(d => fix({id: d.id, ...d.data()}));
    const editing = F.cur && (F.pending === F.cur || host.contains(document.activeElement) && document.activeElement.matches("input,textarea,select"));
    F.list = inc.map(x => (x.id === F.cur && (editing || F.aiBusy)) ? (F.list.find(y => y.id === x.id) || x) : x);
    F.list.forEach(x => { if (!inc.find(y => y.id === x.id) && x.id === F.pending) inc.push(x); });
    renderHome();
    if (F.cur && !editing && !F.aiBusy && !host.querySelector(".pop")) renderWS();
    else if (F.cur) softRefresh();
  }, () => {});
}
window.FLUJO_UI = {render: renderHome, open: openWS, lib: openLib};
renderHome();
(async () => {
  if (!window.claude || !window.claude.use) return;
  try { db = await window.claude.use("db"); } catch(e){}
  try { downloads = await window.claude.use("downloads"); } catch(e){}
  try { sample = await window.claude.use("sample"); } catch(e){}
  subscribe(); renderHome(); if (F.cur || F.lib) renderWS();
})();
})();
