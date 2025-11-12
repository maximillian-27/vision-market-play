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
    <div className="hidden lg:block sticky top-20 w-80 self-start">
      <Card className="border-border/40">
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-primary" />
            Hottest Markets
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {hottestMarkets.map((market) => (
            <div
              key={market.id}
              onClick={() => navigate(`/market/${market.id}`)}
              className="group cursor-pointer border border-border/40 rounded-lg overflow-hidden hover:border-primary/40 transition-all"
            >
              <div className="relative aspect-video">
                <img
                  src={market.image}
                  alt={market.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-3 space-y-2">
                <h4 className="text-sm font-medium leading-tight line-clamp-2 group-hover:text-primary transition-colors">
                  {market.title}
                </h4>
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <TrendingUp className="h-3 w-3" />
                    <span>{market.volume}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="font-medium text-success">Yes {market.yesPrice}¢</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
