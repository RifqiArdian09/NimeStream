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

export default async function Page() {
  return (
    <Container>
      <Suspense fallback={null}>
        <SearchBar />
      </Suspense>
      <Section title="Search">
        <Empty>Enter a keyword in the search bar</Empty>
      </Section>
    </Container>
  );
}
