# Registro de validación manual del carrito

**Fecha**: 2026-10-26

**Rama**: `feature/002-gestion-carrito`

| Caso | Resultado esperado | Resultado observado | Estado |
|---|---|---|---|
| QS-CAR-001 | Un producto disponible crea una línea con cantidad 1, subtotal y total en `S/`. | Se agregó “Mochila urbana” desde el detalle; apareció una línea con cantidad 1, `S/ 89.90` y total `S/ 89.90`. | Pass |
| QS-CAR-002 | Agregar el mismo producto aumenta la cantidad sin duplicar la línea. | Se agregó nuevamente “Mochila urbana”; la única línea pasó a cantidad 2 y subtotal `S/ 179.80`. | Pass |
| QS-CAR-003 | Intentar agregar un producto agotado muestra un mensaje y no cambia el carrito. | Al intentar agregar “Zapatillas casuales” se mostró “Este producto está agotado y no se puede agregar.”; el contador permaneció en 0. | Pass |
| QS-CAR-004 | Aumentar, disminuir y llevar a cero recalcula y elimina la línea al llegar a cero. | El control `+` actualizó cantidad 2 a 3 y total `S/ 269.70`; los controles `−` devolvieron la cantidad a 1 y luego eliminaron la línea al llegar a cero. | Pass |
| QS-CAR-005 | Eliminar todas las líneas muestra el estado vacío y `S/ 0.00`. | Tras eliminar la última línea se mostró “Tu carrito está vacío.” y `S/ 0.00`. | Pass |
| QS-CAR-006 | Los subtotales son precio por cantidad y el total suma subtotales sin cargos adicionales. | El resumen mostró precio unitario, subtotal y total en soles; no se observaron cargos adicionales. | Pass |
| QS-CAR-007 | Recargar o volver a abrir la página reinicia el carrito vacío. | Después de recargar, el contador quedó en 0 y el catálogo volvió a mostrarse. | Pass |
| QS-CAR-008 | Catálogo, detalle y carrito funcionan sin acciones de pedidos, checkout, pagos o WhatsApp. | Se navegaron catálogo, detalle y carrito; no se observaron acciones de pedidos, checkout, pagos ni WhatsApp. | Pass |

## Notas de ejecución

La ejecución se realizó con `specs/002-gestion-carrito/quickstart.md` como guía,
usando únicamente la interfaz visible de la aplicación.

## Verificación técnica complementaria

- `node --check src/app.js`: Pass.
- `node --check src/data/catalogo.js`: Pass.
