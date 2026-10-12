/* DION · salas1.js — Estructura (Geometría y trigonometría · Estática · Resistencia de materiales) e Instalaciones
   Módulos: DION_MOD.estructura, DION_MOD.instalaciones
   PREDISEÑO académico con normas ecuatorianas (NEC 2015, NTE INEN, Reglamento de Prevención de Incendios) y de referencia
   internacional (ACI 318, NFPA, ASHRAE, IPC). No sustituye el cálculo de ingenierías firmado por profesionales. */
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

/* ───────────── utilidades propias de salas1 ───────────── */
GLY.sun='<circle cx="12" cy="12" r="4" fill="none" stroke="currentColor" stroke-width="1.6"/><path d="M12 2v3M12 19v3M2 12h3M19 12h3M4.9 4.9l2.1 2.1M17 17l2.1 2.1M4.9 19.1 7 17M17 7l2.1-2.1" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/>';
GLY.wave='<path d="M2 12h3l2-6 3 12 3-9 2 5 2-2h5" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/>';
GLY.drop='<path d="M12 3s6 7 6 11a6 6 0 0 1-12 0c0-4 6-11 6-11Z" fill="none" stroke="currentColor" stroke-width="1.6"/>';
GLY.fire='<path d="M12 22c4 0 7-3 7-7 0-5-5-7-5-12-3 2-4 5-4 7-1-1-2-2-2-4-2 2-3 5-3 9 0 4 3 7 7 7Z" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/>';
GLY.wind='<path d="M3 9h11a3 3 0 1 0-3-3M3 15h15a3 3 0 1 1-3 3M3 12h8" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/>';
GLY.fx='<path d="M9 4H7a2 2 0 0 0-2 2v12a2 2 0 0 1-2 2M3 11h7M13 9l7 9M20 9l-7 9" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/>';
GLY.col='<path d="M7 3h10M7 21h10M9 3v18M15 3v18" fill="none" stroke="currentColor" stroke-width="1.6"/>';

function pct(v,d){ return fmt(v*100,d==null?0:d)+" %"; }
function rnd(v,s){ return Math.ceil(v/s-1e-9)*s; }
function deg(r){ return r*180/Math.PI; }
function rad(d){ return d*Math.PI/180; }
function proj(ctx){
  var P=ctx.P||{}, n=P.norm||{}, mc=(P.mods&&P.mods.costos)||{};
  var area=+ctx.area||0, cos=+n.cos||0.6, cus=+n.cus||(cos*(+n.pisos||3)), pisos=Math.max(1,Math.round(+n.pisos||3));
  var share=mc.pct!=null?clamp(+mc.pct,10,100):100;
  var A=area>0?Math.round(area*cus*share/100):1200;
  var foot=area>0?Math.min(area*cos,A/pisos):A/pisos;
  var alt=+n.altura||pisos*3.6, hp=clamp(alt/pisos,2.6,6);
  var lat=parseFloat(P.loc&&P.loc.lat); if(isNaN(lat)) lat=-2.17;
  return {area:area,cos:cos,cus:cus,pisos:pisos,A:A,foot:foot,alt:alt,hp:hp,lat:lat,share:share,cat:(ctx.tipo&&ctx.tipo.cat&&ctx.tipo.cat.c)||"OFI",tipoN:(ctx.tipo&&ctx.tipo.n)||"Proyecto",loc:P.loc||{}};
}
function norm(s){ return String(s||"").toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g,""); }

/* CSS extra común (sliders, steppers, cálculo, checklist, svg) */
function extCSS(P){
  return baseCSS(P)+
  "."+P+"-g2{display:grid;grid-template-columns:minmax(260px,340px) 1fr;gap:12px;align-items:start}"+
  "."+P+"-g3{display:grid;grid-template-columns:repeat(auto-fit,minmax(230px,1fr));gap:10px}"+
  "."+P+"-ctl{display:flex;flex-direction:column;gap:12px;min-width:0}"+
  "."+P+"-ctl ."+P+"-chips{flex-wrap:wrap;overflow:visible}"+
  "."+P+"-ctl ."+P+"-chip{white-space:normal;max-width:100%;text-align:left;line-height:1.2;padding-top:4px;padding-bottom:4px}"+
  "."+P+"-g2>*,."+P+"-g3>*{min-width:0}"+
  "."+P+"-col{display:flex;flex-direction:column;gap:12px;min-width:0}"+
  "."+P+"-sl label{display:flex;justify-content:space-between;gap:8px;font-family:var(--f-d);font-size:8.5px;letter-spacing:.14em;text-transform:uppercase;color:var(--muted)}"+
  "."+P+"-sl label b{font-family:var(--f-m);font-size:13px;letter-spacing:0;color:var(--ink);font-weight:500;text-transform:none}"+
  "."+P+"-sl small{display:block;color:var(--faint);font-size:11px;margin-top:-4px}"+
  "."+P+"-lab{font-family:var(--f-d);font-size:8.5px;letter-spacing:.14em;text-transform:uppercase;color:var(--muted);margin-bottom:4px}"+
  "."+P+"-stp{display:flex;align-items:center;gap:0;border:1px solid var(--line2);background:rgba(0,0,0,.3);width:max-content}"+
  "."+P+"-stp button{width:40px;height:40px;border:0;background:rgba(var(--acc-rgb),.06);cursor:pointer;color:var(--acc);font-family:var(--f-m);font-size:18px}"+
  "."+P+"-stp button:hover{background:rgba(var(--acc-rgb),.18)}"+
  "."+P+"-stp b{min-width:76px;text-align:center;font-family:var(--f-m);font-weight:500;font-size:14px;padding:0 6px}"+
  "."+P+"-stps{display:flex;flex-wrap:wrap;gap:10px 16px}"+
  "."+P+"-svg{width:100%;height:auto;display:block;overflow:visible}"+
  "."+P+"-svg text{font-family:var(--f-m);fill:var(--ink)}"+
  "."+P+"-hd{display:flex;align-items:center;gap:8px;flex-wrap:wrap;margin-bottom:10px}"+
  "."+P+"-hd ."+P+"-h{margin:0}"+
  "."+P+"-fxb{min-height:32px;padding:0 10px;border:1px dashed rgba(var(--acc-rgb),.5);background:transparent;color:var(--acc);cursor:pointer;font-family:var(--f-m);font-size:11px;display:inline-flex;align-items:center;gap:6px}"+
  "."+P+"-fxb:hover,."+P+"-fxb.on{background:rgba(var(--acc-rgb),.1);border-style:solid}"+
  "."+P+"-fx{margin-top:8px;border-left:2px solid var(--acc);background:rgba(var(--acc-rgb),.05);padding:8px 10px;font-family:var(--f-m);font-size:12px;line-height:1.65;color:var(--ink);white-space:normal;overflow-x:auto}"+
  "."+P+"-fx em{font-style:normal;color:var(--acc)}"+
  "."+P+"-fx u{text-decoration:none;color:var(--done)}"+
  "."+P+"-fx small{display:block;color:var(--faint);font-family:var(--f-b);font-size:11px;margin-top:4px}"+
  "."+P+"-tb{width:100%;border-collapse:collapse;font-family:var(--f-m);font-size:11.5px}"+
  "."+P+"-tb th{font-family:var(--f-d);font-size:8px;letter-spacing:.14em;color:var(--muted);text-transform:uppercase;text-align:right;padding:6px 8px;border-bottom:1px solid var(--line2);background:rgba(10,19,31,.8)}"+
  "."+P+"-tb td{text-align:right;padding:6px 8px;border-bottom:1px solid rgba(120,200,255,.06)}"+
  "."+P+"-tb td:first-child,."+P+"-tb th:first-child{text-align:left;font-family:var(--f-b)}"+
  "."+P+"-tb tr.on td{background:rgba(var(--acc-rgb),.08);color:var(--acc)}"+
  "."+P+"-tw{overflow-x:auto;border:1px solid var(--line);background:rgba(0,0,0,.2)}"+
  "."+P+"-note{font-size:12px;color:var(--muted);border-left:2px solid rgba(var(--done-rgb),.6);padding:4px 10px;background:rgba(var(--done-rgb),.04)}"+
  "."+P+"-note b{color:var(--done);font-weight:600}"+
  "."+P+"-alert{font-size:12px;color:var(--ink);border-left:2px solid var(--warn);padding:4px 10px;background:rgba(255,92,122,.06)}"+
  "."+P+"-flow{stroke-dasharray:6 8;animation:"+P+"-flow 1.2s linear infinite}"+
  "."+P+"-flowS{stroke-dasharray:3 9;animation:"+P+"-flow 2.4s linear infinite}"+
  "@keyframes "+P+"-flow{to{stroke-dashoffset:-28}}"+
  "."+P+"-pul{animation:"+P+"-pulse 2s ease-in-out infinite}"+
  "."+P+"-glow{filter:drop-shadow(0 0 5px currentColor)}"+
  /* checklist */
  "."+P+"-ckm{display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:8px;margin-bottom:12px}"+
  "."+P+"-ckh{all:unset;box-sizing:border-box;display:flex;align-items:center;gap:10px;padding:8px 10px;border:1px solid var(--line);background:rgba(3,8,14,.55);cursor:pointer;min-height:64px}"+
  "."+P+"-ckh.on{border-color:var(--acc);box-shadow:inset 0 0 16px rgba(var(--acc-rgb),.18)}"+
  "."+P+"-ckh b{display:block;font-family:var(--f-d);font-size:9.5px;letter-spacing:.14em;text-transform:uppercase}"+
  "."+P+"-ckh span{font-family:var(--f-m);font-size:11px;color:var(--muted)}"+
  "."+P+"-ckf{font-family:var(--f-d);font-size:9px;letter-spacing:.16em;text-transform:uppercase;color:var(--acc);margin:14px 0 6px;display:flex;gap:8px;align-items:center}"+
  "."+P+"-ckf::after{content:'';flex:1;height:1px;background:linear-gradient(90deg,var(--line2),transparent)}"+
  "."+P+"-ck{border:1px solid var(--line);background:rgba(3,8,14,.45);margin-bottom:6px}"+
  "."+P+"-ck.ok{border-color:rgba(var(--done-rgb),.45)}"+
  "."+P+"-ck.cur{border-color:rgba(var(--acc-rgb),.55)}"+
  "."+P+"-ck.na{opacity:.55}"+
  "."+P+"-ckr{display:grid;grid-template-columns:44px 1fr 44px;align-items:center;gap:6px;padding:2px 4px}"+
  "."+P+"-cks{width:40px;height:40px;border:1px solid var(--line2);background:rgba(0,0,0,.3);cursor:pointer;display:flex;align-items:center;justify-content:center;font-family:var(--f-m);font-size:10px;color:var(--muted)}"+
  "."+P+"-ck.ok ."+P+"-cks{border-color:var(--done);color:var(--bg);background:var(--done);box-shadow:0 0 10px rgba(var(--done-rgb),.5)}"+
  "."+P+"-ck.cur ."+P+"-cks{border-color:var(--acc);color:var(--acc);background:rgba(var(--acc-rgb),.14)}"+
  "."+P+"-ckt{all:unset;cursor:pointer;font-size:13px;line-height:1.3;padding:8px 2px;min-height:24px}"+
  "."+P+"-ckt i{font-style:normal;font-family:var(--f-m);font-size:10.5px;color:var(--faint);margin-right:6px}"+
  "."+P+"-ckx{width:40px;height:40px;border:0;background:transparent;color:var(--muted);cursor:pointer;font-size:18px}"+
  "."+P+"-ckd{padding:4px 12px 12px 54px;font-size:12.5px;color:var(--muted);white-space:pre-line}"+
  "."+P+"-ckd p{margin:6px 0}"+
  "."+P+"-ckd b{color:var(--ink);font-family:var(--f-d);font-size:8.5px;letter-spacing:.14em;text-transform:uppercase;display:block;margin-top:6px}"+
  "."+P+"-dg{overflow-x:auto;scrollbar-width:thin}"+
  "@container (max-width:760px){."+P+"-g2{grid-template-columns:1fr}}"+
  "@container (max-width:560px){."+P+"-dg>svg{width:600px;max-width:none}}"+
  "@container (max-width:520px){."+P+"-main{padding:10px}."+P+"-kpi b{font-size:16px}."+P+"-ckd{padding-left:12px}."+P+"-stp b{min-width:64px}}";
}

/* piezas de UI (P = prefijo del módulo) */
function UI(P){
  var u={};
  u.sl=function(id,lab,val,min,max,step,txt,small){ return '<div class="'+P+'-sl"><label for="'+P+'-'+id+'">'+lab+' <b data-o="'+id+'">'+txt+'</b></label><input id="'+P+'-'+id+'" class="'+P+'-rng" type="range" min="'+min+'" max="'+max+'" step="'+step+'" value="'+val+'" data-act="sl" data-k="'+id+'">'+(small?'<small>'+small+'</small>':'')+'</div>'; };
  u.stp=function(k,lab,txt){ return '<div><div class="'+P+'-lab">'+lab+'</div><div class="'+P+'-stp"><button data-act="stp" data-k="'+k+'" data-d="-1" aria-label="menos">−</button><b>'+txt+'</b><button data-act="stp" data-k="'+k+'" data-d="1" aria-label="más">+</button></div></div>'; };
  u.chips=function(act,list,cur,lab){ return (lab?'<div class="'+P+'-lab">'+lab+'</div>':'')+'<div class="'+P+'-chips">'+list.map(function(x){ return '<button class="'+P+'-chip'+(String(cur)===String(x[0])?' on':'')+'" data-act="'+act+'" data-v="'+E(x[0])+'"'+(x[2]?' title="'+E(x[2])+'"':'')+'>'+x[1]+'</button>'; }).join("")+'</div>'; };
  u.pre=function(n){ return '<span class="'+P+'-pre">Prediseño · '+n+'</span>'; };
  u.fxb=function(id,open){ return '<button class="'+P+'-fxb'+(open?' on':'')+'" data-act="fx" data-v="'+id+'">'+gly("fx",13)+(open?' ocultar cálculo':' ver cálculo')+'</button>'; };
  u.fx=function(open,html){ return open?'<div class="'+P+'-fx">'+html+'</div>':''; };
  u.hd=function(t,n,fid,open,extra){ return '<div class="'+P+'-hd"><span class="'+P+'-h">'+t+'</span>'+(n?u.pre(n):'')+'<span class="'+P+'-sp"></span>'+(extra||'')+(fid?u.fxb(fid,open):'')+'</div>'; };
  u.pv=function(key,ok,txt){ return ok?'<span class="'+P+'-okt">'+gly("check",12)+' Confirmado</span>':'<span class="'+P+'-pv">Por verificar</span><button class="'+P+'-btn" data-act="conf" data-v="'+key+'">'+gly("check",14)+' '+(txt||'Confirmar')+'</button>'; };
  u.kpi=function(lab,val,sub,col){ return '<div class="'+P+'-kpi"'+(col?' style="border-color:'+col+'"':'')+'><span>'+lab+'</span><b'+(col?' style="color:'+col+'"':'')+'>'+val+'</b>'+(sub?'<i>'+sub+'</i>':'')+'</div>'; };
  return u;
}

/* anillo de progreso */
function ring(p,col,sz){ sz=sz||46; var r=sz/2-5, c=2*Math.PI*r; return '<svg width="'+sz+'" height="'+sz+'" viewBox="0 0 '+sz+' '+sz+'" aria-hidden="true"><circle cx="'+sz/2+'" cy="'+sz/2+'" r="'+r+'" fill="none" stroke="rgba(120,200,255,.15)" stroke-width="4"/><circle cx="'+sz/2+'" cy="'+sz/2+'" r="'+r+'" fill="none" stroke="'+col+'" stroke-width="4" stroke-dasharray="'+(c*p).toFixed(1)+' '+c.toFixed(1)+'" transform="rotate(-90 '+sz/2+' '+sz/2+')" style="filter:drop-shadow(0 0 4px '+col+')"/><text x="50%" y="54%" text-anchor="middle" font-size="10" fill="var(--ink)" font-family="var(--f-m)">'+Math.round(p*100)+'%</text></svg>'; }

/* Checklist de pasos de materias (estado: "" pendiente, cur en curso, ok hecho, na no aplica) */
var CKST=[["","·"],["cur","…"],["ok","✓"],["na","N/A"]];
function ckStats(ids,ck){ var t=0,d=0; ids.forEach(function(m){ PASOS[m].f.forEach(function(f){ f[1].forEach(function(p){ var s=ck[p[0]]; if(s==="na") return; t++; if(s==="ok") d++; }); }); }); return {t:t,d:d,p:t?d/t:0}; }
function ckHTML(P,ids,cur,ck,open,col){
  var s='<div class="'+P+'-ckm">';
  ids.forEach(function(m){ var st=ckStats([m],ck); s+='<button class="'+P+'-ckh'+(m===cur?' on':'')+'" data-act="ckm" data-v="'+m+'">'+ring(st.p,col)+'<div><b>'+E(PASOS[m].n)+'</b><span>'+st.d+' / '+st.t+' pasos hechos</span></div></button>'; });
  s+='</div><div class="'+P+'-row" style="margin-bottom:6px"><span class="'+P+'-fnt">Toca el cuadro para cambiar el estado: pendiente → en curso → hecho → no aplica. Toca el título para ver el detalle, la nota de Ecuador y el entregable.</span></div>';
  PASOS[cur].f.forEach(function(f){
    s+='<div class="'+P+'-ckf">'+E(f[0])+'</div>';
    f[1].forEach(function(p){ var stt=ck[p[0]]||"", o=open===p[0], lab=CKST.filter(function(x){return x[0]===stt;})[0][1];
      s+='<div class="'+P+'-ck '+stt+'"><div class="'+P+'-ckr"><button class="'+P+'-cks" data-act="cks" data-v="'+p[0]+'" aria-label="Estado del paso">'+lab+'</button><button class="'+P+'-ckt" data-act="cko" data-v="'+p[0]+'"><i>'+p[0]+'</i>'+E(p[1])+'</button><button class="'+P+'-ckx" data-act="cko" data-v="'+p[0]+'" aria-label="Detalle">'+(o?'−':'+')+'</button></div>'+
        (o?'<div class="'+P+'-ckd">'+(p[2]?'<p>'+E(p[2])+'</p>':'')+(p[3]?'<b>Ecuador</b><p>'+E(p[3])+'</p>':'')+(p[4]?'<b>Entregable</b><p style="color:var(--done)">'+E(p[4])+'</p>':'')+'</div>':'')+'</div>'; });
  });
  return s;
}
function ckNext(v){ var i=CKST.map(function(x){return x[0];}).indexOf(v||""); return CKST[(i+1)%CKST.length][0]; }

/* polígono: área por Gauss */
function gauss(pts){ var s=0, rows=[]; for(var i=0;i<pts.length;i++){ var a=pts[i], b=pts[(i+1)%pts.length], c=a[0]*b[1]-b[0]*a[1]; s+=c; rows.push([i+1,a[0],a[1],c]); } return {A:Math.abs(s)/2, s:s, rows:rows}; }
function perim(pts){ var p=0; for(var i=0;i<pts.length;i++){ var a=pts[i], b=pts[(i+1)%pts.length]; p+=Math.hypot(b[0]-a[0],b[1]-a[1]); } return p; }
/* Pasos del flujo (Atlas · materias tri, est, res, ins) — embebidos para funcionar sin red */
var PASOS={"tri":{"n":"Geometría y trigonometría","f":[["Fase 0 · Datos geométricos del terreno",[["tri-01","Pedir ubicación exacta y fijar el sistema de coordenadas del proyecto","Pedir país, provincia, cantón, ciudad, parroquia y clave catastral.\n- 1.1 Obtener coordenadas del predio (Google Maps / catastro) en grados decimales y convertir a UTM.\n- 1.2 Declarar el sistema: WGS84/SIRGAS UTM zona 17S (Guayaquil) o la que corresponda; unidades en metros.\n- 1.3 Verificar si planos antiguos usan PSAD56 y transformar antes de superponer.\n- 1.4 Definir el punto base del proyecto (0,0 local) y su equivalencia UTM + cota.","Catastro municipal (Guayaquil: Dirección de Catastro) entrega ficha con clave y, en muchos casos, geometría del predio; IGM publica la red geodésica y los parámetros SIRGAS-ECUADOR.","Ficha de georreferenciación: sistema, zona UTM, punto base, norte de cuadrícula y norte geográfico."],["tri-02","Calcular el área del terreno irregular por coordenadas (fórmula de Gauss)","Con las coordenadas de los vértices del levantamiento:\n- 2.1 Ordenar vértices en sentido horario o antihorario sin saltos (P1…Pn, cerrando en P1).\n- 2.2 Tabla en Excel: columnas X, Y, Xi·Yi+1, Xi+1·Yi.\n- 2.3 A = ½·|Σ(Xi·Yi+1 − Xi+1·Yi)|.\n- 2.4 Comprobar con triangulación (Herón o ½·a·b·sen C) y con el área del CAD/BIM.\n- 2.5 Calcular perímetro con la fórmula de distancia entre vértices consecutivos.","","Hoja de cálculo de área y perímetro con cuadro de coordenadas de linderos."],["tri-03","Verificar linderos y área contra la escritura y el catastro","- 3.1 Extraer de la escritura: medidas de cada lindero, colindantes y área declarada.\n- 3.2 Convertir rumbos/azimuts de la escritura a ángulos internos y comprobar la suma (n−2)·180°.\n- 3.3 Comparar medidas escritura vs levantamiento vs catastro; calcular diferencia absoluta y porcentual.\n- 3.4 Si la diferencia supera la tolerancia municipal, iniciar trámite de rectificación/regularización de excedentes o diferencias de área antes de diseñar al límite.","En Ecuador los excedentes o diferencias de área se regularizan por ordenanza municipal (COOTAD faculta al GAD); la escritura rectificada se inscribe en el Registro de la Propiedad.","Cuadro comparativo escritura / catastro / levantamiento con conclusión de área válida para diseño."],["tri-04","Revisar el levantamiento topográfico y cerrar la poligonal","- 4.1 Solicitar levantamiento planialtimétrico con estación total o GNSS RTK, georreferenciado.\n- 4.2 Revisar error de cierre angular y lineal; exigir precisión relativa adecuada para lotes urbanos.\n- 4.3 Verificar que incluya: árboles, postes, pozos, bordillos, cotas de acera y vía, edificaciones vecinas y alturas.\n- 4.4 Si el terreno es grande o con vegetación, considerar dron fotogramétrico + puntos de control.","","Plano topográfico validado (DWG/IFC) con cuadro de coordenadas, cotas y curvas de nivel."],["tri-05","Elaborar mapa de pendientes y perfiles del terreno","- 5.1 Generar superficie topográfica (TIN) en Civil 3D, Revit o QGIS.\n- 5.2 Clasificar pendientes por rangos: 0–5 %, 5–15 %, 15–30 %, >30 %.\n- 5.3 Trazar perfiles longitudinales y transversales por ejes principales del proyecto.\n- 5.4 Identificar divisorias, vaguadas y dirección de escorrentía.","","Mapa de pendientes + perfiles con zonas aptas y zonas a evitar."]]],["Fase 1 · Implantación, movimiento de tierras y visuales",[["tri-06","Trazar retiros y área edificable con geometría analítica","- 6.1 Con los parámetros del IRM/uso de suelo (retiros frontal, laterales, posterior), desplazar cada lindero paralelamente la distancia exigida (offset).\n- 6.2 Obtener los vértices del polígono edificable por intersección de rectas.\n- 6.3 Calcular COS (área de ocupación / área del lote) y COS total con áreas analíticas.","","Polígono de área edificable con coordenadas y cálculo de COS/CUS."],["tri-07","Definir cotas de proyecto y calcular movimiento de tierras","- 7.1 Fijar nivel ±0,00 respecto de la cota de acera (considerar drenaje e inundaciones).\n- 7.2 Cuadricular el terreno (ej. 5×5 m) y calcular corte/relleno por celda: V = área × (cota terreno − cota proyecto).\n- 7.3 Alternativa: secciones cada 5–10 m y método de áreas medias o prismoide.\n- 7.4 Balancear corte y relleno; aplicar esponjamiento/compactación según estudio de suelos.\n- 7.5 Diseñar taludes con relación H:V recomendada por el geotécnico.","En Guayaquil muchas zonas son planas y con suelos blandos o susceptibles a inundación (zonas de estero y sur); en cerros (norte y oeste) hay pendientes fuertes: verificar mapas de riesgo de la SNGR y el municipio.","Cuadro de volúmenes de corte y relleno + plano de plataformas y taludes."],["tri-08","Calcular pendientes de accesos, veredas y drenaje superficial","- 8.1 Pendiente de acceso vehicular y peatonal desde la acera: % = Δh/d × 100.\n- 8.2 Pendientes mínimas de pisos exteriores para evacuar agua (del orden de 1–2 %) hacia rejillas o cunetas.\n- 8.3 Verificar que el acceso vehicular no invada la vereda pública con rampas (la rampa empieza dentro del lote).","","Plano de cotas y pendientes de exteriores."],["tri-09","Estudiar visuales, conos de visión y privacidad","- 9.1 Desde puntos clave (ventanas, terrazas, acceso) trazar conos de visión (ángulo horizontal cómodo ≈ 60°, campo total mayor) y líneas de vista verticales.\n- 9.2 Calcular con tangentes qué altura de vecino o árbol bloquea la vista: h = d·tan α.\n- 9.3 Revisar vistas hacia el proyecto desde vecinos (privacidad) y desde la calle (percepción del volumen).","","Diagrama de visuales y decisiones de orientación de vanos."]]],["Fase 2 · Geometría solar y protecciones",[["tri-10","Calcular la trayectoria solar del sitio (fechas críticas)","- 10.1 Con la latitud del sitio (Guayaquil ≈ 2°S) calcular declinación para 21 jun, 21 dic y equinoccios.\n- 10.2 Calcular altitud β y azimut Az cada hora de 07:00 a 17:00 (hora solar) con las fórmulas o con SunCalc/Ladybug.\n- 10.3 Convertir hora solar a hora oficial (corrección por longitud y ecuación del tiempo).\n- 10.4 Dibujar la carta solar y superponer obstáculos (máscara de sombras).","","Tabla de altitud/azimut por hora y fecha + carta solar del sitio."],["tri-11","Dimensionar aleros y parasoles horizontales por fachada","- 11.1 Para cada fachada, obtener su azimut normal.\n- 11.2 Calcular el ángulo de sombra vertical: tan VSA = tan β / cos(Az − Az fachada).\n- 11.3 Profundidad del alero = altura de ventana a proteger / tan VSA (equivalente a altura × tan del ángulo cenital de perfil).\n- 11.4 Elegir el ángulo de corte (ej. proteger de 09:00 a 15:00 todo el año) y verificar con modelo 3D.\n- 11.5 En Guayaquil: Norte y Sur se protegen con aleros moderados; Este y Oeste requieren parasoles verticales, celosías o vegetación.","","Cálculo de profundidad de aleros por fachada con ángulos de corte."],["tri-12","Dimensionar aletas verticales y celosías para fachadas Este y Oeste","- 12.1 Ángulo de sombra horizontal HSA = Az − Az fachada.\n- 12.2 Separación entre aletas s = profundidad × tan(90° − HSA) según la hora a bloquear; o proporción profundidad/separación de lamas.\n- 12.3 Para lamas horizontales en celosía: separación = profundidad × tan VSA.\n- 12.4 Verificar iluminación natural resultante (no oscurecer en exceso).","","Detalle geométrico de parasoles verticales/lamas con sus ángulos."],["tri-13","Calcular sombras proyectadas sobre vecinos y espacios exteriores","- 13.1 Longitud de sombra = altura / tan β en la dirección opuesta al azimut solar.\n- 13.2 Estudio de sombras en fechas críticas y horas clave (modelo 3D).\n- 13.3 Ubicar patios, juegos, estancias exteriores en zonas de sombra útil en la tarde.","","Estudio de sombras (diagramas por fecha/hora)."],["tri-14","Orientar e inclinar paneles solares o colectores","- 14.1 En latitudes ecuatoriales la inclinación óptima es baja (cercana a la latitud), pero se da una inclinación mínima para autolimpieza con lluvia.\n- 14.2 Calcular ángulo de incidencia con producto punto entre vector solar y normal del panel.\n- 14.3 Verificar sombras entre filas: separación = altura del panel / tan β crítico.","","Esquema de orientación, inclinación y separación de paneles."]]],["Fase 3 · Circulaciones: escaleras, rampas y estacionamientos",[["tri-15","Diseñar geométricamente las escaleras (Blondel y norma)","- 15.1 Altura piso a piso H; proponer contrahuella h y calcular n = H/h (redondear, recalcular h).\n- 15.2 Huella b tal que 2h + b ≈ 62–64 cm, y dentro de los límites de NTE INEN 2249 / NEC-HS-AU.\n- 15.3 Longitud en planta = (n−1)·b + descansos; ancho según evacuación (NEC-HS-CI/Bomberos) y uso.\n- 15.4 Verificar altura libre, pasamanos, nariz y bordes; en escaleras de evacuación, tipo de escalera exigida por Bomberos.\n- 15.5 Para escaleras helicoidales, verificar huella sobre la línea de huella.","NTE INEN 2249 (escaleras), NEC-HS-AU y NEC-HS-CI (contra incendios); Benemérito Cuerpo de Bomberos de Guayaquil revisa escaleras de evacuación.","Cálculo de escalera (h, b, n, longitud, ancho) y detalle en corte."],["tri-16","Diseñar rampas peatonales accesibles (INEN 2245 / NEC-HS-AU)","- 16.1 Desnivel a salvar Δh; elegir pendiente según la longitud del tramo en la tabla de NTE INEN 2245.\n- 16.2 Longitud L = Δh / pendiente; añadir descansos entre tramos y al inicio/final.\n- 16.3 Verificar ancho libre, bordillos, pasamanos a dos alturas, pendiente transversal y piso antideslizante.\n- 16.4 Si la rampa resulta muy larga, evaluar plataforma elevadora o ascensor.","Obligatorio en edificaciones de uso público; los centros de salud y educativos lo revisa además la entidad del sector (MSP/ACESS, MINEDUC).","Plano y corte de rampas con pendientes acotadas y cálculo."],["tri-17","Diseñar rampas vehiculares y sus transiciones","- 17.1 Definir pendiente de rampa recta y curva según ordenanza municipal.\n- 17.2 Añadir tramos de transición al inicio y final (pendiente intermedia) para evitar golpes de parachoques.\n- 17.3 Verificar altura libre en todo el recorrido (perfil longitudinal).\n- 17.4 En rampas curvas, pendiente en el eje y radios interior/exterior.","","Perfil longitudinal de rampa vehicular con transiciones."],["tri-18","Trazar la geometría de estacionamientos y radios de giro","- 18.1 Dimensiones de plaza y calle de maniobra según ángulo (90°, 60°, 45°, 30°).\n- 18.2 Verificar radios de giro interior/exterior con plantillas del vehículo tipo (auto, ambulancia, camión de basura, bomberos).\n- 18.3 Plazas accesibles con franja de transferencia según NTE INEN 2248.\n- 18.4 En centros de salud: bahía de ambulancia con giro y cota de acceso a emergencia.","Número y dimensiones de plazas: ordenanza municipal del cantón; accesibles: NTE INEN 2248.","Plano de estacionamientos con barridos de giro verificados."]]],["Fase 4 · Cubiertas y envolvente",[["tri-19","Resolver la geometría de cubiertas (aguas, limas y cumbreras)","- 19.1 Dibujar la planta de cubierta y aplicar el método de bisectrices para aguas a igual pendiente.\n- 19.2 Ubicar cumbreras, limatesas, limahoyas y canales; evitar limahoyas sobre espacios críticos.\n- 19.3 Calcular longitudes reales de limas y pendientes resultantes.","","Planta de cubiertas con pendientes, sentidos de escurrimiento y limas."],["tri-20","Calcular pendientes y áreas reales de cubierta","- 20.1 Pendiente mínima del material según ficha técnica del fabricante.\n- 20.2 Área real = área en planta / cos α; sumar traslapes y desperdicio según el material.\n- 20.3 Área de captación = área en planta, para canales y bajantes.\n- 20.4 Transmitir áreas reales a presupuesto y a cargas (estática).","","Cuadro de áreas reales de cubierta y captación."],["tri-21","Verificar pendientes de canales, bajantes y losas de cubierta plana","- 21.1 Pendiente de canales hacia bajantes y de losas planas hacia sumideros.\n- 21.2 Distancia máxima entre bajantes según área tributaria de captación.\n- 21.3 Cotas de impermeabilización y rebosaderos.","","Plano de drenaje de cubiertas con pendientes acotadas."],["tri-22","Controlar proporciones y trazados reguladores de fachadas","- 22.1 Definir retícula modular (coordinada con bloque, panel, perfilería).\n- 22.2 Aplicar un sistema de proporción (áureo, √2, Modulor) a vanos y llenos.\n- 22.3 Verificar alineaciones y ejes con el sistema estructural.","","Alzados con trazados reguladores y retícula modular."]]],["Fase 5 · Documentación y replanteo en obra",[["tri-23","Preparar cuadro de coordenadas de ejes y puntos de replanteo","- 23.1 Exportar coordenadas UTM de ejes, esquinas de cimentación y puntos de control.\n- 23.2 Incluir cota de nivel ±0,00 referenciada a un BM (banco de marca) fijo.\n- 23.3 Plano de replanteo con cuadro de coordenadas y distancias.","","Plano de replanteo + archivo CSV de puntos para estación total/GNSS."],["tri-24","Supervisar el replanteo en obra por coordenadas","- 24.1 Materializar BM y puntos de control fuera de la zona de excavación.\n- 24.2 Replantear por radiación desde estación: X = X0 + D·sen Az, Y = Y0 + D·cos Az.\n- 24.3 Comprobar escuadras con 3-4-5 y diagonales iguales en rectángulos.\n- 24.4 Registrar verificaciones en libro de obra.","El replanteo inicial suele verificarse con el inspector municipal/fiscalización; en obra pública, la fiscalización lo aprueba (LOSNCP).","Acta/registro de replanteo aprobado."],["tri-25","Verificar niveles, pendientes y plomos durante la construcción","- 25.1 Nivelación de losas y pisos con nivel láser.\n- 25.2 Control de pendientes de rampas, cubiertas y drenajes antes de acabados.\n- 25.3 Verificar verticalidad (plomada/láser) de columnas y muros.\n- 25.4 Levantamiento as-built de lo ejecutado.","","Registros de control dimensional y planos as-built."],["tri-26","Archivar memoria de cálculos geométricos del proyecto","Compilar: georreferenciación, cálculo de área, comparación de linderos, movimiento de tierras, geometría solar, escaleras, rampas, cubiertas y replanteo, en una memoria técnica anexa al expediente.","","Memoria de cálculos geométricos (PDF) en el expediente del proyecto."]]]]},"est":{"n":"Estática","f":[["Fase 0 · Datos del sitio y del programa para estructura",[["est-01","Recopilar datos del sitio que definen cargas","Pedir país, provincia, cantón, ciudad y ubicación exacta.\n- 1.1 Altitud (para granizo), exposición al viento (urbano denso, abierto, frente al mar/río), cercanía a volcanes (ceniza).\n- 1.2 Zona sísmica y tipo de suelo preliminar (NEC-SE-DS) — Guayaquil está en zona de alta sismicidad y con suelos blandos en amplias zonas.\n- 1.3 Solicitar o prever estudio de suelos (capacidad portante, nivel freático).","Mapa de zonificación sísmica NEC-SE-DS; estudios geotécnicos según NEC-SE-GC; microzonificación sísmica de Guayaquil cuando exista para el sector.","Ficha de datos de sitio para estructura (altitud, viento, sismo, suelo)."],["est-02","Clasificar los usos del programa según cargas vivas NEC-SE-CG","- 2.1 Tomar el programa arquitectónico (áreas por espacio).\n- 2.2 Asignar a cada espacio su ocupación NEC-SE-CG y la carga viva correspondiente.\n- 2.3 Marcar espacios con cargas especiales: archivos, bibliotecas, equipos médicos pesados (imagenología), cuartos de máquinas, tanques, jardineras, piscinas.\n- 2.4 Ubicar cargas pesadas preferiblemente en planta baja o sobre apoyos directos.","","Tabla programa × carga viva (kN/m²) y lista de cargas especiales."],["est-03","Identificar cargas especiales de la tipología","- 3.1 Salud: equipos de imagen (RX, tomógrafo), blindajes de plomo, grupos electrógenos, tanques de oxígeno, cisternas.\n- 3.2 Educación: aglomeración en auditorios, bibliotecas, laboratorios.\n- 3.3 Alimentos: cámaras frías, cocinas industriales.\n- 3.4 Turismo: piscinas en terraza, jacuzzis, jardines.\n- 3.5 Pedir fichas técnicas con peso y huella del equipo.","","Lista de equipos con pesos y ubicación para el ingeniero estructural."]]],["Fase 1 · Sistema estructural y trayectoria de cargas",[["est-04","Elegir el sistema estructural y su modulación","- 4.1 Opciones: pórticos de hormigón armado, pórticos de acero, muros portantes, mampostería confinada/armada, estructura de madera o guadúa, sistemas mixtos.\n- 4.2 Definir retícula de ejes y luces típicas coherentes con el programa (aulas, habitaciones, parqueo bajo edificio).\n- 4.3 Buscar regularidad en planta y elevación (simetría, sin pisos blandos, sin grandes voladizos) para evitar penalizaciones φP/φE de la NEC-SE-DS.\n- 4.4 Alinear columnas verticalmente; evitar columnas que nacen sobre vigas (transferencias).","","Planta de ejes estructurales con sistema elegido y luces típicas."],["est-05","Dibujar el diagrama de trayectoria de cargas","- 5.1 Para cargas gravitacionales: cubierta → correas/losa → vigas → columnas → cimentación → suelo.\n- 5.2 Para cargas laterales (sismo/viento): diafragmas (losas) → pórticos/muros → cimentación.\n- 5.3 Marcar discontinuidades (voladizos, transferencias, dobles alturas, rampas) como puntos a revisar con el ingeniero.","","Esquema 3D/axonométrico de trayectoria de cargas vertical y lateral."],["est-06","Idealizar apoyos y uniones de los elementos típicos","- 6.1 Decidir qué uniones son empotradas (monolíticas de hormigón), articuladas (pernos en acero, madera) o deslizantes (apoyos de cubiertas sobre neopreno).\n- 6.2 Identificar si cada subsistema es isostático o hiperestático.\n- 6.3 Detectar restricciones impropias (mecanismos) en cubiertas ligeras y marquesinas.","","Esquemas estáticos (modelos idealizados) de viga, pórtico y cubierta típicos."]]],["Fase 2 · Cargas y áreas tributarias",[["est-07","Calcular cargas muertas por m² de cada tipo de losa y cubierta","- 7.1 Peso propio de losa (maciza o alivianada) + acabados + cielo falso + instalaciones.\n- 7.2 Mampostería: carga lineal (peso unitario × espesor × altura) o equivalente repartida.\n- 7.3 Cubierta ligera: panel metálico/fibrocemento + correas + instalaciones.\n- 7.4 Usar pesos unitarios de la NEC-SE-CG o fichas del fabricante.","","Tabla de cargas muertas por sistema de piso y cubierta (kN/m²)."],["est-08","Determinar cargas vivas, de granizo, ceniza y viento aplicables","- 8.1 Carga viva por uso (tabla de est-02) y de cubierta (accesible/inaccesible).\n- 8.2 Granizo: solo si la altitud y pendiente de cubierta lo exigen según NEC-SE-CG (sierra).\n- 8.3 Ceniza: si el sitio está en zona de influencia volcánica.\n- 8.4 Viento: velocidad básica, exposición y altura; atención a succión en cubiertas ligeras y aleros grandes (costa).","En Guayaquil normalmente no aplica granizo; sí viento y sismo. En Quito, Ambato, Latacunga, Riobamba sí se revisa granizo y ceniza.","Tabla de cargas vivas y ambientales por zona del edificio."],["est-09","Plantear las combinaciones de carga de servicio y últimas","- 9.1 Servicio: D + L (para cimentación con esfuerzos admisibles y deflexiones).\n- 9.2 Últimas: 1,4D; 1,2D + 1,6L + 0,5Lr; combinaciones con sismo y viento según NEC.\n- 9.3 Identificar la combinación que gobierna para cada elemento típico.","","Hoja de combinaciones de carga del proyecto."],["est-10","Calcular áreas tributarias de vigas, columnas y zapatas","- 10.1 Losa en una dirección (relación de lados > 2): carga a las dos vigas largas en franjas.\n- 10.2 Losa en dos direcciones: reparto a 45° (triángulos y trapecios) → carga lineal equivalente en vigas.\n- 10.3 Columnas: área tributaria = mitad de luces adyacentes en cada dirección (interior, borde, esquina).\n- 10.4 Acumular cargas por piso para columna de planta baja: P = Σ(área trib. × carga por m²) + peso propio.","","Planta de áreas tributarias y tabla de cargas acumuladas por columna tipo."]]],["Fase 3 · Análisis de elementos típicos",[["est-11","Dibujar DCL de los elementos típicos","- 11.1 Viga interior, viga de borde, voladizo, columna, zapata, correa de cubierta, muro de contención.\n- 11.2 Incluir cargas distribuidas, puntuales (vigas que llegan), pesos propios y reacciones desconocidas.\n- 11.3 Reducir cargas distribuidas a resultantes en su centroide para comprobar equilibrio.","","Lámina de DCL de elementos típicos."],["est-12","Calcular reacciones en apoyos con ecuaciones de equilibrio","- 12.1 Aplicar ΣFx = 0, ΣFy = 0, ΣM = 0 a vigas isostáticas y voladizos.\n- 12.2 Para vigas continuas usar coeficientes aproximados (ACI) o software y comparar órdenes de magnitud.\n- 12.3 Reacciones → cargas sobre columnas/muros → sobre cimentación.","","Tabla de reacciones por apoyo de elementos típicos."],["est-13","Trazar diagramas de cortante y momento de vigas típicas","- 13.1 Casos base: simplemente apoyada (wL²/8), continua (coeficientes), voladizo (wL²/2).\n- 13.2 Usar relaciones dV/dx = −w y dM/dx = V para dibujar rápido.\n- 13.3 Ubicar momentos máximos positivos/negativos y puntos de inflexión (zonas para aberturas de instalaciones y empalmes).\n- 13.4 Pasar Mmáx y Vmáx a resistencia de materiales para peralte.","","Diagramas V y M de vigas típicas con valores máximos."],["est-14","Predimensionar armaduras de cubierta","- 14.1 Elegir tipología (Pratt, Howe, Warren, Fink) según luz y pendiente.\n- 14.2 Peralte de armadura en relación con la luz (del orden de L/10 a L/15 como criterio inicial, a confirmar).\n- 14.3 Cargas en nudos (correas sobre nudos); resolver por nodos o secciones las barras críticas (cordón superior en compresión, inferior en tracción, diagonales).\n- 14.4 Identificar elementos de fuerza cero y arriostramientos laterales.\n- 14.5 Verificar succión de viento: inversión de esfuerzos (cordón inferior puede comprimirse).","","Esquema de armadura con fuerzas axiales en barras críticas."],["est-15","Analizar cables, tensores o arcos si el diseño los incluye","- 15.1 Cubiertas colgantes o tensadas: flecha f, tensión horizontal T0 = wL²/(8f), tensión máxima en apoyos.\n- 15.2 Arcos: empuje horizontal H = wL²/(8f) → tensor o estribos.\n- 15.3 Anclajes: fuerzas en mástiles y vientos (equilibrio 3D).","","Cálculo de tensiones/empujes y reacciones en anclajes."]]],["Fase 4 · Estabilidad global",[["est-16","Verificar volteo y deslizamiento de muros de contención","- 16.1 Empuje del suelo (triangular) + sobrecarga + agua si aplica.\n- 16.2 FS volteo = ΣM resistentes / ΣM volcadores; FS deslizamiento = (μ·N + pasivo) / empuje, con valores mínimos de NEC-SE-GC.\n- 16.3 Resultante en el tercio central de la base.\n- 16.4 Drenaje del trasdós (lloraderos, geotextil, tubo perforado).","NEC-SE-GC exige verificaciones estáticas y sísmicas de muros; parámetros del suelo del estudio geotécnico.","Verificación de estabilidad de muros típicos."],["est-17","Verificar voladizos, marquesinas y elementos exentos","- 17.1 Relación voladizo/tramo de anclaje (contrapeso).\n- 17.2 Momento de volteo de rótulos, parapetos, antepechos altos, tanques elevados por viento y sismo.\n- 17.3 Anclajes químicos o mecánicos con fuerzas de diseño.","","Lista de elementos en voladizo/exentos con su verificación."],["est-18","Revisar centro de masa vs centro de rigidez en planta","- 18.1 Calcular el centroide de las masas de cada piso (áreas × cargas).\n- 18.2 Estimar el centro de rigidez con la ubicación de columnas y muros.\n- 18.3 Si la excentricidad es grande, redistribuir muros/núcleos o crear juntas sísmicas.\n- 18.4 Revisar irregularidades en planta y elevación según NEC-SE-DS.","","Diagrama de CM y CR por piso con decisión de ajustes."]]],["Fase 5 · Coordinación y documentación",[["est-19","Preparar el paquete de información para el ingeniero estructural","- 19.1 Plantas con ejes, niveles y cortes.\n- 19.2 Tabla de usos y cargas vivas, cargas especiales y equipos.\n- 19.3 Restricciones arquitectónicas: peraltes máximos, luces deseadas, dobles alturas, voladizos, ductos.\n- 19.4 Modelo BIM/IFC arquitectónico si se trabaja en BIM.","","Paquete de coordinación arquitectura–estructura."],["est-20","Coordinar el predimensionamiento con el cálculo estructural","- 20.1 Comparar tus reacciones y diagramas con los del ingeniero (orden de magnitud).\n- 20.2 Ajustar secciones y peraltes en planos arquitectónicos.\n- 20.3 Detección de interferencias: vigas vs ductos, alturas libres, pases de instalaciones en zonas de bajo cortante/momento.\n- 20.4 Registrar acuerdos en actas.","","Actas de coordinación y planos ajustados."],["est-21","Integrar la memoria estructural al expediente del permiso","- 21.1 Verificar que la memoria de cálculo cite NEC-SE-CG, NEC-SE-DS, NEC-SE-GC y la norma de material.\n- 21.2 Firmas de responsabilidad del ingeniero estructural.\n- 21.3 Coherencia entre planos arquitectónicos y estructurales.","Los municipios (en Guayaquil, la Dirección de Control de Edificaciones / trámite de Registro de Construcción) solicitan planos y memoria estructural firmados; obras grandes pueden requerir revisión estructural adicional.","Memoria estructural y planos estructurales incorporados al expediente."],["est-22","Registrar cargas de diseño para la operación del edificio","- 22.1 Placa o tabla de cargas máximas admisibles por zona (bodegas, cubiertas accesibles, cuartos de equipos).\n- 22.2 Incluir en el manual de uso y mantenimiento: prohibición de cambios de uso sin revisión estructural.","","Tabla de cargas admisibles por zona para el manual del usuario."]]]]},"res":{"n":"Resistencia de materiales","f":[["Fase 0 · Elección de material y sistema",[["res-01","Evaluar condiciones del sitio que afectan el material","Pedir país, provincia, cantón y ubicación exacta.\n- 1.1 Zona sísmica y tipo de suelo (NEC-SE-DS) → exigencia de ductilidad.\n- 1.2 Exposición ambiental: cloruros (costa/estuario), humedad, sulfatos en suelo, temperatura.\n- 1.3 Disponibilidad local de materiales y mano de obra calificada (hormigón premezclado, acero, guadúa, madera).\n- 1.4 Accesibilidad de la obra para bombas de hormigón, grúas, camiones de perfiles.","Guayaquil: zona sísmica alta, suelos blandos en amplias zonas, ambiente cálido húmedo con influencia salina del estero y el río Guayas → atención a corrosión del acero.","Ficha de condicionantes de material (sismo, suelo, exposición, logística)."],["res-02","Elegir el material estructural según tipología, sitio y carbono","- 2.1 Comparar hormigón armado, acero, mixto, mampostería armada/confinada, madera, guadúa según: luces, altura, plazos, costo, mantenimiento, resistencia al fuego, huella de carbono.\n- 2.2 Tipología: hospitales y centros de salud → estructura con alto desempeño sísmico (considerar aislamiento/disipación); viviendas ≤ 2 pisos → NEC-SE-VIVIENDA; cubiertas de gran luz → acero o madera laminada.\n- 2.3 Estimar carbono incorporado (cemento y acero son los mayores emisores): optimizar secciones, cementos con adiciones, acero con contenido reciclado, madera/guadúa certificada.\n- 2.4 Documentar la decisión en matriz multicriterio.","","Matriz multicriterio de elección de material con justificación."],["res-03","Definir el nivel de desempeño sísmico según uso","- 3.1 Clasificar la categoría de la edificación y su factor de importancia según NEC-SE-DS (edificaciones esenciales como hospitales y bomberos tienen mayor exigencia).\n- 3.2 Decidir con el ingeniero si se evaluará aislamiento de base o disipadores.\n- 3.3 Establecer derivas objetivo y protección de elementos no estructurales.","Establecimientos de salud: el MSP y el programa de Hospitales Seguros (OPS/OMS) exigen continuidad de funcionamiento tras sismos.","Definición de categoría, importancia y objetivo de desempeño."]]],["Fase 1 · Predimensionamiento de elementos",[["res-04","Predimensionar losas por espesor mínimo (regla h = L/…)","Regla de prediseño (ACI 318, sin cálculo de deflexiones):\n- 4.1 Losa maciza en una dirección: simplemente apoyada h ≈ L/20; un extremo continuo L/24; ambos continuos L/28; voladizo L/10.\n- 4.2 Losa nervada/alivianada en una dirección: L/16; L/18,5; L/21; voladizo L/8.\n- 4.3 Losas en dos direcciones: tablas ACI según perímetro y relación de lados.\n- 4.4 Losa alivianada con bloque: definir altura total (bloque + loseta) y peso.\n- 4.5 Marcar que es PREDISEÑO: el ingeniero confirma con cálculo de deflexiones.","","Espesores preliminares de losas por paño con su luz y condición de apoyo."],["res-05","Predimensionar vigas (peralte y ancho)","- 5.1 Peralte inicial con las mismas relaciones L/16 (apoyo simple), L/18,5, L/21, L/8 (voladizo) o por criterio práctico L/10–L/12 en pórticos sísmicos.\n- 5.2 Ancho b ≈ 0,4–0,6 h y no menor al mínimo de la NEC-SE-HM para vigas de pórticos especiales.\n- 5.3 Verificar con Mmáx de Estática: M ≈ φ·(cuantía)·b·d²… (orden de magnitud).\n- 5.4 Chequear que el peralte no rompa alturas libres de cielos e instalaciones.","","Secciones preliminares de vigas tipo + impacto en cortes arquitectónicos."],["res-06","Predimensionar columnas (A ≈ P/(0,45 f'c) como regla de prediseño)","Regla preliminar para columnas de hormigón armado con carga axial de servicio P:\n- 6.1 Tomar P acumulada de áreas tributarias (Estática, est-10).\n- 6.2 Área bruta Ag ≈ P / (0,45·f'c) para columnas interiores; usar un coeficiente menor (más área) en columnas de borde y esquina por mayores momentos.\n- 6.3 Respetar la dimensión mínima de la NEC-SE-HM para columnas de pórticos especiales y la relación entre lados.\n- 6.4 Verificar esbeltez KL/r en columnas altas o de doble altura.\n- 6.5 Columnas de acero: área y radio de giro con tablas AISC para la longitud efectiva.\n- 6.6 Dejar anotado que es PREDISEÑO sujeto al análisis sísmico (el sismo suele gobernar en Guayaquil).","","Tabla de columnas tipo con carga estimada y sección preliminar."],["res-07","Predimensionar zapatas con la capacidad portante del estudio de suelos","- 7.1 Obtener del estudio geotécnico: capacidad admisible qa, profundidad de desplante, nivel freático, asentamientos esperados, recomendaciones (zapatas aisladas, corridas, losa, pilotes).\n- 7.2 Área de zapata A ≈ (P servicio × factor por peso propio y relleno) / qa.\n- 7.3 Si las zapatas se tocan o superan cierta fracción de la planta → zapatas corridas o losa de cimentación.\n- 7.4 En suelos blandos de Guayaquil es habitual recurrir a pilotes o mejoramiento; no asumir zapatas sin estudio.\n- 7.5 Vigas de amarre/riostras entre zapatas (exigidas en zona sísmica).","NEC-SE-GC define número mínimo de sondeos según categoría de la edificación y las verificaciones de capacidad y asentamiento.","Planta preliminar de cimentación con dimensiones de zapatas o tipo de cimentación."],["res-08","Predimensionar muros estructurales y mampostería","- 8.1 Muros de corte de hormigón: espesor mínimo y cuantía en planta según NEC-SE-HM; ubicarlos simétricos (núcleos de escaleras/ascensores).\n- 8.2 Mampostería confinada o armada: espesor, densidad de muros por dirección, confinamientos (columnetas/vigas) según NEC-SE-MP.\n- 8.3 Mampostería no estructural: aislarla del pórtico o anclarla para evitar columna corta y volteo.","","Planta de muros estructurales y criterios de mampostería."],["res-09","Predimensionar estructura de madera o guadúa si aplica","- 9.1 Madera: grupo estructural de la especie (NEC-SE-MD), secciones comerciales, deflexión (suele gobernar).\n- 9.2 Guadúa: diámetros y espesores de pared, culmos múltiples, uniones empernadas con mortero, cimiento aislado de la humedad (NEC-SE-GUADÚA).\n- 9.3 Protección por diseño: aleros amplios, sobrecimiento, ventilación.","","Esquema de secciones de madera/guadúa y detalles de unión preliminares."],["res-10","Predimensionar cubiertas metálicas y correas","- 10.1 Correas: perfiles G/C doblados en frío; luz entre pórticos y separación según panel de cubierta (tabla del fabricante).\n- 10.2 Pórticos o armaduras: cordones y diagonales con fuerzas de Estática (est-14), esbeltez de barras comprimidas.\n- 10.3 Verificar succión de viento: anclajes y arriostramientos (tensores/cruces de San Andrés).","","Secciones preliminares de correas y armaduras."]]],["Fase 2 · Deformaciones, juntas y durabilidad",[["res-11","Controlar deflexiones de losas, vigas y voladizos","- 11.1 Calcular deflexión inmediata con fórmulas tipo (5wL⁴/384EI; wL⁴/8EI) usando inercia fisurada estimada.\n- 11.2 Añadir deflexión diferida (fluencia lenta).\n- 11.3 Comparar con límites L/360, L/240, L/480 según haya mampostería o acabados frágiles.\n- 11.4 Voladizos largos y losas que soportan mampostería: considerar contraflecha o mayor peralte.","","Verificación de deflexiones de elementos críticos."],["res-12","Definir juntas sísmicas y de dilatación","- 12.1 Juntas sísmicas: separar bloques irregulares (L, T, U) o de distinta altura; ancho según derivas máximas de ambos bloques (NEC-SE-DS) — también respecto a edificios vecinos.\n- 12.2 Juntas de dilatación térmica en edificios largos y cubiertas metálicas.\n- 12.3 Juntas de control en pisos y mampostería.\n- 12.4 Detalle arquitectónico de la junta: tapajuntas en pisos, muros, cubierta y fachada que permitan el movimiento.","La NEC-SE-DS exige separación mínima entre estructuras adyacentes para evitar golpeteo (pounding), frecuente en daños del sismo de 2016.","Plano de juntas y detalles constructivos de tapajuntas."],["res-13","Definir recubrimientos y medidas contra corrosión","- 13.1 Clase de exposición (interior, intemperie, contacto con suelo, ambiente marino/cloruros).\n- 13.2 Recubrimientos mínimos del refuerzo según ACI 318 / NEC-SE-HM (mayor en contacto con suelo y a la intemperie).\n- 13.3 Relación a/c máxima y f'c mínima por durabilidad.\n- 13.4 Acero estructural: sistema de pintura (primer + intermedio + acabado) o galvanizado según ambiente; evitar pares galvánicos (aluminio-acero).\n- 13.5 Detalles que evitan agua estancada en estructuras metálicas.","","Tabla de recubrimientos y sistemas de protección por elemento."],["res-14","Revisar resistencia al fuego de elementos estructurales","- 14.1 Determinar la resistencia al fuego exigida por uso y altura (NEC-HS-CI, Bomberos).\n- 14.2 Hormigón: recubrimiento y espesores mínimos.\n- 14.3 Acero: pintura intumescente, recubrimientos proyectados, encamisados.\n- 14.4 Madera: sección de sacrificio (carbonización).","","Especificación de protección al fuego de la estructura."]]],["Fase 3 · Especificaciones técnicas de materiales",[["res-15","Especificar el hormigón por elemento","- 15.1 f'c por elemento (cimentación, columnas, vigas, losas, muros, contrapisos no estructurales).\n- 15.2 Tamaño máximo de agregado, asentamiento, a/c máxima, tipo de cemento, aditivos.\n- 15.3 Premezclado vs hecho en obra; bombeo.\n- 15.4 Curado mínimo y protección en clima cálido.","Premezclado NTE INEN 1855; cemento según NTE INEN 2380/490; cita en especificaciones del rubro (formato de SERCOP en obra pública).","Especificación técnica de hormigones."],["res-16","Especificar acero de refuerzo y acero estructural","- 16.1 Refuerzo: fy 420 MPa corrugado soldable (NTE INEN 2167), mallas electrosoldadas (NTE INEN 2209).\n- 16.2 Acero estructural: calidad (ASTM A36, A572 Gr50), perfiles, pernos (ASTM F3125), electrodos y procedimientos de soldadura (AWS D1.1), inspección.\n- 16.3 Protección anticorrosiva y contra fuego.","","Especificación técnica de aceros."],["res-17","Especificar mampostería, morteros, madera y guadúa","- 17.1 Bloques: resistencia y tipo (NTE INEN 3066), mortero por tipo y dosificación.\n- 17.2 Madera: especie, grupo, humedad máxima, preservación.\n- 17.3 Guadúa: edad de corte, secado, preservación, diámetros.","","Especificación técnica de mampostería y materiales orgánicos."],["res-18","Priorizar materiales de menor carbono incorporado en la especificación","- 18.1 Cementos con adiciones (puzolánicos/compuestos) cuando la norma lo permita.\n- 18.2 Optimizar cuantías y secciones (menos material).\n- 18.3 Acero con contenido reciclado declarado por el fabricante.\n- 18.4 Madera y guadúa de fuentes legales/certificadas.\n- 18.5 Solicitar declaraciones ambientales de producto (EPD) si existen.","","Anexo de criterios de bajo carbono en especificaciones."]]],["Fase 4 · Control de calidad en obra",[["res-19","Elaborar el plan de ensayos de calidad","- 19.1 Hormigón: frecuencia de muestreo (por vaciado/volumen/área según ACI 318), probetas por muestra, edades de ensayo 7, 14 y 28 días, slump por camión.\n- 19.2 Acero: certificados por lote, ensayos de tracción y doblado por muestreo.\n- 19.3 Soldadura: inspección visual 100 %, ensayos no destructivos en uniones críticas.\n- 19.4 Suelos: compactación de rellenos (Proctor, densidad de campo).\n- 19.5 Definir laboratorio acreditado y responsable.","Laboratorios acreditados por el Servicio de Acreditación Ecuatoriano (SAE); en obra pública la fiscalización exige los ensayos como requisito para planillas.","Plan de ensayos (tabla elemento × ensayo × frecuencia × responsable)."],["res-20","Controlar toma, curado y rotura de probetas","- 20.1 Toma de muestras en obra según NTE INEN 1576: moldes, varillado, identificación, curado inicial.\n- 20.2 Transporte al laboratorio y curado estándar.\n- 20.3 Rotura a 7/14/28 días (NTE INEN 1573) y registro en base de datos por elemento.\n- 20.4 Criterio de aceptación a 28 días; si falla: núcleos, análisis estructural, refuerzo o demolición.","","Registro de resultados de resistencia por elemento con aceptación/rechazo."],["res-21","Inspeccionar armaduras antes de cada vaciado","- 21.1 Verificar diámetros, número, espaciamientos, estribos de confinamiento en zonas críticas, ganchos sísmicos.\n- 21.2 Recubrimientos con separadores.\n- 21.3 Longitudes de traslape y ubicación de empalmes (fuera de zonas de rótula).\n- 21.4 Firmar liberación de vaciado en libro de obra.","","Checklist firmado de liberación de vaciado."]]],["Fase 5 · Coordinación y cierre",[["res-22","Coordinar el predimensionamiento con el cálculo estructural definitivo","- 22.1 Entregar al ingeniero el predimensionamiento, cargas, materiales y restricciones arquitectónicas.\n- 22.2 Recibir secciones definitivas y actualizar planos/modelo BIM.\n- 22.3 Verificar coherencia arquitectura–estructura (alturas libres, vanos, ductos, juntas).\n- 22.4 Revisar planos estructurales: cuadro de materiales, recubrimientos, especificaciones y notas.","","Planos arquitectónicos y estructurales coordinados."],["res-23","Documentar planos as-built estructurales y resultados de ensayos","- 23.1 Registrar cambios de secciones o armados hechos en obra.\n- 23.2 Archivar certificados de materiales y ensayos por elemento.\n- 23.3 Entregar al propietario/administrador.","","Dossier de calidad estructural + planos as-built."],["res-24","Incluir en el manual de mantenimiento la inspección estructural","- 24.1 Frecuencia de inspección de fisuras, corrosión, juntas, anclajes, pintura de estructura metálica.\n- 24.2 Revisión tras sismos significativos (evaluación post-sismo, NEC-SE-RE).\n- 24.3 Prohibición de perforar vigas/columnas o cambiar cargas sin autorización técnica.","","Capítulo estructural del manual de uso y mantenimiento."]]]]},"ins":{"n":"Instalaciones","f":[["Fase 0 · Levantamiento de servicios y factibilidades",[["ins-01","Levantar las redes públicas existentes frente al predio","Recorrer el sitio y documentar qué servicios llegan y dónde.\n- 1.1 Ubicar tapas de alcantarillado sanitario y pluvial, sumideros, hidrantes, válvulas y medidores cercanos; foto y coordenada.\n- 1.2 Identificar postes, transformadores, línea de media tensión, ducto subterráneo y cámaras de la distribuidora.\n- 1.3 Registrar redes de telecomunicaciones (postes, pozos de operadoras).\n- 1.4 Medir cotas de tapas y de la rasante para saber si el predio descarga por gravedad.\n- 1.5 Verificar servidumbres y líneas de alta tensión que restrinjan la implantación.","Pedir a la empresa de agua el catastro de redes (en Guayaquil, Interagua) y a la distribuidora eléctrica la red del sector; en Quito, EPMAPS y EEQ.","Plano de redes existentes con cotas, fotos y fichas de cada servicio."],["ins-02","Solicitar factibilidad de agua potable y alcantarillado","Tramitar el certificado que confirma si la red puede abastecer y recibir las descargas del proyecto.\n- 2.1 Preparar datos: ubicación, uso, área, número de unidades, dotación estimada.\n- 2.2 Presentar solicitud con IRM/línea de fábrica y plano de implantación.\n- 2.3 Leer condiciones: diámetro de acometida, punto de conexión, presión disponible, obligación de cisterna o de planta de tratamiento, separación pluvial/sanitaria.\n- 2.4 Si no hay red: planificar solución autónoma (pozo, tanquero, fosa, planta) y su permiso ambiental.","Guayaquil: factibilidad de servicios ante Interagua; Quito: EPMAPS; Cuenca: ETAPA EP; otros cantones: empresa municipal de agua. Plazo variable, iniciar al tener el programa y área.","Certificado de factibilidad de agua potable y alcantarillado con condiciones técnicas."],["ins-03","Solicitar factibilidad de servicio eléctrico","Confirmar con la distribuidora cómo se alimentará el proyecto.\n- 3.1 Estimar la demanda preliminar (paso ins-07) y presentarla.\n- 3.2 Obtener: punto de conexión, nivel de tensión (baja o media), necesidad de transformador propio y tipo (poste, padmounted, cámara), obras de extensión de red a cargo del promotor.\n- 3.3 Registrar exigencias de la distribuidora sobre ubicación de medidores y de la cámara de transformación.","CNEL EP Unidad de Negocio Guayaquil, EEQ en Quito, CENTROSUR en Cuenca; el proyecto eléctrico definitivo lo firma un ingeniero eléctrico con registro ante la distribuidora.","Factibilidad eléctrica con punto de conexión y condiciones de transformación."],["ins-04","Revisar normas y requisitos de Bomberos para la tipología","Identificar desde el inicio qué exige el Cuerpo de Bomberos.\n- 4.1 Determinar uso, altura, área y carga de ocupantes.\n- 4.2 Leer el Reglamento de Prevención de Incendios y las reglas técnicas locales: extintores, red húmeda, rociadores, detección, escaleras protegidas, reserva de agua, acceso de vehículos.\n- 4.3 Anotar las NFPA que se usarán supletoriamente.\n- 4.4 Consultar requisitos del trámite de visto bueno de planos.","Guayaquil: Benemérito Cuerpo de Bomberos (Departamento de Prevención); Quito: CBDMQ; el visto bueno es previo al permiso de construcción en edificaciones que lo requieran.","Checklist de exigencias SCI y de evacuación para la tipología."],["ins-05","Recopilar clima y recursos para agua, energía y confort","Reunir datos que definen estrategias de instalaciones.\n- 5.1 Temperaturas, humedad, vientos dominantes y lluvias (curvas IDF) de la estación INAMHI más cercana.\n- 5.2 Irradiación solar para fotovoltaica y solar térmica.\n- 5.3 Calidad del agua de red (dureza) y confiabilidad del servicio (cortes).\n- 5.4 Historial de cortes eléctricos para dimensionar respaldo.","","Ficha climática y de recursos con implicaciones para HVAC, pluviales y renovables."],["ins-06","Levantar instalaciones existentes si se interviene una edificación","En remodelaciones o ampliaciones, diagnosticar lo que existe.\n- 6.1 Recorrer tableros, medidores, cisterna, bombas, desagües, equipos HVAC.\n- 6.2 Pruebas básicas: presión de agua, estado de aislamiento, puesta a tierra, filtraciones.\n- 6.3 Decidir qué se conserva, repara o reemplaza.\n- 6.4 En zona patrimonial, definir rutas de instalaciones que no dañen elementos protegidos (instalaciones vistas, reversibles).","En Guayaquil y Quito, los inmuebles inventariados requieren aprobación de la entidad municipal de patrimonio e INPC para intervenciones.","Informe de diagnóstico de instalaciones existentes con fotos y recomendaciones."]]],["Fase 1 · Demanda y reservas de espacio en el anteproyecto",[["ins-07","Calcular dotación de agua y demanda eléctrica por tipología","Estimaciones que dimensionan todo lo demás.\n- 7.1 Del programa arquitectónico, extraer ocupantes, camas, alumnos, comensales, m² por uso.\n- 7.2 Aplicar dotaciones de la NHE Agua/CPE INEN 5 → consumo diario.\n- 7.3 Estimar carga eléctrica por m² y por equipos especiales (HVAC, bombas, cocinas, equipos médicos) → demanda máxima con factores de demanda y simultaneidad.\n- 7.4 Añadir cargas futuras (vehículo eléctrico, ampliaciones).","","Tabla de dotación de agua (L/día) y demanda eléctrica (kVA) por zona y total."],["ins-08","Predimensionar cisterna, tanque y reserva contra incendios","- 8.1 Volumen de consumo = dotación diaria × días de reserva exigidos o recomendados.\n- 8.2 Reserva SCI según caudal y duración del sistema (red húmeda y/o rociadores) exigidos por Bomberos/NFPA.\n- 8.3 Decidir cisterna exclusiva SCI o compartida (con toma de consumo elevada que proteja la reserva).\n- 8.4 Ubicar la cisterna: accesible, lejos de fosas y cajas, con espacio para doble cámara y cuarto de bombas.\n- 8.5 Comunicar dimensiones y peso al estructural.","","Volúmenes de cisterna (consumo + SCI) y ubicación en planta de anteproyecto."],["ins-09","Reservar shafts, montantes y cuartos técnicos en el anteproyecto","Asegurar el espacio antes de que se consuma en diseño.\n- 9.1 Agrupar baños y cocinas en vertical y ubicar shafts sanitarios contiguos.\n- 9.2 Shaft eléctrico/datos separado, alineado en todos los pisos, con tablero por piso.\n- 9.3 Cuartos: bombas, tableros, generador, transformador, telecomunicaciones, basura, HVAC (condensadoras/chiller), gas.\n- 9.4 Verificar acceso para mantenimiento y reemplazo de equipos (puertas, rutas de montaje).\n- 9.5 Reservar altura de pleno en cielos rasos (ver ins-35).","","Plano de anteproyecto con shafts y cuartos técnicos dimensionados y listado de espacios técnicos en el programa."],["ins-10","Ubicar cámara de transformación, generador y tablero general","- 10.1 Con la demanda (ins-07) y la factibilidad (ins-03), definir tipo de transformador.\n- 10.2 Si es cámara: planta baja con acceso desde la vía pública, ventilación natural, foso de aceite, dimensiones de la norma de la distribuidora.\n- 10.3 Generador: cerca del tablero general, con escape de gases hacia cubierta o zona segura, entrada de aire, tanque de diésel, atenuación de ruido.\n- 10.4 Cuarto de tableros y medidores accesible para lectura.","Las distribuidoras publican normas de diseño de cámaras de transformación y centros de medición; seguir la vigente de CNEL EP/EEQ.","Ubicación y dimensiones de cámara de transformación, generador y tablero general en anteproyecto."],["ins-11","Definir estrategia de climatización y ventilación natural","Decisión arquitectónica y técnica temprana.\n- 11.1 Clima Guayaquil (cálido-húmedo): minimizar ganancia solar (aleros, parasoles, fachadas este/oeste cerradas), ventilación cruzada en usos que lo admitan, cubierta aislada.\n- 11.2 Definir qué zonas se climatizan y cuáles se ventilan naturalmente.\n- 11.3 Elegir sistema: split/VRF para mediano, agua helada para grande; DOAS para controlar humedad.\n- 11.4 Ubicar condensadoras o chiller (cubierta, balcón técnico) con rejillas y acceso; prever drenaje de condensados.\n- 11.5 Estimar carga térmica preliminar con ratios y validarla con simulación.","","Estrategia de confort con zonificación climatizada/ventilada, sistema elegido y espacios de equipos."],["ins-12","Definir protección contra incendios y evacuación en el anteproyecto","- 12.1 Carga de ocupantes, número y ancho de salidas, distancias de recorrido.\n- 12.2 Escaleras de emergencia (protegidas/presurizadas) y sectores de incendio.\n- 12.3 Ubicar gabinetes de red húmeda, siamesa en fachada accesible y cuarto de bombas SCI.\n- 12.4 Decidir si hay rociadores (por exigencia o por criterio) y su efecto en el pleno.\n- 12.5 Acceso y maniobra del camión de bomberos.","","Plano de estrategia SCI y evacuación (rutas, salidas, sectores, equipos principales)."],["ins-13","Definir estrategia de agua y energía sostenible","- 13.1 Aparatos eficientes y metas de ahorro de agua.\n- 13.2 Evaluar captación pluvial y reúso de aguas grises (balance oferta/demanda).\n- 13.3 Evaluar fotovoltaica (área de cubierta, consumo, retorno) y solar térmica para ACS.\n- 13.4 Si se busca certificación (EDGE, LEED), cargar datos preliminares en su herramienta.","","Estrategia de eficiencia de agua y energía con medidas seleccionadas y ahorro estimado."],["ins-14","Prever transporte vertical y estudio de tráfico","- 14.1 Determinar si la ordenanza o el uso exigen ascensor.\n- 14.2 Estudio de tráfico: población por piso, capacidad, velocidad, número de cabinas.\n- 14.3 Pedir dimensiones de ducto, foso, recorrido superior y cuarto de máquinas a dos o más fabricantes.\n- 14.4 Salud: ascensores de camillas separados; considerar montacargas y circulaciones limpio/sucio.","","Número, tipo y dimensiones de ascensores con ductos reservados."]]],["Fase 2 · Diseño por especialidad",[["ins-15","Diseñar red de agua potable y sistema de presión","- 15.1 Trazar acometida, medidor, cisterna, bombas y montantes.\n- 15.2 Calcular caudales probables por tramo (unidades de consumo) y diámetros con pérdidas de carga.\n- 15.3 Seleccionar sistema: presión constante con variadores (recomendado), hidroneumático o gravedad; zonificar presión en edificios altos.\n- 15.4 Válvulas de corte por unidad y por baño; medidores individuales en PH.\n- 15.5 Isométricos y detalles de cisterna y cuarto de bombas.","","Planos de agua fría, isométricos, cálculo hidráulico y selección de bombas."],["ins-16","Diseñar agua caliente sanitaria","- 16.1 Definir sistema (calentador por unidad, central, bomba de calor, solar con respaldo).\n- 16.2 Dimensionar acumulación y potencia según picos.\n- 16.3 Recirculación y aislamiento; control de temperatura (antiescaldadura, Legionella).\n- 16.4 Materiales (PPR, CPVC, cobre).","","Planos y memoria de agua caliente con equipos seleccionados."],["ins-17","Diseñar desagües sanitarios, ventilación y pluviales","- 17.1 Unidades de descarga, diámetros de ramales, bajantes y colectores; pendientes.\n- 17.2 Cajas de revisión, registros, conexión a red pública (o cárcamo de bombeo).\n- 17.3 Ventilación sanitaria primaria y secundaria hasta cubierta.\n- 17.4 Pluviales con intensidad IDF del INAMHI: canales, sumideros, bajantes, rebosaderos, drenaje de patios y rampas.\n- 17.5 Sistemas separados sanitario/pluvial según la empresa de agua.","","Planos de aguas servidas, ventilación y aguas lluvias con cálculo."],["ins-18","Diseñar trampa de grasa y separadores","- 18.1 Identificar descargas de cocina, lavado de vajilla, parqueaderos, talleres.\n- 18.2 Dimensionar trampa por caudal y retención; ubicar accesible y fuera de áreas de preparación.\n- 18.3 Separador de hidrocarburos en parqueaderos lavables.\n- 18.4 Definir frecuencia de limpieza para el manual de mantenimiento.","Requisito de la empresa de agua y verificado por ARCSA y el permiso de funcionamiento municipal en establecimientos de alimentos.","Detalle y ubicación de trampa de grasa y separadores."],["ins-19","Diseñar tratamiento de aguas residuales si no hay alcantarillado","- 19.1 Caracterizar el efluente (doméstico, hospitalario, industrial).\n- 19.2 Elegir solución: fosa séptica + infiltración (pruebas de percolación), biodigestor, planta compacta.\n- 19.3 Cumplir límites de descarga de la normativa ambiental y regularizar en SUIA.\n- 19.4 Prever acceso para limpieza y lodos.","","Diseño de sistema de tratamiento con memoria y permiso ambiental en trámite."],["ins-20","Diseñar reúso de aguas grises y captación pluvial","- 20.1 Balance mensual lluvia/consumo no potable.\n- 20.2 Red separada para inodoros y riego con señalización 'agua no potable'.\n- 20.3 Filtro de primer lavado, tanque, desinfección, bomba.\n- 20.4 Protección contra conexión cruzada.","","Diseño del sistema de reúso con ahorro de agua estimado."],["ins-21","Diseñar instalación eléctrica y cuadros de carga","- 21.1 Ubicar puntos de iluminación, tomacorrientes y cargas especiales en planos de arquitectura.\n- 21.2 Agrupar en circuitos según NEC-SB-IE; diferenciales en zonas húmedas.\n- 21.3 Cuadros de carga por tablero y demanda total; diagrama unifilar.\n- 21.4 Calibres por capacidad y caída de tensión; canalizaciones y bandejas.\n- 21.5 Acometida, medición, transformador y celdas según distribuidora.","","Planos eléctricos, cuadros de carga, diagrama unifilar y memoria de cálculo."],["ins-22","Diseñar puesta a tierra y protección contra rayos","- 22.1 Malla de puesta a tierra con resistencia objetivo según uso.\n- 22.2 Evaluación de riesgo por rayo (IEC 62305) y sistema externo si aplica.\n- 22.3 Equipotencialización y protección contra sobretensiones en tableros.","","Plano y memoria de puesta a tierra y pararrayos."],["ins-23","Diseñar respaldo: generador, UPS e iluminación de emergencia","- 23.1 Listar cargas esenciales (SCI, ascensor, bombas, emergencia, equipos críticos).\n- 23.2 Dimensionar generador y transferencia automática; autonomía de combustible.\n- 23.3 UPS para datos y equipos críticos.\n- 23.4 Iluminación de emergencia en rutas de evacuación con autonomía mínima.\n- 23.5 Salud: sistema eléctrico esencial por ramales y aislamiento en quirófanos.","","Esquema de respaldo con generador, UPS y lista de cargas esenciales."],["ins-24","Diseñar iluminación con cálculo luminotécnico","- 24.1 Niveles por tarea (EN 12464-1/IES y normativa local).\n- 24.2 Cálculo en DIALux/Relux: iluminancia, uniformidad, UGR.\n- 24.3 Integrar luz natural y controles (sensores, zonas).\n- 24.4 Elegir luminarias LED con eficacia alta y CRI adecuado.","","Estudio luminotécnico y plano de iluminación con especificación de luminarias."],["ins-25","Diseñar sistema contra incendios completo","- 25.1 Extintores por tipo de riesgo y distancia.\n- 25.2 Red húmeda con gabinetes; siamesa; hidrantes si aplica.\n- 25.3 Rociadores: clasificación de riesgo, cálculo hidráulico, ubicación de cabezas coordinada con cielo raso.\n- 25.4 Bomba principal + jockey, cuarto de bombas SCI, cisterna.\n- 25.5 Detección y alarma direccionable con interfaces a HVAC, ascensores y accesos.\n- 25.6 Presurización de escaleras/extracción de humo en edificios altos o sótanos.\n- 25.7 Señalética y planos de evacuación.","","Planos SCI (agua, detección, señalética), memoria y cálculo hidráulico."],["ins-26","Diseñar climatización, ventilación y extracciones","- 26.1 Cargas térmicas por local (HAP, Trace o simulación energética).\n- 26.2 Selección de equipos y ductos; rejillas y difusores coordinados con cielo raso.\n- 26.3 Aire exterior según ASHRAE 62.1; control de humedad.\n- 26.4 Extracciones de baños, cocinas, parqueaderos y cuartos técnicos.\n- 26.5 Drenaje de condensado y alimentación eléctrica de equipos.","","Planos de HVAC, memoria de cargas y selección de equipos."],["ins-27","Diseñar extracción de cocina industrial","- 27.1 Campana tipo y caudal según equipos.\n- 27.2 Ducto con resistencia al fuego, pendiente y registros de limpieza (NFPA 96).\n- 27.3 Aire de reposición y descarga lejos de tomas de aire.\n- 27.4 Supresión en campana y corte de gas automático.","","Diseño de extracción y supresión de cocina."],["ins-28","Diseñar HVAC hospitalario con presiones diferenciales","- 28.1 Clasificar locales (quirófano, UCI, aislamiento, esterilización, laboratorio, farmacia).\n- 28.2 Aplicar ASHRAE 170: renovaciones totales y de aire exterior, presión relativa, humedad, filtración HEPA.\n- 28.3 Diseñar antesalas y cascadas de presión; monitores de presión en puertas.\n- 28.4 Sistemas independientes para áreas contaminadas sin recirculación.","Revisar las guías de infraestructura del MSP y los requisitos de ACESS para licenciamiento.","Matriz de condiciones por local y diseño HVAC hospitalario."],["ins-29","Diseñar gases medicinales","- 29.1 Tomas por cama y local según servicio.\n- 29.2 Central de oxígeno (criogénico, manifold o PSA), vacío, aire medicinal; ubicación exterior con acceso de camión.\n- 29.3 Redes de cobre médico, válvulas de zona, alarmas.\n- 29.4 Especificar pruebas y certificación (NFPA 99/ISO 7396-1).","","Planos y memoria de gases medicinales."],["ins-30","Diseñar instalación de gas GLP centralizado","- 30.1 Definir consumos por artefacto.\n- 30.2 Ubicar tanque estacionario con distancias de seguridad (NTE INEN 2260) y acceso de abastecimiento.\n- 30.3 Regulación, medidores por unidad, tuberías y ventilación de locales.\n- 30.4 Prohibir GLP en sótanos; detectores y válvula de corte.","Revisión de Bomberos y comercializadora calificada de GLP.","Planos de gas con memoria y ubicación del tanque."],["ins-31","Diseñar datos, seguridad electrónica y automatización","- 31.1 Cableado estructurado TIA-568: cuarto de entrada, MDF, IDF por piso, puntos de red, Wi-Fi.\n- 31.2 CCTV, control de accesos, intercomunicación, llamado de enfermeras (salud), sonido y evacuación por voz.\n- 31.3 Domótica (KNX, residencial) o BMS (BACnet) para supervisar equipos.\n- 31.4 Canalizaciones separadas de energía.","","Planos de telecomunicaciones, seguridad y automatización con diagramas de bloques."],["ins-32","Diseñar fotovoltaica y solar térmica","- 32.1 Simular producción (PVsyst, SAM, PVGIS o Global Solar Atlas).\n- 32.2 Dimensionar potencia, inversores, estructura y cargas de viento sobre cubierta.\n- 32.3 Coordinar con la arquitectura de cubierta (sombras, accesos de limpieza).\n- 32.4 Preparar trámite de generación distribuida con la distribuidora.","Generación distribuida para autoabastecimiento según regulación ARCERNNR vigente; medidor bidireccional instalado por la distribuidora.","Diseño fotovoltaico/solar térmico con producción anual y retorno estimado."],["ins-33","Diseñar gestión de residuos sólidos","- 33.1 Estimar generación por uso y frecuencia de recolección.\n- 33.2 Cuarto de basura ventilado, lavable, con agua y desagüe, acceso al recolector.\n- 33.3 Puntos de separación en la fuente por piso.\n- 33.4 Salud: almacenamiento intermedio y final de desechos peligrosos, rutas separadas.","","Plano y memoria de gestión de residuos."]]],["Fase 3 · Coordinación MEP y documentación técnica",[["ins-34","Modelar las instalaciones en BIM por disciplina","- 34.1 Definir en el BEP las disciplinas, LOD/LOIN y responsables.\n- 34.2 Modelar tuberías, ductos, bandejas y equipos con dimensiones reales y zonas de mantenimiento.\n- 34.3 Usar familias de fabricantes cuando existan.\n- 34.4 Exportar IFC para coordinación.","","Modelos MEP por disciplina con nivel de información acordado."],["ins-35","Coordinar pleno, shafts e interferencias","- 35.1 Federar arquitectura, estructura y MEP.\n- 35.2 Correr detección de interferencias duras y blandas.\n- 35.3 Resolver según jerarquía: desagües por gravedad, ductos grandes, bandejas, tuberías a presión, cables.\n- 35.4 Verificar altura libre final de cielo raso y ubicar registros.\n- 35.5 Aprobar perforaciones en estructura con el estructural.\n- 35.6 Registrar incidencias en BCF hasta cerrar.","","Informe de coordinación sin interferencias críticas y cortes de pleno por zona."],["ins-36","Coordinar anclaje sísmico y juntas","- 36.1 Anclar equipos pesados, tanques y tuberías según NEC-SE-DS y referencias internacionales.\n- 36.2 Acoples flexibles en juntas de dilatación/sísmicas.\n- 36.3 Bases antivibratorias para bombas, generador y chiller.","","Detalles de anclaje sísmico y soportes."],["ins-37","Elaborar memorias técnicas y planos por especialidad","- 37.1 Memoria de cada especialidad: normas, criterios, cálculos, equipos.\n- 37.2 Planos con simbología, cuadros, detalles, isométricos, unifilares.\n- 37.3 Especificaciones técnicas por rubro.\n- 37.4 Cantidades y presupuesto referencial de instalaciones.\n- 37.5 Firmas de profesionales responsables.","","Expediente técnico de instalaciones (memorias, planos, especificaciones, presupuesto)."],["ins-38","Preparar especificaciones y términos de contratación de instalaciones","- 38.1 Especificar marcas equivalentes y requisitos de desempeño.\n- 38.2 Incluir pruebas, commissioning, capacitación y manuales como obligación contractual.\n- 38.3 En obra pública, redactar según formatos SERCOP y sin direccionar marcas.","","Especificaciones técnicas con requisitos de pruebas y entrega."]]],["Fase 4 · Aprobaciones",[["ins-39","Obtener visto bueno de planos del Cuerpo de Bomberos","- 39.1 Reunir planos SCI y evacuación, memoria, firmas y formularios.\n- 39.2 Ingresar el trámite y atender observaciones.\n- 39.3 Archivar el visto bueno para el permiso de construcción.","Guayaquil: Benemérito Cuerpo de Bomberos; Quito: CBDMQ; los requisitos se consultan en su portal.","Visto bueno/aprobación de Bomberos."],["ins-40","Aprobar proyecto hidrosanitario ante la empresa de agua","- 40.1 Presentar planos, memoria y factibilidad.\n- 40.2 Atender observaciones sobre acometida, medidores, cisterna y descargas.\n- 40.3 Pagar tasas y programar la conexión.","Interagua (Guayaquil), EPMAPS (Quito), ETAPA (Cuenca).","Aprobación del proyecto hidrosanitario."],["ins-41","Aprobar proyecto eléctrico ante la distribuidora","- 41.1 Presentar proyecto firmado por ingeniero eléctrico registrado.\n- 41.2 Incluir transformador, medición, redes y, si aplica, generación distribuida.\n- 41.3 Coordinar fiscalización de la distribuidora durante la obra.","CNEL EP, EEQ, CENTROSUR según área de concesión.","Aprobación del proyecto eléctrico."],["ins-42","Tramitar aprobaciones sectoriales y ambientales","- 42.1 Salud: incluir instalaciones en el expediente de licenciamiento (ACESS/MSP).\n- 42.2 Ambiental: registro o licencia en SUIA si hay planta de tratamiento, generador grande o desechos peligrosos.\n- 42.3 Alimentos: condiciones sanitarias de instalaciones para ARCSA.","","Permisos sectoriales y ambientales vigentes."]]],["Fase 5 · Construcción, pruebas y puesta en marcha",[["ins-43","Supervisar la instalación contra planos y registrar cambios","- 43.1 Revisar muestras de materiales y equipos antes de instalar.\n- 43.2 Verificar pendientes, soportes, sellos cortafuego, camisas.\n- 43.3 Registrar cambios en obra para as-built.\n- 43.4 Fotografiar instalaciones antes de cerrar cielos y muros.","","Libro de obra y registro fotográfico de instalaciones ocultas."],["ins-44","Ejecutar pruebas hidrosanitarias","- 44.1 Prueba hidrostática de agua potable a presión mayor a la de servicio, sin caída durante el tiempo especificado.\n- 44.2 Desinfección y análisis bacteriológico.\n- 44.3 Prueba de estanqueidad y flujo en desagües.\n- 44.4 Prueba de bombas y sistema de presión.","","Actas de pruebas hidrosanitarias firmadas."],["ins-45","Ejecutar pruebas eléctricas","- 45.1 Megado de conductores y equipos.\n- 45.2 Continuidad, polaridad, disparo de diferenciales.\n- 45.3 Medición de puesta a tierra con telurómetro.\n- 45.4 Prueba de transferencia a generador y autonomía de UPS/emergencia.\n- 45.5 Termografía de tableros bajo carga.","","Protocolos de pruebas eléctricas."],["ins-46","Ejecutar pruebas del sistema contra incendios","- 46.1 Prueba hidrostática de red húmeda y rociadores.\n- 46.2 Prueba de bomba (curva de caudal y presión).\n- 46.3 Prueba funcional de detección, alarma e interfaces (HVAC, ascensores, puertas).\n- 46.4 Inspección de Bomberos para permiso de ocupación/funcionamiento.","","Actas de pruebas SCI e inspección de Bomberos aprobada."],["ins-47","Balancear y poner en marcha HVAC, gases y equipos","- 47.1 Balanceo de aire y agua (TAB).\n- 47.2 Verificar temperatura, humedad y presiones diferenciales (salud).\n- 47.3 Certificación de gases medicinales y de gas GLP.\n- 47.4 Pruebas y certificación de ascensores.\n- 47.5 Commissioning según ASHRAE Guideline 0 si se busca certificación.","","Informes de balanceo, certificaciones y puesta en marcha."]]],["Fase 6 · Operación y mantenimiento",[["ins-48","Entregar planos as-built y modelo BIM de operación","- 48.1 Actualizar planos y modelo con lo realmente construido.\n- 48.2 Cargar datos de activos (marca, modelo, serie, garantía) en formato COBie o tabla.\n- 48.3 Entregar al propietario/administración.","","As-built y modelo/base de datos de activos."],["ins-49","Elaborar manual de operación y mantenimiento","- 49.1 Fichas técnicas, garantías, contactos de proveedores.\n- 49.2 Rutinas preventivas por sistema y frecuencia: limpieza de cisterna y trampa de grasa, bombas, pruebas de generador, filtros HVAC, inspecciones SCI (NFPA 25), ascensores, fotovoltaica.\n- 49.3 Vida útil y plan de reemplazo de equipos.\n- 49.4 Capacitación al personal de mantenimiento con acta.","","Manual O&M con plan preventivo y cronograma de reposición."],["ins-50","Separar y documentar instalaciones comunales e individuales","- 50.1 Identificar medidores, tableros y válvulas de cada unidad.\n- 50.2 Documentar áreas técnicas comunales y responsabilidades en el reglamento de copropiedad.\n- 50.3 Entregar a cada propietario los planos de su unidad.","","Anexo técnico de instalaciones para la propiedad horizontal."],["ins-51","Medir consumos y ajustar la operación","- 51.1 Registrar consumo de agua y energía mensual (submedición).\n- 51.2 Comparar con lo estimado y detectar fugas o desperdicios.\n- 51.3 Ajustar horarios de HVAC, iluminación y bombas; revisar producción fotovoltaica.","","Reporte periódico de consumos y acciones de mejora."]]]]}};

/* ═══════════════════════════ 1. ESTRUCTURA ═══════════════════════════ */
/* Sistemas estructurales. luz [típica min, máx] m · pm pisos máx. razonable · c costo relativo 1–5 · R NEC-SE-DS Tablas 15/16 ·
   Ct, a: período T = Ct·hn^a (NEC-SE-DS 6.3.3) · D carga muerta típica total de piso kN/m² (para W sísmico) */
var SIS1=[
 {id:"hap",n:"Pórticos de hormigón armado",sh:"Pórtico H.A.",luz:[4,8],pm:12,c:3,R:8,Ct:.055,a:.9,D:6.8,ln:"6–7,5 m",nor:"NEC-SE-HM · NEC-SE-DS (pórtico especial)",
  pro:["Sistema más conocido en Ecuador: mano de obra y materiales en todo el país","Flexibilidad de planta y fachadas","Buen comportamiento al fuego (2–3 h sin protección)"],
  con:["Peso propio alto → más fuerza sísmica y cimentación mayor","Encofrado y curado alargan el plazo","Exige nudos dúctiles muy bien detallados (vigas débiles, columnas fuertes)"],dib:"por"},
 {id:"dual",n:"Dual: pórticos + muros de corte H.A.",sh:"Dual H.A.",luz:[5,9],pm:30,c:3.4,R:8,Ct:.055,a:.75,D:7.2,ln:"6–8,5 m",nor:"NEC-SE-HM · NEC-SE-DS (sistema dual)",
  pro:["Controla derivas: protege acabados y equipos (clave en hospitales)","Permite edificios altos en zona sísmica V–VI","Núcleos de escaleras/ascensores trabajan como muros"],
  con:["Muros condicionan la planta y las fachadas","Más hormigón y acero que un pórtico simple","Torsión si los muros no son simétricos"],dib:"dual"},
 {id:"mam",n:"Mampostería confinada",sh:"Mamp. confinada",luz:[3,4.5],pm:3,c:1.6,R:3,Ct:.055,a:.75,D:6.0,ln:"3–4,5 m",nor:"NEC-SE-MP · NEC-SE-VIVIENDA",
  pro:["El más económico para vivienda de 1–3 pisos","Muros portantes = cerramiento: menos rubros","Técnica popular, fácil supervisión"],
  con:["Luces cortas y planta rígida (muros alineados en todos los pisos)","Baja ductilidad (R = 3): mayor cortante de diseño","No apto para equipamientos de gran luz ni esenciales grandes"],dib:"mam"},
 {id:"ace",n:"Acero estructural (pórticos / arriostrados)",sh:"Acero",luz:[6,15],pm:40,c:3.8,R:8,Ct:.072,a:.8,D:4.6,ln:"8–12 m",nor:"NEC-SE-AC · AISC 341/360",
  pro:["Luces grandes con poco peso → menos sismo y cimentación","Montaje rápido, prefabricado en taller","Reciclable; fácil de ampliar o reforzar"],
  con:["Protección contra fuego y corrosión (costa/salinidad) obligatoria","Soldadura y pernos requieren inspección calificada (AWS D1.1)","Costo sensible al precio internacional del acero"],dib:"ace"},
 {id:"mix",n:"Mixto acero–hormigón (columnas compuestas + steel deck)",sh:"Mixto",luz:[8,14],pm:40,c:3.6,R:8,Ct:.072,a:.8,D:5.2,ln:"8–12 m",nor:"NEC-SE-AC · AISC 360 cap. I",
  pro:["Columnas rellenas: gran capacidad en sección pequeña","Losa colaborante sin encofrado: obra más rápida","Buena rigidez y resistencia al fuego del núcleo de hormigón"],
  con:["Exige coordinación precisa (conectores, pernos de corte)","Mano de obra especializada en Ecuador limitada fuera de Quito/Guayaquil","Detalles de nudo más complejos"],dib:"mix"},
 {id:"mad",n:"Madera / CLT (madera contralaminada)",sh:"Madera · CLT",luz:[4,8],pm:6,c:3.4,R:3,Ct:.055,a:.75,D:3.2,ln:"4–6 m",nor:"NEC-SE-MD · Eurocódigo 5 · IBC 2021 (tipo IV)",
  pro:["Muy liviana: fuerza sísmica baja","Carbono almacenado y obra seca rápida","Confort y calidez interior (biofilia)"],
  con:["En Ecuador no hay producción industrial de CLT: importación","Protección contra humedad, xilófagos y fuego (carbonización)","Normativa nacional limitada para altura media"],dib:"mad"},
 {id:"gua",n:"Guadúa angustifolia (bahareque encementado / pórticos)",sh:"Guadúa",luz:[3,4],pm:2,c:1.4,R:2,Ct:.055,a:.75,D:2.4,ln:"3–4 m",nor:"NEC-SE-GUADÚA (2016)",
  pro:["Recurso local de la costa y subtrópico ecuatoriano, bajo carbono","Excelente relación resistencia/peso, buen desempeño sísmico","Tradición constructiva (bahareque) y norma propia"],
  con:["NEC-SE-GUADÚA limita a 2 pisos y luces cortas","Requiere preservado (inmunizado), secado y protección de la lluvia y del suelo","Uniones especializadas (pernos + mortero en entrenudos)"],dib:"gua"},
 {id:"pos",n:"Losas postensadas + núcleos",sh:"Postensado",luz:[8,12],pm:30,c:3.7,R:5,Ct:.055,a:.75,D:6.4,ln:"8–11 m",nor:"ACI 318 cap. 25 · PTI · NEC-SE-HM",
  pro:["Losas planas delgadas (L/40–L/45): más altura libre","Grandes luces sin vigas: ideal para estacionamientos y oficinas","Menos fisuración y deflexión"],
  con:["La losa plana no resiste sismo sola: requiere muros/núcleos","Perforaciones posteriores muy restringidas (cables)","Proveedor y tensado especializados"],dib:"pos"},
 {id:"cas",n:"Cáscaras y láminas plegadas de hormigón",sh:"Cáscaras",luz:[20,60],pm:1,c:4.2,R:3,Ct:.055,a:.75,D:3.5,ln:"20–50 m",nor:"ACI 318 · IASS (cubiertas)",
  pro:["Cubre grandes luces con espesores de 6–12 cm por forma","Expresión arquitectónica (Candela, Isler, Dieste)","Muy durable si está bien impermeabilizada"],
  con:["Encofrado curvo costoso y artesanal","Cálculo no lineal y sensible a imperfecciones/pandeo","Solo para cubiertas: la subestructura define el sismo"],dib:"cas"},
 {id:"ten",n:"Tensoestructuras (membranas y cables)",sh:"Tenso",luz:[15,100],pm:1,c:3.2,R:3,Ct:.072,a:.75,D:.4,ln:"20–80 m",nor:"EN 13782 · ASCE 55 · Eurocódigo membranas",
  pro:["La más liviana: grandes luces casi sin peso","Sombra y ventilación ideales para clima cálido-húmedo","Prefabricada, montaje en días"],
  con:["Viento (succión) gobierna: anclajes y mástiles robustos","Vida útil de la membrana 15–30 años (PVC/PTFE)","Aislamiento térmico y acústico bajos"],dib:"ten"}
];
var SIS1I={}; SIS1.forEach(function(s){ SIS1I[s.id]=s; });
var BIGSPAN={DEP:1,EVE:1,TRA:1,IND:1,AGR:1,PUB:1,EFI:1};
function sisScore(s,pr,Z){
  var sc=60, why=[];
  if(pr.pisos>s.pm){ sc-=60; why.push("supera los "+s.pm+" pisos recomendados"); }
  var big=!!BIGSPAN[pr.cat];
  if(big){ if(s.luz[1]>=14){ sc+=22; why.push("cubre las grandes luces de la tipología"); } else sc-=14; }
  else if(s.id==="cas"||s.id==="ten"){ sc-=30; }
  if(pr.cat==="SAL"||pr.cat==="SEG"){ if(s.id==="dual"){ sc+=26; why.push("controla derivas (edificación esencial I = 1,5)"); } else if(s.id==="hap"||s.id==="ace"||s.id==="mix"){ sc+=12; why.push("ductilidad alta R = 8"); } else if(s.R<5){ sc-=25; } }
  if(pr.cat==="RES"&&pr.pisos<=3){ if(s.id==="mam"||s.id==="gua"||s.id==="mad"){ sc+=18; why.push("económico y adecuado a vivienda baja"); } }
  if((pr.cat==="OFI"||pr.cat==="MIX"||pr.cat==="COM")&&pr.pisos>=5){ if(s.id==="pos"||s.id==="dual"||s.id==="mix"){ sc+=14; why.push("plantas libres y altura media"); } }
  if(pr.pisos>=8&&s.id==="hap"){ sc-=8; why.push("en altura conviene añadir muros (dual)"); }
  if(Z>=.4&&s.R<=3&&pr.pisos>1){ sc-=10; why.push("baja ductilidad en zona sísmica alta"); }
  if(pr.cat==="EDU"&&pr.pisos<=3&&(s.id==="hap"||s.id==="ace")){ sc+=10; why.push("aulas modulares de 7–9 m"); }
  sc-= (s.c-3)*3;
  return {s:clamp(Math.round(sc),0,100),why:why};
}

/* Cargas vivas mínimas NEC-SE-CG 2015 (Tabla 9), kN/m² — valores para prediseño, verificar tabla vigente */
var CV=[
 ["viv","Residencial · viviendas (uni y multifamiliares)",2.0,"RES EFI"],
 ["hot","Hoteles y residencias · habitaciones",2.0,"HOS"],
 ["hotc","Hoteles · corredores y áreas públicas",4.8,"HOS"],
 ["ofi","Oficinas",2.4,"OFI MIX GOB SEG FUT"],
 ["ofl","Oficinas · vestíbulos y corredores de primer piso",4.8,"OFI GOB"],
 ["hq","Hospitales · quirófanos y laboratorios",2.9,"SAL CIE"],
 ["hh","Hospitales · habitaciones de pacientes",2.0,"SAL"],
 ["hc","Hospitales · corredores sobre la planta baja",4.0,"SAL"],
 ["aul","Unidades educativas · aulas",2.0,"EDU"],
 ["auc","Unidades educativas · corredores de 1.er piso",4.8,"EDU"],
 ["bib","Bibliotecas · salas de lectura",2.9,"EDU CUL"],
 ["bie","Bibliotecas · estanterías",7.2,"CUL"],
 ["ase","Reunión · asientos fijos (teatros, templos)",2.9,"REL CUL"],
 ["asm","Reunión · asientos móviles, vestíbulos, plataformas",4.8,"CUL SOC EVE REL"],
 ["gra","Graderíos, estadios y tribunas",4.8,"DEP EVE"],
 ["gim","Gimnasios y pistas",4.8,"DEP"],
 ["res","Restaurantes y comedores",4.8,"GAS"],
 ["alm","Almacenes minoristas · planta baja",4.8,"COM MIX"],
 ["alp","Almacenes minoristas · pisos superiores",3.6,"COM"],
 ["may","Almacenes mayoristas",6.0,"COM IND"],
 ["bol","Bodegas · livianas",6.0,"IND AGR"],
 ["bop","Bodegas · pesadas",12.0,"IND"],
 ["fal","Fábricas · livianas",6.0,"IND"],
 ["fap","Fábricas · pesadas",12.0,"IND INF"],
 ["gar","Garajes · vehículos de pasajeros",2.0,"TRA MIX"],
 ["esc","Escaleras y rutas de escape",4.8,"*"],
 ["bal","Balcones",4.8,"RES HOS"],
 ["pub","Plazas, aceras y áreas de circulación pública",4.8,"PUB TRA"],
 ["cub","Cubiertas planas, inclinadas y curvas (no accesibles)",0.7,"*"],
 ["cuj","Cubiertas accesibles / jardines / reunión",4.8,"*"]
];
var CVI={}; CV.forEach(function(c){ CVI[c[0]]=c; });
var CVDEF={RES:"viv",HOS:"hot",COM:"alm",GAS:"res",OFI:"ofi",MIX:"ofi",SAL:"hh",EDU:"aul",CUL:"asm",REL:"ase",GOB:"ofi",SEG:"ofi",SOC:"asm",DEP:"gim",PUB:"pub",EVE:"asm",TRA:"pub",IND:"fal",AGR:"bol",INF:"fap",CIE:"hq",EFI:"viv",FUT:"ofi"};

/* Losas */
var LOSA=[["alv","Alivianada (nervada)"],["maz","Maciza"],["pos","Postensada"],["dek","Steel deck"]];
function losaPP(t,h){ if(t==="maz"||t==="pos") return h/100*24; if(t==="dek") return 2.4; return .9+10*h/100; }

/* Zonas sísmicas NEC-SE-DS 2015 */
var ZONAS=[["I",.15],["II",.25],["III",.30],["IV",.35],["V",.40],["VI",.50]];
var ZCOL=[.15,.25,.30,.35,.40,.50];
var CIUZ=[["guayaquil",.40],["daule",.40],["samborondon",.40],["duran",.40],["nobol",.40],["quito",.40],["manta",.50],["portoviejo",.50],["esmeraldas",.50],["santa elena",.50],["salinas",.50],["la libertad",.50],["machala",.40],["ambato",.40],["riobamba",.40],["latacunga",.40],["ibarra",.40],["tulcan",.40],["cuenca",.25],["azogues",.25],["loja",.25]];
var PROVZ={"manabi":.50,"esmeraldas":.50,"santa elena":.50,"guayas":.40,"el oro":.40,"los rios":.35,"pichincha":.40,"imbabura":.40,"carchi":.40,"cotopaxi":.40,"tungurahua":.40,"chimborazo":.40,"bolivar":.40,"santo domingo de los tsachilas":.40,"azuay":.25,"canar":.25,"loja":.25,"zamora chinchipe":.30,"morona santiago":.30,"pastaza":.35,"napo":.35,"orellana":.25,"sucumbios":.25,"galapagos":.15};
var COSTA={"guayas":1,"manabi":1,"santa elena":1,"los rios":1,"el oro":1,"santo domingo de los tsachilas":1};
var ORIENTE={"sucumbios":1,"orellana":1,"napo":1,"pastaza":1,"morona santiago":1,"zamora chinchipe":1};
function zonaAuto(pr){
  var c=norm(pr.loc.canton||pr.loc.ciudad), ci=norm(pr.loc.ciudad), p=norm(pr.loc.provincia);
  for(var i=0;i<CIUZ.length;i++){ if(c.indexOf(CIUZ[i][0])>=0||ci.indexOf(CIUZ[i][0])>=0) return {Z:CIUZ[i][1],src:"cantón "+(pr.loc.canton||pr.loc.ciudad)+" (NEC-SE-DS, Tabla 19)"}; }
  for(var k in PROVZ){ if(p.indexOf(k)>=0) return {Z:PROVZ[k],src:"provincia "+pr.loc.provincia+" (mapa de zonificación, aproximado)"}; }
  return {Z:.40,src:"valor por defecto (sin ubicación)"};
}
function etaAuto(pr,ctx){
  var p=norm(pr.loc.provincia), z=ctx.clima&&ctx.clima.zona;
  if(p.indexOf("esmeraldas")>=0) return {eta:2.48,r:"Esmeraldas"};
  for(var k in COSTA) if(p.indexOf(k)>=0) return {eta:1.80,r:"Costa"};
  for(var o in ORIENTE) if(p.indexOf(o)>=0) return {eta:2.60,r:"Oriente"};
  if(z==="costa") return {eta:1.80,r:"Costa"}; if(z==="amazonia") return {eta:2.60,r:"Oriente"};
  if(z==="galapagos") return {eta:2.48,r:"Galápagos"}; return {eta:2.48,r:"Sierra"};
}
/* Tipos de suelo y coeficientes Fa, Fd, Fs (NEC-SE-DS Tablas 3, 4, 5) por Z = .15 .25 .30 .35 .40 ≥.50 */
var SUELO={
 A:{n:"Roca competente",d:"Vs ≥ 1500 m/s",Fa:[.9,.9,.9,.9,.9,.9],Fd:[.9,.9,.9,.9,.9,.9],Fs:[.75,.75,.75,.75,.75,.75],q:4},
 B:{n:"Roca de rigidez media",d:"760 ≤ Vs < 1500 m/s",Fa:[1,1,1,1,1,1],Fd:[1,1,1,1,1,1],Fs:[.75,.75,.75,.75,.75,.75],q:3},
 C:{n:"Suelo muy denso o roca blanda",d:"360 ≤ Vs < 760 m/s · N ≥ 50 · Su ≥ 100 kPa",Fa:[1.4,1.3,1.25,1.23,1.2,1.18],Fd:[1.36,1.28,1.19,1.15,1.11,1.06],Fs:[.85,.94,1.02,1.06,1.11,1.23],q:2.5},
 D:{n:"Suelo rígido",d:"180 ≤ Vs < 360 m/s · 15 ≤ N < 50 · 50 ≤ Su < 100 kPa",Fa:[1.6,1.4,1.3,1.25,1.2,1.12],Fd:[1.62,1.45,1.36,1.28,1.19,1.11],Fs:[1.02,1.06,1.11,1.19,1.28,1.4],q:1.5},
 E:{n:"Suelo blando / arcillas blandas",d:"Vs < 180 m/s · o > 3 m de arcilla IP > 20, w ≥ 40 %, Su < 50 kPa",Fa:[1.8,1.4,1.25,1.1,1,.85],Fd:[2.1,1.75,1.7,1.65,1.6,1.5],Fs:[1.5,1.6,1.7,1.8,1.9,2],q:.8},
 F:{n:"Requiere estudio de sitio",d:"Licuables, turbas, arcillas muy plásticas (H > 7,5 m), rellenos colapsables",Fa:[1.8,1.4,1.25,1.1,1,.85],Fd:[2.1,1.75,1.7,1.65,1.6,1.5],Fs:[1.5,1.6,1.7,1.8,1.9,2],q:.5}
};
function zIdx(Z){ var b=0; ZCOL.forEach(function(z,i){ if(Z>=z-1e-6) b=i; }); return b; }
function iAuto(cat){ if(cat==="SAL"||cat==="SEG") return 1.5; if(cat==="EDU"||cat==="DEP"||cat==="EVE"||cat==="GOB"||cat==="CUL"||cat==="TRA"||cat==="REL"||cat==="SOC") return 1.3; if(cat==="INF") return 1.5; return 1.0; }
var IOPT=[[1.5,"1,5 · Esencial","Hospitales, clínicas, centros de salud, bomberos, policía, centros de emergencia, tanques contra incendio"],[1.3,"1,3 · Ocupación especial","Escuelas y centros deportivos > 300 personas, edificios > 5000 personas, edificios públicos de operación continua"],[1.0,"1,0 · Otras","Todas las demás estructuras"]];
var QA=[[.5,"Arcilla blanda / relleno"],[1,"Arcilla media / limo"],[1.5,"Arcilla firme / arena media"],[2,"Arena densa / grava"],[3,"Grava densa / conglomerado"],[4,"Roca"]];

/* ───── cálculo estructural central ───── */
function estCalc(ctx,st){
  var pr=proj(ctx), s=SIS1I[st.sis]||SIS1[0];
  if(st.np>0||st.hp>0){ if(st.np>0) pr.pisos=Math.round(st.np); if(st.hp>0) pr.hp=st.hp; pr.alt=pr.pisos*pr.hp; pr.foot=pr.area>0?Math.min(pr.area*pr.cos,pr.A/pr.pisos):pr.A/pr.pisos; }
  /* cargas */
  var ls=st.losa, L=Math.max(st.lx,st.ly), Ls=Math.min(st.lx,st.ly);
  var bw=0.30, ln=Math.max(1,L-bw), beta=L/Ls;
  var hMaz=Math.max(9,ln*100*1.1/(36+9*beta)), h;
  if(ls==="maz") h=rnd(hMaz,1); else if(ls==="alv"){ var he=hMaz/0.72; h=[20,25,30,35,40,45].filter(function(x){return x>=he;})[0]||45; }
  else if(ls==="pos") h=Math.max(16,rnd(L*100/42,1)); else h=12;
  var pp=losaPP(ls,h);
  var D=pp+st.dAc+st.dCr+st.dMp+st.dVc, cv=CVI[st.cv]||CV[0], Lv=cv[2];
  var wu=Math.max(1.2*D+1.6*Lv,1.4*D), ws=D+Lv;
  /* grilla */
  var ratio=1.4, tl=(ctx.P&&ctx.P.terreno&&ctx.P.terreno.local)||null;
  if(tl&&tl.length>2){ var xs=tl.map(function(p){return p[0];}), ys=tl.map(function(p){return p[1];}); var w=Math.max.apply(null,xs)-Math.min.apply(null,xs), hh=Math.max.apply(null,ys)-Math.min.apply(null,ys); if(w>0&&hh>0) ratio=clamp(w/hh,.5,3); }
  var Fx=Math.sqrt(pr.foot*ratio), Fy=pr.foot/Fx;
  var nx=Math.max(1,Math.round(Fx/st.lx)), ny=Math.max(1,Math.round(Fy/st.ly));
  var ncol=(nx+1)*(ny+1);
  var at={int:st.lx*st.ly,bor:st.lx*st.ly/2,esq:st.lx*st.ly/4};
  var ct=st.ctype, At=at[ct];
  /* columnas */
  var fc=st.fc*0.0980665, alpha=ct==="int"?.45:.35;
  var Pu=wu*At*pr.pisos, Ps=ws*At*pr.pisos;
  var Ag=Pu*1000/(alpha*fc); var side=Math.max(30,rnd(Math.sqrt(Ag)/10,5));
  /* vigas */
  var hv=Math.max(30,rnd(L*100/st.rv,5)), bv=Math.min(Math.max(25,rnd(hv*.5,5)),side);
  if(bv<25) bv=25;
  /* zapatas */
  var qa=st.qa*98.0665, Az=1.1*Ps/qa, B=Math.max(1,rnd(Math.sqrt(Az),.05)), hz=Math.max(40,rnd(B*100*.25,5));
  var Aint=1.1*ws*at.int*pr.pisos/qa, ni=Math.max(0,(nx-1)*(ny-1)), nb=Math.max(0,2*(nx-1)+2*(ny-1));
  var Atot=ni*Aint+nb*Aint/2+4*Aint/4, ocup=Atot/(nx*st.lx*ny*st.ly);
  /* sismo */
  var Z=st.z, zi=zIdx(Z), so=SUELO[st.suelo]||SUELO.D, Fa=so.Fa[zi], Fd=so.Fd[zi], Fs=so.Fs[zi];
  var et=etaAuto(pr,ctx), eta=st.eta||et.eta, r=st.suelo==="E"||st.suelo==="F"?1.5:1;
  var T0=.1*Fs*Fd/Fa, Tc=.55*Fs*Fd/Fa, TL=2.4*Fd;
  var hn=pr.alt, Ta=s.Ct*Math.pow(hn,s.a);
  var Sa=function(T){ return T<=Tc?eta*Z*Fa:eta*Z*Fa*Math.pow(Tc/T,r); };
  var SaT=Sa(Ta), I=st.I||iAuto(pr.cat), R=s.R, fP=st.fP, fE=st.fE;
  var Cs=I*SaT/(R*fP*fE);
  var Afl=pr.A/pr.pisos, Dw=s.id==="hap"||s.id==="dual"||s.id==="pos"||s.id==="mam"?D:s.D;
  var Wp=Dw*Afl + (st.cv==="bol"||st.cv==="bop"?.25*Lv*Afl:0), W=Wp*pr.pisos, V=Cs*W;
  var k=Ta<=.5?1:Ta<=2.5?.75+.5*Ta:2, sumwh=0, fl=[];
  for(var i=1;i<=pr.pisos;i++) sumwh+=Wp*Math.pow(i*pr.hp,k);
  for(var j=1;j<=pr.pisos;j++) fl.push({n:j,h:j*pr.hp,F:V*Wp*Math.pow(j*pr.hp,k)/sumwh});
  return {pr:pr,s:s,h:h,hMaz:hMaz,ln:ln,beta:beta,pp:pp,D:D,cv:cv,Lv:Lv,wu:wu,ws:ws,L:L,Ls:Ls,Fx:Fx,Fy:Fy,nx:nx,ny:ny,ncol:ncol,at:at,At:At,fcM:fc,alpha:alpha,Pu:Pu,Ps:Ps,Ag:Ag,side:side,hv:hv,bv:bv,qa:qa,Az:Az,B:B,hz:hz,ocup:ocup,
    Z:Z,zi:zi,so:so,Fa:Fa,Fd:Fd,Fs:Fs,eta:eta,et:et,r:r,T0:T0,Tc:Tc,TL:TL,hn:hn,Ta:Ta,Sa:Sa,SaT:SaT,I:I,R:R,fP:fP,fE:fE,Cs:Cs,Wp:Wp,W:W,V:V,k:k,fl:fl};
}

/* Sol: posición (grados) para latitud, declinación y hora solar */
function solPos(lat,dec,hr){
  var f=rad(lat), d=rad(dec), H=rad(15*(hr-12));
  var sa=Math.sin(f)*Math.sin(d)+Math.cos(f)*Math.cos(d)*Math.cos(H), alt=Math.asin(clamp(sa,-1,1));
  var az=Math.atan2(-Math.cos(d)*Math.sin(H), Math.sin(d)*Math.cos(f)-Math.cos(d)*Math.sin(f)*Math.cos(H));
  var A=(deg(az)+360)%360; return {alt:deg(alt),az:A};
}
var FECHAS=[["jun","21 jun (solsticio)",23.44],["mar","21 mar / 23 sep (equinoccio)",0],["dic","21 dic (solsticio)",-23.44]];
var FACH=[["N","Norte",0],["E","Este",90],["S","Sur",180],["O","Oeste",270]];
function vsa(sp,fa){ var gd=((sp.az-fa+540)%360)-180, g=rad(gd); if(sp.alt<=0||Math.cos(g)<=0.02) return null; return {v:deg(Math.atan(Math.tan(rad(sp.alt))/Math.cos(g))),hsa:gd}; }

/* mini-dibujos de sistemas (120×70) */
function sisDib(P,id,on){
  var c=on?"#38E1FF":"#7FB8D8", g='<svg viewBox="0 0 120 70" class="'+P+'-svg" style="height:70px" aria-hidden="true"><line x1="4" y1="66" x2="116" y2="66" stroke="'+c+'" stroke-opacity=".5"/>';
  function fr(x0,x1,n,fl,h){ var s='', w=(x1-x0)/n; for(var i=0;i<=n;i++) s+='<line x1="'+(x0+i*w)+'" y1="66" x2="'+(x0+i*w)+'" y2="'+(66-fl*h)+'" stroke="'+c+'" stroke-width="2"/>'; for(var j=1;j<=fl;j++) s+='<line x1="'+x0+'" y1="'+(66-j*h)+'" x2="'+x1+'" y2="'+(66-j*h)+'" stroke="'+c+'" stroke-width="2.4"/>'; return s; }
  if(id==="por") g+=fr(14,106,3,3,18)+'<path d="M60 12V66" stroke="#B6FF3C" stroke-width="1.4" class="'+P+'-flow"/>';
  else if(id==="dual") g+=fr(14,106,3,3,18)+'<rect x="45" y="12" width="30" height="54" fill="rgba(56,225,255,.18)" stroke="'+c+'"/><path d="M45 20l30 0M45 30h30M45 40h30M45 50h30M45 60h30" stroke="'+c+'" stroke-opacity=".35"/>';
  else if(id==="mam"){ for(var y=0;y<4;y++) for(var x=0;x<6;x++) g+='<rect x="'+(18+x*14+(y%2?7:0))+'" y="'+(42+y*6)+'" width="13" height="5" fill="none" stroke="'+c+'" stroke-opacity=".55"/>'; g+=fr(14,106,2,2,12)+'<rect x="14" y="40" width="92" height="3" fill="'+c+'"/>'; }
  else if(id==="ace") g+=fr(10,110,3,3,18)+'<path d="M10 66 43 48M43 66 10 48M77 48 110 30M110 48 77 30M43 30 77 12M77 30 43 12" stroke="#FFC24B" stroke-width="1.3"/>';
  else if(id==="mix") g+=fr(10,110,2,3,18)+'<path d="M10 '+(66-18)+' l4 -3 l4 3 l4 -3 l4 3 l4 -3 l4 3 l4 -3 l4 3 l4 -3 l4 3 l4 -3 l4 3 l4 -3 l4 3 l4 -3 l4 3 l4 -3 l4 3 l4 -3 l4 3 l4 -3 l4 3 l4 -3 l4 3" fill="none" stroke="#FFC24B" stroke-width="1"/><rect x="57" y="12" width="6" height="54" fill="rgba(56,225,255,.4)" stroke="'+c+'"/>';
  else if(id==="mad"){ for(var k=0;k<3;k++) g+='<rect x="16" y="'+(16+k*17)+'" width="88" height="14" fill="rgba(255,194,75,.12)" stroke="#FFC24B"/><path d="M20 '+(20+k*17)+'h80M20 '+(25+k*17)+'h80" stroke="#FFC24B" stroke-opacity=".35"/>'; }
  else if(id==="gua"){ g+='<path d="M20 66V26M60 66V18M100 66V26M20 26 60 18 100 26M20 46 60 26 100 46" stroke="#B6FF3C" stroke-width="3" fill="none" stroke-linecap="round"/>'; [20,60,100].forEach(function(x){ for(var y=30;y<66;y+=9) g+='<line x1="'+(x-3)+'" x2="'+(x+3)+'" y1="'+y+'" y2="'+y+'" stroke="var(--bg)" stroke-width="1.2"/>'; }); }
  else if(id==="pos") g+=fr(10,110,2,3,18)+'<path d="M10 22 Q35 32 60 22 T110 22M10 40 Q35 50 60 40 T110 40" fill="none" stroke="#FF6FA8" stroke-width="1.3" class="'+P+'-flowS"/>';
  else if(id==="cas") g+='<path d="M8 66 Q60 -6 112 66" fill="rgba(56,225,255,.1)" stroke="'+c+'" stroke-width="2.4"/><path d="M24 66Q60 14 96 66" fill="none" stroke="'+c+'" stroke-opacity=".35"/><path d="M40 66Q60 34 80 66" fill="none" stroke="'+c+'" stroke-opacity=".25"/>';
  else if(id==="ten") g+='<path d="M60 66V6M10 66 60 6 110 66" stroke="'+c+'" stroke-width="1.6" fill="none"/><path d="M14 52 Q60 30 106 52 Q60 22 14 52Z" fill="rgba(182,255,60,.12)" stroke="#B6FF3C" stroke-width="1.4"/><circle cx="60" cy="6" r="2.5" fill="#B6FF3C" class="'+P+'-pul"/>';
  return g+'</svg>';
}

var ES={tab:"sis",geo:"ram",fx:{},ckm:"tri",cko:null,cvAll:false,scroll:{}};

/* ═══════════════ 1b. CALCULADORAS ESTRUCTURALES (PREDISEÑO) ═══════════════
   Unidades internas: N, mm, MPa. Entradas en cm, m, kN, kN/m, kN·m y kg/cm² cuando es costumbre en Ecuador.
   Referencias: ACI 318-19 · NEC-SE-HM 2015 · NEC-SE-CG · NEC-SE-GC · NEC-SE-AC / AISC 360-16 · NEC-SE-MD · NEC-SE-GUADÚA. */
var MPAKG=10.19716, KGMPA=0.0980665, ESt=200000;
var BARS=[10,12,14,16,18,20,22,25,28,32];
function ab(d){ return Math.PI*d*d/4; }
function b1(fc){ return fc<=28?.85:Math.max(.65,.85-.05*(fc-28)/7); }
function phiF(et,sp){ var lo=sp?.75:.65; return et>=.005?.9:et<=.002?lo:lo+(.9-lo)*(et-.002)/.003; }
function f0(n){ return fmt(n,0); } function f1(n){ return fmt(n,1); } function f2(n){ return fmt(n,2); } function f3(n){ return fmt(n,3); }
function cm2(mm2){ return f2(mm2/100)+" cm²"; }
function kgc(mpa){ return f0(mpa*MPAKG)+" kg/cm²"; }
function lam_s(d){ return Math.min(1,Math.sqrt(2/(1+.004*d))); }
function barTxt(o){ return o.n+" Ø"+o.db+" mm"; }
function Steps(){ var a=[], o={a:a}; ["h","l","r","n"].forEach(function(k){ o[k]=function(t){ a.push([k,t]); return o; }; }); return o; }
function stepsHTML(a){ return a.map(function(x){ var t=E(x[1]); return x[0]==="h"?'<em style="display:block;margin-top:8px;font-family:var(--f-d);font-size:9px;letter-spacing:.14em">'+t+'</em>':x[0]==="r"?'→ <u>'+t+'</u><br>':x[0]==="n"?'<small>'+t+'</small>':t+'<br>'; }).join(""); }
function stepsTXT(a){ return a.map(function(x){ return x[0]==="h"?"\n  "+x[1].toUpperCase():x[0]==="r"?"    => "+x[1]:x[0]==="n"?"    (nota) "+x[1]:"    "+x[1]; }).join("\n"); }
/* resultado estándar */
function Res(){ return {S:Steps(),K:[],C:[],svg:"",rows:[],warn:[]}; }
function chk(R,t,ok,v){ R.C.push([t,ok,v||""]); }
function kp(R,l,v,s,col){ R.K.push([l,v,s||"",col||""]); }
function row(R,p,v,u){ R.rows.push([p,v,u||""]); }

/* flexión: diseño por bloque de Whitney (ACI 318-19 22.2) */
function flexD(Mu,b,d,fc,fy){
  var Rn=Mu/(.9*b*d*d), q=1-2*Rn/(.85*fc), rho=q<0?NaN:.85*fc/fy*(1-Math.sqrt(q));
  var rmin=Math.max(.25*Math.sqrt(fc)/fy,1.4/fy), rt=.85*b1(fc)*fc/fy*.003/.008;
  var As=rho*b*d, Amin=rmin*b*d;
  return {Rn:Rn,q:q,rho:rho,As:As,Amin:Amin,rmin:rmin,rt:rt,Ad:Math.max(isNaN(As)?0:As,Amin),ok:q>=0};
}
function capF(As,b,d,fc,fy){ var a=As*fy/(.85*fc*b), c=a/b1(fc), et=.003*(d-c)/c, ph=phiF(et); return {a:a,c:c,et:et,phi:ph,Mn:As*fy*(d-a/2),pMn:ph*As*fy*(d-a/2)}; }
function pickBars(As,bw,rec,de,o){
  o=o||{}; var r=[];
  BARS.forEach(function(db){ if(db<(o.min||12)||db>(o.max||32)) return; var n=Math.max(o.nmin||2,Math.ceil(As/ab(db)-1e-9)); if(n>(o.nmax||8)) return;
    var sc=n>1?(bw-2*rec-2*de-n*db)/(n-1):bw-2*rec-2*de-db, smin=Math.max(25,db); r.push({db:db,n:n,A:n*ab(db),sc:sc,fit:sc>=smin,smin:smin}); });
  r.forEach(function(x){ x.sc2=x.A*(1+.025*Math.max(0,x.n-4))*(x.db>=28?1.12:1)*(x.db>=32?1.07:1)*(x.n===2&&bw>=300?1.08:1)*(x.db<12?1.02:1); });
  r.sort(function(a,b){ return (b.fit-a.fit)||(a.sc2-b.sc2)||(a.n-b.n); });
  return r;
}
/* malla en losas/zapatas: barra y separación por metro */
function pickMesh(As1m,smax,dbs){
  var r=null; (dbs||[8,10,12,14,16,18,20]).some(function(db){ var s=Math.floor(ab(db)*1000/As1m/10)*10; s=Math.min(s,smax); if(s>=100){ r={db:db,s:s,A:ab(db)*1000/s}; return true; } return false; });
  if(!r){ var db=dbs?dbs[dbs.length-1]:20, s=Math.max(50,Math.floor(ab(db)*1000/As1m/10)*10); r={db:db,s:s,A:ab(db)*1000/s}; }
  return r;
}
function meshTxt(m){ return "Ø"+m.db+" @ "+f0(m.s/10)+" cm"; }
/* Vc en una dirección sin estribos ACI 318-19 Tabla 22.5.5.1(c) */
function vcNoSt(fc,b,d,rhow){ return .66*lam_s(d)*Math.pow(Math.max(rhow,1e-5),1/3)*Math.sqrt(fc)*b*d; }

/* ───────────── VIGA DE HORMIGÓN ARMADO ───────────── */
var VAP={s:{n:"Simplemente apoyada",mp:1/8,mn:0,mne:0,v:.5,hm:16,dc:1/8},ce:{n:"Continua · vano extremo",mp:1/14,mn:1/10,mne:1/16,v:1.15/2,hm:18.5,dc:1/14-.1/10},
  ci:{n:"Continua · vano interior",mp:1/16,mn:1/11,mne:1/11,v:.5,hm:21,dc:1/16-.2/11},v:{n:"Voladizo",mp:0,mn:1/2,mne:0,v:1,hm:8,dc:0}};
function cViga(v){
  var R=Res(), S=R.S, b=v.b*10, h=v.h*10, rec=v.rec*10, de=v.de, fc=v.fc, fy=v.fy, L=v.L, ap=VAP[v.ap]||VAP.s, c=v.c;
  S.h("Datos"); S.l("b = "+f0(v.b)+" cm · h = "+f0(v.h)+" cm · recubrimiento libre = "+f1(v.rec)+" cm · estribo Ø"+de);
  S.l("f'c = "+f1(fc)+" MPa ("+kgc(fc)+") · fy = "+f0(fy)+" MPa ("+f0(fy*MPAKG)+" kg/cm²) · L = "+f2(L)+" m · "+ap.n);
  /* 1 cargas */
  var pp=v.pp?v.b/100*v.h/100*24:0, wu, ws, wD, wL;
  S.h("1 · Cargas mayoradas (NEC-SE-CG 3.4.3 · ACI 318-19 5.3)");
  if(v.modo==="wu"){ wu=v.wu; ws=wu/1.45; wD=ws*.62; wL=ws-wD; S.l("wu dado (incluye peso propio) = "+f2(v.wu)+" kN/m");
    S.n("Solo para deflexiones: servicio estimado ws ≈ wu/1,45 = "+f2(ws)+" kN/m (D ≈ 62 %). Ingresa D y L para un control exacto."); }
  else { wD=v.wD+pp; wL=v.wL; ws=wD+wL; wu=Math.max(1.4*wD,1.2*wD+1.6*wL);
    if(pp) S.l("Peso propio = b·h·24 kN/m³ = "+f2(v.b/100)+" × "+f2(v.h/100)+" × 24 = "+f2(pp)+" kN/m");
    S.l("D = "+f2(v.wD)+(pp?" + "+f2(pp):"")+" = "+f2(wD)+" kN/m · L = "+f2(wL)+" kN/m");
    S.r("wu = máx(1,4·D ; 1,2·D + 1,6·L) = máx("+f2(1.4*wD)+" ; "+f2(1.2*wD+1.6*wL)+") = "+f2(wu)+" kN/m"); }
  /* 2 momentos */
  var lc=(v.ap==="s"||v.ap==="v")?L:Math.max(.5,L-c);
  S.h("2 · Momentos y cortantes de diseño"+(v.ap==="ce"||v.ap==="ci"?" (coeficientes ACI 318-19 6.5)":""));
  if(v.ap==="ce"||v.ap==="ci") S.l("ln = L − ancho de apoyo = "+f2(L)+" − "+f2(c)+" = "+f2(lc)+" m");
  var Mp=ap.mp*wu*lc*lc, Mn=Math.max(ap.mn,ap.mne)*wu*lc*lc, Vmax=ap.v*wu*lc;
  if(ap.mp) S.l("Mu⁺ = wu·l²·"+(v.ap==="s"?"1/8":v.ap==="ce"?"1/14":"1/16")+" = "+f2(wu)+" × "+f2(lc)+"² × "+f3(ap.mp)+" = "+f2(Mp)+" kN·m");
  if(Mn) S.l("Mu⁻ = wu·l²·"+(v.ap==="v"?"1/2":v.ap==="ce"?"1/10 (cara del 1.er apoyo interior)":"1/11")+" = "+f2(Mn)+" kN·m"+(v.ap==="ce"?" · Mu⁻ extremo = wu·ln²/16 = "+f2(wu*lc*lc/16)+" kN·m":""));
  S.l("Vu máx = "+(v.ap==="ce"?"1,15·wu·ln/2":v.ap==="v"?"wu·L":"wu·l/2")+" = "+f2(Vmax)+" kN");
  if(v.ap==="ce"||v.ap==="ci") S.n("Coeficientes válidos con ≥ 2 vanos, luces adyacentes que no difieran > 20 %, carga uniforme y L/D ≤ 3. Si no se cumple, hacer análisis estructural.");
  kp(R,"Mu⁺",f1(Mp)+" kN·m",f1(Mp/9.81)+" t·m"); kp(R,"Mu⁻",f1(Mn)+" kN·m",ap.mn?"en apoyo":"constructivo"); kp(R,"wu",f2(wu)+" kN/m","servicio "+f2(ws));
  /* 3 flexión */
  function dsg(Mu,db){ var d=h-rec-de-db/2; return {d:d,f:flexD(Mu*1e6,b,d,fc,fy)}; }
  function side(Mu,lab){
    var db0=v.db||16, x=dsg(Mu,db0), opt=pickBars(x.f.Ad,b,rec,de), ch=opt[0];
    if(ch&&ch.db!==db0){ x=dsg(Mu,ch.db); opt=pickBars(x.f.Ad,b,rec,de); ch=opt[0]; }
    var cp=ch?capF(ch.A,b,x.d,fc,fy):null;
    return {Mu:Mu,lab:lab,d:x.d,f:x.f,opt:opt,ch:ch,cp:cp};
  }
  var bot=side(Mp,"inferior (M⁺)"), top=side(Mn,"superior (M⁻)");
  S.h("3 · Flexión — bloque rectangular de Whitney (ACI 318-19 22.2)");
  var rmax=v.sis?Math.min(.025,bot.f.rt):bot.f.rt;
  [bot,top].forEach(function(z){
    if(z.Mu<=0){ S.l("Acero "+z.lab+": momento nulo → acero mínimo constructivo, As,mín = "+cm2(z.f.Amin)); }
    else {
      S.l("Acero "+z.lab+": d = h − rec − Øe − Øb/2 = "+f0(h)+" − "+f0(rec)+" − "+de+" − "+f1((z.ch?z.ch.db:16)/2)+" = "+f0(z.d)+" mm");
      S.l("Rn = Mu/(φ·b·d²) = "+f2(z.Mu)+"×10⁶ / (0,90 × "+f0(b)+" × "+f0(z.d)+"²) = "+f3(z.f.Rn)+" MPa");
      if(!z.f.ok){ S.r("Rn excede la capacidad de la sección: aumentar h o b"); return; }
      S.l("ρ = 0,85·f'c/fy·[1 − √(1 − 2Rn/(0,85·f'c))] = "+fmt(z.f.rho,5));
      S.l("As = ρ·b·d = "+fmt(z.f.rho,5)+" × "+f0(b)+" × "+f0(z.d)+" = "+f0(z.f.As)+" mm² = "+cm2(z.f.As));
    }
    S.l("As,mín = máx(0,25√f'c/fy ; 1,4/fy)·b·d = "+fmt(z.f.rmin,5)+" × "+f0(b)+" × "+f0(z.d)+" = "+cm2(z.f.Amin)+" (ACI 9.6.1.2)");
    if(z.ch){ S.r("Se adopta "+barTxt(z.ch)+" = "+cm2(z.ch.A)+(z.ch.fit?" · separación libre "+f0(z.ch.sc)+" mm ≥ "+f0(z.ch.smin)+" mm":" · NO cabe en 1 capa (sep. "+f0(z.ch.sc)+" mm): usar 2 capas o ampliar b"));
      S.l("a = As·fy/(0,85·f'c·b) = "+f1(z.cp.a)+" mm · c = a/β₁ = "+f1(z.cp.c)+" mm · εt = 0,003(d − c)/c = "+fmt(z.cp.et,4)+" → φ = "+f3(z.cp.phi));
      S.l("φMn = φ·As·fy·(d − a/2) = "+f2(z.cp.pMn/1e6)+" kN·m "+(z.cp.pMn/1e6>=z.Mu-1e-6?"≥":"<")+" Mu = "+f2(z.Mu)+" kN·m");
      S.n("Alternativas: "+z.opt.slice(1,4).map(function(o){ return barTxt(o)+" ("+cm2(o.A)+(o.fit?"":", 2 capas")+")"; }).join(" · "));
    }
  });
  var rb=bot.ch?bot.ch.A/(b*bot.d):0, rtp=top.ch?top.ch.A/(b*top.d):0;
  S.l("ρ máx. = "+(v.sis?"mín(0,025 NEC-SE-HM 4.2.5 ; ":"(")+"ρ controlado por tracción εt ≥ 0,005 = "+fmt(bot.f.rt,4)+") = "+fmt(rmax,4));
  chk(R,"Flexión M⁺ · φMn ≥ Mu",bot.Mu<=0||(bot.f.ok&&bot.cp&&bot.cp.pMn/1e6>=bot.Mu-1e-6),bot.ch?barTxt(bot.ch)+" · φMn "+f1(bot.cp.pMn/1e6)+" kN·m":"sección insuficiente");
  if(Mn>0) chk(R,"Flexión M⁻ · φMn ≥ Mu",top.f.ok&&top.cp&&top.cp.pMn/1e6>=top.Mu-1e-6,top.ch?barTxt(top.ch)+" · φMn "+f1(top.cp.pMn/1e6)+" kN·m":"sección insuficiente");
  chk(R,"Cuantía ρ ≤ ρmáx",Math.max(rb,rtp)<=rmax+1e-6,"ρ = "+fmt(Math.max(rb,rtp),4)+" ≤ "+fmt(rmax,4));
  chk(R,"Barras en una capa",(!bot.ch||bot.ch.fit)&&(!top.ch||top.ch.fit),"separación libre ≥ máx(25 mm, Ø)");
  kp(R,"Acero inferior",bot.ch?barTxt(bot.ch):"—",bot.ch?cm2(bot.ch.A):"", "rgba(var(--done-rgb),.6)"); kp(R,"Acero superior",top.ch?barTxt(top.ch):"—",top.ch?cm2(top.ch.A):"");
  /* 4 cortante */
  S.h("4 · Cortante (ACI 318-19 22.5 · 9.7.6 · NEC-SE-HM 4.2.8)");
  var d=bot.d, Vud=v.ap==="v"?wu*(L-d/1000):Math.max(0,Vmax-wu*(c/2*(v.ap==="s"?1:0)+d/1000));
  var Vc=.17*Math.sqrt(fc)*b*d/1000, phV=.75, Av=2*ab(de), fyt=Math.min(fy,420);
  S.l("Vu a d de la cara = "+f2(Vud)+" kN · Vc = 0,17·λ·√f'c·b·d = 0,17 × "+f2(Math.sqrt(fc))+" × "+f0(b)+" × "+f0(d)+" /1000 = "+f2(Vc)+" kN · φ = 0,75");
  var Ve=0, VcC=Vc, VuC=Vud;
  if(v.sis&&v.ap!=="v"&&bot.ch&&top.ch){
    var mpr=function(A){ var a=A*1.25*fy/(.85*fc*b); return A*1.25*fy*(d-a/2)/1e6; }, M1=mpr(top.ch.A), M2=mpr(bot.ch.A), wg=v.modo==="wu"?wu/1.2:1.2*wD+wL;
    Ve=(M1+M2)/lc+wg*lc/2;
    S.l("Cortante por capacidad (NEC-SE-HM 4.2.8 · ACI 18.6.5): Mpr = As·1,25fy·(d − a/2) → Mpr⁻ = "+f1(M1)+" · Mpr⁺ = "+f1(M2)+" kN·m");
    S.l("Ve = (Mpr⁻ + Mpr⁺)/ln + wu,g·ln/2 = ("+f1(M1)+" + "+f1(M2)+")/"+f2(lc)+" + "+f2(wg)+"×"+f2(lc)+"/2 = "+f2(Ve)+" kN");
    if((M1+M2)/lc>=.5*Ve){ VcC=0; S.n("El cortante sísmico ≥ 50 % de Ve → Vc = 0 en la zona confinada (ACI 18.6.5.2)."); }
    VuC=Math.max(Vud,Ve);
  }
  function sReq(Vu,Vcx){ var Vs=Math.max(0,Vu/phV-Vcx); return {Vs:Vs,s:Vs>0?Av*fyt*d/(Vs*1000):Infinity}; }
  var cen=sReq(Vud,Vc), con=sReq(VuC,VcC), Vsmax=.66*Math.sqrt(fc)*b*d/1000;
  var sAv=Av*fyt/(Math.max(.062*Math.sqrt(fc),.35)*b), smaxC=cen.Vs<=.33*Math.sqrt(fc)*b*d/1000?Math.min(d/2,600):Math.min(d/4,300);
  var sCen=Math.floor(Math.min(cen.s,smaxC,sAv)/10)*10, sCon=sCen, lo=0;
  S.l("Zona central: Vs = Vu/φ − Vc = "+f2(cen.Vs)+" kN → s = Av·fyt·d/Vs = "+(isFinite(cen.s)?f0(cen.s)+" mm":"∞ (Vc basta)")+" (Av = 2 ramas Ø"+de+" = "+f0(Av)+" mm²)");
  S.l("s máx = "+f0(smaxC)+" mm · por Av,mín = Av·fyt/(máx(0,062√f'c;0,35)·b) = "+f0(sAv)+" mm");
  S.r("Estribos zona central: Ø"+de+" @ "+f1(sCen/10)+" cm");
  if(v.sis&&v.ap!=="v"){ var db=Math.min(bot.ch?bot.ch.db:16,top.ch?top.ch.db:16), sP=Math.min(d/4,6*db,150);
    sCon=Math.floor(Math.min(sP,con.s)/10)*10; lo=2*h;
    S.l("Zona confinada (2h = "+f0(lo)+" mm desde la cara): s ≤ mín(d/4 ; 6·Ø long. menor ; 150 mm) = mín("+f0(d/4)+" ; "+f0(6*db)+" ; 150) = "+f0(sP)+" mm"+(isFinite(con.s)?" · por cortante "+f0(con.s)+" mm":""));
    S.r("Estribos de confinamiento: 1.º a 5 cm de la cara, Ø"+de+" @ "+f1(sCon/10)+" cm en "+f0(lo/10)+" cm por extremo");
    S.n("NEC-SE-HM 4.2.8 / ACI 318-19 18.6.4: estribos cerrados con ganchos sísmicos de 135°. En empalmes por traslapo s ≤ mín(d/4 ; 100 mm) y nunca en la zona confinada.");
  }
  var nEst=lo?2*(1+Math.floor((lo-50)/sCon))+Math.max(0,Math.floor((lc*1000-2*lo)/sCen)):Math.max(2,Math.ceil(lc*1000/sCen)+1);
  chk(R,"Cortante · Vs ≤ 0,66√f'c·b·d",Math.max(cen.Vs,con.Vs)<=Vsmax,"Vs "+f1(Math.max(cen.Vs,con.Vs))+" ≤ "+f1(Vsmax)+" kN");
  chk(R,"Estribos s ≥ 5 cm (constructible)",sCon>=50&&sCen>=50,"Ø"+de+" @ "+f1(sCon/10)+(lo?" / "+f1(sCen/10):"")+" cm");
  kp(R,"Estribos",(lo?"Ø"+de+" @ "+f1(sCon/10)+" / "+f1(sCen/10):"Ø"+de+" @ "+f1(sCen/10))+" cm",(lo?"confinado / centro · ":"")+"≈ "+nEst+" u",Ve?"":"");
  /* 5 sísmico */
  if(v.sis&&v.ap!=="v"){
    S.h("5 · Requisitos sísmicos de viga (NEC-SE-HM 4.2 · ACI 318-19 18.6)");
    chk(R,"b ≥ 25 cm (NEC)",b>=250,f0(v.b)+" cm"); chk(R,"b/h ≥ 0,30",b/h>=.3,f2(b/h)); chk(R,"ln ≥ 4·d",lc*1000>=4*d,f2(lc)+" m ≥ "+f2(4*d/1000)+" m");
    if(bot.ch&&top.ch) chk(R,"As⁺ en cara ≥ 50 % As⁻",bot.ch.A>=.5*top.ch.A-1e-6,cm2(bot.ch.A)+" vs "+cm2(top.ch.A));
    S.l("Mín. 2 barras continuas arriba y abajo en toda la longitud; ρ ≥ 1,4/fy; As⁺(cara) ≥ ½ As⁻; en cualquier sección As ≥ ¼ del máximo en las caras.");
  }
  /* 6 deflexión */
  S.h((v.sis&&v.ap!=="v"?"6":"5")+" · Deflexión (ACI 318-19 9.3.1.1 y 24.2)");
  var hmin=L*1000/ap.hm; S.l("h mín = L/"+fmt(ap.hm,1)+" = "+f0(hmin)+" mm (fy 420; tabla 9.3.1.1)");
  var Ec=4700*Math.sqrt(fc), Ig=b*h*h*h/12, fr=.62*Math.sqrt(fc), Mcr=fr*Ig/(h/2), nn=ESt/Ec, Ast=v.ap==="v"?(top.ch?top.ch.A:top.f.Amin):(bot.ch?bot.ch.A:bot.f.Amin), dd=v.ap==="v"?top.d:bot.d;
  var kd=(-nn*Ast+Math.sqrt(Math.pow(nn*Ast,2)+2*b*nn*Ast*dd))/b, Icr=b*kd*kd*kd/3+nn*Ast*Math.pow(dd-kd,2);
  var Ma=(v.ap==="v"?.5:ap.mp)*ws*L*L*1e6, Ie=Ma<=2/3*Mcr?Ig:Math.min(Ig,Icr/(1-Math.pow(2/3*Mcr/Ma,2)*(1-Icr/Ig)));
  var Lmm=L*1000, dl=function(w){ return v.ap==="v"?(w*Lmm*Lmm/2)*Lmm*Lmm/(4*Ec*Ie):5/48*(ap.dc*w*Lmm*Lmm)*Lmm*Lmm/(Ec*Ie); };
  var Dt=dl(ws), DL=Dt*wL/ws, DD=Dt-DL, rp=(v.ap==="v"?(bot.ch?bot.ch.A:0):(top.ch?top.ch.A:2*ab(12)))/(b*dd), lam=2/(1+50*rp), DLT=lam*(DD+.25*DL)+DL;
  var Le=v.ap==="v"?2*Lmm:Lmm;
  S.l("Ec = 4700√f'c = "+f0(Ec)+" MPa · Ig = "+fmt(Ig/1e4,0)+" cm⁴ · fr = 0,62√f'c = "+f2(fr)+" MPa · Mcr = "+f2(Mcr/1e6)+" kN·m");
  S.l("n = Es/Ec = "+f2(nn)+" · kd = "+f1(kd)+" mm · Icr = "+fmt(Icr/1e4,0)+" cm⁴ · Ma (servicio) = "+f2(Ma/1e6)+" kN·m");
  S.l("Ie = Icr / [1 − ((⅔)Mcr/Ma)²·(1 − Icr/Ig)] = "+fmt(Ie/1e4,0)+" cm⁴ (ACI 318-19 Tabla 24.2.3.5)");
  S.l("Δ = "+(v.ap==="v"?"Ma·L²/(4·Ec·Ie)":"5/48·(Mm − 0,1(Ma₁+Ma₂))·L²/(Ec·Ie)")+" → Δ(D+L) = "+f1(Dt)+" mm · ΔL = "+f1(DL)+" mm");
  S.l("Largo plazo: λΔ = ξ/(1+50ρ') = 2/(1 + 50×"+fmt(rp,4)+") = "+f2(lam)+" → Δ = λ(ΔD + 0,25ΔL) + ΔL = "+f1(DLT)+" mm");
  chk(R,"h ≥ h mín (sin calcular deflexión)",h>=hmin-1e-6,f0(v.h)+" cm ≥ "+f1(hmin/10)+" cm");
  chk(R,"ΔL ≤ L/360",DL<=Le/360,f1(DL)+" ≤ "+f1(Le/360)+" mm"); chk(R,"Δ largo plazo ≤ L/240",DLT<=Le/240,f1(DLT)+" ≤ "+f1(Le/240)+" mm");
  kp(R,"Deflexión LP",f1(DLT)+" mm","límite L/240 = "+f1(Le/240));
  /* filas y dibujo */
  row(R,"Sección b×h",f0(v.b)+"×"+f0(v.h),"cm"); row(R,"Luz",f2(L),"m"); row(R,"Apoyo",ap.n); row(R,"wu",f2(wu),"kN/m"); row(R,"Mu+",f2(Mp),"kN·m"); row(R,"Mu-",f2(Mn),"kN·m"); row(R,"Vu",f2(Vud),"kN");
  row(R,"As inferior",bot.ch?barTxt(bot.ch)+" ("+cm2(bot.ch.A)+")":"-"); row(R,"As superior",top.ch?barTxt(top.ch)+" ("+cm2(top.ch.A)+")":"-"); row(R,"Estribos",lo?"Ø"+de+" @"+f1(sCon/10)+" (2h) / @"+f1(sCen/10):"Ø"+de+" @"+f1(sCen/10),"cm"); row(R,"Deflexión largo plazo",f1(DLT),"mm");
  R.sum="Viga "+f0(v.b)+"×"+f0(v.h)+" cm, L = "+f2(L)+" m: inf. "+(bot.ch?barTxt(bot.ch):"-")+", sup. "+(top.ch?barTxt(top.ch):"-")+", estribos "+(lo?"Ø"+de+"@"+f1(sCon/10)+"/"+f1(sCen/10):"Ø"+de+"@"+f1(sCen/10))+" cm";
  R.dib={t:"viga",b:v.b,h:v.h,rec:v.rec,de:de,bot:bot.ch,top:top.ch,L:L,lo:lo,sCon:sCon,sCen:sCen,ap:v.ap};
  return R;
}

/* ───────────── COLUMNA DE HORMIGÓN ARMADO ───────────── */
function colBars(g){
  var bars=[], yc=g.rec+g.de+g.db/2, A=ab(g.db);
  if(g.forma==="c"){ var rb=g.D/2-yc; for(var i=0;i<g.nb;i++){ var t=2*Math.PI*i/g.nb; bars.push({y:g.D/2-rb*Math.cos(t),x:g.D/2+rb*Math.sin(t),A:A}); } return bars; }
  var nb=Math.max(4,g.nb+(g.nb%2)), nf=Math.ceil((nb-4)/4)+2, ns=(nb-2*nf)/2;
  for(var k=0;k<nf;k++){ var x=yc+k*(g.b-2*yc)/(nf-1); bars.push({y:yc,x:x,A:A}); bars.push({y:g.h-yc,x:x,A:A}); }
  for(var j=1;j<=ns;j++){ var y=yc+j*(g.h-2*yc)/(ns+1); bars.push({y:y,x:yc,A:A}); bars.push({y:y,x:g.b-yc,A:A}); }
  return bars;
}
function colPM(g){
  var circ=g.forma==="c", H=circ?g.D:g.h, Ag=circ?Math.PI*g.D*g.D/4:g.b*g.h, bars=colBars(g), Ast=bars.reduce(function(s,x){return s+x.A;},0);
  var fc=g.fc, fy=g.fy, B1=b1(fc), N=200, dy=H/N, dt=Math.max.apply(null,bars.map(function(x){return x.y;}));
  var P0=.85*fc*(Ag-Ast)+fy*Ast, kmax=g.sp?.85:.80, phc=g.sp?.75:.65, pPmax=phc*kmax*P0;
  function w(y){ if(circ){ var r=g.D/2, q=y-r; return 2*Math.sqrt(Math.max(0,r*r-q*q)); } return g.b; }
  function at(c){ var a=Math.min(B1*c,H), Cc=0, Mc=0;
    for(var i=0;i<N;i++){ var y0=i*dy; if(y0>=a) break; var y1=Math.min(a,y0+dy), ym=(y0+y1)/2, F=.85*fc*w(ym)*(y1-y0); Cc+=F; Mc+=F*(H/2-ym); }
    var Ps=0, Ms=0; bars.forEach(function(s){ var e=.003*(c-s.y)/c, fs=clamp(ESt*e,-fy,fy); if(s.y<a) fs-=.85*fc; Ps+=s.A*fs; Ms+=s.A*fs*(H/2-s.y); });
    var et=.003*(dt-c)/c, ph=phiF(et,g.sp), Pn=Cc+Ps, Mn=Mc+Ms;
    return {c:c,Pn:Pn,Mn:Mn,et:et,phi:ph,pPn:Math.min(ph*Pn,pPmax),pMn:ph*Mn};
  }
  var cur=[]; for(var k=0;k<=90;k++){ var c=H*Math.pow(10,1.3-k*(2.9/90)); cur.push(at(c)); }
  var Pt=-fy*Ast;
  function bis(fn,lo,hi){ for(var i=0;i<80;i++){ var m=(lo+hi)/2; if(fn(m)>0) hi=m; else lo=m; } return (lo+hi)/2; }
  var cb=.003*dt/(.003+fy/ESt), bal=at(cb), c0=bis(function(c){ return at(c).Pn; },H*.005,H*1.5), flex=at(c0);
  function pMnAt(Pu){ if(Pu>pPmax) return null; if(Pu<=0.9*Pt) return 0; var cc=bis(function(c){ return at(c).pPn-Pu; },H*.003,H*20), r=at(cc); return r; }
  function MnAt(Pu){ var cc=bis(function(c){ return at(c).Pn-Pu; },H*.003,H*20); return at(cc); }
  return {Ag:Ag,Ast:Ast,bars:bars,P0:P0,pPmax:pPmax,Pt:Pt,cur:cur,bal:bal,flex:flex,cb:cb,dt:dt,at:at,pMnAt:pMnAt,MnAt:MnAt,phc:phc,kmax:kmax};
}
function cCol(v){
  var R=Res(), S=R.S, circ=v.forma==="c", b=v.b*10, h=v.h*10, D=v.D*10, rec=v.rec*10, fc=v.fc, fy=v.fy, de=v.db>=32?12:10;
  var g={forma:v.forma,b:b,h:h,D:D,rec:rec,de:de,db:v.db,nb:Math.max(circ?6:4,Math.round(v.nb)),fc:fc,fy:fy,sp:v.tr==="z"};
  var pm=colPM(g), rho=pm.Ast/pm.Ag, H=circ?D:h, bmin=circ?D:Math.min(b,h);
  S.h("Datos"); S.l((circ?"Sección circular D = "+f0(v.D)+" cm":"Sección "+f0(v.b)+" × "+f0(v.h)+" cm (flexión alrededor del eje paralelo a b)")+" · rec. libre "+f1(v.rec)+" cm");
  S.l("f'c = "+f1(fc)+" MPa ("+kgc(fc)+") · fy = "+f0(fy)+" MPa · refuerzo "+g.nb+" Ø"+v.db+" · "+(g.sp?"zunchos (espiral)":"estribos")+" Ø"+de);
  S.l("Pu = "+f1(v.Pu)+" kN · Mu = "+f1(v.Mu)+" kN·m · lu = "+f2(v.lu)+" m · k = "+f2(v.k));
  S.h("1 · Cuantía (NEC-SE-HM 4.3.3 · ACI 318-19 10.6.1 / 18.7.4)");
  S.l("Ag = "+cm2(pm.Ag)+" · Ast = "+g.nb+" × "+f0(ab(v.db))+" = "+cm2(pm.Ast)+" · ρ = Ast/Ag = "+fmt(rho*100,2)+" %");
  var rhoOk=rho>=.01-1e-6&&rho<=(v.sis?.03:.08)+1e-6;
  chk(R,"Cuantía 1 % ≤ ρ ≤ "+(v.sis?"3 % (NEC)":"8 %"),rhoOk,fmt(rho*100,2)+" %");
  S.h("2 · Capacidad axial (ACI 318-19 22.4)");
  S.l("P0 = 0,85·f'c·(Ag − Ast) + fy·Ast = "+f0(pm.P0/1000)+" kN");
  S.r("φPn,máx = "+f2(pm.phc)+" × "+f2(pm.kmax)+" × P0 = "+f0(pm.pPmax/1000)+" kN "+(v.Pu*1000<=pm.pPmax?"≥":"<")+" Pu = "+f0(v.Pu)+" kN");
  /* esbeltez */
  var r=circ?.25*D:.3*h, klr=v.k*v.lu*1000/r, sway=v.k>1, lim=sway?22:Math.min(40,34-12*v.m12), Mmin=v.Pu*(15+.03*H)/1000, M2=Math.max(Math.abs(v.Mu),Mmin), del=1, Mc;
  S.h("3 · Esbeltez (ACI 318-19 6.2.5 · 6.6.4)");
  S.l("r = "+(circ?"0,25·D":"0,30·h")+" = "+f0(r)+" mm · k·lu/r = "+f2(v.k)+" × "+f0(v.lu*1000)+" / "+f0(r)+" = "+f1(klr));
  S.l("Límite para despreciar esbeltez: "+(sway?"pórtico no arriostrado → 22":"arriostrado → 34 − 12·(M1/M2) = "+f1(34-12*v.m12)+" ≤ 40"));
  if(klr>lim){
    var Ec=4700*Math.sqrt(fc), Ig=circ?Math.PI*Math.pow(D,4)/64:b*h*h*h/12, EI=.4*Ec*Ig/(1+.6), Pc=Math.PI*Math.PI*EI/Math.pow(v.k*v.lu*1000,2)/1000, Cm=sway?1:Math.max(.4,.6+.4*v.m12);
    del=Math.max(1,Cm/(1-v.Pu/(.75*Pc)));
    S.l("Esbelta → magnificación: EI = 0,4·Ec·Ig/(1+βdns) (βdns = 0,6) = "+fmt(EI/1e9,1)+" kN·m² · Pc = π²EI/(k·lu)² = "+f0(Pc)+" kN");
    S.l("Cm = "+f2(Cm)+" · δ = Cm/(1 − Pu/(0,75·Pc)) = "+(v.Pu>=.75*Pc?"∞ (inestable)":f3(del)));
    if(v.Pu>=.75*Pc){ del=99; }
  } else S.l("k·lu/r ≤ "+f1(lim)+" → columna corta, sin magnificación.");
  Mc=del*M2;
  S.l("M mín = Pu·(15 + 0,03h) mm = "+f2(Mmin)+" kN·m");
  S.r("Mc = δ·máx(Mu ; Mmín) = "+f2(Mc)+" kN·m");
  chk(R,"Esbeltez k·lu/r ≤ 100",klr<=100,f1(klr)+(klr>lim?" (esbelta: δ = "+f2(del)+")":" (corta)"));
  /* interacción */
  S.h("4 · Diagrama de interacción P–M (compatibilidad de deformaciones, εcu = 0,003)");
  S.l("Compresión pura: φPn,máx = "+f0(pm.pPmax/1000)+" kN (P0 = "+f0(pm.P0/1000)+" kN)");
  S.l("Balanceado: cb = 0,003·dt/(0,003 + fy/Es) = "+f0(pm.cb)+" mm → Pb = "+f0(pm.bal.Pn/1000)+" kN · Mb = "+f1(pm.bal.Mn/1e6)+" kN·m (φ = 0,65 → φPb = "+f0(pm.bal.pPn/1000)+", φMb = "+f1(pm.bal.pMn/1e6)+")");
  S.l("Flexión pura (Pn = 0): c = "+f0(pm.flex.c)+" mm → Mn = "+f1(pm.flex.Mn/1e6)+" kN·m · φ = "+f2(pm.flex.phi)+" → φMn = "+f1(pm.flex.pMn/1e6)+" kN·m");
  S.l("Tracción pura: φPnt = 0,90·(−fy·Ast) = "+f0(.9*pm.Pt/1000)+" kN");
  var cap=pm.pMnAt(v.Pu*1000), pM=cap?cap.pMn/1e6:0, ok=!!cap&&Mc<=pM+1e-6, ratio=cap&&pM>0?Mc/pM:9;
  S.r(cap?"Para Pu = "+f0(v.Pu)+" kN: φMn = "+f1(pM)+" kN·m "+(ok?"≥":"<")+" Mc = "+f1(Mc)+" kN·m (uso "+f0(ratio*100)+" %)":"Pu supera φPn,máx: aumentar sección o f'c");
  chk(R,"Pu ≤ φPn,máx",v.Pu*1000<=pm.pPmax,f0(v.Pu)+" ≤ "+f0(pm.pPmax/1000)+" kN");
  chk(R,"(Pu, Mc) dentro del diagrama",ok,cap?"φMn "+f1(pM)+" ≥ Mc "+f1(Mc)+" kN·m":"fuera");
  kp(R,"φPn,máx",f0(pm.pPmax/1000)+" kN",f0(pm.pPmax/9806.65)+" t"); kp(R,"φMn @ Pu",cap?f1(pM)+" kN·m":"—","uso "+(cap?f0(ratio*100)+" %":"> 100 %"),ok?"rgba(var(--done-rgb),.6)":"var(--warn)");
  kp(R,"Refuerzo",g.nb+" Ø"+v.db,"ρ = "+fmt(rho*100,2)+" %");
  /* transversal */
  S.h("5 · Refuerzo transversal (ACI 318-19 25.7 · 18.7.5 · NEC-SE-HM 4.3.4)");
  var sMax=Math.min(16*v.db,48*de,bmin), lo=0, sLo=0, sOut=0, legs=2;
  if(g.sp){
    var Dc=D-2*rec, Ach=Math.PI*Dc*Dc/4, rs=Math.max(.45*(pm.Ag/Ach-1)*fc/Math.min(fy,700),.12*fc/Math.min(fy,700)), sz=Math.floor(4*ab(de)/(Dc*rs)/5)*5;
    if(v.sis) sz=Math.min(sz,Math.floor(Math.min(D/4,6*v.db,100)/5)*5); sz=clamp(sz,25+de,75+de);
    S.l("ρs ≥ máx(0,45·(Ag/Ach − 1)·f'c/fyt ; 0,12·f'c/fyt) = "+fmt(rs,4)+" · Dc = "+f0(Dc)+" mm");
    S.r("Zuncho Ø"+de+" paso s = 4·Asp/(Dc·ρs) → "+f1(sz/10)+" cm (libre entre 25 y 75 mm)");
    sLo=sz; sOut=sz; chk(R,"Paso del zuncho 25–75 mm libre",sz-de>=25&&sz-de<=75,f1(sz/10)+" cm");
  } else {
    S.l("General (ACI 25.7.2.1): s ≤ mín(16·Øb ; 48·Øe ; menor dimensión) = mín("+f0(16*v.db)+" ; "+f0(48*de)+" ; "+f0(bmin)+") = "+f0(sMax)+" mm");
    sOut=Math.floor(sMax/10)*10; sLo=sOut;
    if(v.sis){
      lo=Math.max(H,circ?D:Math.max(b,h),v.lu*1000/6,450); sLo=Math.floor(Math.min(bmin/4,6*v.db,100)/10)*10; sOut=Math.floor(Math.min(6*v.db,150)/10)*10;
      var bc=(circ?D:b)-2*rec, hc=(circ?D:h)-2*rec, Ach2=bc*hc, AshA=.3*sLo*bc*fc/Math.min(fy,700)*(pm.Ag/Ach2-1), AshB=.09*sLo*bc*fc/Math.min(fy,700), Ash=Math.max(AshA,AshB);
      legs=Math.max(2,Math.ceil(Ash/ab(de)-1e-9));
      var nf=Math.ceil((Math.max(4,g.nb)-4)/4)+2, hx=(bc-2*de-v.db)/(nf-1); var needX=hx>350;
      S.l("lo = máx(h ; lu/6 ; 450 mm) = "+f0(lo)+" mm · s(lo) ≤ mín(b/4 ; 6·Øb ; 100 mm NEC) = "+f0(sLo)+" mm · fuera de lo s ≤ mín(6·Øb ; 150) = "+f0(sOut)+" mm");
      S.l("Ash ≥ máx(0,3·s·bc·f'c/fyt·(Ag/Ach − 1) ; 0,09·s·bc·f'c/fyt) = máx("+f0(AshA)+" ; "+f0(AshB)+") = "+f0(Ash)+" mm² → "+legs+" ramas Ø"+de+" ("+f0(legs*ab(de))+" mm²)");
      if(v.Pu*1000>.3*pm.Ag*fc) S.n("Pu > 0,3·Ag·f'c: ACI 318-19 Tabla 18.7.5.4(c) exige además Ash ≥ 0,2·kf·kn·Pu/(fyt·Ach) y todas las barras soportadas lateralmente.");
      S.r("Estribos Ø"+de+" ("+legs+" ramas) @ "+f1(sLo/10)+" cm en lo = "+f0(lo/10)+" cm arriba y abajo · @ "+f1(sOut/10)+" cm en el centro");
      chk(R,"Separación de barras arriostradas hx ≤ 350 mm",!needX,"hx ≈ "+f0(hx)+" mm");
    } else S.r("Estribos Ø"+de+" @ "+f1(sOut/10)+" cm");
  }
  kp(R,"Transversal",(g.sp?"Zuncho ":"Estr. ")+"Ø"+de+" @ "+f1(sLo/10)+(sLo!==sOut?" / "+f1(sOut/10):"")+" cm",lo?"lo = "+f0(lo/10)+" cm · "+legs+" ramas":"");
  if(v.sis){
    S.h("6 · Requisitos sísmicos NEC-SE-HM 4.3 / ACI 18.7");
    chk(R,"Dimensión mínima ≥ 30 cm (NEC)",bmin>=300,f0(bmin/10)+" cm");
    if(!circ) chk(R,"Relación b/h ≥ 0,4",Math.min(b,h)/Math.max(b,h)>=.4,f2(Math.min(b,h)/Math.max(b,h)));
    var Mnc=pm.MnAt(v.Pu*1000).Mn/1e6;
    if(v.Mnb>0){ var sc=2*Mnc, sb=v.Mnb; S.l("Columna fuerte–viga débil: ΣMnc = 2 × Mn(Pu) = 2 × "+f1(Mnc)+" = "+f1(sc)+" kN·m · 1,2·ΣMnb = 1,2 × "+f1(sb)+" = "+f1(1.2*sb)+" kN·m");
      chk(R,"Columna fuerte–viga débil ΣMnc ≥ 1,2ΣMnb (indicativo)",sc>=1.2*sb,f1(sc)+" ≥ "+f1(1.2*sb)+" kN·m"); }
    else S.n("Columna fuerte–viga débil: ingresa ΣMnb de las vigas que llegan al nudo (o calcula una viga primero) para el chequeo indicativo. Mn columna @ Pu = "+f1(Mnc)+" kN·m.");
  }
  row(R,"Sección",circ?"D "+f0(v.D):f0(v.b)+"×"+f0(v.h),"cm"); row(R,"Pu",f1(v.Pu),"kN"); row(R,"Mc",f2(Mc),"kN·m"); row(R,"Refuerzo",g.nb+" Ø"+v.db+" (ρ "+fmt(rho*100,2)+" %)");
  row(R,"φPn,máx",f0(pm.pPmax/1000),"kN"); row(R,"φMn @ Pu",cap?f1(pM):"-","kN·m"); row(R,"k·lu/r",f1(klr)); row(R,"Transversal","Ø"+de+" @"+f1(sLo/10)+(lo?" (lo "+f0(lo/10)+" cm) / @"+f1(sOut/10):""),"cm");
  R.sum="Columna "+(circ?"Ø"+f0(v.D):f0(v.b)+"×"+f0(v.h))+" cm: "+g.nb+"Ø"+v.db+" (ρ "+fmt(rho*100,2)+" %), Pu "+f0(v.Pu)+" kN, uso "+(cap?f0(ratio*100):">100")+" %";
  R.dib={t:"col",g:g,pm:pm,Pu:v.Pu,Mc:Mc,circ:circ,legs:legs,de:de};
  return R;
}

/* ───────────── LOSAS ───────────── */
var BLQ={15:8,20:10,25:12,30:14};
var LCOND={s:["Simplemente apoyada",20,16,1/8,0,0],ce:["Continua · un extremo",24,18.5,1/14,1/10,1/24],ci:["Continua · ambos extremos",28,21,1/16,1/11,1/11],v:["Voladizo",10,8,0,1/2,0]};
var MARC=[{c:5,m:8,mn:0,n:"apoyado–apoyado"},{c:2,m:128/9,mn:8,n:"empotrado–apoyado"},{c:1,m:24,mn:12,n:"empotrado–empotrado"}];
function allOk(R){ return R.C.every(function(c){ return c[1]!==false; }); }
function cLosa(v){
  var R=cLosa1(v); if(v.h>0||allOk(R)) return R;
  var nerv=v.tipo==='n1'||v.tipo==='n2', h0=R.dib?R.dib.h:20;
  for(var i=1;i<=30;i++){ var o=Object.assign({},v); if(nerv){ var hb=(R.dib?R.dib.hb:15)+5; if(hb>30) break; o._hb=hb; } else { o._h=(R.dib.h*10+10); if(o._h>450) break; } var R2=cLosa1(o); R=R2; if(allOk(R)) break; }
  R.S.n('Espesor aumentado automáticamente desde '+f0(h0)+' cm hasta que cumplen flexión y cortante. Escribe h para fijarlo.');
  return R;
}
function cLosa1(v){
  var R=Res(), S=R.S, t=v.tipo, nerv=t==="n1"||t==="n2", two=t==="m2"||t==="n2", fc=v.fc, fy=v.fy;
  var lx=Math.min(v.Lx,v.Ly), ly=Math.max(v.Lx,v.Ly), beta=ly/lx, cd=LCOND[v.cond]||LCOND.ce;
  S.h("Datos"); S.l({m1:"Losa maciza en una dirección",m2:"Losa maciza en dos direcciones",n1:"Losa alivianada (nervada) en una dirección",n2:"Losa alivianada (nervada) en dos direcciones"}[t]+" · luces libres "+f2(lx)+" × "+f2(ly)+" m · β = "+f2(beta));
  if(!two&&beta<2&&v.Ly>0) S.n("β < 2: la losa trabaja realmente en dos direcciones; el cálculo en una dirección es conservador para la luz corta.");
  if(two&&beta>2) S.n("β > 2: predomina la flexión en la luz corta (comportamiento en una dirección).");
  /* espesor mínimo */
  S.h("1 · Espesor mínimo (ACI 318-19 7.3.1.1 · 8.3.1.2 · 9.3.1.1)");
  var hmin, hb=0, h;
  var heqN=function(hb){ var hf=50, bw=100, bs=500, H=hb+hf, A1=bs*hf, A2=bw*hb, yb=(A1*(hb+hf/2)+A2*hb/2)/(A1+A2), I=bs*hf*hf*hf/12+A1*Math.pow(hb+hf/2-yb,2)+bw*hb*hb*hb/12+A2*Math.pow(hb/2-yb,2); return Math.cbrt(12*I/bs); };
  if(!two){ var den=nerv?cd[2]:cd[1]; hmin=lx*1000/den; S.l("h mín = ln/"+fmt(den,1)+" ("+cd[0]+(nerv?", nervada":"")+") = "+f0(hmin)+" mm"); }
  else { hmin=Math.max(90,lx*1000*(.8+fy/1400)/(36+9*beta)); S.l("h mín = ln·(0,8 + fy/1400)/(36 + 9β) = "+f0(lx*1000)+"×"+f3(.8+fy/1400)+"/(36 + 9×"+f2(beta)+") = "+f0(hmin)+" mm (con vigas rígidas αfm > 2; ≥ 90 mm)"); }
  if(nerv){
    if(v._hb) hb=v._hb; else if(v.h>0){ hb=[15,20,25,30].filter(function(x){return x>=v.h-5-1e-6;})[0]||30; }
    else hb=[15,20,25,30].filter(function(x){ return (two?heqN(x*10):(x*10+50))>=hmin; })[0]||30;
    h=(hb+5)*10;
    S.l("Bloque 40×20×"+hb+" cm + loseta 5 cm → h = "+f0(h/10)+" cm · nervios b = 10 cm @ 50 cm"+(two?" · espesor macizo equivalente (misma inercia) = "+f0(heqN(hb*10))+" mm":""));
  } else { h=v._h?v._h:v.h>0?v.h*10:Math.max(two?90:100,Math.ceil(hmin/10)*10); S.l("h adoptado = "+f0(h/10)+" cm"); }
  var heff=nerv&&two?heqN(hb*10):h;
  chk(R,"Espesor ≥ h mín"+(nerv&&two?" (equivalente)":""),heff>=hmin-1e-6,f0(heff/10)+" ≥ "+f1(hmin/10)+" cm");
  /* cargas */
  S.h("2 · Cargas (NEC-SE-CG)");
  var pp;
  if(nerv){ var nv=two?.36*hb/100:.2*hb/100, nbq=two?8:10; pp=1.2+nv*24+nbq*BLQ[hb]*9.81/1000;
    S.l("Peso propio = loseta 0,05×24 + nervios "+f3(nv)+" m³/m²×24 + "+nbq+" bloques × "+BLQ[hb]+" kg = "+f2(pp)+" kN/m²"); }
  else { pp=h/1000*24; S.l("Peso propio = h·24 = "+f2(pp)+" kN/m²"); }
  var D=pp+v.D, wu=Math.max(1.4*D,1.2*D+1.6*v.L);
  S.l("D = "+f2(pp)+" + "+f2(v.D)+" (acabados, cielo, mampostería) = "+f2(D)+" kN/m² · L = "+f2(v.L)+" kN/m²");
  S.r("wu = máx(1,4D ; 1,2D + 1,6L) = "+f2(wu)+" kN/m² ("+f0(wu*101.97)+" kg/m²)");
  kp(R,"Espesor h",f0(h/10)+" cm",nerv?"bloque "+hb+" + loseta 5":"maciza"); kp(R,"wu",f2(wu)+" kN/m²","pp "+f2(pp));
  /* momentos */
  var mom=[];
  S.h("3 · Momentos por metro de ancho"+(two?" (método de Marcus: reparto por deflexiones + corrección por torsión)":" (coeficientes ACI 318-19 6.5)"));
  if(!two){ var l2=lx*lx; if(cd[3]) mom.push(["Luz · M⁺",cd[3]*wu*l2,"inf"]); if(cd[4]) mom.push(["Apoyo interior · M⁻",cd[4]*wu*l2,"sup"]); if(cd[5]&&v.cond!=="ci") mom.push(["Apoyo extremo · M⁻",cd[5]*wu*l2,"sup"]);
    mom.forEach(function(m){ S.l(m[0]+" = coef·wu·ln² = "+f2(m[1])+" kN·m/m"); }); }
  else { var cx=MARC[clamp(v.ex|0,0,2)], cy=MARC[clamp(v.ey|0,0,2)], qx=wu*cy.c*Math.pow(ly,4)/(cx.c*Math.pow(lx,4)+cy.c*Math.pow(ly,4)), qy=wu-qx;
    var nux=1-20/(3*cx.m)*Math.pow(lx/ly,2)*qx/wu, nuy=1-20/(3*cy.m)*Math.pow(ly/lx,2)*qy/wu;
    S.l("Luz corta lx ("+cx.n+") · luz larga ly ("+cy.n+")");
    S.l("qx = wu·cy·ly⁴/(cx·lx⁴ + cy·ly⁴) = "+f2(qx)+" kN/m² · qy = wu − qx = "+f2(qy)+" kN/m²");
    S.l("νx = 1 − (20/3mx)(lx/ly)²·(qx/wu) = "+f3(nux)+" · νy = "+f3(nuy));
    mom.push(["Dirección corta · M⁺",nux*qx*lx*lx/cx.m,"inf"]); if(cx.mn) mom.push(["Dirección corta · M⁻",qx*lx*lx/cx.mn,"sup"]);
    mom.push(["Dirección larga · M⁺",Math.max(0,nuy)*qy*ly*ly/cy.m,"inf2"]); if(cy.mn) mom.push(["Dirección larga · M⁻",qy*ly*ly/cy.mn,"sup2"]);
    mom.forEach(function(m){ S.l(m[0]+" = "+f2(m[1])+" kN·m/m"); });
    S.n("Marcus es un método aproximado de tablas usado en Latinoamérica; la alternativa ACI es el método directo (8.10) o análisis por elementos finitos."); }
  /* armado */
  S.h("4 · Armado (ACI 318-19 7.6 · 8.6 · 9.6 · 24.4)");
  var rec=20, out=[], okAll=true;
  mom.forEach(function(m){
    if(nerv){ var Mn=m[1]*.5, db0=12, d=h-rec-db0/2-(/2/.test(m[2])?db0:0), bw=/sup/.test(m[2])?100:500, f=flexD(Mn*1e6,bw,d,fc,fy), Amin=1.4/fy*100*d, Ad=Math.max(f.As||0,Amin);
      var o=pickBars(Ad,100,15,0,{min:10,max:16,nmax:2,nmin:1}).filter(function(x){return x.A>=Ad-1e-6;})[0]||{db:16,n:2,A:2*ab(16)};
      var cp=capF(o.A,bw,d,fc,fy), ok=f.ok&&cp.pMn/1e6>=Mn-1e-6; okAll=okAll&&ok;
      S.l(m[0]+" por nervio (×0,50 m) = "+f2(Mn)+" kN·m · d = "+f0(d)+" mm · b = "+bw+" mm"+(bw===500?" (ala, a = "+f1(cp.a)+" mm "+(cp.a<=50?"≤ 50 mm de loseta ✓":"> loseta: revisar como T")+")":" (alma)"));
      S.l("  As = "+(f.ok?f0(f.As):"—")+" mm² · As,mín = 1,4/fy·bw·d = "+f0(Amin)+" mm² → "+o.n+" Ø"+o.db+" por nervio ("+f0(o.A)+" mm²) · φMn = "+f2(cp.pMn/1e6)+" kN·m");
      out.push([m[0],o.n+"Ø"+o.db+"/nervio",ok]);
    } else {
      var db1=10, d1=h-rec-db1/2-(/2/.test(m[2])?db1:0), f1_=flexD(m[1]*1e6,1000,d1,fc,fy), Ats=.0018*1000*h, Ad1=Math.max(f1_.As||0,Ats), smax=two?Math.min(2*h,450):Math.min(3*h,450), ms=pickMesh(Ad1,smax,[8,10,12,14,16]);
      var cp1=capF(ms.A,1000,d1,fc,fy), ok1=f1_.ok&&cp1.pMn/1e6>=m[1]-1e-6; okAll=okAll&&ok1;
      S.l(m[0]+": d = "+f0(d1)+" mm · As = "+(f1_.ok?f0(f1_.As):"—")+" mm²/m · As,mín (0,0018·b·h) = "+f0(Ats)+" mm²/m · s máx = "+f0(smax)+" mm");
      S.l("  → "+meshTxt(ms)+" ("+f0(ms.A)+" mm²/m) · φMn = "+f2(cp1.pMn/1e6)+" kN·m/m");
      out.push([m[0],meshTxt(ms),ok1]);
    }
  });
  if(nerv) S.l("Loseta: malla electrosoldada ≥ 0,0018 × 1000 × 50 = 90 mm²/m (p. ej. Ø5 @ 15 cm) para retracción y temperatura.");
  else if(!two) S.l("Repartición (perpendicular): 0,0018·b·h = "+f0(.0018*1000*h)+" mm²/m → "+meshTxt(pickMesh(.0018*1000*h,Math.min(5*h,450),[8,10,12])));
  out.forEach(function(o){ chk(R,"Flexión "+o[0],o[2],o[1]); });
  /* cortante */
  S.h("5 · Cortante");
  var Vu=(two?wu*lx/2*(1-.5*lx/ly+.5):wu*lx/2*(v.cond==="ce"?1.15:v.cond==="v"?2:1)), dV=h-rec-6;
  if(nerv){ var Vn=Vu*.5, bwv=100, Vc=1.1*.17*Math.sqrt(fc)*bwv*dV/1000; S.l("Vu por nervio ≈ "+f2(Vn)+" kN · φVc = 0,75 × 1,1 × 0,17√f'c·bw·d = "+f2(.75*Vc)+" kN (ACI 9.8.1.5)"); if(Vn<=.75*Vc) chk(R,"Cortante en nervio",true,f2(Vn)+" ≤ "+f2(.75*Vc)+" kN");
    else { var xm=Math.ceil(((Vn-.75*Vc)/(wu*.5)+.1)*10)/10; S.r("Vu > φVc: macizar la losa "+f0(xm*100)+" cm junto a los apoyos (retirar bloques) hasta donde Vu ≤ φVc"); chk(R,"Cortante en nervio (con macizado "+f0(xm*100)+" cm)",xm<=lx/4,f2(Vn)+" > "+f2(.75*Vc)+" kN → zona maciza"); } }
  else { var rw=.0018*h/dV, Vc2=vcNoSt(fc,1000,dV,rw)/1000, Vc17=.17*Math.sqrt(fc)*1000*dV/1000; S.l("Vu ≈ "+f2(Vu)+" kN/m · φVc = 0,75 × 0,66·λs·ρw^⅓·√f'c·b·d = "+f2(.75*Vc2)+" kN/m (ACI 318-19 Tabla 22.5.5.1c; con 0,17√f'c sería "+f2(.75*Vc17)+")"); chk(R,"Cortante (sin estribos)",Vu<=.75*Vc2,f2(Vu)+" ≤ "+f2(.75*Vc2)+" kN/m"); }
  row(R,"Tipo",{m1:"maciza 1D",m2:"maciza 2D",n1:"alivianada 1D",n2:"alivianada 2D"}[t]); row(R,"Luces",f2(lx)+"×"+f2(ly),"m"); row(R,"h",f0(h/10),"cm"); row(R,"wu",f2(wu),"kN/m²");
  out.forEach(function(o){ row(R,o[0],o[1]); });
  kp(R,"Armado",out.length?out[0][1]:"—",out.length>1?out[1][0]+": "+out[1][1]:"",okAll?"rgba(var(--done-rgb),.6)":"var(--warn)");
  R.sum="Losa "+{m1:"maciza 1D",m2:"maciza 2D",n1:"alivianada 1D",n2:"alivianada 2D"}[t]+" h = "+f0(h/10)+" cm, "+out.map(function(o){return o[1];}).join(" / ");
  R.dib={t:"losa",nerv:nerv,two:two,h:h/10,hb:hb,out:out};
  return R;
}

/* ───────────── ZAPATA AISLADA ───────────── */
function cZap(v){
  var R=Res(), S=R.S, fc=v.fc, fy=v.fy, c1=v.c1*10, c2=v.c2*10, qa=v.qa*98.0665, Ps=v.PD+v.PL, Pu=Math.max(1.4*v.PD,1.2*v.PD+1.6*v.PL), Ms=v.M, rec=75;
  S.h("Datos"); S.l("PD = "+f1(v.PD)+" kN · PL = "+f1(v.PL)+" kN · M servicio = "+f1(Ms)+" kN·m · columna "+f0(v.c1)+" × "+f0(v.c2)+" cm");
  S.l("qadm = "+f2(v.qa)+" kg/cm² = "+f1(qa)+" kPa · Df = "+f2(v.Df)+" m · f'c = "+f1(fc)+" MPa · fy = "+f0(fy)+" MPa");
  S.h("1 · Dimensiones en planta (cargas de servicio · NEC-SE-GC)");
  var qn=qa-v.g*v.Df; S.l("q neta = qadm − γprom·Df = "+f1(qa)+" − "+f1(v.g)+" × "+f2(v.Df)+" = "+f1(qn)+" kPa (descuenta peso de zapata y relleno)");
  if(qn<=0){ chk(R,"q neta > 0",false,"Df o qadm incoherentes"); return R; }
  var e=Ms/Ps, m=0, B, L, qmax, qmin;
  for(var i=0;i<400;i++){ B=c1/1000+2*m; L=c2/1000+2*m; var A=B*L; qmax=Ps/A*(1+6*e/L); qmin=Ps/A*(1-6*e/L); if(qmax<=qn&&e<=L/6&&A>=Ps/qn) break; m+=.025; }
  B=Math.ceil(B*20-1e-6)/20; L=Math.ceil(L*20-1e-6)/20; var A=B*L; qmax=Ps/A*(1+6*e/L); qmin=Ps/A*(1-6*e/L);
  S.l("A req = Ps/qn = "+f1(Ps)+" / "+f1(qn)+" = "+f2(Ps/qn)+" m²"+(e>0?" · e = M/P = "+f3(e)+" m":""));
  S.r("B × L = "+f2(B)+" × "+f2(L)+" m (voladizos iguales) · A = "+f2(A)+" m² · q = "+f1(qmax)+(e>0?" / "+f1(qmin):"")+" kPa");
  chk(R,"q máx ≤ q neta",qmax<=qn+1e-6,f1(qmax)+" ≤ "+f1(qn)+" kPa"); if(e>0) chk(R,"e ≤ L/6 (sin tracción)",e<=L/6,f3(e)+" ≤ "+f3(L/6)+" m");
  /* presión última */
  var Mu=Ms*(Pu/Ps), qu=Pu/A*(1+6*(Mu/Pu)/L);
  S.h("2 · Presión última"); S.l("Pu = máx(1,4PD ; 1,2PD + 1,6PL) = "+f1(Pu)+" kN → qu = Pu/A"+(e>0?"·(1 + 6e/L)":"")+" = "+f1(qu)+" kPa (se usa uniforme, conservador)");
  /* espesor */
  S.h("3 · Espesor por cortante (ACI 318-19 22.6 punzonamiento · 22.5 una dirección)");
  var mB=(B*1000-c1)/2, mL=(L*1000-c2)/2, h=v.h>0?v.h*10:400, it=0, res;
  function chkH(h){ var d=h-rec-16, bo=2*(c1+d)+2*(c2+d), Vp=qu*(A-(c1+d)*(c2+d)/1e6), bb=Math.max(c1,c2)/Math.min(c1,c2), ls=lam_s(d),
      vc=Math.min(.33,.17*(1+2/bb),.083*(40*d/bo+2))*ls*Math.sqrt(fc), pVp=.75*vc*bo*d/1000;
    var rw=Math.max(.0018*h/d,.002), V1=qu*B*Math.max(0,mL-d)/1000, V2=qu*L*Math.max(0,mB-d)/1000, pV1=.75*vcNoSt(fc,B*1000,d,rw)/1000, pV2=.75*vcNoSt(fc,L*1000,d,rw)/1000;
    return {h:h,d:d,bo:bo,Vp:Vp,vc:vc,pVp:pVp,V1:V1,V2:V2,pV1:pV1,pV2:pV2,ls:ls,ok:Vp<=pVp&&V1<=pV1&&V2<=pV2}; }
  res=chkH(h); if(!(v.h>0)) while(!res.ok&&it<60){ h+=50; res=chkH(h); it++; }
  S.l("d = h − 7,5 cm − Ø ≈ "+f0(res.d)+" mm · bo = 2(c1 + d) + 2(c2 + d) = "+f0(res.bo)+" mm · λs = "+f3(res.ls));
  S.l("Punzonamiento: Vu = qu·(A − (c1+d)(c2+d)) = "+f1(res.Vp)+" kN · vc = mín(0,33 ; 0,17(1+2/β) ; 0,083(αs·d/bo + 2))·λs·√f'c = "+f3(res.vc)+" MPa");
  S.l("  φVc = 0,75·vc·bo·d = "+f1(res.pVp)+" kN");
  S.l("Una dirección (a d de la cara): Vu = "+f1(res.V1)+" / "+f1(res.V2)+" kN · φVc (Tabla 22.5.5.1c, sin estribos) = "+f1(res.pV1)+" / "+f1(res.pV2)+" kN");
  S.r("h = "+f0(h/10)+" cm (d = "+f0(res.d/10)+" cm)"+(v.h>0?"":" — mínimo que cumple, iniciando en 40 cm"));
  chk(R,"Punzonamiento",res.Vp<=res.pVp,f1(res.Vp)+" ≤ "+f1(res.pVp)+" kN"); chk(R,"Cortante en una dirección",res.V1<=res.pV1&&res.V2<=res.pV2,f1(Math.max(res.V1,res.V2))+" ≤ "+f1(Math.min(res.pV1,res.pV2))+" kN");
  chk(R,"d ≥ 150 mm (ACI 13.3.1.2)",res.d>=150,f0(res.d)+" mm");
  /* flexión */
  S.h("4 · Flexión en la cara de la columna (ACI 318-19 13.2.7)");
  var d=res.d, MuL=qu*B*mL*mL/2/1e6, MuB=qu*L*mB*mB/2/1e6, fL=flexD(MuL*1e6,B*1000,d,fc,fy), fB=flexD(MuB*1e6,L*1000,d-16,fc,fy), Amn=.0018*h;
  var AL=Math.max(fL.As||0,Amn*B*1000), AB=Math.max(fB.As||0,Amn*L*1000), sm=Math.min(3*h,450), meL=pickMesh(AL/B,sm,[12,14,16,18,20,22,25]), meB=pickMesh(AB/L,sm,[12,14,16,18,20,22,25]);
  var nL=Math.ceil(B*1000/meL.s)+1, nBb=Math.ceil(L*1000/meB.s)+1;
  S.l("Dirección L: Mu = qu·B·m²/2 = "+f1(qu)+" × "+f2(B)+" × "+f3(mL/1000)+"²/2 = "+f2(MuL)+" kN·m · As = "+f0(fL.As)+" mm² · As,mín 0,0018·B·h = "+f0(Amn*B*1000)+" mm²");
  S.r("Barras paralelas a L: "+meL.db+" mm @ "+f0(meL.s/10)+" cm ("+nL+" barras)");
  S.l("Dirección B: Mu = "+f2(MuB)+" kN·m · As = "+f0(fB.As)+" mm² · As,mín = "+f0(Amn*L*1000)+" mm²");
  S.r("Barras paralelas a B: "+meB.db+" mm @ "+f0(meB.s/10)+" cm ("+nBb+" barras)");
  if(L/B>1.05) S.n("Zapata rectangular: en la dirección corta concentrar 2/(β+1) del acero en la banda central de ancho B (ACI 13.3.3.3).");
  chk(R,"Flexión",fL.ok&&fB.ok,"Ø"+meL.db+"@"+f0(meL.s/10)+" / Ø"+meB.db+"@"+f0(meB.s/10)+" cm");
  var ld=Math.max(300,fy*Math.min(meL.db,meB.db)/(2.1*Math.sqrt(fc))); chk(R,"Desarrollo de barras en voladizo",Math.min(mL,mB)-75>=ld,"m − 7,5 cm = "+f0(Math.min(mL,mB)-75)+" mm ≥ ld ≈ "+f0(ld)+" mm");
  if(B>3.5) S.n("Zapata mayor a 3,5 m: evaluar zapatas combinadas, vigas de cimentación o losa de cimentación (y pilotes si qadm < 1 kg/cm²).");
  S.l("ld ≈ fy·Ø/(2,1·√f'c) = "+f0(ld)+" mm (ACI 25.4.2.3 simplificado) — si no alcanza, usar ganchos estándar.");
  kp(R,"Planta B × L",f2(B)+" × "+f2(L)+" m","A = "+f2(A)+" m²","rgba(var(--done-rgb),.6)"); kp(R,"Altura h",f0(h/10)+" cm","d = "+f0(d/10)+" cm"); kp(R,"Presión",f1(qmax)+" kPa",f2(qmax/98.0665)+" kg/cm²"); kp(R,"Parrilla","Ø"+meL.db+" @ "+f0(meL.s/10)+" / Ø"+meB.db+" @ "+f0(meB.s/10),"cm, ambos sentidos");
  row(R,"B×L",f2(B)+"×"+f2(L),"m"); row(R,"h",f0(h/10),"cm"); row(R,"q servicio",f1(qmax),"kPa"); row(R,"Pu",f1(Pu),"kN"); row(R,"Parrilla L","Ø"+meL.db+" @"+f0(meL.s/10),"cm"); row(R,"Parrilla B","Ø"+meB.db+" @"+f0(meB.s/10),"cm");
  R.sum="Zapata "+f2(B)+"×"+f2(L)+" m, h "+f0(h/10)+" cm, Ø"+meL.db+"@"+f0(meL.s/10)+"/Ø"+meB.db+"@"+f0(meB.s/10)+" cm";
  R.dib={t:"zap",B:B,L:L,h:h/10,c1:v.c1,c2:v.c2,meL:meL,meB:meB,Df:v.Df};
  return R;
}

/* ───────────── ZAPATA CORRIDA / CIMIENTO CORRIDO ───────────── */
function cCorr(v){
  var R=Res(), S=R.S, fc=v.fc, fy=v.fy, t=v.t*10, qa=v.qa*98.0665, ws=v.wD+v.wL, wu=Math.max(1.4*v.wD,1.2*v.wD+1.6*v.wL), qn=qa-v.g*v.Df;
  S.h("Datos"); S.l((v.tipo==="ha"?"Zapata corrida de hormigón armado":"Cimiento corrido de hormigón ciclópeo (60 % H.S. + 40 % piedra)")+" bajo muro de "+f0(v.t)+" cm");
  S.l("wD = "+f2(v.wD)+" · wL = "+f2(v.wL)+" kN/m · qadm = "+f2(v.qa)+" kg/cm² ("+f1(qa)+" kPa) · Df = "+f2(v.Df)+" m");
  S.h("1 · Ancho (servicio)"); S.l("q neta = "+f1(qa)+" − "+f1(v.g)+"×"+f2(v.Df)+" = "+f1(qn)+" kPa");
  var B=Math.max(v.tipo==="ha"?.6:.5,Math.ceil(ws/qn*20-1e-6)/20); S.r("B = ws/qn = "+f2(ws)+" / "+f1(qn)+" = "+f3(ws/qn)+" → "+f2(B)+" m");
  var qu=wu/B, m=(B*1000-t)/2; S.l("qu = wu/B = "+f2(wu)+" / "+f2(B)+" = "+f1(qu)+" kPa · voladizo m = "+f0(m)+" mm");
  chk(R,"Presión de servicio",ws/B<=qn+1e-6,f1(ws/B)+" ≤ "+f1(qn)+" kPa");
  var h, rowsx=[];
  if(v.tipo==="ha"){
    h=v.h>0?v.h*10:250; var d, V, pV, Mu, f, ok=false;
    for(var i=0;i<40;i++){ d=h-75-6; V=qu*Math.max(0,m-d)/1000; pV=.75*vcNoSt(fc,1000,d,Math.max(.0018*h/d,.002))/1000; if(V<=pV||v.h>0) break; h+=50; }
    Mu=qu*m*m/2/1e6; f=flexD(Mu*1e6,1000,d,fc,fy); var As=Math.max(f.As||0,.0018*1000*h), me=pickMesh(As,Math.min(3*h,450),[10,12,14,16]), At=.0018*B*1000*h, ml=pickBars(At,B*1000,75,0,{min:10,max:16,nmax:12});
    S.h("2 · Espesor y armado (ACI 318-19 13.3)");
    S.l("d = "+f0(d)+" mm · Vu (a d de la cara) = "+f2(V)+" kN/m · φVc = "+f2(pV)+" kN/m");
    S.l("Mu (cara de muro de hormigón) = qu·m²/2 = "+f2(Mu)+" kN·m/m · As = "+f0(f.As)+" mm²/m · mín 0,0018·b·h = "+f0(.0018*1000*h)+" mm²/m");
    S.r("h = "+f0(h/10)+" cm · transversal "+meshTxt(me)+" · longitudinal "+(ml[0]?barTxt(ml[0]):"—")+" (0,0018·B·h)");
    S.n("Muro de mampostería: tomar el momento a ¼ del espesor del muro dentro de la cara (ACI 13.2.7.1).");
    chk(R,"Cortante",V<=pV,f2(V)+" ≤ "+f2(pV)+" kN/m"); chk(R,"Flexión",f.ok,meshTxt(me));
    kp(R,"Ancho B",f2(B)+" m","h = "+f0(h/10)+" cm","rgba(var(--done-rgb),.6)"); kp(R,"Transversal",meshTxt(me)); kp(R,"Longitudinal",ml[0]?barTxt(ml[0]):"—");
    row(R,"B",f2(B),"m"); row(R,"h",f0(h/10),"cm"); row(R,"Transversal",meshTxt(me)); row(R,"Longitudinal",ml[0]?barTxt(ml[0]):"-");
    R.sum="Zapata corrida B = "+f2(B)+" m, h "+f0(h/10)+" cm, "+meshTxt(me);
    R.dib={t:"corr",B:B,h:h/10,tw:v.t,ha:true,me:me};
  } else {
    h=v.h>0?v.h*10:Math.max(400,Math.ceil(m*1.5/50)*50); var fcp=Math.min(fc,14), Mu2=qu*m*m/2/1e6, Sm=1000*h*h/6, pMn=.6*.42*Math.sqrt(fcp)*Sm/1e6, Vu2=qu*Math.max(0,m-h)/1000, pVn=.6*.11*Math.sqrt(fcp)*1000*h/1000;
    S.h("2 · Hormigón simple (ACI 318-19 cap. 14)");
    S.l("f'c del hormigón del ciclópeo ≈ "+f1(fcp)+" MPa (140 kg/cm²) · h = "+f0(h/10)+" cm · ángulo de reparto: m ≤ h/1,5");
    S.l("Mu = qu·m²/2 = "+f2(Mu2)+" kN·m/m · φMn = 0,60 × 0,42√f'c × S = "+f2(pMn)+" kN·m/m (S = b·h²/6)");
    S.l("Vu = "+f2(Vu2)+" kN/m · φVn = 0,60 × 0,11√f'c·b·h = "+f2(pVn)+" kN/m");
    chk(R,"Flexión en hormigón simple",Mu2<=pMn,f2(Mu2)+" ≤ "+f2(pMn)+" kN·m/m"); chk(R,"Cortante",Vu2<=pVn,f2(Vu2)+" ≤ "+f2(pVn)); chk(R,"Ángulo de reparto (m ≤ h/1,5)",m<=h/1.5+1,f0(m)+" ≤ "+f0(h/1.5)+" mm");
    S.n("Usual en vivienda de 1–2 pisos en Ecuador: cimiento corrido de ciclópeo 40–60 cm de ancho + sobrecimiento y cadena de amarre de H.A. (NEC-SE-VIVIENDA).");
    kp(R,"Ancho B",f2(B)+" m","h = "+f0(h/10)+" cm","rgba(var(--done-rgb),.6)"); kp(R,"Volumen",f3(B*h/1000)+" m³/m","≈ "+f3(B*h/1000*.6)+" m³ hormigón");
    row(R,"B",f2(B),"m"); row(R,"h",f0(h/10),"cm"); R.sum="Cimiento corrido ciclópeo B = "+f2(B)+" m × h "+f0(h/10)+" cm";
    R.dib={t:"corr",B:B,h:h/10,tw:v.t,ha:false};
  }
  return R;
}

/* ───────────── ZAPATA COMBINADA (2 columnas) ───────────── */
function cComb(v){
  if(v.h>0) return cComb1(v); var R; for(var h=50;h<=200;h+=5){ R=cComb1(Object.assign({},v,{h:h})); if(allOk(R)) break; } R.S.n('h mínimo que cumple cortante y punzonamiento (búsqueda automática desde 50 cm).'); return R;
}
function cComb1(v){
  var R=Res(), S=R.S, fc=v.fc, fy=v.fy, qa=v.qa*98.0665, qn=qa-v.g*v.Df, P1=v.P1D+v.P1L, P2=v.P2D+v.P2L, Pu1=Math.max(1.4*v.P1D,1.2*v.P1D+1.6*v.P1L), Pu2=Math.max(1.4*v.P2D,1.2*v.P2D+1.6*v.P2L);
  var c1=v.c1/100, c2=v.c2/100, s=v.s, e1=v.lin?c1/2:Math.max(c1/2,v.v1);
  S.h("1 · Geometría (resultante en el centro → presión uniforme)");
  var xr=P2*s/(P1+P2), Lc=2*(e1+xr), Lmin=e1+s+c2/2, ecc=0; Lc=Math.ceil(Lc*20-1e-6)/20;
  if(Lc<Lmin-1e-6){ Lc=Math.ceil((Lmin+.3)*20)/20; ecc=Lc/2-(e1+xr); }
  var qf=1+6*Math.abs(ecc)/Lc, Bc=Math.ceil((P1+P2)*qf/(qn*Lc)*20-1e-6)/20;
  S.l("Ps1 = "+f1(P1)+" kN · Ps2 = "+f1(P2)+" kN · separación s = "+f2(s)+" m · "+(v.lin?"columna 1 en lindero (sin voladizo)":"voladizo 1 = "+f2(e1)+" m"));
  S.l("x̄ desde col. 1 = Ps2·s/(Ps1+Ps2) = "+f3(xr)+" m → L = 2·(e1 + x̄) = "+f3(2*(e1+xr))+" → "+f2(Lc)+" m");
  if(ecc>0){ S.l("La carga de la columna de lindero es mayor: L centrado (= "+f2(2*(e1+xr))+" m) no alcanza a la columna 2 → L = "+f2(Lc)+" m y la resultante queda excéntrica e = "+f3(ecc)+" m (q máx = q·(1 + 6e/L))");
    chk(R,"Resultante en el centro de la zapata",false,"e = "+f3(ecc)+" m → mejor zapata trapezoidal o zapata con viga de equilibrio (strap)"); }
  S.r("B = ΣPs·(1 + 6e/L)/(qn·L) = "+f1(P1+P2)+(ecc>0?" × "+f3(qf):"")+" / ("+f1(qn)+" × "+f2(Lc)+") = "+f2(Bc)+" m");
  var wu=(Pu1+Pu2)/Lc; S.l("wu = ΣPu/L = "+f1(Pu1+Pu2)+" / "+f2(Lc)+" = "+f1(wu)+" kN/m (qu = "+f1(wu/Bc)+" kPa)");
  /* diagramas */
  var N=400, xs=[], V=[], M=[], x1=e1, x2=e1+s, Vmax=0, Mneg=0, Mpos=0, xm=0;
  for(var i=0;i<=N;i++){ var x=Lc*i/N, vv=wu*x-(x>=x1?Pu1:0)-(x>=x2?Pu2:0), mm=wu*x*x/2-(x>=x1?Pu1*(x-x1):0)-(x>=x2?Pu2*(x-x2):0); xs.push(x); V.push(vv); M.push(mm); if(mm<Mneg){ Mneg=mm; xm=x; } if(mm>Mpos) Mpos=mm; }
  S.h("2 · Cortantes y momentos a lo largo (viga invertida)");
  S.l("M⁻ máx (tracción arriba, entre columnas) = "+f1(-Mneg)+" kN·m en x = "+f2(xm)+" m · M⁺ máx (tracción abajo) = "+f1(Mpos)+" kN·m");
  var h=v.h*10, d=h-75-10, Vd=0; for(var k=0;k<=N;k++){ var x=xs[k]; var near=Math.min(Math.abs(x-x1),Math.abs(x-x2)); if(near>=(c1/2+d/1000)) Vd=Math.max(Vd,Math.abs(V[k])); }
  var pVc=.75*vcNoSt(fc,Bc*1000,d,.002)/1000;
  S.l("Cortante a d de las caras: Vu ≈ "+f1(Vd)+" kN · φVc (sin estribos) = "+f1(pVc)+" kN");
  chk(R,"Cortante en una dirección",Vd<=pVc,f1(Vd)+" ≤ "+f1(pVc)+" kN");
  var bo2=4*(c2*1000+d), Vp2=Pu2-wu/Bc*Math.pow(c2+d/1000,2), pVp2=.75*.33*lam_s(d)*Math.sqrt(fc)*bo2*d/1000;
  S.l("Punzonamiento col. 2: Vu ≈ Pu2 − qu·(c+d)² = "+f1(Vp2)+" kN · φVc = 0,75·0,33·λs·√f'c·bo·d = "+f1(pVp2)+" kN");
  chk(R,"Punzonamiento columna 2",Vp2<=pVp2,f1(Vp2)+" ≤ "+f1(pVp2)+" kN");
  var fT=flexD(-Mneg*1e6,Bc*1000,d,fc,fy), fB=flexD(Mpos*1e6,Bc*1000,d,fc,fy), Amn=.0018*Bc*1000*h, AT=Math.max(fT.As||0,Amn), AB=Math.max(fB.As||0,Amn);
  var mT=pickMesh(AT/Bc,Math.min(3*h,450),[12,14,16,18,20,22,25]), mB=pickMesh(AB/Bc,Math.min(3*h,450),[12,14,16,18,20,22,25]);
  S.h("3 · Flexión longitudinal"); S.l("As sup = "+f0(fT.As)+" mm² · As inf = "+f0(fB.As)+" mm² · mín 0,0018·B·h = "+f0(Amn)+" mm²");
  S.r("Superior "+meshTxt(mT)+" · inferior "+meshTxt(mB)+" (longitudinal) · transversal bajo cada columna en franja c + 1,5d");
  chk(R,"Flexión",fT.ok&&fB.ok,"sup "+meshTxt(mT)+" / inf "+meshTxt(mB));
  kp(R,"B × L",f2(Bc)+" × "+f2(Lc)+" m","h = "+f0(h/10)+" cm","rgba(var(--done-rgb),.6)"); kp(R,"M⁻ máx",f1(-Mneg)+" kN·m","sup. "+meshTxt(mT)); kp(R,"M⁺ máx",f1(Mpos)+" kN·m","inf. "+meshTxt(mB));
  row(R,"B×L",f2(Bc)+"×"+f2(Lc),"m"); row(R,"h",f0(h/10),"cm"); row(R,"Acero superior",meshTxt(mT)); row(R,"Acero inferior",meshTxt(mB));
  R.sum="Zapata combinada "+f2(Bc)+"×"+f2(Lc)+" m, h "+f0(h/10)+" cm";
  R.dib={t:"comb",B:Bc,L:Lc,x1:x1,x2:x2,c1:c1,c2:c2,xs:xs,V:V,M:M};
  return R;
}

/* ───────────── VIGA DE CIMENTACIÓN / RIOSTRA ───────────── */
function cRiostra(v){
  var R=Res(), S=R.S, fc=v.fc, fy=v.fy, b=v.b*10, h=v.h*10, Ln=v.L, T=.1*v.Pu, Ag=b*h;
  S.h("1 · Fuerza axial de amarre (NEC-SE-GC · ACI 318-19 18.13.3)");
  S.l("T = C = 0,10·Pu (columna más cargada) = 0,10 × "+f1(v.Pu)+" = "+f1(T)+" kN");
  S.n("ACI 318-19 18.13.3.1 usa 0,1·SDS·Pu; en Ecuador es práctica común 10 % de Pu (conservador para SDS ≤ 1).");
  var Ast=T*1000/(.9*fy); S.l("As (tracción) = T/(φ·fy) = "+f1(T)+"×10³ / (0,90 × "+f0(fy)+") = "+f0(Ast)+" mm²");
  var Mu=v.w>0?1.2*v.w*Ln*Ln/10:0, d=h-50-10-8, fm=flexD(Mu*1e6,b,d,fc,fy);
  if(Mu>0) S.l("Flexión por muro apoyado: Mu = 1,2·w·L²/10 = "+f2(Mu)+" kN·m → As = "+f0(fm.As)+" mm² por cara (mín "+f0(fm.Amin)+")");
  var Aface=Math.max(Ast/2+(Mu>0?fm.As:0),fm.Amin), o=pickBars(Aface,b,50,10,{min:12,max:25,nmax:5})[0], Atot=2*o.A;
  var pPn=.65*.8*(.85*fc*(Ag-Atot)+fy*Atot)/1000;
  S.r("Por cara: "+barTxt(o)+" ("+cm2(o.A)+") · total "+cm2(Atot));
  S.l("Compresión: φPn = 0,65·0,80·[0,85f'c(Ag − As) + fy·As] = "+f0(pPn)+" kN ≥ C = "+f1(T)+" kN");
  var dmin=Math.min(450,Ln*1000/20), sE=Math.floor(Math.min(b/2,300)/10)*10;
  S.h("2 · Geometría y estribos (ACI 18.13.3.2)"); S.l("Menor dimensión ≥ ln/20 = "+f0(Ln*1000/20)+" mm (no necesita > 450 mm) · estribos cerrados s ≤ mín(b/2 ; 300 mm) = "+f0(sE)+" mm");
  chk(R,"Dimensión mínima ≥ ln/20",Math.min(b,h)>=dmin,f0(Math.min(b,h)/10)+" ≥ "+f1(dmin/10)+" cm"); chk(R,"Compresión φPn ≥ C",pPn>=T,f0(pPn)+" ≥ "+f1(T)+" kN"); chk(R,"Barras caben",o.fit,barTxt(o)+" en "+f0(v.b)+" cm");
  kp(R,"Sección",f0(v.b)+" × "+f0(v.h)+" cm","ln = "+f2(Ln)+" m"); kp(R,"Refuerzo",barTxt(o)+" arriba y abajo",cm2(Atot)+" total","rgba(var(--done-rgb),.6)"); kp(R,"Estribos","Ø10 @ "+f0(sE/10)+" cm","cerrados");
  row(R,"Sección",f0(v.b)+"×"+f0(v.h),"cm"); row(R,"T=C",f1(T),"kN"); row(R,"Refuerzo",barTxt(o)+" sup. + inf."); row(R,"Estribos","Ø10 @"+f0(sE/10),"cm");
  R.sum="Riostra "+f0(v.b)+"×"+f0(v.h)+" cm, "+barTxt(o)+" sup.+inf., Ø10@"+f0(sE/10)+" cm";
  R.dib={t:"viga",b:v.b,h:v.h,rec:5,de:10,bot:o,top:o,L:Ln,lo:0,sCon:sE,sCen:sE,ap:"s"};
  return R;
}

/* ───────────── ACERO ESTRUCTURAL ───────────── */
/* Catálogo: [nombre, d, bf, tw, tf, r] mm — perfiles europeos IPE/HEA (EN 10365) y W (AISC) · propiedades calculadas */
var PERF=[["IPE 100",100,55,4.1,5.7,7],["IPE 120",120,64,4.4,6.3,7],["IPE 140",140,73,4.7,6.9,7],["IPE 160",160,82,5,7.4,9],["IPE 180",180,91,5.3,8,9],["IPE 200",200,100,5.6,8.5,12],["IPE 220",220,110,5.9,9.2,12],["IPE 240",240,120,6.2,9.8,15],["IPE 270",270,135,6.6,10.2,15],["IPE 300",300,150,7.1,10.7,15],["IPE 330",330,160,7.5,11.5,18],["IPE 360",360,170,8,12.7,18],["IPE 400",400,180,8.6,13.5,21],["IPE 450",450,190,9.4,14.6,21],["IPE 500",500,200,10.2,16,21],["IPE 550",550,210,11.1,17.2,24],["IPE 600",600,220,12,19,24],
 ["HEA 100",96,100,5,8,12],["HEA 120",114,120,5,8,12],["HEA 140",133,140,5.5,8.5,12],["HEA 160",152,160,6,9,15],["HEA 180",171,180,6,9.5,15],["HEA 200",190,200,6.5,10,18],["HEA 220",210,220,7,11,18],["HEA 240",230,240,7.5,12,21],["HEA 260",250,260,7.5,12.5,24],["HEA 280",270,280,8,13,24],["HEA 300",290,300,8.5,14,27],["HEA 320",310,300,9,15.5,27],["HEA 340",330,300,9.5,16.5,27],["HEA 360",350,300,10,17.5,27],["HEA 400",390,300,11,19,27],["HEA 450",440,300,11.5,21,27],["HEA 500",490,300,12,23,27],
 ["W8×31",203,203,7.2,11,10],["W10×49",254,254,8.6,14.2,13],["W12×26",310,165,5.8,9.7,10],["W12×50",310,205,9.4,16.3,13],["W14×30",351,171,6.9,9.8,10],["W16×31",403,140,7,11.2,10],["W18×35",450,152,7.6,10.8,10],["W21×44",526,165,8.9,11.4,13],["W24×55",599,178,10,12.8,13]];
function sec(p){
  var d=p[1], bf=p[2], tw=p[3], tf=p[4], r=p[5], hw=d-2*tf, Af=(4-Math.PI)*r*r; /* 4 acuerdos */
  var A=2*bf*tf+hw*tw+Af, yr=d/2-tf-(10-3*Math.PI)/(12-3*Math.PI)*r;
  var Ix=(bf*Math.pow(d,3)-(bf-tw)*Math.pow(hw,3))/12+Af*yr*yr, Iy=2*tf*Math.pow(bf,3)/12+hw*Math.pow(tw,3)/12+Af*Math.pow(tw/2+.223*r,2);
  var Zx=bf*tf*(d-tf)+tw*hw*hw/4+Af*yr, Sx=Ix/(d/2), ry=Math.sqrt(Iy/A), rx=Math.sqrt(Ix/A), J=(2*bf*Math.pow(tf,3)+(d-tf)*Math.pow(tw,3))/3, ho=d-tf, Cw=Iy*ho*ho/4, rts=Math.sqrt(Math.sqrt(Iy*Cw)/Sx);
  return {n:p[0],d:d,bf:bf,tw:tw,tf:tf,r:r,hw:hw,A:A,Ix:Ix,Iy:Iy,Zx:Zx,Sx:Sx,rx:rx,ry:ry,J:J,ho:ho,Cw:Cw,rts:rts,kg:A*7850/1e6};
}
function aVigaChk(s,v){
  var Fy=v.Fy, Es=200000, L=v.L*1000, wu=Math.max(1.4*v.wD,1.2*v.wD+1.6*v.wL)+1.2*s.kg*9.81/1000, Mu=wu*L*L/8/1e6, Vu=wu*L/2/1000;
  var lf=s.bf/(2*s.tf), lp=.38*Math.sqrt(Es/Fy), lr=Math.sqrt(Es/Fy), Mp=Fy*s.Zx, Lb=v.Lb*1000, Lp=1.76*s.ry*Math.sqrt(Es/Fy), Jc=s.J/(s.Sx*s.ho);
  var Lr=1.95*s.rts*Es/(.7*Fy)*Math.sqrt(Jc+Math.sqrt(Jc*Jc+6.76*Math.pow(.7*Fy/Es,2))), Mn, modo;
  if(Lb<=Lp){ Mn=Mp; modo="fluencia (Lb ≤ Lp)"; }
  else if(Lb<=Lr){ Mn=Math.min(Mp,v.Cb*(Mp-(Mp-.7*Fy*s.Sx)*(Lb-Lp)/(Lr-Lp))); modo="pandeo lateral-torsional inelástico"; }
  else { var Fcr=v.Cb*Math.PI*Math.PI*Es/Math.pow(Lb/s.rts,2)*Math.sqrt(1+.078*Jc*Math.pow(Lb/s.rts,2)); Mn=Math.min(Mp,Fcr*s.Sx); modo="pandeo lateral-torsional elástico"; }
  if(lf>lp){ var kc=clamp(4/Math.sqrt(s.hw/s.tw),.35,.76), Mfl=lf<=lr?Mp-(Mp-.7*Fy*s.Sx)*(lf-lp)/(lr-lp):.9*Es*kc*s.Sx/(lf*lf); if(Mfl<Mn){ Mn=Mfl; modo="pandeo local del ala (no compacta)"; } }
  var pMn=.9*Mn/1e6, hwt=s.hw/s.tw, Cv=1, phv=1; if(hwt>2.24*Math.sqrt(Es/Fy)){ phv=.9; var kv=5.34; Cv=hwt<=1.1*Math.sqrt(kv*Es/Fy)?1:1.1*Math.sqrt(kv*Es/Fy)/hwt; }
  var pVn=phv*.6*Fy*s.d*s.tw*Cv/1000, ws=v.wD+v.wL+s.kg*9.81/1000, DL=5*v.wL*Math.pow(L,4)/(384*Es*s.Ix), DT=5*ws*Math.pow(L,4)/(384*Es*s.Ix);
  return {wu:wu,Mu:Mu,Vu:Vu,lf:lf,lp:lp,lr:lr,Mp:Mp,Lp:Lp,Lr:Lr,Lb:Lb,Mn:Mn,modo:modo,pMn:pMn,pVn:pVn,phv:phv,Cv:Cv,DL:DL,DT:DT,ok:pMn>=Mu&&pVn>=Vu&&DL<=L/360&&DT<=L/240};
}
function cAViga(v){
  var R=Res(), S=R.S, fam=v.fam, list=PERF.filter(function(p){ return p[0].indexOf(fam)===0; }).map(sec);
  var s=list.filter(function(x){return x.n===v.perf;})[0]; if(!s){ s=list.filter(function(x){ return aVigaChk(x,v).ok; }).sort(function(a,b){return a.kg-b.kg;})[0]||list[list.length-1]; }
  var c=aVigaChk(s,v), lig=list.filter(function(x){ return aVigaChk(x,v).ok; }).sort(function(a,b){return a.kg-b.kg;})[0];
  S.h("Datos"); S.l("Perfil "+s.n+" · acero "+(v.Fy>=345?"A572 Gr 50 (Fy 345 MPa)":"A36 (Fy 250 MPa)")+" · E = 200 000 MPa · L = "+f2(v.L)+" m simplemente apoyada · Lb = "+f2(v.Lb)+" m · Cb = "+f2(v.Cb));
  S.l("Propiedades (calculadas de la geometría con acuerdos): A = "+f1(s.A/100)+" cm² · Ix = "+f0(s.Ix/1e4)+" cm⁴ · Zx = "+f0(s.Zx/1e3)+" cm³ · Sx = "+f0(s.Sx/1e3)+" cm³ · ry = "+f1(s.ry/10)+" cm · "+f1(s.kg)+" kg/m");
  S.h("1 · Cargas"); S.r("wu = máx(1,4D ; 1,2D + 1,6L) + 1,2·pp = "+f2(c.wu)+" kN/m → Mu = wu·L²/8 = "+f2(c.Mu)+" kN·m · Vu = "+f2(c.Vu)+" kN");
  S.h("2 · Flexión (AISC 360-16 cap. F2–F3 · NEC-SE-AC)");
  S.l("Ala: λ = bf/2tf = "+f2(c.lf)+" · λp = 0,38√(E/Fy) = "+f2(c.lp)+" → "+(c.lf<=c.lp?"compacta":"no compacta"));
  S.l("Mp = Fy·Zx = "+f2(c.Mp/1e6)+" kN·m · Lp = 1,76·ry·√(E/Fy) = "+f2(c.Lp/1000)+" m · Lr = "+f2(c.Lr/1000)+" m");
  S.r("Mn = "+f2(c.Mn/1e6)+" kN·m ("+c.modo+") · φMn = 0,90·Mn = "+f2(c.pMn)+" kN·m "+(c.pMn>=c.Mu?"≥":"<")+" Mu");
  S.h("3 · Cortante (AISC G2)"); S.l("h/tw = "+f1(s.hw/s.tw)+" · Cv1 = "+f2(c.Cv)+" · φv = "+f2(c.phv)+" → φVn = φ·0,6·Fy·d·tw·Cv1 = "+f1(c.pVn)+" kN");
  S.h("4 · Deflexión (servicio)"); S.l("ΔL = 5·wL·L⁴/(384·E·Ix) = "+f1(c.DL)+" mm (límite L/360 = "+f1(v.L*1000/360)+") · Δ(D+L) = "+f1(c.DT)+" mm (L/240 = "+f1(v.L*1000/240)+")");
  chk(R,"Flexión φMn ≥ Mu",c.pMn>=c.Mu,f1(c.pMn)+" ≥ "+f1(c.Mu)+" kN·m"); chk(R,"Cortante φVn ≥ Vu",c.pVn>=c.Vu,f1(c.pVn)+" ≥ "+f1(c.Vu)+" kN");
  chk(R,"ΔL ≤ L/360",c.DL<=v.L*1000/360,f1(c.DL)+" mm"); chk(R,"Δ total ≤ L/240",c.DT<=v.L*1000/240,f1(c.DT)+" mm");
  if(lig) S.n("Perfil más liviano de la familia "+fam+" que cumple: "+lig.n+" ("+f1(lig.kg)+" kg/m).");
  kp(R,"Perfil",s.n,f1(s.kg)+" kg/m","rgba(var(--done-rgb),.6)"); kp(R,"Uso flexión",f0(c.Mu/c.pMn*100)+" %","φMn "+f1(c.pMn)+" kN·m"); kp(R,"Deflexión",f1(c.DT)+" mm","L/"+f0(v.L*1000/Math.max(c.DT,.01)));
  if(lig) kp(R,"Sugerido",lig.n,"el más liviano que cumple");
  row(R,"Perfil",s.n); row(R,"L",f2(v.L),"m"); row(R,"Mu",f2(c.Mu),"kN·m"); row(R,"φMn",f2(c.pMn),"kN·m"); row(R,"Vu",f2(c.Vu),"kN"); row(R,"φVn",f1(c.pVn),"kN"); row(R,"Δ total",f1(c.DT),"mm");
  R.sum="Viga de acero "+s.n+" L = "+f2(v.L)+" m, uso "+f0(c.Mu/c.pMn*100)+" %"; R.dib={t:"perf",s:s}; R.perf=s.n; R.lig=lig&&lig.n;
  return R;
}
function aColChk(s,v){ var Es=200000, Fy=v.Fy, KL=v.k*v.L*1000, sx=KL/s.rx, sy=KL/s.ry, sl=Math.max(sx,sy), Fe=Math.PI*Math.PI*Es/(sl*sl), lim=4.71*Math.sqrt(Es/Fy);
  var Fcr=sl<=lim?Math.pow(.658,Fy/Fe)*Fy:.877*Fe, pPn=.9*Fcr*s.A/1000, lfl=s.bf/(2*s.tf), lw=s.hw/s.tw, slender=lfl>.56*Math.sqrt(Es/Fy)||lw>1.49*Math.sqrt(Es/Fy);
  return {KL:KL,sx:sx,sy:sy,sl:sl,Fe:Fe,lim:lim,Fcr:Fcr,pPn:pPn,lfl:lfl,lw:lw,slender:slender,ok:pPn>=v.Pu&&sl<=200&&!slender}; }
function cACol(v){
  var R=Res(), S=R.S, list=PERF.filter(function(p){ return p[0].indexOf(v.fam)===0; }).map(sec);
  var s=list.filter(function(x){return x.n===v.perf;})[0]; if(!s) s=list.filter(function(x){ return aColChk(x,v).ok; }).sort(function(a,b){return a.kg-b.kg;})[0]||list[list.length-1];
  var c=aColChk(s,v), lig=list.filter(function(x){ return aColChk(x,v).ok; }).sort(function(a,b){return a.kg-b.kg;})[0];
  S.h("Datos"); S.l("Perfil "+s.n+" · Fy = "+f0(v.Fy)+" MPa · Pu = "+f1(v.Pu)+" kN · L = "+f2(v.L)+" m · K = "+f2(v.k));
  S.l("A = "+f1(s.A/100)+" cm² · rx = "+f1(s.rx/10)+" cm · ry = "+f1(s.ry/10)+" cm");
  S.h("1 · Esbeltez local (AISC Tabla B4.1a)"); S.l("bf/2tf = "+f2(c.lfl)+" ≤ 0,56√(E/Fy) = "+f2(.56*Math.sqrt(2e5/v.Fy))+" · h/tw = "+f1(c.lw)+" ≤ 1,49√(E/Fy) = "+f1(1.49*Math.sqrt(2e5/v.Fy)));
  S.h("2 · Pandeo por flexión (AISC E3)"); S.l("KL/rx = "+f1(c.sx)+" · KL/ry = "+f1(c.sy)+" → gobierna "+f1(c.sl)+" (≤ 200)");
  S.l("Fe = π²E/(KL/r)² = "+f1(c.Fe)+" MPa · límite 4,71√(E/Fy) = "+f1(c.lim));
  S.l("Fcr = "+(c.sl<=c.lim?"0,658^(Fy/Fe)·Fy":"0,877·Fe")+" = "+f1(c.Fcr)+" MPa");
  S.r("φPn = 0,90·Fcr·Ag = "+f1(c.pPn)+" kN "+(c.pPn>=v.Pu?"≥":"<")+" Pu = "+f1(v.Pu)+" kN");
  chk(R,"Sección no esbelta",!c.slender,"ala "+f1(c.lfl)+" · alma "+f1(c.lw)); chk(R,"KL/r ≤ 200",c.sl<=200,f1(c.sl)); chk(R,"φPn ≥ Pu",c.pPn>=v.Pu,f1(c.pPn)+" ≥ "+f1(v.Pu)+" kN");
  if(lig) S.n("Más liviano que cumple en "+v.fam+": "+lig.n+" ("+f1(lig.kg)+" kg/m). Para sismo NEC-SE-AC exige además secciones sísmicamente compactas (AISC 341) y revisión flexo-compresión (H1).");
  kp(R,"Perfil",s.n,f1(s.kg)+" kg/m","rgba(var(--done-rgb),.6)"); kp(R,"φPn",f0(c.pPn)+" kN","uso "+f0(v.Pu/c.pPn*100)+" %"); kp(R,"KL/r",f1(c.sl),"Fcr "+f0(c.Fcr)+" MPa"); if(lig) kp(R,"Sugerido",lig.n);
  row(R,"Perfil",s.n); row(R,"Pu",f1(v.Pu),"kN"); row(R,"KL/r",f1(c.sl)); row(R,"φPn",f1(c.pPn),"kN");
  R.sum="Columna de acero "+s.n+", φPn "+f0(c.pPn)+" kN, uso "+f0(v.Pu/c.pPn*100)+" %"; R.dib={t:"perf",s:s}; R.perf=s.n; R.lig=lig&&lig.n;
  return R;
}

/* ───────────── MADERA Y GUADÚA (esfuerzos admisibles) ───────────── */
/* NEC-SE-MD (grupos estructurales andinos A, B, C · kg/cm²) y NEC-SE-GUADÚA (MPa, CH 12 %) */
var MADG={A:{n:"Grupo A (alta densidad)",fm:210,fv:15,E:95000,Ep:130000},B:{n:"Grupo B",fm:150,fv:12,E:75000,Ep:100000},C:{n:"Grupo C",fm:100,fv:8,E:55000,Ep:90000}};
var GUA={Fb:15,Fv:1.2,Fc:14,Ft:19,E05:12000,E005:7500,Emin:4000};
function cMad(v){
  var R=Res(), S=R.S, L=v.L*1000, w=v.wD+v.wL, M=w*L*L/8, V=w*L/2, fb, fv, Fb, Fv, I, Sx, E, A, lim=v.cr?300:250;
  S.h("Datos");
  if(v.mat==="g"){
    var De=v.De*10, t=v.t*10, Di=De-2*t, n=Math.max(1,v.n|0), CD=v.CD;
    A=n*Math.PI/4*(De*De-Di*Di); I=n*Math.PI/64*(Math.pow(De,4)-Math.pow(Di,4)); Sx=I/(De/2); E=GUA.E05; Fb=GUA.Fb*CD; Fv=GUA.Fv*CD;
    S.l("Guadúa angustifolia Kunth (NEC-SE-GUADÚA): "+n+" culmo(s) De = "+f1(v.De)+" cm, t = "+f1(v.t)+" cm · L = "+f2(v.L)+" m · w (servicio) = "+f2(w)+" kN/m");
    S.l("Esfuerzos admisibles (CH 12 %): Fb = 15 · Fv = 1,2 · Fc = 14 · Ft = 19 MPa · E0,5 = 12 000 MPa · CD = "+f2(CD));
    S.h("1 · Propiedades"); S.l("A = n·π/4·(De² − Di²) = "+f0(A)+" mm² · I = n·π/64·(De⁴ − Di⁴) = "+f0(I/1e4)+" cm⁴ · S = I/(De/2) = "+f0(Sx/1e3)+" cm³");
    S.n("Culmos sin unión rígida entre sí: la inercia se suma (no hay acción compuesta). Con pernos y conectores la inercia aumenta — consultar NEC-SE-GUADÚA cap. 4.");
    fb=M/Sx; fv=3*V/(2*A)*(3*De*De-4*De*t+4*t*t)/(De*De);
    S.h("2 · Esfuerzos de trabajo"); S.l("M = w·L²/8 = "+f2(M/1e6)+" kN·m → fb = M/S = "+f2(fb)+" MPa vs F'b = "+f2(Fb)+" MPa");
    S.l("V = w·L/2 = "+f2(V/1000)+" kN → fv = (3V/2A)·(3De² − 4De·t + 4t²)/De² = "+f3(fv)+" MPa vs F'v = "+f2(Fv)+" MPa");
    S.n("Apoyos: rellenar los entrenudos de apoyo con mortero (cuello) para evitar aplastamiento; proteger de humedad y rayos UV (por diseño: aleros y sobrecimiento).");
    row(R,"Elemento",n+" culmo(s) De "+f1(v.De)+" cm, t "+f1(v.t)+" cm");
  } else {
    var g=MADG[v.grp]||MADG.B, b=v.b*10, h=v.h*10;
    A=b*h; I=b*h*h*h/12; Sx=b*h*h/6; E=g.E*KGMPA; Fb=g.fm*KGMPA; Fv=g.fv*KGMPA;
    S.l("Madera aserrada "+g.n+" (NEC-SE-MD / Manual Andino PADT-REFORT): sección "+f1(v.b)+" × "+f1(v.h)+" cm · L = "+f2(v.L)+" m");
    S.l("fm = "+g.fm+" kg/cm² ("+f2(Fb)+" MPa) · fv = "+g.fv+" kg/cm² ("+f2(Fv)+" MPa) · Emín = "+f0(g.E)+" kg/cm² ("+f0(E)+" MPa)");
    fb=M/Sx; fv=1.5*V*(1-2*h/L)/A;
    S.h("1 · Esfuerzos de trabajo"); S.l("M = w·L²/8 = "+f2(M/1e6)+" kN·m · S = b·h²/6 = "+f0(Sx/1e3)+" cm³ → fb = "+f2(fb)+" MPa vs fm = "+f2(Fb)+" MPa");
    S.l("V a h del apoyo ≈ w·(L/2 − h) → fv = 1,5·V/(b·h) = "+f3(fv)+" MPa vs "+f2(Fv)+" MPa");
    row(R,"Elemento","madera "+v.grp+" "+f1(v.b)+"×"+f1(v.h)+" cm");
  }
  var D=5*w*Math.pow(L,4)/(384*E*I), Dlim=L/lim, DL=D*v.wL/w;
  S.h("Deflexión"); S.l("Δ = 5·w·L⁴/(384·E·I) = "+f1(D)+" mm · límite L/"+lim+" = "+f1(Dlim)+" mm"+(v.mat==="g"?"":" (madera: incluir flujo plástico ×1,8 en carga permanente → Δ ≈ "+f1(D+.8*(D-DL))+" mm)"));
  var Dd=v.mat==="g"?D:D+.8*(D-DL);
  chk(R,"Flexión fb ≤ F'b",fb<=Fb,f2(fb)+" ≤ "+f2(Fb)+" MPa"); chk(R,"Cortante fv ≤ F'v",fv<=Fv,f3(fv)+" ≤ "+f2(Fv)+" MPa"); chk(R,"Deflexión ≤ L/"+lim,Dd<=Dlim,f1(Dd)+" ≤ "+f1(Dlim)+" mm");
  kp(R,"fb / F'b",f0(fb/Fb*100)+" %",f2(fb)+" MPa",fb<=Fb?"rgba(var(--done-rgb),.6)":"var(--warn)"); kp(R,"fv / F'v",f0(fv/Fv*100)+" %"); kp(R,"Deflexión",f1(Dd)+" mm","L/"+f0(L/Math.max(Dd,.01)));
  row(R,"L",f2(v.L),"m"); row(R,"fb",f2(fb),"MPa"); row(R,"fv",f3(fv),"MPa"); row(R,"Δ",f1(Dd),"mm");
  R.sum=(v.mat==="g"?"Viga de guadúa "+(v.n|0)+" culmo(s) Ø"+f1(v.De)+" cm":"Viga de madera "+f1(v.b)+"×"+f1(v.h)+" cm")+", L = "+f2(v.L)+" m";
  R.dib={t:"mad",g:v.mat==="g",De:v.De,tt:v.t,n:v.n|0,b:v.b,h:v.h};
  return R;
}

/* ───────────── ESCALERA (losa inclinada) ───────────── */
function cEsc(v){
  var R=Res(), S=R.S, fc=v.fc, fy=v.fy, Lh=v.Lh, H=v.H, al=Math.atan(H/Lh), Li=Math.sqrt(Lh*Lh+H*H), ch=v.ch, n=Math.round(H*100/ch), chr=H*100/n, hu=Lh*100/Math.max(1,n-1);
  var den=v.ap==="s"?20:24, t=v.t>0?v.t:Math.max(12,Math.ceil(Li*100/den));
  S.h("1 · Geometría"); S.l("Proyección horizontal Lh = "+f2(Lh)+" m · desnivel = "+f2(H)+" m · α = atan(H/Lh) = "+f1(al*180/Math.PI)+"° · longitud inclinada = "+f2(Li)+" m");
  S.l(n+" contrahuellas de "+f1(chr)+" cm · huellas ≈ "+f1(hu)+" cm · Blondel 2CH + H = "+f1(2*chr+hu)+" cm (61–65 · NTE INEN 2249)");
  S.l("Garganta t ≥ L/"+den+" = "+f1(Li*100/den)+" cm → t = "+f0(t)+" cm");
  var D=24*t/100/Math.cos(al)+24*chr/100/2+v.ac, wu=Math.max(1.4*D,1.2*D+1.6*v.L);
  S.h("2 · Cargas por m² en proyección horizontal"); S.l("pp garganta = 24·t/cos α = "+f2(24*t/100/Math.cos(al))+" · peldaños = 24·CH/2 = "+f2(24*chr/200)+" · acabados = "+f2(v.ac)+" → D = "+f2(D)+" kN/m²");
  S.r("L = "+f2(v.L)+" kN/m² (NEC-SE-CG escaleras 4,8) → wu = "+f2(wu)+" kN/m²");
  var cM=v.ap==="s"?1/8:1/10, Mu=cM*wu*Lh*Lh, d=t*10-25-6, f=flexD(Mu*1e6,1000,d,fc,fy), As=Math.max(f.As||0,.0018*1000*t*10), me=pickMesh(As,Math.min(3*t*10,450),[10,12,14,16]), mt=pickMesh(.0018*1000*t*10,Math.min(5*t*10,450),[8,10]);
  S.h("3 · Flexión por metro de ancho"); S.l("Mu = wu·Lh²·"+(v.ap==="s"?"1/8":"1/10")+" = "+f2(Mu)+" kN·m/m · d = "+f0(d)+" mm · As = "+f0(f.As)+" mm²/m (mín 0,0018·b·t = "+f0(.0018*1000*t*10)+")");
  S.r("Longitudinal "+meshTxt(me)+" · transversal (repartición) "+meshTxt(mt)+(v.ap!=="s"?" · negativo en apoyos ≈ 1/3 del positivo, mín. "+meshTxt(mt):""));
  var Vu=wu*Lh/2*Math.cos(al), pVc=.75*vcNoSt(fc,1000,d,me.A/(1000*d))/1000;
  S.l("Vu ≈ wu·Lh/2·cos α = "+f2(Vu)+" kN/m · φVc = "+f2(pVc)+" kN/m");
  chk(R,"Flexión",f.ok,meshTxt(me)); chk(R,"Cortante",Vu<=pVc,f2(Vu)+" ≤ "+f2(pVc)); chk(R,"Blondel 61–65 cm",2*chr+hu>=61&&2*chr+hu<=65,f1(2*chr+hu)+" cm"); chk(R,"Contrahuella ≤ 18 cm",chr<=18,f1(chr)+" cm");
  kp(R,"Garganta",f0(t)+" cm","α "+f1(al*180/Math.PI)+"°"); kp(R,"Acero principal",meshTxt(me),"",f.ok?"rgba(var(--done-rgb),.6)":"var(--warn)"); kp(R,"Peldaños",n+" × "+f1(chr)+" cm","huella "+f1(hu)+" cm");
  row(R,"Garganta",f0(t),"cm"); row(R,"wu",f2(wu),"kN/m²"); row(R,"Mu",f2(Mu),"kN·m/m"); row(R,"Acero principal",meshTxt(me)); row(R,"Repartición",meshTxt(mt));
  R.sum="Escalera t = "+f0(t)+" cm, "+meshTxt(me)+" long., "+meshTxt(mt)+" transv.";
  R.dib={t:"esc",n:n,ch:chr,hu:hu,tt:t,Lh:Lh,H:H};
  return R;
}

/* ───────────── MURO DE CONTENCIÓN EN VOLADIZO ───────────── */
function cMuro(v){
  var R=Res(), S=R.S, H=v.H, g=v.g, ph=v.phi*Math.PI/180, Ka=Math.pow(Math.tan(Math.PI/4-ph/2),2), q=v.q, B=v.B, tz=v.tz, tt=v.tt, tb=v.tb, toe=v.toe, heel=B-toe-tb, Hs=H-tz;
  S.h("1 · Empuje activo de Rankine"); S.l("Ka = tan²(45° − φ/2) = tan²(45 − "+f1(v.phi)+"/2) = "+f3(Ka));
  var E1=.5*Ka*g*H*H, E2=Ka*q*H, EH=E1+E2, Mo=E1*H/3+E2*H/2;
  S.l("Ea = ½·Ka·γ·H² = "+f2(E1)+" kN/m (a H/3) · sobrecarga Ka·q·H = "+f2(E2)+" kN/m (a H/2) → ΣH = "+f2(EH)+" kN/m");
  S.l("Momento de volteo Mo = "+f2(Mo)+" kN·m/m");
  if(heel<=0){ chk(R,"Geometría",false,"el talón resulta negativo: aumentar B"); return R; }
  var W=[["Pantalla rect.",tt*Hs*24,toe+tb-tt/2],["Pantalla triang.",.5*(tb-tt)*Hs*24,toe+(tb-tt)*2/3],["Base",B*tz*24,B/2],["Suelo sobre talón",heel*Hs*g,toe+tb+heel/2]];
  var SV=0, Mr=0; W.forEach(function(w){ SV+=w[1]; Mr+=w[1]*w[2]; });
  S.h("2 · Fuerzas estabilizantes (por metro)"); W.forEach(function(w){ S.l(w[0]+": "+f2(w[1])+" kN × "+f2(w[2])+" m = "+f2(w[1]*w[2])+" kN·m"); });
  S.l("ΣV = "+f2(SV)+" kN/m · Mr = "+f2(Mr)+" kN·m/m (sobrecarga sobre el talón no se cuenta como estabilizante)");
  var FSv=Mr/Mo, FSd=v.mu*SV/EH, e=B/2-(Mr-Mo)/SV, qmax=SV/B*(1+6*e/B), qmin=SV/B*(1-6*e/B), qa=v.qa*98.0665;
  S.h("3 · Estabilidad (NEC-SE-GC)"); S.l("FS volteo = Mr/Mo = "+f2(FSv)+" (≥ 2,0) · FS deslizamiento = μ·ΣV/ΣH = "+f2(v.mu)+"×"+f2(SV)+"/"+f2(EH)+" = "+f2(FSd)+" (≥ 1,5)");
  S.l("e = B/2 − (Mr − Mo)/ΣV = "+f3(e)+" m (≤ B/6 = "+f3(B/6)+") · q = ΣV/B·(1 ± 6e/B) = "+f1(qmax)+" / "+f1(qmin)+" kPa vs qadm "+f1(qa)+" kPa");
  chk(R,"FS volteo ≥ 2,0",FSv>=2,f2(FSv)); chk(R,"FS deslizamiento ≥ 1,5",FSd>=1.5,f2(FSd)+(FSd<1.5?" → añadir dentellón (llave de corte)":"")); chk(R,"e ≤ B/6",Math.abs(e)<=B/6,f3(e)+" m"); chk(R,"q máx ≤ qadm",qmax<=qa,f1(qmax)+" ≤ "+f1(qa)+" kPa");
  var Mu=1.6*(Ka*g*Math.pow(Hs,3)/6+Ka*q*Hs*Hs/2), Vu=1.6*(Ka*g*Hs*Hs/2+Ka*q*Hs), d=tb*1000-50-8, f=flexD(Mu*1e6,1000,d,v.fc,v.fy), As=Math.max(f.As||0,.0015*1000*tb*1000), me=pickMesh(As,450,[10,12,14,16,18,20]), pVc=.75*vcNoSt(v.fc,1000,d,me.A/(1000*d))/1000;
  S.h("4 · Pantalla (base, por metro · ACI 318-19 cap. 11)"); S.l("Mu = 1,6·(Ka·γ·h³/6 + Ka·q·h²/2) = "+f2(Mu)+" kN·m/m · d = "+f0(d)+" mm · As = "+f0(f.As)+" mm²/m");
  S.r("Cara en contacto con el suelo: "+meshTxt(me)+" vertical · Vu = "+f2(Vu)+" kN/m vs φVc = "+f2(pVc)+" kN/m");
  S.n("Revisar también la condición sísmica pseudoestática (Mononobe–Okabe, kh ≈ 0,5·Z·Fa) exigida por NEC-SE-GC, drenaje (lloraderos + filtro) y flexión de punta y talón.");
  chk(R,"Pantalla flexión",f.ok,meshTxt(me)); chk(R,"Pantalla cortante",Vu<=pVc,f2(Vu)+" ≤ "+f2(pVc));
  kp(R,"FS volteo",f2(FSv),"≥ 2,0",FSv>=2?"rgba(var(--done-rgb),.6)":"var(--warn)"); kp(R,"FS desliz.",f2(FSd),"≥ 1,5",FSd>=1.5?"rgba(var(--done-rgb),.6)":"var(--warn)"); kp(R,"q máx",f1(qmax)+" kPa",f2(qmax/98.0665)+" kg/cm²"); kp(R,"Pantalla",meshTxt(me));
  row(R,"H",f2(H),"m"); row(R,"B",f2(B),"m"); row(R,"FS volteo",f2(FSv)); row(R,"FS deslizamiento",f2(FSd)); row(R,"q máx",f1(qmax),"kPa"); row(R,"Acero pantalla",meshTxt(me));
  R.sum="Muro en voladizo H = "+f2(H)+" m, B = "+f2(B)+" m, FSv "+f2(FSv)+", FSd "+f2(FSd);
  R.dib={t:"muro",H:H,B:B,tz:tz,tt:tt,tb:tb,toe:toe};
  return R;
}

/* ───────────── dibujos de resultados (SVG) ───────────── */
function dibRes(P,R){
  var d=R.dib; if(!d) return "";
  var A="#38E1FF", G="#B6FF3C", Y="#FFC24B", s="";
  function svg(w,h,inner,lab,mw){ return '<svg class="'+P+'-svg" viewBox="0 0 '+w+' '+h+'" style="max-width:'+(mw||w)+'px" role="img" aria-label="'+lab+'">'+inner+'</svg>'; }
  function bars(cx,cy,n,db,w,sc){ var o=""; for(var i=0;i<n;i++){ var x=n>1?cx-w/2+i*w/(n-1):cx; o+='<circle cx="'+x.toFixed(1)+'" cy="'+cy.toFixed(1)+'" r="'+Math.max(2.4,db/2*sc).toFixed(1)+'" fill="'+G+'" style="filter:drop-shadow(0 0 3px '+G+')"/>'; } return o; }
  if(d.t==="viga"){
    var sc=Math.min(180/d.h,150/d.b)/10, bw=d.b*10*sc, bh=d.h*10*sc, x0=40, y0=20, r=(d.rec*10+d.de/2)*sc;
    var g='<rect x="'+x0+'" y="'+y0+'" width="'+bw+'" height="'+bh+'" fill="rgba(56,225,255,.14)" stroke="'+A+'" stroke-width="1.5"/><rect x="'+(x0+r)+'" y="'+(y0+r)+'" width="'+(bw-2*r)+'" height="'+(bh-2*r)+'" rx="4" fill="none" stroke="'+Y+'" stroke-width="1.6"/>';
    var cc=(d.rec*10+d.de)*sc;
    if(d.bot) g+=bars(x0+bw/2,y0+bh-cc-d.bot.db/2*sc,d.bot.n,d.bot.db,bw-2*cc-d.bot.db*sc,sc);
    if(d.top) g+=bars(x0+bw/2,y0+cc+d.top.db/2*sc,d.top.n,d.top.db,bw-2*cc-d.top.db*sc,sc);
    g+='<text x="'+(x0+bw/2)+'" y="'+(y0+bh+16)+'" font-size="10" text-anchor="middle" fill="'+A+'">'+f0(d.b)+' cm</text><text x="'+(x0-6)+'" y="'+(y0+bh/2)+'" font-size="10" text-anchor="end" fill="'+A+'">'+f0(d.h)+'</text>';
    g+='<text x="'+(x0+bw+8)+'" y="'+(y0+12)+'" font-size="9.5" fill="'+G+'">'+(d.top?barTxt(d.top):"")+'</text><text x="'+(x0+bw+8)+'" y="'+(y0+bh-4)+'" font-size="9.5" fill="'+G+'">'+(d.bot?barTxt(d.bot):"")+'</text><text x="'+(x0+bw+8)+'" y="'+(y0+bh/2+3)+'" font-size="9.5" fill="'+Y+'">E Ø'+d.de+'</text>';
    s+=svg(300,bh+40,g,"Sección de viga armada",300);
    /* elevación */
    var W=620, ex0=30, ew=W-60, eh=56, ey=30, k=ew/(d.L*1000), e='<rect x="'+ex0+'" y="'+ey+'" width="'+ew+'" height="'+eh+'" fill="rgba(56,225,255,.08)" stroke="'+A+'"/>';
    e+='<line x1="'+(ex0+4)+'" x2="'+(ex0+ew-4)+'" y1="'+(ey+eh-7)+'" y2="'+(ey+eh-7)+'" stroke="'+G+'" stroke-width="2.4"/><line x1="'+(ex0+4)+'" x2="'+(ex0+ew-4)+'" y1="'+(ey+7)+'" y2="'+(ey+7)+'" stroke="'+G+'" stroke-width="'+(d.ap==="s"?1.4:2.4)+'"/>';
    var Lmm=d.L*1000, xs=[]; if(d.lo){ for(var p=50;p<=d.lo;p+=d.sCon){ xs.push(p); xs.push(Lmm-p); } for(var q=d.lo+d.sCen;q<Lmm-d.lo;q+=d.sCen) xs.push(q); } else for(var q2=50;q2<=Lmm-50;q2+=d.sCen) xs.push(q2);
    xs.forEach(function(x){ var conf=d.lo&&(x<=d.lo||x>=Lmm-d.lo); e+='<line x1="'+(ex0+x*k).toFixed(1)+'" x2="'+(ex0+x*k).toFixed(1)+'" y1="'+(ey+3)+'" y2="'+(ey+eh-3)+'" stroke="'+(conf?Y:"rgba(255,194,75,.55)")+'" stroke-width="'+(conf?1.3:1)+'"/>'; });
    if(d.ap!=="v"){ [ex0,ex0+ew].forEach(function(x){ e+='<path d="M'+x+' '+(ey+eh)+' l-9 14 h18Z" fill="none" stroke="'+A+'"/>'; }); } else e+='<rect x="'+(ex0-14)+'" y="'+(ey-12)+'" width="14" height="'+(eh+24)+'" fill="rgba(56,225,255,.25)" stroke="'+A+'"/>';
    if(d.lo){ e+='<text x="'+(ex0+d.lo*k/2)+'" y="'+(ey-6)+'" font-size="9" text-anchor="middle" fill="'+Y+'">2h · @'+f1(d.sCon/10)+'</text><text x="'+(ex0+ew-d.lo*k/2)+'" y="'+(ey-6)+'" font-size="9" text-anchor="middle" fill="'+Y+'">2h · @'+f1(d.sCon/10)+'</text>'; }
    e+='<text x="'+(ex0+ew/2)+'" y="'+(ey-6)+'" font-size="9" text-anchor="middle" fill="rgba(255,194,75,.8)">@'+f1(d.sCen/10)+' cm</text><text x="'+(ex0+ew/2)+'" y="'+(ey+eh+26)+'" font-size="10" text-anchor="middle" fill="var(--muted)">L = '+f2(d.L)+' m · '+xs.length+' estribos</text>';
    s+='<div class="'+P+'-dg">'+svg(W,ey+eh+34,e,"Elevación armada de la viga")+'</div>';
    return s;
  }
  if(d.t==="col"){
    var g2=d.g, H=d.circ?g2.D:g2.h, Bw=d.circ?g2.D:g2.b, sc2=Math.min(170/H,170/Bw), cx=20, cy=14, o="";
    if(d.circ){ o+='<circle cx="'+(cx+Bw*sc2/2)+'" cy="'+(cy+H*sc2/2)+'" r="'+(H*sc2/2)+'" fill="rgba(56,225,255,.14)" stroke="'+A+'" stroke-width="1.5"/><circle cx="'+(cx+Bw*sc2/2)+'" cy="'+(cy+H*sc2/2)+'" r="'+((H/2-g2.rec-d.de/2)*sc2)+'" fill="none" stroke="'+Y+'" stroke-width="1.5"/>'; }
    else { var rr=(g2.rec+d.de/2)*sc2; o+='<rect x="'+cx+'" y="'+cy+'" width="'+Bw*sc2+'" height="'+H*sc2+'" fill="rgba(56,225,255,.14)" stroke="'+A+'" stroke-width="1.5"/><rect x="'+(cx+rr)+'" y="'+(cy+rr)+'" width="'+(Bw*sc2-2*rr)+'" height="'+(H*sc2-2*rr)+'" rx="4" fill="none" stroke="'+Y+'" stroke-width="1.5"/>';
      if(d.legs>2) o+='<line x1="'+(cx+Bw*sc2/2)+'" x2="'+(cx+Bw*sc2/2)+'" y1="'+(cy+rr)+'" y2="'+(cy+H*sc2-rr)+'" stroke="'+Y+'" stroke-dasharray="4 3"/>'+(d.legs>3?'<line y1="'+(cy+H*sc2/2)+'" y2="'+(cy+H*sc2/2)+'" x1="'+(cx+rr)+'" x2="'+(cx+Bw*sc2-rr)+'" stroke="'+Y+'" stroke-dasharray="4 3"/>':''); }
    d.pm.bars.forEach(function(b){ o+='<circle cx="'+(cx+b.x*sc2).toFixed(1)+'" cy="'+(cy+b.y*sc2).toFixed(1)+'" r="'+Math.max(2.6,g2.db/2*sc2).toFixed(1)+'" fill="'+G+'" style="filter:drop-shadow(0 0 3px '+G+')"/>'; });
    o+='<text x="'+(cx+Bw*sc2/2)+'" y="'+(cy+H*sc2+16)+'" font-size="10" text-anchor="middle" fill="'+A+'">'+(d.circ?"Ø"+f0(g2.D/10):f0(g2.b/10)+" × "+f0(g2.h/10))+' cm · '+g2.nb+'Ø'+g2.db+'</text>';
    var sec2=svg(220,H*sc2+34,o,"Sección de columna",230);
    /* diagrama P-M */
    var pm=d.pm, Wd=420, Hd=300, pl=50, pb=30, pt=12, pr=14, Mx=Math.max.apply(null,pm.cur.map(function(c){return c.Mn;}))/1e6*1.08, Pmx=pm.P0/1000*1.05, Pmn=pm.Pt/1000*1.1;
    Mx=Math.max(Mx,d.Mc*1.15);
    var X=function(m){ return pl+m/Mx*(Wd-pl-pr); }, Yp=function(p){ return pt+(Pmx-p)/(Pmx-Pmn)*(Hd-pt-pb); };
    var dg='<line x1="'+pl+'" x2="'+(Wd-pr)+'" y1="'+Yp(0)+'" y2="'+Yp(0)+'" stroke="var(--muted)" stroke-opacity=".6"/><line x1="'+pl+'" x2="'+pl+'" y1="'+pt+'" y2="'+(Hd-pb)+'" stroke="var(--muted)" stroke-opacity=".6"/>';
    for(var t=0;t<=4;t++){ var pv=Pmn+(Pmx-Pmn)*t/4; dg+='<text x="'+(pl-5)+'" y="'+(Yp(pv)+3)+'" font-size="8.5" text-anchor="end" fill="var(--muted)">'+f0(pv)+'</text>'; var mv=Mx*t/4; dg+='<text x="'+X(mv)+'" y="'+(Hd-pb+13)+'" font-size="8.5" text-anchor="middle" fill="var(--muted)">'+f0(mv)+'</text>'; }
    var nom="M"+X(0)+" "+Yp(pm.P0/1000), des="M"+X(0)+" "+Yp(pm.pPmax/1000);
    pm.cur.forEach(function(c){ nom+="L"+X(Math.max(0,c.Mn/1e6)).toFixed(1)+" "+Yp(c.Pn/1000).toFixed(1); des+="L"+X(Math.max(0,c.pMn/1e6)).toFixed(1)+" "+Yp(c.pPn/1000).toFixed(1); });
    nom+="L"+X(0)+" "+Yp(pm.Pt/1000); des+="L"+X(0)+" "+Yp(.9*pm.Pt/1000);
    dg+='<path d="'+nom+'" fill="none" stroke="rgba(56,225,255,.45)" stroke-dasharray="5 4"/><path d="'+des+'" fill="rgba(56,225,255,.08)" stroke="'+A+'" stroke-width="2.2" style="filter:drop-shadow(0 0 4px '+A+')"/>';
    [[0,pm.P0/1000,"P0"],[pm.bal.Mn/1e6,pm.bal.Pn/1000,"Bal."],[pm.flex.Mn/1e6,0,"M0"]].forEach(function(k){ dg+='<circle cx="'+X(k[0])+'" cy="'+Yp(k[1])+'" r="3.5" fill="none" stroke="'+A+'"/><text x="'+(X(k[0])+6)+'" y="'+(Yp(k[1])-5)+'" font-size="9" fill="'+A+'">'+k[2]+'</text>'; });
    var okp=R.C.filter(function(c){ return /diagrama/.test(c[0]); })[0], col=okp&&okp[1]?G:"#FF5C7A";
    dg+='<circle cx="'+X(d.Mc)+'" cy="'+Yp(d.Pu)+'" r="5.5" fill="'+col+'" class="'+P+'-pul"/><text x="'+(X(d.Mc)+8)+'" y="'+(Yp(d.Pu)+4)+'" font-size="10" fill="'+col+'">(Mc, Pu)</text>';
    dg+='<text x="'+(Wd-pr)+'" y="'+(Hd-4)+'" font-size="9" text-anchor="end" fill="var(--faint)">M (kN·m) · línea llena: φPn–φMn · punteada: nominal</text><text x="'+(pl+4)+'" y="'+(pt+8)+'" font-size="9" fill="var(--faint)">P (kN)</text>';
    return '<div class="'+P+'-row" style="align-items:flex-start;gap:12px"><div style="flex:0 1 230px;min-width:180px">'+sec2+'</div><div style="flex:1 1 300px;min-width:240px">'+svg(Wd,Hd,dg,"Diagrama de interacción P–M")+'</div></div>';
  }
  if(d.t==="losa"){
    var hp=clamp(d.h*3.2,40,130), g3='<rect x="10" y="20" width="580" height="'+(d.nerv?16:hp)+'" fill="rgba(56,225,255,.2)" stroke="'+A+'"/>';
    if(d.nerv){ for(var i=0;i<6;i++){ var x=10+i*111.4; g3+='<rect x="'+x+'" y="36" width="23" height="'+(hp-16)+'" fill="rgba(56,225,255,.2)" stroke="'+A+'"/>'+(i<5?'<rect x="'+(x+24)+'" y="37" width="86" height="'+(hp-18)+'" fill="rgba(255,194,75,.08)" stroke="'+Y+'" stroke-dasharray="3 2"/>':'')+'<circle cx="'+(x+11.5)+'" cy="'+(20+hp-6)+'" r="3" fill="'+G+'"/>'; } g3+='<line x1="12" x2="588" y1="26" y2="26" stroke="'+G+'" stroke-dasharray="2 3"/>'; }
    else { for(var j=0;j<24;j++) g3+='<circle cx="'+(22+j*24)+'" cy="'+(20+hp-7)+'" r="2.6" fill="'+G+'"/>'; if(d.two) for(var j2=0;j2<24;j2++) g3+='<circle cx="'+(34+j2*24)+'" cy="'+(20+hp-12)+'" r="2.2" fill="rgba(182,255,60,.6)"/>'; }
    g3+='<text x="300" y="12" font-size="10" text-anchor="middle" fill="var(--muted)">'+(d.nerv?'loseta 5 cm · nervios 10 cm @ 50 cm · bloque '+d.hb+' cm':'losa maciza')+' · h = '+f0(d.h)+' cm</text>';
    return '<div class="'+P+'-dg">'+svg(600,hp+30,g3,"Sección de losa")+'</div>';
  }
  if(d.t==="zap"){
    var Sz=200/Math.max(d.B,d.L), pw=d.B*Sz, ph=d.L*Sz, g4='<rect x="20" y="20" width="'+pw+'" height="'+ph+'" fill="rgba(56,225,255,.1)" stroke="'+A+'" stroke-width="1.5"/>';
    var nx=Math.min(30,Math.round(d.B*1000/d.meL.s)), ny=Math.min(30,Math.round(d.L*1000/d.meB.s));
    for(var a=1;a<nx;a++) g4+='<line x1="'+(20+a*pw/nx)+'" x2="'+(20+a*pw/nx)+'" y1="26" y2="'+(14+ph)+'" stroke="rgba(182,255,60,.55)"/>';
    for(var b2=1;b2<ny;b2++) g4+='<line y1="'+(20+b2*ph/ny)+'" y2="'+(20+b2*ph/ny)+'" x1="26" x2="'+(14+pw)+'" stroke="rgba(182,255,60,.35)"/>';
    var cw=d.c1/100*Sz, chh=d.c2/100*Sz; g4+='<rect x="'+(20+pw/2-cw/2)+'" y="'+(20+ph/2-chh/2)+'" width="'+cw+'" height="'+chh+'" fill="rgba(56,225,255,.5)" stroke="'+A+'"/>';
    g4+='<text x="'+(20+pw/2)+'" y="'+(ph+36)+'" font-size="10" text-anchor="middle" fill="'+A+'">B = '+f2(d.B)+' m</text><text x="'+(pw+28)+'" y="'+(20+ph/2)+'" font-size="10" fill="'+A+'">L = '+f2(d.L)+'</text>';
    var zs=svg(pw+80,ph+44,g4,"Planta de zapata con parrilla",300);
    var hh=clamp(d.h*1.2,30,90), g5='<rect x="'+(150-cw/2)+'" y="10" width="'+cw+'" height="60" fill="rgba(56,225,255,.2)" stroke="'+A+'"/><rect x="'+(150-pw/2)+'" y="70" width="'+pw+'" height="'+hh+'" fill="rgba(56,225,255,.18)" stroke="'+A+'" stroke-width="1.5"/><line x1="'+(150-pw/2+6)+'" x2="'+(150+pw/2-6)+'" y1="'+(70+hh-8)+'" y2="'+(70+hh-8)+'" stroke="'+G+'" stroke-width="2.2"/>';
    for(var c3=0;c3<9;c3++) g5+='<circle cx="'+(150-pw/2+10+c3*(pw-20)/8)+'" cy="'+(70+hh-12)+'" r="2.4" fill="'+G+'"/>';
    g5+='<line x1="'+(150-cw/2+4)+'" x2="'+(150-cw/2+4)+'" y1="14" y2="'+(70+hh-14)+'" stroke="'+G+'"/><line x1="'+(150+cw/2-4)+'" x2="'+(150+cw/2-4)+'" y1="14" y2="'+(70+hh-14)+'" stroke="'+G+'"/>';
    g5+='<text x="150" y="'+(70+hh+16)+'" font-size="10" text-anchor="middle" fill="'+A+'">h = '+f0(d.h)+' cm · Ø'+d.meL.db+' @ '+f0(d.meL.s/10)+'</text>';
    return '<div class="'+P+'-row" style="gap:12px;align-items:flex-start"><div style="flex:1 1 220px">'+zs+'</div><div style="flex:1 1 220px">'+svg(300,70+hh+24,g5,"Corte de zapata",320)+'</div></div>';
  }
  if(d.t==="corr"){
    var Sc=220/Math.max(d.B,.6), bw2=d.B*Sc, hh2=clamp(d.h*1.4,30,100), tw=d.tw/100*Sc, g6='<rect x="'+(160-tw/2)+'" y="8" width="'+tw+'" height="60" fill="'+(d.ha?"rgba(56,225,255,.2)":"rgba(255,194,75,.12)")+'" stroke="'+A+'"/><rect x="'+(160-bw2/2)+'" y="68" width="'+bw2+'" height="'+hh2+'" fill="'+(d.ha?"rgba(56,225,255,.18)":"rgba(140,160,182,.18)")+'" stroke="'+A+'" stroke-width="1.5"/>';
    if(d.ha) g6+='<line x1="'+(160-bw2/2+6)+'" x2="'+(160+bw2/2-6)+'" y1="'+(68+hh2-8)+'" y2="'+(68+hh2-8)+'" stroke="'+G+'" stroke-width="2"/>'; else for(var st2=0;st2<7;st2++) g6+='<ellipse cx="'+(160-bw2/2+18+st2*(bw2-36)/6)+'" cy="'+(68+hh2/2+(st2%2?6:-6))+'" rx="9" ry="6" fill="none" stroke="var(--muted)"/>';
    g6+='<text x="160" y="'+(68+hh2+16)+'" font-size="10" text-anchor="middle" fill="'+A+'">B = '+f2(d.B)+' m · h = '+f0(d.h)+' cm</text>';
    return svg(320,68+hh2+24,g6,"Corte de cimiento corrido",340);
  }
  if(d.t==="comb"){
    var Wc=600, sx=(Wc-60)/d.L, g7='<rect x="30" y="10" width="'+d.L*sx+'" height="34" fill="rgba(56,225,255,.12)" stroke="'+A+'"/>';
    [[d.x1,d.c1],[d.x2,d.c2]].forEach(function(c){ g7+='<rect x="'+(30+(c[0]-c[1]/2)*sx)+'" y="2" width="'+c[1]*sx+'" height="12" fill="rgba(56,225,255,.5)" stroke="'+A+'"/>'; });
    function dia(arr,y0,hh,col,lab){ var mx=Math.max.apply(null,arr.map(Math.abs))||1, p="M30 "+y0; arr.forEach(function(v,i){ p+="L"+(30+d.xs[i]*sx).toFixed(1)+" "+(y0-v/mx*hh).toFixed(1); }); p+="L"+(30+d.L*sx)+" "+y0+"Z"; return '<line x1="30" x2="'+(30+d.L*sx)+'" y1="'+y0+'" y2="'+y0+'" stroke="var(--muted)" stroke-opacity=".5"/><path d="'+p+'" fill="'+col+'" fill-opacity=".15" stroke="'+col+'" stroke-width="1.5"/><text x="34" y="'+(y0-hh+2)+'" font-size="9" fill="'+col+'">'+lab+' (máx '+f0(mx)+')</text>'; }
    g7+=dia(d.V,110,50,Y,"V (kN)")+dia(d.M.map(function(m){return -m;}),210,50,G,"M (kN·m, + arriba = tracción superior)");
    return '<div class="'+P+'-dg">'+svg(Wc,270,g7,"Zapata combinada: cortante y momento")+'</div>';
  }
  if(d.t==="perf"){
    var sp=d.s, kk=180/Math.max(sp.d,sp.bf), w=sp.bf*kk, hgt=sp.d*kk, x=150-w/2, y=12, tf=Math.max(2,sp.tf*kk), twp=Math.max(1.6,sp.tw*kk);
    var g8='<path d="M'+x+' '+y+'h'+w+'v'+tf+'h'+(-(w-twp)/2)+'v'+(hgt-2*tf)+'h'+((w-twp)/2)+'v'+tf+'h'+(-w)+'v'+(-tf)+'h'+((w-twp)/2)+'v'+(-(hgt-2*tf))+'h'+(-(w-twp)/2)+'Z" fill="rgba(255,194,75,.18)" stroke="'+Y+'" stroke-width="1.6" style="filter:drop-shadow(0 0 4px '+Y+')"/>';
    g8+='<text x="150" y="'+(y+hgt+16)+'" font-size="10" text-anchor="middle" fill="'+Y+'">'+sp.n+' · d '+f0(sp.d)+' · bf '+f0(sp.bf)+' · tw '+f1(sp.tw)+' · tf '+f1(sp.tf)+' mm</text>';
    return svg(300,hgt+30,g8,"Perfil de acero",320);
  }
  if(d.t==="mad"){
    var g9="";
    if(d.g){ var n=Math.max(1,d.n), rr2=Math.min(40,150/n/2); for(var m=0;m<n;m++){ var cxx=150+(m-(n-1)/2)*rr2*2.1; g9+='<circle cx="'+cxx+'" cy="60" r="'+rr2+'" fill="rgba(182,255,60,.15)" stroke="'+G+'" stroke-width="'+Math.max(2,rr2*d.tt/d.De*2)+'"/>'; } g9+='<text x="150" y="118" font-size="10" text-anchor="middle" fill="'+G+'">'+n+' culmo(s) Ø'+f1(d.De)+' cm · t '+f1(d.tt)+' cm</text>'; }
    else { var kk2=90/Math.max(d.h,d.b); g9+='<rect x="'+(150-d.b*kk2/2)+'" y="'+(60-d.h*kk2/2)+'" width="'+d.b*kk2+'" height="'+d.h*kk2+'" fill="rgba(255,194,75,.15)" stroke="'+Y+'"/><path d="M'+(150-d.b*kk2/2)+' 40 q'+(d.b*kk2/2)+' 10 '+d.b*kk2+' 0M'+(150-d.b*kk2/2)+' 70 q'+(d.b*kk2/2)+' 10 '+d.b*kk2+' 0" fill="none" stroke="rgba(255,194,75,.4)"/><text x="150" y="122" font-size="10" text-anchor="middle" fill="'+Y+'">'+f1(d.b)+' × '+f1(d.h)+' cm</text>'; }
    return svg(300,130,g9,"Sección de madera o guadúa",320);
  }
  if(d.t==="esc"){
    var n2=Math.min(d.n,18), Ws=560, sk=Math.min((Ws-60)/(d.Lh*1000),180/(d.H*1000)), x9=30, y9=200, p9="M"+x9+" "+y9, hu=d.hu*10*sk, chs=d.ch*10*sk;
    for(var i9=0;i9<n2;i9++){ y9-=chs; p9+="V"+y9.toFixed(1); if(i9<n2-1){ x9+=hu; p9+="H"+x9.toFixed(1); } }
    var tt=d.tt*10*sk/Math.cos(Math.atan(d.H/d.Lh));
    var gE='<path d="'+p9+'L'+x9+' '+(y9+tt)+'L'+(30+tt*.6)+' '+(200)+'Z" fill="rgba(56,225,255,.12)" stroke="'+A+'" stroke-width="1.5"/><line x1="'+(30+8)+'" y1="'+(200-6)+'" x2="'+(x9-4)+'" y2="'+(y9+tt-6)+'" stroke="'+G+'" stroke-width="2"/><text x="'+(Ws/2)+'" y="226" font-size="10" text-anchor="middle" fill="var(--muted)">garganta '+f0(d.tt)+' cm · '+d.n+' × '+f1(d.ch)+' cm</text>';
    return '<div class="'+P+'-dg">'+svg(Ws,232,gE,"Escalera losa inclinada")+'</div>';
  }
  if(d.t==="muro"){
    var km=200/Math.max(d.H,d.B), oxm=50, oym=230, gM='<rect x="'+oxm+'" y="'+(oym-d.tz*km)+'" width="'+d.B*km+'" height="'+d.tz*km+'" fill="rgba(56,225,255,.2)" stroke="'+A+'"/>';
    var xs0=oxm+d.toe*km; gM+='<path d="M'+xs0+' '+(oym-d.tz*km)+'L'+xs0+' '+(oym-d.H*km)+'L'+(xs0+d.tt*km)+' '+(oym-d.H*km)+'L'+(xs0+d.tb*km)+' '+(oym-d.tz*km)+'Z" fill="rgba(56,225,255,.2)" stroke="'+A+'"/>';
    gM+='<rect x="'+(xs0+d.tb*km)+'" y="'+(oym-d.H*km)+'" width="'+(d.B-d.toe-d.tb)*km+'" height="'+(d.H-d.tz)*km+'" fill="rgba(255,194,75,.08)" stroke="rgba(255,194,75,.4)" stroke-dasharray="3 3"/>';
    var xr=oxm+d.B*km+10; gM+='<path d="M'+xr+' '+(oym-d.H*km)+'L'+xr+' '+oym+'L'+(xr+d.H*km*.35)+' '+oym+'Z" fill="rgba(255,92,122,.15)" stroke="#FF5C7A"/><text x="'+(xr+4)+'" y="'+(oym-d.H*km/2)+'" font-size="9.5" fill="#FF5C7A">Ka·γ·H</text>';
    gM+='<text x="'+(oxm+d.B*km/2)+'" y="'+(oym+14)+'" font-size="10" text-anchor="middle" fill="'+A+'">B = '+f2(d.B)+' m · H = '+f2(d.H)+' m</text>';
    return svg(380,250,gM,"Muro de contención en voladizo",400);
  }
  return "";
}

/* ───────────── definición de calculadoras (campos) ───────────── */
var FCH=[[21,"21 MPa · 210"],[24,"24 · 240"],[28,"28 · 280"],[35,"35 · 350 kg/cm²"]], FYH=[[280,"280"],[420,"420 MPa · 4200"],[500,"500"]];
var CALC=[
 {id:"viga",n:"Viga H.A.",nor:"ACI 318-19 · NEC-SE-HM 4.2",fn:cViga,def:{ap:"s",b:30,h:50,L:6,c:.3,modo:"dl",wu:40,wD:20,wL:8,pp:1,fc:21,fy:420,rec:4,de:10,db:16,sis:1},
  f:function(v){ return [["ap","Apoyos",[["s","Simple"],["ce","Continua · extremo"],["ci","Continua · interior"],["v","Voladizo"]]],["b","b","cm",5,15,150],["h","h","cm",5,20,250],["L","Luz L (eje a eje)","m",.05,.5,30],["c","Ancho del apoyo","m",.05,0,2],["modo","Carga",[["dl","D + L (kN/m)"],["wu","wu directa"]]]]
   .concat(v.modo==="wu"?[["wu","wu","kN/m",1,0,2000]]:[["wD","D sobreimpuesta","kN/m",.5,0,2000],["wL","L viva","kN/m",.5,0,2000],["pp","Peso propio",[[1,"Sumar"],[0,"No sumar"]]]])
   .concat([["fc","f'c","MPa",1,17,80,FCH],["fy","fy","MPa",10,280,550,FYH],["rec","Recubrimiento libre","cm",.5,2,8],["de","Estribo",[[8,"Ø8"],[10,"Ø10"],[12,"Ø12"]]],["db","Ø barra previsto","mm",2,10,32],["sis","Diseño sísmico",[[1,"Pórtico especial NEC"],[0,"Gravitacional"]]]]); }},
 {id:"col",n:"Columna H.A.",nor:"ACI 318-19 · NEC-SE-HM 4.3",fn:cCol,def:{forma:"r",b:40,h:40,D:40,rec:4,fc:21,fy:420,db:18,nb:8,tr:"e",Pu:1200,Mu:60,lu:3,k:1,m12:.5,sis:1,Mnb:0},
  f:function(v){ return [["forma","Sección",[["r","Rectangular"],["c","Circular"]]]].concat(v.forma==="c"?[["D","Diámetro D","cm",5,25,200]]:[["b","b","cm",5,20,200],["h","h (dirección del momento)","cm",5,20,200]])
   .concat([["Pu","Pu","kN",10,0,99999],["Mu","Mu","kN·m",5,0,9999],["db","Ø longitudinal","mm",2,12,32],["nb","Nº de barras","u",2,4,48],["tr","Transversal",[["e","Estribos"],["z","Zunchos"]]],["lu","Altura libre lu","m",.05,.5,20],["k","Factor k","",.05,.5,3],["m12","M1/M2","",.1,-1,1],
   ["fc","f'c","MPa",1,17,80,FCH],["fy","fy","MPa",10,280,550,FYH],["rec","Recubrimiento","cm",.5,2,8],["sis","Diseño sísmico",[[1,"Sí (NEC)"],[0,"No"]]],["Mnb","ΣMn vigas en el nudo","kN·m",10,0,9999]]); }},
 {id:"losa",n:"Losa",nor:"ACI 318-19 7 · 8 · NEC-SE-HM",fn:cLosa,def:{tipo:"n2",Lx:6,Ly:7,cond:"ce",ex:1,ey:1,h:0,D:3,L:2,fc:21,fy:420},
  f:function(v){ var two=v.tipo==="m2"||v.tipo==="n2"; return [["tipo","Tipo",[["n2","Alivianada 2D"],["n1","Alivianada 1D"],["m2","Maciza 2D"],["m1","Maciza 1D"]]],["Lx","Luz libre corta","m",.05,1,15],["Ly","Luz libre larga","m",.05,1,20]]
   .concat(two?[["ex","Bordes continuos (luz corta)",[[0,"0 · apoyada"],[1,"1"],[2,"2 · empotrada"]]],["ey","Bordes continuos (luz larga)",[[0,"0"],[1,"1"],[2,"2"]]]]:[["cond","Continuidad",[["s","Simple"],["ce","Un extremo"],["ci","Ambos"],["v","Voladizo"]]]])
   .concat([["h","h (0 = automático)","cm",1,0,60],["D","D sobreimpuesta","kN/m²",.1,0,20],["L","L viva","kN/m²",.1,0,20],["fc","f'c","MPa",1,17,80,FCH],["fy","fy","MPa",10,280,550,FYH]]); }},
 {id:"zap",n:"Zapata aislada",nor:"ACI 318-19 13 · NEC-SE-GC",fn:cZap,def:{PD:600,PL:200,M:0,c1:40,c2:40,qa:1.5,Df:1.5,g:18,fc:21,fy:420,h:0},
  f:function(){ return [["PD","P muerta (servicio)","kN",10,0,99999],["PL","P viva (servicio)","kN",10,0,99999],["M","M servicio (opcional)","kN·m",5,0,9999],["c1","Columna c1","cm",5,20,200],["c2","Columna c2 (dir. L)","cm",5,20,200],["qa","qadm","kg/cm²",.05,.2,10],["Df","Desplante Df","m",.1,.5,6],["g","γ relleno prom.","kN/m³",.5,14,24],["h","h (0 = automático)","cm",5,0,250],["fc","f'c","MPa",1,17,80,FCH],["fy","fy","MPa",10,280,550,FYH]]; }},
 {id:"corr",n:"Zapata corrida",nor:"ACI 318-19 13 · 14 · NEC-SE-VIVIENDA",fn:cCorr,def:{tipo:"ha",t:20,wD:40,wL:10,qa:1,Df:1,g:18,fc:21,fy:420,h:0},
  f:function(){ return [["tipo","Tipo",[["ha","H.A."],["ci","Ciclópeo"]]],["t","Espesor del muro","cm",1,10,60],["wD","wD","kN/m",1,0,999],["wL","wL","kN/m",1,0,999],["qa","qadm","kg/cm²",.05,.2,10],["Df","Df","m",.1,.4,4],["g","γ relleno","kN/m³",.5,14,24],["h","h (0 = auto)","cm",5,0,150],["fc","f'c","MPa",1,14,80,FCH],["fy","fy","MPa",10,280,550,FYH]]; }},
 {id:"comb",n:"Zapata combinada",nor:"ACI 318-19 13 · NEC-SE-GC",fn:cComb,def:{P1D:400,P1L:150,P2D:700,P2L:250,c1:40,c2:40,s:5,lin:1,v1:.5,qa:1.5,Df:1.5,g:18,h:0,fc:21,fy:420},
  f:function(v){ return [["P1D","Col. 1 · PD","kN",10,0,99999],["P1L","Col. 1 · PL","kN",10,0,99999],["P2D","Col. 2 · PD","kN",10,0,99999],["P2L","Col. 2 · PL","kN",10,0,99999],["c1","Col. 1 lado","cm",5,20,150],["c2","Col. 2 lado","cm",5,20,150],["s","Separación entre ejes","m",.05,1,15],["lin","Col. 1",[[1,"En lindero"],[0,"Con voladizo"]]]].concat(v.lin?[]:[["v1","Voladizo col. 1","m",.05,0,3]]).concat([["qa","qadm","kg/cm²",.05,.2,10],["Df","Df","m",.1,.5,6],["g","γ","kN/m³",.5,14,24],["h","h (0 = auto)","cm",5,0,250],["fc","f'c","MPa",1,17,80,FCH],["fy","fy","MPa",10,280,550,FYH]]); }},
 {id:"rio",n:"Riostra / viga de cimentación",nor:"ACI 318-19 18.13.3 · NEC-SE-GC",fn:cRiostra,def:{Pu:1500,L:6,b:30,h:40,w:0,fc:21,fy:420},
  f:function(){ return [["Pu","Pu de la columna más cargada","kN",10,0,99999],["L","Luz libre","m",.05,1,15],["b","b","cm",5,20,80],["h","h","cm",5,20,120],["w","Muro apoyado (servicio)","kN/m",1,0,200],["fc","f'c","MPa",1,17,80,FCH],["fy","fy","MPa",10,280,550,FYH]]; }},
 {id:"avig",n:"Viga de acero",nor:"AISC 360-16 F · G · NEC-SE-AC",fn:cAViga,def:{fam:"IPE",perf:"",L:6,Lb:1.5,Cb:1.14,wD:8,wL:6,Fy:250},
  f:function(v){ return [["fam","Familia",[["IPE","IPE"],["HEA","HEA"],["W","W (AISC)"]]],["perf","Perfil",[[ "","Automático (más liviano)"]].concat(PERF.filter(function(p){return p[0].indexOf(v.fam)===0;}).map(function(p){return [p[0],p[0]];}))],["L","Luz (simple)","m",.1,1,30],["Lb","Long. no arriostrada Lb","m",.1,0,30],["Cb","Cb","",.01,1,3],["wD","wD","kN/m",.5,0,999],["wL","wL","kN/m",.5,0,999],["Fy","Acero",[[250,"A36 · 250"],[345,"A572-50 · 345"]]]]; }},
 {id:"acol",n:"Columna de acero",nor:"AISC 360-16 E3 · NEC-SE-AC",fn:cACol,def:{fam:"HEA",perf:"",Pu:900,L:3.5,k:1,Fy:250},
  f:function(v){ return [["fam","Familia",[["HEA","HEA"],["W","W (AISC)"],["IPE","IPE"]]],["perf","Perfil",[["","Automático"]].concat(PERF.filter(function(p){return p[0].indexOf(v.fam)===0;}).map(function(p){return [p[0],p[0]];}))],["Pu","Pu","kN",10,0,99999],["L","Altura L","m",.1,1,30],["k","K","",.05,.5,2.5],["Fy","Acero",[[250,"A36 · 250"],[345,"A572-50 · 345"]]]]; }},
 {id:"mad",n:"Madera / guadúa",nor:"NEC-SE-GUADÚA · NEC-SE-MD",fn:cMad,def:{mat:"g",De:12,t:1.2,n:2,CD:1,grp:"B",b:5,h:20,L:3,wD:1,wL:.8,cr:1},
  f:function(v){ return [["mat","Material",[["g","Guadúa"],["m","Madera aserrada"]]]].concat(v.mat==="g"?[["De","Diámetro exterior","cm",.5,6,20],["t","Espesor de pared","cm",.1,.5,3],["n","Culmos","u",1,1,6],["CD","Factor de duración CD",[[.9,"0,9 permanente"],[1,"1,0 normal"],[1.15,"1,15 2 meses"],[1.25,"1,25 7 días"]]]]:[["grp","Grupo",[["A","A"],["B","B"],["C","C"]]],["b","b","cm",.5,2,40],["h","h","cm",.5,4,60]]).concat([["L","Luz (simple)","m",.1,.5,12],["wD","wD (servicio)","kN/m",.1,0,99],["wL","wL (servicio)","kN/m",.1,0,99],["cr","Cielo raso",[[1,"Con cielo raso L/300"],[0,"Sin cielo L/250"]]]]); }},
 {id:"esc",n:"Escalera H.A.",nor:"ACI 318-19 7 · NTE INEN 2249",fn:cEsc,def:{Lh:2.8,H:1.8,ch:17.5,t:0,ap:"s",ac:1,L:4.8,fc:21,fy:420},
  f:function(){ return [["Lh","Proyección horizontal","m",.05,.5,10],["H","Desnivel del tramo","m",.05,.3,6],["ch","Contrahuella objetivo","cm",.5,14,19],["t","Garganta (0 = auto)","cm",1,0,40],["ap","Apoyos",[["s","Simple"],["c","Continua"]]],["ac","Acabados","kN/m²",.1,0,5],["L","L viva","kN/m²",.1,0,10],["fc","f'c","MPa",1,17,80,FCH],["fy","fy","MPa",10,280,550,FYH]]; }},
 {id:"muro",n:"Muro de contención",nor:"NEC-SE-GC · ACI 318-19 11",fn:cMuro,def:{H:3,g:18,phi:30,q:10,B:2,tz:.3,tt:.25,tb:.3,toe:.6,mu:.5,qa:1.5,fc:21,fy:420},
  f:function(){ return [["H","Altura total H","m",.1,1,10],["B","Base B","m",.05,.5,10],["toe","Punta","m",.05,0,5],["tt","Corona","m",.05,.15,1],["tb","Pantalla en base","m",.05,.15,1.5],["tz","Espesor de base","m",.05,.2,1.5],["g","γ suelo","kN/m³",.5,14,22],["phi","φ suelo","°",1,15,45],["q","Sobrecarga q","kPa",1,0,50],["mu","μ base–suelo","",.05,.2,.8],["qa","qadm","kg/cm²",.05,.2,10],["fc","f'c","MPa",1,17,80,FCH],["fy","fy","MPa",10,280,550,FYH]]; }}
];
var CALCI={}; CALC.forEach(function(c){ CALCI[c.id]=c; });

/* ───────────── datos del proyecto para las calculadoras ───────────── */
var FCNOM={210:21,240:24,280:28,350:35}, FYNOM={2800:280,4200:420,5000:500};
function numsort(a,b){ return a-b; }
function uniq(a){ var o=[]; a.forEach(function(x){ if(!o.some(function(y){ return Math.abs(y-x)<.01; })) o.push(x); }); return o.sort(numsort); }
function estG(ctx,st){
  var c=estCalc(ctx,st), pr=c.pr, pl=st.plano||{}, ex=uniq(pl.ex||[]), ey=uniq(pl.ey||[]), grid=ex.length>=2&&ey.length>=2, i, j;
  if(!grid){ ex=[]; ey=[]; for(i=0;i<=c.nx;i++) ex.push(i*st.lx); for(j=0;j<=c.ny;j++) ey.push(j*st.ly); }
  var nx=ex.length-1, ny=ey.length-1, sx=[], sy=[]; for(i=0;i<nx;i++) sx.push(ex[i+1]-ex[i]); for(j=0;j<ny;j++) sy.push(ey[j+1]-ey[j]);
  var Lmax=Math.max(Math.max.apply(null,sx.concat([0])),Math.max.apply(null,sy.concat([0])));
  /* cargas por piso */
  var fl=[], np=pr.pisos; for(var k=0;k<np;k++){ var us=(st.usos&&st.usos[k])||(k===np-1&&np>1?"cub":st.cv), cv=CVI[us]||CVI[st.cv]||CV[0], Dk=us==="cub"?Math.max(1,c.D-st.dMp):c.D; fl.push({n:k+1,uso:us,cv:cv,D:Dk,L:cv[2],wu:Math.max(1.4*Dk,1.2*Dk+1.6*cv[2])}); }
  var sD=0,sL=0,sWu=0; fl.forEach(function(f){ sD+=f.D; sL+=f.L; sWu+=f.wu; });
  function onX(x){ return ex.some(function(e){ return Math.abs(e-x)<.02; }); } function onY(y){ return ey.some(function(e){ return Math.abs(e-y)<.02; }); }
  function ix(x){ for(var a=0;a<ex.length;a++) if(Math.abs(ex[a]-x)<.02) return a; return -1; } function iy(y){ for(var a=0;a<ey.length;a++) if(Math.abs(ey[a]-y)<.02) return a; return -1; }
  var ck=pl.cols&&Object.keys(pl.cols).length&&grid?pl.cols:null, cols=[];
  for(i=0;i<=nx;i++) for(j=0;j<=ny;j++){ var key=ex[i].toFixed(2)+","+ey[j].toFixed(2); if(ck&&!ck[key]) continue;
    var ax=((i>0?sx[i-1]:0)+(i<nx?sx[i]:0))/2, ay=((j>0?sy[j-1]:0)+(j<ny?sy[j]:0))/2, e1=i===0||i===nx, e2=j===0||j===ny;
    cols.push({i:i,j:j,x:ex[i],y:ey[j],k:key,lab:String.fromCharCode(65+(j%26))+"-"+(i+1),ax:ax,ay:ay,At:ax*ay,tipo:e1&&e2?"esq":e1||e2?"bor":"int",Pu:sWu*ax*ay,PD:sD*ax*ay,PL:sL*ax*ay}); }
  var beams=[];
  function addB(x1,y1,x2,y2){ var a=ix(x1), b=iy(y1), a2=ix(x2), b2=iy(y2); if(a<0||b<0||a2<0||b2<0) return; var dir=b===b2?"x":"y", L=dir==="x"?Math.abs(x2-x1):Math.abs(y2-y1), tr, nsp, pos;
    if(dir==="x"){ tr=((b>0?sy[b-1]:0)+(b<ny?sy[b]:0))/2; nsp=nx; pos=Math.min(a,a2); } else { tr=((a>0?sx[a-1]:0)+(a<nx?sx[a]:0))/2; nsp=ny; pos=Math.min(b,b2); }
    var ap=nsp===1?"s":(pos===0||pos===nsp-1)?"ce":"ci";
    beams.push({x1:x1,y1:y1,x2:x2,y2:y2,dir:dir,L:L,tr:tr,ap:ap,lab:dir==="x"?"Eje "+String.fromCharCode(65+(b%26))+" · "+(Math.min(a,a2)+1)+"–"+(Math.max(a,a2)+1):"Eje "+(a+1)+" · "+String.fromCharCode(65+(Math.min(b,b2)%26))+"–"+String.fromCharCode(65+(Math.max(b,b2)%26))}); }
  if(grid&&pl.vigas&&pl.vigas.length) pl.vigas.forEach(function(v){ addB(v[0],v[1],v[2],v[3]); });
  else { for(j=0;j<=ny;j++) for(i=0;i<nx;i++) addB(ex[i],ey[j],ex[i+1],ey[j]); for(i=0;i<=nx;i++) for(j=0;j<ny;j++) addB(ex[i],ey[j],ex[i],ey[j+1]); }
  var muros=(pl.muros||[]).map(function(m){ return {L:Math.hypot(m[2]-m[0],m[3]-m[1])}; });
  return {c:c,pr:pr,ex:ex,ey:ey,grid:grid,nx:nx,ny:ny,sx:sx,sy:sy,Lmax:Lmax,fl:fl,sD:sD,sL:sL,sWu:sWu,cols:cols,beams:beams,muros:muros,fc:FCNOM[st.fc]||st.fc/10,fy:FYNOM[st.fy]||st.fy/10};
}
function maxBy(a,f){ var b=null; a.forEach(function(x){ if(!b||f(x)>f(b)) b=x; }); return b; }
/* "usar datos del proyecto": devuelve parche de entradas + texto de origen */
function projPatch(id,G,st,sel){
  var c=G.c, pr=G.pr, D0=c.D-st.dVc, Lt=G.fl.length?G.fl[0].L:c.Lv, side=c.side, hp=pr.hp, z=st.z>=.25?1:0;
  var bm=sel&&sel.t==="b"?G.beams.filter(function(b){ return b.x1===sel.x1&&b.y1===sel.y1&&b.x2===sel.x2&&b.y2===sel.y2; })[0]:null; bm=bm||maxBy(G.beams,function(b){ return b.L*1000+b.tr; });
  var cl=sel&&sel.t==="c"?G.cols.filter(function(x){ return x.k===sel.k; })[0]:null; cl=cl||maxBy(G.cols,function(x){ return x.Pu; });
  var base={fc:G.fc,fy:G.fy};
  function o(p,src){ for(var k in base) if(p[k]==null) p[k]=base[k]; return {p:p,src:src}; }
  if(id==="viga"&&bm) return o({ap:bm.ap,L:+bm.L.toFixed(2),c:side/100,b:c.bv,h:c.hv,modo:"dl",wD:+(D0*bm.tr).toFixed(2),wL:+(Lt*bm.tr).toFixed(2),pp:1,sis:z},bm.lab+" · ancho tributario "+f2(bm.tr)+" m × (D "+f2(D0)+" + L "+f2(Lt)+" kN/m²) — rectangular, conservador (con losa en 2 direcciones la carga real es trapezoidal, ≈ 70–85 %)");
  if(id==="avig"&&bm) return o({L:+bm.L.toFixed(2),wD:+(D0*bm.tr*.8).toFixed(2),wL:+(Lt*bm.tr).toFixed(2)},bm.lab+" · trib. "+f2(bm.tr)+" m (losa steel deck ≈ 80 % de D)");
  if(cl){
    var pc=1.2*Math.pow(side/100,2)*24*hp*pr.pisos, Mu=!G.fl.length?0:cl.tipo==="int"?.5*1.6*G.fl[0].L*cl.ay*cl.ax*cl.ax/12:.5*G.fl[0].wu*cl.ay*Math.pow(2*cl.ax,2)/16, nb0=Math.max(8,Math.ceil(.012*side*side*100/ab(18)/2)*2);
    if(id==="col") return o({forma:"r",b:side,h:side,Pu:Math.round(cl.Pu+pc),Mu:Math.round(Mu),lu:+(hp-c.hv/100).toFixed(2),db:18,nb:nb0,sis:z,k:1},"Columna "+cl.lab+" ("+{int:"interior",bor:"borde",esq:"esquina"}[cl.tipo]+") · At "+f2(cl.At)+" m² × "+pr.pisos+" pisos (Σwu por piso) + peso propio "+f0(pc)+" kN · Mu ≈ "+(cl.tipo==="int"?"½·(1,6L·ay)·L²/12 (alternancia de carga viva)":"½·wu·ay·L²/16 (momento exterior ACI repartido arriba/abajo)")+" · se compara con Mmín");
    if(id==="acol") return o({Pu:Math.round(cl.Pu*.85),L:+hp.toFixed(2)},"Columna "+cl.lab+" · At "+f2(cl.At)+" m² × "+pr.pisos+" pisos (peso de sistema en acero ≈ 85 %)");
    if(id==="zap") return o({PD:Math.round(cl.PD+pc/1.2),PL:Math.round(cl.PL),c1:side,c2:side,qa:st.qa},"Columna "+cl.lab+" · ΣD·At = "+f0(cl.PD)+" kN + col. "+f0(pc/1.2)+" kN · ΣL·At = "+f0(cl.PL)+" kN · qadm del proyecto");
    if(id==="rio"){ var lnr=Math.max(1,G.Lmax-side/100), dm=Math.min(45,Math.max(30,Math.ceil(lnr*100/20/5)*5)); return o({Pu:Math.round(cl.Pu+pc),L:+lnr.toFixed(2),b:dm,h:Math.max(40,dm+10)},"Pu máx. "+cl.lab+" · luz libre "+f2(lnr)+" m → menor dimensión ≥ ln/20"); }
    if(id==="comb"){ var bc=G.cols.filter(function(x){ return x.tipo==="bor"; }), c1=maxBy(bc,function(x){return x.Pu;})||cl, alongX=c1.i===0||c1.i===G.nx, nb=G.cols.filter(function(x){ return alongX?(Math.abs(x.y-c1.y)<.02&&Math.abs(x.i-c1.i)===1):(Math.abs(x.x-c1.x)<.02&&Math.abs(x.j-c1.j)===1); })[0]||c1;
      return o({P1D:Math.round(c1.PD),P1L:Math.round(c1.PL),P2D:Math.round(nb.PD),P2L:Math.round(nb.PL),c1:side,c2:side,s:+(Math.abs(nb.x-c1.x)+Math.abs(nb.y-c1.y)||G.Lmax).toFixed(2),lin:1,qa:st.qa},"Columna de lindero "+c1.lab+" + vecina "+nb.lab); }
  }
  if(id==="losa"){ var lxx=Math.min(Math.max.apply(null,G.sx.concat([1])),Math.max.apply(null,G.sy.concat([1]))), lyy=Math.max(Math.max.apply(null,G.sx.concat([1])),Math.max.apply(null,G.sy.concat([1]))), Lc=Math.max(.5,lxx-c.bv/100), Ll=Math.max(.5,lyy-c.bv/100), b2=Ll/Lc>=2;
    return o({tipo:(st.losa==="maz"?"m":"n")+(b2?"1":"2"),Lx:+Lc.toFixed(2),Ly:+Ll.toFixed(2),D:+(st.dAc+st.dCr+st.dMp).toFixed(2),L:Lt,ex:1,ey:1,cond:"ce",h:0},"Paño mayor "+f2(lxx)+" × "+f2(lyy)+" m (luces libres − b viga) · D = acabados + cielo + mampostería · L "+E(G.fl[0]?G.fl[0].cv[1]:""));}
  if(id==="corr"){ var t=15, wD=pr.pisos*hp*1.9+pr.pisos*c.D*1.5; return o({tipo:pr.pisos<=2?"ci":"ha",t:t,wD:Math.round(wD),wL:Math.round(pr.pisos*Lt*1.5),qa:st.qa},"Muro portante de bloque 15 cm (1,9 kN/m²) × "+pr.pisos+" pisos × "+f2(hp)+" m + losa con ancho tributario 1,5 m"); }
  if(id==="esc"){ var Hh=hp/2, n=Math.round(Hh*100/17.5); return o({H:+Hh.toFixed(2),Lh:+((n-1)*.28).toFixed(2),ch:17.5},"Tramo de media altura de entrepiso ("+f2(hp)+" m / 2) · huella 28 cm"); }
  if(id==="muro") return o({qa:st.qa},"qadm del proyecto");
  if(id==="mad") return o({L:+Math.min(4,G.Lmax).toFixed(2)},"Luz menor de la grilla (limitada a 4 m)");
  return o({},"Materiales del proyecto");
}

/* ───────────── recomendador ───────────── */
var PRES=[["b","Económico"],["m","Medio"],["a","Alto / desempeño"]];
function recScore(s,G,st){
  var r=sisScore(s,G.pr,st.z), sc=r.s, why=r.why.slice(), L=G.Lmax;
  if(L>s.luz[1]+.01){ var pen=Math.min(45,(L-s.luz[1])*9); sc-=pen; why.push("luz máx. "+f1(L)+" m excede el rango típico ("+s.ln+")"); }
  else if(L>=s.luz[0]-.01){ sc+=8; why.push("luz máx. "+f1(L)+" m dentro de su rango ("+s.ln+")"); }
  else if(s.c>=3.5){ sc-=6; why.push("sobredimensionado para luces cortas"); }
  if(st.suelo==="E"||st.suelo==="F"){ if(s.D<=5.2){ sc+=8; why.push("liviano: menos carga y sismo sobre suelo "+st.suelo); } else if(s.D>=6.8){ sc-=6; why.push("pesado sobre suelo blando "+st.suelo); } }
  if(st.qa<1&&s.D>=6.8){ sc-=4; why.push("qadm baja ("+f2(st.qa)+" kg/cm²)"); }
  var pr=st.pres||"m"; if(pr==="b"){ sc-=(s.c-2)*7; if(s.c<=2) why.push("ajustado a presupuesto económico"); } else if(pr==="a"){ sc+=(s.R>=8?5:0)+(s.c>=3.5?3:0); if(s.R>=8) why.push("alta ductilidad para mejor desempeño"); }
  return {s:clamp(Math.round(sc),0,100),why:why};
}

/* ───────────── pestañas nuevas: Mis datos/planos · Recomendador · Calculadoras · Memoria ───────────── */
var MODES=[["sel","Mover / elegir","Arrastra para mover, pellizca o usa la rueda para zoom. Toca una columna o viga para ver sus datos y calcularla."],["cal","Calibrar","Toca dos puntos de una cota conocida del plano y escribe la distancia real en metros."],["ex","Eje X","Toca para colocar un eje vertical (1, 2, 3…). Se ajusta a 5 cm."],["ey","Eje Y","Toca para colocar un eje horizontal (A, B, C…)."],["col","Columna","Toca una intersección de ejes para poner o quitar una columna."],["viga","Viga","Toca dos intersecciones sobre el mismo eje: se crean las vigas de cada tramo."],["muro","Muro","Toca el inicio y el fin del muro (se ajusta a intersecciones cercanas)."],["del","Borrar","Toca una columna, viga, muro o eje para eliminarlo."]];
GLY.hand='<path d="M8 13V5.5a1.5 1.5 0 0 1 3 0V12m0-1V4.5a1.5 1.5 0 0 1 3 0V12m0-6.5a1.5 1.5 0 0 1 3 0V13m0-4.5a1.5 1.5 0 0 1 3 0V15a7 7 0 0 1-12.5 4.3L4.6 15a1.6 1.6 0 0 1 2.6-1.8L8 14" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/>';
GLY.ruler='<path d="M3 17 17 3l4 4L7 21l-4-4Zm4-4 2 2m1-5 2 2m1-5 2 2" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/>';
GLY.axx='<path d="M12 3v18" stroke="currentColor" stroke-width="1.6" stroke-dasharray="4 2 1 2"/><circle cx="12" cy="4" r="3" fill="none" stroke="currentColor" stroke-width="1.4"/>';
GLY.axy='<path d="M3 12h18" stroke="currentColor" stroke-width="1.6" stroke-dasharray="4 2 1 2"/><circle cx="4" cy="12" r="3" fill="none" stroke="currentColor" stroke-width="1.4"/>';
GLY.sq='<rect x="7" y="7" width="10" height="10" fill="currentColor" fill-opacity=".35" stroke="currentColor" stroke-width="1.6"/>';
GLY.beam='<path d="M3 9h18v6H3z" fill="currentColor" fill-opacity=".2" stroke="currentColor" stroke-width="1.5"/><path d="M6 9v6M18 9v6" stroke="currentColor" stroke-width="1.2"/>';
GLY.wall='<path d="M3 8h18v8H3z" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M5 16l6-8M10 16l6-8M15 16l5-7" stroke="currentColor" stroke-width="1.1"/>';
GLY.trash='<path d="M5 7h14M10 7V4h4v3M7 7l1 13h8l1-13" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/>';
GLY.up='<path d="M12 16V4m-5 5 5-5 5 5M5 20h14" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>';
GLY.fit='<path d="M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5" fill="none" stroke="currentColor" stroke-width="1.6"/>';
GLY.minus='<path d="M5 12h14" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>';
var MODEG={sel:"hand",cal:"ruler",ex:"axx",ey:"axy",col:"sq",viga:"beam",muro:"wall",del:"trash"};
ES.calc="viga"; ES.pv={k:0,tx:0,ty:0,mode:"sel",fit:true}; ES.sel=null; ES.tmp={}; ES.cal=[]; ES.vn=null; ES.mo=null;

function xCSS(P){
  return "."+P+"-pdis{display:flex;align-items:center;gap:10px;flex-wrap:wrap;border:1px solid var(--warn);background:linear-gradient(90deg,rgba(255,92,122,.12),rgba(255,92,122,.02));padding:8px 12px;margin-bottom:12px;font-size:12px}"+
  "."+P+"-pdis b{font-family:var(--f-d);font-size:9px;letter-spacing:.16em;color:var(--warn);text-transform:uppercase}"+
  "."+P+"-dl{display:grid;grid-template-columns:minmax(0,1.6fr) minmax(280px,1fr);gap:12px;align-items:start}"+
  "@container (max-width:900px){."+P+"-dl{grid-template-columns:1fr}}"+
  "."+P+"-tools{display:flex;gap:4px;flex-wrap:wrap;margin-bottom:8px}"+
  "."+P+"-tl{min-width:44px;min-height:44px;padding:0 9px;border:1px solid var(--line2);background:rgba(3,8,14,.55);color:var(--muted);cursor:pointer;display:inline-flex;align-items:center;gap:6px;font-family:var(--f-d);font-size:8.5px;letter-spacing:.12em;text-transform:uppercase}"+
  "."+P+"-tl:hover{color:var(--ink);border-color:var(--acc)}"+
  "."+P+"-tl.on{color:var(--bg);background:var(--acc);border-color:var(--acc);box-shadow:0 0 14px rgba(var(--acc-rgb),.5)}"+
  "@container (max-width:620px){."+P+"-tl span{display:none}}"+
  "."+P+"-pvw{position:relative;height:clamp(340px,62vh,640px);overflow:hidden;touch-action:none;border:1px solid var(--line2);background:#02050a radial-gradient(circle at 50% 40%,rgba(var(--acc-rgb),.06),transparent 70%);cursor:grab;user-select:none;-webkit-user-select:none}"+
  "."+P+"-pvw.m-x{cursor:crosshair}"+
  "."+P+"-pvl{position:absolute;left:0;top:0;transform-origin:0 0;will-change:transform}"+
  "."+P+"-pvl img,."+P+"-pvl object{display:block;pointer-events:none;filter:invert(.92) hue-rotate(180deg) contrast(.9) brightness(.95);opacity:.85}"+
  "."+P+"-pvl.raw img,."+P+"-pvl.raw object{filter:none;opacity:1}"+
  "."+P+"-pvb{background:linear-gradient(rgba(var(--acc-rgb),.08) 1px,transparent 1px) 0 0/20px 20px,linear-gradient(90deg,rgba(var(--acc-rgb),.08) 1px,transparent 1px) 0 0/20px 20px,rgba(3,8,14,.6)}"+
  "."+P+"-pvs{position:absolute;left:0;top:0;overflow:visible;pointer-events:none}"+
  "."+P+"-pvs text{font-family:var(--f-m)}"+
  "."+P+"-pvh{position:absolute;left:8px;top:8px;right:8px;display:flex;gap:6px;align-items:center;pointer-events:none;font-family:var(--f-m);font-size:11px;color:var(--acc)}"+
  "."+P+"-pvh span{background:rgba(3,8,14,.8);border:1px solid var(--line2);padding:3px 8px}"+
  "."+P+"-pvz{position:absolute;right:8px;bottom:8px;display:flex;flex-direction:column;gap:4px}"+
  "."+P+"-pvz button{width:44px;height:44px;border:1px solid var(--line2);background:rgba(3,8,14,.85);color:var(--acc);cursor:pointer;display:flex;align-items:center;justify-content:center}"+
  "."+P+"-imgs{display:flex;gap:6px;flex-wrap:wrap;margin:8px 0}"+
  "."+P+"-imc{display:inline-flex;align-items:stretch;border:1px solid var(--line);background:rgba(3,8,14,.5)}"+
  "."+P+"-imc.on{border-color:var(--acc);box-shadow:0 0 10px rgba(var(--acc-rgb),.25)}"+
  "."+P+"-imc button{min-height:40px;border:0;background:transparent;color:var(--muted);cursor:pointer;padding:0 10px;font-size:12px;max-width:200px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}"+
  "."+P+"-imc.on button:first-child{color:var(--acc)}"+
  "."+P+"-imc button+button{border-left:1px solid var(--line);color:var(--warn);padding:0 8px}"+
  "."+P+"-fg{display:grid;grid-template-columns:repeat(auto-fill,minmax(150px,1fr));gap:10px 12px}"+
  "."+P+"-fgw{grid-column:1/-1}"+
  "."+P+"-fl{display:flex;flex-direction:column;gap:3px;min-width:0}"+
  "."+P+"-fl>label{font-family:var(--f-d);font-size:8px;letter-spacing:.13em;text-transform:uppercase;color:var(--muted);display:flex;justify-content:space-between;gap:6px}"+
  "."+P+"-fl>label i{font-style:normal;font-family:var(--f-m);letter-spacing:0;text-transform:none;color:var(--faint)}"+
  "."+P+"-nin{display:flex;border:1px solid var(--line2);background:rgba(0,0,0,.35)}"+
  "."+P+"-nin button{flex:none;width:36px;min-height:40px;border:0;background:rgba(var(--acc-rgb),.06);color:var(--acc);cursor:pointer;font-family:var(--f-m);font-size:16px}"+
  "."+P+"-nin input{flex:1;min-width:0;width:100%;min-height:40px;border:0;background:transparent;color:var(--ink);font-family:var(--f-m);font-size:13.5px;text-align:center;outline:none}"+
  "."+P+"-nin:focus-within{border-color:var(--acc);box-shadow:0 0 0 1px rgba(var(--acc-rgb),.4)}"+
  "."+P+"-fl ."+P+"-chips{flex-wrap:wrap;overflow:visible;padding:0}"+
  "."+P+"-fl ."+P+"-chip{min-height:40px;font-size:12px;padding:0 10px}"+
  "."+P+"-ck2{list-style:none;margin:0;padding:0;display:grid;grid-template-columns:repeat(auto-fill,minmax(260px,1fr));gap:4px 10px}"+
  "."+P+"-ck2 li{display:flex;gap:8px;align-items:flex-start;padding:6px 8px;border:1px solid var(--line);background:rgba(3,8,14,.45);font-size:12.5px}"+
  "."+P+"-ck2 li b{flex:none;width:22px;height:22px;display:flex;align-items:center;justify-content:center;font-family:var(--f-m);font-size:13px}"+
  "."+P+"-ck2 li.ok{border-color:rgba(var(--done-rgb),.4)} ."+P+"-ck2 li.ok b{color:var(--bg);background:var(--done);box-shadow:0 0 8px rgba(var(--done-rgb),.6)}"+
  "."+P+"-ck2 li.no{border-color:rgba(255,92,122,.55);background:rgba(255,92,122,.06)} ."+P+"-ck2 li.no b{color:#fff;background:var(--warn)}"+
  "."+P+"-ck2 li i{display:block;font-style:normal;font-family:var(--f-m);font-size:11px;color:var(--muted)}"+
  "."+P+"-sel{min-height:40px;width:100%;background:rgba(0,0,0,.4);border:1px solid var(--line2);color:var(--ink);font-family:var(--f-b);font-size:12.5px;padding:0 8px}"+
  "."+P+"-fls{display:grid;grid-template-columns:64px 1fr 64px;gap:6px;align-items:center;font-size:12px}"+
  "."+P+"-fls span{font-family:var(--f-m);color:var(--acc)}"+
  "."+P+"-fls em{font-style:normal;font-family:var(--f-m);color:var(--muted);text-align:right}"+
  "."+P+"-mem{border:1px solid var(--line);background:rgba(3,8,14,.5);margin-bottom:6px}"+
  "."+P+"-memh{display:grid;grid-template-columns:40px 1fr auto;gap:8px;align-items:center;padding:4px 6px}"+
  "."+P+"-memh button{min-height:40px}"+
  "."+P+"-memt{all:unset;cursor:pointer;font-size:13px;line-height:1.3}"+
  "."+P+"-memt i{display:block;font-style:normal;font-family:var(--f-m);font-size:10.5px;color:var(--faint)}"+
  "."+P+"-pre2{margin:0;padding:10px 12px;border-top:1px solid var(--line);font-family:var(--f-m);font-size:11.5px;line-height:1.55;color:var(--ink);white-space:pre-wrap;word-break:break-word;max-height:420px;overflow:auto;background:rgba(0,0,0,.25)}"+
  "."+P+"-stt{display:inline-flex;align-items:center;gap:6px;font-family:var(--f-d);font-size:9px;letter-spacing:.14em;text-transform:uppercase;padding:4px 9px;border:1px solid}"+
  "."+P+"-src{font-size:11.5px;color:var(--muted);border-left:2px solid var(--acc);padding:4px 8px;background:rgba(var(--acc-rgb),.04);margin-top:8px}"+
  "."+P+"-rk{display:grid;grid-template-columns:repeat(auto-fill,minmax(240px,1fr));gap:10px}";
}

function estExtra(P,u,ctx,st,save,api){
  var X={}, main=api.main;
  if(!st.plano) st.plano={imgs:[],cur:-1,blank:{w:1200,h:800,s:.05,ox:100,oy:100},ex:[],ey:[],cols:{},vigas:[],muros:[]};
  if(!st.calc) st.calc={}; if(!st.mem) st.mem=[]; if(!st.usos) st.usos=[];
  var pl=st.plano; if(!pl.blank) pl.blank={w:1200,h:800,s:.05,ox:100,oy:100}; ["ex","ey","vigas","muros"].forEach(function(k){ if(!pl[k]) pl[k]=[]; }); if(!pl.cols) pl.cols={};
  function dis(){ return '<div class="'+P+'-pdis">'+gly("bolt",16)+'<b>Prediseño · requiere firma de ingeniero estructural</b><span class="'+P+'-mut">Resultados académicos para dimensionar y coordinar el proyecto arquitectónico. No sustituyen el diseño estructural firmado (NEC-SE-HM / NEC-SE-DS, Ley de Ejercicio Profesional de la Ingeniería).</span></div>'; }
  function im(){ return pl.imgs[pl.cur]||pl.blank; }
  function imURL(m){ return m.url||(m.tmp&&ES.tmp[m.name])||null; }
  function G(){ return estG(ctx,st); }

  /* ════════ 1. MIS DATOS / PLANOS ════════ */
  X.datT=function(){
    var g=G(), m=im(), s=dis();
    s+='<div class="'+P+'-dl"><div class="'+P+'-card">'+u.hd("Plano de trabajo · grilla estructural",null,null,false,'<span class="'+P+'-fnt">escala '+(m.cal?'calibrada':'por defecto')+' · 1 px = '+fmt(m.s*100,2)+' cm</span>');
    s+='<div class="'+P+'-row" style="margin-bottom:8px"><button class="'+P+'-btn on" data-act="xup">'+gly("up",15)+' Subir plano</button><span class="'+P+'-fnt">Imagen (JPG/PNG) o PDF de la planta. Calibra la escala antes de dibujar.</span><input type="file" accept="image/*,application/pdf" multiple hidden data-z="xfile"></div>';
    s+='<div class="'+P+'-imgs"><div class="'+P+'-imc'+(pl.cur<0?' on':'')+'"><button data-act="ximg" data-v="-1">Lienzo en blanco</button></div>'+pl.imgs.map(function(x,i){ return '<div class="'+P+'-imc'+(i===pl.cur?' on':'')+'"><button data-act="ximg" data-v="'+i+'" title="'+E(x.name)+'">'+(x.pdf?'PDF · ':'')+E(x.name)+(x.tmp?' · temporal':'')+'</button><button data-act="xrm" data-v="'+i+'" aria-label="Quitar plano">✕</button></div>'; }).join("")+'</div>';
    s+='<div class="'+P+'-tools" role="toolbar">'+MODES.map(function(md){ return '<button class="'+P+'-tl'+(ES.pv.mode===md[0]?' on':'')+'" data-act="xm" data-v="'+md[0]+'" title="'+E(md[2])+'">'+gly(MODEG[md[0]],18)+'<span>'+md[1]+'</span></button>'; }).join("")+'</div>';
    s+=pvHTML();
    s+='<div class="'+P+'-g3" style="margin-top:10px"><div class="'+P+'-fl"><label>Luces en X (m) <i>ej.: 6 7,2 7,2 o 3x7,2</i></label><input class="'+P+'-in" data-z="spx" value="'+E(spanTxt(pl.ex))+'" inputmode="decimal"></div><div class="'+P+'-fl"><label>Luces en Y (m)</label><input class="'+P+'-in" data-z="spy" value="'+E(spanTxt(pl.ey))+'" inputmode="decimal"></div><div class="'+P+'-fl" style="justify-content:flex-end"><button class="'+P+'-btn" data-act="xspa">'+gly("check",14)+' Aplicar luces</button></div></div>';
    s+='<div class="'+P+'-row" style="margin-top:8px"><button class="'+P+'-btn" data-act="xallc">'+gly("sq",14)+' Columnas en todas las intersecciones</button><button class="'+P+'-btn" data-act="xallv">'+gly("beam",14)+' Vigas en todos los ejes</button><button class="'+P+'-btn" data-act="xclr">'+gly("trash",14)+' Limpiar grilla</button><button class="'+P+'-btn" data-act="xraw">'+(ES.raw?'Plano en negativo':'Plano original')+'</button></div>';
    s+='</div><div class="'+P+'-col"><div class="'+P+'-card" data-z="pvinfo">'+pvInfo(g)+'</div>'+datGen(g)+'</div></div>';
    return s;
  };
  function spanTxt(a){ var e=uniq(a||[]), o=[]; for(var i=1;i<e.length;i++) o.push(fmt(e[i]-e[i-1],2).replace(/\./g,"")); return o.join(" "); }
  function parseSp(t){ var o=[]; String(t||"").split(/[\s;]+/).forEach(function(p){ if(!p) return; var m=p.match(/^(\d+)\s*[x×*]\s*([\d.,]+)$/i); if(m){ for(var i=0;i<+m[1];i++) o.push(num(m[2],0)); } else o.push(num(p,0)); }); return o.filter(function(x){ return x>0&&x<100; }); }
  function datGen(g){
    var s='<div class="'+P+'-card '+P+'-ctl" style="gap:6px">'+u.hd("Datos generales de la estructura","NEC-SE-CG · NEC-SE-HM",null,false);
    s+='<div class="'+P+'-stps" style="margin-bottom:10px">'+u.stp("xnp","Nº de pisos (losas)",g.pr.pisos+(st.np?"":" · proy."))+u.stp("xhp","Altura de entrepiso",fmt(g.pr.hp,2)+" m")+'</div>';
    s+='<div class="'+P+'-lab">Uso por piso → carga viva NEC-SE-CG Tabla 9</div><div class="'+P+'-col" style="gap:4px;margin-bottom:10px">';
    g.fl.forEach(function(f,i){ s+='<div class="'+P+'-fls"><span>P'+(i+1)+(i===g.fl.length-1&&g.fl.length>1?' ⌂':'')+'</span><select class="'+P+'-sel" data-act="xuso" data-i="'+i+'" aria-label="Uso del piso '+(i+1)+'">'+CV.map(function(c){ return '<option value="'+c[0]+'"'+(c[0]===f.uso?' selected':'')+'>'+E(c[1])+'</option>'; }).join("")+'</select><em>'+fmt(f.L,1)+' kN/m²</em></div>'; });
    s+='</div>';
    s+=u.chips("suelo",Object.keys(SUELO).map(function(k){ return [k,k+' · '+SUELO[k].n,SUELO[k].d]; }),st.suelo,"Tipo de suelo (NEC-SE-DS)");
    s+=u.chips("qa",QA.map(function(q){ return [q[0],fmt(q[0],1)+' kg/cm²',q[1]]; }),st.qa,"qadm (estudio geotécnico)");
    s+=u.chips("fc",[[210,"f'c 210"],[240,"240"],[280,"280"],[350,"350 kg/cm²"]],st.fc,"Hormigón f'c");
    s+=u.chips("xfy",[[2800,"fy 2800"],[4200,"4200"],[5000,"5000 kg/cm²"]],st.fy,"Acero de refuerzo fy");
    s+=u.chips("sis",SIS1.map(function(x){ return [x.id,x.sh]; }),st.sis,"Sistema estructural");
    s+='<div class="'+P+'-fnt" style="margin-top:6px">Zona sísmica Z = '+fmt(st.z,2)+' ('+E(zonaAuto(g.pr).src)+') · todo se guarda y alimenta Cargas, Sismo, Prediseño, Recomendador y Calculadoras.</div>';
    return s+'</div>';
  }
  function pvHTML(){
    var m=im(), url=imURL(m), W=m.w||1400, H=m.h||990, lay;
    if(pl.cur<0) lay='<div class="'+P+'-pvb" style="width:'+W+'px;height:'+H+'px"></div>';
    else if(!url) lay='<div class="'+P+'-pvb" style="width:'+W+'px;height:'+H+'px;display:flex;align-items:center;justify-content:center;color:var(--warn);font-size:28px">Plano temporal no disponible — vuelve a subirlo</div>';
    else if(m.pdf) lay='<object data="'+E(url)+'" type="application/pdf" style="width:'+W+'px;height:'+H+'px"></object>';
    else lay='<img src="'+E(url)+'" alt="'+E(m.name)+'" draggable="false"'+(m.w?' style="width:'+W+'px;height:'+H+'px"':'')+'>';
    var md=MODES.filter(function(x){ return x[0]===ES.pv.mode; })[0];
    return '<div class="'+P+'-pvw'+(ES.pv.mode!=="sel"?' m-x':'')+'" data-z="pv"><div class="'+P+'-pvl'+(ES.raw?' raw':'')+'">'+lay+'<svg class="'+P+'-pvs" width="'+W+'" height="'+H+'" viewBox="0 0 '+W+' '+H+'"></svg></div>'+
      '<div class="'+P+'-pvh"><span>'+E(md[1])+'</span><span data-z="pvk">'+fmt(ES.pv.k*100,0)+' %</span></div>'+
      '<div class="'+P+'-pvz"><button data-act="xz" data-v="+" aria-label="Acercar">'+gly("plus",18)+'</button><button data-act="xz" data-v="-" aria-label="Alejar">'+gly("minus",18)+'</button><button data-act="xz" data-v="fit" aria-label="Ajustar">'+gly("fit",18)+'</button></div></div>';
  }
  function M2U(m,x){ return m.ox+x/m.s; } function M2V(m,y){ return m.oy+y/m.s; }
  function ovl(){
    var m=im(), k=ES.pv.k||1, g=G(), s="", q=1/k, W=m.w||1400, H=m.h||990;
    if(m.ox==null) return "";
    var ex=uniq(pl.ex), ey=uniq(pl.ey), x0=ex.length?M2U(m,ex[0]):m.ox, x1=ex.length?M2U(m,ex[ex.length-1]):m.ox, y0=ey.length?M2V(m,ey[0]):m.oy, y1=ey.length?M2V(m,ey[ey.length-1]):m.oy;
    var top=(ey.length?y0:m.oy)-46*q, left=(ex.length?x0:m.ox)-46*q, bot=(ey.length?y1:H)+14*q, rgt=(ex.length?x1:W)+14*q;
    if(!ey.length){ top=Math.min(top,20*q); bot=H; } if(!ex.length){ left=Math.min(left,20*q); rgt=W; }
    ex.forEach(function(x,i){ var X=M2U(m,x); s+='<line x1="'+X+'" x2="'+X+'" y1="'+(top+9*q)+'" y2="'+bot+'" stroke="#38E1FF" stroke-opacity=".7" stroke-width="1.2" vector-effect="non-scaling-stroke" stroke-dasharray="10 4 2 4"/><circle cx="'+X+'" cy="'+top+'" r="'+9*q+'" fill="rgba(3,8,14,.85)" stroke="#38E1FF" vector-effect="non-scaling-stroke"/><text x="'+X+'" y="'+(top+3.6*q)+'" font-size="'+10*q+'" text-anchor="middle" fill="#38E1FF">'+(i+1)+'</text>'; if(i>0){ var Xp=M2U(m,ex[i-1]); s+='<text x="'+((X+Xp)/2)+'" y="'+(top-14*q)+'" font-size="'+10*q+'" text-anchor="middle" fill="#B6FF3C">'+fmt(x-ex[i-1],2)+'</text><line x1="'+Xp+'" x2="'+X+'" y1="'+(top-10*q)+'" y2="'+(top-10*q)+'" stroke="#B6FF3C" stroke-opacity=".6" vector-effect="non-scaling-stroke"/>'; } });
    ey.forEach(function(y,j){ var Y=M2V(m,y); s+='<line y1="'+Y+'" y2="'+Y+'" x1="'+(left+9*q)+'" x2="'+rgt+'" stroke="#38E1FF" stroke-opacity=".7" stroke-width="1.2" vector-effect="non-scaling-stroke" stroke-dasharray="10 4 2 4"/><circle cx="'+left+'" cy="'+Y+'" r="'+9*q+'" fill="rgba(3,8,14,.85)" stroke="#38E1FF" vector-effect="non-scaling-stroke"/><text x="'+left+'" y="'+(Y+3.6*q)+'" font-size="'+10*q+'" text-anchor="middle" fill="#38E1FF">'+String.fromCharCode(65+(j%26))+'</text>'; if(j>0){ var Yp=M2V(m,ey[j-1]); s+='<text x="'+(left-14*q)+'" y="'+((Y+Yp)/2)+'" font-size="'+10*q+'" text-anchor="middle" fill="#B6FF3C" transform="rotate(-90 '+(left-14*q)+' '+((Y+Yp)/2)+')">'+fmt(y-ey[j-1],2)+'</text>'; } });
    /* muros */
    pl.muros.forEach(function(w,i){ var on=ES.sel&&ES.sel.t==="m"&&ES.sel.i===i; s+='<line x1="'+M2U(m,w[0])+'" y1="'+M2V(m,w[1])+'" x2="'+M2U(m,w[2])+'" y2="'+M2V(m,w[3])+'" stroke="'+(on?"#B6FF3C":"#FFC24B")+'" stroke-width="'+Math.max(4,.15/m.s*k)+'" stroke-opacity=".75" vector-effect="non-scaling-stroke"/>'; });
    /* vigas */
    var vg=g.grid?g.beams:[], explicit=pl.vigas.length>0;
    vg.forEach(function(b){ var on=ES.sel&&ES.sel.t==="b"&&ES.sel.x1===b.x1&&ES.sel.y1===b.y1&&ES.sel.x2===b.x2&&ES.sel.y2===b.y2; s+='<line x1="'+M2U(m,b.x1)+'" y1="'+M2V(m,b.y1)+'" x2="'+M2U(m,b.x2)+'" y2="'+M2V(m,b.y2)+'" stroke="'+(on?"#B6FF3C":"#38E1FF")+'" stroke-width="'+(explicit?4:2)+'" stroke-opacity="'+(explicit||on?.9:.35)+'" vector-effect="non-scaling-stroke"'+(on?' style="filter:drop-shadow(0 0 4px #B6FF3C)"':'')+'/>'; });
    /* columnas */
    var cs=Math.max(8*q,(g.c.side/100)/m.s), expl=Object.keys(pl.cols).length>0;
    if(g.grid) g.cols.forEach(function(c){ var X=M2U(m,c.x), Y=M2V(m,c.y), on=ES.sel&&ES.sel.t==="c"&&ES.sel.k===c.k; s+='<rect x="'+(X-cs/2)+'" y="'+(Y-cs/2)+'" width="'+cs+'" height="'+cs+'" fill="'+(on?"#B6FF3C":expl?"#38E1FF":"rgba(56,225,255,.35)")+'" stroke="'+(on?"#B6FF3C":"#38E1FF")+'" vector-effect="non-scaling-stroke"'+(on?' style="filter:drop-shadow(0 0 6px #B6FF3C)"':'')+'/>'; });
    if(ES.vn) s+='<circle cx="'+M2U(m,ES.vn[0])+'" cy="'+M2V(m,ES.vn[1])+'" r="'+12*q+'" fill="none" stroke="#B6FF3C" stroke-width="2" vector-effect="non-scaling-stroke" class="'+P+'-pul"/>';
    ES.cal.forEach(function(p){ s+='<circle cx="'+p[0]+'" cy="'+p[1]+'" r="'+6*q+'" fill="#FF5C7A"/>'; });
    if(ES.cal.length===2) s+='<line x1="'+ES.cal[0][0]+'" y1="'+ES.cal[0][1]+'" x2="'+ES.cal[1][0]+'" y2="'+ES.cal[1][1]+'" stroke="#FF5C7A" stroke-width="2" vector-effect="non-scaling-stroke" stroke-dasharray="6 4"/>';
    return s;
  }
  function pvInfo(g){
    var md=MODES.filter(function(x){ return x[0]===ES.pv.mode; })[0], s='<div class="'+P+'-h">'+E(md[1])+'</div><div class="'+P+'-fnt" style="margin-bottom:8px">'+E(md[2])+'</div>';
    if(ES.pv.mode==="cal"){ var m=im(), dpx=ES.cal.length===2?Math.hypot(ES.cal[1][0]-ES.cal[0][0],ES.cal[1][1]-ES.cal[0][1]):0;
      s+='<div class="'+P+'-row"><span class="'+P+'-mono">'+ES.cal.length+'/2 puntos'+(dpx?' · '+fmt(dpx,0)+' px':'')+'</span></div>';
      if(dpx) s+='<div class="'+P+'-row" style="margin-top:6px"><div class="'+P+'-fl" style="flex:1"><label>Distancia real (m)</label><input class="'+P+'-in" data-z="cald" inputmode="decimal" value="'+(m.cald?fmt(m.cald,2):"")+'" placeholder="ej.: 7,20"></div><button class="'+P+'-btn on" data-act="xcal" style="align-self:flex-end">Aplicar escala</button></div>'; }
    if(ES.sel){ var e=null;
      if(ES.sel.t==="c"){ e=g.cols.filter(function(c){ return c.k===ES.sel.k; })[0]; if(e) s+='<div class="'+P+'-kpis" style="margin-bottom:8px">'+u.kpi("Columna "+e.lab,{int:"interior",bor:"borde",esq:"esquina"}[e.tipo],"At = "+fmt(e.ax,2)+" × "+fmt(e.ay,2)+" = "+fmt(e.At,2)+" m²")+u.kpi("Pu ("+g.pr.pisos+" p)",fmt(e.Pu,0)+" kN","PD "+fmt(e.PD,0)+" · PL "+fmt(e.PL,0))+'</div><div class="'+P+'-row"><button class="'+P+'-btn on" data-act="xgo" data-v="col">Calcular columna</button><button class="'+P+'-btn" data-act="xgo" data-v="zap">Calcular zapata</button></div>'; }
      if(ES.sel.t==="b"){ e=g.beams.filter(function(b){ return b.x1===ES.sel.x1&&b.y1===ES.sel.y1&&b.x2===ES.sel.x2&&b.y2===ES.sel.y2; })[0]; if(e) s+='<div class="'+P+'-kpis" style="margin-bottom:8px">'+u.kpi(e.lab,fmt(e.L,2)+" m",{s:"un vano",ce:"vano extremo",ci:"vano interior"}[e.ap])+u.kpi("Ancho tributario",fmt(e.tr,2)+" m","wu ≈ "+fmt((g.fl[0]?g.fl[0].wu:0)*e.tr,1)+" kN/m")+'</div><div class="'+P+'-row"><button class="'+P+'-btn on" data-act="xgo" data-v="viga">Calcular viga H.A.</button><button class="'+P+'-btn" data-act="xgo" data-v="avig">Viga de acero</button></div>'; }
    }
    var ex=uniq(pl.ex), ey=uniq(pl.ey), mL=pl.muros.reduce(function(a,w){ return a+Math.hypot(w[2]-w[0],w[3]-w[1]); },0);
    s+='<div class="'+P+'-kpis" style="margin-top:10px">'+u.kpi("Ejes",ex.length+" X · "+ey.length+" Y",g.grid?g.nx+" × "+g.ny+" vanos":"dibuja ≥ 2 de cada uno")+u.kpi("Luz máx.",fmt(g.Lmax,2)+" m",g.grid?"de la grilla":"de Cargas (grilla tipo)")+u.kpi("Columnas",g.grid?g.cols.length+"":"—",Object.keys(pl.cols).length?"marcadas":"todas las intersecciones")+u.kpi("Vigas · muros",(g.grid?g.beams.length:0)+" · "+fmt(mL,1)+" m",pl.vigas.length?"marcadas":"todos los ejes")+'</div>';
    if(g.grid) s+='<button class="'+P+'-btn" style="margin-top:8px;width:100%" data-act="xuse">'+gly("check",14)+' Usar luces máx. en Cargas y Prediseño ('+fmt(Math.max.apply(null,g.sx),2)+' × '+fmt(Math.max.apply(null,g.sy),2)+' m)</button>';
    return s;
  }
  function pvRefresh(){ var sv=main.querySelector("."+P+"-pvs"); if(sv) sv.innerHTML=ovl(); var inf=main.querySelector('[data-z="pvinfo"]'); if(inf) inf.innerHTML=pvInfo(G()); var kk=main.querySelector('[data-z="pvk"]'); if(kk) kk.textContent=fmt(ES.pv.k*100,0)+" %"; }
  function fit(w){ var m=im(), W=m.w||1400, H=m.h||990, cw=w.clientWidth||600, ch=w.clientHeight||400, k=Math.min(cw/W,ch/H)*.94; ES.pv.k=k; ES.pv.tx=(cw-W*k)/2; ES.pv.ty=(ch-H*k)/2; ES.pv.fit=false; }
  function apply(lay){ lay.style.transform="translate("+ES.pv.tx.toFixed(1)+"px,"+ES.pv.ty.toFixed(1)+"px) scale("+ES.pv.k+")"; }
  function zoomAt(w,lay,f,cx,cy){ var V=ES.pv, k2=clamp(V.k*f,.02,20); V.tx=cx-(cx-V.tx)*k2/V.k; V.ty=cy-(cy-V.ty)*k2/V.k; V.k=k2; apply(lay); }
  var zt; function zEnd(){ clearTimeout(zt); zt=setTimeout(pvRefresh,140); }
  function nearNode(u0,v0,rad){ var m=im(), k=ES.pv.k, best=null, bd=rad; uniq(pl.ex).forEach(function(x){ uniq(pl.ey).forEach(function(y){ var d=Math.hypot((M2U(m,x)-u0)*k,(M2V(m,y)-v0)*k); if(d<bd){ bd=d; best=[x,y]; } }); }); return best; }
  function segD(px,py,a,b,c,d){ var dx=c-a, dy=d-b, L=dx*dx+dy*dy, t=L?clamp(((px-a)*dx+(py-b)*dy)/L,0,1):0; return Math.hypot(px-a-t*dx,py-b-t*dy); }
  function r2(x){ return Math.round(x*100)/100; }
  function tap(u0,v0){
    var m=im(), md=ES.pv.mode, k=ES.pv.k, g;
    if(md==="cal"){ if(ES.cal.length>=2) ES.cal=[]; ES.cal.push([u0,v0]); pvRefresh(); var ci=main.querySelector('[data-z="cald"]'); if(ci) ci.focus(); return; }
    if(md==="ex"||md==="ey"){
      if(m.ox==null){ m.ox=u0; m.oy=v0; }
      var val=Math.round((md==="ex"?(u0-m.ox):(v0-m.oy))*m.s*20)/20, arr=md==="ex"?pl.ex:pl.ey;
      if(arr.some(function(e){ return Math.abs(e-val)<.15; })){ ctx.toast("Ya hay un eje a menos de 15 cm"); return; }
      arr.push(val); arr.sort(numsort); save(); pvRefresh(); return; }
    if(m.ox==null){ ctx.toast("Primero dibuja los ejes (o escribe las luces)"); return; }
    var x=(u0-m.ox)*m.s, y=(v0-m.oy)*m.s;
    if(md==="col"){ var n=nearNode(u0,v0,30); if(!n){ ctx.toast("Toca cerca de una intersección de ejes"); return; } var key=n[0].toFixed(2)+","+n[1].toFixed(2); if(pl.cols[key]) delete pl.cols[key]; else pl.cols[key]=1; save(); pvRefresh(); return; }
    if(md==="viga"){ var n2=nearNode(u0,v0,30); if(!n2){ ctx.toast("Toca una intersección de ejes"); return; }
      if(!ES.vn){ ES.vn=n2; pvRefresh(); return; }
      var a=ES.vn; ES.vn=null;
      if(Math.abs(a[0]-n2[0])<.02&&Math.abs(a[1]-n2[1])>.02){ var ys=uniq(pl.ey).filter(function(e){ return e>=Math.min(a[1],n2[1])-.01&&e<=Math.max(a[1],n2[1])+.01; }); for(var i=1;i<ys.length;i++) addV([a[0],ys[i-1],a[0],ys[i]]); }
      else if(Math.abs(a[1]-n2[1])<.02&&Math.abs(a[0]-n2[0])>.02){ var xs=uniq(pl.ex).filter(function(e){ return e>=Math.min(a[0],n2[0])-.01&&e<=Math.max(a[0],n2[0])+.01; }); for(var j=1;j<xs.length;j++) addV([xs[j-1],a[1],xs[j],a[1]]); }
      else ctx.toast("La viga debe ir sobre un mismo eje");
      save(); pvRefresh(); return; }
    if(md==="muro"){ var n3=nearNode(u0,v0,22), p=n3||[r2(x),r2(y)];
      if(!ES.vn){ ES.vn=p; pvRefresh(); return; } var a2=ES.vn; ES.vn=null; if(Math.hypot(p[0]-a2[0],p[1]-a2[1])>.1) pl.muros.push([a2[0],a2[1],p[0],p[1]]); save(); pvRefresh(); return; }
    g=G();
    var hitC=null, hb=null, hm=-1, bd=24;
    if(g.grid) g.cols.forEach(function(c){ var d=Math.hypot((M2U(m,c.x)-u0)*k,(M2V(m,c.y)-v0)*k); if(d<bd){ bd=d; hitC=c; } });
    if(!hitC){ var bb=14; if(g.grid) g.beams.forEach(function(b){ var d=segD(u0,v0,M2U(m,b.x1),M2V(m,b.y1),M2U(m,b.x2),M2V(m,b.y2))*k; if(d<bb){ bb=d; hb=b; } }); pl.muros.forEach(function(w,i){ var d=segD(u0,v0,M2U(m,w[0]),M2V(m,w[1]),M2U(m,w[2]),M2V(m,w[3]))*k; if(d<bb){ bb=d; hm=i; hb=null; } }); }
    if(md==="sel"){ ES.sel=hitC?{t:"c",k:hitC.k}:hb?{t:"b",x1:hb.x1,y1:hb.y1,x2:hb.x2,y2:hb.y2}:hm>=0?{t:"m",i:hm}:null; pvRefresh(); return; }
    if(md==="del"){
      if(hitC){ if(!Object.keys(pl.cols).length) g.cols.forEach(function(c){ pl.cols[c.k]=1; }); delete pl.cols[hitC.k]; if(!Object.keys(pl.cols).length) pl.cols["_"]=0; }
      else if(hb){ if(!pl.vigas.length) pl.vigas=g.beams.map(function(b){ return [b.x1,b.y1,b.x2,b.y2]; }); pl.vigas=pl.vigas.filter(function(v){ return !(v[0]===hb.x1&&v[1]===hb.y1&&v[2]===hb.x2&&v[3]===hb.y2); }); }
      else if(hm>=0) pl.muros.splice(hm,1);
      else { var ax=null; uniq(pl.ex).forEach(function(e){ if(Math.abs((M2U(m,e)-u0)*k)<12) ax=["ex",e]; }); uniq(pl.ey).forEach(function(e){ if(Math.abs((M2V(m,e)-v0)*k)<12) ax=["ey",e]; });
        if(ax){ pl[ax[0]]=pl[ax[0]].filter(function(e){ return Math.abs(e-ax[1])>.01; }); ctx.toast("Eje eliminado"); } else { ctx.toast("Nada que borrar aquí"); return; } }
      ES.sel=null; save(); pvRefresh(); }
  }
  function addV(v){ v=v.map(r2); if(!pl.vigas.some(function(w){ return w[0]===v[0]&&w[1]===v[1]&&w[2]===v[2]&&w[3]===v[3]; })) pl.vigas.push(v); }
  function pvBind(){
    var w=main.querySelector('[data-z="pv"]'); if(!w) return; var lay=w.querySelector("."+P+"-pvl"), ptr={}, s0=null, pin=null;
    if(ES.pv.fit||!ES.pv.k) fit(w); apply(lay); w.querySelector("."+P+"-pvs").innerHTML=ovl(); var kk0=w.querySelector('[data-z="pvk"]'); if(kk0) kk0.textContent=fmt(ES.pv.k*100,0)+" %";
    var img=lay.querySelector("img"); if(img) img.addEventListener("load",function(){ var m=im(); if(!m.w||m.w!==img.naturalWidth){ m.w=img.naturalWidth; m.h=img.naturalHeight; img.style.width=m.w+"px"; img.style.height=m.h+"px"; var sv=w.querySelector("."+P+"-pvs"); sv.setAttribute("width",m.w); sv.setAttribute("height",m.h); sv.setAttribute("viewBox","0 0 "+m.w+" "+m.h); fit(w); apply(lay); pvRefresh(); save(); } });
    w.addEventListener("pointerdown",function(e){ if(e.target.closest("button")) return; try{ w.setPointerCapture(e.pointerId); }catch(_){} ptr[e.pointerId]=[e.clientX,e.clientY]; var ids=Object.keys(ptr);
      if(ids.length===1) s0={x:e.clientX,y:e.clientY,tx:ES.pv.tx,ty:ES.pv.ty,mv:false};
      else if(ids.length===2){ var a=ptr[ids[0]], b=ptr[ids[1]]; pin={d:Math.hypot(a[0]-b[0],a[1]-b[1]),k:ES.pv.k,tx:ES.pv.tx,ty:ES.pv.ty,cx:(a[0]+b[0])/2,cy:(a[1]+b[1])/2}; if(s0) s0.mv=true; } });
    w.addEventListener("pointermove",function(e){ if(!ptr[e.pointerId]) return; ptr[e.pointerId]=[e.clientX,e.clientY]; var ids=Object.keys(ptr), r=w.getBoundingClientRect();
      if(ids.length>=2&&pin){ var a=ptr[ids[0]], b=ptr[ids[1]], d=Math.hypot(a[0]-b[0],a[1]-b[1]), k2=clamp(pin.k*d/pin.d,.02,20), cx=pin.cx-r.left, cy=pin.cy-r.top, mx=(a[0]+b[0])/2-r.left, my=(a[1]+b[1])/2-r.top;
        ES.pv.k=k2; ES.pv.tx=mx-(cx-pin.tx)*k2/pin.k; ES.pv.ty=my-(cy-pin.ty)*k2/pin.k; apply(lay); return; }
      if(s0){ var dx=e.clientX-s0.x, dy=e.clientY-s0.y; if(!s0.mv&&Math.hypot(dx,dy)>6) s0.mv=true; if(s0.mv){ ES.pv.tx=s0.tx+dx; ES.pv.ty=s0.ty+dy; apply(lay); } } });
    function up(e){ if(!ptr[e.pointerId]) return; var ids=Object.keys(ptr), r=w.getBoundingClientRect();
      if(ids.length===1&&s0&&!s0.mv&&e.type==="pointerup"){ tap((e.clientX-r.left-ES.pv.tx)/ES.pv.k,(e.clientY-r.top-ES.pv.ty)/ES.pv.k); }
      delete ptr[e.pointerId]; if(Object.keys(ptr).length<2&&pin){ pin=null; zEnd(); } if(!Object.keys(ptr).length) s0=null; }
    w.addEventListener("pointerup",up); w.addEventListener("pointercancel",up);
    w.addEventListener("wheel",function(e){ e.preventDefault(); var r=w.getBoundingClientRect(); zoomAt(w,lay,Math.exp(-e.deltaY*.0015),e.clientX-r.left,e.clientY-r.top); zEnd(); },{passive:false});
    var fi=main.querySelector('[data-z="xfile"]'); if(fi) fi.addEventListener("change",function(){ upFiles(fi.files); fi.value=""; });
  }
  function upFiles(fl){
    var files=Array.prototype.slice.call(fl||[]); if(!files.length) return;
    var imgs=files.filter(function(f){ return /^image\//.test(f.type); }), pdfs=files.filter(function(f){ return f.type==="application/pdf"||/\.pdf$/i.test(f.name); });
    function addTmp(f){ var url=URL.createObjectURL(f); ES.tmp[f.name]=url; pl.imgs.push({name:f.name,tmp:true,pdf:!/^image\//.test(f.type),url:null,s:.02,ox:null,oy:null,w:/^image\//.test(f.type)?null:1400,h:/^image\//.test(f.type)?null:990}); }
    var p=imgs.length?Promise.resolve(ctx.upload(imgs)).catch(function(){ return []; }):Promise.resolve([]);
    p.then(function(r){ r=r||[];
      if(r.length){ r.forEach(function(x,i){ pl.imgs.push({name:(imgs[i]&&imgs[i].name)||("plano "+(pl.imgs.length+1)),url:x.url,id:x.id,pdf:false,s:.02,ox:null,oy:null}); }); }
      else if(imgs.length){ imgs.forEach(addTmp); ctx.toast("Sin permiso de subida: el plano queda TEMPORAL (se pierde al cerrar). La grilla sí se guarda."); }
      if(pdfs.length){ pdfs.forEach(addTmp); ctx.toast("PDF abierto como vista temporal. Para calibrar con precisión exporta la lámina a PNG/JPG."); }
      pl.cur=pl.imgs.length-1; ES.pv.fit=true; ES.pv.mode="cal"; ES.cal=[]; save(); api.repaint();
    });
  }

  /* ════════ 2. RECOMENDADOR ════════ */
  X.recT=function(){
    var g=G(), list=SIS1.map(function(s){ var r=recScore(s,g,st); return {s:s,sc:r.s,why:r.why}; }).sort(function(a,b){ return b.sc-a.sc; }), b=list[0];
    var s=dis()+'<div class="'+P+'-card">'+u.hd("Recomendador estructural · "+E(g.pr.tipoN),"NEC-SE-DS · NEC-SE-HM",null,false);
    s+='<div class="'+P+'-kpis">'+u.kpi("Luz máxima",fmt(g.Lmax,2)+" m",g.grid?"de tu grilla":"grilla tipo de Cargas")+u.kpi("Pisos",g.pr.pisos+"","hp "+fmt(g.pr.hp,2)+" m")+u.kpi("Zona sísmica","Z = "+fmt(st.z,2),"suelo "+st.suelo+" · qadm "+fmt(st.qa,2))+u.kpi("Uso",E(g.fl[0]?g.fl[0].cv[1].replace(/^[^·]+· /,""):""),ctx.tipo&&ctx.tipo.cat?E(ctx.tipo.cat.n):"")+'</div>';
    s+='<div style="margin-top:10px">'+u.chips("xpres",PRES,st.pres||"m","Presupuesto relativo")+'</div>';
    s+='<div class="'+P+'-note" style="margin-top:8px">Recomendado: <b>'+E(b.s.n)+'</b> ('+b.sc+'/100) — '+E(b.why.join("; ")||"equilibrio de luces, pisos y sismo")+'.</div></div>';
    s+='<div class="'+P+'-rk" style="margin-top:12px">'+list.map(function(x,i){ var col=x.sc>=70?"var(--done)":x.sc>=45?"var(--acc)":"var(--warn)", on=x.s.id===st.sis;
      return '<div class="'+P+'-card'+(on?' '+P+'-sc on':'')+'" style="'+(i>2?'opacity:.78':'')+'">'+sisDib(P,x.s.dib,on)+'<div class="'+P+'-row"><b style="font-family:var(--f-d);font-size:10px;letter-spacing:.1em">'+(i+1)+' · '+E(x.s.sh)+'</b><span class="'+P+'-sp"></span><span class="'+P+'-mono" style="color:'+col+'">'+x.sc+'</span></div><div class="'+P+'-bar" style="margin:6px 0"><i style="width:'+x.sc+'%;background:'+col+'"></i></div><div class="'+P+'-fnt">'+E(x.why.join(" · ")||"sin observaciones")+'</div><button class="'+P+'-btn'+(on?' on':'')+'" style="margin-top:8px;width:100%" data-act="sis" data-v="'+x.s.id+'">'+(on?gly("check",14)+' Elegido':'Elegir')+'</button></div>'; }).join("")+'</div>';
    /* predimensiones sobre la grilla */
    var c=g.c, fcM=st.fc*KGMPA, qa=st.qa*98.0665, rows={int:null,bor:null,esq:null};
    g.cols.forEach(function(x){ var r=rows[x.tipo]; if(!r||x.Pu>r.Pu) rows[x.tipo]=x; });
    function side(x){ var al=x.tipo==="int"?.45:.35, pc=1.2*Math.pow(c.side/100,2)*24*g.pr.hp*g.pr.pisos; return Math.max(30,rnd(Math.sqrt((x.Pu+pc)*1000/(al*fcM))/10,5)); }
    function zap(x){ return Math.max(1,rnd(Math.sqrt(1.1*(x.PD+x.PL)/qa),.05)); }
    var spans=uniq(g.sx.concat(g.sy));
    s+='<div class="'+P+'-card" style="margin-top:12px">'+u.hd("Predimensiones para la grilla "+(g.grid?"dibujada":"tipo"),"NEC-SE-HM · ACI 318-19","rp1",!!ES.fx.rp1,'<span class="'+P+'-fnt">'+g.nx+' × '+g.ny+' vanos · '+g.cols.length+' columnas</span>');
    s+='<div class="'+P+'-kpis">'+u.kpi("Losa",c.h+" cm",E(LOSA.filter(function(l){return l[0]===st.losa;})[0][1])+" · L "+fmt(c.L,2)+" m")+'</div>';
    s+='<div class="'+P+'-tw" style="margin-top:8px"><table class="'+P+'-tb"><thead><tr><th>Columna</th><th>At m²</th><th>Pu kN</th><th>Sección</th><th>Zapata B×B</th></tr></thead><tbody>'+["int","bor","esq"].filter(function(t){return rows[t];}).map(function(t){ var x=rows[t], sd=side(x); return '<tr><td>'+{int:"Interior",bor:"Borde",esq:"Esquina"}[t]+' · '+x.lab+'</td><td>'+fmt(x.At,2)+'</td><td>'+fmt(x.Pu,0)+'</td><td>'+sd+' × '+sd+' cm</td><td>'+fmt(zap(x),2)+' m</td></tr>'; }).join("")+'</tbody></table></div>';
    s+='<div class="'+P+'-tw" style="margin-top:8px"><table class="'+P+'-tb"><thead><tr><th>Viga · luz</th><th>h = L/'+fmt(st.rv,1)+'</th><th>b</th><th>h mín ACI (continua)</th></tr></thead><tbody>'+spans.map(function(L){ var hv=Math.max(30,rnd(L*100/st.rv,5)), bv=Math.max(25,rnd(hv*.5,5)); return '<tr><td>'+fmt(L,2)+' m</td><td>'+hv+' cm</td><td>'+bv+' cm</td><td>'+fmt(L*100/18.5,1)+' cm</td></tr>'; }).join("")+'</tbody></table></div>';
    s+=u.fx(!!ES.fx.rp1,'Columna: Ag = (Σwu·At + peso propio) / (α·f\'c), α = 0,45 interior · 0,35 borde/esquina · mín. 30 × 30 cm (NEC-SE-HM)<br>Zapata: B = √(1,10·Ps/qadm) con qadm = '+fmt(st.qa,2)+' kg/cm² = '+fmt(qa,1)+' kPa<br>Viga: h = L/'+fmt(st.rv,1)+' (pórtico sísmico) · b ≈ h/2 ≥ 25 cm<br>Cargas por piso: '+g.fl.map(function(f){ return 'P'+f.n+' wu '+fmt(f.wu,2); }).join(" · ")+' kN/m²');
    s+='<div class="'+P+'-row" style="margin-top:10px">'+(g.grid?'<button class="'+P+'-btn" data-act="xuse">Aplicar luces máx. a Cargas / Prediseño</button>':'<button class="'+P+'-btn" data-act="tab" data-v="dat">Dibujar mi grilla</button>')+'<button class="'+P+'-btn on" data-act="xgo" data-v="col">Calcular columna crítica</button><button class="'+P+'-btn" data-act="xgo" data-v="viga">Calcular viga crítica</button><button class="'+P+'-btn" data-act="xgo" data-v="zap">Calcular zapata</button></div>';
    return s+'</div>';
  };

  /* ════════ 3. CALCULADORAS ════════ */
  function cv(id){ var d=CALCI[id].def, o={}, s=st.calc[id]||{}; for(var k in d) o[k]=s[k]!=null?s[k]:d[k]; return o; }
  function setCv(id,o){ st.calc[id]=o; save(); }
  function field(f,v){
    var k=f[0];
    if(Array.isArray(f[2])) return '<div class="'+P+'-fl '+(f[2].length>3||String(f[2][0][1]).length>14?P+'-fgw':'')+'"><label>'+E(f[1])+'</label><div class="'+P+'-chips">'+f[2].map(function(o){ return '<button class="'+P+'-chip'+(String(v[k])===String(o[0])?' on':'')+'" data-act="xc" data-k="'+k+'" data-v="'+E(o[0])+'">'+E(o[1])+'</button>'; }).join("")+'</div></div>';
    var s='<div class="'+P+'-fl"><label>'+E(f[1])+' <i>'+E(f[2])+'</i></label><div class="'+P+'-nin"><button data-act="xs" data-k="'+k+'" data-d="-1" aria-label="menos">−</button><input data-act="xf" data-k="'+k+'" value="'+E(fmt(v[k],f[3]<.1?2:f[3]<1?2:0).replace(/\./g,""))+'" inputmode="decimal" aria-label="'+E(f[1])+'"><button data-act="xs" data-k="'+k+'" data-d="1" aria-label="más">+</button></div>';
    if(f[6]) s+='<div class="'+P+'-chips" style="flex-wrap:wrap;padding-top:4px">'+f[6].map(function(o){ return '<button class="'+P+'-chip'+(+v[k]===o[0]?' on':'')+'" style="min-height:32px;font-size:11px" data-act="xc" data-k="'+k+'" data-v="'+o[0]+'">'+E(o[1])+'</button>'; }).join("")+'</div>';
    return s+'</div>';
  }
  function runCalc(id){ var C=CALCI[id], v=cv(id), R; try{ R=C.fn(v); }catch(e){ R=Res(); R.err=String(e&&e.message||e); } R.v=v; return R; }
  function calcOut(id){
    var C=CALCI[id], R=runCalc(id), nOk=R.C.filter(function(c){ return c[1]; }).length, nNo=R.C.filter(function(c){ return c[1]===false; }).length, ok=!nNo&&!R.err;
    var s='<div class="'+P+'-card'+(ok?'':' '+P+'-warnbox')+'">'+u.hd(C.n,C.nor,"c_"+id,!!ES.fx["c_"+id],'<span class="'+P+'-stt" style="color:'+(ok?'var(--done)':'var(--warn)')+';border-color:currentColor">'+(ok?'✔ cumple':'✖ '+nNo+' no cumple')+'</span>');
    if(R.err) return s+'<div class="'+P+'-alert">Revisa los datos: '+E(R.err)+'</div></div>';
    s+='<div class="'+P+'-kpis">'+R.K.map(function(k){ return u.kpi(k[0],E(k[1]),E(k[2]),k[3]||null); }).join("")+'</div>';
    s+='<ul class="'+P+'-ck2" style="margin-top:10px">'+R.C.map(function(c){ return '<li class="'+(c[1]?'ok':c[1]===false?'no':'')+'"><b>'+(c[1]?'✔':c[1]===false?'✖':'i')+'</b><span>'+E(c[0])+'<i>'+E(c[2])+'</i></span></li>'; }).join("")+'</ul>';
    s+='<div style="margin-top:10px">'+dibRes(P,R)+'</div>';
    s+=u.fx(!!ES.fx["c_"+id],stepsHTML(R.S.a)+'<small>PREDISEÑO · '+E(C.nor)+' · requiere firma de ingeniero estructural.</small>');
    s+='<div class="'+P+'-row" style="margin-top:10px"><button class="'+P+'-btn on" data-act="xmem">'+gly("plus",14)+' Agregar a memoria de cálculo</button><span class="'+P+'-fnt">'+st.mem.length+' en memoria · capítulo 10.2</span>'+(R.lig&&R.lig!==R.perf?'<button class="'+P+'-btn" data-act="xperf" data-v="'+E(R.lig)+'">Usar '+E(R.lig)+'</button>':'')+'</div>';
    return s+'</div>';
  }
  X.calcT=function(){
    var id=ES.calc, C=CALCI[id], v=cv(id), s=dis();
    s+='<div class="'+P+'-chips" style="flex-wrap:wrap;overflow:visible;margin-bottom:10px">'+CALC.map(function(c){ return '<button class="'+P+'-chip'+(c.id===id?' on':'')+'" data-act="xcalc" data-v="'+c.id+'">'+E(c.n)+'</button>'; }).join("")+'</div>';
    s+='<div class="'+P+'-g2"><div class="'+P+'-card '+P+'-ctl"><div class="'+P+'-hd" style="margin:0"><span class="'+P+'-h">Entradas · '+E(C.n)+'</span></div>';
    s+='<div class="'+P+'-row"><button class="'+P+'-btn on" data-act="xproj">'+gly("layers",14)+' Usar datos del proyecto</button><button class="'+P+'-btn" data-act="xdef">Valores de ejemplo</button></div>';
    if(st.calc["_src_"+id]) s+='<div class="'+P+'-src">'+E(st.calc["_src_"+id])+'</div>';
    s+='<div class="'+P+'-fg">'+C.f(v).map(function(f){ return field(f,v); }).join("")+'</div>';
    s+='<div class="'+P+'-fnt">1 MPa ≈ 10,2 kg/cm² · 1 kN ≈ 102 kgf · 1 kN/m² ≈ 102 kg/m². Equivalencia nominal usada en Ecuador: 210 kg/cm² ≈ 21 MPa, 4200 kg/cm² ≈ 420 MPa.</div>';
    s+='</div><div class="'+P+'-col" data-z="xout">'+calcOut(id)+'</div></div>';
    return s;
  };

  /* ════════ 4. MEMORIA ════════ */
  X.memT=function(){
    var s=dis()+'<div class="'+P+'-card">'+u.hd("Memoria de cálculo · capítulo 10.2",null,null,false,'<span class="'+P+'-fnt">'+st.mem.length+' elemento(s)</span>');
    s+='<div class="'+P+'-row" style="margin-bottom:10px"><button class="'+P+'-btn on" data-act="xtxt"'+(st.mem.length?'':' disabled')+'>'+gly("dl",14)+' Exportar .txt</button><button class="'+P+'-btn" data-act="xcsv"'+(st.mem.length?'':' disabled')+'>'+gly("dl",14)+' Exportar CSV</button><button class="'+P+'-btn" data-act="tab" data-v="calc">'+gly("plus",14)+' Ir a calculadoras</button>'+(st.mem.length?'<span class="'+P+'-sp"></span><button class="'+P+'-btn" data-act="xmclr">'+gly("trash",14)+' Vaciar</button>':'')+'</div>';
    if(!st.mem.length) s+='<p class="'+P+'-mut">Aún no hay cálculos. En cada calculadora toca «Agregar a memoria de cálculo». El .txt sale con el procedimiento paso a paso y las verificaciones; el CSV con los resultados tabulados (separador «;» para Excel en español).</p>';
    st.mem.forEach(function(m,i){ var o=ES.mo===i; s+='<div class="'+P+'-mem"><div class="'+P+'-memh"><span class="'+P+'-stt" style="justify-content:center;color:'+(m.ok?'var(--done)':'var(--warn)')+';border-color:currentColor;padding:4px">'+(m.ok?'✔':'✖')+'</span><button class="'+P+'-memt" data-act="xmo" data-v="'+i+'">10.2.'+(i+1)+' · '+E(m.t)+'<i>'+E(m.sum)+' · '+E(m.f)+'</i></button><button class="'+P+'-btn" data-act="xmdel" data-v="'+i+'" aria-label="Quitar">'+gly("x",14)+'</button></div>'+(o?'<pre class="'+P+'-pre2">'+E(memTxt(m,i))+'</pre>':'')+'</div>'; });
    return s+'</div>';
  };
  function memTxt(m,i){ return "10.2."+(i+1)+" "+m.t.toUpperCase()+"\n"+m.txt+"\n\n  VERIFICACIONES\n"+m.chk.map(function(c){ return "    ["+(c[1]?"OK":c[1]===false?"NO CUMPLE":"i")+"] "+c[0]+(c[2]?" — "+c[2]:""); }).join("\n"); }
  function head(){ var g=G(), p=ctx.P||{}, l=p.loc||{}; return "MEMORIA DE CÁLCULO ESTRUCTURAL — PREDISEÑO\nCapítulo 10.2 · "+(p.nombre||"Proyecto")+"\nUbicación: "+[l.parroquia,l.canton,l.provincia,l.pais].filter(Boolean).join(", ")+"\nFecha: "+new Date().toLocaleDateString("es-EC")+"\n\nADVERTENCIA: Prediseño académico. Requiere revisión, diseño definitivo y firma de un ingeniero estructural\n(NEC-SE-HM, NEC-SE-DS, NEC-SE-CG, NEC-SE-GC; ACI 318-19; AISC 360-16).\n\nDATOS GENERALES\n  Pisos: "+g.pr.pisos+" · altura de entrepiso: "+fmt(g.pr.hp,2)+" m · sistema: "+(SIS1I[st.sis]||SIS1[0]).n+"\n  f'c = "+st.fc+" kg/cm² · fy = "+st.fy+" kg/cm² · suelo tipo "+st.suelo+" · qadm = "+fmt(st.qa,2)+" kg/cm² · Z = "+fmt(st.z,2)+"\n  Usos: "+g.fl.map(function(f){ return "P"+f.n+" "+f.cv[1]+" ("+fmt(f.L,1)+" kN/m²)"; }).join("; ")+"\n  Grilla: luces X "+(g.sx.map(function(x){return fmt(x,2);}).join(" / ")||"-")+" m · luces Y "+(g.sy.map(function(x){return fmt(x,2);}).join(" / ")||"-")+" m\n"; }
  function exportTxt(){ var t=head()+"\n"+st.mem.map(function(m,i){ return memTxt(m,i); }).join("\n\n"+"-".repeat(72)+"\n\n")+"\n\nFin de la memoria · generado con DION (prediseño)."; ctx.download("memoria-calculo-estructural-10.2.txt",t); }
  function exportCsv(){ var q=function(x){ x=String(x==null?"":x); return /[;"\n]/.test(x)?'"'+x.replace(/"/g,'""')+'"':x; }, L=["Num;Elemento;Parametro;Valor;Unidad;Estado"];
    st.mem.forEach(function(m,i){ m.rows.forEach(function(r){ L.push(["10.2."+(i+1),m.t,r[0],r[1],r[2],""].map(q).join(";")); }); m.chk.forEach(function(c){ L.push(["10.2."+(i+1),m.t,"Verificación: "+c[0],c[2],"",c[1]?"OK":c[1]===false?"NO CUMPLE":"info"].map(q).join(";")); }); });
    ctx.download("memoria-calculo-estructural-10.2.csv","\ufeff"+L.join("\r\n")); }

  /* ════════ eventos ════════ */
  var outT; function outDeb(){ clearTimeout(outT); outT=setTimeout(function(){ var z=main.querySelector('[data-z="xout"]'); if(z) z.innerHTML=calcOut(ES.calc); },220); }
  function useGrid(){ var g=G(); if(!g.grid){ ctx.toast("Dibuja al menos 2 ejes X y 2 ejes Y"); return; } st.lx=r2(clamp(Math.max.apply(null,g.sx),2.5,20)); st.ly=r2(clamp(Math.max.apply(null,g.sy),2.5,20)); save(); ctx.toast("Luces "+fmt(st.lx,2)+" × "+fmt(st.ly,2)+" m aplicadas a Cargas y Prediseño"); api.repaint(); }
  X.click=function(a,b,v){
    if(a.charAt(0)!=="x") return false;
    var m=im();
    if(a==="xup"){ var fi=main.querySelector('[data-z="xfile"]'); if(fi) fi.click(); return true; }
    if(a==="ximg"){ pl.cur=+v; ES.pv.fit=true; ES.cal=[]; ES.vn=null; save(); api.repaint(); return true; }
    if(a==="xrm"){ var r=pl.imgs.splice(+v,1)[0]; if(r&&r.tmp&&ES.tmp[r.name]){ try{ URL.revokeObjectURL(ES.tmp[r.name]); }catch(_){} delete ES.tmp[r.name]; } pl.cur=Math.min(pl.cur,pl.imgs.length-1); ES.pv.fit=true; save(); api.repaint(); return true; }
    if(a==="xm"){ ES.pv.mode=v; ES.cal=[]; ES.vn=null; var w=main.querySelector('[data-z="pv"]'); root2(); if(w) w.classList.toggle("m-x",v!=="sel"); var h=main.querySelector("."+P+"-pvh span"); if(h) h.textContent=MODES.filter(function(x){return x[0]===v;})[0][1]; pvRefresh(); return true; }
    if(a==="xz"){ var w2=main.querySelector('[data-z="pv"]'), lay=w2&&w2.querySelector("."+P+"-pvl"); if(!w2) return true; if(v==="fit") fit(w2); else zoomAt(w2,lay,v==="+"?1.3:1/1.3,w2.clientWidth/2,w2.clientHeight/2); apply(lay); pvRefresh(); return true; }
    if(a==="xcal"){ var inp=main.querySelector('[data-z="cald"]'), dm=num(inp&&inp.value,0); if(ES.cal.length<2||!(dm>0)){ ctx.toast("Marca 2 puntos y escribe la distancia en metros"); return true; }
      var dpx=Math.hypot(ES.cal[1][0]-ES.cal[0][0],ES.cal[1][1]-ES.cal[0][1]); m.s=dm/dpx; m.cal=true; m.cald=dm; ES.cal=[]; ES.pv.mode="ex"; save(); ctx.toast("Escala: 1 m = "+fmt(1/m.s,1)+" px. Ahora dibuja los ejes."); api.repaint(); return true; }
    if(a==="xspa"){ var tx=parseSp((main.querySelector('[data-z="spx"]')||{}).value), ty=parseSp((main.querySelector('[data-z="spy"]')||{}).value); if(!tx.length&&!ty.length){ ctx.toast("Escribe las luces separadas por espacios"); return true; }
      function cum(a){ var o=[0]; a.forEach(function(x){ o.push(r2(o[o.length-1]+x)); }); return o; }
      if(tx.length) pl.ex=cum(tx); if(ty.length) pl.ey=cum(ty);
      var TX=pl.ex.length?pl.ex[pl.ex.length-1]:0, TY=pl.ey.length?pl.ey[pl.ey.length-1]:0, W=m.w||1400, H=m.h||990;
      if(pl.cur<0){ m.s=Math.max(TX/(W*.8),TY/(H*.74),.005); m.ox=(W-TX/m.s)/2; m.oy=(H-TY/m.s)/2+20; }
      else if(m.ox==null){ m.ox=W*.1; m.oy=H*.14; }
      pl.cols={}; pl.vigas=[]; ES.pv.fit=true; save(); api.repaint(); return true; }
    if(a==="xallc"){ var g=G(); if(!g.grid){ ctx.toast("Faltan ejes"); return true; } pl.cols={}; uniq(pl.ex).forEach(function(x){ uniq(pl.ey).forEach(function(y){ pl.cols[x.toFixed(2)+","+y.toFixed(2)]=1; }); }); save(); pvRefresh(); return true; }
    if(a==="xallv"){ var g2=G(); if(!g2.grid){ ctx.toast("Faltan ejes"); return true; } pl.vigas=[]; var ex=uniq(pl.ex), ey=uniq(pl.ey); ey.forEach(function(y){ for(var i=1;i<ex.length;i++) addV([ex[i-1],y,ex[i],y]); }); ex.forEach(function(x){ for(var j=1;j<ey.length;j++) addV([x,ey[j-1],x,ey[j]]); }); save(); pvRefresh(); return true; }
    if(a==="xclr"){ pl.ex=[]; pl.ey=[]; pl.cols={}; pl.vigas=[]; pl.muros=[]; ES.sel=null; if(pl.cur<0){ pl.blank={w:1200,h:800,s:.05,ox:100,oy:100}; } else { m.ox=null; m.oy=null; } save(); api.repaint(); return true; }
    if(a==="xraw"){ ES.raw=!ES.raw; api.repaint(); return true; }
    if(a==="xuse"){ useGrid(); return true; }
    if(a==="xnp"||a==="xhp"){ return true; }
    if(a==="xfy"){ st.fy=+v; save(); api.repaint(); return true; }
    if(a==="xpres"){ st.pres=v; save(); api.repaint(); return true; }
    if(a==="xgo"){ var g3=G(), pp=projPatch(v,g3,st,ES.sel); var o=cv(v); for(var k in pp.p) o[k]=pp.p[k]; st.calc["_src_"+v]=pp.src; setCv(v,o); ES.calc=v; ES.tab="calc"; api.paint(); return true; }
    if(a==="xcalc"){ ES.calc=v; api.repaint(); return true; }
    if(a==="xproj"){ var g4=G(), p2=projPatch(ES.calc,g4,st,ES.sel), o2=cv(ES.calc); for(var k2 in p2.p) o2[k2]=p2.p[k2]; if(o2.perf!=null) o2.perf=""; st.calc["_src_"+ES.calc]=p2.src; setCv(ES.calc,o2); ctx.toast("Datos del proyecto cargados"); api.repaint(); return true; }
    if(a==="xdef"){ st.calc[ES.calc]=JSON.parse(JSON.stringify(CALCI[ES.calc].def)); delete st.calc["_src_"+ES.calc]; save(); api.repaint(); return true; }
    if(a==="xc"){ var o3=cv(ES.calc), k3=b.dataset.k, val=isNaN(+v)||v===""?v:+v; o3[k3]=val; if(k3==="fam") o3.perf=""; setCv(ES.calc,o3); api.repaint(); return true; }
    if(a==="xperf"){ var o4=cv(ES.calc); o4.perf=v; setCv(ES.calc,o4); api.repaint(); return true; }
    if(a==="xs"){ var C=CALCI[ES.calc], o5=cv(ES.calc), k5=b.dataset.k, f=C.f(o5).filter(function(x){ return x[0]===k5; })[0]; if(!f) return true; var nv=clamp(Math.round((o5[k5]+(+b.dataset.d)*f[3])/f[3])*f[3],f[4],f[5]); o5[k5]=+nv.toFixed(4); setCv(ES.calc,o5);
      var ip=b.parentNode.querySelector("input"); if(ip) ip.value=fmt(o5[k5],f[3]<1?2:0).replace(/\./g,""); outDeb(); return true; }
    if(a==="xmem"){ var R=runCalc(ES.calc), C2=CALCI[ES.calc]; if(R.err){ ctx.toast("Corrige los datos antes de agregar"); return true; }
      st.mem.push({id:Date.now(),calc:ES.calc,t:C2.n+" — "+R.sum.split(":")[0],f:new Date().toLocaleString("es-EC"),ok:R.C.every(function(c){ return c[1]!==false; }),sum:R.sum,txt:"  Norma: "+C2.nor+"\n  Datos de origen: "+(st.calc["_src_"+ES.calc]||"ingresados por el usuario")+"\n"+stepsTXT(R.S.a),chk:R.C,rows:R.rows}); save(); ctx.toast("Agregado a la memoria (10.2."+st.mem.length+")"); outDeb(); return true; }
    if(a==="xmo"){ ES.mo=ES.mo===+v?null:+v; api.repaint(); return true; }
    if(a==="xmdel"){ st.mem.splice(+v,1); ES.mo=null; save(); api.repaint(); return true; }
    if(a==="xmclr"){ st.mem=[]; save(); api.repaint(); return true; }
    if(a==="xtxt"){ exportTxt(); return true; }
    if(a==="xcsv"){ exportCsv(); return true; }
    return false;
  };
  function root2(){ main.querySelectorAll("."+P+"-tl").forEach(function(t){ t.classList.toggle("on",t.dataset.v===ES.pv.mode); }); }
  X.stp=function(k,d){ var g=G(); if(k==="xnp"){ st.np=clamp((st.np||g.pr.pisos)+d,1,60); } else if(k==="xhp"){ st.hp=clamp(Math.round(((st.hp||g.pr.hp)+d*.1)*100)/100,2.4,8); } save(); api.repaint(); };
  X.input=function(ev){ var t=ev.target;
    if(t.dataset.act==="xf"){ var o=cv(ES.calc), n=num(t.value,NaN); if(!isNaN(n)){ var C=CALCI[ES.calc], f=C.f(o).filter(function(x){ return x[0]===t.dataset.k; })[0]; if(f) n=clamp(n,f[4],f[5]); o[t.dataset.k]=n; setCv(ES.calc,o); outDeb(); } return true; }
    return false; };
  X.change=function(ev){ var t=ev.target; if(t.dataset.act==="xuso"){ var g=G(); st.usos=g.fl.map(function(f){ return f.uso; }); st.usos[+t.dataset.i]=t.value; save(); api.repaint(); return true; } return false; };
  X.after=function(){ if(ES.tab==="dat") pvBind(); };
  return X;
}


DM.estructura={
  titulo:"Estructura",
  sub:"Geometría y trigonometría · Estática · Resistencia de materiales",
  render:function(el,ctx){
    var P="m-estructura", u=UI(P);
    css("mod-estructura-css",extCSS(P)+
      ".m-estructura-sg{display:grid;grid-template-columns:repeat(auto-fill,minmax(250px,1fr));gap:10px}"+
      ".m-estructura-sc{display:flex;flex-direction:column;gap:8px;cursor:default;transition:.2s}"+
      ".m-estructura-sc.on{border-color:var(--acc);box-shadow:0 0 0 1px rgba(var(--acc-rgb),.35),inset 0 0 24px rgba(var(--acc-rgb),.12)}"+
      ".m-estructura-sc ul{margin:0;padding-left:16px;font-size:12px;color:var(--muted)}"+
      ".m-estructura-sc li::marker{color:var(--done)}"+
      ".m-estructura-sc ul.c li::marker{color:var(--warn)}"+
      ".m-estructura-pp{display:grid;grid-template-columns:auto 1fr;gap:3px 10px;font-size:12px;align-items:center}"+
      ".m-estructura-pp span{font-family:var(--f-d);font-size:7.5px;letter-spacing:.14em;color:var(--faint);text-transform:uppercase}"+
      ".m-estructura-pp b{font-family:var(--f-m);font-weight:500}"+
      ".m-estructura-dots i{display:inline-block;width:9px;height:9px;margin-right:3px;border:1px solid var(--acc)}"+
      ".m-estructura-dots i.f{background:var(--acc);box-shadow:0 0 5px var(--acc)}"+
      ".m-estructura-cl{cursor:pointer}"+
      ".m-estructura-cl:hover rect{fill:#B6FF3C}"+
      ".m-estructura-sway{transform-box:fill-box;transform-origin:50% 100%;animation:m-estructura-sw 2.6s ease-in-out infinite}"+
      "@keyframes m-estructura-sw{0%,100%{transform:skewX(0)}25%{transform:skewX(calc(var(--a)*1deg))}75%{transform:skewX(calc(var(--a)*-1deg))}}"+
      ".m-estructura-walk{offset-rotate:0deg}"+
      "@media (prefers-reduced-motion:reduce){.m-estructura-sway{animation:none}}"+xCSS(P)
    );
    var sv=ctx.get("estructura")||{}, pr0=proj(ctx), za=zonaAuto(pr0);
    var sis0=SIS1.map(function(s){ return [s,sisScore(s,pr0,za.Z).s]; }).sort(function(a,b){return b[1]-a[1];})[0][0].id;
    function d(k,v){ return sv[k]!=null?sv[k]:v; }
    var big=!!BIGSPAN[pr0.cat], lx0=pr0.cat==="SAL"?7.2:big?9:6;
    var st={sis:d("sis",sis0),cv:d("cv",CVDEF[pr0.cat]||"ofi"),dAc:d("dAc",1.0),dCr:d("dCr",pr0.cat==="SAL"?.6:.4),dMp:d("dMp",1.5),dVc:d("dVc",1.0),
      lx:d("lx",lx0),ly:d("ly",lx0),ctype:d("ctype","int"),ci:d("ci",1),cj:d("cj",1),z:d("z",za.Z),suelo:d("suelo",ctx.clima&&ctx.clima.zona==="costa"&&(ctx.clima.elev||0)<40?"E":"D"),
      eta:d("eta",0),I:d("I",0),fP:d("fP",1),fE:d("fE",1),losa:d("losa","alv"),fc:d("fc",pr0.pisos>6?280:240),rv:d("rv",11),qa:d("qa",ctx.clima&&ctx.clima.zona==="costa"?1:1.5),
      rH:d("rH",.6),rT:d("rT","pea"),eHm:d("eHm",17),eN:d("eN",10),eW:d("eW",1.2),fecha:d("fecha","dic"),hr:d("hr",10),hvw:d("hvw",1.6),fach:d("fach","N"),
      ck:sv.ck||{},conf:sv.conf||{},
      np:d("np",0),hp:d("hp",0),fy:d("fy",4200),pres:d("pres","m"),usos:sv.usos||[],plano:sv.plano||null,calc:sv.calc||{},mem:sv.mem||[]};
    var save=debounce(function(){ ctx.set("estructura",JSON.parse(JSON.stringify(st))); },600);
    el.innerHTML="";
    var root=document.createElement("div"); root.className=P; el.appendChild(root);
    var TABS=[["dat","1 · Mis datos / planos"],["rec","2 · Recomendador"],["sis","3 · Sistema"],["car","4 · Cargas"],["sis2","5 · Sismo"],["pre","6 · Prediseño"],["calc","7 · Calculadoras"],["mem","8 · Memoria"],["geo","9 · Geometría"],["ck","10 · Pasos"]];
    if(!TABS.some(function(t){ return t[0]===ES.tab; })) ES.tab="sis";
    root.innerHTML=topBar(P,TABS,ES.tab)+'<div class="'+P+'-main"></div><div class="'+P+'-scan"></div>';
    var main=root.querySelector("."+P+"-main");
    main.addEventListener("scroll",function(){ ES.scroll[ES.tab]=main.scrollTop; },{passive:true});
    function fxo(id){ return !!ES.fx[id]; }
    var X=estExtra(P,u,ctx,st,save,{main:main,repaint:function(){ repaint(); },paint:function(){ paint(); }});

    /* ── 1. SISTEMA ── */
    function sisT(){
      var c=estCalc(ctx,st), pr=c.pr, list=SIS1.map(function(s){ var r=sisScore(s,pr,st.z); return {s:s,sc:r.s,why:r.why}; }).sort(function(a,b){return b.sc-a.sc;});
      var h=u.hd("Sistema estructural · "+E(pr.tipoN),"NEC-SE-DS 2015 · Tablas 15–16",null,false,'<span class="'+P+'-fnt">'+pr.pisos+' pisos · Z = '+fmt(st.z,2)+' · '+fmt(pr.A)+' m²</span>');
      h+='<div class="'+P+'-note" style="margin-bottom:12px">Recomendación para <b>'+E(pr.tipoN)+'</b> ('+pr.pisos+' pisos, zona sísmica Z = '+fmt(st.z,2)+(big?', gran luz':'')+'): <b>'+E(list[0].s.n)+'</b>'+(list[0].why.length?' — '+E(list[0].why.join("; ")):'')+'. Elige uno: alimenta cargas, sismo (R, período) y prediseño.</div>';
      h+='<div class="'+P+'-sg">';
      list.forEach(function(x){ var s=x.s, on=s.id===st.sis, col=x.sc>=70?"var(--done)":x.sc>=45?"var(--acc)":"var(--warn)";
        h+='<div class="'+P+'-card '+P+'-sc'+(on?' on':'')+'">'+sisDib(P,s.dib,on)+
          '<div class="'+P+'-row"><div class="'+P+'-h2" style="margin:0;font-size:11px">'+E(s.n)+'</div></div>'+
          '<div class="'+P+'-row"><div class="'+P+'-bar" style="flex:1"><i style="width:'+x.sc+'%;background:'+col+';box-shadow:0 0 8px '+col+'"></i></div><span class="'+P+'-mono" style="color:'+col+';font-size:12px">'+x.sc+'</span></div>'+
          '<div class="'+P+'-pp"><span>Luces</span><b>'+s.ln+'</b><span>Pisos</span><b>hasta ≈ '+s.pm+'</b><span>R</span><b>'+s.R+'</b><span>Costo</span><b class="'+P+'-dots">'+[1,2,3,4,5].map(function(i){ return '<i class="'+(i<=Math.round(s.c)?'f':'')+'"></i>'; }).join("")+'</b><span>Norma</span><b style="font-family:var(--f-b);font-size:11px;color:var(--muted)">'+E(s.nor)+'</b></div>'+
          '<ul>'+s.pro.map(function(p){return '<li>'+E(p)+'</li>';}).join("")+'</ul><ul class="c">'+s.con.map(function(p){return '<li>'+E(p)+'</li>';}).join("")+'</ul>'+
          (x.why.length?'<div class="'+P+'-fnt">'+E(x.why.join(" · "))+'</div>':'')+
          '<button class="'+P+'-btn'+(on?' on':'')+'" data-act="sis" data-v="'+s.id+'">'+(on?gly("check",14)+' Elegido':'Elegir sistema')+'</button></div>';
      });
      return h+'</div>';
    }

    /* ── 2. CARGAS ── */
    function carCtl(c){
      var rel=CV.filter(function(r){ return r[3]==="*"||r[3].split(" ").indexOf(c.pr.cat)>=0; });
      var s='<div class="'+P+'-card '+P+'-ctl"><div class="'+P+'-h">Carga viva por ocupación</div>';
      s+=u.chips("cv",rel.map(function(r){ return [r[0],E(r[1].replace(/^[^·]+· /,""))+' <b class="'+P+'-mono">'+fmt(r[2],1)+'</b>',r[1]]; }),st.cv);
      s+='<button class="'+P+'-chip'+(ES.cvAll?' on':'')+'" data-act="cvall">Tabla 9 completa</button>';
      s+='<div class="'+P+'-h" style="margin-top:6px">Carga muerta (kN/m²)</div>';
      s+='<div class="'+P+'-fnt">Losa '+E(LOSA.filter(function(l){return l[0]===st.losa;})[0][1])+' h = '+c.h+' cm → <b style="color:var(--ink)">'+fmt(c.pp,2)+' kN/m²</b> (desde Prediseño)</div>';
      s+=u.sl("dAc","Contrapiso + acabado de piso",st.dAc,.4,2,.05,fmt(st.dAc,2),"Masillado 3–5 cm (0,66–1,1) + cerámica/porcelanato (0,25)");
      s+=u.sl("dCr","Cielo raso + instalaciones colgadas",st.dCr,.1,1.2,.05,fmt(st.dCr,2),"Gypsum 0,15 · salud y laboratorios con ductos 0,5–0,8");
      s+=u.sl("dMp","Mampostería (repartida)",st.dMp,0,3,.05,fmt(st.dMp,2),"Bloque 15 cm ≈ 1,5–2,0 · drywall ≈ 0,5");
      s+=u.sl("dVc","Vigas y columnas (promedio)",st.dVc,.3,2,.05,fmt(st.dVc,2));
      s+='<div class="'+P+'-h" style="margin-top:6px">Grilla de columnas</div><div class="'+P+'-stps">'+u.stp("lx","Luz en X (m)",fmt(st.lx,2))+u.stp("ly","Luz en Y (m)",fmt(st.ly,2))+'</div>';
      s+=u.chips("ctype",[["int","Interior"],["bor","Borde"],["esq","Esquina"]],st.ctype,"Columna analizada (o toca una en la planta)");
      return s+'</div>';
    }
    function carOut(c){
      var parts=[["Losa",c.pp,"#38E1FF"],["Acabados",st.dAc,"#4F7DFF"],["Cielo + inst.",st.dCr,"#7C6CFF"],["Mampostería",st.dMp,"#B26BFF"],["Vigas/col.",st.dVc,"#E36BE0"],["Viva L",c.Lv,"#B6FF3C"]], tot=c.D+c.Lv;
      var s='<div class="'+P+'-card">'+u.hd("Cargas por m²","NEC-SE-CG 2015","car1",fxo("car1"));
      s+='<div class="'+P+'-kpis">'+u.kpi("Muerta D",fmt(c.D,2)+" kN/m²",fmt(c.D*101.97,0)+" kg/m²")+u.kpi("Viva L",fmt(c.Lv,2)+" kN/m²",E(c.cv[1]))+u.kpi("Última wu",fmt(c.wu,2)+" kN/m²","1,2D + 1,6L","rgba(var(--done-rgb),.6)")+u.kpi("Servicio",fmt(c.ws,2)+" kN/m²","D + L")+'</div>';
      var W=600,x=0, g='<svg class="'+P+'-svg" viewBox="0 0 '+W+' 70" style="margin-top:10px" role="img" aria-label="Composición de cargas">';
      parts.forEach(function(p){ var w=p[1]/tot*W; g+='<rect x="'+x+'" y="8" width="'+Math.max(0,w-2)+'" height="30" fill="'+p[2]+'" fill-opacity=".35" stroke="'+p[2]+'"/>'+(w>48?'<text x="'+(x+4)+'" y="27" font-size="10" fill="'+p[2]+'">'+fmt(p[1],2)+'</text><text x="'+(x+4)+'" y="54" font-size="9" fill="var(--muted)">'+p[0]+'</text>':''); x+=w; });
      g+='</svg>';
      s+='<div class="'+P+'-dg">'+g+'</div>'+u.fx(fxo("car1"),'D = losa '+fmt(c.pp,2)+' + acabados '+fmt(st.dAc,2)+' + cielo '+fmt(st.dCr,2)+' + mampostería '+fmt(st.dMp,2)+' + vigas/col. '+fmt(st.dVc,2)+' = <em>'+fmt(c.D,2)+' kN/m²</em><br>L = '+fmt(c.Lv,2)+' kN/m² ('+E(c.cv[1])+', NEC-SE-CG Tabla 9)<br>wu = máx(1,4D ; 1,2D + 1,6L) = máx('+fmt(1.4*c.D,2)+' ; '+fmt(1.2*c.D,2)+' + '+fmt(1.6*c.Lv,2)+') = <u>'+fmt(c.wu,2)+' kN/m²</u><small>Combinaciones NEC-SE-CG 3.4.3: 1,4D · 1,2D+1,6L+0,5máx(Lr,S,R) · 1,2D+1,0E+L … En prediseño gobierna 1,2D+1,6L para cargas gravitacionales. 1 kN/m² ≈ 102 kg/m².</small>')+'</div>';
      if(ES.cvAll){ s+='<div class="'+P+'-card"><div class="'+P+'-h">NEC-SE-CG Tabla 9 · sobrecargas mínimas (selección)</div><div class="'+P+'-tw"><table class="'+P+'-tb"><thead><tr><th>Ocupación</th><th>kN/m²</th><th>kg/m²</th></tr></thead><tbody>'+CV.map(function(r){ return '<tr class="'+(r[0]===st.cv?'on':'')+'"><td>'+E(r[1])+'</td><td>'+fmt(r[2],2)+'</td><td>'+fmt(r[2]*101.97)+'</td></tr>'; }).join("")+'</tbody></table></div></div>'; }
      s+='<div class="'+P+'-card">'+u.hd("Planta esquemática · áreas tributarias",null,"car2",fxo("car2"),'<span class="'+P+'-fnt">'+c.nx+' × '+c.ny+' vanos · '+c.ncol+' columnas · huella ≈ '+fmt(c.nx*st.lx*c.ny*st.ly)+' m²</span>')+planta(c);
      s+='<div class="'+P+'-tw" style="margin-top:8px"><table class="'+P+'-tb"><thead><tr><th>Columna</th><th>At m²</th><th>Pu por piso kN</th><th>Pu total ('+c.pr.pisos+' p) kN</th><th>t</th></tr></thead><tbody>'+
        [["int","Interior"],["bor","Borde"],["esq","Esquina"]].map(function(t){ var a=c.at[t[0]], p=c.wu*a; return '<tr class="'+(t[0]===st.ctype?'on':'')+'"><td>'+t[1]+'</td><td>'+fmt(a,2)+'</td><td>'+fmt(p,1)+'</td><td>'+fmt(p*c.pr.pisos,0)+'</td><td>'+fmt(p*c.pr.pisos/9.81,1)+'</td></tr>'; }).join("")+'</tbody></table></div>';
      s+=u.fx(fxo("car2"),'At interior = lx · ly = '+fmt(st.lx,2)+' × '+fmt(st.ly,2)+' = '+fmt(c.at.int,2)+' m² · borde = At/2 · esquina = At/4<br>Pu = wu · At · n pisos = '+fmt(c.wu,2)+' × '+fmt(c.At,2)+' × '+c.pr.pisos+' = <u>'+fmt(c.Pu,0)+' kN</u> ('+fmt(c.Pu/9.81,1)+' t)<small>Huella aproximada = área bruta / pisos ('+fmt(c.pr.foot)+' m²) con la proporción del terreno. Supone todos los pisos iguales (conservador para cubierta).</small>');
      return s+'</div>';
    }
    function planta(c){
      var nx=c.nx, ny=c.ny, LX=nx*st.lx, LY=ny*st.ly, W=640, pad=34, sc=Math.min((W-2*pad)/LX,(380-2*pad)/LY), H=LY*sc+2*pad, ox=(W-LX*sc)/2, oy=pad;
      var ci=clamp(st.ci,0,nx), cj=clamp(st.cj,0,ny);
      var g='<svg class="'+P+'-svg" viewBox="0 0 '+W+' '+H.toFixed(0)+'" role="img" aria-label="Planta de columnas con área tributaria"><defs><pattern id="'+P+'-ht" width="8" height="8" patternUnits="userSpaceOnUse" patternTransform="rotate(45)"><line x1="0" y1="0" x2="0" y2="8" stroke="#B6FF3C" stroke-opacity=".45" stroke-width="2"/></pattern></defs>';
      g+='<rect x="'+ox+'" y="'+oy+'" width="'+LX*sc+'" height="'+LY*sc+'" fill="rgba(56,225,255,.04)" stroke="rgba(56,225,255,.35)"/>';
      for(var i=0;i<=nx;i++){ var x=ox+i*st.lx*sc; g+='<line x1="'+x+'" y1="'+(oy-14)+'" x2="'+x+'" y2="'+(oy+LY*sc+4)+'" stroke="rgba(56,225,255,.25)" stroke-dasharray="6 3 1 3"/><circle cx="'+x+'" cy="'+(oy-20)+'" r="8" fill="none" stroke="var(--acc)"/><text x="'+x+'" y="'+(oy-17)+'" font-size="9" text-anchor="middle" fill="var(--acc)">'+(i+1)+'</text>'; }
      for(var j=0;j<=ny;j++){ var y=oy+j*st.ly*sc; g+='<line x1="'+(ox-14)+'" y1="'+y+'" x2="'+(ox+LX*sc+4)+'" y2="'+y+'" stroke="rgba(56,225,255,.25)" stroke-dasharray="6 3 1 3"/><circle cx="'+(ox-20)+'" cy="'+y+'" r="8" fill="none" stroke="var(--acc)"/><text x="'+(ox-20)+'" y="'+(y+3)+'" font-size="9" text-anchor="middle" fill="var(--acc)">'+String.fromCharCode(65+(j%26))+'</text>'; }
      var x0=ox+Math.max(0,ci-.5)*st.lx*sc, x1=ox+Math.min(nx,ci+.5)*st.lx*sc, y0=oy+Math.max(0,cj-.5)*st.ly*sc, y1=oy+Math.min(ny,cj+.5)*st.ly*sc;
      g+='<rect x="'+x0+'" y="'+y0+'" width="'+(x1-x0)+'" height="'+(y1-y0)+'" fill="url(#'+P+'-ht)" stroke="#B6FF3C" stroke-width="1.6" class="'+P+'-flowS"/>';
      g+='<text x="'+((x0+x1)/2)+'" y="'+(y1-6)+'" font-size="10.5" text-anchor="middle" fill="#B6FF3C">At = '+fmt(((x1-x0)*(y1-y0))/(sc*sc),1)+' m²</text>';
      var cs=clamp(c.side/100*sc,5,14);
      for(var a=0;a<=nx;a++) for(var b=0;b<=ny;b++){ var X=ox+a*st.lx*sc, Y=oy+b*st.ly*sc, sel=a===ci&&b===cj;
        g+='<g class="'+P+'-cl" data-act="col" data-i="'+a+'" data-j="'+b+'"><circle cx="'+X+'" cy="'+Y+'" r="14" fill="transparent"/><rect x="'+(X-cs/2)+'" y="'+(Y-cs/2)+'" width="'+cs+'" height="'+cs+'" fill="'+(sel?'#B6FF3C':'#38E1FF')+'" style="filter:drop-shadow(0 0 4px '+(sel?'#B6FF3C':'#38E1FF')+')"/>'+(sel?'<circle cx="'+X+'" cy="'+Y+'" r="12" fill="none" stroke="#B6FF3C" class="'+P+'-pul"/>':'')+'</g>'; }
      g+='<text x="'+ox+'" y="'+(H-6)+'" font-size="9.5" fill="var(--muted)">'+fmt(st.lx,2)+' m × '+nx+' = '+fmt(LX,1)+' m</text><text x="'+(ox+LX*sc)+'" y="'+(H-6)+'" font-size="9.5" text-anchor="end" fill="var(--muted)">'+fmt(st.ly,2)+' m × '+ny+' = '+fmt(LY,1)+' m</text>';
      return '<div class="'+P+'-dg" style="max-width:720px">'+g+'</svg></div>';
    }

    /* ── 3. SISMO ── */
    function sisCtl(c){
      var s='<div class="'+P+'-card '+P+'-ctl"><div class="'+P+'-h">Peligro sísmico del sitio</div>';
      s+='<div class="'+(st.conf.z?'':P+'-warnbox')+'" style="border:1px solid var(--line);padding:8px">'+u.chips("z",ZONAS.map(function(z){ return [z[1],z[0]+' · '+fmt(z[1],2)]; }),st.z,"Zona sísmica y factor Z")+
        '<div class="'+P+'-fnt">Automático: Z = '+fmt(zonaAuto(c.pr).Z,2)+' por '+E(zonaAuto(c.pr).src)+'</div><div class="'+P+'-row" style="margin-top:6px">'+u.pv("z",st.conf.z)+'</div></div>';
      s+='<div class="'+(st.conf.suelo?'':P+'-warnbox')+'" style="border:1px solid var(--line);padding:8px">'+u.chips("suelo",Object.keys(SUELO).map(function(k){ return [k,k+' · '+SUELO[k].n,SUELO[k].d]; }),st.suelo,"Tipo de perfil de suelo")+
        '<div class="'+P+'-fnt">'+E(c.so.d)+'. '+(st.suelo==="F"?'Suelo F: el espectro debe salir de un estudio de respuesta de sitio; aquí se usa E como aproximación.':'Guayaquil, Daule y Samborondón: frecuentes perfiles E/F (arcillas blandas aluviales) → estudio geotécnico NEC-SE-GC obligatorio.')+'</div><div class="'+P+'-row" style="margin-top:6px">'+u.pv("suelo",st.conf.suelo)+'</div></div>';
      s+=u.chips("eta",[[0,"Auto · "+c.et.r+" "+fmt(c.et.eta,2)],[1.8,"1,80 Costa"],[2.48,"2,48 Sierra/Esmeraldas/Galápagos"],[2.6,"2,60 Oriente"]],st.eta,"Razón espectral η");
      s+=u.chips("I",[[0,"Auto · "+fmt(iAuto(c.pr.cat),1)]].concat(IOPT.map(function(x){return [x[0],x[1],x[2]];})),st.I,"Importancia I (NEC-SE-DS 4.1)");
      s+=u.chips("sis",SIS1.map(function(x){ return [x.id,x.sh+' · R '+x.R]; }),st.sis,"Sistema · factor R");
      s+=u.chips("fP",[[1,"φP 1,0 regular"],[.9,"φP 0,9 irregular en planta"]],st.fP,"Configuración en planta");
      s+=u.chips("fE",[[1,"φE 1,0 regular"],[.9,"φE 0,9 irregular en elevación"]],st.fE,"Configuración en elevación");
      return s+'</div>';
    }
    function sisOut(c){
      var s='<div class="'+P+'-card">'+u.hd("Espectro elástico de diseño Sa(T)","NEC-SE-DS 2015 · 3.3","sx1",fxo("sx1"));
      s+='<div class="'+P+'-kpis">'+u.kpi("Período Ta",fmt(c.Ta,2)+" s","Ct·hn^α · hn = "+fmt(c.hn,1)+" m")+u.kpi("Sa(Ta)",fmt(c.SaT,3)+" g","meseta η·Z·Fa = "+fmt(c.eta*c.Z*c.Fa,3))+u.kpi("Coef. sísmico Cs",pct(c.Cs,1),"I·Sa / (R·φP·φE)")+u.kpi("Cortante basal V",fmt(c.V,0)+" kN",fmt(c.V/9.81,0)+" t · W = "+fmt(c.W/9.81,0)+" t","rgba(var(--done-rgb),.6)")+'</div>';
      /* espectro */
      var W=620,H=250,pl=46,pr_=14,pt=14,pb=34,iw=W-pl-pr_,ih=H-pt-pb,Tm=4, mx=c.eta*c.Z*c.Fa*1.15;
      var X=function(t){ return pl+t/Tm*iw; }, Y=function(v){ return pt+ih*(1-v/mx); };
      var g='<svg class="'+P+'-svg" viewBox="0 0 '+W+' '+H+'" role="img" aria-label="Espectro de diseño"><defs><linearGradient id="'+P+'-sp" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#38E1FF" stop-opacity=".35"/><stop offset="1" stop-color="#38E1FF" stop-opacity="0"/></linearGradient></defs>';
      for(var k=0;k<=4;k++){ var yy=Y(mx*k/4); g+='<line x1="'+pl+'" x2="'+(W-pr_)+'" y1="'+yy+'" y2="'+yy+'" stroke="rgba(56,225,255,.1)"/><text x="'+(pl-6)+'" y="'+(yy+3)+'" font-size="9" text-anchor="end" fill="var(--muted)">'+fmt(mx*k/4,2)+'</text>'; }
      for(var t=0;t<=Tm;t+=.5) g+='<text x="'+X(t)+'" y="'+(H-18)+'" font-size="9" text-anchor="middle" fill="var(--muted)">'+fmt(t,1)+'</text>';
      var dd="", dr="";
      for(var q=0;q<=200;q++){ var T=q/200*Tm, v=c.Sa(Math.max(T,.001)); dd+=(q?"L":"M")+X(T).toFixed(1)+" "+Y(v).toFixed(1); dr+=(q?"L":"M")+X(T).toFixed(1)+" "+Y(v*c.I/(c.R*c.fP*c.fE)).toFixed(1); }
      g+='<path d="'+dd+'L'+X(Tm)+' '+Y(0)+'L'+X(0)+' '+Y(0)+'Z" fill="url(#'+P+'-sp)"/><path d="'+dd+'" fill="none" stroke="#38E1FF" stroke-width="2.4" style="filter:drop-shadow(0 0 5px #38E1FF)"/>';
      g+='<path d="'+dr+'" fill="none" stroke="#FFC24B" stroke-width="1.6" stroke-dasharray="5 4"/>';
      g+='<line x1="'+X(c.Tc)+'" x2="'+X(c.Tc)+'" y1="'+pt+'" y2="'+Y(0)+'" stroke="rgba(255,255,255,.25)" stroke-dasharray="2 4"/><text x="'+(X(c.Tc)+4)+'" y="'+(pt+10)+'" font-size="9" fill="var(--muted)">Tc '+fmt(c.Tc,2)+' s</text>';
      g+='<line x1="'+X(c.T0)+'" x2="'+X(c.T0)+'" y1="'+(pt+20)+'" y2="'+Y(0)+'" stroke="rgba(255,255,255,.15)" stroke-dasharray="2 4"/><text x="'+(X(c.T0)+3)+'" y="'+(pt+30)+'" font-size="8.5" fill="var(--faint)">T0</text>';
      if(c.TL<Tm) g+='<line x1="'+X(c.TL)+'" x2="'+X(c.TL)+'" y1="'+pt+'" y2="'+Y(0)+'" stroke="rgba(255,255,255,.12)" stroke-dasharray="2 4"/><text x="'+(X(c.TL)+3)+'" y="'+(pt+10)+'" font-size="8.5" fill="var(--faint)">TL</text>';
      var tx=X(Math.min(c.Ta,Tm)), ty=Y(c.SaT);
      g+='<line x1="'+tx+'" x2="'+tx+'" y1="'+ty+'" y2="'+Y(0)+'" stroke="#B6FF3C" stroke-dasharray="3 3"/><circle cx="'+tx+'" cy="'+ty+'" r="5" fill="#B6FF3C" class="'+P+'-pul"/><circle cx="'+tx+'" cy="'+ty+'" r="10" fill="none" stroke="#B6FF3C" stroke-opacity=".5"/><text x="'+(tx+8)+'" y="'+(ty-8)+'" font-size="10" fill="#B6FF3C">Ta = '+fmt(c.Ta,2)+' s</text>';
      g+='<text x="'+pl+'" y="'+(H-3)+'" font-size="9" fill="var(--faint)">T (s) · azul: Sa elástico (g) · ámbar: inelástico I·Sa/(R·φP·φE)</text></svg>';
      s+='<div class="'+P+'-dg">'+g+'</div>'+u.fx(fxo("sx1"),'Z = '+fmt(c.Z,2)+' · suelo '+st.suelo+' → Fa = '+fmt(c.Fa,2)+', Fd = '+fmt(c.Fd,2)+', Fs = '+fmt(c.Fs,2)+' (Tablas 3–5) · η = '+fmt(c.eta,2)+' · r = '+fmt(c.r,1)+'<br>T0 = 0,10·Fs·Fd/Fa = '+fmt(c.T0,3)+' s · Tc = 0,55·Fs·Fd/Fa = '+fmt(c.Tc,3)+' s · TL = 2,4·Fd = '+fmt(c.TL,2)+' s<br>Sa = η·Z·Fa = '+fmt(c.eta*c.Z*c.Fa,3)+' g (0 ≤ T ≤ Tc) · Sa = η·Z·Fa·(Tc/T)^r (T > Tc)<br>Ta = Ct·hn^α = '+fmt(c.s.Ct,3)+' × '+fmt(c.hn,1)+'^'+fmt(c.s.a,2)+' = <em>'+fmt(c.Ta,3)+' s</em> → Sa(Ta) = <em>'+fmt(c.SaT,3)+' g</em><br>W = D · A planta · pisos = '+fmt(c.Wp/(c.pr.A/c.pr.pisos),2)+' × '+fmt(c.pr.A/c.pr.pisos)+' × '+c.pr.pisos+' = '+fmt(c.W,0)+' kN<br>V = I·Sa·W / (R·φP·φE) = '+fmt(c.I,1)+' × '+fmt(c.SaT,3)+' × '+fmt(c.W,0)+' / ('+c.R+' × '+fmt(c.fP,1)+' × '+fmt(c.fE,1)+') = <u>'+fmt(c.V,0)+' kN</u><small>NEC-SE-DS 6.3.2. El período calculado con el modelo no debe superar 1,3·Ta. Verificar deriva inelástica ΔM = 0,75·R·ΔE ≤ 0,02 (H.A./acero).</small>')+'</div>';
      /* distribución en altura */
      var n=c.pr.pisos, HH=Math.min(360,90+n*34), bw=150, bx=70, fh=(HH-40)/n, mxF=Math.max.apply(null,c.fl.map(function(f){return f.F;}))||1, amp=clamp(c.Cs*18,.4,3.2);
      var e='<svg class="'+P+'-svg" viewBox="0 0 420 '+HH+'" style="max-width:520px" role="img" aria-label="Fuerzas sísmicas por piso"><line x1="20" x2="300" y1="'+(HH-20)+'" y2="'+(HH-20)+'" stroke="var(--muted)"/>';
      for(var z=0;z<10;z++) e+='<line x1="'+(30+z*26)+'" x2="'+(22+z*26)+'" y1="'+(HH-20)+'" y2="'+(HH-12)+'" stroke="var(--faint)"/>';
      e+='<g class="'+P+'-sway" style="--a:'+fmt(amp,2).replace(",",".")+'">';
      for(var f=0;f<n;f++){ var y0=HH-20-(f+1)*fh; e+='<rect x="'+bx+'" y="'+y0+'" width="'+bw+'" height="'+fh+'" fill="rgba(56,225,255,'+(.05+.03*f)+')" stroke="#38E1FF" stroke-opacity=".6"/>'; }
      e+='</g>';
      c.fl.forEach(function(fl,i){ var y=HH-20-(i+1)*fh, L=18+fl.F/mxF*90; e+='<line x1="'+(bx-8-L)+'" x2="'+(bx-6)+'" y1="'+y+'" y2="'+y+'" stroke="#FFC24B" stroke-width="2" marker-end="url(#'+P+'-ar)"/><text x="'+(bx+bw+10)+'" y="'+(y+4)+'" font-size="10" fill="#FFC24B">F'+(i+1)+' = '+fmt(fl.F,0)+' kN</text>'; });
      e+='<defs><marker id="'+P+'-ar" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M0 0 10 5 0 10Z" fill="#FFC24B"/></marker></defs>';
      e+='<text x="'+(bx+bw/2)+'" y="'+(HH-4)+'" font-size="10" text-anchor="middle" fill="#B6FF3C">V = '+fmt(c.V,0)+' kN</text></svg>';
      s+='<div class="'+P+'-card">'+u.hd("Distribución vertical de fuerzas","NEC-SE-DS 6.3.5","sx2",fxo("sx2"))+e+u.fx(fxo("sx2"),'Fx = V · wx·hx^k / Σ(wi·hi^k) · k = '+fmt(c.k,2)+' (T ≤ 0,5 s → 1 · 0,5 < T ≤ 2,5 → 0,75 + 0,50·T · T > 2,5 → 2)<br>'+c.fl.map(function(f){ return 'F'+f.n+' (h = '+fmt(f.h,1)+' m) = '+fmt(f.F,0)+' kN'; }).join(" · "))+'</div>';
      return s;
    }

    /* ── 4. PREDISEÑO ── */
    function preCtl(c){
      var s='<div class="'+P+'-card '+P+'-ctl"><div class="'+P+'-h">Supuestos de prediseño</div>';
      s+=u.chips("losa",LOSA,st.losa,"Tipo de losa");
      s+=u.chips("fc",[[210,"f'c 210"],[240,"240"],[280,"280"],[350,"350 kg/cm²"]],st.fc,"Hormigón (NEC-SE-HM mín. 21 MPa)");
      s+=u.sl("rv","Peralte de viga L/h",st.rv,9,16,.5,"L/"+fmt(st.rv,1),"Pórticos sísmicos: L/10–L/12 · deflexión ACI mín. L/18,5");
      s+=u.chips("ctype",[["int","Interior"],["bor","Borde"],["esq","Esquina"]],st.ctype,"Columna");
      s+='<div class="'+(st.conf.qa?'':P+'-warnbox')+'" style="border:1px solid var(--line);padding:8px">'+u.chips("qa",QA.map(function(q){ return [q[0],fmt(q[0],1)+' · '+q[1]]; }),st.qa,"Capacidad admisible qadm (kg/cm²)")+
        u.sl("qa","qadm",st.qa,.3,5,.05,fmt(st.qa,2)+" kg/cm²","Debe salir del estudio geotécnico (NEC-SE-GC)")+'<div class="'+P+'-row">'+u.pv("qa",st.conf.qa)+'</div></div>';
      s+='<div class="'+P+'-fnt">Luces desde la grilla: '+fmt(st.lx,2)+' × '+fmt(st.ly,2)+' m · wu = '+fmt(c.wu,2)+' kN/m² · '+c.pr.pisos+' pisos.</div>';
      return s+'</div>';
    }
    function preOut(c){
      var s='<div class="'+P+'-kpis">'+u.kpi("Losa",c.h+" cm",E(LOSA.filter(function(l){return l[0]===st.losa;})[0][1]))+u.kpi("Viga",c.bv+" × "+c.hv+" cm","b × h · L = "+fmt(c.L,2)+" m")+u.kpi("Columna",c.side+" × "+c.side+" cm",{int:"interior",bor:"borde",esq:"esquina"}[st.ctype]+" · Pu "+fmt(c.Pu,0)+" kN")+u.kpi("Zapata",fmt(c.B,2)+" × "+fmt(c.B,2)+" m","h = "+c.hz+" cm","rgba(var(--done-rgb),.6)")+'</div>';
      s+='<div class="'+P+'-g3" style="margin-top:12px">';
      /* losa */
      var lsvg='<svg class="'+P+'-svg" viewBox="0 0 300 150" role="img" aria-label="Sección de losa">', hpx=clamp(c.h*2.2,24,90), y0=40;
      if(st.losa==="alv"){ lsvg+='<rect x="20" y="'+y0+'" width="260" height="11" fill="rgba(56,225,255,.25)" stroke="#38E1FF"/>'; for(var i=0;i<5;i++){ var x=20+i*55; lsvg+='<rect x="'+x+'" y="'+(y0+11)+'" width="20" height="'+(hpx-11)+'" fill="rgba(56,225,255,.25)" stroke="#38E1FF"/>'+(i<4?'<rect x="'+(x+21)+'" y="'+(y0+12)+'" width="33" height="'+(hpx-13)+'" fill="rgba(255,194,75,.1)" stroke="#FFC24B" stroke-dasharray="3 2"/>':'')+'<circle cx="'+(x+10)+'" cy="'+(y0+hpx-5)+'" r="2.4" fill="#B6FF3C"/>'; } }
      else if(st.losa==="dek"){ lsvg+='<path d="M20 '+(y0+hpx)+' l20 0 l8 -14 l24 0 l8 14 l20 0 l8 -14 l24 0 l8 14 l20 0 l8 -14 l24 0 l8 14 l20 0 l8 -14 l24 0 l8 14" fill="none" stroke="#FFC24B" stroke-width="2"/><rect x="20" y="'+y0+'" width="260" height="'+(hpx-14)+'" fill="rgba(56,225,255,.2)" stroke="#38E1FF"/>'; }
      else { lsvg+='<rect x="20" y="'+y0+'" width="260" height="'+hpx+'" fill="rgba(56,225,255,.2)" stroke="#38E1FF"/>'; for(var b=0;b<12;b++) lsvg+='<circle cx="'+(32+b*21)+'" cy="'+(y0+hpx-6)+'" r="2.2" fill="#B6FF3C"/>'; if(st.losa==="pos") lsvg+='<path d="M20 '+(y0+8)+' Q150 '+(y0+hpx+6)+' 280 '+(y0+8)+'" fill="none" stroke="#FF6FA8" stroke-width="2" class="'+P+'-flowS"/>'; }
      lsvg+='<line x1="10" x2="10" y1="'+y0+'" y2="'+(y0+hpx)+'" stroke="var(--acc)"/><text x="6" y="'+(y0+hpx/2+3)+'" font-size="10" text-anchor="end" fill="var(--acc)" transform="rotate(-90 6 '+(y0+hpx/2)+')">'+c.h+' cm</text>';
      lsvg+='<text x="150" y="'+(y0-10)+'" font-size="10" text-anchor="middle" fill="var(--muted)">'+(st.losa==="alv"?"loseta 5 cm · nervios 10 cm @ 50 cm · bloque":"")+'</text></svg>';
      s+='<div class="'+P+'-card">'+u.hd("Losa",st.losa==="pos"?"ACI 318 · PTI":"ACI 318 8.3 · NEC-SE-HM","p1",fxo("p1"))+lsvg+u.fx(fxo("p1"),'ln = L − b = '+fmt(c.L,2)+' − 0,30 = '+fmt(c.ln,2)+' m · β = Lmayor/Lmenor = '+fmt(c.beta,2)+'<br>h maciza = ln·(0,8 + fy/14000)/(36 + 9β) = '+fmt(c.ln*100,0)+'×1,10/(36 + 9×'+fmt(c.beta,2)+') = '+fmt(c.hMaz,1)+' cm (≥ 9 cm)'+(st.losa==="alv"?'<br>alivianada: inercia equivalente ≈ 0,72 → h ≥ '+fmt(c.hMaz/.72,1)+' → <u>'+c.h+' cm</u> (bloque estándar 15/20/25/30)':st.losa==="pos"?'<br>postensada: h ≈ L/42 = '+fmt(c.L*100/42,1)+' → <u>'+c.h+' cm</u> (mín. 16)':st.losa==="dek"?'<br>steel deck: loseta 12 cm sobre placa colaborante · vigas secundarias @ ≤ 3 m':'<br>→ <u>'+c.h+' cm</u>')+'<br>Peso propio ≈ '+fmt(c.pp,2)+' kN/m²')+'</div>';
      /* viga */
      var vb=c.bv*1.6, vh=c.hv*1.6, vx=150-vb/2, vy=18;
      var vsvg='<svg class="'+P+'-svg" viewBox="0 0 300 '+(vh+50)+'" role="img" aria-label="Sección de viga"><rect x="'+vx+'" y="'+vy+'" width="'+vb+'" height="'+vh+'" fill="rgba(56,225,255,.18)" stroke="#38E1FF" stroke-width="1.5"/><rect x="'+(vx+6)+'" y="'+(vy+6)+'" width="'+(vb-12)+'" height="'+(vh-12)+'" fill="none" stroke="#FFC24B" stroke-width="1.2" rx="3"/>';
      [0,1,2].forEach(function(i){ var x=vx+10+i*(vb-20)/2; vsvg+='<circle cx="'+x+'" cy="'+(vy+vh-10)+'" r="3.5" fill="#B6FF3C"/><circle cx="'+x+'" cy="'+(vy+10)+'" r="3" fill="#B6FF3C"/>'; });
      vsvg+='<line x1="'+vx+'" x2="'+(vx+vb)+'" y1="'+(vy+vh+14)+'" y2="'+(vy+vh+14)+'" stroke="var(--acc)"/><text x="150" y="'+(vy+vh+28)+'" font-size="10" text-anchor="middle" fill="var(--acc)">b = '+c.bv+' cm</text><line x1="'+(vx+vb+14)+'" x2="'+(vx+vb+14)+'" y1="'+vy+'" y2="'+(vy+vh)+'" stroke="var(--acc)"/><text x="'+(vx+vb+20)+'" y="'+(vy+vh/2+3)+'" font-size="10" fill="var(--acc)">h = '+c.hv+' cm</text></svg>';
      s+='<div class="'+P+'-card">'+u.hd("Viga principal","NEC-SE-HM 4.2","p2",fxo("p2"))+vsvg+u.fx(fxo("p2"),'h = L / '+fmt(st.rv,1)+' = '+fmt(c.L*100,0)+' / '+fmt(st.rv,1)+' = '+fmt(c.L*100/st.rv,1)+' → <u>'+c.hv+' cm</u> (múltiplo de 5, mín. 30)<br>b ≈ 0,5·h = '+fmt(c.hv*.5,1)+' → <u>'+c.bv+' cm</u> · NEC-SE-HM: b ≥ 25 cm, b ≥ 0,3h, b ≤ ancho de columna<br>Mu aprox. = wu·(ancho tributario)·L²/10 = '+fmt(c.wu*c.Ls*c.L*c.L/10,0)+' kN·m')+'</div>';
      /* columna */
      var cp=Math.min(150,c.side*2), cx=150-cp/2, cy=14;
      var csvg='<svg class="'+P+'-svg" viewBox="0 0 300 '+(cp+46)+'" role="img" aria-label="Sección de columna"><rect x="'+cx+'" y="'+cy+'" width="'+cp+'" height="'+cp+'" fill="rgba(56,225,255,.18)" stroke="#38E1FF" stroke-width="1.5"/><rect x="'+(cx+7)+'" y="'+(cy+7)+'" width="'+(cp-14)+'" height="'+(cp-14)+'" fill="none" stroke="#FFC24B" stroke-width="1.2" rx="3"/>';
      var nb=c.side>=55?4:3; for(var a=0;a<nb;a++) for(var bb=0;bb<nb;bb++){ if(a>0&&a<nb-1&&bb>0&&bb<nb-1) continue; csvg+='<circle cx="'+(cx+12+a*(cp-24)/(nb-1))+'" cy="'+(cy+12+bb*(cp-24)/(nb-1))+'" r="3.4" fill="#B6FF3C"/>'; }
      csvg+='<line x1="'+cx+'" x2="'+(cx+cp)+'" y1="'+(cy+cp+14)+'" y2="'+(cy+cp+14)+'" stroke="var(--acc)"/><text x="150" y="'+(cy+cp+30)+'" font-size="10" text-anchor="middle" fill="var(--acc)">'+c.side+' × '+c.side+' cm</text></svg>';
      s+='<div class="'+P+'-card'+(c.side>80?' '+P+'-warnbox':'')+'">'+u.hd("Columna "+{int:"interior",bor:"de borde",esq:"de esquina"}[st.ctype],"NEC-SE-HM 4.3","p3",fxo("p3"))+csvg+u.fx(fxo("p3"),'Pu = wu·At·n = '+fmt(c.wu,2)+' × '+fmt(c.At,2)+' × '+c.pr.pisos+' = '+fmt(c.Pu,0)+' kN<br>Ag = Pu / ('+fmt(c.alpha,2)+'·f\'c) = '+fmt(c.Pu*1000,0)+' N / ('+fmt(c.alpha,2)+' × '+fmt(c.fcM,1)+' MPa) = '+fmt(c.Ag/100,0)+' cm²<br>lado = √Ag = '+fmt(Math.sqrt(c.Ag)/10,1)+' cm → <u>'+c.side+' cm</u> (múltiplo de 5; NEC-SE-HM mín. 30 × 30 cm)<small>0,45·f\'c para columnas interiores (regla de prediseño); 0,35·f\'c para borde y esquina por flexión biaxial. Cuantía 1–3 % (NEC-SE-HM). Columna fuerte–viga débil: ΣMc ≥ 1,2·ΣMv.</small>')+(c.side>80?'<div class="'+P+'-alert">Sección grande: reduce la luz, sube f\'c o cambia a sistema dual/mixto.</div>':'')+'</div>';
      /* zapata */
      var zb=Math.min(220,c.B*55), zx=150-zb/2, zh=clamp(c.hz*.9,26,80), zy=70;
      var zsvg='<svg class="'+P+'-svg" viewBox="0 0 300 '+(zy+zh+46)+'" role="img" aria-label="Zapata aislada"><rect x="'+(150-c.side*.45)+'" y="10" width="'+(c.side*.9)+'" height="'+(zy-10)+'" fill="rgba(56,225,255,.18)" stroke="#38E1FF"/><rect x="'+zx+'" y="'+zy+'" width="'+zb+'" height="'+zh+'" fill="rgba(56,225,255,.2)" stroke="#38E1FF" stroke-width="1.5"/><path d="M'+(zx+6)+' '+(zy+zh-8)+'H'+(zx+zb-6)+'" stroke="#B6FF3C" stroke-width="2" stroke-dasharray="1 7" stroke-linecap="round"/>';
      for(var k2=0;k2<9;k2++) zsvg+='<line x1="'+(zx+k2*zb/8)+'" x2="'+(zx+k2*zb/8)+'" y1="'+(zy+zh+4)+'" y2="'+(zy+zh+14)+'" stroke="#FFC24B" stroke-width="1.4" class="'+P+'-pul" style="animation-delay:'+(k2*.12)+'s"/>';
      zsvg+='<text x="150" y="'+(zy+zh+28)+'" font-size="10" text-anchor="middle" fill="#FFC24B">qadm = '+fmt(st.qa,2)+' kg/cm²</text><text x="150" y="'+(zy+zh+42)+'" font-size="10" text-anchor="middle" fill="var(--acc)">B = '+fmt(c.B,2)+' m · h = '+c.hz+' cm</text></svg>';
      var rec=st.qa<.8?"qadm muy baja: evaluar pilotes, mejoramiento de suelo o losa de cimentación.":c.ocup>.5?"Las zapatas ocupan "+pct(c.ocup)+" de la huella: conviene losa de cimentación o vigas de cimentación.":"Zapatas aisladas unidas con vigas de amarre (NEC-SE-GC), ocupación "+pct(c.ocup)+" de la huella.";
      s+='<div class="'+P+'-card'+(st.conf.qa?'':' '+P+'-warnbox')+'">'+u.hd("Zapata aislada","NEC-SE-GC","p4",fxo("p4"))+zsvg+'<div class="'+P+'-'+(st.qa<.8||c.ocup>.5?'alert':'note')+'">'+rec+'</div>'+u.fx(fxo("p4"),'Ps (servicio) = (D + L)·At·n = '+fmt(c.ws,2)+' × '+fmt(c.At,2)+' × '+c.pr.pisos+' = '+fmt(c.Ps,0)+' kN<br>A = 1,10·Ps / qadm = 1,10 × '+fmt(c.Ps,0)+' / '+fmt(c.qa,0)+' kN/m² = '+fmt(c.Az,2)+' m²<br>B = √A = '+fmt(Math.sqrt(c.Az),2)+' → <u>'+fmt(c.B,2)+' m</u> · h ≈ 0,25·B ≥ 40 cm → <u>'+c.hz+' cm</u><small>1 kg/cm² = 98,1 kN/m². 10 % por peso propio de zapata y relleno. Verificar punzonamiento, asentamientos y excentricidad con el ingeniero.</small>')+'</div>';
      return s+'</div>';
    }

    /* ── 5. GEOMETRÍA ── */
    function geoT(){
      var c=estCalc(ctx,st), s=u.chips("geo",[["ram","Rampas · INEN 2245"],["esc","Escaleras · Blondel"],["sol","Sol y aleros"],["gau","Terreno · Gauss"]],ES.geo);
      s+='<div style="margin-top:8px">';
      if(ES.geo==="ram") s+='<div class="'+P+'-g2"><div class="'+P+'-card '+P+'-ctl"><div class="'+P+'-h">Rampa</div>'+u.chips("rT",[["pea","Peatonal accesible"],["veh","Vehicular"]],st.rT)+u.sl("rH","Desnivel a salvar",st.rH,.05,st.rT==="veh"?6:3,.01,fmt(st.rH,2)+" m","Ej.: plataforma de ingreso, cambio de nivel, sótano")+'</div><div data-z="out">'+ramOut()+'</div></div>';
      else if(ES.geo==="esc") s+='<div class="'+P+'-g2"><div class="'+P+'-card '+P+'-ctl"><div class="'+P+'-h">Escalera</div><div class="'+P+'-fnt">Altura de piso: '+fmt(c.pr.hp,2)+' m (altura '+fmt(c.pr.alt,1)+' m / '+c.pr.pisos+' pisos)</div>'+u.sl("eHm","Contrahuella máxima",st.eHm,15,18,.5,fmt(st.eHm,1)+" cm","NTE INEN 2249: ≤ 18 cm · uso público recomendado ≤ 17 cm")+u.sl("eN","Contrahuellas por tramo (máx.)",st.eN,6,18,1,st.eN+"")+u.sl("eW","Ancho libre",st.eW,.9,2.4,.05,fmt(st.eW,2)+" m","Uso público ≥ 1,20 m; evacuación según ocupantes (Instalaciones)")+'</div><div data-z="out">'+escOut(c)+'</div></div>';
      else if(ES.geo==="sol") s+='<div class="'+P+'-g2"><div class="'+P+'-card '+P+'-ctl"><div class="'+P+'-h">Geometría solar · lat. '+fmt(c.pr.lat,3)+'°</div>'+u.chips("fecha",FECHAS.map(function(f){return [f[0],f[1]];}),st.fecha,"Fecha crítica")+u.sl("hr","Hora solar",st.hr,6,18,.25,hhmm(st.hr))+u.chips("fach",FACH.map(function(f){return [f[0],f[1]];}),st.fach,"Fachada")+u.sl("hvw","Altura de ventana a proteger",st.hvw,.6,3.5,.05,fmt(st.hvw,2)+" m")+'</div><div data-z="out">'+solOut(c)+'</div></div>';
      else s+=gauOut(c);
      return s+'</div>';
    }
    function hhmm(h){ var H=Math.floor(h), m=Math.round((h-H)*60); return (H<10?"0":"")+H+":"+(m<10?"0":"")+m; }
    function ramCalc(){
      var H=st.rH, veh=st.rT==="veh", tr=[], p;
      if(veh){ p=.15; var Lr=H/p; return {p:p,L:Lr,tr:[{p:p,l:Lr}],des:0,tot:Lr+2*3.6,veh:true}; }
      if(H/.12<=2.0001){ p=.12; tr=[{p:p,l:H/p}]; }
      else if(H/.10<=10.0001){ p=.10; tr=[{p:p,l:H/p}]; }
      else if(H/.08<=15.0001){ p=.08; tr=[{p:p,l:H/p}]; }
      else { p=.08; var rest=H; while(rest>1e-6){ var hh=Math.min(rest,15*p); tr.push({p:p,l:hh/p}); rest-=hh; } }
      var L=tr.reduce(function(a,t){return a+t.l;},0);
      return {p:p,L:L,tr:tr,des:tr.length-1,tot:L+(tr.length-1)*1.5,veh:false};
    }
    function ramOut(){
      var r=ramCalc(), ang=deg(Math.atan(r.p));
      var s='<div class="'+P+'-card">'+u.hd("Rampa "+(r.veh?"vehicular":"peatonal accesible"),r.veh?"Ordenanza municipal · NEC-HS-AU":"NTE INEN 2245:2016","r1",fxo("r1"));
      s+='<div class="'+P+'-kpis">'+u.kpi("Pendiente",pct(r.p,0),"α = "+fmt(ang,2)+"°")+u.kpi("Longitud inclinada",fmt(r.L,2)+" m",r.tr.length+" tramo(s)")+u.kpi("Descansos",r.des+"",r.veh?"transiciones 2 × 3,6 m al 7,5 %":"≥ 1,50 m c/u")+u.kpi("Desarrollo total",fmt(r.tot,2)+" m",null,"rgba(var(--done-rgb),.6)")+'</div>';
      var W=620,H=200,sx=(W-120)/Math.max(r.tot,1), sy=Math.min(120/Math.max(st.rH,.01),sx*3), x=30, y=H-30, d="M"+x+" "+y, pts=[];
      if(r.veh){ d+="L"+(x+=3.6*sx)+" "+(y-=3.6*.075*sy); d+="L"+(x+=r.L*sx)+" "+(y-=r.L*r.p*sy*((st.rH-2*3.6*.075)/st.rH>0?(st.rH-2*3.6*.075)/st.rH:1)); d+="L"+(x+=3.6*sx)+" "+(y=H-30-st.rH*sy); }
      else r.tr.forEach(function(t,i){ x+=t.l*sx; y-=t.l*t.p*sy; d+="L"+x.toFixed(1)+" "+y.toFixed(1); pts.push([x,y]); if(i<r.tr.length-1){ x+=1.5*sx; d+="L"+x.toFixed(1)+" "+y.toFixed(1); } });
      var g='<svg class="'+P+'-svg" viewBox="0 0 '+W+' '+H+'" role="img" aria-label="Perfil de rampa"><line x1="20" x2="'+(W-10)+'" y1="'+(H-30)+'" y2="'+(H-30)+'" stroke="var(--muted)" stroke-opacity=".5"/>';
      g+='<path d="'+d+'L'+x+' '+(H-30)+'Z" fill="rgba(56,225,255,.08)"/><path id="'+P+'-rp" d="'+d+'" fill="none" stroke="#38E1FF" stroke-width="3" style="filter:drop-shadow(0 0 5px #38E1FF)"/>';
      g+='<path d="M30 '+(H-30)+' m40 0 A40 40 0 0 0 '+(70-40+40*Math.cos(Math.atan(r.p*sy/sx)))+' '+(H-30-40*Math.sin(Math.atan(r.p*sy/sx)))+'" fill="none" stroke="#FFC24B"/><text x="76" y="'+(H-36)+'" font-size="10" fill="#FFC24B">α '+fmt(ang,1)+'°</text>';
      g+='<line x1="'+(x+12)+'" x2="'+(x+12)+'" y1="'+(H-30)+'" y2="'+(H-30-st.rH*sy)+'" stroke="var(--acc)"/><text x="'+(x+16)+'" y="'+(H-30-st.rH*sy/2)+'" font-size="10" fill="var(--acc)">'+fmt(st.rH,2)+' m</text>';
      g+='<circle r="5" fill="#B6FF3C" style="filter:drop-shadow(0 0 6px #B6FF3C)"><animateMotion dur="5s" repeatCount="indefinite" path="'+d+'"/></circle>';
      g+='<text x="30" y="'+(H-10)+'" font-size="9.5" fill="var(--muted)">Perfil desarrollado (escala vertical exagerada) · '+fmt(r.tot,1)+' m</text></svg>';
      s+='<div class="'+P+'-dg">'+g+'</div>'+u.fx(fxo("r1"),r.veh?'L = Δh / p = '+fmt(st.rH,2)+' / 0,15 = '+fmt(r.L,2)+' m + transiciones de 3,6 m al 7,5 % arriba y abajo · α = atan(0,15) = '+fmt(ang,2)+'°<small>Pendiente máxima usual en ordenanzas ecuatorianas 15 % (recta) y 12 % en curva; ancho mín. 3,0 m por carril. Verificar la ordenanza del cantón.</small>':'INEN 2245 · pendiente longitudinal máxima según longitud del tramo: ≤ 2 m → 12 % · ≤ 10 m → 10 % · ≤ 15 m → 8 %<br>Prueba 12 %: L = '+fmt(st.rH,2)+'/0,12 = '+fmt(st.rH/.12,2)+' m · 10 %: '+fmt(st.rH/.10,2)+' m · 8 %: '+fmt(st.rH/.08,2)+' m → se adopta <u>'+pct(r.p,0)+'</u><br>α = atan(p) = atan('+fmt(r.p,2)+') = '+fmt(ang,2)+'° · tramos de máx. 15 m con descansos de 1,50 m<small>Ancho libre mín. 1,20 m, pendiente transversal ≤ 2 %, pasamanos doble a 0,70 y 0,90 m, bordillo 5 cm, piso antideslizante (NEC-HS-AU). Mundo: ADA 1:12 (8,33 %), tramo máx. 9,14 m.</small>')+'</div>';
      return s;
    }
    function escCalc(c){
      var H=c.pr.hp*100, n=Math.ceil(H/st.eHm-1e-9), h=H/n, b=Math.max(28,63-2*h), bl=2*h+b, tr=Math.ceil(n/st.eN), L=(n-tr)*b/100+(tr-1)*Math.max(1.2,st.eW);
      return {H:H,n:n,h:h,b:b,bl:bl,tr:tr,L:L,ang:deg(Math.atan(h/b))};
    }
    function escOut(c){
      var e=escCalc(c), ok=e.bl>=61&&e.bl<=65&&e.h<=18&&e.b>=28;
      var s='<div class="'+P+'-card'+(ok?'':' '+P+'-warnbox')+'">'+u.hd("Escalera","NTE INEN 2249 · Blondel","e1",fxo("e1"));
      s+='<div class="'+P+'-kpis">'+u.kpi("Contrahuella",fmt(e.h,1)+" cm",e.n+" contrahuellas")+u.kpi("Huella",fmt(e.b,1)+" cm",(e.n-e.tr)+" huellas")+u.kpi("Blondel 2h+b",fmt(e.bl,1)+" cm",ok?"cómodo (61–65)":"fuera de rango",ok?"rgba(var(--done-rgb),.6)":"var(--warn)")+u.kpi("Pendiente",fmt(e.ang,1)+"°",e.tr+" tramo(s) · L ≈ "+fmt(e.L,2)+" m")+'</div>';
      var n1=Math.min(e.n,24), W=560, H=230, sc=Math.min((W-80)/(n1*e.b),(H-40)/(n1*e.h)), x=40, y=H-20, d="M"+x+" "+y;
      for(var i=0;i<n1;i++){ y-=e.h*sc; d+="V"+y.toFixed(1); if(i<n1-1){ x+=e.b*sc; d+="H"+x.toFixed(1); } }
      var g='<svg class="'+P+'-svg" viewBox="0 0 '+W+' '+H+'" role="img" aria-label="Corte de escalera">';
      g+='<path d="'+d+'L'+(x+e.b*sc)+' '+y+'L'+(x+e.b*sc)+' '+(y+18)+'L'+(40+18)+' '+(H-20)+'Z" fill="rgba(56,225,255,.12)" stroke="#38E1FF" stroke-width="1.6"/>';
      g+='<line x1="40" y1="'+(H-20)+'" x2="'+x+'" y2="'+y+'" stroke="#FFC24B" stroke-dasharray="4 4"/><text x="'+(40+(x-40)*.45)+'" y="'+(H-20-(H-20-y)*.45-8)+'" font-size="10" fill="#FFC24B">'+fmt(e.ang,1)+'°</text>';
      g+='<text x="'+(40+e.b*sc*1.5)+'" y="'+(H-20-e.h*sc-6)+'" font-size="9.5" fill="var(--acc)">b '+fmt(e.b,1)+'</text><text x="'+(40+e.b*sc+4)+'" y="'+(H-20-e.h*sc*0.3)+'" font-size="9.5" fill="var(--acc)">h '+fmt(e.h,1)+'</text>';
      g+='<circle r="4.5" fill="#B6FF3C" style="filter:drop-shadow(0 0 6px #B6FF3C)"><animateMotion dur="4s" repeatCount="indefinite" path="M40 '+(H-26)+' L'+x+' '+(y-6)+'"/></circle>';
      g+='<text x="'+(W-10)+'" y="'+(H-4)+'" font-size="9" text-anchor="end" fill="var(--faint)">'+(e.n>n1?"(primeras "+n1+" de "+e.n+")":"tramo desarrollado")+'</text></svg>';
      s+='<div class="'+P+'-dg">'+g+'</div>'+u.fx(fxo("e1"),'n = ⌈H / hmáx⌉ = ⌈'+fmt(e.H,0)+' / '+fmt(st.eHm,1)+'⌉ = '+e.n+' · h = H/n = <em>'+fmt(e.h,2)+' cm</em><br>Blondel: 2h + b = 63 → b = 63 − 2×'+fmt(e.h,2)+' = '+fmt(63-2*e.h,2)+' → <em>'+fmt(e.b,1)+' cm</em> (≥ 28 cm)<br>tan α = h/b = '+fmt(e.h/e.b,3)+' → α = <u>'+fmt(e.ang,2)+'°</u> (cómodo 27–35°)<br>Tramos = ⌈n / '+st.eN+'⌉ = '+e.tr+' · L horizontal ≈ (n − tramos)·b + descansos = '+fmt(e.L,2)+' m<small>Uso público: pasamanos a ambos lados, descanso ≥ ancho de la escalera, nariz contrastante y antideslizante. Escalera de evacuación: ver Instalaciones › Contra incendios.</small>')+'</div>';
      return s;
    }
    function solOut(c){
      var lat=c.pr.lat, dec=FECHAS.filter(function(f){return f[0]===st.fecha;})[0][2], sp=solPos(lat,dec,st.hr), fa=FACH.filter(function(f){return f[0]===st.fach;})[0];
      var s='<div class="'+P+'-card">'+u.hd("Carta solar · "+fmt(lat,2)+"°","Geometría solar (Cooper)","so1",fxo("so1"));
      s+='<div class="'+P+'-kpis">'+u.kpi("Altitud solar",fmt(sp.alt,1)+"°",hhmm(st.hr)+" h solar")+u.kpi("Azimut",fmt(sp.az,1)+"°","desde el Norte, horario")+u.kpi("Declinación",fmt(dec,2)+"°",E(FECHAS.filter(function(f){return f[0]===st.fecha;})[0][1]))+'</div>';
      /* carta polar */
      var R=120, cx=150, cy=140, P2=function(alt,az){ var r=R*(90-alt)/90; return [cx+r*Math.sin(rad(az)), cy-r*Math.cos(rad(az))]; };
      var g='<svg class="'+P+'-svg" viewBox="0 0 300 285" style="max-width:340px" role="img" aria-label="Carta solar">';
      [0,30,60].forEach(function(a){ g+='<circle cx="'+cx+'" cy="'+cy+'" r="'+R*(90-a)/90+'" fill="none" stroke="rgba(56,225,255,'+(a?'.15':'.4')+')"/><text x="'+(cx+3)+'" y="'+(cy-R*(90-a)/90+10)+'" font-size="8" fill="var(--faint)">'+a+'°</text>'; });
      [["N",0],["E",90],["S",180],["O",270]].forEach(function(k){ var q=P2(-9,k[1]); g+='<text x="'+q[0]+'" y="'+(q[1]+3)+'" font-size="11" text-anchor="middle" fill="'+(k[0]===st.fach?'#B6FF3C':'var(--acc)')+'">'+k[0]+'</text>'; });
      FECHAS.forEach(function(f){ var dd="", on=f[0]===st.fecha; for(var h=5;h<=19;h+=.25){ var p=solPos(lat,f[2],h); if(p.alt<0) continue; var q=P2(p.alt,p.az); dd+=(dd?"L":"M")+q[0].toFixed(1)+" "+q[1].toFixed(1); } g+='<path d="'+dd+'" fill="none" stroke="'+(on?'#FFC24B':'rgba(255,194,75,.35)')+'" stroke-width="'+(on?2.2:1.2)+'"/>'; });
      if(sp.alt>0){ var q=P2(sp.alt,sp.az); g+='<line x1="'+cx+'" y1="'+cy+'" x2="'+q[0]+'" y2="'+q[1]+'" stroke="#FFC24B" stroke-dasharray="3 3"/><circle cx="'+q[0]+'" cy="'+q[1]+'" r="7" fill="#FFC24B" style="filter:drop-shadow(0 0 8px #FFC24B)" class="'+P+'-pul"/>'; }
      g+='<rect x="'+(cx-18)+'" y="'+(cy-12)+'" width="36" height="24" fill="rgba(56,225,255,.15)" stroke="#38E1FF"/>';
      g+='</svg>';
      /* sección de alero */
      var v=vsa(sp,fa[2]), D=v&&v.v>0?st.hvw/Math.tan(rad(v.v)):null;
      var sec='<svg class="'+P+'-svg" viewBox="0 0 300 240" style="max-width:360px" role="img" aria-label="Corte de alero"><rect x="40" y="30" width="16" height="190" fill="rgba(56,225,255,.2)" stroke="#38E1FF"/>';
      var wy0=70, wh=st.hvw*48, Dp=D!=null?Math.min(D*48,220):0;
      sec+='<rect x="40" y="'+wy0+'" width="16" height="'+wh+'" fill="rgba(182,255,60,.18)" stroke="#B6FF3C"/><rect x="56" y="'+(wy0-10)+'" width="'+Math.max(2,Dp)+'" height="10" fill="rgba(56,225,255,.35)" stroke="#38E1FF"/>';
      if(v&&v.v>0){ var ex=56+Dp, ey=wy0-10, L2=160, rx=ex+L2*Math.cos(rad(v.v)), ry=ey-L2*Math.sin(rad(v.v)); sec+='<line x1="'+rx+'" y1="'+ry+'" x2="56" y2="'+(wy0+wh)+'" stroke="#FFC24B" stroke-width="1.6" class="'+P+'-flow"/><circle cx="'+Math.min(rx,290)+'" cy="'+Math.max(ry,10)+'" r="8" fill="#FFC24B" style="filter:drop-shadow(0 0 8px #FFC24B)"/><text x="'+(56+Dp/2)+'" y="'+(wy0-16)+'" font-size="10" text-anchor="middle" fill="var(--acc)">'+fmt(D,2)+' m</text><text x="70" y="'+(wy0+wh+18)+'" font-size="10" fill="#FFC24B">VSA '+fmt(v.v,1)+'°</text>'; }
      else sec+='<text x="70" y="'+(wy0+wh/2)+'" font-size="11" fill="#B6FF3C">Sin sol directo en esta fachada</text>';
      sec+='<text x="20" y="235" font-size="9" fill="var(--faint)">Fachada '+fa[1]+' · ventana '+fmt(st.hvw,2)+' m</text></svg>';
      s+='<div class="'+P+'-row" style="align-items:flex-start;justify-content:center;gap:16px">'+'<div style="flex:1;min-width:220px">'+g+'</div><div style="flex:1;min-width:220px">'+sec+'</div></div>';
      /* tabla por fachada 9–15 h */
      var rows=FACH.map(function(f){ var mx=0, fin=0; for(var h=9;h<=15;h+=.25){ var p=solPos(lat,dec,h), vv=vsa(p,f[2]); if(vv&&vv.v>0){ mx=Math.max(mx,st.hvw/Math.tan(rad(Math.max(vv.v,5)))); fin=Math.max(fin,Math.abs(vv.hsa)); } } return [f[1],mx,fin]; });
      s+='<div class="'+P+'-tw" style="margin-top:8px"><table class="'+P+'-tb"><thead><tr><th>Fachada</th><th>Alero para 9:00–15:00</th><th>HSA máx.</th><th>Estrategia</th></tr></thead><tbody>'+rows.map(function(r){ return '<tr class="'+(r[0]===fa[1]?'on':'')+'"><td>'+r[0]+'</td><td>'+(r[1]>0?fmt(Math.min(r[1],9.99),2)+' m':'—')+'</td><td>'+(r[1]>0?fmt(r[2],0)+'°':'—')+'</td><td style="text-align:left;font-family:var(--f-b)">'+(r[1]===0?'sin sol directo':r[1]<1.2?'alero / visera horizontal':'aletas verticales, celosía o lamas')+'</td></tr>'; }).join("")+'</tbody></table></div>';
      s+=u.fx(fxo("so1"),'δ = 23,45°·sen(360·(284+n)/365) → '+fmt(dec,2)+'° · H = 15°·(t − 12) = '+fmt(15*(st.hr-12),2)+'°<br>sen(α) = sen φ·sen δ + cos φ·cos δ·cos H → α = <em>'+fmt(sp.alt,2)+'°</em> · azimut A = '+fmt(sp.az,1)+'°<br>Ángulo de sombra vertical: tan(VSA) = tan α / cos(A − Af)'+(v?' = tan '+fmt(sp.alt,1)+'° / cos '+fmt(v.hsa,1)+'° → VSA = '+fmt(v.v,2)+'°':'')+'<br>Alero D = h ventana / tan(VSA)'+(D!=null?' = '+fmt(st.hvw,2)+' / tan '+fmt(v.v,1)+'° = <u>'+fmt(D,2)+' m</u>':'')+'<small>En latitudes ecuatoriales el sol pasa casi por el cénit: las fachadas N y S se protegen con aleros cortos; Este y Oeste reciben sol bajo y necesitan protección vertical o retranqueo. Hora solar ≈ hora oficial − 0:20 en Guayaquil.</small>')+'</div>';
      return s;
    }
    function gauOut(c){
      var t=ctx.P&&ctx.P.terreno, pts=t&&t.local;
      if(!pts||pts.length<3) return '<div class="'+P+'-card"><div class="'+P+'-h">Área por coordenadas</div><p class="'+P+'-mut">El proyecto no tiene polígono de terreno. Dibuja el terreno en la estación de sitio para calcular el área por Gauss.</p></div>';
      var gs=gauss(pts), pe=perim(pts), xs=pts.map(function(p){return p[0];}), ys=pts.map(function(p){return p[1];});
      var x0=Math.min.apply(null,xs), x1=Math.max.apply(null,xs), y0=Math.min.apply(null,ys), y1=Math.max.apply(null,ys), W=420, H=300, sc=Math.min((W-60)/(x1-x0||1),(H-60)/(y1-y0||1));
      var X=function(x){ return 30+(x-x0)*sc; }, Y=function(y){ return H-30-(y-y0)*sc; };
      var g='<svg class="'+P+'-svg" viewBox="0 0 '+W+' '+H+'" style="max-width:520px" role="img" aria-label="Polígono del terreno">';
      var cxp=X(0), cyp=Y(0);
      pts.forEach(function(p,i){ var q=pts[(i+1)%pts.length]; g+='<path d="M'+cxp+' '+cyp+'L'+X(p[0])+' '+Y(p[1])+'L'+X(q[0])+' '+Y(q[1])+'Z" fill="'+(gs.rows[i][3]>=0?'rgba(182,255,60,.10)':'rgba(255,92,122,.12)')+'" stroke="rgba(182,255,60,.35)" stroke-dasharray="2 3"/>'; });
      g+='<path d="M'+pts.map(function(p){return X(p[0]).toFixed(1)+" "+Y(p[1]).toFixed(1);}).join("L")+'Z" fill="none" stroke="#38E1FF" stroke-width="2.4" class="'+P+'-flow" style="filter:drop-shadow(0 0 5px #38E1FF)"/>';
      pts.forEach(function(p,i){ g+='<circle cx="'+X(p[0])+'" cy="'+Y(p[1])+'" r="4" fill="#38E1FF"/><text x="'+(X(p[0])+6)+'" y="'+(Y(p[1])-6)+'" font-size="10" fill="var(--acc)">P'+(i+1)+'</text>'; });
      g+='<circle cx="'+cxp+'" cy="'+cyp+'" r="3" fill="#B6FF3C"/><text x="'+(cxp+5)+'" y="'+(cyp+12)+'" font-size="9" fill="#B6FF3C">origen (0,0)</text></svg>';
      var s='<div class="'+P+'-card">'+u.hd("Área del terreno por coordenadas","Fórmula de Gauss (shoelace)","g1",fxo("g1"));
      var dif=ctx.area?(gs.A-ctx.area)/ctx.area:0;
      s+='<div class="'+P+'-kpis">'+u.kpi("Área Gauss",fmt(gs.A,2)+" m²",pts.length+" vértices")+u.kpi("Perímetro",fmt(pe,2)+" m")+u.kpi("Área registrada",fmt(ctx.area,2)+" m²","diferencia "+fmt(dif*100,2)+" %",Math.abs(dif)>.02?"var(--warn)":"rgba(var(--done-rgb),.6)")+'</div>';
      s+='<div class="'+P+'-row" style="align-items:flex-start;margin-top:10px"><div style="flex:1.2;min-width:240px">'+g+'</div><div style="flex:1;min-width:220px"><div class="'+P+'-tw"><table class="'+P+'-tb"><thead><tr><th>Pi</th><th>x (E)</th><th>y (N)</th><th>xi·yi+1 − xi+1·yi</th></tr></thead><tbody>'+gs.rows.map(function(r){ return '<tr><td>P'+r[0]+'</td><td>'+fmt(r[1],2)+'</td><td>'+fmt(r[2],2)+'</td><td>'+fmt(r[3],2)+'</td></tr>'; }).join("")+'<tr class="on"><td>Σ</td><td></td><td></td><td>'+fmt(gs.s,2)+'</td></tr></tbody></table></div></div></div>';
      s+=u.fx(fxo("g1"),'A = ½ · |Σ (xi·yi+1 − xi+1·yi)| = ½ · |'+fmt(gs.s,2)+'| = <u>'+fmt(gs.A,2)+' m²</u><br>Perímetro = Σ √((xi+1 − xi)² + (yi+1 − yi)²) = '+fmt(pe,2)+' m<small>Coordenadas locales (Este, Norte) en metros. Signo positivo = vértices en sentido antihorario. Comparar con escritura y catastro: en Ecuador las diferencias se regularizan por excedentes/diferencias de área (COOTAD art. 481.1).</small>');
      return s+'</div>';
    }

    /* ── render principal ── */
    function body(){
      var c=estCalc(ctx,st);
      if(ES.tab==="dat") return X.datT();
      if(ES.tab==="rec") return X.recT();
      if(ES.tab==="calc") return X.calcT();
      if(ES.tab==="mem") return X.memT();
      if(ES.tab==="sis") return sisT();
      if(ES.tab==="car") return '<div class="'+P+'-g2">'+carCtl(c)+'<div class="'+P+'-col" data-z="out">'+carOut(c)+'</div></div>';
      if(ES.tab==="sis2") return '<div class="'+P+'-g2">'+sisCtl(c)+'<div class="'+P+'-col" data-z="out">'+sisOut(c)+'</div></div>';
      if(ES.tab==="pre") return '<div class="'+P+'-g2">'+preCtl(c)+'<div class="'+P+'-col" data-z="out">'+preOut(c)+'</div></div>';
      if(ES.tab==="geo") return geoT();
      return '<div class="'+P+'-hd"><span class="'+P+'-h">Pasos de las materias</span><span class="'+P+'-sp"></span><span class="'+P+'-fnt">Geometría y trigonometría · Estática · Resistencia de materiales</span></div>'+ckHTML(P,["tri","est","res"],ES.ckm,st.ck,ES.cko,"#38E1FF");
    }
    function paint(){
      root.querySelectorAll("."+P+"-tab").forEach(function(b){ b.setAttribute("aria-selected",b.dataset.v===ES.tab); });
      main.innerHTML=body(); X.after(); main.scrollTop=ES.scroll[ES.tab]||0;
    }
    function repaint(){ var sc=main.scrollTop; main.innerHTML=body(); X.after(); main.scrollTop=sc; }
    function outOnly(){
      var z=main.querySelector('[data-z="out"]'); if(!z){ repaint(); return; }
      var c=estCalc(ctx,st);
      z.innerHTML=ES.tab==="car"?carOut(c):ES.tab==="sis2"?sisOut(c):ES.tab==="pre"?preOut(c):ES.geo==="ram"?ramOut():ES.geo==="esc"?escOut(c):ES.geo==="sol"?solOut(c):"";
    }
    var LBL={dAc:function(v){return fmt(v,2);},dCr:function(v){return fmt(v,2);},dMp:function(v){return fmt(v,2);},dVc:function(v){return fmt(v,2);},rv:function(v){return "L/"+fmt(v,1);},qa:function(v){return fmt(v,2)+" kg/cm²";},
      rH:function(v){return fmt(v,2)+" m";},eHm:function(v){return fmt(v,1)+" cm";},eN:function(v){return v+"";},eW:function(v){return fmt(v,2)+" m";},hr:hhmm,hvw:function(v){return fmt(v,2)+" m";}};
    root.addEventListener("click",function(ev){
      var b=ev.target.closest("[data-act]"); if(!b||!root.contains(b)) return; var a=b.dataset.act, v=b.dataset.v;
      if(a==="stp"&&String(b.dataset.k).charAt(0)==="x"){ X.stp(b.dataset.k,+b.dataset.d); return; }
      if(X.click(a,b,v)) return;
      if(a==="tab"){ ES.tab=v; paint(); return; }
      if(a==="next"){ ctx.next(); return; }
      if(a==="fx"){ ES.fx[v]=!ES.fx[v]; repaint(); return; }
      if(a==="geo"){ ES.geo=v; repaint(); return; }
      if(a==="cvall"){ ES.cvAll=!ES.cvAll; repaint(); return; }
      if(a==="ckm"){ ES.ckm=v; ES.cko=null; repaint(); return; }
      if(a==="cko"){ ES.cko=ES.cko===v?null:v; repaint(); return; }
      if(a==="cks"){ var n=ckNext(st.ck[v]); if(n) st.ck[v]=n; else delete st.ck[v]; save(); repaint(); return; }
      if(a==="conf"){ st.conf[v]=true; save(); ctx.toast("Dato confirmado"); repaint(); return; }
      if(a==="col"){ var i=+b.dataset.i, j=+b.dataset.j, c=estCalc(ctx,st), ex=(i===0||i===c.nx), ey=(j===0||j===c.ny); st.ci=i; st.cj=j; st.ctype=ex&&ey?"esq":ex||ey?"bor":"int"; save(); repaint(); return; }
      if(a==="ctype"){ var c2=estCalc(ctx,st); st.ctype=v; if(v==="int"){ st.ci=Math.max(1,Math.floor(c2.nx/2)); st.cj=Math.max(1,Math.floor(c2.ny/2)); if(c2.nx<2||c2.ny<2){ ctx.toast("La grilla no tiene columnas interiores"); } } else if(v==="bor"){ st.ci=Math.max(1,Math.floor(c2.nx/2)); st.cj=0; if(c2.nx<2){ st.ci=0; st.cj=Math.max(1,Math.floor(c2.ny/2)); } } else { st.ci=0; st.cj=0; } save(); repaint(); return; }
      if(a==="stp"){ var k=b.dataset.k, dd=+b.dataset.d; st[k]=clamp(Math.round((st[k]+dd*.25)*100)/100,2.5,20); save(); repaint(); return; }
      if(a==="z"){ st.z=+v; st.conf.z=false; save(); repaint(); return; }
      if(a==="suelo"){ st.suelo=v; st.conf.suelo=false; save(); repaint(); return; }
      if(a==="qa"){ st.qa=+v; st.conf.qa=false; save(); repaint(); return; }
      if(a==="sis"){ st.sis=v; save(); repaint(); if(ES.tab==="sis") ctx.toast("Sistema: "+SIS1I[v].n); return; }
      if(a==="eta"||a==="I"||a==="fP"||a==="fE"||a==="fc"){ st[a]=+v; save(); repaint(); return; }
      if(a==="cv"||a==="losa"||a==="rT"||a==="fecha"||a==="fach"){ st[a]=v; if(a==="rT") st.rH=Math.min(st.rH,v==="veh"?6:3); save(); repaint(); return; }
    });
    root.addEventListener("change",function(ev){ X.change(ev); });
    root.addEventListener("input",function(ev){
      if(X.input(ev)) return;
      var t=ev.target; if(t.dataset.act!=="sl") return; var k=t.dataset.k, v=+t.value;
      st[k]=v; if(k==="qa") st.conf.qa=false; save();
      var o=main.querySelector('[data-o="'+k+'"]'); if(o&&LBL[k]) o.textContent=LBL[k](v);
      outOnly();
    });
    paint();
    return function(){ root.remove(); };
  }
};

/* ═══════════════════════════ 2. INSTALACIONES ═══════════════════════════ */
/* Dotaciones de agua (L/día) — NEC-11 cap. 16 (Norma Hidrosanitaria) y RNE IS.010 como referencia. [clave, etiqueta, L/día, unidad, f(pr) cantidad] */
function DOT(cat,pr){
  var A=pr.A, util=A*.8;
  var T={
    SAL:[["cama","Camas de hospitalización",800,"cama",A/140],["cons","Consultorios / boxes de atención",500,"consultorio",A/250],["per","Personal por turno",50,"persona",A/40]],
    RES:[["hab","Habitantes",250,"habitante",A/30]],
    HOS:[["dor","Dormitorios / habitaciones",500,"habitación",A/45],["per","Personal",50,"persona",A/120]],
    OFI:[["m2","Área útil de oficinas",6,"m²",util]], GOB:[["m2","Área útil de oficinas públicas",6,"m²",util],["vis","Visitantes diarios",10,"visitante",A/20]],
    SEG:[["m2","Área útil",6,"m²",util],["dor","Dormitorios de guardia",200,"cama",A/200]],
    MIX:[["m2","Comercio y oficinas (área útil)",6,"m²",util*.6],["hab","Habitantes",250,"habitante",A*.4/30]],
    COM:[["m2","Área de ventas",6,"m²",util]], GAS:[["com","Área de comedor",40,"m²",A*.45],["per","Personal",50,"persona",A/30]],
    EDU:[["alu","Alumnos (externado)",50,"alumno",A/5],["doc","Docentes y personal",50,"persona",A/60]],
    CUL:[["asi","Asientos / visitantes",3,"asiento",A/3],["per","Personal",50,"persona",A/100]], REL:[["asi","Asientos",3,"asiento",A/1.5]],
    SOC:[["usu","Usuarios diarios",25,"usuario",A/8]], EVE:[["asi","Asientos / asistentes",3,"asiento",A/1.5],["per","Personal",50,"persona",A/100]],
    DEP:[["dep","Deportistas (duchas)",60,"usuario",A/10],["esp","Espectadores",3,"asiento",A/4]],
    TRA:[["pas","Pasajeros / usuarios diarios",10,"usuario",A/2],["per","Personal",50,"persona",A/80]],
    IND:[["obr","Trabajadores",80,"trabajador",A/30],["pro","Agua de proceso",2,"m²",A]], AGR:[["obr","Trabajadores",80,"trabajador",A/50],["pro","Animales / proceso",5,"m²",A]],
    CIE:[["per","Investigadores y personal",120,"persona",A/15]], INF:[["m2","Área útil",6,"m²",util]], PUB:[["usu","Visitantes diarios",5,"visitante",A]], EFI:[["m2","Área útil",6,"m²",util]], FUT:[["m2","Área útil",6,"m²",util]]
  };
  return (T[cat]||T.OFI).map(function(x){ return [x[0],x[1],x[2],x[3],Math.max(1,Math.round(x[4]))]; });
}
/* Densidades eléctricas W/m² [iluminación, tomas, fuerza/equipos], factor de demanda */
var DENS={RES:[8,15,5,.5],HOS:[10,15,10,.65],COM:[18,15,10,.75],GAS:[12,20,45,.75],OFI:[10,25,5,.7],MIX:[12,20,8,.65],SAL:[14,25,35,.75],EDU:[10,10,5,.65],CUL:[15,10,10,.7],REL:[10,5,2,.6],GOB:[10,25,5,.7],SEG:[10,20,10,.75],SOC:[10,10,5,.6],DEP:[12,5,10,.7],PUB:[3,2,2,.8],EVE:[20,10,20,.7],TRA:[12,10,15,.75],IND:[12,10,60,.7],AGR:[6,5,30,.7],INF:[8,10,40,.75],CIE:[14,30,40,.75],EFI:[8,10,5,.6],FUT:[12,20,15,.7]};
var TRAFO=[30,45,50,75,100,112.5,150,200,225,300,400,500,630,750,800,1000,1250,1500,2000,2500];
var GENS=[20,30,45,60,80,100,125,150,200,250,300,350,400,500,600,750,800,1000,1250,1500,2000,2500];
/* m² por tonelada de refrigeración (clima cálido-húmedo) */
var M2TR={RES:28,HOS:22,COM:18,GAS:15,OFI:20,MIX:20,SAL:16,EDU:22,CUL:18,REL:20,GOB:20,SEG:20,SOC:20,DEP:25,EVE:12,TRA:18,IND:30,CIE:16};
/* Riesgo NFPA 13 por tipología */
var RIESGO=[["leve","Leve"],["or1","Ordinario 1"],["or2","Ordinario 2"],["ext","Extra"]];
var RZ={SAL:"leve",EDU:"leve",OFI:"leve",RES:"leve",HOS:"leve",REL:"leve",CUL:"leve",GOB:"leve",SOC:"leve",SEG:"leve",FUT:"leve",EFI:"leve",GAS:"or1",TRA:"or1",DEP:"or1",CIE:"or1",PUB:"leve",COM:"or2",MIX:"or2",EVE:"or2",AGR:"or2",IND:"or2",INF:"or2"};
var RZD={leve:{cov:20.9,den:4.1,da:139,hose:379,t:30},or1:{cov:12.1,den:6.1,da:139,hose:946,t:60},or2:{cov:12.1,den:8.1,da:139,hose:946,t:60},ext:{cov:9.3,den:12.2,da:232,hose:1893,t:90}};
/* Carga de ocupación m²/persona (NFPA 101 tabla 7.3.1.2, bruto aprox.) y recorrido máx. con rociadores (m) */
var OCUP={SAL:[11.1,61],EDU:[4,61],OFI:[9.3,91],RES:[18.6,61],HOS:[18.6,61],COM:[4,76],GAS:[2.8,76],CUL:[2.8,76],REL:[1.4,76],EVE:[1.4,76],DEP:[2.8,76],TRA:[2.8,76],IND:[9.3,76],AGR:[27.9,122],CIE:[9.3,76],GOB:[9.3,91],SEG:[9.3,91],SOC:[2.8,76],PUB:[2.8,76],INF:[27.9,122],EFI:[4.6,61],FUT:[9.3,91],MIX:[6,76]};
var DN=[20,25,32,40,50,63,75,90,110,125,160,200];
function dnFor(Q,v){ var d=Math.sqrt(4*Q/1000/(Math.PI*v))*1000; return DN.filter(function(x){return x>=d;})[0]||250; }
function lluviaDef(ctx){ var z=ctx.clima&&ctx.clima.zona; return z==="sierra"?80:z==="amazonia"?150:z==="galapagos"?80:120; }
function anualDef(ctx){ var z=ctx.clima&&ctx.clima.zona; return z==="sierra"?1100:z==="amazonia"?3000:z==="galapagos"?400:1050; }

function insCalc(ctx,st){
  var pr=proj(ctx), cat=pr.cat, Afl=pr.A/pr.pisos, sal=cat==="SAL";
  /* agua */
  var items=DOT(cat,pr).map(function(x){ var q=st.q[x[0]]!=null?st.q[x[0]]:x[4]; return {k:x[0],n:x[1],dot:x[2],u:x[3],q:q,auto:x[4],L:q*x[2]}; });
  var verde=pr.area>0?Math.max(0,pr.area*(1-pr.cos)*.5):0, riego=verde*2;
  var Qd=items.reduce(function(a,x){return a+x.L;},0)+riego;
  var camas=sal?(st.q.cama!=null?st.q.cama:items[0].q):0;
  /* aparatos y Hunter */
  var inod=Math.ceil(pr.A/(sal?90:cat==="EDU"?110:150)), lav=Math.ceil(inod*1.3), duch=Math.ceil(sal?camas/3:cat==="DEP"?pr.A/120:cat==="RES"||cat==="HOS"?pr.A/60:pr.A/1500), uri=Math.ceil(inod/3), freg=Math.ceil(pr.A/(cat==="GAS"?60:500));
  var flux=st.flux, uhI=flux?8:5;
  var ap=[["Inodoros",inod,uhI,flux?8:4],["Lavamanos",lav,2,2],["Duchas",duch,4,3],["Urinarios",uri,flux?5:3,4],["Fregaderos / pocetas",freg,4,3]];
  var UH=ap.reduce(function(a,x){return a+x[1]*x[2];},0), UD=ap.reduce(function(a,x){return a+x[1]*x[3];},0);
  var Qt=.0687*Math.pow(UH,.695), Qmp=flux?Math.max(Qt,.42*Math.pow(UH,.38)):Qt;
  var Vsci; /* se calcula abajo */
  /* incendio */
  var rz=st.rz||RZ[cat]||"leve", rd=RZD[rz], ocf=OCUP[cat]||[9.3,76];
  var roc=st.roc!=null?st.roc:(sal||pr.pisos>4||cat==="EVE"||cat==="IND"||(cat==="COM"&&pr.A>1500));
  var occ=Math.ceil(Afl/ocf[0]), nEx=occ>1000?4:occ>500?3:2;
  var mmS=roc?7.6:10, wNeed=occ*mmS/1000, wEsc=Math.max(1.2,rnd(wNeed/nEx,.05)), corr=sal?2.44:1.2;
  var nBIEp=Math.max(nEx,Math.ceil(Afl/1100)), nBIE=nBIEp*pr.pisos;
  var nExt=Math.ceil(pr.A/150), nRoc=roc?Math.ceil(pr.A/rd.cov):0, nDet=Math.ceil(pr.A/80);
  var Qspr=rd.den*rd.da*1.15, Vspr=(Qspr+rd.hose)*rd.t/1000, Vbie=2*378*30/1000;
  Vsci=roc?Math.max(Vspr,Vbie):Vbie;
  var Qsci=(roc?Qspr+rd.hose:2*378)/60, Hsci=pr.alt+45, HPsci=Qsci*Hsci/(76*.65);
  /* cisterna */
  var Vcons=Qd*st.dias/1000, Vcis=Vcons+Vsci, hU=2.5, Acis=Vcis/hU*1.15;
  var Vtan=Qd/3/1000;
  var TDH=(pr.alt+14)*1.2, HP=Qmp*TDH/(76*.6);
  var HPc=[.5,.75,1,1.5,2,3,5,7.5,10,15,20,25,30,40,50,60,75,100].filter(function(x){return x>=HP;})[0]||125;
  var HPs=[5,7.5,10,15,20,25,30,40,50,60,75,100,125,150,200].filter(function(x){return x>=HPsci;})[0]||250;
  var dImp=dnFor(Qmp,1.5), dAco=dnFor(Qd/86400*2.5,1.2);
  /* servidas */
  var nNuc=Math.max(1,Math.ceil(pr.foot/1200)), nBajS=nNuc*2, udB=UD/nBajS;
  var dBajS=udB<=10?50:udB<=30?75:udB<=240?110:udB<=960?160:200;
  var colT=[[110,[180,216,250]],[160,[700,840,1000]],[200,[1600,1920,2300]],[250,[2900,3500,4200]],[315,[4600,5600,6700]]];
  var pi=st.pend>=4?2:st.pend>=2?1:0, dCol=(colT.filter(function(r){return r[1][pi]>=UD;})[0]||colT[colT.length-1])[0];
  /* lluvias */
  var Acub=pr.foot, Ir=st.Ilu, Qll=.95*Ir*Acub/3600;
  var CAP={75:204,110:427,160:1254}, dB=+st.dBaj, capA=CAP[dB]*100/Ir;
  var perim=4*Math.sqrt(Acub), nBajL=Math.max(Math.ceil(Acub/capA),Math.ceil(perim/20),2);
  var Vanual=Acub*st.anual/1000*.8;
  /* HVAC */
  var clZ=ctx.clima&&ctx.clima.zona, sierra=clZ==="sierra", ratio=st.ratio, Aclim=pr.A*st.pclim/100, TR=Aclim/ratio, kWhv=TR*1.2;
  var hvs=TR<=5?"Equipos split / minisplit inverter":TR<=60?"VRF (volumen de refrigerante variable)":TR<=150?"VRF por zonas o rooftop":"Chiller de agua helada + UMAs / fan coils";
  /* eléctrico */
  var dens=[st.il,st.to,st.fu], ilu=pr.A*dens[0]/1000, tom=pr.A*dens[1]/1000, fue=pr.A*dens[2]/1000;
  var nAsc=pr.pisos<=1?0:sal?Math.max(2,Math.ceil(camas/50)+1):Math.max(pr.pisos>=4?2:1,Math.ceil(pr.A/5000)), kAsc=nAsc*15, kBom=HPc*.746*2;
  var kIns=ilu+tom+fue+kWhv+kAsc+kBom, kDem=kIns*st.fd, kVA=kDem/.9;
  var trafo=TRAFO.filter(function(x){return x>=kVA*1.2;})[0]||Math.ceil(kVA*1.2/500)*500, nTr=1;
  if(kVA*1.2>2500){ nTr=Math.ceil(kVA*1.2/2000); trafo=TRAFO.filter(function(x){return x>=kVA*1.2/nTr;})[0]; }
  var genKW=kDem*st.gp/100, genKVA=GENS.filter(function(x){return x>=genKW/.8;})[0]||Math.ceil(genKW/.8/500)*500;
  var diesel=.25*genKW*.75*st.gh;
  var aCam=trafo*nTr<=300?12:trafo*nTr<=1000?20:30, aTab=Math.max(6,4+kVA/60), aGen=genKVA<100?15:genKVA<300?25:genKVA<800?35:50;
  /* gases (salud) */
  var uci=Math.round(camas*.1), quir=Math.max(sal?1:0,Math.round(camas/25));
  var gO2=camas+2*uci+2*quir, gVac=camas+2*uci+3*quir, gAir=camas+2*uci+2*quir;
  var o2dia=gO2*10*.15*60*24/1000;
  /* datos y seguridad */
  var pRed=Math.ceil(pr.A/(cat==="OFI"||cat==="GOB"?8:sal?10:15)), cam=Math.ceil(pr.A/200)+Math.ceil((ctx.P&&ctx.P.terreno&&ctx.P.terreno.per||perim)/30);
  /* espacios técnicos */
  var shF=Math.max(.6,pr.foot*.002)+Math.max(.5,pr.foot*.0012)+(TR>0?Math.max(.8,pr.foot*.004):0)+.4*nNuc, shT=shF*pr.pisos;
  var esp=[
    ["agua","Cisterna (consumo + SCI)",Acis,"Enterrada · h útil 2,5 m · 2 celdas para limpieza"],
    ["agua","Cuarto de bombas (agua + SCI)",Math.max(12,8+Vcis*.08),"Hidroneumático, bomba principal, jockey y diésel/eléctrica SCI"],
    ["ele","Cámara de transformación",aCam*nTr,nTr+" × "+fmt(trafo,1)+" kVA · acceso vehicular, ventilación"],
    ["ele","Cuarto de tableros (TGD)",aTab,"Frente libre 1,0 m · cerca de la cámara"],
    ["ele","Generador + tanque diésel",aGen,fmt(genKVA)+" kVA · insonorizado · tanque "+fmt(diesel)+" L"],
    ["hvac",TR>150?"Chiller + cuarto de bombas HVAC":"Zona de condensadoras (azotea)",TR>150?TR*.35+20:TR*.25,fmt(TR,0)+" TR"],
    ["hvac","Cuartos de UMA / ventilación",TR>0?pr.A*.012:0,"≈ 1,2 % del área en edificios climatizados"],
    ["dat","Cuarto de telecom. principal (MDF)",Math.max(9,pr.A/1000),"TIA-569 · climatizado"],
    ["dat","Cuartos de telecom. por piso (IDF)",6*pr.pisos*nNuc,"≈ 6 m² por piso y núcleo"],
    ["inc","Centro de control / monitoreo (seguridad)",Math.max(8,pr.A/1500),"Panel de detección, CCTV, accesos"],
    ["res","Cuarto de residuos sólidos",sal?10+pr.A/800:6+pr.A/2000,sal?"Comunes + infecciosos + cortopunzantes (Reglamento de desechos sanitarios)":"Separación en la fuente"],
    ["sha","Shafts verticales (todas las plantas)",shT,fmt(shF,2)+" m² por planta ("+nNuc+" núcleo(s)) × "+pr.pisos+" pisos"],
    ["asc","Ductos de ascensores",nAsc*(sal?7.8:6.5)*pr.pisos,nAsc+" ascensor(es)"+(sal?" (camilleros 2,6 × 3,0 m)":"")]
  ];
  if(sal) esp.push(["gas","Central de gases medicinales",Math.max(20,10+camas*.3),"Manifold O₂, compresores de aire, bombas de vacío"]);
  esp=esp.filter(function(e){return e[2]>0.01;});
  var Aesp=esp.reduce(function(a,e){return a+e[2];},0);
  return {pr:pr,cat:cat,Afl:Afl,sal:sal,items:items,verde:verde,riego:riego,Qd:Qd,camas:camas,ap:ap,UH:UH,UD:UD,Qt:Qt,Qmp:Qmp,rz:rz,rd:rd,roc:roc,occ:occ,nEx:nEx,mmS:mmS,wNeed:wNeed,wEsc:wEsc,corr:corr,ocf:ocf,nBIEp:nBIEp,nBIE:nBIE,nExt:nExt,nRoc:nRoc,nDet:nDet,Qspr:Qspr,Vspr:Vspr,Vbie:Vbie,Vsci:Vsci,Qsci:Qsci,Hsci:Hsci,HPsci:HPsci,HPs:HPs,
    Vcons:Vcons,Vcis:Vcis,Acis:Acis,Vtan:Vtan,TDH:TDH,HP:HP,HPc:HPc,dImp:dImp,dAco:dAco,nNuc:nNuc,nBajS:nBajS,udB:udB,dBajS:dBajS,dCol:dCol,Acub:Acub,Ir:Ir,Qll:Qll,dB:dB,capA:capA,perim:perim,nBajL:nBajL,Vanual:Vanual,
    sierra:sierra,Aclim:Aclim,TR:TR,kWhv:kWhv,hvs:hvs,dens:dens,ilu:ilu,tom:tom,fue:fue,nAsc:nAsc,kAsc:kAsc,kBom:kBom,kIns:kIns,kDem:kDem,kVA:kVA,trafo:trafo,nTr:nTr,genKW:genKW,genKVA:genKVA,diesel:diesel,aCam:aCam,aTab:aTab,aGen:aGen,
    uci:uci,quir:quir,gO2:gO2,gVac:gVac,gAir:gAir,o2dia:o2dia,pRed:pRed,cam:cam,shF:shF,shT:shT,esp:esp,Aesp:Aesp};
}
var ESPC={agua:"#38E1FF",ele:"#FFC24B",hvac:"#B26BFF",dat:"#B6FF3C",inc:"#FF5C7A",res:"#8CA0B6",sha:"#4F7DFF",asc:"#E36BE0",gas:"#4FFFB0"};
var ESPN={agua:"Agua",ele:"Eléctrico",hvac:"HVAC",dat:"Datos",inc:"Seguridad",res:"Residuos",sha:"Shafts",asc:"Ascensores",gas:"Gases médicos"};

var IS={tab:"agua",fx:{},ckm:"ins",cko:null,scroll:{}};

DM.instalaciones={
  titulo:"Instalaciones",
  sub:"Hidrosanitarias · eléctricas · contra incendios · HVAC y especiales",
  render:function(el,ctx){
    var P="m-instalaciones", u=UI(P);
    css("mod-instalaciones-css",extCSS(P)+
      ".m-instalaciones-it{display:grid;grid-template-columns:1fr auto;gap:6px 10px;align-items:center;padding:8px 0;border-bottom:1px dashed rgba(120,200,255,.1)}"+
      ".m-instalaciones-it small{display:block;color:var(--faint);font-family:var(--f-m);font-size:11px}"+
      ".m-instalaciones-rain{animation:m-instalaciones-rain 1.1s linear infinite}"+
      "@keyframes m-instalaciones-rain{0%{transform:translateY(-14px);opacity:0}20%{opacity:1}100%{transform:translateY(30px);opacity:0}}"+
      ".m-instalaciones-spin{transform-box:fill-box;transform-origin:50% 50%;animation:m-instalaciones-spin 1.4s linear infinite}"+
      "@keyframes m-instalaciones-spin{to{transform:rotate(360deg)}}"+
      ".m-instalaciones-wave{animation:m-instalaciones-wave 3s ease-in-out infinite}"+
      "@keyframes m-instalaciones-wave{0%,100%{transform:translateX(0)}50%{transform:translateX(-12px)}}"+
      ".m-instalaciones-rev{animation-direction:reverse}"+
      "@media (prefers-reduced-motion:reduce){.m-instalaciones-rain,.m-instalaciones-spin,.m-instalaciones-wave,.m-instalaciones-flow,.m-instalaciones-flowS{animation:none}}"
    );
    var sv=ctx.get("instalaciones")||{}, pr0=proj(ctx), dz=DENS[pr0.cat]||DENS.OFI, clz=ctx.clima&&ctx.clima.zona;
    function d(k,v){ return sv[k]!=null?sv[k]:v; }
    var st={q:sv.q||{},dias:d("dias",pr0.cat==="SAL"?3:pr0.cat==="RES"?1:1.5),tq:d("tq",pr0.pisos>3?"hidro":"elev"),flux:d("flux",pr0.cat==="SAL"||pr0.cat==="EDU"||pr0.cat==="TRA"),
      pend:d("pend",2),Ilu:d("Ilu",lluviaDef(ctx)),dBaj:d("dBaj","110"),anual:d("anual",anualDef(ctx)),
      il:d("il",dz[0]),to:d("to",dz[1]),fu:d("fu",dz[2]),fd:d("fd",dz[3]),gp:d("gp",pr0.cat==="SAL"?100:pr0.cat==="SEG"||pr0.cat==="CIE"?60:30),gh:d("gh",pr0.cat==="SAL"?48:8),
      rz:d("rz",""),roc:sv.roc!=null?sv.roc:null,ratio:d("ratio",Math.round((M2TR[pr0.cat]||22)*(clz==="sierra"?3:clz==="galapagos"?1.15:1))),pclim:d("pclim",clz==="sierra"?(pr0.cat==="SAL"?35:10):(pr0.cat==="SAL"?85:pr0.cat==="RES"?50:70)),
      ck:sv.ck||{},conf:sv.conf||{}};
    var save=debounce(function(){ ctx.set("instalaciones",JSON.parse(JSON.stringify(st))); },600);
    el.innerHTML="";
    var root=document.createElement("div"); root.className=P; el.appendChild(root);
    var TABS=[["agua","1 · Agua potable"],["serv","2 · Servidas y lluvias"],["ele","3 · Eléctrico"],["inc","4 · Contra incendios"],["hvac","5 · HVAC y especiales"],["esp","6 · Espacios técnicos"],["ck","7 · Pasos"]];
    root.innerHTML=topBar(P,TABS,IS.tab)+'<div class="'+P+'-main"></div><div class="'+P+'-scan"></div>';
    var main=root.querySelector("."+P+"-main");
    main.addEventListener("scroll",function(){ IS.scroll[IS.tab]=main.scrollTop; },{passive:true});
    function fxo(id){ return !!IS.fx[id]; }
    function pipe(dd,col,w,cls,extra){ return '<path d="'+dd+'" fill="none" stroke="'+col+'" stroke-opacity=".25" stroke-width="'+(w+4)+'" stroke-linecap="round" stroke-linejoin="round"/><path d="'+dd+'" fill="none" stroke="'+col+'" stroke-width="'+w+'" stroke-linecap="round" stroke-linejoin="round" class="'+P+'-'+(cls||'flow')+(extra?' '+extra:'')+'" style="filter:drop-shadow(0 0 4px '+col+')"/>'; }
    function gauge(x,y,r,p,col,lab,val){ p=clamp(p,0,1.2); var a0=Math.PI, a=a0+Math.min(p,1)*Math.PI, x1=x+r*Math.cos(a), y1=y+r*Math.sin(a), nx=x+(r-6)*Math.cos(a0+Math.min(p,1.05)*Math.PI), ny=y+(r-6)*Math.sin(a0+Math.min(p,1.05)*Math.PI);
      return '<path d="M'+(x-r)+' '+y+' A'+r+' '+r+' 0 0 1 '+(x+r)+' '+y+'" fill="none" stroke="rgba(120,200,255,.18)" stroke-width="7"/><path d="M'+(x-r)+' '+y+' A'+r+' '+r+' 0 0 1 '+x1.toFixed(1)+' '+y1.toFixed(1)+'" fill="none" stroke="'+col+'" stroke-width="7" style="filter:drop-shadow(0 0 5px '+col+')"/><line x1="'+x+'" y1="'+y+'" x2="'+nx.toFixed(1)+'" y2="'+ny.toFixed(1)+'" stroke="var(--ink)" stroke-width="1.6"/><circle cx="'+x+'" cy="'+y+'" r="3" fill="var(--ink)"/><text x="'+x+'" y="'+(y+16)+'" font-size="10" text-anchor="middle" fill="'+col+'">'+val+'</text><text x="'+x+'" y="'+(y+28)+'" font-size="8.5" text-anchor="middle" fill="var(--muted)">'+lab+'</text>'; }

    /* ── 1. AGUA ── */
    function aguaCtl(c){
      var s='<div class="'+P+'-card '+P+'-ctl'+(st.conf.dot?'':' '+P+'-warnbox')+'"><div class="'+P+'-h">Población servida y dotación</div>';
      c.items.forEach(function(x){ var stp=Math.max(1,Math.round(x.q*.05)); s+='<div class="'+P+'-it"><div>'+E(x.n)+'<small>'+fmt(x.dot)+' L/'+E(x.u)+'·día'+(st.q[x.k]!=null?' · auto '+fmt(x.auto):'')+'</small></div><div class="'+P+'-stp"><button data-act="q" data-k="'+x.k+'" data-d="-'+stp+'">−</button><b>'+fmt(x.q)+'</b><button data-act="q" data-k="'+x.k+'" data-d="'+stp+'">+</button></div></div>'; });
      s+='<div class="'+P+'-fnt">Riego de áreas verdes: '+fmt(c.verde)+' m² × 2 L/m²·día (50 % del área libre).</div><div class="'+P+'-row">'+u.pv("dot",st.conf.dot,"Confirmar población")+'</div>';
      s+=u.sl("dias","Reserva de consumo",st.dias,.5,4,.5,fmt(st.dias,1)+" días",c.sal?"Salud: 2–3 días de autonomía (continuidad de servicio)":"Guayaquil/Interagua: típico 1 día; zonas con cortes 2 días");
      s+=u.chips("tq",[["hidro","Hidroneumático / presión constante"],["elev","Tanque elevado"]],st.tq,"Sistema de distribución");
      s+=u.chips("flux",[["0","Inodoros con tanque"],["1","Fluxómetros (válvula)"]],st.flux?"1":"0","Aparatos");
      return s+'</div>';
    }
    function aguaOut(c){
      var s='<div class="'+P+'-card">'+u.hd("Demanda y reserva de agua","NEC-11 cap. 16 · Reglamento SCI","a1",fxo("a1"));
      s+='<div class="'+P+'-kpis">'+u.kpi("Consumo diario",fmt(c.Qd/1000,1)+" m³/día",fmt(c.Qd)+" L/día")+u.kpi("Cisterna total",fmt(c.Vcis,1)+" m³",fmt(c.Vcons,1)+" consumo + "+fmt(c.Vsci,1)+" SCI","rgba(var(--done-rgb),.6)")+u.kpi(st.tq==="elev"?"Tanque elevado":"Hidroneumático",st.tq==="elev"?fmt(c.Vtan,1)+" m³":fmt(c.Qmp,2)+" L/s",st.tq==="elev"?"⅓ del consumo diario":"Qmáx. probable (Hunter)")+u.kpi("Bomba",c.HPc+" HP","TDH ≈ "+fmt(c.TDH,0)+" m.c.a. · impulsión Ø "+c.dImp+" mm")+'</div>';
      /* esquema animado */
      var W=720,H=300,g0=190, cisW=170, cisH=80, fS=c.Vsci/c.Vcis, n=c.pr.pisos, bx=500, bw=190, fh=Math.min(36,(g0-30)/n);
      var g='<svg class="'+P+'-svg" viewBox="0 0 '+W+' '+H+'" role="img" aria-label="Esquema de abastecimiento de agua"><defs><clipPath id="'+P+'-cc"><rect x="120" y="'+(g0+10)+'" width="'+cisW+'" height="'+cisH+'"/></clipPath></defs>';
      g+='<line x1="0" x2="'+W+'" y1="'+g0+'" y2="'+g0+'" stroke="var(--muted)" stroke-opacity=".5"/><text x="4" y="'+(g0-6)+'" font-size="9" fill="var(--faint)">N ± 0,00</text>';
      g+=pipe("M0 "+(g0+30)+" H62",'#38E1FF',3)+'<circle cx="80" cy="'+(g0+30)+'" r="15" fill="var(--bg)" stroke="#38E1FF"/><line x1="80" y1="'+(g0+30)+'" x2="88" y2="'+(g0+22)+'" stroke="#B6FF3C" stroke-width="2"><animateTransform attributeName="transform" type="rotate" from="0 80 '+(g0+30)+'" to="360 80 '+(g0+30)+'" dur="3s" repeatCount="indefinite"/></line><text x="70" y="'+(g0+60)+'" font-size="9" text-anchor="middle" fill="var(--muted)">Medidor · Ø '+c.dAco+'</text>'+pipe("M95 "+(g0+30)+" H125",'#38E1FF',3);
      var lvl=cisH*.82, sciH=lvl*fS;
      g+='<rect x="120" y="'+(g0+10)+'" width="'+cisW+'" height="'+cisH+'" fill="rgba(56,225,255,.04)" stroke="#38E1FF" stroke-width="1.6"/>';
      g+='<g clip-path="url(#'+P+'-cc)"><rect x="120" y="'+(g0+10+cisH-sciH)+'" width="'+cisW+'" height="'+sciH+'" fill="rgba(255,92,122,.32)"/><path class="'+P+'-wave" d="M100 '+(g0+10+cisH-lvl)+' q15 -5 30 0 t30 0 t30 0 t30 0 t30 0 t30 0 t30 0 V'+(g0+10+cisH-sciH)+' H100Z" fill="rgba(56,225,255,.32)"/></g>';
      g+='<text x="205" y="'+(g0+10+cisH-lvl+18)+'" font-size="10" text-anchor="middle" fill="#38E1FF">consumo '+fmt(c.Vcons,1)+' m³</text><text x="205" y="'+(g0+10+cisH-4)+'" font-size="10" text-anchor="middle" fill="#FF5C7A">reserva SCI '+fmt(c.Vsci,1)+' m³</text><text x="205" y="'+(g0+cisH+24)+'" font-size="9" text-anchor="middle" fill="var(--muted)">Cisterna '+fmt(c.Vcis,1)+' m³ · '+fmt(c.Acis,1)+' m²</text>';
      g+=pipe("M290 "+(g0+40)+" H335",'#38E1FF',3)+'<circle cx="350" cy="'+(g0+40)+'" r="15" fill="var(--bg)" stroke="#B6FF3C" stroke-width="1.5"/><path class="'+P+'-spin" d="M350 '+(g0+29)+' L353 '+(g0+40)+' L350 '+(g0+51)+' L347 '+(g0+40)+'Z M339 '+(g0+40)+' L350 '+(g0+37)+' L361 '+(g0+40)+' L350 '+(g0+43)+'Z" fill="#B6FF3C"/><text x="350" y="'+(g0+72)+'" font-size="9" text-anchor="middle" fill="var(--muted)">Bomba '+c.HPc+' HP</text>';
      if(st.tq==="hidro"){ g+=pipe("M365 "+(g0+40)+" H400 V"+(g0-10),'#38E1FF',3)+'<rect x="385" y="'+(g0-70)+'" width="30" height="62" rx="15" fill="rgba(56,225,255,.12)" stroke="#38E1FF"/><text x="400" y="'+(g0-78)+'" font-size="9" text-anchor="middle" fill="var(--muted)">Hidroneumático</text>'+pipe("M400 "+(g0-70)+" V"+(g0-90)+" H"+(bx+12)+" V"+(g0-n*fh+8),'#38E1FF',3); }
      else { var ty=g0-n*fh-36; g+=pipe("M365 "+(g0+40)+" H430 V"+(ty+10)+" H"+(bx+40),'#38E1FF',3,'flow')+'<rect x="'+(bx+40)+'" y="'+ty+'" width="60" height="28" fill="rgba(56,225,255,.15)" stroke="#38E1FF"/><text x="'+(bx+70)+'" y="'+(ty+18)+'" font-size="9" text-anchor="middle" fill="#38E1FF">'+fmt(c.Vtan,1)+' m³</text>'+pipe("M"+(bx+70)+" "+(ty+28)+" V"+(g0-n*fh)+" ",'#38E1FF',3)+pipe("M"+(bx+12)+" "+(g0-n*fh+6)+" H"+(bx+70),'#38E1FF',2); }
      for(var i=0;i<n;i++){ var y=g0-(i+1)*fh; g+='<rect x="'+bx+'" y="'+y+'" width="'+bw+'" height="'+fh+'" fill="rgba(56,225,255,.04)" stroke="rgba(56,225,255,.4)"/>'+pipe("M"+(bx+12)+" "+(y+fh*.6)+" H"+(bx+bw-30),'#38E1FF',1.6,'flowS')+'<circle cx="'+(bx+bw-24)+'" cy="'+(y+fh*.6)+'" r="3" fill="#B6FF3C" class="'+P+'-pul" style="animation-delay:'+(i*.2)+'s"/>'; }
      g+=pipe("M"+(bx+12)+" "+(g0-2)+" V"+(g0-n*fh+6),'#38E1FF',2.4);
      g+=gauge(640,265,26,c.Qmp/Math.max(c.Qmp*1.4,.5),"#B6FF3C","caudal máx. prob.",fmt(c.Qmp,2)+" L/s");
      g+='</svg>';
      s+='<div class="'+P+'-dg">'+g+'</div>'+u.fx(fxo("a1"),c.items.map(function(x){ return E(x.n)+': '+fmt(x.q)+' × '+fmt(x.dot)+' L = '+fmt(x.L)+' L/día'; }).join("<br>")+'<br>Riego: '+fmt(c.verde)+' m² × 2 = '+fmt(c.riego)+' L/día<br>Qd = Σ = <em>'+fmt(c.Qd)+' L/día</em> ('+fmt(c.Qd/86400,2)+' L/s medio)<br>Vcisterna = Qd · días + V_SCI = '+fmt(c.Qd/1000,2)+' × '+fmt(st.dias,1)+' + '+fmt(c.Vsci,1)+' = <u>'+fmt(c.Vcis,1)+' m³</u> → área ≈ V / 2,5 m × 1,15 = '+fmt(c.Acis,1)+' m²'+(st.tq==="elev"?'<br>Tanque elevado ≥ ⅓·Qd = '+fmt(c.Vtan,2)+' m³':'')+'<br>TDH ≈ (altura '+fmt(c.pr.alt,1)+' + 14 m presión mín.) × 1,2 = '+fmt(c.TDH,1)+' m · HP = Q·TDH/(76·η) = '+fmt(c.Qmp,2)+' × '+fmt(c.TDH,1)+' / (76 × 0,6) = '+fmt(c.HP,2)+' → <u>'+c.HPc+' HP</u> (+ 1 de reserva)<small>Dotaciones referenciales NEC-11 cap. 16 / RNE IS.010 (hospital 600–800 L/cama, consultorio 500 L, oficinas 6 L/m², escuelas 50 L/alumno). Verificar con la empresa de agua (Interagua, EPMAPS, ETAPA, EMAPAD) y la factibilidad del servicio.</small>')+'</div>';
      /* Hunter */
      s+='<div class="'+P+'-card">'+u.hd("Aparatos sanitarios · unidades Hunter",st.flux?"Hunter · fluxómetro":"Hunter · tanque","a2",fxo("a2"),'<span class="'+P+'-pv">Por verificar</span>');
      s+='<div class="'+P+'-tw"><table class="'+P+'-tb"><thead><tr><th>Aparato</th><th>Cantidad est.</th><th>UH c/u</th><th>UH</th></tr></thead><tbody>'+c.ap.map(function(a){ return '<tr><td>'+a[0]+'</td><td>'+a[1]+'</td><td>'+a[2]+'</td><td>'+a[1]*a[2]+'</td></tr>'; }).join("")+'<tr class="on"><td>Total</td><td></td><td></td><td>'+fmt(c.UH)+' UH</td></tr></tbody></table></div>';
      var hb='<svg class="'+P+'-svg" viewBox="0 0 600 150" role="img" aria-label="Curva de Hunter"><line x1="40" x2="590" y1="130" y2="130" stroke="var(--muted)" stroke-opacity=".4"/><line x1="40" x2="40" y1="10" y2="130" stroke="var(--muted)" stroke-opacity=".4"/>';
      var um=Math.max(c.UH*1.6,100), qm=.0687*Math.pow(um,.695)*1.3, dd="";
      for(var k=1;k<=60;k++){ var uh=um*k/60, q=st.flux?Math.max(.0687*Math.pow(uh,.695),.42*Math.pow(uh,.38)):.0687*Math.pow(uh,.695); dd+=(k>1?"L":"M")+(40+uh/um*550).toFixed(1)+" "+(130-q/qm*115).toFixed(1); }
      var px=40+c.UH/um*550, py=130-c.Qmp/qm*115;
      hb+='<path d="'+dd+'" fill="none" stroke="#38E1FF" stroke-width="2.2"/><line x1="'+px+'" x2="'+px+'" y1="'+py+'" y2="130" stroke="#B6FF3C" stroke-dasharray="3 3"/><line x1="40" x2="'+px+'" y1="'+py+'" y2="'+py+'" stroke="#B6FF3C" stroke-dasharray="3 3"/><circle cx="'+px+'" cy="'+py+'" r="5" fill="#B6FF3C" class="'+P+'-pul"/><text x="'+(px+8)+'" y="'+(py-6)+'" font-size="10" fill="#B6FF3C">'+fmt(c.UH)+' UH → '+fmt(c.Qmp,2)+' L/s</text><text x="44" y="146" font-size="9" fill="var(--faint)">Unidades Hunter (UH) → caudal máximo probable (L/s)</text></svg>';
      s+=hb+u.fx(fxo("a2"),'Cantidad estimada por área ('+fmt(c.pr.A)+' m²) · UH uso público: inodoro '+(st.flux?'fluxómetro 8':'tanque 5')+', lavamanos 2, ducha 4, urinario '+(st.flux?5:3)+', fregadero 4<br>Q = 0,0687·UH^0,695'+(st.flux?' (mín. 0,42·UH^0,38 para fluxómetros)':'')+' = <u>'+fmt(c.Qmp,2)+' L/s</u> · Ø impulsión (v = 1,5 m/s) = '+c.dImp+' mm<small>Ajuste potencial a la tabla de gastos probables de Hunter (NEC-11 / IS.010 anexo 3). Recalcular con la cantidad real de aparatos del anteproyecto.</small>')+'</div>';
      return s;
    }

    /* ── 2. SERVIDAS Y LLUVIAS ── */
    function servCtl(c){
      var s='<div class="'+P+'-card '+P+'-ctl"><div class="'+P+'-h">Parámetros</div>';
      s+=u.sl("pend","Pendiente del colector",st.pend,1,4,.5,fmt(st.pend,1)+" %","Mín. 1 % (Ø ≥ 160) · 2 % recomendado para Ø 110");
      s+='<div class="'+(st.conf.Ilu?'':P+'-warnbox')+'" style="border:1px solid var(--line);padding:8px">'+u.sl("Ilu","Intensidad de lluvia de diseño",st.Ilu,50,200,5,st.Ilu+" mm/h","Guayaquil ≈ 100–140 mm/h (curvas IDF INAMHI, Tr 10–25 años, 5–10 min)")+'<div class="'+P+'-row">'+u.pv("Ilu",st.conf.Ilu)+'</div></div>';
      s+=u.chips("dBaj",[["75","Ø 75 mm (3\")"],["110","Ø 110 mm (4\")"],["160","Ø 160 mm (6\")"]],st.dBaj,"Diámetro de bajantes pluviales");
      s+=u.sl("anual","Precipitación anual",st.anual,200,4000,50,fmt(st.anual)+" mm","Para estimar captación y reúso pluvial");
      return s+'</div>';
    }
    function servOut(c){
      var s='<div class="'+P+'-card">'+u.hd("Aguas servidas y aguas lluvias","NEC-11 cap. 16 · IPC 1106","s1",fxo("s1"));
      s+='<div class="'+P+'-kpis">'+u.kpi("Unidades de descarga",fmt(c.UD)+" UD",c.nBajS+" bajantes Ø "+c.dBajS+" mm")+u.kpi("Colector principal","Ø "+c.dCol+" mm","pendiente "+fmt(st.pend,1)+" %")+u.kpi("Caudal pluvial",fmt(c.Qll,1)+" L/s",fmt(c.Acub)+" m² de cubierta")+u.kpi("Bajantes pluviales",c.nBajL+" × Ø "+c.dB,"capacidad ≈ "+fmt(c.capA)+" m² c/u","rgba(var(--done-rgb),.6)")+u.kpi("Captación anual",fmt(c.Vanual)+" m³","≈ "+fmt(c.Vanual/365,1)+" m³/día para riego/inodoros")+'</div>';
      var W=720,H=300,g0=200,bx=120,bw=400,n=c.pr.pisos,fh=Math.min(34,(g0-70)/n),top=g0-n*fh;
      var g='<svg class="'+P+'-svg" viewBox="0 0 '+W+' '+H+'" role="img" aria-label="Esquema de desagües">';
      for(var r=0;r<26;r++){ var rx=bx-20+(r*37)%(bw+40), ry=10+(r*13)%30; g+='<line x1="'+rx+'" y1="'+ry+'" x2="'+(rx-3)+'" y2="'+(ry+10)+'" stroke="#38E1FF" stroke-width="1.4" class="'+P+'-rain" style="animation-delay:'+((r*.137)%1.1).toFixed(2)+'s"/>'; }
      g+='<path d="M'+(bx-10)+' '+(top-4)+' L'+(bx+bw/2)+' '+(top-22)+' L'+(bx+bw+10)+' '+(top-4)+'" fill="none" stroke="#38E1FF" stroke-width="2.4"/><text x="'+(bx+bw/2)+'" y="'+(top-28)+'" font-size="9.5" text-anchor="middle" fill="#38E1FF">'+st.Ilu+' mm/h → '+fmt(c.Qll,1)+' L/s</text>';
      for(var i=0;i<n;i++){ var y=g0-(i+1)*fh; g+='<rect x="'+bx+'" y="'+y+'" width="'+bw+'" height="'+fh+'" fill="rgba(56,225,255,.03)" stroke="rgba(56,225,255,.3)"/>'+pipe("M"+(bx+bw*.55)+" "+(y+fh-6)+" H"+(bx+bw*.4),"#FFC24B",1.4,'flowS')+'<rect x="'+(bx+bw*.55)+'" y="'+(y+fh-14)+'" width="12" height="9" rx="3" fill="none" stroke="#FFC24B"/>'; }
      g+=pipe("M"+(bx-6)+" "+(top-4)+" V"+(g0+30),'#38E1FF',3)+pipe("M"+(bx+bw+6)+" "+(top-4)+" V"+(g0+30),'#38E1FF',3);
      g+=pipe("M"+(bx+bw*.4)+" "+top+" V"+(g0+52),'#FFC24B',3);
      g+='<line x1="0" x2="'+W+'" y1="'+g0+'" y2="'+g0+'" stroke="var(--muted)" stroke-opacity=".5"/>';
      var sl=st.pend*1.5;
      g+=pipe("M"+(bx-6)+" "+(g0+30)+" L"+(bx+bw+6)+" "+(g0+30+sl)+" L"+(W-60)+" "+(g0+34+sl),'#38E1FF',3);
      g+=pipe("M"+(bx+bw*.4)+" "+(g0+52)+" L"+(W-60)+" "+(g0+58+sl),'#FFC24B',3.4);
      g+='<rect x="'+(W-60)+'" y="'+(g0+20)+'" width="32" height="54" fill="rgba(56,225,255,.06)" stroke="var(--muted)"/><text x="'+(W-44)+'" y="'+(g0+88)+'" font-size="9" text-anchor="middle" fill="var(--muted)">caja · red pública</text>';
      g+='<text x="'+(bx+bw*.4+8)+'" y="'+(top+14)+'" font-size="9.5" fill="#FFC24B">bajante AASS Ø '+c.dBajS+'</text><text x="'+(bx+bw+14)+'" y="'+(top+14)+'" font-size="9.5" fill="#38E1FF">AALL Ø '+c.dB+' × '+c.nBajL+'</text>';
      g+='<text x="'+(bx+40)+'" y="'+(g0+70+sl)+'" font-size="9.5" fill="#FFC24B">colector AASS Ø '+c.dCol+' @ '+fmt(st.pend,1)+' %</text><text x="'+(bx+40)+'" y="'+(g0+22)+'" font-size="9.5" fill="#38E1FF">colector AALL (red separada)</text>';
      g+='</svg>';
      s+='<div class="'+P+'-dg">'+g+'</div>'+u.fx(fxo("s1"),'UD = Σ aparatos × UD (inodoro '+(st.flux?8:4)+', lavamanos 2, ducha 3, urinario 4, fregadero 3) = <em>'+fmt(c.UD)+' UD</em><br>Bajantes: '+c.nBajS+' ('+c.nNuc+' núcleo(s) × 2) → '+fmt(c.udB,0)+' UD c/u → Ø '+c.dBajS+' mm (≤ 10 UD: 50 · ≤ 30: 75 · ≤ 240: 110 · ≤ 960: 160)<br>Colector Ø '+c.dCol+' mm a '+fmt(st.pend,1)+' % (Ø110: 180/216/250 UD · Ø160: 700/840/1000 UD a 1/2/4 %)<br>Pluvial: Q = C·I·A / 3600 = 0,95 × '+st.Ilu+' × '+fmt(c.Acub)+' / 3600 = <u>'+fmt(c.Qll,1)+' L/s</u><br>Capacidad bajante Ø '+c.dB+' = A100 × 100 / I = '+fmt(c.capA)+' m² · n = máx(A/cap ; perímetro/20 m ; 2) = <u>'+c.nBajL+'</u><br>Captación = A × P × 0,8 = '+fmt(c.Acub)+' × '+fmt(st.anual/1000,2)+' × 0,8 = '+fmt(c.Vanual)+' m³/año<small>Redes separadas de aguas servidas (AASS) y lluvias (AALL) — exigencia de Interagua/EPMAPS. Ventilación de bajantes por encima de cubierta. Velocidad 0,6–3 m/s. Trampa de grasa en cocinas; en salud, tratamiento previo de efluentes de laboratorio e imagen.</small>')+'</div>';
      return s;
    }

    /* ── 3. ELÉCTRICO ── */
    function eleCtl(c){
      var s='<div class="'+P+'-card '+P+'-ctl"><div class="'+P+'-h">Densidades de carga (W/m²)</div>';
      s+=u.sl("il","Iluminación LED",st.il,3,30,1,st.il+" W/m²","NEC-HS-EE / NEC-11 cap. 13 eficiencia");
      s+=u.sl("to","Tomacorrientes generales",st.to,2,50,1,st.to+" W/m²");
      s+=u.sl("fu","Fuerza / equipos especiales",st.fu,0,100,1,st.fu+" W/m²",c.sal?"Imagen, esterilización, cocina, lavandería":"Cocinas, ascensores aparte, bombas aparte");
      s+=u.sl("fd","Factor de demanda",st.fd,.4,.95,.01,fmt(st.fd,2));
      s+=u.sl("gp","Carga respaldada por generador",st.gp,10,100,5,st.gp+" %",c.sal?"Salud: generador obligatorio para cargas esenciales (NFPA 99/110, MSP)":"Emergencia, bombas SCI, ascensores, seguridad");
      s+=u.sl("gh","Autonomía del generador",st.gh,4,96,4,st.gh+" h");
      return s+'</div>';
    }
    function eleOut(c){
      var s='<div class="'+P+'-card">'+u.hd("Demanda eléctrica","NEC-SB-IE · NEC-11 cap. 15 · NFPA 70/110","e1",fxo("e1"));
      s+='<div class="'+P+'-kpis">'+u.kpi("Carga instalada",fmt(c.kIns,0)+" kW",fmt(c.kIns*1000/c.pr.A,0)+" W/m²")+u.kpi("Demanda",fmt(c.kVA,0)+" kVA","fd "+fmt(st.fd,2)+" · fp 0,90")+u.kpi("Transformador",(c.nTr>1?c.nTr+" × ":"")+fmt(c.trafo,1)+" kVA","trifásico · reserva ≥ 20 %","rgba(var(--done-rgb),.6)")+u.kpi("Generador",fmt(c.genKVA)+" kVA",fmt(c.genKW,0)+" kW · "+fmt(c.diesel)+" L diésel")+'</div>';
      var parts=[["Iluminación",c.ilu,"#FFC24B"],["Tomas",c.tom,"#FF8A5C"],["Fuerza/equipos",c.fue,"#FF6FA8"],["HVAC",c.kWhv,"#B26BFF"],["Ascensores",c.kAsc,"#4F7DFF"],["Bombas",c.kBom,"#38E1FF"]];
      var W=720,H=320,g='<svg class="'+P+'-svg" viewBox="0 0 '+W+' '+H+'" role="img" aria-label="Diagrama unifilar">';
      g+='<text x="10" y="24" font-size="9.5" fill="var(--muted)">Red MT 13,8 kV</text>'+pipe("M10 40 H90",'#FFC24B',2.4);
      g+='<circle cx="105" cy="40" r="14" fill="none" stroke="#FFC24B" stroke-width="1.8"/><circle cx="123" cy="40" r="14" fill="none" stroke="#FFC24B" stroke-width="1.8"/><text x="114" y="74" font-size="9.5" text-anchor="middle" fill="#FFC24B">'+(c.nTr>1?c.nTr+"×":"")+fmt(c.trafo,1)+' kVA</text><text x="114" y="86" font-size="8.5" text-anchor="middle" fill="var(--faint)">13,8 kV / 220–127 V</text>';
      g+=pipe("M137 40 H200",'#FFC24B',2.4)+'<rect x="200" y="28" width="26" height="24" fill="none" stroke="var(--ink)"/><text x="213" y="44" font-size="9" text-anchor="middle">kWh</text>'+pipe("M226 40 H300",'#FFC24B',2.4);
      g+='<rect x="300" y="22" width="40" height="36" fill="rgba(255,194,75,.1)" stroke="#FFC24B"/><text x="320" y="44" font-size="9.5" text-anchor="middle" fill="#FFC24B">ATS</text>';
      g+='<circle cx="320" cy="128" r="18" fill="rgba(182,255,60,.08)" stroke="#B6FF3C" stroke-width="1.6"/><text x="320" y="132" font-size="12" text-anchor="middle" fill="#B6FF3C">G</text><path class="'+P+'-spin" d="M320 114 v6 M320 136 v6" stroke="#B6FF3C"/><text x="294" y="124" font-size="9.5" text-anchor="end" fill="#B6FF3C">'+fmt(c.genKVA)+' kVA</text><text x="294" y="136" font-size="8.5" text-anchor="end" fill="var(--faint)">'+st.gh+' h · '+fmt(c.diesel)+' L</text>'+pipe("M320 110 V58",'#B6FF3C',2,'flowS','m-instalaciones-rev');
      g+=pipe("M340 40 H400 V96",'#FFC24B',2.6)+'<rect x="400" y="90" width="300" height="10" fill="#FFC24B" fill-opacity=".85" style="filter:drop-shadow(0 0 6px #FFC24B)"/><text x="550" y="84" font-size="9.5" text-anchor="middle" fill="#FFC24B">TGD · tablero general de distribución</text>';
      var mx=Math.max.apply(null,parts.map(function(p){return p[1];}))||1;
      parts.forEach(function(p,i){ var x=420+i*48; g+=pipe("M"+x+" 100 V160",p[2],1.8,'flowS')+'<rect x="'+(x-14)+'" y="160" width="28" height="22" fill="rgba(0,0,0,.4)" stroke="'+p[2]+'"/><rect x="'+(x-10)+'" y="'+(280-p[1]/mx*90)+'" width="20" height="'+(p[1]/mx*90)+'" fill="'+p[2]+'" fill-opacity=".45" stroke="'+p[2]+'"/><text x="'+x+'" y="196" font-size="8" text-anchor="middle" fill="'+p[2]+'">'+fmt(p[1],0)+'</text><text x="'+x+'" y="296" font-size="7.5" text-anchor="middle" fill="var(--muted)" transform="rotate(-25 '+x+' 296)">'+p[0]+'</text>'; });
      g+='<text x="410" y="210" font-size="8.5" fill="var(--faint)">kW por circuito principal</text>';
      g+=gauge(110,240,46,c.kVA/(c.trafo*c.nTr),c.kVA/(c.trafo*c.nTr)>.85?"#FF5C7A":"#B6FF3C","uso del transformador",fmt(c.kVA/(c.trafo*c.nTr)*100,0)+" %");
      g+='</svg>';
      s+='<div class="'+P+'-dg">'+g+'</div>'+u.fx(fxo("e1"),'P inst. = A·(il + to + fu) + HVAC + ascensores + bombas = '+fmt(c.pr.A)+' × ('+st.il+' + '+st.to+' + '+st.fu+') / 1000 + '+fmt(c.kWhv,0)+' + '+fmt(c.kAsc,0)+' + '+fmt(c.kBom,1)+' = <em>'+fmt(c.kIns,0)+' kW</em><br>Demanda = P·fd = '+fmt(c.kIns,0)+' × '+fmt(st.fd,2)+' = '+fmt(c.kDem,0)+' kW → kVA = kW/fp = '+fmt(c.kDem,0)+' / 0,9 = <em>'+fmt(c.kVA,0)+' kVA</em><br>Transformador ≥ 1,2 × kVA = '+fmt(c.kVA*1.2,0)+' → <u>'+(c.nTr>1?c.nTr+' × ':'')+fmt(c.trafo,1)+' kVA</u> (tamaños normalizados)<br>Generador = '+st.gp+' % × '+fmt(c.kDem,0)+' kW = '+fmt(c.genKW,0)+' kW / 0,8 → <u>'+fmt(c.genKVA)+' kVA</u> · diésel ≈ 0,25 L/kWh × '+fmt(c.genKW,0)+' × 0,75 × '+st.gh+' h = '+fmt(c.diesel)+' L<small>HVAC eléctrico ≈ 1,2 kW/TR (estación 5). Ascensores 15 kW c/u. La distribuidora (CNEL EP, EEQ, CENTROSUR…) define si se requiere cámara de transformación o transformador tipo pedestal y el punto de conexión (factibilidad).</small>')+'</div>';
      s+='<div class="'+P+'-card">'+u.hd("Espacios eléctricos",null,null,false)+'<div class="'+P+'-kpis">'+u.kpi("Cámara de transformación",fmt(c.aCam*c.nTr,0)+" m²","acceso desde la vía, ventilada, puerta metálica")+u.kpi("Cuarto de tableros",fmt(c.aTab,1)+" m²","frente libre ≥ 1,0 m")+u.kpi("Cuarto de generador",fmt(c.aGen,0)+" m²","insonorizado, escape de gases, tanque diario")+'</div>'+(c.sal?'<div class="'+P+'-alert" style="margin-top:10px">Salud: generador OBLIGATORIO con transferencia automática ≤ 10 s para ramales de seguridad de vida y críticos (NFPA 99 / NFPA 110 nivel 1) + UPS en quirófanos, UCI e imagen. Sistema IT aislado en quirófanos.</div>':'')+'</div>';
      return s;
    }

    /* ── 4. INCENDIOS ── */
    function incCtl(c){
      var s='<div class="'+P+'-card '+P+'-ctl"><div class="'+P+'-h">Clasificación</div>';
      s+=u.chips("rz",[[""," Auto · "+RIESGO.filter(function(r){return r[0]===(RZ[c.cat]||"leve");})[0][1]]].concat(RIESGO),st.rz,"Riesgo de ocupación (NFPA 13)");
      s+=u.chips("roc",[["auto","Auto"],["1","Con rociadores"],["0","Sin rociadores"]],st.roc==null?"auto":st.roc?"1":"0","Rociadores automáticos");
      s+='<div class="'+P+'-fnt">Carga de ocupación: '+fmt(c.ocf[0],1)+' m²/persona (NFPA 101 tabla 7.3.1.2) · recorrido máx. '+(c.roc?c.ocf[1]:Math.round(c.ocf[1]*.67))+' m '+(c.roc?'(con rociadores)':'(sin rociadores)')+'.</div>';
      s+='<div class="'+P+'-note">Ecuador: Reglamento de Prevención, Mitigación y Protección contra Incendios (R.O. 114, 2009) + exigencias del Cuerpo de Bomberos del cantón (Guayaquil: Benemérito Cuerpo de Bomberos; Daule: CB Daule). Visto bueno de planos obligatorio.</div>';
      return s+'</div>';
    }
    function incOut(c){
      var s='<div class="'+P+'-card">'+u.hd("Sistema contra incendios y evacuación","Reglamento PMPCI · NFPA 10/13/14/72/101","i1",fxo("i1"));
      s+='<div class="'+P+'-kpis">'+u.kpi("Ocupantes por piso",fmt(c.occ),c.nEx+" salidas/escaleras")+u.kpi("Ancho de escalera",fmt(c.wEsc,2)+" m","total "+fmt(c.wNeed,2)+" m · corredor "+fmt(c.corr,2)+" m")+u.kpi("BIE (gabinetes)",fmt(c.nBIE),c.nBIEp+" por piso · radio 30 m")+u.kpi("Extintores",fmt(c.nExt),"1 / 150 m² · recorrido ≤ 25 m")+u.kpi("Rociadores",c.roc?fmt(c.nRoc):"—",c.roc?fmt(c.rd.cov,1)+" m²/rociador":"no requeridos (verificar)")+u.kpi("Detectores",fmt(c.nDet),"humo · 1 / 80 m²")+u.kpi("Reserva SCI",fmt(c.Vsci,1)+" m³",fmt(c.Qsci,1)+" L/s · bomba "+c.HPs+" HP","rgba(var(--done-rgb),.6)")+'</div>';
      /* planta tipo */
      var Fx=Math.sqrt(c.Afl*1.6), Fy=c.Afl/Fx, W=720, sc=Math.min((W-80)/Fx,260/Fy), H=Fy*sc+70, ox=(W-Fx*sc)/2, oy=30;
      var g='<svg class="'+P+'-svg" viewBox="0 0 '+W+' '+H.toFixed(0)+'" role="img" aria-label="Planta tipo con cobertura contra incendios"><defs><clipPath id="'+P+'-pc"><rect x="'+ox+'" y="'+oy+'" width="'+Fx*sc+'" height="'+Fy*sc+'"/></clipPath></defs>';
      g+='<rect x="'+ox+'" y="'+oy+'" width="'+Fx*sc+'" height="'+Fy*sc+'" fill="rgba(56,225,255,.04)" stroke="#38E1FF" stroke-width="1.6"/>';
      g+='<g clip-path="url(#'+P+'-pc)">';
      if(c.roc){ var sp=Math.sqrt(c.rd.cov)*sc; if(sp>5) for(var x=ox+sp/2;x<ox+Fx*sc;x+=sp) for(var y=oy+sp/2;y<oy+Fy*sc;y+=sp) g+='<circle cx="'+x.toFixed(1)+'" cy="'+y.toFixed(1)+'" r="1.8" fill="#FF5C7A" opacity=".75"/>'; }
      for(var b=0;b<c.nBIEp;b++){ var bxp=ox+(b+.5)*Fx*sc/c.nBIEp, byp=oy+(b%2?Fy*sc*.25:Fy*sc*.75); g+='<circle cx="'+bxp+'" cy="'+byp+'" r="'+(30*sc)+'" fill="rgba(255,92,122,.07)" stroke="#FF5C7A" stroke-dasharray="4 4" class="'+P+'-pul" style="animation-delay:'+(b*.3)+'s"/><rect x="'+(bxp-6)+'" y="'+(byp-6)+'" width="12" height="12" fill="#FF5C7A"/><text x="'+(bxp+9)+'" y="'+(byp+4)+'" font-size="9" fill="#FF5C7A">BIE</text>'; }
      g+='</g>';
      for(var e=0;e<c.nEx;e++){ var exx=e%2===0?ox:ox+Fx*sc, eyy=oy+Fy*sc*(e<2?.5:e===2?.2:.8); g+='<rect x="'+(exx-(e%2===0?22:0))+'" y="'+(eyy-14)+'" width="22" height="28" fill="rgba(182,255,60,.15)" stroke="#B6FF3C"/><text x="'+(exx+(e%2===0?-11:11))+'" y="'+(eyy+3)+'" font-size="8" text-anchor="middle" fill="#B6FF3C">ESC</text>'+pipe("M"+(ox+Fx*sc/2)+" "+(oy+Fy*sc/2)+" L"+(exx+(e%2===0?6:-6))+" "+eyy,'#B6FF3C',1.6,'flow'); }
      g+='<circle cx="'+(ox+Fx*sc/2)+'" cy="'+(oy+Fy*sc/2)+'" r="5" fill="#B6FF3C"/><text x="'+(ox+Fx*sc/2)+'" y="'+(oy+Fy*sc/2-10)+'" font-size="9" text-anchor="middle" fill="#B6FF3C">ruta de evacuación</text>';
      g+='<text x="'+ox+'" y="'+(H-20)+'" font-size="9.5" fill="var(--muted)">Planta tipo ≈ '+fmt(Fx,1)+' × '+fmt(Fy,1)+' m ('+fmt(c.Afl)+' m²) · círculos: alcance BIE 30 m'+(c.roc?' · puntos: rociadores':'')+'</text>';
      g+='</svg>';
      s+='<div class="'+P+'-dg">'+g+'</div>'+u.fx(fxo("i1"),'Ocupantes = A piso / factor = '+fmt(c.Afl)+' / '+fmt(c.ocf[0],1)+' = <em>'+fmt(c.occ)+'</em> → salidas: ≤ 500 → 2 · ≤ 1000 → 3 · > 1000 → 4 = '+c.nEx+'<br>Ancho total = ocupantes × '+fmt(c.mmS,1)+' mm = '+fmt(c.wNeed,2)+' m → por escalera '+fmt(c.wNeed/c.nEx,2)+' m → <u>'+fmt(c.wEsc,2)+' m</u> (mín. '+(c.sal?'1,12 m NFPA 101 · corredores de camillas 2,44 m':'1,20 m')+')<br>BIE por piso = máx(salidas ; A/1100 m²) = '+c.nBIEp+' (manguera 30 m, Ø 1½")<br>'+(c.roc?'Rociadores = A / '+fmt(c.rd.cov,1)+' = '+fmt(c.nRoc)+' · Q = densidad × área × 1,15 = '+fmt(c.rd.den,1)+' mm/min × '+c.rd.da+' m² × 1,15 = '+fmt(c.Qspr,0)+' L/min + mangueras '+c.rd.hose+' L/min<br>V = (Q_roc + Q_mang) × '+c.rd.t+' min = '+fmt(c.Vspr,1)+' m³ · ':'')+'V_BIE = 2 BIE × 378 L/min × 30 min = '+fmt(c.Vbie,1)+' m³<br>Reserva SCI = <u>'+fmt(c.Vsci,1)+' m³</u> · bomba: Q = '+fmt(c.Qsci,1)+' L/s, H ≈ '+fmt(c.Hsci,0)+' m → '+fmt(c.HPsci,1)+' → <u>'+c.HPs+' HP</u> + bomba jockey<small>Extintores PQS ABC 10 lb (general), CO₂ en cuartos eléctricos, clase K en cocinas, agente limpio en data/imagen. Escaleras de evacuación protegidas (RF 1–2 h, puertas cortafuego) desde 4 pisos; presurizadas en edificios altos. Señalética fotoluminiscente NTE INEN-ISO 3864 e iluminación de emergencia 90 min.</small>')+'</div>';
      return s;
    }

    /* ── 5. HVAC Y ESPECIALES ── */
    function hvacCtl(c){
      var s='<div class="'+P+'-card '+P+'-ctl"><div class="'+P+'-h">Climatización · '+E((ctx.clima&&ctx.clima.tipo)||"clima")+'</div>';
      s+=u.sl("pclim","Área climatizada",st.pclim,0,100,5,st.pclim+" %",c.sierra?"Sierra: priorizar ventilación natural; climatizar solo áreas críticas":"Costa: ventilación natural cruzada en circulaciones y áreas de espera");
      s+='<div class="'+(st.conf.ratio?'':P+'-warnbox')+'" style="border:1px solid var(--line);padding:8px">'+u.sl("ratio","Ratio de carga",st.ratio,8,90,1,st.ratio+" m²/TR","Costa cálido-húmeda: 1 TR por 20–30 m² (oficinas), 15–20 (salud), 10–15 (auditorios)")+'<div class="'+P+'-row">'+u.pv("ratio",st.conf.ratio)+'</div></div>';
      return s+'</div>';
    }
    function hvacOut(c){
      var s='<div class="'+P+'-card">'+u.hd("Carga térmica y sistema","ASHRAE 90.1 · NEC-HS-EE"+(c.sal?" · ASHRAE 170":""),"h1",fxo("h1"));
      s+='<div class="'+P+'-kpis">'+u.kpi("Área climatizada",fmt(c.Aclim)+" m²",st.pclim+" % de "+fmt(c.pr.A)+" m²")+u.kpi("Capacidad",fmt(c.TR,0)+" TR",fmt(c.TR*3.517,0)+" kW térmicos · "+fmt(c.TR*12000/1000,0)+" kBTU/h","rgba(var(--done-rgb),.6)")+u.kpi("Consumo eléctrico",fmt(c.kWhv,0)+" kW","≈ 1,2 kW/TR")+u.kpi("Sistema sugerido",c.TR<=5?"Split":c.TR<=150?"VRF":"Chiller",c.hvs)+'</div>';
      var W=720,H=250,g0=210,n=Math.min(c.pr.pisos,6),fh=Math.min(36,150/n),bx=150,bw=420,top=g0-n*fh;
      var g='<svg class="'+P+'-svg" viewBox="0 0 '+W+' '+H+'" role="img" aria-label="Esquema de climatización">';
      g+='<line x1="0" x2="'+W+'" y1="'+g0+'" y2="'+g0+'" stroke="var(--muted)" stroke-opacity=".5"/>';
      for(var i=0;i<n;i++){ var y=g0-(i+1)*fh; g+='<rect x="'+bx+'" y="'+y+'" width="'+bw+'" height="'+fh+'" fill="rgba(178,107,255,.04)" stroke="rgba(178,107,255,.4)"/>'+pipe("M"+(bx+40)+" "+(y+6)+" H"+(bx+bw-20),'#38E1FF',2.2,'flow')+pipe("M"+(bx+bw-20)+" "+(y+12)+" H"+(bx+40),'#B26BFF',1.4,'flowS');
        for(var k=0;k<4;k++){ var dx=bx+90+k*85; g+='<path d="M'+dx+' '+(y+8)+' l-6 10 M'+dx+' '+(y+8)+' l6 10" stroke="#38E1FF" stroke-opacity=".6" class="'+P+'-pul" style="animation-delay:'+(k*.25)+'s"/>'; } }
      g+=pipe("M"+(bx+40)+" "+(top-14)+" V"+(g0-6),'#38E1FF',3)+pipe("M"+(bx+bw-20)+" "+(g0-6)+" V"+(top-14),'#B26BFF',2.4);
      var nu=Math.max(1,Math.min(6,Math.ceil(c.TR/40)));
      for(var u2=0;u2<nu;u2++){ var ux=bx+70+u2*(bw-120)/Math.max(1,nu-1||1); g+='<rect x="'+(ux-20)+'" y="'+(top-34)+'" width="40" height="26" fill="rgba(0,0,0,.4)" stroke="#B26BFF"/><circle cx="'+ux+'" cy="'+(top-21)+'" r="9" fill="none" stroke="#B26BFF"/><path class="'+P+'-spin" d="M'+ux+' '+(top-29)+' V'+(top-13)+' M'+(ux-8)+' '+(top-21)+' H'+(ux+8)+'" stroke="#B26BFF" stroke-width="1.6"/>'; }
      g+='<text x="'+(bx+bw/2)+'" y="'+(top-42)+'" font-size="9.5" text-anchor="middle" fill="#B26BFF">'+nu+' unidad(es) exterior(es) · '+fmt(c.TR,0)+' TR</text>';
      /* termómetro */
      var tp=clamp(12/Math.max(st.ratio,1),0,1)/3;
      g+='<rect x="50" y="40" width="18" height="140" rx="9" fill="rgba(0,0,0,.4)" stroke="var(--line2)"/><rect x="54" y="'+(176-130*Math.max(.08,tp*3))+'" width="10" height="'+(130*Math.max(.08,Math.min(1,tp*3)))+'" rx="5" fill="#FF5C7A" style="filter:drop-shadow(0 0 6px #FF5C7A)"/><circle cx="59" cy="190" r="14" fill="#FF5C7A"/><text x="59" y="222" font-size="9" text-anchor="middle" fill="var(--muted)">'+st.ratio+' m²/TR</text>';
      g+='<text x="'+(bx+bw+12)+'" y="'+(g0-20)+'" font-size="9" fill="#38E1FF">inyección</text><text x="'+(bx+bw+12)+'" y="'+(g0-8)+'" font-size="9" fill="#B26BFF">retorno</text>';
      g+='</svg>';
      s+='<div class="'+P+'-dg">'+g+'</div>'+u.fx(fxo("h1"),'A clim. = '+fmt(c.pr.A)+' × '+st.pclim+' % = '+fmt(c.Aclim)+' m² · TR = A / ratio = '+fmt(c.Aclim)+' / '+st.ratio+' = <u>'+fmt(c.TR,1)+' TR</u><br>1 TR = 12 000 BTU/h = 3,517 kW · eléctrico ≈ TR × 1,2 = '+fmt(c.kWhv,0)+' kW<small>Prediseño por ratio. El cálculo definitivo usa cargas por recinto (envolvente, ocupantes, equipos, iluminación, aire exterior) con ASHRAE 62.1/170. Guayaquil: TBS diseño ≈ 33 °C, HR 70–80 %: deshumidificar es tan importante como enfriar.</small>')+'</div>';
      if(c.sal){
        s+='<div class="'+P+'-card">'+u.hd("Gases medicinales","NFPA 99 · ISO 7396-1","h2",fxo("h2"));
        s+='<div class="'+P+'-kpis">'+u.kpi("Tomas O₂",fmt(c.gO2),c.camas+" camas · "+c.uci+" UCI · "+c.quir+" quirófanos")+u.kpi("Tomas vacío",fmt(c.gVac))+u.kpi("Tomas aire medicinal",fmt(c.gAir))+u.kpi("Consumo O₂",fmt(c.o2dia,0)+" m³/día",c.o2dia>60?"tanque criogénico":"manifold de cilindros","rgba(var(--done-rgb),.6)")+'</div>';
        var gg='<svg class="'+P+'-svg" viewBox="0 0 720 150" role="img" aria-label="Red de gases medicinales">', gc=[["O₂","#4FFFB0"],["Vacío","#E4EEFA"],["Aire","#FFC24B"]];
        gg+='<rect x="10" y="30" width="90" height="90" fill="rgba(79,255,176,.06)" stroke="#4FFFB0"/><text x="55" y="22" font-size="9.5" text-anchor="middle" fill="#4FFFB0">Central de gases</text>';
        for(var cy=0;cy<4;cy++) gg+='<rect x="'+(18+cy*20)+'" y="50" width="14" height="60" rx="7" fill="none" stroke="#4FFFB0" stroke-opacity=".7"/>';
        gc.forEach(function(x,i){ var y=48+i*26; gg+=pipe("M100 "+y+" H680",x[1],2.2,i===1?'flowS':'flow',i===1?'m-instalaciones-rev':'')+'<text x="110" y="'+(y-5)+'" font-size="9" fill="'+x[1]+'">'+x[0]+'</text>'; });
        for(var bd=0;bd<6;bd++){ var bxx=220+bd*80; gg+='<rect x="'+bxx+'" y="118" width="44" height="18" rx="4" fill="rgba(56,225,255,.1)" stroke="#38E1FF"/><line x1="'+(bxx+22)+'" x2="'+(bxx+22)+'" y1="48" y2="118" stroke="rgba(255,255,255,.2)" stroke-dasharray="2 3"/>'; gc.forEach(function(x,i){ gg+='<circle cx="'+(bxx+22)+'" cy="'+(48+i*26)+'" r="3.5" fill="'+x[1]+'" class="'+P+'-pul"/>'; }); }
        gg+='</svg>';
        s+='<div class="'+P+'-dg">'+gg+'</div>'+u.fx(fxo("h2"),'Tomas: hospitalización 1 O₂ + 1 vacío + 1 aire por cama · UCI/emergencia (10 %) 2 + 2 + 2 · quirófanos (1 por 25 camas) 2 O₂ + 3 vacío + 2 aire<br>O₂ ≈ tomas × 10 L/min × simultaneidad 0,15 × 1440 min = '+fmt(c.o2dia,0)+' m³/día<small>Colores NFPA 99: O₂ verde, aire medicinal amarillo, vacío blanco, N₂O azul. Válvulas de zona por piso, alarmas de presión y doble fuente (principal + reserva). Instalador certificado; pruebas de pureza antes de la entrega.</small>')+'</div>';
      }
      s+='<div class="'+P+'-card">'+u.hd("Datos, seguridad electrónica y ventilación",null,null,false)+'<div class="'+P+'-kpis">'+u.kpi("Puntos de red",fmt(c.pRed),"cableado cat. 6A · TIA-568")+u.kpi("Cámaras CCTV",fmt(c.cam),"interior 1/200 m² + perímetro 1/30 m")+u.kpi("Cuartos IDF",fmt(c.pr.pisos*c.nNuc),"1 por piso y núcleo · recorrido ≤ 90 m")+u.kpi("Ascensores",fmt(c.nAsc),c.sal?"incluye camilleros":"estudio de tráfico")+'</div>'+
        (c.sal?'<div class="'+P+'-tw" style="margin-top:10px"><table class="'+P+'-tb"><thead><tr><th>Local (ASHRAE 170)</th><th>Cambios/h totales</th><th>Aire exterior</th><th>Presión</th></tr></thead><tbody><tr><td>Quirófano</td><td>20</td><td>4</td><td>Positiva</td></tr><tr><td>Aislamiento infeccioso (AII)</td><td>12</td><td>2</td><td>Negativa</td></tr><tr><td>Aislamiento protector (PE)</td><td>12</td><td>2</td><td>Positiva</td></tr><tr><td>UCI / cuidados intensivos</td><td>6</td><td>2</td><td>—</td></tr><tr><td>Habitación de pacientes</td><td>4</td><td>2</td><td>—</td></tr><tr><td>Sala de espera de emergencia / radiología</td><td>12</td><td>2</td><td>Negativa</td></tr><tr><td>Esterilización (área sucia)</td><td>10</td><td>2</td><td>Negativa</td></tr></tbody></table></div>':'')+'</div>';
      return s;
    }

    /* ── 6. ESPACIOS TÉCNICOS ── */
    function espT(){
      var c=insCalc(ctx,st);
      var s='<div class="'+P+'-card">'+u.hd("Reserva de espacios técnicos","NEC-HS · TIA-569 · Reglamento PMPCI","t1",fxo("t1"),'<button class="'+P+'-btn" data-act="csv">'+gly("dl",14)+' CSV</button>');
      s+='<div class="'+P+'-kpis">'+u.kpi("Área técnica total",fmt(c.Aesp)+" m²",pct(c.Aesp/c.pr.A,1)+" del área bruta","rgba(var(--done-rgb),.6)")+u.kpi("Shafts por planta",fmt(c.shF,2)+" m²",c.nNuc+" núcleo(s) · "+fmt(c.shF/c.Afl*100,2)+" % de la planta")+u.kpi("Área bruta",fmt(c.pr.A)+" m²",c.pr.pisos+" pisos")+'</div>';
      var W=720,H=380,nodes=[];
      var data=c.esp.map(function(e,i){ return {k:e[0],n:e[1],v:e[2],d:e[3],i:i}; });
      if(window.d3&&d3.treemap){ var rt=d3.hierarchy({children:data}).sum(function(x){return x.v||0;}).sort(function(a,b){return b.value-a.value;}); d3.treemap().tile(d3.treemapSquarify).size([W,H]).paddingInner(4).round(true)(rt); rt.leaves().forEach(function(l){ nodes.push({x:l.x0,y:l.y0,w:l.x1-l.x0,h:l.y1-l.y0,d:l.data}); }); }
      else { var x=0, tot=c.Aesp; data.forEach(function(e){ var w=e.v/tot*W; nodes.push({x:x,y:0,w:w-3,h:H,d:e}); x+=w; }); }
      var g='<svg class="'+P+'-svg" viewBox="0 0 '+W+' '+H+'" role="img" aria-label="Bloques proporcionales de espacios técnicos"><defs><pattern id="'+P+'-gp" width="10" height="10" patternUnits="userSpaceOnUse"><path d="M10 0H0V10" fill="none" stroke="rgba(255,255,255,.06)"/></pattern></defs>';
      nodes.forEach(function(nd,i){ var col=ESPC[nd.d.k]; g+='<g><rect x="'+nd.x+'" y="'+nd.y+'" width="'+Math.max(0,nd.w)+'" height="'+Math.max(0,nd.h)+'" fill="'+col+'" fill-opacity=".14" stroke="'+col+'" stroke-width="1.4"><animate attributeName="fill-opacity" values=".10;.26;.10" dur="'+(3+i%4*.5)+'s" repeatCount="indefinite"/></rect><rect x="'+nd.x+'" y="'+nd.y+'" width="'+Math.max(0,nd.w)+'" height="'+Math.max(0,nd.h)+'" fill="url(#'+P+'-gp)"/>'+
        '<path d="M'+(nd.x+2)+' '+(nd.y+10)+'v-8h8M'+(nd.x+nd.w-2)+' '+(nd.y+nd.h-10)+'v8h-8" stroke="'+col+'" fill="none" stroke-width="2"/>'+
        (nd.w>80&&nd.h>40?'<text x="'+(nd.x+8)+'" y="'+(nd.y+18)+'" font-size="10" fill="'+col+'">'+E(nd.d.n.length>Math.floor(nd.w/6)?nd.d.n.slice(0,Math.floor(nd.w/6)-1)+"…":nd.d.n)+'</text><text x="'+(nd.x+8)+'" y="'+(nd.y+34)+'" font-size="13" fill="var(--ink)">'+fmt(nd.d.v,1)+' m²</text>':nd.w>36&&nd.h>18?'<text x="'+(nd.x+4)+'" y="'+(nd.y+14)+'" font-size="9" fill="'+col+'">'+fmt(nd.d.v,0)+'</text>':'')+'<title>'+E(nd.d.n)+': '+fmt(nd.d.v,1)+' m² · '+E(nd.d.d)+'</title></g>'; });
      g+='</svg>';
      s+='<div class="'+P+'-dg">'+g+'</div><div class="'+P+'-row" style="margin-top:8px;gap:12px">'+Object.keys(ESPN).filter(function(k){ return c.esp.some(function(e){return e[0]===k;}); }).map(function(k){ return '<span class="'+P+'-fnt"><i style="display:inline-block;width:10px;height:10px;background:'+ESPC[k]+';box-shadow:0 0 6px '+ESPC[k]+';margin-right:5px"></i>'+ESPN[k]+'</span>'; }).join("")+'</div>';
      s+='<div class="'+P+'-tw" style="margin-top:10px"><table class="'+P+'-tb"><thead><tr><th>Espacio</th><th>m²</th><th>Criterio</th></tr></thead><tbody>'+c.esp.map(function(e){ return '<tr><td><i style="display:inline-block;width:8px;height:8px;background:'+ESPC[e[0]]+';margin-right:6px"></i>'+E(e[1])+'</td><td>'+fmt(e[2],1)+'</td><td style="text-align:left;font-family:var(--f-b);color:var(--muted)">'+E(e[3])+'</td></tr>'; }).join("")+'<tr class="on"><td>Total</td><td>'+fmt(c.Aesp,1)+'</td><td></td></tr></tbody></table></div>';
      s+=u.fx(fxo("t1"),'Shafts por planta = hidrosanitario máx(0,6 ; 0,2 % huella) + eléctrico máx(0,5 ; 0,12 %) + HVAC máx(0,8 ; 0,4 %) + datos 0,4 × núcleos = '+fmt(c.shF,2)+' m²<br>Núcleos = ⌈huella / 1200 m²⌉ = '+c.nNuc+' · total vertical = '+fmt(c.shF,2)+' × '+c.pr.pisos+' = '+fmt(c.shT,1)+' m²<br>Cisterna = V / 2,5 m × 1,15 = '+fmt(c.Acis,1)+' m² · cámara de transformación según kVA (≤ 300 → 12 m² · ≤ 1000 → 20 m²)<small>Reservar estos espacios en el anteproyecto evita perder área útil después. Ubicar shafts alineados en todas las plantas, cuartos técnicos con acceso de servicio y la cámara de transformación con frente a la vía (exigencia de la distribuidora).</small>')+'</div>';
      return s;
    }
    function csv(){
      var c=insCalc(ctx,st), R=[["DION · Instalaciones · PREDISEÑO"],["Proyecto",(ctx.P&&ctx.P.nombre)||""],["Área bruta m2",c.pr.A],[],["Espacio técnico","m2","Criterio"]];
      c.esp.forEach(function(e){ R.push([e[1],String(Math.round(e[2]*10)/10).replace(".",","),e[3]]); });
      R.push(["Total",String(Math.round(c.Aesp*10)/10).replace(".",",")],[],["Indicador","Valor"],["Consumo diario (L)",Math.round(c.Qd)],["Cisterna (m3)",String(Math.round(c.Vcis*10)/10).replace(".",",")],["Reserva SCI (m3)",String(Math.round(c.Vsci*10)/10).replace(".",",")],["Demanda (kVA)",Math.round(c.kVA)],["Transformador (kVA)",c.trafo],["Generador (kVA)",c.genKVA],["HVAC (TR)",Math.round(c.TR)]);
      return "﻿"+R.map(function(r){ return r.map(function(v){ v=String(v==null?"":v); return /[;"\n]/.test(v)?'"'+v.replace(/"/g,'""')+'"':v; }).join(";"); }).join("\n");
    }

    function body(){
      var c=insCalc(ctx,st), t=IS.tab;
      if(t==="agua") return '<div class="'+P+'-g2">'+aguaCtl(c)+'<div class="'+P+'-col" data-z="out">'+aguaOut(c)+'</div></div>';
      if(t==="serv") return '<div class="'+P+'-g2">'+servCtl(c)+'<div class="'+P+'-col" data-z="out">'+servOut(c)+'</div></div>';
      if(t==="ele") return '<div class="'+P+'-g2">'+eleCtl(c)+'<div class="'+P+'-col" data-z="out">'+eleOut(c)+'</div></div>';
      if(t==="inc") return '<div class="'+P+'-g2">'+incCtl(c)+'<div class="'+P+'-col" data-z="out">'+incOut(c)+'</div></div>';
      if(t==="hvac") return '<div class="'+P+'-g2">'+hvacCtl(c)+'<div class="'+P+'-col" data-z="out">'+hvacOut(c)+'</div></div>';
      if(t==="esp") return espT();
      return '<div class="'+P+'-hd"><span class="'+P+'-h">Pasos de la materia</span><span class="'+P+'-sp"></span><span class="'+P+'-fnt">Instalaciones · '+PASOS.ins.f.length+' fases</span></div>'+ckHTML(P,["ins"],"ins",st.ck,IS.cko,"#B6FF3C");
    }
    function paint(){ root.querySelectorAll("."+P+"-tab").forEach(function(b){ b.setAttribute("aria-selected",b.dataset.v===IS.tab); }); main.innerHTML=body(); main.scrollTop=IS.scroll[IS.tab]||0; }
    function repaint(){ var sc=main.scrollTop; main.innerHTML=body(); main.scrollTop=sc; }
    function outOnly(){ var z=main.querySelector('[data-z="out"]'); if(!z){ repaint(); return; } var c=insCalc(ctx,st), t=IS.tab; z.innerHTML=t==="agua"?aguaOut(c):t==="serv"?servOut(c):t==="ele"?eleOut(c):t==="inc"?incOut(c):hvacOut(c); }
    var LBL={dias:function(v){return fmt(v,1)+" días";},pend:function(v){return fmt(v,1)+" %";},Ilu:function(v){return v+" mm/h";},anual:function(v){return fmt(v)+" mm";},il:function(v){return v+" W/m²";},to:function(v){return v+" W/m²";},fu:function(v){return v+" W/m²";},fd:function(v){return fmt(v,2);},gp:function(v){return v+" %";},gh:function(v){return v+" h";},ratio:function(v){return v+" m²/TR";},pclim:function(v){return v+" %";}};
    root.addEventListener("click",function(ev){
      var b=ev.target.closest("[data-act]"); if(!b||!root.contains(b)) return; var a=b.dataset.act, v=b.dataset.v;
      if(a==="tab"){ IS.tab=v; paint(); return; }
      if(a==="next"){ ctx.next(); return; }
      if(a==="fx"){ IS.fx[v]=!IS.fx[v]; repaint(); return; }
      if(a==="cko"){ IS.cko=IS.cko===v?null:v; repaint(); return; }
      if(a==="ckm") return;
      if(a==="cks"){ var n=ckNext(st.ck[v]); if(n) st.ck[v]=n; else delete st.ck[v]; save(); repaint(); return; }
      if(a==="conf"){ st.conf[v]=true; save(); ctx.toast("Dato confirmado"); repaint(); return; }
      if(a==="csv"){ ctx.download("espacios-tecnicos-"+String((ctx.P&&ctx.P.nombre)||"proyecto").replace(/\s+/g,"-").toLowerCase()+".csv",csv()); return; }
      if(a==="q"){ var c=insCalc(ctx,st), it=c.items.filter(function(x){return x.k===b.dataset.k;})[0]; if(it){ st.q[it.k]=Math.max(0,it.q+(+b.dataset.d)); st.conf.dot=false; save(); repaint(); } return; }
      if(a==="tq"||a==="dBaj"){ st[a]=v; save(); repaint(); return; }
      if(a==="flux"){ st.flux=v==="1"; save(); repaint(); return; }
      if(a==="rz"){ st.rz=v; save(); repaint(); return; }
      if(a==="roc"){ st.roc=v==="auto"?null:v==="1"; save(); repaint(); return; }
    });
    root.addEventListener("input",function(ev){
      var t=ev.target; if(t.dataset.act!=="sl") return; var k=t.dataset.k, v=+t.value;
      st[k]=v; if(k==="Ilu"||k==="ratio") st.conf[k]=false; save();
      var o=main.querySelector('[data-o="'+k+'"]'); if(o&&LBL[k]) o.textContent=LBL[k](v);
      outOnly();
    });
    paint();
    return function(){ root.remove(); };
  }
};
})();
