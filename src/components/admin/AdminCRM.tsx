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
  Shield, UserPlus, Star, Percent,
} from "lucide-react";
import { toast } from "sonner";

// ---- Users Data ----
const users = [
  { id: 1, name: "John Doe", email: "john@example.com", dateJoined: "2024-03-15", status: "Active", volume: 45200, trades: 234, verified: true },
  { id: 2, name: "Jane Smith", email: "jane@example.com", dateJoined: "2024-06-22", status: "Active", volume: 128000, trades: 890, verified: true },
  { id: 3, name: "Bob Wilson", email: "bob@example.com", dateJoined: "2024-09-01", status: "Suspended", volume: 5600, trades: 45, verified: false },
  { id: 4, name: "Alice Johnson", email: "alice@example.com", dateJoined: "2024-01-10", status: "Active", volume: 312000, trades: 2100, verified: true },
  { id: 5, name: "Charlie Brown", email: "charlie@example.com", dateJoined: "2024-11-05", status: "Active", volume: 8900, trades: 67, verified: false },
  { id: 6, name: "Diana Prince", email: "diana@example.com", dateJoined: "2024-04-18", status: "Active", volume: 67000, trades: 456, verified: true },
];

// ---- Creators & Affiliates Data ----
const creatorsAffiliates = [
  { id: 1, name: "CryptoGuru", email: "guru@crypto.com", type: "Creator", status: "Active", markets: 12, volumeGenerated: 890000, earnings: 5340, followers: 12400, lastOnline: "2h ago" },
  { id: 2, name: "TechOracle", email: "tech@oracle.io", type: "Creator", status: "Active", markets: 8, volumeGenerated: 456000, earnings: 2736, followers: 8900, lastOnline: "1d ago" },
  { id: 3, name: "SportsAnalyst", email: "sports@analyst.com", type: "Creator", status: "Active", markets: 15, volumeGenerated: 1200000, earnings: 7200, followers: 23000, lastOnline: "5h ago" },
  { id: 4, name: "MarketMaven", email: "maven@market.com", type: "Creator", status: "Pending", markets: 0, volumeGenerated: 0, earnings: 0, followers: 3400, lastOnline: "3d ago" },
  { id: 5, name: "ReferKing", email: "refer@king.com", type: "Affiliate", status: "Active", markets: 0, volumeGenerated: 234000, earnings: 1404, followers: 0, lastOnline: "12h ago" },
  { id: 6, name: "PromoQueen", email: "promo@queen.io", type: "Affiliate", status: "Active", markets: 0, volumeGenerated: 567000, earnings: 3402, followers: 0, lastOnline: "1h ago" },
];

// ---- Payouts Data ----
const payouts = [
  { id: 1, name: "CryptoGuru", type: "Creator", amount: 2450, period: "Jan 13–19", status: "Pending" },
  { id: 2, name: "SportsAnalyst", type: "Creator", amount: 3200, period: "Jan 13–19", status: "Pending" },
  { id: 3, name: "PromoQueen", type: "Affiliate", amount: 1800, period: "Jan 13–19", status: "Pending" },
  { id: 4, name: "TechOracle", type: "Creator", amount: 1560, period: "Jan 6–12", status: "Paid" },
  { id: 5, name: "ReferKing", type: "Affiliate", amount: 890, period: "Jan 6–12", status: "Paid" },
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

const PAGE_SIZE = 5;

export const AdminCRM = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [userPage, setUserPage] = useState(1);
  const [caPage, setCaPage] = useState(1);

  const filteredUsers = users.filter(u =>
    u.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    u.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredCA = creatorsAffiliates.filter(c =>
    c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
          <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
            <Card className="border-border/40"><CardContent className="p-4"><div className="flex items-center gap-2 text-muted-foreground text-sm mb-1"><Users className="h-4 w-4" /> Total Users</div><p className="text-2xl font-bold">124,500</p></CardContent></Card>
            <Card className="border-border/40 bg-success/5"><CardContent className="p-4"><div className="flex items-center gap-2 text-success text-sm mb-1"><UserCheck className="h-4 w-4" /> Active (30d)</div><p className="text-2xl font-bold">89,200</p></CardContent></Card>
            <Card className="border-border/40 bg-destructive/5"><CardContent className="p-4"><div className="flex items-center gap-2 text-destructive text-sm mb-1"><UserX className="h-4 w-4" /> Churned (30d)</div><p className="text-2xl font-bold">1,234</p></CardContent></Card>
            <Card className="border-border/40"><CardContent className="p-4"><p className="text-sm text-muted-foreground mb-1">High Value ({'>'}$10K)</p><p className="text-2xl font-bold">2,340</p></CardContent></Card>
            <Card className="border-border/40 bg-warning/5"><CardContent className="p-4"><p className="text-sm text-muted-foreground mb-1">Whales ({'>'}$100K)</p><p className="text-2xl font-bold">89</p></CardContent></Card>
            <Card className="border-border/40"><CardContent className="p-4"><p className="text-sm text-muted-foreground mb-1">High Risk</p><p className="text-2xl font-bold">34</p></CardContent></Card>
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
          <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
            <Card className="border-border/40"><CardContent className="p-4"><div className="flex items-center gap-2 text-muted-foreground text-sm mb-1"><Star className="h-4 w-4" /> Total Creators</div><p className="text-2xl font-bold">{creatorsAffiliates.filter(c => c.type === "Creator").length}</p></CardContent></Card>
            <Card className="border-border/40"><CardContent className="p-4"><div className="flex items-center gap-2 text-muted-foreground text-sm mb-1"><UserPlus className="h-4 w-4" /> Total Affiliates</div><p className="text-2xl font-bold">{creatorsAffiliates.filter(c => c.type === "Affiliate").length}</p></CardContent></Card>
            <Card className="border-border/40 bg-success/5"><CardContent className="p-4"><div className="flex items-center gap-2 text-success text-sm mb-1"><UserCheck className="h-4 w-4" /> Active</div><p className="text-2xl font-bold">{creatorsAffiliates.filter(c => c.status === "Active").length}</p></CardContent></Card>
            <Card className="border-border/40 bg-warning/5"><CardContent className="p-4"><p className="text-sm text-muted-foreground mb-1">Pending Applications</p><p className="text-2xl font-bold">{creatorsAffiliates.filter(c => c.status === "Pending").length}</p></CardContent></Card>
            <Card className="border-border/40"><CardContent className="p-4"><p className="text-sm text-muted-foreground mb-1">Total Earnings Paid</p><p className="text-2xl font-bold">${creatorsAffiliates.reduce((a, c) => a + c.earnings, 0).toLocaleString()}</p></CardContent></Card>
            <Card className="border-border/40 bg-primary/5"><CardContent className="p-4"><p className="text-sm text-muted-foreground mb-1">Revenue Generated</p><p className="text-2xl font-bold">${(creatorsAffiliates.reduce((a, c) => a + c.volumeGenerated, 0) * 0.03 / 1000).toFixed(0)}K</p></CardContent></Card>
          </div>

          <Card className="border-border/40">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border/40 text-left text-sm text-muted-foreground">
                    <th className="p-4 font-medium">Name</th>
                    <th className="p-4 font-medium">Contact</th>
                    <th className="p-4 font-medium">Type</th>
                    <th className="p-4 font-medium">Status</th>
                    <th className="p-4 font-medium">Markets</th>
                    <th className="p-4 font-medium">Vol. Generated</th>
                    <th className="p-4 font-medium">Earnings</th>
                    <th className="p-4 font-medium">Followers</th>
                    <th className="p-4 font-medium">Last Online</th>
                    <th className="p-4 font-medium text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredCA.map((c) => (
                    <tr key={c.id} className="border-b border-border/20 hover:bg-muted/30 transition-colors">
                      <td className="p-4 font-medium">{c.name}</td>
                      <td className="p-4 text-sm text-muted-foreground">{c.email}</td>
                      <td className="p-4">
                        <div className="flex gap-1">
                          {c.type === "Creator" && <Badge className="text-xs bg-primary/10 text-primary border-0">Creator</Badge>}
                          {c.type === "Creator" && <Badge className="text-xs bg-accent text-accent-foreground border-0">Affiliate</Badge>}
                          {c.type === "Affiliate" && <Badge className="text-xs bg-accent text-accent-foreground border-0">Affiliate</Badge>}
                        </div>
                      </td>
                      <td className="p-4"><Badge variant={c.status === "Active" ? "default" : c.status === "Pending" ? "secondary" : "destructive"} className="text-xs">{c.status}</Badge></td>
                      <td className="p-4 text-sm">{c.markets || "—"}</td>
                      <td className="p-4 text-sm font-medium">${c.volumeGenerated.toLocaleString()}</td>
                      <td className="p-4 text-sm font-medium text-success">${c.earnings.toLocaleString()}</td>
                      <td className="p-4 text-sm">{c.followers.toLocaleString() || "—"}</td>
                      <td className="p-4 text-sm text-muted-foreground">{c.lastOnline}</td>
                      <td className="p-4 text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild><Button variant="ghost" size="icon" className="h-8 w-8"><MoreHorizontal className="h-4 w-4" /></Button></DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="bg-popover">
                            <DropdownMenuItem className="gap-2" onClick={() => toast(`Opening profile: ${c.name}`)}><Eye className="h-4 w-4" /> View Profile</DropdownMenuItem>
                            {c.type === "Creator" && <DropdownMenuItem className="gap-2" onClick={() => toast(`Viewing markets by ${c.name}`)}><Star className="h-4 w-4" /> View Markets</DropdownMenuItem>}
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

          {/* Commission Tiers Info */}
          <Card className="border-border/40 bg-muted/30">
            <CardContent className="p-4">
              <h4 className="font-semibold text-sm mb-3 flex items-center gap-2"><Percent className="h-4 w-4" /> Commission Structure</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div className="flex items-center justify-between p-3 rounded-lg bg-background">
                  <div>
                    <p className="font-medium">Creator Market Fee</p>
                    <p className="text-xs text-muted-foreground">20% of 3% trading fee on their markets</p>
                  </div>
                  <span className="text-lg font-bold text-primary">0.6%</span>
                </div>
                <div className="flex items-center justify-between p-3 rounded-lg bg-background">
                  <div>
                    <p className="font-medium">Affiliate Referral Fee</p>
                    <p className="text-xs text-muted-foreground">20% of 3% trading fee from referred users</p>
                  </div>
                  <span className="text-lg font-bold text-primary">0.6%</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* ========== PAYOUTS TAB ========== */}
        <TabsContent value="payouts" className="space-y-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <Card className="border-border/40 bg-warning/5"><CardContent className="p-4"><p className="text-sm text-muted-foreground mb-1">Pending Payouts</p><p className="text-2xl font-bold">${payouts.filter(p => p.status === "Pending").reduce((a, p) => a + p.amount, 0).toLocaleString()}</p></CardContent></Card>
            <Card className="border-border/40 bg-success/5"><CardContent className="p-4"><p className="text-sm text-muted-foreground mb-1">Paid This Week</p><p className="text-2xl font-bold">${payouts.filter(p => p.status === "Paid").reduce((a, p) => a + p.amount, 0).toLocaleString()}</p></CardContent></Card>
            <Card className="border-border/40"><CardContent className="p-4"><p className="text-sm text-muted-foreground mb-1">Payout Frequency</p><p className="text-2xl font-bold">Weekly</p></CardContent></Card>
            <Card className="border-border/40"><CardContent className="p-4"><p className="text-sm text-muted-foreground mb-1">Min Threshold</p><p className="text-2xl font-bold">$50</p></CardContent></Card>
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
                  {payouts.map((p) => (
                    <tr key={p.id} className="border-b border-border/20 hover:bg-muted/30 transition-colors">
                      <td className="p-4 font-medium">{p.name}</td>
                      <td className="p-4"><Badge variant="outline" className="text-xs">{p.type}</Badge></td>
                      <td className="p-4 text-sm font-bold text-primary">${p.amount.toLocaleString()}</td>
                      <td className="p-4 text-sm text-muted-foreground">{p.period}</td>
                      <td className="p-4"><Badge variant={p.status === "Paid" ? "default" : "secondary"} className="text-xs">{p.status}</Badge></td>
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
