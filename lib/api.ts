export const BASE_URL = "https://www.sankavollerei.com";

export async function api<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${BASE_URL}${path}`, {
    cache: "no-store",
    next: { revalidate: 0 },
    ...init,
    headers: {
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122 Safari/537.36",
      Referer: BASE_URL,
      Accept: "application/json",
      ...(init?.headers || {}),
    },
  });
  if (!res.ok) {
    throw new Error(`API error ${res.status}: ${await res.text()}`);
  }
  return (await res.json()) as T;
}

export type AnimeItem = {
  title?: string;
  slug?: string;
  thumbnail?: string;
  episode?: string | number;
  status?: string;
  score?: string | number;
  type?: string;
  release?: string;
  [key: string]: any;
};
