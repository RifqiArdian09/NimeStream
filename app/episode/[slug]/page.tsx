import Container from "@/components/ui/Container";
import EpisodePlayer from "@/components/EpisodePlayer";
import { api } from "@/lib/api";
import Link from "next/link";

async function getData(slug: string) {
  return api<any>(`/anime/episode/${encodeURIComponent(slug)}`);
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const raw = await getData(slug);
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
      <h1 className="mb-4 text-2xl font-semibold tracking-tight">{title}</h1>
      {streamUrl ? (
        <EpisodePlayer src={streamUrl} />
      ) : serverId ? (
        <EpisodePlayer serverId={serverId} />
      ) : (
        <div className="rounded-md border p-4 text-sm opacity-70">No server available</div>
      )}

      {Array.isArray(servers) && servers.length > 1 && (
        <div className="mt-4 flex flex-wrap gap-2 text-sm">
          {servers.map((s: any, i: number) => (
            <span key={i} className="rounded-md border px-2 py-1 opacity-70">
              {s?.name || s?.label || s?.server || `Server ${i + 1}`}
            </span>
          ))}
        </div>
      )}

      {(prevSlug || nextSlug) && (
        <div className="mt-6 flex items-center gap-2">
          <Link
            href={prevSlug ? `/episode/${prevSlug}` : "#"}
            className={`rounded-md border px-3 py-1.5 text-sm ${prevSlug ? "" : "pointer-events-none opacity-50"}`}
            aria-disabled={!prevSlug}
          >
            ← Previous
          </Link>
          <Link
            href={nextSlug ? `/episode/${nextSlug}` : "#"}
            className={`rounded-md border px-3 py-1.5 text-sm ${nextSlug ? "" : "pointer-events-none opacity-50"}`}
            aria-disabled={!nextSlug}
          >
            Next →
          </Link>
        </div>
      )}

      {animeSlug && (
        <div className="mt-6">
          <Link href={`/anime/${animeSlug}`} className="text-sm underline">Back to anime</Link>
        </div>
      )}
    </Container>
  );
}
