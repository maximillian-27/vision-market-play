import { Card, CardContent } from "@/components/ui/card";
import { ExternalLink } from "lucide-react";

const newsItems = [
  {
    id: 1,
    title: "Federal Reserve Announces New Interest Rate Decision",
    summary: "The Fed maintains rates at 5.25-5.50% amid economic uncertainty and inflation concerns.",
    time: "2h ago",
    source: "Federal Reserve",
  },
  {
    id: 2,
    title: "Major Tech Company Reports Record Quarterly Earnings",
    summary: "Q4 results exceed expectations with 25% revenue growth year-over-year.",
    time: "5h ago",
    source: "Tech News Daily",
  },
  {
    id: 3,
    title: "Global Climate Summit Reaches Historic Agreement",
    summary: "195 nations commit to new carbon reduction targets for the next decade.",
    time: "8h ago",
    source: "Global News Network",
  },
];

export function NewsSidebar() {
  return (
    <div className="w-80 space-y-4 sticky top-6">
      <div className="flex items-center justify-between px-1">
        <h2 className="text-lg font-semibold">Latest News</h2>
        <a href="/news" className="text-sm text-primary hover:underline">
          View all
        </a>
      </div>
      
      <div className="space-y-3">
        {newsItems.map((item) => (
          <Card 
            key={item.id} 
            className="cursor-pointer transition-all hover:shadow-md hover:border-primary/20"
          >
            <CardContent className="p-4">
              <div className="space-y-2">
                <div className="flex items-start justify-between gap-2">
                  <h3 className="font-medium text-sm leading-tight line-clamp-2">
                    {item.title}
                  </h3>
                  <ExternalLink className="h-4 w-4 text-muted-foreground flex-shrink-0 mt-0.5" />
                </div>
                <p className="text-xs text-muted-foreground line-clamp-2">
                  {item.summary}
                </p>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <span className="font-medium">{item.source}</span>
                  <span>•</span>
                  <span>{item.time}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
