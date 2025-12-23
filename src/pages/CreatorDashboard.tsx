import { useState, useEffect } from "react";
import { PageHeader } from "@/components/PageHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
  Trophy
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

const recentMarkets = [
  { id: 1, title: "Will Bitcoin reach $100k by 2025?", status: "Active", volume: 125000, traders: 2340, created: "2024-01-10" },
  { id: 2, title: "Fed rate cut in March 2025?", status: "Active", volume: 89000, traders: 1560, created: "2024-01-08" },
  { id: 3, title: "Tesla Q4 earnings beat estimates?", status: "Resolved", volume: 156000, traders: 3200, created: "2024-01-01", resolution: "Yes" },
  { id: 4, title: "Apple Vision Pro sales exceed 1M in Q1?", status: "Active", volume: 67000, traders: 890, created: "2023-12-28" },
];

const followerActivity = [
  { date: "Jan 15", new: 234, lost: 12 },
  { date: "Jan 14", new: 189, lost: 8 },
  { date: "Jan 13", new: 312, lost: 15 },
  { date: "Jan 12", new: 156, lost: 23 },
  { date: "Jan 11", new: 278, lost: 11 },
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

        {/* Main Content Tabs */}
        <Tabs defaultValue="markets" className="space-y-3 sm:space-y-4">
          <TabsList className="bg-muted/50 p-0.5 sm:p-1 w-full grid grid-cols-3 h-8 sm:h-10">
            <TabsTrigger value="markets" className="data-[state=active]:bg-background text-[11px] sm:text-sm h-7 sm:h-8">
              Markets
            </TabsTrigger>
            <TabsTrigger value="audience" className="data-[state=active]:bg-background text-[11px] sm:text-sm h-7 sm:h-8">
              Audience
            </TabsTrigger>
            <TabsTrigger value="earnings" className="data-[state=active]:bg-background text-[11px] sm:text-sm h-7 sm:h-8">
              Earnings
            </TabsTrigger>
          </TabsList>

          {/* Markets Tab */}
          <TabsContent value="markets" className="space-y-2 sm:space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-sm sm:text-lg font-semibold">Your Markets</h3>
              <Button size="sm" className="gap-1 h-7 sm:h-8 text-[10px] sm:text-sm px-2 sm:px-3">
                <Plus className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
                <span>New</span>
              </Button>
            </div>

            <div className="space-y-1.5 sm:space-y-3">
              {recentMarkets.map((market) => (
                <Card key={market.id} className="border-border/40 hover:border-border/60 transition-colors cursor-pointer">
                  <CardContent className="p-2.5 sm:p-4">
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start gap-1.5 sm:gap-2 mb-1">
                          <p className="font-medium text-xs sm:text-base line-clamp-2 leading-tight">{market.title}</p>
                          <Badge 
                            variant={market.status === "Active" ? "default" : "secondary"}
                            className="text-[8px] sm:text-xs shrink-0 px-1 sm:px-2"
                          >
                            {market.status === "Resolved" && market.resolution ? `✓ ${market.resolution}` : market.status}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-2 sm:gap-3 text-[10px] sm:text-sm text-muted-foreground">
                          <span className="flex items-center gap-0.5 sm:gap-1">
                            <Calendar className="h-2.5 w-2.5 sm:h-3 sm:w-3" />
                            {market.created}
                          </span>
                          <span>{market.traders.toLocaleString()} traders</span>
                        </div>
                      </div>
                      <div className="text-right shrink-0">
                        <p className="font-semibold text-xs sm:text-base">${(market.volume / 1000).toFixed(0)}K</p>
                        <p className="text-[9px] sm:text-xs text-muted-foreground">vol</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Audience Tab */}
          <TabsContent value="audience" className="space-y-2 sm:space-y-3">
            <h3 className="text-sm sm:text-lg font-semibold">Follower Activity</h3>

            <Card className="border-border/40">
              <CardHeader className="pb-1 sm:pb-2 p-2.5 sm:p-6">
                <CardTitle className="text-xs sm:text-base">Recent Changes</CardTitle>
              </CardHeader>
              <CardContent className="p-2.5 sm:p-6 pt-0 sm:pt-0">
                <div className="space-y-0">
                  {followerActivity.map((day, index) => (
                    <div key={index} className="flex items-center justify-between py-1.5 sm:py-2 border-b border-border/20 last:border-0">
                      <span className="text-[10px] sm:text-sm text-muted-foreground">{day.date}</span>
                      <div className="flex items-center gap-3 sm:gap-4 text-[10px] sm:text-sm font-medium">
                        <span className="text-success">+{day.new}</span>
                        <span className="text-destructive">-{day.lost}</span>
                        <span className="text-foreground">= +{day.new - day.lost}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Earnings Tab */}
          <TabsContent value="earnings" className="space-y-2 sm:space-y-3">
            <h3 className="text-sm sm:text-lg font-semibold">Earnings Overview</h3>

            <div className="grid grid-cols-3 gap-1.5 sm:gap-3">
              <Card className="border-border/40">
                <CardContent className="p-2.5 sm:p-4">
                  <p className="text-[9px] sm:text-sm text-muted-foreground mb-0.5 sm:mb-1">Total</p>
                  <p className="text-lg sm:text-2xl font-bold text-success">${(creatorStats.earnings / 1000).toFixed(1)}K</p>
                  <p className="text-[8px] sm:text-xs text-muted-foreground">All time</p>
                </CardContent>
              </Card>

              <Card className="border-border/40">
                <CardContent className="p-2.5 sm:p-4">
                  <p className="text-[9px] sm:text-sm text-muted-foreground mb-0.5 sm:mb-1">This Month</p>
                  <p className="text-lg sm:text-2xl font-bold">$847</p>
                  <p className="text-[8px] sm:text-xs text-muted-foreground">Jan 2024</p>
                </CardContent>
              </Card>

              <Card className="border-border/40">
                <CardContent className="p-2.5 sm:p-4">
                  <p className="text-[9px] sm:text-sm text-muted-foreground mb-0.5 sm:mb-1">Pending</p>
                  <p className="text-lg sm:text-2xl font-bold">$234</p>
                  <Button variant="outline" size="sm" className="mt-1.5 sm:mt-2 h-6 sm:h-7 text-[9px] sm:text-xs w-full">
                    Withdraw
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default CreatorDashboard;
