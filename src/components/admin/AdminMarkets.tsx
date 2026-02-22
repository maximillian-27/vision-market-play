import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Search, MoreHorizontal, Eye, Pause, CheckCircle, XCircle,
  TrendingUp, Clock, Settings, Tag, Plus, ChevronLeft, ChevronRight,
  AlertTriangle, MessageSquare, DollarSign, BarChart3,
} from "lucide-react";
import { toast } from "sonner";

const markets = [
  { id: 1, title: "Will Bitcoin reach $100K by end of 2025?", creator: "CryptoGuru", status: "Active", potSize: 245000, trades: 4234, feeRevenue: 7350, dateCreated: "2024-11-01", endDate: "2025-12-31" },
  { id: 2, title: "Will AI replace most software jobs by 2030?", creator: "TechOracle", status: "Active", potSize: 132000, trades: 2890, feeRevenue: 3960, dateCreated: "2024-10-15", endDate: "2030-01-01" },
  { id: 3, title: "Will SpaceX land on Mars by 2026?", creator: "SpaceWatch", status: "Active", potSize: 98000, trades: 1756, feeRevenue: 2940, dateCreated: "2024-09-20", endDate: "2026-12-31" },
  { id: 4, title: "US Election 2024 Winner", creator: "PoliticalPredict", status: "Resolved", potSize: 525000, trades: 15600, feeRevenue: 15750, dateCreated: "2024-01-10", endDate: "2024-11-05" },
  { id: 5, title: "Super Bowl 2025 Champion", creator: "SportsAnalyst", status: "Active", potSize: 189000, trades: 5400, feeRevenue: 5670, dateCreated: "2024-08-01", endDate: "2025-02-11" },
  { id: 6, title: "Will Tesla stock hit $300?", creator: "MarketMaven", status: "Paused", potSize: 45000, trades: 950, feeRevenue: 1350, dateCreated: "2024-06-15", endDate: "2025-06-30" },
  { id: 7, title: "Will Ethereum flip Bitcoin?", creator: "CryptoGuru", status: "Active", potSize: 72000, trades: 1678, feeRevenue: 2160, dateCreated: "2024-12-01", endDate: "2025-12-31" },
  { id: 8, title: "Next FIFA World Cup host?", creator: "SportsAnalyst", status: "Active", potSize: 58000, trades: 1220, feeRevenue: 1740, dateCreated: "2024-11-20", endDate: "2026-06-01" },
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
  { name: "Sports", markets: 234, volume: 1200000, active: true },
  { name: "Crypto", markets: 189, volume: 3400000, active: true },
  { name: "Politics", markets: 78, volume: 890000, active: true },
  { name: "Tech", markets: 156, volume: 670000, active: true },
  { name: "Entertainment", markets: 45, volume: 120000, active: true },
  { name: "Science", markets: 23, volume: 56000, active: false },
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

  const filteredMarkets = markets.filter((m) =>
    m.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    m.creator.toLowerCase().includes(searchQuery.toLowerCase())
  );

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

      {/* Analytics row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="border-border/40">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 text-muted-foreground text-sm mb-1"><TrendingUp className="h-4 w-4" /> Active Markets</div>
            <p className="text-2xl font-bold">{markets.filter(m => m.status === "Active").length}</p>
          </CardContent>
        </Card>
        <Card className="border-border/40 bg-primary/5">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 text-primary text-sm mb-1"><DollarSign className="h-4 w-4" /> Total Pot Size</div>
            <p className="text-2xl font-bold text-primary">${(totalPotSize / 1000000).toFixed(2)}M</p>
          </CardContent>
        </Card>
        <Card className="border-border/40">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 text-muted-foreground text-sm mb-1"><BarChart3 className="h-4 w-4" /> Total Trades</div>
            <p className="text-2xl font-bold">{totalTrades.toLocaleString()}</p>
          </CardContent>
        </Card>
        <Card className="border-border/40 bg-success/5">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 text-success text-sm mb-1"><DollarSign className="h-4 w-4" /> Fee Revenue (3%)</div>
            <p className="text-2xl font-bold">${totalFeeRevenue.toLocaleString()}</p>
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
          <Card className="border-border/40">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border/40 text-left text-sm text-muted-foreground">
                    <th className="p-4 font-medium">Title</th>
                    <th className="p-4 font-medium">Creator</th>
                    <th className="p-4 font-medium">Status</th>
                    <th className="p-4 font-medium">Trades</th>
                    <th className="p-4 font-medium">Pot Size</th>
                    <th className="p-4 font-medium">Fee Revenue</th>
                    <th className="p-4 font-medium">Created</th>
                    <th className="p-4 font-medium">End Date</th>
                    <th className="p-4 font-medium text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedMarkets.map((market) => (
                    <tr key={market.id} className="border-b border-border/20 hover:bg-muted/30 transition-colors">
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
                    <span className="text-muted-foreground">Markets</span><span className="text-right font-medium">{cat.markets}</span>
                    <span className="text-muted-foreground">Pot Size</span><span className="text-right font-medium">${(cat.volume / 1000000).toFixed(1)}M</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Settings */}
        <TabsContent value="settings" className="space-y-4">
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
