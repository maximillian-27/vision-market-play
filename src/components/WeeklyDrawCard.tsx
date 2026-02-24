import { Trophy, Timer, Users, Ticket, Info, History, Gift, Calendar, Zap } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
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
    <div className="flex flex-col p-4 pb-5 rounded-xl border border-primary/25 bg-gradient-to-br from-primary/[0.12] via-primary/[0.04] to-card h-full relative overflow-hidden shadow-sm shadow-primary/5">
      {/* Decorative glows */}
      <div className="absolute -top-12 -right-12 w-36 h-36 rounded-full bg-primary/[0.12] blur-3xl pointer-events-none" />
      <div className="absolute -bottom-8 -left-8 w-24 h-24 rounded-full bg-primary/[0.07] blur-2xl pointer-events-none" />
      
      {/* Header: Title + Timer */}
      <div className="flex items-center justify-between mb-2 relative">
        <div className="flex items-center gap-2">
          <div className="flex items-center justify-center w-6 h-6 rounded-lg bg-primary/15 shadow-sm shadow-primary/10 ring-1 ring-primary/10">
            <Trophy className="h-3.5 w-3.5 text-primary" />
          </div>
          <span className="text-[10px] uppercase tracking-widest font-bold text-primary">Weekly Draw</span>
        </div>
        <div className="flex items-center gap-1.5 text-[10px] bg-primary/10 px-2.5 py-1 rounded-full border border-primary/15">
          <Timer className="h-3 w-3 text-primary animate-pulse" />
          <span className="font-bold text-foreground">{COUNTDOWN}</span>
        </div>
      </div>

      {/* Pot + entries */}
      <div className="flex items-baseline gap-3 relative mb-1">
        <div className="text-2xl font-black text-foreground leading-none tracking-tight">
          ${WEEKLY_POT.toLocaleString()}
        </div>
        <div className="flex items-center gap-1 text-[10px] bg-primary/8 px-2 py-0.5 rounded-full border border-primary/15">
          <Ticket className="h-3 w-3 text-primary" />
          <span className="font-semibold text-foreground">{MY_ENTRIES} entries</span>
        </div>
      </div>
      <p className="text-[10px] text-muted-foreground mb-3 leading-relaxed">
        Prize pool redistributed weekly to random participants
      </p>

      {/* Distribution bar */}
      <div className="mb-2">
        <div className="flex rounded-full overflow-hidden h-2 shadow-inner shadow-black/10">
          {distribution.map((d, i) => (
            <div
              key={d.place}
              className="h-full transition-all"
              style={{
                width: `${d.pct}%`,
                background: `hsl(var(--primary) / ${1 - i * 0.2})`,
                borderRight: i < distribution.length - 1 ? '1px solid hsl(var(--background) / 0.3)' : 'none',
              }}
            />
          ))}
        </div>
        <div className="flex items-center justify-between mt-1.5 text-[9px] text-muted-foreground">
          {distribution.map((d) => (
            <span key={d.place}>
              <span className="font-semibold text-foreground">{d.place}</span> {d.pct}%
            </span>
          ))}
        </div>
      </div>

      {/* Footer links */}
      <div className="flex items-center gap-3 pt-1.5 border-t border-border/20 mt-auto -mb-1">
        <Dialog>
          <DialogTrigger asChild>
            <button className="flex items-center gap-1 text-[9px] text-muted-foreground hover:text-foreground transition-colors">
              <History className="h-3 w-3" />
              Previous winners
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
            <button className="flex items-center gap-1 text-[9px] text-muted-foreground hover:text-foreground transition-colors">
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
