import { Trophy, Timer, Users, Ticket, Info, History, Gift, Calendar, Zap, Sparkles } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog";

const distribution = [
  { place: "1st", pct: 50 },
  { place: "2nd", pct: 25 },
  { place: "3rd", pct: 15 },
  { place: "4–10th", pct: 10 },
];

const previousWinners = [
  { place: "1st", name: "Alex K.", amount: 24300 },
  { place: "2nd", name: "Maria T.", amount: 12150 },
  { place: "3rd", name: "Jake P.", amount: 7290 },
];

const WEEKLY_POT = 48600;
const ELIGIBLE_ENTRIES = 1284;
const MY_ENTRIES = 3;
const COUNTDOWN = "3d 14h";

export function WeeklyDrawCard() {
  return (
    <div className="flex flex-col p-5 rounded-2xl border border-primary/25 bg-gradient-to-br from-primary/[0.08] via-primary/[0.02] to-card h-full relative overflow-hidden">
      {/* Decorative glows */}
      <div className="absolute -top-12 -right-12 w-32 h-32 rounded-full bg-primary/[0.08] blur-3xl pointer-events-none" />
      <div className="absolute -bottom-8 -left-8 w-24 h-24 rounded-full bg-primary/[0.05] blur-2xl pointer-events-none" />
      
      {/* Header */}
      <div className="flex items-center justify-between mb-3 relative">
        <div className="flex items-center gap-2.5">
          <div className="flex items-center justify-center w-8 h-8 rounded-xl bg-primary/15 shadow-sm">
            <Trophy className="h-4 w-4 text-primary" />
          </div>
          <div className="flex flex-col">
            <span className="text-[10px] uppercase tracking-[0.15em] font-bold text-primary leading-none">Weekly Draw</span>
            <span className="text-[9px] text-muted-foreground mt-0.5">Every Sunday</span>
          </div>
        </div>
        <div className="flex items-center gap-1.5 text-[10px] bg-primary/10 text-primary px-2.5 py-1 rounded-full font-semibold">
          <Timer className="h-3 w-3" />
          {COUNTDOWN}
        </div>
      </div>

      {/* Pot amount + entries */}
      <div className="flex items-end gap-3 mb-1 relative">
        <div className="text-3xl font-extrabold text-foreground leading-none tracking-tight">
          ${WEEKLY_POT.toLocaleString()}
        </div>
        <div className="flex items-center gap-1 text-[10px] bg-primary/10 text-primary px-2 py-0.5 rounded-full font-semibold mb-0.5">
          <Ticket className="h-3 w-3" />
          {MY_ENTRIES} entries
        </div>
      </div>
      <p className="text-[10px] text-muted-foreground mb-4 leading-relaxed">
        Prize pool redistributed to <span className="font-medium text-foreground">10 random winners</span>
      </p>

      {/* Distribution — visual upgrade */}
      <div className="mb-4 p-3 rounded-xl bg-muted/40 border border-border/30">
        <div className="flex items-center gap-1.5 mb-2">
          <Sparkles className="h-3 w-3 text-primary" />
          <span className="text-[10px] font-semibold text-foreground">Prize Split</span>
        </div>
        <div className="flex rounded-full overflow-hidden h-2 mb-2 bg-muted/60">
          {distribution.map((d, i) => (
            <div
              key={d.place}
              className="h-full transition-all"
              style={{
                width: `${d.pct}%`,
                background: `hsl(152 ${68 - i * 12}% ${42 + i * 8}%)`,
              }}
            />
          ))}
        </div>
        <div className="flex items-center justify-between text-[9px] text-muted-foreground">
          {distribution.map((d) => (
            <span key={d.place} className="flex flex-col items-center gap-0.5">
              <span className="font-bold text-foreground text-[10px]">{d.pct}%</span>
              <span>{d.place}</span>
            </span>
          ))}
        </div>
      </div>

      {/* Footer actions */}
      <div className="flex items-center gap-2 mt-auto">
        <Dialog>
          <DialogTrigger asChild>
            <button className="flex-1 flex items-center justify-center gap-1.5 text-[10px] font-medium text-muted-foreground hover:text-foreground hover:bg-muted/60 py-1.5 rounded-lg transition-colors border border-border/40">
              <History className="h-3 w-3" />
              Winners
            </button>
          </DialogTrigger>
          <DialogContent className="max-w-sm">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary/10">
                  <Trophy className="h-4 w-4 text-primary" />
                </div>
                Last Week's Winners
              </DialogTitle>
              <DialogDescription>
                Total prize pool: ${WEEKLY_POT.toLocaleString()}
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-1 mt-1">
              {previousWinners.map((w, i) => (
                <div
                  key={w.place}
                  className="flex items-center justify-between p-2.5 rounded-lg bg-muted/40"
                >
                  <div className="flex items-center gap-2.5">
                    <div className={`flex items-center justify-center w-7 h-7 rounded-full text-xs font-bold ${
                      i === 0 ? "bg-primary/15 text-primary" : "bg-muted text-muted-foreground"
                    }`}>
                      {w.place}
                    </div>
                    <span className="text-sm font-medium">{w.name}</span>
                  </div>
                  <span className="text-sm font-bold text-primary">${w.amount.toLocaleString()}</span>
                </div>
              ))}
            </div>
            <div className="flex items-center gap-2 p-2.5 rounded-lg border border-dashed border-border text-xs text-muted-foreground">
              <Users className="h-3.5 w-3.5 flex-shrink-0" />
              <span>+ 7 more winners shared <span className="font-semibold text-foreground">${(WEEKLY_POT * 0.1).toLocaleString()}</span> equally</span>
            </div>
          </DialogContent>
        </Dialog>

        <Dialog>
          <DialogTrigger asChild>
            <button className="flex-1 flex items-center justify-center gap-1.5 text-[10px] font-medium text-muted-foreground hover:text-foreground hover:bg-muted/60 py-1.5 rounded-lg transition-colors border border-border/40">
              <Info className="h-3 w-3" />
              How it works
            </button>
          </DialogTrigger>
          <DialogContent className="max-w-sm">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary/10">
                  <Info className="h-4 w-4 text-primary" />
                </div>
                How the Weekly Draw Works
              </DialogTitle>
              <DialogDescription>
                A portion of every ticket purchase funds the weekly prize pool.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-1 mt-1">
              <div className="flex gap-3 p-3 rounded-lg bg-muted/40">
                <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary/10 flex-shrink-0">
                  <Gift className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">Funding</p>
                  <p className="text-xs text-muted-foreground mt-0.5">Each ticket purchase splits: 95% to pot, 2% to the weekly draw, 3% platform fee.</p>
                </div>
              </div>
              <div className="flex gap-3 p-3 rounded-lg bg-muted/40">
                <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary/10 flex-shrink-0">
                  <Ticket className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">Entry</p>
                  <p className="text-xs text-muted-foreground mt-0.5">Every ticket is a bundle — you get a market ticket + a draw entry. No separate purchase needed.</p>
                </div>
              </div>
              <div className="flex gap-3 p-3 rounded-lg bg-muted/40">
                <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary/10 flex-shrink-0">
                  <Calendar className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">Draw</p>
                  <p className="text-xs text-muted-foreground mt-0.5">Every Sunday, 10 random winners are selected and the pool is distributed.</p>
                </div>
              </div>
            </div>
            <div className="rounded-lg border border-border/50 p-3">
              <p className="text-xs font-medium text-foreground mb-2">Prize Distribution</p>
              <div className="flex rounded-full overflow-hidden h-1.5 mb-2">
                {distribution.map((d, i) => (
                  <div
                    key={d.place}
                    className="h-full bg-primary"
                    style={{ width: `${d.pct}%`, opacity: 1 - i * 0.2 }}
                  />
                ))}
              </div>
              <div className="grid grid-cols-2 gap-1">
                {distribution.map((d) => (
                  <div key={d.place} className="flex items-center gap-1.5 text-xs text-muted-foreground">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                    <span className="font-medium text-foreground">{d.place}</span> {d.pct}%
                  </div>
                ))}
              </div>
            </div>
            <p className="text-[10px] text-muted-foreground/70 flex items-center gap-1.5">
              <Zap className="h-3 w-3" />
              All draws are verifiable and transparent. Winners announced every Monday.
            </p>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
