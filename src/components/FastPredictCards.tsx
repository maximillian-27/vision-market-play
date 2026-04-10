import { Timer, Zap, TrendingUp, TrendingDown, Dices, RotateCcw, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";

/* ── Shared badge ── */
function LiveBadge({ label }: { label: string }) {
  return (
    <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full bg-primary/15 border border-primary/20 text-[8px] font-bold text-primary uppercase tracking-wider">
      <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
      {label}
    </span>
  );
}

function FastTimer({ label }: { label: string }) {
  return (
    <span className="inline-flex items-center gap-0.5 text-[9px] text-muted-foreground">
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
      className="flex flex-col p-3 rounded-xl border border-primary/20 bg-gradient-to-br from-primary/[0.06] to-card hover:from-primary/[0.12] cursor-pointer transition-all duration-200 h-full group"
    >
      <div className="flex items-center justify-between mb-1.5">
        <LiveBadge label="Fast" />
        <FastTimer label="Next 10 min" />
      </div>

      <p className="text-[10px] text-muted-foreground mb-0.5">BTC vs ETH</p>
      <h4 className="text-xs font-bold leading-tight mb-2 text-foreground group-hover:text-primary transition-colors">
        Which hits +1% first?
      </h4>

      {/* Crypto icons + choice buttons */}
      <div className="flex gap-1.5 mt-auto">
        <button
          className="flex-1 flex items-center justify-center gap-1.5 rounded-lg py-2 bg-amber-500/10 hover:bg-amber-500/25 border border-amber-500/25 hover:border-amber-500/50 text-amber-600 dark:text-amber-400 transition-all active:scale-[0.97]"
          onClick={(e) => e.stopPropagation()}
        >
          <span className="text-sm">₿</span>
          <span className="text-[10px] font-bold">BTC</span>
        </button>
        <button
          className="flex-1 flex items-center justify-center gap-1.5 rounded-lg py-2 bg-indigo-500/10 hover:bg-indigo-500/25 border border-indigo-500/25 hover:border-indigo-500/50 text-indigo-600 dark:text-indigo-400 transition-all active:scale-[0.97]"
          onClick={(e) => e.stopPropagation()}
        >
          <span className="text-sm">Ξ</span>
          <span className="text-[10px] font-bold">ETH</span>
        </button>
      </div>

      <div className="flex items-center justify-between mt-1.5">
        <span className="text-[9px] text-muted-foreground">342 playing</span>
        <span className="text-primary text-[10px] font-extrabold">$2.4K pot</span>
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
      className="flex flex-col p-3 rounded-xl border border-primary/20 bg-gradient-to-br from-primary/[0.06] to-card hover:from-primary/[0.12] cursor-pointer transition-all duration-200 h-full group"
    >
      <div className="flex items-center justify-between mb-1.5">
        <LiveBadge label="Live" />
        <FastTimer label="60s" />
      </div>

      <p className="text-[10px] text-muted-foreground mb-0.5">BTC · 1 min chart</p>
      <h4 className="text-xs font-bold leading-tight mb-2 text-foreground group-hover:text-primary transition-colors">
        Next candle color?
      </h4>

      {/* Mini sparkline hint */}
      <div className="flex items-end gap-[2px] h-5 mb-2 px-1">
        {[12, 18, 10, 22, 15, 20, 8, 16, 24, 14, 19, 11].map((h, i) => (
          <div
            key={i}
            className={`flex-1 rounded-[1px] ${i % 2 === 0 ? "bg-yes/40" : "bg-no/40"}`}
            style={{ height: `${h}px` }}
          />
        ))}
        <div className="flex-1 rounded-[1px] bg-muted-foreground/30 animate-pulse" style={{ height: "16px" }} />
      </div>

      <div className="flex gap-1.5 mt-auto">
        <button
          className="flex-1 rounded-lg py-2 text-center bg-yes/15 hover:bg-yes text-yes hover:text-yes-foreground border border-yes/30 hover:border-yes transition-all active:scale-[0.97] text-[10px] font-bold flex items-center justify-center gap-1"
          onClick={(e) => e.stopPropagation()}
        >
          <TrendingUp className="h-3 w-3" /> Green
        </button>
        <button
          className="flex-1 rounded-lg py-2 text-center bg-no/15 hover:bg-no text-no hover:text-no-foreground border border-no/30 hover:border-no transition-all active:scale-[0.97] text-[10px] font-bold flex items-center justify-center gap-1"
          onClick={(e) => e.stopPropagation()}
        >
          <TrendingDown className="h-3 w-3" /> Red
        </button>
      </div>

      <div className="flex items-center justify-between mt-1.5">
        <span className="text-[9px] text-muted-foreground">891 playing</span>
        <span className="text-primary text-[10px] font-extrabold">$1.8K pot</span>
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
      className="flex flex-col p-3 rounded-xl border border-primary/20 bg-gradient-to-br from-primary/[0.06] to-card hover:from-primary/[0.12] cursor-pointer transition-all duration-200 h-full group"
    >
      <div className="flex items-center justify-between mb-1.5">
        <LiveBadge label="Fast" />
        <FastTimer label="5 min" />
      </div>

      <p className="text-[10px] text-muted-foreground mb-0.5">Pollgy Spin</p>
      <h4 className="text-xs font-bold leading-tight text-foreground group-hover:text-primary transition-colors">
        Which color lands?
      </h4>
      <p className="text-[8px] text-muted-foreground mb-2">Top color of the Pollgy logo wins</p>

      {/* Pollgy logo spin — two-circle system */}
      <div className="flex items-center justify-center mb-2">
        <div className="relative w-11 h-11 group-hover:animate-spin" style={{ animationDuration: "2s" }}>
          {/* Green circle — top-left */}
          <div className="absolute top-0 left-0 w-7 h-7 rounded-full bg-pollgy-green shadow-sm shadow-pollgy-green/30" />
          {/* Blue circle — bottom-right, overlapping */}
          <div className="absolute bottom-0 right-0 w-7 h-7 rounded-full bg-pollgy-blue shadow-sm shadow-pollgy-blue/30" />
        </div>
      </div>

      {/* Two outcome buttons */}
      <div className="flex gap-1.5 mt-auto">
        {colorOptions.map((c) => (
          <button
            key={c.label}
            className={`flex-1 flex items-center justify-center gap-1.5 rounded-lg py-2 ${c.bg} border ${c.border} ${c.text} transition-all active:scale-[0.97] text-[11px] font-bold`}
            onClick={(e) => e.stopPropagation()}
          >
            <span className={`w-2.5 h-2.5 rounded-full ${c.color}`} />
            {c.label}
          </button>
        ))}
      </div>

      <div className="flex items-center justify-between mt-1.5">
        <span className="text-[9px] text-muted-foreground">567 playing</span>
        <span className="text-primary text-[10px] font-extrabold">$980 pot</span>
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
      className="flex flex-col p-3 rounded-xl border border-primary/20 bg-gradient-to-br from-primary/[0.06] to-card hover:from-primary/[0.12] cursor-pointer transition-all duration-200 h-full group"
    >
      <div className="flex items-center justify-between mb-1.5">
        <LiveBadge label="Fast" />
        <FastTimer label="2 min" />
      </div>

      <p className="text-[10px] text-muted-foreground mb-0.5">Dice Roll</p>
      <h4 className="text-xs font-bold leading-tight mb-2 text-foreground group-hover:text-primary transition-colors">
        What number hits next?
      </h4>

      {/* Dice visual */}
      <div className="flex items-center justify-center mb-2">
        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-secondary to-muted border border-border/60 flex items-center justify-center shadow-sm group-hover:rotate-12 transition-transform duration-300">
          <Dices className="h-5 w-5 text-primary" />
        </div>
      </div>

      {/* Number chips */}
      <div className="grid grid-cols-6 gap-0.5 mt-auto">
        {numbers.map((n) => (
          <button
            key={n}
            className="rounded-md py-1.5 text-center text-[10px] font-bold bg-secondary/60 hover:bg-primary/15 hover:text-primary border border-border/30 hover:border-primary/30 transition-all active:scale-[0.95]"
            onClick={(e) => e.stopPropagation()}
          >
            {n}
          </button>
        ))}
      </div>

      <div className="flex items-center justify-between mt-1.5">
        <span className="text-[9px] text-muted-foreground">234 playing</span>
        <span className="text-primary text-[10px] font-extrabold">$640 pot</span>
      </div>
    </div>
  );
}
