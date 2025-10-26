import { Button } from "@/components/ui/button";
import { PlayIcon, TrendingUpIcon } from "lucide-react";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative overflow-hidden rounded-2xl sm:rounded-3xl bg-gradient-to-br from-primary/20 via-background to-accent/10 p-4 sm:p-8 md:p-12 lg:p-16 border border-white/10 backdrop-blur-sm">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-primary/10 blur-3xl animate-pulse" />
        <div className="absolute -bottom-40 -left-40 h-80 w-80 rounded-full bg-accent/10 blur-3xl animate-pulse" style={{animationDelay: '1s'}} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-60 w-60 rounded-full bg-gradient-to-r from-primary/5 to-accent/5 blur-2xl animate-pulse" style={{animationDelay: '2s'}} />
      </div>
      
      <div className="relative z-10 mx-auto max-w-5xl text-center">
        <div className="mb-4 sm:mb-6 inline-flex items-center rounded-full bg-primary/10 px-3 sm:px-6 py-1 sm:py-2 text-xs sm:text-sm font-medium text-primary backdrop-blur-sm border border-primary/20">
          🎬 Platform Streaming Anime Terbaik
        </div>
        
        <h1 className="mb-4 sm:mb-6 text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl font-bold tracking-tight leading-tight">
          Selamat datang di{" "}
          <span className="text-primary animate-pulse">
            Nimestream
          </span>
        </h1>
        
     
        
        <p className="mx-auto mb-6 sm:mb-8 md:mb-10 max-w-xs sm:max-w-lg md:max-w-2xl lg:max-w-3xl text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl text-muted-foreground leading-relaxed">
          Temukan dan tonton anime favorit Anda dengan antarmuka modern dan minimalis. 
          Saksikan episode terbaru, jelajahi serial baru, dan jangan pernah ketinggalan update.
        </p>
        
        <div className="flex flex-col items-center justify-center gap-3 sm:gap-4 md:gap-6 sm:flex-row">
          <Button asChild className="w-full sm:w-auto min-w-[140px] sm:min-w-[160px] md:min-w-[180px] h-12 sm:h-13 md:h-14 text-sm sm:text-base md:text-lg font-semibold bg-primary hover:bg-primary/90">
            <Link href="/ongoing">
              <PlayIcon className="mr-2 sm:mr-3 size-4 sm:size-5" />
              Tonton Sekarang
            </Link>
          </Button>
          <Button asChild variant="outline" className="w-full sm:w-auto min-w-[140px] sm:min-w-[160px] md:min-w-[180px] h-12 sm:h-13 md:h-14 text-sm sm:text-base md:text-lg font-semibold border-2 border-primary hover:bg-primary/10">
            <Link href="/genres">
              <TrendingUpIcon className="mr-2 sm:mr-3 size-4 sm:size-5" />
              Jelajahi Genre
            </Link>
          </Button>
        </div>

        
      </div>
      
      {/* Background decoration */}
      <div className="absolute -right-20 -top-20 size-40 rounded-full bg-primary/5 blur-3xl" />
      <div className="absolute -bottom-20 -left-20 size-40 rounded-full bg-accent/5 blur-3xl" />
    </section>
  );
}
