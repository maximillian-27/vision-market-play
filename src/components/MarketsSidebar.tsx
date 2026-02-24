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
      <div className="rounded-xl border border-primary/20 bg-gradient-to-b from-primary/[0.08] to-card p-3.5">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-1.5">
            <div className="h-5 w-5 rounded-md bg-primary/15 flex items-center justify-center">
              <Trophy className="h-3 w-3 text-primary" />
            </div>
            <span className="text-[11px] font-bold text-primary uppercase tracking-wider">Weekly Draw</span>
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
