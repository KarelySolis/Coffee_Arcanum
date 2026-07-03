"use client";

import { useState } from "react";
import api from "@/lib/axios";

export default function NewsletterSection() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    try {
      // Ajusta la ruta del endpoint según tu API local
      await api.post("/api/v1/newsletter/", { Email: email });
      setStatus("success");
      setEmail("");
    } catch {
      setStatus("error");
    }
  };

  return (
    <section id="newsletter" className="bg-[#2a3c2a] py-20 px-6 border-b border-[#3a2a1a]/10">
      <div className="max-w-3xl mx-auto text-center">
        <p className="text-[#b79b8c] uppercase tracking-[0.25em] text-xs mb-3 font-semibold">
          Boletín Arcanum
        </p>
        <h2 className="text-3xl md:text-4xl font-semibold text-[#fdfaf5] mb-4 tracking-tight">
          Únete a nuestro club de café
        </h2>
        <p className="text-[#fdfaf5]/80 mb-8 max-w-md mx-auto font-light text-sm md:text-base">
          Recibe recetas exclusivas, notas de nuestros baristas y acceso anticipado a lotes de edición limitada.
        </p>

        {status === "success" ? (
          <div className="text-[#fdfaf5] py-4 font-medium animate-fade-in">
            <p className="text-lg">✨ ¡Gracias por suscribirte!</p>
            <p className="text-xs text-[#fdfaf5]/70 mt-1">Pronto recibirás nuestras mejores historias cafeteras.</p>
          </div>
        ) : (
          <form onSubmit={handleSubscribe} className="max-w-md mx-auto flex flex-col sm:flex-row gap-3">
            <div className="relative flex-grow">
              <input
                type="email"
                required
                placeholder="Tu correo electrónico"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={status === "loading"}
                className="w-full bg-[#fdfaf5] border border-transparent rounded-md px-4 py-3 text-[#3a2a1a] placeholder-[#3a2a1a]/40 focus:outline-none focus:border-[#8c5a3c] transition-colors text-sm"
              />
            </div>
            <button
              type="submit"
              disabled={status === "loading"}
              className="px-6 py-3 bg-[#8c5a3c] text-[#fdfaf5] rounded-md font-semibold hover:bg-[#7a4e34] active:bg-[#633f2a] transition-all disabled:opacity-50 text-sm whitespace-nowrap tracking-wide shadow-md"
            >
              {status === "loading" ? "Suscribiendo..." : "Suscribirse"}
            </button>
          </form>
        )}
        
        {status === "error" && (
          <p className="text-[#fdfaf5] text-xs font-medium mt-3 bg-red-900/30 py-1.5 px-3 rounded inline-block">
            Hubo un problema. Por favor, intenta de nuevo.
          </p>
        )}
      </div>
    </section>
  );
}