import Container from "@/components/ui/Container";
import AnimeCard from "@/components/AnimeCard";
import { api, AnimeItem } from "@/lib/api";
import SearchBar from "@/components/SearchBar";
import Section from "@/components/ui/Section";
import Empty from "@/components/ui/Empty";
import Hero from "@/components/Hero";
import { Suspense } from "react";

async function getHome() {
  const data = await api<any>("/anime/home", { cache: "force-cache", next: { revalidate: 3600 } });
  return data;
}

function normalizeItem(v: any): AnimeItem {
  let rawSlug: any = v?.slug || v?.link;
  let slug: string | undefined = undefined;
  if (typeof rawSlug === "string") {
    if (rawSlug.includes("://") || rawSlug.includes("/")) {
      const parts = rawSlug.split("/").filter(Boolean);
      slug = parts.pop();
    } else {
      slug = rawSlug;
    }
  }
  return {
    title: v?.title || v?.name || v?.anime_title,
    slug,
    thumbnail: v?.thumbnail || v?.poster || v?.image || v?.thumb || v?.img || v?.cover,
    episode: v?.episode || v?.current_episode || v?.latest_episode,
    status: v?.status,
    score: v?.score,
    type: v?.type,
    release: v?.release || v?.newest_release_date,
  } as AnimeItem;
}

function deepCollect(obj: any, acc: any[] = []): any[] {
  if (!obj) return acc;
  if (Array.isArray(obj)) {
    acc.push(...obj);
    return acc;
  }
  if (typeof obj === "object") {
    for (const value of Object.values(obj)) {
      deepCollect(value, acc);
    }
  }
  return acc;
}

function pickList(obj: any): AnimeItem[] {
  const raw = deepCollect(obj).filter((x) => typeof x === "object");
  // Heuristic: keep entries that look like anime
  const items = raw.filter((x: any) => x?.slug || x?.title || x?.poster || x?.thumbnail);
  return items.map(normalizeItem);
}

export default async function Home() {
  try {
    const home = await getHome();
    const allItems = pickList(home);
    const items = allItems.slice(0, 30); // Limit to 30 items
    
    return (
      <Container>
        <Hero />
        <div className="mt-8 sm:mt-10 md:mt-12">
          <Suspense fallback={null}>
            <SearchBar placeholder="Cari anime..." />
          </Suspense>
        </div>
        <Section title="Home">
          {items?.length ? (
            <div className="grid grid-cols-2 gap-3 sm:gap-4 md:gap-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7">
              {items.map((it: AnimeItem, i: number) => (
                <AnimeCard key={(it.slug || it.title || i).toString()} item={it} priority={i < 6} />
              ))}
            </div>
          ) : (
            <Empty />
          )}
        </Section>
      </Container>
    );
  } catch (error) {
    console.error('Home page error:', error);
    return (
      <Container>
        <Hero />
        <div className="mt-8 sm:mt-10 md:mt-12">
          <Suspense fallback={null}>
            <SearchBar placeholder="Cari anime..." />
          </Suspense>
        </div>
        <Section title="Home">
          <Empty>Terjadi kesalahan saat memuat data</Empty>
        </Section>
      </Container>
    );
  }
}

