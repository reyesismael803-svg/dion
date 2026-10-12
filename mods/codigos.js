/* DION · Módulo "codificacion" — Codificación BIM de elementos para Revit 2027 (Ecuador · ISO 19650)
   Datos: servicio compartido window.DION_DATA (mods/datos.js → data/codigos.json + data/insumos.json + capa de cambios del usuario).
   Los códigos están VINCULADOS a los insumos (campo cod): editar/renombrar/eliminar aquí se refleja en la sala Insumos y viceversa.
   Flujo del proyecto (guía de 4 pasos): elegir códigos → descargar parámetros/keynotes del proyecto → Revit → cuantificar en Insumos.
   Exporta en el navegador: Excel (SpreadsheetML 2003), CSV, Keynotes de Revit (UTF-16) y Parámetros compartidos. */
window.DION_MOD = window.DION_MOD || {};
(function () {
  const K = "codificacion", P = "m-" + K + "-";
  const SRC = (document.currentScript && document.currentScript.src) || "";
  const rutas = f => {
    const r = [];
    if (SRC) { try { r.push(new URL("../data/" + f, SRC).href); } catch (e) { } }
    r.push("data/" + f, "../data/" + f);
    return r.filter((u, i) => r.indexOf(u) === i);
  };
  const XLSX_RUTAS = rutas("DION_Codificacion_BIM.xlsx");
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
  const UI = { tab: "", disc: "*", sis: "", fam: "", q: "", sel: "", conv: "disc", alcance: "proy", panel: "" };
  let OFF = null;

  const nrm = s => String(s == null ? "" : s).normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();
  const esc = s => String(s == null ? "" : s).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const $ = n => (Math.round((+n || 0) * 100) / 100).toLocaleString("es-EC", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  const slug = s => String(s || "proyecto").normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/[^A-Za-z0-9]+/g, "_").replace(/^_|_$/g, "").slice(0, 40) || "proyecto";

  /* ───────── glifos SVG ───────── */
  const G = {
    cat: '<svg viewBox="0 0 24 24"><path d="M4 5h16M4 12h10M4 19h7" /><circle cx="18" cy="17" r="3"/><path d="M20.2 19.2 22 21"/></svg>',
    esq: '<svg viewBox="0 0 24 24"><rect x="2" y="8" width="5" height="8"/><rect x="9.5" y="8" width="5" height="8"/><rect x="17" y="8" width="5" height="8"/><path d="M7 12h2.5M14.5 12H17"/></svg>',
    conv: '<svg viewBox="0 0 24 24"><path d="M3 6h18M3 12h18M3 18h18"/><path d="M8 3v18"/></svg>',
    exp: '<svg viewBox="0 0 24 24"><path d="M12 3v12M7 10l5 5 5-5"/><path d="M4 17v4h16v-4"/></svg>',
    copy: '<svg viewBox="0 0 24 24"><rect x="8" y="8" width="12" height="12"/><path d="M4 16V4h12"/></svg>',
    xls: '<svg viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18"/><path d="M3 9h18M3 15h18M9 3v18M15 3v18"/></svg>',
    csv: '<svg viewBox="0 0 24 24"><path d="M5 3h10l4 4v14H5z"/><path d="M8 12h8M8 16h8M8 8h4"/></svg>',
    key: '<svg viewBox="0 0 24 24"><circle cx="8" cy="8" r="4"/><path d="M11 11l9 9M16 16l2-2M18 18l2-2"/></svg>',
    prm: '<svg viewBox="0 0 24 24"><path d="M4 6h10M18 6h2M4 12h4M12 12h8M4 18h12M20 18h0"/><circle cx="16" cy="6" r="2"/><circle cx="10" cy="12" r="2"/><circle cx="18" cy="18" r="2"/></svg>',
    json: '<svg viewBox="0 0 24 24"><path d="M8 4c-3 0-2 4-2 6s-2 2-2 2 2 0 2 2-1 6 2 6M16 4c3 0 2 4 2 6s2 2 2 2-2 0-2 2 1 6-2 6"/></svg>',
    hex: '<svg viewBox="0 0 24 24"><path d="M12 2l9 5v10l-9 5-9-5V7z"/><path d="M12 7l4.5 2.5v5L12 17l-4.5-2.5v-5z"/></svg>',
    x: '<svg viewBox="0 0 24 24"><path d="M5 5l14 14M19 5L5 19"/></svg>',
    plus: '<svg viewBox="0 0 24 24"><path d="M12 5v14M5 12h14"/></svg>',
    chk: '<svg viewBox="0 0 24 24"><path d="M4 12l5 5L20 6"/></svg>',
    pen: '<svg viewBox="0 0 24 24"><path d="M4 20l4-1 11-11-3-3L5 16z"/><path d="M14 6l3 3"/></svg>',
    trash: '<svg viewBox="0 0 24 24"><path d="M4 7h16M9 7V4h6v3M6 7l1 14h10l1-14"/></svg>',
    cart: '<svg viewBox="0 0 24 24"><path d="M3 4h3l2.5 11h10L21 7H7"/><circle cx="10" cy="19" r="1.6"/><circle cx="17" cy="19" r="1.6"/></svg>',
    proy: '<svg viewBox="0 0 24 24"><path d="M3 21V9l9-6 9 6v12z"/><path d="M9 21v-7h6v7"/></svg>',
    next: '<svg viewBox="0 0 24 24"><path d="M4 12h15M13 6l6 6-6 6"/></svg>',
    link: '<svg viewBox="0 0 24 24"><path d="M10 14a4 4 0 0 0 5.7 0l3-3a4 4 0 0 0-5.7-5.7l-1 1"/><path d="M14 10a4 4 0 0 0-5.7 0l-3 3a4 4 0 0 0 5.7 5.7l1-1"/></svg>',
    rvt: '<svg viewBox="0 0 24 24"><path d="M4 4h10a4 4 0 0 1 0 8H4zM4 12l8 8M4 4v16"/></svg>'
  };

  /* ───────── CSS ───────── */
  function css() {
    if (document.getElementById("mod-" + K + "-css")) return;
    const st = document.createElement("style"); st.id = "mod-" + K + "-css";
    st.textContent = `
.m-${K}{container-type:inline-size;height:100%;min-height:420px;display:flex;flex-direction:column;color:var(--ink);font-family:var(--f-b);position:relative;overflow:hidden;
  background:radial-gradient(120% 80% at 0% 0%,rgba(var(--acc-rgb),.06),transparent 60%)}
.m-${K} *{box-sizing:border-box}
.m-${K} svg{width:18px;height:18px;fill:none;stroke:currentColor;stroke-width:1.6;stroke-linecap:round;stroke-linejoin:round;flex:none}
.${P}top{flex:none;padding:10px 14px 8px;border-bottom:1px solid var(--line);display:flex;flex-wrap:wrap;gap:8px 10px;align-items:center}
.${P}brand{display:flex;align-items:center;gap:10px;min-width:0;flex:1 1 240px}
.${P}brand svg{width:30px;height:30px;color:var(--acc);filter:drop-shadow(0 0 6px rgba(var(--acc-rgb),.6))}
.${P}brand b{font-family:var(--f-d);font-size:12px;letter-spacing:.16em;display:block;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;font-weight:400}
.${P}brand small{color:var(--muted);font-size:11px;display:block}
.${P}meters{display:flex;gap:6px;flex-wrap:wrap}
.${P}meter{border:1px solid var(--line2);background:var(--glass);padding:4px 10px;min-width:70px;position:relative;clip-path:polygon(0 0,calc(100% - 8px) 0,100% 8px,100% 100%,8px 100%,0 calc(100% - 8px))}
.${P}meter i{font-style:normal;font-size:8.5px;letter-spacing:.14em;color:var(--muted);font-family:var(--f-d);display:block}
.${P}meter span{font-family:var(--f-m);font-size:15px;color:var(--acc);text-shadow:0 0 8px rgba(var(--acc-rgb),.5)}
.${P}meter.ok span{color:var(--done);text-shadow:0 0 8px rgba(var(--done-rgb),.5)}
.${P}srow{flex:1 1 100%;display:flex;gap:8px;min-width:0}
.${P}srow .${P}srch{flex:1 1 0}
.${P}srow>.${P}btn{flex:none}
.${P}srch{flex:1 1 240px;display:flex;align-items:center;gap:8px;border:1px solid var(--line2);background:rgba(3,6,11,.6);padding:0 6px 0 10px;min-height:44px;min-width:0}
.${P}srch:focus-within{border-color:var(--acc);box-shadow:0 0 0 1px rgba(var(--acc-rgb),.35),0 0 18px rgba(var(--acc-rgb),.2)}
.${P}srch svg{color:var(--acc)}
.${P}srch input{flex:1;min-width:0;background:transparent;border:0;outline:0;color:var(--ink);font-family:var(--f-m);font-size:14px;height:42px}
.${P}srch button{border:0;background:none;color:var(--muted);cursor:pointer;width:36px;height:36px;display:grid;place-items:center}
.${P}guide{flex:none;display:flex;gap:6px;padding:8px 14px;overflow-x:auto;border-bottom:1px solid var(--line);scrollbar-width:thin;align-items:stretch}
.${P}gs{flex:1 0 170px;display:flex;gap:9px;align-items:center;text-align:left;min-height:52px;padding:6px 10px;border:1px solid var(--line);background:rgba(3,6,11,.45);color:var(--muted);cursor:pointer;font-family:var(--f-b);font-size:11.5px;line-height:1.25;position:relative}
.${P}gs i{font-style:normal;flex:none;width:28px;height:28px;display:grid;place-items:center;border:1px solid var(--line2);font-family:var(--f-m);font-size:13px;color:var(--acc);clip-path:polygon(6px 0,100% 0,100% calc(100% - 6px),calc(100% - 6px) 100%,0 100%,0 6px)}
.${P}gs b{display:block;color:var(--ink);font-weight:600;font-size:12px}
.${P}gs:hover{border-color:var(--line2)}
.${P}gs.now{border-color:var(--acc);background:rgba(var(--acc-rgb),.09);box-shadow:0 0 16px rgba(var(--acc-rgb),.18)}
.${P}gs.now i{background:var(--acc);color:var(--bg);box-shadow:0 0 12px rgba(var(--acc-rgb),.7)}
.${P}gs.ok i{border-color:var(--done);color:var(--bg);background:var(--done)}
.${P}gs.ok b{color:var(--done)}
.${P}gs+.${P}gs::before{content:"";position:absolute;left:-7px;top:50%;width:6px;height:1px;background:var(--line2)}
.${P}gnext{flex:0 0 auto;min-height:52px;padding:0 14px;border:1px solid var(--done);background:rgba(var(--done-rgb),.08);color:var(--done);font-family:var(--f-d);font-size:9.5px;letter-spacing:.14em;cursor:pointer;display:flex;align-items:center;gap:8px;white-space:nowrap}
.${P}tabs{flex:none;display:flex;gap:6px;padding:8px 14px;overflow-x:auto;border-bottom:1px solid var(--line);scrollbar-width:thin}
.${P}tab{min-height:42px;padding:0 14px;display:flex;align-items:center;gap:8px;border:1px solid var(--line2);background:rgba(var(--acc-rgb),.03);color:var(--muted);cursor:pointer;
  font-family:var(--f-d);font-size:10px;letter-spacing:.14em;white-space:nowrap;clip-path:polygon(8px 0,100% 0,100% calc(100% - 8px),calc(100% - 8px) 100%,0 100%,0 8px)}
.${P}tab em{font-style:normal;font-family:var(--f-m);font-size:11px;letter-spacing:0}
.${P}tab.on{color:var(--bg);background:var(--acc);border-color:var(--acc);box-shadow:0 0 18px rgba(var(--acc-rgb),.45)}
.${P}main{flex:1;min-height:0;display:flex;flex-direction:column}
.${P}chips{flex:none;display:flex;gap:6px;padding:8px 14px;overflow-x:auto;scrollbar-width:thin}
.${P}chip{flex:none;min-height:40px;padding:0 12px;display:flex;align-items:center;gap:7px;border:1px solid var(--line);background:var(--panel);color:var(--ink);cursor:pointer;font-family:var(--f-m);font-size:12px}
.${P}chip .dot{width:10px;height:10px;border-radius:50%;box-shadow:0 0 8px currentColor}
.${P}chip em{font-style:normal;color:var(--muted);font-size:11px}
.${P}chip.on{border-color:var(--acc);background:rgba(var(--acc-rgb),.12);box-shadow:inset 0 0 0 1px rgba(var(--acc-rgb),.4)}
.${P}body{flex:1;min-height:0;display:grid;grid-template-columns:minmax(230px,310px) 1fr;gap:0}
.${P}tree{border-right:1px solid var(--line);overflow:auto;padding:8px 8px 20px}
.${P}tn{display:flex;align-items:center;gap:8px;width:100%;min-height:40px;padding:4px 8px;border:0;border-left:2px solid transparent;background:none;color:var(--ink);text-align:left;cursor:pointer;font-family:var(--f-b);font-size:13px}
.${P}tn:hover{background:rgba(var(--acc-rgb),.06)}
.${P}tn.on{border-left-color:var(--acc);background:rgba(var(--acc-rgb),.1)}
.${P}tn code{font-family:var(--f-m);font-size:11px;color:var(--acc);min-width:46px}
.${P}tn span{flex:1;min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.${P}tn em{font-style:normal;font-family:var(--f-m);font-size:10px;color:var(--muted)}
.${P}tn.f{padding-left:26px;font-size:12px;min-height:36px}
.${P}tn.f code{color:var(--done);min-width:34px}
.${P}tn .car{flex:none;width:12px;color:var(--muted);font-family:var(--f-m)}
.${P}lw{min-width:0;min-height:0;display:flex;flex-direction:column}
.${P}lhd{flex:none;padding:8px 14px 6px;display:flex;flex-wrap:wrap;gap:6px 10px;align-items:center}
.${P}lhd h3{margin:0;font-family:var(--f-d);font-size:10.5px;letter-spacing:.16em;color:var(--acc);font-weight:400;flex:1 1 200px;min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.${P}lhd small{color:var(--muted);font-family:var(--f-m);font-size:11px}
.${P}list{flex:1;min-height:0;overflow:auto;padding:0 14px 20px;position:relative;overscroll-behavior:contain}
.${P}warn{display:flex;align-items:center;gap:8px;flex-wrap:wrap;border:1px solid var(--warn);background:rgba(255,92,122,.07);padding:5px 8px;font-size:11.5px;flex:1 1 100%}
.${P}warn b{font-family:var(--f-d);font-size:8.5px;letter-spacing:.16em;color:var(--warn);font-weight:400}
.${P}warn.ok{border-color:var(--done);background:rgba(var(--done-rgb),.06)}
.${P}warn.ok b{color:var(--done)}
.${P}btn{min-height:42px;padding:0 14px;border:1px solid var(--line2);background:rgba(var(--acc-rgb),.06);color:var(--ink);cursor:pointer;font-family:var(--f-d);font-size:9.5px;letter-spacing:.13em;display:inline-flex;align-items:center;justify-content:center;gap:8px;white-space:nowrap}
.${P}btn:hover{border-color:var(--acc);color:var(--acc)}
.${P}btn.pri{background:var(--acc);color:var(--bg);border-color:var(--acc)}
.${P}btn.ok{border-color:var(--done);color:var(--done);background:rgba(var(--done-rgb),.07)}
.${P}btn.bad{border-color:var(--warn);color:var(--warn);background:rgba(255,92,122,.06)}
.${P}btn.sm{min-height:40px;padding:0 10px}
.${P}btn[disabled]{opacity:.4;pointer-events:none}
.${P}row{height:calc(100% - 5px);display:grid;grid-template-columns:minmax(180px,240px) 1fr 76px 52px 44px;gap:10px;align-items:center;padding:0 6px 0 10px;border:1px solid var(--line);
  border-left:3px solid var(--c,var(--acc));background:linear-gradient(90deg,rgba(var(--acc-rgb),.035),transparent 40%);cursor:pointer;position:relative;overflow:hidden}
.${P}row:hover{border-color:var(--line2);background:rgba(var(--acc-rgb),.07)}
.${P}row.sel{border-color:var(--acc);box-shadow:0 0 14px rgba(var(--acc-rgb),.25)}
.${P}row.on{background:linear-gradient(90deg,rgba(var(--done-rgb),.12),transparent 55%)}
.${P}row code{font-family:var(--f-m);font-size:12px;color:var(--ink);white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.${P}row .n{min-width:0}
.${P}row .n b{display:block;font-weight:500;font-size:13px;line-height:1.25;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.${P}row .n small{display:block;color:var(--muted);font-size:11px;line-height:1.3;margin-top:2px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.${P}row .u{font-family:var(--f-m);font-size:11px;color:var(--muted);border:1px solid var(--line);padding:2px 6px;white-space:nowrap;text-align:center;overflow:hidden}
.${P}lk{font-family:var(--f-m);font-size:10.5px;color:var(--faint);white-space:nowrap;text-align:right}
.${P}lk.y{color:#B98CFF}
.${P}tg{font-family:var(--f-d);font-size:7.5px;letter-spacing:.12em;padding:1px 4px;border:1px solid currentColor;margin-left:6px;vertical-align:2px}
.${P}use{width:42px;height:42px;display:grid;place-items:center;border:1px solid var(--line2);background:rgba(3,6,11,.5);color:var(--acc);cursor:pointer}
.${P}use:hover{background:rgba(var(--acc-rgb),.18)}
.${P}use.on{background:var(--done);border-color:var(--done);color:var(--bg);box-shadow:0 0 12px rgba(var(--done-rgb),.5)}
.${P}use[disabled]{visibility:hidden}
.${P}cp{width:40px;height:40px;display:grid;place-items:center;border:1px solid var(--line2);background:rgba(3,6,11,.5);color:var(--acc);cursor:pointer;flex:none}
.${P}cp:hover{background:var(--acc);color:var(--bg)}
.${P}cp.done{background:var(--done);color:var(--bg);border-color:var(--done)}
.${P}empty{padding:40px 10px;text-align:center;color:var(--muted)}
.${P}seg{font-family:var(--f-m)}
.${P}seg span{padding:0 1px;display:inline}
.${P}seg .s0{color:var(--c,#fff)} .${P}seg .s1{color:#7FB3D5} .${P}seg .s2{color:var(--done)} .${P}seg .s3{color:#F5B041} .${P}seg .sp{color:var(--faint)}
.${P}det{position:absolute;right:0;top:0;bottom:0;width:min(460px,100%);background:rgba(6,12,20,.97);border-left:1px solid var(--acc);box-shadow:-10px 0 40px rgba(0,0,0,.6),0 0 30px rgba(var(--acc-rgb),.12);
  z-index:5;display:flex;flex-direction:column;animation:${P}in .16s ease-out}
@keyframes ${P}in{from{transform:translateX(30px);opacity:0}to{transform:none;opacity:1}}
.${P}det header{flex:none;display:flex;align-items:center;gap:8px;padding:8px 10px 8px 14px;border-bottom:1px solid var(--line2)}
.${P}det header b{flex:1;font-family:var(--f-d);font-size:10px;letter-spacing:.16em;color:var(--acc);font-weight:400}
.${P}det .bd{flex:1;overflow:auto;padding:12px 14px 30px}
.${P}big{font-family:var(--f-m);font-size:19px;line-height:1.3;word-break:break-all;margin:2px 0 4px;text-shadow:0 0 12px rgba(var(--acc-rgb),.25)}
.${P}lbl{display:flex;flex-wrap:wrap;gap:4px;margin-bottom:10px}
.${P}lbl span{font-family:var(--f-d);font-size:8px;letter-spacing:.14em;border:1px solid var(--line);padding:3px 6px;color:var(--muted)}
.${P}acts{display:flex;flex-wrap:wrap;gap:6px;margin:10px 0 12px}
.${P}kv{display:grid;grid-template-columns:1fr 40px;gap:4px 8px;align-items:center;border-top:1px solid var(--line);padding:7px 0}
.${P}kv i{font-style:normal;font-family:var(--f-d);font-size:8.5px;letter-spacing:.14em;color:var(--muted);display:block;margin-bottom:2px}
.${P}kv div{min-width:0;word-break:break-word;font-size:13px}
.${P}kv div.m{font-family:var(--f-m);font-size:12px}
.${P}sec{font-family:var(--f-d);font-size:9px;letter-spacing:.16em;color:var(--acc);margin:16px 0 6px;display:flex;justify-content:space-between;align-items:center;gap:8px}
.${P}ins{display:grid;grid-template-columns:1fr auto;gap:2px 10px;padding:8px 8px 8px 10px;border:1px solid var(--line);border-left:2px solid #B98CFF;margin-bottom:5px;font-size:12.5px}
.${P}ins small{color:var(--muted);font-size:11px;grid-column:1}
.${P}ins .p{font-family:var(--f-m);font-size:11.5px;text-align:right;white-space:nowrap;grid-row:1/3;grid-column:2;align-self:center}
.${P}ins .p em{display:block;font-style:normal;font-size:9px;font-family:var(--f-d);letter-spacing:.1em}
.${P}conf{border:1px solid var(--warn);background:rgba(255,92,122,.08);padding:12px;margin:8px 0;font-size:13px;line-height:1.45}
.${P}conf b{color:var(--warn)}
.${P}pane{flex:1;min-height:0;overflow:auto;padding:12px 14px 40px}
.${P}card{border:1px solid var(--line2);background:var(--glass);padding:14px;margin-bottom:12px;position:relative;clip-path:polygon(0 0,calc(100% - 14px) 0,100% 14px,100% 100%,14px 100%,0 calc(100% - 14px))}
.${P}card::before{content:"";position:absolute;left:0;top:0;width:40px;height:2px;background:var(--acc);box-shadow:0 0 10px var(--acc)}
.${P}card.ok::before{background:var(--done);box-shadow:0 0 10px var(--done)}
.${P}card h4{margin:0 0 10px;font-family:var(--f-d);font-size:10.5px;letter-spacing:.16em;color:var(--acc);font-weight:400;display:flex;align-items:center;gap:8px}
.${P}card h4 i{font-style:normal;width:24px;height:24px;display:grid;place-items:center;border:1px solid var(--acc);font-family:var(--f-m);font-size:12px}
.${P}card.ok h4 i{background:var(--done);border-color:var(--done);color:var(--bg)}
.${P}card p{color:var(--muted);font-size:12.5px;line-height:1.45;margin:0 0 10px}
.${P}fmt{font-family:var(--f-m);font-size:clamp(16px,3.4cqi,28px);display:flex;flex-wrap:wrap;gap:6px;align-items:center}
.${P}fmt span{border:1px solid currentColor;padding:6px 10px;box-shadow:0 0 12px -2px currentColor inset}
.${P}tbl{width:100%;border-collapse:collapse;font-size:12.5px}
.${P}tbl td,.${P}tbl th{border-bottom:1px solid var(--line);padding:7px 6px;text-align:left;vertical-align:top}
.${P}tbl th{font-family:var(--f-d);font-size:8.5px;letter-spacing:.14em;color:var(--muted);font-weight:400}
.${P}tbl td:first-child{font-family:var(--f-m);color:var(--acc);white-space:nowrap}
.${P}ol{margin:0;padding:0;list-style:none;counter-reset:r}
.${P}ol li{counter-increment:r;position:relative;padding:8px 0 8px 40px;border-bottom:1px solid var(--line);font-size:13px;line-height:1.45}
.${P}ol li::before{content:counter(r,decimal-leading-zero);position:absolute;left:0;top:8px;font-family:var(--f-m);color:var(--acc);font-size:12px;border:1px solid var(--line2);padding:1px 5px}
.${P}exg{display:grid;grid-template-columns:repeat(auto-fill,minmax(220px,1fr));gap:10px}
.${P}ex{border:1px solid var(--line2);background:var(--glass);padding:12px 14px;display:flex;flex-direction:column;gap:6px;min-height:130px;cursor:pointer;text-align:left;color:var(--ink);font-family:var(--f-b);
  clip-path:polygon(0 0,calc(100% - 14px) 0,100% 14px,100% 100%,0 100%)}
.${P}ex:hover{border-color:var(--acc);box-shadow:0 0 22px rgba(var(--acc-rgb),.2)}
.${P}ex svg{width:30px;height:30px;color:var(--acc)}
.${P}ex b{font-family:var(--f-d);font-size:10px;letter-spacing:.14em;font-weight:400}
.${P}ex small{color:var(--muted);font-size:12px;line-height:1.4}
.${P}ex code{font-family:var(--f-m);font-size:11px;color:var(--done);margin-top:auto;word-break:break-all}
.${P}ex[disabled]{opacity:.4;pointer-events:none}
.${P}bar{height:6px;background:rgba(var(--acc-rgb),.08);position:relative;margin-top:4px}
.${P}bar i{position:absolute;left:0;top:0;bottom:0;background:linear-gradient(90deg,var(--c,var(--acc)),transparent);box-shadow:0 0 8px var(--c,var(--acc))}
.${P}dg{display:grid;grid-template-columns:repeat(auto-fill,minmax(180px,1fr));gap:8px}
.${P}dc{border:1px solid var(--line);padding:8px 10px;cursor:pointer;background:var(--panel);min-height:58px}
.${P}dc:hover{border-color:var(--c)}
.${P}dc b{font-family:var(--f-m);color:var(--c)} .${P}dc span{font-size:12px} .${P}dc em{float:right;font-style:normal;font-family:var(--f-m);font-size:11px;color:var(--muted)}
.${P}load{flex:1;display:grid;place-items:center;color:var(--muted);font-family:var(--f-d);font-size:10px;letter-spacing:.2em}
.${P}load svg{width:46px;height:46px;color:var(--acc);animation:${P}rot 2s linear infinite}
@keyframes ${P}rot{to{transform:rotate(360deg)}}
.${P}scope{display:flex;gap:6px;flex-wrap:wrap;margin-bottom:10px}
.${P}mtree{display:none}
.${P}g2{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:12px}
.${P}g2>.${P}card{margin:0}
.${P}xb{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:6px}
.${P}xb .${P}btn{justify-content:flex-start;min-height:46px;white-space:normal;text-align:left;line-height:1.2}
.${P}tip{display:flex;gap:12px;align-items:center;border:1px solid #FFC857;background:rgba(255,200,87,.06);padding:10px 12px;margin-bottom:12px}
.${P}tip code{font-family:var(--f-m);font-size:20px;color:#FFC857;text-shadow:0 0 10px rgba(255,200,87,.45)}
.${P}tip small{display:block;color:var(--muted);font-size:11px}
.${P}sl{height:min(52vh,460px);border:1px solid var(--line);overflow:auto;position:relative;padding:4px 6px}
.${P}sr{height:calc(100% - 4px);display:grid;grid-template-columns:minmax(150px,230px) 1fr 60px 42px;gap:8px;align-items:center;padding:0 4px 0 8px;border-bottom:1px solid var(--line);border-left:3px solid var(--c);overflow:hidden;cursor:pointer}
.${P}sr code{font-family:var(--f-m);font-size:11.5px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.${P}sr span{font-size:12.5px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;min-width:0}
.${P}sr .${P}cp{width:38px;height:38px;color:var(--warn)}
.${P}sh{height:100%;display:flex;align-items:flex-end;padding:0 4px 4px;font-family:var(--f-d);font-size:9px;letter-spacing:.16em;color:var(--c);border-bottom:1px solid var(--line2)}
.${P}sh em{font-style:normal;font-family:var(--f-m);color:var(--muted);margin-left:auto;letter-spacing:0}
.${P}bign{width:100%;min-height:64px;margin-top:14px;border:1px solid var(--done);background:linear-gradient(90deg,rgba(var(--done-rgb),.18),rgba(var(--done-rgb),.04));color:var(--done);font-family:var(--f-d);font-size:13px;letter-spacing:.2em;cursor:pointer;display:flex;align-items:center;justify-content:center;gap:12px;
  clip-path:polygon(14px 0,100% 0,100% calc(100% - 14px),calc(100% - 14px) 100%,0 100%,0 14px);box-shadow:0 0 24px rgba(var(--done-rgb),.18) inset}
.${P}bign svg{width:24px;height:24px}
.${P}bign:hover{background:rgba(var(--done-rgb),.25)}
.${P}disb{display:grid;grid-template-columns:44px 1fr 50px;gap:8px;align-items:center;font-size:12px;margin:3px 0}
.${P}disb b{font-family:var(--f-m);color:var(--c)}
.${P}disb span{font-family:var(--f-m);text-align:right;color:var(--muted)}
.${P}f{display:block;margin-bottom:10px}
.${P}f>i{display:block;font-style:normal;font-family:var(--f-d);font-size:8.5px;letter-spacing:.14em;color:var(--muted);margin-bottom:4px}
.${P}f input,.${P}f select,.${P}f textarea{width:100%;min-height:44px;background:var(--panel);border:1px solid var(--line2);color:var(--ink);padding:0 10px;font-family:var(--f-b);font-size:13.5px;outline:0}
.${P}f textarea{padding:8px 10px;min-height:64px;resize:vertical}
.${P}f input:focus,.${P}f select:focus,.${P}f textarea:focus{border-color:var(--acc);box-shadow:0 0 0 1px rgba(var(--acc-rgb),.35)}
.${P}f input.mono{font-family:var(--f-m);text-transform:uppercase}
.${P}f2{display:grid;grid-template-columns:1fr 1fr;gap:0 10px}
.${P}prev{border:1px dashed var(--line2);padding:10px;margin:4px 0 12px;font-size:18px;min-height:48px;word-break:break-all}
.${P}prev.bad{border-color:var(--warn)}
.${P}msg{font-size:12px;color:var(--warn);min-height:16px;margin:-6px 0 10px}
.${P}msg.ok{color:var(--done)}
.${P}varw{display:flex;gap:6px}
.${P}varw input{flex:1}
@container (max-width:760px){
  .${P}body{grid-template-columns:1fr}
  .${P}tree{display:none}
  .${P}mtree{display:flex;flex:none;gap:6px;padding:0 14px 6px;overflow-x:auto}
  .${P}row{grid-template-columns:1fr auto 44px;grid-template-rows:auto auto;gap:2px 8px;padding:6px 6px 6px 10px}
  .${P}row code{grid-column:1;grid-row:1} .${P}row .n{grid-column:1/3;grid-row:2} .${P}row .u{display:none} .${P}row .${P}lk{grid-column:2;grid-row:1}
  .${P}row .${P}use{grid-column:3;grid-row:1/3}
  .${P}meter{min-width:58px;padding:3px 7px} .${P}meter span{font-size:13px}
  .${P}brand{flex-basis:100%}
  .${P}g2{grid-template-columns:1fr}
  .${P}gs{flex-basis:150px}
  .${P}sr{grid-template-columns:1fr 42px;grid-template-rows:auto auto;gap:0 8px}
  .${P}sr code{grid-column:1;grid-row:1} .${P}sr span{grid-column:1;grid-row:2} .${P}sr em{display:none} .${P}sr .${P}cp{grid-column:2;grid-row:1/3}
}
@container (max-width:460px){
  .${P}top{padding:8px 10px} .${P}list,.${P}pane{padding-left:10px;padding-right:10px} .${P}tabs,.${P}chips,.${P}guide,.${P}lhd{padding-left:10px;padding-right:10px}
  .${P}tab{padding:0 10px} .${P}brand small{display:none} .${P}gs{flex-basis:138px;font-size:10.5px} .${P}gs span{display:none}
  .${P}xb{grid-template-columns:1fr} .${P}f2{grid-template-columns:1fr}
  .${P}meter i{font-size:7.5px}
  .${P}brand{display:none} .${P}srow>.${P}btn span{display:none} .${P}srow>.${P}btn{width:46px;padding:0}
  .${P}warn .t{display:none} .${P}warn{justify-content:space-between} .${P}warn::after{content:"Medidas referenciales 2026";color:var(--muted);flex:1;order:1;font-size:11px} .${P}warn .${P}btn{order:2}
  .${P}gs{min-height:44px;padding:4px 8px} .${P}gnext{min-height:44px}
  .${P}tab{min-height:40px}
}
`;
    document.head.appendChild(st);
  }

  /* ───────── utilidades ───────── */
  function copiar(txt, btn, ctx) {
    const ok = () => { if (btn) { btn.classList.add("done"); setTimeout(() => btn.classList.remove("done"), 900); } ctx && ctx.toast && ctx.toast("Copiado: " + txt); };
    try {
      if (navigator.clipboard && window.isSecureContext) { navigator.clipboard.writeText(txt).then(ok, () => fb()); return; }
    } catch (e) { }
    fb();
    function fb() {
      const ta = document.createElement("textarea"); ta.value = txt; ta.style.cssText = "position:fixed;left:-9999px;top:0"; document.body.appendChild(ta); ta.select();
      try { document.execCommand("copy"); } catch (e) { } ta.remove(); ok();
    }
  }
  function segs(cod, color) {
    const p = String(cod).split("-");
    const cls = i => i === 0 ? "s0" : i === 1 ? "s1" : i === 2 ? "s2" : "s3";
    return `<span class="${P}seg" style="--c:${color}">` + p.map((x, i) => `<span class="${cls(i)}">${esc(x)}</span>`).join('<span class="sp">-</span>') + "</span>";
  }
  function filtrar() {
    const toks = nrm(UI.q).split(/\s+/).filter(Boolean), C = D().codes(), out = [];
    for (const c of C) {
      if (UI.disc !== "*" && c.disc !== UI.disc) continue;
      if (UI.sis && c.sis !== UI.sis) continue;
      if (UI.fam && c.fam !== UI.fam) continue;
      let ok = true; for (const t of toks) if (!c.h.includes(t)) { ok = false; break; }
      if (ok) out.push(c);
    }
    return out;
  }

  /* ───────── exportadores (misma estructura de siempre; ahora con los cambios del usuario) ───────── */
  const CAB = ["DISC", "Disciplina", "Codigo DION", "Descripcion", "Dimension", "Unidad", "Assembly Code (Uniformat N3)", "Sistema", "FAM", "Familia", "Categoria Revit", "Nombre de tipo Revit", "IFC 4.3", "OmniClass 23", "Keynote padre", "Carpeta", "Nota"];
  const soloBIM = items => items.filter(c => !c.tip);
  function filasExport(items) {
    return soloBIM(items).map(c => [c.disc, c.discN, c.cod, c.n, c.dim || "", c.unidad || "", c.sis, c.sisN, c.fam, c.famN, c.cat || "", c.rvt || "", c.ifc || "", c.omni || "", `${c.disc}-${c.u2}-${c.fam}`, c.carpeta || "", c.nota || ""]);
  }
  function utf16(str) {
    const buf = new Uint16Array(str.length + 1); buf[0] = 0xFEFF;
    for (let i = 0; i < str.length; i++) buf[i + 1] = str.charCodeAt(i);
    return new Blob([buf], { type: "text/plain;charset=utf-16le" });
  }
  function expCSV(items) {
    const q = v => { v = String(v == null ? "" : v); return /[;"\n\r]/.test(v) ? '"' + v.replace(/"/g, '""') + '"' : v; };
    const lines = [CAB].concat(filasExport(items)).map(r => r.map(q).join(";"));
    return new Blob(["﻿" + lines.join("\r\n") + "\r\n"], { type: "text/csv;charset=utf-8" });
  }
  function expKeynotes(items) {
    const M = D().meta(), clean = s => String(s == null ? "" : s).replace(/[\t\r\n]+/g, " ").trim();
    const rows = [], seen = new Set();
    const add = (k, t, p) => { if (!seen.has(k)) { seen.add(k); rows.push([k, t, p]); } };
    const nU2 = {}; (M.convenciones.grupos.find(g => g.id === "sis") || { filas: [] }).filas.forEach(f => nU2[f[0]] = f[1]);
    for (const c of soloBIM(items)) {
      const k2 = `${c.disc}-${c.u2}`, k3 = `${k2}-${c.fam}`;
      add(c.disc, c.discN, ""); add(k2, `${nU2[c.u2] || c.sisN} (${c.discN})`, c.disc); add(k3, c.famN, k2);
      add(c.cod, c.n + (c.dim ? " · " + c.dim : ""), k3);
    }
    return utf16(rows.map(r => r.map(clean).join("\t")).join("\r\n") + "\r\n");
  }
  function expShared() {
    const pr = D().meta().parametros, L = ["# This is a Revit shared parameter file.", "# Do not edit manually.", "*META\tVERSION\tMINVERSION", "META\t2\t1", "*GROUP\tID\tNAME"];
    pr.grupos.forEach(g => L.push(`GROUP\t${g.id}\t${g.n}`));
    L.push("*PARAM\tGUID\tNAME\tDATATYPE\tDATACATEGORY\tGROUP\tVISIBLE\tDESCRIPTION\tUSERMODIFIABLE\tHIDEWHENNOEXPRESSION");
    pr.lista.forEach(p => L.push(`PARAM\t${p.guid}\t${p.n}\t${p.tipo}\t\t${p.grupo}\t1\t${p.desc}\t1\t0`));
    return utf16(L.join("\r\n") + "\r\n");
  }
  function expXLS(items, titulo2) {
    const DATA = D().meta(), TREE = D().tree().filter(d => !d.tip);
    const x = s => String(s == null ? "" : s).replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F]/g, "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
    const colores = {}; TREE.forEach(d => colores[d.c] = d.color || "#8CA0B6");
    const lumi = h => { const n = parseInt(String(h).slice(1, 7), 16) || 0; return 0.299 * (n >> 16) + 0.587 * ((n >> 8) & 255) + 0.114 * (n & 255); };
    let st = `<Style ss:ID="Default" ss:Name="Normal"><Alignment ss:Vertical="Top"/><Font ss:FontName="Calibri" ss:Size="10"/></Style>
<Style ss:ID="t"><Font ss:FontName="Calibri" ss:Size="14" ss:Bold="1" ss:Color="#1F618D"/></Style>
<Style ss:ID="h"><Font ss:Bold="1" ss:Color="#FFFFFF"/><Interior ss:Color="#1F618D" ss:Pattern="Solid"/><Alignment ss:Vertical="Center" ss:WrapText="1"/></Style>
<Style ss:ID="c"><Font ss:FontName="Consolas" ss:Size="10" ss:Bold="1"/></Style><Style ss:ID="w"><Alignment ss:Vertical="Top" ss:WrapText="1"/></Style>`;
    Object.keys(colores).forEach(k => { st += `<Style ss:ID="d_${k}"><Font ss:Bold="1" ss:Color="${lumi(colores[k]) > 150 ? "#000000" : "#FFFFFF"}"/><Interior ss:Color="${colores[k]}" ss:Pattern="Solid"/></Style>`; });
    const row = (cells, styles) => "<Row>" + cells.map((v, i) => `<Cell${styles && styles[i] ? ` ss:StyleID="${styles[i]}"` : ""}><Data ss:Type="${typeof v === "number" ? "Number" : "String"}">${x(v)}</Data></Cell>`).join("") + "</Row>\n";
    const usados = new Set();
    const nombre = n => { let s = String(n).replace(/[\[\]:*?\/\\]/g, "-").slice(0, 31); let i = 2; while (usados.has(s)) s = s.slice(0, 28) + "_" + i++; usados.add(s); return s; };
    const sheet = (name, cols, body, freeze, filtro, ncols, nrows) => `<Worksheet ss:Name="${x(nombre(name))}"><Table>${cols.map(w => `<Column ss:Width="${w}"/>`).join("")}\n${body}</Table>
<WorksheetOptions xmlns="urn:schemas-microsoft-com:office:excel">${freeze ? `<FreezePanes/><FrozenNoSplit/><SplitHorizontal>${freeze}</SplitHorizontal><TopRowBottomPane>${freeze}</TopRowBottomPane><ActivePane>2</ActivePane>` : ""}</WorksheetOptions>
${filtro ? `<AutoFilter x:Range="R${freeze}C1:R${nrows}C${ncols}" xmlns="urn:schemas-microsoft-com:office:excel"/>` : ""}</Worksheet>\n`;
    const F = filasExport(items);
    let out = `<?xml version="1.0" encoding="UTF-8"?>\n<?mso-application progid="Excel.Sheet"?>\n<Workbook xmlns="urn:schemas-microsoft-com:office:spreadsheet" xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns:ss="urn:schemas-microsoft-com:office:spreadsheet" xmlns:html="http://www.w3.org/TR/REC-html40">\n<Styles>${st}</Styles>\n`;
    let b = row([DATA.titulo], ["t"]) + row(["Versión " + DATA.version + " · " + F.length + " códigos exportados" + (titulo2 ? " · " + titulo2 : "")]) + row([""]) + row(["FORMATO", DATA.esquema.formato], ["h", "c"]) + row([""]);
    b += row(["Campo", "Longitud", "Descripción"], ["h", "h", "h"]); DATA.esquema.campos.forEach(c => b += row(c, ["c", "", "w"]));
    b += row([""]) + row(["Ejemplo", "Lectura"], ["h", "h"]); DATA.esquema.ejemplos.forEach(c => b += row(c, ["c", "w"]));
    b += row([""]) + row(["#", "Regla"], ["h", "h"]); DATA.reglas.forEach((r, i) => b += row([i + 1, r], ["", "w"]));
    b += row([""]) + row(["Dónde en Revit", "Valor", "Cómo / para qué"], ["h", "h", "h"]); DATA.revit.forEach(c => b += row(c, ["c", "w", "w"]));
    out += sheet("Esquema y reglas", [160, 200, 420], b, 0, false);
    b = row(CAB, CAB.map(() => "h")) + F.map(r => row(r, [colores[r[0]] ? "d_" + r[0] : "", "", "c"])).join("");
    out += sheet("Catalogo", [40, 150, 190, 260, 170, 40, 80, 150, 40, 150, 120, 240, 190, 70, 110, 70, 200], b, 1, true, CAB.length, F.length + 1);
    const discs = [...new Set(F.map(r => r[0]))];
    if (discs.length > 1) {
      TREE.forEach(d => {
        const rr = F.filter(r => r[0] === d.c); if (!rr.length) return;
        const bb = row(CAB.slice(2), CAB.slice(2).map(() => "d_" + d.c)) + rr.map(r => row(r.slice(2), ["c"])).join("");
        out += sheet(d.c + " " + d.n, [190, 260, 170, 40, 80, 150, 40, 150, 120, 240, 190, 70, 110, 70, 200], bb, 1, true, CAB.length - 2, rr.length + 1);
      });
    }
    b = row(["Nombre", "Tipo", "Grupo", "GUID", "Descripción"], ["h", "h", "h", "h", "h"]);
    const gn = {}; DATA.parametros.grupos.forEach(g => gn[g.id] = g.n);
    DATA.parametros.lista.forEach(p => b += row([p.n, p.tipo, gn[p.grupo], p.guid, p.desc], ["c"]));
    out += sheet("Parametros compartidos", [150, 70, 160, 230, 300], b, 1, false);
    b = row(["Convenciones del estudio (FLUJO_COD)"], ["t"]) + row([DATA.convenciones.intro], ["w"]);
    DATA.convenciones.grupos.forEach(g => { b += row([""]) + row([g.id.toUpperCase() + " · " + g.n, "Nombre", "Nota"], ["h", "h", "h"]) + row([g.desc]); g.filas.forEach(f => b += row(f, ["c", "w", "w"])); });
    out += sheet("Convenciones", [130, 260, 380], b, 0, false);
    out += "</Workbook>\n";
    return new Blob([out], { type: "application/vnd.ms-excel" });
  }
  function expJSON() {
    const M = D().meta(), T = D().tree().filter(d => !d.tip);
    const o = Object.assign({}, M, {
      total: T.reduce((a, d) => a + d.total, 0),
      disciplinas: T.map(d => ({ c: d.c, n: d.n, carpeta: d.carpeta, ruta: d.ruta, color: d.color, desc: d.desc, total: d.total,
        sistemas: d.sistemas.map(s => ({ c: s.c, n: s.n, u2: s.u2, u2n: s.u2n, familias: s.familias.map(f => ({ c: f.c, n: f.n, cat: f.cat, ifc: f.ifc, omni: f.omni, desc: f.desc,
          tipos: f.tipos.map(t => { const r = { cod: t.cod, n: t.n, dim: t.dim, unidad: t.unidad, ifc: t.ifc, nota: t.nota, rvt: t.rvt }; if (t.origen && t.origen !== "base") r.origen = t.origen; return r; }) })) })) }))
    });
    return new Blob([JSON.stringify(o)], { type: "application/json" });
  }
  async function expXLSX() {
    for (const u of XLSX_RUTAS) { try { const r = await fetch(u); if (r.ok) return await r.blob(); } catch (e) { } }
    throw new Error("No se encontró data/DION_Codificacion_BIM.xlsx");
  }

  /* ───────── render ───────── */
  DION_MOD[K] = {
    titulo: "Codificación BIM",
    sub: "Códigos de elementos para Revit · vinculados a insumos",
    render(el, ctx) {
      css();
      if (OFF) { try { OFF(); } catch (e) { } OFF = null; }
      let vivo = true, tq = null, tSave = null, VL = null, VS = null, RES = [];
      const st0 = ctx.get(K) || {};
      let ST = Object.assign({ confirmado: false, sel: [], pasos: {} }, st0);
      ST.sel = Array.isArray(ST.sel) ? ST.sel : []; ST.pasos = ST.pasos || {};
      const SEL = new Set(ST.sel);
      if (!UI.tab) UI.tab = SEL.size ? "proy" : "cat";
      const guardar = () => { clearTimeout(tSave); tSave = setTimeout(() => { ST.sel = [...SEL]; ctx.set(K, Object.assign({}, ctx.get(K), ST)); }, 600); };
      el.innerHTML = `<div class="m-${K}"><div class="${P}load"><div style="text-align:center">${G.hex}<div style="margin-top:12px">CARGANDO CATÁLOGO…</div></div></div></div>`;
      const root = el.firstElementChild;
      const proyN = (ctx.P && ctx.P.nombre) || "proyecto";

      const iniciar = () => {
        if (!vivo) return;
        const t0 = performance.now();
        pintar();
        D().perf.abrirCodificacion = +(performance.now() - t0).toFixed(1);
        OFF = D().on(onData);
      };
      if (window.DION_DATA && D().isReady()) iniciar();
      else servicio().then(s => s.ready()).then(iniciar).catch(e => {
        if (!vivo) return;
        root.innerHTML = `<div class="${P}load"><div style="text-align:center;max-width:420px;padding:20px"><div style="color:var(--warn)">NO SE PUDO CARGAR EL CATÁLOGO</div>
          <p style="font-family:var(--f-b);letter-spacing:0;color:var(--muted);font-size:13px">${esc(e.message)}. Verifica que existan <code>data/codigos.json</code>, <code>data/insumos.json</code> y <code>mods/datos.js</code>.</p>
          <button class="${P}btn pri" data-a="retry">REINTENTAR</button></div></div>`;
        root.querySelector('[data-a="retry"]').onclick = () => DION_MOD[K].render(el, ctx);
      });

      /* cambios en el servicio (otra sala editó/renombró/eliminó) */
      function onData(ev) {
        if (!vivo) return;
        if (ev.type === "rename" && SEL.has(ev.old)) { SEL.delete(ev.old); SEL.add(ev.nw); guardar(); }
        if (ev.type === "rename" && UI.sel === ev.old) UI.sel = ev.nw;
        if (ev.type === "codes" && ev.op === "del") { if (SEL.delete(ev.cod)) guardar(); if (UI.sel === ev.cod) { UI.sel = ""; cerrarPanel(); } }
        if (ev.type === "focus" && ev.mod === K && ev.cod) { UI.tab = "cat"; UI.disc = "*"; UI.sis = UI.fam = ""; UI.q = ev.cod; const qi = root.querySelector('[data-r="q"]'); if (qi) qi.value = ev.cod; UI.sel = ev.cod; marcarTabs(); vista(); detalle(); return; }
        if (ev.type === "cart" || ev.type === "focus") return;
        refrescar();
      }
      function refrescar() {
        medidores(); guia();
        if (UI.tab === "cat") { const L = root.querySelector('[data-r="list"]'), sc = L ? L.scrollTop : 0; vista(); const L2 = root.querySelector('[data-r="list"]'); if (L2) { L2.scrollTop = sc; VL && VL.refresh(); } }
        else vista();
        if (UI.panel === "det") detalle();
      }

      function pintar() {
        root.innerHTML = `
<div class="${P}top">
  <div class="${P}brand">${G.hex}<div><b>CODIFICACIÓN BIM · REVIT 2027</b><small>DISC-SIS-FAM-VAR · vinculado a Insumos · ISO 19650 · Ecuador</small></div></div>
  <div class="${P}meters" data-r="meters"></div>
  <div class="${P}srow">
    <label class="${P}srch">${G.cat}<input data-r="q" type="search" placeholder="Buscar: ventana 120, PVC 110, THHN 12, IPE, HH19…" value="${esc(UI.q)}" autocomplete="off" spellcheck="false" aria-label="Buscar código"><button data-a="clr" title="Limpiar" aria-label="Limpiar búsqueda">${G.x}</button></label>
    <button class="${P}btn pri" data-a="nuevo" title="Agregar un código nuevo">${G.plus}<span>CÓDIGO</span></button>
  </div>
</div>
<div class="${P}guide" data-r="guide"></div>
<div class="${P}tabs" role="tablist">
  ${[["proy", "MI PROYECTO", G.proy], ["cat", "CATÁLOGO", G.cat], ["esq", "ESQUEMA Y REGLAS", G.esq], ["conv", "CONVENCIONES", G.conv], ["exp", "EXPORTAR", G.exp]].map(([k, n, g]) => `<button class="${P}tab${UI.tab === k ? " on" : ""}" data-tab="${k}" role="tab">${g}${n}${k === "proy" ? ` <em data-r="nsel">${SEL.size}</em>` : ""}</button>`).join("")}
</div>
<div class="${P}main" data-r="main"></div>`;
        const qi = root.querySelector('[data-r="q"]');
        qi.addEventListener("input", () => {
          clearTimeout(tq);
          tq = setTimeout(() => {
            UI.q = qi.value;
            if (UI.panel === "det") cerrarPanel();
            if (UI.tab === "cat") actualizarLista(); else if (UI.tab === "conv") vista(); else { UI.tab = "cat"; marcarTabs(); vista(); }
          }, 110);
        });
        root.querySelector('[data-a="clr"]').onclick = e => { e.preventDefault(); qi.value = ""; UI.q = ""; if (UI.tab === "cat") actualizarLista(); else vista(); qi.focus(); };
        root.querySelector('[data-a="nuevo"]').onclick = () => formulario(null);
        root.querySelectorAll("[data-tab]").forEach(b => b.onclick = () => { UI.tab = b.dataset.tab; marcarTabs(); vista(); });
        root.querySelector('[data-r="guide"]').addEventListener("click", e => {
          const b = e.target.closest("[data-g]"); if (!b) return;
          const g = b.dataset.g;
          if (g === "1") { UI.tab = "cat"; marcarTabs(); vista(); }
          else if (g === "2" || g === "3") { UI.tab = "proy"; marcarTabs(); vista(); const c = root.querySelector(`[data-paso="${g}"]`); if (c) c.scrollIntoView({ block: "start", behavior: "smooth" }); }
          else if (g === "4") { UI.tab = "proy"; marcarTabs(); vista(); const c = root.querySelector('[data-paso="4"]'); if (c) c.scrollIntoView({ block: "start", behavior: "smooth" }); }
          else if (g === "next") ctx.next();
        });
        medidores(); guia(); vista();
      }
      function medidores() {
        const m = root.querySelector('[data-r="meters"]'); if (!m) return;
        const C = D().codes(), nb = C.filter(c => !c.tip).length, ni = D().insumos().length;
        let vin = 0; SEL.forEach(c => vin += D().byCode(c).insumos.length);
        m.innerHTML = `<div class="${P}meter"><i>CÓDIGOS</i><span>${nb}</span></div><div class="${P}meter"><i>INSUMOS</i><span>${ni}</span></div>
<div class="${P}meter ok"><i>MI PROYECTO</i><span>${SEL.size}</span></div><div class="${P}meter ok"><i>VINCULADOS</i><span>${vin}</span></div>`;
        const n = root.querySelector('[data-r="nsel"]'); if (n) n.textContent = SEL.size;
      }
      function guia() {
        const g = root.querySelector('[data-r="guide"]'); if (!g) return;
        const ok = [SEL.size > 0, !!ST.pasos.p2, !!ST.pasos.p3, !!ST.pasos.p4];
        const now = ok.indexOf(false);
        const T = [["Elige los códigos", "que usarás (＋ en el catálogo)"], ["Descarga", "parámetros y keynotes de TU proyecto"], ["En Revit", "Gestionar › Parámetros / Notas clave · Type Mark = código"], ["Cuantifica", "envía a Insumos y pon cantidades"]];
        g.innerHTML = T.map((t, i) => `<button class="${P}gs${ok[i] ? " ok" : ""}${i === now ? " now" : ""}" data-g="${i + 1}"><i>${ok[i] ? "✓" : i + 1}</i><div><b>${t[0]}</b><span>${t[1]}</span></div></button>`).join("") +
          `<button class="${P}gnext" data-g="next">SIGUIENTE ${G.next}</button>`;
      }
      function marcarTabs() { root.querySelectorAll("[data-tab]").forEach(b => b.classList.toggle("on", b.dataset.tab === UI.tab)); }
      function vista() {
        const m = root.querySelector('[data-r="main"]'); if (!m) return;
        if (VL) { VL.destroy(); VL = null; } if (VS) { VS.destroy(); VS = null; }
        if (UI.tab === "cat") return vCat(m);
        if (UI.tab === "proy") return vProy(m);
        if (UI.tab === "esq") return vEsq(m);
        if (UI.tab === "conv") return vConv(m);
        return vExp(m);
      }
      function angosto() { return root.clientWidth < 760; }

      /* — selección del proyecto — */
      function usar(cods, on) {
        let n = 0;
        cods.forEach(c => { const o = D().getCode(c); if (!o || o.tip) return; if (on && !SEL.has(c)) { SEL.add(c); n++; } else if (!on && SEL.delete(c)) n++; });
        guardar(); medidores(); guia();
        return n;
      }

      /* — Catálogo — */
      function vCat(m) {
        const TREE = D().tree();
        const dsel = UI.disc === "*" ? null : TREE.find(d => d.c === UI.disc);
        if (!dsel) UI.disc = "*";
        const chips = `<button class="${P}chip${UI.disc === "*" ? " on" : ""}" data-d="*"><span class="dot" style="color:var(--acc);background:var(--acc)"></span>TODAS <em data-cn="*"></em></button>` +
          TREE.map(d => `<button class="${P}chip${UI.disc === d.c ? " on" : ""}" data-d="${d.c}" title="${esc(d.n)}"><span class="dot" style="color:${d.color};background:${d.color}"></span>${d.c} <em data-cn="${d.c}"></em></button>`).join("");
        let tree = "", mtree = "";
        if (dsel) {
          tree = `<button class="${P}tn${!UI.sis ? " on" : ""}" data-s=""><code>${dsel.c}</code><span>${esc(dsel.n)}</span><em>${dsel.total}</em></button>`;
          dsel.sistemas.forEach(s => {
            const n = s.familias.reduce((a, f) => a + f.tipos.length, 0), abierto = UI.sis === s.c;
            tree += `<button class="${P}tn${abierto && !UI.fam ? " on" : ""}" data-s="${esc(s.c)}"><span class="car">${abierto ? "▾" : "▸"}</span><code>${esc(s.c)}</code><span>${esc(s.n)}</span><em>${n}</em></button>`;
            if (abierto) s.familias.forEach(f => tree += `<button class="${P}tn f${UI.fam === f.c ? " on" : ""}" data-s="${esc(s.c)}" data-f="${esc(f.c)}"><code>${esc(f.c)}</code><span>${esc(f.n)}</span><em>${f.tipos.length}</em></button>`);
          });
          mtree = `<button class="${P}chip${!UI.sis ? " on" : ""}" data-s="">TODO ${dsel.c}</button>` + dsel.sistemas.map(s => `<button class="${P}chip${UI.sis === s.c ? " on" : ""}" data-s="${esc(s.c)}">${esc(s.c)} <em>${esc(String(s.n).slice(0, 22))}</em></button>`).join("");
          if (UI.sis) { const s = dsel.sistemas.find(z => z.c === UI.sis); if (s) mtree += s.familias.map(f => `<button class="${P}chip${UI.fam === f.c ? " on" : ""}" data-s="${esc(s.c)}" data-f="${esc(f.c)}" style="border-color:rgba(var(--done-rgb),.35)">${esc(f.c)} <em>${esc(String(f.n).slice(0, 18))}</em></button>`).join(""); }
        } else {
          tree = TREE.map(d => `<button class="${P}tn" data-d="${d.c}"><code style="color:${d.color}">${d.c}</code><span>${esc(d.n)}</span><em>${d.total}</em></button>`).join("");
        }
        m.innerHTML = `<div class="${P}chips" data-r="chips">${chips}</div><div class="${P}mtree">${mtree}</div>
<div class="${P}body"><nav class="${P}tree">${tree}</nav>
<div class="${P}lw"><div class="${P}lhd" data-r="lhd"></div><div class="${P}list" data-r="list"></div></div></div>`;
        m.querySelectorAll("[data-d]").forEach(b => b.onclick = () => { UI.disc = b.dataset.d; UI.sis = ""; UI.fam = ""; vista(); });
        m.querySelectorAll("[data-s]").forEach(b => b.onclick = () => {
          const s = b.dataset.s, f = b.dataset.f || "";
          if (!f && UI.sis === s && !UI.fam && s) UI.sis = ""; else { UI.sis = s; UI.fam = f; }
          if (!f) UI.fam = ""; vista();
        });
        const lst = m.querySelector('[data-r="list"]');
        const rowH = () => angosto() ? 70 : 56;
        RES = filtrar();
        VL = D().vlist(lst, { rowH, n: RES.length, row: filaCat });
        lst.addEventListener("click", e => {
          const u = e.target.closest("[data-use]");
          if (u) {
            e.stopPropagation(); const c = u.dataset.use, on = !SEL.has(c); usar([c], on);
            const r = u.closest("." + P + "row"); if (r) r.classList.toggle("on", on);
            u.classList.toggle("on", on); u.innerHTML = on ? G.chk : G.plus;
            ctx.toast(on ? "En mi proyecto: " + c : "Quitado: " + c);
            if (UI.panel === "det" && UI.sel === c) detalle();
            return;
          }
          const r = e.target.closest("[data-c]"); if (r) { UI.sel = r.dataset.c; lst.querySelectorAll("." + P + "row.sel").forEach(z => z.classList.remove("sel")); r.classList.add("sel"); detalle(); }
        });
        cabecera(); conteos();
        m.querySelectorAll("." + P + "chips ." + P + "chip.on, ." + P + "mtree ." + P + "chip.on").forEach(c => { const pr = c.parentElement; if (c.offsetLeft + c.offsetWidth > pr.clientWidth) pr.scrollLeft = c.offsetLeft - 14; });
        if (UI.panel === "det" && UI.sel) detalle();
      }
      function filaCat(i) {
        const c = RES[i]; if (!c) return "";
        const on = SEL.has(c.cod), mia = c.tip && ((ctx.tipo && ctx.tipo.id === c.id) || (ctx.P && ctx.P.tipo === c.id));
        const lk = c.tip ? `<span class="${P}lk" style="color:#FFC857">ATLAS</span>` : `<span class="${P}lk${c.vinc ? " y" : ""}">${c.vinc ? c.vinc + " INS" : "—"}</span>`;
        return `<div class="${P}row${on ? " on" : ""}${UI.sel === c.cod ? " sel" : ""}" style="--c:${c.color}" data-c="${esc(c.cod)}">
<code>${c.tip ? `<span style="color:#FFC857">${esc(c.cod)}</span>` : segs(c.cod, c.color)}${c._u ? `<span class="${P}tg" style="color:var(--done)">MÍO</span>` : ""}${mia ? `<span class="${P}tg" style="color:#FFC857">TU PROYECTO</span>` : ""}</code><div class="n"><b>${esc(c.n)}</b><small>${esc([c.dim, c.sis + " · " + c.famN].filter(Boolean).join("  ·  "))}</small></div>
${lk}<span class="u">${esc(c.unidad)}</span><button class="${P}use${on ? " on" : ""}" data-use="${esc(c.cod)}" ${c.tip ? "disabled" : ""} title="${on ? "Quitar de mi proyecto" : "Usar en mi proyecto"}" aria-label="${on ? "Quitar de mi proyecto" : "Usar en mi proyecto"} ${esc(c.cod)}">${on ? G.chk : G.plus}</button></div>`;
      }
      function cabecera() {
        const h = root.querySelector('[data-r="lhd"]'); if (!h) return;
        const dsel = UI.disc === "*" ? null : D().tree().find(d => d.c === UI.disc);
        const titulo = dsel ? `${dsel.c} · ${dsel.n}` + (UI.sis ? ` › ${UI.sis}` : "") + (UI.fam ? ` › ${UI.fam}` : "") : "TODOS LOS CÓDIGOS";
        const usables = RES.filter(c => !c.tip), todos = usables.length && usables.every(c => SEL.has(c.cod));
        const alc = UI.fam ? "FAMILIA" : UI.sis ? "SISTEMA" : (dsel || UI.q) ? "RESULTADOS" : "";
        const warn = ST.confirmado
          ? ""
          : `<div class="${P}warn"><b>POR VERIFICAR</b><span class="t" style="flex:1;min-width:160px">Dimensiones y modelos referenciales del mercado ecuatoriano 2026; confirma con la ficha del proveedor.</span><button class="${P}btn sm" data-a="conf">CONFIRMAR</button></div>`;
        h.innerHTML = `<h3>${esc(titulo)}</h3><small data-r="cnt">${RES.length} código(s)</small>
${alc && usables.length && usables.length <= 1500 ? `<button class="${P}btn sm ${todos ? "ok" : ""}" data-a="usarTodo">${todos ? G.chk : G.plus}${todos ? "QUITAR" : "USAR"} ${alc} (${usables.length})</button>` : ""}${warn}`;
        h.onclick = e => {
          const a = e.target.closest("[data-a]"); if (!a) return;
          if (a.dataset.a === "conf") { ST.confirmado = true; ST.fecha = new Date().toISOString().slice(0, 10); guardar(); cabecera(); }
          if (a.dataset.a === "usarTodo") { const n = usar(usables.map(c => c.cod), !todos); ctx.toast((todos ? "Quitados " : "Agregados a mi proyecto: ") + n + " código(s)"); VL && VL.refresh(); cabecera(); }
        };
      }
      function conteos() {
        const toks = nrm(UI.q).split(/\s+/).filter(Boolean), cnt = {}; let tot = 0;
        for (const c of D().codes()) { let ok = true; for (const t of toks) if (!c.h.includes(t)) { ok = false; break; } if (ok) { cnt[c.disc] = (cnt[c.disc] || 0) + 1; tot++; } }
        root.querySelectorAll("[data-cn]").forEach(e => { const k = e.dataset.cn; e.textContent = k === "*" ? tot : (cnt[k] || 0); });
      }
      function actualizarLista() {
        const t0 = performance.now();
        RES = filtrar();
        if (VL) VL.set(RES.length, filaCat);
        cabecera(); conteos();
        const L = root.querySelector('[data-r="list"]');
        if (L) { let e = L.querySelector("." + P + "empty"); if (!RES.length && !e) { e = document.createElement("div"); e.className = P + "empty"; e.textContent = "Sin resultados. Prueba con menos palabras, cambia la disciplina o crea el código con ＋ CÓDIGO."; L.prepend(e); } else if (RES.length && e) e.remove(); }
        D().perf.filtrarCodificacion = +(performance.now() - t0).toFixed(1);
      }

      /* — panel lateral — */
      function cerrarPanel() { UI.panel = ""; const o = root.querySelector("." + P + "det"); if (o) o.remove(); root.querySelectorAll("." + P + "row.sel").forEach(z => z.classList.remove("sel")); }
      function panel(titulo, html) {
        const old = root.querySelector("." + P + "det");
        const d = document.createElement("aside"); d.className = P + "det";
        if (old) { d.style.animation = "none"; old.replaceWith(d); } else root.appendChild(d);
        d.innerHTML = `<header>${G.hex}<b>${titulo}</b><button class="${P}cp" data-a="x" title="Cerrar" aria-label="Cerrar">${G.x}</button></header><div class="bd">${html}</div>`;
        d.onclick = null;
        return d;
      }
      function detalle(confirmarDel) {
        const x = D().getCode(UI.sel); if (!x) { cerrarPanel(); return; }
        UI.panel = "det";
        const p = x.cod.split("-"), on = SEL.has(x.cod), vin = D().byCode(x.cod).insumos;
        const kv = (lab, val, mono, cp) => `<div class="${P}kv"><div class="${mono ? "m" : ""}"><i>${lab}</i>${esc(val || "—")}</div>${cp && val ? `<button class="${P}cp" data-cp="${esc(val)}" title="Copiar" aria-label="Copiar">${G.copy}</button>` : "<span></span>"}</div>`;
        const ins = vin.slice(0, 60).map(r => `<div class="${P}ins" data-ins="${esc(r.id)}"><div>${esc(r.desc)}</div><small>${esc(r.hoja)} · ${esc(r.unidad)}</small>
<div class="p">A $${$(r.pA)} · B $${$(r.pB)}<em style="color:${r.est ? "var(--warn)" : "var(--done)"}">${r.est ? "ESTIMADO" : "VERIFICADO"}</em></div></div>`).join("");
        const d = panel(x.tip ? "TIPOLOGÍA DEL ATLAS" : "FICHA DEL CÓDIGO", `
<div class="${P}big">${x.tip ? `<span style="color:#FFC857">${esc(x.cod)}</span>` : segs(x.cod, x.color)}</div>
${x.tip ? `<div class="${P}lbl"><span>${esc(x.sis)}</span><span>${esc(x.fam)}</span></div>` : `<div class="${P}lbl"><span>DISC ${esc(p[0])}</span><span>SIS ${esc(p[1])}</span><span>FAM ${esc(p[2])}</span><span>VAR ${esc(p.slice(3).join("-"))}</span>${x._u ? `<span style="color:var(--done)">CREADO POR TI</span>` : ""}</div>`}
<div style="font-size:15px;margin-bottom:4px">${esc(x.n)}</div><div style="color:var(--muted);font-size:12px">${esc(x.dim || "")}${x.nota ? " · " + esc(x.nota) : ""}</div>
${x.tip ? `<p style="color:var(--muted);font-size:12.5px">Código de tipología usado para nombrar las carpetas del proyecto (sala Arranque). Se edita en el Atlas.</p>` : `
<div class="${P}acts">
  <button class="${P}btn ${on ? "ok" : "pri"}" data-a="usar">${on ? G.chk + "EN MI PROYECTO" : G.plus + "USAR EN MI PROYECTO"}</button>
  <button class="${P}btn" data-a="edit">${G.pen}EDITAR</button>
  <button class="${P}btn bad" data-a="del">${G.trash}ELIMINAR</button>
</div>
${confirmarDel ? `<div class="${P}conf"><b>¿ELIMINAR ${esc(x.cod)}?</b><br>${vin.length ? `Tiene <b>${vin.length} insumo(s) vinculado(s)</b>: no se borran, quedan marcados «SIN CÓDIGO» en Insumos hasta que les asignes otro.` : "No tiene insumos vinculados."}${on ? " También se quitará de tu proyecto." : ""}
<div class="${P}acts" style="margin-bottom:0"><button class="${P}btn bad" data-a="delok">${G.trash}SÍ, ELIMINAR</button><button class="${P}btn" data-a="delno">CANCELAR</button></div></div>` : ""}`}
${kv(x.tip ? "CÓDIGO DE TIPOLOGÍA" : "TYPE MARK  ·  DION_CODIGO  ·  KEYNOTE", x.cod, 1, 1)}
${x.tip ? "" : `${kv("NOMBRE DE TIPO REVIT", x.rvt, 1, 1)}
${kv("ASSEMBLY CODE (UNIFORMAT II N3)", x.sis + " — " + x.sisN, 0, 0)}
${kv("CATEGORÍA REVIT", x.cat, 0, 0)}
${kv("FAMILIA DION", x.fam + " — " + x.famN, 0, 0)}
${kv("KEYNOTE PADRE", x.disc + "-" + x.u2 + "-" + x.fam, 1, 1)}
${kv("IFC 4.3 (IfcExportAs.Type)", x.ifc, 1, 1)}
${kv("OMNICLASS 23 (REF.)", x.omni, 1, 0)}
${kv("UNIDAD DE CANTIDAD", x.unidad, 1, 0)}
${kv("CARPETA / MODELO", (x.carpeta || "") + " · " + (x.ruta || ""), 0, 0)}
${x.famDesc ? kv("REGLA DE LA FAMILIA", x.famDesc, 0, 0) : ""}
<div class="${P}sec">${G.link}<span style="flex:1">INSUMOS VINCULADOS (${vin.length})</span>${vin.length ? `<button class="${P}btn sm" data-a="verIns">VER EN INSUMOS</button>` : ""}</div>
${vin.length ? ins + (vin.length > 60 ? `<p style="color:var(--muted);font-size:12px">… y ${vin.length - 60} más</p>` : "") : `<p style="color:var(--muted);font-size:12.5px">Ningún insumo usa este código. En la sala Insumos, al crear o editar un ítem elige este código en «Código DION» y quedará vinculado.</p>`}`}`);
        d.onclick = e => {
          const cp = e.target.closest("[data-cp]"); if (cp) { copiar(cp.dataset.cp, cp, ctx); return; }
          const a = e.target.closest("[data-a]"), ins = e.target.closest("[data-ins]");
          if (ins && !a) { D().emit({ type: "focus", mod: "insumos", id: ins.dataset.ins, cod: x.cod }); ctx.open("insumos"); return; }
          if (!a) return;
          const k = a.dataset.a;
          if (k === "x") cerrarPanel();
          else if (k === "usar") { const nv = !SEL.has(x.cod); usar([x.cod], nv); ctx.toast(nv ? "En mi proyecto: " + x.cod : "Quitado de mi proyecto"); detalle(); if (VL) VL.refresh(); cabecera(); }
          else if (k === "edit") formulario(x.cod);
          else if (k === "del") detalle(true);
          else if (k === "delno") detalle(false);
          else if (k === "delok") { const n = D().deleteCode(x.cod); ctx.toast("Código eliminado" + (n ? " · " + n + " insumo(s) quedaron sin código" : "")); }
          else if (k === "verIns") { D().emit({ type: "focus", mod: "insumos", cod: x.cod }); ctx.open("insumos"); }
        };
      }

      /* — formulario guiado: agregar / editar código — */
      function formulario(cod) {
        const ed = cod ? D().getCode(cod) : null;
        if (ed && ed.tip) return;
        UI.panel = "form";
        const DS = D().disciplinas();
        const TREE = D().tree();
        const f = {
          disc: ed ? ed.disc : (UI.disc !== "*" && UI.disc !== "TIP" ? UI.disc : DS[0].c),
          sis: ed ? ed.sis : (UI.sis || ""), fam: ed ? ed.fam : (UI.fam || ""), nf: false, fc: "", fn: "", fcat: "",
          v: ed ? ed.cod.split("-").slice(3).join("-") : "", n: ed ? ed.n : "", dim: ed ? ed.dim || "" : "", unidad: ed ? ed.unidad || "U" : "U",
          ifc: ed ? ed.ifc || "" : "", nota: ed ? ed.nota || "" : "", rvt: ed ? ed.rvt || "" : ""
        };
        const dNode = () => TREE.find(d => d.c === f.disc) || { sistemas: [] };
        const sNode = () => dNode().sistemas.find(s => s.c === f.sis);
        if (!sNode()) f.sis = (dNode().sistemas[0] || {}).c || "";
        if (!ed && f.fam && !(sNode() || { familias: [] }).familias.find(x => x.c === f.fam)) f.fam = "";
        const pre = () => { const s = sNode(); return s ? `${f.disc}-${s.u2}-${f.nf ? f.fc : f.fam}` : ""; };
        const codigo = () => (pre() + "-" + f.v).toUpperCase();
        const d = panel(ed ? "EDITAR CÓDIGO" : "AGREGAR CÓDIGO", `<form data-r="frm" autocomplete="off">
<p style="color:var(--muted);font-size:12px;margin:0 0 10px">${ed ? "Si cambias disciplina, sistema, familia o variante, el código se <b>renombra</b> y los insumos vinculados se actualizan solos." : "Elige dónde va el elemento; DION propone el siguiente correlativo libre y valida el esquema DISC-SIS-FAM-VAR."}</p>
<label class="${P}f"><i>1 · DISCIPLINA</i><select data-k="disc">${DS.map(x => `<option value="${x.c}">${x.c} · ${esc(x.n)}</option>`).join("")}</select></label>
<label class="${P}f"><i>2 · SISTEMA (UNIFORMAT II)</i><select data-k="sis"></select></label>
<label class="${P}f"><i>3 · FAMILIA</i><select data-k="fam"></select></label>
<div data-r="nf" class="${P}f2" style="display:none">
  <label class="${P}f"><i>CÓDIGO FAMILIA (2–3 LETRAS)</i><input class="mono" data-k="fc" maxlength="3" placeholder="ABC"></label>
  <label class="${P}f"><i>NOMBRE DE LA FAMILIA</i><input data-k="fn" placeholder="Ej. Lavamanos pediátrico"></label>
  <label class="${P}f" style="grid-column:1/-1"><i>CATEGORÍA REVIT</i><input data-k="fcat" placeholder="Aparatos sanitarios, Muros, Puertas…"></label>
</div>
<label class="${P}f"><i>4 · VARIANTE (TIPO/MAT-DIM-OPC · 1 A 3 SEGMENTOS)</i><div class="${P}varw"><input class="mono" data-k="v" placeholder="COR-ALM-120X150"><button type="button" class="${P}btn sm" data-a="sug" title="Proponer siguiente correlativo">PROPONER</button></div></label>
<div class="${P}prev" data-r="prev"></div><div class="${P}msg" data-r="msg"></div>
<label class="${P}f"><i>DESCRIPCIÓN *</i><input data-k="n" placeholder="Ventana corrediza de aluminio 120x150 cm"></label>
<div class="${P}f2"><label class="${P}f"><i>DIMENSIÓN / ESPECIFICACIÓN</i><input data-k="dim" placeholder="120x150 cm · vidrio 6 mm"></label>
<label class="${P}f"><i>UNIDAD</i><input data-k="unidad" list="${P}uds" placeholder="U, m, m², m³, kg, gl"></label></div>
<datalist id="${P}uds"><option>U</option><option>m</option><option>m²</option><option>m³</option><option>kg</option><option>gl</option><option>pto</option><option>juego</option></datalist>
<div class="${P}f2"><label class="${P}f"><i>IFC 4.3</i><input data-k="ifc" placeholder="IfcWindow.WINDOW"></label>
<label class="${P}f"><i>NOMBRE DE TIPO REVIT</i><input data-k="rvt" placeholder="(opcional)"></label></div>
<label class="${P}f"><i>NOTA / NORMA</i><input data-k="nota" placeholder="NEC, INEN, proveedor…"></label>
<div class="${P}acts"><button type="submit" class="${P}btn pri" data-r="ok">${G.chk}${ed ? "GUARDAR CAMBIOS" : "CREAR CÓDIGO"}</button><button type="button" class="${P}btn" data-a="cancel">CANCELAR</button></div>
${ed ? "" : `<label style="display:flex;gap:10px;align-items:center;min-height:44px;font-size:13px;cursor:pointer"><input type="checkbox" data-k="usarlo" checked style="width:20px;height:20px;accent-color:var(--done)"> Agregarlo también a MI PROYECTO</label>`}
</form>`);
        const q = k => d.querySelector(`[data-k="${k}"]`), prev = d.querySelector('[data-r="prev"]'), msg = d.querySelector('[data-r="msg"]'), okb = d.querySelector('[data-r="ok"]');
        const llenarSis = () => { const s = dNode().sistemas; q("sis").innerHTML = s.map(x => `<option value="${esc(x.c)}">${esc(x.c)} · ${esc(x.u2)} · ${esc(x.n)}</option>`).join(""); q("sis").value = f.sis; };
        const llenarFam = () => {
          const s = sNode(), fs = s ? s.familias : [];
          q("fam").innerHTML = fs.map(x => `<option value="${esc(x.c)}">${esc(x.c)} · ${esc(x.n)} (${x.tipos.length})</option>`).join("") + `<option value="__nueva">＋ Nueva familia…</option>`;
          if (f.nf) q("fam").value = "__nueva"; else { if (!fs.find(x => x.c === f.fam)) f.fam = fs[0] ? fs[0].c : ""; if (!f.fam) f.nf = true; q("fam").value = f.nf ? "__nueva" : f.fam; }
          d.querySelector('[data-r="nf"]').style.display = f.nf ? "" : "none";
        };
        const sugerir = () => {
          const s = sNode(); if (!s) return;
          const fc = f.nf ? f.fc : f.fam; if (!fc) { f.v = f.v || "N01"; return; }
          const c = D().suggest(f.disc, s.u2, fc); f.v = c.split("-").slice(3).join("-"); q("v").value = f.v;
          if (!ed && (!f.ifc || f.ifcAuto)) { const fam = s.familias.find(x => x.c === fc); f.ifc = fam ? fam.ifc || "" : ""; f.ifcAuto = true; q("ifc").value = f.ifc; }
        };
        const validar = () => {
          const c = codigo(), s = sNode();
          let err = "";
          if (f.nf) {
            if (!/^[A-Z]{2,3}$/.test(f.fc)) err = "Código de familia: 2–3 letras A–Z.";
            else if (s && s.familias.find(x => x.c === f.fc) && !ed) err = "Esa familia ya existe en este sistema: elígela en la lista.";
            else if (!f.fn.trim()) err = "Ponle nombre a la familia nueva.";
          }
          if (!err) err = D().validate(c, ed ? ed.cod : "");
          if (!err && !f.n.trim()) err = "Escribe la descripción.";
          prev.innerHTML = segs(c, (D().tree().find(x => x.c === f.disc) || {}).color || "#fff") + ` <small style="font-size:11px;color:var(--muted);font-family:var(--f-m)">${c.length}/28</small>`;
          prev.classList.toggle("bad", !!err);
          msg.textContent = err || (ed && c !== ed.cod ? "✓ Válido · se renombrará " + ed.cod + " → " + c + (ed.vinc ? " y sus " + ed.vinc + " insumo(s)" : "") : "✓ Código válido y libre");
          msg.classList.toggle("ok", !err);
          okb.disabled = !!err;
          return !err;
        };
        q("disc").value = f.disc; llenarSis(); llenarFam();
        ["v", "n", "dim", "unidad", "ifc", "nota", "rvt"].forEach(k => q(k).value = f[k]);
        if (!ed) sugerir();
        validar();
        d.addEventListener("change", e => {
          const k = e.target.dataset.k; if (!k) return;
          if (k === "disc") { f.disc = e.target.value; f.sis = (dNode().sistemas[0] || {}).c || ""; f.nf = false; f.fam = ""; llenarSis(); llenarFam(); if (!ed) sugerir(); }
          else if (k === "sis") { f.sis = e.target.value; f.nf = false; f.fam = ""; llenarFam(); if (!ed) sugerir(); }
          else if (k === "fam") { f.nf = e.target.value === "__nueva"; if (!f.nf) f.fam = e.target.value; llenarFam(); if (!ed || !f.nf) sugerir(); }
          validar();
        });
        d.addEventListener("input", e => {
          const k = e.target.dataset.k; if (!k || k === "usarlo") return;
          if (k === "v" || k === "fc") { const p0 = e.target.selectionStart; e.target.value = e.target.value.toUpperCase().replace(/[^A-Z0-9-]/g, k === "fc" ? "" : "").replace(k === "fc" ? /[^A-Z]/g : /(?!)/, ""); try { e.target.setSelectionRange(p0, p0); } catch (er) { } }
          f[k] = e.target.value; if (k === "ifc") f.ifcAuto = false;
          if (k === "fc" && !ed && /^[A-Z]{2,3}$/.test(f.fc)) sugerir();
          validar();
        });
        d.onclick = e => {
          const a = e.target.closest("[data-a]"); if (!a) return;
          if (a.dataset.a === "x" || a.dataset.a === "cancel") { if (ed) { UI.sel = ed.cod; detalle(); } else cerrarPanel(); }
          else if (a.dataset.a === "sug") { sugerir(); validar(); }
        };
        d.querySelector('[data-r="frm"]').onsubmit = e => {
          e.preventDefault();
          if (!validar()) return;
          const c = codigo(), s = sNode();
          const datos = { cod: c, n: f.n.trim(), dim: f.dim.trim(), unidad: f.unidad.trim() || "U", ifc: f.ifc.trim(), nota: f.nota.trim(), rvt: f.rvt.trim() || (f.disc + "_" + (f.nf ? f.fc : f.fam) + "_" + f.n.trim().replace(/\s+/g, "-").slice(0, 40)), _s: s ? s.c : "" };
          if (f.nf) { datos.famN = f.fn.trim(); datos.cat = f.fcat.trim(); }
          try {
            if (ed) {
              let cur = ed.cod;
              if (c !== ed.cod) { D().renameCode(ed.cod, c); cur = c; }
              D().upsertCode(Object.assign({}, datos, { cod: cur }));
              ctx.toast(c !== ed.cod ? "Renombrado " + ed.cod + " → " + c : "Código actualizado");
            } else {
              D().upsertCode(Object.assign({ origen: "usuario" }, datos));
              const us = q("usarlo"); if (us && us.checked) usar([c], true);
              ctx.toast("Código creado: " + c);
            }
            UI.sel = c; UI.tab = "cat"; UI.disc = f.disc; UI.sis = s ? s.c : ""; UI.fam = c.split("-")[2];
            marcarTabs(); vista();
            const i = RES.findIndex(z => z.cod === c); if (i >= 0 && VL) VL.scrollTo(i);
            detalle();
          } catch (er) { msg.textContent = er.message; msg.classList.remove("ok"); }
        };
        setTimeout(() => { const v = q(ed ? "n" : "v"); if (v && !angosto()) v.focus(); }, 30);
      }

      /* — MI PROYECTO — */
      function vProy(m) {
        const C = D(), sel = [...SEL].map(c => C.getCode(c)).filter(Boolean);
        const tid = (ctx.tipo && ctx.tipo.id) || (ctx.P && ctx.P.tipo);
        const tip = C.codes().find(c => c.tip && c.id === tid);
        const porD = new Map(); sel.forEach(c => { if (!porD.has(c.disc)) porD.set(c.disc, []); porD.get(c.disc).push(c); });
        const vin = []; sel.forEach(c => C.byCode(c.cod).insumos.forEach(r => vin.push(r)));
        const carro = (ctx.get("insumos") || {}).items || [], enCarro = new Set(carro.map(l => l.id));
        const faltan = vin.filter(r => !enCarro.has(r.id)).length;
        const maxD = Math.max(1, ...[...porD.values()].map(v => v.length));
        const ok = [sel.length > 0, !!ST.pasos.p2, !!ST.pasos.p3, !!ST.pasos.p4];
        const tipH = tip ? `<div class="${P}tip"><code>${esc(tip.cod)}</code><div><b>${esc(tip.n)}</b><small>Tipología del Atlas de este proyecto · ${esc(tip.sis)} · usada en las carpetas (Arranque)</small></div></div>` : "";
        m.innerHTML = `<div class="${P}pane" data-r="pane">
${tipH}
<div class="${P}g2">
  <div class="${P}card${ok[0] ? " ok" : ""}" data-paso="1"><h4><i>${ok[0] ? "✓" : 1}</i>CÓDIGOS DE ${esc(proyN.toUpperCase())}</h4>
    ${sel.length ? `<p>${sel.length} código(s) en ${porD.size} disciplina(s). Agrega más desde el catálogo con ＋ (por código, familia o sistema).</p>
    ${[...porD.entries()].map(([dc, l]) => `<div class="${P}disb" style="--c:${l[0].color}"><b>${esc(dc)}</b><div class="${P}bar"><i style="width:${Math.max(4, l.length / maxD * 100)}%"></i></div><span>${l.length}</span></div>`).join("")}`
    : `<p><b style="color:var(--ink)">Empieza aquí.</b> Abre el CATÁLOGO, busca (ej. «ventana», «PVC 110», «THHN») y toca <b style="color:var(--acc)">＋</b> en cada elemento que tendrá tu proyecto. Con una disciplina/sistema/familia filtrada aparece «USAR … (n)» para agregar todo el grupo.</p>`}
    <div class="${P}acts" style="margin-bottom:0"><button class="${P}btn pri" data-a="cat">${G.cat}${sel.length ? "ELEGIR MÁS" : "IR AL CATÁLOGO"}</button>${sel.length ? `<button class="${P}btn bad" data-a="vaciar">${G.trash}VACIAR</button>` : ""}</div>
    <div data-r="vac"></div>
  </div>
  <div class="${P}card${ok[1] ? " ok" : ""}" data-paso="2"><h4><i>${ok[1] ? "✓" : 2}</i>DESCARGA LOS ARCHIVOS DE TU PROYECTO</h4>
    <p>Solo con los ${sel.length} códigos elegidos. Guárdalos en la carpeta 0D12 PRM del proyecto.</p>
    <div class="${P}xb">
      <button class="${P}btn" data-x="prm" ${sel.length ? "" : "disabled"}>${G.prm}PARÁMETROS COMPARTIDOS</button>
      <button class="${P}btn" data-x="key" ${sel.length ? "" : "disabled"}>${G.key}KEYNOTES (.TXT)</button>
      <button class="${P}btn" data-x="csv" ${sel.length ? "" : "disabled"}>${G.csv}TABLA CSV (DYNAMO)</button>
      <button class="${P}btn" data-x="xls" ${sel.length ? "" : "disabled"}>${G.xls}EXCEL (.XLS)</button>
    </div>
  </div>
  <div class="${P}card${ok[2] ? " ok" : ""}" data-paso="3"><h4><i>${ok[2] ? "✓" : 3}</i>EN REVIT 2027</h4>
    <ol class="${P}ol">
      <li><b>Gestionar › Parámetros compartidos</b> › Examinar: DION_SharedParameters. Agrega DION_Codigo, DION_Disciplina, DION_Sistema, DION_Familia como parámetros de <b>tipo</b>.</li>
      <li><b>Anotar › Nota clave › Configuración</b>: carga el archivo de keynotes de tu proyecto.</li>
      <li>En cada tipo: <b>Type Mark = código</b> · DION_Codigo = código · Keynote = código · Assembly Code = sistema N3.</li>
      <li>Con muchos tipos: Dynamo lee el CSV y escribe los parámetros (Element.SetParameterByName).</li>
    </ol>
    <div class="${P}acts" style="margin-bottom:0"><button class="${P}btn ${ok[2] ? "ok" : ""}" data-a="p3">${G.chk}${ok[2] ? "HECHO" : "MARCAR COMO HECHO"}</button></div>
  </div>
  <div class="${P}card${ok[3] ? " ok" : ""}" data-paso="4"><h4><i>${ok[3] ? "✓" : 4}</i>CUANTIFICA EN INSUMOS</h4>
    <p>${vin.length ? `Tus códigos tienen <b style="color:var(--ink)">${vin.length} insumo(s)</b> con precio A/B${faltan < vin.length ? ` (${vin.length - faltan} ya están en cuantías)` : ""}. Envíalos y pon las cantidades del modelo (tablas de planificación de Revit).` : "Cuando elijas códigos con insumos vinculados podrás enviarlos a Cuantías con un toque."}</p>
    <div class="${P}acts" style="margin-bottom:0"><button class="${P}btn ok" data-a="enviar" ${faltan ? "" : "disabled"}>${G.cart}ENVIAR A CUANTÍAS (${faltan})</button><button class="${P}btn" data-a="abrirIns">ABRIR INSUMOS</button></div>
  </div>
</div>
${sel.length ? `<div class="${P}card" style="margin-top:12px"><h4>CÓDIGOS ELEGIDOS · TOCA PARA VER LA FICHA</h4><div class="${P}sl" data-r="sl"></div></div>` : ""}
<button class="${P}bign" data-a="next">SIGUIENTE ESTACIÓN ${G.next}</button>
</div>`;
        if (sel.length) {
          const items = [];
          [...porD.entries()].forEach(([dc, l]) => { items.push({ h: 1, c: l[0], n: l.length }); l.sort((a, b) => a.cod < b.cod ? -1 : 1).forEach(c => items.push({ c })); });
          VS = C.vlist(m.querySelector('[data-r="sl"]'), {
            rowH: () => angosto() ? 54 : 44, n: items.length, row: i => {
              const it = items[i], c = it.c;
              if (it.h) return `<div class="${P}sh" style="--c:${c.color}">${esc(c.disc)} · ${esc(c.discN)}<em>${it.n}</em></div>`;
              return `<div class="${P}sr" style="--c:${c.color}" data-c="${esc(c.cod)}"><code>${segs(c.cod, c.color)}</code><span>${esc(c.n)}</span><em style="font-style:normal;font-family:var(--f-m);font-size:10.5px;color:${c.vinc ? "#B98CFF" : "var(--faint)"}">${c.vinc ? c.vinc + " INS" : "—"}</em><button class="${P}cp" data-quitar="${esc(c.cod)}" title="Quitar" aria-label="Quitar ${esc(c.cod)}">${G.x}</button></div>`;
            }
          });
        }
        m.onclick = async e => {
          const qt = e.target.closest("[data-quitar]");
          if (qt) { usar([qt.dataset.quitar], false); ctx.toast("Quitado: " + qt.dataset.quitar); vista(); return; }
          const x = e.target.closest("[data-x]");
          if (x) { exportar(x.dataset.x, "proy"); ST.pasos.p2 = true; guardar(); guia(); const c = m.querySelector('[data-paso="2"]'); if (c) { c.classList.add("ok"); c.querySelector("h4 i").textContent = "✓"; } return; }
          const a = e.target.closest("[data-a]");
          if (!a) { const r = e.target.closest("[data-c]"); if (r) { UI.sel = r.dataset.c; detalle(); } return; }
          const k = a.dataset.a;
          if (k === "cat") { UI.tab = "cat"; marcarTabs(); vista(); }
          else if (k === "vaciar") {
            const v = m.querySelector('[data-r="vac"]');
            v.innerHTML = `<div class="${P}conf"><b>¿Quitar los ${SEL.size} códigos de tu proyecto?</b> (no se borran del catálogo)<div class="${P}acts" style="margin-bottom:0"><button class="${P}btn bad" data-a="vacOk">SÍ, VACIAR</button><button class="${P}btn" data-a="vacNo">CANCELAR</button></div></div>`;
          }
          else if (k === "vacOk") { SEL.clear(); guardar(); medidores(); guia(); vista(); }
          else if (k === "vacNo") { m.querySelector('[data-r="vac"]').innerHTML = ""; }
          else if (k === "p3") { ST.pasos.p3 = !ST.pasos.p3; guardar(); guia(); vista(); }
          else if (k === "enviar") await enviarCuantias();
          else if (k === "abrirIns") ctx.open("insumos");
          else if (k === "next") ctx.next();
        };
      }
      async function enviarCuantias() {
        const C = D(), prev = ctx.get("insumos") || {};
        const st = Object.assign({ items: [], precio: "ref", desp: true, confirmado: false }, prev);
        st.items = Array.isArray(st.items) ? st.items.slice() : [];
        const ya = new Set(st.items.map(l => l.id)); let n = 0;
        SEL.forEach(cod => C.byCode(cod).insumos.forEach(r => {
          if (ya.has(r.id)) return; ya.add(r.id); n++;
          st.items.push({ id: r.id, cod: r.cod, desc: r.desc, hoja: r.hoja, unidad: r.unidad, pref: r.pref, pA: r.pA, pB: r.pB, locA: r.locA, locB: r.locB, desp: r.desp || 0, fuente: r.fuente, q: 1 });
        }));
        st.confirmado = false;
        await ctx.set("insumos", st);
        ST.pasos.p4 = true; guardar(); guia();
        C.emit({ type: "cart", from: K });
        ctx.toast(n ? n + " insumo(s) enviados a Cuantías con cantidad 1 · ajusta las cantidades en Insumos" : "Ya estaban todos en Cuantías");
        vista();
      }

      /* — exportaciones — */
      function itemsDe(alc) {
        if (alc === "proy") return [...SEL].map(c => D().getCode(c)).filter(Boolean);
        if (alc === "filtro") return filtrar();
        return D().codes();
      }
      async function exportar(k, alc) {
        const items = itemsDe(alc), sfx = alc === "proy" ? "_" + slug(proyN) : alc === "filtro" ? "_filtro" : "";
        try {
          if (k === "xls") ctx.download("DION_Codificacion_BIM" + sfx + ".xls", expXLS(items, alc === "proy" ? "Proyecto: " + proyN : ""));
          else if (k === "xlsx") ctx.download("DION_Codificacion_BIM.xlsx", await expXLSX());
          else if (k === "csv") ctx.download("DION_Codigos" + sfx + ".csv", expCSV(items));
          else if (k === "key") ctx.download("DION_Keynotes" + sfx + ".txt", expKeynotes(items));
          else if (k === "prm") ctx.download("DION_SharedParameters.txt", expShared());
          else if (k === "json") ctx.download("codigos.json", expJSON());
          ctx.toast && ctx.toast("Archivo generado");
        } catch (e) { ctx.toast && ctx.toast("No se pudo exportar: " + e.message); }
      }

      /* — Esquema — */
      function vEsq(m) {
        const DATA = D().meta(), E = DATA.esquema, T = D().tree();
        const max = Math.max(...T.map(d => d.total), 1);
        m.innerHTML = `<div class="${P}pane">
<div class="${P}card"><h4>FORMATO DEL CÓDIGO DE ELEMENTO</h4>
  <div class="${P}fmt"><span style="color:#fff">DISC</span>-<span style="color:#7FB3D5">SIS</span>-<span style="color:var(--done)">FAM</span>-<span style="color:#F5B041">VAR</span></div>
  <p style="margin:10px 0 0">${esc(E.formato)}</p></div>
<div class="${P}card"><h4>CAMPOS</h4><table class="${P}tbl"><tr><th>CAMPO</th><th>LONGITUD</th><th>DESCRIPCIÓN</th></tr>${E.campos.map(c => `<tr><td>${esc(c[0])}</td><td style="white-space:nowrap">${esc(c[1])}</td><td>${esc(c[2])}</td></tr>`).join("")}</table></div>
<div class="${P}card"><h4>EJEMPLOS</h4>${E.ejemplos.map(e => `<div class="${P}kv"><div><i>${esc(e[1])}</i><span style="font-family:var(--f-m);font-size:15px">${segs(e[0], "#fff")}</span></div><button class="${P}cp" data-cp="${esc(e[0])}" aria-label="Copiar">${G.copy}</button></div>`).join("")}</div>
<div class="${P}card"><h4>REGLAS</h4><ol class="${P}ol">${DATA.reglas.map(r => `<li>${esc(r)}</li>`).join("")}</ol></div>
<div class="${P}card"><h4>CÓMO SE USA EN REVIT 2027</h4><table class="${P}tbl"><tr><th>DÓNDE</th><th>VALOR</th><th>CÓMO / PARA QUÉ</th></tr>${DATA.revit.map(c => `<tr><td style="white-space:normal">${esc(c[0])}</td><td>${esc(c[1])}</td><td>${esc(c[2])}</td></tr>`).join("")}</table></div>
<div class="${P}card"><h4>DISCIPLINAS → CARPETA → CÓDIGOS</h4><div class="${P}dg">${T.map(d => `<div class="${P}dc" style="--c:${d.color}" data-d="${d.c}"><b>${d.c}</b> <em>${d.total}</em><br><span>${esc(d.n)}</span><br><small style="color:var(--faint);font-family:var(--f-m)">${esc(d.carpeta)}</small><div class="${P}bar"><i style="width:${Math.max(4, d.total / max * 100)}%"></i></div></div>`).join("")}</div></div>
<div class="${P}card"><h4>PARÁMETROS COMPARTIDOS (${DATA.parametros.lista.length})</h4><table class="${P}tbl"><tr><th>NOMBRE</th><th>TIPO</th><th>DESCRIPCIÓN</th></tr>${DATA.parametros.lista.map(p => `<tr><td>${esc(p.n)}</td><td style="font-family:var(--f-m);font-size:11px">${esc(p.tipo)}</td><td>${esc(p.desc)}<br><small style="color:var(--faint);font-family:var(--f-m)">${p.guid}</small></td></tr>`).join("")}</table></div>
</div>`;
        m.querySelectorAll("[data-cp]").forEach(b => b.onclick = () => copiar(b.dataset.cp, b, ctx));
        m.querySelectorAll("[data-d]").forEach(b => b.onclick = () => { UI.tab = "cat"; UI.disc = b.dataset.d; UI.sis = UI.fam = ""; marcarTabs(); vista(); });
      }

      /* — Convenciones (FLUJO_COD) — */
      function vConv(m) {
        const C = D().meta().convenciones, g = C.grupos.find(z => z.id === UI.conv) || C.grupos[0];
        const toks = nrm(UI.q).split(/\s+/).filter(Boolean);
        const filas = g.filas.filter(f => toks.every(t => nrm(f.join(" ")).includes(t)));
        m.innerHTML = `<div class="${P}chips">${C.grupos.map(z => `<button class="${P}chip${z.id === g.id ? " on" : ""}" data-g="${z.id}">${z.id.toUpperCase()} <em>${z.filas.length}</em></button>`).join("")}</div>
<div class="${P}pane"><div class="${P}card"><h4>${esc(g.n.toUpperCase())}</h4><p>${esc(g.desc)}</p>
<table class="${P}tbl"><tr><th>CÓDIGO</th><th>NOMBRE</th><th>NOTA</th></tr>${filas.map(f => `<tr><td>${g.id === "col" && /^#/.test(f[2]) ? `<span style="display:inline-block;width:12px;height:12px;background:${esc(f[2].slice(0, 7))};margin-right:6px;vertical-align:-1px"></span>` : ""}${esc(f[0])}</td><td>${esc(f[1])}</td><td style="color:var(--muted)">${esc(f[2])}</td></tr>`).join("") || `<tr><td colspan="3" style="color:var(--muted)">Sin coincidencias</td></tr>`}</table></div>
<div class="${P}card"><h4>NOMBRES DE ARCHIVO ISO 19650</h4><p style="font-family:var(--f-m);font-size:12.5px;color:var(--ink);word-break:break-word">${esc(C.esquema.formato)}</p><p style="margin:0">${esc(C.esquema.ejemplo)}</p></div>
<div class="${P}card"><h4>INTRODUCCIÓN</h4><p style="color:var(--ink);margin:0">${esc(C.intro)}</p></div></div>`;
        m.querySelectorAll("[data-g]").forEach(b => b.onclick = () => { UI.conv = b.dataset.g; vista(); });
      }

      /* — Exportar — */
      function vExp(m) {
        const nf = filtrar().filter(c => !c.tip).length, nt = D().codes().filter(c => !c.tip).length;
        if (UI.alcance === "proy" && !SEL.size) UI.alcance = "todo";
        const n = UI.alcance === "proy" ? SEL.size : UI.alcance === "filtro" ? nf : nt;
        const OPS = [
          ["xls", G.xls, "EXCEL (.XLS)", "Libro SpreadsheetML 2003 generado en el navegador: esquema, catálogo, una hoja por disciplina, parámetros y convenciones. Incluye tus códigos nuevos y cambios.", "DION_Codificacion_BIM.xls"],
          ["xlsx", G.xls, "EXCEL PROFESIONAL (.XLSX)", "Libro original con colores por disciplina, filtros y encabezados congelados. Siempre catálogo base completo (sin tus cambios).", "DION_Codificacion_BIM.xlsx"],
          ["csv", G.csv, "CSV (;)", "Tabla plana UTF-8 con BOM y separador «;» (configuración regional de Ecuador). Ideal para Dynamo y Power Query.", "DION_Codigos.csv"],
          ["key", G.key, "KEYNOTES REVIT", "Archivo de notas clave tab-delimitado (código · descripción · padre), Unicode. Anotar › Nota clave › Configuración.", "DION_Keynotes.txt"],
          ["prm", G.prm, "PARÁMETROS COMPARTIDOS", "Archivo *META/*GROUP/*PARAM con " + D().meta().parametros.lista.length + " parámetros DION y GUID fijos. Gestionar › Parámetros compartidos.", "DION_SharedParameters.txt"],
          ["json", G.json, "JSON", "Catálogo completo (con tus cambios) en el formato de codigos.json para Dynamo/Python.", "codigos.json"]];
        m.innerHTML = `<div class="${P}pane">
<div class="${P}card"><h4>ALCANCE DE LA EXPORTACIÓN</h4><div class="${P}scope">
  <button class="${P}chip${UI.alcance === "proy" ? " on" : ""}" data-al="proy" ${SEL.size ? "" : "disabled"}>MI PROYECTO <em>${SEL.size}</em></button>
  <button class="${P}chip${UI.alcance === "filtro" ? " on" : ""}" data-al="filtro">FILTRO ACTUAL <em>${nf}</em></button>
  <button class="${P}chip${UI.alcance === "todo" ? " on" : ""}" data-al="todo">CATÁLOGO COMPLETO <em>${nt}</em></button></div>
  <p style="margin:0">Se exportarán <b style="color:var(--ink)">${n}</b> códigos. Parámetros compartidos, .xlsx y JSON siempre son completos. Las tipologías del Atlas no van a Revit.</p></div>
<div class="${P}exg">${OPS.map(o => `<button class="${P}ex" data-x="${o[0]}">${o[1]}<b>${o[2]}</b><small>${esc(o[3])}</small><code>${o[4]}</code></button>`).join("")}</div>
</div>`;
        m.querySelectorAll("[data-al]").forEach(b => b.onclick = () => { UI.alcance = b.dataset.al; vista(); });
        m.querySelectorAll("[data-x]").forEach(b => b.onclick = () => exportar(b.dataset.x, UI.alcance));
      }

      return () => { vivo = false; clearTimeout(tq); if (tSave) { clearTimeout(tSave); ST.sel = [...SEL]; ctx.set(K, Object.assign({}, ctx.get(K), ST)); } if (VL) VL.destroy(); if (VS) VS.destroy(); if (OFF) { OFF(); OFF = null; } };
    }
  };
  /* expuesto para pruebas y otras salas (exportan el catálogo completo con los cambios del usuario) */
  DION_MOD[K]._exp = {
    xls: () => expXLS(D().codes()), csv: () => expCSV(D().codes()), keynotes: () => expKeynotes(D().codes()), shared: () => expShared(), json: () => expJSON(),
    cargar: () => servicio().then(s => s.ready())
  };
})();
