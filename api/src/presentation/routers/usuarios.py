from fastapi import APIRouter, Depends, Response, status
from sqlalchemy.ext.asyncio import AsyncSession
from src.infrastructure.database import get_db
from src.infrastructure.repositories import UsuarioRepositoryImpl
from src.application.services import UsuarioService
from src.application.dtos import UsuarioCreateDTO, UsuarioUpdateDTO, UsuarioPatchDTO, UsuarioLoginDTO
from src.presentation.responses import success_response, paginated_response, error_response
from src.domain.exceptions import NotFoundError, ConflictError

router = APIRouter(prefix="/usuarios", tags=["Usuarios"])


def get_service(db: AsyncSession = Depends(get_db)) -> UsuarioService:
    return UsuarioService(UsuarioRepositoryImpl(db))


@router.get("/")
async def list_usuarios(
    page: int = 1,
    page_size: int = 10,
    order_by: str = "UsuarioId",
    order: str = "asc",
    service: UsuarioService = Depends(get_service),
):
    items, total = await service.get_all(page, page_size, order_by, order)
    return paginated_response(items, total, page, page_size, "/api/v1/usuarios")


@router.get("/{id}")
async def get_usuario(id: int, service: UsuarioService = Depends(get_service)):
    try:
        item = await service.get_by_id(id)
        return success_response(item)
    except NotFoundError as e:
        return error_response("NOT_FOUND", str(e), status.HTTP_404_NOT_FOUND)


@router.post("/", status_code=status.HTTP_201_CREATED)
async def create_usuario(
    dto: UsuarioCreateDTO,
    response: Response,
    service: UsuarioService = Depends(get_service),
):
    try:
        item = await service.create(dto)
        response.headers["Location"] = f"/api/v1/usuarios/{item.UsuarioId}"
        return success_response(item, "Usuario creado exitosamente")
    except ConflictError as e:
        return error_response("CONFLICT", str(e), status.HTTP_409_CONFLICT)


@router.put("/{id}")
async def update_usuario(id: int, dto: UsuarioUpdateDTO, service: UsuarioService = Depends(get_service)):
    try:
        item = await service.update(id, dto)
        return success_response(item)
    except NotFoundError as e:
        return error_response("NOT_FOUND", str(e), status.HTTP_404_NOT_FOUND)
    except ConflictError as e:
        return error_response("CONFLICT", str(e), status.HTTP_409_CONFLICT)


@router.patch("/{id}")
async def patch_usuario(id: int, dto: UsuarioPatchDTO, service: UsuarioService = Depends(get_service)):
    try:
        item = await service.patch(id, dto)
        return success_response(item)
    except NotFoundError as e:
        return error_response("NOT_FOUND", str(e), status.HTTP_404_NOT_FOUND)
    except ConflictError as e:
        return error_response("CONFLICT", str(e), status.HTTP_409_CONFLICT)


@router.delete("/{id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_usuario(id: int, service: UsuarioService = Depends(get_service)):
    try:
        await service.delete(id)
    except NotFoundError as e:
        return error_response("NOT_FOUND", str(e), status.HTTP_404_NOT_FOUND)


@router.post("/login")
async def login(dto: UsuarioLoginDTO, service: UsuarioService = Depends(get_service)):
    user = await service.authenticate(dto.NombreUsuario, dto.Contrasena)
    if not user:
        return error_response("UNAUTHORIZED", "Usuario o contraseña incorrectos", status.HTTP_401_UNAUTHORIZED)
    return success_response(user, "Inicio de sesión exitoso")

