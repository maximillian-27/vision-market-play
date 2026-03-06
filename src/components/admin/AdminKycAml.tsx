import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { AdminFilters } from "./AdminFilters";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { CheckCircle, XCircle, Clock, AlertTriangle } from "lucide-react";
import { toast } from "sonner";

const kycQueue = [
  { id: 1, user: "john@example.com", level: "Enhanced", documents: 3, status: "Pending Review" },
  { id: 2, user: "jane@example.com", level: "Standard", documents: 2, status: "Pending Review" },
  { id: 3, user: "bob@example.com", level: "Enhanced", documents: 4, status: "In Review" },
  { id: 4, user: "alice@example.com", level: "Standard", documents: 2, status: "Approved" },
];

const amlAlerts = [
  { id: 1, user: "0x2c8...d5e9", type: "Structuring", desc: "Multiple deposits below $10K", severity: "Critical", status: "Open" },
  { id: 2, user: "0x6e3...b1f4", type: "High-Risk Jurisdiction", desc: "Deposits from sanctioned IP", severity: "Critical", status: "Investigating" },
  { id: 3, user: "0x8d7...c2a6", type: "Unusual Pattern", desc: "Rapid deposit-withdrawal cycle", severity: "High", status: "Investigating" },
];

const severityColors: Record<string, string> = { Critical: "bg-destructive/10 text-destructive", High: "bg-warning/10 text-warning", Medium: "bg-primary/10 text-primary" };

export const AdminKycAml = () => {
  const [kycFilter, setKycFilter] = useState("all");
  const filteredKyc = kycQueue.filter(k => kycFilter === "all" || k.status.toLowerCase().replace(" ", "") === kycFilter);

  return (
    <div className="space-y-5">
      <AdminFilters showCategory={false} />

      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
        <Card className="border-border/40 bg-warning/5"><CardContent className="p-4"><div className="flex items-center gap-1.5 text-warning text-xs mb-1"><Clock className="h-3.5 w-3.5" /> Pending KYC</div><p className="text-2xl font-bold">{kycQueue.filter(k => k.status === "Pending Review").length}</p></CardContent></Card>
        <Card className="border-border/40 bg-success/5"><CardContent className="p-4"><div className="flex items-center gap-1.5 text-success text-xs mb-1"><CheckCircle className="h-3.5 w-3.5" /> Approved</div><p className="text-2xl font-bold">{kycQueue.filter(k => k.status === "Approved").length}</p></CardContent></Card>
        <Card className="border-border/40 bg-destructive/5"><CardContent className="p-4"><div className="flex items-center gap-1.5 text-destructive text-xs mb-1"><AlertTriangle className="h-3.5 w-3.5" /> AML Alerts</div><p className="text-2xl font-bold">{amlAlerts.length}</p></CardContent></Card>
      </div>

      <h3 className="text-sm font-semibold">KYC Queue</h3>
      <Select value={kycFilter} onValueChange={setKycFilter}>
        <SelectTrigger className="w-40 h-9"><SelectValue /></SelectTrigger>
        <SelectContent><SelectItem value="all">All</SelectItem><SelectItem value="pendingreview">Pending</SelectItem><SelectItem value="inreview">In Review</SelectItem><SelectItem value="approved">Approved</SelectItem></SelectContent>
      </Select>

      <Card className="border-border/40">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead><tr className="border-b border-border/40 text-left text-xs text-muted-foreground"><th className="p-3">User</th><th className="p-3">Level</th><th className="p-3">Docs</th><th className="p-3">Status</th><th className="p-3 text-right">Actions</th></tr></thead>
            <tbody>
              {filteredKyc.map((k) => (
                <tr key={k.id} className="border-b border-border/20 hover:bg-muted/30 transition-colors">
                  <td className="p-3 text-sm">{k.user}</td>
                  <td className="p-3"><Badge variant="outline" className="text-xs">{k.level}</Badge></td>
                  <td className="p-3 text-sm">{k.documents}</td>
                  <td className="p-3"><Badge variant={k.status === "Approved" ? "default" : "secondary"} className="text-xs">{k.status}</Badge></td>
                  <td className="p-3 text-right">
                    <div className="flex items-center justify-end gap-1">
                      <Button size="sm" className="h-7 text-xs gap-1" onClick={() => toast.success("Approved")}><CheckCircle className="h-3 w-3" /> Approve</Button>
                      <Button size="sm" variant="outline" className="h-7 text-xs gap-1 text-destructive" onClick={() => toast.success("Rejected")}><XCircle className="h-3 w-3" /> Reject</Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      <h3 className="text-sm font-semibold">AML Alerts</h3>
      <Card className="border-border/40">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead><tr className="border-b border-border/40 text-left text-xs text-muted-foreground"><th className="p-3">User</th><th className="p-3">Type</th><th className="p-3">Description</th><th className="p-3">Severity</th><th className="p-3">Status</th></tr></thead>
            <tbody>
              {amlAlerts.map((a) => (
                <tr key={a.id} className="border-b border-border/20 hover:bg-muted/30 transition-colors">
                  <td className="p-3 text-sm font-mono">{a.user}</td>
                  <td className="p-3 text-sm">{a.type}</td>
                  <td className="p-3 text-sm text-muted-foreground">{a.desc}</td>
                  <td className="p-3"><Badge className={`text-xs border-0 ${severityColors[a.severity]}`}>{a.severity}</Badge></td>
                  <td className="p-3"><Badge variant="secondary" className="text-xs">{a.status}</Badge></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};
