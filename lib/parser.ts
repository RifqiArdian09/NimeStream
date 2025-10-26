import { AnimeItem } from "./api";

export function normalizeItem(v: any): AnimeItem {
  return {
    title: v?.title || v?.name || v?.anime_title,
    slug:
      v?.slug ||
      v?.link?.split?.("/")?.pop?.() ||
      v?.url?.split?.("/")?.pop?.(),
    thumbnail:
      v?.thumbnail || v?.poster || v?.image || v?.thumb || v?.img || v?.cover,
    episode: v?.episode || v?.current_episode || v?.latest_episode,
    status: v?.status,
    score: v?.score || v?.rating || v?.rate || v?.stars,
    type: v?.type,
    release: v?.release || v?.newest_release_date,
  } as AnimeItem;
}

export function deepCollect(obj: any, acc: any[] = []): any[] {
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

export function collectAnimeList(obj: any): AnimeItem[] {
  const raw = deepCollect(obj).filter((x) => typeof x === "object");
  const items = raw.filter(
    (x: any) => x?.slug || x?.title || x?.poster || x?.thumbnail || x?.image
  );
  return items.map(normalizeItem);
}

export function collectSchedule(obj: any): Record<string, AnimeItem[]> {
  // Try to find an object whose values are arrays of items (by day)
  const buckets: Record<string, AnimeItem[]> = {};
  function helper(o: any) {
    if (!o || typeof o !== "object" || Array.isArray(o)) return;
    const entries = Object.entries(o);
    const allArrays = entries.length > 0 && entries.every(([, v]) => Array.isArray(v));
    if (allArrays) {
      for (const [k, arr] of entries) {
        buckets[k] = (arr as any[]).map(normalizeItem);
      }
    } else {
      for (const v of Object.values(o)) helper(v);
    }
  }
  helper(obj);
  return buckets;
}
