from fastapi import APIRouter, Depends, Response, status
from sqlalchemy.ext.asyncio import AsyncSession
from src.infrastructure.database import get_db
from src.infrastructure.repositories import ContactoRepositoryImpl
from src.application.services import ContactoService
from src.application.dtos import ContactoCreateDTO, ContactoUpdateDTO, ContactoPatchDTO
from src.presentation.responses import success_response, paginated_response, error_response
from src.domain.exceptions import NotFoundError, ConflictError

router = APIRouter(prefix="/contactos", tags=["Contactos"])


def get_service(db: AsyncSession = Depends(get_db)) -> ContactoService:
    return ContactoService(ContactoRepositoryImpl(db))


@router.get("/")
async def list_contactos(
    page: int = 1,
    page_size: int = 10,
    order_by: str = "ContactoId",
    order: str = "asc",
    service: ContactoService = Depends(get_service),
):
    items, total = await service.get_all(page, page_size, order_by, order)
    return paginated_response(items, total, page, page_size, "/api/v1/contactos")


@router.get("/{id}")
async def get_contacto(id: int, service: ContactoService = Depends(get_service)):
    try:
        item = await service.get_by_id(id)
        return success_response(item)
    except NotFoundError as e:
        return error_response("NOT_FOUND", str(e), status.HTTP_404_NOT_FOUND)


@router.post("/", status_code=status.HTTP_201_CREATED)
async def create_contacto(
    dto: ContactoCreateDTO,
    response: Response,
    service: ContactoService = Depends(get_service),
):
    item = await service.create(dto)
    response.headers["Location"] = f"/api/v1/contactos/{item.ContactoId}"
    return success_response(item, "Contacto creado exitosamente")


@router.put("/{id}")
async def update_contacto(id: int, dto: ContactoUpdateDTO, service: ContactoService = Depends(get_service)):
    try:
        item = await service.update(id, dto)
        return success_response(item)
    except NotFoundError as e:
        return error_response("NOT_FOUND", str(e), status.HTTP_404_NOT_FOUND)


@router.patch("/{id}")
async def patch_contacto(id: int, dto: ContactoPatchDTO, service: ContactoService = Depends(get_service)):
    try:
        item = await service.patch(id, dto)
        return success_response(item)
    except NotFoundError as e:
        return error_response("NOT_FOUND", str(e), status.HTTP_404_NOT_FOUND)


@router.delete("/{id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_contacto(id: int, service: ContactoService = Depends(get_service)):
    try:
        await service.delete(id)
    except NotFoundError as e:
        return error_response("NOT_FOUND", str(e), status.HTTP_404_NOT_FOUND)
