# Research: Gestión del carrito de compras

## Decisión 1: Reutilizar el catálogo y la aplicación existentes

**Decision**: Ampliar `index.html`, `src/app.js` y `src/styles.css`, reutilizando
`window.NovaShopCatalogo` y el `id` estable de cada producto.

**Rationale**: La constitución exige continuidad funcional y la spec 002 indica
que el carrito debe ampliar la consulta del catálogo 001. Mantener la fuente de
productos evita duplicaciones y discrepancias de precio o disponibilidad.

**Alternatives considered**: Crear una pantalla o un catálogo independiente
para el carrito. Se descarta porque sustituiría o recrearía innecesariamente la
funcionalidad ya integrada.

## Decisión 2: Estado del carrito solo en memoria

**Decision**: Mantener las líneas del carrito en el estado de la página y
reiniciarlas al recargar o cerrar la aplicación.

**Rationale**: Es la decisión aclarada por el usuario y conserva la simplicidad
de la aplicación 001, que no tiene autenticación ni persistencia.

**Alternatives considered**: `localStorage`, cookies, base de datos o una cuenta
de usuario. Se descartan porque ampliarían el alcance y pedirían decisiones de
privacidad o infraestructura no incluidas en la spec.

## Decisión 3: Una línea por producto y cantidad positiva sin límite

**Decision**: Identificar cada línea por `productoId`; agregar un producto que ya
está en el carrito incrementa su cantidad. Las cantidades son enteros positivos
sin límite de stock en esta funcionalidad; disminuir a cero elimina la línea.

**Rationale**: Coincide con la aclaración y con el catálogo actual, que solo
expone disponibilidad booleana y no una cantidad de inventario.

**Alternatives considered**: Duplicar líneas, limitar a una unidad o inventar un
límite de stock por producto. Se descartan porque contradicen la spec o
introducen reglas comerciales no definidas.

## Decisión 4: Calcular importes en céntimos

**Decision**: Convertir cada precio válido a céntimos para multiplicar por la
cantidad y sumar subtotales; convertir el resultado a soles al mostrarlo.

**Rationale**: Evita errores visibles de redondeo en subtotales y total sin
añadir una dependencia. La interfaz seguirá mostrando exclusivamente importes
en `S/`.

**Alternatives considered**: Operar únicamente con números decimales del
navegador. Se descarta porque puede producir pequeñas diferencias de precisión
en sumas repetidas.

## Decisión 5: Manejo de productos no disponibles o ausentes

**Decision**: Un producto “Agotado” no puede agregarse. Si una línea existente
ya no encuentra su producto en el catálogo, se muestra un aviso comprensible y
no se inventa un subtotal; las demás líneas válidas siguen disponibles.

**Rationale**: Respeta la disponibilidad del catálogo 001 y la regla de no
mostrar datos inventados.

**Alternatives considered**: Permitir agregar agotados o mantener un precio
inventado para productos ausentes. Se descartan por riesgo de información
incorrecta y contradicción con la spec.
