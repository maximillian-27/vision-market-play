import { Dialog, DialogContent } from "@/components/ui/dialog";
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
  Shield,
  Clock,
  AlertTriangle,
  Sparkles,
  Scale,
  HelpCircle,
  CreditCard,
  Target,
  Gavel,
  BookOpen,
  Lightbulb,
  Ticket,
  PieChart,
  Calculator,
  Gift,
  Percent,
  ArrowLeft,
  Zap,
  Star,
  MessageSquare,
  BadgeCheck,
  PenTool,
  Bird,
  Flame,
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
        <TabsTrigger value="tickets" className="text-xs py-2 px-1">
          <Ticket className="h-3.5 w-3.5 mr-1 hidden sm:inline" />
          Tickets
        </TabsTrigger>
        <TabsTrigger value="payouts" className="text-xs py-2 px-1">
          <Calculator className="h-3.5 w-3.5 mr-1 hidden sm:inline" />
          Payouts
        </TabsTrigger>
        <TabsTrigger value="money" className="text-xs py-2 px-1">
          <Wallet className="h-3.5 w-3.5 mr-1 hidden sm:inline" />
          Money
        </TabsTrigger>
        <TabsTrigger value="more" className="text-xs py-2 px-1">
          <Lightbulb className="h-3.5 w-3.5 mr-1 hidden sm:inline" />
          More
        </TabsTrigger>
      </TabsList>

      {/* ═══════════ BASICS TAB ═══════════ */}
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
            Pollgy is a prediction market platform where you buy tickets on the outcomes of real-world events. 
            Pick a side, buy tickets at a fixed price, and if your outcome wins — you share the entire pot with other winners.
          </p>
          <div className="p-3 rounded-lg bg-primary/5 border border-primary/20">
            <p className="text-xs text-primary font-medium flex items-center gap-2">
              <Lightbulb className="h-3.5 w-3.5" />
              It's called a pari-mutuel system — the same model used in horse racing and lottery pools. Simple, fair, and transparent.
            </p>
          </div>
        </section>

        {/* How It Works - Overview */}
        <section className="space-y-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
              <Target className="h-4 w-4 text-primary" />
            </div>
            <h3 className="font-bold text-base">How It Works (Overview)</h3>
          </div>
          <div className="space-y-2">
            <div className="flex gap-3 p-3 rounded-lg bg-muted/30">
              <div className="w-6 h-6 rounded-full bg-success/20 text-success flex items-center justify-center text-xs font-bold flex-shrink-0">1</div>
              <div>
                <p className="text-sm font-medium">Pick a market</p>
                <p className="text-xs text-muted-foreground">Browse questions like "Will Bitcoin hit $100K?" or "Who will win the NBA Finals?"</p>
              </div>
            </div>
            <div className="flex gap-3 p-3 rounded-lg bg-muted/30">
              <div className="w-6 h-6 rounded-full bg-success/20 text-success flex items-center justify-center text-xs font-bold flex-shrink-0">2</div>
              <div>
                <p className="text-sm font-medium">Choose an outcome & buy tickets</p>
                <p className="text-xs text-muted-foreground">Each ticket costs $0.50. Buy as many as you want on the outcome you believe in.</p>
              </div>
            </div>
            <div className="flex gap-3 p-3 rounded-lg bg-muted/30">
              <div className="w-6 h-6 rounded-full bg-success/20 text-success flex items-center justify-center text-xs font-bold flex-shrink-0">3</div>
              <div>
                <p className="text-sm font-medium">Wait for the result</p>
                <p className="text-xs text-muted-foreground">When the event happens, the market resolves and the winning outcome is confirmed.</p>
              </div>
            </div>
            <div className="flex gap-3 p-3 rounded-lg bg-muted/30">
              <div className="w-6 h-6 rounded-full bg-success/20 text-success flex items-center justify-center text-xs font-bold flex-shrink-0">4</div>
              <div>
                <p className="text-sm font-medium">Winners split the pot</p>
                <p className="text-xs text-muted-foreground">95% of all ticket sales go to the pot. Winners share it proportionally based on their tickets.</p>
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
              <p className="text-sm font-semibold mb-1">"Will Bitcoin hit $100K by July 2026?"</p>
              <p className="text-xs text-muted-foreground">200 people buy tickets. 120 on "Yes", 80 on "No".</p>
            </div>
            <div className="grid grid-cols-3 gap-2 text-center">
              <div className="p-2.5 rounded-lg bg-muted/40">
                <p className="text-[10px] text-muted-foreground mb-0.5">Total tickets</p>
                <p className="font-bold text-sm">200</p>
              </div>
              <div className="p-2.5 rounded-lg bg-muted/40">
                <p className="text-[10px] text-muted-foreground mb-0.5">Ticket price</p>
                <p className="font-bold text-sm">$0.50</p>
              </div>
              <div className="p-2.5 rounded-lg bg-primary/10">
                <p className="text-[10px] text-muted-foreground mb-0.5">Total pot</p>
                <p className="font-bold text-sm text-primary">$100</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex-1 p-3 rounded-lg bg-success/10 border border-success/30 text-center">
                <p className="text-[10px] text-muted-foreground mb-1">If "Yes" wins</p>
                <p className="text-xs text-muted-foreground">120 winners split</p>
                <p className="font-bold text-success">$95 pot</p>
              </div>
              <ArrowRight className="h-4 w-4 text-muted-foreground flex-shrink-0" />
              <div className="flex-1 p-3 rounded-lg bg-muted text-center">
                <p className="text-[10px] text-muted-foreground mb-1">Per ticket payout</p>
                <p className="text-xs text-muted-foreground">$95 ÷ 120</p>
                <p className="font-bold text-foreground">≈ $0.79</p>
              </div>
            </div>
            <div className="p-2.5 rounded-lg bg-success/10 text-center">
              <p className="text-xs text-muted-foreground">Profit per winning ticket</p>
              <p className="font-bold text-success text-sm">+$0.29 (+58%)</p>
            </div>
          </div>
        </section>

        {/* Key Stats */}
        <section className="grid grid-cols-3 gap-2 text-center">
          <div className="p-3 rounded-xl bg-muted/30">
            <p className="text-lg font-bold">$0.50</p>
            <p className="text-[10px] text-muted-foreground">Per ticket</p>
          </div>
          <div className="p-3 rounded-xl bg-muted/30">
            <p className="text-lg font-bold">95%</p>
            <p className="text-[10px] text-muted-foreground">Goes to winners</p>
          </div>
          <div className="p-3 rounded-xl bg-muted/30">
            <p className="text-lg font-bold">Fair</p>
            <p className="text-[10px] text-muted-foreground">Proportional split</p>
          </div>
        </section>
      </TabsContent>

      {/* ═══════════ TICKETS TAB ═══════════ */}
      <TabsContent value="tickets" className="mt-0 space-y-5">
        {/* What is a Ticket */}
        <section className="space-y-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
              <Ticket className="h-4 w-4 text-primary" />
            </div>
            <h3 className="font-bold text-base">What is a Ticket?</h3>
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed">
            A ticket is your entry into a market. Each ticket costs a flat <span className="font-semibold text-foreground">$0.50</span> — no price fluctuation, no order books, no complexity. 
            You simply pick an outcome and buy tickets.
          </p>
          <div className="p-3 rounded-lg bg-primary/5 border border-primary/20">
            <p className="text-xs text-primary font-medium flex items-center gap-2">
              <Zap className="h-3.5 w-3.5" />
              Every ticket is a bundle: you get a market prediction ticket + a Weekly Draw entry. Two chances to win from one purchase!
            </p>
          </div>
        </section>

        {/* How Buying Works */}
        <section className="space-y-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-success/10 flex items-center justify-center">
              <DollarSign className="h-4 w-4 text-success" />
            </div>
            <h3 className="font-bold text-base">How Buying Works</h3>
          </div>
          <div className="space-y-2">
            <div className="flex gap-3 p-3 rounded-lg bg-muted/30">
              <div className="w-6 h-6 rounded-full bg-success/20 text-success flex items-center justify-center text-xs font-bold flex-shrink-0">1</div>
              <div>
                <p className="text-sm font-medium">Open any market</p>
                <p className="text-xs text-muted-foreground">Tap on a market card to see the question and available outcomes</p>
              </div>
            </div>
            <div className="flex gap-3 p-3 rounded-lg bg-muted/30">
              <div className="w-6 h-6 rounded-full bg-success/20 text-success flex items-center justify-center text-xs font-bold flex-shrink-0">2</div>
              <div>
                <p className="text-sm font-medium">Choose your outcome</p>
                <p className="text-xs text-muted-foreground">Select the outcome you believe will happen (e.g., "Yes" or "No")</p>
              </div>
            </div>
            <div className="flex gap-3 p-3 rounded-lg bg-muted/30">
              <div className="w-6 h-6 rounded-full bg-success/20 text-success flex items-center justify-center text-xs font-bold flex-shrink-0">3</div>
              <div>
                <p className="text-sm font-medium">Pick how many tickets</p>
                <p className="text-xs text-muted-foreground">Each ticket is $0.50. Buy 1 ticket or 1,000 — the more you buy, the bigger your share of the pot if you win.</p>
              </div>
            </div>
            <div className="flex gap-3 p-3 rounded-lg bg-muted/30">
              <div className="w-6 h-6 rounded-full bg-success/20 text-success flex items-center justify-center text-xs font-bold flex-shrink-0">4</div>
              <div>
                <p className="text-sm font-medium">Confirm your purchase</p>
                <p className="text-xs text-muted-foreground">Your tickets are locked in. Sit back and wait for the market to resolve!</p>
              </div>
            </div>
          </div>
        </section>

        {/* Where Your $0.50 Goes */}
        <section className="space-y-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-amber-500/10 flex items-center justify-center">
              <PieChart className="h-4 w-4 text-amber-500" />
            </div>
            <h3 className="font-bold text-base">Where Your $0.50 Goes</h3>
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Every ticket purchase is split into three parts:
          </p>
          <div className="space-y-2">
            <div className="p-3 rounded-lg bg-success/10 border border-success/30">
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm font-semibold text-success">Market Pot</span>
                <span className="text-sm font-bold text-success">95% ($0.475)</span>
              </div>
              <p className="text-xs text-muted-foreground">Goes into the prize pool. Winners split this entire amount.</p>
            </div>
            <div className="p-3 rounded-lg bg-primary/10 border border-primary/30">
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm font-semibold text-primary">Weekly Draw</span>
                <span className="text-sm font-bold text-primary">2% ($0.01)</span>
              </div>
              <p className="text-xs text-muted-foreground">Funds the weekly prize draw. Every ticket is also an automatic entry.</p>
            </div>
            <div className="p-3 rounded-lg bg-muted/30 border border-border/50">
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm font-semibold">Platform Fee</span>
                <span className="text-sm font-bold">3% ($0.015)</span>
              </div>
              <p className="text-xs text-muted-foreground">Keeps Pollgy running — servers, support, and development.</p>
            </div>
          </div>
          {/* Visual bar */}
          <div>
            <div className="flex rounded-full overflow-hidden h-3 shadow-inner shadow-black/10">
              <div className="h-full bg-success" style={{ width: "95%" }} />
              <div className="h-full bg-primary" style={{ width: "2%" }} />
              <div className="h-full bg-muted-foreground/30" style={{ width: "3%" }} />
            </div>
            <div className="flex items-center justify-between mt-1.5 text-[10px] text-muted-foreground">
              <span><span className="font-semibold text-success">95%</span> Pot</span>
              <span><span className="font-semibold text-primary">2%</span> Draw</span>
              <span><span className="font-semibold">3%</span> Fee</span>
            </div>
          </div>
        </section>

        {/* Multiple Outcomes */}
        <section className="space-y-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
              <Scale className="h-4 w-4 text-primary" />
            </div>
            <h3 className="font-bold text-base">Multiple Outcomes</h3>
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Markets aren't just Yes/No. Some markets have multiple outcomes — for example, "Who will win the NBA Finals?" might have 
            8 different teams to choose from. You buy tickets on the team you believe will win.
          </p>
          <div className="p-3 rounded-lg bg-muted/30">
            <p className="text-xs text-muted-foreground">
              <span className="font-medium text-foreground">Tip:</span> Markets with many outcomes tend to have bigger pots 
              and higher potential returns, since tickets are spread across more options.
            </p>
          </div>
        </section>
      </TabsContent>

      {/* ═══════════ PAYOUTS TAB ═══════════ */}
      <TabsContent value="payouts" className="mt-0 space-y-5">
        {/* The Pari-Mutuel Model */}
        <section className="space-y-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
              <Calculator className="h-4 w-4 text-primary" />
            </div>
            <h3 className="font-bold text-base">How Payouts Work</h3>
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Pollgy uses a <span className="font-semibold text-foreground">pari-mutuel</span> system. All ticket sales go into a shared pot, 
            and winners split it proportionally based on how many winning tickets they hold.
          </p>
          <div className="p-4 rounded-xl border border-primary/30 bg-primary/5">
            <p className="text-xs text-muted-foreground mb-2">The payout formula:</p>
            <div className="text-center py-2">
              <p className="text-sm font-bold text-foreground">
                Your Payout = <span className="text-primary">(Your Winning Tickets ÷ Total Winning Tickets)</span> × Final Pot
              </p>
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              The Final Pot is 95% of all ticket sales (after the 2% Weekly Draw + 3% platform fee).
            </p>
          </div>
        </section>

        {/* Worked Example */}
        <section className="space-y-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-success/10 flex items-center justify-center">
              <CheckCircle2 className="h-4 w-4 text-success" />
            </div>
            <h3 className="font-bold text-base">Worked Example</h3>
          </div>
          <div className="p-4 rounded-xl border border-border bg-muted/20 space-y-4">
            <p className="text-sm font-semibold text-center">"Will AI pass the bar exam by 2026?"</p>
            
            <div className="space-y-2">
              <div className="flex items-center justify-between p-2.5 rounded-lg bg-muted/40 text-sm">
                <span className="text-muted-foreground">Total tickets sold</span>
                <span className="font-semibold">1,000</span>
              </div>
              <div className="flex items-center justify-between p-2.5 rounded-lg bg-muted/40 text-sm">
                <span className="text-muted-foreground">Total revenue ($0.50 × 1,000)</span>
                <span className="font-semibold">$500</span>
              </div>
              <div className="flex items-center justify-between p-2.5 rounded-lg bg-success/10 text-sm">
                <span className="text-muted-foreground">Final Pot (95%)</span>
                <span className="font-bold text-success">$475</span>
              </div>
              <div className="flex items-center justify-between p-2.5 rounded-lg bg-primary/10 text-sm">
                <span className="text-muted-foreground">Weekly Draw (2%)</span>
                <span className="font-medium text-primary">$10</span>
              </div>
              <div className="flex items-center justify-between p-2.5 rounded-lg bg-muted/40 text-sm">
                <span className="text-muted-foreground">Platform Fee (3%)</span>
                <span className="font-medium">$15</span>
              </div>
            </div>

            <div className="border-t border-border pt-3 space-y-2">
              <p className="text-xs font-medium text-foreground">Ticket breakdown:</p>
              <div className="grid grid-cols-2 gap-2">
                <div className="p-2.5 rounded-lg bg-success/10 border border-success/30 text-center">
                  <p className="text-[10px] text-muted-foreground">"Yes" tickets</p>
                  <p className="font-bold text-success">600</p>
                </div>
                <div className="p-2.5 rounded-lg bg-destructive/10 border border-destructive/30 text-center">
                  <p className="text-[10px] text-muted-foreground">"No" tickets</p>
                  <p className="font-bold text-destructive">400</p>
                </div>
              </div>
            </div>

            <div className="border-t border-border pt-3 space-y-2">
              <p className="text-xs font-medium text-foreground">If "Yes" wins and you bought 10 tickets:</p>
              <div className="p-3 rounded-lg bg-success/10 border border-success/30">
                <p className="text-xs text-muted-foreground mb-1">Your payout:</p>
                <p className="text-sm font-medium">(10 ÷ 600) × $475 = <span className="font-bold text-success">$7.92</span></p>
                <p className="text-xs text-muted-foreground mt-1">You spent $5.00 → Profit: <span className="font-semibold text-success">+$2.92 (+58%)</span></p>
              </div>
            </div>

            <div className="border-t border-border pt-3 space-y-2">
              <p className="text-xs font-medium text-foreground">If "No" wins and you bought 10 "No" tickets:</p>
              <div className="p-3 rounded-lg bg-primary/10 border border-primary/30">
                <p className="text-xs text-muted-foreground mb-1">Your payout:</p>
                <p className="text-sm font-medium">(10 ÷ 400) × $475 = <span className="font-bold text-primary">$11.88</span></p>
                <p className="text-xs text-muted-foreground mt-1">You spent $5.00 → Profit: <span className="font-semibold text-primary">+$6.88 (+138%)</span></p>
              </div>
            </div>
          </div>
        </section>

        {/* Key Insight */}
        <section className="space-y-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-amber-500/10 flex items-center justify-center">
              <Lightbulb className="h-4 w-4 text-amber-500" />
            </div>
            <h3 className="font-bold text-base">Key Insight</h3>
          </div>
          <div className="space-y-2">
            <div className="p-3 rounded-lg bg-muted/30">
              <p className="text-sm font-medium mb-1">Fewer winners = bigger payout</p>
              <p className="text-xs text-muted-foreground">
                If you bet on the underdog and win, you share the pot with fewer people — meaning each of your tickets is worth more.
              </p>
            </div>
            <div className="p-3 rounded-lg bg-muted/30">
              <p className="text-sm font-medium mb-1">More tickets = bigger share</p>
              <p className="text-xs text-muted-foreground">
                The more tickets you hold on the winning side, the larger your portion of the pot. It's proportional.
              </p>
            </div>
            <div className="p-3 rounded-lg bg-muted/30">
              <p className="text-sm font-medium mb-1">You can't lose more than you spend</p>
              <p className="text-xs text-muted-foreground">
                If your outcome doesn't win, you lose the tickets you bought — nothing more. No margin calls, no hidden fees.
              </p>
            </div>
          </div>
        </section>

        {/* What if I lose */}
        <section className="p-3 rounded-lg border border-destructive/30 bg-destructive/5">
          <div className="flex items-start gap-2">
            <AlertTriangle className="h-4 w-4 text-destructive mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-sm font-medium text-destructive">What if my outcome doesn't win?</p>
              <p className="text-xs text-muted-foreground mt-1">
                If the winning outcome is different from yours, your tickets are worth $0. 
                The money you spent is part of the pot that gets distributed to the winners. 
                However, your Weekly Draw entries remain valid — you could still win the weekly prize!
              </p>
            </div>
          </div>
        </section>

        {/* ── Timing Labels ── */}
        <section className="space-y-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
              <Clock className="h-4 w-4 text-primary" />
            </div>
            <h3 className="font-bold text-base">Time-Weighted Pricing</h3>
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Pollgy uses a <span className="font-semibold text-foreground">dynamic, time-weighted</span> pari-mutuel system. 
            Ticket prices increase the closer a market gets to resolution — rewarding early conviction and making last-minute entries more expensive.
          </p>

          {/* The 3 Labels */}
          <div className="space-y-2">
            <div className="p-3 rounded-lg bg-success/10 border border-success/30 flex items-start gap-3">
              <div className="w-7 h-7 rounded-full bg-success/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                <Bird className="h-3.5 w-3.5 text-success" />
              </div>
              <div>
                <p className="text-sm font-semibold text-success">Early Bird</p>
                <p className="text-xs text-muted-foreground mt-0.5">
                  More than 1 month until resolution. Lowest ticket price — maximum potential profit. 
                  You're rewarded for placing your prediction early when the outcome is most uncertain.
                </p>
              </div>
            </div>
            <div className="p-3 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-start gap-3">
              <div className="w-7 h-7 rounded-full bg-amber-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                <Clock className="h-3.5 w-3.5 text-amber-500" />
              </div>
              <div>
                <p className="text-sm font-semibold text-amber-500">Good Timing</p>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Between 1 week and 1 month left. Moderate ticket price — still decent returns. 
                  You have more information than early birds, but you're paying a slight premium.
                </p>
              </div>
            </div>
            <div className="p-3 rounded-lg bg-destructive/10 border border-destructive/30 flex items-start gap-3">
              <div className="w-7 h-7 rounded-full bg-destructive/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                <Flame className="h-3.5 w-3.5 text-destructive" />
              </div>
              <div>
                <p className="text-sm font-semibold text-destructive">Late Entry</p>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Less than 1 week until resolution. Highest ticket price — potential profit is reduced or even negative. 
                  The outcome is nearly known, so the cost of entering is significantly higher.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Why Time-Weighted? */}
        <section className="space-y-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-amber-500/10 flex items-center justify-center">
              <HelpCircle className="h-4 w-4 text-amber-500" />
            </div>
            <h3 className="font-bold text-base">Why Does It Work This Way?</h3>
          </div>
          <div className="space-y-2">
            <div className="p-3 rounded-lg bg-muted/30">
              <p className="text-sm font-medium mb-1">1. Rewards conviction</p>
              <p className="text-xs text-muted-foreground">
                Predicting early is harder — you have less information. Early bettors take on more risk and deserve higher rewards.
              </p>
            </div>
            <div className="p-3 rounded-lg bg-muted/30">
              <p className="text-sm font-medium mb-1">2. Prevents "free money" plays</p>
              <p className="text-xs text-muted-foreground">
                Without time-weighting, someone could wait until the outcome is practically certain and scoop up cheap tickets. 
                Higher late-entry prices eliminate this exploit.
              </p>
            </div>
            <div className="p-3 rounded-lg bg-muted/30">
              <p className="text-sm font-medium mb-1">3. Creates a fairer market</p>
              <p className="text-xs text-muted-foreground">
                Time-weighting ensures the pot is distributed based on when predictions were made — not just what was predicted. 
                This makes the system more equitable for everyone.
              </p>
            </div>
          </div>
        </section>

        {/* Pricing Example */}
        <section className="space-y-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
              <Calculator className="h-4 w-4 text-primary" />
            </div>
            <h3 className="font-bold text-base">Pricing Example</h3>
          </div>
          <div className="p-4 rounded-xl border border-border bg-muted/20 space-y-3">
            <p className="text-sm font-semibold text-center">"Will Bitcoin hit $100K by Dec 2025?"</p>
            <div className="space-y-2">
              <div className="flex items-center justify-between p-2.5 rounded-lg bg-success/10 text-sm">
                <div className="flex items-center gap-2">
                  <Bird className="h-3.5 w-3.5 text-success" />
                  <span className="text-success font-medium">Early Bird</span>
                  <span className="text-[10px] text-muted-foreground">(6 months out)</span>
                </div>
                <span className="font-bold">$0.50/ticket</span>
              </div>
              <div className="flex items-center justify-between p-2.5 rounded-lg bg-amber-500/10 text-sm">
                <div className="flex items-center gap-2">
                  <Clock className="h-3.5 w-3.5 text-amber-500" />
                  <span className="text-amber-500 font-medium">Good Timing</span>
                  <span className="text-[10px] text-muted-foreground">(2 weeks out)</span>
                </div>
                <span className="font-bold">$0.75/ticket</span>
              </div>
              <div className="flex items-center justify-between p-2.5 rounded-lg bg-destructive/10 text-sm">
                <div className="flex items-center gap-2">
                  <Flame className="h-3.5 w-3.5 text-destructive" />
                  <span className="text-destructive font-medium">Late Entry</span>
                  <span className="text-[10px] text-muted-foreground">(3 days out)</span>
                </div>
                <span className="font-bold">$1.25/ticket</span>
              </div>
            </div>
            <div className="p-2.5 rounded-lg bg-primary/5 border border-primary/20">
              <p className="text-xs text-muted-foreground text-center">
                <span className="font-medium text-foreground">Same pot, same payout per winning ticket</span> — 
                but early birds paid less per ticket, so their profit margin is much higher.
              </p>
            </div>
          </div>
        </section>

        {/* Pro tip */}
        <section className="p-3 rounded-lg bg-primary/5 border border-primary/20">
          <p className="text-xs text-primary font-medium flex items-start gap-2">
            <Lightbulb className="h-3.5 w-3.5 mt-0.5 flex-shrink-0" />
            <span>
              <span className="font-bold">Pro tip:</span> Look for the timing label on every market card. 
              Green "Early Bird" markets offer the best value. Red "Late Entry" markets may show negative estimated profits — 
              meaning you'd likely lose money even if you win.
            </span>
          </p>
        </section>
      </TabsContent>

      {/* ═══════════ MONEY TAB ═══════════ */}
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
            Add funds to your account to start buying tickets. We support multiple payment methods:
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
            <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
              <Wallet className="h-4 w-4 text-primary" />
            </div>
            <h3 className="font-bold text-base">Withdrawing Funds</h3>
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Withdraw your winnings anytime. Your cash balance is always available for withdrawal.
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

        {/* Understanding Balance */}
        <section className="space-y-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-amber-500/10 flex items-center justify-center">
              <DollarSign className="h-4 w-4 text-amber-500" />
            </div>
            <h3 className="font-bold text-base">Your Balance</h3>
          </div>
          <div className="space-y-2">
            <div className="p-3 rounded-lg border border-border bg-background">
              <span className="text-sm font-semibold">Cash Balance</span>
              <p className="text-xs text-muted-foreground mt-0.5">Available funds for buying tickets or withdrawing.</p>
            </div>
            <div className="p-3 rounded-lg border border-border bg-background">
              <span className="text-sm font-semibold">Active Tickets</span>
              <p className="text-xs text-muted-foreground mt-0.5">Tickets you hold in open markets. Their final value depends on whether your outcome wins.</p>
            </div>
            <div className="p-3 rounded-lg border border-primary/30 bg-primary/5">
              <span className="text-sm font-semibold text-primary">Total Value</span>
              <p className="text-xs text-muted-foreground mt-0.5">Cash + value of pending tickets = your total account worth.</p>
            </div>
          </div>
        </section>

        {/* Fee Summary */}
        <section className="space-y-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
              <Percent className="h-4 w-4 text-primary" />
            </div>
            <h3 className="font-bold text-base">Fee Summary</h3>
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
              <span className="text-sm">Ticket purchase split</span>
              <span className="text-sm font-medium">95% / 2% / 3%</span>
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
          <div className="p-3 rounded-lg bg-primary/5 border border-primary/20">
            <p className="text-xs text-muted-foreground">
              <span className="font-medium text-foreground">No hidden fees.</span> The 95/2/3 split is applied once at purchase. 
              There are no additional trading, selling, or resolution fees.
            </p>
          </div>
        </section>
      </TabsContent>

      {/* ═══════════ MORE TAB ═══════════ */}
      <TabsContent value="more" className="mt-0 space-y-5">
        {/* Weekly Draw */}
        <section className="space-y-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
              <Trophy className="h-4 w-4 text-primary" />
            </div>
            <h3 className="font-bold text-base">The Weekly Draw</h3>
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed">
            2% of every ticket purchase goes into a weekly prize pool. Every ticket you buy is also an 
            automatic entry into the draw — no separate purchase needed.
          </p>
          <div className="space-y-2">
            <div className="flex gap-3 p-3 rounded-lg bg-muted/30">
              <Gift className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-sm font-medium">Every Sunday</p>
                <p className="text-xs text-muted-foreground">10 random winners are selected from all entries that week</p>
              </div>
            </div>
            <div className="flex gap-3 p-3 rounded-lg bg-muted/30">
              <Star className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-sm font-medium">Prize Distribution</p>
                <p className="text-xs text-muted-foreground">1st: 50% · 2nd: 25% · 3rd: 15% · 4th–10th: 10% shared</p>
              </div>
            </div>
          </div>
          <div className="p-3 rounded-lg bg-primary/5 border border-primary/20">
            <p className="text-xs text-primary font-medium flex items-center gap-2">
              <Zap className="h-3.5 w-3.5" />
              Even if you lose your market prediction, your draw entries are still valid. You can still win!
            </p>
          </div>
        </section>

        {/* Market Resolution */}
        <section className="space-y-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-success/10 flex items-center justify-center">
              <Gavel className="h-4 w-4 text-success" />
            </div>
            <h3 className="font-bold text-base">Market Resolution</h3>
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed">
            When a market's end date passes and the outcome is known, the market is resolved:
          </p>
          <div className="space-y-2">
            <div className="p-3 rounded-lg bg-muted/30">
              <p className="text-sm font-medium mb-1">1. Event occurs</p>
              <p className="text-xs text-muted-foreground">The real-world outcome happens</p>
            </div>
            <div className="p-3 rounded-lg bg-muted/30">
              <p className="text-sm font-medium mb-1">2. Creator resolves</p>
              <p className="text-xs text-muted-foreground">The market creator confirms the winning outcome within 48 hours</p>
            </div>
            <div className="p-3 rounded-lg bg-muted/30">
              <p className="text-sm font-medium mb-1">3. Dispute window (24h)</p>
              <p className="text-xs text-muted-foreground">Users can challenge the resolution if they believe it's incorrect</p>
            </div>
            <div className="p-3 rounded-lg bg-muted/30">
              <p className="text-sm font-medium mb-1">4. Payout</p>
              <p className="text-xs text-muted-foreground">Winnings are automatically credited to winner's cash balance</p>
            </div>
          </div>
        </section>

        {/* Creators */}
        <section className="space-y-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
              <PenTool className="h-4 w-4 text-primary" />
            </div>
            <h3 className="font-bold text-base">Creators</h3>
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Verified users can create and manage prediction markets on Pollgy. Creators design the questions, 
            set resolution criteria, and are responsible for resolving markets fairly.
          </p>
          <div className="space-y-2">
            <div className="flex gap-3 p-3 rounded-lg bg-muted/30">
              <BadgeCheck className="h-4 w-4 text-success mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-sm font-medium">How to become a creator</p>
                <p className="text-xs text-muted-foreground">Apply through your profile. Our team reviews applications within 24 hours.</p>
              </div>
            </div>
            <div className="flex gap-3 p-3 rounded-lg bg-muted/30">
              <Scale className="h-4 w-4 text-amber-500 mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-sm font-medium">Creator responsibilities</p>
                <p className="text-xs text-muted-foreground">Resolve markets fairly within 48 hours. Respond to user questions. Maintain quality.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Market Cancellation */}
        <section className="p-3 rounded-lg border border-amber-500/30 bg-amber-500/5">
          <div className="flex items-start gap-2">
            <AlertTriangle className="h-4 w-4 text-amber-500 mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-sm font-medium text-amber-600 dark:text-amber-400">Market Cancellation</p>
              <p className="text-xs text-muted-foreground mt-1">
                In rare cases, a market may be canceled if the outcome becomes unknowable. 
                When this happens, your original ticket purchase is refunded to your cash balance. 
                However, the platform fee (3%) and Weekly Draw contribution (2%) are <span className="font-medium text-foreground">non-refundable</span>.
              </p>
            </div>
          </div>
        </section>

        {/* Community */}
        <section className="space-y-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
              <MessageSquare className="h-4 w-4 text-primary" />
            </div>
            <h3 className="font-bold text-base">Community</h3>
          </div>
          <div className="space-y-2">
            <div className="p-3 rounded-lg bg-muted/30">
              <p className="text-sm font-medium mb-1">Comments</p>
              <p className="text-xs text-muted-foreground">Discuss markets, share analysis, and debate with other participants</p>
            </div>
            <div className="p-3 rounded-lg bg-muted/30">
              <p className="text-sm font-medium mb-1">Follow Users</p>
              <p className="text-xs text-muted-foreground">Follow successful predictors and see their activity</p>
            </div>
            <div className="p-3 rounded-lg bg-muted/30">
              <p className="text-sm font-medium mb-1">Leaderboards</p>
              <p className="text-xs text-muted-foreground">Compete for the top spots and earn recognition</p>
            </div>
          </div>
        </section>

        {/* Safety */}
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
              <span>All draws are verifiable and transparent</span>
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
          Start Predicting
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
      <DialogContent hideClose className="sm:max-w-lg max-h-[85vh] overflow-hidden p-0">
        <div className="flex items-center gap-3 px-6 py-4 border-b border-border/40">
          <button
            onClick={() => onOpenChange(false)}
            className="h-8 w-8 rounded-full flex items-center justify-center hover:bg-muted transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
          </button>
          <h2 className="text-base font-semibold">How It Works</h2>
        </div>
        <ScrollArea className="h-[calc(85vh-100px)] px-6 pb-6">
          {content}
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
