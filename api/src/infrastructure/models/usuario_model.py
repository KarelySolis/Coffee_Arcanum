import sqlalchemy as sa
from sqlalchemy.orm import Mapped, mapped_column
from src.infrastructure.database import Base

tipo_usuario_enum = sa.Enum("Admin", "Cajero", name="tipo_usuario")


class UsuarioModel(Base):
    __tablename__ = "usuarios"

    UsuarioId: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    NombreUsuario: Mapped[str] = mapped_column(sa.String(100), nullable=False, unique=True)
    Contrasena: Mapped[str] = mapped_column(sa.String(255), nullable=False)
    TipoUsuario: Mapped[str] = mapped_column(tipo_usuario_enum, nullable=False)
