import Container from "@/components/ui/Container";
import { api } from "@/lib/api";
import Link from "next/link";
import SearchBar from "@/components/SearchBar";
import Empty from "@/components/ui/Empty";
import Section from "@/components/ui/Section";

async function getGenres() {
  return api<any>(`/anime/genre`);
}

export default async function Page() {
  const data = await getGenres();
  const list: any[] = Array.isArray(data) ? data : data?.data || data?.genres || data?.list || [];
  return (
    <Container>
      <SearchBar />
      <Section title="Genres">
        {list.length === 0 ? (
          <Empty>No genres</Empty>
        ) : (
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
            {list.map((g: any, i: number) => {
              const slug = g?.slug || g?.value || g?.name?.toLowerCase?.().replace(/\s+/g, "-") || `g-${i}`;
              const name = g?.name || g?.title || g?.label || slug;
              return (
                <Link key={slug} href={`/genre/${slug}`} className="rounded-md border p-2 text-sm hover:bg-white/5">
                  {name}
                </Link>
              );
            })}
          </div>
        )}
      </Section>
    </Container>
  );
}
