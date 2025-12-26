import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle } from "@/components/ui/drawer";
import { useIsMobile } from "@/hooks/use-mobile";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  TrendingUp, 
  DollarSign, 
  Users, 
  Trophy, 
  ArrowRight, 
  CheckCircle2,
  Wallet,
  LineChart,
  Shield,
  Clock,
  AlertTriangle,
  Sparkles,
  Scale,
  MessageSquare,
  HelpCircle,
  CreditCard,
  ArrowUpRight,
  ArrowDownRight,
  Target,
  Gavel,
  BookOpen,
  Lightbulb,
  PenTool,
  XCircle,
  BadgeCheck,
  FileText
} from "lucide-react";

interface HowItWorksDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function HowItWorksDialog({ open, onOpenChange }: HowItWorksDialogProps) {
  const isMobile = useIsMobile();

  const content = (
    <Tabs defaultValue="basics" className="w-full">
      <TabsList className="w-full grid grid-cols-5 mb-4 h-auto p-1">
        <TabsTrigger value="basics" className="text-xs py-2 px-1">
          <BookOpen className="h-3.5 w-3.5 mr-1 hidden sm:inline" />
          Basics
        </TabsTrigger>
        <TabsTrigger value="trading" className="text-xs py-2 px-1">
          <LineChart className="h-3.5 w-3.5 mr-1 hidden sm:inline" />
          Trading
        </TabsTrigger>
        <TabsTrigger value="money" className="text-xs py-2 px-1">
          <Wallet className="h-3.5 w-3.5 mr-1 hidden sm:inline" />
          Money
        </TabsTrigger>
        <TabsTrigger value="creators" className="text-xs py-2 px-1">
          <PenTool className="h-3.5 w-3.5 mr-1 hidden sm:inline" />
          Creators
        </TabsTrigger>
        <TabsTrigger value="advanced" className="text-xs py-2 px-1">
          <Lightbulb className="h-3.5 w-3.5 mr-1 hidden sm:inline" />
          Advanced
        </TabsTrigger>
      </TabsList>

      {/* BASICS TAB */}
      <TabsContent value="basics" className="mt-0 space-y-5">
        {/* What is Pollgy */}
        <section className="space-y-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
              <TrendingUp className="h-4 w-4 text-primary" />
            </div>
            <h3 className="font-bold text-base">What is Pollgy?</h3>
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Pollgy is a prediction market platform where you can trade on the outcomes of real-world events. 
            Think of it like a stock market, but instead of companies, you're trading on questions like 
            "Will Bitcoin hit $100K?" or "Who will win the election?"
          </p>
          <div className="p-3 rounded-lg bg-primary/5 border border-primary/20">
            <p className="text-xs text-primary font-medium flex items-center gap-2">
              <Lightbulb className="h-3.5 w-3.5" />
              The crowd's collective predictions are often more accurate than individual experts!
            </p>
          </div>
        </section>

        {/* How Markets Work */}
        <section className="space-y-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center">
              <Target className="h-4 w-4 text-blue-500" />
            </div>
            <h3 className="font-bold text-base">How Markets Work</h3>
          </div>
          <div className="space-y-2">
            <div className="flex gap-3 p-3 rounded-lg bg-muted/30">
              <div className="w-6 h-6 rounded-full bg-success/20 text-success flex items-center justify-center text-xs font-bold flex-shrink-0">1</div>
              <div>
                <p className="text-sm font-medium">Each market is a Yes/No question</p>
                <p className="text-xs text-muted-foreground">Example: "Will SpaceX launch Starship by December?"</p>
              </div>
            </div>
            <div className="flex gap-3 p-3 rounded-lg bg-muted/30">
              <div className="w-6 h-6 rounded-full bg-success/20 text-success flex items-center justify-center text-xs font-bold flex-shrink-0">2</div>
              <div>
                <p className="text-sm font-medium">Prices = Probability</p>
                <p className="text-xs text-muted-foreground">If "Yes" costs 70¢, the market thinks there's a 70% chance it happens</p>
              </div>
            </div>
            <div className="flex gap-3 p-3 rounded-lg bg-muted/30">
              <div className="w-6 h-6 rounded-full bg-success/20 text-success flex items-center justify-center text-xs font-bold flex-shrink-0">3</div>
              <div>
                <p className="text-sm font-medium">Winning shares pay $1.00</p>
                <p className="text-xs text-muted-foreground">Buy low, win high. Losing shares are worth $0</p>
              </div>
            </div>
          </div>
        </section>

        {/* Quick Example */}
        <section className="space-y-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-amber-500/10 flex items-center justify-center">
              <CheckCircle2 className="h-4 w-4 text-amber-500" />
            </div>
            <h3 className="font-bold text-base">Quick Example</h3>
          </div>
          <div className="p-4 rounded-xl border border-border bg-muted/20 space-y-4">
            <div className="text-center">
              <p className="text-sm font-semibold mb-1">"Will Bitcoin hit $100K by 2025?"</p>
              <p className="text-xs text-muted-foreground">You believe it will happen</p>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex-1 p-3 rounded-lg bg-success/10 border border-success/30 text-center">
                <p className="text-xs text-muted-foreground mb-1">You buy</p>
                <p className="font-bold text-success">Yes @ 68¢</p>
              </div>
              <ArrowRight className="h-4 w-4 text-muted-foreground flex-shrink-0" />
              <div className="flex-1 p-3 rounded-lg bg-muted text-center">
                <p className="text-xs text-muted-foreground mb-1">If correct</p>
                <p className="font-bold text-foreground">Win $1.00</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2 text-center">
              <div className="p-2 rounded-lg bg-success/10">
                <p className="text-xs text-muted-foreground">Profit if right</p>
                <p className="font-bold text-success text-sm">+32¢ (47%)</p>
              </div>
              <div className="p-2 rounded-lg bg-destructive/10">
                <p className="text-xs text-muted-foreground">Loss if wrong</p>
                <p className="font-bold text-destructive text-sm">-68¢ (100%)</p>
              </div>
            </div>
          </div>
        </section>

        {/* Key Stats */}
        <section className="grid grid-cols-3 gap-2 text-center">
          <div className="p-3 rounded-xl bg-muted/30">
            <p className="text-lg font-bold">$1</p>
            <p className="text-[10px] text-muted-foreground">Min trade</p>
          </div>
          <div className="p-3 rounded-xl bg-muted/30">
            <p className="text-lg font-bold">24/7</p>
            <p className="text-[10px] text-muted-foreground">Trade anytime</p>
          </div>
          <div className="p-3 rounded-xl bg-muted/30">
            <p className="text-lg font-bold">Instant</p>
            <p className="text-[10px] text-muted-foreground">Execution</p>
          </div>
        </section>
      </TabsContent>

      {/* TRADING TAB */}
      <TabsContent value="trading" className="mt-0 space-y-5">
        {/* Buying Shares */}
        <section className="space-y-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-success/10 flex items-center justify-center">
              <ArrowUpRight className="h-4 w-4 text-success" />
            </div>
            <h3 className="font-bold text-base">Buying Shares</h3>
          </div>
          <div className="space-y-2 text-sm text-muted-foreground">
            <p className="leading-relaxed">
              When you believe an outcome will happen, you buy shares. The price you pay reflects 
              the current market probability.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="p-3 rounded-lg bg-success/10 border border-success/30">
              <p className="font-semibold text-success text-sm mb-1">Buy "Yes"</p>
              <p className="text-xs text-muted-foreground">When you think the event WILL happen</p>
            </div>
            <div className="p-3 rounded-lg bg-destructive/10 border border-destructive/30">
              <p className="font-semibold text-destructive text-sm mb-1">Buy "No"</p>
              <p className="text-xs text-muted-foreground">When you think the event WON'T happen</p>
            </div>
          </div>
        </section>

        {/* Selling Shares */}
        <section className="space-y-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center">
              <ArrowDownRight className="h-4 w-4 text-blue-500" />
            </div>
            <h3 className="font-bold text-base">Selling Shares</h3>
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed">
            You don't have to wait for a market to resolve. Sell your shares anytime to lock in profits 
            or cut losses. The price will have changed based on new information.
          </p>
          <div className="p-3 rounded-lg bg-muted/30 space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Bought at</span>
              <span className="font-medium">45¢</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Current price</span>
              <span className="font-medium text-success">72¢</span>
            </div>
            <div className="border-t border-border pt-2 flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Profit if sold now</span>
              <span className="font-bold text-success">+27¢ per share</span>
            </div>
          </div>
        </section>

        {/* Understanding Prices */}
        <section className="space-y-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-purple-500/10 flex items-center justify-center">
              <LineChart className="h-4 w-4 text-purple-500" />
            </div>
            <h3 className="font-bold text-base">Understanding Prices</h3>
          </div>
          <div className="space-y-3">
            <div className="p-3 rounded-lg bg-muted/30">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-3 h-3 rounded-full bg-success"></div>
                <span className="text-sm font-medium">High Price (80¢+)</span>
              </div>
              <p className="text-xs text-muted-foreground">Market strongly believes this will happen. Lower potential profit, but higher confidence.</p>
            </div>
            <div className="p-3 rounded-lg bg-muted/30">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-3 h-3 rounded-full bg-amber-500"></div>
                <span className="text-sm font-medium">Mid Price (40-60¢)</span>
              </div>
              <p className="text-xs text-muted-foreground">Uncertain outcome. Market is split. Good opportunity if you have strong conviction.</p>
            </div>
            <div className="p-3 rounded-lg bg-muted/30">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-3 h-3 rounded-full bg-destructive"></div>
                <span className="text-sm font-medium">Low Price (20¢ or less)</span>
              </div>
              <p className="text-xs text-muted-foreground">Market thinks unlikely. High risk but potentially 5x+ returns if you're right.</p>
            </div>
          </div>
        </section>

        {/* Position Types */}
        <section className="space-y-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-amber-500/10 flex items-center justify-center">
              <Scale className="h-4 w-4 text-amber-500" />
            </div>
            <h3 className="font-bold text-base">Your Positions</h3>
          </div>
          <p className="text-sm text-muted-foreground">
            Track all your active trades in your Portfolio. You'll see:
          </p>
          <ul className="space-y-2 text-sm">
            <li className="flex items-start gap-2">
              <CheckCircle2 className="h-4 w-4 text-success mt-0.5 flex-shrink-0" />
              <span>Current value of each position</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="h-4 w-4 text-success mt-0.5 flex-shrink-0" />
              <span>Profit/loss since you bought</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="h-4 w-4 text-success mt-0.5 flex-shrink-0" />
              <span>Time remaining until resolution</span>
            </li>
          </ul>
        </section>
      </TabsContent>

      {/* MONEY TAB */}
      <TabsContent value="money" className="mt-0 space-y-5">
        {/* Deposits */}
        <section className="space-y-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-success/10 flex items-center justify-center">
              <CreditCard className="h-4 w-4 text-success" />
            </div>
            <h3 className="font-bold text-base">Depositing Funds</h3>
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Add funds to your account to start trading. We support multiple payment methods:
          </p>
          <div className="grid grid-cols-2 gap-2">
            <div className="p-3 rounded-lg bg-muted/30 text-center">
              <p className="text-sm font-medium">Credit/Debit</p>
              <p className="text-xs text-muted-foreground">Instant</p>
            </div>
            <div className="p-3 rounded-lg bg-muted/30 text-center">
              <p className="text-sm font-medium">Bank Transfer</p>
              <p className="text-xs text-muted-foreground">1-3 days</p>
            </div>
            <div className="p-3 rounded-lg bg-muted/30 text-center">
              <p className="text-sm font-medium">Crypto</p>
              <p className="text-xs text-muted-foreground">~15 mins</p>
            </div>
            <div className="p-3 rounded-lg bg-muted/30 text-center">
              <p className="text-sm font-medium">Apple/Google Pay</p>
              <p className="text-xs text-muted-foreground">Instant</p>
            </div>
          </div>
        </section>

        {/* Withdrawals */}
        <section className="space-y-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center">
              <Wallet className="h-4 w-4 text-blue-500" />
            </div>
            <h3 className="font-bold text-base">Withdrawing Funds</h3>
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Withdraw your profits anytime. Your cash balance is always available for withdrawal.
          </p>
          <div className="p-3 rounded-lg bg-muted/30 space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Minimum withdrawal</span>
              <span className="font-medium">$10</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Processing time</span>
              <span className="font-medium">1-3 business days</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Fees</span>
              <span className="font-medium text-success">Free</span>
            </div>
          </div>
        </section>

        {/* Understanding Your Balance */}
        <section className="space-y-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-purple-500/10 flex items-center justify-center">
              <DollarSign className="h-4 w-4 text-purple-500" />
            </div>
            <h3 className="font-bold text-base">Understanding Your Balance</h3>
          </div>
          <div className="space-y-3">
            <div className="p-3 rounded-lg border border-border bg-background">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-sm font-semibold">Cash Balance</span>
              </div>
              <p className="text-xs text-muted-foreground">Available funds you can use to trade or withdraw. This is real money in your account.</p>
            </div>
            <div className="p-3 rounded-lg border border-border bg-background">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-sm font-semibold">Portfolio Value</span>
              </div>
              <p className="text-xs text-muted-foreground">Total value of all your open positions at current market prices. This fluctuates as prices change.</p>
            </div>
            <div className="p-3 rounded-lg border border-primary/30 bg-primary/5">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-sm font-semibold text-primary">Total Value</span>
              </div>
              <p className="text-xs text-muted-foreground">Cash + Portfolio = Your total account value</p>
            </div>
          </div>
        </section>

        {/* Fees */}
        <section className="space-y-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-amber-500/10 flex items-center justify-center">
              <Scale className="h-4 w-4 text-amber-500" />
            </div>
            <h3 className="font-bold text-base">Fees & Costs</h3>
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
              <span className="text-sm">Trading fee</span>
              <span className="text-sm font-medium">2%</span>
            </div>
            <div className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
              <span className="text-sm">Deposit fee</span>
              <span className="text-sm font-medium text-success">Free</span>
            </div>
            <div className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
              <span className="text-sm">Withdrawal fee</span>
              <span className="text-sm font-medium text-success">Free</span>
            </div>
            <div className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
              <span className="text-sm">Account fee</span>
              <span className="text-sm font-medium text-success">Free</span>
            </div>
          </div>
        </section>
        {/* Non-refundable fees notice */}
        <section className="p-3 rounded-lg border border-amber-500/30 bg-amber-500/5">
          <div className="flex items-start gap-2">
            <AlertTriangle className="h-4 w-4 text-amber-500 mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-sm font-medium text-amber-600 dark:text-amber-400">Fees are Non-Refundable</p>
              <p className="text-xs text-muted-foreground mt-1">
                In the event that a market is canceled, all trading fees are non-refundable. 
                Your original investment will be returned, but any fees paid during trading will not be refunded.
              </p>
            </div>
          </div>
        </section>
      </TabsContent>

      {/* CREATORS TAB */}
      <TabsContent value="creators" className="mt-0 space-y-5">
        {/* What is a Creator */}
        <section className="space-y-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
              <PenTool className="h-4 w-4 text-primary" />
            </div>
            <h3 className="font-bold text-base">What is a Creator?</h3>
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Creators are verified users who can create and manage prediction markets on Pollgy. 
            They design questions, set resolution criteria, and earn fees from trading activity.
          </p>
          <div className="grid grid-cols-3 gap-2 text-center">
            <div className="p-3 rounded-lg bg-muted/30">
              <p className="text-lg font-bold text-primary">1%</p>
              <p className="text-[10px] text-muted-foreground">Creator fee</p>
            </div>
            <div className="p-3 rounded-lg bg-muted/30">
              <p className="text-lg font-bold">∞</p>
              <p className="text-[10px] text-muted-foreground">Markets</p>
            </div>
            <div className="p-3 rounded-lg bg-muted/30">
              <p className="text-lg font-bold">24h</p>
              <p className="text-[10px] text-muted-foreground">Approval time</p>
            </div>
          </div>
        </section>

        {/* How to Become a Creator */}
        <section className="space-y-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-success/10 flex items-center justify-center">
              <BadgeCheck className="h-4 w-4 text-success" />
            </div>
            <h3 className="font-bold text-base">How to Become a Creator</h3>
          </div>
          <div className="space-y-2">
            <div className="flex gap-3 p-3 rounded-lg bg-muted/30">
              <div className="w-6 h-6 rounded-full bg-success/20 text-success flex items-center justify-center text-xs font-bold flex-shrink-0">1</div>
              <div>
                <p className="text-sm font-medium">Apply for Creator Status</p>
                <p className="text-xs text-muted-foreground">Go to your profile and click "Become a Creator"</p>
              </div>
            </div>
            <div className="flex gap-3 p-3 rounded-lg bg-muted/30">
              <div className="w-6 h-6 rounded-full bg-success/20 text-success flex items-center justify-center text-xs font-bold flex-shrink-0">2</div>
              <div>
                <p className="text-sm font-medium">Complete Verification</p>
                <p className="text-xs text-muted-foreground">Verify your identity and agree to creator terms</p>
              </div>
            </div>
            <div className="flex gap-3 p-3 rounded-lg bg-muted/30">
              <div className="w-6 h-6 rounded-full bg-success/20 text-success flex items-center justify-center text-xs font-bold flex-shrink-0">3</div>
              <div>
                <p className="text-sm font-medium">Wait for Approval</p>
                <p className="text-xs text-muted-foreground">Our team reviews applications within 24 hours</p>
              </div>
            </div>
            <div className="flex gap-3 p-3 rounded-lg bg-muted/30">
              <div className="w-6 h-6 rounded-full bg-success/20 text-success flex items-center justify-center text-xs font-bold flex-shrink-0">4</div>
              <div>
                <p className="text-sm font-medium">Start Creating</p>
                <p className="text-xs text-muted-foreground">Once approved, you can create unlimited markets</p>
              </div>
            </div>
          </div>
        </section>

        {/* Creating a Market */}
        <section className="space-y-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center">
              <FileText className="h-4 w-4 text-blue-500" />
            </div>
            <h3 className="font-bold text-base">Creating a Market</h3>
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed">
            When creating a market, you'll need to provide:
          </p>
          <ul className="space-y-2 text-sm">
            <li className="flex items-start gap-2">
              <CheckCircle2 className="h-4 w-4 text-success mt-0.5 flex-shrink-0" />
              <span><span className="font-medium">Clear question</span> - A yes/no question with one definitive answer</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="h-4 w-4 text-success mt-0.5 flex-shrink-0" />
              <span><span className="font-medium">Resolution criteria</span> - Exactly how the outcome will be determined</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="h-4 w-4 text-success mt-0.5 flex-shrink-0" />
              <span><span className="font-medium">End date</span> - When trading closes and resolution begins</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="h-4 w-4 text-success mt-0.5 flex-shrink-0" />
              <span><span className="font-medium">Category</span> - Help users find your market</span>
            </li>
          </ul>
        </section>

        {/* Creator Responsibilities */}
        <section className="space-y-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-amber-500/10 flex items-center justify-center">
              <Scale className="h-4 w-4 text-amber-500" />
            </div>
            <h3 className="font-bold text-base">Creator Responsibilities</h3>
          </div>
          <div className="space-y-2">
            <div className="p-3 rounded-lg bg-muted/30">
              <p className="text-sm font-medium mb-1">Accurate Resolution</p>
              <p className="text-xs text-muted-foreground">Resolve markets fairly based on stated criteria</p>
            </div>
            <div className="p-3 rounded-lg bg-muted/30">
              <p className="text-sm font-medium mb-1">Clear Communication</p>
              <p className="text-xs text-muted-foreground">Respond to user questions in market comments</p>
            </div>
            <div className="p-3 rounded-lg bg-muted/30">
              <p className="text-sm font-medium mb-1">Timely Resolution</p>
              <p className="text-xs text-muted-foreground">Resolve markets within 48 hours of the end date</p>
            </div>
          </div>
        </section>

        {/* Market Cancellation */}
        <section className="space-y-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-destructive/10 flex items-center justify-center">
              <XCircle className="h-4 w-4 text-destructive" />
            </div>
            <h3 className="font-bold text-base">Market Cancellation</h3>
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed">
            In rare cases, markets may be canceled if the outcome becomes unknowable or the question is fundamentally flawed.
          </p>
          <div className="p-3 rounded-lg border border-destructive/30 bg-destructive/5">
            <div className="flex items-start gap-2">
              <AlertTriangle className="h-4 w-4 text-destructive mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-sm font-medium text-destructive">Important: Fees Are Non-Refundable</p>
                <p className="text-xs text-muted-foreground mt-1">
                  When a market is canceled, your original investment is returned to your cash balance. 
                  However, <span className="font-medium text-foreground">all trading fees paid are non-refundable</span>. 
                  This includes the 2% trading fee collected on each transaction.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Creator Earnings */}
        <section className="space-y-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-success/10 flex items-center justify-center">
              <DollarSign className="h-4 w-4 text-success" />
            </div>
            <h3 className="font-bold text-base">Creator Earnings</h3>
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Earn passive income from every trade on your markets:
          </p>
          <div className="p-4 rounded-xl border border-border bg-muted/20 space-y-3">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Your share of trading fees</span>
              <span className="font-bold text-primary">1% per trade</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Platform fee</span>
              <span className="font-medium">1% per trade</span>
            </div>
            <div className="border-t border-border pt-3">
              <p className="text-xs text-muted-foreground">
                Example: If your market has $10,000 in trading volume, you earn $100 in creator fees.
              </p>
            </div>
          </div>
        </section>
      </TabsContent>

      {/* ADVANCED TAB */}
      <TabsContent value="advanced" className="mt-0 space-y-5">
        {/* Market Resolution */}
        <section className="space-y-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-success/10 flex items-center justify-center">
              <Gavel className="h-4 w-4 text-success" />
            </div>
            <h3 className="font-bold text-base">Market Resolution</h3>
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed">
            When a market's question is answered, it gets resolved. Here's how it works:
          </p>
          <div className="space-y-2">
            <div className="p-3 rounded-lg bg-muted/30">
              <p className="text-sm font-medium mb-1">1. Event Occurs</p>
              <p className="text-xs text-muted-foreground">The real-world outcome happens (e.g., Bitcoin hits $100K)</p>
            </div>
            <div className="p-3 rounded-lg bg-muted/30">
              <p className="text-sm font-medium mb-1">2. Resolution Period</p>
              <p className="text-xs text-muted-foreground">Market creator or verified source confirms the outcome</p>
            </div>
            <div className="p-3 rounded-lg bg-muted/30">
              <p className="text-sm font-medium mb-1">3. Payout</p>
              <p className="text-xs text-muted-foreground">Winning shares automatically pay $1. Losing shares are worth $0</p>
            </div>
          </div>
        </section>

        {/* Disputes */}
        <section className="space-y-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-amber-500/10 flex items-center justify-center">
              <AlertTriangle className="h-4 w-4 text-amber-500" />
            </div>
            <h3 className="font-bold text-base">Disputes</h3>
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Think a market was resolved incorrectly? You can dispute it during the dispute period.
          </p>
          <div className="p-3 rounded-lg border border-amber-500/30 bg-amber-500/5 space-y-2">
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-amber-500" />
              <span className="text-sm font-medium">24-hour dispute window</span>
            </div>
            <p className="text-xs text-muted-foreground">
              After a market is resolved, there's a 24-hour period where users can challenge the outcome 
              if they believe it's incorrect.
            </p>
          </div>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li className="flex items-start gap-2">
              <span className="text-muted-foreground">•</span>
              <span>Provide evidence for your dispute</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-muted-foreground">•</span>
              <span>Disputes are reviewed by our team</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-muted-foreground">•</span>
              <span>Legitimate disputes can reverse resolutions</span>
            </li>
          </ul>
        </section>

        {/* Become a Creator */}
        <section className="space-y-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
              <Sparkles className="h-4 w-4 text-primary" />
            </div>
            <h3 className="font-bold text-base">Become a Creator</h3>
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Create your own markets and earn fees when people trade on them!
          </p>
          <div className="grid grid-cols-2 gap-2">
            <div className="p-3 rounded-lg bg-muted/30 text-center">
              <p className="text-lg font-bold text-primary">1%</p>
              <p className="text-xs text-muted-foreground">Creator fee on trades</p>
            </div>
            <div className="p-3 rounded-lg bg-muted/30 text-center">
              <p className="text-lg font-bold">∞</p>
              <p className="text-xs text-muted-foreground">Markets you can create</p>
            </div>
          </div>
          <div className="p-3 rounded-lg bg-primary/5 border border-primary/20">
            <p className="text-xs text-muted-foreground">
              <span className="font-medium text-foreground">How to become a creator:</span> Apply through your profile settings. 
              We review applications within 24 hours. Verified creators get access to market creation tools.
            </p>
          </div>
        </section>

        {/* Community Features */}
        <section className="space-y-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center">
              <MessageSquare className="h-4 w-4 text-blue-500" />
            </div>
            <h3 className="font-bold text-base">Community Features</h3>
          </div>
          <div className="space-y-2">
            <div className="p-3 rounded-lg bg-muted/30">
              <p className="text-sm font-medium mb-1">Comments</p>
              <p className="text-xs text-muted-foreground">Discuss markets, share analysis, and debate with other traders</p>
            </div>
            <div className="p-3 rounded-lg bg-muted/30">
              <p className="text-sm font-medium mb-1">Follow Traders</p>
              <p className="text-xs text-muted-foreground">Follow successful traders and see their positions</p>
            </div>
            <div className="p-3 rounded-lg bg-muted/30">
              <p className="text-sm font-medium mb-1">Leaderboards</p>
              <p className="text-xs text-muted-foreground">Compete for the top spots and earn recognition</p>
            </div>
          </div>
        </section>

        {/* Safety & Security */}
        <section className="space-y-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-success/10 flex items-center justify-center">
              <Shield className="h-4 w-4 text-success" />
            </div>
            <h3 className="font-bold text-base">Safety & Security</h3>
          </div>
          <ul className="space-y-2 text-sm">
            <li className="flex items-start gap-2">
              <CheckCircle2 className="h-4 w-4 text-success mt-0.5 flex-shrink-0" />
              <span>Bank-level encryption for all transactions</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="h-4 w-4 text-success mt-0.5 flex-shrink-0" />
              <span>Two-factor authentication available</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="h-4 w-4 text-success mt-0.5 flex-shrink-0" />
              <span>Funds held in segregated accounts</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="h-4 w-4 text-success mt-0.5 flex-shrink-0" />
              <span>24/7 fraud monitoring</span>
            </li>
          </ul>
        </section>

        {/* Need Help */}
        <section className="p-4 rounded-xl border border-border bg-muted/20">
          <div className="flex items-center gap-2 mb-2">
            <HelpCircle className="h-5 w-5 text-primary" />
            <h3 className="font-bold text-base">Need Help?</h3>
          </div>
          <p className="text-sm text-muted-foreground mb-3">
            Our support team is available 24/7 to help you with any questions.
          </p>
          <div className="flex gap-2">
            <button className="flex-1 py-2 px-3 rounded-lg bg-primary/10 text-primary text-sm font-medium hover:bg-primary/20 transition-colors">
              Contact Support
            </button>
            <button className="flex-1 py-2 px-3 rounded-lg bg-muted text-foreground text-sm font-medium hover:bg-muted/80 transition-colors">
              View FAQs
            </button>
          </div>
        </section>
      </TabsContent>

      {/* CTA */}
      <div className="pt-4 border-t border-border mt-4">
        <button 
          onClick={() => onOpenChange(false)}
          className="w-full py-3 px-6 rounded-xl bg-primary text-primary-foreground font-semibold text-sm hover:bg-primary/90 transition-colors"
        >
          Start Trading
        </button>
        <p className="text-xs text-muted-foreground mt-2 text-center">No account needed to browse markets</p>
      </div>
    </Tabs>
  );

  if (isMobile) {
    return (
      <Drawer open={open} onOpenChange={onOpenChange}>
        <DrawerContent className="px-4 pb-6 max-h-[90vh]">
          <DrawerHeader className="px-0 pb-4">
            <DrawerTitle className="text-center">How It Works</DrawerTitle>
          </DrawerHeader>
          <ScrollArea className="h-[calc(90vh-100px)] -mx-4 px-4">
            {content}
          </ScrollArea>
        </DrawerContent>
      </Drawer>
    );
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg max-h-[85vh] overflow-hidden p-0">
        <DialogHeader className="px-6 pt-6 pb-0">
          <DialogTitle className="text-center">How It Works</DialogTitle>
        </DialogHeader>
        <ScrollArea className="h-[calc(85vh-100px)] px-6 pb-6">
          {content}
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
