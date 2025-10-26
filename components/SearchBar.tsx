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
    <form onSubmit={onSubmit} className="relative mb-6 sm:mb-8 w-full">
      <div className="relative overflow-hidden rounded-xl sm:rounded-2xl bg-white/5 backdrop-blur-sm border border-white/20 shadow-2xl shadow-black/10">
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder={placeholder}
          className="h-12 sm:h-14 w-full bg-transparent px-4 sm:px-6 pr-14 sm:pr-16 text-sm sm:text-base placeholder:text-muted-foreground/60 outline-none transition-all focus:placeholder:text-muted-foreground/40"
        />
        <div className="absolute right-1 sm:right-2 top-1 sm:top-2 flex items-center gap-1">
          <Button 
            type="submit" 
            size="icon" 
            className="h-8 w-8 sm:h-10 sm:w-10 rounded-lg sm:rounded-xl bg-primary hover:bg-primary/90 shadow-lg" 
            aria-label="Search"
          >
            <ArrowUpIcon className="size-3 sm:size-4 rotate-90" />
          </Button>
        </div>
        
        {/* Animated border */}
        <div className="absolute inset-0 rounded-xl sm:rounded-2xl bg-primary/20 opacity-0 transition-opacity focus-within:opacity-100 pointer-events-none" />
      </div>
    </form>
  );
}
