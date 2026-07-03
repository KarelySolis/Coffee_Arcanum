"""
Script idempotente para poblar usuarios iniciales.
Uso: python seed.py
"""
import asyncio
import bcrypt
from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession, async_sessionmaker
from sqlalchemy import select
from dotenv import load_dotenv
import os

load_dotenv()

from src.infrastructure.models import UsuarioModel

SEED_USERS = [
    {"NombreUsuario": "Kareli", "Contrasena": "DiasBuenos123", "TipoUsuario": "Admin"},
    {"NombreUsuario": "Grecia", "Contrasena": "12345", "TipoUsuario": "Cajero"},
]


async def seed():
    engine = create_async_engine(os.environ["DATABASE_URL"], echo=False)
    Session = async_sessionmaker(engine, class_=AsyncSession, expire_on_commit=False)

    async with Session() as session:
        for user_data in SEED_USERS:
            result = await session.execute(
                select(UsuarioModel).where(UsuarioModel.NombreUsuario == user_data["NombreUsuario"])
            )
            existing = result.scalar_one_or_none()
            if existing:
                print(f"[SKIP] Usuario '{user_data['NombreUsuario']}' ya existe.")
                continue

            hashed = bcrypt.hashpw(user_data["Contrasena"].encode(), bcrypt.gensalt()).decode()
            model = UsuarioModel(
                NombreUsuario=user_data["NombreUsuario"],
                Contrasena=hashed,
                TipoUsuario=user_data["TipoUsuario"],
            )
            session.add(model)
            print(f"[OK] Usuario '{user_data['NombreUsuario']}' creado.")

        await session.commit()

    await engine.dispose()
    print("Seed completado.")


if __name__ == "__main__":
    asyncio.run(seed())
