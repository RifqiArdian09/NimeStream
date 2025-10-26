"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ArrowUpIcon } from "lucide-react";

export default function SearchBar({ placeholder = "Search anime..." }: { placeholder?: string }) {
  const router = useRouter();
  const sp = useSearchParams();
  const [q, setQ] = useState("");

  useEffect(() => {
    const current = sp?.get("q") || "";
    setQ(current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sp]);

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const v = q.trim();
    if (!v) return;
    router.push(`/search?q=${encodeURIComponent(v)}`);
  }

  return (
    <form onSubmit={onSubmit} className="relative mb-6 w-full">
      <input
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder={placeholder}
        className="h-11 w-full rounded-lg border bg-white/5 px-4 pr-10 text-sm outline-none ring-1 ring-transparent transition focus:ring-2 focus:ring-foreground/30"
      />
      <div className="absolute right-1.5 top-1.5 flex items-center gap-1">
        <Button type="submit" size="icon" variant="outline" aria-label="Search">
          <ArrowUpIcon className="size-4" />
        </Button>
      </div>
    </form>
  );
}
