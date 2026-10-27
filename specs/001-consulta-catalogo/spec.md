# Feature Specification: Consulta del catálogo de productos

**Feature Branch**: `feature/001-consulta-catalogo`

**Created**: 2026-10-26

**Status**: Draft

**Input**: User description: "Permitir que los usuarios consulten el catálogo de productos disponibles y accedan a la información necesaria para conocerlos antes de comprar."

## Clarifications

### Session 2026-10-26

- Q: ¿Los productos no disponibles deben seguir visibles en el catálogo con una
  etiqueta clara como “Agotado”? → A: Sí; deben permanecer visibles con el
  estado “Agotado”.

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Explorar el catálogo (Priority: P1)

Como visitante de NovaShop, quiero consultar una lista de productos disponibles
para conocer rápidamente qué puedo comprar.

**Why this priority**: Es el flujo principal de la funcionalidad y permite que
el usuario descubra la oferta antes de considerar una compra.

**Independent Test**: Con un catálogo de prueba cargado, una persona puede abrir
la vista del catálogo y revisar los productos mostrados, sus nombres, precios y
disponibilidad sin necesitar otra funcionalidad.

**Acceptance Scenarios**:

1. **Given** que existe un catálogo con productos, **When** el usuario abre el
   catálogo, **Then** la aplicación muestra los productos del catálogo con su
   nombre, imagen, descripción breve, precio en soles y disponibilidad.
2. **Given** que el catálogo contiene varios productos, **When** el usuario lo
   recorre, **Then** puede distinguir cada producto y consultar la información
   visible de cada uno sin confundirlo con otro.

---

### User Story 2 - Consultar el detalle de un producto (Priority: P2)

Como visitante de NovaShop, quiero abrir un producto del catálogo para conocer
su información con mayor detalle antes de decidir si comprarlo.

**Why this priority**: El detalle permite evaluar un producto más allá de la
información resumida de la lista y prepara la decisión de compra futura.

**Independent Test**: Desde un producto visible en el catálogo, una persona
puede abrir su detalle, verificar la información completa disponible y volver al
catálogo.

**Acceptance Scenarios**:

1. **Given** que un producto aparece en el catálogo, **When** el usuario lo
   selecciona, **Then** la aplicación muestra su nombre, imagen, descripción,
   precio en soles y disponibilidad correspondiente a ese producto.
2. **Given** que el usuario está viendo el detalle de un producto, **When**
   solicita volver al catálogo, **Then** la aplicación muestra nuevamente la
   lista de productos sin iniciar un carrito ni un pedido.

### Edge Cases

- Si el catálogo no contiene productos, la aplicación muestra un mensaje claro
  indicando que no hay productos disponibles para consultar.
- Si un producto no está disponible, el catálogo y su detalle muestran la
  etiqueta “Agotado”; el producto no se presenta como disponible.
- Si no se puede cargar el catálogo, la aplicación muestra un mensaje claro de
  error y no presenta información inventada como si fuera real.
- Si el usuario intenta consultar un producto que ya no está disponible en el
  catálogo, la aplicación informa que no puede mostrarlo y ofrece volver al
  catálogo.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: La aplicación MUST permitir que un usuario consulte el catálogo
  de productos sin que esta funcionalidad requiera iniciar un carrito o crear un
  pedido.
- **FR-002**: La aplicación MUST mostrar cada producto del catálogo con nombre,
  imagen, descripción breve, precio en soles peruanos y estado de disponibilidad;
  cuando no esté disponible, MUST mostrar la etiqueta “Agotado”.
- **FR-003**: La aplicación MUST permitir seleccionar un producto visible para
  consultar su detalle.
- **FR-004**: El detalle de un producto MUST mostrar como mínimo su nombre,
  imagen, descripción, precio en soles peruanos y estado de disponibilidad.
- **FR-005**: La aplicación MUST expresar todos los precios en soles peruanos
  usando la notación visible `S/` y un formato monetario coherente para Perú.
- **FR-006**: Los textos visibles al usuario MUST estar redactados en español
  de Perú.
- **FR-007**: La aplicación MUST mostrar un estado explícito cuando no existan
  productos para consultar.
- **FR-008**: La aplicación MUST mostrar un mensaje comprensible cuando el
  catálogo o el detalle de un producto no puedan cargarse.
- **FR-009**: La aplicación MUST evitar mostrar datos inventados o valores
  ambiguos cuando falte información necesaria para consultar un producto.
- **FR-010**: La funcionalidad MUST limitarse a consultar el catálogo y el
  detalle de productos; no incluirá carrito de compras, checkout, pedidos ni
  comunicación por WhatsApp.

### Key Entities *(include if feature involves data)*

- **Producto**: Artículo que NovaShop ofrece para consulta, con nombre, imagen,
  descripción, precio en soles y estado de disponibilidad.
- **Catálogo**: Conjunto de productos que NovaShop presenta al usuario para su
  consulta.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: En una prueba con un catálogo válido, el 100% de los productos
  mostrados presenta nombre, descripción breve, precio en S/ y disponibilidad.
- **SC-002**: Una persona puede pasar desde cualquier producto visible hasta su
  detalle con una sola selección y volver al catálogo sin perder el contexto de
  consulta.
- **SC-003**: Al menos 4 de cada 5 personas no técnicas pueden identificar el
  nombre, precio y disponibilidad de un producto elegido sin leer instrucciones
  técnicas ni consultar código.
- **SC-004**: En una revisión de aceptación, el 100% de los precios visibles
  está expresado en soles peruanos y el 100% de los textos visibles está en
  español de Perú.
- **SC-005**: En una prueba con catálogo vacío, producto no disponible o error
  de carga, el 100% de los casos muestra un estado comprensible y no presenta
  información inventada.

## Assumptions

- Los visitantes pueden consultar el catálogo sin autenticarse; la
  autenticación no forma parte de esta funcionalidad.
- El catálogo de prueba proporciona, como mínimo, nombre, imagen, descripción,
  precio y disponibilidad para cada producto.
- La disponibilidad se muestra como estado informativo, usando “Agotado” para
  productos no disponibles; las reglas de inventario y la reserva de productos
  quedan fuera de esta funcionalidad.
- La consulta inicial no incluye búsqueda, filtros, categorías, ordenamiento ni
  paginación porque no fueron solicitados.
- El carrito de compras y los pedidos por WhatsApp se desarrollarán en
  especificaciones posteriores y no se incorporan aquí.
- La persona que valida los criterios puede usar la aplicación sin leer código;
  la prueba se realiza con una conexión funcional y un catálogo de prueba
  conocido.
