import { useState } from "react";
import { X, Trash2, ChevronDown, ChevronUp, Zap, AlertCircle, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { useIsMobile } from "@/hooks/use-mobile";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export interface BetSlipItem {
  id: string;
  marketId: string;
  marketTitle: string;
  outcome: string;
  odds: number;
  stake: number;
}

interface BetSlipProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  items: BetSlipItem[];
  onRemoveItem: (id: string) => void;
  onUpdateStake: (id: string, stake: number) => void;
  onClearAll: () => void;
  onPlaceBets: () => void;
  balance: number;
}

type OddsFormat = "decimal" | "fractional" | "american";

export function BetSlip({ 
  open, 
  onOpenChange, 
  items, 
  onRemoveItem, 
  onUpdateStake, 
  onClearAll,
  onPlaceBets,
  balance 
}: BetSlipProps) {
  const isMobile = useIsMobile();
  const { toast } = useToast();
  const [oddsFormat, setOddsFormat] = useState<OddsFormat>("decimal");
  const [isAccumulator, setIsAccumulator] = useState(false);
  const [accumulatorStake, setAccumulatorStake] = useState(10);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Convert probability (0-100) to different odds formats
  const formatOdds = (probability: number): string => {
    const decimal = 100 / probability;
    
    switch (oddsFormat) {
      case "decimal":
        return decimal.toFixed(2);
      case "fractional": {
        const numerator = Math.round((decimal - 1) * 100);
        const denominator = 100;
        const gcd = (a: number, b: number): number => b === 0 ? a : gcd(b, a % b);
        const divisor = gcd(numerator, denominator);
        return `${numerator / divisor}/${denominator / divisor}`;
      }
      case "american": {
        if (decimal >= 2) {
          return `+${Math.round((decimal - 1) * 100)}`;
        } else {
          return `${Math.round(-100 / (decimal - 1))}`;
        }
      }
      default:
        return decimal.toFixed(2);
    }
  };

  const totalStake = items.reduce((sum, item) => sum + item.stake, 0);
  const totalPotentialPayout = items.reduce((sum, item) => {
    const decimal = 100 / item.odds;
    return sum + (item.stake * decimal);
  }, 0);
  const totalPotentialProfit = totalPotentialPayout - totalStake;

  // Accumulator calculations
  const accumulatorOdds = items.reduce((acc, item) => acc * (100 / item.odds), 1);
  const accumulatorPayout = accumulatorStake * accumulatorOdds;
  const accumulatorProfit = accumulatorPayout - accumulatorStake;

  const handlePlaceBets = () => {
    const requiredBalance = isAccumulator ? accumulatorStake : totalStake;
    if (requiredBalance > balance) {
      toast({
        title: "Insufficient balance",
        description: "Please deposit more funds to place these bets.",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      onPlaceBets();
      setIsSubmitting(false);
      toast({
        title: isAccumulator ? "Accumulator placed!" : "Bets placed!",
        description: `${items.length} bet${items.length > 1 ? 's' : ''} placed successfully.`
      });
    }, 500);
  };

  const content = (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-border">
        <div className="flex items-center gap-2">
          <span className="font-display text-lg font-bold">Bet Slip</span>
          {items.length > 0 && (
            <Badge variant="secondary" className="font-bold">{items.length}</Badge>
          )}
        </div>
        <div className="flex items-center gap-2">
          {items.length > 0 && (
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={onClearAll}
              className="text-muted-foreground hover:text-destructive text-xs gap-1"
            >
              <Trash2 className="h-3 w-3" />
              Clear
            </Button>
          )}
          {!isMobile && (
            <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => onOpenChange(false)}>
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>
      </div>

      {/* Odds Format Selector */}
      <div className="flex items-center justify-between py-3 border-b border-border">
        <span className="text-xs text-muted-foreground">Odds Format</span>
        <div className="flex gap-1">
          {(["decimal", "fractional", "american"] as OddsFormat[]).map((format) => (
            <button
              key={format}
              onClick={() => setOddsFormat(format)}
              className={`px-2 py-1 text-[10px] rounded font-medium transition-colors ${
                oddsFormat === format
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted"
              }`}
            >
              {format.charAt(0).toUpperCase() + format.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto py-4">
        {items.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center px-4">
            <div className="h-16 w-16 rounded-2xl bg-muted/50 flex items-center justify-center mb-4">
              <Zap className="h-8 w-8 text-muted-foreground/50" />
            </div>
            <p className="text-sm font-medium text-muted-foreground mb-1">Your bet slip is empty</p>
            <p className="text-xs text-muted-foreground/70">Click on any outcome to add it here</p>
          </div>
        ) : (
          <div className="space-y-3">
            {items.map((item) => (
              <div 
                key={item.id}
                className="p-3 rounded-xl border border-border bg-card"
              >
                <div className="flex items-start justify-between gap-2 mb-2">
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-muted-foreground line-clamp-1 mb-0.5">{item.marketTitle}</p>
                    <p className="text-sm font-semibold">{item.outcome}</p>
                  </div>
                  <button 
                    onClick={() => onRemoveItem(item.id)}
                    className="text-muted-foreground hover:text-destructive transition-colors p-1"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
                
                <div className="flex items-center gap-3">
                  <div className="flex-1">
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">$</span>
                      <Input
                        type="number"
                        value={item.stake}
                        onChange={(e) => onUpdateStake(item.id, parseFloat(e.target.value) || 0)}
                        className="pl-7 h-9 text-sm font-medium"
                        min="1"
                        step="1"
                      />
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs text-muted-foreground">Odds</div>
                    <div className="text-sm font-bold">{formatOdds(item.odds)}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs text-muted-foreground">Payout</div>
                    <div className="text-sm font-bold text-primary">
                      ${(item.stake * (100 / item.odds)).toFixed(2)}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Accumulator Toggle (if multiple bets) */}
      {items.length > 1 && (
        <div className="py-3 border-t border-border">
          <button
            onClick={() => setIsAccumulator(!isAccumulator)}
            className={`w-full flex items-center justify-between p-3 rounded-xl border transition-all ${
              isAccumulator 
                ? "border-accent bg-accent/10" 
                : "border-border hover:border-border-hover"
            }`}
          >
            <div className="flex items-center gap-2">
              <div className={`h-8 w-8 rounded-lg flex items-center justify-center ${
                isAccumulator ? "bg-accent text-accent-foreground" : "bg-muted"
              }`}>
                <Zap className="h-4 w-4" />
              </div>
              <div className="text-left">
                <p className="text-sm font-semibold">Accumulator</p>
                <p className="text-xs text-muted-foreground">
                  {items.length} selections @ {accumulatorOdds.toFixed(2)}x
                </p>
              </div>
            </div>
            {isAccumulator ? (
              <ChevronUp className="h-4 w-4 text-accent" />
            ) : (
              <ChevronDown className="h-4 w-4 text-muted-foreground" />
            )}
          </button>
          
          {isAccumulator && (
            <div className="mt-3 p-3 rounded-xl border border-accent/30 bg-accent/5">
              <div className="flex items-center gap-3 mb-3">
                <div className="flex-1">
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">$</span>
                    <Input
                      type="number"
                      value={accumulatorStake}
                      onChange={(e) => setAccumulatorStake(parseFloat(e.target.value) || 0)}
                      className="pl-7 h-10 text-base font-semibold"
                      min="1"
                      step="1"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-4 gap-1">
                  {[10, 25, 50, 100].map((amount) => (
                    <button
                      key={amount}
                      onClick={() => setAccumulatorStake(amount)}
                      className="px-2 py-1 text-xs font-medium rounded bg-secondary hover:bg-secondary-hover transition-colors"
                    >
                      ${amount}
                    </button>
                  ))}
                </div>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Potential payout</span>
                <span className="font-bold text-accent">${accumulatorPayout.toFixed(2)}</span>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Footer */}
      {items.length > 0 && (
        <div className="pt-4 border-t border-border space-y-3">
          {!isAccumulator && (
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Total stake</span>
                <span className="font-semibold">${totalStake.toFixed(2)}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Potential profit</span>
                <span className="font-bold text-primary">+${totalPotentialProfit.toFixed(2)}</span>
              </div>
            </div>
          )}
          
          {/* Balance warning */}
          {(isAccumulator ? accumulatorStake : totalStake) > balance && (
            <div className="flex items-center gap-2 p-2 rounded-lg bg-destructive/10 text-destructive text-xs">
              <AlertCircle className="h-4 w-4 flex-shrink-0" />
              <span>Insufficient balance. Please deposit more funds.</span>
            </div>
          )}

          <Button 
            className="w-full h-11 font-bold text-base"
            onClick={handlePlaceBets}
            disabled={isSubmitting || (isAccumulator ? accumulatorStake : totalStake) > balance}
          >
            {isSubmitting ? "Placing bets..." : (
              isAccumulator 
                ? `Place Accumulator - $${accumulatorStake.toFixed(2)}`
                : `Place ${items.length} Bet${items.length > 1 ? 's' : ''} - $${totalStake.toFixed(2)}`
            )}
          </Button>
          
          {/* Responsible gambling notice */}
          <div className="flex items-center justify-center gap-1 text-[10px] text-muted-foreground">
            <Info className="h-3 w-3" />
            <span>Gamble responsibly. Set limits in settings.</span>
          </div>
        </div>
      )}
    </div>
  );

  if (isMobile) {
    return (
      <Sheet open={open} onOpenChange={onOpenChange}>
        <SheetContent side="bottom" className="h-[85vh] rounded-t-3xl px-4 pb-8">
          <SheetHeader className="sr-only">
            <SheetTitle>Bet Slip</SheetTitle>
          </SheetHeader>
          {content}
        </SheetContent>
      </Sheet>
    );
  }

  // Desktop - Fixed sidebar
  if (!open) return null;

  return (
    <div className="fixed right-0 top-14 bottom-0 w-80 bg-background border-l border-border p-4 animate-slide-in-right z-40">
      {content}
    </div>
  );
}

// Floating bet slip button for mobile
export function BetSlipButton({ 
  itemCount, 
  onClick 
}: { 
  itemCount: number; 
  onClick: () => void;
}) {
  if (itemCount === 0) return null;

  return (
    <button
      onClick={onClick}
      className="fixed bottom-20 right-4 z-50 flex items-center gap-2 px-4 py-3 rounded-full bg-primary text-primary-foreground font-bold shadow-lg hover:shadow-xl transition-all active:scale-95 glow-primary"
    >
      <Zap className="h-5 w-5" />
      <span>Bet Slip</span>
      <Badge className="bg-primary-foreground text-primary font-bold ml-1">{itemCount}</Badge>
    </button>
  );
}
