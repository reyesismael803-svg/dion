/* DION · salas2.js — Materiales y procesos · Ingeniería de costos · Tecnología arquitectónica
   Módulos: DION_MOD.materiales, DION_MOD.costos, DION_MOD.tecnologia
   Todos los valores económicos y ambientales son REFERENCIALES (Ecuador 2025–2026) y deben verificarse. */
(function(){
"use strict";
window.DION_MOD = window.DION_MOD || {};
var DM = window.DION_MOD;

/* ───────────────────────── utilidades compartidas ───────────────────────── */
function fmt(n,d){ d=d||0; if(n==null||isNaN(n)) return "—"; return Number(n).toLocaleString("es-EC",{minimumFractionDigits:d,maximumFractionDigits:d}); }
function money(n,d){ return "$"+fmt(n,d||0); }
function hash(s){ var h=2166136261; s=String(s); for(var i=0;i<s.length;i++){ h^=s.charCodeAt(i); h=Math.imul(h,16777619);} return h>>>0; }
function rng(seed){ var a=seed>>>0||1; return function(){ a|=0; a=a+0x6D2B79F5|0; var t=Math.imul(a^a>>>15,1|a); t=t+Math.imul(t^t>>>7,61|t)^t; return ((t^t>>>14)>>>0)/4294967296; }; }
function debounce(fn,ms){ var t; return function(){ var a=arguments; clearTimeout(t); t=setTimeout(function(){ fn.apply(null,a); },ms); }; }
function css(id,txt){ if(document.getElementById(id)) return; var s=document.createElement("style"); s.id=id; s.textContent=txt; document.head.appendChild(s); }
function clamp(v,a,b){ return Math.max(a,Math.min(b,v)); }
function E(s){ return String(s==null?"":s).replace(/[&<>"']/g,function(c){ return {"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]; }); }
function num(v,def){ var n=parseFloat(String(v).replace(",",".")); return isNaN(n)?def:n; }

/* CSS base HUD reutilizable con prefijo propio de cada módulo (m-<clave>) */
function baseCSS(P){
  var C="linear-gradient(var(--c),var(--c))";
  return "."+P+"{container-type:inline-size;position:relative;height:100%;min-height:420px;display:flex;flex-direction:column;overflow:hidden;color:var(--ink);font-family:var(--f-b);font-size:14px;line-height:1.4;"+
  "background:radial-gradient(ellipse at 15% -10%,rgba(var(--acc-rgb),.10),transparent 55%),radial-gradient(ellipse at 100% 110%,rgba(var(--done-rgb),.05),transparent 50%),"+
  "linear-gradient(rgba(var(--acc-rgb),.035) 1px,transparent 1px) 0 0/100% 28px,linear-gradient(90deg,rgba(var(--acc-rgb),.035) 1px,transparent 1px) 0 0/28px 100%,var(--bg)}"+
  "."+P+" *{box-sizing:border-box}"+
  "."+P+" button{font:inherit;color:inherit}"+
  "."+P+"-top{flex:none;display:flex;align-items:center;gap:6px;padding:8px 10px;border-bottom:1px solid var(--line2);background:linear-gradient(180deg,rgba(var(--acc-rgb),.07),rgba(3,8,14,.75));overflow-x:auto;scrollbar-width:none}"+
  "."+P+"-top::-webkit-scrollbar{display:none}"+
  "."+P+"-tab{flex:none;min-height:40px;padding:0 14px;border:1px solid var(--line);background:rgba(3,8,14,.4);color:var(--muted);font-family:var(--f-d);font-size:9.5px;letter-spacing:.16em;text-transform:uppercase;cursor:pointer;white-space:nowrap;clip-path:polygon(9px 0,100% 0,100% calc(100% - 9px),calc(100% - 9px) 100%,0 100%,0 9px);transition:.2s}"+
  "."+P+"-tab:hover{color:var(--ink);border-color:var(--line2)}"+
  "."+P+"-tab[aria-selected=true]{color:var(--acc);border-color:var(--acc);background:rgba(var(--acc-rgb),.12);box-shadow:inset 0 0 14px rgba(var(--acc-rgb),.25);text-shadow:0 0 8px rgba(var(--acc-rgb),.6)}"+
  "."+P+"-next{flex:none;margin-left:auto;min-height:40px;padding:0 16px;border:1px solid var(--done);background:rgba(var(--done-rgb),.08);color:var(--done);font-family:var(--f-d);font-size:9.5px;letter-spacing:.16em;text-transform:uppercase;cursor:pointer;white-space:nowrap;box-shadow:0 0 14px rgba(var(--done-rgb),.18)}"+
  "."+P+"-next:hover{background:rgba(var(--done-rgb),.18)}"+
  "."+P+"-main{flex:1;min-height:0;overflow:auto;padding:12px;scrollbar-width:thin;scrollbar-color:rgba(var(--acc-rgb),.35) transparent}"+
  "."+P+"-card{--c:rgba(var(--acc-rgb),.85);position:relative;background:"+C+" 0 0/12px 1px no-repeat,"+C+" 0 0/1px 12px no-repeat,"+C+" 100% 0/12px 1px no-repeat,"+C+" 100% 0/1px 12px no-repeat,"+C+" 0 100%/12px 1px no-repeat,"+C+" 0 100%/1px 12px no-repeat,"+C+" 100% 100%/12px 1px no-repeat,"+C+" 100% 100%/1px 12px no-repeat,var(--glass);border:1px solid var(--line);padding:12px}"+
  "."+P+"-h{font-family:var(--f-d);font-size:10.5px;letter-spacing:.18em;text-transform:uppercase;color:var(--acc);margin:0 0 8px;text-shadow:0 0 10px rgba(var(--acc-rgb),.45)}"+
  "."+P+"-h2{font-family:var(--f-d);font-size:13px;letter-spacing:.12em;text-transform:uppercase;color:var(--ink);margin:0 0 6px}"+
  "."+P+"-mono{font-family:var(--f-m)}"+
  "."+P+"-mut{color:var(--muted)}"+
  "."+P+"-fnt{color:var(--faint);font-size:12px}"+
  "."+P+"-btn{min-height:40px;padding:0 14px;border:1px solid var(--line2);background:rgba(var(--acc-rgb),.06);color:var(--ink);cursor:pointer;font-family:var(--f-d);font-size:9.5px;letter-spacing:.13em;text-transform:uppercase;transition:.15s;display:inline-flex;align-items:center;justify-content:center;gap:8px}"+
  "."+P+"-btn:hover{border-color:var(--acc);color:var(--acc);box-shadow:0 0 12px rgba(var(--acc-rgb),.2)}"+
  "."+P+"-btn.on{border-color:var(--acc);color:var(--bg);background:var(--acc);box-shadow:0 0 16px rgba(var(--acc-rgb),.5)}"+
  "."+P+"-btn.ok{border-color:var(--done);color:var(--done)}"+
  "."+P+"-btn[disabled]{opacity:.4;pointer-events:none}"+
  "."+P+"-chips{display:flex;gap:6px;overflow-x:auto;padding:2px 0 6px;scrollbar-width:thin}"+
  "."+P+"-chip{flex:none;min-height:40px;padding:0 13px;border-radius:20px;border:1px solid var(--line);background:rgba(3,8,14,.5);color:var(--muted);cursor:pointer;font-size:12.5px;white-space:nowrap;display:inline-flex;align-items:center;gap:6px;transition:.15s}"+
  "."+P+"-chip:hover{color:var(--ink);border-color:var(--line2)}"+
  "."+P+"-chip.on{border-color:var(--acc);color:var(--acc);background:rgba(var(--acc-rgb),.12);box-shadow:0 0 10px rgba(var(--acc-rgb),.2)}"+
  "."+P+"-in{min-height:40px;width:100%;padding:0 10px;background:rgba(0,0,0,.35);border:1px solid var(--line2);color:var(--ink);font-family:var(--f-m);font-size:13px;outline:none}"+
  "."+P+"-in:focus{border-color:var(--acc);box-shadow:0 0 0 1px rgba(var(--acc-rgb),.4)}"+
  "."+P+"-rng{width:100%;height:40px;accent-color:var(--acc);background:transparent;cursor:pointer}"+
  "."+P+"-pv{display:inline-flex;align-items:center;gap:6px;border:1px solid var(--warn);color:var(--warn);font-family:var(--f-m);font-size:10px;letter-spacing:.1em;padding:2px 7px;background:rgba(255,92,122,.08);text-transform:uppercase}"+
  "."+P+"-okt{display:inline-flex;align-items:center;gap:6px;border:1px solid var(--done);color:var(--done);font-family:var(--f-m);font-size:10px;letter-spacing:.1em;padding:2px 7px;text-transform:uppercase}"+
  "."+P+"-pre{display:inline-flex;align-items:center;gap:6px;border:1px solid rgba(var(--acc-rgb),.6);color:var(--acc);font-family:var(--f-m);font-size:10px;letter-spacing:.12em;padding:2px 7px;text-transform:uppercase;background:rgba(var(--acc-rgb),.06)}"+
  "."+P+"-warnbox{border:1px solid var(--warn)!important;box-shadow:0 0 0 1px rgba(255,92,122,.15),inset 0 0 18px rgba(255,92,122,.06)}"+
  "."+P+"-kpis{display:grid;grid-template-columns:repeat(auto-fit,minmax(150px,1fr));gap:8px}"+
  "."+P+"-kpi{border:1px solid var(--line);background:rgba(3,8,14,.55);padding:10px 12px;position:relative;overflow:hidden}"+
  "."+P+"-kpi::after{content:'';position:absolute;left:0;top:0;width:3px;height:100%;background:var(--acc);box-shadow:0 0 10px var(--acc)}"+
  "."+P+"-kpi b{display:block;font-family:var(--f-m);font-size:19px;color:var(--ink);font-weight:600;margin-top:2px;letter-spacing:-.01em}"+
  "."+P+"-kpi span{font-family:var(--f-d);font-size:8.5px;letter-spacing:.16em;color:var(--muted);text-transform:uppercase}"+
  "."+P+"-kpi i{font-style:normal;font-size:11px;color:var(--faint);display:block}"+
  "."+P+"-bar{height:6px;background:rgba(var(--acc-rgb),.1);position:relative;overflow:hidden}"+
  "."+P+"-bar>i{position:absolute;left:0;top:0;bottom:0;background:linear-gradient(90deg,rgba(var(--acc-rgb),.5),var(--acc));box-shadow:0 0 8px var(--acc)}"+
  "."+P+"-row{display:flex;gap:8px;align-items:center;flex-wrap:wrap}"+
  "."+P+"-sp{flex:1}"+
  "."+P+"-scan{pointer-events:none;position:absolute;inset:0;background:linear-gradient(180deg,transparent 0,rgba(var(--acc-rgb),.07) 50%,transparent 100%);background-size:100% 220px;animation:"+P+"-scan 6s linear infinite;mix-blend-mode:screen}"+
  "@keyframes "+P+"-scan{0%{background-position:0 -220px}100%{background-position:0 calc(100% + 220px)}}"+
  "@keyframes "+P+"-pulse{0%,100%{opacity:.35}50%{opacity:1}}"+
  "@media (prefers-reduced-motion:reduce){."+P+"-scan{animation:none}}";
}
function topBar(P,tabs,cur){
  var s='<div class="'+P+'-top" role="tablist">';
  tabs.forEach(function(t){ s+='<button class="'+P+'-tab" role="tab" data-act="tab" data-v="'+t[0]+'" aria-selected="'+(t[0]===cur)+'">'+t[1]+'</button>'; });
  return s+'<button class="'+P+'-next" data-act="next" title="Ir a la siguiente estación del recorrido">Siguiente estación →</button></div>';
}
/* Glifos SVG dibujados */
var GLY={
  layers:'<path d="M12 3 2 8l10 5 10-5-10-5Zm-10 9 10 5 10-5M2 16l10 5 10-5" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/>',
  cmp:'<path d="M5 20V10m7 10V4m7 16v-7" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>',
  x:'<path d="m6 6 12 12M18 6 6 18" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>',
  check:'<path d="m5 12 5 5 9-10" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>',
  dl:'<path d="M12 4v11m-5-5 5 5 5-5M5 20h14" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>',
  search:'<circle cx="11" cy="11" r="6" fill="none" stroke="currentColor" stroke-width="1.6"/><path d="m16 16 4 4" stroke="currentColor" stroke-width="1.6"/>',
  plus:'<path d="M12 5v14M5 12h14" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>',
  bolt:'<path d="M13 2 4 14h7l-1 8 9-12h-7l1-8Z" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/>',
  hex:'<path d="M12 2 21 7v10l-9 5-9-5V7l9-5Z" fill="none" stroke="currentColor" stroke-width="1.5"/>'
};
function gly(k,sz){ return '<svg viewBox="0 0 24 24" width="'+(sz||16)+'" height="'+(sz||16)+'" aria-hidden="true">'+GLY[k]+'</svg>'; }

/* ═══════════════════════════ 1. MATERIALES Y PROCESOS ═══════════════════════════ */
var FAM={
  tierra:{n:"Tierra",h:28},piedra:{n:"Piedra",h:210},madera:{n:"Madera",h:30},bambu:{n:"Bambú / guadúa",h:70},
  ceramico:{n:"Cerámicos",h:14},mamposteria:{n:"Mampostería",h:200},hormigon:{n:"Hormigones",h:205},acero:{n:"Aceros",h:215},
  noferroso:{n:"Aluminio y no ferrosos",h:195},vidrio:{n:"Vidrios",h:188},polimero:{n:"Polímeros y compuestos",h:280},
  aislante:{n:"Aislantes",h:48},placa:{n:"Placas y tableros",h:220},cubierta:{n:"Cubiertas",h:5},acabado:{n:"Acabados",h:330},bio:{n:"Biomateriales",h:120}
};
var EPOCA={ancestral:"Ancestral",tradicional:"Tradicional",moderno:"Moderno",vanguardia:"Vanguardia"};
var ZONA={c:"Costa",s:"Sierra",a:"Amazonía",g:"Galápagos"};
/* id|nombre|familia|época|densidad kg/m³|λ W/m·K|resistencia (texto)|resistencia MPa (para comparar)|carbono kgCO2e/kg (A1–A3)|costo USD|unidad del costo|proveedores Ecuador|normas|usos|pros|contras|zonas aptas (c s a g)
   Carbono: valores genéricos ICE v3 (Univ. Bath / Circular Ecology) y EPD sectoriales; maderas sin carbono biogénico salvo que se indique.
   Costos: referenciales Ecuador 2025–2026 (revistas de precios de la Cámara de la Construcción de Guayaquil / INEC-IPCO, catálogos de distribuidores). POR VERIFICAR. */
var MAT_RAW=[
"tie-adobe|Adobe tradicional|tierra|ancestral|1600|0.80|Compresión 1–2 MPa|1.2|0.03|0.35|u (40×20×10 cm)|Productores artesanales locales (Cotopaxi, Chimborazo, Azuay, Loja)|Sin NTE INEN específica · Norma E.080 (Perú) · NZS 4297/4298|Muros portantes de 1 planta, restauración patrimonial, vivienda rural andina|Inercia térmica alta · reciclable al 100 % · huella mínima · regula humedad|Frágil ante sismo sin refuerzo (geomalla, caña, madera) · erosión por lluvia · fuera del alcance de la NEC para zonas V–VI|s",
"tie-tapial|Tapial (tierra apisonada)|tierra|ancestral|1900|1.10|Compresión 1,5–3 MPa|2|0.02|45|m³ de muro|Constructores especializados en tierra (Sierra norte y austro)|E.080 (Perú) · NZS 4297 · Lehmbau Regeln (DE) · ASTM E2392|Muros portantes masivos, cercas, muros de inercia|Masa térmica · excelente acústica · estética estratificada|Encofrado pesado · lento · requiere sobrecimiento y alero ancho · sismo|s",
"tie-btc|Bloque de tierra comprimida (BTC)|tierra|moderno|1800|0.90|Compresión 3–6 MPa (estabilizado 5–8 % cemento o cal)|4|0.06|0.45|u (29,5×14×9 cm)|Producción in situ con prensa manual (CINVA-Ram) o hidráulica|UNE 41410 · ARS 1333 (ARSO) · E.080|Muros portantes y divisorios, vivienda social, mampostería trabada|Precisión dimensional · tierra del sitio · baja energía|Control de humedad y curado · el cemento sube la huella|s c",
"tie-bahareque|Bahareque tradicional (caña + barro)|tierra|ancestral|1200|0.60|Trabaja por el entramado de caña/madera|0.5|0.02|28|m² de muro|Artesanos de Manabí, Loja y Azuay|NEC-SE-GUADÚA (versión encementada) · E.080 (quincha)|Vivienda rural costa y sierra, tabiques livianos|Liviano, flexible ante sismo · materiales del lugar|Mantenimiento · fisuras albergan insectos (vector Chagas) si no se revoca|c s",
"tie-quincha|Quincha mejorada|tierra|tradicional|1100|0.55|Entramado madera/caña + barro; liviana|0.5|0.03|32|m² de muro|Constructores especializados|E.080 (Perú, anexo quincha)|Tabiques, segundos pisos livianos, ampliaciones|Muy liviana · buen desempeño sísmico|Requiere protección de humedad y zócalo|c s",
"tie-cob|Cob / superadobe (sacos de tierra)|tierra|tradicional|1700|0.90|Compresión 0,5–1,5 MPa|1|0.03|35|m³|Autoconstrucción asistida|ASTM E2392 (guía de construcción con tierra)|Domos, muros curvos, refugios de emergencia|Formas libres · muy económico|Mano de obra intensiva · lento · sin respaldo normativo NEC|s c",
"tie-aliv|Tierra alivianada (arcilla + paja)|tierra|tradicional|600|0.17|No portante|0.2|0.02|40|m³|Bioconstructores|DIN 18951 / Lehmbau Regeln|Relleno aislante de entramados de madera|Aislante y regulador higrotérmico|No portante · secado lento|s",
"tie-revoque|Revoque de tierra / arcilla fina|tierra|tradicional|1700|0.80|Adherencia; acabado|0.5|0.03|9|m² aplicado|Bioconstructores; arcillas locales|DIN 18947|Acabado interior transpirable|Regula humedad · cero COV · reparable|Sensible al agua directa|s c a",
"tie-cal|Tierra estabilizada con cal|tierra|tradicional|1800|0.90|Compresión 2–4 MPa|3|0.08|50|m³|Cal hidratada nacional (distribuidores)|E.080 · Lehmbau Regeln|Pisos de tierra, muros apisonados, sobrecimientos|Mayor durabilidad al agua|Curado lento|s c",
"pie-andesita|Piedra andesita labrada|piedra|ancestral|2600|2.00|Compresión 80–150 MPa|100|0.08|65|m² (e = 3 cm)|Canteras de Pichincha (Pifo, Píntag) y marmolerías locales|ASTM C97 · ASTM C170|Pisos, zócalos, gradas, espacio público (Centro Histórico de Quito)|Muy durable · local en Sierra · antideslizante abujardada|Pesada · corte energético|s",
"pie-rio|Piedra de río / canto rodado|piedra|ancestral|2500|2.30|Compresión 60–120 MPa|80|0.01|22|m³|Minas pétreas locales (concesiones municipales)|NEC-SE-HM (hormigón ciclópeo)|Cimientos, ciclópeo, gaviones, muros secos|Barata y local|Extracción de cauces regulada por los GAD municipales|c s a",
"pie-basalto|Basalto / roca volcánica|piedra|ancestral|2900|1.70|Compresión 150–300 MPa|200|0.06|70|m² (piso)|Galápagos: solo material insular autorizado; continente: canteras volcánicas|ASTM C615|Muros, pisos, gaviones insulares|Altísima resistencia|Muy pesada · restricción ambiental estricta en Galápagos|g s",
"pie-marmol|Mármol|piedra|tradicional|2700|2.80|Compresión 70–140 MPa|100|0.12|55|m² (e = 2 cm)|Importado (Perú, Italia, Turquía) vía marmolerías locales|ASTM C503|Pisos, mesones, revestimiento noble|Prestigio · pulible|Se mancha con ácidos · resbala mojado|c s",
"pie-granito|Granito|piedra|tradicional|2700|2.80|Compresión 130–250 MPa|180|0.30|75|m² (mesón 2 cm)|Importado (Brasil, India, China) vía marmolerías|ASTM C615|Mesones, pisos de alto tráfico, fachadas|Durísimo · poco poroso|Huella de transporte alta|c s a g",
"pie-pomez|Piedra pómez (agregado liviano)|piedra|tradicional|700|0.20|Agregado; bloques 2–4 MPa|3|0.02|25|m³|Minas de pómez de Cotopaxi (Latacunga)|ASTM C330|Bloque pómez, rellenos aislantes, hormigón liviano|Ligera · aislante · local en Sierra|Friable · absorción alta|s",
"pie-pizarra|Pizarra|piedra|tradicional|2750|2.00|Flexión 50–60 MPa|60|0.09|45|m² (e = 1 cm)|Importada|EN 12326|Cubiertas, revestimientos, pisos|Impermeable natural · muy longeva|Frágil · pesada|s",
"pie-travertino|Travertino|piedra|tradicional|2400|1.60|Compresión 50–80 MPa|60|0.10|60|m²|Importado (Perú, Turquía, Italia)|ASTM C1527|Fachadas ventiladas, pisos, piscinas|Cálido · fresco al tacto|Poroso: requiere sellado|c s",
"pie-gavion|Gavión (piedra + malla hexagonal)|piedra|moderno|1700|1.50|Estructura gravitatoria flexible|20|0.05|55|m³|Fabricantes de malla hexagonal galvanizada/PVC (p. ej. Maccaferri, Ideal Alambrec)|ASTM A975 · EN 10223-3|Muros de contención, taludes, cercos, fachadas|Drenante · tolera asentamientos · paisaje|Ocupa mucho espacio · estética rústica|c s a g",
"mad-laurel|Laurel (Cordia alliodora)|madera|tradicional|500|0.13|Flexión ≈ 70 MPa · compresión paralela ≈ 35 MPa|35|0.30|420|m³ aserrado|Depósitos de madera con guía de movilización forestal (MAATE)|NEC-SE-MD · Manual de diseño en maderas del Grupo Andino (JUNAC)|Carpintería, entramados, puertas, cielos rasos|Liviana · trabajable · plantaciones agroforestales en Costa|Durabilidad media · requiere preservación|c s a",
"mad-teca|Teca (Tectona grandis)|madera|tradicional|650|0.15|Flexión ≈ 100 MPa · compresión ≈ 55 MPa|55|0.30|900|m³ aserrado|Plantaciones de Los Ríos, Guayas y Manabí (aserraderos y exportadores)|NEC-SE-MD · EN 350 (durabilidad clase 1)|Decks, fachadas, carpintería exterior, náutica|Muy durable a la intemperie · estable|Costo alto · mercado orientado a exportación|c s a g",
"mad-guayacan|Guayacán (Handroanthus spp.)|madera|tradicional|1000|0.25|Flexión ≈ 150 MPa · compresión ≈ 75 MPa|75|0.30|1400|m³ aserrado|Aprovechamiento restringido: verificar licencia y guía MAATE|NEC-SE-MD · JUNAC (grupo A)|Pisos de alto tráfico, columnas vistas, durmientes|Durísima · imputrescible|Escasa · especie de aprovechamiento controlado|c s",
"mad-chanul|Chanul (Humiriastrum procerum)|madera|tradicional|800|0.20|Flexión ≈ 120 MPa · compresión ≈ 60 MPa|60|0.30|750|m³ aserrado|Depósitos con guía MAATE (origen Esmeraldas)|NEC-SE-MD · JUNAC (grupo A/B)|Estructura pesada, pisos, puentes|Muy resistente y durable|Riesgo de origen ilegal: exigir trazabilidad|c s",
"mad-eucalipto|Eucalipto (E. globulus) preservado|madera|tradicional|800|0.18|Flexión ≈ 100 MPa|50|0.25|280|m³ aserrado / rollizo|Plantaciones de la Sierra; plantas de preservación (vacío-presión)|NEC-SE-MD · NTE INEN para postes de madera preservada|Postes, rollizos, encofrados, estructuras rústicas|Abundante y barato en Sierra|Agrietamiento al secar · torcedura|s c",
"mad-pino|Pino de plantación (P. radiata / patula)|madera|moderno|450|0.12|Flexión ≈ 60 MPa|30|0.25|300|m³ aserrado|Aglomerados Cotopaxi y aserraderos de la Sierra|NEC-SE-MD · NCh 1198 (Chile)|Entramados, encofrados, tableros, muebles|Plantación certificable (FSC) · liviano|Baja durabilidad natural: requiere tratamiento|s",
"mad-seique|Seique (Cedrelinga cateniformis)|madera|tradicional|500|0.14|Flexión ≈ 70 MPa|35|0.30|450|m³ aserrado|Depósitos con guía MAATE (origen Amazonía)|NEC-SE-MD|Encofrados, carpintería, estructura liviana|Trabajable · disponible|Requiere preservación en Costa|a s c",
"mad-balsa|Balsa (Ochroma pyramidale)|madera|moderno|150|0.05|Compresión ≈ 10 MPa|10|0.35|600|m³|Ecuador es el principal productor mundial (plantaciones de Los Ríos, Guayas, Esmeraldas)|ASTM C365 (núcleos sándwich)|Núcleos de paneles sándwich, aspas eólicas, aislamiento, maquetas|Ligerísima · gran relación rigidez/peso · nacional|No estructural sola · hongos sin tratamiento|c s a",
"mad-pachaco|Pachaco (Schizolobium parahyba)|madera|moderno|350|0.10|Flexión ≈ 45 MPa|22|0.25|250|m³|Plantaciones de la Costa y Amazonía|NEC-SE-MD|Tableros contrachapados, encofrados, cajonería|Crecimiento rápido|Baja durabilidad|c a",
"mad-clt|CLT (madera contralaminada)|madera|vanguardia|480|0.12|Compresión paralela ≈ 24 MPa (C24)|24|0.44|1250|m³|Importado (Chile, Austria, EE. UU.); sin producción industrial nacional a la fecha|EN 16351 · ANSI/APA PRG 320 · IBC 2021 (tipo IV)|Muros y losas de edificios en madera masiva, hasta 18 pisos (Ascent, Milwaukee)|Montaje en seco muy rápido · almacena carbono|Costo de importación · protección contra humedad y termitas en trópico|s c",
"mad-glulam|Glulam (madera laminada encolada)|madera|moderno|500|0.13|Flexión característica 24–32 MPa (GL24–GL32)|28|0.51|1100|m³|Importado; laminadores locales a pequeña escala (verificar)|EN 14080 · ANSI A190.1|Vigas de gran luz, cubiertas, puentes peatonales|Grandes luces · cálido · resistencia al fuego por carbonización|Precio · uniones metálicas especializadas|s c",
"mad-lvl|LVL (madera microlaminada)|madera|vanguardia|510|0.13|Flexión ≈ 44 MPa|44|0.55|1300|m³|Importado (Nueva Zelanda, EE. UU., Finlandia)|EN 14374 · ASTM D5456|Vigas, dinteles, cordones de cerchas|Muy homogéneo · alta resistencia|Importado · sensible a humedad|s c",
"mad-contra|Contrachapado (plywood)|madera|moderno|600|0.13|Flexión ≈ 30 MPa|30|0.68|28|plancha 15 mm (1,22×2,44 m)|Endesa-Botrosa; distribuidores de tableros|NTE INEN · PS 1 · EN 636|Encofrados, entrepisos, mobiliario, revestimientos|Estable · trabajable|Delaminación con humedad si no es fenólico|c s a g",
"mad-mdp|Tablero MDP / MDF (melamínico)|madera|moderno|700|0.14|Flexión ≈ 15–20 MPa|18|0.45|55|plancha 18 mm melamínica|Novopan del Ecuador; Aglomerados Cotopaxi|EN 312 · EN 622-5|Mobiliario fijo, closets, puertas, cielos|Económico · acabados variados|Se hincha con agua · emisiones de formaldehído (exigir E1/CARB2)|c s a g",
"mad-osb|OSB (tablero de virutas orientadas)|madera|moderno|620|0.13|Flexión ≈ 22 MPa|22|0.45|24|plancha 11 mm|Importado vía distribuidores|PS 2 · EN 300|Arriostramiento de entramados, contrapisos secos|Económico · rígido|Sensible a humedad prolongada|s c",
"mad-termo|Madera termotratada|madera|vanguardia|470|0.11|Flexión ≈ 60 MPa|30|0.50|1300|m³|Importada|CEN/TS 15679|Fachadas, decks, celosías|Estable y durable sin químicos|Más frágil · color cambia a gris|c s",
"mad-accoya|Madera acetilada (tipo Accoya)|madera|vanguardia|510|0.12|Flexión ≈ 40 MPa|30|0.70|2500|m³|Importada|EN 350 (clase 1) · ASTM D1413|Carpintería exterior, fachadas, ventanería de alto desempeño|Durabilidad clase 1 · muy estable|Precio muy alto|c s g",
"bam-guadua|Guadúa angustifolia rolliza preservada|bambu|tradicional|700|0.14|Compresión pared ≈ 40–56 MPa · tracción ≈ 100 MPa|50|0.20|5.5|caña de 6 m (Ø 10–12 cm)|Productores y centros de acopio de Manabí, Los Ríos, Santo Domingo y Guayas; Hogar de Cristo (viviendas de caña en Guayaquil)|NEC-SE-GUADÚA (2016) · ISO 22156 · ISO 22157|Estructuras, cubiertas de gran luz, bahareque encementado, puentes|Captura carbono · crece en 4–6 años · liviana y sismorresistente|Preservación (bórax) obligatoria · protección solar y de lluvia · uniones artesanales|c s a",
"bam-esterilla|Esterilla / caña picada|bambu|ancestral|600|0.13|No estructural|5|0.15|1.8|lámina (0,4×4 m)|Productores de caña de la Costa|NEC-SE-GUADÚA|Paredes de vivienda costera, cielos, encofrados, bahareque|Muy económica · local|Durabilidad baja sin revoque|c a",
"bam-lam|Bambú laminado / prensado|bambu|vanguardia|700|0.17|Flexión 80–100 MPa|60|0.90|38|m² (piso)|Importado (China, Colombia) y talleres locales|ISO 22156 · EN 14342 (pisos)|Pisos, tableros, mobiliario, revestimientos|Dureza alta · renovable|Adhesivos · importación|c s",
"bam-latas|Latas de guadúa|bambu|tradicional|650|0.14|Flexión moderada|20|0.15|1.8|lata de 6 m|Productores de guadúa de la Costa|NEC-SE-GUADÚA|Entramados de bahareque, cielos, celosías|Económica · liviana|Requiere preservación|c s",
"bam-encem|Bahareque encementado (guadúa + malla + mortero)|bambu|moderno|1300|0.50|Muro portante NEC (entramado de guadúa revocado)|10|0.12|38|m² de muro|Constructores capacitados en NEC-SE-GUADÚA|NEC-SE-GUADÚA · ISO 22156|Vivienda de 1–2 pisos sismorresistente|Liviano · sismorresistente · bajo carbono|Detalle de zócalo y aleros obligatorio|c s",
"cer-cuenca|Ladrillo artesanal de Cuenca (macizo)|ceramico|tradicional|1700|0.65|Compresión 6–8 MPa|7|0.24|0.32|u (≈ 25×12×7 cm)|Ladrilleras artesanales del Azuay (Sinincay y alrededores)|NTE INEN 297 · NEC-SE-MP|Muros vistos, mampostería confinada, pisos rústicos|Inercia térmica · identidad cuencana · reparable|Hornos artesanales contaminantes · dimensiones variables|s c",
"cer-mec|Ladrillo cerámico mecanizado hueco|ceramico|moderno|1400|0.50|Compresión 8–12 MPa|10|0.22|0.45|u|Ladrilleras industriales de la Sierra y Costa|NTE INEN 297 · NEC-SE-MP|Mampostería de relleno y confinada|Más liviano · regular|Frágil en transporte|c s a",
"cer-visto|Ladrillo caravista prensado|ceramico|moderno|1800|0.70|Compresión 12–20 MPa|15|0.24|0.85|u|Ladrilleras industriales y artesanales seleccionadas|NTE INEN 297 · ASTM C216|Fachadas vistas sin enlucido|Sin mantenimiento de pintura|Juntas y eflorescencias|c s",
"cer-termo|Bloque de arcilla aligerado (tipo termoarcilla)|ceramico|moderno|900|0.25|Compresión ≈ 10 MPa|10|0.25|1.8|u (30×19×24 cm)|Importado (bajo pedido)|UNE-EN 771-1|Muros de una hoja térmicamente eficientes|Aislante sin capa adicional|No disponible localmente|s",
"cer-porce|Porcelanato rectificado|ceramico|moderno|2400|1.30|Flexión ≥ 35 MPa · absorción ≤ 0,5 %|35|0.78|22|m²|Graiman (Cuenca); importados (España, China, Brasil)|NTE INEN-ISO 13006 · ISO 10545|Pisos interiores y exteriores, fachadas, baños|Muy resistente · fácil limpieza · gran formato|Resbaladizo pulido (exigir R10–R11 en zonas húmedas)|c s a g",
"cer-cera|Cerámica esmaltada piso/pared|ceramico|moderno|2000|1.00|Flexión 22–35 MPa|25|0.70|11|m²|Graiman; Cerámica Rialto (Cuenca); importados|NTE INEN-ISO 13006|Revestimiento de baños y cocinas, pisos residenciales|Económica · variedad|Menor resistencia al desgaste (PEI)|c s a g",
"cer-gres|Gres extruido / klinker|ceramico|moderno|2300|1.20|Flexión ≈ 35 MPa|35|0.80|35|m²|Importado (España, Alemania)|EN 14411|Pisos industriales, piscinas, exteriores, cocinas industriales|Antideslizante · resiste químicos|Precio|c s",
"cer-hidra|Baldosa hidráulica|ceramico|tradicional|2100|1.30|Flexión 4–5 MPa (pieza)|30|0.25|30|m²|Talleres artesanales (Quito, Cuenca, Guayaquil)|UNE-EN 13748|Pisos patrimoniales y de diseño|Diseño artesanal · durable|Porosa: requiere sellado|c s",
"cer-terracota|Terracota extruida (fachada ventilada)|ceramico|vanguardia|2000|1.00|Flexión ≈ 30 MPa|30|0.60|120|m² de sistema|Importado (sistemas europeos de fachada ventilada)|EN 1304 · EN 14411|Fachadas ventiladas, parasoles, celosías|Fachada ventilada reduce ganancia solar|Subestructura de aluminio · importado|c s",
"cer-celosia|Celosía cerámica / bloque calado|ceramico|tradicional|1500|0.60|Compresión ≈ 5 MPa|5|0.25|0.9|u|Ladrilleras locales|NTE INEN 297|Ventilación cruzada, filtros solares, cerramientos de patio|Ventila y sombrea · ideal clima cálido-húmedo|Ingreso de polvo e insectos|c a g",
"cer-sanit|Porcelana sanitaria (vitreous china)|ceramico|moderno|2300|1.20|Pieza moldeada|40|1.61|95|u (inodoro)|Edesa (Quito); FV-Área Andina; importados|NTE INEN (aparatos sanitarios) · ASME A112.19.2|Inodoros, lavamanos, urinarios|Higiénico · durable|Frágil · alto consumo de energía de cocción|c s a g",
"mam-b10|Bloque de hormigón 10×20×40 cm|mamposteria|moderno|1300|0.75|Compresión neta ≥ 3 MPa (no portante)|3|0.10|0.42|u|Bloqueras con certificación INEN; red de distribuidores Disensa|NTE INEN 3066 · NEC-SE-MP|Tabiques interiores|Económico · rápido|Ruido aéreo · enlucido obligatorio|c s a g",
"mam-b15|Bloque de hormigón 15×20×40 cm|mamposteria|moderno|1350|0.72|Compresión neta ≥ 4 MPa|4|0.10|0.58|u|Bloqueras con certificación INEN; Disensa|NTE INEN 3066 · NEC-SE-MP|Mampostería perimetral y divisoria (el más usado en Ecuador)|Disponibilidad total · mano de obra conocida|Baja aislación térmica · fisuras si no se confina|c s a g",
"mam-b20|Bloque estructural de hormigón 20 cm|mamposteria|moderno|1500|0.90|Compresión neta ≥ 6–10 MPa|8|0.11|0.85|u|Bloqueras industriales certificadas (bajo pedido)|NTE INEN 3066 · NEC-SE-MP (mampostería reforzada)|Mampostería estructural reforzada con varilla y grout|Estructura y cerramiento en uno|Control de calidad estricto · ductos deben planificarse|c s",
"mam-pomez|Bloque de pómez alivianado|mamposteria|tradicional|900|0.35|Compresión 2–3 MPa|2.5|0.06|0.50|u|Bloqueras de Cotopaxi y Pichincha|NTE INEN 3066|Mampostería liviana en Sierra|Liviano · mejor aislamiento que bloque común|Baja resistencia · absorbe agua|s",
"mam-aac|Bloque de hormigón celular (AAC)|mamposteria|moderno|550|0.14|Compresión 3–5 MPa|4|0.28|3.2|u (60×20×15 cm)|Importado bajo pedido|ASTM C1693 · EN 771-4|Muros térmicos, tabiques livianos, cortafuegos|Aislante · liviano · resistente al fuego|Disponibilidad · anclajes especiales|c s",
"mam-eps|Panel de EPS con malla electrosoldada (tipo Hormi2)|mamposteria|moderno|180|0.04|Sistema monolítico con micro-hormigón proyectado|10|1.20|32|m² instalado (con mortero)|Hormi2 (Ecuador) y fabricantes de paneles similares|NEC-SE-VIVIENDA · ensayos del fabricante|Vivienda de hasta 2–3 pisos, tabiques, losas livianas|Rápido · aislante · liviano · sismorresistente|Requiere mano de obra capacitada · EPS no es reciclado|c s a",
"hor-180|Hormigón f'c 180 kg/cm² (18 MPa)|hormigon|moderno|2350|1.60|f'c 18 MPa a 28 días|18|0.09|110|m³ premezclado|Holcim Ecuador; UNACEM Ecuador; hormigoneras locales|NTE INEN 1855-1 · NEC-SE-HM|Replantillos, contrapisos, aceras, bordillos (no estructural sismorresistente)|Económico|No admitido para elementos estructurales (NEC exige ≥ 21 MPa)|c s a g",
"hor-210|Hormigón f'c 210 kg/cm² (21 MPa)|hormigon|moderno|2400|1.63|f'c 21 MPa a 28 días|21|0.10|120|m³ premezclado|Holcim Ecuador; UNACEM Ecuador; hormigoneras locales|NTE INEN 1855-1 · NEC-SE-HM · ACI 318-19|Losas, vigas, columnas de edificios bajos, cimentaciones|Estándar del mercado · mínimo NEC estructural|Huella del cemento|c s a g",
"hor-240|Hormigón f'c 240 kg/cm² (24 MPa)|hormigon|moderno|2400|1.65|f'c 24 MPa a 28 días|24|0.11|127|m³ premezclado|Holcim Ecuador; UNACEM Ecuador|NTE INEN 1855-1 · NEC-SE-HM|Estructura de edificios medianos, losas postensadas livianas|Mejor durabilidad|Costo levemente mayor|c s a g",
"hor-280|Hormigón f'c 280 kg/cm² (28 MPa)|hormigon|moderno|2420|1.70|f'c 28 MPa a 28 días|28|0.12|135|m³ premezclado|Holcim Ecuador; UNACEM Ecuador|NTE INEN 1855-1 · NEC-SE-HM · ACI 318-19|Columnas y muros de edificios medianos/altos, ambiente marino|Durabilidad en Costa (cloruros)|Mayor contenido de cemento|c s a g",
"hor-350|Hormigón f'c 350 kg/cm² (35 MPa)|hormigon|moderno|2430|1.75|f'c 35 MPa a 28 días|35|0.14|155|m³ premezclado|Holcim Ecuador; UNACEM Ecuador (diseño de mezcla)|NTE INEN 1855-1 · ACI 318-19|Edificios altos, prefabricados, pavimentos industriales|Secciones menores|Control de fisuración térmica|c s",
"hor-ad|Hormigón de alto desempeño (50–80 MPa)|hormigon|vanguardia|2450|1.80|f'c 50–80 MPa|65|0.17|230|m³|Holcim Ecuador; UNACEM Ecuador (bajo diseño, con aditivos Sika u otros)|ACI 363R · ACI 318-19|Columnas de rascacielos, puentes, ambientes agresivos|Esbeltez · durabilidad|Control de calidad muy estricto|c s",
"hor-uhpc|UHPC (ultra alto desempeño, 150–200 MPa)|hormigon|vanguardia|2500|1.90|f'c 150–200 MPa · flexión 20–40 MPa|170|0.35|1800|m³|Premezclas importadas (p. ej. Ductal®, Holcim) bajo pedido|ASTM C1856 · NF P18-470 · fib MC2010|Paneles de fachada ultradelgados, celosías, puentes, MuCEM (Marsella)|Espesores de 2–4 cm · casi impermeable|Muy costoso · huella por m³ alta|c s",
"hor-scc|Hormigón autocompactante (SCC)|hormigon|moderno|2350|1.65|f'c 28–45 MPa|35|0.13|160|m³|Holcim Ecuador; UNACEM Ecuador (con superplastificantes)|ACI 237R · EFNARC · NTE INEN 1855-1|Elementos muy armados, hormigón visto, prefabricados|Sin vibrado · acabado perfecto|Encofrados estancos y resistentes a presión|c s",
"hor-trans|Hormigón translúcido (fibra óptica)|hormigon|vanguardia|2400|2.10|Compresión ≈ 50 MPa|50|0.20|900|m² de panel|Importado (p. ej. LiTraCon, Hungría)|ASTM C39 (ensayo) · fabricante|Muros de luz, mobiliario, señalética, iluminación decorativa|Efecto escénico|Muy costoso · no estructural|c s",
"hor-perm|Hormigón permeable (poroso)|hormigon|moderno|1900|1.00|Compresión 10–20 MPa · permeabilidad 2–5 mm/s|15|0.09|115|m³|Hormigoneras (diseño de mezcla especial)|ACI 522R · ASTM C1701|Parqueaderos, veredas, SUDS (drenaje urbano sostenible)|Infiltra lluvia · reduce escorrentía|Colmatación · baja resistencia|c s a g",
"hor-hemp|Hempcrete (cáñamo + cal)|hormigon|vanguardia|300|0.07|Compresión 0,3–1 MPa (no portante)|0.6|-0.10|300|m³|Sin producción comercial establecida en Ecuador (cáñamo industrial regulado por el MAG); importación|Règles professionnelles chanvre (FR) · guía UK Hemp Lime|Relleno aislante de entramados, muros no portantes|Carbono negativo (con biogénico) · regula humedad|No portante · secado lento|s c",
"hor-geo|Hormigón geopolimérico (activado alcalinamente)|hormigon|vanguardia|2300|1.40|Compresión 40–80 MPa|50|0.06|160|m³|Sin proveedor local consolidado; experimental/importado|PAS 8820 · ASTM C1157 (desempeño)|Prefabricados, pavimentos, ambientes ácidos|Hasta −80 % CO₂ frente a Portland|Activadores corrosivos · normativa limitada|c s",
"hor-liv|Hormigón liviano estructural (pómez / arcilla expandida)|hormigon|moderno|1800|0.60|f'c 17–28 MPa|21|0.12|145|m³|Hormigoneras (Sierra: agregado pómez)|ACI 213R · ASTM C330|Losas sobre estructura existente, rellenos, prefabricados|Reduce peso propio y fuerza sísmica|Costo · bombeo cuidadoso|s c",
"hor-fibra|Hormigón reforzado con fibras (acero/sintéticas)|hormigon|moderno|2400|1.65|f'c 28 MPa + tenacidad residual|28|0.13|155|m³|Hormigoneras; fibras de Ideal Alambrec (Bekaert) y Sika Ecuador|ACI 544 · ASTM C1609|Pisos industriales sin juntas, túneles, losas sobre terreno|Control de fisuras · menos malla|Fibras visibles en superficie|c s a",
"hor-visto|Hormigón visto arquitectónico|hormigon|moderno|2400|1.65|f'c 28 MPa|28|0.12|150|m³ (+ encofrado especial)|Hormigoneras + encofrados fenólicos/metálicos|ACI 303R|Fachadas brutalistas, interiores, mobiliario|Estructura = acabado|Exige mano de obra impecable · manchas|c s",
"hor-ciclo|Hormigón ciclópeo (60 % H + 40 % piedra)|hormigon|tradicional|2350|1.80|Compresión ≈ 14 MPa|14|0.06|85|m³|Hormigoneras y piedra local|NEC-SE-HM|Cimientos corridos, muros de contención de gravedad, plintos rurales|Económico|No estructural en zonas de alta demanda|c s a",
"hor-rec|Hormigón con árido reciclado (RCA)|hormigon|vanguardia|2250|1.50|f'c 21–28 MPa|21|0.09|110|m³|Experimental (plantas de reciclaje de RCD aún incipientes)|EN 206 (anejo E) · ACI 555R|Pavimentos, bases, hormigón no estructural|Economía circular · menos minería|Variabilidad del árido|c s",
"hor-eco|Hormigón de bajo carbono (cemento con adiciones)|hormigon|moderno|2400|1.63|f'c 21–35 MPa|28|0.07|125|m³|Holcim Ecuador (línea ECOPact, verificar disponibilidad); cementos puzolánicos IP/HE nacionales|NTE INEN 2380 · NTE INEN 490 · NEC-SE-HM|Toda estructura convencional|−30 a −50 % CO₂ sin cambiar procesos|Fraguado inicial más lento|c s a g",
"ace-var|Varilla corrugada fy 4200 kg/cm² (A706 soldable)|acero|moderno|7850|50.00|fy 420 MPa · fu ≥ 550 MPa|420|0.90|1.20|kg|Adelca; Andec; Novacero|NTE INEN 2167 · ASTM A706 · NEC-SE-HM|Armadura de hormigón sismorresistente|Producción nacional con chatarra reciclada (horno eléctrico)|Corrosión en Costa: recubrimientos mínimos NEC|c s a g",
"ace-malla|Malla electrosoldada|acero|moderno|7850|50.00|fy 500 MPa|500|1.00|1.45|kg|Adelca; Ideal Alambrec; Novacero|ASTM A1064 · NEC-SE-HM|Losas, contrapisos, muros delgados, paneles|Rapidez de colocación|Traslapes y fisuración por retracción|c s a g",
"ace-a36|Perfiles laminados ASTM A36|acero|moderno|7850|52.00|fy 250 MPa|250|1.55|1.85|kg|Ipac; Dipac; Novacero|ASTM A36 · NEC-SE-AC · AISC 360/341|Estructuras metálicas, cubiertas, mezzanines|Rapidez · reciclable|Protección contra fuego y corrosión|c s a g",
"ace-a572|Perfiles ASTM A572 Gr. 50|acero|moderno|7850|52.00|fy 345 MPa|345|1.55|1.95|kg|Ipac; Dipac; importadores|ASTM A572 · NEC-SE-AC · AISC 341|Pórticos especiales resistentes a momento, edificios altos|Mayor resistencia por kg|Soldadura calificada (AWS D1.1/D1.8)|c s a g",
"ace-tub|Perfiles tubulares estructurales ASTM A500|acero|moderno|7850|52.00|fy 290–345 MPa|315|1.60|1.75|kg|Dipac; Ipac; Kubiec; Novacero|ASTM A500 · NEC-SE-AC|Columnas compuestas, cerchas, pérgolas, fachadas|Eficiente a compresión · estético|Corrosión interior si no se sella|c s a g",
"ace-sf|Perfilería galvanizada steel framing|acero|moderno|7850|50.00|fy 230–340 MPa (calibres 20–14)|230|2.76|2.40|kg|Kubiec; Ipac; distribuidores de sistemas en seco|ASTM A653 G90 · ASTM A1003 · AISI S100/S240|Viviendas de 1–3 pisos, tabiques, cielos, fachadas livianas|Rápido · liviano · seco|Puentes térmicos · requiere arriostramiento y anclaje sísmico|c s a",
"ace-deck|Placa colaborante (steel deck)|acero|moderno|7850|50.00|fy 230–330 MPa (e 0,65–0,76 mm)|250|2.76|15|m²|Kubiec; Novacero; Ipac|ASTM A653 · ANSI/SDI C-2017|Losas compuestas sobre vigas metálicas|Elimina encofrado · rápido|Protección contra fuego bajo losa|c s a g",
"ace-inox|Acero inoxidable 304 / 316|acero|moderno|8000|16.00|fy ≥ 205 MPa|205|4.40|6.5|kg|Importadores y distribuidores (p. ej. Dipac)|ASTM A240 · ASTM A554|Barandas, mobiliario hospitalario, cocinas industriales, ambiente marino (316)|Higiénico · sin corrosión|Costo · huella|c s a g",
"ace-corten|Acero patinable (corten) ASTM A588|acero|vanguardia|7850|50.00|fy 345 MPa|345|1.60|3.2|kg|Importado bajo pedido|ASTM A588 · ASTM A606|Fachadas, esculturas, paisajismo|Pátina protectora sin pintura|Escurre óxido · no apto en clima marino/húmedo permanente|s",
"ace-tor|Torón de postensado 7 hilos (grado 270)|acero|moderno|7850|50.00|fpu 1860 MPa|1860|2.00|3.5|kg|Subcontratistas especializados de postensado|ASTM A416 · ACI 318 cap. 25 · PTI|Losas postensadas, vigas de gran luz, puentes|Luces largas con losas delgadas|Diseño y ejecución especializados|c s a",
"alu-6063|Perfilería de aluminio 6063-T5|noferroso|moderno|2700|200.00|fy ≈ 145 MPa|145|9.00|8.5|kg|Cedal (Latacunga); distribuidores de perfilería|ASTM B221 · AAMA 2604/2605|Ventanería, muros cortina, divisiones|Liviano · sin corrosión · reciclable|Puente térmico (exigir RPT en climas fríos)|c s a g",
"alu-acm|Panel compuesto de aluminio (ACM) núcleo FR/A2|noferroso|moderno|1500|0.45|Panel 4 mm · 5,5–7,5 kg/m²|40|8.00|42|m² instalado|Distribuidores de paneles importados|NFPA 285 · EN 13501-1 (B-s1,d0 / A2)|Revestimiento de fachadas comerciales|Planitud · colores|Prohibir núcleo de polietileno (incendio Grenfell 2017)|c s a",
"alu-perf|Chapa perforada / metal desplegado de aluminio|noferroso|moderno|2700|200.00|Chapa 2–3 mm|100|9.00|55|m² instalado|Talleres metalmecánicos; distribuidores|EN 485 · ASTM B209|Pieles de fachada, parasoles, cielos acústicos|Control solar con transparencia|Costo de subestructura|c s a g",
"alu-espuma|Espuma de aluminio|noferroso|vanguardia|500|5.00|Compresión 3–10 MPa|6|12.00|250|m² (panel 20 mm)|Importada (Austria, Alemania)|Fabricante|Revestimientos acústicos, absorción de impacto, diseño|Ultraligera · absorbe energía|Muy costosa|c s",
"cob-cobre|Lámina de cobre|noferroso|tradicional|8900|390.00|fu ≈ 220 MPa|220|2.70|14|kg|Importadores|ASTM B370 · EN 1172|Cubiertas, fachadas, canales, tuberías de gases medicinales|Pátina verde · antimicrobiano|Costo · robo|s c",
"zin-ti|Zinc-titanio laminado|noferroso|vanguardia|7200|110.00|fu ≈ 150 MPa|150|3.10|95|m² instalado|Importado (sistemas europeos)|EN 988|Cubiertas curvas, fachadas engatilladas|Durabilidad 80–100 años|Incompatible con cobre y maderas ácidas|s",
"vid-flot|Vidrio flotado claro 6 mm|vidrio|moderno|2500|1.00|Flexión ≈ 45 MPa|45|1.44|28|m²|Fairis; procesadoras y vidrierías locales|ASTM C1036 · NEC-HS-EE|Ventanas, divisiones, espejos|Transparencia · económico|Rotura peligrosa (no es de seguridad)|c s a g",
"vid-temp|Vidrio templado 10 mm|vidrio|moderno|2500|1.00|Flexión ≈ 120–200 MPa (4–5× flotado)|150|1.67|75|m²|Fairis; procesadoras locales con horno de templado|ASTM C1048 · ANSI Z97.1 · CPSC 16 CFR 1201|Puertas, mamparas, barandas, fachadas abotonadas|Seguridad (rompe en granos)|No se corta tras templar · rotura espontánea por NiS|c s a g",
"vid-lam|Vidrio laminado 6+6 mm (PVB)|vidrio|moderno|2500|1.00|Flexión ≈ 45 MPa por lámina · retención post-rotura|45|1.70|85|m²|Fairis; procesadoras locales|ASTM C1172 · ANSI Z97.1|Fachadas, barandas, claraboyas, hospitales|No se desprende al romper · filtra UV · acústico|Peso · costo|c s a g",
"vid-dvh|Vidrio doble (DVH) con low-e|vidrio|moderno|2500|0.04|U ≈ 1,6–1,8 W/m²K (λ equivalente)|45|1.80|140|m²|Fairis; procesadoras locales de vidrio insulado|ASTM E2190 · NEC-HS-EE · ISO 10292|Fachadas de oficinas, salud, climas fríos y climatizados|Reduce ganancia térmica y ruido|Sello perimetral con vida útil|c s a",
"vid-solar|Vidrio de control solar (reflectivo/espectral)|vidrio|moderno|2500|1.00|Flexión ≈ 45 MPa · SHGC 0,25–0,40|45|1.60|60|m²|Fairis; importadores|ASTM C1376 · NEC-HS-EE|Fachadas expuestas al sol de la Costa|Reduce carga de aire acondicionado|Reflejos urbanos · menor luz visible|c a g",
"vid-electro|Vidrio electrocrómico|vidrio|vanguardia|2500|0.04|U ≈ 1,1 W/m²K · tinte variable 1–60 %|45|3.00|1000|m²|Importado (p. ej. SageGlass, View)|ASTM E2141 · NFRC|Fachadas inteligentes, claraboyas, salas sensibles al deslumbramiento|Elimina persianas · control dinámico|Costo muy alto · requiere control eléctrico|c s",
"vid-bloque|Bloque de vidrio|vidrio|moderno|2500|0.60|Compresión ≈ 6 MPa (unidad)|6|1.60|4.5|u (19×19×8 cm)|Importado vía distribuidores|ASTM E330 · fabricante|Muros de luz, baños, cajas de escalera|Luz con privacidad|Pesado · no portante|c s",
"vid-u|Vidrio perfilado en U (U-glass)|vidrio|vanguardia|2500|1.00|Flexión ≈ 45 MPa|45|1.60|110|m²|Importado (Alemania, China)|EN 572-7|Fachadas traslúcidas, museos, bodegas|Luz difusa · grandes alturas sin perfilería|Aislamiento térmico bajo en una hoja|c s",
"vid-bipv|Vidrio fotovoltaico (BIPV)|vidrio|vanguardia|2500|0.04|Laminado con celdas · 50–150 Wp/m²|45|3.50|450|m²|Importado (p. ej. Onyx Solar)|IEC 61215 · IEC 61730 · EN 50583|Fachadas y lucernarios que generan energía|Genera electricidad y sombra|Costo · conexión eléctrica|c s g",
"vid-sgp|Laminado estructural ionoplástico (SGP)|vidrio|vanguardia|2500|1.00|5× rigidez del PVB|50|2.00|220|m²|Importado / procesadoras con licencia|ASTM E1300 · fabricante|Pisos de vidrio, barandas sin perfil, vigas de vidrio|Seguridad estructural|Costo|c s",
"vid-auto|Vidrio autolimpiante (TiO₂)|vidrio|vanguardia|2500|1.00|Flexión ≈ 45 MPa|45|1.70|70|m²|Importado|EN 1096-5|Fachadas de difícil limpieza, lucernarios|Menos mantenimiento|Requiere lluvia y sol|c s",
"pol-etfe|ETFE en cojines neumáticos|polimero|vanguardia|1750|0.24|Tracción 40–50 MPa · U cojín 3 capas ≈ 1,9 W/m²K|45|25.00|450|m² de sistema|Importado (p. ej. Vector Foiltec)|EN 13501-1 · fabricante|Cubiertas de estadios, atrios, invernaderos (Allianz Arena, Eden Project)|1 % del peso del vidrio · grandes luces · autolimpiante|Acústica con lluvia · bombas de presión permanentes|c s",
"pol-pcalv|Policarbonato alveolar 10 mm|polimero|moderno|1200|0.20|Tracción ≈ 60 MPa · U ≈ 2,5 W/m²K|60|7.60|25|m²|Distribuidores de plásticos de ingeniería|ASTM D3935 · EN 16153|Cubiertas traslúcidas, lucernarios, invernaderos|Liviano · irrompible|Amarillea sin filtro UV · ruidoso con lluvia|c s a g",
"pol-pcsol|Policarbonato sólido|polimero|moderno|1200|0.20|Tracción ≈ 65 MPa|65|7.60|65|m² (6 mm)|Distribuidores de plásticos de ingeniería|ASTM D3935|Domos, barreras antivandálicas, marquesinas|200× más resistente al impacto que el vidrio|Se raya fácilmente|c s a g",
"pol-gfrc|GFRC (hormigón reforzado con fibra de vidrio)|polimero|vanguardia|2000|0.90|Flexión (MOR) 20–30 MPa|25|0.80|180|m² de panel|Talleres especializados (bajo pedido); importados|PCI MNL-130 · GRCA · EN 1169|Fachadas esculturales, celosías, molduras|Formas libres livianas|Molde costoso · control de calidad|c s",
"pol-frp|Perfiles de fibra de vidrio pultruidos (FRP)|polimero|vanguardia|1900|0.30|Tracción ≈ 200 MPa|200|2.50|12|kg|Importado|ASCE/SEI 74 · ASTM D3917|Pasarelas en ambiente marino, plantas químicas, rejillas|No corroe · aislante eléctrico|Baja rigidez · comportamiento al fuego|c g",
"pol-cfrp|Refuerzo con fibra de carbono (CFRP)|polimero|vanguardia|1600|7.00|Tracción ≈ 2800 MPa|2800|25.00|120|m² aplicado|Sika Ecuador (sistemas de refuerzo); aplicadores especializados|ACI 440.2R|Reforzamiento sísmico de vigas, columnas y losas existentes|Altísima resistencia · sin aumentar peso|Costo · protección al fuego|c s a g",
"pol-upvc|Ventanería de PVC (uPVC) multicámara|polimero|moderno|1400|0.17|Perfil reforzado con acero|40|3.10|180|m² de ventana|Fabricantes locales con perfil importado (sistemas europeos)|EN 12608 · AAMA/WDMA/CSA 101|Ventanas acústicas y térmicas|Aislamiento térmico y acústico|Dilatación térmica · reciclaje limitado|c s",
"pol-pvc|Tubería PVC sanitaria/presión|polimero|moderno|1400|0.17|Presión 0,63–1,25 MPa|1|3.10|4.8|m (Ø 110 mm desagüe)|Plastigama (Wavin); otros fabricantes nacionales|NTE INEN (tubería PVC) · ASTM D2665 · NEC-HS|Desagües, agua potable, ductos eléctricos|Económica · liviana|Combustión tóxica · UV|c s a g",
"pol-hdpe|Geomembrana / tubería HDPE|polimero|moderno|950|0.45|Tracción ≈ 25 MPa|25|1.90|4.5|m² (1 mm)|Distribuidores de geosintéticos; Plastigama (tuberías)|ASTM D7176 · GRI-GM13|Impermeabilización de cisternas, rellenos sanitarios, cubiertas verdes|Inerte · durable|Soldadura por termofusión especializada|c s a g",
"pol-ptfe|Membrana PTFE / fibra de vidrio|polimero|vanguardia|1500|0.25|Tracción 80–160 kN/m|100|10.00|180|m² instalada|Importado (empresas de arquitectura textil)|ASCE 55 · EN 17117|Cubiertas tensadas de estadios, plazas, terminales|Vida útil > 25 años · traslúcida|Diseño por form-finding · instalación especializada|c s a g",
"pol-pmma|Acrílico (PMMA)|polimero|moderno|1190|0.19|Tracción ≈ 70 MPa|70|6.50|85|m² (6 mm)|Distribuidores de plásticos|ASTM D4802|Señalética, iluminación, acuarios, mamparas|Transparencia 92 %|Inflamable · se raya|c s a g",
"pol-wpc|Madera plástica (WPC / plástico reciclado)|polimero|moderno|1300|0.30|Flexión ≈ 20 MPa|20|1.50|45|m² (deck)|Distribuidores; recicladoras nacionales de plástico|ASTM D7032|Decks, mobiliario urbano, cercas|Sin mantenimiento · usa plástico reciclado|Se calienta al sol · dilatación|c s a g",
"ais-roca|Lana de roca|aislante|moderno|100|0.035|No estructural · incombustible A1|0.05|1.28|9|m² (50 mm)|Distribuidores de aislamiento importado|ASTM C612 · EN 13162|Fachadas ventiladas, muros cortafuego, cubiertas, acústica|Incombustible · acústica excelente|Irritante en instalación · absorbe agua|c s a g",
"ais-vidrio|Lana de vidrio|aislante|moderno|16|0.040|No estructural|0.01|1.35|5|m² (50 mm)|Distribuidores de aislamiento importado|ASTM C665 · EN 13162|Cielos falsos, tabiques de gypsum, ductos|Económica · acústica|Pierde efecto si se humedece|c s a g",
"ais-eps|Poliestireno expandido (EPS) con retardante|aislante|moderno|15|0.038|Compresión 0,07–0,15 MPa|0.1|3.30|3.5|m² (50 mm)|Fabricantes nacionales de EPS|ASTM C578 · EN 13163|Losas alivianadas, aislamiento de cubiertas, paneles|Muy económico · liviano|Combustible (exigir retardante) · no reciclado|c s a g",
"ais-xps|Poliestireno extruido (XPS)|aislante|moderno|32|0.033|Compresión 0,3–0,5 MPa|0.3|3.50|9|m² (50 mm)|Importado vía distribuidores|ASTM C578 · EN 13164|Cubiertas invertidas, bajo losa, sótanos|Resiste humedad y compresión|Huella alta · combustible|c s",
"ais-pir|Espuma PIR / PUR|aislante|moderno|32|0.022|Compresión 0,12–0,15 MPa|0.12|4.20|14|m² (50 mm)|Paneles sándwich nacionales (bajo pedido) e importados|ASTM C1289 · EN 13165|Panel sándwich, cámaras frías, cubiertas|El mejor λ convencional|Humos tóxicos en incendio|c s a g",
"ais-corcho|Corcho expandido (aglomerado negro)|aislante|tradicional|110|0.040|Compresión ≈ 0,1 MPa|0.1|0.19|25|m² (50 mm)|Importado (Portugal)|EN 13170|Aislamiento térmico-acústico natural, fachadas|Renovable · imputrescible · acústico|Importado · costo|s c",
"ais-aero|Manta de aerogel|aislante|vanguardia|150|0.015|No estructural|0.05|10.00|120|m² (10 mm)|Importado (p. ej. Aspen Aerogels)|ASTM C1728|Rehabilitación con poco espesor, puentes térmicos|λ ultrabajo en milímetros|Muy costoso · polvo|s c",
"ais-fmad|Fibra de madera|aislante|vanguardia|160|0.040|Compresión ≈ 0,05 MPa|0.05|0.50|20|m² (60 mm)|Importado (Europa)|EN 13171|Aislamiento difusivo en madera y tierra|Inercia térmica + regula humedad|No disponible localmente|s",
"ais-coco|Fibra de coco (mantas/tableros)|aislante|tradicional|100|0.045|No estructural|0.03|0.10|8|m² (40 mm)|Procesadores artesanales de coco de la Costa (verificar oferta)|ASTM C518 (ensayo λ)|Aislamiento acústico, sustrato de cubiertas verdes, geotextiles|Residuo agrícola local · resistente a hongos|Producción no industrializada|c a g",
"ais-celu|Celulosa insuflada|aislante|moderno|50|0.040|No estructural|0.01|0.20|7|m² (60 mm)|Importado|ASTM C739 · EN 15101|Rellenos de cámaras, entretechos|Papel reciclado · buen desfase|Requiere maquinaria · humedad|s",
"ais-oveja|Lana de oveja|aislante|tradicional|25|0.039|No estructural|0.01|0.10|18|m² (50 mm)|Importada; potencial de lana de la Sierra (no industrializada)|EN 13162 (referencia)|Aislamiento natural, acústica|Higroscópica · natural|Polillas sin tratamiento|s",
"ais-paja|Fardos de paja|aislante|ancestral|110|0.055|Compresión (portante en sistema Nebraska)|0.05|0.01|30|m³|Residuos agrícolas de la Sierra (trigo, cebada)|IRC Apéndice AS · ASTM E2392|Muros de fardos, rellenos aislantes|Residuo · muy aislante|Riesgo de humedad y roedores|s",
"ais-vip|Panel aislante al vacío (VIP)|aislante|vanguardia|190|0.007|No estructural · no perforable|0.1|8.00|150|m² (20 mm)|Importado|ISO 16478|Rehabilitación de alta eficiencia, cámaras frías|λ 5× mejor que EPS|No se puede cortar · vida útil limitada|s c",
"ais-refl|Aislante reflectivo (burbuja + aluminio)|aislante|moderno|30|0.040|No estructural · barrera radiante|0.01|3.00|2.5|m²|Distribuidores de materiales (Disensa, Kywi, Ferrisariato)|ASTM C1224 · ASTM C1313|Bajo cubiertas metálicas en la Costa|Reduce calor radiante del techo|Requiere cámara de aire para funcionar|c a g",
"pla-st|Placa de yeso estándar (gypsum ST) 12,7 mm|placa|moderno|700|0.17|Flexión ≈ 3 MPa|3|0.39|8|plancha (1,22×2,44 m)|Distribuidores de sistemas en seco (Gyplac/Etex, Knauf, USG)|ASTM C1396 · ASTM C840|Tabiques y cielos interiores secos|Rápido · liso · instalaciones ocultas|Sensible a humedad e impactos|c s a g",
"pla-rh|Placa de yeso resistente a humedad (RH)|placa|moderno|820|0.17|Flexión ≈ 3,5 MPa|3.5|0.42|11|plancha (1,22×2,44 m)|Distribuidores de sistemas en seco|ASTM C1396 · ASTM C1658|Baños, cocinas, áreas húmedas, salud|Resiste humedad ambiental|No apta para contacto directo con agua|c s a g",
"pla-rf|Placa de yeso resistente al fuego (RF, tipo X)|placa|moderno|850|0.18|Flexión ≈ 3,5 MPa · 1 h en sistema|3.5|0.45|12|plancha (1,22×2,44 m)|Distribuidores de sistemas en seco|ASTM C1396 tipo X · UL 263 / ASTM E119|Escaleras protegidas, ductos, sectorización contra incendios|Resistencia al fuego certificada|Peso · sensibles a humedad|c s a g",
"pla-fc|Placa de fibrocemento|placa|moderno|1350|0.24|Flexión 8–12 MPa|10|0.90|22|plancha 8 mm (1,22×2,44 m)|Etex (Eternit); distribuidores de sistemas en seco|ASTM C1186 · ISO 8336|Fachadas livianas, tabiques húmedos, cielos exteriores|Resiste agua y termitas|Corte genera sílice (usar protección)|c s a g",
"pla-cem|Placa cementicia con malla de vidrio|placa|moderno|1150|0.25|Flexión ≈ 7 MPa|7|0.70|28|plancha 12,7 mm|Importada vía distribuidores|ASTM C1325|Base para enchape en zonas húmedas, fachadas|Totalmente resistente al agua|Pesada · costo|c s a g",
"pla-mgo|Placa de óxido de magnesio (MgO)|placa|vanguardia|1100|0.20|Flexión ≈ 10 MPa|10|0.60|30|plancha 12 mm|Importada|ASTM C1186 (referencia) · fabricante|Tabiques incombustibles, prefabricados|Incombustible · liviana|Riesgo de 'sudoración' salina en clima cálido-húmedo (Guayaquil)|s",
"pla-hpl|Panel HPL / laminado compacto fenólico|placa|moderno|1400|0.30|Flexión ≈ 80 MPa|80|1.60|110|m²|Importado (sistemas europeos) vía distribuidores|EN 438 · ISO 22196 (antibacteriano)|Fachadas ventiladas, cabinas sanitarias, revestimientos hospitalarios|Higiénico · resistente a impactos|Costo|c s a g",
"pla-mel|Tablero de fibra de coco / bagazo (aglomerado agrícola)|placa|vanguardia|800|0.12|Flexión ≈ 12 MPa|12|0.30|35|plancha 15 mm|Experimental / importado|EN 312 (referencia)|Mobiliario, revestimientos interiores|Valoriza residuos agrícolas|Oferta limitada|c s",
"cub-teja|Teja de arcilla|cubierta|ancestral|1800|0.70|Carga de rotura ≈ 1,2 kN por pieza|10|0.30|0.55|u (≈ 15 u/m²)|Tejerías artesanales de la Sierra y el austro|ASTM C1167 · UNE-EN 1304|Cubiertas inclinadas, arquitectura vernácula andina y costera|Fresca · durable · patrimonial|Pesada (estructura robusta) · requiere pendiente ≥ 30 %|s c",
"cub-fcond|Plancha ondulada de fibrocemento|cubierta|moderno|1350|0.24|Flexión ≈ 10 MPa|10|0.90|14|plancha (1,10×2,44 m)|Etex (Eternit); distribuidores|ISO 9933 · NTE INEN (fibrocemento)|Cubiertas industriales, vivienda, galpones|Fresca frente a metal · económica|Frágil al pisarla · libre de asbesto obligatorio|c s a g",
"cub-steel|Panel de acero prepintado (galvalume 0,40 mm)|cubierta|moderno|7850|50.00|fy 550 MPa (G550)|550|2.80|9.5|m²|Kubiec; Ipac; Novacero|ASTM A792 · ASTM A755|Cubiertas de naves, vivienda, comercio|Liviano · rápido · grandes luces|Caliente y ruidoso sin aislante|c s a g",
"cub-sand|Panel sándwich PIR/PUR 50 mm|cubierta|moderno|110|0.022|Autoportante 3–6 m|5|3.50|38|m²|Fabricantes nacionales bajo pedido e importados|EN 14509 · FM 4880|Cubiertas climatizadas, salud, industria alimentaria|Aislante + cubierta en una pieza|Precio · comportamiento al fuego (preferir PIR o lana de roca)|c s a g",
"cub-zinc|Plancha ondulada galvanizada (zinc)|cubierta|moderno|7850|50.00|Lámina 0,25–0,30 mm|300|2.80|6|plancha (0,80×3,60 m)|Distribuidores (Disensa, Kywi, Ferrisariato)|ASTM A653|Vivienda popular, provisionales|Muy barata|Calor extremo · corrosión · ruido|c s a",
"cub-asf|Membrana asfáltica APP 4 mm|cubierta|moderno|1100|0.17|Tracción ≈ 0,8 kN/5 cm|1|0.55|9|m² (material)|Imptek (Chova del Ecuador); Sika Ecuador|ASTM D6222|Impermeabilización de losas planas|Probada · económica|Vida útil 10–15 años · se degrada al sol sin protección|c s a g",
"cub-tpo|Membrana sintética TPO / PVC / EPDM|cubierta|moderno|950|0.20|Tracción ≈ 10 MPa|10|3.00|28|m² instalada|Sika Ecuador; Imptek; aplicadores certificados|ASTM D6878 · ASTM D4434|Cubiertas planas de grandes superficies, cubiertas verdes|Blanca reflectiva (cool roof) · 20–30 años|Instalación especializada|c s a g",
"cub-verde|Cubierta verde extensiva (sistema)|cubierta|vanguardia|1000|0.40|Carga 80–150 kg/m² saturada|0.1|0.40|85|m²|Empresas de paisajismo e impermeabilización (sistemas multicapa)|FLL (DE) · ASTM E2777 · ASTM E2397|Losas de salud, educación, vivienda; retención pluvial|Reduce isla de calor · retiene lluvia · biodiversidad|Carga estructural · mantenimiento y riego|c s a g",
"cub-paja|Cubierta vegetal (paja de páramo, cade, hojas de palma)|cubierta|ancestral|150|0.07|No estructural|0.05|0.02|12|m²|Artesanos comunitarios (Sierra: paja; Costa: cade; Amazonía: palma)|Saber tradicional; sin norma|Turismo comunitario, chozas, pabellones|Excelente confort térmico · cero huella|Inflamable · mantenimiento cada 5–10 años|s c a",
"cub-shingle|Teja asfáltica (shingle)|cubierta|moderno|1100|0.17|Resistencia al viento clase F/H|1|0.80|18|m²|Importada vía distribuidores|ASTM D3462 · ASTM D7158|Vivienda con cubiertas inclinadas|Liviana · estética|Requiere tablero continuo (OSB/plywood)|s c",
"cub-sint|Teja sintética (PVC/ASA)|cubierta|moderno|1400|0.17|Impacto alto|20|3.00|9|m²|Distribuidores de cubiertas plásticas|Fabricante · ASTM D4226|Vivienda, cubiertas livianas con aspecto de teja|Liviana · no se corroe|Dilatación · ruido con lluvia|c s a",
"aca-enl|Enlucido cemento-arena 1:4|acabado|moderno|2000|1.00|Compresión ≈ 10 MPa|10|0.17|9.5|m² (APU)|Cemento Holcim / UNACEM; morteros premezclados nacionales|NTE INEN 2518 · ASTM C926|Revoque de mamposterías interiores y exteriores|Universal · protege la mampostería|Fisuras por retracción · peso|c s a g",
"aca-cal|Mortero de cal|acabado|tradicional|1700|0.80|Compresión ≈ 2 MPa|2|0.12|12|m² aplicado|Cal hidratada nacional (distribuidores)|ASTM C1707 · EN 459|Restauración patrimonial, muros de tierra, revoques transpirables|Transpirable · compatible con tierra y piedra|Fraguado lento|s c",
"aca-latex|Pintura látex vinil-acrílica|acabado|moderno|1300|0.20|Película 30–40 µm|1|2.90|25|galón (≈ 30 m²/mano)|Pinturas Cóndor; Pinturas Unidas|NTE INEN (pinturas arquitectónicas) · bajo COV (GS-11)|Paredes interiores y exteriores|Económica · fácil|Mantenimiento cada 3–5 años|c s a g",
"aca-elast|Pintura elastomérica impermeabilizante|acabado|moderno|1350|0.20|Elongación > 300 %|1|3.20|42|galón|Pinturas Cóndor; Pinturas Unidas; Sika Ecuador|ASTM D6083|Fachadas expuestas a lluvia de la Costa, losas|Puentea microfisuras|Precio|c s a g",
"aca-foto|Pintura fotocatalítica (TiO₂)|acabado|vanguardia|1400|0.20|Película|1|3.50|70|galón|Importada|ISO 22197 · ISO 27448|Fachadas descontaminantes, túneles|Degrada NOx · autolimpiante|Requiere luz UV|c s",
"aca-antib|Pintura antibacteriana grado hospitalario (ion plata)|acabado|vanguardia|1350|0.20|Lavable alta resistencia|1|3.50|55|galón|Fabricantes nacionales e importadas (verificar línea hospitalaria)|ISO 22196 · JIS Z 2801|Quirófanos, consultorios, pediatría|Inhibe microorganismos · lavable|Costo|c s a g",
"aca-micro|Microcemento|acabado|vanguardia|2000|1.20|Compresión ≈ 30 MPa · 2–3 mm|30|0.40|45|m² aplicado|Aplicadores especializados (sistemas importados)|Fabricante|Pisos y muros continuos sin juntas|Sin juntas · moderno|Mano de obra experta · fisuras sobre soportes inestables|c s a g",
"aca-epoxi|Piso epóxico autonivelante 2–3 mm|acabado|moderno|1500|0.30|Compresión ≈ 70 MPa|70|4.00|35|m²|Sika Ecuador; aplicadores especializados|ASTM C579 · ASTM D4060|Laboratorios, quirófanos, industria, parqueaderos|Continuo · químicamente resistente · higiénico|Resbaloso sin carga · amarillea al UV|c s a g",
"aca-vinil|Vinílico homogéneo hospitalario en rollo|acabado|moderno|1600|0.25|Desgaste grupo P (EN 660)|20|2.90|48|m²|Distribuidores de pisos técnicos importados|EN ISO 10581 · EN 649 · ISO 22196|Hospitales, pediatría, laboratorios (con curva sanitaria)|Termosoldado sin juntas · fácil desinfección|Precio · instalación especializada|c s a g",
"aca-spc|Piso SPC / LVT (vinílico rígido click)|acabado|moderno|2000|0.30|Capa de desgaste 0,3–0,5 mm|20|2.50|22|m²|Distribuidores de pisos importados|EN ISO 10582 · ASTM F3261|Vivienda, oficinas, comercio|100 % resistente al agua · rápido|Juntas: no apto para salud crítica|c s a g",
"aca-caucho|Piso de caucho (EPDM / reciclado)|acabado|moderno|1000|0.17|Absorción de impactos (HIC)|5|1.50|30|m²|Distribuidores e instaladores de pisos deportivos/infantiles|EN 1177 · ASTM F1292|Juegos infantiles, gimnasios, pediatría, deporte|Amortigua caídas · antideslizante|Olor inicial · se mancha|c s a g",
"aca-terrazo|Terrazo pulido|acabado|tradicional|2400|1.30|Compresión ≈ 30 MPa|30|0.25|45|m²|Talleres y marmolerías locales|NTMA · UNE-EN 13748|Pisos de alto tráfico: escuelas, hospitales, aeropuertos|Durabilidad de décadas · repulible|Juntas de dilatación · mano de obra|c s a g",
"aca-ming|Piso de madera de ingeniería|acabado|moderno|650|0.15|Capa noble 2–6 mm|20|0.80|55|m²|Distribuidores de pisos importados|EN 13489|Vivienda, hoteles, oficinas|Cálido · estable|Sensible a humedad y rayones|s c",
"aca-empaste|Empaste / enlucido de yeso|acabado|moderno|1100|0.40|Acabado liso|2|0.30|5|m²|Pinturas Cóndor; Pinturas Unidas; distribuidores|ASTM C842|Acabado liso interior previo a pintura|Superficie perfecta|Solo interiores secos|c s a g",
"aca-estuco|Estuco veneciano / cal pulida|acabado|tradicional|1700|0.70|Acabado|2|0.20|35|m² aplicado|Aplicadores especializados|Fabricante|Muros de alto valor estético|Lujo artesanal · transpirable|Mano de obra experta|c s",
"aca-sinter|Piedra sinterizada (superficie ultracompacta)|acabado|vanguardia|2500|1.30|Flexión ≈ 50 MPa|50|1.00|180|m²|Importada (España, Italia) vía distribuidores|ISO 10545 · EN 14411|Mesones, fachadas, pisos, quirófanos|Resiste calor, rayas y manchas|Costo · corte especializado|c s a g",
"aca-cuarzo|Cuarzo compacto|acabado|moderno|2400|1.40|Flexión ≈ 45 MPa|45|1.20|160|m²|Importado vía marmolerías|EN 14617|Mesones de cocinas, laboratorios, baños|No poroso · higiénico|Sílice cristalina en el corte · no apto exterior|c s a g",
"bio-mice|Micelio (biocompuesto fúngico)|bio|vanguardia|200|0.040|Compresión 0,2–1 MPa|0.5|0.10|60|m² (panel acústico)|Importado (p. ej. Mogu, Ecovative); investigación universitaria|ASTM E84 (ensayo de fuego) · fabricante|Paneles acústicos, aislamiento, mobiliario, pabellones (Hy-Fi, MoMA PS1)|Cultivado con residuos agrícolas · compostable|No estructural · sensible a humedad|s c",
"bio-bioc|Bioconcreto autorreparable (bacterias)|bio|vanguardia|2350|1.65|f'c 25–35 MPa · sella fisuras < 0,8 mm|30|0.12|170|m³|Aditivos bacterianos importados (p. ej. Basilisk)|EN 206 + fabricante|Estructuras hidráulicas, sótanos, túneles, ambiente marino|Prolonga la vida útil · menos mantenimiento|Costo · +30–50 % por m³|c s",
"bio-bmason|Ladrillo biocementado (biocalcificación)|bio|vanguardia|2000|0.90|Compresión ≈ 20 MPa|20|0.05|2|u|Importado (p. ej. bioMASON, EE. UU.)|ASTM C1272 (referencia)|Pavimentos, mampostería|Fabricado a temperatura ambiente|Oferta limitada|c s",
"bio-mtrans|Madera transparente|bio|vanguardia|1200|0.30|Tracción ≈ 90 MPa|90|1.00|0|— (laboratorio)|Investigación (KTH Suecia, Univ. de Maryland)|—|Ventanas y lucernarios del futuro|Mejor aislante que el vidrio · no se astilla|En fase de laboratorio|s c",
"bio-algas|Fachada biorreactiva de microalgas|bio|vanguardia|1100|0.60|Paneles de vidrio con cultivo|20|5.00|1500|m² de fachada|Importado (prototipo BIQ, Hamburgo)|Fabricante|Fachadas productoras de biomasa y sombra|Genera calor y biomasa · sombra dinámica|Costo y mantenimiento muy altos|c",
"bio-paja|Tablero de paja comprimida|bio|vanguardia|380|0.08|Flexión ≈ 3 MPa|3|0.10|35|m² (58 mm)|Importado|EN 13171 (referencia) · fabricante|Tabiques, cielos, prefabricados|Residuo agrícola · aislante|Humedad|s",
"bio-arroz|Tablero / aislante de cascarilla de arroz|bio|vanguardia|450|0.08|Flexión ≈ 8 MPa|8|0.10|15|m² (experimental)|Potencial local: Guayas y Los Ríos concentran el arroz nacional (investigación universitaria)|Fabricante · ASTM C518|Tableros, rellenos aislantes, ceniza puzolánica para cemento|Residuo abundante en Guayas|Industria incipiente|c",
"bio-abaca|Fibra de abacá / cabuya en compuestos|bio|tradicional|1300|0.06|Tracción fibra ≈ 400–800 MPa|400|0.05|2|kg de fibra|Productores de abacá de Santo Domingo y Esmeraldas; cabuya de la Sierra|ASTM D3822 (fibras)|Refuerzo de morteros, paneles, geotextiles, cuerdas|Ecuador es gran productor mundial de abacá|Durabilidad en matriz alcalina|c s"
];
var MATS=MAT_RAW.map(function(l){
  var a=l.split("|");
  return {id:a[0],n:a[1],f:a[2],e:a[3],d:+a[4],l:+a[5],r:a[6],rm:+a[7],co:+a[8],c:+a[9],u:a[10],pv:a[11],nm:a[12],us:a[13],pro:a[14],con:a[15],z:a[16].split(" ")};
});
var MATI={}; MATS.forEach(function(m){ MATI[m.id]=m; });

/* Sistemas constructivos: secuencia de obra real, rendimiento, plazos.
   k = factor de duración frente al pórtico de H.A. tradicional (1 = igual); fc = factor de costo del capítulo de estructura. */
var SIS=[
{id:"s-portico",n:"Pórtico de hormigón armado + losa alivianada",g:"HA",ap:"Apto NEC zona V–VI (pórticos especiales resistentes a momento, NEC-SE-DS)",k:1,fc:1,mat:["hor-210","hor-280","ace-var","mam-b15","ais-eps"],
 rend:"Losa alivianada 20–25 cm: 30–45 m²/día por cuadrilla de 12 · columnas: 1 nivel cada 7–10 días",plazo:"Estructura de planta tipo de 500 m²: 2–3 semanas",
 pasos:["Replanteo y nivelación con estación total; ejes y cotas referidos a BM","Excavación de plintos/zapatas y mejoramiento de suelo (sub-base compactada al 95 % Proctor)","Replantillo f'c 180 (5 cm) y armado de plintos y cadenas; inspección de acero","Hormigonado de cimentación f'c 240–280 con vibrado y curado 7 días","Armado de columnas (estribos a 10 cm en zonas de confinamiento NEC) y encofrado aplomado","Hormigonado de columnas por etapas ≤ 1,5 m de caída libre","Encofrado de losa: puntales metálicos cada 1 m, tableros, alivianamientos (bloque o EPS)","Armado de vigas y nervios, mallas de temperatura, pasantes de instalaciones","Hormigonado continuo de losa con bomba, toma de cilindros (NTE INEN 1576/1573)","Curado húmedo ≥ 7 días; desencofrado de fondos a los 14–21 días; repetir por nivel","Mampostería de relleno con juntas sísmicas y chicotes anclados a columnas"],
 pro:"Mano de obra y materiales disponibles en todo el país · monolítico · resistente al fuego",con:"Lento · pesado (mayor fuerza sísmica) · alto consumo de encofrado y agua",nm:"NEC-SE-HM · NEC-SE-DS · ACI 318-19"},
{id:"s-muros",n:"Muros portantes de hormigón con formaleta industrializada",g:"HA",ap:"Apto zona V–VI (muros estructurales, NEC-SE-DS; vivienda social masiva)",k:0.6,fc:1.05,mat:["hor-240","ace-malla","ace-var"],
 rend:"1 vivienda o 1 planta de 300–400 m² por ciclo diario con juego de formaletas de aluminio",plazo:"Edificio de 5 pisos × 400 m²: 6–8 semanas de obra gris",
 pasos:["Diseño de modulación de formaleta (ventanas, puertas y ductos fijos)","Losa de cimentación con arranques de malla y tubería embebida","Colocación de mallas electrosoldadas dobles y refuerzos de borde","Instalaciones eléctricas y sanitarias embebidas antes de cerrar formaleta","Montaje de formaletas de aluminio con desmoldante y corbatas","Vaciado monolítico muros + losa con hormigón fluido o SCC","Desencofrado a las 12–16 h (ciclo de 24 h) y curado con membrana","Repetición del ciclo por nivel; resanes mínimos (sin enlucido)"],
 pro:"Velocidad industrial · terminación lisa · muy sismorresistente",con:"Rigidez de la planta (no se pueden mover muros) · inversión en formaletas · acústica entre unidades",nm:"NEC-SE-HM · NEC-SE-VIVIENDA · ACI 318 cap. 11/18"},
{id:"s-confinada",n:"Mampostería confinada",g:"MAM",ap:"Apto zona V para 1–3 pisos (NEC-SE-VIVIENDA / NEC-SE-MP)",k:0.95,fc:0.8,mat:["mam-b15","cer-cuenca","hor-210","ace-var"],
 rend:"Mampostería 10–12 m²/día por albañil + ayudante; columnetas cada ≤ 4 m",plazo:"Vivienda de 2 pisos (120 m²): 10–14 semanas obra gris",
 pasos:["Cimiento corrido de hormigón ciclópeo y cadena de amarre","Arranques de columnetas de confinamiento (≤ 4 m entre sí y en intersecciones)","Levantamiento de mampostería con trabazón y endentado hacia columnetas","Vaciado de columnetas contra la mampostería (confinamiento real)","Viga de amarre superior y dinteles","Losa de entrepiso o cubierta liviana","Repetir para segunda planta (máx. 2–3 pisos en NEC-SE-VIVIENDA)"],
 pro:"Económico · técnica conocida · buen desempeño si se respeta la secuencia",con:"Limitado en altura · ductos y vanos restringidos",nm:"NEC-SE-VIVIENDA · NEC-SE-MP"},
{id:"s-reforzada",n:"Mampostería estructural reforzada",g:"MAM",ap:"Apto zona V–VI hasta ~5 pisos con diseño (NEC-SE-MP)",k:0.85,fc:0.85,mat:["mam-b20","ace-var","hor-210"],
 rend:"8–10 m²/día por cuadrilla; grout cada 1,2 m de altura",plazo:"Edificio de 4 pisos × 300 m²: 4–5 meses obra gris",
 pasos:["Losa o vigas de cimentación con arranques de varilla en cada celda reforzada","Colocación de bloques estructurales con mortero tipo S/M","Varillas verticales y escalerillas horizontales cada 2–3 hiladas","Ventanas de limpieza en la base de celdas a llenar","Llenado con grout (micro-hormigón fluido) cada 1,2–1,5 m","Vigas de amarre (bond-beam) en cada nivel","Losas prefabricadas o vaciadas apoyadas en muros"],
 pro:"Estructura y cerramiento en uno · ahorro de encofrado",con:"Control de calidad estricto · planificación de instalaciones obligatoria",nm:"NEC-SE-MP · TMS 402/602"},
{id:"s-metal",n:"Estructura metálica + losa con steel deck",g:"ACE",ap:"Apto zona V–VI (pórticos especiales SMF o arriostrados SCBF/EBF, NEC-SE-AC)",k:0.65,fc:1.2,mat:["ace-a572","ace-a36","ace-deck","hor-240","ace-malla"],
 rend:"Montaje 8–15 t/día con grúa · deck: 300–500 m²/día",plazo:"Edificio de 6 pisos × 800 m²: 3–4 meses estructura",
 pasos:["Planos de taller y fabricación en planta (cortes CNC, soldadura calificada AWS D1.1/D1.8)","Cimentación con pernos de anclaje con plantilla","Montaje de columnas y vigas principales con grúa; nivelación y aplome","Conexiones empernadas/soldadas e inspección (ultrasonido, tintas)","Colocación de placa colaborante y conectores de corte (stud weld)","Malla de temperatura y hormigonado de losa (sin encofrado)","Protección anticorrosiva y contra fuego (intumescente / mortero proyectado)"],
 pro:"Rapidez · liviandad · grandes luces · obra seca y limpia",con:"Protección contra fuego y corrosión (Costa) · mano de obra calificada",nm:"NEC-SE-AC · AISC 360/341 · AWS D1.1/D1.8"},
{id:"s-sf",n:"Steel framing (perfiles galvanizados livianos)",g:"ACE",ap:"Apto para 1–3 pisos con diseño (AISI S240/S400)",k:0.5,fc:0.9,mat:["ace-sf","pla-fc","mad-osb","pla-rh","ais-vidrio"],
 rend:"Paneles: 40–60 m²/día por cuadrilla de 4",plazo:"Vivienda de 120 m²: 6–8 semanas hasta acabados",
 pasos:["Platea de cimentación nivelada ±3 mm","Montaje de soleras ancladas y paneles de pared (montantes a 40–60 cm)","Arriostramiento con cintas en X o placas estructurales (OSB/fibrocemento)","Entrepisos con vigas C y tablero","Cerchas o cabios de cubierta","Instalaciones por el interior de los paneles","Aislamiento (lana mineral) y barrera de vapor/hidrófuga","Placas exteriores + sistema EIFS o fibrocemento; placas interiores de yeso"],
 pro:"Rápido · liviano · obra seca",con:"Percepción de 'casa liviana' · puentes térmicos · requiere detalles de humedad en Costa",nm:"AISI S100/S240/S400 · NEC-SE-VIVIENDA"},
{id:"s-prefa",n:"Prefabricado de hormigón (pretensado)",g:"HA",ap:"Apto con conexiones emuladas o húmedas (ACI 550; NEC-SE-HM)",k:0.6,fc:1.1,mat:["hor-350","ace-tor","hor-scc"],
 rend:"Montaje 20–40 piezas/día con grúa",plazo:"Nave o parqueadero de 5.000 m²: 3–4 meses",
 pasos:["Diseño con modulación de piezas y conexiones","Fabricación en planta (pistas de pretensado, curado a vapor)","Cimentación con cálices o placas de anclaje","Transporte con planificación de rutas","Montaje de columnas, vigas y losas alveolares/TT con grúa","Conexiones húmedas y topping de compresión","Sellado de juntas"],
 pro:"Calidad industrial · grandes luces · rapidez",con:"Logística de transporte · conexiones sísmicas críticas",nm:"ACI 318 · ACI 550 · PCI Design Handbook"},
{id:"s-eps",n:"Paneles de EPS con malla (tipo Hormi2/M2)",g:"MAM",ap:"Apto con diseño para 1–4 pisos (sistemas aprobados por el MIDUVI/NEC)",k:0.6,fc:0.85,mat:["mam-eps","ace-malla","aca-enl"],
 rend:"Montaje de paneles 60–80 m²/día · proyección de mortero 80 m²/día con máquina",plazo:"Vivienda de 2 pisos: 6–8 semanas obra gris",
 pasos:["Losa de cimentación con chicotes de anclaje","Montaje y aplome de paneles con mallas de unión en esquinas","Refuerzos de vanos y mallas angulares","Pasar instalaciones fundiendo canales en el EPS","Proyección de micro-hormigón en dos capas por cara (3,5 cm)","Paneles de losa con capa de compresión","Curado y acabados"],
 pro:"Aislamiento térmico · liviano · rápido",con:"Dependencia del proveedor · difícil modificar después",nm:"NEC-SE-VIVIENDA · certificados del fabricante"},
{id:"s-guadua",n:"Estructura de guadúa",g:"BIO",ap:"Apto NEC-SE-GUADÚA hasta 2 pisos",k:0.7,fc:0.6,mat:["bam-guadua","bam-encem","hor-210","ace-var"],
 rend:"Pórticos de guadúa: 15–25 m²/día por cuadrilla capacitada",plazo:"Vivienda de 2 pisos: 8–10 semanas",
 pasos:["Selección de culmos maduros (4–6 años), corte en menguante, preservado por inmersión en bórax/ácido bórico","Secado bajo cubierta hasta CH ≤ 15 %","Cimentación y sobrecimiento ≥ 20 cm sobre terreno (la guadúa nunca toca el suelo)","Anclajes con varilla y mortero en entrenudos (uniones NEC)","Pórticos, diagonales y entrepisos","Cubierta con alero ≥ 1 m (protección de lluvia y sol)","Muros de bahareque encementado","Mantenimiento de laca/aceite cada 2–3 años"],
 pro:"Bajo carbono · sismorresistente · material ecuatoriano",con:"Diseño de uniones · percepción social · protección frente al agua",nm:"NEC-SE-GUADÚA · ISO 22156 · ISO 22157"},
{id:"s-tierra",n:"Tierra reforzada (tapial / adobe / BTC)",g:"BIO",ap:"Solo 1 piso con refuerzos (geomalla, caña, madera); no cubierto por NEC — E.080 Perú",k:1.3,fc:0.5,mat:["tie-tapial","tie-adobe","tie-btc","pie-rio"],
 rend:"Tapial: 1,5–3 m³/día por cuadrilla de 4 · adobe: 300–500 u/día",plazo:"Vivienda de 1 piso (80 m²): 3–4 meses",
 pasos:["Análisis de suelo (granulometría, plasticidad, prueba del rollo/caja)","Cimiento de piedra y sobrecimiento ≥ 30 cm","Fabricación y secado de adobes (≥ 28 días) o encofrado de tapial","Muros con refuerzo vertical/horizontal (caña, geomalla) y viga collar de madera","Cubierta liviana con aleros amplios","Revoques de tierra/cal transpirables"],
 pro:"Confort térmico · huella mínima · patrimonio",con:"Sismo · normativa limitada · mano de obra intensiva",nm:"E.080 (Perú) · NZS 4297/4298/4299 · ASTM E2392"},
{id:"s-madligera",n:"Entramado ligero de madera (platform frame)",g:"MAD",ap:"Apto 1–3 pisos con diseño (NEC-SE-MD)",k:0.55,fc:0.85,mat:["mad-pino","mad-osb","mad-contra","ais-vidrio","pla-fc"],
 rend:"Paneles 40–60 m²/día",plazo:"Vivienda de 2 pisos: 8–10 semanas",
 pasos:["Platea o vigas de cimentación con barrera anti-humedad","Soleras preservadas y ancladas","Paneles de muro (pie derecho a 40–60 cm) y arriostramiento OSB","Plataforma de entrepiso","Segundo nivel y cubierta","Aislamiento, barreras y revestimientos"],
 pro:"Rápido · liviano · bajo carbono",con:"Termitas y humedad (Costa/Amazonía) · fuego",nm:"NEC-SE-MD · AWC NDS · IRC"},
{id:"s-clt",n:"Madera masiva (CLT + glulam)",g:"MAD",ap:"Apto con diseño especializado (EN 1995-1-1 / NDS; no explícito en NEC)",k:0.45,fc:1.4,mat:["mad-clt","mad-glulam","ace-inox"],
 rend:"Montaje 100–200 m²/día de losa/muro con grúa",plazo:"Edificio de 8 pisos × 600 m²: 4–5 meses estructura",
 pasos:["Diseño BIM con fabricación CNC (aberturas precortadas)","Núcleo de hormigón para escaleras/ascensores (estabilidad lateral)","Montaje de columnas de glulam y paneles CLT con grúa","Uniones con tornillos autoperforantes y placas de acero","Protección temporal de lluvia durante el montaje","Capa de compresión/acústica y acabados"],
 pro:"Montaje en seco ultrarrápido · almacena carbono · confort",con:"Importado · humedad y termitas en trópico · seguros y normativa",nm:"EN 1995 · ANSI/APA PRG 320 · IBC 2021 tipo IV"},
{id:"s-modular",n:"Construcción modular volumétrica",g:"IND",ap:"Apto con diseño de conexiones intermódulo",k:0.4,fc:1.15,mat:["ace-sf","ace-tub","pla-rh","ais-roca"],
 rend:"8–20 módulos/día en montaje",plazo:"Edificio de 40 habitaciones: 3–4 meses (fábrica y sitio en paralelo)",
 pasos:["Diseño estandarizado y planos de fábrica (DfMA)","Cimentación en sitio en paralelo a la fabricación","Fabricación de módulos con acabados e instalaciones en planta","Transporte (límite vial ~3,5 × 12 m)","Izaje y conexión de módulos","Conexión de instalaciones verticales y sellado de juntas"],
 pro:"Plazo −30 a −50 % · calidad controlada",con:"Logística vial · repetición obligada",nm:"ICC 1200/1205 · NEC aplicable al material"},
{id:"s-post",n:"Losas postensadas (losa plana)",g:"HA",ap:"Apto con muros/pórticos sismorresistentes (ACI 318 cap. 8 y 18)",k:0.85,fc:1.05,mat:["hor-280","ace-tor","ace-var"],
 rend:"Losa de 600–800 m² por ciclo de 6–8 días",plazo:"Parqueaderos u oficinas de 6 pisos: 4–5 meses estructura",
 pasos:["Diseño de trazado de tendones (perfil parabólico)","Encofrado plano y armado pasivo mínimo","Colocación de vainas, torones y anclajes activos/pasivos","Hormigonado y curado","Tesado al 75 % de f'c (3–5 días) con gatos calibrados","Corte de puntas y sellado de anclajes"],
 pro:"Luces de 8–12 m con 20–25 cm · plantas libres",con:"Perforaciones posteriores restringidas · subcontrato especializado",nm:"ACI 318 · PTI DC10.5"},
{id:"s-mixto",n:"Sistema mixto (columnas compuestas + vigas metálicas)",g:"ACE",ap:"Apto zona V–VI (AISC 341 cap. G/H)",k:0.75,fc:1.15,mat:["ace-tub","hor-scc","ace-deck","ace-a572"],
 rend:"1 nivel cada 5–7 días",plazo:"Edificio de 10 pisos × 700 m²: 5–6 meses estructura",
 pasos:["Montaje de tubos/columnas metálicas","Relleno de columnas con hormigón autocompactante","Vigas metálicas y steel deck","Losas compuestas","Protección contra fuego (el hormigón aporta resistencia)"],
 pro:"Lo mejor del acero y del hormigón · columnas esbeltas",con:"Coordinación de dos oficios",nm:"AISC 360/341 · NEC-SE-AC"},
{id:"s-3d",n:"Impresión 3D en hormigón",g:"IND",ap:"Experimental: requiere refuerzo y validación (ICC-ES AC509)",k:0.5,fc:1.1,mat:["hor-geo","hor-fibra","ace-var"],
 rend:"Muros de vivienda de 80 m²: 24–48 h de impresión",plazo:"Vivienda de 1 piso: 3–5 semanas",
 pasos:["Modelo digital y trayectoria de impresión (slicing)","Losa de cimentación nivelada","Montaje de la impresora pórtico/brazo","Impresión de muros por capas con mortero especial","Inserción de refuerzo vertical y dinteles","Cubierta convencional e instalaciones"],
 pro:"Formas libres · sin encofrado · menos desperdicio",con:"Normativa inexistente en Ecuador · refuerzo sísmico complejo",nm:"ICC-ES AC509 · UL 3401"},
{id:"s-tenso",n:"Membranas tensadas y cubiertas textiles",g:"IND",ap:"Cubiertas livianas: el sismo no gobierna; gobierna el viento",k:0.5,fc:1.3,mat:["pol-ptfe","pol-etfe","ace-tub","ace-inox"],
 rend:"Membrana 300–800 m²/día en izaje",plazo:"Cubierta de 2.000 m²: 3–4 meses (diseño + fabricación + montaje)",
 pasos:["Form-finding y análisis de viento","Patronaje y confección en fábrica","Mástiles, anillos y cimentaciones a tracción","Izaje y tensado progresivo","Ajuste de pretensión y sellos"],
 pro:"Grandes luces con poquísimo material · luz difusa",con:"Diseño y montaje especializados · acústica",nm:"ASCE 55 · EN 17117 · CEN/TS 19102"},
{id:"s-ciclopeo",n:"Cimentaciones profundas y sótanos (pantallas / pilotes)",g:"HA",ap:"Necesario en suelos blandos de Guayaquil y Daule (arcillas, NEC-SE-GC)",k:1.2,fc:1.3,mat:["hor-280","ace-var","pol-hdpe"],
 rend:"Pilotes preexcavados Ø 60–100 cm: 2–4 pilotes/día por equipo",plazo:"Cimentación profunda de 2.000 m²: 6–10 semanas",
 pasos:["Estudio geotécnico con SPT/CPTu y ensayos de laboratorio (NEC-SE-GC)","Diseño de pilotes y cabezales","Excavación con lodo bentonítico o camisa","Colocación de canastilla de acero","Hormigonado con tubo tremie","Ensayos de integridad (PIT) y carga","Descabezado y cabezales/vigas de cimentación"],
 pro:"Única solución en suelos blandos con nivel freático alto",con:"Costo y plazo · equipos pesados",nm:"NEC-SE-GC · ACI 543R · ACI 336"}
];
var SISI={}; SIS.forEach(function(s){ SISI[s.id]=s; });
var SISG={HA:"Hormigón",MAM:"Mampostería",ACE:"Acero",BIO:"Bio / tierra",MAD:"Madera",IND:"Industrializado"};

var CAPAS=[["est","Estructura","hormigon acero madera bambu mamposteria tierra piedra"],["env","Envolvente","mamposteria ceramico vidrio placa aislante noferroso polimero tierra bio"],["cub","Cubierta","cubierta aislante polimero vidrio"],["pis","Pisos","acabado ceramico piedra madera bambu"],["int","Acabados interiores","acabado placa ceramico madera bio"]];

function zonaCod(ctx){ var z=ctx&&ctx.clima&&ctx.clima.zona; return {costa:"c",sierra:"s",amazonia:"a",galapagos:"g"}[z]||null; }
function areaConstr(ctx){ var cus=(ctx.P&&ctx.P.norm&&+ctx.P.norm.cus)||1.2; return Math.round((ctx.area||1000)*cus); }

/* ── Muestras (texturas SVG generadas por familia) ── */
function tex(m,W,H){
  W=W||120; H=H||80; var r=rng(hash(m.id)); var f=FAM[m.f]; var hu=(f.h+Math.floor(r()*24)-12+360)%360;
  var L=function(a,b){ return Math.round(a+r()*(b-a)); };
  var s='<svg viewBox="0 0 '+W+' '+H+'" preserveAspectRatio="xMidYMid slice" width="100%" height="100%" aria-hidden="true">', i, x, y;
  var base={tierra:"hsl("+hu+",38%,30%)",piedra:"hsl("+hu+",8%,"+L(26,40)+"%)",madera:"hsl("+hu+",45%,"+L(24,38)+"%)",bambu:"hsl("+hu+",38%,30%)",ceramico:"hsl("+hu+",50%,30%)",
    mamposteria:"hsl(210,6%,30%)",hormigon:"hsl(205,5%,"+L(30,40)+"%)",acero:"hsl(215,12%,22%)",noferroso:"hsl("+hu+",14%,34%)",vidrio:"hsl(188,60%,14%)",polimero:"hsl("+hu+",40%,20%)",
    aislante:"hsl("+hu+",55%,32%)",placa:"hsl(210,8%,42%)",cubierta:"hsl("+hu+",30%,26%)",acabado:"hsl("+hu+",22%,"+L(24,40)+"%)",bio:"hsl("+hu+",30%,18%)"}[m.f];
  if(m.id==="cob-cobre") base="hsl(22,55%,38%)"; if(m.id==="mad-balsa") base="hsl(40,40%,58%)"; if(m.id==="ace-corten") base="hsl(18,60%,28%)";
  s+='<rect width="'+W+'" height="'+H+'" fill="'+base+'"/>';
  var st=function(c,o,w){ return ' stroke="'+c+'" stroke-opacity="'+o+'" stroke-width="'+(w||1)+'" fill="none"'; };
  switch(m.f){
    case "tierra":
      for(i=0;i<70;i++) s+='<circle cx="'+L(0,W)+'" cy="'+L(0,H)+'" r="'+(r()*1.8+.3).toFixed(1)+'" fill="hsl('+hu+',40%,'+L(15,55)+'%)" opacity="'+(r()*.7+.2).toFixed(2)+'"/>';
      for(i=0;i<(m.id==="tie-aliv"||m.id==="tie-bahareque"?16:5);i++){ x=L(0,W); y=L(0,H); s+='<path d="M'+x+' '+y+'l'+L(-14,14)+' '+L(-5,5)+'"'+st("hsl(48,70%,70%)",.5,.8)+'/>'; }
      if(m.id==="tie-tapial") for(i=1;i<5;i++) s+='<path d="M0 '+(i*H/5+L(-2,2))+' Q'+W/2+' '+(i*H/5+L(-3,3))+' '+W+' '+(i*H/5)+'"'+st("#000",.35,1.2)+'/>';
      if(m.id==="tie-adobe"||m.id==="tie-btc") for(y=0;y<H;y+=20){ var o=(y/20)%2?-20:0; for(x=o;x<W;x+=40) s+='<rect x="'+(x+1)+'" y="'+(y+1)+'" width="38" height="18"'+st("#000",.4,1.5)+'/>'; }
      break;
    case "piedra":
      y=0; while(y<H){ var rh=L(14,26); x=-L(0,20); while(x<W){ var rw=L(18,40); s+='<rect x="'+(x+1.5)+'" y="'+(y+1.5)+'" width="'+(rw-3)+'" height="'+(rh-3)+'" rx="'+L(2,6)+'" fill="hsl('+hu+',8%,'+L(28,52)+'%)" stroke="#000" stroke-opacity=".5"/>'; x+=rw; } y+=rh; }
      for(i=0;i<40;i++) s+='<circle cx="'+L(0,W)+'" cy="'+L(0,H)+'" r=".6" fill="#fff" opacity=".35"/>';
      break;
    case "madera":
      for(i=0;i<16;i++){ y=i*H/16+L(-2,2); s+='<path d="M0 '+y+' C'+W*.3+' '+(y+L(-6,6))+' '+W*.6+' '+(y+L(-6,6))+' '+W+' '+(y+L(-3,3))+'"'+st("hsl("+hu+",50%,"+L(12,22)+"%)",.8,L(1,2))+'/>'; }
      s+='<ellipse cx="'+L(20,W-20)+'" cy="'+L(15,H-15)+'" rx="'+L(4,8)+'" ry="'+L(2,4)+'"'+st("hsl("+hu+",50%,12%)",.9,1.5)+'/>';
      if(/clt|glulam|lvl|contra|osb|mdp/.test(m.id)) for(y=H/5;y<H;y+=H/5) s+='<line x1="0" x2="'+W+'" y1="'+y+'" y2="'+y+'"'+st("#000",.5,1.4)+'/>';
      break;
    case "bambu":
      for(x=4;x<W;x+=L(14,20)){ var bw=L(10,14); s+='<rect x="'+x+'" y="-2" width="'+bw+'" height="'+(H+4)+'" rx="5" fill="hsl('+(hu+L(-8,8))+',42%,'+L(36,52)+'%)" stroke="#000" stroke-opacity=".4"/>'; for(y=L(4,18);y<H;y+=L(22,30)) s+='<rect x="'+(x-1)+'" y="'+y+'" width="'+(bw+2)+'" height="3" rx="1.5" fill="hsl('+hu+',40%,22%)"/>'; }
      break;
    case "ceramico": case "mamposteria":
      var bh=m.f==="mamposteria"?20:(m.id==="cer-porce"||m.id==="cer-cera"||m.id==="cer-gres"?40:12), bwid=m.f==="mamposteria"?40:(bh===40?40:28);
      for(y=0;y<H;y+=bh){ var off=((y/bh)%2)?-bwid/2:0; for(x=off;x<W;x+=bwid){
        s+='<rect x="'+(x+1)+'" y="'+(y+1)+'" width="'+(bwid-2)+'" height="'+(bh-2)+'" fill="hsl('+(m.f==="mamposteria"?210:hu+L(-6,6))+','+(m.f==="mamposteria"?6:L(40,60))+'%,'+L(28,44)+'%)"/>';
        if(m.f==="mamposteria"){ s+='<rect x="'+(x+6)+'" y="'+(y+5)+'" width="11" height="'+(bh-10)+'" fill="#000" opacity=".35"/><rect x="'+(x+bwid-17)+'" y="'+(y+5)+'" width="11" height="'+(bh-10)+'" fill="#000" opacity=".35"/>'; }
        if(m.id==="cer-celosia") s+='<circle cx="'+(x+bwid/2)+'" cy="'+(y+bh/2)+'" r="'+(bh/3)+'" fill="#000" opacity=".55"/>';
      } }
      if(bh===40) s+='<path d="M0 0 L'+W+' '+H+'"'+st("#fff",.12,18)+'/>';
      break;
    case "hormigon":
      for(i=0;i<120;i++) s+='<circle cx="'+L(0,W)+'" cy="'+L(0,H)+'" r="'+(r()*1.4+.2).toFixed(1)+'" fill="hsl(0,0%,'+L(15,70)+'%)" opacity="'+(r()*.5+.2).toFixed(2)+'"/>';
      if(m.id==="hor-visto"||m.id==="hor-scc"||m.id==="hor-uhpc"){ for(x=W/3;x<W;x+=W/3) s+='<line x1="'+x+'" x2="'+x+'" y1="0" y2="'+H+'"'+st("#000",.35)+'/>'; for(i=0;i<6;i++) s+='<circle cx="'+((i%3+.5)*W/3)+'" cy="'+(i<3?H*.28:H*.72)+'" r="2.4" fill="#000" opacity=".5"/>'; }
      if(m.id==="hor-perm") for(i=0;i<60;i++) s+='<circle cx="'+L(0,W)+'" cy="'+L(0,H)+'" r="'+(r()*2+1).toFixed(1)+'" fill="#000" opacity=".55"/>';
      if(m.id==="hor-trans") for(i=0;i<80;i++) s+='<circle cx="'+L(0,W)+'" cy="'+L(0,H)+'" r="1" fill="#fffbe0" opacity="'+(r()*.8+.2).toFixed(2)+'"/>';
      if(m.id==="hor-hemp") for(i=0;i<40;i++){ x=L(0,W); y=L(0,H); s+='<path d="M'+x+' '+y+'l'+L(-6,6)+' '+L(-3,3)+'"'+st("hsl(45,40%,70%)",.6,1.4)+'/>'; }
      break;
    case "acero":
      for(i=-H;i<W;i+=5) s+='<line x1="'+i+'" y1="'+H+'" x2="'+(i+H)+'" y2="0"'+st("hsl(210,20%,"+L(30,50)+"%)",.35,.8)+'/>';
      if(m.id==="ace-var"||m.id==="ace-tor") for(y=10;y<H;y+=16){ s+='<rect x="0" y="'+y+'" width="'+W+'" height="6" fill="hsl(15,12%,40%)"/>'; for(x=2;x<W;x+=6) s+='<line x1="'+x+'" y1="'+y+'" x2="'+(x+3)+'" y2="'+(y+6)+'"'+st("#000",.5)+'/>'; }
      else if(m.id==="ace-malla") { for(x=8;x<W;x+=15) s+='<line x1="'+x+'" x2="'+x+'" y1="0" y2="'+H+'"'+st("hsl(15,15%,55%)",.9,2)+'/>'; for(y=8;y<H;y+=15) s+='<line y1="'+y+'" y2="'+y+'" x1="0" x2="'+W+'"'+st("hsl(15,15%,55%)",.9,2)+'/>'; }
      else { s+='<path d="M'+W*.25+' '+H*.15+'h'+W*.5+'v8h-'+(W*.5/2-3)+'v'+(H*.7-16)+'h'+(W*.5/2-3)+'v8h-'+W*.5+'v-8h'+(W*.5/2-3)+'v-'+(H*.7-16)+'h-'+(W*.5/2-3)+'Z" fill="hsl(210,14%,40%)" stroke="var(--acc)" stroke-opacity=".5"/>'; }
      for(i=0;i<4;i++) s+='<circle cx="'+(i%2?W-7:7)+'" cy="'+(i<2?7:H-7)+'" r="2.2" fill="hsl(210,10%,60%)"/>';
      break;
    case "noferroso":
      for(y=0;y<H;y+=1.5) s+='<line x1="0" x2="'+W+'" y1="'+y+'" y2="'+y+'"'+st("hsl(0,0%,"+L(40,80)+"%)",(r()*.25).toFixed(2),.6)+'/>';
      if(m.id==="alu-perf") for(y=6;y<H;y+=9) for(x=(y%18?6:10);x<W;x+=9) s+='<circle cx="'+x+'" cy="'+y+'" r="2.4" fill="#000" opacity=".6"/>';
      if(m.id==="alu-espuma") for(i=0;i<50;i++) s+='<circle cx="'+L(0,W)+'" cy="'+L(0,H)+'" r="'+L(2,6)+'"'+st("#000",.5)+'/>';
      break;
    case "vidrio":
      s+='<rect width="'+W+'" height="'+H+'" fill="rgba(56,225,255,.18)"/>';
      for(i=0;i<3;i++){ x=L(0,W); s+='<polygon points="'+x+',0 '+(x+L(8,22))+',0 '+(x-30)+','+H+' '+(x-40)+','+H+'" fill="#fff" opacity="'+(.06+r()*.12).toFixed(2)+'"/>'; }
      if(m.id==="vid-dvh"||m.id==="vid-electro") s+='<rect x="'+(W*.45)+'" y="0" width="4" height="'+H+'" fill="#000" opacity=".5"/>';
      if(m.id==="vid-electro") s+='<rect width="'+(W*.45)+'" height="'+H+'" fill="#1a2a6c" opacity=".55"/>';
      if(m.id==="vid-bipv") for(y=4;y<H;y+=14) for(x=4;x<W;x+=14) s+='<rect x="'+x+'" y="'+y+'" width="12" height="12" fill="#0b1a4a" stroke="#7fb3ff" stroke-opacity=".5" stroke-width=".5"/>';
      if(m.id==="vid-bloque"||m.id==="vid-u") for(x=0;x<W;x+=20) s+='<line x1="'+x+'" x2="'+x+'" y1="0" y2="'+H+'"'+st("#9fe",.5,2)+'/>';
      break;
    case "polimero":
      if(m.id==="pol-etfe"){ for(y=0;y<H+20;y+=26) for(x=(y/26)%2?-13:0;x<W+20;x+=26) s+='<ellipse cx="'+x+'" cy="'+y+'" rx="12" ry="12"'+st("var(--acc)",.6,1)+' fill="rgba(180,240,255,.08)"/>'; }
      else { var hx=10; for(y=0;y<H+hx;y+=hx*1.5) for(x=((y/(hx*1.5))%2?hx*.87:0);x<W+hx;x+=hx*1.74) s+='<path d="M'+x+' '+(y-hx)+'l'+(hx*.87)+' '+(hx/2)+'v'+hx+'l-'+(hx*.87)+' '+(hx/2)+'l-'+(hx*.87)+' -'+(hx/2)+'v-'+hx+'Z"'+st("hsl("+hu+",80%,70%)",.35,.8)+'/>'; }
      break;
    case "aislante":
      for(i=0;i<34;i++){ x=L(-10,W); y=L(0,H); s+='<path d="M'+x+' '+y+' q'+L(5,12)+' '+L(-8,8)+' '+L(12,24)+' 0 t'+L(12,24)+' 0"'+st("hsl("+(hu+L(-10,10))+",60%,"+L(45,75)+"%)",(.4+r()*.4).toFixed(2),L(1,3))+'/>'; }
      if(m.id==="ais-eps"||m.id==="ais-xps"||m.id==="ais-pir") { s+='<rect width="'+W+'" height="'+H+'" fill="hsl('+hu+',20%,85%)" opacity=".55"/>'; for(i=0;i<70;i++) s+='<circle cx="'+L(0,W)+'" cy="'+L(0,H)+'" r="'+L(2,4)+'"'+st("#000",.15)+'/>'; }
      if(m.id==="ais-aero") s+='<rect width="'+W+'" height="'+H+'" fill="#bfe8ff" opacity=".3"/>';
      if(m.id==="ais-refl") s+='<rect width="'+W+'" height="'+H+'" fill="#dfe6ee" opacity=".55"/>';
      break;
    case "placa":
      for(x=0;x<W;x+=W/2) s+='<line x1="'+x+'" x2="'+x+'" y1="0" y2="'+H+'"'+st("#000",.5,1.5)+'/>';
      for(x=6;x<W;x+=W/2-6) for(y=8;y<H;y+=16) s+='<circle cx="'+x+'" cy="'+y+'" r="1.1" fill="#000" opacity=".55"/>';
      if(m.id==="pla-rh") s+='<rect width="'+W+'" height="'+H+'" fill="#2fa36b" opacity=".35"/>';
      if(m.id==="pla-rf") s+='<rect width="'+W+'" height="'+H+'" fill="#d84a5e" opacity=".3"/>';
      break;
    case "cubierta":
      if(m.id==="cub-teja"||m.id==="cub-sint"||m.id==="cub-shingle"){ for(y=0;y<H;y+=12) for(x=((y/12)%2?-10:0);x<W;x+=20) s+='<path d="M'+x+' '+(y+12)+' q10 -16 20 0"'+st("hsl("+hu+",60%,"+L(35,50)+"%)",1,4)+'/>'; }
      else if(m.id==="cub-verde"||m.id==="cub-paja"){ for(i=0;i<90;i++){ x=L(0,W); y=L(0,H); s+='<path d="M'+x+' '+y+'l'+L(-3,3)+' -'+L(4,9)+'"'+st(m.id==="cub-paja"?"hsl(45,60%,60%)":"hsl("+L(90,140)+",55%,45%)",.8,1.4)+'/>'; } }
      else if(m.id==="cub-asf"||m.id==="cub-tpo"){ s+='<rect width="'+W+'" height="'+H+'" fill="'+(m.id==="cub-tpo"?"#cfd8de":"#1b1d22")+'" opacity=".8"/>'; for(x=0;x<W;x+=30) s+='<line x1="'+x+'" x2="'+x+'" y1="0" y2="'+H+'"'+st("#888",.5,2)+'/>'; }
      else { for(x=-6;x<W+12;x+=12) s+='<path d="M'+x+' 0 v'+H+'"'+st("hsl("+hu+",20%,60%)",.5,5)+'/><path d="M'+(x+6)+' 0 v'+H+'"'+st("#000",.35,3)+'/>'; }
      break;
    case "acabado":
      var g="g"+m.id.replace(/[^a-z0-9]/g,"");
      s+='<defs><linearGradient id="'+g+'" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="hsl('+hu+',30%,'+L(40,60)+'%)"/><stop offset="1" stop-color="hsl('+((hu+40)%360)+',25%,'+L(18,30)+'%)"/></linearGradient></defs><rect width="'+W+'" height="'+H+'" fill="url(#'+g+')"/>';
      if(m.id==="aca-terrazo") for(i=0;i<70;i++) s+='<circle cx="'+L(0,W)+'" cy="'+L(0,H)+'" r="'+(r()*2+.6).toFixed(1)+'" fill="hsl('+L(0,360)+',30%,'+L(30,85)+'%)"/>';
      if(m.id==="aca-caucho") for(i=0;i<120;i++) s+='<circle cx="'+L(0,W)+'" cy="'+L(0,H)+'" r="1" fill="hsl('+L(0,360)+',60%,55%)" opacity=".8"/>';
      s+='<rect x="0" y="'+(H*.72)+'" width="'+W+'" height="'+(H*.28)+'" fill="#000" opacity=".22"/>';
      break;
    case "bio":
      var pts=[]; for(i=0;i<16;i++) pts.push([L(0,W),L(0,H)]);
      pts.forEach(function(p,j){ var q=pts[(j*7+3)%pts.length]; s+='<path d="M'+p[0]+' '+p[1]+' Q'+L(0,W)+' '+L(0,H)+' '+q[0]+' '+q[1]+'"'+st("hsl("+hu+",60%,70%)",.45,.8)+'/>'; });
      pts.forEach(function(p){ s+='<circle cx="'+p[0]+'" cy="'+p[1]+'" r="'+L(2,5)+'" fill="hsl('+hu+',70%,'+L(50,75)+'%)" opacity=".75"/>'; });
      break;
  }
  for(y=2;y<H;y+=4) s+='<line x1="0" x2="'+W+'" y1="'+y+'" y2="'+y+'" stroke="rgb(56,225,255)" stroke-opacity=".05"/>';
  s+='<rect x=".5" y=".5" width="'+(W-1)+'" height="'+(H-1)+'" fill="none" stroke="rgb(56,225,255)" stroke-opacity=".25"/>';
  return s+'</svg>';
}

function logPos(v,a,b){ v=Math.max(Math.abs(v),a); return clamp((Math.log10(v)-Math.log10(a))/(Math.log10(b)-Math.log10(a)),0,1); }

/* ── estado de UI (persistente entre renders del módulo) ── */
var MS={tab:"cat",q:"",fam:"",ep:"",apto:false,capaF:"",sort:"n",det:null,cmpOpen:false,sis:"s-portico",scroll:{}};

css("mod-materiales-css", baseCSS("m-materiales")+
".m-materiales-fb{display:flex;flex-direction:column;gap:6px;margin-bottom:10px}"+
".m-materiales-srch{position:relative;flex:1;min-width:180px}"+
".m-materiales-srch svg{position:absolute;left:10px;top:12px;color:var(--muted)}"+
".m-materiales-srch .m-materiales-in{padding-left:32px}"+
".m-materiales-sel{min-height:40px;background:rgba(0,0,0,.35);border:1px solid var(--line2);color:var(--ink);font-family:var(--f-b);padding:0 8px}"+
".m-materiales-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(168px,1fr));gap:10px}"+
".m-materiales-cd{all:unset;box-sizing:border-box;cursor:pointer;display:flex;flex-direction:column;border:1px solid var(--line);background:rgba(6,14,24,.78);transition:transform .18s,border-color .18s,box-shadow .18s;position:relative;min-height:200px}"+
".m-materiales-cd:hover,.m-materiales-cd:focus-visible{border-color:var(--acc);box-shadow:0 0 18px rgba(var(--acc-rgb),.25);transform:translateY(-2px)}"+
".m-materiales-cd.sel{border-color:var(--done);box-shadow:0 0 0 1px rgba(var(--done-rgb),.4)}"+
".m-materiales-sw{height:84px;position:relative;overflow:hidden;border-bottom:1px solid var(--line)}"+
".m-materiales-sw::after{content:'';position:absolute;inset:0;background:linear-gradient(115deg,transparent 30%,rgba(var(--acc-rgb),.18) 48%,transparent 62%);transform:translateX(-100%);transition:transform .6s}"+
".m-materiales-cd:hover .m-materiales-sw::after{transform:translateX(100%)}"+
".m-materiales-cb{padding:8px 10px;display:flex;flex-direction:column;gap:5px;flex:1}"+
".m-materiales-cn{font-weight:600;font-size:13px;line-height:1.25;color:var(--ink)}"+
".m-materiales-ep{font-family:var(--f-m);font-size:9.5px;letter-spacing:.1em;text-transform:uppercase;color:var(--muted)}"+
".m-materiales-ep b{color:var(--acc);font-weight:500}"+
".m-materiales-mb{display:grid;grid-template-columns:22px 1fr auto;gap:2px 6px;align-items:center;font-family:var(--f-m);font-size:9.5px;color:var(--faint)}"+
".m-materiales-mb .m-materiales-bar{height:4px}"+
".m-materiales-tg{position:absolute;top:6px;left:6px;display:flex;gap:3px;flex-wrap:wrap}"+
".m-materiales-tg span{font-family:var(--f-m);font-size:8.5px;padding:1px 4px;background:rgba(3,6,11,.85);border:1px solid var(--done);color:var(--done)}"+
".m-materiales-cmpk{position:absolute;top:6px;right:6px;width:22px;height:22px;border:1px solid var(--acc);background:rgba(3,6,11,.85);color:var(--acc);display:grid;place-items:center}"+
".m-materiales-dock{flex:none;border-top:1px solid var(--line2);background:rgba(3,8,14,.92);padding:6px 10px;display:flex;gap:6px;align-items:center;overflow-x:auto}"+
".m-materiales-dk{flex:none;display:flex;align-items:center;gap:6px;border:1px solid var(--line2);padding:0 4px 0 0;min-height:40px;font-size:12px;max-width:200px}"+
".m-materiales-dk i{width:30px;height:38px;display:block;flex:none}"+
".m-materiales-dk span{overflow:hidden;text-overflow:ellipsis;white-space:nowrap}"+
".m-materiales-x{all:unset;cursor:pointer;width:32px;height:38px;display:grid;place-items:center;color:var(--muted);flex:none}"+
".m-materiales-x:hover{color:var(--warn)}"+
".m-materiales-dw{position:absolute;top:57px;right:0;bottom:0;width:min(460px,100%);background:linear-gradient(rgba(var(--acc-rgb),.03),rgba(var(--acc-rgb),.03)),#040A12;border-left:1px solid var(--acc);box-shadow:-20px 0 40px rgba(0,0,0,.6),0 0 30px rgba(var(--acc-rgb),.12);overflow:auto;z-index:5;animation:m-materiales-in .25s ease-out}"+
".m-materiales-dw.wide{width:100%;border-left:none}"+
"@keyframes m-materiales-in{from{transform:translateX(30px);opacity:0}}"+
".m-materiales-dh{height:150px;position:relative;border-bottom:1px solid var(--line2)}"+
".m-materiales-dh .m-materiales-x{position:absolute;top:8px;right:8px;background:rgba(3,6,11,.85);border:1px solid var(--line2);width:40px;height:40px}"+
".m-materiales-db{padding:12px 14px;display:flex;flex-direction:column;gap:10px}"+
".m-materiales-props{display:grid;grid-template-columns:1fr 1fr;gap:6px}"+
".m-materiales-pp{border:1px solid var(--line);padding:7px 9px;background:rgba(0,0,0,.25)}"+
".m-materiales-pp span{display:block;font-family:var(--f-d);font-size:8px;letter-spacing:.14em;color:var(--muted);text-transform:uppercase}"+
".m-materiales-pp b{font-family:var(--f-m);font-size:13.5px;font-weight:500}"+
".m-materiales-pp.full{grid-column:1/-1}"+
".m-materiales-lb{font-family:var(--f-d);font-size:8.5px;letter-spacing:.16em;color:var(--acc);text-transform:uppercase;margin-bottom:3px}"+
".m-materiales-tx{font-size:13px;color:var(--ink)}"+
".m-materiales-pc{display:grid;grid-template-columns:1fr 1fr;gap:6px}"+
".m-materiales-pc div{border-left:2px solid var(--done);padding:4px 8px;font-size:12.5px;background:rgba(var(--done-rgb),.04)}"+
".m-materiales-pc div+div{border-left-color:var(--warn);background:rgba(255,92,122,.04)}"+
".m-materiales-cmpw{padding:14px;display:flex;flex-direction:column;gap:14px}"+
".m-materiales-cmet{display:grid;grid-template-columns:150px 1fr;gap:6px 12px;align-items:center}"+
".m-materiales-cmet>div:nth-child(odd){font-family:var(--f-d);font-size:8.5px;letter-spacing:.14em;color:var(--muted);text-transform:uppercase}"+
".m-materiales-cb2{display:flex;flex-direction:column;gap:4px}"+
".m-materiales-cbr{display:grid;grid-template-columns:1fr 92px;gap:8px;align-items:center;font-family:var(--f-m);font-size:11px}"+
".m-materiales-cbr .m-materiales-bar{height:12px}"+
".m-materiales-sl{display:grid;grid-template-columns:minmax(220px,300px) 1fr;gap:12px;align-items:start}"+
".m-materiales-sli{display:flex;flex-direction:column;gap:6px}"+
".m-materiales-sb{all:unset;box-sizing:border-box;cursor:pointer;border:1px solid var(--line);background:rgba(6,14,24,.7);padding:10px 12px;min-height:48px;display:flex;flex-direction:column;gap:2px}"+
".m-materiales-sb:hover{border-color:var(--line2)}"+
".m-materiales-sb.on{border-color:var(--acc);background:rgba(var(--acc-rgb),.08);box-shadow:inset 3px 0 0 var(--acc)}"+
".m-materiales-sb.ch{box-shadow:inset 3px 0 0 var(--done)}"+
".m-materiales-sb b{font-size:13px;font-weight:600}"+
".m-materiales-sb span{font-family:var(--f-m);font-size:9.5px;letter-spacing:.08em;color:var(--muted);text-transform:uppercase}"+
".m-materiales-tl{position:relative;padding-left:34px;display:flex;flex-direction:column;gap:10px}"+
".m-materiales-tl::before{content:'';position:absolute;left:13px;top:6px;bottom:6px;width:2px;background:linear-gradient(var(--acc),rgba(var(--acc-rgb),.1));box-shadow:0 0 8px var(--acc)}"+
".m-materiales-st{position:relative;font-size:13px;padding:6px 10px;border:1px solid var(--line);background:rgba(0,0,0,.25)}"+
".m-materiales-st::before{content:attr(data-n);position:absolute;left:-34px;top:3px;width:26px;height:26px;border-radius:50%;border:1px solid var(--acc);background:var(--bg);color:var(--acc);font-family:var(--f-m);font-size:11px;display:grid;place-items:center;box-shadow:0 0 10px rgba(var(--acc-rgb),.5)}"+
".m-materiales-lay{display:grid;grid-template-columns:repeat(auto-fit,minmax(250px,1fr));gap:10px}"+
".m-materiales-lc{display:flex;flex-wrap:wrap;gap:6px;margin:6px 0}"+
".m-materiales-mc{display:flex;align-items:center;gap:6px;border:1px solid var(--line2);background:rgba(0,0,0,.3);min-height:40px;padding-right:2px;max-width:100%}"+
".m-materiales-mc.bad{border-color:var(--warn)}"+
".m-materiales-mc i{width:26px;height:38px;display:block;flex:none}"+
".m-materiales-mc button.m-materiales-nm{all:unset;cursor:pointer;font-size:12px;padding:0 4px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;max-width:170px;min-height:38px;display:flex;align-items:center}"+
".m-materiales-empty{color:var(--faint);font-size:12.5px;padding:8px 0}"+
".m-materiales-gl{color:var(--acc);filter:drop-shadow(0 0 4px rgba(var(--acc-rgb),.7))}"+
"@container (max-width:640px){.m-materiales-sl{grid-template-columns:1fr}.m-materiales-grid{grid-template-columns:repeat(auto-fill,minmax(150px,1fr));gap:8px}.m-materiales-cmet{grid-template-columns:1fr}.m-materiales-cbr{grid-template-columns:1fr 84px}.m-materiales-props{grid-template-columns:1fr 1fr}.m-materiales-pc{grid-template-columns:1fr}.m-materiales-main{padding:10px}}"+
"@container (max-width:380px){.m-materiales-grid{grid-template-columns:1fr 1fr}.m-materiales-sw{height:66px}}"
);

var CMPC=["var(--acc)","var(--done)","#FFB547","#C77DFF"];

DM.materiales={
  titulo:"Materiales y procesos",
  sub:"Catálogo mundial · sistemas constructivos · selección por capas",
  render:function(el,ctx){
    var P="m-materiales";
    var sv=ctx.get("materiales")||{};
    var st={capas:{},sis:sv.sis||null,cmp:(sv.cmp||[]).filter(function(i){return MATI[i];}),conf:!!sv.conf};
    CAPAS.forEach(function(c){ st.capas[c[0]]=((sv.capas||{})[c[0]]||[]).filter(function(i){return MATI[i];}); });
    var save=debounce(function(){ ctx.set("materiales",JSON.parse(JSON.stringify(st))); },600);
    var zc=zonaCod(ctx), A=areaConstr(ctx);
    el.innerHTML="";
    var root=document.createElement("div"); root.className=P; el.appendChild(root);
    root.innerHTML=topBar(P,[["cat","Catálogo · "+MATS.length],["sis","Sistemas constructivos"],["proy","Mi proyecto"]],MS.tab)+'<div class="'+P+'-main"></div><div class="'+P+'-dock" hidden></div><div class="'+P+'-dwh"></div><div class="'+P+'-scan"></div>';
    var main=root.querySelector("."+P+"-main"), dock=root.querySelector("."+P+"-dock"), dwh=root.querySelector("."+P+"-dwh");
    main.addEventListener("scroll",function(){ MS.scroll[MS.tab]=main.scrollTop; },{passive:true});

    function layersOf(id){ return CAPAS.filter(function(c){ return st.capas[c[0]].indexOf(id)>=0; }); }
    function apto(m){ return !zc||m.z.indexOf(zc)>=0; }
    function filtered(){
      var q=MS.q.trim().toLowerCase(), fams=MS.capaF?(CAPAS.filter(function(c){return c[0]===MS.capaF;})[0]||["","",""])[2].split(" "):null;
      var a=MATS.filter(function(m){
        if(MS.fam&&m.f!==MS.fam) return false; if(MS.ep&&m.e!==MS.ep) return false; if(MS.apto&&!apto(m)) return false;
        if(fams&&fams.indexOf(m.f)<0) return false;
        if(q&&(m.n+" "+m.us+" "+m.pv+" "+m.nm+" "+FAM[m.f].n).toLowerCase().indexOf(q)<0) return false; return true; });
      var k=MS.sort;
      a.sort(function(x,y){ if(k==="l") return x.l-y.l; if(k==="co") return x.co*x.d-y.co*y.d; if(k==="d") return x.d-y.d; if(k==="rm") return y.rm-x.rm; return x.n.localeCompare(y.n,"es"); });
      return a;
    }
    function card(m){
      var ly=layersOf(m.id), inC=st.cmp.indexOf(m.id)>=0;
      return '<button class="'+P+'-cd'+(ly.length?' sel':'')+'" data-act="det" data-id="'+m.id+'" aria-label="'+E(m.n)+'"><div class="'+P+'-sw">'+tex(m)+
        (ly.length?'<div class="'+P+'-tg">'+ly.map(function(c){return '<span>'+c[1].slice(0,3).toUpperCase()+'</span>';}).join("")+'</div>':'')+
        (inC?'<div class="'+P+'-cmpk">'+gly("cmp",12)+'</div>':'')+'</div><div class="'+P+'-cb"><div class="'+P+'-ep"><b>'+EPOCA[m.e]+'</b> · '+E(FAM[m.f].n)+'</div><div class="'+P+'-cn">'+E(m.n)+'</div><div class="'+P+'-sp"></div>'+
        '<div class="'+P+'-mb"><span>λ</span><div class="'+P+'-bar"><i style="width:'+(logPos(m.l,.005,400)*100).toFixed(0)+'%"></i></div><span>'+fmt(m.l,m.l<1?3:1)+'</span>'+
        '<span>CO₂</span><div class="'+P+'-bar"><i style="width:'+(logPos(m.co*m.d,1,45000)*100).toFixed(0)+'%;'+(m.co<0?'background:var(--done)':'')+'"></i></div><span>'+fmt(m.co*m.d,0)+'</span></div>'+
        (zc&&!apto(m)?'<div class="'+P+'-fnt" style="color:var(--warn);font-size:10.5px">No recomendado en '+ZONA[zc]+'</div>':'')+'</div></button>';
    }
    function paintGrid(){
      var g=root.querySelector("."+P+"-grid"); if(!g) return; var a=filtered();
      g.innerHTML=a.length?a.map(card).join(""):'<div class="'+P+'-empty">Sin resultados. Ajusta filtros.</div>';
      var c=root.querySelector("."+P+"-cnt"); if(c) c.textContent=a.length+" / "+MATS.length+" materiales";
    }
    function catHTML(){
      var s='<div class="'+P+'-fb"><div class="'+P+'-row"><label class="'+P+'-srch">'+gly("search",16)+'<input class="'+P+'-in" data-act="q" type="search" placeholder="Buscar material, uso, norma o proveedor…" value="'+E(MS.q)+'" aria-label="Buscar"></label>'+
        '<select class="'+P+'-sel" data-act="sort" aria-label="Ordenar"><option value="n">Orden A–Z</option><option value="l">λ menor (más aislante)</option><option value="co">Menor carbono por m³</option><option value="rm">Mayor resistencia</option><option value="d">Más liviano</option></select>'+
        '<button class="'+P+'-chip'+(MS.apto?' on':'')+'" data-act="apto">'+gly("check",14)+' Apto para '+(zc?ZONA[zc]:"mi clima")+'</button></div>';
      s+='<div class="'+P+'-chips"><button class="'+P+'-chip'+(!MS.fam?' on':'')+'" data-act="fam" data-v="">Todas las familias</button>'+Object.keys(FAM).map(function(k){ var n=MATS.filter(function(m){return m.f===k;}).length; return '<button class="'+P+'-chip'+(MS.fam===k?' on':'')+'" data-act="fam" data-v="'+k+'">'+FAM[k].n+' <span class="'+P+'-mono" style="opacity:.6">'+n+'</span></button>'; }).join("")+'</div>';
      s+='<div class="'+P+'-chips"><button class="'+P+'-chip'+(!MS.ep?' on':'')+'" data-act="ep" data-v="">Todas las épocas</button>'+Object.keys(EPOCA).map(function(k){ return '<button class="'+P+'-chip'+(MS.ep===k?' on':'')+'" data-act="ep" data-v="'+k+'">'+EPOCA[k]+'</button>'; }).join("")+
        (MS.capaF?'<button class="'+P+'-chip on" data-act="capaF" data-v="">Capa: '+CAPAS.filter(function(c){return c[0]===MS.capaF;})[0][1]+' ✕</button>':'')+'</div>';
      s+='<div class="'+P+'-row"><span class="'+P+'-h" style="margin:0">Muestrario holográfico</span><span class="'+P+'-cnt '+P+'-fnt"></span><span class="'+P+'-sp"></span><span class="'+P+'-pv">Costos referenciales · por verificar</span></div></div>';
      return s+'<div class="'+P+'-grid"></div><p class="'+P+'-fnt" style="margin-top:14px">Barras: λ (conductividad, escala log.; menor = más aislante) y CO₂ incorporado por m³ (A1–A3, ICE v3 / EPD genéricas). Costos USD Ecuador 2025–2026 de referencia (Cámara de la Construcción de Guayaquil, INEC-IPCO, distribuidores): verificar con cotizaciones actuales.</p>';
    }
    function detHTML(m){
      var ly=layersOf(m.id), inC=st.cmp.indexOf(m.id)>=0;
      var s='<div class="'+P+'-dh">'+tex(m,460,150)+'<button class="'+P+'-x" data-act="close" aria-label="Cerrar">'+gly("x",18)+'</button></div><div class="'+P+'-db">';
      s+='<div><div class="'+P+'-ep"><b>'+EPOCA[m.e]+'</b> · '+E(FAM[m.f].n)+'</div><div class="'+P+'-h2" style="margin-top:4px">'+E(m.n)+'</div>'+
        '<div class="'+P+'-row">'+m.z.map(function(z){ return '<span class="'+(z===zc?P+'-okt':P+'-pre')+'">'+ZONA[z]+'</span>'; }).join("")+(zc&&!apto(m)?'<span class="'+P+'-pv">No recomendado en '+ZONA[zc]+'</span>':'')+'</div></div>';
      s+='<div class="'+P+'-props"><div class="'+P+'-pp"><span>Densidad</span><b>'+fmt(m.d)+' kg/m³</b></div><div class="'+P+'-pp"><span>Conductividad λ</span><b>'+fmt(m.l,m.l<1?3:2)+' W/m·K</b></div>'+
        '<div class="'+P+'-pp full"><span>Resistencia</span><b style="font-size:12.5px">'+E(m.r)+'</b></div>'+
        '<div class="'+P+'-pp"><span>Carbono A1–A3</span><b>'+fmt(m.co,2)+' kgCO₂e/kg</b></div><div class="'+P+'-pp"><span>Carbono por m³</span><b>'+fmt(m.co*m.d,0)+' kgCO₂e</b></div>'+
        '<div class="'+P+'-pp full '+(st.conf?'':P+'-warnbox')+'"><span>Costo referencial Ecuador 2025–2026</span><b>'+(m.c?money(m.c,m.c<10?2:0):'n/d')+'</b> <span style="display:inline;letter-spacing:.05em">/ '+E(m.u)+'</span> '+(st.conf?'<span class="'+P+'-okt">Confirmado</span>':'<span class="'+P+'-pv">Por verificar</span>')+'</div></div>';
      [["Proveedores / disponibilidad en Ecuador",m.pv],["Normas",m.nm],["Usos",m.us]].forEach(function(r){ s+='<div><div class="'+P+'-lb">'+r[0]+'</div><div class="'+P+'-tx">'+E(r[1])+'</div></div>'; });
      s+='<div class="'+P+'-pc"><div><b style="color:var(--done);font-size:11px">PROS</b><br>'+E(m.pro)+'</div><div><b style="color:var(--warn);font-size:11px">CONTRAS</b><br>'+E(m.con)+'</div></div>';
      s+='<div><div class="'+P+'-lb">Usar en mi proyecto · capa</div><div class="'+P+'-row">'+CAPAS.map(function(c){ var on=st.capas[c[0]].indexOf(m.id)>=0; return '<button class="'+P+'-chip'+(on?' on':'')+'" data-act="lay" data-id="'+m.id+'" data-v="'+c[0]+'">'+(on?gly("check",14):gly("plus",14))+' '+c[1]+'</button>'; }).join("")+'</div></div>';
      s+='<div class="'+P+'-row"><button class="'+P+'-btn'+(inC?' on':'')+'" data-act="cmp" data-id="'+m.id+'">'+gly("cmp",14)+(inC?' En comparador':' Añadir al comparador')+'</button><span class="'+P+'-fnt">'+st.cmp.length+'/4</span></div>';
      return s+'</div>';
    }
    function bars(label,vals,unit,opt){
      opt=opt||{}; var mx=Math.max.apply(null,vals.map(function(v){return Math.abs(v.v);}))||1, mn=Math.min.apply(null,vals.map(function(v){return Math.abs(v.v)||mx;}));
      var useLog=mx/Math.max(mn,1e-9)>60;
      var s='<div>'+label+(useLog?' <i style="font-style:normal;opacity:.6">(log)</i>':'')+'</div><div class="'+P+'-cb2">';
      vals.forEach(function(v,i){ var w=useLog?logPos(v.v,mn/2,mx)*100:Math.abs(v.v)/mx*100; s+='<div class="'+P+'-cbr"><div class="'+P+'-bar"><i style="width:'+Math.max(2,w).toFixed(1)+'%;background:'+CMPC[i]+';box-shadow:0 0 8px '+CMPC[i]+'"></i></div><span>'+(v.t!=null?v.t:fmt(v.v,opt.d||0))+' '+unit+'</span></div>'; });
      return s+'</div>';
    }
    function cmpHTML(){
      var ms=st.cmp.map(function(i){return MATI[i];});
      var s='<div class="'+P+'-dh" style="height:auto;padding:12px 14px;display:flex;align-items:center;gap:8px"><span class="'+P+'-h" style="margin:0">'+gly("cmp",14)+' Comparador de materiales</span><span class="'+P+'-sp"></span><button class="'+P+'-x" style="position:static" data-act="close" aria-label="Cerrar">'+gly("x",18)+'</button></div><div class="'+P+'-cmpw">';
      if(ms.length<2) return s+'<p class="'+P+'-mut">Elige al menos 2 materiales (hasta 4) desde su ficha.</p></div>';
      s+='<div class="'+P+'-row">'+ms.map(function(m,i){ return '<div class="'+P+'-dk" style="border-color:'+CMPC[i]+'"><i>'+tex(m,30,38)+'</i><span>'+E(m.n)+'</span></div>'; }).join("")+'</div>';
      s+='<div class="'+P+'-cmet">';
      s+=bars("Conductividad λ",ms.map(function(m){return {v:m.l,t:fmt(m.l,m.l<1?3:1)};}),"W/m·K");
      s+=bars("Carbono por kg",ms.map(function(m){return {v:m.co,t:fmt(m.co,2)};}),"kgCO₂e");
      s+=bars("Carbono por m³",ms.map(function(m){return {v:m.co*m.d};}),"kgCO₂e");
      s+=bars("Resistencia de referencia",ms.map(function(m){return {v:m.rm,t:fmt(m.rm,m.rm<10?1:0)};}),"MPa");
      s+=bars("Densidad",ms.map(function(m){return {v:m.d};}),"kg/m³");
      var us={}; ms.forEach(function(m){us[m.u]=1;});
      s+=bars("Costo referencial",ms.map(function(m){return {v:m.c,t:money(m.c,m.c<10?2:0)+" /"+m.u.split(" ")[0]};}),"");
      s+='</div>'+(Object.keys(us).length>1?'<p class="'+P+'-pv" style="align-self:flex-start">Unidades de costo distintas: la barra no es comparable directamente</p>':'');
      s+='<div class="'+P+'-row">'+ms.map(function(m,i){ return '<div class="'+P+'-card" style="flex:1;min-width:180px;--c:'+CMPC[i]+'"><div class="'+P+'-lb" style="color:'+CMPC[i]+'">'+E(m.n)+'</div><div class="'+P+'-fnt">'+E(m.us)+'</div><div class="'+P+'-fnt" style="margin-top:4px;color:var(--muted)">'+E(m.nm)+'</div></div>'; }).join("")+'</div>';
      s+='<p class="'+P+'-fnt">Resistencia: valor representativo del parámetro principal de cada material (compresión, flexión o tracción según el caso); no es intercambiable entre materiales de distinta naturaleza. PREDISEÑO · fuentes ICE v3, EPD y fichas técnicas.</p>';
      return s+'</div>';
    }
    function estMeses(s){ return (3.5+2.4*Math.sqrt(A/1000))*s.k; }
    function sisHTML(){
      var cur=SISI[MS.sis]||SIS[0];
      var s='<div class="'+P+'-row" style="margin-bottom:10px"><span class="'+P+'-h" style="margin:0">'+SIS.length+' sistemas constructivos</span><span class="'+P+'-sp"></span><span class="'+P+'-pre">Prediseño · NEC 2015 + normas internacionales</span></div><div class="'+P+'-sl"><div class="'+P+'-sli">';
      SIS.forEach(function(x){ s+='<button class="'+P+'-sb'+(x.id===cur.id?' on':'')+(x.id===st.sis?' ch':'')+'" data-act="sis" data-v="'+x.id+'"><span>'+SISG[x.g]+(x.id===st.sis?' · ✓ elegido':'')+'</span><b>'+E(x.n)+'</b></button>'; });
      s+='</div><div class="'+P+'-card" style="display:flex;flex-direction:column;gap:12px"><div><div class="'+P+'-ep"><b>'+SISG[cur.g]+'</b></div><div class="'+P+'-h2" style="margin-top:4px">'+E(cur.n)+'</div><div class="'+P+'-fnt">'+E(cur.ap)+'</div></div>';
      var em=estMeses(cur);
      s+='<div class="'+P+'-kpis"><div class="'+P+'-kpi"><span>Rendimiento</span><i style="font-size:12px;color:var(--ink)">'+E(cur.rend)+'</i></div><div class="'+P+'-kpi"><span>Plazo típico</span><i style="font-size:12px;color:var(--ink)">'+E(cur.plazo)+'</i></div>'+
        '<div class="'+P+'-kpi" style="border-color:var(--warn)"><span>Tu proyecto (≈ '+fmt(A)+' m²)</span><b>'+fmt(em,1)+' meses</b><i>obra total estimada · factor ×'+cur.k+' · por verificar</i></div><div class="'+P+'-kpi"><span>Costo estructura</span><b>×'+fmt(cur.fc,2)+'</b><i>frente a pórtico de H.A.</i></div></div>';
      s+='<div><div class="'+P+'-lb">Secuencia de obra · paso a paso</div><div class="'+P+'-tl">'+cur.pasos.map(function(p,i){ return '<div class="'+P+'-st" data-n="'+(i+1)+'">'+E(p)+'</div>'; }).join("")+'</div></div>';
      s+='<div><div class="'+P+'-lb">Materiales del sistema</div><div class="'+P+'-row">'+cur.mat.map(function(i){ var m=MATI[i]; return m?'<div class="'+P+'-mc"><i>'+tex(m,26,38)+'</i><button class="'+P+'-nm" data-act="det" data-id="'+m.id+'">'+E(m.n)+'</button></div>':''; }).join("")+'</div></div>';
      s+='<div class="'+P+'-pc"><div><b style="color:var(--done);font-size:11px">PROS</b><br>'+E(cur.pro)+'</div><div><b style="color:var(--warn);font-size:11px">CONTRAS</b><br>'+E(cur.con)+'</div></div><div class="'+P+'-fnt">Normas: '+E(cur.nm)+'</div>';
      s+='<div class="'+P+'-row"><button class="'+P+'-btn'+(st.sis===cur.id?' on':'')+'" data-act="pick" data-v="'+cur.id+'">'+gly("check",14)+(st.sis===cur.id?' Sistema elegido':' Elegir para mi proyecto')+'</button>'+(st.sis===cur.id?'':'<span class="'+P+'-fnt">Se agregan sus materiales a la capa de estructura</span>')+'</div>';
      return s+'</div></div>';
    }
    function proyHTML(){
      var s='<div class="'+P+'-row" style="margin-bottom:10px"><span class="'+P+'-h" style="margin:0">Especificación por capas · '+E((ctx.P&&ctx.P.nombre)||"Proyecto")+'</span><span class="'+P+'-sp"></span>'+
        (st.conf?'<span class="'+P+'-okt">Costos confirmados</span>':'<span class="'+P+'-pv">Costos por verificar</span><button class="'+P+'-btn" data-act="conf">'+gly("check",14)+' Confirmar</button>')+
        '<button class="'+P+'-btn" data-act="csv">'+gly("dl",14)+' CSV</button></div>';
      var all=[]; CAPAS.forEach(function(c){ st.capas[c[0]].forEach(function(i){ all.push(MATI[i]); }); });
      var bad=all.filter(function(m){return !apto(m);});
      var env=st.capas.env.map(function(i){return MATI[i];});
      var lmean=env.length?env.reduce(function(a,m){return a+m.l;},0)/env.length:null;
      var co=all.length?all.reduce(function(a,m){return a+m.co*m.d;},0)/all.length:null;
      var sis=st.sis&&SISI[st.sis];
      s+='<div class="'+P+'-kpis" style="margin-bottom:12px"><div class="'+P+'-kpi"><span>Sistema constructivo</span><b style="font-size:13px">'+(sis?E(sis.n):"— sin elegir —")+'</b><i>'+(sis?"≈ "+fmt(estMeses(sis),1)+" meses de obra":"elige en Sistemas")+'</i></div>'+
        '<div class="'+P+'-kpi"><span>Materiales elegidos</span><b>'+all.length+'</b><i>'+bad.length+' con alerta de clima</i></div>'+
        '<div class="'+P+'-kpi"><span>λ medio envolvente</span><b>'+(lmean==null?"—":fmt(lmean,3))+'</b><i>W/m·K (indicativo)</i></div>'+
        '<div class="'+P+'-kpi"><span>CO₂ medio por m³</span><b>'+(co==null?"—":fmt(co,0))+'</b><i>kgCO₂e/m³ (A1–A3)</i></div></div>';
      if(bad.length) s+='<div class="'+P+'-card '+P+'-warnbox" style="margin-bottom:10px"><b style="color:var(--warn)">Alerta climática ('+(ZONA[zc]||"")+', '+E((ctx.clima&&ctx.clima.tipo)||"")+'):</b> '+bad.map(function(m){return E(m.n);}).join(" · ")+'</div>';
      s+='<div class="'+P+'-lay">';
      CAPAS.forEach(function(c){
        var ids=st.capas[c[0]];
        s+='<div class="'+P+'-card"><div class="'+P+'-row"><span class="'+P+'-gl">'+gly("layers",18)+'</span><span class="'+P+'-h" style="margin:0">'+c[1]+'</span><span class="'+P+'-sp"></span><span class="'+P+'-mono '+P+'-fnt">'+ids.length+'</span></div><div class="'+P+'-lc">';
        s+=ids.length?ids.map(function(i){ var m=MATI[i]; return '<div class="'+P+'-mc'+(apto(m)?'':' bad')+'"><i>'+tex(m,26,38)+'</i><button class="'+P+'-nm" data-act="det" data-id="'+m.id+'">'+E(m.n)+'</button><button class="'+P+'-x" data-act="rm" data-id="'+m.id+'" data-v="'+c[0]+'" aria-label="Quitar">'+gly("x",14)+'</button></div>'; }).join(""):'<div class="'+P+'-empty">Vacío</div>';
        s+='</div><button class="'+P+'-btn" data-act="add" data-v="'+c[0]+'">'+gly("plus",14)+' Añadir desde catálogo</button></div>';
      });
      s+='</div><p class="'+P+'-fnt" style="margin-top:12px">Selección guardada en el proyecto. La estación de Ingeniería de costos usa el sistema constructivo elegido para ajustar el capítulo de estructura.</p>';
      return s;
    }
    function paintDock(){
      if(!st.cmp.length||MS.tab!=="cat"){ dock.hidden=true; dock.innerHTML=""; return; }
      dock.hidden=false;
      dock.innerHTML='<span class="'+P+'-gl">'+gly("cmp",18)+'</span>'+st.cmp.map(function(i,k){ var m=MATI[i]; return '<div class="'+P+'-dk" style="border-color:'+CMPC[k]+'"><i>'+tex(m,30,38)+'</i><span>'+E(m.n)+'</span><button class="'+P+'-x" data-act="cmprm" data-id="'+i+'" aria-label="Quitar">'+gly("x",14)+'</button></div>'; }).join("")+
        '<button class="'+P+'-btn on" data-act="cmpopen"'+(st.cmp.length<2?' disabled':'')+'>Comparar '+st.cmp.length+'</button>';
    }
    function paintDrawer(){
      if(MS.cmpOpen){ dwh.innerHTML='<div class="'+P+'-dw wide">'+cmpHTML()+'</div>'; return; }
      var m=MS.det&&MATI[MS.det]; dwh.innerHTML=m?'<div class="'+P+'-dw" role="dialog" aria-label="Ficha de material">'+detHTML(m)+'</div>':"";
    }
    function paint(){
      root.querySelectorAll("."+P+"-tab").forEach(function(b){ b.setAttribute("aria-selected",b.dataset.v===MS.tab); });
      main.innerHTML=MS.tab==="cat"?catHTML():MS.tab==="sis"?sisHTML():proyHTML();
      if(MS.tab==="cat"){ var so=main.querySelector('[data-act="sort"]'); so.value=MS.sort; paintGrid(); }
      main.scrollTop=MS.scroll[MS.tab]||0;
      paintDock(); paintDrawer();
    }
    function refreshCards(){ if(MS.tab==="cat"){ var sc=main.scrollTop; paintGrid(); main.scrollTop=sc; } else { var sc2=main.scrollTop; main.innerHTML=MS.tab==="sis"?sisHTML():proyHTML(); main.scrollTop=sc2; } paintDock(); paintDrawer(); }
    function toCSV(){
      var rows=[["Capa","Material","Familia","Época","Densidad kg/m3","Lambda W/mK","Carbono kgCO2e/kg","Costo ref USD","Unidad","Normas","Proveedores"]];
      CAPAS.forEach(function(c){ st.capas[c[0]].forEach(function(i){ var m=MATI[i]; rows.push([c[1],m.n,FAM[m.f].n,EPOCA[m.e],m.d,String(m.l).replace(".",","),String(m.co).replace(".",","),String(m.c).replace(".",","),m.u,m.nm,m.pv]); }); });
      if(st.sis) rows.push(["Sistema",SISI[st.sis].n,"","","","","","","","",SISI[st.sis].nm]);
      rows.push([]); rows.push(["Costos referenciales Ecuador 2025-2026 "+(st.conf?"(confirmados por el usuario)":"(POR VERIFICAR)")]);
      return "﻿"+rows.map(function(r){ return r.map(function(v){ v=String(v==null?"":v); return /[;"\n]/.test(v)?'"'+v.replace(/"/g,'""')+'"':v; }).join(";"); }).join("\n");
    }
    root.addEventListener("click",function(ev){
      var b=ev.target.closest("[data-act]"); if(!b||!root.contains(b)) return; var a=b.dataset.act, v=b.dataset.v, id=b.dataset.id;
      if(a==="tab"){ MS.tab=v; MS.det=null; MS.cmpOpen=false; paint(); }
      else if(a==="next"){ ctx.next(); }
      else if(a==="fam"){ MS.fam=v; paint(); }
      else if(a==="ep"){ MS.ep=v; paint(); }
      else if(a==="capaF"){ MS.capaF=v; paint(); }
      else if(a==="apto"){ MS.apto=!MS.apto; paint(); }
      else if(a==="det"){ MS.det=id; MS.cmpOpen=false; paintDrawer(); var d=dwh.querySelector("."+P+"-dw"); if(d) d.scrollTop=0; }
      else if(a==="close"){ MS.det=null; MS.cmpOpen=false; paintDrawer(); }
      else if(a==="lay"){ var L=st.capas[v], k=L.indexOf(id); if(k>=0) L.splice(k,1); else { L.push(id); ctx.toast("Añadido a "+CAPAS.filter(function(c){return c[0]===v;})[0][1]); } save(); var dsc=dwh.querySelector("."+P+"-dw"); var t=dsc?dsc.scrollTop:0; refreshCards(); dsc=dwh.querySelector("."+P+"-dw"); if(dsc) dsc.scrollTop=t; }
      else if(a==="cmp"){ var j=st.cmp.indexOf(id); if(j>=0) st.cmp.splice(j,1); else { if(st.cmp.length>=4){ ctx.toast("Máximo 4 materiales en el comparador"); return; } st.cmp.push(id); } save(); var dsc2=dwh.querySelector("."+P+"-dw"); var t2=dsc2?dsc2.scrollTop:0; refreshCards(); dsc2=dwh.querySelector("."+P+"-dw"); if(dsc2) dsc2.scrollTop=t2; }
      else if(a==="cmprm"){ st.cmp=st.cmp.filter(function(x){return x!==id;}); save(); refreshCards(); }
      else if(a==="cmpopen"){ MS.cmpOpen=true; MS.det=null; paintDrawer(); }
      else if(a==="sis"){ MS.sis=v; var sc=main.scrollTop; main.innerHTML=sisHTML(); main.scrollTop=sc; if(main.clientWidth<640){ var cd=main.querySelector("."+P+"-sl>."+P+"-card"); if(cd) cd.scrollIntoView({block:"start",behavior:"smooth"}); } }
      else if(a==="pick"){ st.sis=v; SISI[v].mat.forEach(function(i){ var m=MATI[i]; if(m&&/hormigon|acero|madera|bambu|mamposteria|tierra|piedra/.test(m.f)&&st.capas.est.indexOf(i)<0) st.capas.est.push(i); }); save(); ctx.toast("Sistema elegido: "+SISI[v].n); var sc3=main.scrollTop; main.innerHTML=sisHTML(); main.scrollTop=sc3; }
      else if(a==="rm"){ st.capas[v]=st.capas[v].filter(function(x){return x!==id;}); save(); refreshCards(); }
      else if(a==="add"){ MS.capaF=v; MS.fam=""; MS.tab="cat"; MS.scroll.cat=0; paint(); }
      else if(a==="conf"){ st.conf=true; save(); ctx.toast("Costos referenciales confirmados"); refreshCards(); }
      else if(a==="csv"){ ctx.download("materiales-"+String((ctx.P&&ctx.P.nombre)||"proyecto").replace(/\s+/g,"-").toLowerCase()+".csv",toCSV()); }
    });
    var qdeb=debounce(function(){ MS.scroll.cat=0; paintGrid(); },180);
    root.addEventListener("input",function(ev){ var t=ev.target; if(t.dataset.act==="q"){ MS.q=t.value; qdeb(); } });
    root.addEventListener("change",function(ev){ var t=ev.target; if(t.dataset.act==="sort"){ MS.sort=t.value; paintGrid(); } });
    root.addEventListener("keydown",function(ev){ if(ev.key==="Escape"&&(MS.det||MS.cmpOpen)){ MS.det=null; MS.cmpOpen=false; paintDrawer(); } });
    paint();
    return function(){ root.remove(); };
  }
};

/* ═══════════════════════════ 2. INGENIERÍA DE COSTOS ═══════════════════════════ */
/* $/m² de construcción por categoría y estándar (económico, medio, alto, lujo) — Ecuador 2025–2026, referencial (Guayaquil).
   Fuente orientativa: revistas de precios de la Cámara de la Construcción de Guayaquil, índices INEC-IPCO y presupuestos de mercado. POR VERIFICAR. */
var TIPC={
 RES:["Residencial",[380,550,800,1200],"res"],HOS:["Hospedaje y turismo",[650,900,1300,1900],"hos"],COM:["Comercio y servicios",[450,650,900,1300],"ofi"],
 GAS:["Gastronomía",[500,750,1050,1500],"hos"],OFI:["Oficinas",[600,850,1100,1500],"ofi"],MIX:["Uso mixto",[550,780,1050,1450],"ofi"],
 SAL:["Salud",[950,1350,1700,2300],"sal"],EDU:["Educación",[450,650,850,1150],"edu"],CUL:["Cultura",[700,1000,1400,2000],"edu"],
 REL:["Religioso y funerario",[450,700,1000,1500],"edu"],GOB:["Gobierno",[550,800,1050,1400],"ofi"],SEG:["Seguridad y emergencia",[600,850,1100,1450],"ofi"],
 SOC:["Social y comunitario",[400,600,800,1050],"edu"],DEP:["Deporte",[500,750,1050,1500],"edu"],PUB:["Espacio público y paisaje (por m² intervenido)",[60,120,220,380],"pub"],
 EVE:["Eventos y convenciones",[700,950,1300,1800],"ofi"],TRA:["Transporte",[800,1100,1500,2100],"ofi"],IND:["Industria y logística",[300,420,600,850],"ind"],
 AGR:["Agropecuario",[180,300,450,650],"ind"],INF:["Infraestructura",[600,900,1300,1800],"ofi"],CIE:["Ciencia",[1000,1400,1900,2600],"sal"],
 EFI:["Efímera / modular",[250,400,600,900],"ind"],FUT:["Emergentes",[700,1000,1400,2000],"ofi"]
};
var STD=[["eco","Económico"],["medio","Medio"],["alto","Alto"],["lujo","Lujo"]];
var CAP=[["pre","Preliminares y obras provisionales","Preliminares"],["mov","Movimiento de tierras","Mov. tierras"],["est","Estructura","Estructura"],["mam","Mampostería","Mampostería"],["enl","Enlucidos y masillados","Enlucidos"],["pis","Pisos y revestimientos","Pisos"],["car","Carpintería (madera, metal, aluminio y vidrio)","Carpintería"],["san","Instalaciones sanitarias","Inst. sanitarias"],["ele","Instalaciones eléctricas y electrónicas","Inst. eléctricas"],["esp","Instalaciones especiales (HVAC, gases, incendio, ascensores)","Inst. especiales"],["cub","Cubierta e impermeabilización","Cubierta"],["ext","Obras exteriores y paisajismo","Exteriores"]];
var PROF={ /* % del costo directo por capítulo */
 res:[2,3,28,9,7,10,10,7,7,3,6,8], sal:[2,2,24,6,5,9,8,10,12,14,4,4], ofi:[2,3,27,6,5,9,9,6,11,11,5,6], edu:[2,3,27,9,6,10,9,7,9,6,6,6],
 ind:[2,6,32,5,3,12,4,4,10,6,12,4], pub:[3,10,10,3,2,30,3,5,10,4,0,20], hos:[2,3,25,7,6,11,11,9,9,8,4,5]
};
var WIN={pre:[0,.08],mov:[.02,.14],est:[.08,.55],mam:[.30,.70],enl:[.40,.80],pis:[.58,.92],car:[.65,.96],san:[.18,.90],ele:[.22,.95],esp:[.45,.97],cub:[.45,.72],ext:[.80,1]};
var CHC=["#38E1FF","#2BB3FF","#4F7DFF","#7C6CFF","#B26BFF","#E36BE0","#FF6FA8","#FF8A5C","#FFC24B","#D9F25A","#B6FF3C","#4FFFB0"];
/* Salarios referenciales por hora (costo horario) — estructura ocupacional de la Contraloría General del Estado, 2026 aprox. (SBU 2026 ≈ USD 482). POR VERIFICAR con la tabla vigente. */
var SALR=[["Peón","E2",4.16],["Albañil","D2",4.21],["Fierrero","D2",4.21],["Carpintero","D2",4.21],["Operador de equipo liviano","D2",4.21],["Maestro mayor de obra","C1",4.68],["Inspector de obra","B3",4.68]];
var APU0=[
 {n:"Hormigón simple f'c 210 kg/cm² en columnas",u:"m³",R:1.80,hm:5,nota:"Incluye preparación en concretera, transporte interno, vertido y vibrado. Encofrado y acero en rubros aparte.",
  eq:[["Concretera 1 saco",1,5.00],["Vibrador de manguera",1,3.50]],
  mo:[["Peón","E2",6,4.16],["Albañil","D2",2,4.21],["Operador de equipo liviano","D2",1,4.21],["Maestro mayor de obra","C1",0.2,4.68]],
  mat:[["Cemento Portland tipo GU (saco 50 kg)","saco",7.21,8.30],["Arena","m³",0.65,18.00],["Ripio triturado 3/4\"","m³",0.95,20.00],["Agua","m³",0.22,1.50]],
  tr:[["Transporte de agregados","m³",1.60,3.00]]},
 {n:"Mampostería de bloque de hormigón e = 15 cm (mortero 1:6)",u:"m²",R:0.80,hm:5,nota:"12,5 bloques/m² con 5 % de desperdicio incluido; juntas de 1,5 cm.",
  eq:[["Andamio metálico (cuerpo)",1,0.30]],
  mo:[["Peón","E2",1,4.16],["Albañil","D2",1,4.21],["Maestro mayor de obra","C1",0.1,4.68]],
  mat:[["Bloque de hormigón 15×20×40 (NTE INEN 3066)","u",12.5,0.58],["Cemento Portland tipo GU (saco 50 kg)","saco",0.16,8.30],["Arena","m³",0.02,18.00],["Agua","m³",0.005,1.50]],
  tr:[["Transporte de bloque","u",12.5,0.03]]},
 {n:"Enlucido vertical paleteado fino (mortero 1:4, e = 1,5 cm)",u:"m²",R:0.65,hm:5,nota:"Incluye maestreado, champeado y paleteado fino; filos y fajas en rubro aparte.",
  eq:[["Andamio metálico (cuerpo)",1,0.30]],
  mo:[["Peón","E2",1,4.16],["Albañil","D2",1,4.21],["Maestro mayor de obra","C1",0.1,4.68]],
  mat:[["Cemento Portland tipo GU (saco 50 kg)","saco",0.17,8.30],["Arena fina","m³",0.022,18.00],["Agua","m³",0.005,1.50]],
  tr:[["Transporte de arena","m³",0.022,3.00]]}
];
function clone(o){ return JSON.parse(JSON.stringify(o)); }
function apuCalc(a){
  var mo=a.mo.reduce(function(s,r){ return s+r[2]*r[3]*a.R; },0);
  var eq=a.eq.reduce(function(s,r){ return s+r[1]*r[2]*a.R; },0)+mo*a.hm/100;
  var mat=a.mat.reduce(function(s,r){ return s+r[2]*r[3]; },0);
  var tr=a.tr.reduce(function(s,r){ return s+r[2]*r[3]; },0);
  return {mo:mo,eq:eq,mat:mat,tr:tr,d:mo+eq+mat+tr};
}
var CS={tab:"macro",vis:"donut",apu:0,scroll:{}};

function costCalc(ctx,st){
  var cat=(ctx.tipo&&ctx.tipo.cat&&ctx.tipo.cat.c)||"MIX"; var T=TIPC[cat]||TIPC.MIX;
  var cus=(ctx.P&&ctx.P.norm&&+ctx.P.norm.cus)||1.2, Amax=Math.round((ctx.area||1000)*cus);
  var A=Math.max(1,Math.round(Amax*st.pct/100));
  var si=STD.map(function(x){return x[0];}).indexOf(st.std); if(si<0) si=1;
  var m2=st.m2!=null?st.m2:T[1][si];
  var prof=PROF[T[2]]; var ms=ctx.get("materiales")||{}; var sis=ms.sis&&SISI[ms.sis];
  var fc=sis&&st.sisOn?sis.fc:1, k=sis?sis.k:1;
  var D0=A*m2, caps=CAP.map(function(c,i){ var v=D0*prof[i]/100; if(c[0]==="est") v*=fc; return {k:c[0],n:c[1],sn:c[2],p:prof[i],v:v,col:CHC[i]}; });
  var D=caps.reduce(function(s,c){return s+c.v;},0);
  var tp=tecPct(ctx), Tc=st.tec?D*tp/100:0;
  var I=(D+Tc)*st.ind/100, obra=D+Tc+I;
  var cont=obra*st.cont/100, hon=obra*st.hon/100, fis=obra*st.fis/100, per=obra*st.per/100;
  var iva=st.iva?(obra+cont+hon+fis)*0.15:0, tot=obra+cont+hon+fis+per+iva;
  var catF={SAL:1.2,CIE:1.2,IND:.8,AGR:.7,EFI:.6,RES:.9,PUB:.7,TRA:1.25,INF:1.25}[cat]||1;
  var durAuto=Math.max(3,Math.round((3.5+2.4*Math.sqrt(A/1000))*catF*k));
  var dur=st.dur||durAuto;
  return {cat:cat,T:T,Amax:Amax,A:A,m2:m2,si:si,caps:caps,D:D,tp:tp,Tc:Tc,I:I,obra:obra,cont:cont,hon:hon,fis:fis,per:per,iva:iva,tot:tot,dur:dur,durAuto:durAuto,sis:sis,fc:fc,cus:cus};
}
function monthly(c){
  var N=c.dur, rows=c.caps.map(function(cp){
    var w=WIN[cp.k], ws=[], tw=0;
    for(var i=0;i<N;i++){ var t=(i+.5)/N, x=0; if(t>=w[0]&&t<=w[1]) x=Math.sin(Math.PI*(t-w[0])/(w[1]-w[0]))+.15; ws.push(x); tw+=x; }
    if(!tw){ var mi=Math.min(N-1,Math.floor((w[0]+w[1])/2*N)); ws[mi]=1; tw=1; }
    return {cp:cp,m:ws.map(function(x){ return cp.v*x/tw; })};
  });
  var extra=c.tot-c.D; // indirectos, IVA, honorarios… se reparten proporcionalmente al avance directo
  var dm=[]; for(var i=0;i<N;i++){ dm.push(rows.reduce(function(s,r){return s+r.m[i];},0)); }
  var tm=dm.map(function(v){ return c.D?v+extra*v/c.D:0; });
  var acc=0, cum=tm.map(function(v){ acc+=v; return acc; });
  return {rows:rows,dm:dm,tm:tm,cum:cum};
}
function arcP(cx,cy,r0,r1,a0,a1){
  var p=function(r,a){ return [cx+r*Math.sin(a),cy-r*Math.cos(a)]; }, L=a1-a0>Math.PI?1:0;
  var A=p(r1,a0),B=p(r1,a1),C=p(r0,a1),D=p(r0,a0);
  return "M"+A[0].toFixed(2)+" "+A[1].toFixed(2)+"A"+r1+" "+r1+" 0 "+L+" 1 "+B[0].toFixed(2)+" "+B[1].toFixed(2)+"L"+C[0].toFixed(2)+" "+C[1].toFixed(2)+"A"+r0+" "+r0+" 0 "+L+" 0 "+D[0].toFixed(2)+" "+D[1].toFixed(2)+"Z";
}

css("mod-costos-css", baseCSS("m-costos")+
".m-costos-g2{display:grid;grid-template-columns:minmax(260px,340px) 1fr;gap:12px;align-items:start}"+
".m-costos-ctl{display:flex;flex-direction:column;gap:12px}"+
".m-costos-sl label{display:flex;justify-content:space-between;gap:8px;font-family:var(--f-d);font-size:8.5px;letter-spacing:.14em;text-transform:uppercase;color:var(--muted)}"+
".m-costos-sl label b{font-family:var(--f-m);font-size:13px;letter-spacing:0;color:var(--ink);font-weight:500}"+
".m-costos-sl small{display:block;color:var(--faint);font-size:11px;margin-top:-4px}"+
".m-costos-col{display:flex;flex-direction:column;gap:12px;min-width:0}"+
".m-costos-wf{display:flex;height:34px;border:1px solid var(--line2);overflow:hidden}"+
".m-costos-wf div{height:100%;position:relative;min-width:2px;border-right:1px solid rgba(3,6,11,.8);transition:flex .3s}"+
".m-costos-wl{display:grid;grid-template-columns:14px 1fr auto auto;gap:4px 8px;align-items:center;font-size:12.5px;margin-top:8px}"+
".m-costos-wl i{width:10px;height:10px;display:block;box-shadow:0 0 6px currentColor}"+
".m-costos-wl span:nth-child(4n+3){font-family:var(--f-m);text-align:right}"+
".m-costos-wl span:nth-child(4n){font-family:var(--f-m);color:var(--faint);text-align:right;font-size:11px;min-width:42px}"+
".m-costos-wl .tot{font-weight:700;color:var(--done)}"+
".m-costos-ch{display:grid;grid-template-columns:minmax(220px,300px) 1fr;gap:12px;align-items:start}"+
".m-costos-svg{width:100%;height:auto;display:block;overflow:visible}"+
".m-costos-svg text{font-family:var(--f-m);fill:var(--ink)}"+
".m-costos-seg{cursor:pointer;transition:opacity .2s}"+
".m-costos-seg:hover{opacity:.85}"+
".m-costos-lg{display:flex;flex-direction:column;gap:2px}"+
".m-costos-li{all:unset;box-sizing:border-box;display:grid;grid-template-columns:12px 1fr auto 46px;gap:8px;align-items:center;min-height:36px;padding:2px 8px;cursor:pointer;border:1px solid transparent;font-size:12.5px}"+
".m-costos-li:hover,.m-costos-li.on{border-color:var(--line2);background:rgba(var(--acc-rgb),.06)}"+
".m-costos-li i{width:10px;height:10px;display:block}"+
".m-costos-li b{font-family:var(--f-m);font-weight:500}"+
".m-costos-li span:last-child{font-family:var(--f-m);color:var(--muted);text-align:right;font-size:11px}"+
".m-costos-apu{display:flex;flex-direction:column;gap:12px}"+
".m-costos-sec{border:1px solid var(--line);background:rgba(0,0,0,.2)}"+
".m-costos-sh{display:flex;align-items:center;gap:8px;padding:8px 10px;border-bottom:1px solid var(--line);font-family:var(--f-d);font-size:9px;letter-spacing:.16em;color:var(--acc);text-transform:uppercase}"+
".m-costos-sh b{margin-left:auto;font-family:var(--f-m);font-size:13px;letter-spacing:0;color:var(--ink)}"+
".m-costos-r{display:grid;grid-template-columns:minmax(150px,1fr) repeat(4,minmax(70px,96px));gap:6px;padding:6px 10px;align-items:end;border-bottom:1px dashed rgba(120,200,255,.08)}"+
".m-costos-r>div{display:flex;flex-direction:column;gap:2px;min-width:0}"+
".m-costos-r>div>span{font-family:var(--f-d);font-size:7.5px;letter-spacing:.14em;color:var(--faint);text-transform:uppercase}"+
".m-costos-r .m-costos-in{min-height:40px;padding:0 6px;text-align:right}"+
".m-costos-r .m-costos-dsc{font-size:12.5px;min-height:40px;display:flex;align-items:center}"+
".m-costos-r .m-costos-v{font-family:var(--f-m);min-height:40px;display:flex;align-items:center;justify-content:flex-end;color:var(--done)}"+
".m-costos-tot{display:grid;grid-template-columns:repeat(auto-fit,minmax(130px,1fr));gap:8px}"+
".m-costos-gw{overflow-x:auto;border:1px solid var(--line);background:rgba(0,0,0,.25)}"+
".m-costos-tb{width:100%;border-collapse:collapse;font-family:var(--f-m);font-size:11.5px}"+
".m-costos-tb th{font-family:var(--f-d);font-size:8px;letter-spacing:.14em;color:var(--muted);text-transform:uppercase;text-align:right;padding:6px 8px;border-bottom:1px solid var(--line2);position:sticky;top:0;background:var(--panel)}"+
".m-costos-tb td{text-align:right;padding:5px 8px;border-bottom:1px solid rgba(120,200,255,.06)}"+
".m-costos-tb td:first-child,.m-costos-tb th:first-child{text-align:left}"+
"@container (max-width:760px){.m-costos-g2{grid-template-columns:1fr}.m-costos-ch{grid-template-columns:1fr}}"+
"@container (max-width:560px){.m-costos-r{grid-template-columns:1fr 1fr}.m-costos-r>div:first-child{grid-column:1/-1}.m-costos-main{padding:10px}.m-costos-kpi b{font-size:16px}}"
);

DM.costos={
  titulo:"Ingeniería de costos",
  sub:"Paramétrico → capítulos → APU → cronograma valorado y curva S",
  render:function(el,ctx){
    var P="m-costos";
    var sv=ctx.get("costos")||{};
    var st={std:sv.std||"medio",pct:sv.pct!=null?sv.pct:100,m2:sv.m2!=null?sv.m2:null,ind:sv.ind!=null?sv.ind:20,cont:sv.cont!=null?sv.cont:5,hon:sv.hon!=null?sv.hon:6.5,fis:sv.fis!=null?sv.fis:3,per:sv.per!=null?sv.per:1.5,
      iva:sv.iva!==false,tec:sv.tec!==false,sisOn:sv.sisOn!==false,dur:sv.dur||null,conf:!!sv.conf,apuConf:!!sv.apuConf,apu:Array.isArray(sv.apu)&&sv.apu.length===APU0.length?sv.apu:clone(APU0)};
    var save=debounce(function(){ ctx.set("costos",clone(st)); },600);
    el.innerHTML="";
    var root=document.createElement("div"); root.className=P; el.appendChild(root);
    root.innerHTML=topBar(P,[["macro","Paramétrico y capítulos"],["apu","APU"],["crono","Cronograma · curva S"]],CS.tab)+'<div class="'+P+'-main"></div><div class="'+P+'-scan"></div>';
    var main=root.querySelector("."+P+"-main");
    main.addEventListener("scroll",function(){ CS.scroll[CS.tab]=main.scrollTop; },{passive:true});
    var hl=null;

    function sl(id,lab,val,min,max,step,txt,small){ return '<div class="'+P+'-sl"><label for="'+P+'-'+id+'">'+lab+' <b data-o="'+id+'">'+txt+'</b></label><input id="'+P+'-'+id+'" class="'+P+'-rng" type="range" min="'+min+'" max="'+max+'" step="'+step+'" value="'+val+'" data-act="sl" data-k="'+id+'">'+(small?'<small>'+small+'</small>':'')+'</div>'; }
    function kpis(c){
      return '<div class="'+P+'-kpis"><div class="'+P+'-kpi"><span>Área bruta</span><b>'+fmt(c.A)+' m²</b><i>de '+fmt(c.Amax)+' m² máx. (terreno × CUS '+fmt(c.cus,2)+')</i></div>'+
        '<div class="'+P+'-kpi"><span>Costo directo</span><b>'+money(c.D)+'</b><i>'+money(c.D/c.A)+' /m²</i></div>'+
        '<div class="'+P+'-kpi"><span>Costo de obra</span><b>'+money(c.obra)+'</b><i>directo + tecnología + indirectos</i></div>'+
        '<div class="'+P+'-kpi" style="border-color:rgba(var(--done-rgb),.5)"><span>Inversión total</span><b style="color:var(--done)">'+money(c.tot)+'</b><i>'+money(c.tot/c.A)+' /m² · '+(st.iva?'incluye IVA 15 %':'sin IVA')+'</i></div></div>';
    }
    function cascade(c){
      var it=[["Costo directo",c.D,"#38E1FF"],["Tecnología (estación Tecnología)",c.Tc,"#B26BFF"],["Indirectos y utilidad",c.I,"#4F7DFF"],["Imprevistos / contingencia",c.cont,"#FFC24B"],["Honorarios diseño + ingenierías",c.hon,"#FF6FA8"],["Fiscalización",c.fis,"#FF8A5C"],["Permisos y tasas",c.per,"#D9F25A"],["IVA 15 %",c.iva,"#B6FF3C"]];
      var s='<div class="'+P+'-wf">'+it.map(function(x){ return x[1]>0?'<div style="flex:'+x[1]+';background:linear-gradient(180deg,'+x[2]+','+x[2]+'88);box-shadow:inset 0 0 10px rgba(0,0,0,.4)" title="'+E(x[0])+': '+money(x[1])+'"></div>':''; }).join("")+'</div><div class="'+P+'-wl">';
      it.forEach(function(x){ s+='<i style="background:'+x[2]+';color:'+x[2]+'"></i><span>'+x[0]+'</span><span>'+money(x[1])+'</span><span>'+fmt(x[1]/c.tot*100,1)+'%</span>'; });
      return s+'<i></i><span class="tot">TOTAL</span><span class="tot">'+money(c.tot)+'</span><span>100%</span></div>';
    }
    function donut(c){
      var W=300,cx=150,cy=150,r1=132,r0=86,a=0,s='<svg class="'+P+'-svg" viewBox="0 0 300 300" role="img" aria-label="Distribución por capítulos">';
      s+='<circle cx="150" cy="150" r="142" fill="none" stroke="rgba(56,225,255,.25)" stroke-dasharray="2 5"/><circle cx="150" cy="150" r="78" fill="none" stroke="rgba(56,225,255,.18)"/>';
      c.caps.forEach(function(cp){ var da=cp.v/c.D*Math.PI*2; if(da<=0) return; var on=hl===cp.k; s+='<path class="'+P+'-seg" data-act="hl" data-v="'+cp.k+'" d="'+arcP(cx,cy,r0,on?r1+8:r1,a+.012,a+da-.012)+'" fill="'+cp.col+'" fill-opacity="'+(hl&&!on?.25:.82)+'" stroke="'+cp.col+'" style="filter:drop-shadow(0 0 6px '+cp.col+')"><title>'+E(cp.n)+': '+money(cp.v)+'</title></path>'; a+=da; });
      var h=hl&&c.caps.filter(function(x){return x.k===hl;})[0];
      s+='<text x="150" y="138" text-anchor="middle" font-size="9" fill="var(--muted)" style="letter-spacing:.15em">'+(h?E(h.sn.toUpperCase()):"COSTO DIRECTO")+'</text><text x="150" y="162" text-anchor="middle" font-size="17" font-weight="600">'+(h?money(h.v):money(c.D))+'</text><text x="150" y="180" text-anchor="middle" font-size="10" fill="var(--acc)">'+(h?fmt(h.v/c.D*100,1)+" %":fmt(c.A)+" m²")+'</text>';
      return s+'</svg>';
    }
    function treemap(c){
      var W=420,H=300,s='<svg class="'+P+'-svg" viewBox="0 0 '+W+' '+H+'" role="img" aria-label="Treemap por capítulos">', nodes=[];
      var data=c.caps.filter(function(x){return x.v>0;});
      if(window.d3&&d3.treemap){ var rt=d3.hierarchy({children:data}).sum(function(d){return d.v||0;}).sort(function(a,b){return b.value-a.value;}); d3.treemap().size([W,H]).paddingInner(3).round(true)(rt); rt.leaves().forEach(function(l){ nodes.push({x:l.x0,y:l.y0,w:l.x1-l.x0,h:l.y1-l.y0,d:l.data}); }); }
      else { var x=0; data.forEach(function(d){ var w=d.v/c.D*W; nodes.push({x:x,y:0,w:w-2,h:H,d:d}); x+=w; }); }
      nodes.forEach(function(n){ var on=hl===n.d.k; s+='<g class="'+P+'-seg" data-act="hl" data-v="'+n.d.k+'"><rect x="'+n.x+'" y="'+n.y+'" width="'+Math.max(0,n.w)+'" height="'+Math.max(0,n.h)+'" fill="'+n.d.col+'" fill-opacity="'+(hl&&!on?.15:.28)+'" stroke="'+n.d.col+'" stroke-width="'+(on?2:1)+'"/>'+
        (n.w>58&&n.h>30?'<text x="'+(n.x+6)+'" y="'+(n.y+15)+'" font-size="9.5" fill="'+n.d.col+'">'+E(n.d.sn)+'</text><text x="'+(n.x+6)+'" y="'+(n.y+28)+'" font-size="10.5">'+fmt(n.d.v/c.D*100,1)+'%</text>':'')+'<title>'+E(n.d.n)+': '+money(n.d.v)+'</title></g>'; });
      return s+'</svg>';
    }
    function macroHTML(){
      var c=costCalc(ctx,st), T=c.T, rng=[Math.round(T[1][0]*.7/10)*10,Math.round(T[1][3]*1.3/10)*10];
      var s='<div class="'+P+'-row" style="margin-bottom:10px"><span class="'+P+'-h" style="margin:0">Estimación paramétrica · '+E(T[0])+(ctx.tipo?' · '+E(ctx.tipo.n):'')+'</span><span class="'+P+'-sp"></span><span class="'+P+'-pre">Prediseño · referencial Ecuador 2025–2026</span>'+
        '<button class="'+P+'-btn" data-act="csv">'+gly("dl",14)+' Exportar CSV</button></div>';
      s+='<div data-z="kpi">'+kpis(c)+'</div><div class="'+P+'-g2" style="margin-top:12px"><div class="'+P+'-card '+P+'-ctl">';
      s+='<div class="'+P+'-h">Parámetros</div>';
      s+=sl("pct","Área bruta construida",st.pct,10,100,1,fmt(c.A)+" m²",st.pct+" % del máximo permitido por el CUS");
      s+='<div><div class="'+P+'-sl"><label>Estándar de acabados</label></div><div class="'+P+'-row">'+STD.map(function(x,i){ return '<button class="'+P+'-chip'+(st.std===x[0]?' on':'')+'" data-act="std" data-v="'+x[0]+'">'+x[1]+' <span class="'+P+'-mono" style="opacity:.6">'+T[1][i]+'</span></button>'; }).join("")+'</div></div>';
      s+='<div class="'+P+'-card '+(st.conf?'':P+'-warnbox')+'" style="padding:10px">'+sl("m2","Costo directo por m²",Math.round(c.m2),rng[0],rng[1],5,money(c.m2)+"/m²","Rango de mercado "+money(T[1][0])+"–"+money(T[1][3])+" ("+E(T[0])+")")+
        '<div class="'+P+'-row" style="margin-top:6px">'+(st.conf?'<span class="'+P+'-okt">Confirmado</span>':'<span class="'+P+'-pv">Por verificar</span><button class="'+P+'-btn" data-act="conf">'+gly("check",14)+' Confirmar</button>')+(st.m2!=null?'<button class="'+P+'-btn" data-act="m2reset">Restablecer</button>':'')+'</div></div>';
      s+=sl("ind","Indirectos + utilidad",st.ind,10,35,.5,fmt(st.ind,1)+" %","Típico 18–25 % (dirección técnica, administración, garantías, utilidad)");
      s+=sl("cont","Imprevistos",st.cont,0,15,.5,fmt(st.cont,1)+" %");
      s+=sl("hon","Honorarios diseño + ingenierías",st.hon,2,14,.5,fmt(st.hon,1)+" %","Arancel referencial del Colegio de Arquitectos del Ecuador (≈ 4–6 % arquitectura) + ingenierías (≈ 2–3 %)");
      s+=sl("fis","Fiscalización",st.fis,0,8,.5,fmt(st.fis,1)+" %");
      s+=sl("per","Permisos, tasas e inscripciones",st.per,0,5,.1,fmt(st.per,1)+" %","Línea de fábrica, aprobación de planos, permiso de construcción, Bomberos, acometidas");
      s+='<div class="'+P+'-row"><button class="'+P+'-chip'+(st.iva?' on':'')+'" data-act="iva">'+gly("check",14)+' IVA 15 %</button><button class="'+P+'-chip'+(st.tec?' on':'')+'" data-act="tec">'+gly("bolt",14)+' Tecnología +'+fmt(c.tp,1)+' %</button>'+
        (c.sis?'<button class="'+P+'-chip'+(st.sisOn?' on':'')+'" data-act="sisOn">'+gly("layers",14)+' Sistema ×'+fmt(c.sis.fc,2)+'</button>':'')+'</div>';
      s+='<div class="'+P+'-fnt">'+(c.sis?'Sistema constructivo desde Materiales: <b style="color:var(--ink)">'+E(c.sis.n)+'</b> (estructura ×'+fmt(c.sis.fc,2)+').':'Sin sistema constructivo elegido en Materiales: se asume pórtico de H.A.')+'</div>';
      s+='</div><div class="'+P+'-col" data-z="out">'+macroOut(c)+'</div></div>';
      return s;
    }
    function macroOut(c){
      var T=c.T, s='<div class="'+P+'-card"><div class="'+P+'-h">Cascada de la inversión</div>'+cascade(c)+'</div>';
      s+='<div class="'+P+'-card"><div class="'+P+'-row" style="margin-bottom:8px"><span class="'+P+'-h" style="margin:0">Capítulos del presupuesto</span><span class="'+P+'-sp"></span><button class="'+P+'-chip'+(CS.vis==="donut"?' on':'')+'" data-act="vis" data-v="donut">Anillo</button><button class="'+P+'-chip'+(CS.vis==="tree"?' on':'')+'" data-act="vis" data-v="tree">Treemap</button></div>';
      s+='<div class="'+P+'-ch"><div>'+(CS.vis==="donut"?donut(c):treemap(c))+'</div><div class="'+P+'-lg">'+c.caps.map(function(cp){ return '<button class="'+P+'-li'+(hl===cp.k?' on':'')+'" data-act="hl" data-v="'+cp.k+'"><i style="background:'+cp.col+';box-shadow:0 0 6px '+cp.col+'"></i><span>'+E(cp.n)+'</span><b>'+money(cp.v)+'</b><span>'+fmt(cp.v/c.D*100,1)+'%</span></button>'; }).join("")+'</div></div>';
      s+='<p class="'+P+'-fnt" style="margin:8px 0 0">Perfil de distribución "'+T[2]+'" según tipología. Valores referenciales para prediseño (Clase 5 AACE: −30 % / +50 %).</p></div>';
      return s;
    }
    function apuHTML(){
      var a=st.apu[CS.apu], r=apuCalc(a), ind=st.ind;
      var s='<div class="'+P+'-row" style="margin-bottom:10px"><span class="'+P+'-h" style="margin:0">Análisis de precios unitarios</span><span class="'+P+'-sp"></span><span class="'+P+'-pre">Formato Contraloría / SERCOP</span>'+(st.apuConf?'<span class="'+P+'-okt">Precios confirmados</span>':'<span class="'+P+'-pv">Precios por verificar</span><button class="'+P+'-btn" data-act="apuconf">'+gly("check",14)+' Confirmar</button>')+'<button class="'+P+'-btn" data-act="apureset">Restablecer</button></div>';
      s+='<div class="'+P+'-chips">'+st.apu.map(function(x,i){ return '<button class="'+P+'-chip'+(i===CS.apu?' on':'')+'" data-act="apusel" data-v="'+i+'">'+(i+1)+'. '+E(x.n.split("(")[0])+'</button>'; }).join("")+'</div>';
      s+='<div class="'+P+'-card '+(st.apuConf?'':P+'-warnbox')+' '+P+'-apu"><div class="'+P+'-row"><div><div class="'+P+'-h2">'+E(a.n)+'</div><div class="'+P+'-fnt">'+E(a.nota)+'</div></div><span class="'+P+'-sp"></span>'+
        '<div style="width:130px"><div class="'+P+'-fnt" style="font-family:var(--f-d);font-size:7.5px;letter-spacing:.14em">RENDIMIENTO R (h/'+E(a.u)+')</div><input class="'+P+'-in" data-act="apuR" type="number" step="0.01" min="0.01" value="'+a.R+'"></div>'+
        '<div style="width:110px"><div class="'+P+'-fnt" style="font-family:var(--f-d);font-size:7.5px;letter-spacing:.14em">HERR. MENOR % M.O.</div><input class="'+P+'-in" data-act="apuHM" type="number" step="0.5" min="0" value="'+a.hm+'"></div></div>';
      function inp(sec,i,j,v,lab,step){ return '<div><span>'+lab+'</span><input class="'+P+'-in" type="number" inputmode="decimal" step="'+(step||"0.01")+'" min="0" value="'+v+'" data-act="apuin" data-sec="'+sec+'" data-i="'+i+'" data-j="'+j+'"></div>'; }
      s+='<div class="'+P+'-sec"><div class="'+P+'-sh">A · Equipo<b data-o="eq">'+money(r.eq,2)+'</b></div>'+a.eq.map(function(x,i){ return '<div class="'+P+'-r"><div><span>Descripción</span><div class="'+P+'-dsc">'+E(x[0])+'</div></div>'+inp("eq",i,1,x[1],"Cantidad")+inp("eq",i,2,x[2],"Tarifa $/h")+'<div><span>Costo hora</span><div class="'+P+'-v" data-o="eq'+i+'h">'+money(x[1]*x[2],2)+'</div></div><div><span>Costo</span><div class="'+P+'-v" data-o="eq'+i+'">'+money(x[1]*x[2]*a.R,3)+'</div></div></div>'; }).join("")+
        '<div class="'+P+'-r"><div><span>Descripción</span><div class="'+P+'-dsc">Herramienta menor ('+fmt(a.hm,1)+' % de M.O.)</div></div><div></div><div></div><div></div><div><span>Costo</span><div class="'+P+'-v" data-o="hm">'+money(r.mo*a.hm/100,3)+'</div></div></div></div>';
      s+='<div class="'+P+'-sec"><div class="'+P+'-sh">B · Mano de obra<b data-o="mo">'+money(r.mo,2)+'</b></div>'+a.mo.map(function(x,i){ return '<div class="'+P+'-r"><div><span>Categoría · estructura ocupacional</span><div class="'+P+'-dsc">'+E(x[0])+' · '+x[1]+'</div></div>'+inp("mo",i,2,x[2],"Cantidad","0.1")+inp("mo",i,3,x[3],"Jornal $/h")+'<div><span>Costo hora</span><div class="'+P+'-v" data-o="mo'+i+'h">'+money(x[2]*x[3],2)+'</div></div><div><span>Costo</span><div class="'+P+'-v" data-o="mo'+i+'">'+money(x[2]*x[3]*a.R,3)+'</div></div></div>'; }).join("")+'</div>';
      s+='<div class="'+P+'-sec"><div class="'+P+'-sh">C · Materiales<b data-o="mat">'+money(r.mat,2)+'</b></div>'+a.mat.map(function(x,i){ return '<div class="'+P+'-r"><div><span>Descripción</span><div class="'+P+'-dsc">'+E(x[0])+'</div></div><div><span>Unidad</span><div class="'+P+'-dsc '+P+'-mono">'+E(x[1])+'</div></div>'+inp("mat",i,2,x[2],"Cantidad","0.001")+inp("mat",i,3,x[3],"Precio unit.")+'<div><span>Costo</span><div class="'+P+'-v" data-o="mat'+i+'">'+money(x[2]*x[3],3)+'</div></div></div>'; }).join("")+'</div>';
      s+='<div class="'+P+'-sec"><div class="'+P+'-sh">D · Transporte<b data-o="tr">'+money(r.tr,2)+'</b></div>'+a.tr.map(function(x,i){ return '<div class="'+P+'-r"><div><span>Descripción</span><div class="'+P+'-dsc">'+E(x[0])+'</div></div><div><span>Unidad</span><div class="'+P+'-dsc '+P+'-mono">'+E(x[1])+'</div></div>'+inp("tr",i,2,x[2],"Cantidad","0.001")+inp("tr",i,3,x[3],"Tarifa")+'<div><span>Costo</span><div class="'+P+'-v" data-o="tr'+i+'">'+money(x[2]*x[3],3)+'</div></div></div>'; }).join("")+'</div>';
      s+='<div class="'+P+'-tot"><div class="'+P+'-kpi"><span>Costo directo</span><b data-o="d">'+money(r.d,2)+'</b></div><div class="'+P+'-kpi"><span>Indirectos '+fmt(ind,1)+' %</span><b data-o="i">'+money(r.d*ind/100,2)+'</b></div><div class="'+P+'-kpi" style="border-color:rgba(var(--done-rgb),.5)"><span>Precio unitario</span><b data-o="pu" style="color:var(--done)">'+money(r.d*(1+ind/100),2)+'</b><i>por '+E(a.u)+' · sin IVA</i></div></div>';
      s+='<p class="'+P+'-fnt" style="margin:0">Costo = Cantidad × Tarifa × R (equipo y mano de obra) · Cantidad × Precio (materiales y transporte). Costos horarios referenciales de la estructura ocupacional de la Contraloría General del Estado (SBU 2026 ≈ USD 482): '+SALR.map(function(x){return x[0]+" "+x[1]+" "+money(x[2],2);}).join(" · ")+'. Verificar con la tabla vigente y cotizaciones locales.</p></div>';
      return s;
    }
    function updApu(){
      var a=st.apu[CS.apu], r=apuCalc(a), q=function(k,v){ var e=main.querySelector('[data-o="'+k+'"]'); if(e) e.textContent=v; };
      a.eq.forEach(function(x,i){ q("eq"+i+"h",money(x[1]*x[2],2)); q("eq"+i,money(x[1]*x[2]*a.R,3)); });
      a.mo.forEach(function(x,i){ q("mo"+i+"h",money(x[2]*x[3],2)); q("mo"+i,money(x[2]*x[3]*a.R,3)); });
      a.mat.forEach(function(x,i){ q("mat"+i,money(x[2]*x[3],3)); }); a.tr.forEach(function(x,i){ q("tr"+i,money(x[2]*x[3],3)); });
      q("hm",money(r.mo*a.hm/100,3)); q("eq",money(r.eq,2)); q("mo",money(r.mo,2)); q("mat",money(r.mat,2)); q("tr",money(r.tr,2));
      q("d",money(r.d,2)); q("i",money(r.d*st.ind/100,2)); q("pu",money(r.d*(1+st.ind/100),2));
    }
    function cronoHTML(){
      var c=costCalc(ctx,st), M=monthly(c), N=c.dur;
      var s='<div class="'+P+'-row" style="margin-bottom:10px"><span class="'+P+'-h" style="margin:0">Cronograma valorado</span><span class="'+P+'-sp"></span><span class="'+P+'-pre">Prediseño · distribución típica por capítulo</span><button class="'+P+'-btn" data-act="csv">'+gly("dl",14)+' CSV</button></div>';
      s+='<div class="'+P+'-g2"><div class="'+P+'-card '+P+'-ctl">'+sl("dur","Duración de obra",N,3,48,1,N+" meses","Estimado automático: "+c.durAuto+" meses para "+fmt(c.A)+" m²"+(c.sis?" con "+c.sis.n:""))+
        (st.dur?'<button class="'+P+'-btn" data-act="durreset">Usar estimado automático</button>':'')+
        '<div data-z="ck">'+cronoK(c,M)+'</div><p class="'+P+'-fnt" style="margin:0">El flujo mensual incluye la parte proporcional de indirectos, honorarios, permisos e IVA. Úsalo para planificar el financiamiento y las planillas de avance.</p></div><div class="'+P+'-col" data-z="cs">'+cronoS(c,M)+'</div></div><div data-z="cg">'+cronoG(c,M)+'</div>';
      return s;
    }
    function cronoK(c,M){ var N=c.dur; return '<div class="'+P+'-kpis"><div class="'+P+'-kpi"><span>Inversión total</span><b>'+money(c.tot)+'</b></div><div class="'+P+'-kpi"><span>Promedio mensual</span><b>'+money(c.tot/N)+'</b></div><div class="'+P+'-kpi"><span>Mes pico</span><b>'+money(Math.max.apply(null,M.tm))+'</b><i>M'+(M.tm.indexOf(Math.max.apply(null,M.tm))+1)+'</i></div></div>'; }
    function cronoS(c,M){
      var N=c.dur;
      /* Curva S */
      var W=760,H=300,pl=58,pr=46,pt=18,pb=34,iw=W-pl-pr,ih=H-pt-pb, mx=Math.max.apply(null,M.tm)||1, bw=iw/N;
      var g='<svg class="'+P+'-svg" viewBox="0 0 '+W+' '+H+'" role="img" aria-label="Curva S de inversión acumulada"><defs><linearGradient id="'+P+'-gb" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#38E1FF" stop-opacity=".75"/><stop offset="1" stop-color="#38E1FF" stop-opacity=".08"/></linearGradient><linearGradient id="'+P+'-ga" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#B6FF3C" stop-opacity=".22"/><stop offset="1" stop-color="#B6FF3C" stop-opacity="0"/></linearGradient></defs>';
      for(var k=0;k<=4;k++){ var yy=pt+ih*(1-k/4); g+='<line x1="'+pl+'" x2="'+(W-pr)+'" y1="'+yy+'" y2="'+yy+'" stroke="rgba(56,225,255,.12)" stroke-dasharray="3 4"/><text x="'+(W-pr+6)+'" y="'+(yy+3)+'" font-size="10" fill="#B6FF3C">'+(k*25)+'%</text><text x="'+(pl-6)+'" y="'+(yy+3)+'" font-size="9.5" text-anchor="end" fill="var(--muted)">'+(mx*k/4>=1e6?fmt(mx*k/4/1e6,1)+"M":fmt(mx*k/4/1e3,0)+"k")+'</text>'; }
      M.tm.forEach(function(v,i){ var h=v/mx*ih; g+='<rect x="'+(pl+i*bw+bw*.16)+'" y="'+(pt+ih-h)+'" width="'+(bw*.68)+'" height="'+h+'" fill="url(#'+P+'-gb)" stroke="#38E1FF" stroke-opacity=".5"><title>Mes '+(i+1)+': '+money(v)+'</title></rect>'; if(N<=24||i%2===0) g+='<text x="'+(pl+i*bw+bw/2)+'" y="'+(H-14)+'" font-size="9.5" text-anchor="middle" fill="var(--muted)">M'+(i+1)+'</text>'; });
      var pts=[[pl,pt+ih]].concat(M.cum.map(function(v,i){ return [pl+(i+1)*bw,pt+ih*(1-v/c.tot)]; }));
      var d="M"+pts.map(function(p){return p[0].toFixed(1)+" "+p[1].toFixed(1);}).join("L");
      g+='<path d="'+d+'L'+(pl+iw)+' '+(pt+ih)+'Z" fill="url(#'+P+'-ga)"/><path d="'+d+'" fill="none" stroke="#B6FF3C" stroke-width="2.5" style="filter:drop-shadow(0 0 6px #B6FF3C)"/>';
      pts.slice(1).forEach(function(p,i){ g+='<circle cx="'+p[0]+'" cy="'+p[1]+'" r="3.2" fill="var(--bg)" stroke="#B6FF3C" stroke-width="1.5"><title>Acumulado M'+(i+1)+': '+money(M.cum[i])+' ('+fmt(M.cum[i]/c.tot*100,1)+' %)</title></circle>'; });
      g+='<line x1="'+pl+'" x2="'+(W-pr)+'" y1="'+(pt+ih/2)+'" y2="'+(pt+ih/2)+'" stroke="#B6FF3C" stroke-opacity=".35" stroke-dasharray="6 4"/><text x="'+(pl+6)+'" y="'+(pt+ih/2-5)+'" font-size="9.5" fill="#B6FF3C">50 % de la inversión</text>';
      g+='<text x="'+pl+'" y="'+(H-2)+'" font-size="9" fill="var(--faint)">Barras: inversión mensual (USD) · Línea: curva S acumulada (%)</text></svg>';
      return '<div class="'+P+'-card"><div class="'+P+'-h">Curva S · avance financiero planificado</div><div style="overflow-x:auto"><div style="min-width:520px">'+g+'</div></div></div>';
    }
    function cronoG(c,M){
      var N=c.dur, s='';
      /* Gantt valorado */
      var cw=Math.max(34,Math.min(56,Math.floor(640/N))), lw=120, GW=lw+N*cw+90, rh=26, GH=24+CAP.length*rh+30;
      var gg='<svg viewBox="0 0 '+GW+' '+GH+'" width="'+GW+'" height="'+GH+'" class="'+P+'-svg" style="width:'+GW+'px" role="img" aria-label="Diagrama de Gantt valorado">';
      for(var i=0;i<N;i++) gg+='<text x="'+(lw+i*cw+cw/2)+'" y="15" font-size="9.5" text-anchor="middle" fill="var(--muted)">M'+(i+1)+'</text><line x1="'+(lw+i*cw)+'" x2="'+(lw+i*cw)+'" y1="20" y2="'+(GH-28)+'" stroke="rgba(56,225,255,.07)"/>';
      gg+='<text x="'+(lw+N*cw+8)+'" y="15" font-size="9.5" fill="var(--muted)">TOTAL</text>';
      M.rows.forEach(function(r,j){ var y=24+j*rh, mxr=Math.max.apply(null,r.m)||1;
        gg+='<text x="4" y="'+(y+16)+'" font-size="10" fill="var(--ink)">'+E(r.cp.sn)+'</text>';
        r.m.forEach(function(v,i){ if(v<=0) return; gg+='<rect x="'+(lw+i*cw+1)+'" y="'+(y+4)+'" width="'+(cw-2)+'" height="'+(rh-8)+'" fill="'+r.cp.col+'" fill-opacity="'+(.12+.75*v/mxr).toFixed(2)+'" stroke="'+r.cp.col+'" stroke-opacity=".5"><title>'+E(r.cp.n)+' · M'+(i+1)+': '+money(v)+'</title></rect>'; });
        gg+='<text x="'+(lw+N*cw+8)+'" y="'+(y+16)+'" font-size="10" fill="'+r.cp.col+'">'+(r.cp.v>=1e6?fmt(r.cp.v/1e6,2)+"M":fmt(r.cp.v/1e3,0)+"k")+'</text>'; });
      var yT=24+CAP.length*rh+16; gg+='<text x="4" y="'+yT+'" font-size="10" fill="var(--done)">Directo mensual</text>';
      M.dm.forEach(function(v,i){ gg+='<text x="'+(lw+i*cw+cw/2)+'" y="'+yT+'" font-size="8.5" text-anchor="middle" fill="var(--done)">'+(v>=1e6?fmt(v/1e6,1)+"M":fmt(v/1e3,0)+"k")+'</text>'; });
      gg+='</svg>';
      s+='<div class="'+P+'-card" style="margin-top:12px"><div class="'+P+'-h">Gantt valorado por capítulo (costo directo)</div><div class="'+P+'-gw">'+gg+'</div></div>';
      s+='<div class="'+P+'-card" style="margin-top:12px"><div class="'+P+'-h">Tabla de flujo mensual</div><div class="'+P+'-gw" style="max-height:320px;overflow:auto"><table class="'+P+'-tb"><thead><tr><th>Mes</th><th>Directo</th><th>Inversión</th><th>Acumulado</th><th>% acum.</th></tr></thead><tbody>'+
        M.tm.map(function(v,i){ return '<tr><td>M'+(i+1)+'</td><td>'+money(M.dm[i])+'</td><td>'+money(v)+'</td><td>'+money(M.cum[i])+'</td><td>'+fmt(M.cum[i]/c.tot*100,1)+'%</td></tr>'; }).join("")+'</tbody></table></div></div>';
      return s;
    }
    function csv(){
      var c=costCalc(ctx,st), M=monthly(c), n2=function(v){ return (Math.round(v*100)/100).toFixed(2).replace(".",","); };
      var R=[["DION · Ingeniería de costos · PREDISEÑO (referencial Ecuador 2025-2026)"+(st.conf?"":" · POR VERIFICAR")],["Proyecto",(ctx.P&&ctx.P.nombre)||""],["Tipología",c.T[0]],["Área bruta m2",c.A],["Costo directo por m2",n2(c.m2)],["Estándar",STD[c.si][1]],[],["Capítulo","% directo","USD"]];
      c.caps.forEach(function(cp){ R.push([cp.n,n2(cp.v/c.D*100),n2(cp.v)]); });
      R.push(["Costo directo","",n2(c.D)],["Tecnología",n2(c.tp),n2(c.Tc)],["Indirectos + utilidad",n2(st.ind),n2(c.I)],["Imprevistos",n2(st.cont),n2(c.cont)],["Honorarios",n2(st.hon),n2(c.hon)],["Fiscalización",n2(st.fis),n2(c.fis)],["Permisos",n2(st.per),n2(c.per)],["IVA","15",n2(c.iva)],["TOTAL","",n2(c.tot)],[],["Cronograma valorado","Mes","Directo","Inversión","Acumulado","% acumulado"]);
      M.tm.forEach(function(v,i){ R.push(["","M"+(i+1),n2(M.dm[i]),n2(v),n2(M.cum[i]),n2(M.cum[i]/c.tot*100)]); });
      R.push([],["APU","Rubro","Unidad","Costo directo","Precio unitario"]);
      st.apu.forEach(function(a){ var r=apuCalc(a); R.push(["",a.n,a.u,n2(r.d),n2(r.d*(1+st.ind/100))]); });
      return "﻿"+R.map(function(r){ return r.map(function(v){ v=String(v==null?"":v); return /[;"\n]/.test(v)?'"'+v.replace(/"/g,'""')+'"':v; }).join(";"); }).join("\n");
    }
    function paint(){
      root.querySelectorAll("."+P+"-tab").forEach(function(b){ b.setAttribute("aria-selected",b.dataset.v===CS.tab); });
      main.innerHTML=CS.tab==="macro"?macroHTML():CS.tab==="apu"?apuHTML():cronoHTML();
      main.scrollTop=CS.scroll[CS.tab]||0;
    }
    function repaint(){ var sc=main.scrollTop; var f=document.activeElement&&document.activeElement.id; main.innerHTML=CS.tab==="macro"?macroHTML():CS.tab==="apu"?apuHTML():cronoHTML(); main.scrollTop=sc; if(f){ var e=document.getElementById(f); if(e) e.focus({preventScroll:true}); } }
    function live(k){
      var c=costCalc(ctx,st), lab={pct:fmt(c.A)+" m²",m2:money(c.m2)+"/m²",ind:fmt(st.ind,1)+" %",cont:fmt(st.cont,1)+" %",hon:fmt(st.hon,1)+" %",fis:fmt(st.fis,1)+" %",per:fmt(st.per,1)+" %",dur:c.dur+" meses"};
      var o=main.querySelector('[data-o="'+k+'"]'); if(o) o.textContent=lab[k];
      if(k==="pct"){ var sm=o&&o.parentNode.parentNode.querySelector("small"); if(sm) sm.textContent=st.pct+" % del máximo permitido por el CUS"; }
      var z=function(n,h){ var e=main.querySelector('[data-z="'+n+'"]'); if(e) e.innerHTML=h; };
      if(CS.tab==="macro"){ z("kpi",kpis(c)); z("out",macroOut(c)); }
      else if(CS.tab==="crono"){ var M=monthly(c); z("ck",cronoK(c,M)); z("cs",cronoS(c,M)); z("cg",cronoG(c,M)); }
    }
    root.addEventListener("click",function(ev){
      var b=ev.target.closest("[data-act]"); if(!b||!root.contains(b)) return; var a=b.dataset.act, v=b.dataset.v;
      if(a==="tab"){ CS.tab=v; paint(); }
      else if(a==="next") ctx.next();
      else if(a==="std"){ st.std=v; st.m2=null; save(); repaint(); }
      else if(a==="conf"){ st.conf=true; save(); ctx.toast("Costo por m² confirmado"); repaint(); }
      else if(a==="m2reset"){ st.m2=null; save(); repaint(); }
      else if(a==="iva"||a==="tec"||a==="sisOn"){ st[a]=!st[a]; save(); repaint(); }
      else if(a==="vis"){ CS.vis=v; repaint(); }
      else if(a==="hl"){ hl=hl===v?null:v; repaint(); }
      else if(a==="apusel"){ CS.apu=+v; repaint(); }
      else if(a==="apuconf"){ st.apuConf=true; save(); ctx.toast("Precios del APU confirmados"); repaint(); }
      else if(a==="apureset"){ st.apu[CS.apu]=clone(APU0[CS.apu]); save(); repaint(); }
      else if(a==="durreset"){ st.dur=null; save(); repaint(); }
      else if(a==="csv") ctx.download("presupuesto-"+String((ctx.P&&ctx.P.nombre)||"proyecto").replace(/\s+/g,"-").toLowerCase()+".csv",csv());
    });
    root.addEventListener("input",function(ev){
      var t=ev.target, a=t.dataset.act; if(!a) return;
      if(a==="sl"){ var k=t.dataset.k, v=+t.value; if(k==="dur") st.dur=v; else st[k]=v; save(); live(k); }
      else if(a==="apuin"){ var ap=st.apu[CS.apu]; ap[t.dataset.sec][+t.dataset.i][+t.dataset.j]=Math.max(0,num(t.value,0)); save(); updApu(); }
      else if(a==="apuR"){ st.apu[CS.apu].R=Math.max(0.001,num(t.value,0.001)); save(); updApu(); }
      else if(a==="apuHM"){ st.apu[CS.apu].hm=Math.max(0,num(t.value,0)); save(); updApu(); }
    });
    paint();
    return function(){ root.remove(); };
  }
};

/* ═══════════════════════════ 3. TECNOLOGÍA ARQUITECTÓNICA ═══════════════════════════ */
var TG={
 AUT:{n:"Automatización y control",c:"#38E1FF"},SEG:{n:"Seguridad electrónica",c:"#FF5C7A"},INC:{n:"Vida e incendio",c:"#FF8A5C"},COM:{n:"Comunicaciones y TI",c:"#4F7DFF"},
 ENE:{n:"Energía",c:"#FFC24B"},AGU:{n:"Agua",c:"#2BB3FF"},AMB:{n:"Confort y aire",c:"#4FFFB0"},LOG:{n:"Logística y movilidad",c:"#D9F25A"},
 ENV:{n:"Envolvente dinámica",c:"#B26BFF"},DIG:{n:"Digital y gemelo",c:"#7C6CFF"},SAL:{n:"Tecnología en salud",c:"#B6FF3C"},AV:{n:"Audiovisual y escena",c:"#E36BE0"}
};
/* id|nombre|etiqueta|grupo|qué es|categorías (códigos o *)|costo relativo 1–5|espacio técnico (nombre:m²)|clase IFC4|protocolos / normas|enlaces */
var TEC_RAW=[
"knx|Domótica / inmótica KNX|KNX|AUT|Bus de campo estándar abierto (ISO/IEC 14543-3) para iluminación, persianas, clima y escenas; miles de fabricantes interoperables.|RES HOS OFI MIX EDU SAL GOB CUL|3|Tablero de automatización por piso:1.5|IfcController / IfcUnitaryControlElement|KNX TP/IP · ISO/IEC 14543|bms dali persianas presencia",
"zigbee|Red inalámbrica Zigbee|Zigbee|AUT|Malla de bajo consumo para sensores y actuadores inalámbricos; ideal en remodelaciones sin cableado.|RES HOS GAS COM|1|—|IfcCommunicationsAppliance|IEEE 802.15.4 · Zigbee 3.0|matter iot",
"matter|Matter / Thread (hogar conectado)|Matter|AUT|Estándar de interoperabilidad (CSA, 2022) que unifica ecosistemas Apple, Google, Amazon y Samsung sobre IP.|RES HOS|1|—|IfcCommunicationsAppliance|Matter 1.x · Thread · Wi-Fi|zigbee wifi",
"dali|Control de iluminación DALI-2|DALI-2|AUT|Protocolo digital (IEC 62386) para direccionar y atenuar cada luminaria, con escenas y regulación por luz natural.|OFI EDU SAL HOS CUL COM GOB CIE TRA EVE|3|—|IfcLightFixture / IfcController|IEC 62386 · DALI-2 · D4i|knx bms presencia",
"bms|BMS / sistema de gestión del edificio|BMS|AUT|Supervisa y optimiza HVAC, iluminación, energía, agua y alarmas desde una plataforma central con tendencias y alarmas.|OFI SAL HOS EDU CUL GOB SEG TRA EVE CIE IND MIX COM INF|4|Centro de control BMS / sala de monitoreo:16|IfcController / IfcUnitaryControlElement|BACnet/IP (ISO 16484-5) · Modbus · OPC UA|modbus hvac energia gemelo cmms",
"modbus|Integración Modbus / OPC UA|Modbus|AUT|Pasarelas que integran equipos (chillers, tableros, generadores, bombas) a la red de supervisión.|IND SAL OFI INF TRA CIE AGR|2|—|IfcController|Modbus RTU/TCP · OPC UA (IEC 62541)|bms generador bombeo",
"persianas|Persianas y cortinas motorizadas|Cortinas|AUT|Motores con control por escenas, sensores solares y horario; reducen ganancia térmica y deslumbramiento.|RES HOS OFI SAL EDU CUL|2|—|IfcShadingDevice / IfcActuator|KNX · Somfy RTS/io · Zigbee|knx fachada",
"presencia|Sensores de presencia y ocupación|Presencia|AUT|Detectores PIR/ultrasónicos/radar que apagan luz y clima en espacios vacíos y alimentan analítica de uso.|OFI EDU SAL HOS GOB CUL COM MIX|1|—|IfcSensor|KNX · DALI-2 · BACnet|dali knx conteo",
"cctv|CCTV IP|CCTV IP|SEG|Cámaras IP con grabación en NVR/VMS, PoE y almacenamiento por días según riesgo.|*|3|Cuarto de monitoreo de seguridad:12|IfcAudioVisualAppliance (CAMERA)|ONVIF Perfil S/T · IEC 62676|vca acceso red ciber",
"vca|Analítica de video con IA|Analítica IA|SEG|Detección de intrusión, aglomeraciones, objetos abandonados, caídas o conteo de personas sobre el CCTV.|COM TRA SAL EDU EVE SEG GOB DEP PUB IND|3|—|IfcAudioVisualAppliance|ONVIF Perfil M · VMS|cctv conteo gemelo",
"lpr|Lectura de placas (ANPR/LPR)|LPR|SEG|Cámaras que leen placas para control de parqueaderos, accesos vehiculares y listas negras.|COM OFI SAL TRA SEG GOB IND EVE MIX|2|—|IfcAudioVisualAppliance|ONVIF · integración con parqueo|parqueo cctv",
"acceso|Control de accesos (tarjeta / biométrico / móvil)|Accesos|SEG|Lectores RFID, biométricos y credenciales móviles con niveles por zona y registro de eventos.|OFI SAL EDU GOB SEG CIE IND HOS MIX TRA INF|3|Cuarto de seguridad / rack de accesos:4|IfcSensor / IfcActuator (cerraduras)|OSDP v2 · Wiegand (legado) · NFPA 101 (egreso)|cctv incendio ciber",
"intrusion|Alarma de intrusión|Intrusión|SEG|Sensores perimetrales, magnéticos y volumétricos con central y monitoreo 24/7.|*|1|—|IfcAlarm / IfcSensor|EN 50131 · SIA|cctv acceso",
"perimetral|Detección perimetral (fibra / radar / barreras)|Perímetro|SEG|Detecta intrusión en cercos o predios extensos con fibra sensora, radar o barreras infrarrojas.|IND INF SEG AGR TRA CIE|3|—|IfcSensor|Integración PSIM|cctv vca",
"videoportero|Videoportero / intercomunicación IP|Videoportero|SEG|Intercomunicadores SIP con video en accesos peatonales, vinculados a apertura remota.|RES MIX OFI SAL EDU HOS|1|—|IfcCommunicationsAppliance|SIP · ONVIF|acceso telefonia",
"panico|Botones de pánico y llamado de emergencia|Pánico|SEG|Pulsadores y apps que alertan a seguridad o al ECU 911 en bancos, escuelas, salud y servicios.|SAL EDU COM GOB SEG SOC|1|—|IfcAlarm|Integración con central|intrusion megafonia",
"incendio|Detección de incendio direccionable|Detección|INC|Central direccionable con detectores de humo/calor y pulsadores; ubica el evento por dispositivo.|*|3|Cuarto de central de incendio / control de Bomberos:6|IfcAlarm / IfcSensor (SMOKESENSOR)|NFPA 72 · Reglamento de Prevención de Incendios (Ecuador) · NEC|megafonia rociadores presion bms",
"vesda|Detección temprana por aspiración (VESDA)|Aspiración|INC|Muestreo de aire con láser para detectar humo incipiente en data centers, quirófanos o archivos.|SAL CIE CUL INF GOB|3|—|IfcSensor|NFPA 72 · EN 54-20|incendio datacenter",
"megafonia|Megafonía y evacuación por voz (EVACS)|Evacuación voz|INC|Sistema de audio supervisado para mensajes de evacuación por zonas y música/avisos.|OFI SAL EDU COM HOS CUL EVE TRA DEP GOB MIX|3|Rack de audio / megafonía:3|IfcAudioVisualAppliance (SPEAKER)|NFPA 72 cap. 24 · EN 54-16 · ISO 7240-19|incendio av",
"rociadores|Supervisión de rociadores y bombas contra incendio|Rociadores|INC|Monitoreo de válvulas, flujo y bomba contra incendio con reporte a la central.|OFI SAL HOS COM EDU CUL IND EVE TRA MIX GOB|3|Cuarto de bombas contra incendio + reserva:30|IfcFireSuppressionTerminal / IfcPump|NFPA 13 · NFPA 20 · NFPA 25|incendio bms",
"presion|Presurización de escaleras y control de humo|Control humo|INC|Ventiladores que presurizan escaleras y extraen humo al activarse la alarma.|OFI SAL HOS EDU MIX GOB TRA|3|Cuarto de ventiladores en cubierta:12|IfcFan / IfcDamper|NFPA 92 · NFPA 101|incendio bms",
"agente|Extinción por agente limpio|Agente limpio|INC|Supresión con gases (FK-5-1-12, inerte) que no dañan equipos en data centers y archivos.|CIE INF GOB CUL SAL|4|Sala de cilindros:4|IfcFireSuppressionTerminal|NFPA 2001 · ISO 14520|vesda datacenter",
"gas|Detección de gas y CO|Gas / CO|INC|Sensores de GLP/gas natural y monóxido en cocinas, cuartos de máquinas y parqueaderos.|GAS HOS RES IND SAL EDU COM|1|—|IfcSensor (GASSENSOR / COSENSOR)|NFPA 715 · EN 50545|bms incendio",
"cableado|Cableado estructurado Cat 6A|Cat 6A|COM|Infraestructura física de datos y PoE para todos los sistemas IP del edificio.|*|2|Cuarto de telecomunicaciones (TR) por piso:6|IfcCableSegment / IfcCableCarrierSegment|ANSI/TIA-568 · TIA-569 · TIA-606 · TIA-607|fibra wifi datacenter",
"fibra|Backbone de fibra óptica|Fibra|COM|Columna vertebral entre cuartos de telecomunicaciones y acometida de proveedores.|OFI SAL EDU GOB TRA IND CIE MIX COM INF EVE|2|Cuarto de entrada de servicios (ER):8|IfcCableSegment (FIBERSEGMENT)|TIA-568.3 · ISO/IEC 11801|cableado datacenter",
"wifi|Wi-Fi 6E / 7 de alta densidad|Wi-Fi 6E/7|COM|Puntos de acceso gestionados con roaming, segmentación de redes de huéspedes, IoT y operación.|*|2|—|IfcCommunicationsAppliance (ACCESSPOINT)|IEEE 802.11ax/be · WPA3|cableado iot rtls",
"das|Cobertura celular interior (DAS / small cells)|DAS celular|COM|Antenas distribuidas que garantizan señal 4G/5G y radios de emergencia en sótanos y edificios grandes.|SAL TRA COM OFI EVE DEP HOS GOB|4|Cuarto de cabecera DAS:8|IfcCommunicationsAppliance (ANTENNA)|3GPP · NFPA 1225 (ERCES)|fibra",
"telefonia|Telefonía IP / comunicaciones unificadas|Telefonía IP|COM|Centralita IP con extensiones, llamadas internas, video y movilidad.|OFI SAL HOS EDU GOB SEG COM MIX|1|—|IfcCommunicationsAppliance (TELEPHONE)|SIP · RTP|cableado llamado",
"senal|Señalética digital e IPTV|Señal digital|COM|Pantallas gestionadas para turnos, información, publicidad y TV interna.|SAL TRA COM EDU HOS EVE CUL GOB DEP|2|—|IfcAudioVisualAppliance (DISPLAY)|HDMI-CEC · IPTV · CMS|turnos wayfinding",
"datacenter|Cuarto de servidores / data center|Data center|COM|Sala climatizada con racks, UPS y supresión para servidores locales, HIS, VMS y BMS.|SAL CIE GOB OFI EDU TRA INF IND SEG|4|Data center / cuarto de servidores:25|IfcSpace + IfcElectricDistributionBoard|TIA-942 · Uptime Tier I–IV|ups agente vesda fibra ciber",
"fv|Fotovoltaica on-grid con medición neta|FV on-grid|ENE|Generación solar conectada a la red con medidor bidireccional; en Ecuador se tramita como generación distribuida para autoabastecimiento ante la distribuidora (CNEL EP en Guayas) según la regulación de la ARCERNNR vigente.|*|3|Cuarto de inversores y tableros FV:6|IfcSolarDevice / IfcElectricGenerator|Regulación ARCERNNR de generación distribuida · IEC 61215/61730 · NEC-HS-ER (energías renovables)|bess medicion ev bipv",
"bess|Almacenamiento en baterías (BESS)|Baterías|ENE|Baterías de litio (LFP) para respaldo, recorte de picos y mayor autoconsumo solar.|SAL INF IND CIE SEG OFI RES TRA|4|Cuarto de baterías ventilado y sectorizado:10|IfcElectricFlowStorageDevice|IEC 62619 · NFPA 855 · UL 9540|fv ups microrred",
"ev|Cargadores de vehículos eléctricos|Carga EV|ENE|Estaciones de carga nivel 2 (AC) y rápidas (DC) con gestión de carga; Ecuador impulsa la movilidad eléctrica con incentivos tributarios y tarifa preferencial.|RES OFI COM HOS TRA MIX SAL EDU GOB|2|—|IfcElectricAppliance (CHARGER)|IEC 61851 · OCPP 1.6/2.0.1 · IEC 62196|fv parqueo medicion",
"ups|UPS / energía ininterrumpida|UPS|ENE|Respaldo inmediato de cargas críticas (TI, quirófanos, seguridad) hasta que arranque el generador.|SAL CIE INF GOB OFI SEG TRA EDU IND|3|Cuarto de UPS:8|IfcElectricFlowStorageDevice (UPS)|IEC 62040 · NEC (Ecuador) · NFPA 99 (salud)|generador datacenter bess",
"generador|Grupo electrógeno con transferencia automática (ATS)|Generador",
"ENE|Generador diésel/gas con tablero de transferencia automática; imprescindible ante cortes del sistema eléctrico.|SAL HOS IND GOB SEG TRA INF CIE OFI EDU COM EVE MIX|3|Cuarto de generador con tanque de combustible:25|IfcElectricGenerator / IfcSwitchingDevice|NFPA 110 · NFPA 99 · ISO 8528|ups modbus bms",
"medicion|Submedición inteligente de energía|Submedición|ENE|Medidores por circuito/área con análisis de consumo, demanda y calidad de energía.|OFI SAL IND COM HOS EDU GOB MIX TRA CIE|1|—|IfcFlowMeter (ENERGYMETER)|Modbus · M-Bus · ISO 50001|bms fv gemelo",
"solart|Solar térmica para agua caliente|Solar térmica|ENE|Colectores solares para agua caliente sanitaria en hospitales, hoteles, vivienda y deporte.|SAL HOS RES DEP EDU|2|Cuarto de tanques de ACS:8|IfcSolarDevice (SOLARCOLLECTOR)|ISO 9806 · NEC-HS-ER|bombeo",
"microrred|Microrred con gestión energética (EMS)|Microrred|ENE|Coordina FV, baterías, generador y red para operar en isla y optimizar costos.|INF SAL CIE IND AGR SEG|5|Sala EMS:10|IfcController|IEC 61850 · IEEE 2030.7|fv bess generador",
"grises|Reciclaje de aguas grises|Aguas grises|AGU|Trata aguas de lavamanos y duchas para reúso en inodoros y riego (reduce 25–40 % de consumo).|HOS RES OFI EDU SAL DEP MIX|3|Planta de tratamiento de grises:15|IfcInterceptor / IfcTank|NSF/ANSI 350 · EN 16941-2|bombeo medagua",
"lluvia|Captación de agua lluvia|Agua lluvia|AGU|Recolección en cubiertas, filtrado y almacenamiento para riego, limpieza e inodoros; muy útil con lluvias intensas de la Costa (dic–may).|*|2|Cisterna de agua lluvia:20|IfcTank / IfcPipeSegment|EN 16941-1 · NEC-HS|riego bombeo",
"ptar|Planta de tratamiento de aguas residuales compacta|PTAR|AGU|Tratamiento biológico in situ donde no hay alcantarillado o lo exige el GAD/ambiente.|SAL HOS IND AGR EDU TRA PUB INF|4|Área de PTAR:40|IfcInterceptor|TULSMA (Acuerdo Ministerial 097-A) · normativa del GAD|bombeo",
"medagua|Medición de agua IoT y detección de fugas|Agua IoT|AGU|Medidores con telemetría y alarmas de consumo nocturno anómalo y fugas.|*|1|—|IfcFlowMeter (WATERMETER)|LoRaWAN · NB-IoT · M-Bus|iot bms",
"riego|Riego inteligente|Riego|AGU|Riego por goteo con sensores de humedad y estación meteorológica.|PUB RES HOS EDU DEP AGR CUL|1|—|IfcValve / IfcSensor|ISO 9261|lluvia grises",
"bombeo|Bombeo de presión constante (velocidad variable)|Bombeo VFD|AGU|Bombas con variadores que mantienen presión estable con menor consumo eléctrico.|*|2|Cuarto de bombas y cisterna:20|IfcPump|NEC-HS · IEC 61800|bms modbus",
"hvac|Control de HVAC (VRF / chillers)|Control HVAC|AMB|Control centralizado de climatización con programación por zonas y optimización; clave en clima cálido-húmedo.|OFI SAL HOS COM EDU CUL GOB EVE TRA MIX CIE|4|Cuarto de máquinas / patio de condensadoras:30|IfcUnitaryControlElement / IfcChiller|ASHRAE 90.1 · ASHRAE 55 · BACnet|bms iaq erv",
"iaq|Monitoreo de calidad del aire (CO₂, PM2.5, COV)|Calidad aire|AMB|Sensores que ajustan la ventilación según ocupación y muestran el estado a usuarios.|EDU OFI SAL HOS CUL GOB SOC|1|—|IfcSensor (CO2SENSOR)|ASHRAE 62.1 · WELL v2 · RESET Air|hvac bms",
"erv|Ventilación con recuperación de energía (ERV)|ERV|AMB|Recupera frío y humedad del aire extraído; reduce la carga latente en Guayaquil.|SAL EDU OFI HOS CIE|3|Espacio en cielo técnico / cubierta:6|IfcAirToAirHeatRecovery|ASHRAE 62.1 · AHRI 1060|hvac iaq",
"aislam|Salas de presión diferencial (aislamiento)|Presión dif.|AMB|Monitores de presión positiva/negativa para quirófanos, aislamiento respiratorio y laboratorios.|SAL CIE|4|—|IfcSensor (PRESSURESENSOR)|ASHRAE 170 · ISO 14644 · MSP Ecuador|hvac bms",
"tubos|Correo neumático hospitalario|Tubo neumático|LOG|Red de tubos que transporta muestras y medicamentos entre laboratorio, farmacia y servicios en segundos.|SAL CIE|4|Estación central y ductos verticales:6|IfcTransportElement / IfcPipeSegment|Fabricante · VDI 4505|rtls bms",
"amr|Robots móviles autónomos (AGV / AMR)|AGV / AMR|LOG|Robots que transportan ropa, comidas, insumos o mercancía por rutas y ascensores integrados.|SAL IND HOS COM CIE|5|Base de carga y estacionamiento de robots:12|IfcTransportElement|VDA 5050 · ISO 3691-4|ascensores rtls",
"ascensores|Ascensores con gestión de destino|Ascensores|LOG|Despacho inteligente por destino que reduce esperas; integrado con accesos y robots.|OFI SAL HOS MIX GOB TRA RES COM|4|Cuarto de máquinas / foso de ascensor:10|IfcTransportElement (ELEVATOR)|EN 81-20/50 · ASME A17.1 · NTE INEN 2299 (accesibilidad)|acceso amr bms",
"montacargas|Montacargas y montacamillas|Montacargas|LOG|Elevadores de carga o camillas con dimensiones y velocidad adecuadas al flujo logístico.|SAL IND COM HOS GAS|3|Foso y cuarto de máquinas:8|IfcTransportElement|EN 81-20 · ASME A17.1|ascensores",
"residuos|Gestión de residuos (neumática / compactadores)|Residuos|LOG|Separación en origen, cuartos de residuos refrigerados (hospitalarios) y compactación o transporte neumático.|SAL HOS COM IND RES MIX EDU TRA|3|Cuarto de residuos comunes y peligrosos:15|IfcWasteTerminal|Ley Orgánica de Salud / MSP · TULSMA|montacargas",
"parqueo|Parqueadero inteligente (guía de plazas)|Parqueo",
"LOG|Sensores por plaza, guiado con pantallas, pago automatizado y lectura de placas.|COM OFI SAL TRA EVE MIX HOS|3|Caseta de control:6|IfcSensor / IfcSign|Integración con LPR y pago|lpr ev",
"lockers|Lockers inteligentes y paquetería|Lockers|LOG|Casilleros con código/QR para entregas, equipaje o pertenencias.|RES OFI EDU TRA COM DEP|1|—|IfcFurniture|Fabricante|acceso",
"asrs|Almacén automatizado (AS/RS)|AS/RS|LOG|Estanterías de gran altura con transelevadores para almacenamiento denso.|IND COM|5|Nave de gran altura|IfcTransportElement / IfcBuildingElementProxy|FEM 9.831 · ISO 3691|amr",
"uvd|Desinfección UV-C / robots de limpieza|Desinfección|LOG|Lámparas UV-C en ductos o robots que desinfectan habitaciones y quirófanos.|SAL HOS EDU TRA|3|—|IfcLamp / IfcTransportElement|IES RP-27 · ASHRAE 185.1|hvac amr",
"fachada|Fachada dinámica (lamas motorizadas)|Lamas activas|ENV|Parasoles que siguen al sol para cortar radiación directa y permitir luz natural.|OFI EDU CUL SAL GOB HOS MIX|4|—|IfcShadingDevice / IfcActuator|KNX · BACnet|persianas bms electro",
"electro|Control de vidrio electrocrómico|Electrocrómico|ENV|Gestión del tinte de vidrios inteligentes por zonas, sol y deslumbramiento.|OFI CUL HOS SAL|5|—|IfcWindow + IfcController|BACnet · API del fabricante|fachada bms",
"media|Fachada multimedia LED|Media facade|ENV|Pieles LED programables para comunicación urbana y eventos.|COM EVE CUL TRA DEP|4|Sala de control de contenidos:4|IfcLightFixture / IfcAudioVisualAppliance|DMX · Art-Net · normativa de publicidad del GAD|av",
"bipv|Fotovoltaica integrada en envolvente (BIPV)|BIPV|ENV|Vidrios, parasoles o cubiertas que generan electricidad formando parte de la arquitectura.|OFI EDU CUL TRA GOB CIE|4|—|IfcSolarDevice / IfcWindow|IEC 61215 · EN 50583|fv",
"retractil|Cubierta retráctil / cinética|Cubierta móvil|ENV|Cubiertas que se abren o cierran según lluvia y sol en estadios, patios y auditorios al aire libre.|DEP EVE CUL PUB|5|Cuarto de accionamientos:12|IfcRoof / IfcActuator|Fabricante · EN 1991-1-4 (viento)|bms",
"gemelo|Gemelo digital del edificio|Gemelo digital|DIG|Modelo BIM vinculado en tiempo real a sensores y sistemas para operar, simular y mantener.|SAL OFI TRA INF IND CIE GOB EDU|4|—|IfcProject (vínculo a sensores) + COBie|ISO 19650 · IFC 4.3 · Brick Schema / Haystack|bms iot cmms medicion",
"iot|Plataforma IoT de sensores|IoT|DIG|Red de sensores (temperatura, humedad, ocupación, vibración) con nube o servidor local.|*|2|—|IfcSensor|LoRaWAN · MQTT · BACnet/SC|gemelo medagua iaq",
"cmms|Mantenimiento asistido (CMMS / CAFM)|CMMS|DIG|Gestión de activos, órdenes de trabajo y mantenimiento preventivo basada en datos BIM (COBie).|SAL OFI IND EDU GOB HOS TRA INF|2|—|IfcAsset / COBie|ISO 55000 · ISO 19650-3 · COBie|gemelo bms",
"ciber|Ciberseguridad OT/IoT|Ciberseguridad|DIG|Segmentación de redes, firewalls y gestión de vulnerabilidades para BMS, CCTV y dispositivos médicos; cumplimiento de la Ley Orgánica de Protección de Datos Personales (2021).|*|2|—|IfcDistributionSystem (documental)|IEC 62443 · ISO/IEC 27001 · LOPDP Ecuador|bms cctv datacenter",
"wayfinding|Orientación interior (wayfinding BLE)|Wayfinding|DIG|App y pantallas que guían a pacientes, visitantes o pasajeros con balizas Bluetooth.|SAL TRA EDU COM CUL EVE GOB|2|—|IfcSign / IfcCommunicationsAppliance|BLE · iBeacon/Eddystone|senal app",
"conteo|Conteo de personas y aforo|Aforo|DIG|Sensores 3D/IA que miden aforo en tiempo real para seguridad, ventilación y operación.|COM EVE CUL DEP TRA EDU GOB|2|—|IfcSensor|API / MQTT|vca presencia",
"app|App del usuario / edificio|App usuario|DIG|Reservas de salas, accesos móviles, reportes de fallas y comunicación con ocupantes.|OFI RES EDU MIX HOS COM|2|—|— (software)|API REST · OAuth 2.0|acceso wayfinding cmms",
"telemed|Telemedicina y teleconsulta|Telemedicina|SAL|Consultorios equipados con video, periféricos médicos y conectividad para atención remota.|SAL|3|Consultorio de telemedicina:12|IfcMedicalDevice / IfcAudioVisualAppliance|HL7 FHIR · DICOM · Norma técnica de telesalud MSP|fibra his",
"llamado|Llamado de enfermería|Llamado enfermería|SAL|Sistema paciente–enfermera con prioridades, presencia y registro; integrado a telefonía y RTLS.|SAL SOC|3|Estación de enfermería (consola):2|IfcCommunicationsAppliance / IfcAlarm|UL 1069 · VDE 0834 · EN 50134|telefonia rtls",
"rtls|Localización en tiempo real (RTLS)|RTLS|SAL|Etiquetas que ubican equipos, personal y pacientes; reduce pérdidas y tiempos de búsqueda.|SAL IND CIE|4|—|IfcSensor / IfcCommunicationsAppliance|BLE · UWB · Wi-Fi RTLS|wifi llamado infantil amr",
"infantil|Protección infantil anti-sustracción|Protección infantil|SAL|Pulseras para neonatos y niños que alertan y bloquean salidas si salen de zona autorizada (pediatría, maternidad).|SAL|3|—|IfcSensor / IfcAlarm|Integración RTLS + accesos|rtls acceso cctv",
"gasesmed|Alarmas de gases medicinales|Gases médicos|SAL|Monitoreo de presión de oxígeno, aire medicinal y vacío con alarmas de área y maestras.|SAL|3|Central de gases medicinales:20|IfcAlarm / IfcSensor|NFPA 99 · ISO 7396-1 · NTE INEN-ISO 7396|bms",
"his|HIS / PACS (sistemas clínicos)|HIS / PACS|SAL|Historia clínica electrónica y archivo de imágenes médicas con servidores y estaciones de diagnóstico.|SAL CIE|4|—|— (software) + IfcSpace (sala de lectura)|HL7 FHIR · DICOM · IHE|datacenter telemed",
"turnos|Gestión de turnos y filas|Turnos|SAL|Kioscos, pantallas y app para turnos y tiempos de espera en salud, gobierno y banca.|SAL GOB COM SOC TRA|1|—|IfcAudioVisualAppliance|API · CMS|senal app",
"aulas|Aulas y salas híbridas (AV colaborativo)|Salas híbridas|AV|Cámaras, micrófonos de techo y pantallas para clases o reuniones presenciales/remotas.|EDU OFI GOB CIE SAL|2|—|IfcAudioVisualAppliance|Dante · USB/HDMI · Microsoft Teams/Zoom Rooms|wifi",
"sonido|Refuerzo sonoro y acústica activa|Sonido sala|AV|Sistemas de altavoces y procesamiento para auditorios, templos y polideportivos.|CUL REL EVE DEP EDU|3|Cabina de control de sonido:8|IfcAudioVisualAppliance (SPEAKER)|Dante/AES67 · IEC 60268|megafonia escena",
"escena|Control escénico y luminotecnia (DMX)|Escena DMX|AV|Varas motorizadas, iluminación escénica y control DMX/Art-Net en teatros y centros de eventos.|CUL EVE DEP REL|4|Cabina de control y cuarto de dimmers:12|IfcLightFixture / IfcActuator|DMX512 · Art-Net · sACN|sonido media",
"av|Proyección y video inmersivo|Video inmersivo|AV|Proyección mapeada, pantallas LED y realidad aumentada para museos y experiencias.|CUL EVE COM EDU|4|Sala técnica de servidores de medios:6|IfcAudioVisualAppliance (PROJECTOR)|HDBaseT · SMPTE 2110|escena media"
];
/* (dos registros quedaron partidos en dos líneas para legibilidad: se unen antes de parsear) */
var TEC=(function(){
  var lines=[], buf="";
  TEC_RAW.forEach(function(l){ buf=buf?buf+"|"+l:l; if(buf.split("|").length>=11){ lines.push(buf); buf=""; } });
  return lines.map(function(l){ var a=l.split("|"), e=a[7].split(":");
    return {id:a[0],n:a[1],ab:a[2],g:a[3],q:a[4],cats:a[5].split(" "),c:+a[6],esp:a[7]==="—"?null:{n:e[0],m2:+e[1]||0},ifc:a[8],pr:a[9],ln:a[10].split(" ")}; });
})();
var TECI={}; TEC.forEach(function(t){ TECI[t.id]=t; });
var TCOST={1:.05,2:.12,3:.3,4:.6,5:1};
function tecRec(t,cat){ return t.cats.indexOf("*")>=0||t.cats.indexOf(cat)>=0; }
function tecOn(ctx){
  var sv=(ctx.get&&ctx.get("tecnologia"))||{}, cat=(ctx.tipo&&ctx.tipo.cat&&ctx.tipo.cat.c)||"";
  if(sv.on) return sv.on; var o={}; TEC.forEach(function(t){ if(tecRec(t,cat)) o[t.id]=true; }); return o;
}
function tecPct(ctx){ var on=tecOn(ctx), s=0; TEC.forEach(function(t){ if(on[t.id]) s+=TCOST[t.c]; }); return Math.min(15,s); }

var TS={tab:"con",sel:null,g:"",scroll:{}};

css("mod-tecnologia-css", baseCSS("m-tecnologia")+
".m-tecnologia-cw{display:grid;grid-template-columns:1fr 330px;gap:12px;align-items:start}"+
".m-tecnologia-sky{border:1px solid var(--line2);background:radial-gradient(circle at 50% 50%,rgba(var(--acc-rgb),.10),transparent 60%),rgba(2,5,10,.75);overflow:auto;position:relative}"+
".m-tecnologia-sky svg{display:block;width:100%;min-width:820px;height:auto}.m-tecnologia-cw>*{min-width:0}"+
".m-tecnologia-sky text{font-family:var(--f-m);pointer-events:none}"+
".m-tecnologia-nd{cursor:pointer}"+
".m-tecnologia-nd:focus{outline:none}"+
".m-tecnologia-nd:focus .m-tecnologia-rg{stroke-width:3}"+
".m-tecnologia-pl{animation:m-tecnologia-pl 2.4s ease-in-out infinite;transform-box:fill-box;transform-origin:center}"+
"@keyframes m-tecnologia-pl{0%,100%{opacity:.25;transform:scale(1)}50%{opacity:.8;transform:scale(1.25)}}"+
".m-tecnologia-fl{stroke-dasharray:4 8;animation:m-tecnologia-fl 3s linear infinite}"+
"@keyframes m-tecnologia-fl{to{stroke-dashoffset:-48}}"+
".m-tecnologia-dp{display:flex;flex-direction:column;gap:10px;position:sticky;top:0}"+
".m-tecnologia-lb{font-family:var(--f-d);font-size:8.5px;letter-spacing:.16em;color:var(--acc);text-transform:uppercase;margin-bottom:2px}"+
".m-tecnologia-cm{display:flex;gap:3px}"+
".m-tecnologia-cm i{width:18px;height:8px;border:1px solid var(--line2)}"+
".m-tecnologia-cm i.on{background:#FFC24B;border-color:#FFC24B;box-shadow:0 0 6px #FFC24B}"+
".m-tecnologia-tg{all:unset;box-sizing:border-box;cursor:pointer;display:flex;align-items:center;gap:10px;min-height:44px;padding:0 12px;border:1px solid var(--line2);font-family:var(--f-d);font-size:9.5px;letter-spacing:.14em;text-transform:uppercase}"+
".m-tecnologia-tg .sw{width:42px;height:22px;border-radius:12px;border:1px solid var(--line2);position:relative;background:rgba(0,0,0,.4);flex:none;transition:.2s}"+
".m-tecnologia-tg .sw::after{content:'';position:absolute;top:2px;left:2px;width:16px;height:16px;border-radius:50%;background:var(--muted);transition:.2s}"+
".m-tecnologia-tg.on{border-color:var(--done);color:var(--done)}"+
".m-tecnologia-tg.on .sw{border-color:var(--done);background:rgba(var(--done-rgb),.15)}"+
".m-tecnologia-tg.on .sw::after{left:22px;background:var(--done);box-shadow:0 0 8px var(--done)}"+
".m-tecnologia-bd{display:grid;grid-template-columns:repeat(auto-fill,minmax(220px,1fr));gap:8px}"+
".m-tecnologia-tc{all:unset;box-sizing:border-box;cursor:pointer;border:1px solid var(--line);background:rgba(6,14,24,.75);padding:10px 12px;display:flex;flex-direction:column;gap:4px;min-height:96px;position:relative;transition:.15s}"+
".m-tecnologia-tc:hover{border-color:var(--line2)}"+
".m-tecnologia-tc.on{border-color:var(--done);background:rgba(var(--done-rgb),.05);box-shadow:inset 3px 0 0 var(--done)}"+
".m-tecnologia-tc b{font-size:13px}"+
".m-tecnologia-tc small{color:var(--muted);font-size:11.5px;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden}"+
".m-tecnologia-tc .rc{position:absolute;top:8px;right:8px;font-family:var(--f-m);font-size:8.5px;color:var(--acc);border:1px solid rgba(var(--acc-rgb),.5);padding:1px 4px}"+
".m-tecnologia-gh{display:flex;align-items:center;gap:8px;margin:14px 0 8px;font-family:var(--f-d);font-size:10px;letter-spacing:.16em;text-transform:uppercase}"+
".m-tecnologia-gh i{width:10px;height:10px;transform:rotate(45deg);display:block}"+
".m-tecnologia-tb{width:100%;border-collapse:collapse;font-size:12.5px}"+
".m-tecnologia-tb th{font-family:var(--f-d);font-size:8px;letter-spacing:.14em;color:var(--muted);text-transform:uppercase;text-align:left;padding:6px 8px;border-bottom:1px solid var(--line2)}"+
".m-tecnologia-tb td{padding:6px 8px;border-bottom:1px solid rgba(120,200,255,.07);vertical-align:top}"+
".m-tecnologia-tb td.n{font-family:var(--f-m);text-align:right;white-space:nowrap}"+
".m-tecnologia-gbar{display:flex;flex-direction:column;gap:6px}"+
".m-tecnologia-gbar div{display:grid;grid-template-columns:150px 1fr 40px;gap:8px;align-items:center;font-size:12px}"+
".m-tecnologia-gbar span:last-child{font-family:var(--f-m);text-align:right}"+
"@container (max-width:820px){.m-tecnologia-cw{grid-template-columns:1fr}.m-tecnologia-dp{position:static}}"+
"@container (max-width:480px){.m-tecnologia-gbar div{grid-template-columns:100px 1fr 34px}.m-tecnologia-main{padding:10px}}"
);

DM.tecnologia={
  titulo:"Tecnología arquitectónica",
  sub:"Automatización · seguridad · energía · logística · gemelo digital",
  render:function(el,ctx){
    var P="m-tecnologia";
    var cat=(ctx.tipo&&ctx.tipo.cat&&ctx.tipo.cat.c)||"";
    var sv=ctx.get("tecnologia")||{};
    var auto=!sv.on;
    var st={on:Object.assign({},tecOn(ctx)),conf:!!sv.conf};
    if(auto) st.conf=false;
    var save=debounce(function(){ ctx.set("tecnologia",{on:st.on,conf:st.conf}); },600);
    if(!TS.sel){ var f=TEC.filter(function(t){return tecRec(t,cat)&&t.cats[0]!=="*";})[0]; TS.sel=(f||TEC[0]).id; }
    el.innerHTML="";
    var root=document.createElement("div"); root.className=P; el.appendChild(root);
    root.innerHTML=topBar(P,[["con","Constelación"],["tab","Tablero · "+TEC.length],["res","Resumen técnico"]],TS.tab)+'<div class="'+P+'-main"></div><div class="'+P+'-scan"></div>';
    var main=root.querySelector("."+P+"-main");
    main.addEventListener("scroll",function(){ TS.scroll[TS.tab]=main.scrollTop; },{passive:true});
    var gk=Object.keys(TG);

    function banner(){
      var nR=TEC.filter(function(t){return tecRec(t,cat);}).length, nOn=TEC.filter(function(t){return st.on[t.id];}).length;
      return '<div class="'+P+'-row" style="margin-bottom:10px"><span class="'+P+'-h" style="margin:0">'+(ctx.tipo?E(ctx.tipo.n)+' · '+E(ctx.tipo.cat.n):'Sin tipología')+'</span><span class="'+P+'-mono '+P+'-fnt">'+nOn+' activos · '+nR+' recomendados</span><span class="'+P+'-sp"></span>'+
        (st.conf?'<span class="'+P+'-okt">Selección confirmada</span>':'<span class="'+P+'-pv">Selección automática · por verificar</span><button class="'+P+'-btn" data-act="conf">'+gly("check",14)+' Confirmar</button>')+
        '<button class="'+P+'-btn" data-act="reco">Aplicar recomendados</button></div>';
    }
    function layout(){
      var W=1200,H=1060,cx=600,cy=530,pos={},hubs={};
      gk.forEach(function(g,i){
        var a=-Math.PI/2+i*2*Math.PI/gk.length, hx=cx+380*Math.cos(a), hy=cy+330*Math.sin(a); hubs[g]={x:hx,y:hy,a:a};
        var ns=TEC.filter(function(t){return t.g===g;}), n=ns.length, spread=Math.min(2.1,0.36*(n-1)), rr=n>5?118:104;
        ns.forEach(function(t,j){ var b=a+(n>1?-spread/2+spread*j/(n-1):0), r=rr+(j%2?34:0); pos[t.id]={x:hx+r*Math.cos(b),y:hy+r*Math.sin(b)}; });
      });
      return {W:W,H:H,cx:cx,cy:cy,pos:pos,hubs:hubs};
    }
    function sky(){
      var L=layout(), s='<svg viewBox="0 0 '+L.W+' '+L.H+'" role="group" aria-label="Constelación de sistemas tecnológicos">', sel=TS.sel;
      for(var i=0;i<60;i++){ var r=rng(i+7); s+='<circle cx="'+(r()*L.W).toFixed(0)+'" cy="'+(r()*L.H).toFixed(0)+'" r="'+(r()*1.2+.3).toFixed(1)+'" fill="#bfefff" opacity="'+(r()*.5+.1).toFixed(2)+'"/>'; }
      s+='<ellipse cx="'+L.cx+'" cy="'+L.cy+'" rx="380" ry="330" fill="none" stroke="rgba(56,225,255,.12)" stroke-dasharray="2 6"/><ellipse cx="'+L.cx+'" cy="'+L.cy+'" rx="150" ry="130" fill="none" stroke="rgba(56,225,255,.1)"/>';
      /* enlaces de integración */
      var seen={};
      TEC.forEach(function(t){ t.ln.forEach(function(o){ if(!TECI[o]) return; var k=[t.id,o].sort().join("-"); if(seen[k]) return; seen[k]=1; var a=L.pos[t.id],b=L.pos[o], both=st.on[t.id]&&st.on[o], hot=sel===t.id||sel===o;
        if(!both&&!hot) return;
        s+='<path d="M'+a.x.toFixed(1)+' '+a.y.toFixed(1)+' Q'+L.cx+' '+L.cy+' '+b.x.toFixed(1)+' '+b.y.toFixed(1)+'" fill="none" stroke="'+(hot?"#FFFFFF":TG[t.g].c)+'" stroke-opacity="'+(hot?.55:.16)+'" stroke-width="'+(hot?1.4:1)+'"'+(hot?' class="'+P+'-fl"':'')+'/>'; }); });
      gk.forEach(function(g){ var h=L.hubs[g], c=TG[g].c;
        s+='<line x1="'+L.cx+'" y1="'+L.cy+'" x2="'+h.x.toFixed(1)+'" y2="'+h.y.toFixed(1)+'" stroke="'+c+'" stroke-opacity=".35" stroke-width="1.5" class="'+P+'-fl"/>';
        TEC.filter(function(t){return t.g===g;}).forEach(function(t){ var p=L.pos[t.id]; s+='<line x1="'+h.x.toFixed(1)+'" y1="'+h.y.toFixed(1)+'" x2="'+p.x.toFixed(1)+'" y2="'+p.y.toFixed(1)+'" stroke="'+c+'" stroke-opacity="'+(st.on[t.id]?.55:.15)+'"/>'; });
      });
      s+='<g><circle cx="'+L.cx+'" cy="'+L.cy+'" r="54" fill="rgba(56,225,255,.06)" stroke="var(--acc)" stroke-width="1.5" style="filter:drop-shadow(0 0 12px rgba(56,225,255,.7))"/><circle cx="'+L.cx+'" cy="'+L.cy+'" r="62" fill="none" stroke="var(--acc)" stroke-opacity=".3" class="'+P+'-pl"/>'+
        '<path d="M'+(L.cx)+' '+(L.cy-30)+' l26 15 v30 l-26 15 l-26 -15 v-30Z" fill="none" stroke="var(--acc)" stroke-opacity=".6"/><text x="'+L.cx+'" y="'+(L.cy-2)+'" text-anchor="middle" font-size="12" fill="var(--acc)" style="letter-spacing:.15em">RED IP</text><text x="'+L.cx+'" y="'+(L.cy+14)+'" text-anchor="middle" font-size="9.5" fill="var(--muted)">BMS · OT · TI</text></g>';
      gk.forEach(function(g){ var h=L.hubs[g], c=TG[g].c, nOn=TEC.filter(function(t){return t.g===g&&st.on[t.id];}).length;
        s+='<g class="'+P+'-nd" data-act="grp" data-v="'+g+'" tabindex="0" role="button" aria-label="'+E(TG[g].n)+'"><rect x="'+(h.x-11)+'" y="'+(h.y-11)+'" width="22" height="22" transform="rotate(45 '+h.x+' '+h.y+')" fill="var(--bg)" stroke="'+c+'" stroke-width="1.6" style="filter:drop-shadow(0 0 6px '+c+')"/><text x="'+h.x+'" y="'+(h.y+3.5)+'" text-anchor="middle" font-size="9.5" fill="'+c+'">'+nOn+'</text>'+
          '<text x="'+h.x+'" y="'+(h.y+(Math.sin(h.a)>0.3?-22:30))+'" text-anchor="middle" font-size="10" fill="'+c+'" style="letter-spacing:.12em">'+E(TG[g].n.toUpperCase())+'</text><circle cx="'+h.x+'" cy="'+h.y+'" r="24" fill="transparent"/></g>'; });
      TEC.forEach(function(t){ var p=L.pos[t.id], c=TG[t.g].c, on=!!st.on[t.id], rec=tecRec(t,cat), isS=sel===t.id, r=on?9:6.5;
        s+='<g class="'+P+'-nd" data-act="node" data-id="'+t.id+'" tabindex="0" role="button" aria-pressed="'+on+'" aria-label="'+E(t.n)+(rec?' (recomendado)':'')+'">'+
          (rec?'<circle cx="'+p.x.toFixed(1)+'" cy="'+p.y.toFixed(1)+'" r="'+(r+7)+'" fill="none" stroke="'+(st.conf?c:"#FF5C7A")+'" stroke-opacity=".9" class="'+P+'-pl"/>':'')+
          (isS?'<circle cx="'+p.x.toFixed(1)+'" cy="'+p.y.toFixed(1)+'" r="'+(r+12)+'" fill="none" stroke="#fff" stroke-dasharray="3 3"/>':'')+
          '<circle class="'+P+'-rg" cx="'+p.x.toFixed(1)+'" cy="'+p.y.toFixed(1)+'" r="'+r+'" fill="'+(on?c:"var(--bg)")+'" fill-opacity="'+(on?.9:1)+'" stroke="'+c+'" stroke-width="1.5" style="'+(on?'filter:drop-shadow(0 0 7px '+c+')':'')+'"/>'+
          '<text x="'+p.x.toFixed(1)+'" y="'+(p.y+r+13).toFixed(1)+'" text-anchor="middle" font-size="12" fill="'+(on?"var(--ink)":"var(--faint)")+'">'+E(t.ab)+'</text>'+
          '<circle cx="'+p.x.toFixed(1)+'" cy="'+p.y.toFixed(1)+'" r="22" fill="transparent"/></g>'; });
      return s+'</svg>';
    }
    function detail(t){
      var on=!!st.on[t.id], rec=tecRec(t,cat), c=TG[t.g].c;
      var s='<div class="'+P+'-card" style="--c:'+c+'"><div class="'+P+'-row"><span style="color:'+c+';font-family:var(--f-d);font-size:8.5px;letter-spacing:.16em;text-transform:uppercase">'+E(TG[t.g].n)+'</span><span class="'+P+'-sp"></span>'+(rec?'<span class="'+(st.conf?P+'-okt':P+'-pv')+'">Recomendado '+(cat||"")+'</span>':'')+'</div>'+
        '<div class="'+P+'-h2" style="margin:6px 0">'+E(t.n)+'</div><div style="font-size:13px">'+E(t.q)+'</div></div>';
      s+='<button class="'+P+'-tg'+(on?' on':'')+'" data-act="tog" data-id="'+t.id+'"><span class="sw"></span>'+(on?'Activo en el proyecto':'Inactivo · tocar para activar')+'</button>';
      s+='<div class="'+P+'-card"><div class="'+P+'-lb">Costo relativo</div><div class="'+P+'-row"><div class="'+P+'-cm">'+[1,2,3,4,5].map(function(i){return '<i class="'+(i<=t.c?'on':'')+'"></i>';}).join("")+'</div><span class="'+P+'-mono '+P+'-fnt">≈ +'+fmt(TCOST[t.c],2)+' % del costo directo</span></div>'+
        '<div class="'+P+'-lb" style="margin-top:10px">Espacio técnico</div><div style="font-size:13px">'+(t.esp?E(t.esp.n)+(t.esp.m2?' · <span class="'+P+'-mono">≈ '+t.esp.m2+' m²</span>':''):'No requiere local propio (montaje distribuido)')+'</div>'+
        '<div class="'+P+'-lb" style="margin-top:10px">Integración BIM · IFC4</div><div class="'+P+'-mono" style="font-size:12px">'+E(t.ifc)+'</div>'+
        '<div class="'+P+'-lb" style="margin-top:10px">Protocolos y normas</div><div style="font-size:12.5px">'+E(t.pr)+'</div>'+
        '<div class="'+P+'-lb" style="margin-top:10px">Aplica a</div><div class="'+P+'-fnt">'+(t.cats[0]==="*"?'Todas las tipologías':t.cats.map(function(k){return (TIPC[k]?TIPC[k][0]:k)+(k===cat?' ◆':'');}).join(" · "))+'</div>'+
        '<div class="'+P+'-lb" style="margin-top:10px">Se integra con</div><div class="'+P+'-row">'+t.ln.filter(function(o){return TECI[o];}).map(function(o){ return '<button class="'+P+'-chip'+(st.on[o]?' on':'')+'" data-act="node" data-id="'+o+'">'+E(TECI[o].ab)+'</button>'; }).join("")+'</div></div>';
      return s;
    }
    function grpDetail(g){
      var c=TG[g].c, s='<div class="'+P+'-card" style="--c:'+c+'"><div class="'+P+'-h" style="color:'+c+'">'+E(TG[g].n)+'</div><div class="'+P+'-gbar">';
      TEC.filter(function(t){return t.g===g;}).forEach(function(t){ s+='<button class="'+P+'-tg'+(st.on[t.id]?' on':'')+'" data-act="tog" data-id="'+t.id+'" style="text-transform:none;letter-spacing:0;font-family:var(--f-b);font-size:13px"><span class="sw"></span>'+E(t.n)+(tecRec(t,cat)?' <span class="'+P+'-mono" style="color:var(--acc);font-size:9px">REC</span>':'')+'</button>'; });
      return s+'</div></div>';
    }
    function conHTML(){
      var t=TECI[TS.sel];
      return banner()+'<div class="'+P+'-cw"><div><div class="'+P+'-sky">'+sky()+'</div><p class="'+P+'-fnt">Toca un nodo para ver su ficha; los anillos pulsantes marcan los recomendados para la tipología ('+(st.conf?'confirmados':'en rojo: por verificar')+'). Los rombos agrupan familias; las curvas muestran integraciones entre sistemas activos.</p></div><div class="'+P+'-dp" data-z="dp">'+(TS.g?grpDetail(TS.g):t?detail(t):'')+'</div></div>';
    }
    function tabHTML(){
      var s=banner()+'<div class="'+P+'-chips"><button class="'+P+'-chip'+(!TS.g?' on':'')+'" data-act="fg" data-v="">Todas</button>'+gk.map(function(g){ return '<button class="'+P+'-chip'+(TS.g===g?' on':'')+'" data-act="fg" data-v="'+g+'"><i style="width:8px;height:8px;background:'+TG[g].c+';display:inline-block;transform:rotate(45deg)"></i> '+TG[g].n+'</button>'; }).join("")+'</div>';
      gk.filter(function(g){return !TS.g||TS.g===g;}).forEach(function(g){
        s+='<div class="'+P+'-gh" style="color:'+TG[g].c+'"><i style="background:'+TG[g].c+';box-shadow:0 0 8px '+TG[g].c+'"></i>'+TG[g].n+'</div><div class="'+P+'-bd">';
        TEC.filter(function(t){return t.g===g;}).forEach(function(t){ var on=!!st.on[t.id];
          s+='<button class="'+P+'-tc'+(on?' on':'')+'" data-act="tog" data-id="'+t.id+'" aria-pressed="'+on+'">'+(tecRec(t,cat)?'<span class="rc">REC</span>':'')+'<b>'+E(t.n)+'</b><small>'+E(t.q)+'</small><div class="'+P+'-row" style="margin-top:auto"><div class="'+P+'-cm">'+[1,2,3,4,5].map(function(i){return '<i class="'+(i<=t.c?'on':'')+'" style="width:12px;height:6px"></i>';}).join("")+'</div><span class="'+P+'-sp"></span><span class="'+P+'-mono" style="font-size:10px;color:'+(on?'var(--done)':'var(--faint)')+'">'+(on?'ACTIVO':'—')+'</span></div></button>'; });
        s+='</div>';
      });
      return s;
    }
    function resHTML(){
      var act=TEC.filter(function(t){return st.on[t.id];}), pct=tecPct({get:function(){return {on:st.on};},tipo:ctx.tipo});
      var esp={}; act.forEach(function(t){ if(t.esp){ var k=t.esp.n; if(!esp[k]||esp[k].m2<t.esp.m2) esp[k]={m2:t.esp.m2,by:[]}; esp[k].by.push(t.ab); } });
      var ek=Object.keys(esp), m2=ek.reduce(function(s,k){return s+esp[k].m2;},0), A=areaConstr(ctx);
      var ifc={}; act.forEach(function(t){ t.ifc.split(/\s*[\/+]\s*/).forEach(function(x){ x=x.replace(/\(.*\)/,"").trim(); if(/^Ifc/.test(x)) ifc[x]=(ifc[x]||0)+1; }); });
      var s=banner()+'<div class="'+P+'-kpis"><div class="'+P+'-kpi"><span>Sistemas activos</span><b>'+act.length+' / '+TEC.length+'</b></div>'+
        '<div class="'+P+'-kpi" style="border-color:var(--warn)"><span>Incremento estimado</span><b>+'+fmt(pct,1)+' %</b><i>sobre el costo directo · por verificar · llega a Costos</i></div>'+
        '<div class="'+P+'-kpi"><span>Espacios técnicos</span><b>'+ek.length+'</b><i>≈ '+fmt(m2)+' m² ('+fmt(m2/A*100,1)+' % del área bruta)</i></div>'+
        '<div class="'+P+'-kpi"><span>Clases IFC</span><b>'+Object.keys(ifc).length+'</b><i>para el modelo BIM</i></div></div>';
      s+='<div class="'+P+'-cw" style="margin-top:12px;grid-template-columns:1fr 1fr"><div class="'+P+'-card"><div class="'+P+'-h">Programa de espacios técnicos</div><table class="'+P+'-tb"><thead><tr><th>Espacio</th><th>Sirve a</th><th style="text-align:right">m²</th></tr></thead><tbody>'+
        (ek.length?ek.map(function(k){ return '<tr><td>'+E(k)+'</td><td class="'+P+'-fnt">'+esp[k].by.map(E).join(", ")+'</td><td class="n">'+(esp[k].m2||"—")+'</td></tr>'; }).join(""):'<tr><td colspan="3" class="'+P+'-fnt">Activa sistemas para ver espacios.</td></tr>')+
        '</tbody></table><p class="'+P+'-fnt">Superficies mínimas orientativas para prediseño (TIA-569, NFPA, fabricantes). Súmalas al programa arquitectónico y ubícalas con acceso de mantenimiento.</p></div>';
      s+='<div class="'+P+'-card"><div class="'+P+'-h">Activos por familia</div><div class="'+P+'-gbar">'+gk.map(function(g){ var n=TEC.filter(function(t){return t.g===g;}).length, k=act.filter(function(t){return t.g===g;}).length; return '<div><span>'+TG[g].n+'</span><div class="'+P+'-bar" style="height:8px"><i style="width:'+(k/n*100)+'%;background:'+TG[g].c+';box-shadow:0 0 8px '+TG[g].c+'"></i></div><span>'+k+'/'+n+'</span></div>'; }).join("")+'</div>'+
        '<div class="'+P+'-h" style="margin-top:14px">Clases IFC4 a modelar</div><div class="'+P+'-row">'+Object.keys(ifc).sort().map(function(x){ return '<span class="'+P+'-pre" style="text-transform:none;letter-spacing:0">'+x+' ×'+ifc[x]+'</span>'; }).join("")+'</div></div></div>';
      s+='<p class="'+P+'-fnt" style="margin-top:12px">PREDISEÑO · Normas de referencia: NEC (Ecuador), NFPA 72/101, TIA-568/569/942, ASHRAE 90.1/170, IEC 62443, ISO 19650. Costos relativos indicativos (1 = bajo, 5 = muy alto).</p>';
      return s;
    }
    function paint(){
      root.querySelectorAll("."+P+"-tab").forEach(function(b){ b.setAttribute("aria-selected",b.dataset.v===TS.tab); });
      main.innerHTML=TS.tab==="con"?conHTML():TS.tab==="tab"?tabHTML():resHTML();
      main.scrollTop=TS.scroll[TS.tab]||0;
      if(TS.tab==="con"&&TS.skyX!=null){ var sk=main.querySelector("."+P+"-sky"); if(sk) sk.scrollLeft=TS.skyX; }
      var sk2=main.querySelector("."+P+"-sky"); if(sk2) sk2.addEventListener("scroll",function(){ TS.skyX=sk2.scrollLeft; },{passive:true});
    }
    function repaint(){ var sc=main.scrollTop; paint(); main.scrollTop=sc; }
    function act(b){
      var a=b.dataset.act, v=b.dataset.v, id=b.dataset.id;
      if(a==="tab"){ TS.tab=v; if(v!=="tab") TS.g=""; paint(); }
      else if(a==="next") ctx.next();
      else if(a==="node"){ TS.sel=id; TS.g=""; if(TS.tab!=="con"){ TS.tab="con"; } repaint(); if(main.clientWidth<820){ var dp=main.querySelector('[data-z="dp"]'); if(dp) dp.scrollIntoView({block:"nearest",behavior:"smooth"}); } }
      else if(a==="grp"){ TS.g=TS.g===v?"":v; repaint(); }
      else if(a==="fg"){ TS.g=v; repaint(); }
      else if(a==="tog"){ if(st.on[id]) delete st.on[id]; else st.on[id]=true; st.conf=st.conf; save(); repaint(); }
      else if(a==="conf"){ st.conf=true; save(); ctx.toast("Selección tecnológica confirmada"); repaint(); }
      else if(a==="reco"){ st.on={}; TEC.forEach(function(t){ if(tecRec(t,cat)) st.on[t.id]=true; }); st.conf=false; save(); ctx.toast("Recomendados aplicados para "+(cat||"la tipología")); repaint(); }
    }
    root.addEventListener("click",function(ev){ var b=ev.target.closest("[data-act]"); if(b&&root.contains(b)) act(b); });
    root.addEventListener("keydown",function(ev){ if(ev.key!=="Enter"&&ev.key!==" ") return; var b=ev.target.closest&&ev.target.closest("g[data-act]"); if(b){ ev.preventDefault(); act(b); } });
    if(auto) save();
    paint();
    return function(){ root.remove(); };
  }
};

})();
