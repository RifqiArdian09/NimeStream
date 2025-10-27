import { AnimeItem } from "./api";

export function normalizeItem(v: any): AnimeItem {
  let rawSlug: any =
    v?.slug ||
    v?.link ||
    v?.url;
  let slug: string | undefined = undefined;
  if (typeof rawSlug === "string") {
    // If slug appears to be a URL or contains slashes, take the last non-empty path segment
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
  if (!obj) return [];
  
  // Handle different possible data structures
  let dataToProcess = obj;
  
  // Check if data is nested under common keys
  if (obj.data && Array.isArray(obj.data)) {
    dataToProcess = obj.data;
  } else if (obj.results && Array.isArray(obj.results)) {
    dataToProcess = obj.results;
  } else if (obj.list && Array.isArray(obj.list)) {
    dataToProcess = obj.list;
  } else if (obj.items && Array.isArray(obj.items)) {
    dataToProcess = obj.items;
  } else if (obj.anime && Array.isArray(obj.anime)) {
    dataToProcess = obj.anime;
  } else if (obj.animes && Array.isArray(obj.animes)) {
    dataToProcess = obj.animes;
  }
  
  // If we have a direct array
  if (Array.isArray(dataToProcess)) {
    const items = dataToProcess.filter(
      (x: any) => x && typeof x === "object" && (x?.slug || x?.title || x?.poster || x?.thumbnail || x?.image || x?.name)
    );
    return items.map(normalizeItem);
  }
  
  // Fallback to deep collection for complex nested structures
  const raw = deepCollect(dataToProcess).filter((x) => typeof x === "object");
  const items = raw.filter(
    (x: any) => x?.slug || x?.title || x?.poster || x?.thumbnail || x?.image || x?.name
  );
  return items.map(normalizeItem);
}

