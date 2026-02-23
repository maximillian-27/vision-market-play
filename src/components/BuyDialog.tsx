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
import { Wallet } from "lucide-react";

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
  pot?: number;
}

const buySchema = z.object({
  amount: z.number()
    .min(1, { message: "Minimum entry is $1" })
    .max(10000, { message: "Maximum entry is $10,000" })
});

function formatPot(pot: number): string {
  if (pot >= 1000000) return `$${(pot / 1000000).toFixed(1)}M`;
  if (pot >= 1000) return `$${(pot / 1000).toFixed(0)}K`;
  return `$${pot}`;
}

export function BuyDialog({ open, onOpenChange, outcome, marketTitle, marketId, pot = 0 }: BuyDialogProps) {
  const isMobile = useIsMobile();
  const { toast } = useToast();
  const [amount, setAmount] = useState("10");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const amountNum = parseFloat(amount) || 0;
  const payout = outcome.price > 0 ? amountNum / (outcome.price / 100) : 0;
  const winnings = payout - amountNum;

  const handleBuy = () => {
    try {
      buySchema.parse({ amount: amountNum });
      
      setIsSubmitting(true);
      
      setTimeout(() => {
        toast({
          title: "Entry placed!",
          description: `You entered $${amountNum.toFixed(2)} on "${outcome.label}"`,
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

  const quickAmounts = [5, 10, 25, 50, 100];

  const contentWithoutButton = (
    <div className="space-y-6">
      {/* Market Info */}
      <div className="space-y-2">
        <h3 className="text-sm font-medium text-muted-foreground">Market</h3>
        <p className="text-sm leading-tight">{marketTitle}</p>
        {pot > 0 && (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-extrabold">
            {formatPot(pot)} Pot
          </span>
        )}
      </div>

      <Separator />

      {/* Outcome */}
      <div className="space-y-2">
        <h3 className="text-sm font-medium text-muted-foreground">Your Pick</h3>
        <div className="flex items-center justify-between p-3 rounded-lg bg-muted/30 border">
          <span className="font-semibold">{outcome.label}</span>
          <span className="text-lg font-bold">{outcome.price}%</span>
        </div>
      </div>

      {/* Amount Input */}
      <div className="space-y-3">
        <Label htmlFor="amount" className="text-sm font-medium">Entry Amount</Label>
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
        
        <div className="grid grid-cols-5 gap-2">
          {quickAmounts.map((quickAmount) => (
            <Button
              key={quickAmount}
              variant="outline"
              size="sm"
              onClick={() => setAmount(quickAmount.toString())}
              className={`h-9 ${amount === quickAmount.toString() ? 'border-primary bg-primary/5' : ''}`}
            >
              ${quickAmount}
            </Button>
          ))}
        </div>
      </div>

      {/* If You Win Summary */}
      <div className="space-y-2 p-4 rounded-lg bg-muted/20 border border-border/50">
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Your Entry</span>
          <span className="font-semibold">${amountNum.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Potential winning</span>
          <span className="font-bold">${payout.toFixed(2)}</span>
        </div>
        <Separator className="my-2" />
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Potential Winnings</span>
          <span className={`font-bold ${winnings > 0 ? 'text-success' : ''}`}>
            +${winnings.toFixed(2)}
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
      <Button
        className="w-full h-12 text-base font-semibold"
        onClick={handleBuy}
        disabled={isSubmitting || amountNum < 1 || amountNum > 10000}
      >
        {isSubmitting ? "Placing entry..." : `Enter ${outcome.label} • $${amountNum.toFixed(2)}`}
      </Button>
    </div>
  );

  if (isMobile) {
    return (
      <Drawer open={open} onOpenChange={onOpenChange}>
        <DrawerContent className="px-4 pb-6 flex flex-col max-h-[85vh]">
          <DrawerHeader className="px-0 pb-4 flex-shrink-0">
            <DrawerTitle>Place Entry</DrawerTitle>
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
              {isSubmitting ? "Placing entry..." : `Enter ${outcome.label} • $${amountNum.toFixed(2)}`}
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
          <DialogTitle>Place Entry</DialogTitle>
        </DialogHeader>
        {content}
      </DialogContent>
    </Dialog>
  );
}
