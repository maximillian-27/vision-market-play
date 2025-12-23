import { useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { z } from "zod";
import { 
  TrendingUp, 
  Clock, 
  Users, 
  BadgeCheck, 
  Check, 
  X,
  Wallet,
  ChevronRight
} from "lucide-react";

interface Outcome {
  label: string;
  price: number;
  color?: string;
  logo?: string;
}

interface MarketDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  market: {
    id: string;
    title: string;
    image: string;
    creator: {
      name: string;
      avatar: string;
      id?: string;
      isCreator?: boolean;
    };
    outcomes: Outcome[];
    volume: string;
    endsIn: string;
    traders?: number;
    description?: string;
  };
}

const buySchema = z.object({
  amount: z.number()
    .min(1, { message: "Minimum amount is $1" })
    .max(10000, { message: "Maximum amount is $10,000" })
});

export function MarketDialog({ open, onOpenChange, market }: MarketDialogProps) {
  const { toast } = useToast();
  const [selectedOutcome, setSelectedOutcome] = useState<Outcome | null>(null);
  const [amount, setAmount] = useState("10");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const isBinary = market.outcomes.length === 2 && 
    market.outcomes.some(o => o.label.toLowerCase() === "yes") &&
    market.outcomes.some(o => o.label.toLowerCase() === "no");

  const amountNum = parseFloat(amount) || 0;
  const shares = selectedOutcome && selectedOutcome.price > 0 
    ? Math.floor((amountNum * 100) / selectedOutcome.price) 
    : 0;
  const potentialPayout = shares;
  const potentialProfit = potentialPayout - amountNum;

  const handleBuy = () => {
    if (!selectedOutcome) {
      toast({
        title: "Select an outcome",
        description: "Please select an outcome before placing an order",
        variant: "destructive"
      });
      return;
    }

    try {
      buySchema.parse({ amount: amountNum });
      
      setIsSubmitting(true);
      
      setTimeout(() => {
        toast({
          title: "Order placed",
          description: `You bought ${shares} shares of "${selectedOutcome.label}" for $${amountNum.toFixed(2)}`,
        });
        onOpenChange(false);
        setIsSubmitting(false);
        setAmount("10");
        setSelectedOutcome(null);
      }, 500);
    } catch (error) {
      if (error instanceof z.ZodError) {
        toast({
          title: "Invalid amount",
          description: error.errors[0].message,
          variant: "destructive"
        });
      }
    }
  };

  const quickAmounts = [10, 25, 50, 100];

  const handleClose = (isOpen: boolean) => {
    if (!isOpen) {
      setSelectedOutcome(null);
      setAmount("10");
    }
    onOpenChange(isOpen);
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-lg p-0 gap-0 overflow-hidden">
        {/* Header with image */}
        <div className="relative h-32 bg-muted overflow-hidden">
          <img 
            src={market.image} 
            alt={market.title}
            className="w-full h-full object-cover opacity-80"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
          
          {/* Creator badge */}
          <div className="absolute top-3 left-3 flex items-center gap-1.5 bg-background/80 backdrop-blur-sm rounded-full px-2 py-1">
            <Avatar className="h-5 w-5">
              <AvatarImage src={market.creator.avatar} alt={market.creator.name} />
              <AvatarFallback className="text-[8px]">{market.creator.name.slice(0, 2)}</AvatarFallback>
            </Avatar>
            <span className="text-xs font-medium">{market.creator.name}</span>
            {market.creator.isCreator !== false && (
              <BadgeCheck className="h-3.5 w-3.5 text-primary fill-primary/20" />
            )}
          </div>
        </div>

        {/* Content */}
        <div className="p-4 space-y-4">
          {/* Title */}
          <h2 className="text-lg font-bold leading-tight pr-4">{market.title}</h2>
          
          {/* Stats */}
          <div className="flex items-center gap-4 text-xs text-muted-foreground">
            <div className="flex items-center gap-1">
              <TrendingUp className="h-3.5 w-3.5" />
              <span className="font-medium text-foreground">{market.volume}</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="h-3.5 w-3.5" />
              <span>{market.endsIn}</span>
            </div>
            {market.traders && (
              <div className="flex items-center gap-1">
                <Users className="h-3.5 w-3.5" />
                <span>{market.traders.toLocaleString()}</span>
              </div>
            )}
          </div>

          <Separator />

          {/* Outcome Selection */}
          <div className="space-y-2">
            <p className="text-sm font-medium text-muted-foreground">Select outcome</p>
            
            {isBinary ? (
              /* Binary: Yes/No side by side */
              <div className="grid grid-cols-2 gap-2">
                {market.outcomes.map((outcome, index) => {
                  const isYes = outcome.label.toLowerCase() === "yes";
                  const isSelected = selectedOutcome?.label === outcome.label;
                  
                  return (
                    <button
                      key={index}
                      onClick={() => setSelectedOutcome(outcome)}
                      className={`p-3 rounded-xl transition-all active:scale-[0.98] border-2 ${
                        isSelected
                          ? isYes 
                            ? 'border-success bg-success/10' 
                            : 'border-muted-foreground bg-muted'
                          : isYes
                            ? 'border-success/30 hover:border-success/50 hover:bg-success/5'
                            : 'border-border hover:border-muted-foreground/50 hover:bg-muted/50'
                      }`}
                    >
                      <div className={`mx-auto w-8 h-8 rounded-full flex items-center justify-center mb-2 ${
                        isYes ? 'bg-success/20 text-success' : 'bg-muted text-muted-foreground'
                      }`}>
                        {isYes ? <Check className="h-4 w-4" /> : <X className="h-4 w-4" />}
                      </div>
                      <p className="font-semibold text-sm">{outcome.label}</p>
                      <p className="text-lg font-bold">{outcome.price}¢</p>
                    </button>
                  );
                })}
              </div>
            ) : (
              /* Multi-outcome: List */
              <div className="space-y-1.5 max-h-[160px] overflow-y-auto">
                {market.outcomes.map((outcome, index) => {
                  const isSelected = selectedOutcome?.label === outcome.label;
                  
                  return (
                    <button
                      key={index}
                      onClick={() => setSelectedOutcome(outcome)}
                      className={`w-full flex items-center gap-3 p-2.5 rounded-xl transition-all border ${
                        isSelected
                          ? 'border-primary bg-primary/5'
                          : 'border-transparent hover:bg-muted/50'
                      }`}
                    >
                      {outcome.logo ? (
                        <img src={outcome.logo} alt={outcome.label} className="h-8 w-8 object-contain" />
                      ) : (
                        <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center text-sm font-bold">
                          {outcome.label.charAt(0)}
                        </div>
                      )}
                      <span className="flex-1 text-left font-medium text-sm">{outcome.label}</span>
                      <span className="text-base font-bold">{outcome.price}%</span>
                      {isSelected && (
                        <div className="w-5 h-5 rounded-full bg-primary flex items-center justify-center">
                          <Check className="h-3 w-3 text-primary-foreground" />
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* Amount Input - Only show when outcome is selected */}
          {selectedOutcome && (
            <>
              <Separator />
              
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-muted-foreground">Amount</p>
                  <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                    <Wallet className="h-3.5 w-3.5" />
                    <span>$5,230.00</span>
                  </div>
                </div>
                
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground font-medium">$</span>
                  <Input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="pl-7 h-11 text-lg font-semibold"
                    min="1"
                    max="10000"
                    step="1"
                  />
                </div>
                
                {/* Quick Amounts */}
                <div className="grid grid-cols-4 gap-1.5">
                  {quickAmounts.map((quickAmount) => (
                    <Button
                      key={quickAmount}
                      variant="outline"
                      size="sm"
                      onClick={() => setAmount(quickAmount.toString())}
                      className={`h-8 text-xs ${amount === quickAmount.toString() ? 'border-primary bg-primary/5' : ''}`}
                    >
                      ${quickAmount}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Summary */}
              <div className="p-3 rounded-xl bg-muted/30 space-y-1.5">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Shares</span>
                  <span className="font-semibold">{shares.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Potential profit</span>
                  <span className={`font-semibold ${potentialProfit > 0 ? 'text-success' : ''}`}>
                    +${potentialProfit.toFixed(2)}
                  </span>
                </div>
              </div>
            </>
          )}

          {/* Buy Button */}
          <Button
            className="w-full h-11 font-semibold"
            onClick={handleBuy}
            disabled={!selectedOutcome || isSubmitting || amountNum < 1 || amountNum > 10000}
          >
            {isSubmitting 
              ? "Placing order..." 
              : selectedOutcome 
                ? `Buy ${selectedOutcome.label} for $${amountNum.toFixed(2)}`
                : "Select an outcome"
            }
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}