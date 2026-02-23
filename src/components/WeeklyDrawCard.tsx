import { Trophy, Timer, Ticket, ChevronRight, Info } from "lucide-react";
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
    <div className="flex flex-col gap-3 p-4 rounded-xl border border-primary/15 bg-card">
      {/* Header row */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-primary/10">
            <Trophy className="h-3.5 w-3.5 text-primary" />
          </div>
          <div>
            <h3 className="text-xs font-semibold text-foreground leading-none">Weekly Draw</h3>
          </div>
        </div>
        <div className="flex items-center gap-1 text-[11px] text-muted-foreground">
          <Timer className="h-3 w-3" />
          <span>{COUNTDOWN}</span>
        </div>
      </div>

      {/* Prize pool */}
      <div className="flex items-baseline justify-between">
        <div className="flex items-baseline gap-1.5">
          <span className="text-2xl font-extrabold text-primary leading-none tracking-tight">
            ${WEEKLY_POT.toLocaleString()}
          </span>
        </div>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <span className="flex items-center gap-1 text-[11px] text-primary/70 font-medium cursor-help">
                <Ticket className="h-3 w-3" />
                {MY_ENTRIES} entries
              </span>
            </TooltipTrigger>
            <TooltipContent side="bottom" className="text-xs max-w-[180px]">
              Buy {ENTRY_COST} tickets to earn 1 entry. You have {MY_ENTRIES} entries out of {ELIGIBLE_ENTRIES.toLocaleString()} total.
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>

      {/* Explainer */}
      <p className="text-[11px] text-muted-foreground leading-relaxed -mt-1">
        Every week, 2% of all ticket sales are pooled and distributed to 10 randomly selected participants.
      </p>

      {/* Distribution bar */}
      <div className="space-y-1">
        <div className="flex rounded-full overflow-hidden h-1">
          {distribution.map((d, i) => (
            <div
              key={d.place}
              className="h-full"
              style={{
                width: `${d.pct}%`,
                backgroundColor: `hsl(var(--primary) / ${1 - i * 0.2})`,
              }}
            />
          ))}
        </div>
        <div className="flex items-center justify-between text-[10px] text-muted-foreground">
          {distribution.map((d) => (
            <span key={d.place}>
              <span className="font-semibold text-foreground">{d.place}</span> {d.pct}%
            </span>
          ))}
        </div>
      </div>

      {/* Footer links */}
      <div className="flex items-center justify-between pt-1 border-t border-border/40 text-[11px]">
        <div className="flex items-center gap-2.5">
          <Dialog>
            <DialogTrigger asChild>
              <button className="text-muted-foreground hover:text-foreground transition-colors flex items-center gap-0.5">
                <Info className="h-3 w-3" />
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

          <Dialog>
            <DialogTrigger asChild>
              <button className="text-muted-foreground hover:text-foreground transition-colors">
                Previous winners
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
        </div>

        <span className="text-muted-foreground">
          {ELIGIBLE_ENTRIES.toLocaleString()} entries
        </span>
      </div>
    </div>
  );
}
