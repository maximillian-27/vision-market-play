import { Users, Trophy, Timer, Ticket, Zap } from "lucide-react";
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

export function MarketsSidebar() {
  const navigate = useNavigate();

  return (
    <div className="hidden lg:block sticky top-20 w-72 self-start space-y-3">
      {/* Weekly Draw — promoted card */}
      <div className="rounded-xl border border-primary/25 bg-gradient-to-br from-primary/[0.12] via-primary/[0.04] to-card p-4 relative overflow-hidden shadow-sm shadow-primary/5">
        <div className="absolute -top-10 -right-10 w-28 h-28 rounded-full bg-primary/[0.1] blur-3xl pointer-events-none" />
        <div className="flex items-center gap-2 mb-2">
          <div className="flex items-center justify-center w-6 h-6 rounded-lg bg-primary/15 ring-1 ring-primary/10">
            <Trophy className="h-3.5 w-3.5 text-primary" />
          </div>
          <span className="text-[10px] uppercase tracking-widest font-bold text-primary">Weekly Draw</span>
        </div>
        <div className="flex items-baseline gap-2 mb-1">
          <span className="text-2xl font-black text-foreground tracking-tight">${WEEKLY_POT.toLocaleString()}</span>
          <span className="text-[10px] text-muted-foreground">prize pool</span>
        </div>
        <div className="flex items-center gap-3 text-[10px] text-muted-foreground">
          <span className="flex items-center gap-1">
            <Timer className="h-3 w-3 text-primary animate-pulse" />
            <span className="font-semibold text-foreground">{COUNTDOWN}</span>
          </span>
          <span className="flex items-center gap-1 bg-primary/10 px-2 py-0.5 rounded-full border border-primary/15">
            <Ticket className="h-3 w-3 text-primary" />
            <span className="font-semibold text-foreground">{MY_ENTRIES} entries</span>
          </span>
        </div>
        <p className="text-[9px] text-muted-foreground mt-2 flex items-center gap-1">
          <Zap className="h-3 w-3" />
          Every ticket = market ticket + draw entry
        </p>
      </div>

      {/* Biggest Pots */}
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
    </div>
  );
}
