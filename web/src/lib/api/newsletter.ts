import { PaginatedResponse, ApiResponse, Newsletter } from "@/types";

const BASE = `${process.env.API_URL ?? "http://localhost:8000"}/api/v1/newsletter`;

async function handle<T>(res: Response): Promise<T> {
  if (!res.ok) {
    const detail = await res.text().catch(() => "");
    throw new Error(`Error ${res.status} desde la API (${BASE}): ${detail || res.statusText}`);
  }
  return res.json() as Promise<T>;
}

export async function getNewsletters(page = 1, page_size = 10): Promise<PaginatedResponse<Newsletter>> {
  const res = await fetch(`${BASE}/?page=${page}&page_size=${page_size}`, { cache: "no-store" });
  return handle<PaginatedResponse<Newsletter>>(res);
}

export async function getNewsletter(id: number): Promise<ApiResponse<Newsletter>> {
  const res = await fetch(`${BASE}/${id}`, { cache: "no-store" });
  return handle<ApiResponse<Newsletter>>(res);
}

export async function getNewslettersTotal(): Promise<number> {
  const data = await getNewsletters(1, 1);
  return data.meta.total;
}

export async function createNewsletter(data: { Email: string }): Promise<ApiResponse<Newsletter>> {
  const res = await fetch(BASE, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return handle<ApiResponse<Newsletter>>(res);
}

export async function deleteNewsletter(id: number): Promise<void> {
  const res = await fetch(`${BASE}/${id}`, { method: "DELETE" });
  if (!res.ok) {
    const detail = await res.text().catch(() => "");
    throw new Error(`Error ${res.status} al eliminar: ${detail || res.statusText}`);
  }
}
