import { useState, useEffect } from "react";
import { PageHeader } from "@/components/PageHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  TrendingUp, 
  Users, 
  Eye, 
  DollarSign,
  BarChart3,
  Calendar,
  ArrowUpRight,
  Plus,
  Settings,
  Wallet,
  Clock,
  Sparkles,
  Trophy,
  CircleDot,
  CheckCircle2,
  AlertTriangle,
  XCircle
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
  earnings: 4250,
  currentBalance: 1847.32,
  rank: 24,
};

const marketsByStatus = {
  open: 8,
  resolved: 38,
  disputing: 1,
  cancelled: 0,
};

const recentMarkets = [
  { id: 1, title: "Will Bitcoin reach $100k by 2025?", status: "Open", volume: 125000, traders: 2340, created: "2024-01-10" },
  { id: 2, title: "Fed rate cut in March 2025?", status: "Open", volume: 89000, traders: 1560, created: "2024-01-08" },
  { id: 3, title: "Tesla Q4 earnings beat estimates?", status: "Resolved", volume: 156000, traders: 3200, created: "2024-01-01", resolution: "Yes" },
  { id: 4, title: "Apple Vision Pro sales exceed 1M in Q1?", status: "Open", volume: 67000, traders: 890, created: "2023-12-28" },
  { id: 5, title: "Will OpenAI release GPT-5 in Q1?", status: "Disputing", volume: 234000, traders: 4100, created: "2023-12-15" },
];

const CreatorDashboard = () => {
  const navigate = useNavigate();
  const [timeframe, setTimeframe] = useState("30d");
  const [marketTokens, setMarketTokens] = useState(1);
  const [timeUntilRefresh, setTimeUntilRefresh] = useState("");

  // Calculate time until midnight GMT+1
  useEffect(() => {
    const calculateTimeUntilMidnight = () => {
      const now = new Date();
      
      // Get current time in GMT+1 (CET)
      const gmt1Offset = 1 * 60; // GMT+1 in minutes
      const localOffset = now.getTimezoneOffset();
      const gmt1Time = new Date(now.getTime() + (localOffset + gmt1Offset) * 60 * 1000);
      
      // Calculate midnight GMT+1
      const midnightGMT1 = new Date(gmt1Time);
      midnightGMT1.setHours(24, 0, 0, 0);
      
      // Time difference in milliseconds
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
            <h1 className="text-lg sm:text-2xl font-bold truncate">Creator Dashboard</h1>
            <p className="text-xs sm:text-sm text-muted-foreground">Track your performance</p>
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

        {/* Balance & Tokens - Side by side on mobile too */}
        <div className="grid grid-cols-2 gap-2 sm:gap-3 mb-4 sm:mb-5">
          {/* Current Balance Card */}
          <Card className="border-primary/20 bg-gradient-to-br from-primary/5 to-primary/10">
            <CardContent className="p-3 sm:p-4">
              <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
                <div className="h-8 w-8 sm:h-10 sm:w-10 rounded-lg sm:rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                  <Wallet className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
                </div>
                <p className="text-[10px] sm:text-xs text-muted-foreground font-medium leading-tight">Current Balance</p>
              </div>
              <p className="text-xl sm:text-2xl lg:text-3xl font-bold text-primary mb-2 sm:mb-3">
                ${creatorStats.currentBalance.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </p>
              <div className="flex flex-col sm:flex-row sm:items-center gap-2 pt-2 sm:pt-3 border-t border-border/30">
                <div className="flex items-center gap-1.5 text-[9px] sm:text-[11px] text-muted-foreground">
                  <Clock className="h-2.5 w-2.5 sm:h-3 sm:w-3 shrink-0" />
                  <span className="leading-tight">Fridays 12AM EST</span>
                </div>
                <Button variant="outline" size="sm" className="text-[10px] sm:text-xs h-6 sm:h-7 px-2 sm:px-3 w-full sm:w-auto sm:ml-auto">
                  Withdraw
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Market Tokens Card */}
          <Card className="border-amber-500/20 bg-gradient-to-br from-amber-500/5 to-amber-500/10">
            <CardContent className="p-3 sm:p-4">
              <div className="flex items-center justify-between gap-1 mb-2 sm:mb-3">
                <div className="flex items-center gap-2 sm:gap-3">
                  <div className="h-8 w-8 sm:h-10 sm:w-10 rounded-lg sm:rounded-xl bg-amber-500/10 flex items-center justify-center shrink-0">
                    <Sparkles className="h-4 w-4 sm:h-5 sm:w-5 text-amber-500" />
                  </div>
                  <p className="text-[10px] sm:text-xs text-muted-foreground font-medium leading-tight">Market Tokens</p>
                </div>
                <Badge variant="outline" className={`text-[8px] sm:text-[10px] px-1.5 sm:px-2 shrink-0 ${marketTokens > 0 ? 'border-success/40 text-success bg-success/10' : 'border-muted text-muted-foreground'}`}>
                  {marketTokens > 0 ? 'Ready' : 'Used'}
                </Badge>
              </div>
              <div className="flex items-baseline gap-1 mb-2 sm:mb-3">
                <span className="text-xl sm:text-2xl lg:text-3xl font-bold text-amber-500">{marketTokens}</span>
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
                <p className="text-base sm:text-2xl font-bold">{creatorStats.totalFollowers.toLocaleString()}</p>
                <Badge className="text-[8px] sm:text-xs bg-success/10 text-success border-0 px-1 sm:px-1.5">
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
                <span>Volume</span>
              </div>
              <p className="text-base sm:text-2xl font-bold">${(creatorStats.totalVolume / 1000000).toFixed(1)}M</p>
            </CardContent>
          </Card>
          
          <Card className="border-border/40">
            <CardContent className="p-2.5 sm:p-4">
              <div className="flex items-center gap-1 sm:gap-2 text-muted-foreground text-[10px] sm:text-sm mb-0.5 sm:mb-1">
                <DollarSign className="h-3 w-3 sm:h-4 sm:w-4" />
                <span>Earnings</span>
              </div>
              <p className="text-base sm:text-2xl font-bold text-success">${creatorStats.earnings.toLocaleString()}</p>
            </CardContent>
          </Card>
          
          <Card className="border-border/40">
            <CardContent className="p-2.5 sm:p-4">
              <div className="flex items-center gap-1 sm:gap-2 text-muted-foreground text-[10px] sm:text-sm mb-0.5 sm:mb-1">
                <BarChart3 className="h-3 w-3 sm:h-4 sm:w-4" />
                <span>Avg/Market</span>
              </div>
              <p className="text-base sm:text-2xl font-bold">${(creatorStats.avgMarketVolume / 1000).toFixed(0)}K</p>
            </CardContent>
          </Card>
        </div>

        {/* Secondary Stats - Markets, Resolved, Views, Rank */}
        <div className="grid grid-cols-4 gap-1.5 sm:gap-3 mb-4 sm:mb-5">
          <Card className="border-border/40 bg-muted/20">
            <CardContent className="p-2 sm:p-4">
              <p className="text-[9px] sm:text-sm text-muted-foreground mb-0.5 truncate">Markets</p>
              <p className="text-sm sm:text-xl font-semibold">{creatorStats.marketsCreated}</p>
            </CardContent>
          </Card>
          <Card className="border-border/40 bg-muted/20">
            <CardContent className="p-2 sm:p-4">
              <p className="text-[9px] sm:text-sm text-muted-foreground mb-0.5 truncate">Resolved</p>
              <p className="text-sm sm:text-xl font-semibold">{creatorStats.resolvedMarkets}</p>
            </CardContent>
          </Card>
          <Card className="border-border/40 bg-muted/20">
            <CardContent className="p-2 sm:p-4">
              <p className="text-[9px] sm:text-sm text-muted-foreground mb-0.5 truncate">Views</p>
              <p className="text-sm sm:text-xl font-semibold">{(creatorStats.totalViews / 1000).toFixed(0)}K</p>
            </CardContent>
          </Card>
          <Card className="border-border/40 bg-muted/20">
            <CardContent className="p-2 sm:p-4">
              <p className="text-[9px] sm:text-sm text-muted-foreground mb-0.5 truncate">Rank</p>
              <div className="flex items-center gap-1">
                <Trophy className="h-3 w-3 sm:h-4 sm:w-4 text-amber-500" />
                <p className="text-sm sm:text-xl font-semibold">#{creatorStats.rank}</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Your Markets Section */}
        <Card className="border-border/40">
          <CardHeader className="p-3 sm:p-4 pb-2 sm:pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm sm:text-lg font-semibold">Your Markets</CardTitle>
              <Button size="sm" className="gap-1 h-7 sm:h-8 text-[10px] sm:text-sm px-2 sm:px-3">
                <Plus className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
                <span>New</span>
              </Button>
            </div>
          </CardHeader>
          <CardContent className="p-3 sm:p-4 pt-0 space-y-3 sm:space-y-4">
            {/* Markets Status Overview */}
            <div className="grid grid-cols-4 gap-1.5 sm:gap-2">
              <div className="flex flex-col items-center p-2 sm:p-3 rounded-lg bg-primary/5 border border-primary/20">
                <CircleDot className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-primary mb-0.5" />
                <p className="text-base sm:text-xl font-bold">{marketsByStatus.open}</p>
                <p className="text-[8px] sm:text-[10px] text-muted-foreground">Open</p>
              </div>
              <div className="flex flex-col items-center p-2 sm:p-3 rounded-lg bg-success/5 border border-success/20">
                <CheckCircle2 className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-success mb-0.5" />
                <p className="text-base sm:text-xl font-bold">{marketsByStatus.resolved}</p>
                <p className="text-[8px] sm:text-[10px] text-muted-foreground">Resolved</p>
              </div>
              <div className="flex flex-col items-center p-2 sm:p-3 rounded-lg bg-amber-500/5 border border-amber-500/20">
                <AlertTriangle className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-amber-500 mb-0.5" />
                <p className="text-base sm:text-xl font-bold">{marketsByStatus.disputing}</p>
                <p className="text-[8px] sm:text-[10px] text-muted-foreground">Disputing</p>
              </div>
              <div className="flex flex-col items-center p-2 sm:p-3 rounded-lg bg-muted/50 border border-border/40">
                <XCircle className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-muted-foreground mb-0.5" />
                <p className="text-base sm:text-xl font-bold">{marketsByStatus.cancelled}</p>
                <p className="text-[8px] sm:text-[10px] text-muted-foreground">Cancelled</p>
              </div>
            </div>

            {/* Markets List */}
            <div className="space-y-1.5 sm:space-y-2">
              {recentMarkets.map((market) => (
                <div 
                  key={market.id} 
                  className="flex items-start justify-between gap-2 p-2 sm:p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors cursor-pointer"
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start gap-1.5 sm:gap-2 mb-0.5 sm:mb-1">
                      <p className="font-medium text-xs sm:text-sm line-clamp-2 leading-tight">{market.title}</p>
                      <Badge 
                        variant="outline"
                        className={`text-[7px] sm:text-[10px] shrink-0 px-1 sm:px-1.5 py-0 h-4 sm:h-5 ${
                          market.status === "Open" ? "border-primary/40 text-primary bg-primary/10" :
                          market.status === "Resolved" ? "border-success/40 text-success bg-success/10" :
                          market.status === "Disputing" ? "border-amber-500/40 text-amber-500 bg-amber-500/10" :
                          "border-muted text-muted-foreground"
                        }`}
                      >
                        {market.status === "Resolved" && market.resolution ? `✓ ${market.resolution}` : market.status}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-2 sm:gap-3 text-[9px] sm:text-xs text-muted-foreground">
                      <span className="flex items-center gap-0.5">
                        <Calendar className="h-2.5 w-2.5 sm:h-3 sm:w-3" />
                        {market.created}
                      </span>
                      <span>{market.traders.toLocaleString()} traders</span>
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="font-semibold text-xs sm:text-sm">${(market.volume / 1000).toFixed(0)}K</p>
                    <p className="text-[8px] sm:text-[10px] text-muted-foreground">vol</p>
                  </div>
                </div>
              ))}
            </div>

            {/* View All Link */}
            <Button variant="ghost" className="w-full h-8 text-xs text-muted-foreground hover:text-foreground">
              View all markets →
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CreatorDashboard;
