import { getNewsletters } from "@/lib/api/newsletter";
import NewsletterTable from "./_components/NewsletterTable";

export default async function NewsletterPage() {
  const { data, meta } = await getNewsletters(1, 10);
  return <NewsletterTable initialData={data} initialMeta={meta} />;
}
