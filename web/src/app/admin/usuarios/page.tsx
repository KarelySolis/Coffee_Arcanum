import { getUsuarios } from "@/lib/api/usuarios";
import UsuarioTable from "./_components/UsuarioTable";

export default async function UsuariosPage() {
  const { data, meta } = await getUsuarios(1, 10);
  return <UsuarioTable initialData={data} initialMeta={meta} />;
}
