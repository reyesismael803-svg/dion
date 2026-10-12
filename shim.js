/* DION · adaptador para publicar fuera de Claude (GitHub Pages, Firebase Hosting, tu propio servidor).
   Si la página corre dentro de Claude, este archivo no hace nada.
   Fuera de Claude reemplaza window.claude con:
   - db: base de datos local en IndexedDB del navegador (misma API que usa DION).
   - assets: imágenes guardadas en IndexedDB (como data: URL).
   - downloads: descarga normal del navegador.
   - sample: IA con tu clave de Gemini (se guarda SOLO en este navegador, localStorage "dion-gemini-key").
   Respaldo/sincronización entre equipos: usa Taller › Respaldo (archivo .json). */
(function(){
  if (window.claude && window.claude.use) return;
  const DBN = "dion-local-db", ST = "docs";
  const idb = new Promise((res, rej) => { const r = indexedDB.open(DBN, 1); r.onupgradeneeded = () => r.result.createObjectStore(ST); r.onsuccess = () => res(r.result); r.onerror = () => rej(r.error); });
  const MEM = new Map(); let ready = null;
  const loadAll = () => ready || (ready = idb.then(d => new Promise(res => { const tx = d.transaction(ST, "readonly"), st = tx.objectStore(ST), rq = st.openCursor();
    rq.onsuccess = () => { const c = rq.result; if (c){ MEM.set(c.key, c.value); c.continue(); } else res(); }; rq.onerror = () => res(); })));
  const put = (k, v) => idb.then(d => new Promise(res => { const tx = d.transaction(ST, "readwrite"); v === undefined ? tx.objectStore(ST).delete(k) : tx.objectStore(ST).put(v, k); tx.oncomplete = res; tx.onerror = res; }));
  const subs = new Set();
  const parentOf = p => p.split("/").slice(0, -1).join("/");
  const snapDoc = (path) => { const v = MEM.get(path); return {id:path.split("/").pop(), exists:v !== undefined, data:() => v === undefined ? undefined : JSON.parse(JSON.stringify(v))}; };
  const OPS = {"==":(a, b) => a === b, "eq":(a, b) => a === b, "!=":(a, b) => a !== b, ">":(a, b) => a > b, "gt":(a, b) => a > b, ">=":(a, b) => a >= b, "<":(a, b) => a < b, "<=":(a, b) => a <= b};
  function query(path, filters){
    const run = () => { const docs = []; for (const [k] of MEM){ if (parentOf(k) !== path) continue; const d = snapDoc(k), v = d.data(); if (filters.every(([f, op, val]) => (OPS[op] || OPS["=="])(v && v[f], val))) docs.push(d); } return {docs, size:docs.length, empty:!docs.length, forEach:fn => docs.forEach(fn)}; };
    return {
      where:(f, op, v) => query(path, filters.concat([[f, op, v]])),
      orderBy:() => query(path, filters), limit:() => query(path, filters),
      get:() => loadAll().then(run),
      doc:id => doc(path + "/" + id),
      onSnapshot:(cb) => { const fn = () => { try { cb(run()); } catch(e){} }; subs.add({path, fn}); loadAll().then(fn); return () => { for (const s of subs) if (s.fn === fn) subs.delete(s); }; }
    };
  }
  function notify(path){ const par = parentOf(path); setTimeout(() => subs.forEach(s => { if (s.path === par || s.path === path) s.fn(); }), 0); }
  function doc(path){ return {
    id:path.split("/").pop(),
    get:() => loadAll().then(() => snapDoc(path)),
    set:v => loadAll().then(() => { MEM.set(path, JSON.parse(JSON.stringify(v))); notify(path); return put(path, MEM.get(path)); }),
    update:v => loadAll().then(() => { const cur = MEM.get(path) || {}; const nv = {...cur, ...JSON.parse(JSON.stringify(v))}; Object.keys(nv).forEach(k => { if (nv[k] && nv[k].__delete__) delete nv[k]; }); MEM.set(path, nv); notify(path); return put(path, nv); }),
    delete:() => loadAll().then(() => { MEM.delete(path); notify(path); return put(path, undefined); }),
    onSnapshot:(cb) => { const fn = () => { try { cb(snapDoc(path)); } catch(e){} }; subs.add({path, fn}); loadAll().then(fn); return () => { for (const s of subs) if (s.fn === fn) subs.delete(s); }; }
  }; }
  const db = {collection:p => query(p, []), doc};
  const toDataURL = b => new Promise(res => { const r = new FileReader(); r.onload = () => res(r.result); r.readAsDataURL(b); });
  const assets = {
    upload: async b => { const id = "a" + Date.now().toString(36) + Math.random().toString(36).slice(2, 7); const url = await toDataURL(b); await doc("_assets/" + id).set({url, type:b.type, size:b.size}); return {id, url, sizeBytes:b.size, contentType:b.type}; },
    list: async () => { const s = await query("_assets", []).get(); return {assets:s.docs.map(d => ({id:d.id, ...d.data()})), usage:{}}; },
    delete: id => doc("_assets/" + id).delete()
  };
  const downloads = {save: async ({filename, data}) => { const blob = data instanceof Blob ? data : new Blob([data]); const a = document.createElement("a"); a.href = URL.createObjectURL(blob); a.download = filename; document.body.appendChild(a); a.click(); a.remove(); setTimeout(() => URL.revokeObjectURL(a.href), 3000); return {status:"saved"}; }};
  function geminiKey(){ let k = ""; try { k = localStorage.getItem("dion-gemini-key") || ""; } catch(e){} if (!k){ k = prompt("Para usar la IA pega tu clave de Gemini (se guarda solo en este navegador):") || ""; if (k) try { localStorage.setItem("dion-gemini-key", k.trim()); } catch(e){} } return k.trim(); }
  async function gem(input, json){
    const key = geminiKey(); if (!key) throw {code:"not_granted", message:"Sin clave de Gemini"};
    const text = typeof input === "string" ? input : (input || []).map(t => t.content).join("\n\n");
    const r = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${encodeURIComponent(key)}`, {method:"POST", headers:{"Content-Type":"application/json"},
      body:JSON.stringify({contents:[{role:"user", parts:[{text}]}], generationConfig:json ? {responseMimeType:"application/json"} : {}})});
    if (!r.ok) throw {code:"tool_error", message:"Gemini respondió " + r.status};
    const j = await r.json(); return ((j.candidates || [])[0] || {}).content ? j.candidates[0].content.parts.map(p => p.text || "").join("") : "";
  }
  const sample = async (input) => ({text:await gem(input, false), truncated:false});
  sample.json = async (input) => { const t = await gem(input, true); try { return JSON.parse(t); } catch(e){ const m = t.match(/\{[\s\S]*\}|\[[\s\S]*\]/); if (m) return JSON.parse(m[0]); throw {code:"invalid_json", text:t}; } };
  sample.limits = async () => ({images:false});
  const user = {id:() => "local", me:() => ({id:"local", name:""}), isOwner:() => true, canEdit:() => true, can:() => true, profiles:async () => ({})};
  const NS = {db, assets, downloads, sample, user};
  window.claude = {use: async n => { if (n === "db") await loadAll(); return NS[n] || null; }};
})();
