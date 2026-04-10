import { Timer, TrendingUp, TrendingDown, Dices } from "lucide-react";
import { useNavigate } from "react-router-dom";

/* ── Shared badge ── */
function LiveBadge({ label }: { label: string }) {
  return (
    <span className="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded-full bg-primary/15 border border-primary/20 text-[7px] font-bold text-primary uppercase tracking-wider">
      <span className="h-1 w-1 rounded-full bg-primary animate-pulse" />
      {label}
    </span>
  );
}

function FastTimer({ label }: { label: string }) {
  return (
    <span className="inline-flex items-center gap-0.5 text-[8px] text-muted-foreground">
      <Timer className="h-2.5 w-2.5 text-primary" />
      <span className="font-semibold text-foreground">{label}</span>
    </span>
  );
}

/* ═══════════════════════════════════════
   1. BTC vs ETH Race
   ═══════════════════════════════════════ */
export function BTCvsETHCard() {
  const navigate = useNavigate();
  return (
    <div
      onClick={() => navigate("/fast-predict")}
      className="flex flex-col p-2.5 rounded-xl border border-primary/20 bg-gradient-to-br from-primary/[0.06] to-card hover:from-primary/[0.12] cursor-pointer transition-all duration-200 h-full group"
    >
      <div className="flex items-center justify-between mb-1">
        <LiveBadge label="Fast" />
        <FastTimer label="Next 10 min" />
      </div>

      <p className="text-[9px] text-muted-foreground leading-none">BTC vs ETH</p>
      <h4 className="text-[11px] font-bold leading-[1.2] mb-1.5 text-foreground group-hover:text-primary transition-colors line-clamp-2">
        Which hits +1% first?
      </h4>

      <div className="flex gap-1.5 mt-auto">
        <button
          className="flex-1 flex items-center justify-center gap-1 rounded-lg py-1.5 bg-amber-500/10 hover:bg-amber-500/25 border border-amber-500/25 hover:border-amber-500/50 text-amber-600 dark:text-amber-400 transition-all active:scale-[0.97]"
          onClick={(e) => e.stopPropagation()}
        >
          <span className="text-xs">₿</span>
          <span className="text-[9px] font-bold whitespace-nowrap">BTC</span>
        </button>
        <button
          className="flex-1 flex items-center justify-center gap-1 rounded-lg py-1.5 bg-indigo-500/10 hover:bg-indigo-500/25 border border-indigo-500/25 hover:border-indigo-500/50 text-indigo-600 dark:text-indigo-400 transition-all active:scale-[0.97]"
          onClick={(e) => e.stopPropagation()}
        >
          <span className="text-xs">Ξ</span>
          <span className="text-[9px] font-bold whitespace-nowrap">ETH</span>
        </button>
      </div>

      <div className="flex items-center justify-between mt-1">
        <span className="text-[8px] text-muted-foreground">342 playing</span>
        <span className="text-primary text-[9px] font-extrabold">$2.4K pot</span>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════
   2. Red or Green Candle
   ═══════════════════════════════════════ */
export function CandleCard() {
  const navigate = useNavigate();
  return (
    <div
      onClick={() => navigate("/fast-predict")}
      className="flex flex-col p-2.5 rounded-xl border border-primary/20 bg-gradient-to-br from-primary/[0.06] to-card hover:from-primary/[0.12] cursor-pointer transition-all duration-200 h-full group"
    >
      <div className="flex items-center justify-between mb-1">
        <LiveBadge label="Live" />
        <FastTimer label="60s" />
      </div>

      <p className="text-[9px] text-muted-foreground leading-none">BTC · 1 min chart</p>
      <h4 className="text-[11px] font-bold leading-[1.2] mb-1.5 text-foreground group-hover:text-primary transition-colors line-clamp-2">
        Next candle color?
      </h4>

      {/* Mini sparkline */}
      <div className="flex items-end gap-[2px] h-4 mb-1.5 px-0.5">
        {[10, 15, 8, 18, 12, 16, 7, 13, 20, 11, 16, 9].map((h, i) => (
          <div
            key={i}
            className={`flex-1 rounded-[1px] ${i % 2 === 0 ? "bg-yes/40" : "bg-no/40"}`}
            style={{ height: `${h}px` }}
          />
        ))}
        <div className="flex-1 rounded-[1px] bg-muted-foreground/30 animate-pulse" style={{ height: "13px" }} />
      </div>

      <div className="flex gap-1.5 mt-auto">
        <button
          className="flex-1 rounded-lg py-1.5 text-center bg-yes/15 hover:bg-yes text-yes hover:text-yes-foreground border border-yes/30 hover:border-yes transition-all active:scale-[0.97] text-[9px] font-bold flex items-center justify-center gap-0.5 whitespace-nowrap"
          onClick={(e) => e.stopPropagation()}
        >
          <TrendingUp className="h-2.5 w-2.5" /> Green
        </button>
        <button
          className="flex-1 rounded-lg py-1.5 text-center bg-no/15 hover:bg-no text-no hover:text-no-foreground border border-no/30 hover:border-no transition-all active:scale-[0.97] text-[9px] font-bold flex items-center justify-center gap-0.5 whitespace-nowrap"
          onClick={(e) => e.stopPropagation()}
        >
          <TrendingDown className="h-2.5 w-2.5" /> Red
        </button>
      </div>

      <div className="flex items-center justify-between mt-1">
        <span className="text-[8px] text-muted-foreground">891 playing</span>
        <span className="text-primary text-[9px] font-extrabold">$1.8K pot</span>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════
   3. Pollgy Logo Color
   ═══════════════════════════════════════ */
const colorOptions = [
  { label: "Green", color: "bg-pollgy-green", border: "border-pollgy-green/40 hover:border-pollgy-green", text: "text-pollgy-green", bg: "bg-pollgy-green/12 hover:bg-pollgy-green/25" },
  { label: "Blue", color: "bg-pollgy-blue", border: "border-pollgy-blue/40 hover:border-pollgy-blue", text: "text-pollgy-blue", bg: "bg-pollgy-blue/12 hover:bg-pollgy-blue/25" },
];

export function LogoColorCard() {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate("/fast-predict")}
      className="flex flex-col p-2.5 rounded-xl border border-primary/20 bg-gradient-to-br from-primary/[0.06] to-card hover:from-primary/[0.12] cursor-pointer transition-all duration-200 h-full group"
    >
      <div className="flex items-center justify-between mb-1">
        <LiveBadge label="Fast" />
        <FastTimer label="5 min" />
      </div>

      <p className="text-[9px] text-muted-foreground leading-none">Pollgy Spin</p>
      <h4 className="text-[11px] font-bold leading-[1.2] text-foreground group-hover:text-primary transition-colors line-clamp-2">
        Which color lands?
      </h4>
      <p className="text-[7px] text-muted-foreground mb-1.5 truncate">Top color of the Pollgy logo wins</p>

      {/* Pollgy logo spin */}
      <div className="flex items-center justify-center mb-1.5">
        <div className="relative w-9 h-9 group-hover:animate-spin" style={{ animationDuration: "2s" }}>
          <div className="absolute top-0 left-0 w-6 h-6 rounded-full bg-pollgy-green shadow-sm shadow-pollgy-green/30" />
          <div className="absolute bottom-0 right-0 w-6 h-6 rounded-full bg-pollgy-blue shadow-sm shadow-pollgy-blue/30" />
        </div>
      </div>

      <div className="flex gap-1.5 mt-auto">
        {colorOptions.map((c) => (
          <button
            key={c.label}
            className={`flex-1 flex items-center justify-center gap-1 rounded-lg py-1.5 ${c.bg} border ${c.border} ${c.text} transition-all active:scale-[0.97] text-[10px] font-bold whitespace-nowrap`}
            onClick={(e) => e.stopPropagation()}
          >
            <span className={`w-2 h-2 rounded-full ${c.color}`} />
            {c.label}
          </button>
        ))}
      </div>

      <div className="flex items-center justify-between mt-1">
        <span className="text-[8px] text-muted-foreground">567 playing</span>
        <span className="text-primary text-[9px] font-extrabold">$980 pot</span>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════
   4. Dice / RNG
   ═══════════════════════════════════════ */
export function DiceCard() {
  const navigate = useNavigate();
  const numbers = [1, 2, 3, 4, 5, 6];

  return (
    <div
      onClick={() => navigate("/fast-predict")}
      className="flex flex-col p-2.5 rounded-xl border border-primary/20 bg-gradient-to-br from-primary/[0.06] to-card hover:from-primary/[0.12] cursor-pointer transition-all duration-200 h-full group"
    >
      <div className="flex items-center justify-between mb-1">
        <LiveBadge label="Fast" />
        <FastTimer label="2 min" />
      </div>

      <p className="text-[9px] text-muted-foreground leading-none">Dice Roll</p>
      <h4 className="text-[11px] font-bold leading-[1.2] mb-1.5 text-foreground group-hover:text-primary transition-colors line-clamp-2">
        What number hits next?
      </h4>

      {/* Dice visual */}
      <div className="flex items-center justify-center mb-1.5">
        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-secondary to-muted border border-border/60 flex items-center justify-center shadow-sm group-hover:rotate-12 transition-transform duration-300">
          <Dices className="h-4 w-4 text-primary" />
        </div>
      </div>

      {/* Number chips */}
      <div className="grid grid-cols-6 gap-0.5 mt-auto">
        {numbers.map((n) => (
          <button
            key={n}
            className="rounded-md py-1 text-center text-[9px] font-bold bg-secondary/60 hover:bg-primary/15 hover:text-primary border border-border/30 hover:border-primary/30 transition-all active:scale-[0.95]"
            onClick={(e) => e.stopPropagation()}
          >
            {n}
          </button>
        ))}
      </div>

      <div className="flex items-center justify-between mt-1">
        <span className="text-[8px] text-muted-foreground">234 playing</span>
        <span className="text-primary text-[9px] font-extrabold">$640 pot</span>
      </div>
    </div>
  );
}
