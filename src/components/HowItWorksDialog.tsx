import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Drawer, DrawerContent } from "@/components/ui/drawer";
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
  MessageSquare,
  HelpCircle,
  CreditCard,
  Target,
  Gavel,
  BookOpen,
  Lightbulb,
  PenTool,
  XCircle,
  BadgeCheck,
  FileText,
  ArrowLeft,
  Ticket,
  Gift,
  Calendar,
  Zap,
  Share2,
  Eye,
  MousePointerClick,
  CircleDollarSign,
  PartyPopper,
  Timer,
  Search,
} from "lucide-react";

import tutorialTickets from "@/assets/tutorial-how-tickets-work.jpg";
import tutorialPotSplit from "@/assets/tutorial-pot-split.jpg";
import tutorialWeeklyDraw from "@/assets/tutorial-weekly-draw.jpg";
import tutorialSteps from "@/assets/tutorial-steps.jpg";

interface HowItWorksDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function HowItWorksDialog({ open, onOpenChange }: HowItWorksDialogProps) {
  const isMobile = useIsMobile();

  const content = (
    <Tabs defaultValue="basics" className="w-full">
      <TabsList className="w-full grid grid-cols-5 mb-4 h-auto p-1 sticky top-0 z-10 bg-background">
        <TabsTrigger value="basics" className="text-xs py-2 px-1">
          <BookOpen className="h-3.5 w-3.5 mr-1 hidden sm:inline" />
          Basics
        </TabsTrigger>
        <TabsTrigger value="tickets" className="text-xs py-2 px-1">
          <Ticket className="h-3.5 w-3.5 mr-1 hidden sm:inline" />
          Tickets
        </TabsTrigger>
        <TabsTrigger value="payouts" className="text-xs py-2 px-1">
          <Trophy className="h-3.5 w-3.5 mr-1 hidden sm:inline" />
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

      {/* ═══════════════════ BASICS TAB ═══════════════════ */}
      <TabsContent value="basics" className="mt-0 space-y-5">
        {/* Hero image */}
        <div className="rounded-xl overflow-hidden border border-border/40">
          <img src={tutorialSteps} alt="How Pollgy works - step by step" className="w-full h-auto" />
        </div>

        {/* What is Pollgy */}
        <section className="space-y-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
              <TrendingUp className="h-4 w-4 text-primary" />
            </div>
            <h3 className="font-bold text-base">What is Pollgy?</h3>
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Pollgy is a <span className="font-semibold text-foreground">pari-mutuel prediction market</span> where you 
            buy tickets on the outcomes of real-world events. All ticket money goes into a shared pot, and 
            if your prediction is correct, you split the pot with other winners.
          </p>
          <div className="p-3 rounded-lg bg-primary/5 border border-primary/20">
            <p className="text-xs text-primary font-medium flex items-center gap-2">
              <Lightbulb className="h-3.5 w-3.5 flex-shrink-0" />
              Think of it like a prediction pool — everyone contributes, and the winners take home the pot!
            </p>
          </div>
        </section>

        {/* How it works in 4 steps */}
        <section className="space-y-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
              <Target className="h-4 w-4 text-primary" />
            </div>
            <h3 className="font-bold text-base">How It Works — 4 Simple Steps</h3>
          </div>
          <div className="space-y-2">
            <div className="flex gap-3 p-3 rounded-lg bg-muted/30">
              <div className="w-7 h-7 rounded-full bg-primary/20 text-primary flex items-center justify-center text-xs font-bold flex-shrink-0">1</div>
              <div>
                <p className="text-sm font-semibold">Browse Markets</p>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Explore prediction markets on topics like crypto, sports, politics, tech, and more. 
                  Each market is a question about a future event.
                </p>
              </div>
            </div>
            <div className="flex gap-3 p-3 rounded-lg bg-muted/30">
              <div className="w-7 h-7 rounded-full bg-primary/20 text-primary flex items-center justify-center text-xs font-bold flex-shrink-0">2</div>
              <div>
                <p className="text-sm font-semibold">Pick Your Outcome</p>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Choose which outcome you think will happen — like "Yes" or "No", or pick from 
                  multiple options (e.g., which team will win).
                </p>
              </div>
            </div>
            <div className="flex gap-3 p-3 rounded-lg bg-muted/30">
              <div className="w-7 h-7 rounded-full bg-primary/20 text-primary flex items-center justify-center text-xs font-bold flex-shrink-0">3</div>
              <div>
                <p className="text-sm font-semibold">Buy Tickets</p>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Purchase tickets for your chosen outcome. Each ticket is your stake in the pot. 
                  The more tickets you buy, the bigger your share of the winnings if you're right.
                </p>
              </div>
            </div>
            <div className="flex gap-3 p-3 rounded-lg bg-muted/30">
              <div className="w-7 h-7 rounded-full bg-success/20 text-success flex items-center justify-center text-xs font-bold flex-shrink-0">4</div>
              <div>
                <p className="text-sm font-semibold">Win & Collect</p>
                <p className="text-xs text-muted-foreground mt-0.5">
                  When the market resolves, if your outcome is correct, you split the pot with 
                  other winners proportional to your tickets. Winnings are paid to your balance instantly.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* What makes Pollgy different */}
        <section className="space-y-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
              <Sparkles className="h-4 w-4 text-primary" />
            </div>
            <h3 className="font-bold text-base">What Makes Pollgy Different?</h3>
          </div>
          <div className="space-y-2">
            <div className="p-3 rounded-lg bg-muted/30">
              <div className="flex items-start gap-2">
                <Ticket className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-sm font-medium">Ticket-Based (Not Shares)</p>
                  <p className="text-xs text-muted-foreground">Buy tickets at a fixed price. No complex order books or fluctuating share prices to worry about.</p>
                </div>
              </div>
            </div>
            <div className="p-3 rounded-lg bg-muted/30">
              <div className="flex items-start gap-2">
                <CircleDollarSign className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-sm font-medium">Pari-Mutuel Pot System</p>
                  <p className="text-xs text-muted-foreground">All money pools together. Winners split the entire pot — the bigger the pot, the bigger the prize.</p>
                </div>
              </div>
            </div>
            <div className="p-3 rounded-lg bg-muted/30">
              <div className="flex items-start gap-2">
                <Trophy className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-sm font-medium">Weekly Draw Bonus</p>
                  <p className="text-xs text-muted-foreground">Every ticket also enters you into a weekly prize draw — win extra money just for participating!</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Key Stats */}
        <section className="grid grid-cols-3 gap-2 text-center">
          <div className="p-3 rounded-xl bg-muted/30">
            <p className="text-lg font-bold">$0.50</p>
            <p className="text-[10px] text-muted-foreground">Ticket price</p>
          </div>
          <div className="p-3 rounded-xl bg-muted/30">
            <p className="text-lg font-bold">24/7</p>
            <p className="text-[10px] text-muted-foreground">Markets open</p>
          </div>
          <div className="p-3 rounded-xl bg-muted/30">
            <p className="text-lg font-bold">Instant</p>
            <p className="text-[10px] text-muted-foreground">Payouts</p>
          </div>
        </section>
      </TabsContent>

      {/* ═══════════════════ TICKETS TAB ═══════════════════ */}
      <TabsContent value="tickets" className="mt-0 space-y-5">
        {/* Hero image */}
        <div className="rounded-xl overflow-hidden border border-border/40">
          <img src={tutorialTickets} alt="How tickets work on Pollgy" className="w-full h-auto" />
        </div>

        {/* What are tickets */}
        <section className="space-y-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
              <Ticket className="h-4 w-4 text-primary" />
            </div>
            <h3 className="font-bold text-base">What Are Tickets?</h3>
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Tickets are your stake in a prediction market. Each ticket represents your bet on a specific outcome. 
            Unlike traditional markets with fluctuating share prices, <span className="font-semibold text-foreground">all tickets cost the same fixed price</span>.
          </p>
          <div className="p-4 rounded-xl border border-border bg-muted/20 space-y-3">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Ticket price</span>
              <span className="font-bold text-foreground">$0.50 per ticket</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Minimum purchase</span>
              <span className="font-medium">1 ticket</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Maximum purchase</span>
              <span className="font-medium">1,000 tickets</span>
            </div>
          </div>
        </section>

        {/* Step-by-step: Buying tickets */}
        <section className="space-y-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-success/10 flex items-center justify-center">
              <MousePointerClick className="h-4 w-4 text-success" />
            </div>
            <h3 className="font-bold text-base">How to Buy Tickets</h3>
          </div>
          <div className="space-y-2">
            <div className="flex gap-3 p-3 rounded-lg bg-muted/30">
              <div className="w-6 h-6 rounded-full bg-success/20 text-success flex items-center justify-center text-xs font-bold flex-shrink-0">1</div>
              <div>
                <p className="text-sm font-medium">Open a Market</p>
                <p className="text-xs text-muted-foreground">Click on any market from the feed to view its details, pot size, and available outcomes.</p>
              </div>
            </div>
            <div className="flex gap-3 p-3 rounded-lg bg-muted/30">
              <div className="w-6 h-6 rounded-full bg-success/20 text-success flex items-center justify-center text-xs font-bold flex-shrink-0">2</div>
              <div>
                <p className="text-sm font-medium">Select Your Outcome</p>
                <p className="text-xs text-muted-foreground">Tap the outcome you believe will happen (e.g., "Yes", "No", or a specific option like "Lakers").</p>
              </div>
            </div>
            <div className="flex gap-3 p-3 rounded-lg bg-muted/30">
              <div className="w-6 h-6 rounded-full bg-success/20 text-success flex items-center justify-center text-xs font-bold flex-shrink-0">3</div>
              <div>
                <p className="text-sm font-medium">Choose Number of Tickets</p>
                <p className="text-xs text-muted-foreground">Use the + and − buttons or type a number. More tickets = bigger share of the pot if you win.</p>
              </div>
            </div>
            <div className="flex gap-3 p-3 rounded-lg bg-muted/30">
              <div className="w-6 h-6 rounded-full bg-success/20 text-success flex items-center justify-center text-xs font-bold flex-shrink-0">4</div>
              <div>
                <p className="text-sm font-medium">Confirm & Buy</p>
                <p className="text-xs text-muted-foreground">Review your total cost, estimated payout, and click "Buy Tickets" to confirm.</p>
              </div>
            </div>
          </div>
        </section>

        {/* What each ticket gets you */}
        <section className="space-y-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
              <Gift className="h-4 w-4 text-primary" />
            </div>
            <h3 className="font-bold text-base">What Each Ticket Gets You</h3>
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Every ticket is a <span className="font-semibold text-foreground">bundle</span> — you get two things in one purchase:
          </p>
          <div className="grid grid-cols-2 gap-3">
            <div className="p-3 rounded-lg bg-primary/5 border border-primary/20 text-center">
              <Ticket className="h-5 w-5 text-primary mx-auto mb-1.5" />
              <p className="font-semibold text-sm">Market Ticket</p>
              <p className="text-[10px] text-muted-foreground mt-0.5">Your prediction stake in the pot</p>
            </div>
            <div className="p-3 rounded-lg bg-primary/5 border border-primary/20 text-center">
              <Trophy className="h-5 w-5 text-primary mx-auto mb-1.5" />
              <p className="font-semibold text-sm">Draw Entry</p>
              <p className="text-[10px] text-muted-foreground mt-0.5">Auto-entered into the weekly draw</p>
            </div>
          </div>
          <div className="p-3 rounded-lg bg-primary/5 border border-primary/20">
            <p className="text-xs text-primary font-medium flex items-center gap-2">
              <Zap className="h-3.5 w-3.5 flex-shrink-0" />
              No separate purchase needed — every ticket includes a draw entry automatically!
            </p>
          </div>
        </section>

        {/* Where your money goes */}
        <section className="space-y-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
              <CircleDollarSign className="h-4 w-4 text-primary" />
            </div>
            <h3 className="font-bold text-base">Where Your Ticket Money Goes</h3>
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed">
            When you buy a ticket, your money is split three ways:
          </p>
          <div className="space-y-2">
            <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/30">
              <div className="w-10 h-10 rounded-full bg-primary/15 flex items-center justify-center flex-shrink-0">
                <span className="text-sm font-black text-primary">95%</span>
              </div>
              <div>
                <p className="text-sm font-semibold">Goes to the Pot</p>
                <p className="text-xs text-muted-foreground">This is the prize pool winners will split</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/30">
              <div className="w-10 h-10 rounded-full bg-primary/15 flex items-center justify-center flex-shrink-0">
                <span className="text-sm font-black text-primary">2%</span>
              </div>
              <div>
                <p className="text-sm font-semibold">Weekly Draw Fund</p>
                <p className="text-xs text-muted-foreground">Contributes to the weekly prize draw pool</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/30">
              <div className="w-10 h-10 rounded-full bg-muted-foreground/15 flex items-center justify-center flex-shrink-0">
                <span className="text-sm font-black text-muted-foreground">3%</span>
              </div>
              <div>
                <p className="text-sm font-semibold">Platform Fee</p>
                <p className="text-xs text-muted-foreground">Keeps Pollgy running (includes creator fee)</p>
              </div>
            </div>
          </div>
          {/* Visual bar */}
          <div className="flex rounded-full overflow-hidden h-3">
            <div className="h-full bg-primary" style={{ width: "95%" }} />
            <div className="h-full bg-primary/50" style={{ width: "2%" }} />
            <div className="h-full bg-muted-foreground/40" style={{ width: "3%" }} />
          </div>
          <div className="flex text-[9px] text-muted-foreground">
            <span className="flex-1">95% Pot</span>
            <span className="text-right">2% Draw · 3% Fee</span>
          </div>
        </section>

        {/* Quick example */}
        <section className="space-y-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
              <CheckCircle2 className="h-4 w-4 text-primary" />
            </div>
            <h3 className="font-bold text-base">Quick Example</h3>
          </div>
          <div className="p-4 rounded-xl border border-border bg-muted/20 space-y-4">
            <div className="text-center">
              <p className="text-sm font-semibold mb-1">"Will Bitcoin hit $100K by 2025?"</p>
              <p className="text-xs text-muted-foreground">You believe yes — so you buy 10 tickets on "Yes"</p>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex-1 p-3 rounded-lg bg-primary/10 border border-primary/30 text-center">
                <p className="text-[10px] text-muted-foreground mb-1">You spend</p>
                <p className="font-bold text-primary">10 × $0.50 = $5</p>
              </div>
              <ArrowRight className="h-4 w-4 text-muted-foreground flex-shrink-0" />
              <div className="flex-1 p-3 rounded-lg bg-muted text-center">
                <p className="text-[10px] text-muted-foreground mb-1">Of that</p>
                <p className="font-bold text-foreground">$4.75 → Pot</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2 text-center">
              <div className="p-2 rounded-lg bg-success/10">
                <p className="text-[10px] text-muted-foreground">If you're right</p>
                <p className="font-bold text-success text-sm">Split the pot! 🎉</p>
              </div>
              <div className="p-2 rounded-lg bg-destructive/10">
                <p className="text-[10px] text-muted-foreground">If you're wrong</p>
                <p className="font-bold text-destructive text-sm">You lose $5</p>
              </div>
            </div>
          </div>
        </section>
      </TabsContent>

      {/* ═══════════════════ PAYOUTS TAB ═══════════════════ */}
      <TabsContent value="payouts" className="mt-0 space-y-5">
        {/* Hero image */}
        <div className="rounded-xl overflow-hidden border border-border/40">
          <img src={tutorialPotSplit} alt="How the pot is distributed" className="w-full h-auto" />
        </div>

        {/* Pari-Mutuel explained */}
        <section className="space-y-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-success/10 flex items-center justify-center">
              <Scale className="h-4 w-4 text-success" />
            </div>
            <h3 className="font-bold text-base">How Payouts Work (Pari-Mutuel)</h3>
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Pollgy uses a <span className="font-semibold text-foreground">pari-mutuel</span> system — meaning all ticket 
            money pools together, and winners split it proportionally based on how many tickets they hold.
          </p>
          <div className="space-y-2">
            <div className="flex gap-3 p-3 rounded-lg bg-muted/30">
              <div className="w-6 h-6 rounded-full bg-success/20 text-success flex items-center justify-center text-xs font-bold flex-shrink-0">1</div>
              <div>
                <p className="text-sm font-medium">All Ticket Money → Pot</p>
                <p className="text-xs text-muted-foreground">95% of every ticket purchase goes into the market's prize pot.</p>
              </div>
            </div>
            <div className="flex gap-3 p-3 rounded-lg bg-muted/30">
              <div className="w-6 h-6 rounded-full bg-success/20 text-success flex items-center justify-center text-xs font-bold flex-shrink-0">2</div>
              <div>
                <p className="text-sm font-medium">Market Resolves</p>
                <p className="text-xs text-muted-foreground">When the event happens, the winning outcome is determined.</p>
              </div>
            </div>
            <div className="flex gap-3 p-3 rounded-lg bg-muted/30">
              <div className="w-6 h-6 rounded-full bg-success/20 text-success flex items-center justify-center text-xs font-bold flex-shrink-0">3</div>
              <div>
                <p className="text-sm font-medium">Winners Split the Pot</p>
                <p className="text-xs text-muted-foreground">Your payout = (your tickets ÷ total winning tickets) × pot</p>
              </div>
            </div>
          </div>
        </section>

        {/* Worked example */}
        <section className="space-y-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
              <DollarSign className="h-4 w-4 text-primary" />
            </div>
            <h3 className="font-bold text-base">Example Payout Calculation</h3>
          </div>
          <div className="p-4 rounded-xl border border-border bg-muted/20 space-y-4">
            <p className="text-xs text-muted-foreground text-center">Market: "Will Bitcoin hit $100K?"</p>
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm p-2 rounded-lg bg-muted/40">
                <span className="text-muted-foreground">Total Pot</span>
                <span className="font-bold">$10,000</span>
              </div>
              <div className="flex items-center justify-between text-sm p-2 rounded-lg bg-muted/40">
                <span className="text-muted-foreground">Total "Yes" tickets</span>
                <span className="font-medium">12,000</span>
              </div>
              <div className="flex items-center justify-between text-sm p-2 rounded-lg bg-muted/40">
                <span className="text-muted-foreground">Total "No" tickets</span>
                <span className="font-medium">8,000</span>
              </div>
              <div className="flex items-center justify-between text-sm p-2 rounded-lg bg-primary/10 border border-primary/20">
                <span className="text-muted-foreground">Your "Yes" tickets</span>
                <span className="font-bold text-primary">100</span>
              </div>
            </div>
            <div className="border-t border-border pt-3 space-y-2">
              <p className="text-xs font-medium text-foreground">If "Yes" wins:</p>
              <div className="p-3 rounded-lg bg-success/10 border border-success/30 text-center">
                <p className="text-xs text-muted-foreground">Your payout = (100 ÷ 12,000) × $10,000</p>
                <p className="text-xl font-black text-success mt-1">= $83.33</p>
                <p className="text-xs text-muted-foreground mt-1">You spent $50 → Profit: <span className="font-bold text-success">+$33.33</span></p>
              </div>
            </div>
            <div className="border-t border-border pt-3 space-y-1">
              <p className="text-xs font-medium text-foreground">If "No" wins instead:</p>
              <div className="p-3 rounded-lg bg-destructive/10 border border-destructive/30 text-center">
                <p className="text-xs text-muted-foreground">Your "Yes" tickets are worth $0</p>
                <p className="text-xl font-black text-destructive mt-1">Loss: -$50</p>
              </div>
            </div>
          </div>
          <div className="p-3 rounded-lg bg-primary/5 border border-primary/20">
            <p className="text-xs text-primary font-medium flex items-center gap-2">
              <Lightbulb className="h-3.5 w-3.5 flex-shrink-0" />
              The fewer people on the winning side, the more each winner gets! That's the beauty of pari-mutuel.
            </p>
          </div>
        </section>

        {/* Weekly Draw */}
        <section className="space-y-3">
          <div className="rounded-xl overflow-hidden border border-border/40">
            <img src={tutorialWeeklyDraw} alt="Weekly Draw prizes" className="w-full h-auto" />
          </div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
              <Trophy className="h-4 w-4 text-primary" />
            </div>
            <h3 className="font-bold text-base">The Weekly Draw</h3>
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed">
            2% of every ticket purchase funds a <span className="font-semibold text-foreground">weekly prize pool</span>. 
            Every Sunday, 10 random winners are selected from all ticket buyers that week.
          </p>
          <div className="space-y-2">
            <p className="text-xs font-medium">Prize Distribution:</p>
            <div className="flex rounded-full overflow-hidden h-2.5">
              <div className="h-full bg-primary" style={{ width: "50%" }} />
              <div className="h-full bg-primary/80" style={{ width: "25%" }} />
              <div className="h-full bg-primary/60" style={{ width: "15%" }} />
              <div className="h-full bg-primary/40" style={{ width: "10%" }} />
            </div>
            <div className="grid grid-cols-4 gap-1 text-center text-[9px]">
              <div>
                <p className="font-bold text-foreground">1st</p>
                <p className="text-muted-foreground">50%</p>
              </div>
              <div>
                <p className="font-bold text-foreground">2nd</p>
                <p className="text-muted-foreground">25%</p>
              </div>
              <div>
                <p className="font-bold text-foreground">3rd</p>
                <p className="text-muted-foreground">15%</p>
              </div>
              <div>
                <p className="font-bold text-foreground">4–10th</p>
                <p className="text-muted-foreground">10%</p>
              </div>
            </div>
          </div>
          <div className="p-3 rounded-lg bg-primary/5 border border-primary/20">
            <p className="text-xs text-primary font-medium flex items-center gap-2">
              <PartyPopper className="h-3.5 w-3.5 flex-shrink-0" />
              Every ticket = 1 draw entry. Buy more tickets across any market, get more chances to win!
            </p>
          </div>
        </section>

        {/* Market Resolution */}
        <section className="space-y-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-success/10 flex items-center justify-center">
              <Gavel className="h-4 w-4 text-success" />
            </div>
            <h3 className="font-bold text-base">How Markets Resolve</h3>
          </div>
          <div className="space-y-2">
            <div className="p-3 rounded-lg bg-muted/30">
              <p className="text-sm font-medium mb-1">1. Market Closes</p>
              <p className="text-xs text-muted-foreground">When the end date arrives, no more tickets can be purchased.</p>
            </div>
            <div className="p-3 rounded-lg bg-muted/30">
              <p className="text-sm font-medium mb-1">2. Creator Resolves</p>
              <p className="text-xs text-muted-foreground">The market creator (or a verified source) confirms which outcome won.</p>
            </div>
            <div className="p-3 rounded-lg bg-muted/30">
              <p className="text-sm font-medium mb-1">3. 24-Hour Dispute Window</p>
              <p className="text-xs text-muted-foreground">Users can challenge the resolution with evidence during this period.</p>
            </div>
            <div className="p-3 rounded-lg bg-success/10 border border-success/30">
              <p className="text-sm font-medium mb-1">4. Payout</p>
              <p className="text-xs text-muted-foreground">Winners receive their share of the pot automatically in their balance.</p>
            </div>
          </div>
        </section>

        {/* Disputes */}
        <section className="space-y-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-destructive/10 flex items-center justify-center">
              <AlertTriangle className="h-4 w-4 text-destructive" />
            </div>
            <h3 className="font-bold text-base">Disputes</h3>
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Think a market was resolved incorrectly? You have <span className="font-semibold text-foreground">24 hours</span> after 
            resolution to submit a dispute with evidence.
          </p>
          <div className="p-3 rounded-lg border border-destructive/30 bg-destructive/5">
            <div className="flex items-start gap-2">
              <Clock className="h-4 w-4 text-destructive mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-sm font-medium text-destructive">24-Hour Window</p>
                <p className="text-xs text-muted-foreground mt-1">
                  All disputes are reviewed by the Pollgy team. If the dispute is valid, the resolution can be reversed.
                </p>
              </div>
            </div>
          </div>
        </section>
      </TabsContent>

      {/* ═══════════════════ MONEY TAB ═══════════════════ */}
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
            Add money to your Pollgy account to start buying tickets. We support multiple payment methods:
          </p>
          <div className="grid grid-cols-2 gap-2">
            <div className="p-3 rounded-lg bg-muted/30 text-center">
              <CreditCard className="h-4 w-4 text-muted-foreground mx-auto mb-1" />
              <p className="text-sm font-medium">Credit/Debit</p>
              <p className="text-[10px] text-muted-foreground">Instant</p>
            </div>
            <div className="p-3 rounded-lg bg-muted/30 text-center">
              <Wallet className="h-4 w-4 text-muted-foreground mx-auto mb-1" />
              <p className="text-sm font-medium">Bank Transfer</p>
              <p className="text-[10px] text-muted-foreground">1-3 days</p>
            </div>
            <div className="p-3 rounded-lg bg-muted/30 text-center">
              <CircleDollarSign className="h-4 w-4 text-muted-foreground mx-auto mb-1" />
              <p className="text-sm font-medium">Crypto</p>
              <p className="text-[10px] text-muted-foreground">~15 mins</p>
            </div>
            <div className="p-3 rounded-lg bg-muted/30 text-center">
              <Zap className="h-4 w-4 text-muted-foreground mx-auto mb-1" />
              <p className="text-sm font-medium">Apple/Google Pay</p>
              <p className="text-[10px] text-muted-foreground">Instant</p>
            </div>
          </div>
        </section>

        {/* Step by step deposit */}
        <section className="space-y-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
              <MousePointerClick className="h-4 w-4 text-primary" />
            </div>
            <h3 className="font-bold text-base">How to Deposit</h3>
          </div>
          <div className="space-y-2">
            <div className="flex gap-3 p-3 rounded-lg bg-muted/30">
              <div className="w-6 h-6 rounded-full bg-primary/20 text-primary flex items-center justify-center text-xs font-bold flex-shrink-0">1</div>
              <div>
                <p className="text-sm font-medium">Click your balance or "Deposit"</p>
                <p className="text-xs text-muted-foreground">Found in the header or profile menu</p>
              </div>
            </div>
            <div className="flex gap-3 p-3 rounded-lg bg-muted/30">
              <div className="w-6 h-6 rounded-full bg-primary/20 text-primary flex items-center justify-center text-xs font-bold flex-shrink-0">2</div>
              <div>
                <p className="text-sm font-medium">Choose payment method</p>
                <p className="text-xs text-muted-foreground">Card, bank transfer, crypto, or mobile pay</p>
              </div>
            </div>
            <div className="flex gap-3 p-3 rounded-lg bg-muted/30">
              <div className="w-6 h-6 rounded-full bg-primary/20 text-primary flex items-center justify-center text-xs font-bold flex-shrink-0">3</div>
              <div>
                <p className="text-sm font-medium">Enter amount & confirm</p>
                <p className="text-xs text-muted-foreground">Funds appear in your balance instantly (for card/mobile pay)</p>
              </div>
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
            Cash out your winnings at any time. Your cash balance is always available for withdrawal.
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
              <span className="text-muted-foreground">Withdrawal fee</span>
              <span className="font-medium text-success">Free</span>
            </div>
          </div>
        </section>

        {/* Understanding your balance */}
        <section className="space-y-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
              <DollarSign className="h-4 w-4 text-primary" />
            </div>
            <h3 className="font-bold text-base">Understanding Your Balance</h3>
          </div>
          <div className="space-y-2">
            <div className="p-3 rounded-lg border border-border bg-background">
              <p className="text-sm font-semibold mb-0.5">Cash Balance</p>
              <p className="text-xs text-muted-foreground">Deposited funds + winnings. Available to buy tickets or withdraw.</p>
            </div>
            <div className="p-3 rounded-lg border border-border bg-background">
              <p className="text-sm font-semibold mb-0.5">Active Tickets</p>
              <p className="text-xs text-muted-foreground">Money tied up in tickets on unresolved markets. Not withdrawable until the market resolves.</p>
            </div>
            <div className="p-3 rounded-lg border border-primary/30 bg-primary/5">
              <p className="text-sm font-semibold text-primary mb-0.5">Total Value</p>
              <p className="text-xs text-muted-foreground">Cash Balance + Active Tickets = Your total account value</p>
            </div>
          </div>
        </section>

        {/* Fees */}
        <section className="space-y-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
              <Scale className="h-4 w-4 text-primary" />
            </div>
            <h3 className="font-bold text-base">Fees & Costs</h3>
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
              <span className="text-sm">Platform fee</span>
              <span className="text-sm font-medium">3% (built into ticket)</span>
            </div>
            <div className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
              <span className="text-sm">Weekly draw contribution</span>
              <span className="text-sm font-medium">2% (built into ticket)</span>
            </div>
            <div className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
              <span className="text-sm">Deposit fee</span>
              <span className="text-sm font-medium text-success">Free</span>
            </div>
            <div className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
              <span className="text-sm">Withdrawal fee</span>
              <span className="text-sm font-medium text-success">Free</span>
            </div>
          </div>
        </section>

        {/* Non-refundable notice */}
        <section className="p-3 rounded-lg border border-destructive/30 bg-destructive/5">
          <div className="flex items-start gap-2">
            <AlertTriangle className="h-4 w-4 text-destructive mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-sm font-medium text-destructive">Fees Are Non-Refundable</p>
              <p className="text-xs text-muted-foreground mt-1">
                If a market is canceled, your ticket cost is refunded minus any platform fees already collected. 
                The 3% platform fee and 2% weekly draw contribution are non-refundable.
              </p>
            </div>
          </div>
        </section>
      </TabsContent>

      {/* ═══════════════════ MORE TAB ═══════════════════ */}
      <TabsContent value="more" className="mt-0 space-y-5">
        {/* Creators */}
        <section className="space-y-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
              <PenTool className="h-4 w-4 text-primary" />
            </div>
            <h3 className="font-bold text-base">Become a Creator</h3>
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Creators are verified users who create and manage prediction markets. Design questions, 
            set resolution criteria, and earn a share of the platform fee from every ticket sold.
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
              <p className="text-[10px] text-muted-foreground">Approval</p>
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex gap-3 p-3 rounded-lg bg-muted/30">
              <div className="w-6 h-6 rounded-full bg-primary/20 text-primary flex items-center justify-center text-xs font-bold flex-shrink-0">1</div>
              <div>
                <p className="text-sm font-medium">Apply for Creator Status</p>
                <p className="text-xs text-muted-foreground">Go to your profile → "Become a Creator"</p>
              </div>
            </div>
            <div className="flex gap-3 p-3 rounded-lg bg-muted/30">
              <div className="w-6 h-6 rounded-full bg-primary/20 text-primary flex items-center justify-center text-xs font-bold flex-shrink-0">2</div>
              <div>
                <p className="text-sm font-medium">Complete Verification</p>
                <p className="text-xs text-muted-foreground">Verify identity & agree to creator terms</p>
              </div>
            </div>
            <div className="flex gap-3 p-3 rounded-lg bg-muted/30">
              <div className="w-6 h-6 rounded-full bg-primary/20 text-primary flex items-center justify-center text-xs font-bold flex-shrink-0">3</div>
              <div>
                <p className="text-sm font-medium">Start Creating Markets</p>
                <p className="text-xs text-muted-foreground">Once approved, create unlimited markets & earn fees</p>
              </div>
            </div>
          </div>
        </section>

        {/* Creating a market */}
        <section className="space-y-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
              <FileText className="h-4 w-4 text-primary" />
            </div>
            <h3 className="font-bold text-base">Creating a Market</h3>
          </div>
          <p className="text-sm text-muted-foreground">When creating a market, you'll need:</p>
          <ul className="space-y-2 text-sm">
            <li className="flex items-start gap-2">
              <CheckCircle2 className="h-4 w-4 text-success mt-0.5 flex-shrink-0" />
              <span><span className="font-medium">Clear question</span> — A prediction with a definitive answer</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="h-4 w-4 text-success mt-0.5 flex-shrink-0" />
              <span><span className="font-medium">Resolution criteria</span> — How the outcome will be determined</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="h-4 w-4 text-success mt-0.5 flex-shrink-0" />
              <span><span className="font-medium">End date</span> — When trading closes</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="h-4 w-4 text-success mt-0.5 flex-shrink-0" />
              <span><span className="font-medium">Category & image</span> — Helps users find your market</span>
            </li>
          </ul>
        </section>

        {/* Referral program */}
        <section className="space-y-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
              <Share2 className="h-4 w-4 text-primary" />
            </div>
            <h3 className="font-bold text-base">Refer a Friend</h3>
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Share your unique referral link and earn <span className="font-semibold text-primary">10% commission</span> on 
            platform fees from everyone you refer — for 12 months after they sign up.
          </p>
          <div className="p-3 rounded-lg bg-primary/5 border border-primary/20 text-center">
            <p className="text-2xl font-black text-primary">10%</p>
            <p className="text-xs text-muted-foreground">commission for 12 months per referral</p>
          </div>
        </section>

        {/* Community */}
        <section className="space-y-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
              <MessageSquare className="h-4 w-4 text-primary" />
            </div>
            <h3 className="font-bold text-base">Community Features</h3>
          </div>
          <div className="space-y-2">
            <div className="p-3 rounded-lg bg-muted/30">
              <p className="text-sm font-medium mb-1">Comments & Discussion</p>
              <p className="text-xs text-muted-foreground">Discuss markets, share analysis, and debate outcomes with other users</p>
            </div>
            <div className="p-3 rounded-lg bg-muted/30">
              <p className="text-sm font-medium mb-1">Follow Creators & Traders</p>
              <p className="text-xs text-muted-foreground">Follow top creators and see their latest markets in your feed</p>
            </div>
            <div className="p-3 rounded-lg bg-muted/30">
              <p className="text-sm font-medium mb-1">Community Feed</p>
              <p className="text-xs text-muted-foreground">Repost markets with your analysis and build your reputation</p>
            </div>
          </div>
        </section>

        {/* Portfolio tracking */}
        <section className="space-y-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
              <Eye className="h-4 w-4 text-primary" />
            </div>
            <h3 className="font-bold text-base">Portfolio & Tracking</h3>
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Track all your active tickets and past results in your Portfolio:
          </p>
          <ul className="space-y-2 text-sm">
            <li className="flex items-start gap-2">
              <CheckCircle2 className="h-4 w-4 text-success mt-0.5 flex-shrink-0" />
              <span>Active tickets across all markets</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="h-4 w-4 text-success mt-0.5 flex-shrink-0" />
              <span>Win/loss history and total P&L</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="h-4 w-4 text-success mt-0.5 flex-shrink-0" />
              <span>Weekly draw entries and results</span>
            </li>
          </ul>
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
              <span>24/7 fraud monitoring</span>
            </li>
          </ul>
        </section>

        {/* Need help */}
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
          <div className="flex items-center gap-3 py-4">
            <button
              onClick={() => onOpenChange(false)}
              className="h-8 w-8 rounded-full flex items-center justify-center hover:bg-muted transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
            </button>
            <h2 className="text-base font-semibold">How It Works</h2>
          </div>
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
