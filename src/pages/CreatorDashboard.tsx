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
  Sparkles
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
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 lg:px-8 py-6">
        <PageHeader 
          title="Creator Dashboard" 
          subtitle="Track your market performance and audience growth"
          action={
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={() => navigate("/settings")} className="gap-2">
                <Settings className="h-4 w-4" />
                Settings
              </Button>
              <Button size="sm" className="gap-2">
                <Plus className="h-4 w-4" />
                Create Market
              </Button>
            </div>
          }
        />

        {/* Earnings Balance & Market Tokens Card */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          {/* Current Balance Card */}
          <Card className="border-primary/20 bg-gradient-to-br from-primary/5 to-primary/10">
            <CardContent className="p-5">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center">
                    <Wallet className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground font-medium">Current Balance</p>
                    <p className="text-3xl font-bold text-primary">${creatorStats.currentBalance.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
                  </div>
                </div>
                <Button variant="outline" size="sm" className="text-xs">
                  Withdraw
                </Button>
              </div>
              <div className="flex items-center gap-2 mt-4 pt-4 border-t border-border/30 text-xs text-muted-foreground">
                <Clock className="h-3.5 w-3.5" />
                <span>Payouts every Friday at 12:00 AM EST</span>
              </div>
            </CardContent>
          </Card>

          {/* Market Tokens Card */}
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Card className="border-amber-500/20 bg-gradient-to-br from-amber-500/5 to-amber-500/10 cursor-help">
                  <CardContent className="p-5">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-4">
                        <div className="h-12 w-12 rounded-xl bg-amber-500/10 flex items-center justify-center">
                          <Sparkles className="h-6 w-6 text-amber-500" />
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground font-medium">Market Tokens</p>
                          <div className="flex items-baseline gap-1.5">
                            <span className="text-3xl font-bold text-amber-500">{marketTokens}</span>
                            <span className="text-lg text-muted-foreground font-medium">/ 1</span>
                          </div>
                        </div>
                      </div>
                      <Badge variant="outline" className={`${marketTokens > 0 ? 'border-success/40 text-success bg-success/10' : 'border-muted text-muted-foreground'}`}>
                        {marketTokens > 0 ? 'Available' : 'Used'}
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between mt-4 pt-4 border-t border-border/30">
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <Clock className="h-3.5 w-3.5" />
                        <span>Refreshes at midnight GMT+1</span>
                      </div>
                      <div className="flex items-center gap-1.5 bg-background/60 px-2.5 py-1 rounded-md border border-border/40">
                        <span className="text-[10px] text-muted-foreground uppercase tracking-wide">In</span>
                        <span className="text-sm font-mono font-bold text-foreground">{timeUntilRefresh}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TooltipTrigger>
              <TooltipContent side="bottom" className="max-w-xs">
                <p className="text-sm">You can create 1 market per day. Tokens refresh daily at midnight GMT+1.</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>

        {/* Time Range Selector */}
        <div className="flex justify-end mb-6">
          <Select value={timeframe} onValueChange={setTimeframe}>
            <SelectTrigger className="w-32 h-9">
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

        {/* Stats Overview */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <Card className="border-border/40">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 text-muted-foreground text-sm mb-1">
                <Users className="h-4 w-4" />
                Followers
              </div>
              <div className="flex items-center gap-2">
                <p className="text-2xl font-bold">{creatorStats.totalFollowers.toLocaleString()}</p>
                <Badge className="text-xs bg-success/10 text-success border-0">
                  <ArrowUpRight className="h-3 w-3 mr-1" />
                  {creatorStats.followersGrowth}%
                </Badge>
              </div>
            </CardContent>
          </Card>
          
          <Card className="border-border/40">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 text-muted-foreground text-sm mb-1">
                <Eye className="h-4 w-4" />
                Total Views
              </div>
              <div className="flex items-center gap-2">
                <p className="text-2xl font-bold">{(creatorStats.totalViews / 1000).toFixed(0)}K</p>
                <Badge className="text-xs bg-success/10 text-success border-0">
                  <ArrowUpRight className="h-3 w-3 mr-1" />
                  {creatorStats.viewsGrowth}%
                </Badge>
              </div>
            </CardContent>
          </Card>
          
          <Card className="border-border/40">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 text-muted-foreground text-sm mb-1">
                <BarChart3 className="h-4 w-4" />
                Markets Created
              </div>
              <p className="text-2xl font-bold">{creatorStats.marketsCreated}</p>
            </CardContent>
          </Card>
          
          <Card className="border-border/40">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 text-muted-foreground text-sm mb-1">
                <DollarSign className="h-4 w-4" />
                Total Volume
              </div>
              <p className="text-2xl font-bold">${(creatorStats.totalVolume / 1000000).toFixed(2)}M</p>
            </CardContent>
          </Card>
        </div>

        {/* Secondary Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <Card className="border-border/40 bg-muted/20">
            <CardContent className="p-4">
              <p className="text-sm text-muted-foreground mb-1">Avg Volume/Market</p>
              <p className="text-xl font-semibold">${creatorStats.avgMarketVolume.toLocaleString()}</p>
            </CardContent>
          </Card>
          <Card className="border-border/40 bg-muted/20">
            <CardContent className="p-4">
              <p className="text-sm text-muted-foreground mb-1">Resolved Markets</p>
              <p className="text-xl font-semibold">{creatorStats.resolvedMarkets}</p>
            </CardContent>
          </Card>
          <Card className="border-border/40 bg-muted/20">
            <CardContent className="p-4">
              <p className="text-sm text-muted-foreground mb-1">Resolution Accuracy</p>
              <p className="text-xl font-semibold text-success">{creatorStats.accuracy}%</p>
            </CardContent>
          </Card>
          <Card className="border-border/40 bg-muted/20">
            <CardContent className="p-4">
              <p className="text-sm text-muted-foreground mb-1">Creator Earnings</p>
              <p className="text-xl font-semibold text-success">${creatorStats.earnings.toLocaleString()}</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="markets" className="space-y-6">
          <TabsList className="bg-muted/50 p-1">
            <TabsTrigger value="markets" className="data-[state=active]:bg-background">
              Your Markets
            </TabsTrigger>
            <TabsTrigger value="audience" className="data-[state=active]:bg-background">
              Audience
            </TabsTrigger>
            <TabsTrigger value="earnings" className="data-[state=active]:bg-background">
              Earnings
            </TabsTrigger>
          </TabsList>

          {/* Markets Tab */}
          <TabsContent value="markets" className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">Your Markets</h3>
              <Button size="sm" className="gap-2">
                <Plus className="h-4 w-4" />
                Create New
              </Button>
            </div>

            <div className="space-y-3">
              {recentMarkets.map((market) => (
                <Card key={market.id} className="border-border/40 hover:border-border/60 transition-colors cursor-pointer">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <p className="font-medium">{market.title}</p>
                          <Badge 
                            variant={market.status === "Active" ? "default" : "secondary"}
                            className="text-xs"
                          >
                            {market.status}
                            {market.resolution && `: ${market.resolution}`}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            {market.created}
                          </span>
                          <span>{market.traders.toLocaleString()} traders</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold">${(market.volume / 1000).toFixed(0)}K</p>
                        <p className="text-sm text-muted-foreground">volume</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Audience Tab */}
          <TabsContent value="audience" className="space-y-4">
            <h3 className="text-lg font-semibold">Follower Activity</h3>

            <Card className="border-border/40">
              <CardHeader>
                <CardTitle className="text-base">Recent Follower Changes</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {followerActivity.map((day, index) => (
                    <div key={index} className="flex items-center justify-between py-2 border-b border-border/20 last:border-0">
                      <span className="text-sm text-muted-foreground">{day.date}</span>
                      <div className="flex items-center gap-4">
                        <span className="text-sm text-success">+{day.new} new</span>
                        <span className="text-sm text-destructive">-{day.lost} lost</span>
                        <span className="text-sm font-medium">Net: +{day.new - day.lost}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Earnings Tab */}
          <TabsContent value="earnings" className="space-y-4">
            <h3 className="text-lg font-semibold">Earnings Overview</h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card className="border-border/40">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Total Earnings</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-bold text-success">${creatorStats.earnings.toLocaleString()}</p>
                  <p className="text-sm text-muted-foreground">All time</p>
                </CardContent>
              </Card>

              <Card className="border-border/40">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">This Month</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-bold">$847</p>
                  <p className="text-sm text-muted-foreground">January 2024</p>
                </CardContent>
              </Card>

              <Card className="border-border/40">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Pending Payout</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-bold">$234</p>
                  <Button variant="outline" size="sm" className="mt-2">
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
