import Container from "@/components/ui/Container";
import AnimeCard from "@/components/AnimeCard";
import { api, AnimeItem } from "@/lib/api";
import SearchBar from "@/components/SearchBar";
import Section from "@/components/ui/Section";
import Empty from "@/components/ui/Empty";
import { Suspense } from "react";

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

export default async function Page({
  searchParams,
}: {
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
}) {
  const sp = (await searchParams) || {};
  const q = (sp.q || "").toString().trim();

  let items: AnimeItem[] = [];
  if (q) {
    try {
      const data = await getData(q);
      items = pickList(data);
    } catch (e) {
      items = [];
    }
  }

  return (
    <Container>
      <Suspense fallback={null}>
        <SearchBar />
      </Suspense>
      <Section title="Search">
        {q ? (
          items && items.length ? (
            <div className="grid grid-cols-2 gap-3 sm:gap-4 md:gap-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7">
              {items.map((it: AnimeItem, i: number) => (
                <AnimeCard key={(it.slug || it.title || i).toString()} item={it} />
              ))}
            </div>
          ) : (
            <Empty>Tidak ada konten yang tersedia saat ini. Silakan coba lagi nanti atau jelajahi konten lainnya.</Empty>
          )
        ) : (
          <Empty>Enter a keyword in the search bar</Empty>
        )}
      </Section>
    </Container>
  );
}
