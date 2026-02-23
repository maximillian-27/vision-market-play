import { Trophy, Timer, Users, ChevronRight } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface WeeklyDrawBannerProps {
  prizePool: number;
  eligiblePlayers?: number;
  countdown?: string;
}

function formatPool(n: number): string {
  if (n >= 1000000) return `$${(n / 1000000).toFixed(1)}M`;
  if (n >= 1000) return `$${(n / 1000).toFixed(1)}K`;
  return `$${n}`;
}

const distribution = [
  { place: "1st", pct: 50 },
  { place: "2nd", pct: 20 },
  { place: "3rd", pct: 10 },
  { place: "4-10th", pct: 20 },
];

export function WeeklyDrawBanner({
  prizePool,
  eligiblePlayers = 1247,
  countdown = "3d 14h",
}: WeeklyDrawBannerProps) {
  return (
    <div className="w-full rounded-lg border border-primary/20 bg-primary/5 px-3 sm:px-4 py-2 flex items-center justify-between gap-3">
      {/* Left: icon + pool */}
      <div className="flex items-center gap-2 sm:gap-3 min-w-0">
        <Trophy className="h-4 w-4 text-primary shrink-0" />
        <div className="flex items-center gap-2 sm:gap-4 text-xs min-w-0">
          <div className="flex items-center gap-1.5">
            <span className="font-bold text-primary text-sm">{formatPool(prizePool)}</span>
            <span className="text-muted-foreground hidden sm:inline">Weekly Prize Pool</span>
            <span className="text-muted-foreground sm:hidden">Prize Pool</span>
          </div>
          <span className="text-muted-foreground flex items-center gap-1 shrink-0">
            <Timer className="h-3 w-3" />{countdown}
          </span>
          <span className="text-muted-foreground items-center gap-1 hidden md:flex shrink-0">
            <Users className="h-3 w-3" />{eligiblePlayers.toLocaleString()} eligible
          </span>
        </div>
      </div>

      {/* Right: distribution popover */}
      <Popover>
        <PopoverTrigger asChild>
          <button className="flex items-center gap-1 text-[10px] sm:text-xs text-primary hover:text-primary/80 font-medium transition-colors shrink-0">
            <span className="hidden sm:inline">Distribution</span>
            <ChevronRight className="h-3 w-3" />
          </button>
        </PopoverTrigger>
        <PopoverContent align="end" className="w-52 p-3 space-y-2.5">
          <p className="text-xs font-semibold">Prize Distribution</p>
          <div className="space-y-1.5">
            {distribution.map((d) => (
              <div key={d.place} className="flex items-center justify-between text-xs">
                <span className="text-muted-foreground">{d.place}</span>
                <div className="flex items-center gap-2">
                  <div className="w-16 h-1.5 rounded-full bg-secondary overflow-hidden">
                    <div
                      className="h-full rounded-full bg-primary"
                      style={{ width: `${d.pct}%` }}
                    />
                  </div>
                  <span className="font-medium w-8 text-right">{d.pct}%</span>
                </div>
              </div>
            ))}
          </div>
          <p className="text-[10px] text-muted-foreground/70 pt-1 border-t border-border">
            2% of every trade funds the weekly prize pool. 20 tickets = 1 entry.
          </p>
        </PopoverContent>
      </Popover>
    </div>
  );
}
