import Container from "@/components/ui/Container";
import { api } from "@/lib/api";
import Link from "next/link";
import Image from "next/image";
import { BASE_URL } from "@/lib/api";
import Section from "@/components/ui/Section";
import Empty from "@/components/ui/Empty";
import { Button } from "@/components/ui/button";
import { PlayIcon, InfoIcon, CalendarIcon, StarIcon } from "lucide-react";
import BackButton from "@/components/BackButton";

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

  // Extract additional metadata
  const status = data?.status || data?.type || "";
  const year = data?.year || data?.release_year || "";
  const genre = data?.genre || data?.genres || [];
  const rating = data?.rating || data?.score || "";
  const totalEpisodes = rawEpisodes.length || data?.total_episodes || "";

  return (
    <Container>
      {/* Back Button */}
      <div className="mb-6">
        <BackButton />
      </div>
      
      {/* Hero Section */}
      <div className="mb-8 overflow-hidden rounded-2xl border bg-gradient-to-r from-background to-accent/5 p-6 md:p-8">
        <div className="flex flex-col gap-6 md:flex-row">
          {thumb && (
            <div className="relative h-80 w-60 shrink-0 overflow-hidden rounded-xl border shadow-lg">
              <Image src={thumb} alt={title} fill className="object-cover" />
            </div>
          )}
          
          <div className="flex-1 space-y-4">
            <div>
              <h1 className="mb-2 text-3xl font-bold tracking-tight md:text-4xl">{title}</h1>
              
              {/* Metadata */}
              <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                {status && (
                  <div className="flex items-center gap-1">
                    <InfoIcon className="size-4" />
                    <span>{status}</span>
                  </div>
                )}
                {year && (
                  <div className="flex items-center gap-1">
                    <CalendarIcon className="size-4" />
                    <span>{year}</span>
                  </div>
                )}
                {rating && (
                  <div className="flex items-center gap-1">
                    <StarIcon className="size-4 fill-yellow-400 text-yellow-400" />
                    <span>{rating}</span>
                  </div>
                )}
                {totalEpisodes && (
                  <span>{totalEpisodes} Episode{totalEpisodes > 1 ? 's' : ''}</span>
                )}
              </div>
            </div>

            {/* Genres */}
            {Array.isArray(genre) && genre.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {genre.slice(0, 6).map((g: any, i: number) => (
                  <span key={i} className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium">
                    {typeof g === 'string' ? g : g?.name || g?.title}
                  </span>
                ))}
              </div>
            )}

            {/* Synopsis */}
            {summary && (
              <div className="space-y-2">
                <h3 className="font-medium">Sinopsis</h3>
                <p className="text-sm leading-relaxed text-muted-foreground whitespace-pre-line">
                  {summary}
                </p>
              </div>
            )}

            {/* Action Buttons */}
            {rawEpisodes.length > 0 && (
              <div className="flex gap-3">
                <Button asChild size="lg">
                  <Link href={`/episode/${rawEpisodes[0]?.slug || rawEpisodes[0]?.link?.split("/")?.pop() || 'ep-1'}`}>
                    <PlayIcon className="mr-2 size-4" />
                    Mulai Menonton
                  </Link>
                </Button>
                <Button variant="outline" size="lg">
                  <InfoIcon className="mr-2 size-4" />
                  Detail Lengkap
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Episodes Section */}
      <Section title="Daftar Episode">
        {rawEpisodes.length === 0 ? (
          <Empty>Belum ada episode tersedia</Empty>
        ) : (
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8">
            {rawEpisodes.map((ep: any, i: number) => {
              const epSlug = ep?.slug || ep?.link?.split("/")?.pop() || ep?.url?.split?.("/")?.pop?.() || `ep-${i}`;
              const label = ep?.title || ep?.name || ep?.episode || `Episode ${ep?.episode_number || i + 1}`;
              const epNumber = ep?.episode_number || i + 1;
              
              return (
                <Button key={epSlug} asChild variant="outline" className="h-16 flex-col p-2" title={label}>
                  <Link href={`/episode/${epSlug}`}>
                    <div className="text-xs text-muted-foreground">EP</div>
                    <div className="font-semibold text-lg">{epNumber}</div>
                  </Link>
                </Button>
              );
            })}
          </div>
        )}
      </Section>
    </Container>
  );
}
