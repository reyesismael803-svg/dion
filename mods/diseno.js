/* DION · mods/diseno.js — DION_MOD.fundamentos + DION_MOD.dibujo
   Fundamentos del diseño I·II (Ching, Wong, Gestalt) y Dibujo (Geometría descriptiva + Dibujo digital / postproducción de bocetos). */
(function(){
'use strict';
window.DION_MOD = window.DION_MOD || {};

/* ===================== GLIFOS (compartidos) ===================== */
/* "~" se reemplaza por el prefijo de clase del módulo (m-fundamentos- / m-dibujo-) */
const r1 = v => Math.round(v*10)/10;
const D  = (d,i,k) => `<path class="~gd ${k||''}" d="${d}" pathLength="1" style="--i:${i||0}"/>`;
const L  = (a,b,c,d,i,k) => D(`M${r1(a)} ${r1(b)}L${r1(c)} ${r1(d)}`,i,k);
const PL = (p,i,k,z) => D('M'+p.map(q=>r1(q[0])+' '+r1(q[1])).join('L')+(z?'Z':''),i,k);
const C  = (x,y,r,i,k) => `<circle class="~gd ${k||''}" cx="${x}" cy="${y}" r="${r}" pathLength="1" style="--i:${i||0}"/>`;
const E  = (x,y,rx,ry,i,k) => D(`M${x-rx} ${y}A${rx} ${ry} 0 1 0 ${x+rx} ${y}A${rx} ${ry} 0 1 0 ${x-rx} ${y}`,i,k);
const R  = (x,y,w,h,i,k) => PL([[x,y],[x+w,y],[x+w,y+h],[x,y+h]],i,k,1);
const F  = (d,i,st) => `<path class="~gf" d="${d}" style="--i:${i||0};${st||''}"/>`;
const FP = (p,i,st) => F('M'+p.map(q=>r1(q[0])+' '+r1(q[1])).join('L')+'Z',i,st);
const FR = (x,y,w,h,i,st) => FP([[x,y],[x+w,y],[x+w,y+h],[x,y+h]],i,st);
const FC = (x,y,r,i,st) => `<circle class="~gf" cx="${x}" cy="${y}" r="${r}" style="--i:${i||0};${st||''}"/>`;
const DOT= (x,y,r,i) => `<circle class="~gp" cx="${r1(x)}" cy="${r1(y)}" r="${r||2.4}" style="animation-delay:${(i||0)*.3}s"/>`;
const W  = d => `<path class="~gw" d="${d}"/>`;
const WL = (a,b,c,d) => W(`M${r1(a)} ${r1(b)}L${r1(c)} ${r1(d)}`);
const WC = (x,y,r) => `<circle class="~gw" cx="${x}" cy="${y}" r="${r}"/>`;
const ANT= (d,k) => `<path class="~ga ${k||''}" d="${d}"/>`;
const AL = (a,b,c,d,k) => ANT(`M${r1(a)} ${r1(b)}L${r1(c)} ${r1(d)}`,k);
const T  = (x,y,s,z,k) => `<text class="~gt ${k||''}" x="${x}" y="${y}" font-size="${z||7}">${s}</text>`;
const ROT= (s,dur,ox,oy,rev) => `<g class="~gr" style="animation-duration:${dur||14}s;transform-origin:${ox||50}px ${oy||50}px${rev?';animation-direction:reverse':''}">${s}</g>`;
const MV = (s,dx,dy,dur) => `<g class="~gm" style="--dx:${dx||0}px;--dy:${dy||0}px;animation-duration:${dur||3}s">${s}</g>`;
const SPIN=(s,ox,oy,dur) => `<g class="~gs" style="transform-origin:${ox||50}px ${oy||50}px;animation-duration:${dur||5}s">${s}</g>`;
const ROCK=(s,ox,oy) => `<g class="~gk" style="transform-origin:${ox}px ${oy}px">${s}</g>`;
const SX = (s,ox,oy) => `<g class="~gx" style="transform-origin:${ox}px ${oy}px">${s}</g>`;
/* isométrico */
const IO=[50,62];
const iso = (x,y,z,o,s) => { o=o||IO; s=s||1; return [o[0]+(x-y)*0.866*s, o[1]+(x+y)*0.5*s - z*s]; };
function box(x,y,z,w,d,h,i,k,o,s,fill){
  const P=(a,b,c)=>iso(a,b,c,o,s);
  const t=[P(x,y,z+h),P(x+w,y,z+h),P(x+w,y+d,z+h),P(x,y+d,z+h)];
  let out=fill?FP(t,i):'';
  out+=PL(t,i,k,1);
  out+=PL([P(x+w,y,z+h),P(x+w,y,z),P(x+w,y+d,z),P(x,y+d,z),P(x,y+d,z+h)],(i||0)+1,k);
  out+=PL([P(x+w,y+d,z+h),P(x+w,y+d,z)],(i||0)+2,k);
  return out;
}
function isoPlane(x,y,z,w,d,i,k,fill){ const t=[iso(x,y,z),iso(x+w,y,z),iso(x+w,y+d,z),iso(x,y+d,z)]; return (fill?FP(t,i):'')+PL(t,i,k,1); }
function isoWallX(x,y,z,w,h,i,k){ const t=[iso(x,y,z),iso(x+w,y,z),iso(x+w,y,z+h),iso(x,y,z+h)]; return FP(t,i)+PL(t,i,k,1); }
function isoWallY(x,y,z,d,h,i,k){ const t=[iso(x,y,z),iso(x,y+d,z),iso(x,y+d,z+h),iso(x,y,z+h)]; return FP(t,i)+PL(t,i,k,1); }
function glyphSVG(g, pfx, cls){
  return `<svg class="${pfx}g ${cls||''}" viewBox="0 0 100 100" aria-hidden="true">${String(g).replace(/~/g,pfx)}</svg>`;
}
function glyphCSS(p){ /* p = prefijo, ej "m-fundamentos-" */
  return `
.${p}g{width:100%;height:100%;overflow:visible;fill:none;stroke:var(--acc);stroke-width:1.7;stroke-linecap:round;stroke-linejoin:round;filter:drop-shadow(0 0 2.5px rgba(var(--acc-rgb),.55))}
.${p}gd{stroke-dasharray:1 1;stroke-dashoffset:1;animation:${p}draw 7s calc(var(--i)*.24s) infinite ease-in-out}
.${p}gd.${p}k{stroke:var(--done)} .${p}gd.${p}x{stroke:var(--warn)} .${p}gd.${p}b{stroke-width:3.2}
.${p}gf{fill:rgba(var(--acc-rgb),.16);stroke:none;opacity:0;animation:${p}fade 7s calc(var(--i)*.24s) infinite ease-in-out}
.${p}gp{fill:var(--acc);stroke:none;transform-box:fill-box;transform-origin:center;animation:${p}pulse 2.4s infinite ease-in-out}
.${p}gw{stroke:var(--faint);stroke-width:.8;stroke-dasharray:2 2.4;fill:none;filter:none}
.${p}ga{stroke:rgba(var(--acc-rgb),.7);stroke-width:1;stroke-dasharray:3 3;animation:${p}ants 1.4s linear infinite}
.${p}ga.${p}k{stroke:var(--done)}
.${p}gt{fill:var(--muted);stroke:none;font-family:var(--f-m);filter:none}
.${p}gt.${p}k{fill:var(--done)}
.${p}gr{transform-box:view-box;animation:${p}rot 14s linear infinite}
.${p}gm{animation:${p}mv 3s ease-in-out infinite alternate}
.${p}gs{transform-box:view-box;animation:${p}spin 5s ease-in-out infinite}
.${p}gk{transform-box:view-box;animation:${p}rock 3.4s ease-in-out infinite alternate}
.${p}gx{transform-box:view-box;animation:${p}sx 3.6s ease-in-out infinite alternate}
.${p}paused .${p}gd,.${p}paused .${p}gf,.${p}paused .${p}gp,.${p}paused .${p}ga,.${p}paused .${p}gr,.${p}paused .${p}gm,.${p}paused .${p}gs,.${p}paused .${p}gk,.${p}paused .${p}gx{animation-play-state:paused}
@keyframes ${p}draw{0%{stroke-dashoffset:1}32%,80%{stroke-dashoffset:0}100%{stroke-dashoffset:-1}}
@keyframes ${p}fade{0%,18%{opacity:0}40%,78%{opacity:1}100%{opacity:0}}
@keyframes ${p}pulse{0%,100%{transform:scale(1);opacity:1}50%{transform:scale(1.5);opacity:.55}}
@keyframes ${p}ants{to{stroke-dashoffset:-12}}
@keyframes ${p}rot{to{transform:rotate(360deg)}}
@keyframes ${p}mv{from{transform:translate(0,0)}to{transform:translate(var(--dx),var(--dy))}}
@keyframes ${p}spin{0%,100%{transform:scaleX(1)}50%{transform:scaleX(-1)}}
@keyframes ${p}rock{from{transform:rotate(-9deg)}to{transform:rotate(9deg)}}
@keyframes ${p}sx{from{transform:scaleX(1)}to{transform:scaleX(1.55)}}
@media (prefers-reduced-motion:reduce){.${p}gd{animation:none;stroke-dashoffset:0}.${p}gf{animation:none;opacity:1}.${p}gp,.${p}ga,.${p}gr,.${p}gm,.${p}gs,.${p}gk,.${p}gx{animation:none}}
`;}
function injectCSS(id,css){ if(document.getElementById(id)) return; const s=document.createElement('style'); s.id=id; s.textContent=css; document.head.appendChild(s); }
function debounce(fn,ms){ let t=null; const f=(...a)=>{ clearTimeout(t); t=setTimeout(()=>{ t=null; fn(...a); },ms); }; f.flush=(...a)=>{ if(t!==null){ clearTimeout(t); t=null; fn(...a); } }; return f; }
const ICO = { /* iconos HUD 24x24 */
  close:'<path d="M6 6l12 12M18 6L6 18"/>', prev:'<path d="M15 5l-7 7 7 7"/>', next:'<path d="M9 5l7 7-7 7"/>',
  plus:'<path d="M12 5v14M5 12h14"/>', minus:'<path d="M5 12h14"/>', fit:'<path d="M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5"/>',
  up:'<path d="M12 19V6M6 11l6-6 6 6"/><path d="M4 21h16"/>', check:'<path d="M5 12.5l4.5 4.5L19 7"/>', img:'<rect x="3" y="5" width="18" height="14" rx="1"/><path d="M3 16l5-5 4 4 3-3 6 6"/><circle cx="16" cy="9" r="1.6"/>',
  list:'<path d="M8 6h12M8 12h12M8 18h12"/><circle cx="4" cy="6" r="1"/><circle cx="4" cy="12" r="1"/><circle cx="4" cy="18" r="1"/>',
  star:'<path d="M12 3l2.6 5.6 6 .7-4.5 4.1 1.2 6L12 16.4 6.7 19.4l1.2-6L3.4 9.3l6-.7z"/>', node:'<circle cx="6" cy="18" r="2"/><circle cx="12" cy="10" r="2"/><circle cx="19" cy="5" r="2"/><path d="M7.5 16.5l3-5M13.6 8.8l3.8-2.6"/>',
  trash:'<path d="M5 7h14M10 7V4h4v3M7 7l1 13h8l1-13"/>', dl:'<path d="M12 4v11M7 10l5 5 5-5M5 20h14"/>', copy:'<rect x="8" y="8" width="12" height="12"/><path d="M4 16V4h12"/>',
  hand:'<path d="M8 13V6a1.5 1.5 0 013 0v5V4.5a1.5 1.5 0 013 0V11V6a1.5 1.5 0 013 0v8c0 4-2.5 7-6.5 7S6 18.5 5 16l-2-4a1.5 1.5 0 012.6-1.4L8 13"/>',
  pen:'<path d="M4 20l4-1L19 8l-3-3L5 16z"/><path d="M14 7l3 3"/>', eraser:'<path d="M4 16l9-9 6 6-7 7H8z"/><path d="M9 20h11"/>',
  text:'<path d="M5 6V4h14v2M12 4v16M9 20h6"/>', north:'<path d="M12 3l5 16-5-4-5 4z"/>', ruler:'<path d="M3 15L15 3l6 6L9 21z"/><path d="M7 11l2 2M10 8l2 2M13 5l2 2"/>',
  shadow:'<path d="M5 16V8h6v8z"/><path d="M11 16l9-4-3-4h-6" opacity=".8"/><circle cx="20" cy="4" r="1.6"/>', crop:'<path d="M7 3v14h14M3 7h14v14"/>',
  undo:'<path d="M9 5L4 10l5 5"/><path d="M4 10h10a6 6 0 010 12h-3"/>', redo:'<path d="M15 5l5 5-5 5"/><path d="M20 10H10a6 6 0 000 12h3"/>',
  rl:'<path d="M4 4v6h6"/><path d="M5 10a8 8 0 112 7"/>', rr:'<path d="M20 4v6h-6"/><path d="M19 10a8 8 0 10-2 7"/>', sliders:'<path d="M4 7h10M18 7h2M4 17h4M12 17h8"/><circle cx="16" cy="7" r="2"/><circle cx="10" cy="17" r="2"/>',
  save:'<path d="M5 4h11l3 3v13H5z"/><path d="M8 4v5h7V4M8 20v-6h8v6"/>', guide:'<path d="M3 20L12 8l9 12M12 8V3M3 14h18" />', grid:'<path d="M4 4h16v16H4zM4 10h16M4 15h16M10 4v16M15 4v16"/>',
  blank:'<rect x="5" y="3" width="14" height="18"/><path d="M9 8h6M9 12h6"/>'
};
const ico = (n,s) => `<svg viewBox="0 0 24 24" width="${s||20}" height="${s||20}" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${ICO[n]||''}</svg>`;

/* ===================== FUNDAMENTOS · DATOS ===================== */
/* cada concepto: [id, nombre, definición, cómo aplicarlo en un proyecto real, obra de referencia, glifo] */
const FU = [
{ n:'Elementos primarios de la forma', s:'Punto · línea · plano · volumen', pasos:['fun-04','fun-15'], ref:'Ching, Forma, espacio y orden, cap. 1',
  cs:[
  ['punto','Punto','Indica una posición en el espacio. Conceptualmente no tiene longitud, anchura ni profundidad: es estático, centralizado y sin dirección. Es el generador de todos los demás elementos.','Marca con un punto los lugares que deben ser reconocibles desde lejos: el hito de llegada, el centro de una plaza, el remate de un eje. En {T} puede ser el árbol o la escultura del patio de espera que orienta a los usuarios.','Plaza del Campidoglio con la estatua ecuestre de Marco Aurelio en el centro (Miguel Ángel, Roma, 1538).',
    DOT(50,50,3.5)+C(50,50,12,0)+C(50,50,24,2)+WC(50,50,38)+WL(50,6,50,94)+WL(6,50,94,50)],
  ['punto-proy','Elementos puntuales: columna, obelisco, torre','Un punto proyectado verticalmente se vuelve un elemento lineal que, visto en planta, sigue actuando como punto: columna aislada, obelisco o torre. Marcan una posición en el suelo y son visibles desde lejos.','Úsalos para señalar accesos, esquinas urbanas o el centro de un conjunto. Una torre de ascensores o un tanque de agua tratados como hito pueden orientar a todo el conjunto.','Monumento a Washington, obelisco de 169 m (Robert Mills, Washington D. C., 1884).',
    L(10,86,90,86,0)+PL([[44,86],[46,26],[50,16],[54,26],[56,86]],1)+DOT(50,16,2.2,1)+W('M30 86 A20 6 0 0 0 70 86')],
  ['dos-puntos','Dos puntos: umbral y eje','Dos puntos definen una línea que los une y, si se proyectan en vertical, un plano transparente: un umbral. Señalan la entrada y sugieren un eje perpendicular a ellos.','Define el acceso principal con dos elementos verticales (pilares, muros cortos, árboles) que enmarquen la puerta; el eje que generan debe coincidir con el recorrido de llegada.','Gran torii del santuario de Itsukushima, dos pilares que marcan el umbral sobre el agua (Miyajima, Japón).',
    L(30,88,30,30,0)+L(70,88,70,30,1)+L(20,30,80,30,2,'~b')+L(26,40,74,40,3)+AL(50,96,50,8)],
  ['linea','Línea','Prolongación de un punto. Tiene longitud, dirección y posición; expresa movimiento, dirección y crecimiento. Une, soporta, rodea o corta otros elementos.','Traza con líneas los bordes de un recorrido, una marquesina continua o el remate de una fachada. Una línea fuerte de cubierta puede unificar volúmenes distintos del programa.','Pabellón de Barcelona: muros que se prolongan más allá del techo como líneas en el paisaje (Mies van der Rohe, Barcelona, 1929).',
    DOT(14,72,2.4)+L(14,72,86,28,1)+PL([[77,27],[86,28],[82,36]],2)+DOT(86,28,2.4,2)+WL(14,72,86,72)],
  ['lin-vert','Elementos lineales verticales','Columnas, pilares, obeliscos o torres. Sostienen, marcan ritmo y, en serie, definen los bordes transparentes de un espacio.','Usa una columnata para hacer un pórtico de sombra en clima cálido-húmedo: define el borde del edificio sin cerrarlo y protege del sol y la lluvia.','Columnata perimetral del Partenón (Ictino y Calícrates, Atenas, 447–432 a. C.).',
    L(18,86,18,24,0)+L(34,86,34,24,1)+L(50,86,50,24,2)+L(66,86,66,24,3)+L(82,86,82,24,4)+L(10,24,90,24,5)+L(8,86,92,86,6)],
  ['lin-hori','Elementos lineales horizontales','Vigas, aleros, barandas, bordes de agua o muros bajos. Expresan reposo, horizonte y continuidad; guían la vista y el movimiento a lo largo de ellos.','Prolonga un alero o una baranda como línea continua que guía al usuario a lo largo de la fachada hasta el acceso. En la costa ecuatoriana el alero largo es además protección solar.','Malecón 2000: el borde y la baranda sobre el río Guayas como línea horizontal que ordena el paseo (Guayaquil, 1999–2002). Canal de agua del Instituto Salk (Louis Kahn, La Jolla, 1965).',
    L(8,48,92,48,0,'~b')+L(8,60,92,60,1,'~k')+WL(8,72,92,72)+MV(DOT(14,48,2.4),72,0,4)],
  ['plano','Plano','Una línea prolongada en una dirección distinta a la suya genera el plano: tiene longitud y anchura pero no profundidad. Su forma, color, textura y proporción definen su peso visual. Es el elemento clave del lenguaje arquitectónico.','Decide qué planos dominan cada espacio (suelo, muro, techo) y trátalos con un material propio; un plano exento (muro de piedra, celosía) puede organizar todo el vestíbulo.','Muro de ónix dorado del Pabellón de Barcelona (Mies van der Rohe, 1929).',
    L(20,40,30,76,0)+FP([[20,40],[72,24],[82,60],[30,76]],1)+PL([[20,40],[72,24],[82,60],[30,76]],1,'',1)+AL(30,76,82,60)],
  ['plano-base','Plano base','El suelo: plano horizontal que define un campo espacial al diferenciarse por color, textura o material del terreno que lo rodea.','Diferencia con el pavimento las zonas exteriores: plaza de llegada, zona de juegos, estacionamiento. Un cambio de piso basta para que el usuario lea "aquí empieza el edificio".','Piazza del Campo con su pavimento en abanico de nueve sectores (Siena, siglo XIV).',
    isoPlane(-28,-28,0,56,56,0,'',1)+W('M'+iso(-28,0,0).join(' ')+'L'+iso(28,0,0).join(' ')+'M'+iso(0,-28,0).join(' ')+'L'+iso(0,28,0).join(' '))+DOT(iso(0,0,0)[0],iso(0,0,0)[1],2.4)],
  ['plano-elev','Plano base elevado','Elevar parte del suelo separa un campo del entorno, le da importancia y control visual. Según la altura, la continuidad con el entorno se mantiene (escalón) o se rompe (podio).','Eleva el acceso o el edificio sobre un podio de 45–90 cm para protegerlo de inundaciones (crítico en la cuenca baja del Guayas) y darle presencia; resuelve la accesibilidad con rampa ≤ 8 %.','Terrazas del templo funerario de Hatshepsut (Senenmut, Deir el-Bahari, Egipto, c. 1470 a. C.).',
    box(-26,-26,0,52,52,12,0,'',null,1,true)+WL(iso(-34,30,0)[0],iso(-34,30,0)[1],iso(30,-34,0)[0],iso(30,-34,0)[1])],
  ['plano-depr','Plano base deprimido','Hundir parte del suelo define un campo más íntimo y protegido; los bordes en pendiente o escalonados lo separan del entorno y lo convierten en anfiteatro.','Un patio hundido o un ágora escalonada sirve como aula exterior, sala de espera al aire libre o reservorio de lluvia (patio inundable) en clima tropical.','Lower Plaza del Rockefeller Center, plaza hundida (Nueva York, 1936).',
    isoPlane(-30,-30,0,60,60,0,'~w')+isoPlane(-18,-18,-12,36,36,1,'',1)+L(iso(-18,-18,0)[0],iso(-18,-18,0)[1],iso(-18,-18,-12)[0],iso(-18,-18,-12)[1],2)+L(iso(18,-18,0)[0],iso(18,-18,0)[1],iso(18,-18,-12)[0],iso(18,-18,-12)[1],2)+L(iso(-18,18,0)[0],iso(-18,18,0)[1],iso(-18,18,-12)[0],iso(-18,18,-12)[1],2)+PL([iso(-18,-18,0),iso(18,-18,0),iso(18,18,0),iso(-18,18,0)],3,'~k',1)],
  ['plano-pred','Plano predominante (plano de cubierta)','Un plano elevado sobre el suelo define un campo entre él y el plano base. Si domina por tamaño y forma, organiza todo lo que queda debajo: es el gran techo.','En clima cálido-húmedo, una gran cubierta ventilada que sombrea todo el programa (y deja pasar la brisa entre ella y los volúmenes) es una decisión formal y bioclimática a la vez.','Neue Nationalgalerie: cubierta de acero de 65 × 65 m sobre ocho columnas (Mies van der Rohe, Berlín, 1968).',
    isoPlane(-30,-30,34,60,60,0,'~b',1)+L(iso(-24,-24,0)[0],iso(-24,-24,0)[1],iso(-24,-24,34)[0],iso(-24,-24,34)[1],1)+L(iso(24,-24,0)[0],iso(24,-24,0)[1],iso(24,-24,34)[0],iso(24,-24,34)[1],2)+L(iso(24,24,0)[0],iso(24,24,0)[1],iso(24,24,34)[0],iso(24,24,34)[1],3)+L(iso(-24,24,0)[0],iso(-24,24,0)[1],iso(-24,24,34)[0],iso(-24,24,34)[1],4)+W('M'+[iso(-30,-30,0),iso(30,-30,0),iso(30,30,0),iso(-30,30,0)].map(p=>p.join(' ')).join('L')+'Z')],
  ['plano-vert','Planos verticales (muro)','Los planos verticales son los más activos de la percepción: limitan el campo visual, dan cerramiento, soportan y filtran luz, aire y vistas. Su altura respecto al ojo (≈1,50 m) decide si separan o solo sugieren.','Decide la altura de cada muro según lo que debe separar: 0,60 m sugiere, 1,20 m separa sin cerrar la vista (permite supervisar), más de 1,80 m cierra.','Muros de color de la Casa Gilardi (Luis Barragán, Ciudad de México, 1976).',
    isoWallX(-30,-10,0,40,40,0)+isoWallY(16,-30,0,40,22,1,'~k')+W('M'+iso(-36,-36,0).join(' ')+'L'+iso(36,36,0).join(' '))],
  ['volumen','Volumen','Un plano prolongado en una dirección distinta a la suya genera el volumen: longitud, anchura y profundidad. Se define por planos (caras), aristas y vértices; puede leerse como masa sólida o como espacio vacío contenido.','Antes de dibujar plantas, modela el programa como volúmenes puros (un volumen por zona) y estudia cómo se relacionan en el terreno de {A} m².','Casa da Música: un volumen poliédrico único que contiene las salas (OMA / Rem Koolhaas, Oporto, 2005).',
    box(-22,-22,0,44,44,40,0,'',null,1,true)+DOT(iso(22,22,0)[0],iso(22,22,0)[1],2,2)+DOT(iso(-22,-22,40)[0],iso(-22,-22,40)[1],2,3)]
  ]},
{ n:'Formas geométricas fundamentales', s:'Círculo · triángulo · cuadrado y sólidos', pasos:['fun-04'], ref:'Ching cap. 2 · geometría euclidiana',
  cs:[
  ['circulo','Círculo','Figura centrada e introvertida, estable y autocentrante; todos sus puntos equidistan del centro. Sugiere unidad, continuidad y foco.','Úsalo para el espacio de reunión o el núcleo simbólico; en planta circular el mobiliario y la estructura deben seguir la geometría radial (cuidado con los rincones residuales).','Tempietto de San Pietro in Montorio (Donato Bramante, Roma, 1502).',
    C(50,50,32,0)+DOT(50,50,2.4)+L(50,50,82,50,1,'~k')+WC(50,50,18)],
  ['triangulo','Triángulo','Figura de gran estabilidad cuando se apoya en un lado e inestable cuando lo hace sobre un vértice. Expresa tensión, dirección y fuerza.','Las plantas triangulares resuelven terrenos en esquina aguda; trabaja los ángulos agudos como espacios de servicio, patios o remates y no como habitaciones.','Ala Este de la Galería Nacional de Arte, planta triangular con arista de 19° (I. M. Pei, Washington D. C., 1978).',
    FP([[50,14],[86,78],[14,78]],0)+PL([[50,14],[86,78],[14,78]],0,'',1)+WC(50,57,21)+DOT(50,14,2,1)],
  ['cuadrado','Cuadrado','Figura pura y racional, bilateralmente simétrica con dos ejes iguales; estática y neutra, sin dirección dominante.','La planta cuadrada favorece organizaciones centrales y modulares; define la malla estructural (p. ej. 7,20 × 7,20 m) a partir del cuadrado.','Templo de Kukulkán, pirámide de planta cuadrada orientada (Chichén Itzá, México, s. XII).',
    FR(20,20,60,60,0)+R(20,20,60,60,0)+AL(20,20,80,80)+AL(80,20,20,80)+DOT(50,50,2,1)],
  ['esfera','Esfera','Sólido generado al girar un semicírculo sobre su diámetro. Es centralizada, concentrada, estable en cualquier posición; no tiene dirección.','Como forma pura la esfera es difícil de habitar; aparece como cúpula, sala de proyección, hito o planetario. Usa la semiesfera (cúpula) para espacios centrales de reunión.','Proyecto del Cenotafio de Newton, esfera de 150 m (Étienne-Louis Boullée, 1784, no construido).',
    C(50,50,34,0)+E(50,50,34,10,1,'~k')+SPIN(E(50,50,13,34,2))],
  ['cilindro','Cilindro','Sólido centrado en el eje que une los centros de sus dos caras circulares. Estable apoyado en su base; se lee como torre, silo, columna o tambor.','Úsalo para escaleras, núcleos de ascensores o un auditorio; su eje vertical lo vuelve hito y su forma curva recibe muy bien la brisa (menor resistencia).','Capilla del MIT, cilindro de ladrillo con foso de agua (Eero Saarinen, Cambridge, 1955).',
    E(50,24,24,8,0)+L(26,24,26,76,1)+L(74,24,74,76,1)+D('M26 76A24 8 0 0 0 74 76',2)+W('M26 76A24 8 0 0 1 74 76')],
  ['cono','Cono','Sólido generado al girar un triángulo rectángulo sobre uno de sus catetos. Estable sobre su base circular, muy inestable sobre el vértice.','Las cubiertas cónicas evacuan lluvia intensa y generan efecto chimenea para ventilar (aire caliente sale por la punta): útil en clima cálido-húmedo.','Trulli de Alberobello, casas con cubierta cónica de piedra en seco (Apulia, Italia).',
    L(50,14,22,78,0)+L(50,14,78,78,1)+D('M22 78A28 9 0 0 0 78 78',2)+W('M22 78A28 9 0 0 1 78 78')+DOT(50,14,2,1)],
  ['piramide','Pirámide','Poliedro de base poligonal y caras triangulares que convergen en un vértice. Muy estable; sus caras planas la hacen más rígida y angulosa que el cono.','Las cubiertas piramidales a cuatro aguas evacúan bien la lluvia; como lucernario piramidal iluminan un vestíbulo central sin sobrecalentar si se protegen.','Pirámide del Louvre, vidrio y acero (I. M. Pei, París, 1989).',
    PL([[18,70],[50,84],[82,70]],0)+L(18,70,50,16,1)+L(50,84,50,16,2)+L(82,70,50,16,3)+W('M18 70L50 56L82 70M50 56L50 16')+DOT(50,16,2,2)],
  ['cubo','Cubo','Prisma de seis caras cuadradas iguales; con sus dimensiones iguales es estático y sin dirección, la forma más neutra del volumen.','Un volumen cúbico compacto minimiza envolvente y costo; en clima cálido exige estrategias de ventilación cruzada y patios porque el centro queda lejos de las fachadas.','Kunsthaus Bregenz, cubo de vidrio translúcido (Peter Zumthor, Austria, 1997).',
    box(-24,-24,0,48,48,48,0,'',[50,64],0.85,true)+DOT(iso(0,0,48,[50,64],.85)[0],iso(0,0,48,[50,64],.85)[1],2,3)],
  ['platonicos','Sólidos platónicos','Los cinco poliedros regulares convexos (tetraedro, cubo, octaedro, dodecaedro, icosaedro): caras iguales, aristas iguales y mismo número de caras en cada vértice. Base de las cúpulas geodésicas.','Para grandes luces livianas (cubierta de un patio o un pabellón) la subdivisión del icosaedro en una cúpula geodésica reparte esfuerzos con barras cortas y estandarizadas.','Biosfera de Montreal, cúpula geodésica derivada del icosaedro (R. Buckminster Fuller, Expo 67).',
    SPIN(PL([[50,12],[22,50],[50,88],[78,50]],0,'',1)+L(50,12,42,58,1)+L(50,88,42,58,1)+L(22,50,42,58,2)+L(78,50,42,58,2)+W('M50 12L60 42L50 88M22 50L60 42L78 50'),50,50,7)]
  ]},
{ n:'Propiedades visuales de la forma', s:'Cómo se percibe una forma', pasos:['fun-17','fun-20'], ref:'Ching cap. 2 · Wong cap. 1',
  cs:[
  ['contorno','Contorno','Característica principal que distingue una forma: el perfil o configuración de su superficie y sus aristas. Es lo primero que se reconoce.','Diseña el perfil que el edificio recorta contra el cielo (skyline) y comprueba su lectura desde los puntos de llegada; un contorno claro y simple se recuerda mejor.','Ópera de Sídney, contorno de conchas sobre el puerto (Jørn Utzon, 1973).',
    F('M18 62C18 28 44 16 60 30S90 46 80 66S44 90 18 62Z',0)+D('M18 62C18 28 44 16 60 30S90 46 80 66S44 90 18 62Z',0,'~b')+ANT('M10 62C10 22 44 6 64 22S100 44 88 70S40 100 10 62Z')],
  ['tamano','Tamaño','Dimensiones reales de la forma (largo, ancho, profundidad); su lectura depende del tamaño de las formas del entorno y del observador.','Compara el tamaño de cada volumen con el del barrio y con el cuerpo del usuario; en {T} conviene fraccionar volúmenes grandes para no intimidar.','Arco de la Défensa, cubo hueco de ~110 m que enmarca el Eje histórico (Johan Otto von Spreckelsen, París, 1989).',
    R(12,68,14,14,0)+R(32,54,28,28,1)+R(66,26,24,56,2,'~k')+WL(8,82,94,82)],
  ['color','Color','Matiz, intensidad y valor tonal de la superficie. Es el atributo que más claramente distingue una forma de su entorno y modifica su peso visual.','Asigna color a volúmenes o zonas (no a todo): ayuda a orientarse (wayfinding) y diferencia áreas. Confirma la reflectancia: en la costa, colores claros en cubiertas y fachadas expuestas.','Torres de Satélite, cinco prismas de color (Luis Barragán y Mathias Goeritz, Naucalpan, México, 1958).',
    FC(38,42,20,0,'fill:rgba(var(--acc-rgb),.22)')+FC(62,42,20,1,'fill:rgba(var(--done-rgb),.2)')+FC(50,62,20,2,'fill:rgba(255,92,122,.2)')+C(38,42,20,0)+C(62,42,20,1,'~k')+C(50,62,20,2,'~x')],
  ['textura','Textura','Característica superficial de una forma dada por el tamaño, forma y disposición de sus partes; afecta tacto y reflejo de la luz.','Elige texturas según la distancia de lectura: gruesas para fachada vista de lejos, finas para lo que se toca. Superficies lavables y lisas en zonas que lo exijan; texturas cálidas en estancias.','Termas de Vals, muros de capas de gneis local (Peter Zumthor, Suiza, 1996). Fachada labrada de la Iglesia de La Compañía de Jesús (Quito, 1605–1765).',
    R(14,14,72,72,0)+[0,1,2,3,4,5,6,7].map(j=>L(14,22+j*8,86,22+j*8,1+j*.4,j%2?'~k':'')).join('')+[0,1,2,3].map(j=>L(26+j*16,14,26+j*16,86,4+j*.4)).join('')],
  ['posicion','Posición','Ubicación de una forma respecto a su entorno o al campo visual en que se ve. Una forma en el centro, en lo alto o en un extremo cambia de significado.','Ubica el volumen más importante donde se vea primero (esquina, remate de eje, parte alta). En un terreno de {A} m² la posición también decide sombras y ventilación.','Partenón en la cima de la Acrópolis (Atenas, 438 a. C.).',
    W('M8 84Q30 50 50 46T92 84')+R(8,8,84,84,0)+MV(FR(42,34,16,12,1,'opacity:1')+R(42,34,16,12,1,'~k'),0,-10,2.6)+DOT(50,40,1.8,2)],
  ['orientacion','Orientación','Dirección de una forma respecto al plano del suelo, a los puntos cardinales, a otras formas o al observador.','Orienta las fachadas largas al norte y sur (en Ecuador el sol recorre casi el cénit) y las cortas al este y oeste; gira lo justo para captar la brisa dominante.','Templo de Abu Simbel: el sol entra al santuario dos días al año (Egipto, c. 1264 a. C.).',
    C(50,50,34,0)+WL(50,10,50,90)+WL(10,50,90,50)+T(47,9,'N',8,'~k')+ROT(PL([[50,22],[56,50],[50,46],[44,50]],1,'~k',1),12)],
  ['inercia','Inercia visual','Grado de concentración y estabilidad de una forma. Depende de su geometría y su orientación respecto al suelo y a la gravedad.','Decide si el edificio debe verse estable (base ancha, volumen pesado abajo) o dinámico (voladizos, apoyos en esquina). Los equipamientos de salud y educación suelen buscar estabilidad y calma.','Pirámides de Guiza, máxima estabilidad visual (Egipto, c. 2560 a. C.).',
    PL([[10,84],[34,40],[58,84]],0,'',1)+WL(4,84,96,84)+ROCK(PL([[76,84],[90,68],[76,52],[62,68]],1,'~k',1),76,84)]
  ]},
{ n:'Tipos de forma', s:'Regular · irregular · sustractiva · aditiva', pasos:['fun-06'], ref:'Ching cap. 2',
  cs:[
  ['regular','Forma regular','Sus partes se relacionan de manera consistente y ordenada; estable, simétrica respecto a uno o más ejes. Se mantiene reconocible aunque se le añada o quite algo.','Úsala para el cuerpo principal del programa que debe ser eficiente (habitaciones, consultorios, aulas) y deja lo irregular para lo excepcional.','S. R. Crown Hall, prisma regular de 67 × 37 m (Mies van der Rohe, Chicago, 1956).',
    R(20,20,60,60,0)+C(50,50,30,1)+AL(50,12,50,88)+AL(12,50,88,50)],
  ['irregular','Forma irregular','Sus partes son diferentes por naturaleza y se relacionan de forma no consistente; suele ser asimétrica y más dinámica.','Reserva la forma irregular para el elemento singular (auditorio, vestíbulo, ludoteca) y verifica que la estructura y el costo lo soporten.','Museo Guggenheim Bilbao (Frank Gehry, 1997).',
    PL([[16,70],[24,30],[46,18],[52,40],[80,22],[86,58],[60,82]],0,'',1)+FP([[16,70],[24,30],[46,18],[52,40],[80,22],[86,58],[60,82]],0)+L(52,40,60,82,1,'~k')+L(24,30,52,40,2,'~k')],
  ['sustractiva','Forma sustractiva','Se obtiene quitando partes a un volumen inicial sin que pierda su identidad: el todo sigue leyéndose.','Parte de un prisma que contiene todo el programa y sustrae patios, pórticos de acceso y terrazas: logra sombra, luz y ventilación sin perder unidad.','Villa Savoye, prisma con sustracciones en planta baja y terraza (Le Corbusier, Poissy, 1931).',
    PL([[16,20],[84,20],[84,56],[64,56],[64,80],[16,80]],0,'',1)+FP([[16,20],[84,20],[84,56],[64,56],[64,80],[16,80]],0)+ANT('M64 56L84 56L84 80L64 80','~k')+R(30,34,16,16,1,'~k')],
  ['aditiva','Forma aditiva','Se genera sumando a un volumen otros volúmenes o partes. Las piezas se reconocen por separado y se agrupan por proximidad, contacto o superposición.','Asigna un volumen a cada zona del programa y súmalos: pueden crecer por etapas y cada uno puede tener su propia altura.','Casa Robie, volúmenes horizontales sumados (Frank Lloyd Wright, Chicago, 1910).',
    box(-26,-6,0,30,26,22,0,'',[46,62],1,true)+box(4,-26,0,22,30,34,3,'~k',[46,62],1,true)+box(-10,20,0,20,16,12,6,'',[46,62],1)],
  ['centralizada','Forma centralizada','Formas secundarias agrupadas alrededor de una forma central dominante, normalmente regular y de mayor tamaño.','Un vestíbulo o patio central con las zonas alrededor reduce recorridos y facilita el control: útil cuando se debe supervisar desde un punto (recepción, estación de control).','Villa Capra "La Rotonda" (Andrea Palladio, Vicenza, 1592).',
    C(50,50,15,0,'~b')+R(43,10,14,12,1)+R(43,78,14,12,2)+R(10,43,12,14,3)+R(78,43,12,14,4)+AL(50,22,50,35)+AL(50,65,50,78)+AL(22,50,35,50)+AL(65,50,78,50)],
  ['lineal','Forma lineal','Serie de formas dispuestas en fila o una forma alargada; expresa dirección y crecimiento y se adapta a bordes, topografía o recorridos.','Úsala en terrenos alargados o junto a una vía; es fácil de ampliar en el extremo y favorece la ventilación cruzada si la crujía es estrecha (≤ 12–14 m).','Residencia Baker House, barra ondulante sobre el río (Alvar Aalto, MIT, Cambridge, 1949).',
    D('M8 64C24 40 40 72 56 48S84 36 94 50',0,'~b')+[12,28,44,60,76].map((x,j)=>R(x,j%2?42:56,10,10,1+j*.5)).join('')],
  ['radial','Forma radial','Formas lineales que se extienden desde un núcleo central, como rayos. Combina la centralidad con la direccionalidad de lo lineal.','Útil cuando varios brazos deben compartir un centro de control y abrirse al paisaje; cada brazo puede ser una unidad independiente.','Penitenciaría Eastern State, brazos radiales desde un centro de vigilancia (John Haviland, Filadelfia, 1829).',
    C(50,50,8,0,'~k')+ROT([0,72,144,216,288].map((a,j)=>{const c=Math.cos(a*Math.PI/180),s=Math.sin(a*Math.PI/180);return L(50+c*8,50+s*8,50+c*36,50+s*36,1+j*.4)+DOT(50+c*38,50+s*38,2,j);}).join(''),24)],
  ['agrupada','Forma agrupada','Formas que se relacionan por proximidad o por compartir un rasgo visual, sin una geometría que las ordene; flexible, admite piezas de distinto tamaño.','Agrupa unidades pequeñas alrededor de patios para dar escala doméstica a un equipamiento grande (pabellones de aulas o consultorios).','Hábitat 67, 354 módulos prefabricados agrupados (Moshe Safdie, Montreal, 1967).',
    box(-22,-4,0,16,16,14,0,'',[50,62],1)+box(-4,-20,10,16,16,14,2,'~k',[50,62],1)+box(4,6,0,16,16,14,4,'',[50,62],1)+box(-12,-8,24,16,16,14,6,'',[50,62],1)],
  ['trama','Forma en trama','Formas modulares cuya relación la regula una trama tridimensional; permite crecer y cambiar manteniendo el orden.','Define una trama estructural regular (ej. 8,10 × 8,10 m) y ocupa o vacía módulos según el programa; es la base de los edificios flexibles.','Oficinas Centraal Beheer, trama de módulos de 9 × 9 m (Herman Hertzberger, Apeldoorn, 1972).',
    [16,34,52,70,88].map(x=>WL(x,12,x,88)).join('')+[12,31,50,69,88].map(y=>WL(16,y,88,y)).join('')+FR(16,12,18,19,0)+FR(52,31,18,19,1)+FR(34,50,18,19,2)+FR(70,69,18,19,3)+R(16,12,18,19,0)+R(52,31,18,19,1,'~k')+R(34,50,18,19,2)+R(70,69,18,19,3,'~k')]
  ]},
{ n:'Interrelaciones entre formas', s:'El impacto entre formas (Wong)', pasos:['fun-07'], ref:'Wong, Fundamentos del diseño bi- y tridimensional',
  cs:[
  ['distanciamiento','Distanciamiento','Las dos formas están separadas: aunque estén cerca, conservan su identidad y el espacio entre ellas se vuelve protagonista.','Separa volúmenes con funciones incompatibles (zona ruidosa y zona de reposo, servicio y público) y diseña el vacío entre ellos como patio o plaza.','Instituto Salk: dos alas de laboratorios separadas por la plaza (Louis Kahn, La Jolla, 1965).',
    MV(C(32,50,18,0),-6,0)+MV(C(68,50,18,1,'~k'),6,0)+AL(50,20,50,80)],
  ['toque','Toque','Las formas se acercan hasta tocarse en un punto o una arista; siguen separadas pero ya no hay espacio entre ellas.','Haz que dos volúmenes se toquen en una esquina para marcar el acceso o un punto de conexión mínima (una puerta, un puente).','Casa Rietveld Schröder, planos que se tocan sin fundirse (Gerrit Rietveld, Utrecht, 1924).',
    C(32,50,18,0)+R(50,32,36,36,1,'~k')+DOT(50,50,2.8,1)],
  ['superposicion','Superposición','Una forma se coloca sobre otra y parece estar delante, ocultando parte de la que queda debajo.','Superpone una cubierta o una bandeja sobre otra para crear voladizos, terrazas sombreadas y la lectura de capas en fachada.','Casa de la Cascada, bandejas de hormigón superpuestas (Frank Lloyd Wright, Pensilvania, 1939).',
    D('M50 66A20 20 0 1 1 50 34',0)+W('M50 34A20 20 0 0 1 50 66')+FR(50,34,36,36,1,'opacity:1;fill:rgba(10,19,31,.95);animation:none')+FR(50,34,36,36,1)+R(50,34,36,36,1,'~k')],
  ['penetracion','Penetración','Igual que la superposición, pero ambas formas son transparentes: se ve el contorno completo de las dos y la zona compartida.','Haz que un volumen atraviese otro y que ambos se sigan leyendo completos (un puente o un vacío que cruza el edificio); la zona común es un espacio de encuentro.','Museo Judío de Berlín: los vacíos atraviesan el volumen en zigzag (Daniel Libeskind, 2001).',
    C(38,50,22,0)+C(62,50,22,1,'~k')+F('M50 31.6A22 22 0 0 1 50 68.4A22 22 0 0 1 50 31.6Z',2)],
  ['union','Unión','Las dos formas se fusionan en una mayor; se pierde el contorno de la zona compartida y se lee una sola figura.','Fusiona volúmenes en un solo cuerpo continuo cuando el programa debe sentirse unitario (un único gran espacio de reunión o de espera).','Centro Heydar Aliyev, forma continua (Zaha Hadid, Bakú, 2012).',
    F('M50 34A20 20 0 1 0 50 66A20 20 0 1 0 50 34Z',0)+D('M50 34A20 20 0 1 0 50 66A20 20 0 1 0 50 34Z',0,'~b')+W('M50 34L50 66')],
  ['sustraccion','Sustracción','Una forma invisible (vacía) se superpone a una visible y le quita su porción: la visible queda recortada.','Sustrae patios, accesos o terrazas del volumen principal: son espacios de transición protegidos del sol y la lluvia.','Edificio Mirador, gran vacío sustraído a 40 m de altura (MVRDV y Blanca Lleó, Madrid, 2005).',
    F('M50 34A20 20 0 1 0 50 66A20 20 0 0 1 50 34Z',0)+D('M50 34A20 20 0 1 0 50 66A20 20 0 0 1 50 34Z',0,'~b')+ANT('M50 34A20 20 0 0 1 50 66','~k')+W('M50 66A20 20 0 1 0 50 34')],
  ['interseccion','Intersección','Solo es visible la porción en que las dos formas se cruzan: aparece una forma nueva y más pequeña.','Busca qué espacio nace del cruce de dos geometrías o dos mallas: suele ser el lugar ideal para el espacio principal o la articulación.','Sant\'Ivo alla Sapienza, planta de dos triángulos que se intersectan (Francesco Borromini, Roma, 1660).',
    WC(38,50,20)+WC(62,50,20)+F('M50 34A20 20 0 0 1 50 66A20 20 0 0 1 50 34Z',0,'opacity:1')+D('M50 34A20 20 0 0 1 50 66A20 20 0 0 1 50 34Z',0,'~k')],
  ['coincidencia','Coincidencia','Las dos formas se acercan hasta coincidir y se leen como una sola; es el grado máximo de relación.','Haz coincidir geometrías en momentos clave: la malla estructural con la modulación de fachada, o el eje de acceso con el eje del patio.','Biblioteca de la Academia Phillips Exeter: el vacío central coincide con la geometría de la envolvente cuadrada (Louis Kahn, New Hampshire, 1972).',
    R(30,30,40,40,0)+MV(R(56,30,40,40,1,'~k'),-26,0,3.4)]
  ]},
{ n:'Transformaciones de la forma', s:'Dimensional · sustractiva · aditiva · articulación', pasos:['fun-06'], ref:'Ching cap. 2',
  cs:[
  ['tr-dim','Transformación dimensional','Se cambian una o más dimensiones de la forma sin que pierda su identidad: un cubo se alarga en prisma, se aplana en placa o se estira en torre.','Estira o comprime el volumen base para adaptarlo al terreno y a la normativa (COS, CUS, altura); comprueba que sigue siendo reconocible.','Edificio Flatiron, prisma estirado para ocupar un solar triangular (Daniel Burnham, Nueva York, 1902).',
    SX(R(30,30,40,40,0)+FR(30,30,40,40,0),30,50)+WL(30,86,92,86)],
  ['tr-sus','Transformación sustractiva','Se quita una porción del volumen; según cuánto se quite conserva su identidad inicial o se convierte en otra forma.','Itera: prisma completo → sustraer acceso → sustraer patio → sustraer terraza. Dibuja cada paso como diagrama (sirve para la memoria del proyecto).','Casa y estudio Gwathmey, volúmenes puros con sustracciones (Charles Gwathmey, Amagansett, 1966).',
    R(16,16,68,68,0,'~w')+ANT('M16 16L42 16L42 42L16 42Z','~k')+ANT('M60 60L84 60L84 84L60 84Z','~k')+PL([[42,16],[84,16],[84,60],[60,60],[60,84],[16,84],[16,42],[42,42]],1,'~b',1)],
  ['tr-adi','Transformación aditiva','Se añaden elementos al volumen original; su número y posición determinan si la forma inicial se mantiene dominante.','Añade al volumen principal piezas menores con identidad (escalera, porche de llegada, torre de agua) que articulen la fachada.','Ayuntamiento de Säynätsalo, volúmenes añadidos alrededor de un patio elevado (Alvar Aalto, Finlandia, 1952).',
    R(28,28,44,44,0)+R(72,38,16,24,1,'~k')+R(38,12,20,16,2,'~k')+R(14,52,14,16,3,'~k')],
  ['articulacion','Articulación de la forma','Modo en que se unen las superficies de una forma; una forma articulada muestra claramente sus partes y cómo se ensamblan.','Separa con una junta, un retranqueo o un cambio de material cada parte del edificio: se lee el orden y se resuelven juntas de dilatación estructural.','Casa Douglas, planos blancos articulados sobre el lago (Richard Meier, Míchigan, 1973).',
    box(-24,-10,0,22,30,30,0,'',[50,62],1,true)+box(4,-10,0,22,30,40,3,'~k',[50,62],1,true)+L(iso(1,-10,0)[0],iso(1,-10,0)[1],iso(1,-10,40)[0],iso(1,-10,40)[1],6,'~x')],
  ['aristas','Aristas','Línea de encuentro entre dos planos. Se puede enfatizar (marco, cambio de material) o anular (continuidad de material, vidrio a tope).','Decide qué aristas se leen (remates de cubierta, esquinas de volúmenes clave) y cuáles desaparecen; en hormigón visto, el chaflán evita despostillados.','Edificio Seagram, aristas marcadas por montantes de bronce (Mies van der Rohe, Nueva York, 1958).',
    box(-24,-24,0,48,48,44,0,'',[50,64],.85)+L(iso(24,24,0,[50,64],.85)[0],iso(24,24,0,[50,64],.85)[1],iso(24,24,44,[50,64],.85)[0],iso(24,24,44,[50,64],.85)[1],3,'~k ~b')],
  ['esquinas','Esquinas','Encuentro de dos planos o volúmenes; la esquina define la forma. Puede reforzarse (pilastra), liberarse (vacío) o desmaterializarse (vidrio).','Diseña especialmente las esquinas urbanas del terreno: una esquina abierta o retranqueada se vuelve acceso o plaza; una esquina de vidrio sin columna aligera el volumen.','Fábrica Fagus, esquina de vidrio sin columna (Walter Gropius y Adolf Meyer, Alfeld, 1911).',
    L(14,86,14,30,0,'~b')+L(14,30,46,30,0,'~b')+PL([[56,30],[86,30],[86,86]],1,'~b')+[0,1,2,3].map(j=>AL(46+j*3,30,86,62-j*8)).join('')+DOT(86,30,2.4,2)],
  ['superficies','Superficies','Articulación de las superficies con color, textura, despiece y relieve para modificar su peso visual o su escala.','Modula el despiece de fachada (paneles, juntas, celosías) para dar escala humana a muros grandes; usa relieve donde el sol rasante lo active.','Palazzo Medici Riccardi, almohadillado que se suaviza en altura (Michelozzo, Florencia, 1460).',
    R(16,12,68,76,0)+L(16,32,84,32,1)+L(16,48,84,48,2)+L(16,60,84,60,3)+L(16,70,84,70,4)+L(16,78,84,78,5)+[26,42,58,74].map((x,j)=>L(x,78,x,88,5+j*.3,'~k')).join('')]
  ]},
{ n:'Forma y espacio', s:'Campos, cerramientos, aberturas y cualidades', pasos:['fun-15','fun-16'], ref:'Ching cap. 3',
  cs:[
  ['campo','Campo espacial (elementos lineales verticales)','Cuatro columnas en las esquinas de un cuadrado definen un volumen espacial sin cerrarlo: el espacio está implícito y es permeable.','Define espacios exteriores con columnas, árboles o mástiles: zona de espera bajo pérgola, estancia bajo árboles; mantienen ventilación y control visual.','Atrio tetrástilo de la Casa de las Bodas de Plata (Pompeya, s. I).',
    isoPlane(-24,-24,0,48,48,0,'~w')+[[-24,-24],[24,-24],[24,24],[-24,24]].map((q,j)=>L(iso(q[0],q[1],0)[0],iso(q[0],q[1],0)[1],iso(q[0],q[1],36)[0],iso(q[0],q[1],36)[1],j)+DOT(iso(q[0],q[1],36)[0],iso(q[0],q[1],36)[1],1.8,j)).join('')+ANT('M'+[iso(-24,-24,36),iso(24,-24,36),iso(24,24,36),iso(-24,24,36)].map(p=>p.join(' ')).join('L')+'Z')],
  ['plano-aislado','Plano vertical aislado','Un solo plano vertical articula el espacio frente a él: define una fachada, un fondo o un borde, pero no encierra.','Un muro exento puede ser telón de fondo del acceso, pantalla contra el sol de la tarde o soporte de la señalética del edificio.','Muro blanco de El Bebedero en Las Arboledas (Luis Barragán, Atizapán, México, 1962).',
    isoWallX(-30,0,0,60,34,0)+W('M'+iso(-30,8,0).join(' ')+'Q'+iso(0,40,0).join(' ')+' '+iso(30,8,0).join(' '))+DOT(iso(0,18,0)[0],iso(0,18,0)[1],2,1)],
  ['planos-l','Planos en L','Dos planos en L definen un campo a lo largo de la diagonal desde la esquina hacia fuera; el campo es fuerte en la esquina y se disuelve al alejarse.','Úsalo para patios abiertos a una vista o a la brisa dominante, o para abrazar una zona exterior protegida en dos lados.','Casa Rosenbaum, planta en L que abraza el jardín (Frank Lloyd Wright, Florence, Alabama, 1940).',
    isoWallX(-28,-28,0,56,30,0)+isoWallY(-28,-28,0,56,30,1,'~k')+AL(iso(-28,-28,0)[0],iso(-28,-28,0)[1],iso(28,28,0)[0],iso(28,28,0)[1])],
  ['planos-par','Planos paralelos','Dos planos paralelos definen un volumen direccional orientado hacia los extremos abiertos: sugiere movimiento y recorrido.','Corredores abiertos, galerías y crujías entre muros portantes; si los extremos abiertos se orientan a la brisa, ventilan naturalmente.','Villa Sarabhai, bóvedas sobre muros paralelos (Le Corbusier, Ahmedabad, 1955).',
    isoWallX(-28,-20,0,56,30,0)+isoWallX(-28,20,0,56,30,1,'~k')+AL(iso(-36,0,0)[0],iso(-36,0,0)[1],iso(36,0,0)[0],iso(36,0,0)[1])],
  ['planos-u','Planos en U','Tres planos definen un campo orientado hacia el extremo abierto; es un espacio introvertido con una sola cara hacia fuera.','La U es ideal para un patio o un aula que se abre a un jardín; el lado abierto define la vista y el acceso principal.','Mégaron de Tirinto, sala en U con pórtico abierto (Grecia micénica, s. XIII a. C.).',
    isoWallX(-26,-26,0,52,28,0)+isoWallY(-26,-26,0,52,28,1)+isoWallY(26,-26,0,52,28,2,'~k')+DOT(iso(0,32,0)[0],iso(0,32,0)[1],2.2,2)],
  ['cerramiento','Cuatro planos: cerramiento','Cuatro planos encierran por completo un campo: es el espacio más definido e introvertido, fuertemente separado del entorno.','El patio cerrado es el arquetipo del clima cálido: sombra, control y microclima. En {T} puede ser el patio seguro rodeado por el edificio.','Patio del Palazzo Farnese (Antonio da Sangallo y Miguel Ángel, Roma, 1589).',
    R(14,14,72,72,0,'~b')+R(26,26,48,48,1)+FR(26,26,48,48,1)+DOT(50,50,2.4,2)],
  ['aberturas','Aberturas','Huecos en los planos que dan continuidad visual y espacial con el entorno: en el plano, en las esquinas o entre planos (vanos de suelo a techo, lucernarios).','Decide el tipo de abertura por función: en el plano para enmarcar una vista, en la esquina para liberar el volumen, entre planos para luz rasante. Protege siempre la abertura del sol directo.','Capilla de Notre-Dame-du-Haut, muro sur perforado con vanos abocinados (Le Corbusier, Ronchamp, 1955).',
    R(10,20,24,60,0)+R(16,34,12,18,1,'~k')+PL([[38,20],[62,20],[62,80],[38,80]],2)+PL([[62,20],[62,44]],2,'~k')+R(66,20,10,60,3)+R(80,20,10,60,3)+L(76,20,80,20,4,'~k')],
  ['cualidades','Cualidades del espacio: luz, vistas, cerramiento','Las propiedades del cerramiento (forma, color, textura, escala y proporción) y de las aberturas (tamaño, posición, orientación) determinan la luz, las vistas y el grado de cerramiento.','Para cada espacio clave define: cuánto cerramiento, de dónde viene la luz (cenital, lateral, reflejada) y qué vista enmarca. En la costa: luz indirecta y reflejada, nunca sol directo sobre zonas de trabajo.','Iglesia de la Luz, cruz recortada en el muro (Tadao Ando, Ibaraki, Osaka, 1989).',
    R(14,14,72,72,0)+L(50,20,50,80,1,'~k ~b')+L(28,42,72,42,1,'~k ~b')+[0,1,2,3,4].map(j=>AL(50,50,8+j*21,96)).join('')]
  ]},
{ n:'Organización espacial', s:'Relaciones y organizaciones', pasos:['fun-12','fun-13'], ref:'Ching cap. 4',
  cs:[
  ['interior','Espacio interior a otro','Un espacio amplio contiene a otro más pequeño. El menor depende del mayor, pero puede diferenciarse por forma u orientación para ganar protagonismo.','Un volumen dentro de otro (núcleo de servicios, sala especial dentro del gran vestíbulo) crea dos escalas en el mismo espacio.','Casa de Vidrio: el cilindro de ladrillo dentro del prisma de vidrio (Philip Johnson, New Canaan, 1949).',
    R(12,12,76,76,0)+C(46,50,14,1,'~k')+FC(46,50,14,1)],
  ['conexos','Espacios conexos','Dos espacios se superponen y forman una zona compartida; esa zona puede pertenecer a uno, a ambos, o ser un espacio nuevo que los une.','Haz que dos áreas afines se superpongan (espera y estancia, por ejemplo): la zona común permite supervisar y moverse sin barreras.','Biblioteca de Viipuri: sala de lectura y sala de préstamo que se interpenetran (Alvar Aalto, Víborg, 1935).',
    R(12,22,46,46,0)+R(42,32,46,46,1,'~k')+FR(42,32,16,36,2,'opacity:1')],
  ['contiguos','Espacios contiguos','La relación más común: cada espacio está claramente definido y responde a sus exigencias, y la continuidad depende del plano que los separa.','Define el grado de continuidad entre locales contiguos con el tipo de separación: muro ciego, vidrio, puerta corrediza o cambio de nivel.','Villa Müller, espacios contiguos a distintas alturas: Raumplan (Adolf Loos, Praga, 1930).',
    R(10,26,40,48,0)+R(50,26,40,48,1,'~k')+L(50,44,50,56,2,'~x ~b')],
  ['vinculados','Espacios vinculados por otro común','Dos espacios separados se relacionan mediante un tercero intermedio, que puede igualarlos, dominarlos o ser solo un nexo.','Une volúmenes por un hall o una galería común que distribuya a los distintos servicios del programa.','Unity Temple: templo y casa parroquial unidos por el vestíbulo de entrada (Frank Lloyd Wright, Oak Park, 1908).',
    R(8,30,30,40,0)+R(62,30,30,40,1)+R(38,42,24,16,2,'~k')+FR(38,42,24,16,2)],
  ['org-central','Organización central','Un espacio central dominante con varios secundarios agrupados alrededor. Estable, concentrada; el centro suele ser regular y de gran tamaño.','Ubica en el centro el espacio común (patio o vestíbulo) y alrededor las unidades; controla bien, pero exige cuidar que el centro no se vuelva oscuro o caluroso.','Museo Guggenheim de Nueva York, gran vacío central con rampa (Frank Lloyd Wright, 1959).',
    C(50,50,18,0,'~b')+FC(50,50,18,0)+[0,45,90,135,180,225,270,315].map((a,j)=>{const c=Math.cos(a*Math.PI/180),s=Math.sin(a*Math.PI/180);return R(50+c*34-5,50+s*34-5,10,10,1+j*.3);}).join('')],
  ['org-lineal','Organización lineal','Secuencia lineal de espacios repetidos o conectados por un recorrido. Flexible, se adapta al terreno y crece por los extremos.','Pasillo central con espacios a ambos lados (doble crujía) o a un lado (galería abierta para ventilar). Es la organización típica de alas de habitaciones y aulas.','Galería degli Uffizi, sucesión de salas a lo largo de una galería (Giorgio Vasari, Florencia, 1581).',
    L(6,50,94,50,0,'~k ~b')+[10,26,42,58,74].map((x,j)=>R(x,30,14,16,1+j*.4)+R(x,54,14,16,1.2+j*.4)).join('')],
  ['org-radial','Organización radial','Un espacio central del que parten en forma radial varias organizaciones lineales; combina centralidad y linealidad, y se extiende hacia el entorno.','Útil en conjuntos grandes: un centro de control y brazos especializados; cuida que los ángulos entre brazos no generen espacios residuales.','Palmanova, ciudad fortificada de planta radial (Italia, 1593).',
    PL([[50,20],[76,35],[76,65],[50,80],[24,65],[24,35]],0,'~w',1)+C(50,50,7,0,'~k')+ROT([30,90,150,210,270,330].map((a,j)=>{const c=Math.cos(a*Math.PI/180),s=Math.sin(a*Math.PI/180);return L(50+c*7,50+s*7,50+c*40,50+s*40,1+j*.3);}).join(''),30)],
  ['org-agrupada','Organización agrupada','Espacios agrupados por proximidad o por compartir un rasgo, sin geometría dominante; admite tamaños, formas y funciones distintos.','Agrupa unidades de distinto tamaño alrededor de un recorrido o un patio; el reto es dar orden visual (un material, una cubierta común).','Pueblo de Taos, viviendas de adobe agrupadas (Nuevo México, c. 1000–1450).',
    R(14,20,22,18,0)+R(38,14,18,24,1)+R(58,22,26,20,2,'~k')+R(18,42,18,24,3)+R(40,44,26,22,4)+R(68,46,18,30,5)+R(26,70,30,16,6,'~k')],
  ['org-trama','Organización en trama','Formas y espacios cuya posición y relación se regulan por una trama tridimensional; el orden viene de la regularidad de la trama.','Ancla el proyecto a la malla estructural: los espacios ocupan uno o varios módulos y la trama permite reordenar el programa durante la vida del edificio.','Museo de Arte Kimbell, bóvedas cicloides sobre una trama regular (Louis Kahn, Fort Worth, 1972).',
    [0,1,2].map(r=>[0,1,2].map(c=>box(-30+c*20,-30+r*20,0,14,14,10+((r+c)%2)*8,(r*3+c)*.5,(r+c)%2?'~k':'',[50,66],1)).join('')).join('')]
  ]},
{ n:'Circulación', s:'Aproximación · acceso · recorrido', pasos:['fun-14'], ref:'Ching cap. 5',
  cs:[
  ['aproximacion','Aproximación','Primera fase del recorrido: ver el edificio desde lejos. Puede ser frontal (directa, axial), oblicua (realza la perspectiva) o en espiral (prolonga la experiencia).','Diseña desde dónde llega cada usuario (peatón, vehículo, servicio, transporte público) y qué fachada ve primero; separa las llegadas que no deben cruzarse.','Acrópolis de Atenas: aproximación oblicua a través de los Propileos hacia el Partenón (s. V a. C.).',
    R(56,16,30,22,0,'~b')+ANT('M8 92Q20 50 56 44')+MV(DOT(8,92,2.4),48,-48,4)+WL(56,44,86,92)],
  ['acceso','Acceso','Paso de fuera a dentro a través de un plano. Puede ser enrasado, adelantado o retrasado; su forma, tamaño y detalle anuncian el uso del edificio.','Haz el acceso principal visible, cubierto y amplio; un acceso retrasado da sombra y protección de la lluvia mientras se espera.','Casa Vanna Venturi, acceso retrasado bajo el frontón partido (Robert Venturi, Filadelfia, 1964).',
    PL([[10,40],[40,40],[40,56],[60,56],[60,40],[90,40]],0,'~b')+L(50,92,50,62,1,'~k')+PL([[44,68],[50,60],[56,68]],2,'~k')+WL(10,30,90,30)],
  ['config-recorrido','Configuración del recorrido','Forma del recorrido: lineal, radial, en espiral, en trama, en red o compuesto. Es la estructura que ordena los espacios.','Elige una configuración legible, con nodos de espera; separa el recorrido público del técnico (personal, suministros, residuos).','Museo Nacional de Arte Occidental, recorrido en espiral cuadrada (Le Corbusier, Tokio, 1959).',
    D('M50 50L58 50L58 58L42 58L42 42L66 42L66 66L34 66L34 34L74 34L74 74L26 74L26 26L82 26L82 82',0,'~b')+DOT(50,50,2.4)],
  ['recorrido-espacio','Relación recorrido-espacio','El recorrido puede pasar entre los espacios (sin tocarlos), atravesarlos o terminar en ellos. Cada opción da distinto grado de privacidad.','Que los recorridos públicos pasen junto a las salas de estar o espera y no las atraviesen; los locales privados deben ser espacios donde el recorrido termina.','Rolex Learning Center: el recorrido atraviesa un paisaje continuo sin muros (SANAA, Lausana, 2010).',
    R(14,12,26,20,0)+AL(54,8,54,36)+R(14,40,26,20,1)+AL(6,50,94,50,'~k')+R(60,68,26,20,2)+AL(6,78,60,78)+DOT(60,78,2,2)],
  ['forma-circ','Forma del espacio de circulación','El espacio de circulación puede ser cerrado (pasillo con puertas), abierto a un lado (galería) o abierto a ambos (pórtico). Su ancho depende del uso y del flujo.','Dimensiona los pasillos por norma y por uso (en salud ≥ 2,20–2,40 m donde pasan camillas) y abre galerías a patios para ventilar e iluminar.','Galería Vittorio Emanuele II, calle cubierta (Giuseppe Mengoni, Milán, 1877).',
    PL([[8,30],[8,10],[30,10],[30,30]],0)+L(8,30,30,30,0,'~k')+PL([[38,30],[38,10],[60,10]],1)+L(38,30,60,30,1,'~k')+L(70,10,92,10,2)+L(70,30,92,30,2,'~k')+D('M8 80Q50 40 92 80',3)+L(8,80,92,80,3,'~k')],
  ['promenade','Promenade architecturale','Recorrido diseñado como secuencia de experiencias: rampas, vistas y cambios de luz que se descubren al moverse por el edificio.','Diseña una secuencia para el usuario principal: llegada, umbral, espera con vista al jardín, destino. Dibújala como serie de croquis.','Carpenter Center, rampa que atraviesa el edificio (Le Corbusier, Universidad de Harvard, 1963).',
    WL(8,88,92,88)+PL([[10,84],[56,70],[22,56],[68,42],[34,28],[86,14]],0,'~b')+MV(DOT(10,84,2.4),76,-70,5)]
  ]},
{ n:'Proporción y escala', s:'Medida, cuerpo y orden', pasos:['fun-05'], ref:'Ching cap. 6',
  cs:[
  ['aurea','Sección áurea','División de una magnitud en dos partes donde la menor es a la mayor como la mayor al todo: φ ≈ 1,618. Genera el rectángulo áureo y la serie de Fibonacci.','Úsala como pauta para proporcionar fachadas, vanos o la relación entre volúmenes; no la impongas al programa: verifica después si la proporción "funciona".','Partenón, Atenas (análisis clásico; la aplicación exacta de φ es debatida por los historiadores).',
    L(59.4,25,59.4,74.4,1)+L(59.4,55.6,90,55.6,2)+L(71.1,55.6,71.1,74.4,3)+L(59.4,62.8,71.1,62.8,4)+R(10,25,80,49.4,0)+D('M10 74.4A49.4 49.4 0 0 1 59.4 25A30.6 30.6 0 0 1 90 55.6A18.9 18.9 0 0 1 71.1 74.4A11.7 11.7 0 0 1 59.4 62.8',5,'~k ~b')],
  ['trazado','Trazados reguladores','Sistema de diagonales paralelas y perpendiculares que controla la proporción de una fachada o planta: los elementos cuyas diagonales son paralelas son semejantes.','Superpón un trazado regulador sobre la fachada: alinea vanos, alturas y volúmenes con las diagonales; justifica la composición en la lámina.','Villa Stein-de Monzie, fachadas con trazados reguladores (Le Corbusier, Garches, 1927).',
    R(10,24,80,52,0)+R(30,40,18,24,1)+R(58,40,20,24,1)+AL(10,76,90,24)+AL(10,24,48,64)+AL(58,64,90,40,'~k')+DOT(48,40,1.8,2)+DOT(58,64,1.8,3)],
  ['ordenes','Órdenes clásicos','Sistemas proporcionales griegos y romanos (dórico, jónico, corintio, toscano, compuesto) donde todo se mide en módulos del diámetro de la columna.','Aunque no uses columnas clásicas, el principio sirve: elige un módulo (el pilar, la ventana, el panel) y deriva de él todas las medidas de la fachada.','Coliseo de Roma, órdenes superpuestos toscano, jónico y corintio (70–80 d. C.).',
    [20,50,80].map((x,j)=>L(x-5,86,x-5,34+j*4,j)+L(x+5,86,x+5,34+j*4,j)+L(x-9,34+j*4,x+9,34+j*4,j+.5,'~k')+L(x-8,86,x+8,86,j)).join('')+L(10,26,90,26,3)+L(10,20,90,20,3.5)],
  ['modulor','Modulor','Sistema de medidas de Le Corbusier basado en un hombre de 1,83 m con el brazo alzado (2,26 m) y en φ; genera las series roja y azul (113, 183, 226 cm…).','Usa el Modulor o una serie propia para alturas de muebles, antepechos y vanos; si el usuario principal es otro (niños, adultos mayores), crea tu serie a partir de sus medidas.','Unidad de Habitación de Marsella (Le Corbusier, 1952).',
    C(40,20,5,0)+L(40,25,40,56,1)+L(40,56,32,86,2)+L(40,56,48,86,2)+L(40,32,30,46,3)+L(40,32,50,12,3,'~k')+L(66,86,66,8,4)+[86,58,36,8].map((y,j)=>L(62,y,70,y,4+j*.3,'~k')).join('')+T(72,60,'113',6)+T(72,38,'183',6)+T(72,10,'226',6)],
  ['ken','Ken','Unidad japonesa (≈ 1,82 m, varía por región) que rige la estructura y la medida del tatami (1 × 0,5 ken); las habitaciones se miden en número de tatamis.','Modula el proyecto a partir de un elemento constructivo real y local (bloque, panel de fibrocemento, tablero): reduces desperdicio y ordenas la obra.','Villa Imperial de Katsura, modulada en ken y tatami (Kioto, s. XVII).',
    R(14,14,72,72,0,'~b')+L(14,50,50,50,1)+L(50,14,50,50,1)+R(38,38,24,24,2,'~k')+L(50,62,50,86,3)+L(62,50,86,50,3)],
  ['antropometria','Antropometría y ergonomía','Medidas del cuerpo humano y de su alcance y movimiento; base para dimensionar muebles, circulaciones y espacios. Varían por edad, población y discapacidad.','Dimensiona con datos del usuario real (edades, acompañantes, coches de bebé, usuarios en silla de ruedas: giro Ø 1,50 m, NTE INEN 2239/2245 en Ecuador).','Cocina de Fráncfort, diseñada por estudios de movimientos (Margarete Schütte-Lihotzky, 1926). Arte de proyectar en arquitectura (Ernst Neufert, 1936).',
    C(42,20,6,0)+L(42,26,42,58,1)+L(42,58,34,88,1)+L(42,58,50,88,1)+L(42,36,62,44,2)+D('M42 36A26 26 0 0 1 68 62',3,'~k')+D('M42 36A26 26 0 0 0 16 62',3,'~k')+WL(10,88,90,88)],
  ['escala-humana','Escala humana','Tamaño de los elementos en relación con las dimensiones del cuerpo humano; nos hace sentir cómodos o empequeñecidos.','Incluye elementos a escala del usuario: en {T}, ventanas, bancas, nichos y puertas a su medida; equilibra con la escala del adulto acompañante.','Escuela Montessori de Delft, umbrales y nichos a escala del niño (Herman Hertzberger, 1966).',
    WL(8,88,92,88)+R(18,30,26,58,0)+C(60,48,5,1)+L(60,53,60,72,1)+L(60,72,55,88,1)+L(60,72,65,88,1)+C(78,64,4,2,'~k')+L(78,68,78,78,2,'~k')+L(78,78,75,88,2,'~k')+L(78,78,81,88,2,'~k')],
  ['escala-visual','Escala visual (genérica)','Tamaño con que percibimos un elemento en relación con otros de tamaño conocido; puede ser íntima, normal o monumental.','Decide qué espacio merece escala monumental y cuál íntima; usa elementos de tamaño conocido (escalones, ventanas, puertas) para que se entienda la medida.','Basílica de San Pedro: los putti de las pilas de agua bendita miden casi 2 m y engañan la escala (Roma, s. XVIII).',
    R(26,8,48,80,0,'~b')+D('M26 30A24 22 0 0 1 74 30',1)+WL(4,88,96,88)+C(86,78,2.4,2,'~k')+L(86,80,86,88,2,'~k')]
  ]},
{ n:'Principios ordenadores', s:'Eje · simetría · jerarquía · pauta · ritmo', pasos:['fun-09','fun-10','fun-11','fun-22'], ref:'Ching cap. 7',
  cs:[
  ['eje','Eje','Línea definida por dos puntos en el espacio, respecto a la cual se disponen formas y espacios de manera regular o irregular. Es el ordenador más elemental.','Traza el eje de acceso y el eje del espacio principal; termina cada eje en algo significativo (patio, vista, árbol) y no en un muro ciego.','Eje histórico de París: Louvre – Campos Elíseos – Arco de la Défensa.',
    AL(50,4,50,96,'~k')+R(36,8,28,14,0)+R(30,40,40,20,1)+R(38,78,24,14,2)+DOT(50,4,2,1)+DOT(50,96,2,2)],
  ['simetria','Simetría','Distribución equilibrada de formas equivalentes a uno y otro lado de un eje (bilateral) o alrededor de un centro (radial).','Usa la simetría donde quieras representación y orden (acceso, fachada principal); en el resto, un equilibrio asimétrico suele resolver mejor el programa real.','Taj Mahal (Ustad Ahmad Lahauri, Agra, 1653).',
    AL(50,6,50,94)+PL([[50,20],[34,30],[30,50],[18,50],[18,86],[50,86]],0)+PL([[50,20],[66,30],[70,50],[82,50],[82,86],[50,86]],2,'~k')+D('M40 50A10 12 0 0 1 60 50',1)],
  ['jerarquia','Jerarquía','Importancia de una forma o espacio expresada por tamaño excepcional, forma única o situación estratégica.','Define 1–2 espacios jerárquicos (vestíbulo principal, patio central) y diferencia su tamaño, altura o forma; el resto se repite de manera sencilla.','Cúpula de Santa Maria del Fiore (Filippo Brunelleschi, Florencia, 1436).',
    C(54,46,20,0,'~b')+FC(54,46,20,0)+R(10,70,12,12,1)+R(26,70,12,12,1.3)+R(42,72,10,10,1.6)+R(58,72,10,10,1.9)+R(74,70,12,12,2.2)+DOT(54,46,2.4,1)],
  ['pauta','Pauta (datum)','Línea, plano o volumen que, por su continuidad y regularidad, sirve para reunir, medir y organizar un conjunto de formas y espacios diversos.','Una gran cubierta, un muro continuo o una galería común pueden unificar volúmenes muy distintos del programa: son la pauta del conjunto.','Plaza de San Marcos: las Procuradurías como pauta continua que unifica la plaza (Venecia).',
    L(6,40,94,40,0,'~k ~b')+R(10,40,14,26,1)+C(40,54,10,1.5)+PL([[56,40],[64,64],[72,40]],2)+R(78,40,12,40,2.5)],
  ['ritmo','Ritmo','Movimiento caracterizado por la repetición modulada de elementos o motivos a intervalos regulares o irregulares.','Diseña el ritmo de fachada con pilares, quiebrasoles o vanos; alterna ritmos (A-B-A-B) para evitar monotonía en fachadas largas.','Acueducto de Segovia (s. I–II d. C.).',
    WL(4,88,96,88)+[0,1,2,3,4].map(j=>D(`M${8+j*17} 88L${8+j*17} 46A8.5 8.5 0 0 1 ${25+j*17} 46L${25+j*17} 88`,j*.4)).join('')+L(6,30,94,30,3,'~k')],
  ['repeticion','Repetición','Uso de elementos iguales o semejantes agrupados por proximidad o por rasgos comunes (tamaño, contorno, detalle). Es la base del ritmo.','Repite un módulo de local tipo: abarata y ordena; reserva la variación para los espacios jerárquicos.','Mezquita de Córdoba, bosque de columnas y arcos repetidos (785–987).',
    [0,1,2,3].map(r=>[0,1,2,3].map(c=>C(20+c*20,20+r*20,5,(r*4+c)*.25,(r+c)%3?'':'~k')).join('')).join('')],
  ['transformacion','Transformación','Un concepto o modelo se mantiene, se refuerza y se desarrolla mediante manipulaciones y permutaciones sin perder su identidad.','Toma un tipo (por ejemplo, la unidad básica del programa) y transfórmalo para cada situación (esquina, frente a patio, planta alta) manteniendo su estructura.','Variaciones del tipo en las villas de Andrea Palladio (Véneto, s. XVI; estudio de Rudolf Wittkower).',
    R(6,40,18,18,0)+PL([[32,40],[46,40],[50,44],[50,58],[32,58]],1,'',1)+PL([[60,44],[64,40],[72,40],[76,44],[76,54],[72,58],[64,58],[60,54]],2,'',1)+C(88,49,8,3,'~k')+AL(6,72,96,72)]
  ]},
{ n:'Gestalt y percepción', s:'Leyes de la organización perceptiva', pasos:['fun-19','fun-22'], ref:'Wertheimer, Koffka, Köhler · Arnheim',
  cs:[
  ['figura-fondo','Figura-fondo','Percibimos una figura sobre un fondo; ambos se definen mutuamente y pueden alternarse. En urbanismo, lo construido y el vacío se leen como figura y fondo.','Dibuja el plano figura-fondo de la manzana con tu proyecto: el espacio exterior debe tener forma (plaza, patio), no ser sobrante.','Plano de Roma de Giambattista Nolli, figura-fondo urbano (1748).',
    FR(8,8,36,30,0,'opacity:1;fill:rgba(var(--acc-rgb),.5);animation:none')+FR(52,8,40,18,1,'opacity:1;fill:rgba(var(--acc-rgb),.5);animation:none')+FR(52,32,18,32,2,'opacity:1;fill:rgba(var(--acc-rgb),.5);animation:none')+FR(8,46,36,46,3,'opacity:1;fill:rgba(var(--acc-rgb),.5);animation:none')+FR(76,32,16,60,4,'opacity:1;fill:rgba(var(--acc-rgb),.5);animation:none')+R(18,58,14,22,5,'~k')+R(52,70,18,22,5)],
  ['proximidad','Proximidad','Los elementos cercanos entre sí se perciben como grupo.','Agrupa ventanas, volúmenes o unidades para formar conjuntos legibles (por ejemplo, las ventanas de cada servicio agrupadas).','Quinta Monroy, viviendas incrementales agrupadas por cercanía (Elemental / Alejandro Aravena, Iquique, Chile, 2004).',
    [[16,30],[26,30],[16,40],[26,40],[62,24],[72,24],[82,24],[62,34],[72,34],[82,34],[40,70],[50,70],[60,70],[45,80],[55,80]].map((q,j)=>DOT(q[0],q[1],3,j*.1)).join('')+WC(21,35,14)+WC(72,29,17)+WC(50,75,16)],
  ['semejanza','Semejanza','Los elementos parecidos en forma, color, tamaño o textura se agrupan aunque estén separados.','Usa un mismo material o color para todo lo que tiene la misma función (todas las escaleras, todos los accesos): el usuario lo aprende y se orienta.','Mercado de Santa Caterina, cubierta de piezas cerámicas hexagonales de colores (EMBT, Barcelona, 2005).',
    [0,1,2,3].map(r=>[0,1,2,3].map(c=>c%2?R(16+c*20,16+r*20,8,8,(r+c)*.3,'~k'):C(20+c*20,20+r*20,4.5,(r+c)*.3)).join('')).join('')],
  ['cierre','Cierre','La mente completa formas incompletas: percibimos figuras cerradas aunque falten partes.','Un espacio puede quedar definido sin cerrarse: columnas, setos o cambios de piso bastan para que se lea completo; ahorras muros y ganas ventilación.','Pabellón Serpentine 2013, trama de barras leída como una nube con forma (Sou Fujimoto, Londres).',
    D('M43 22A9 9 0 1 0 34 34',0)+D('M66 34A9 9 0 1 0 57 22',1)+D('M58 80A9 9 0 1 0 42 80',2)+ANT('M50 26L74 68L26 68Z','~k')],
  ['continuidad','Continuidad','Los elementos alineados sobre una línea o curva se perciben como relacionados; el ojo sigue la dirección más fluida.','Alinea aleros, ventanas y barandas para que el ojo recorra la fachada con continuidad; útil para guiar hacia el acceso.','Edificio Copan, bandas horizontales continuas de quiebrasoles (Oscar Niemeyer, São Paulo, 1966).',
    D('M6 70C30 70 40 20 94 24',0,'~b')+D('M6 24C40 24 60 80 94 76',1,'~k ~b')],
  ['pregnancia','Pregnancia (simplicidad)','Ley de la buena forma: tendemos a percibir la forma más simple, regular y estable posible.','Simplifica: un volumen claro con pocas excepciones se recuerda y se entiende; la complejidad debe estar en la experiencia, no en el contorno.','Capilla de campo Bruder Klaus, un prisma simple (Peter Zumthor, Mechernich, Alemania, 2007).',
    [0,1,2,3,4,5,6,7,8,9,10,11].map(j=>{const a=j*30*Math.PI/180,b=(j*30+20)*Math.PI/180;return D(`M${r1(50+Math.cos(a)*30)} ${r1(50+Math.sin(a)*30)}A30 30 0 0 1 ${r1(50+Math.cos(b)*30)} ${r1(50+Math.sin(b)*30)}`,j*.25);}).join('')+DOT(50,50,2.2,2)]
  ]},
{ n:'Color y percepción', s:'Teoría del color aplicada', pasos:['fun-20'], ref:'Itten · Albers · Munsell · NCS',
  cs:[
  ['dim-color','Dimensiones del color','Todo color tiene tono (matiz), valor (claridad) y saturación (pureza). Sistemas como Munsell o NCS los ordenan y permiten especificarlos con precisión.','Especifica los colores con un código (NCS, RAL o el código del fabricante local), no con nombres; arma una paleta base (70 %), secundaria (25 %) y de acento (5 %).','Casa Estudio Luis Barragán (Tacubaya, Ciudad de México, 1948).',
    [0,1,2,3,4,5].map(j=>FR(10+j*13.6,14,13,18,j*.3,`opacity:1;animation:none;fill:hsl(${j*60},75%,55%)`)).join('')+[0,1,2,3,4,5].map(j=>FR(10+j*13.6,42,13,18,j*.3,`opacity:1;animation:none;fill:hsl(190,80%,${15+j*13}%)`)).join('')+[0,1,2,3,4,5].map(j=>FR(10+j*13.6,70,13,18,j*.3,`opacity:1;animation:none;fill:hsl(190,${j*19}%,55%)`)).join('')+R(10,14,81.6,18,0)+R(10,42,81.6,18,1)+R(10,70,81.6,18,2)],
  ['temperatura','Temperatura y efecto espacial','Los colores cálidos (rojos, naranjas) parecen avanzar y estimulan; los fríos (azules, verdes) parecen retroceder y calman. Los claros amplían, los oscuros reducen.','Usa tonos fríos y claros en espacios de permanencia larga y calurosos; tonos cálidos puntuales para señalar acceso o actividad. Un techo oscuro "baja" la altura percibida.','Polychromie architecturale de Le Corbusier (cartas Salubra, 1931); Maison La Roche (París, 1925).',
    MV(FR(20,30,30,30,0,'opacity:1;animation:none;fill:rgba(255,120,60,.55)')+R(20,30,30,30,0),-4,-4,2.4)+MV(FR(56,40,24,24,1,'opacity:1;animation:none;fill:rgba(60,140,255,.5)')+R(56,40,24,24,1,'~k'),4,4,2.4)],
  ['contraste','Contraste simultáneo','Un color se percibe distinto según el color que lo rodea: el mismo gris se ve más claro sobre negro y más oscuro sobre blanco.','Prueba los colores junto a sus vecinos reales (muestras grandes, a la luz del sitio); la luz intensa de la costa desatura y aclara los colores.','Josef Albers, Interaction of Color (Yale, 1963) y la serie Homenaje al cuadrado.',
    FR(8,20,40,60,0,'opacity:1;animation:none;fill:#0a0f16')+FR(52,20,40,60,0,'opacity:1;animation:none;fill:#cfd8e2')+FR(20,40,16,20,1,'opacity:1;animation:none;fill:#6b7480')+FR(64,40,16,20,1,'opacity:1;animation:none;fill:#6b7480')+R(8,20,84,60,2)],
  ['armonias','Armonías cromáticas','Combinaciones según su posición en el círculo cromático: análogas (vecinas), complementarias (opuestas), triádicas, complementarias divididas.','Define la paleta del proyecto con una armonía: análoga para calma, complementaria puntual para señalar; relaciona la paleta con el paisaje y los materiales locales.','Caminito, barrio de La Boca, colores contrastantes sobre chapa (Buenos Aires).',
    [0,1,2,3,4,5,6,7,8,9,10,11].map(j=>{const a=(j*30-90)*Math.PI/180,b=((j+1)*30-90)*Math.PI/180;return FP([[50,50],[50+Math.cos(a)*34,50+Math.sin(a)*34],[50+Math.cos(b)*34,50+Math.sin(b)*34]],j*.15,`opacity:.85;animation:none;fill:hsl(${j*30},70%,50%)`);}).join('')+C(50,50,34,0)+ROT(L(50,14,50,86,1,'~b'),10)],
  ['color-clima','Color, clima y luz','La reflectancia (LRV) y el albedo de las superficies determinan cuánto calor absorben y cuánta luz reflejan; en el trópico el color es una decisión térmica.','Cubiertas y fachadas expuestas en tonos claros (LRV alto) para reducir ganancia térmica; evita el blanco brillante en planos que deslumbren a la altura de la vista.','Barrio Las Peñas, casas de colores claros en el cerro Santa Ana (Guayaquil).',
    C(24,22,8,0,'~k')+[0,1,2,3,4,5,6,7].map(j=>{const a=j*45*Math.PI/180;return L(24+Math.cos(a)*11,22+Math.sin(a)*11,24+Math.cos(a)*15,22+Math.sin(a)*15,.2+j*.1,'~k');}).join('')+AL(30,30,62,62,'~k')+R(62,40,26,48,1)+AL(62,62,40,86)+T(64,36,'LRV',7)],
  ['psico-color','Color y usuario','El color influye en el estado de ánimo, la orientación y la identidad; su efecto depende de cultura, edad y contexto. En salud, el color ayuda a reducir ansiedad y a orientarse.','En {T}: zonas de color por servicio para orientarse, acentos alegres en áreas de actividad, tonos suaves en áreas de reposo; verifica contraste para baja visión.','Royal Children\'s Hospital, fachada de paneles de colores (Billard Leece y Bates Smart, Melbourne, 2011).',
    C(30,30,6,0)+L(30,36,30,58,0)+L(30,58,24,80,0)+L(30,58,36,80,0)+L(30,42,20,52,0)+L(30,42,40,52,0)+FR(52,58,14,14,1,'opacity:1;animation:none;fill:rgba(255,190,60,.6)')+FR(66,58,14,14,1.5,'opacity:1;animation:none;fill:rgba(var(--done-rgb),.55)')+FR(59,44,14,14,2,'opacity:1;animation:none;fill:rgba(var(--acc-rgb),.55)')+R(52,58,14,14,1)+R(66,58,14,14,1.5)+R(59,44,14,14,2)+WL(8,80,92,80)]
  ]},
{ n:'Concepto arquitectónico', s:'De la idea a la forma', pasos:['fun-02','fun-03','fun-08'], ref:'Ching · Baker, Análisis de la forma · Vitruvio',
  cs:[
  ['partido','Idea generatriz y partido','La idea generatriz es el concepto que guía el proyecto; el partido es su traducción en una decisión espacial básica (organización, forma, implantación) que se mantiene hasta el final.','Escribe tu idea en una frase y dibújala en un diagrama de 5 trazos. Comprueba cada decisión posterior contra esa frase: si la contradice, cambia la decisión o la idea.','Casa del Puente: la casa como puente sobre el arroyo (Amancio Williams, Mar del Plata, 1945).',
    D('M10 70C20 40 30 80 40 50S56 30 50 60',0)+PL([[54,52],[64,52]],1,'~k')+PL([[60,48],[64,52],[60,56]],1,'~k')+R(68,36,24,32,2,'~b')],
  ['analogia','Analogía','Relación de semejanza estructural o funcional con otro sistema (natural, mecánico, cultural) que se usa como fuente de la forma.','Busca una analogía que explique cómo funciona tu edificio (un árbol que da sombra, un nido que protege, un aula como casa); úsala en la memoria y en la forma.','Estadio Nacional de Pekín "Nido de pájaro" (Herzog & de Meuron, 2008).',
    E(50,50,36,22,0)+[0,1,2,3,4,5].map(j=>L(14+j*12,36+(j%2)*28,26+j*12,64-(j%2)*28,1+j*.3,j%2?'~k':'')).join('')],
  ['metafora','Metáfora','Traslado de significado de una cosa a otra: la forma evoca algo que no es (vuelo, ola, refugio) para comunicar una idea o emoción.','Usa la metáfora con cuidado: debe sostener la experiencia del usuario (sentirse protegido, acogido), no ser una figura literal.','Terminal TWA, metáfora del vuelo (Eero Saarinen, aeropuerto JFK, Nueva York, 1962).',
    D('M8 60Q30 26 50 52Q70 26 92 60',0,'~b')+D('M20 60Q50 48 80 60',1,'~k')+WL(8,74,92,74)+MV(DOT(50,52,2.2),0,-6,2)],
  ['abstraccion','Abstracción','Reducir un referente (paisaje, objeto, tradición) a sus rasgos esenciales de geometría, proporción, material o luz, para que inspire sin copiarse.','Abstrae de lo local: la galería de la casa costeña, la cubierta ventilada, la caña guadúa; conserva su principio (sombra, ventilación) y reinterpreta la forma.','Museo de Arte de Teshima, gota de agua abstraída en una cáscara de hormigón (Ryue Nishizawa, Japón, 2010).',
    [0,1,2,3,4].map(j=>L(14+j*4,80,22+j*3-((j%2)*6),30+j*6,j*.25)).join('')+C(20,40,10,1.5)+PL([[38,56],[50,56]],2,'~k')+D('M58 74A17 14 0 0 1 92 74Z',3,'~b')],
  ['diagrama','Diagrama','Representación abstracta de relaciones (programa, flujos, zonas, sol, viento) que precede a la forma; el diagrama de burbujas lleva a la zonificación.','Del programa arquitectónico → matriz de relaciones → diagrama de burbujas → zonificación sobre el terreno: cada burbuja con su área y cada línea con el grado de relación.','Biblioteca Central de Seattle, de un diagrama de plataformas a la forma (OMA / Rem Koolhaas, 2004).',
    C(30,34,14,0)+C(68,30,10,1)+C(62,68,16,2,'~k')+C(24,72,8,3)+L(44,34,58,31,4)+L(36,46,52,58,4.5)+L(67,40,64,52,5)+AL(30,64,46,68)],
  ['contexto','Contexto y genius loci','El "espíritu del lugar": clima, topografía, paisaje, cultura y ciudad como generadores de la forma.','Haz que el proyecto responda a lo que solo existe en {C}: sol, lluvia, brisa, riesgo de inundación, materiales y oficios locales.','Escuela Nueva Esperanza, materiales y técnicas locales (Al Borde, Puerto Cabuyal, Manabí, Ecuador, 2009).',
    W('M8 86Q30 70 50 74T92 64')+D('M8 76Q30 62 50 64T92 54',0)+D('M8 66Q30 54 50 56T92 46',1)+PL([[40,56],[40,40],[56,32],[72,40],[72,54]],2,'~k')+D('M14 30A40 30 0 0 1 86 30',3)+DOT(30,18,3,1)],
  ['vitruvio','Tríada vitruviana','Firmitas (solidez), utilitas (función) y venustas (belleza): los tres valores que toda obra debe equilibrar según Vitruvio (De architectura, s. I a. C.).','Evalúa cada variante de partido con una tabla de tres columnas (firmitas, utilitas, venustas) y elige la que mejor equilibre; escríbelo en la memoria.','Panteón de Roma: cúpula de 43,3 m, espacio y luz (Adriano, c. 126 d. C.).',
    PL([[50,14],[86,78],[14,78]],0,'',1)+C(50,14,6,1,'~k')+C(86,78,6,1.5,'~k')+C(14,78,6,2,'~k')+T(47,32,'F',8)+T(70,73,'U',8)+T(24,73,'V',8)+DOT(50,56,2.4,2)]
  ]}
];
FU.forEach((u,ui)=>{ u.i=ui; u.cs=u.cs.map((c,ci)=>({id:c[0],n:c[1],d:c[2],a:c[3],ej:c[4],g:c[5],u:ui,code:(ui+1)+'.'+(ci+1)})); });
const FC_ALL = FU.flatMap(u=>u.cs);
const FC_BY = Object.fromEntries(FC_ALL.map(c=>[c.id,c]));
const FUN_PASOS = {'fun-02':'Formular la idea generatriz (concepto)','fun-03':'Programa → diagramas de relaciones y zonificación','fun-04':'Geometría base y malla del proyecto','fun-05':'Trazado regulador o sistema de proporción','fun-06':'Operaciones formales con maquetas de estudio','fun-07':'Resolver el impacto entre volúmenes','fun-08':'Evaluar variantes (tríada vitruviana) y elegir partido','fun-09':'Definir el eje o los ejes','fun-10':'Jerarquía de espacios','fun-11':'Simetría/equilibrio, ritmo y pauta','fun-12':'Tipo de organización espacial','fun-13':'Relaciones entre espacios y transiciones','fun-14':'Circulación: aproximación, acceso y recorrido','fun-15':'Elementos definidores de cada espacio clave','fun-16':'Planos seriados','fun-17':'Forma en su contexto urbano y climático','fun-19':'Fachada como sistema','fun-20':'Paleta de color y texturas','fun-22':'Diagramas de principios ordenadores'};

/* ===================== FUNDAMENTOS · UI ===================== */
const FX='m-fundamentos-';
const fuUI = { vista:null, ficha:null, panel:false, view:null, listTop:0, taller:false };
const fuTmp = {}; /* bocetos no guardados (sin permiso de subida): id concepto -> [{id,url,tmp}] */
const CARD_W=150, CARD_H=170, GAP=12, COLS=4, PADB=16, HEADH=104, STEPX=740, STEPY=170;
function fuCSS(){ const p=FX; return glyphCSS(p)+`
.${p}r{position:relative;height:100%;min-height:420px;display:flex;flex-direction:column;overflow:hidden;container-type:inline-size;color:var(--ink);font-family:var(--f-b);background:radial-gradient(120% 90% at 20% 0%,rgba(var(--acc-rgb),.07),transparent 60%),var(--bg)}
.${p}r *{box-sizing:border-box}
.${p}r button{font:inherit;color:inherit;cursor:pointer;-webkit-tap-highlight-color:transparent}
.${p}hud{position:relative;background:linear-gradient(180deg,rgba(14,25,40,.88),rgba(8,16,26,.9));border:1px solid var(--line2)}
.${p}hud::before,.${p}hud::after{content:"";position:absolute;width:10px;height:10px;pointer-events:none;border-color:var(--acc);border-style:solid}
.${p}hud::before{left:-1px;top:-1px;border-width:2px 0 0 2px}.${p}hud::after{right:-1px;bottom:-1px;border-width:0 2px 2px 0}
.${p}top{display:flex;align-items:center;gap:10px;padding:10px 12px;border-bottom:1px solid var(--line2);flex-wrap:wrap;background:rgba(3,6,11,.6)}
.${p}brand{display:flex;align-items:center;gap:10px;min-width:0;flex:1 1 260px}
.${p}brand .${p}bg{width:40px;height:40px;flex:none}
.${p}t1{font-family:var(--f-d);font-size:13px;letter-spacing:.16em;text-transform:uppercase;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.${p}t2{font-family:var(--f-m);font-size:10.5px;color:var(--muted);letter-spacing:.06em;margin-top:3px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.${p}meter{display:flex;flex-direction:column;gap:5px;min-width:150px;flex:0 1 190px}
.${p}meter b{font-family:var(--f-m);font-size:10px;letter-spacing:.12em;color:var(--muted);font-weight:400}
.${p}meter b em{font-style:normal;color:var(--done)}
.${p}bar{height:6px;background:rgba(var(--acc-rgb),.08);border:1px solid var(--line);position:relative;overflow:hidden}
.${p}bar i{position:absolute;left:0;top:0;bottom:0;background:linear-gradient(90deg,var(--acc),var(--done));box-shadow:0 0 10px rgba(var(--done-rgb),.6)}
.${p}seg{display:flex;border:1px solid var(--line2)}
.${p}seg button{min-height:40px;padding:0 12px;background:transparent;border:0;font-family:var(--f-m);font-size:10.5px;letter-spacing:.12em;color:var(--muted);display:flex;align-items:center;gap:6px}
.${p}seg button[aria-pressed=true]{background:rgba(var(--acc-rgb),.16);color:var(--acc)}
.${p}btn{min-height:42px;padding:0 14px;border:1px solid var(--line2);background:rgba(var(--acc-rgb),.06);font-family:var(--f-m);font-size:11px;letter-spacing:.1em;display:inline-flex;align-items:center;gap:8px;text-transform:uppercase;transition:background .2s,border-color .2s}
.${p}btn:hover{background:rgba(var(--acc-rgb),.14);border-color:var(--acc)}
.${p}btn.${p}pri{border-color:var(--acc);color:var(--acc);box-shadow:inset 0 0 14px rgba(var(--acc-rgb),.18)}
.${p}btn.${p}ok{border-color:var(--done);color:var(--done);background:rgba(var(--done-rgb),.08)}
.${p}btn .${p}n{font-family:var(--f-m);background:var(--done);color:#061006;padding:1px 6px;font-size:10px}
.${p}units{display:flex;gap:6px;padding:8px 12px;overflow-x:auto;border-bottom:1px solid var(--line);scrollbar-width:thin}
.${p}uc{flex:none;min-height:40px;display:flex;align-items:center;gap:8px;padding:0 10px;border:1px solid var(--line);background:rgba(10,19,31,.7);font-size:11px;color:var(--muted);white-space:nowrap}
.${p}uc b{font-family:var(--f-d);font-size:11px;color:var(--acc);font-weight:400}
.${p}uc i{font-style:normal;font-family:var(--f-m);font-size:9.5px;color:var(--done)}
.${p}uc:hover,.${p}uc.${p}act{border-color:var(--acc);color:var(--ink)}
.${p}main{flex:1;min-height:0;position:relative}
.${p}vp{position:absolute;inset:0;overflow:hidden;touch-action:none;cursor:grab;background:radial-gradient(60% 60% at 50% 40%,rgba(var(--acc-rgb),.05),transparent)}
.${p}vp.${p}drag{cursor:grabbing}
.${p}stage{position:absolute;left:0;top:0;transform-origin:0 0;will-change:transform;background-image:linear-gradient(rgba(var(--acc-rgb),.045) 1px,transparent 1px),linear-gradient(90deg,rgba(var(--acc-rgb),.045) 1px,transparent 1px);background-size:60px 60px}
.${p}stair{position:absolute;left:0;top:0;pointer-events:none;overflow:visible}
.${p}stair .${p}sl{fill:none;stroke:rgba(var(--acc-rgb),.35);stroke-width:2;stroke-dasharray:10 8;animation:${p}ants 2.4s linear infinite}
.${p}stair .${p}sg{fill:none;stroke:rgba(var(--acc-rgb),.12);stroke-width:10}
.${p}blk{position:absolute;padding:0 16px ${PADB}px}
.${p}uh{height:${HEADH}px;display:flex;gap:14px;align-items:center;cursor:pointer}
.${p}unum{width:66px;height:66px;flex:none;border:1px solid var(--acc);display:grid;place-items:center;font-family:var(--f-d);font-size:22px;color:var(--acc);background:rgba(var(--acc-rgb),.08);box-shadow:0 0 22px rgba(var(--acc-rgb),.35),inset 0 0 18px rgba(var(--acc-rgb),.2);clip-path:polygon(12px 0,100% 0,100% calc(100% - 12px),calc(100% - 12px) 100%,0 100%,0 12px)}
.${p}uname{font-family:var(--f-d);font-size:15px;letter-spacing:.12em;text-transform:uppercase;line-height:1.35}
.${p}usub{font-family:var(--f-m);font-size:10.5px;color:var(--muted);margin-top:4px;letter-spacing:.04em}
.${p}upas{display:flex;gap:4px;flex-wrap:wrap;margin-top:6px}
.${p}chip{font-family:var(--f-m);font-size:9.5px;letter-spacing:.06em;padding:2px 6px;border:1px solid var(--line2);color:var(--acc);background:rgba(var(--acc-rgb),.06)}
.${p}chip.${p}k{color:var(--done);border-color:rgba(var(--done-rgb),.5);background:rgba(var(--done-rgb),.06)}
.${p}chip.${p}w{color:var(--warn);border-color:var(--warn);background:rgba(255,92,122,.08)}
.${p}grid{display:grid;grid-template-columns:repeat(${COLS},${CARD_W}px);gap:${GAP}px}
.${p}card{width:${CARD_W}px;height:${CARD_H}px;display:flex;flex-direction:column;align-items:stretch;padding:10px 10px 9px;text-align:left;border:1px solid var(--line2);background:linear-gradient(180deg,rgba(14,25,40,.92),rgba(6,12,20,.92));position:relative;transition:border-color .2s,box-shadow .2s,transform .2s}
.${p}card::before{content:"";position:absolute;left:-1px;top:-1px;width:9px;height:9px;border:solid var(--acc);border-width:2px 0 0 2px}
.${p}card:hover{border-color:var(--acc);box-shadow:0 0 18px rgba(var(--acc-rgb),.25)}
.${p}card .${p}cg{height:92px;display:block;padding:4px 18px}
.${p}card .${p}cc{font-family:var(--f-m);font-size:9.5px;color:var(--faint);letter-spacing:.1em}
.${p}card .${p}cn{font-size:12.5px;line-height:1.2;margin-top:3px;font-weight:600;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden}
.${p}card .${p}ck{position:absolute;right:6px;top:6px;width:22px;height:22px;display:none;place-items:center;color:#061006;background:var(--done);box-shadow:0 0 10px rgba(var(--done-rgb),.7)}
.${p}card.${p}on{border-color:rgba(var(--done-rgb),.7);box-shadow:inset 0 0 22px rgba(var(--done-rgb),.12)}
.${p}card.${p}on .${p}ck{display:grid}
.${p}far .${p}card .${p}cn,.${p}far .${p}card .${p}cc{opacity:0}
.${p}far .${p}uname{font-size:40px;line-height:1.1}.${p}far .${p}usub,.${p}far .${p}upas{display:none}
.${p}zoom{position:absolute;right:12px;bottom:12px;display:flex;flex-direction:column;gap:6px;z-index:2}
.${p}zoom button{width:44px;height:44px;display:grid;place-items:center;border:1px solid var(--line2);background:rgba(8,16,26,.9);color:var(--acc)}
.${p}zl{font-family:var(--f-m);font-size:10px;color:var(--muted);text-align:center}
.${p}hint{position:absolute;left:12px;bottom:12px;font-family:var(--f-m);font-size:10px;color:var(--faint);letter-spacing:.08em;pointer-events:none;z-index:2}
.${p}list{position:absolute;inset:0;overflow:auto;padding:6px 12px 30px}
.${p}list .${p}lsec{margin:10px 0 18px}
.${p}list .${p}grid{grid-template-columns:repeat(auto-fill,minmax(132px,1fr))}
.${p}list .${p}card{width:auto}
.${p}list .${p}uh{height:auto;padding:10px 0}
.${p}list .${p}unum{width:52px;height:52px;font-size:17px}
.${p}ov{position:absolute;inset:0;z-index:5;background:rgba(3,6,11,.8);backdrop-filter:blur(6px);-webkit-backdrop-filter:blur(6px);display:flex;padding:14px;animation:${p}in .25s ease}
@keyframes ${p}in{from{opacity:0;transform:scale(.985)}to{opacity:1;transform:none}}
.${p}fx{margin:auto;width:100%;max-width:1120px;max-height:100%;overflow:auto;padding:16px;display:grid;grid-template-columns:minmax(0,1fr);gap:16px}
.${p}fx>*{min-width:0}
.${p}fh{display:flex;align-items:center;gap:8px;grid-column:1/-1}
.${p}fh .${p}ul{flex:1;min-width:0;font-family:var(--f-m);font-size:10.5px;letter-spacing:.12em;color:var(--muted);text-transform:uppercase;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.${p}ib{width:44px;height:44px;flex:none;display:grid;place-items:center;border:1px solid var(--line2);background:rgba(var(--acc-rgb),.05);color:var(--acc)}
.${p}ib:hover{border-color:var(--acc)}
.${p}fl{display:flex;flex-direction:column;gap:12px}
.${p}big{aspect-ratio:1;max-height:340px;width:100%;padding:28px;border:1px solid var(--line2);background:radial-gradient(circle at 50% 45%,rgba(var(--acc-rgb),.12),transparent 65%),repeating-linear-gradient(0deg,rgba(var(--acc-rgb),.035) 0 1px,transparent 1px 4px);position:relative}
.${p}big .${p}g{stroke-width:1.3}
.${p}big::after{content:"";position:absolute;inset:8px;border:1px dashed rgba(var(--acc-rgb),.18);pointer-events:none}
.${p}fn{font-family:var(--f-d);font-size:20px;letter-spacing:.08em;text-transform:uppercase;line-height:1.3}
.${p}fcode{font-family:var(--f-m);color:var(--acc);font-size:12px;letter-spacing:.14em}
.${p}sec{border-left:2px solid var(--acc);padding:2px 0 2px 12px}
.${p}sec h4{margin:0 0 6px;font-family:var(--f-m);font-size:10.5px;font-weight:400;letter-spacing:.16em;color:var(--acc);text-transform:uppercase}
.${p}sec p{margin:0;line-height:1.55;font-size:14px}
.${p}sec.${p}k{border-color:var(--done)}.${p}sec.${p}k h4{color:var(--done)}
.${p}sec.${p}m{border-color:var(--faint)}.${p}sec.${p}m h4{color:var(--muted)}
.${p}fr{display:flex;flex-direction:column;gap:16px}
.${p}act{padding:14px;display:flex;flex-direction:column;gap:12px}
.${p}tog{min-height:56px;width:100%;display:flex;align-items:center;gap:12px;padding:0 16px;border:1px solid var(--line2);background:rgba(var(--acc-rgb),.05);font-family:var(--f-d);font-size:12px;letter-spacing:.14em;text-transform:uppercase;text-align:left;line-height:1.4}
.${p}tog .${p}bx{width:26px;height:26px;border:1.5px solid var(--acc);display:grid;place-items:center;flex:none}
.${p}tog[aria-pressed=true]{border-color:var(--done);color:var(--done);background:rgba(var(--done-rgb),.1);box-shadow:0 0 22px rgba(var(--done-rgb),.18)}
.${p}tog[aria-pressed=true] .${p}bx{border-color:var(--done);background:var(--done);color:#061006}
.${p}ta{width:100%;min-height:84px;resize:vertical;background:rgba(3,6,11,.7);border:1px solid var(--line2);color:var(--ink);padding:10px 12px;font:14px/1.45 var(--f-b);outline:none}
.${p}ta:focus{border-color:var(--acc);box-shadow:0 0 0 3px rgba(var(--acc-rgb),.12)}
.${p}ta:disabled{opacity:.45}
.${p}lab{display:flex;justify-content:space-between;font-family:var(--f-m);font-size:10px;color:var(--muted);letter-spacing:.12em;text-transform:uppercase;margin-bottom:6px}
.${p}th{display:flex;gap:8px;flex-wrap:wrap}
.${p}tb{position:relative;width:86px;height:86px;border:1px solid var(--line2);background:#000 center/cover no-repeat}
.${p}tb.${p}tmp{border-color:var(--warn)}
.${p}tb .${p}tx{position:absolute;right:-1px;top:-1px;width:30px;height:30px;display:grid;place-items:center;background:rgba(3,6,11,.85);border:1px solid var(--line2);color:var(--warn)}
.${p}tb em{position:absolute;left:0;right:0;bottom:0;font:normal 8.5px var(--f-m);text-align:center;background:var(--warn);color:#fff;letter-spacing:.08em}
.${p}up{width:86px;height:86px;border:1px dashed var(--acc);display:flex;flex-direction:column;align-items:center;justify-content:center;gap:4px;font-family:var(--f-m);font-size:9px;letter-spacing:.1em;color:var(--acc);background:rgba(var(--acc-rgb),.04)}
.${p}pn{position:absolute;top:0;right:0;bottom:0;width:min(460px,100%);z-index:6;display:flex;flex-direction:column;border-left:1px solid var(--acc);background:rgba(5,10,17,.97);box-shadow:-20px 0 50px rgba(0,0,0,.6);animation:${p}sl .25s ease}
@keyframes ${p}sl{from{transform:translateX(40px);opacity:0}}
.${p}pnh{display:flex;align-items:center;gap:10px;padding:12px;border-bottom:1px solid var(--line2)}
.${p}pnb{flex:1;overflow:auto;padding:12px;display:flex;flex-direction:column;gap:14px}
.${p}cov{display:grid;grid-template-columns:repeat(14,1fr);gap:3px;align-items:end;height:60px}
.${p}cov div{background:rgba(var(--acc-rgb),.08);border:1px solid var(--line);position:relative;height:100%}
.${p}cov div i{position:absolute;left:0;right:0;bottom:0;background:var(--done);box-shadow:0 0 8px rgba(var(--done-rgb),.6)}
.${p}cov span{position:absolute;left:0;right:0;bottom:-15px;text-align:center;font:9px var(--f-m);color:var(--faint)}
.${p}pi{display:flex;gap:10px;align-items:flex-start;padding:8px;border:1px solid var(--line);background:rgba(10,19,31,.6);width:100%;text-align:left}
.${p}pi:hover{border-color:var(--acc)}
.${p}pi .${p}pg{width:44px;height:44px;flex:none}
.${p}pi b{display:block;font-size:13px}
.${p}pi small{display:block;color:var(--muted);font-size:12px;margin-top:2px;line-height:1.35}
.${p}pu{font-family:var(--f-m);font-size:10px;letter-spacing:.14em;color:var(--acc);text-transform:uppercase;margin:6px 0 2px}
.${p}res{white-space:pre-wrap;font:12.5px/1.55 var(--f-b);background:rgba(3,6,11,.7);border:1px solid var(--line2);padding:12px;max-height:260px;overflow:auto}
.${p}empty{color:var(--muted);font-size:13px;line-height:1.5;padding:12px;border:1px dashed var(--line2)}
@container (min-width:820px){
 .${p}fx{grid-template-columns:minmax(280px,380px) minmax(0,1fr)}
 .${p}fn{font-size:24px}
}
@container (max-width:560px){
 .${p}brand{flex-basis:100%}
 .${p}meter{flex:1 1 120px}
 .${p}top .${p}btn span.${p}lt{display:none}
 .${p}t1{font-size:11.5px}
 .${p}big{max-height:240px;padding:18px}
 .${p}fn{font-size:17px}
 .${p}ov{padding:0}
 .${p}fx{padding:12px}
}
`; }

function fuNorm(o){ o=o||{}; return { elegidos:Array.isArray(o.elegidos)?o.elegidos.filter(id=>FC_BY[id]):[], notas:Object.assign({},o.notas||{}), bocetos:Object.assign({},o.bocetos||{}), resumen:o.resumen||'',
  estudios:Array.isArray(o.estudios)?o.estudios.filter(e=>e&&e.id&&Array.isArray(e.objetos)):[] }; }
function fuSubst(s,ctx){
  const t = ctx.tipo && ctx.tipo.n ? 'tu '+ctx.tipo.n.toLowerCase() : 'tu proyecto';
  const a = ctx.area ? Math.round(ctx.area).toLocaleString('es-EC') : '—';
  const c = (ctx.P && ctx.P.loc && (ctx.P.loc.ciudad||ctx.P.loc.canton)) || 'tu sitio';
  return s.replace(/\{T\}/g,t).replace(/\{A\}/g,a).replace(/\{C\}/g,c);
}
function fuResumen(st,ctx){
  const P=ctx.P||{}; const sel=FU.map(u=>({u,cs:u.cs.filter(c=>st.elegidos.includes(c.id))})).filter(x=>x.cs.length);
  const est=(st.estudios||[]);
  if(!sel.length&&!est.length) return '';
  const n=sel.reduce((a,x)=>a+x.cs.length,0);
  let t=`LENGUAJE FORMAL — ${P.nombre||'Proyecto'}${ctx.tipo?' ('+ctx.tipo.n+')':''}${P.loc&&P.loc.ciudad?', '+P.loc.ciudad+(P.loc.provincia?', '+P.loc.provincia:''):''}\n`;
  if(sel.length){ t+=`El lenguaje formal del proyecto se construye con ${n} herramienta${n>1?'s':''} de diseño agrupada${n>1?'s':''} en ${sel.length} ámbito${sel.length>1?'s':''} de los Fundamentos del diseño (Ching, Forma, espacio y orden; Wong, Fundamentos del diseño; teoría de la Gestalt):\n`;
  sel.forEach(x=>{ t+=`• ${x.u.n}: `+x.cs.map(c=>c.n+(st.notas[c.id]&&st.notas[c.id].trim()?' — '+st.notas[c.id].trim():'')).join('; ')+'.\n'; });
  const refs=sel.flatMap(x=>x.cs).slice(0,4).map(c=>c.ej.split(' (')[0]).join('; ');
  t+=`Referentes de obra: ${refs}.`; }
  if(est.length){ t+=`${sel.length?'\n':''}Estudios de forma 3D (maquetas de estudio, Taller de forma): `+est.map(e=>`“${e.nombre||'Estudio'}” (${(e.objetos||[]).length} volúmenes${(e.conceptos||[]).filter(i=>FC_BY[i]).length?'; '+e.conceptos.filter(i=>FC_BY[i]).map(i=>FC_BY[i].n.toLowerCase()).join(', '):''})`).join('; ')+'.'; }
  return t;
}

/* ===================== FUNDAMENTOS · TALLER DE FORMA 3D ===================== */
/* three.js r128 se carga bajo demanda solo al abrir el taller. Coordenadas del usuario (UI):
   X = Este, Y = Norte, Z = altura (m). En three: (x, z, -y). Pivote de cada volumen = centro de su base. */
const THREE_URL='https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js';
let threeP=null;
function loadThree(){
  if(window.THREE&&window.THREE.WebGLRenderer) return Promise.resolve(window.THREE);
  if(threeP) return threeP;
  threeP=new Promise((res,rej)=>{
    const old=document.querySelector('script[data-dion-three]'); if(old) old.remove();
    const s=document.createElement('script'); s.src=THREE_URL; s.async=true; s.crossOrigin='anonymous'; s.setAttribute('data-dion-three','1');
    const to=setTimeout(()=>rej(new Error('tiempo agotado')),20000);
    s.onload=()=>{ clearTimeout(to); window.THREE&&window.THREE.WebGLRenderer?res(window.THREE):rej(new Error('THREE no disponible')); };
    s.onerror=()=>{ clearTimeout(to); rej(new Error('sin conexión')); };
    document.head.appendChild(s);
  });
  threeP.catch(()=>{ threeP=null; });
  return threeP;
}
/* primitivas: [tipo, nombre, tamaño por defecto [x,y,z] m, conceptos, icono 24px] */
const TPR=[
 ['punto','Punto',[.4,.4,.4],['punto'],'<circle cx="12" cy="12" r="3.2"/><path d="M12 3v3M12 18v3M3 12h3M18 12h3" opacity=".5"/>'],
 ['linea','Línea',[6,.08,.08],['linea','lin-hori'],'<path d="M4 18L20 6"/><circle cx="4" cy="18" r="1.8"/><circle cx="20" cy="6" r="1.8"/>'],
 ['plano','Plano',[6,6,.05],['plano','plano-base'],'<path d="M2.5 15l8.5-5 10.5 3-8.5 5z"/>'],
 ['cubo','Cubo · prisma',[3,3,3],['cubo','volumen'],'<path d="M12 3l8 4.5v9L12 21l-8-4.5v-9zM4 7.5l8 4.5 8-4.5M12 12v9"/>'],
 ['esfera','Esfera',[3,3,3],['esfera'],'<circle cx="12" cy="12" r="8"/><ellipse cx="12" cy="12" rx="8" ry="3"/>'],
 ['cilindro','Cilindro',[2.4,2.4,4],['cilindro'],'<ellipse cx="12" cy="6" rx="6" ry="2.4"/><path d="M6 6v12a6 2.4 0 0012 0V6"/>'],
 ['cono','Cono',[3,3,4],['cono'],'<path d="M12 3L6 18a6 2.4 0 0012 0z"/>'],
 ['piramide','Pirámide',[4,4,3],['piramide'],'<path d="M12 3L3 16l8 5 10-6zM12 3l-1 18"/>'],
 ['prisma3','Prisma triangular',[4,6,2.5],['triangulo','volumen'],'<path d="M3 18L8 9l5 9zM8 9l8-3 5 9-8 3"/>'],
 ['toro','Toroide',[5,5,1.2],['circulo'],'<ellipse cx="12" cy="12" rx="9.5" ry="5"/><ellipse cx="12" cy="11.5" rx="3.6" ry="1.5"/>'],
 ['tetra','Tetraedro',[3,3,3],['platonicos'],'<path d="M12 3L3 19h18zM12 3l2 10-11 6M14 13l7 6"/>'],
 ['octa','Octaedro',[3,3,3],['platonicos'],'<path d="M12 2L4 12l8 10 8-10zM4 12l6 2 10-2M12 2l-2 12 2 8"/>'],
 ['icosa','Icosaedro',[3,3,3],['platonicos'],'<path d="M12 2l8.5 5v10L12 22l-8.5-5V7zM12 7l4.5 7.5h-9zM12 2v5M20.5 7l-4 7.5M3.5 7l4 7.5M12 22l-4.5-7.5M12 22l4.5-7.5"/>'],
 ['muro','Muro',[6,.25,3],['plano-vert'],'<path d="M3 17V9l13-5v8zM3 17l5 2 13-5V6l-5-2M16 12l5 2"/>'],
 ['arco','Arco',[4,.6,4],['aberturas'],'<path d="M4 20V5h16v15h-4v-6a4 4 0 00-8 0v6z"/>']
];
const TPR_BY=Object.fromEntries(TPR.map(t=>[t[0],t]));
const TMAT=[['maqueta','Maqueta','#F2F0EB'],['vidrio','Vidrio','#9FDCFF'],['madera','Madera','#B07A45'],['hormigon','Hormigón','#9A9A96'],['color','Color','#E07A3F']];
const TW={ objs:[], sel:[], hist:[], hi:-1, id:null, nombre:'', conc:[], used:[], dirty:false, mode:'mover', multi:false, view:'axo', cam:null,
  snap:1, iman:true, maqueta:true, sol:true, mes:(new Date()).getMonth(), hora:12, humano:true, xray:false, csg:false, tab:'obj', sheet:true,
  ops:{n:4,d:5,eje:'x',rn:6}, q:'', drawer:false };
const tUid=()=>'o'+Date.now().toString(36)+Math.random().toString(36).slice(2,6);
const tR=v=>Math.round(v*1000)/1000;
const tClone=o=>JSON.parse(JSON.stringify(o));
function tNorm(o){ const d=TPR_BY[o&&o.tipo]; if(!d) return null; const a=(v,def)=>Array.isArray(v)&&v.length===3&&v.every(x=>isFinite(+x))?v.map(Number):def.slice();
  return { id:o.id||tUid(), tipo:o.tipo, pos:a(o.pos,[0,0,0]), rot:a(o.rot,[0,0,0]), esc:a(o.esc,d[2]).map(x=>Math.max(.02,x)), color:/^#[0-9a-f]{6}$/i.test(o.color||'')?o.color:'#F2F0EB',
    mat:TMAT.some(m=>m[0]===o.mat)?o.mat:'maqueta', vacio:!!o.vacio, grupo:o.grupo||null }; }
function tObj(tipo,pos,esc,extra){ return Object.assign(tNorm({tipo,pos:pos||[0,0,0],esc:esc||TPR_BY[tipo][2]}),extra||{}); }
/* plantillas de organización (Ching cap. 4) */
const TPL={
 central:{n:'Central',c:['org-central','centralizada'],f:()=>{ const o=[tObj('cilindro',[0,0,0],[9,9,7])]; for(let i=0;i<4;i++){ const a=i*Math.PI/2; o.push(tObj('cubo',[Math.cos(a)*10,Math.sin(a)*10,0],[5,5,3.5],{rot:[0,0,i*90]})); } return o; }},
 lineal:{n:'Lineal',c:['org-lineal','lineal'],f:()=>{ const o=[tObj('muro',[0,-3.2,0],[40,.3,4])]; for(let i=0;i<6;i++) o.push(tObj('cubo',[-15+i*6,0,0],[4.5,5,3+(i%2)*1.5])); o.push(tObj('cilindro',[22,0,0],[5,5,6])); return o; }},
 radial:{n:'Radial',c:['org-radial','radial'],f:()=>{ const o=[tObj('octa',[0,0,0],[6,6,6])]; for(let i=0;i<5;i++){ const a=i*2*Math.PI/5; o.push(tObj('cubo',[Math.cos(a)*9,Math.sin(a)*9,0],[10,3.5,3],{rot:[0,0,tR(a*180/Math.PI)]})); } return o; }},
 agrupada:{n:'Agrupada',c:['org-agrupada','agrupada','proximidad'],f:()=>[[0,0,5,6,4],[6,1,4,4,3],[2,7,6,4,5],[-6,4,4,5,3],[-5,-4,5,4,6],[5,-6,4,5,3.5],[-1,-8,3,3,2.5]].map(b=>tObj('cubo',[b[0],b[1],0],[b[2],b[3],b[4]]))},
 trama:{n:'En trama',c:['org-trama','trama'],f:()=>{ const o=[]; for(let i=0;i<4;i++) for(let j=0;j<4;j++) o.push(tObj('cilindro',[-9+i*6,-9+j*6,0],[.45,.45,4])); o.push(tObj('plano',[0,0,4],[20,20,.3])); o.push(tObj('cubo',[-6,-6,0],[5,5,3])); o.push(tObj('cubo',[6,0,0],[5,11,3])); return o; }}
};
/* ---------- CSG mínima (BSP, adaptada de csg.js de E. Wallace, MIT) ---------- */
const CSG=(function(){
  const EPS=1e-5;
  class V{ constructor(x,y,z){ this.x=x; this.y=y; this.z=z; } clone(){ return new V(this.x,this.y,this.z); } neg(){ return new V(-this.x,-this.y,-this.z); }
    plus(a){ return new V(this.x+a.x,this.y+a.y,this.z+a.z); } minus(a){ return new V(this.x-a.x,this.y-a.y,this.z-a.z); } times(k){ return new V(this.x*k,this.y*k,this.z*k); }
    dot(a){ return this.x*a.x+this.y*a.y+this.z*a.z; } lerp(a,t){ return this.plus(a.minus(this).times(t)); } len(){ return Math.sqrt(this.dot(this)); } unit(){ return this.times(1/(this.len()||1)); }
    cross(a){ return new V(this.y*a.z-this.z*a.y,this.z*a.x-this.x*a.z,this.x*a.y-this.y*a.x); } }
  class Vx{ constructor(p,n){ this.pos=p; this.normal=n; } clone(){ return new Vx(this.pos.clone(),this.normal.clone()); } flip(){ this.normal=this.normal.neg(); } interpolate(o,t){ return new Vx(this.pos.lerp(o.pos,t),this.normal.lerp(o.normal,t)); } }
  class Pl{ constructor(n,w){ this.normal=n; this.w=w; } static from(a,b,c){ const n=b.minus(a).cross(c.minus(a)).unit(); return new Pl(n,n.dot(a)); } clone(){ return new Pl(this.normal.clone(),this.w); } flip(){ this.normal=this.normal.neg(); this.w=-this.w; }
    split(poly,cf,cb,front,back){ let pt=0; const ty=[];
      for(const v of poly.vertices){ const t=this.normal.dot(v.pos)-this.w; const k=t<-EPS?2:t>EPS?1:0; pt|=k; ty.push(k); }
      if(pt===0) (this.normal.dot(poly.plane.normal)>0?cf:cb).push(poly);
      else if(pt===1) front.push(poly); else if(pt===2) back.push(poly);
      else { const f=[],b=[]; const n=poly.vertices.length;
        for(let i=0;i<n;i++){ const j=(i+1)%n, ti=ty[i], tj=ty[j], vi=poly.vertices[i], vj=poly.vertices[j];
          if(ti!==2) f.push(vi); if(ti!==1) b.push(ti!==2?vi.clone():vi);
          if((ti|tj)===3){ const t=(this.w-this.normal.dot(vi.pos))/this.normal.dot(vj.pos.minus(vi.pos)); const v=vi.interpolate(vj,t); f.push(v); b.push(v.clone()); } }
        if(f.length>=3) front.push(new Po(f)); if(b.length>=3) back.push(new Po(b)); } } }
  class Po{ constructor(vs){ this.vertices=vs; this.plane=Pl.from(vs[0].pos,vs[1].pos,vs[2].pos); } clone(){ return new Po(this.vertices.map(v=>v.clone())); } flip(){ this.vertices.reverse().forEach(v=>v.flip()); this.plane.flip(); } }
  class N{ constructor(ps){ this.plane=null; this.front=null; this.back=null; this.polygons=[]; if(ps) this.build(ps); }
    invert(){ this.polygons.forEach(p=>p.flip()); if(this.plane) this.plane.flip(); if(this.front) this.front.invert(); if(this.back) this.back.invert(); const t=this.front; this.front=this.back; this.back=t; }
    clipPolygons(ps){ if(!this.plane) return ps.slice(); let f=[],b=[]; ps.forEach(p=>this.plane.split(p,f,b,f,b)); if(this.front) f=this.front.clipPolygons(f); b=this.back?this.back.clipPolygons(b):[]; return f.concat(b); }
    clipTo(bsp){ this.polygons=bsp.clipPolygons(this.polygons); if(this.front) this.front.clipTo(bsp); if(this.back) this.back.clipTo(bsp); }
    all(){ let p=this.polygons.slice(); if(this.front) p=p.concat(this.front.all()); if(this.back) p=p.concat(this.back.all()); return p; }
    build(ps){ if(!ps.length) return; if(!this.plane) this.plane=ps[0].plane.clone(); const f=[],b=[]; ps.forEach(p=>this.plane.split(p,this.polygons,this.polygons,f,b));
      if(f.length){ if(!this.front) this.front=new N(); this.front.build(f); } if(b.length){ if(!this.back) this.back=new N(); this.back.build(b); } } }
  const cl=ps=>ps.map(p=>p.clone());
  return { V, Vx, Po,
    subtract(A,B){ const a=new N(cl(A)), b=new N(cl(B)); a.invert(); a.clipTo(b); b.clipTo(a); b.invert(); b.clipTo(a); b.invert(); a.build(b.all()); a.invert(); return a.all(); },
    intersect(A,B){ const a=new N(cl(A)), b=new N(cl(B)); a.invert(); b.clipTo(a); b.invert(); a.clipTo(b); b.clipTo(a); a.build(b.all()); a.invert(); return a.all(); } };
})();

function tCSS(p){ const w=p+'w-'; return `
.${p}t3d{border-color:#FF4FD8;color:#FFD6F6;background:linear-gradient(90deg,rgba(255,79,216,.18),rgba(var(--acc-rgb),.16));box-shadow:0 0 16px rgba(255,79,216,.35),inset 0 0 12px rgba(var(--acc-rgb),.2);animation:${p}t3dp 2.6s ease-in-out infinite}
.${p}t3d:hover{border-color:var(--acc)}
@keyframes ${p}t3dp{50%{box-shadow:0 0 26px rgba(255,79,216,.6),inset 0 0 16px rgba(var(--acc-rgb),.35)}}
.${w}r{position:absolute;inset:0;z-index:8;display:grid;grid-template-columns:78px minmax(0,1fr) 300px;grid-template-rows:auto minmax(0,1fr);background:var(--bg);animation:${p}in .2s ease}
.${w}hd{grid-column:1/-1;display:flex;align-items:center;gap:6px;padding:6px 8px;border-bottom:1px solid var(--line2);background:linear-gradient(90deg,rgba(255,79,216,.08),rgba(3,6,11,.7) 40%)}
.${w}tt{display:flex;align-items:center;gap:8px;min-width:0;flex:0 1 auto}
.${w}tt svg{flex:none;color:#FF4FD8}
.${w}nm{flex:1 1 120px;min-width:0;min-height:44px;display:flex;align-items:center;gap:6px;padding:0 10px;border:1px dashed var(--line2);background:rgba(var(--acc-rgb),.04);font:12px var(--f-m);letter-spacing:.06em;text-align:left;overflow:hidden}
.${w}nm span{white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.${w}ni2{flex:1 1 120px;min-width:0;min-height:44px;background:rgba(3,6,11,.9);border:1px solid var(--acc);color:var(--ink);padding:0 10px;font:13px var(--f-m);outline:none}
.${w}nm i{font-style:normal;color:var(--warn);display:none}.${w}nm.${w}dt i{display:inline}
.${w}hd .${p}ib.${w}ok{color:var(--done);border-color:rgba(var(--done-rgb),.6)}
.${p}ib:disabled{opacity:.35}
.${w}pal{overflow-y:auto;overflow-x:hidden;border-right:1px solid var(--line2);padding:6px;display:flex;flex-direction:column;gap:5px;background:rgba(5,10,17,.7);scrollbar-width:thin}
.${w}pb{flex:none;min-height:58px;width:100%;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:2px;border:1px solid var(--line);background:rgba(10,19,31,.75);color:var(--acc);padding:4px 2px}
.${w}pb span{font:8.5px/1.1 var(--f-m);letter-spacing:.04em;color:var(--muted);text-align:center;text-transform:uppercase}
.${w}pb:hover,.${w}pb:active{border-color:var(--acc);box-shadow:0 0 12px rgba(var(--acc-rgb),.3)}
.${w}cv{position:relative;min-width:0;min-height:0;overflow:hidden;background:radial-gradient(70% 70% at 50% 40%,#0a1a2a,#04080e)}
.${w}cv canvas{position:absolute;inset:0;width:100%!important;height:100%!important;touch-action:none;display:block;outline:none}
.${w}ms{position:absolute;left:8px;top:8px;display:flex;flex-direction:column;gap:4px;z-index:2}
.${w}vs{position:absolute;right:8px;top:8px;display:flex;flex-direction:column;gap:4px;z-index:2}
.${w}ch{min-width:44px;min-height:40px;padding:0 8px;display:flex;align-items:center;justify-content:center;gap:5px;border:1px solid var(--line2);background:rgba(5,10,17,.86);font:9.5px var(--f-m);letter-spacing:.1em;color:var(--muted);text-transform:uppercase}
.${w}ch[aria-pressed=true]{color:var(--acc);border-color:var(--acc);background:rgba(var(--acc-rgb),.16);box-shadow:0 0 12px rgba(var(--acc-rgb),.25)}
.${w}ch.${w}mg[aria-pressed=true]{color:#FFD6F6;border-color:#FF4FD8;background:rgba(255,79,216,.16)}
.${w}hn{position:absolute;left:8px;bottom:8px;right:250px;font:9.5px/1.4 var(--f-m);color:var(--faint);letter-spacing:.06em;pointer-events:none;z-index:2;text-shadow:0 1px 2px #000}
.${w}sl{position:absolute;right:8px;bottom:8px;max-width:240px;line-height:1.4;font:9.5px var(--f-m);color:#FFD27A;letter-spacing:.06em;pointer-events:none;z-index:2;text-align:right;text-shadow:0 1px 2px #000}
.${w}msg{position:absolute;inset:0;display:flex;align-items:center;justify-content:center;z-index:3;padding:20px;text-align:center}
.${w}msg>div{max-width:420px;padding:18px;display:flex;flex-direction:column;gap:12px;align-items:center}
.${w}msg b{font-family:var(--f-d);font-size:12px;letter-spacing:.14em;text-transform:uppercase}
.${w}msg p{margin:0;color:var(--muted);font-size:13px;line-height:1.5}
.${w}spin{width:46px;height:46px;border:2px solid rgba(var(--acc-rgb),.2);border-top-color:var(--acc);border-radius:50%;animation:${w}rot 1s linear infinite}
@keyframes ${w}rot{to{transform:rotate(360deg)}}
.${w}in{display:flex;flex-direction:column;min-height:0;border-left:1px solid var(--line2);background:rgba(5,10,17,.92)}
.${w}tabs{display:flex;border-bottom:1px solid var(--line2);flex:none}
.${w}tabs button{flex:1;min-height:44px;border:0;background:transparent;font:9.5px var(--f-m);letter-spacing:.1em;color:var(--muted);text-transform:uppercase;border-bottom:2px solid transparent;padding:0 4px}
.${w}tabs button[aria-pressed=true]{color:var(--acc);border-bottom-color:var(--acc);background:rgba(var(--acc-rgb),.07)}
.${w}bd{flex:1;overflow:auto;padding:10px;display:flex;flex-direction:column;gap:12px;scrollbar-width:thin}
.${w}h{font:10px var(--f-m);letter-spacing:.14em;color:var(--acc);text-transform:uppercase;display:flex;justify-content:space-between;align-items:center;gap:6px;margin-bottom:6px}
.${w}h small{color:var(--faint);font-size:9px;letter-spacing:.06em}
.${w}g3{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:5px}
.${w}g2{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:5px}
.${w}f{display:flex;flex-direction:column;gap:2px;min-width:0}
.${w}f span{font:9px var(--f-m);color:var(--muted);letter-spacing:.08em}
.${w}f input,.${w}f select{width:100%;min-width:0;min-height:40px;background:rgba(3,6,11,.8);border:1px solid var(--line2);color:var(--ink);padding:0 8px;font:13px var(--f-m);outline:none;border-radius:0}
.${w}f input:focus{border-color:var(--acc)}
.${w}b{min-height:42px;padding:0 10px;border:1px solid var(--line2);background:rgba(var(--acc-rgb),.06);font:10px var(--f-m);letter-spacing:.08em;text-transform:uppercase;display:inline-flex;align-items:center;justify-content:center;gap:6px;text-align:center;line-height:1.2}
.${w}b:hover{border-color:var(--acc)}
.${w}b[aria-pressed=true]{border-color:var(--acc);color:var(--acc);background:rgba(var(--acc-rgb),.16)}
.${w}b.${w}rd{border-color:rgba(255,92,122,.6);color:#FF9FB2}
.${w}b.${w}rd[aria-pressed=true]{background:rgba(255,92,122,.2);color:#fff;border-color:var(--warn);box-shadow:0 0 14px rgba(255,92,122,.35)}
.${w}b.${w}gr{border-color:rgba(var(--done-rgb),.6);color:var(--done)}
.${w}b:disabled{opacity:.35}
.${w}row{display:flex;gap:5px;flex-wrap:wrap}
.${w}row>.${w}b{flex:1 1 auto}
.${w}g3>.${w}b{font-size:9px;letter-spacing:.03em;padding:0 3px;min-width:0;overflow-wrap:anywhere}
.${w}sw{display:flex;gap:5px;flex-wrap:wrap}
.${w}sw button{flex:1 1 52px;min-height:46px;border:1px solid var(--line2);background:rgba(10,19,31,.8);display:flex;flex-direction:column;align-items:center;justify-content:center;gap:3px;font:8.5px var(--f-m);letter-spacing:.06em;color:var(--muted);text-transform:uppercase;position:relative}
.${w}sw button i{width:18px;height:12px;border:1px solid rgba(255,255,255,.3)}
.${w}sw button[aria-pressed=true]{border-color:var(--acc);color:var(--acc)}
.${w}sw input[type=color]{position:absolute;inset:0;opacity:0;width:100%;height:100%;cursor:pointer}
.${w}card{border:1px solid var(--line);padding:9px;background:rgba(10,19,31,.6)}
.${w}em{color:var(--muted);font-size:12.5px;line-height:1.5;padding:10px;border:1px dashed var(--line2)}
.${w}tg{display:flex;flex-wrap:wrap;gap:5px}
.${w}cp{min-height:36px;padding:0 9px;border:1px solid var(--line2);background:rgba(var(--acc-rgb),.05);font:11px var(--f-b);display:inline-flex;align-items:center;gap:5px;color:var(--ink)}
.${w}cp b{font:9px var(--f-m);color:var(--faint);font-weight:400}
.${w}cp.${w}on{border-color:var(--done);color:var(--done);background:rgba(var(--done-rgb),.08)}
.${w}cp.${w}sg{border-style:dashed;color:#FFD6F6;border-color:rgba(255,79,216,.6)}
.${w}tag{font:9px var(--f-m);letter-spacing:.08em;padding:2px 6px;border:1px solid var(--warn);color:var(--warn)}
.${w}dr{position:absolute;top:0;right:0;bottom:0;width:min(400px,100%);z-index:6;display:flex;flex-direction:column;border-left:1px solid #FF4FD8;background:rgba(5,10,17,.97);box-shadow:-20px 0 50px rgba(0,0,0,.6);animation:${p}sl .25s ease}
.${w}dr[hidden],.${w}xm[hidden]{display:none}
.${w}es{display:grid;grid-template-columns:96px minmax(0,1fr);gap:8px;padding:8px;border:1px solid var(--line);background:rgba(10,19,31,.7)}
.${w}es.${w}cur{border-color:#FF4FD8}
.${w}es img,.${w}es .${w}ni{width:96px;height:62px;object-fit:cover;border:1px solid var(--line2);background:#06101a;display:block}
.${w}es b{display:block;font-size:13px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.${w}es small{display:block;font:9.5px var(--f-m);color:var(--muted);margin-top:2px}
.${w}es .${w}row{grid-column:1/-1}
.${w}xm{position:absolute;right:8px;top:54px;z-index:7;display:flex;flex-direction:column;gap:6px;padding:10px;min-width:220px}
@container (max-width:759px){
 .${w}r{grid-template-columns:minmax(0,1fr);grid-template-rows:auto minmax(0,1fr) auto 40%}
 .${w}r.${w}shc{grid-template-rows:auto minmax(0,1fr) auto auto}
 .${w}cv{grid-row:2}.${w}pal{grid-row:3}.${w}in{grid-row:4}
 .${w}tt .${w}tx{display:none}
 .${w}pal{flex-direction:row;overflow-x:auto;overflow-y:hidden;border-right:0;border-top:1px solid var(--line2);padding:5px}
 .${w}pb{width:62px;min-height:54px}
 .${w}in{border-left:0;border-top:1px solid #FF4FD8;min-height:0}
 .${w}in.${w}cl .${w}bd{display:none}
 .${w}xm{top:50px}
 .${w}ms .${w}ch span{display:none}
 .${w}ch{min-width:40px;min-height:38px;padding:0 6px;font-size:8.5px;letter-spacing:.06em}
 .${w}ms,.${w}vs{gap:3px;top:6px}.${w}ms{left:6px}.${w}vs{right:6px}
 .${w}hn{right:8px;bottom:8px}
 .${w}sl{top:8px;bottom:auto;left:56px;right:auto;max-width:calc(100% - 140px);text-align:left;font-size:8.5px}
}
@container (max-width:420px){
 .${w}hd{gap:4px;padding:5px}
 .${w}hd .${p}ib{width:40px;height:44px}
 .${w}nm{padding:0 6px;font-size:11px}
}`; }

/* abre el taller dentro de host; api={st, save, onChange, onClose} */
function fuTaller(host, ctx, api){
  const p=FX, w=p+'w-', esc=ctx.esc, st=api.st;
  let T=null, alive=true, ren=null, scene, camP, camO, cam, ray, gzG, gzM, gzS, gzR, selHelp, human, sun, grid, grid5, ground, axes, raf=0, ro=null, isec=null;
  const meshes=new Map(), geoC={}, edgeC={}, matC={}, lineM={};
  let csgList=[], csgKey='', csgT=0;
  const root=document.createElement('div'); root.className=w+'r'; host.appendChild(root);
  const lat=parseFloat(ctx.P&&ctx.P.loc&&ctx.P.loc.lat); const LAT=isFinite(lat)?lat:-2.17;
  const narrow=()=>root.clientWidth<760;
  const I=(n,s)=>ico(n,s);
  const cube='<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"><path d="M12 2.5l8.5 4.8v9.4L12 21.5l-8.5-4.8V7.3z"/><path d="M3.5 7.3L12 12l8.5-4.7M12 12v9.5"/><path d="M8 4.8l8.5 4.7" opacity=".5"/></svg>';
  const sv=(d,s)=>`<svg viewBox="0 0 24 24" width="${s||22}" height="${s||22}" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${d}</svg>`;
  if(!TW.hist.length){ TW.hist=[JSON.stringify(TW.objs)]; TW.hi=0; }

  root.innerHTML=`
  <div class="${w}hd">
    <button class="${p}ib" data-t="close" aria-label="Volver a Fundamentos">${I('prev')}</button>
    <div class="${w}tt">${cube}<div class="${w}tx"><div class="${p}t1" style="font-size:11.5px">Taller de forma 3D</div><div class="${p}t2" data-q="info">—</div></div></div>
    <button class="${w}nm" data-t="rename" aria-label="Renombrar estudio"><span data-q="name"></span><i>●</i></button>
    <button class="${p}ib" data-t="undo" aria-label="Deshacer (Ctrl+Z)">${I('undo')}</button>
    <button class="${p}ib" data-t="redo" aria-label="Rehacer (Ctrl+Y)">${I('redo')}</button>
    <button class="${p}ib" data-t="drawer" aria-label="Mis estudios">${I('list')}</button>
    <button class="${p}ib ${w}ok" data-t="save" aria-label="Guardar estudio">${I('save')}</button>
    <button class="${p}ib" data-t="xm" aria-label="Exportar">${I('dl')}</button>
  </div>
  <div class="${w}pal" data-q="pal">${TPR.map(t=>`<button class="${w}pb" data-t="add" data-v="${t[0]}" title="Agregar ${esc(t[1])}">${sv(t[4])}<span>${esc(t[1].split(' ·')[0])}</span></button>`).join('')}</div>
  <div class="${w}cv" data-q="cv">
    <div class="${w}ms" data-q="ms">
      ${[['sel','SELEC','<path d="M5 3l12 8-5 1 3 7-2 1-3-7-4 4z"/>'],['mover','MOVER','<path d="M12 3v18M3 12h18M12 3l-3 3M12 3l3 3M12 21l-3-3M12 21l3-3M3 12l3-3M3 12l3 3M21 12l-3-3M21 12l-3 3"/>'],['rotar','ROTAR','<path d="M20 12a8 8 0 11-3-6.2"/><path d="M20 3v4h-4"/>'],['escalar','ESCALA','<path d="M4 20h8v-8H4zM12 12l8-8M14 4h6v6"/>']].map(m=>`<button class="${w}ch" data-t="mode" data-v="${m[0]}" aria-pressed="false" title="${m[1]}">${sv(m[2],16)}<span>${m[1]}</span></button>`).join('')}
      <button class="${w}ch ${w}mg" data-t="multi" aria-pressed="false" title="Selección múltiple">${sv('<rect x="3" y="3" width="11" height="11"/><rect x="10" y="10" width="11" height="11"/>',16)}<span>MULTI</span></button>
    </div>
    <div class="${w}vs">${[['planta','PLANTA'],['alzado','ALZADO'],['axo','AXO'],['persp','PERSP']].map(v=>`<button class="${w}ch" data-t="view" data-v="${v[0]}" aria-pressed="false">${v[1]}</button>`).join('')}<button class="${w}ch" data-t="fit" aria-label="Encuadrar">${I('fit',16)}</button></div>
    <div class="${w}sl" data-q="sunl"></div>
    <div class="${w}hn" data-q="hint"></div>
    <div class="${w}msg" data-q="msg"><div class="${p}hud"><div class="${w}spin"></div><b>Cargando motor 3D</b><p>three.js r128 · se descarga solo la primera vez</p></div></div>
  </div>
  <div class="${w}in${TW.sheet?'':' '+w+'cl'}" data-q="ins">
    <div class="${w}tabs">${[['obj','Objeto'],['ops','Operar'],['esc','Escena'],['con','Conceptos']].map(t=>`<button data-t="tab" data-v="${t[0]}" aria-pressed="false">${t[1]}</button>`).join('')}</div>
    <div class="${w}bd" data-q="bd"></div>
  </div>
  <aside class="${w}dr" data-q="dr" hidden></aside>
  <div class="${w}xm ${p}hud" data-q="xm" hidden>
    <div class="${w}h">Exportar estudio</div>
    <button class="${w}b" data-t="png">${I('img',16)} Imagen PNG</button>
    <button class="${w}b" data-t="obj">${cube} Modelo .OBJ (Revit · SketchUp · Rhino)</button>
    <small style="font:9.5px/1.4 var(--f-m);color:var(--muted)">OBJ en metros, eje Z arriba. Revit no importa .OBJ directo: ábrelo en SketchUp o Rhino y llévalo a Revit como .SKP/.3DM (Insertar → Importar CAD).</small>
  </div>`;
  const q=s=>root.querySelector(`[data-q="${s}"]`);
  const cvw=q('cv'), bd=q('bd');

  /* ---------- estado / historia ---------- */
  const byId=id=>TW.objs.find(o=>o.id===id);
  const selObjs=()=>TW.sel.map(byId).filter(Boolean);
  function push(){ const s=JSON.stringify(TW.objs); if(TW.hist[TW.hi]===s) return; TW.hist=TW.hist.slice(0,TW.hi+1); TW.hist.push(s); if(TW.hist.length>80) TW.hist.shift(); TW.hi=TW.hist.length-1; TW.dirty=true; isecClear(); }
  function restore(i){ TW.hi=i; TW.objs=JSON.parse(TW.hist[i]); TW.sel=TW.sel.filter(id=>byId(id)); TW.dirty=true; isecClear(); rebuild(); renderIns(); hdr(); }
  function undo(){ if(TW.hi>0){ restore(TW.hi-1); ctx.toast('Deshacer'); } }
  function redo(){ if(TW.hi<TW.hist.length-1){ restore(TW.hi+1); ctx.toast('Rehacer'); } }
  function changed(){ push(); rebuild(); renderIns(); hdr(); }
  function setSel(ids,add){ let s=add?TW.sel.slice():[]; ids.forEach(id=>{ const o=byId(id); if(!o) return; const g=o.grupo?TW.objs.filter(x=>x.grupo===o.grupo).map(x=>x.id):[id];
      if(add&&s.includes(id)) s=s.filter(x=>!g.includes(x)); else g.forEach(x=>{ if(!s.includes(x)) s.push(x); }); });
    TW.sel=s; if(s.length&&TW.tab!=='obj'&&TW.tab!=='ops') TW.tab='obj'; styleSel(); renderIns(); }
  function used(k){ if(!TW.used.includes(k)) TW.used.push(k); }

  /* ---------- encabezado ---------- */
  function hdr(){ const n=TW.objs.length, v=TW.objs.filter(o=>o.vacio).length;
    q('name').textContent=TW.nombre||'Estudio sin nombre'; root.querySelector('.'+w+'nm').classList.toggle(w+'dt',TW.dirty&&n>0);
    const inf=q('info'); if(inf) inf.textContent=`${n} VOLUMEN${n===1?'':'ES'} · ${v} VACÍO${v===1?'':'S'} · ${st.estudios.length} ESTUDIO${st.estudios.length===1?'':'S'}`;
    root.querySelector('[data-t="undo"]').disabled=TW.hi<=0; root.querySelector('[data-t="redo"]').disabled=TW.hi>=TW.hist.length-1;
    root.querySelectorAll('[data-t="mode"]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.v===TW.mode)));
    root.querySelector('[data-t="multi"]').setAttribute('aria-pressed',String(TW.multi));
    root.querySelectorAll('[data-t="view"]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.v===TW.view)));
    root.querySelectorAll('[data-t="tab"]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.v===TW.tab)));
    const h={sel:'TOCA un volumen para elegirlo · arrastra = orbitar',mover:'Arrastra el volumen o las flechas',rotar:'Arrastra los anillos · arrastre lateral = girar',escalar:'Arrastra los cubos de las manijas · arriba/abajo = escala'}[TW.mode];
    q('hint').textContent=(narrow()?h:h+' · 1 dedo/ratón: orbitar · 2 dedos/clic der.: desplazar · pellizco/rueda: zoom')+' · tap 2 dedos = deshacer · 3 = rehacer';
  }

  /* ---------- inspector ---------- */
  const fld=(k,lab,val,step)=>`<label class="${w}f"><span>${lab}</span><input type="text" inputmode="decimal" autocomplete="off" data-f="${k}" value="${String(tR(val)).replace('.',',')}"></label>`;
  function renderIns(){
    const ins=q('ins'); ins.classList.toggle(w+'cl',!TW.sheet); root.classList.toggle(w+'shc',!TW.sheet);
    root.querySelectorAll('[data-t="tab"]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.v===TW.tab)));
    const S=selObjs(), o=S[S.length-1];
    let h='';
    if(TW.tab==='obj'){
      if(!o) h=`<div class="${w}em">Toca un volumen de la paleta para agregarlo y tócalo en la escena para editarlo. Las medidas están en <b>metros</b> y los giros en <b>grados</b>.<br><br>Modo <b>MOVER</b>: arrastra el volumen (se ajusta a la grilla de ${TW.snap||'—'} m${TW.iman?' y a otros volúmenes':''}).</div>
        <div><div class="${w}h">Escena</div><div class="${w}card" style="font:11px/1.6 var(--f-m);color:var(--muted)">${TW.objs.length?TW.objs.map(x=>`<button class="${w}cp" data-t="pick" data-v="${x.id}">${esc(TPR_BY[x.tipo][1].split(' ·')[0])}${x.vacio?' <b style="color:var(--warn)">VACÍO</b>':''}</button>`).join(' '):'Escena vacía'}</div></div>`;
      else {
        const d=TPR_BY[o.tipo];
        h=`<div class="${w}h"><span>${esc(d[1])}${S.length>1?` + ${S.length-1}`:''}</span><small>${o.grupo?'EN GRUPO':''}</small></div>
        <div><div class="${w}h"><span>Posición · m</span><small>BASE DEL VOLUMEN</small></div><div class="${w}g3">${fld('pos.0','X · ESTE',o.pos[0])}${fld('pos.1','Y · NORTE',o.pos[1])}${fld('pos.2','Z · ALTURA',o.pos[2])}</div></div>
        <div><div class="${w}h"><span>Rotación · °</span></div><div class="${w}g3">${fld('rot.0','RX',o.rot[0],15)}${fld('rot.1','RY',o.rot[1],15)}${fld('rot.2','RZ · PLANTA',o.rot[2],15)}</div></div>
        <div><div class="${w}h"><span>Dimensiones · m</span><small>${tR(o.esc[0]*o.esc[1])} m² EN PLANTA</small></div><div class="${w}g3">${fld('esc.0','ANCHO X',o.esc[0])}${fld('esc.1','FONDO Y',o.esc[1])}${fld('esc.2','ALTO Z',o.esc[2])}</div></div>
        <div class="${w}row"><button class="${w}b ${w}rd" data-t="vacio" aria-pressed="${o.vacio}">${sv('<rect x="4" y="4" width="16" height="16" stroke-dasharray="3 2"/><path d="M9 9h6v6H9z"/>',18)} ${o.vacio?'Es vacío (sustrae)':'Convertir en vacío'}</button></div>
        <div><div class="${w}h"><span>Material</span><small>${TW.maqueta?'MAQUETA BLANCA ACTIVA':''}</small></div><div class="${w}sw">${TMAT.map(m=>`<button data-t="mat" data-v="${m[0]}" aria-pressed="${o.mat===m[0]}"><i style="background:${m[0]==='color'?o.color:m[2]}"></i>${m[1]}${m[0]==='color'?`<input type="color" data-f="color" value="${o.color}" aria-label="Color libre">`:''}</button>`).join('')}</div></div>
        <div class="${w}row"><button class="${w}b" data-t="dup">${I('copy',16)} Duplicar</button><button class="${w}b" data-t="ground">↧ Al suelo</button><button class="${w}b ${w}rd" data-t="del">${I('trash',16)} Borrar</button></div>
        <div class="${w}row"><button class="${w}b" data-t="mirror" data-v="x">⇋ Reflejar en eje X=0</button><button class="${w}b" data-t="mirror" data-v="y">⇅ Reflejar en eje Y=0</button></div>`;
      }
    } else if(TW.tab==='ops'){
      const n=S.length, O=TW.ops;
      h=`<div><div class="${w}h"><span>Composición aditiva</span><small>${n} SELECC.</small></div><div class="${w}row"><button class="${w}b ${w}gr" data-t="group" ${n<2?'disabled':''}>Agrupar (unión)</button><button class="${w}b" data-t="ungroup" ${!S.some(x=>x.grupo)?'disabled':''}>Desagrupar</button></div></div>
      <div><div class="${w}h"><span>Alinear</span><small>${n<2?'ELIGE 2+ (MULTI)':''}</small></div><div class="${w}g3">${[['x0','← X mín'],['xc','X centro'],['x1','X máx →'],['y0','↓ Y mín'],['yc','Y centro'],['y1','Y máx ↑'],['z0','Bases'],['zc','Z centro'],['z1','Coronas']].map(a=>`<button class="${w}b" data-t="align" data-v="${a[0]}" ${n<2?'disabled':''}>${a[1]}</button>`).join('')}</div></div>
      <div><div class="${w}h"><span>Ritmo · arreglo lineal</span><small>REPETICIÓN</small></div><div class="${w}g3">${fld('ops.n','COPIAS',O.n,1)}${fld('ops.d','PASO m',O.d,0.5)}<label class="${w}f"><span>EJE</span><select data-f="ops.eje"><option value="x"${O.eje==='x'?' selected':''}>X · Este</option><option value="y"${O.eje==='y'?' selected':''}>Y · Norte</option><option value="z"${O.eje==='z'?' selected':''}>Z · Altura</option></select></label></div><button class="${w}b" style="width:100%;margin-top:5px" data-t="arrL" ${!n?'disabled':''}>Crear arreglo lineal</button></div>
      <div><div class="${w}h"><span>Arreglo radial</span><small>ALREDEDOR DEL ORIGEN 0,0</small></div><div class="${w}g2">${fld('ops.rn','TOTAL',O.rn,1)}<button class="${w}b" data-t="arrR" ${!n?'disabled':''}>Crear radial</button></div></div>
      <div><div class="${w}h"><span>Transformaciones (Ching)</span></div><div class="${w}g3">
        <button class="${w}b" data-t="tr" data-v="dimx" ${!n?'disabled':''}>Dimensional<br>alargar</button><button class="${w}b" data-t="tr" data-v="dimz" ${!n?'disabled':''}>Dimensional<br>elevar</button><button class="${w}b" data-t="tr" data-v="dimf" ${!n?'disabled':''}>Dimensional<br>aplanar</button>
        <button class="${w}b ${w}rd" data-t="tr" data-v="sus" ${!n?'disabled':''}>Sustractiva<br>esquina</button><button class="${w}b ${w}rd" data-t="tr" data-v="sus2" ${!n?'disabled':''}>Sustractiva<br>patio</button><button class="${w}b ${w}gr" data-t="tr" data-v="adi" ${!n?'disabled':''}>Aditiva<br>anexo</button></div></div>
      <div><div class="${w}h"><span>Relaciones entre volúmenes</span></div><div class="${w}row">
        <button class="${w}b ${w}rd" data-t="csg" aria-pressed="${TW.csg}">${TW.csg?'Sustracción real ON':'Ver sustracción real (CSG)'}</button>
        <button class="${w}b" data-t="isec" ${n!==2?'disabled':''}>Intersección de 2</button>
        <button class="${w}b" data-t="xray" aria-pressed="${TW.xray}">Rayos X</button></div>
        <div class="${w}em" style="margin-top:6px;font-size:11.5px">Un <b style="color:var(--warn)">vacío</b> resta su volumen a los sólidos que toca. Activa la sustracción real para recortar las mallas (se exporta así al .OBJ).</div></div>`;
    } else if(TW.tab==='esc'){
      const MES=['ENE','FEB','MAR','ABR','MAY','JUN','JUL','AGO','SEP','OCT','NOV','DIC'];
      h=`<div><div class="${w}h"><span>Plantillas de organización</span><small>REEMPLAZA LA ESCENA</small></div><div class="${w}g3">${Object.entries(TPL).map(([k,t])=>`<button class="${w}b" data-t="tpl" data-v="${k}">${t.n}</button>`).join('')}<button class="${w}b ${w}rd" data-t="clear">Vaciar</button></div></div>
      <div><div class="${w}h"><span>Ajuste</span></div><div class="${w}row">${[[0,'Libre'],[.5,'Grilla 0,5'],[1,'Grilla 1 m']].map(s=>`<button class="${w}b" data-t="snap" data-v="${s[0]}" aria-pressed="${TW.snap===s[0]}">${s[1]}</button>`).join('')}<button class="${w}b" data-t="iman" aria-pressed="${TW.iman}">Imán a objetos</button></div></div>
      <div><div class="${w}h"><span>Presentación</span></div><div class="${w}row"><button class="${w}b" data-t="maq" aria-pressed="${TW.maqueta}">Maqueta blanca</button><button class="${w}b" data-t="hum" aria-pressed="${TW.humano}">Escala humana 1,70 m</button><button class="${w}b" data-t="sol" aria-pressed="${TW.sol}">Sol y sombras</button></div></div>
      <div><div class="${w}h"><span>Sol · lat ${LAT.toFixed(2)}°</span><span class="${w}tag">PREDISEÑO</span></div><div class="${w}g2"><label class="${w}f"><span>MES</span><select data-f="mes">${MES.map((m,i)=>`<option value="${i}"${i===TW.mes?' selected':''}>${m}</option>`).join('')}</select></label>
        <label class="${w}f"><span>HORA SOLAR · <b data-q="hv">${fmtH(TW.hora)}</b></span><input type="range" min="6" max="18" step="0.25" value="${TW.hora}" data-f="hora" style="padding:0"></label></div>
        <small style="display:block;margin-top:6px;font:9.5px/1.45 var(--f-m);color:var(--muted)">Posición solar por declinación de Cooper y ángulo horario (hora solar verdadera). Norte = +Y. Mediodía: altura ${sunPos(TW.mes,12).alt.toFixed(1)}°.</small></div>`;
    } else {
      const sug=suggest().filter(id=>!TW.conc.includes(id));
      const qq=(TW.q||'').trim().toLowerCase();
      const list=qq?FC_ALL.filter(c=>(c.n+' '+c.id).toLowerCase().includes(qq)).slice(0,40):[];
      h=`<div><div class="${w}h"><span>Conceptos del estudio</span><small>${TW.conc.length}</small></div><div class="${w}tg">${TW.conc.length?TW.conc.map(id=>FC_BY[id]?`<button class="${w}cp ${w}on" data-t="ctog" data-v="${id}">✓ ${esc(FC_BY[id].n)} <b>${FC_BY[id].code}</b></button>`:'').join(''):`<div class="${w}em" style="width:100%">Etiqueta el estudio con herramientas de la constelación: aparecerá en <b>Mi lenguaje formal</b>.</div>`}</div></div>
      <div><div class="${w}h"><span>Sugeridos por lo que modelaste</span></div><div class="${w}tg">${sug.length?sug.map(id=>`<button class="${w}cp ${w}sg" data-t="ctog" data-v="${id}">+ ${esc(FC_BY[id].n)}</button>`).join(''):'<small style="color:var(--faint)">—</small>'}</div></div>
      <div><div class="${w}h"><span>Buscar entre ${FC_ALL.length} herramientas</span></div><label class="${w}f"><input type="search" data-f="q" placeholder="eje, ritmo, sustracción…" value="${esc(TW.q||'')}"></label>
        <div class="${w}tg" style="margin-top:6px" data-q="clist">${list.map(c=>`<button class="${w}cp${TW.conc.includes(c.id)?' '+w+'on':''}" data-t="ctog" data-v="${c.id}">${esc(c.n)} <b>${c.code}</b></button>`).join('')}</div></div>`;
    }
    bd.innerHTML=h;
  }
  function fmtH(h){ const H=Math.floor(h), m=Math.round((h-H)*60); return String(H).padStart(2,'0')+':'+String(m).padStart(2,'0'); }
  function updFields(){ const o=selObjs().slice(-1)[0]; if(!o||TW.tab!=='obj') return; bd.querySelectorAll('[data-f]').forEach(inp=>{ const [k,i]=inp.dataset.f.split('.'); if((k==='pos'||k==='rot'||k==='esc')&&document.activeElement!==inp) inp.value=String(tR(o[k][+i])).replace('.',','); }); }
  function suggest(){ const s=new Set(); TW.objs.forEach(o=>{ (TPR_BY[o.tipo][3]||[]).forEach(c=>s.add(c)); if(o.vacio){ s.add('sustraccion'); s.add('tr-sus'); s.add('sustractiva'); } if(o.grupo){ s.add('aditiva'); s.add('union'); } });
    if(TW.objs.length>1) s.add('aditiva'); TW.used.forEach(c=>s.add(c)); return [...s].filter(id=>FC_BY[id]); }

  /* ---------- sol ---------- */
  function sunPos(mes,hora){ const doy=[17,47,75,105,135,162,198,228,258,288,318,344][mes]; const dec=23.45*Math.sin(2*Math.PI*(284+doy)/365)*Math.PI/180;
    const ph=LAT*Math.PI/180, H=(hora-12)*15*Math.PI/180;
    const alt=Math.asin(Math.sin(ph)*Math.sin(dec)+Math.cos(ph)*Math.cos(dec)*Math.cos(H));
    const az=Math.atan2(Math.sin(H),Math.cos(H)*Math.sin(ph)-Math.tan(dec)*Math.cos(ph))+Math.PI; /* desde el norte, horario */
    return {alt:alt*180/Math.PI, az:az*180/Math.PI, v:[Math.sin(az)*Math.cos(alt),Math.cos(az)*Math.cos(alt),Math.sin(alt)]}; }

  /* ---------- three ---------- */
  const U2T=(v)=>new T.Vector3(v[0],v[2],-v[1]);
  function geo(tipo){ if(geoC[tipo]) return geoC[tipo]; let g;
    switch(tipo){
      case 'punto': g=new T.SphereGeometry(.5,14,10); break;
      case 'esfera': g=new T.SphereGeometry(.5,28,18); break;
      case 'linea': g=new T.CylinderGeometry(.5,.5,1,10); g.rotateZ(Math.PI/2); break;
      case 'cilindro': g=new T.CylinderGeometry(.5,.5,1,32); break;
      case 'cono': g=new T.ConeGeometry(.5,1,32); break;
      case 'piramide': g=new T.ConeGeometry(.5,1,4); g.rotateY(Math.PI/4); break;
      case 'prisma3': { const s=new T.Shape(); s.moveTo(-.5,0); s.lineTo(.5,0); s.lineTo(0,1); s.lineTo(-.5,0); g=new T.ExtrudeGeometry(s,{depth:1,bevelEnabled:false}); break; }
      case 'toro': g=new T.TorusGeometry(.5,.18,14,40); g.rotateX(Math.PI/2); break;
      case 'tetra': g=new T.TetrahedronGeometry(.5); break;
      case 'octa': g=new T.OctahedronGeometry(.5); break;
      case 'icosa': g=new T.IcosahedronGeometry(.5); break;
      case 'arco': { const s=new T.Shape(); s.moveTo(-.5,0); s.lineTo(-.3,0); s.lineTo(-.3,.55); s.absarc(0,.55,.3,Math.PI,0,true); s.lineTo(.3,0); s.lineTo(.5,0); s.lineTo(.5,1); s.lineTo(-.5,1); s.lineTo(-.5,0);
        g=new T.ExtrudeGeometry(s,{depth:1,bevelEnabled:false,curveSegments:18}); break; }
      default: g=new T.BoxGeometry(1,1,1);
    }
    g.computeBoundingBox(); const b=g.boundingBox; g.translate(-(b.min.x+b.max.x)/2,-b.min.y,-(b.min.z+b.max.z)/2);
    g.scale(1/Math.max(1e-6,b.max.x-b.min.x),1/Math.max(1e-6,b.max.y-b.min.y),1/Math.max(1e-6,b.max.z-b.min.z));
    g.computeBoundingBox(); g.computeBoundingSphere(); geoC[tipo]=g; edgeC[tipo]=new T.EdgesGeometry(g,28); return g; }
  function canvasTex(kind){ const c=document.createElement('canvas'); c.width=c.height=256; const g=c.getContext('2d');
    if(kind==='madera'){ g.fillStyle='#b07a45'; g.fillRect(0,0,256,256); for(let i=0;i<70;i++){ g.strokeStyle=`rgba(${70+((i*37)%40)},${40+((i*13)%25)},20,${.18+((i*7)%10)/40})`; g.lineWidth=1+(i%3); g.beginPath(); const y=(i*3.7)%256; g.moveTo(0,y); for(let x=0;x<=256;x+=16) g.lineTo(x,y+Math.sin(x/40+i)*3); g.stroke(); } }
    else { g.fillStyle='#9a9a96'; g.fillRect(0,0,256,256); for(let i=0;i<5000;i++){ const v=120+((i*7919)%90); g.fillStyle=`rgba(${v},${v},${v-4},.35)`; g.fillRect((i*131)%256,(i*197)%256,1+(i%2),1+(i%3===0?1:0)); }
      g.strokeStyle='rgba(60,60,60,.25)'; g.lineWidth=1; for(let x=0;x<256;x+=64){ g.beginPath(); g.moveTo(x,0); g.lineTo(x,256); g.stroke(); } }
    const t=new T.CanvasTexture(c); t.wrapS=t.wrapT=T.RepeatWrapping; t.repeat.set(2,2); return t; }
  function mat(o){ const k=o.vacio?'vac'+(TW.csg?'c':''):(TW.maqueta?'maq':o.mat+(o.mat==='color'?o.color:''))+(TW.xray?':x':''); if(matC[k]) return matC[k]; let m;
    if(o.vacio) m=new T.MeshStandardMaterial({color:0xff3355,emissive:0x5a0014,transparent:true,opacity:TW.csg?.06:.24,depthWrite:false,side:T.DoubleSide,roughness:.6});
    else if(TW.maqueta) m=new T.MeshStandardMaterial({color:0xf3f1ec,roughness:.92,metalness:0});
    else if(o.mat==='vidrio') m=new T.MeshStandardMaterial({color:0x9fdcff,roughness:.05,metalness:.2,transparent:true,opacity:.35,depthWrite:false,side:T.DoubleSide});
    else if(o.mat==='madera') m=new T.MeshStandardMaterial({map:canvasTex('madera'),roughness:.75});
    else if(o.mat==='hormigon') m=new T.MeshStandardMaterial({map:canvasTex('hormigon'),roughness:.97});
    else if(o.mat==='color') m=new T.MeshStandardMaterial({color:new T.Color(o.color),roughness:.6});
    else m=new T.MeshStandardMaterial({color:0xf3f1ec,roughness:.92});
    if(TW.xray&&!o.vacio){ m.transparent=true; m.opacity=Math.min(m.opacity,.38); m.depthWrite=false; }
    matC[k]=m; return m; }
  function lmat(k){ if(lineM[k]) return lineM[k]; const c={n:0x24313f,v:0xff5c7a,s:0x38e1ff,g:0xb6ff3c}[k]; lineM[k]=new T.LineBasicMaterial({color:c,transparent:k!=='n',opacity:k==='n'?1:.95}); return lineM[k]; }
  function applyTr(m,o){ m.position.copy(U2T(o.pos)); m.rotation.set(o.rot[0]*Math.PI/180,o.rot[2]*Math.PI/180,-o.rot[1]*Math.PI/180,'XYZ'); m.scale.set(o.esc[0],o.esc[2],o.esc[1]); m.updateMatrixWorld(true); }
  function rebuild(){ if(!T) return;
    meshes.forEach(r=>{ scene.remove(r.g); }); meshes.clear();
    TW.objs.forEach(o=>{ const g=new T.Group(); const m=new T.Mesh(geo(o.tipo),mat(o)); m.castShadow=!o.vacio&&!TW.xray; m.receiveShadow=!o.vacio; m.userData.id=o.id; m.renderOrder=o.vacio?2:0;
      const e=new T.LineSegments(edgeC[o.tipo],lmat(o.vacio?'v':'n')); e.userData.id=o.id; e.raycast=()=>{}; g.add(m); g.add(e); g.userData.id=o.id; applyTr(g,o); scene.add(g); meshes.set(o.id,{g,m,e}); });
    styleSel(); human&&placeHuman(); schedCSG(); req(); }
  function syncTr(ids){ (ids||TW.objs.map(o=>o.id)).forEach(id=>{ const r=meshes.get(id), o=byId(id); if(r&&o) applyTr(r.g,o); }); placeHuman(); req(); }
  function styleSel(){ if(!T) return; meshes.forEach((r,id)=>{ const o=byId(id); const s=TW.sel.includes(id); r.e.material=lmat(s?(o&&o.grupo?'g':'s'):(o&&o.vacio?'v':'n')); }); styleCSG(); req(); }
  function aabb(ids){ const b=new T.Box3(); ids.forEach(id=>{ const r=meshes.get(id); if(r){ r.g.updateMatrixWorld(true); b.expandByObject(r.m); } }); return b; }
  function uBox(b){ return {min:[b.min.x,-b.max.z,b.min.y],max:[b.max.x,-b.min.z,b.max.y]}; }

  /* ---------- CSG ---------- */
  function meshPolys(m){ m.updateMatrixWorld(true); const g=m.geometry.index?m.geometry.toNonIndexed():m.geometry; const P=g.attributes.position, Nn=g.attributes.normal;
    const M=m.matrixWorld, NM=new T.Matrix3().getNormalMatrix(M), v=new T.Vector3(), n=new T.Vector3(), out=[];
    for(let i=0;i+2<P.count;i+=3){ const vs=[]; for(let k=0;k<3;k++){ v.fromBufferAttribute(P,i+k).applyMatrix4(M); n.fromBufferAttribute(Nn,i+k).applyMatrix3(NM).normalize(); vs.push(new CSG.Vx(new CSG.V(v.x,v.y,v.z),new CSG.V(n.x,n.y,n.z))); }
      if(vs[1].pos.minus(vs[0].pos).cross(vs[2].pos.minus(vs[0].pos)).len()<1e-8) continue; out.push(new CSG.Po(vs)); }
    if(g!==m.geometry) g.dispose(); return out; }
  function polysGeo(ps){ const P=[],Nn=[]; ps.forEach(p=>{ const vs=p.vertices; for(let i=2;i<vs.length;i++) [vs[0],vs[i-1],vs[i]].forEach(v=>{ P.push(v.pos.x,v.pos.y,v.pos.z); Nn.push(v.normal.x,v.normal.y,v.normal.z); }); });
    const g=new T.BufferGeometry(); g.setAttribute('position',new T.Float32BufferAttribute(P,3)); g.setAttribute('normal',new T.Float32BufferAttribute(Nn,3)); return g; }
  function clearCSG(){ csgList.forEach(x=>{ scene.remove(x.g); x.m.geometry.dispose(); x.e.geometry.dispose(); }); csgList=[]; meshes.forEach(r=>{ r.g.visible=true; }); }
  function schedCSG(){ clearTimeout(csgT); if(!TW.csg){ if(csgList.length){ clearCSG(); csgKey=''; req(); } return; } csgT=setTimeout(runCSG,90); }
  function runCSG(){ if(!T||!alive||!TW.csg) return; const key=JSON.stringify(TW.objs)+TW.maqueta+TW.xray; if(key===csgKey&&csgList.length) return; clearCSG(); csgKey=key;
    const vac=TW.objs.filter(o=>o.vacio); if(!vac.length){ req(); return; }
    const vb=vac.map(o=>({o,b:aabb([o.id]),ps:null}));
    TW.objs.filter(o=>!o.vacio).forEach(o=>{ const r=meshes.get(o.id); const b=aabb([o.id]); const hit=vb.filter(v=>v.b.intersectsBox(b)); if(!hit.length) return;
      try{ let ps=meshPolys(r.m); hit.forEach(v=>{ if(!v.ps) v.ps=meshPolys(meshes.get(v.o.id).m); ps=CSG.subtract(ps,v.ps); });
        const gg=polysGeo(ps); const m=new T.Mesh(gg,r.m.material); m.castShadow=r.m.castShadow; m.receiveShadow=true; m.userData.id=o.id;
        const e=new T.LineSegments(new T.EdgesGeometry(gg,28),r.e.material); e.raycast=()=>{}; const g=new T.Group(); g.add(m); g.add(e); scene.add(g); r.g.children[0].visible=false; r.g.children[1].visible=false; r.g.visible=false;
        csgList.push({g,m,e,id:o.id}); }catch(err){ /* malla demasiado compleja: se deja sin recortar */ } });
    styleCSG(); req(); }
  function styleCSG(){ csgList.forEach(x=>{ x.e.material=lmat(TW.sel.includes(x.id)?'s':'n'); }); }
  function isecClear(){ if(isec&&scene){ scene.remove(isec); isec.geometry.dispose(); } isec=null; }

  /* ---------- gizmo ---------- */
  const AX={x:[1,0,0],y:[0,0,-1],z:[0,1,0]}, AXC={x:0xff5c7a,y:0xb6ff3c,z:0x38e1ff};
  function gmat(c,op){ return new T.MeshBasicMaterial({color:c,depthTest:false,depthWrite:false,transparent:true,opacity:op==null?1:op}); }
  function buildGizmo(){ gzG=new T.Group(); gzM=new T.Group(); gzS=new T.Group(); gzR=new T.Group(); gzG.add(gzM,gzS,gzR); gzG.renderOrder=999;
    const hitM=gmat(0xffffff,0);
    Object.keys(AX).forEach(k=>{ const dir=new T.Vector3(...AX[k]); const q=new T.Quaternion().setFromUnitVectors(new T.Vector3(0,1,0),dir);
      const mk=(geo,m,len,h,kind)=>{ const x=new T.Mesh(geo,m); x.quaternion.copy(q); x.position.copy(dir.clone().multiplyScalar(len)); x.renderOrder=999; if(h) x.userData.h={kind,ax:k}; return x; };
      gzM.add(mk(new T.CylinderGeometry(.025,.025,.8,8),gmat(AXC[k]),.4)); gzM.add(mk(new T.ConeGeometry(.08,.22,14),gmat(AXC[k]),.9)); gzM.add(mk(new T.CylinderGeometry(.13,.13,1.1,8),hitM,.55,1,'mv'));
      gzS.add(mk(new T.CylinderGeometry(.02,.02,.8,8),gmat(AXC[k]),.4)); gzS.add(mk(new T.BoxGeometry(.16,.16,.16),gmat(AXC[k]),.88)); gzS.add(mk(new T.CylinderGeometry(.13,.13,1.1,8),hitM,.55,1,'sc'));
      const ring=new T.Mesh(new T.TorusGeometry(.85,.016,6,64),gmat(AXC[k],.9)); const hit=new T.Mesh(new T.TorusGeometry(.85,.1,6,48),hitM); hit.userData.h={kind:'ro',ax:k};
      const rq=new T.Quaternion().setFromUnitVectors(new T.Vector3(0,0,1),dir); ring.quaternion.copy(rq); hit.quaternion.copy(rq); ring.renderOrder=hit.renderOrder=999; gzR.add(ring,hit); });
    const u=new T.Mesh(new T.BoxGeometry(.2,.2,.2),gmat(0xffffff,.9)); u.renderOrder=999; const uh=new T.Mesh(new T.BoxGeometry(.4,.4,.4),hitM); uh.userData.h={kind:'su'}; gzS.add(u,uh);
    gzG.traverse(o=>{ o.renderOrder=999; }); scene.add(gzG); gzG.visible=false; }
  function pivot(){ const S=selObjs(); if(!S.length) return null; if(S.length===1) return U2T(S[0].pos); const b=aabb(TW.sel); const c=new T.Vector3(); b.getCenter(c); c.y=b.min.y; return c; }
  function updGizmo(){ if(!gzG) return; const pv=pivot(); gzG.visible=!!pv&&TW.mode!=='sel'; if(!gzG.visible) return; gzG.position.copy(pv);
    gzM.visible=TW.mode==='mover'; gzS.visible=TW.mode==='escalar'; gzR.visible=TW.mode==='rotar';
    const s=cam.isOrthographicCamera?(cam.top-cam.bottom)/cam.zoom*.12:cam.position.distanceTo(pv)*.13; gzG.scale.setScalar(Math.max(.05,s)); gzG.updateMatrixWorld(true); }

  /* ---------- cámara ---------- */
  function camDef(v){ const c=TW.cam&&TW.cam.t?TW.cam:{t:[0,0,0],r:42}; const P={planta:[0,0.0001,'o'],alzado:[0,Math.PI/2,'o'],axo:[Math.PI/4,Math.acos(1/Math.sqrt(3)),'o'],persp:[Math.PI/5,1.05,'p']}[v];
    return {t:c.t.slice(),r:c.r,th:P[0],ph:P[1],pr:P[2]}; }
  function applyCam(){ const c=TW.cam, W=cvw.clientWidth||400, H=cvw.clientHeight||300, a=W/H; const tg=new T.Vector3(...c.t);
    const dir=new T.Vector3(Math.sin(c.ph)*Math.sin(c.th),Math.cos(c.ph),Math.sin(c.ph)*Math.cos(c.th));
    cam=c.pr==='o'?camO:camP;
    camP.aspect=a; camP.position.copy(tg).addScaledVector(dir,c.r); camP.up.set(0,1,0); if(c.ph<.02) camP.up.set(-Math.sin(c.th),0,-Math.cos(c.th)); camP.lookAt(tg); camP.near=Math.max(.05,c.r/400); camP.far=c.r*40+500; camP.updateProjectionMatrix();
    const hh=c.r*Math.tan(camP.fov*Math.PI/360); camO.left=-hh*a; camO.right=hh*a; camO.top=hh; camO.bottom=-hh; camO.zoom=1; camO.position.copy(tg).addScaledVector(dir,c.r+300); camO.up.copy(camP.up); camO.lookAt(tg); camO.near=.1; camO.far=c.r+900; camO.updateProjectionMatrix();
    req(); }
  function setView(v){ TW.view=v; TW.cam=camDef(v); applyCam(); hdr(); }
  function fit(){ if(!T) return; const ids=TW.objs.map(o=>o.id); const c=TW.cam; if(!ids.length){ c.t=[0,0,0]; c.r=42; applyCam(); return; }
    const b=aabb(ids), ctr=new T.Vector3(); b.getCenter(ctr); const s=b.getSize(new T.Vector3()).length(); c.t=[ctr.x,ctr.y,ctr.z]; c.r=Math.max(6,s*1.25+(TW.humano?3:0)); applyCam(); }
  function panBy(dx,dy){ const c=TW.cam, H=cvw.clientHeight||300; const wpp=2*c.r*Math.tan(camP.fov*Math.PI/360)/H;
    const right=new T.Vector3().setFromMatrixColumn(cam.matrixWorld,0), up=new T.Vector3().setFromMatrixColumn(cam.matrixWorld,1);
    const t=new T.Vector3(...c.t).addScaledVector(right,-dx*wpp).addScaledVector(up,dy*wpp); c.t=[t.x,t.y,t.z]; applyCam(); }
  function zoomBy(f){ TW.cam.r=Math.max(1.5,Math.min(600,TW.cam.r*f)); applyCam(); }

  /* ---------- escena base ---------- */
  function placeHuman(){ if(!human) return; human.visible=TW.humano; if(!TW.humano) return; let x=-3,y=-3;
    if(TW.objs.length){ const b=uBox(aabb(TW.objs.map(o=>o.id))); x=b.min[0]-1.6; y=b.min[1]-1.6; } human.position.set(x,0,-y); }
  function buildHuman(){ const g=new T.Group(); const m=new T.MeshStandardMaterial({color:0x38e1ff,emissive:0x0b4a5c,roughness:.5});
    const leg=new T.CylinderGeometry(.075,.06,.86,10); [-.1,.1].forEach(x=>{ const l=new T.Mesh(leg,m); l.position.set(x,.43,0); g.add(l); });
    const tor=new T.Mesh(new T.CylinderGeometry(.2,.15,.6,12),m); tor.position.y=1.17; g.add(tor);
    const neck=new T.Mesh(new T.CylinderGeometry(.05,.05,.06,8),m); neck.position.y=1.5; g.add(neck);
    const hd=new T.Mesh(new T.SphereGeometry(.1,14,10),m); hd.position.y=1.6; g.add(hd);
    [-.25,.25].forEach(x=>{ const a=new T.Mesh(new T.CylinderGeometry(.045,.04,.62,8),m); a.position.set(x,1.12,0); a.rotation.z=x>0?.08:-.08; g.add(a); });
    g.traverse(o=>{ if(o.isMesh){ o.castShadow=true; o.raycast=()=>{}; } }); return g; }
  function updSun(){ if(!sun) return; const s=sunPos(TW.mes,TW.hora); const on=TW.sol&&s.alt>0;
    const v=on?s.v:[.4,-.5,.75]; const tg=new T.Vector3(...TW.cam.t); const d=U2T(v).normalize();
    sun.position.copy(tg).addScaledVector(d,80); sun.target.position.copy(tg); sun.target.updateMatrixWorld(); sun.castShadow=on; sun.intensity=on?1.15:.75;
    const L=q('sunl'); if(L) L.textContent=TW.sol?(s.alt>0?`SOL ${['ENE','FEB','MAR','ABR','MAY','JUN','JUL','AGO','SEP','OCT','NOV','DIC'][TW.mes]} ${fmtH(TW.hora)} · ALT ${s.alt.toFixed(0)}° · AZ ${s.az.toFixed(0)}° · PREDISEÑO`:'SOL BAJO EL HORIZONTE'):''; req(); }
  function initThree(){
    try{ ren=new T.WebGLRenderer({antialias:true,preserveDrawingBuffer:true}); }catch(e){ msg('Tu navegador no tiene WebGL','Activa la aceleración por hardware o prueba en otro navegador (Safari/Chrome actualizados).',false); return false; }
    ren.setPixelRatio(Math.min(window.devicePixelRatio||1,2)); ren.setClearColor(0x050b13,1); ren.shadowMap.enabled=true; ren.shadowMap.type=T.PCFSoftShadowMap;
    ren.domElement.setAttribute('tabindex','0'); ren.domElement.setAttribute('aria-label','Lienzo 3D del taller de forma'); cvw.insertBefore(ren.domElement,cvw.firstChild);
    scene=new T.Scene();
    camP=new T.PerspectiveCamera(40,1,.1,2000); camO=new T.OrthographicCamera(-1,1,1,-1,.1,2000); ray=new T.Raycaster();
    scene.add(new T.HemisphereLight(0xeaf4ff,0x22303e,.8)); scene.add(new T.AmbientLight(0xffffff,.28)); const fill=new T.DirectionalLight(0xcfe6ff,.35); fill.position.set(-30,25,40); scene.add(fill);
    sun=new T.DirectionalLight(0xfff4e0,1.05); sun.shadow.mapSize.set(narrow()?1024:2048,narrow()?1024:2048); const sc=sun.shadow.camera; sc.left=-45; sc.right=45; sc.top=45; sc.bottom=-45; sc.near=1; sc.far=220; sun.shadow.bias=-.0006; scene.add(sun); scene.add(sun.target);
    ground=new T.Mesh(new T.PlaneGeometry(300,300),new T.MeshStandardMaterial({color:0x10202f,roughness:1})); ground.rotation.x=-Math.PI/2; ground.position.y=-.01; ground.receiveShadow=true; ground.raycast=()=>{}; scene.add(ground);
    grid=new T.GridHelper(60,60,0x1d4a66,0x16324a); grid.position.y=.002; scene.add(grid); grid5=new T.GridHelper(60,12,0x2b6c92,0x2b6c92); grid5.position.y=.004; scene.add(grid5);
    const ax=(a,b,c)=>{ const g=new T.BufferGeometry().setFromPoints([new T.Vector3(...a),new T.Vector3(...b)]); const l=new T.Line(g,new T.LineDashedMaterial({color:c,dashSize:1,gapSize:.6,transparent:true,opacity:.7})); l.computeLineDistances(); l.position.y=.01; return l; };
    axes=new T.Group(); axes.add(ax([-30,0,0],[30,0,0],0xff5c7a),ax([0,0,30],[0,0,-30],0xb6ff3c)); scene.add(axes);
    human=buildHuman(); scene.add(human);
    buildGizmo();
    if(!TW.cam||!TW.cam.t) TW.cam=camDef(TW.view); applyCam(); rebuild(); updSun();
    if(!TW._fitted&&TW.objs.length){ fit(); TW._fitted=1; }
    return true; }
  function resize(){ if(!ren) return; const W=cvw.clientWidth, H=cvw.clientHeight; if(!W||!H) return; ren.setSize(W,H,false); applyCam(); }
  function req(){ if(!raf&&alive&&ren) raf=requestAnimationFrame(frame); }
  function frame(){ raf=0; if(!alive||!ren) return; updGizmo(); if(selHelp){ scene.remove(selHelp); selHelp.geometry.dispose(); selHelp.material.dispose(); selHelp=null; }
    if(TW.sel.length&&TW.mode!=='sel'||TW.sel.length>1){ const b=aabb(TW.sel); if(!b.isEmpty()){ selHelp=new T.Box3Helper(b,0x38e1ff); selHelp.material.transparent=true; selHelp.material.opacity=.35; scene.add(selHelp); } }
    ren.render(scene,cam); }
  function msg(t,s,retry){ const m=q('msg'); if(!t){ m.style.display='none'; return; } m.style.display=''; m.innerHTML=`<div class="${p}hud"><b style="color:var(--warn)">${esc(t)}</b><p>${esc(s)}</p>${retry?`<button class="${w}b" data-t="retry">Reintentar</button>`:''}</div>`; }

  /* ---------- manipulación ---------- */
  let ptrs=new Map(), gs=null;
  const rel=e=>{ const r=ren.domElement.getBoundingClientRect(); return [e.clientX-r.left,e.clientY-r.top]; };
  const ndc=(x,y)=>new T.Vector2(x/(ren.domElement.clientWidth||1)*2-1,-(y/(ren.domElement.clientHeight||1))*2+1);
  function pick(x,y){ ray.setFromCamera(ndc(x,y),cam); const arr=[]; meshes.forEach(r=>{ if(r.g.visible) arr.push(r.m); }); csgList.forEach(c=>arr.push(c.m));
    const hs=ray.intersectObjects(arr,false); if(!hs.length) return null; const solid=hs.find(h=>!(byId(h.object.userData.id)||{}).vacio); return (solid||hs[0]).object.userData.id; }
  function pickH(x,y){ if(!gzG||!gzG.visible) return null; ray.setFromCamera(ndc(x,y),cam); const arr=[]; gzG.traverse(o=>{ if(o.userData.h&&o.parent.visible) arr.push(o); }); const h=ray.intersectObjects(arr,false); return h.length?h[0].object.userData.h:null; }
  function scr(v){ const q2=v.clone().project(cam); return [(q2.x+1)/2*ren.domElement.clientWidth,(1-q2.y)/2*ren.domElement.clientHeight]; }
  const sn=v=>TW.snap?Math.round(v/TW.snap)*TW.snap:v;
  function startDrag(kind,h,x,y){ if(csgList.length){ clearCSG(); csgKey=''; } const pv=pivot(); gs.kind=kind; gs.h=h; gs.start=tClone(selObjs()); gs.pv=pv.clone(); gs.ps=scr(pv);
    if(h&&h.ax){ const e=scr(pv.clone().add(new T.Vector3(...AX[h.ax]))); gs.ax=[e[0]-gs.ps[0],e[1]-gs.ps[1]]; gs.a0=Math.atan2(y-gs.ps[1],x-gs.ps[0]);
      const D=new T.Vector3(); cam.getWorldDirection(D); gs.rs=new T.Vector3(...AX[h.ax]).dot(D)>0?1:-1; }
    if(kind==='body'&&TW.mode==='mover'){ const D=new T.Vector3(); cam.getWorldDirection(D); const vert=Math.abs(D.y)<.25; gs.vert=vert;
      gs.plane=vert?new T.Plane(new T.Vector3(D.x,0,D.z).normalize(),0):new T.Plane(new T.Vector3(0,1,0),-pv.y); if(vert) gs.plane.constant=-gs.plane.normal.dot(pv); gs.hit0=hitPlane(x,y,gs.plane); } }
  function hitPlane(x,y,pl){ ray.setFromCamera(ndc(x,y),cam); const v=new T.Vector3(); return ray.ray.intersectPlane(pl,v)?v:null; }
  function axisD(dx,dy){ const a=gs.ax, L=a[0]*a[0]+a[1]*a[1]; return L<4?0:(dx*a[0]+dy*a[1])/L; }
  function moveSel(d,axesOk){ /* d = delta UI [dx,dy,dz] desde el inicio */ const S=gs.start, pr=S[S.length-1];
    const c=[0,1,2].map(i=>axesOk[i]?sn(pr.pos[i]+d[i])-(pr.pos[i]+d[i]):0); if(axesOk[2]&&pr.pos[2]+d[2]+c[2]<0&&pr.pos[2]>=0) c[2]=-(pr.pos[2]+d[2]);
    S.forEach(s=>{ const o=byId(s.id); if(o) o.pos=s.pos.map((v,i)=>tR(v+d[i]+c[i])); }); syncTr(TW.sel);
    if(TW.iman&&TW.objs.length>TW.sel.length){ const others=TW.objs.filter(o=>!TW.sel.includes(o.id)).map(o=>uBox(aabb([o.id]))); const m=uBox(aabb(TW.sel)); const thr=Math.max(.25,TW.cam.r*.008); const adj=[0,0,0];
      [0,1,2].forEach(i=>{ if(!axesOk[i]) return; let best=thr, bv=0; others.forEach(b=>{ if(i<2){ const ov=1-i; if(b.max[ov]<m.min[ov]-thr*4||b.min[ov]>m.max[ov]+thr*4) return; }
          [b.min[i]-m.max[i],b.max[i]-m.min[i],b.min[i]-m.min[i],b.max[i]-m.max[i]].forEach(df=>{ if(Math.abs(df)<best){ best=Math.abs(df); bv=df; } }); }); adj[i]=bv; });
      if(adj.some(v=>v)){ TW.sel.forEach(id=>{ const o=byId(id); o.pos=o.pos.map((v,i)=>tR(v+adj[i])); }); syncTr(TW.sel); } }
    updFields(); }
  function dragTo(x,y){ const dx=x-gs.x0, dy=y-gs.y0, S=gs.start, h=gs.h;
    if(gs.kind==='handle'&&h.kind==='mv'){ const d=axisD(dx,dy); const i={x:0,y:1,z:2}[h.ax]; const v=[0,0,0]; v[i]=d; moveSel(v,[i===0,i===1,i===2]); }
    else if(gs.kind==='handle'&&h.kind==='sc'){ const d=axisD(dx,dy); const i={x:0,y:1,z:2}[h.ax]; S.forEach(s=>{ const o=byId(s.id); if(!o) return; let v=s.esc[i]+(i<2?2*d:d); if(TW.snap) v=Math.round(v*10)/10; o.esc[i]=tR(Math.max(.05,v)); }); syncTr(TW.sel); updFields(); }
    else if((gs.kind==='handle'&&h.kind==='su')||(gs.kind==='body'&&TW.mode==='escalar')){ const f=Math.exp(-dy/140); const c=uBox(aabb(TW.sel)); const cx=(c.min[0]+c.max[0])/2, cy=(c.min[1]+c.max[1])/2;
      S.forEach(s=>{ const o=byId(s.id); if(!o) return; o.esc=s.esc.map(v=>tR(Math.max(.05,v*f))); if(S.length>1){ o.pos=[tR(cx+(s.pos[0]-cx)*f),tR(cy+(s.pos[1]-cy)*f),tR(s.pos[2]*f)]; } }); syncTr(TW.sel); updFields(); }
    else if((gs.kind==='handle'&&h.kind==='ro')||(gs.kind==='body'&&TW.mode==='rotar')){ let deg, i;
      if(gs.kind==='handle'){ let a=Math.atan2(y-gs.ps[1],x-gs.ps[0])-gs.a0; while(a>Math.PI) a-=2*Math.PI; while(a<-Math.PI) a+=2*Math.PI; deg=a*180/Math.PI*gs.rs; i={x:0,y:1,z:2}[h.ax]; }
      else { deg=dx*.6; i=2; }
      if(TW.snap) deg=Math.round(deg/15)*15; else deg=Math.round(deg);
      const piv=uBox(aabb(gs.start.map(s=>s.id))); const cx=(piv.min[0]+piv.max[0])/2, cy=(piv.min[1]+piv.max[1])/2; const r=deg*Math.PI/180;
      S.forEach(s=>{ const o=byId(s.id); if(!o) return; o.rot=s.rot.slice(); o.rot[i]=tR(((s.rot[i]+deg)%360+540)%360-180);
        if(S.length>1&&i===2){ const px=s.pos[0]-cx, py=s.pos[1]-cy; o.pos=[tR(cx+px*Math.cos(r)-py*Math.sin(r)),tR(cy+px*Math.sin(r)+py*Math.cos(r)),s.pos[2]]; } }); syncTr(TW.sel); updFields(); }
    else if(gs.kind==='body'&&TW.mode==='mover'&&gs.hit0){ const hp=hitPlane(x,y,gs.plane); if(!hp) return; const d3=hp.sub(gs.hit0);
      if(gs.vert) moveSel([d3.x,-d3.z,d3.y],[Math.abs(gs.plane.normal.z)>.3,Math.abs(gs.plane.normal.x)>.3,true]); else moveSel([d3.x,-d3.z,0],[true,true,false]); } }
  function bindCanvas(){ const c=ren.domElement;
    c.addEventListener('contextmenu',e=>e.preventDefault());
    c.addEventListener('pointerdown',e=>{ e.preventDefault(); try{ c.setPointerCapture(e.pointerId); }catch(_){} c.focus({preventScroll:true}); const [x,y]=rel(e); ptrs.set(e.pointerId,[x,y]);
      if(ptrs.size===1){ gs={t0:performance.now(),max:1,moved:0,x0:x,y0:y,lx:x,ly:y,btn:e.button,kind:'orbit'};
        gs.add=TW.multi||e.shiftKey; if(e.button===1||e.button===2) gs.kind='pan';
        else { const h=pickH(x,y); if(h){ startDrag('handle',h,x,y); return; }
          const id=pick(x,y); gs.pick=id;
          if(id&&TW.mode!=='sel'){ if(!TW.sel.includes(id)) setSel([id],gs.add); if(TW.sel.includes(id)){ gs.preSel=true; startDrag('body',null,x,y); } } } }
      else { gs.max=Math.max(gs.max,ptrs.size); if(gs.kind==='handle'||gs.kind==='body'){ gs.start.forEach(s=>{ const o=byId(s.id); if(o) Object.assign(o,tClone(s)); }); syncTr(TW.sel); updFields(); }
        const P=[...ptrs.values()]; gs.kind='multi'; gs.pd=Math.hypot(P[0][0]-P[1][0],P[0][1]-P[1][1])||1; gs.pm=[(P[0][0]+P[1][0])/2,(P[0][1]+P[1][1])/2]; } });
    c.addEventListener('pointermove',e=>{ if(!gs||!ptrs.has(e.pointerId)) return; const [x,y]=rel(e); ptrs.set(e.pointerId,[x,y]);
      if(gs.kind==='multi'&&ptrs.size>=2){ const P=[...ptrs.values()]; const d=Math.hypot(P[0][0]-P[1][0],P[0][1]-P[1][1])||1, m=[(P[0][0]+P[1][0])/2,(P[0][1]+P[1][1])/2];
        gs.moved+=Math.abs(d-gs.pd)+Math.hypot(m[0]-gs.pm[0],m[1]-gs.pm[1]); zoomBy(gs.pd/d); panBy(m[0]-gs.pm[0],m[1]-gs.pm[1]); gs.pd=d; gs.pm=m; return; }
      if(ptrs.size!==1) return; const dx=x-gs.lx, dy=y-gs.ly; gs.lx=x; gs.ly=y; gs.moved=Math.max(gs.moved,Math.hypot(x-gs.x0,y-gs.y0));
      if(gs.moved<4) return;
      if(gs.kind==='orbit'){ const c2=TW.cam; c2.th-=dx*.008; c2.ph=Math.max(.0001,Math.min(Math.PI/2-.001+ .45,c2.ph-dy*.008)); if(c2.pr==='o'&&TW.view!=='axo'&&TW.view!=='persp'){ TW.view='axo'; hdr(); } applyCam(); updSun(); }
      else if(gs.kind==='pan'){ panBy(dx,dy); updSun(); }
      else if(gs.kind==='handle'||gs.kind==='body') dragTo(x,y); });
    const up=e=>{ if(!gs||!ptrs.has(e.pointerId)) return; ptrs.delete(e.pointerId);
      if(ptrs.size>0){ if(gs.kind==='multi'&&ptrs.size===1){ gs.kind='none'; } return; }
      const dur=performance.now()-gs.t0;
      if((gs.kind==='handle'||gs.kind==='body')&&gs.moved>=4){ push(); rebuild(); renderIns(); hdr(); }
      else if(gs.moved<10&&dur<400&&e.type==='pointerup'){
        if(gs.max===2) undo(); else if(gs.max>=3) redo();
        else if(gs.btn===0&&gs.kind!=='handle'){ const id=gs.pick; if(id){ if(!gs.preSel||TW.mode==='sel') setSel([id],gs.add); } else if(!gs.add){ TW.sel=[]; styleSel(); styleCSG(); renderIns(); } } }
      gs=null; styleCSG(); req(); };
    c.addEventListener('pointerup',up); c.addEventListener('pointercancel',up);
    c.addEventListener('wheel',e=>{ e.preventDefault(); if(e.ctrlKey) zoomBy(Math.exp(e.deltaY*.01)); else zoomBy(Math.exp(e.deltaY*.0015)); },{passive:false});
  }

  /* ---------- operaciones ---------- */
  function addPrim(tipo){ const d=TPR_BY[tipo]; let x=0,y=0;
    if(T&&TW.objs.length){ const b=uBox(aabb(TW.objs.map(o=>o.id))); x=sn(b.max[0]+d[2][0]/2+1); y=sn((b.min[1]+b.max[1])/2); }
    const o=tObj(tipo,[x,y,tipo==='punto'?0:0]); TW.objs.push(o); TW.sel=[o.id]; TW.tab='obj'; (d[3]||[]).forEach(used); changed();
    if(T){ const c=TW.cam; const b=uBox(aabb([o.id])); const vis=Math.hypot(b.max[0]-c.t[0],-b.max[1]-c.t[2])>c.r*.6; if(vis) fit(); } ctx.toast(d[1]+' agregado'); }
  function dup(){ const S=selObjs(); if(!S.length) return; const b=T?uBox(aabb(TW.sel)):{min:[0,0,0],max:[1,1,1]}; const off=sn(b.max[0]-b.min[0]+1)||1; const gmap={};
    const n=S.map(s=>{ const o=tClone(s); o.id=tUid(); o.pos[0]=tR(o.pos[0]+off); if(o.grupo){ gmap[o.grupo]=gmap[o.grupo]||tUid(); o.grupo=gmap[o.grupo]; } return o; });
    TW.objs.push(...n); TW.sel=n.map(o=>o.id); used('repeticion'); changed(); }
  function del(){ if(!TW.sel.length) return; TW.objs=TW.objs.filter(o=>!TW.sel.includes(o.id)); TW.sel=[]; changed(); }
  function mirror(ax){ const S=selObjs(); if(!S.length) return; const gmap={};
    const n=S.map(s=>{ const o=tClone(s); o.id=tUid(); if(ax==='x'){ o.pos[0]=tR(-o.pos[0]); o.rot=[o.rot[0],-o.rot[1],-o.rot[2]]; } else { o.pos[1]=tR(-o.pos[1]); o.rot=[-o.rot[0],o.rot[1],-o.rot[2]]; }
      o.rot=o.rot.map(v=>tR(v)||0); if(o.grupo){ gmap[o.grupo]=gmap[o.grupo]||tUid(); o.grupo=gmap[o.grupo]; } return o; });
    TW.objs.push(...n); TW.sel=n.map(o=>o.id); used('simetria'); used('eje'); changed(); ctx.toast('Reflejado respecto del eje '+(ax==='x'?'X = 0 (norte-sur)':'Y = 0 (este-oeste)')); }
  function arrL(){ const S=selObjs(); const n=Math.max(1,Math.min(50,Math.round(TW.ops.n))), d=+TW.ops.d||0, i={x:0,y:1,z:2}[TW.ops.eje]; if(!S.length||!d) return; const add=[];
    for(let k=1;k<=n;k++){ const gm={}; S.forEach(s=>{ const o=tClone(s); o.id=tUid(); o.pos[i]=tR(o.pos[i]+d*k); if(o.grupo){ gm[o.grupo]=gm[o.grupo]||tUid(); o.grupo=gm[o.grupo]; } add.push(o); }); }
    TW.objs.push(...add); used('ritmo'); used('repeticion'); changed(); ctx.toast(n+' copia(s) con paso de '+d+' m'); }
  function arrR(){ const S=selObjs(); const n=Math.max(2,Math.min(48,Math.round(TW.ops.rn))); if(!S.length) return; const add=[];
    if(S.every(s=>Math.hypot(s.pos[0],s.pos[1])<.01)) ctx.toast('Consejo: aleja el volumen del origen 0,0 para que el radial se abra');
    for(let k=1;k<n;k++){ const a=2*Math.PI*k/n, gm={}; S.forEach(s=>{ const o=tClone(s); o.id=tUid(); o.pos=[tR(s.pos[0]*Math.cos(a)-s.pos[1]*Math.sin(a)),tR(s.pos[0]*Math.sin(a)+s.pos[1]*Math.cos(a)),s.pos[2]];
      o.rot[2]=tR(((s.rot[2]+a*180/Math.PI)%360+540)%360-180); if(o.grupo){ gm[o.grupo]=gm[o.grupo]||tUid(); o.grupo=gm[o.grupo]; } add.push(o); }); }
    TW.objs.push(...add); used('radial'); used('org-radial'); used('ritmo'); changed(); }
  function align(v){ const S=selObjs(); if(S.length<2||!T) return; const ax={x:0,y:1,z:2}[v[0]], m=v[1]; const all=uBox(aabb(TW.sel)); const tgt=m==='0'?all.min[ax]:m==='1'?all.max[ax]:(all.min[ax]+all.max[ax])/2;
    S.forEach(o=>{ const b=uBox(aabb([o.id])); const cur=m==='0'?b.min[ax]:m==='1'?b.max[ax]:(b.min[ax]+b.max[ax])/2; o.pos[ax]=tR(o.pos[ax]+tgt-cur); }); used('pauta'); changed(); }
  function trf(v){ const S=selObjs(); if(!S.length) return; const o=S[S.length-1];
    if(v==='dimx'){ S.forEach(s=>{ s.esc[0]=tR(s.esc[0]*1.6); }); used('tr-dim'); }
    else if(v==='dimz'){ S.forEach(s=>{ s.esc[2]=tR(s.esc[2]*1.6); }); used('tr-dim'); }
    else if(v==='dimf'){ S.forEach(s=>{ s.esc[2]=tR(Math.max(.1,s.esc[2]*.55)); s.esc[0]=tR(s.esc[0]*1.25); s.esc[1]=tR(s.esc[1]*1.25); }); used('tr-dim'); }
    else if(v==='sus'||v==='sus2'){ const e=o.esc, r=o.rot[2]*Math.PI/180; let lp, es;
      if(v==='sus'){ es=[tR(e[0]*.42),tR(e[1]*.42),tR(e[2]*.45)]; lp=[e[0]/2-es[0]/2+.001,e[1]/2-es[1]/2+.001]; es=[es[0]+.2,es[1]+.2,es[2]+.2]; lp=[lp[0]+.1,lp[1]+.1]; }
      else { es=[tR(e[0]*.4),tR(e[1]*.4),tR(e[2]+.4)]; lp=[0,0]; }
      const pz=v==='sus'?o.pos[2]+e[2]-es[2]+.2:o.pos[2]-.2;
      const vo=tObj('cubo',[tR(o.pos[0]+lp[0]*Math.cos(r)-lp[1]*Math.sin(r)),tR(o.pos[1]+lp[0]*Math.sin(r)+lp[1]*Math.cos(r)),tR(pz)],es,{vacio:true,rot:[0,0,o.rot[2]]});
      TW.objs.push(vo); TW.sel=[vo.id]; used('tr-sus'); used('sustraccion'); if(v==='sus2') used('cerramiento'); TW.csg=true; }
    else if(v==='adi'){ const e=o.esc, r=o.rot[2]*Math.PI/180; const es=[tR(e[0]*.5),tR(e[1]*.6),tR(e[2]*.6)]; const lp=[e[0]/2+es[0]/2,0]; const g=o.grupo||tUid();
      TW.objs.filter(x=>x.grupo===o.grupo&&o.grupo||x.id===o.id).forEach(x=>{ x.grupo=g; });
      const ao=tObj('cubo',[tR(o.pos[0]+lp[0]*Math.cos(r)),tR(o.pos[1]+lp[0]*Math.sin(r)),o.pos[2]],es,{rot:[0,0,o.rot[2]],grupo:g}); TW.objs.push(ao); TW.sel=TW.objs.filter(x=>x.grupo===g).map(x=>x.id); used('tr-adi'); used('aditiva'); }
    changed(); }
  function group(){ if(TW.sel.length<2) return; const g=tUid(); selObjs().forEach(o=>{ o.grupo=g; }); used('aditiva'); used('union'); changed(); ctx.toast('Agrupados: se mueven como una sola forma aditiva'); }
  function ungroup(){ selObjs().forEach(o=>{ o.grupo=null; }); changed(); }
  function doIsec(){ if(TW.sel.length!==2||!T) return; isecClear(); try{ const a=meshPolys(meshes.get(TW.sel[0]).m), b=meshPolys(meshes.get(TW.sel[1]).m); const ps=CSG.intersect(a,b);
      if(!ps.length){ ctx.toast('No se tocan: sin intersección'); return; }
      isec=new T.Mesh(polysGeo(ps),new T.MeshBasicMaterial({color:0xffd27a,transparent:true,opacity:.85,depthTest:false})); isec.renderOrder=998; scene.add(isec); TW.xray=true; Object.keys(matC).forEach(k=>{ matC[k].dispose(); delete matC[k]; }); rebuild(); renderIns(); used('interseccion'); ctx.toast('Intersección en amarillo (se borra al editar)'); }
    catch(_){ ctx.toast('Formas demasiado complejas para intersecar'); } }
  function tpl(k){ const t=TPL[k]; TW.objs=t.f(); TW.sel=[]; t.c.forEach(used); if(!TW.nombre) TW.nombre='Organización '+t.n.toLowerCase(); t.c.forEach(c=>{ if(FC_BY[c]&&!TW.conc.includes(c)) TW.conc.push(c); }); changed(); fit(); ctx.toast('Plantilla '+t.n+' · edítala libremente'); }
  function resetMats(){ Object.keys(matC).forEach(k=>{ const m=matC[k]; if(m.map) m.map.dispose(); m.dispose(); delete matC[k]; }); }

  /* ---------- estudios ---------- */
  function thumb(){ if(!ren) return ''; try{ const vis=gzG.visible; gzG.visible=false; if(selHelp) selHelp.visible=false; ren.render(scene,cam); const c=document.createElement('canvas'); c.width=192; c.height=124; const g=c.getContext('2d'); const s=ren.domElement;
      const k=Math.max(192/s.width,124/s.height); g.drawImage(s,(192-s.width*k)/2,(124-s.height*k)/2,s.width*k,s.height*k); gzG.visible=vis; req(); return c.toDataURL('image/jpeg',.62); }catch(_){ return ''; } }
  function persist(){ api.save(); if(api.save.flush) api.save.flush(); api.onChange&&api.onChange(); }
  function saveStudy(){ if(!TW.objs.length){ ctx.toast('Agrega al menos un volumen'); return; }
    if(!TW.nombre) TW.nombre='Estudio '+(st.estudios.length+1);
    const rec={id:TW.id||('e'+Date.now().toString(36)),nombre:TW.nombre,objetos:tClone(TW.objs).map(o=>({id:o.id,tipo:o.tipo,pos:o.pos,rot:o.rot,esc:o.esc,color:o.color,mat:o.mat,vacio:o.vacio,grupo:o.grupo})),conceptos:TW.conc.filter(id=>FC_BY[id]),fecha:new Date().toISOString(),thumb:thumb()};
    const i=st.estudios.findIndex(e=>e.id===rec.id); if(i>=0) st.estudios[i]=rec; else st.estudios.unshift(rec); TW.id=rec.id; TW.dirty=false; persist(); hdr(); if(TW.drawer) renderDrawer(); ctx.toast('Estudio guardado · '+rec.nombre); }
  function openStudy(id){ const e=st.estudios.find(x=>x.id===id); if(!e) return; TW.objs=(e.objetos||[]).map(tNorm).filter(Boolean); TW.id=e.id; TW.nombre=e.nombre||''; TW.conc=(e.conceptos||[]).filter(i=>FC_BY[i]); TW.sel=[]; TW.used=[];
    TW.hist=[JSON.stringify(TW.objs)]; TW.hi=0; TW.dirty=false; TW._fitted=0; isecClear(); rebuild(); renderIns(); hdr(); if(T){ fit(); TW._fitted=1; } }
  function newStudy(){ TW.objs=[]; TW.id=null; TW.nombre=''; TW.conc=[]; TW.sel=[]; TW.used=[]; TW.hist=[JSON.stringify([])]; TW.hi=0; TW.dirty=false; isecClear(); rebuild(); renderIns(); hdr(); fit(); }
  let delArm=null;
  function renderDrawer(){ const dr=q('dr'); dr.hidden=!TW.drawer; if(!TW.drawer) return;
    dr.innerHTML=`<div class="${p}pnh"><div style="flex:1;min-width:0"><div class="${p}t1">Mis estudios 3D</div><div class="${p}t2">${st.estudios.length} GUARDADO${st.estudios.length===1?'':'S'} · SE VINCULAN A MI LENGUAJE FORMAL</div></div><button class="${p}ib" data-t="drawer" aria-label="Cerrar">${I('close')}</button></div>
      <div class="${w}bd"><button class="${w}b ${w}gr" data-t="new">+ Nuevo estudio en blanco</button>
      ${st.estudios.length?st.estudios.map(e=>`<div class="${w}es${e.id===TW.id?' '+w+'cur':''}">${e.thumb?`<img src="${esc(e.thumb)}" alt="">`:`<div class="${w}ni"></div>`}<div style="min-width:0"><b>${esc(e.nombre||'Sin nombre')}</b><small>${(e.objetos||[]).length} VOL. · ${esc(new Date(e.fecha).toLocaleDateString('es-EC'))}</small><small style="color:var(--done)">${(e.conceptos||[]).filter(i=>FC_BY[i]).map(i=>esc(FC_BY[i].n)).join(' · ')||'<span style="color:var(--faint)">sin conceptos</span>'}</small></div>
        <div class="${w}row"><button class="${w}b" data-t="eopen" data-v="${e.id}">Abrir</button>${renId===e.id?`<label class="${w}f" style="flex:1 1 100%"><input data-q="renin" maxlength="80" value="${esc(e.nombre||'')}" aria-label="Nuevo nombre"></label><button class="${w}b ${w}gr" data-t="erenok" data-v="${e.id}">OK</button>`:`<button class="${w}b" data-t="eren" data-v="${e.id}">Renombrar</button>`}<button class="${w}b ${w}rd" data-t="edel" data-v="${e.id}">${delArm===e.id?'¿Confirmar?':'Borrar'}</button></div></div>`).join(''):`<div class="${w}em">Aún no guardas estudios. Modela, etiqueta conceptos y toca ${I('save',14)}.</div>`}</div>`; }
  function setName(id,v){ v=String(v||'').trim().slice(0,80); if(!v) return; const e=id?st.estudios.find(x=>x.id===id):null;
    if(e){ e.nombre=v; persist(); } if(!id||id===TW.id){ TW.nombre=v; if(TW.id){ const s=st.estudios.find(x=>x.id===TW.id); if(s&&s!==e){ s.nombre=v; persist(); } } } hdr(); }
  function rename(){ const b=root.querySelector('.'+w+'nm'); if(!b||b.style.display==='none') return; const inp=document.createElement('input'); inp.className=w+'ni2'; inp.value=TW.nombre||''; inp.maxLength=80; inp.placeholder='Nombre del estudio'; inp.setAttribute('aria-label','Nombre del estudio');
    b.style.display='none'; b.after(inp); inp.focus(); inp.select(); let done=false;
    const fin=ok=>{ if(done) return; done=true; if(ok) setName(null,inp.value); inp.remove(); b.style.display=''; hdr(); };
    inp.addEventListener('keydown',e=>{ e.stopPropagation(); if(e.key==='Enter') fin(true); else if(e.key==='Escape') fin(false); }); inp.addEventListener('blur',()=>fin(true)); }
  let renId=null;

  /* ---------- exportar ---------- */
  function expPNG(){ if(!ren) return; const vis=gzG.visible; gzG.visible=false; if(selHelp) selHelp.visible=false; ren.render(scene,cam);
    ren.domElement.toBlob(b=>{ gzG.visible=vis; req(); if(b) ctx.download(fname()+'.png',b); else ctx.toast('No se pudo exportar la imagen'); },'image/png'); }
  function fname(){ return ('estudio-'+(TW.nombre||'forma')).toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g,'').replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'').slice(0,60)||'estudio'; }
  function expOBJ(){ if(!T) return; let s=`# DION · Taller de forma 3D · ${TW.nombre||'estudio'}\n# ${(ctx.P&&ctx.P.nombre)||''} · unidades: metros · Z arriba (X=Este, Y=Norte)\n# Conceptos: ${TW.conc.map(i=>FC_BY[i]?FC_BY[i].n:i).join(', ')}\n`; let base=1, k=0; const v=new T.Vector3();
    const out=(m,name)=>{ m.updateMatrixWorld(true); const g=m.geometry, P=g.attributes.position; s+=`o ${name}\n`; for(let i=0;i<P.count;i++){ v.fromBufferAttribute(P,i).applyMatrix4(m.matrixWorld); s+=`v ${v.x.toFixed(4)} ${(-v.z).toFixed(4)} ${v.y.toFixed(4)}\n`; }
      if(g.index){ const ix=g.index.array; for(let i=0;i<ix.length;i+=3) s+=`f ${ix[i]+base} ${ix[i+1]+base} ${ix[i+2]+base}\n`; } else for(let i=0;i<P.count;i+=3) s+=`f ${i+base} ${i+1+base} ${i+2+base}\n`; base+=P.count; };
    TW.objs.forEach(o=>{ if(o.vacio) return; k++; const c=csgList.find(x=>x.id===o.id); out(c?c.m:meshes.get(o.id).m,`${o.tipo}_${k}${c?'_sustraido':''}`); });
    if(!k){ ctx.toast('No hay sólidos para exportar'); return; } ctx.download(fname()+'.obj',new Blob([s],{type:'text/plain'})); ctx.toast('.OBJ listo'+(TW.objs.some(o=>o.vacio)&&!TW.csg?' · activa “sustracción real” para exportar los recortes':'')); }

  /* ---------- eventos UI ---------- */
  root.addEventListener('click',e=>{ const b=e.target.closest('[data-t]'); if(!b||!root.contains(b)||b.disabled) return; const t=b.dataset.t, v=b.dataset.v;
    if(t!=='xm'&&!e.target.closest('[data-q="xm"]')) q('xm').hidden=true;
    if(t==='close') api.onClose();
    else if(t==='undo') undo(); else if(t==='redo') redo();
    else if(t==='save') saveStudy();
    else if(t==='drawer'){ TW.drawer=!TW.drawer; renderDrawer(); }
    else if(t==='xm'){ q('xm').hidden=!q('xm').hidden; }
    else if(t==='png'){ q('xm').hidden=true; expPNG(); } else if(t==='obj'){ q('xm').hidden=true; expOBJ(); }
    else if(t==='rename') rename();
    else if(t==='retry') boot();
    else if(t==='add'){ if(!T){ ctx.toast('El motor 3D aún no carga'); return; } addPrim(v); }
    else if(t==='mode'){ TW.mode=v; hdr(); req(); }
    else if(t==='multi'){ TW.multi=!TW.multi; hdr(); }
    else if(t==='view'){ if(T) setView(v); }
    else if(t==='fit') fit();
    else if(t==='tab'){ if(narrow()&&TW.tab===v) TW.sheet=!TW.sheet; else { TW.tab=v; TW.sheet=true; } renderIns(); hdr(); requestAnimationFrame(resize); }
    else if(t==='pick') setSel([v],TW.multi);
    else if(t==='vacio'){ const S=selObjs(); const on=!S[S.length-1].vacio; S.forEach(o=>{ o.vacio=on; }); if(on){ used('sustraccion'); used('sustractiva'); } changed(); if(on) ctx.toast('Vacío: resta su volumen · activa “sustracción real” en OPERAR'); }
    else if(t==='mat'){ const S=selObjs(); S.forEach(o=>{ o.mat=v; }); if(TW.maqueta&&v!=='maqueta'){ TW.maqueta=false; resetMats(); ctx.toast('Modo maqueta blanca desactivado para ver materiales'); } if(v!=='maqueta') used('textura'); if(v==='color') used('color'); changed(); }
    else if(t==='dup') dup(); else if(t==='del') del(); else if(t==='ground'){ selObjs().forEach(o=>{ o.pos[2]=0; }); changed(); }
    else if(t==='mirror') mirror(v);
    else if(t==='group') group(); else if(t==='ungroup') ungroup();
    else if(t==='align') align(v); else if(t==='arrL') arrL(); else if(t==='arrR') arrR(); else if(t==='tr') trf(v);
    else if(t==='csg'){ TW.csg=!TW.csg; resetMats(); rebuild(); renderIns(); if(TW.csg&&!TW.objs.some(o=>o.vacio)) ctx.toast('Marca un volumen como vacío para ver la sustracción'); }
    else if(t==='isec') doIsec();
    else if(t==='xray'){ TW.xray=!TW.xray; isecClear(); resetMats(); rebuild(); renderIns(); }
    else if(t==='tpl') tpl(v);
    else if(t==='clear'){ if(!TW.objs.length) return; TW.objs=[]; TW.sel=[]; changed(); ctx.toast('Escena vacía · Deshacer para recuperar'); }
    else if(t==='snap'){ TW.snap=+v; renderIns(); } else if(t==='iman'){ TW.iman=!TW.iman; renderIns(); }
    else if(t==='maq'){ TW.maqueta=!TW.maqueta; resetMats(); rebuild(); renderIns(); }
    else if(t==='hum'){ TW.humano=!TW.humano; placeHuman(); req(); renderIns(); if(TW.humano) used('escala-humana'); }
    else if(t==='sol'){ TW.sol=!TW.sol; updSun(); renderIns(); }
    else if(t==='ctog'){ const i=TW.conc.indexOf(v); if(i>=0) TW.conc.splice(i,1); else TW.conc.push(v); TW.dirty=true; renderIns(); hdr(); }
    else if(t==='new'){ newStudy(); TW.drawer=false; renderDrawer(); ctx.toast('Estudio nuevo'); }
    else if(t==='eopen'){ openStudy(v); TW.drawer=false; renderDrawer(); }
    else if(t==='eren'){ renId=v; renderDrawer(); const i=q('renin'); if(i){ i.focus(); i.select(); i.addEventListener('keydown',ev=>{ ev.stopPropagation(); if(ev.key==='Enter'){ setName(v,i.value); renId=null; renderDrawer(); } }); } }
    else if(t==='erenok'){ const i=q('renin'); if(i) setName(v,i.value); renId=null; renderDrawer(); }
    else if(t==='edel'){ if(delArm!==v){ delArm=v; renderDrawer(); setTimeout(()=>{ if(delArm===v){ delArm=null; if(alive) renderDrawer(); } },3500); return; }
      delArm=null; st.estudios=st.estudios.filter(x=>x.id!==v); if(TW.id===v){ TW.id=null; TW.dirty=true; } persist(); renderDrawer(); hdr(); ctx.toast('Estudio borrado'); }
  });
  root.addEventListener('change',e=>{ const inp=e.target.closest('[data-f]'); if(!inp) return; const [k,i]=inp.dataset.f.split('.');
    if(k==='ops'){ TW.ops[i]=i==='eje'?inp.value:(parseFloat(String(inp.value).replace(',','.'))||0); return; }
    if(k==='mes'){ TW.mes=+inp.value; updSun(); renderIns(); return; }
    if(k==='hora'||k==='q') return;
    const S=selObjs(), o=S[S.length-1]; if(!o) return;
    if(k==='color'){ S.forEach(x=>{ x.color=inp.value; x.mat='color'; }); if(TW.maqueta){ TW.maqueta=false; resetMats(); } used('color'); changed(); return; }
    let val=parseFloat(String(inp.value).replace(',','.')); if(!isFinite(val)) { updFields(); return; } const ix=+i;
    if(k==='pos'){ const d=val-o.pos[ix]; S.forEach(x=>{ x.pos[ix]=tR(x.pos[ix]+d); }); }
    else if(k==='rot'){ o.rot[ix]=tR(((val%360)+540)%360-180); }
    else if(k==='esc'){ o.esc[ix]=tR(Math.max(.02,val)); }
    changed(); });
  root.addEventListener('input',e=>{ const inp=e.target.closest('[data-f]'); if(!inp) return; const k=inp.dataset.f;
    if(k==='hora'){ TW.hora=+inp.value; const hv=q('hv'); if(hv) hv.textContent=fmtH(TW.hora); updSun(); }
    else if(k==='q'){ TW.q=inp.value; const qq=TW.q.trim().toLowerCase(); const list=qq?FC_ALL.filter(c=>(c.n+' '+c.id).toLowerCase().includes(qq)).slice(0,40):[]; const cl=q('clist'); if(cl) cl.innerHTML=list.map(c=>`<button class="${w}cp${TW.conc.includes(c.id)?' '+w+'on':''}" data-t="ctog" data-v="${c.id}">${esc(c.n)} <b>${c.code}</b></button>`).join(''); } });
  const onKey=e=>{ if(!alive||!root.isConnected) return; const ae=document.activeElement; if(ae&&ae!==document.body&&!root.contains(ae)) return; const tg=e.target; const typing=tg&&(tg.tagName==='INPUT'||tg.tagName==='TEXTAREA'||tg.tagName==='SELECT');
    const k=e.key.toLowerCase();
    if((e.ctrlKey||e.metaKey)&&k==='z'&&!typing){ e.preventDefault(); if(e.shiftKey) redo(); else undo(); }
    else if((e.ctrlKey||e.metaKey)&&k==='y'&&!typing){ e.preventDefault(); redo(); }
    else if((e.ctrlKey||e.metaKey)&&k==='d'&&!typing){ e.preventDefault(); dup(); }
    else if((e.ctrlKey||e.metaKey)&&k==='s'){ e.preventDefault(); saveStudy(); }
    else if((k==='delete'||k==='backspace')&&!typing&&TW.sel.length){ e.preventDefault(); del(); }
    else if(k==='escape'&&!typing){ if(TW.drawer){ TW.drawer=false; renderDrawer(); } else if(TW.sel.length){ TW.sel=[]; styleSel(); styleCSG(); renderIns(); } }
    else if(!typing&&!e.ctrlKey&&!e.metaKey&&({g:'mover',r:'rotar',s:'escalar',q:'sel'})[k]){ TW.mode=({g:'mover',r:'rotar',s:'escalar',q:'sel'})[k]; hdr(); req(); } };
  document.addEventListener('keydown',onKey,true);

  /* ---------- arranque ---------- */
  function boot(){ msg(null); const m=q('msg'); m.style.display=''; m.innerHTML=`<div class="${p}hud"><div class="${w}spin"></div><b>Cargando motor 3D</b><p>three.js r128 · se descarga solo la primera vez</p></div>`;
    loadThree().then(TH=>{ if(!alive) return; T=TH; if(!initThree()) return; msg(null); bindCanvas(); resize();
      if('ResizeObserver' in window){ ro=new ResizeObserver(()=>resize()); ro.observe(cvw); } else window.addEventListener('resize',resize); req(); })
    .catch(err=>{ if(!alive) return; msg('No se pudo cargar el motor 3D','three.js se descarga de cdnjs.cloudflare.com la primera vez ('+(err&&err.message||'error')+'). Revisa tu conexión y vuelve a intentar.',true); }); }
  hdr(); renderIns(); renderDrawer(); boot();

  return { destroy(){ alive=false; clearTimeout(csgT); if(raf) cancelAnimationFrame(raf); document.removeEventListener('keydown',onKey,true); if(ro) ro.disconnect(); else window.removeEventListener('resize',resize);
      if(ren){ try{ clearCSG(); scene.traverse(o=>{ if(o.geometry&&!Object.values(geoC).includes(o.geometry)&&!Object.values(edgeC).includes(o.geometry)) o.geometry.dispose(); });
        Object.values(geoC).forEach(g=>g.dispose()); Object.values(edgeC).forEach(g=>g.dispose()); resetMats(); Object.values(lineM).forEach(m=>m.dispose()); isecClear(); ren.dispose(); if(ren.forceContextLoss) ren.forceContextLoss(); }catch(_){} }
      root.remove(); },
    tagConcept(id){ if(FC_BY[id]&&!TW.conc.includes(id)){ TW.conc.push(id); TW.dirty=true; } TW.tab='con'; TW.sheet=true; renderIns(); hdr(); },
    open(id){ if(id) openStudy(id); } };
}

DION_MOD.fundamentos = {
  titulo:'Fundamentos del diseño I · II',
  sub:'Herramientas de la forma, en orden',
  render(el, ctx){
    injectCSS('mod-fundamentos-css', fuCSS()+tCSS(FX));
    const p=FX, esc=ctx.esc;
    let st=fuNorm(ctx.get('fundamentos'));
    const save=debounce(()=>{ st.resumen=fuResumen(st,ctx); Promise.resolve(ctx.set('fundamentos',Object.assign({},ctx.get('fundamentos')||{},{elegidos:st.elegidos.slice(),notas:Object.assign({},st.notas),bocetos:JSON.parse(JSON.stringify(st.bocetos)),resumen:st.resumen,estudios:JSON.parse(JSON.stringify(st.estudios))}))).catch(()=>ctx.toast('No se pudo guardar')); },600);
    el.innerHTML='';
    const root=document.createElement('div'); root.className=p+'r m-fundamentos'; el.appendChild(root);
    const G=(g,cls)=>glyphSVG(g,p,cls);
    let io=null, ro=null; const cleanups=[];
    if(!fuUI.vista) fuUI.vista = (el.clientWidth && el.clientWidth<640) ? 'lista' : 'const';

    root.innerHTML=`
      <div class="${p}top">
        <div class="${p}brand"><div class="${p}bg">${G(R(14,14,72,72,0)+C(50,50,24,1,'~k')+L(14,86,86,14,2)+DOT(50,50,2.4))}</div>
          <div style="min-width:0"><div class="${p}t1">Fundamentos del diseño I · II</div><div class="${p}t2">CHING · WONG · GESTALT — ${FC_ALL.length} HERRAMIENTAS EN 14 UNIDADES</div></div></div>
        <div class="${p}meter"><b>MI LENGUAJE FORMAL <em data-r="cnt"></em></b><div class="${p}bar"><i data-r="bar"></i></div></div>
        <div class="${p}seg" role="group" aria-label="Vista">
          <button data-a="vista" data-v="const" aria-pressed="false">${ico('node',16)}<span>CONSTELACIÓN</span></button>
          <button data-a="vista" data-v="lista" aria-pressed="false">${ico('list',16)}<span>LISTA</span></button></div>
        <button class="${p}btn ${p}ok" data-a="panel">${ico('star',16)}<span class="${p}lt">Mi lenguaje</span><span class="${p}n" data-r="n2">0</span></button>
        <button class="${p}btn ${p}t3d" data-a="taller" title="Modela con las formas de los fundamentos"><svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round" aria-hidden="true"><path d="M12 2.5l8.5 4.8v9.4L12 21.5l-8.5-4.8V7.3z"/><path d="M3.5 7.3L12 12l8.5-4.7M12 12v9.5"/></svg><span>Taller de forma 3D</span></button>
        <button class="${p}btn ${p}pri" data-a="next"><span>Siguiente estación</span> →</button>
      </div>
      <div class="${p}units" data-r="units"></div>
      <div class="${p}main" data-r="main"></div>`;
    const $=s=>root.querySelector(`[data-r="${s}"]`);
    const main=$('main');

    const cardHTML=c=>`<button class="${p}card ${p}paused${st.elegidos.includes(c.id)?' '+p+'on':''}" data-c="${c.id}" aria-label="${esc(c.code+' '+c.n)}"><span class="${p}cg">${G(c.g)}</span><span class="${p}cc">${c.code}</span><span class="${p}cn">${esc(c.n)}</span><i class="${p}ck">${ico('check',14)}</i></button>`;
    const uHead=u=>`<div class="${p}uh" data-u="${u.i}"><div class="${p}unum">${String(u.i+1).padStart(2,'0')}</div><div style="min-width:0"><div class="${p}uname">${esc(u.n)}</div><div class="${p}usub">${esc(u.s)} · ${u.cs.length} herramientas · ${esc(u.ref)}</div><div class="${p}upas">${u.pasos.map(x=>`<span class="${p}chip" title="${esc(FUN_PASOS[x]||'')}">${x}</span>`).join('')}<span class="${p}chip ${p}k" data-uc="${u.i}"></span></div></div></div>`;

    function counts(){
      const n=st.elegidos.length;
      $('cnt').textContent=n+'/'+FC_ALL.length; $('bar').style.width=(n/FC_ALL.length*100)+'%'; $('n2').textContent=n;
      root.querySelectorAll('[data-uc]').forEach(x=>{ const u=FU[+x.dataset.uc]; const k=u.cs.filter(c=>st.elegidos.includes(c.id)).length; x.textContent=k+' EN USO'; x.style.display=k?'':'none'; });
      $('units').innerHTML=FU.map(u=>{ const k=u.cs.filter(c=>st.elegidos.includes(c.id)).length; return `<button class="${p}uc" data-a="unit" data-u="${u.i}"><b>${String(u.i+1).padStart(2,'0')}</b>${esc(u.n)}${k?`<i>●${k}</i>`:''}</button>`; }).join('');
      root.querySelectorAll('[data-c]').forEach(b=>b.classList.toggle(p+'on',st.elegidos.includes(b.dataset.c)));
      root.querySelectorAll('[data-a="vista"]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.v===fuUI.vista)));
    }
    function observe(rootEl){
      if(io) io.disconnect();
      if(!('IntersectionObserver' in window)){ root.querySelectorAll('.'+p+'card').forEach(c=>c.classList.remove(p+'paused')); return; }
      io=new IntersectionObserver(es=>es.forEach(e=>e.target.classList.toggle(p+'paused',!e.isIntersecting)),{root:rootEl,rootMargin:'80px'});
      root.querySelectorAll('.'+p+'main .'+p+'card').forEach(c=>io.observe(c));
    }

    /* ---------- constelación / escalera ---------- */
    let view=null, stage=null, vp=null, blocks=[];
    function layout(){
      blocks=FU.map((u,i)=>{ const rows=Math.ceil(u.cs.length/COLS); const w=COLS*CARD_W+(COLS-1)*GAP+32; const h=HEADH+rows*CARD_H+(rows-1)*GAP+PADB; return {x:40+i*STEPX,y:40+i*STEPY,w,h}; });
    }
    function applyView(){
      if(!stage) return;
      stage.style.transform=`translate(${view.tx}px,${view.ty}px) scale(${view.s})`;
      stage.classList.toggle(p+'far',view.s<0.42);
      const zl=root.querySelector('.'+p+'zl'); if(zl) zl.textContent=Math.round(view.s*100)+'%';
      fuUI.view=Object.assign({},view);
    }
    function focusUnit(i,anim){
      const b=blocks[i]; const W=vp.clientWidth||800, H=vp.clientHeight||500;
      const s=Math.max(0.3,Math.min(1,(W-24)/b.w,(H-24)/b.h));
      view={s,tx:W/2-(b.x+b.w/2)*s,ty:Math.max(12,(H-b.h*s)/2)-b.y*s};
      if(anim){ stage.style.transition='transform .55s cubic-bezier(.2,.8,.2,1)'; setTimeout(()=>{ if(stage) stage.style.transition=''; },600); }
      applyView();
    }
    function fitAll(){
      const W=vp.clientWidth||800, H=vp.clientHeight||500; const last=blocks[blocks.length-1];
      const tw=last.x+last.w+40, th=Math.max(...blocks.map(b=>b.y+b.h))+40;
      const s=Math.min((W-20)/tw,(H-20)/th);
      view={s,tx:(W-tw*s)/2,ty:(H-th*s)/2};
      stage.style.transition='transform .55s cubic-bezier(.2,.8,.2,1)'; setTimeout(()=>{ if(stage) stage.style.transition=''; },600);
      applyView();
    }
    function zoomAt(f,cx,cy){
      const s=Math.max(0.08,Math.min(2.2,view.s*f)); const k=s/view.s;
      view={s,tx:cx-(cx-view.tx)*k,ty:cy-(cy-view.ty)*k}; applyView();
    }
    function renderConst(){
      layout();
      const last=blocks[blocks.length-1]; const tw=last.x+last.w+400, th=Math.max(...blocks.map(b=>b.y+b.h))+400;
      let stair=''; blocks.forEach((b,i)=>{ const x=b.x+16+33, y=b.y+HEADH/2; stair+= (i?`L${x} ${blocks[i-1].y+HEADH/2}L${x} ${y}`:`M${x} ${y}`); });
      let stars=''; for(let i=0;i<120;i++){ const x=(i*977)%tw, y=(i*613)%th; stars+=`<circle cx="${x}" cy="${y}" r="${(i%3)*.6+.6}" fill="rgba(var(--acc-rgb),${.12+(i%5)*.05})"/>`; }
      main.innerHTML=`<div class="${p}vp" data-r="vp"><div class="${p}stage" data-r="stage" style="width:${tw}px;height:${th}px">
        <svg class="${p}stair" width="${tw}" height="${th}">${stars}<path class="${p}sg" d="${stair}"/><path class="${p}sl" d="${stair}"/></svg>
        ${FU.map((u,i)=>`<section class="${p}blk" style="left:${blocks[i].x}px;top:${blocks[i].y}px;width:${blocks[i].w}px">${uHead(u)}<div class="${p}grid">${u.cs.map(cardHTML).join('')}</div></section>`).join('')}
      </div></div>
      <div class="${p}zoom"><button data-a="zin" aria-label="Acercar">${ico('plus')}</button><button data-a="zout" aria-label="Alejar">${ico('minus')}</button><button data-a="fit" aria-label="Ver toda la escalera">${ico('fit')}</button><div class="${p}zl"></div></div>
      <div class="${p}hint">ARRASTRA · PELLIZCA · RUEDA = ZOOM · TOCA UNA HERRAMIENTA</div>`;
      vp=$('vp'); stage=$('stage');
      if(fuUI.view) { view=Object.assign({},fuUI.view); applyView(); } else { view={s:1,tx:0,ty:0}; requestAnimationFrame(()=>{ if(vp&&vp.isConnected) focusUnit(0); }); applyView(); }
      /* gestos */
      const ptr=new Map(); let g=null;
      const rel=e=>{ const r=vp.getBoundingClientRect(); return {x:e.clientX-r.left,y:e.clientY-r.top}; };
      vp.addEventListener('pointerdown',e=>{
        if(e.button>0) return;
        try{ vp.setPointerCapture(e.pointerId); }catch(_){}
        ptr.set(e.pointerId,rel(e));
        if(ptr.size===1){ const q=rel(e); g={x0:q.x,y0:q.y,tx:view.tx,ty:view.ty,moved:0,tgt:e.target.closest('[data-c],[data-u]')}; vp.classList.add(p+'drag'); }
        else if(ptr.size===2&&g){ const [a,b]=[...ptr.values()]; g.pinch={d:Math.hypot(a.x-b.x,a.y-b.y)||1,mx:(a.x+b.x)/2,my:(a.y+b.y)/2,v:Object.assign({},view)}; g.moved=99; }
      });
      vp.addEventListener('pointermove',e=>{
        if(!ptr.has(e.pointerId)||!g) return; ptr.set(e.pointerId,rel(e));
        if(g.pinch&&ptr.size>=2){ const [a,b]=[...ptr.values()]; const d=Math.hypot(a.x-b.x,a.y-b.y); const mx=(a.x+b.x)/2,my=(a.y+b.y)/2; const v=g.pinch.v;
          const s=Math.max(0.08,Math.min(2.2,v.s*d/g.pinch.d)); const k=s/v.s; view={s,tx:mx-(g.pinch.mx-v.tx)*k,ty:my-(g.pinch.my-v.ty)*k}; applyView(); }
        else if(ptr.size===1&&!g.pinch){ const q=rel(e); const dx=q.x-g.x0,dy=q.y-g.y0; g.moved=Math.max(g.moved,Math.hypot(dx,dy)); if(g.moved>4){ view.tx=g.tx+dx; view.ty=g.ty+dy; applyView(); } }
      });
      const up=e=>{
        if(!ptr.has(e.pointerId)) return; ptr.delete(e.pointerId);
        if(ptr.size===0){ vp.classList.remove(p+'drag'); if(g&&g.moved<8&&g.tgt&&e.type==='pointerup'){ if(g.tgt.dataset.c) openFicha(g.tgt.dataset.c); else focusUnit(+g.tgt.dataset.u,true); } g=null; }
        else if(ptr.size===1&&g){ const q=[...ptr.values()][0]; g.pinch=null; g.x0=q.x; g.y0=q.y; g.tx=view.tx; g.ty=view.ty; }
      };
      vp.addEventListener('pointerup',up); vp.addEventListener('pointercancel',up);
      vp.addEventListener('wheel',e=>{ e.preventDefault(); const q=rel(e); if(e.ctrlKey||Math.abs(e.deltaY)>=Math.abs(e.deltaX)) zoomAt(Math.exp(-e.deltaY*(e.ctrlKey?0.01:0.0016)),q.x,q.y); else { view.tx-=e.deltaX; applyView(); } },{passive:false});
      observe(vp);
    }
    function renderList(){
      main.innerHTML=`<div class="${p}list" data-r="list">${FU.map(u=>`<section class="${p}lsec" data-ls="${u.i}">${uHead(u)}<div class="${p}grid">${u.cs.map(cardHTML).join('')}</div></section>`).join('')}</div>`;
      const ls=$('list'); ls.scrollTop=fuUI.listTop||0; ls.addEventListener('scroll',()=>{ fuUI.listTop=ls.scrollTop; },{passive:true});
      stage=null; vp=null; observe(ls);
    }
    function renderMain(){ if(fuUI.vista==='lista') renderList(); else renderConst(); counts(); }

    /* ---------- ficha ---------- */
    let ov=null;
    function openFicha(id){ fuUI.ficha=id; renderFicha(); }
    function closeFicha(){ fuUI.ficha=null; if(ov){ ov.remove(); ov=null; } }
    function renderFicha(){
      const c=FC_BY[fuUI.ficha]; if(!c){ closeFicha(); return; }
      const u=FU[c.u]; const on=st.elegidos.includes(c.id);
      const bs=(st.bocetos[c.id]||[]).map(b=>Object.assign({},b)).concat(fuTmp[c.id]||[]);
      const idx=FC_ALL.indexOf(c);
      if(!ov){ ov=document.createElement('div'); ov.className=p+'ov'; root.appendChild(ov);
        ov.addEventListener('pointerdown',e=>{ if(e.target===ov) closeFicha(); }); }
      ov.innerHTML=`<div class="${p}fx ${p}hud" role="dialog" aria-label="${esc(c.n)}">
        <div class="${p}fh"><span class="${p}ul">UNIDAD ${String(u.i+1).padStart(2,'0')} · ${esc(u.n)} · ${idx+1}/${FC_ALL.length}</span>
          <button class="${p}ib" data-a="fprev" aria-label="Anterior">${ico('prev')}</button><button class="${p}ib" data-a="fnext" aria-label="Siguiente">${ico('next')}</button><button class="${p}ib" data-a="fclose" aria-label="Cerrar">${ico('close')}</button></div>
        <div class="${p}fl">
          <div class="${p}big">${G(c.g)}</div>
          <div><div class="${p}fcode">${c.code} · ${esc(u.s.toUpperCase())}</div><div class="${p}fn">${esc(c.n)}</div></div>
          <div class="${p}upas">${u.pasos.map(x=>`<span class="${p}chip">${x} · ${esc(FUN_PASOS[x]||'')}</span>`).join('')}</div>
        </div>
        <div class="${p}fr">
          <div class="${p}sec"><h4>Definición</h4><p>${esc(c.d)}</p></div>
          <div class="${p}sec ${p}k"><h4>Cómo aplicarlo en tu proyecto</h4><p>${esc(fuSubst(c.a,ctx))}</p></div>
          <div class="${p}sec ${p}m"><h4>Obra de referencia</h4><p>${esc(c.ej)}</p></div>
          <div class="${p}act ${p}hud">
            <button class="${p}tog" data-a="toggle" aria-pressed="${on}"><span class="${p}bx">${on?ico('check',18):''}</span>${on?'Lo aplico en mi proyecto':'¿Lo aplicas en tu proyecto? Toca para marcar'}</button>
            <div><div class="${p}lab"><span>Nota corta · cómo lo uso</span><span data-r="nc">${(st.notas[c.id]||'').length}/280</span></div>
              <textarea class="${p}ta" data-r="nota" maxlength="280" ${on?'':'disabled'} placeholder="${on?'Ej.: patio central en U abierto a la brisa del suroeste':'Marca la herramienta para escribir tu nota'}">${esc(st.notas[c.id]||'')}</textarea></div>
            <div><div class="${p}lab"><span>Bocetos de esta herramienta</span><span>${bs.length}</span></div>
              <div class="${p}th">${bs.map(b=>`<div class="${p}tb${b.tmp?' '+p+'tmp':''}" style="background-image:url('${esc(b.url)}')"><button class="${p}tx" data-a="delb" data-b="${esc(b.id)}" aria-label="Quitar boceto">${ico('close',14)}</button>${b.tmp?'<em>NO GUARDADO</em>':''}</div>`).join('')}
                <button class="${p}up" data-a="upb">${ico('up',22)}SUBIR<br>BOCETO</button><input type="file" accept="image/*" multiple hidden data-r="file"></div></div>
            <div><div class="${p}lab"><span>Estudios 3D con esta herramienta</span><span>${st.estudios.filter(e=>(e.conceptos||[]).includes(c.id)).length}</span></div>
              <div style="display:flex;gap:6px;flex-wrap:wrap">${st.estudios.filter(e=>(e.conceptos||[]).includes(c.id)).map(e=>`<button class="${p}btn" data-a="est" data-id="${esc(e.id)}">${esc(e.nombre||'Estudio')}</button>`).join('')}
              <button class="${p}btn ${p}t3d" data-a="t3dc">Probar en el Taller 3D</button></div></div>
          </div>
          <div class="${p}sec ${p}m"><h4>Fuente</h4><p>${esc(u.ref)}</p></div>
        </div></div>`;
      const ta=ov.querySelector('[data-r="nota"]');
      ta.addEventListener('input',()=>{ st.notas[c.id]=ta.value; ov.querySelector('[data-r="nc"]').textContent=ta.value.length+'/280'; save(); });
      const fi=ov.querySelector('[data-r="file"]');
      fi.addEventListener('change',()=>{ if(fi.files&&fi.files.length) subir([...fi.files],c.id); fi.value=''; });
    }
    async function subir(files,cid){
      let res=[]; try{ res=await ctx.upload(files)||[]; }catch(_){ res=[]; }
      if(res.length){ st.bocetos[cid]=(st.bocetos[cid]||[]).concat(res.map(r=>({id:r.id,url:r.url}))); save(); ctx.toast(res.length+' boceto(s) guardado(s)'); }
      else { fuTmp[cid]=(fuTmp[cid]||[]).concat(files.map((f,i)=>({id:'tmp-'+Date.now()+'-'+i,url:URL.createObjectURL(f),tmp:true}))); ctx.toast('Sin permiso de subida: el boceto se ve solo en esta sesión y NO se guardó'); }
      if(fuUI.ficha===cid) renderFicha();
    }

    /* ---------- panel Mi lenguaje formal ---------- */
    let pn=null;
    function renderPanel(){
      if(!fuUI.panel){ if(pn){ pn.remove(); pn=null; } return; }
      if(!pn){ pn=document.createElement('aside'); pn.className=p+'pn'; root.appendChild(pn); }
      const txt=fuResumen(st,ctx);
      const sel=FU.map(u=>({u,cs:u.cs.filter(c=>st.elegidos.includes(c.id))}));
      pn.innerHTML=`<div class="${p}pnh"><div style="flex:1;min-width:0"><div class="${p}t1">Mi lenguaje formal</div><div class="${p}t2">${st.elegidos.length} HERRAMIENTAS · ALIMENTA LA TESIS CAP. 8.1</div></div><button class="${p}ib" data-a="panel" aria-label="Cerrar panel">${ico('close')}</button></div>
        <div class="${p}pnb">
          <div><div class="${p}lab"><span>Cobertura por unidad</span></div><div class="${p}cov">${sel.map((x,i)=>`<div title="${esc(x.u.n)}"><i style="height:${x.cs.length/x.u.cs.length*100}%"></i><span>${i+1}</span></div>`).join('')}</div></div>
          <div style="margin-top:8px">${st.elegidos.length?sel.filter(x=>x.cs.length).map(x=>`<div class="${p}pu">${String(x.u.i+1).padStart(2,'0')} · ${esc(x.u.n)}</div>`+x.cs.map(c=>`<button class="${p}pi" data-a="open" data-id="${c.id}"><span class="${p}pg">${G(c.g)}</span><span style="min-width:0"><b>${c.code} ${esc(c.n)}</b><small>${st.notas[c.id]?esc(st.notas[c.id]):'<i style="color:var(--faint)">Sin nota</i>'}${(st.bocetos[c.id]||[]).length?` · ${(st.bocetos[c.id]||[]).length} boceto(s)`:''}</small></span></button>`).join('<div style="height:6px"></div>')).join(''):`<div class="${p}empty">Aún no marcas herramientas. Abre cualquier tarjeta y toca <b>“Lo aplico en mi proyecto”</b>: aquí se arma tu lenguaje formal y el texto para la tesis.</div>`}</div>
          <div><div class="${p}lab"><span>Estudios de forma 3D</span><span>${st.estudios.length}</span></div>
            <div style="display:flex;flex-direction:column;gap:6px">${st.estudios.map(e=>`<button class="${p}pi" data-a="est" data-id="${esc(e.id)}"><span class="${p}pg" style="width:66px;background:#06101a center/cover no-repeat${e.thumb?`;background-image:url('${esc(e.thumb)}')`:''}"></span><span style="min-width:0"><b>${esc(e.nombre||'Estudio')}</b><small>${(e.objetos||[]).length} volúmenes · ${(e.conceptos||[]).filter(i=>FC_BY[i]).map(i=>esc(FC_BY[i].n)).join(' · ')||'sin conceptos'}</small></span></button>`).join('')}
            <button class="${p}btn ${p}t3d" data-a="taller">${st.estudios.length?'Abrir Taller de forma 3D':'Crear mi primer estudio 3D'}</button></div></div>
          <div><div class="${p}lab"><span>Resumen para la tesis · 8.1</span><span class="${p}chip ${p}w">POR VERIFICAR</span></div><div class="${p}res">${txt?esc(txt):'—'}</div>
            <div style="display:flex;gap:8px;margin-top:8px;flex-wrap:wrap"><button class="${p}btn" data-a="copy" ${txt?'':'disabled'}>${ico('copy',16)}Copiar</button><button class="${p}btn" data-a="dltxt" ${txt?'':'disabled'}>${ico('dl',16)}Descargar .txt</button></div></div>
        </div>`;
    }

    /* ---------- eventos ---------- */
    root.addEventListener('click',e=>{
      const b=e.target.closest('[data-a],[data-c]'); if(!b||!root.contains(b)) return;
      if(b.dataset.c && !b.dataset.a){ if(fuUI.vista==='lista'||e.detail===0) openFicha(b.dataset.c); return; }
      const a=b.dataset.a;
      if(a==='vista'){ if(fuUI.vista!==b.dataset.v){ fuUI.vista=b.dataset.v; renderMain(); } }
      else if(a==='next'){ save.flush(); ctx.next(); }
      else if(a==='panel'){ fuUI.panel=!fuUI.panel; renderPanel(); }
      else if(a==='unit'){ const i=+b.dataset.u; root.querySelectorAll('.'+p+'uc').forEach(x=>x.classList.toggle(p+'act',x===b));
        if(fuUI.vista==='lista'){ const s=root.querySelector(`[data-ls="${i}"]`); if(s) s.scrollIntoView({behavior:'smooth',block:'start'}); } else if(vp) focusUnit(i,true); }
      else if(a==='zin'&&vp) zoomAt(1.25,vp.clientWidth/2,vp.clientHeight/2);
      else if(a==='zout'&&vp) zoomAt(0.8,vp.clientWidth/2,vp.clientHeight/2);
      else if(a==='fit'&&vp) fitAll();
      else if(a==='fclose') closeFicha();
      else if(a==='fprev'||a==='fnext'){ const i=FC_ALL.findIndex(c=>c.id===fuUI.ficha); const n=FC_ALL[(i+(a==='fnext'?1:-1)+FC_ALL.length)%FC_ALL.length]; openFicha(n.id); }
      else if(a==='toggle'){ const id=fuUI.ficha; const k=st.elegidos.indexOf(id); if(k>=0) st.elegidos.splice(k,1); else st.elegidos.push(id); save(); renderFicha(); counts(); renderPanel(); }
      else if(a==='upb'){ const fi=ov&&ov.querySelector('[data-r="file"]'); if(fi) fi.click(); }
      else if(a==='delb'){ const id=fuUI.ficha, bid=b.dataset.b; if(fuTmp[id]) fuTmp[id]=fuTmp[id].filter(x=>{ if(x.id===bid){ try{URL.revokeObjectURL(x.url);}catch(_){} return false;} return true; }); if(st.bocetos[id]){ st.bocetos[id]=st.bocetos[id].filter(x=>x.id!==bid); if(!st.bocetos[id].length) delete st.bocetos[id]; save(); } renderFicha(); renderPanel(); }
      else if(a==='open'){ openFicha(b.dataset.id); }
      else if(a==='copy'){ const t=fuResumen(st,ctx); try{ navigator.clipboard.writeText(t).then(()=>ctx.toast('Resumen copiado'),()=>ctx.toast('No se pudo copiar')); }catch(_){ ctx.toast('No se pudo copiar'); } }
      else if(a==='dltxt'){ ctx.download('lenguaje-formal-'+((ctx.P&&ctx.P.id)||'proyecto')+'.txt', fuResumen(st,ctx)); }
      else if(a==='taller') openTaller();
      else if(a==='est') openTaller(b.dataset.id);
      else if(a==='t3dc') openTaller(null,fuUI.ficha);
    });
    /* ---------- taller de forma 3D ---------- */
    let tw=null;
    function openTaller(sid,cid){
      if(fuUI.ficha) closeFicha(); if(fuUI.panel){ fuUI.panel=false; renderPanel(); }
      fuUI.taller=true;
      if(!tw) tw=fuTaller(root,ctx,{st,save,onChange:()=>{ counts(); renderPanel(); },onClose:closeTaller});
      if(sid) tw.open(sid); if(cid) tw.tagConcept(cid);
    }
    function closeTaller(){ fuUI.taller=false; if(tw){ tw.destroy(); tw=null; } counts(); }
    cleanups.push(()=>{ if(tw){ tw.destroy(); tw=null; } });
    const onKey=e=>{ if(!root.isConnected||fuUI.taller) return; if(fuUI.ficha){ if(e.key==='Escape') closeFicha(); else if(e.target.tagName!=='TEXTAREA'&&(e.key==='ArrowRight'||e.key==='ArrowLeft')){ const btn=ov&&ov.querySelector(`[data-a="${e.key==='ArrowRight'?'fnext':'fprev'}"]`); if(btn) btn.click(); } } else if(fuUI.panel&&e.key==='Escape'){ fuUI.panel=false; renderPanel(); } };
    document.addEventListener('keydown',onKey); cleanups.push(()=>document.removeEventListener('keydown',onKey));
    if('ResizeObserver' in window){ let lw=0; ro=new ResizeObserver(()=>{ const w=main.clientWidth; if(vp&&lw&&Math.abs(w-lw)>40&&!fuUI.view) focusUnit(0); lw=w; }); ro.observe(main); }

    renderMain();
    if(fuUI.ficha) renderFicha();
    renderPanel();
    if(fuUI.taller) openTaller();
    return ()=>{ save.flush(); if(io) io.disconnect(); if(ro) ro.disconnect(); cleanups.forEach(f=>f()); };
  }
};

/* ===================== DIBUJO · DATOS ===================== */
const DX='m-dibujo-';
/* técnicas de representación: id, nombre, sistema, definición, uso en el proyecto, pasos, pasos geo relacionados, glifo */
const TEC = [
{id:'monge',n:'Sistema diédrico (Monge)',s:'Proyección ortogonal · 2 planos',
 d:'Gaspard Monge (Géométrie descriptive, 1799) representa un objeto 3D por sus proyecciones ortogonales sobre dos planos perpendiculares (horizontal y vertical) abatidos sobre la línea de tierra (LT). Cada punto tiene proyección horizontal (planta) y vertical (alzado), unidas por una línea de referencia perpendicular a LT.',
 u:'Es la base de planta, corte y fachada: toda lámina técnica del proyecto es diédrico. Úsalo para verificar que plantas, cortes y alzados coincidan en ejes y niveles, y para hallar verdaderas magnitudes de caras inclinadas.',
 p:['Fija la línea de tierra y los planos de proyección (PH y PV).','Proyecta cada vértice ortogonalmente sobre PH (planta) y PV (alzado).','Une proyecciones del mismo punto con líneas de referencia ⟂ a LT.','Añade un tercer plano de perfil si hay caras que no se leen.','Distingue visto (continua) y oculto (discontinua).'],
 geo:['geo-02','geo-07','geo-22'],
 g:L(6,50,94,50,0,'~b')+T(86,46,'LT',6)+L(30,20,30,80,1)+DOT(30,24,2.6,0)+DOT(30,76,2.6,1)+T(34,22,"A''",7)+T(34,82,"A'",7)+PL([[52,24],[82,24],[82,42],[52,42]],2,'',1)+PL([[52,58],[82,58],[82,84],[52,84]],3,'',1)+W('M52 42V58M82 42V58')},
{id:'acotado',n:'Sistema acotado',s:'Planta + cotas de altura',
 d:'Una sola proyección horizontal en la que cada punto lleva su cota (altura) entre paréntesis. La superficie del terreno se representa con curvas de nivel equidistantes; la pendiente de una recta es desnivel / distancia horizontal y su intervalo es la inversa.',
 u:'Representa el terreno (topografía), plataformas, taludes, rampas y cubiertas. En terrenos planos de la cuenca del Guayas sirve para el drenaje; en la Sierra, para escalonar el programa con la pendiente.',
 p:['Obtén el levantamiento con curvas cada 0,50 o 1,00 m.','Rotula curvas maestras cada 5 equidistancias.','Define las cotas de plataformas del proyecto (N+0,00).','Traza taludes con su escala de pendiente (desmonte / terraplén).','Halla las líneas de intersección talud–terreno.'],
 geo:['geo-04','geo-05','geo-06'],
 g:D('M8 78Q30 62 52 70T94 56',0)+D('M8 62Q32 46 54 54T94 40',1)+D('M8 46Q34 30 56 38T94 24',2)+D('M8 30Q36 16 58 22T94 10',3)+T(80,64,'(2)',6)+T(80,48,'(3)',6)+T(80,32,'(4)',6)+AL(20,86,48,30,'~k')},
{id:'iso',n:'Axonometría isométrica',s:'3 ejes a 120° · escala 1:1:1',
 d:'Proyección cilíndrica ortogonal en la que los tres ejes forman 120° entre sí y se reducen por igual (0,816); en la práctica se dibuja sin reducción (isometría convencional). No hay deformación por distancia: las medidas se toman sobre los ejes.',
 u:'Explica el volumen completo del partido, sistemas constructivos y el ensamble entre volúmenes. Es la vista ideal para la axonometría explotada por sistemas (estructura, envolvente, cubierta).',
 p:['Traza los tres ejes a 120° (verticales y a 30° de la horizontal).','Lleva medidas reales sobre cada eje.','Construye la caja envolvente y talla el volumen.','Paralelas siempre paralelas (sin fuga).','Grosor de línea: contorno exterior > aristas interiores.'],
 geo:['geo-16'],
 g:box(-24,-24,0,48,48,32,0,'',null,1,true)+AL(50,62,50,94)+AL(50,62,92,86)+AL(50,62,8,86)},
{id:'caballera',n:'Perspectiva caballera',s:'Frente en VM · fuga oblicua',
 d:'Axonometría oblicua: la cara frontal se dibuja en verdadera magnitud y la profundidad con rectas a 30°/45° reducidas (coeficiente 0,5–0,7) para no deformar.',
 u:'Muy útil para fachadas con profundidad (aleros, quiebrasoles, balcones): la fachada se lee real y la profundidad se intuye. Rápida a mano en el taller.',
 p:['Dibuja la fachada en VM.','Proyecta la profundidad a 45° con coeficiente 0,5.','Conecta las aristas posteriores.','Elimina líneas ocultas.'],
 geo:['geo-16'],
 g:PL([[16,40],[60,40],[60,84],[16,84]],0,'',1)+PL([[16,40],[36,20],[80,20],[60,40]],1)+PL([[80,20],[80,64],[60,84]],2)+FP([[16,40],[60,40],[60,84],[16,84]],0)+T(28,66,'VM',8)},
{id:'militar',n:'Axonometría militar (planimétrica)',s:'Planta en VM girada · alturas verticales',
 d:'Axonometría oblicua en la que la planta se dibuja en verdadera magnitud girada (30°/60° o 45°) y las alturas se levantan verticales. Conserva ángulos y medidas en planta.',
 u:'Ideal para mostrar la planta con su volumetría: patios, recorridos y relación interior–exterior; se construye directamente sobre la planta del proyecto.',
 p:['Gira la planta 45° o 30/60°.','Levanta verticales en cada vértice con la altura real (o 2/3).','Une las cabezas: reproducen la planta.','Corta el volumen si quieres mostrar el interior (seccionada).'],
 geo:['geo-16'],
 g:PL([[50,62],[78,46],[56,34],[28,50]],0,'',1)+PL([[50,62],[50,30],[78,14],[78,46]],1)+PL([[50,30],[22,18],[28,50]],2)+L(22,18,56,2,3)+L(56,2,78,14,3)},
{id:'p1',n:'Perspectiva de 1 punto de fuga',s:'Cónica frontal',
 d:'Proyección cónica con el plano del cuadro paralelo a una cara del objeto: las rectas de profundidad fugan a un único punto (punto principal) sobre la línea de horizonte, a la altura de los ojos.',
 u:'Interiores y calles: el espacio principal, un pasillo, la sala de espera. Valida escala humana con el horizonte a 1,50–1,60 m.',
 p:['Dibuja el plano del fondo en escala.','Sitúa horizonte a 1,60 m y el punto de fuga.','Fuga las aristas al PF.','Mide profundidades con el punto de distancia (diagonales a 45°).','Agrega una figura humana para escala.'],
 geo:['geo-17','geo-19'],
 g:L(4,46,96,46,0,'~k')+DOT(50,46,2.6,0)+R(34,32,32,28,1)+L(6,8,34,32,2)+L(94,8,66,32,2)+L(6,88,34,60,3)+L(94,88,66,60,3)+W('M34 32L50 46L66 60M66 32L50 46L34 60')},
{id:'p2',n:'Perspectiva de 2 puntos de fuga',s:'Cónica oblicua',
 d:'El objeto está girado respecto al cuadro: las horizontales de cada familia fugan a dos puntos sobre el horizonte y las verticales permanecen verticales.',
 u:'La vista exterior por excelencia: llegada al edificio, esquina, acceso. Coloca PF lejos (fuera de la lámina) para evitar deformación (cono visual ≤ 60°).',
 p:['Horizonte a 1,60 m (peatonal).','Sitúa PF1 y PF2 bien separados.','Levanta la arista más cercana en escala.','Fuga las horizontales a cada PF.','Divide profundidades con diagonales o método de las medidas.'],
 geo:['geo-17','geo-18'],
 g:L(2,40,98,40,0,'~k')+DOT(4,40,2.4,0)+DOT(96,40,2.4,1)+L(46,24,46,78,1,'~b')+PL([[4,40],[46,24],[96,40]],2)+PL([[4,40],[46,78],[96,40]],2)+L(24,32,24,62,3)+L(72,32,72,62,3)},
{id:'p3',n:'Perspectiva de 3 puntos de fuga',s:'Cónica inclinada',
 d:'El cuadro está inclinado respecto a la vertical: además de dos puntos de fuga horizontales, las verticales convergen a un tercer punto (cenital o nadiral).',
 u:'Vistas aéreas del conjunto o vistas desde la calle hacia edificios altos; transmiten altura y dinamismo.',
 p:['Horizonte y PF1–PF2.','Tercer punto en la vertical muy lejos (arriba o abajo).','Verticales a PF3.','Controla la deformación: triángulo de fugas amplio.'],
 geo:['geo-18'],
 g:L(2,24,98,24,0,'~k')+DOT(4,24,2.2,0)+DOT(96,24,2.2,1)+DOT(50,96,2.6,2)+PL([[30,30],[50,22],[70,30],[60,74],[50,80],[40,74]],1,'',1)+L(50,22,50,80,2)+W('M30 30L50 96M70 30L50 96')},
{id:'sombras',n:'Sombras (propias y arrojadas)',s:'Rayo de luz + plano de sombra',
 d:'La sombra propia es la cara no iluminada; la arrojada es la intersección de los rayos que pasan por el contorno de sombra propia con las superficies que la reciben. Se construye con la dirección del rayo (acimut y altura solar).',
 u:'Lee volumen en fachadas y axonometrías y verifica protecciones solares. En Ecuador (latitud ≈ 0°) el sol va casi cenital: las sombras al mediodía son cortas y las críticas son este–oeste.',
 p:['Obtén acimut y altura solar del sitio (fecha y hora).','Traza el rayo en planta y en alzado.','Halla el contorno de sombra propia.','Proyecta cada vértice sobre el plano receptor.','Une las proyecciones: polígono de sombra arrojada.'],
 geo:['geo-12','geo-13','geo-14'],
 g:box(-14,-14,0,28,28,30,0,'',null,1,true)+FP([iso(14,-14,0),iso(14,14,0),iso(-14,14,0),iso(-14+22,14+22,0),iso(14+22,14+22,0),iso(14+22,-14+22,0)],2,'fill:rgba(var(--acc-rgb),.3)')+DOT(88,12,4,0)+AL(88,12,iso(14,14,30)[0],iso(14,14,30)[1],'~k')},
{id:'vm',n:'Verdadera magnitud (giros y abatimientos)',s:'Medir lo inclinado',
 d:'Una recta o figura se ve en verdadera magnitud solo si es paralela al plano de proyección. Con giros, cambios de plano o abatimientos se lleva a esa posición para medir longitudes, ángulos y áreas reales.',
 u:'Cubiertas inclinadas, rampas y fachadas oblicuas: área real del faldón = área en planta / cos α; longitud real de rampa = √(L² + h²).',
 p:['Identifica la recta/figura oblicua.','Elige el eje de giro o un nuevo plano paralelo.','Gira o cambia de plano.','Mide en la nueva vista.','Tabula las verdaderas magnitudes.'],
 geo:['geo-06','geo-09','geo-10'],
 g:L(14,82,70,30,0)+L(14,82,90,82,1,'~k')+D('M70 30A76 76 0 0 1 90 82',2)+DOT(14,82,2.4,0)+T(64,74,'VM',7,'~k')+WL(70,30,70,82)},
{id:'inters',n:'Intersección de volúmenes',s:'Planos auxiliares',
 d:'La línea donde dos superficies se cortan se obtiene con planos auxiliares que cortan a ambas: los puntos comunes de las secciones forman la intersección.',
 u:'Resuelve el encuentro entre volúmenes del partido (prisma con cilindro, cubiertas que se cruzan) para que las aristas sean construibles.',
 p:['Representa ambos volúmenes en diédrico o 3D.','Elige planos auxiliares que den secciones simples.','Halla los puntos comunes.','Une en orden y define visibilidad.'],
 geo:['geo-07'],
 g:box(-30,-8,0,60,16,16,0,'',null,1)+E(50,40,9,5,1,'~k')+L(41,40,41,80,2,'~k')+L(59,40,59,80,2,'~k')+D('M41 80A9 5 0 0 0 59 80',3,'~k')},
{id:'cubiertas',n:'Resolución de cubiertas',s:'Faldones · limas · cumbreras',
 d:'Con todas las pendientes iguales, las limatesas y limahoyas son bisectrices de los ángulos del contorno en planta, y las cumbreras son horizontales equidistantes de los aleros.',
 u:'Planta de cubiertas del proyecto: define pendiente según material y lluvia (INAMHI), desagües y canales; en clima cálido-húmedo, aleros generosos.',
 p:['Dibuja el contorno de aleros.','Fija la pendiente.','Traza bisectrices desde cada esquina.','Une encuentros con cumbreras.','Indica sentido de caída y bajantes.'],
 geo:['geo-08','geo-09'],
 g:PL([[10,26],[90,26],[90,74],[10,74]],0,'',1)+L(10,26,34,50,1)+L(10,74,34,50,1)+L(90,26,66,50,2)+L(90,74,66,50,2)+L(34,50,66,50,3,'~k')+AL(50,30,50,44)+AL(50,70,50,56)},
{id:'desarrollo',n:'Desarrollo de superficies',s:'Del 3D a la plancha',
 d:'Una superficie desarrollable (prisma, cilindro, cono) se extiende sobre un plano sin deformarse; las no desarrollables (esfera, paraboloide) se aproximan con paneles o husos.',
 u:'Fabricación: maquetas, planchas metálicas, lonas, encofrados, corte láser/CNC (Unroll en Rhino).',
 p:['Identifica si es desarrollable.','Toma verdaderas magnitudes de aristas.','Extiende caras en orden.','Añade pestañas y numeración.'],
 geo:['geo-21'],
 g:R(38,8,22,22,0)+R(16,30,22,22,1)+R(38,30,22,22,1,'~k')+R(60,30,22,22,2)+R(38,52,22,22,2)+R(38,74,22,18,3)+W('M82 30l6 4v14l-6 4')},
{id:'restit',n:'Restitución perspectiva / fotomontaje',s:'Cámara real del sitio',
 d:'A partir de una foto se recupera el horizonte y los puntos de fuga para colocar el modelo con la misma cámara (posición, altura y focal).',
 u:'Inserta el proyecto en fotos reales del terreno para presentar al cliente o al municipio (Match Photo en SketchUp, cámara en Blender).',
 p:['Toma fotos registrando altura y ubicación.','Prolonga dos familias de horizontales: PF1, PF2.','Une los PF: horizonte.','Ajusta la cámara del modelo a esas fugas.','Integra luz y sombras con la hora de la foto.'],
 geo:['geo-20'],
 g:R(8,16,84,62,0)+L(8,48,92,48,1,'~k')+DOT(12,48,2,0)+DOT(88,48,2,1)+PL([[12,48],[40,30],[88,48]],2)+PL([[12,48],[40,70],[88,48]],2)+L(40,30,40,70,3,'~b')},
{id:'croquis',n:'Croquis a mano alzada',s:'Pensar dibujando',
 d:'Dibujo rápido, sin instrumentos, que registra observación e ideas: proporción, sombras y perspectiva intuitiva. Herramienta de pensamiento del arquitecto (bitácora).',
 u:'En visita de sitio, en reuniones y para explorar el partido: croquis en Trace sobre fotos o capas, luego súbelos aquí y postprodúcelos.',
 p:['Encaje de proporciones con líneas suaves.','Horizonte y fugas a ojo.','Refuerza contornos y sombras.','Fecha y nombre en la bitácora.'],
 geo:['geo-19'],
 g:D('M12 78C26 60 30 40 46 30S80 22 88 36',0)+D('M14 84C34 76 60 80 86 70',1,'~k')+PL([[60,72],[86,40],[92,46],[66,78],[58,80]],2)+L(82,44,88,50,3)}
];
const TEC_BY = Object.fromEntries(TEC.map(t=>[t.id,t]));
/* pasos de la materia (m-geo.js) + dibujo digital */
const GEO_FASES = [
 {n:'Fase 0 · Estándar gráfico',ps:[['geo-01','Definir el estándar gráfico (plantilla, grosores, cajetín)'],['geo-02','Sistemas de representación y escalas por fase'],['geo-03','Índice de láminas (listado de planos)']]},
 {n:'Fase 1 · Sitio y topografía',ps:[['geo-04','Terreno en sistema acotado con curvas de nivel'],['geo-05','Plataformas, taludes y movimiento de tierras'],['geo-06','Rampas: verdadera magnitud y pendiente (NTE INEN 2245)']]},
 {n:'Fase 2 · Geometría del volumen',ps:[['geo-07','Intersecciones entre volúmenes del partido'],['geo-08','Resolver cubiertas (pendientes, limas, desagües)'],['geo-09','Verdaderas magnitudes de faldones y aristas'],['geo-10','VM de superficies oblicuas y curvas'],['geo-11','Superficies regladas (si las hay)']]},
 {n:'Fase 3 · Sombras y asoleamiento',ps:[['geo-12','Trayectoria solar real del sitio'],['geo-13','Sombras propias y arrojadas con sol real'],['geo-14','Protecciones solares con máscaras de sombra'],['geo-15','Simular sol y sombra en el modelo digital (UTC−5)']]},
 {n:'Fase 4 · Axonometrías y perspectivas',ps:[['geo-16','Axonometrías explotadas y seccionadas'],['geo-17','Perspectivas peatonales (horizonte 1,60 m)'],['geo-18','Perspectivas aéreas y de 3 puntos'],['geo-19','Croquis a mano alzada del proceso'],['geo-20','Restitución para fotomontajes']]},
 {n:'Fase 5 · Fabricación y archivo',ps:[['geo-21','Desarrollo de superficies (maquetas, CNC)'],['geo-22','Coherencia entre vistas'],['geo-23','Estándar gráfico y rotulado de láminas'],['geo-24','Archivar productos gráficos (03_Representacion)']]},
 {n:'Dibujo digital · Trace → DION',ps:[['dd-01','Croquis en Trace por capas (papel calco) con escala del plano base'],['dd-02','Exportar PNG/JPG (Compartir → Guardar en Archivos/Fotos)'],['dd-03','Subir a la galería y nombrar con fecha y vista'],['dd-04','Postproducir: recortar, convertir a línea, tinte'],['dd-05','Calibrar escala gráfica, norte y textos'],['dd-06','Exportar PNG para láminas / guardar versión']]}
];
const GEO_ALL = GEO_FASES.flatMap(f=>f.ps.map(x=>x[0]));
const GEO_T = Object.fromEntries(GEO_FASES.flatMap(f=>f.ps));

/* ===================== DIBUJO · CSS ===================== */
function dbCSS(){ const p=DX; return glyphCSS(p)+`
.${p}r{position:relative;height:100%;min-height:440px;display:flex;flex-direction:column;overflow:hidden;container-type:inline-size;color:var(--ink);font-family:var(--f-b);background:radial-gradient(120% 90% at 80% 0%,rgba(var(--acc-rgb),.07),transparent 60%),var(--bg)}
.${p}r *{box-sizing:border-box}
.${p}r button{font:inherit;color:inherit;cursor:pointer;-webkit-tap-highlight-color:transparent}
.${p}hud{position:relative;background:linear-gradient(180deg,rgba(14,25,40,.88),rgba(8,16,26,.9));border:1px solid var(--line2)}
.${p}hud::before,.${p}hud::after{content:"";position:absolute;width:10px;height:10px;pointer-events:none;border-color:var(--acc);border-style:solid}
.${p}hud::before{left:-1px;top:-1px;border-width:2px 0 0 2px}.${p}hud::after{right:-1px;bottom:-1px;border-width:0 2px 2px 0}
.${p}top{display:flex;align-items:center;gap:10px;padding:10px 12px;border-bottom:1px solid var(--line2);flex-wrap:wrap;background:rgba(3,6,11,.6)}
.${p}brand{display:flex;align-items:center;gap:10px;min-width:0;flex:1 1 240px}
.${p}brand .${p}bg{width:40px;height:40px;flex:none}
.${p}t1{font-family:var(--f-d);font-size:13px;letter-spacing:.16em;text-transform:uppercase;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.${p}t2{font-family:var(--f-m);font-size:10.5px;color:var(--muted);letter-spacing:.06em;margin-top:3px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.${p}seg{display:flex;border:1px solid var(--line2);flex:none}
.${p}seg button{min-height:42px;padding:0 12px;background:transparent;border:0;font-family:var(--f-m);font-size:10.5px;letter-spacing:.12em;color:var(--muted);display:flex;align-items:center;gap:6px;text-transform:uppercase}
.${p}seg button[aria-pressed=true]{background:rgba(var(--acc-rgb),.16);color:var(--acc);box-shadow:inset 0 -2px 0 var(--acc)}
.${p}btn{min-height:42px;padding:0 14px;border:1px solid var(--line2);background:rgba(var(--acc-rgb),.06);font-family:var(--f-m);font-size:11px;letter-spacing:.1em;display:inline-flex;align-items:center;justify-content:center;gap:8px;text-transform:uppercase;transition:background .2s,border-color .2s}
.${p}btn:hover{background:rgba(var(--acc-rgb),.14);border-color:var(--acc)}
.${p}btn.${p}pri{border-color:var(--acc);color:var(--acc);box-shadow:inset 0 0 14px rgba(var(--acc-rgb),.18)}
.${p}btn.${p}ok{border-color:var(--done);color:var(--done);background:rgba(var(--done-rgb),.08)}
.${p}btn:disabled{opacity:.35;cursor:default}
.${p}main{flex:1;min-height:0;position:relative;display:flex;flex-direction:column}
.${p}scroll{flex:1;min-height:0;overflow:auto;padding:14px}
.${p}lab{display:flex;justify-content:space-between;align-items:center;gap:8px;font-family:var(--f-m);font-size:10px;color:var(--muted);letter-spacing:.12em;text-transform:uppercase;margin-bottom:8px}
.${p}h3{font-family:var(--f-d);font-size:12px;letter-spacing:.16em;text-transform:uppercase;margin:0 0 10px;color:var(--ink)}
/* galería */
.${p}gal{display:grid;grid-template-columns:minmax(0,1fr);gap:14px}
.${p}drop{display:flex;gap:14px;align-items:center;padding:16px;border:1px dashed var(--acc);background:rgba(var(--acc-rgb),.04);min-height:110px;flex-wrap:wrap}
.${p}drop.${p}over{background:rgba(var(--acc-rgb),.14);box-shadow:inset 0 0 30px rgba(var(--acc-rgb),.25)}
.${p}drop .${p}dg{width:70px;height:70px;flex:none}
.${p}drop .${p}dt{flex:1 1 200px;min-width:0}
.${p}drop .${p}dt b{display:block;font-family:var(--f-d);font-size:12px;letter-spacing:.14em;text-transform:uppercase;margin-bottom:4px}
.${p}drop .${p}dt small{color:var(--muted);font-size:12.5px;line-height:1.45}
.${p}trace{padding:12px 14px}
.${p}trs{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:8px;margin:0;padding:0;list-style:none}
.${p}trs li{border:1px solid var(--line);padding:10px;background:rgba(10,19,31,.6);font-size:12.5px;line-height:1.4;position:relative}
.${p}trs li i{display:block;font-style:normal;font-family:var(--f-m);font-size:10px;color:var(--acc);letter-spacing:.14em;margin-bottom:4px}
.${p}grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(150px,1fr));gap:10px}
.${p}it{position:relative;border:1px solid var(--line2);background:#05090f;display:flex;flex-direction:column;min-width:0}
.${p}it.${p}tmp{border-color:var(--warn)}
.${p}it .${p}im{aspect-ratio:4/3;width:100%;border:0;padding:0;display:block;background:#0b121c center/contain no-repeat}
.${p}it .${p}ib2{display:flex;align-items:center;gap:4px;padding:4px 4px 4px 8px;border-top:1px solid var(--line)}
.${p}it .${p}ib2 span{flex:1;min-width:0;font-family:var(--f-m);font-size:10px;color:var(--muted);white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.${p}it em{position:absolute;left:0;top:0;font:normal 9px var(--f-m);background:var(--warn);color:#fff;letter-spacing:.08em;padding:2px 6px}
.${p}ic{width:40px;height:40px;flex:none;display:grid;place-items:center;border:1px solid var(--line);background:rgba(var(--acc-rgb),.04);color:var(--acc)}
.${p}ic.${p}del{color:var(--warn)}
.${p}empty{color:var(--muted);font-size:13px;line-height:1.5;padding:16px;border:1px dashed var(--line2)}
/* mesa */
.${p}mesa{flex:1;min-height:0;display:grid;grid-template-columns:minmax(0,1fr) 290px;grid-template-rows:auto minmax(0,1fr);}
.${p}tools{grid-column:1/-1;display:flex;gap:4px;padding:6px 8px;border-bottom:1px solid var(--line2);overflow-x:auto;scrollbar-width:thin;background:rgba(3,6,11,.55);align-items:center}
.${p}tl{width:44px;height:44px;flex:none;display:grid;place-items:center;border:1px solid var(--line);background:rgba(10,19,31,.7);color:var(--muted);position:relative}
.${p}tl:hover{border-color:var(--acc);color:var(--ink)}
.${p}tl[aria-pressed=true]{border-color:var(--acc);color:var(--acc);background:rgba(var(--acc-rgb),.16);box-shadow:0 0 14px rgba(var(--acc-rgb),.25)}
.${p}tl:disabled{opacity:.3}
.${p}sep{width:1px;height:30px;background:var(--line2);flex:none;margin:0 4px}
.${p}cvw{position:relative;min-height:0;overflow:hidden;touch-action:none;background:#02050a}
.${p}cv{position:absolute;inset:0;width:100%;height:100%;display:block}
.${p}hint{position:absolute;left:10px;bottom:8px;right:10px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;font-family:var(--f-m);font-size:10px;color:var(--muted);letter-spacing:.08em;pointer-events:none;text-shadow:0 1px 2px #000}
.${p}zm{position:absolute;right:10px;top:10px;font-family:var(--f-m);font-size:10px;color:var(--acc);background:rgba(3,6,11,.7);border:1px solid var(--line);padding:3px 6px;pointer-events:none}
.${p}pop{position:absolute;z-index:4;left:50%;top:14px;transform:translateX(-50%);width:min(340px,calc(100% - 20px));padding:12px;display:flex;flex-direction:column;gap:8px}
.${p}pop b{font-family:var(--f-m);font-size:10.5px;letter-spacing:.12em;color:var(--acc);text-transform:uppercase;font-weight:400}
.${p}row{display:flex;gap:6px;align-items:center}
.${p}in{flex:1;min-width:0;min-height:42px;background:rgba(3,6,11,.8);border:1px solid var(--line2);color:var(--ink);padding:0 10px;font:15px var(--f-b);outline:none}
.${p}in:focus{border-color:var(--acc)}
.${p}side{border-left:1px solid var(--line2);overflow:auto;padding:12px;display:flex;flex-direction:column;gap:14px;background:rgba(5,10,17,.9)}
.${p}grp{display:flex;flex-direction:column;gap:8px}
.${p}sl{display:grid;grid-template-columns:86px minmax(0,1fr) 40px;align-items:center;gap:8px;font-size:12px;color:var(--muted)}
.${p}sl output{font-family:var(--f-m);font-size:11px;color:var(--acc);text-align:right}
.${p}rg{-webkit-appearance:none;appearance:none;width:100%;height:40px;background:transparent;margin:0}
.${p}rg::-webkit-slider-runnable-track{height:4px;background:linear-gradient(90deg,rgba(var(--acc-rgb),.5),rgba(var(--acc-rgb),.12));border:1px solid var(--line)}
.${p}rg::-webkit-slider-thumb{-webkit-appearance:none;width:22px;height:22px;margin-top:-10px;background:var(--bg);border:2px solid var(--acc);transform:rotate(45deg);box-shadow:0 0 10px rgba(var(--acc-rgb),.6)}
.${p}rg::-moz-range-track{height:4px;background:rgba(var(--acc-rgb),.3)}
.${p}rg::-moz-range-thumb{width:18px;height:18px;background:var(--bg);border:2px solid var(--acc);border-radius:0}
.${p}sw{display:flex;gap:6px;flex-wrap:wrap}
.${p}sw button{width:40px;height:40px;border:1px solid var(--line2);display:grid;place-items:center;background:transparent;padding:0}
.${p}sw button i{width:22px;height:22px;display:block;border:1px solid rgba(255,255,255,.25)}
.${p}sw button[aria-pressed=true]{border-color:var(--acc);box-shadow:0 0 12px rgba(var(--acc-rgb),.45)}
.${p}tg{min-height:44px;width:100%;display:flex;align-items:center;gap:10px;padding:0 12px;border:1px solid var(--line2);background:rgba(var(--acc-rgb),.05);font-family:var(--f-m);font-size:11px;letter-spacing:.12em;text-transform:uppercase;text-align:left}
.${p}tg .${p}bx{width:22px;height:22px;border:1.5px solid var(--acc);display:grid;place-items:center;flex:none}
.${p}tg[aria-pressed=true]{border-color:var(--done);color:var(--done);background:rgba(var(--done-rgb),.08)}
.${p}tg[aria-pressed=true] .${p}bx{background:var(--done);border-color:var(--done);color:#061006}
.${p}kv{font-family:var(--f-m);font-size:11px;color:var(--muted);line-height:1.6}
.${p}kv em{font-style:normal;color:var(--done)}
.${p}st{display:grid;grid-template-columns:1fr 1fr;gap:6px}
.${p}nomesa{flex:1;display:flex;align-items:center;justify-content:center;padding:20px}
.${p}nomesa .${p}hud{max-width:520px;padding:22px;display:flex;flex-direction:column;gap:14px;align-items:flex-start}
/* técnicas */
.${p}tec{display:grid;grid-template-columns:repeat(auto-fill,minmax(160px,1fr));gap:10px}
.${p}tc{position:relative;min-height:170px;border:1px solid var(--line2);background:linear-gradient(180deg,rgba(14,25,40,.7),rgba(5,10,17,.9));padding:10px;display:flex;flex-direction:column;gap:6px;text-align:left}
.${p}tc::before{content:"";position:absolute;left:-1px;top:-1px;width:9px;height:9px;border:solid var(--acc);border-width:2px 0 0 2px}
.${p}tc:hover,.${p}tc.${p}on{border-color:var(--acc);box-shadow:0 0 18px rgba(var(--acc-rgb),.18)}
.${p}tc.${p}use{border-color:var(--done)}
.${p}tc .${p}tg2{height:92px;width:100%}
.${p}tc b{font-size:13px;line-height:1.25}
.${p}tc small{font-family:var(--f-m);font-size:9.5px;color:var(--muted);letter-spacing:.06em}
.${p}tc i{position:absolute;right:6px;top:6px;font-style:normal;font-family:var(--f-m);font-size:9px;color:#061006;background:var(--done);padding:1px 5px;letter-spacing:.08em}
.${p}tf{grid-column:1/-1;padding:16px;display:grid;grid-template-columns:minmax(0,1fr);gap:14px}
.${p}tf .${p}tfg{aspect-ratio:1;max-width:220px;width:100%;padding:16px;border:1px solid var(--line2);background:radial-gradient(circle,rgba(var(--acc-rgb),.12),transparent 65%)}
.${p}sec{border-left:2px solid var(--acc);padding:2px 0 2px 12px}
.${p}sec h4{margin:0 0 6px;font-family:var(--f-m);font-size:10.5px;font-weight:400;letter-spacing:.16em;color:var(--acc);text-transform:uppercase}
.${p}sec p{margin:0;line-height:1.55;font-size:14px}
.${p}sec ol{margin:0;padding-left:20px;line-height:1.55;font-size:13.5px}
.${p}sec.${p}k{border-color:var(--done)}.${p}sec.${p}k h4{color:var(--done)}
.${p}chips{display:flex;gap:6px;flex-wrap:wrap}
.${p}chip{font-family:var(--f-m);font-size:10px;padding:3px 7px;border:1px solid var(--line2);color:var(--acc);background:rgba(var(--acc-rgb),.05)}
.${p}meter{display:flex;flex-direction:column;gap:5px;min-width:150px}
.${p}meter b{font-family:var(--f-m);font-size:10px;letter-spacing:.12em;color:var(--muted);font-weight:400}
.${p}meter b em{font-style:normal;color:var(--done)}
.${p}bar{height:6px;background:rgba(var(--acc-rgb),.08);border:1px solid var(--line);position:relative;overflow:hidden}
.${p}bar i{position:absolute;left:0;top:0;bottom:0;background:linear-gradient(90deg,var(--acc),var(--done));box-shadow:0 0 10px rgba(var(--done-rgb),.6);transition:width .3s}
.${p}fase{margin-top:14px}
.${p}fase>b{display:block;font-family:var(--f-m);font-size:10.5px;letter-spacing:.14em;color:var(--acc);text-transform:uppercase;margin-bottom:6px}
.${p}ck{display:flex;align-items:center;gap:10px;width:100%;min-height:46px;padding:6px 10px;border:1px solid var(--line);background:rgba(10,19,31,.55);text-align:left;margin-bottom:4px;font-size:13px;line-height:1.35}
.${p}ck code{font-family:var(--f-m);font-size:10px;color:var(--faint);flex:none;width:44px}
.${p}ck .${p}bx{width:24px;height:24px;border:1.5px solid var(--acc);display:grid;place-items:center;flex:none}
.${p}ck[aria-pressed=true]{border-color:rgba(var(--done-rgb),.5)}
.${p}ck[aria-pressed=true] .${p}bx{background:var(--done);border-color:var(--done);color:#061006}
.${p}ck[aria-pressed=true] span{color:var(--muted);text-decoration:line-through;text-decoration-color:rgba(var(--done-rgb),.6)}
.${p}two{display:grid;grid-template-columns:minmax(0,1fr);gap:16px}
@container (min-width:900px){
 .${p}two{grid-template-columns:minmax(0,1.35fr) minmax(0,1fr)}
 .${p}tf{grid-template-columns:220px minmax(0,1fr)}
}
@container (max-width:760px){
 .${p}mesa{grid-template-columns:minmax(0,1fr);grid-template-rows:auto minmax(0,1.5fr) minmax(0,1fr)}
 .${p}side{border-left:0;border-top:1px solid var(--line2)}
 .${p}trs{grid-template-columns:repeat(2,minmax(0,1fr))}
}
@container (max-width:560px){
 .${p}brand{flex-basis:100%}
 .${p}seg{flex:1}.${p}seg button{flex:1;justify-content:center;padding:0 6px}
 .${p}top .${p}btn .${p}lt{display:none}
 .${p}grid{grid-template-columns:repeat(2,minmax(0,1fr))}
 .${p}tec{grid-template-columns:repeat(2,minmax(0,1fr))}
 .${p}scroll{padding:10px}
}
`; }

/* ===================== DIBUJO · MESA (motor de postproducción) ===================== */
const dbUI = { tab:null, tec:null, scrollG:0 };
const dbTmp = []; /* bocetos temporales (objectURL) */
const ADJ0 = { br:0, co:0, wh:255, line:false, thr:170, tint:'#14181f', bgT:true };
const PEN_COL = ['#14181f','#1E5BFF','#E0262F','#0B8F5A','#38E1FF','#FFFFFF'];
const TINT_COL = ['#14181f','#1F3A93','#7A4A22','#0B6E4F','#9B1B30','#38E1FF'];
let ED = null; /* {name, srcId, base, proc, adj, ann, hist, idx, view, tool, pen, penW, txtS, tainted, cal, crop} */
function cnv(w,h){ const c=document.createElement('canvas'); c.width=Math.max(1,Math.round(w)); c.height=Math.max(1,Math.round(h)); return c; }
function cloneAnn(a){ return JSON.parse(JSON.stringify(a)); }
function hexRGB(h){ h=h.replace('#',''); return [parseInt(h.slice(0,2),16),parseInt(h.slice(2,4),16),parseInt(h.slice(4,6),16)]; }
function niceM(v){ if(!(v>0)) return 1; const e=Math.pow(10,Math.floor(Math.log10(v))); const f=v/e; return (f<1.5?1:f<3.5?2:f<7.5?5:10)*e; }
function fmtM(v){ return (v>=1? (Math.round(v*100)/100):(Math.round(v*1000)/1000)).toString().replace('.',','); }
function edNew(img,name,srcId,tainted){
  const MAX=2400; let w=img.naturalWidth||img.width, h=img.naturalHeight||img.height; const k=Math.min(1,MAX/Math.max(w,h));
  const b=cnv(w*k,h*k); const g=b.getContext('2d'); g.drawImage(img,0,0,b.width,b.height);
  ED={ name:name||'boceto', srcId:srcId||null, base:b, proc:b, adj:Object.assign({},ADJ0), ann:[], hist:[], idx:-1, view:null, tool:'pen', pen:PEN_COL[0], penW:1, txtS:1, tainted:!!tainted, cal:null, crop:null, pend:null };
  edPush(); edProcess();
}
function edBlank(){
  const b=cnv(2000,1400); const g=b.getContext('2d'); g.fillStyle='#fbfaf6'; g.fillRect(0,0,b.width,b.height);
  g.strokeStyle='rgba(30,91,255,.12)'; g.lineWidth=1; for(let x=0;x<=2000;x+=50){ g.beginPath(); g.moveTo(x+.5,0); g.lineTo(x+.5,1400); g.stroke(); } for(let y=0;y<=1400;y+=50){ g.beginPath(); g.moveTo(0,y+.5); g.lineTo(2000,y+.5); g.stroke(); }
  ED={ name:'lienzo', srcId:null, base:b, proc:b, adj:Object.assign({},ADJ0), ann:[], hist:[], idx:-1, view:null, tool:'pen', pen:PEN_COL[0], penW:1, txtS:1, tainted:false, cal:null, crop:null, pend:null };
  edPush(); edProcess();
}
function edPush(){ if(!ED) return; ED.hist=ED.hist.slice(0,ED.idx+1); ED.hist.push({base:ED.base,adj:Object.assign({},ED.adj),ann:cloneAnn(ED.ann),cal:ED.cal?Object.assign({},ED.cal):null}); if(ED.hist.length>40) ED.hist.shift(); ED.idx=ED.hist.length-1; }
function edRestore(i){ const s=ED.hist[i]; if(!s) return false; ED.idx=i; const bc=ED.base!==s.base; ED.base=s.base; ED.adj=Object.assign({},s.adj); ED.ann=cloneAnn(s.ann); ED.cal=s.cal?Object.assign({},s.cal):null; edProcess(); return bc; }
function edProcess(){
  const a=ED.adj, b=ED.base;
  const neutral = !a.line && a.br===0 && a.co===0 && a.wh>=255;
  if(neutral || ED.tainted){ ED.proc=b; return; }
  const out=cnv(b.width,b.height), g=out.getContext('2d');
  let id; try{ id=b.getContext('2d').getImageData(0,0,b.width,b.height); }catch(_){ ED.tainted=true; ED.proc=b; return; }
  const d=id.data, n=d.length, br=a.br*2.55, cv=a.co*2.55, cf=(259*(cv+255))/(255*(259-cv)), wk=255/Math.max(60,a.wh);
  const lut=new Uint8ClampedArray(256); for(let v=0;v<256;v++){ let x=v*wk; x=cf*(x-128)+128+br; lut[v]=x<0?0:x>255?255:x; }
  if(!a.line){ for(let i=0;i<n;i+=4){ d[i]=lut[d[i]]; d[i+1]=lut[d[i+1]]; d[i+2]=lut[d[i+2]]; } }
  else { const [tr,tg,tb]=hexRGB(a.tint), th=a.thr, soft=Math.max(8,th*.35);
    for(let i=0;i<n;i+=4){ const L=.299*lut[d[i]]+.587*lut[d[i+1]]+.114*lut[d[i+2]];
      let al = L>=th?0:Math.min(1,(th-L)/soft); al*= d[i+3]/255;
      if(a.bgT){ d[i]=tr; d[i+1]=tg; d[i+2]=tb; d[i+3]=al*255; }
      else { d[i]=251+(tr-251)*al; d[i+1]=250+(tg-250)*al; d[i+2]=246+(tb-246)*al; d[i+3]=255; } } }
  g.putImageData(id,0,0); ED.proc=out;
}
function U(){ return Math.max(ED.base.width,ED.base.height)/100; }
function drawAnn(g,a){
  const u=U();
  if(a.t==='s'){ g.strokeStyle=a.c; g.lineCap='round'; g.lineJoin='round'; const P=a.p;
    if(a.er){ g.globalCompositeOperation='source-over'; }
    if(P.length===1){ g.fillStyle=a.c; g.beginPath(); g.arc(P[0][0],P[0][1],a.w*(.35+P[0][2]*1.3)/2,0,7); g.fill(); return; }
    for(let i=1;i<P.length;i++){ g.lineWidth=a.w*(.35+((P[i][2]+P[i-1][2])/2)*1.3); g.beginPath(); g.moveTo(P[i-1][0],P[i-1][1]); g.lineTo(P[i][0],P[i][1]); g.stroke(); } }
  else if(a.t==='t'){ g.fillStyle=a.c; g.font=`600 ${a.s}px "Chakra Petch",system-ui,sans-serif`; g.textBaseline='alphabetic'; String(a.v).split('\n').forEach((ln,i)=>g.fillText(ln,a.x,a.y+i*a.s*1.2)); }
  else if(a.t==='n'){ const r=a.r; g.save(); g.translate(a.x,a.y); g.strokeStyle=a.c; g.fillStyle=a.c; g.lineWidth=Math.max(1.5,r*.06);
    g.beginPath(); g.arc(0,0,r,0,7); g.stroke(); g.rotate(a.a);
    g.beginPath(); g.moveTo(0,-r*.92); g.lineTo(r*.32,r*.5); g.lineTo(0,r*.28); g.closePath(); g.fill();
    g.beginPath(); g.moveTo(0,-r*.92); g.lineTo(-r*.32,r*.5); g.lineTo(0,r*.28); g.closePath(); g.stroke();
    g.font=`700 ${r*.62}px "Michroma","Arial Black",sans-serif`; g.textAlign='center'; g.textBaseline='bottom'; g.fillText('N',0,-r*1.02); g.restore(); g.textAlign='start'; }
  else if(a.t==='k'){ const L=a.m*a.pxm, h=u*1.1, seg=4; g.save(); g.translate(a.x,a.y); g.lineWidth=Math.max(1,u*.12); g.strokeStyle=a.c;
    for(let i=0;i<seg;i++){ g.fillStyle = i%2? 'rgba(255,255,255,.95)':a.c; g.fillRect(i*L/seg,0,L/seg,h); } g.strokeRect(0,0,L,h);
    g.fillStyle=a.c; g.font=`600 ${u*1.5}px "JetBrains Mono",ui-monospace,monospace`; g.textAlign='center'; g.textBaseline='top';
    g.fillText('0',0,h+u*.4); g.fillText(fmtM(a.m/2),L/2,h+u*.4); g.fillText(fmtM(a.m)+' m',L,h+u*.4);
    g.textAlign='start'; g.textBaseline='bottom'; g.font=`600 ${u*1.2}px "JetBrains Mono",ui-monospace,monospace`; g.fillText('ESCALA GRÁFICA',0,-u*.4); g.restore(); }
}
function edComposite(){ const b=ED.proc, c=cnv(b.width,b.height), g=c.getContext('2d'); g.drawImage(b,0,0); ED.ann.forEach(a=>drawAnn(g,a)); return c; }
function edRotate(dir){ const b=ED.base, c=cnv(b.height,b.width), g=c.getContext('2d');
  if(dir>0){ g.translate(c.width,0); g.rotate(Math.PI/2); } else { g.translate(0,c.height); g.rotate(-Math.PI/2); } g.drawImage(b,0,0);
  const W=b.width,H=b.height, tf = dir>0 ? (x,y)=>[H-y,x] : (x,y)=>[y,W-x];
  ED.ann.forEach(a=>{ if(a.t==='s') a.p=a.p.map(q=>{ const r=tf(q[0],q[1]); return [r[0],r[1],q[2]]; }); else if(a.t==='k'){ /* se recoloca abajo-izquierda */ } else { const r=tf(a.x,a.y); a.x=r[0]; a.y=r[1]; if(a.t==='n') a.a+=dir*Math.PI/2; } });
  ED.base=c; ED.view=null; placeScale(); edProcess(); edPush(); }
function placeScale(){ const u=U(); ED.ann.forEach(a=>{ if(a.t==='k'){ a.m=niceM(ED.base.width*.22/a.pxm); a.x=u*3; a.y=ED.base.height-u*6; } }); }
function edCrop(r){ const x=Math.max(0,Math.round(Math.min(r.x0,r.x1))), y=Math.max(0,Math.round(Math.min(r.y0,r.y1)));
  const w=Math.min(ED.base.width-x,Math.round(Math.abs(r.x1-r.x0))), h=Math.min(ED.base.height-y,Math.round(Math.abs(r.y1-r.y0)));
  if(w<20||h<20) return false; const c=cnv(w,h); c.getContext('2d').drawImage(ED.base,x,y,w,h,0,0,w,h);
  ED.ann.forEach(a=>{ if(a.t==='s') a.p=a.p.map(q=>[q[0]-x,q[1]-y,q[2]]); else { a.x-=x; a.y-=y; } });
  ED.base=c; ED.view=null; placeScale(); edProcess(); edPush(); return true; }

/* ===================== DIBUJO · UI ===================== */
function dbNorm(o){ o=o||{}; return { bocetos:Array.isArray(o.bocetos)?o.bocetos.filter(b=>b&&b.url):[], pasos:Object.assign({},o.pasos||{}), tecnicas:Array.isArray(o.tecnicas)?o.tecnicas.filter(t=>TEC_BY[t]):[] }; }
function dbResumen(st){
  const t=st.tecnicas.map(id=>TEC_BY[id].n), done=GEO_ALL.filter(id=>st.pasos[id]);
  return 'DIBUJO · Geometría descriptiva y perspectiva + Dibujo digital\n'+
    'Técnicas usadas en el proyecto: '+(t.length?t.join(', '):'—')+'\n'+
    'Pasos completados ('+done.length+'/'+GEO_ALL.length+'): '+(done.length?done.map(id=>id+' '+GEO_T[id]).join('; '):'—')+'\n'+
    'Bocetos en galería: '+st.bocetos.length;
}
const TRACE_G = R(22,10,56,80,0)+R(30,18,56,80,1,'~k')+L(36,40,70,40,2)+L(36,52,62,52,3)+AL(14,70,4,92)+DOT(60,70,2.6,0);

DION_MOD.dibujo = {
  titulo:'Dibujo · Geometría descriptiva y digital',
  sub:'Bocetos de Trace · postproducción · técnicas de representación',
  render(el, ctx){
    injectCSS('mod-dibujo-css', dbCSS());
    const p=DX, esc=ctx.esc;
    const st=dbNorm(ctx.get('dibujo'));
    const save=debounce(()=>{ Promise.resolve(ctx.set('dibujo',{bocetos:st.bocetos.slice(),pasos:Object.assign({},st.pasos),tecnicas:st.tecnicas.slice(),resumen:dbResumen(st)})).catch(()=>ctx.toast('No se pudo guardar el dibujo')); },600);
    el.innerHTML='';
    const root=document.createElement('div'); root.className='m-dibujo '+p+'r'; el.appendChild(root);
    if(!dbUI.tab) dbUI.tab = ED ? 'mesa' : 'gal';
    const cleanups=[]; let ro=null, raf=0, drawQ=false;
    root.innerHTML=`<div class="${p}top">
      <div class="${p}brand"><div class="${p}bg">${glyphSVG(TRACE_G,p)}</div><div style="min-width:0"><div class="${p}t1">Dibujo · Representación</div><div class="${p}t2">Geometría descriptiva y perspectiva · Dibujo digital · Trace → DION</div></div></div>
      <div class="${p}seg" role="tablist">
        <button data-a="tab" data-v="gal" aria-pressed="false">${ico('img',16)}<span>Galería</span></button>
        <button data-a="tab" data-v="mesa" aria-pressed="false">${ico('sliders',16)}<span>Mesa</span></button>
        <button data-a="tab" data-v="tec" aria-pressed="false">${ico('guide',16)}<span>Técnicas</span></button>
      </div>
      <button class="${p}btn ${p}pri" data-a="next"><span class="${p}lt">Siguiente estación</span> →</button>
    </div><div class="${p}main" data-r="main"></div>
    <input type="file" accept="image/*" multiple hidden data-r="file">`;
    const main=root.querySelector('[data-r="main"]'), fileIn=root.querySelector('[data-r="file"]');
    fileIn.addEventListener('change',()=>{ const fs=[...fileIn.files]; fileIn.value=''; if(fs.length) subir(fs,false); });

    function allBocetos(){ return st.bocetos.concat(dbTmp); }
    async function subir(files,abrir){
      files=files.filter(f=>/^image\//.test(f.type)||/\.(png|jpe?g|webp|gif|heic)$/i.test(f.name||''));
      if(!files.length){ ctx.toast('Solo imágenes PNG/JPG'); return; }
      let res=[]; try{ res=await ctx.upload(files)||[]; }catch(_){ res=[]; }
      const f=new Date().toISOString().slice(0,10); let first=null;
      if(res.length){ res.forEach((r,i)=>{ const b={id:r.id||('b'+Date.now()+i),url:r.url,n:(files[i]&&files[i].name)||('boceto-'+(i+1)),f}; st.bocetos.unshift(b); if(!first) first=b; }); save(); ctx.toast(res.length+' boceto(s) guardado(s)'); }
      else { files.forEach((fl,i)=>{ const b={id:'tmp'+Date.now()+i,url:URL.createObjectURL(fl),n:fl.name||'boceto',f,tmp:true}; dbTmp.unshift(b); if(!first) first=b; }); ctx.toast('Sin permiso de subida: el boceto se ve solo en esta sesión y NO se guardó'); }
      if(abrir&&first) abrirEnMesa(first); else if(dbUI.tab==='gal') renderGal();
    }
    function abrirEnMesa(b){
      const img=new Image(); let tried=false;
      const ok=()=>{ edNew(img,(b.n||'boceto').replace(/\.[a-z0-9]+$/i,''),b.id,tried); dbUI.tab='mesa'; renderMain(); };
      img.onload=ok;
      img.onerror=()=>{ if(!tried && !/^blob:|^data:/.test(b.url)){ tried=true; const i2=new Image(); i2.onload=()=>{ edNew(i2,(b.n||'boceto'),b.id,true); dbUI.tab='mesa'; renderMain(); ctx.toast('Imagen protegida: se ve, pero no admite ajustes ni exportación'); }; i2.onerror=()=>ctx.toast('No se pudo abrir la imagen'); i2.src=b.url; } else ctx.toast('No se pudo abrir la imagen'); };
      if(!/^blob:|^data:/.test(b.url)) img.crossOrigin='anonymous';
      img.src=b.url;
    }

    /* ---------- GALERÍA ---------- */
    function renderGal(){
      const list=allBocetos();
      main.innerHTML=`<div class="${p}scroll" data-r="sc"><div class="${p}gal">
        <div class="${p}drop" data-r="drop"><div class="${p}dg">${glyphSVG(C(50,50,40,0)+L(50,72,50,28,1,'~b')+PL([[34,44],[50,28],[66,44]],2)+DOT(50,82,2.4,0),p)}</div>
          <div class="${p}dt"><b>Sube tus bocetos</b><small>Toca para elegir varias imágenes o arrástralas aquí. PNG o JPG desde Trace, Procreate, fotos de tu cuaderno o capturas.</small></div>
          <button class="${p}btn ${p}pri" data-a="up">${ico('up',18)} Subir bocetos</button>
          <button class="${p}btn" data-a="blank">${ico('blank',18)} Lienzo en blanco</button></div>
        <div class="${p}trace ${p}hud"><div class="${p}lab"><span>Desde Morpholio Trace (iPad)</span><span>4 pasos</span></div>
          <ol class="${p}trs"><li><i>01 · DIBUJA</i>Trabaja por capas de papel calco sobre tu plano o foto base; fija la escala del dibujo en Trace.</li>
          <li><i>02 · EXPORTA</i>Botón Compartir → Exportar imagen (PNG o JPG, máxima resolución; PNG conserva el fondo).</li>
          <li><i>03 · GUARDA</i>“Guardar en Archivos” o “Guardar imagen” (Fotos). Puedes elegir varias a la vez.</li>
          <li><i>04 · SUBE</i>Aquí: “Subir bocetos”, elige desde Fotos o Archivos, y ábrelos en la Mesa para postproducir.</li></ol></div>
        <div><div class="${p}lab"><span>Galería del proyecto</span><span>${list.length} boceto(s)${dbTmp.length?` · <b style="color:var(--warn);font-weight:400">${dbTmp.length} sin guardar</b>`:''}</span></div>
        ${list.length?`<div class="${p}grid">${list.map(b=>`<div class="${p}it ${b.tmp?p+'tmp':''}">${b.tmp?'<em>NO GUARDADO</em>':''}
          <button class="${p}im" data-a="open" data-id="${esc(b.id)}" style="background-image:url('${esc(b.url)}')" aria-label="Abrir ${esc(b.n)} en la mesa"></button>
          <div class="${p}ib2"><span title="${esc(b.n)}">${esc(b.n)} · ${esc(b.f||'')}</span>
          <button class="${p}ic" data-a="open" data-id="${esc(b.id)}" aria-label="Editar">${ico('sliders',18)}</button>
          <button class="${p}ic ${p}del" data-a="del" data-id="${esc(b.id)}" aria-label="Quitar">${ico('trash',18)}</button></div></div>`).join('')}</div>`
        :`<div class="${p}empty">Aún no hay bocetos. Sube los croquis del proyecto (implantación, plantas, cortes, perspectivas a mano) para tenerlos juntos y postproducirlos.</div>`}</div>
      </div></div>`;
      const sc=main.querySelector('[data-r="sc"]'); sc.scrollTop=dbUI.scrollG; sc.addEventListener('scroll',()=>{ dbUI.scrollG=sc.scrollTop; },{passive:true});
      const dr=main.querySelector('[data-r="drop"]');
      dr.addEventListener('dragover',e=>{ e.preventDefault(); dr.classList.add(p+'over'); });
      dr.addEventListener('dragleave',()=>dr.classList.remove(p+'over'));
      dr.addEventListener('drop',e=>{ e.preventDefault(); dr.classList.remove(p+'over'); const fs=[...(e.dataTransfer&&e.dataTransfer.files||[])]; if(fs.length) subir(fs,false); });
    }

    /* ---------- MESA ---------- */
    let cv=null, cw=null, g2=null, side=null, pop=null;
    const ptrs=new Map(); let gest=null, act=null;
    function view(){ if(!ED.view) fitView(); return ED.view; }
    function fitView(){ if(!cw) return; const W=cw.clientWidth||300, H=cw.clientHeight||300, b=ED.base; const s=Math.min((W-24)/b.width,(H-24)/b.height); ED.view={s, x:(W-b.width*s)/2, y:(H-b.height*s)/2}; }
    function toImg(sx,sy){ const v=view(); return [(sx-v.x)/v.s,(sy-v.y)/v.s]; }
    function req(){ if(drawQ) return; drawQ=true; raf=requestAnimationFrame(()=>{ drawQ=false; draw(); }); }
    let checker=null;
    function draw(){
      if(!cv||!ED) return; const dpr=Math.min(2,window.devicePixelRatio||1), W=cw.clientWidth, H=cw.clientHeight; if(!W||!H) return;
      if(cv.width!==Math.round(W*dpr)||cv.height!==Math.round(H*dpr)){ cv.width=Math.round(W*dpr); cv.height=Math.round(H*dpr); }
      const g=g2, v=view(), b=ED.proc; g.setTransform(dpr,0,0,dpr,0,0); g.clearRect(0,0,W,H);
      g.strokeStyle='rgba(56,225,255,.06)'; g.lineWidth=1; const st0=40; g.beginPath(); for(let x=((v.x%st0)+st0)%st0;x<W;x+=st0){ g.moveTo(x+.5,0); g.lineTo(x+.5,H); } for(let y=((v.y%st0)+st0)%st0;y<H;y+=st0){ g.moveTo(0,y+.5); g.lineTo(W,y+.5); } g.stroke();
      g.save(); g.translate(v.x,v.y); g.scale(v.s,v.s);
      g.shadowColor='rgba(56,225,255,.35)'; g.shadowBlur=24;
      if(ED.adj.line&&ED.adj.bgT){ if(!checker){ const c=cnv(16,16), cg=c.getContext('2d'); cg.fillStyle='#d9dde3'; cg.fillRect(0,0,16,16); cg.fillStyle='#f4f6f8'; cg.fillRect(0,0,8,8); cg.fillRect(8,8,8,8); checker=g.createPattern(c,'repeat'); } g.fillStyle=checker; g.fillRect(0,0,b.width,b.height); g.shadowBlur=0; }
      else { g.fillStyle='#fff'; g.fillRect(0,0,b.width,b.height); g.shadowBlur=0; }
      g.imageSmoothingQuality='high'; g.drawImage(b,0,0);
      ED.ann.forEach(a=>drawAnn(g,a)); if(act&&act.ann) drawAnn(g,act.ann);
      const px=1/v.s;
      if(ED.crop){ const r=ED.crop, x=Math.min(r.x0,r.x1), y=Math.min(r.y0,r.y1), w=Math.abs(r.x1-r.x0), h=Math.abs(r.y1-r.y0);
        g.fillStyle='rgba(3,6,11,.55)'; g.beginPath(); g.rect(0,0,b.width,b.height); g.rect(x,y,w,h); g.fill('evenodd');
        g.strokeStyle='#38E1FF'; g.lineWidth=2*px; g.setLineDash([8*px,6*px]); g.strokeRect(x,y,w,h); g.setLineDash([]);
        g.fillStyle='#38E1FF'; [[x,y],[x+w,y],[x,y+h],[x+w,y+h]].forEach(q=>g.fillRect(q[0]-5*px,q[1]-5*px,10*px,10*px)); }
      if(ED.pend&&ED.pend.t==='cal'){ const P=ED.pend.pts; g.strokeStyle='#FF5C7A'; g.fillStyle='#FF5C7A'; g.lineWidth=2*px;
        if(P.length===2){ g.setLineDash([10*px,6*px]); g.beginPath(); g.moveTo(P[0][0],P[0][1]); g.lineTo(P[1][0],P[1][1]); g.stroke(); g.setLineDash([]); }
        P.forEach((q,i)=>{ g.beginPath(); g.arc(q[0],q[1],7*px,0,7); g.stroke(); g.beginPath(); g.moveTo(q[0]-12*px,q[1]); g.lineTo(q[0]+12*px,q[1]); g.moveTo(q[0],q[1]-12*px); g.lineTo(q[0],q[1]+12*px); g.stroke(); g.font=`${12*px}px monospace`; g.fillText(i?'B':'A',q[0]+9*px,q[1]-9*px); }); }
      if(ED.pend&&ED.pend.t==='txt'){ const q=ED.pend.pt; g.strokeStyle='#38E1FF'; g.lineWidth=2*px; g.beginPath(); g.moveTo(q[0],q[1]-20*px); g.lineTo(q[0],q[1]+4*px); g.stroke(); }
      g.restore();
      const z=root.querySelector('[data-r="zm"]'); if(z) z.textContent=Math.round(v.s*100)+'%  ·  '+ED.base.width+'×'+ED.base.height+' px';
    }
    const TOOLS=[['move','hand','Mover (1 dedo)'],['pen','pen','Lápiz con presión'],['eraser','eraser','Borrar trazos'],['text','text','Texto'],['north','north','Norte (toca y arrastra la dirección)'],['scale','ruler','Escala gráfica: 2 puntos'],['crop','crop','Recortar']];
    function renderMesa(){
      if(!ED){ main.innerHTML=`<div class="${p}nomesa"><div class="${p}hud"><div style="width:84px;height:84px">${glyphSVG(TRACE_G,p)}</div>
        <div class="${p}h3">Mesa de postproducción</div><div style="color:var(--muted);line-height:1.5;font-size:14px">Abre un boceto de la galería o sube uno nuevo. Recorta, rota, ajusta brillo/contraste y blancos, conviértelo a línea con fondo transparente, cambia el tinte, anota con lápiz, añade escala gráfica calibrada, textos y norte; exporta PNG o guárdalo como nuevo boceto.</div>
        <div class="${p}row" style="flex-wrap:wrap"><button class="${p}btn ${p}pri" data-a="upopen">${ico('up',18)} Subir y abrir</button><button class="${p}btn" data-a="tab" data-v="gal">${ico('img',18)} Ir a galería</button><button class="${p}btn" data-a="blank">${ico('blank',18)} Lienzo en blanco</button></div></div></div>`; return; }
      main.innerHTML=`<div class="${p}mesa">
        <div class="${p}tools" role="toolbar">${TOOLS.map(t=>`<button class="${p}tl" data-a="tool" data-v="${t[0]}" title="${t[2]}" aria-label="${t[2]}" aria-pressed="${ED.tool===t[0]}">${ico(t[1],20)}</button>`).join('')}
          <span class="${p}sep"></span><button class="${p}tl" data-a="rot" data-v="-1" title="Rotar 90° izquierda" aria-label="Rotar a la izquierda">${ico('rl',20)}</button><button class="${p}tl" data-a="rot" data-v="1" title="Rotar 90° derecha" aria-label="Rotar a la derecha">${ico('rr',20)}</button>
          <span class="${p}sep"></span><button class="${p}tl" data-a="undo" title="Deshacer (tap 2 dedos)" aria-label="Deshacer">${ico('undo',20)}</button><button class="${p}tl" data-a="redo" title="Rehacer (tap 3 dedos)" aria-label="Rehacer">${ico('redo',20)}</button>
          <span class="${p}sep"></span><button class="${p}tl" data-a="zin" aria-label="Acercar">${ico('plus',20)}</button><button class="${p}tl" data-a="zout" aria-label="Alejar">${ico('minus',20)}</button><button class="${p}tl" data-a="fit" aria-label="Encuadrar">${ico('fit',20)}</button></div>
        <div class="${p}cvw" data-r="cw"><canvas class="${p}cv" data-r="cv"></canvas><div class="${p}zm" data-r="zm"></div><div class="${p}hint" data-r="hint"></div></div>
        <div class="${p}side" data-r="side"></div></div>`;
      cw=main.querySelector('[data-r="cw"]'); cv=main.querySelector('[data-r="cv"]'); g2=cv.getContext('2d'); side=main.querySelector('[data-r="side"]'); pop=null;
      bindCanvas(); renderSide(); syncTools(); req();
      if(ED.pend) showPop();
    }
    function hint(){ const h={move:'1 dedo: mover · pellizco: zoom',pen:'Dibuja con el dedo o el Pencil (presión) · 2 dedos: mover/zoom',eraser:'Pasa sobre un trazo para borrarlo',text:'Toca donde va el texto',north:'Toca para ubicar y arrastra hacia el norte',scale:'Toca el punto A y el punto B de una medida conocida',crop:'Arrastra un rectángulo y toca “Aplicar recorte”'}[ED.tool]||''; return h+' · tap 2 dedos = deshacer · tap 3 dedos = rehacer'; }
    function syncTools(){ if(!cv) return; main.querySelectorAll('[data-a="tool"]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.v===ED.tool)));
      const u=main.querySelector('[data-a="undo"]'), r=main.querySelector('[data-a="redo"]'); if(u) u.disabled=ED.idx<=0; if(r) r.disabled=ED.idx>=ED.hist.length-1;
      const h=main.querySelector('[data-r="hint"]'); if(h) h.textContent=hint(); }
    function sl(k,lab,min,max,step,val,fmt){ return `<label class="${p}sl"><span>${lab}</span><input class="${p}rg" type="range" min="${min}" max="${max}" step="${step}" value="${val}" data-k="${k}"><output data-o="${k}">${fmt?fmt(val):val}</output></label>`; }
    function renderSide(){
      if(!side) return; const a=ED.adj;
      const calTxt = ED.cal ? `1 m = <em>${Math.round(ED.cal.pxm*10)/10} px</em> · referencia ${fmtM(ED.cal.m)} m` : 'Sin calibrar: usa la regla y marca 2 puntos de una medida conocida (eje, cota, módulo).';
      side.innerHTML=`
        <div class="${p}grp"><div class="${p}lab"><span>${esc(ED.name)}</span><span>${ED.tainted?'<b style="color:var(--warn);font-weight:400">PROTEGIDA</b>':''}</span></div>
          ${ED.tool==='crop'?`<div class="${p}st"><button class="${p}btn ${p}ok" data-a="cropok" ${ED.crop?'':'disabled'}>${ico('check',16)} Aplicar recorte</button><button class="${p}btn" data-a="cropno">Cancelar</button></div>`:''}</div>
        <div class="${p}grp"><div class="${p}lab"><span>Imagen</span><button class="${p}btn" style="min-height:32px;padding:0 8px;font-size:9.5px" data-a="reset">Restablecer</button></div>
          ${sl('br','Brillo',-100,100,1,a.br)}${sl('co','Contraste',-100,100,1,a.co)}${sl('wh','Nivel blancos',120,255,1,a.wh)}</div>
        <div class="${p}grp"><button class="${p}tg" data-a="line" aria-pressed="${a.line}"><span class="${p}bx">${a.line?ico('check',14):''}</span>Convertir a línea</button>
          ${a.line?`${sl('thr','Umbral',40,250,1,a.thr)}
          <div class="${p}lab" style="margin:4px 0 0"><span>Tinte de línea</span></div><div class="${p}sw">${TINT_COL.map(c=>`<button data-a="tint" data-v="${c}" aria-pressed="${a.tint===c}" aria-label="Tinte ${c}"><i style="background:${c}"></i></button>`).join('')}</div>
          <button class="${p}tg" data-a="bgT" aria-pressed="${a.bgT}"><span class="${p}bx">${a.bgT?ico('check',14):''}</span>Fondo transparente</button>`:''}</div>
        <div class="${p}grp"><div class="${p}lab"><span>Lápiz · texto · norte</span></div>
          <div class="${p}sw">${PEN_COL.map(c=>`<button data-a="pen" data-v="${c}" aria-pressed="${ED.pen===c}" aria-label="Color ${c}"><i style="background:${c}"></i></button>`).join('')}</div>
          ${sl('penW','Grosor',.3,4,.1,ED.penW,v=>(+v).toFixed(1))}${sl('txtS','Tamaño texto',.5,4,.1,ED.txtS,v=>(+v).toFixed(1))}</div>
        <div class="${p}grp"><div class="${p}lab"><span>Escala gráfica</span></div><div class="${p}kv">${calTxt}</div></div>
        <div class="${p}grp"><div class="${p}st"><button class="${p}btn ${p}pri" data-a="png">${ico('dl',16)} PNG</button><button class="${p}btn ${p}ok" data-a="saveb">${ico('save',16)} Guardar</button></div>
          <div class="${p}kv" style="font-size:10px">PNG: descarga con anotaciones. Guardar: crea un nuevo boceto en la galería (el original no se toca).</div></div>`;
      side.querySelectorAll('input[type=range]').forEach(r=>{
        r.addEventListener('input',()=>{ const k=r.dataset.k, v=+r.value; const o=side.querySelector(`[data-o="${k}"]`); if(o) o.textContent=(k==='penW'||k==='txtS')?v.toFixed(1):v;
          if(k==='penW'||k==='txtS'){ ED[k]=v; return; } ED.adj[k]=v; schedProc(); });
        r.addEventListener('change',()=>{ const k=r.dataset.k; if(k in ED.adj){ edPush(); syncTools(); } });
      });
    }
    let procT=0; function schedProc(){ if(procT) return; procT=requestAnimationFrame(()=>{ procT=0; edProcess(); req(); }); }
    function closePop(){ if(pop){ pop.remove(); pop=null; } }
    function showPop(){
      closePop(); if(!ED.pend||!cw) return; const pd=ED.pend;
      if(pd.t==='cal'&&pd.pts.length<2) return;
      pop=document.createElement('div'); pop.className=p+'pop '+p+'hud';
      if(pd.t==='cal'){ const dpx=Math.hypot(pd.pts[1][0]-pd.pts[0][0],pd.pts[1][1]-pd.pts[0][1]);
        pop.innerHTML=`<b>Distancia real A–B (m)</b><div class="${p}row"><input class="${p}in" type="number" inputmode="decimal" min="0" step="0.01" placeholder="ej. 5,00" data-r="pv"><button class="${p}btn ${p}ok" data-a="popok">${ico('check',16)}</button><button class="${p}btn" data-a="popno">${ico('close',16)}</button></div><div class="${p}kv">${Math.round(dpx)} px medidos en la imagen</div>`; }
      else { pop.innerHTML=`<b>Texto</b><div class="${p}row"><input class="${p}in" type="text" maxlength="80" placeholder="ej. ACCESO PRINCIPAL" data-r="pv"><button class="${p}btn ${p}ok" data-a="popok">${ico('check',16)}</button><button class="${p}btn" data-a="popno">${ico('close',16)}</button></div>`; }
      cw.appendChild(pop); const inp=pop.querySelector('[data-r="pv"]'); setTimeout(()=>{ try{ inp.focus(); }catch(_){} },30);
      inp.addEventListener('keydown',e=>{ if(e.key==='Enter') popOk(); else if(e.key==='Escape'){ ED.pend=null; closePop(); req(); } });
    }
    function popOk(){
      const inp=pop&&pop.querySelector('[data-r="pv"]'); if(!inp) return; const pd=ED.pend;
      if(pd.t==='cal'){ const m=parseFloat(String(inp.value).replace(',','.')); if(!(m>0)){ ctx.toast('Escribe una distancia mayor que 0'); return; }
        const dpx=Math.hypot(pd.pts[1][0]-pd.pts[0][0],pd.pts[1][1]-pd.pts[0][1]); const pxm=dpx/m; ED.cal={pxm,m};
        const tm=niceM(ED.base.width*.22/pxm); ED.ann=ED.ann.filter(a=>a.t!=='k'); const u=U();
        ED.ann.push({t:'k',x:u*3,y:ED.base.height-u*6,pxm,m:tm,c:ED.pen==='#FFFFFF'?'#14181f':ED.pen});
        ctx.toast('Escala calibrada: 1 m = '+Math.round(pxm)+' px'); }
      else { const v=inp.value.trim(); if(v) ED.ann.push({t:'t',x:pd.pt[0],y:pd.pt[1],s:U()*2.4*ED.txtS,c:ED.pen,v}); }
      ED.pend=null; closePop(); edPush(); renderSide(); syncTools(); req();
    }
    function bindCanvas(){
      const opt={passive:false};
      const pos=e=>{ const r=cv.getBoundingClientRect(); return [e.clientX-r.left,e.clientY-r.top]; };
      const down=e=>{ e.preventDefault(); try{ cv.setPointerCapture(e.pointerId); }catch(_){}
        ptrs.set(e.pointerId,{p:pos(e),t:e.pointerType});
        const n=ptrs.size, now=performance.now();
        if(!gest||n===1) gest={t0:now,max:n,mv:0,start:new Map([...ptrs].map(([k,v])=>[k,v.p.slice()]))};
        else { gest.max=Math.max(gest.max,n); ptrs.forEach((v,k)=>{ if(!gest.start.has(k)) gest.start.set(k,v.p.slice()); }); }
        if(n===1){ startAct(e,pos(e)); }
        else { if(act&&act.kind==='stroke'&&act.ann.p.length<6) act=null; else if(act) endAct(); act=null; startPinch(); }
      };
      const move=e=>{ if(!ptrs.has(e.pointerId)) return; e.preventDefault(); const q=pos(e); const o=ptrs.get(e.pointerId);
        if(gest&&gest.start.has(e.pointerId)){ const s=gest.start.get(e.pointerId); gest.mv=Math.max(gest.mv,Math.hypot(q[0]-s[0],q[1]-s[1])); }
        o.p=q;
        if(ptrs.size>=2&&act&&act.kind==='pinch'){ doPinch(); return; }
        if(act) moveAct(e,q);
      };
      const up=e=>{ if(!ptrs.has(e.pointerId)) return; ptrs.delete(e.pointerId);
        if(act&&act.kind!=='pinch'){ endAct(); act=null; }
        if(ptrs.size===0){ if(act&&act.kind==='pinch') act=null;
          if(gest&&gest.max>=2&&gest.mv<14&&performance.now()-gest.t0<350){ if(gest.max===2) doUndo(); else doRedo(); }
          gest=null; }
        else if(act&&act.kind==='pinch'){ if(ptrs.size>=2) startPinch(); else act=null; }
      };
      cv.addEventListener('pointerdown',down,opt); cv.addEventListener('pointermove',move,opt); cv.addEventListener('pointerup',up); cv.addEventListener('pointercancel',up);
      cv.addEventListener('wheel',e=>{ e.preventDefault(); const q=pos(e); zoomAt(Math.exp(-e.deltaY*.0015),q[0],q[1]); },opt);
    }
    function startPinch(){ const P=[...ptrs.values()].slice(0,2).map(v=>v.p); const v=view();
      act={kind:'pinch',d0:Math.hypot(P[1][0]-P[0][0],P[1][1]-P[0][1])||1,c0:[(P[0][0]+P[1][0])/2,(P[0][1]+P[1][1])/2],v0:Object.assign({},v)}; }
    function doPinch(){ const P=[...ptrs.values()].slice(0,2).map(v=>v.p); const d=Math.hypot(P[1][0]-P[0][0],P[1][1]-P[0][1])||1, c=[(P[0][0]+P[1][0])/2,(P[0][1]+P[1][1])/2];
      const v0=act.v0, s=Math.max(.05,Math.min(20,v0.s*d/act.d0)), ix=(act.c0[0]-v0.x)/v0.s, iy=(act.c0[1]-v0.y)/v0.s; ED.view={s,x:c[0]-ix*s,y:c[1]-iy*s}; req(); }
    function zoomAt(f,cx,cy){ const v=view(), s=Math.max(.05,Math.min(20,v.s*f)), ix=(cx-v.x)/v.s, iy=(cy-v.y)/v.s; ED.view={s,x:cx-ix*s,y:cy-iy*s}; req(); }
    function prs(e){ return e.pointerType==='pen' ? (e.pressure||.5) : .5; }
    function startAct(e,q){
      const T=ED.tool, ip=toImg(q[0],q[1]), u=U();
      if(T==='move'||(e.button===1)){ act={kind:'pan',q0:q,v0:Object.assign({},view())}; return; }
      if(T==='pen'){ act={kind:'stroke',ann:{t:'s',c:ED.pen,w:u*.32*ED.penW,p:[[ip[0],ip[1],prs(e)]]}}; req(); return; }
      if(T==='eraser'){ act={kind:'erase',hit:false}; eraseAt(ip); return; }
      if(T==='crop'){ ED.crop={x0:ip[0],y0:ip[1],x1:ip[0],y1:ip[1]}; act={kind:'crop'}; req(); return; }
      if(T==='north'){ act={kind:'north',ann:{t:'n',x:ip[0],y:ip[1],a:0,r:u*3.2,c:ED.pen==='#FFFFFF'?'#14181f':ED.pen}}; req(); return; }
      if(T==='text'){ act={kind:'tap',fn:()=>{ ED.pend={t:'txt',pt:ip}; showPop(); req(); }}; return; }
      if(T==='scale'){ act={kind:'tap',fn:()=>{ if(!ED.pend||ED.pend.t!=='cal'||ED.pend.pts.length>=2) ED.pend={t:'cal',pts:[]}; ED.pend.pts.push(ip); showPop(); req(); }}; return; }
    }
    function moveAct(e,q){ const ip=toImg(q[0],q[1]);
      if(act.kind==='pan'){ ED.view={s:act.v0.s,x:act.v0.x+q[0]-act.q0[0],y:act.v0.y+q[1]-act.q0[1]}; req(); }
      else if(act.kind==='stroke'){ const ev=e.getCoalescedEvents?e.getCoalescedEvents():[e]; const r=cv.getBoundingClientRect(); (ev.length?ev:[e]).forEach(x=>{ const k=toImg(x.clientX-r.left,x.clientY-r.top); act.ann.p.push([k[0],k[1],prs(x)]); }); req(); }
      else if(act.kind==='erase') eraseAt(ip);
      else if(act.kind==='crop'){ ED.crop.x1=Math.max(0,Math.min(ED.base.width,ip[0])); ED.crop.y1=Math.max(0,Math.min(ED.base.height,ip[1])); ED.crop.x0=Math.max(0,Math.min(ED.base.width,ED.crop.x0)); ED.crop.y0=Math.max(0,Math.min(ED.base.height,ED.crop.y0)); req(); }
      else if(act.kind==='north'){ const dx=ip[0]-act.ann.x, dy=ip[1]-act.ann.y; if(Math.hypot(dx,dy)>U()) act.ann.a=Math.atan2(dx,-dy); req(); }
    }
    function endAct(){ if(!act) return; const k=act.kind;
      if(k==='stroke'){ if(act.ann.p.length){ const a=act.ann; a.p=a.p.map(q=>[Math.round(q[0]*10)/10,Math.round(q[1]*10)/10,Math.round(q[2]*100)/100]); ED.ann.push(a); edPush(); } }
      else if(k==='north'){ ED.ann=ED.ann.filter(a=>a.t!=='n'); ED.ann.push(act.ann); edPush(); }
      else if(k==='erase'){ if(act.hit) edPush(); }
      else if(k==='crop'){ const r=ED.crop; if(!r||Math.abs(r.x1-r.x0)<10||Math.abs(r.y1-r.y0)<10) ED.crop=null; renderSide(); }
      else if(k==='tap'){ if(!gest||gest.mv<14) act.fn(); }
      act=null; syncTools(); req(); }
    function eraseAt(ip){ const rr=Math.max(U()*1.2,14/view().s); const n0=ED.ann.length;
      ED.ann=ED.ann.filter(a=>{ if(a.t==='s') return !a.p.some(q=>Math.hypot(q[0]-ip[0],q[1]-ip[1])<rr); if(a.t==='t'||a.t==='n') return Math.hypot(a.x-ip[0],a.y-ip[1])>rr*2.5; return true; });
      if(ED.ann.length!==n0){ act.hit=true; req(); } }
    function doUndo(){ if(!ED||ED.idx<=0) return; const bc=edRestore(ED.idx-1); if(bc) ED.view=null; ED.pend=null; ED.crop=null; closePop(); renderSide(); syncTools(); req(); ctx.toast('Deshacer'); }
    function doRedo(){ if(!ED||ED.idx>=ED.hist.length-1) return; const bc=edRestore(ED.idx+1); if(bc) ED.view=null; renderSide(); syncTools(); req(); ctx.toast('Rehacer'); }
    function exportBlob(){ return new Promise((res,rej)=>{ let c; try{ c=edComposite(); c.toBlob(b=>b?res(b):rej(new Error('blob')),'image/png'); }catch(err){ rej(err); } }); }
    async function exportPNG(){ try{ const b=await exportBlob(); ctx.download((ED.name||'boceto')+'-post.png',b); ctx.toast('PNG listo'); }catch(_){ ctx.toast('No se puede exportar: la imagen original está protegida (CORS)'); } }
    async function saveAsNew(){ let blob; try{ blob=await exportBlob(); }catch(_){ ctx.toast('No se puede guardar: la imagen está protegida (CORS)'); return; }
      const nm=(ED.name||'boceto')+'-post-'+new Date().toISOString().slice(0,10)+'.png';
      let file; try{ file=new File([blob],nm,{type:'image/png'}); }catch(_){ file=blob; file.name=nm; }
      let res=[]; try{ res=await ctx.upload([file])||[]; }catch(_){ res=[]; }
      const f=new Date().toISOString().slice(0,10);
      if(res.length){ st.bocetos.unshift({id:res[0].id||('b'+Date.now()),url:res[0].url,n:nm,f}); save(); ctx.toast('Guardado como nuevo boceto'); }
      else { dbTmp.unshift({id:'tmp'+Date.now(),url:URL.createObjectURL(blob),n:nm,f,tmp:true}); ctx.toast('Sin permiso de subida: copia temporal en la galería (NO guardada). Usa PNG para descargarla.'); }
    }

    /* ---------- TÉCNICAS ---------- */
    function renderTec(){
      const done=GEO_ALL.filter(id=>st.pasos[id]).length, pct=Math.round(done/GEO_ALL.length*100);
      const t=dbUI.tec&&TEC_BY[dbUI.tec];
      const cards=TEC.map(x=>`<button class="${p}tc ${dbUI.tec===x.id?p+'on':''} ${st.tecnicas.includes(x.id)?p+'use':''}" data-a="tec" data-id="${x.id}">${st.tecnicas.includes(x.id)?'<i>EN USO</i>':''}<div class="${p}tg2">${glyphSVG(x.g,p)}</div><b>${esc(x.n)}</b><small>${esc(x.s)}</small></button>`);
      if(t){ const i=TEC.indexOf(t), cols=Math.max(1,Math.floor(((main.clientWidth||900)-30)/170)); const at=Math.min(TEC.length,(Math.floor(i/cols)+1)*cols);
        cards.splice(at,0,`<div class="${p}tf ${p}hud" data-r="tf"><div class="${p}tfg">${glyphSVG(t.g,p)}</div><div style="display:flex;flex-direction:column;gap:12px;min-width:0">
          <div class="${p}row" style="justify-content:space-between;align-items:flex-start"><div><div style="font-family:var(--f-m);font-size:10.5px;letter-spacing:.14em;color:var(--acc)">${esc(t.s.toUpperCase())}</div><div class="${p}h3" style="margin:4px 0 0;font-size:15px">${esc(t.n)}</div></div><button class="${p}ic" data-a="tecx" aria-label="Cerrar">${ico('close',18)}</button></div>
          <div class="${p}sec"><h4>Definición</h4><p>${esc(t.d)}</p></div>
          <div class="${p}sec ${p}k"><h4>En tu proyecto</h4><p>${esc(t.u)}</p></div>
          <div class="${p}sec"><h4>Pasos</h4><ol>${t.p.map(s=>`<li>${esc(s)}</li>`).join('')}</ol></div>
          <div class="${p}chips">${t.geo.map(g=>`<span class="${p}chip">${g} · ${esc(GEO_T[g]||'')}</span>`).join('')}</div>
          <button class="${p}tg" data-a="tecuse" aria-pressed="${st.tecnicas.includes(t.id)}"><span class="${p}bx">${st.tecnicas.includes(t.id)?ico('check',14):''}</span>La uso en este proyecto</button></div></div>`); }
      main.innerHTML=`<div class="${p}scroll" data-r="sc"><div class="${p}two">
        <div><div class="${p}lab"><span>Técnicas de representación</span><span>${TEC.length} · ${st.tecnicas.length} en uso</span></div><div class="${p}tec">${cards.join('')}</div></div>
        <div><div class="${p}hud" style="padding:14px"><div class="${p}h3">Checklist · pasos de la materia</div>
          <div class="${p}meter"><b>COMPLETADOS <em>${done}/${GEO_ALL.length}</em> · ${pct}%</b><div class="${p}bar"><i style="width:${pct}%"></i></div></div>
          ${GEO_FASES.map(f=>`<div class="${p}fase"><b>${esc(f.n)}</b>${f.ps.map(s=>`<button class="${p}ck" data-a="paso" data-id="${s[0]}" aria-pressed="${!!st.pasos[s[0]]}"><span class="${p}bx">${st.pasos[s[0]]?ico('check',14):''}</span><code>${s[0]}</code><span>${esc(s[1])}</span></button>`).join('')}</div>`).join('')}
        </div></div></div></div>`;
      const sc=main.querySelector('[data-r="sc"]'); if(dbUI.tscroll) sc.scrollTop=dbUI.tscroll; sc.addEventListener('scroll',()=>{ dbUI.tscroll=sc.scrollTop; },{passive:true});
    }

    function renderMain(){
      root.querySelectorAll('[data-a="tab"]').forEach(b=>{ if(b.closest('.'+p+'seg')) b.setAttribute('aria-pressed',String(b.dataset.v===dbUI.tab)); });
      cv=null; cw=null; side=null; pop=null; ptrs.clear(); act=null; gest=null;
      if(dbUI.tab==='mesa') renderMesa(); else if(dbUI.tab==='tec') renderTec(); else renderGal();
    }

    root.addEventListener('click',e=>{
      const b=e.target.closest('[data-a]'); if(!b||!root.contains(b)) return; const a=b.dataset.a;
      if(a==='tab'){ if(dbUI.tab!==b.dataset.v){ dbUI.tab=b.dataset.v; renderMain(); } }
      else if(a==='next'){ save.flush(); ctx.next(); }
      else if(a==='up'){ fileIn.dataset.open=''; fileIn.click(); }
      else if(a==='upopen'){ const f2=document.createElement('input'); f2.type='file'; f2.accept='image/*'; f2.onchange=()=>{ const fs=[...f2.files]; if(fs.length) subir(fs,true); }; f2.click(); }
      else if(a==='blank'){ edBlank(); dbUI.tab='mesa'; renderMain(); }
      else if(a==='open'){ const bo=allBocetos().find(x=>x.id===b.dataset.id); if(bo) abrirEnMesa(bo); }
      else if(a==='del'){ const id=b.dataset.id; const k=dbTmp.findIndex(x=>x.id===id); if(k>=0){ try{ URL.revokeObjectURL(dbTmp[k].url); }catch(_){} dbTmp.splice(k,1); } else { st.bocetos=st.bocetos.filter(x=>x.id!==id); save(); } renderGal(); }
      else if(a==='tool'){ ED.tool=b.dataset.v; if(ED.tool!=='crop') ED.crop=null; if(ED.pend&&!((ED.tool==='scale'&&ED.pend.t==='cal')||(ED.tool==='text'&&ED.pend.t==='txt'))){ ED.pend=null; closePop(); } renderSide(); syncTools(); req(); }
      else if(a==='rot'){ ED.crop=null; ED.pend=null; closePop(); edRotate(+b.dataset.v); renderSide(); syncTools(); req(); }
      else if(a==='undo') doUndo(); else if(a==='redo') doRedo();
      else if(a==='zin'&&cw) zoomAt(1.25,cw.clientWidth/2,cw.clientHeight/2);
      else if(a==='zout'&&cw) zoomAt(.8,cw.clientWidth/2,cw.clientHeight/2);
      else if(a==='fit'){ ED.view=null; req(); }
      else if(a==='cropok'){ if(ED.crop&&edCrop(ED.crop)){ ED.crop=null; ED.tool='move'; renderSide(); syncTools(); req(); } else ctx.toast('Recorte demasiado pequeño'); }
      else if(a==='cropno'){ ED.crop=null; renderSide(); req(); }
      else if(a==='reset'){ ED.adj=Object.assign({},ADJ0); edProcess(); edPush(); renderSide(); syncTools(); req(); }
      else if(a==='line'){ if(ED.tainted){ ctx.toast('Imagen protegida: no admite este ajuste'); return; } ED.adj.line=!ED.adj.line; edProcess(); edPush(); renderSide(); syncTools(); req(); }
      else if(a==='bgT'){ ED.adj.bgT=!ED.adj.bgT; edProcess(); edPush(); renderSide(); syncTools(); req(); }
      else if(a==='tint'){ ED.adj.tint=b.dataset.v; edProcess(); edPush(); renderSide(); syncTools(); req(); }
      else if(a==='pen'){ ED.pen=b.dataset.v; side.querySelectorAll('[data-a="pen"]').forEach(x=>x.setAttribute('aria-pressed',String(x===b))); }
      else if(a==='popok') popOk();
      else if(a==='popno'){ ED.pend=null; closePop(); req(); }
      else if(a==='png') exportPNG();
      else if(a==='saveb') saveAsNew();
      else if(a==='tec'){ dbUI.tec = dbUI.tec===b.dataset.id ? null : b.dataset.id; renderTec(); const tf=main.querySelector('[data-r="tf"]'); if(tf&&tf.scrollIntoView) tf.scrollIntoView({block:'nearest',behavior:'smooth'}); }
      else if(a==='tecx'){ dbUI.tec=null; renderTec(); }
      else if(a==='tecuse'){ const id=dbUI.tec, k=st.tecnicas.indexOf(id); if(k>=0) st.tecnicas.splice(k,1); else st.tecnicas.push(id); save(); renderTec(); }
      else if(a==='paso'){ const id=b.dataset.id; if(st.pasos[id]) delete st.pasos[id]; else st.pasos[id]=new Date().toISOString().slice(0,10); save(); renderTec(); }
    });
    const onKey=e=>{ if(!root.isConnected||dbUI.tab!=='mesa'||!ED) return; if(e.target&&/INPUT|TEXTAREA/.test(e.target.tagName)) return;
      if((e.ctrlKey||e.metaKey)&&e.key.toLowerCase()==='z'){ e.preventDefault(); if(e.shiftKey) doRedo(); else doUndo(); } };
    document.addEventListener('keydown',onKey); cleanups.push(()=>document.removeEventListener('keydown',onKey));
    if('ResizeObserver' in window){ ro=new ResizeObserver(()=>{ if(cv&&ED){ if(!ED.view) fitView(); req(); } }); ro.observe(main); }
    renderMain();
    return ()=>{ save.flush(); if(ro) ro.disconnect(); cancelAnimationFrame(raf); cleanups.forEach(f=>f()); };
  }
};
})();
