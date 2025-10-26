"use client";
import { useEffect, useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { 
  SettingsIcon, 
  PlayIcon, 
  BookmarkIcon,
  MaximizeIcon,
  MinimizeIcon
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { toast } from "sonner";

interface VideoSource {
  quality: string;
  url: string;
  size?: string;
}

interface ApiSource {
  quality?: string;
  label?: string;
  resolution?: string;
  url?: string;
  link?: string;
  src?: string;
  size?: string;
  filesize?: string;
}

interface VideoPlayerProps {
  serverId?: string;
  src?: string;
  title?: string;
  episodeSlug?: string;
}

export default function VideoPlayer({ serverId, src: initialSrc, title, episodeSlug }: VideoPlayerProps) {
  const [src, setSrc] = useState<string>(initialSrc || "");
  const [sources, setSources] = useState<VideoSource[]>([]);
  const [currentQuality, setCurrentQuality] = useState<string>("Auto");
  const [err, setErr] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  
  // New state for additional features
  const [isBookmarked, setIsBookmarked] = useState<boolean>(false);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  
  const playerRef = useRef<HTMLDivElement>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    if (initialSrc) {
      // If we have initial src, create a default source
      setSources([{ quality: "Auto", url: initialSrc }]);
      return;
    }
    if (!serverId) return;

    let mounted = true;
    setLoading(true);
    
    (async () => {
      try {
        const res = await fetch(`/api/server/${serverId}`, { cache: "no-store" });
        if (!res.ok) throw new Error(`Server ${res.status}`);
        const data = await res.json();
        
        // Handle multiple quality sources
        if (Array.isArray(data?.sources) && data.sources.length > 0) {
          const videoSources: VideoSource[] = data.sources.map((s: ApiSource) => ({
            quality: s?.quality || s?.label || s?.resolution || "Auto",
            url: s?.url || s?.link || s?.src || "",
            size: s?.size || s?.filesize
          })).filter((s: VideoSource) => !!s.url); // Filter out empty URLs
          
          if (mounted && videoSources.length > 0) {
            setSources(videoSources);
            // Try to find HD quality first, otherwise use first available
            const hdSource = videoSources.find((s: VideoSource) => 
              s.quality.toLowerCase().includes('hd') || 
              s.quality.toLowerCase().includes('720') ||
              s.quality.toLowerCase().includes('1080')
            );
            const selectedSource = hdSource || videoSources[0];
            setSrc(selectedSource.url);
            setCurrentQuality(selectedSource.quality);
          }
        } else {
          // Single source or fallback
          const url = data?.url || data?.link || data?.data || data?.embed || "";
          if (mounted && url) {
            setSrc(url);
            setSources([{ quality: "Auto", url }]);
            setCurrentQuality("Auto");
          }
        }
      } catch (e: any) {
        if (mounted) setErr(e?.message || "Gagal memuat server");
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    
    return () => {
      mounted = false;
    };
  }, [serverId, initialSrc]);

  const handleQualityChange = (source: VideoSource) => {
    setSrc(source.url);
    setCurrentQuality(source.quality);
    toast.success(`Kualitas diubah ke ${source.quality}`);
  };


  // Bookmark functionality
  useEffect(() => {
    if (episodeSlug) {
      const bookmarks = JSON.parse(localStorage.getItem('bookmarkedEpisodes') || '[]');
      setIsBookmarked(bookmarks.includes(episodeSlug));
    }
  }, [episodeSlug]);

  const toggleBookmark = () => {
    if (!episodeSlug) return;
    
    const bookmarks = JSON.parse(localStorage.getItem('bookmarkedEpisodes') || '[]');
    let newBookmarks;
    
    if (isBookmarked) {
      newBookmarks = bookmarks.filter((slug: string) => slug !== episodeSlug);
      toast.success("Episode dihapus dari bookmark");
    } else {
      newBookmarks = [...bookmarks, episodeSlug];
      toast.success("Episode disimpan ke bookmark");
    }
    
    localStorage.setItem('bookmarkedEpisodes', JSON.stringify(newBookmarks));
    setIsBookmarked(!isBookmarked);
  };


  // Fullscreen functionality
  const toggleFullscreen = async () => {
    if (!playerRef.current) return;

    try {
      if (!isFullscreen) {
        if (playerRef.current.requestFullscreen) {
          await playerRef.current.requestFullscreen();
        }
      } else {
        if (document.exitFullscreen) {
          await document.exitFullscreen();
        }
      }
    } catch (error) {
      console.error('Fullscreen error:', error);
    }
  };

  // Listen for fullscreen changes
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);


  if (err) return <div className="rounded-md border p-4 text-sm text-red-600">{err}</div>;
  if (loading) return <div className="rounded-md border p-4 text-sm opacity-70">Memuat player...</div>;
  if (!src) return <div className="rounded-md border p-4 text-sm opacity-70">Tidak ada video tersedia</div>;

  return (
    <div className="space-y-4">
      {/* Video Player */}
      <div 
        ref={playerRef}
        className={`relative aspect-video w-full overflow-hidden rounded-lg border bg-black ${
          isFullscreen ? 'fixed inset-0 z-50 rounded-none' : ''
        }`}
      >
        <iframe
          ref={iframeRef}
          src={src}
          allowFullScreen
          className="h-full w-full"
          referrerPolicy="no-referrer"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        />
        
        {/* Fullscreen toggle button overlay */}
        <Button
          onClick={toggleFullscreen}
          variant="ghost"
          size="sm"
          className="absolute bottom-2 right-2 bg-black/50 text-white hover:bg-black/70"
        >
          {isFullscreen ? <MinimizeIcon className="size-4" /> : <MaximizeIcon className="size-4" />}
        </Button>
      </div>

      {/* Controls */}
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <PlayIcon className="size-4 text-green-500" />
          <span className="text-sm text-muted-foreground">
            Kualitas: {currentQuality}
          </span>
        </div>

        <div className="flex items-center gap-2">
          {/* Bookmark Button */}
          {episodeSlug && (
            <Button
              onClick={toggleBookmark}
              variant={isBookmarked ? "default" : "outline"}
              size="sm"
            >
              <BookmarkIcon className={`mr-2 size-4 ${isBookmarked ? 'fill-current' : ''}`} />
              {isBookmarked ? 'Tersimpan' : 'Simpan'}
            </Button>
          )}

          {/* Quality Selector */}
          {sources.length > 1 && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm">
                  <SettingsIcon className="mr-2 size-4" />
                  Kualitas
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {sources.map((source, index) => (
                  <DropdownMenuItem
                    key={index}
                    onClick={() => handleQualityChange(source)}
                    className={currentQuality === source.quality ? "bg-accent" : ""}
                  >
                    <div className="flex items-center justify-between w-full">
                      <span>{source.quality}</span>
                      {source.size && (
                        <span className="text-xs text-muted-foreground ml-2">
                          {source.size}
                        </span>
                      )}
                    </div>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          )}

        </div>
      </div>

      {/* Quality Info */}
      {sources.length > 0 && (
        <div className="rounded-lg border p-3 text-xs text-muted-foreground">
          <div className="flex flex-wrap gap-2">
            <span>Tersedia:</span>
            {sources.map((source, index) => (
              <span key={index} className="rounded bg-muted px-2 py-1">
                {source.quality}
                {source.size && ` (${source.size})`}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
