import Container from "@/components/ui/Container";
import AnimeCard from "@/components/AnimeCard";
import { api, AnimeItem } from "@/lib/api";
import Pagination from "@/components/Pagination";
import { collectAnimeList } from "@/lib/parser";
import SearchBar from "@/components/SearchBar";

async function getData(page: string) {
  return api<any>(`/anime/complete-anime/${encodeURIComponent(page)}`);
}

function pickList(obj: any): AnimeItem[] {
  return collectAnimeList(obj);
}

export default async function Page({ params }: { params: Promise<{ page: string }> }) {
  const { page: pageParam } = await params;
  const page = pageParam || "1";
  const data = await getData(page);
  const items = pickList(data);
  return (
    <Container>
      <SearchBar />
      <h1 className="mb-4 text-2xl font-semibold tracking-tight">Completed</h1>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
        {items.map((it: AnimeItem, i: number) => (
          <AnimeCard key={(it.slug || it.title || i).toString()} item={it} />
        ))}
      </div>
      <Pagination basePath="/complete" current={parseInt(page, 10) || 1} />
    </Container>
  );
}
