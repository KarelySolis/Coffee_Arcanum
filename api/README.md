# Arcanum Coffee — API

API RESTful del proyecto Arcanum Coffee construida con FastAPI y PostgreSQL.

## Requisitos previos

- Python 3.11+
- PostgreSQL 15+
- pip

## Instalación y ejecución

1. **Clonar el repositorio**
   ```bash
   git clone <repo-url>
   cd arcanum-coffee/api
   ```

2. **Crear y activar entorno virtual**
   ```bash
   python -m venv venv
   # Windows
   venv\Scripts\activate
   # macOS/Linux
   source venv/bin/activate
   ```

3. **Instalar dependencias**
   ```bash
   pip install -r requirements.txt
   ```

4. **Configurar variables de entorno**
   ```bash
   cp .env.example .env
   # Editar .env con tus credenciales de PostgreSQL
   ```

5. **Crear la base de datos en PostgreSQL**
   ```sql
   CREATE DATABASE "arcanumcoffee";
   ```

6. **Ejecutar migraciones**
   ```bash
   alembic upgrade head
   ```

7. **Ejecutar el seed de usuarios iniciales**
   ```bash
   python seed.py
   ```

8. **Iniciar el servidor**
   ```bash
   uvicorn main:app --reload
   ```

## URLs importantes

| URL | Descripción |
|-----|-------------|
| `http://localhost:8000/docs` | Swagger UI |
| `http://localhost:8000/redoc` | ReDoc |
| `http://localhost:8000/api/v1/contactos` | Endpoint Contactos |
| `http://localhost:8000/api/v1/newsletter` | Endpoint Newsletter |
| `http://localhost:8000/api/v1/usuarios` | Endpoint Usuarios |

## Usuarios iniciales (seed)

| NombreUsuario | Tipo   |
|---------------|--------|
| Kareli        | Admin  |
| Grecia        | Cajero |
