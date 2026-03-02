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
  MessageSquare,
  BadgeCheck,
  PenTool,
  Bird,
  Flame,
  BarChart3,
  Briefcase,
  Share2,
  UserPlus,
  CreditCard,
  ArrowRight,
  Eye,
  Heart,
  Medal,
  Coins,
} from "lucide-react";

interface HowItWorksDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function HowItWorksDialog({ open, onOpenChange }: HowItWorksDialogProps) {
  const isMobile = useIsMobile();

  const content = (
    <Tabs defaultValue="about" className="w-full">
      <TabsList className="w-full grid grid-cols-6 mb-4 h-auto p-1">
        <TabsTrigger value="about" className="text-[10px] sm:text-xs py-2 px-0.5 sm:px-1">
          <BookOpen className="h-3.5 w-3.5 mr-0.5 sm:mr-1 hidden sm:inline" />
          About
        </TabsTrigger>
        <TabsTrigger value="how" className="text-[10px] sm:text-xs py-2 px-0.5 sm:px-1">
          <Target className="h-3.5 w-3.5 mr-0.5 sm:mr-1 hidden sm:inline" />
          How
        </TabsTrigger>
        <TabsTrigger value="draw" className="text-[10px] sm:text-xs py-2 px-0.5 sm:px-1">
          <Trophy className="h-3.5 w-3.5 mr-0.5 sm:mr-1 hidden sm:inline" />
          Draw
        </TabsTrigger>
        <TabsTrigger value="platform" className="text-[10px] sm:text-xs py-2 px-0.5 sm:px-1">
          <BarChart3 className="h-3.5 w-3.5 mr-0.5 sm:mr-1 hidden sm:inline" />
          Platform
        </TabsTrigger>
        <TabsTrigger value="creators" className="text-[10px] sm:text-xs py-2 px-0.5 sm:px-1">
          <Sparkles className="h-3.5 w-3.5 mr-0.5 sm:mr-1 hidden sm:inline" />
          Creators
        </TabsTrigger>
        <TabsTrigger value="money" className="text-[10px] sm:text-xs py-2 px-0.5 sm:px-1">
          <Wallet className="h-3.5 w-3.5 mr-0.5 sm:mr-1 hidden sm:inline" />
          Money
        </TabsTrigger>
      </TabsList>

      {/* ═══════════ ABOUT TAB ═══════════ */}
      <TabsContent value="about" className="mt-0 space-y-5">
        {/* Hero */}
        <section className="text-center space-y-2 py-2">
          <h3 className="text-lg font-bold">What is Pollgy?</h3>
          <p className="text-sm text-muted-foreground leading-relaxed max-w-sm mx-auto">
            Pollgy is a <span className="font-semibold text-foreground">prediction market platform</span> where you bet on real-world events and win real money.
          </p>
        </section>

        {/* What are prediction markets */}
        <section className="space-y-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
              <TrendingUp className="h-4 w-4 text-primary" />
            </div>
            <h3 className="font-bold text-base">What are Prediction Markets?</h3>
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Think of it like a <span className="font-semibold text-foreground">pool bet with friends</span>, but on anything happening in the world. A question is asked, people pick sides, money goes into a pot, and winners split it.
          </p>
          <div className="p-4 rounded-xl border border-border bg-muted/20 space-y-3">
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Example questions on Pollgy:</p>
            <div className="space-y-1.5">
              <div className="flex items-center gap-2 p-2 rounded-lg bg-background/50">
                <span className="text-sm">🏀</span>
                <p className="text-sm">"Who wins the NBA Championship?"</p>
              </div>
              <div className="flex items-center gap-2 p-2 rounded-lg bg-background/50">
                <span className="text-sm">₿</span>
                <p className="text-sm">"Will Bitcoin hit $100K by July?"</p>
              </div>
              <div className="flex items-center gap-2 p-2 rounded-lg bg-background/50">
                <span className="text-sm">📱</span>
                <p className="text-sm">"Will Apple launch a foldable iPhone?"</p>
              </div>
              <div className="flex items-center gap-2 p-2 rounded-lg bg-background/50">
                <span className="text-sm">🗳️</span>
                <p className="text-sm">"Who will win the next presidential election?"</p>
              </div>
            </div>
          </div>
        </section>

        {/* How Pollgy is different */}
        <section className="space-y-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-amber-500/10 flex items-center justify-center">
              <Zap className="h-4 w-4 text-amber-500" />
            </div>
            <h3 className="font-bold text-base">Why Pollgy?</h3>
          </div>
          <div className="space-y-2">
            <div className="flex gap-3 p-3 rounded-lg bg-muted/30">
              <CheckCircle2 className="h-4 w-4 text-success mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-sm font-medium">Simple ticket system</p>
                <p className="text-xs text-muted-foreground">No complex order books or trading. Just buy tickets at $0.50 each.</p>
              </div>
            </div>
            <div className="flex gap-3 p-3 rounded-lg bg-muted/30">
              <CheckCircle2 className="h-4 w-4 text-success mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-sm font-medium">95% goes to winners</p>
                <p className="text-xs text-muted-foreground">One of the highest payout rates in the industry.</p>
              </div>
            </div>
            <div className="flex gap-3 p-3 rounded-lg bg-muted/30">
              <CheckCircle2 className="h-4 w-4 text-success mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-sm font-medium">Two chances to win</p>
                <p className="text-xs text-muted-foreground">Every ticket enters you in both the market AND the Weekly Draw.</p>
              </div>
            </div>
            <div className="flex gap-3 p-3 rounded-lg bg-muted/30">
              <CheckCircle2 className="h-4 w-4 text-success mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-sm font-medium">Categories for everyone</p>
                <p className="text-xs text-muted-foreground">Sports, Crypto, Politics, Tech, Entertainment — pick what you know.</p>
              </div>
            </div>
          </div>
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
      </TabsContent>

      {/* ═══════════ HOW TAB ═══════════ */}
      <TabsContent value="how" className="mt-0 space-y-5">
        {/* Step by step */}
        <section className="space-y-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
              <Target className="h-4 w-4 text-primary" />
            </div>
            <h3 className="font-bold text-base">Step-by-Step Guide</h3>
          </div>
          <div className="space-y-2">
            <div className="flex gap-3 p-3 rounded-lg bg-muted/30">
              <div className="w-7 h-7 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-bold flex-shrink-0">1</div>
              <div>
                <p className="text-sm font-semibold">Browse & pick a market</p>
                <p className="text-xs text-muted-foreground">Find a question you have an opinion on. Markets cover sports, crypto, politics, tech, and more.</p>
              </div>
            </div>
            <div className="flex gap-3 p-3 rounded-lg bg-muted/30">
              <div className="w-7 h-7 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-bold flex-shrink-0">2</div>
              <div>
                <p className="text-sm font-semibold">Choose your side</p>
                <p className="text-xs text-muted-foreground">Select the outcome you believe in — "Yes", "No", or one of multiple options.</p>
              </div>
            </div>
            <div className="flex gap-3 p-3 rounded-lg bg-muted/30">
              <div className="w-7 h-7 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-bold flex-shrink-0">3</div>
              <div>
                <p className="text-sm font-semibold">Buy tickets ($0.50 each)</p>
                <p className="text-xs text-muted-foreground">More tickets = bigger share of the pot if you win. Each ticket also enters you in the Weekly Draw.</p>
              </div>
            </div>
            <div className="flex gap-3 p-3 rounded-lg bg-muted/30">
              <div className="w-7 h-7 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-bold flex-shrink-0">4</div>
              <div>
                <p className="text-sm font-semibold">Wait for the event</p>
                <p className="text-xs text-muted-foreground">The real-world event plays out. The market creator confirms the result within 48 hours.</p>
              </div>
            </div>
            <div className="flex gap-3 p-3 rounded-lg bg-success/10 border border-success/20">
              <div className="w-7 h-7 rounded-full bg-success text-white flex items-center justify-center text-xs font-bold flex-shrink-0">5</div>
              <div>
                <p className="text-sm font-semibold text-success">Winners split the pot 💰</p>
                <p className="text-xs text-muted-foreground">Winnings are automatically credited to your cash balance.</p>
              </div>
            </div>
          </div>
        </section>

        {/* What is pari-mutuel */}
        <section className="space-y-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
              <Scale className="h-4 w-4 text-primary" />
            </div>
            <h3 className="font-bold text-base">How Payouts Work (Pari-Mutuel)</h3>
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Pollgy uses a <span className="font-semibold text-foreground">pari-mutuel system</span> — the same model used in horse racing. Everyone's money goes into one pot, and winners split it proportionally.
          </p>
          <div className="p-4 rounded-xl border border-primary/30 bg-primary/5 text-center space-y-2">
            <p className="text-[10px] text-muted-foreground uppercase tracking-wide font-semibold">The Formula</p>
            <p className="text-sm font-bold text-foreground">
              Your Payout = <span className="text-primary">(Your Tickets ÷ Total Winning Tickets)</span> × Pot
            </p>
            <p className="text-xs text-muted-foreground">
              The pot is <span className="font-bold text-success">95%</span> of all ticket sales in that market.
            </p>
          </div>
        </section>

        {/* Where your $0.50 goes */}
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
              <p className="text-xs text-muted-foreground">$0.475 → goes straight to the prize pool winners split.</p>
            </div>
            <div className="p-3.5 rounded-lg bg-primary/10 border border-primary/30">
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm font-bold text-primary flex items-center gap-1.5"><Gift className="h-3.5 w-3.5" /> Weekly Draw</span>
                <span className="text-lg font-extrabold text-primary">2%</span>
              </div>
              <p className="text-xs text-muted-foreground">$0.01 → funds the weekly cash prize draw you're automatically entered in.</p>
            </div>
            <div className="p-3 rounded-lg bg-muted/30 border border-border/50">
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm font-semibold">Platform Fee</span>
                <span className="text-sm font-bold">3%</span>
              </div>
              <p className="text-xs text-muted-foreground">$0.015 → keeps Pollgy running (servers, support, development).</p>
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

        {/* Live Example */}
        <section className="space-y-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-amber-500/10 flex items-center justify-center">
              <Lightbulb className="h-4 w-4 text-amber-500" />
            </div>
            <h3 className="font-bold text-base">Full Worked Example</h3>
          </div>
          <div className="p-4 rounded-xl border border-border bg-muted/20 space-y-4">
            <div className="text-center pb-2 border-b border-border">
              <p className="text-sm font-bold">"Will Bitcoin hit $100K by July 2026?"</p>
              <p className="text-xs text-muted-foreground mt-1">500 people buy a total of 500 tickets</p>
            </div>
            
            <div className="grid grid-cols-2 gap-2">
              <div className="p-3 rounded-lg bg-success/10 border border-success/20 text-center">
                <p className="text-[10px] text-muted-foreground font-medium">YES side</p>
                <p className="text-lg font-extrabold text-success">300</p>
                <p className="text-[10px] text-muted-foreground">tickets ($150)</p>
              </div>
              <div className="p-3 rounded-lg bg-destructive/10 border border-destructive/20 text-center">
                <p className="text-[10px] text-muted-foreground font-medium">NO side</p>
                <p className="text-lg font-extrabold text-destructive">200</p>
                <p className="text-[10px] text-muted-foreground">tickets ($100)</p>
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
                <div className="mt-2 p-2 rounded bg-background/50 text-center">
                  <p className="text-[10px] text-muted-foreground">Your share: 20 ÷ 300 winning tickets</p>
                  <p className="text-base font-extrabold text-success mt-0.5">(20 ÷ 300) × $237.50 = $15.83</p>
                </div>
                <div className="mt-2 pt-2 border-t border-success/20 flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">Profit on $10 spent</span>
                  <span className="text-sm font-extrabold text-success">+$5.83 (+58%)</span>
                </div>
              </div>
            </div>

            <div className="p-2.5 rounded-lg bg-amber-500/10 border border-amber-500/20 text-center">
              <p className="text-xs text-muted-foreground">
                <span className="font-semibold text-amber-600 dark:text-amber-400">Underdog tip:</span> If you'd bet on NO and NO won, your 20 tickets would pay <span className="font-bold text-foreground">$23.75</span> — a <span className="font-bold text-success">+138% return!</span> Fewer winners = bigger share.
              </p>
            </div>
          </div>
        </section>

        {/* Early bird pricing */}
        <section className="space-y-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
              <Clock className="h-4 w-4 text-primary" />
            </div>
            <h3 className="font-bold text-base">Early = Cheaper Tickets</h3>
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Ticket prices <span className="font-semibold text-foreground">increase as the event approaches</span>. Buying early rewards conviction with better value.
          </p>
          <div className="space-y-2">
            <div className="p-3 rounded-lg bg-success/10 border border-success/30 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Bird className="h-4 w-4 text-success" />
                <div>
                  <p className="text-sm font-semibold text-success">Early Bird</p>
                  <p className="text-[10px] text-muted-foreground">1+ month before event</p>
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
                  <p className="text-[10px] text-muted-foreground">&lt;1 week before event</p>
                </div>
              </div>
              <span className="font-bold text-destructive">$1.25</span>
            </div>
          </div>
          <div className="p-3 rounded-lg bg-success/5 border border-success/20">
            <p className="text-xs text-muted-foreground">
              <span className="font-semibold text-success">🐦 Tip:</span> Look for green <span className="font-semibold text-foreground">"Early Bird"</span> badges on market cards for the cheapest tickets.
            </p>
          </div>
        </section>

        {/* Key insights */}
        <section className="space-y-2">
          <div className="p-3 rounded-lg bg-success/5 border border-success/20">
            <p className="text-sm font-semibold mb-0.5">📈 Fewer winners = bigger payout</p>
            <p className="text-xs text-muted-foreground">Bet on the underdog? If you're right, you share the pot with fewer people.</p>
          </div>
          <div className="p-3 rounded-lg bg-primary/5 border border-primary/20">
            <p className="text-sm font-semibold mb-0.5">🎟️ More tickets = bigger share</p>
            <p className="text-xs text-muted-foreground">The more tickets you hold on the winning side, the larger your portion.</p>
          </div>
          <div className="p-3 rounded-lg bg-muted/30 border border-border">
            <p className="text-sm font-semibold mb-0.5">🛡️ You can't lose more than you spend</p>
            <p className="text-xs text-muted-foreground">No margin calls, no hidden fees. Max loss = your ticket cost.</p>
          </div>
        </section>
      </TabsContent>

      {/* ═══════════ DRAW TAB ═══════════ */}
      <TabsContent value="draw" className="mt-0 space-y-5">
        {/* Hero */}
        <section className="text-center space-y-3 py-2">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary/20 to-amber-500/20 border border-primary/20 flex items-center justify-center mx-auto">
            <Trophy className="h-7 w-7 text-primary" />
          </div>
          <h3 className="text-lg font-bold">The Weekly Draw 🎉</h3>
          <p className="text-sm text-muted-foreground max-w-xs mx-auto">
            A second chance to win cash every week — <span className="font-bold text-foreground">at no extra cost</span>.
          </p>
        </section>

        {/* How it works step by step */}
        <section className="space-y-3">
          <h4 className="font-bold text-sm flex items-center gap-2">
            <Gift className="h-4 w-4 text-primary" /> How It Works
          </h4>
          <div className="space-y-2">
            <div className="flex gap-3 p-3 rounded-lg bg-muted/30">
              <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-bold flex-shrink-0">1</div>
              <div>
                <p className="text-sm font-medium">Buy tickets on any market</p>
                <p className="text-xs text-muted-foreground"><span className="font-semibold text-primary">2%</span> of each ticket automatically goes into the weekly prize pool.</p>
              </div>
            </div>
            <div className="flex gap-3 p-3 rounded-lg bg-muted/30">
              <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-bold flex-shrink-0">2</div>
              <div>
                <p className="text-sm font-medium">Each ticket = 1 draw entry</p>
                <p className="text-xs text-muted-foreground">Buy 50 tickets across different markets? That's <span className="font-semibold text-foreground">50 entries</span> in the draw!</p>
              </div>
            </div>
            <div className="flex gap-3 p-3 rounded-lg bg-success/10 border border-success/20">
              <div className="w-6 h-6 rounded-full bg-success text-white flex items-center justify-center text-xs font-bold flex-shrink-0">3</div>
              <div>
                <p className="text-sm font-semibold text-success">Every Sunday — 10 winners are drawn!</p>
                <p className="text-xs text-muted-foreground">Random selection. Winners announced every Monday.</p>
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
              <span className="font-semibold text-foreground">Lost your market prediction?</span> Your draw entries are still valid. You could still win cash on Sunday.
            </p>
            <p className="text-xs text-muted-foreground leading-relaxed">
              <span className="font-semibold text-foreground">Won your market prediction?</span> Even better — you get your winnings AND you're still in the draw.
            </p>
            <p className="text-xs font-bold text-foreground mt-2">
              Every ticket gives you two chances to win. Always.
            </p>
          </div>
        </section>
      </TabsContent>

      {/* ═══════════ PLATFORM TAB ═══════════ */}
      <TabsContent value="platform" className="mt-0 space-y-5">
        <section className="text-center space-y-2 py-2">
          <h3 className="text-lg font-bold">Explore the Platform</h3>
          <p className="text-sm text-muted-foreground max-w-sm mx-auto">
            Pollgy isn't just about predictions — it's a full community experience.
          </p>
        </section>

        {/* Community Feed */}
        <section className="space-y-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
              <MessageSquare className="h-4 w-4 text-primary" />
            </div>
            <h3 className="font-bold text-base">Community Feed</h3>
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed">
            A social feed where users share predictions, analysis, and opinions. Think of it like Twitter but focused on predictions.
          </p>
          <div className="space-y-2">
            <div className="flex gap-3 p-3 rounded-lg bg-muted/30">
              <Eye className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-sm font-medium">Share your takes</p>
                <p className="text-xs text-muted-foreground">Post your prediction reasoning, debate with others, build your reputation.</p>
              </div>
            </div>
            <div className="flex gap-3 p-3 rounded-lg bg-muted/30">
              <Heart className="h-4 w-4 text-destructive mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-sm font-medium">Follow top predictors</p>
                <p className="text-xs text-muted-foreground">See what successful users are betting on and learn from their strategy.</p>
              </div>
            </div>
            <div className="flex gap-3 p-3 rounded-lg bg-muted/30">
              <Ticket className="h-4 w-4 text-amber-500 mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-sm font-medium">Inline market previews</p>
                <p className="text-xs text-muted-foreground">Posts can embed live market cards — tap to buy tickets directly from the feed.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Leaderboards */}
        <section className="space-y-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-amber-500/10 flex items-center justify-center">
              <Medal className="h-4 w-4 text-amber-500" />
            </div>
            <h3 className="font-bold text-base">Leaderboards</h3>
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed">
            See how you rank against other predictors. Leaderboards track accuracy, profit, and streak performance.
          </p>
          <div className="p-4 rounded-xl border border-border bg-muted/20 space-y-2">
            <div className="flex items-center justify-between p-2.5 rounded-lg bg-amber-500/10 border border-amber-500/20">
              <div className="flex items-center gap-2">
                <span className="text-sm font-bold text-amber-500">🥇</span>
                <span className="text-sm font-medium">Top Predictor</span>
              </div>
              <span className="text-xs text-muted-foreground">Highest win rate</span>
            </div>
            <div className="flex items-center justify-between p-2.5 rounded-lg bg-muted/40">
              <div className="flex items-center gap-2">
                <span className="text-sm font-bold">💰</span>
                <span className="text-sm font-medium">Most Profitable</span>
              </div>
              <span className="text-xs text-muted-foreground">Highest earnings</span>
            </div>
            <div className="flex items-center justify-between p-2.5 rounded-lg bg-muted/40">
              <div className="flex items-center gap-2">
                <span className="text-sm font-bold">🔥</span>
                <span className="text-sm font-medium">Hot Streak</span>
              </div>
              <span className="text-xs text-muted-foreground">Consecutive wins</span>
            </div>
          </div>
        </section>

        {/* Portfolio */}
        <section className="space-y-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-success/10 flex items-center justify-center">
              <Briefcase className="h-4 w-4 text-success" />
            </div>
            <h3 className="font-bold text-base">Portfolio</h3>
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Your personal dashboard showing all your active and past predictions in one place.
          </p>
          <div className="space-y-2">
            <div className="flex gap-3 p-3 rounded-lg bg-muted/30">
              <BarChart3 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-sm font-medium">Track performance</p>
                <p className="text-xs text-muted-foreground">See your win rate, total profit, and prediction history at a glance.</p>
              </div>
            </div>
            <div className="flex gap-3 p-3 rounded-lg bg-muted/30">
              <Ticket className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-sm font-medium">Active positions</p>
                <p className="text-xs text-muted-foreground">View all your open tickets, estimated payouts, and market status.</p>
              </div>
            </div>
            <div className="flex gap-3 p-3 rounded-lg bg-muted/30">
              <Trophy className="h-4 w-4 text-amber-500 mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-sm font-medium">Weekly Draw entries</p>
                <p className="text-xs text-muted-foreground">See how many draw entries you have for the current week.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Market resolution */}
        <section className="space-y-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
              <Gavel className="h-4 w-4 text-primary" />
            </div>
            <h3 className="font-bold text-base">How Markets Resolve</h3>
          </div>
          <div className="space-y-2">
            <div className="p-3 rounded-lg bg-muted/30">
              <p className="text-sm font-semibold mb-0.5">1. Event occurs</p>
              <p className="text-xs text-muted-foreground">The real-world outcome is known.</p>
            </div>
            <div className="p-3 rounded-lg bg-muted/30">
              <p className="text-sm font-semibold mb-0.5">2. Creator confirms result (within 48h)</p>
              <p className="text-xs text-muted-foreground">The market creator verifies the winning outcome with evidence.</p>
            </div>
            <div className="p-3 rounded-lg bg-muted/30">
              <p className="text-sm font-semibold mb-0.5">3. 24h dispute window</p>
              <p className="text-xs text-muted-foreground">Users can challenge if they believe the resolution is incorrect.</p>
            </div>
            <div className="p-3 rounded-lg bg-success/10 border border-success/20">
              <p className="text-sm font-semibold text-success mb-0.5">4. Automatic payout 💸</p>
              <p className="text-xs text-muted-foreground">Winnings credited directly to your cash balance.</p>
            </div>
          </div>
        </section>
      </TabsContent>

      {/* ═══════════ CREATORS TAB ═══════════ */}
      <TabsContent value="creators" className="mt-0 space-y-5">
        <section className="text-center space-y-2 py-2">
          <h3 className="text-lg font-bold">Creators & Referrals</h3>
          <p className="text-sm text-muted-foreground max-w-sm mx-auto">
            Create markets, build a following, and earn from referrals.
          </p>
        </section>

        {/* What are creators */}
        <section className="space-y-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
              <PenTool className="h-4 w-4 text-primary" />
            </div>
            <h3 className="font-bold text-base">What are Creators?</h3>
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Creators are <span className="font-semibold text-foreground">verified users</span> who design and manage prediction markets. They write the questions, set the rules, and resolve markets fairly when the event happens.
          </p>
          <div className="p-4 rounded-xl border border-border bg-muted/20 space-y-3">
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">What creators do:</p>
            <div className="space-y-2">
              <div className="flex gap-3 p-2.5 rounded-lg bg-background/50">
                <Lightbulb className="h-4 w-4 text-amber-500 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-sm font-medium">Design markets</p>
                  <p className="text-xs text-muted-foreground">Write compelling questions with clear resolution criteria.</p>
                </div>
              </div>
              <div className="flex gap-3 p-2.5 rounded-lg bg-background/50">
                <Gavel className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-sm font-medium">Resolve markets</p>
                  <p className="text-xs text-muted-foreground">Confirm results within 48 hours with evidence.</p>
                </div>
              </div>
              <div className="flex gap-3 p-2.5 rounded-lg bg-background/50">
                <Users className="h-4 w-4 text-success mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-sm font-medium">Build a following</p>
                  <p className="text-xs text-muted-foreground">Great markets attract followers and boost your creator profile.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* How to become a creator */}
        <section className="space-y-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-success/10 flex items-center justify-center">
              <BadgeCheck className="h-4 w-4 text-success" />
            </div>
            <h3 className="font-bold text-base">How to Become a Creator</h3>
          </div>
          <div className="space-y-2">
            <div className="flex gap-3 p-3 rounded-lg bg-muted/30">
              <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-bold flex-shrink-0">1</div>
              <div>
                <p className="text-sm font-medium">Apply through your profile</p>
                <p className="text-xs text-muted-foreground">Click "Become a Creator" from your profile dropdown.</p>
              </div>
            </div>
            <div className="flex gap-3 p-3 rounded-lg bg-muted/30">
              <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-bold flex-shrink-0">2</div>
              <div>
                <p className="text-sm font-medium">Team review (within 24h)</p>
                <p className="text-xs text-muted-foreground">We verify your identity and review your application.</p>
              </div>
            </div>
            <div className="flex gap-3 p-3 rounded-lg bg-success/10 border border-success/20">
              <div className="w-6 h-6 rounded-full bg-success text-white flex items-center justify-center text-xs font-bold flex-shrink-0">3</div>
              <div>
                <p className="text-sm font-semibold text-success">Start creating markets!</p>
                <p className="text-xs text-muted-foreground">You get the verified creator badge and access to the Creator Dashboard.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Refer a Friend */}
        <section className="space-y-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-amber-500/10 flex items-center justify-center">
              <UserPlus className="h-4 w-4 text-amber-500" />
            </div>
            <h3 className="font-bold text-base">Refer a Friend (RAF)</h3>
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Share Pollgy with friends and <span className="font-semibold text-foreground">earn real money</span> when they join and play.
          </p>
          <div className="space-y-2">
            <div className="flex gap-3 p-3 rounded-lg bg-muted/30">
              <div className="w-6 h-6 rounded-full bg-amber-500 text-white flex items-center justify-center text-xs font-bold flex-shrink-0">1</div>
              <div>
                <p className="text-sm font-medium">Get your unique referral link</p>
                <p className="text-xs text-muted-foreground">Find it in your profile dropdown under "Refer a Friend".</p>
              </div>
            </div>
            <div className="flex gap-3 p-3 rounded-lg bg-muted/30">
              <div className="w-6 h-6 rounded-full bg-amber-500 text-white flex items-center justify-center text-xs font-bold flex-shrink-0">2</div>
              <div>
                <p className="text-sm font-medium">Share with friends</p>
                <p className="text-xs text-muted-foreground">Send your link via text, social media, or email.</p>
              </div>
            </div>
            <div className="flex gap-3 p-3 rounded-lg bg-success/10 border border-success/20">
              <div className="w-6 h-6 rounded-full bg-success text-white flex items-center justify-center text-xs font-bold flex-shrink-0">3</div>
              <div>
                <p className="text-sm font-semibold text-success">Earn commissions 💰</p>
                <p className="text-xs text-muted-foreground">You earn a percentage of the platform fee from every ticket your referral buys — <span className="font-bold text-foreground">for life</span>.</p>
              </div>
            </div>
          </div>
          <div className="p-3 rounded-lg bg-primary/5 border border-primary/20">
            <p className="text-xs text-muted-foreground">
              <span className="font-semibold text-primary">💡 No limits.</span> Refer as many friends as you want. Your earnings grow with every referral's activity. Track everything from your profile.
            </p>
          </div>
        </section>
      </TabsContent>

      {/* ═══════════ MONEY TAB ═══════════ */}
      <TabsContent value="money" className="mt-0 space-y-5">
        <section className="text-center space-y-2 py-2">
          <h3 className="text-lg font-bold">Money & Safety</h3>
          <p className="text-sm text-muted-foreground max-w-sm mx-auto">
            Deposits, withdrawals, fees, and how we keep your funds safe.
          </p>
        </section>

        {/* Deposits */}
        <section className="space-y-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-success/10 flex items-center justify-center">
              <Coins className="h-4 w-4 text-success" />
            </div>
            <h3 className="font-bold text-base">Deposits</h3>
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Fund your account to start buying tickets. Currently, <span className="font-semibold text-foreground">cryptocurrency</span> is supported with more methods coming soon.
          </p>
          <div className="space-y-2">
            <div className="p-3 rounded-lg bg-success/10 border border-success/20 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Wallet className="h-4 w-4 text-success" />
                <div>
                  <p className="text-sm font-medium">Crypto (USDT, USDC, ETH, BTC)</p>
                  <p className="text-[10px] text-muted-foreground">~15 minutes · Free</p>
                </div>
              </div>
              <span className="text-xs font-semibold text-success">Available</span>
            </div>
            <div className="p-3 rounded-lg bg-muted/30 border border-border/50 flex items-center justify-between opacity-60">
              <div className="flex items-center gap-2">
                <CreditCard className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium">Credit/Debit Card</p>
                  <p className="text-[10px] text-muted-foreground">Instant</p>
                </div>
              </div>
              <span className="text-[10px] font-semibold uppercase bg-muted px-2 py-0.5 rounded-full">Coming Soon</span>
            </div>
            <div className="p-3 rounded-lg bg-muted/30 border border-border/50 flex items-center justify-between opacity-60">
              <div className="flex items-center gap-2">
                <DollarSign className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium">Wire Transfer</p>
                  <p className="text-[10px] text-muted-foreground">1-3 days</p>
                </div>
              </div>
              <span className="text-[10px] font-semibold uppercase bg-muted px-2 py-0.5 rounded-full">Coming Soon</span>
            </div>
          </div>
        </section>

        {/* Withdrawals */}
        <section className="space-y-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
              <ArrowRight className="h-4 w-4 text-primary" />
            </div>
            <h3 className="font-bold text-base">Withdrawals</h3>
          </div>
          <div className="p-3 rounded-lg bg-success/5 border border-success/20">
            <p className="text-xs text-muted-foreground">
              <span className="font-semibold text-success">Free withdrawals.</span> Minimum $10. Processing: 1-3 business days. Withdraw to your crypto wallet at any time.
            </p>
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
              <span className="text-sm font-bold"><span className="text-success">95%</span> pot / <span className="text-primary">2%</span> draw / 3% fee</span>
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

        {/* Market cancellation */}
        <section className="p-3 rounded-lg border border-amber-500/30 bg-amber-500/5">
          <div className="flex items-start gap-2">
            <AlertTriangle className="h-4 w-4 text-amber-500 mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-sm font-semibold text-amber-600 dark:text-amber-400">Market Cancellation (Rare)</p>
              <p className="text-xs text-muted-foreground mt-1">
                If a market becomes unknowable or invalid, your ticket cost is refunded. 
                The platform fee (3%) and Weekly Draw contribution (2%) are <span className="font-semibold text-foreground">non-refundable</span>.
              </p>
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
              <span>All weekly draws are verifiable and transparent</span>
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
            Our support team is available 24/7.
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
