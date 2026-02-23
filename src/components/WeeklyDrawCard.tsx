import { Trophy, Timer, Ticket, Info, ChevronRight, History, Users } from "lucide-react";
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
    <div className="flex flex-col p-3 rounded-xl border border-primary/15 bg-card relative overflow-hidden">
      {/* Subtle glow */}
      <div className="absolute -top-8 -right-8 w-24 h-24 rounded-full bg-primary/8 blur-2xl pointer-events-none" />

      {/* Row 1: Title + Prize + Countdown */}
      <div className="flex items-center justify-between mb-1.5">
        <div className="flex items-center gap-1.5">
          <Trophy className="h-3.5 w-3.5 text-primary" />
          <span className="text-[10px] uppercase tracking-wider font-bold text-primary">Weekly Draw</span>
        </div>
        <div className="flex items-center gap-1 px-1.5 py-0.5 rounded-full bg-muted/50 text-[9px] text-muted-foreground font-medium">
          <Timer className="h-2.5 w-2.5" />
          <span>{COUNTDOWN}</span>
        </div>
      </div>

      {/* Row 2: Pot + description inline */}
      <div className="flex items-baseline gap-1.5 mb-1.5">
        <span className="text-base font-extrabold text-primary leading-none">${WEEKLY_POT.toLocaleString()}</span>
        <span className="text-[8px] text-muted-foreground leading-tight">split weekly among 10 random winners</span>
      </div>

      {/* Row 3: Distribution bar */}
      <div className="flex rounded-full overflow-hidden h-1 bg-muted/30 mb-1">
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
      <div className="flex items-center justify-between text-[7px] text-muted-foreground mb-1.5">
        {distribution.map((d) => (
          <span key={d.place}>
            <span className="font-semibold text-foreground">{d.place}</span> {d.pct}%
          </span>
        ))}
      </div>

      {/* Row 4: Entry info + actions in one line */}
      <div className="flex items-center justify-between text-[9px] pt-1.5 border-t border-border/30">
        <div className="flex items-center gap-1.5">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <span className="flex items-center gap-0.5 px-1.5 py-0.5 rounded bg-primary/8 text-primary font-bold cursor-help text-[8px]">
                  <Ticket className="h-2.5 w-2.5" />
                  {MY_ENTRIES} entries
                </span>
              </TooltipTrigger>
              <TooltipContent side="bottom" className="text-xs max-w-[180px]">
                Every {ENTRY_COST} tickets = 1 entry. You have {MY_ENTRIES} entries out of {ELIGIBLE_ENTRIES.toLocaleString()} total.
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

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

          <Dialog>
            <DialogTrigger asChild>
              <button className="flex items-center gap-0.5 text-[8px] text-muted-foreground hover:text-foreground transition-colors">
                <Info className="h-2.5 w-2.5" />
                <span>Rules</span>
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
        </div>

        <button className="flex items-center gap-0.5 text-[8px] text-primary font-semibold hover:underline">
          <Users className="h-2.5 w-2.5" />
          {ELIGIBLE_ENTRIES.toLocaleString()}
          <ChevronRight className="h-2.5 w-2.5" />
        </button>
      </div>
    </div>
  );
}
