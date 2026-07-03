"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

const links = [
  { href: "/admin", label: "Dashboard", icon: "📊" },
  { href: "/admin/contactos", label: "Contactos", icon: "📋" },
  { href: "/admin/newsletter", label: "Newsletter", icon: "✉️" },
  { href: "/admin/usuarios", label: "Usuarios", icon: "🔑" },
];

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("user");
    router.push("/");
  };

  return (
    <aside className="w-56 min-h-screen bg-stone-900 border-r border-stone-800 flex flex-col justify-between py-6">
      <div>
        <div className="px-5 mb-8">
          <Link href="/" className="text-amber-400 font-bold text-lg">☕ Arcanum</Link>
          <p className="text-stone-500 text-xs mt-1">Panel de Administración</p>
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
                    ? "bg-amber-500/15 text-amber-400 font-medium"
                    : "text-stone-400 hover:bg-stone-800 hover:text-stone-200"
                }`}
              >
                <span>{link.icon}</span>
                {link.label}
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="px-2">
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-red-400 hover:bg-red-950/20 hover:text-red-300 transition text-left"
        >
          <span>🚪</span>
          Cerrar Sesión
        </button>
      </div>
    </aside>
  );
}
