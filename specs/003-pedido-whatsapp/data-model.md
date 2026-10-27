# Data Model: Pedido por WhatsApp

## Pedido en preparación

Resumen temporal que se construye al iniciar el flujo desde el carrito. No representa un pedido confirmado ni una reserva.

| Campo | Tipo conceptual | Obligatorio | Regla |
|---|---|---:|---|
| `lineas` | Lista de línea de pedido | Sí | Debe contener al menos una línea válida para iniciar el flujo. |
| `total` | Importe en céntimos | Sí | Debe ser la suma de los subtotales de sus líneas. |
| `mensaje` | Texto | Sí | Se genera con saludo, resumen factual y solicitud de atención. |
| `estado` | Estado de preparación | Sí | `listo`, `carrito-vacio`, `incompleto` o `error-apertura`. |

## Línea de pedido en preparación

Representa una línea del carrito existente en el momento exacto de iniciar el pedido.

| Campo | Tipo conceptual | Obligatorio | Regla |
|---|---|---:|---|
| `productoId` | Identificador de producto | Sí | Conserva la identidad usada por el carrito de 002. |
| `nombre` | Texto | Sí | Debe existir y ser visible para identificar el producto. |
| `cantidad` | Entero positivo | Sí | Se toma del carrito sin alterarla. |
| `precioUnitarioCentesimos` | Importe entero no negativo | Sí | Se toma del precio unitario del carrito. |
| `subtotalCentesimos` | Importe entero no negativo | Sí | `precioUnitarioCentesimos × cantidad`. |

## Relación con el carrito existente

- El carrito es la fuente de verdad de la selección actual.
- El pedido en preparación es una instantánea temporal para generar el mensaje; no reemplaza ni persiste el carrito.
- Una línea inválida impide generar un pedido en preparación completo y produce el estado `incompleto`.
- Iniciar, revisar, copiar o abandonar el mensaje no cambia cantidades, líneas ni total del carrito.

## Estados y transiciones

```text
carrito-vacio ── agregar producto válido ──> listo
listo ── iniciar preparación ──> listo
listo ── abrir WhatsApp correctamente ──> listo (sin confirmación de NovaShop)
listo ── WhatsApp no abre ──> error-apertura ── copiar mensaje ──> error-apertura
listo ── línea inválida ──> incompleto
```

El estado no modela `enviado`, `aceptado`, `pagado` ni `confirmado`, porque esas situaciones están fuera del alcance de NovaShop en esta funcionalidad.
