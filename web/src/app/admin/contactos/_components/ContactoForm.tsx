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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
      <div className="bg-stone-800 border border-stone-700 rounded-2xl p-6 w-full max-w-md shadow-2xl">
        <div className="flex justify-between items-center mb-5">
          <h2 className="text-stone-100 font-bold text-lg">{initial ? "Editar Contacto" : "Nuevo Contacto"}</h2>
          <button onClick={onClose} className="text-stone-400 hover:text-stone-200 text-xl">✕</button>
        </div>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label className="text-stone-400 text-sm mb-1 block">Nombre</label>
            <input type="text" required value={form.Nombre}
              onChange={e => setForm({ ...form, Nombre: e.target.value })}
              className="w-full bg-stone-900 border border-stone-600 rounded-lg px-3 py-2.5 text-stone-100 focus:outline-none focus:border-amber-500"
            />
          </div>
          <div>
            <label className="text-stone-400 text-sm mb-1 block">Email</label>
            <input type="email" required value={form.Email}
              onChange={e => setForm({ ...form, Email: e.target.value })}
              className="w-full bg-stone-900 border border-stone-600 rounded-lg px-3 py-2.5 text-stone-100 focus:outline-none focus:border-amber-500"
            />
          </div>
          <div>
            <label className="text-stone-400 text-sm mb-1 block">Mensaje</label>
            <textarea required rows={3} value={form.Mensaje}
              onChange={e => setForm({ ...form, Mensaje: e.target.value })}
              className="w-full bg-stone-900 border border-stone-600 rounded-lg px-3 py-2.5 text-stone-100 focus:outline-none focus:border-amber-500 resize-none"
            />
          </div>
          {error && <p className="text-red-400 text-sm">{error}</p>}
          <div className="flex gap-3 justify-end mt-2">
            <button type="button" onClick={onClose} className="px-4 py-2 bg-stone-700 text-stone-200 rounded-lg hover:bg-stone-600 transition">Cancelar</button>
            <button type="submit" disabled={saving} className="px-4 py-2 bg-amber-500 text-stone-950 rounded-lg font-semibold hover:bg-amber-400 transition disabled:opacity-50">
              {saving ? "Guardando..." : "Guardar"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
