import { useState, useEffect } from "react";
import { Trophy, Timer, Users, Ticket, Info, ChevronRight, History, Sparkles, Star } from "lucide-react";
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
import { Progress } from "@/components/ui/progress";

const distribution = [
  { place: "1st", pct: 50, color: "from-yellow-400 to-amber-500" },
  { place: "2nd", pct: 20, color: "from-slate-300 to-slate-400" },
  { place: "3rd", pct: 10, color: "from-amber-600 to-amber-700" },
  { place: "4–10th", pct: 20, color: "from-primary/60 to-primary/40" },
];

const previousWinners = [
  { place: "1st", name: "Alex K.", amount: 24300, emoji: "🥇" },
  { place: "2nd", name: "Maria T.", amount: 9720, emoji: "🥈" },
  { place: "3rd", name: "Jake P.", amount: 4860, emoji: "🥉" },
];

const WEEKLY_POT = 48600;
const ELIGIBLE_ENTRIES = 1284;
const MY_ENTRIES = 3;
const MY_TICKETS = 14;
const ENTRY_COST = 20;
const TICKETS_REMAINING = ENTRY_COST - MY_TICKETS;

function useCountdown(targetDate: Date) {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  
  useEffect(() => {
    const tick = () => {
      const now = new Date().getTime();
      const diff = targetDate.getTime() - now;
      if (diff <= 0) return;
      setTimeLeft({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((diff % (1000 * 60)) / 1000),
      });
    };
    tick();
    const interval = setInterval(tick, 1000);
    return () => clearInterval(interval);
  }, [targetDate]);
  
  return timeLeft;
}

// Next Sunday
const nextSunday = new Date();
nextSunday.setDate(nextSunday.getDate() + ((7 - nextSunday.getDay()) % 7 || 7));
nextSunday.setHours(20, 0, 0, 0);

export function WeeklyDrawCard() {
  const { days, hours, minutes, seconds } = useCountdown(nextSunday);
  const progressPct = (MY_TICKETS / ENTRY_COST) * 100;

  return (
    <div className="flex flex-col rounded-xl border border-primary/20 bg-card h-full relative overflow-hidden">
      {/* Gradient header strip */}
      <div className="relative px-4 pt-3 pb-2.5 bg-gradient-to-r from-primary/10 via-primary/5 to-transparent">
        <div className="absolute top-1 right-2 opacity-[0.07]">
          <Trophy className="h-16 w-16 text-primary" />
        </div>
        
        <div className="flex items-center gap-1.5 mb-1.5">
          <div className="flex items-center justify-center h-5 w-5 rounded-md bg-primary/15">
            <Trophy className="h-3 w-3 text-primary" />
          </div>
          <span className="text-[10px] uppercase tracking-widest font-bold text-primary">Weekly Draw</span>
        </div>

        {/* Prize amount */}
        <div className="flex items-baseline gap-1.5">
          <span className="text-2xl font-black tracking-tight text-foreground">${WEEKLY_POT.toLocaleString()}</span>
          <Sparkles className="h-3.5 w-3.5 text-primary animate-pulse" />
        </div>
        <p className="text-[10px] text-muted-foreground mt-0.5">Prize pool • 10 winners every Sunday</p>
      </div>

      <div className="px-4 py-3 space-y-3">
        {/* Live countdown */}
        <div className="flex items-center gap-1.5">
          <Timer className="h-3 w-3 text-muted-foreground" />
          <span className="text-[10px] text-muted-foreground font-medium">Draws in</span>
          <div className="flex items-center gap-1 ml-auto">
            {[
              { val: days, label: "d" },
              { val: hours, label: "h" },
              { val: minutes, label: "m" },
              { val: seconds, label: "s" },
            ].map((unit) => (
              <div key={unit.label} className="flex items-center">
                <span className="text-xs font-bold tabular-nums bg-muted/60 px-1.5 py-0.5 rounded text-foreground min-w-[24px] text-center">
                  {String(unit.val).padStart(2, "0")}
                </span>
                <span className="text-[9px] text-muted-foreground ml-0.5">{unit.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Distribution bar */}
        <div className="space-y-1">
          <div className="flex rounded-full overflow-hidden h-[6px] bg-muted/40">
            {distribution.map((d, i) => (
              <div
                key={d.place}
                className={`h-full bg-gradient-to-r ${d.color}`}
                style={{ width: `${d.pct}%` }}
              />
            ))}
          </div>
          <div className="flex items-center justify-between text-[8px] text-muted-foreground">
            {distribution.map((d) => (
              <span key={d.place}>
                <span className="font-semibold text-foreground">{d.place}</span> {d.pct}%
              </span>
            ))}
          </div>
        </div>

        {/* My ticket progress */}
        <div className="rounded-lg bg-muted/30 border border-border/40 p-2.5 space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <Ticket className="h-3 w-3 text-primary" />
              <span className="text-[10px] font-semibold text-foreground">Your Progress</span>
            </div>
            <span className="text-[10px] font-bold text-primary">{MY_ENTRIES} entries earned</span>
          </div>
          <div className="space-y-1">
            <Progress value={progressPct} className="h-2" />
            <div className="flex items-center justify-between text-[9px]">
              <span className="text-muted-foreground">{MY_TICKETS}/{ENTRY_COST} tickets</span>
              <span className="text-primary font-medium">{TICKETS_REMAINING} more for next entry</span>
            </div>
          </div>
        </div>
      </div>

      {/* Footer actions */}
      <div className="flex items-center gap-2 px-4 py-2 border-t border-border/40 mt-auto">
        <Dialog>
          <DialogTrigger asChild>
            <button className="flex items-center gap-1 text-[9px] text-muted-foreground hover:text-foreground transition-colors">
              <History className="h-3 w-3" />
              <span>Last week</span>
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
                <div key={w.place} className="flex items-center justify-between text-sm rounded-lg bg-muted/30 px-3 py-2">
                  <div className="flex items-center gap-2">
                    <span className="text-base">{w.emoji}</span>
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

        <span className="text-border">·</span>

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
                <p>Every Sunday at 8pm, 10 random winners are selected and the pool is distributed:</p>
                <div className="grid grid-cols-2 gap-1.5 mt-1.5">
                  {distribution.map((d) => (
                    <div key={d.place} className="flex items-center gap-2 text-xs bg-muted/30 rounded-md px-2 py-1.5">
                      <div className={`w-2.5 h-2.5 rounded-full bg-gradient-to-r ${d.color}`} />
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

        <button className="ml-auto flex items-center gap-1 text-[9px] text-primary font-semibold hover:underline">
          <Users className="h-3 w-3" />
          {ELIGIBLE_ENTRIES.toLocaleString()} entries
          <ChevronRight className="h-3 w-3" />
        </button>
      </div>
    </div>
  );
}
