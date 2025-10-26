"use client";
import Link from "next/link";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b bg-background/70 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto flex h-14 max-w-6xl items-center gap-4 px-4 sm:px-6 lg:px-8">
        <Link href="/" className="text-base font-semibold tracking-tight md:text-lg">
          mingane
        </Link>
        <nav className="ml-auto hidden items-center gap-5 sm:flex">
          <Link href="/ongoing" className="text-sm hover:opacity-80">Ongoing</Link>
          <Link href="/schedule" className="text-sm hover:opacity-80">Schedule</Link>
          <Link href="/complete/1" className="text-sm hover:opacity-80">Complete</Link>
          <Link href="/genres" className="text-sm hover:opacity-80">Genres</Link>
          <Link href="/bookmarks" className="text-sm hover:opacity-80">Tersimpan</Link>
          <Link href="/unlimited" className="text-sm hover:opacity-80">All</Link>
        </nav>
      </div>
    </header>
  );
}
