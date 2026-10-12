/* DION · núcleo del recorrido del proyecto
   - Ventanas holográficas: se mueven, cambian de tamaño, se minimizan a "bolitas", varias a la vez.
   - Ruta del proyecto (estaciones en el orden del PDF y del Miro) con BIM en paralelo.
   - Línea sagrada (estilo Loki/TVA): tronco + hebras de cada materia; es la base donde todo se conecta.
   - Monitor de avance flotante.
   - Salas propias: materias (pasos del flujo), Contexto 2 (historia del sitio), Tesis 1–12, Codificación, Puente a Revit. */
(function(){
"use strict";
const D = () => window.DION;
const $ = (s, r) => (r || document).querySelector(s);
const esc = s => String(s == null ? "" : s).replace(/[&<>"']/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
const nrm = s => String(s || "").normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase().trim();
const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
const isPhone = () => innerWidth < 640;
const lsg = (k, d) => { try { const v = localStorage.getItem(k); return v ? JSON.parse(v) : d; } catch(e){ return d; } };
const lss = (k, v) => { try { localStorage.setItem(k, JSON.stringify(v)); } catch(e){} };

/* ====================================================================== */
/* ESTILOS                                                                 */
/* ====================================================================== */
const css = document.createElement("style");
css.textContent = `
#wins{position:fixed;inset:0;z-index:30;pointer-events:none}
.win{position:absolute;pointer-events:auto;display:flex;flex-direction:column;background:rgba(5,11,19,.94);border:1px solid var(--line2);border-radius:14px;box-shadow:0 18px 60px rgba(0,0,0,.55),0 0 0 1px rgba(var(--acc-rgb),.05),0 0 40px rgba(var(--acc-rgb),.08);overflow:hidden;min-width:260px;min-height:140px}
.win.focus{border-color:rgba(var(--acc-rgb),.6);box-shadow:0 18px 60px rgba(0,0,0,.6),0 0 30px rgba(var(--acc-rgb),.18)}
.win::before{content:"";position:absolute;left:-1px;top:-1px;width:16px;height:16px;border:2px solid var(--acc);border-right:0;border-bottom:0;border-top-left-radius:14px;pointer-events:none;z-index:3}
.win::after{content:"";position:absolute;right:-1px;bottom:-1px;width:16px;height:16px;border:2px solid var(--acc);border-left:0;border-top:0;border-bottom-right-radius:14px;pointer-events:none;opacity:.5}
.win-h{height:42px;flex:none;display:flex;align-items:center;gap:8px;padding:0 6px 0 14px;border-bottom:1px solid var(--line2);background:linear-gradient(90deg,rgba(var(--acc-rgb),.09),transparent 60%);cursor:grab;touch-action:none;user-select:none;-webkit-user-select:none}
.win-h:active{cursor:grabbing}
.win-h b{font-family:var(--f-d);font-weight:400;font-size:11px;letter-spacing:.16em;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;min-width:0}
.win-h span{font-family:var(--f-m);font-size:10px;color:var(--muted);letter-spacing:.06em;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;min-width:0;flex:1}
.win-h .wb{width:34px;height:34px;flex:none;border:0;background:none;color:var(--muted);border-radius:8px;font-size:15px;display:grid;place-items:center}
.win-h .wb:hover{color:var(--acc);background:rgba(var(--acc-rgb),.08)}
.win-h .wb.x:hover{color:var(--warn)}
.win-lk{flex:none;display:flex;gap:6px;overflow-x:auto;padding:6px 10px;border-bottom:1px solid var(--line);background:rgba(var(--acc-rgb),.04);scrollbar-width:none}
.win-lk button{flex:none;min-height:32px;border:1px solid var(--line2);background:rgba(3,6,11,.6);border-radius:999px;padding:4px 12px;font-family:var(--f-m);font-size:10px;letter-spacing:.08em;color:var(--acc)}
.win-lk button:hover{border-color:var(--acc);background:rgba(var(--acc-rgb),.1)}
.win-b{flex:1;min-height:0;position:relative;overflow:auto;overscroll-behavior:contain}
.win-b>iframe{position:absolute;inset:0;width:100%;height:100%;border:0;background:var(--bg)}
.win-rz{position:absolute;z-index:60;touch-action:none}
.win-rz.e{right:-3px;top:42px;bottom:22px;width:10px;cursor:ew-resize}.win-rz.w{left:-3px;top:42px;bottom:22px;width:10px;cursor:ew-resize}.win-rz.s{bottom:-3px;left:22px;right:26px;height:10px;cursor:ns-resize}.win-rz.sw{left:-3px;bottom:-3px;width:24px;height:24px;cursor:nesw-resize}
.win.max .win-rz{display:none}
.win-r{position:absolute;right:0;bottom:0;width:30px;height:30px;cursor:nwse-resize;touch-action:none;z-index:61;background:linear-gradient(135deg,transparent 55%,rgba(var(--acc-rgb),.55) 56%,transparent 62%,transparent 70%,rgba(var(--acc-rgb),.55) 71%,transparent 77%)}
.win.max{border-radius:0}
.win.max .win-r{display:none}
body.wdrag iframe{pointer-events:none!important}
body.wdrag{user-select:none;-webkit-user-select:none}
#dock{position:fixed;z-index:4000;left:50%;transform:translateX(-50%);bottom:calc(12px + env(safe-area-inset-bottom,0px));display:flex;gap:8px;pointer-events:auto}
#fbars{position:fixed;inset:0;pointer-events:none;z-index:4500}
.fbar{position:absolute;pointer-events:auto;cursor:grab;touch-action:none;user-select:none;-webkit-user-select:none;width:210px;padding:2px 0;text-shadow:0 0 6px #000,0 0 2px #000}
.fbar .l{font-family:var(--f-m);font-size:10px;letter-spacing:.12em}
.fbar b{float:right;font-family:var(--f-m);font-size:12px;color:#fff}
.fbar i{display:block;height:5px;margin-top:4px;border-radius:3px;background:rgba(255,255,255,.12);overflow:hidden}
.fbar em{display:block;height:100%;border-radius:3px}
.fbar em.blink{animation:monb 1.4s ease-in-out infinite}
.ln-b{min-height:32px;min-width:34px;border:1px solid var(--line2);background:rgba(3,6,11,.75);border-radius:8px;padding:4px 10px;font-size:12px;color:var(--ink)}
.ln-tip{position:absolute;max-width:260px;background:rgba(6,12,20,.95);border:1px solid var(--line2);border-radius:8px;padding:6px 9px;font-size:12px;pointer-events:none}
.win-h .wb.nav{font-size:18px;color:var(--done)}
.win-h .wb.cd{font-family:var(--f-m);font-size:11px}
.win-imp{position:absolute;right:8px;top:46px;z-index:70;background:#07101a;border:1px solid var(--line2);border-radius:10px;padding:8px;display:grid;gap:6px;width:250px;box-shadow:0 12px 30px rgba(0,0,0,.6)}
.win-imp button,.win-imp label{display:block;text-align:left;min-height:38px;border:1px solid var(--line2);background:rgba(255,255,255,.03);border-radius:8px;padding:8px 10px;font-size:12.5px;color:var(--ink);cursor:pointer}
.win-imp small{color:var(--muted);font-size:11px;line-height:1.4}
#dock button{width:46px;height:46px;border-radius:50%;border:1px solid var(--acc);background:var(--glass);color:var(--acc);font-family:var(--f-m);font-size:8.5px;letter-spacing:.04em;box-shadow:0 0 16px rgba(var(--acc-rgb),.35);backdrop-filter:blur(8px);padding:0;line-height:1.1;overflow:hidden}
#dock button:hover{background:rgba(var(--acc-rgb),.15)}
@media (max-width:640px){#dock{bottom:calc(130px + env(safe-area-inset-bottom,0px));max-width:calc(100vw - 24px);overflow-x:auto}}
/* botones genéricos dentro de salas propias */
.dz{container-type:inline-size;min-height:100%;padding:16px 18px 28px;background:linear-gradient(rgba(var(--acc-rgb),.03) 1px,transparent 1px) 0 0/30px 30px,linear-gradient(90deg,rgba(var(--acc-rgb),.03) 1px,transparent 1px) 0 0/30px 30px}
.dz h2{font-family:var(--f-d);font-weight:400;font-size:15px;letter-spacing:.16em;margin:0;color:var(--ink)}
.dz h2 em{font-style:normal;color:var(--acc)}
.dz .lead{color:var(--muted);font-size:13px;line-height:1.5;margin:6px 0 14px;max-width:80ch}
.dz .row{display:flex;gap:8px;flex-wrap:wrap;align-items:center}
.dz .bt{min-height:40px;padding:8px 14px;border-radius:8px;border:1px solid var(--line2);background:rgba(255,255,255,.03);font-size:13px}
.dz .bt:hover{border-color:var(--acc);color:var(--acc)}
.dz .bt.pri{background:var(--acc);color:#021016;border-color:var(--acc);font-weight:600}
.dz .bt.ok{background:var(--done);color:#0b1600;border-color:var(--done);font-weight:600}
.dz .bt.warn{border-color:var(--warn);color:var(--warn)}
.dz .bt[disabled]{opacity:.45;pointer-events:none}
.dz .nx{display:flex;justify-content:flex-end;margin-top:20px}
.dz .nx .bt{min-height:48px;padding:10px 22px;font-family:var(--f-d);font-size:11px;letter-spacing:.14em;background:var(--done);color:#0b1600;border:0;box-shadow:0 0 22px rgba(var(--done-rgb),.35)}
.dz .card{border:1px solid var(--line2);border-radius:12px;background:rgba(10,19,31,.72);padding:14px;position:relative}
.dz .card.warnb{border-color:rgba(255,92,122,.55)}
.dz .tag{display:inline-block;font-family:var(--f-m);font-size:9.5px;letter-spacing:.12em;padding:3px 7px;border-radius:5px;border:1px solid var(--line2);color:var(--muted)}
.dz .tag.w{border-color:var(--warn);color:var(--warn)}
.dz .tag.g{border-color:var(--done);color:var(--done)}
.dz .tag.c{border-color:var(--acc);color:var(--acc)}
.dz .mono{font-family:var(--f-m)}
.dz textarea,.dz input[type=text]{width:100%;background:rgba(2,10,18,.9);border:1px solid var(--line2);border-radius:8px;padding:10px;color:var(--ink);font-size:13px;line-height:1.5}
.dz textarea{min-height:110px;resize:vertical}
.dz textarea:focus,.dz input:focus{outline:none;border-color:var(--acc);box-shadow:0 0 12px rgba(var(--acc-rgb),.25)}
/* materias */
.mt-rail{display:flex;gap:6px;overflow-x:auto;padding:4px 0 10px;scrollbar-width:thin}
.mt-rail button{flex:none;min-height:40px;border:1px solid var(--line2);background:rgba(255,255,255,.02);border-radius:999px;padding:6px 14px;font-size:12px;color:var(--muted);display:flex;gap:8px;align-items:center}
.mt-rail button[aria-pressed="true"]{border-color:var(--acc);color:var(--ink);background:rgba(var(--acc-rgb),.1)}
.mt-rail button i{font-style:normal;font-family:var(--f-m);font-size:10px;color:var(--done)}
.mt-step{border:1px solid var(--line);border-radius:10px;background:rgba(10,19,31,.6);margin-bottom:8px;overflow:hidden}
.mt-step.ok{border-color:rgba(var(--done-rgb),.45)}
.mt-step.wip{border-color:rgba(var(--acc-rgb),.5)}
.mt-step.na{opacity:.5}
.mt-step>div{display:flex;gap:10px;align-items:center;padding:8px 10px}
.mt-step .id{font-family:var(--f-m);font-size:10px;color:var(--faint);flex:none;width:52px}
.mt-step .t{flex:1;font-size:13.5px;line-height:1.4;cursor:pointer;min-width:0}
.mt-st{display:flex;gap:4px;flex:none}
.mt-st button{width:38px;height:38px;border-radius:9px;border:1px solid var(--line2);background:none;color:var(--muted);font-size:14px}
.mt-st button[aria-pressed="true"].o{background:var(--done);color:#0b1600;border-color:var(--done)}
.mt-st button[aria-pressed="true"].w{background:var(--acc);color:#021016;border-color:var(--acc)}
.mt-st button[aria-pressed="true"].n{background:var(--faint);color:#000;border-color:var(--faint)}
.mt-det{padding:4px 14px 14px 72px;font-size:13px;line-height:1.55;color:#C8D6E6;white-space:pre-wrap}
.mt-det .ec{border-left:2px solid var(--acc);padding:6px 10px;margin:10px 0;background:rgba(var(--acc-rgb),.05);white-space:normal}
.mt-det .sale{border-left:2px solid var(--done);padding:6px 10px;margin:10px 0;background:rgba(var(--done-rgb),.05);white-space:normal}
@container (max-width:560px){.mt-det{padding-left:14px}.mt-step .id{display:none}}
.ring{--p:0;width:54px;height:54px;border-radius:50%;background:conic-gradient(var(--done) calc(var(--p)*1%),rgba(255,255,255,.07) 0);display:grid;place-items:center;flex:none}
.ring b{width:44px;height:44px;border-radius:50%;background:#07101a;display:grid;place-items:center;font-family:var(--f-m);font-size:11px;font-weight:500}
/* sitio */
.st-tl{position:relative;margin:14px 0;padding-left:28px}
.st-tl::before{content:"";position:absolute;left:10px;top:0;bottom:0;width:2px;background:linear-gradient(var(--acc),#f5b041,var(--done));box-shadow:0 0 10px rgba(var(--acc-rgb),.6)}
.st-ev{position:relative;margin:0 0 10px;border:1px solid var(--line2);border-radius:10px;padding:10px 12px;background:rgba(10,19,31,.7)}
.st-ev::before{content:"";position:absolute;left:-23px;top:14px;width:12px;height:12px;border-radius:50%;background:#07101a;border:2px solid var(--acc);box-shadow:0 0 10px var(--acc)}
.st-ev.v::before{border-color:var(--done);box-shadow:0 0 10px var(--done)}
.st-ev.pv{border-color:rgba(255,92,122,.5)}
.st-ev .y{font-family:var(--f-m);color:var(--acc);font-size:12px;letter-spacing:.06em}
.st-ev b{display:block;margin:2px 0 4px}
.st-ev p{margin:0;color:#C8D6E6;font-size:13px;line-height:1.5}
.st-ev .acts{display:flex;gap:6px;margin-top:8px}
.st-ev .acts button{min-height:34px;border:1px solid var(--line2);background:none;border-radius:7px;padding:4px 10px;font-size:12px}
.st-links{display:grid;grid-template-columns:repeat(auto-fill,minmax(220px,1fr));gap:8px}
.st-links a{display:block;border:1px solid var(--line2);border-radius:9px;padding:10px 12px;color:var(--ink);text-decoration:none;font-size:13px;background:rgba(10,19,31,.6);min-height:44px}
.st-links a:hover{border-color:var(--acc)}
.st-links a small{display:block;color:var(--muted);font-size:11px;margin-top:2px}
/* tesis */
.ts-wrap{display:grid;grid-template-columns:230px minmax(0,1fr);gap:14px}
@container (max-width:760px){.ts-wrap{grid-template-columns:1fr}}
.ts-nav{display:flex;flex-direction:column;gap:6px}
@container (max-width:760px){.ts-nav{flex-direction:row;overflow-x:auto;padding-bottom:6px}}
.ts-nav button{flex:none;text-align:left;border:1px solid var(--line);border-radius:10px;background:rgba(10,19,31,.6);padding:8px 10px;display:flex;gap:10px;align-items:center;min-height:48px}
.ts-nav button[aria-pressed="true"]{border-color:var(--acc);background:rgba(var(--acc-rgb),.1)}
.ts-nav button span{font-size:12.5px;line-height:1.25}
.ts-nav .ring{width:36px;height:36px}.ts-nav .ring b{width:28px;height:28px;font-size:9.5px}
.ts-item{border:1px solid var(--line);border-radius:12px;background:rgba(10,19,31,.66);margin-bottom:10px;overflow:hidden}
.ts-item.ok{border-color:rgba(var(--done-rgb),.5)}
.ts-item>header{display:flex;gap:10px;align-items:center;padding:10px 12px;cursor:pointer}
.ts-item>header b{flex:1;font-size:13.5px;font-weight:600;min-width:0}
.ts-item>header code{font-family:var(--f-m);font-size:11px;color:var(--acc);flex:none}
.ts-ev{display:flex;flex-wrap:wrap;gap:6px;padding:0 12px 10px}
.ts-ev .chip{border:1px solid rgba(var(--done-rgb),.5);border-radius:8px;padding:6px 9px;font-size:12px;background:rgba(var(--done-rgb),.06);max-width:100%}
.ts-ev .chip.e{border-color:rgba(255,92,122,.45);background:rgba(255,92,122,.05);color:#ffc2cd}
.ts-ev .chip button{border:0;background:none;color:var(--acc);padding:0 0 0 6px;font-size:12px;text-decoration:underline}
.ts-body{padding:0 12px 12px}
`;
document.head.appendChild(css);

/* ====================================================================== */
/* VENTANAS                                                                */
/* ====================================================================== */
const wins = document.createElement("div"); wins.id = "wins"; document.body.appendChild(wins);
const dock = document.createElement("div"); dock.id = "dock"; document.body.appendChild(dock);
const W = {}; let zTop = 40;
const LAY = "dion-win-layout";

function defaultRect(kind){
  const vw = innerWidth, vh = innerHeight;
  if (isPhone()){
    if (kind === "monitor") return {x:8, y:64, w:vw - 16, h:220};
    if (kind === "linea") return {x:0, y:vh - 260, w:vw, h:260};
    return {x:0, y:56, w:vw, h:vh - 56};
  }
  if (kind === "monitor") return {x:vw - 316, y:60, w:300, h:300};
  if (kind === "linea") return {x:84, y:vh - 222, w:vw - 100, h:210};
  if (kind === "tool") return {x:84, y:58, w:vw - 100, h:vh - 74};
  const n = Object.values(W).filter(w => w.kind === "station" && !w.min).length;
  const lineaUp = W.linea && !W.linea.min, hh = lineaUp ? vh - 62 - 232 : vh - 76;
  return {x:clamp(84 + n*26, 0, vw - 400), y:58 + n*20, w:Math.min(1060, vw - (W.monitor && !W.monitor.min ? 420 : 110)), h:hh < 380 ? vh - 76 : Math.min(hh, 860)};
}
function fitIn(r){ const vw = innerWidth, vh = innerHeight; r.w = clamp(r.w, 260, vw); r.h = clamp(r.h, 140, vh); r.x = clamp(r.x, -r.w + 120, vw - 80); r.y = clamp(r.y, 0, vh - 42); return r; }
function place(w){ const r = w.max ? {x:0, y:0, w:innerWidth, h:innerHeight} : w.r; Object.assign(w.el.style, {left:r.x + "px", top:r.y + "px", width:r.w + "px", height:r.h + "px"}); w.el.classList.toggle("max", !!w.max); }
function saveLayout(){ const L = lsg(LAY, {}); Object.values(W).forEach(w => { if (!isPhone()) L[w.layKey] = w.r; }); lss(LAY, L); }
function focusWin(w){ Object.values(W).forEach(x => x.el.classList.toggle("focus", x === w)); w.el.style.zIndex = ++zTop; }

function openWin(o){
  // o: {key, title, sub, kind, render(body, win) | iframe, onClose, short}
  let w = W[o.key];
  if (w){ if (w.min) restore(w); w.title = o.title || w.title; w.sub = o.sub != null ? o.sub : w.sub; w.el.querySelector(".win-h b").textContent = w.title; w.el.querySelector(".win-h span").textContent = w.sub || ""; focusWin(w); if (o.render && o.rerender !== false){ try { w.cleanup && w.cleanup(); } catch(e){} w.body.innerHTML = ""; w.cleanup = o.render(w.body, w); } return w; }
  const el = document.createElement("section"); el.className = "win"; el.setAttribute("role", "dialog"); el.setAttribute("aria-label", o.title);
  el.innerHTML = `<div class="win-h"><b></b><span></span><button class="wb cd" title="Mejorar esta herramienta (exportar / importar código)" aria-label="Mejorar">&lt;/&gt;</button><button class="wb nav pv" title="Anterior" aria-label="Anterior">‹</button><button class="wb nav nx" title="Siguiente" aria-label="Siguiente">›</button><button class="wb m" title="Minimizar a bolita" aria-label="Minimizar">–</button><button class="wb f" title="Maximizar" aria-label="Maximizar">□</button><button class="wb x" title="Cerrar" aria-label="Cerrar">×</button></div><div class="win-b"></div><div class="win-rz e" data-d="e"></div><div class="win-rz w" data-d="w"></div><div class="win-rz s" data-d="s"></div><div class="win-rz sw" data-d="sw"></div><div class="win-r" data-d="se" aria-hidden="true"></div>`;
  el.querySelector(".win-h b").textContent = o.title; el.querySelector(".win-h span").textContent = o.sub || "";
  wins.appendChild(el);
  const layKey = o.kind === "station" ? "station" : o.key;
  const saved = !isPhone() && lsg(LAY, {})[layKey];
  w = W[o.key] = {key:o.key, el, body:el.querySelector(".win-b"), title:o.title, sub:o.sub, kind:o.kind, short:o.short || o.title.slice(0, 6), onClose:o.onClose, layKey,
    r:fitIn(saved && o.kind !== "station" ? {...saved} : defaultRect(o.kind)), max:false, min:false};
  if (o.kind === "station" && saved){ const n = Object.values(W).filter(x => x.kind === "station" && x !== w && !x.min).length; w.r = fitIn({...saved, x:saved.x + n*24, y:saved.y + n*20}); }
  place(w); focusWin(w);
  el.addEventListener("pointerdown", () => focusWin(w), true);
  const h = el.querySelector(".win-h");
  h.addEventListener("pointerdown", e => {
    if (e.target.closest(".wb")) return;
    if (w.max) return;
    e.preventDefault(); h.setPointerCapture(e.pointerId); document.body.classList.add("wdrag");
    const sx = e.clientX, sy = e.clientY, r0 = {...w.r};
    const mv = ev => { w.r.x = r0.x + ev.clientX - sx; w.r.y = r0.y + ev.clientY - sy; fitIn(w.r); place(w); };
    const up = () => { h.removeEventListener("pointermove", mv); h.removeEventListener("pointerup", up); h.removeEventListener("pointercancel", up); document.body.classList.remove("wdrag");
      if (w.kind === "monitor") snapCorner(w); else snapEdges(w); saveLayout(); };
    h.addEventListener("pointermove", mv); h.addEventListener("pointerup", up); h.addEventListener("pointercancel", up);
  });
  h.addEventListener("dblclick", e => { if (!e.target.closest(".wb")) toggleMax(w); });
  el.querySelectorAll("[data-d]").forEach(rz => rz.addEventListener("pointerdown", e => { if (w.max) return; e.preventDefault(); e.stopPropagation(); rz.setPointerCapture(e.pointerId); document.body.classList.add("wdrag");
    const d = rz.dataset.d, sx = e.clientX, sy = e.clientY, r0 = {...w.r};
    const mv = ev => { const dx = ev.clientX - sx, dy = ev.clientY - sy;
      if (d.includes("e")) w.r.w = Math.max(260, r0.w + dx);
      if (d.includes("s")) w.r.h = Math.max(140, r0.h + dy);
      if (d.includes("w")){ const nw = Math.max(260, r0.w - dx); w.r.x = r0.x + (r0.w - nw); w.r.w = nw; }
      place(w); w.onResize && w.onResize(); };
    const up = () => { rz.removeEventListener("pointermove", mv); rz.removeEventListener("pointerup", up); rz.removeEventListener("pointercancel", up); document.body.classList.remove("wdrag"); saveLayout(); w.onResize && w.onResize(); };
    rz.addEventListener("pointermove", mv); rz.addEventListener("pointerup", up); rz.addEventListener("pointercancel", up); }));
  w.route = o.route || (o.key.startsWith("st:") ? o.key.slice(3) : o.key === "tool:as" ? "as" : o.key === "tool:mez" ? "mez" : null);
  w.improve = o.improve || (w.route && w.route !== "terreno" ? w.route : o.key === "tool:atlas" ? null : null);
  el.querySelector(".wb.pv").onclick = () => stepRoute(w, -1); el.querySelector(".wb.nx").onclick = () => stepRoute(w, 1);
  el.querySelector(".wb.cd").onclick = () => improveMenu(w);
  if (!w.route){ el.querySelector(".wb.pv").hidden = true; el.querySelector(".wb.nx").hidden = true; }
  if (!w.improve) el.querySelector(".wb.cd").hidden = true;
  el.querySelector(".wb.m").onclick = () => minimize(w);
  el.querySelector(".wb.f").onclick = () => toggleMax(w);
  el.querySelector(".wb.x").onclick = () => closeWin(w.key);
  if (o.iframe){ const f = document.createElement("iframe"); const ov = OVR["tool:" + o.iframe]; if (ov){ regCode(ov).then(h => { f.srcdoc = h; }); } else f.src = o.iframe; f.title = o.title; w.body.appendChild(f); w.frame = f; w.body.style.overflow = "hidden"; }
  if (o.render) w.cleanup = o.render(w.body, w);
  return w;
}
function snapEdges(w){ const r = w.r, vw = innerWidth, vh = innerHeight, s = 18;
  if (Math.abs(r.x) < s) r.x = 0; if (Math.abs(r.y) < s) r.y = 0; if (Math.abs(vw - (r.x + r.w)) < s) r.x = vw - r.w; if (Math.abs(vh - (r.y + r.h)) < s) r.y = vh - r.h; place(w); }
function snapCorner(w){ const r = w.r, vw = innerWidth, vh = innerHeight, m = 12, top = 58;
  const cx = r.x + r.w/2, cy = r.y + r.h/2; r.x = cx < vw/2 ? (isPhone() ? m : 76) : vw - r.w - m; r.y = cy < vh/2 ? top : vh - r.h - m; place(w); }
function toggleMax(w){ w.max = !w.max; place(w); w.onResize && setTimeout(w.onResize, 30); }
function minimize(w){ w.min = true; w.el.hidden = true; w.onMin && w.onMin(true); if (w.frame) try { w.frame.contentWindow.postMessage({dion:'visible', v:false}, '*'); } catch(e){} const b = document.createElement("button"); b.title = w.title; b.textContent = w.short; b.onclick = () => restore(w); w.dockBtn = b; dock.appendChild(b); }
function restore(w){ w.min = false; w.el.hidden = false; w.onMin && w.onMin(false); if (w.frame) try { w.frame.contentWindow.postMessage({dion:'visible', v:true}, '*'); } catch(e){} if (w.dockBtn){ w.dockBtn.remove(); w.dockBtn = null; } focusWin(w); w.onResize && setTimeout(w.onResize, 30); }
function closeWin(key){ const w = W[key]; if (!w) return; try { w.cleanup && w.cleanup(); } catch(e){} if (w.dockBtn) w.dockBtn.remove(); w.el.remove(); delete W[key]; w.onClose && w.onClose(); }
addEventListener("resize", () => Object.values(W).forEach(w => { fitIn(w.r); place(w); w.onResize && w.onResize(); }));

/* ====================================================================== */
/* PROYECTO ACTIVO, GUARDADO Y CONTEXTO PARA LAS SALAS                     */
/* ====================================================================== */
const curP = () => { const d = D(); return d && d.active ? d.P.find(x => x.id === d.active) : null; };
const pending = {}; let saveTimer = null;
function patch(id, obj){
  const d = D(), p = d.P.find(x => x.id === id); if (!p) return Promise.resolve();
  Object.assign(p, obj, {actualizado:Date.now()}); Object.assign(pending[id] = pending[id] || {}, obj, {actualizado:Date.now()});
  clearTimeout(saveTimer); refreshLive();
  return new Promise(res => { saveTimer = setTimeout(async () => { for (const k of Object.keys(pending)){ const body = JSON.parse(JSON.stringify(pending[k])); delete pending[k]; try { await d.savePatch(k, body); } catch(e){ d.toast("No se pudo guardar: revisa la conexión"); } } res(); }, 500); });
}
function climaDe(p){
  const L = p.loc || {}, lat = +L.lat, lon = +L.lon, prov = nrm(L.provincia);
  if (p.iso === "ECU" || nrm(L.pais) === "ecuador"){
    if (/galapagos/.test(prov) || lon < -85) return {zona:"galapagos", tipo:"calido-seco", elev:20};
    if (/esmeraldas|manabi|santa elena|guayas|los rios|el oro|santo domingo/.test(prov)) return {zona:"costa", tipo:/santa elena/.test(prov) ? "calido-seco" : "calido-humedo", elev:20};
    if (/sucumbios|napo|orellana|pastaza|morona|zamora/.test(prov)) return {zona:"amazonia", tipo:"calido-humedo", elev:400};
    return {zona:"sierra", tipo:"andino", elev:2600};
  }
  const a = Math.abs(lat); return {zona:"otro", tipo:a < 23 ? "calido-humedo" : a < 35 ? "calido-seco" : a < 55 ? "templado" : "frio", elev:0};
}
let uploader = null;
async function getAssets(){ if (uploader !== null) return uploader; try { uploader = window.claude && window.claude.use ? await window.claude.use("assets") : null; } catch(e){ uploader = null; } return uploader; }
let sampler;
async function getSample(){ if (sampler !== undefined) return sampler; try { sampler = window.claude && window.claude.use ? await window.claude.use("sample") : null; } catch(e){ sampler = null; } return sampler; }
async function download(filename, data){
  const d = D(); const dl = await d.getDL();
  if (dl){ try { await dl.save({filename, data}); return; } catch(e){ if (e && e.code === "declined") return; } }
  const blob = data instanceof Blob ? data : new Blob([data], {type:"text/plain;charset=utf-8"}); const a = document.createElement("a"); a.href = URL.createObjectURL(blob); a.download = filename; document.body.appendChild(a); a.click(); a.remove(); setTimeout(() => URL.revokeObjectURL(a.href), 2000);
}
function ctxFor(stKey){
  const d = D(), id = d.active;
  const P = () => d.P.find(x => x.id === id) || {};
  const t = d.BYID[P().tipo];
  return {
    get P(){ return P(); },
    tipo: t ? {id:t.id, n:t.n, cat:{c:t.cat, n:t.catn}, sub:t.sub} : null,
    get area(){ const tr = P().terreno; return tr ? +tr.area || 0 : 0; },
    get clima(){ return climaDe(P()); },
    get: k => ((P().mods || {})[k]) || {},
    set: (k, o) => { const m = {...(P().mods || {})}; m[k] = o; return patch(id, {mods:m}); },
    setP: o => patch(id, o),
    toast: m => d.toast(m), esc,
    sample: getSample,
    upload: async files => { const a = await getAssets(); if (!a) return []; const out = []; for (const f of files){ try { const r = await a.upload(f); out.push({id:r.id, url:r.url}); } catch(e){ d.toast("No se pudo subir " + (f.name || "la imagen")); } } return out; },
    download,
    next: () => nextFrom(stKey),
    open: k => openStation(k)
  };
}

/* ====================================================================== */
/* DATOS DEL FLUJO (materias del Miro) — carga perezosa                    */
/* ====================================================================== */
const MAT_FILES = ["leg","ger","his","fun","geo","dis","bim","tri","est","res","ins"];
const MAT_TOTAL = {leg:43, ger:40, his:25, fun:26, geo:24, dis:113, bim:41, tri:26, est:22, res:24, ins:51};
let matP = null;
function loadScript(src){ return new Promise((res, rej) => { const s = document.createElement("script"); s.src = src; s.onload = res; s.onerror = () => rej(new Error(src)); document.head.appendChild(s); }); }
function loadMaterias(){ if (matP) return matP; window.FLUJO_M = window.FLUJO_M || [];
  matP = Promise.all(MAT_FILES.filter(f => !window.FLUJO_M.some(m => m.id === f)).map(f => loadScript("flujo/m-" + f + ".js").catch(() => null))).then(() => { refreshLive(); return window.FLUJO_M; }); return matP; }
const MAT = id => (window.FLUJO_M || []).find(m => m.id === id);
function matSteps(id){ const m = MAT(id); return m ? m.fases.flatMap((f, i) => f.pasos.map(p => ({...p, fase:i}))) : null; }
function matProgress(p, id, faseFilter){
  const st = p.st || {}, steps = matSteps(id);
  if (steps){ const list = faseFilter == null ? steps : steps.filter(s => faseFilter.includes(s.fase)); const act = list.filter(s => st[s.id] !== "na" && !(s.cuando && s.cuando.length && !s.cuando.some(k => (p.flags || {})[k]) && !["ok","wip"].includes(st[s.id])));
    if (!act.length) return 0; return act.reduce((a, s) => a + (st[s.id] === "ok" ? 1 : st[s.id] === "wip" ? .4 : 0), 0) / act.length; }
  const ks = Object.keys(st).filter(k => k.startsWith(id + "-")); return Math.min(1, ks.reduce((a, k) => a + (st[k] === "ok" ? 1 : st[k] === "wip" ? .4 : 0), 0) / (MAT_TOTAL[id] || 30));
}

/* ====================================================================== */
/* RUTA DEL PROYECTO (orden del PDF y del Miro)                            */
/* ====================================================================== */
const MODFILE = {codificacion:"mods/codigos.js", insumos:"mods/insumos.js", mantenimiento:"mods/mantenimiento.js", estilos:"mods/estilos.js", normas:"mods/normas.js", fundamentos:"mods/diseno.js", dibujo:"mods/diseno.js", estructura:"mods/salas1.js", instalaciones:"mods/salas1.js", materiales:"mods/salas2.js", costos:"mods/salas2.js", tecnologia:"mods/salas2.js", arranque:"mods/arranque.js"};
const has = o => o && Object.keys(o).length > 0;
const RUTA = [
  {k:"terreno", c:"E0", n:"Ubicación y terreno", s:"País, provincia, cantón, coordenadas, UTM y polígono", hebra:["gen"], prog:p => p.terreno ? 1 : p.loc ? .3 : 0},
  {k:"arranque", c:"E1", n:"Arranque · carpetas", s:"Matriz avanzada BIM + índice de carpetas (día 1)", hebra:["gen","doc","bim"], prog:p => { const a = (p.mods || {}).arranque; return a && a.generado ? 1 : has(a) ? .4 : 0; }},
  {k:"codificacion", c:"E", n:"Codificación BIM y BEP", s:"Códigos de todas las disciplinas, carpeta madre, CDE y plan BIM (ISO 19650) desde la 1ª reunión", hebra:["gen","doc","bim"], prog:p => { const v = ((p.mods || {})._visto || {}).codificacion; const c = (p.mods || {}).codif || {}; return Math.max(c.listo ? 1 : v ? .35 : 0, matProgress(p, "bim", [0, 1])); }},
  {k:"leg", c:"E2", n:"Contexto 1 · Económico-legal", s:"Diligencia del terreno, permisos, finanzas, contratos", hebra:["gen","ctx"], mat:"leg"},
  {k:"ger", c:"E3", n:"Gerencia del proyecto", s:"Alcance, honorarios, cronograma, riesgos", hebra:["gen","ctx"], mat:"ger"},
  {k:"sitio", c:"E4", n:"Contexto 2 · Historia del sitio", s:"Qué pasó en ese terreno: eventos, clima, sismos, cómo era", hebra:["gen","ctx"], prog:p => { const s = (p.mods || {}).sitio || {}; const ev = s.eventos || []; return !ev.length ? (s.resumen ? .3 : 0) : clamp(.4 + .6*ev.filter(e => e.v).length/Math.max(1, ev.length), 0, 1); }},
  {k:"estilos", c:"E5", n:"Contexto 3 · Historia de la arquitectura", s:"Dashboard de estilos con afinidad", hebra:["gen","ctx","dis"], prog:p => (p.estilos || []).length ? (p.estiloPrincipal ? 1 : .6) : 0},
  {k:"normas", c:"E6", n:"Normas del terreno", s:"COS · CUS · CAS · retiros · alturas · links oficiales", hebra:["gen","ctx","doc"], prog:p => { const n = p.norm; if (!n) return 0; const v = n.verificado || {}; return clamp(.4 + .6*Object.values(v).filter(Boolean).length/3, 0, 1); }},
  {k:"fundamentos", c:"E7", n:"Fundamentos del diseño I y II", s:"Elementos, formas, principios ordenadores", hebra:["gen","dis"], prog:p => { const f = (p.mods || {}).fundamentos || {}; return clamp((f.elegidos || []).length/8, 0, 1); }},
  {k:"dibujo", c:"E8", n:"Dibujo · Trace y postproducción", s:"Geometría descriptiva, perspectiva, dibujo digital", hebra:["gen","dis"], prog:p => { const f = (p.mods || {}).dibujo || {}; return clamp(((f.bocetos || []).length ? .5 : 0) + .5*Object.values(f.pasos || {}).filter(v => v === "ok" || v === true || v === "hecho").length/24, 0, 1); }},
  {k:"tesis", c:"E9", n:"Diseño arquitectónico · capítulos 1–12", s:"Se llena con todo lo anterior · A.S. (cap. 5) · M.E.Z. (cap. 8)", hebra:["gen","dis"], prog:p => { const t = (p.mods || {}).tesis || {}; const it = t.items || {}; const n = Object.values(it).filter(x => x && x.st === "ok").length; return clamp(Math.max(n/120, matProgress(p, "dis")), 0, 1); }},
  {k:"as", c:"E", n:"Análisis de sitio · A.S.", s:"Sol, sombras, viento (fluido) y clima con tu terreno y los volúmenes de M.E.Z. · capítulo 5", hebra:["gen","dis"], prog:p => (((p.mods || {})._visto || {}).as ? .5 : 0)},
  {k:"mez", c:"E", n:"Programa y zonificación · M.E.Z.", s:"Matrices, burbujas y zonificación (se vuelven volúmenes en A.S.) · capítulos 7–8", hebra:["gen","dis"], prog:p => (((p.mods || {})._visto || {}).mez ? .5 : 0)},
  {k:"revit", c:"E11", n:"Puente a Revit", s:"Terreno, COS/CUS/CAS, niveles y envolvente a Revit 2027", hebra:["gen","doc","bim"], prog:p => { const r = (p.mods || {}).revit || {}; return r.exportado ? 1 : 0; }},
  {k:"estructura", c:"E12", n:"Estructura", s:"Geometría y trigonometría · estática · resistencia", hebra:["gen","tec"], prog:p => Math.max((matProgress(p, "tri") + matProgress(p, "est") + matProgress(p, "res"))/3, has((p.mods || {}).estructura) ? .3 : 0)},
  {k:"instalaciones", c:"E13", n:"Instalaciones", s:"Agua, sanitarias, eléctricas, SCI, HVAC", hebra:["gen","tec"], prog:p => Math.max(matProgress(p, "ins"), has((p.mods || {}).instalaciones) ? .3 : 0)},
  {k:"materiales", c:"E14", n:"Materiales y procesos", s:"Catálogo mundial y sistema constructivo", hebra:["gen","tec"], prog:p => { const m = (p.mods || {}).materiales || {}; return has(m) ? (m.sistema ? .8 : .4) + (has(m.capas) ? .2 : 0) : 0; }},
  {k:"insumos", c:"E", n:"Insumos, cuantías y precios", s:"Base de datos con códigos DION: accesorios, tuberías, equipos, acabados", hebra:["gen","tec","doc"], prog:p => { const c = (p.mods || {}).insumos || {}; const it = c.carrito || c.items || c.cart || []; return (Array.isArray(it) ? it.length : Object.keys(it).length) ? .7 : 0; }},
  {k:"costos", c:"E15", n:"Ingeniería de costos", s:"Paramétrico → capítulos → APU → curva S", hebra:["gen","tec"], prog:p => has((p.mods || {}).costos) ? .6 : 0},
  {k:"tecnologia", c:"E16", n:"Tecnología arquitectónica", s:"Automatización, vigilancia, logística, energía", hebra:["gen","tec"], prog:p => has((p.mods || {}).tecnologia) ? .6 : 0},
  {k:"mantenimiento", c:"E", n:"Mantenimiento de la edificación", s:"Vida útil, plan preventivo, costos de operación y manual de uso", hebra:["gen","tec","doc"], prog:p => has((p.mods || {}).mantenimiento) ? .6 : 0},
];
RUTA.forEach((r, i) => { r.i = i; r.c = "E" + i; });
const BYK = Object.fromEntries(RUTA.map(r => [r.k, r]));
const BIM_EST = [ // en qué estación se trabaja cada fase BIM (ISO 19650)
  {fase:0, en:"arranque", n:"Requisitos y usos BIM (1ª reunión)"}, {fase:1, en:"codificacion", n:"Movilización: carpetas, códigos, CDE"}, {fase:2, en:"tesis", n:"Entorno, LOD 100–200"},
  {fase:3, en:"estructura", n:"Proyecto técnico LOD 300/350"}, {fase:4, en:"costos", n:"Coordinación y 4D/5D"}, {fase:5, en:"tecnologia", n:"Entrega y gemelo"}, {fase:6, en:"mantenimiento", n:"Operación y mantenimiento (AIM)"}];
const HEBRAS = [
  {k:"gen", n:"PROCESO GENERAL", col:"#F5B041", off:0},
  {k:"ctx", n:"CONTEXTOS", col:"#38E1FF", off:-1},
  {k:"dis", n:"DISEÑO", col:"#B6FF3C", off:1},
  {k:"bim", n:"BIM", col:"#B07CFF", off:-2},
  {k:"tec", n:"TÉCNICO", col:"#FF8A4C", off:2},
  {k:"doc", n:"DOCUMENTACIÓN", col:"#9FD3FF", off:-3},
];
function stProg(p, r){ if (!p) return 0; try { return clamp(r.mat ? matProgress(p, r.mat) : r.prog(p), 0, 1); } catch(e){ return 0; } }
function hebraProg(p, h){
  if (h === "bim") return matProgress(p, "bim");
  const L = RUTA.filter(r => r.hebra.includes(h)); return L.reduce((a, r) => a + stProg(p, r), 0) / L.length;
}
function lastVisited(p){ const v = (p && p.mods && p.mods._visto) || {}; let best = null, bt = 0; RUTA.forEach(r => { const t = v[r.k]; if (t && t > bt && r.k !== "terreno"){ bt = t; best = r; } }); return best; }
function resumeTarget(p){ const lv = lastVisited(p); if (!lv) return nextPending(p); return stProg(p, lv) > .99 && RUTA[lv.i + 1] ? RUTA[lv.i + 1] : lv; }
function nextPending(p){ const r = RUTA.find(r => stProg(p, r) < .99); return r || RUTA[RUTA.length - 1]; }
function nextFrom(k){ const r = BYK[k]; const n = r ? RUTA[r.i + 1] : null; if (!n) return D().toast("Llegaste al final de la ruta");
  Object.values(W).forEach(w => { if (w.kind === "station" && !w.min) minimize(w); }); openStation(n.k); }

async function openStation(k){
  const d = D(), p = curP(); if (!p) return d.toast("Abre o crea un proyecto primero");
  if (k === "bim") return openMateria("bim");
  const r = BYK[k]; if (!r && k !== "as" && k !== "mez") return;
  const seen = {...((p.mods || {})._visto || {})}; seen[k] = Date.now(); patch(p.id, {mods:{...(p.mods || {}), _visto:seen}});
  if (k === "as" || k === "mez"){ d.sendToTools(p); return openToolWin(k); }
  if (k === "terreno") return d.editTerrain(p);
  if (r.mat && !OVR[k]) return openMateria(r.mat, r);
  const title = `${r.c} · ${r.n}`;
  const builtIn = {sitio:renderSitio, tesis:renderTesis, codif:renderCodif, revit:renderRevit}[k];
  if (builtIn && !OVR[k]) return openWin({key:"st:" + k, title, sub:r.s, kind:"station", short:r.c, render:(b) => builtIn(b, ctxFor(k))});
  const w = openWin({key:"st:" + k, title, sub:r.s, kind:"station", short:r.c, render:(b) => { b.innerHTML = `<div class="dz"><p class="lead">Cargando ${esc(r.n)}…</p></div>`; }});
  try { if (OVR[k] && !(OVR[k]._loaded)){ delete (window.DION_MOD || {})[k]; await loadCustomModule(OVR[k]); OVR[k]._loaded = 1; }
    else if (!(window.DION_MOD || {})[k]){ const ce = REG.find(e => e.k === k && e.kind === "js"); if (ce) await loadCustomModule(ce); else await loadScript(MODFILE[k]); } }
  catch(e){ w.body.innerHTML = `<div class="dz"><p class="lead">No se pudo cargar esta sala. Revisa la conexión y vuelve a abrirla.</p></div>`; return; }
  const M = window.DION_MOD[k]; try { w.cleanup && w.cleanup(); } catch(e){} w.body.innerHTML = "";
  try { w.cleanup = M.render(w.body, ctxFor(k)); } catch(e){ console.error(e); w.body.innerHTML = `<div class="dz"><p class="lead">Error en la sala: ${esc(e.message)}</p></div>`; }
  addLinks(w, k);
}
const LINKS = {
  codificacion:[["CARPETA MADRE (ATLAS)", () => D().openTool("bim", {lib:"carp", open:{id:D().active, page:"carp"}})], ["CÓDIGOS DEL MIRO", () => D().openTool("bim", {lib:"cod", open:{id:D().active, page:"cod"}})], ["GENERADOR DE CARPETAS", () => openStation("arranque")], ["PLAN BIM · ISO 19650", () => openStation("bim")], ["INSUMOS Y PRECIOS", () => openStation("insumos")], ["✓ LISTO PARA EMPEZAR", w => { const p = curP(); const c = ((p.mods || {}).codif) || {}; ctxFor("codificacion").set("codif", {...c, listo:!c.listo}); D().toast(c.listo ? "Desmarcado" : "Codificación y carpetas listas"); }]],
  instalaciones:[["ACCESORIOS CON CÓDIGO Y PRECIO", () => openStation("insumos")], ["CODIFICACIÓN IS / IE / CI", () => openStation("codificacion")], ["MANTENIMIENTO", () => openStation("mantenimiento")]],
  estructura:[["INSUMOS: ACERO Y HORMIGÓN", () => openStation("insumos")], ["CODIFICACIÓN S", () => openStation("codificacion")]],
  materiales:[["INSUMOS Y PRECIOS", () => openStation("insumos")], ["CODIFICACIÓN", () => openStation("codificacion")]],
  costos:[["CUANTÍAS DESDE INSUMOS", () => openStation("insumos")]],
  insumos:[["CODIFICACIÓN BIM", () => openStation("codificacion")], ["INGENIERÍA DE COSTOS", () => openStation("costos")]],
  tecnologia:[["MANTENIMIENTO", () => openStation("mantenimiento")]]
};
function addLinks(w, k){ const L = LINKS[k]; if (!L || w.el.querySelector(".win-lk")) return;
  const bar = document.createElement("div"); bar.className = "win-lk";
  bar.innerHTML = L.map((l, i) => `<button data-i="${i}">${esc(l[0])}</button>`).join("");
  bar.querySelectorAll("button").forEach(b => b.onclick = () => L[+b.dataset.i][1](w));
  w.el.insertBefore(bar, w.body); }

/* ====================================================================== */
/* SALA GENÉRICA DE MATERIA (pasos del flujo, sincronizados con el Atlas)  */
/* ====================================================================== */
const matUI = {};
async function openMateria(id, r){
  const title = r ? `${r.c} · ${r.n}` : "BIM · Metodología en paralelo";
  const w = openWin({key:"mat:" + id, title, sub:r ? r.s : "ISO 19650 desde el día 1", kind:"station", short:r ? r.c : "BIM", route:r && BYK[r.k] ? r.k : null, improve:r && BYK[r.k] && r.mat ? r.k : null, render:b => { b.innerHTML = `<div class="dz"><p class="lead">Cargando pasos de la materia…</p></div>`; }});
  await loadMaterias();
  const draw = () => { if (!W["mat:" + id]) return; renderMateria(w.body, id, r ? r.k : "bim"); };
  draw(); w.refresh = draw;
}
function renderMateria(el, id, stKey){
  const p = curP(), m = MAT(id); if (!p) return;
  if (!m){ el.innerHTML = `<div class="dz"><p class="lead">No se encontraron los pasos de esta materia.</p></div>`; return; }
  const ui = matUI[id] = matUI[id] || {f:0, open:{}};
  const st = p.st || {}, nt = p.nt || {}, pr = Math.round(matProgress(p, id)*100);
  const fase = m.fases[ui.f] || m.fases[0];
  const fp = i => { const L = m.fases[i].pasos; return L.length ? Math.round(L.filter(s => st[s.id] === "ok").length/L.length*100) : 0; };
  const auto = s => s.cuando && s.cuando.length && !s.cuando.some(k => (p.flags || {})[k]) && !["ok","wip"].includes(st[s.id]);
  const extra = stKey === "leg" ? linksLegales(p) : stKey === "ger" ? "" : "";
  el.innerHTML = `<div class="dz">
    <div class="row" style="gap:14px;align-items:flex-start;flex-wrap:nowrap"><div class="ring" style="--p:${pr}"><b>${pr}%</b></div><div style="min-width:0"><h2>${esc(m.n.toUpperCase())}</h2><p class="lead" style="margin-bottom:0">${esc(m.para)}</p></div></div>
    ${extra}
    <div class="mt-rail" style="margin-top:14px">${m.fases.map((f, i) => `<button data-f="${i}" aria-pressed="${i === ui.f}">${esc(f.n.replace(/^Fase\s*/i, "F"))}<i>${fp(i)}%</i></button>`).join("")}</div>
    <div>${fase.pasos.map(s => { const v = st[s.id] || "", o = ui.open[s.id]; return `<div class="mt-step ${v}${auto(s) ? " na" : ""}" data-id="${s.id}"><div><span class="id">${esc(s.id)}</span><span class="t" data-tg="${s.id}">${esc(s.t)}${auto(s) ? ' <span class="tag">no aplica a esta tipología</span>' : ""}</span>
      <span class="mt-st"><button class="o" data-s="ok" aria-pressed="${v === "ok"}" title="Hecho">✓</button><button class="w" data-s="wip" aria-pressed="${v === "wip"}" title="En curso">◐</button><button class="n" data-s="na" aria-pressed="${v === "na"}" title="No aplica">⊘</button></span></div>
      ${o ? `<div class="mt-det">${esc(s.d || "")}${s.ec ? `<div class="ec"><b>Ecuador:</b> ${esc(s.ec)}</div>` : ""}${s.sale ? `<div class="sale"><b>Entregable:</b> ${esc(s.sale)}</div>` : ""}<textarea data-nt="${s.id}" placeholder="Notas, enlaces o hallazgos de este paso…">${esc(nt[s.id] || "")}</textarea></div>` : ""}</div>`; }).join("")}</div>
    <div class="nx">${stKey !== "bim" ? `<button class="bt" data-next>SIGUIENTE ESTACIÓN →</button>` : ""}</div></div>`;
  el.querySelectorAll("[data-f]").forEach(b => b.onclick = () => { ui.f = +b.dataset.f; renderMateria(el, id, stKey); el.scrollTop = 0; });
  el.querySelectorAll("[data-tg]").forEach(b => b.onclick = () => { ui.open[b.dataset.tg] = !ui.open[b.dataset.tg]; renderMateria(el, id, stKey); });
  el.querySelectorAll("[data-s]").forEach(b => b.onclick = () => { const sid = b.closest("[data-id]").dataset.id, v = b.dataset.s; const s2 = {...(curP().st || {})}; if (s2[sid] === v) delete s2[sid]; else s2[sid] = v; patch(p.id, {st:s2}); renderMateria(el, id, stKey); });
  let t; el.querySelectorAll("[data-nt]").forEach(a => a.oninput = () => { clearTimeout(t); t = setTimeout(() => { const n2 = {...(curP().nt || {})}; n2[a.dataset.nt] = a.value; patch(p.id, {nt:n2}); }, 700); });
  const nx = el.querySelector("[data-next]"); if (nx) nx.onclick = () => nextFrom(stKey);
}
function linksLegales(p){
  const L = p.loc || {}, q = s => "https://www.google.com/search?q=" + encodeURIComponent(s);
  const ec = p.iso === "ECU" || nrm(L.pais) === "ecuador";
  const links = ec ? [
    ["SRI · consulta de RUC", "https://srienlinea.sri.gob.ec/sri-en-linea/SriRucWeb/ConsultaRuc/Consultas/consultaRuc", "Verifica al promotor"],
    ["Superintendencia de Compañías", "https://appscvsgen.supercias.gob.ec/consultaCompanias/societario/busquedaCompanias.jsf", "Existencia legal de la compañía"],
    ["Registro de la Propiedad · " + (L.canton || "cantón"), q("Registro de la Propiedad " + (L.canton || "") + " certificado de gravámenes"), "Certificado de gravámenes"],
    ["Catastro / IRM · " + (L.canton || "GAD"), q("consulta catastral línea de fábrica IRM " + (L.canton || "") + " " + (L.provincia || "")), "Informe de regulación municipal"],
    ["SERCOP · compras públicas", "https://www.compraspublicas.gob.ec", "Si el promotor es público (LOSNCP)"],
    ["Cámara de la Construcción de Guayaquil", "https://www.cconstruccion.net", "Precios y revista de costos"]
  ] : [["Zoning & permits · " + (L.canton || L.provincia || L.pais || ""), q("zoning permit building code " + [L.canton, L.provincia, L.pais].filter(Boolean).join(" ")), "Búsqueda"], ["Land registry · " + (L.pais || ""), q("land registry title search " + (L.pais || "")), "Búsqueda"]];
  return `<div class="st-links" style="margin-top:12px">${links.map(l => `<a href="${esc(l[1])}" target="_blank" rel="noopener">${esc(l[0])}<small>${esc(l[2])}</small></a>`).join("")}</div>`;
}

/* ====================================================================== */
/* CONTEXTO 2 · HISTORIA DEL SITIO                                         */
/* ====================================================================== */
const sitioUI = {busy:false, add:false};
function renderSitio(el, ctx){
  const p = ctx.P, L = p.loc || {}, s = ctx.get("sitio"), ev = (s.eventos || []).slice().sort((a, b) => (parseInt(a.anio) || 0) - (parseInt(b.anio) || 0));
  const lugar = [L.parroquia, L.canton, L.provincia, L.pais].filter(Boolean).join(", ");
  const q = t => "https://www.google.com/search?q=" + encodeURIComponent(t);
  const ec = p.iso === "ECU" || nrm(L.pais) === "ecuador";
  const links = [
    ["Historia de " + (L.canton || L.provincia || "la zona"), q("historia de " + lugar), "Búsqueda"],
    ["Imágenes históricas del sitio", `https://earth.google.com/web/@${L.lat},${L.lon},300a,1500d,35y,0h,0t,0r`, "Google Earth → imágenes históricas (reloj)"],
    ...(ec ? [["Sismos · IG-EPN", "https://www.igepn.edu.ec", "Instituto Geofísico: historial sísmico y volcánico"],
      ["Clima · INAMHI", "https://www.inamhi.gob.ec", "Anuarios meteorológicos e hidrológicos"],
      ["Riesgos · SNGRE", "https://www.gestionderiesgos.gob.ec", "Inundaciones, deslizamientos, eventos peligrosos"],
      ["Patrimonio · INPC", "https://www.patrimoniocultural.gob.ec", "Bienes patrimoniales y sitios arqueológicos"],
      ["Cartografía · IGM", "https://www.geoportaligm.gob.ec", "Cartas topográficas y ortofotos antiguas"],
      ["Fenómeno El Niño en " + (L.provincia || "la zona"), q("fenómeno de El Niño " + (L.canton || "") + " " + (L.provincia || "") + " inundaciones historia"), "Búsqueda"]]
     : [["Historical maps", q("historical maps " + lugar), "Búsqueda"], ["Earthquake history", q("earthquake history " + lugar), "Búsqueda"], ["Flood history", q("flood history " + lugar), "Búsqueda"]])
  ];
  el.innerHTML = `<div class="dz">
    <h2>CONTEXTO 2 · <em>HISTORIA DEL SITIO</em></h2>
    <p class="lead">${esc(lugar)} · ${esc((+L.lat).toFixed(5))}, ${esc((+L.lon).toFixed(5))}${p.terreno ? " · terreno de " + p.terreno.area.toFixed(0) + " m²" : ""}. Qué ha pasado en este lugar: cómo era antes, fenómenos climáticos, sismos, movimientos de tierra, eventos importantes. Alimenta los ítems 1.1, 1.2 y 5.4 de tu tesis.</p>
    <div class="row"><button class="bt pri" id="si-ai" hidden>${sitioUI.busy ? "Investigando…" : s.eventos ? "Volver a investigar con IA" : "Investigar el sitio con IA"}</button><button class="bt" id="si-add">+ Agregar evento</button>${ev.length ? `<span class="tag ${ev.every(e => e.v) ? "g" : "w"}">${ev.filter(e => e.v).length}/${ev.length} VERIFICADOS</span>` : ""}</div>
    ${sitioUI.add ? `<div class="card" style="margin-top:12px"><div class="row"><input type="text" id="si-y" placeholder="Año" style="max-width:110px"><input type="text" id="si-t" placeholder="Título del evento" style="flex:1;min-width:180px"></div><textarea id="si-d" placeholder="Qué pasó y cómo afecta al terreno" style="margin-top:8px;min-height:70px"></textarea><div class="row" style="margin-top:8px"><button class="bt ok" id="si-ok">Guardar evento</button><button class="bt" id="si-x">Cancelar</button></div></div>` : ""}
    ${s.resumen ? `<div class="card ${s.ok ? "" : "warnb"}" style="margin-top:14px"><div class="row" style="justify-content:space-between"><span class="tag ${s.ok ? "g" : "w"}">${s.ok ? "RESUMEN CONFIRMADO" : "POR VERIFICAR"}</span>${s.ok ? "" : `<button class="bt" id="si-cok">Confirmar resumen</button>`}</div><p style="line-height:1.6;color:#D2DEEA;white-space:pre-wrap">${esc(s.resumen)}</p>${s.antes ? `<p style="line-height:1.6;color:var(--muted)"><b style="color:var(--ink)">Cómo era antes:</b> ${esc(s.antes)}</p>` : ""}</div>` : ""}
    ${ev.length ? `<div class="st-tl">${ev.map(e => `<div class="st-ev ${e.v ? "v" : "pv"}" data-e="${esc(e.id)}"><span class="y">${esc(e.anio)} · ${esc((e.tipo || "evento").toUpperCase())}${e.escala ? " · " + esc(e.escala) : ""}</span><b>${esc(e.titulo)}</b><p>${esc(e.detalle || "")}</p><div class="acts">${e.v ? `<span class="tag g">VERIFICADO</span>` : `<button data-v>✓ Verificado</button>`}<button data-del>Quitar</button></div></div>`).join("")}</div>` : `<div class="card" style="margin-top:14px;color:var(--muted)">Aún no hay eventos. Investiga con IA o agrégalos tú a partir de las fuentes de abajo.</div>`}
    ${(s.fenomenos || []).length ? `<h2 style="margin-top:20px;font-size:12px">FENÓMENOS Y RIESGOS</h2><div class="st-links" style="margin-top:8px">${s.fenomenos.map(f => `<div class="card"><b>${esc(f.n)}</b><p style="margin:4px 0 0;font-size:12.5px;color:var(--muted)">${esc(f.detalle || "")}${f.frecuencia ? " · " + esc(f.frecuencia) : ""}</p></div>`).join("")}</div>` : ""}
    ${(s.fuentes || []).length ? `<h2 style="margin-top:20px;font-size:12px">FUENTES SUGERIDAS (POR VERIFICAR)</h2><div class="st-links" style="margin-top:8px">${s.fuentes.map(f => `<a href="${esc(f.url || q(f.n))}" target="_blank" rel="noopener">${esc(f.n)}<small>${esc(f.url || "búsqueda")}</small></a>`).join("")}</div>` : ""}
    <h2 style="margin-top:20px;font-size:12px">INVESTIGA EN FUENTES OFICIALES</h2>
    <div class="st-links" style="margin-top:8px">${links.map(l => `<a href="${esc(l[1])}" target="_blank" rel="noopener">${esc(l[0])}<small>${esc(l[2])}</small></a>`).join("")}</div>
    <div class="nx"><button class="bt" id="si-next">SIGUIENTE ESTACIÓN →</button></div></div>`;
  const re = () => renderSitio(el, ctx);
  ctx.sample().then(sm => { const b = el.querySelector("#si-ai"); if (sm && b){ b.hidden = false; b.onclick = () => investigar(sm); } });
  async function investigar(sm){
    if (sitioUI.busy) return; sitioUI.busy = true; re();
    const prompt = `Eres investigador de historia urbana y ambiental. Lugar del terreno: ${lugar}. Coordenadas: ${L.lat}, ${L.lon}. Proyecto: ${p.nombre} (${ctx.tipo ? ctx.tipo.n : "sin tipología"}).
Responde SOLO con JSON válido, en español, con esta forma:
{"resumen":"150-250 palabras sobre la historia de este lugar y su entorno inmediato","antes":"cómo era esta zona antes de su urbanización (uso de suelo, paisaje, actividades)","eventos":[{"anio":"1896","titulo":"...","detalle":"qué pasó y cómo afecta al terreno","tipo":"urbano|clima|sismo|inundacion|social|economico|ambiental|patrimonio","escala":"local|regional|nacional"}],"fenomenos":[{"n":"...","detalle":"...","frecuencia":"..."}],"fuentes":[{"n":"nombre de la fuente","url":"url de la página principal de la institución o vacío"}]}
Incluye 12 a 25 eventos ordenados por año (fundación, cambios de uso de suelo, obras importantes, sismos relevantes, inundaciones, fenómeno de El Niño, crecimiento urbano, etc.). Si no estás seguro de un dato, dilo en el detalle. No inventes URLs: si no conoces la URL exacta deja "url" vacío.`;
    try { const r = await sm.json(prompt, {modelTier:"default"});
      const evs = (r.eventos || []).map((e, i) => ({id:"e" + Date.now().toString(36) + i, anio:String(e.anio || ""), titulo:e.titulo || "", detalle:e.detalle || "", tipo:e.tipo || "", escala:e.escala || "", v:false}));
      const keep = (s.eventos || []).filter(e => e.v || e.manual);
      await ctx.set("sitio", {...s, resumen:r.resumen || "", antes:r.antes || "", eventos:[...keep, ...evs], fenomenos:r.fenomenos || [], fuentes:r.fuentes || [], ok:false, t:Date.now()});
    } catch(e){ ctx.toast(e && e.code === "not_granted" ? "La IA no está habilitada en esta vista" : "No se pudo investigar ahora. Intenta en un momento."); }
    sitioUI.busy = false; re();
  }
  const bind = (sel, fn) => { const b = el.querySelector(sel); if (b) b.onclick = fn; };
  bind("#si-add", () => { sitioUI.add = true; re(); });
  bind("#si-x", () => { sitioUI.add = false; re(); });
  bind("#si-ok", () => { const t = el.querySelector("#si-t").value.trim(); if (!t) return ctx.toast("Escribe el título"); const e = {id:"m" + Date.now().toString(36), anio:el.querySelector("#si-y").value.trim(), titulo:t, detalle:el.querySelector("#si-d").value.trim(), tipo:"manual", v:true, manual:true}; ctx.set("sitio", {...s, eventos:[...(s.eventos || []), e]}); sitioUI.add = false; re(); });
  bind("#si-cok", () => { ctx.set("sitio", {...s, ok:true}); re(); });
  bind("#si-next", () => ctx.next());
  el.querySelectorAll("[data-e]").forEach(c => { const id = c.dataset.e;
    const v = c.querySelector("[data-v]"); if (v) v.onclick = () => { ctx.set("sitio", {...s, eventos:(s.eventos || []).map(e => e.id === id ? {...e, v:true} : e)}); re(); };
    c.querySelector("[data-del]").onclick = () => { ctx.set("sitio", {...s, eventos:(s.eventos || []).filter(e => e.id !== id)}); re(); }; });
}

/* ====================================================================== */
/* TESIS · CAPÍTULOS 1–12 (se llena con lo que ya hiciste)                 */
/* ====================================================================== */
const tesisUI = {cap:1, open:{}, busy:{}};
const CAPS = ["Introducción","Marco referencial","Marco metodológico","Casos análogos","Análisis del sitio","Factibilidad","Programación del proyecto","Anteproyecto","Propuesta arquitectónica","Memoria técnica","Conclusiones y recomendaciones","Bibliografía y anexos"];
function tesisItems(){
  const IDX = (window.DION_MOD && DION_MOD.arranque && DION_MOD.arranque._paths) ? DION_MOD.arranque._paths.INDICE : [];
  const out = [];
  IDX.forEach(path => { const m = path.match(/^CAPITULO (\d+)\./); if (!m) return; const parts = path.split("/"); const last = parts[parts.length - 1];
    let num = (last.match(/^([\d.]+)\.?\s/) || [])[1] || ""; let t = last.replace(/^[\d.]+\.?\s*/, "");
    if (/^\d\d\.\s/.test(last)){ const p2 = parts[parts.length - 2]; num = (p2.match(/^([\d.]+)\./) || [])[1] + "." + last.slice(0, 2); t = "Certificación " + last.slice(4); }
    num = num.replace(/\.$/, ""); out.push({id:"t" + num.replace(/\./g, "_"), num, t, cap:+m[1]}); });
  return out;
}
function evidencia(it, p){
  const m = p.mods || {}, L = p.loc || {}, n = p.norm, E = [], miss = [], A = (t, open) => E.push({t, open}), F = (t, open) => miss.push({t, open});
  const pre = it.num, sw = x => pre === x || pre.startsWith(x + ".");
  const si = m.sitio || {}, fu = m.fundamentos || {}, es = p.estilos || [];
  if (sw("1.1") || sw("1.2") || sw("5.4")){ if ((si.eventos || []).length) A(`${si.eventos.length} eventos históricos del sitio (${si.eventos.filter(e => e.v).length} verificados)`, "sitio"); else F("Falta la historia del sitio", "sitio"); }
  if (sw("1.3") || sw("5.2")){ if (p.terreno && p.terreno.utm){ const u = p.terreno.utm; A(`${[L.canton, L.provincia, L.pais].filter(Boolean).join(", ")} · ${(+L.lat).toFixed(6)}, ${(+L.lon).toFixed(6)} · UTM ${u.zone}${u.south ? "S" : "N"} E ${(+u.E0).toFixed(1)} N ${(+u.N0).toFixed(1)} · ${p.terreno.area.toFixed(1)} m², ${p.terreno.per.toFixed(1)} m de perímetro`, "terreno"); } else F("Traza el terreno en el planeta", "terreno"); }
  if (sw("2.1") || sw("2.2") || sw("8.1")){ if ((fu.elegidos || []).length) A(`Lenguaje formal: ${fu.elegidos.length} conceptos de Fundamentos`, "fundamentos"); else F("Elige conceptos en Fundamentos del diseño", "fundamentos"); }
  if (sw("2.2") || sw("8.2")){ if (es.length) A(`Estilos elegidos: ${es.length}${p.estiloPrincipal ? " (principal definido)" : ""}`, "estilos"); else F("Elige estilos en el Contexto 3", "estilos"); }
  if (sw("2.4") || sw("8.11")){ if (n) A(`COS ${n.cos ?? "—"} · CUS ${n.cus ?? "—"} · CAS ${n.cas ?? "—"}${p.terreno ? ` → huella ${(n.cos*p.terreno.area || 0).toFixed(0)} m², construible ${(n.cus*p.terreno.area || 0).toFixed(0)} m²` : ""}`, "normas"); else F("Define COS/CUS/CAS en Normas", "normas"); }
  if (sw("5") && !sw("5.2") && !sw("5.4")) A("Análisis en A.S. (sol, sombras, viento, temperatura…)", "as");
  if (sw("5.14")) A("Zona sísmica y suelo en la sala Estructura", "estructura");
  if (sw("6.1") || sw("10.4") || sw("10.5")){ if (has(m.costos)) A("Presupuesto paramétrico y curva S en Costos", "costos"); else F("Calcula el presupuesto en Costos", "costos"); }
  if (sw("6.4") || sw("10.6")) A("Certificaciones marcadas en Normas", "normas");
  if (sw("7.5") || sw("8.3") || sw("8.7") || sw("8.8") || sw("8.9") || sw("8.10") || sw("8.13")) A("Programa, matriz, burbujas y zonificación en M.E.Z.", "mez");
  if (sw("8.4") || sw("9.6")){ const b = ((m.dibujo || {}).bocetos || []).length; if (b) A(`${b} bocetos en la sala de Dibujo`, "dibujo"); else F("Sube tus bocetos de Trace", "dibujo"); }
  if (sw("9")) A("Documentación en Revit con el puente DION", "revit");
  if (sw("10.1")){ if (has(m.materiales)) A("Materiales y sistema constructivo elegidos", "materiales"); else F("Elige materiales y sistema", "materiales"); }
  if (sw("10.2")) A("Prediseño estructural", "estructura");
  if (sw("10.3")) A("Prediseño de instalaciones y tecnología", "instalaciones");
  if (sw("4")){ const c = ((m.tesis || {}).casos || []); if (c.length) A(`${c.length} casos análogos propuestos (por verificar)`, null); }
  return {E, miss};
}
const OPEN_LBL = {sitio:"Contexto 2", terreno:"Terreno", fundamentos:"Fundamentos", estilos:"Estilos", normas:"Normas", as:"A.S.", mez:"M.E.Z.", estructura:"Estructura", instalaciones:"Instalaciones", costos:"Costos", dibujo:"Dibujo", revit:"Revit", materiales:"Materiales"};
function resumenProyecto(p){
  const m = p.mods || {}, L = p.loc || {}, t = D().BYID[p.tipo], n = p.norm || {};
  return [`Proyecto: ${p.nombre} (${t ? t.n + " · " + t.catn : "tipología no definida"})`, `Ubicación: ${[L.parroquia, L.canton, L.provincia, L.pais].filter(Boolean).join(", ")} (${L.lat}, ${L.lon})`,
    p.terreno ? `Terreno: ${p.terreno.area.toFixed(0)} m²` : "", n.cos != null ? `Normas: COS ${n.cos}, CUS ${n.cus}, CAS ${n.cas}, altura ${n.altura || "—"} m` : "",
    (m.sitio || {}).resumen ? "Historia del sitio: " + m.sitio.resumen.slice(0, 900) : "", (p.estilos || []).length ? "Estilos elegidos (ids): " + p.estilos.join(", ") : "",
    (m.fundamentos || {}).resumen ? "Lenguaje formal: " + String(m.fundamentos.resumen).slice(0, 600) : ""].filter(Boolean).join("\n");
}
function renderTesis(el, ctx){
  const p = ctx.P, T = (p.mods || {}).tesis || {}, IT = T.items || {}, items = tesisItems(), ui = tesisUI;
  const capItems = c => items.filter(i => i.cap === c);
  const cp = c => { const L = capItems(c); return L.length ? Math.round(L.filter(i => (IT[i.id] || {}).st === "ok").length/L.length*100) : 0; };
  const list = capItems(ui.cap);
  el.innerHTML = `<div class="dz"><h2>DISEÑO ARQUITECTÓNICO · <em>CAPÍTULOS 1–12</em></h2>
    <p class="lead">Cada ítem muestra lo que ya produjiste en las estaciones anteriores (en verde) y lo que falta (en rojo). Toca un ítem para escribir o pedir un borrador; márcalo ✓ cuando esté listo.</p>
    <div class="ts-wrap"><nav class="ts-nav">${CAPS.map((c, i) => `<button data-c="${i + 1}" aria-pressed="${ui.cap === i + 1}"><span class="ring" style="--p:${cp(i + 1)}"><b>${cp(i + 1)}</b></span><span><b class="mono" style="font-size:10px;color:var(--acc)">CAP ${i + 1}</b><br>${esc(c)}</span></button>`).join("")}</nav>
    <div>
      ${ui.cap === 4 ? `<div class="card" style="margin-bottom:10px"><div class="row" style="justify-content:space-between"><b>Casos análogos (5 nacionales + 5 internacionales)</b><button class="bt" id="ts-casos" hidden>${ui.busy.casos ? "Buscando…" : "Proponer con IA"}</button></div>${(T.casos || []).length ? `<div class="st-links" style="margin-top:10px">${T.casos.map(c => `<a href="https://www.google.com/search?q=${encodeURIComponent(c.n + " " + (c.autor || "") + " " + (c.ciudad || ""))}" target="_blank" rel="noopener">${esc(c.n)}<small>${esc([c.autor, c.ciudad, c.anio, c.escala].filter(Boolean).join(" · "))} · por verificar</small></a>`).join("")}</div>` : ""}</div>` : ""}
      ${list.map(it => { const s = IT[it.id] || {}, ev = evidencia(it, p), o = ui.open[it.id]; return `<div class="ts-item ${s.st === "ok" ? "ok" : ""}" data-it="${it.id}">
        <header data-tg><code>${esc(it.num)}</code><b>${esc(it.t)}</b>${s.txt ? `<span class="tag ${s.ia && !s.rev ? "w" : "c"}">${s.ia && !s.rev ? "BORRADOR IA" : "TEXTO"}</span>` : ""}<span class="mt-st"><button class="o" data-ok aria-pressed="${s.st === "ok"}" title="Listo">✓</button></span></header>
        ${ev.E.length || ev.miss.length ? `<div class="ts-ev">${ev.E.map(e => `<span class="chip">${esc(e.t)}${e.open ? `<button data-open="${e.open}">abrir ${esc(OPEN_LBL[e.open] || "")}</button>` : ""}</span>`).join("")}${ev.miss.map(e => `<span class="chip e">${esc(e.t)}<button data-open="${e.open}">ir</button></span>`).join("")}</div>` : ""}
        ${o ? `<div class="ts-body"><textarea data-txt placeholder="Redacta aquí (o pide un borrador a la IA y edítalo)…">${esc(s.txt || "")}</textarea><div class="row" style="margin-top:8px"><button class="bt" data-ia hidden>${ui.busy[it.id] ? "Redactando…" : "Borrador con IA"}</button>${s.ia && !s.rev ? `<button class="bt" data-rev>Lo revisé</button>` : ""}<button class="bt" data-copy>Copiar</button></div></div>` : ""}</div>`; }).join("")}
      <h2 style="margin:22px 0 4px;font-size:12px">DESGLOSE COMPLETO DEL MIRO · <em>CAPÍTULO ${ui.cap}</em></h2>
      <p class="lead" style="margin-top:4px">Lo que hay que hacer en este capítulo, paso por paso (toca un paso para ver su desglose, lo de Ecuador y el entregable). Se sincroniza con tu Flujo del Atlas.</p>
      ${(() => { const m = MAT("dis"); if (!m){ loadMaterias().then(() => { if (el.isConnected) renderTesis(el, ctx); }); return '<p class="lead">Cargando desglose…</p>'; }
        const f = m.fases[ui.cap - 1]; if (!f) return ""; const st = p.st || {}, nt = p.nt || {}; ui.so = ui.so || {};
        return f.pasos.map(s2 => { const v = st[s2.id] || "", o = ui.so[s2.id]; return `<div class="mt-step ${v}" data-sid="${s2.id}"><div><span class="id">${esc(s2.id)}</span><span class="t" data-stg="${s2.id}">${esc(s2.t)}</span>
          <span class="mt-st"><button class="o" data-ss="ok" aria-pressed="${v === "ok"}" title="Hecho">✓</button><button class="w" data-ss="wip" aria-pressed="${v === "wip"}" title="En curso">◐</button><button class="n" data-ss="na" aria-pressed="${v === "na"}" title="No aplica">⊘</button></span></div>
          ${o ? `<div class="mt-det">${esc(s2.d || "")}${s2.ec ? `<div class="ec"><b>Ecuador:</b> ${esc(s2.ec)}</div>` : ""}${s2.sale ? `<div class="sale"><b>Entregable:</b> ${esc(s2.sale)}</div>` : ""}<textarea data-snt="${s2.id}" placeholder="Notas de este paso…">${esc(nt[s2.id] || "")}</textarea></div>` : ""}</div>`; }).join(""); })()}
      <div class="row" style="margin-top:14px"><button class="bt" id="ts-exp">Exportar tesis (.md)</button></div>
    </div></div>
    <div class="nx"><button class="bt" id="ts-next">SIGUIENTE ESTACIÓN →</button></div></div>`;
  const re = () => { const sc = el.scrollTop; renderTesis(el, ctx); el.scrollTop = sc; };
  const saveIt = (id, o) => { const t2 = (curP().mods || {}).tesis || {}; ctx.set("tesis", {...t2, items:{...(t2.items || {}), [id]:{...((t2.items || {})[id] || {}), ...o}}}); };
  el.querySelectorAll("[data-c]").forEach(b => b.onclick = () => { ui.cap = +b.dataset.c; renderTesis(el, ctx); el.scrollTop = 0; });
  el.querySelectorAll("[data-open]").forEach(b => b.onclick = e => { e.stopPropagation(); openStation(b.dataset.open); });
  ctx.sample().then(sm => { if (!sm) return;
    el.querySelectorAll("[data-ia]").forEach(b => { b.hidden = false; b.onclick = async () => { const id = b.closest("[data-it]").dataset.it, it = items.find(x => x.id === id); if (ui.busy[id]) return; ui.busy[id] = 1; re();
      try { const r = await sm(`Redacta el ítem "${it.num} ${it.t}" del capítulo ${it.cap} (${CAPS[it.cap - 1]}) de una tesis de diseño arquitectónico de la UEES (Ecuador), en español académico, con citas en formato APA 7 solo de fuentes reales que conozcas (si no estás seguro de una cita, marca [verificar]). Extensión: 180-350 palabras, salvo que el ítem pida tablas o listas (entonces usa listas numeradas). Datos del proyecto:\n${resumenProyecto(curP())}`, {modelTier:"default"});
        saveIt(id, {txt:r.text, ia:true, rev:false}); } catch(e){ ctx.toast("No se pudo redactar ahora"); }
      ui.busy[id] = 0; re(); }; });
    const bc = el.querySelector("#ts-casos"); if (bc){ bc.hidden = false; bc.onclick = async () => { if (ui.busy.casos) return; ui.busy.casos = 1; re();
      try { const r = await sm.json(`Propón casos análogos REALES (obras construidas y documentadas) para este proyecto: 5 de Ecuador o la región andina y 5 internacionales. Responde SOLO JSON: {"casos":[{"n":"nombre de la obra","autor":"arquitecto/estudio","ciudad":"ciudad, país","anio":"año","escala":"nacional|internacional","por_que":"1 frase"}]}.\n${resumenProyecto(curP())}`, {modelTier:"default"});
        const t2 = (curP().mods || {}).tesis || {}; ctx.set("tesis", {...t2, casos:r.casos || []}); } catch(e){ ctx.toast("No se pudo consultar ahora"); }
      ui.busy.casos = 0; re(); }; } });
  el.querySelectorAll("[data-it]").forEach(c => { const id = c.dataset.it;
    c.querySelector("[data-tg]").onclick = e => { if (e.target.closest("button")) return; ui.open[id] = !ui.open[id]; re(); };
    c.querySelector("[data-ok]").onclick = e => { e.stopPropagation(); const s = IT[id] || {}; saveIt(id, {st:s.st === "ok" ? "" : "ok"}); re(); };
    const ta = c.querySelector("[data-txt]"); let t; if (ta) ta.oninput = () => { clearTimeout(t); t = setTimeout(() => saveIt(id, {txt:ta.value}), 700); };
    const rv = c.querySelector("[data-rev]"); if (rv) rv.onclick = () => { saveIt(id, {rev:true}); re(); };
    const cpb = c.querySelector("[data-copy]"); if (cpb) cpb.onclick = () => { try { navigator.clipboard.writeText(ta.value); ctx.toast("Copiado"); } catch(e){} }; });
  el.querySelectorAll("[data-stg]").forEach(b => b.onclick = () => { ui.so[b.dataset.stg] = !ui.so[b.dataset.stg]; re(); });
  el.querySelectorAll("[data-ss]").forEach(b => b.onclick = () => { const sid = b.closest("[data-sid]").dataset.sid, v = b.dataset.ss; const s2 = {...(curP().st || {})}; if (s2[sid] === v) delete s2[sid]; else s2[sid] = v; patch(p.id, {st:s2}); re(); });
  { let tt; el.querySelectorAll("[data-snt]").forEach(a => a.oninput = () => { clearTimeout(tt); tt = setTimeout(() => { const n2 = {...(curP().nt || {})}; n2[a.dataset.snt] = a.value; patch(p.id, {nt:n2}); }, 700); }); }
  el.querySelector("#ts-exp").onclick = () => { const P2 = curP(), I2 = (((P2.mods || {}).tesis) || {}).items || {}; let md = `# ${P2.nombre}\n\n`;
    CAPS.forEach((c, i) => { md += `\n## Capítulo ${i + 1}. ${c}\n`; capItems(i + 1).forEach(it => { md += `\n### ${it.num} ${it.t}\n\n${(I2[it.id] || {}).txt || "_(pendiente)_"}\n`; }); });
    ctx.download(`Tesis_${(P2.nombre || "proyecto").replace(/[^\w]+/g, "_")}.md`, md); };
  el.querySelector("#ts-next").onclick = () => ctx.next();
}

/* ====================================================================== */
/* E10 · CODIFICACIÓN Y CARPETA MADRE                                      */
/* ====================================================================== */
function renderCodif(el, ctx){
  const p = ctx.P, c = ctx.get("codif");
  if (!c.visto) ctx.set("codif", {...c, visto:Date.now()});
  el.innerHTML = `<div class="dz"><h2>CODIFICACIÓN BIM · <em>CARPETA MADRE</em></h2>
    <p class="lead">Antes de abrir Revit: defines los códigos de disciplinas, tipos, niveles, materiales, familias y vistas, y creas la carpeta madre (documentación, diseño conceptual, entorno, modelo federado, arquitectura, especialidades, modelo para render, entregables). Es la fase 1 del BIM (ISO 19650 · movilización).</p>
    <div class="st-links">
      <a href="#" data-a="cod"><b>Codificación BIM</b><small>408 códigos en 15 grupos (de tu Miro)</small></a>
      <a href="#" data-a="carp"><b>Estructura de carpetas</b><small>Carpeta madre con tus nombres y el código del proyecto</small></a>
      <a href="#" data-a="arranque"><b>Generador ARCH-CORE</b><small>Matriz avanzada + índice de carpetas (.zip)</small></a>
      <a href="#" data-a="bim"><b>Pasos BIM en paralelo</b><small>ISO 19650: requisitos, CDE, LOD, coordinación</small></a>
    </div>
    <div class="card ${c.listo ? "" : "warnb"}" style="margin-top:14px"><div class="row" style="justify-content:space-between"><span>${c.listo ? "Codificación y carpetas listas para Revit." : "Cuando tengas los códigos y la carpeta madre creados, márcalo."}</span><button class="bt ${c.listo ? "" : "ok"}" id="cd-ok">${c.listo ? "Desmarcar" : "✓ Listo"}</button></div></div>
    <div class="nx"><button class="bt" id="cd-next">SIGUIENTE ESTACIÓN →</button></div></div>`;
  el.querySelectorAll("[data-a]").forEach(a => a.onclick = e => { e.preventDefault(); const k = a.dataset.a;
    if (k === "cod" || k === "carp") D().openTool("bim", {lib:k, open:{id:p.id, page:k}}); else openStation(k); });
  el.querySelector("#cd-ok").onclick = () => { ctx.set("codif", {...ctx.get("codif"), listo:!c.listo}); renderCodif(el, ctx); };
  el.querySelector("#cd-next").onclick = () => ctx.next();
}

/* ====================================================================== */
/* E11 · PUENTE A REVIT (JSON + script de Dynamo para Revit 2027)          */
/* ====================================================================== */
function revitData(p){
  const n = p.norm || {}, t = p.terreno || {}, L = p.loc || {}, A = +t.area || 0, ty = D().BYID[p.tipo];
  let zonas = null; try { const b = JSON.parse(localStorage.getItem("NHIG_BUS_V1") || "{}"); if (b.terreno && b.terreno.dion === p.id) zonas = b.zonas || null; } catch(e){}
  const pisos = +n.pisos || (n.cus && n.cos ? Math.ceil(n.cus/n.cos) : 1), alt = +n.altura || pisos*3.2;
  return {dion:"1.0", generado:new Date().toISOString(), proyecto:p.nombre, codigo:p.codigo || "", cliente:p.cliente || "", tipologia:ty ? ty.n : "",
    ubicacion:{pais:L.pais, provincia:L.provincia, canton:L.canton, parroquia:L.parroquia || "", texto:[L.parroquia, L.canton, L.provincia, L.pais].filter(Boolean).join(", "), lat:+L.lat, lon:+L.lon,
      utm:t.utm ? {zona:t.utm.zone, sur:t.utm.south, E0:t.utm.E0, N0:t.utm.N0} : null, elevacion:0},
    terreno:{area_m2:A, perimetro_m:+t.per || 0, local_m:t.local || [], utm:t.utm ? t.utm.pts : []},
    normativa:{cos:n.cos ?? null, cus:n.cus ?? null, cas:n.cas ?? null, retiro_frontal:n.retF ?? null, retiro_lateral:n.retL ?? null, retiro_posterior:n.retP ?? null, altura_max_m:n.altura ?? null, pisos_max:n.pisos ?? null, verificado:n.verificado || {}},
    calculo:{huella_max_m2:n.cos != null ? +(n.cos*A).toFixed(2) : null, construible_max_m2:n.cus != null ? +(n.cus*A).toFixed(2) : null, permeable_min_m2:n.cas != null ? +(n.cas*A).toFixed(2) : null},
    niveles:Array.from({length:pisos + 1}, (_, i) => ({nombre:i === 0 ? "N+0.00 PB" : (i === pisos ? "Cubierta" : "Piso " + (i + 1)), cota_m:+(i*alt/pisos).toFixed(2)})),
    zonas, estilos:p.estilos || [], materiales:((p.mods || {}).materiales || {}).capas || null};
}
const DYNAMO = `# DION -> Revit 2027 · nodo Python Script (CPython 3) de Dynamo
# IN[0] = ruta del archivo dion_revit.json (usa un nodo File Path)
# Crea: información del proyecto, coordenadas compartidas (UTM), niveles,
# líneas de modelo del terreno, toposólido del lote y la envolvente máxima (masa).
import clr, json
clr.AddReference('RevitAPI'); clr.AddReference('RevitServices')
from Autodesk.Revit.DB import *
from RevitServices.Persistence import DocumentManager
from RevitServices.Transactions import TransactionManager
from System.Collections.Generic import List

doc = DocumentManager.Instance.CurrentDBDocument
with open(IN[0], encoding='utf-8') as f:
    D = json.load(f)
M = 1/0.3048            # metros -> pies
log = []
pts = [XYZ(x*M, y*M, 0) for x, y in D['terreno']['local_m']]

def loop(points, z=0):
    cl = CurveLoop()
    for i in range(len(points)):
        a = points[i]; b = points[(i+1) % len(points)]
        if a.DistanceTo(b) > 0.01:
            cl.Append(Line.CreateBound(XYZ(a.X, a.Y, z), XYZ(b.X, b.Y, z)))
    return cl

TransactionManager.Instance.EnsureInTransaction(doc)
# 1. Información del proyecto
try:
    pi = doc.ProjectInformation
    for bip, val in [(BuiltInParameter.PROJECT_NAME, D['proyecto']), (BuiltInParameter.PROJECT_NUMBER, D.get('codigo','')),
                     (BuiltInParameter.CLIENT_NAME, D.get('cliente','')), (BuiltInParameter.PROJECT_ADDRESS, D['ubicacion']['texto'])]:
        p = pi.get_Parameter(bip)
        if p and not p.IsReadOnly and val: p.Set(val)
    log.append('Información del proyecto: OK')
except Exception as e: log.append('Info proyecto: ' + str(e))
# 2. Coordenadas compartidas: el origen interno = punto (E0, N0) UTM del terreno
try:
    u = D['ubicacion'].get('utm')
    if u:
        loc = doc.ActiveProjectLocation
        loc.SetProjectPosition(XYZ.Zero, ProjectPosition(u['E0']*M, u['N0']*M, 0, 0))
        log.append('Coordenadas compartidas UTM %s%s: OK' % (u['zona'], 'S' if u['sur'] else 'N'))
except Exception as e: log.append('Coordenadas: ' + str(e))
# 3. Niveles
try:
    exist = [l.Name for l in FilteredElementCollector(doc).OfClass(Level)]
    for n in D['niveles']:
        nm = 'DION ' + n['nombre']
        if nm not in exist:
            lv = Level.Create(doc, n['cota_m']*M); lv.Name = nm
    log.append('Niveles: %d' % len(D['niveles']))
except Exception as e: log.append('Niveles: ' + str(e))
# 4. Líneas de modelo del lote
try:
    sp = SketchPlane.Create(doc, Plane.CreateByNormalAndOrigin(XYZ.BasisZ, XYZ.Zero))
    for c in loop(pts):
        doc.Create.NewModelCurve(c, sp)
    log.append('Lote (líneas de modelo): OK')
except Exception as e: log.append('Lote: ' + str(e))
# 5. Toposólido del lote (Revit 2024+)
try:
    tt = FilteredElementCollector(doc).OfClass(ToposolidType).FirstElementId()
    lv0 = FilteredElementCollector(doc).OfClass(Level).FirstElementId()
    Toposolid.Create(doc, List[CurveLoop]([loop(pts)]), tt, lv0)
    log.append('Toposólido: OK')
except Exception as e: log.append('Toposólido: ' + str(e))
# 6. Envolvente máxima (altura máxima normativa) como masa
try:
    h = (D['normativa'].get('altura_max_m') or 0) * M
    if h > 0:
        solid = GeometryCreationUtilities.CreateExtrusionGeometry(List[CurveLoop]([loop(pts)]), XYZ.BasisZ, h)
        ds = DirectShape.CreateElement(doc, ElementId(BuiltInCategory.OST_Mass))
        ds.SetShape(List[GeometryObject]([solid])); ds.Name = 'DION envolvente máxima'
        log.append('Envolvente máxima: %.2f m' % D['normativa']['altura_max_m'])
except Exception as e: log.append('Envolvente: ' + str(e))
TransactionManager.Instance.TransactionTaskDone()
c = D['calculo']
log.append('Huella máx %s m² · Construible máx %s m² · Permeable mín %s m²' % (c['huella_max_m2'], c['construible_max_m2'], c['permeable_min_m2']))
OUT = log
`;
function renderRevit(el, ctx){
  const p = ctx.P, d = revitData(p), r = ctx.get("revit");
  const ok = (c, t) => `<span class="tag ${c ? "g" : "w"}">${c ? "✓" : "FALTA"}</span> ${esc(t)}`;
  el.innerHTML = `<div class="dz"><h2>PUENTE A <em>REVIT 2027</em></h2>
    <p class="lead">Pasa a Revit solo lo que Revit necesita: el terreno con sus coordenadas reales (UTM), la normativa (COS/CUS/CAS, retiros, altura), los niveles y la envolvente máxima. Lo de investigación (capítulo 2, normas escritas, etc.) se queda en DION.</p>
    <div class="card"><div style="display:grid;gap:8px;font-size:13px">
      <div>${ok(p.terreno, `Terreno: ${p.terreno ? p.terreno.area.toFixed(1) + " m², " + (p.terreno.local || []).length + " vértices" : "traza el terreno"}`)}</div>
      <div>${ok(p.terreno && p.terreno.utm, "Coordenadas UTM " + (d.ubicacion.utm ? d.ubicacion.utm.zona + (d.ubicacion.utm.sur ? "S" : "N") : ""))}</div>
      <div>${ok(p.norm, `Normativa: COS ${d.normativa.cos ?? "—"} · CUS ${d.normativa.cus ?? "—"} · CAS ${d.normativa.cas ?? "—"} · altura ${d.normativa.altura_max_m ?? "—"} m`)}</div>
      <div>${ok(d.zonas, "Zonificación de M.E.Z. " + (d.zonas ? "incluida" : "(abre M.E.Z. con este proyecto para incluirla)"))}</div>
      <div>${ok(p.codigo, "Código del proyecto " + (p.codigo || "(genéralo en Arranque)"))}</div></div></div>
    <div class="row" style="margin-top:14px"><button class="bt pri" id="rv-json">⭳ dion_revit.json</button><button class="bt" id="rv-dyn">⭳ Script de Dynamo (.py)</button><button class="bt" id="rv-copy">Copiar script</button></div>
    <div class="card" style="margin-top:14px"><b>Cómo usarlo en Revit 2027</b><ol style="margin:8px 0 0;padding-left:20px;line-height:1.7;font-size:13px;color:#C8D6E6">
      <li>Abre tu plantilla de proyecto (la de 0D11 Plantillas) y guárdala con el nombre codificado.</li>
      <li>Gestionar → Dynamo. Crea: <b>File Path</b> (elige dion_revit.json) → <b>Python Script</b> (motor CPython3, pega el script) → <b>Watch</b>.</li>
      <li>Ejecuta. Se crean información del proyecto, coordenadas compartidas, niveles DION, líneas y toposólido del lote y la masa de envolvente máxima.</li>
      <li>Usa la masa como límite: tu volumen no debe salir de ella; compara áreas por nivel con el construible máximo.</li></ol></div>
    <details class="card" style="margin-top:12px"><summary style="cursor:pointer">Ver script</summary><pre style="white-space:pre-wrap;font-family:var(--f-m);font-size:11px;color:#A9C3D9;max-height:320px;overflow:auto">${esc(DYNAMO)}</pre></details>
    <div class="nx"><button class="bt" id="rv-next">SIGUIENTE ESTACIÓN →</button></div></div>`;
  el.querySelector("#rv-json").onclick = async () => { await ctx.download("dion_revit.json", JSON.stringify(revitData(curP()), null, 2)); ctx.set("revit", {...r, exportado:Date.now()}); };
  el.querySelector("#rv-dyn").onclick = () => ctx.download("DION_a_Revit_Dynamo.py", DYNAMO);
  el.querySelector("#rv-copy").onclick = () => { try { navigator.clipboard.writeText(DYNAMO); ctx.toast("Script copiado"); } catch(e){ ctx.toast("No se pudo copiar"); } };
  el.querySelector("#rv-next").onclick = () => ctx.next();
}

/* ====================================================================== */
/* LÍNEA SAGRADA (estilo Loki / TVA)                                       */
/* ====================================================================== */
const LN = {cam:{x:0, y:0, k:1}, fit:true, hover:null, hits:[], last:0, dirty:true};
const GAP = 260;
/* sub-puntos de cada estación: fases y pasos de las materias del Miro */
const SUBS = {arranque:[["bim",[0]]], codificacion:[["bim",[1]]], leg:[["leg"]], ger:[["ger"]], sitio:[["his",[0,1,2]]], estilos:[["his",[3,4,5]]], normas:[["leg",[1]]],
  fundamentos:[["fun"]], dibujo:[["geo"]], tesis:[["dis"]], as:[["dis",[4]]], mez:[["dis",[6,7]]], revit:[["bim",[2,3]]], estructura:[["tri"],["est"],["res"]], instalaciones:[["ins"]],
  materiales:[["res",[0,3]]], costos:[["bim",[4]]], tecnologia:[["bim",[5]]], mantenimiento:[["bim",[6]],["ins",[6]]]};
function subsOf(k){ const L = SUBS[k]; if (!L) return []; const out = []; L.forEach(([mid, fs]) => { const m = MAT(mid); if (!m) return; m.fases.forEach((f, i) => { if (fs && !fs.includes(i)) return; out.push({mid, fi:i, n:f.n, pasos:f.pasos}); }); }); return out; }
const HCOL = {gen:"#F5B041", ctx:"#38E1FF", dis:"#B6FF3C", bim:"#B07CFF", tec:"#FF8A4C", doc:"#9FD3FF"};
const colOf = r => HCOL[(r.hebra || ["gen"]).find(h => h !== "gen") || "gen"];
const PH_Y = [-70, 70, -128, 128, -186, 186, -244, 244];
function openLinea(){
  const p = curP(); if (!p) return;
  loadMaterias().then(() => { LN.dirty = true; });
  const w = openWin({key:"linea", title:"LÍNEA DEL PROYECTO", sub:p.nombre + " · acerca el zoom a un punto para ver sus sub-puntos", kind:"linea", short:"LÍNEA", rerender:false, render:(b, w) => {
    b.style.overflow = "hidden";
    b.innerHTML = `<canvas style="position:absolute;inset:0;width:100%;height:100%;touch-action:none;cursor:grab"></canvas>
      <div style="position:absolute;right:10px;top:8px;display:flex;gap:6px"><button class="ln-b" data-z="-">−</button><button class="ln-b" data-z="+">+</button><button class="ln-b" data-fit>Dónde voy</button></div>
      <div class="ln-tip" hidden></div>`;
    const cv = b.querySelector("canvas"); w.lncv = cv;
    b.querySelector("[data-fit]").onclick = () => { LN.fit = true; LN.dirty = true; };
    b.querySelectorAll("[data-z]").forEach(x => x.onclick = () => { const r = cv.getBoundingClientRect(); zoomLn(x.dataset.z === "+" ? 1.6 : 1/1.6, r.width/2); });
    lineaInput(cv); let raf, vis = true;
    const loop = now => { raf = requestAnimationFrame(loop); if (w.min || !vis) return; if (now - LN.last < (LN.dirty ? 16 : 70)) return; LN.last = now; LN.dirty = false; drawLinea(cv); };
    raf = requestAnimationFrame(loop);
    const io = new IntersectionObserver(es => { vis = es[0].isIntersecting; }); io.observe(cv);
    showBars(true);
    return () => { cancelAnimationFrame(raf); io.disconnect(); showBars(false); };
  }});
  w.onResize = () => { LN.dirty = true; };
  w.onMin = m => showBars(!m);
  return w;
}
function zoomLn(f, sx){ const C = LN.cam, k = clamp(C.k*f, 120/GAP, 80); C.x = sx - (sx - C.x)*k/C.k; C.k = k; LN.dirty = true; }
function drawLinea(cv){
  const p = curP(), dpr = Math.min(1.75, devicePixelRatio || 1), r = cv.getBoundingClientRect(); if (!r.width || !p) return;
  if (cv.width !== Math.round(r.width*dpr) || cv.height !== Math.round(r.height*dpr)){ cv.width = Math.round(r.width*dpr); cv.height = Math.round(r.height*dpr); }
  const g = cv.getContext("2d"); g.setTransform(dpr, 0, 0, dpr, 0, 0);
  const Wd = r.width, Hd = r.height, t = performance.now(), C = LN.cam, cur = resumeTarget(p);
  if (LN.fit){ C.k = clamp(Wd/(GAP*5.5), 120/GAP, 3); C.x = Wd*.3 - cur.i*GAP*C.k; C.y = Hd/2; LN.fit = false; }
  const k = C.k, X = x => C.x + x*k, cy = C.y, hits = LN.hits = [];
  g.fillStyle = "#04070c"; g.fillRect(0, 0, Wd, Hd);
  g.strokeStyle = "rgba(245,176,65,.04)"; g.lineWidth = 1; const gs = 46; for (let x = ((C.x % gs) + gs) % gs; x < Wd; x += gs){ g.beginPath(); g.moveTo(x, 0); g.lineTo(x, Hd); g.stroke(); }
  const i0 = Math.max(0, Math.floor((-C.x)/(GAP*k)) - 1), i1 = Math.min(RUTA.length - 1, Math.ceil((Wd - C.x)/(GAP*k)) + 1);
  g.lineCap = "round"; g.globalCompositeOperation = "lighter";
  for (let f = 0; f < 8; f++){ const off = (f - 3.5)*1.6, sd = f*1.7; g.beginPath(); for (let sx = -10; sx <= Wd + 10; sx += 8){ const y = cy + off + Math.sin((sx - C.x)/90 + sd + t*.0004)*1.6; sx === -10 ? g.moveTo(sx, y) : g.lineTo(sx, y); } g.strokeStyle = `rgba(255,${180 + f*6},90,.32)`; g.lineWidth = 1; g.stroke(); }
  g.beginPath(); g.moveTo(-10, cy); g.lineTo(Wd + 10, cy); g.strokeStyle = "rgba(255,190,90,.10)"; g.lineWidth = 16; g.stroke();
  g.globalCompositeOperation = "source-over";
  const xCur = X(cur.i*GAP);
  g.strokeStyle = "rgba(182,255,60,.85)"; g.lineWidth = 2.2; g.beginPath(); g.moveTo(Math.max(-10, X(0)), cy + 20); g.lineTo(Math.min(Wd + 10, xCur), cy + 20); g.stroke();
  g.fillStyle = "rgba(182,255,60,.8)"; g.font = "500 9.5px 'JetBrains Mono',monospace"; if (xCur > 60) g.fillText("AVANCE", Math.max(8, X(0)) + 4, cy + 32);
  g.strokeStyle = "rgba(176,124,255,.55)"; g.lineWidth = 1.4; g.setLineDash([6, 5]); g.beginPath(); g.moveTo(-10, cy - 26); g.lineTo(Wd + 10, cy - 26); g.stroke(); g.setLineDash([]);
  g.fillStyle = "rgba(176,124,255,.85)"; g.fillText("BIM EN PARALELO", 8, cy - 32);
  if (MAT("bim")) BIM_EST.forEach((bb, i) => { const st = BYK[bb.en]; if (!st) return; const bx = X(st.i*GAP + 40 + (i % 2)*24); if (bx < -20 || bx > Wd + 20) return; const pr = matProgress(p, "bim", [bb.fase]);
    g.beginPath(); g.arc(bx, cy - 26, 6, 0, 7); g.fillStyle = "#07101a"; g.fill(); g.strokeStyle = "#B07CFF"; g.lineWidth = 2; g.stroke(); if (pr > 0){ g.beginPath(); g.arc(bx, cy - 26, 6, -Math.PI/2, -Math.PI/2 + pr*Math.PI*2); g.strokeStyle = "#fff"; g.stroke(); }
    hits.push({x:bx, y:cy - 26, r:10, go:"bim:" + bb.fase, tip:"BIM · " + bb.n + " · " + Math.round(pr*100) + "%"}); });
  const segPx = GAP*k, showPh = segPx > 300, st = p.st || {};
  if (showPh) for (let i = i0; i <= i1; i++){ const r0 = RUTA[i], subs = subsOf(r0.k); if (!subs.length) continue;
    const xa = X(i*GAP), xb = X((i + 1)*GAP), col = colOf(r0), n = subs.length;
    subs.forEach((sb, j) => { const px = xa + (xb - xa)*(j + 1)/(n + 1), py = cy + PH_Y[j % PH_Y.length]*(n > 6 ? .85 : 1);
      g.strokeStyle = col; g.globalAlpha = .45; g.lineWidth = 1.3; g.beginPath(); g.moveTo(xa, cy); g.bezierCurveTo(xa + (px - xa)*.5, cy, px - (px - xa)*.3, py, px, py); g.bezierCurveTo(px + (xb - px)*.3, py, xb - (xb - px)*.5, cy, xb, cy); g.stroke(); g.globalAlpha = 1;
      const done = sb.pasos.filter(q => st[q.id] === "ok").length, prc = sb.pasos.length ? done/sb.pasos.length : 0;
      g.beginPath(); g.arc(px, py, 8, 0, 7); g.fillStyle = "#07101a"; g.fill(); g.strokeStyle = col; g.lineWidth = 2; g.stroke(); if (prc > 0){ g.beginPath(); g.arc(px, py, 8, -Math.PI/2, -Math.PI/2 + prc*Math.PI*2); g.strokeStyle = "#B6FF3C"; g.lineWidth = 3; g.stroke(); }
      hits.push({x:px, y:py, r:12, go:"fase:" + r0.k + ":" + sb.mid + ":" + sb.fi, tip:sb.n + " · " + done + "/" + sb.pasos.length});
      const phW = (xb - xa)/(n + 1);
      if (phW > 110){ g.font = "500 10.5px 'Chakra Petch',sans-serif"; g.fillStyle = "#D6DEE8"; g.textAlign = "center"; const lbl = sb.n.replace(/^(Fase|Capítulo)\s*/i, ""); const mx = Math.floor(phW/6.5); const txt = lbl.length > mx ? lbl.slice(0, mx - 1) + "…" : lbl; g.lineWidth = 3; g.strokeStyle = "rgba(4,7,12,.9)"; g.strokeText(txt, px, py + (py < cy ? -14 : 22)); g.fillText(txt, px, py + (py < cy ? -14 : 22)); g.textAlign = "left"; }
      const ns = sb.pasos.length, stepW = phW*.9/Math.max(1, ns);
      if (stepW > 9){ const dir = py < cy ? -1 : 1, sy = py + dir*34, sx0 = px - phW*.45;
        g.strokeStyle = col; g.globalAlpha = .35; g.lineWidth = 1; g.beginPath(); g.moveTo(px, py); g.lineTo(sx0, sy); g.lineTo(sx0 + stepW*(ns - 1), sy); g.lineTo(px, py); g.stroke(); g.globalAlpha = 1;
        sb.pasos.forEach((q, m) => { const qx = sx0 + stepW*m, v = st[q.id]; g.beginPath(); g.arc(qx, sy, stepW > 22 ? 4.5 : 3, 0, 7); g.fillStyle = v === "ok" ? "#B6FF3C" : v === "wip" ? "#38E1FF" : v === "na" ? "#333" : "#0b1520"; g.fill(); if (!v){ g.strokeStyle = col; g.lineWidth = 1.2; g.stroke(); }
          hits.push({x:qx, y:sy, r:Math.max(6, Math.min(10, stepW/2)), go:"paso:" + r0.k + ":" + sb.mid + ":" + sb.fi + ":" + q.id, tip:q.id + " · " + q.t});
          if (stepW > 120){ g.save(); g.translate(qx, sy + dir*10); g.rotate(dir*Math.PI/7); g.font = "500 10px 'Chakra Petch',sans-serif"; g.fillStyle = "#AFC0D2"; g.textBaseline = dir > 0 ? "top" : "bottom"; g.fillText(q.t.length > 34 ? q.t.slice(0, 33) + "…" : q.t, 0, 0); g.restore(); } }); }
    });
  }
  for (let i = i0; i <= i1; i++){ const r0 = RUTA[i], cx = X(i*GAP), pr = stProg(p, r0), isC = r0 === cur, R = 13;
    if (isC){ const pulse = (Math.sin(t/260) + 1)/2; g.beginPath(); g.arc(cx, cy, R + 5 + pulse*8, 0, 7); g.strokeStyle = `rgba(182,255,60,${.3 + pulse*.6})`; g.lineWidth = 3; g.stroke(); }
    g.beginPath(); g.arc(cx, cy, R, 0, 7); g.fillStyle = "#06101a"; g.fill(); g.lineWidth = 2.2; g.strokeStyle = (pr > .99 || isC) ? "#B6FF3C" : "rgba(255,190,90,.95)"; g.stroke();
    if (pr > 0 && pr < .99){ g.beginPath(); g.arc(cx, cy, R - 4, -Math.PI/2, -Math.PI/2 + pr*Math.PI*2); g.strokeStyle = "#B6FF3C"; g.lineWidth = 3; g.stroke(); }
    if (pr > .99){ g.fillStyle = "#B6FF3C"; g.beginPath(); g.arc(cx, cy, R - 6, 0, 7); g.fill(); }
    hits.push({x:cx, y:cy, r:18, go:r0.k, tip:r0.c + " · " + r0.n + " · " + Math.round(pr*100) + "%"});
    g.textAlign = "center"; g.font = "600 10.5px 'JetBrains Mono',monospace"; g.fillStyle = isC ? "#B6FF3C" : "#FFC46B"; g.fillText(r0.c, cx, cy - R - 32);
    const lines = []; r0.n.split(" · ").forEach(wd => { let c2 = ""; wd.split(" ").forEach(x => { if ((c2 + " " + x).trim().length > 18 && c2){ lines.push(c2); c2 = x; } else c2 = (c2 + " " + x).trim(); }); if (c2) lines.push(c2); });
    g.font = "600 11.5px 'Chakra Petch',sans-serif"; g.fillStyle = isC ? "#E9FFC4" : "#E4EEFA";
    lines.slice(0, 2).forEach((wd, j) => { const yy = cy + R + 40 + j*13; g.lineWidth = 3; g.strokeStyle = "rgba(4,7,12,.92)"; g.strokeText(wd, cx, yy); g.fillText(wd, cx, yy); });
    if (isC){ g.font = "600 9.5px 'JetBrains Mono',monospace"; g.fillStyle = "#B6FF3C"; g.fillText("ESTÁS AQUÍ", cx, cy - R - 46); }
    g.textAlign = "left"; }
  if (!showPh){ g.font = "500 10.5px 'Chakra Petch',sans-serif"; g.fillStyle = "rgba(200,214,230,.55)"; g.fillText("Acerca el zoom (rueda o pellizco) sobre un punto para ver sus fases y pasos", 10, Hd - 12); }
}
function lineaHit(cv, x, y){ let best = null, bd = 1e9; for (const h of LN.hits){ const d = Math.hypot(h.x - x, h.y - y); if (d < h.r && d < bd){ bd = d; best = h; } } return best; }
function goLinea(go){
  if (go.startsWith("bim:")){ loadMaterias().then(() => { matUI.bim = matUI.bim || {f:0, open:{}}; matUI.bim.f = +go.slice(4); openMateria("bim"); }); return; }
  if (go.startsWith("fase:") || go.startsWith("paso:")){ const [, stk, mid, fi, pid] = go.split(":"); loadMaterias().then(() => {
      if (stk === "tesis"){ tesisUI.cap = +fi + 1; if (pid){ tesisUI.so = tesisUI.so || {}; tesisUI.so[pid] = true; } return openStation("tesis"); }
      matUI[mid] = matUI[mid] || {f:0, open:{}}; matUI[mid].f = +fi; if (pid) matUI[mid].open[pid] = true;
      const r = BYK[stk]; if (r && r.mat === mid) return openMateria(mid, r);
      openMateria(mid, {k:stk, c:(r ? r.c : ""), n:"Pasos · " + (r ? r.n : mid), s:(MAT(mid) || {}).n || ""}); }); return; }
  openStation(go);
}
function lineaInput(cv){
  const pts = new Map(); let moved = 0, pinch = null; const tip = cv.parentNode.querySelector(".ln-tip");
  const loc = e => { const r = cv.getBoundingClientRect(); return [e.clientX - r.left, e.clientY - r.top]; };
  cv.addEventListener("pointerdown", e => { cv.setPointerCapture(e.pointerId); pts.set(e.pointerId, loc(e)); moved = 0; if (pts.size === 2){ const [a, b] = [...pts.values()]; pinch = {d:Math.hypot(a[0] - b[0], a[1] - b[1])}; } });
  cv.addEventListener("pointermove", e => { const q = loc(e);
    if (!pts.has(e.pointerId)){ const h = lineaHit(cv, q[0], q[1]); cv.style.cursor = h ? "pointer" : "grab"; if (h){ tip.hidden = false; tip.textContent = h.tip; tip.style.left = Math.max(4, Math.min(q[0] + 14, cv.clientWidth - 270)) + "px"; tip.style.top = (q[1] + 14) + "px"; } else tip.hidden = true; return; }
    const prev = pts.get(e.pointerId); pts.set(e.pointerId, q);
    if (pts.size === 2 && pinch){ const [a, b] = [...pts.values()], d = Math.hypot(a[0] - b[0], a[1] - b[1]); zoomLn(d/pinch.d, (a[0] + b[0])/2); pinch.d = d; moved = 99; return; }
    LN.cam.x += q[0] - prev[0]; LN.cam.y += q[1] - prev[1]; moved += Math.abs(q[0] - prev[0]) + Math.abs(q[1] - prev[1]); LN.dirty = true; });
  const up = e => { const q = loc(e); const was = pts.size; pts.delete(e.pointerId); if (pts.size < 2) pinch = null;
    if (was === 1 && moved < 6){ const h = lineaHit(cv, q[0], q[1]); if (h) goLinea(h.go); } };
  cv.addEventListener("pointerup", up); cv.addEventListener("pointercancel", up); cv.addEventListener("pointerleave", () => { tip.hidden = true; });
  cv.addEventListener("wheel", e => { e.preventDefault(); const q = loc(e), dy = e.deltaMode === 1 ? e.deltaY*16 : e.deltaY, dx = e.deltaMode === 1 ? e.deltaX*16 : e.deltaX;
    if (e.shiftKey || Math.abs(dx) > Math.abs(dy)){ LN.cam.x -= (e.shiftKey ? dy : dx) || dx; LN.dirty = true; return; }
    zoomLn(Math.exp(-dy*.0016), q[0]); }, {passive:false});
}
/* ---------- barras flotantes de avance (se mueven a cualquier parte, sin fondo) ---------- */
const BARS_LS = "dion-barras";
let barsEl = null;
function showBars(on){
  if (!on){ if (barsEl) barsEl.hidden = true; return; }
  if (!barsEl){ barsEl = document.createElement("div"); barsEl.id = "fbars"; document.body.appendChild(barsEl);
    const pos = lsg(BARS_LS, {});
    HEBRAS.forEach((h, i) => { const d = document.createElement("div"); d.className = "fbar"; d.dataset.h = h.k; const p0 = pos[h.k] || {x:innerWidth - 236, y:120 + i*46}; d.style.left = clamp(p0.x, 0, innerWidth - 60) + "px"; d.style.top = clamp(p0.y, 0, innerHeight - 30) + "px";
      d.innerHTML = `<span class="l" style="color:${h.col}">${h.n}</span><b>0%</b><i><em style="background:${h.col};box-shadow:0 0 10px ${h.col}"></em></i>`;
      d.addEventListener("pointerdown", e => { e.preventDefault(); d.setPointerCapture(e.pointerId); const sx = e.clientX - d.offsetLeft, sy = e.clientY - d.offsetTop; let mv = 0;
        const m = ev => { mv++; d.style.left = clamp(ev.clientX - sx, 0, innerWidth - 60) + "px"; d.style.top = clamp(ev.clientY - sy, 0, innerHeight - 30) + "px"; };
        const u = () => { d.removeEventListener("pointermove", m); d.removeEventListener("pointerup", u); const P = lsg(BARS_LS, {}); P[h.k] = {x:d.offsetLeft, y:d.offsetTop}; lss(BARS_LS, P); if (mv < 3){ MON.open = h.k; openMonitor(); } };
        d.addEventListener("pointermove", m); d.addEventListener("pointerup", u); });
      barsEl.appendChild(d); }); }
  barsEl.hidden = false; updBars();
}
function updBars(){ if (!barsEl || barsEl.hidden) return; const p = curP(); if (!p) return; barsEl.querySelectorAll(".fbar").forEach(d => { const pc = Math.round(hebraProg(p, d.dataset.h)*100); d.querySelector("b").textContent = pc + "%"; const em = d.querySelector("em"); em.style.width = Math.max(2, pc) + "%"; em.classList.toggle("blink", pc > 0 && pc < 100); }); }

/* ====================================================================== */
/* MONITOR DE AVANCE                                                       */
/* ====================================================================== */
const MON = {open:null};
const monCss = document.createElement("style"); monCss.textContent = `
.mon{padding:10px 12px;font-size:12px}
.mon-row{display:block;width:100%;text-align:left;border:0;background:none;padding:6px 0;cursor:pointer}
.mon-row .l{display:flex;justify-content:space-between;font-family:var(--f-m);font-size:10px;letter-spacing:.1em;margin-bottom:5px}
.mon-bar{height:7px;border-radius:4px;background:rgba(255,255,255,.07);overflow:hidden;position:relative}
.mon-bar i{position:absolute;left:0;top:0;bottom:0;border-radius:4px}
.mon-bar i.blink{animation:monb 1.4s ease-in-out infinite}
@keyframes monb{0%,100%{opacity:1}50%{opacity:.35}}
.mon-det{margin:4px 0 8px;padding:6px 8px;border-left:1px solid var(--line2);display:grid;gap:4px}
.mon-det button{display:flex;justify-content:space-between;gap:8px;border:0;background:none;text-align:left;font-size:12px;color:#C8D6E6;padding:4px 2px;min-height:30px;align-items:center}
.mon-det button.skip{color:var(--warn)}
.mon-det button:hover{color:var(--acc)}
.mon-nx{margin-top:8px;width:100%;min-height:40px;border:0;border-radius:8px;background:var(--done);color:#0b1600;font-weight:600;font-size:12.5px}
@media (prefers-reduced-motion:reduce){.mon-bar i.blink{animation:none}}`; document.head.appendChild(monCss);
function openMonitor(){
  const p = curP(); if (!p) return;
  return openWin({key:"monitor", title:"MONITOR DE AVANCE", sub:"", kind:"monitor", short:"AVANCE", rerender:true, render:b => renderMonitor(b)});
}
function renderMonitor(b){
  const p = curP(); if (!p){ b.innerHTML = ""; return; }
  const seen = (p.mods || {})._visto || {}, nxt = resumeTarget(p);
  const maxSeen = Math.max(-1, ...RUTA.filter(r => seen[r.k] || stProg(p, r) > 0).map(r => r.i));
  b.innerHTML = `<div class="mon">${HEBRAS.map(h => { const pr = hebraProg(p, h.k), pc = Math.round(pr*100), list = h.k === "bim" ? BIM_EST.map(x => ({k:"bim:" + x.fase, n:"BIM · " + x.n, pr:matProgress(p, "bim", [x.fase]), skip:false})) : RUTA.filter(r => r.hebra.includes(h.k)).map(r => ({k:r.k, n:r.c + " · " + r.n, pr:stProg(p, r), skip:r.i < maxSeen && stProg(p, r) < .05}));
    return `<button class="mon-row" data-h="${h.k}"><span class="l"><span style="color:${h.col}">${h.n}</span><span>${pc}%</span></span><span class="mon-bar"><i class="${pc < 100 && pc > 0 ? "blink" : ""}" style="width:${Math.max(2, pc)}%;background:${h.col};box-shadow:0 0 10px ${h.col}"></i></span></button>
      ${MON.open === h.k ? `<div class="mon-det">${list.map(x => `<button class="${x.skip ? "skip" : ""}" data-go="${x.k}"><span>${esc(x.n)}${x.skip ? " · saltado" : ""}</span><span class="mono">${Math.round(x.pr*100)}%</span></button>`).join("")}</div>` : ""}`; }).join("")}
    <button class="mon-nx" data-go="${nxt.k}">Continuar: ${esc(nxt.c + " · " + nxt.n)} →</button></div>`;
  b.querySelectorAll("[data-h]").forEach(x => x.onclick = () => { MON.open = MON.open === x.dataset.h ? null : x.dataset.h; renderMonitor(b); });
  b.querySelectorAll("[data-go]").forEach(x => x.onclick = () => { const k = x.dataset.go; if (k.startsWith("bim:")){ loadMaterias().then(() => { matUI.bim = matUI.bim || {f:0, open:{}}; matUI.bim.f = +k.slice(4); openMateria("bim"); }); } else openStation(k); });
}

/* ====================================================================== */
/* REFRESCO EN VIVO (cuando el proyecto cambia)                            */
/* ====================================================================== */
let liveT = null;
function refreshLive(){ clearTimeout(liveT); liveT = setTimeout(() => {
  if (W.monitor && !W.monitor.min) renderMonitor(W.monitor.body); updBars(); LN.dirty = true; bridgeNotify();
  Object.values(W).forEach(w => { if (w.refresh && !w.min && !w.el.contains(document.activeElement)) { try { w.refresh(); } catch(e){} } });
  const p = curP(); if (W.linea && p) W.linea.el.querySelector(".win-h span").textContent = p.nombre + " · todo conectado";
}, 120); }

/* ====================================================================== */
/* HERRAMIENTAS EN VENTANA (Atlas, A.S., M.E.Z., Hub)                      */
/* ====================================================================== */
function openToolWin(k, opts){ return D().openTool(k, opts); }


/* ====================================================================== */
/* TALLER DE HERRAMIENTAS: agregar o mejorar herramientas sin tocar el código */
/* ====================================================================== */
const REG_LS = "dion-modulos";
let REG = lsg(REG_LS, []), regLoaded = false;
const OVR = {};                       // anulaciones: clave → entrada del registro
const BUILTIN_TOOLS = {"as.html":"A.S. · análisis de sitio", "mez.html":"M.E.Z.", "atlas.html":"Atlas / Flujo / Clientes"};
async function loadReg(){
  try { const db = D().db; if (db){ const d = await db.doc("ajustes/modulos").get(); const v = d && (d.data ? d.data() : d); if (v && Array.isArray(v.lista)) REG = v.lista; } } catch(e){}
  regLoaded = true; lss(REG_LS, REG); applyReg();
}
async function saveReg(){ lss(REG_LS, REG); try { const db = D().db; if (db) await db.doc("ajustes/modulos").set({lista:REG, t:Date.now()}); } catch(e){ D().toast("El registro se guardó solo en este dispositivo"); } applyReg(); }
async function regCode(e){ if (e.code) return e.code; if (e.url){ const r = await fetch(e.url); return await r.text(); } return ""; }
const ORIG_RUTA = RUTA.slice();
function applyReg(){
  Object.keys(OVR).forEach(k => delete OVR[k]);
  // ruta: quitar estaciones personalizadas y volver a insertar
  RUTA.length = 0; ORIG_RUTA.forEach(r => RUTA.push(r));
  REG.forEach(e => {
    if (BYK[e.k] && BYK[e.k].custom !== true && !e.nueva){ OVR[e.k] = e; return; }   // mejora de una sala existente
    if (e.tool){ OVR["tool:" + e.tool] = e; return; }                                   // mejora de A.S./M.E.Z./Hub
    if (e.after){ const i = RUTA.findIndex(r => r.k === e.after); const st = {k:e.k, n:e.n, s:e.s || "Herramienta propia", hebra:["gen"], custom:true, prog:p => has((p.mods || {})[e.k]) ? .6 : (((p.mods || {})._visto || {})[e.k] ? .3 : 0)};
      if (i >= 0) RUTA.splice(i + 1, 0, st); else RUTA.push(st); }
  });
  RUTA.forEach((r, i) => { r.i = i; r.c = "E" + i; }); Object.keys(BYK).forEach(k => delete BYK[k]); RUTA.forEach(r => BYK[r.k] = r);
  // bolitas propias en el menú
  const nav = document.querySelector(".orbs"); if (nav){ nav.querySelectorAll("[data-custom]").forEach(b => b.remove());
    REG.filter(e => e.bolita).forEach(e => { const b = document.createElement("button"); b.className = "orbtn"; b.dataset.custom = e.k; b.innerHTML = esc((e.short || e.n).slice(0, 4).toUpperCase()) + `<span class="tip">${esc(e.n)}</span>`; b.onclick = () => openCustom(e); nav.appendChild(b); }); }
  refreshLive();
}
async function openCustom(e){
  const p = curP();
  if (e.kind === "html"){ const html = await regCode(e); return openWin({key:"cu:" + e.k, title:e.n.toUpperCase(), sub:e.s || "Herramienta propia", kind:"tool", short:(e.short || e.n).slice(0, 4), rerender:false, render:b => { b.style.overflow = "hidden"; const f = document.createElement("iframe"); f.srcdoc = html; f.title = e.n; b.appendChild(f); }}); }
  if (!p) return D().toast("Abre o crea un proyecto primero");
  return openStation(e.k);
}
async function loadCustomModule(e){
  if (e.url && !e.code){ await loadScript(e.url + (e.url.includes("?") ? "&" : "?") + "v=" + (e.v || 1)); return; }
  const code = await regCode(e); const u = URL.createObjectURL(new Blob([code], {type:"text/javascript"})); await loadScript(u);
}
function slugK(s){ return nrm(s).replace(/[^a-z0-9]+/g, "_").replace(/^_|_$/g, "").slice(0, 24) || "herramienta"; }
const TPL_JS = `/* Plantilla de herramienta para DION (copia, cambia la CLAVE y escribe tu herramienta).
   Reglas: JS plano, sin dependencias. Debe registrar window.DION_MOD[CLAVE] = {titulo, sub, render(el, ctx)}.
   ctx.P (proyecto), ctx.area, ctx.clima, ctx.tipo, ctx.get(clave), ctx.set(clave, obj), ctx.setP(patch),
   ctx.toast(msg), ctx.esc(s), ctx.sample() (IA), ctx.upload(files), ctx.download(nombre, datos), ctx.next(), ctx.open(clave) */
(function(){
  const CLAVE = "mi_herramienta";
  window.DION_MOD = window.DION_MOD || {};
  const CSS = \`.m-\${CLAVE}{padding:18px;color:var(--ink);font-family:var(--f-b)}
  .m-\${CLAVE} h2{font-family:var(--f-d);font-weight:400;letter-spacing:.16em;color:var(--acc);font-size:15px}
  .m-\${CLAVE} button{min-height:40px;border:1px solid var(--line2);background:rgba(255,255,255,.03);border-radius:8px;padding:8px 14px;color:var(--ink)}\`;
  DION_MOD[CLAVE] = {
    titulo: "Mi herramienta", sub: "Descripción corta",
    render(el, ctx){
      if (!document.getElementById("mod-" + CLAVE + "-css")){ const s = document.createElement("style"); s.id = "mod-" + CLAVE + "-css"; s.textContent = CSS; document.head.appendChild(s); }
      const st = ctx.get(CLAVE); const P = ctx.P;
      el.innerHTML = \`<div class="m-\${CLAVE}"><h2>MI HERRAMIENTA</h2>
        <p>Proyecto: \${ctx.esc(P.nombre)} · terreno \${ctx.area.toFixed(0)} m²</p>
        <p>Veces usada: \${st.n || 0}</p><button id="b1">Sumar</button> <button id="nx">Siguiente estación →</button></div>\`;
      el.querySelector("#b1").onclick = () => { ctx.set(CLAVE, {...st, n:(st.n || 0) + 1}); this.render(el, ctx); };
      el.querySelector("#nx").onclick = () => ctx.next();
    }
  };
})();
`;
const TPL_HTML = `<!doctype html><html lang="es"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>Mi herramienta</title><style>body{margin:0;background:#03060B;color:#E4EEFA;font-family:system-ui;padding:18px}h1{color:#38E1FF;letter-spacing:.14em;font-size:16px}</style></head>
<body><h1>MI HERRAMIENTA (HTML)</h1><p>Esta herramienta se abre como ventana dentro de DION. Puede leer el proyecto activo así:</p>
<pre id="o"></pre>
<script>
  // El proyecto activo de DION (solo lectura):
  try { const D = window.parent.DION; const p = D.P.find(x => x.id === D.active); document.getElementById("o").textContent = p ? p.nombre + " · " + (p.terreno ? p.terreno.area.toFixed(0) + " m²" : "sin terreno") : "Sin proyecto activo"; } catch(e){}
</script></body></html>
`;
const IA_MD = () => `# Cómo crear o mejorar herramientas de DION con otra IA (Gemini, ChatGPT…)

Pega este texto completo en la otra IA y luego describe la herramienta que quieres.

## Qué es DION
App web de un solo archivo para un estudiante de arquitectura en Ecuador. Cada sala/herramienta es un archivo independiente que se sube desde DION → Taller de herramientas. No hay build ni librerías: JavaScript plano.

## Opción A · Herramienta JS (recomendada: se integra con el proyecto)
Debe registrar \`window.DION_MOD[CLAVE] = { titulo, sub, render(el, ctx) }\`.
- \`render\` pinta dentro de \`el\` (vacío, ocupa toda la ventana) y puede llamarse varias veces: vacía y repinta.
- CSS: inyecta UNA vez un <style id="mod-CLAVE-css">; todas las clases empiezan con m-CLAVE-.
- Usa las variables CSS: --bg --panel --line --line2 --ink --muted --faint --acc (#38E1FF) --done (#B6FF3C) --warn (#FF5C7A) --f-d (títulos) --f-b (texto) --f-m (números).
- ctx: P (proyecto: nombre, tipo, loc{pais,provincia,canton,parroquia,lat,lon}, terreno{area,per,local[[x,y]],geo}, norm{cos,cus,cas,...}, estilos, mods), area, clima{zona,tipo,elev}, tipo{n,cat{c,n}}, get(clave), set(clave,obj), setP(patch), toast(msg), esc(s), sample() (IA: s.json(prompt)), upload(files)→[{id,url}], download(nombre,datos), next(), open(clave).
- Sin red ni librerías externas (excepto three.js de cdnjs si hace falta 3D).
- Estética: futurista holográfica oscura, táctil (botones ≥40 px), funciona en celular e iPad.
- Valores calculados: etiqueta "PREDISEÑO" y "POR VERIFICAR" hasta que el usuario confirme.

## Opción B · Herramienta HTML (independiente)
Un archivo .html completo. Se abre en una ventana de DION. Puede leer el proyecto con \`window.parent.DION\` (P, active).

## Mejorar una sala existente
En DION → Taller → "Mejorar una sala existente" descarga su código, pásaselo a la IA con este documento y pide los cambios. Sube el archivo mejorado en la misma sala: reemplaza a la original (puedes restaurarla).

## Plantillas
Ver los archivos Plantilla_herramienta.js y Plantilla_herramienta.html que descargaste junto con este documento.
`;
const tallerUI = {msg:""};
function openTaller(){
  return openWin({key:"taller", title:"TALLER DE HERRAMIENTAS", sub:"Agrega o mejora herramientas sin gastar tokens aquí", kind:"station", short:"TLR", render:b => renderTaller(b)});
}
function renderTaller(el){
  const stations = ORIG_RUTA.filter(r => r.k !== "terreno");
  el.innerHTML = `<div class="dz"><h2>TALLER DE <em>HERRAMIENTAS</em></h2>
    <p class="lead">1) Descarga la plantilla y las instrucciones. 2) Pídele a otra IA (Gemini) que escriba o mejore la herramienta con esas instrucciones. 3) Súbela aquí: aparece como bolita del menú y/o como estación de la ruta, y queda guardada en DION.</p>
    <div class="row"><button class="bt" data-dl="md">⭳ Instrucciones para la IA (.md)</button><button class="bt" data-dl="js">⭳ Plantilla JS</button><button class="bt" data-dl="html">⭳ Plantilla HTML</button></div>
    <h2 style="margin-top:22px;font-size:12px">TUS HERRAMIENTAS (${REG.length})</h2>
    <div style="display:grid;gap:8px;margin-top:8px">${REG.length ? REG.map((e, i) => `<div class="card"><div class="row" style="justify-content:space-between"><div><b>${esc(e.n)}</b> <span class="tag">${e.kind.toUpperCase()}</span> <span class="tag c">v${e.v || 1}</span>${e.tool ? ` <span class="tag w">MEJORA DE ${esc(BUILTIN_TOOLS[e.tool] || e.tool)}</span>` : OVR[e.k] ? ` <span class="tag w">MEJORA DE LA SALA ${esc((BYK[e.k] || {}).n || e.k)}</span>` : ""}<br><small style="color:var(--muted)">clave ${esc(e.k)}${e.bolita ? " · bolita" : ""}${e.after ? " · en la ruta después de " + esc((BYK[e.after] || {}).n || e.after) : ""} · ${new Date(e.t || Date.now()).toLocaleDateString()}</small></div>
      <div class="row">${e.tool ? "" : `<button class="bt" data-op="open" data-i="${i}">Abrir</button>`}<label class="bt" style="cursor:pointer">Actualizar archivo<input type="file" accept=".js,.html,.htm,.txt" data-op="upd" data-i="${i}" hidden></label><button class="bt" data-op="get" data-i="${i}">Descargar</button><button class="bt warn" data-op="del" data-i="${i}">Quitar</button></div></div></div>`).join("") : `<div class="card" style="color:var(--muted)">Aún no agregaste herramientas.</div>`}</div>
    <h2 style="margin-top:22px;font-size:12px">AGREGAR HERRAMIENTA NUEVA</h2>
    <div class="card" style="display:grid;gap:10px;margin-top:8px">
      <div class="row"><input type="text" id="tl-n" placeholder="Nombre (ej. Análisis acústico)" style="flex:2;min-width:200px"><input type="text" id="tl-s" placeholder="Corto (3–4 letras)" style="flex:1;min-width:110px;max-width:160px"></div>
      <label class="row" style="gap:8px"><input type="checkbox" id="tl-b" checked style="width:22px;height:22px"> Bolita en el menú de la izquierda</label>
      <label class="row" style="gap:8px">En la ruta del proyecto, después de: <select id="tl-a" style="min-height:40px;background:#07101a;border:1px solid var(--line2);border-radius:8px;padding:6px;color:var(--ink)"><option value="">(no agregar a la ruta)</option>${stations.map(r => `<option value="${r.k}">${esc(r.c + " · " + r.n)}</option>`).join("")}</select></label>
      <label class="bt pri" style="cursor:pointer;text-align:center">Elegir archivo (.js o .html) e instalar<input type="file" id="tl-f" accept=".js,.html,.htm" hidden></label>
      ${tallerUI.msg ? `<p class="lead" style="margin:0;color:var(--done)">${esc(tallerUI.msg)}</p>` : ""}</div>
    <h2 style="margin-top:22px;font-size:12px">MEJORAR UNA SALA O HERRAMIENTA EXISTENTE</h2>
    <div class="card" style="display:grid;gap:10px;margin-top:8px"><p class="lead" style="margin:0">Descarga su código, pásaselo a la otra IA con las instrucciones y sube aquí la versión mejorada: reemplaza a la original y la puedes restaurar cuando quieras (botón Quitar).</p>
      <div class="row"><select id="tl-x" style="min-height:40px;background:#07101a;border:1px solid var(--line2);border-radius:8px;padding:6px;color:var(--ink);flex:1;min-width:220px">${Object.keys(MODFILE).map(k => `<option value="m:${k}">Sala · ${esc((BYK[k] || {}).n || k)}</option>`).join("")}${Object.keys(BUILTIN_TOOLS).filter(f => f !== "atlas.html").map(f => `<option value="t:${f}">Herramienta · ${esc(BUILTIN_TOOLS[f])}</option>`).join("")}</select>
      <button class="bt" id="tl-xd">⭳ Descargar código</button><label class="bt ok" style="cursor:pointer">⭱ Subir versión mejorada<input type="file" id="tl-xu" accept=".js,.html,.htm" hidden></label></div></div>
    ${backupHTML()}
  </div>`; bindBackup(el);
  const dl = (n, t) => download(n, t);
  el.querySelectorAll("[data-dl]").forEach(b => b.onclick = () => { const k = b.dataset.dl; if (k === "md") dl("INSTRUCCIONES_PARA_IA_DION.md", IA_MD()); if (k === "js") dl("Plantilla_herramienta.js", TPL_JS); if (k === "html") dl("Plantilla_herramienta.html", TPL_HTML); });
  async function store(file, e){
    const kind = /\.html?$/i.test(file.name) ? "html" : "js"; const text = await file.text();
    if (kind === "js" && !/DION_MOD/.test(text)) { D().toast("El archivo JS no registra window.DION_MOD: revisa la plantilla"); return null; }
    let key = e.k; if (kind === "js"){ const m = text.match(/DION_MOD\s*(?:\.\s*([A-Za-z_]\w*)|\[\s*["']([^"']+)["']\s*\])/); const m2 = text.match(/CLAVE\s*=\s*["']([^"']+)["']/); const found = (m2 && m2[1]) || (m && (m[1] || m[2])); if (found && !e.tool) key = found; }
    const out = {...e, k:key, kind, v:(e.v || 0) + 1, t:Date.now(), fname:file.name};
    let up = null; try { const a = await getAssets(); if (a){ const r = await a.upload(new Blob([text], {type:kind === "js" ? "text/javascript" : "text/plain"})); up = r; } } catch(err){}
    if (up){ out.url = up.url; out.asset = up.id; delete out.code; } else { out.code = text; delete out.url; }
    return out;
  }
  const f = el.querySelector("#tl-f"); f.onchange = async () => { const file = f.files[0]; f.value = ""; if (!file) return;
    const n = el.querySelector("#tl-n").value.trim() || file.name.replace(/\.\w+$/, ""), sh = el.querySelector("#tl-s").value.trim() || n.slice(0, 3);
    const e = await store(file, {k:slugK(n), n, short:sh, bolita:el.querySelector("#tl-b").checked, after:el.querySelector("#tl-a").value || null, nueva:true}); if (!e) return;
    if (BYK[e.k] && !BYK[e.k].custom) e.k = e.k + "_p";
    REG = REG.filter(x => x.k !== e.k).concat([e]); await saveReg(); tallerUI.msg = `«${e.n}» instalada.`; renderTaller(el); };
  el.querySelectorAll("[data-op]").forEach(b => { const i = +b.dataset.i, e = REG[i], op = b.dataset.op;
    if (op === "upd") b.onchange = async () => { const file = b.files[0]; if (!file) return; const n = await store(file, e); if (!n) return; if (e.tool || OVR[e.k]) n.k = e.k; REG[i] = n; await saveReg(); tallerUI.msg = `«${e.n}» actualizada a v${n.v}.`; renderTaller(el); };
    else b.onclick = async () => {
      if (op === "open") return openCustom(e);
      if (op === "get") return dl(e.fname || (e.k + (e.kind === "html" ? ".html" : ".js")), await regCode(e));
      if (op === "del"){ try { const a = await getAssets(); if (a && e.asset) await a.delete(e.asset); } catch(err){} REG.splice(i, 1); await saveReg(); tallerUI.msg = "Quitada. Si era una mejora, vuelve la versión original."; renderTaller(el); } }; });
  el.querySelector("#tl-xd").onclick = async () => { const v = el.querySelector("#tl-x").value, [t, k] = [v.slice(0, 1), v.slice(2)];
    const ov = t === "m" ? OVR[k] : OVR["tool:" + k];
    try { const txt = ov ? await regCode(ov) : await (await fetch(t === "m" ? MODFILE[k] : k)).text(); dl(t === "m" ? MODFILE[k].split("/").pop() : k, txt); } catch(err){ D().toast("No se pudo descargar"); } };
  const xu = el.querySelector("#tl-xu"); xu.onchange = async () => { const file = xu.files[0]; xu.value = ""; if (!file) return; const v = el.querySelector("#tl-x").value, t = v.slice(0, 1), k = v.slice(2);
    const base = t === "m" ? {k, n:"Mejora · " + ((BYK[k] || {}).n || k), short:"", bolita:false} : {k:"tool_" + slugK(k), tool:k, n:"Mejora · " + BUILTIN_TOOLS[k], bolita:false};
    const e = await store(file, base); if (!e) return; if (t === "m") e.k = k;
    if (t === "m" && e.kind !== "js"){ D().toast("Para una sala sube un archivo .js"); return; }
    REG = REG.filter(x => !(t === "m" ? (x.k === k && !x.nueva) : x.tool === k)).concat([e]); await saveReg(); tallerUI.msg = "Versión mejorada instalada. Cierra y vuelve a abrir esa ventana."; if (window.DION_MOD && t === "m") delete window.DION_MOD[k]; renderTaller(el); };
}

/* ====================================================================== */
/* NAVEGACIÓN ANTERIOR / SIGUIENTE EN CADA VENTANA                         */
/* ====================================================================== */
function stepRoute(w, dir){
  const r = BYK[w.route]; if (!r) return; const t = RUTA[r.i + dir];
  if (!t) return D().toast(dir > 0 ? "Es la última estación de la ruta" : "Es la primera estación");
  if (w.kind === "station" || w.kind === "tool") minimize(w);
  openStation(t.k);
}

/* ====================================================================== */
/* MEJORAR CADA VENTANA: exportar su código, importar la versión mejorada  */
/* ====================================================================== */
const BUILTIN_SRC = () => ({sitio:renderSitio, tesis:renderTesis, codif:renderCodif, revit:renderRevit});
const H_NAMES = ["esc","nrm","clamp","has","D","curP","patch","openStation","openMateria","loadMaterias","MAT","matSteps","matProgress","matUI","linksLegales","sitioUI","tesisUI","CAPS","tesisItems","evidencia","OPEN_LBL","resumenProyecto","revitData","DYNAMO","download","nextFrom","renderMateria","ctxFor","BYK","RUTA"];
function coreHelpers(){ return {esc, nrm, clamp, has, D, curP, patch, openStation, openMateria, loadMaterias, MAT, matSteps, matProgress, matUI, linksLegales, sitioUI, tesisUI, CAPS, tesisItems, evidencia, OPEN_LBL, resumenProyecto, revitData, DYNAMO, download, nextFrom, renderMateria, ctxFor, BYK, RUTA}; }
function wrapBuiltin(k){
  const r = BYK[k] || {}, head = `/* DION · sala "${k}" (${r.n || k}) exportada para mejorarla con otra IA.\n   Mantén: window.DION_MOD["${k}"] = {titulo, sub, render(el, ctx)}. Las funciones de apoyo de DION llegan en H (no las borres). */\n(function(){\n  const H = window.DIONCORE.H; const {${H_NAMES.join(", ")}} = H;\n  window.DION_MOD = window.DION_MOD || {};\n`;
  if (r.mat) return head + `  window.DION_MOD["${k}"] = {titulo:${JSON.stringify(r.n || k)}, sub:${JSON.stringify(r.s || "")}, render(el, ctx){ loadMaterias().then(() => (${renderMateria.toString()})(el, ${JSON.stringify(r.mat)}, ${JSON.stringify(k)})); } };\n})();\n`;
  const f = BUILTIN_SRC()[k]; if (!f) return null;
  return head + `  window.DION_MOD["${k}"] = {titulo:${JSON.stringify(r.n || k)}, sub:${JSON.stringify(r.s || "")}, render(el, ctx){ return (${f.toString()})(el, ctx); } };\n})();\n`;
}
async function exportCode(k){
  const tool = (k === "as" || k === "mez") ? k + ".html" : null;
  try {
    if (tool){ const ov = OVR["tool:" + tool]; return download(tool, ov ? await regCode(ov) : await (await fetch(tool)).text()); }
    if (OVR[k]) return download(k + ".js", await regCode(OVR[k]));
    if (MODFILE[k]) return download(MODFILE[k].split("/").pop(), await (await fetch(MODFILE[k])).text());
    const w = wrapBuiltin(k); if (w) return download(k + ".js", w);
    D().toast("Esta ventana no tiene código exportable");
  } catch(e){ D().toast("No se pudo exportar"); }
}
async function storeFile(file, base){
  const kind = /\.html?$/i.test(file.name) ? "html" : "js"; const text = await file.text();
  if (kind === "js" && !/DION_MOD/.test(text)){ D().toast("El archivo no registra window.DION_MOD: usa la plantilla/instrucciones"); return null; }
  const out = {...base, kind, v:(base.v || 0) + 1, t:Date.now(), fname:file.name};
  let up = null; try { const a = await getAssets(); if (a) up = await a.upload(new Blob([text], {type:kind === "js" ? "text/javascript" : "text/plain"})); } catch(err){}
  if (up){ out.url = up.url; out.asset = up.id; delete out.code; } else { out.code = text; delete out.url; }
  return out;
}
async function importCode(k, file){
  const tool = (k === "as" || k === "mez") ? k + ".html" : null; const r = BYK[k] || {};
  let e;
  if (tool){ e = await storeFile(file, {k:"tool_" + k, tool, n:"Mejora · " + (r.n || k), bolita:false}); if (!e) return; if (e.kind !== "html") return D().toast("Para A.S. o M.E.Z. sube un archivo .html");
    REG = REG.filter(x => x.tool !== tool).concat([e]); }
  else { e = await storeFile(file, {k, n:"Mejora · " + (r.n || k), bolita:false}); if (!e) return; if (e.kind !== "js") return D().toast("Para esta sala sube un archivo .js");
    REG = REG.filter(x => !(x.k === k && !x.nueva)).concat([e]); if (window.DION_MOD) delete window.DION_MOD[k]; }
  await saveReg(); D().toast("Versión mejorada instalada (v" + e.v + ")"); reopen(k);
}
async function restoreCode(k){ const tool = (k === "as" || k === "mez") ? k + ".html" : null;
  const e = tool ? REG.find(x => x.tool === tool) : REG.find(x => x.k === k && !x.nueva); if (!e) return D().toast("Ya está la versión original");
  try { const a = await getAssets(); if (a && e.asset) await a.delete(e.asset); } catch(err){}
  REG = REG.filter(x => x !== e); if (window.DION_MOD) delete window.DION_MOD[k]; await saveReg(); D().toast("Versión original restaurada"); reopen(k); }
function reopen(k){ const key = (k === "as" || k === "mez") ? "tool:" + k : (W["st:" + k] ? "st:" + k : null); if (key) closeWin(key); const r = BYK[k]; if (r && r.mat && W["mat:" + r.mat]) closeWin("mat:" + r.mat); openStation(k); }
function improveMenu(w){
  const k = w.improve; if (!k) return; const old = w.el.querySelector(".win-imp"); if (old){ old.remove(); return; }
  const has2 = (k === "as" || k === "mez") ? REG.some(x => x.tool === k + ".html") : REG.some(x => x.k === k && !x.nueva);
  const m = document.createElement("div"); m.className = "win-imp";
  m.innerHTML = `<small>Mejora esta ventana con otra IA (Gemini) sin gastar tokens aquí: 1) exporta su código y las instrucciones, 2) pide los cambios, 3) importa el archivo que te devuelva.</small>
    <button data-a="exp">⭳ Exportar código de esta ventana</button><button data-a="ia">⭳ Instrucciones para la IA</button>
    <label>⭱ Importar versión mejorada<input type="file" accept=".js,.html,.htm" hidden></label>
    ${has2 ? `<button data-a="res">↺ Restaurar la versión original</button>` : ""}
    <button data-a="tl">Abrir el Taller (agregar herramientas nuevas)</button>`;
  w.el.appendChild(m);
  m.querySelector('[data-a="exp"]').onclick = () => exportCode(k);
  m.querySelector('[data-a="ia"]').onclick = () => download("INSTRUCCIONES_PARA_IA_DION.md", IA_MD());
  m.querySelector("input").onchange = ev => { const f = ev.target.files[0]; if (f){ m.remove(); importCode(k, f); } };
  const rs = m.querySelector('[data-a="res"]'); if (rs) rs.onclick = () => { m.remove(); restoreCode(k); };
  m.querySelector('[data-a="tl"]').onclick = () => { m.remove(); openTaller(); };
}

/* ====================================================================== */
/* PUENTE CON LAS HERRAMIENTAS EN IFRAME (A.S., M.E.Z.)                    */
/* ====================================================================== */
const bridgeSubs = new Set(); let bridgeSig = "";
function projSummary(){ const p = curP(); if (!p) return null; const t = D().BYID[p.tipo];
  return {id:p.id, nombre:p.nombre, codigo:p.codigo || "", cliente:p.cliente || "", tipo:p.tipo || "", tipoN:t ? t.n : "", cat:t ? t.cat : "", tz:(p.loc && /gal[aá]pagos/i.test(p.loc.provincia || "")) ? -6 : -5,
    loc:{...(p.loc || {})}, terreno:p.terreno ? JSON.parse(JSON.stringify(p.terreno)) : null, norm:p.norm ? {...p.norm} : null}; }
function bridgeNotify(){ const s = projSummary(); const sig = s ? JSON.stringify([s.id, s.nombre, s.terreno && s.terreno.area, s.terreno && (s.terreno.local || []).length, s.norm]) : ""; if (sig === bridgeSig) return; bridgeSig = sig; bridgeSubs.forEach(fn => { try { fn(s); } catch(e){} }); }
const CH = 600000;
async function estadoLoad(tool){
  const p = curP(); if (!p) return null; const db = D().db, lk = `dion-estado-${p.id}-${tool}`;
  try { if (db){ const h = await db.doc(`flujos/${p.id}/estado/${tool}`).get(); if (h && h.exists){ const m = h.data(); let str = "";
        for (let i = 0; i < (m.n || 0); i++){ const c = await db.doc(`flujos/${p.id}/estado/${tool}_${i}`).get(); str += c.exists ? (c.data().s || "") : ""; }
        if (str) return JSON.parse(str); } } } catch(e){ console.warn("estado", e); }
  try { const v = localStorage.getItem(lk); return v ? JSON.parse(v) : null; } catch(e){ return null; }
}
const estadoT = {};
function estadoSave(tool, state){
  const p = curP(); if (!p) return Promise.resolve(); const pid = p.id;
  return new Promise(res => { clearTimeout(estadoT[tool]); estadoT[tool] = setTimeout(async () => {
    let str; try { str = JSON.stringify(state); } catch(e){ return res(); }
    try { localStorage.setItem(`dion-estado-${pid}-${tool}`, str); } catch(e){}
    const db = D().db; if (db){ try { const n = Math.ceil(str.length/CH) || 1; for (let i = 0; i < n; i++) await db.doc(`flujos/${pid}/estado/${tool}_${i}`).set({s:str.slice(i*CH, (i + 1)*CH)}); await db.doc(`flujos/${pid}/estado/${tool}`).set({n, t:Date.now(), bytes:str.length}); } catch(e){ console.warn("estado save", e); } }
    res(); }, 400); });
}
window.DION_BRIDGE = {project:projSummary, load:estadoLoad, save:estadoSave, on:fn => { bridgeSubs.add(fn); return () => bridgeSubs.delete(fn); }, toast:m => D().toast(m), open:k => openStation(k)};
// reenviar los avisos del bus entre herramientas abiertas
addEventListener("message", e => { const d = e.data; if (!d || d.nhig !== "bus") return; Object.values(W).forEach(w => { if (w.frame && w.frame.contentWindow !== e.source){ try { w.frame.contentWindow.postMessage(d, "*"); } catch(err){} } }); });

/* ====================================================================== */
/* RESPALDO: todos tus proyectos y estados (archivo, y Google Drive)       */
/* ====================================================================== */
async function buildBackup(){
  const d = D(), out = {dion:"respaldo", version:3, fecha:new Date().toISOString(), proyectos:[], estados:{}, ajustes:{}};
  out.proyectos = JSON.parse(JSON.stringify(d.P));
  for (const p of d.P){ for (const tool of ["as","mez"]){ const prev = d.active; d.active = p.id; try { const st = await estadoLoad(tool); if (st) (out.estados[p.id] = out.estados[p.id] || {})[tool] = st; } catch(e){} d.active = prev; } }
  out.ajustes.modulos = REG; try { out.ajustes.datos_ovr = JSON.parse(localStorage.getItem("dion-datos-ovr") || "null"); } catch(e){}
  return out;
}
async function backupFile(){ const b = await buildBackup(); await download(`DION_respaldo_${b.fecha.slice(0, 10)}.json`, JSON.stringify(b)); lss("dion-ultimo-respaldo", Date.now()); }
async function backupDrive(){
  let mcp = null; try { mcp = window.claude && window.claude.use ? await window.claude.use("mcp") : null; } catch(e){}
  if (!mcp) return D().toast("Google Drive no está disponible aquí: usa «Respaldo en archivo»");
  const b = await buildBackup();
  try { await mcp.callTool("Google Drive", "create_file", {title:`DION_respaldo_${b.fecha.slice(0, 16).replace(":", "-")}.json`, textContent:JSON.stringify(b), contentMimeType:"application/json", disableConversionToGoogleType:true});
    lss("dion-ultimo-respaldo", Date.now()); D().toast("Respaldo guardado en tu Google Drive"); }
  catch(e){ D().toast(e && e.code === "server_not_connected" ? "Conecta Google Drive en claude.ai (Configuración › Conectores)" : "No se pudo guardar en Drive: " + (e && (e.message || e.code) || "")); }
}
async function restoreBackup(file){
  let b; try { b = JSON.parse(await file.text()); } catch(e){ return D().toast("El archivo no es un respaldo válido"); }
  if (!b || b.dion !== "respaldo" || !Array.isArray(b.proyectos)) return D().toast("El archivo no es un respaldo de DION");
  const d = D(), db = d.db; let n = 0;
  for (const p of b.proyectos){ const {id, ...doc} = p; try { if (db) await db.doc("flujos/" + id).set(doc); else { const all = JSON.parse(localStorage.getItem("dion-local-projects") || "[]").filter(x => x.id !== id); all.push(p); localStorage.setItem("dion-local-projects", JSON.stringify(all)); } n++; } catch(e){} }
  for (const pid of Object.keys(b.estados || {})){ for (const tool of Object.keys(b.estados[pid])){ const prev = d.active; d.active = pid; await estadoSave(tool, b.estados[pid][tool]); await new Promise(r => setTimeout(r, 450)); d.active = prev; } }
  if (b.ajustes && Array.isArray(b.ajustes.modulos)){ REG = b.ajustes.modulos; await saveReg(); }
  if (b.ajustes && b.ajustes.datos_ovr) try { localStorage.setItem("dion-datos-ovr", JSON.stringify(b.ajustes.datos_ovr)); } catch(e){}
  D().toast(`Respaldo restaurado: ${n} proyectos`); setTimeout(() => location.reload(), 1200);
}
function backupHTML(){ const u = lsg("dion-ultimo-respaldo", 0); return `<h2 style="margin-top:22px;font-size:12px">RESPALDO DE TODOS TUS PROYECTOS</h2>
  <div class="card" style="display:grid;gap:10px;margin-top:8px"><p class="lead" style="margin:0">Todo se guarda solo en DION (base de datos del artefacto) apenas lo haces. Además, guarda un respaldo completo (proyectos, A.S., M.E.Z., códigos, herramientas) en tu computadora o en tu Google Drive, y restáuralo cuando quieras. Último respaldo: <b>${u ? new Date(u).toLocaleString() : "nunca"}</b>.</p>
  <div class="row"><button class="bt pri" id="bk-f">⭳ Respaldo en archivo (.json)</button><button class="bt" id="bk-d">☁ Respaldo en Google Drive</button><label class="bt" style="cursor:pointer">⭱ Restaurar respaldo<input type="file" id="bk-r" accept=".json" hidden></label></div></div>`; }
function bindBackup(el){ const f = el.querySelector("#bk-f"); if (!f) return; f.onclick = backupFile; el.querySelector("#bk-d").onclick = backupDrive; el.querySelector("#bk-r").onchange = e => { const x = e.target.files[0]; if (x) restoreBackup(x); }; }
setTimeout(() => { const u = lsg("dion-ultimo-respaldo", 0); if (D() && D().P && D().P.length && Date.now() - u > 7*864e5) D().toast("Recuerda: haz un respaldo de tus proyectos (Taller › Respaldo)"); }, 15000);
/* ====================================================================== */
/* API                                                                     */
/* ====================================================================== */
function startProject(p, opts){
  const d = D(); d.active = p.id;
  loadMaterias();
  const wl = openLinea(), wm = openMonitor();
  if (isPhone()){ if (wl && !wl.min) minimize(wl); if (wm && !wm.min) minimize(wm); }
  const k = opts && opts.station ? opts.station : resumeTarget(p).k;
  if (k !== "terreno") openStation(k);
}
setTimeout(loadReg, 800);
setTimeout(() => { window.DIONCORE.H = coreHelpers(); }, 0);
window.DIONCORE = {H:null, backupFile, openTaller, openWin, closeWin, W, openStation, openLinea, openMonitor, startProject, refreshLive, RUTA, stProg, nextPending, curP, patch, loadMaterias, ctxFor, climaDe};
})();
