# Modelo de datos: Gestión del carrito de compras

## Producto existente

El carrito reutiliza el producto del catálogo 001 identificado por `id`.

| Campo usado | Regla heredada |
|---|---|
| `id` | Único y estable durante la consulta |
| `nombre` | Texto no vacío, visible en español de Perú |
| `precio` | Importe mayor o igual a cero, mostrado en soles |
| `disponible` | `true` permite agregar; `false` se muestra como “Agotado” y bloquea el agregado |

## Línea de carrito

Representa una selección de un producto.

| Campo | Tipo conceptual | Obligatorio | Reglas |
|---|---|---:|---|
| `productoId` | Identificador | Sí | Corresponde a un `Producto.id`; no se duplican líneas |
| `cantidad` | Entero positivo | Sí | Mayor que cero; sin límite máximo de stock en esta funcionalidad |
| `precioUnitario` | Importe | Sí para línea válida | Es el precio válido del producto en el momento de la consulta |
| `subtotal` | Importe calculado | Sí para línea válida | `precioUnitario × cantidad`, expresado en soles |

## Carrito

Conjunto ordenado de cero o más líneas y un total calculado.

| Campo | Tipo conceptual | Regla |
|---|---|---|
| `lineas` | Lista de líneas | Puede estar vacía; máximo una línea por `productoId` |
| `total` | Importe calculado | Suma de subtotales válidos; sin envío, impuestos ni descuentos |
| `duracion` | Estado de sesión | Se conserva mientras la página está abierta y se reinicia al recargar o cerrar |

## Transiciones de estado

| Estado | Evento | Resultado visible |
|---|---|---|
| Vacío | Inicio o eliminación de la última línea | Mensaje de carrito vacío y total S/ 0.00 |
| Con productos | Agregar producto disponible | Nueva línea con cantidad uno |
| Con productos | Agregar producto ya presente | Aumenta la cantidad de la línea existente |
| Con productos | Aumentar o disminuir cantidad | Subtotal y total recalculados |
| Con productos | Eliminar línea | Línea retirada y total recalculado |
| Bloqueado | Intentar agregar producto agotado | Mensaje de disponibilidad; carrito sin cambios |
| Línea no disponible | Producto ausente del catálogo | Aviso sin subtotal inventado; demás líneas válidas continúan |
| Sesión reiniciada | Recargar o cerrar la página | Carrito vacío |

## Reglas fuera del modelo

- No se modelan stock numérico, reserva ni actualización de inventario.
- No se modelan usuarios, cuentas, datos personales ni persistencia.
- No se modelan pedidos, checkout, pagos, envíos ni WhatsApp.
