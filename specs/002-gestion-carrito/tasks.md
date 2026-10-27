---

description: "Task list for Gestión del carrito de compras"
---

# Tasks: Gestión del carrito de compras

**Input**: Design documents from `/specs/002-gestion-carrito/`

**Prerequisites**: `plan.md`, `spec.md`, `research.md`, `data-model.md`,
`contracts/ui-carrito.md` and `quickstart.md`

**Tests**: No automated test framework is requested. Manual browser validation
is required by `quickstart.md`; JavaScript syntax checks are included as a
quality gate.

**Organization**: Tasks are grouped by user story and preserve the existing
catalog behavior from feature 001.

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Add the visible regions and validation record needed to extend the
existing static application without creating a parallel catalog.

- [X] T001 Add semantic cart and cart-summary regions to `index.html` without removing or replacing the existing catalog/detail regions
- [X] T002 [P] Add cart layout, line-item, control and empty-state style primitives in `src/styles.css`
- [X] T003 [P] Create the manual validation record with QS-CAR-001 through QS-CAR-008 in `tests/manual/carrito.md`

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Establish the shared in-memory cart state and monetary rules used
by all user stories.

**⚠️ CRITICAL**: No user story work can begin until this phase is complete.

- [X] T004 Implement the in-memory cart state and session-reset behavior in `src/app.js`, with an initially empty `lineas` collection and no browser or remote persistence
- [X] T005 Implement product lookup and validation in `src/app.js` using the existing `window.NovaShopCatalogo`, stable `id`, non-negative `precio` and boolean `disponible` rules from `specs/002-gestion-carrito/data-model.md`
- [X] T006 Implement integer-cent monetary helpers in `src/app.js` so each subtotal is `precioUnitario × cantidad` and the total is the sum of valid subtotals, without shipping, taxes or discounts

**Checkpoint**: The existing catalog remains available and the application has
an empty, session-only cart state that can safely reference catalog products.

---

## Phase 3: User Story 1 - Agregar productos al carrito (Priority: P1) 🎯 MVP

**Goal**: Allow a visitor to add an available catalog product from the catalog
or detail and see a single cart line with quantity one.

**Independent Test**: Add an available product, add it again, and attempt to add
an “Agotado” product; verify the line, quantity, subtotal and unchanged cart
state after the rejected action.

### Implementation for User Story 1

- [X] T007 [US1] Add an “Agregar al carrito” action for available products and a clear rejected-action message for “Agotado” products in `index.html` and `src/app.js`
- [X] T008 [US1] Add each valid product to one cart line keyed by `productoId` with initial `cantidad` 1, preserving `nombre`, `precioUnitario` and the product image reference in `src/app.js`
- [X] T009 [US1] Increment the existing line instead of creating a duplicate when the same product is added again in `src/app.js`
- [X] T010 [US1] Render each current cart line with product name, unit price, quantity, subtotal and total in soles in `src/app.js`
- [X] T011 [US1] Verify QS-CAR-001, QS-CAR-002 and QS-CAR-003 and record evidence in `tests/manual/carrito.md`

**Checkpoint**: User Story 1 is independently usable as the cart MVP without
adding orders, checkout, payments or WhatsApp actions.

---

## Phase 4: User Story 2 - Modificar el contenido del carrito (Priority: P1)

**Goal**: Allow a visitor to increase, decrease and remove cart lines while
recalculating affected subtotals and the total.

**Independent Test**: With a cart line present, increase it, decrease it, take
the quantity to zero and remove a line; verify other lines remain unchanged and
the empty state appears when the last line is removed.

**Dependency**: Depends on User Story 1 because all quantity controls operate on
the cart lines created by the add action.

### Implementation for User Story 2

- [X] T012 [US2] Add increase, decrease and remove controls for each cart line in `index.html` and `src/app.js`
- [X] T013 [US2] Enforce `cantidad` as an integer greater than zero, remove a line when it reaches zero, and keep other lines unchanged in `src/app.js`
- [X] T014 [US2] Recalculate the affected subtotal and cart total after every quantity or removal action using the integer-cent helpers in `src/app.js`
- [X] T015 [P] [US2] Style quantity controls, remove action, feedback states and the empty cart state in `src/styles.css`
- [X] T016 [US2] Verify QS-CAR-004 and QS-CAR-005 and record evidence in `tests/manual/carrito.md`

**Checkpoint**: User Stories 1 and 2 both work and the cart can be adjusted
without changing the catalog source or introducing inventory rules.

---

## Phase 5: User Story 3 - Revisar el resumen del carrito (Priority: P2)

**Goal**: Provide a clear cart summary for zero, one and multiple products with
correct soles-formatted subtotals and total.

**Independent Test**: Review an empty cart and a cart with at least three lines
or quantities, verify every amount, reload the page, and confirm the cart starts
empty again.

**Dependency**: Depends on User Stories 1 and 2 because the summary consumes
their cart lines and calculated values.

### Implementation for User Story 3

- [X] T017 [US3] Render the cart summary with line count, product lines, subtotals, total and empty-state message in `index.html` and `src/app.js`
- [X] T018 [US3] Format every cart price, subtotal, total and empty total as soles using `S/` and Spanish de Perú labels in `src/app.js`
- [X] T019 [US3] Handle a missing catalog product or invalid price without inventing a subtotal, while keeping valid cart lines reviewable in `src/app.js`
- [X] T020 [US3] Confirm that reloading the page resets the in-memory cart and that no order, checkout, payment or WhatsApp controls are rendered in `index.html` and `src/app.js`
- [X] T021 [US3] Verify QS-CAR-006, QS-CAR-007 and QS-CAR-008 and record evidence in `tests/manual/carrito.md`

**Checkpoint**: All three user stories are independently verifiable and the
catalog 001 behavior remains intact.

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Validate continuity, quality gates and scope boundaries.

- [X] T022 [P] Review catalog regression behavior and update evidence in `tests/manual/catalogo.md` without changing the approved catalog scope
- [X] T023 [P] Run `node --check` for `src/app.js` and `src/data/catalogo.js`, then record the result in `tests/manual/carrito.md`
- [X] T024 Run every scenario in `specs/002-gestion-carrito/quickstart.md` and record pass/fail evidence in `tests/manual/carrito.md`
- [X] T025 Confirm visible text and prices in `index.html`, `src/app.js` and `src/styles.css` are in Spanish de Perú and use `S/`
- [X] T026 Confirm the delivered files in `index.html`, `src/app.js`, `src/styles.css` and `tests/manual/carrito.md` contain no order, checkout, payment or WhatsApp implementation

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies; prepares the cart regions, styles and
  manual validation record.
- **Foundational (Phase 2)**: Depends on Phase 1 and blocks all stories.
- **User Story 1 (Phase 3)**: Depends on Phase 2 and is the MVP increment.
- **User Story 2 (Phase 4)**: Depends on User Story 1 because it modifies lines
  created by the add flow.
- **User Story 3 (Phase 5)**: Depends on User Stories 1 and 2 because it
  summarizes their calculated state.
- **Polish (Phase 6)**: Depends on the desired stories being complete.

### User Story Dependencies

- **US1 (P1)**: Depends on Phase 2; no dependency on another story.
- **US2 (P1)**: Depends on US1; controls act on US1 cart lines.
- **US3 (P2)**: Depends on US1 and US2; summary consumes their state.

### Within Each User Story

- Complete shared state and product validation before UI actions.
- Preserve the data-model constraints: `productoId` maps to `Producto.id`, one
  line per product, `cantidad` is an integer greater than zero, and valid
  subtotals use `precioUnitario × cantidad`.
- Complete implementation before manual validation.
- Stop at each checkpoint and verify the story from the browser.

### Parallel Opportunities

- After T001, T002 and T003 can run in parallel because they modify different
  files.
- T005 and T006 are intentionally sequential because both modify
  `src/app.js`; their concerns remain separate but the file must not be edited
  concurrently.
- T015 can run in parallel with T014 after T012 and T013 establish the control
  names and behavior.
- T022 and T023 can run in parallel after all user stories are complete.

## Parallel Example: User Story 1

```text
Task: "Add the Agregar al carrito action in index.html and src/app.js"
Task: "Render cart lines and totals in src/app.js"
```

These tasks share `src/app.js` and should be coordinated or executed
sequentially despite being logically separable.

## Parallel Example: User Story 2

```text
Task: "Implement quantity and removal behavior in src/app.js"
Task: "Style quantity controls and empty state in src/styles.css"
```

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup.
2. Complete Phase 2: Foundational.
3. Complete Phase 3: User Story 1.
4. Stop and validate QS-CAR-001, QS-CAR-002 and QS-CAR-003.
5. Present the cart MVP for review before adding quantity controls.

### Incremental Delivery

1. Add User Story 1 and validate adding products.
2. Add User Story 2 and validate quantity/removal behavior.
3. Add User Story 3 and validate summary, reset and scope boundaries.
4. Run the complete quickstart and regression checks before preparing review.

## Notes

- Every task uses the required checkbox, sequential ID and concrete file path.
- `[P]` marks only tasks that can modify different files without incomplete
  dependencies; tasks sharing `src/app.js` remain coordinated.
- No automated test framework, backend, persistence or external API is added.
- No task includes order generation, checkout, payment or WhatsApp messaging.
