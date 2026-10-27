# Quickstart: Validación manual de Pedido por WhatsApp

## Prerequisites

- Navegador web con JavaScript habilitado.
- Repositorio abierto en la raíz del proyecto.
- Node.js y npm instalados.
- Un dispositivo o navegador donde pueda observarse la apertura de WhatsApp o simularse su indisponibilidad.

## Install and run

Desde la raíz del proyecto:

```powershell
npm install
npm run dev
```

Abrir la URL que muestre Vite, normalmente `http://localhost:5173/`.

Para validar la salida de producción:

```powershell
npm run build
npm run preview
```

El comando `npm run preview` sirve `dist/`, normalmente en `http://localhost:4173/`.

Comprobaciones técnicas adicionales:

```powershell
node --check src/app.js
node --check src/data/catalogo.js
npm ci --dry-run
```

## Scenario 1: Pedido con un producto

1. Abrir el catálogo y agregar `Mochila urbana`.
2. Abrir el carrito.
3. Confirmar que aparece la acción visible para iniciar el pedido por WhatsApp.
4. Activarla.
5. Confirmar que el mensaje contiene saludo, producto, cantidad `1`, precio unitario, subtotal, total en S/ y solicitud de atención.
6. Confirmar que el destino corresponde al número oficial definido y que el usuario puede revisar el mensaje antes de enviarlo.

**Expected**: NovaShop no muestra el pedido como confirmado y el carrito conserva la mochila.

## Scenario 2: Pedido con varias cantidades y productos

1. Agregar dos veces `Mochila urbana` y una vez `Polera de algodón`.
2. Abrir el carrito y anotar líneas, cantidades, subtotales y total.
3. Iniciar el pedido por WhatsApp.

**Expected**: Cada producto aparece una sola vez; las cantidades, subtotales y total del mensaje coinciden con el carrito.

## Scenario 3: Carrito vacío

1. Recargar la página para iniciar una sesión vacía.
2. Abrir el carrito.

**Expected**: No se puede iniciar un pedido y se muestra un mensaje que indica que primero se deben agregar productos.

## Scenario 4: WhatsApp no disponible

1. Preparar un carrito con al menos un producto.
2. Ejecutar el intento en un contexto donde WhatsApp no pueda abrirse.

**Expected**: Se muestra un aviso claro, aparece la acción para copiar el mensaje preparado, el contenido copiado coincide con el resumen y el carrito no cambia. No se muestra confirmación de envío.

## Scenario 5: Abandono sin envío

1. Preparar un pedido y abrir la conversación.
2. Abandonar la conversación sin enviar el mensaje.
3. Volver al carrito.

**Expected**: El carrito conserva líneas, cantidades, subtotales y total; NovaShop no muestra confirmación.

## Regression checks

- Ejecutar los escenarios manuales existentes de [catalogo.md](../../tests/manual/catalogo.md) y [carrito.md](../../tests/manual/carrito.md).
- Confirmar que agregar, aumentar, disminuir y eliminar productos continúa funcionando.
- Confirmar que los productos agotados siguen sin poder agregarse al carrito.
