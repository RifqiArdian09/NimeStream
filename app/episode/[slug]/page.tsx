import Container from "@/components/ui/Container";
import VideoPlayer from "@/components/VideoPlayer";
import Section from "@/components/ui/Section";
import { api } from "@/lib/api";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ChevronLeftIcon, ChevronRightIcon, ArrowLeftIcon } from "lucide-react";
import { redirect } from "next/navigation";

async function getData(slug: string) {
  return api<any>(`/anime/episode/${encodeURIComponent(slug)}`);
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const decodedSlug = decodeURIComponent(slug);
  const normalizedSlug = (() => {
    if (typeof decodedSlug !== "string") return decodedSlug as unknown as string;
    const parts = decodedSlug.split("/").filter(Boolean);
    return parts.length ? parts[parts.length - 1] : decodedSlug;
  })();
  if (normalizedSlug !== decodedSlug) {
    redirect(`/episode/${encodeURIComponent(normalizedSlug)}`);
  }
  const raw = await getData(normalizedSlug);
  const data = raw?.data || raw;
  const title = data?.title || data?.name || data?.episode || slug;
  const streamUrl: string | undefined = data?.stream_url || data?.embed || data?.url;
  const servers: any[] = Array.isArray(data?.servers) ? data.servers : (data?.links || data?.sources || []);
  const serverId = servers?.[0]?.id || servers?.[0]?.serverId || servers?.[0]?.value || "";

  const animeSlug = data?.anime_slug || data?.animeSlug || data?.anime?.slug;
  const nextSlug: string | undefined = (data?.has_next_episode && data?.next_episode?.slug) || undefined;
  const prevSlug: string | undefined = (data?.has_previous_episode && data?.previous_episode?.slug) || undefined;

  return (
    <Container>
      <Section title={title}>
        {/* Back to anime link */}
        {animeSlug && (
          <div className="mb-4">
            <Button asChild variant="outline" size="sm">
              <Link href={`/anime/${encodeURIComponent(animeSlug)}`}>
                <ArrowLeftIcon className="mr-2 size-4" />
                Kembali ke Anime
              </Link>
            </Button>
          </div>
        )}

        {/* Video Player */}
        {streamUrl ? (
          <VideoPlayer src={streamUrl} title={title} episodeSlug={slug} />
        ) : serverId ? (
          <VideoPlayer serverId={serverId} title={title} episodeSlug={slug} />
        ) : (
          <div className="rounded-md border p-4 text-sm opacity-70">Server tidak tersedia</div>
        )}

        {/* Server Selection */}
        {Array.isArray(servers) && servers.length > 1 && (
          <div className="mt-6">
            <h3 className="mb-3 text-sm font-medium">Server Alternatif:</h3>
            <div className="flex flex-wrap gap-2">
              {servers.map((s: any, i: number) => (
                <Button key={i} variant="outline" size="sm" className="text-xs">
                  {s?.name || s?.label || s?.server || `Server ${i + 1}`}
                </Button>
              ))}
            </div>
          </div>
        )}

        {/* Episode Navigation */}
        {(prevSlug || nextSlug) && (
          <div className="mt-6 flex items-center justify-between">
            <Button asChild variant="outline" disabled={!prevSlug}>
              <Link href={prevSlug ? `/episode/${encodeURIComponent(prevSlug)}` : "#"}>
                <ChevronLeftIcon className="mr-2 size-4" />
                Episode Sebelumnya
              </Link>
            </Button>
            
            <Button asChild variant="outline" disabled={!nextSlug}>
              <Link href={nextSlug ? `/episode/${encodeURIComponent(nextSlug)}` : "#"}>
                Episode Selanjutnya
                <ChevronRightIcon className="ml-2 size-4" />
              </Link>
            </Button>
          </div>
        )}
      </Section>
    </Container>
  );
}
