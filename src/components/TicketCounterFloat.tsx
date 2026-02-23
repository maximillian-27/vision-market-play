import { useState } from "react";
import { Ticket } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Progress } from "@/components/ui/progress";

const TICKETS = 14;
const TICKETS_PER_ENTRY = 20;
const ENTRIES = 3;

export function TicketCounterFloat() {
  return (
    <div className="fixed bottom-20 sm:bottom-6 right-4 z-40">
      <Popover>
        <PopoverTrigger asChild>
          <button className="flex items-center gap-1.5 pl-2.5 pr-3 py-1.5 rounded-full bg-card border border-border shadow-lg hover:shadow-xl transition-all hover:scale-105 text-xs">
            <Ticket className="h-3.5 w-3.5 text-primary" />
            <span className="font-bold text-foreground">{TICKETS}/{TICKETS_PER_ENTRY}</span>
            <span className="text-[10px] text-primary font-semibold">({ENTRIES})</span>
          </button>
        </PopoverTrigger>
        <PopoverContent align="end" side="top" className="w-52 p-3 space-y-2.5">
          <div className="text-xs font-semibold">Weekly Draw Tickets</div>
          <div className="space-y-1.5">
            <div className="flex justify-between text-xs">
              <span className="text-muted-foreground">Tickets this week</span>
              <span className="font-semibold">{TICKETS} / {TICKETS_PER_ENTRY}</span>
            </div>
            <Progress value={(TICKETS / TICKETS_PER_ENTRY) * 100} className="h-1.5" />
            <p className="text-[10px] text-muted-foreground">
              Buy {TICKETS_PER_ENTRY - TICKETS} more for another entry
            </p>
          </div>
          <div className="flex justify-between text-xs pt-1 border-t border-border">
            <span className="text-muted-foreground">Entries earned</span>
            <span className="font-bold text-primary">{ENTRIES}</span>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}
