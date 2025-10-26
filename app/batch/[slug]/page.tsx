import Container from "@/components/ui/Container";
import { api } from "@/lib/api";
import SearchBar from "@/components/SearchBar";
import Section from "@/components/ui/Section";
import Empty from "@/components/ui/Empty";
import { Button } from "@/components/ui/button";
import { DownloadIcon, ExternalLinkIcon, FolderIcon } from "lucide-react";

async function getData(slug: string) {
  return api<any>(`/anime/batch/${encodeURIComponent(slug)}`);
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const data = await getData(slug);
  const links: any[] = Array.isArray(data?.links) ? data.links : (data?.downloads || data?.data || []);

  // Extract title and metadata
  const title = data?.title || data?.name || data?.anime_title || slug;
  const description = data?.description || data?.synopsis || "";
  
  // Group links by quality or type
  const groupedLinks = links.reduce((acc: any, link: any) => {
    const quality = link?.quality || link?.resolution || link?.type || 'Lainnya';
    if (!acc[quality]) acc[quality] = [];
    acc[quality].push(link);
    return acc;
  }, {});

  return (
    <Container>
      <SearchBar />
      
      {/* Header */}
      <div className="mb-8 rounded-2xl border bg-gradient-to-r from-background to-primary/5 p-6">
        <div className="flex items-center gap-3 mb-3">
          <FolderIcon className="size-8 text-primary" />
          <div>
            <h1 className="text-2xl font-bold tracking-tight">{title}</h1>
            <p className="text-sm text-muted-foreground">Download Batch</p>
          </div>
        </div>
        
        {description && (
          <p className="text-sm text-muted-foreground leading-relaxed">
            {description}
          </p>
        )}
      </div>

      <Section title="Link Download">
        {links.length === 0 ? (
          <Empty>Tidak ada link download tersedia</Empty>
        ) : (
          <div className="space-y-6">
            {Object.entries(groupedLinks).map(([quality, qualityLinks]: [string, any]) => (
              <div key={quality} className="space-y-3">
                <h3 className="flex items-center gap-2 text-lg font-medium">
                  <DownloadIcon className="size-5" />
                  {quality}
                </h3>
                
                <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                  {qualityLinks.map((link: any, i: number) => {
                    const label = link?.label || link?.server || link?.provider || `Server ${i + 1}`;
                    const size = link?.size || link?.filesize || "";
                    const url = link?.url || link?.link || "";
                    
                    return (
                      <div key={i} className="rounded-lg border p-4 space-y-2">
                        <div className="flex items-center justify-between">
                          <h4 className="font-medium text-sm">{label}</h4>
                          {size && (
                            <span className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded">
                              {size}
                            </span>
                          )}
                        </div>
                        
                        <Button asChild className="w-full" size="sm">
                          <a href={url} target="_blank" rel="noopener noreferrer">
                            <ExternalLinkIcon className="mr-2 size-4" />
                            Download
                          </a>
                        </Button>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        )}
      </Section>
    </Container>
  );
}
