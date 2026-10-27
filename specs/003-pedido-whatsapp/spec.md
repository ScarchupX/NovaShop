# Feature Specification: Pedido por WhatsApp

**Feature Branch**: `feature/003-pedido-whatsapp`

**Created**: 2026-10-26

**Status**: Draft

**Input**: User description: "Crear la especificación 003-pedido-whatsapp para que el usuario pueda iniciar y gestionar el proceso de pedido mediante WhatsApp a partir de los productos seleccionados en su carrito, ampliando las especificaciones 001 y 002 sin volver a implementar el catálogo ni el carrito."

## Clarifications

### Session 2026-10-26

- Q: ¿Cuál es el destino oficial de WhatsApp al que debe dirigirse el pedido? → A: Un número oficial fijo de NovaShop.
- Q: ¿Cuál es el número oficial fijo de WhatsApp de NovaShop? → A: 931463289.
- Q: ¿Qué contenido debe incluir el mensaje preparado para WhatsApp además de los productos, cantidades, subtotales y total del carrito? → A: Saludo breve, resumen del carrito y solicitud de atención, sin datos personales ni condiciones comerciales.
- Q: ¿Qué debe hacer NovaShop si WhatsApp no puede abrirse desde el dispositivo o navegador del usuario? → A: Mostrar un aviso claro y permitir copiar el mensaje preparado.

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Iniciar un pedido desde un carrito con productos (Priority: P1)

Como usuario de NovaShop, quiero iniciar mi pedido desde el carrito para enviar mi selección a través de WhatsApp sin volver a registrar manualmente los productos.

**Why this priority**: Es el valor principal de la funcionalidad: convertir una selección existente en una conversación de pedido, manteniendo la continuidad con el carrito ya disponible.

**Independent Test**: Con un carrito que contiene uno o más productos, una persona puede identificar la acción para pedir por WhatsApp, activarla y comprobar que se prepara una conversación con el resumen de su selección.

**Acceptance Scenarios**:

1. **Given** que el carrito contiene al menos un producto, **When** el usuario inicia el pedido por WhatsApp, **Then** la aplicación intenta abrir una conversación de WhatsApp con un mensaje preparado a partir del contenido actual del carrito.
2. **Given** que el carrito contiene varios productos, **When** el usuario inicia el pedido, **Then** el mensaje preparado incluye un saludo breve, cada producto una sola vez, su cantidad, su subtotal, el total del carrito y una solicitud de atención, todos los importes expresados en soles.
3. **Given** que el usuario inicia el pedido, **When** la conversación de WhatsApp se abre, **Then** el carrito conserva sus productos, cantidades, subtotales y total mientras el usuario decide si continúa la comunicación.

### User Story 2 - Revisar el resumen antes de enviarlo (Priority: P1)

Como usuario de NovaShop, quiero reconocer en el mensaje preparado los productos y los importes de mi carrito para detectar errores antes de enviarlo por WhatsApp.

**Why this priority**: El usuario debe mantener el control sobre la información que comparte y poder verificar que el pedido corresponde a su selección.

**Independent Test**: Con un carrito conocido, una persona puede revisar el contenido visible de la conversación preparada y compararlo con el resumen del carrito sin consultar código ni datos internos.

**Acceptance Scenarios**:

1. **Given** que el carrito tiene líneas con cantidades y subtotales, **When** se prepara el mensaje, **Then** la información visible permite relacionar cada línea del mensaje con la línea correspondiente del carrito.
2. **Given** que el carrito muestra un total, **When** se prepara el mensaje, **Then** el total del mensaje coincide con el total visible del carrito y mantiene el formato monetario en soles peruanos.
3. **Given** que el usuario revisa el mensaje preparado, **When** decide no enviarlo, **Then** puede abandonar la conversación sin que NovaShop confirme un pedido ni cambie el contenido del carrito.

### User Story 3 - Gestionar estados del inicio de pedido (Priority: P2)

Como usuario de NovaShop, quiero recibir una respuesta clara cuando no pueda iniciar un pedido por WhatsApp para saber qué ocurrió con mi selección.

**Why this priority**: Los estados vacío y de error evitan que el usuario crea que se creó o envió un pedido cuando no existe una conversación iniciada.

**Independent Test**: Con un carrito vacío y con un escenario en el que WhatsApp no pueda abrirse, una persona puede comprobar que la aplicación muestra un estado comprensible y no inventa una confirmación.

**Acceptance Scenarios**:

1. **Given** que el carrito está vacío, **When** el usuario consulta la acción de pedido, **Then** la aplicación no inicia una conversación de pedido y muestra que debe agregar productos antes de continuar.
2. **Given** que la aplicación no logra abrir WhatsApp, **When** finaliza el intento de inicio, **Then** muestra un mensaje claro indicando que el pedido no se inició y conserva el carrito sin cambios.

### Edge Cases

- Si el carrito contiene un solo producto, el mensaje incluye una única línea y el total correspondiente, sin secciones vacías ni productos adicionales.
- Si el usuario cambia una cantidad o elimina una línea antes de iniciar el pedido, el mensaje usa únicamente el estado más reciente del carrito.
- Si el usuario vuelve a intentar iniciar el pedido, la aplicación no duplica productos dentro del mensaje por causa del intento anterior.
- Si falta información necesaria de una línea del carrito para construir un resumen confiable, la aplicación no inventa el dato ni inicia un pedido como si el resumen fuera válido; debe informar el problema de forma comprensible.
- Si WhatsApp no está disponible o el destino no puede utilizarse, la aplicación no muestra el pedido como enviado ni como confirmado.
- Si WhatsApp no puede abrirse, la aplicación muestra un aviso claro y permite copiar el mensaje preparado sin cambiar el carrito.
- La aplicación no debe solicitar datos personales adicionales para preparar el mensaje cuando no sean imprescindibles para este flujo.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: La aplicación MUST ofrecer una acción visible para iniciar un pedido por WhatsApp desde el carrito cuando este contenga al menos una línea válida.
- **FR-002**: La aplicación MUST impedir el inicio del pedido desde un carrito vacío y MUST mostrar un mensaje que indique que primero se deben agregar productos.
- **FR-003**: Al iniciar el pedido, la aplicación MUST preparar un mensaje con un saludo breve, un resumen factual del estado actual del carrito y una solicitud de atención; el resumen MUST incluir cada producto, su cantidad, su precio unitario, su subtotal y el total del carrito.
- **FR-004**: La información monetaria del mensaje MUST coincidir con los importes visibles en el carrito y MUST expresarse en soles peruanos con la notación `S/`.
- **FR-005**: La aplicación MUST dirigir el intento de conversación al número oficial fijo de WhatsApp de NovaShop, `931463289`.
- **FR-006**: La aplicación MUST permitir que el usuario revise el mensaje preparado antes de considerarlo enviado o confirmado por NovaShop.
- **FR-007**: Iniciar la conversación MUST NOT crear por sí mismo una confirmación de pedido, un pago, una reserva, una cuenta de usuario ni una modificación del carrito.
- **FR-008**: Mientras el usuario revisa o abandona el mensaje preparado, la aplicación MUST conservar el contenido actual del carrito durante la sesión existente.
- **FR-009**: Si WhatsApp no puede abrirse o el intento falla, la aplicación MUST mostrar un estado de error comprensible, MUST ofrecer copiar el mensaje preparado, MUST NOT afirmar que el pedido fue enviado y MUST conservar el carrito.
- **FR-010**: Si una línea del carrito carece de información válida para construir el resumen, la aplicación MUST impedir el inicio de un pedido incompleto y explicar qué información no pudo procesarse.
- **FR-011**: Los textos visibles de este flujo MUST estar redactados en español de Perú.
- **FR-012**: La funcionalidad MUST limitarse a iniciar y gestionar el envío de una solicitud de pedido mediante WhatsApp a partir del carrito existente; quedan fuera el catálogo, la gestión de cantidades, el checkout, el pago, la confirmación comercial, la reserva de inventario y la atención posterior.
- **FR-013**: La aplicación MUST solicitar únicamente los datos personales imprescindibles para este flujo y MUST informar el propósito de cualquier dato adicional que llegue a solicitar.

### Key Entities *(include if feature involves data)*

- **Pedido en preparación**: Resumen temporal derivado del carrito para iniciar una conversación; contiene las líneas, cantidades, importes y total que el usuario puede revisar.
- **Destino de WhatsApp**: Número oficial fijo `931463289` de NovaShop al que se dirige la conversación.
- **Estado del inicio de pedido**: Estado visible que diferencia, como mínimo, carrito vacío, preparación disponible, intento realizado sin confirmación y error de apertura o preparación.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: En una prueba con un carrito válido, el 100% de las líneas del carrito aparece una sola vez en el mensaje preparado, con su cantidad y subtotal correspondientes.
- **SC-002**: En una prueba con un carrito válido, el total del mensaje coincide con el total visible del carrito en el 100% de los casos verificados.
- **SC-003**: Al menos 4 de cada 5 personas no técnicas pueden iniciar el pedido desde un carrito no vacío y reconocer que el mensaje está preparado para WhatsApp sin consultar instrucciones técnicas.
- **SC-004**: En el 100% de las pruebas con carrito vacío, datos insuficientes o fallo de apertura, la aplicación muestra un estado comprensible, permite copiar el mensaje cuando WhatsApp no se abre y no afirma que exista un pedido enviado o confirmado.
- **SC-005**: En el 100% de las pruebas de abandono o fallo antes del envío, el contenido visible del carrito permanece sin cambios durante la sesión.
- **SC-006**: En una revisión de aceptación, el 100% de los textos visibles del flujo está en español de Perú y el 100% de los importes visibles está expresado en soles peruanos.

## Assumptions

- El usuario puede consultar y modificar el carrito conforme a la especificación 002 antes de iniciar el pedido; esta funcionalidad reutiliza ese carrito y no lo reemplaza.
- El pedido se inicia como una conversación con WhatsApp; NovaShop no confirma que el comercio haya recibido, aceptado o procesado el pedido.
- El mensaje se prepara únicamente con datos ya presentes en el carrito y no requiere autenticación ni datos personales adicionales por defecto.
- El número oficial fijo de WhatsApp ya definido es `931463289`; el mensaje usará un saludo breve, un resumen factual del carrito y una solicitud de atención, sin datos personales ni condiciones comerciales.
- Si WhatsApp no puede abrirse, el usuario podrá copiar el mensaje preparado; esta acción no equivale a enviarlo ni a confirmar el pedido.
- La persistencia del carrito sigue las reglas de la especificación 002: se mantiene durante la sesión actual y no se amplía a recargas o cierres.
- No se agregan reglas de inventario, límites de compra, descuentos, costos de envío, medios de pago ni confirmaciones comerciales porque no fueron solicitados.
- Los escenarios de aceptación se validarán con la aplicación visible, un catálogo y un carrito de prueba conocidos, sin consultar código para determinar el resultado.
