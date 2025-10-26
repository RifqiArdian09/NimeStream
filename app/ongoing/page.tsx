import Container from "@/components/ui/Container";
import AnimeCard from "@/components/AnimeCard";
import { api, AnimeItem } from "@/lib/api";
import { collectAnimeList } from "@/lib/parser";

async function getData(page?: string) {
  const qs = page ? `?page=${encodeURIComponent(page)}` : "";
  return api<any>(`/anime/ongoing-anime${qs}`);
}

function pickList(obj: any): AnimeItem[] {
  return collectAnimeList(obj);
}

export default async function Page({ searchParams }: { searchParams: Promise<{ page?: string }> }) {
  const { page } = await searchParams;
  const data = await getData(page);
  const items = pickList(data);
  return (
    <Container>
      <h1 className="mb-4 text-2xl font-semibold tracking-tight">Ongoing</h1>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
        {items.map((it: AnimeItem, i: number) => (
          <AnimeCard key={(it.slug || it.title || i).toString()} item={it} />
        ))}
      </div>
    </Container>
  );
}
