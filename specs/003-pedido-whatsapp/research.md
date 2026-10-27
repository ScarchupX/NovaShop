# Research: Pedido por WhatsApp

**Feature**: [spec.md](./spec.md)

## Decision 1: Integrar mediante una conversación prellenada

- **Decision**: Preparar un mensaje textual a partir del carrito y dirigir al usuario a una conversación de WhatsApp con el número oficial `931463289`.
- **Rationale**: Cumple el objetivo de 003 sin backend, autenticación, pago ni almacenamiento adicional. Permite que el usuario revise el contenido antes de enviarlo y mantiene a NovaShop fuera de la confirmación comercial.
- **Alternatives considered**: Enviar el pedido desde un servidor o construir un checkout propio. Se descartan porque agregan credenciales, persistencia, responsabilidades de confirmación y alcance no solicitado.

## Decision 2: Formato del destino

- **Decision**: Mantener `931463289` como el destino de negocio definido por la spec y aplicar, solo en el enlace técnico de apertura, el formato internacional requerido por WhatsApp para Perú (`51931463289`).
- **Rationale**: La spec proporciona un número móvil peruano de nueve dígitos; el prefijo de país es una normalización de transporte, no un nuevo dato comercial. El número visible en la interfaz no necesita exponerse.
- **Alternatives considered**: Inventar otro número, pedir el número al usuario o usar un alias. Se descartan porque contradicen la decisión aclarada o trasladan al usuario una configuración que pertenece a NovaShop.

## Decision 3: Mensaje mínimo y factual

- **Decision**: El mensaje contiene un saludo breve, una línea por producto con nombre, cantidad, precio unitario y subtotal, el total en S/ y una solicitud breve de atención.
- **Rationale**: Preserva la trazabilidad con el carrito y evita introducir descuentos, delivery, datos personales o promesas comerciales no aprobadas.
- **Alternatives considered**: Solicitar nombre, dirección o método de pago antes de abrir WhatsApp. Se descartan por el principio de minimización de datos y porque esos datos no forman parte de la spec.

## Decision 4: Fallback de copia

- **Decision**: Si la apertura no es posible o falla, mostrar un estado de error y ofrecer copiar el mensaje preparado al portapapeles; el carrito permanece sin cambios.
- **Rationale**: Es el fallback definido por Clarify y permite continuar manualmente sin afirmar que el pedido se envió.
- **Alternatives considered**: Mostrar solo un error o reintentar automáticamente. Se descartan porque pierden el resumen o no ofrecen una salida clara al usuario.

## Decision 5: Compatibilidad con el repositorio

- **Decision**: Usar Vite únicamente como dependencia de desarrollo para servir y compilar la aplicación estática; mantener JavaScript y APIs estándar en tiempo de ejecución.
- **Rationale**: La aplicación conserva su estructura y no requiere framework, backend ni dependencia de producción. Vite aporta un servidor local reproducible y un build estático sin cambiar las responsabilidades existentes.
- **Alternatives considered**: Mantener solo `file://` o un servidor estático manual. Se mantienen como alternativas de emergencia, pero no ofrecen scripts npm ni un build reproducible; añadir un framework, un paquete de portapapeles o una API de servidor se descarta por complejidad.

## Resolved Unknowns

- Destino oficial: `931463289`.
- Contenido del mensaje: saludo breve, resumen factual y solicitud de atención.
- Fallo de apertura: aviso claro y copia del mensaje preparado.
