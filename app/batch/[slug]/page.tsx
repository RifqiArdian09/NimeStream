import Container from "@/components/ui/Container";
import { api } from "@/lib/api";

async function getData(slug: string) {
  return api<any>(`/anime/batch/${encodeURIComponent(slug)}`);
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const data = await getData(slug);
  const links: any[] = Array.isArray(data?.links) ? data.links : (data?.downloads || data?.data || []);

  return (
    <Container>
      <h1 className="mb-4 text-2xl font-semibold tracking-tight">Batch Downloads</h1>
      {links.length === 0 && (
        <div className="rounded-md border p-4 text-sm opacity-70">No links</div>
      )}
      <ul className="space-y-2 text-sm">
        {links.map((l: any, i: number) => (
          <li key={i}>
            <a href={l?.url || l?.link} target="_blank" className="underline">
              {l?.label || l?.quality || l?.server || `Link ${i + 1}`}
            </a>
          </li>
        ))}
      </ul>
    </Container>
  );
}
