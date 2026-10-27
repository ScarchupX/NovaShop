<!--
Sync Impact Report
- Version change: scaffold sin versión → 1.0.0
- Modified principles: placeholders de la plantilla → I. Simplicidad ante todo; II. Idioma y mercado; III. Cero alcance fantasma; IV. Verificable por una persona no técnica; V. Datos del usuario con respeto
- Added sections: Alcance y restricciones; Flujo de trabajo y calidad
- Removed sections: ninguna sección normativa previa
- Follow-up TODOs: confirmar la fecha original de ratificación
-->

# NovaShop Constitution

## Core Principles

### I. Simplicidad ante todo
Ante dos soluciones válidas, el equipo MUST elegir la más simple que cumpla la
spec y los criterios de éxito. NovaShop es una versión 1: MUST evitarse la
complejidad anticipada, las abstracciones especulativas y las funcionalidades
preparadas para necesidades no documentadas. La complejidad adicional MUST
justificarse en la spec o en una decisión técnica trazable.

### II. Idioma y mercado: español de Perú y soles
Todo texto visible para el usuario MUST estar en español de Perú, incluidos
mensajes, etiquetas, validaciones, estados y contenido de ayuda. Toda cantidad
monetaria MUST expresarse en soles peruanos (PEN, S/), con formato coherente
para el mercado peruano. No se introducirán idiomas, monedas o convenciones
regionales adicionales sin una modificación explícita de la spec.

### III. Cero alcance fantasma
Solo se implementará funcionalidad escrita en la spec vigente. Una idea nueva,
una mejora sugerida o una necesidad descubierta durante el desarrollo MUST
registrarse como propuesta y MUST quedar fuera de la implementación actual
hasta ser incorporada formalmente a la spec. Los cambios de alcance MUST
actualizar la documentación correspondiente antes de construirlos.

### IV. Verificable por una persona no técnica
Cada criterio de éxito MUST poder comprobarse usando la aplicación, mediante
acciones y resultados observables, sin leer código ni consultar herramientas de
desarrollo. Los flujos principales MUST tener estados, mensajes y resultados
visibles que permitan confirmar si el criterio se cumple. La documentación de
la spec MUST describir la forma de verificación cuando no sea evidente.

### V. Datos del usuario con respeto
La aplicación MUST pedir únicamente los datos imprescindibles para la
funcionalidad especificada y MUST explicar su propósito cuando no sea obvio.
No se introducirán claves, tokens, contraseñas, secretos ni credenciales en el
código, el repositorio o los ejemplos de configuración. Los datos sensibles
MUST gestionarse mediante mecanismos de configuración o secretos apropiados;
los registros y pantallas MUST evitar exponerlos innecesariamente.

## Alcance y restricciones

La spec vigente es la fuente de verdad del alcance del producto. La interfaz,
los flujos y los datos MUST respetar el idioma, mercado y moneda definidos en
estos principios. Cualquier requisito que contradiga esta constitución MUST
resolverse mediante una enmienda formal antes de implementarse.

## Flujo de trabajo y calidad

Cada cambio MUST vincularse con un requisito o criterio de éxito de la spec.
Antes de considerarlo terminado, el cambio MUST poder verificarse en la app y
MUST revisarse su cumplimiento de simplicidad, alcance, idioma, moneda y
protección de datos. Las decisiones que agreguen complejidad o pidan datos
adicionales MUST incluir una justificación documentada.

## Governance

Esta constitución gobierna las decisiones de producto e ingeniería de
NovaShop. Toda enmienda MUST describir el cambio, su motivación y su impacto;
MUST actualizar la versión y la fecha de última modificación; y MUST pasar una
revisión de cumplimiento antes de incorporarse al trabajo del proyecto.

La versión usa SemVer: un incremento MAJOR elimina o redefine de forma
incompatible un principio; un incremento MINOR agrega un principio o una
sección normativa; y un incremento PATCH aclara o corrige redacción sin cambiar
la obligación. La revisión de cumplimiento MUST realizarse al planificar cada
funcionalidad y al revisar su entrega, comprobando también que no exista
alcance fantasma.

**Version**: 1.0.0 | **Ratified**: TODO(RATIFICATION_DATE): confirmar la fecha original de adopción | **Last Amended**: 2026-10-26
