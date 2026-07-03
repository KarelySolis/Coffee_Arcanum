"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import api from "@/lib/axios";

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function LoginModal({ isOpen, onClose }: LoginModalProps) {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!username.trim() || !password.trim()) {
      setError("Por favor, ingrese usuario y contraseña.");
      return;
    }

    setLoading(true);
    try {
      const res = await api.post("/api/v1/usuarios/login", {
        NombreUsuario: username,
        Contrasena: password,
      });

      // Guardar información del usuario
      const userData = res.data.data;
      localStorage.setItem("user", JSON.stringify(userData));

      // Cerrar modal e ingresar al dashboard
      onClose();
      router.push("/admin");
    } catch (err: any) {
      if (err.response?.status === 401 || err.response?.status === 422) {
        setError("No es un usuario válido.");
        alert("No es un usuario válido.");
      } else {
        setError("Error al iniciar sesión. Inténtelo de nuevo.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    onClose();
    router.push("/");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#3a2a1a]/60 backdrop-blur-md p-4 animate-fade-in">
      <div className="bg-[#fdfaf5] border border-[#8c5a3c]/20 rounded-2xl p-8 w-full max-w-md shadow-2xl text-[#3a2a1a] transition-all duration-300 transform scale-100 flex flex-col gap-6">
        
        {/* Header */}
        <div className="flex justify-between items-center border-b border-[#3a2a1a]/10 pb-4">
          <div className="flex flex-col">
            <h2 className="text-[#8c5a3c] text-2xl font-bold tracking-wide font-serif">Arcanum Control</h2>
            <p className="text-xs text-[#5c4a3a] mt-1 font-light">Acceso al Panel de Administración</p>
          </div>
          <button 
            onClick={handleCancel} 
            className="text-[#5c4a3a] hover:text-[#8c5a3c] text-xl transition-colors p-1"
            aria-label="Cerrar"
          >
            ✕
          </button>
        </div>

        {/* Error message */}
        {error && (
          <div className="bg-red-50 border-l-4 border-red-500 p-3 rounded text-red-700 text-xs font-medium">
            {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          {/* Usuario Input */}
          <div className="flex flex-col gap-1.5">
            <label htmlFor="username" className="text-xs font-semibold uppercase tracking-wider text-[#8c5a3c]">
              Usuario
            </label>
            <input
              id="username"
              type="text"
              placeholder="Ingresa tu usuario"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full bg-[#fdfaf5] border border-[#3a2a1a]/20 rounded-lg px-4 py-3 text-sm text-[#3a2a1a] placeholder-[#3a2a1a]/40 focus:outline-none focus:border-[#8c5a3c] focus:ring-1 focus:ring-[#8c5a3c] transition-all"
            />
          </div>

          {/* Contraseña Input */}
          <div className="flex flex-col gap-1.5 relative">
            <label htmlFor="password" className="text-xs font-semibold uppercase tracking-wider text-[#8c5a3c]">
              Contraseña
            </label>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-[#fdfaf5] border border-[#3a2a1a]/20 rounded-lg pl-4 pr-11 py-3 text-sm text-[#3a2a1a] placeholder-[#3a2a1a]/40 focus:outline-none focus:border-[#8c5a3c] focus:ring-1 focus:ring-[#8c5a3c] transition-all"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-[#5c4a3a] hover:text-[#8c5a3c] transition-colors"
                aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
              >
                {showPassword ? (
                  // Eye Slash Icon
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
                  </svg>
                ) : (
                  // Eye Icon
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                )}
              </button>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4 mt-4">
            <button
              type="button"
              onClick={handleCancel}
              className="flex-1 px-5 py-3 border border-[#3a2a1a]/20 text-[#3a2a1a] rounded-lg font-semibold hover:bg-[#3a2a1a]/5 transition-colors text-sm"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 px-5 py-3 bg-[#8c5a3c] text-[#fdfaf5] rounded-lg font-semibold hover:bg-[#7a4e34] transition-colors disabled:opacity-50 text-sm shadow-md"
            >
              {loading ? "Ingresando..." : "Ingresar"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
