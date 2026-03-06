import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { AdminFilters } from "./AdminFilters";
import { ExportCsvButton } from "./ExportCsvButton";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal, CheckCircle, RefreshCw } from "lucide-react";
import { toast } from "sonner";

const payouts = [
  { id: 1, name: "CryptoGuru", type: "Creator", period: "Jan 13–19", amount: 2450, status: "Pending" },
  { id: 2, name: "SportsAnalyst", type: "Creator", period: "Jan 13–19", amount: 3200, status: "Pending" },
  { id: 3, name: "PromoQueen", type: "Affiliate", period: "Jan 13–19", amount: 1800, status: "Pending" },
  { id: 4, name: "TechOracle", type: "Creator", period: "Jan 6–12", amount: 1560, status: "Paid" },
  { id: 5, name: "ReferKing", type: "Affiliate", period: "Jan 6–12", amount: 890, status: "Paid" },
  { id: 6, name: "CryptoGuru", type: "Creator", period: "Dec 30–Jan 5", amount: 2100, status: "Paid" },
  { id: 7, name: "SportsAnalyst", type: "Creator", period: "Dec 30–Jan 5", amount: 2800, status: "Failed" },
];

export const AdminPayouts = () => {
  const [statusFilter, setStatusFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");

  const filtered = payouts.filter((p) => {
    const matchesStatus = statusFilter === "all" || p.status.toLowerCase() === statusFilter;
    const matchesType = typeFilter === "all" || p.type.toLowerCase() === typeFilter;
    return matchesStatus && matchesType;
  });

  const pending = payouts.filter(p => p.status === "Pending");
  const paidWeek = payouts.filter(p => p.status === "Paid" && p.period.includes("Jan 13")).reduce((a, p) => a + p.amount, 0);
  const failed = payouts.filter(p => p.status === "Failed").length;
  const totalMonth = payouts.filter(p => p.status === "Paid").reduce((a, p) => a + p.amount, 0);

  return (
    <div className="space-y-5">
      <AdminFilters showGeo={false} showCategory={false} />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="border-border/40 bg-warning/5"><CardContent className="p-4"><p className="text-xs text-muted-foreground mb-1">Pending Payouts</p><p className="text-2xl font-bold">{pending.length}</p><p className="text-xs text-muted-foreground">${pending.reduce((a, p) => a + p.amount, 0).toLocaleString()}</p></CardContent></Card>
        <Card className="border-border/40 bg-success/5"><CardContent className="p-4"><p className="text-xs text-muted-foreground mb-1">Paid This Week</p><p className="text-2xl font-bold">${paidWeek.toLocaleString()}</p></CardContent></Card>
        <Card className="border-border/40 bg-destructive/5"><CardContent className="p-4"><p className="text-xs text-muted-foreground mb-1">Failed</p><p className="text-2xl font-bold">{failed}</p></CardContent></Card>
        <Card className="border-border/40"><CardContent className="p-4"><p className="text-xs text-muted-foreground mb-1">Total Paid (Month)</p><p className="text-2xl font-bold">${totalMonth.toLocaleString()}</p></CardContent></Card>
      </div>

      <div className="flex items-center gap-3">
        <Select value={typeFilter} onValueChange={setTypeFilter}>
          <SelectTrigger className="w-36 h-9"><SelectValue /></SelectTrigger>
          <SelectContent><SelectItem value="all">All Types</SelectItem><SelectItem value="creator">Creators</SelectItem><SelectItem value="affiliate">Affiliates</SelectItem></SelectContent>
        </Select>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-36 h-9"><SelectValue /></SelectTrigger>
          <SelectContent><SelectItem value="all">All Status</SelectItem><SelectItem value="pending">Pending</SelectItem><SelectItem value="paid">Paid</SelectItem><SelectItem value="failed">Failed</SelectItem></SelectContent>
        </Select>
        <ExportCsvButton data={filtered} filename="payouts" />
      </div>

      <Card className="border-border/40">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border/40 text-left text-xs text-muted-foreground">
                <th className="p-3 font-medium">Name</th><th className="p-3 font-medium">Type</th><th className="p-3 font-medium">Period</th><th className="p-3 font-medium">Amount</th><th className="p-3 font-medium">Status</th><th className="p-3 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((p) => (
                <tr key={p.id} className="border-b border-border/20 hover:bg-muted/30 transition-colors">
                  <td className="p-3 font-medium text-sm">{p.name}</td>
                  <td className="p-3"><Badge variant="outline" className="text-xs">{p.type}</Badge></td>
                  <td className="p-3 text-sm text-muted-foreground">{p.period}</td>
                  <td className="p-3 text-sm font-medium">${p.amount.toLocaleString()}</td>
                  <td className="p-3"><Badge variant={p.status === "Paid" ? "default" : p.status === "Failed" ? "destructive" : "secondary"} className="text-xs">{p.status}</Badge></td>
                  <td className="p-3 text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild><Button variant="ghost" size="icon" className="h-7 w-7"><MoreHorizontal className="h-4 w-4" /></Button></DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="bg-popover">
                        {p.status === "Pending" && <DropdownMenuItem className="gap-2" onClick={() => toast.success("Approved")}><CheckCircle className="h-4 w-4" /> Approve</DropdownMenuItem>}
                        {p.status === "Failed" && <DropdownMenuItem className="gap-2" onClick={() => toast.success("Retrying...")}><RefreshCw className="h-4 w-4" /> Retry</DropdownMenuItem>}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};
