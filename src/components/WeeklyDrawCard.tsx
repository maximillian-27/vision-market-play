import { Trophy, Timer, Users, Ticket, Info } from "lucide-react";
import { useNavigate } from "react-router-dom";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const distribution = [
  { place: "1st", pct: 50 },
  { place: "2nd", pct: 20 },
  { place: "3rd", pct: 10 },
  { place: "4–10th", pct: 20 },
];

const WEEKLY_POT = 48600; // mock: 2% of platform volume this week
const ELIGIBLE_PLAYERS = 342;
const COUNTDOWN = "3d 14h";

export function WeeklyDrawCard() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col p-3 rounded-xl border border-primary/20 bg-card hover:bg-accent/30 cursor-pointer transition-colors h-full relative overflow-hidden">
      {/* Subtle accent glow */}
      <div className="absolute -top-8 -right-8 w-24 h-24 rounded-full bg-primary/5 blur-2xl pointer-events-none" />

      {/* Header */}
      <div className="flex items-center justify-between mb-1.5">
        <div className="flex items-center gap-1.5">
          <Trophy className="h-3.5 w-3.5 text-primary" />
          <span className="text-[9px] uppercase tracking-wider font-bold text-primary">Weekly Draw</span>
        </div>
        <div className="flex items-center gap-1 text-[9px] text-muted-foreground">
          <Timer className="h-2.5 w-2.5" />
          <span>{COUNTDOWN}</span>
        </div>
      </div>

      {/* Pot + players */}
      <div className="mb-2">
        <div className="text-lg font-extrabold text-primary leading-tight">
          ${WEEKLY_POT.toLocaleString()}
        </div>
        <div className="text-[10px] text-muted-foreground mt-0.5">Prize pool this week</div>
      </div>

      <div className="flex items-center gap-2 text-[9px] text-muted-foreground mb-2">
        <span className="flex items-center gap-0.5">
          <Users className="h-2.5 w-2.5" />
          {ELIGIBLE_PLAYERS} eligible
        </span>
        <span className="flex items-center gap-0.5">
          <Ticket className="h-2.5 w-2.5" />
          20 tickets = 1 entry
        </span>
      </div>

      {/* Distribution bar */}
      <div className="space-y-1">
        <div className="flex rounded-full overflow-hidden h-1.5">
          <div className="bg-primary" style={{ width: "50%" }} />
          <div className="bg-primary/70" style={{ width: "20%" }} />
          <div className="bg-primary/45" style={{ width: "10%" }} />
          <div className="bg-primary/25" style={{ width: "20%" }} />
        </div>
        <div className="flex items-center justify-between text-[8px] text-muted-foreground">
          {distribution.map(d => (
            <span key={d.place}>
              <span className="font-semibold text-foreground">{d.place}</span> {d.pct}%
            </span>
          ))}
        </div>
      </div>

      {/* Transparency note */}
      <div className="mt-2 flex items-center gap-1">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <button className="flex items-center gap-1 text-[8px] text-muted-foreground hover:text-foreground transition-colors">
                <Info className="h-2.5 w-2.5" />
                <span>2% of every trade funds this pool</span>
              </button>
            </TooltipTrigger>
            <TooltipContent side="bottom" className="text-xs max-w-[200px]">
              <p>2% of every ticket purchase goes into the weekly prize pool, distributed to 10 random winners every Sunday.</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </div>
  );
}
