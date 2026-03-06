import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import {
  BarChart3, TrendingUp, TrendingDown, Users, DollarSign,
  ArrowUpRight, ArrowDownRight, Download, Target, Zap, Megaphone, Percent, Star, UserPlus,
  Banknote, PieChart as PieChartIcon, Scale,
} from "lucide-react";
import { toast } from "sonner";
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

const performanceExtras = [
  { label: "Avg Trade Size", value: "$485", change: 3.4 },
  { label: "Markets Created", value: "47", change: 12.0 },
  { label: "Platform Take Rate", value: "3.0%", change: 0 },
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

const topAffiliates = [
  { name: "PromoQueen", referrals: 312, volume: 567000, feeRevenue: 17010, earnings: 3402 },
  { name: "ReferKing", referrals: 145, volume: 234000, feeRevenue: 7020, earnings: 1404 },
  { name: "GrowthHacker", referrals: 89, volume: 156000, feeRevenue: 4680, earnings: 936 },
  { name: "MarketingPro", referrals: 67, volume: 98000, feeRevenue: 2940, earnings: 588 },
  { name: "InfluencerMax", referrals: 45, volume: 67000, feeRevenue: 2010, earnings: 402 },
];

const creatorGrowthData = [
  { month: "Aug", creators: 42, affiliates: 18 },
  { month: "Sep", creators: 58, affiliates: 25 },
  { month: "Oct", creators: 78, affiliates: 34 },
  { month: "Nov", creators: 102, affiliates: 48 },
  { month: "Dec", creators: 128, affiliates: 62 },
  { month: "Jan", creators: 156, affiliates: 89 },
];

const userMetrics = [
  { metric: "DAU/MAU Ratio", value: "36%", benchmark: "30%", status: "good" },
  { metric: "Avg Revenue Per User", value: "$45", benchmark: "$38", status: "good" },
  { metric: "Churn Rate (30d)", value: "4.2%", benchmark: "5%", status: "good" },
  { metric: "Customer Acquisition Cost", value: "$28", benchmark: "$25", status: "warning" },
  { metric: "Lifetime Value", value: "$890", benchmark: "$750", status: "good" },
  { metric: "LTV:CAC Ratio", value: "31.8x", benchmark: ">3x", status: "good" },
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

const geoBreakdown = [
  { country: "United States", users: 34500, percentage: 28, volume: "$4.2M" },
  { country: "United Kingdom", users: 18200, percentage: 15, volume: "$2.1M" },
  { country: "Serbia", users: 12400, percentage: 10, volume: "$1.4M" },
  { country: "Romania", users: 9800, percentage: 8, volume: "$980K" },
  { country: "Germany", users: 8900, percentage: 7, volume: "$1.1M" },
  { country: "Greece", users: 7200, percentage: 6, volume: "$720K" },
  { country: "Other", users: 33500, percentage: 26, volume: "$3.8M" },
];

const deviceSplit = [
  { device: "Mobile", percentage: 62, users: 77190 },
  { device: "Desktop", percentage: 31, users: 38595 },
  { device: "Tablet", percentage: 7, users: 8715 },
];

const ageRanges = [
  { range: "18-24", percentage: 22 },
  { range: "25-34", percentage: 38 },
  { range: "35-44", percentage: 24 },
  { range: "45-54", percentage: 11 },
  { range: "55+", percentage: 5 },
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

// Financial P&L Data
const plMonthly = [
  { month: "Aug", revenue: 68000, costs: 28000, profit: 40000 },
  { month: "Sep", revenue: 82000, costs: 33000, profit: 49000 },
  { month: "Oct", revenue: 95000, costs: 38000, profit: 57000 },
  { month: "Nov", revenue: 108000, costs: 42000, profit: 66000 },
  { month: "Dec", revenue: 115000, costs: 45000, profit: 70000 },
  { month: "Jan", revenue: 124500, costs: 48000, profit: 76500 },
];

const costBreakdown = [
  { name: "Creator Payouts", value: 24900, percent: 51.9 },
  { name: "Affiliate Payouts", value: 10080, percent: 21.0 },
  { name: "Infrastructure", value: 5200, percent: 10.8 },
  { name: "Support Staff", value: 4800, percent: 10.0 },
  { name: "Marketing Spend", value: 3020, percent: 6.3 },
];

const revenueBySource = [
  { source: "Organic Users", volume: 8500000, revenue: 255000, percent: 52.1 },
  { source: "Creator Markets", volume: 6300000, revenue: 189000, percent: 38.6 },
  { source: "Affiliate Referrals", volume: 3100000, revenue: 93000, percent: 19.0 },
  { source: "VIP/Whale Users", volume: 2800000, revenue: 84000, percent: 17.2 },
];

const unitEconomics = [
  { label: "Revenue per Trade", value: "$14.85", change: 2.1 },
  { label: "Revenue per Market", value: "$2,450", change: 5.3 },
  { label: "Revenue per Creator", value: "$5,128", change: 8.1 },
  { label: "Revenue per Affiliate", value: "$3,370", change: 4.2 },
  { label: "Cost per User Acquired", value: "$28", change: -3.5 },
  { label: "Payback Period (days)", value: "18", change: -12.0 },
];

const tooltipStyle = { backgroundColor: 'hsl(var(--popover))', border: '1px solid hsl(var(--border))', borderRadius: '8px', color: 'hsl(var(--popover-foreground))' };
const tickStyle = { fill: 'hsl(var(--muted-foreground))', fontSize: 12 };

export const AdminAnalytics = () => {
  const totalCreatorVolume = topCreators.reduce((a, c) => a + c.volume, 0);
  const totalAffiliateVolume = topAffiliates.reduce((a, c) => a + c.volume, 0);
  const avgRevenuePerCreator = topCreators.length > 0 ? (totalCreatorVolume * 0.03) / topCreators.length : 0;
  const avgRevenuePerAffiliate = topAffiliates.length > 0 ? (totalAffiliateVolume * 0.03) / topAffiliates.length : 0;

  return (
    <div className="space-y-6">
      <Tabs defaultValue="performance" className="space-y-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <TabsList className="bg-muted/50 p-1 flex-wrap h-auto gap-1">
            <TabsTrigger value="performance" className="data-[state=active]:bg-background gap-2"><BarChart3 className="h-4 w-4" /> Performance</TabsTrigger>
            <TabsTrigger value="financial" className="data-[state=active]:bg-background gap-2"><Banknote className="h-4 w-4" /> Financial</TabsTrigger>
            <TabsTrigger value="users-funnel" className="data-[state=active]:bg-background gap-2"><Users className="h-4 w-4" /> Users & Funnel</TabsTrigger>
            <TabsTrigger value="markets" className="data-[state=active]:bg-background gap-2"><TrendingUp className="h-4 w-4" /> Markets</TabsTrigger>
            <TabsTrigger value="creators-affiliates" className="data-[state=active]:bg-background gap-2"><Star className="h-4 w-4" /> Creators & Affiliates</TabsTrigger>
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

          <div className="grid grid-cols-3 gap-4">
            {performanceExtras.map((kpi) => (
              <Card key={kpi.label} className="border-border/40">
                <CardContent className="p-4">
                  <p className="text-sm text-muted-foreground mb-1">{kpi.label}</p>
                  <div className="flex items-center gap-2">
                    <p className="text-2xl font-bold">{kpi.value}</p>
                    {kpi.change !== 0 && (
                      <Badge className={`text-xs border-0 ${kpi.change >= 0 ? 'bg-success/10 text-success' : 'bg-destructive/10 text-destructive'}`}>
                        {kpi.change >= 0 ? <ArrowUpRight className="h-3 w-3 mr-1" /> : <ArrowDownRight className="h-3 w-3 mr-1" />}
                        {Math.abs(kpi.change)}%
                      </Badge>
                    )}
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
        </TabsContent>

        {/* Financial — CFO Critical */}
        <TabsContent value="financial" className="space-y-4">
          {/* P&L Summary Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <Card className="border-border/40 bg-success/5">
              <CardContent className="p-4">
                <div className="flex items-center gap-2 text-success text-sm mb-1"><DollarSign className="h-4 w-4" /> Gross Revenue</div>
                <p className="text-2xl font-bold">$124.5K</p>
                <Badge className="text-xs bg-success/10 text-success border-0 mt-1"><ArrowUpRight className="h-3 w-3 mr-1" />12.5%</Badge>
              </CardContent>
            </Card>
            <Card className="border-border/40 bg-destructive/5">
              <CardContent className="p-4">
                <div className="flex items-center gap-2 text-destructive text-sm mb-1"><ArrowDownRight className="h-4 w-4" /> Total Costs</div>
                <p className="text-2xl font-bold">$48.0K</p>
                <p className="text-xs text-muted-foreground mt-1">38.6% of revenue</p>
              </CardContent>
            </Card>
            <Card className="border-border/40 bg-success/5">
              <CardContent className="p-4">
                <div className="flex items-center gap-2 text-success text-sm mb-1"><Banknote className="h-4 w-4" /> Net Profit</div>
                <p className="text-2xl font-bold">$76.5K</p>
                <Badge className="text-xs bg-success/10 text-success border-0 mt-1"><ArrowUpRight className="h-3 w-3 mr-1" />61.4% margin</Badge>
              </CardContent>
            </Card>
            <Card className="border-border/40">
              <CardContent className="p-4">
                <div className="flex items-center gap-2 text-muted-foreground text-sm mb-1"><Scale className="h-4 w-4" /> Burn Rate</div>
                <p className="text-2xl font-bold">$0</p>
                <p className="text-xs text-success mt-1">Cash flow positive ✓</p>
              </CardContent>
            </Card>
          </div>

          {/* P&L Chart */}
          <Card className="border-border/40">
            <CardHeader className="pb-3"><CardTitle className="text-base">Monthly P&L Trend</CardTitle></CardHeader>
            <CardContent>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={plMonthly}>
                    <CartesianGrid strokeDasharray="3 3" className="stroke-border/40" />
                    <XAxis dataKey="month" tick={tickStyle} />
                    <YAxis tick={tickStyle} tickFormatter={(v) => `$${(v / 1000).toFixed(0)}K`} />
                    <Tooltip contentStyle={tooltipStyle} formatter={(value: number) => [`$${value.toLocaleString()}`, '']} />
                    <Legend />
                    <Bar dataKey="revenue" name="Revenue" fill="hsl(var(--success))" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="costs" name="Costs" fill="hsl(var(--destructive))" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="profit" name="Net Profit" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Cost Breakdown + Revenue by Source */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <Card className="border-border/40">
              <CardHeader className="pb-3"><CardTitle className="text-base flex items-center gap-2"><PieChartIcon className="h-4 w-4" /> Cost Breakdown</CardTitle></CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {costBreakdown.map((item) => (
                    <div key={item.name} className="space-y-1">
                      <div className="flex items-center justify-between text-sm">
                        <span>{item.name}</span>
                        <span className="font-medium">${(item.value / 1000).toFixed(1)}K ({item.percent}%)</span>
                      </div>
                      <Progress value={item.percent} className="h-2" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="border-border/40">
              <CardHeader className="pb-3"><CardTitle className="text-base">Revenue by Source</CardTitle></CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {revenueBySource.map((src) => (
                    <div key={src.source} className="space-y-1">
                      <div className="flex items-center justify-between text-sm">
                        <span>{src.source}</span>
                        <span className="font-medium">${(src.revenue / 1000).toFixed(0)}K ({src.percent}%)</span>
                      </div>
                      <Progress value={src.percent} className="h-2" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Unit Economics */}
          <Card className="border-border/40">
            <CardHeader className="pb-3"><CardTitle className="text-base">Unit Economics</CardTitle></CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
                {unitEconomics.map((item) => (
                  <div key={item.label} className="p-3 rounded-lg bg-muted/30">
                    <p className="text-xs text-muted-foreground mb-1">{item.label}</p>
                    <p className="text-lg font-bold">{item.value}</p>
                    <Badge className={`text-xs mt-1 border-0 ${item.change >= 0 ? 'bg-success/10 text-success' : 'bg-destructive/10 text-destructive'}`}>
                      {item.change >= 0 ? <ArrowUpRight className="h-3 w-3 mr-1" /> : <ArrowDownRight className="h-3 w-3 mr-1" />}
                      {Math.abs(item.change)}%
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Users & Funnel */}
        <TabsContent value="users-funnel" className="space-y-4">
          {/* User Activity */}
          <Card className="border-border/40">
            <CardHeader className="pb-3"><CardTitle className="text-base">Weekly User Activity</CardTitle></CardHeader>
            <CardContent>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={userActivityData}>
                    <CartesianGrid strokeDasharray="3 3" className="stroke-border/40" />
                    <XAxis dataKey="day" tick={tickStyle} />
                    <YAxis yAxisId="left" tick={tickStyle} />
                    <YAxis yAxisId="right" orientation="right" tick={tickStyle} />
                    <Tooltip contentStyle={tooltipStyle} />
                    <Legend />
                    <Line yAxisId="left" type="monotone" dataKey="dau" name="DAU" stroke="hsl(var(--primary))" strokeWidth={2} dot={{ r: 4 }} />
                    <Line yAxisId="right" type="monotone" dataKey="newUsers" name="New Users" stroke="hsl(var(--success))" strokeWidth={2} dot={{ r: 4 }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Conversion Funnel */}
          <Card className="border-border/40">
            <CardHeader className="pb-3"><CardTitle className="text-base">Conversion Funnel</CardTitle></CardHeader>
            <CardContent>
              <div className="space-y-3">
                {conversionFunnel.map((stage, idx) => (
                  <div key={stage.stage} className="space-y-1">
                    <div className="flex items-center justify-between text-sm">
                      <span>{stage.stage}</span>
                      <span className="font-medium">{stage.count.toLocaleString()} {idx > 0 && `(${stage.rate}% of previous)`}</span>
                    </div>
                    <Progress value={stage.rate} className="h-2" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* User Metrics + Geo Breakdown */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <Card className="border-border/40">
              <CardHeader className="pb-3"><CardTitle className="text-base">Key User Metrics</CardTitle></CardHeader>
              <CardContent className="space-y-3">
                {userMetrics.map((metric) => (
                  <div key={metric.metric} className="p-2 rounded hover:bg-muted/30 transition-colors">
                    <div className="flex items-center justify-between text-sm mb-1">
                      <span>{metric.metric}</span>
                      <span className={`font-medium ${metric.status === 'good' ? 'text-success' : 'text-warning'}`}>{metric.value}</span>
                    </div>
                    <p className="text-xs text-muted-foreground">vs. {metric.benchmark}</p>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card className="border-border/40">
              <CardHeader className="pb-3"><CardTitle className="text-base">Geo Breakdown</CardTitle></CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {geoBreakdown.map((geo) => (
                    <div key={geo.country} className="space-y-1">
                      <div className="flex items-center justify-between text-sm">
                        <span>{geo.country}</span>
                        <span className="font-medium">{geo.volume}</span>
                      </div>
                      <Progress value={geo.percentage} className="h-2" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Device & Demographics */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <Card className="border-border/40">
              <CardHeader className="pb-3"><CardTitle className="text-base">Device Split</CardTitle></CardHeader>
              <CardContent>
                <div className="h-64 flex items-center justify-center">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie data={deviceSplit} cx="50%" cy="50%" labelLine={false} label={({ device, percentage }) => `${device} ${percentage}%`} outerRadius={80} fill="hsl(var(--primary))" dataKey="percentage">
                        {COLORS.map((color, index) => (
                          <Cell key={`cell-${index}`} fill={color} />
                        ))}
                      </Pie>
                      <Tooltip contentStyle={tooltipStyle} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card className="border-border/40">
              <CardHeader className="pb-3"><CardTitle className="text-base">Age Demographics</CardTitle></CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {ageRanges.map((age) => (
                    <div key={age.range} className="space-y-1">
                      <div className="flex items-center justify-between text-sm">
                        <span>{age.range}</span>
                        <span className="font-medium">{age.percentage}%</span>
                      </div>
                      <Progress value={age.percentage} className="h-2" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Markets Tab */}
        <TabsContent value="markets" className="space-y-4">
          <Card className="border-border/40">
            <CardHeader className="pb-3"><CardTitle className="text-base">Trading Volume Trend</CardTitle></CardHeader>
            <CardContent>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={volumeData}>
                    <CartesianGrid strokeDasharray="3 3" className="stroke-border/40" />
                    <XAxis dataKey="week" tick={tickStyle} />
                    <YAxis tick={tickStyle} tickFormatter={(v) => `$${(v / 1000000).toFixed(1)}M`} />
                    <Tooltip contentStyle={tooltipStyle} formatter={(value: number) => `$${(value / 1000000).toFixed(2)}M`} />
                    <Bar dataKey="volume" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <Card className="border-border/40">
            <CardHeader className="pb-3"><CardTitle className="text-base">Top Markets</CardTitle></CardHeader>
            <CardContent>
              <div className="space-y-3">
                {topMarkets.map((market) => (
                  <div key={market.name} className="p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <p className="font-medium text-sm">{market.name}</p>
                        <p className="text-xs text-muted-foreground">{market.trades.toLocaleString()} trades</p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium text-sm">${(market.volume / 1000).toFixed(0)}K</p>
                        <Badge className={`text-xs border-0 ${market.trend === 'up' ? 'bg-success/10 text-success' : 'bg-destructive/10 text-destructive'}`}>
                          {market.trend === 'up' ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
                        </Badge>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="border-border/40">
            <CardHeader className="pb-3"><CardTitle className="text-base">Category Distribution</CardTitle></CardHeader>
            <CardContent>
              <div className="h-64 flex items-center justify-center">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={categoryDistribution} cx="50%" cy="50%" labelLine={false} label={({ name, value }) => `${name} ${value}%`} outerRadius={80} fill="hsl(var(--primary))" dataKey="value">
                      {COLORS.map((color, index) => (
                        <Cell key={`cell-${index}`} fill={color} />
                      ))}
                    </Pie>
                    <Tooltip contentStyle={tooltipStyle} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Creators & Affiliates Tab */}
        <TabsContent value="creators-affiliates" className="space-y-4">
          <Card className="border-border/40">
            <CardHeader className="pb-3"><CardTitle className="text-base">Creator & Affiliate Growth</CardTitle></CardHeader>
            <CardContent>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={creatorGrowthData}>
                    <CartesianGrid strokeDasharray="3 3" className="stroke-border/40" />
                    <XAxis dataKey="month" tick={tickStyle} />
                    <YAxis tick={tickStyle} />
                    <Tooltip contentStyle={tooltipStyle} />
                    <Legend />
                    <Line type="monotone" dataKey="creators" name="Creators" stroke="hsl(var(--primary))" strokeWidth={2} dot={{ r: 4 }} />
                    <Line type="monotone" dataKey="affiliates" name="Affiliates" stroke="hsl(var(--success))" strokeWidth={2} dot={{ r: 4 }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <Card className="border-border/40">
              <CardHeader className="pb-3"><CardTitle className="text-base">Top Creators</CardTitle></CardHeader>
              <CardContent className="space-y-3">
                {topCreators.map((creator) => (
                  <div key={creator.name} className="p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors">
                    <div className="flex items-start justify-between mb-2">
                      <p className="font-medium text-sm">{creator.name}</p>
                      <Badge className="text-xs bg-primary/10 text-primary border-0">{creator.markets} markets</Badge>
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div>
                        <p className="text-muted-foreground">Volume</p>
                        <p className="font-medium">${(creator.volume / 1000).toFixed(0)}K</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Earnings</p>
                        <p className="font-medium text-success">${(creator.earnings / 1000).toFixed(1)}K</p>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card className="border-border/40">
              <CardHeader className="pb-3"><CardTitle className="text-base">Top Affiliates</CardTitle></CardHeader>
              <CardContent className="space-y-3">
                {topAffiliates.map((affiliate) => (
                  <div key={affiliate.name} className="p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors">
                    <div className="flex items-start justify-between mb-2">
                      <p className="font-medium text-sm">{affiliate.name}</p>
                      <Badge className="text-xs bg-success/10 text-success border-0">{affiliate.referrals} referrals</Badge>
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div>
                        <p className="text-muted-foreground">Volume</p>
                        <p className="font-medium">${(affiliate.volume / 1000).toFixed(0)}K</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Earnings</p>
                        <p className="font-medium text-success">${(affiliate.earnings / 1000).toFixed(1)}K</p>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};
