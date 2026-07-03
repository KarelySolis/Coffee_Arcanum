# Feature: Modificación de Opciones en el Header del Landing Page

El objetivo de esta tarea es reestructurar los elementos de navegación en el menú del Header de la página de inicio (Landing Page) para adecuar el acceso público y mejorar la navegación de los usuarios a la sección de Newsletter.

---

## 🛠️ Cambios Requeridos en el Frontend (Web Next.js)

### 1. Modificar el Componente del Header
- **Archivo:** `web/src/components/landing/Header.tsx`
- **Cambios:**
  - **Eliminar el botón "Admin"**:
    - Quitar de la navegación de escritorio (línea 55 aprox.):
      ```typescript
      <button onClick={() => setLoginOpen(true)} className="hover:text-[#fdfaf5] transition-colors">Admin</button>
      ```
    - Quitar de la navegación del menú móvil (línea 78 aprox.):
      ```typescript
      <button onClick={() => { setLoginOpen(true); setMenuOpen(false); }} className="text-left hover:text-[#fdfaf5]">Admin</button>
      ```
    - **Nota:** Se debe conservar el componente `<LoginModal isOpen={loginOpen} onClose={() => setLoginOpen(false)} />` al final del componente, así como el `useEffect` que activa `setLoginOpen(true)` si se detecta el parámetro de consulta `?login=true` en la URL. Esto permite a los administradores e iniciar sesión accediendo a `http://localhost:3000/?login=true`.
  
  - **Agregar el botón "Noticias"**:
    - Agregar en la navegación de escritorio (en lugar del botón de Admin):
      ```typescript
      <button onClick={() => scrollTo("newsletter")} className="hover:text-[#fdfaf5] transition-colors">Noticias</button>
      ```
    - Agregar en el menú móvil (en lugar del botón de Admin):
      ```typescript
      <button onClick={() => { scrollTo("newsletter"); }} className="text-left hover:text-[#fdfaf5]">Noticias</button>
      ```
    - **Nota:** La función `scrollTo("newsletter")` utilizará el scroll suave nativo ya implementado para dirigirse a la sección `<section id="newsletter" ...>` del componente `Newsletter.tsx` ubicado en la página principal.

---

## ✅ Criterios de Aceptación
1. El botón de **Admin** no debe ser visible ni en el menú de escritorio ni en el menú móvil de la Landing Page.
2. Un nuevo botón llamado **Noticias** debe mostrarse en la navegación de escritorio y en el menú móvil.
3. Al presionar el botón **Noticias**, la página debe hacer scroll suave hacia la sección del Newsletter (club de café).
4. El acceso de administrador oculto mediante la URL `/?login=true` debe seguir funcionando correctamente y mostrar la ventana modal de inicio de sesión (`LoginModal`).