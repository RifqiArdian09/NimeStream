import Container from "@/components/ui/Container";
import AnimeCard from "@/components/AnimeCard";
import { api, AnimeItem } from "@/lib/api";
import { collectAnimeList } from "@/lib/parser";
import SearchBar from "@/components/SearchBar";
import Section from "@/components/ui/Section";
import Empty from "@/components/ui/Empty";

async function getData() {
  return api<any>(`/anime/unlimited`);
}

function pickList(obj: any): AnimeItem[] {
  return collectAnimeList(obj);
}

export default async function Page() {
  const data = await getData();
  const items = pickList(data);
  return (
    <Container>
      <SearchBar />
      <Section title="All Anime">
        {items.length === 0 ? (
          <Empty>No anime</Empty>
        ) : (
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
            {items.map((it: AnimeItem, i: number) => (
              <AnimeCard key={(it.slug || it.title || i).toString()} item={it} />
            ))}
          </div>
        )}
      </Section>
    </Container>
  );
}
