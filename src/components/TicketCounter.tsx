import { Ticket } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface TicketCounterProps {
  ticketsThisWeek?: number;
  entries?: number;
}

export function TicketCounter({ ticketsThisWeek = 14, entries = 3 }: TicketCounterProps) {
  const ticketsPerEntry = 20;
  const currentProgress = ticketsThisWeek % ticketsPerEntry;
  const remaining = ticketsPerEntry - currentProgress;
  const progressPercent = (currentProgress / ticketsPerEntry) * 100;

  return (
    <Popover>
      <PopoverTrigger asChild>
        <button className="flex items-center gap-1.5 h-8 px-2.5 rounded-full bg-secondary hover:bg-secondary/80 transition-colors text-xs font-medium text-foreground">
          <Ticket className="h-3.5 w-3.5 text-primary" />
          <span>{currentProgress}/{ticketsPerEntry}</span>
          {entries > 0 && (
            <span className="flex items-center justify-center h-4 min-w-4 px-1 rounded-full bg-primary text-primary-foreground text-[10px] font-bold">
              {entries}
            </span>
          )}
        </button>
      </PopoverTrigger>
      <PopoverContent align="end" className="w-56 p-3 space-y-3">
        <div className="space-y-1">
          <div className="flex items-center justify-between text-xs">
            <span className="text-muted-foreground">Tickets this week</span>
            <span className="font-semibold">{ticketsThisWeek}</span>
          </div>
          <div className="flex items-center justify-between text-xs">
            <span className="text-muted-foreground">Entries earned</span>
            <span className="font-semibold text-primary">{entries}</span>
          </div>
        </div>
        <div className="space-y-1.5">
          <Progress value={progressPercent} className="h-1.5" />
          <p className="text-[10px] text-muted-foreground">
            Buy {remaining} more ticket{remaining !== 1 ? 's' : ''} for another entry
          </p>
        </div>
        <p className="text-[10px] text-muted-foreground/70">
          20 tickets = 1 entry into the weekly draw
        </p>
      </PopoverContent>
    </Popover>
  );
}
