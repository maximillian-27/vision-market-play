import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Search, MoreHorizontal, Eye, Download, ArrowUpRight, ArrowDownRight, RefreshCw } from "lucide-react";

const transactions = [
  { id: "TXN-001", user: "john@example.com", type: "Deposit", method: "Bank Transfer", amount: 5000, status: "Completed", date: "2024-01-15 14:32" },
  { id: "TXN-002", user: "jane@example.com", type: "Withdrawal", method: "Crypto (BTC)", amount: 2500, status: "Pending", date: "2024-01-15 13:45" },
  { id: "TXN-003", user: "bob@example.com", type: "Trade", method: "Market Buy", amount: 1200, status: "Completed", date: "2024-01-15 12:18" },
  { id: "TXN-004", user: "alice@example.com", type: "Withdrawal", method: "Bank Transfer", amount: 15000, status: "Under Review", date: "2024-01-15 11:02" },
  { id: "TXN-005", user: "charlie@example.com", type: "Deposit", method: "Credit Card", amount: 1000, status: "Completed", date: "2024-01-15 10:45" },
  { id: "TXN-006", user: "diana@example.com", type: "Trade", method: "Market Sell", amount: 3400, status: "Completed", date: "2024-01-15 09:30" },
  { id: "TXN-007", user: "edward@example.com", type: "Withdrawal", method: "Crypto (ETH)", amount: 8900, status: "Failed", date: "2024-01-15 08:15" },
];

const typeIcons = {
  Deposit: ArrowDownRight,
  Withdrawal: ArrowUpRight,
  Trade: RefreshCw,
};

const typeColors = {
  Deposit: "text-success",
  Withdrawal: "text-destructive",
  Trade: "text-primary",
};

export const AdminTransactions = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");

  const filteredTransactions = transactions.filter((txn) => {
    const matchesSearch = txn.user.toLowerCase().includes(searchQuery.toLowerCase()) ||
      txn.id.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = typeFilter === "all" || txn.type.toLowerCase() === typeFilter;
    return matchesSearch && matchesType;
  });

  const totalDeposits = transactions.filter(t => t.type === "Deposit" && t.status === "Completed").reduce((acc, t) => acc + t.amount, 0);
  const totalWithdrawals = transactions.filter(t => t.type === "Withdrawal" && t.status === "Completed").reduce((acc, t) => acc + t.amount, 0);
  const pendingCount = transactions.filter(t => t.status === "Pending" || t.status === "Under Review").length;

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <h2 className="text-xl font-semibold">Transaction History</h2>
        <div className="flex items-center gap-3 w-full sm:w-auto flex-wrap">
          <div className="relative flex-1 sm:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search transactions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 h-9"
            />
          </div>
          <Select value={typeFilter} onValueChange={setTypeFilter}>
            <SelectTrigger className="w-32 h-9">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="deposit">Deposits</SelectItem>
              <SelectItem value="withdrawal">Withdrawals</SelectItem>
              <SelectItem value="trade">Trades</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="sm" className="gap-2">
            <Download className="h-4 w-4" />
            Export
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="border-border/40 bg-success/5">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 text-success text-sm mb-1">
              <ArrowDownRight className="h-4 w-4" />
              Total Deposits
            </div>
            <p className="text-2xl font-bold">${totalDeposits.toLocaleString()}</p>
          </CardContent>
        </Card>
        <Card className="border-border/40 bg-destructive/5">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 text-destructive text-sm mb-1">
              <ArrowUpRight className="h-4 w-4" />
              Total Withdrawals
            </div>
            <p className="text-2xl font-bold">${totalWithdrawals.toLocaleString()}</p>
          </CardContent>
        </Card>
        <Card className="border-border/40">
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground mb-1">Net Flow</p>
            <p className={`text-2xl font-bold ${totalDeposits - totalWithdrawals >= 0 ? 'text-success' : 'text-destructive'}`}>
              ${(totalDeposits - totalWithdrawals).toLocaleString()}
            </p>
          </CardContent>
        </Card>
        <Card className="border-border/40 bg-warning/5">
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground mb-1">Pending Review</p>
            <p className="text-2xl font-bold">{pendingCount}</p>
          </CardContent>
        </Card>
      </div>

      {/* Transactions List */}
      <Card className="border-border/40">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border/40 text-left text-sm text-muted-foreground">
                <th className="p-4 font-medium">Transaction ID</th>
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
                const Icon = typeIcons[txn.type as keyof typeof typeIcons];
                const color = typeColors[txn.type as keyof typeof typeColors];
                return (
                  <tr key={txn.id} className="border-b border-border/20 hover:bg-muted/30 transition-colors">
                    <td className="p-4">
                      <code className="text-xs bg-muted px-2 py-1 rounded">{txn.id}</code>
                    </td>
                    <td className="p-4 text-sm">{txn.user}</td>
                    <td className="p-4">
                      <div className={`flex items-center gap-1 ${color}`}>
                        <Icon className="h-3 w-3" />
                        <span className="text-sm">{txn.type}</span>
                      </div>
                    </td>
                    <td className="p-4 text-sm text-muted-foreground">{txn.method}</td>
                    <td className="p-4 text-sm font-medium">${txn.amount.toLocaleString()}</td>
                    <td className="p-4">
                      <Badge
                        variant={
                          txn.status === "Completed" ? "default" :
                          txn.status === "Pending" ? "secondary" :
                          txn.status === "Under Review" ? "outline" : "destructive"
                        }
                        className="text-xs"
                      >
                        {txn.status}
                      </Badge>
                    </td>
                    <td className="p-4 text-sm text-muted-foreground">{txn.date}</td>
                    <td className="p-4 text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="bg-popover">
                          <DropdownMenuItem className="gap-2">
                            <Eye className="h-4 w-4" /> View Details
                          </DropdownMenuItem>
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
    </div>
  );
};
