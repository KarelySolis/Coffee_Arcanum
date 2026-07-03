# Feature: Control de Acceso y Roles del Administrador (Admin & Cajero)

El objetivo principal de esta característica es mostrar una ventana (modal) para el control de acceso al dashboard de administración y limitar las acciones según el rol del usuario autenticado.

## Especificaciones de la Ventana de Login

- **Captura de Credenciales**:
  - Un cuadro de texto para capturar el **Usuario**.
  - Un cuadro de texto para capturar la **Contraseña**.
    - La contraseña se tiene que mostrar oculta con asteriscos por defecto.
    - Se debe incluir un icono interactivo que, al presionarse, alterne la visibilidad mostrando la contraseña en texto plano.

- **Botón de Cancelar**:
  - Al hacer clic, se cierra la ventana de login y se redirige automáticamente al usuario a la página de inicio principal (Landing Page `/`).

- **Botón de Ingresar**:
  - Al hacer clic, se debe validar primero que ambos campos (usuario y contraseña) hayan sido capturados.
  - Se debe validar contra la base de datos que la combinación de usuario y contraseña sea correcta:
    - La contraseña ingresada debe ser comparada de forma segura utilizando la encriptación/verificación correspondiente (`bcrypt`) contra la contraseña almacenada en la base de datos.
  - Si el usuario es válido, se le permite ingresar al dashboard de administración (`/admin`).
  - Si el usuario no es válido, se debe mostrar una alerta clara indicando que no es un usuario válido.

## Validación de Roles en el Dashboard

Al cargarse el panel de administración, se debe verificar el tipo de usuario (rol):

- **Rol Admin (Administrador)**:
  - Puede ver todos los catálogos disponibles (Contactos, Newsletter, Usuarios, etc.).
  - Tiene acceso total para agregar, editar y eliminar registros en cada uno de ellos.

- **Rol Cajero (Cashier)**:
  - Solo puede ver los catálogos disponibles.
  - Solo se le permite agregar nuevos registros en ellos (los botones de creación o suscripción permanecen visibles).
  - El resto de las opciones de modificación (los botones de **Editar** y **Eliminar**, así como su columna respectiva de Acciones) no deben estar visibles ni ser accesibles para él.
