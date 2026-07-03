from abc import ABC, abstractmethod
from typing import List, Optional, Tuple
from src.domain.entities import Contacto


class IContactoRepository(ABC):
    @abstractmethod
    async def get_all(self, page: int, page_size: int, order_by: str, order: str) -> Tuple[List[Contacto], int]:
        pass

    @abstractmethod
    async def get_by_id(self, id: int) -> Optional[Contacto]:
        pass

    @abstractmethod
    async def create(self, contacto: Contacto) -> Contacto:
        pass

    @abstractmethod
    async def update(self, contacto: Contacto) -> Contacto:
        pass

    @abstractmethod
    async def patch(self, id: int, fields: dict) -> Contacto:
        pass

    @abstractmethod
    async def delete(self, id: int) -> None:
        pass
