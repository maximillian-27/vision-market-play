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
  Search, MoreHorizontal, Eye, Users, UserPlus, UserX, Star, DollarSign,
  Percent, Shield, Download, CheckCircle, XCircle, Tag, Send, Zap,
  ChevronLeft, ChevronRight, Megaphone,
} from "lucide-react";
import { toast } from "sonner";

const creatorsAffiliates = [
  { id: 1, name: "CryptoGuru", email: "guru@crypto.com", type: "Creator", status: "Active", markets: 12, volumeGenerated: 890000, earnings: 5340, followers: 12400, lastOnline: "2h ago", referrals: 0, tier: "Gold" },
  { id: 2, name: "TechOracle", email: "tech@oracle.io", type: "Creator", status: "Active", markets: 8, volumeGenerated: 456000, earnings: 2736, followers: 8900, lastOnline: "1d ago", referrals: 0, tier: "Silver" },
  { id: 3, name: "SportsAnalyst", email: "sports@analyst.com", type: "Creator", status: "Active", markets: 15, volumeGenerated: 1200000, earnings: 7200, followers: 23000, lastOnline: "5h ago", referrals: 0, tier: "Platinum" },
  { id: 4, name: "MarketMaven", email: "maven@market.com", type: "Creator", status: "Pending", markets: 0, volumeGenerated: 0, earnings: 0, followers: 3400, lastOnline: "3d ago", referrals: 0, tier: "Bronze" },
  { id: 5, name: "ReferKing", email: "refer@king.com", type: "Affiliate", status: "Active", markets: 0, volumeGenerated: 234000, earnings: 1404, followers: 0, lastOnline: "12h ago", referrals: 145, tier: "Silver" },
  { id: 6, name: "PromoQueen", email: "promo@queen.io", type: "Affiliate", status: "Active", markets: 0, volumeGenerated: 567000, earnings: 3402, followers: 0, lastOnline: "1h ago", referrals: 312, tier: "Gold" },
];

const creatorApplications = [
  { id: 1, name: "NewTrader42", email: "trader42@mail.com", bio: "Experienced crypto trader with 5+ years", dateApplied: "2025-01-14" },
  { id: 2, name: "SportsPro", email: "sportspro@mail.com", bio: "Sports analytics professional", dateApplied: "2025-01-15" },
];

const payouts = [
  { id: 1, name: "CryptoGuru", type: "Creator", amount: 2450, period: "Jan 13–19", status: "Pending" },
  { id: 2, name: "SportsAnalyst", type: "Creator", amount: 3200, period: "Jan 13–19", status: "Pending" },
  { id: 3, name: "PromoQueen", type: "Affiliate", amount: 1800, period: "Jan 13–19", status: "Pending" },
  { id: 4, name: "TechOracle", type: "Creator", amount: 1560, period: "Jan 6–12", status: "Paid" },
  { id: 5, name: "ReferKing", type: "Affiliate", amount: 890, period: "Jan 6–12", status: "Paid" },
  { id: 6, name: "CryptoGuru", type: "Creator", amount: 2100, period: "Dec 30–Jan 5", status: "Paid" },
  { id: 7, name: "SportsAnalyst", type: "Creator", amount: 2800, period: "Dec 30–Jan 5", status: "Failed" },
];

const segments = [
  { id: 1, name: "Top Creators", count: 15, description: "Volume > $500K", color: "bg-success/10 text-success" },
  { id: 2, name: "New Creators", count: 12, description: "Joined last 30 days", color: "bg-primary/10 text-primary" },
  { id: 3, name: "Inactive Affiliates", count: 8, description: "No referral 60+ days", color: "bg-destructive/10 text-destructive" },
  { id: 4, name: "High Earners", count: 22, description: "Earnings > $5K/month", color: "bg-warning/10 text-warning" },
];

const campaigns = [
  { id: 1, name: "Creator Onboarding", type: "Email", status: "Active", sent: 156, opened: 120, clicked: 45 },
  { id: 2, name: "Affiliate Boost", type: "Push", status: "Active", sent: 89, opened: 65, clicked: 28 },
  { id: 3, name: "Tier Upgrade Nudge", type: "Email", status: "Scheduled", sent: 0, opened: 0, clicked: 0 },
];

const automations = [
  { id: 1, name: "Welcome Series", trigger: "New creator approved", channel: "Email + Push", status: "Active", sent: 156, conversion: 78.2 },
  { id: 2, name: "Tier Upgrade", trigger: "Volume threshold reached", channel: "Email + In-App", status: "Active", sent: 34, conversion: 100 },
  { id: 3, name: "Payout Notification", trigger: "Payout processed", channel: "Email", status: "Active", sent: 890, conversion: 95.0 },
  { id: 4, name: "Inactivity Alert", trigger: "No market created 30d", channel: "Email", status: "Active", sent: 45, conversion: 22.0 },
];

const commissionTiers = [
  { tier: "Bronze", threshold: "$0+", rate: "20%", effective: "0.6%" },
  { tier: "Silver", threshold: "$50K+", rate: "22%", effective: "0.66%" },
  { tier: "Gold", threshold: "$250K+", rate: "25%", effective: "0.75%" },
  { tier: "Platinum", threshold: "$1M+", rate: "28%", effective: "0.84%" },
  { tier: "Diamond", threshold: "$5M+", rate: "30%", effective: "0.90%" },
];

const tierColors: Record<string, string> = {
  Bronze: "bg-orange-500/10 text-orange-500",
  Silver: "bg-muted text-muted-foreground",
  Gold: "bg-warning/10 text-warning",
  Platinum: "bg-primary/10 text-primary",
  Diamond: "bg-success/10 text-success",
};

const PAGE_SIZE = 5;

export const AdminCreatorsAffiliates = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [payoutTypeFilter, setPayoutTypeFilter] = useState("all");
  const [payoutStatusFilter, setPayoutStatusFilter] = useState("all");
  const [page, setPage] = useState(1);

  const creators = creatorsAffiliates.filter(c => c.type === "Creator");
  const affiliates = creatorsAffiliates.filter(c => c.type === "Affiliate");
  const totalCreatorVolume = creators.reduce((a, c) => a + c.volumeGenerated, 0);
  const totalAffiliateVolume = affiliates.reduce((a, c) => a + c.volumeGenerated, 0);
  const avgRevenuePerCreator = creators.length > 0 ? (totalCreatorVolume * 0.03) / creators.length : 0;
  const avgRevenuePerAffiliate = affiliates.length > 0 ? (totalAffiliateVolume * 0.03) / affiliates.length : 0;

  const filteredCA = creatorsAffiliates.filter(c => {
    const matchesSearch = c.name.toLowerCase().includes(searchQuery.toLowerCase()) || c.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = typeFilter === "all" || c.type.toLowerCase() === typeFilter;
    const matchesStatus = statusFilter === "all" || c.status.toLowerCase() === statusFilter;
    return matchesSearch && matchesType && matchesStatus;
  });

  const filteredPayouts = payouts.filter(p => {
    const matchesType = payoutTypeFilter === "all" || p.type.toLowerCase() === payoutTypeFilter;
    const matchesStatus = payoutStatusFilter === "all" || p.status.toLowerCase() === payoutStatusFilter;
    return matchesType && matchesStatus;
  });

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
      {/* Metrics Row */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
        <Card className="border-border/40"><CardContent className="p-4"><div className="flex items-center gap-2 text-muted-foreground text-sm mb-1"><Star className="h-4 w-4" /> Total Creators</div><p className="text-2xl font-bold">{creators.length}</p></CardContent></Card>
        <Card className="border-border/40"><CardContent className="p-4"><div className="flex items-center gap-2 text-muted-foreground text-sm mb-1"><UserPlus className="h-4 w-4" /> Total Affiliates</div><p className="text-2xl font-bold">{affiliates.length}</p></CardContent></Card>
        <Card className="border-border/40 bg-success/5"><CardContent className="p-4"><p className="text-sm text-muted-foreground mb-1">Avg Rev/Creator</p><p className="text-2xl font-bold">${avgRevenuePerCreator.toLocaleString(undefined, {maximumFractionDigits: 0})}</p></CardContent></Card>
        <Card className="border-border/40 bg-primary/5"><CardContent className="p-4"><p className="text-sm text-muted-foreground mb-1">Avg Rev/Affiliate</p><p className="text-2xl font-bold">${avgRevenuePerAffiliate.toLocaleString(undefined, {maximumFractionDigits: 0})}</p></CardContent></Card>
        <Card className="border-border/40 bg-warning/5"><CardContent className="p-4"><p className="text-sm text-muted-foreground mb-1">Pending Applications</p><p className="text-2xl font-bold">{creatorsAffiliates.filter(c => c.status === "Pending").length + creatorApplications.length}</p></CardContent></Card>
      </div>

      <Tabs defaultValue="list" className="space-y-4">
        <TabsList className="bg-muted/50 p-1 flex-wrap h-auto gap-1">
          <TabsTrigger value="list" className="data-[state=active]:bg-background gap-2"><Users className="h-4 w-4" /> List</TabsTrigger>
          <TabsTrigger value="payouts" className="data-[state=active]:bg-background gap-2"><DollarSign className="h-4 w-4" /> Payouts</TabsTrigger>
          <TabsTrigger value="segments" className="data-[state=active]:bg-background gap-2"><Tag className="h-4 w-4" /> Segments</TabsTrigger>
          <TabsTrigger value="campaigns" className="data-[state=active]:bg-background gap-2"><Megaphone className="h-4 w-4" /> Campaigns</TabsTrigger>
          <TabsTrigger value="automations" className="data-[state=active]:bg-background gap-2"><Zap className="h-4 w-4" /> Automations</TabsTrigger>
        </TabsList>

        {/* List Tab */}
        <TabsContent value="list" className="space-y-4">
          <div className="flex items-center gap-3 flex-wrap">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search creators, affiliates..." value={searchQuery} onChange={(e) => { setSearchQuery(e.target.value); setPage(1); }} className="pl-9 h-9" />
            </div>
            <Select value={typeFilter} onValueChange={(v) => { setTypeFilter(v); setPage(1); }}>
              <SelectTrigger className="w-40 h-9"><SelectValue placeholder="Type" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="creator">Creators Only</SelectItem>
                <SelectItem value="affiliate">Affiliates Only</SelectItem>
              </SelectContent>
            </Select>
            <Select value={statusFilter} onValueChange={(v) => { setStatusFilter(v); setPage(1); }}>
              <SelectTrigger className="w-36 h-9"><SelectValue placeholder="Status" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
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
                    <th className="p-4 font-medium">Markets</th>
                    <th className="p-4 font-medium">Volume</th>
                    <th className="p-4 font-medium">Earnings</th>
                    <th className="p-4 font-medium">Status</th>
                    <th className="p-4 font-medium text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredCA.map((c) => (
                    <tr key={c.id} className="border-b border-border/20 hover:bg-muted/30 transition-colors">
                      <td className="p-4 font-medium">{c.name}</td>
                      <td className="p-4"><Badge className={`text-xs border-0 ${c.type === "Creator" ? "bg-primary/10 text-primary" : "bg-accent text-accent-foreground"}`}>{c.type}</Badge></td>
                      <td className="p-4"><Badge className={`text-xs border-0 ${tierColors[c.tier] || 'bg-muted text-muted-foreground'}`}>{c.tier}</Badge></td>
                      <td className="p-4 text-sm">{c.markets || "—"}</td>
                      <td className="p-4 text-sm font-medium">${c.volumeGenerated.toLocaleString()}</td>
                      <td className="p-4 text-sm font-medium text-success">${c.earnings.toLocaleString()}</td>
                      <td className="p-4"><Badge variant={c.status === "Active" ? "default" : "secondary"} className="text-xs">{c.status}</Badge></td>
                      <td className="p-4 text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild><Button variant="ghost" size="icon" className="h-8 w-8"><MoreHorizontal className="h-4 w-4" /></Button></DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="bg-popover">
                            <DropdownMenuItem className="gap-2" onClick={() => toast(`Opening profile: ${c.name}`)}><Eye className="h-4 w-4" /> View Profile</DropdownMenuItem>
                            <DropdownMenuItem className="gap-2" onClick={() => toast(`Editing commission for ${c.name}`)}><Percent className="h-4 w-4" /> Edit Commission</DropdownMenuItem>
                            <DropdownMenuItem className="gap-2" onClick={() => toast(`Opening earnings history for ${c.name}`)}><DollarSign className="h-4 w-4" /> Earnings History</DropdownMenuItem>
                            <DropdownMenuItem className="gap-2 text-destructive" onClick={() => toast.success(`${c.name} has been suspended`)}><UserX className="h-4 w-4" /> Suspend</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>

          {/* Commission Tiers */}
          <Card className="border-border/40 bg-muted/30">
            <CardContent className="p-4">
              <h4 className="font-semibold text-sm mb-3 flex items-center gap-2"><Percent className="h-4 w-4" /> Commission Structure (Revenue Share of 3% Platform Fee)</h4>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border/40 text-left text-sm text-muted-foreground">
                      <th className="p-3 font-medium">Tier</th>
                      <th className="p-3 font-medium">Volume Threshold</th>
                      <th className="p-3 font-medium">Commission Rate</th>
                      <th className="p-3 font-medium">Effective Rate</th>
                    </tr>
                  </thead>
                  <tbody>
                    {commissionTiers.map((t) => (
                      <tr key={t.tier} className="border-b border-border/20">
                        <td className="p-3"><Badge className={`text-xs border-0 ${tierColors[t.tier]}`}>{t.tier}</Badge></td>
                        <td className="p-3 text-sm">{t.threshold}</td>
                        <td className="p-3 text-sm font-medium">{t.rate} of 3%</td>
                        <td className="p-3 text-sm font-bold text-primary">{t.effective}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          {/* Pending Applications */}
          {creatorApplications.length > 0 && (
            <Card className="border-border/40 bg-warning/5">
              <CardContent className="p-4">
                <h4 className="font-semibold text-sm mb-3 flex items-center gap-2"><UserPlus className="h-4 w-4 text-warning" /> Pending Applications ({creatorApplications.length})</h4>
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
                        <tr key={app.id} className="border-b border-border/20">
                          <td className="p-3 font-medium">{app.name}</td>
                          <td className="p-3 text-sm text-muted-foreground">{app.email}</td>
                          <td className="p-3 text-sm max-w-xs truncate">{app.bio}</td>
                          <td className="p-3 text-sm">{app.dateApplied}</td>
                          <td className="p-3 text-right">
                            <div className="flex items-center justify-end gap-2">
                              <Button size="sm" className="gap-1 h-7" onClick={() => toast.success(`${app.name} approved`)}><CheckCircle className="h-3 w-3" /> Approve</Button>
                              <Button size="sm" variant="outline" className="gap-1 h-7 text-destructive" onClick={() => toast.success(`${app.name} rejected`)}><XCircle className="h-3 w-3" /> Reject</Button>
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

        {/* Payouts Tab */}
        <TabsContent value="payouts" className="space-y-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <Card className="border-border/40 bg-warning/5"><CardContent className="p-4"><p className="text-sm text-muted-foreground mb-1">Pending Payouts</p><p className="text-2xl font-bold">${payouts.filter(p => p.status === "Pending").reduce((a, p) => a + p.amount, 0).toLocaleString()}</p></CardContent></Card>
            <Card className="border-border/40 bg-success/5"><CardContent className="p-4"><p className="text-sm text-muted-foreground mb-1">Paid This Week</p><p className="text-2xl font-bold">${payouts.filter(p => p.status === "Paid").reduce((a, p) => a + p.amount, 0).toLocaleString()}</p></CardContent></Card>
            <Card className="border-border/40"><CardContent className="p-4"><p className="text-sm text-muted-foreground mb-1">Payout Frequency</p><p className="text-2xl font-bold">Weekly</p></CardContent></Card>
            <Card className="border-border/40 bg-destructive/5"><CardContent className="p-4"><p className="text-sm text-muted-foreground mb-1">Failed Payouts</p><p className="text-2xl font-bold">{payouts.filter(p => p.status === "Failed").length}</p></CardContent></Card>
          </div>

          <div className="flex items-center justify-between flex-wrap gap-3">
            <div className="flex items-center gap-3">
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
              <Button size="sm" className="gap-2" onClick={() => toast.success("All pending payouts approved")}><CheckCircle className="h-4 w-4" /> Approve All</Button>
              <Button size="sm" variant="outline" className="gap-2" onClick={exportPayoutsCSV}><Download className="h-4 w-4" /> Export</Button>
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

        {/* Segments Tab */}
        <TabsContent value="segments" className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Creator & Affiliate Segments</h3>
            <Button size="sm" onClick={() => toast("Segment creation form would open here")}>Create Segment</Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {segments.map((segment) => (
              <Card key={segment.id} className="border-border/40">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-semibold">{segment.name}</span>
                    <Badge className={`text-xs border-0 ${segment.color}`}>{segment.count}</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">{segment.description}</p>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" className="gap-1" onClick={() => toast(`Emailing ${segment.name}`)}><Send className="h-3 w-3" /> Email</Button>
                    <Button size="sm" variant="outline" className="gap-1" onClick={() => toast(`Viewing ${segment.name}`)}><Eye className="h-3 w-3" /> View</Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Campaigns Tab */}
        <TabsContent value="campaigns" className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Targeted Outreach</h3>
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
                    <th className="p-4 font-medium">Open Rate</th>
                    <th className="p-4 font-medium">Click Rate</th>
                    <th className="p-4 font-medium text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {campaigns.map((c) => (
                    <tr key={c.id} className="border-b border-border/20 hover:bg-muted/30 transition-colors">
                      <td className="p-4 font-medium">{c.name}</td>
                      <td className="p-4"><Badge variant="outline" className="text-xs">{c.type}</Badge></td>
                      <td className="p-4"><Badge variant={c.status === "Active" ? "default" : "secondary"} className="text-xs">{c.status}</Badge></td>
                      <td className="p-4 text-sm">{c.sent}</td>
                      <td className="p-4 text-sm font-medium">{c.sent > 0 ? `${((c.opened / c.sent) * 100).toFixed(1)}%` : "—"}</td>
                      <td className="p-4 text-sm font-medium">{c.sent > 0 ? `${((c.clicked / c.sent) * 100).toFixed(1)}%` : "—"}</td>
                      <td className="p-4 text-right"><Button variant="ghost" size="sm" onClick={() => toast(`Managing: ${c.name}`)}>Manage</Button></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </TabsContent>

        {/* Automations Tab */}
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
