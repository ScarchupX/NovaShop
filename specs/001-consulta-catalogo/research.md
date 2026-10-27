# Research: Consulta del catálogo de productos

## Decisión 1: Aplicación web estática mínima

**Decision**: Usar HTML5, CSS y JavaScript estándar del navegador, sin
dependencias externas ni backend para la primera versión.

**Rationale**: El repositorio no contiene aplicación ni stack existente. Esta
opción satisface la consulta de catálogo y detalle con la menor complejidad,
facilita la verificación por una persona no técnica y respeta el principio de
simplicidad.

**Alternatives considered**: Añadir un framework, un backend o un sistema de
persistencia. Se descartan porque no son necesarios para el alcance aprobado y
crearían decisiones y mantenimiento anticipados.

## Decisión 2: Datos locales del catálogo

**Decision**: Representar los productos de la primera versión como datos locales
del proyecto, sin persistencia ni edición desde la interfaz.

**Rationale**: La spec solo exige consultar productos. No define administración
de catálogo, sincronización externa ni reglas de inventario. Los datos locales
permiten validar los escenarios de lista, detalle, agotado y catálogo vacío sin
inventar una integración.

**Alternatives considered**: API remota, base de datos o almacenamiento del
navegador. Se descartan porque ampliarían el alcance y no están justificadas por
la spec.

## Decisión 3: Validación manual orientada a la interfaz

**Decision**: Validar la funcionalidad mediante los escenarios de `quickstart.md`
en un navegador moderno y registrar los casos manuales bajo `tests/manual/`.

**Rationale**: La constitución exige que los criterios puedan comprobarse desde
la aplicación. No existe aún un stack ni una suite de pruebas; introducir un
framework de pruebas en esta versión sería complejidad anticipada.

**Alternatives considered**: Añadir un framework de pruebas automatizadas. Se
deja como propuesta futura si la siguiente especificación introduce lógica o
integraciones que lo justifiquen.
