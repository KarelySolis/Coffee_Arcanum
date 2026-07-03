from pydantic import BaseModel, EmailStr


class NewsletterCreateDTO(BaseModel):
    Email: EmailStr


class NewsletterResponseDTO(BaseModel):
    NewsletterId: int
    Email: str

    model_config = {"from_attributes": True}
