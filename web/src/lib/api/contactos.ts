import { PaginatedResponse, ApiResponse, Contacto, ContactoCreate } from "@/types";

const BASE = `${process.env.API_URL ?? "http://localhost:8000"}/api/v1/contactos`;

export async function getContactos(page = 1, page_size = 10): Promise<PaginatedResponse<Contacto>> {
  const res = await fetch(`${BASE}/?page=${page}&page_size=${page_size}`, { cache: "no-store" });
  return res.json();
}

export async function getContacto(id: number): Promise<ApiResponse<Contacto>> {
  const res = await fetch(`${BASE}/${id}`, { cache: "no-store" });
  return res.json();
}

export async function getContactosTotal(): Promise<number> {
  const res = await fetch(`${BASE}/?page=1&page_size=1`, { cache: "no-store" });
  const data: PaginatedResponse<Contacto> = await res.json();
  return data.meta.total;
}
