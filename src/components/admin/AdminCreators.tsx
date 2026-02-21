import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Search, MoreHorizontal, Eye, CheckCircle, XCircle, Star, TrendingUp, Users,
  Link2, Copy, Plus, DollarSign, BarChart3, Wallet, Calendar, MessageSquare,
  Award, ArrowUpRight, ArrowDownRight, Target, UserPlus, Zap,
} from "lucide-react";
import { toast } from "sonner";
import {
  AreaChart, Area, LineChart, Line, BarChart, Bar,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend,
} from "recharts";

// --- Mock Data ---

const creators = [
  { id: 1, name: "CryptoGuru", email: "crypto@guru.com", status: "Active", tier: "Diamond", revShare: 3, markets: 45, potGenerated: 234000, followers: 12500, rating: 4.8, commission: 12400, lifetimeRevenue: 89000, playersReferred: 3200, lastActive: "2h ago" },
  { id: 2, name: "TechOracle", email: "tech@oracle.com", status: "Active", tier: "Platinum", revShare: 2.5, markets: 32, potGenerated: 189000, followers: 8900, rating: 4.6, commission: 8900, lifetimeRevenue: 62000, playersReferred: 2100, lastActive: "5h ago" },
  { id: 3, name: "PoliticalPredict", email: "political@predict.com", status: "Active", tier: "Gold", revShare: 2, markets: 28, potGenerated: 156000, followers: 6700, rating: 4.5, commission: 6200, lifetimeRevenue: 41000, playersReferred: 1500, lastActive: "1d ago" },
  { id: 4, name: "SportsAnalyst", email: "sports@analyst.com", status: "Pending", tier: "Bronze", revShare: 1, markets: 0, potGenerated: 0, followers: 0, rating: 0, commission: 0, lifetimeRevenue: 0, playersReferred: 0, lastActive: "N/A" },
  { id: 5, name: "MarketMaven", email: "market@maven.com", status: "Suspended", tier: "Silver", revShare: 1.5, markets: 12, potGenerated: 45000, followers: 2300, rating: 3.2, commission: 1800, lifetimeRevenue: 12000, playersReferred: 450, lastActive: "30d ago" },
  { id: 6, name: "FinanceWhiz", email: "finance@whiz.com", status: "Active", tier: "Gold", revShare: 2, markets: 22, potGenerated: 128000, followers: 5400, rating: 4.3, commission: 5100, lifetimeRevenue: 34000, playersReferred: 1100, lastActive: "12h ago" },
  { id: 7, name: "PopCulturePro", email: "pop@culture.com", status: "Active", tier: "Silver", revShare: 1.5, markets: 15, potGenerated: 67000, followers: 3800, rating: 4.1, commission: 2800, lifetimeRevenue: 18000, playersReferred: 780, lastActive: "3h ago" },
];

const revenueAttribution = [
  { week: "W1", creator: 42000, organic: 18000 },
  { week: "W2", creator: 48000, organic: 20000 },
  { week: "W3", creator: 45000, organic: 19000 },
  { week: "W4", creator: 55000, organic: 22000 },
  { week: "W5", creator: 61000, organic: 21000 },
  { week: "W6", creator: 58000, organic: 24000 },
  { week: "W7", creator: 67000, organic: 23000 },
  { week: "W8", creator: 72000, organic: 25000 },
];

const creatorRevenueTrend = [
  { month: "Sep", CryptoGuru: 12000, TechOracle: 9000, PoliticalPredict: 6500, FinanceWhiz: 5000, PopCulturePro: 2800 },
  { month: "Oct", CryptoGuru: 13500, TechOracle: 9800, PoliticalPredict: 7200, FinanceWhiz: 5600, PopCulturePro: 3100 },
  { month: "Nov", CryptoGuru: 14200, TechOracle: 10500, PoliticalPredict: 6800, FinanceWhiz: 5400, PopCulturePro: 3400 },
  { month: "Dec", CryptoGuru: 15800, TechOracle: 11200, PoliticalPredict: 7500, FinanceWhiz: 6100, PopCulturePro: 3200 },
  { month: "Jan", CryptoGuru: 16400, TechOracle: 10800, PoliticalPredict: 7100, FinanceWhiz: 5900, PopCulturePro: 3600 },
  { month: "Feb", CryptoGuru: 17100, TechOracle: 11500, PoliticalPredict: 6900, FinanceWhiz: 5800, PopCulturePro: 2900 },
];

const retentionData = [
  { period: "30d", creator: 72, organic: 58 },
  { period: "60d", creator: 61, organic: 44 },
  { period: "90d", creator: 53, organic: 35 },
];

const payoutHistory = [
  { id: 1, date: "Feb 14, 2026", creator: "CryptoGuru", amount: 3200, status: "Paid", method: "Bank Transfer" },
  { id: 2, date: "Feb 14, 2026", creator: "TechOracle", amount: 2400, status: "Paid", method: "Bank Transfer" },
  { id: 3, date: "Feb 14, 2026", creator: "PoliticalPredict", amount: 1800, status: "Paid", method: "Crypto" },
  { id: 4, date: "Feb 21, 2026", creator: "CryptoGuru", amount: 3400, status: "Processing", method: "Bank Transfer" },
  { id: 5, date: "Feb 21, 2026", creator: "TechOracle", amount: 2600, status: "Processing", method: "Bank Transfer" },
  { id: 6, date: "Feb 21, 2026", creator: "FinanceWhiz", amount: 1500, status: "Pending", method: "Crypto" },
  { id: 7, date: "Feb 21, 2026", creator: "PopCulturePro", amount: 900, status: "Pending", method: "Bank Transfer" },
];

const funnelData = [
  { stage: "Visitors", value: 125000 },
  { stage: "Signups", value: 18500 },
  { stage: "Depositors", value: 7200 },
  { stage: "Players", value: 5100 },
];

// --- Helpers ---

const tierColors: Record<string, string> = {
  Bronze: "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400",
  Silver: "bg-slate-100 text-slate-600 dark:bg-slate-800/50 dark:text-slate-400",
  Gold: "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400",
  Platinum: "bg-sky-100 text-sky-700 dark:bg-sky-900/30 dark:text-sky-400",
  Diamond: "bg-violet-100 text-violet-700 dark:bg-violet-900/30 dark:text-violet-400",
};

const tooltipStyle = {
  contentStyle: {
    backgroundColor: "hsl(var(--card))",
    border: "1px solid hsl(var(--border))",
    borderRadius: "8px",
    fontSize: "12px",
  },
};

const tickStyle = { fontSize: 11, fill: "hsl(var(--muted-foreground))" };

const chartColors = {
  creator: "hsl(152, 68%, 42%)",
  organic: "hsl(220, 13%, 70%)",
  lines: [
    "hsl(152, 68%, 42%)",
    "hsl(217, 91%, 60%)",
    "hsl(38, 92%, 50%)",
    "hsl(280, 65%, 60%)",
    "hsl(0, 84%, 60%)",
  ],
};

// --- Component ---

export const AdminCreators = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [tierFilter, setTierFilter] = useState("All");
  const [payoutSearch, setPayoutSearch] = useState("");
  const [payoutStatus, setPayoutStatus] = useState("All");

  const activeCreators = creators.filter(c => c.status === "Active");
  const totalPot = creators.reduce((a, c) => a + c.potGenerated, 0);
  const totalRevenue = creators.reduce((a, c) => a + c.lifetimeRevenue, 0);
  const totalCommission = creators.reduce((a, c) => a + c.commission, 0);
  const avgRevenue = activeCreators.length ? Math.round(totalRevenue / activeCreators.length) : 0;
  const roi = totalCommission > 0 ? ((totalRevenue - totalCommission) / totalCommission * 100).toFixed(0) : "0";

  const filteredCreators = creators.filter((c) => {
    const matchesSearch = c.name.toLowerCase().includes(searchQuery.toLowerCase()) || c.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "All" || c.status === statusFilter;
    const matchesTier = tierFilter === "All" || c.tier === tierFilter;
    return matchesSearch && matchesStatus && matchesTier;
  });

  const filteredPayouts = payoutHistory.filter((p) => {
    const matchesSearch = p.creator.toLowerCase().includes(payoutSearch.toLowerCase());
    const matchesStatus = payoutStatus === "All" || p.status === payoutStatus;
    return matchesSearch && matchesStatus;
  });

  const top5 = [...creators].filter(c => c.status === "Active").sort((a, b) => b.potGenerated - a.potGenerated).slice(0, 5);

  return (
    <div className="space-y-6">
      <Tabs defaultValue="dashboard" className="space-y-4">
        <TabsList className="bg-muted/50 p-1 flex-wrap h-auto">
          <TabsTrigger value="dashboard" className="data-[state=active]:bg-background gap-2"><BarChart3 className="h-4 w-4" /> Dashboard</TabsTrigger>
          <TabsTrigger value="creators" className="data-[state=active]:bg-background gap-2"><Users className="h-4 w-4" /> Creators</TabsTrigger>
          <TabsTrigger value="performance" className="data-[state=active]:bg-background gap-2"><TrendingUp className="h-4 w-4" /> Performance</TabsTrigger>
          <TabsTrigger value="payouts" className="data-[state=active]:bg-background gap-2"><Wallet className="h-4 w-4" /> Payouts</TabsTrigger>
          <TabsTrigger value="links" className="data-[state=active]:bg-background gap-2"><Link2 className="h-4 w-4" /> Links & Codes</TabsTrigger>
        </TabsList>

        {/* ===== DASHBOARD ===== */}
        <TabsContent value="dashboard" className="space-y-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <KPICard icon={Users} label="Active Creators" value={activeCreators.length} />
            <KPICard icon={UserPlus} label="Pending Applications" value={creators.filter(c => c.status === "Pending").length} accent />
            <KPICard icon={DollarSign} label="Total Pot Generated" value={`$${(totalPot / 1000).toFixed(0)}K`} />
            <KPICard icon={TrendingUp} label="Platform Revenue" value={`$${(totalRevenue / 1000).toFixed(0)}K`} />
            <KPICard icon={Target} label="Avg Rev / Creator" value={`$${(avgRevenue / 1000).toFixed(1)}K`} />
            <KPICard icon={Star} label="Creator Retention" value="91%" />
            <KPICard icon={Wallet} label="Commissions (MTD)" value={`$${totalCommission.toLocaleString()}`} />
            <KPICard icon={ArrowUpRight} label="ROI" value={`${roi}%`} positive />
          </div>

          {/* Revenue Attribution */}
          <Card className="border-border/40">
            <CardContent className="p-5">
              <h3 className="text-sm font-semibold mb-4">Revenue Attribution — Creator vs Organic</h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={revenueAttribution}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis dataKey="week" tick={tickStyle} />
                    <YAxis tick={tickStyle} tickFormatter={(v) => `$${v / 1000}K`} />
                    <Tooltip {...tooltipStyle} formatter={(v: number) => [`$${v.toLocaleString()}`, undefined]} />
                    <Legend />
                    <Area type="monotone" dataKey="creator" name="Creator-driven" stackId="1" fill={chartColors.creator} fillOpacity={0.3} stroke={chartColors.creator} strokeWidth={2} />
                    <Area type="monotone" dataKey="organic" name="Organic" stackId="1" fill={chartColors.organic} fillOpacity={0.2} stroke={chartColors.organic} strokeWidth={2} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Top 5 Leaderboard */}
          <Card className="border-border/40">
            <CardContent className="p-5">
              <h3 className="text-sm font-semibold mb-4">Top Creators Leaderboard</h3>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border/40 text-left text-xs text-muted-foreground">
                      <th className="pb-3 font-medium">#</th>
                      <th className="pb-3 font-medium">Creator</th>
                      <th className="pb-3 font-medium">Tier</th>
                      <th className="pb-3 font-medium">Pot Generated</th>
                      <th className="pb-3 font-medium">Revenue</th>
                      <th className="pb-3 font-medium">Players</th>
                    </tr>
                  </thead>
                  <tbody>
                    {top5.map((c, i) => (
                      <tr key={c.id} className="border-b border-border/20 hover:bg-muted/30 transition-colors">
                        <td className="py-3 text-sm font-bold text-muted-foreground">{i + 1}</td>
                        <td className="py-3 text-sm font-medium">{c.name}</td>
                        <td className="py-3"><Badge className={`text-[10px] ${tierColors[c.tier]} border-0`}>{c.tier}</Badge></td>
                        <td className="py-3 text-sm font-medium text-primary">${c.potGenerated.toLocaleString()}</td>
                        <td className="py-3 text-sm">${c.lifetimeRevenue.toLocaleString()}</td>
                        <td className="py-3 text-sm">{c.playersReferred.toLocaleString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* ===== CREATORS ===== */}
        <TabsContent value="creators" className="space-y-4">
          <div className="flex flex-wrap items-center gap-2">
            {["All", "Active", "Pending", "Suspended"].map((s) => (
              <Button key={s} size="sm" variant={statusFilter === s ? "default" : "outline"} className="h-7 text-xs" onClick={() => setStatusFilter(s)}>{s}</Button>
            ))}
            <div className="w-px h-5 bg-border/60 mx-1" />
            {["All", "Diamond", "Platinum", "Gold", "Silver", "Bronze"].map((t) => (
              <Button key={t} size="sm" variant={tierFilter === t ? "secondary" : "ghost"} className="h-7 text-xs" onClick={() => setTierFilter(t)}>{t}</Button>
            ))}
            <div className="ml-auto relative w-full sm:w-56">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search creators..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="pl-9 h-8 text-sm" />
            </div>
          </div>
          <Card className="border-border/40">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border/40 text-left text-xs text-muted-foreground">
                    <th className="p-3 font-medium">Creator</th>
                    <th className="p-3 font-medium">Tier</th>
                    <th className="p-3 font-medium">Status</th>
                    <th className="p-3 font-medium">Rev Share</th>
                    <th className="p-3 font-medium">Markets</th>
                    <th className="p-3 font-medium">Pot Generated</th>
                    <th className="p-3 font-medium">Lifetime Rev</th>
                    <th className="p-3 font-medium">Players</th>
                    <th className="p-3 font-medium">Last Active</th>
                    <th className="p-3 font-medium text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredCreators.map((c) => (
                    <tr key={c.id} className="border-b border-border/20 hover:bg-muted/30 transition-colors">
                      <td className="p-3">
                        <p className="font-medium text-sm">{c.name}</p>
                        <p className="text-xs text-muted-foreground">{c.email}</p>
                      </td>
                      <td className="p-3"><Badge className={`text-[10px] ${tierColors[c.tier]} border-0`}>{c.tier}</Badge></td>
                      <td className="p-3">
                        <Badge variant={c.status === "Active" ? "default" : c.status === "Pending" ? "secondary" : "destructive"} className="text-[10px]">{c.status}</Badge>
                      </td>
                      <td className="p-3 text-sm font-medium">{c.revShare}%</td>
                      <td className="p-3 text-sm">{c.markets}</td>
                      <td className="p-3 text-sm font-medium text-primary">${c.potGenerated.toLocaleString()}</td>
                      <td className="p-3 text-sm">${c.lifetimeRevenue.toLocaleString()}</td>
                      <td className="p-3 text-sm">{c.playersReferred.toLocaleString()}</td>
                      <td className="p-3 text-xs text-muted-foreground">{c.lastActive}</td>
                      <td className="p-3 text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild><Button variant="ghost" size="icon" className="h-7 w-7"><MoreHorizontal className="h-4 w-4" /></Button></DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="bg-popover">
                            <DropdownMenuItem className="gap-2 text-xs" onClick={() => toast(`Viewing ${c.name}`)}><Eye className="h-3.5 w-3.5" /> View Profile</DropdownMenuItem>
                            <DropdownMenuItem className="gap-2 text-xs" onClick={() => toast.success(`Editing commission for ${c.name}`)}><DollarSign className="h-3.5 w-3.5" /> Edit Commission</DropdownMenuItem>
                            <DropdownMenuItem className="gap-2 text-xs" onClick={() => toast(`Message sent to ${c.name}`)}><MessageSquare className="h-3.5 w-3.5" /> Send Message</DropdownMenuItem>
                            {c.status === "Active" && (
                              <DropdownMenuItem className="gap-2 text-xs text-destructive" onClick={() => toast(`${c.name} suspended`)}><XCircle className="h-3.5 w-3.5" /> Suspend</DropdownMenuItem>
                            )}
                            {c.status === "Suspended" && (
                              <DropdownMenuItem className="gap-2 text-xs text-primary" onClick={() => toast.success(`${c.name} reactivated`)}><CheckCircle className="h-3.5 w-3.5" /> Reactivate</DropdownMenuItem>
                            )}
                            {c.status === "Pending" && (
                              <>
                                <DropdownMenuItem className="gap-2 text-xs text-primary" onClick={() => toast.success(`${c.name} approved`)}><CheckCircle className="h-3.5 w-3.5" /> Approve</DropdownMenuItem>
                                <DropdownMenuItem className="gap-2 text-xs text-destructive" onClick={() => toast(`${c.name} rejected`)}><XCircle className="h-3.5 w-3.5" /> Reject</DropdownMenuItem>
                              </>
                            )}
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </TabsContent>

        {/* ===== PERFORMANCE ===== */}
        <TabsContent value="performance" className="space-y-6">
          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="border-border/40">
              <CardContent className="p-4">
                <div className="flex items-center gap-2 text-muted-foreground text-xs mb-2"><Target className="h-3.5 w-3.5" /> Best Converter</div>
                <p className="font-bold">CryptoGuru</p>
                <p className="text-xs text-muted-foreground mt-1">5.8% visitor → depositor rate</p>
              </CardContent>
            </Card>
            <Card className="border-border/40">
              <CardContent className="p-4">
                <div className="flex items-center gap-2 text-muted-foreground text-xs mb-2"><DollarSign className="h-3.5 w-3.5" /> Highest ARPU</div>
                <p className="font-bold">TechOracle</p>
                <p className="text-xs text-muted-foreground mt-1">$29.50 avg revenue per user</p>
              </CardContent>
            </Card>
            <Card className="border-border/40">
              <CardContent className="p-4">
                <div className="flex items-center gap-2 text-muted-foreground text-xs mb-2"><Zap className="h-3.5 w-3.5" /> Fastest Growing</div>
                <p className="font-bold">PopCulturePro</p>
                <p className="text-xs text-muted-foreground mt-1">+18% MoM revenue growth</p>
              </CardContent>
            </Card>
          </div>

          {/* Revenue Over Time */}
          <Card className="border-border/40">
            <CardContent className="p-5">
              <h3 className="text-sm font-semibold mb-4">Creator Revenue Over Time</h3>
              <div className="h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={creatorRevenueTrend}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis dataKey="month" tick={tickStyle} />
                    <YAxis tick={tickStyle} tickFormatter={(v) => `$${v / 1000}K`} />
                    <Tooltip {...tooltipStyle} formatter={(v: number) => [`$${v.toLocaleString()}`, undefined]} />
                    <Legend />
                    {["CryptoGuru", "TechOracle", "PoliticalPredict", "FinanceWhiz", "PopCulturePro"].map((name, i) => (
                      <Line key={name} type="monotone" dataKey={name} stroke={chartColors.lines[i]} strokeWidth={2} dot={false} />
                    ))}
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Conversion Funnel */}
            <Card className="border-border/40">
              <CardContent className="p-5">
                <h3 className="text-sm font-semibold mb-4">Creator Conversion Funnel</h3>
                <div className="space-y-3">
                  {funnelData.map((step, i) => {
                    const maxVal = funnelData[0].value;
                    const pct = (step.value / maxVal * 100);
                    const convRate = i > 0 ? (step.value / funnelData[i - 1].value * 100).toFixed(1) : "100";
                    return (
                      <div key={step.stage}>
                        <div className="flex justify-between text-xs mb-1">
                          <span className="font-medium">{step.stage}</span>
                          <span className="text-muted-foreground">{step.value.toLocaleString()} {i > 0 && <span className="text-primary">({convRate}%)</span>}</span>
                        </div>
                        <div className="h-6 bg-muted rounded-md overflow-hidden">
                          <div className="h-full bg-primary/20 rounded-md transition-all" style={{ width: `${pct}%` }}>
                            <div className="h-full bg-primary rounded-md" style={{ width: `${pct}%`, maxWidth: "100%" }} />
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            {/* Retention */}
            <Card className="border-border/40">
              <CardContent className="p-5">
                <h3 className="text-sm font-semibold mb-4">Referred User Retention</h3>
                <div className="h-52">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={retentionData} barGap={4}>
                      <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                      <XAxis dataKey="period" tick={tickStyle} />
                      <YAxis tick={tickStyle} tickFormatter={(v) => `${v}%`} />
                      <Tooltip {...tooltipStyle} formatter={(v: number) => [`${v}%`, undefined]} />
                      <Legend />
                      <Bar dataKey="creator" name="Creator-referred" fill={chartColors.creator} radius={[4, 4, 0, 0]} />
                      <Bar dataKey="organic" name="Organic" fill={chartColors.organic} radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* ===== PAYOUTS ===== */}
        <TabsContent value="payouts" className="space-y-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <Card className="border-border/40">
              <CardContent className="p-4">
                <div className="flex items-center gap-2 text-muted-foreground text-xs mb-1"><Calendar className="h-3.5 w-3.5" /> Next Payout</div>
                <p className="text-lg font-bold">Feb 28</p>
                <p className="text-[11px] text-muted-foreground">Friday</p>
              </CardContent>
            </Card>
            <KPICard icon={DollarSign} label="Pending Amount" value={`$${payoutHistory.filter(p => p.status === "Pending").reduce((a, p) => a + p.amount, 0).toLocaleString()}`} accent />
            <KPICard icon={Wallet} label="MTD Paid" value={`$${payoutHistory.filter(p => p.status === "Paid").reduce((a, p) => a + p.amount, 0).toLocaleString()}`} />
            <KPICard icon={TrendingUp} label="YTD Paid" value="$89,400" />
          </div>

          {/* Schedule Info */}
          <Card className="border-border/40 bg-muted/30">
            <CardContent className="p-4 flex flex-wrap items-center gap-4 text-xs">
              <div className="flex items-center gap-2"><Calendar className="h-4 w-4 text-primary" /><span className="font-medium">Payouts every Friday</span></div>
              <div className="w-px h-4 bg-border/60" />
              <span className="text-muted-foreground">Min. threshold: <span className="font-medium text-foreground">$50</span></span>
              <div className="w-px h-4 bg-border/60" />
              <span className="text-muted-foreground">Methods: <span className="font-medium text-foreground">Bank Transfer, Crypto</span></span>
            </CardContent>
          </Card>

          {/* Payout History */}
          <div className="flex flex-wrap items-center gap-2">
            {["All", "Paid", "Processing", "Pending"].map((s) => (
              <Button key={s} size="sm" variant={payoutStatus === s ? "default" : "outline"} className="h-7 text-xs" onClick={() => setPayoutStatus(s)}>{s}</Button>
            ))}
            <div className="ml-auto relative w-full sm:w-56">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search payouts..." value={payoutSearch} onChange={(e) => setPayoutSearch(e.target.value)} className="pl-9 h-8 text-sm" />
            </div>
          </div>
          <Card className="border-border/40">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border/40 text-left text-xs text-muted-foreground">
                    <th className="p-3 font-medium">Date</th>
                    <th className="p-3 font-medium">Creator</th>
                    <th className="p-3 font-medium">Amount</th>
                    <th className="p-3 font-medium">Status</th>
                    <th className="p-3 font-medium">Method</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredPayouts.map((p) => (
                    <tr key={p.id} className="border-b border-border/20 hover:bg-muted/30 transition-colors">
                      <td className="p-3 text-sm">{p.date}</td>
                      <td className="p-3 text-sm font-medium">{p.creator}</td>
                      <td className="p-3 text-sm font-medium">${p.amount.toLocaleString()}</td>
                      <td className="p-3">
                        <Badge variant={p.status === "Paid" ? "default" : p.status === "Processing" ? "secondary" : "outline"} className="text-[10px]">{p.status}</Badge>
                      </td>
                      <td className="p-3 text-sm text-muted-foreground">{p.method}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </TabsContent>

        {/* ===== LINKS & CODES ===== */}
        <TabsContent value="links" className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Creator Tracking Links</h3>
            <Button size="sm" className="gap-2" onClick={() => toast.success("New tracking link generated")}><Plus className="h-4 w-4" /> Generate Link</Button>
          </div>
          <Card className="border-border/40">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border/40 text-left text-xs text-muted-foreground">
                    <th className="p-3 font-medium">Creator</th>
                    <th className="p-3 font-medium">Link</th>
                    <th className="p-3 font-medium">Clicks</th>
                    <th className="p-3 font-medium">Conversions</th>
                    <th className="p-3 font-medium text-right">Copy</th>
                  </tr>
                </thead>
                <tbody>
                  {creators.filter(c => c.status === "Active").map((c) => (
                    <tr key={c.id} className="border-b border-border/20 hover:bg-muted/30 transition-colors">
                      <td className="p-3 text-sm font-medium">{c.name}</td>
                      <td className="p-3"><code className="text-[11px] bg-muted px-2 py-1 rounded">pollgy.com/?ref={c.name.toLowerCase()}</code></td>
                      <td className="p-3 text-sm">{(c.followers * 2).toLocaleString()}</td>
                      <td className="p-3 text-sm">{Math.floor(c.followers * 0.15).toLocaleString()}</td>
                      <td className="p-3 text-right"><Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => { navigator.clipboard.writeText(`pollgy.com/?ref=${c.name.toLowerCase()}`); toast.success("Link copied"); }}><Copy className="h-3.5 w-3.5" /></Button></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

// --- KPI Card ---

const KPICard = ({ icon: Icon, label, value, accent, positive }: { icon: React.ElementType; label: string; value: string | number; accent?: boolean; positive?: boolean }) => (
  <Card className={`border-border/40 ${accent ? "bg-warning/5" : ""}`}>
    <CardContent className="p-4">
      <div className="flex items-center gap-2 text-muted-foreground text-xs mb-1"><Icon className="h-3.5 w-3.5" /> {label}</div>
      <p className={`text-xl font-bold ${positive ? "text-primary" : ""}`}>{value}</p>
    </CardContent>
  </Card>
);
