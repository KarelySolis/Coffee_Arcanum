from fastapi import APIRouter, Depends, Response, status
from sqlalchemy.ext.asyncio import AsyncSession
from src.infrastructure.database import get_db
from src.infrastructure.repositories import NewsletterRepositoryImpl
from src.application.services import NewsletterService
from src.application.dtos import NewsletterCreateDTO
from src.presentation.responses import success_response, paginated_response, error_response
from src.domain.exceptions import NotFoundError

router = APIRouter(prefix="/newsletter", tags=["Newsletter"])


def get_service(db: AsyncSession = Depends(get_db)) -> NewsletterService:
    return NewsletterService(NewsletterRepositoryImpl(db))


@router.get("/")
async def list_newsletter(
    page: int = 1,
    page_size: int = 10,
    order_by: str = "NewsletterId",
    order: str = "asc",
    service: NewsletterService = Depends(get_service),
):
    items, total = await service.get_all(page, page_size, order_by, order)
    return paginated_response(items, total, page, page_size, "/api/v1/newsletter")


@router.get("/{id}")
async def get_newsletter(id: int, service: NewsletterService = Depends(get_service)):
    try:
        item = await service.get_by_id(id)
        return success_response(item)
    except NotFoundError as e:
        return error_response("NOT_FOUND", str(e), status.HTTP_404_NOT_FOUND)


@router.post("/", status_code=status.HTTP_201_CREATED)
async def create_newsletter(
    dto: NewsletterCreateDTO,
    response: Response,
    service: NewsletterService = Depends(get_service),
):
    item = await service.create(dto)
    response.headers["Location"] = f"/api/v1/newsletter/{item.NewsletterId}"
    return success_response(item, "Newsletter creada exitosamente")


@router.delete("/{id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_newsletter(id: int, service: NewsletterService = Depends(get_service)):
    try:
        await service.delete(id)
    except NotFoundError as e:
        return error_response("NOT_FOUND", str(e), status.HTTP_404_NOT_FOUND)
