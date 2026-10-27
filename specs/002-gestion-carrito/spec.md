# Feature Specification: Gestión del carrito de compras

**Feature Branch**: `feature/002-gestion-carrito`

**Created**: 2026-10-26

**Status**: Draft

**Input**: User description: "Permitir que los usuarios gestionen un carrito de compras con los productos del catálogo, ampliando la consulta del catálogo existente y dejando fuera la generación de pedidos y el envío por WhatsApp."

## Clarifications

### Session 2026-10-26

- Q: ¿Debe existir un límite máximo de unidades por producto en el carrito? → A:
  No; se permitirá cualquier cantidad entera positiva sin límite de stock en
  esta funcionalidad.
- Q: ¿Debe conservarse el contenido del carrito después de recargar o cerrar la
  página? → A: No; se conservará solo durante la sesión actual y se reiniciará
  al recargar o cerrar la página.

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Agregar productos al carrito (Priority: P1)

Como visitante de NovaShop, quiero agregar un producto disponible al carrito
desde el catálogo o su detalle para reunir los productos que considero comprar.

**Why this priority**: Agregar el primer producto es el flujo mínimo que da
valor al carrito y depende directamente del catálogo ya implementado.

**Independent Test**: Con un catálogo válido, una persona puede agregar un
producto disponible y comprobar que aparece en el carrito con su nombre, precio,
cantidad y subtotal.

**Acceptance Scenarios**:

1. **Given** que un producto está disponible en el catálogo, **When** el usuario
   lo agrega al carrito, **Then** el carrito muestra ese producto con cantidad
   uno, precio en soles y subtotal correspondiente.
2. **Given** que el usuario agrega nuevamente un producto que ya está en el
   carrito, **When** confirma la acción, **Then** el carrito incrementa la
   cantidad de esa misma línea y no crea una línea duplicada.
3. **Given** que un producto está marcado como “Agotado”, **When** el usuario
   intenta agregarlo, **Then** la aplicación no lo incorpora al carrito y
   muestra un estado comprensible.

---

### User Story 2 - Modificar el contenido del carrito (Priority: P1)

Como visitante de NovaShop, quiero cambiar cantidades y retirar productos para
ajustar mi selección antes de continuar con una compra futura.

**Why this priority**: La gestión de cantidades y eliminación es necesaria para
que el carrito sea útil y corregir decisiones del usuario.

**Independent Test**: Con al menos un producto en el carrito, una persona puede
incrementar, disminuir y eliminar líneas, verificando que los subtotales y el
total se actualicen.

**Acceptance Scenarios**:

1. **Given** que el carrito contiene un producto, **When** el usuario aumenta su
   cantidad, **Then** la cantidad y el subtotal de esa línea se actualizan.
2. **Given** que una línea tiene una cantidad mayor que uno, **When** el usuario
   disminuye su cantidad, **Then** la cantidad y el subtotal se actualizan sin
   afectar las demás líneas.
3. **Given** que el carrito contiene una línea, **When** el usuario la elimina,
   **Then** el producto deja de aparecer y el total se recalcula.
4. **Given** que el usuario disminuye la cantidad de una línea hasta cero,
   **When** se aplica el cambio, **Then** la línea se elimina y el carrito
   muestra su estado resultante.

---

### User Story 3 - Revisar el resumen del carrito (Priority: P2)

Como visitante de NovaShop, quiero revisar el resumen de mi carrito para saber
qué productos seleccioné y cuánto suman antes de iniciar un pedido futuro.

**Why this priority**: El resumen permite verificar la selección sin convertir
todavía el carrito en un pedido.

**Independent Test**: Con cero, uno y varios productos en el carrito, una
persona puede identificar las líneas, cantidades, subtotales y total expresados
en soles.

**Acceptance Scenarios**:

1. **Given** que el carrito contiene productos, **When** el usuario abre o
   consulta el carrito, **Then** ve cada producto, su cantidad, precio unitario,
   subtotal y el total de productos en soles peruanos.
2. **Given** que el carrito no contiene productos, **When** el usuario lo
   consulta, **Then** la aplicación muestra un mensaje claro indicando que está
   vacío.
3. **Given** que el carrito contiene productos, **When** el usuario revisa su
   resumen, **Then** no se crea un pedido, no se inicia checkout y no se envía
   ningún mensaje por WhatsApp.

### Edge Cases

- Si el usuario intenta agregar un producto que ya aparece como “Agotado”, la
  aplicación rechaza la acción y conserva el contenido existente del carrito.
- Si el producto deja de existir en el catálogo mientras está en el carrito, la
  aplicación informa el problema sin inventar datos y permite revisar el resto
  del carrito.
- Si el usuario elimina el último producto, el carrito pasa al estado vacío y
  el total visible es S/ 0.00.
- Si el carrito tiene varios productos, cambiar una línea no modifica las
  cantidades ni subtotales de las demás líneas.
- Si el precio de un producto no es válido, la aplicación no debe mostrar un
  subtotal o total inventado para esa línea.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: La aplicación MUST permitir agregar al carrito un producto que el
  catálogo marque como disponible desde la vista del catálogo o del detalle.
- **FR-002**: La aplicación MUST impedir agregar al carrito un producto marcado
  como “Agotado” y MUST informar el motivo de forma comprensible.
- **FR-003**: El carrito MUST representar una sola línea por producto identificado
  por su `id`; agregar nuevamente el mismo producto MUST incrementar su cantidad.
- **FR-004**: Cada línea del carrito MUST mostrar el nombre del producto, precio
  unitario en soles, cantidad y subtotal en soles.
- **FR-005**: La aplicación MUST permitir aumentar y disminuir la cantidad de
  cada línea y MUST recalcular su subtotal y el total del carrito.
- **FR-006**: La cantidad de cada línea MUST ser un número entero positivo sin
  límite máximo de stock en esta funcionalidad.
- **FR-007**: La aplicación MUST permitir eliminar una línea del carrito y MUST
  mostrar el estado vacío cuando no queden productos.
- **FR-008**: El carrito MUST mostrar el total como la suma de los subtotales de
  sus líneas, sin agregar envío, impuestos, descuentos ni otros cargos no
  definidos en esta especificación.
- **FR-009**: Los precios, subtotales y totales MUST mostrarse en soles peruanos
  usando la notación visible `S/` y un formato coherente para Perú.
- **FR-010**: Todos los textos visibles del carrito MUST estar redactados en
  español de Perú.
- **FR-011**: La aplicación MUST mostrar un estado claro cuando el carrito esté
  vacío y MUST mostrar los productos seleccionados cuando no lo esté.
- **FR-012**: El carrito MUST conservarse solo durante la sesión actual y MUST
  reiniciarse al recargar o cerrar la página.
- **FR-013**: Esta funcionalidad MUST limitarse a gestionar el carrito; no
  incluirá generación de pedidos, checkout, pagos, envío de mensajes ni
  comunicación por WhatsApp.

### Key Entities *(include if feature involves data)*

- **Producto**: Producto existente del catálogo 001 que puede incorporarse al
  carrito únicamente cuando está marcado como disponible.
- **Línea de carrito**: Relación entre un producto y la cantidad seleccionada,
  con su precio unitario y subtotal.
- **Carrito**: Conjunto ordenado de líneas de carrito y total calculado de sus
  subtotales.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: En una prueba con un producto disponible, el 100% de los intentos
  válidos lo incorpora al carrito con cantidad uno y subtotal correcto.
- **SC-002**: En una prueba con un producto agotado, el 100% de los intentos de
  agregarlo son rechazados sin modificar el contenido existente.
- **SC-003**: Una persona puede agregar, aumentar, disminuir y eliminar una
  línea del carrito sin leer código y puede observar el subtotal y total
  actualizados después de cada acción.
- **SC-004**: En una prueba con al menos tres líneas o cantidades distintas, el
  100% de los subtotales y del total coincide con la suma de precios unitarios
  por cantidad, expresada en soles.
- **SC-005**: Al menos 4 de cada 5 personas no técnicas pueden identificar qué
  productos tienen en el carrito, sus cantidades y el total sin asistencia.
- **SC-006**: En una revisión de aceptación, el 100% de los textos visibles del
  carrito está en español de Perú y el 100% de sus importes usa `S/`.
- **SC-007**: En ningún escenario de aceptación se crea un pedido ni se envía
  información por WhatsApp.

## Assumptions

- El carrito reutiliza los productos y precios del catálogo 001 mediante su
  identificador estable; no crea un catálogo alternativo.
- El catálogo continúa proporcionando `id`, `nombre`, `imagen`, `descripcion`,
  `precio` y `disponible` como en la especificación 001.
- La disponibilidad del catálogo es booleana; las reglas de inventario y
  reserva no forman parte de esta especificación y no se aplicará un límite de
  stock al incrementar cantidades.
- El total del carrito contiene únicamente la suma de subtotales de productos;
  envío, impuestos, descuentos y pago quedan fuera de alcance.
- El usuario puede gestionar el carrito sin autenticarse y la funcionalidad no
  solicitará datos personales.
- El carrito no se conservará después de recargar o cerrar la página; la
  persistencia entre sesiones queda fuera de esta funcionalidad.
- La generación de pedidos y el envío por WhatsApp pertenecen a la
  especificación 003 y no se implementarán aquí.
