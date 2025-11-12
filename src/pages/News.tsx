import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { ExternalLink } from "lucide-react";
import { FeedFilters } from "@/components/FeedFilters";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { MarketCard } from "@/components/MarketCard";
import federalReserveImage from "@/assets/federal-reserve.jpg";
import bitcoinImage from "@/assets/bitcoin-market.jpg";

const newsItems = [
  {
    id: 1,
    title: "Federal Reserve Announces New Interest Rate Decision",
    summary: "The Fed maintains rates at 5.25-5.50% amid economic uncertainty and inflation concerns.",
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
    summary: "Q4 results exceed expectations with 25% revenue growth year-over-year.",
    fullContent: "In a stunning display of market dominance, the tech giant reported record-breaking quarterly earnings that exceeded Wall Street expectations by a significant margin. The company posted a 25% revenue growth year-over-year, driven primarily by strong cloud services adoption and AI product launches. CEO highlighted the successful integration of artificial intelligence across their product portfolio as a key growth driver. Analysts are now revising their annual projections upward, citing the company's strong market position and innovative product pipeline.",
    time: "5h ago",
    source: "Tech News Daily",
    relatedMarkets: [],
  },
  {
    id: 3,
    title: "Global Climate Summit Reaches Historic Agreement",
    summary: "195 nations commit to new carbon reduction targets for the next decade.",
    fullContent: "In a historic moment for global climate action, 195 nations have reached a comprehensive agreement on carbon reduction targets for the next decade. The agreement includes binding commitments to reduce greenhouse gas emissions by 50% by 2030, with specific provisions for technology transfer and financial support for developing nations. Environmental experts are calling this the most significant climate agreement since the Paris Accord, though some activists argue the targets don't go far enough to prevent catastrophic climate change.",
    time: "8h ago",
    source: "Global News Network",
    relatedMarkets: [],
  },
];

export default function News() {
  const [selectedNews, setSelectedNews] = useState<typeof newsItems[0] | null>(null);

  return (
    <div className="w-full md:container md:max-w-2xl py-4 md:py-6 space-y-4">
      <h1 className="text-2xl font-bold mb-4 md:mb-6 px-4">Latest News</h1>
      <div className="px-4">
        <FeedFilters />
      </div>
      <div className="space-y-0 md:space-y-4 md:px-4">
        {newsItems.map((item, index) => (
          <Card 
            key={index} 
            className="cursor-pointer transition-all hover:shadow-md md:rounded-lg rounded-none border-x-0 md:border-x border-t-0 md:border-t first:border-t"
            onClick={() => setSelectedNews(item)}
          >
            <CardContent className="p-4 md:p-6">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 space-y-2">
                  <h3 className="font-semibold text-base md:text-lg leading-tight">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.summary}</p>
                  <p className="text-xs text-muted-foreground">{item.time}</p>
                </div>
                <ExternalLink className="h-5 w-5 text-muted-foreground flex-shrink-0" />
              </div>
            </CardContent>
          </Card>
        ))}
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
