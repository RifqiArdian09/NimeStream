import Image from "next/image";
import Link from "next/link";
import { AnimeItem, BASE_URL } from "@/lib/api";

export default function AnimeCard({ item, priority = false }: { item: AnimeItem; priority?: boolean }) {
  const href = item.slug ? `/anime/${encodeURIComponent(item.slug)}` : "#";
  // Normalize episode count across various possible fields
  const epCandidates: any[] = [
    (item as any).episode,
    (item as any).episodes,
    (item as any).totalEpisodes,
    (item as any).total_eps,
    (item as any).total,
    (item as any).eps,
  ];
  let epVal: number | string | undefined = epCandidates.find((v) => v !== undefined && v !== null);
  if (Array.isArray(epVal)) epVal = epVal.length;
  if (typeof epVal === "string") {
    const m = epVal.match(/\d+(?:\.\d+)?/);
    epVal = m ? Number(m[0]) : epVal;
  }
  const ep = epVal !== undefined && epVal !== null && epVal !== "" ? String(epVal) : (item as any).status || "";

  // Normalize rating/score across various possible fields
  const scoreCandidates: any[] = [
    (item as any).score,
    (item as any).rating,
    (item as any).rate,
    (item as any).star,
    (item as any).stars,
  ];
  let scoreVal: number | string | undefined = scoreCandidates.find((v) => v !== undefined && v !== null && v !== "");
  if (typeof scoreVal === "string") {
    const m = scoreVal.match(/\d+(?:\.\d+)?/);
    scoreVal = m ? Number(m[0]) : Number(scoreVal);
    if (Number.isNaN(scoreVal)) scoreVal = undefined;
  }
  const score = typeof scoreVal === "number" ? Number(scoreVal.toFixed(1)) : undefined;
  const thumb =
    (item as any).thumbnail ||
    (item as any).image ||
    (item as any).thumb ||
    (item as any).poster ||
    (item as any).img ||
    (item as any).cover ||
    "";
  let normalized = thumb as string;
  if (typeof normalized === "string") {
    if (normalized.startsWith("//")) normalized = `https:${normalized}`;
    if (normalized.startsWith("/")) normalized = `${BASE_URL}${normalized}`;
  }
  return (
    <Link
      href={href}
      className="group overflow-hidden rounded-2xl border bg-white/[0.03] ring-1 ring-white/10 backdrop-blur-sm transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl hover:shadow-primary/10 hover:ring-primary/20"
    >
      <div className="relative aspect-[2/3] w-full overflow-hidden">
        {normalized ? (
          <Image
            src={normalized}
            alt={(item.title as string) || (item as any).name || (item as any).anime_title || "thumbnail"}
            fill
            sizes="(max-width:768px) 50vw, (max-width:1200px) 25vw, 20vw"
            priority={priority}
            loading={priority ? "eager" : "lazy"}
            placeholder="empty"
            className="object-cover transition-all duration-500 group-hover:scale-110"
          />
        ) : (
          <div className="absolute inset-0 grid place-items-center bg-muted/30 text-xs opacity-70">
            <div className="text-center">
              <div className="mb-1 text-2xl">🎬</div>
              <div>No Image</div>
            </div>
          </div>
        )}
        
        {/* Episode Badge */}
        {ep ? (
          <div className="absolute left-3 top-3 rounded-full bg-blue-500 px-3 py-1 text-[10px] font-semibold text-white shadow-lg backdrop-blur-sm">
            {ep}
          </div>
        ) : null}
        
        {/* Score Badge */}
        {score !== undefined ? (
          <div className="absolute right-3 top-3 rounded-full bg-yellow-400 px-3 py-1 text-[10px] font-semibold text-black shadow-lg backdrop-blur-sm">
            ★ {score}
          </div>
        ) : null}
        
        {/* Status Badge */}
        {(item as any).status && (
          <div className="absolute bottom-3 left-3 rounded-full bg-green-500 px-3 py-1 text-[10px] font-semibold text-white shadow-lg backdrop-blur-sm">
            {(item as any).status}
          </div>
        )}
        
        {/* Hover Play Button */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <div className="rounded-full bg-white/20 p-4 backdrop-blur-sm">
            <div className="h-6 w-6 rounded-full bg-white flex items-center justify-center">
              <div className="ml-0.5 h-0 w-0 border-l-[6px] border-l-black border-y-[4px] border-y-transparent"></div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="p-4">
        <h3 className="line-clamp-2 text-sm font-semibold leading-tight text-foreground group-hover:text-primary transition-colors">
          {item.title || (item as any).name || (item as any).anime_title || "Untitled"}
        </h3>
        
        {/* Additional Info */}
        <div className="mt-2 flex items-center justify-between text-xs text-muted-foreground">
          <span>{(item as any).type || "Anime"}</span>
          {(item as any).release && (
            <span>{(item as any).release}</span>
          )}
        </div>
      </div>
    </Link>
  );
}
