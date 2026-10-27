# Implementation Plan: Pedido por WhatsApp

**Branch**: `feature/003-pedido-whatsapp` | **Date**: 2026-10-26 | **Spec**: [spec.md](./spec.md)

## Summary

NovaShop incorporará el inicio de pedidos por WhatsApp desde el carrito existente. La solución reutilizará el estado temporal del carrito de 002 para construir un resumen factual —saludo breve, líneas, importes y solicitud de atención— y ofrecerá una conversación dirigida al número oficial `931463289`. Si WhatsApp no puede abrirse, la interfaz conservará el carrito, mostrará un error y permitirá copiar el mensaje preparado. No se agregan checkout, pago, inventario, confirmación comercial ni datos personales.

## Technical Context

**Language/Version**: JavaScript ejecutado en navegador; sintaxis compatible con el código existente (sin transpilar)

**Primary Dependencies**: Vite como dependencia de desarrollo; HTML, CSS y APIs estándar del navegador para navegación, portapapeles y eventos

**Storage**: Estado en memoria de la sesión actual, reutilizando el carrito existente; no se agrega persistencia

**Testing**: Pruebas manuales documentadas, comprobaciones sintácticas con Node y build/preview de Vite; no existe runner automatizado de pruebas

**Target Platform**: Navegadores web de escritorio y móvil con interfaz visible y acceso a WhatsApp o a WhatsApp Web

**Project Type**: Aplicación web estática de una sola página

**Performance Goals**: La acción de preparar el mensaje y mostrar el estado resultante debe ser observable en menos de 1 segundo en una navegación normal; la apertura de WhatsApp queda condicionada por el navegador y el servicio externo

**Constraints**: Mantener la sesión actual del carrito; no afirmar envío o confirmación; todos los textos visibles en español de Perú; importes en S/; no exponer secretos ni pedir datos personales innecesarios; número oficial definido por la spec

**Scale/Scope**: Un carrito de sesión con el volumen de líneas que ya soporta 002; una vista de carrito y un flujo de inicio de conversación; sin backend ni autenticación

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

| Principle | Status | Evidence / design response |
|---|---|---|
| I. Simplicidad ante todo | PASS | Se reutiliza el estado y renderizado del carrito; no se agrega backend, almacenamiento ni dependencia nueva. |
| II. Idioma y mercado: español de Perú y soles | PASS | Mensajes y estados en español de Perú; importes derivados del formato monetario existente en S/. |
| III. Cero alcance fantasma | PASS | El diseño se limita a iniciar la solicitud por WhatsApp; checkout, pago, reservas y confirmación quedan fuera. |
| IV. Verificable por una persona no técnica | PASS | `quickstart.md` define escenarios observables para carrito válido, vacío, error, copia y conservación del carrito. |
| V. Datos del usuario con respeto | PASS | No se solicitan datos personales; el mensaje solo usa datos ya presentes en el carrito y el número oficial indicado en la spec. |

No hay violaciones que requieran justificación.

## Phase 0: Research Decisions

Los detalles de integración y compatibilidad quedan documentados en [research.md](./research.md). Las decisiones se basan en las restricciones observables del proyecto y no agregan alcance comercial.

## Phase 1: Design

- [data-model.md](./data-model.md) define el pedido en preparación, sus líneas, estados y validaciones.
- [contracts/ui-pedido-whatsapp.md](./contracts/ui-pedido-whatsapp.md) define el contrato observable de la interfaz y del intento de apertura.
- [quickstart.md](./quickstart.md) define la validación manual de aceptación.

## Project Structure

### Documentation (this feature)

```text
specs/003-pedido-whatsapp/
├── plan.md
├── research.md
├── data-model.md
├── quickstart.md
├── contracts/
│   └── ui-pedido-whatsapp.md
└── checklists/
    └── requirements.md
```

### Source Code (repository root)

```text
index.html          # Estructura de las vistas de catálogo, detalle y carrito
src/
├── app.js           # Estado del carrito, renderizado y eventos de la aplicación
├── data/
│   └── catalogo.js  # Catálogo existente reutilizado por el carrito
└── styles.css       # Estilos de vistas, estados y controles
tests/
└── manual/
    ├── catalogo.md  # Validación manual de 001
    └── carrito.md   # Validación manual de 002
```

**Structure Decision**: Se mantiene la aplicación web estática existente y se añade Vite como capa de desarrollo y build. `index.html` sigue siendo la entrada raíz; `src/app.js`, `src/data/catalogo.js` y `src/styles.css` conservan sus responsabilidades. No se crea una capa de servicio ni una estructura de backend porque el alcance no requiere persistencia ni comunicación servidor-a-servidor.

## Complexity Tracking

No aplica: la revisión constitucional no identificó violaciones.

## Post-Design Constitution Check

| Principle | Status | Verification after design |
|---|---|---|
| I. Simplicidad ante todo | PASS | El diseño añade únicamente preparación, apertura/copia y estados al flujo del carrito. |
| II. Idioma y mercado: español de Perú y soles | PASS | El contrato exige textos en español y valores monetarios consistentes con el carrito. |
| III. Cero alcance fantasma | PASS | No se diseñan pagos, cuentas, inventario, checkout ni confirmaciones comerciales. |
| IV. Verificable por una persona no técnica | PASS | Los artefactos incluyen escenarios con resultados visibles y criterios de fallo. |
| V. Datos del usuario con respeto | PASS | No se incorporan campos personales; la copia y navegación usan solo el resumen del carrito. |
