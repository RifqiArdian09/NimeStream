import Container from "@/components/ui/Container";
import AnimeCard from "@/components/AnimeCard";
import { api, AnimeItem } from "@/lib/api";
import { collectAnimeList } from "@/lib/parser";
import SearchBar from "@/components/SearchBar";
import Section from "@/components/ui/Section";
import Empty from "@/components/ui/Empty";

async function getData(page?: string) {
  const qs = page ? `?page=${encodeURIComponent(page)}` : "";
  return api<any>(`/anime/ongoing-anime${qs}`);
}

function pickList(obj: any): AnimeItem[] {
  return collectAnimeList(obj);
}

export default async function Page({ searchParams }: { searchParams: Promise<{ page?: string }> }) {
  try {
    const { page } = await searchParams;
    const data = await getData(page);
    const allItems = pickList(data);
    const items = allItems.slice(0, 30); // Limit to 30 items
    return (
      <Container>
        <SearchBar />
        <Section title="Anime Ongoing">
          {items?.length ? (
            <div className="grid grid-cols-2 gap-3 sm:gap-4 md:gap-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7">
              {items.map((it: AnimeItem, i: number) => (
                <AnimeCard key={(it.slug || it.title || i).toString()} item={it} />
              ))}
            </div>
          ) : (
            <Empty>Tidak ada anime ongoing</Empty>
          )}
        </Section>
      </Container>
    );
  } catch (error) {
    console.error('Ongoing page error:', error);
    return (
      <Container>
        <SearchBar />
        <Section title="Anime Ongoing">
          <Empty>Terjadi kesalahan saat memuat data</Empty>
        </Section>
      </Container>
    );
  }
}
