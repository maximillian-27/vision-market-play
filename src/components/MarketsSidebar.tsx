import { Users, Megaphone } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { WeeklyDrawCard } from "@/components/WeeklyDrawCard";
import bitcoinImage from "@/assets/bitcoin-market.jpg";
import nbaImage from "@/assets/nba-championship.jpg";
import fedImage from "@/assets/federal-reserve.jpg";
import aiImage from "@/assets/ai-customer-service.jpg";

const biggestMarkets = [
  {
    id: "4",
    title: "Next US Federal Reserve interest rate decision?",
    image: fedImage,
    pot: "$3.1M",
    players: 15200,
  },
  {
    id: "1",
    title: "Will Bitcoin reach $100,000 by end of 2025?",
    image: bitcoinImage,
    pot: "$2.4M",
    players: 12400,
  },
  {
    id: "2",
    title: "Who will win the NBA Championship this season?",
    image: nbaImage,
    pot: "$890K",
    players: 8200,
  },
];

const sponsoredMarket = {
  id: "5",
  title: "Will AI replace 25% of customer service jobs by 2026?",
  image: aiImage,
  outcomes: [
    { label: "Yes", price: 71 },
    { label: "No", price: 29 },
  ],
  pot: "$1.8M",
  players: 9400,
};

export function MarketsSidebar() {
  const navigate = useNavigate();

  return (
    <div className="hidden lg:block sticky top-20 w-72 self-start space-y-3">
      {/* Weekly Draw */}
      <WeeklyDrawCard />

      {/* Biggest Markets */}
      <Card className="border-border/40 overflow-hidden">
        <CardHeader className="pb-2 pt-4 px-4">
          <CardTitle className="text-sm font-semibold">Biggest Pots</CardTitle>
        </CardHeader>
        <CardContent className="p-2 pt-0">
          <div className="space-y-1">
            {biggestMarkets.map((market) => (
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
                    <span className="font-extrabold text-primary">{market.pot}</span>
                    <span className="text-muted-foreground/40">•</span>
                    <span className="flex items-center gap-0.5">
                      <Users className="h-3 w-3" />
                      {market.players.toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Sponsored Market */}
      <Card
        className="border-border/40 overflow-hidden cursor-pointer group"
        onClick={() => navigate(`/market/${sponsoredMarket.id}`)}
      >
        <div className="relative">
          <img
            src={sponsoredMarket.image}
            alt={sponsoredMarket.title}
            className="w-full h-28 object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/40 to-transparent" />
          <Badge className="absolute top-2 left-2 text-[9px] px-1.5 py-0 bg-muted/80 text-muted-foreground border-0 backdrop-blur-sm">
            <Megaphone className="h-2.5 w-2.5 mr-0.5" />
            Sponsored
          </Badge>
        </div>
        <div className="px-3 pb-3 -mt-6 relative z-10 space-y-2">
          <h4 className="text-sm font-semibold leading-tight line-clamp-2 group-hover:text-primary transition-colors">
            {sponsoredMarket.title}
          </h4>
          <div className="flex gap-2">
            {sponsoredMarket.outcomes.map((outcome) => (
              <div
                key={outcome.label}
                className={`flex-1 text-center py-1.5 rounded-lg text-xs font-bold ${
                  outcome.label === "Yes"
                    ? "bg-emerald-500/10 text-emerald-500"
                    : "bg-red-500/10 text-red-500"
                }`}
              >
                {outcome.label} {outcome.price}¢
              </div>
            ))}
          </div>
          <div className="flex items-center justify-between text-[11px] text-muted-foreground">
            <span className="font-extrabold text-primary">{sponsoredMarket.pot}</span>
            <span className="flex items-center gap-0.5">
              <Users className="h-3 w-3" />
              {sponsoredMarket.players.toLocaleString()}
            </span>
          </div>
        </div>
      </Card>
    </div>
  );
}
