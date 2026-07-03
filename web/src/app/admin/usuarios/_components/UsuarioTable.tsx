"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Usuario, UsuarioCreate, PaginatedMeta } from "@/types";
import Pagination from "@/components/Pagination";
import ConfirmDialog from "@/components/ConfirmDialog";
import UsuarioForm from "./UsuarioForm";
import api from "@/lib/axios";

interface Props {
  initialData: Usuario[];
  initialMeta: PaginatedMeta;
}

export default function UsuarioTable({ initialData, initialMeta }: Props) {
  const router = useRouter();
  const [data, setData] = useState(initialData);
  const [meta, setMeta] = useState(initialMeta);
  const [page, setPage] = useState(initialMeta.page);
  const [loading, setLoading] = useState(false);
  const [formOpen, setFormOpen] = useState(false);
  const [editing, setEditing] = useState<Usuario | null>(null);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [userRole, setUserRole] = useState<string | null>(null);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    setUserRole(user.TipoUsuario || null);
  }, []);

  const fetchPage = async (p: number) => {
    setLoading(true);
    const res = await api.get(`/api/v1/usuarios/?page=${p}&page_size=10`);
    setData(res.data.data);
    setMeta(res.data.meta);
    setPage(p);
    setLoading(false);
  };

  const handleSave = async (values: UsuarioCreate) => {
    if (editing) {
      if (userRole === "Cajero") {
        alert("No tienes permisos para editar registros.");
        return;
      }
      const payload: any = { NombreUsuario: values.NombreUsuario, TipoUsuario: values.TipoUsuario };
      if (values.Contrasena) payload.Contrasena = values.Contrasena;
      await api.patch(`/api/v1/usuarios/${editing.UsuarioId}`, payload);
    } else {
      await api.post("/api/v1/usuarios/", values);
    }
    setFormOpen(false);
    setEditing(null);
    await fetchPage(page);
    router.refresh();
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    if (userRole === "Cajero") {
      alert("No tienes permisos para eliminar registros.");
      setDeleteId(null);
      return;
    }
    await api.delete(`/api/v1/usuarios/${deleteId}`);
    setDeleteId(null);
    await fetchPage(page);
    router.refresh();
  };

  const totalPages = Math.ceil(meta.total / meta.page_size);

  const badgeColor = (tipo: string) =>
    tipo === "Admin" ? "bg-[#8c5a3c]/15 text-[#8c5a3c]" : "bg-stone-200 text-stone-700";

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold font-serif text-[#8c5a3c]">Usuarios</h1>
        <button
          onClick={() => { setEditing(null); setFormOpen(true); }}
          className="px-4 py-2 bg-[#8c5a3c] text-[#fdfaf5] rounded-lg font-semibold hover:bg-[#7a4e34] transition shadow-md"
        >
          + Nuevo
        </button>
      </div>

      <div className="bg-white rounded-xl border border-[#8c5a3c]/15 shadow-md overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-[#3a2a1a]/10 text-[#8c5a3c] bg-[#3a2a1a]/2 font-semibold">
              <th className="px-4 py-3 text-left">ID</th>
              <th className="px-4 py-3 text-left">NombreUsuario</th>
              <th className="px-4 py-3 text-left">Tipo</th>
              {userRole !== "Cajero" && <th className="px-4 py-3 text-left">Acciones</th>}
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan={userRole === "Cajero" ? 3 : 4} className="px-4 py-8 text-center text-[#5c4a3a]">Cargando...</td></tr>
            ) : data.length === 0 ? (
              <tr><td colSpan={userRole === "Cajero" ? 3 : 4} className="px-4 py-8 text-center text-[#5c4a3a]">Sin registros</td></tr>
            ) : data.map(u => (
              <tr key={u.UsuarioId} className="border-b border-[#3a2a1a]/10 hover:bg-[#3a2a1a]/2 transition">
                <td className="px-4 py-3 text-[#5c4a3a]">{u.UsuarioId}</td>
                <td className="px-4 py-3 text-[#3a2a1a] font-medium">{u.NombreUsuario}</td>
                <td className="px-4 py-3">
                  <span className={`px-2 py-0.5 rounded text-xs font-semibold ${badgeColor(u.TipoUsuario)}`}>{u.TipoUsuario}</span>
                </td>
                {userRole !== "Cajero" && (
                  <td className="px-4 py-3">
                    <div className="flex gap-2">
                      <button onClick={() => { setEditing(u); setFormOpen(true); }} className="px-3 py-1 border border-[#3a2a1a]/25 text-[#3a2a1a] rounded hover:bg-[#3a2a1a]/5 transition text-xs">Editar</button>
                      <button onClick={() => setDeleteId(u.UsuarioId)} className="px-3 py-1 bg-red-50 text-red-700 border border-red-200 rounded hover:bg-red-100 transition text-xs">Eliminar</button>
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
        <UsuarioForm
          initial={editing}
          onSave={handleSave}
          onClose={() => { setFormOpen(false); setEditing(null); }}
        />
      )}

      <ConfirmDialog
        open={deleteId !== null}
        message="¿Eliminar este usuario? Esta acción no se puede deshacer."
        onConfirm={handleDelete}
        onCancel={() => setDeleteId(null)}
      />
    </div>
  );
}
