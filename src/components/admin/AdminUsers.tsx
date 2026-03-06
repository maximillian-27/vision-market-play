import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
  Search, MoreHorizontal, Eye, Users, UserCheck, UserX, Shield,
  ChevronLeft, ChevronRight,
} from "lucide-react";
import { toast } from "sonner";

const users = [
  { id: 1, name: "John Doe", wallet: "0x7a2...f3e1", joined: "2024-03-15", status: "Active", volume: 45200, trades: 234, pnl: 3200, verified: true, source: "Direct", referrer: "—", firstDeposit: "2024-03-16", lifetimeVolume: 45200 },
  { id: 2, name: "Jane Smith", wallet: "0x3b1...c8d2", joined: "2024-06-22", status: "Active", volume: 128000, trades: 890, pnl: 18200, verified: true, source: "Referral", referrer: "PromoQueen", firstDeposit: "2024-06-23", lifetimeVolume: 128000 },
  { id: 3, name: "Bob Wilson", wallet: "0x9f4...a7b3", joined: "2024-09-01", status: "Suspended", volume: 5600, trades: 45, pnl: -800, verified: false, source: "Affiliate", referrer: "ReferKing", firstDeposit: "2024-09-05", lifetimeVolume: 5600 },
  { id: 4, name: "Alice Johnson", wallet: "0x2c8...d5e9", joined: "2024-01-10", status: "Active", volume: 312000, trades: 2100, pnl: 42000, verified: true, source: "Direct", referrer: "—", firstDeposit: "2024-01-11", lifetimeVolume: 312000 },
  { id: 5, name: "Charlie Brown", wallet: "0x6e3...b1f4", joined: "2024-11-05", status: "Active", volume: 8900, trades: 67, pnl: -200, verified: false, source: "Affiliate", referrer: "GrowthHacker", firstDeposit: "2024-11-08", lifetimeVolume: 8900 },
  { id: 6, name: "Diana Prince", wallet: "0x8d7...c2a6", joined: "2024-04-18", status: "Active", volume: 67000, trades: 456, pnl: 8900, verified: true, source: "Referral", referrer: "CryptoGuru", firstDeposit: "2024-04-19", lifetimeVolume: 67000 },
];

const PAGE_SIZE = 5;

export const AdminUsers = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [page, setPage] = useState(1);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<typeof users[0] | null>(null);

  const filtered = users.filter(u => {
    const matchesSearch = u.name.toLowerCase().includes(searchQuery.toLowerCase()) || u.wallet.includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "all" || (statusFilter === "unverified" ? !u.verified : u.status.toLowerCase() === statusFilter);
    return matchesSearch && matchesStatus;
  });

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);
  const avgVolume = users.reduce((a, u) => a + u.volume, 0) / users.length;
  const churnRate = 4.2;
  const unverified = users.filter(u => !u.verified).length;

  const openDrawer = (u: typeof users[0]) => {
    setSelectedUser(u);
    setDrawerOpen(true);
  };

  const sourceColors: Record<string, string> = {
    Direct: "bg-muted text-muted-foreground",
    Referral: "bg-primary/10 text-primary",
    Affiliate: "bg-success/10 text-success",
  };

  return (
    <div className="space-y-5">
      <AdminFilters showCreator={false} />

      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
        <Card className="border-border/40"><CardContent className="p-4"><div className="flex items-center gap-1.5 text-muted-foreground text-xs mb-1"><Users className="h-3.5 w-3.5" /> Total</div><p className="text-2xl font-bold">124.5K</p></CardContent></Card>
        <Card className="border-border/40 bg-success/5"><CardContent className="p-4"><div className="flex items-center gap-1.5 text-success text-xs mb-1"><UserCheck className="h-3.5 w-3.5" /> Active (30d)</div><p className="text-2xl font-bold">89.2K</p></CardContent></Card>
        <Card className="border-border/40"><CardContent className="p-4"><p className="text-xs text-muted-foreground mb-1">Avg Vol/User</p><p className="text-2xl font-bold">${(avgVolume / 1000).toFixed(0)}K</p></CardContent></Card>
        <Card className="border-border/40 bg-destructive/5"><CardContent className="p-4"><p className="text-xs text-muted-foreground mb-1">Churn Rate</p><p className="text-2xl font-bold">{churnRate}%</p></CardContent></Card>
        <Card className="border-border/40 bg-warning/5"><CardContent className="p-4"><div className="flex items-center gap-1.5 text-warning text-xs mb-1"><Shield className="h-3.5 w-3.5" /> Unverified</div><p className="text-2xl font-bold">{unverified}</p></CardContent></Card>
      </div>

      <div className="flex items-center gap-3 flex-wrap">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search users..." value={searchQuery} onChange={(e) => { setSearchQuery(e.target.value); setPage(1); }} className="pl-9 h-9" />
        </div>
        <Select value={statusFilter} onValueChange={(v) => { setStatusFilter(v); setPage(1); }}>
          <SelectTrigger className="w-36 h-9"><SelectValue /></SelectTrigger>
          <SelectContent><SelectItem value="all">All Status</SelectItem><SelectItem value="active">Active</SelectItem><SelectItem value="suspended">Suspended</SelectItem><SelectItem value="unverified">Unverified</SelectItem></SelectContent>
        </Select>
        <ExportCsvButton data={filtered} filename="users" />
      </div>

      <Card className="border-border/40">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border/40 text-left text-xs text-muted-foreground">
                <th className="p-3 font-medium">Name</th><th className="p-3 font-medium">Wallet</th><th className="p-3 font-medium">Source</th><th className="p-3 font-medium">Referrer</th><th className="p-3 font-medium">Joined</th><th className="p-3 font-medium">1st Deposit</th><th className="p-3 font-medium">Lifetime Vol</th><th className="p-3 font-medium">Trades</th><th className="p-3 font-medium">P&L</th><th className="p-3 font-medium">Status</th><th className="p-3 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {paginated.map((u) => (
                <tr key={u.id} className="border-b border-border/20 hover:bg-muted/30 transition-colors">
                  <td className="p-3 font-medium text-sm">{u.name}</td>
                  <td className="p-3 text-sm font-mono text-muted-foreground">{u.wallet}</td>
                  <td className="p-3"><Badge className={`text-[10px] border-0 ${sourceColors[u.source]}`}>{u.source}</Badge></td>
                  <td className="p-3 text-sm text-muted-foreground">{u.referrer}</td>
                  <td className="p-3 text-xs text-muted-foreground">{u.joined}</td>
                  <td className="p-3 text-xs text-muted-foreground">{u.firstDeposit}</td>
                  <td className="p-3 text-sm font-medium">${u.lifetimeVolume.toLocaleString()}</td>
                  <td className="p-3 text-sm">{u.trades}</td>
                  <td className="p-3 text-sm font-medium"><span className={u.pnl >= 0 ? 'text-success' : 'text-destructive'}>{u.pnl >= 0 ? '+' : ''}${u.pnl.toLocaleString()}</span></td>
                  <td className="p-3"><Badge variant={u.status === "Active" ? "default" : "destructive"} className="text-xs">{u.status}</Badge></td>
                  <td className="p-3 text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild><Button variant="ghost" size="icon" className="h-7 w-7"><MoreHorizontal className="h-4 w-4" /></Button></DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="bg-popover">
                        <DropdownMenuItem className="gap-2" onClick={() => openDrawer(u)}><Eye className="h-4 w-4" /> View</DropdownMenuItem>
                        <DropdownMenuItem className="gap-2" onClick={() => toast(`KYC: ${u.name}`)}><Shield className="h-4 w-4" /> KYC Review</DropdownMenuItem>
                        <DropdownMenuItem className="gap-2 text-destructive" onClick={() => toast.success("Suspended")}><UserX className="h-4 w-4" /> Suspend</DropdownMenuItem>
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
            <p className="text-xs text-muted-foreground">{((page - 1) * PAGE_SIZE) + 1}–{Math.min(page * PAGE_SIZE, filtered.length)} of {filtered.length}</p>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" disabled={page === 1} onClick={() => setPage(p => p - 1)}><ChevronLeft className="h-4 w-4" /></Button>
              <span className="text-xs">{page}/{totalPages}</span>
              <Button variant="outline" size="sm" disabled={page === totalPages} onClick={() => setPage(p => p + 1)}><ChevronRight className="h-4 w-4" /></Button>
            </div>
          </div>
        )}
      </Card>

      {selectedUser && (
        <DetailDrawer
          open={drawerOpen}
          onOpenChange={setDrawerOpen}
          title={selectedUser.name}
          badge={{ label: selectedUser.status, variant: selectedUser.status === "Active" ? "default" : "destructive" }}
          fields={[
            { label: "Wallet", value: selectedUser.wallet },
            { label: "Acquisition Source", value: selectedUser.source },
            { label: "Referrer", value: selectedUser.referrer },
            { label: "Joined", value: selectedUser.joined },
            { label: "First Deposit", value: selectedUser.firstDeposit },
            { label: "Lifetime Volume", value: `$${selectedUser.lifetimeVolume.toLocaleString()}` },
            { label: "Trades", value: selectedUser.trades },
            { label: "P&L", value: `${selectedUser.pnl >= 0 ? '+' : ''}$${selectedUser.pnl.toLocaleString()}` },
            { label: "Verified", value: selectedUser.verified ? "Yes" : "No" },
          ]}
        />
      )}
    </div>
  );
};
