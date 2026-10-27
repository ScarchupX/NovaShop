# Quickstart de validación: Gestión del carrito

## Prerrequisitos

- Tener la implementación de `001-consulta-catalogo` integrada en la rama
  `feature/002-gestion-carrito`.
- Usar un navegador web moderno.
- Contar con el catálogo de prueba existente, que incluye al menos dos
  productos disponibles y uno marcado como “Agotado”.

## Ejecución

1. Abrir `index.html` en el navegador.
2. Confirmar que el catálogo 001 continúa visible y funcional.
3. Ejecutar los escenarios siguientes y registrar los resultados en
   `tests/manual/carrito.md`.

## Escenarios de validación

### QS-CAR-001 — Agregar producto disponible

**Dado** un producto marcado como disponible.

**Cuando** la persona lo agrega al carrito desde el catálogo o su detalle.

**Entonces** aparece una línea con nombre, cantidad 1, precio unitario,
subtotal y total expresados en `S/`.

### QS-CAR-002 — Agregar producto repetido

**Dado** que un producto ya está en el carrito.

**Cuando** la persona lo agrega nuevamente.

**Entonces** aumenta la cantidad de la línea existente y no se crea una línea
duplicada.

### QS-CAR-003 — Producto agotado

**Dado** un producto marcado como “Agotado”.

**Cuando** la persona intenta agregarlo.

**Entonces** se muestra un mensaje comprensible y el carrito no cambia.

### QS-CAR-004 — Modificar cantidades

**Dado** un carrito con una línea.

**Cuando** la persona aumenta, disminuye y finalmente lleva la cantidad a cero.

**Entonces** los subtotales y el total se recalculan, y la línea desaparece al
llegar a cero.

### QS-CAR-005 — Eliminar línea y estado vacío

**Dado** un carrito con una o más líneas.

**Cuando** la persona elimina todas las líneas.

**Entonces** se muestra el estado de carrito vacío y el total visible es
`S/ 0.00`.

### QS-CAR-006 — Cálculo del total

**Dado** un carrito con al menos tres productos o cantidades distintas.

**Cuando** la persona revisa el resumen.

**Entonces** cada subtotal equivale a precio unitario por cantidad y el total
equivale a la suma de subtotales, sin cargos adicionales.

### QS-CAR-007 — Reinicio de sesión

**Dado** un carrito con productos.

**Cuando** la persona recarga o cierra y vuelve a abrir la página.

**Entonces** el carrito inicia vacío.

### QS-CAR-008 — Continuidad y alcance

**Dado** el catálogo existente.

**Cuando** la persona navega entre catálogo, detalle y carrito.

**Entonces** el catálogo 001 sigue mostrando sus productos y no aparecen
acciones para crear pedidos, iniciar checkout, pagar o enviar WhatsApp.

## Resultado esperado

Todos los escenarios se comprueban desde la interfaz sin leer código. Si un
escenario falla, registrar el resultado observado y el requisito relacionado
antes de declarar la funcionalidad validada.
