# AGENTS.md

## 1. Propósito del proyecto

Este repositorio utiliza Spec-Driven Development (SDD) para desarrollar NovaShop a partir de especificaciones claras, verificables y versionadas.

El agente debe priorizar los requisitos definidos en las especificaciones antes de diseñar o implementar cualquier funcionalidad.

**Regla principal:** no implementar funcionalidades que no estén contempladas en una especificación aprobada o que no hayan sido autorizadas explícitamente.

## 2. Principios de desarrollo

- **Especificación primero:** definir qué se necesita y por qué antes de decidir cómo implementarlo.
- **Trazabilidad:** relacionar cada cambio con una especificación y sus tareas.
- **Cambios mínimos:** modificar únicamente los archivos necesarios para cumplir los requisitos.
- **Calidad:** mantener código legible, modular, seguro y fácil de mantener.
- **Verificación:** ejecutar las pruebas pertinentes y comprobar sus resultados antes de finalizar.
- **No inventar requisitos:** solicitar aclaraciones ante ambigüedades importantes.
- **Documentación actualizada:** mantener alineados los requisitos, las especificaciones, las tareas y la implementación.
- **Continuidad funcional:** cada nueva especificación debe conservar las funcionalidades previamente integradas.
- **Integridad de Git:** no sobrescribir cambios existentes ni afirmar que una operación se completó sin verificarla.

## 3. Flujo de trabajo SDD

Para cada funcionalidad, seguir este proceso:

1. **Specify:** utilizar `[$speckit-specify]` para definir requisitos, objetivos, escenarios de usuario y criterios de aceptación.
2. **Clarify:** utilizar la herramienta de aclaración disponible cuando existan ambigüedades relevantes.
3. **Plan:** utilizar `[$speckit-plan]` para definir la solución técnica, la arquitectura y las decisiones de implementación.
4. **Tasks:** utilizar `[$speckit-tasks]` para descomponer el trabajo en tareas pequeñas y verificables.
5. **Analyze:** utilizar `[$speckit-analyze]` para identificar inconsistencias, omisiones y contradicciones cuando esté disponible.
6. **Implement:** utilizar `[$speckit-implement]` para desarrollar la funcionalidad siguiendo las tareas y los requisitos aprobados.
7. **Verify:** ejecutar las pruebas, revisar los criterios de aceptación y corregir los defectos encontrados.
8. **Converge:** utilizar `[$speckit-converge]`, si está disponible, para evaluar la correspondencia entre los artefactos y la implementación.

No avanzar a la implementación si existen dudas críticas sobre los requisitos o decisiones técnicas pendientes.

No asumir que los comandos de Spec Kit están disponibles sin comprobarlo. Si una herramienta no existe, informar de la limitación y no afirmar que se ha ejecutado.

## 4. Gestión de especificaciones

- Cada funcionalidad debe tener una especificación independiente.
- Las especificaciones deben utilizar identificadores únicos y nombres descriptivos.
- Los requisitos deben ser claros, comprobables y no contradictorios.
- Los criterios de aceptación deben permitir verificar objetivamente el comportamiento esperado.
- Las decisiones técnicas deben documentarse en el plan correspondiente.
- Las tareas deben poder relacionarse con los requisitos que satisfacen.
- No modificar silenciosamente requisitos aprobados.
- Si cambia el alcance, actualizar los artefactos afectados antes de continuar.
- Respetar la estructura generada por GitHub Spec Kit y evitar estructuras paralelas innecesarias.

## 5. Gestión de ramas de GitHub

### 5.1. Convención de nombres

- `feature/<id>-<nombre-corto>` para funcionalidades nuevas.
- `fix/<id>-<nombre-corto>` para correcciones.
- `docs/<id>-<nombre-corto>` para cambios exclusivamente documentales.

### 5.2. Secuencia de NovaShop

El desarrollo principal de NovaShop seguirá este orden:

1. `feature/001-consulta-catalogo`
2. `feature/002-gestion-carrito`
3. `feature/003-pedido-whatsapp`

La estrategia de integración será **acumulativa mediante `main`**:

- La rama `feature/001-consulta-catalogo` se crea desde `main` actualizado.
- Una vez validada la especificación 001, se prepara un Pull Request dirigido a `main`.
- El usuario revisa y fusiona el Pull Request en GitHub.
- Después de confirmar que la integración se completó, se actualiza `main` y se crea `feature/002-gestion-carrito` desde ese `main`.
- Tras validar la especificación 002, se prepara su Pull Request hacia `main`. Después de que el usuario lo fusione, se actualiza `main` y se crea `feature/003-pedido-whatsapp` desde ese `main`.
- La especificación 003 se desarrolla conservando las funcionalidades de las especificaciones 001 y 002.

Cada nueva rama debe partir del `main` actualizado, después de integrar correctamente la especificación anterior. No se deben crear las tres ramas desde una versión antigua de `main` ni encadenarlas directamente entre sí.

### 5.3. Herencia acumulativa

La continuidad de las funcionalidades se garantiza mediante la integración secuencial en `main`.

Por tanto:

- La rama 002 debe contener la implementación y los artefactos previamente integrados de la especificación 001.
- La rama 003 debe contener la implementación y los artefactos previamente integrados de las especificaciones 001 y 002.
- Las nuevas funcionalidades deben ampliar el sistema existente, no sustituirlo ni recrearlo innecesariamente.
- Las especificaciones anteriores deben consultarse como contexto cuando existan dependencias.
- No asumir que Spec Kit incorpora automáticamente el contenido de todas las especificaciones anteriores a cada comando.

### 5.4. Procedimiento Git

Antes de crear o cambiar de rama:

1. Comprobar la rama activa y ejecutar `git status`.
2. Identificar los cambios locales existentes y protegerlos.
3. Obtener las referencias remotas actualizadas.
4. Confirmar que el Pull Request anterior se ha fusionado en `main`.
5. Actualizar la rama local `main` de forma segura.
6. Crear la siguiente rama desde el `main` actualizado.
7. Verificar la rama activa y el commit de origen.

Utilizar operaciones seguras y evitar sobrescribir cambios locales.

No ejecutar `git reset --hard`, `git clean -fd`, force push ni otras operaciones destructivas sin autorización explícita.

### 5.5. Integración manual y permisos

- El procedimiento habitual consiste en preparar un Pull Request hacia `main` para cada especificación.
- El usuario conserva el control de la revisión y del merge en GitHub.
- No fusionar directamente en `main` ni omitir revisiones obligatorias sin autorización explícita.
- Después del merge, no crear la siguiente rama hasta verificar que la integración realmente se completó.
- Si el usuario solicita expresamente que Codex realice el merge, comprobar previamente los permisos, las protecciones de rama y las validaciones exigidas.
- No afirmar que se ha creado una rama, abierto un Pull Request o realizado un merge sin comprobar el resultado.
- No realizar push, fusiones adicionales ni eliminar ramas sin autorización cuando no hayan sido solicitados.

### 5.6. Configuración de Spec Kit

Antes de ejecutar un comando SDD:

- Verificar la rama activa.
- Revisar la ruta de la funcionalidad seleccionada en `.specify/feature.json`, si existe y corresponde a la configuración del proyecto.
- No asumir que cambiar de rama actualiza automáticamente esta configuración.
- Confirmar que el comando trabajará sobre la especificación prevista.
- Si la configuración no coincide con la funcionalidad seleccionada, detenerse y resolver la discrepancia antes de continuar.

## 6. Reglas de implementación

### Antes de modificar código

- Revisar la estructura y las convenciones existentes.
- Leer la especificación, el plan y las tareas de la funcionalidad.
- Identificar los componentes afectados y sus dependencias.
- Comprobar si existen soluciones o componentes reutilizables.
- Confirmar que la rama actual corresponde a la funcionalidad.
- Identificar las funcionalidades anteriores que deben conservarse.

### Durante la implementación

- Seguir la arquitectura y las tecnologías establecidas en el proyecto.
- Evitar duplicaciones innecesarias.
- Respetar las convenciones de nombres, formato y organización.
- No introducir dependencias nuevas sin justificar su necesidad.
- No incluir credenciales, secretos ni datos sensibles en el repositorio.
- No realizar refactorizaciones ajenas al alcance aprobado.
- Mantener la compatibilidad con las funcionalidades previamente implementadas.
- Si un requisito no puede implementarse según lo especificado, documentar el impedimento y solicitar una decisión.

## 7. Pruebas y calidad

- Identificar las pruebas necesarias a partir de los criterios de aceptación.
- Crear o actualizar pruebas para los comportamientos modificados.
- Ejecutar las pruebas pertinentes antes de dar por finalizada una tarea.
- Ejecutar los analizadores estáticos, las comprobaciones de tipos y las herramientas de formato configuradas cuando corresponda.
- Ejecutar pruebas de regresión pertinentes para verificar que las funcionalidades anteriores continúan funcionando.
- No declarar pruebas satisfactorias si no se han ejecutado o verificado sus resultados.
- No ignorar errores existentes sin documentar su impacto.
- No considerar terminada una funcionalidad si incumple criterios de aceptación obligatorios.

### Comandos del proyecto

Identificar los comandos reales en la configuración y los archivos del repositorio:

- Instalación: por determinar mediante inspección del proyecto.
- Desarrollo: por determinar mediante inspección del proyecto.
- Pruebas: por determinar mediante inspección del proyecto.
- Análisis estático: por determinar mediante inspección del proyecto.
- Compilación: por determinar mediante inspección del proyecto.

No inventar comandos. Si no existe una herramienta o un comando para alguna comprobación, informar de ello.

## 8. Seguridad y manejo de cambios

- No exponer variables de entorno, credenciales ni información privada.
- Validar los datos de entrada según los requisitos de la funcionalidad.
- Aplicar los controles de autorización y autenticación que correspondan.
- No ejecutar operaciones destructivas sin autorización explícita.
- No modificar configuraciones de infraestructura o despliegue fuera del alcance aprobado.
- No revertir cambios preexistentes del usuario o de otros colaboradores.
- Revisar el impacto de las migraciones y los cambios en los datos antes de ejecutarlos.
- No sobrescribir el trabajo de otras ramas ni resolver conflictos descartando cambios sin comprender su impacto.

## 9. Criterios de finalización

Una funcionalidad se considera implementada y validada cuando:

- La implementación satisface la especificación aprobada.
- Se cumplen los criterios de aceptación.
- Las tareas están completadas o sus pendientes están documentados.
- Las pruebas pertinentes se han ejecutado y sus resultados están registrados.
- Se han verificado las regresiones relevantes.
- No se han introducido cambios ajenos al alcance.
- La documentación afectada está actualizada.
- La rama y el estado de Git se han verificado.
- Se ha preparado el Pull Request cuando corresponda.

Una funcionalidad solo se considera **integrada** cuando el Pull Request se ha fusionado y se ha verificado el estado resultante de `main`.

Si las pruebas pasan, pero el Pull Request sigue pendiente, la funcionalidad debe informarse como validada y pendiente de integración.

## 10. Informe final del agente

Al finalizar cada tarea, informar de:

- **Funcionalidad:** identificador y nombre de la especificación.
- **Rama:** nombre de la rama utilizada y su rama base.
- **Cambios realizados:** resumen de los archivos y comportamientos modificados.
- **Requisitos cubiertos:** criterios de aceptación satisfechos.
- **Pruebas:** comandos ejecutados y resultados reales.
- **Regresión:** funcionalidades anteriores verificadas.
- **Pendientes:** defectos, limitaciones o decisiones necesarias.
- **Pull Request:** estado real, cuando corresponda.
- **Integración:** estado del merge en `main`, cuando corresponda.
- **Siguiente paso:** acción necesaria para continuar el flujo SDD.
- **Estado:** completado, parcialmente completado o bloqueado.

Si no se puede verificar algún criterio, indicarlo explícitamente en lugar de asumir que se cumple.

## 11. Continuidad del flujo SDD de NovaShop

Al completar una especificación, seguir este procedimiento:

1. Completar la implementación y las pruebas de la funcionalidad actual.
2. Revisar los cambios y preparar el Pull Request hacia `main`.
3. Informar al usuario de que el Pull Request está listo para revisión.
4. Esperar a que el usuario realice el merge manual en GitHub, salvo autorización explícita para delegarlo.
5. Confirmar que el merge se completó y que `main` contiene los cambios esperados.
6. Actualizar `main` y crear la rama de la siguiente especificación desde esa versión.
7. Verificar que la nueva rama contiene las funcionalidades previamente integradas.
8. Continuar el ciclo SDD para la siguiente especificación.

Si el merge no se ha completado, existen conflictos, faltan permisos o las validaciones fallan, detener el avance e informar del problema.

No crear anticipadamente una rama dependiente ni declarar que la secuencia ha avanzado cuando no se cumplen las condiciones anteriores.

