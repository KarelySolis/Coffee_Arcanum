"use client";

import { useState } from "react";
import api from "@/lib/axios";

export default function ContactoSection() {
  const [form, setForm] = useState({ Nombre: "", Email: "", Mensaje: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error" >("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    try {
      await api.post("/api/v1/contactos/", form);
      setStatus("success");
      setForm({ Nombre: "", Email: "", Mensaje: "" });
    } catch {
      setStatus("error");
    }
  };

  return (
    <section id="contacto" className="bg-[#5c4a3a] py-24 px-6">
      <div className="max-w-xl mx-auto text-center">
        <p className="text-[#b79b8c] uppercase tracking-[0.25em] text-xs mb-3 font-semibold">
          Escríbenos
        </p>
        <h2 className="text-4xl font-semibold text-[#fdfaf5] mb-4 tracking-tight">
          ¿Quieres saber más?
        </h2>
        <p className="text-[#fdfaf5]/80 mb-12 font-light">
          Déjanos tus datos y un barista se pondrá en contacto contigo.
        </p>

        {status === "success" ? (
          <div className="bg-[#fdfaf5] rounded-xl p-10 shadow-xl shadow-black/20">
            <p className="text-[#2a3c2a] text-2xl font-medium mb-2">¡Mensaje recibido!</p>
            <p className="text-[#5c4a3a] font-light">Nos pondremos en contacto contigo muy pronto.</p>
            <button 
              onClick={() => setStatus("idle")} 
              className="mt-6 px-6 py-2.5 bg-[#8c5a3c] text-[#fdfaf5] rounded-md font-semibold hover:bg-[#7a4e34] transition-colors duration-300 text-sm tracking-wide shadow-sm"
            >
              Enviar otro
            </button>
          </div>
        ) : (
          <form 
            onSubmit={handleSubmit} 
            className="bg-[#fdfaf5] rounded-xl p-8 flex flex-col gap-5 text-left shadow-xl shadow-black/20 border border-[#3a2a1a]/10"
          >
            <div>
              <label className="text-[#3a2a1a] text-xs uppercase tracking-wider font-medium mb-1.5 block">
                Nombre
              </label>
              <input 
                type="text" 
                required 
                value={form.Nombre}
                onChange={e => setForm({ ...form, Nombre: e.target.value })}
                className="w-full bg-transparent border border-[#3a2a1a]/20 rounded-md px-4 py-3 text-[#3a2a1a] placeholder-[#3a2a1a]/40 focus:outline-none focus:border-[#8c5a3c] transition-colors text-sm"
                placeholder="Tu nombre completo"
              />
            </div>
            
            <div>
              <label className="text-[#3a2a1a] text-xs uppercase tracking-wider font-medium mb-1.5 block">
                Correo
              </label>
              <input 
                type="email" 
                required 
                value={form.Email}
                onChange={e => setForm({ ...form, Email: e.target.value })}
                className="w-full bg-transparent border border-[#3a2a1a]/20 rounded-md px-4 py-3 text-[#3a2a1a] placeholder-[#3a2a1a]/40 focus:outline-none focus:border-[#8c5a3c] transition-colors text-sm"
                placeholder="tu@correo.com"
              />
            </div>
            
            <div>
              <label className="text-[#3a2a1a] text-xs uppercase tracking-wider font-medium mb-1.5 block">
                Mensaje
              </label>
              <textarea 
                required 
                rows={4} 
                value={form.Mensaje}
                onChange={e => setForm({ ...form, Mensaje: e.target.value })}
                className="w-full bg-transparent border border-[#3a2a1a]/20 rounded-md px-4 py-3 text-[#3a2a1a] placeholder-[#3a2a1a]/40 focus:outline-none focus:border-[#8c5a3c] transition-colors text-sm resize-none"
                placeholder="¿En qué podemos ayudarte?"
              />
            </div>
            
            {status === "error" && (
              <p className="text-red-700 text-xs font-medium">
                Error al enviar. Por favor intenta de nuevo.
              </p>
            )}
            
            <button 
              type="submit" 
              disabled={status === "loading"}
              className="px-6 py-3.5 bg-[#8c5a3c] text-[#fdfaf5] rounded-md font-semibold hover:bg-[#7a4e34] transition-all disabled:opacity-50 text-center tracking-wide text-sm mt-2 shadow-sm"
            >
              {status === "loading" ? "Enviando..." : "Enviar mensaje"}
            </button>
          </form>
        )}
      </div>
    </section>
  );
}