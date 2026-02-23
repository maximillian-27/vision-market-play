import { useState } from "react";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Wallet } from "lucide-react";
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
    pot?: number;
  };
}

function formatPot(pot: number): string {
  if (pot >= 1000000) return `$${(pot / 1000000).toFixed(1)}M`;
  if (pot >= 1000) return `$${(pot / 1000).toFixed(0)}K`;
  return `$${pot}`;
}

export function QuickTradeSheet({ open, onOpenChange, market }: QuickTradeSheetProps) {
  const { toast } = useToast();
  const [selectedOutcome, setSelectedOutcome] = useState<Outcome | null>(null);
  const [amount, setAmount] = useState("10");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const isBinary = market.outcomes.length === 2 && 
    (market.outcomes[0].label.toLowerCase() === "yes" || market.outcomes[0].label.toLowerCase() === "no");

  const amountNum = parseFloat(amount) || 0;
  
  // Pari-mutuel: Payout = (Entry / Total Outcome Entries) * Pot
  const totalPot = market.pot || 0;
  const selectedPrice = selectedOutcome?.price || 0;
  const payout = selectedPrice > 0 ? (amountNum / (selectedPrice / 100)) : 0;
  const winnings = payout - amountNum;

  const yesOutcome = isBinary ? market.outcomes.find(o => o.label.toLowerCase() === "yes") : null;
  const noOutcome = isBinary ? market.outcomes.find(o => o.label.toLowerCase() === "no") : null;
  const yesPercent = yesOutcome?.price || 50;

  const handleBuy = () => {
    if (!selectedOutcome) {
      toast({
        title: "Select an outcome",
        description: "Please select an outcome before placing an entry",
        variant: "destructive"
      });
      return;
    }

    if (amountNum < 1) {
      toast({
        title: "Invalid amount",
        description: "Minimum entry is $1",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);
    
    setTimeout(() => {
      toast({
        title: "Entry placed!",
        description: `You entered $${amountNum.toFixed(2)} on "${selectedOutcome.label}"`,
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

  const quickAmounts = [5, 10, 25, 50, 100];

  return (
    <Drawer open={open} onOpenChange={handleClose}>
      <DrawerContent className="px-4 pb-8">
        <DrawerHeader className="px-0 pt-4 pb-2">
          <div className="flex items-center justify-between">
            <DrawerTitle className="text-base font-semibold">Place Entry</DrawerTitle>
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <Wallet className="h-3.5 w-3.5" />
              <span>$5,230</span>
            </div>
          </div>
        </DrawerHeader>

        {/* Market Title & Pot */}
        <div className="mb-4">
          <p className="text-sm text-muted-foreground line-clamp-2 mb-2">{market.title}</p>
          {totalPot > 0 && (
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-extrabold">
              {formatPot(totalPot)} Pot
            </span>
          )}
        </div>

        {/* Outcome Selection */}
        <div className="space-y-3">
          {isBinary ? (
            <div className="space-y-2">
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

          {/* Amount & Enter */}
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
                  ? `Enter`
                  : "Select"
              }
            </Button>
          </div>

          {/* Quick amounts */}
          <div className="flex gap-1.5">
            {quickAmounts.map((qa) => (
              <button
                key={qa}
                onClick={() => setAmount(qa.toString())}
                className={`flex-1 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  amount === qa.toString() 
                    ? 'bg-primary/10 text-primary border border-primary/30' 
                    : 'bg-muted/50 text-muted-foreground border border-transparent hover:bg-muted'
                }`}
              >
                ${qa}
              </button>
            ))}
          </div>

          {/* "If You Win" Summary */}
          <div className="rounded-lg bg-muted/30 border border-border/50 p-3 space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Your Entry</span>
              <span className="font-semibold">${amountNum.toFixed(2)}</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Potential winning</span>
              <span className="font-bold">{selectedOutcome ? `$${payout.toFixed(2)}` : '-'}</span>
            </div>
            <div className="h-px bg-border" />
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Potential Winnings</span>
              <span className={`font-bold ${selectedOutcome && winnings > 0 ? 'text-success' : ''}`}>
                {selectedOutcome ? `+$${winnings.toFixed(2)}` : '-'}
              </span>
            </div>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
