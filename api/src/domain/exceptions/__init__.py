class NotFoundError(Exception):
    def __init__(self, entity: str, id: int):
        self.entity = entity
        self.id = id
        super().__init__(f"{entity} con id {id} no encontrado")


class ConflictError(Exception):
    def __init__(self, message: str):
        super().__init__(message)


class ValidationError(Exception):
    def __init__(self, message: str):
        super().__init__(message)
