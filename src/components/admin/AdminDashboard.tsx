import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Users, DollarSign, TrendingUp, BarChart3, ArrowUpRight, Activity,
  Clock, AlertTriangle, CheckCircle, Server, Shield, Percent, Star, UserPlus,
} from "lucide-react";
import { toast } from "sonner";

interface AdminDashboardProps {
  onNavigate?: (section: string) => void;
}

const dashboardStats = {
  totalUsers: 124500,
  usersGrowth: 12.3,
  activeUsers: 45200,
  totalPotSize: 15600000,
  potGrowth: 24.7,
  totalMarkets: 1247,
  pendingMarkets: 23,
  disputes: 8,
  pendingResolutions: 15,
  dailyVolume: 415000,
  dailyFeeRevenue: 12450,
  ggr: 890000,
  ngr: 645000,
  totalCreators: 156,
  totalAffiliates: 89,
  avgRevenuePerUser: 45,
  platformFeeToday: 12450,
};

const recentActivity = [
  { id: 1, type: "deposit", message: "Large deposit: 5.2 BTC ($312,000)", time: "2 min ago" },
  { id: 2, type: "market", message: "Market resolved: 'Bitcoin Price EOY' → Yes", time: "5 min ago" },
  { id: 3, type: "deposit", message: "Deposit confirmed: 25,000 USDT", time: "8 min ago" },
  { id: 4, type: "creator", message: "New market created by CryptoGuru: 'ETH Merge Impact'", time: "12 min ago" },
  { id: 5, type: "dispute", message: "Dispute raised on market #1234 by john@example.com", time: "18 min ago" },
  { id: 6, type: "withdrawal", message: "Withdrawal approved: 12,500 USDT to 0x3b1...c8d2", time: "25 min ago" },
];

const platformHealth = [
  { name: "API", status: "Healthy", uptime: "99.98%" },
  { name: "Blockchain RPC", status: "Healthy", uptime: "99.95%" },
  { name: "Wallet Service", status: "Degraded", uptime: "98.2%" },
  { name: "Database", status: "Healthy", uptime: "100%" },
];

const activityTypeBadges: Record<string, { color: string; label: string }> = {
  deposit: { color: "bg-success/10 text-success", label: "Deposit" },
  market: { color: "bg-primary/10 text-primary", label: "Market" },
  creator: { color: "bg-purple-500/10 text-purple-500", label: "Creator" },
  dispute: { color: "bg-destructive/10 text-destructive", label: "Dispute" },
  withdrawal: { color: "bg-warning/10 text-warning", label: "Withdrawal" },
};

export const AdminDashboard = ({ onNavigate }: AdminDashboardProps) => {
  return (
    <div className="space-y-6">
      {/* Platform Health */}
      <Card className="border-border/40">
        <CardContent className="p-4">
          <div className="flex items-center gap-4 flex-wrap">
            <div className="flex items-center gap-2 text-sm font-medium">
              <Server className="h-4 w-4" />
              Platform Status
            </div>
            <div className="flex items-center gap-4 flex-wrap">
              {platformHealth.map((service) => (
                <div key={service.name} className="flex items-center gap-2 text-sm">
                  <div className={`h-2 w-2 rounded-full ${service.status === "Healthy" ? "bg-success" : "bg-warning"}`} />
                  <span className="text-muted-foreground">{service.name}</span>
                  <span className="font-medium">{service.uptime}</span>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Revenue Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="border-border/40 bg-success/5 cursor-pointer hover:bg-success/10 transition-colors" onClick={() => onNavigate?.("analytics")}>
          <CardContent className="p-4">
            <div className="flex items-center gap-2 text-success text-sm mb-1"><DollarSign className="h-4 w-4" /> GGR (Monthly)</div>
            <p className="text-2xl font-bold">${(dashboardStats.ggr / 1000).toFixed(0)}K</p>
          </CardContent>
        </Card>
        <Card className="border-border/40 cursor-pointer hover:bg-muted/30 transition-colors" onClick={() => onNavigate?.("analytics")}>
          <CardContent className="p-4">
            <div className="flex items-center gap-2 text-muted-foreground text-sm mb-1"><TrendingUp className="h-4 w-4" /> NGR (Monthly)</div>
            <p className="text-2xl font-bold">${(dashboardStats.ngr / 1000).toFixed(0)}K</p>
          </CardContent>
        </Card>
        <Card className="border-border/40 cursor-pointer hover:bg-muted/30 transition-colors" onClick={() => onNavigate?.("markets")}>
          <CardContent className="p-4">
            <div className="flex items-center gap-2 text-muted-foreground text-sm mb-1"><DollarSign className="h-4 w-4" /> Total Pot Size</div>
            <div className="flex items-center gap-2">
              <p className="text-2xl font-bold">${(dashboardStats.totalPotSize / 1000000).toFixed(1)}M</p>
              <Badge className="text-xs bg-success/10 text-success border-0"><ArrowUpRight className="h-3 w-3 mr-1" />{dashboardStats.potGrowth}%</Badge>
            </div>
          </CardContent>
        </Card>
        <Card className="border-border/40 cursor-pointer hover:bg-muted/30 transition-colors" onClick={() => onNavigate?.("transactions")}>
          <CardContent className="p-4">
            <div className="flex items-center gap-2 text-muted-foreground text-sm mb-1"><Percent className="h-4 w-4" /> Daily Fee Revenue <Badge variant="outline" className="text-[10px] px-1 py-0">3%</Badge></div>
            <p className="text-2xl font-bold">${dashboardStats.dailyFeeRevenue.toLocaleString()}</p>
          </CardContent>
        </Card>
      </div>

      {/* Quick Stats: Creators, Affiliates, Avg Rev, Fee Today */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="border-border/40 cursor-pointer hover:bg-muted/30 transition-colors" onClick={() => onNavigate?.("crm")}>
          <CardContent className="p-4">
            <div className="flex items-center gap-2 text-muted-foreground text-sm mb-1"><Star className="h-4 w-4" /> Total Creators</div>
            <p className="text-2xl font-bold">{dashboardStats.totalCreators}</p>
          </CardContent>
        </Card>
        <Card className="border-border/40 cursor-pointer hover:bg-muted/30 transition-colors" onClick={() => onNavigate?.("crm")}>
          <CardContent className="p-4">
            <div className="flex items-center gap-2 text-muted-foreground text-sm mb-1"><UserPlus className="h-4 w-4" /> Total Affiliates</div>
            <p className="text-2xl font-bold">{dashboardStats.totalAffiliates}</p>
          </CardContent>
        </Card>
        <Card className="border-border/40 cursor-pointer hover:bg-muted/30 transition-colors" onClick={() => onNavigate?.("analytics")}>
          <CardContent className="p-4">
            <div className="flex items-center gap-2 text-muted-foreground text-sm mb-1"><DollarSign className="h-4 w-4" /> Avg Rev/User</div>
            <p className="text-2xl font-bold">${dashboardStats.avgRevenuePerUser}</p>
          </CardContent>
        </Card>
        <Card className="border-border/40 bg-success/5 cursor-pointer hover:bg-success/10 transition-colors" onClick={() => onNavigate?.("transactions")}>
          <CardContent className="p-4">
            <div className="flex items-center gap-2 text-success text-sm mb-1"><DollarSign className="h-4 w-4" /> Fee Collected Today</div>
            <p className="text-2xl font-bold">${dashboardStats.platformFeeToday.toLocaleString()}</p>
          </CardContent>
        </Card>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="border-border/40 cursor-pointer hover:bg-muted/30 transition-colors" onClick={() => onNavigate?.("crm")}>
          <CardContent className="p-4">
            <div className="flex items-center gap-2 text-muted-foreground text-sm mb-1"><Users className="h-4 w-4" /> Total Users</div>
            <div className="flex items-center gap-2">
              <p className="text-2xl font-bold">{(dashboardStats.totalUsers / 1000).toFixed(1)}K</p>
              <Badge className="text-xs bg-success/10 text-success border-0"><ArrowUpRight className="h-3 w-3 mr-1" />{dashboardStats.usersGrowth}%</Badge>
            </div>
          </CardContent>
        </Card>
        <Card className="border-border/40 cursor-pointer hover:bg-muted/30 transition-colors" onClick={() => onNavigate?.("crm")}>
          <CardContent className="p-4">
            <div className="flex items-center gap-2 text-muted-foreground text-sm mb-1"><Activity className="h-4 w-4" /> Active Users</div>
            <p className="text-2xl font-bold">{(dashboardStats.activeUsers / 1000).toFixed(1)}K</p>
          </CardContent>
        </Card>
        <Card className="border-border/40 cursor-pointer hover:bg-muted/30 transition-colors" onClick={() => onNavigate?.("markets")}>
          <CardContent className="p-4">
            <div className="flex items-center gap-2 text-muted-foreground text-sm mb-1"><BarChart3 className="h-4 w-4" /> Active Markets</div>
            <p className="text-2xl font-bold">{dashboardStats.totalMarkets.toLocaleString()}</p>
          </CardContent>
        </Card>
        <Card className="border-border/40 cursor-pointer hover:bg-muted/30 transition-colors" onClick={() => onNavigate?.("analytics")}>
          <CardContent className="p-4">
            <div className="flex items-center gap-2 text-muted-foreground text-sm mb-1"><TrendingUp className="h-4 w-4" /> 24h Volume</div>
            <p className="text-2xl font-bold">${(dashboardStats.dailyVolume / 1000).toFixed(0)}K</p>
          </CardContent>
        </Card>
      </div>

      {/* Actionable Alerts */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="border-border/40 bg-warning/5 cursor-pointer hover:bg-warning/10 transition-colors" onClick={() => onNavigate?.("markets")}>
          <CardContent className="p-4">
            <div className="flex items-center gap-2 text-warning text-sm mb-1"><Clock className="h-4 w-4" /> Pending Markets</div>
            <div className="flex items-center justify-between">
              <p className="text-2xl font-bold">{dashboardStats.pendingMarkets}</p>
              <Button size="sm" variant="ghost" className="text-warning h-7 px-2 text-xs">Review →</Button>
            </div>
          </CardContent>
        </Card>
        <Card className="border-border/40 bg-destructive/5 cursor-pointer hover:bg-destructive/10 transition-colors" onClick={() => onNavigate?.("markets")}>
          <CardContent className="p-4">
            <div className="flex items-center gap-2 text-destructive text-sm mb-1"><AlertTriangle className="h-4 w-4" /> Open Disputes</div>
            <div className="flex items-center justify-between">
              <p className="text-2xl font-bold">{dashboardStats.disputes}</p>
              <Button size="sm" variant="ghost" className="text-destructive h-7 px-2 text-xs">Review →</Button>
            </div>
          </CardContent>
        </Card>
        <Card className="border-border/40 bg-primary/5 cursor-pointer hover:bg-primary/10 transition-colors" onClick={() => onNavigate?.("markets")}>
          <CardContent className="p-4">
            <div className="flex items-center gap-2 text-primary text-sm mb-1"><CheckCircle className="h-4 w-4" /> Pending Resolutions</div>
            <div className="flex items-center justify-between">
              <p className="text-2xl font-bold">{dashboardStats.pendingResolutions}</p>
              <Button size="sm" variant="ghost" className="text-primary h-7 px-2 text-xs">Resolve →</Button>
            </div>
          </CardContent>
        </Card>
        <Card className="border-border/40 cursor-pointer hover:bg-muted/30 transition-colors" onClick={() => onNavigate?.("crm")}>
          <CardContent className="p-4">
            <div className="flex items-center gap-2 text-muted-foreground text-sm mb-1"><Shield className="h-4 w-4" /> KYC Reviews</div>
            <div className="flex items-center justify-between">
              <p className="text-2xl font-bold">12</p>
              <Button size="sm" variant="ghost" className="text-muted-foreground h-7 px-2 text-xs">Review →</Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card className="border-border/40">
        <CardHeader className="pb-3">
          <CardTitle className="text-base">Recent Activity</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="divide-y divide-border/40">
            {recentActivity.map((activity) => {
              const badge = activityTypeBadges[activity.type];
              return (
                <div key={activity.id} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 hover:bg-muted/30 transition-colors cursor-pointer gap-1" onClick={() => toast(activity.message)}>
                  <div className="flex items-center gap-3">
                    {badge && <Badge className={`text-[10px] border-0 ${badge.color}`}>{badge.label}</Badge>}
                    <p className="text-sm">{activity.message}</p>
                  </div>
                  <span className="text-xs text-muted-foreground whitespace-nowrap">{activity.time}</span>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
