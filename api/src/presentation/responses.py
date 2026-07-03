from fastapi import HTTPException
from fastapi.responses import JSONResponse
from pydantic import BaseModel
from typing import Any, Optional


def _serialize(data: Any) -> Any:
    if isinstance(data, list):
        return [_serialize(i) for i in data]
    if isinstance(data, BaseModel):
        return data.model_dump()
    return data


def success_response(data: Any, message: str = "Operación exitosa") -> dict:
    return {"data": _serialize(data), "message": message}


def paginated_response(items: list, total: int, page: int, page_size: int, base_url: str) -> dict:
    total_pages = (total + page_size - 1) // page_size
    next_url = f"{base_url}?page={page + 1}&page_size={page_size}" if page < total_pages else None
    prev_url = f"{base_url}?page={page - 1}&page_size={page_size}" if page > 1 else None
    return {
        "data": _serialize(items),
        "meta": {
            "total": total,
            "page": page,
            "page_size": page_size,
            "next": next_url,
            "previous": prev_url,
        },
    }


def error_response(code: str, message: str, status_code: int) -> JSONResponse:
    return JSONResponse(
        status_code=status_code,
        content={"error": {"code": code, "message": message, "details": []}},
    )
