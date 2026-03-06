import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AdminFilters } from "./AdminFilters";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Search, MoreHorizontal, Eye, Pause, CheckCircle, XCircle,
  TrendingUp, Clock, AlertTriangle, MessageSquare, Star, Sparkles,
  ChevronLeft, ChevronRight,
} from "lucide-react";
import { toast } from "sonner";

const markets = [
  { id: 1, title: "Will Bitcoin reach $100K by end of 2025?", creator: "CryptoGuru", status: "Active", potSize: 245000, trades: 4234, feeRevenue: 7350, dateCreated: "2024-11-01", endDate: "2025-12-31", category: "Crypto" },
  { id: 2, title: "Will AI replace most software jobs by 2030?", creator: "TechOracle", status: "Active", potSize: 132000, trades: 2890, feeRevenue: 3960, dateCreated: "2024-10-15", endDate: "2030-01-01", category: "Tech" },
  { id: 3, title: "Will SpaceX land on Mars by 2026?", creator: "SpaceWatch", status: "Active", potSize: 98000, trades: 1756, feeRevenue: 2940, dateCreated: "2024-09-20", endDate: "2026-12-31", category: "Tech" },
  { id: 4, title: "US Election 2024 Winner", creator: "PoliticalPredict", status: "Resolved", potSize: 525000, trades: 15600, feeRevenue: 15750, dateCreated: "2024-01-10", endDate: "2024-11-05", category: "Politics" },
  { id: 5, title: "Super Bowl 2025 Champion", creator: "SportsAnalyst", status: "Active", potSize: 189000, trades: 5400, feeRevenue: 5670, dateCreated: "2024-08-01", endDate: "2025-02-11", category: "Sports" },
  { id: 6, title: "Will Tesla stock hit $300?", creator: "MarketMaven", status: "Paused", potSize: 45000, trades: 950, feeRevenue: 1350, dateCreated: "2024-06-15", endDate: "2025-06-30", category: "Crypto" },
  { id: 7, title: "Will Ethereum flip Bitcoin?", creator: "CryptoGuru", status: "Active", potSize: 72000, trades: 1678, feeRevenue: 2160, dateCreated: "2024-12-01", endDate: "2025-12-31", category: "Crypto" },
];

const pendingMarkets = [
  { id: 9, title: "Will Apple release a foldable iPhone?", creator: "TechOracle", submitted: "2025-01-14", category: "Tech" },
  { id: 10, title: "NBA Championship 2025 Winner", creator: "SportsAnalyst", submitted: "2025-01-15", category: "Sports" },
  { id: 11, title: "Will ETH surpass $5K?", creator: "CryptoGuru", submitted: "2025-01-15", category: "Crypto" },
];

const resolutions = [
  { id: 1, title: "Bitcoin Price by End of 2024", creator: "CryptoGuru", potSize: 245000, outcome: "Yes", deadline: "2025-01-05" },
  { id: 2, title: "Super Bowl 2025 Champion", creator: "SportsAnalyst", potSize: 189000, outcome: "Kansas City Chiefs", deadline: "2025-02-15" },
];

const disputes = [
  { id: 1, market: "Bitcoin Price by EOY", user: "john@example.com", reason: "Incorrect resolution", amount: 2500, priority: "High" },
  { id: 2, market: "Super Bowl Winner", user: "jane@example.com", reason: "Market manipulation", amount: 5000, priority: "Critical" },
  { id: 3, market: "Election Results", user: "bob@example.com", reason: "Ambiguous outcome", amount: 1200, priority: "Medium" },
];

const history = [
  { id: 1, title: "Fed Rate Decision", creator: "MarketMaven", outcome: "Yes", volume: 145000, resolvedDate: "2025-01-10", category: "Crypto" },
  { id: 2, title: "Tesla Q4 Beat", creator: "TechOracle", outcome: "No", volume: 45000, resolvedDate: "2025-01-08", category: "Tech" },
  { id: 3, title: "US Election 2024", creator: "PoliticalPredict", outcome: "Trump", volume: 525000, resolvedDate: "2024-11-06", category: "Politics" },
];

const priorityColors: Record<string, string> = {
  Critical: "bg-destructive/10 text-destructive",
  High: "bg-warning/10 text-warning",
  Medium: "bg-primary/10 text-primary",
  Low: "bg-muted text-muted-foreground",
};

const PAGE_SIZE = 5;

export const AdminMarkets = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [sortBy, setSortBy] = useState("potSize");
  const [page, setPage] = useState(1);

  const filtered = markets.filter((m) => {
    const matchesSearch = m.title.toLowerCase().includes(searchQuery.toLowerCase()) || m.creator.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "all" || m.status.toLowerCase() === statusFilter;
    const matchesCategory = categoryFilter === "all" || m.category.toLowerCase() === categoryFilter;
    return matchesSearch && matchesStatus && matchesCategory;
  });

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);
  const activeCount = markets.filter(m => m.status === "Active").length;
  const totalPot = markets.filter(m => m.status === "Active").reduce((a, m) => a + m.potSize, 0);

  return (
    <div className="space-y-5">
      <AdminFilters showCreator />

      {/* Top Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
        <Card className="border-border/40 bg-success/5"><CardContent className="p-4"><p className="text-xs text-muted-foreground mb-1">Active</p><p className="text-2xl font-bold">{activeCount}</p></CardContent></Card>
        <Card className="border-border/40 bg-warning/5"><CardContent className="p-4"><p className="text-xs text-muted-foreground mb-1">Pending Approval</p><p className="text-2xl font-bold">{pendingMarkets.length}</p></CardContent></Card>
        <Card className="border-border/40 bg-primary/5"><CardContent className="p-4"><p className="text-xs text-muted-foreground mb-1">Awaiting Resolution</p><p className="text-2xl font-bold">{resolutions.length}</p></CardContent></Card>
        <Card className="border-border/40 bg-destructive/5"><CardContent className="p-4"><p className="text-xs text-muted-foreground mb-1">Disputed</p><p className="text-2xl font-bold">{disputes.length}</p></CardContent></Card>
        <Card className="border-border/40"><CardContent className="p-4"><p className="text-xs text-muted-foreground mb-1">Total Pot Size</p><p className="text-2xl font-bold text-primary">${(totalPot / 1e6).toFixed(2)}M</p></CardContent></Card>
      </div>

      <Tabs defaultValue="active" className="space-y-4">
        <TabsList className="bg-muted/50 p-1 flex-wrap h-auto gap-1">
          <TabsTrigger value="active" className="data-[state=active]:bg-background gap-1.5 text-xs"><TrendingUp className="h-3.5 w-3.5" /> Active</TabsTrigger>
          <TabsTrigger value="pending" className="data-[state=active]:bg-background gap-1.5 text-xs"><Clock className="h-3.5 w-3.5" /> Pending</TabsTrigger>
          <TabsTrigger value="resolution" className="data-[state=active]:bg-background gap-1.5 text-xs"><CheckCircle className="h-3.5 w-3.5" /> Resolution</TabsTrigger>
          <TabsTrigger value="disputes" className="data-[state=active]:bg-background gap-1.5 text-xs"><AlertTriangle className="h-3.5 w-3.5" /> Disputes</TabsTrigger>
          <TabsTrigger value="history" className="data-[state=active]:bg-background gap-1.5 text-xs"><Clock className="h-3.5 w-3.5" /> History</TabsTrigger>
        </TabsList>

        {/* Active Markets */}
        <TabsContent value="active" className="space-y-4">
          <div className="flex items-center gap-3 flex-wrap">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search markets..." value={searchQuery} onChange={(e) => { setSearchQuery(e.target.value); setPage(1); }} className="pl-9 h-9" />
            </div>
            <Select value={statusFilter} onValueChange={(v) => { setStatusFilter(v); setPage(1); }}>
              <SelectTrigger className="w-32 h-9"><SelectValue placeholder="Status" /></SelectTrigger>
              <SelectContent><SelectItem value="all">All</SelectItem><SelectItem value="active">Active</SelectItem><SelectItem value="paused">Paused</SelectItem><SelectItem value="resolved">Resolved</SelectItem></SelectContent>
            </Select>
            <Select value={categoryFilter} onValueChange={(v) => { setCategoryFilter(v); setPage(1); }}>
              <SelectTrigger className="w-36 h-9"><SelectValue placeholder="Category" /></SelectTrigger>
              <SelectContent><SelectItem value="all">All</SelectItem><SelectItem value="sports">Sports</SelectItem><SelectItem value="crypto">Crypto</SelectItem><SelectItem value="politics">Politics</SelectItem><SelectItem value="tech">Tech</SelectItem></SelectContent>
            </Select>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-32 h-9"><SelectValue /></SelectTrigger>
              <SelectContent><SelectItem value="potSize">Pot Size</SelectItem><SelectItem value="trades">Trades</SelectItem><SelectItem value="feeRevenue">Fee Revenue</SelectItem></SelectContent>
            </Select>
          </div>
          <Card className="border-border/40">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border/40 text-left text-xs text-muted-foreground">
                    <th className="p-3 font-medium">Title</th>
                    <th className="p-3 font-medium">Creator</th>
                    <th className="p-3 font-medium">Category</th>
                    <th className="p-3 font-medium">Status</th>
                    <th className="p-3 font-medium">Trades</th>
                    <th className="p-3 font-medium">Pot Size</th>
                    <th className="p-3 font-medium">Fee Rev</th>
                    <th className="p-3 font-medium">Start</th>
                    <th className="p-3 font-medium">End</th>
                    <th className="p-3 font-medium text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {paginated.map((m) => (
                    <tr key={m.id} className="border-b border-border/20 hover:bg-muted/30 transition-colors">
                      <td className="p-3"><p className="font-medium line-clamp-1 max-w-[200px] text-sm">{m.title}</p></td>
                      <td className="p-3 text-sm">{m.creator}</td>
                      <td className="p-3"><Badge variant="outline" className="text-xs">{m.category}</Badge></td>
                      <td className="p-3"><Badge variant={m.status === "Active" ? "default" : m.status === "Resolved" ? "secondary" : "outline"} className="text-xs">{m.status}</Badge></td>
                      <td className="p-3 text-sm">{m.trades.toLocaleString()}</td>
                      <td className="p-3 text-sm font-medium text-primary">${m.potSize.toLocaleString()}</td>
                      <td className="p-3 text-sm text-success font-medium">${m.feeRevenue.toLocaleString()}</td>
                      <td className="p-3 text-xs text-muted-foreground">{m.dateCreated}</td>
                      <td className="p-3 text-xs">{m.endDate}</td>
                      <td className="p-3 text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild><Button variant="ghost" size="icon" className="h-7 w-7"><MoreHorizontal className="h-4 w-4" /></Button></DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="bg-popover">
                            <DropdownMenuItem className="gap-2" onClick={() => toast(`Viewing ${m.title}`)}><Eye className="h-4 w-4" /> View</DropdownMenuItem>
                            <DropdownMenuItem className="gap-2" onClick={() => toast.success(`Paused`)}><Pause className="h-4 w-4" /> Pause</DropdownMenuItem>
                            <DropdownMenuItem className="gap-2" onClick={() => toast(`Resolving`)}><CheckCircle className="h-4 w-4" /> Resolve</DropdownMenuItem>
                            <DropdownMenuItem className="gap-2 text-destructive" onClick={() => toast.success(`Cancelled`)}><XCircle className="h-4 w-4" /> Cancel</DropdownMenuItem>
                            <DropdownMenuItem className="gap-2" onClick={() => toast.success(`Featured`)}><Sparkles className="h-4 w-4" /> Feature</DropdownMenuItem>
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
                <p className="text-xs text-muted-foreground">Showing {((page - 1) * PAGE_SIZE) + 1}–{Math.min(page * PAGE_SIZE, filtered.length)} of {filtered.length}</p>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm" disabled={page === 1} onClick={() => setPage(p => p - 1)}><ChevronLeft className="h-4 w-4" /></Button>
                  <span className="text-xs">{page}/{totalPages}</span>
                  <Button variant="outline" size="sm" disabled={page === totalPages} onClick={() => setPage(p => p + 1)}><ChevronRight className="h-4 w-4" /></Button>
                </div>
              </div>
            )}
          </Card>
        </TabsContent>

        {/* Pending */}
        <TabsContent value="pending" className="space-y-4">
          <Card className="border-border/40">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead><tr className="border-b border-border/40 text-left text-xs text-muted-foreground"><th className="p-3">Title</th><th className="p-3">Creator</th><th className="p-3">Category</th><th className="p-3">Submitted</th><th className="p-3 text-right">Actions</th></tr></thead>
                <tbody>
                  {pendingMarkets.map((m) => (
                    <tr key={m.id} className="border-b border-border/20 hover:bg-muted/30 transition-colors">
                      <td className="p-3 font-medium text-sm">{m.title}</td>
                      <td className="p-3 text-sm">{m.creator}</td>
                      <td className="p-3"><Badge variant="outline" className="text-xs">{m.category}</Badge></td>
                      <td className="p-3 text-xs text-muted-foreground">{m.submitted}</td>
                      <td className="p-3 text-right">
                        <div className="flex items-center justify-end gap-1">
                          <Button size="sm" className="h-7 text-xs gap-1" onClick={() => toast.success("Approved")}><CheckCircle className="h-3 w-3" /> Approve</Button>
                          <Button size="sm" variant="outline" className="h-7 text-xs gap-1 text-destructive" onClick={() => toast.success("Rejected")}><XCircle className="h-3 w-3" /> Reject</Button>
                          <Button size="sm" variant="ghost" className="h-7 text-xs gap-1" onClick={() => toast("Message sent")}><MessageSquare className="h-3 w-3" /> Message</Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </TabsContent>

        {/* Resolution */}
        <TabsContent value="resolution" className="space-y-4">
          <Card className="border-border/40">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead><tr className="border-b border-border/40 text-left text-xs text-muted-foreground"><th className="p-3">Market</th><th className="p-3">Creator</th><th className="p-3">Pot Size</th><th className="p-3">Proposed Outcome</th><th className="p-3">Deadline</th><th className="p-3 text-right">Actions</th></tr></thead>
                <tbody>
                  {resolutions.map((r) => (
                    <tr key={r.id} className="border-b border-border/20 hover:bg-muted/30 transition-colors">
                      <td className="p-3 font-medium text-sm">{r.title}</td>
                      <td className="p-3 text-sm">{r.creator}</td>
                      <td className="p-3 text-sm font-medium text-primary">${r.potSize.toLocaleString()}</td>
                      <td className="p-3"><Badge variant="secondary" className="text-xs">{r.outcome}</Badge></td>
                      <td className="p-3 text-xs text-muted-foreground">{r.deadline}</td>
                      <td className="p-3 text-right">
                        <div className="flex items-center justify-end gap-1">
                          <Button size="sm" className="h-7 text-xs gap-1" onClick={() => toast.success("Confirmed")}><CheckCircle className="h-3 w-3" /> Confirm</Button>
                          <Button size="sm" variant="outline" className="h-7 text-xs gap-1 text-destructive" onClick={() => toast.success("Rejected")}><XCircle className="h-3 w-3" /> Reject</Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </TabsContent>

        {/* Disputes */}
        <TabsContent value="disputes" className="space-y-4">
          <Card className="border-border/40">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead><tr className="border-b border-border/40 text-left text-xs text-muted-foreground"><th className="p-3">Market</th><th className="p-3">User</th><th className="p-3">Reason</th><th className="p-3">Amount</th><th className="p-3">Priority</th><th className="p-3 text-right">Actions</th></tr></thead>
                <tbody>
                  {disputes.map((d) => (
                    <tr key={d.id} className="border-b border-border/20 hover:bg-muted/30 transition-colors">
                      <td className="p-3 font-medium text-sm">{d.market}</td>
                      <td className="p-3 text-sm text-muted-foreground">{d.user}</td>
                      <td className="p-3 text-sm">{d.reason}</td>
                      <td className="p-3 text-sm font-medium">${d.amount.toLocaleString()}</td>
                      <td className="p-3"><Badge className={`text-xs border-0 ${priorityColors[d.priority]}`}>{d.priority}</Badge></td>
                      <td className="p-3 text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild><Button variant="ghost" size="icon" className="h-7 w-7"><MoreHorizontal className="h-4 w-4" /></Button></DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="bg-popover">
                            <DropdownMenuItem className="gap-2" onClick={() => toast("Investigating")}><Eye className="h-4 w-4" /> Investigate</DropdownMenuItem>
                            <DropdownMenuItem className="gap-2 text-success" onClick={() => toast.success("Approved")}><CheckCircle className="h-4 w-4" /> Approve</DropdownMenuItem>
                            <DropdownMenuItem className="gap-2 text-destructive" onClick={() => toast.success("Rejected")}><XCircle className="h-4 w-4" /> Reject</DropdownMenuItem>
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

        {/* History */}
        <TabsContent value="history" className="space-y-4">
          <Card className="border-border/40">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead><tr className="border-b border-border/40 text-left text-xs text-muted-foreground"><th className="p-3">Market</th><th className="p-3">Creator</th><th className="p-3">Category</th><th className="p-3">Outcome</th><th className="p-3">Volume</th><th className="p-3">Resolved</th></tr></thead>
                <tbody>
                  {history.map((h) => (
                    <tr key={h.id} className="border-b border-border/20 hover:bg-muted/30 transition-colors">
                      <td className="p-3 font-medium text-sm">{h.title}</td>
                      <td className="p-3 text-sm">{h.creator}</td>
                      <td className="p-3"><Badge variant="outline" className="text-xs">{h.category}</Badge></td>
                      <td className="p-3"><Badge variant="secondary" className="text-xs">{h.outcome}</Badge></td>
                      <td className="p-3 text-sm font-medium">${h.volume.toLocaleString()}</td>
                      <td className="p-3 text-xs text-muted-foreground">{h.resolvedDate}</td>
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
