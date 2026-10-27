# Registro de validación manual del pedido por WhatsApp

**Fecha**: 2026-10-26

**Rama**: `feature/003-pedido-whatsapp`

| Caso | Resultado esperado | Resultado observado | Estado |
|---|---|---|---|
| QS-WA-001 | Un carrito con un producto muestra la acción “Pedir por WhatsApp” y prepara un mensaje con producto, cantidad, precios, subtotal, total y solicitud de atención. | Pendiente de ejecución en navegador. | Pendiente |
| QS-WA-002 | Un carrito con varios productos muestra cada producto una sola vez y mantiene cantidades, subtotales y total del carrito. | Pendiente de ejecución en navegador. | Pendiente |
| QS-WA-003 | Un carrito vacío no permite iniciar el pedido y explica que primero se deben agregar productos. | Pendiente de ejecución en navegador. | Pendiente |
| QS-WA-004 | Si WhatsApp no puede abrirse, se muestra un aviso, aparece la acción para copiar el mensaje y el carrito no cambia. | Pendiente de ejecución en navegador. | Pendiente |
| QS-WA-005 | Copiar el mensaje conserva su contenido y no afirma que el pedido fue enviado o confirmado. | Pendiente de ejecución en navegador. | Pendiente |
| QS-WA-006 | Una línea inválida no genera un pedido parcial y muestra un error comprensible. | Pendiente de ejecución en navegador. | Pendiente |
| QS-WA-007 | Catálogo y carrito conservan sus comportamientos de 001 y 002. | Pendiente de ejecución en navegador. | Pendiente |

## Notas de ejecución

La ejecución debe seguir `specs/003-pedido-whatsapp/quickstart.md` y usar únicamente
la interfaz visible de la aplicación.

## Verificación técnica

- `node --check src/app.js`: Pass.
- `node --check src/data/catalogo.js`: Pass.
- `npm ci --dry-run`: Pass.
- `npm run build`: Pass; se generó `dist/index.html` y los assets compilados.
- `npm run dev` en `http://127.0.0.1:5173/`: HTTP 200 verificado.
- `npm run preview` en `http://127.0.0.1:4173/`: HTTP 200 verificado.
- Validación visual mediante navegador: Pendiente; no fue posible controlar el navegador desde esta sesión.
