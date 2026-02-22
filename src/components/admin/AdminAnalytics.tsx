import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import {
  BarChart3, TrendingUp, TrendingDown, Users, DollarSign,
  ArrowUpRight, ArrowDownRight, Download, Target, Zap, Megaphone, Percent, Star,
} from "lucide-react";
import { toast } from "sonner";
import { AdminMarketing } from "./AdminMarketing";
import { Progress } from "@/components/ui/progress";
import {
  LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, AreaChart, Area,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend
} from "recharts";

const kpis = {
  revenue: { value: 124500, change: 12.5, label: "Fee Revenue (3%)" },
  creatorRevenue: { value: 24900, change: 8.1, label: "Creator Payouts" },
  users: { value: 8450, change: 8.3, label: "Active Users" },
  volume: { value: 4150000, change: -3.2, label: "Trading Volume" },
  signups: { value: 347, change: 15.7, label: "New Signups" },
  retention: { value: 78.5, change: 2.1, label: "Retention Rate %" },
};

const trafficSources = [
  { source: "Organic Search", users: 34500, percentage: 35 },
  { source: "Direct", users: 28900, percentage: 29 },
  { source: "Referral / Affiliate", users: 18600, percentage: 19 },
  { source: "Social Media", users: 12400, percentage: 12 },
  { source: "Paid Ads", users: 4900, percentage: 5 },
];

const topMarkets = [
  { name: "Bitcoin Price EOY", volume: 525000, trades: 15600, trend: "up" },
  { name: "US Election 2024", volume: 498000, trades: 13200, trend: "up" },
  { name: "ETH Merge Impact", volume: 267000, trades: 8100, trend: "down" },
  { name: "AI Breakthrough 2025", volume: 154000, trades: 5890, trend: "up" },
  { name: "Fed Rate Decision", volume: 145000, trades: 4560, trend: "down" },
];

const topCreators = [
  { name: "SportsAnalyst", markets: 15, volume: 1200000, feeRevenue: 36000, earnings: 7200 },
  { name: "CryptoGuru", markets: 12, volume: 890000, feeRevenue: 26700, earnings: 5340 },
  { name: "TechOracle", markets: 8, volume: 456000, feeRevenue: 13680, earnings: 2736 },
  { name: "PoliticalPredict", markets: 5, volume: 312000, feeRevenue: 9360, earnings: 1872 },
  { name: "MarketMaven", markets: 3, volume: 145000, feeRevenue: 4350, earnings: 870 },
];

const userMetrics = [
  { metric: "DAU/MAU Ratio", value: "36%", benchmark: "30%", status: "good" },
  { metric: "Avg Revenue Per User", value: "$45", benchmark: "$38", status: "good" },
  { metric: "Churn Rate (30d)", value: "4.2%", benchmark: "5%", status: "good" },
  { metric: "Customer Acquisition Cost", value: "$28", benchmark: "$25", status: "warning" },
  { metric: "Lifetime Value", value: "$890", benchmark: "$750", status: "good" },
];

const conversionFunnel = [
  { stage: "Visitors", count: 125000, rate: 100 },
  { stage: "Signups", count: 12500, rate: 10 },
  { stage: "Wallet Connected", count: 8750, rate: 70 },
  { stage: "First Deposit", count: 5250, rate: 60 },
  { stage: "Active Players", count: 3675, rate: 70 },
];

const userActivityData = [
  { day: "Mon", dau: 6200, newUsers: 320 },
  { day: "Tue", dau: 7100, newUsers: 410 },
  { day: "Wed", dau: 6800, newUsers: 350 },
  { day: "Thu", dau: 7500, newUsers: 380 },
  { day: "Fri", dau: 8200, newUsers: 420 },
  { day: "Sat", dau: 9100, newUsers: 510 },
  { day: "Sun", dau: 8450, newUsers: 470 },
];

const categoryDistribution = [
  { name: "Sports", value: 35 },
  { name: "Crypto", value: 28 },
  { name: "Politics", value: 15 },
  { name: "Tech", value: 14 },
  { name: "Other", value: 8 },
];

const COLORS = ["hsl(var(--primary))", "hsl(var(--success))", "hsl(var(--warning))", "hsl(var(--destructive))", "hsl(var(--muted-foreground))"];

const volumeData = [
  { week: "W1", volume: 1200000 },
  { week: "W2", volume: 1450000 },
  { week: "W3", volume: 1320000 },
  { week: "W4", volume: 1680000 },
  { week: "W5", volume: 1890000 },
  { week: "W6", volume: 1560000 },
  { week: "W7", volume: 2100000 },
];

const revenueData = [
  { date: "Jan 1", revenue: 38000 },
  { date: "Jan 5", revenue: 42000 },
  { date: "Jan 9", revenue: 39000 },
  { date: "Jan 13", revenue: 51000 },
  { date: "Jan 17", revenue: 48000 },
  { date: "Jan 21", revenue: 55000 },
  { date: "Jan 25", revenue: 62000 },
  { date: "Jan 29", revenue: 58000 },
];

const tooltipStyle = { backgroundColor: 'hsl(var(--popover))', border: '1px solid hsl(var(--border))', borderRadius: '8px', color: 'hsl(var(--popover-foreground))' };
const tickStyle = { fill: 'hsl(var(--muted-foreground))', fontSize: 12 };

export const AdminAnalytics = () => {
  return (
    <div className="space-y-6">
      <Tabs defaultValue="performance" className="space-y-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <TabsList className="bg-muted/50 p-1 flex-wrap h-auto gap-1">
            <TabsTrigger value="performance" className="data-[state=active]:bg-background gap-2"><BarChart3 className="h-4 w-4" /> Performance</TabsTrigger>
            <TabsTrigger value="users-funnel" className="data-[state=active]:bg-background gap-2"><Users className="h-4 w-4" /> Users & Funnel</TabsTrigger>
            <TabsTrigger value="markets" className="data-[state=active]:bg-background gap-2"><TrendingUp className="h-4 w-4" /> Markets</TabsTrigger>
            <TabsTrigger value="marketing" className="data-[state=active]:bg-background gap-2"><Megaphone className="h-4 w-4" /> Marketing</TabsTrigger>
          </TabsList>
          <div className="flex items-center gap-3">
            <Select defaultValue="7d">
              <SelectTrigger className="w-32 h-9"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="1d">Last 24h</SelectItem>
                <SelectItem value="7d">Last 7 days</SelectItem>
                <SelectItem value="30d">Last 30 days</SelectItem>
                <SelectItem value="90d">Last 90 days</SelectItem>
                <SelectItem value="1y">Last Year</SelectItem>
                <SelectItem value="all">All Time</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" size="sm" className="gap-2" onClick={() => toast("Exporting analytics report...")}>
              <Download className="h-4 w-4" /> Export
            </Button>
          </div>
        </div>

        {/* Performance */}
        <TabsContent value="performance" className="space-y-4">
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
            {Object.entries(kpis).map(([key, kpi]) => (
              <Card key={key} className="border-border/40">
                <CardContent className="p-4">
                  <p className="text-sm text-muted-foreground mb-1">{kpi.label}</p>
                  <div className="flex items-center gap-2">
                    <p className="text-2xl font-bold">
                      {key === "revenue" || key === "creatorRevenue" || key === "volume" ? `$${(kpi.value / 1000).toFixed(0)}K` :
                       key === "retention" ? `${kpi.value}%` : kpi.value.toLocaleString()}
                    </p>
                    <Badge className={`text-xs border-0 ${kpi.change >= 0 ? 'bg-success/10 text-success' : 'bg-destructive/10 text-destructive'}`}>
                      {kpi.change >= 0 ? <ArrowUpRight className="h-3 w-3 mr-1" /> : <ArrowDownRight className="h-3 w-3 mr-1" />}
                      {Math.abs(kpi.change)}%
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card className="border-border/40">
            <CardHeader className="pb-3"><CardTitle className="text-base">Fee Revenue Trend</CardTitle></CardHeader>
            <CardContent>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={revenueData}>
                    <CartesianGrid strokeDasharray="3 3" className="stroke-border/40" />
                    <XAxis dataKey="date" tick={tickStyle} />
                    <YAxis tick={tickStyle} tickFormatter={(v) => `$${(v / 1000).toFixed(0)}K`} />
                    <Tooltip contentStyle={tooltipStyle} formatter={(value: number) => [`$${value.toLocaleString()}`, 'Fee Revenue']} />
                    <Area type="monotone" dataKey="revenue" stroke="hsl(var(--success))" fill="hsl(var(--success) / 0.1)" strokeWidth={2} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <Card className="border-border/40">
            <CardHeader className="pb-3"><CardTitle className="text-base">Traffic Sources</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              {trafficSources.map((source) => (
                <div key={source.source} className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span>{source.source}</span>
                    <span className="font-medium">{source.users.toLocaleString()} ({source.percentage}%)</span>
                  </div>
                  <Progress value={source.percentage} className="h-2" />
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Users & Funnel */}
        <TabsContent value="users-funnel" className="space-y-4">
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
            {userMetrics.map((metric) => (
              <Card key={metric.metric} className="border-border/40">
                <CardContent className="p-4">
                  <p className="text-sm text-muted-foreground mb-2">{metric.metric}</p>
                  <div className="flex items-center justify-between">
                    <p className="text-2xl font-bold">{metric.value}</p>
                    <div className="text-right">
                      <p className="text-xs text-muted-foreground">Benchmark</p>
                      <Badge variant={metric.status === "good" ? "default" : "secondary"} className="text-xs">{metric.benchmark}</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card className="border-border/40">
            <CardHeader className="pb-3"><CardTitle className="text-base">Conversion Funnel</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              {conversionFunnel.map((stage, index) => (
                <div key={stage.stage} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-xs font-medium text-primary">{index + 1}</div>
                      <span className="font-medium">{stage.stage}</span>
                    </div>
                    <div className="text-right">
                      <span className="font-medium">{stage.count.toLocaleString()}</span>
                      {index > 0 && <span className="text-sm text-muted-foreground ml-2">({stage.rate}% conversion)</span>}
                    </div>
                  </div>
                  <Progress value={(stage.count / conversionFunnel[0].count) * 100} className="h-3" />
                </div>
              ))}
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="border-border/40 bg-success/5">
              <CardContent className="p-4">
                <div className="flex items-center gap-2 text-success text-sm mb-1"><Zap className="h-4 w-4" /> Best Performing</div>
                <p className="font-medium">Signups → Wallet Connected</p>
                <p className="text-2xl font-bold">70%</p>
              </CardContent>
            </Card>
            <Card className="border-border/40 bg-warning/5">
              <CardContent className="p-4">
                <div className="flex items-center gap-2 text-warning text-sm mb-1"><Target className="h-4 w-4" /> Needs Improvement</div>
                <p className="font-medium">Visitors → Signups</p>
                <p className="text-2xl font-bold">10%</p>
              </CardContent>
            </Card>
            <Card className="border-border/40">
              <CardContent className="p-4">
                <p className="text-sm text-muted-foreground mb-1">Overall Conversion</p>
                <p className="text-2xl font-bold">2.94%</p>
                <p className="text-xs text-muted-foreground">Visitors → Active Players</p>
              </CardContent>
            </Card>
          </div>

          <Card className="border-border/40">
            <CardHeader className="pb-3"><CardTitle className="text-base">User Activity Over Time</CardTitle></CardHeader>
            <CardContent>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={userActivityData}>
                    <CartesianGrid strokeDasharray="3 3" className="stroke-border/40" />
                    <XAxis dataKey="day" tick={tickStyle} />
                    <YAxis tick={tickStyle} />
                    <Tooltip contentStyle={tooltipStyle} />
                    <Legend />
                    <Line type="monotone" dataKey="dau" name="Daily Active Users" stroke="hsl(var(--primary))" strokeWidth={2} dot={false} />
                    <Line type="monotone" dataKey="newUsers" name="New Users" stroke="hsl(var(--success))" strokeWidth={2} dot={false} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Markets */}
        <TabsContent value="markets" className="space-y-4">
          <Card className="border-border/40">
            <CardHeader className="pb-3"><CardTitle className="text-base">Top Performing Markets</CardTitle></CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border/40 text-left text-sm text-muted-foreground">
                      <th className="p-3 font-medium">Market</th>
                      <th className="p-3 font-medium">Pot Size</th>
                      <th className="p-3 font-medium">Trades</th>
                      <th className="p-3 font-medium">Fee Revenue</th>
                      <th className="p-3 font-medium">Trend</th>
                    </tr>
                  </thead>
                  <tbody>
                    {topMarkets.map((market, index) => (
                      <tr key={index} className="border-b border-border/20 hover:bg-muted/30 transition-colors">
                        <td className="p-3 font-medium">{market.name}</td>
                        <td className="p-3 text-sm font-bold text-primary">${market.volume.toLocaleString()}</td>
                        <td className="p-3 text-sm">{market.trades.toLocaleString()}</td>
                        <td className="p-3 text-sm font-medium text-success">${(market.volume * 0.03).toLocaleString()}</td>
                        <td className="p-3">
                          {market.trend === "up" ? <TrendingUp className="h-4 w-4 text-success" /> : <TrendingDown className="h-4 w-4 text-destructive" />}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          {/* Top Creators by Revenue */}
          <Card className="border-border/40">
            <CardHeader className="pb-3"><CardTitle className="text-base flex items-center gap-2"><Star className="h-4 w-4" /> Top Creators by Revenue</CardTitle></CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border/40 text-left text-sm text-muted-foreground">
                      <th className="p-3 font-medium">Creator</th>
                      <th className="p-3 font-medium">Markets</th>
                      <th className="p-3 font-medium">Volume</th>
                      <th className="p-3 font-medium">Fee Revenue</th>
                      <th className="p-3 font-medium">Creator Earnings (20%)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {topCreators.map((c, i) => (
                      <tr key={i} className="border-b border-border/20 hover:bg-muted/30 transition-colors">
                        <td className="p-3 font-medium">{c.name}</td>
                        <td className="p-3 text-sm">{c.markets}</td>
                        <td className="p-3 text-sm">${(c.volume / 1000).toFixed(0)}K</td>
                        <td className="p-3 text-sm font-medium text-success">${c.feeRevenue.toLocaleString()}</td>
                        <td className="p-3 text-sm font-medium">${c.earnings.toLocaleString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card className="border-border/40">
              <CardHeader className="pb-3"><CardTitle className="text-base">Markets by Category</CardTitle></CardHeader>
              <CardContent>
                <div className="h-48">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie data={categoryDistribution} cx="50%" cy="50%" innerRadius={40} outerRadius={70} paddingAngle={4} dataKey="value">
                        {categoryDistribution.map((_, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip contentStyle={tooltipStyle} />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
            <Card className="border-border/40">
              <CardHeader className="pb-3"><CardTitle className="text-base">Trading Volume Over Time</CardTitle></CardHeader>
              <CardContent>
                <div className="h-48">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={volumeData}>
                      <CartesianGrid strokeDasharray="3 3" className="stroke-border/40" />
                      <XAxis dataKey="week" tick={tickStyle} />
                      <YAxis tick={tickStyle} tickFormatter={(v) => `$${(v / 1000000).toFixed(1)}M`} />
                      <Tooltip contentStyle={tooltipStyle} formatter={(value: number) => [`$${(value / 1000000).toFixed(2)}M`, 'Volume']} />
                      <Bar dataKey="volume" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="marketing" className="space-y-4">
          <AdminMarketing />
        </TabsContent>
      </Tabs>
    </div>
  );
};
