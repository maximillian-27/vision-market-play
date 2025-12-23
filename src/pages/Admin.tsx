import { useState } from "react";
import { PageHeader } from "@/components/PageHeader";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  Users, 
  DollarSign,
  TrendingUp,
  Gift,
  UserPlus,
  Search,
  MoreHorizontal,
  Eye,
  Ban,
  Mail,
  BarChart3,
  ArrowUpRight,
  ArrowDownRight,
  Calendar,
  Filter,
  Download,
  Settings
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// Mock data
const platformStats = {
  totalUsers: 124500,
  usersGrowth: 12.3,
  activeUsers: 45200,
  totalVolume: 15600000,
  volumeGrowth: 24.7,
  totalMarkets: 1247,
  affiliates: 892,
  loyaltyPoints: 2340000,
};

const recentUsers = [
  { id: 1, name: "John Doe", email: "john@example.com", joined: "2024-01-15", status: "Active", portfolio: 12450, trades: 47 },
  { id: 2, name: "Jane Smith", email: "jane@example.com", joined: "2024-01-14", status: "Active", portfolio: 8900, trades: 32 },
  { id: 3, name: "Bob Wilson", email: "bob@example.com", joined: "2024-01-14", status: "Pending", portfolio: 500, trades: 3 },
  { id: 4, name: "Alice Johnson", email: "alice@example.com", joined: "2024-01-13", status: "Suspended", portfolio: 0, trades: 0 },
  { id: 5, name: "Charlie Brown", email: "charlie@example.com", joined: "2024-01-13", status: "Active", portfolio: 34500, trades: 156 },
];

const affiliates = [
  { id: 1, name: "CryptoInfluencer", code: "CRYPTO20", referrals: 234, earnings: 4560, status: "Active" },
  { id: 2, name: "TradingGuru", code: "TRADE10", referrals: 189, earnings: 3240, status: "Active" },
  { id: 3, name: "PredictionPro", code: "PRED15", referrals: 156, earnings: 2890, status: "Active" },
  { id: 4, name: "MarketWatch", code: "MARKET", referrals: 98, earnings: 1450, status: "Paused" },
];

const loyaltyTiers = [
  { name: "Bronze", users: 45000, minPoints: 0, benefits: "5% bonus on deposits" },
  { name: "Silver", users: 23000, minPoints: 1000, benefits: "10% bonus, priority support" },
  { name: "Gold", users: 8500, minPoints: 5000, benefits: "15% bonus, exclusive markets" },
  { name: "Platinum", users: 2100, minPoints: 20000, benefits: "20% bonus, VIP support" },
];

const Admin = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [userFilter, setUserFilter] = useState("all");

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 lg:px-8 py-6">
        <PageHeader 
          title="Admin Dashboard" 
          subtitle="Manage users, affiliates, and platform settings"
          action={
            <Button variant="outline" size="sm" className="gap-2">
              <Settings className="h-4 w-4" />
              Platform Settings
            </Button>
          }
        />

        {/* Platform Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <Card className="border-border/40">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 text-muted-foreground text-sm mb-1">
                <Users className="h-4 w-4" />
                Total Users
              </div>
              <div className="flex items-center gap-2">
                <p className="text-2xl font-bold">{(platformStats.totalUsers / 1000).toFixed(1)}K</p>
                <Badge className="text-xs bg-success/10 text-success border-0">
                  <ArrowUpRight className="h-3 w-3 mr-1" />
                  {platformStats.usersGrowth}%
                </Badge>
              </div>
            </CardContent>
          </Card>
          
          <Card className="border-border/40">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 text-muted-foreground text-sm mb-1">
                <TrendingUp className="h-4 w-4" />
                Active Users
              </div>
              <p className="text-2xl font-bold">{(platformStats.activeUsers / 1000).toFixed(1)}K</p>
            </CardContent>
          </Card>
          
          <Card className="border-border/40">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 text-muted-foreground text-sm mb-1">
                <DollarSign className="h-4 w-4" />
                Total Volume
              </div>
              <div className="flex items-center gap-2">
                <p className="text-2xl font-bold">${(platformStats.totalVolume / 1000000).toFixed(1)}M</p>
                <Badge className="text-xs bg-success/10 text-success border-0">
                  <ArrowUpRight className="h-3 w-3 mr-1" />
                  {platformStats.volumeGrowth}%
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
              <p className="text-2xl font-bold">{platformStats.totalMarkets.toLocaleString()}</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="users" className="space-y-6">
          <TabsList className="bg-muted/50 p-1 flex-wrap h-auto gap-1">
            <TabsTrigger value="users" className="data-[state=active]:bg-background gap-2">
              <Users className="h-4 w-4" />
              CRM
            </TabsTrigger>
            <TabsTrigger value="affiliates" className="data-[state=active]:bg-background gap-2">
              <UserPlus className="h-4 w-4" />
              Affiliates
            </TabsTrigger>
            <TabsTrigger value="loyalty" className="data-[state=active]:bg-background gap-2">
              <Gift className="h-4 w-4" />
              Loyalty
            </TabsTrigger>
            <TabsTrigger value="analytics" className="data-[state=active]:bg-background gap-2">
              <BarChart3 className="h-4 w-4" />
              Analytics
            </TabsTrigger>
          </TabsList>

          {/* CRM Tab */}
          <TabsContent value="users" className="space-y-4">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <h3 className="text-lg font-semibold">User Management</h3>
              <div className="flex items-center gap-3 w-full sm:w-auto">
                <div className="relative flex-1 sm:w-64">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input 
                    placeholder="Search users..." 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-9 h-9"
                  />
                </div>
                <Select value={userFilter} onValueChange={setUserFilter}>
                  <SelectTrigger className="w-28 h-9">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All</SelectItem>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="suspended">Suspended</SelectItem>
                  </SelectContent>
                </Select>
                <Button variant="outline" size="sm" className="gap-2">
                  <Download className="h-4 w-4" />
                  Export
                </Button>
              </div>
            </div>

            <Card className="border-border/40">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border/40 text-left text-sm text-muted-foreground">
                      <th className="p-4 font-medium">User</th>
                      <th className="p-4 font-medium">Joined</th>
                      <th className="p-4 font-medium">Status</th>
                      <th className="p-4 font-medium">Portfolio</th>
                      <th className="p-4 font-medium">Trades</th>
                      <th className="p-4 font-medium text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentUsers.map((user) => (
                      <tr key={user.id} className="border-b border-border/20 hover:bg-muted/30 transition-colors">
                        <td className="p-4">
                          <div>
                            <p className="font-medium">{user.name}</p>
                            <p className="text-sm text-muted-foreground">{user.email}</p>
                          </div>
                        </td>
                        <td className="p-4 text-sm">{user.joined}</td>
                        <td className="p-4">
                          <Badge 
                            variant={user.status === "Active" ? "default" : user.status === "Pending" ? "secondary" : "destructive"}
                            className="text-xs"
                          >
                            {user.status}
                          </Badge>
                        </td>
                        <td className="p-4 text-sm font-medium">${user.portfolio.toLocaleString()}</td>
                        <td className="p-4 text-sm">{user.trades}</td>
                        <td className="p-4 text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon" className="h-8 w-8">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="bg-popover">
                              <DropdownMenuItem className="gap-2">
                                <Eye className="h-4 w-4" /> View Profile
                              </DropdownMenuItem>
                              <DropdownMenuItem className="gap-2">
                                <Mail className="h-4 w-4" /> Send Email
                              </DropdownMenuItem>
                              <DropdownMenuItem className="gap-2 text-destructive">
                                <Ban className="h-4 w-4" /> Suspend
                              </DropdownMenuItem>
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

          {/* Affiliates Tab */}
          <TabsContent value="affiliates" className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">Affiliate Program</h3>
              <Button size="sm" className="gap-2">
                <UserPlus className="h-4 w-4" />
                Add Affiliate
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <Card className="border-border/40 bg-muted/20">
                <CardContent className="p-4">
                  <p className="text-sm text-muted-foreground mb-1">Total Affiliates</p>
                  <p className="text-2xl font-bold">{platformStats.affiliates}</p>
                </CardContent>
              </Card>
              <Card className="border-border/40 bg-muted/20">
                <CardContent className="p-4">
                  <p className="text-sm text-muted-foreground mb-1">Total Referrals</p>
                  <p className="text-2xl font-bold">12,450</p>
                </CardContent>
              </Card>
              <Card className="border-border/40 bg-muted/20">
                <CardContent className="p-4">
                  <p className="text-sm text-muted-foreground mb-1">Total Payouts</p>
                  <p className="text-2xl font-bold">$124,500</p>
                </CardContent>
              </Card>
            </div>

            <Card className="border-border/40">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border/40 text-left text-sm text-muted-foreground">
                      <th className="p-4 font-medium">Affiliate</th>
                      <th className="p-4 font-medium">Code</th>
                      <th className="p-4 font-medium">Referrals</th>
                      <th className="p-4 font-medium">Earnings</th>
                      <th className="p-4 font-medium">Status</th>
                      <th className="p-4 font-medium text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {affiliates.map((affiliate) => (
                      <tr key={affiliate.id} className="border-b border-border/20 hover:bg-muted/30 transition-colors">
                        <td className="p-4 font-medium">{affiliate.name}</td>
                        <td className="p-4">
                          <code className="px-2 py-1 rounded bg-muted text-sm">{affiliate.code}</code>
                        </td>
                        <td className="p-4 text-sm">{affiliate.referrals}</td>
                        <td className="p-4 text-sm font-medium text-success">${affiliate.earnings.toLocaleString()}</td>
                        <td className="p-4">
                          <Badge 
                            variant={affiliate.status === "Active" ? "default" : "secondary"}
                            className="text-xs"
                          >
                            {affiliate.status}
                          </Badge>
                        </td>
                        <td className="p-4 text-right">
                          <Button variant="ghost" size="sm">Manage</Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          </TabsContent>

          {/* Loyalty Tab */}
          <TabsContent value="loyalty" className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">Loyalty Program</h3>
              <Button variant="outline" size="sm" className="gap-2">
                <Settings className="h-4 w-4" />
                Configure Tiers
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {loyaltyTiers.map((tier, index) => (
                <Card key={tier.name} className="border-border/40">
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">{tier.name}</CardTitle>
                      <Badge variant="secondary">{tier.users.toLocaleString()} users</Badge>
                    </div>
                    <CardDescription>Min {tier.minPoints.toLocaleString()} points</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">{tier.benefits}</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Card className="border-border/40 bg-muted/20">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-semibold mb-1">Total Loyalty Points in Circulation</h4>
                    <p className="text-sm text-muted-foreground">Across all user accounts</p>
                  </div>
                  <p className="text-3xl font-bold">{(platformStats.loyaltyPoints / 1000000).toFixed(2)}M</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics" className="space-y-4">
            <h3 className="text-lg font-semibold">Platform Analytics</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <Card className="border-border/40">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Daily Active Users</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-bold">8,450</p>
                  <div className="flex items-center gap-1 text-sm text-success">
                    <ArrowUpRight className="h-4 w-4" />
                    +12.5% from yesterday
                  </div>
                </CardContent>
              </Card>

              <Card className="border-border/40">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Daily Volume</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-bold">$234K</p>
                  <div className="flex items-center gap-1 text-sm text-success">
                    <ArrowUpRight className="h-4 w-4" />
                    +8.3% from yesterday
                  </div>
                </CardContent>
              </Card>

              <Card className="border-border/40">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">New Signups Today</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-bold">347</p>
                  <div className="flex items-center gap-1 text-sm text-destructive">
                    <ArrowDownRight className="h-4 w-4" />
                    -3.2% from yesterday
                  </div>
                </CardContent>
              </Card>

              <Card className="border-border/40">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Avg Session Duration</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-bold">12m 34s</p>
                  <p className="text-sm text-muted-foreground">Per user session</p>
                </CardContent>
              </Card>

              <Card className="border-border/40">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Conversion Rate</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-bold">4.8%</p>
                  <p className="text-sm text-muted-foreground">Visitor to trader</p>
                </CardContent>
              </Card>

              <Card className="border-border/40">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Revenue Today</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-bold text-success">$12,450</p>
                  <p className="text-sm text-muted-foreground">Trading fees</p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Admin;
