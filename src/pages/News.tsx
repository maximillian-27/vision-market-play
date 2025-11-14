import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Clock, TrendingUp, BarChart3 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { NewsFilters } from "@/components/NewsFilters";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { MarketCard } from "@/components/MarketCard";
import { HottestMarkets } from "@/components/HottestMarkets";
import { ActivitySidebar } from "@/components/ActivitySidebar";
import federalReserveImage from "@/assets/federal-reserve.jpg";
import bitcoinImage from "@/assets/bitcoin-market.jpg";

const newsItems = [
  {
    id: 1,
    title: "Federal Reserve Announces New Interest Rate Decision",
    summary: "The Fed maintains rates at 5.25-5.50% amid economic uncertainty and inflation concerns. This decision comes after months of careful monitoring of economic indicators including employment data, consumer spending, and inflation metrics.",
    fullContent: "The Federal Reserve announced today that it will maintain interest rates at 5.25-5.50%, citing ongoing economic uncertainty and persistent inflation concerns. This decision comes after months of careful monitoring of economic indicators including employment data, consumer spending, and inflation metrics. Fed Chair Jerome Powell emphasized the committee's commitment to achieving price stability while supporting maximum employment. The decision was widely anticipated by market analysts and reflects the Fed's cautious approach to monetary policy in the current economic climate.",
    time: "2h ago",
    source: "Federal Reserve",
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
    summary: "Q4 results exceed expectations with 25% revenue growth year-over-year. The company posted a 25% revenue growth driven primarily by strong cloud services adoption and AI product launches, with analysts now revising their annual projections upward.",
    fullContent: "In a stunning display of market dominance, the tech giant reported record-breaking quarterly earnings that exceeded Wall Street expectations by a significant margin. The company posted a 25% revenue growth year-over-year, driven primarily by strong cloud services adoption and AI product launches. CEO highlighted the successful integration of artificial intelligence across their product portfolio as a key growth driver. Analysts are now revising their annual projections upward, citing the company's strong market position and innovative product pipeline.",
    time: "5h ago",
    source: "Tech News Daily",
    relatedMarkets: [],
  },
  {
    id: 3,
    title: "Global Climate Summit Reaches Historic Agreement",
    summary: "195 nations commit to new carbon reduction targets for the next decade. The agreement includes binding commitments to reduce greenhouse gas emissions by 50% by 2030, with specific provisions for technology transfer and financial support for developing nations.",
    fullContent: "In a historic moment for global climate action, 195 nations have reached a comprehensive agreement on carbon reduction targets for the next decade. The agreement includes binding commitments to reduce greenhouse gas emissions by 50% by 2030, with specific provisions for technology transfer and financial support for developing nations. Environmental experts are calling this the most significant climate agreement since the Paris Accord, though some activists argue the targets don't go far enough to prevent catastrophic climate change.",
    time: "8h ago",
    source: "Global News Network",
    relatedMarkets: [],
  },
];

export default function News() {
  const [selectedNews, setSelectedNews] = useState<typeof newsItems[0] | null>(null);

  return (
    <div className="w-full lg:container lg:max-w-7xl py-4 lg:py-6">
      <div className="flex gap-6 justify-center">
        <ActivitySidebar />
        <div className="w-full md:max-w-2xl space-y-4">
          <h1 className="text-2xl font-bold mb-4 md:mb-6 px-4">Latest News</h1>
          <div className="px-4">
            <NewsFilters />
          </div>
          <div className="space-y-3 md:space-y-4 md:px-4">
            {newsItems.map((item, index) => (
              <Card 
                key={index} 
                className="group cursor-pointer transition-all duration-200 hover:shadow-lg hover:scale-[1.01] md:rounded-lg rounded-none border-0 md:border animate-fade-in"
                style={{ animationDelay: `${index * 50}ms` }}
                onClick={() => setSelectedNews(item)}
              >
                <CardContent className="p-4 md:p-6">
                  <div className="space-y-3">
                    {/* Header with source and market indicator */}
                    <div className="flex items-center justify-between gap-2">
                      <Badge variant="secondary" className="text-xs font-medium">
                        {item.source}
                      </Badge>
                      {item.relatedMarkets.length > 0 ? (
                        <Badge variant="outline" className="text-xs gap-1.5 border-primary/30 text-primary hover:bg-primary/10">
                          <BarChart3 className="h-3.5 w-3.5" />
                          <span className="hidden sm:inline">Check Markets</span>
                        </Badge>
                      ) : (
                        <Badge variant="outline" className="text-xs gap-1.5 border-muted-foreground/20 text-muted-foreground/50 bg-transparent">
                          <BarChart3 className="h-3 w-3" />
                          <span className="hidden sm:inline">No markets yet</span>
                        </Badge>
                      )}
                    </div>

                    {/* Title */}
                    <h3 className="font-bold text-base md:text-lg leading-tight group-hover:text-primary transition-colors">
                      {item.title}
                    </h3>

                    {/* Summary */}
                    <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2 md:line-clamp-3">
                      {item.summary}
                    </p>

                    {/* Time */}
                    <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                      <Clock className="h-3.5 w-3.5" />
                      <span>{item.time}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
        <HottestMarkets />
      </div>

      <Dialog open={!!selectedNews} onOpenChange={(open) => !open && setSelectedNews(null)}>
        <DialogContent className="max-w-2xl max-h-[85vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-xl md:text-2xl font-bold pr-6">
              {selectedNews?.title}
            </DialogTitle>
          </DialogHeader>
          
          {selectedNews && (
            <div className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <span>{selectedNews.source}</span>
                  <span>•</span>
                  <span>{selectedNews.time}</span>
                </div>
                
                <p className="text-base leading-relaxed">
                  {selectedNews.fullContent}
                </p>
              </div>

              {selectedNews.relatedMarkets.length > 0 && (
                <div className="space-y-4 pt-4 border-t">
                  <h3 className="font-semibold text-lg">Related Markets</h3>
                  <div className="space-y-4">
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
