import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { AdminFilters } from "./AdminFilters";
import {
  DollarSign, ArrowUpRight, ArrowDownRight, Clock, AlertTriangle,
  CheckCircle, Server, Wallet, Users, TrendingUp, Activity,
  UserPlus, Percent, BarChart3, PiggyBank, Receipt, Target, FileText,
} from "lucide-react";
import { ConversionFunnel } from "./ConversionFunnel";
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, Legend,
} from "recharts";

interface AdminDashboardProps {
  onNavigate?: (section: string) => void;
}

const platformHealth = [
  { name: "API", status: "Healthy" },
  { name: "Blockchain RPC", status: "Healthy" },
  { name: "Wallet Service", status: "Degraded" },
  { name: "Database", status: "Healthy" },
];

const financialKPIs = [
  { label: "Trading Volume", value: "$4.15M", change: 8.2, icon: BarChart3 },
  { label: "Fee Revenue (3%)", value: "$124.5K", change: 12.5, icon: DollarSign, color: "text-success" },
  { label: "Creator Earnings (20%)", value: "$24.9K", change: 8.1, icon: Users },
  { label: "Affiliate Earnings (20%)", value: "$10.1K", change: 15.3, icon: UserPlus },
];

const financialHealthMetrics = [
  { label: "Gross Platform Revenue", value: "$124.5K", subtitle: "Total fee revenue", icon: Receipt, color: "text-success" },
  { label: "Net Platform Revenue", value: "$89.5K", subtitle: "After creator & affiliate shares", icon: PiggyBank, color: "text-primary" },
  { label: "Bets / Month Per User", value: "8.4", subtitle: "Avg bets per active user this month", icon: Wallet, color: "text-primary" },
];

const unitMetrics = [
  { label: "ARPU", value: "$2.76", subtitle: "Avg Revenue Per Active User" },
  { label: "Avg Trade Size", value: "$92.40", subtitle: "Average trade amount" },
];

const activityCards = [
  { label: "Total Users", value: "124.5K", nav: "users" },
  { label: "Active (30d)", value: "45.2K", nav: "users" },
  { label: "Total Markets", value: "1,247", nav: "markets" },
  { label: "Open Markets", value: "892", nav: "markets" },
  { label: "Total Pot Size", value: "$15.6M", nav: "markets" },
];

const growthCards = [
  { label: "New Signups", value: "347", change: 15.7 },
  { label: "First Deposits", value: "189", change: 9.2 },
  { label: "Conversion Rate", value: "54.5%", change: 2.1 },
  { label: "Referral Signups", value: "89", change: 22.4 },
  { label: "Returning Users %", value: "68.2%", change: 3.8 },
];

const tradingVolumeData = [
  { date: "Jan 1", volume: 320000, fees: 9600 },
  { date: "Jan 5", volume: 410000, fees: 12300 },
  { date: "Jan 9", volume: 380000, fees: 11400 },
  { date: "Jan 13", volume: 520000, fees: 15600 },
  { date: "Jan 17", volume: 480000, fees: 14400 },
  { date: "Jan 21", volume: 550000, fees: 16500 },
  { date: "Jan 25", volume: 620000, fees: 18600 },
  { date: "Jan 29", volume: 580000, fees: 17400 },
];

const topMarkets = [
  { name: "Bitcoin Price EOY", creator: "CryptoGuru", volume: "$525K", trades: "15.6K", fees: "$15.8K" },
  { name: "US Election 2024", creator: "PoliticalPredict", volume: "$498K", trades: "13.2K", fees: "$14.9K" },
  { name: "ETH Merge Impact", creator: "TechOracle", volume: "$267K", trades: "8.1K", fees: "$8.0K" },
  { name: "AI Breakthrough 2025", creator: "TechOracle", volume: "$154K", trades: "5.9K", fees: "$4.6K" },
  { name: "Fed Rate Decision", creator: "MarketMaven", volume: "$145K", trades: "4.6K", fees: "$4.4K" },
];

const topCreators = [
  { name: "SportsAnalyst", markets: 15, volume: "$1.2M", earnings: "$7.2K" },
  { name: "CryptoGuru", markets: 12, volume: "$890K", earnings: "$5.3K" },
  { name: "TechOracle", markets: 8, volume: "$456K", earnings: "$2.7K" },
  { name: "PoliticalPredict", markets: 5, volume: "$312K", earnings: "$1.9K" },
];

const topAffiliates = [
  { name: "PromoQueen", referred: 312, volume: "$567K", earnings: "$3.4K" },
  { name: "ReferKing", referred: 145, volume: "$234K", earnings: "$1.4K" },
  { name: "GrowthHacker", referred: 89, volume: "$156K", earnings: "$936" },
  { name: "MarketingPro", referred: 67, volume: "$98K", earnings: "$588" },
];

const alerts = [
  { label: "Markets Awaiting Approval", count: 23, color: "text-warning", icon: Clock, nav: "markets" },
  { label: "Markets Awaiting Resolution", count: 15, color: "text-primary", icon: CheckCircle, nav: "markets" },
  { label: "Active Disputes", count: 8, color: "text-destructive", icon: AlertTriangle, nav: "markets" },
  { label: "Pending Withdrawals", count: 5, color: "text-warning", icon: Wallet, nav: "transactions" },
  { label: "KYC Reviews", count: 12, color: "text-primary", icon: Users, nav: "kyc" },
];

const tooltipStyle = { backgroundColor: 'hsl(var(--popover))', border: '1px solid hsl(var(--border))', borderRadius: '8px', color: 'hsl(var(--popover-foreground))' };
const tickStyle = { fill: 'hsl(var(--muted-foreground))', fontSize: 11 };

export const AdminDashboard = ({ onNavigate }: AdminDashboardProps) => {
  const degradedServices = platformHealth.filter(s => s.status !== "Healthy");

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <AdminFilters showCreator showAffiliate />
        </div>
        
      </div>

      {/* Row 1 — System Health */}
      <div className="flex items-center gap-3 text-sm px-1">
        <Server className="h-4 w-4 text-muted-foreground" />
        {degradedServices.length > 0 ? (
          <span className="text-warning font-medium">{degradedServices.map(s => s.name).join(", ")} degraded</span>
        ) : (
          <span className="text-success font-medium">All systems operational</span>
        )}
        <div className="flex items-center gap-1.5 ml-1">
          {platformHealth.map((s) => (
            <div key={s.name} className={`h-2 w-2 rounded-full ${s.status === "Healthy" ? "bg-success" : "bg-warning"}`} title={s.name} />
          ))}
        </div>
      </div>

      {/* Row 2 — Financial Overview (CFO) */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {financialKPIs.map((kpi) => (
          <Card key={kpi.label} className="border-border/40">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 text-muted-foreground text-xs mb-1">
                <kpi.icon className="h-3.5 w-3.5" /> {kpi.label}
              </div>
              <div className="flex items-center gap-2">
                <p className={`text-xl font-bold ${kpi.color || ''}`}>{kpi.value}</p>
                <Badge className={`text-[10px] border-0 ${kpi.change >= 0 ? 'bg-success/10 text-success' : 'bg-destructive/10 text-destructive'}`}>
                  {kpi.change >= 0 ? <ArrowUpRight className="h-2.5 w-2.5 mr-0.5" /> : <ArrowDownRight className="h-2.5 w-2.5 mr-0.5" />}
                  {Math.abs(kpi.change)}%
                </Badge>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Row 2b — Financial Health + Unit Metrics */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
        {financialHealthMetrics.map((m) => (
          <Card key={m.label} className="border-border/40">
            <CardContent className="p-4">
              <div className="flex items-center gap-1.5 text-muted-foreground text-xs mb-1">
                <m.icon className="h-3.5 w-3.5" /> {m.label}
              </div>
              <p className={`text-xl font-bold ${m.color}`}>{m.value}</p>
              <p className="text-[10px] text-muted-foreground mt-0.5">{m.subtitle}</p>
            </CardContent>
          </Card>
        ))}
        {unitMetrics.map((m) => (
          <Card key={m.label} className="border-border/40">
            <CardContent className="p-4">
              <div className="flex items-center gap-1.5 text-muted-foreground text-xs mb-1">
                <Target className="h-3.5 w-3.5" /> {m.label}
              </div>
              <p className="text-xl font-bold">{m.value}</p>
              <p className="text-[10px] text-muted-foreground mt-0.5">{m.subtitle}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Row 3 — Platform Activity */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
        {activityCards.map((card) => (
          <Card key={card.label} className="border-border/40 cursor-pointer hover:bg-muted/30 transition-colors" onClick={() => onNavigate?.(card.nav)}>
            <CardContent className="p-4">
              <p className="text-xs text-muted-foreground mb-1">{card.label}</p>
              <p className="text-xl font-bold">{card.value}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Row 4 — Growth Metrics (CMO) */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
        {growthCards.map((card) => (
          <Card key={card.label} className="border-border/40">
            <CardContent className="p-4">
              <p className="text-xs text-muted-foreground mb-1">{card.label}</p>
              <div className="flex items-center gap-2">
                <p className="text-xl font-bold">{card.value}</p>
                <Badge className={`text-[10px] border-0 ${card.change >= 0 ? 'bg-success/10 text-success' : 'bg-destructive/10 text-destructive'}`}>
                  {card.change >= 0 ? '+' : ''}{card.change}%
                </Badge>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Row 5 — Trading Volume Chart */}
      <Card className="border-border/40">
        <CardHeader className="pb-3">
          <CardTitle className="text-base">Trading Volume Over Time</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={tradingVolumeData}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-border/40" />
                <XAxis dataKey="date" tick={tickStyle} />
                <YAxis tick={tickStyle} tickFormatter={(v) => `$${(v / 1000).toFixed(0)}K`} />
                <Tooltip contentStyle={tooltipStyle} formatter={(value: number, name: string) => [
                  `$${value.toLocaleString()}`,
                  name === "volume" ? "Volume" : "Fee Revenue"
                ]} />
                <Legend />
                <Area type="monotone" dataKey="volume" name="Volume" stroke="hsl(var(--primary))" fill="hsl(var(--primary) / 0.1)" strokeWidth={2} />
                <Area type="monotone" dataKey="fees" name="Fee Revenue" stroke="hsl(var(--success))" fill="hsl(var(--success) / 0.1)" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Row 6 — Top Performance Tables */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <Card className="border-border/40">
          <CardHeader className="pb-2"><CardTitle className="text-sm">Top Markets</CardTitle></CardHeader>
          <CardContent className="p-0">
            <table className="w-full text-sm">
              <thead><tr className="border-b border-border/40 text-left text-xs text-muted-foreground"><th className="px-4 py-2">Market</th><th className="px-4 py-2">Volume</th><th className="px-4 py-2">Fees</th></tr></thead>
              <tbody>
                {topMarkets.map((m) => (
                  <tr key={m.name} className="border-b border-border/20 hover:bg-muted/30 transition-colors">
                    <td className="px-4 py-2.5"><p className="font-medium truncate max-w-[140px]">{m.name}</p><p className="text-xs text-muted-foreground">{m.creator}</p></td>
                    <td className="px-4 py-2.5 font-medium">{m.volume}</td>
                    <td className="px-4 py-2.5 text-success font-medium">{m.fees}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </CardContent>
        </Card>

        <Card className="border-border/40">
          <CardHeader className="pb-2"><CardTitle className="text-sm">Top Creators</CardTitle></CardHeader>
          <CardContent className="p-0">
            <table className="w-full text-sm">
              <thead><tr className="border-b border-border/40 text-left text-xs text-muted-foreground"><th className="px-4 py-2">Creator</th><th className="px-4 py-2">Volume</th><th className="px-4 py-2">Earnings</th></tr></thead>
              <tbody>
                {topCreators.map((c) => (
                  <tr key={c.name} className="border-b border-border/20 hover:bg-muted/30 transition-colors">
                    <td className="px-4 py-2.5"><p className="font-medium">{c.name}</p><p className="text-xs text-muted-foreground">{c.markets} markets</p></td>
                    <td className="px-4 py-2.5 font-medium">{c.volume}</td>
                    <td className="px-4 py-2.5 text-success font-medium">{c.earnings}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </CardContent>
        </Card>

        <Card className="border-border/40">
          <CardHeader className="pb-2"><CardTitle className="text-sm">Top Affiliates</CardTitle></CardHeader>
          <CardContent className="p-0">
            <table className="w-full text-sm">
              <thead><tr className="border-b border-border/40 text-left text-xs text-muted-foreground"><th className="px-4 py-2">Affiliate</th><th className="px-4 py-2">Volume</th><th className="px-4 py-2">Earnings</th></tr></thead>
              <tbody>
                {topAffiliates.map((a) => (
                  <tr key={a.name} className="border-b border-border/20 hover:bg-muted/30 transition-colors">
                    <td className="px-4 py-2.5"><p className="font-medium">{a.name}</p><p className="text-xs text-muted-foreground">{a.referred} referred</p></td>
                    <td className="px-4 py-2.5 font-medium">{a.volume}</td>
                    <td className="px-4 py-2.5 text-success font-medium">{a.earnings}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </CardContent>
        </Card>
      </div>

      {/* Row 7 — Alerts */}
      <Card className="border-border/40">
        <CardHeader className="pb-3">
          <CardTitle className="text-base flex items-center gap-2">
            <AlertTriangle className="h-4 w-4 text-warning" /> Action Required
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="grid grid-cols-2 lg:grid-cols-5 divide-x divide-border/40">
            {alerts.map((alert) => (
              <button key={alert.label} className="p-4 hover:bg-muted/30 transition-colors text-left" onClick={() => onNavigate?.(alert.nav)}>
                <div className={`flex items-center gap-1.5 ${alert.color} text-xs mb-1`}>
                  <alert.icon className="h-3.5 w-3.5" /> {alert.label}
                </div>
                <p className="text-2xl font-bold">{alert.count}</p>
              </button>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
