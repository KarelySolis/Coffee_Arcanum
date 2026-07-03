import { PaginatedResponse, ApiResponse, Usuario } from "@/types";

const BASE = `${process.env.API_URL ?? "http://localhost:8000"}/api/v1/usuarios`;

export async function getUsuarios(page = 1, page_size = 10): Promise<PaginatedResponse<Usuario>> {
  const res = await fetch(`${BASE}/?page=${page}&page_size=${page_size}`, { cache: "no-store" });
  return res.json();
}

export async function getUsuario(id: number): Promise<ApiResponse<Usuario>> {
  const res = await fetch(`${BASE}/${id}`, { cache: "no-store" });
  return res.json();
}

export async function getUsuariosTotal(): Promise<number> {
  const res = await fetch(`${BASE}/?page=1&page_size=1`, { cache: "no-store" });
  const data: PaginatedResponse<Usuario> = await res.json();
  return data.meta.total;
}
