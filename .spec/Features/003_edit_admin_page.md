# Feature: Rediseño Estético del Dashboard de Administración (Estilo Landing Page)

El objetivo de esta característica es rediseñar completamente la interfaz visual del Dashboard de Administración (`/admin` y sus catálogos) para alinearlo estéticamente con la Landing Page principal. Se debe reemplazar el tema oscuro actual (gris/piedra y ámbar) por el tema cálido, elegante y con temática de café (beige, marrón café, tipografía con serifas y sombras suaves).

---

## 🎨 Sistema de Diseño y Paleta de Colores (Basado en Landing Page)
Para lograr la coherencia de marca, se deben utilizar los siguientes tokens de color y estilos de la Landing Page:

- **Fondo Principal:** `#fdfaf5` (Beige claro / color crema) en lugar de `bg-stone-950`.
- **Texto Principal:** `#3a2a1a` (Marrón café oscuro) en lugar de `text-stone-100` o `text-white`.
- **Color de Acento / Marca:** `#8c5a3c` (Marrón café cálido) en lugar de `text-amber-400` o `bg-amber-500`.
- **Texto Muted / Secundario:** `#5c4a3a` (Marrón medio) en lugar de `text-stone-400` / `text-stone-500`.
- **Bordes y Divisores:** `#3a2a1a/10` o `#8c5a3c/20` en lugar de `border-stone-800`.
- **Tarjetas y Contenedores:** Fondo blanco puro (`bg-white`) con bordes sutiles y sombras suaves (`shadow-sm` o `shadow-md`).
- **Tipografía:** Encabezados principales con `font-serif` y texto normal con estilos estilizados.

---

## 🛠️ Archivos y Componentes a Modificar

### 1. Layout Principal del Admin (`web/src/app/admin/layout.tsx`)
- **Cambio:** Modificar el contenedor principal y el estado de carga (`Verificando acceso...`).
- **Estilos:** Cambiar `bg-stone-950` a `bg-[#fdfaf5]`, y `text-stone-100`/`text-stone-400` a `text-[#3a2a1a]` y `text-[#5c4a3a]`.

### 2. Barra Lateral (`web/src/components/admin/Sidebar.tsx`)
- **Fondo:** Cambiar de `bg-stone-900` a una variante ligeramente más oscura del crema como `bg-[#f5ebd6]` o directamente `#fdfaf5` con un borde divisorio derecho de `#3a2a1a/10`.
- **Enlaces (Links):**
  - **Inactivos:** Cambiar `text-stone-400 hover:bg-stone-800` a `text-[#5c4a3a] hover:bg-[#3a2a1a]/5 hover:text-[#3a2a1a]`.
  - **Activos:** Cambiar `bg-amber-500/15 text-amber-400` a una combinación cálida como `bg-[#8c5a3c]/10 text-[#8c5a3c] font-semibold`.
- **Badge del Usuario Conectado:** Reemplazar el contenedor oscuro por uno con fondo blanco, bordes finos de café y textos acordes.
- **Logotipo y Título:** Usar la fuente `font-serif` para el texto `☕ Arcanum` en color `#8c5a3c`.

### 3. Página de Inicio del Admin y Métricas (`web/src/app/admin/page.tsx` & `MetricCard.tsx`)
- **Títulos:** Usar `font-serif` para el título "Dashboard" en color `#8c5a3c`.
- **MetricCard (`web/src/components/admin/MetricCard.tsx`):**
  - Cambiar el fondo de `bg-stone-900 border-stone-800` a `bg-white border border-[#8c5a3c]/15 shadow-md rounded-xl`.
  - Los textos interiores deben cambiar a `#3a2a1a` (números) y `#5c4a3a` (etiquetas).
  - El icono decorativo puede tener un fondo sutil en tono crema (`bg-[#fdfaf5]`).

### 4. Tablas de Catálogos (Contactos, Newsletter, Usuarios)
- **Archivos:** `ContactoTable.tsx`, `NewsletterTable.tsx`, `UsuarioTable.tsx`
- **Cambios en Tablas:**
  - Cambiar el contenedor general de la tabla a fondo blanco `bg-white` con borde `#3a2a1a/10` y sombra sutil.
  - La fila del encabezado (`<thead>`) debe pasar a color de texto `#8c5a3c` con borde inferior `#3a2a1a/10`.
  - Las celdas de las filas (`<td>`) deben tener texto en `#3a2a1a` (primarios) y `#5c4a3a` (secundarios).
  - El efecto hover en las filas debe ser una transición suave a `hover:bg-[#3a2a1a]/2`.
- **Botones:**
  - El botón `+ Nuevo` / `+ Suscribir` debe usar `bg-[#8c5a3c] hover:bg-[#7a4e34] text-[#fdfaf5]` (colores de la Landing).
  - Los botones de "Editar" (dentro de la tabla) deben ser de estilo outline o gris cálido (`border border-[#3a2a1a]/20 text-[#3a2a1a] hover:bg-[#3a2a1a]/5`).
  - Los botones de "Eliminar" deben usar un rojo suave con texto claro para no desentonar con la paleta cálida.

### 5. Formularios y Ventanas Modales
- **Archivos:** `ContactoForm.tsx`, `NewsletterForm.tsx`, `UsuarioForm.tsx`
- **Cambios:**
  - El fondo de la ventana modal debe ser `bg-[#fdfaf5]` con bordes `#8c5a3c/20`.
  - Las etiquetas de los campos (`<label>`) deben ser de color `#8c5a3c` con estilo en mayúsculas pequeñas.
  - Los campos de entrada (`<input>`, `<select>`, `<textarea>`) deben tener fondo transparente/blanco, borde `#3a2a1a/20` y al enfocarse (`focus`) cambiar el borde a `#8c5a3c` con un anillo sutil de su mismo color.
  - Los botones de acción dentro del formulario deben lucir exactamente igual a los botones del LoginModal (Cancelar con borde sutil, Guardar con fondo `#8c5a3c`).

### 6. Componentes Genéricos (`Pagination.tsx` & `ConfirmDialog.tsx`)
- **Paginación (`Pagination.tsx`):**
  - Cambiar los botones activos/inactivos para que utilicen la paleta café/crema.
- **Cuadro de Confirmación (`ConfirmDialog.tsx`):**
  - Rediseñar el modal con el fondo `#fdfaf5`, textos en `#3a2a1a` y botones alineados al nuevo tema visual.

---

## ✅ Criterios de Aceptación
1. Toda la interfaz del panel de administración `/admin` debe poseer un fondo claro y cálido en lugar de negro/oscuro.
2. La legibilidad de los textos y tablas debe mantenerse impecable utilizando contrastes adecuados de marrones café sobre beige.
3. No debe quedar ningún residuo del color ámbar (`amber-500`) ni de grises oscuros (`bg-stone-900`, `bg-stone-950`).
4. Todas las transiciones, bordes de inputs y modales deben lucir suaves, consistentes y premium, emulando la estética de la Landing Page.