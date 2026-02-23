import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { PageHeader } from "@/components/PageHeader";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Trophy, 
  Ticket, 
  Target, 
  Timer,
  Wallet,
  Upload,
  Download,
  ArrowUpRight,
  ArrowDownRight,
  ChevronRight,
  Flame,
  Zap,
  TrendingUp,
  Search
} from "lucide-react";

// Mock data - ticket/gambling model
const balance = 5230;

const winningsByPeriod = {
  "1d": { winnings: 128, spent: 45 },
  "7d": { winnings: 261, spent: 120 },
  "30d": { winnings: 1420, spent: 680 },
  "90d": { winnings: 2890, spent: 1450 },
  "all": { winnings: 3847, spent: 2190 },
};

type WinningsPeriod = keyof typeof winningsByPeriod;

const quickStats = {
  activeEntries: 4,
  marketsWon: 12,
  winRate: 67,
  biggestWin: 1240,
  streak: 3, // current win streak
};

const entries = [
  { id: 1, market: "Will Bitcoin reach $100k by 2025?", outcome: "Yes", tickets: 15, ticketPrice: 3, potentialPayout: 82, endsIn: "2d 14h", timePercent: 65, image: "🪙" },
  { id: 2, market: "Fed rate cut in March 2025?", outcome: "No", tickets: 20, ticketPrice: 2.5, potentialPayout: 114, endsIn: "5d 8h", timePercent: 40, image: "🏛️" },
  { id: 3, market: "Lakers win NBA Championship?", outcome: "Yes", tickets: 10, ticketPrice: 4, potentialPayout: 156, endsIn: "3w 2d", timePercent: 12, image: "🏀" },
  { id: 4, market: "AI replaces 50% of customer service by 2026?", outcome: "Yes", tickets: 8, ticketPrice: 5, potentialPayout: 67, endsIn: "1d 6h", timePercent: 82, image: "🤖" },
];

const pastEntries = [
  { id: 1, market: "Tesla Q4 earnings beat?", outcome: "Yes", result: "won" as const, spent: 45, payout: 128, date: "Jan 15" },
  { id: 2, market: "Snow in NYC before Christmas?", outcome: "Yes", result: "won" as const, spent: 30, payout: 72, date: "Dec 24" },
  { id: 3, market: "Apple foldable iPhone in 2024?", outcome: "Yes", result: "lost" as const, spent: 50, payout: 0, date: "Dec 31" },
  { id: 4, market: "SpaceX Starship successful landing?", outcome: "No", result: "won" as const, spent: 25, payout: 61, date: "Dec 20" },
  { id: 5, market: "Gold price above $2100?", outcome: "Yes", result: "lost" as const, spent: 40, payout: 0, date: "Dec 15" },
];

const transactions = [
  { id: 1, date: "Jan 15, 2025", type: "Deposit", method: "Bank Transfer", amount: 500, status: "Completed" },
  { id: 2, date: "Jan 10, 2025", type: "Deposit", method: "Credit Card", amount: 250, status: "Completed" },
  { id: 3, date: "Jan 05, 2025", type: "Withdrawal", method: "Bank Transfer", amount: 100, status: "Completed" },
  { id: 4, date: "Dec 28, 2024", type: "Deposit", method: "Crypto", amount: 1000, status: "Completed" },
];

// Computed stats for past entries
const pastTotalSpent = pastEntries.reduce((sum, e) => sum + e.spent, 0);
const pastTotalWon = pastEntries.reduce((sum, e) => sum + e.payout, 0);
const pastNet = pastTotalWon - pastTotalSpent;

const Portfolio = () => {
  const navigate = useNavigate();
  const [winPeriod, setWinPeriod] = useState<WinningsPeriod>("all");

  const currentWin = winningsByPeriod[winPeriod];
  const netProfit = currentWin.winnings - currentWin.spent;

  const totalAtStake = entries.reduce((sum, e) => sum + e.tickets * e.ticketPrice, 0);
  const totalPotentialPayout = entries.reduce((sum, e) => sum + e.potentialPayout, 0);

  return (
    <div className="min-h-screen bg-background pb-20 sm:pb-6">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-4 sm:py-6">
        <PageHeader title="Portfolio" subtitle="Your balance, entries & winnings" />

        {/* Balance + Winnings + Net Profit */}
        <div className="grid grid-cols-2 gap-2 sm:gap-3 mb-2 sm:mb-3">
          <Card className="border-border/40">
            <CardContent className="p-3 sm:p-4">
              <div className="flex items-center gap-1.5 text-muted-foreground text-[11px] sm:text-xs mb-1">
                <Wallet className="h-3.5 w-3.5" />
                Balance
              </div>
              <p className="text-xl sm:text-2xl font-bold tracking-tight">${balance.toLocaleString()}</p>
              <div className="flex gap-1.5 mt-2.5">
                <Button size="sm" className="h-7 text-[10px] sm:text-xs px-2.5 gap-1">
                  <Upload className="h-3 w-3" />
                  Deposit
                </Button>
                <Button variant="outline" size="sm" className="h-7 text-[10px] sm:text-xs px-2.5 gap-1">
                  <Download className="h-3 w-3" />
                  Withdraw
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="border-border/40">
            <CardContent className="p-3 sm:p-4">
              <div className="flex items-center justify-between mb-1">
                <div className="flex items-center gap-1.5 text-muted-foreground text-[11px] sm:text-xs">
                  <Trophy className="h-3.5 w-3.5" />
                  Winnings
                </div>
                <div className="flex gap-0.5">
                  {(["1d", "7d", "30d", "90d", "all"] as WinningsPeriod[]).map((p) => (
                    <button
                      key={p}
                      onClick={() => setWinPeriod(p)}
                      className={`px-1.5 py-0.5 text-[8px] sm:text-[9px] font-medium rounded transition-colors ${
                        winPeriod === p
                          ? "bg-primary/10 text-primary"
                          : "text-muted-foreground/50 hover:text-muted-foreground"
                      }`}
                    >
                      {p === "all" ? "All" : p.toUpperCase()}
                    </button>
                  ))}
                </div>
              </div>
              <p className="text-xl sm:text-2xl font-bold text-success tracking-tight">${currentWin.winnings.toLocaleString()}</p>
              <span className={`text-[10px] sm:text-xs font-medium flex items-center gap-0.5 mt-1 ${netProfit >= 0 ? 'text-success/70' : 'text-destructive'}`}>
                <TrendingUp className="h-3 w-3" />
                {netProfit >= 0 ? '+' : ''}${netProfit.toLocaleString()} net
              </span>
            </CardContent>
          </Card>
        </div>

        {/* Quick Stats Strip */}
        <div className="grid grid-cols-4 gap-1.5 sm:gap-2 mb-4 sm:mb-5">
          {[
            { label: "Active", value: quickStats.activeEntries, icon: <Ticket className="h-3 w-3" /> },
            { label: "Won", value: quickStats.marketsWon, icon: <Trophy className="h-3 w-3" /> },
            { label: "Win Rate", value: `${quickStats.winRate}%`, icon: <Target className="h-3 w-3" /> },
            { label: "Streak", value: `🔥 ${quickStats.streak}`, icon: null },
          ].map((stat) => (
            <div key={stat.label} className="rounded-lg border border-border/30 bg-muted/30 py-2 px-1.5 sm:px-2 text-center">
              <p className="text-xs sm:text-base font-bold leading-tight">{stat.value}</p>
              <div className="flex items-center justify-center gap-0.5 text-muted-foreground mt-0.5">
                {stat.icon}
                <span className="text-[9px] sm:text-[10px]">{stat.label}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <Tabs defaultValue="entries" className="space-y-3 sm:space-y-4">
          <TabsList className="bg-muted/50 p-1 w-full grid grid-cols-3">
            <TabsTrigger value="entries" className="data-[state=active]:bg-background text-xs sm:text-sm gap-1.5">
              My Entries
              <span className="bg-primary/10 text-primary text-[9px] font-semibold px-1.5 py-0.5 rounded-full">{entries.length}</span>
            </TabsTrigger>
            <TabsTrigger value="past" className="data-[state=active]:bg-background text-xs sm:text-sm gap-1.5">
              Past
              <span className="bg-muted-foreground/10 text-muted-foreground text-[9px] font-semibold px-1.5 py-0.5 rounded-full">{pastEntries.length}</span>
            </TabsTrigger>
            <TabsTrigger value="wallet" className="data-[state=active]:bg-background text-xs sm:text-sm">
              Wallet
            </TabsTrigger>
          </TabsList>

          {/* My Entries */}
          <TabsContent value="entries" className="space-y-2 sm:space-y-2.5">
            {/* Summary bar */}
            <div className="flex items-center justify-between px-1 text-[11px] text-muted-foreground mb-1">
              <span>${totalAtStake} at stake across {entries.length} markets</span>
              <span className="text-success font-medium">Potential: ${totalPotentialPayout}</span>
            </div>

            {entries.map((entry) => (
              <Card
                key={entry.id}
                className="border-border/40 hover:border-border/60 transition-colors cursor-pointer active:scale-[0.995]"
                onClick={() => navigate(`/market/${entry.id}`)}
              >
                <CardContent className="p-3 sm:p-4">
                  <div className="flex items-start gap-3">
                    <span className="text-xl sm:text-2xl flex-shrink-0 mt-0.5">{entry.image}</span>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <p className="font-medium text-[13px] sm:text-sm leading-tight line-clamp-2">{entry.market}</p>
                        <ChevronRight className="h-4 w-4 text-muted-foreground/50 flex-shrink-0 mt-0.5" />
                      </div>
                      <div className="flex flex-wrap items-center gap-2 mt-1.5">
                        <Badge
                          variant={entry.outcome === "Yes" ? "default" : "destructive"}
                          className={`text-[10px] px-1.5 ${entry.outcome === "Yes" ? "bg-success/15 text-success border-success/30" : ""}`}
                        >
                          {entry.outcome}
                        </Badge>
                        <span className="text-[10px] sm:text-[11px] text-muted-foreground">
                          {entry.tickets} tickets · ${(entry.tickets * entry.ticketPrice).toFixed(0)}
                        </span>
                      </div>
                      <div className="flex items-center justify-between mt-2">
                        <span className="text-[11px] sm:text-xs font-semibold text-success">
                          Win: ${entry.potentialPayout}
                        </span>
                        <span className="text-[10px] text-muted-foreground flex items-center gap-1">
                          <Timer className="h-2.5 w-2.5" />
                          {entry.endsIn}
                        </span>
                      </div>
                      {/* Time remaining bar */}
                      <div className="mt-1.5">
                        <Progress value={entry.timePercent} className="h-[3px] bg-muted/60" />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}

            {/* Browse more CTA */}
            <button
              onClick={() => navigate('/')}
              className="w-full py-3 rounded-xl border border-dashed border-border/50 text-muted-foreground hover:text-foreground hover:border-border transition-colors flex items-center justify-center gap-2 text-xs"
            >
              <Search className="h-3.5 w-3.5" />
              Browse more markets
            </button>
          </TabsContent>

          {/* Past Entries */}
          <TabsContent value="past" className="space-y-2 sm:space-y-2.5">
            {/* Summary */}
            <div className="flex items-center justify-between rounded-lg bg-muted/40 px-3 py-2 mb-1">
              <div className="text-[11px] text-muted-foreground">
                <span className="font-medium text-foreground">{pastEntries.filter(e => e.result === 'won').length}</span> won · <span className="font-medium text-foreground">{pastEntries.filter(e => e.result === 'lost').length}</span> lost
              </div>
              <span className={`text-[11px] font-semibold ${pastNet >= 0 ? 'text-success' : 'text-destructive'}`}>
                {pastNet >= 0 ? '+' : ''}${pastNet} net
              </span>
            </div>

            {pastEntries.map((entry) => (
              <div key={entry.id} className="p-3 rounded-xl border border-border/40 bg-card">
                <div className="flex items-center justify-between gap-2 mb-1.5">
                  <p className="font-medium text-[13px] sm:text-sm truncate flex-1">{entry.market}</p>
                  <Badge
                    variant={entry.result === "won" ? "success" : "destructive"}
                    className="text-[10px] px-2 flex-shrink-0"
                  >
                    {entry.result === "won" ? "Won" : "Lost"}
                  </Badge>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Badge variant="outline" className="text-[9px] px-1.5 h-4">{entry.outcome}</Badge>
                    <span>${entry.spent} spent</span>
                    <span className="text-muted-foreground/40">·</span>
                    <span className="text-muted-foreground/70">{entry.date}</span>
                  </div>
                  <span className={`font-bold ${entry.result === "won" ? "text-success" : "text-muted-foreground/50"}`}>
                    {entry.result === "won" ? `+$${entry.payout}` : "$0"}
                  </span>
                </div>
              </div>
            ))}
          </TabsContent>

          {/* Wallet */}
          <TabsContent value="wallet" className="space-y-3 sm:space-y-4">
            <div className="flex items-center justify-between gap-2">
              <h3 className="text-sm sm:text-base font-semibold">Deposits & Withdrawals</h3>
              <div className="flex gap-1.5">
                <Button size="sm" className="gap-1 h-7 sm:h-8 text-[10px] sm:text-xs px-2 sm:px-3">
                  <Upload className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
                  <span className="hidden sm:inline">Deposit</span>
                  <span className="sm:hidden">+</span>
                </Button>
                <Button variant="outline" size="sm" className="gap-1 h-7 sm:h-8 text-[10px] sm:text-xs px-2 sm:px-3">
                  <Download className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
                  <span className="hidden sm:inline">Withdraw</span>
                  <span className="sm:hidden">-</span>
                </Button>
              </div>
            </div>

            {/* Mobile: Card layout */}
            <div className="sm:hidden space-y-2">
              {transactions.map((tx) => (
                <div key={tx.id} className="p-3 rounded-lg border border-border/40 bg-background flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2.5">
                    <div className={`h-8 w-8 rounded-full flex items-center justify-center ${tx.type === "Deposit" ? 'bg-success/10' : 'bg-destructive/10'}`}>
                      {tx.type === "Deposit" ? (
                        <ArrowDownRight className="h-4 w-4 text-success" />
                      ) : (
                        <ArrowUpRight className="h-4 w-4 text-destructive" />
                      )}
                    </div>
                    <div>
                      <p className="font-medium text-sm">{tx.type}</p>
                      <p className="text-[10px] text-muted-foreground">{tx.date} · {tx.method}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className={`font-bold text-sm ${tx.type === "Deposit" ? 'text-success' : 'text-destructive'}`}>
                      {tx.type === "Deposit" ? '+' : '-'}${tx.amount}
                    </p>
                    <Badge variant="secondary" className="text-[8px] px-1 h-4">{tx.status}</Badge>
                  </div>
                </div>
              ))}
            </div>

            {/* Desktop: Table layout */}
            <Card className="border-border/40 hidden sm:block">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border/40 text-left text-sm text-muted-foreground">
                      <th className="p-4 font-medium">Date</th>
                      <th className="p-4 font-medium">Type</th>
                      <th className="p-4 font-medium">Method</th>
                      <th className="p-4 font-medium">Amount</th>
                      <th className="p-4 font-medium">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {transactions.map((tx) => (
                      <tr key={tx.id} className="border-b border-border/20 hover:bg-muted/30 transition-colors">
                        <td className="p-4 text-sm">{tx.date}</td>
                        <td className="p-4">
                          <div className="flex items-center gap-2">
                            {tx.type === "Deposit" ? (
                              <ArrowDownRight className="h-4 w-4 text-success" />
                            ) : (
                              <ArrowUpRight className="h-4 w-4 text-destructive" />
                            )}
                            <span className="text-sm">{tx.type}</span>
                          </div>
                        </td>
                        <td className="p-4 text-sm">{tx.method}</td>
                        <td className={`p-4 text-sm font-medium ${tx.type === "Deposit" ? 'text-success' : 'text-destructive'}`}>
                          {tx.type === "Deposit" ? '+' : '-'}${tx.amount}
                        </td>
                        <td className="p-4">
                          <Badge variant="secondary" className="text-xs">{tx.status}</Badge>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Portfolio;
