"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Contacto, ContactoCreate } from "@/types";
import { PaginatedMeta } from "@/types";
import Pagination from "@/components/Pagination";
import ConfirmDialog from "@/components/ConfirmDialog";
import ContactoForm from "./ContactoForm";
import api from "@/lib/axios";

interface Props {
  initialData: Contacto[];
  initialMeta: PaginatedMeta;
}

export default function ContactoTable({ initialData, initialMeta }: Props) {
  const router = useRouter();
  const [data, setData] = useState(initialData);
  const [meta, setMeta] = useState(initialMeta);
  const [page, setPage] = useState(initialMeta.page);
  const [loading, setLoading] = useState(false);
  const [formOpen, setFormOpen] = useState(false);
  const [editing, setEditing] = useState<Contacto | null>(null);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [error, setError] = useState("");
  const [userRole, setUserRole] = useState<string | null>(null);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    setUserRole(user.TipoUsuario || null);
  }, []);

  const fetchPage = async (p: number) => {
    setLoading(true);
    const res = await api.get(`/api/v1/contactos/?page=${p}&page_size=10`);
    setData(res.data.data);
    setMeta(res.data.meta);
    setPage(p);
    setLoading(false);
  };

  const handleSave = async (values: ContactoCreate) => {
    if (editing) {
      await api.put(`/api/v1/contactos/${editing.ContactoId}`, values);
    } else {
      await api.post("/api/v1/contactos/", values);
    }
    setFormOpen(false);
    setEditing(null);
    await fetchPage(page);
    router.refresh();
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    await api.delete(`/api/v1/contactos/${deleteId}`);
    setDeleteId(null);
    await fetchPage(page);
    router.refresh();
  };

  const totalPages = Math.ceil(meta.total / meta.page_size);

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-stone-100">Contactos</h1>
        <button
          onClick={() => { setEditing(null); setFormOpen(true); }}
          className="px-4 py-2 bg-amber-500 text-stone-950 rounded-lg font-semibold hover:bg-amber-400 transition"
        >
          + Nuevo
        </button>
      </div>

      {error && <p className="text-red-400 mb-4">{error}</p>}

      <div className="bg-stone-900 rounded-xl border border-stone-800 overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-stone-800 text-stone-400">
              <th className="px-4 py-3 text-left">ID</th>
              <th className="px-4 py-3 text-left">Nombre</th>
              <th className="px-4 py-3 text-left">Email</th>
              <th className="px-4 py-3 text-left">Mensaje</th>
              {userRole !== "Cajero" && <th className="px-4 py-3 text-left">Acciones</th>}
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan={userRole === "Cajero" ? 4 : 5} className="px-4 py-8 text-center text-stone-500">Cargando...</td></tr>
            ) : data.length === 0 ? (
              <tr><td colSpan={userRole === "Cajero" ? 4 : 5} className="px-4 py-8 text-center text-stone-500">Sin registros</td></tr>
            ) : data.map(c => (
              <tr key={c.ContactoId} className="border-b border-stone-800 hover:bg-stone-800/50 transition">
                <td className="px-4 py-3 text-stone-400">{c.ContactoId}</td>
                <td className="px-4 py-3 text-stone-100">{c.Nombre}</td>
                <td className="px-4 py-3 text-stone-300">{c.Email}</td>
                <td className="px-4 py-3 text-stone-400 max-w-xs truncate">{c.Mensaje}</td>
                {userRole !== "Cajero" && (
                  <td className="px-4 py-3">
                    <div className="flex gap-2">
                      <button onClick={() => { setEditing(c); setFormOpen(true); }} className="px-3 py-1 bg-stone-700 text-stone-200 rounded hover:bg-stone-600 transition text-xs">Editar</button>
                      <button onClick={() => setDeleteId(c.ContactoId)} className="px-3 py-1 bg-red-600/20 text-red-400 rounded hover:bg-red-600/40 transition text-xs">Eliminar</button>
                    </div>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Pagination page={page} totalPages={totalPages} onPageChange={fetchPage} />

      {formOpen && (
        <ContactoForm
          initial={editing}
          onSave={handleSave}
          onClose={() => { setFormOpen(false); setEditing(null); }}
        />
      )}

      <ConfirmDialog
        open={deleteId !== null}
        message="¿Eliminar este contacto? Esta acción no se puede deshacer."
        onConfirm={handleDelete}
        onCancel={() => setDeleteId(null)}
      />
    </div>
  );
}
