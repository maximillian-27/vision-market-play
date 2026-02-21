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
import { Search, MoreHorizontal, Eye, Download, ArrowUpRight, ArrowDownRight, RefreshCw, Receipt, CreditCard, Shield } from "lucide-react";

const transactions = [
  { id: "TXN-001", user: "john@example.com", type: "Deposit", method: "Bank Transfer", amount: 5000, status: "Completed", date: "2024-01-15 14:32" },
  { id: "TXN-002", user: "jane@example.com", type: "Withdrawal", method: "Crypto (BTC)", amount: 2500, status: "Pending", date: "2024-01-15 13:45" },
  { id: "TXN-003", user: "bob@example.com", type: "Trade", method: "Market Buy", amount: 1200, status: "Completed", date: "2024-01-15 12:18" },
  { id: "TXN-004", user: "alice@example.com", type: "Withdrawal", method: "Bank Transfer", amount: 15000, status: "Under Review", date: "2024-01-15 11:02" },
  { id: "TXN-005", user: "charlie@example.com", type: "Deposit", method: "Credit Card", amount: 1000, status: "Completed", date: "2024-01-15 10:45" },
  { id: "TXN-006", user: "diana@example.com", type: "Trade", method: "Market Sell", amount: 3400, status: "Completed", date: "2024-01-15 09:30" },
  { id: "TXN-007", user: "edward@example.com", type: "Withdrawal", method: "Crypto (ETH)", amount: 8900, status: "Failed", date: "2024-01-15 08:15" },
];

const typeIcons: Record<string, any> = { Deposit: ArrowDownRight, Withdrawal: ArrowUpRight, Trade: RefreshCw };
const typeColors: Record<string, string> = { Deposit: "text-success", Withdrawal: "text-destructive", Trade: "text-primary" };

const psps = [
  { name: "Stripe", type: "Card Processing", status: "Active", txnCount: 34500, volume: 2300000, health: "Healthy" },
  { name: "PayPal", type: "E-Wallet", status: "Active", txnCount: 12300, volume: 890000, health: "Healthy" },
  { name: "Coinbase Commerce", type: "Crypto", status: "Active", txnCount: 5600, volume: 1200000, health: "Degraded" },
  { name: "Bank Transfer", type: "Wire", status: "Active", txnCount: 890, volume: 3400000, health: "Healthy" },
];

export const AdminTransactions = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");

  const filteredTransactions = transactions.filter((txn) => {
    const matchesSearch = txn.user.toLowerCase().includes(searchQuery.toLowerCase()) || txn.id.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = typeFilter === "all" || txn.type.toLowerCase() === typeFilter;
    return matchesSearch && matchesType;
  });

  const totalDeposits = transactions.filter(t => t.type === "Deposit" && t.status === "Completed").reduce((acc, t) => acc + t.amount, 0);
  const totalWithdrawals = transactions.filter(t => t.type === "Withdrawal" && t.status === "Completed").reduce((acc, t) => acc + t.amount, 0);
  const pendingCount = transactions.filter(t => t.status === "Pending" || t.status === "Under Review").length;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
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
      </div>

      <Tabs defaultValue="transactions" className="space-y-4">
        <TabsList className="bg-muted/50 p-1">
          <TabsTrigger value="transactions" className="data-[state=active]:bg-background gap-2"><Receipt className="h-4 w-4" /> Transactions</TabsTrigger>
          <TabsTrigger value="psp" className="data-[state=active]:bg-background gap-2"><CreditCard className="h-4 w-4" /> PSP Config</TabsTrigger>
          <TabsTrigger value="risk" className="data-[state=active]:bg-background gap-2"><Shield className="h-4 w-4" /> Risk & Limits</TabsTrigger>
        </TabsList>

        <TabsContent value="transactions" className="space-y-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-end gap-3 flex-wrap">
            <div className="relative flex-1 sm:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search transactions..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="pl-9 h-9" />
            </div>
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="w-32 h-9"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="deposit">Deposits</SelectItem>
                <SelectItem value="withdrawal">Withdrawals</SelectItem>
                <SelectItem value="trade">Trades</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" size="sm" className="gap-2"><Download className="h-4 w-4" /> Export</Button>
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
                  {filteredTransactions.map((txn) => {
                    const Icon = typeIcons[txn.type];
                    const color = typeColors[txn.type];
                    return (
                      <tr key={txn.id} className="border-b border-border/20 hover:bg-muted/30 transition-colors">
                        <td className="p-4"><code className="text-xs bg-muted px-2 py-1 rounded">{txn.id}</code></td>
                        <td className="p-4 text-sm">{txn.user}</td>
                        <td className="p-4"><div className={`flex items-center gap-1 ${color}`}><Icon className="h-3 w-3" /><span className="text-sm">{txn.type}</span></div></td>
                        <td className="p-4 text-sm text-muted-foreground">{txn.method}</td>
                        <td className="p-4 text-sm font-medium">${txn.amount.toLocaleString()}</td>
                        <td className="p-4">
                          <Badge variant={txn.status === "Completed" ? "default" : txn.status === "Pending" ? "secondary" : txn.status === "Under Review" ? "outline" : "destructive"} className="text-xs">{txn.status}</Badge>
                        </td>
                        <td className="p-4 text-sm text-muted-foreground">{txn.date}</td>
                        <td className="p-4 text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild><Button variant="ghost" size="icon" className="h-8 w-8"><MoreHorizontal className="h-4 w-4" /></Button></DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="bg-popover">
                              <DropdownMenuItem className="gap-2"><Eye className="h-4 w-4" /> View Details</DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="psp" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {psps.map((psp) => (
              <Card key={psp.name} className="border-border/40">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <p className="font-semibold">{psp.name}</p>
                      <p className="text-xs text-muted-foreground">{psp.type}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant={psp.health === "Healthy" ? "default" : "destructive"} className="text-xs">{psp.health}</Badge>
                      <Switch defaultChecked={psp.status === "Active"} />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-y-1 text-sm">
                    <span className="text-muted-foreground">Transactions</span><span className="text-right font-medium">{psp.txnCount.toLocaleString()}</span>
                    <span className="text-muted-foreground">Volume</span><span className="text-right font-medium">${(psp.volume / 1000000).toFixed(1)}M</span>
                  </div>
                  <Button variant="outline" size="sm" className="w-full mt-3">Configure</Button>
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
                <div>
                  <Label>Min Deposit</Label>
                  <Input defaultValue="10" type="number" className="mt-1" />
                </div>
                <div>
                  <Label>Max Deposit</Label>
                  <Input defaultValue="100000" type="number" className="mt-1" />
                </div>
                <div>
                  <Label>Daily Withdrawal Limit</Label>
                  <Input defaultValue="50000" type="number" className="mt-1" />
                </div>
                <div>
                  <Label>KYC Threshold</Label>
                  <Input defaultValue="10000" type="number" className="mt-1" />
                </div>
                <div className="sm:col-span-2 flex items-center justify-between">
                  <span className="text-sm">Auto-approve withdrawals under $1,000</span>
                  <Switch defaultChecked />
                </div>
                <div className="sm:col-span-2 flex items-center justify-between">
                  <span className="text-sm">Require 2FA for withdrawals over $5,000</span>
                  <Switch defaultChecked />
                </div>
                <div className="sm:col-span-2 flex items-center justify-between">
                  <span className="text-sm">Enable fraud detection</span>
                  <Switch defaultChecked />
                </div>
              </div>
              <Button className="w-full">Save Configuration</Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
