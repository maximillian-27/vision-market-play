import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Search, MoreHorizontal, Eye, Users, UserCheck, UserX, Mail, Tag,
  Shield, Download, ChevronLeft, ChevronRight, Send, Megaphone,
} from "lucide-react";
import { toast } from "sonner";

const users = [
  { id: 1, name: "John Doe", email: "john@example.com", dateJoined: "2024-03-15", status: "Active", volume: 45200, trades: 234, verified: true, deposits: 12000, pnl: 3200 },
  { id: 2, name: "Jane Smith", email: "jane@example.com", dateJoined: "2024-06-22", status: "Active", volume: 128000, trades: 890, verified: true, deposits: 45000, pnl: 18200 },
  { id: 3, name: "Bob Wilson", email: "bob@example.com", dateJoined: "2024-09-01", status: "Suspended", volume: 5600, trades: 45, verified: false, deposits: 2000, pnl: -800 },
  { id: 4, name: "Alice Johnson", email: "alice@example.com", dateJoined: "2024-01-10", status: "Active", volume: 312000, trades: 2100, verified: true, deposits: 95000, pnl: 42000 },
  { id: 5, name: "Charlie Brown", email: "charlie@example.com", dateJoined: "2024-11-05", status: "Active", volume: 8900, trades: 67, verified: false, deposits: 3500, pnl: -200 },
  { id: 6, name: "Diana Prince", email: "diana@example.com", dateJoined: "2024-04-18", status: "Active", volume: 67000, trades: 456, verified: true, deposits: 22000, pnl: 8900 },
];

const segments = [
  { id: 1, name: "Whales", count: 89, description: "Volume > $100K", color: "bg-warning/10 text-warning" },
  { id: 2, name: "High Value", count: 2340, description: "Volume > $10K", color: "bg-success/10 text-success" },
  { id: 3, name: "New Users", count: 1890, description: "Joined last 7 days", color: "bg-primary/10 text-primary" },
  { id: 4, name: "Dormant", count: 456, description: "No activity 30+ days", color: "bg-destructive/10 text-destructive" },
  { id: 5, name: "VIP", count: 340, description: "Platinum loyalty tier", color: "bg-purple-500/10 text-purple-500" },
  { id: 6, name: "Unverified", count: 1200, description: "KYC not completed", color: "bg-muted text-muted-foreground" },
];

const campaigns = [
  { id: 1, name: "Welcome Series", type: "Email", status: "Active", sent: 4560, opened: 2340, clicked: 890 },
  { id: 2, name: "Re-engagement", type: "Push", status: "Active", sent: 1200, opened: 450, clicked: 120 },
  { id: 3, name: "Deposit Bonus", type: "Email", status: "Scheduled", sent: 0, opened: 0, clicked: 0 },
  { id: 4, name: "VIP Promotion", type: "SMS", status: "Completed", sent: 89, opened: 78, clicked: 45 },
];

const PAGE_SIZE = 5;

export const AdminUsers = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [sortBy, setSortBy] = useState("name");
  const [page, setPage] = useState(1);

  const filteredUsers = users.filter(u => {
    const matchesSearch = u.name.toLowerCase().includes(searchQuery.toLowerCase()) || u.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "all" ||
      (statusFilter === "unverified" ? !u.verified : u.status.toLowerCase() === statusFilter);
    return matchesSearch && matchesStatus;
  });

  const totalPages = Math.ceil(filteredUsers.length / PAGE_SIZE);
  const paginatedUsers = filteredUsers.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);
  const unverifiedUsers = users.filter(u => !u.verified).length;
  const avgVolume = users.length > 0 ? users.reduce((a, u) => a + u.volume, 0) / users.length : 0;

  return (
    <div className="space-y-6">
      <Tabs defaultValue="users" className="space-y-4">
        <TabsList className="bg-muted/50 p-1 flex-wrap h-auto gap-1">
          <TabsTrigger value="users" className="data-[state=active]:bg-background gap-2"><Users className="h-4 w-4" /> All Users</TabsTrigger>
          <TabsTrigger value="segments" className="data-[state=active]:bg-background gap-2"><Tag className="h-4 w-4" /> Segments</TabsTrigger>
          <TabsTrigger value="campaigns" className="data-[state=active]:bg-background gap-2"><Megaphone className="h-4 w-4" /> Campaigns</TabsTrigger>
        </TabsList>

        {/* Users Tab */}
        <TabsContent value="users" className="space-y-4">
          <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
            <Card className="border-border/40"><CardContent className="p-4"><div className="flex items-center gap-2 text-muted-foreground text-sm mb-1"><Users className="h-4 w-4" /> Total Users</div><p className="text-2xl font-bold">124,500</p></CardContent></Card>
            <Card className="border-border/40 bg-success/5"><CardContent className="p-4"><div className="flex items-center gap-2 text-success text-sm mb-1"><UserCheck className="h-4 w-4" /> Active (30d)</div><p className="text-2xl font-bold">89,200</p></CardContent></Card>
            <Card className="border-border/40 bg-destructive/5"><CardContent className="p-4"><div className="flex items-center gap-2 text-destructive text-sm mb-1"><UserX className="h-4 w-4" /> Churned (30d)</div><p className="text-2xl font-bold">1,234</p></CardContent></Card>
            <Card className="border-border/40 bg-primary/5"><CardContent className="p-4"><p className="text-sm text-muted-foreground mb-1">Avg Vol/User</p><p className="text-2xl font-bold">${(avgVolume / 1000).toFixed(0)}K</p></CardContent></Card>
            <Card className="border-border/40 bg-warning/5"><CardContent className="p-4"><div className="flex items-center gap-2 text-warning text-sm mb-1"><Shield className="h-4 w-4" /> Unverified</div><p className="text-2xl font-bold">{unverifiedUsers}</p></CardContent></Card>
          </div>

          <div className="flex items-center gap-3 flex-wrap">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search users..." value={searchQuery} onChange={(e) => { setSearchQuery(e.target.value); setPage(1); }} className="pl-9 h-9" />
            </div>
            <Select value={statusFilter} onValueChange={(v) => { setStatusFilter(v); setPage(1); }}>
              <SelectTrigger className="w-36 h-9"><SelectValue placeholder="Status" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="suspended">Suspended</SelectItem>
                <SelectItem value="unverified">Unverified</SelectItem>
              </SelectContent>
            </Select>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-36 h-9"><SelectValue placeholder="Sort by" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="name">Name</SelectItem>
                <SelectItem value="volume">Volume</SelectItem>
                <SelectItem value="trades">Trades</SelectItem>
                <SelectItem value="joined">Date Joined</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" size="sm" className="gap-2" onClick={() => toast.success("Users exported")}>
              <Download className="h-4 w-4" /> Export
            </Button>
          </div>

          <Card className="border-border/40">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border/40 text-left text-sm text-muted-foreground">
                    <th className="p-4 font-medium">Name</th>
                    <th className="p-4 font-medium">Email</th>
                    <th className="p-4 font-medium">Joined</th>
                    <th className="p-4 font-medium">Status</th>
                    <th className="p-4 font-medium">Volume</th>
                    <th className="p-4 font-medium">Trades</th>
                    <th className="p-4 font-medium">P&L</th>
                    <th className="p-4 font-medium">Verified</th>
                    <th className="p-4 font-medium text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedUsers.map((u) => (
                    <tr key={u.id} className="border-b border-border/20 hover:bg-muted/30 transition-colors">
                      <td className="p-4 font-medium">{u.name}</td>
                      <td className="p-4 text-sm text-muted-foreground">{u.email}</td>
                      <td className="p-4 text-sm">{u.dateJoined}</td>
                      <td className="p-4"><Badge variant={u.status === "Active" ? "default" : "destructive"} className="text-xs">{u.status}</Badge></td>
                      <td className="p-4 text-sm font-medium">${u.volume.toLocaleString()}</td>
                      <td className="p-4 text-sm">{u.trades}</td>
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
            {totalPages > 1 && (
              <div className="flex items-center justify-between px-4 py-3 border-t border-border/40">
                <p className="text-sm text-muted-foreground">Showing {((page - 1) * PAGE_SIZE) + 1}–{Math.min(page * PAGE_SIZE, filteredUsers.length)} of {filteredUsers.length}</p>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm" disabled={page === 1} onClick={() => setPage(p => p - 1)}><ChevronLeft className="h-4 w-4" /></Button>
                  <span className="text-sm font-medium">{page} / {totalPages}</span>
                  <Button variant="outline" size="sm" disabled={page === totalPages} onClick={() => setPage(p => p + 1)}><ChevronRight className="h-4 w-4" /></Button>
                </div>
              </div>
            )}
          </Card>
        </TabsContent>

        {/* Segments Tab */}
        <TabsContent value="segments" className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">User Segments</h3>
            <Button size="sm" onClick={() => toast("Segment creation form would open here")}>Create Segment</Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {segments.map((segment) => (
              <Card key={segment.id} className="border-border/40">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-semibold">{segment.name}</span>
                    <Badge className={`text-xs border-0 ${segment.color}`}>{segment.count.toLocaleString()} users</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">{segment.description}</p>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" className="gap-1" onClick={() => toast(`Sending email to ${segment.count.toLocaleString()} users in ${segment.name}`)}><Send className="h-3 w-3" /> Email All</Button>
                    <Button size="sm" variant="outline" className="gap-1" onClick={() => toast(`Viewing users in ${segment.name}`)}><Eye className="h-3 w-3" /> View</Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Campaigns Tab */}
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
                      <td className="p-4"><Badge variant={c.status === "Active" ? "default" : c.status === "Scheduled" ? "secondary" : "outline"} className="text-xs">{c.status}</Badge></td>
                      <td className="p-4 text-sm">{c.sent.toLocaleString()}</td>
                      <td className="p-4 text-sm font-medium">{c.sent > 0 ? `${((c.opened / c.sent) * 100).toFixed(1)}%` : "—"}</td>
                      <td className="p-4 text-sm font-medium">{c.sent > 0 ? `${((c.clicked / c.sent) * 100).toFixed(1)}%` : "—"}</td>
                      <td className="p-4 text-right"><Button variant="ghost" size="sm" onClick={() => toast(`Managing campaign: ${c.name}`)}>Manage</Button></td>
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
