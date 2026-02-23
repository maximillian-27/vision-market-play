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
    <div className="flex flex-col p-3.5 rounded-xl border border-primary/15 bg-card h-full relative overflow-hidden">
      {/* Subtle glow accents */}
      <div className="absolute -top-12 -right-12 w-32 h-32 rounded-full bg-primary/8 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-8 -left-8 w-20 h-20 rounded-full bg-primary/5 blur-2xl pointer-events-none" />

      {/* Header: Title + Countdown */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-1.5">
          <div className="flex items-center justify-center w-5 h-5 rounded-md bg-primary/10">
            <Trophy className="h-3 w-3 text-primary" />
          </div>
          <span className="text-[10px] uppercase tracking-wider font-bold text-primary">Weekly Draw</span>
        </div>
        <div className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-muted/50 text-[9px] text-muted-foreground font-medium">
          <Timer className="h-2.5 w-2.5" />
          <span>{COUNTDOWN}</span>
        </div>
      </div>

      {/* Prize Pool */}
      <div className="mb-3">
        <div className="text-xl font-extrabold text-primary leading-none tracking-tight">
          ${WEEKLY_POT.toLocaleString()}
        </div>
        <p className="text-[9px] text-muted-foreground mt-1 leading-relaxed">
          Prize pool split weekly among 10 random winners
        </p>
      </div>

      {/* Distribution bar + legend */}
      <div className="space-y-1 mb-3">
        <div className="flex rounded-full overflow-hidden h-1.5 bg-muted/30">
          {distribution.map((d, i) => (
            <div
              key={d.place}
              className="h-full transition-all"
              style={{
                width: `${d.pct}%`,
                backgroundColor: `hsl(var(--primary) / ${1 - i * 0.2})`,
              }}
            />
          ))}
        </div>
        <div className="flex items-center justify-between text-[8px] text-muted-foreground">
          {distribution.map((d) => (
            <span key={d.place} className="flex items-center gap-0.5">
              <span className="font-semibold text-foreground">{d.place}</span>
              <span>{d.pct}%</span>
            </span>
          ))}
        </div>
      </div>

      {/* Entry info */}
      <div className="flex items-center gap-1.5 text-[9px] mb-3">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <span className="flex items-center gap-1 px-2 py-1 rounded-md bg-primary/8 text-primary font-bold cursor-help border border-primary/10">
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
        <span className="flex items-center gap-0.5">
          <Sparkles className="h-2.5 w-2.5 text-primary/60" />
          <span className="font-semibold text-foreground">{MY_ENTRIES} entries</span>
        </span>
        <span className="text-muted-foreground/60">of {ELIGIBLE_ENTRIES.toLocaleString()}</span>
      </div>

      {/* Footer actions */}
      <div className="flex items-center gap-2.5 mt-auto pt-2 border-t border-border/30">
        {/* Previous winners */}
        <Dialog>
          <DialogTrigger asChild>
            <button className="flex items-center gap-1 text-[9px] text-muted-foreground hover:text-foreground transition-colors">
              <History className="h-3 w-3" />
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
            <button className="flex items-center gap-1 text-[9px] text-muted-foreground hover:text-foreground transition-colors">
              <Info className="h-3 w-3" />
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

        {/* All entries */}
        <button className="ml-auto flex items-center gap-0.5 text-[9px] text-primary font-semibold hover:underline">
          <Users className="h-3 w-3" />
          {ELIGIBLE_ENTRIES.toLocaleString()}
          <ChevronRight className="h-3 w-3" />
        </button>
      </div>
    </div>
  );
}
