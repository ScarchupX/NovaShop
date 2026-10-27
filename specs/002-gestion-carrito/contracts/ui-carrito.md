# Contrato de interfaz: Gestión del carrito

Este contrato describe los comportamientos visibles que la implementación debe
respetar. No define una API externa ni una estructura interna de código.

## Acciones disponibles

| Acción del usuario | Condición | Resultado visible |
|---|---|---|
| Agregar producto | Producto marcado como disponible | Línea creada con cantidad 1 y subtotal en `S/` |
| Agregar producto repetido | La línea ya existe | Cantidad incrementada; no aparece una línea duplicada |
| Agregar producto agotado | Producto marcado como “Agotado” | Mensaje comprensible; carrito sin cambios |
| Aumentar cantidad | Línea válida | Cantidad, subtotal y total actualizados |
| Disminuir cantidad | Cantidad mayor que 1 | Cantidad, subtotal y total actualizados |
| Disminuir a cero | Cualquier línea válida | Línea eliminada y estado recalculado |
| Eliminar línea | Línea existente | Línea retirada y total recalculado |
| Consultar carrito vacío | Sin líneas | Mensaje de carrito vacío y `S/ 0.00` |

## Información visible de cada línea

Cada línea válida muestra nombre del producto, precio unitario, cantidad,
subtotal y controles para aumentar, disminuir o eliminar.

## Información visible del resumen

El resumen muestra el total de productos como suma de subtotales válidos. Todos
los importes usan `S/` y todos los textos están en español de Perú.

## Límites de la interfaz

El carrito no muestra ni ejecuta controles para crear pedidos, iniciar checkout,
procesar pagos, enviar mensajes o comunicarse por WhatsApp.
