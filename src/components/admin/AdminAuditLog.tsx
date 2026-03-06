import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { AdminFilters } from "./AdminFilters";
import { Search, Shield, Plus } from "lucide-react";
import { toast } from "sonner";

const admins = [
  { id: 1, name: "Admin Primary", email: "admin@pollgy.com", role: "Super Admin", lastLogin: "2025-01-15 14:32", mfa: true },
  { id: 2, name: "Moderator 1", email: "mod@pollgy.com", role: "Moderator", lastLogin: "2025-01-15 12:18", mfa: true },
  { id: 3, name: "Finance Lead", email: "finance@pollgy.com", role: "Finance", lastLogin: "2025-01-14 16:20", mfa: true },
  { id: 4, name: "Support Agent 1", email: "support1@pollgy.com", role: "Support", lastLogin: "2025-01-15 10:45", mfa: false },
];

const auditLog = [
  { id: 1, admin: "admin@pollgy.com", action: "Resolved market: Bitcoin Price EOY → Yes", timestamp: "2025-01-15 14:32" },
  { id: 2, admin: "admin@pollgy.com", action: "Suspended user: 0x2c8...d5e9", timestamp: "2025-01-15 12:18" },
  { id: 3, admin: "mod@pollgy.com", action: "Approved payout: $3,200 to SportsAnalyst", timestamp: "2025-01-15 10:45" },
  { id: 4, admin: "admin@pollgy.com", action: "Updated platform fee: 3% → 3%", timestamp: "2025-01-14 16:20" },
  { id: 5, admin: "mod@pollgy.com", action: "Approved creator: MarketMaven", timestamp: "2025-01-14 14:10" },
  { id: 6, admin: "finance@pollgy.com", action: "Exported transactions CSV", timestamp: "2025-01-14 11:30" },
];

const roleColors: Record<string, string> = {
  "Super Admin": "bg-destructive/10 text-destructive",
  Moderator: "bg-primary/10 text-primary",
  Finance: "bg-success/10 text-success",
  Support: "bg-warning/10 text-warning",
};

export const AdminAuditLog = () => {
  const [search, setSearch] = useState("");
  const filtered = auditLog.filter(e => search === "" || e.action.toLowerCase().includes(search.toLowerCase()) || e.admin.includes(search.toLowerCase()));

  return (
    <div className="space-y-5">
      <AdminFilters showGeo={false} showCategory={false} />

      {/* Admin Users */}
      <Card className="border-border/40">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-base flex items-center gap-2"><Shield className="h-4 w-4" /> Admin Users</CardTitle>
            <Button size="sm" className="gap-1.5 text-xs" onClick={() => toast("Add admin")}><Plus className="h-3.5 w-3.5" /> Add Admin</Button>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead><tr className="border-b border-border/40 text-left text-xs text-muted-foreground"><th className="p-3">Name</th><th className="p-3">Email</th><th className="p-3">Role</th><th className="p-3">Last Login</th><th className="p-3">MFA</th></tr></thead>
              <tbody>
                {admins.map((a) => (
                  <tr key={a.id} className="border-b border-border/20 hover:bg-muted/30 transition-colors">
                    <td className="p-3 font-medium text-sm">{a.name}</td>
                    <td className="p-3 text-sm text-muted-foreground">{a.email}</td>
                    <td className="p-3"><Badge className={`text-xs border-0 ${roleColors[a.role]}`}>{a.role}</Badge></td>
                    <td className="p-3 text-xs text-muted-foreground">{a.lastLogin}</td>
                    <td className="p-3">{a.mfa ? <Badge className="text-xs bg-success/10 text-success border-0">Enabled</Badge> : <Badge variant="outline" className="text-xs">Off</Badge>}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Audit Log */}
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold">Audit Log</h3>
        <div className="relative w-64">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search actions..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-9 h-9" />
        </div>
      </div>

      <Card className="border-border/40">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead><tr className="border-b border-border/40 text-left text-xs text-muted-foreground"><th className="p-3">Admin</th><th className="p-3">Action</th><th className="p-3">Timestamp</th></tr></thead>
            <tbody>
              {filtered.map((e) => (
                <tr key={e.id} className="border-b border-border/20 hover:bg-muted/30 transition-colors">
                  <td className="p-3 text-sm text-muted-foreground">{e.admin}</td>
                  <td className="p-3 text-sm">{e.action}</td>
                  <td className="p-3 text-xs text-muted-foreground">{e.timestamp}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};
