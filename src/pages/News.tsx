import { Card, CardContent } from "@/components/ui/card";
import { ExternalLink } from "lucide-react";
import { FeedFilters } from "@/components/FeedFilters";

const newsItems = [
  {
    title: "Federal Reserve Announces New Interest Rate Decision",
    summary: "The Fed maintains rates at 5.25-5.50% amid economic uncertainty and inflation concerns.",
    time: "2h ago",
  },
  {
    title: "Major Tech Company Reports Record Quarterly Earnings",
    summary: "Q4 results exceed expectations with 25% revenue growth year-over-year.",
    time: "5h ago",
  },
  {
    title: "Global Climate Summit Reaches Historic Agreement",
    summary: "195 nations commit to new carbon reduction targets for the next decade.",
    time: "8h ago",
  },
];

export default function News() {
  return (
    <div className="w-full md:container md:max-w-2xl py-4 md:py-6 space-y-4">
      <h1 className="text-2xl font-bold mb-4 md:mb-6 px-4">Latest News</h1>
      <div className="px-4">
        <FeedFilters />
      </div>
      <div className="space-y-0 md:space-y-4 md:px-4">
        {newsItems.map((item, index) => (
          <Card key={index} className="cursor-pointer transition-all hover:shadow-md md:rounded-lg rounded-none border-x-0 md:border-x border-t-0 md:border-t first:border-t">
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
    </div>
  );
}
