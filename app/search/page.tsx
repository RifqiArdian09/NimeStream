import Container from "@/components/ui/Container";
import AnimeCard from "@/components/AnimeCard";
import { api, AnimeItem } from "@/lib/api";

async function getData(q: string) {
  return api<any>(`/anime/search/${encodeURIComponent(q)}`);
}

function pickList(obj: any): AnimeItem[] {
  if (!obj) return [];
  if (Array.isArray(obj)) return obj;
  const keys = ["items", "data", "list", "result"];
  for (const k of keys) if (Array.isArray(obj[k])) return obj[k];
  const merged: AnimeItem[] = [];
  Object.values(obj).forEach((v: any) => Array.isArray(v) && merged.push(...(v as AnimeItem[])));
  return merged;
}

export default async function Page({ searchParams }: { searchParams: Promise<{ q?: string }> }) {
  const { q: qParam } = await searchParams;
  const q = (qParam || "").toString();
  const data = q ? await getData(q) : null;
  const items = pickList(data);
  return (
    <Container>
      <h1 className="mb-4 text-2xl font-semibold tracking-tight">Search</h1>
      {!q && <div className="rounded-md border p-4 text-sm opacity-70">Enter a keyword in the search bar</div>}
      {q && (
        <>
          <p className="mb-3 text-sm opacity-70">Results for: {q}</p>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
            {items.map((it: AnimeItem, i: number) => (
              <AnimeCard key={(it.slug || it.title || i).toString()} item={it} />
            ))}
          </div>
        </>
      )}
    </Container>
  );
}
