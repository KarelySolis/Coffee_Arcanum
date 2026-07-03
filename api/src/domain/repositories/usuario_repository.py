from abc import ABC, abstractmethod
from typing import List, Optional, Tuple
from src.domain.entities import Usuario


class IUsuarioRepository(ABC):
    @abstractmethod
    async def get_all(self, page: int, page_size: int, order_by: str, order: str) -> Tuple[List[Usuario], int]:
        pass

    @abstractmethod
    async def get_by_id(self, id: int) -> Optional[Usuario]:
        pass

    @abstractmethod
    async def get_by_username(self, username: str) -> Optional[Usuario]:
        pass

    @abstractmethod
    async def create(self, usuario: Usuario) -> Usuario:
        pass

    @abstractmethod
    async def update(self, usuario: Usuario) -> Usuario:
        pass

    @abstractmethod
    async def patch(self, id: int, fields: dict) -> Usuario:
        pass

    @abstractmethod
    async def delete(self, id: int) -> None:
        pass
