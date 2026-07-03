# Arcanum Coffee — Web

Frontend del proyecto Arcanum Coffee construido con Next.js 14.

## Requisitos previos

- Node.js 18+
- npm o pnpm
- API corriendo en `http://localhost:8000`

## Instalación y ejecución

1. **Clonar el repositorio**
   ```bash
   git clone <repo-url>
   cd arcanum-coffee/web
   ```

2. **Instalar dependencias**
   ```bash
   npm install
   ```

3. **Configurar variables de entorno**
   ```bash
   cp .env.local.example .env.local
   # Editar .env.local si el API corre en un puerto diferente
   ```

4. **Iniciar en modo desarrollo**
   ```bash
   npm run dev
   ```

5. **Abrir en el navegador**
   ```
   http://localhost:3000
   ```

## Rutas principales

| Ruta | Descripción |
|------|-------------|
| `/` | Landing Page pública de Arcanum Coffee |
| `/admin` | Dashboard de administración con métricas |
| `/admin/contactos` | Gestión de contactos (CRUD) |
| `/admin/clientes` | Gestión de clientes (CRUD) |
| `/admin/usuarios` | Gestión de usuarios (CRUD) |

## Build para producción

```bash
npm run build
npm start
```
