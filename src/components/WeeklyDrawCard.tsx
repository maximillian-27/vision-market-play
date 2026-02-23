import { Trophy, Timer, Users, Ticket, Info, ChevronRight, History, Gift } from "lucide-react";
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
  { place: "1st", pct: 50, color: "bg-primary" },
  { place: "2nd", pct: 20, color: "bg-primary/70" },
  { place: "3rd", pct: 10, color: "bg-primary/50" },
  { place: "4–10th", pct: 20, color: "bg-primary/30" },
];

const previousWinners = [
  { place: "1st", name: "Alex K.", amount: 24300 },
  { place: "2nd", name: "Maria T.", amount: 9720 },
  { place: "3rd", name: "Jake P.", amount: 4860 },
];

const WEEKLY_POT = 48600;
const ELIGIBLE_ENTRIES = 1284;
const MY_ENTRIES = 3;
const ENTRY_COST = 20;
const COUNTDOWN = "3d 14h";
const MY_TICKETS_THIS_WEEK = 14;

export function WeeklyDrawCard() {
  const ticketProgress = Math.min((MY_TICKETS_THIS_WEEK / ENTRY_COST) * 100, 100);

  return (
    <div className="flex flex-col rounded-xl border border-border/60 bg-card overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-border/40">
        <div className="flex items-center gap-2">
          <div className="flex items-center justify-center w-7 h-7 rounded-lg bg-primary/10">
            <Trophy className="h-3.5 w-3.5 text-primary" />
          </div>
          <div>
            <span className="text-xs font-semibold text-foreground">Weekly Draw</span>
          </div>
        </div>
        <div className="flex items-center gap-1.5 px-2 py-1 rounded-full bg-muted/60 text-[10px] text-muted-foreground font-medium">
          <Timer className="h-3 w-3" />
          <span>{COUNTDOWN}</span>
        </div>
      </div>

      {/* Prize Pool */}
      <div className="px-4 pt-3 pb-2">
        <p className="text-[10px] uppercase tracking-wider text-muted-foreground font-medium mb-0.5">Prize Pool</p>
        <p className="text-2xl font-bold text-foreground tracking-tight">${WEEKLY_POT.toLocaleString()}</p>
      </div>

      {/* Distribution */}
      <div className="px-4 pb-3">
        <div className="flex rounded-full overflow-hidden h-1.5 bg-muted/40">
          {distribution.map((d) => (
            <div key={d.place} className={`h-full ${d.color}`} style={{ width: `${d.pct}%` }} />
          ))}
        </div>
        <div className="flex items-center gap-3 mt-1.5 flex-wrap">
          {distribution.map((d) => (
            <div key={d.place} className="flex items-center gap-1 text-[10px]">
              <div className={`w-1.5 h-1.5 rounded-full ${d.color}`} />
              <span className="text-muted-foreground">{d.place}</span>
              <span className="font-semibold text-foreground">{d.pct}%</span>
            </div>
          ))}
        </div>
      </div>

      {/* My Progress */}
      <div className="mx-4 mb-3 p-2.5 rounded-lg bg-muted/30 border border-border/30">
        <div className="flex items-center justify-between mb-1.5">
          <span className="text-[10px] font-medium text-muted-foreground">Your progress</span>
          <span className="text-[10px] font-bold text-primary">{MY_ENTRIES} entries earned</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex-1 h-1.5 rounded-full bg-muted/60 overflow-hidden">
            <div className="h-full rounded-full bg-primary transition-all" style={{ width: `${ticketProgress}%` }} />
          </div>
          <span className="text-[10px] font-semibold text-foreground whitespace-nowrap">
            {MY_TICKETS_THIS_WEEK}/{ENTRY_COST}
          </span>
        </div>
        <p className="text-[9px] text-muted-foreground mt-1">
          {ENTRY_COST - MY_TICKETS_THIS_WEEK} more tickets for next entry
        </p>
      </div>

      {/* Footer Actions */}
      <div className="flex items-center justify-between px-4 py-2.5 border-t border-border/40 bg-muted/10">
        <div className="flex items-center gap-3">
          <Dialog>
            <DialogTrigger asChild>
              <button className="flex items-center gap-1 text-[10px] text-muted-foreground hover:text-foreground transition-colors font-medium">
                <History className="h-3 w-3" />
                Winners
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
                  + 7 more winners shared ${(WEEKLY_POT * 0.2).toLocaleString()} equally
                </p>
              </div>
            </DialogContent>
          </Dialog>

          <Dialog>
            <DialogTrigger asChild>
              <button className="flex items-center gap-1 text-[10px] text-muted-foreground hover:text-foreground transition-colors font-medium">
                <Info className="h-3 w-3" />
                Rules
              </button>
            </DialogTrigger>
            <DialogContent className="max-w-sm">
              <DialogHeader>
                <DialogTitle className="text-sm flex items-center gap-1.5">
                  <Info className="h-4 w-4 text-primary" />
                  How It Works
                </DialogTitle>
              </DialogHeader>
              <div className="space-y-3 mt-2 text-sm text-muted-foreground">
                <div className="space-y-1">
                  <p className="font-medium text-foreground">Funding</p>
                  <p>2% of every ticket purchase goes into the weekly prize pool.</p>
                </div>
                <div className="space-y-1">
                  <p className="font-medium text-foreground">Entry</p>
                  <p>Every {ENTRY_COST} tickets you buy earns 1 draw entry.</p>
                </div>
                <div className="space-y-1">
                  <p className="font-medium text-foreground">Draw</p>
                  <p>Every Sunday, 10 random winners are selected:</p>
                  <div className="grid grid-cols-2 gap-1 mt-1">
                    {distribution.map((d) => (
                      <div key={d.place} className="flex items-center gap-1.5 text-xs">
                        <div className={`w-2 h-2 rounded-full ${d.color}`} />
                        <span className="font-semibold text-foreground">{d.place}:</span> {d.pct}%
                      </div>
                    ))}
                  </div>
                </div>
                <p className="text-[10px] text-muted-foreground/70 pt-2 border-t border-border">
                  All draws are verifiable. Winners announced every Monday.
                </p>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        <div className="flex items-center gap-1 text-[10px] text-muted-foreground">
          <Users className="h-3 w-3" />
          <span className="font-medium">{ELIGIBLE_ENTRIES.toLocaleString()}</span>
        </div>
      </div>
    </div>
  );
}
