from typing import List, Optional, Tuple
from sqlalchemy import select, func
from sqlalchemy.ext.asyncio import AsyncSession
from src.domain.entities import Contacto
from src.domain.repositories import IContactoRepository
from src.infrastructure.models import ContactoModel


class ContactoRepositoryImpl(IContactoRepository):
    def __init__(self, session: AsyncSession):
        self._session = session

    def _to_entity(self, model: ContactoModel) -> Contacto:
        return Contacto(
            ContactoId=model.ContactoId,
            Nombre=model.Nombre,
            Email=model.Email,
            Mensaje=model.Mensaje,
        )

    async def get_all(self, page: int, page_size: int, order_by: str, order: str) -> Tuple[List[Contacto], int]:
        col = getattr(ContactoModel, order_by, ContactoModel.ContactoId)
        direction = col.asc() if order == "asc" else col.desc()
        total_result = await self._session.execute(select(func.count()).select_from(ContactoModel))
        total = total_result.scalar_one()
        result = await self._session.execute(
            select(ContactoModel).order_by(direction).offset((page - 1) * page_size).limit(page_size)
        )
        return [self._to_entity(r) for r in result.scalars().all()], total

    async def get_by_id(self, id: int) -> Optional[Contacto]:
        result = await self._session.get(ContactoModel, id)
        return self._to_entity(result) if result else None

    async def create(self, contacto: Contacto) -> Contacto:
        model = ContactoModel(Nombre=contacto.Nombre, Email=contacto.Email, Mensaje=contacto.Mensaje)
        self._session.add(model)
        await self._session.flush()
        await self._session.refresh(model)
        return self._to_entity(model)

    async def update(self, contacto: Contacto) -> Contacto:
        model = await self._session.get(ContactoModel, contacto.ContactoId)
        model.Nombre = contacto.Nombre
        model.Email = contacto.Email
        model.Mensaje = contacto.Mensaje
        await self._session.flush()
        await self._session.refresh(model)
        return self._to_entity(model)

    async def patch(self, id: int, fields: dict) -> Contacto:
        model = await self._session.get(ContactoModel, id)
        for key, value in fields.items():
            setattr(model, key, value)
        await self._session.flush()
        await self._session.refresh(model)
        return self._to_entity(model)

    async def delete(self, id: int) -> None:
        model = await self._session.get(ContactoModel, id)
        await self._session.delete(model)
        await self._session.flush()
