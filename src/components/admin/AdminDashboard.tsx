import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Users, DollarSign, TrendingUp, BarChart3, ArrowUpRight,
  Clock, AlertTriangle, CheckCircle, Server, Shield,
  Download, Wallet, RefreshCw, FileText, Banknote, ArrowDownRight,
  Activity, Ticket,
} from "lucide-react";
import { toast } from "sonner";

interface AdminDashboardProps {
  onNavigate?: (section: string) => void;
}

const stats = {
  revenue: 890000,
  costs: 340000,
  netProfit: 550000,
  profitMargin: 61.8,
  totalUsers: 124500,
  usersGrowth: 12.3,
  activeUsers: 45200,
  dailyVolume: 415000,
  totalMarkets: 1247,
  totalPotSize: 15600000,
  potGrowth: 24.7,
  dailyFeeRevenue: 12450,
  // Alerts
  pendingMarkets: 23,
  disputes: 8,
  pendingResolutions: 15,
  kycReviews: 12,
  pendingWithdrawals: 5,
  openTickets: 4,
  // Treasury
  totalReserves: 22040000,
  liquidityRatio: 141.3,
};

const platformHealth = [
  { name: "API", status: "Healthy", uptime: "99.98%" },
  { name: "Blockchain RPC", status: "Healthy", uptime: "99.95%" },
  { name: "Wallet Service", status: "Degraded", uptime: "98.2%" },
  { name: "Database", status: "Healthy", uptime: "100%" },
  { name: "CDN", status: "Healthy", uptime: "99.99%" },
  { name: "Auth", status: "Healthy", uptime: "99.97%" },
];

const recentActivity = [
  { id: 1, type: "deposit", message: "Large deposit: 5.2 BTC ($312,000)", time: "2 min ago", color: "bg-success/10 text-success" },
  { id: 2, type: "market", message: "Market resolved: 'Bitcoin Price EOY' → Yes", time: "5 min ago", color: "bg-primary/10 text-primary" },
  { id: 3, type: "dispute", message: "Dispute raised on market #1234", time: "18 min ago", color: "bg-destructive/10 text-destructive" },
  { id: 4, type: "withdrawal", message: "Withdrawal approved: 12,500 USDT", time: "25 min ago", color: "bg-warning/10 text-warning" },
  { id: 5, type: "compliance", message: "KYC review completed for 0x4f2...g7h1", time: "32 min ago", color: "bg-muted text-muted-foreground" },
  { id: 6, type: "system", message: "Wallet Service recovered — uptime restored", time: "45 min ago", color: "bg-primary/10 text-primary" },
];

export const AdminDashboard = ({ onNavigate }: AdminDashboardProps) => {
  const degradedServices = platformHealth.filter(s => s.status !== "Healthy");

  return (
    <div className="space-y-6">
      {/* Row 1: Quick Actions + Platform Health */}
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div className="flex items-center gap-2 flex-wrap">
          <Button size="sm" variant="outline" className="gap-2 h-8" onClick={() => toast("Generating daily report...")}>
            <FileText className="h-3.5 w-3.5" /> Daily Report
          </Button>
          <Button size="sm" variant="outline" className="gap-2 h-8" onClick={() => toast("Exporting financials...")}>
            <Download className="h-3.5 w-3.5" /> Export
          </Button>
          <Button size="sm" variant="outline" className="gap-2 h-8" onClick={() => toast("Refreshing all data...")}>
            <RefreshCw className="h-3.5 w-3.5" /> Refresh
          </Button>
        </div>
        <div className="flex items-center gap-3 text-sm">
          <Server className="h-4 w-4 text-muted-foreground" />
          {degradedServices.length > 0 ? (
            <span className="text-warning font-medium">{degradedServices.map(s => s.name).join(", ")} degraded</span>
          ) : (
            <span className="text-success font-medium">All systems operational</span>
          )}
          <div className="flex items-center gap-1.5">
            {platformHealth.map((s) => (
              <div key={s.name} className={`h-2 w-2 rounded-full ${s.status === "Healthy" ? "bg-success" : "bg-warning"}`} title={`${s.name}: ${s.uptime}`} />
            ))}
          </div>
        </div>
      </div>

      {/* Row 2: P&L — Owner/CEO view (3 cards, clean) */}
      <div className="grid grid-cols-3 gap-4">
        <Card className="border-border/40 bg-success/5 cursor-pointer hover:bg-success/10 transition-colors" onClick={() => onNavigate?.("analytics")}>
          <CardContent className="p-4">
            <div className="flex items-center gap-2 text-success text-sm mb-1"><DollarSign className="h-4 w-4" /> Revenue</div>
            <p className="text-2xl font-bold">${(stats.revenue / 1000).toFixed(0)}K</p>
            <p className="text-xs text-muted-foreground mt-1">3% platform fee · monthly</p>
          </CardContent>
        </Card>
        <Card className="border-border/40 cursor-pointer hover:bg-muted/30 transition-colors" onClick={() => onNavigate?.("analytics")}>
          <CardContent className="p-4">
            <div className="flex items-center gap-2 text-destructive text-sm mb-1"><ArrowDownRight className="h-4 w-4" /> Costs</div>
            <p className="text-2xl font-bold">${(stats.costs / 1000).toFixed(0)}K</p>
            <p className="text-xs text-muted-foreground mt-1">Payouts + operations</p>
          </CardContent>
        </Card>
        <Card className="border-border/40 bg-success/5 cursor-pointer hover:bg-success/10 transition-colors" onClick={() => onNavigate?.("analytics")}>
          <CardContent className="p-4">
            <div className="flex items-center gap-2 text-success text-sm mb-1"><Banknote className="h-4 w-4" /> Net Profit</div>
            <p className="text-2xl font-bold">${(stats.netProfit / 1000).toFixed(0)}K</p>
            <Badge className="text-xs bg-success/10 text-success border-0 mt-1"><ArrowUpRight className="h-3 w-3 mr-1" />{stats.profitMargin}% margin</Badge>
          </CardContent>
        </Card>
      </div>

      {/* Row 3: Key Platform Metrics — Everyone */}
      <div className="grid grid-cols-2 lg:grid-cols-6 gap-4">
        <Card className="border-border/40 cursor-pointer hover:bg-muted/30 transition-colors" onClick={() => onNavigate?.("users")}>
          <CardContent className="p-4">
            <p className="text-xs text-muted-foreground mb-1">Total Users</p>
            <div className="flex items-center gap-2">
              <p className="text-xl font-bold">{(stats.totalUsers / 1000).toFixed(1)}K</p>
              <Badge className="text-[10px] bg-success/10 text-success border-0"><ArrowUpRight className="h-2.5 w-2.5" />{stats.usersGrowth}%</Badge>
            </div>
          </CardContent>
        </Card>
        <Card className="border-border/40 cursor-pointer hover:bg-muted/30 transition-colors" onClick={() => onNavigate?.("users")}>
          <CardContent className="p-4">
            <p className="text-xs text-muted-foreground mb-1">Active (30d)</p>
            <p className="text-xl font-bold">{(stats.activeUsers / 1000).toFixed(1)}K</p>
          </CardContent>
        </Card>
        <Card className="border-border/40 cursor-pointer hover:bg-muted/30 transition-colors" onClick={() => onNavigate?.("markets")}>
          <CardContent className="p-4">
            <p className="text-xs text-muted-foreground mb-1">Active Markets</p>
            <p className="text-xl font-bold">{stats.totalMarkets.toLocaleString()}</p>
          </CardContent>
        </Card>
        <Card className="border-border/40 cursor-pointer hover:bg-muted/30 transition-colors" onClick={() => onNavigate?.("markets")}>
          <CardContent className="p-4">
            <p className="text-xs text-muted-foreground mb-1">Total Pot Size</p>
            <p className="text-xl font-bold">${(stats.totalPotSize / 1000000).toFixed(1)}M</p>
          </CardContent>
        </Card>
        <Card className="border-border/40 cursor-pointer hover:bg-muted/30 transition-colors" onClick={() => onNavigate?.("analytics")}>
          <CardContent className="p-4">
            <p className="text-xs text-muted-foreground mb-1">24h Volume</p>
            <p className="text-xl font-bold">${(stats.dailyVolume / 1000).toFixed(0)}K</p>
          </CardContent>
        </Card>
        <Card className="border-border/40 cursor-pointer hover:bg-muted/30 transition-colors" onClick={() => onNavigate?.("transactions")}>
          <CardContent className="p-4">
            <p className="text-xs text-muted-foreground mb-1">Liquidity</p>
            <p className={`text-xl font-bold ${stats.liquidityRatio >= 120 ? 'text-success' : 'text-warning'}`}>{stats.liquidityRatio}%</p>
          </CardContent>
        </Card>
      </div>

      {/* Row 4: Action Required — Moderators/Ops */}
      <Card className="border-border/40">
        <CardHeader className="pb-3">
          <CardTitle className="text-base flex items-center gap-2"><AlertTriangle className="h-4 w-4 text-warning" /> Action Required</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="grid grid-cols-2 lg:grid-cols-6 divide-x divide-border/40">
            <button className="p-4 hover:bg-warning/5 transition-colors text-left" onClick={() => onNavigate?.("markets")}>
              <div className="flex items-center gap-2 text-warning text-xs mb-1"><Clock className="h-3.5 w-3.5" /> Pending Markets</div>
              <p className="text-2xl font-bold">{stats.pendingMarkets}</p>
            </button>
            <button className="p-4 hover:bg-destructive/5 transition-colors text-left" onClick={() => onNavigate?.("markets")}>
              <div className="flex items-center gap-2 text-destructive text-xs mb-1"><AlertTriangle className="h-3.5 w-3.5" /> Disputes</div>
              <p className="text-2xl font-bold">{stats.disputes}</p>
            </button>
            <button className="p-4 hover:bg-primary/5 transition-colors text-left" onClick={() => onNavigate?.("markets")}>
              <div className="flex items-center gap-2 text-primary text-xs mb-1"><CheckCircle className="h-3.5 w-3.5" /> Resolutions</div>
              <p className="text-2xl font-bold">{stats.pendingResolutions}</p>
            </button>
            <button className="p-4 hover:bg-muted/50 transition-colors text-left" onClick={() => onNavigate?.("trust")}>
              <div className="flex items-center gap-2 text-muted-foreground text-xs mb-1"><Shield className="h-3.5 w-3.5" /> KYC Reviews</div>
              <p className="text-2xl font-bold">{stats.kycReviews}</p>
            </button>
            <button className="p-4 hover:bg-warning/5 transition-colors text-left" onClick={() => onNavigate?.("transactions")}>
              <div className="flex items-center gap-2 text-warning text-xs mb-1"><Wallet className="h-3.5 w-3.5" /> Withdrawals</div>
              <p className="text-2xl font-bold">{stats.pendingWithdrawals}</p>
            </button>
            <button className="p-4 hover:bg-muted/50 transition-colors text-left" onClick={() => onNavigate?.("trust")}>
              <div className="flex items-center gap-2 text-muted-foreground text-xs mb-1"><Ticket className="h-3.5 w-3.5" /> Support Tickets</div>
              <p className="text-2xl font-bold">{stats.openTickets}</p>
            </button>
          </div>
        </CardContent>
      </Card>

      {/* Row 5: Recent Activity — Everyone */}
      <Card className="border-border/40">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-base flex items-center gap-2"><Activity className="h-4 w-4" /> Recent Activity</CardTitle>
            <Button variant="ghost" size="sm" className="text-xs h-7" onClick={() => onNavigate?.("trust")}>View All</Button>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="divide-y divide-border/40">
            {recentActivity.map((activity) => (
              <div key={activity.id} className="flex items-center justify-between p-4 hover:bg-muted/30 transition-colors cursor-pointer gap-3">
                <div className="flex items-center gap-3 min-w-0">
                  <Badge className={`text-[10px] border-0 shrink-0 ${activity.color}`}>{activity.type}</Badge>
                  <p className="text-sm truncate">{activity.message}</p>
                </div>
                <span className="text-xs text-muted-foreground whitespace-nowrap">{activity.time}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
