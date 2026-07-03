"use client";

import { useState } from "react";
import { Contacto, ContactoCreate } from "@/types";

interface Props {
  initial: Contacto | null;
  onSave: (values: ContactoCreate) => Promise<void>;
  onClose: () => void;
}

export default function ContactoForm({ initial, onSave, onClose }: Props) {
  const [form, setForm] = useState<ContactoCreate>({
    Nombre: initial?.Nombre ?? "",
    Email: initial?.Email ?? "",
    Mensaje: initial?.Mensaje ?? "",
  });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError("");
    try {
      await onSave(form);
    } catch (err: any) {
      setError(err?.response?.data?.error?.message ?? "Error al guardar");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#3a2a1a]/45 backdrop-blur-sm p-4">
      <div className="bg-[#fdfaf5] border border-[#8c5a3c]/20 rounded-2xl p-6 w-full max-w-md shadow-2xl text-[#3a2a1a]">
        <div className="flex justify-between items-center mb-5">
          <h2 className="text-[#8c5a3c] font-serif font-bold text-xl">{initial ? "Editar Contacto" : "Nuevo Contacto"}</h2>
          <button onClick={onClose} className="text-[#5c4a3a] hover:text-[#8c5a3c] text-xl transition-colors">✕</button>
        </div>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <label className="text-[#8c5a3c] text-xs font-semibold uppercase tracking-wider">Nombre</label>
            <input type="text" required value={form.Nombre}
              onChange={e => setForm({ ...form, Nombre: e.target.value })}
              className="w-full bg-[#fdfaf5] border border-[#3a2a1a]/20 rounded-lg px-4 py-2.5 text-sm text-[#3a2a1a] focus:outline-none focus:border-[#8c5a3c] focus:ring-1 focus:ring-[#8c5a3c] transition-all"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-[#8c5a3c] text-xs font-semibold uppercase tracking-wider">Email</label>
            <input type="email" required value={form.Email}
              onChange={e => setForm({ ...form, Email: e.target.value })}
              className="w-full bg-[#fdfaf5] border border-[#3a2a1a]/20 rounded-lg px-4 py-2.5 text-sm text-[#3a2a1a] focus:outline-none focus:border-[#8c5a3c] focus:ring-1 focus:ring-[#8c5a3c] transition-all"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-[#8c5a3c] text-xs font-semibold uppercase tracking-wider">Mensaje</label>
            <textarea required rows={3} value={form.Mensaje}
              onChange={e => setForm({ ...form, Mensaje: e.target.value })}
              className="w-full bg-[#fdfaf5] border border-[#3a2a1a]/20 rounded-lg px-4 py-2.5 text-sm text-[#3a2a1a] focus:outline-none focus:border-[#8c5a3c] focus:ring-1 focus:ring-[#8c5a3c] transition-all resize-none"
            />
          </div>
          {error && <p className="text-red-600 text-sm font-medium">{error}</p>}
          <div className="flex gap-3 justify-end mt-2">
            <button type="button" onClick={onClose} className="px-5 py-2.5 border border-[#3a2a1a]/20 text-[#3a2a1a] rounded-lg font-semibold hover:bg-[#3a2a1a]/5 transition-colors text-sm">Cancelar</button>
            <button type="submit" disabled={saving} className="px-5 py-2.5 bg-[#8c5a3c] text-[#fdfaf5] rounded-lg font-semibold hover:bg-[#7a4e34] transition-colors disabled:opacity-50 text-sm shadow-md">
              {saving ? "Guardando..." : "Guardar"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
