import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { AdminFilters } from "./AdminFilters";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal, Search as SearchIcon, Ban, AlertTriangle, Eye, ShieldAlert } from "lucide-react";
import { toast } from "sonner";

const alerts = [
  { id: 1, user: "0x2c8...d5e9", reason: "Multiple accounts detected", risk: 85, status: "Investigating", date: "2025-01-15" },
  { id: 2, user: "0x6e3...b1f4", reason: "Rapid deposit/withdrawal cycle", risk: 72, status: "Flagged", date: "2025-01-14" },
  { id: 3, user: "0x8d7...c2a6", reason: "Unusual betting pattern", risk: 68, status: "Monitoring", date: "2025-01-13" },
  { id: 4, user: "0x1a5...e4d8", reason: "IP address mismatch", risk: 55, status: "Resolved", date: "2025-01-12" },
];

export const AdminFraud = () => {
  const [statusFilter, setStatusFilter] = useState("all");

  const filtered = alerts.filter(a => statusFilter === "all" || a.status.toLowerCase() === statusFilter);

  return (
    <div className="space-y-5">
      <AdminFilters showCategory={false} />

      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
        <Card className="border-border/40 bg-destructive/5"><CardContent className="p-4"><p className="text-xs text-muted-foreground mb-1">Flagged Users</p><p className="text-2xl font-bold">{alerts.filter(a => a.status === "Flagged").length}</p></CardContent></Card>
        <Card className="border-border/40 bg-warning/5"><CardContent className="p-4"><p className="text-xs text-muted-foreground mb-1">Investigating</p><p className="text-2xl font-bold">{alerts.filter(a => a.status === "Investigating").length}</p></CardContent></Card>
        <Card className="border-border/40"><CardContent className="p-4"><p className="text-xs text-muted-foreground mb-1">AML Alerts</p><p className="text-2xl font-bold">3</p></CardContent></Card>
      </div>

      <Select value={statusFilter} onValueChange={setStatusFilter}>
        <SelectTrigger className="w-40 h-9"><SelectValue /></SelectTrigger>
        <SelectContent><SelectItem value="all">All</SelectItem><SelectItem value="investigating">Investigating</SelectItem><SelectItem value="flagged">Flagged</SelectItem><SelectItem value="monitoring">Monitoring</SelectItem><SelectItem value="resolved">Resolved</SelectItem></SelectContent>
      </Select>

      <Card className="border-border/40">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border/40 text-left text-xs text-muted-foreground">
                <th className="p-3 font-medium">User</th><th className="p-3 font-medium">Reason</th><th className="p-3 font-medium">Risk Score</th><th className="p-3 font-medium">Status</th><th className="p-3 font-medium">Date</th><th className="p-3 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((a) => (
                <tr key={a.id} className="border-b border-border/20 hover:bg-muted/30 transition-colors">
                  <td className="p-3 text-sm font-mono">{a.user}</td>
                  <td className="p-3 text-sm">{a.reason}</td>
                  <td className="p-3"><Badge className={`text-xs border-0 ${a.risk >= 80 ? 'bg-destructive/10 text-destructive' : a.risk >= 60 ? 'bg-warning/10 text-warning' : 'bg-muted text-muted-foreground'}`}>{a.risk}/100</Badge></td>
                  <td className="p-3"><Badge variant={a.status === "Resolved" ? "default" : "secondary"} className="text-xs">{a.status}</Badge></td>
                  <td className="p-3 text-xs text-muted-foreground">{a.date}</td>
                  <td className="p-3 text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild><Button variant="ghost" size="icon" className="h-7 w-7"><MoreHorizontal className="h-4 w-4" /></Button></DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="bg-popover">
                        <DropdownMenuItem className="gap-2" onClick={() => toast("Investigating")}><Eye className="h-4 w-4" /> Investigate</DropdownMenuItem>
                        <DropdownMenuItem className="gap-2 text-destructive" onClick={() => toast.success("Blocked")}><Ban className="h-4 w-4" /> Block User</DropdownMenuItem>
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
