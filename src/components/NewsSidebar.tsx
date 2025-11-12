import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ExternalLink } from "lucide-react";

const newsArticles = [
  {
    id: "1",
    title: "Bitcoin ETFs See Record Inflows",
    summary: "Institutional investors pour $2.1B into Bitcoin ETFs this week.",
    source: "Bloomberg",
    time: "2h ago",
    url: "#"
  },
  {
    id: "2",
    title: "Apple Hints at Foldable Tech",
    summary: "Patent filings suggest Apple is exploring foldable display technology.",
    source: "TechCrunch",
    time: "4h ago",
    url: "#"
  },
  {
    id: "3",
    title: "Fed Signals Rate Hold",
    summary: "Federal Reserve officials indicate interest rates will remain steady.",
    source: "Reuters",
    time: "6h ago",
    url: "#"
  },
  {
    id: "4",
    title: "AI Adoption Accelerates",
    summary: "Fortune 500 companies increase AI spending by 40% in Q4.",
    source: "WSJ",
    time: "8h ago",
    url: "#"
  },
  {
    id: "5",
    title: "NBA Playoffs Heat Up",
    summary: "Lakers and Celtics emerge as championship favorites.",
    source: "ESPN",
    time: "10h ago",
    url: "#"
  },
  {
    id: "6",
    title: "Crypto Regulation Update",
    summary: "SEC announces new framework for cryptocurrency oversight.",
    source: "Financial Times",
    time: "12h ago",
    url: "#"
  }
];

export function NewsSidebar() {
  return (
    <div className="hidden lg:block lg:w-80 xl:w-96 sticky top-20 h-fit">
      <Card className="border-border/40">
        <CardHeader className="pb-3 px-5 pt-5">
          <CardTitle className="text-base font-semibold">Latest News</CardTitle>
        </CardHeader>
        <CardContent className="space-y-1 p-3 pt-0">
          {newsArticles.map((article) => (
            <a
              key={article.id}
              href={article.url}
              className="block group hover:bg-muted/40 rounded-lg p-3 transition-all"
            >
              <div className="space-y-1.5">
                <div className="flex items-start justify-between gap-2">
                  <h3 className="font-medium text-sm leading-snug">
                    {article.title}
                  </h3>
                  <ExternalLink className="h-3 w-3 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity shrink-0 mt-0.5" />
                </div>
                <p className="text-xs text-muted-foreground/80 line-clamp-2 leading-relaxed">
                  {article.summary}
                </p>
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span className="font-medium">{article.source}</span>
                  <span className="opacity-60">{article.time}</span>
                </div>
              </div>
            </a>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
