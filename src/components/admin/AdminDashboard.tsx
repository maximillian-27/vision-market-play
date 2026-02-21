import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Users,
  DollarSign,
  TrendingUp,
  BarChart3,
  ArrowUpRight,
  ArrowDownRight,
  Activity,
  Clock,
  AlertTriangle,
  CheckCircle,
  Zap,
  Server,
  CreditCard,
  Shield,
} from "lucide-react";

interface AdminDashboardProps {
  onNavigate?: (section: string) => void;
}

const dashboardStats = {
  totalUsers: 124500,
  usersGrowth: 12.3,
  activeUsers: 45200,
  totalVolume: 15600000,
  volumeGrowth: 24.7,
  totalMarkets: 1247,
  pendingMarkets: 23,
  disputes: 8,
  pendingResolutions: 15,
  dailyRevenue: 12450,
  ggr: 890000,
  ngr: 645000,
  todaySignups: 347,
  todayDeposits: 189,
};

const recentActivity = [
  { id: 1, type: "user", message: "New user registration: john@example.com", time: "2 min ago" },
  { id: 2, type: "market", message: "Market 'Bitcoin Price' resolved", time: "5 min ago" },
  { id: 3, type: "dispute", message: "New dispute raised on market #1234", time: "12 min ago" },
  { id: 4, type: "transaction", message: "Large withdrawal: $15,000", time: "18 min ago" },
  { id: 5, type: "creator", message: "Creator application: CryptoGuru", time: "25 min ago" },
];

const platformHealth = [
  { name: "API", status: "Healthy", uptime: "99.98%" },
  { name: "Stripe", status: "Healthy", uptime: "99.99%" },
  { name: "Coinbase", status: "Degraded", uptime: "98.2%" },
  { name: "Database", status: "Healthy", uptime: "100%" },
];

export const AdminDashboard = ({ onNavigate }: AdminDashboardProps) => {
  return (
    <div className="space-y-6">
      {/* Platform Health Bar */}
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

      {/* Revenue Stats - GGR/NGR */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="border-border/40 bg-success/5 cursor-pointer hover:bg-success/10 transition-colors" onClick={() => onNavigate?.("analytics")}>
          <CardContent className="p-4">
            <div className="flex items-center gap-2 text-success text-sm mb-1">
              <DollarSign className="h-4 w-4" />
              GGR (Monthly)
            </div>
            <p className="text-2xl font-bold">${(dashboardStats.ggr / 1000).toFixed(0)}K</p>
          </CardContent>
        </Card>
        <Card className="border-border/40 cursor-pointer hover:bg-muted/30 transition-colors" onClick={() => onNavigate?.("analytics")}>
          <CardContent className="p-4">
            <div className="flex items-center gap-2 text-muted-foreground text-sm mb-1">
              <TrendingUp className="h-4 w-4" />
              NGR (Monthly)
            </div>
            <p className="text-2xl font-bold">${(dashboardStats.ngr / 1000).toFixed(0)}K</p>
          </CardContent>
        </Card>
        <Card className="border-border/40 cursor-pointer hover:bg-muted/30 transition-colors" onClick={() => onNavigate?.("transactions")}>
          <CardContent className="p-4">
            <div className="flex items-center gap-2 text-muted-foreground text-sm mb-1">
              <DollarSign className="h-4 w-4" />
              Total Pot Size
            </div>
            <div className="flex items-center gap-2">
              <p className="text-2xl font-bold">${(dashboardStats.totalVolume / 1000000).toFixed(1)}M</p>
              <Badge className="text-xs bg-success/10 text-success border-0">
                <ArrowUpRight className="h-3 w-3 mr-1" />
                {dashboardStats.volumeGrowth}%
              </Badge>
            </div>
          </CardContent>
        </Card>
        <Card className="border-border/40 cursor-pointer hover:bg-muted/30 transition-colors" onClick={() => onNavigate?.("analytics")}>
          <CardContent className="p-4">
            <div className="flex items-center gap-2 text-muted-foreground text-sm mb-1">
              <TrendingUp className="h-4 w-4" />
              Daily Revenue
            </div>
            <p className="text-2xl font-bold">${dashboardStats.dailyRevenue.toLocaleString()}</p>
          </CardContent>
        </Card>
      </div>

      {/* Stats Grid - Clickable */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="border-border/40 cursor-pointer hover:bg-muted/30 transition-colors" onClick={() => onNavigate?.("users")}>
          <CardContent className="p-4">
            <div className="flex items-center gap-2 text-muted-foreground text-sm mb-1">
              <Users className="h-4 w-4" />
              Total Users
            </div>
            <div className="flex items-center gap-2">
              <p className="text-2xl font-bold">{(dashboardStats.totalUsers / 1000).toFixed(1)}K</p>
              <Badge className="text-xs bg-success/10 text-success border-0">
                <ArrowUpRight className="h-3 w-3 mr-1" />
                {dashboardStats.usersGrowth}%
              </Badge>
            </div>
          </CardContent>
        </Card>

        <Card className="border-border/40 cursor-pointer hover:bg-muted/30 transition-colors" onClick={() => onNavigate?.("users")}>
          <CardContent className="p-4">
            <div className="flex items-center gap-2 text-muted-foreground text-sm mb-1">
              <Activity className="h-4 w-4" />
              Active Users
            </div>
            <p className="text-2xl font-bold">{(dashboardStats.activeUsers / 1000).toFixed(1)}K</p>
          </CardContent>
        </Card>

        <Card className="border-border/40 cursor-pointer hover:bg-muted/30 transition-colors" onClick={() => onNavigate?.("markets")}>
          <CardContent className="p-4">
            <div className="flex items-center gap-2 text-muted-foreground text-sm mb-1">
              <BarChart3 className="h-4 w-4" />
              Active Markets
            </div>
            <p className="text-2xl font-bold">{dashboardStats.totalMarkets.toLocaleString()}</p>
          </CardContent>
        </Card>

        <Card className="border-border/40">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 text-muted-foreground text-sm mb-1">
              <Zap className="h-4 w-4" />
              Signup → Deposit
            </div>
            <p className="text-2xl font-bold">{((dashboardStats.todayDeposits / dashboardStats.todaySignups) * 100).toFixed(1)}%</p>
            <p className="text-xs text-muted-foreground">{dashboardStats.todaySignups} signups → {dashboardStats.todayDeposits} deposits today</p>
          </CardContent>
        </Card>
      </div>

      {/* Actionable Alerts */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="border-border/40 bg-warning/5 cursor-pointer hover:bg-warning/10 transition-colors" onClick={() => onNavigate?.("markets")}>
          <CardContent className="p-4">
            <div className="flex items-center gap-2 text-warning text-sm mb-1">
              <Clock className="h-4 w-4" />
              Pending Markets
            </div>
            <div className="flex items-center justify-between">
              <p className="text-2xl font-bold">{dashboardStats.pendingMarkets}</p>
              <Button size="sm" variant="ghost" className="text-warning h-7 px-2 text-xs">Review →</Button>
            </div>
          </CardContent>
        </Card>

        <Card className="border-border/40 bg-destructive/5 cursor-pointer hover:bg-destructive/10 transition-colors" onClick={() => onNavigate?.("disputes")}>
          <CardContent className="p-4">
            <div className="flex items-center gap-2 text-destructive text-sm mb-1">
              <AlertTriangle className="h-4 w-4" />
              Open Disputes
            </div>
            <div className="flex items-center justify-between">
              <p className="text-2xl font-bold">{dashboardStats.disputes}</p>
              <Button size="sm" variant="ghost" className="text-destructive h-7 px-2 text-xs">Review →</Button>
            </div>
          </CardContent>
        </Card>

        <Card className="border-border/40 bg-primary/5 cursor-pointer hover:bg-primary/10 transition-colors" onClick={() => onNavigate?.("disputes")}>
          <CardContent className="p-4">
            <div className="flex items-center gap-2 text-primary text-sm mb-1">
              <CheckCircle className="h-4 w-4" />
              Pending Resolutions
            </div>
            <div className="flex items-center justify-between">
              <p className="text-2xl font-bold">{dashboardStats.pendingResolutions}</p>
              <Button size="sm" variant="ghost" className="text-primary h-7 px-2 text-xs">Resolve →</Button>
            </div>
          </CardContent>
        </Card>

        <Card className="border-border/40 cursor-pointer hover:bg-muted/30 transition-colors" onClick={() => onNavigate?.("users")}>
          <CardContent className="p-4">
            <div className="flex items-center gap-2 text-muted-foreground text-sm mb-1">
              <Shield className="h-4 w-4" />
              KYC Reviews
            </div>
            <div className="flex items-center justify-between">
              <p className="text-2xl font-bold">12</p>
              <Button size="sm" variant="ghost" className="text-muted-foreground h-7 px-2 text-xs">Review →</Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity - Full Width */}
      <Card className="border-border/40">
        <CardHeader className="pb-3">
          <CardTitle className="text-base">Recent Activity</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="divide-y divide-border/40">
            {recentActivity.map((activity) => (
              <div key={activity.id} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 hover:bg-muted/30 transition-colors gap-1">
                <p className="text-sm">{activity.message}</p>
                <span className="text-xs text-muted-foreground whitespace-nowrap">{activity.time}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
