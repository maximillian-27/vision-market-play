import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
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
} from "lucide-react";

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
};

const recentActivity = [
  { id: 1, type: "user", message: "New user registration: john@example.com", time: "2 min ago" },
  { id: 2, type: "market", message: "Market 'Bitcoin Price' resolved", time: "5 min ago" },
  { id: 3, type: "dispute", message: "New dispute raised on market #1234", time: "12 min ago" },
  { id: 4, type: "transaction", message: "Large withdrawal: $15,000", time: "18 min ago" },
  { id: 5, type: "creator", message: "Creator application: CryptoGuru", time: "25 min ago" },
];

export const AdminDashboard = () => {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Dashboard Overview</h2>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="border-border/40">
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

        <Card className="border-border/40">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 text-muted-foreground text-sm mb-1">
              <Activity className="h-4 w-4" />
              Active Users
            </div>
            <p className="text-2xl font-bold">{(dashboardStats.activeUsers / 1000).toFixed(1)}K</p>
          </CardContent>
        </Card>

        <Card className="border-border/40">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 text-muted-foreground text-sm mb-1">
              <DollarSign className="h-4 w-4" />
              Total Volume
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

        <Card className="border-border/40">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 text-muted-foreground text-sm mb-1">
              <BarChart3 className="h-4 w-4" />
              Active Markets
            </div>
            <p className="text-2xl font-bold">{dashboardStats.totalMarkets.toLocaleString()}</p>
          </CardContent>
        </Card>
      </div>

      {/* Quick Stats Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="border-border/40 bg-warning/5">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 text-warning text-sm mb-1">
              <Clock className="h-4 w-4" />
              Pending Markets
            </div>
            <p className="text-2xl font-bold">{dashboardStats.pendingMarkets}</p>
          </CardContent>
        </Card>

        <Card className="border-border/40 bg-destructive/5">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 text-destructive text-sm mb-1">
              <AlertTriangle className="h-4 w-4" />
              Open Disputes
            </div>
            <p className="text-2xl font-bold">{dashboardStats.disputes}</p>
          </CardContent>
        </Card>

        <Card className="border-border/40 bg-primary/5">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 text-primary text-sm mb-1">
              <CheckCircle className="h-4 w-4" />
              Pending Resolutions
            </div>
            <p className="text-2xl font-bold">{dashboardStats.pendingResolutions}</p>
          </CardContent>
        </Card>

        <Card className="border-border/40 bg-success/5">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 text-success text-sm mb-1">
              <TrendingUp className="h-4 w-4" />
              Daily Revenue
            </div>
            <p className="text-2xl font-bold">${dashboardStats.dailyRevenue.toLocaleString()}</p>
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
            {recentActivity.map((activity) => (
              <div key={activity.id} className="flex items-center justify-between p-4 hover:bg-muted/30 transition-colors">
                <p className="text-sm">{activity.message}</p>
                <span className="text-xs text-muted-foreground whitespace-nowrap ml-4">{activity.time}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
