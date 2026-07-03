from pydantic import BaseModel, EmailStr
from typing import Optional


class ContactoCreateDTO(BaseModel):
    Nombre: str
    Email: EmailStr
    Mensaje: str


class ContactoUpdateDTO(BaseModel):
    Nombre: str
    Email: EmailStr
    Mensaje: str


class ContactoPatchDTO(BaseModel):
    Nombre: Optional[str] = None
    Email: Optional[EmailStr] = None
    Mensaje: Optional[str] = None


class ContactoResponseDTO(BaseModel):
    ContactoId: int
    Nombre: str
    Email: str
    Mensaje: str

    model_config = {"from_attributes": True}
