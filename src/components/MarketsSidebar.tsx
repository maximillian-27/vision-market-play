import { Users, Trophy, Timer, Ticket, Zap, Flame, Info } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useNavigate } from "react-router-dom";
import bitcoinImage from "@/assets/bitcoin-market.jpg";
import nbaImage from "@/assets/nba-championship.jpg";
import fedImage from "@/assets/federal-reserve.jpg";

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

const highlightedMarkets = [
  {
    id: "1",
    title: "Will Bitcoin reach $100,000 by end of 2025?",
    pot: "$2.4M",
    players: 12400,
    tag: "Trending",
  },
  {
    id: "3",
    title: "Will Apple release a foldable iPhone in 2025?",
    pot: "$1.2M",
    players: 6800,
    tag: "Hot",
  },
  {
    id: "6",
    title: "Will Tesla launch a $25,000 electric car in 2025?",
    pot: "$987K",
    players: 5400,
    tag: "Popular",
  },
  {
    id: "2",
    title: "Who will win the NBA Championship this season?",
    pot: "$890K",
    players: 8200,
    tag: "Trending",
  },
];

export function MarketsSidebar() {
  const navigate = useNavigate();

  return (
    <div className="hidden lg:block sticky top-20 w-72 self-start space-y-3">
      {/* Weekly Draw — promoted card */}
      <div className="rounded-xl border border-primary/20 bg-gradient-to-b from-primary/[0.08] to-card p-3.5">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-1.5">
            <div className="h-5 w-5 rounded-md bg-primary/15 flex items-center justify-center">
              <Trophy className="h-3 w-3 text-primary" />
            </div>
            <span className="text-[11px] font-bold text-primary uppercase tracking-wider">Weekly Draw</span>
            <Popover>
              <PopoverTrigger asChild>
                <button className="hover:opacity-70 transition-opacity">
                  <Info className="h-3 w-3 text-primary/60" />
                </button>
              </PopoverTrigger>
              <PopoverContent side="bottom" align="start" className="w-56 p-3 space-y-2">
                <p className="text-xs font-medium text-foreground">Weekly Draw</p>
                <p className="text-[11px] text-muted-foreground leading-relaxed">
                  Every ticket you buy is an automatic entry. 10 winners are drawn every Sunday. 1st place gets 50% of the pool!
                </p>
              </PopoverContent>
            </Popover>
          </div>
          <span className="flex items-center gap-1 text-[10px] text-muted-foreground bg-muted/50 px-2 py-0.5 rounded-full">
            <Timer className="h-3 w-3" />
            {COUNTDOWN}
          </span>
        </div>
        <div className="flex items-baseline justify-between">
          <span className="text-xl font-black tracking-tight">${WEEKLY_POT.toLocaleString()}</span>
          <span className="text-[10px] text-muted-foreground flex items-center gap-1">
            <Ticket className="h-3 w-3" />
            {MY_ENTRIES} entries
          </span>
        </div>
      </div>

      {/* Highlighted Markets */}
      <div className="rounded-xl border border-border/40 bg-card overflow-hidden">
        <div className="px-4 pt-3.5 pb-2">
          <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider flex items-center gap-1.5">
            <Flame className="h-3 w-3 text-amber-500" />
            Highlighted
          </h3>
        </div>
        <div className="px-2 pb-2 space-y-0.5">
          {highlightedMarkets.slice(0, 2).map((market) => (
            <div
              key={market.id}
              onClick={() => navigate(`/market/${market.id}`)}
              className="group cursor-pointer p-2.5 rounded-lg hover:bg-muted/50 transition-colors"
            >
              <div className="flex items-start justify-between gap-2 mb-1">
                <h4 className="text-[13px] font-medium leading-snug line-clamp-2 group-hover:text-primary transition-colors">
                  {market.title}
                </h4>
                <span className="text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded-full bg-amber-500/10 text-amber-500 flex-shrink-0">
                  {market.tag}
                </span>
              </div>
              <div className="flex items-center gap-2 text-[11px] text-muted-foreground">
                <span className="font-bold text-primary">{market.pot}</span>
                <span className="text-muted-foreground/30">·</span>
                <span className="flex items-center gap-0.5">
                  <Users className="h-3 w-3" />
                  {market.players.toLocaleString()}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
