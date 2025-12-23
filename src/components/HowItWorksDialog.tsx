import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle } from "@/components/ui/drawer";
import { useIsMobile } from "@/hooks/use-mobile";
import { TrendingUp, DollarSign, Users, Trophy, ArrowRight, CheckCircle2 } from "lucide-react";

interface HowItWorksDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const steps = [
  {
    icon: TrendingUp,
    title: "Find a Market",
    description: "Browse prediction markets on topics you care about - from crypto and tech to sports and politics.",
    color: "text-primary",
    bg: "bg-primary/10",
  },
  {
    icon: DollarSign,
    title: "Buy Shares",
    description: "Think 'Yes' will happen? Buy Yes shares. Think 'No'? Buy No shares. Prices reflect the crowd's probability.",
    color: "text-success",
    bg: "bg-success/10",
  },
  {
    icon: Users,
    title: "Trade Anytime",
    description: "Sell your shares whenever you want. Prices change based on new information and trader activity.",
    color: "text-blue-500",
    bg: "bg-blue-500/10",
  },
  {
    icon: Trophy,
    title: "Get Paid",
    description: "When the market resolves, winning shares pay out $1 each. Losers pay $0. It's that simple.",
    color: "text-amber-500",
    bg: "bg-amber-500/10",
  },
];

const examples = [
  { question: "Will Bitcoin hit $100K?", yes: "68¢", no: "32¢" },
  { question: "Will Team X win?", yes: "45¢", no: "55¢" },
];

export function HowItWorksDialog({ open, onOpenChange }: HowItWorksDialogProps) {
  const isMobile = useIsMobile();

  const content = (
    <div className="space-y-6">
      {/* Hero Section */}
      <div className="text-center space-y-2">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-2">
          <TrendingUp className="h-8 w-8 text-primary" />
        </div>
        <h2 className="text-xl font-bold">Predict the Future</h2>
        <p className="text-sm text-muted-foreground max-w-sm mx-auto">
          Trade on real-world events. Earn money by making accurate predictions.
        </p>
      </div>

      {/* Steps */}
      <div className="space-y-3">
        {steps.map((step, index) => (
          <div key={index} className="flex gap-4 p-3 rounded-xl bg-muted/30">
            <div className={`flex-shrink-0 w-10 h-10 rounded-full ${step.bg} flex items-center justify-center`}>
              <step.icon className={`h-5 w-5 ${step.color}`} />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-0.5">
                <span className="text-xs font-medium text-muted-foreground">Step {index + 1}</span>
              </div>
              <p className="font-semibold text-sm">{step.title}</p>
              <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">{step.description}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Example */}
      <div className="p-4 rounded-xl border border-border/50 bg-muted/20">
        <p className="text-xs font-medium text-muted-foreground mb-3 flex items-center gap-2">
          <CheckCircle2 className="h-3.5 w-3.5" />
          Quick Example
        </p>
        <div className="space-y-3">
          <p className="text-sm font-medium">You think Bitcoin will hit $100K by 2025.</p>
          <div className="flex items-center gap-3 text-sm">
            <div className="flex-1 p-3 rounded-lg bg-success/10 border border-success/30 text-center">
              <p className="font-bold text-success">Yes @ 68¢</p>
            </div>
            <ArrowRight className="h-4 w-4 text-muted-foreground flex-shrink-0" />
            <div className="flex-1 p-3 rounded-lg bg-muted text-center">
              <p className="font-bold">Win $1.00</p>
            </div>
          </div>
          <p className="text-xs text-muted-foreground">
            Buy for 68¢, get $1 if correct. That's 47% profit! If wrong, you lose your 68¢.
          </p>
        </div>
      </div>

      {/* Key Points */}
      <div className="grid grid-cols-3 gap-2 text-center">
        <div className="p-3 rounded-xl bg-muted/30">
          <p className="text-lg font-bold">$0</p>
          <p className="text-[10px] text-muted-foreground">Min to start</p>
        </div>
        <div className="p-3 rounded-xl bg-muted/30">
          <p className="text-lg font-bold">24/7</p>
          <p className="text-[10px] text-muted-foreground">Trade anytime</p>
        </div>
        <div className="p-3 rounded-xl bg-muted/30">
          <p className="text-lg font-bold">Instant</p>
          <p className="text-[10px] text-muted-foreground">Withdrawals</p>
        </div>
      </div>

      {/* CTA */}
      <div className="text-center">
        <button 
          onClick={() => onOpenChange(false)}
          className="w-full py-3 px-6 rounded-xl bg-primary text-primary-foreground font-semibold text-sm hover:bg-primary/90 transition-colors"
        >
          Start Trading
        </button>
        <p className="text-xs text-muted-foreground mt-2">No account needed to browse markets</p>
      </div>
    </div>
  );

  if (isMobile) {
    return (
      <Drawer open={open} onOpenChange={onOpenChange}>
        <DrawerContent className="px-4 pb-6 max-h-[90vh]">
          <DrawerHeader className="px-0 pb-4">
            <DrawerTitle className="text-center">How It Works</DrawerTitle>
          </DrawerHeader>
          <div className="overflow-y-auto -mx-4 px-4">
            {content}
          </div>
        </DrawerContent>
      </Drawer>
    );
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-center">How It Works</DialogTitle>
        </DialogHeader>
        {content}
      </DialogContent>
    </Dialog>
  );
}
