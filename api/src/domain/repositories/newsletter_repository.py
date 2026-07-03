from abc import ABC, abstractmethod
from typing import List, Optional, Tuple
from src.domain.entities import Newsletter


class INewsletterRepository(ABC):
    @abstractmethod
    async def get_all(self, page: int, page_size: int, order_by: str, order: str) -> Tuple[List[Newsletter], int]:
        pass

    @abstractmethod
    async def get_by_id(self, id: int) -> Optional[Newsletter]:
        pass

    @abstractmethod
    async def create(self, newsletter: Newsletter) -> Newsletter:
        pass

    @abstractmethod
    async def delete(self, id: int) -> None:
        pass
