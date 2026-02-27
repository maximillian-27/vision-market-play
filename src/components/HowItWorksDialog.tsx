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
  Crown,
  BarChart3,
  Heart,
  Award,
  UserPlus,
  Settings,
  Bell,
  History,
} from "lucide-react";

interface HowItWorksDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

/* ────────── Reusable section helpers ────────── */
function SectionIcon({ icon: Icon, color = "primary" }: { icon: any; color?: string }) {
  const colorMap: Record<string, string> = {
    primary: "bg-primary/10 text-primary",
    success: "bg-success/10 text-success",
    amber: "bg-amber-500/10 text-amber-500",
    destructive: "bg-destructive/10 text-destructive",
  };
  return (
    <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${colorMap[color]}`}>
      <Icon className="h-4 w-4" />
    </div>
  );
}

function SectionHeader({ icon, title, color }: { icon: any; title: string; color?: string }) {
  return (
    <div className="flex items-center gap-2">
      <SectionIcon icon={icon} color={color} />
      <h3 className="font-bold text-base">{title}</h3>
    </div>
  );
}

function Step({ n, title, desc }: { n: number; title: string; desc: string }) {
  return (
    <div className="flex gap-3 p-3 rounded-lg bg-muted/30">
      <div className="w-6 h-6 rounded-full bg-success/20 text-success flex items-center justify-center text-xs font-bold flex-shrink-0">{n}</div>
      <div>
        <p className="text-sm font-medium">{title}</p>
        <p className="text-xs text-muted-foreground">{desc}</p>
      </div>
    </div>
  );
}

function Callout({ icon: Icon, children, variant = "primary" }: { icon: any; children: React.ReactNode; variant?: string }) {
  const styles: Record<string, string> = {
    primary: "bg-primary/5 border-primary/20 text-primary",
    amber: "bg-amber-500/5 border-amber-500/20 text-amber-500",
    success: "bg-success/5 border-success/20 text-success",
    destructive: "bg-destructive/5 border-destructive/20 text-destructive",
  };
  return (
    <div className={`p-3 rounded-lg border ${styles[variant]}`}>
      <p className="text-xs font-medium flex items-start gap-2">
        <Icon className="h-3.5 w-3.5 mt-0.5 flex-shrink-0" />
        <span>{children}</span>
      </p>
    </div>
  );
}

function HighlightBox({ children, variant = "success" }: { children: React.ReactNode; variant?: string }) {
  const styles: Record<string, string> = {
    success: "bg-success/10 border-success/30",
    primary: "bg-primary/10 border-primary/30",
    amber: "bg-amber-500/10 border-amber-500/30",
  };
  return <div className={`p-3 rounded-lg border text-center ${styles[variant]}`}>{children}</div>;
}

export function HowItWorksDialog({ open, onOpenChange }: HowItWorksDialogProps) {
  const isMobile = useIsMobile();

  const content = (
    <Tabs defaultValue="start" className="w-full">
      <TabsList className="w-full grid grid-cols-4 sm:grid-cols-7 mb-4 h-auto p-1 gap-0.5">
        <TabsTrigger value="start" className="text-[10px] sm:text-xs py-2 px-1">
          <BookOpen className="h-3.5 w-3.5 mr-1 hidden sm:inline" />
          Start
        </TabsTrigger>
        <TabsTrigger value="tickets" className="text-[10px] sm:text-xs py-2 px-1">
          <Ticket className="h-3.5 w-3.5 mr-1 hidden sm:inline" />
          Tickets
        </TabsTrigger>
        <TabsTrigger value="payouts" className="text-[10px] sm:text-xs py-2 px-1">
          <Calculator className="h-3.5 w-3.5 mr-1 hidden sm:inline" />
          Payouts
        </TabsTrigger>
        <TabsTrigger value="draw" className="text-[10px] sm:text-xs py-2 px-1">
          <Trophy className="h-3.5 w-3.5 mr-1 hidden sm:inline" />
          Draw
        </TabsTrigger>
        <TabsTrigger value="creators" className="text-[10px] sm:text-xs py-2 px-1">
          <PenTool className="h-3.5 w-3.5 mr-1 hidden sm:inline" />
          Creators
        </TabsTrigger>
        <TabsTrigger value="community" className="text-[10px] sm:text-xs py-2 px-1">
          <Users className="h-3.5 w-3.5 mr-1 hidden sm:inline" />
          Community
        </TabsTrigger>
        <TabsTrigger value="account" className="text-[10px] sm:text-xs py-2 px-1">
          <Wallet className="h-3.5 w-3.5 mr-1 hidden sm:inline" />
          Account
        </TabsTrigger>
      </TabsList>

      {/* ═══════════ GETTING STARTED ═══════════ */}
      <TabsContent value="start" className="mt-0 space-y-5">
        <section className="space-y-3">
          <SectionHeader icon={TrendingUp} title="What is Pollgy?" />
          <p className="text-sm text-muted-foreground leading-relaxed">
            Pollgy is a prediction market where you bet on real-world events. Pick an outcome, buy tickets, 
            and if you're right — <span className="font-semibold text-foreground">you split the entire prize pot</span> with other winners.
          </p>
          <Callout icon={Lightbulb}>
            It's called a pari-mutuel system — the same trusted model behind horse racing and lottery pools. 
            Simple, fair, and completely transparent.
          </Callout>
        </section>

        <section className="space-y-3">
          <SectionHeader icon={Target} title="How It Works in 4 Steps" />
          <div className="space-y-2">
            <Step n={1} title="Pick a market" desc='Browse questions like "Will Bitcoin hit $100K?" or "Who wins the Super Bowl?"' />
            <Step n={2} title="Choose your side & buy tickets" desc="Each ticket starts at just $0.50. Buy as many as you believe in." />
            <Step n={3} title="Wait for the result" desc="When the event happens, the market resolves and the winning outcome is confirmed." />
            <Step n={4} title="Winners take the pot 💰" desc="95% of ALL ticket sales go to the winners. The more tickets you hold, the bigger your share." />
          </div>
        </section>

        {/* Converting quick example */}
        <section className="space-y-3">
          <SectionHeader icon={CheckCircle2} title="See It In Action" color="amber" />
          <div className="p-4 rounded-xl border border-border bg-muted/20 space-y-4">
            <div className="text-center">
              <p className="text-sm font-semibold mb-1">"Will Bitcoin hit $100K by July 2026?"</p>
              <p className="text-xs text-muted-foreground">200 people buy tickets · 120 say Yes · 80 say No</p>
            </div>
            <div className="grid grid-cols-3 gap-2 text-center">
              <div className="p-2.5 rounded-lg bg-muted/40">
                <p className="text-[10px] text-muted-foreground mb-0.5">Total tickets</p>
                <p className="font-bold text-sm">200</p>
              </div>
              <div className="p-2.5 rounded-lg bg-muted/40">
                <p className="text-[10px] text-muted-foreground mb-0.5">Price each</p>
                <p className="font-bold text-sm">$0.50</p>
              </div>
              <div className="p-2.5 rounded-lg bg-primary/10">
                <p className="text-[10px] text-muted-foreground mb-0.5">Prize pot</p>
                <p className="font-bold text-sm text-primary">$95</p>
              </div>
            </div>
            <div className="space-y-2">
              <HighlightBox variant="success">
                <p className="text-[10px] text-muted-foreground mb-0.5">You bought 10 "Yes" tickets ($5.00)</p>
                <p className="text-xs text-muted-foreground">If Yes wins: (10 ÷ 120) × $95 =</p>
                <p className="font-bold text-success text-lg">$7.92</p>
                <p className="text-xs font-semibold text-success">+$2.92 profit (+58%)</p>
              </HighlightBox>
            </div>
            <Callout icon={Zap} variant="primary">
              Plus, each of your 10 tickets is also an entry into the Weekly Draw — a second chance to win prizes every Sunday!
            </Callout>
          </div>
        </section>

        {/* Key stats */}
        <section className="grid grid-cols-3 gap-2 text-center">
          <div className="p-3 rounded-xl bg-success/10 border border-success/20">
            <p className="text-lg font-black text-success">95%</p>
            <p className="text-[10px] text-muted-foreground">Goes to winners</p>
          </div>
          <div className="p-3 rounded-xl bg-primary/10 border border-primary/20">
            <p className="text-lg font-black text-primary">$0.50</p>
            <p className="text-[10px] text-muted-foreground">Starting price</p>
          </div>
          <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20">
            <p className="text-lg font-black text-amber-500">2×</p>
            <p className="text-[10px] text-muted-foreground">Ways to win</p>
          </div>
        </section>
      </TabsContent>

      {/* ═══════════ TICKETS & PRICING ═══════════ */}
      <TabsContent value="tickets" className="mt-0 space-y-5">
        <section className="space-y-3">
          <SectionHeader icon={Ticket} title="What is a Ticket?" />
          <p className="text-sm text-muted-foreground leading-relaxed">
            A ticket is your prediction on a specific outcome. Each ticket costs a flat <span className="font-semibold text-foreground">$0.50</span> base price. 
            No order books, no price fluctuation — just pick a side and buy.
          </p>
          <Callout icon={Zap}>
            Every ticket is a bundle: you get a <span className="font-semibold">market prediction ticket</span> + a <span className="font-semibold">Weekly Draw entry</span>. 
            Two chances to win from one purchase!
          </Callout>
        </section>

        <section className="space-y-3">
          <SectionHeader icon={DollarSign} title="Where Your Money Goes" color="success" />
          <p className="text-sm text-muted-foreground">Every ticket purchase is split transparently:</p>
          <div className="space-y-2">
            <div className="p-3 rounded-lg bg-success/10 border border-success/30">
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm font-semibold text-success">🏆 Prize Pot</span>
                <span className="text-sm font-bold text-success">95% ($0.475)</span>
              </div>
              <p className="text-xs text-muted-foreground">Directly into the prize pool. Winners split this entire amount.</p>
            </div>
            <div className="p-3 rounded-lg bg-amber-500/10 border border-amber-500/30">
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm font-semibold text-amber-500">🎟️ Weekly Draw</span>
                <span className="text-sm font-bold text-amber-500">2% ($0.01)</span>
              </div>
              <p className="text-xs text-muted-foreground">Funds the weekly prize draw. Your ticket is an automatic entry.</p>
            </div>
            <div className="p-3 rounded-lg bg-muted/30 border border-border/50">
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm font-semibold">Platform Fee</span>
                <span className="text-sm font-bold">3% ($0.015)</span>
              </div>
              <p className="text-xs text-muted-foreground">Keeps Pollgy running — servers, support, and development.</p>
            </div>
          </div>
          <div>
            <div className="flex rounded-full overflow-hidden h-3 shadow-inner shadow-black/10">
              <div className="h-full bg-success" style={{ width: "95%" }} />
              <div className="h-full bg-amber-500" style={{ width: "2%" }} />
              <div className="h-full bg-muted-foreground/30" style={{ width: "3%" }} />
            </div>
            <div className="flex items-center justify-between mt-1.5 text-[10px] text-muted-foreground">
              <span><span className="font-semibold text-success">95%</span> Pot</span>
              <span><span className="font-semibold text-amber-500">2%</span> Draw</span>
              <span><span className="font-semibold">3%</span> Fee</span>
            </div>
          </div>
        </section>

        {/* Time-weighted pricing */}
        <section className="space-y-3">
          <SectionHeader icon={Clock} title="Time-Weighted Pricing" />
          <p className="text-sm text-muted-foreground leading-relaxed">
            Ticket prices <span className="font-semibold text-foreground">increase as the deadline approaches</span>. 
            This rewards early conviction and prevents last-minute "sure thing" plays.
          </p>
          <div className="space-y-2">
            <div className="p-3 rounded-lg bg-success/10 border border-success/30 flex items-start gap-3">
              <div className="w-7 h-7 rounded-full bg-success/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                <Bird className="h-3.5 w-3.5 text-success" />
              </div>
              <div>
                <p className="text-sm font-semibold text-success">Early Bird — $0.50/ticket</p>
                <p className="text-xs text-muted-foreground mt-0.5">
                  More than 1 month out. Lowest price, highest potential profit. You're rewarded for predicting early when the outcome is most uncertain.
                </p>
              </div>
            </div>
            <div className="p-3 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-start gap-3">
              <div className="w-7 h-7 rounded-full bg-amber-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                <Clock className="h-3.5 w-3.5 text-amber-500" />
              </div>
              <div>
                <p className="text-sm font-semibold text-amber-500">Good Timing — ~$0.75/ticket</p>
                <p className="text-xs text-muted-foreground mt-0.5">
                  1 week to 1 month left. Moderate price with decent returns. More info is available, but you pay a slight premium.
                </p>
              </div>
            </div>
            <div className="p-3 rounded-lg bg-destructive/10 border border-destructive/30 flex items-start gap-3">
              <div className="w-7 h-7 rounded-full bg-destructive/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                <Flame className="h-3.5 w-3.5 text-destructive" />
              </div>
              <div>
                <p className="text-sm font-semibold text-destructive">Late Entry — $1.25+/ticket</p>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Less than 1 week left. Highest price — potential profit may be minimal or even negative. The outcome is nearly known.
                </p>
              </div>
            </div>
          </div>
          <Callout icon={Lightbulb} variant="amber">
            <span className="font-bold">Pro tip:</span> Look for the green "Early Bird" badge on market cards — those offer the best value!
          </Callout>
        </section>

        {/* Multiple outcomes */}
        <section className="space-y-3">
          <SectionHeader icon={Scale} title="Multiple Outcomes" />
          <p className="text-sm text-muted-foreground leading-relaxed">
            Markets aren't just Yes/No. Some have multiple outcomes — e.g., "Who wins the NBA Finals?" with 8+ teams. 
            Markets with more outcomes tend to have <span className="font-semibold text-foreground">bigger pots and higher returns</span>, 
            since tickets are spread across more options.
          </p>
          <div className="p-4 rounded-xl border border-border bg-muted/20">
            <p className="text-sm font-semibold text-center mb-3">"Who will win the 2026 NBA Finals?"</p>
            <div className="grid grid-cols-2 gap-1.5">
              {["Celtics 35%", "Thunder 22%", "Knicks 15%", "Lakers 10%", "Nuggets 8%", "Others 10%"].map((t) => {
                const [team, pct] = t.split(" ");
                return (
                  <div key={team} className="flex items-center justify-between p-2 rounded-lg bg-muted/40 text-xs">
                    <span className="font-medium">{team}</span>
                    <span className="text-muted-foreground">{pct}</span>
                  </div>
                );
              })}
            </div>
            <p className="text-[10px] text-muted-foreground text-center mt-2">
              Betting on an underdog like Lakers (10%) means fewer winners to share the pot = <span className="font-semibold text-success">much higher payout per ticket</span>
            </p>
          </div>
        </section>
      </TabsContent>

      {/* ═══════════ PAYOUTS ═══════════ */}
      <TabsContent value="payouts" className="mt-0 space-y-5">
        <section className="space-y-3">
          <SectionHeader icon={Calculator} title="How Payouts Work" />
          <p className="text-sm text-muted-foreground leading-relaxed">
            Pollgy uses a <span className="font-semibold text-foreground">pari-mutuel</span> system. All ticket sales go into a shared pot, 
            and winners split it proportionally based on how many winning tickets they hold.
          </p>
          <div className="p-4 rounded-xl border border-primary/30 bg-primary/5">
            <p className="text-xs text-muted-foreground mb-2">The formula is simple:</p>
            <div className="text-center py-2">
              <p className="text-sm font-bold text-foreground">
                Your Payout = <span className="text-primary">(Your Winning Tickets ÷ Total Winning Tickets)</span> × Prize Pot
              </p>
            </div>
            <p className="text-xs text-muted-foreground mt-2 text-center">
              The Prize Pot is 95% of all ticket sales (after 2% draw + 3% platform fee).
            </p>
          </div>
        </section>

        {/* Detailed worked example */}
        <section className="space-y-3">
          <SectionHeader icon={CheckCircle2} title="Full Worked Example" color="success" />
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
                <span className="text-muted-foreground">Prize Pot (95%)</span>
                <span className="font-bold text-success">$475</span>
              </div>
            </div>

            <div className="border-t border-border pt-3">
              <p className="text-xs font-medium text-foreground mb-2">Ticket distribution:</p>
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
              <p className="text-xs font-medium text-foreground">Scenario: You bought 10 "Yes" tickets ($5.00)</p>
              <div className="p-3 rounded-lg bg-success/10 border border-success/30">
                <p className="text-xs text-muted-foreground mb-1">If "Yes" wins:</p>
                <p className="text-sm font-medium">(10 ÷ 600) × $475 = <span className="font-bold text-success">$7.92</span></p>
                <p className="text-xs text-muted-foreground mt-1">Cost: $5.00 → Profit: <span className="font-semibold text-success">+$2.92 (+58%)</span></p>
              </div>
            </div>

            <div className="border-t border-border pt-3 space-y-2">
              <p className="text-xs font-medium text-foreground">Scenario: You bought 10 "No" tickets instead ($5.00)</p>
              <div className="p-3 rounded-lg bg-primary/10 border border-primary/30">
                <p className="text-xs text-muted-foreground mb-1">If "No" wins (underdog):</p>
                <p className="text-sm font-medium">(10 ÷ 400) × $475 = <span className="font-bold text-primary">$11.88</span></p>
                <p className="text-xs text-muted-foreground mt-1">Cost: $5.00 → Profit: <span className="font-semibold text-primary">+$6.88 (+138%) 🔥</span></p>
              </div>
            </div>
          </div>
        </section>

        {/* Key insights */}
        <section className="space-y-3">
          <SectionHeader icon={Lightbulb} title="Key Insights" color="amber" />
          <div className="space-y-2">
            <div className="p-3 rounded-lg bg-success/10 border border-success/20">
              <p className="text-sm font-medium mb-1 text-success">🎯 Fewer winners = bigger payout</p>
              <p className="text-xs text-muted-foreground">
                Betting on the underdog and winning means fewer people to share the pot with. Each winning ticket is worth significantly more.
              </p>
            </div>
            <div className="p-3 rounded-lg bg-primary/10 border border-primary/20">
              <p className="text-sm font-medium mb-1 text-primary">📈 More tickets = bigger share</p>
              <p className="text-xs text-muted-foreground">
                The more winning tickets you hold, the larger your portion of the pot. It's fully proportional.
              </p>
            </div>
            <div className="p-3 rounded-lg bg-muted/30">
              <p className="text-sm font-medium mb-1">🛡️ You can never lose more than you spend</p>
              <p className="text-xs text-muted-foreground">
                If your outcome doesn't win, you lose the tickets you bought — nothing more. No margin calls, no hidden fees, no debt.
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
                Your tickets become worth $0 and the money becomes part of the winners' pot. 
                <span className="font-medium text-foreground"> But your Weekly Draw entries are still valid</span> — you could still win prizes every Sunday!
              </p>
            </div>
          </div>
        </section>
      </TabsContent>

      {/* ═══════════ WEEKLY DRAW ═══════════ */}
      <TabsContent value="draw" className="mt-0 space-y-5">
        <section className="space-y-3">
          <SectionHeader icon={Trophy} title="The Weekly Draw" color="amber" />
          <p className="text-sm text-muted-foreground leading-relaxed">
            Every ticket you buy on Pollgy is <span className="font-semibold text-foreground">automatically an entry into the Weekly Draw</span>. 
            2% of every ticket purchase funds a growing prize pool that's distributed every Sunday to 10 lucky winners.
          </p>
          
          {/* Prize highlight */}
          <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 text-center space-y-2">
            <Trophy className="h-8 w-8 text-amber-500 mx-auto" />
            <p className="text-2xl font-black text-foreground">$48,600+</p>
            <p className="text-xs text-muted-foreground">Last week's total prize pool</p>
          </div>
        </section>

        <section className="space-y-3">
          <SectionHeader icon={Gift} title="How It Works" color="success" />
          <div className="space-y-2">
            <Step n={1} title="Buy any ticket" desc="Every ticket you buy on any market automatically gives you one draw entry. No extra cost." />
            <Step n={2} title="Entries accumulate" desc="Buy 10 tickets across different markets? That's 10 draw entries for the week. More tickets = more chances." />
            <Step n={3} title="Sunday draw" desc="Every Sunday, 10 winners are randomly selected from all entries that week." />
            <Step n={4} title="Prizes distributed" desc="Winners receive their share automatically in their cash balance. No action needed!" />
          </div>
        </section>

        <section className="space-y-3">
          <SectionHeader icon={Star} title="Prize Distribution" />
          <div className="space-y-2">
            <div className="flex items-center justify-between p-3 rounded-lg bg-amber-500/10 border border-amber-500/30">
              <div className="flex items-center gap-2">
                <Crown className="h-4 w-4 text-amber-500" />
                <span className="text-sm font-bold">1st Place</span>
              </div>
              <span className="text-sm font-bold text-amber-500">50% of pool</span>
            </div>
            <div className="flex items-center justify-between p-3 rounded-lg bg-muted/40">
              <span className="text-sm font-medium">2nd Place</span>
              <span className="text-sm font-bold">25% of pool</span>
            </div>
            <div className="flex items-center justify-between p-3 rounded-lg bg-muted/40">
              <span className="text-sm font-medium">3rd Place</span>
              <span className="text-sm font-bold">15% of pool</span>
            </div>
            <div className="flex items-center justify-between p-3 rounded-lg bg-muted/40">
              <span className="text-sm font-medium">4th–10th Place</span>
              <span className="text-sm font-bold">10% shared equally</span>
            </div>
          </div>
        </section>

        {/* Example */}
        <section className="space-y-3">
          <SectionHeader icon={Calculator} title="Example: $48,600 Pool" color="amber" />
          <div className="p-4 rounded-xl border border-border bg-muted/20 space-y-2">
            <div className="flex items-center justify-between p-2.5 rounded-lg bg-amber-500/10 border border-amber-500/30">
              <div className="flex items-center gap-2"><Crown className="h-3.5 w-3.5 text-amber-500" /><span className="text-sm font-medium">1st Place</span></div>
              <span className="font-bold text-amber-500">$24,300</span>
            </div>
            <div className="flex items-center justify-between p-2.5 rounded-lg bg-muted/40">
              <span className="text-sm">2nd Place</span><span className="font-bold">$12,150</span>
            </div>
            <div className="flex items-center justify-between p-2.5 rounded-lg bg-muted/40">
              <span className="text-sm">3rd Place</span><span className="font-bold">$7,290</span>
            </div>
            <div className="flex items-center justify-between p-2.5 rounded-lg bg-muted/40">
              <span className="text-sm">4th–10th (each)</span><span className="font-bold">$694</span>
            </div>
          </div>
        </section>

        <Callout icon={Zap} variant="success">
          Even if you lose every market prediction, your draw entries are <span className="font-semibold">still valid</span>. 
          The Weekly Draw is your safety net — a second chance to win every single week!
        </Callout>
      </TabsContent>

      {/* ═══════════ CREATORS ═══════════ */}
      <TabsContent value="creators" className="mt-0 space-y-5">
        <section className="space-y-3">
          <SectionHeader icon={PenTool} title="What Are Creators?" />
          <p className="text-sm text-muted-foreground leading-relaxed">
            Creators are verified users who build and manage prediction markets on Pollgy. They design the questions, 
            set resolution criteria, and are responsible for resolving markets fairly. Think of them as 
            <span className="font-semibold text-foreground"> market makers</span> — they create the games everyone plays.
          </p>
        </section>

        <section className="space-y-3">
          <SectionHeader icon={BadgeCheck} title="What Creators Do" color="success" />
          <div className="space-y-2">
            <div className="flex gap-3 p-3 rounded-lg bg-muted/30">
              <Target className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-sm font-medium">Create markets</p>
                <p className="text-xs text-muted-foreground">Design prediction questions on trending topics — sports, politics, crypto, entertainment, and more.</p>
              </div>
            </div>
            <div className="flex gap-3 p-3 rounded-lg bg-muted/30">
              <Gavel className="h-4 w-4 text-amber-500 mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-sm font-medium">Resolve markets fairly</p>
                <p className="text-xs text-muted-foreground">Confirm the winning outcome within 48 hours of the event. A 24-hour dispute window ensures fairness.</p>
              </div>
            </div>
            <div className="flex gap-3 p-3 rounded-lg bg-muted/30">
              <Users className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-sm font-medium">Build an audience</p>
                <p className="text-xs text-muted-foreground">Grow followers, engage with players, and build a reputation as a trusted market creator.</p>
              </div>
            </div>
            <div className="flex gap-3 p-3 rounded-lg bg-success/10 border border-success/20">
              <DollarSign className="h-4 w-4 text-success mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-sm font-medium text-success">Earn from engagement</p>
                <p className="text-xs text-muted-foreground">Creators earn a share of activity generated by their markets. More popular markets = more earnings.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="space-y-3">
          <SectionHeader icon={UserPlus} title="Become a Creator" color="amber" />
          <p className="text-sm text-muted-foreground leading-relaxed">
            Anyone can apply to become a creator. Our team reviews applications within 24 hours.
          </p>
          <div className="space-y-2">
            <Step n={1} title="Apply from your profile" desc="Click 'Become a Creator' in your profile settings or on any creator badge." />
            <Step n={2} title="Choose your topics" desc="Select the categories you're most knowledgeable about (sports, tech, politics, etc.)." />
            <Step n={3} title="Get verified" desc="Our team reviews your application. Once approved, you'll see the ✓ badge on your profile." />
            <Step n={4} title="Start creating" desc="Build your first market and start attracting players to your predictions!" />
          </div>
        </section>

        <section className="space-y-3">
          <SectionHeader icon={BarChart3} title="Creator Dashboard" />
          <p className="text-sm text-muted-foreground leading-relaxed">
            Creators get a dedicated dashboard with analytics on their markets:
          </p>
          <div className="grid grid-cols-2 gap-2">
            <div className="p-3 rounded-lg bg-muted/30 text-center">
              <p className="text-lg font-bold">👥</p>
              <p className="text-xs font-medium">Followers</p>
            </div>
            <div className="p-3 rounded-lg bg-muted/30 text-center">
              <p className="text-lg font-bold">👁️</p>
              <p className="text-xs font-medium">Views</p>
            </div>
            <div className="p-3 rounded-lg bg-muted/30 text-center">
              <p className="text-lg font-bold">🎮</p>
              <p className="text-xs font-medium">Unique Players</p>
            </div>
            <div className="p-3 rounded-lg bg-muted/30 text-center">
              <p className="text-lg font-bold">🔁</p>
              <p className="text-xs font-medium">Repeat Rate</p>
            </div>
          </div>
        </section>
      </TabsContent>

      {/* ═══════════ COMMUNITY ═══════════ */}
      <TabsContent value="community" className="mt-0 space-y-5">
        <section className="space-y-3">
          <SectionHeader icon={MessageSquare} title="Community & Social" />
          <p className="text-sm text-muted-foreground leading-relaxed">
            Pollgy isn't just about betting — it's a <span className="font-semibold text-foreground">social platform for predictions</span>. 
            Share your takes, debate outcomes, and follow the sharpest predictors.
          </p>
        </section>

        <section className="space-y-3">
          <SectionHeader icon={Heart} title="Social Features" color="success" />
          <div className="space-y-2">
            <div className="p-3 rounded-lg bg-muted/30">
              <p className="text-sm font-medium mb-1">💬 Comments & Discussion</p>
              <p className="text-xs text-muted-foreground">Every market has a comment section. Share analysis, debate outcomes, and challenge other players' reasoning.</p>
            </div>
            <div className="p-3 rounded-lg bg-muted/30">
              <p className="text-sm font-medium mb-1">👥 Follow Players</p>
              <p className="text-xs text-muted-foreground">Find players with great track records and follow them. See their activity, predictions, and win rates in your feed.</p>
            </div>
            <div className="p-3 rounded-lg bg-muted/30">
              <p className="text-sm font-medium mb-1">🔄 Repost & Share</p>
              <p className="text-xs text-muted-foreground">Quote-repost interesting markets with your own take. Build your reputation as a thought leader.</p>
            </div>
            <div className="p-3 rounded-lg bg-muted/30">
              <p className="text-sm font-medium mb-1">📝 Community Posts</p>
              <p className="text-xs text-muted-foreground">Share thoughts, analysis, and predictions outside of specific markets. Build your following.</p>
            </div>
          </div>
        </section>

        <section className="space-y-3">
          <SectionHeader icon={Award} title="Leaderboards" color="amber" />
          <p className="text-sm text-muted-foreground leading-relaxed">
            Compete with other players and climb the rankings. Leaderboards track your performance across multiple metrics:
          </p>
          <div className="space-y-2">
            <div className="p-3 rounded-lg bg-amber-500/10 border border-amber-500/20">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">🏆 Top Winners</span>
                <span className="text-xs text-muted-foreground">Highest total winnings</span>
              </div>
            </div>
            <div className="p-3 rounded-lg bg-muted/30">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">🎯 Best Win Rate</span>
                <span className="text-xs text-muted-foreground">Highest % of correct predictions</span>
              </div>
            </div>
            <div className="p-3 rounded-lg bg-muted/30">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">🔥 Win Streaks</span>
                <span className="text-xs text-muted-foreground">Longest consecutive wins</span>
              </div>
            </div>
            <div className="p-3 rounded-lg bg-muted/30">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">⭐ Top Creators</span>
                <span className="text-xs text-muted-foreground">Most popular market creators</span>
              </div>
            </div>
          </div>
          <Callout icon={Sparkles} variant="amber">
            Top-ranked players get special profile badges and increased visibility in the community!
          </Callout>
        </section>
      </TabsContent>

      {/* ═══════════ ACCOUNT ═══════════ */}
      <TabsContent value="account" className="mt-0 space-y-5">
        <section className="space-y-3">
          <SectionHeader icon={Wallet} title="Your Account" />
          <p className="text-sm text-muted-foreground leading-relaxed">
            Everything you need to manage your funds, track your predictions, and control your experience.
          </p>
        </section>

        {/* Balance */}
        <section className="space-y-3">
          <SectionHeader icon={DollarSign} title="Your Balance" color="success" />
          <div className="space-y-2">
            <div className="p-3 rounded-lg border border-border bg-background">
              <span className="text-sm font-semibold">💵 Cash Balance</span>
              <p className="text-xs text-muted-foreground mt-0.5">Available for buying tickets or withdrawing. Winnings are added here automatically.</p>
            </div>
            <div className="p-3 rounded-lg border border-border bg-background">
              <span className="text-sm font-semibold">🎟️ Active Tickets</span>
              <p className="text-xs text-muted-foreground mt-0.5">Tickets in open markets. Their value depends on whether your outcome wins.</p>
            </div>
            <div className="p-3 rounded-lg border border-primary/30 bg-primary/5">
              <span className="text-sm font-semibold text-primary">📊 Total Value</span>
              <p className="text-xs text-muted-foreground mt-0.5">Cash + active tickets = your total account worth.</p>
            </div>
          </div>
        </section>

        {/* Deposits */}
        <section className="space-y-3">
          <SectionHeader icon={CreditCard} title="Depositing Funds" />
          <p className="text-sm text-muted-foreground">Add funds using any of these methods:</p>
          <div className="grid grid-cols-2 gap-2">
            <div className="p-3 rounded-lg bg-muted/30 text-center">
              <p className="text-sm font-medium">💳 Card</p>
              <p className="text-xs text-muted-foreground">Instant</p>
            </div>
            <div className="p-3 rounded-lg bg-muted/30 text-center">
              <p className="text-sm font-medium">🏦 Bank</p>
              <p className="text-xs text-muted-foreground">1-3 days</p>
            </div>
            <div className="p-3 rounded-lg bg-muted/30 text-center">
              <p className="text-sm font-medium">₿ Crypto</p>
              <p className="text-xs text-muted-foreground">~15 mins</p>
            </div>
            <div className="p-3 rounded-lg bg-muted/30 text-center">
              <p className="text-sm font-medium">📱 Apple/Google</p>
              <p className="text-xs text-muted-foreground">Instant</p>
            </div>
          </div>
        </section>

        {/* Withdrawals */}
        <section className="space-y-3">
          <SectionHeader icon={Wallet} title="Withdrawals" />
          <p className="text-sm text-muted-foreground">Cash out your winnings anytime:</p>
          <div className="p-3 rounded-lg bg-muted/30 space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Minimum</span>
              <span className="font-medium">$10</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Processing</span>
              <span className="font-medium">1-3 business days</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Fees</span>
              <span className="font-medium text-success">Free</span>
            </div>
          </div>
        </section>

        {/* Portfolio */}
        <section className="space-y-3">
          <SectionHeader icon={BarChart3} title="Your Portfolio" color="amber" />
          <p className="text-sm text-muted-foreground leading-relaxed">
            Track all your predictions in one place. Your portfolio shows:
          </p>
          <div className="space-y-2">
            <div className="p-3 rounded-lg bg-muted/30">
              <p className="text-sm font-medium mb-1">Active Markets</p>
              <p className="text-xs text-muted-foreground">Markets you're currently participating in with ticket counts and potential winnings.</p>
            </div>
            <div className="p-3 rounded-lg bg-muted/30">
              <p className="text-sm font-medium mb-1">Past Results</p>
              <p className="text-xs text-muted-foreground">Full history of your predictions — wins, losses, and total profit/loss.</p>
            </div>
            <div className="p-3 rounded-lg bg-muted/30">
              <p className="text-sm font-medium mb-1">Performance Stats</p>
              <p className="text-xs text-muted-foreground">Win rate, total winnings, markets entered, and your current win streak.</p>
            </div>
          </div>
        </section>

        {/* Fees */}
        <section className="space-y-3">
          <SectionHeader icon={Percent} title="Fee Summary" />
          <div className="space-y-2">
            <div className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
              <span className="text-sm">Ticket split</span>
              <span className="text-sm font-medium">95% / 2% / 3%</span>
            </div>
            <div className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
              <span className="text-sm">Deposits</span>
              <span className="text-sm font-medium text-success">Free</span>
            </div>
            <div className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
              <span className="text-sm">Withdrawals</span>
              <span className="text-sm font-medium text-success">Free</span>
            </div>
            <div className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
              <span className="text-sm">Account</span>
              <span className="text-sm font-medium text-success">Free</span>
            </div>
          </div>
          <Callout icon={Shield} variant="success">
            <span className="font-bold">No hidden fees.</span> The 95/2/3 split is applied once at purchase. 
            No trading, selling, or resolution fees.
          </Callout>
        </section>

        {/* Safety */}
        <section className="space-y-3">
          <SectionHeader icon={Shield} title="Safety & Security" color="success" />
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
