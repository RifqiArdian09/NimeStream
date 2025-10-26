import Container from "@/components/ui/Container";
import AnimeCard from "@/components/AnimeCard";
import { api, AnimeItem } from "@/lib/api";
import SearchBar from "@/components/SearchBar";
import Section from "@/components/ui/Section";
import Empty from "@/components/ui/Empty";

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
  const allItems = pickList(data);
  const items = allItems.slice(0, 30); // Limit to 30 items
  return (
    <Container>
      <SearchBar />
      <Section title="Search">
        {!q ? (
          <Empty>Enter a keyword in the search bar</Empty>
        ) : items.length === 0 ? (
          <Empty>No results for “{q}”</Empty>
        ) : (
          <>
            <p className="mb-3 text-sm opacity-70">Results for: {q}</p>
            <div className="grid grid-cols-2 gap-3 sm:gap-4 md:gap-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7">
              {items.map((it: AnimeItem, i: number) => (
                <AnimeCard key={(it.slug || it.title || i).toString()} item={it} />
              ))}
            </div>
          </>
        )}
      </Section>
    </Container>
  );
}
