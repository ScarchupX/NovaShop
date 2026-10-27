# Implementation Plan: Gestión del carrito de compras

**Branch**: `feature/002-gestion-carrito` | **Date**: 2026-10-26 | **Spec**: [spec.md](./spec.md)

**Input**: Feature specification from `/specs/002-gestion-carrito/spec.md`

## Summary

Ampliar la aplicación web estática existente para permitir agregar productos
disponibles desde el catálogo o su detalle, consultar el carrito, cambiar
cantidades, eliminar líneas y revisar subtotales y total. El carrito vivirá en
memoria durante la sesión actual y se reiniciará al recargar o cerrar la página.
La implementación reutilizará el catálogo 001 y no incluirá pedidos, checkout,
pagos ni WhatsApp.

## Technical Context

**Language/Version**: HTML5, CSS y JavaScript del navegador, conservando la
base existente sin cambiar de lenguaje ni añadir un sistema de construcción

**Primary Dependencies**: Ninguna dependencia externa; se reutilizarán las
capacidades y archivos de la aplicación 001

**Storage**: Estado del carrito en memoria durante la sesión actual; no se
usará `localStorage`, cookies ni almacenamiento remoto

**Testing**: Validación manual en navegador mediante `quickstart.md`, además de
`node --check` para los archivos JavaScript existentes y modificados

**Target Platform**: El mismo navegador web moderno que ejecuta la aplicación
estática de la funcionalidad 001

**Project Type**: Aplicación web estática incremental sobre la funcionalidad
001

**Performance Goals**: Agregar, quitar o cambiar una cantidad debe reflejar el
nuevo subtotal y total inmediatamente y en un máximo observable de 1 segundo
durante la prueba de aceptación

**Constraints**: Reutilizar `window.NovaShopCatalogo` y el `id` estable de cada
producto; solo se agregan productos marcados como disponibles; la cantidad es
un entero positivo sin límite de stock; los importes son soles con `S/`; el
carrito se reinicia al recargar; no hay datos personales, checkout, pagos,
pedidos ni WhatsApp

**Scale/Scope**: El mismo catálogo pequeño de la primera versión; no se diseña
persistencia, inventario numérico, multiusuario ni sincronización entre
dispositivos

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

- **Simplicidad ante todo**: PASS. Se extiende la estructura existente con un
  estado en memoria y controles de interfaz, sin backend ni dependencias.
- **Idioma y mercado**: PASS. El carrito, sus estados y sus importes usarán
  español de Perú y soles (`S/`).
- **Cero alcance fantasma**: PASS. El plan cubre únicamente gestión del carrito
  y conserva fuera pedidos, checkout, pagos y WhatsApp.
- **Verificable por una persona no técnica**: PASS. Todos los escenarios se
  validarán desde la interfaz mediante `quickstart.md`.
- **Datos del usuario con respeto**: PASS. No se solicitarán datos personales ni
  se añadirá persistencia de usuario.

**Gate status**: PASS

## Project Structure

### Documentation (this feature)

```text
specs/002-gestion-carrito/
├── plan.md              # Este plan
├── research.md          # Decisiones de diseño e investigación
├── data-model.md        # Modelo de carrito y líneas
├── quickstart.md        # Validación manual del carrito
├── contracts/
│   └── ui-carrito.md    # Contrato visible de la interfaz del carrito
├── checklists/
│   └── requirements.md  # Checklist de calidad de la especificación
└── tasks.md             # Se generará con $speckit-tasks
```

### Source Code (repository root)

```text
index.html               # Regiones y controles visibles del catálogo y carrito
src/
├── data/
│   └── catalogo.js       # Fuente existente de productos; no se duplica
├── app.js                # Estado del carrito, acciones y renderizado
└── styles.css            # Presentación del carrito y sus estados
tests/
└── manual/
    ├── catalogo.md      # Regresión de la funcionalidad 001
    └── carrito.md       # Validación manual de la funcionalidad 002
```

**Structure Decision**: Mantener la aplicación de una sola página y ampliar
los tres archivos de interfaz existentes. El carrito se identifica por el
`id` del producto y se mantiene separado del arreglo de catálogo para evitar
duplicar datos o crear una fuente de verdad paralela.

## Complexity Tracking

No hay violaciones de la constitución que requieran justificación adicional.

## Constitution Check — Post-Design

- La solución mantiene la estructura estática existente y no añade servicios.
- El estado se reinicia al recargar, conforme a la decisión aclarada.
- Las cantidades no tienen límite de stock porque la fuente actual solo expone
  disponibilidad booleana.
- Los cálculos monetarios se verificarán en soles y no incluyen cargos no
  especificados.
- No se solicitan datos personales ni se introducen secretos.

**Post-design gate status**: PASS
