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
import { Search, MoreHorizontal, Eye, Pause, CheckCircle, XCircle, TrendingUp, Clock, Settings, Tag, Plus, ChevronLeft, ChevronRight } from "lucide-react";
import { toast } from "sonner";

const markets = [
  { id: 1, title: "Will Bitcoin reach $100K by end of 2024?", creator: "CryptoGuru", status: "Active", volume: 45000, trades: 1234, endDate: "2024-12-31" },
  { id: 2, title: "Will AI replace most software jobs by 2030?", creator: "TechOracle", status: "Active", volume: 32000, trades: 890, endDate: "2030-01-01" },
  { id: 3, title: "Will SpaceX land on Mars by 2026?", creator: "SpaceWatch", status: "Active", volume: 28000, trades: 756, endDate: "2026-12-31" },
  { id: 4, title: "US Election 2024 Winner", creator: "PoliticalPredict", status: "Resolved", volume: 125000, trades: 5600, endDate: "2024-11-05" },
  { id: 5, title: "Super Bowl 2024 Champion", creator: "SportsAnalyst", status: "Resolved", volume: 89000, trades: 3400, endDate: "2024-02-11" },
  { id: 6, title: "Will Tesla stock hit $300?", creator: "MarketMaven", status: "Paused", volume: 15000, trades: 450, endDate: "2024-06-30" },
  { id: 7, title: "Will Ethereum flip Bitcoin?", creator: "CryptoGuru", status: "Active", volume: 22000, trades: 678, endDate: "2025-12-31" },
  { id: 8, title: "Next FIFA World Cup host?", creator: "SportsAnalyst", status: "Active", volume: 18000, trades: 520, endDate: "2026-06-01" },
];

const pendingMarkets = [
  { id: 7, title: "Will Apple release a foldable iPhone?", creator: "TechOracle", submitted: "2024-01-14", category: "Tech" },
  { id: 8, title: "NBA Championship 2025 Winner", creator: "SportsAnalyst", submitted: "2024-01-15", category: "Sports" },
  { id: 9, title: "Will ETH surpass $5K?", creator: "CryptoGuru", submitted: "2024-01-15", category: "Crypto" },
];

const categories = [
  { name: "Sports", markets: 234, volume: 1200000, active: true },
  { name: "Crypto", markets: 189, volume: 3400000, active: true },
  { name: "Politics", markets: 78, volume: 890000, active: true },
  { name: "Tech", markets: 156, volume: 670000, active: true },
  { name: "Entertainment", markets: 45, volume: 120000, active: true },
  { name: "Science", markets: 23, volume: 56000, active: false },
];

const PAGE_SIZE = 5;

export const AdminMarkets = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [page, setPage] = useState(1);

  const filteredMarkets = markets.filter((market) => {
    const matchesSearch = market.title.toLowerCase().includes(searchQuery.toLowerCase()) || market.creator.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "all" || market.status.toLowerCase() === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const totalPages = Math.ceil(filteredMarkets.length / PAGE_SIZE);
  const paginatedMarkets = filteredMarkets.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  return (
    <div className="space-y-6">
      <Tabs defaultValue="all" className="space-y-4">
        <TabsList className="bg-muted/50 p-1">
          <TabsTrigger value="all" className="data-[state=active]:bg-background gap-2"><TrendingUp className="h-4 w-4" /> All Markets</TabsTrigger>
          <TabsTrigger value="pending" className="data-[state=active]:bg-background gap-2"><Clock className="h-4 w-4" /> Pending Approval</TabsTrigger>
          <TabsTrigger value="categories" className="data-[state=active]:bg-background gap-2"><Tag className="h-4 w-4" /> Categories</TabsTrigger>
          <TabsTrigger value="settings" className="data-[state=active]:bg-background gap-2"><Settings className="h-4 w-4" /> Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
            <div className="relative flex-1 w-full sm:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search markets..." value={searchQuery} onChange={(e) => { setSearchQuery(e.target.value); setPage(1); }} className="pl-9 h-9" />
            </div>
            <Select value={statusFilter} onValueChange={(v) => { setStatusFilter(v); setPage(1); }}>
              <SelectTrigger className="w-28 h-9"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="paused">Paused</SelectItem>
                <SelectItem value="resolved">Resolved</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Card className="border-border/40">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border/40 text-left text-sm text-muted-foreground">
                    <th className="p-4 font-medium">Market</th>
                    <th className="p-4 font-medium">Creator</th>
                    <th className="p-4 font-medium">Status</th>
                    <th className="p-4 font-medium">Pot Size</th>
                    <th className="p-4 font-medium">Tickets</th>
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
                      <td className="p-4 text-sm font-medium">${market.volume.toLocaleString()}</td>
                      <td className="p-4 text-sm">{market.trades.toLocaleString()}</td>
                      <td className="p-4 text-sm">{market.endDate}</td>
                      <td className="p-4 text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild><Button variant="ghost" size="icon" className="h-8 w-8"><MoreHorizontal className="h-4 w-4" /></Button></DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="bg-popover">
                            <DropdownMenuItem className="gap-2"><Eye className="h-4 w-4" /> View</DropdownMenuItem>
                            <DropdownMenuItem className="gap-2"><Pause className="h-4 w-4" /> Pause</DropdownMenuItem>
                            <DropdownMenuItem className="gap-2"><CheckCircle className="h-4 w-4" /> Resolve</DropdownMenuItem>
                            <DropdownMenuItem className="gap-2 text-destructive"><XCircle className="h-4 w-4" /> Cancel</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {/* Pagination */}
            <div className="flex items-center justify-between px-4 py-3 border-t border-border/40">
              <p className="text-sm text-muted-foreground">
                Showing {((page - 1) * PAGE_SIZE) + 1}–{Math.min(page * PAGE_SIZE, filteredMarkets.length)} of {filteredMarkets.length}
              </p>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" disabled={page === 1} onClick={() => setPage(p => p - 1)}><ChevronLeft className="h-4 w-4" /></Button>
                <span className="text-sm font-medium">{page} / {totalPages}</span>
                <Button variant="outline" size="sm" disabled={page === totalPages} onClick={() => setPage(p => p + 1)}><ChevronRight className="h-4 w-4" /></Button>
              </div>
            </div>
          </Card>
        </TabsContent>

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

        <TabsContent value="categories" className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Market Categories</h3>
            <Button size="sm" className="gap-2"><Plus className="h-4 w-4" /> Add Category</Button>
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

        <TabsContent value="settings" className="space-y-4">
          <Card className="border-border/40 max-w-2xl">
            <CardContent className="p-6 space-y-4">
              <h3 className="font-semibold text-lg">Market Settings</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div><Label>Min Bet Amount</Label><Input defaultValue="1" type="number" className="mt-1" /></div>
                <div><Label>Max Bet Amount</Label><Input defaultValue="50000" type="number" className="mt-1" /></div>
                <div><Label>Platform Fee (%)</Label><Input defaultValue="2" type="number" className="mt-1" /></div>
                <div><Label>Resolution Timeframe (days)</Label><Input defaultValue="7" type="number" className="mt-1" /></div>
                <div className="sm:col-span-2 flex items-center justify-between"><span className="text-sm">Auto-approve verified creators</span><Switch defaultChecked /></div>
                <div className="sm:col-span-2 flex items-center justify-between"><span className="text-sm">Require KYC for markets {'>'} $10K</span><Switch defaultChecked /></div>
              </div>
              <Button className="w-full" onClick={() => toast.success("Market settings saved")}>Save Settings</Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
