import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Search, MoreHorizontal, Eye, Pause, CheckCircle, XCircle,
  TrendingUp, Clock, Settings, Tag, Plus, ChevronLeft, ChevronRight,
  AlertTriangle, MessageSquare, DollarSign, BarChart3, Star, Edit, Sparkles,
} from "lucide-react";
import { toast } from "sonner";

const markets = [
  { id: 1, title: "Will Bitcoin reach $100K by end of 2025?", creator: "CryptoGuru", status: "Active", potSize: 245000, trades: 4234, feeRevenue: 7350, dateCreated: "2024-11-01", endDate: "2025-12-31", category: "Crypto", highlighted: true },
  { id: 2, title: "Will AI replace most software jobs by 2030?", creator: "TechOracle", status: "Active", potSize: 132000, trades: 2890, feeRevenue: 3960, dateCreated: "2024-10-15", endDate: "2030-01-01", category: "Tech", highlighted: false },
  { id: 3, title: "Will SpaceX land on Mars by 2026?", creator: "SpaceWatch", status: "Active", potSize: 98000, trades: 1756, feeRevenue: 2940, dateCreated: "2024-09-20", endDate: "2026-12-31", category: "Tech", highlighted: false },
  { id: 4, title: "US Election 2024 Winner", creator: "PoliticalPredict", status: "Resolved", potSize: 525000, trades: 15600, feeRevenue: 15750, dateCreated: "2024-01-10", endDate: "2024-11-05", category: "Politics", highlighted: true },
  { id: 5, title: "Super Bowl 2025 Champion", creator: "SportsAnalyst", status: "Active", potSize: 189000, trades: 5400, feeRevenue: 5670, dateCreated: "2024-08-01", endDate: "2025-02-11", category: "Sports", highlighted: false },
  { id: 6, title: "Will Tesla stock hit $300?", creator: "MarketMaven", status: "Paused", potSize: 45000, trades: 950, feeRevenue: 1350, dateCreated: "2024-06-15", endDate: "2025-06-30", category: "Crypto", highlighted: false },
  { id: 7, title: "Will Ethereum flip Bitcoin?", creator: "CryptoGuru", status: "Active", potSize: 72000, trades: 1678, feeRevenue: 2160, dateCreated: "2024-12-01", endDate: "2025-12-31", category: "Crypto", highlighted: false },
  { id: 8, title: "Next FIFA World Cup host?", creator: "SportsAnalyst", status: "Active", potSize: 58000, trades: 1220, feeRevenue: 1740, dateCreated: "2024-11-20", endDate: "2026-06-01", category: "Sports", highlighted: false },
];

const pendingMarkets = [
  { id: 9, title: "Will Apple release a foldable iPhone?", creator: "TechOracle", submitted: "2025-01-14", category: "Tech" },
  { id: 10, title: "NBA Championship 2025 Winner", creator: "SportsAnalyst", submitted: "2025-01-15", category: "Sports" },
  { id: 11, title: "Will ETH surpass $5K?", creator: "CryptoGuru", submitted: "2025-01-15", category: "Crypto" },
];

const disputes = [
  { id: 1, marketTitle: "Bitcoin Price by EOY", user: "john@example.com", reason: "Incorrect resolution", status: "Open", priority: "High", created: "2025-01-15", amount: 2500 },
  { id: 2, marketTitle: "Super Bowl Winner", user: "jane@example.com", reason: "Market manipulation", status: "In Review", priority: "Critical", created: "2025-01-14", amount: 5000 },
  { id: 3, marketTitle: "Election Results", user: "bob@example.com", reason: "Ambiguous outcome", status: "Open", priority: "Medium", created: "2025-01-13", amount: 1200 },
];

const resolutions = [
  { id: 1, title: "Bitcoin Price by End of 2024", outcome: "Yes", proposedBy: "System", status: "Pending", deadline: "2025-01-05", potSize: 245000 },
  { id: 2, title: "Super Bowl 2025 Champion", outcome: "Kansas City Chiefs", proposedBy: "CryptoGuru", status: "Disputed", deadline: "2025-02-15", potSize: 189000 },
  { id: 3, title: "US Election 2024 Winner", outcome: "Pending votes", proposedBy: "-", status: "Voting", deadline: "2024-11-10", potSize: 525000 },
  { id: 4, title: "Tesla Q4 Earnings Beat", outcome: "No", proposedBy: "MarketMaven", status: "Approved", deadline: "2025-01-28", potSize: 45000 },
];

const disputeHistory = [
  { id: 1, title: "Fed Rate Decision", type: "Resolution", outcome: "Approved", date: "2025-01-10", amount: 28000 },
  { id: 2, title: "Tesla Stock Price", type: "Dispute", outcome: "Rejected", date: "2025-01-08", amount: 800 },
  { id: 3, title: "AI Model Release", type: "Dispute", outcome: "Approved - Refund", date: "2025-01-05", amount: 1500 },
];

const categories = [
  { name: "Sports", markets: 234, activeMarkets: 198, volume: 1200000, active: true },
  { name: "Crypto", markets: 189, activeMarkets: 165, volume: 3400000, active: true },
  { name: "Politics", markets: 78, activeMarkets: 52, volume: 890000, active: true },
  { name: "Tech", markets: 156, activeMarkets: 134, volume: 670000, active: true },
  { name: "Entertainment", markets: 45, activeMarkets: 38, volume: 120000, active: true },
  { name: "Science", markets: 23, activeMarkets: 12, volume: 56000, active: false },
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
  const [page, setPage] = useState(1);
  const [timePeriod, setTimePeriod] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [sortBy, setSortBy] = useState("potSize");
  const [bannerMode, setBannerMode] = useState<"market" | "custom">("market");
  const [bannerMarket, setBannerMarket] = useState("");
  const [highlightedSlots, setHighlightedSlots] = useState(["1", "4", "", ""]);

  const filteredMarkets = markets.filter((m) => {
    const matchesSearch = m.title.toLowerCase().includes(searchQuery.toLowerCase()) || m.creator.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "all" || m.status.toLowerCase() === statusFilter;
    const matchesCategory = categoryFilter === "all" || m.category.toLowerCase() === categoryFilter;
    return matchesSearch && matchesStatus && matchesCategory;
  });

  const totalPages = Math.ceil(filteredMarkets.length / PAGE_SIZE);
  const paginatedMarkets = filteredMarkets.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const totalPotSize = markets.filter(m => m.status === "Active").reduce((a, m) => a + m.potSize, 0);
  const totalFeeRevenue = markets.reduce((a, m) => a + m.feeRevenue, 0);
  const totalTrades = markets.reduce((a, m) => a + m.trades, 0);

  return (
    <div className="space-y-6">
      {/* Search bar */}
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input placeholder="Search markets, creators..." value={searchQuery} onChange={(e) => { setSearchQuery(e.target.value); setPage(1); }} className="pl-9 h-9" />
      </div>

      {/* Time period */}
      <div className="flex items-center gap-2">
        {["1d", "7d", "30d", "90d", "all"].map((p) => (
          <Button key={p} variant={timePeriod === p ? "default" : "outline"} size="sm" onClick={() => setTimePeriod(p)}>
            {p === "all" ? "All Time" : p}
          </Button>
        ))}
      </div>

      {/* Status count cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="border-border/40 bg-success/5 cursor-pointer hover:bg-success/10 transition-colors">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 text-success text-sm mb-1"><TrendingUp className="h-4 w-4" /> Open</div>
            <p className="text-2xl font-bold">{markets.filter(m => m.status === "Active").length}</p>
          </CardContent>
        </Card>
        <Card className="border-border/40 bg-warning/5 cursor-pointer hover:bg-warning/10 transition-colors">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 text-warning text-sm mb-1"><Clock className="h-4 w-4" /> Pending</div>
            <p className="text-2xl font-bold">{pendingMarkets.length}</p>
          </CardContent>
        </Card>
        <Card className="border-border/40 bg-destructive/5 cursor-pointer hover:bg-destructive/10 transition-colors">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 text-destructive text-sm mb-1"><AlertTriangle className="h-4 w-4" /> Disputed</div>
            <p className="text-2xl font-bold">{disputes.length}</p>
          </CardContent>
        </Card>
        <Card className="border-border/40 bg-primary/5 cursor-pointer hover:bg-primary/10 transition-colors">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 text-primary text-sm mb-1"><CheckCircle className="h-4 w-4" /> Resolution</div>
            <p className="text-2xl font-bold">{resolutions.filter(r => r.status !== "Approved").length}</p>
          </CardContent>
        </Card>
      </div>

      {/* Summary metrics */}
      <div className="grid grid-cols-3 gap-4">
        <Card className="border-border/40">
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground mb-1">Total Pot Size</p>
            <p className="text-2xl font-bold text-primary">${(totalPotSize / 1000000).toFixed(2)}M</p>
          </CardContent>
        </Card>
        <Card className="border-border/40">
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground mb-1">Total Trades</p>
            <p className="text-2xl font-bold">{totalTrades.toLocaleString()}</p>
          </CardContent>
        </Card>
        <Card className="border-border/40 bg-success/5">
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground mb-1">Fee Revenue (3%)</p>
            <p className="text-2xl font-bold text-success">${totalFeeRevenue.toLocaleString()}</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="active" className="space-y-4">
        <TabsList className="bg-muted/50 p-1 flex-wrap h-auto gap-1">
          <TabsTrigger value="active" className="data-[state=active]:bg-background gap-2"><TrendingUp className="h-4 w-4" /> Active</TabsTrigger>
          <TabsTrigger value="pending" className="data-[state=active]:bg-background gap-2"><Clock className="h-4 w-4" /> Pending</TabsTrigger>
          <TabsTrigger value="disputed" className="data-[state=active]:bg-background gap-2"><AlertTriangle className="h-4 w-4" /> Disputed</TabsTrigger>
          <TabsTrigger value="resolution" className="data-[state=active]:bg-background gap-2"><CheckCircle className="h-4 w-4" /> Resolution</TabsTrigger>
          <TabsTrigger value="history" className="data-[state=active]:bg-background gap-2"><Clock className="h-4 w-4" /> History</TabsTrigger>
          <TabsTrigger value="categories" className="data-[state=active]:bg-background gap-2"><Tag className="h-4 w-4" /> Categories</TabsTrigger>
          <TabsTrigger value="settings" className="data-[state=active]:bg-background gap-2"><Settings className="h-4 w-4" /> Settings</TabsTrigger>
        </TabsList>

        {/* Active Markets */}
        <TabsContent value="active" className="space-y-4">
          {/* Filters */}
          <div className="flex items-center gap-3 flex-wrap">
            <Select value={statusFilter} onValueChange={(v) => { setStatusFilter(v); setPage(1); }}>
              <SelectTrigger className="w-36 h-9"><SelectValue placeholder="Status" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="paused">Paused</SelectItem>
                <SelectItem value="resolved">Resolved</SelectItem>
              </SelectContent>
            </Select>
            <Select value={categoryFilter} onValueChange={(v) => { setCategoryFilter(v); setPage(1); }}>
              <SelectTrigger className="w-40 h-9"><SelectValue placeholder="Category" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="sports">Sports</SelectItem>
                <SelectItem value="crypto">Crypto</SelectItem>
                <SelectItem value="politics">Politics</SelectItem>
                <SelectItem value="tech">Tech</SelectItem>
                <SelectItem value="entertainment">Entertainment</SelectItem>
              </SelectContent>
            </Select>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-36 h-9"><SelectValue placeholder="Sort by" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="potSize">Pot Size</SelectItem>
                <SelectItem value="trades">Trades</SelectItem>
                <SelectItem value="feeRevenue">Fee Revenue</SelectItem>
                <SelectItem value="created">Date Created</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Card className="border-border/40">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border/40 text-left text-sm text-muted-foreground">
                    <th className="p-4 font-medium w-8"></th>
                    <th className="p-4 font-medium">Title</th>
                    <th className="p-4 font-medium">Creator</th>
                    <th className="p-4 font-medium">Status</th>
                    <th className="p-4 font-medium">Trades</th>
                    <th className="p-4 font-medium">Pot Size</th>
                    <th className="p-4 font-medium">Fee Revenue</th>
                    <th className="p-4 font-medium">Start</th>
                    <th className="p-4 font-medium">End Date</th>
                    <th className="p-4 font-medium text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedMarkets.map((market) => (
                    <tr key={market.id} className="border-b border-border/20 hover:bg-muted/30 transition-colors">
                      <td className="p-4">
                        <button onClick={() => toast.success(`Market "${market.title}" ${market.highlighted ? 'unhighlighted' : 'highlighted'}`)} className="hover:scale-110 transition-transform">
                          <Star className={`h-4 w-4 ${market.highlighted ? 'fill-warning text-warning' : 'text-muted-foreground/40'}`} />
                        </button>
                      </td>
                      <td className="p-4"><p className="font-medium line-clamp-1 max-w-xs">{market.title}</p></td>
                      <td className="p-4 text-sm">{market.creator}</td>
                      <td className="p-4">
                        <Badge variant={market.status === "Active" ? "default" : market.status === "Resolved" ? "secondary" : "outline"} className="text-xs">{market.status}</Badge>
                      </td>
                      <td className="p-4 text-sm">{market.trades.toLocaleString()}</td>
                      <td className="p-4 text-sm font-bold text-primary">${market.potSize.toLocaleString()}</td>
                      <td className="p-4 text-sm font-medium text-success">${market.feeRevenue.toLocaleString()}</td>
                      <td className="p-4 text-sm text-muted-foreground">{market.dateCreated}</td>
                      <td className="p-4 text-sm">{market.endDate}</td>
                      <td className="p-4 text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild><Button variant="ghost" size="icon" className="h-8 w-8"><MoreHorizontal className="h-4 w-4" /></Button></DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="bg-popover">
                            <DropdownMenuItem className="gap-2" onClick={() => toast(`Opening market: ${market.title}`)}><Eye className="h-4 w-4" /> View</DropdownMenuItem>
                            <DropdownMenuItem className="gap-2" onClick={() => toast(`Opening creator profile: ${market.creator}`)}><Star className="h-4 w-4" /> View Creator</DropdownMenuItem>
                            <DropdownMenuItem className="gap-2" onClick={() => toast.success(`"${market.title}" ${market.highlighted ? 'unhighlighted' : 'highlighted'}`)}><Sparkles className="h-4 w-4" /> {market.highlighted ? 'Unhighlight' : 'Highlight'}</DropdownMenuItem>
                            <DropdownMenuItem className="gap-2" onClick={() => toast.success(`Market "${market.title}" paused`)}><Pause className="h-4 w-4" /> Pause</DropdownMenuItem>
                            <DropdownMenuItem className="gap-2" onClick={() => toast(`Opening resolution for "${market.title}"`)}><CheckCircle className="h-4 w-4" /> Resolve</DropdownMenuItem>
                            <DropdownMenuItem className="gap-2 text-destructive" onClick={() => toast.success(`Market "${market.title}" cancelled`)}><XCircle className="h-4 w-4" /> Cancel</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="flex items-center justify-between px-4 py-3 border-t border-border/40">
              <p className="text-sm text-muted-foreground">Showing {((page - 1) * PAGE_SIZE) + 1}–{Math.min(page * PAGE_SIZE, filteredMarkets.length)} of {filteredMarkets.length}</p>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" disabled={page === 1} onClick={() => setPage(p => p - 1)}><ChevronLeft className="h-4 w-4" /></Button>
                <span className="text-sm font-medium">{page} / {totalPages}</span>
                <Button variant="outline" size="sm" disabled={page === totalPages} onClick={() => setPage(p => p + 1)}><ChevronRight className="h-4 w-4" /></Button>
              </div>
            </div>
          </Card>
        </TabsContent>

        {/* Pending */}
        <TabsContent value="pending" className="space-y-4">
          <Card className="border-border/40">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border/40 text-left text-sm text-muted-foreground">
                    <th className="p-4 font-medium">Market</th>
                    <th className="p-4 font-medium">Creator</th>
                    <th className="p-4 font-medium">Category</th>
                    <th className="p-4 font-medium">Submitted</th>
                    <th className="p-4 font-medium text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {pendingMarkets.map((m) => (
                    <tr key={m.id} className="border-b border-border/20 hover:bg-muted/30 transition-colors">
                      <td className="p-4 font-medium">{m.title}</td>
                      <td className="p-4 text-sm">{m.creator}</td>
                      <td className="p-4"><Badge variant="outline" className="text-xs">{m.category}</Badge></td>
                      <td className="p-4 text-sm">{m.submitted}</td>
                      <td className="p-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Button size="sm" className="gap-1 h-8" onClick={() => toast.success(`Market "${m.title}" approved`)}><CheckCircle className="h-3 w-3" /> Approve</Button>
                          <Button size="sm" variant="outline" className="gap-1 h-8 text-destructive" onClick={() => toast.success(`Market "${m.title}" rejected`)}><XCircle className="h-3 w-3" /> Reject</Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </TabsContent>

        {/* Disputed */}
        <TabsContent value="disputed" className="space-y-4">
          <Card className="border-border/40">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border/40 text-left text-sm text-muted-foreground">
                    <th className="p-4 font-medium">Market</th>
                    <th className="p-4 font-medium">User</th>
                    <th className="p-4 font-medium">Reason</th>
                    <th className="p-4 font-medium">Priority</th>
                    <th className="p-4 font-medium">Amount</th>
                    <th className="p-4 font-medium text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {disputes.map((d) => (
                    <tr key={d.id} className="border-b border-border/20 hover:bg-muted/30 transition-colors">
                      <td className="p-4">
                        <p className="font-medium line-clamp-1">{d.marketTitle}</p>
                        <p className="text-xs text-muted-foreground">{d.created}</p>
                      </td>
                      <td className="p-4 text-sm">{d.user}</td>
                      <td className="p-4 text-sm">{d.reason}</td>
                      <td className="p-4"><Badge className={`text-xs border-0 ${priorityColors[d.priority]}`}>{d.priority}</Badge></td>
                      <td className="p-4 text-sm font-medium">${d.amount.toLocaleString()}</td>
                      <td className="p-4 text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild><Button variant="ghost" size="icon" className="h-8 w-8"><MoreHorizontal className="h-4 w-4" /></Button></DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="bg-popover">
                            <DropdownMenuItem className="gap-2" onClick={() => toast(`Opening dispute details for "${d.marketTitle}"`)}><Eye className="h-4 w-4" /> View</DropdownMenuItem>
                            <DropdownMenuItem className="gap-2" onClick={() => toast(`Opening message thread with ${d.user}`)}><MessageSquare className="h-4 w-4" /> Message</DropdownMenuItem>
                            <DropdownMenuItem className="gap-2 text-success" onClick={() => toast.success(`Dispute on "${d.marketTitle}" approved`)}><CheckCircle className="h-4 w-4" /> Approve</DropdownMenuItem>
                            <DropdownMenuItem className="gap-2 text-destructive" onClick={() => toast.success(`Dispute on "${d.marketTitle}" rejected`)}><XCircle className="h-4 w-4" /> Reject</DropdownMenuItem>
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

        {/* Resolution */}
        <TabsContent value="resolution" className="space-y-4">
          <Card className="border-border/40">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border/40 text-left text-sm text-muted-foreground">
                    <th className="p-4 font-medium">Market</th>
                    <th className="p-4 font-medium">Outcome</th>
                    <th className="p-4 font-medium">Status</th>
                    <th className="p-4 font-medium">Pot Size</th>
                    <th className="p-4 font-medium">Deadline</th>
                    <th className="p-4 font-medium text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {resolutions.map((r) => (
                    <tr key={r.id} className="border-b border-border/20 hover:bg-muted/30 transition-colors">
                      <td className="p-4">
                        <p className="font-medium line-clamp-1 max-w-xs">{r.title}</p>
                        <p className="text-xs text-muted-foreground">by {r.proposedBy}</p>
                      </td>
                      <td className="p-4"><Badge variant="outline" className="text-xs">{r.outcome}</Badge></td>
                      <td className="p-4">
                        <Badge variant={r.status === "Approved" ? "default" : r.status === "Disputed" ? "destructive" : "secondary"} className="text-xs">{r.status}</Badge>
                      </td>
                      <td className="p-4 text-sm font-bold text-primary">${r.potSize.toLocaleString()}</td>
                      <td className="p-4 text-sm">{r.deadline}</td>
                      <td className="p-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          {r.status === "Pending" && <Button size="sm" className="gap-1 h-8" onClick={() => toast.success(`Resolution for "${r.title}" confirmed`)}><CheckCircle className="h-3 w-3" /> Confirm</Button>}
                          {r.status === "Pending" && <Button size="sm" variant="outline" className="gap-1 h-8 text-destructive" onClick={() => toast(`Resolution for "${r.title}" rejected`)}><XCircle className="h-3 w-3" /> Reject</Button>}
                        </div>
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
                <thead>
                  <tr className="border-b border-border/40 text-left text-sm text-muted-foreground">
                    <th className="p-4 font-medium">Market</th>
                    <th className="p-4 font-medium">Type</th>
                    <th className="p-4 font-medium">Outcome</th>
                    <th className="p-4 font-medium">Date</th>
                    <th className="p-4 font-medium">Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {disputeHistory.map((h) => (
                    <tr key={h.id} className="border-b border-border/20 hover:bg-muted/30 transition-colors">
                      <td className="p-4 font-medium">{h.title}</td>
                      <td className="p-4"><Badge variant="outline" className="text-xs">{h.type}</Badge></td>
                      <td className="p-4 text-sm">{h.outcome}</td>
                      <td className="p-4 text-sm">{h.date}</td>
                      <td className="p-4 text-sm font-medium">${h.amount.toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </TabsContent>

        {/* Categories */}
        <TabsContent value="categories" className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Market Categories</h3>
            <Button size="sm" className="gap-2" onClick={() => toast("Category creation form would open here")}><Plus className="h-4 w-4" /> Add Category</Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {categories.map((cat) => (
              <Card key={cat.name} className="border-border/40">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-semibold">{cat.name}</span>
                    <Switch defaultChecked={cat.active} />
                  </div>
                  <div className="grid grid-cols-2 gap-y-1 text-sm">
                    <span className="text-muted-foreground">Total Markets</span><span className="text-right font-medium">{cat.markets}</span>
                    <span className="text-muted-foreground">Active Markets</span><span className="text-right font-medium">{cat.activeMarkets}</span>
                    <span className="text-muted-foreground">Pot Size</span><span className="text-right font-medium">${(cat.volume / 1000000).toFixed(1)}M</span>
                    <span className="text-muted-foreground">Fee Revenue</span><span className="text-right font-medium text-success">${(cat.volume * 0.03 / 1000).toFixed(0)}K</span>
                    <span className="text-muted-foreground">Avg Pot Size</span><span className="text-right font-medium">${cat.markets > 0 ? (cat.volume / cat.markets / 1000).toFixed(1) : 0}K</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Settings */}
        <TabsContent value="settings" className="space-y-4">
          {/* Main Banner */}
          <Card className="border-border/40 max-w-2xl">
            <CardContent className="p-6 space-y-5">
              <div>
                <h3 className="font-semibold text-lg">Main Banner</h3>
                <p className="text-sm text-muted-foreground">Choose a market to feature, or upload a custom graphic</p>
              </div>

              {/* Banner Mode Toggle */}
              <div className="flex gap-2">
                <Button variant={bannerMode === "market" ? "default" : "outline"} size="sm" onClick={() => setBannerMode("market")}>Select Market</Button>
                <Button variant={bannerMode === "custom" ? "default" : "outline"} size="sm" onClick={() => setBannerMode("custom")}>Custom Graphic</Button>
              </div>

              {bannerMode === "market" ? (
                <div className="space-y-2">
                  <Label className="text-xs">Featured Market</Label>
                  <Select value={bannerMarket} onValueChange={setBannerMarket}>
                    <SelectTrigger className="h-9 text-sm"><SelectValue placeholder="Choose a market to display as banner..." /></SelectTrigger>
                    <SelectContent>
                      {markets.map(m => <SelectItem key={m.id} value={String(m.id)}>{m.title}</SelectItem>)}
                    </SelectContent>
                  </Select>
                  {bannerMarket && (
                    <p className="text-xs text-muted-foreground">The market card will be shown as the main banner on the homepage</p>
                  )}
                </div>
              ) : (
                <div className="space-y-3">
                  <div className="border-2 border-dashed border-border/60 rounded-xl p-4 hover:border-primary/40 transition-colors">
                    <div className="aspect-[3/1] bg-muted/30 rounded-lg flex items-center justify-center relative group">
                      <div className="flex flex-col items-center gap-2">
                        <Sparkles className="h-6 w-6 text-muted-foreground" />
                        <span className="text-xs text-muted-foreground">1200 × 400 recommended</span>
                        <Button size="sm" variant="outline" className="gap-2 text-xs" onClick={() => toast("File upload dialog would open here")}>
                          <Edit className="h-3.5 w-3.5" /> Upload Image
                        </Button>
                      </div>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div><Label className="text-xs">Banner Title</Label><Input placeholder="e.g. Featured Market of the Week" className="mt-1 h-8 text-sm" /></div>
                    <div><Label className="text-xs">Link URL (optional)</Label><Input placeholder="e.g. /market/1" className="mt-1 h-8 text-sm" /></div>
                  </div>
                </div>
              )}

              <Button className="w-full" onClick={() => toast.success("Banner settings saved")}>Save Banner</Button>
            </CardContent>
          </Card>

          {/* Highlighted Markets */}
          <Card className="border-border/40 max-w-2xl">
            <CardContent className="p-6 space-y-4">
              <div>
                <h3 className="font-semibold text-lg">Highlighted Markets</h3>
                <p className="text-sm text-muted-foreground">Choose 4 markets to feature in the sidebar across the platform</p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[0, 1, 2, 3].map((slot) => (
                  <div key={slot} className="border border-border/40 rounded-lg p-3 space-y-2">
                    <Label className="text-xs text-muted-foreground">Slot {slot + 1}</Label>
                    <Select value={highlightedSlots[slot]} onValueChange={(v) => { const next = [...highlightedSlots]; next[slot] = v; setHighlightedSlots(next); }}>
                      <SelectTrigger className="h-9 text-sm"><SelectValue placeholder="Select market..." /></SelectTrigger>
                      <SelectContent>
                        {markets.map(m => <SelectItem key={m.id} value={String(m.id)}>{m.title}</SelectItem>)}
                      </SelectContent>
                    </Select>
                    {highlightedSlots[slot] && (
                      <div className="flex items-center justify-between">
                        <Badge variant="outline" className="text-xs">{markets.find(m => String(m.id) === highlightedSlots[slot])?.category}</Badge>
                        <Button variant="ghost" size="sm" className="h-6 text-xs text-destructive" onClick={() => { const next = [...highlightedSlots]; next[slot] = ""; setHighlightedSlots(next); }}>
                          <XCircle className="h-3 w-3 mr-1" /> Remove
                        </Button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
              <Button className="w-full" onClick={() => toast.success("Highlighted markets saved")}>Save Highlights</Button>
            </CardContent>
          </Card>

          {/* Market Settings */}
          <Card className="border-border/40 max-w-2xl">
            <CardContent className="p-6 space-y-4">
              <h3 className="font-semibold text-lg">Market Settings</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div><Label>Min Ticket Amount ($)</Label><Input defaultValue="1" type="number" className="mt-1" /></div>
                <div><Label>Max Ticket Amount ($)</Label><Input defaultValue="50000" type="number" className="mt-1" /></div>
                <div><Label>Platform Fee (%)</Label><Input defaultValue="3" type="number" className="mt-1" /></div>
                <div><Label>Resolution Timeframe (days)</Label><Input defaultValue="7" type="number" className="mt-1" /></div>
                <div><Label>Dispute Period (hours)</Label><Input defaultValue="24" type="number" className="mt-1" /></div>
                <div><Label>Creator Fee Share (%)</Label><Input defaultValue="20" type="number" className="mt-1" /></div>
                <div className="sm:col-span-2 flex items-center justify-between"><span className="text-sm">Auto-approve verified creators</span><Switch defaultChecked /></div>
                <div className="sm:col-span-2 flex items-center justify-between"><span className="text-sm">Require KYC for markets {'>'} $10K pot</span><Switch defaultChecked /></div>
              </div>
              <Button className="w-full" onClick={() => toast.success("Market settings saved")}>Save Settings</Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
