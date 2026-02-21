import { useState } from "react";
import { Clock, TrendingUp, ChevronRight, ExternalLink, ArrowLeft } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { NewsFilters } from "@/components/NewsFilters";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { MarketCard } from "@/components/MarketCard";
import { HottestMarkets } from "@/components/HottestMarkets";
import { ActivitySidebar } from "@/components/ActivitySidebar";
import { PageHeader } from "@/components/PageHeader";
import { Separator } from "@/components/ui/separator";
import federalReserveImage from "@/assets/federal-reserve.jpg";

const newsItems = [
  {
    id: 1,
    title: "Federal Reserve Announces New Interest Rate Decision",
    summary: "The Fed maintains rates at 5.25-5.50% amid economic uncertainty and inflation concerns. This decision comes after months of careful monitoring of economic indicators including employment data, consumer spending, and inflation metrics.",
    fullContent: "The Federal Reserve announced today that it will maintain interest rates at 5.25-5.50%, citing ongoing economic uncertainty and persistent inflation concerns. This decision comes after months of careful monitoring of economic indicators including employment data, consumer spending, and inflation metrics. Fed Chair Jerome Powell emphasized the committee's commitment to achieving price stability while supporting maximum employment. The decision was widely anticipated by market analysts and reflects the Fed's cautious approach to monetary policy in the current economic climate.",
    time: "2h ago",
    source: "Federal Reserve",
    category: "Economy",
    relatedMarkets: [
      {
        id: "fed-rate-2024",
        title: "Will the Fed cut rates before end of 2024?",
        subtitle: "Markets react to latest Fed decision and economic indicators",
        image: federalReserveImage,
        creator: { name: "EconomicOracle", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=oracle" },
        outcomes: [
          { label: "Yes", price: 68 },
          { label: "No", price: 32 },
        ],
        volume: "$2.3M",
        endsIn: "Dec 31",
      },
    ],
  },
  {
    id: 2,
    title: "Major Tech Company Reports Record Quarterly Earnings",
    summary: "Q4 results exceed expectations with 25% revenue growth year-over-year. The company posted a 25% revenue growth driven primarily by strong cloud services adoption and AI product launches.",
    fullContent: "In a stunning display of market dominance, the tech giant reported record-breaking quarterly earnings that exceeded Wall Street expectations by a significant margin. The company posted a 25% revenue growth year-over-year, driven primarily by strong cloud services adoption and AI product launches. CEO highlighted the successful integration of artificial intelligence across their product portfolio as a key growth driver. Analysts are now revising their annual projections upward, citing the company's strong market position and innovative product pipeline.",
    time: "5h ago",
    source: "Tech News Daily",
    category: "Tech",
    relatedMarkets: [],
  },
  {
    id: 3,
    title: "Global Climate Summit Reaches Historic Agreement",
    summary: "195 nations commit to new carbon reduction targets for the next decade. The agreement includes binding commitments to reduce greenhouse gas emissions by 50% by 2030.",
    fullContent: "In a historic moment for global climate action, 195 nations have reached a comprehensive agreement on carbon reduction targets for the next decade. The agreement includes binding commitments to reduce greenhouse gas emissions by 50% by 2030, with specific provisions for technology transfer and financial support for developing nations. Environmental experts are calling this the most significant climate agreement since the Paris Accord, though some activists argue the targets don't go far enough to prevent catastrophic climate change.",
    time: "8h ago",
    source: "Global News Network",
    category: "Politics",
    relatedMarkets: [],
  },
];

export default function News() {
  const [selectedNews, setSelectedNews] = useState<typeof newsItems[0] | null>(null);

  return (
    <div className="w-full max-w-7xl mx-auto py-4 lg:py-6">
      <div className="flex gap-6 justify-center">
        <ActivitySidebar />
        
        <div className="w-full max-w-2xl space-y-4 px-4 lg:px-0">
          <PageHeader 
            title="News"
            subtitle="Stay informed with the latest market-moving stories"
          />
          
          <NewsFilters />
          
          <div className="space-y-1">
            {newsItems.map((item, index) => (
              <article
                key={item.id}
                className="group cursor-pointer py-5 transition-colors hover:bg-muted/30 -mx-4 px-4 rounded-lg"
                onClick={() => setSelectedNews(item)}
              >
                <div className="flex items-start gap-4">
                  <div className="flex-1 min-w-0 space-y-2.5">
                    {/* Meta info */}
                    <div className="flex items-center gap-2 text-xs">
                      <span className="font-medium text-primary">{item.source}</span>
                      <span className="text-muted-foreground/40">•</span>
                      <span className="text-muted-foreground">{item.time}</span>
                      {item.relatedMarkets.length > 0 && (
                        <>
                          <span className="text-muted-foreground/40">•</span>
                          <Badge variant="outline" className="h-5 text-[10px] gap-1 border-primary/40 text-primary bg-primary/5 px-1.5">
                            <TrendingUp className="h-3 w-3" />
                            Trade
                          </Badge>
                        </>
                      )}
                    </div>
                    
                    {/* Title */}
                    <h2 className="font-semibold text-[15px] leading-snug group-hover:text-primary transition-colors line-clamp-2">
                      {item.title}
                    </h2>
                    
                    {/* Summary */}
                    <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2">
                      {item.summary}
                    </p>
                  </div>
                  
                  {/* Arrow indicator */}
                  <ChevronRight className="h-5 w-5 text-muted-foreground/30 group-hover:text-primary/60 transition-colors mt-6 shrink-0" />
                </div>
                
                {index < newsItems.length - 1 && (
                  <Separator className="mt-5 opacity-50" />
                )}
              </article>
            ))}
          </div>
        </div>
        
        <HottestMarkets />
      </div>

      {/* Article Dialog */}
      <Dialog open={!!selectedNews} onOpenChange={(open) => !open && setSelectedNews(null)}>
        <DialogContent className="max-w-2xl max-h-[85vh] overflow-y-auto p-0 gap-0">
          {selectedNews && (
            <div className="flex flex-col">
              {/* Header */}
              <div className="sticky top-0 z-10 bg-background border-b border-border/50 px-6 py-4">
                <button 
                  onClick={() => setSelectedNews(null)}
                  className="flex items-center gap-3 text-muted-foreground hover:text-foreground transition-colors"
                >
                  <ArrowLeft className="h-5 w-5" />
                  <span className="text-base">Back</span>
                </button>
              </div>
              
              {/* Content */}
              <div className="px-6 py-6 space-y-6">
                <h1 className="text-xl font-bold leading-tight">
                  {selectedNews.title}
                </h1>
                
                <p className="text-base text-foreground/90 leading-[1.8]">
                  {selectedNews.fullContent}
                </p>
                
                <a 
                  href="#" 
                  className="inline-flex items-center gap-1.5 text-sm text-primary hover:underline"
                >
                  Read full article
                  <ExternalLink className="h-3.5 w-3.5" />
                </a>
              </div>

              {/* Related Markets */}
              {selectedNews.relatedMarkets.length > 0 && (
                <div className="border-t border-border/50 bg-muted/20 px-6 py-5 space-y-4">
                  <div className="flex items-center gap-2">
                    <TrendingUp className="h-4 w-4 text-primary" />
                    <h3 className="font-semibold text-sm">Related Markets</h3>
                  </div>
                  <div className="space-y-3">
                    {selectedNews.relatedMarkets.map((market) => (
                      <MarketCard key={market.id} {...market} />
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
