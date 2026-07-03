"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Newsletter, NewsletterCreate, PaginatedMeta } from "@/types";
import Pagination from "@/components/Pagination";
import ConfirmDialog from "@/components/ConfirmDialog";
import NewsletterForm from "./NewsletterForm";
import api from "@/lib/axios";

interface Props {
  initialData: Newsletter[];
  initialMeta: PaginatedMeta;
}

export default function NewsletterTable({ initialData, initialMeta }: Props) {
  const router = useRouter();
  const [data, setData] = useState(initialData);
  const [meta, setMeta] = useState(initialMeta);
  const [page, setPage] = useState(initialMeta.page);
  const [loading, setLoading] = useState(false);
  const [formOpen, setFormOpen] = useState(false);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [userRole, setUserRole] = useState<string | null>(null);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    setUserRole(user.TipoUsuario || null);
  }, []);

  const fetchPage = async (p: number) => {
    setLoading(true);
    const res = await api.get(`/api/v1/newsletter/?page=${p}&page_size=10`);
    setData(res.data.data);
    setMeta(res.data.meta);
    setPage(p);
    setLoading(false);
  };

  const handleSave = async (values: NewsletterCreate) => {
    await api.post("/api/v1/newsletter/", values);
    setFormOpen(false);
    await fetchPage(page);
    router.refresh();
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    await api.delete(`/api/v1/newsletter/${deleteId}`);
    setDeleteId(null);
    await fetchPage(page);
    router.refresh();
  };

  const totalPages = Math.ceil(meta.total / meta.page_size);

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-stone-100">Newsletter</h1>
        <button
          onClick={() => setFormOpen(true)}
          className="px-4 py-2 bg-amber-500 text-stone-950 rounded-lg font-semibold hover:bg-amber-400 transition"
        >
          + Suscribir
        </button>
      </div>

      <div className="bg-stone-900 rounded-xl border border-stone-800 overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-stone-800 text-stone-400">
              <th className="px-4 py-3 text-left">ID</th>
              <th className="px-4 py-3 text-left">Email</th>
              {userRole !== "Cajero" && <th className="px-4 py-3 text-left">Acciones</th>}
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan={userRole === "Cajero" ? 2 : 3} className="px-4 py-8 text-center text-stone-500">Cargando...</td></tr>
            ) : data.length === 0 ? (
              <tr><td colSpan={userRole === "Cajero" ? 2 : 3} className="px-4 py-8 text-center text-stone-500">Sin registros</td></tr>
            ) : data.map(n => (
              <tr key={n.NewsletterId} className="border-b border-stone-800 hover:bg-stone-800/50 transition">
                <td className="px-4 py-3 text-stone-400">{n.NewsletterId}</td>
                <td className="px-4 py-3 text-stone-100">{n.Email}</td>
                {userRole !== "Cajero" && (
                  <td className="px-4 py-3">
                    <button onClick={() => setDeleteId(n.NewsletterId)} className="px-3 py-1 bg-red-600/20 text-red-400 rounded hover:bg-red-600/40 transition text-xs">Eliminar</button>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Pagination page={page} totalPages={totalPages} onPageChange={fetchPage} />

      {formOpen && (
        <NewsletterForm
          onSave={handleSave}
          onClose={() => setFormOpen(false)}
        />
      )}

      <ConfirmDialog
        open={deleteId !== null}
        message="¿Eliminar este email de la newsletter? Esta acción no se puede deshacer."
        onConfirm={handleDelete}
        onCancel={() => setDeleteId(null)}
      />
    </div>
  );
}
