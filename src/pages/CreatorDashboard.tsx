import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
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
  Trophy,
  XCircle,
  Eye,
  ExternalLink,
  Activity,
  Zap,
  PieChart,
  CheckCircle2,
  AlertTriangle,
  Ban,
  Target,
  Megaphone,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// ── Mock Data ──────────────────────────────────────────────

const earningsByPeriod: Record<string, number> = {
  "1d": 127,
  "7d": 843,
  "30d": 4250,
  "90d": 11200,
  all: 24800,
};

const creatorStats = {
  marketsCreated: 47,
  totalPot: 2340000,
  avgPotPerMarket: 49787,
  rank: 24,
  totalFollowers: 12450,
  followersGrowth: 8.3,
  totalViews: 847000,
  viewsGrowth: 12.5,
  resolvedMarkets: 38,
  avgOdds: 62,
  currentBalance: 1847.32,
};

const marketsByStatus = {
  open: 8,
  resolved: 38,
  disputing: 1,
  cancelled: 0,
};

const recentMarkets = [
  { id: 1, title: "Will Bitcoin reach $100k by 2025?", status: "Open", pot: 125000, earnings: 312, players: 2340, created: "2024-01-10" },
  { id: 2, title: "Fed rate cut in March 2025?", status: "Open", pot: 89000, earnings: 178, players: 1560, created: "2024-01-08" },
  { id: 3, title: "Tesla Q4 earnings beat estimates?", status: "Resolved", pot: 156000, earnings: 468, players: 3200, created: "2024-01-01", resolution: "Yes" },
  { id: 4, title: "Apple Vision Pro sales exceed 1M in Q1?", status: "Open", pot: 67000, earnings: 134, players: 890, created: "2024-12-28" },
  { id: 5, title: "Will OpenAI release GPT-5 in Q1?", status: "Disputing", pot: 234000, earnings: 585, players: 4100, created: "2024-12-15" },
  { id: 6, title: "Nvidia stock above $800 by Feb?", status: "Cancelled", pot: 45000, earnings: 0, players: 650, created: "2024-12-10" },
];

const recentActivity = [
  { id: 1, type: "created", text: 'Created "Will Bitcoin reach $100k by 2025?"', time: "2h ago" },
  { id: 2, type: "resolved", text: 'Resolved "Tesla Q4 earnings beat estimates?" as Yes', time: "1d ago" },
  { id: 3, type: "created", text: 'Created "Fed rate cut in March 2025?"', time: "3d ago" },
  { id: 4, type: "disputed", text: '"Will OpenAI release GPT-5 in Q1?" under dispute', time: "5d ago" },
  { id: 5, type: "resolved", text: 'Resolved "NBA Finals MVP prediction" as Jokic', time: "1w ago" },
];

const analyticsData = {
  uniquePlayers: 8420,
  repeatRate: 34,
  topByPot: [
    { title: "Will OpenAI release GPT-5 in Q1?", pot: 234000 },
    { title: "Tesla Q4 earnings beat estimates?", pot: 156000 },
    { title: "Will Bitcoin reach $100k by 2025?", pot: 125000 },
  ],
  topByPlayers: [
    { title: "Will OpenAI release GPT-5 in Q1?", players: 4100 },
    { title: "Tesla Q4 earnings beat estimates?", players: 3200 },
    { title: "Will Bitcoin reach $100k by 2025?", players: 2340 },
  ],
  categories: [
    { name: "Crypto", count: 14, pct: 30 },
    { name: "Finance", count: 12, pct: 26 },
    { name: "Tech", count: 9, pct: 19 },
    { name: "Sports", count: 7, pct: 15 },
    { name: "Politics", count: 5, pct: 10 },
  ],
};

// ── Helpers ─────────────────────────────────────────────────

function fmt(n: number) {
  if (n >= 1_000_000) return `$${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `$${(n / 1_000).toFixed(0)}K`;
  return `$${n.toLocaleString()}`;
}

function nextFridayCountdown() {
  const now = new Date();
  const day = now.getUTCDay();
  const daysUntilFri = (5 - day + 7) % 7 || 7;
  const fri = new Date(now);
  fri.setUTCDate(now.getUTCDate() + daysUntilFri);
  fri.setUTCHours(5, 0, 0, 0); // 12AM EST = 5AM UTC
  const diff = fri.getTime() - now.getTime();
  const d = Math.floor(diff / 86400000);
  const h = Math.floor((diff % 86400000) / 3600000);
  return `${d}d ${h}h`;
}

// ── Component ───────────────────────────────────────────────

const CreatorDashboard = () => {
  const navigate = useNavigate();
  const [earningsPeriod, setEarningsPeriod] = useState<string>("30d");
  const [marketFilter, setMarketFilter] = useState<string>("all");
  const [marketSort, setMarketSort] = useState<"newest" | "pot" | "players">("newest");
  const [payoutCountdown, setPayoutCountdown] = useState(nextFridayCountdown());

  useEffect(() => {
    const i = setInterval(() => setPayoutCountdown(nextFridayCountdown()), 60000);
    return () => clearInterval(i);
  }, []);

  const earnings = earningsByPeriod[earningsPeriod];
  const totalAll = marketsByStatus.open + marketsByStatus.resolved + marketsByStatus.disputing + marketsByStatus.cancelled;

  const filteredMarkets = recentMarkets
    .filter((m) => {
      if (marketFilter === "all") return true;
      if (marketFilter === "open") return m.status === "Open";
      if (marketFilter === "resolved") return m.status === "Resolved";
      if (marketFilter === "disputing") return m.status === "Disputing";
      if (marketFilter === "cancelled") return m.status === "Cancelled";
      return true;
    })
    .sort((a, b) => {
      if (marketSort === "pot") return b.pot - a.pot;
      if (marketSort === "players") return b.players - a.players;
      return new Date(b.created).getTime() - new Date(a.created).getTime();
    });

  const periodLabels = ["1d", "7d", "30d", "90d", "all"] as const;

  return (
    <div className="min-h-screen bg-background pb-24 md:pb-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">

        {/* ── Header ─────────────────────────────────── */}
        <div className="flex items-center justify-between gap-3 mb-4 sm:mb-5">
          <div className="min-w-0">
            <h1 className="text-lg sm:text-2xl font-bold truncate">Creator Dashboard</h1>
            <p className="text-xs sm:text-sm text-muted-foreground">Manage your markets, earnings & growth</p>
          </div>
          <div className="flex gap-2 shrink-0">
            <Button
              variant="outline"
              size="sm"
              onClick={() => navigate("/creator/sarah-chen")}
              className="gap-1.5 h-8 sm:h-9 px-2.5 sm:px-3"
            >
              <ExternalLink className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">View Profile</span>
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => navigate("/settings")}
              className="h-8 sm:h-9 w-8 sm:w-9 p-0"
            >
              <Settings className="h-4 w-4" />
            </Button>
            <Button size="sm" className="gap-1.5 h-8 sm:h-9 px-2.5 sm:px-3">
              <Plus className="h-4 w-4" />
              <span>Create Market</span>
            </Button>
          </div>
        </div>

        {/* ── Money Overview ─────────────────────────── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3 mb-4 sm:mb-5">
          {/* Earnings Card */}
          <Card className="border-primary/20 bg-gradient-to-br from-primary/5 to-primary/10">
            <CardContent className="p-3 sm:p-5">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <div className="h-8 w-8 sm:h-10 sm:w-10 rounded-xl bg-primary/10 flex items-center justify-center">
                    <DollarSign className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
                  </div>
                  <p className="text-xs sm:text-sm text-muted-foreground font-medium">Earnings</p>
                </div>
                {/* Period Selector */}
                <div className="flex gap-0.5 bg-muted/40 rounded-lg p-0.5">
                  {periodLabels.map((p) => (
                    <button
                      key={p}
                      onClick={() => setEarningsPeriod(p)}
                      className={`px-1.5 sm:px-2.5 py-0.5 sm:py-1 rounded-md text-[9px] sm:text-xs font-medium transition-colors ${
                        earningsPeriod === p
                          ? "bg-background text-foreground shadow-sm"
                          : "text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      {p.toUpperCase()}
                    </button>
                  ))}
                </div>
              </div>
              <p className="text-2xl sm:text-3xl font-bold text-primary mb-1">
                ${earnings.toLocaleString()}
              </p>
              <div className="flex items-center gap-1.5 mt-3 pt-3 border-t border-border/30 text-[9px] sm:text-[11px] text-muted-foreground">
                <Clock className="h-2.5 w-2.5 sm:h-3 sm:w-3" />
                <span>Auto-withdraw every Friday 12AM EST</span>
              </div>
            </CardContent>
          </Card>

          {/* Available Balance Card */}
          <Card className="border-border/40">
            <CardContent className="p-3 sm:p-5">
              <div className="flex items-center gap-2 mb-3">
                <div className="h-8 w-8 sm:h-10 sm:w-10 rounded-xl bg-muted flex items-center justify-center">
                  <Wallet className="h-4 w-4 sm:h-5 sm:w-5 text-foreground" />
                </div>
                <p className="text-xs sm:text-sm text-muted-foreground font-medium">Available Balance</p>
              </div>
              <p className="text-2xl sm:text-3xl font-bold mb-1">
                ${creatorStats.currentBalance.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </p>
              <p className="text-[10px] sm:text-xs text-muted-foreground mb-3">
                Withdrawable now
              </p>
              <div className="flex items-center justify-between pt-3 border-t border-border/30">
                <div className="flex items-center gap-1.5 text-[9px] sm:text-[11px] text-muted-foreground">
                  <Clock className="h-2.5 w-2.5 sm:h-3 sm:w-3" />
                  <span>Next payout in {payoutCountdown}</span>
                </div>
                <Button variant="outline" size="sm" className="text-[10px] sm:text-xs h-7 px-3">
                  Withdraw
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* ── Quick Stats Strip ──────────────────────── */}
        <div className="grid grid-cols-4 gap-1.5 sm:gap-3 mb-4 sm:mb-5">
          <Card className="border-border/40 bg-muted/20">
            <CardContent className="p-2 sm:p-4">
              <div className="flex items-center gap-1 text-[9px] sm:text-xs text-muted-foreground mb-0.5">
                <BarChart3 className="h-2.5 w-2.5 sm:h-3.5 sm:w-3.5" />
                <span className="truncate">Markets</span>
              </div>
              <p className="text-sm sm:text-xl font-bold">{creatorStats.marketsCreated}</p>
            </CardContent>
          </Card>
          <Card className="border-border/40 bg-muted/20">
            <CardContent className="p-2 sm:p-4">
              <div className="flex items-center gap-1 text-[9px] sm:text-xs text-muted-foreground mb-0.5">
                <Zap className="h-2.5 w-2.5 sm:h-3.5 sm:w-3.5" />
                <span className="truncate">Total Pot</span>
              </div>
              <p className="text-sm sm:text-xl font-bold">{fmt(creatorStats.totalPot)}</p>
            </CardContent>
          </Card>
          <Card className="border-border/40 bg-muted/20">
            <CardContent className="p-2 sm:p-4">
              <div className="flex items-center gap-1 text-[9px] sm:text-xs text-muted-foreground mb-0.5">
                <TrendingUp className="h-2.5 w-2.5 sm:h-3.5 sm:w-3.5" />
                <span className="truncate">Avg Pot</span>
              </div>
              <p className="text-sm sm:text-xl font-bold">{fmt(creatorStats.avgPotPerMarket)}</p>
            </CardContent>
          </Card>
          <Card className="border-border/40 bg-muted/20">
            <CardContent className="p-2 sm:p-4">
              <div className="flex items-center gap-1 text-[9px] sm:text-xs text-muted-foreground mb-0.5">
                <Trophy className="h-2.5 w-2.5 sm:h-3.5 sm:w-3.5 text-amber-500" />
                <span className="truncate">Rank</span>
              </div>
              <p className="text-sm sm:text-xl font-bold">#{creatorStats.rank}</p>
            </CardContent>
          </Card>
        </div>

        {/* ── Tabbed Content ─────────────────────────── */}
        <Tabs defaultValue="overview" className="space-y-3">
          <TabsList className="w-full sm:w-auto bg-muted/50 h-9">
            <TabsTrigger value="overview" className="text-xs sm:text-sm gap-1.5">
              <Activity className="h-3.5 w-3.5" />
              Overview
            </TabsTrigger>
            <TabsTrigger value="markets" className="text-xs sm:text-sm gap-1.5">
              <BarChart3 className="h-3.5 w-3.5" />
              Markets
              <Badge variant="muted" className="ml-1 text-[9px] px-1.5 py-0">{totalAll}</Badge>
            </TabsTrigger>
            <TabsTrigger value="analytics" className="text-xs sm:text-sm gap-1.5">
              <PieChart className="h-3.5 w-3.5" />
              Analytics
            </TabsTrigger>
          </TabsList>

          {/* ── Overview Tab ──── */}
          <TabsContent value="overview" className="space-y-3">
            {/* Growth Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-3">
              <Card className="border-border/40">
                <CardContent className="p-3 sm:p-4">
                  <div className="flex items-center gap-1.5 text-muted-foreground text-[10px] sm:text-xs mb-1">
                    <Users className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
                    Followers
                  </div>
                  <div className="flex items-center gap-1.5">
                    <p className="text-lg sm:text-2xl font-bold">{creatorStats.totalFollowers.toLocaleString()}</p>
                    <Badge className="text-[8px] sm:text-[10px] bg-success/10 text-success border-0 px-1 sm:px-1.5">
                      <ArrowUpRight className="h-2 w-2 sm:h-2.5 sm:w-2.5" />
                      {creatorStats.followersGrowth}%
                    </Badge>
                  </div>
                </CardContent>
              </Card>
              <Card className="border-border/40">
                <CardContent className="p-3 sm:p-4">
                  <div className="flex items-center gap-1.5 text-muted-foreground text-[10px] sm:text-xs mb-1">
                    <Eye className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
                    Views
                  </div>
                  <div className="flex items-center gap-1.5">
                    <p className="text-lg sm:text-2xl font-bold">{(creatorStats.totalViews / 1000).toFixed(0)}K</p>
                    <Badge className="text-[8px] sm:text-[10px] bg-success/10 text-success border-0 px-1 sm:px-1.5">
                      <ArrowUpRight className="h-2 w-2 sm:h-2.5 sm:w-2.5" />
                      {creatorStats.viewsGrowth}%
                    </Badge>
                  </div>
                </CardContent>
              </Card>
              <Card className="border-border/40 col-span-2 sm:col-span-1">
                <CardContent className="p-3 sm:p-4">
                  <div className="flex items-center gap-1.5 text-muted-foreground text-[10px] sm:text-xs mb-1">
                    <Target className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
                    Avg Odds
                  </div>
                  <div className="flex items-center gap-2">
                    <p className="text-lg sm:text-2xl font-bold">{creatorStats.avgOdds}%</p>
                    <span className="text-[10px] sm:text-xs text-muted-foreground">
                      across markets
                    </span>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Top Performing Market */}
            <Card className="border-primary/20 bg-gradient-to-r from-primary/5 to-transparent">
              <CardContent className="p-3 sm:p-4">
                <div className="flex items-center gap-1.5 text-[10px] sm:text-xs text-muted-foreground mb-2">
                  <Trophy className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-amber-500" />
                  Top Performing Market
                </div>
                <p className="font-semibold text-sm sm:text-base mb-1">{analyticsData.topByPot[0].title}</p>
                <div className="flex items-center gap-3 text-[10px] sm:text-xs text-muted-foreground">
                  <span className="font-medium text-foreground">{fmt(analyticsData.topByPot[0].pot)} pot</span>
                  <span>•</span>
                  <span>{analyticsData.topByPlayers[0].players.toLocaleString()} players</span>
                </div>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card className="border-border/40">
              <CardHeader className="p-3 sm:p-4 pb-2">
                <CardTitle className="text-sm sm:text-base font-semibold">Recent Activity</CardTitle>
              </CardHeader>
              <CardContent className="p-3 sm:p-4 pt-0">
                <div className="space-y-2.5">
                  {recentActivity.map((a) => (
                    <div key={a.id} className="flex items-start gap-2.5">
                      <div className={`mt-0.5 h-5 w-5 rounded-full flex items-center justify-center shrink-0 ${
                        a.type === "created" ? "bg-primary/10 text-primary" :
                        a.type === "resolved" ? "bg-success/10 text-success" :
                        "bg-amber-500/10 text-amber-500"
                      }`}>
                        {a.type === "created" && <Plus className="h-3 w-3" />}
                        {a.type === "resolved" && <CheckCircle2 className="h-3 w-3" />}
                        {a.type === "disputed" && <AlertTriangle className="h-3 w-3" />}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs sm:text-sm leading-tight">{a.text}</p>
                        <p className="text-[9px] sm:text-[11px] text-muted-foreground mt-0.5">{a.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* ── Markets Tab ──── */}
          <TabsContent value="markets" className="space-y-3">
            <Card className="border-border/40">
              <CardHeader className="p-3 sm:p-4 pb-0">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-3">
                  {/* Status Filters */}
                  <div className="flex flex-wrap gap-1">
                    {([
                      { key: "all", label: "All", count: totalAll, activeClass: "bg-foreground text-background", inactiveClass: "bg-muted/50 text-muted-foreground hover:bg-muted" },
                      { key: "open", label: "Open", count: marketsByStatus.open, activeClass: "bg-primary text-primary-foreground", inactiveClass: "bg-primary/10 text-primary hover:bg-primary/20" },
                      { key: "resolved", label: "Resolved", count: marketsByStatus.resolved, activeClass: "bg-success text-success-foreground", inactiveClass: "bg-success/10 text-success hover:bg-success/20" },
                      { key: "disputing", label: "Disputing", count: marketsByStatus.disputing, activeClass: "bg-amber-500 text-white", inactiveClass: "bg-amber-500/10 text-amber-600 hover:bg-amber-500/20" },
                      { key: "cancelled", label: "Cancelled", count: marketsByStatus.cancelled, activeClass: "bg-muted-foreground text-background", inactiveClass: "bg-muted/50 text-muted-foreground hover:bg-muted" },
                    ] as const).map((f) => (
                      <button
                        key={f.key}
                        onClick={() => setMarketFilter(f.key)}
                        className={`px-2 sm:px-3 py-1 sm:py-1.5 rounded-md text-[10px] sm:text-xs font-medium transition-colors ${
                          marketFilter === f.key ? f.activeClass : f.inactiveClass
                        }`}
                      >
                        {f.label} ({f.count})
                      </button>
                    ))}
                  </div>
                  {/* Sort */}
                  <Select value={marketSort} onValueChange={(v) => setMarketSort(v as typeof marketSort)}>
                    <SelectTrigger className="w-24 sm:w-28 h-7 text-[10px] sm:text-xs">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="newest">Newest</SelectItem>
                      <SelectItem value="pot">Pot Size</SelectItem>
                      <SelectItem value="players">Players</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardHeader>
              <CardContent className="p-3 sm:p-4 pt-3">
                <div className="space-y-2">
                  {filteredMarkets.map((market) => (
                    <div
                      key={market.id}
                      className="group flex items-center gap-3 p-2.5 sm:p-3 rounded-lg border border-border/40 hover:border-border/60 bg-background hover:bg-muted/20 transition-all cursor-pointer"
                    >
                      {/* Status Indicator */}
                      <div className={`w-1 sm:w-1.5 h-10 sm:h-12 rounded-full shrink-0 ${
                        market.status === "Open" ? "bg-primary" :
                        market.status === "Resolved" ? "bg-success" :
                        market.status === "Disputing" ? "bg-amber-500" :
                        "bg-muted-foreground/30"
                      }`} />
                      {/* Market Info */}
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-xs sm:text-sm line-clamp-1 leading-tight mb-1">{market.title}</p>
                        <div className="flex items-center gap-2 sm:gap-3 text-[9px] sm:text-[11px] text-muted-foreground">
                          <span>{market.created}</span>
                          <span className="hidden sm:inline">•</span>
                          <span>{market.players.toLocaleString()} players</span>
                          <Badge
                            variant="outline"
                            className={`text-[7px] sm:text-[9px] px-1 py-0 h-3.5 sm:h-4 ${
                              market.status === "Open" ? "border-primary/30 text-primary" :
                              market.status === "Resolved" ? "border-success/30 text-success" :
                              market.status === "Disputing" ? "border-amber-500/30 text-amber-500" :
                              "border-muted text-muted-foreground"
                            }`}
                          >
                            {market.status === "Resolved" && market.resolution ? `✓ ${market.resolution}` : market.status}
                          </Badge>
                        </div>
                      </div>
                      {/* Pot & Earnings */}
                      <div className="flex items-center gap-2 sm:gap-4 shrink-0">
                        {market.status === "Open" && (
                          <Button
                            variant="outline"
                            size="sm"
                            className="h-7 px-2 sm:px-2.5 text-[10px] sm:text-xs gap-1 border-primary/30 text-primary hover:bg-primary hover:text-primary-foreground"
                            onClick={(e) => { e.stopPropagation(); }}
                          >
                            <Megaphone className="h-3 w-3" />
                            <span className="hidden sm:inline">Promote</span>
                          </Button>
                        )}
                        <div className="text-right">
                          <p className="font-semibold text-xs sm:text-sm">{fmt(market.pot)}</p>
                          <p className="text-[8px] sm:text-[10px] text-muted-foreground">pot</p>
                        </div>
                        <div className="text-right min-w-[40px] sm:min-w-[50px]">
                          <p className={`font-semibold text-xs sm:text-sm ${market.earnings > 0 ? "text-success" : "text-muted-foreground"}`}>
                            {market.earnings > 0 ? `+$${market.earnings}` : "$0"}
                          </p>
                          <p className="text-[8px] sm:text-[10px] text-muted-foreground">earned</p>
                        </div>
                      </div>
                    </div>
                  ))}
                  {filteredMarkets.length === 0 && (
                    <div className="text-center py-10 text-muted-foreground text-sm">
                      <Ban className="h-8 w-8 mx-auto mb-2 opacity-40" />
                      No markets match this filter
                    </div>
                  )}
                </div>
                {/* CTA */}
                <div className="mt-4 pt-3 border-t border-border/30">
                  <Button variant="outline" className="w-full gap-1.5 text-xs sm:text-sm">
                    <Plus className="h-3.5 w-3.5" />
                    Create New Market
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* ── Analytics Tab ──── */}
          <TabsContent value="analytics" className="space-y-3">
            {/* Player Engagement */}
            <div className="grid grid-cols-2 gap-2 sm:gap-3">
              <Card className="border-border/40">
                <CardContent className="p-3 sm:p-4">
                  <div className="flex items-center gap-1.5 text-muted-foreground text-[10px] sm:text-xs mb-1">
                    <Users className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
                    Unique Players
                  </div>
                  <p className="text-lg sm:text-2xl font-bold">{analyticsData.uniquePlayers.toLocaleString()}</p>
                </CardContent>
              </Card>
              <Card className="border-border/40">
                <CardContent className="p-3 sm:p-4">
                  <div className="flex items-center gap-1.5 text-muted-foreground text-[10px] sm:text-xs mb-1">
                    <Zap className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
                    Repeat Rate
                  </div>
                  <p className="text-lg sm:text-2xl font-bold">{analyticsData.repeatRate}%</p>
                </CardContent>
              </Card>
            </div>

            {/* Top Markets by Pot */}
            <Card className="border-border/40">
              <CardHeader className="p-3 sm:p-4 pb-2">
                <CardTitle className="text-sm sm:text-base font-semibold flex items-center gap-1.5">
                  <DollarSign className="h-3.5 w-3.5 text-primary" />
                  Top Markets by Pot
                </CardTitle>
              </CardHeader>
              <CardContent className="p-3 sm:p-4 pt-0">
                <div className="space-y-2.5">
                  {analyticsData.topByPot.map((m, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <span className="text-xs font-bold text-muted-foreground w-5">#{i + 1}</span>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs sm:text-sm font-medium line-clamp-1">{m.title}</p>
                      </div>
                      <span className="text-xs sm:text-sm font-semibold shrink-0">{fmt(m.pot)}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Top Markets by Players */}
            <Card className="border-border/40">
              <CardHeader className="p-3 sm:p-4 pb-2">
                <CardTitle className="text-sm sm:text-base font-semibold flex items-center gap-1.5">
                  <Users className="h-3.5 w-3.5 text-primary" />
                  Top Markets by Players
                </CardTitle>
              </CardHeader>
              <CardContent className="p-3 sm:p-4 pt-0">
                <div className="space-y-2.5">
                  {analyticsData.topByPlayers.map((m, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <span className="text-xs font-bold text-muted-foreground w-5">#{i + 1}</span>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs sm:text-sm font-medium line-clamp-1">{m.title}</p>
                      </div>
                      <span className="text-xs sm:text-sm font-semibold shrink-0">{m.players.toLocaleString()}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Category Breakdown */}
            <Card className="border-border/40">
              <CardHeader className="p-3 sm:p-4 pb-2">
                <CardTitle className="text-sm sm:text-base font-semibold flex items-center gap-1.5">
                  <PieChart className="h-3.5 w-3.5 text-primary" />
                  Category Breakdown
                </CardTitle>
              </CardHeader>
              <CardContent className="p-3 sm:p-4 pt-0">
                <div className="space-y-2.5">
                  {analyticsData.categories.map((c) => (
                    <div key={c.name} className="space-y-1">
                      <div className="flex items-center justify-between text-xs sm:text-sm">
                        <span className="font-medium">{c.name}</span>
                        <span className="text-muted-foreground">{c.count} markets ({c.pct}%)</span>
                      </div>
                      <Progress value={c.pct} className="h-1.5" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default CreatorDashboard;
