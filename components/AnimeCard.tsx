import Image from "next/image";
import Link from "next/link";
import { AnimeItem, BASE_URL } from "@/lib/api";

export default function AnimeCard({ item }: { item: AnimeItem }) {
  const href = item.slug ? `/anime/${item.slug}` : "#";
  const ep = item.episode ? `Ep ${item.episode}` : item.status || "";
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
      className="group overflow-hidden rounded-lg border bg-white/5 transition hover:shadow-sm dark:bg-white/5"
    >
      <div className="relative aspect-[2/3] w-full">
        {normalized ? (
          <Image
            src={normalized}
            alt={(item.title as string) || (item as any).name || (item as any).anime_title || "thumbnail"}
            fill
            sizes="(max-width:768px) 50vw, (max-width:1200px) 25vw, 20vw"
            className="object-cover transition will-change-transform group-hover:scale-[1.03]"
          />
        ) : (
          <div className="absolute inset-0 grid place-items-center text-xs opacity-70">
            No Image
          </div>
        )}
        {ep ? (
          <div className="absolute left-2 top-2 rounded bg-black/70 px-2 py-0.5 text-[10px] text-white">
            {ep}
          </div>
        ) : null}
        {item.score ? (
          <div className="absolute right-2 top-2 rounded bg-black/70 px-2 py-0.5 text-[10px] text-yellow-300">
            ★ {String(item.score)}
          </div>
        ) : null}
      </div>
      <div className="p-2">
        <p className="line-clamp-2 text-sm font-medium leading-snug">
          {item.title || (item as any).name || (item as any).anime_title || "Untitled"}
        </p>
      </div>
    </Link>
  );
}
