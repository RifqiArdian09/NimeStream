import { Button } from "@/components/ui/button";
import { PlayIcon, TrendingUpIcon } from "lucide-react";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary/10 via-background to-accent/5 p-8 md:p-12">
      <div className="relative z-10 mx-auto max-w-4xl text-center">
        <h1 className="mb-4 text-4xl font-bold tracking-tight md:text-6xl">
          Selamat datang di{" "}
          <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            mingane
          </span>
        </h1>
        <p className="mx-auto mb-8 max-w-2xl text-lg text-muted-foreground md:text-xl">
          Temukan dan tonton anime favorit Anda dengan antarmuka modern dan minimalis. 
          Saksikan episode terbaru, jelajahi serial baru, dan jangan pernah ketinggalan update.
        </p>
        
        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Button asChild size="lg" className="min-w-[140px]">
            <Link href="/ongoing">
              <PlayIcon className="mr-2 size-4" />
              Tonton Sekarang
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg" className="min-w-[140px]">
            <Link href="/genres">
              <TrendingUpIcon className="mr-2 size-4" />
              Jelajahi Genre
            </Link>
          </Button>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-4 text-sm text-muted-foreground sm:grid-cols-3">
          <div className="flex flex-col items-center">
            <div className="mb-2 text-2xl font-bold text-foreground">1000+</div>
            <div>Serial Anime</div>
          </div>
          <div className="flex flex-col items-center">
            <div className="mb-2 text-2xl font-bold text-foreground">HD</div>
            <div>Kualitas Streaming</div>
          </div>
          <div className="flex flex-col items-center">
            <div className="mb-2 text-2xl font-bold text-foreground">24/7</div>
            <div>Selalu Terupdate</div>
          </div>
        </div>
      </div>
      
      {/* Background decoration */}
      <div className="absolute -right-20 -top-20 size-40 rounded-full bg-primary/5 blur-3xl" />
      <div className="absolute -bottom-20 -left-20 size-40 rounded-full bg-accent/5 blur-3xl" />
    </section>
  );
}
