import pypandoc

content = r"""# NovaShop

**NovaShop** es una tienda virtual desarrollada como proyecto de software mediante **Spec-Driven Development (SDD)**. El proyecto organiza el desarrollo en especificaciones pequeñas, verificables y versionadas, de modo que los requisitos y la implementación mantengan trazabilidad.

## Funcionalidades

- **Consulta del catálogo:** visualización de los productos disponibles.
- **Gestión del carrito:** incorporación de productos, modificación de cantidades y consulta de subtotales y total.
- **Pedido por WhatsApp:** preparación de un mensaje con el detalle del carrito para continuar la solicitud mediante WhatsApp. La preparación o apertura del mensaje no implica que el pedido esté confirmado.

> El alcance y el estado de cada funcionalidad deben verificarse en las especificaciones del repositorio. Algunas validaciones manuales pueden continuar pendientes.

## Tecnologías

- **HTML** para la estructura de la aplicación.
- **CSS** para los estilos y el diseño adaptable.
- **JavaScript** para la lógica del catálogo, el carrito y el pedido.
- **Vite** para el servidor de desarrollo y la compilación.
- **npm** para gestionar las dependencias.

NovaShop utiliza actualmente una arquitectura web ligera con `index.html` como entrada principal. No requiere React ni una base de datos para su estructura actual.

## Requisitos previos

- Node.js compatible con la versión de Vite instalada.
- npm, incluido con Node.js.
- Git para trabajar con el repositorio y sus ramas.

## Instalación y ejecución local

Clona el repositorio y entra en su directorio:

```bash
git clone <URL-DEL-REPOSITORIO>
cd NovaShop
```

Instala las dependencias:

```bash
npm ci
```

Inicia el servidor de desarrollo:

```bash
npm run dev
```

Vite mostrará en la terminal la dirección local que debes abrir en el navegador.

### Compilación y vista previa

Genera la compilación de producción:

```bash
npm run build
```

Para probar localmente esa compilación:

```bash
npm run preview
```

Los archivos generados se guardan en `dist/`. La carpeta `node_modules/` y los artefactos generados no deben versionarse si están cubiertos por `.gitignore`.

## Estructura principal

```text
NovaShop/
├── index.html
├── package.json
├── package-lock.json
├── src/
│   ├── app.js
│   ├── styles.css
│   └── data/
│       └── catalogo.js
├── specs/
│   └── ...
├── tests/
│   └── manual/
└── AGENTS.md
```

- `index.html`: punto de entrada de la aplicación.
- `src/app.js`: lógica e interacción de la interfaz.
- `src/styles.css`: estilos.
- `src/data/catalogo.js`: datos del catálogo.
- `specs/`: especificaciones, planes y tareas generados para el desarrollo SDD.
- `tests/manual/`: registros y guías de pruebas manuales.
- `AGENTS.md`: convenciones técnicas e instrucciones para los agentes de desarrollo.

## Enfoque de desarrollo: SDD

El trabajo se organiza por funcionalidades, siguiendo las fases disponibles de GitHub Spec Kit:

1. **Specify:** definir requisitos y criterios de aceptación.
2. **Clarify:** resolver ambigüedades relevantes.
3. **Plan:** documentar la solución técnica.
4. **Tasks:** dividir el trabajo en tareas verificables.
5. **Analyze:** revisar inconsistencias, cuando esté disponible.
6. **Implement:** desarrollar lo aprobado.
7. **Verify:** ejecutar pruebas y comprobar criterios de aceptación.
8. **Converge:** revisar la correspondencia entre especificaciones e implementación, cuando esté disponible.

Las reglas de producto se encuentran en `.specify/memory/constitution.md`. Consulta las especificaciones del directorio `specs/` para conocer los requisitos y el estado concreto de cada funcionalidad.

## Convenciones de ramas

Las ramas de funcionalidades utilizan el formato `feature/<id>-<nombre-corto>`. La secuencia definida para NovaShop es:

- `feature/001-consulta-catalogo`
- `feature/002-gestion-carrito`
- `feature/003-pedido-whatsapp`

Las funcionalidades posteriores dependen de las anteriores. Antes de integrar cambios, se deben revisar el estado de Git, las pruebas pertinentes y los cambios incluidos. No se deben descartar cambios existentes ni realizar operaciones destructivas sin autorización.

## Pruebas y estado

Actualmente están disponibles los comandos `npm run build`, `npm run dev` y `npm run preview`. El repositorio no define necesariamente un comando de pruebas automatizadas; revisa la documentación de cada funcionalidad para conocer sus verificaciones manuales y pendientes.

No debe considerarse una funcionalidad completamente validada solo porque la compilación termine correctamente: también hay que comprobar los criterios de aceptación y los comportamientos pertinentes en el navegador.

## Contribuciones

Antes de modificar el proyecto:

1. Lee `AGENTS.md`, la constitución y la especificación correspondiente.
2. Confirma que estás en la rama adecuada.
3. Realiza cambios mínimos y trazables.
4. Ejecuta las verificaciones pertinentes y registra sus resultados.
5. Actualiza la documentación afectada.

---

Proyecto desarrollado con un enfoque académico y práctico de ingeniería de software, con énfasis en la trazabilidad entre requisitos, tareas e implementación.
"""

output_path = "/mnt/data/README.md"
pypandoc.convert_text(content, "md", format="md", outputfile=output_path, extra_args=["--standalone"])
print(f"Archivo creado: {output_path}")
