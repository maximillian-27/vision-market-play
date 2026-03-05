import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Search, MoreHorizontal, Eye, Users, UserCheck, UserX, Mail, Tag, Zap,
  Bell, MessageSquare, Smartphone, Send, DollarSign, ChevronLeft, ChevronRight,
  Shield, UserPlus, Star, Percent, Download, CheckCircle, XCircle, TrendingUp,
} from "lucide-react";
import { toast } from "sonner";
import { Progress } from "@/components/ui/progress";

// ---- Users Data ----
const users = [
  { id: 1, name: "John Doe", email: "john@example.com", dateJoined: "2024-03-15", status: "Active", volume: 45200, trades: 234, verified: true, deposits: 12000, pnl: 3200 },
  { id: 2, name: "Jane Smith", email: "jane@example.com", dateJoined: "2024-06-22", status: "Active", volume: 128000, trades: 890, verified: true, deposits: 45000, pnl: 18200 },
  { id: 3, name: "Bob Wilson", email: "bob@example.com", dateJoined: "2024-09-01", status: "Suspended", volume: 5600, trades: 45, verified: false, deposits: 2000, pnl: -800 },
  { id: 4, name: "Alice Johnson", email: "alice@example.com", dateJoined: "2024-01-10", status: "Active", volume: 312000, trades: 2100, verified: true, deposits: 95000, pnl: 42000 },
  { id: 5, name: "Charlie Brown", email: "charlie@example.com", dateJoined: "2024-11-05", status: "Active", volume: 8900, trades: 67, verified: false, deposits: 3500, pnl: -200 },
  { id: 6, name: "Diana Prince", email: "diana@example.com", dateJoined: "2024-04-18", status: "Active", volume: 67000, trades: 456, verified: true, deposits: 22000, pnl: 8900 },
];

// ---- Creators & Affiliates Data ----
const creatorsAffiliates = [
  { id: 1, name: "CryptoGuru", email: "guru@crypto.com", type: "Creator", status: "Active", markets: 12, volumeGenerated: 890000, earnings: 5340, followers: 12400, lastOnline: "2h ago", referrals: 0, tier: "Gold" },
  { id: 2, name: "TechOracle", email: "tech@oracle.io", type: "Creator", status: "Active", markets: 8, volumeGenerated: 456000, earnings: 2736, followers: 8900, lastOnline: "1d ago", referrals: 0, tier: "Silver" },
  { id: 3, name: "SportsAnalyst", email: "sports@analyst.com", type: "Creator", status: "Active", markets: 15, volumeGenerated: 1200000, earnings: 7200, followers: 23000, lastOnline: "5h ago", referrals: 0, tier: "Platinum" },
  { id: 4, name: "MarketMaven", email: "maven@market.com", type: "Creator", status: "Pending", markets: 0, volumeGenerated: 0, earnings: 0, followers: 3400, lastOnline: "3d ago", referrals: 0, tier: "Bronze" },
  { id: 5, name: "ReferKing", email: "refer@king.com", type: "Affiliate", status: "Active", markets: 0, volumeGenerated: 234000, earnings: 1404, followers: 0, lastOnline: "12h ago", referrals: 145, tier: "Silver" },
  { id: 6, name: "PromoQueen", email: "promo@queen.io", type: "Affiliate", status: "Active", markets: 0, volumeGenerated: 567000, earnings: 3402, followers: 0, lastOnline: "1h ago", referrals: 312, tier: "Gold" },
];

// ---- Creator Applications ----
const creatorApplications = [
  { id: 1, name: "NewTrader42", email: "trader42@mail.com", bio: "Experienced crypto trader with 5+ years", dateApplied: "2025-01-14" },
  { id: 2, name: "SportsPro", email: "sportspro@mail.com", bio: "Sports analytics professional", dateApplied: "2025-01-15" },
];

// ---- Payouts Data ----
const payouts = [
  { id: 1, name: "CryptoGuru", type: "Creator", amount: 2450, period: "Jan 13–19", status: "Pending" },
  { id: 2, name: "SportsAnalyst", type: "Creator", amount: 3200, period: "Jan 13–19", status: "Pending" },
  { id: 3, name: "PromoQueen", type: "Affiliate", amount: 1800, period: "Jan 13–19", status: "Pending" },
  { id: 4, name: "TechOracle", type: "Creator", amount: 1560, period: "Jan 6–12", status: "Paid" },
  { id: 5, name: "ReferKing", type: "Affiliate", amount: 890, period: "Jan 6–12", status: "Paid" },
  { id: 6, name: "CryptoGuru", type: "Creator", amount: 2100, period: "Dec 30–Jan 5", status: "Paid" },
  { id: 7, name: "SportsAnalyst", type: "Creator", amount: 2800, period: "Dec 30–Jan 5", status: "Failed" },
];

// ---- CRM Marketing Data ----
const segments = [
  { id: 1, name: "High Value", count: 2340, description: "Volume > $10K", color: "bg-success/10 text-success" },
  { id: 2, name: "At Risk", count: 456, description: "No activity 30+ days", color: "bg-destructive/10 text-destructive" },
  { id: 3, name: "New Users", count: 1890, description: "Joined last 7 days", color: "bg-primary/10 text-primary" },
  { id: 4, name: "Whales", count: 89, description: "Volume > $100K", color: "bg-warning/10 text-warning" },
];

const campaigns = [
  { id: 1, name: "Welcome Series", type: "Email", status: "Active", sent: 4560, opened: 2340, clicked: 890 },
  { id: 2, name: "Re-engagement", type: "Push", status: "Active", sent: 1200, opened: 450, clicked: 120 },
  { id: 3, name: "Deposit Bonus", type: "Email", status: "Scheduled", sent: 0, opened: 0, clicked: 0 },
  { id: 4, name: "VIP Promotion", type: "SMS", status: "Completed", sent: 89, opened: 78, clicked: 45 },
];

const automations = [
  { id: 1, name: "Welcome Series", trigger: "User Registration", channel: "Email + Push", status: "Active", sent: 12400, conversion: 23.4 },
  { id: 2, name: "Churn Prevention", trigger: "No activity 14 days", channel: "Email + In-App", status: "Active", sent: 3400, conversion: 8.2 },
  { id: 3, name: "Win Celebration", trigger: "Market won", channel: "Push + In-App", status: "Active", sent: 8900, conversion: 45.6 },
  { id: 4, name: "Deposit Reminder", trigger: "Balance < $10", channel: "Email", status: "Paused", sent: 2100, conversion: 12.1 },
];

const commissionTiers = [
  { tier: "Bronze", threshold: "$0+", creatorRate: "20%", affiliateRate: "20%", effective: "0.6%" },
  { tier: "Silver", threshold: "$50K+", creatorRate: "22%", affiliateRate: "22%", effective: "0.66%" },
  { tier: "Gold", threshold: "$250K+", creatorRate: "25%", affiliateRate: "25%", effective: "0.75%" },
  { tier: "Platinum", threshold: "$1M+", creatorRate: "28%", affiliateRate: "28%", effective: "0.84%" },
  { tier: "Diamond", threshold: "$5M+", creatorRate: "30%", affiliateRate: "30%", effective: "0.90%" },
];

const tierColors: Record<string, string> = {
  Bronze: "bg-orange-500/10 text-orange-500",
  Silver: "bg-muted text-muted-foreground",
  Gold: "bg-warning/10 text-warning",
  Platinum: "bg-primary/10 text-primary",
  Diamond: "bg-success/10 text-success",
};

const PAGE_SIZE = 5;

export const AdminCRM = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [userPage, setUserPage] = useState(1);
  const [caPage, setCaPage] = useState(1);
  const [userStatusFilter, setUserStatusFilter] = useState("all");
  const [userSortBy, setUserSortBy] = useState("name");
  const [caTypeFilter, setCaTypeFilter] = useState("all");
  const [caStatusFilter, setCaStatusFilter] = useState("all");
  const [caTimePeriod, setCaTimePeriod] = useState("all");
  const [caSortBy, setCaSortBy] = useState("volume");
  const [payoutTypeFilter, setPayoutTypeFilter] = useState("all");
  const [payoutStatusFilter, setPayoutStatusFilter] = useState("all");

  const filteredUsers = users.filter(u => {
    const matchesSearch = u.name.toLowerCase().includes(searchQuery.toLowerCase()) || u.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = userStatusFilter === "all" || 
      (userStatusFilter === "unverified" ? !u.verified : u.status.toLowerCase() === userStatusFilter);
    return matchesSearch && matchesStatus;
  });

  const filteredCA = creatorsAffiliates.filter(c => {
    const matchesSearch = c.name.toLowerCase().includes(searchQuery.toLowerCase()) || c.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = caTypeFilter === "all" || c.type.toLowerCase() === caTypeFilter;
    const matchesStatus = caStatusFilter === "all" || c.status.toLowerCase() === caStatusFilter;
    return matchesSearch && matchesType && matchesStatus;
  });

  const filteredPayouts = payouts.filter(p => {
    const matchesType = payoutTypeFilter === "all" || p.type.toLowerCase() === payoutTypeFilter;
    const matchesStatus = payoutStatusFilter === "all" || p.status.toLowerCase() === payoutStatusFilter;
    return matchesType && matchesStatus;
  });

  const creators = creatorsAffiliates.filter(c => c.type === "Creator");
  const affiliates = creatorsAffiliates.filter(c => c.type === "Affiliate");
  const totalCreatorVolume = creators.reduce((a, c) => a + c.volumeGenerated, 0);
  const totalAffiliateVolume = affiliates.reduce((a, c) => a + c.volumeGenerated, 0);
  const avgRevenuePerCreator = creators.length > 0 ? (totalCreatorVolume * 0.03) / creators.length : 0;
  const avgRevenuePerAffiliate = affiliates.length > 0 ? (totalAffiliateVolume * 0.03) / affiliates.length : 0;
  const totalUserVolume = users.reduce((a, u) => a + u.volume, 0);
  const avgVolumePerUser = users.length > 0 ? totalUserVolume / users.length : 0;
  const unverifiedUsers = users.filter(u => !u.verified).length;

  const totalPaidAllTime = payouts.filter(p => p.status === "Paid").reduce((a, p) => a + p.amount, 0);
  const avgPayoutSize = payouts.length > 0 ? payouts.reduce((a, p) => a + p.amount, 0) / payouts.length : 0;
  const failedPayouts = payouts.filter(p => p.status === "Failed").length;

  const exportPayoutsCSV = () => {
    const headers = ["Name", "Type", "Amount", "Period", "Status"];
    const rows = filteredPayouts.map(p => [p.name, p.type, p.amount, p.period, p.status]);
    const csv = [headers, ...rows].map(r => r.join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url; a.download = "payouts-export.csv"; a.click();
    URL.revokeObjectURL(url);
    toast.success("Payouts exported successfully");
  };

  return (
    <div className="space-y-6">
      {/* Search bar */}
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input placeholder="Search users, creators, affiliates..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="pl-9 h-9" />
      </div>

      <Tabs defaultValue="users" className="space-y-4">
        <TabsList className="bg-muted/50 p-1 flex-wrap h-auto gap-1">
          <TabsTrigger value="users" className="data-[state=active]:bg-background gap-2"><Users className="h-4 w-4" /> Users</TabsTrigger>
          <TabsTrigger value="creators" className="data-[state=active]:bg-background gap-2"><Star className="h-4 w-4" /> Creators & Affiliates</TabsTrigger>
          <TabsTrigger value="payouts" className="data-[state=active]:bg-background gap-2"><DollarSign className="h-4 w-4" /> Payouts</TabsTrigger>
          <TabsTrigger value="segments" className="data-[state=active]:bg-background gap-2"><Tag className="h-4 w-4" /> Segments</TabsTrigger>
          <TabsTrigger value="campaigns" className="data-[state=active]:bg-background gap-2"><Mail className="h-4 w-4" /> Campaigns</TabsTrigger>
          <TabsTrigger value="automations" className="data-[state=active]:bg-background gap-2"><Zap className="h-4 w-4" /> Automations</TabsTrigger>
        </TabsList>

        {/* ========== USERS TAB ========== */}
        <TabsContent value="users" className="space-y-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 xl:grid-cols-8 gap-4">
            <Card className="border-border/40"><CardContent className="p-4"><div className="flex items-center gap-2 text-muted-foreground text-sm mb-1"><Users className="h-4 w-4" /> Total Users</div><p className="text-2xl font-bold">124,500</p></CardContent></Card>
            <Card className="border-border/40 bg-success/5"><CardContent className="p-4"><div className="flex items-center gap-2 text-success text-sm mb-1"><UserCheck className="h-4 w-4" /> Active (30d)</div><p className="text-2xl font-bold">89,200</p></CardContent></Card>
            <Card className="border-border/40 bg-destructive/5"><CardContent className="p-4"><div className="flex items-center gap-2 text-destructive text-sm mb-1"><UserX className="h-4 w-4" /> Churned (30d)</div><p className="text-2xl font-bold">1,234</p></CardContent></Card>
            <Card className="border-border/40"><CardContent className="p-4"><p className="text-sm text-muted-foreground mb-1">High Value ({'>'}$10K)</p><p className="text-2xl font-bold">2,340</p></CardContent></Card>
            <Card className="border-border/40 bg-warning/5"><CardContent className="p-4"><p className="text-sm text-muted-foreground mb-1">Whales ({'>'}$100K)</p><p className="text-2xl font-bold">89</p></CardContent></Card>
            <Card className="border-border/40"><CardContent className="p-4"><p className="text-sm text-muted-foreground mb-1">High Risk</p><p className="text-2xl font-bold">34</p></CardContent></Card>
            <Card className="border-border/40 bg-primary/5"><CardContent className="p-4"><p className="text-sm text-muted-foreground mb-1">Avg Vol/User</p><p className="text-2xl font-bold">${(avgVolumePerUser / 1000).toFixed(0)}K</p></CardContent></Card>
            <Card className="border-border/40 bg-warning/5"><CardContent className="p-4"><div className="flex items-center gap-2 text-warning text-sm mb-1"><Shield className="h-4 w-4" /> Unverified</div><p className="text-2xl font-bold">{unverifiedUsers}</p></CardContent></Card>
          </div>

          {/* User Filters */}
          <div className="flex items-center gap-3 flex-wrap">
            <Select value={userStatusFilter} onValueChange={setUserStatusFilter}>
              <SelectTrigger className="w-36 h-9"><SelectValue placeholder="Status" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="suspended">Suspended</SelectItem>
                <SelectItem value="unverified">Unverified</SelectItem>
              </SelectContent>
            </Select>
            <Select value={userSortBy} onValueChange={setUserSortBy}>
              <SelectTrigger className="w-36 h-9"><SelectValue placeholder="Sort by" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="name">Name</SelectItem>
                <SelectItem value="volume">Volume</SelectItem>
                <SelectItem value="trades">Trades</SelectItem>
                <SelectItem value="joined">Date Joined</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Card className="border-border/40">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border/40 text-left text-sm text-muted-foreground">
                    <th className="p-4 font-medium">Name</th>
                    <th className="p-4 font-medium">Contact</th>
                    <th className="p-4 font-medium">Joined</th>
                    <th className="p-4 font-medium">Status</th>
                    <th className="p-4 font-medium">Volume</th>
                    <th className="p-4 font-medium">Trades</th>
                    <th className="p-4 font-medium">Deposits</th>
                    <th className="p-4 font-medium">P&L</th>
                    <th className="p-4 font-medium">Verified</th>
                    <th className="p-4 font-medium text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredUsers.map((u) => (
                    <tr key={u.id} className="border-b border-border/20 hover:bg-muted/30 transition-colors">
                      <td className="p-4 font-medium">{u.name}</td>
                      <td className="p-4 text-sm text-muted-foreground">{u.email}</td>
                      <td className="p-4 text-sm">{u.dateJoined}</td>
                      <td className="p-4"><Badge variant={u.status === "Active" ? "default" : "destructive"} className="text-xs">{u.status}</Badge></td>
                      <td className="p-4 text-sm font-medium">${u.volume.toLocaleString()}</td>
                      <td className="p-4 text-sm">{u.trades}</td>
                      <td className="p-4 text-sm">${u.deposits.toLocaleString()}</td>
                      <td className="p-4 text-sm font-medium"><span className={u.pnl >= 0 ? 'text-success' : 'text-destructive'}>{u.pnl >= 0 ? '+' : ''}${u.pnl.toLocaleString()}</span></td>
                      <td className="p-4">{u.verified ? <Badge className="text-xs bg-success/10 text-success border-0">KYC</Badge> : <Badge variant="outline" className="text-xs">Pending</Badge>}</td>
                      <td className="p-4 text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild><Button variant="ghost" size="icon" className="h-8 w-8"><MoreHorizontal className="h-4 w-4" /></Button></DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="bg-popover">
                            <DropdownMenuItem className="gap-2" onClick={() => toast(`Opening profile for ${u.name}`)}><Eye className="h-4 w-4" /> View Profile</DropdownMenuItem>
                            <DropdownMenuItem className="gap-2" onClick={() => toast(`Opening KYC review for ${u.name}`)}><Shield className="h-4 w-4" /> View KYC</DropdownMenuItem>
                            <DropdownMenuItem className="gap-2" onClick={() => toast(`Opening email composer for ${u.email}`)}><Mail className="h-4 w-4" /> Send Email</DropdownMenuItem>
                            <DropdownMenuItem className="gap-2 text-destructive" onClick={() => toast.success(`${u.name} has been suspended`)}><UserX className="h-4 w-4" /> Suspend</DropdownMenuItem>
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

        {/* ========== CREATORS & AFFILIATES TAB ========== */}
        <TabsContent value="creators" className="space-y-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 xl:grid-cols-8 gap-4">
            <Card className="border-border/40"><CardContent className="p-4"><div className="flex items-center gap-2 text-muted-foreground text-sm mb-1"><Star className="h-4 w-4" /> Total Creators</div><p className="text-2xl font-bold">{creators.length}</p></CardContent></Card>
            <Card className="border-border/40"><CardContent className="p-4"><div className="flex items-center gap-2 text-muted-foreground text-sm mb-1"><UserPlus className="h-4 w-4" /> Total Affiliates</div><p className="text-2xl font-bold">{affiliates.length}</p></CardContent></Card>
            <Card className="border-border/40 bg-success/5"><CardContent className="p-4"><div className="flex items-center gap-2 text-success text-sm mb-1"><UserCheck className="h-4 w-4" /> Active</div><p className="text-2xl font-bold">{creatorsAffiliates.filter(c => c.status === "Active").length}</p></CardContent></Card>
            <Card className="border-border/40 bg-warning/5"><CardContent className="p-4"><p className="text-sm text-muted-foreground mb-1">Pending Applications</p><p className="text-2xl font-bold">{creatorsAffiliates.filter(c => c.status === "Pending").length}</p></CardContent></Card>
            <Card className="border-border/40"><CardContent className="p-4"><p className="text-sm text-muted-foreground mb-1">Total Earnings Paid</p><p className="text-2xl font-bold">${creatorsAffiliates.reduce((a, c) => a + c.earnings, 0).toLocaleString()}</p></CardContent></Card>
            <Card className="border-border/40 bg-primary/5"><CardContent className="p-4"><p className="text-sm text-muted-foreground mb-1">Revenue Generated</p><p className="text-2xl font-bold">${(creatorsAffiliates.reduce((a, c) => a + c.volumeGenerated, 0) * 0.03 / 1000).toFixed(0)}K</p></CardContent></Card>
            <Card className="border-border/40 bg-success/5"><CardContent className="p-4"><p className="text-sm text-muted-foreground mb-1">Avg Rev/Creator</p><p className="text-2xl font-bold">${avgRevenuePerCreator.toLocaleString(undefined, {maximumFractionDigits: 0})}</p></CardContent></Card>
            <Card className="border-border/40 bg-primary/5"><CardContent className="p-4"><p className="text-sm text-muted-foreground mb-1">Avg Rev/Affiliate</p><p className="text-2xl font-bold">${avgRevenuePerAffiliate.toLocaleString(undefined, {maximumFractionDigits: 0})}</p></CardContent></Card>
          </div>

          {/* Filters Bar */}
          <div className="flex items-center gap-3 flex-wrap">
            <Select value={caTypeFilter} onValueChange={setCaTypeFilter}>
              <SelectTrigger className="w-40 h-9"><SelectValue placeholder="Type" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="creator">Creators Only</SelectItem>
                <SelectItem value="affiliate">Affiliates Only</SelectItem>
              </SelectContent>
            </Select>
            <Select value={caStatusFilter} onValueChange={setCaStatusFilter}>
              <SelectTrigger className="w-36 h-9"><SelectValue placeholder="Status" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="suspended">Suspended</SelectItem>
              </SelectContent>
            </Select>
            <div className="flex items-center gap-1">
              {["1d", "7d", "30d", "90d", "all"].map((p) => (
                <Button key={p} variant={caTimePeriod === p ? "default" : "outline"} size="sm" className="h-8 px-3 text-xs" onClick={() => setCaTimePeriod(p)}>
                  {p === "all" ? "All Time" : p}
                </Button>
              ))}
            </div>
            <Select value={caSortBy} onValueChange={setCaSortBy}>
              <SelectTrigger className="w-36 h-9"><SelectValue placeholder="Sort by" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="name">Name</SelectItem>
                <SelectItem value="volume">Volume</SelectItem>
                <SelectItem value="earnings">Earnings</SelectItem>
                <SelectItem value="markets">Markets</SelectItem>
                <SelectItem value="lastOnline">Last Online</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Card className="border-border/40">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border/40 text-left text-sm text-muted-foreground">
                    <th className="p-4 font-medium">Name</th>
                    <th className="p-4 font-medium">Type</th>
                    <th className="p-4 font-medium">Tier</th>
                    <th className="p-4 font-medium">Status</th>
                    <th className="p-4 font-medium">Markets</th>
                    <th className="p-4 font-medium">Vol. Generated</th>
                    <th className="p-4 font-medium">Rev. Generated</th>
                    <th className="p-4 font-medium">Avg Pot/Market</th>
                    <th className="p-4 font-medium">Earnings</th>
                    <th className="p-4 font-medium">Referrals</th>
                    <th className="p-4 font-medium">Last Online</th>
                    <th className="p-4 font-medium text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredCA.map((c) => (
                    <tr key={c.id} className="border-b border-border/20 hover:bg-muted/30 transition-colors">
                      <td className="p-4 font-medium">{c.name}</td>
                      <td className="p-4">
                        <div className="flex gap-1">
                          {c.type === "Creator" && <Badge className="text-xs bg-primary/10 text-primary border-0">Creator</Badge>}
                          {c.type === "Creator" && <Badge className="text-xs bg-accent text-accent-foreground border-0">Affiliate</Badge>}
                          {c.type === "Affiliate" && <Badge className="text-xs bg-accent text-accent-foreground border-0">Affiliate</Badge>}
                        </div>
                      </td>
                      <td className="p-4"><Badge className={`text-xs border-0 ${tierColors[c.tier] || 'bg-muted text-muted-foreground'}`}>{c.tier}</Badge></td>
                      <td className="p-4"><Badge variant={c.status === "Active" ? "default" : c.status === "Pending" ? "secondary" : "destructive"} className="text-xs">{c.status}</Badge></td>
                      <td className="p-4 text-sm">{c.markets || "—"}</td>
                      <td className="p-4 text-sm font-medium">${c.volumeGenerated.toLocaleString()}</td>
                      <td className="p-4 text-sm font-medium text-primary">${(c.volumeGenerated * 0.03).toLocaleString()}</td>
                      <td className="p-4 text-sm">{c.type === "Creator" && c.markets > 0 ? `$${(c.volumeGenerated / c.markets).toLocaleString()}` : "—"}</td>
                      <td className="p-4 text-sm font-medium text-success">${c.earnings.toLocaleString()}</td>
                      <td className="p-4 text-sm">{c.referrals > 0 ? c.referrals : "—"}</td>
                      <td className="p-4 text-sm text-muted-foreground">{c.lastOnline}</td>
                      <td className="p-4 text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild><Button variant="ghost" size="icon" className="h-8 w-8"><MoreHorizontal className="h-4 w-4" /></Button></DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="bg-popover">
                            <DropdownMenuItem className="gap-2" onClick={() => toast(`Opening profile: ${c.name}`)}><Eye className="h-4 w-4" /> View Profile</DropdownMenuItem>
                            {c.type === "Creator" && <DropdownMenuItem className="gap-2" onClick={() => toast(`Viewing markets by ${c.name}`)}><Star className="h-4 w-4" /> View Markets</DropdownMenuItem>}
                            <DropdownMenuItem className="gap-2" onClick={() => toast(`Editing commission for ${c.name}`)}><Percent className="h-4 w-4" /> Edit Commission</DropdownMenuItem>
                            {c.type === "Affiliate" && <DropdownMenuItem className="gap-2" onClick={() => toast(`Viewing referrals by ${c.name}`)}><UserPlus className="h-4 w-4" /> View Referrals</DropdownMenuItem>}
                            <DropdownMenuItem className="gap-2" onClick={() => toast(`Opening earnings history for ${c.name}`)}><DollarSign className="h-4 w-4" /> Earnings History</DropdownMenuItem>
                            <DropdownMenuItem className="gap-2 text-destructive" onClick={() => toast.success(`${c.name} has been suspended`)}><UserX className="h-4 w-4" /> Suspend</DropdownMenuItem>
                            {c.type === "Creator" && <DropdownMenuItem className="gap-2 text-destructive" onClick={() => toast.success(`Creator status revoked for ${c.name}`)}><Shield className="h-4 w-4" /> Revoke Creator</DropdownMenuItem>}
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>

          {/* Commission Tiers Table */}
          <Card className="border-border/40 bg-muted/30">
            <CardContent className="p-4">
              <h4 className="font-semibold text-sm mb-3 flex items-center gap-2"><Percent className="h-4 w-4" /> Commission Structure (Revenue Share of 3% Platform Fee)</h4>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border/40 text-left text-sm text-muted-foreground">
                      <th className="p-3 font-medium">Tier</th>
                      <th className="p-3 font-medium">Volume Threshold</th>
                      <th className="p-3 font-medium">Creator Rate</th>
                      <th className="p-3 font-medium">Affiliate Rate</th>
                      <th className="p-3 font-medium">Effective Rate</th>
                    </tr>
                  </thead>
                  <tbody>
                    {commissionTiers.map((t) => (
                      <tr key={t.tier} className="border-b border-border/20 hover:bg-muted/30 transition-colors">
                        <td className="p-3"><Badge className={`text-xs border-0 ${tierColors[t.tier]}`}>{t.tier}</Badge></td>
                        <td className="p-3 text-sm">{t.threshold}</td>
                        <td className="p-3 text-sm font-medium">{t.creatorRate} of 3%</td>
                        <td className="p-3 text-sm font-medium">{t.affiliateRate} of 3%</td>
                        <td className="p-3 text-sm font-bold text-primary">{t.effective}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          {/* Creator Applications */}
          {creatorApplications.length > 0 && (
            <Card className="border-border/40 bg-warning/5">
              <CardContent className="p-4">
                <h4 className="font-semibold text-sm mb-3 flex items-center gap-2"><UserPlus className="h-4 w-4 text-warning" /> Pending Creator Applications ({creatorApplications.length})</h4>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-border/40 text-left text-sm text-muted-foreground">
                        <th className="p-3 font-medium">Name</th>
                        <th className="p-3 font-medium">Email</th>
                        <th className="p-3 font-medium">Bio</th>
                        <th className="p-3 font-medium">Applied</th>
                        <th className="p-3 font-medium text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {creatorApplications.map((app) => (
                        <tr key={app.id} className="border-b border-border/20 hover:bg-muted/30 transition-colors">
                          <td className="p-3 font-medium">{app.name}</td>
                          <td className="p-3 text-sm text-muted-foreground">{app.email}</td>
                          <td className="p-3 text-sm max-w-xs truncate">{app.bio}</td>
                          <td className="p-3 text-sm">{app.dateApplied}</td>
                          <td className="p-3 text-right">
                            <div className="flex items-center justify-end gap-2">
                              <Button size="sm" className="gap-1 h-7" onClick={() => toast.success(`${app.name} approved as creator`)}><CheckCircle className="h-3 w-3" /> Approve</Button>
                              <Button size="sm" variant="outline" className="gap-1 h-7 text-destructive" onClick={() => toast.success(`${app.name} application rejected`)}><XCircle className="h-3 w-3" /> Reject</Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        {/* ========== PAYOUTS TAB ========== */}
        <TabsContent value="payouts" className="space-y-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 xl:grid-cols-7 gap-4">
            <Card className="border-border/40 bg-warning/5"><CardContent className="p-4"><p className="text-sm text-muted-foreground mb-1">Pending Payouts</p><p className="text-2xl font-bold">${payouts.filter(p => p.status === "Pending").reduce((a, p) => a + p.amount, 0).toLocaleString()}</p></CardContent></Card>
            <Card className="border-border/40 bg-success/5"><CardContent className="p-4"><p className="text-sm text-muted-foreground mb-1">Paid This Week</p><p className="text-2xl font-bold">${payouts.filter(p => p.status === "Paid").reduce((a, p) => a + p.amount, 0).toLocaleString()}</p></CardContent></Card>
            <Card className="border-border/40"><CardContent className="p-4"><p className="text-sm text-muted-foreground mb-1">Payout Frequency</p><p className="text-2xl font-bold">Weekly</p></CardContent></Card>
            <Card className="border-border/40"><CardContent className="p-4"><p className="text-sm text-muted-foreground mb-1">Min Threshold</p><p className="text-2xl font-bold">$50</p></CardContent></Card>
            <Card className="border-border/40 bg-primary/5"><CardContent className="p-4"><p className="text-sm text-muted-foreground mb-1">Total Paid (All Time)</p><p className="text-2xl font-bold">${totalPaidAllTime.toLocaleString()}</p></CardContent></Card>
            <Card className="border-border/40"><CardContent className="p-4"><p className="text-sm text-muted-foreground mb-1">Avg Payout Size</p><p className="text-2xl font-bold">${avgPayoutSize.toLocaleString(undefined, {maximumFractionDigits: 0})}</p></CardContent></Card>
            <Card className="border-border/40 bg-destructive/5"><CardContent className="p-4"><p className="text-sm text-muted-foreground mb-1">Failed Payouts</p><p className="text-2xl font-bold">{failedPayouts}</p></CardContent></Card>
          </div>

          {/* Payout Filters & Actions */}
          <div className="flex items-center justify-between flex-wrap gap-3">
            <div className="flex items-center gap-3 flex-wrap">
              <Select value={payoutTypeFilter} onValueChange={setPayoutTypeFilter}>
                <SelectTrigger className="w-36 h-9"><SelectValue placeholder="Type" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="creator">Creator</SelectItem>
                  <SelectItem value="affiliate">Affiliate</SelectItem>
                </SelectContent>
              </Select>
              <Select value={payoutStatusFilter} onValueChange={setPayoutStatusFilter}>
                <SelectTrigger className="w-36 h-9"><SelectValue placeholder="Status" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="paid">Paid</SelectItem>
                  <SelectItem value="failed">Failed</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center gap-2">
              <Button size="sm" className="gap-2" onClick={() => toast.success("All pending payouts approved")}><CheckCircle className="h-4 w-4" /> Approve All Pending</Button>
              <Button size="sm" variant="outline" className="gap-2" onClick={exportPayoutsCSV}><Download className="h-4 w-4" /> Export CSV</Button>
            </div>
          </div>

          <Card className="border-border/40">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border/40 text-left text-sm text-muted-foreground">
                    <th className="p-4 font-medium">Name</th>
                    <th className="p-4 font-medium">Type</th>
                    <th className="p-4 font-medium">Amount</th>
                    <th className="p-4 font-medium">Period</th>
                    <th className="p-4 font-medium">Status</th>
                    <th className="p-4 font-medium text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredPayouts.map((p) => (
                    <tr key={p.id} className="border-b border-border/20 hover:bg-muted/30 transition-colors">
                      <td className="p-4 font-medium">{p.name}</td>
                      <td className="p-4"><Badge variant="outline" className="text-xs">{p.type}</Badge></td>
                      <td className="p-4 text-sm font-bold text-primary">${p.amount.toLocaleString()}</td>
                      <td className="p-4 text-sm text-muted-foreground">{p.period}</td>
                      <td className="p-4"><Badge variant={p.status === "Paid" ? "default" : p.status === "Failed" ? "destructive" : "secondary"} className="text-xs">{p.status}</Badge></td>
                      <td className="p-4 text-right">
                        {p.status === "Pending" && <Button size="sm" className="h-7" onClick={() => toast.success(`Payout of $${p.amount} to ${p.name} approved`)}>Approve</Button>}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </TabsContent>

        {/* ========== SEGMENTS TAB ========== */}
        <TabsContent value="segments" className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">User Segments</h3>
            <Button size="sm" onClick={() => toast("Segment creation form would open here")}>Create Segment</Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {segments.map((segment) => (
              <Card key={segment.id} className="border-border/40">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-semibold">{segment.name}</span>
                    <Badge className={`text-xs border-0 ${segment.color}`}>{segment.count.toLocaleString()} users</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">{segment.description}</p>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" className="gap-1" onClick={() => toast(`Sending email to ${segment.count.toLocaleString()} users in ${segment.name}`)}><Mail className="h-3 w-3" /> Email All</Button>
                    <Button size="sm" variant="outline" className="gap-1" onClick={() => toast(`Editing segment: ${segment.name}`)}><Tag className="h-3 w-3" /> Edit</Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* ========== CAMPAIGNS TAB ========== */}
        <TabsContent value="campaigns" className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Marketing Campaigns</h3>
            <Button size="sm" onClick={() => toast("Campaign builder would open here")}>New Campaign</Button>
          </div>
          <Card className="border-border/40">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border/40 text-left text-sm text-muted-foreground">
                    <th className="p-4 font-medium">Campaign</th>
                    <th className="p-4 font-medium">Type</th>
                    <th className="p-4 font-medium">Status</th>
                    <th className="p-4 font-medium">Sent</th>
                    <th className="p-4 font-medium">Opened</th>
                    <th className="p-4 font-medium">Clicked</th>
                    <th className="p-4 font-medium text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {campaigns.map((campaign) => (
                    <tr key={campaign.id} className="border-b border-border/20 hover:bg-muted/30 transition-colors">
                      <td className="p-4 font-medium">{campaign.name}</td>
                      <td className="p-4"><Badge variant="outline" className="text-xs">{campaign.type}</Badge></td>
                      <td className="p-4"><Badge variant={campaign.status === "Active" ? "default" : campaign.status === "Scheduled" ? "secondary" : "outline"} className="text-xs">{campaign.status}</Badge></td>
                      <td className="p-4 text-sm">{campaign.sent.toLocaleString()}</td>
                      <td className="p-4 text-sm">{campaign.opened.toLocaleString()}</td>
                      <td className="p-4 text-sm">{campaign.clicked.toLocaleString()}</td>
                      <td className="p-4 text-right"><Button variant="ghost" size="sm" onClick={() => toast(`Managing campaign: ${campaign.name}`)}>Manage</Button></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </TabsContent>

        {/* ========== AUTOMATIONS TAB ========== */}
        <TabsContent value="automations" className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Automated Journeys</h3>
            <Button size="sm" onClick={() => toast("Automation builder would open here")}>New Automation</Button>
          </div>
          <Card className="border-border/40">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border/40 text-left text-sm text-muted-foreground">
                    <th className="p-4 font-medium">Journey</th>
                    <th className="p-4 font-medium">Trigger</th>
                    <th className="p-4 font-medium">Channel</th>
                    <th className="p-4 font-medium">Status</th>
                    <th className="p-4 font-medium">Sent</th>
                    <th className="p-4 font-medium">Conversion</th>
                    <th className="p-4 font-medium text-right">Active</th>
                  </tr>
                </thead>
                <tbody>
                  {automations.map((a) => (
                    <tr key={a.id} className="border-b border-border/20 hover:bg-muted/30 transition-colors">
                      <td className="p-4 font-medium">{a.name}</td>
                      <td className="p-4 text-sm text-muted-foreground">{a.trigger}</td>
                      <td className="p-4 text-sm">{a.channel}</td>
                      <td className="p-4"><Badge variant={a.status === "Active" ? "default" : "secondary"} className="text-xs">{a.status}</Badge></td>
                      <td className="p-4 text-sm">{a.sent.toLocaleString()}</td>
                      <td className="p-4 text-sm font-medium">{a.conversion}%</td>
                      <td className="p-4 text-right"><Switch defaultChecked={a.status === "Active"} /></td>
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
