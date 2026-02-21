import { TrendingUp, Clock } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import bitcoinImage from "@/assets/bitcoin-market.jpg";
import nbaImage from "@/assets/nba-championship.jpg";
import fedImage from "@/assets/federal-reserve.jpg";

const hottestMarkets = [
  {
    id: "1",
    title: "Will Bitcoin reach $100,000 by end of 2025?",
    image: bitcoinImage,
    volume: "$2.4M",
    yesPrice: 68,
  },
  {
    id: "4",
    title: "Next US Federal Reserve interest rate decision?",
    image: fedImage,
    volume: "$3.1M",
    yesPrice: 45,
  },
  {
    id: "2",
    title: "Who will win the NBA Championship this season?",
    image: nbaImage,
    volume: "$890K",
    yesPrice: 32,
  },
];

export function HottestMarkets() {
  const navigate = useNavigate();

  return (
    <div className="hidden lg:block sticky top-20 w-72 self-start">
      <Card className="border-border/40 overflow-hidden">
        <CardHeader className="pb-2 pt-4 px-4">
          <CardTitle className="text-sm font-semibold flex items-center gap-2">
            <TrendingUp className="h-4 w-4 text-primary" />
            Trending Now
          </CardTitle>
        </CardHeader>
        <CardContent className="p-2 pt-0">
          <div className="space-y-1">
            {hottestMarkets.map((market, index) => (
              <div
                key={market.id}
                onClick={() => navigate(`/market/${market.id}`)}
                className="group cursor-pointer flex gap-3 p-2.5 rounded-lg hover:bg-muted/50 transition-colors"
              >
                <img
                  src={market.image}
                  alt={market.title}
                  className="w-12 h-12 rounded-lg object-cover flex-shrink-0 ring-1 ring-border/30"
                />
                <div className="flex-1 min-w-0 space-y-1">
                  <h4 className="text-sm font-medium leading-tight line-clamp-2 group-hover:text-primary transition-colors">
                    {market.title}
                  </h4>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <span className="font-medium">{market.volume} Pot</span>
                    <span className="text-muted-foreground/40">•</span>
                    <span className="font-semibold text-success">Yes ${(market.yesPrice / 100).toFixed(2)}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
