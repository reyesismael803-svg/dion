/* Atlas Tipológico — Biblioteca de contratos (referencia: legislación ecuatoriana)
   Plantillas referenciales. Deben revisarse con un abogado antes de firmarse. */
window.CONTRATOS = (function(){
const PIE = `\n\n—\nNota: plantilla referencial redactada con base en la legislación ecuatoriana (Código Civil, Ley de Arbitraje y Mediación y normas afines). Adáptela al caso y hágala revisar por un abogado antes de firmarla.`;
const COMP = (a,b) => `COMPARECIENTES.- Comparecen a la celebración del presente contrato, por una parte, [NOMBRE COMPLETO / RAZÓN SOCIAL], con cédula/RUC N.° [____], domiciliado en [CIUDAD, DIRECCIÓN], por sus propios derechos [o representado por ____, en calidad de ____], a quien en adelante se denominará "${a}"; y, por otra parte, [NOMBRE COMPLETO / RAZÓN SOCIAL], con cédula/RUC N.° [____], domiciliado en [CIUDAD, DIRECCIÓN], a quien en adelante se denominará "${b}". Los comparecientes son legalmente capaces para contratar y obligarse, y convienen libre y voluntariamente en celebrar el presente contrato al tenor de las siguientes cláusulas:`;
const CONTROV = `CONTROVERSIAS.- Las partes procurarán resolver amistosamente cualquier diferencia. De no lograrlo en quince (15) días, se someterán a mediación en el Centro de Mediación de [CÁMARA / INSTITUCIÓN] de [CIUDAD], conforme a la Ley de Arbitraje y Mediación. Si la mediación fracasa, la controversia se resolverá [por arbitraje en derecho en el mismo centro / ante los jueces competentes de [CIUDAD]].`;
const FIRMA = (a,b) => `ACEPTACIÓN.- Las partes aceptan el contenido íntegro de este contrato y, para constancia, lo suscriben en [número] ejemplares de igual valor, en [CIUDAD], a [DÍA] de [MES] de [AÑO].\n\n\n______________________          ______________________\n${a}                               ${b}`;

const L = {
DIS:{n:"Contrato de prestación de servicios profesionales de diseño arquitectónico", r:"Todos los proyectos. Es el primer contrato que se firma con el cliente.", t:
`CONTRATO DE PRESTACIÓN DE SERVICIOS PROFESIONALES DE DISEÑO ARQUITECTÓNICO

${COMP("EL CLIENTE","EL ARQUITECTO")}

PRIMERA: ANTECEDENTES.- EL CLIENTE es [propietario / posesionario / promotor] del inmueble ubicado en [PROVINCIA, CANTÓN, PARROQUIA, DIRECCIÓN], clave catastral N.° [____], con una superficie de [___] m², según [escritura / certificado]. EL CLIENTE desea desarrollar en dicho inmueble un proyecto de [TIPOLOGÍA] y requiere los servicios profesionales de EL ARQUITECTO, quien cuenta con registro profesional N.° [SENESCYT ____] y afiliación al Colegio de Arquitectos del Ecuador, núcleo de [____].

SEGUNDA: OBJETO.- EL ARQUITECTO se obliga a elaborar el diseño arquitectónico del proyecto [NOMBRE DEL PROYECTO], de aproximadamente [___] m² de construcción, de acuerdo con el programa arquitectónico aprobado por EL CLIENTE y la normativa vigente (Norma Ecuatoriana de la Construcción, normas INEN de accesibilidad, ordenanzas e Informe de Regulación Municipal del GAD de [____]).

TERCERA: ALCANCE Y FASES.- Los servicios comprenden:
a) Fase 1 – Programa y estudios preliminares: levantamiento de necesidades, programa arquitectónico, análisis del terreno y de la normativa, diagramas de relaciones y zonificación.
b) Fase 2 – Anteproyecto: plantas, cortes, fachadas, implantación, volumetría y/o renders [número], y estimación preliminar de costos.
c) Fase 3 – Proyecto definitivo: planos arquitectónicos a escala, detalles constructivos, especificaciones técnicas, cuadro de acabados y memoria descriptiva.
d) Fase 4 – Aprobación: preparación y gestión de la documentación para la aprobación de planos y la obtención del permiso o licencia de construcción ante el GAD.
No se incluyen, salvo acuerdo escrito, los estudios de ingenierías (estructural, hidrosanitario, eléctrico, mecánico), topografía, estudio de suelos, tasas municipales, dirección técnica ni fiscalización de obra.

CUARTA: PLAZO.- El plazo total es de [___] días calendario contados desde la firma de este contrato y la entrega de la información indicada en la cláusula sexta, distribuido así: Fase 1 [__] días; Fase 2 [__] días; Fase 3 [__] días; Fase 4 según los tiempos de la entidad municipal, que no son imputables a EL ARQUITECTO.

QUINTA: HONORARIOS Y FORMA DE PAGO.- EL CLIENTE pagará a EL ARQUITECTO la suma de USD [____] ([EN LETRAS] dólares de los Estados Unidos de América), más el IVA vigente, [calculada como ___ % del costo estimado de obra / USD ___ por m² / suma global], de la siguiente forma: [30] % a la firma del contrato; [30] % a la aprobación del anteproyecto; [30] % a la entrega del proyecto definitivo; [10] % a la aprobación municipal de planos. Contra cada pago EL ARQUITECTO emitirá la factura correspondiente.

SEXTA: OBLIGACIONES DE EL CLIENTE.- a) Entregar copia de la escritura, certificado de gravámenes, pago del impuesto predial, Informe de Regulación Municipal y levantamiento topográfico, si existiere; b) aprobar o formular observaciones por escrito a cada fase dentro de [10] días; c) pagar oportunamente los honorarios, tasas y costos de trámites; d) designar un interlocutor único.

SÉPTIMA: OBLIGACIONES DE EL ARQUITECTO.- a) Ejecutar los servicios con diligencia y conforme a la normativa técnica vigente; b) incorporar hasta [dos (2)] rondas de cambios por fase; c) informar a EL CLIENTE sobre el avance; d) guardar reserva sobre la información recibida.

OCTAVA: CAMBIOS ADICIONALES.- Las modificaciones solicitadas después de aprobada una fase, o que alteren sustancialmente el programa o el área, se considerarán trabajos adicionales y se pagarán a razón de USD [___] por hora o según presupuesto aceptado por escrito.

NOVENA: PROPIEDAD INTELECTUAL.- EL ARQUITECTO conserva los derechos morales de autor sobre el diseño. EL CLIENTE adquiere el derecho de uso de los planos exclusivamente para construir una (1) vez el proyecto en el inmueble descrito. Cualquier reproducción en otro lugar requiere autorización escrita. EL ARQUITECTO podrá publicar el proyecto en su portafolio, salvo pedido expreso de confidencialidad.

DÉCIMA: SUSPENSIÓN Y TERMINACIÓN.- El contrato termina por cumplimiento, mutuo acuerdo o incumplimiento grave. Si EL CLIENTE decide terminarlo anticipadamente, pagará los honorarios de las fases concluidas y la parte proporcional de la fase en curso. Si el proyecto se suspende por más de [90] días por causas ajenas a EL ARQUITECTO, los plazos se ajustarán y podrán revisarse los honorarios.

DÉCIMA PRIMERA: RESPONSABILIDAD.- EL ARQUITECTO responde por el diseño que elabora. No responde por la ejecución de la obra si no ha sido contratado para su dirección técnica o fiscalización, ni por modificaciones hechas por terceros.

DÉCIMA SEGUNDA: ${CONTROV}

DÉCIMA TERCERA: ${FIRMA("EL CLIENTE","EL ARQUITECTO")}` + PIE},

ETE:{n:"Contrato de consultoría de estudios técnicos (ingenierías y estudios de base)", r:"Proyectos desde escala pequeña: estructural, hidrosanitario, eléctrico, suelos, topografía, etc.", t:
`CONTRATO DE CONSULTORÍA PARA ESTUDIOS TÉCNICOS COMPLEMENTARIOS

${COMP("EL CONTRATANTE","EL CONSULTOR")}

PRIMERA: ANTECEDENTES.- EL CONTRATANTE desarrolla el proyecto [NOMBRE], cuyo diseño arquitectónico está a cargo de [ARQUITECTO]. Para completar el proyecto definitivo y obtener la licencia de construcción se requieren estudios técnicos a cargo de un profesional habilitado.

SEGUNDA: OBJETO.- EL CONSULTOR se obliga a elaborar el/los siguiente(s) estudio(s): [marque] ☐ levantamiento topográfico ☐ estudio de suelos (geotécnico) ☐ diseño estructural ☐ diseño hidrosanitario ☐ diseño eléctrico y electrónico ☐ diseño mecánico (climatización, ventilación, gases) ☐ sistema contra incendios ☐ otros: [____], con base en los planos arquitectónicos aprobados por EL CONTRATANTE y en la Norma Ecuatoriana de la Construcción (NEC) vigente.

TERCERA: PRODUCTOS.- Memoria técnica y de cálculo, planos a escala con detalles, especificaciones técnicas, cantidades de obra y presupuesto referencial de su especialidad, en formato digital editable y PDF firmado.

CUARTA: COORDINACIÓN.- EL CONSULTOR coordinará con el arquitecto y los demás consultores para evitar interferencias entre sistemas, y atenderá las observaciones de la entidad municipal y del Cuerpo de Bomberos hasta la aprobación.

QUINTA: PLAZO.- [___] días calendario contados desde la entrega de los planos arquitectónicos definitivos.

SEXTA: VALOR Y FORMA DE PAGO.- USD [____] más IVA: [50] % de anticipo; [40] % contra entrega de productos; [10] % contra aprobación municipal.

SÉPTIMA: RESPONSABILIDAD PROFESIONAL.- EL CONSULTOR es responsable técnico de sus cálculos y diseños, firma los planos con su registro profesional y responde por errores u omisiones de su especialidad conforme a la ley.

OCTAVA: VISITAS DE OBRA.- Se incluyen [___] visitas durante la construcción para aclaraciones. Las visitas adicionales se facturarán a USD [___] cada una.

NOVENA: CONFIDENCIALIDAD Y PROPIEDAD.- Los estudios se destinan exclusivamente a este proyecto. EL CONSULTOR mantiene la autoría técnica.

DÉCIMA: ${CONTROV}

DÉCIMA PRIMERA: ${FIRMA("EL CONTRATANTE","EL CONSULTOR")}` + PIE},

CON:{n:"Contrato de construcción a precio fijo (suma alzada)", r:"Obras pequeñas y medianas con planos completos: el precio no cambia salvo cambios de diseño.", t:
`CONTRATO DE CONSTRUCCIÓN A PRECIO FIJO (SUMA ALZADA)

${COMP("EL PROPIETARIO","EL CONSTRUCTOR")}

PRIMERA: ANTECEDENTES.- EL PROPIETARIO cuenta con los planos aprobados y la licencia/permiso de construcción N.° [____] emitida por el GAD de [____] para el proyecto [NOMBRE], ubicado en [DIRECCIÓN].

SEGUNDA: OBJETO.- EL CONSTRUCTOR se obliga a ejecutar la totalidad de la obra descrita en los planos, especificaciones técnicas y presupuesto que forman parte integrante de este contrato como Anexos 1, 2 y 3, suministrando mano de obra, materiales, equipos y herramientas.

TERCERA: PRECIO.- El precio total, fijo e invariable es de USD [____] más IVA. Solo se modificará por cambios de diseño ordenados por escrito por EL PROPIETARIO, que se valorarán mediante orden de cambio firmada por ambas partes antes de ejecutarse.

CUARTA: FORMA DE PAGO.- a) Anticipo del [30] % a la firma, contra entrega de una garantía o pagaré por buen uso del anticipo; b) pagos por avance de obra mediante planillas [quincenales / mensuales] aprobadas por [el fiscalizador / EL PROPIETARIO], de las que se descontará proporcionalmente el anticipo; c) se retendrá el [5] % de cada planilla como fondo de garantía, que se devolverá en la recepción definitiva.

QUINTA: PLAZO.- [___] días calendario desde la entrega del anticipo y del terreno libre. Se adjunta cronograma valorado (Anexo 4). Por cada día de retraso imputable a EL CONSTRUCTOR se aplicará una multa del [1 por mil] del valor del contrato, hasta un máximo del [10] %.

SEXTA: OBLIGACIONES DE EL CONSTRUCTOR.- a) Ejecutar la obra conforme a planos, NEC y buenas prácticas; b) afiliar al IESS a todo su personal y cumplir las normas de seguridad y salud en el trabajo; c) mantener libro de obra; d) responder por daños a terceros y vecinos; e) mantener la obra limpia y retirar escombros a sitios autorizados; f) no subcontratar la totalidad de la obra sin autorización.

SÉPTIMA: OBLIGACIONES DE EL PROPIETARIO.- a) Pagar oportunamente las planillas aprobadas; b) entregar el terreno libre y los permisos; c) designar un fiscalizador o representante técnico.

OCTAVA: MATERIALES Y CALIDAD.- Los materiales serán de primera calidad y conforme a especificaciones. La fiscalización podrá rechazar materiales o trabajos defectuosos, que EL CONSTRUCTOR reemplazará a su costo.

NOVENA: RECEPCIÓN.- Concluida la obra se suscribirá un acta de recepción provisional. Transcurridos [90/180] días sin defectos se firmará el acta de recepción definitiva y se devolverá el fondo de garantía.

DÉCIMA: GARANTÍA Y RESPONSABILIDAD.- EL CONSTRUCTOR responde por los vicios de construcción conforme al Código Civil, que establece su responsabilidad si el edificio perece o amenaza ruina dentro de los cinco años siguientes a su entrega por vicio de la construcción, del suelo o de los materiales que él suministró.

DÉCIMA PRIMERA: TERMINACIÓN.- Son causas de terminación: cumplimiento, mutuo acuerdo, incumplimiento grave, abandono de obra por más de [15] días o quiebra de EL CONSTRUCTOR. En caso de terminación se liquidará lo ejecutado.

DÉCIMA SEGUNDA: ${CONTROV}

DÉCIMA TERCERA: ${FIRMA("EL PROPIETARIO","EL CONSTRUCTOR")}` + PIE},

CPU:{n:"Contrato de construcción por precios unitarios", r:"Obras medianas y grandes donde las cantidades pueden variar (movimientos de tierra, cimentaciones, infraestructura).", t:
`CONTRATO DE CONSTRUCCIÓN POR PRECIOS UNITARIOS

${COMP("EL CONTRATANTE","EL CONTRATISTA")}

PRIMERA: OBJETO.- EL CONTRATISTA ejecutará la obra [NOMBRE], ubicada en [____], de acuerdo con planos, especificaciones y la tabla de cantidades y precios unitarios (Anexo 1), que incluye análisis de precios unitarios (costos directos e indirectos).

SEGUNDA: VALOR.- El valor referencial es USD [____] más IVA. El valor final será el que resulte de multiplicar las cantidades realmente ejecutadas y medidas por los precios unitarios pactados.

TERCERA: CANTIDADES Y RUBROS NUEVOS.- Las cantidades podrán aumentar o disminuir según las necesidades de la obra, previa autorización de la fiscalización. Los rubros no previstos se ejecutarán mediante precios nuevos acordados por escrito antes de su ejecución, sobre la base de los análisis de precios del contrato.

CUARTA: MEDICIÓN Y PLANILLAS.- La fiscalización y EL CONTRATISTA medirán conjuntamente las cantidades ejecutadas cada [mes]. Las planillas incluirán memoria de cálculo y fotografías. EL CONTRATANTE pagará dentro de [15] días de su aprobación.

QUINTA: REAJUSTE DE PRECIOS.- [Se aplicará / No se aplicará] fórmula polinómica de reajuste con base en los índices publicados por el INEC.

SEXTA: ANTICIPO Y GARANTÍAS.- Anticipo del [___] % contra garantía de buen uso del anticipo por igual valor; garantía de fiel cumplimiento del [5] % del contrato; retención del [5] % en cada planilla.

SÉPTIMA: PLAZO Y MULTAS.- [___] días calendario según cronograma. Multa del [1 por mil] del valor de las obligaciones pendientes por cada día de retraso.

OCTAVA: OBLIGACIONES LABORALES Y DE SEGURIDAD.- EL CONTRATISTA es el único empleador de su personal, cumplirá con el Código del Trabajo, la afiliación al IESS y el reglamento de seguridad para la construcción y obras públicas.

NOVENA: RECEPCIONES.- Recepción provisional al terminar la obra; recepción definitiva a los [180] días, previa corrección de defectos.

DÉCIMA: ${CONTROV}

DÉCIMA PRIMERA: ${FIRMA("EL CONTRATANTE","EL CONTRATISTA")}` + PIE},

ADM:{n:"Contrato de construcción por administración delegada (costo más honorario)", r:"Cuando el propietario quiere control total de gastos o el diseño no está cerrado. El constructor administra y cobra un porcentaje.", t:
`CONTRATO DE CONSTRUCCIÓN POR ADMINISTRACIÓN DELEGADA

${COMP("EL PROPIETARIO","EL ADMINISTRADOR DE OBRA")}

PRIMERA: OBJETO.- EL ADMINISTRADOR DE OBRA dirigirá y administrará, por cuenta y riesgo de EL PROPIETARIO, la construcción del proyecto [NOMBRE] conforme a planos y especificaciones aprobados.

SEGUNDA: MODALIDAD.- Todos los costos directos de la obra (materiales, mano de obra, equipos, subcontratos, permisos) serán pagados por EL PROPIETARIO a través de una cuenta o fondo rotativo de obra. EL ADMINISTRADOR no obtiene utilidad sobre dichos costos.

TERCERA: HONORARIOS.- EL ADMINISTRADOR percibirá un honorario equivalente al [___] % del costo directo real de la obra, pagadero [mensualmente] sobre los costos justificados en el periodo.

CUARTA: FONDO ROTATIVO.- EL PROPIETARIO depositará al inicio USD [____] y lo repondrá contra la presentación de rendiciones de cuentas [quincenales] con facturas a nombre de EL PROPIETARIO.

QUINTA: PRESUPUESTO DE CONTROL.- Se adjunta presupuesto referencial de USD [____]. EL ADMINISTRADOR informará por escrito cualquier desviación superior al [5] % antes de incurrir en ella.

SEXTA: COMPRAS.- Las compras mayores a USD [____] requerirán tres cotizaciones y aprobación de EL PROPIETARIO. Los descuentos obtenidos benefician a EL PROPIETARIO.

SÉPTIMA: PERSONAL.- EL ADMINISTRADOR contratará al personal en nombre de [EL PROPIETARIO / sí mismo] cumpliendo el Código del Trabajo y la afiliación al IESS; los costos laborales se cargan a la obra.

OCTAVA: INFORMES.- Informe mensual de avance físico y financiero, fotografías y proyección del costo final.

NOVENA: PLAZO ESTIMADO.- [___] meses, sujeto a la disponibilidad de fondos.

DÉCIMA: TERMINACIÓN.- Cualquiera de las partes podrá terminar el contrato con [30] días de aviso. Se liquidarán los honorarios devengados y se entregará la contabilidad de la obra.

DÉCIMA PRIMERA: ${CONTROV}

DÉCIMA SEGUNDA: ${FIRMA("EL PROPIETARIO","EL ADMINISTRADOR DE OBRA")}` + PIE},

FIS:{n:"Contrato de fiscalización y dirección técnica de obra", r:"Obras medianas en adelante: un profesional independiente controla calidad, costo y plazo en nombre del propietario.", t:
`CONTRATO DE SERVICIOS DE FISCALIZACIÓN Y DIRECCIÓN TÉCNICA DE OBRA

${COMP("EL PROPIETARIO","EL FISCALIZADOR")}

PRIMERA: OBJETO.- EL FISCALIZADOR controlará, en representación técnica de EL PROPIETARIO, la ejecución de la obra [NOMBRE] contratada con [CONSTRUCTOR], velando por el cumplimiento de planos, especificaciones, presupuesto y cronograma.

SEGUNDA: ACTIVIDADES.- a) Revisar planos y detectar inconsistencias antes del inicio; b) verificar replanteo, niveles y ejes; c) controlar calidad de materiales y ensayos (hormigón, acero, suelos); d) llevar el libro de obra; e) revisar y aprobar planillas y órdenes de cambio; f) controlar el cronograma y alertar desviaciones; g) verificar el cumplimiento de seguridad y salud en obra; h) elaborar informes [semanales/mensuales] con fotografías; i) participar en las recepciones provisional y definitiva.

TERCERA: DEDICACIÓN.- [Tiempo completo / ___ visitas semanales]. EL FISCALIZADOR estará presente en fundiciones de elementos estructurales.

CUARTA: HONORARIOS.- [___] % del valor de la obra / USD [____] mensuales más IVA, pagaderos [mensualmente] contra informe aprobado.

QUINTA: PLAZO.- Igual al plazo de la obra más [30] días para la liquidación. Si la obra se extiende por causas no imputables a EL FISCALIZADOR, los honorarios se ajustarán proporcionalmente.

SEXTA: INDEPENDENCIA.- EL FISCALIZADOR no tendrá relación de dependencia ni interés económico con el constructor.

SÉPTIMA: RESPONSABILIDAD.- EL FISCALIZADOR responde por la aprobación negligente de trabajos o planillas contrarios a los documentos del contrato.

OCTAVA: ${CONTROV}

NOVENA: ${FIRMA("EL PROPIETARIO","EL FISCALIZADOR")}` + PIE},

GER:{n:"Contrato de gerencia de proyecto", r:"Proyectos grandes o complejos: un gerente coordina diseño, permisos, contratos, costos y plazos de principio a fin.", t:
`CONTRATO DE SERVICIOS DE GERENCIA DE PROYECTO

${COMP("EL PROMOTOR","EL GERENTE DE PROYECTO")}

PRIMERA: OBJETO.- EL GERENTE DE PROYECTO planificará, coordinará y controlará, en representación de EL PROMOTOR, todas las etapas del proyecto [NOMBRE]: prefactibilidad, diseño, permisos, contratación, construcción, puesta en marcha y cierre.

SEGUNDA: ALCANCE.- a) Elaborar el plan de gestión del proyecto (alcance, cronograma maestro, presupuesto, riesgos); b) preparar términos de referencia y conducir la selección de diseñadores, consultores y constructores; c) coordinar a los consultores y revisar sus entregables; d) gestionar permisos y licencias; e) controlar costos, cambios y flujo de caja; f) administrar contratos y reclamos; g) reportar mensualmente a EL PROMOTOR; h) coordinar la recepción y entrega al operador.

TERCERA: FACULTADES.- EL GERENTE actuará dentro de los límites de autorización que EL PROMOTOR fije por escrito. Las decisiones que superen USD [____] o alteren el alcance requerirán aprobación de EL PROMOTOR.

CUARTA: HONORARIOS.- [___] % del costo total del proyecto / USD [____] mensuales, más IVA. [Bonificación por cumplimiento de plazo y presupuesto: ___].

QUINTA: PLAZO.- Desde la firma hasta el cierre del proyecto, estimado en [___] meses.

SEXTA: EQUIPO.- EL GERENTE asignará un equipo mínimo compuesto por [____]. Su reemplazo requiere aviso a EL PROMOTOR.

SÉPTIMA: CONFIDENCIALIDAD.- Toda la información del proyecto es confidencial y de propiedad de EL PROMOTOR.

OCTAVA: TERMINACIÓN.- Por cumplimiento, mutuo acuerdo o decisión unilateral con [60] días de aviso, pagando lo devengado.

NOVENA: ${CONTROV}

DÉCIMA: ${FIRMA("EL PROMOTOR","EL GERENTE DE PROYECTO")}` + PIE},

EPC:{n:"Contrato llave en mano (diseño y construcción)", r:"Cuando el cliente quiere un solo responsable que diseñe y construya, a precio y plazo cerrados (modulares, industrial, hoteles de cadena).", t:
`CONTRATO LLAVE EN MANO (DISEÑO Y CONSTRUCCIÓN)

${COMP("EL CLIENTE","EL CONTRATISTA INTEGRAL")}

PRIMERA: OBJETO.- EL CONTRATISTA INTEGRAL se obliga a diseñar, obtener permisos, construir, equipar [si aplica] y entregar en funcionamiento el proyecto [NOMBRE], conforme a los requerimientos del cliente (Anexo 1: programa, estándares y especificaciones de desempeño).

SEGUNDA: PRECIO GLOBAL.- USD [____] más IVA, precio global y fijo que incluye diseño, estudios, permisos, materiales, mano de obra, equipos, pruebas y puesta en marcha.

TERCERA: APROBACIONES DE DISEÑO.- EL CLIENTE revisará el anteproyecto y el proyecto definitivo en un plazo de [10] días. Su aprobación no exime a EL CONTRATISTA de su responsabilidad por el diseño.

CUARTA: HITOS DE PAGO.- [10] % a la firma; [10] % al aprobar el diseño; [70] % por avance de obra certificado; [10] % a la recepción definitiva.

QUINTA: PLAZO.- [___] días calendario hasta la entrega en funcionamiento, con multas del [1 por mil] por día de retraso.

SEXTA: RIESGOS.- EL CONTRATISTA asume el riesgo de diseño, de cantidades y de precios de materiales, salvo cambios de alcance solicitados por EL CLIENTE o eventos de fuerza mayor.

SÉPTIMA: PRUEBAS Y ENTREGA.- Antes de la recepción se realizarán pruebas de funcionamiento de instalaciones y equipos. Se entregarán planos as-built, manuales y garantías de fabricantes, y se capacitará al personal de EL CLIENTE.

OCTAVA: GARANTÍAS.- Garantía de fiel cumplimiento del [5] %; garantía técnica de [12] meses sobre instalaciones y equipos; responsabilidad por vicios de construcción conforme al Código Civil.

NOVENA: SEGUROS.- EL CONTRATISTA contratará seguro de todo riesgo de construcción y de responsabilidad civil durante la obra.

DÉCIMA: ${CONTROV}

DÉCIMA PRIMERA: ${FIRMA("EL CLIENTE","EL CONTRATISTA INTEGRAL")}` + PIE},

SUM:{n:"Contrato de suministro e instalación de equipos especializados", r:"Proyectos con equipamiento técnico: médico, cocina industrial, ascensores, climatización, escenotecnia, maquinaria.", t:
`CONTRATO DE SUMINISTRO E INSTALACIÓN DE EQUIPOS

${COMP("EL COMPRADOR","EL PROVEEDOR")}

PRIMERA: OBJETO.- EL PROVEEDOR suministrará, transportará, instalará, probará y pondrá en funcionamiento los equipos detallados en el Anexo 1 (marca, modelo, cantidad, especificaciones) para el proyecto [NOMBRE].

SEGUNDA: PRECIO.- USD [____] más IVA, que incluye equipos, fletes, seguros, desaduanización [si aplica], instalación, pruebas y capacitación.

TERCERA: FORMA DE PAGO.- [40] % de anticipo contra garantía; [50] % a la entrega en sitio; [10] % a la puesta en funcionamiento.

CUARTA: PLAZO DE ENTREGA.- [___] días desde el anticipo. Multa del [1 por mil] por día de retraso.

QUINTA: CONDICIONES DE OBRA.- EL COMPRADOR entregará las áreas listas según los requerimientos técnicos que EL PROVEEDOR informará por escrito con [30] días de antelación (bases, alimentación eléctrica, agua, drenaje, ventilación, blindajes, accesos para el ingreso de equipos).

SEXTA: GARANTÍA TÉCNICA.- [12/24] meses contra defectos de fabricación e instalación, con tiempo de respuesta de [48] horas y disponibilidad de repuestos por [5] años.

SÉPTIMA: CAPACITACIÓN Y DOCUMENTOS.- Capacitación a [___] personas; manuales de operación y mantenimiento en español; certificados y registros sanitarios o de calidad que correspondan.

OCTAVA: MANTENIMIENTO.- [Se incluye / Se ofertará por separado] un contrato de mantenimiento preventivo.

NOVENA: ${CONTROV}

DÉCIMA: ${FIRMA("EL COMPRADOR","EL PROVEEDOR")}` + PIE},

INT:{n:"Contrato de diseño interior, mobiliario y ambientación", r:"Locales, restaurantes, hoteles, oficinas y tiendas donde la experiencia interior es parte del negocio.", t:
`CONTRATO DE DISEÑO INTERIOR Y SUMINISTRO DE MOBILIARIO

${COMP("EL CLIENTE","EL DISEÑADOR")}

PRIMERA: OBJETO.- EL DISEÑADOR elaborará el diseño interior del espacio [NOMBRE / LOCAL N.°], de [___] m², que comprende concepto, distribución, selección de acabados, iluminación, mobiliario, señalética y ambientación, conforme a la identidad de marca de EL CLIENTE.

SEGUNDA: ENTREGABLES.- Moodboard y concepto; planta de mobiliario; planos de pisos, cielos, iluminación y paredes; detalles de mobiliario a medida; renders [___]; cuadro de acabados con proveedores; presupuesto referencial.

TERCERA: SUMINISTRO [OPCIONAL].- EL DISEÑADOR [coordinará / suministrará] el mobiliario y acabados según la cotización aprobada (Anexo 1). Los pedidos se harán solo con aprobación escrita y anticipo del [60] %.

CUARTA: HONORARIOS.- Diseño: USD [____] más IVA ([40] % inicio, [40] % entrega de planos, [20] % fin de obra). Suministro: según cotización.

QUINTA: VISITAS.- Se incluyen [___] visitas de supervisión estética durante la ejecución.

SEXTA: NORMATIVA DE LA MARCA Y DEL EDIFICIO.- El diseño respetará el manual de marca de EL CLIENTE y el reglamento del centro comercial o edificio, cuya aprobación gestionará EL CLIENTE.

SÉPTIMA: PROPIEDAD INTELECTUAL.- El diseño se usará solo en este local. Su replicación en otros locales requiere licencia adicional de USD [____] por local.

OCTAVA: ${CONTROV}

NOVENA: ${FIRMA("EL CLIENTE","EL DISEÑADOR")}` + PIE},

PCV:{n:"Promesa de compraventa de inmueble en planos", r:"Proyectos que se venden por unidades antes o durante la construcción (departamentos, casas en conjuntos, oficinas, locales).", t:
`PROMESA DE COMPRAVENTA DE INMUEBLE EN PLANOS
(Debe otorgarse por escritura pública ante notario)

${COMP("LA PROMITENTE VENDEDORA","EL PROMITENTE COMPRADOR")}

PRIMERA: ANTECEDENTES.- LA PROMITENTE VENDEDORA es propietaria del terreno ubicado en [____], adquirido mediante escritura inscrita en el Registro de la Propiedad de [____] el [FECHA], en el que desarrolla el proyecto [NOMBRE], con planos aprobados y licencia de construcción N.° [____]. El proyecto se someterá al régimen de propiedad horizontal.

SEGUNDA: OBJETO.- LA PROMITENTE VENDEDORA promete vender y EL PROMITENTE COMPRADOR promete comprar la unidad [DEPARTAMENTO / CASA / LOCAL N.° ___], ubicada en el piso [___], con un área aproximada de [___] m², más [___] parqueadero(s) y [___] bodega(s), con las alícuotas que se determinen en la declaratoria de propiedad horizontal, y conforme a las especificaciones y acabados del Anexo 1.

TERCERA: PRECIO.- USD [____], que se pagará así: a) USD [____] como reserva y entrada a la firma; b) [___] cuotas mensuales de USD [____] durante la construcción; c) el saldo de USD [____] a la firma de la escritura definitiva, con recursos propios o crédito hipotecario [BIESS / banco].

CUARTA: PLAZO DE ENTREGA.- La unidad se entregará terminada a más tardar el [FECHA], con una tolerancia de [90] días. Si el retraso excede ese plazo por causa imputable a LA PROMITENTE VENDEDORA, esta pagará [interés / multa] de [___].

QUINTA: ESCRITURA DEFINITIVA.- La compraventa definitiva se celebrará dentro de los [60] días siguientes a la inscripción de la declaratoria de propiedad horizontal y al pago del saldo.

SEXTA: VARIACIONES.- Las áreas pueden variar hasta un [3] % sin ajuste de precio. Cambios de acabados solicitados por EL PROMITENTE COMPRADOR se cotizarán aparte.

SÉPTIMA: DESISTIMIENTO.- Si EL PROMITENTE COMPRADOR desiste, perderá [el ___ % de lo pagado / el valor de la reserva] como pena; si desiste LA PROMITENTE VENDEDORA, devolverá lo recibido más [___].

OCTAVA: GASTOS.- Los gastos notariales y de inscripción de la promesa y de la escritura definitiva serán pagados según la ley y la costumbre [o: por partes iguales].

NOVENA: ${CONTROV}

DÉCIMA: ${FIRMA("LA PROMITENTE VENDEDORA","EL PROMITENTE COMPRADOR")}` + PIE},

FID:{n:"Contrato de fideicomiso inmobiliario", r:"Desarrollos medianos y grandes con preventa: un fiduciario administra el terreno y los aportes para dar seguridad a compradores y financistas.", t:
`CONTRATO DE CONSTITUCIÓN DE FIDEICOMISO MERCANTIL INMOBILIARIO
(Se celebra por escritura pública con una administradora de fondos y fideicomisos autorizada)

${COMP("EL CONSTITUYENTE","LA FIDUCIARIA")}

PRIMERA: ANTECEDENTES.- EL CONSTITUYENTE es propietario del terreno ubicado en [____] y desea desarrollar el proyecto [NOMBRE] a través de un fideicomiso mercantil, al amparo de la normativa de mercado de valores vigente en el Ecuador.

SEGUNDA: CONSTITUCIÓN.- Se constituye el fideicomiso denominado "[NOMBRE] FIDEICOMISO", con personalidad jurídica propia, al que EL CONSTITUYENTE transfiere el terreno y la suma de USD [____].

TERCERA: OBJETO.- Que LA FIDUCIARIA, siguiendo las instrucciones de este contrato, mantenga la propiedad del terreno, reciba los aportes de los promitentes compradores y del financiamiento, y los destine exclusivamente al desarrollo del proyecto, para transferir las unidades terminadas a los compradores y los remanentes a los beneficiarios.

CUARTA: PUNTO DE EQUILIBRIO.- Los recursos de los compradores se mantendrán en el fideicomiso hasta que se acredite el punto de equilibrio: a) planos aprobados y licencia de construcción; b) preventas de al menos el [___] % de las unidades; c) financiamiento para completar la obra; d) presupuesto y cronograma validados por el fiscalizador. Si no se alcanza en [___] meses, se devolverán los aportes a los compradores.

QUINTA: PARTES DEL PROYECTO.- Promotor: [____]; constructor: [____]; gerente de proyecto: [____]; fiscalizador: [____]; beneficiarios: [____].

SEXTA: JUNTA DEL FIDEICOMISO.- Integrada por [___] miembros; aprueba presupuestos, contratos principales y cambios del proyecto.

SÉPTIMA: HONORARIOS DE LA FIDUCIARIA.- USD [____] por constitución y USD [____] mensuales de administración, más IVA.

OCTAVA: RENDICIÓN DE CUENTAS.- LA FIDUCIARIA presentará informes [trimestrales] a los beneficiarios y a la Junta.

NOVENA: TERMINACIÓN Y LIQUIDACIÓN.- Por cumplimiento del objeto, imposibilidad de alcanzarlo o las demás causas legales. Se liquidará transfiriendo unidades y remanentes.

DÉCIMA: ${CONTROV}

DÉCIMA PRIMERA: ${FIRMA("EL CONSTITUYENTE","LA FIDUCIARIA")}` + PIE},

ARR:{n:"Contrato de arrendamiento de local comercial", r:"Locales en centros comerciales, plazas, edificios de oficinas y usos mixtos que el cliente alquilará a terceros.", t:
`CONTRATO DE ARRENDAMIENTO DE LOCAL COMERCIAL

${COMP("EL ARRENDADOR","EL ARRENDATARIO")}

PRIMERA: OBJETO.- EL ARRENDADOR da en arrendamiento a EL ARRENDATARIO el local [N.° ___] del inmueble [NOMBRE / DIRECCIÓN], de [___] m², destinado exclusivamente a [ACTIVIDAD COMERCIAL].

SEGUNDA: CANON.- USD [____] mensuales más IVA, pagaderos por adelantado dentro de los [5] primeros días de cada mes. [Opcional: renta variable del ___ % de las ventas sobre USD ___]. El canon se reajustará anualmente según [la inflación publicada por el INEC / ___ %].

TERCERA: GARANTÍA.- EL ARRENDATARIO entrega USD [____] equivalentes a [___] meses de canon, que se devolverán al término del contrato, descontados daños o valores pendientes.

CUARTA: PLAZO.- [___] años desde la entrega del local, renovable por acuerdo escrito con [90] días de anticipación.

QUINTA: EXPENSAS Y SERVICIOS.- Son de cargo de EL ARRENDATARIO: consumo de energía, agua, telecomunicaciones, alícuota de mantenimiento de áreas comunes y fondo de publicidad [si aplica].

SEXTA: ADECUACIONES.- EL ARRENDATARIO podrá hacer adecuaciones con aprobación escrita de sus planos por EL ARRENDADOR y cumpliendo el reglamento interno. Al finalizar, las mejoras fijas quedarán en beneficio del inmueble sin costo, salvo acuerdo distinto.

SÉPTIMA: PERMISOS.- EL ARRENDATARIO obtendrá los permisos de funcionamiento, la patente municipal y los permisos de bomberos y sanitarios que su actividad requiera.

OCTAVA: PROHIBICIONES.- Subarrendar o ceder sin autorización; cambiar el destino del local; almacenar sustancias peligrosas.

NOVENA: TERMINACIÓN.- Por vencimiento del plazo, mutuo acuerdo, falta de pago de [dos] cánones o incumplimiento del reglamento. El régimen aplicable es el del Código Civil y la normativa de inquilinato vigente, en lo que corresponda a locales comerciales.

DÉCIMA: ${CONTROV}

DÉCIMA PRIMERA: ${FIRMA("EL ARRENDADOR","EL ARRENDATARIO")}` + PIE},

OPH:{n:"Contrato de administración u operación hotelera", r:"Hoteles medianos y grandes: el propietario entrega la operación a una marca u operador profesional.", t:
`CONTRATO DE ADMINISTRACIÓN HOTELERA

${COMP("EL PROPIETARIO","EL OPERADOR")}

PRIMERA: OBJETO.- EL OPERADOR administrará y operará, por cuenta de EL PROPIETARIO, el establecimiento [NOMBRE], con [___] habitaciones, bajo la marca [____], conforme a sus estándares y al Reglamento de Alojamiento Turístico vigente.

SEGUNDA: ASISTENCIA TÉCNICA PREVIA.- Durante el diseño y la construcción, EL OPERADOR revisará los planos y especificaciones para verificar el cumplimiento de los estándares de la marca (áreas de habitaciones, back of house, cocinas, lavandería, sistemas). Honorario: USD [____].

TERCERA: PLAZO.- [10–20] años desde la apertura, renovable.

CUARTA: HONORARIOS DE ADMINISTRACIÓN.- a) Honorario base del [___] % de los ingresos brutos; b) honorario de incentivo del [___] % de la utilidad bruta operativa; c) cargos por sistemas centrales de reservas, fidelización y mercadeo según tarifas de la marca.

QUINTA: PRESUPUESTO Y CUENTAS.- EL OPERADOR presentará un presupuesto anual de operación y de capital para aprobación de EL PROPIETARIO, e informes financieros mensuales.

SEXTA: FONDO DE REPOSICIÓN.- Se reservará el [___] % de los ingresos para reposición de mobiliario, equipos y renovaciones periódicas.

SÉPTIMA: PERSONAL.- El personal del hotel será empleado de [EL PROPIETARIO / EL OPERADOR]; los costos laborales son gastos de operación.

OCTAVA: DESEMPEÑO.- Si durante [dos] años consecutivos no se alcanza el [___] % del resultado presupuestado, EL PROPIETARIO podrá terminar el contrato.

NOVENA: LICENCIAS Y PERMISOS.- EL PROPIETARIO mantendrá el registro turístico y la licencia única anual de funcionamiento; EL OPERADOR gestionará su renovación.

DÉCIMA: ${CONTROV}

DÉCIMA PRIMERA: ${FIRMA("EL PROPIETARIO","EL OPERADOR")}` + PIE},

FRA:{n:"Contrato de franquicia", r:"Negocios de cadena (comida rápida, cafeterías, tiendas de conveniencia, gimnasios): el diseño debe seguir el manual del franquiciante.", t:
`CONTRATO DE FRANQUICIA

${COMP("EL FRANQUICIANTE","EL FRANQUICIADO")}

PRIMERA: OBJETO.- EL FRANQUICIANTE otorga a EL FRANQUICIADO el derecho no exclusivo de operar un establecimiento bajo la marca [____], registrada ante el SENADI, en el local ubicado en [____], utilizando su sistema de negocio, know-how y manuales.

SEGUNDA: TERRITORIO.- [Exclusividad en un radio de ___ km / sin exclusividad].

TERCERA: DISEÑO Y CONSTRUCCIÓN DEL LOCAL.- EL FRANQUICIADO adecuará el local según el manual de imagen y diseño de EL FRANQUICIANTE. Los planos elaborados por el arquitecto local deberán ser aprobados por EL FRANQUICIANTE antes de iniciar la obra. El mobiliario y equipos se adquirirán a proveedores homologados.

CUARTA: PAGOS.- a) Derecho de entrada de USD [____]; b) regalía mensual del [___] % de las ventas netas; c) aporte al fondo de publicidad del [___] %.

QUINTA: PLAZO.- [___] años desde la apertura, renovable.

SEXTA: CAPACITACIÓN Y ASISTENCIA.- EL FRANQUICIANTE capacitará al personal y brindará asistencia continua.

SÉPTIMA: CONFIDENCIALIDAD Y NO COMPETENCIA.- EL FRANQUICIADO guardará reserva de los manuales y no operará negocios competidores durante el contrato y [1] año después.

OCTAVA: AUDITORÍA.- EL FRANQUICIANTE podrá inspeccionar el local y revisar la información de ventas.

NOVENA: TERMINACIÓN.- Por vencimiento, incumplimiento de estándares o falta de pago. Al terminar, EL FRANQUICIADO retirará la imagen de la marca.

DÉCIMA: ${CONTROV}

DÉCIMA PRIMERA: ${FIRMA("EL FRANQUICIANTE","EL FRANQUICIADO")}` + PIE},

PUB:{n:"Contratación pública (LOSNCP): consultoría y obra", r:"Cuando el cliente es una entidad del Estado (ministerio, GAD, hospital público, escuela fiscal, empresa pública).", t:
`CONTRATACIÓN PÚBLICA EN ECUADOR — GUÍA Y ESQUEMA DE CONTRATO

IMPORTANTE: Cuando la contratante es una entidad pública, NO se usa un contrato privado libre. Se aplica la Ley Orgánica del Sistema Nacional de Contratación Pública (LOSNCP), su Reglamento y las resoluciones del SERCOP. El proceso se publica en el Portal de Compras Públicas y el contrato se redacta sobre los modelos de pliegos obligatorios del SERCOP.

1. REQUISITOS PARA PARTICIPAR
• Estar habilitado en el Registro Único de Proveedores (RUP).
• Tener RUC activo y estar al día con el SRI y el IESS.
• Cumplir con el porcentaje de valor agregado ecuatoriano cuando se exija.

2. PROCEDIMIENTOS HABITUALES (los montos se calculan cada año con base en el Presupuesto General del Estado)
• Consultoría (diseño, estudios, fiscalización): contratación directa, lista corta o concurso público, según el monto. Se califica principalmente la calidad técnica y la experiencia.
• Obra: menor cuantía, cotización o licitación, según el monto.
• Existen procedimientos especiales (emergencia, régimen especial) con reglas propias.

3. ESQUEMA DEL CONTRATO (según modelo SERCOP)
Cláusula 1. Comparecientes: la entidad contratante, representada por su máxima autoridad o delegado, y el contratista.
Cláusula 2. Antecedentes: resolución de inicio, certificación presupuestaria, pliegos y resolución de adjudicación.
Cláusula 3. Documentos del contrato: pliegos, oferta, garantías, resolución de adjudicación.
Cláusula 4. Objeto: [descripción de la consultoría u obra].
Cláusula 5. Precio: USD [____] más IVA.
Cláusula 6. Forma de pago: anticipo [si aplica] y planillas o productos aprobados por el administrador del contrato.
Cláusula 7. Garantías: fiel cumplimiento, buen uso del anticipo y técnica, según la LOSNCP.
Cláusula 8. Plazo.
Cláusula 9. Prórrogas de plazo.
Cláusula 10. Multas.
Cláusula 11. Reajuste de precios (obras).
Cláusula 12. Administración del contrato y fiscalización.
Cláusula 13. Terminación del contrato (por cumplimiento, mutuo acuerdo, sentencia o terminación unilateral).
Cláusula 14. Solución de controversias (mediación y jurisdicción contencioso-administrativa).
Cláusula 15. Domicilio y comunicaciones.

4. RECOMENDACIONES PARA EL ARQUITECTO
• Leer completos los pliegos y los términos de referencia antes de ofertar.
• Verificar la experiencia específica exigida y el personal técnico mínimo.
• Calcular bien el presupuesto: los contratos públicos no admiten aumentos libres.
• Respetar los plazos de preguntas, aclaraciones y convalidación de errores en el portal.` + `\n\n—\nNota: guía referencial. Verifique siempre la versión vigente de la LOSNCP, su Reglamento, las resoluciones y los modelos de pliegos del SERCOP.`},

NDA:{n:"Acuerdo de confidencialidad", r:"Recomendado en proyectos corporativos, de inversión o de marcas, antes de recibir información sensible del cliente.", t:
`ACUERDO DE CONFIDENCIALIDAD

${COMP("LA PARTE REVELADORA","LA PARTE RECEPTORA")}

PRIMERA: OBJETO.- Proteger la información que LA PARTE REVELADORA entregue a LA PARTE RECEPTORA con motivo del proyecto [NOMBRE].

SEGUNDA: INFORMACIÓN CONFIDENCIAL.- Toda información técnica, comercial, financiera, planos, estudios de mercado, ubicación del terreno, datos de inversionistas y cualquier otra identificada como confidencial, entregada por cualquier medio.

TERCERA: OBLIGACIONES.- LA PARTE RECEPTORA se obliga a: a) usar la información solo para el proyecto; b) no divulgarla a terceros sin autorización escrita; c) limitar su acceso a quienes necesiten conocerla; d) devolverla o destruirla al terminar la relación.

CUARTA: EXCEPCIONES.- Información pública, previamente conocida o requerida por autoridad competente.

QUINTA: VIGENCIA.- [___] años desde la firma.

SEXTA: INCUMPLIMIENTO.- La parte que incumpla indemnizará los daños y perjuicios causados, sin perjuicio de las acciones legales correspondientes.

SÉPTIMA: ${CONTROV}

OCTAVA: ${FIRMA("LA PARTE REVELADORA","LA PARTE RECEPTORA")}` + PIE},

ACT:{n:"Acta de entrega-recepción de obra", r:"Todos los proyectos construidos: cierra formalmente la obra (provisional y definitiva).", t:
`ACTA DE ENTREGA-RECEPCIÓN [PROVISIONAL / DEFINITIVA] DE OBRA

En [CIUDAD], a los [DÍA] días del mes de [MES] de [AÑO], se reúnen en el sitio de la obra [NOMBRE DEL PROYECTO], ubicada en [DIRECCIÓN], las siguientes personas: por EL PROPIETARIO, [NOMBRE]; por EL CONSTRUCTOR, [NOMBRE]; y en calidad de fiscalizador, [NOMBRE], con el objeto de suscribir la presente acta.

1. ANTECEDENTES: Contrato de construcción suscrito el [FECHA], por USD [____], con plazo de [___] días. Órdenes de cambio: [___]. Fecha real de terminación: [____].

2. CONDICIONES GENERALES DE EJECUCIÓN: [Descripción breve del cumplimiento de planos y especificaciones].

3. LIQUIDACIÓN ECONÓMICA: Valor contratado USD [____]; valor de órdenes de cambio USD [____]; total planillado USD [____]; anticipo amortizado USD [____]; fondo de garantía retenido USD [____]; multas USD [____]; saldo a favor de [____]: USD [____].

4. OBSERVACIONES Y PENDIENTES: [Lista de observaciones que EL CONSTRUCTOR se compromete a corregir en ___ días].

5. DOCUMENTOS ENTREGADOS: planos as-built, manuales, garantías de equipos, certificados de pruebas, libro de obra, llaves [___].

6. CONSTANCIA: Con la firma de esta acta [provisional], EL PROPIETARIO recibe la obra y se inicia el periodo de [___] días previo a la recepción definitiva. [Definitiva: se da por concluida la relación contractual, salvo la responsabilidad legal por vicios de construcción].

______________________   ______________________   ______________________
EL PROPIETARIO            EL CONSTRUCTOR             FISCALIZADOR` + PIE},

RPH:{n:"Reglamento interno de propiedad horizontal (documento)", r:"Condominios, edificios de departamentos, oficinas y locales vendidos por unidades.", t:
`REGLAMENTO INTERNO DE COPROPIEDAD — ESQUEMA
(Se aprueba junto con la declaratoria de propiedad horizontal ante el GAD y se protocoliza e inscribe)

CAPÍTULO I. Disposiciones generales: nombre del conjunto, ubicación, régimen legal (Ley de Propiedad Horizontal y su Reglamento).
CAPÍTULO II. Bienes exclusivos y bienes comunes: descripción de unidades, parqueaderos, bodegas y áreas comunes (halls, escaleras, ascensores, terrazas, jardines, club house).
CAPÍTULO III. Cuadro de alícuotas: porcentaje de cada unidad sobre el total, que determina derechos y cuotas.
CAPÍTULO IV. Derechos y obligaciones de los copropietarios: uso de bienes, prohibiciones (ruidos, mascotas, cambios de fachada, actividades no permitidas).
CAPÍTULO V. Expensas: ordinarias (mantenimiento, seguridad, servicios) y extraordinarias; fondo de reserva; intereses por mora.
CAPÍTULO VI. Órganos de administración: asamblea de copropietarios, directorio, administrador; quórum y mayorías.
CAPÍTULO VII. Seguros: seguro del edificio contra incendio y terremoto.
CAPÍTULO VIII. Reformas y obras: autorizaciones para modificaciones en unidades y bienes comunes.
CAPÍTULO IX. Sanciones y solución de conflictos.
ANEXOS: planos de propiedad horizontal y cuadro de áreas y alícuotas.` + PIE}
};

/* ---- Reglas: qué contratos aplica cada tipología ---- */
const PUBLIC_CATS = new Set(["GOB","SEG","INF"]);
const MAYBE_PUBLIC = new Set(["SAL","EDU","CUL","DEP","PUB","TRA","SOC","CIE"]);
const EQUIP = new Set(["SAL","IND","INF","CIE","TRA"]);
function has(o, re){ return re.test(o.n) || re.test(o.sub.n); }
function reglas(o){
  const c = o.cat.c, e = o.e, out = [], add = (code, cond) => { if (!out.some(x=>x.c===code)) out.push({c:code, cond:cond||""}); };
  let nota = "";
  add("DIS");
  if (e <= 1){
    add("CON", "O un presupuesto firmado con el constructor o fabricante del módulo");
    add("ACT");
    nota = "Proyecto pequeño: no requiere muchos contratos. Basta con el contrato de diseño y un contrato de construcción a precio fijo (o el contrato con el fabricante si es prefabricado), y cerrar con un acta de entrega. Si el cliente construye por su cuenta, deje por escrito hasta dónde llega su responsabilidad como arquitecto.";
  } else {
    add("ETE");
    if (e === 2){ add("CON"); add("FIS","Recomendado: puede ser dirección técnica del mismo arquitecto con visitas pactadas"); }
    else { add("CPU","Alternativas: precio fijo si los planos están completos, o administración delegada"); add("ADM","Alternativa si el cliente quiere controlar cada gasto"); add("FIS"); }
    if (e >= 4){ add("GER"); add("EPC","Alternativa si se quiere un único responsable de diseño y obra"); }
    add("ACT");
    if (e === 2) nota = "Proyecto de escala pequeña: con 3 o 4 contratos es suficiente (diseño, estudios técnicos, construcción y acta de entrega). La fiscalización es recomendable, aunque puede asumirla el mismo arquitecto como dirección técnica.";
    else if (e === 3) nota = "Proyecto mediano: además del diseño y la construcción, conviene separar los estudios técnicos y contratar fiscalización independiente para controlar calidad, costo y plazo.";
    else nota = "Proyecto grande: exige una estructura contractual completa, con gerencia de proyecto, fiscalización y, según el financiamiento, fideicomiso o contratación pública.";
  }
  // venta por unidades
  if ((c==="RES" && /multifamiliar|conjuntos|condominios/i.test(o.sub.n) && !/Club house|Build-to-rent|Micro|Co-living/i.test(o.n)) || (c==="MIX" && e>=3) || /condominio|tiempo compartido|branded/i.test(o.n)){
    add("PCV"); if (e>=3) add("FID","Recomendado si hay preventa"); add("RPH");
  }
  if (c==="HOS" && e>=3 && /Hoteles/.test(o.sub.n)) { add("OPH","Si lo opera una marca o administradora"); add("INT"); }
  else if (c==="HOS") add("INT","Recomendado para la experiencia del huésped");
  if (c==="COM" || c==="GAS" || c==="OFI"){
    add("INT");
    if (/centros y agrupaciones|Edificios de oficinas|Parques/i.test(o.sub.n) || /Plaza comercial|Galería|Outlet|Food hall|Coworking/i.test(o.n)) add("ARR","Para alquilar locales u oficinas a terceros");
    else add("ARR","Si el cliente alquila el local");
  }
  if (/Comida rápida|Drive-thru|Minimarket|conveniencia|Heladería|Pizzería|Cafetería|Gimnasio|Box de CrossFit|Farmacia|Supermercado|Lavandería|Estación de servicio|Hotel urbano|Hotel de negocios|Apart-hotel|Motel/i.test(o.n)) add("FRA","Si el negocio es una franquicia o marca de cadena");
  if (c==="MIX") { add("ARR","Para los locales comerciales"); }
  if (EQUIP.has(c) || /Cocina central|Dark kitchen|Discoteca|Sala de conciertos|Teatro|Cine|Estudio de|Set|Acuario|Planetario|Complejo acuático|Pista de hielo|Centro de datos|Parqueadero automatizado|Casino|Restaurante mirador|Spa|Lavadero/i.test(o.n)) add("SUM","Equipos especializados de esta tipología");
  if (e >= 3 && /COM|GAS|OFI|HOS|IND|MIX|FUT/.test(c)) add("NDA","Recomendado");
  if (PUBLIC_CATS.has(c)) { add("PUB"); nota = "Cliente normalmente público: el contrato no es privado. " + nota; }
  else if (MAYBE_PUBLIC.has(c) && e >= 2) add("PUB","Si el promotor es una entidad pública (ministerio, GAD, empresa pública)");
  if (o.ct){ o.ct.split(",").map(s=>s.trim()).filter(Boolean).forEach(k => add(k)); }
  if (o.cn) nota = o.cn;
  return {items: out, nota};
}
return {L, reglas};
})();
