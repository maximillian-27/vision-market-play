import { Trophy, Timer, Info, ChevronRight, History, Ticket } from "lucide-react";
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
const MY_TICKETS = 14;
const COUNTDOWN = "3d 14h";

export function WeeklyDrawCard() {
  return (
    <div className="flex flex-col p-3 rounded-xl border border-primary/20 bg-card h-full relative overflow-hidden">
      {/* Glow */}
      <div className="absolute -top-10 -right-10 w-28 h-28 rounded-full bg-primary/5 blur-2xl pointer-events-none" />

      {/* Header: Title + Countdown */}
      <div className="flex items-center justify-between mb-1.5">
        <div className="flex items-center gap-1.5">
          <Trophy className="h-3.5 w-3.5 text-primary" />
          <span className="text-[10px] uppercase tracking-wider font-bold text-primary">Weekly Draw</span>
        </div>
        <div className="flex items-center gap-1 px-1.5 py-0.5 rounded-full bg-muted/60 text-[9px] text-muted-foreground font-medium">
          <Timer className="h-2.5 w-2.5" />
          {COUNTDOWN}
        </div>
      </div>

      {/* Prize pool */}
      <div className="flex items-baseline gap-1.5 mb-1">
        <span className="text-lg font-extrabold text-primary leading-none">
          ${WEEKLY_POT.toLocaleString()}
        </span>
        <span className="text-[8px] text-muted-foreground font-medium">prize pool</span>
      </div>

      {/* Split — compact inline pills */}
      <div className="flex items-center gap-1 mb-2">
        {distribution.map((d, i) => (
          <span
            key={d.place}
            className="text-[7px] font-semibold px-1 py-[1px] rounded-sm"
            style={{
              backgroundColor: `hsl(var(--primary) / ${0.12 - i * 0.02})`,
              color: `hsl(var(--primary))`,
            }}
          >
            {d.place} {d.pct}%
          </span>
        ))}
      </div>

      {/* Your progress + total entries */}
      <div className="flex items-center gap-2 text-[9px] mb-2">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <span className="flex items-center gap-0.5 font-bold text-foreground cursor-help">
                <Ticket className="h-2.5 w-2.5 text-primary" />
                {MY_TICKETS}/{ENTRY_COST}
              </span>
            </TooltipTrigger>
            <TooltipContent side="bottom" className="text-xs max-w-[180px]">
              You have {MY_TICKETS} of {ENTRY_COST} tickets needed for your next entry.
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        {/* Mini progress */}
        <div className="flex-1 h-[3px] rounded-full bg-muted overflow-hidden">
          <div
            className="h-full rounded-full bg-primary transition-all"
            style={{ width: `${(MY_TICKETS / ENTRY_COST) * 100}%` }}
          />
        </div>

        <span className="text-muted-foreground">
          <span className="font-semibold text-foreground">{MY_ENTRIES}</span> entries
        </span>
        <span className="text-muted-foreground/60">·</span>
        <span className="text-muted-foreground">{ELIGIBLE_ENTRIES.toLocaleString()} total</span>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-2 mt-auto pt-1 border-t border-border/40">
        <Dialog>
          <DialogTrigger asChild>
            <button className="flex items-center gap-0.5 text-[8px] text-muted-foreground hover:text-foreground transition-colors">
              <History className="h-2.5 w-2.5" />
              Previous
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

        <span className="text-border">·</span>

        <Dialog>
          <DialogTrigger asChild>
            <button className="flex items-center gap-0.5 text-[8px] text-muted-foreground hover:text-foreground transition-colors">
              <Info className="h-2.5 w-2.5" />
              How it works
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

        <button className="ml-auto flex items-center gap-0.5 text-[8px] text-primary font-semibold hover:underline">
          {ELIGIBLE_ENTRIES.toLocaleString()} entries
          <ChevronRight className="h-2.5 w-2.5" />
        </button>
      </div>
    </div>
  );
}
