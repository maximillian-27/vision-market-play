import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { AdminFilters } from "./AdminFilters";
import { Plus } from "lucide-react";
import { toast } from "sonner";

const campaigns = [
  { id: 1, name: "Welcome Series", type: "Email", status: "Active", sent: 4560, opened: 2340, clicked: 890 },
  { id: 2, name: "Re-engagement", type: "Push", status: "Active", sent: 1200, opened: 450, clicked: 120 },
  { id: 3, name: "Deposit Bonus", type: "Email", status: "Scheduled", sent: 0, opened: 0, clicked: 0 },
  { id: 4, name: "VIP Promotion", type: "SMS", status: "Completed", sent: 89, opened: 78, clicked: 45 },
  { id: 5, name: "Creator Onboarding", type: "Email", status: "Active", sent: 156, opened: 120, clicked: 45 },
  { id: 6, name: "Affiliate Boost", type: "Push", status: "Active", sent: 89, opened: 65, clicked: 28 },
];

export const AdminCampaigns = () => {
  return (
    <div className="space-y-5">
      <AdminFilters showGeo={false} showCategory={false} />

      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">{campaigns.length} campaigns</p>
        <Button size="sm" className="gap-1.5" onClick={() => toast("Campaign builder")}><Plus className="h-3.5 w-3.5" /> New Campaign</Button>
      </div>

      <Card className="border-border/40">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border/40 text-left text-xs text-muted-foreground">
                <th className="p-3 font-medium">Campaign</th><th className="p-3 font-medium">Type</th><th className="p-3 font-medium">Status</th><th className="p-3 font-medium">Sent</th><th className="p-3 font-medium">Open Rate</th><th className="p-3 font-medium">Click Rate</th><th className="p-3 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {campaigns.map((c) => (
                <tr key={c.id} className="border-b border-border/20 hover:bg-muted/30 transition-colors">
                  <td className="p-3 font-medium text-sm">{c.name}</td>
                  <td className="p-3"><Badge variant="outline" className="text-xs">{c.type}</Badge></td>
                  <td className="p-3"><Badge variant={c.status === "Active" ? "default" : c.status === "Scheduled" ? "secondary" : "outline"} className="text-xs">{c.status}</Badge></td>
                  <td className="p-3 text-sm">{c.sent.toLocaleString()}</td>
                  <td className="p-3 text-sm font-medium">{c.sent > 0 ? `${((c.opened / c.sent) * 100).toFixed(1)}%` : "—"}</td>
                  <td className="p-3 text-sm font-medium">{c.sent > 0 ? `${((c.clicked / c.sent) * 100).toFixed(1)}%` : "—"}</td>
                  <td className="p-3 text-right"><Button variant="ghost" size="sm" className="text-xs" onClick={() => toast(`Managing: ${c.name}`)}>Manage</Button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};
