import { NextResponse } from "next/server";

const BASE_URL = "https://www.sankavollerei.com";

export async function GET(_req: Request, { params }: { params: { id: string } }) {
  const { id } = params;
  try {
    const res = await fetch(`${BASE_URL}/anime/server/${encodeURIComponent(id)}`, {
      headers: { Accept: "application/json" },
      // Do not cache to ensure fresh links
      cache: "no-store",
    });
    const data = await res.json();
    return NextResponse.json(data, {
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
    });
  } catch (e: any) {
    return NextResponse.json({ error: e?.message || "Failed to fetch server" }, { status: 500 });
  }
}
