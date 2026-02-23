import { Trophy, Timer, Users, Ticket, Info, ChevronRight, History, Sparkles } from "lucide-react";
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
const ENTRY_COST = 20;
const COUNTDOWN = "3d 14h";

export function WeeklyDrawCard() {
  return (
    <div className="flex flex-col p-3 rounded-xl border border-primary/20 bg-card h-full relative overflow-hidden">
      {/* Glow accents */}
      <div className="absolute -top-8 -right-8 w-24 h-24 rounded-full bg-primary/8 blur-2xl pointer-events-none" />
      <div className="absolute -bottom-6 -left-6 w-16 h-16 rounded-full bg-primary/4 blur-xl pointer-events-none" />

      {/* Row 1: Title + Timer */}
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-1.5">
          <div className="flex items-center justify-center w-5 h-5 rounded-md bg-primary/10">
            <Trophy className="h-3 w-3 text-primary" />
          </div>
          <span className="text-[10px] uppercase tracking-widest font-bold text-primary">Weekly Draw</span>
        </div>
        <div className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-muted text-[9px] text-muted-foreground font-medium tabular-nums">
          <Timer className="h-2.5 w-2.5" />
          <span>{COUNTDOWN}</span>
        </div>
      </div>

      {/* Row 2: Pot + description */}
      <div className="text-lg font-extrabold text-foreground leading-none tracking-tight">
        <span className="text-primary">$</span>{WEEKLY_POT.toLocaleString()}
      </div>
      <div className="flex items-center gap-1 text-[9px] text-muted-foreground mt-0.5 mb-2.5">
        <Sparkles className="h-2.5 w-2.5 text-primary/60 flex-shrink-0" />
        <span>Redistributed weekly to random participants</span>
      </div>

      {/* Row 3: Distribution bar + legend */}
      <div className="space-y-1 mb-2.5">
        <div className="flex rounded-full overflow-hidden h-[5px] bg-muted">
          {distribution.map((d, i) => (
            <div
              key={d.place}
              className="h-full first:rounded-l-full last:rounded-r-full"
              style={{
                width: `${d.pct}%`,
                backgroundColor: `hsl(var(--primary) / ${1 - i * 0.2})`,
              }}
            />
          ))}
        </div>
        <div className="flex items-center justify-between text-[7.5px] text-muted-foreground">
          {distribution.map((d) => (
            <span key={d.place} className="flex items-center gap-0.5">
              <span className="font-bold text-foreground">{d.place}</span>
              <span className="opacity-70">{d.pct}%</span>
            </span>
          ))}
        </div>
      </div>

      {/* Row 4: Entry info strip */}
      <div className="flex items-center gap-1.5 text-[9px] mb-2">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <span className="flex items-center gap-0.5 px-1.5 py-0.5 rounded-md bg-primary/10 text-primary font-bold cursor-help border border-primary/10">
                <Ticket className="h-2.5 w-2.5" />
                {ENTRY_COST} tickets = 1 entry
              </span>
            </TooltipTrigger>
            <TooltipContent side="bottom" className="text-xs max-w-[180px]">
              Purchase {ENTRY_COST} tickets in a week to earn one draw entry. More tickets = more entries.
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <span className="text-border">·</span>
        <span className="font-bold text-foreground tabular-nums">{MY_ENTRIES} entries</span>
        <span className="text-muted-foreground/70">/ {ELIGIBLE_ENTRIES.toLocaleString()}</span>
      </div>

      {/* Row 5: Actions */}
      <div className="flex items-center gap-2.5 mt-auto pt-1.5 border-t border-border/30">
        {/* Previous winners */}
        <Dialog>
          <DialogTrigger asChild>
            <button className="flex items-center gap-0.5 text-[8px] text-muted-foreground hover:text-foreground transition-colors">
              <History className="h-2.5 w-2.5" />
              <span>Previous</span>
            </button>
          </DialogTrigger>
          <DialogContent className="max-w-xs">
            <DialogHeader>
              <DialogTitle className="text-sm flex items-center gap-1.5">
                <Trophy className="h-4 w-4 text-primary" />
                Last Week's Winners
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-2 mt-2">
              {previousWinners.map((w) => (
                <div key={w.place} className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-primary w-6">{w.place}</span>
                    <span className="font-medium">{w.name}</span>
                  </div>
                  <span className="font-bold text-primary">${w.amount.toLocaleString()}</span>
                </div>
              ))}
              <p className="text-[10px] text-muted-foreground pt-2 border-t border-border">
                + 7 more winners shared ${(WEEKLY_POT * 0.1).toLocaleString()} equally
              </p>
            </div>
          </DialogContent>
        </Dialog>

        <span className="text-border/50">·</span>

        {/* How it works */}
        <Dialog>
          <DialogTrigger asChild>
            <button className="flex items-center gap-0.5 text-[8px] text-muted-foreground hover:text-foreground transition-colors">
              <Info className="h-2.5 w-2.5" />
              <span>How it works</span>
            </button>
          </DialogTrigger>
          <DialogContent className="max-w-sm">
            <DialogHeader>
              <DialogTitle className="text-sm flex items-center gap-1.5">
                <Info className="h-4 w-4 text-primary" />
                How the Weekly Draw Works
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-3 mt-2 text-sm text-muted-foreground">
              <div className="space-y-1.5">
                <p className="font-medium text-foreground">Funding</p>
                <p>2% of every ticket purchase goes into the weekly prize pool automatically.</p>
              </div>
              <div className="space-y-1.5">
                <p className="font-medium text-foreground">Entry</p>
                <p>Every {ENTRY_COST} tickets you buy earns 1 draw entry. Buy more to increase your chances.</p>
              </div>
              <div className="space-y-1.5">
                <p className="font-medium text-foreground">Draw</p>
                <p>Every Sunday, 10 random winners are selected from all entries and the pool is distributed:</p>
                <div className="grid grid-cols-2 gap-1 mt-1">
                  {distribution.map((d) => (
                    <div key={d.place} className="flex items-center gap-1.5 text-xs">
                      <div className="w-2 h-2 rounded-full bg-primary" />
                      <span className="font-semibold text-foreground">{d.place}:</span> {d.pct}%
                    </div>
                  ))}
                </div>
              </div>
              <p className="text-[10px] text-muted-foreground/70 pt-2 border-t border-border">
                All draws are verifiable and transparent. Winners are announced every Monday.
              </p>
            </div>
          </DialogContent>
        </Dialog>

        {/* All entries link */}
        <button className="ml-auto flex items-center gap-0.5 text-[8px] text-primary font-semibold hover:underline">
          <Users className="h-2.5 w-2.5" />
          {ELIGIBLE_ENTRIES.toLocaleString()} entries
          <ChevronRight className="h-2.5 w-2.5" />
        </button>
      </div>
    </div>
  );
}
