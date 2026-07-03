import time
import logging
from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from src.config import settings
from src.presentation.routers import contactos_router, newsletter_router, usuarios_router

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger("arcanum-coffee")

app = FastAPI(
    title="Arcanum Coffee API",
    description="API RESTful del proyecto Arcanum Coffee",
    version="1.0.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "https://coffee-frontend-production.up.railway.app"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.middleware("http")
async def logging_middleware(request: Request, call_next):
    start = time.time()
    response = await call_next(request)
    duration = round((time.time() - start) * 1000)
    logger.info(f"{request.method} {request.url.path} → {response.status_code} ({duration}ms)")
    return response


app.include_router(contactos_router, prefix="/api/v1")
app.include_router(newsletter_router, prefix="/api/v1")
app.include_router(usuarios_router, prefix="/api/v1")


@app.get("/", tags=["Health"])
async def root():
    return {"message": "Arcanum Coffee API v1.0.0", "docs": "/docs"}
