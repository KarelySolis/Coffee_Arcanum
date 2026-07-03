from typing import List, Tuple
from src.domain.entities import Contacto
from src.domain.repositories import IContactoRepository
from src.domain.exceptions import NotFoundError
from src.application.dtos import ContactoCreateDTO, ContactoUpdateDTO, ContactoPatchDTO, ContactoResponseDTO


class ContactoService:
    def __init__(self, repo: IContactoRepository):
        self._repo = repo

    async def get_all(self, page: int, page_size: int, order_by: str, order: str) -> Tuple[List[ContactoResponseDTO], int]:
        contactos, total = await self._repo.get_all(page, page_size, order_by, order)
        return [ContactoResponseDTO.model_validate(c.__dict__) for c in contactos], total

    async def get_by_id(self, id: int) -> ContactoResponseDTO:
        contacto = await self._repo.get_by_id(id)
        if not contacto:
            raise NotFoundError("Contacto", id)
        return ContactoResponseDTO.model_validate(contacto.__dict__)

    async def create(self, dto: ContactoCreateDTO) -> ContactoResponseDTO:
        entity = Contacto(ContactoId=None, **dto.model_dump())
        created = await self._repo.create(entity)
        return ContactoResponseDTO.model_validate(created.__dict__)

    async def update(self, id: int, dto: ContactoUpdateDTO) -> ContactoResponseDTO:
        existing = await self._repo.get_by_id(id)
        if not existing:
            raise NotFoundError("Contacto", id)
        entity = Contacto(ContactoId=id, **dto.model_dump())
        updated = await self._repo.update(entity)
        return ContactoResponseDTO.model_validate(updated.__dict__)

    async def patch(self, id: int, dto: ContactoPatchDTO) -> ContactoResponseDTO:
        existing = await self._repo.get_by_id(id)
        if not existing:
            raise NotFoundError("Contacto", id)
        fields = {k: v for k, v in dto.model_dump().items() if v is not None}
        updated = await self._repo.patch(id, fields)
        return ContactoResponseDTO.model_validate(updated.__dict__)

    async def delete(self, id: int) -> None:
        existing = await self._repo.get_by_id(id)
        if not existing:
            raise NotFoundError("Contacto", id)
        await self._repo.delete(id)
