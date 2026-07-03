from typing import List, Optional, Tuple
from sqlalchemy import select, func
from sqlalchemy.ext.asyncio import AsyncSession
from src.domain.entities import Usuario, TipoUsuario
from src.domain.repositories import IUsuarioRepository
from src.infrastructure.models import UsuarioModel


class UsuarioRepositoryImpl(IUsuarioRepository):
    def __init__(self, session: AsyncSession):
        self._session = session

    def _to_entity(self, model: UsuarioModel) -> Usuario:
        return Usuario(
            UsuarioId=model.UsuarioId,
            NombreUsuario=model.NombreUsuario,
            Contrasena=model.Contrasena,
            TipoUsuario=TipoUsuario(model.TipoUsuario),
        )

    async def get_all(self, page: int, page_size: int, order_by: str, order: str) -> Tuple[List[Usuario], int]:
        col = getattr(UsuarioModel, order_by, UsuarioModel.UsuarioId)
        direction = col.asc() if order == "asc" else col.desc()
        total_result = await self._session.execute(select(func.count()).select_from(UsuarioModel))
        total = total_result.scalar_one()
        result = await self._session.execute(
            select(UsuarioModel).order_by(direction).offset((page - 1) * page_size).limit(page_size)
        )
        return [self._to_entity(r) for r in result.scalars().all()], total

    async def get_by_id(self, id: int) -> Optional[Usuario]:
        result = await self._session.get(UsuarioModel, id)
        return self._to_entity(result) if result else None

    async def get_by_username(self, username: str) -> Optional[Usuario]:
        result = await self._session.execute(
            select(UsuarioModel).where(UsuarioModel.NombreUsuario == username)
        )
        model = result.scalar_one_or_none()
        return self._to_entity(model) if model else None

    async def create(self, usuario: Usuario) -> Usuario:
        model = UsuarioModel(
            NombreUsuario=usuario.NombreUsuario,
            Contrasena=usuario.Contrasena,
            TipoUsuario=usuario.TipoUsuario.value,
        )
        self._session.add(model)
        await self._session.flush()
        await self._session.refresh(model)
        return self._to_entity(model)

    async def update(self, usuario: Usuario) -> Usuario:
        model = await self._session.get(UsuarioModel, usuario.UsuarioId)
        model.NombreUsuario = usuario.NombreUsuario
        model.Contrasena = usuario.Contrasena
        model.TipoUsuario = usuario.TipoUsuario.value
        await self._session.flush()
        await self._session.refresh(model)
        return self._to_entity(model)

    async def patch(self, id: int, fields: dict) -> Usuario:
        model = await self._session.get(UsuarioModel, id)
        for key, value in fields.items():
            if key == "TipoUsuario" and hasattr(value, "value"):
                value = value.value
            setattr(model, key, value)
        await self._session.flush()
        await self._session.refresh(model)
        return self._to_entity(model)

    async def delete(self, id: int) -> None:
        model = await self._session.get(UsuarioModel, id)
        await self._session.delete(model)
        await self._session.flush()
