from typing import List, Tuple, Optional
import bcrypt
from src.domain.entities import Usuario
from src.domain.repositories import IUsuarioRepository
from src.domain.exceptions import NotFoundError, ConflictError
from src.application.dtos import UsuarioCreateDTO, UsuarioUpdateDTO, UsuarioPatchDTO, UsuarioResponseDTO


def _hash(password: str) -> str:
    return bcrypt.hashpw(password.encode(), bcrypt.gensalt()).decode()


class UsuarioService:
    def __init__(self, repo: IUsuarioRepository):
        self._repo = repo

    async def authenticate(self, username: str, password: str) -> Optional[UsuarioResponseDTO]:
        usuario = await self._repo.get_by_username(username)
        if not usuario:
            return None
        if bcrypt.checkpw(password.encode(), usuario.Contrasena.encode()):
            return UsuarioResponseDTO.model_validate(usuario.__dict__)
        return None


    async def get_all(self, page: int, page_size: int, order_by: str, order: str) -> Tuple[List[UsuarioResponseDTO], int]:
        usuarios, total = await self._repo.get_all(page, page_size, order_by, order)
        return [UsuarioResponseDTO.model_validate(u.__dict__) for u in usuarios], total

    async def get_by_id(self, id: int) -> UsuarioResponseDTO:
        usuario = await self._repo.get_by_id(id)
        if not usuario:
            raise NotFoundError("Usuario", id)
        return UsuarioResponseDTO.model_validate(usuario.__dict__)

    async def create(self, dto: UsuarioCreateDTO) -> UsuarioResponseDTO:
        existing = await self._repo.get_by_username(dto.NombreUsuario)
        if existing:
            raise ConflictError(f"NombreUsuario '{dto.NombreUsuario}' ya existe")
        entity = Usuario(
            UsuarioId=None,
            NombreUsuario=dto.NombreUsuario,
            Contrasena=_hash(dto.Contrasena),
            TipoUsuario=dto.TipoUsuario,
        )
        created = await self._repo.create(entity)
        return UsuarioResponseDTO.model_validate(created.__dict__)

    async def update(self, id: int, dto: UsuarioUpdateDTO) -> UsuarioResponseDTO:
        existing = await self._repo.get_by_id(id)
        if not existing:
            raise NotFoundError("Usuario", id)
        conflict = await self._repo.get_by_username(dto.NombreUsuario)
        if conflict and conflict.UsuarioId != id:
            raise ConflictError(f"NombreUsuario '{dto.NombreUsuario}' ya existe")
        entity = Usuario(
            UsuarioId=id,
            NombreUsuario=dto.NombreUsuario,
            Contrasena=_hash(dto.Contrasena),
            TipoUsuario=dto.TipoUsuario,
        )
        updated = await self._repo.update(entity)
        return UsuarioResponseDTO.model_validate(updated.__dict__)

    async def patch(self, id: int, dto: UsuarioPatchDTO) -> UsuarioResponseDTO:
        existing = await self._repo.get_by_id(id)
        if not existing:
            raise NotFoundError("Usuario", id)
        fields = {k: v for k, v in dto.model_dump().items() if v is not None}
        if "NombreUsuario" in fields:
            conflict = await self._repo.get_by_username(fields["NombreUsuario"])
            if conflict and conflict.UsuarioId != id:
                raise ConflictError(f"NombreUsuario '{fields['NombreUsuario']}' ya existe")
        if "Contrasena" in fields:
            fields["Contrasena"] = _hash(fields["Contrasena"])
        updated = await self._repo.patch(id, fields)
        return UsuarioResponseDTO.model_validate(updated.__dict__)

    async def delete(self, id: int) -> None:
        existing = await self._repo.get_by_id(id)
        if not existing:
            raise NotFoundError("Usuario", id)
        await self._repo.delete(id)
