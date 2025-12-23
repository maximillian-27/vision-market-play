import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { PageHeader } from "@/components/PageHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  ArrowUpRight, 
  ArrowDownRight,
  Clock,
  Wallet,
  PieChart,
  BarChart3,
  Download,
  Upload,
  Filter,
  ChevronRight
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Mock data
const portfolioStats = {
  totalValue: 12450,
  cashBalance: 5230,
  investedAmount: 7220,
  totalPnL: 1847,
  totalPnLPercent: 17.4,
  todayPnL: 234,
  todayPnLPercent: 1.9,
};

const positions = [
  { id: 1, market: "Will Bitcoin reach $100k by 2025?", position: "Yes", shares: 150, avgPrice: 0.45, currentPrice: 0.62, pnl: 25.5, pnlPercent: 37.8 },
  { id: 2, market: "Fed rate cut in March 2025?", position: "No", shares: 200, avgPrice: 0.38, currentPrice: 0.41, pnl: 6, pnlPercent: 7.9 },
  { id: 3, market: "Tesla Q4 earnings beat?", position: "Yes", shares: 100, avgPrice: 0.55, currentPrice: 0.48, pnl: -7, pnlPercent: -12.7 },
  { id: 4, market: "NBA Championship - Lakers?", position: "Yes", shares: 75, avgPrice: 0.22, currentPrice: 0.28, pnl: 4.5, pnlPercent: 27.3 },
];

const tradeHistory = [
  { id: 1, date: "2024-01-15", market: "Bitcoin $100k", type: "Buy", position: "Yes", shares: 50, price: 0.42, total: 21, pnl: null },
  { id: 2, date: "2024-01-14", market: "Fed rate cut", type: "Sell", position: "Yes", shares: 100, price: 0.58, total: 58, pnl: 12 },
  { id: 3, date: "2024-01-13", market: "Tesla earnings", type: "Buy", position: "Yes", shares: 100, price: 0.55, total: 55, pnl: null },
  { id: 4, date: "2024-01-12", market: "Bitcoin $100k", type: "Sell", position: "No", shares: 80, price: 0.35, total: 28, pnl: -8 },
  { id: 5, date: "2024-01-10", market: "NBA Championship", type: "Buy", position: "Yes", shares: 75, price: 0.22, total: 16.5, pnl: null },
];

const transactions = [
  { id: 1, date: "2024-01-15", type: "Deposit", method: "Bank Transfer", amount: 500, status: "Completed" },
  { id: 2, date: "2024-01-10", type: "Deposit", method: "Credit Card", amount: 250, status: "Completed" },
  { id: 3, date: "2024-01-05", type: "Withdrawal", method: "Bank Transfer", amount: 100, status: "Completed" },
  { id: 4, date: "2023-12-28", type: "Deposit", method: "Crypto", amount: 1000, status: "Completed" },
];

const Portfolio = () => {
  const [timeframe, setTimeframe] = useState("all");
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8 py-4 sm:py-6">
        <PageHeader 
          title="Portfolio" 
          subtitle="Track your trading performance and manage your funds"
        />

        {/* Stats Overview - Mobile optimized */}
        <div className="grid grid-cols-2 gap-2 sm:gap-4 mb-4 sm:mb-6">
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
                <TrendingUp className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                Win Rate
              </div>
              <p className="text-lg sm:text-2xl font-bold text-success">68%</p>
            </CardContent>
          </Card>
          
          <Card className="border-border/40">
            <CardContent className="p-3 sm:p-4">
              <div className="flex items-center gap-1.5 text-muted-foreground text-[11px] sm:text-sm mb-0.5 sm:mb-1">
                <BarChart3 className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                P&L
              </div>
              <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap">
                <p className={`text-lg sm:text-2xl font-bold ${portfolioStats.totalPnL >= 0 ? 'text-success' : 'text-destructive'}`}>
                  {portfolioStats.totalPnL >= 0 ? '+' : ''}${portfolioStats.totalPnL.toLocaleString()}
                </p>
                <Badge variant={portfolioStats.totalPnLPercent >= 0 ? "default" : "destructive"} className="text-[10px] sm:text-xs px-1.5">
                  {portfolioStats.totalPnLPercent >= 0 ? '+' : ''}{portfolioStats.totalPnLPercent}%
                </Badge>
              </div>
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
        <Tabs defaultValue="positions" className="space-y-4 sm:space-y-6">
          <div className="overflow-x-auto -mx-3 px-3 sm:mx-0 sm:px-0 scrollbar-hide">
            <TabsList className="bg-muted/50 p-1 w-max sm:w-auto">
              <TabsTrigger value="positions" className="data-[state=active]:bg-background text-xs sm:text-sm px-2.5 sm:px-3">
                Positions
              </TabsTrigger>
              <TabsTrigger value="history" className="data-[state=active]:bg-background text-xs sm:text-sm px-2.5 sm:px-3">
                History
              </TabsTrigger>
              <TabsTrigger value="transactions" className="data-[state=active]:bg-background text-xs sm:text-sm px-2.5 sm:px-3">
                Deposits
              </TabsTrigger>
              <TabsTrigger value="analytics" className="data-[state=active]:bg-background text-xs sm:text-sm px-2.5 sm:px-3">
                Analytics
              </TabsTrigger>
            </TabsList>
          </div>

          {/* Active Positions */}
          <TabsContent value="positions" className="space-y-3 sm:space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm sm:text-lg font-semibold">Active ({positions.length})</h3>
              <Select value={timeframe} onValueChange={setTimeframe}>
                <SelectTrigger className="w-24 sm:w-32 h-8 sm:h-9 text-xs sm:text-sm">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Time</SelectItem>
                  <SelectItem value="month">This Month</SelectItem>
                  <SelectItem value="week">This Week</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2 sm:space-y-3">
              {positions.map((position) => (
                <Card 
                  key={position.id} 
                  className="border-border/40 hover:border-border/60 transition-colors cursor-pointer active:scale-[0.99]"
                  onClick={() => navigate(`/market/${position.id}`)}
                >
                  <CardContent className="p-3 sm:p-4">
                    {/* Mobile: Stacked layout */}
                    <div className="sm:hidden">
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <p className="font-medium text-sm leading-tight line-clamp-2 flex-1">{position.market}</p>
                        <ChevronRight className="h-4 w-4 text-muted-foreground flex-shrink-0 mt-0.5" />
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Badge 
                            variant={position.position === "Yes" ? "default" : "secondary"} 
                            className={`text-[10px] px-1.5 ${position.position === "Yes" ? "bg-success/15 text-success border-success/30" : ""}`}
                          >
                            {position.position}
                          </Badge>
                          <span className="text-[11px] text-muted-foreground">{position.shares} @ ${position.avgPrice}</span>
                        </div>
                        <div className={`flex items-center gap-1 ${position.pnl >= 0 ? 'text-success' : 'text-destructive'}`}>
                          <span className="text-sm font-bold">
                            {position.pnl >= 0 ? '+' : ''}${Math.abs(position.pnl).toFixed(0)}
                          </span>
                          <span className="text-[10px] font-medium opacity-80">
                            {position.pnlPercent >= 0 ? '+' : ''}{position.pnlPercent}%
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    {/* Desktop: Row layout */}
                    <div className="hidden sm:flex items-center justify-between">
                      <div className="flex-1">
                        <p className="font-medium mb-1">{position.market}</p>
                        <div className="flex items-center gap-3 text-sm text-muted-foreground">
                          <Badge variant={position.position === "Yes" ? "default" : "secondary"} className="text-xs">
                            {position.position}
                          </Badge>
                          <span>{position.shares} shares @ ${position.avgPrice}</span>
                          <span className="text-muted-foreground/60">→</span>
                          <span>Now ${position.currentPrice}</span>
                        </div>
                      </div>
                      <div className="text-right flex items-center gap-4">
                        <div className={`flex items-center gap-1.5 ${position.pnl >= 0 ? 'text-success' : 'text-destructive'}`}>
                          {position.pnl >= 0 ? <ArrowUpRight className="h-4 w-4" /> : <ArrowDownRight className="h-4 w-4" />}
                          <span className="text-lg font-bold">
                            {position.pnl >= 0 ? '+' : ''}${Math.abs(position.pnl).toFixed(0)}
                          </span>
                          <span className="text-sm font-medium opacity-75">
                            {position.pnlPercent >= 0 ? '+' : ''}{position.pnlPercent}%
                          </span>
                        </div>
                        <ChevronRight className="h-4 w-4 text-muted-foreground" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Trade History */}
          <TabsContent value="history" className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">Trade History</h3>
              <Button variant="outline" size="sm" className="gap-2">
                <Filter className="h-4 w-4" />
                Filter
              </Button>
            </div>

            <Card className="border-border/40">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border/40 text-left text-sm text-muted-foreground">
                      <th className="p-4 font-medium">Date</th>
                      <th className="p-4 font-medium">Market</th>
                      <th className="p-4 font-medium">Type</th>
                      <th className="p-4 font-medium">Position</th>
                      <th className="p-4 font-medium">Shares</th>
                      <th className="p-4 font-medium">Price</th>
                      <th className="p-4 font-medium text-right">Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {tradeHistory.map((trade) => {
                      const isProfit = trade.pnl !== null && trade.pnl > 0;
                      const isLoss = trade.pnl !== null && trade.pnl < 0;
                      
                      return (
                        <tr key={trade.id} className="border-b border-border/20 hover:bg-muted/30 transition-colors">
                          <td className="p-4 text-sm">{trade.date}</td>
                          <td className="p-4 text-sm font-medium">{trade.market}</td>
                          <td className="p-4">
                            <Badge variant={trade.type === "Buy" ? "default" : "secondary"} className="text-xs">
                              {trade.type}
                            </Badge>
                          </td>
                          <td className="p-4 text-sm">{trade.position}</td>
                          <td className="p-4 text-sm">{trade.shares}</td>
                          <td className="p-4 text-sm">${trade.price}</td>
                          <td className="p-4 text-right">
                            <div className="flex flex-col items-end">
                              <span className={`text-sm font-semibold ${
                                isProfit ? 'text-success' : isLoss ? 'text-destructive' : ''
                              }`}>
                                ${trade.total}
                              </span>
                              {trade.pnl !== null && (
                                <span className={`text-xs ${isProfit ? 'text-success' : 'text-destructive'}`}>
                                  {isProfit ? '+' : ''}${trade.pnl}
                                </span>
                              )}
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </Card>
          </TabsContent>

          {/* Transactions */}
          <TabsContent value="transactions" className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">Deposits & Withdrawals</h3>
              <div className="flex gap-2">
                <Button size="sm" className="gap-2">
                  <Upload className="h-4 w-4" />
                  Deposit
                </Button>
                <Button variant="outline" size="sm" className="gap-2">
                  <Download className="h-4 w-4" />
                  Withdraw
                </Button>
              </div>
            </div>

            <Card className="border-border/40">
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

          {/* Analytics */}
          <TabsContent value="analytics" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <Card className="border-border/40">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Win Rate</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-bold text-success">68%</p>
                  <p className="text-sm text-muted-foreground">Based on 47 resolved markets</p>
                </CardContent>
              </Card>

              <Card className="border-border/40">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Average Return</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-bold text-success">+24.3%</p>
                  <p className="text-sm text-muted-foreground">Per winning trade</p>
                </CardContent>
              </Card>

              <Card className="border-border/40">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Total Trades</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-bold">127</p>
                  <p className="text-sm text-muted-foreground">Since joining</p>
                </CardContent>
              </Card>

              <Card className="border-border/40">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Best Trade</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-bold text-success">+$847</p>
                  <p className="text-sm text-muted-foreground">Bitcoin $100k market</p>
                </CardContent>
              </Card>

              <Card className="border-border/40">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Worst Trade</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-bold text-destructive">-$156</p>
                  <p className="text-sm text-muted-foreground">Fed rate hike market</p>
                </CardContent>
              </Card>

              <Card className="border-border/40">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Favorite Category</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-bold">Crypto</p>
                  <p className="text-sm text-muted-foreground">42% of your trades</p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Portfolio;
