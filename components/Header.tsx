"use client";
import Link from "next/link";
import { useState } from "react";
import { MenuIcon, XIcon } from "lucide-react";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-background/80 backdrop-blur-xl supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto flex h-14 sm:h-16 max-w-7xl items-center justify-between gap-4 px-3 sm:px-6 lg:px-8">
        <Link href="/" className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold tracking-tight">
          <span className="text-primary">
            Nimestream
          </span>
        </Link>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6 lg:gap-8">
          <Link href="/ongoing" className="relative text-sm lg:text-base font-medium transition-colors hover:text-primary group">
            Ongoing
            <div className="absolute -bottom-1 left-0 h-0.5 w-0 bg-primary transition-all group-hover:w-full" />
          </Link>
          <Link href="/complete/1" className="relative text-sm lg:text-base font-medium transition-colors hover:text-primary group">
            Complete
            <div className="absolute -bottom-1 left-0 h-0.5 w-0 bg-primary transition-all group-hover:w-full" />
          </Link>
          <Link href="/genres" className="relative text-sm lg:text-base font-medium transition-colors hover:text-primary group">
            Genres
            <div className="absolute -bottom-1 left-0 h-0.5 w-0 bg-primary transition-all group-hover:w-full" />
          </Link>
          <Link href="/bookmarks" className="relative text-sm lg:text-base font-medium transition-colors hover:text-primary group">
            Tersimpan
            <div className="absolute -bottom-1 left-0 h-0.5 w-0 bg-primary transition-all group-hover:w-full" />
          </Link>
        </nav>

        {/* Mobile Hamburger Button */}
        <button
          onClick={toggleMenu}
          className="md:hidden p-2 rounded-lg hover:bg-white/10 transition-colors"
          aria-label="Toggle menu"
        >
          {isMenuOpen ? (
            <XIcon className="size-5" />
          ) : (
            <MenuIcon className="size-5" />
          )}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-background/95 backdrop-blur-xl border-b border-white/10">
          <nav className="mx-auto max-w-7xl px-3 py-4 space-y-2">
            <Link 
              href="/ongoing" 
              onClick={closeMenu}
              className="block px-4 py-3 text-base font-medium hover:bg-white/10 rounded-lg transition-colors"
            >
              Ongoing
            </Link>
            <Link 
              href="/complete/1" 
              onClick={closeMenu}
              className="block px-4 py-3 text-base font-medium hover:bg-white/10 rounded-lg transition-colors"
            >
              Complete
            </Link>
            <Link 
              href="/genres" 
              onClick={closeMenu}
              className="block px-4 py-3 text-base font-medium hover:bg-white/10 rounded-lg transition-colors"
            >
              Genres
            </Link>
            <Link 
              href="/bookmarks" 
              onClick={closeMenu}
              className="block px-4 py-3 text-base font-medium hover:bg-white/10 rounded-lg transition-colors"
            >
              Tersimpan
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
