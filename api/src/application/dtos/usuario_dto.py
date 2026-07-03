from pydantic import BaseModel
from typing import Optional
from src.domain.entities import TipoUsuario as TipoUsuarioEnum


class UsuarioCreateDTO(BaseModel):
    NombreUsuario: str
    Contrasena: str
    TipoUsuario: TipoUsuarioEnum


class UsuarioUpdateDTO(BaseModel):
    NombreUsuario: str
    Contrasena: str
    TipoUsuario: TipoUsuarioEnum


class UsuarioPatchDTO(BaseModel):
    NombreUsuario: Optional[str] = None
    Contrasena: Optional[str] = None
    TipoUsuario: Optional[TipoUsuarioEnum] = None


class UsuarioResponseDTO(BaseModel):
    UsuarioId: int
    NombreUsuario: str
    TipoUsuario: TipoUsuarioEnum

    model_config = {"from_attributes": True}


class UsuarioLoginDTO(BaseModel):
    NombreUsuario: str
    Contrasena: str

