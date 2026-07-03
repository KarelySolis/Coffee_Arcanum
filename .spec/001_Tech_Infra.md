Crea un monorepo llamado "Arcanum Coffee" con dos proyectos separados: una API RESTful
en Python y una UI web. La estructura raíz debe verse así:

arcanum-coffee/
├── api/        ← Backend FastAPI
└── web/        ← Frontend Next.js

---

## PROYECTO 1 — API RESTful (`api/`)

### Principios RESTful obligatorios
- **Recursos como sustantivos**: las URLs representan recursos, nunca acciones
  (✅ /api/v1/contactos  ❌ /api/v1/getContactos)
- **Uso correcto de verbos HTTP**:
  - GET    → leer (sin efectos secundarios, idempotente)
  - POST   → crear un nuevo recurso
  - PUT    → reemplazar un recurso completo (idempotente)
  - PATCH  → actualizar campos parciales de un recurso
  - DELETE → eliminar un recurso (idempotente)
- **Stateless**: cada request debe contener toda la información necesaria;
  el servidor no guarda estado de sesión entre requests
- **Códigos de respuesta HTTP semánticos**:
  - 200 OK             → GET o PUT exitoso
  - 201 Created        → POST exitoso (incluir header Location con URL del nuevo recurso)
  - 204 No Content     → DELETE exitoso
  - 400 Bad Request    → datos de entrada inválidos
  - 404 Not Found      → recurso no encontrado
  - 409 Conflict       → conflicto (ej. email duplicado)
  - 422 Unprocessable  → error de validación Pydantic
  - 500 Internal Error → error inesperado del servidor
- **Representación uniforme**: todas las respuestas en JSON con estructura consistente
- **Versionado en la URL**: prefijo `/api/v1/` en todos los endpoints
- **HATEOAS básico**: las respuestas de colecciones incluyen metadatos de paginación
  (total, page, page_size, next, previous)
- **Filtrado, ordenamiento y paginación** via query params:
  `GET /api/v1/contactos?page=1&page_size=10&order_by=Nombre&order=asc`

### Estructura de respuesta JSON estandarizada

Respuesta exitosa de un recurso:
{
  "data": { ...recurso },
  "message": "Operación exitosa"
}

Respuesta exitosa de colección:
{
  "data": [ ...recursos ],
  "meta": {
    "total": 100,
    "page": 1,
    "page_size": 10,
    "next": "/api/v1/contactos?page=2&page_size=10",
    "previous": null
  }
}

Respuesta de error:
{
  "error": {
    "code": "NOT_FOUND",
    "message": "Contacto con id 5 no encontrado",
    "details": []
  }
}

### Stack tecnológico
- FastAPI como framework web
- SQLAlchemy 2.x como ORM (estilo declarativo moderno)
- asyncpg como driver asíncrono para PostgreSQL
- psycopg2-binary como driver síncrono (usado por Alembic)
- Pydantic v2 para validación de schemas
- Swagger/OpenAPI habilitado (integrado en FastAPI)
- Alembic para migraciones de base de datos

### Entidades del dominio

**Contacto**
- ContactoId (int, PK, autoincrement)
- Nombre (str, requerido)
- Email (str, requerido)
- Mensaje (str, requerido)
- Clientes: relación uno a muchos con Cliente

**Cliente**
- ClienteId (int, PK, autoincrement)
- Nombre (str, requerido)
- Email (str, requerido)
- ContactoId (int, FK → Contacto.ContactoId, ON DELETE CASCADE)

**Usuario**
- UsuarioId (int, PK, autoincrement)
- NombreUsuario (str, requerido, único)
- Contrasena (str, requerido, almacenada hasheada con bcrypt)
- TipoUsuario (enum de PostgreSQL: "Admin" | "Cajero")

### Relaciones
- Contacto → Cliente: uno a muchos

### Seed de datos iniciales
Crear un script `seed.py` en la raíz de `api/` que inserte los siguientes usuarios
al ejecutarse. Las contraseñas deben hashearse con bcrypt antes de insertar:

| NombreUsuario | Contrasena      | TipoUsuario |
|---------------|-----------------|-------------|
| Kareli        | DiasBuenos123   | Admin       |
| Grecia        | 12345           | Cajero      |

El script debe ser idempotente: si el usuario ya existe (por NombreUsuario), no insertar duplicado.

### Arquitectura en capas tipo Onion
1. **Domain** (`src/domain/`): entidades puras, interfaces de repositorios (ABCs), excepciones de dominio
2. **Application** (`src/application/`): casos de uso / servicios, DTOs, lógica de negocio
3. **Infrastructure** (`src/infrastructure/`): implementaciones de repositorios con SQLAlchemy, modelos ORM, configuración de BD
4. **Presentation** (`src/presentation/`): routers de FastAPI, schemas Pydantic para request/response

### Estructura de carpetas del API
api/
├── src/
│   ├── domain/
│   │   ├── entities/
│   │   ├── repositories/   # interfaces ABCs
│   │   └── exceptions/
│   ├── application/
│   │   ├── dtos/
│   │   └── services/
│   ├── infrastructure/
│   │   ├── database/       # engine, sesión async, base declarativa
│   │   ├── models/         # modelos ORM SQLAlchemy
│   │   └── repositories/   # implementaciones concretas
│   └── presentation/
│       └── routers/
├── alembic/
│   ├── versions/
│   └── env.py
├── alembic.ini
├── seed.py
├── main.py
├── .env.example
├── requirements.txt
└── README.md

### Configuración de base de datos PostgreSQL
Nombre de la base de datos: `arcanumcoffee`

**Driver asíncrono** (runtime FastAPI):
DATABASE_URL=postgresql+asyncpg://usuario:contraseña@localhost:5432/arcanumcoffee

**Driver síncrono** (Alembic migraciones):
ALEMBIC_DATABASE_URL=postgresql+psycopg2://usuario:contraseña@localhost:5432/arcanumcoffee

El archivo `alembic/env.py` debe apuntar a la base declarativa de SQLAlchemy para
detectar modelos automáticamente (autogenerate).

El enum `TipoUsuario` se crea como tipo nativo de PostgreSQL:
`sa.Enum('Admin', 'Cajero', name='tipo_usuario')`

### Endpoints RESTful CRUD

**Contactos** → `/api/v1/contactos`
- GET    /                               → listar (paginado, filtrable, ordenable)
- GET    /{id}                           → obtener por ID
- POST   /                               → crear → 201 + Location header
- PUT    /{id}                           → reemplazar completo → 200
- PATCH  /{id}                           → actualizar parcial → 200
- DELETE /{id}                           → eliminar → 204

**Clientes** → `/api/v1/clientes`
- GET    /                               → listar (paginado, filtrable, ordenable)
- GET    /{id}                           → obtener por ID
- GET    /contacto/{contactoId}/clientes → listar clientes de un contacto
- POST   /                               → crear (requiere ContactoId válido) → 201 + Location
- PUT    /{id}                           → reemplazar completo → 200
- PATCH  /{id}                           → actualizar parcial → 200
- DELETE /{id}                           → eliminar → 204

**Usuarios** → `/api/v1/usuarios`
- GET    /                               → listar (paginado, filtrable, ordenable)
- GET    /{id}                           → obtener por ID
- POST   /                               → crear (hashear contraseña) → 201 + Location
- PUT    /{id}                           → reemplazar completo → 200
- PATCH  /{id}                           → actualizar parcial → 200
- DELETE /{id}                           → eliminar → 204

### Requisitos adicionales del API
- Swagger UI en `/docs`, ReDoc en `/redoc`
- Inyección de dependencias con `Depends` de FastAPI para la sesión `AsyncSession`
- El campo `Contrasena` nunca debe aparecer en ninguna respuesta
- CORS habilitado para permitir peticiones desde el frontend
- Middleware de logging: método HTTP, ruta y código de respuesta por cada request
- Todos los repositorios deben ser `async/await` con `AsyncSession`

### README del API (`api/README.md`)
El README debe incluir:
- Descripción general: "API RESTful del proyecto Arcanum Coffee construida con FastAPI y PostgreSQL"
- Requisitos previos: Python 3.11+, PostgreSQL 15+, pip
- Pasos de instalación:
  1. Clonar el repositorio
  2. Crear y activar entorno virtual (`python -m venv venv`)
  3. Instalar dependencias (`pip install -r requirements.txt`)
  4. Copiar `.env.example` a `.env` y configurar las variables
  5. Crear la base de datos `arcanumcoffee` en PostgreSQL
  6. Ejecutar migraciones (`alembic upgrade head`)
  7. Ejecutar el seed (`python seed.py`)
  8. Iniciar el servidor (`uvicorn main:app --reload`)
- URLs importantes: `/docs`, `/redoc`, `/api/v1/`

---

## PROYECTO 2 — UI (`web/`)

### Stack tecnológico
- Next.js 14+ con App Router y TypeScript
- TailwindCSS para estilos
- shadcn/ui como librería de componentes
- Axios para llamadas HTTP al API (en Client Components)
- next/navigation para navegación programática

### Decisiones de arquitectura Next.js
- Usar **App Router** (`src/app/`) con la convención de carpetas de Next.js 14
- Las páginas de listado son **Server Components** (fetch en servidor)
- Los formularios y modales son **Client Components** (`"use client"`)
- Las llamadas al API desde el servidor usan fetch nativo con `cache: 'no-store'`
- Las llamadas al API desde el cliente usan Axios
- `API_URL` → variable de entorno solo disponible en servidor
- `NEXT_PUBLIC_API_URL` → variable de entorno disponible en el browser

### Páginas y rutas

**Landing Page** → `/`
Página pública moderna que presenta la marca Arcanum Coffee. Debe incluir:
- **Header fijo** con el logo/nombre "Arcanum Coffee" y un menú de navegación con los links:
  - Inicio (ancla a hero)
  - Nosotros (ancla a sección about)
  - Menú (ancla a sección de productos/menú)
  - **Contacto** → abre un formulario de captura de datos del cliente
    (Nombre, Email, Mensaje) que hace POST a `/api/v1/contactos`.
    Este ítem del menú debe estar visualmente destacado (botón o color diferente).
- **Sección Hero**: imagen de fondo de cafetería, tagline de la marca, CTA principal
- **Sección About / Nosotros**: historia y valores de Arcanum Coffee
- **Sección Menú**: tarjetas con productos destacados de la cafetería
- **Sección Contacto**: formulario de captura embebido en la página además del acceso desde el header
- **Footer**: redes sociales, dirección, copyright "© 2024 Arcanum Coffee"
- Diseño oscuro/elegante acorde a una marca de cafetería premium (colores café, dorado, crema)

**Dashboard Admin** → `/admin`
Panel de administración protegido para gestionar los catálogos. Debe incluir:
- Layout con sidebar de navegación que contenga links a:
  - Dashboard (resumen / métricas básicas: total contactos, total clientes, total usuarios)
  - Contactos
  - Clientes
- Cada sección del catálogo (Contactos, Clientes) expone la tabla CRUD completa:
  - Tabla paginada con todos los registros
  - Botones Editar y Eliminar por fila
  - Botón "Nuevo" para abrir el formulario de creación
  - Modal para Crear / Editar con validación
  - Diálogo de confirmación antes de eliminar
- Ruta de Contactos del admin: `/admin/contactos`
- Ruta de Clientes del admin: `/admin/clientes`
- El dashboard principal `/admin` muestra tarjetas de métricas con los totales

**Gestión de Usuarios** → `/admin/usuarios`
- Listado de usuarios con tabla paginada
- Formulario de creación/edición en modal
- El campo Contraseña usa `<input type="password">` y no se pre-rellena al editar
- El selector TipoUsuario muestra las opciones Admin y Cajero con Select de shadcn/ui

### Estructura de carpetas del UI
web/
├── src/
│   ├── app/
│   │   ├── layout.tsx                   # layout raíz
│   │   ├── page.tsx                     # Landing Page (/)
│   │   └── admin/
│   │       ├── layout.tsx               # layout del dashboard con sidebar
│   │       ├── page.tsx                 # /admin → métricas y resumen
│   │       ├── contactos/
│   │       │   ├── page.tsx             # listado (Server Component)
│   │       │   └── _components/
│   │       │       ├── ContactoForm.tsx     # "use client"
│   │       │       └── ContactoTable.tsx    # "use client"
│   │       ├── clientes/
│   │       │   ├── page.tsx
│   │       │   └── _components/
│   │       │       ├── ClienteForm.tsx
│   │       │       └── ClienteTable.tsx
│   │       └── usuarios/
│   │           ├── page.tsx
│   │           └── _components/
│   │               ├── UsuarioForm.tsx
│   │               └── UsuarioTable.tsx
│   ├── components/
│   │   ├── ui/                          # componentes shadcn/ui
│   │   ├── landing/                     # componentes exclusivos de la Landing Page
│   │   │   ├── Header.tsx               # "use client" — menú con formulario de contacto
│   │   │   ├── Hero.tsx
│   │   │   ├── About.tsx
│   │   │   ├── Menu.tsx
│   │   │   ├── ContactoSection.tsx      # "use client" — formulario de captura
│   │   │   └── Footer.tsx
│   │   ├── admin/                       # componentes exclusivos del dashboard
│   │   │   ├── Sidebar.tsx
│   │   │   ├── MetricCard.tsx
│   │   │   └── AdminHeader.tsx
│   │   ├── DataTable.tsx
│   │   ├── ConfirmDialog.tsx
│   │   └── Pagination.tsx
│   ├── lib/
│   │   ├── api/                         # funciones fetch server-side por entidad
│   │   │   ├── contactos.ts
│   │   │   ├── clientes.ts
│   │   │   └── usuarios.ts
│   │   └── axios.ts                     # instancia Axios configurada (client-side)
│   └── types/
│       ├── contacto.ts
│       ├── cliente.ts
│       ├── usuario.ts
│       └── api.ts                       # ApiResponse<T>, PaginatedResponse<T>, ApiError
├── .env.local.example
├── next.config.ts
├── tailwind.config.ts
├── package.json
└── README.md

### Requisitos adicionales del UI
- La Landing Page debe ser completamente responsive (mobile, tablet, desktop)
- El formulario de captura del header (menú "Contacto") puede ser un Sheet o Dialog de shadcn/ui
- El formulario de captura envía datos a `/api/v1/contactos` y muestra mensaje de éxito/error
- La paginación de las tablas del admin usa los metadatos `meta` del API
- El tipo `PaginatedResponse<T>` modela exactamente `{ data: T[], meta: {...} }`

### README del UI (`web/README.md`)
El README debe incluir:
- Descripción general: "Frontend del proyecto Arcanum Coffee construido con Next.js 14"
- Requisitos previos: Node.js 18+, npm o pnpm, API corriendo en localhost:8000
- Pasos de instalación:
  1. Clonar el repositorio
  2. Instalar dependencias (`npm install`)
  3. Copiar `.env.local.example` a `.env.local` y configurar `NEXT_PUBLIC_API_URL`
  4. Iniciar en desarrollo (`npm run dev`)
  5. Abrir `http://localhost:3000`
- Rutas principales:
  - `/` → Landing Page pública de Arcanum Coffee
  - `/admin` → Dashboard de administración
  - `/admin/contactos` → Gestión de contactos
  - `/admin/clientes` → Gestión de clientes
  - `/admin/usuarios` → Gestión de usuarios

---

Genera todos los archivos necesarios con código completo y funcional para ambos proyectos.