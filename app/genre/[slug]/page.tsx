import Container from "@/components/ui/Container";
import AnimeCard from "@/components/AnimeCard";
import Pagination from "@/components/Pagination";
import { api, AnimeItem } from "@/lib/api";
import { collectAnimeList } from "@/lib/parser";
import SearchBar from "@/components/SearchBar";
import Section from "@/components/ui/Section";
import Empty from "@/components/ui/Empty";
import { Suspense } from "react";

async function getData(slug: string, page?: string) {
  const qs = page ? `?page=${encodeURIComponent(page)}` : "";
  return api<any>(`/anime/genre/${encodeURIComponent(slug)}${qs}`, { cache: "force-cache", next: { revalidate: 3600 } });
}

function pickList(obj: any): AnimeItem[] {
  return collectAnimeList(obj);
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const data = await getData(slug);
  const allItems = pickList(data);
  const items = allItems.slice(0, 30); // Limit to 30 items
  return (
    <Container>
      <Suspense fallback={null}>
        <SearchBar />
      </Suspense>
      <Section title={`Genre: ${slug}`}>
        {items.length === 0 ? (
          <Empty>No anime</Empty>
        ) : (
          <div className="grid grid-cols-2 gap-3 sm:gap-4 md:gap-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7">
            {items.map((it: AnimeItem, i: number) => (
              <AnimeCard key={(it.slug || it.title || i).toString()} item={it} priority={i < 6} />
            ))}
          </div>
        )}
      </Section>
      <Pagination basePath={`/genre/${slug}`} current={1} mode="query" paramName="page" />
    </Container>
  );
}
