from typing import List, Tuple
from src.domain.entities import Newsletter
from src.domain.repositories import INewsletterRepository
from src.domain.exceptions import NotFoundError
from src.application.dtos import NewsletterCreateDTO, NewsletterResponseDTO, NewsletterUpdateDTO


class NewsletterService:
    def __init__(self, repo: INewsletterRepository):
        self._repo = repo

    async def get_all(self, page: int, page_size: int, order_by: str, order: str) -> Tuple[List[NewsletterResponseDTO], int]:
        newsletters, total = await self._repo.get_all(page, page_size, order_by, order)
        return [NewsletterResponseDTO.model_validate(n.__dict__) for n in newsletters], total

    async def get_by_id(self, id: int) -> NewsletterResponseDTO:
        newsletter = await self._repo.get_by_id(id)
        if not newsletter:
            raise NotFoundError("Newsletter", id)
        return NewsletterResponseDTO.model_validate(newsletter.__dict__)

    async def create(self, dto: NewsletterCreateDTO) -> NewsletterResponseDTO:
        entity = Newsletter(NewsletterId=None, **dto.model_dump())
        created = await self._repo.create(entity)
        return NewsletterResponseDTO.model_validate(created.__dict__)

    async def delete(self, id: int) -> None:
        existing = await self._repo.get_by_id(id)
        if not existing:
            raise NotFoundError("Newsletter", id)
        await self._repo.delete(id)

    async def update(self, id: int, dto: NewsletterUpdateDTO) -> NewsletterResponseDTO:
        existing = await self._repo.get_by_id(id)
        if not existing:
            raise NotFoundError("Newsletter", id)
        entity = Newsletter(NewsletterId=id, Email=dto.Email)
        updated = await self._repo.update(entity)
        return NewsletterResponseDTO.model_validate(updated.__dict__)
