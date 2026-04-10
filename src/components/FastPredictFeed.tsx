import { Timer, Zap, TrendingUp, TrendingDown, Dices, RotateCcw, Users, Hash, Crown, Eye, Ticket, Target, BarChart3, Sparkles } from "lucide-react";
import { Card } from "@/components/ui/card";

function LiveBadge({ label, variant = "default" }: { label: string; variant?: "default" | "warn" | "accent" }) {
  const colors = {
    default: "bg-primary/15 border-primary/20 text-primary",
    warn: "bg-amber-500/15 border-amber-500/20 text-amber-500",
    accent: "bg-purple-500/15 border-purple-500/20 text-purple-500",
  };
  return (
    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full border text-[9px] font-bold uppercase tracking-wider ${colors[variant]}`}>
      <span className={`h-1.5 w-1.5 rounded-full animate-pulse ${variant === "default" ? "bg-primary" : variant === "warn" ? "bg-amber-500" : "bg-purple-500"}`} />
      {label}
    </span>
  );
}

interface FastGameCardProps {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  badge: string;
  badgeVariant?: "default" | "warn" | "accent";
  timer: string;
  players: number;
  pot: string;
  children: React.ReactNode;
}

function FastGameCard({ icon, title, subtitle, badge, badgeVariant = "default", timer, players, pot, children }: FastGameCardProps) {
  return (
    <Card className="group overflow-hidden cursor-pointer border-primary/15 bg-gradient-to-br from-primary/[0.04] to-card hover:from-primary/[0.10] transition-all duration-200 rounded-xl">
      <div className="p-4 flex flex-col h-full gap-2.5">
        {/* Header */}
        <div className="flex items-center justify-between">
          <LiveBadge label={badge} variant={badgeVariant} />
          <span className="inline-flex items-center gap-0.5 text-[10px] text-muted-foreground">
            <Timer className="h-3 w-3 text-primary" />
            <span className="font-semibold text-foreground">{timer}</span>
          </span>
        </div>

        {/* Icon + Title */}
        <div className="flex items-start gap-2.5">
          <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-primary/10 shrink-0">
            {icon}
          </div>
          <div>
            <p className="text-[10px] text-muted-foreground">{subtitle}</p>
            <h4 className="text-sm font-bold leading-tight text-foreground group-hover:text-primary transition-colors">{title}</h4>
          </div>
        </div>

        {/* Content (outcomes, buttons, etc.) */}
        <div className="flex-1">{children}</div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-1 border-t border-border/30">
          <span className="text-[10px] text-muted-foreground flex items-center gap-1">
            <Users className="h-3 w-3" /> {players.toLocaleString()} playing
          </span>
          <span className="text-primary text-xs font-extrabold">{pot}</span>
        </div>
      </div>
    </Card>
  );
}

export function FastPredictFeed() {
  return (
    <div className="space-y-4">
      {/* Section header */}
      <div className="flex items-center gap-2">
        <div className="flex items-center justify-center w-7 h-7 rounded-lg bg-primary/10">
          <Zap className="h-4 w-4 text-primary" />
        </div>
        <div>
          <h3 className="text-base font-bold text-foreground">Fast Predict</h3>
          <p className="text-xs text-muted-foreground">Instant prediction games — resolve in minutes, not months</p>
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
        {/* 1. BTC/ETH Price Prediction */}
        <FastGameCard icon={<TrendingUp className="h-4 w-4 text-primary" />} title="BTC price in 10 min?" subtitle="Crypto · Price Prediction" badge="Live" timer="10 min" players={412} pot="$3.2K">
          <div className="flex gap-1.5">
            <button className="flex-1 rounded-lg py-2 text-center bg-yes/15 hover:bg-yes text-yes hover:text-yes-foreground border border-yes/30 transition-all active:scale-[0.97] text-[11px] font-bold">↑ Up</button>
            <button className="flex-1 rounded-lg py-2 text-center bg-no/15 hover:bg-no text-no hover:text-no-foreground border border-no/30 transition-all active:scale-[0.97] text-[11px] font-bold">↓ Down</button>
          </div>
        </FastGameCard>

        {/* 2. BTC vs ETH Race */}
        <FastGameCard icon={<BarChart3 className="h-4 w-4 text-primary" />} title="Which hits +1% first?" subtitle="BTC vs ETH · Race" badge="Fast" timer="Next 10 min" players={342} pot="$2.4K">
          <div className="flex gap-1.5">
            <button className="flex-1 flex items-center justify-center gap-1 rounded-lg py-2 bg-amber-500/10 hover:bg-amber-500/25 border border-amber-500/25 text-amber-600 dark:text-amber-400 transition-all active:scale-[0.97] text-[11px] font-bold">₿ BTC</button>
            <button className="flex-1 flex items-center justify-center gap-1 rounded-lg py-2 bg-indigo-500/10 hover:bg-indigo-500/25 border border-indigo-500/25 text-indigo-600 dark:text-indigo-400 transition-all active:scale-[0.97] text-[11px] font-bold">Ξ ETH</button>
          </div>
        </FastGameCard>

        {/* 3. Red or Green Candle */}
        <FastGameCard icon={<TrendingUp className="h-4 w-4 text-primary" />} title="Next 1m candle?" subtitle="BTC · Candle Prediction" badge="Live" timer="60s" players={891} pot="$1.8K">
          <div className="flex gap-1.5">
            <button className="flex-1 rounded-lg py-2 text-center bg-yes/15 hover:bg-yes text-yes hover:text-yes-foreground border border-yes/30 transition-all active:scale-[0.97] text-[11px] font-bold flex items-center justify-center gap-1"><TrendingUp className="h-3 w-3" /> Green</button>
            <button className="flex-1 rounded-lg py-2 text-center bg-no/15 hover:bg-no text-no hover:text-no-foreground border border-no/30 transition-all active:scale-[0.97] text-[11px] font-bold flex items-center justify-center gap-1"><TrendingDown className="h-3 w-3" /> Red</button>
          </div>
        </FastGameCard>

        {/* 4. Dice */}
        <FastGameCard icon={<Dices className="h-4 w-4 text-primary" />} title="What number hits next?" subtitle="Dice Roll · RNG" badge="Fast" timer="2 min" players={234} pot="$640">
          <div className="grid grid-cols-6 gap-1">
            {[1, 2, 3, 4, 5, 6].map((n) => (
              <button key={n} className="rounded-md py-1.5 text-center text-[11px] font-bold bg-secondary/60 hover:bg-primary/15 hover:text-primary border border-border/30 hover:border-primary/30 transition-all active:scale-[0.95]">{n}</button>
            ))}
          </div>
        </FastGameCard>

        {/* 5. Pollgy Logo Color */}
        <FastGameCard icon={<RotateCcw className="h-4 w-4 text-primary" />} title="Which color lands?" subtitle="Pollgy Spin · Color" badge="Fast" timer="5 min" players={567} pot="$980">
          <div className="grid grid-cols-4 gap-1">
            {[
              { label: "Green", cls: "bg-pollgy-green" },
              { label: "Blue", cls: "bg-pollgy-blue" },
              { label: "Purple", cls: "bg-purple-500" },
              { label: "Gold", cls: "bg-amber-500" },
            ].map((c) => (
              <button key={c.label} className="rounded-md py-1.5 text-center text-[9px] font-bold bg-secondary/50 hover:bg-secondary border border-border/30 transition-all active:scale-[0.95] flex flex-col items-center gap-0.5">
                <span className={`w-3 h-3 rounded-full ${c.cls}`} />
                {c.label}
              </button>
            ))}
          </div>
        </FastGameCard>

        {/* 6. Guess Weekly Draw Amount */}
        <FastGameCard icon={<Crown className="h-4 w-4 text-primary" />} title="Guess the draw amount" subtitle="Weekly Draw · Prediction" badge="Multi-outcome" badgeVariant="accent" timer="3d 14h" players={189} pot="$1.2K">
          <div className="grid grid-cols-3 gap-1">
            {["<$40K", "$40-50K", "$50-60K", "$60-70K", "$70-80K", ">$80K"].map((r) => (
              <button key={r} className="rounded-md py-1.5 text-center text-[9px] font-bold bg-secondary/50 hover:bg-primary/15 hover:text-primary border border-border/30 hover:border-primary/30 transition-all active:scale-[0.95]">{r}</button>
            ))}
          </div>
        </FastGameCard>

        {/* 7. Random Number Generator */}
        <FastGameCard icon={<Hash className="h-4 w-4 text-primary" />} title="Pick a number (1–10)" subtitle="RNG · Every 60 seconds" badge="Live" timer="60s" players={456} pot="$520">
          <div className="grid grid-cols-5 gap-1">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((n) => (
              <button key={n} className="rounded-full w-full aspect-square flex items-center justify-center text-[10px] font-bold bg-secondary/60 hover:bg-primary hover:text-primary-foreground border border-border/30 hover:border-primary transition-all active:scale-[0.90]">{n}</button>
            ))}
          </div>
        </FastGameCard>

        {/* 8. Crowd Bets */}
        <FastGameCard icon={<Users className="h-4 w-4 text-primary" />} title="Will majority bet YES?" subtitle="Crowd Behavior · Meta" badge="Crowd" badgeVariant="accent" timer="30 min" players={723} pot="$1.5K">
          <div className="flex gap-1.5">
            <button className="flex-1 rounded-lg py-2 text-center bg-yes/15 hover:bg-yes text-yes hover:text-yes-foreground border border-yes/30 transition-all active:scale-[0.97] text-[11px] font-bold">Yes (&gt;50%)</button>
            <button className="flex-1 rounded-lg py-2 text-center bg-no/15 hover:bg-no text-no hover:text-no-foreground border border-no/30 transition-all active:scale-[0.97] text-[11px] font-bold">No (&lt;50%)</button>
          </div>
        </FastGameCard>

        {/* 9. Next Viral Event */}
        <FastGameCard icon={<Eye className="h-4 w-4 text-primary" />} title="Elon tweets in next 24h?" subtitle="Viral Event · Social" badge="Live" badgeVariant="warn" timer="24h" players={1204} pot="$4.1K">
          <div className="grid grid-cols-4 gap-1">
            {["0–5", "6–10", "11–20", "20+"].map((r) => (
              <button key={r} className="rounded-md py-1.5 text-center text-[9px] font-bold bg-secondary/50 hover:bg-primary/15 hover:text-primary border border-border/30 hover:border-primary/30 transition-all active:scale-[0.95]">{r}</button>
            ))}
          </div>
        </FastGameCard>

        {/* 10. Random Winner Draw */}
        <FastGameCard icon={<Ticket className="h-4 w-4 text-primary" />} title="Enter the random draw" subtitle="Lucky Draw · Randomized" badge="Draw" badgeVariant="accent" timer="1h" players={312} pot="$2.8K">
          <button className="w-full rounded-lg py-2.5 text-center bg-primary/10 hover:bg-primary text-primary hover:text-primary-foreground border border-primary/30 hover:border-primary transition-all active:scale-[0.97] text-xs font-bold flex items-center justify-center gap-1.5">
            <Ticket className="h-3.5 w-3.5" /> Buy Entry — $5
          </button>
        </FastGameCard>
      </div>
    </div>
  );
}
