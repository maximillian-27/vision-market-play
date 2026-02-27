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
  CheckCircle2,
  Wallet,
  Shield,
  Clock,
  AlertTriangle,
  Sparkles,
  Scale,
  HelpCircle,
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
  BadgeCheck,
  PenTool,
  Bird,
  Flame,
  CreditCard,
  Lock,
  Eye,
  HandCoins,
} from "lucide-react";

interface HowItWorksDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function HowItWorksDialog({ open, onOpenChange }: HowItWorksDialogProps) {
  const isMobile = useIsMobile();

  const content = (
    <Tabs defaultValue="basics" className="w-full">
      <div className="overflow-x-auto -mx-1 px-1 pb-1">
        <TabsList className="w-max min-w-full grid grid-cols-7 mb-4 h-auto p-1">
          <TabsTrigger value="basics" className="text-[11px] py-2 px-2 whitespace-nowrap">
            <BookOpen className="h-3.5 w-3.5 mr-1 hidden sm:inline" />
            Basics
          </TabsTrigger>
          <TabsTrigger value="tickets" className="text-[11px] py-2 px-2 whitespace-nowrap">
            <Ticket className="h-3.5 w-3.5 mr-1 hidden sm:inline" />
            Tickets
          </TabsTrigger>
          <TabsTrigger value="payouts" className="text-[11px] py-2 px-2 whitespace-nowrap">
            <Calculator className="h-3.5 w-3.5 mr-1 hidden sm:inline" />
            Payouts
          </TabsTrigger>
          <TabsTrigger value="draw" className="text-[11px] py-2 px-2 whitespace-nowrap">
            <Trophy className="h-3.5 w-3.5 mr-1 hidden sm:inline" />
            Draw
          </TabsTrigger>
          <TabsTrigger value="creators" className="text-[11px] py-2 px-2 whitespace-nowrap">
            <PenTool className="h-3.5 w-3.5 mr-1 hidden sm:inline" />
            Creators
          </TabsTrigger>
          <TabsTrigger value="money" className="text-[11px] py-2 px-2 whitespace-nowrap">
            <Wallet className="h-3.5 w-3.5 mr-1 hidden sm:inline" />
            Money
          </TabsTrigger>
          <TabsTrigger value="trust" className="text-[11px] py-2 px-2 whitespace-nowrap">
            <Shield className="h-3.5 w-3.5 mr-1 hidden sm:inline" />
            Trust
          </TabsTrigger>
        </TabsList>
      </div>

      {/* ═══════════ BASICS TAB ═══════════ */}
      <TabsContent value="basics" className="mt-0 space-y-5">
        {/* Hero / Hook */}
        <section className="text-center space-y-2 py-2">
          <h3 className="text-lg font-bold">Predict. Win. It's that simple.</h3>
          <p className="text-sm text-muted-foreground leading-relaxed max-w-sm mx-auto">
            Buy tickets on real-world events. If you're right, <span className="font-semibold text-foreground">you split the entire pot</span> with other winners.
          </p>
        </section>

        {/* Big numbers */}
        <section className="grid grid-cols-3 gap-2 text-center">
          <div className="p-3 rounded-xl bg-success/10 border border-success/20">
            <p className="text-xl font-extrabold text-success">$0.50</p>
            <p className="text-[10px] text-muted-foreground font-medium">Per ticket</p>
          </div>
          <div className="p-3 rounded-xl bg-primary/10 border border-primary/20">
            <p className="text-xl font-extrabold text-primary">95%</p>
            <p className="text-[10px] text-muted-foreground font-medium">Goes to winners</p>
          </div>
          <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20">
            <p className="text-xl font-extrabold text-amber-500">2x</p>
            <p className="text-[10px] text-muted-foreground font-medium">Chances to win</p>
          </div>
        </section>

        {/* What is Pollgy */}
        <section className="space-y-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
              <TrendingUp className="h-4 w-4 text-primary" />
            </div>
            <h3 className="font-bold text-base">What is Pollgy?</h3>
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Pollgy is a <span className="font-semibold text-foreground">prediction market</span> — think of it like a pool bet with friends, but on anything happening in the world: sports, crypto, politics, tech, entertainment.
          </p>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Everyone buys <span className="font-semibold text-foreground">$0.50 tickets</span> on the outcome they believe in. When the event happens, winners split the pot. The fewer winners there are, the more each person takes home.
          </p>
        </section>

        {/* 4-step flow */}
        <section className="space-y-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
              <Target className="h-4 w-4 text-primary" />
            </div>
            <h3 className="font-bold text-base">4 Simple Steps</h3>
          </div>
          <div className="space-y-2">
            <div className="flex gap-3 p-3 rounded-lg bg-muted/30">
              <div className="w-7 h-7 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-bold flex-shrink-0">1</div>
              <div>
                <p className="text-sm font-semibold">Pick a market</p>
                <p className="text-xs text-muted-foreground">"Will Bitcoin hit $100K?" · "Who wins the Super Bowl?" · "Will Apple launch a foldable iPhone?"</p>
              </div>
            </div>
            <div className="flex gap-3 p-3 rounded-lg bg-muted/30">
              <div className="w-7 h-7 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-bold flex-shrink-0">2</div>
              <div>
                <p className="text-sm font-semibold">Choose your side & buy tickets</p>
                <p className="text-xs text-muted-foreground">Each ticket is just <span className="font-semibold text-foreground">$0.50</span>. Buy 1 or 1,000 — you decide how much to commit.</p>
              </div>
            </div>
            <div className="flex gap-3 p-3 rounded-lg bg-muted/30">
              <div className="w-7 h-7 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-bold flex-shrink-0">3</div>
              <div>
                <p className="text-sm font-semibold">Wait for the result</p>
                <p className="text-xs text-muted-foreground">The real-world event happens. The market resolves and the winning side is confirmed.</p>
              </div>
            </div>
            <div className="flex gap-3 p-3 rounded-lg bg-muted/30">
              <div className="w-7 h-7 rounded-full bg-success text-white flex items-center justify-center text-xs font-bold flex-shrink-0">4</div>
              <div>
                <p className="text-sm font-semibold text-success">Winners split the pot 💰</p>
                <p className="text-xs text-muted-foreground"><span className="font-semibold text-foreground">95% of all ticket sales</span> go into the pot. Your share depends on how many winning tickets you hold.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Live Example */}
        <section className="space-y-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-amber-500/10 flex items-center justify-center">
              <Lightbulb className="h-4 w-4 text-amber-500" />
            </div>
            <h3 className="font-bold text-base">See It In Action</h3>
          </div>
          <div className="p-4 rounded-xl border border-border bg-muted/20 space-y-4">
            <div className="text-center pb-2 border-b border-border">
              <p className="text-sm font-bold">"Will Bitcoin hit $100K by July 2026?"</p>
              <p className="text-xs text-muted-foreground mt-1">500 people buy tickets</p>
            </div>
            
            <div className="grid grid-cols-2 gap-2">
              <div className="p-3 rounded-lg bg-success/10 border border-success/20 text-center">
                <p className="text-[10px] text-muted-foreground font-medium">YES side</p>
                <p className="text-lg font-extrabold text-success">300</p>
                <p className="text-[10px] text-muted-foreground">tickets</p>
              </div>
              <div className="p-3 rounded-lg bg-destructive/10 border border-destructive/20 text-center">
                <p className="text-[10px] text-muted-foreground font-medium">NO side</p>
                <p className="text-lg font-extrabold text-destructive">200</p>
                <p className="text-[10px] text-muted-foreground">tickets</p>
              </div>
            </div>

            <div className="p-3 rounded-lg bg-primary/10 border border-primary/20 text-center">
              <p className="text-[10px] text-muted-foreground font-medium">TOTAL POT (95% of $250)</p>
              <p className="text-2xl font-extrabold text-primary">$237.50</p>
            </div>

            <div className="space-y-2">
              <p className="text-xs font-semibold text-foreground text-center">🎉 Bitcoin hits $100K — YES wins!</p>
              <div className="p-3 rounded-lg bg-success/10 border border-success/30">
                <p className="text-xs text-muted-foreground">You bought <span className="font-bold text-foreground">20 YES tickets</span> for <span className="font-bold text-foreground">$10</span></p>
                <div className="flex items-center justify-between mt-2">
                  <div>
                    <p className="text-[10px] text-muted-foreground">Your payout</p>
                    <p className="text-base font-extrabold text-success">(20 ÷ 300) × $237.50 = $15.83</p>
                  </div>
                </div>
                <div className="mt-2 pt-2 border-t border-success/20 flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">Your profit</span>
                  <span className="text-sm font-extrabold text-success">+$5.83 (+58%)</span>
                </div>
              </div>
            </div>

            <div className="p-2.5 rounded-lg bg-amber-500/10 border border-amber-500/20 text-center">
              <p className="text-xs text-muted-foreground">
                <span className="font-semibold text-amber-600 dark:text-amber-400">Underdog tip:</span> If you bought <span className="font-bold text-foreground">20 NO tickets</span> and NO won, your payout would be <span className="font-bold text-foreground">$23.75</span> — a <span className="font-bold text-success">+138% return!</span>
              </p>
            </div>
          </div>
        </section>

        {/* Bonus highlight */}
        <section className="p-4 rounded-xl bg-gradient-to-br from-primary/10 to-amber-500/10 border border-primary/20">
          <div className="flex items-center gap-2 mb-2">
            <Gift className="h-5 w-5 text-primary" />
            <p className="text-sm font-bold">🎟️ Bonus: Every Ticket = A Weekly Draw Entry</p>
          </div>
          <p className="text-xs text-muted-foreground leading-relaxed">
            Every ticket you buy <span className="font-semibold text-foreground">automatically enters you</span> into our <span className="font-semibold text-primary">Weekly Draw</span>. 
            Even if your market prediction doesn't win, you could still win cash prizes every Sunday. 
            <span className="font-semibold text-foreground">Two chances to win from every purchase!</span>
          </p>
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
            A ticket is your entry into a market. Each ticket costs a flat <span className="font-bold text-primary text-base">$0.50</span> — no price fluctuation, no order books, no complexity. 
            Pick an outcome and buy tickets. That's it.
          </p>
          <div className="p-3 rounded-lg bg-primary/5 border border-primary/20">
            <p className="text-xs text-primary font-medium flex items-center gap-2">
              <Zap className="h-3.5 w-3.5" />
              Every ticket is a bundle: market prediction + Weekly Draw entry. Two chances to win!
            </p>
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
          <div className="space-y-2">
            <div className="p-3.5 rounded-lg bg-success/10 border border-success/30">
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm font-bold text-success flex items-center gap-1.5"><Trophy className="h-3.5 w-3.5" /> Winner's Pot</span>
                <span className="text-lg font-extrabold text-success">95%</span>
              </div>
              <p className="text-xs text-muted-foreground">$0.475 per ticket goes straight to the prize pool. <span className="font-semibold text-foreground">Winners split this entire amount.</span></p>
            </div>
            <div className="p-3.5 rounded-lg bg-primary/10 border border-primary/30">
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm font-bold text-primary flex items-center gap-1.5"><Gift className="h-3.5 w-3.5" /> Weekly Draw</span>
                <span className="text-lg font-extrabold text-primary">2%</span>
              </div>
              <p className="text-xs text-muted-foreground">$0.01 funds the weekly prize draw. <span className="font-semibold text-foreground">Your ticket is also your lottery entry!</span></p>
            </div>
            <div className="p-3 rounded-lg bg-muted/30 border border-border/50">
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm font-semibold">Platform Fee</span>
                <span className="text-sm font-bold">3%</span>
              </div>
              <p className="text-xs text-muted-foreground">$0.015 keeps Pollgy running — servers, support, and development.</p>
            </div>
          </div>
          {/* Visual bar */}
          <div>
            <div className="flex rounded-full overflow-hidden h-4 shadow-inner shadow-black/10">
              <div className="h-full bg-success flex items-center justify-center" style={{ width: "95%" }}>
                <span className="text-[9px] font-bold text-white">95% POT</span>
              </div>
              <div className="h-full bg-primary" style={{ width: "2%" }} />
              <div className="h-full bg-muted-foreground/30" style={{ width: "3%" }} />
            </div>
            <div className="flex items-center justify-between mt-1.5 text-[10px] text-muted-foreground">
              <span><span className="font-bold text-success">95%</span> Winners</span>
              <span><span className="font-bold text-primary">2%</span> Draw</span>
              <span><span className="font-semibold">3%</span> Fee</span>
            </div>
          </div>
        </section>

        {/* How Buying Works */}
        <section className="space-y-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-success/10 flex items-center justify-center">
              <DollarSign className="h-4 w-4 text-success" />
            </div>
            <h3 className="font-bold text-base">Buying in 30 Seconds</h3>
          </div>
          <div className="space-y-2">
            <div className="flex gap-3 p-3 rounded-lg bg-muted/30">
              <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-bold flex-shrink-0">1</div>
              <div>
                <p className="text-sm font-medium">Tap any market</p>
                <p className="text-xs text-muted-foreground">See the question, outcomes, and current pot size</p>
              </div>
            </div>
            <div className="flex gap-3 p-3 rounded-lg bg-muted/30">
              <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-bold flex-shrink-0">2</div>
              <div>
                <p className="text-sm font-medium">Pick your outcome</p>
                <p className="text-xs text-muted-foreground">Select "Yes", "No", or whichever option you believe in</p>
              </div>
            </div>
            <div className="flex gap-3 p-3 rounded-lg bg-muted/30">
              <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-bold flex-shrink-0">3</div>
              <div>
                <p className="text-sm font-medium">Choose how many tickets</p>
                <p className="text-xs text-muted-foreground">More tickets = bigger share of the pot if you win</p>
              </div>
            </div>
            <div className="flex gap-3 p-3 rounded-lg bg-success/10 border border-success/20">
              <div className="w-6 h-6 rounded-full bg-success text-white flex items-center justify-center text-xs font-bold flex-shrink-0">✓</div>
              <div>
                <p className="text-sm font-semibold text-success">Done!</p>
                <p className="text-xs text-muted-foreground">Your tickets are locked in + you're entered in the Weekly Draw</p>
              </div>
            </div>
          </div>
        </section>

        {/* Multiple Outcomes */}
        <section className="space-y-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
              <Scale className="h-4 w-4 text-primary" />
            </div>
            <h3 className="font-bold text-base">Not Just Yes/No</h3>
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Some markets have <span className="font-semibold text-foreground">multiple outcomes</span> — like "Who will win the NBA Finals?" with 8+ teams to choose from.
          </p>
          <div className="p-3 rounded-lg bg-amber-500/5 border border-amber-500/20">
            <p className="text-xs text-muted-foreground">
              <span className="font-semibold text-amber-600 dark:text-amber-400">💡 Pro tip:</span> Markets with many outcomes = bigger pots and <span className="font-semibold text-foreground">higher potential returns</span>, because tickets are spread thinner.
            </p>
          </div>
        </section>

        {/* Time-Weighted Pricing */}
        <section className="space-y-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
              <Clock className="h-4 w-4 text-primary" />
            </div>
            <h3 className="font-bold text-base">Early = Cheaper Tickets</h3>
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Ticket prices <span className="font-semibold text-foreground">increase as the event approaches</span>. Buying early means cheaper tickets and higher potential profit.
          </p>
          <div className="space-y-2">
            <div className="p-3 rounded-lg bg-success/10 border border-success/30 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Bird className="h-4 w-4 text-success" />
                <div>
                  <p className="text-sm font-semibold text-success">Early Bird</p>
                  <p className="text-[10px] text-muted-foreground">1+ month out</p>
                </div>
              </div>
              <span className="font-bold text-success">$0.50</span>
            </div>
            <div className="p-3 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-amber-500" />
                <div>
                  <p className="text-sm font-semibold text-amber-500">Good Timing</p>
                  <p className="text-[10px] text-muted-foreground">1 week – 1 month</p>
                </div>
              </div>
              <span className="font-bold text-amber-500">$0.75</span>
            </div>
            <div className="p-3 rounded-lg bg-destructive/10 border border-destructive/30 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Flame className="h-4 w-4 text-destructive" />
                <div>
                  <p className="text-sm font-semibold text-destructive">Late Entry</p>
                  <p className="text-[10px] text-muted-foreground">&lt;1 week out</p>
                </div>
              </div>
              <span className="font-bold text-destructive">$1.25</span>
            </div>
          </div>
          <div className="p-3 rounded-lg bg-success/5 border border-success/20">
            <p className="text-xs text-muted-foreground">
              <span className="font-semibold text-success">🐦 Bottom line:</span> The earlier you predict, the more you can earn. Look for green <span className="font-semibold text-foreground">"Early Bird"</span> badges on market cards for the best value.
            </p>
          </div>
        </section>
      </TabsContent>

      {/* ═══════════ PAYOUTS TAB ═══════════ */}
      <TabsContent value="payouts" className="mt-0 space-y-5">
        {/* How Payouts Work */}
        <section className="space-y-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
              <Calculator className="h-4 w-4 text-primary" />
            </div>
            <h3 className="font-bold text-base">How Payouts Work</h3>
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Pollgy uses a <span className="font-semibold text-foreground">pari-mutuel system</span> (same as horse racing). All ticket money goes into one pot, and winners split it based on their share.
          </p>
          <div className="p-4 rounded-xl border border-primary/30 bg-primary/5 text-center">
            <p className="text-[10px] text-muted-foreground mb-1">THE FORMULA</p>
            <p className="text-sm font-bold text-foreground">
              Your Payout = <span className="text-primary">(Your Tickets ÷ Total Winning Tickets)</span> × Pot
            </p>
            <p className="text-xs text-muted-foreground mt-2">
              The pot is <span className="font-bold text-success">95%</span> of all ticket sales.
            </p>
          </div>
        </section>

        {/* Detailed Example */}
        <section className="space-y-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-success/10 flex items-center justify-center">
              <CheckCircle2 className="h-4 w-4 text-success" />
            </div>
            <h3 className="font-bold text-base">Full Example</h3>
          </div>
          <div className="p-4 rounded-xl border border-border bg-muted/20 space-y-4">
            <p className="text-sm font-bold text-center">"Will AI pass the bar exam by 2026?"</p>
            
            <div className="space-y-1.5">
              <div className="flex items-center justify-between p-2.5 rounded-lg bg-muted/40 text-sm">
                <span className="text-muted-foreground">Total tickets sold</span>
                <span className="font-bold">1,000</span>
              </div>
              <div className="flex items-center justify-between p-2.5 rounded-lg bg-muted/40 text-sm">
                <span className="text-muted-foreground">Total revenue</span>
                <span className="font-bold">$500</span>
              </div>
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center justify-between p-2.5 rounded-lg bg-success/10 border border-success/20 text-sm">
                <span className="text-success font-medium flex items-center gap-1"><Trophy className="h-3 w-3" /> Winner's Pot (95%)</span>
                <span className="font-extrabold text-success text-base">$475</span>
              </div>
              <div className="flex items-center justify-between p-2.5 rounded-lg bg-primary/10 border border-primary/20 text-sm">
                <span className="text-primary font-medium flex items-center gap-1"><Gift className="h-3 w-3" /> Weekly Draw (2%)</span>
                <span className="font-bold text-primary">$10</span>
              </div>
              <div className="flex items-center justify-between p-2.5 rounded-lg bg-muted/40 text-sm">
                <span className="text-muted-foreground">Platform Fee (3%)</span>
                <span className="font-medium">$15</span>
              </div>
            </div>

            <div className="border-t border-border pt-3">
              <p className="text-xs font-semibold text-foreground mb-2">Ticket breakdown:</p>
              <div className="grid grid-cols-2 gap-2">
                <div className="p-2.5 rounded-lg bg-success/10 border border-success/30 text-center">
                  <p className="text-[10px] text-muted-foreground">"Yes" tickets</p>
                  <p className="font-extrabold text-success text-lg">600</p>
                </div>
                <div className="p-2.5 rounded-lg bg-destructive/10 border border-destructive/30 text-center">
                  <p className="text-[10px] text-muted-foreground">"No" tickets</p>
                  <p className="font-extrabold text-destructive text-lg">400</p>
                </div>
              </div>
            </div>

            {/* Scenario: Yes wins */}
            <div className="border-t border-border pt-3 space-y-2">
              <p className="text-xs font-bold text-foreground">🎯 Scenario: You bought 10 "Yes" tickets ($5.00)</p>
              <div className="p-3 rounded-lg bg-success/10 border border-success/30">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">If "Yes" wins:</span>
                  <span className="font-bold">(10 ÷ 600) × $475</span>
                </div>
                <div className="flex items-center justify-between mt-2 pt-2 border-t border-success/20">
                  <span className="text-sm font-medium">You receive</span>
                  <span className="text-base font-extrabold text-success">$7.92</span>
                </div>
                <div className="flex items-center justify-between mt-1">
                  <span className="text-xs text-muted-foreground">Profit</span>
                  <span className="text-sm font-extrabold text-success">+$2.92 (+58%)</span>
                </div>
              </div>
            </div>

            {/* Scenario: Underdog */}
            <div className="border-t border-border pt-3 space-y-2">
              <p className="text-xs font-bold text-foreground">🎲 Underdog scenario: You bought 10 "No" tickets ($5.00)</p>
              <div className="p-3 rounded-lg bg-primary/10 border border-primary/30">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">If "No" wins:</span>
                  <span className="font-bold">(10 ÷ 400) × $475</span>
                </div>
                <div className="flex items-center justify-between mt-2 pt-2 border-t border-primary/20">
                  <span className="text-sm font-medium">You receive</span>
                  <span className="text-base font-extrabold text-primary">$11.88</span>
                </div>
                <div className="flex items-center justify-between mt-1">
                  <span className="text-xs text-muted-foreground">Profit</span>
                  <span className="text-sm font-extrabold text-success">+$6.88 (+138%)</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Key Insights */}
        <section className="space-y-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-amber-500/10 flex items-center justify-center">
              <Lightbulb className="h-4 w-4 text-amber-500" />
            </div>
            <h3 className="font-bold text-base">Key Insights</h3>
          </div>
          <div className="space-y-2">
            <div className="p-3 rounded-lg bg-success/5 border border-success/20">
              <p className="text-sm font-semibold mb-0.5">📈 Fewer winners = bigger payout</p>
              <p className="text-xs text-muted-foreground">Bet on the underdog? If you're right, you share the pot with fewer people.</p>
            </div>
            <div className="p-3 rounded-lg bg-primary/5 border border-primary/20">
              <p className="text-sm font-semibold mb-0.5">🎟️ More tickets = bigger share</p>
              <p className="text-xs text-muted-foreground">The more tickets you hold on the winning side, the larger your portion of the pot.</p>
            </div>
            <div className="p-3 rounded-lg bg-muted/30 border border-border">
              <p className="text-sm font-semibold mb-0.5">🛡️ You can't lose more than you spend</p>
              <p className="text-xs text-muted-foreground">If your outcome doesn't win, you lose only the tickets you bought. No margin calls, no hidden fees.</p>
            </div>
          </div>
        </section>

        {/* What if I lose */}
        <section className="p-3 rounded-lg border border-destructive/30 bg-destructive/5">
          <div className="flex items-start gap-2">
            <AlertTriangle className="h-4 w-4 text-destructive mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-sm font-semibold text-destructive">What if my side doesn't win?</p>
              <p className="text-xs text-muted-foreground mt-1">
                Your market tickets are worth $0 — but <span className="font-semibold text-foreground">your Weekly Draw entries are still valid</span>. 
                You could still win cash from the Sunday draw!
              </p>
            </div>
          </div>
        </section>
      </TabsContent>

      {/* ═══════════ DRAW TAB ═══════════ */}
      <TabsContent value="draw" className="mt-0 space-y-5">
        {/* Weekly Draw Hero */}
        <section className="text-center space-y-3 py-2">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary/20 to-amber-500/20 border border-primary/20 flex items-center justify-center mx-auto">
            <Trophy className="h-7 w-7 text-primary" />
          </div>
          <h3 className="text-lg font-bold">The Weekly Draw 🎉</h3>
          <p className="text-sm text-muted-foreground max-w-xs mx-auto">
            Every ticket you buy is <span className="font-bold text-foreground">automatically entered</span> into our weekly cash prize draw. No extra cost.
          </p>
        </section>

        {/* How it works */}
        <section className="space-y-3">
          <h4 className="font-bold text-sm flex items-center gap-2">
            <Gift className="h-4 w-4 text-primary" /> How It Works
          </h4>
          <div className="space-y-2">
            <div className="flex gap-3 p-3 rounded-lg bg-muted/30">
              <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-bold flex-shrink-0">1</div>
              <div>
                <p className="text-sm font-medium">Buy tickets on any market</p>
                <p className="text-xs text-muted-foreground"><span className="font-semibold text-primary">2%</span> of each ticket purchase goes into the weekly prize pool</p>
              </div>
            </div>
            <div className="flex gap-3 p-3 rounded-lg bg-muted/30">
              <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-bold flex-shrink-0">2</div>
              <div>
                <p className="text-sm font-medium">Each ticket = 1 draw entry</p>
                <p className="text-xs text-muted-foreground">Buy 50 tickets across different markets? That's 50 entries!</p>
              </div>
            </div>
            <div className="flex gap-3 p-3 rounded-lg bg-success/10 border border-success/20">
              <div className="w-6 h-6 rounded-full bg-success text-white flex items-center justify-center text-xs font-bold flex-shrink-0">3</div>
              <div>
                <p className="text-sm font-semibold text-success">Every Sunday — 10 winners are drawn!</p>
                <p className="text-xs text-muted-foreground">Random selection from all entries that week</p>
              </div>
            </div>
          </div>
        </section>

        {/* Prize Distribution */}
        <section className="space-y-3">
          <h4 className="font-bold text-sm flex items-center gap-2">
            <Star className="h-4 w-4 text-amber-500" /> Prize Distribution
          </h4>
          <div className="space-y-1.5">
            <div className="p-3 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-lg">🥇</span>
                <span className="text-sm font-bold">1st Place</span>
              </div>
              <span className="text-lg font-extrabold text-amber-500">50%</span>
            </div>
            <div className="p-3 rounded-lg bg-muted/40 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-lg">🥈</span>
                <span className="text-sm font-bold">2nd Place</span>
              </div>
              <span className="text-base font-bold">25%</span>
            </div>
            <div className="p-3 rounded-lg bg-muted/40 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-lg">🥉</span>
                <span className="text-sm font-bold">3rd Place</span>
              </div>
              <span className="text-base font-bold">15%</span>
            </div>
            <div className="p-2.5 rounded-lg bg-muted/30 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-base">🎖️</span>
                <span className="text-sm font-medium text-muted-foreground">4th – 10th Place</span>
              </div>
              <span className="text-sm font-semibold">10% shared</span>
            </div>
          </div>
        </section>

        {/* Example */}
        <section className="p-4 rounded-xl border border-primary/20 bg-primary/5 space-y-3">
          <p className="text-xs font-bold text-foreground">📊 Example: Weekly Draw Pool = $500</p>
          <div className="grid grid-cols-2 gap-2 text-center">
            <div className="p-2.5 rounded-lg bg-background/50">
              <p className="text-[10px] text-muted-foreground">🥇 1st Place</p>
              <p className="font-extrabold text-primary text-lg">$250</p>
            </div>
            <div className="p-2.5 rounded-lg bg-background/50">
              <p className="text-[10px] text-muted-foreground">🥈 2nd Place</p>
              <p className="font-bold text-base">$125</p>
            </div>
            <div className="p-2.5 rounded-lg bg-background/50">
              <p className="text-[10px] text-muted-foreground">🥉 3rd Place</p>
              <p className="font-bold text-base">$75</p>
            </div>
            <div className="p-2.5 rounded-lg bg-background/50">
              <p className="text-[10px] text-muted-foreground">🎖️ 4th–10th</p>
              <p className="font-bold text-base">$7.14 each</p>
            </div>
          </div>
        </section>

        {/* Key callout */}
        <section className="p-4 rounded-xl bg-gradient-to-br from-success/10 to-primary/10 border border-success/20">
          <p className="text-sm font-bold mb-1.5">🔥 Why This Matters</p>
          <div className="space-y-2">
            <p className="text-xs text-muted-foreground leading-relaxed">
              <span className="font-semibold text-foreground">Lost your market prediction?</span> No worries — your draw entries are still valid. You could still win cash on Sunday.
            </p>
            <p className="text-xs text-muted-foreground leading-relaxed">
              <span className="font-semibold text-foreground">Won your market prediction?</span> Even better — you get your market winnings AND you're still in the draw.
            </p>
            <p className="text-xs font-bold text-foreground mt-2">
              Every ticket gives you two chances to win. Always.
            </p>
          </div>
        </section>
      </TabsContent>

      {/* ═══════════ CREATORS TAB ═══════════ */}
      <TabsContent value="creators" className="mt-0 space-y-5">
        {/* What are Creators */}
        <section className="text-center space-y-2 py-2">
          <div className="w-14 h-14 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center mx-auto">
            <PenTool className="h-7 w-7 text-primary" />
          </div>
          <h3 className="text-lg font-bold">Market Creators</h3>
          <p className="text-sm text-muted-foreground max-w-xs mx-auto">
            Verified users who design prediction markets and ensure they're resolved fairly.
          </p>
        </section>

        {/* What Creators Do */}
        <section className="space-y-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
              <Sparkles className="h-4 w-4 text-primary" />
            </div>
            <h3 className="font-bold text-base">What Creators Do</h3>
          </div>
          <div className="space-y-2">
            <div className="flex gap-3 p-3 rounded-lg bg-muted/30">
              <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-bold flex-shrink-0">1</div>
              <div>
                <p className="text-sm font-medium">Design the market question</p>
                <p className="text-xs text-muted-foreground">Craft clear, unambiguous questions with verifiable outcomes</p>
              </div>
            </div>
            <div className="flex gap-3 p-3 rounded-lg bg-muted/30">
              <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-bold flex-shrink-0">2</div>
              <div>
                <p className="text-sm font-medium">Set resolution criteria</p>
                <p className="text-xs text-muted-foreground">Define exactly what needs to happen for each outcome to win</p>
              </div>
            </div>
            <div className="flex gap-3 p-3 rounded-lg bg-muted/30">
              <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-bold flex-shrink-0">3</div>
              <div>
                <p className="text-sm font-medium">Resolve the market</p>
                <p className="text-xs text-muted-foreground">Confirm the winning outcome within 48 hours of the event</p>
              </div>
            </div>
          </div>
        </section>

        {/* How Markets Resolve */}
        <section className="space-y-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-success/10 flex items-center justify-center">
              <Gavel className="h-4 w-4 text-success" />
            </div>
            <h3 className="font-bold text-base">How Markets Resolve</h3>
          </div>
          <div className="space-y-2">
            <div className="p-3 rounded-lg bg-muted/30">
              <p className="text-sm font-semibold mb-0.5">1. Event occurs</p>
              <p className="text-xs text-muted-foreground">The real-world outcome is known (e.g., election results are certified)</p>
            </div>
            <div className="p-3 rounded-lg bg-muted/30">
              <p className="text-sm font-semibold mb-0.5">2. Creator confirms result (within 48h)</p>
              <p className="text-xs text-muted-foreground">The market creator verifies the winning outcome using official sources</p>
            </div>
            <div className="p-3 rounded-lg bg-amber-500/5 border border-amber-500/20">
              <p className="text-sm font-semibold mb-0.5">3. 24h dispute window</p>
              <p className="text-xs text-muted-foreground">Users can challenge if they believe the resolution is incorrect. The Pollgy team reviews disputes.</p>
            </div>
            <div className="p-3 rounded-lg bg-success/10 border border-success/20">
              <p className="text-sm font-semibold text-success mb-0.5">4. Automatic payout 💸</p>
              <p className="text-xs text-muted-foreground">Winnings are credited directly to your cash balance — no action needed</p>
            </div>
          </div>
        </section>

        {/* Become a Creator */}
        <section className="space-y-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-amber-500/10 flex items-center justify-center">
              <BadgeCheck className="h-4 w-4 text-amber-500" />
            </div>
            <h3 className="font-bold text-base">Want to Create Markets?</h3>
          </div>
          <div className="space-y-2">
            <div className="flex gap-3 p-3 rounded-lg bg-muted/30">
              <CheckCircle2 className="h-4 w-4 text-success mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-sm font-medium">Apply through your profile</p>
                <p className="text-xs text-muted-foreground">Team reviews applications within 24 hours</p>
              </div>
            </div>
            <div className="flex gap-3 p-3 rounded-lg bg-muted/30">
              <CheckCircle2 className="h-4 w-4 text-success mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-sm font-medium">Build your reputation</p>
                <p className="text-xs text-muted-foreground">Fair resolutions earn you followers and credibility</p>
              </div>
            </div>
            <div className="flex gap-3 p-3 rounded-lg bg-muted/30">
              <CheckCircle2 className="h-4 w-4 text-success mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-sm font-medium">Grow your audience</p>
                <p className="text-xs text-muted-foreground">Users follow top creators to find the best markets</p>
              </div>
            </div>
          </div>
        </section>

        {/* Market Cancellation */}
        <section className="p-3 rounded-lg border border-amber-500/30 bg-amber-500/5">
          <div className="flex items-start gap-2">
            <AlertTriangle className="h-4 w-4 text-amber-500 mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-sm font-semibold text-amber-600 dark:text-amber-400">Market Cancellation (Rare)</p>
              <p className="text-xs text-muted-foreground mt-1">
                If a market becomes unknowable or the event is cancelled, your ticket cost is refunded. 
                The platform fee (3%) and Weekly Draw contribution (2%) are <span className="font-semibold text-foreground">non-refundable</span>.
              </p>
            </div>
          </div>
        </section>
      </TabsContent>

      {/* ═══════════ MONEY TAB ═══════════ */}
      <TabsContent value="money" className="mt-0 space-y-5">
        {/* Hero */}
        <section className="text-center space-y-2 py-2">
          <div className="w-14 h-14 rounded-2xl bg-success/10 border border-success/20 flex items-center justify-center mx-auto">
            <Wallet className="h-7 w-7 text-success" />
          </div>
          <h3 className="text-lg font-bold">Deposits & Withdrawals</h3>
          <p className="text-sm text-muted-foreground max-w-xs mx-auto">
            Getting money in and out is fast, simple, and <span className="font-semibold text-foreground">completely free</span>.
          </p>
        </section>

        {/* Deposit Methods */}
        <section className="space-y-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
              <CreditCard className="h-4 w-4 text-primary" />
            </div>
            <h3 className="font-bold text-base">How to Deposit</h3>
          </div>
          <div className="space-y-2">
            <div className="flex gap-3 p-3 rounded-lg bg-muted/30">
              <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-bold flex-shrink-0">1</div>
              <div>
                <p className="text-sm font-medium">Click "Deposit" in the header</p>
                <p className="text-xs text-muted-foreground">Or go to Settings → Wallet</p>
              </div>
            </div>
            <div className="flex gap-3 p-3 rounded-lg bg-muted/30">
              <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-bold flex-shrink-0">2</div>
              <div>
                <p className="text-sm font-medium">Choose your payment method</p>
                <p className="text-xs text-muted-foreground">Card, bank transfer, crypto, or mobile pay</p>
              </div>
            </div>
            <div className="flex gap-3 p-3 rounded-lg bg-success/10 border border-success/20">
              <div className="w-6 h-6 rounded-full bg-success text-white flex items-center justify-center text-xs font-bold flex-shrink-0">3</div>
              <div>
                <p className="text-sm font-semibold text-success">Funds land in your account</p>
                <p className="text-xs text-muted-foreground">Start buying tickets immediately</p>
              </div>
            </div>
          </div>
        </section>

        {/* Payment Methods */}
        <section className="space-y-3">
          <h4 className="font-bold text-sm">Accepted Methods</h4>
          <div className="grid grid-cols-2 gap-2">
            <div className="p-3 rounded-lg bg-muted/30 text-center">
              <p className="text-sm font-medium">Credit/Debit</p>
              <p className="text-xs text-success font-semibold">Instant</p>
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
              <p className="text-xs text-success font-semibold">Instant</p>
            </div>
          </div>
        </section>

        {/* Withdrawals */}
        <section className="space-y-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-success/10 flex items-center justify-center">
              <HandCoins className="h-4 w-4 text-success" />
            </div>
            <h3 className="font-bold text-base">Withdrawals</h3>
          </div>
          <div className="space-y-2">
            <div className="p-3 rounded-lg bg-success/5 border border-success/20">
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm font-semibold">Withdrawal fee</span>
                <span className="text-sm font-bold text-success">Free</span>
              </div>
              <p className="text-xs text-muted-foreground">No charges. Ever.</p>
            </div>
            <div className="p-3 rounded-lg bg-muted/30">
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm font-semibold">Minimum withdrawal</span>
                <span className="text-sm font-bold">$10</span>
              </div>
              <p className="text-xs text-muted-foreground">Small threshold so you can cash out easily</p>
            </div>
            <div className="p-3 rounded-lg bg-muted/30">
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm font-semibold">Processing time</span>
                <span className="text-sm font-bold">1-3 business days</span>
              </div>
              <p className="text-xs text-muted-foreground">Usually arrives within 24 hours</p>
            </div>
          </div>
        </section>

        {/* Fee Summary */}
        <section className="space-y-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
              <Percent className="h-4 w-4 text-primary" />
            </div>
            <h3 className="font-bold text-base">All Fees (Transparent)</h3>
          </div>
          <div className="space-y-1.5">
            <div className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
              <span className="text-sm">Ticket split</span>
              <span className="text-sm font-bold"><span className="text-success">95%</span> / <span className="text-primary">2%</span> / 3%</span>
            </div>
            <div className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
              <span className="text-sm">Deposit fee</span>
              <span className="text-sm font-bold text-success">Free</span>
            </div>
            <div className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
              <span className="text-sm">Withdrawal fee</span>
              <span className="text-sm font-bold text-success">Free</span>
            </div>
            <div className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
              <span className="text-sm">Account fee</span>
              <span className="text-sm font-bold text-success">Free</span>
            </div>
          </div>
          <div className="p-3 rounded-lg bg-primary/5 border border-primary/20">
            <p className="text-xs text-muted-foreground">
              <span className="font-semibold text-foreground">No hidden fees.</span> The 95/2/3 split is applied once at purchase. No trading, selling, or resolution fees.
            </p>
          </div>
        </section>
      </TabsContent>

      {/* ═══════════ TRUST TAB ═══════════ */}
      <TabsContent value="trust" className="mt-0 space-y-5">
        {/* Hero */}
        <section className="text-center space-y-2 py-2">
          <div className="w-14 h-14 rounded-2xl bg-success/10 border border-success/20 flex items-center justify-center mx-auto">
            <Shield className="h-7 w-7 text-success" />
          </div>
          <h3 className="text-lg font-bold">Trust & Safety</h3>
          <p className="text-sm text-muted-foreground max-w-xs mx-auto">
            Your money and data are protected with <span className="font-semibold text-foreground">bank-level security</span>.
          </p>
        </section>

        {/* Security Features */}
        <section className="space-y-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-success/10 flex items-center justify-center">
              <Lock className="h-4 w-4 text-success" />
            </div>
            <h3 className="font-bold text-base">Security Features</h3>
          </div>
          <div className="space-y-2">
            <div className="flex gap-3 p-3 rounded-lg bg-success/5 border border-success/20">
              <CheckCircle2 className="h-4 w-4 text-success mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-sm font-medium">Bank-level encryption</p>
                <p className="text-xs text-muted-foreground">256-bit SSL encryption on all transactions and data</p>
              </div>
            </div>
            <div className="flex gap-3 p-3 rounded-lg bg-success/5 border border-success/20">
              <CheckCircle2 className="h-4 w-4 text-success mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-sm font-medium">Two-factor authentication</p>
                <p className="text-xs text-muted-foreground">Protect your account with an extra layer of security</p>
              </div>
            </div>
            <div className="flex gap-3 p-3 rounded-lg bg-success/5 border border-success/20">
              <CheckCircle2 className="h-4 w-4 text-success mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-sm font-medium">Segregated accounts</p>
                <p className="text-xs text-muted-foreground">Your funds are held separately from Pollgy's operating funds</p>
              </div>
            </div>
            <div className="flex gap-3 p-3 rounded-lg bg-success/5 border border-success/20">
              <CheckCircle2 className="h-4 w-4 text-success mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-sm font-medium">Verifiable draws</p>
                <p className="text-xs text-muted-foreground">All Weekly Draw results are transparent and independently auditable</p>
              </div>
            </div>
          </div>
        </section>

        {/* Fair Resolution */}
        <section className="space-y-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
              <Eye className="h-4 w-4 text-primary" />
            </div>
            <h3 className="font-bold text-base">Fair & Transparent</h3>
          </div>
          <div className="space-y-2">
            <div className="p-3 rounded-lg bg-muted/30">
              <p className="text-sm font-semibold mb-0.5">🏛️ Dispute resolution</p>
              <p className="text-xs text-muted-foreground">Every resolved market has a 24-hour dispute window. If something looks wrong, you can flag it for review.</p>
            </div>
            <div className="p-3 rounded-lg bg-muted/30">
              <p className="text-sm font-semibold mb-0.5">📊 Creator accountability</p>
              <p className="text-xs text-muted-foreground">Creators have public track records. Users can see resolution history, accuracy, and ratings before buying.</p>
            </div>
            <div className="p-3 rounded-lg bg-muted/30">
              <p className="text-sm font-semibold mb-0.5">🔍 Full transparency</p>
              <p className="text-xs text-muted-foreground">Pot sizes, ticket counts, and fee splits are always visible. No hidden mechanics.</p>
            </div>
          </div>
        </section>

        {/* Community */}
        <section className="space-y-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
              <Users className="h-4 w-4 text-primary" />
            </div>
            <h3 className="font-bold text-base">Community</h3>
          </div>
          <div className="space-y-2">
            <div className="p-3 rounded-lg bg-muted/30">
              <p className="text-sm font-medium mb-0.5">💬 Comments & Discussion</p>
              <p className="text-xs text-muted-foreground">Debate markets, share analysis, and learn from other predictors</p>
            </div>
            <div className="p-3 rounded-lg bg-muted/30">
              <p className="text-sm font-medium mb-0.5">👥 Follow Predictors</p>
              <p className="text-xs text-muted-foreground">Follow successful users and see their picks for inspiration</p>
            </div>
            <div className="p-3 rounded-lg bg-muted/30">
              <p className="text-sm font-medium mb-0.5">🏆 Leaderboards</p>
              <p className="text-xs text-muted-foreground">Compete for top spots and earn recognition across the platform</p>
            </div>
          </div>
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
