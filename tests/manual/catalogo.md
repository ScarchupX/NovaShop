# Registro de validación manual del catálogo

**Fecha**: 2026-10-26

**Rama**: `feature/001-consulta-catalogo`

| Caso | Resultado esperado | Resultado observado | Estado |
|---|---|---|---|
| QS-001 | Se muestran productos con nombre, imagen, descripción, precio en `S/` y disponibilidad. | Se observaron tres tarjetas con todos los datos requeridos. | Pass |
| QS-002 | Se puede abrir el detalle y volver al catálogo. | Se abrió “Mochila urbana” y se volvió al catálogo correctamente. | Pass |
| QS-003 | El producto no disponible permanece visible como “Agotado”. | “Zapatillas casuales” permaneció visible con la etiqueta “Agotado”. | Pass |
| QS-004 | Un catálogo vacío muestra un mensaje claro. | Con el fixture temporal vacío se mostró “No hay productos disponibles para consultar.”; el fixture fue restaurado. | Pass |
| QS-005 | Un error de carga muestra un mensaje y no inventa datos. | Con el fixture temporal inválido se mostró el mensaje de error sin productos; el fixture fue restaurado. | Pass |
| QS-006 | Los textos están en español de Perú y los precios usan `S/`. | La interfaz y los precios observados cumplieron el criterio. | Pass |

## Notas de ejecución

La ejecución se realizó con `quickstart.md` como guía. Las variantes temporales
de catálogo vacío y error se restauraron después de la comprobación.

## Regresión en feature 002

Se confirmó desde la interfaz que el catálogo mantiene sus tres productos,
permite abrir el detalle y conserva los precios en `S/` y las etiquetas de
disponibilidad después de incorporar el carrito.
