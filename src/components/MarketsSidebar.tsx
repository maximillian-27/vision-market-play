import { Users, Trophy, Timer, Ticket, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import bitcoinImage from "@/assets/bitcoin-market.jpg";
import nbaImage from "@/assets/nba-championship.jpg";
import fedImage from "@/assets/federal-reserve.jpg";
import aiImage from "@/assets/ai-customer-service.jpg";

const WEEKLY_POT = 48600;
const COUNTDOWN = "3d 14h";
const MY_ENTRIES = 3;

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
      {/* Weekly Draw — minimal strip */}
      <div className="flex items-center justify-between rounded-xl border border-primary/20 bg-card px-3.5 py-2.5">
        <div className="flex items-center gap-2">
          <Trophy className="h-4 w-4 text-primary" />
          <div>
            <span className="text-sm font-bold text-primary">${WEEKLY_POT.toLocaleString()}</span>
            <span className="text-[10px] text-muted-foreground ml-1.5">prize pool</span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[10px] text-muted-foreground flex items-center gap-0.5">
            <Ticket className="h-3 w-3" />
            {MY_ENTRIES}
          </span>
          <span className="text-[10px] text-muted-foreground flex items-center gap-0.5">
            <Timer className="h-3 w-3" />
            {COUNTDOWN}
          </span>
        </div>
      </div>

      {/* Biggest Markets */}
      <div className="rounded-xl border border-border/40 bg-card overflow-hidden">
        <div className="px-4 pt-3.5 pb-2">
          <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Biggest Pots</h3>
        </div>
        <div className="px-2 pb-2">
          {biggestMarkets.map((market) => (
            <div
              key={market.id}
              onClick={() => navigate(`/market/${market.id}`)}
              className="group cursor-pointer flex gap-3 p-2 rounded-lg hover:bg-muted/50 transition-colors"
            >
              <img
                src={market.image}
                alt={market.title}
                className="w-11 h-11 rounded-lg object-cover flex-shrink-0"
              />
              <div className="flex-1 min-w-0 flex flex-col justify-center gap-0.5">
                <h4 className="text-[13px] font-medium leading-snug line-clamp-2 group-hover:text-primary transition-colors">
                  {market.title}
                </h4>
                <div className="flex items-center gap-2 text-[11px] text-muted-foreground">
                  <span className="font-bold text-primary">{market.pot}</span>
                  <span className="text-muted-foreground/30">·</span>
                  <span className="flex items-center gap-0.5">
                    <Users className="h-3 w-3" />
                    {market.players.toLocaleString()}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Sponsored Market */}
      <div
        className="rounded-xl border border-border/40 bg-card overflow-hidden cursor-pointer group"
        onClick={() => navigate(`/market/${sponsoredMarket.id}`)}
      >
        <div className="relative">
          <img
            src={sponsoredMarket.image}
            alt={sponsoredMarket.title}
            className="w-full h-32 object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-card via-card/50 to-transparent" />
          <span className="absolute top-2.5 left-2.5 text-[9px] font-medium text-muted-foreground/70 uppercase tracking-wider">
            Sponsored
          </span>
        </div>
        <div className="px-3.5 pb-3.5 -mt-8 relative z-10 space-y-2.5">
          <h4 className="text-[13px] font-semibold leading-snug line-clamp-2 group-hover:text-primary transition-colors">
            {sponsoredMarket.title}
          </h4>
          <div className="flex gap-1.5">
            {sponsoredMarket.outcomes.map((outcome) => (
              <button
                key={outcome.label}
                className={`flex-1 py-1.5 rounded-lg text-xs font-bold transition-colors ${
                  outcome.label === "Yes"
                    ? "bg-emerald-500/10 text-emerald-500 hover:bg-emerald-500/20"
                    : "bg-red-500/10 text-red-500 hover:bg-red-500/20"
                }`}
              >
                {outcome.label} {outcome.price}¢
              </button>
            ))}
          </div>
          <div className="flex items-center justify-between text-[11px] text-muted-foreground">
            <span className="font-bold text-primary">{sponsoredMarket.pot} pot</span>
            <span className="flex items-center gap-1">
              <Users className="h-3 w-3" />
              {sponsoredMarket.players.toLocaleString()}
              <ChevronRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
