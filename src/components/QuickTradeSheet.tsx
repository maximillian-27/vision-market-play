import { useState } from "react";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Ticket, Wallet } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Outcome {
  label: string;
  price: number;
  color?: string;
  logo?: string;
}

interface QuickTradeSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  market: {
    id: string;
    title: string;
    outcomes: Outcome[];
  };
}

export function QuickTradeSheet({ open, onOpenChange, market }: QuickTradeSheetProps) {
  const { toast } = useToast();
  const [selectedOutcome, setSelectedOutcome] = useState<Outcome | null>(null);
  const [amount, setAmount] = useState("10");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const isBinary = market.outcomes.length === 2 && 
    (market.outcomes[0].label.toLowerCase() === "yes" || market.outcomes[0].label.toLowerCase() === "no");

  const amountNum = parseFloat(amount) || 0;
  const shares = selectedOutcome && selectedOutcome.price > 0 
    ? Math.floor((amountNum * 100) / selectedOutcome.price) 
    : 0;
  const potentialPayout = shares;
  const potentialProfit = potentialPayout - amountNum;

  const yesOutcome = isBinary ? market.outcomes.find(o => o.label.toLowerCase() === "yes") : null;
  const noOutcome = isBinary ? market.outcomes.find(o => o.label.toLowerCase() === "no") : null;
  const yesPercent = yesOutcome?.price || 50;

  const handleBuy = () => {
    if (!selectedOutcome) {
      toast({
        title: "Select an outcome",
        description: "Please select an outcome before placing an order",
        variant: "destructive"
      });
      return;
    }

    if (amountNum < 1) {
      toast({
        title: "Invalid amount",
        description: "Minimum amount is $1",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);
    
    setTimeout(() => {
      toast({
        title: "Order placed!",
        description: `You bought ${shares} tickets for "${selectedOutcome.label}" for $${amountNum.toFixed(2)}`,
      });
      setIsSubmitting(false);
      setAmount("10");
      setSelectedOutcome(null);
      onOpenChange(false);
    }, 500);
  };

  const handleClose = () => {
    setSelectedOutcome(null);
    setAmount("10");
    onOpenChange(false);
  };

  return (
    <Drawer open={open} onOpenChange={handleClose}>
      <DrawerContent className="px-4 pb-8">
        <DrawerHeader className="px-0 pt-4 pb-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Ticket className="h-4 w-4 text-primary" />
              <DrawerTitle className="text-base font-semibold">Buy Tickets</DrawerTitle>
            </div>
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <Wallet className="h-3.5 w-3.5" />
              <span>$5,230</span>
            </div>
          </div>
        </DrawerHeader>

        {/* Market Title */}
        <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
          {market.title}
        </p>

        {/* Outcome Selection */}
        <div className="space-y-3">
          {isBinary ? (
            <div className="space-y-2">
              {/* Probability bar */}
              <div className="flex items-center gap-2 text-xs font-bold">
                <span className="text-success w-10">{yesPercent}%</span>
                <div className="flex-1 h-2 rounded-full bg-muted overflow-hidden">
                  <div 
                    className="h-full rounded-full bg-gradient-to-r from-success to-success/80"
                    style={{ width: `${yesPercent}%` }}
                  />
                </div>
                <span className="text-muted-foreground w-10 text-right">{100 - yesPercent}%</span>
              </div>
              
              {/* Outcome buttons */}
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => setSelectedOutcome(yesOutcome || null)}
                  className={`rounded-xl py-3 text-center transition-all active:scale-[0.98] border ${
                    selectedOutcome?.label.toLowerCase() === "yes"
                      ? 'border-success bg-success/20 text-success'
                      : 'border-success/30 bg-success/10 text-success hover:bg-success/15'
                  }`}
                >
                  <span className="text-base font-bold uppercase">Yes</span>
                </button>
                <button
                  onClick={() => setSelectedOutcome(noOutcome || null)}
                  className={`rounded-xl py-3 text-center transition-all active:scale-[0.98] border ${
                    selectedOutcome?.label.toLowerCase() === "no"
                      ? 'border-destructive bg-destructive/20 text-destructive'
                      : 'border-destructive/30 bg-destructive/10 text-destructive hover:bg-destructive/15'
                  }`}
                >
                  <span className="text-base font-bold uppercase">No</span>
                </button>
              </div>
            </div>
          ) : (
            <div className="flex gap-2 overflow-x-auto scrollbar-hide -mx-4 px-4 pb-1">
              {market.outcomes.map((outcome, index) => {
                const isSelected = selectedOutcome?.label === outcome.label;
                
                return (
                  <button
                    key={index}
                    onClick={() => setSelectedOutcome(outcome)}
                    className={`flex-shrink-0 flex items-center gap-2 rounded-xl px-4 py-3 transition-all active:scale-[0.98] border ${
                      isSelected
                        ? 'border-primary bg-primary/10'
                        : 'border-border/40 bg-secondary/60 hover:bg-secondary'
                    }`}
                  >
                    {outcome.logo ? (
                      <img src={outcome.logo} alt={outcome.label} className="h-6 w-6 object-contain rounded-sm" />
                    ) : (
                      <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center text-xs font-bold text-primary">
                        {outcome.label.charAt(0)}
                      </div>
                    )}
                    <span className="text-sm font-semibold whitespace-nowrap">{outcome.label}</span>
                    <span className="text-sm font-bold text-primary">{outcome.price}%</span>
                  </button>
                );
              })}
            </div>
          )}

          {/* Amount & Buy */}
          <div className="flex items-center gap-2 pt-2">
            <div className="relative flex-1">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground font-medium text-sm">$</span>
              <Input
                type="number"
                inputMode="decimal"
                placeholder="0.00"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="pl-7 pr-3 h-12 text-lg font-semibold bg-muted/30 border-border/50 focus:border-primary"
              />
            </div>
            <Button
              className="h-12 px-6 font-semibold text-base min-w-[100px]"
              onClick={handleBuy}
              disabled={!selectedOutcome || isSubmitting || amountNum < 1}
            >
              {isSubmitting 
                ? "..." 
                : selectedOutcome 
                  ? `Buy`
                  : "Select"
              }
            </Button>
          </div>

          {/* Order Summary */}
          <div className="flex items-center justify-between text-sm bg-muted/30 rounded-lg px-3 py-2.5">
            <div className="flex items-center gap-1.5">
              <span className="text-muted-foreground">Tickets</span>
              <span className="font-semibold">{selectedOutcome ? shares : '-'}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="text-muted-foreground">If you win</span>
              <span className={`font-semibold ${selectedOutcome && potentialPayout > 0 ? 'text-success' : ''}`}>
                {selectedOutcome ? `$${potentialPayout.toFixed(2)}` : '-'}
              </span>
            </div>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
}