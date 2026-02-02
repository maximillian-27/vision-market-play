import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  TrendingUp, 
  Users, 
  DollarSign,
  BarChart3,
  ArrowUpRight,
  Plus,
  Settings,
  Wallet,
  Clock,
  Sparkles,
  Trophy,
  XCircle,
  Percent
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { CreatorTierBadge, CreatorTierProgress, CreatorTier } from "@/components/CreatorTierBadge";

// Mock data
const creatorStats = {
  totalFollowers: 12450,
  followersGrowth: 8.3,
  totalViews: 847000,
  viewsGrowth: 12.5,
  marketsCreated: 47,
  totalVolume: 2340000,
  avgMarketVolume: 49787,
  resolvedMarkets: 38,
  accuracy: 84,
  totalEarnings: 4250,
  currentBalance: 1847.32,
  pendingEarnings: 342.50,
  rank: 24,
  tier: "gold" as CreatorTier,
  revenueShareRate: 2, // 2% for gold tier
};

const marketsByStatus = {
  open: 8,
  resolved: 38,
  disputing: 1,
  cancelled: 0,
};

const recentMarkets = [
  { id: 1, title: "Will Bitcoin reach $100k by 2025?", status: "Open", volume: 125000, earnings: 312, traders: 2340, created: "2024-01-10" },
  { id: 2, title: "Fed rate cut in March 2025?", status: "Open", volume: 89000, earnings: 178, traders: 1560, created: "2024-01-08" },
  { id: 3, title: "Tesla Q4 earnings beat estimates?", status: "Resolved", volume: 156000, earnings: 468, traders: 3200, created: "2024-01-01", resolution: "Yes" },
  { id: 4, title: "Apple Vision Pro sales exceed 1M in Q1?", status: "Open", volume: 67000, earnings: 134, traders: 890, created: "2023-12-28" },
  { id: 5, title: "Will OpenAI release GPT-5 in Q1?", status: "Disputing", volume: 234000, earnings: 585, traders: 4100, created: "2023-12-15" },
  { id: 6, title: "Nvidia stock above $800 by Feb?", status: "Cancelled", volume: 45000, earnings: 0, traders: 650, created: "2023-12-10" },
];

const earningsHistory = [
  { date: "Jan 2025", amount: 847.32, volume: 423660 },
  { date: "Dec 2024", amount: 1234.50, volume: 617250 },
  { date: "Nov 2024", amount: 956.80, volume: 478400 },
  { date: "Oct 2024", amount: 1211.38, volume: 605690 },
];

const CreatorDashboard = () => {
  const navigate = useNavigate();
  const [timeframe, setTimeframe] = useState("30d");
  const [marketTokens, setMarketTokens] = useState(1);
  const [timeUntilRefresh, setTimeUntilRefresh] = useState("");
  const [marketFilter, setMarketFilter] = useState<"all" | "open" | "closed" | "cancelled">("all");
  const [marketSort, setMarketSort] = useState<"newest" | "volume">("newest");

  // Calculate time until midnight GMT+1
  useEffect(() => {
    const calculateTimeUntilMidnight = () => {
      const now = new Date();
      const gmt1Offset = 1 * 60;
      const localOffset = now.getTimezoneOffset();
      const gmt1Time = new Date(now.getTime() + (localOffset + gmt1Offset) * 60 * 1000);
      const midnightGMT1 = new Date(gmt1Time);
      midnightGMT1.setHours(24, 0, 0, 0);
      const diff = midnightGMT1.getTime() - gmt1Time.getTime();
      const hours = Math.floor(diff / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);
      setTimeUntilRefresh(`${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`);
    };

    calculateTimeUntilMidnight();
    const interval = setInterval(calculateTimeUntilMidnight, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-background pb-24 md:pb-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
        {/* Mobile-optimized header */}
        <div className="flex items-center justify-between gap-3 mb-4 sm:mb-5">
          <div className="min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <h1 className="text-lg sm:text-2xl font-display font-bold truncate">Creator Dashboard</h1>
              <CreatorTierBadge tier={creatorStats.tier} size="md" />
            </div>
            <p className="text-xs sm:text-sm text-muted-foreground">Track your performance & earnings</p>
          </div>
          <div className="flex gap-2 shrink-0">
            <Button variant="outline" size="sm" onClick={() => navigate("/settings")} className="gap-1.5 h-8 sm:h-9 px-2.5 sm:px-3">
              <Settings className="h-4 w-4" />
              <span className="hidden sm:inline">Settings</span>
            </Button>
            <Button size="sm" className="gap-1.5 h-8 sm:h-9 px-2.5 sm:px-3">
              <Plus className="h-4 w-4" />
              <span className="hidden xs:inline">Create</span>
            </Button>
          </div>
        </div>

        {/* Balance, Tokens, Revenue Share - 3 columns */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-3 mb-4 sm:mb-5">
          {/* Current Balance Card */}
          <Card className="border-primary/20 bg-gradient-to-br from-primary/5 to-primary/10">
            <CardContent className="p-3 sm:p-4">
              <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
                <div className="h-8 w-8 sm:h-10 sm:w-10 rounded-lg sm:rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                  <Wallet className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
                </div>
                <div>
                  <p className="text-[10px] sm:text-xs text-muted-foreground font-medium leading-tight">Available Balance</p>
                  <p className="text-[9px] text-primary">+${creatorStats.pendingEarnings} pending</p>
                </div>
              </div>
              <p className="text-xl sm:text-2xl lg:text-3xl font-display font-bold text-primary mb-2 sm:mb-3">
                ${creatorStats.currentBalance.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </p>
              <div className="flex flex-col sm:flex-row sm:items-center gap-2 pt-2 sm:pt-3 border-t border-border/30">
                <div className="flex items-center gap-1.5 text-[9px] sm:text-[11px] text-muted-foreground">
                  <Clock className="h-2.5 w-2.5 sm:h-3 sm:w-3 shrink-0" />
                  <span className="leading-tight">Payouts every Friday</span>
                </div>
                <Button variant="outline" size="sm" className="text-[10px] sm:text-xs h-6 sm:h-7 px-2 sm:px-3 w-full sm:w-auto sm:ml-auto">
                  Withdraw
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Market Tokens Card */}
          <Card className="border-accent/20 bg-gradient-to-br from-accent/5 to-accent/10">
            <CardContent className="p-3 sm:p-4">
              <div className="flex items-center justify-between gap-1 mb-2 sm:mb-3">
                <div className="flex items-center gap-2 sm:gap-3">
                  <div className="h-8 w-8 sm:h-10 sm:w-10 rounded-lg sm:rounded-xl bg-accent/10 flex items-center justify-center shrink-0">
                    <Sparkles className="h-4 w-4 sm:h-5 sm:w-5 text-accent" />
                  </div>
                  <p className="text-[10px] sm:text-xs text-muted-foreground font-medium leading-tight">Market Tokens</p>
                </div>
                <Badge variant="outline" className={`text-[8px] sm:text-[10px] px-1.5 sm:px-2 shrink-0 ${marketTokens > 0 ? 'border-primary/40 text-primary bg-primary/10' : 'border-muted text-muted-foreground'}`}>
                  {marketTokens > 0 ? 'Ready' : 'Used'}
                </Badge>
              </div>
              <div className="flex items-baseline gap-1 mb-2 sm:mb-3">
                <span className="text-xl sm:text-2xl lg:text-3xl font-display font-bold text-accent">{marketTokens}</span>
                <span className="text-sm sm:text-base text-muted-foreground font-medium">/ 1</span>
              </div>
              <div className="flex items-center justify-between pt-2 sm:pt-3 border-t border-border/30 gap-1">
                <div className="flex items-center gap-1 text-[9px] sm:text-[11px] text-muted-foreground">
                  <Clock className="h-2.5 w-2.5 sm:h-3 sm:w-3 shrink-0" />
                  <span className="hidden sm:inline">Midnight GMT+1</span>
                  <span className="sm:hidden">Reset</span>
                </div>
                <div className="flex items-center gap-0.5 sm:gap-1 bg-background/60 px-1.5 sm:px-2 py-0.5 rounded border border-border/40">
                  <span className="text-[8px] sm:text-[9px] text-muted-foreground uppercase">In</span>
                  <span className="text-[10px] sm:text-xs font-mono font-bold text-foreground">{timeUntilRefresh}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Revenue Share Card */}
          <Card className="border-border/40">
            <CardContent className="p-3 sm:p-4">
              <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
                <div className="h-8 w-8 sm:h-10 sm:w-10 rounded-lg sm:rounded-xl bg-muted flex items-center justify-center shrink-0">
                  <Percent className="h-4 w-4 sm:h-5 sm:w-5 text-foreground" />
                </div>
                <div>
                  <p className="text-[10px] sm:text-xs text-muted-foreground font-medium leading-tight">Revenue Share</p>
                  <p className="text-[9px] text-muted-foreground">Based on tier</p>
                </div>
              </div>
              <div className="flex items-baseline gap-1 mb-2 sm:mb-3">
                <span className="text-xl sm:text-2xl lg:text-3xl font-display font-bold">{creatorStats.revenueShareRate}%</span>
                <span className="text-sm sm:text-base text-muted-foreground font-medium">of volume</span>
              </div>
              <div className="pt-2 sm:pt-3 border-t border-border/30">
                <CreatorTierProgress 
                  currentTier={creatorStats.tier} 
                  currentVolume={creatorStats.totalVolume}
                />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Time Range Selector */}
        <div className="flex justify-end mb-3 sm:mb-4">
          <Select value={timeframe} onValueChange={setTimeframe}>
            <SelectTrigger className="w-24 sm:w-32 h-7 sm:h-8 text-[10px] sm:text-sm">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7d">Last 7 days</SelectItem>
              <SelectItem value="30d">Last 30 days</SelectItem>
              <SelectItem value="90d">Last 90 days</SelectItem>
              <SelectItem value="all">All time</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Main Stats - Followers, Volume, Earnings, Avg/Market */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3 mb-3 sm:mb-4">
          <Card className="border-border/40">
            <CardContent className="p-2.5 sm:p-4">
              <div className="flex items-center gap-1 sm:gap-2 text-muted-foreground text-[10px] sm:text-sm mb-0.5 sm:mb-1">
                <Users className="h-3 w-3 sm:h-4 sm:w-4" />
                <span>Followers</span>
              </div>
              <div className="flex items-center gap-1.5 sm:gap-2">
                <p className="text-base sm:text-2xl font-display font-bold">{creatorStats.totalFollowers.toLocaleString()}</p>
                <Badge className="text-[8px] sm:text-xs bg-primary/10 text-primary border-0 px-1 sm:px-1.5">
                  <ArrowUpRight className="h-2 w-2 sm:h-3 sm:w-3" />
                  {creatorStats.followersGrowth}%
                </Badge>
              </div>
            </CardContent>
          </Card>
          
          <Card className="border-border/40">
            <CardContent className="p-2.5 sm:p-4">
              <div className="flex items-center gap-1 sm:gap-2 text-muted-foreground text-[10px] sm:text-sm mb-0.5 sm:mb-1">
                <TrendingUp className="h-3 w-3 sm:h-4 sm:w-4" />
                <span>Total Volume</span>
              </div>
              <p className="text-base sm:text-2xl font-display font-bold">${(creatorStats.totalVolume / 1000000).toFixed(1)}M</p>
            </CardContent>
          </Card>
          
          <Card className="border-border/40">
            <CardContent className="p-2.5 sm:p-4">
              <div className="flex items-center gap-1 sm:gap-2 text-muted-foreground text-[10px] sm:text-sm mb-0.5 sm:mb-1">
                <DollarSign className="h-3 w-3 sm:h-4 sm:w-4" />
                <span>Total Earnings</span>
              </div>
              <p className="text-base sm:text-2xl font-display font-bold text-primary">${creatorStats.totalEarnings.toLocaleString()}</p>
            </CardContent>
          </Card>
          
          <Card className="border-border/40">
            <CardContent className="p-2.5 sm:p-4">
              <div className="flex items-center gap-1 sm:gap-2 text-muted-foreground text-[10px] sm:text-sm mb-0.5 sm:mb-1">
                <BarChart3 className="h-3 w-3 sm:h-4 sm:w-4" />
                <span>Avg/Market</span>
              </div>
              <p className="text-base sm:text-2xl font-display font-bold">${(creatorStats.avgMarketVolume / 1000).toFixed(0)}K</p>
            </CardContent>
          </Card>
        </div>

        {/* Secondary Stats - Markets, Resolved, Views, Rank */}
        <div className="grid grid-cols-4 gap-1.5 sm:gap-3 mb-4 sm:mb-5">
          <Card className="border-border/40 bg-muted/20">
            <CardContent className="p-2 sm:p-4">
              <p className="text-[9px] sm:text-sm text-muted-foreground mb-0.5 truncate">Markets</p>
              <p className="text-sm sm:text-xl font-display font-semibold">{creatorStats.marketsCreated}</p>
            </CardContent>
          </Card>
          <Card className="border-border/40 bg-muted/20">
            <CardContent className="p-2 sm:p-4">
              <p className="text-[9px] sm:text-sm text-muted-foreground mb-0.5 truncate">Resolved</p>
              <p className="text-sm sm:text-xl font-display font-semibold">{creatorStats.resolvedMarkets}</p>
            </CardContent>
          </Card>
          <Card className="border-border/40 bg-muted/20">
            <CardContent className="p-2 sm:p-4">
              <p className="text-[9px] sm:text-sm text-muted-foreground mb-0.5 truncate">Views</p>
              <p className="text-sm sm:text-xl font-display font-semibold">{(creatorStats.totalViews / 1000).toFixed(0)}K</p>
            </CardContent>
          </Card>
          <Card className="border-border/40 bg-muted/20">
            <CardContent className="p-2 sm:p-4">
              <p className="text-[9px] sm:text-sm text-muted-foreground mb-0.5 truncate">Rank</p>
              <div className="flex items-center gap-1">
                <Trophy className="h-3 w-3 sm:h-4 sm:w-4 text-accent" />
                <p className="text-sm sm:text-xl font-display font-semibold">#{creatorStats.rank}</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Earnings History */}
        <Card className="border-border/40 mb-4 sm:mb-5">
          <CardHeader className="p-3 sm:p-4 pb-2">
            <CardTitle className="text-sm sm:text-lg font-display font-semibold">Earnings History</CardTitle>
          </CardHeader>
          <CardContent className="p-3 sm:p-4 pt-0">
            <div className="space-y-2">
              {earningsHistory.map((entry, index) => (
                <div key={index} className="flex items-center justify-between py-2 border-b border-border/30 last:border-0">
                  <div>
                    <p className="text-sm font-medium">{entry.date}</p>
                    <p className="text-xs text-muted-foreground">${entry.volume.toLocaleString()} volume</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-bold text-primary">+${entry.amount.toFixed(2)}</p>
                    <p className="text-[10px] text-muted-foreground">{creatorStats.revenueShareRate}% share</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Your Markets Section */}
        <Card className="border-border/40">
          <CardHeader className="p-3 sm:p-4 pb-0">
            <div className="flex items-center justify-between mb-3">
              <CardTitle className="text-sm sm:text-lg font-display font-semibold">Your Markets</CardTitle>
              <Button size="sm" className="gap-1 h-7 sm:h-8 text-[10px] sm:text-sm px-2 sm:px-3">
                <Plus className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
                <span>New</span>
              </Button>
            </div>
            
            {/* Status Filters & Sort */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-3">
              {/* Status Tabs */}
              <div className="flex gap-1">
                <button
                  onClick={() => setMarketFilter("all")}
                  className={`px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-md text-[10px] sm:text-xs font-medium transition-colors ${
                    marketFilter === "all" 
                      ? "bg-foreground text-background" 
                      : "bg-muted/50 text-muted-foreground hover:bg-muted"
                  }`}
                >
                  All ({marketsByStatus.open + marketsByStatus.resolved + marketsByStatus.disputing + marketsByStatus.cancelled})
                </button>
                <button
                  onClick={() => setMarketFilter("open")}
                  className={`px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-md text-[10px] sm:text-xs font-medium transition-colors ${
                    marketFilter === "open" 
                      ? "bg-primary text-primary-foreground" 
                      : "bg-primary/10 text-primary hover:bg-primary/20"
                  }`}
                >
                  Open ({marketsByStatus.open})
                </button>
                <button
                  onClick={() => setMarketFilter("closed")}
                  className={`px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-md text-[10px] sm:text-xs font-medium transition-colors ${
                    marketFilter === "closed" 
                      ? "bg-bet text-bet-foreground" 
                      : "bg-bet/10 text-bet hover:bg-bet/20"
                  }`}
                >
                  <span className="hidden sm:inline">Resolved/Disputing</span>
                  <span className="sm:hidden">Closed</span>
                  <span className="ml-1">({marketsByStatus.resolved + marketsByStatus.disputing})</span>
                </button>
                <button
                  onClick={() => setMarketFilter("cancelled")}
                  className={`px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-md text-[10px] sm:text-xs font-medium transition-colors ${
                    marketFilter === "cancelled" 
                      ? "bg-muted-foreground text-background" 
                      : "bg-muted/50 text-muted-foreground hover:bg-muted"
                  }`}
                >
                  <XCircle className="h-3 w-3 sm:hidden" />
                  <span className="hidden sm:inline">Cancelled ({marketsByStatus.cancelled})</span>
                </button>
              </div>
              
              {/* Sort Dropdown */}
              <Select value={marketSort} onValueChange={(v) => setMarketSort(v as "newest" | "volume")}>
                <SelectTrigger className="w-24 sm:w-28 h-7 text-[10px] sm:text-xs">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="newest">Newest</SelectItem>
                  <SelectItem value="volume">Volume</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardHeader>
          
          <CardContent className="p-3 sm:p-4 pt-3">
            {/* Markets List */}
            <div className="space-y-2">
              {recentMarkets
                .filter(market => {
                  if (marketFilter === "all") return true;
                  if (marketFilter === "open") return market.status === "Open";
                  if (marketFilter === "closed") return market.status === "Resolved" || market.status === "Disputing";
                  if (marketFilter === "cancelled") return market.status === "Cancelled";
                  return true;
                })
                .sort((a, b) => {
                  if (marketSort === "volume") return b.volume - a.volume;
                  return new Date(b.created).getTime() - new Date(a.created).getTime();
                })
                .map((market) => (
                <div 
                  key={market.id} 
                  className="flex items-center gap-3 p-3 rounded-xl border border-border/50 hover:border-border hover:bg-muted/30 transition-all cursor-pointer"
                  onClick={() => navigate(`/market/${market.id}`)}
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <p className="text-sm font-medium truncate">{market.title}</p>
                      <Badge 
                        variant="secondary" 
                        className={`text-[9px] shrink-0 ${
                          market.status === 'Open' ? 'bg-primary/10 text-primary' :
                          market.status === 'Resolved' ? 'bg-bet/10 text-bet' :
                          market.status === 'Disputing' ? 'bg-accent/10 text-accent' :
                          'bg-muted text-muted-foreground'
                        }`}
                      >
                        {market.status}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                      <span>${market.volume.toLocaleString()} vol.</span>
                      <span>{market.traders.toLocaleString()} bettors</span>
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="text-sm font-bold text-primary">+${market.earnings}</p>
                    <p className="text-[10px] text-muted-foreground">earned</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CreatorDashboard;
