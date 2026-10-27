---

description: "Task list for Consulta del catálogo de productos"
---

# Tasks: Consulta del catálogo de productos

**Input**: Design documents from `/specs/001-consulta-catalogo/`

**Prerequisites**: `plan.md`, `spec.md`, `research.md`, `data-model.md` and
`quickstart.md`

**Tests**: No automated test tasks are included. The specification requires
manual, user-verifiable validation in a browser through `quickstart.md`.

**Organization**: Tasks are grouped by user story to preserve independent
delivery and traceability.

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Create the minimal static web application structure defined in
`plan.md`.

- [X] T001 Create the static web entry point and semantic catalog/detail regions in `index.html`
- [X] T002 [P] Create the base visual stylesheet and layout tokens in `src/styles.css`
- [X] T003 [P] Create the local catalog fixture in `src/data/catalogo.js` with `id` unique within the catalog, non-empty `nombre`, `imagen`, `descripcion`, non-negative `precio` and required `disponible` state

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Establish the shared application state and visible states required
by both user stories.

**⚠️ CRITICAL**: No user story work can begin until this phase is complete.

- [X] T004 Implement the application bootstrap, catalog state, selected-product state and loading/error/empty state transitions in `src/app.js`

**Checkpoint**: The static application shell can load the local catalog data and
represent the states required by the feature without inventing product data.

---

## Phase 3: User Story 1 - Explorar el catálogo (Priority: P1) 🎯 MVP

**Goal**: Permitir que una persona consulte la lista de productos y distinga su
nombre, imagen, descripción breve, precio en soles y disponibilidad.

**Independent Test**: Con un catálogo de prueba cargado, abrir `index.html` y
comprobar que todos los productos aparecen con los cinco datos definidos; probar
también catálogo vacío, error de carga y producto “Agotado”.

### Implementation for User Story 1

- [X] T005 [US1] Render the catalog product list from `src/data/catalogo.js` in `src/app.js`, showing `nombre`, `imagen`, `descripcion`, `precio` as `S/` and `disponible` for every product
- [X] T006 [P] [US1] Style catalog cards, product information, empty state, error state and the “Agotado” label in `src/styles.css`
- [X] T007 [US1] Implement the catalog empty and load-error messages in `src/app.js` so no invented product data is displayed
- [X] T008 [US1] Verify the P1 catalog flow against QS-001, QS-003, QS-004, QS-005 and QS-006 in `tests/manual/catalogo.md`

**Checkpoint**: User Story 1 is independently functional and verifiable from
the browser as the MVP.

---

## Phase 4: User Story 2 - Consultar el detalle de un producto (Priority: P2)

**Goal**: Permitir que una persona seleccione un producto, consulte su detalle
y vuelva al catálogo sin iniciar un carrito ni un pedido.

**Independent Test**: Desde un producto visible, seleccionarlo, comprobar la
información completa, volver al catálogo y probar un producto cuyo `id` ya no
exista.

**Dependency**: Requires Phase 3 because the detail starts from a product
rendered by the catalog flow.

### Implementation for User Story 2

- [X] T009 [US2] Implement product selection by stable `id` and render the detail view with `nombre`, `imagen`, `descripcion`, `precio` in `S/` and availability in `src/app.js`
- [X] T010 [US2] Implement the return-to-catalog interaction without creating cart or order state in `src/app.js`
- [X] T011 [P] [US2] Style the product detail view, return control and unavailable-detail message in `src/styles.css`
- [X] T012 [US2] Handle a missing or no-longer-available product detail in `src/app.js` with a clear message and a path back to the catalog
- [X] T013 [US2] Verify the P2 detail flow against QS-002, QS-003, QS-005 and QS-006 in `tests/manual/catalogo.md`

**Checkpoint**: User Stories 1 and 2 are both functional, independently
verifiable and remain within the approved catalog scope.

---

## Phase 5: Polish & Cross-Cutting Concerns

**Purpose**: Apply the project-wide quality gates and finish the validation
artifacts without expanding scope.

- [X] T014 [P] Review visible labels, messages and prices in `index.html`, `src/app.js`, `src/data/catalogo.js` and `src/styles.css` for Spanish de Perú and `S/`
- [X] T015 [P] Document the manual validation cases and observed results in `tests/manual/catalogo.md` using `specs/001-consulta-catalogo/quickstart.md`
- [X] T016 Run every scenario in `specs/001-consulta-catalogo/quickstart.md` and record pass/fail evidence in `tests/manual/catalogo.md`
- [X] T017 Confirm that the delivered files in `index.html`, `src/` and `tests/manual/catalogo.md` contain no carrito, checkout, pedido or WhatsApp functionality outside this feature

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies; creates the static entry point, styles
  and local catalog fixture.
- **Foundational (Phase 2)**: Depends on Phase 1 and blocks user stories.
- **User Story 1 (Phase 3)**: Depends on Phase 2 and is the MVP increment.
- **User Story 2 (Phase 4)**: Depends on User Story 1 because selection begins
  from a rendered catalog product.
- **Polish (Phase 5)**: Depends on the desired user stories being complete.

### User Story Dependencies

- **US1 (P1)**: Depends on Phase 2; no dependency on another user story.
- **US2 (P2)**: Depends on US1; it extends the product selection already shown
  by the catalog.

### Within Each User Story

- Complete rendering and state handling before manual validation.
- Preserve the data-model constraints verbatim: `id` is unique within the
  catalog; `nombre`, `imagen` and `descripcion` are non-empty; `precio` is
  greater than or equal to zero; `disponible` is required.
- Complete US1 before starting US2.
- Stop at each checkpoint and verify the story from the browser.

### Parallel Opportunities

- After T001 establishes the referenced paths, T002 and T003 can be worked on
  in parallel because they modify different files.
- After T004, T005 and T006 can be worked on in parallel because application
  behavior and visual styling are separated into different files.
- After T010, T011 can be worked on in parallel once the detail markup and
  interaction contract are known.
- T014 and T015 can be worked on in parallel after the story implementation is
  complete.

## Parallel Example: User Story 1

```text
Task: "Render the catalog product list in src/app.js"
Task: "Style catalog cards and visible states in src/styles.css"
```

## Parallel Example: User Story 2

```text
Task: "Implement product selection and detail rendering in src/app.js"
Task: "Style the product detail view in src/styles.css"
```

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup.
2. Complete Phase 2: Foundational.
3. Complete Phase 3: User Story 1.
4. Stop and validate QS-001, QS-003, QS-004, QS-005 and QS-006.
5. Present the catalog MVP for review before adding product detail.

### Incremental Delivery

1. Add User Story 1 and validate it independently.
2. Add User Story 2 without changing the approved scope.
3. Run all quickstart scenarios and record the results.
4. Prepare the feature for review only after the branch is validated.

## Notes

- Every task uses the required checkbox, sequential ID and concrete file path.
- `[P]` marks only tasks that can work on different files without incomplete
  dependencies.
- No automated test framework or external contract is introduced in this
  version.
- No implementation task includes carrito, checkout, pedidos or WhatsApp.
