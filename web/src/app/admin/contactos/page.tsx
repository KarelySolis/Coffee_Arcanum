import { getContactos } from "@/lib/api/contactos";
import ContactoTable from "./_components/ContactoTable";

export default async function ContactosPage() {
  const { data, meta } = await getContactos(1, 10);
  return <ContactoTable initialData={data} initialMeta={meta} />;
}
