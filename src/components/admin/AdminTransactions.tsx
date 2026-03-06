import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AdminFilters } from "./AdminFilters";
import { ExportCsvButton } from "./ExportCsvButton";
import { DetailDrawer } from "./DetailDrawer";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Search, MoreHorizontal, Eye, ArrowUpRight, ArrowDownRight,
  Percent, AlertTriangle, CheckCircle, XCircle, ChevronLeft, ChevronRight, ShieldAlert,
} from "lucide-react";
import { toast } from "sonner";

const transactions = [
  { id: "TXN-001", wallet: "0x7a2...f3e1", type: "Deposit", asset: "ETH", network: "Ethereum", amount: 5000, status: "Completed", date: "2025-01-15 14:32", txHash: "0xabc1...7d3f", riskFlag: "" },
  { id: "TXN-002", wallet: "0x3b1...c8d2", type: "Withdrawal", asset: "BTC", network: "Bitcoin", amount: 12500, status: "Pending", date: "2025-01-15 13:45", txHash: "bc1q...x9m2", riskFlag: "Large transaction" },
  { id: "TXN-003", wallet: "0x9f4...a7b3", type: "Fee", asset: "USDT", network: "Ethereum", amount: 360, status: "Completed", date: "2025-01-15 12:18", txHash: "0xdef4...2a1b", riskFlag: "" },
  { id: "TXN-004", wallet: "0x2c8...d5e9", type: "Withdrawal", asset: "USDT", network: "Ethereum", amount: 15000, status: "Under Review", date: "2025-01-15 11:02", txHash: "0x7b2e...f4c8", riskFlag: "Under manual review" },
  { id: "TXN-005", wallet: "0x6e3...b1f4", type: "Deposit", asset: "SOL", network: "Solana", amount: 3200, status: "Completed", date: "2025-01-15 10:45", txHash: "5Ght...Kp2w", riskFlag: "" },
  { id: "TXN-006", wallet: "0x8d7...c2a6", type: "Fee", asset: "ETH", network: "Ethereum", amount: 840, status: "Completed", date: "2025-01-15 09:30", txHash: "0xc3a1...9e5d", riskFlag: "" },
  { id: "TXN-007", wallet: "0x1a5...e4d8", type: "Withdrawal", asset: "ETH", network: "Ethereum", amount: 8900, status: "Failed", date: "2025-01-15 08:15", txHash: "0x9f1c...3b7a", riskFlag: "Repeated withdrawal attempts" },
  { id: "TXN-008", wallet: "0x4f2...g7h1", type: "Deposit", asset: "BTC", network: "Bitcoin", amount: 25000, status: "Completed", date: "2025-01-14 16:20", txHash: "bc1q...m4n7", riskFlag: "Large transaction" },
];

const manualReviewItems = [
  { id: 1, user: "0x3b1...c8d2", amount: 12500, asset: "BTC", reason: "Large transaction ($12.5K withdrawal)", status: "Pending Review" },
  { id: 2, user: "0x2c8...d5e9", amount: 15000, asset: "USDT", reason: "Under manual review — flagged by compliance", status: "Pending Review" },
  { id: 3, user: "0x1a5...e4d8", amount: 8900, asset: "ETH", reason: "Repeated withdrawal attempts (3 in 1 hour)", status: "Pending Review" },
  { id: 4, user: "0x4f2...g7h1", amount: 25000, asset: "BTC", reason: "Large transaction ($25K deposit)", status: "Under Review" },
];

const typeColors: Record<string, string> = { Deposit: "text-success", Withdrawal: "text-destructive", Fee: "text-primary" };
const PAGE_SIZE = 5;

export const AdminTransactions = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [page, setPage] = useState(1);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selectedTxn, setSelectedTxn] = useState<typeof transactions[0] | null>(null);
  const [reviewItems, setReviewItems] = useState(manualReviewItems);

  const filtered = transactions.filter((t) => {
    const matchesSearch = t.wallet.includes(searchQuery.toLowerCase()) || t.id.toLowerCase().includes(searchQuery.toLowerCase()) || t.txHash.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = typeFilter === "all" || t.type.toLowerCase() === typeFilter;
    const matchesStatus = statusFilter === "all" || t.status.toLowerCase().replace(" ", "") === statusFilter;
    return matchesSearch && matchesType && matchesStatus;
  });

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const deposits = transactions.filter(t => t.type === "Deposit" && t.status === "Completed");
  const withdrawals = transactions.filter(t => t.type === "Withdrawal" && t.status === "Completed");
  const totalDep = deposits.reduce((a, t) => a + t.amount, 0);
  const totalWith = withdrawals.reduce((a, t) => a + t.amount, 0);
  const pendingCount = transactions.filter(t => t.status === "Pending" || t.status === "Under Review").length;
  const feeRevenue = transactions.filter(t => t.type === "Fee" && t.status === "Completed").reduce((a, t) => a + t.amount, 0);

  const openDrawer = (t: typeof transactions[0]) => {
    setSelectedTxn(t);
    setDrawerOpen(true);
  };

  const handleReviewAction = (id: number, action: "approve" | "reject") => {
    setReviewItems(prev => prev.filter(r => r.id !== id));
    toast.success(action === "approve" ? "Transaction approved" : "Transaction rejected");
  };

  return (
    <div className="space-y-5">
      <AdminFilters />

      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
        <Card className="border-border/40 bg-success/5"><CardContent className="p-4"><div className="flex items-center gap-1.5 text-success text-xs mb-1"><ArrowDownRight className="h-3.5 w-3.5" /> Deposits</div><p className="text-2xl font-bold">{deposits.length}</p><p className="text-xs text-muted-foreground">Total: ${totalDep.toLocaleString()}</p></CardContent></Card>
        <Card className="border-border/40 bg-destructive/5"><CardContent className="p-4"><div className="flex items-center gap-1.5 text-destructive text-xs mb-1"><ArrowUpRight className="h-3.5 w-3.5" /> Withdrawals</div><p className="text-2xl font-bold">{withdrawals.length}</p><p className="text-xs text-muted-foreground">Total: ${totalWith.toLocaleString()}</p></CardContent></Card>
        <Card className="border-border/40"><CardContent className="p-4"><p className="text-xs text-muted-foreground mb-1">Net Flow</p><p className={`text-2xl font-bold ${totalDep - totalWith >= 0 ? 'text-success' : 'text-destructive'}`}>${(totalDep - totalWith).toLocaleString()}</p></CardContent></Card>
        <Card className="border-border/40 bg-warning/5"><CardContent className="p-4"><p className="text-xs text-muted-foreground mb-1">Pending</p><p className="text-2xl font-bold">{pendingCount}</p></CardContent></Card>
        <Card className="border-border/40 bg-primary/5"><CardContent className="p-4"><div className="flex items-center gap-1.5 text-primary text-xs mb-1"><Percent className="h-3.5 w-3.5" /> Fee Revenue</div><p className="text-2xl font-bold">${feeRevenue.toLocaleString()}</p></CardContent></Card>
      </div>

      <Tabs defaultValue="all" className="space-y-4">
        <TabsList>
          <TabsTrigger value="all">All Transactions</TabsTrigger>
          <TabsTrigger value="review" className="gap-1.5">
            Manual Review
            {reviewItems.length > 0 && <Badge className="ml-1 h-5 px-1.5 text-[10px] bg-warning/15 text-warning border-0">{reviewItems.length}</Badge>}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          <div className="flex items-center gap-3 flex-wrap">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search by wallet, ID, or tx hash..." value={searchQuery} onChange={(e) => { setSearchQuery(e.target.value); setPage(1); }} className="pl-9 h-9" />
            </div>
            <Select value={typeFilter} onValueChange={(v) => { setTypeFilter(v); setPage(1); }}>
              <SelectTrigger className="w-32 h-9"><SelectValue /></SelectTrigger>
              <SelectContent><SelectItem value="all">All Types</SelectItem><SelectItem value="deposit">Deposits</SelectItem><SelectItem value="withdrawal">Withdrawals</SelectItem><SelectItem value="fee">Fees</SelectItem></SelectContent>
            </Select>
            <Select value={statusFilter} onValueChange={(v) => { setStatusFilter(v); setPage(1); }}>
              <SelectTrigger className="w-36 h-9"><SelectValue /></SelectTrigger>
              <SelectContent><SelectItem value="all">All Status</SelectItem><SelectItem value="completed">Completed</SelectItem><SelectItem value="pending">Pending</SelectItem><SelectItem value="underreview">Under Review</SelectItem><SelectItem value="failed">Failed</SelectItem></SelectContent>
            </Select>
            <ExportCsvButton data={filtered} filename="transactions" />
          </div>

          <Card className="border-border/40">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border/40 text-left text-xs text-muted-foreground">
                    <th className="p-3 font-medium">ID</th><th className="p-3 font-medium">Wallet</th><th className="p-3 font-medium">Type</th><th className="p-3 font-medium">Asset</th><th className="p-3 font-medium">Network</th><th className="p-3 font-medium">Amount</th><th className="p-3 font-medium">Tx Hash</th><th className="p-3 font-medium">Risk</th><th className="p-3 font-medium">Status</th><th className="p-3 font-medium">Date</th><th className="p-3 font-medium text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {paginated.map((t) => (
                    <tr key={t.id} className="border-b border-border/20 hover:bg-muted/30 transition-colors">
                      <td className="p-3"><code className="text-xs bg-muted px-1.5 py-0.5 rounded">{t.id}</code></td>
                      <td className="p-3 text-sm font-mono">{t.wallet}</td>
                      <td className="p-3"><span className={`text-sm ${typeColors[t.type]}`}>{t.type}</span></td>
                      <td className="p-3"><Badge variant="outline" className="text-xs">{t.asset}</Badge></td>
                      <td className="p-3 text-xs text-muted-foreground">{t.network}</td>
                      <td className="p-3 text-sm font-medium">${t.amount.toLocaleString()}</td>
                      <td className="p-3"><code className="text-[10px] bg-muted px-1 py-0.5 rounded font-mono">{t.txHash}</code></td>
                      <td className="p-3">{t.riskFlag && <Badge className="text-[10px] border-0 bg-warning/10 text-warning">{t.riskFlag}</Badge>}</td>
                      <td className="p-3"><Badge variant={t.status === "Completed" ? "default" : t.status === "Failed" ? "destructive" : "secondary"} className="text-xs">{t.status}</Badge></td>
                      <td className="p-3 text-xs text-muted-foreground">{t.date}</td>
                      <td className="p-3 text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild><Button variant="ghost" size="icon" className="h-7 w-7"><MoreHorizontal className="h-4 w-4" /></Button></DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="bg-popover">
                            <DropdownMenuItem className="gap-2" onClick={() => openDrawer(t)}><Eye className="h-4 w-4" /> View</DropdownMenuItem>
                            <DropdownMenuItem className="gap-2" onClick={() => toast.success("Flagged")}><AlertTriangle className="h-4 w-4" /> Flag</DropdownMenuItem>
                            {(t.status === "Pending" || t.status === "Under Review") && <>
                              <DropdownMenuItem className="gap-2 text-success" onClick={() => toast.success("Approved")}><CheckCircle className="h-4 w-4" /> Approve</DropdownMenuItem>
                              <DropdownMenuItem className="gap-2 text-destructive" onClick={() => toast.success("Rejected")}><XCircle className="h-4 w-4" /> Reject</DropdownMenuItem>
                            </>}
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

        {/* Manual Review Tab */}
        <TabsContent value="review" className="space-y-4">
          <Card className="border-border/40">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border/40 text-left text-xs text-muted-foreground">
                    <th className="p-3 font-medium">User</th><th className="p-3 font-medium">Amount</th><th className="p-3 font-medium">Asset</th><th className="p-3 font-medium">Reason Flagged</th><th className="p-3 font-medium">Status</th><th className="p-3 font-medium text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {reviewItems.length === 0 ? (
                    <tr><td colSpan={6} className="p-8 text-center text-sm text-muted-foreground"><CheckCircle className="h-8 w-8 text-success mx-auto mb-2" />No items pending review</td></tr>
                  ) : reviewItems.map((r) => (
                    <tr key={r.id} className="border-b border-border/20 hover:bg-muted/30 transition-colors">
                      <td className="p-3 text-sm font-mono">{r.user}</td>
                      <td className="p-3 text-sm font-medium">${r.amount.toLocaleString()}</td>
                      <td className="p-3"><Badge variant="outline" className="text-xs">{r.asset}</Badge></td>
                      <td className="p-3 text-sm">{r.reason}</td>
                      <td className="p-3"><Badge variant="secondary" className="text-xs">{r.status}</Badge></td>
                      <td className="p-3 text-right">
                        <div className="flex items-center justify-end gap-1">
                          <Button size="sm" className="h-7 text-xs gap-1" onClick={() => handleReviewAction(r.id, "approve")}><CheckCircle className="h-3 w-3" /> Approve</Button>
                          <Button size="sm" variant="outline" className="h-7 text-xs gap-1 text-destructive" onClick={() => handleReviewAction(r.id, "reject")}><XCircle className="h-3 w-3" /> Reject</Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Transaction Detail Drawer */}
      {selectedTxn && (
        <DetailDrawer
          open={drawerOpen}
          onOpenChange={setDrawerOpen}
          title={`Transaction ${selectedTxn.id}`}
          badge={{ label: selectedTxn.status, variant: selectedTxn.status === "Completed" ? "default" : selectedTxn.status === "Failed" ? "destructive" : "secondary" }}
          fields={[
            { label: "Transaction ID", value: selectedTxn.id },
            { label: "Wallet", value: selectedTxn.wallet },
            { label: "Type", value: selectedTxn.type },
            { label: "Asset", value: selectedTxn.asset },
            { label: "Network", value: selectedTxn.network },
            { label: "Amount", value: `$${selectedTxn.amount.toLocaleString()}` },
            { label: "Tx Hash", value: selectedTxn.txHash },
            { label: "Date", value: selectedTxn.date },
            { label: "Risk Flag", value: selectedTxn.riskFlag || "None" },
          ]}
        />
      )}
    </div>
  );
};
