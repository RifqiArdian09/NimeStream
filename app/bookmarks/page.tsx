"use client";
import { useEffect, useState } from "react";
import Container from "@/components/ui/Container";
import SearchBar from "@/components/SearchBar";
import Section from "@/components/ui/Section";
import Empty from "@/components/ui/Empty";
import { Button } from "@/components/ui/button";
import { TrashIcon, PlayIcon } from "lucide-react";
import Link from "next/link";

export default function BookmarksPage() {
  const [bookmarks, setBookmarks] = useState<string[]>([]);

  useEffect(() => {
    const savedBookmarks = JSON.parse(localStorage.getItem('bookmarkedEpisodes') || '[]');
    setBookmarks(savedBookmarks);
  }, []);

  const removeBookmark = (episodeSlug: string) => {
    const newBookmarks = bookmarks.filter(slug => slug !== episodeSlug);
    setBookmarks(newBookmarks);
    localStorage.setItem('bookmarkedEpisodes', JSON.stringify(newBookmarks));
  };

  const clearAllBookmarks = () => {
    setBookmarks([]);
    localStorage.removeItem('bookmarkedEpisodes');
  };

  return (
    <Container>
      <SearchBar />
      
      <Section 
        title="Episode Tersimpan"
        right={
          bookmarks.length > 0 && (
            <Button onClick={clearAllBookmarks} variant="outline" size="sm">
              <TrashIcon className="mr-2 size-4" />
              Hapus Semua
            </Button>
          )
        }
      >
        {bookmarks.length === 0 ? (
          <Empty>
            <div className="text-center">
              <p className="mb-2">Belum ada episode yang disimpan</p>
              <p className="text-xs text-muted-foreground">
                Klik tombol "Simpan" saat menonton episode untuk menyimpannya di sini
              </p>
            </div>
          </Empty>
        ) : (
          <div className="space-y-3">
            {bookmarks.map((episodeSlug, index) => (
              <div key={index} className="flex items-center justify-between rounded-lg border p-4">
                <div className="flex-1">
                  <h3 className="font-medium">{episodeSlug}</h3>
                  <p className="text-sm text-muted-foreground">Episode tersimpan</p>
                </div>
                
                <div className="flex items-center gap-2">
                  <Button asChild size="sm">
                    <Link href={`/episode/${episodeSlug}`}>
                      <PlayIcon className="mr-2 size-4" />
                      Tonton
                    </Link>
                  </Button>
                  
                  <Button 
                    onClick={() => removeBookmark(episodeSlug)}
                    variant="outline" 
                    size="sm"
                  >
                    <TrashIcon className="size-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </Section>
    </Container>
  );
}
