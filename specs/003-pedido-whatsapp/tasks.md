# Tasks: Pedido por WhatsApp

**Input**: Design documents from `/specs/003-pedido-whatsapp/`

**Prerequisites**: [plan.md](./plan.md), [spec.md](./spec.md), [research.md](./research.md), [data-model.md](./data-model.md), [contracts/ui-pedido-whatsapp.md](./contracts/ui-pedido-whatsapp.md), [quickstart.md](./quickstart.md)

**Tests**: No se generan tareas de pruebas automatizadas porque la especificación no solicita TDD y el repositorio no tiene runner configurado. Se incluyen validaciones manuales reproducibles.

**Organization**: Las tareas están agrupadas por historia de usuario para permitir implementación y validación incremental.

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Preparar la estructura existente para ampliar el flujo del carrito sin agregar dependencias.

- [ ] T001 Confirmar en `index.html`, `src/app.js` y `src/styles.css` los puntos de integración de la vista del carrito, sus mensajes de estado y sus eventos existentes antes de modificar la funcionalidad.
- [ ] T002 [P] Registrar en `tests/manual/pedido-whatsapp.md` la matriz inicial de escenarios de 003 a partir de `specs/003-pedido-whatsapp/quickstart.md`.

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Crear las reglas compartidas de preparación del pedido que necesitan todas las historias.

**⚠️ CRITICAL**: Esta fase debe completarse antes de cualquier historia de usuario.

- [ ] T003 Implementar en `src/app.js` la construcción de una instantánea del carrito con líneas válidas, cantidades, precios unitarios, subtotales y total en céntimos, sin mutar el carrito existente; respetar los estados `listo`, `carrito-vacio` e `incompleto` definidos en `specs/003-pedido-whatsapp/data-model.md`.
- [ ] T004 [P] Implementar en `src/app.js` la generación determinista del mensaje con saludo breve, una línea por producto, importes en `S/` y solicitud de atención, sin datos personales, descuentos, costos de delivery, instrucciones de pago ni lenguaje de confirmación, conforme a `specs/003-pedido-whatsapp/contracts/ui-pedido-whatsapp.md`.
- [ ] T005 [P] Añadir en `src/app.js` la normalización técnica del destino oficial `931463289` al formato internacional de Perú `51931463289`, sin cambiar el número de negocio definido en la especificación.

**Checkpoint**: Las reglas de datos, formato monetario, mensaje y destino están disponibles sin cambiar el estado del carrito.

---

## Phase 3: User Story 1 - Iniciar un pedido desde un carrito con productos (Priority: P1) 🎯 MVP

**Goal**: Permitir que un usuario con un carrito válido prepare el pedido y abra una conversación de WhatsApp con el resumen actual.

**Independent Test**: Con uno o varios productos disponibles en el carrito, activar la acción de pedido y comprobar que se abre WhatsApp con el mensaje preparado, que el destino es el oficial y que el carrito conserva su contenido.

### Implementation for User Story 1

- [ ] T006 [US1] Añadir en `index.html` una acción visible en la vista del carrito para iniciar el pedido por WhatsApp y los contenedores accesibles para su estado de resultado, manteniendo el idioma español de Perú.
- [ ] T007 [US1] Conectar en `src/app.js` la acción del carrito con la instantánea y el generador de mensaje de T003–T004, usando el contenido más reciente al momento de la activación.
- [ ] T008 [US1] Implementar en `src/app.js` la apertura de la conversación de WhatsApp hacia `51931463289` con el mensaje preparado, sin crear confirmación, pago, reserva, cuenta ni mutación del carrito.
- [ ] T009 [US1] Añadir en `src/styles.css` estilos para la acción de pedido y sus estados visibles, reutilizando las convenciones existentes de botones, mensajes y diseño responsive.
- [ ] T010 [US1] Validar manualmente en `tests/manual/pedido-whatsapp.md` los escenarios de uno y varios productos, verificando una línea por producto, cantidades, subtotales, total en S/ y conservación del carrito.

**Checkpoint**: User Story 1 funciona de manera independiente y constituye el MVP demostrable.

---

## Phase 4: User Story 2 - Revisar el resumen antes de enviarlo (Priority: P1)

**Goal**: Asegurar que el mensaje preparado sea revisable, fiel al carrito y no implique confirmación de NovaShop.

**Independent Test**: Comparar el carrito con el mensaje visible en la conversación y abandonar la conversación sin enviar; confirmar que todas las líneas e importes coinciden y el carrito no cambia.

### Implementation for User Story 2

- [ ] T011 [US2] Ajustar en `src/app.js` la composición del mensaje para conservar el orden acordado: saludo, líneas del carrito, total en S/ y solicitud de atención, sin duplicados ni datos comerciales no autorizados.
- [ ] T012 [US2] Añadir en `src/app.js` el estado visible de no confirmación después de abrir o copiar el mensaje, evitando textos que indiquen pedido enviado, recibido, aceptado o confirmado.
- [ ] T013 [P] [US2] Revisar en `src/styles.css` la accesibilidad visual y responsive de la acción y de los estados del pedido, incluyendo foco visible y lectura clara en pantallas pequeñas.
- [ ] T014 [US2] Validar manualmente en `tests/manual/pedido-whatsapp.md` la comparación entre carrito y mensaje, el abandono sin envío y la conservación de líneas, cantidades, subtotales y total.

**Checkpoint**: User Stories 1 y 2 funcionan conjuntamente y el usuario puede revisar la solicitud sin que NovaShop confirme el pedido.

---

## Phase 5: User Story 3 - Gestionar estados del inicio de pedido (Priority: P2)

**Goal**: Gestionar carrito vacío, datos insuficientes y fallos de apertura con estados comprensibles y copia del mensaje preparado.

**Independent Test**: Verificar que un carrito vacío no inicia el pedido y que un fallo de apertura muestra aviso, permite copiar el mensaje y conserva el carrito sin confirmar el envío.

### Implementation for User Story 3

- [ ] T015 [US3] Implementar en `src/app.js` el estado de carrito vacío que impide iniciar el pedido y comunica que primero se deben agregar productos.
- [ ] T016 [US3] Implementar en `src/app.js` la detección y comunicación del estado `incompleto` cuando una línea carezca de nombre, cantidad o importe válido, sin generar un mensaje parcial ni mutar el carrito.
- [ ] T017 [US3] Implementar en `src/app.js` el estado `error-apertura` cuando WhatsApp no pueda abrirse o el intento falle, sin afirmar que el pedido fue enviado.
- [ ] T018 [US3] Añadir en `index.html` la acción accesible para copiar el mensaje preparado desde el estado de error y el texto visible que explica su propósito.
- [ ] T019 [US3] Implementar en `src/app.js` la copia del mensaje preparado mediante la capacidad estándar del navegador disponible, con manejo visible de éxito o fallo y sin alterar el carrito.
- [ ] T020 [US3] Añadir en `src/styles.css` los estilos para estados vacío, incompleto, error de apertura, acción de copia y mensajes de resultado, manteniendo español de Perú y el patrón visual existente.
- [ ] T021 [US3] Validar manualmente en `tests/manual/pedido-whatsapp.md` los escenarios de carrito vacío, WhatsApp no disponible, copia del mensaje, datos insuficientes y ausencia de confirmación.

**Checkpoint**: Las tres historias quedan funcionales y cada estado de inicio de pedido es observable y verificable.

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Completar regresión, trazabilidad y calidad transversal sin ampliar el alcance.

- [ ] T022 [P] Revisar en `src/app.js` que iniciar, abrir, copiar o abandonar el mensaje no cambie cantidades, líneas ni total del carrito durante la sesión.
- [ ] T023 [P] Revisar en `index.html` y `src/styles.css` que la acción, los mensajes de estado y la copia sean operables mediante teclado y tengan nombres accesibles.
- [ ] T024 Ejecutar en `tests/manual/catalogo.md` y `tests/manual/carrito.md` la regresión de catálogo y carrito: consultar productos, agregar disponibles, rechazar agotados, aumentar, disminuir y eliminar líneas.
- [ ] T025 Ejecutar todos los escenarios de `tests/manual/pedido-whatsapp.md` y documentar resultados observables contra `specs/003-pedido-whatsapp/quickstart.md`.
- [ ] T026 Revisar `specs/003-pedido-whatsapp/plan.md`, `specs/003-pedido-whatsapp/research.md`, `specs/003-pedido-whatsapp/data-model.md`, `specs/003-pedido-whatsapp/contracts/ui-pedido-whatsapp.md` y `specs/003-pedido-whatsapp/quickstart.md` para confirmar que la implementación no introduce checkout, pagos, reservas, datos personales ni confirmaciones comerciales.

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No depende de otra fase; T001 y T002 pueden ejecutarse en paralelo.
- **Foundational (Phase 2)**: Depende de Phase 1 y bloquea todas las historias.
- **User Story 1 (Phase 3)**: Depende de Phase 2 y es el MVP.
- **User Story 2 (Phase 4)**: Depende de Phase 2; usa el flujo de apertura de US1 para validar revisión y no confirmación.
- **User Story 3 (Phase 5)**: Depende de Phase 2; integra estados y fallback con las acciones creadas en US1.
- **Polish (Phase 6)**: Depende de las historias que se quieran entregar; para una entrega completa depende de US1, US2 y US3.

### User Story Dependencies

- **US1 (P1)**: Depende de la base del carrito existente y de Phase 2; no depende de US2 ni US3.
- **US2 (P1)**: Depende de Phase 2 y del punto de apertura de US1; puede validarse sin implementar el fallback completo de US3.
- **US3 (P2)**: Depende de Phase 2 y de los controles de inicio de US1; completa los estados negativos y la copia.

### Parallel Opportunities

- T001 y T002 pueden ejecutarse en paralelo.
- T004 y T005 pueden ejecutarse en paralelo después de acordar la forma de la instantánea de T003.
- T006 y T009 pueden ejecutarse en paralelo porque modifican archivos diferentes.
- T011 y T013 pueden ejecutarse en paralelo dentro de US2.
- T015, T016, T017 y T020 pueden trabajarse en paralelo después de definir el contrato de estado.
- T022 y T023 pueden ejecutarse en paralelo durante Polish.

## Parallel Example: User Story 1

```text
T006: Añadir controles y estados en index.html
T009: Estilizar la acción de pedido y estados en src/styles.css
```

Después de T003, T004 y T005, T006/T009 pueden avanzar en paralelo; T007 y T008 requieren el contrato de datos compartido.

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Completar Phase 1: Setup.
2. Completar Phase 2: Foundational.
3. Completar Phase 3: User Story 1.
4. Ejecutar el escenario independiente de US1 y detenerse para validación.

### Incremental Delivery

1. Entregar US1 para iniciar conversaciones desde un carrito válido.
2. Incorporar US2 para revisar el resumen y preservar el control del usuario.
3. Incorporar US3 para estados vacíos, incompletos, fallos y copia.
4. Ejecutar Polish y la regresión de 001/002.

## Traceability Summary

| Story | Main requirements covered | Design references |
|---|---|---|
| US1 | FR-001, FR-003, FR-004, FR-005, FR-008 | data-model, UI contract, research decisions 1–2 |
| US2 | FR-003, FR-004, FR-006, FR-007, FR-008, FR-011 | UI contract, research decision 3 |
| US3 | FR-002, FR-009, FR-010, FR-013 | data-model, UI contract, research decision 4 |
| Polish | FR-011, FR-012 and regression of 001/002 | quickstart, constitution check |
