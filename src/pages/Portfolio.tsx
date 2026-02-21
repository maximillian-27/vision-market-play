import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { PageHeader } from "@/components/PageHeader";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { 
  DollarSign, 
  ArrowDownRight,
  ArrowUpRight,
  Wallet,
  Trophy,
  Download,
  Upload,
  ChevronRight,
  Ticket
} from "lucide-react";

// Mock data
const portfolioStats = {
  totalValue: 12450,
  cashBalance: 5230,
  totalWinnings: 1847,
};

const entries = [
  { id: 1, market: "Will Bitcoin reach $100k by 2025?", outcome: "Yes", tickets: 150, ticketPrice: 0.45, potentialPayout: 150, status: "active" },
  { id: 2, market: "Fed rate cut in March 2025?", outcome: "No", tickets: 200, ticketPrice: 0.38, potentialPayout: 200, status: "active" },
  { id: 3, market: "Tesla Q4 earnings beat?", outcome: "Yes", tickets: 100, ticketPrice: 0.55, potentialPayout: 100, status: "active" },
  { id: 4, market: "NBA Championship - Lakers?", outcome: "Lakers", tickets: 75, ticketPrice: 0.22, potentialPayout: 75, status: "active" },
];

const pastEntries = [
  { id: 1, date: "2024-01-15", market: "Bitcoin $80k by Dec?", outcome: "Yes", tickets: 50, amountPaid: 21, result: "won", payout: 50 },
  { id: 2, date: "2024-01-14", market: "Fed holds rates in Jan?", outcome: "Yes", tickets: 100, amountPaid: 58, result: "won", payout: 100 },
  { id: 3, date: "2024-01-13", market: "Tesla beats Q3 earnings?", outcome: "Yes", tickets: 100, amountPaid: 55, result: "lost", payout: 0 },
  { id: 4, date: "2024-01-12", market: "ETH above $3k by Nov?", outcome: "No", tickets: 80, amountPaid: 28, result: "won", payout: 80 },
  { id: 5, date: "2024-01-10", market: "Lakers win game 5?", outcome: "Yes", tickets: 75, amountPaid: 16.5, result: "pending", payout: null },
];

const transactions = [
  { id: 1, date: "2024-01-15", type: "Deposit", method: "Bank Transfer", amount: 500, status: "Completed" },
  { id: 2, date: "2024-01-10", type: "Deposit", method: "Credit Card", amount: 250, status: "Completed" },
  { id: 3, date: "2024-01-05", type: "Withdrawal", method: "Bank Transfer", amount: 100, status: "Completed" },
  { id: 4, date: "2023-12-28", type: "Deposit", method: "Crypto", amount: 1000, status: "Completed" },
];

const Portfolio = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background pb-20 sm:pb-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
        <PageHeader 
          title="Portfolio" 
          subtitle="Your entries and balances"
        />

        {/* Stats Overview */}
        <div className="grid grid-cols-3 gap-2 sm:gap-4 mb-4 sm:mb-6">
          <Card className="border-border/40">
            <CardContent className="p-3 sm:p-4">
              <div className="flex items-center gap-1.5 text-muted-foreground text-[11px] sm:text-sm mb-0.5 sm:mb-1">
                <Wallet className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                Total Value
              </div>
              <p className="text-lg sm:text-2xl font-bold">${portfolioStats.totalValue.toLocaleString()}</p>
            </CardContent>
          </Card>
          
          <Card className="border-border/40">
            <CardContent className="p-3 sm:p-4">
              <div className="flex items-center gap-1.5 text-muted-foreground text-[11px] sm:text-sm mb-0.5 sm:mb-1">
                <DollarSign className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                Cash
              </div>
              <p className="text-lg sm:text-2xl font-bold">${portfolioStats.cashBalance.toLocaleString()}</p>
            </CardContent>
          </Card>

          <Card className="border-border/40">
            <CardContent className="p-3 sm:p-4">
              <div className="flex items-center gap-1.5 text-muted-foreground text-[11px] sm:text-sm mb-0.5 sm:mb-1">
                <Trophy className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                Winnings
              </div>
              <p className="text-lg sm:text-2xl font-bold text-success">+${portfolioStats.totalWinnings.toLocaleString()}</p>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="flex gap-2 sm:gap-3 mb-4 sm:mb-6">
          <Button size="sm" className="gap-1.5 sm:gap-2 text-xs sm:text-sm flex-1 sm:flex-none">
            <Upload className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
            Deposit
          </Button>
          <Button variant="outline" size="sm" className="gap-1.5 sm:gap-2 text-xs sm:text-sm flex-1 sm:flex-none">
            <Download className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
            Withdraw
          </Button>
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="entries" className="space-y-4 sm:space-y-6">
          <TabsList className="bg-muted/50 p-1 w-full grid grid-cols-3">
            <TabsTrigger value="entries" className="data-[state=active]:bg-background text-xs sm:text-sm">
              My Entries
            </TabsTrigger>
            <TabsTrigger value="past" className="data-[state=active]:bg-background text-xs sm:text-sm">
              Past Entries
            </TabsTrigger>
            <TabsTrigger value="transactions" className="data-[state=active]:bg-background text-xs sm:text-sm">
              Deposits
            </TabsTrigger>
          </TabsList>

          {/* My Entries */}
          <TabsContent value="entries" className="space-y-3 sm:space-y-4">
            <h3 className="text-sm sm:text-lg font-semibold">Active ({entries.length})</h3>

            <div className="space-y-2 sm:space-y-3">
              {entries.map((entry) => (
                <Card 
                  key={entry.id} 
                  className="border-border/40 hover:border-border/60 transition-colors cursor-pointer active:scale-[0.99]"
                  onClick={() => navigate(`/market/${entry.id}`)}
                >
                  <CardContent className="p-3 sm:p-4">
                    {/* Mobile */}
                    <div className="sm:hidden">
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <p className="font-medium text-sm leading-tight line-clamp-2 flex-1">{entry.market}</p>
                        <ChevronRight className="h-4 w-4 text-muted-foreground flex-shrink-0 mt-0.5" />
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Badge 
                            variant="secondary"
                            className="text-[10px] px-1.5 bg-primary/10 text-primary border-primary/20"
                          >
                            {entry.outcome}
                          </Badge>
                          <span className="text-[11px] text-muted-foreground flex items-center gap-1">
                            <Ticket className="h-3 w-3" />
                            {entry.tickets} tickets
                          </span>
                        </div>
                        <span className="text-sm font-bold text-success">
                          Wins ${entry.potentialPayout}
                        </span>
                      </div>
                    </div>
                    
                    {/* Desktop */}
                    <div className="hidden sm:flex items-center justify-between">
                      <div className="flex-1">
                        <p className="font-medium mb-1">{entry.market}</p>
                        <div className="flex items-center gap-3 text-sm text-muted-foreground">
                          <Badge variant="secondary" className="text-xs bg-primary/10 text-primary border-primary/20">
                            {entry.outcome}
                          </Badge>
                          <span className="flex items-center gap-1">
                            <Ticket className="h-3.5 w-3.5" />
                            {entry.tickets} tickets
                          </span>
                        </div>
                      </div>
                      <div className="text-right flex items-center gap-4">
                        <span className="text-lg font-bold text-success">
                          If {entry.outcome} wins: ${entry.potentialPayout}
                        </span>
                        <ChevronRight className="h-4 w-4 text-muted-foreground" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Past Entries */}
          <TabsContent value="past" className="space-y-3 sm:space-y-4">
            <h3 className="text-sm sm:text-lg font-semibold">Past Entries</h3>

            {/* Mobile: Card layout */}
            <div className="sm:hidden space-y-2">
              {pastEntries.map((entry) => (
                <div key={entry.id} className="p-3 rounded-lg border border-border/40 bg-background">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-sm truncate">{entry.market}</p>
                      <p className="text-[10px] text-muted-foreground">{entry.date}</p>
                    </div>
                    <Badge 
                      variant="secondary" 
                      className={`text-[9px] px-1.5 h-5 ${
                        entry.result === 'won' ? 'bg-success/10 text-success' : 
                        entry.result === 'lost' ? 'bg-destructive/10 text-destructive' : 
                        'bg-muted text-muted-foreground'
                      }`}
                    >
                      {entry.result === 'won' ? `Won $${entry.payout}` : entry.result === 'lost' ? 'Lost' : 'Pending'}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-2 text-[10px] text-muted-foreground">
                    <span>{entry.outcome}</span>
                    <span>•</span>
                    <span>{entry.tickets} tickets</span>
                    <span>•</span>
                    <span>Paid ${entry.amountPaid}</span>
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
                      <th className="p-4 font-medium">Market</th>
                      <th className="p-4 font-medium">Outcome</th>
                      <th className="p-4 font-medium">Tickets</th>
                      <th className="p-4 font-medium">Paid</th>
                      <th className="p-4 font-medium text-right">Result</th>
                    </tr>
                  </thead>
                  <tbody>
                    {pastEntries.map((entry) => (
                      <tr key={entry.id} className="border-b border-border/20 hover:bg-muted/30 transition-colors">
                        <td className="p-4 text-sm">{entry.date}</td>
                        <td className="p-4 text-sm font-medium">{entry.market}</td>
                        <td className="p-4 text-sm">{entry.outcome}</td>
                        <td className="p-4 text-sm">{entry.tickets}</td>
                        <td className="p-4 text-sm">${entry.amountPaid}</td>
                        <td className="p-4 text-right">
                          <Badge 
                            variant="secondary"
                            className={`text-xs ${
                              entry.result === 'won' ? 'bg-success/10 text-success' : 
                              entry.result === 'lost' ? 'bg-destructive/10 text-destructive' : 
                              'bg-muted text-muted-foreground'
                            }`}
                          >
                            {entry.result === 'won' ? `Won $${entry.payout}` : entry.result === 'lost' ? 'Lost' : 'Pending'}
                          </Badge>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          </TabsContent>

          {/* Transactions */}
          <TabsContent value="transactions" className="space-y-3 sm:space-y-4">
            <div className="flex items-center justify-between gap-2">
              <h3 className="text-sm sm:text-lg font-semibold">Deposits & Withdrawals</h3>
              <div className="flex gap-1.5 sm:gap-2">
                <Button size="sm" className="gap-1 h-7 sm:h-8 text-[10px] sm:text-xs px-2 sm:px-3">
                  <Upload className="h-3 w-3 sm:h-4 sm:w-4" />
                  <span className="hidden sm:inline">Deposit</span>
                  <span className="sm:hidden">+</span>
                </Button>
                <Button variant="outline" size="sm" className="gap-1 h-7 sm:h-8 text-[10px] sm:text-xs px-2 sm:px-3">
                  <Download className="h-3 w-3 sm:h-4 sm:w-4" />
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
                      <p className="text-[10px] text-muted-foreground">{tx.date} • {tx.method}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className={`font-bold text-sm ${tx.type === "Deposit" ? 'text-success' : 'text-destructive'}`}>
                      {tx.type === "Deposit" ? '+' : '-'}${tx.amount}
                    </p>
                    <Badge variant="secondary" className="text-[8px] px-1 h-4">
                      {tx.status}
                    </Badge>
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
                          <Badge variant="secondary" className="text-xs">
                            {tx.status}
                          </Badge>
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
