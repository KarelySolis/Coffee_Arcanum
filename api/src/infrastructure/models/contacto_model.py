from sqlalchemy import String, Text
from sqlalchemy.orm import Mapped, mapped_column
from src.infrastructure.database import Base


class ContactoModel(Base):
    __tablename__ = "contactos"

    ContactoId: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    Nombre: Mapped[str] = mapped_column(String(200), nullable=False)
    Email: Mapped[str] = mapped_column(String(200), nullable=False)
    Mensaje: Mapped[str] = mapped_column(Text, nullable=False)


class NewsletterModel(Base):
    __tablename__ = "newsletter"

    NewsletterId: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    Email: Mapped[str] = mapped_column(String(200), nullable=False, unique=True)
