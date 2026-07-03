import MetricCard from "@/components/admin/MetricCard";
import { getContactosTotal } from "@/lib/api/contactos";
import { getNewslettersTotal } from "@/lib/api/newsletter";
import { getUsuariosTotal } from "@/lib/api/usuarios";

export default async function AdminDashboard() {
  const [contactosTotal, newslettersTotal, usuariosTotal] = await Promise.all([
    getContactosTotal(),
    getNewslettersTotal(),
    getUsuariosTotal(),
  ]);

  return (
    <div>
      <h1 className="text-2xl font-bold text-stone-100 mb-2">Dashboard</h1>
      <p className="text-stone-500 mb-8">Resumen general de Arcanum Coffee</p>

      <div className="grid sm:grid-cols-3 gap-6">
        <MetricCard label="Total Contactos" value={contactosTotal} icon="📋" />
        <MetricCard label="Total Newsletter" value={newslettersTotal} icon="�" />
        <MetricCard label="Total Usuarios" value={usuariosTotal} icon="🔑" />
      </div>
    </div>
  );
}
