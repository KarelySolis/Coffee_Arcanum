"use client";

import { useState, useEffect } from "react";
import api from "@/lib/axios";
import LoginModal from "./LoginModal";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [formOpen, setFormOpen] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);
  const [form, setForm] = useState({ Nombre: "", Email: "", Mensaje: "" });

  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      if (params.get("login") === "true") {
        setLoginOpen(true);
        // Limpiar el parámetro de la URL
        const newUrl = window.location.pathname;
        window.history.replaceState({}, "", newUrl);
      }
    }
  }, []);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">( "idle" );

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

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
    <>
      <header className="fixed top-0 left-0 right-0 z-40 bg-[#8c5a3c] shadow-md border-b border-[#3a2a1a]/10">
        <div className="max-w-6xl mx-auto px-6 h-20 flex items-center justify-between">
          <span className="text-[#fdfaf5] font-semibold text-lg tracking-[0.15em]">
            ARCANUM COFFEE CO.
          </span>

          <nav className="hidden md:flex items-center gap-8 text-xs uppercase tracking-[0.2em] font-medium text-[#fdfaf5]/80">
            <button onClick={() => scrollTo("hero")} className="hover:text-[#fdfaf5] transition-colors">Inicio</button>
            <button onClick={() => scrollTo("about")} className="hover:text-[#fdfaf5] transition-colors">Nosotros</button>
            <button onClick={() => scrollTo("menu")} className="hover:text-[#fdfaf5] transition-colors">Menú</button>
            <button onClick={() => setLoginOpen(true)} className="hover:text-[#fdfaf5] transition-colors">Admin</button>
            <button
              onClick={() => setFormOpen(true)}
              className="px-5 py-2.5 bg-[#fdfaf5] text-[#8c5a3c] rounded-md font-semibold hover:bg-[#fdfaf5]/90 transition-all duration-300 shadow-sm"
            >
              Contacto
            </button>
          </nav>

          <button
            className="md:hidden text-[#fdfaf5]"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Menú"
          >
            <span className="text-xl font-light">{menuOpen ? "✕" : "☰"}</span>
          </button>
        </div>

        {menuOpen && (
          <div className="md:hidden bg-[#8c5a3c] border-t border-[#3a2a1a]/10 px-6 py-6 flex flex-col gap-5 text-sm uppercase tracking-[0.15em] font-medium text-[#fdfaf5]/80">
            <button onClick={() => scrollTo("hero")} className="text-left hover:text-[#fdfaf5]">Inicio</button>
            <button onClick={() => scrollTo("about")} className="text-left hover:text-[#fdfaf5]">Nosotros</button>
            <button onClick={() => scrollTo("menu")} className="text-left hover:text-[#fdfaf5]">Menú</button>
            <button onClick={() => { setLoginOpen(true); setMenuOpen(false); }} className="text-left hover:text-[#fdfaf5]">Admin</button>
            <button
              onClick={() => { setFormOpen(true); setMenuOpen(false); }}
              className="text-left text-[#fdfaf5] font-semibold"
            >
              Contacto
            </button>
          </div>
        )}
      </header>

      {formOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#3a2a1a]/45 backdrop-blur-sm p-4">
          <div className="bg-[#fdfaf5] border border-[#3a2a1a]/10 rounded-xl p-8 w-full max-w-md shadow-xl text-[#3a2a1a]">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-[#8c5a3c] text-xl font-semibold tracking-wide">Contáctanos</h2>
              <button 
                onClick={() => { setFormOpen(false); setStatus("idle"); }} 
                className="text-[#5c4a3a] hover:text-[#3a2a1a] text-lg"
              >
                ✕
              </button>
            </div>

            {status === "success" ? (
              <div className="text-center py-6">
                <p className="text-[#2a3c2a] text-lg font-medium mb-2">¡Mensaje enviado!</p>
                <p className="text-[#5c4a3a] text-sm font-light">Nos pondremos en contacto contigo pronto.</p>
                <button 
                  onClick={() => { setFormOpen(false); setStatus("idle"); }} 
                  className="mt-6 px-6 py-2.5 bg-[#8c5a3c] text-[#fdfaf5] rounded-md font-semibold hover:bg-[#7a4e34] transition-colors"
                >
                  Cerrar
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <input
                  type="text" placeholder="Tu nombre" required value={form.Nombre}
                  onChange={e => setForm({ ...form, Nombre: e.target.value })}
                  className="bg-transparent border border-[#3a2a1a]/20 rounded-md px-4 py-3 text-[#3a2a1a] placeholder-[#3a2a1a]/40 focus:outline-none focus:border-[#8c5a3c] transition-colors text-sm"
                />
                <input
                  type="email" placeholder="Tu correo" required value={form.Email}
                  onChange={e => setForm({ ...form, Email: e.target.value })}
                  className="bg-transparent border border-[#3a2a1a]/20 rounded-md px-4 py-3 text-[#3a2a1a] placeholder-[#3a2a1a]/40 focus:outline-none focus:border-[#8c5a3c] transition-colors text-sm"
                />
                <textarea
                  placeholder="Tu mensaje" required rows={4} value={form.Mensaje}
                  onChange={e => setForm({ ...form, Mensaje: e.target.value })}
                  className="bg-transparent border border-[#3a2a1a]/20 rounded-md px-4 py-3 text-[#3a2a1a] placeholder-[#3a2a1a]/40 focus:outline-none focus:border-[#8c5a3c] transition-colors text-sm resize-none"
                />
                {status === "error" && <p className="text-red-700 text-xs font-medium">Error al enviar. Intenta de nuevo.</p>}
                
                <button
                  type="submit" disabled={status === "loading"}
                  className="px-6 py-3 bg-[#8c5a3c] text-[#fdfaf5] rounded-md font-semibold hover:bg-[#7a4e34] transition-all disabled:opacity-50 tracking-wide text-sm mt-2 shadow-sm"
                >
                  {status === "loading" ? "Enviando..." : "Enviar mensaje"}
                </button>
              </form>
            )}
          </div>
        </div>
      )}
      <LoginModal isOpen={loginOpen} onClose={() => setLoginOpen(false)} />
    </>
  );
}