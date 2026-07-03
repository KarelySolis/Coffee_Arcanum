"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

const links = [
  { href: "/admin", label: "Dashboard", icon: "📊" },
  { href: "/admin/contactos", label: "Contactos", icon: "📋" },
  { href: "/admin/newsletter", label: "Newsletter", icon: "✉️" },
  { href: "/admin/usuarios", label: "Usuarios", icon: "🔑" },
];

interface UserProfile {
  NombreUsuario: string;
  TipoUsuario: string;
}

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [user, setUser] = useState<UserProfile | null>(null);

  useEffect(() => {
    const userStr = localStorage.getItem("user");
    if (userStr) {
      try {
        setUser(JSON.parse(userStr));
      } catch (e) {
        console.error("Error parsing user from localStorage", e);
      }
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    router.push("/");
  };

  return (
    <aside className="w-56 min-h-screen bg-[#f5ebd6] border-r border-[#3a2a1a]/10 flex flex-col justify-between py-6">
      <div>
        <div className="px-5 mb-8">
          <Link href="/" className="text-[#8c5a3c] font-serif font-bold text-xl">☕ Arcanum</Link>
          <p className="text-[#5c4a3a] text-xs mt-1">Panel de Administración</p>
        </div>
        <nav className="flex flex-col gap-1 px-2">
          {links.map(link => {
            const active = link.href === "/admin" ? pathname === "/admin" : pathname.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition ${
                  active
                    ? "bg-[#8c5a3c]/10 text-[#8c5a3c] font-semibold"
                    : "text-[#5c4a3a] hover:bg-[#3a2a1a]/5 hover:text-[#3a2a1a]"
                }`}
              >
                <span>{link.icon}</span>
                {link.label}
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="px-2 flex flex-col gap-3">
        {user && (
          <div className="mx-2 p-3 bg-white rounded-lg border border-[#8c5a3c]/15 text-xs shadow-sm">
            <p className="text-[#5c4a3a] text-[10px] uppercase tracking-wider">Conectado como</p>
            <p className="text-[#3a2a1a] font-semibold truncate mt-0.5">{user.NombreUsuario}</p>
            <span className={`inline-block mt-1.5 px-2 py-0.5 rounded text-[10px] font-semibold ${
              user.TipoUsuario === "Admin" ? "bg-[#8c5a3c]/15 text-[#8c5a3c]" : "bg-stone-200 text-stone-750"
            }`}>
              {user.TipoUsuario}
            </span>
          </div>
        )}
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-red-700 hover:bg-red-50 hover:text-red-800 transition text-left"
        >
          <span>🚪</span>
          Cerrar Sesión
        </button>
      </div>
    </aside>
  );
}
