"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Header() {
  const [q, setQ] = useState("");
  const router = useRouter();

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!q.trim()) return;
    router.push(`/search?q=${encodeURIComponent(q.trim())}`);
  }

  return (
    <header className="sticky top-0 z-50 border-b bg-background/80 backdrop-blur">
      <div className="mx-auto flex h-14 max-w-6xl items-center gap-3 px-4 sm:px-6 lg:px-8">
        <Link href="/" className="text-lg font-semibold tracking-tight">
          mingane
        </Link>
        <nav className="ml-auto hidden items-center gap-4 sm:flex">
          <Link href="/ongoing" className="text-sm hover:opacity-80">Ongoing</Link>
          <Link href="/schedule" className="text-sm hover:opacity-80">Schedule</Link>
          <Link href="/complete/1" className="text-sm hover:opacity-80">Complete</Link>
          <Link href="/genres" className="text-sm hover:opacity-80">Genres</Link>
          <Link href="/unlimited" className="text-sm hover:opacity-80">All</Link>
        </nav>
        <form onSubmit={onSubmit} className="ml-3 flex flex-1 items-center sm:ml-6">
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search anime..."
            className="h-9 w-full rounded-md border bg-transparent px-3 text-sm outline-none"
          />
        </form>
      </div>
    </header>
  );
}
