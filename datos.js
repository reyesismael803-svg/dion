/* DION · DION_DATA — servicio compartido de datos (códigos BIM + insumos/precios + tipologías del Atlas).
   Carga UNA sola vez data/codigos.json y data/insumos.json (perezoso: solo cuando una sala llama ready()),
   aplica la capa de cambios del usuario {codigos:{add,edit,del}, insumos:{add,edit,del}} guardada en
   DION.db doc "ajustes/datos_ovr" (o localStorage "dion-datos-ovr") y avisa a las vistas abiertas con on(fn).
   Vínculo: cada insumo lleva `cod`; renameCode() actualiza en cascada los insumos que lo usan. */
(function () {
  if (window.DION_DATA) return;
  const SRC = (document.currentScript && document.currentScript.src) || "";
  const rutas = f => {
    const r = [];
    if (SRC) { try { r.push(new URL("../data/" + f, SRC).href); } catch (e) { } }
    r.push("data/" + f, "../data/" + f);
    return r.filter((u, i) => r.indexOf(u) === i);
  };
  const modUrl = f => { try { if (SRC) return new URL(f, SRC).href; } catch (e) { } return "mods/" + f; };
  const LS = "dion-datos-ovr", DOC = "ajustes/datos_ovr";
  const RX = /^[A-Z]{1,3}-[A-Z0-9]{3}-[A-Z]{2,3}(-[A-Z0-9]+){1,3}$/;
  const nrm = s => String(s == null ? "" : s).normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();
  const vacio = () => ({ codigos: { add: [], edit: {}, del: [] }, insumos: { add: [], edit: {}, del: [] } });
  const idOf = r => r.hoja + "|" + r.cod + "|" + r.desc;
  const hoy = () => new Date().toISOString().slice(0, 10);

  let RAWC = null, BASEC = [], BASEI = [], OVR = vacio(), CARGA = null, LISTO = false, TIPP = null;
  let DMETA = [], DIDX = new Map(), FIDX = new Map();
  let CODES = [], CMAP = new Map(), TREE = [], INS = [], IMAP = new Map(), BYCOD = new Map(), TIP = [];
  const subs = new Set(), perf = {};
  const H = new Map(); // cache de texto normalizado

  const hOf = (k, parts) => { const s = parts.join(" "); let v = H.get(s); if (v === undefined) { v = nrm(s); H.set(s, v); } return v; };

  async function getJSON(f) {
    let err = null;
    for (const u of rutas(f)) {
      try { const r = await fetch(u, { cache: "no-cache" }); if (!r.ok) { err = new Error(u + " → HTTP " + r.status); continue; } return await r.json(); }
      catch (e) { err = e; }
    }
    throw err || new Error("No se encontró data/" + f);
  }
  function db() { try { return (window.DION && window.DION.db) || null; } catch (e) { return null; } }
  async function leerOVR() {
    const d = db();
    if (d) {
      try {
        const snap = await d.doc(DOC).get();
        const ex = snap && (typeof snap.exists === "function" ? snap.exists() : snap.exists);
        if (ex) return snap.data();
      } catch (e) { }
    }
    try { const s = localStorage.getItem(LS); if (s) return JSON.parse(s); } catch (e) { }
    return null;
  }
  function sano(o) {
    const v = vacio(); if (!o || typeof o !== "object") return v;
    ["codigos", "insumos"].forEach(k => {
      const x = o[k] || {};
      v[k].add = Array.isArray(x.add) ? x.add : [];
      v[k].edit = x.edit && typeof x.edit === "object" ? x.edit : {};
      v[k].del = Array.isArray(x.del) ? x.del : [];
    });
    return v;
  }
  let tSave = null;
  function guardar() {
    clearTimeout(tSave);
    tSave = setTimeout(() => {
      const js = JSON.stringify(OVR);
      try { localStorage.setItem(LS, js); } catch (e) { }
      const d = db(); if (d) { try { Promise.resolve(d.doc(DOC).set(JSON.parse(js))).catch(() => { }); } catch (e) { } }
    }, 400);
  }
  function tipologias() {
    if (TIPP) return TIPP;
    TIPP = new Promise(res => {
      if (window.DION_MOD && DION_MOD.arranque && DION_MOD.arranque._paths) return res();
      const s = document.createElement("script"); s.src = modUrl("arranque.js");
      const t = setTimeout(res, 3000); s.onload = s.onerror = () => { clearTimeout(t); res(); };
      document.head.appendChild(s);
    });
    return TIPP;
  }

  /* ───── base aplanada ───── */
  function aplanar() {
    DMETA = []; DIDX = new Map(); FIDX = new Map(); BASEC = [];
    for (const d of RAWC.disciplinas) {
      const dm = { c: d.c, n: d.n, carpeta: d.carpeta, ruta: d.ruta, color: d.color, desc: d.desc, sistemas: [] };
      DMETA.push(dm); DIDX.set(d.c, dm);
      for (const s of d.sistemas) {
        const sm = { c: s.c, n: s.n, u2: s.u2, u2n: s.u2n, familias: [] }; dm.sistemas.push(sm);
        for (const f of s.familias) {
          const fm = { c: f.c, n: f.n, cat: f.cat, ifc: f.ifc, omni: f.omni, desc: f.desc }; sm.familias.push(fm);
          FIDX.set(d.c + "|" + s.u2 + "|" + f.c, { d: dm, s: sm, f: fm });
          for (const t of f.tipos) BASEC.push({ cod: t.cod, n: t.n, dim: t.dim, unidad: t.unidad, ifc: t.ifc, nota: t.nota, rvt: t.rvt, origen: t.origen || "base", _o: t.cod, _s: s.c, _fn: f.n });
        }
      }
    }
  }
  /* coloca un código (por sus segmentos) en disciplina/sistema/familia */
  function colocar(o) {
    const p = String(o.cod).split("-"), dc = p[0], u2 = p[1], fc = p[2];
    const d = DIDX.get(dc);
    o.disc = dc; o.u2 = u2; o.fam = fc;
    o.discN = d ? d.n : dc; o.color = d ? d.color : "#8CA0B6"; o.carpeta = d ? d.carpeta : ""; o.ruta = d ? d.ruta : "";
    const k = FIDX.get(dc + "|" + u2 + "|" + fc);
    if (k) { o.sis = k.s.c; o.sisN = k.s.n; o.famN = k.f.n; o.cat = k.f.cat; o.omni = k.f.omni; o.famDesc = k.f.desc; if (!o.ifc) o.ifc = k.f.ifc; }
    else {
      let s = null;
      if (d) s = d.sistemas.find(z => z.c === o._s && z.u2 === u2) || d.sistemas.find(z => z.u2 === u2);
      o.sis = s ? s.c : (o._s || u2); o.sisN = s ? s.n : (o.sisN || "Sistema " + u2);
      o.famN = o.famN || o._fn || o.n; o.cat = o.cat || ""; o.omni = o.omni || ""; o.famDesc = o.famDesc || "Familia creada por el usuario";
    }
    o.vinc = 0;
    o.h = hOf(o.cod, [o.cod, o.n, o.dim, o.nota, o.rvt, o.ifc, o.famN, o.fam, o.sisN, o.sis, o.discN]);
    return o;
  }
  function aplicar() {
    const t0 = performance.now();
    const C = OVR.codigos, del = new Set(C.del);
    CODES = []; CMAP = new Map();
    for (const b of BASEC) {
      if (del.has(b._o)) continue;
      const e = C.edit[b._o];
      const o = colocar(Object.assign({}, b, e || null, { _o: b._o }));
      if (CMAP.has(o.cod)) continue;
      CODES.push(o); CMAP.set(o.cod, o);
    }
    for (const a of C.add) {
      if (!a || !a.cod || CMAP.has(a.cod)) continue;
      const o = colocar(Object.assign({}, a, { _u: 1, origen: a.origen || "usuario" }));
      CODES.push(o); CMAP.set(o.cod, o);
    }
    /* tipologías del Atlas */
    TIP = [];
    try {
      const g = window.DION_MOD && DION_MOD.arranque && DION_MOD.arranque._paths && DION_MOD.arranque._paths.getCodes;
      const L = g ? (g() || []) : [];
      for (const c of L) {
        if (!c || !c.code || CMAP.has(c.code)) continue;
        const o = { cod: c.code, n: c.n, disc: "TIP", discN: "Tipologías del Atlas", color: "#FFC857", u2: "", sis: c.cat || "—", sisN: c.cat || "—", fam: c.sub || "—", famN: c.sub || "—", unidad: "proyecto", dim: c.sub || "", ifc: "IfcBuilding", nota: "Código de tipología (carpetas del proyecto)", origen: "atlas", tip: 1, id: c.id, vinc: 0 };
        o.h = hOf(o.cod, [o.cod, o.n, o.sis, o.fam, "tipologia atlas"]);
        TIP.push(o); CMAP.set(o.cod, o);
      }
    } catch (e) { }
    /* insumos */
    const I = OVR.insumos, idel = new Set(I.del);
    INS = []; IMAP = new Map(); BYCOD = new Map();
    const push = o => {
      o.est = !o.verif && !/^Real/.test(o.fuente || "");
      o.h = hOf(o.id, [o.cod, o.desc, o.hoja, o.cat, o.subcat, o.fam, o.disc, o.locA, o.locB]);
      o.i = INS.length; INS.push(o); IMAP.set(o.id, o);
      let l = BYCOD.get(o.cod); if (!l) BYCOD.set(o.cod, l = []); l.push(o);
    };
    for (const b of BASEI) { if (idel.has(b.id)) continue; const e = I.edit[b.id]; push(e ? Object.assign({}, b, e, { id: b.id }) : Object.assign({}, b)); }
    for (const a of I.add) { if (!a || !a.id || IMAP.has(a.id)) continue; push(Object.assign({}, a, { _u: 1 })); }
    for (const o of CODES) { const l = BYCOD.get(o.cod); o.vinc = l ? l.length : 0; }
    CODES = CODES.concat(TIP);
    arbol();
    perf.aplicar = +(performance.now() - t0).toFixed(1);
  }
  function arbol() {
    TREE = DMETA.map(d => ({ c: d.c, n: d.n, carpeta: d.carpeta, ruta: d.ruta, color: d.color, desc: d.desc, total: 0,
      sistemas: d.sistemas.map(s => ({ c: s.c, n: s.n, u2: s.u2, u2n: s.u2n, familias: s.familias.map(f => Object.assign({}, f, { tipos: [] })) })) }));
    const td = new Map(TREE.map(d => [d.c, d]));
    if (TIP.length) { const t = { c: "TIP", n: "Tipologías del Atlas", carpeta: "Atlas", ruta: "Atlas tipológico", color: "#FFC857", desc: "Códigos de tipología del Atlas (carpetas del proyecto).", total: 0, sistemas: [], tip: 1 }; TREE.push(t); td.set("TIP", t); }
    for (const o of CODES) {
      let d = td.get(o.disc);
      if (!d) { d = { c: o.disc, n: o.discN, carpeta: "", ruta: "", color: o.color, desc: "", total: 0, sistemas: [] }; TREE.push(d); td.set(o.disc, d); }
      let s = d.sistemas.find(z => z.c === o.sis);
      if (!s) { s = { c: o.sis, n: o.sisN, u2: o.u2, u2n: "", familias: [] }; d.sistemas.push(s); }
      let f = s.familias.find(z => z.c === o.fam);
      if (!f) { f = { c: o.fam, n: o.famN, cat: o.cat, ifc: o.ifc, omni: o.omni, desc: o.famDesc, tipos: [] }; s.familias.push(f); }
      f.tipos.push(o); d.total++;
    }
  }

  function emit(ev) { subs.forEach(fn => { try { fn(ev || {}); } catch (e) { console.error(e); } }); }
  function cambio(ev) { aplicar(); guardar(); emit(ev); }

  /* ───── validación y correlativo ───── */
  function validar(cod, excepto) {
    cod = String(cod || "");
    if (!cod) return "Escribe el código.";
    if (cod.length > 28) return "Máximo 28 caracteres.";
    if (!RX.test(cod)) return "Formato DISC-SIS-FAM-VAR: mayúsculas A–Z y dígitos, separador guion (ej. A-B20-VEN-COR-ALM-120X150).";
    const p = cod.split("-");
    if (!DIDX.has(p[0])) return "La disciplina «" + p[0] + "» no existe (" + DMETA.map(d => d.c).join(", ") + ").";
    if (cod !== excepto && CMAP.has(cod)) return "Ese código ya existe.";
    return "";
  }
  function sugerir(disc, u2, fam) {
    const pre = disc + "-" + u2 + "-" + fam + "-";
    const ex = CODES.filter(c => c.cod.startsWith(pre)).map(c => c.cod.slice(pre.length));
    const libre = v => !CMAP.has(pre + v) && (pre + v).length <= 28;
    for (let i = ex.length - 1; i >= 0; i--) {
      const m = ex[i].match(/^(.*?)(\d+)([A-Z]*)$/);
      if (m) {
        let n = +m[2];
        for (let k = 0; k < 200; k++) { n++; const v = m[1] + String(n).padStart(m[2].length, "0") + m[3]; if (libre(v)) return pre + v; }
      }
    }
    for (let n = 1; n < 1000; n++) { const v = "N" + String(n).padStart(2, "0"); if (libre(v)) return pre + v; }
    return pre + "N" + Date.now().toString(36).toUpperCase().slice(-3);
  }
  const CAMPOS_C = ["n", "dim", "unidad", "ifc", "nota", "rvt", "famN", "cat", "_s", "sisN"];

  /* ───── API ───── */
  const API = {
    ready() {
      if (LISTO) return Promise.resolve(API);
      if (CARGA) return CARGA;
      CARGA = (async () => {
        const t0 = performance.now();
        const [c, i, o] = await Promise.all([getJSON("codigos.json"), getJSON("insumos.json"), leerOVR(), tipologias()]);
        if (!c || !Array.isArray(c.disciplinas)) throw new Error("codigos.json con formato inesperado");
        if (!Array.isArray(i)) throw new Error("insumos.json con formato inesperado");
        RAWC = c; aplanar();
        BASEI = i.map(r => Object.assign({}, r, { id: idOf(r) }));
        OVR = sano(o); aplicar(); LISTO = true;
        perf.carga = +(performance.now() - t0).toFixed(1);
        return API;
      })().catch(e => { CARGA = null; throw e; });
      return CARGA;
    },
    isReady: () => LISTO,
    meta: () => RAWC,
    codes: () => CODES,
    tree: () => TREE,
    insumos: () => INS,
    getCode: cod => CMAP.get(cod) || null,
    getInsumo: id => IMAP.get(id) || null,
    byCode: cod => ({ codigo: CMAP.get(cod) || null, insumos: BYCOD.get(cod) || [] }),
    disciplinas: () => DMETA,
    validate: validar,
    suggest: sugerir,
    regex: RX,
    perf,
    /* crea (si no existe) o edita campos (no el código: usa renameCode) */
    upsertCode(obj) {
      if (!obj || !obj.cod) throw new Error("Falta el código");
      const cur = CMAP.get(obj.cod);
      if (cur && cur.tip) throw new Error("Los códigos de tipología se editan en el Atlas");
      if (cur) {
        const patch = {}; CAMPOS_C.forEach(k => { if (k in obj) patch[k] = obj[k]; });
        if (cur._u) { const a = OVR.codigos.add.find(x => x.cod === cur.cod); Object.assign(a, patch); }
        else OVR.codigos.edit[cur._o] = Object.assign({}, OVR.codigos.edit[cur._o], patch);
        cambio({ type: "codes", op: "edit", cod: obj.cod });
        return CMAP.get(obj.cod);
      }
      const err = validar(obj.cod); if (err) throw new Error(err);
      const nuevo = { cod: obj.cod, origen: obj.origen || "usuario", creado: hoy() };
      CAMPOS_C.forEach(k => { if (k in obj) nuevo[k] = obj[k]; });
      if (!nuevo.n) nuevo.n = obj.cod;
      if (!nuevo.unidad) nuevo.unidad = "U";
      OVR.codigos.add.push(nuevo);
      cambio({ type: "codes", op: "add", cod: obj.cod });
      return CMAP.get(obj.cod);
    },
    deleteCode(cod) {
      const cur = CMAP.get(cod); if (!cur || cur.tip) return 0;
      const n = (BYCOD.get(cod) || []).length;
      if (cur._u) OVR.codigos.add = OVR.codigos.add.filter(x => x.cod !== cod);
      else { delete OVR.codigos.edit[cur._o]; if (!OVR.codigos.del.includes(cur._o)) OVR.codigos.del.push(cur._o); }
      cambio({ type: "codes", op: "del", cod, huerfanos: n });
      return n;
    },
    renameCode(old, nw) {
      const cur = CMAP.get(old); if (!cur) throw new Error("No existe " + old);
      if (cur.tip) throw new Error("Los códigos de tipología se editan en el Atlas");
      if (old === nw) return cur;
      const err = validar(nw); if (err) throw new Error(err);
      if (cur._u) { const a = OVR.codigos.add.find(x => x.cod === old); a.cod = nw; }
      else {
        const e = Object.assign({}, OVR.codigos.edit[cur._o]);
        if (nw === cur._o) delete e.cod; else e.cod = nw;
        if (!e.famN) e.famN = cur.famN; if (!e._s) e._s = cur.sis;
        OVR.codigos.edit[cur._o] = e;
      }
      const vin = (BYCOD.get(old) || []).slice();
      vin.forEach(r => API._setIns(r.id, { cod: nw }));
      cambio({ type: "rename", old, nw, insumos: vin.length });
      return CMAP.get(nw);
    },
    _setIns(id, patch) {
      const cur = IMAP.get(id); if (!cur) return;
      if (cur._u) { const a = OVR.insumos.add.find(x => x.id === id); if (a) Object.assign(a, patch); }
      else OVR.insumos.edit[id] = Object.assign({}, OVR.insumos.edit[id], patch);
    },
    upsertInsumo(obj) {
      if (!obj) throw new Error("Sin datos");
      const limpio = {}; Object.keys(obj).forEach(k => { if (!["h", "i", "est", "_u", "id"].includes(k)) limpio[k] = obj[k]; });
      ["pref", "pA", "pB", "desp", "cant"].forEach(k => { if (k in limpio) limpio[k] = +limpio[k] || 0; });
      if (obj.id && IMAP.has(obj.id)) {
        API._setIns(obj.id, limpio);
        cambio({ type: "insumos", op: "edit", id: obj.id });
        return IMAP.get(obj.id);
      }
      const id = "u" + Date.now().toString(36) + Math.random().toString(36).slice(2, 6);
      const c = CMAP.get(limpio.cod);
      const nuevo = Object.assign({ cod: "", desc: "Nuevo insumo", hoja: "Mis insumos", niv: "", cat: "GENERAL", subcat: "", fam: "", amb: "", unidad: "U", cant: 0, pref: 0, pA: 0, locA: "", pB: 0, locB: "", disc: c ? c.discN : "", dc: c ? c.disc : "", fuente: "Ingresado por el usuario", fecha: hoy(), desp: 0, nuevo: true }, limpio, { id });
      OVR.insumos.add.push(nuevo);
      cambio({ type: "insumos", op: "add", id });
      return IMAP.get(id);
    },
    deleteInsumo(id) {
      const cur = IMAP.get(id); if (!cur) return false;
      if (cur._u) OVR.insumos.add = OVR.insumos.add.filter(x => x.id !== id);
      else { delete OVR.insumos.edit[id]; if (!OVR.insumos.del.includes(id)) OVR.insumos.del.push(id); }
      cambio({ type: "insumos", op: "del", id });
      return true;
    },
    /* ajustes del usuario (capa de cambios) */
    overrides: () => JSON.parse(JSON.stringify(OVR)),
    resetOverrides() { OVR = vacio(); cambio({ type: "codes", op: "reset" }); },
    on(fn) { subs.add(fn); return () => subs.delete(fn); },
    emit,

    /* lista virtualizada: solo pinta las filas visibles. scroller = elemento con overflow:auto */
    vlist(scroller, opt) {
      const box = document.createElement("div"); box.style.cssText = "position:relative;width:100%";
      if (opt.head) { const hd = document.createElement("div"); hd.innerHTML = opt.head; scroller.appendChild(hd); }
      scroller.appendChild(box);
      let n = opt.n || 0, row = opt.row, a = -1, b = -1, raf = 0, rh = 0;
      const over = opt.over || 6;
      const altura = () => { const v = typeof opt.rowH === "function" ? opt.rowH() : opt.rowH; return v || 48; };
      function pintar(force) {
        raf = 0;
        const h = altura(); if (h !== rh) { rh = h; force = true; }
        box.style.height = (n * rh) + "px";
        const top = scroller.scrollTop - box.offsetTop, vh = scroller.clientHeight || 600;
        const s = Math.max(0, Math.floor(top / rh) - over), e = Math.min(n, Math.ceil((top + vh) / rh) + over);
        if (!force && s === a && e === b) return;
        a = s; b = e;
        let html = "";
        for (let i = s; i < e; i++) html += `<div style="position:absolute;left:0;right:0;top:${i * rh}px;height:${rh}px" data-vi="${i}">${row(i)}</div>`;
        box.innerHTML = html;
      }
      const onScroll = () => { if (!raf) raf = requestAnimationFrame(() => pintar(false)); };
      scroller.addEventListener("scroll", onScroll, { passive: true });
      let ro = null; try { ro = new ResizeObserver(() => onScroll()); ro.observe(scroller); } catch (e) { }
      pintar(true);
      return {
        set(nn, rr, keepScroll) { n = nn; if (rr) row = rr; if (!keepScroll) scroller.scrollTop = 0; pintar(true); },
        refresh() { pintar(true); },
        scrollTo(i) { scroller.scrollTop = box.offsetTop + i * rh - 40; pintar(true); },
        destroy() { scroller.removeEventListener("scroll", onScroll); if (ro) ro.disconnect(); if (raf) cancelAnimationFrame(raf); },
        get n() { return n; }
      };
    }
  };
  window.DION_DATA = API;
})();
