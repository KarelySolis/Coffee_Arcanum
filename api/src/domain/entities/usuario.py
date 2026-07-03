from dataclasses import dataclass
from enum import Enum


class TipoUsuario(str, Enum):
    Admin = "Admin"
    Cajero = "Cajero"


@dataclass
class Usuario:
    UsuarioId: int | None
    NombreUsuario: str
    Contrasena: str
    TipoUsuario: TipoUsuario
