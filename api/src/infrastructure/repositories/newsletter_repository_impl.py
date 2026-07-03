from typing import List, Optional, Tuple
from sqlalchemy import select, func
from sqlalchemy.ext.asyncio import AsyncSession
from src.domain.entities import Newsletter
from src.domain.repositories import INewsletterRepository
from src.infrastructure.models import NewsletterModel


class NewsletterRepositoryImpl(INewsletterRepository):
    def __init__(self, session: AsyncSession):
        self._session = session

    def _to_entity(self, model: NewsletterModel) -> Newsletter:
        return Newsletter(
            NewsletterId=model.NewsletterId,
            Email=model.Email,
        )

    async def get_all(self, page: int, page_size: int, order_by: str, order: str) -> Tuple[List[Newsletter], int]:
        col = getattr(NewsletterModel, order_by, NewsletterModel.NewsletterId)
        direction = col.asc() if order == "asc" else col.desc()
        total_result = await self._session.execute(select(func.count()).select_from(NewsletterModel))
        total = total_result.scalar_one()
        result = await self._session.execute(
            select(NewsletterModel).order_by(direction).offset((page - 1) * page_size).limit(page_size)
        )
        return [self._to_entity(r) for r in result.scalars().all()], total

    async def get_by_id(self, id: int) -> Optional[Newsletter]:
        result = await self._session.get(NewsletterModel, id)
        return self._to_entity(result) if result else None

    async def create(self, newsletter: Newsletter) -> Newsletter:
        model = NewsletterModel(Email=newsletter.Email)
        self._session.add(model)
        await self._session.flush()
        await self._session.refresh(model)
        return self._to_entity(model)

    async def delete(self, id: int) -> None:
        model = await self._session.get(NewsletterModel, id)
        await self._session.delete(model)
        await self._session.flush()
