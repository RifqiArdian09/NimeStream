"use client";
import { useEffect, useState } from "react";

export default function EpisodePlayer({ serverId, src: initialSrc }: { serverId?: string; src?: string }) {
  const [src, setSrc] = useState<string>(initialSrc || "");
  const [err, setErr] = useState<string>("");

  useEffect(() => {
    if (initialSrc) return; // already have src
    if (!serverId) return;
    let mounted = true;
    (async () => {
      try {
        const res = await fetch(`/api/server/${serverId}`, { cache: "no-store" });
        if (!res.ok) throw new Error(`Server ${res.status}`);
        const data = await res.json();
        const url = data?.url || data?.link || data?.data || data?.embed || "";
        if (mounted) setSrc(url || "");
      } catch (e: any) {
        if (mounted) setErr(e?.message || "Failed to load server");
      }
    })();
    return () => {
      mounted = false;
    };
  }, [serverId, initialSrc]);

  if (err) return <div className="rounded-md border p-4 text-sm text-red-600">{err}</div>;
  if (!src) return <div className="rounded-md border p-4 text-sm opacity-70">Loading player...</div>;

  return (
    <div className="aspect-video w-full overflow-hidden rounded-lg border">
      <iframe
        src={src}
        allowFullScreen
        className="h-full w-full"
        referrerPolicy="no-referrer"
      />
    </div>
  );
}
