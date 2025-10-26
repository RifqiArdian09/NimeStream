export const BASE_URL = "https://www.sankavollerei.com";

export async function api<T>(path: string, init?: RequestInit): Promise<T> {
  try {
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
      console.error(`API error ${res.status} for ${path}`);
      // Return empty object instead of throwing error
      return {} as T;
    }
    
    const data = await res.json();
    
    // Check if API returned an error in the response body
    if (data?.error || data?.message?.includes('Error')) {
      console.error(`API response error for ${path}:`, data);
      return {} as T;
    }
    
    return data as T;
  } catch (error) {
    console.error(`Network error for ${path}:`, error);
    // Return empty object instead of throwing error
    return {} as T;
  }
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
