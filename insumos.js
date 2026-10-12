/* DION · Módulo "insumos" — Base de datos de insumos y precios (Guayaquil / Samborondón · USD)
   Datos: servicio compartido window.DION_DATA (mods/datos.js → data/insumos.json + data/codigos.json + capa de cambios del usuario).
   Cada ítem lleva su Código DION VINCULADO a la sala Codificación: si se renombra allá, cambia aquí (y viceversa).
   Agregar/editar/eliminar ítems y precios; marcar precios verificados con fecha.
   Carrito de cuantías del proyecto: ctx.set('insumos', {items, precio, desp, confirmado}). Exporta CSV, Excel (SpreadsheetML .xls) y la base completa .xlsx. */
window.DION_MOD = window.DION_MOD || {};
(function () {
  const K = "insumos", P = "m-" + K + "-", IVA = 0.15;
  const SRC = (document.currentScript && document.currentScript.src) || "";
  const rutas = f => {
    const r = [];
    if (SRC) { try { r.push(new URL("../data/" + f, SRC).href); } catch (e) { } }
    r.push("data/" + f, "../data/" + f);
    return r.filter((u, i) => r.indexOf(u) === i);
  };
  const XLSX_RUTAS = rutas("BASE_DE_DATOS_DION_completa.xlsx");
  /* carga el servicio compartido DION_DATA (mods/datos.js) si aún no existe */
  let SVC = null;
  function servicio() {
    if (window.DION_DATA) return Promise.resolve(window.DION_DATA);
    if (SVC) return SVC;
    SVC = new Promise((res, rej) => {
      const cand = [];
      if (SRC) { try { cand.push(new URL("datos.js", SRC).href); } catch (e) { } }
      cand.push("mods/datos.js", "datos.js", "../mods/datos.js");
      const urls = cand.filter((u, i) => cand.indexOf(u) === i);
      const prueba = i => {
        if (window.DION_DATA) return res(window.DION_DATA);
        if (i >= urls.length) { SVC = null; return rej(new Error("No se encontró mods/datos.js")); }
        const s = document.createElement("script"); s.src = urls[i];
        s.onload = () => window.DION_DATA ? res(window.DION_DATA) : prueba(i + 1);
        s.onerror = () => { s.remove(); prueba(i + 1); };
        document.head.appendChild(s);
      };
      prueba(0);
    });
    return SVC;
  }
  const D = () => window.DION_DATA;
  let DATA = [], HOJAS = [], DISCS = [], OFF = null;
  const UI = { tab: "cat", hoja: "*", disc: "*", cat: "*", q: "", sel: "", form: null, cmpHoja: "*" };

  const nrm = s => String(s == null ? "" : s).normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
  const esc = s => String(s == null ? "" : s).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const $ = n => (Math.round((+n || 0) * 100) / 100).toLocaleString("es-EC", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  const num = n => (+n || 0).toLocaleString("es-EC", { maximumFractionDigits: 2 });
  const hoy = () => new Date().toISOString().slice(0, 10);
  const fecha = iso => { const m = String(iso || "").match(/^(\d{4})-(\d{2})-(\d{2})/); return m ? m[3] + "/" + m[2] + "/" + m[1] : String(iso || ""); };

  function indexar() {
    DATA = D().insumos();
    const hs = new Map(), ds = new Map();
    DATA.forEach(r => {
      if (!hs.has(r.hoja)) hs.set(r.hoja, { n: r.hoja, c: 0, cats: new Map() });
      const H = hs.get(r.hoja); H.c++; H.cats.set(r.cat, (H.cats.get(r.cat) || 0) + 1);
      const dc = r.dc || "—"; ds.set(dc, { c: dc, n: r.disc || "", k: ((ds.get(dc) || {}).k || 0) + 1 });
    });
    HOJAS = [...hs.values()]; DISCS = [...ds.values()].sort((a, b) => b.k - a.k);
    if (UI.hoja !== "*" && !hs.has(UI.hoja)) { UI.hoja = "*"; UI.cat = "*"; }
  }
  function filtrar() {
    const toks = nrm(UI.q).split(/\s+/).filter(Boolean), out = [];
    for (const r of DATA) {
      if (UI.hoja !== "*" && r.hoja !== UI.hoja) continue;
      if (UI.disc !== "*" && (r.dc || "—") !== UI.disc) continue;
      if (UI.cat !== "*" && r.cat !== UI.cat) continue;
      let ok = true; for (const t of toks) if (!r.h.includes(t)) { ok = false; break; }
      if (ok) out.push(r);
    }
    return out;
  }

  /* ───────── glifos ───────── */
  const G = {
    box: '<svg viewBox="0 0 24 24"><path d="M12 2l9 5v10l-9 5-9-5V7z"/><path d="M3 7l9 5 9-5M12 12v10"/></svg>',
    cat: '<svg viewBox="0 0 24 24"><path d="M4 5h16M4 12h10M4 19h7"/><circle cx="18" cy="17" r="3"/><path d="M20.2 19.2 22 21"/></svg>',
    cmp: '<svg viewBox="0 0 24 24"><path d="M6 20V9M12 20V4M18 20v-7"/><path d="M3 20h18"/></svg>',
    cart: '<svg viewBox="0 0 24 24"><path d="M3 4h3l2.5 11h10L21 7H7"/><circle cx="10" cy="19" r="1.6"/><circle cx="17" cy="19" r="1.6"/></svg>',
    exp: '<svg viewBox="0 0 24 24"><path d="M12 3v12M7 10l5 5 5-5"/><path d="M4 17v4h16v-4"/></svg>',
    plus: '<svg viewBox="0 0 24 24"><path d="M12 5v14M5 12h14"/></svg>',
    minus: '<svg viewBox="0 0 24 24"><path d="M5 12h14"/></svg>',
    x: '<svg viewBox="0 0 24 24"><path d="M5 5l14 14M19 5L5 19"/></svg>',
    code: '<svg viewBox="0 0 24 24"><path d="M8 7l-5 5 5 5M16 7l5 5-5 5M14 4l-4 16"/></svg>',
    xls: '<svg viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18"/><path d="M3 9h18M3 15h18M9 3v18M15 3v18"/></svg>',
    csv: '<svg viewBox="0 0 24 24"><path d="M5 3h10l4 4v14H5z"/><path d="M8 12h8M8 16h8M8 8h4"/></svg>',
    db: '<svg viewBox="0 0 24 24"><ellipse cx="12" cy="5" rx="8" ry="3"/><path d="M4 5v14c0 1.7 3.6 3 8 3s8-1.3 8-3V5M4 12c0 1.7 3.6 3 8 3s8-1.3 8-3"/></svg>',
    chk: '<svg viewBox="0 0 24 24"><path d="M4 12l5 5L20 6"/></svg>',
    trash: '<svg viewBox="0 0 24 24"><path d="M4 7h16M9 7V4h6v3M6 7l1 14h10l1-14"/></svg>',
    pen: '<svg viewBox="0 0 24 24"><path d="M4 20l4-1 11-11-3-3L5 16z"/><path d="M14 6l3 3"/></svg>',
    link: '<svg viewBox="0 0 24 24" style="width:11px;height:11px;vertical-align:-1px;margin-right:3px"><path d="M10 14a4 4 0 0 0 5.7 0l3-3a4 4 0 0 0-5.7-5.7l-1 1"/><path d="M14 10a4 4 0 0 0-5.7 0l-3 3a4 4 0 0 0 5.7 5.7l1-1"/></svg>'
  };

  function css() {
    if (document.getElementById("mod-" + K + "-css")) return;
    const s = document.createElement("style"); s.id = "mod-" + K + "-css";
    s.textContent = `
.m-${K}{container-type:inline-size;position:absolute;inset:0;display:flex;flex-direction:column;color:var(--ink);font-family:var(--f-b);font-size:13px;overflow:hidden;background:radial-gradient(120% 80% at 10% 0%,rgba(var(--acc-rgb),.07),transparent 60%)}
.m-${K} *{box-sizing:border-box}
.m-${K} svg{width:18px;height:18px;fill:none;stroke:currentColor;stroke-width:1.6;stroke-linecap:round;stroke-linejoin:round;flex:none}
.${P}top{flex:none;display:flex;flex-wrap:wrap;gap:10px;align-items:center;justify-content:space-between;padding:12px 14px 8px;border-bottom:1px solid var(--line)}
.${P}brand{display:flex;gap:10px;align-items:center;min-width:0}
.${P}brand svg{width:30px;height:30px;color:var(--acc);filter:drop-shadow(0 0 6px rgba(var(--acc-rgb),.6))}
.${P}brand b{display:block;font-family:var(--f-d);font-size:11px;letter-spacing:.16em;font-weight:400}
.${P}brand small{display:block;color:var(--muted);font-size:11px}
.${P}meters{display:flex;gap:6px;flex-wrap:wrap}
.${P}meter{position:relative;border:1px solid var(--line2);background:var(--glass);padding:5px 10px 4px;min-width:78px;clip-path:polygon(8px 0,100% 0,100% calc(100% - 8px),calc(100% - 8px) 100%,0 100%,0 8px)}
.${P}meter i{display:block;font-style:normal;font-family:var(--f-d);font-size:8px;letter-spacing:.14em;color:var(--muted)}
.${P}meter span{font-family:var(--f-m);font-size:15px;color:var(--acc)}
.${P}meter.ok span{color:var(--done)}
.${P}tabs{flex:none;display:flex;gap:4px;padding:8px 14px;overflow-x:auto;scrollbar-width:none}
.${P}tab{display:flex;align-items:center;gap:7px;min-height:40px;padding:0 14px;border:1px solid var(--line);background:transparent;color:var(--muted);font-family:var(--f-d);font-size:9.5px;letter-spacing:.14em;cursor:pointer;white-space:nowrap;clip-path:polygon(10px 0,100% 0,100% 100%,0 100%,0 10px)}
.${P}tab.on{color:var(--bg);background:var(--acc);border-color:var(--acc);box-shadow:0 0 14px rgba(var(--acc-rgb),.45)}
.${P}tab b{font-family:var(--f-m);font-weight:400}
.${P}body{flex:1;min-height:0;display:flex;position:relative}
.${P}main{flex:1;min-width:0;display:flex;flex-direction:column;min-height:0}
.${P}bar{flex:none;display:flex;flex-wrap:wrap;gap:6px;padding:0 14px 8px}
.${P}srch{flex:1 1 220px;display:flex;align-items:center;gap:8px;border:1px solid var(--line2);background:var(--panel);padding:0 10px;min-height:42px}
.${P}srch input{flex:1;min-width:0;background:transparent;border:0;outline:0;color:var(--ink);font-family:var(--f-m);font-size:13px;height:40px}
.${P}srch svg{color:var(--acc)}
.${P}sel{flex:1 1 150px;min-height:42px;background:var(--panel);color:var(--ink);border:1px solid var(--line2);padding:0 8px;font-family:var(--f-b);font-size:12.5px;max-width:100%}
.${P}sel:focus,.${P}srch:focus-within{outline:none;border-color:var(--acc);box-shadow:0 0 0 1px rgba(var(--acc-rgb),.4)}
.${P}list{flex:1;min-height:0;overflow:auto;padding:0 14px 14px}
.${P}grp{font-family:var(--f-d);font-size:9px;letter-spacing:.16em;color:var(--acc);padding:12px 2px 6px;border-bottom:1px solid var(--line);display:flex;justify-content:space-between;gap:8px}
.${P}grp span{color:var(--faint);font-family:var(--f-m);letter-spacing:0}
.${P}row{display:grid;grid-template-columns:minmax(150px,190px) 1fr 120px 92px 44px;gap:10px;align-items:center;padding:7px 4px;border-bottom:1px solid rgba(120,200,255,.06);cursor:pointer;min-height:48px}
.${P}row:hover{background:rgba(var(--acc-rgb),.05)}
.${P}row.on{background:rgba(var(--acc-rgb),.1);box-shadow:inset 2px 0 0 var(--acc)}
.${P}cod{font-family:var(--f-m);font-size:11px;color:var(--acc);word-break:break-all}
.${P}cod em{display:inline-block;margin-left:4px;font-style:normal;font-size:8.5px;font-family:var(--f-d);letter-spacing:.1em;color:var(--done);border:1px solid rgba(var(--done-rgb),.5);padding:0 3px}
.${P}desc{min-width:0}
.${P}desc b{display:block;font-weight:500;font-size:12.5px;line-height:1.25}
.${P}desc small{display:block;color:var(--muted);font-size:11px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.${P}ab{display:flex;flex-direction:column;gap:3px}
.${P}ab div{display:flex;align-items:center;gap:5px;font-family:var(--f-m);font-size:10px;color:var(--muted)}
.${P}ab i{display:block;height:5px;background:var(--acc);box-shadow:0 0 6px rgba(var(--acc-rgb),.6)}
.${P}ab div+div i{background:#B98CFF;box-shadow:0 0 6px rgba(185,140,255,.5)}
.${P}pr{text-align:right;font-family:var(--f-m);font-size:13px}
.${P}pr small{display:block;color:var(--faint);font-size:10px}
.${P}add{width:42px;height:42px;display:grid;place-items:center;border:1px solid var(--line2);background:transparent;color:var(--acc);cursor:pointer}
.${P}add:hover,.${P}add.in{background:rgba(var(--acc-rgb),.15);border-color:var(--acc)}
.${P}add.in{color:var(--done);border-color:var(--done)}
.${P}more{margin:12px auto;display:block}
.${P}btn{display:inline-flex;align-items:center;justify-content:center;gap:8px;min-height:42px;padding:0 14px;border:1px solid var(--line2);background:var(--panel2);color:var(--ink);font-family:var(--f-d);font-size:9.5px;letter-spacing:.14em;cursor:pointer;clip-path:polygon(8px 0,100% 0,100% calc(100% - 8px),calc(100% - 8px) 100%,0 100%,0 8px)}
.${P}btn:hover{border-color:var(--acc);color:var(--acc)}
.${P}btn.pri{background:rgba(var(--acc-rgb),.16);border-color:var(--acc);color:var(--acc)}
.${P}btn.ok{border-color:var(--done);color:var(--done)}
.${P}btn.warn{border-color:var(--warn);color:var(--warn)}
.${P}side{flex:none;width:min(380px,40%);border-left:1px solid var(--line2);background:var(--glass);overflow:auto;padding:14px;position:relative}
.${P}side.vacio{display:flex;align-items:center;justify-content:center;color:var(--faint);text-align:center;font-family:var(--f-d);font-size:9px;letter-spacing:.16em}
.${P}card{position:relative;border:1px solid var(--line2);background:linear-gradient(160deg,rgba(var(--acc-rgb),.06),transparent 50%),var(--panel);padding:12px;margin-bottom:10px}
.${P}card:before,.${P}card:after{content:"";position:absolute;width:10px;height:10px;border-color:var(--acc);border-style:solid}
.${P}card:before{top:-1px;left:-1px;border-width:2px 0 0 2px}
.${P}card:after{bottom:-1px;right:-1px;border-width:0 2px 2px 0}
.${P}card.warn{border-color:rgba(255,92,122,.55)}
.${P}card.warn:before,.${P}card.warn:after{border-color:var(--warn)}
.${P}lbl{font-family:var(--f-d);font-size:8.5px;letter-spacing:.16em;color:var(--muted);margin-bottom:6px;display:flex;justify-content:space-between;gap:6px;align-items:center}
.${P}tag{font-family:var(--f-d);font-size:8px;letter-spacing:.12em;padding:2px 6px;border:1px solid var(--warn);color:var(--warn)}
.${P}tag.ok{border-color:var(--done);color:var(--done)}
.${P}big{font-family:var(--f-m);font-size:16px;color:var(--acc);word-break:break-all}
.${P}kv{display:grid;grid-template-columns:110px 1fr;gap:4px 10px;font-size:12px}
.${P}kv dt{color:var(--muted)}
.${P}kv dd{margin:0}
.${P}pbar{display:grid;grid-template-columns:70px 1fr 78px;gap:8px;align-items:center;margin:6px 0;font-size:11.5px}
.${P}pbar .t{height:10px;background:rgba(120,200,255,.08);position:relative}
.${P}pbar .t i{position:absolute;inset:0 auto 0 0;background:var(--acc);box-shadow:0 0 8px rgba(var(--acc-rgb),.6)}
.${P}pbar.b .t i{background:#B98CFF;box-shadow:0 0 8px rgba(185,140,255,.5)}
.${P}pbar.r .t i{background:var(--muted);box-shadow:none}
.${P}pbar span{text-align:right;font-family:var(--f-m)}
.${P}step{display:flex;align-items:stretch;border:1px solid var(--line2)}
.${P}step button{width:42px;min-height:42px;background:transparent;border:0;color:var(--acc);cursor:pointer;display:grid;place-items:center}
.${P}step input{width:80px;background:var(--bg);border:0;border-left:1px solid var(--line);border-right:1px solid var(--line);color:var(--ink);text-align:center;font-family:var(--f-m);font-size:14px;outline:0}
.${P}x{position:absolute;top:8px;right:8px;width:40px;height:40px;border:1px solid var(--line);background:var(--panel);color:var(--muted);display:none;place-items:center;cursor:pointer;z-index:2}
.${P}grid{flex:1;overflow:auto;padding:0 14px 16px}
.${P}kpis{display:grid;grid-template-columns:repeat(4,1fr);gap:8px;margin:2px 0 12px}
.${P}kpi{border:1px solid var(--line2);background:var(--panel);padding:10px}
.${P}kpi i{display:block;font-style:normal;font-family:var(--f-d);font-size:8px;letter-spacing:.14em;color:var(--muted)}
.${P}kpi b{display:block;font-family:var(--f-m);font-weight:400;font-size:18px;color:var(--acc);margin-top:3px}
.${P}kpi.ok b{color:var(--done)}
.${P}kpi.pv{border-color:rgba(255,92,122,.55)}
.${P}tbl{width:100%;border-collapse:collapse;font-size:12px}
.${P}tbl th{font-family:var(--f-d);font-size:8px;letter-spacing:.14em;color:var(--muted);font-weight:400;text-align:left;padding:8px 6px;border-bottom:1px solid var(--line2);position:sticky;top:0;background:var(--panel)}
.${P}tbl td{padding:6px;border-bottom:1px solid rgba(120,200,255,.07);vertical-align:middle}
.${P}tbl td.n{text-align:right;font-family:var(--f-m);white-space:nowrap}
.${P}tbl tr.sub td{color:var(--acc);font-family:var(--f-d);font-size:9px;letter-spacing:.12em;background:rgba(var(--acc-rgb),.05)}
.${P}hbar{display:grid;grid-template-columns:minmax(120px,220px) 1fr 70px;gap:8px;align-items:center;padding:6px 0;border-bottom:1px solid rgba(120,200,255,.06);font-size:12px}
.${P}hbar .t{height:12px;background:rgba(120,200,255,.06);position:relative}
.${P}hbar .t i{position:absolute;top:0;bottom:0;left:50%;background:var(--done)}
.${P}hbar .t i.neg{background:#B98CFF}
.${P}hbar .t:after{content:"";position:absolute;left:50%;top:-3px;bottom:-3px;width:1px;background:var(--line2)}
.${P}hbar span{font-family:var(--f-m);text-align:right}
.${P}seg{display:inline-flex;border:1px solid var(--line2)}
.${P}seg button{min-height:40px;padding:0 12px;background:transparent;border:0;color:var(--muted);font-family:var(--f-d);font-size:9px;letter-spacing:.12em;cursor:pointer}
.${P}seg button.on{background:rgba(var(--acc-rgb),.18);color:var(--acc)}
.${P}tot{display:grid;grid-template-columns:1fr auto;gap:6px 14px;font-family:var(--f-m);font-size:13px;align-items:center}
.${P}tot .g{font-size:20px;color:var(--done)}
.${P}empty{padding:40px 10px;text-align:center;color:var(--faint);font-family:var(--f-d);font-size:9px;letter-spacing:.16em}
.${P}empty svg{width:42px;height:42px;color:var(--line2);display:block;margin:0 auto 12px}
.${P}exp{display:grid;grid-template-columns:repeat(auto-fill,minmax(230px,1fr));gap:10px}
.${P}exp button{text-align:left;align-items:flex-start;flex-direction:column;padding:14px;min-height:120px;gap:6px;clip-path:none;font-family:var(--f-b);letter-spacing:0;font-size:12px;color:var(--muted)}
.${P}exp button b{font-family:var(--f-d);font-size:10px;letter-spacing:.14em;color:var(--ink);font-weight:400;display:flex;gap:8px;align-items:center}
.${P}exp button b svg{color:var(--acc);width:22px;height:22px}
.${P}load{position:absolute;inset:0;display:grid;place-items:center;color:var(--muted);font-family:var(--f-d);font-size:10px;letter-spacing:.2em}
.${P}load svg{width:46px;height:46px;color:var(--acc);animation:${P}spin 3s linear infinite}
@keyframes ${P}spin{to{transform:rotate(360deg)}}
.${P}note{color:var(--muted);font-size:11.5px;line-height:1.45;margin:8px 0}
@container (max-width:860px){
  .${P}row{grid-template-columns:1fr 92px 44px}
  .${P}row .${P}cod{grid-column:1/-1}
  .${P}row .${P}ab{display:none}
  .${P}side{position:absolute;inset:0;width:auto;z-index:5;border-left:0;background:rgba(5,10,17,.97)}
  .${P}side.vacio{display:none}
  .${P}x{display:grid}
  .${P}kpis{grid-template-columns:repeat(2,1fr)}
}
@container (max-width:520px){
  .${P}top{padding:10px}
  .${P}meter{min-width:64px;padding:4px 7px}
  .${P}meter span{font-size:13px}
  .${P}brand small{display:none}
  .${P}bar,.${P}list,.${P}grid,.${P}tabs{padding-left:10px;padding-right:10px}
  .${P}sel{flex:1 1 100%}
  .${P}tbl .hm{display:none}
  .${P}hbar{grid-template-columns:110px 1fr 56px}
  .${P}step input{width:46px}
  .${P}step button{width:40px}
  .${P}tbl td{padding:6px 3px}
}
.${P}row{height:calc(100% - 1px);overflow:hidden}
.${P}desc b{white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.${P}cod{white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.${P}cod em.bad{color:var(--warn);border-color:var(--warn)}
.${P}pr small b{font-weight:400;font-family:var(--f-d);font-size:7.5px;letter-spacing:.1em;margin-left:3px}
.${P}grp{height:100%;align-items:flex-end;padding-top:0}
.${P}cnt{flex:none;padding:0 14px 6px;font-family:var(--f-m);font-size:11px;color:var(--muted)}
.${P}list{position:relative;overscroll-behavior:contain}
.${P}acts{display:flex;gap:6px;flex-wrap:wrap;margin-top:10px}
.${P}conf{border:1px solid var(--warn);background:rgba(255,92,122,.08);padding:10px;margin-top:10px;font-size:12.5px;line-height:1.45}
.${P}conf b{color:var(--warn)}
.${P}f{display:block;margin-bottom:9px;min-width:0}
.${P}f>i{display:block;font-style:normal;font-family:var(--f-d);font-size:8px;letter-spacing:.14em;color:var(--muted);margin-bottom:4px}
.${P}f input{width:100%;min-height:42px;background:var(--bg);border:1px solid var(--line2);color:var(--ink);padding:0 10px;font-family:var(--f-b);font-size:13px;outline:0}
.${P}f input:focus{border-color:var(--acc);box-shadow:0 0 0 1px rgba(var(--acc-rgb),.35)}
.${P}f input.mono{font-family:var(--f-m)}
.${P}f input[type=date]{font-family:var(--f-m);color-scheme:dark}
.${P}f2{display:grid;grid-template-columns:1fr 1fr;gap:0 8px}
.${P}f3{display:grid;grid-template-columns:1fr 1fr 1fr;gap:0 8px}
.${P}msg{color:var(--warn);font-size:12px;min-height:14px}
.${P}combo{position:relative}
.${P}dd{position:absolute;left:0;right:0;top:100%;z-index:8;max-height:280px;overflow:auto;background:#06101a;border:1px solid var(--acc);box-shadow:0 10px 30px rgba(0,0,0,.6),0 0 18px rgba(var(--acc-rgb),.2)}
.${P}dd button{display:grid;grid-template-columns:auto 1fr;gap:8px;align-items:center;width:100%;min-height:42px;padding:4px 10px;border:0;border-bottom:1px solid var(--line);background:none;color:var(--ink);text-align:left;cursor:pointer;font-family:var(--f-b);font-size:12px}
.${P}dd button:hover,.${P}dd button.on{background:rgba(var(--acc-rgb),.14)}
.${P}dd button code{font-family:var(--f-m);font-size:11px;color:var(--acc)}
.${P}dd button span{white-space:nowrap;overflow:hidden;text-overflow:ellipsis;min-width:0}
.${P}dd button.nw{color:var(--done);font-family:var(--f-d);font-size:9px;letter-spacing:.12em;grid-template-columns:auto auto;justify-content:start}
.${P}dd .hint{padding:10px;color:var(--muted);font-size:12px}
.${P}side>.${P}card:first-of-type .${P}lbl{padding-right:46px}
.${P}tbl tr.gone td{opacity:.55}
.${P}tbl tr.gone td:first-child div:first-child::after{content:" · eliminado de la base";color:var(--warn);font-size:11px}
@container (max-width:860px){
  .${P}row{grid-template-columns:1fr 92px 44px;grid-template-rows:auto auto;gap:2px 8px;padding:6px 4px}
  .${P}row .${P}cod{grid-column:1;grid-row:1}
  .${P}row .${P}desc{grid-column:1;grid-row:2}
  .${P}row .${P}pr{grid-column:2;grid-row:1/3}
  .${P}row .${P}add{grid-column:3;grid-row:1/3}
}
@container (max-width:520px){ .${P}sel{flex:1 1 30%!important;min-width:0;font-size:12px;padding:0 4px} .${P}cnt{padding-left:10px} .${P}f3{grid-template-columns:1fr 1fr} .${P}bar .${P}btn{flex:0 0 auto} }
`;
    document.head.appendChild(s);
  }

  /* ───────── exportación ───────── */
  function precioDe(r, modo) {
    if (modo === "a") return +r.pA || +r.pref;
    if (modo === "b") return +r.pB || +r.pref;
    if (modo === "min") return Math.min(+r.pA || Infinity, +r.pB || Infinity, +r.pref || Infinity);
    return +r.pref;
  }
  function calc(st) {
    const lines = (st.items || []).map(l => {
      const pu = precioDe(l, st.precio || "ref");
      const qd = (+l.q || 0) * (st.desp && l.desp ? 1 + l.desp / 100 : 1);
      return Object.assign({}, l, { pu, qd, sub: qd * pu });
    });
    const porHoja = new Map();
    lines.forEach(l => { if (!porHoja.has(l.hoja)) porHoja.set(l.hoja, { lines: [], sub: 0 }); const h = porHoja.get(l.hoja); h.lines.push(l); h.sub += l.sub; });
    const base = lines.reduce((a, l) => a + l.sub, 0);
    return { lines, porHoja, base, iva: base * IVA, total: base * (1 + IVA) };
  }
  const MODOS = { ref: "P. REF.", a: "LOCAL A", b: "LOCAL B", min: "MEJOR PRECIO" };
  function expCSV(st, P) {
    const c = calc(st), q = v => '"' + String(v == null ? "" : v).replace(/"/g, '""') + '"';
    const rows = [["Proyecto", P.nombre || ""], ["Precio usado", MODOS[st.precio || "ref"]], ["Desperdicio aplicado", st.desp ? "Sí" : "No"], [],
      ["Hoja", "Código DION", "Descripción", "Unidad", "Cant.", "Cant. c/desperdicio", "P. Unit. ($)", "Subtotal ($)", "Local A", "P. A ($)", "Local B", "P. B ($)", "Fuente"]];
    c.porHoja.forEach((h, hoja) => {
      h.lines.forEach(l => rows.push([hoja, l.cod, l.desc, l.unidad, l.q, l.qd.toFixed(2), l.pu.toFixed(2), l.sub.toFixed(2), l.locA, l.pA, l.locB, l.pB, l.fuente]));
      rows.push(["Subtotal " + hoja, "", "", "", "", "", "", h.sub.toFixed(2)]);
    });
    rows.push([], ["", "", "SUBTOTAL", "", "", "", "", c.base.toFixed(2)], ["", "", "IVA 15 %", "", "", "", "", c.iva.toFixed(2)], ["", "", "TOTAL", "", "", "", "", c.total.toFixed(2)]);
    return new Blob(["﻿" + rows.map(r => r.map(q).join(";")).join("\r\n")], { type: "text/csv;charset=utf-8" });
  }
  function expXLS(st, P) {
    const c = calc(st), x = s => esc(s);
    const cell = (v, t, s) => `<Cell${s ? ` ss:StyleID="${s}"` : ""}><Data ss:Type="${t || (typeof v === "number" ? "Number" : "String")}">${typeof v === "number" ? v : x(v)}</Data></Cell>`;
    let rows = `<Row>${cell("CUANTÍAS Y PRESUPUESTO REFERENCIAL — " + (P.nombre || "Proyecto"), "String", "t")}</Row>
<Row>${cell("Precio: " + MODOS[st.precio || "ref"] + " · Desperdicio: " + (st.desp ? "aplicado" : "no") + " · USD · Guayaquil 2026 · PRECIOS ESTIMADOS POR VERIFICAR", "String", "m")}</Row><Row/>
<Row>${["Hoja", "Código DION", "Descripción", "Unidad", "Cant.", "Cant. c/desp.", "P. Unit. ($)", "Subtotal ($)", "Local A", "P. A ($)", "Local B", "P. B ($)", "Fuente"].map(h => cell(h, "String", "h")).join("")}</Row>`;
    c.porHoja.forEach((h, hoja) => {
      h.lines.forEach(l => { rows += `<Row>${cell(hoja)}${cell(l.cod, "String", "c")}${cell(l.desc)}${cell(l.unidad)}${cell(+l.q || 0)}${cell(+l.qd.toFixed(3), "Number", "n")}${cell(+l.pu.toFixed(2), "Number", "n")}${cell(+l.sub.toFixed(2), "Number", "n")}${cell(l.locA || "")}${cell(+l.pA || 0, "Number", "n")}${cell(l.locB || "")}${cell(+l.pB || 0, "Number", "n")}${cell(l.fuente || "")}</Row>`; });
      rows += `<Row>${cell("SUBTOTAL " + hoja.toUpperCase(), "String", "s")}<Cell/><Cell/><Cell/><Cell/><Cell/><Cell/>${cell(+h.sub.toFixed(2), "Number", "sn")}</Row>`;
    });
    rows += `<Row/><Row><Cell/><Cell/>${cell("SUBTOTAL", "String", "s")}<Cell/><Cell/><Cell/><Cell/>${cell(+c.base.toFixed(2), "Number", "sn")}</Row>
<Row><Cell/><Cell/>${cell("IVA 15 %", "String", "s")}<Cell/><Cell/><Cell/><Cell/>${cell(+c.iva.toFixed(2), "Number", "sn")}</Row>
<Row><Cell/><Cell/>${cell("TOTAL", "String", "s")}<Cell/><Cell/><Cell/><Cell/>${cell(+c.total.toFixed(2), "Number", "sn")}</Row>`;
    const xml = `<?xml version="1.0" encoding="UTF-8"?><?mso-application progid="Excel.Sheet"?>
<Workbook xmlns="urn:schemas-microsoft-com:office:spreadsheet" xmlns:ss="urn:schemas-microsoft-com:office:spreadsheet">
<Styles><Style ss:ID="t"><Font ss:Bold="1" ss:Size="14" ss:Color="#1F4E78"/></Style><Style ss:ID="m"><Font ss:Italic="1" ss:Color="#595959"/></Style>
<Style ss:ID="h"><Font ss:Bold="1" ss:Color="#FFFFFF"/><Interior ss:Color="#1F4E78" ss:Pattern="Solid"/><Alignment ss:WrapText="1" ss:Horizontal="Center"/></Style>
<Style ss:ID="c"><Font ss:Bold="1" ss:Color="#1F4E78"/></Style><Style ss:ID="n"><NumberFormat ss:Format="#,##0.00"/></Style>
<Style ss:ID="s"><Font ss:Bold="1"/><Interior ss:Color="#E2EFDA" ss:Pattern="Solid"/></Style><Style ss:ID="sn"><Font ss:Bold="1"/><Interior ss:Color="#E2EFDA" ss:Pattern="Solid"/><NumberFormat ss:Format="&quot;$&quot;#,##0.00"/></Style></Styles>
<Worksheet ss:Name="Cuantias"><Table><Column ss:Width="150"/><Column ss:Width="160"/><Column ss:Width="330"/><Column ss:Width="50"/><Column ss:Width="55"/><Column ss:Width="70"/><Column ss:Width="70"/><Column ss:Width="85"/><Column ss:Width="110"/><Column ss:Width="60"/><Column ss:Width="110"/><Column ss:Width="60"/><Column ss:Width="260"/>
${rows}</Table><WorksheetOptions xmlns="urn:schemas-microsoft-com:office:excel"><FreezePanes/><SplitHorizontal>4</SplitHorizontal><TopRowBottomPane>4</TopRowBottomPane></WorksheetOptions></Worksheet></Workbook>`;
    return new Blob([xml], { type: "application/vnd.ms-excel" });
  }
  async function blobXLSX() {
    for (const u of XLSX_RUTAS) { try { const r = await fetch(u); if (r.ok) return await r.blob(); } catch (e) { } }
    throw new Error("No se encontró data/BASE_DE_DATOS_DION_completa.xlsx");
  }

  /* ───────── módulo ───────── */
  DION_MOD[K] = {
    titulo: "Base de datos de insumos y precios",
    sub: "Insumos · Código DION · Cuantías",
    render(el, ctx) {
      css();
      if (OFF) { try { OFF(); } catch (e) { } OFF = null; }
      let vivo = true, tSave = null, tq = null, VL = null, ROWS = [];
      const st = Object.assign({ items: [], precio: "ref", desp: true, confirmado: false }, ctx.get(K) || {});
      st.items = Array.isArray(st.items) ? st.items : [];
      const guardar = () => { clearTimeout(tSave); tSave = setTimeout(() => { tSave = null; if (vivo) ctx.set(K, JSON.parse(JSON.stringify(st))); }, 600); };
      el.innerHTML = `<div class="m-${K}"><div class="${P}load"><div style="text-align:center">${G.box}<div style="margin-top:12px">CARGANDO BASE DE INSUMOS…</div></div></div></div>`;
      const root = el.firstElementChild;

      const iniciar = () => {
        if (!vivo) return;
        const t0 = performance.now();
        indexar(); sync(); pintar();
        D().perf.abrirInsumos = +(performance.now() - t0).toFixed(1);
        OFF = D().on(onData);
      };
      if (window.DION_DATA && D().isReady()) iniciar();
      else servicio().then(s => s.ready()).then(iniciar).catch(e => {
        if (!vivo) return;
        root.innerHTML = `<div class="${P}load"><div style="text-align:center;max-width:420px;padding:20px"><div style="color:var(--warn)">NO SE PUDO CARGAR LA BASE</div>
<p style="font-family:var(--f-b);letter-spacing:0;color:var(--muted);font-size:13px">${esc(e.message)}. Verifica que existan <code>data/insumos.json</code> y <code>mods/datos.js</code>.</p>
<button class="${P}btn pri" data-a="retry">REINTENTAR</button></div></div>`;
        root.querySelector('[data-a="retry"]').onclick = () => DION_MOD[K].render(el, ctx);
      });

      /* las líneas de cuantías se mantienen al día con la base (código, precios, descripción) */
      function sync() {
        let cambio = false;
        const F = ["cod", "desc", "hoja", "unidad", "pref", "pA", "pB", "locA", "locB", "desp", "fuente"];
        st.items.forEach(l => {
          const r = D().getInsumo(l.id);
          if (!r) { if (!l.gone) { l.gone = true; cambio = true; } return; }
          if (l.gone) { delete l.gone; cambio = true; }
          F.forEach(k => { const v = k === "desp" ? (r.desp || 0) : r[k]; if (l[k] !== v) { l[k] = v; cambio = true; } });
        });
        if (cambio && DATA.length) guardar();
      }
      function onData(ev) {
        if (!vivo) return;
        if (ev.type === "cart") {
          clearTimeout(tSave); tSave = null;
          const s2 = ctx.get(K) || {}; st.items = Array.isArray(s2.items) ? s2.items : []; st.confirmado = !!s2.confirmado;
          if (s2.precio) st.precio = s2.precio; if ("desp" in s2) st.desp = s2.desp;
          sync(); medidores(); if (UI.tab === "car") vista(); else if (UI.tab === "cat" && VL) VL.refresh();
          return;
        }
        if (ev.type === "focus") {
          if (ev.mod !== K) return;
          UI.tab = "cat"; UI.hoja = "*"; UI.disc = "*"; UI.cat = "*"; UI.q = ev.cod || ""; UI.sel = ev.id || ""; UI.form = null;
          vista(); return;
        }
        indexar(); sync();
        if (UI.sel && !D().getInsumo(UI.sel)) UI.sel = "";
        medidores();
        const body = root.querySelector('[data-r="body"]'); if (!body) return;
        if (UI.tab === "cat") { lista(body, true); if (!UI.form) { if (UI.sel) ficha(body, D().getInsumo(UI.sel)); } }
        else vista();
        cabecera();
      }

      function enCarro(id) { return st.items.find(l => l.id === id); }
      function agregar(r, q) {
        const l = enCarro(r.id);
        if (l) l.q = (+l.q || 0) + (q || 1);
        else st.items.push({ id: r.id, cod: r.cod, desc: r.desc, hoja: r.hoja, unidad: r.unidad, pref: r.pref, pA: r.pA, pB: r.pB, locA: r.locA, locB: r.locB, desp: r.desp || 0, fuente: r.fuente, q: q || 1 });
        st.confirmado = false; guardar(); medidores();
        ctx.toast("Agregado a cuantías: " + String(r.desc).slice(0, 48));
      }

      function pintar() {
        root.innerHTML = `
<div class="${P}top">
  <div class="${P}brand">${G.box}<div><b>INSUMOS Y PRECIOS · GYE 2026</b><small data-r="sub"></small></div></div>
  <div class="${P}meters" data-r="meters"></div>
</div>
<div class="${P}tabs">
  <button class="${P}tab" data-t="cat">${G.cat}CATÁLOGO</button>
  <button class="${P}tab" data-t="cmp">${G.cmp}COMPARADOR A/B</button>
  <button class="${P}tab" data-t="car">${G.cart}CUANTÍAS <b data-r="nc">0</b></button>
  <button class="${P}tab" data-t="exp">${G.exp}EXPORTAR</button>
</div>
<div class="${P}body" data-r="body"></div>`;
        root.querySelectorAll(`.${P}tab`).forEach(b => b.onclick = () => { UI.tab = b.dataset.t; vista(); });
        cabecera(); vista();
      }
      function cabecera() {
        const m = root.querySelector('[data-r="meters"]'); if (!m) return;
        const ver = DATA.filter(r => !r.est).length, sin = DATA.filter(r => !D().getCode(r.cod)).length;
        m.innerHTML = `<div class="${P}meter"><i>ÍTEMS</i><span>${DATA.length}</span></div>
    <div class="${P}meter"><i>HOJAS</i><span>${HOJAS.length}</span></div>
    <div class="${P}meter ${ver ? "ok" : ""}"><i>VERIFICADOS</i><span>${ver}</span></div>
    ${sin ? `<div class="${P}meter" style="border-color:var(--warn)"><i>SIN CÓDIGO</i><span style="color:var(--warn)">${sin}</span></div>` : ""}
    <div class="${P}meter ok"><i>CUANTÍAS</i><span data-r="mt">$0</span></div>`;
        const s = root.querySelector('[data-r="sub"]'); if (s) s.textContent = `${HOJAS.length} hojas · vinculado a Codificación · Megametales / Kywi / Ferrisariato · USD`;
        medidores();
      }
      function medidores() {
        const c = calc(st), m = root.querySelector('[data-r="mt"]'), n = root.querySelector('[data-r="nc"]');
        if (m) m.textContent = "$" + Math.round(c.total).toLocaleString("es-EC");
        if (n) n.textContent = st.items.length;
      }
      function vista() {
        if (VL) { VL.destroy(); VL = null; }
        root.querySelectorAll(`.${P}tab`).forEach(b => b.classList.toggle("on", b.dataset.t === UI.tab));
        const body = root.querySelector('[data-r="body"]'); if (!body) return;
        body.onclick = null;
        if (UI.tab === "cat") vCat(body); else if (UI.tab === "cmp") vCmp(body); else if (UI.tab === "car") { sync(); vCar(body); } else vExp(body);
        medidores();
      }
      function angosto() { return root.clientWidth < 860; }

      /* ── catálogo (lista virtualizada) ── */
      function vCat(body) {
        const hoja = HOJAS.find(h => h.n === UI.hoja);
        const cats = hoja ? [...hoja.cats.keys()] : [];
        body.innerHTML = `<div class="${P}main">
  <div class="${P}bar">
    <label class="${P}srch">${G.cat}<input data-r="q" type="search" placeholder="Buscar: PPR 25, THHN 12, IS-D20-TAF, breaker 2P…" value="${esc(UI.q)}" autocomplete="off"></label>
    <button class="${P}btn pri" data-a="nuevo">${G.plus}ÍTEM</button>
    <select class="${P}sel" data-r="hoja" aria-label="Hoja"><option value="*">Todas las hojas (${HOJAS.length})</option>${HOJAS.map(h => `<option value="${esc(h.n)}"${h.n === UI.hoja ? " selected" : ""}>${esc(h.n)} · ${h.c}</option>`).join("")}</select>
    <select class="${P}sel" data-r="disc" aria-label="Disciplina"><option value="*">Todas las disciplinas</option>${DISCS.map(d => `<option value="${esc(d.c)}"${d.c === UI.disc ? " selected" : ""}>${esc(d.c)} · ${esc(d.n)} (${d.k})</option>`).join("")}</select>
    <select class="${P}sel" data-r="cat" aria-label="Categoría"${hoja ? "" : " disabled"}><option value="*">${hoja ? "Todas las categorías" : "Categoría (elige hoja)"}</option>${cats.map(c => `<option value="${esc(c)}"${c === UI.cat ? " selected" : ""}>${esc(c)}</option>`).join("")}</select>
  </div>
  <div class="${P}cnt" data-r="cnt"></div>
  <div class="${P}list" data-r="list"></div>
</div><div class="${P}side vacio" data-r="side">SELECCIONA UN ÍTEM PARA VER SU FICHA</div>`;
        const qi = body.querySelector('[data-r="q"]');
        qi.addEventListener("input", () => { clearTimeout(tq); tq = setTimeout(() => { UI.q = qi.value; lista(body); }, 110); });
        body.querySelector('[data-r="hoja"]').onchange = e => { UI.hoja = e.target.value; UI.cat = "*"; vCat(body); };
        body.querySelector('[data-r="disc"]').onchange = e => { UI.disc = e.target.value; lista(body); };
        body.querySelector('[data-r="cat"]').onchange = e => { UI.cat = e.target.value; lista(body); };
        body.querySelector('[data-a="nuevo"]').onclick = () => formIns(body, null);
        const L = body.querySelector('[data-r="list"]');
        VL = D().vlist(L, { rowH: () => angosto() ? 66 : 54, n: 0, row: fila });
        L.onclick = e => {
          const a = e.target.closest("[data-add]");
          if (a) { e.stopPropagation(); const r = D().getInsumo(a.dataset.add); if (r) { agregar(r, 1); a.classList.add("in"); a.innerHTML = G.chk; } return; }
          const row = e.target.closest("[data-id]");
          if (row) { UI.sel = row.dataset.id; UI.form = null; L.querySelectorAll(`.${P}row.on`).forEach(x => x.classList.remove("on")); row.classList.add("on"); ficha(body, D().getInsumo(UI.sel)); }
        };
        lista(body);
        if (UI.form) formIns(body, UI.form === "new" ? null : D().getInsumo(UI.form));
        else if (UI.sel && D().getInsumo(UI.sel)) { ficha(body, D().getInsumo(UI.sel)); const i = ROWS.findIndex(x => x.r && x.r.id === UI.sel); if (i > 4) VL.scrollTo(i); }
      }
      function fila(i) {
        const x = ROWS[i]; if (!x) return "";
        if (x.g) return `<div class="${P}grp">${esc(x.g)}<span>${x.n}</span></div>`;
        const r = x.r, mx = Math.max(+r.pA || 0, +r.pB || 0) || 1, inC = !!enCarro(r.id), cod = D().getCode(r.cod);
        return `<div class="${P}row${r.id === UI.sel ? " on" : ""}" data-id="${esc(r.id)}">
  <div class="${P}cod">${esc(r.cod || "—")}${!cod ? `<em class="bad">SIN CÓDIGO</em>` : r._u ? "<em>MÍO</em>" : r.nuevo ? "<em>NUEVO</em>" : ""}</div>
  <div class="${P}desc"><b>${esc(r.desc)}</b><small>${esc(r.fam || r.cat)} · ${esc(r.amb || r.subcat)}</small></div>
  <div class="${P}ab"><div><i style="width:${Math.round(56 * (+r.pA || 0) / mx)}px"></i>A $${$(r.pA)}</div><div><i style="width:${Math.round(56 * (+r.pB || 0) / mx)}px"></i>B $${$(r.pB)}</div></div>
  <div class="${P}pr">$${$(r.pref)}<small>/ ${esc(r.unidad)} ${r.est ? `<b style="color:var(--warn)">EST.</b>` : `<b style="color:var(--done)">VERIF.</b>`}</small></div>
  <button class="${P}add${inC ? " in" : ""}" data-add="${esc(r.id)}" aria-label="Agregar a cuantías">${inC ? G.chk : G.plus}</button>
</div>`;
      }
      function lista(body, keep) {
        const t0 = performance.now();
        const rs = filtrar(), L = body.querySelector('[data-r="list"]');
        ROWS = []; let g = null;
        const cnt = new Map(); rs.forEach(r => { const k = r.hoja + " › " + r.cat; cnt.set(k, (cnt.get(k) || 0) + 1); });
        for (const r of rs) { const k = r.hoja + " › " + r.cat; if (k !== g) { g = k; ROWS.push({ g: UI.hoja === "*" ? k : r.cat, n: cnt.get(k) }); } ROWS.push({ r }); }
        if (VL) VL.set(ROWS.length, fila, !!keep);
        const c = body.querySelector('[data-r="cnt"]');
        if (c) c.innerHTML = rs.length ? `${rs.length} ítem(s)${UI.q ? " · «" + esc(UI.q) + "»" : ""}` : `<span style="color:var(--warn)">SIN RESULTADOS · prueba otra búsqueda o crea el ítem con ＋ ÍTEM</span>`;
        D().perf.filtrarInsumos = +(performance.now() - t0).toFixed(1);
      }

      /* ── ficha del ítem ── */
      function lado(body) { const S = body.querySelector('[data-r="side"]'); if (S) { S.classList.remove("vacio"); S.onclick = null; S.oninput = null; S.onchange = null; S.scrollTop = 0; } return S; }
      function cerrarLado(body) {
        UI.sel = ""; UI.form = null;
        const S = body.querySelector('[data-r="side"]'); if (!S) return;
        S.onclick = null; S.oninput = null; S.onchange = null;
        S.classList.add("vacio"); S.innerHTML = "SELECCIONA UN ÍTEM PARA VER SU FICHA";
        body.querySelectorAll(`.${P}row.on`).forEach(x => x.classList.remove("on"));
      }
      function ficha(body, r, conf) {
        const S = lado(body); if (!S || !r) return;
        const mx = Math.max(+r.pref, +r.pA, +r.pB) || 1, mn = Math.min(+r.pA || Infinity, +r.pB || Infinity), dif = r.pA ? ((r.pB - r.pA) / r.pA * 100) : 0;
        const l = enCarro(r.id); let q = l ? +l.q : (r.cant > 0 ? r.cant : 1);
        const cod = D().getCode(r.cod), otros = cod ? D().byCode(r.cod).insumos.length - 1 : 0;
        S.innerHTML = `<button class="${P}x" data-a="cls" aria-label="Cerrar">${G.x}</button>
<div class="${P}card${cod ? "" : " warn"}"><div class="${P}lbl">CÓDIGO DION · TYPE MARK / KEYNOTE ${cod ? `<span class="${P}tag ok">${G.link}VINCULADO</span>` : `<span class="${P}tag">SIN CÓDIGO</span>`}</div>
  <div class="${P}big">${esc(r.cod || "—")}</div>
  <div class="${P}note" style="margin:4px 0 0">${cod ? `${esc(cod.n)}<br><span style="color:var(--faint)">${esc(cod.disc)} · ${esc(cod.sis)} ${esc(cod.sisN)} · ${esc(cod.famN)}${otros > 0 ? ` · otros ${otros} insumo(s) usan este código` : ""}</span>` : `Este código no existe en Codificación (fue eliminado o renombrado). Toca EDITAR y elige otro.`}</div>
  <div style="margin:10px 0 2px;font-weight:600">${esc(r.desc)}</div>
  <dl class="${P}kv"><dt>Disciplina</dt><dd>${esc(r.dc)} · ${esc(r.disc)}</dd><dt>Hoja</dt><dd>${esc(r.hoja)}</dd><dt>Categoría</dt><dd>${esc(r.cat)}</dd><dt>Subcategoría</dt><dd>${esc(r.subcat || "—")}</dd><dt>Familia</dt><dd>${esc(r.fam || "—")}</dd><dt>Ámbito</dt><dd>${esc(r.amb || "—")}</dd><dt>Unidad</dt><dd>${esc(r.unidad)}</dd><dt>Desperdicio</dt><dd>${r.desp ? r.desp + " %" : "—"}</dd></dl>
  <div class="${P}acts"><button class="${P}btn" data-a="edit">${G.pen}EDITAR</button>${cod ? `<button class="${P}btn pri" data-a="cod">${G.code}VER CÓDIGO</button>` : ""}<button class="${P}btn warn" data-a="del">${G.trash}ELIMINAR</button></div>
  ${conf ? `<div class="${P}conf"><b>¿ELIMINAR ESTE ÍTEM DE LA BASE?</b><br>${l ? "Está en tus cuantías: la línea quedará marcada «eliminado de la base». " : ""}El código ${esc(r.cod)} no se borra.<div class="${P}acts"><button class="${P}btn warn" data-a="delok">${G.trash}SÍ, ELIMINAR</button><button class="${P}btn" data-a="delno">CANCELAR</button></div></div>` : ""}
</div>
<div class="${P}card ${r.est ? "warn" : ""}"><div class="${P}lbl">PRECIO · USD SIN IVA <span class="${P}tag ${r.est ? "" : "ok"}">${r.est ? "ESTIMADO · POR VERIFICAR" : r.verif ? "VERIFICADO " + esc(fecha(r.verif)) : "FUENTE REAL"}</span></div>
  <div class="${P}pbar r"><b>REF.</b><div class="t"><i style="width:${100 * (+r.pref || 0) / mx}%"></i></div><span>$${$(r.pref)}</span></div>
  <div class="${P}pbar"><b title="${esc(r.locA)}">A</b><div class="t"><i style="width:${100 * (+r.pA || 0) / mx}%"></i></div><span>$${$(r.pA)}</span></div>
  <div class="${P}pbar b"><b title="${esc(r.locB)}">B</b><div class="t"><i style="width:${100 * (+r.pB || 0) / mx}%"></i></div><span>$${$(r.pB)}</span></div>
  <p class="${P}note">A: <b>${esc(r.locA || "—")}</b> · B: <b>${esc(r.locB || "—")}</b>${isFinite(mn) ? `<br>Mejor precio: <b style="color:var(--done)">$${$(mn)}</b> en ${r.pA <= r.pB ? esc(r.locA || "local A") : esc(r.locB || "local B")} · diferencia B vs A ${dif >= 0 ? "+" : ""}${dif.toFixed(1)} %` : ""}</p>
  <p class="${P}note" style="font-size:11px">Fuente: ${esc(r.fuente)} · ${esc(r.fecha)}</p>
  <div class="${P}acts" style="align-items:center">${r.verif ? `<button class="${P}btn" data-a="unver">QUITAR VERIFICACIÓN</button>` : `<input type="date" class="${P}sel" data-r="fv" value="${hoy()}" style="flex:0 1 170px;font-family:var(--f-m)" aria-label="Fecha de verificación"><button class="${P}btn ok" data-a="ver">${G.chk}MARCAR VERIFICADO</button>`}</div>
</div>
<div class="${P}card"><div class="${P}lbl">AGREGAR A CUANTÍAS DEL PROYECTO</div>
  <div style="display:flex;gap:8px;align-items:center;flex-wrap:wrap">
    <div class="${P}step"><button data-a="mn" aria-label="Menos">${G.minus}</button><input data-r="qq" inputmode="decimal" value="${q}"><button data-a="pl" aria-label="Más">${G.plus}</button></div>
    <span style="color:var(--muted)">${esc(r.unidad)}</span>
    <button class="${P}btn ok" data-a="add">${G.cart}${l ? "ACTUALIZAR" : "AGREGAR"}</button>
  </div>
  <p class="${P}note" data-r="pv">≈ $${$(q * r.pref)} (P. ref.) · ${esc(ctx.P && ctx.P.nombre || "Proyecto")}</p>
</div>`;
        const qi = S.querySelector('[data-r="qq"]'), pv = S.querySelector('[data-r="pv"]');
        const upd = () => { q = Math.max(0, parseFloat(String(qi.value).replace(",", ".")) || 0); pv.textContent = "≈ $" + $(q * r.pref) + " (P. ref.)"; };
        qi.oninput = upd;
        S.onclick = e => {
          const a = e.target.closest("[data-a]"); if (!a) return;
          const k = a.dataset.a;
          if (k === "cls") cerrarLado(body);
          else if (k === "mn") { qi.value = Math.max(0, (parseFloat(qi.value) || 0) - 1); upd(); }
          else if (k === "pl") { qi.value = (parseFloat(qi.value) || 0) + 1; upd(); }
          else if (k === "add") {
            upd(); const ex = enCarro(r.id);
            if (ex) { ex.q = q; st.confirmado = false; guardar(); medidores(); ctx.toast("Cantidad actualizada"); } else agregar(r, q);
            const b = body.querySelector(`[data-add="${CSS.escape(r.id)}"]`); if (b) { b.classList.add("in"); b.innerHTML = G.chk; }
            a.innerHTML = G.cart + "ACTUALIZAR";
          }
          else if (k === "cod") { D().emit({ type: "focus", mod: "codificacion", cod: r.cod }); ctx.open("codificacion"); }
          else if (k === "edit") formIns(body, r);
          else if (k === "del") ficha(body, r, true);
          else if (k === "delno") ficha(body, r, false);
          else if (k === "delok") { D().deleteInsumo(r.id); cerrarLado(body); ctx.toast("Ítem eliminado de la base"); }
          else if (k === "ver") { const f = (S.querySelector('[data-r="fv"]') || {}).value || hoy(); D().upsertInsumo({ id: r.id, verif: f, fecha: fecha(f) }); ctx.toast("Precio marcado como verificado (" + fecha(f) + ")"); }
          else if (k === "unver") { D().upsertInsumo({ id: r.id, verif: "" }); }
        };
      }

      /* ── formulario: crear / editar ítem, con selector de Código DION ── */
      function formIns(body, r) {
        const S = lado(body); if (!S) return;
        UI.form = r ? r.id : "new";
        const v = r ? Object.assign({}, r) : { cod: "", desc: "", hoja: UI.hoja !== "*" ? UI.hoja : "", cat: UI.cat !== "*" ? UI.cat : "", fam: "", unidad: "U", pref: "", pA: "", locA: "", pB: "", locB: "", desp: 0, verif: "" };
        let crear = false;
        const cats = [...new Set(DATA.map(x => x.cat))].sort();
        S.innerHTML = `<button class="${P}x" data-a="cls" aria-label="Cerrar">${G.x}</button>
<form class="${P}card" data-r="frm" autocomplete="off"><div class="${P}lbl">${r ? "EDITAR ÍTEM" : "NUEVO ÍTEM DE LA BASE"}</div>
<label class="${P}f"><i>CÓDIGO DION (VINCULA CON CODIFICACIÓN)</i>
  <div class="${P}combo"><input class="mono" data-k="cod" placeholder="Busca: muro bloque, IS-D20-TAF, THHN…" value="${esc(v.cod)}" role="combobox" aria-expanded="false"><div class="${P}dd" data-r="dd" hidden></div></div></label>
<div class="${P}note" data-r="cinfo" style="margin-top:-4px"></div>
<label class="${P}f"><i>DESCRIPCIÓN *</i><input data-k="desc" value="${esc(v.desc)}" placeholder="Tubo PVC presión 1/2&quot; x 6 m"></label>
<div class="${P}f2"><label class="${P}f"><i>HOJA</i><input data-k="hoja" list="${P}dl-h" value="${esc(v.hoja)}" placeholder="Instalaciones Sanitarias"></label>
<label class="${P}f"><i>CATEGORÍA</i><input data-k="cat" list="${P}dl-c" value="${esc(v.cat)}" placeholder="TUBERÍAS"></label></div>
<datalist id="${P}dl-h">${HOJAS.map(h => `<option value="${esc(h.n)}">`).join("")}</datalist><datalist id="${P}dl-c">${cats.map(c => `<option value="${esc(c)}">`).join("")}</datalist>
<div class="${P}f2"><label class="${P}f"><i>FAMILIA / GRUPO</i><input data-k="fam" value="${esc(v.fam)}"></label>
<label class="${P}f"><i>UNIDAD</i><input data-k="unidad" value="${esc(v.unidad)}" list="${P}dl-u"></label></div>
<datalist id="${P}dl-u"><option value="U"><option value="m"><option value="m²"><option value="m³"><option value="kg"><option value="gl"><option value="saco"><option value="rollo"></datalist>
<div class="${P}f3"><label class="${P}f"><i>P. REF. $</i><input data-k="pref" inputmode="decimal" value="${esc(v.pref)}"></label>
<label class="${P}f"><i>P. A $</i><input data-k="pA" inputmode="decimal" value="${esc(v.pA)}"></label>
<label class="${P}f"><i>P. B $</i><input data-k="pB" inputmode="decimal" value="${esc(v.pB)}"></label></div>
<div class="${P}f2"><label class="${P}f"><i>LOCAL A</i><input data-k="locA" value="${esc(v.locA)}" placeholder="Megametales"></label>
<label class="${P}f"><i>LOCAL B</i><input data-k="locB" value="${esc(v.locB)}" placeholder="Kywi"></label></div>
<div class="${P}f2"><label class="${P}f"><i>DESPERDICIO %</i><input data-k="desp" inputmode="decimal" value="${esc(v.desp || 0)}"></label>
<label class="${P}f"><i>PRECIO VERIFICADO (FECHA)</i><input type="date" data-k="verif" value="${esc(v.verif || "")}"></label></div>
<div class="${P}msg" data-r="msg"></div>
<div class="${P}acts"><button type="submit" class="${P}btn ok">${G.chk}${r ? "GUARDAR" : "CREAR ÍTEM"}</button><button type="button" class="${P}btn" data-a="cancel">CANCELAR</button></div>
<p class="${P}note">Precios sin IVA en USD. Si no pones fecha de verificación queda como <b style="color:var(--warn)">ESTIMADO · POR VERIFICAR</b>.</p>
</form>`;
        const q = k => S.querySelector(`[data-k="${k}"]`), dd = S.querySelector('[data-r="dd"]'), ci = S.querySelector('[data-r="cinfo"]'), msg = S.querySelector('[data-r="msg"]'), ic = q("cod");
        const info = () => {
          const c = ic.value.trim().toUpperCase(), o = D().getCode(c);
          crear = false;
          if (!c) ci.innerHTML = `<span style="color:var(--warn)">Sin código: el ítem no quedará vinculado.</span>`;
          else if (o && !o.tip) ci.innerHTML = `<span style="color:var(--done)">✓ ${esc(o.n)}</span> · ${esc(o.disc)} ${esc(o.sis)} · ${o.vinc} insumo(s) vinculados`;
          else { const err = D().validate(c); if (err) ci.innerHTML = `<span style="color:var(--warn)">${esc(err)}</span>`; else { crear = true; ci.innerHTML = `<span style="color:var(--acc)">＋ Se creará el código nuevo ${esc(c)} en Codificación.</span>`; } }
        };
        let tc = null, act = -1, opts = [];
        const abrir = () => {
          const t = nrm(ic.value).split(/\s+/).filter(Boolean), C = D().codes(); opts = [];
          for (const c of C) { if (c.tip) continue; let ok = true; for (const x of t) if (!c.h.includes(x)) { ok = false; break; } if (ok) { opts.push(c); if (opts.length >= 30) break; } }
          const up = ic.value.trim().toUpperCase(), nuevo = up && !D().getCode(up) && !D().validate(up);
          dd.innerHTML = opts.map((c, i) => `<button type="button" data-o="${i}"><code>${esc(c.cod)}</code><span>${esc(c.n)}</span></button>`).join("") +
            (nuevo ? `<button type="button" data-o="new" class="nw">＋ CREAR CÓDIGO NUEVO <code>${esc(up)}</code></button>` : (!opts.length ? `<div class="hint">Sin coincidencias. Escribe un código completo (DISC-SIS-FAM-VAR) para crearlo.</div>` : ""));
          dd.hidden = false; ic.setAttribute("aria-expanded", "true"); act = -1;
        };
        const cerrar = () => { dd.hidden = true; ic.setAttribute("aria-expanded", "false"); };
        const elegir = o => { if (o === "new") ic.value = ic.value.trim().toUpperCase(); else if (opts[o]) { ic.value = opts[o].cod; if (!q("desc").value.trim()) q("desc").value = opts[o].n; if (!r && q("unidad").value === "U" && opts[o].unidad) q("unidad").value = opts[o].unidad; } cerrar(); info(); };
        ic.addEventListener("input", () => { clearTimeout(tc); tc = setTimeout(abrir, 80); info(); });
        ic.addEventListener("focus", abrir);
        ic.addEventListener("keydown", e => {
          const bs = [...dd.querySelectorAll("[data-o]")]; if (!bs.length) return;
          if (e.key === "ArrowDown" || e.key === "ArrowUp") { e.preventDefault(); act = (act + (e.key === "ArrowDown" ? 1 : -1) + bs.length) % bs.length; bs.forEach((b, i) => b.classList.toggle("on", i === act)); bs[act].scrollIntoView({ block: "nearest" }); }
          else if (e.key === "Enter" && act >= 0) { e.preventDefault(); elegir(bs[act].dataset.o); }
          else if (e.key === "Escape") cerrar();
        });
        dd.addEventListener("mousedown", e => e.preventDefault());
        dd.addEventListener("click", e => { const b = e.target.closest("[data-o]"); if (b) elegir(b.dataset.o); });
        ic.addEventListener("blur", () => setTimeout(cerrar, 120));
        info();
        S.onclick = e => { const a = e.target.closest("[data-a]"); if (!a) return; if (a.dataset.a === "cls") cerrarLado(body); else if (a.dataset.a === "cancel") { UI.form = null; if (r) ficha(body, D().getInsumo(r.id)); else cerrarLado(body); } };
        S.querySelector('[data-r="frm"]').onsubmit = e => {
          e.preventDefault();
          const g = k => q(k).value.trim(), n = k => +(String(q(k).value).replace(",", ".")) || 0;
          const cod = g("cod").toUpperCase();
          if (!g("desc")) { msg.textContent = "Escribe la descripción."; return; }
          if (cod && !D().getCode(cod)) { const err = D().validate(cod); if (err) { msg.textContent = "Código: " + err; return; } }
          try {
            if (cod && !D().getCode(cod)) D().upsertCode({ cod, n: g("desc"), unidad: g("unidad") || "U", origen: "insumos", nota: "Creado desde la base de insumos" });
            const c = D().getCode(cod);
            const pref = n("pref") || Math.min(n("pA") || Infinity, n("pB") || Infinity);
            const obj = { cod, desc: g("desc"), hoja: g("hoja") || "Mis insumos", cat: g("cat") || "GENERAL", fam: g("fam"), unidad: g("unidad") || "U",
              pref: isFinite(pref) ? pref : 0, pA: n("pA"), pB: n("pB"), locA: g("locA"), locB: g("locB"), desp: n("desp"), verif: g("verif") };
            if (c) { obj.dc = c.disc; obj.disc = c.discN; }
            if (obj.verif) obj.fecha = fecha(obj.verif);
            if (r) { obj.id = r.id; if (["pref", "pA", "pB"].some(k => +r[k] !== obj[k])) { obj.fuente = "Editado por el usuario"; if (!obj.verif) obj.fecha = fecha(hoy()) + " (est.)"; } }
            const res = D().upsertInsumo(obj);
            UI.form = null; UI.sel = res.id;
            if (UI.hoja !== "*" && UI.hoja !== res.hoja) { UI.hoja = "*"; UI.cat = "*"; }
            vCat(body);
            ctx.toast(r ? "Ítem actualizado" : "Ítem creado y vinculado a " + (cod || "—"));
          } catch (er) { msg.textContent = er.message; }
        };
        setTimeout(() => { if (!angosto()) (r ? q("desc") : ic).focus(); }, 30);
      }

      /* ── comparador ── */
      function vCmp(body) {
        const base = UI.cmpHoja === "*" ? DATA : DATA.filter(r => r.hoja === UI.cmpHoja);
        const per = HOJAS.map(h => {
          const rs = DATA.filter(r => r.hoja === h.n && r.pA > 0 && r.pB > 0);
          const d = rs.reduce((a, r) => a + (r.pB - r.pA) / r.pA, 0) / (rs.length || 1) * 100;
          return { n: h.n, d, aMej: rs.filter(r => r.pA < r.pB).length, k: rs.length };
        });
        const mx = Math.max(...per.map(p => Math.abs(p.d)), 1);
        const top = base.filter(r => r.pA > 0 && r.pB > 0).map(r => ({ r, ah: Math.abs(r.pB - r.pA) })).sort((a, b) => b.ah - a.ah).slice(0, 25);
        const c = calc(st), cA = calc(Object.assign({}, st, { precio: "a" })), cB = calc(Object.assign({}, st, { precio: "b" })), cM = calc(Object.assign({}, st, { precio: "min" }));
        body.innerHTML = `<div class="${P}grid">
<div class="${P}kpis">
  <div class="${P}kpi"><i>CUANTÍAS · LOCAL A</i><b>$${$(cA.total)}</b></div>
  <div class="${P}kpi"><i>CUANTÍAS · LOCAL B</i><b>$${$(cB.total)}</b></div>
  <div class="${P}kpi ok"><i>MEJOR MEZCLA A/B</i><b>$${$(cM.total)}</b></div>
  <div class="${P}kpi ok"><i>AHORRO VS PEOR</i><b>$${$(Math.max(cA.total, cB.total) - cM.total)}</b></div>
</div>
<p class="${P}note">Totales con IVA 15 % de los ítems en Cuantías (${st.items.length}). Precios ESTIMADOS por verificar con cotización. ${c.lines.length ? "" : "Agrega ítems desde el Catálogo para comparar tu proyecto."}</p>
<div class="${P}card"><div class="${P}lbl">DIFERENCIA PROMEDIO LOCAL B vs LOCAL A POR HOJA <span style="color:var(--faint)">← A más caro · B más caro →</span></div>
${per.map(p => `<div class="${P}hbar"><div style="min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">${esc(p.n)}</div><div class="t"><i class="${p.d < 0 ? "neg" : ""}" style="${p.d < 0 ? `left:${50 - 50 * Math.abs(p.d) / mx}%;width:${50 * Math.abs(p.d) / mx}%` : `width:${50 * p.d / mx}%`}"></i></div><span>${p.d >= 0 ? "+" : ""}${p.d.toFixed(1)}%</span></div>`).join("")}
</div>
<div class="${P}card"><div class="${P}lbl">MAYORES DIFERENCIAS ABSOLUTAS
  <select class="${P}sel" data-r="ch" style="max-width:260px;flex:none;min-height:40px">${["*", ...HOJAS.map(h => h.n)].map(n => `<option value="${esc(n)}"${n === UI.cmpHoja ? " selected" : ""}>${n === "*" ? "Todas las hojas" : esc(n)}</option>`).join("")}</select></div>
<div style="overflow:auto"><table class="${P}tbl"><thead><tr><th>Ítem</th><th class="hm">Código</th><th>A</th><th>B</th><th>Δ</th></tr></thead><tbody>
${top.map(({ r, ah }) => `<tr><td>${esc(r.desc)}</td><td class="hm" style="font-family:var(--f-m);font-size:11px;color:var(--acc)">${esc(r.cod)}</td><td class="n"${r.pA <= r.pB ? ' style="color:var(--done)"' : ""}>$${$(r.pA)}</td><td class="n"${r.pB < r.pA ? ' style="color:var(--done)"' : ""}>$${$(r.pB)}</td><td class="n">$${$(ah)}</td></tr>`).join("")}
</tbody></table></div></div></div>`;
        body.querySelector('[data-r="ch"]').onchange = e => { UI.cmpHoja = e.target.value; vCmp(body); };
      }

      /* ── carrito de cuantías ── */
      function vCar(body) {
        const c = calc(st);
        if (!st.items.length) {
          body.innerHTML = `<div class="${P}grid"><div class="${P}empty">${G.cart}SIN CUANTÍAS TODAVÍA<br><br><span style="font-family:var(--f-b);letter-spacing:0;font-size:13px;color:var(--muted)">Busca insumos en el Catálogo y toca + para agregarlos al proyecto ${esc(ctx.P && ctx.P.nombre || "")}.</span><br><br><button class="${P}btn pri" data-a="go">${G.cat}IR AL CATÁLOGO</button></div></div>`;
          body.querySelector('[data-a="go"]').onclick = () => { UI.tab = "cat"; vista(); };
          return;
        }
        let rows = "";
        c.porHoja.forEach((h, hoja) => {
          rows += `<tr class="sub"><td colspan="3">${esc(hoja.toUpperCase())}</td><td class="n" colspan="2">$${$(h.sub)}</td></tr>`;
          h.lines.forEach(l => {
            const i = st.items.findIndex(x => x.id === l.id);
            rows += `<tr class="${l.gone ? "gone" : ""}"><td><div style="font-weight:500">${esc(l.desc)}</div><div style="font-family:var(--f-m);font-size:10.5px;color:var(--acc)">${esc(l.cod)}</div></td>
<td><div class="${P}step"><button data-m="${i}" aria-label="Menos">${G.minus}</button><input data-q="${i}" inputmode="decimal" value="${l.q}"><button data-p="${i}" aria-label="Más">${G.plus}</button></div></td>
<td class="n hm">${esc(l.unidad)}${st.desp && l.desp ? `<br><small style="color:var(--faint)">+${l.desp}% → ${num(l.qd)}</small>` : ""}</td>
<td class="n hm">$${$(l.pu)}</td><td class="n">$${$(l.sub)}</td><td><button class="${P}add" data-del="${i}" aria-label="Quitar" style="color:var(--warn)">${G.trash}</button></td></tr>`;
          });
        });
        body.innerHTML = `<div class="${P}grid">
<div style="display:flex;flex-wrap:wrap;gap:8px;align-items:center;margin:2px 0 10px">
  <div class="${P}seg" data-r="modo">${Object.entries(MODOS).map(([k, n]) => `<button data-modo="${k}" class="${(st.precio || "ref") === k ? "on" : ""}">${n}</button>`).join("")}</div>
  <div class="${P}seg"><button data-a="desp" class="${st.desp ? "on" : ""}">${st.desp ? "✓ " : ""}DESPERDICIO %</button></div>
  <span style="flex:1"></span>
  <button class="${P}btn" data-a="csv">${G.csv}CSV</button><button class="${P}btn" data-a="xls">${G.xls}EXCEL</button><button class="${P}btn warn" data-a="vac">${G.trash}VACIAR</button>
</div>
<div class="${P}card ${st.confirmado ? "" : "warn"}"><div class="${P}lbl">PRESUPUESTO REFERENCIAL · PREDISEÑO · ${esc(ctx.P && ctx.P.nombre || "PROYECTO")} <span class="${P}tag ${st.confirmado ? "ok" : ""}">${st.confirmado ? "CONFIRMADO" : "POR VERIFICAR"}</span></div>
  <div class="${P}tot"><span>Subtotal (${st.items.length} ítems · ${MODOS[st.precio || "ref"]})</span><span>$${$(c.base)}</span><span>IVA 15 % (Ecuador)</span><span>$${$(c.iva)}</span><span><b>TOTAL</b></span><span class="g">$${$(c.total)}</span></div>
  <p class="${P}note">Precios estimados de mercado Guayaquil 2026 (sin cotización verificada). Cantidades del usuario; desperdicio según columna "Rendimiento / desperdicio %" de la base.</p>
  ${st.confirmado ? "" : `<button class="${P}btn ok" data-a="conf">${G.chk}CONFIRMAR</button>`}
</div>
<div style="overflow:auto"><table class="${P}tbl"><thead><tr><th>Ítem / Código DION</th><th>Cant.</th><th class="hm">Unidad</th><th class="hm">P. Unit.</th><th>Subtotal</th><th></th></tr></thead><tbody>${rows}</tbody></table></div>
</div>`;
        const re = () => { st.confirmado = false; guardar(); vCar(body); medidores(); };
        body.onclick = e => {
          const t = e.target.closest("button"); if (!t) return;
          if (t.dataset.modo) { st.precio = t.dataset.modo; return re(); }
          if (t.dataset.m != null) { const l = st.items[+t.dataset.m]; l.q = Math.max(0, (+l.q || 0) - 1); return re(); }
          if (t.dataset.p != null) { const l = st.items[+t.dataset.p]; l.q = (+l.q || 0) + 1; return re(); }
          if (t.dataset.del != null) { st.items.splice(+t.dataset.del, 1); return re(); }
          const a = t.dataset.a;
          if (a === "desp") { st.desp = !st.desp; re(); }
          else if (a === "vac") { if (confirm("¿Vaciar todas las cuantías del proyecto?")) { st.items = []; re(); } }
          else if (a === "conf") { st.confirmado = true; ctx.set(K, JSON.parse(JSON.stringify(st))); vCar(body); }
          else if (a === "csv") ctx.download(nombre("csv"), expCSV(st, ctx.P || {}));
          else if (a === "xls") ctx.download(nombre("xls"), expXLS(st, ctx.P || {}));
        };
        body.querySelectorAll("[data-q]").forEach(inp => inp.onchange = () => { st.items[+inp.dataset.q].q = Math.max(0, parseFloat(String(inp.value).replace(",", ".")) || 0); re(); });
      }
      const nombre = ext => "Cuantias_" + String((ctx.P && ctx.P.nombre) || "proyecto").normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/[^A-Za-z0-9]+/g, "_").replace(/^_|_$/g, "") + "." + ext;

      /* ── exportar ── */
      function vExp(body) {
        body.innerHTML = `<div class="${P}grid"><div class="${P}exp">
  <button class="${P}btn" data-x="xlsx"><b>${G.db}BASE COMPLETA (.XLSX)</b>Libro "BASE_DE_DATOS_DION_completa.xlsx": ${HOJAS.length} hojas con jerarquía, degradé, fórmulas, índice enlazado, Código DION, fuente y fecha de precio.</button>
  <button class="${P}btn" data-x="xls"><b>${G.xls}CUANTÍAS (.XLS)</b>Excel (SpreadsheetML) con las cuantías del proyecto, subtotal por hoja, IVA 15 % y total. ${st.items.length} ítems.</button>
  <button class="${P}btn" data-x="csv"><b>${G.csv}CUANTÍAS (.CSV)</b>Separado por punto y coma (Excel en español). Ideal para APU o importar a otra hoja.</button>
  <button class="${P}btn" data-x="json"><b>${G.code}INSUMOS (.JSON)</b>Catálogo completo (${DATA.length} ítems) para Dynamo / Python: cod, desc, hoja, cat, unidad, precios A/B.</button>
</div>
<p class="${P}note">Los códigos DION enlazan con la sala Codificación (Type Mark / DION_Codigo / Keynote en Revit). Los códigos creados desde esta base están marcados <b>origen: excel</b> en data/codigos.json y deben verificarse.</p></div>`;
        body.onclick = async e => {
          const b = e.target.closest("[data-x]"); if (!b) return;
          const k = b.dataset.x;
          try {
            if (k === "xlsx") { ctx.toast("Preparando base completa…"); ctx.download("BASE_DE_DATOS_DION_completa.xlsx", await blobXLSX()); }
            else if (k === "xls") ctx.download(nombre("xls"), expXLS(st, ctx.P || {}));
            else if (k === "csv") ctx.download(nombre("csv"), expCSV(st, ctx.P || {}));
            else if (k === "json") ctx.download("insumos.json", new Blob([JSON.stringify(DATA.map(({ h, i, id, est, _u, ...r }) => r))], { type: "application/json" }));
          } catch (err) { ctx.toast("No se pudo exportar: " + err.message); }
        };
      }

      return () => { vivo = false; clearTimeout(tq); if (tSave) { clearTimeout(tSave); ctx.set(K, JSON.parse(JSON.stringify(st))); } if (VL) VL.destroy(); if (OFF) { OFF(); OFF = null; } };
    }
  };
})();
