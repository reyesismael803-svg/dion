/* Atlas Tipológico — Qué pedirle al cliente (orden real de trabajo, referencia Ecuador)
   Cada ítem: [fase, qué pedir, para qué sirve] */
window.PEDIR = (function(){
const has = (o, re) => re.test(o.n) || re.test(o.sub.n);
function lista(o){
  const c = o.cat.c, e = o.e, L = [];
  const add = (f, t, w) => { if (!L.some(x => x[1] === t)) L.push([f, t, w]); };
  const PUBLICO = /GOB|SEG|INF/.test(c);
  // 1. Identificación
  add(1, "Cédula de identidad del propietario (o RUC y nombramiento del representante legal si es empresa)", "Identificar quién firma el contrato y quién consta como propietario en los trámites municipales.");
  if (PUBLICO) add(1, "Resolución o delegación de la máxima autoridad de la entidad", "En proyectos públicos, quién está autorizado a contratar.");
  add(1, "Datos de contacto y de facturación", "Emitir facturas y mantener comunicación formal.");
  // 2. Terreno y propiedad
  if (!/Pop-up|Food truck|Stand|Escenografía|Instalación artística|Casa rodante|Barco-vivienda/i.test(o.n)){
    add(2, "Copia de la escritura del terreno inscrita en el Registro de la Propiedad", "Demuestra la propiedad, linderos y superficie del lote.");
    add(2, "Certificado de gravámenes actualizado", "Verifica que el terreno no tenga hipotecas, prohibiciones o juicios que impidan construir.");
    add(2, "Comprobante de pago del impuesto predial del año en curso", "El GAD lo exige para cualquier trámite sobre el predio.");
    add(2, "Clave o ficha catastral", "Identifica el predio en el catastro municipal.");
  }
  if (/local|Kiosco|Puesto de mercado|Boutique|Óptica|Florería|Peluquería|Farmacia|Cafetería|Bar\b|Pub|Restaurante|Heladería|Pizzería/i.test(o.n) && e <= 2)
    add(2, "Contrato de arrendamiento del local y autorización del propietario o administrador para hacer adecuaciones", "Si el cliente alquila, necesita permiso escrito para intervenir el local.");
  if (/condominio|Conjunto|Urbanización|Club house|Penthouse|Dúplex|Loft/i.test(o.n))
    add(2, "Reglamento interno del conjunto o edificio y autorización de la administración", "Define lo que se puede construir o modificar dentro de la propiedad horizontal.");
  // 3. Normativa municipal
  add(3, "Informe de Regulación Municipal (IRM), línea de fábrica o certificado de uso de suelo", "Da retiros, COS, CUS, altura, usos permitidos y afectaciones viales: la base legal del diseño.");
  if (/AGR/.test(c) || /rural|campo|Hacienda|Finca|Cabaña|Lodge|Eco-lodge|Glamping|Camping|Hostería/i.test(o.n))
    add(3, "Certificado de uso de suelo rural y lote mínimo según el PUGS del cantón", "En suelo rural hay usos y subdivisiones restringidas.");
  if (/histórico|patrimonial|Casa museo|Casa patio|Hotel boutique|Mansión/i.test(o.n))
    add(3, "Ficha de inventario patrimonial (si el inmueble está protegido)", "Indica qué se puede intervenir y exige aprobación de la entidad de patrimonio.");
  if (/playa|Beach|Malecón|Palafito|Casa flotante|Muelle|Marina|Puerto|Camaronera|Terminal de cruceros|Hotel flotante/i.test(o.n))
    add(3, "Autorización de uso de zona de playa, bahía, ribera o manglar, y mapa de riesgo (inundación / tsunami)", "Las zonas costeras y ribereñas tienen retiros y permisos adicionales.");
  // 4. Estudios y levantamientos
  if (e >= 2 || /ladera/i.test(o.n)) add(4, "Levantamiento topográfico georreferenciado (o autorización para contratarlo)", "Curvas de nivel, linderos reales, árboles, redes y construcciones existentes.");
  if (e >= 3 || /ladera|Palafito|Rascacielos|Torre/i.test(o.n)) add(4, "Estudio de suelos (geotécnico) o autorización para contratarlo", "Define la cimentación y detecta rellenos, agua o suelos blandos.");
  if (/ladera|Cueva/i.test(o.n)) add(4, "Estudio de estabilidad de taludes y de drenaje", "Indispensable en pendientes para evitar deslizamientos.");
  if (/Remodel|existente|histórico|parador|Casa museo|Fábrica de artes/i.test(o.n) || /Hotel histórico/.test(o.n)) add(4, "Planos y fotografías de la construcción existente, y permisos anteriores", "Base para el levantamiento y diagnóstico de lo que ya existe.");
  if (e >= 3) add(4, "Factibilidad de servicios: agua potable y alcantarillado, energía eléctrica y telecomunicaciones", "Confirma que las empresas públicas pueden abastecer el proyecto y con qué condiciones.");
  if (e >= 4 || /Centro comercial|Hipermercado|Terminal|Estadio|Coliseo|Aeropuerto|Centro de convenciones|Mercado mayorista|Universidad|Campus/i.test(o.n)) add(4, "Estudio de impacto vial / tráfico", "El GAD lo exige para grandes atractores de viajes.");
  if (e >= 3 || /IND|INF|AGR/.test(c)) add(4, "Categorización ambiental en el SUIA (certificado, registro o licencia ambiental según el impacto)", "La autoridad ambiental define qué permiso necesita el proyecto.");
  // 5. Programa y operación
  add(5, "Necesidades, número de usuarios y programa de espacios deseado", "Arranque del programa arquitectónico.");
  add(5, "Referencias, gustos y lo que NO quiere", "Evita rediseños y alinea expectativas.");
  if (/HOS/.test(c)) { add(5, "Estudio de mercado o factibilidad hotelera / turística (número de habitaciones, tarifa, público)", "Dimensiona el hotel y su rentabilidad."); if (e >= 3) add(5, "Manual de estándares técnicos de la marca u operador (si lo hay)", "Las marcas exigen áreas, sistemas y acabados mínimos."); add(5, "Categoría turística a la que aspira según el Reglamento de Alojamiento Turístico", "Cada categoría exige servicios e instalaciones distintas."); }
  if (/COM|GAS/.test(c)) { add(5, "Modelo de negocio: productos, horarios, aforo esperado y personal", "Define el tamaño de áreas de venta, cocina, bodega y servicio."); add(5, "Manual de marca o de franquicia (si aplica)", "Las cadenas imponen imagen, mobiliario y proveedores."); }
  if (/GAS/.test(c) || /Cocina|Restaurante|Cafetería|Panadería/i.test(o.n)) add(5, "Menú o carta y lista de equipos de cocina", "El menú define el tamaño y los equipos de la cocina.");
  if (/SAL/.test(c)) { add(5, "Cartera de servicios médicos y número de consultorios, camas o quirófanos", "Define la tipología y el programa médico."); add(5, "Lista de equipamiento médico con fichas técnicas", "Los equipos definen dimensiones, blindajes e instalaciones."); add(5, "Requisitos de licenciamiento del establecimiento de salud (ACESS / MSP)", "El diseño debe cumplir la normativa de licenciamiento sanitario."); }
  if (/EDU/.test(c)) { add(5, "Número de estudiantes por nivel, jornadas y modelo pedagógico", "Define aulas, laboratorios, patios y baterías sanitarias."); add(5, "Requisitos del Ministerio de Educación para autorización de funcionamiento (si es particular)", "La infraestructura debe cumplir estándares oficiales."); }
  if (/OFI|MIX/.test(c)) add(5, "Organigrama o número de puestos por área y proyección de crecimiento", "Base para dimensionar las plantas de oficina.");
  if (/IND|AGR|INF|CIE/.test(c)) add(5, "Descripción del proceso productivo o técnico, maquinaria y flujo de materiales", "El proceso define el edificio, no al revés.");
  if (/DEP|CUL|EVE/.test(c) && e >= 3) add(5, "Aforo esperado, tipo de eventos y normas de la disciplina o federación", "Define graderías, evacuación y dimensiones reglamentarias.");
  if (/RES/.test(c) && /multifamiliar|conjuntos|condominios/i.test(o.sub.n) || c === "MIX") add(5, "Estudio de mercado inmobiliario: precios, tamaños de unidades y velocidad de venta", "Define la mezcla de unidades y la viabilidad.");
  if (/Tiny house|modular|contenedor|prefabricada|emergencia|Domo|Yurta/i.test(o.n)) add(5, "Si es prefabricada o móvil: fabricante, ficha técnica y ruta de acceso al lote (ancho, pendiente, grúa)", "Confirma que el módulo pueda llegar e instalarse.");
  // 6. Presupuesto
  add(6, "Presupuesto disponible de obra y de honorarios", "Evita diseñar algo que el cliente no puede construir.");
  add(6, "Forma de financiamiento (propio, crédito, preventa, inversionistas)", PUBLICO ? "En lo público: certificación presupuestaria." : "Define etapas, contratos y plazos.");
  if (PUBLICO || /Unidad Educativa del Milenio|Centro de salud tipo|Plataforma gubernamental/i.test(o.n)) add(6, "Términos de referencia, certificación presupuestaria y pliegos del proceso de contratación", "Exigidos por la LOSNCP para contratar con el Estado.");
  add(6, "Plazos deseados de inicio y entrega", "Para el cronograma y el contrato.");
  if (o.fi && o.fi.pd) o.fi.pd.forEach(x => add(7, x[0], x[1] || ""));
  return L.sort((a,b) => a[0]-b[0]);
}
const FASES = {1:"Identificación del cliente",2:"Terreno y propiedad",3:"Normativa municipal",4:"Estudios y levantamientos",5:"Programa y operación",6:"Presupuesto y plazos",7:"Específico de esta tipología"};
return {lista, FASES};
})();
