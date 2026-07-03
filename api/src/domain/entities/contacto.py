from dataclasses import dataclass


@dataclass
class Contacto:
    ContactoId: int | None
    Nombre: str
    Email: str
    Mensaje: str


@dataclass
class Newsletter:
    NewsletterId: int | None
    Email: str
