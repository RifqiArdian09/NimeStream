import Container from "@/components/ui/Container";
import AnimeCard from "@/components/AnimeCard";
import Pagination from "@/components/Pagination";
import { api, AnimeItem } from "@/lib/api";
import { collectAnimeList } from "@/lib/parser";

async function getData(slug: string, page?: string) {
  const qs = page ? `?page=${encodeURIComponent(page)}` : "";
  return api<any>(`/anime/genre/${encodeURIComponent(slug)}${qs}`);
}

function pickList(obj: any): AnimeItem[] {
  return collectAnimeList(obj);
}

export default async function Page({ params, searchParams }: { params: Promise<{ slug: string }>, searchParams: Promise<{ page?: string }> }) {
  const { slug } = await params;
  const { page: pageParam } = await searchParams;
  const page = pageParam || "1";
  const data = await getData(slug, page);
  const items = pickList(data);
  return (
    <Container>
      <h1 className="mb-4 text-2xl font-semibold tracking-tight">Genre: {slug}</h1>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
        {items.map((it: AnimeItem, i: number) => (
          <AnimeCard key={(it.slug || it.title || i).toString()} item={it} />
        ))}
      </div>
      <Pagination basePath={`/genre/${slug}`} current={parseInt(page, 10) || 1} mode="query" paramName="page" />
    </Container>
  );
}
