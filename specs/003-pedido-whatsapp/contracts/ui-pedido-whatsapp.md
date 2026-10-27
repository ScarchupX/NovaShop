# UI Contract: Pedido por WhatsApp

**Scope**: Interfaz visible de la aplicación estática; no es un contrato de API externa.

## Acción desde el carrito

- Con un carrito no vacío y válido, la vista del carrito MUST mostrar una acción visible para iniciar el pedido por WhatsApp.
- Con un carrito vacío, la acción MUST estar deshabilitada o no disponible y la vista MUST explicar que primero se deben agregar productos.
- La acción MUST usar el contenido actual del carrito en el momento en que el usuario la activa.

## Mensaje preparado

El mensaje MUST componerse en este orden:

1. Saludo breve en español.
2. Una línea por producto del carrito, con nombre, cantidad, precio unitario y subtotal.
3. Total en soles peruanos usando `S/`.
4. Solicitud breve de atención.

El mensaje MUST NOT incluir productos inventados, líneas duplicadas, datos personales no solicitados, descuentos, costos de delivery, instrucciones de pago ni lenguaje de confirmación.

## Apertura de WhatsApp

- El intento de apertura MUST dirigirse al destino oficial `931463289`, normalizado solo al formato internacional técnico requerido por WhatsApp.
- El usuario MUST poder revisar el mensaje preparado en la conversación de WhatsApp antes de enviarlo.
- NovaShop MUST NOT etiquetar el pedido como enviado o confirmado únicamente porque el intento de apertura tuvo éxito.

## Comportamiento de fallo y copia

- Si el intento de apertura falla o WhatsApp no está disponible, la vista del carrito MUST mostrar un estado de error claro en español.
- El estado de error MUST ofrecer una acción para copiar el mensaje preparado.
- La copia MUST conservar exactamente el mensaje preparado y MUST NOT modificar el carrito.
- La interfaz MUST NOT afirmar que el pedido fue enviado, recibido o confirmado.

## Etiquetas y estados observables

La redacción final corresponde a la implementación, pero MUST comunicar estos significados en español de Perú:

| Estado | Significado requerido |
|---|---|
| Listo | El usuario puede iniciar un pedido por WhatsApp desde el carrito actual. |
| Vacío | El carrito no tiene productos y no puede iniciar un pedido. |
| Incompleto | Una línea carece de información válida y no se puede preparar el pedido. |
| Fallo de apertura | WhatsApp no se abrió; el mensaje preparado se puede copiar. |
| No confirmado | Abrir o copiar el mensaje no confirma un pedido de NovaShop. |

## Accesibilidad y localización

- La acción, el estado de error y la acción de copia MUST ser accesibles mediante teclado y tener texto visible o un nombre accesible.
- Los cambios de estado MUST ser perceptibles para tecnologías de asistencia mediante el patrón de mensajes de estado existente.
- Todas las etiquetas y mensajes visibles MUST estar en español de Perú; todos los importes MUST usar el formato S/ existente.
