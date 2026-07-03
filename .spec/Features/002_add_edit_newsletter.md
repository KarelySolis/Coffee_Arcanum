# Feature: Edición de Suscripciones en el Catálogo de Newsletter

El objetivo de esta característica es agregar la opción de **Editar** suscripciones en el catálogo de Newsletter (`/admin/newsletter`). Esta acción debe estar estrictamente restringida a usuarios con rol `Admin` (los usuarios `Cajero` no deben ver el botón ni poder guardar los cambios) y debe impactar de forma persistente en la base de datos a través de una nueva API de actualización en el backend.

---

## 🛠️ Cambios Requeridos en el Backend (API Python)

### 1. DTO de Actualización
- **Archivo:** `api/src/application/dtos/newsletter_dto.py`
- **Cambio:** Crear la clase `NewsletterUpdateDTO` heredando de `BaseModel` con el campo `Email: EmailStr`.
- **Archivo:** `api/src/application/dtos/__init__.py`
- **Cambio:** Exportar la nueva clase `NewsletterUpdateDTO`.

### 2. Interfaz y Repositorio de Dominio
- **Archivo:** `api/src/domain/repositories/newsletter_repository.py`
- **Cambio:** Declarar el método abstracto `update` en la interfaz `INewsletterRepository`:
  ```python
  @abstractmethod
  async def update(self, newsletter: Newsletter) -> Newsletter:
      pass
  ```

### 3. Implementación del Repositorio
- **Archivo:** `api/src/infrastructure/repositories/newsletter_repository_impl.py`
- **Cambio:** Implementar el método `update` en `NewsletterRepositoryImpl` para actualizar el modelo en la base de datos:
  ```python
  async def update(self, newsletter: Newsletter) -> Newsletter:
      model = await self._session.get(NewsletterModel, newsletter.NewsletterId)
      if model:
          model.Email = newsletter.Email
          await self._session.flush()
          await self._session.refresh(model)
      return self._to_entity(model)
  ```

### 4. Servicio de Aplicación
- **Archivo:** `api/src/application/services/newsletter_service.py`
- **Cambio:** Agregar el método `update` a `NewsletterService`:
  ```python
  async def update(self, id: int, dto: NewsletterUpdateDTO) -> NewsletterResponseDTO:
      existing = await self._repo.get_by_id(id)
      if not existing:
          raise NotFoundError("Newsletter", id)
      entity = Newsletter(NewsletterId=id, Email=dto.Email)
      updated = await self._repo.update(entity)
      return NewsletterResponseDTO.model_validate(updated.__dict__)
  ```

### 5. Controlador / Endpoint de la API
- **Archivo:** `api/src/presentation/routers/newsletter.py`
- **Cambio:** Agregar un endpoint PUT `/newsletter/{id}` para procesar la actualización:
  ```python
  @router.put("/{id}")
  async def update_newsletter(id: int, dto: NewsletterUpdateDTO, service: NewsletterService = Depends(get_service)):
      try:
          item = await service.update(id, dto)
          return success_response(item)
      except NotFoundError as e:
          return error_response("NOT_FOUND", str(e), status.HTTP_404_NOT_FOUND)
  ```

---

## 🎨 Cambios Requeridos en el Frontend (Web Next.js)

### 1. Formulario de Edición (`NewsletterForm.tsx`)
- **Archivo:** `web/src/app/admin/newsletter/_components/NewsletterForm.tsx`
- **Cambios:**
  - Agregar la propiedad opcional `initial?: Newsletter | null` en la interfaz `Props`.
  - Inicializar el estado `form` cargando el valor de `initial.Email` si existe, o un string vacío por defecto.
  - Ajustar el título del modal: mostrar `"Editar Suscripción"` si hay un registro en edición, o `"Suscribir a Newsletter"` en caso de creación.
  - Ajustar el botón de envío: mostrar `"Guardar Cambios"` si se edita, o `"Suscribir"` si se crea.

### 2. Tabla de Newsletter (`NewsletterTable.tsx`)
- **Archivo:** `web/src/app/admin/newsletter/_components/NewsletterTable.tsx`
- **Cambios:**
  - Agregar un estado `editing` para controlar el registro en edición: `const [editing, setEditing] = useState<Newsletter | null>(null);`.
  - En la sección del render, si el rol del usuario no es `Cajero` (`userRole !== "Cajero"`), renderizar un botón de **Editar** al lado del botón de **Eliminar** en la columna de Acciones.
  - Al presionar **Editar**, establecer el estado `editing` con el registro actual y abrir el formulario (`setFormOpen(true)`).
  - Modificar la función `handleSave` para que valide el rol del usuario y determine si debe llamar al endpoint PUT o POST:
    ```typescript
    const handleSave = async (values: NewsletterCreate) => {
      if (editing) {
        if (userRole === "Cajero") {
          alert("No tienes permisos para editar registros.");
          return;
        }
        await api.put(`/api/v1/newsletter/${editing.NewsletterId}`, values);
      } else {
        await api.post("/api/v1/newsletter/", values);
      }
      setFormOpen(false);
      setEditing(null);
      await fetchPage(page);
      router.refresh();
    };
    ```
  - Pasar la propiedad `initial={editing}` y reestablecerla en `onClose` del formulario `NewsletterForm`.

---

## ✅ Criterios de Aceptación
1. Un usuario autenticado como `Admin` debe poder presionar el botón de editar en una suscripción de Newsletter, cambiar el correo en el formulario, y ver reflejado el cambio de forma permanente tras refrescar la página.
2. Un usuario autenticado como `Cajero` no debe ver el botón de editar en la tabla del catálogo de Newsletter.
3. Si un usuario `Cajero` intenta invocar programáticamente la edición de un registro en la tabla, el cliente de frontend debe interceptar la acción, mostrar una alerta indicando que no tiene permisos y abortar la operación.