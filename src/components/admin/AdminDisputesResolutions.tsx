import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal, Eye, CheckCircle, XCircle, MessageSquare, AlertTriangle, Clock } from "lucide-react";
import { toast } from "sonner";

const disputes = [
  { id: 1, marketTitle: "Bitcoin Price by EOY", user: "john@example.com", reason: "Incorrect resolution", status: "Open", priority: "High", created: "2024-01-15", amount: 2500 },
  { id: 2, marketTitle: "Super Bowl Winner", user: "jane@example.com", reason: "Market manipulation", status: "In Review", priority: "Critical", created: "2024-01-14", amount: 5000 },
  { id: 3, marketTitle: "Election Results", user: "bob@example.com", reason: "Ambiguous outcome", status: "Open", priority: "Medium", created: "2024-01-13", amount: 1200 },
];

const resolutions = [
  { id: 1, title: "Bitcoin Price by End of 2024", outcome: "Yes", proposedBy: "System", status: "Pending", deadline: "2025-01-05", volume: 45000 },
  { id: 2, title: "Super Bowl 2024 Champion", outcome: "Kansas City Chiefs", proposedBy: "CryptoGuru", status: "Disputed", deadline: "2024-02-15", volume: 89000 },
  { id: 3, title: "US Election 2024 Winner", outcome: "Pending votes", proposedBy: "-", status: "Voting", deadline: "2024-11-10", volume: 125000 },
  { id: 4, title: "Tesla Q4 Earnings Beat", outcome: "No", proposedBy: "MarketMaven", status: "Approved", deadline: "2024-01-28", volume: 32000 },
];

const history = [
  { id: 1, title: "Fed Rate Decision", type: "Resolution", outcome: "Approved", date: "2024-01-10", amount: 28000 },
  { id: 2, title: "Tesla Stock Price", type: "Dispute", outcome: "Rejected", date: "2024-01-08", amount: 800 },
  { id: 3, title: "AI Model Release", type: "Dispute", outcome: "Approved - Refund", date: "2024-01-05", amount: 1500 },
];

const priorityColors: Record<string, string> = {
  Critical: "bg-destructive/10 text-destructive",
  High: "bg-warning/10 text-warning",
  Medium: "bg-primary/10 text-primary",
  Low: "bg-muted text-muted-foreground",
};

export const AdminDisputesResolutions = () => {
  const openDisputes = disputes.filter(d => d.status === "Open").length;
  const pendingResolutions = resolutions.filter(r => r.status === "Pending").length;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="border-border/40 bg-destructive/5">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 text-destructive text-sm mb-1"><AlertTriangle className="h-4 w-4" /> Open Disputes</div>
            <p className="text-2xl font-bold">{openDisputes}</p>
          </CardContent>
        </Card>
        <Card className="border-border/40 bg-warning/5">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 text-warning text-sm mb-1"><Clock className="h-4 w-4" /> Pending Resolutions</div>
            <p className="text-2xl font-bold">{pendingResolutions}</p>
          </CardContent>
        </Card>
        <Card className="border-border/40">
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground mb-1">Amount at Stake</p>
            <p className="text-2xl font-bold">${disputes.reduce((a, d) => a + d.amount, 0).toLocaleString()}</p>
          </CardContent>
        </Card>
        <Card className="border-border/40">
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground mb-1">Volume Pending</p>
            <p className="text-2xl font-bold">${(resolutions.filter(r => r.status !== "Approved").reduce((a, r) => a + r.volume, 0) / 1000).toFixed(0)}K</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="disputes" className="space-y-4">
        <TabsList className="bg-muted/50 p-1">
          <TabsTrigger value="disputes" className="data-[state=active]:bg-background gap-2">
            <AlertTriangle className="h-4 w-4" /> Open Disputes
          </TabsTrigger>
          <TabsTrigger value="resolutions" className="data-[state=active]:bg-background gap-2">
            <CheckCircle className="h-4 w-4" /> Resolutions
          </TabsTrigger>
          <TabsTrigger value="history" className="data-[state=active]:bg-background gap-2">
            <Clock className="h-4 w-4" /> History
          </TabsTrigger>
        </TabsList>

        <TabsContent value="disputes" className="space-y-4">
          <Card className="border-border/40">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border/40 text-left text-sm text-muted-foreground">
                    <th className="p-4 font-medium">Market</th>
                    <th className="p-4 font-medium">User</th>
                    <th className="p-4 font-medium">Reason</th>
                    <th className="p-4 font-medium">Priority</th>
                    <th className="p-4 font-medium">Amount</th>
                    <th className="p-4 font-medium text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {disputes.map((d) => (
                    <tr key={d.id} className="border-b border-border/20 hover:bg-muted/30 transition-colors">
                      <td className="p-4">
                        <p className="font-medium line-clamp-1">{d.marketTitle}</p>
                        <p className="text-xs text-muted-foreground">{d.created}</p>
                      </td>
                      <td className="p-4 text-sm">{d.user}</td>
                      <td className="p-4 text-sm">{d.reason}</td>
                      <td className="p-4"><Badge className={`text-xs border-0 ${priorityColors[d.priority]}`}>{d.priority}</Badge></td>
                      <td className="p-4 text-sm font-medium">${d.amount.toLocaleString()}</td>
                      <td className="p-4 text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild><Button variant="ghost" size="icon" className="h-8 w-8"><MoreHorizontal className="h-4 w-4" /></Button></DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="bg-popover">
                            <DropdownMenuItem className="gap-2" onClick={() => toast(`Opening dispute details for "${d.marketTitle}"`)}><Eye className="h-4 w-4" /> View</DropdownMenuItem>
                            <DropdownMenuItem className="gap-2" onClick={() => toast(`Opening message thread with ${d.user}`)}><MessageSquare className="h-4 w-4" /> Message</DropdownMenuItem>
                            <DropdownMenuItem className="gap-2 text-success" onClick={() => toast.success(`Dispute on "${d.marketTitle}" approved`)}><CheckCircle className="h-4 w-4" /> Approve</DropdownMenuItem>
                            <DropdownMenuItem className="gap-2 text-destructive" onClick={() => toast.success(`Dispute on "${d.marketTitle}" rejected`)}><XCircle className="h-4 w-4" /> Reject</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="resolutions" className="space-y-4">
          <Card className="border-border/40">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border/40 text-left text-sm text-muted-foreground">
                    <th className="p-4 font-medium">Market</th>
                    <th className="p-4 font-medium">Outcome</th>
                    <th className="p-4 font-medium">Status</th>
                    <th className="p-4 font-medium">Volume</th>
                    <th className="p-4 font-medium">Deadline</th>
                    <th className="p-4 font-medium text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {resolutions.map((r) => (
                    <tr key={r.id} className="border-b border-border/20 hover:bg-muted/30 transition-colors">
                      <td className="p-4">
                        <p className="font-medium line-clamp-1 max-w-xs">{r.title}</p>
                        <p className="text-xs text-muted-foreground">by {r.proposedBy}</p>
                      </td>
                      <td className="p-4"><Badge variant="outline" className="text-xs">{r.outcome}</Badge></td>
                      <td className="p-4">
                        <Badge variant={r.status === "Approved" ? "default" : r.status === "Disputed" ? "destructive" : "secondary"} className="text-xs">{r.status}</Badge>
                      </td>
                      <td className="p-4 text-sm font-medium">${r.volume.toLocaleString()}</td>
                      <td className="p-4 text-sm">{r.deadline}</td>
                      <td className="p-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          {r.status === "Pending" && <Button size="sm" className="gap-1 h-8" onClick={() => toast.success(`Resolution for "${r.title}" confirmed`)}><CheckCircle className="h-3 w-3" /> Confirm</Button>}
                          <Button variant="ghost" size="icon" className="h-8 w-8"><MoreHorizontal className="h-4 w-4" /></Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="history" className="space-y-4">
          <Card className="border-border/40">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border/40 text-left text-sm text-muted-foreground">
                    <th className="p-4 font-medium">Market</th>
                    <th className="p-4 font-medium">Type</th>
                    <th className="p-4 font-medium">Outcome</th>
                    <th className="p-4 font-medium">Date</th>
                    <th className="p-4 font-medium">Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {history.map((h) => (
                    <tr key={h.id} className="border-b border-border/20 hover:bg-muted/30 transition-colors">
                      <td className="p-4 font-medium">{h.title}</td>
                      <td className="p-4"><Badge variant="outline" className="text-xs">{h.type}</Badge></td>
                      <td className="p-4 text-sm">{h.outcome}</td>
                      <td className="p-4 text-sm">{h.date}</td>
                      <td className="p-4 text-sm font-medium">${h.amount.toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
