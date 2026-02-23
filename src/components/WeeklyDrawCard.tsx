import { Trophy, Timer, Users, Ticket, Info } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface WeeklyDrawCardProps {
  totalVolume: number;
}

const distribution = [
  { place: "1st", pct: 50 },
  { place: "2nd", pct: 20 },
  { place: "3rd", pct: 10 },
  { place: "4–10th", pct: 20 },
];

function formatPool(amount: number): string {
  if (amount >= 1000000) return `$${(amount / 1000000).toFixed(1)}M`;
  if (amount >= 1000) return `$${(amount / 1000).toFixed(1)}K`;
  return `$${amount.toFixed(0)}`;
}

export function WeeklyDrawCard({ totalVolume }: WeeklyDrawCardProps) {
  const prizePool = totalVolume * 0.02;

  return (
    <div className="w-full rounded-xl border border-primary/20 bg-card p-3 sm:p-4 relative overflow-hidden">
      {/* Subtle accent gradient on left edge */}
      <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-primary via-pollgy-green to-pollgy-blue rounded-l-xl" />

      <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6">
        {/* Left: Title + pool */}
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="shrink-0 h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center">
            <Trophy className="h-4 w-4 text-primary" />
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-1.5">
              <h3 className="text-sm font-bold text-foreground">Weekly Prize Draw</h3>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Info className="h-3 w-3 text-muted-foreground cursor-help shrink-0" />
                  </TooltipTrigger>
                  <TooltipContent side="top" className="max-w-[220px] text-xs">
                    2% of every trade goes to the weekly prize pool. Buy 20 tickets for 1 entry.
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            <p className="text-primary text-base sm:text-lg font-extrabold leading-tight">{formatPool(prizePool)}</p>
          </div>
        </div>

        {/* Center: Distribution bar */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1 mb-1">
            {distribution.map((d) => (
              <div
                key={d.place}
                className="h-2 rounded-full bg-primary/20 relative overflow-hidden"
                style={{ flex: d.pct }}
              >
                <div className="absolute inset-0 bg-primary rounded-full opacity-70" />
              </div>
            ))}
          </div>
          <div className="flex items-center gap-2 text-[9px] sm:text-[10px] text-muted-foreground">
            {distribution.map((d) => (
              <span key={d.place} className="whitespace-nowrap">
                <span className="font-semibold text-foreground">{d.place}</span> {d.pct}%
              </span>
            ))}
          </div>
        </div>

        {/* Right: Meta */}
        <div className="flex items-center gap-3 text-[10px] sm:text-xs text-muted-foreground shrink-0">
          <span className="flex items-center gap-1">
            <Timer className="h-3 w-3" />3d 14h
          </span>
          <span className="flex items-center gap-1">
            <Users className="h-3 w-3" />1,247
          </span>
          <Badge variant="secondary" className="text-[9px] px-1.5 py-0 gap-0.5">
            <Ticket className="h-2.5 w-2.5" />20 = 1 entry
          </Badge>
        </div>
      </div>
    </div>
  );
}
