# Quickstart de validación: Consulta del catálogo

## Prerrequisitos

- Tener la implementación de la funcionalidad en la rama
  `feature/001-consulta-catalogo`.
- Usar un navegador web moderno.
- Contar con el catálogo de prueba definido durante la implementación.

## Ejecución

1. Abrir `index.html` en el navegador.
2. Confirmar que la vista inicial corresponde al catálogo.
3. Ejecutar los escenarios de validación siguientes y registrar el resultado en
   `tests/manual/catalogo.md`.

## Escenarios de validación

### QS-001 — Catálogo con productos

**Dado** un catálogo de prueba con varios productos.

**Cuando** la persona abre el catálogo.

**Entonces** cada producto muestra nombre, imagen, descripción breve, precio en
soles con `S/` y disponibilidad.

### QS-002 — Consulta del detalle

**Dado** un producto visible en el catálogo.

**Cuando** la persona lo selecciona.

**Entonces** se muestra su nombre, imagen, descripción, precio en soles y estado
de disponibilidad; al volver, se muestra nuevamente el catálogo.

### QS-003 — Producto agotado

**Dado** un producto con disponibilidad falsa.

**Cuando** la persona consulta el catálogo y el detalle.

**Entonces** el producto permanece visible con la etiqueta “Agotado” y no se
presenta como disponible.

### QS-004 — Catálogo vacío

**Dado** un catálogo sin productos.

**Cuando** la persona abre el catálogo.

**Entonces** se muestra un mensaje claro indicando que no hay productos
disponibles para consultar.

### QS-005 — Error de carga

**Dado** que el catálogo o un detalle no puede cargarse.

**Cuando** la persona intenta consultarlo.

**Entonces** se muestra un mensaje comprensible y no se presentan datos
inventados.

### QS-006 — Idioma y moneda

**Dado** cualquier vista del catálogo o detalle.

**Cuando** la persona revisa los textos y precios visibles.

**Entonces** los textos están en español de Perú y los precios usan soles con
`S/`.

## Resultado esperado

Todos los escenarios deben poder verificarse desde la interfaz, sin leer código.
Si un escenario falla, registrar el caso, el resultado observado y el criterio
de aceptación relacionado antes de declarar la funcionalidad validada.

## Alcance de esta guía

Esta guía no cubre carrito, checkout, pedidos, WhatsApp, autenticación,
búsqueda, filtros, categorías, ordenamiento ni paginación.
