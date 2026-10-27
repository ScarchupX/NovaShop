# Modelo de datos: Consulta del catálogo de productos

## Producto

Representa un artículo que NovaShop presenta para consulta.

| Campo | Tipo conceptual | Obligatorio | Reglas de validación |
|---|---|---:|---|
| `id` | Identificador | Sí | Único dentro del catálogo y estable durante la consulta |
| `nombre` | Texto | Sí | No vacío; visible en español de Perú |
| `imagen` | Referencia visual | Sí | Debe permitir mostrar una imagen representativa; no se inventa si falta |
| `descripcion` | Texto | Sí | No vacía; comprensible para el usuario |
| `precio` | Importe monetario | Sí | Mayor o igual a cero; se muestra en soles con `S/` |
| `disponible` | Estado booleano | Sí | `true` se muestra como disponible; `false` se muestra como “Agotado” |

## Catálogo

Representa el conjunto ordenado de productos que la aplicación presenta al
usuario. Puede contener cero o más productos.

### Relaciones

- Un catálogo contiene cero o más productos.
- Cada producto pertenece a un único catálogo durante la consulta.
- El `id` permite identificar el producto seleccionado para abrir su detalle.

### Estados de consulta

| Estado | Condición | Resultado visible |
|---|---|---|
| Con productos | El catálogo contiene uno o más productos válidos | Lista de productos |
| Vacío | El catálogo contiene cero productos | Mensaje de catálogo vacío |
| Error de carga | El catálogo no puede cargarse | Mensaje de error, sin datos inventados |
| Producto agotado | `disponible` es `false` | Producto visible con etiqueta “Agotado” |
| Detalle válido | El `id` seleccionado existe | Información completa del producto |
| Detalle no disponible | El `id` no existe o ya no está disponible | Mensaje y opción de volver al catálogo |

## Reglas fuera del modelo

- No se modela carrito, pedido, pago, checkout ni comunicación por WhatsApp.
- No se modelan usuarios, autenticación ni datos personales.
- No se modelan reglas de inventario, reserva ni actualización de existencias.
