import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle } from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useIsMobile } from "@/hooks/use-mobile";
import { useToast } from "@/hooks/use-toast";
import { z } from "zod";
import { TrendingUp, Wallet } from "lucide-react";

interface BuyDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  outcome: {
    label: string;
    price: number;
    color?: string;
  };
  marketTitle: string;
  marketId: string;
}

const buySchema = z.object({
  amount: z.number()
    .min(1, { message: "Minimum amount is $1" })
    .max(10000, { message: "Maximum amount is $10,000" })
});

export function BuyDialog({ open, onOpenChange, outcome, marketTitle, marketId }: BuyDialogProps) {
  const isMobile = useIsMobile();
  const { toast } = useToast();
  const [amount, setAmount] = useState("10");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Calculate shares and potential payout
  const amountNum = parseFloat(amount) || 0;
  const shares = outcome.price > 0 ? Math.floor((amountNum * 100) / outcome.price) : 0;
  const potentialPayout = shares;
  const potentialProfit = potentialPayout - amountNum;

  const handleBuy = () => {
    try {
      buySchema.parse({ amount: amountNum });
      
      setIsSubmitting(true);
      
      // Simulate API call
      setTimeout(() => {
        toast({
          title: "Order placed",
          description: `You bought ${shares} shares of "${outcome.label}" for $${amountNum.toFixed(2)}`,
        });
        onOpenChange(false);
        setIsSubmitting(false);
        setAmount("10");
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

  const contentWithoutButton = (
    <div className="space-y-6">
      {/* Market Info */}
      <div className="space-y-2">
        <h3 className="text-sm font-medium text-muted-foreground">Market</h3>
        <p className="text-sm leading-tight">{marketTitle}</p>
      </div>

      <Separator />

      {/* Outcome Selection */}
      <div className="space-y-2">
        <h3 className="text-sm font-medium text-muted-foreground">Buying</h3>
        <div className="flex items-center justify-between p-3 rounded-lg bg-muted/30 border">
          <span className="font-semibold">{outcome.label}</span>
          <span className="text-lg font-bold">{outcome.price}¢</span>
        </div>
      </div>

      {/* Amount Input */}
      <div className="space-y-3">
        <Label htmlFor="amount" className="text-sm font-medium">Amount</Label>
        <div className="relative">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
          <Input
            id="amount"
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="pl-7 h-12 text-lg font-semibold"
            min="1"
            max="10000"
            step="1"
          />
        </div>
        
        {/* Quick Amount Buttons */}
        <div className="grid grid-cols-4 gap-2">
          {quickAmounts.map((quickAmount) => (
            <Button
              key={quickAmount}
              variant="outline"
              size="sm"
              onClick={() => setAmount(quickAmount.toString())}
              className="h-9"
            >
              ${quickAmount}
            </Button>
          ))}
        </div>
      </div>

      {/* Order Summary */}
      <div className="space-y-2 p-4 rounded-lg bg-muted/20">
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Shares</span>
          <span className="font-semibold">{shares.toLocaleString()}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Avg. price</span>
          <span className="font-semibold">{outcome.price}¢</span>
        </div>
        <Separator className="my-2" />
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Potential payout</span>
          <span className="font-semibold">${potentialPayout.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Potential profit</span>
          <span className={`font-semibold ${potentialProfit > 0 ? 'text-success' : ''}`}>
            ${potentialProfit.toFixed(2)}
          </span>
        </div>
      </div>

      {/* Available Balance */}
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <Wallet className="h-4 w-4" />
        <span>Available: $5,230.00</span>
      </div>
    </div>
  );

  const content = (
    <div className="space-y-6">
      {contentWithoutButton}

      {/* Buy Button */}
      <Button
        className="w-full h-12 text-base font-semibold"
        onClick={handleBuy}
        disabled={isSubmitting || amountNum < 1 || amountNum > 10000}
      >
        {isSubmitting ? "Placing order..." : `Buy ${outcome.label} for $${amountNum.toFixed(2)}`}
      </Button>
    </div>
  );

  if (isMobile) {
    return (
      <Drawer open={open} onOpenChange={onOpenChange}>
        <DrawerContent className="px-4 pb-6 flex flex-col max-h-[85vh]">
          <DrawerHeader className="px-0 pb-4 flex-shrink-0">
            <DrawerTitle>Place Order</DrawerTitle>
          </DrawerHeader>
          <div className="overflow-y-auto flex-1 -mx-4 px-4">
            {contentWithoutButton}
          </div>
          <div className="pt-6 flex-shrink-0 border-t mt-4">
            <Button
              className="w-full h-12 text-base font-semibold"
              onClick={handleBuy}
              disabled={isSubmitting || amountNum < 1 || amountNum > 10000}
            >
              {isSubmitting ? "Placing order..." : `Buy ${outcome.label} for $${amountNum.toFixed(2)}`}
            </Button>
          </div>
        </DrawerContent>
      </Drawer>
    );
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Place Order</DialogTitle>
        </DialogHeader>
        {content}
      </DialogContent>
    </Dialog>
  );
}
