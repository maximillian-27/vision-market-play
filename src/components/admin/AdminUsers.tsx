import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Search, MoreHorizontal, Eye, Mail, Ban, Download, UserPlus, Shield, ChevronLeft, ChevronRight } from "lucide-react";
import { toast } from "sonner";

type KycStatus = "Not Started" | "Pending" | "Approved" | "Rejected";

const users = [
  { id: 1, name: "John Doe", email: "john@example.com", joined: "2024-01-15", status: "Active", portfolio: 12450, trades: 47, verified: true, kyc: "Approved" as KycStatus },
  { id: 2, name: "Jane Smith", email: "jane@example.com", joined: "2024-01-14", status: "Active", portfolio: 8900, trades: 32, verified: true, kyc: "Approved" as KycStatus },
  { id: 3, name: "Bob Wilson", email: "bob@example.com", joined: "2024-01-14", status: "Pending", portfolio: 500, trades: 3, verified: false, kyc: "Pending" as KycStatus },
  { id: 4, name: "Alice Johnson", email: "alice@example.com", joined: "2024-01-13", status: "Suspended", portfolio: 0, trades: 0, verified: true, kyc: "Rejected" as KycStatus },
  { id: 5, name: "Charlie Brown", email: "charlie@example.com", joined: "2024-01-13", status: "Active", portfolio: 34500, trades: 156, verified: true, kyc: "Approved" as KycStatus },
  { id: 6, name: "Diana Prince", email: "diana@example.com", joined: "2024-01-12", status: "Active", portfolio: 22300, trades: 89, verified: true, kyc: "Approved" as KycStatus },
  { id: 7, name: "Edward Norton", email: "edward@example.com", joined: "2024-01-11", status: "Active", portfolio: 5600, trades: 21, verified: false, kyc: "Not Started" as KycStatus },
  { id: 8, name: "Fiona Apple", email: "fiona@example.com", joined: "2024-01-10", status: "Active", portfolio: 18200, trades: 67, verified: true, kyc: "Approved" as KycStatus },
  { id: 9, name: "George Lucas", email: "george@example.com", joined: "2024-01-09", status: "Active", portfolio: 42100, trades: 201, verified: true, kyc: "Approved" as KycStatus },
  { id: 10, name: "Hannah Montana", email: "hannah@example.com", joined: "2024-01-08", status: "Pending", portfolio: 100, trades: 1, verified: false, kyc: "Pending" as KycStatus },
  { id: 11, name: "Ivan Drago", email: "ivan@example.com", joined: "2024-01-07", status: "Active", portfolio: 7800, trades: 34, verified: true, kyc: "Approved" as KycStatus },
  { id: 12, name: "Julia Roberts", email: "julia@example.com", joined: "2024-01-06", status: "Active", portfolio: 15600, trades: 78, verified: true, kyc: "Approved" as KycStatus },
];

const PAGE_SIZE = 7;

const kycVariant = (kyc: KycStatus) => {
  switch (kyc) {
    case "Approved": return "default";
    case "Pending": return "secondary";
    case "Rejected": return "destructive";
    default: return "outline";
  }
};

const downloadCSV = (data: typeof users) => {
  const headers = ["Name", "Email", "Joined", "Status", "Portfolio", "Trades", "KYC"];
  const rows = data.map(u => [u.name, u.email, u.joined, u.status, u.portfolio, u.trades, u.kyc]);
  const csv = [headers, ...rows].map(r => r.join(",")).join("\n");
  const blob = new Blob([csv], { type: "text/csv" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "users-export.csv";
  a.click();
  URL.revokeObjectURL(url);
  toast.success("Users exported successfully");
};

export const AdminUsers = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [page, setPage] = useState(1);

  const filteredUsers = users.filter((user) => {
    const matchesSearch = user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "all" || user.status.toLowerCase() === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const totalPages = Math.ceil(filteredUsers.length / PAGE_SIZE);
  const paginatedUsers = filteredUsers.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-end gap-3 flex-wrap">
        <div className="relative flex-1 sm:w-64">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search users..." value={searchQuery} onChange={(e) => { setSearchQuery(e.target.value); setPage(1); }} className="pl-9 h-9" />
        </div>
        <Select value={statusFilter} onValueChange={(v) => { setStatusFilter(v); setPage(1); }}>
          <SelectTrigger className="w-28 h-9"><SelectValue /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="suspended">Suspended</SelectItem>
          </SelectContent>
        </Select>
        <Button variant="outline" size="sm" className="gap-2" onClick={() => downloadCSV(filteredUsers)}>
          <Download className="h-4 w-4" /> Export
        </Button>
        <Button size="sm" className="gap-2"><UserPlus className="h-4 w-4" /> Add User</Button>
      </div>

      {/* Desktop Table */}
      <Card className="border-border/40 hidden md:block">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border/40 text-left text-sm text-muted-foreground">
                <th className="p-4 font-medium">User</th>
                <th className="p-4 font-medium">Joined</th>
                <th className="p-4 font-medium">Status</th>
                <th className="p-4 font-medium">Portfolio</th>
                <th className="p-4 font-medium">Trades</th>
                <th className="p-4 font-medium">KYC</th>
                <th className="p-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {paginatedUsers.map((user) => (
                <tr key={user.id} className="border-b border-border/20 hover:bg-muted/30 transition-colors">
                  <td className="p-4">
                    <div>
                      <p className="font-medium">{user.name}</p>
                      <p className="text-sm text-muted-foreground">{user.email}</p>
                    </div>
                  </td>
                  <td className="p-4 text-sm">{user.joined}</td>
                  <td className="p-4">
                    <Badge variant={user.status === "Active" ? "default" : user.status === "Pending" ? "secondary" : "destructive"} className="text-xs">{user.status}</Badge>
                  </td>
                  <td className="p-4 text-sm font-medium">${user.portfolio.toLocaleString()}</td>
                  <td className="p-4 text-sm">{user.trades}</td>
                  <td className="p-4">
                    <Badge variant={kycVariant(user.kyc)} className="text-xs">{user.kyc}</Badge>
                  </td>
                  <td className="p-4 text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8"><MoreHorizontal className="h-4 w-4" /></Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="bg-popover">
                        <DropdownMenuItem className="gap-2"><Eye className="h-4 w-4" /> View Profile</DropdownMenuItem>
                        <DropdownMenuItem className="gap-2"><Shield className="h-4 w-4" /> Review KYC</DropdownMenuItem>
                        <DropdownMenuItem className="gap-2"><Mail className="h-4 w-4" /> Send Email</DropdownMenuItem>
                        <DropdownMenuItem className="gap-2 text-destructive"><Ban className="h-4 w-4" /> Suspend</DropdownMenuItem>
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
            Showing {((page - 1) * PAGE_SIZE) + 1}–{Math.min(page * PAGE_SIZE, filteredUsers.length)} of {filteredUsers.length}
          </p>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" disabled={page === 1} onClick={() => setPage(p => p - 1)}>
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <span className="text-sm font-medium">{page} / {totalPages}</span>
            <Button variant="outline" size="sm" disabled={page === totalPages} onClick={() => setPage(p => p + 1)}>
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </Card>

      {/* Mobile Cards */}
      <div className="md:hidden space-y-3">
        {paginatedUsers.map((user) => (
          <Card key={user.id} className="border-border/40 p-4">
            <div className="flex items-start justify-between mb-3">
              <div>
                <p className="font-medium">{user.name}</p>
                <p className="text-sm text-muted-foreground">{user.email}</p>
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-8 w-8"><MoreHorizontal className="h-4 w-4" /></Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="bg-popover">
                  <DropdownMenuItem className="gap-2"><Eye className="h-4 w-4" /> View Profile</DropdownMenuItem>
                  <DropdownMenuItem className="gap-2"><Shield className="h-4 w-4" /> Review KYC</DropdownMenuItem>
                  <DropdownMenuItem className="gap-2"><Mail className="h-4 w-4" /> Send Email</DropdownMenuItem>
                  <DropdownMenuItem className="gap-2 text-destructive"><Ban className="h-4 w-4" /> Suspend</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div>
                <span className="text-muted-foreground">Status:</span>{" "}
                <Badge variant={user.status === "Active" ? "default" : user.status === "Pending" ? "secondary" : "destructive"} className="text-xs">{user.status}</Badge>
              </div>
              <div>
                <span className="text-muted-foreground">KYC:</span>{" "}
                <Badge variant={kycVariant(user.kyc)} className="text-xs">{user.kyc}</Badge>
              </div>
              <div><span className="text-muted-foreground">Portfolio:</span> <span className="font-medium">${user.portfolio.toLocaleString()}</span></div>
              <div><span className="text-muted-foreground">Trades:</span> {user.trades}</div>
              <div className="col-span-2"><span className="text-muted-foreground">Joined:</span> {user.joined}</div>
            </div>
          </Card>
        ))}
        {/* Mobile Pagination */}
        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            {((page - 1) * PAGE_SIZE) + 1}–{Math.min(page * PAGE_SIZE, filteredUsers.length)} of {filteredUsers.length}
          </p>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" disabled={page === 1} onClick={() => setPage(p => p - 1)}><ChevronLeft className="h-4 w-4" /></Button>
            <Button variant="outline" size="sm" disabled={page === totalPages} onClick={() => setPage(p => p + 1)}><ChevronRight className="h-4 w-4" /></Button>
          </div>
        </div>
      </div>
    </div>
  );
};
