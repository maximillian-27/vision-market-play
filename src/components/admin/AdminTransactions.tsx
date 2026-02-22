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
import { Search, MoreHorizontal, Eye, Download, ArrowUpRight, ArrowDownRight, Receipt, Shield, ChevronLeft, ChevronRight, Wallet, Percent, AlertTriangle, CheckCircle, XCircle, Lock } from "lucide-react";
import { toast } from "sonner";

const transactions = [
  { id: "TXN-001", user: "0x7a2...f3e1", type: "Deposit", method: "ETH", amount: 5000, status: "Completed", date: "2025-01-15 14:32" },
  { id: "TXN-002", user: "0x3b1...c8d2", type: "Withdrawal", method: "BTC", amount: 12500, status: "Pending", date: "2025-01-15 13:45" },
  { id: "TXN-003", user: "0x9f4...a7b3", type: "Fee", method: "USDT", amount: 360, status: "Completed", date: "2025-01-15 12:18" },
  { id: "TXN-004", user: "0x2c8...d5e9", type: "Withdrawal", method: "USDT", amount: 15000, status: "Under Review", date: "2025-01-15 11:02" },
  { id: "TXN-005", user: "0x6e3...b1f4", type: "Deposit", method: "SOL", amount: 3200, status: "Completed", date: "2025-01-15 10:45" },
  { id: "TXN-006", user: "0x8d7...c2a6", type: "Fee", method: "ETH", amount: 840, status: "Completed", date: "2025-01-15 09:30" },
  { id: "TXN-007", user: "0x1a5...e4d8", type: "Withdrawal", method: "ETH", amount: 8900, status: "Failed", date: "2025-01-15 08:15" },
  { id: "TXN-008", user: "0x4f2...g7h1", type: "Deposit", method: "BTC", amount: 25000, status: "Completed", date: "2025-01-14 16:20" },
  { id: "TXN-009", user: "0x5c9...a3b7", type: "Deposit", method: "USDT", amount: 7500, status: "Completed", date: "2025-01-14 14:10" },
  { id: "TXN-010", user: "0xb2e...f6c3", type: "Fee", method: "SOL", amount: 150, status: "Completed", date: "2025-01-14 11:55" },
];

const typeIcons: Record<string, any> = { Deposit: ArrowDownRight, Withdrawal: ArrowUpRight, Fee: Percent };
const typeColors: Record<string, string> = { Deposit: "text-success", Withdrawal: "text-destructive", Fee: "text-primary" };

const wallets = [
  { name: "Hot Wallet (ETH)", address: "0x742d35Cc6634C0532925a3b844Bc9e7595f", balance: "$2,450,000", chain: "Ethereum", inflow24h: "+$120K", outflow24h: "-$45K", lastTxn: "2 min ago" },
  { name: "Hot Wallet (BTC)", address: "bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh", balance: "$1,890,000", chain: "Bitcoin", inflow24h: "+$89K", outflow24h: "-$32K", lastTxn: "15 min ago" },
  { name: "Cold Storage", address: "0x89205A3A3b2A69De6Dbf7f01ED13B2108B2c43e7", balance: "$12,500,000", chain: "Multi-chain", inflow24h: "+$0", outflow24h: "-$0", lastTxn: "3 days ago" },
  { name: "USDT Reserve", address: "TN3W4H6rK2ce4vX9YnFQHwKENnHjoxb3m9", balance: "$5,200,000", chain: "Tron", inflow24h: "+$380K", outflow24h: "-$125K", lastTxn: "8 min ago" },
];

const PAGE_SIZE = 5;

const downloadCSV = (data: typeof transactions) => {
  const headers = ["ID", "User", "Type", "Method", "Amount", "Status", "Date"];
  const rows = data.map(t => [t.id, t.user, t.type, t.method, t.amount, t.status, t.date]);
  const csv = [headers, ...rows].map(r => r.join(",")).join("\n");
  const blob = new Blob([csv], { type: "text/csv" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url; a.download = "transactions-export.csv"; a.click();
  URL.revokeObjectURL(url);
  toast.success("Transactions exported successfully");
};

export const AdminTransactions = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [timePeriod, setTimePeriod] = useState("all");
  const [page, setPage] = useState(1);

  const filteredTransactions = transactions.filter((txn) => {
    const matchesSearch = txn.user.toLowerCase().includes(searchQuery.toLowerCase()) || txn.id.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = typeFilter === "all" || txn.type.toLowerCase() === typeFilter;
    const matchesStatus = statusFilter === "all" || txn.status.toLowerCase().replace(" ", "") === statusFilter;
    return matchesSearch && matchesType && matchesStatus;
  });

  const totalPages = Math.ceil(filteredTransactions.length / PAGE_SIZE);
  const paginatedTransactions = filteredTransactions.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const totalDeposits = transactions.filter(t => t.type === "Deposit" && t.status === "Completed").reduce((acc, t) => acc + t.amount, 0);
  const totalWithdrawals = transactions.filter(t => t.type === "Withdrawal" && t.status === "Completed").reduce((acc, t) => acc + t.amount, 0);
  const totalFees = transactions.filter(t => t.type === "Fee" && t.status === "Completed").reduce((acc, t) => acc + t.amount, 0);
  const pendingCount = transactions.filter(t => t.status === "Pending" || t.status === "Under Review").length;

  return (
    <div className="space-y-6">
      {/* Time period selector + analytics */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          {["24h", "30d", "90d", "all"].map((p) => (
            <Button key={p} variant={timePeriod === p ? "default" : "outline"} size="sm" onClick={() => setTimePeriod(p)}>
              {p === "all" ? "All Time" : p}
            </Button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
        <Card className="border-border/40 bg-success/5">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 text-success text-sm mb-1"><ArrowDownRight className="h-4 w-4" /> Total Deposits</div>
            <p className="text-2xl font-bold">${totalDeposits.toLocaleString()}</p>
          </CardContent>
        </Card>
        <Card className="border-border/40 bg-destructive/5">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 text-destructive text-sm mb-1"><ArrowUpRight className="h-4 w-4" /> Total Withdrawals</div>
            <p className="text-2xl font-bold">${totalWithdrawals.toLocaleString()}</p>
          </CardContent>
        </Card>
        <Card className="border-border/40">
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground mb-1">Net Flow</p>
            <p className={`text-2xl font-bold ${totalDeposits - totalWithdrawals >= 0 ? 'text-success' : 'text-destructive'}`}>${(totalDeposits - totalWithdrawals).toLocaleString()}</p>
          </CardContent>
        </Card>
        <Card className="border-border/40 bg-warning/5">
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground mb-1">Pending Review</p>
            <p className="text-2xl font-bold">{pendingCount}</p>
          </CardContent>
        </Card>
        <Card className="border-border/40 bg-primary/5">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 text-primary text-sm mb-1"><Percent className="h-4 w-4" /> Fee Revenue (3%)</div>
            <p className="text-2xl font-bold">${totalFees.toLocaleString()}</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="transactions" className="space-y-4">
        <TabsList className="bg-muted/50 p-1">
          <TabsTrigger value="transactions" className="data-[state=active]:bg-background gap-2"><Receipt className="h-4 w-4" /> Transactions</TabsTrigger>
          <TabsTrigger value="wallets" className="data-[state=active]:bg-background gap-2"><Wallet className="h-4 w-4" /> Wallets</TabsTrigger>
          <TabsTrigger value="risk" className="data-[state=active]:bg-background gap-2"><Shield className="h-4 w-4" /> Risk & Limits</TabsTrigger>
        </TabsList>

        <TabsContent value="transactions" className="space-y-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-end gap-3 flex-wrap">
            <div className="relative flex-1 sm:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search by wallet or ID..." value={searchQuery} onChange={(e) => { setSearchQuery(e.target.value); setPage(1); }} className="pl-9 h-9" />
            </div>
            <Select value={typeFilter} onValueChange={(v) => { setTypeFilter(v); setPage(1); }}>
              <SelectTrigger className="w-32 h-9"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="deposit">Deposits</SelectItem>
                <SelectItem value="withdrawal">Withdrawals</SelectItem>
                <SelectItem value="fee">Fees</SelectItem>
              </SelectContent>
            </Select>
            <Select value={statusFilter} onValueChange={(v) => { setStatusFilter(v); setPage(1); }}>
              <SelectTrigger className="w-36 h-9"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="underreview">Under Review</SelectItem>
                <SelectItem value="failed">Failed</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" size="sm" className="gap-2" onClick={() => downloadCSV(filteredTransactions)}>
              <Download className="h-4 w-4" /> Export
            </Button>
          </div>
          <Card className="border-border/40">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border/40 text-left text-sm text-muted-foreground">
                    <th className="p-4 font-medium">ID</th>
                    <th className="p-4 font-medium">User</th>
                    <th className="p-4 font-medium">Type</th>
                    <th className="p-4 font-medium">Method</th>
                    <th className="p-4 font-medium">Amount</th>
                    <th className="p-4 font-medium">Status</th>
                    <th className="p-4 font-medium">Date</th>
                    <th className="p-4 font-medium text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedTransactions.map((txn) => {
                    const Icon = typeIcons[txn.type];
                    const color = typeColors[txn.type];
                    return (
                      <tr key={txn.id} className="border-b border-border/20 hover:bg-muted/30 transition-colors">
                        <td className="p-4"><code className="text-xs bg-muted px-2 py-1 rounded">{txn.id}</code></td>
                        <td className="p-4 text-sm font-mono">{txn.user}</td>
                        <td className="p-4"><div className={`flex items-center gap-1 ${color}`}><Icon className="h-3 w-3" /><span className="text-sm">{txn.type}</span></div></td>
                        <td className="p-4"><Badge variant="outline" className="text-xs">{txn.method}</Badge></td>
                        <td className="p-4 text-sm font-medium">${txn.amount.toLocaleString()}</td>
                        <td className="p-4">
                          <Badge variant={txn.status === "Completed" ? "default" : txn.status === "Pending" ? "secondary" : txn.status === "Under Review" ? "outline" : "destructive"} className="text-xs">{txn.status}</Badge>
                        </td>
                        <td className="p-4 text-sm text-muted-foreground">{txn.date}</td>
                        <td className="p-4 text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild><Button variant="ghost" size="icon" className="h-8 w-8"><MoreHorizontal className="h-4 w-4" /></Button></DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="bg-popover">
                              <DropdownMenuItem className="gap-2" onClick={() => toast(`Opening transaction ${txn.id}`)}><Eye className="h-4 w-4" /> View Details</DropdownMenuItem>
                              <DropdownMenuItem className="gap-2" onClick={() => toast.success(`Transaction ${txn.id} flagged for review`)}><AlertTriangle className="h-4 w-4" /> Flag Transaction</DropdownMenuItem>
                              {(txn.status === "Pending" || txn.status === "Under Review") && (
                                <DropdownMenuItem className="gap-2 text-success" onClick={() => toast.success(`Transaction ${txn.id} approved`)}><CheckCircle className="h-4 w-4" /> Approve</DropdownMenuItem>
                              )}
                              {(txn.status === "Pending" || txn.status === "Under Review") && (
                                <DropdownMenuItem className="gap-2 text-destructive" onClick={() => toast.success(`Transaction ${txn.id} rejected`)}><XCircle className="h-4 w-4" /> Reject</DropdownMenuItem>
                              )}
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            <div className="flex items-center justify-between px-4 py-3 border-t border-border/40">
              <p className="text-sm text-muted-foreground">Showing {((page - 1) * PAGE_SIZE) + 1}–{Math.min(page * PAGE_SIZE, filteredTransactions.length)} of {filteredTransactions.length}</p>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" disabled={page === 1} onClick={() => setPage(p => p - 1)}><ChevronLeft className="h-4 w-4" /></Button>
                <span className="text-sm font-medium">{page} / {totalPages}</span>
                <Button variant="outline" size="sm" disabled={page === totalPages} onClick={() => setPage(p => p + 1)}><ChevronRight className="h-4 w-4" /></Button>
              </div>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="wallets" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {wallets.map((w) => (
              <Card key={w.name} className="border-border/40">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <p className="font-semibold">{w.name}</p>
                      <p className="text-xs text-muted-foreground">{w.chain}</p>
                    </div>
                    <Badge variant="default" className="text-xs">Active</Badge>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between"><span className="text-muted-foreground">Address</span><code className="text-xs bg-muted px-2 py-1 rounded">{w.address.slice(0, 12)}...{w.address.slice(-6)}</code></div>
                    <div className="flex justify-between"><span className="text-muted-foreground">Balance</span><span className="font-bold text-primary">{w.balance}</span></div>
                    <div className="flex justify-between"><span className="text-muted-foreground">24h In</span><span className="text-success font-medium">{w.inflow24h}</span></div>
                    <div className="flex justify-between"><span className="text-muted-foreground">24h Out</span><span className="text-destructive font-medium">{w.outflow24h}</span></div>
                    <div className="flex justify-between"><span className="text-muted-foreground">Last Txn</span><span>{w.lastTxn}</span></div>
                  </div>
                  <div className="flex gap-2 mt-3">
                    <Button size="sm" variant="outline" className="gap-1 flex-1" onClick={() => toast(`Initiating transfer from ${w.name}`)}><ArrowUpRight className="h-3 w-3" /> Transfer</Button>
                    <Button size="sm" variant="outline" className="gap-1 flex-1 text-destructive" onClick={() => toast.success(`${w.name} frozen`)}><Lock className="h-3 w-3" /> Freeze</Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="risk" className="space-y-4">
          <Card className="border-border/40 max-w-2xl">
            <CardContent className="p-6 space-y-4">
              <h3 className="font-semibold text-lg">Risk & Limits Configuration</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div><Label>Min Deposit (USD)</Label><Input defaultValue="10" type="number" className="mt-1" /></div>
                <div><Label>Max Deposit (USD)</Label><Input defaultValue="100000" type="number" className="mt-1" /></div>
                <div><Label>Daily Withdrawal Limit (USD)</Label><Input defaultValue="50000" type="number" className="mt-1" /></div>
                <div><Label>KYC Threshold (USD)</Label><Input defaultValue="10000" type="number" className="mt-1" /></div>
                <div className="sm:col-span-2 flex items-center justify-between"><span className="text-sm">Auto-approve withdrawals under $1,000</span><Switch defaultChecked /></div>
                <div className="sm:col-span-2 flex items-center justify-between"><span className="text-sm">Require 2FA for withdrawals over $5,000</span><Switch defaultChecked /></div>
                <div className="sm:col-span-2 flex items-center justify-between"><span className="text-sm">Enable on-chain fraud detection</span><Switch defaultChecked /></div>
              </div>
              <Button className="w-full" onClick={() => toast.success("Risk configuration saved")}>Save Configuration</Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
