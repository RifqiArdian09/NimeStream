import Container from "@/components/ui/Container";
import { api } from "@/lib/api";
import Link from "next/link";
import Image from "next/image";
import { BASE_URL } from "@/lib/api";

async function getData(slug: string) {
  return api<any>(`/anime/anime/${encodeURIComponent(slug)}`);
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const raw = await getData(slug);
  const data = raw?.data || raw; // some endpoints nest under data
  const title = data?.title || data?.name || data?.anime_title || slug;
  let thumb: string | undefined = data?.thumbnail || data?.poster || data?.image;
  if (typeof thumb === "string") {
    if (thumb.startsWith("//")) thumb = `https:${thumb}`;
    if (thumb.startsWith("/")) thumb = `${BASE_URL}${thumb}`;
  }
  const summary = data?.synopsis || data?.description || data?.summary || "";
  const rawEpisodes: any[] = Array.isArray(data?.episodes)
    ? data.episodes
    : Array.isArray(data?.episode_list)
    ? data.episode_list
    : Array.isArray(data?.episode_lists)
    ? data.episode_lists
    : Array.isArray(data?.eps)
    ? data.eps
    : [];

  return (
    <Container>
      <div className="mb-6 flex flex-col gap-4 md:flex-row">
        {thumb && (
          <div className="relative h-64 w-48 shrink-0 overflow-hidden rounded-md border">
            <Image src={thumb} alt={title} fill className="object-cover" />
          </div>
        )}
        <div className="flex-1">
          <h1 className="mb-2 text-2xl font-semibold tracking-tight">{title}</h1>
          {summary && <p className="whitespace-pre-line text-sm opacity-80">{summary}</p>}
        </div>
      </div>
      <h2 className="mb-3 text-lg font-medium">Episodes</h2>
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
        {rawEpisodes.map((ep: any, i: number) => {
          const epSlug = ep?.slug || ep?.link?.split("/")?.pop() || ep?.url?.split?.("/")?.pop?.() || `ep-${i}`;
          const label = ep?.title || ep?.name || ep?.episode || `Episode ${ep?.episode_number || i + 1}`;
          return (
            <Link key={epSlug} href={`/episode/${epSlug}`} className="rounded-md border p-2 text-sm hover:bg-white/5">
              {label}
            </Link>
          );
        })}
      </div>
    </Container>
  );
}
