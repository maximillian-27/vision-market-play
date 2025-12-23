import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  BarChart3, 
  TrendingUp, 
  TrendingDown, 
  Users, 
  DollarSign, 
  Activity, 
  ArrowUpRight, 
  ArrowDownRight,
  PieChart,
  LineChart,
  Download,
  Calendar,
  Target,
  Zap
} from "lucide-react";
import { Progress } from "@/components/ui/progress";

const kpis = {
  revenue: { value: 124500, change: 12.5, label: "Revenue (24h)" },
  users: { value: 8450, change: 8.3, label: "Active Users (24h)" },
  volume: { value: 234000, change: -3.2, label: "Trading Volume (24h)" },
  signups: { value: 347, change: 15.7, label: "New Signups (24h)" },
  retention: { value: 78.5, change: 2.1, label: "Retention Rate %" },
  avgSession: { value: 12.5, change: 5.4, label: "Avg Session (min)" },
};

const trafficSources = [
  { source: "Organic Search", users: 34500, percentage: 35 },
  { source: "Direct", users: 28900, percentage: 29 },
  { source: "Referral", users: 18600, percentage: 19 },
  { source: "Social Media", users: 12400, percentage: 12 },
  { source: "Paid Ads", users: 4900, percentage: 5 },
];

const topMarkets = [
  { name: "Bitcoin Price EOY", volume: 125000, trades: 4560, trend: "up" },
  { name: "US Election 2024", volume: 98000, trades: 3200, trend: "up" },
  { name: "Tesla Stock Q1", volume: 67000, trades: 2100, trend: "down" },
  { name: "AI Breakthrough", volume: 54000, trades: 1890, trend: "up" },
  { name: "Fed Rate Decision", volume: 45000, trades: 1560, trend: "down" },
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
  { stage: "Verified", count: 8750, rate: 70 },
  { stage: "First Deposit", count: 5250, rate: 60 },
  { stage: "Active Traders", count: 3675, rate: 70 },
];

export const AdminAnalytics = () => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <h2 className="text-xl font-semibold">Analytics & BI</h2>
        <div className="flex items-center gap-3">
          <Select defaultValue="7d">
            <SelectTrigger className="w-32 h-9">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="24h">Last 24h</SelectItem>
              <SelectItem value="7d">Last 7 days</SelectItem>
              <SelectItem value="30d">Last 30 days</SelectItem>
              <SelectItem value="90d">Last 90 days</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="sm" className="gap-2">
            <Download className="h-4 w-4" />
            Export
          </Button>
        </div>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList className="bg-muted/50 p-1 flex-wrap h-auto gap-1">
          <TabsTrigger value="overview" className="data-[state=active]:bg-background gap-2">
            <BarChart3 className="h-4 w-4" />
            Overview
          </TabsTrigger>
          <TabsTrigger value="users" className="data-[state=active]:bg-background gap-2">
            <Users className="h-4 w-4" />
            User Analytics
          </TabsTrigger>
          <TabsTrigger value="markets" className="data-[state=active]:bg-background gap-2">
            <TrendingUp className="h-4 w-4" />
            Market Analytics
          </TabsTrigger>
          <TabsTrigger value="revenue" className="data-[state=active]:bg-background gap-2">
            <DollarSign className="h-4 w-4" />
            Revenue
          </TabsTrigger>
          <TabsTrigger value="funnel" className="data-[state=active]:bg-background gap-2">
            <Target className="h-4 w-4" />
            Funnel
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          {/* KPI Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
            {Object.entries(kpis).map(([key, kpi]) => (
              <Card key={key} className="border-border/40">
                <CardContent className="p-4">
                  <p className="text-sm text-muted-foreground mb-1">{kpi.label}</p>
                  <div className="flex items-center gap-2">
                    <p className="text-2xl font-bold">
                      {key === "revenue" || key === "volume" ? `$${(kpi.value / 1000).toFixed(0)}K` :
                       key === "retention" || key === "avgSession" ? kpi.value : kpi.value.toLocaleString()}
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

          {/* Traffic Sources */}
          <Card className="border-border/40">
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Traffic Sources</CardTitle>
            </CardHeader>
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

        <TabsContent value="users" className="space-y-4">
          {/* User Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {userMetrics.map((metric) => (
              <Card key={metric.metric} className="border-border/40">
                <CardContent className="p-4">
                  <p className="text-sm text-muted-foreground mb-2">{metric.metric}</p>
                  <div className="flex items-center justify-between">
                    <p className="text-2xl font-bold">{metric.value}</p>
                    <div className="text-right">
                      <p className="text-xs text-muted-foreground">Benchmark</p>
                      <Badge variant={metric.status === "good" ? "default" : "secondary"} className="text-xs">
                        {metric.benchmark}
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* User Activity Chart Placeholder */}
          <Card className="border-border/40">
            <CardHeader className="pb-3">
              <CardTitle className="text-base">User Activity Over Time</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64 flex items-center justify-center border border-dashed border-border rounded-lg">
                <div className="text-center text-muted-foreground">
                  <LineChart className="h-8 w-8 mx-auto mb-2" />
                  <p className="text-sm">Activity chart visualization</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="markets" className="space-y-4">
          {/* Top Markets */}
          <Card className="border-border/40">
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Top Performing Markets</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border/40 text-left text-sm text-muted-foreground">
                      <th className="p-3 font-medium">Market</th>
                      <th className="p-3 font-medium">Volume</th>
                      <th className="p-3 font-medium">Trades</th>
                      <th className="p-3 font-medium">Trend</th>
                    </tr>
                  </thead>
                  <tbody>
                    {topMarkets.map((market, index) => (
                      <tr key={index} className="border-b border-border/20 hover:bg-muted/30 transition-colors">
                        <td className="p-3 font-medium">{market.name}</td>
                        <td className="p-3 text-sm">${market.volume.toLocaleString()}</td>
                        <td className="p-3 text-sm">{market.trades.toLocaleString()}</td>
                        <td className="p-3">
                          {market.trend === "up" ? (
                            <TrendingUp className="h-4 w-4 text-success" />
                          ) : (
                            <TrendingDown className="h-4 w-4 text-destructive" />
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          {/* Market Distribution */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card className="border-border/40">
              <CardHeader className="pb-3">
                <CardTitle className="text-base">Markets by Category</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-48 flex items-center justify-center border border-dashed border-border rounded-lg">
                  <div className="text-center text-muted-foreground">
                    <PieChart className="h-8 w-8 mx-auto mb-2" />
                    <p className="text-sm">Category distribution</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="border-border/40">
              <CardHeader className="pb-3">
                <CardTitle className="text-base">Volume Over Time</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-48 flex items-center justify-center border border-dashed border-border rounded-lg">
                  <div className="text-center text-muted-foreground">
                    <BarChart3 className="h-8 w-8 mx-auto mb-2" />
                    <p className="text-sm">Volume trends</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="revenue" className="space-y-4">
          {/* Revenue Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <Card className="border-border/40 bg-success/5">
              <CardContent className="p-4">
                <div className="flex items-center gap-2 text-success text-sm mb-1">
                  <DollarSign className="h-4 w-4" />
                  Total Revenue (MTD)
                </div>
                <p className="text-2xl font-bold">$1.24M</p>
              </CardContent>
            </Card>
            <Card className="border-border/40">
              <CardContent className="p-4">
                <p className="text-sm text-muted-foreground mb-1">Trading Fees</p>
                <p className="text-2xl font-bold">$890K</p>
              </CardContent>
            </Card>
            <Card className="border-border/40">
              <CardContent className="p-4">
                <p className="text-sm text-muted-foreground mb-1">Withdrawal Fees</p>
                <p className="text-2xl font-bold">$125K</p>
              </CardContent>
            </Card>
            <Card className="border-border/40">
              <CardContent className="p-4">
                <p className="text-sm text-muted-foreground mb-1">Other Revenue</p>
                <p className="text-2xl font-bold">$225K</p>
              </CardContent>
            </Card>
          </div>

          {/* Revenue Chart */}
          <Card className="border-border/40">
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Revenue Trend</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64 flex items-center justify-center border border-dashed border-border rounded-lg">
                <div className="text-center text-muted-foreground">
                  <LineChart className="h-8 w-8 mx-auto mb-2" />
                  <p className="text-sm">Revenue over time</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="funnel" className="space-y-4">
          <Card className="border-border/40">
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Conversion Funnel</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {conversionFunnel.map((stage, index) => (
                <div key={stage.stage} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-xs font-medium text-primary">
                        {index + 1}
                      </div>
                      <span className="font-medium">{stage.stage}</span>
                    </div>
                    <div className="text-right">
                      <span className="font-medium">{stage.count.toLocaleString()}</span>
                      {index > 0 && (
                        <span className="text-sm text-muted-foreground ml-2">({stage.rate}% conversion)</span>
                      )}
                    </div>
                  </div>
                  <Progress value={(stage.count / conversionFunnel[0].count) * 100} className="h-3" />
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Funnel Insights */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="border-border/40 bg-success/5">
              <CardContent className="p-4">
                <div className="flex items-center gap-2 text-success text-sm mb-1">
                  <Zap className="h-4 w-4" />
                  Best Performing
                </div>
                <p className="font-medium">Signups → Verified</p>
                <p className="text-2xl font-bold">70%</p>
              </CardContent>
            </Card>
            <Card className="border-border/40 bg-warning/5">
              <CardContent className="p-4">
                <div className="flex items-center gap-2 text-warning text-sm mb-1">
                  <Target className="h-4 w-4" />
                  Needs Improvement
                </div>
                <p className="font-medium">Visitors → Signups</p>
                <p className="text-2xl font-bold">10%</p>
              </CardContent>
            </Card>
            <Card className="border-border/40">
              <CardContent className="p-4">
                <p className="text-sm text-muted-foreground mb-1">Overall Conversion</p>
                <p className="text-2xl font-bold">2.94%</p>
                <p className="text-xs text-muted-foreground">Visitors → Active Traders</p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};
