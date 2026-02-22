import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Wallet, AlertTriangle, Bug, ClipboardList, Eye, Shield, Ban, Search as SearchIcon,
  MoreHorizontal, Plus, Download, DollarSign,
} from "lucide-react";
import { toast } from "sonner";

const walletBalances = [
  { name: "Hot Wallet (ETH)", balance: "$2,450,000", change: "+$120K (24h)", status: "Normal" },
  { name: "Hot Wallet (BTC)", balance: "$1,890,000", change: "-$45K (24h)", status: "Normal" },
  { name: "Cold Storage", balance: "$12,500,000", change: "+$0 (24h)", status: "Secure" },
  { name: "USDT Reserve", balance: "$5,200,000", change: "+$380K (24h)", status: "Normal" },
];

const totalHoldings = "$22,040,000";

const largeTransactions = [
  { id: 1, user: "0x7a2...f3e1", amount: "$312,000", type: "Deposit", asset: "BTC", time: "8 min ago", flagged: true },
  { id: 2, user: "0x3b1...c8d2", amount: "$89,000", type: "Withdrawal", asset: "ETH", time: "25 min ago", flagged: false },
  { id: 3, user: "0x9f4...a7b3", amount: "$156,000", type: "Deposit", asset: "USDT", time: "1h ago", flagged: true },
];

const suspiciousActivity = [
  { id: 1, user: "0x2c8...d5e9", reason: "Multiple accounts detected", riskScore: 85, status: "Investigating", date: "2025-01-15" },
  { id: 2, user: "0x6e3...b1f4", reason: "Rapid deposit/withdrawal cycle", riskScore: 72, status: "Flagged", date: "2025-01-14" },
  { id: 3, user: "0x8d7...c2a6", reason: "Unusual betting pattern", riskScore: 68, status: "Monitoring", date: "2025-01-13" },
  { id: 4, user: "0x1a5...e4d8", reason: "IP address mismatch", riskScore: 55, status: "Resolved", date: "2025-01-12" },
];

const bugReports = [
  { id: 1, title: "Wallet disconnect on mobile Safari", severity: "High", status: "Open", assignee: "Dev Team", created: "2025-01-15" },
  { id: 2, title: "Slow market resolution on high traffic", severity: "Medium", status: "In Progress", assignee: "Backend", created: "2025-01-14" },
  { id: 3, title: "Chart rendering glitch on Firefox", severity: "Low", status: "Open", assignee: "Frontend", created: "2025-01-13" },
  { id: 4, title: "Push notification delay > 5s", severity: "Medium", status: "Resolved", assignee: "DevOps", created: "2025-01-10" },
];

const auditLog = [
  { id: 1, admin: "admin@pollgy.com", action: "Resolved market: Bitcoin Price EOY → Yes", timestamp: "2025-01-15 14:32" },
  { id: 2, admin: "admin@pollgy.com", action: "Suspended user: 0x2c8...d5e9", timestamp: "2025-01-15 12:18" },
  { id: 3, admin: "mod@pollgy.com", action: "Approved payout: $3,200 to SportsAnalyst", timestamp: "2025-01-15 10:45" },
  { id: 4, admin: "admin@pollgy.com", action: "Updated platform fee: 3% → 3%", timestamp: "2025-01-14 16:20" },
  { id: 5, admin: "mod@pollgy.com", action: "Approved creator application: MarketMaven", timestamp: "2025-01-14 14:10" },
  { id: 6, admin: "admin@pollgy.com", action: "Rejected dispute on market #1234", timestamp: "2025-01-14 11:55" },
];

const severityColors: Record<string, string> = {
  High: "bg-destructive/10 text-destructive",
  Medium: "bg-warning/10 text-warning",
  Low: "bg-muted text-muted-foreground",
};

export const AdminSecurity = () => {
  const [fraudStatusFilter, setFraudStatusFilter] = useState("all");
  const [fraudRiskFilter, setFraudRiskFilter] = useState("all");
  const [auditSearch, setAuditSearch] = useState("");
  const [auditAdminFilter, setAuditAdminFilter] = useState("all");

  const filteredSuspicious = suspiciousActivity.filter(s => {
    const matchesStatus = fraudStatusFilter === "all" || s.status.toLowerCase() === fraudStatusFilter;
    const matchesRisk = fraudRiskFilter === "all" ||
      (fraudRiskFilter === "critical" && s.riskScore >= 80) ||
      (fraudRiskFilter === "high" && s.riskScore >= 60 && s.riskScore < 80) ||
      (fraudRiskFilter === "medium" && s.riskScore >= 40 && s.riskScore < 60) ||
      (fraudRiskFilter === "low" && s.riskScore < 40);
    return matchesStatus && matchesRisk;
  });

  const filteredAudit = auditLog.filter(e => {
    const matchesSearch = auditSearch === "" || e.action.toLowerCase().includes(auditSearch.toLowerCase());
    const matchesAdmin = auditAdminFilter === "all" || e.admin === auditAdminFilter;
    return matchesSearch && matchesAdmin;
  });

  const uniqueAdmins = [...new Set(auditLog.map(e => e.admin))];

  return (
    <div className="space-y-6">
      <Tabs defaultValue="wallets" className="space-y-4">
        <TabsList className="bg-muted/50 p-1 flex-wrap h-auto gap-1">
          <TabsTrigger value="wallets" className="data-[state=active]:bg-background gap-2"><Wallet className="h-4 w-4" /> Wallet Monitoring</TabsTrigger>
          <TabsTrigger value="fraud" className="data-[state=active]:bg-background gap-2"><AlertTriangle className="h-4 w-4" /> Fraud Detection</TabsTrigger>
          <TabsTrigger value="bugs" className="data-[state=active]:bg-background gap-2"><Bug className="h-4 w-4" /> Bug Reports</TabsTrigger>
          <TabsTrigger value="audit" className="data-[state=active]:bg-background gap-2"><ClipboardList className="h-4 w-4" /> Audit Log</TabsTrigger>
        </TabsList>

        {/* Wallet Monitoring */}
        <TabsContent value="wallets" className="space-y-4">
          {/* Total Platform Holdings */}
          <Card className="border-border/40 bg-primary/5">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 text-primary text-sm mb-1"><DollarSign className="h-4 w-4" /> Total Platform Holdings</div>
              <p className="text-3xl font-bold text-primary">{totalHoldings}</p>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {walletBalances.map((w) => (
              <Card key={w.name} className="border-border/40">
                <CardContent className="p-4">
                  <p className="text-sm text-muted-foreground mb-1">{w.name}</p>
                  <p className="text-2xl font-bold">{w.balance}</p>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-xs text-muted-foreground">{w.change}</span>
                    <Badge variant="default" className="text-xs">{w.status}</Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card className="border-border/40">
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Large Transactions (Auto-flagged)</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border/40 text-left text-sm text-muted-foreground">
                      <th className="p-4 font-medium">User</th>
                      <th className="p-4 font-medium">Amount</th>
                      <th className="p-4 font-medium">Type</th>
                      <th className="p-4 font-medium">Asset</th>
                      <th className="p-4 font-medium">Time</th>
                      <th className="p-4 font-medium">Flagged</th>
                    </tr>
                  </thead>
                  <tbody>
                    {largeTransactions.map((t) => (
                      <tr key={t.id} className="border-b border-border/20 hover:bg-muted/30 transition-colors">
                        <td className="p-4 text-sm font-mono">{t.user}</td>
                        <td className="p-4 text-sm font-bold">{t.amount}</td>
                        <td className="p-4"><Badge variant={t.type === "Deposit" ? "default" : "secondary"} className="text-xs">{t.type}</Badge></td>
                        <td className="p-4 text-sm">{t.asset}</td>
                        <td className="p-4 text-sm text-muted-foreground">{t.time}</td>
                        <td className="p-4">{t.flagged ? <Badge className="text-xs bg-destructive/10 text-destructive border-0">Flagged</Badge> : <span className="text-xs text-muted-foreground">Normal</span>}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Fraud Detection */}
        <TabsContent value="fraud" className="space-y-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <Card className="border-border/40 bg-destructive/5"><CardContent className="p-4"><p className="text-sm text-muted-foreground mb-1">Active Investigations</p><p className="text-2xl font-bold">{suspiciousActivity.filter(s => s.status === "Investigating").length}</p></CardContent></Card>
            <Card className="border-border/40 bg-warning/5"><CardContent className="p-4"><p className="text-sm text-muted-foreground mb-1">Flagged Users</p><p className="text-2xl font-bold">{suspiciousActivity.filter(s => s.status === "Flagged").length}</p></CardContent></Card>
            <Card className="border-border/40"><CardContent className="p-4"><p className="text-sm text-muted-foreground mb-1">Monitoring</p><p className="text-2xl font-bold">{suspiciousActivity.filter(s => s.status === "Monitoring").length}</p></CardContent></Card>
            <Card className="border-border/40 bg-success/5"><CardContent className="p-4"><p className="text-sm text-muted-foreground mb-1">Resolved</p><p className="text-2xl font-bold">{suspiciousActivity.filter(s => s.status === "Resolved").length}</p></CardContent></Card>
          </div>

          {/* Fraud Filters */}
          <div className="flex items-center gap-3 flex-wrap">
            <Select value={fraudStatusFilter} onValueChange={setFraudStatusFilter}>
              <SelectTrigger className="w-40 h-9"><SelectValue placeholder="Status" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="investigating">Investigating</SelectItem>
                <SelectItem value="flagged">Flagged</SelectItem>
                <SelectItem value="monitoring">Monitoring</SelectItem>
                <SelectItem value="resolved">Resolved</SelectItem>
              </SelectContent>
            </Select>
            <Select value={fraudRiskFilter} onValueChange={setFraudRiskFilter}>
              <SelectTrigger className="w-40 h-9"><SelectValue placeholder="Risk Level" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Risk Levels</SelectItem>
                <SelectItem value="critical">Critical (80+)</SelectItem>
                <SelectItem value="high">High (60-79)</SelectItem>
                <SelectItem value="medium">Medium (40-59)</SelectItem>
                <SelectItem value="low">Low (&lt;40)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Card className="border-border/40">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border/40 text-left text-sm text-muted-foreground">
                    <th className="p-4 font-medium">User</th>
                    <th className="p-4 font-medium">Reason</th>
                    <th className="p-4 font-medium">Risk Score</th>
                    <th className="p-4 font-medium">Status</th>
                    <th className="p-4 font-medium">Date</th>
                    <th className="p-4 font-medium text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredSuspicious.map((s) => (
                    <tr key={s.id} className="border-b border-border/20 hover:bg-muted/30 transition-colors">
                      <td className="p-4 text-sm font-mono">{s.user}</td>
                      <td className="p-4 text-sm">{s.reason}</td>
                      <td className="p-4">
                        <Badge className={`text-xs border-0 ${s.riskScore >= 80 ? 'bg-destructive/10 text-destructive' : s.riskScore >= 60 ? 'bg-warning/10 text-warning' : 'bg-muted text-muted-foreground'}`}>
                          {s.riskScore}/100
                        </Badge>
                      </td>
                      <td className="p-4"><Badge variant={s.status === "Resolved" ? "default" : "secondary"} className="text-xs">{s.status}</Badge></td>
                      <td className="p-4 text-sm text-muted-foreground">{s.date}</td>
                      <td className="p-4 text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild><Button variant="ghost" size="icon" className="h-8 w-8"><MoreHorizontal className="h-4 w-4" /></Button></DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="bg-popover">
                            <DropdownMenuItem className="gap-2" onClick={() => toast(`Investigating ${s.user}`)}><SearchIcon className="h-4 w-4" /> Investigate</DropdownMenuItem>
                            <DropdownMenuItem className="gap-2" onClick={() => toast.success(`${s.user} flagged for review`)}><AlertTriangle className="h-4 w-4" /> Flag</DropdownMenuItem>
                            <DropdownMenuItem className="gap-2 text-destructive" onClick={() => toast.success(`${s.user} blocked`)}><Ban className="h-4 w-4" /> Block</DropdownMenuItem>
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

        {/* Bug Reports */}
        <TabsContent value="bugs" className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Bug Reports</h3>
            <Button size="sm" className="gap-2" onClick={() => toast("Issue report form would open here")}><Plus className="h-4 w-4" /> Report Issue</Button>
          </div>
          <Card className="border-border/40">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border/40 text-left text-sm text-muted-foreground">
                    <th className="p-4 font-medium">Title</th>
                    <th className="p-4 font-medium">Severity</th>
                    <th className="p-4 font-medium">Status</th>
                    <th className="p-4 font-medium">Assignee</th>
                    <th className="p-4 font-medium">Created</th>
                  </tr>
                </thead>
                <tbody>
                  {bugReports.map((b) => (
                    <tr key={b.id} className="border-b border-border/20 hover:bg-muted/30 transition-colors">
                      <td className="p-4 font-medium">{b.title}</td>
                      <td className="p-4"><Badge className={`text-xs border-0 ${severityColors[b.severity]}`}>{b.severity}</Badge></td>
                      <td className="p-4"><Badge variant={b.status === "Resolved" ? "default" : b.status === "In Progress" ? "secondary" : "outline"} className="text-xs">{b.status}</Badge></td>
                      <td className="p-4 text-sm">{b.assignee}</td>
                      <td className="p-4 text-sm text-muted-foreground">{b.created}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </TabsContent>

        {/* Audit Log */}
        <TabsContent value="audit" className="space-y-4">
          <div className="flex items-center justify-between flex-wrap gap-3">
            <div className="flex items-center gap-3 flex-wrap">
              <div className="relative">
                <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search audit log..." value={auditSearch} onChange={(e) => setAuditSearch(e.target.value)} className="pl-9 h-9 w-64" />
              </div>
              <Select value={auditAdminFilter} onValueChange={setAuditAdminFilter}>
                <SelectTrigger className="w-48 h-9"><SelectValue placeholder="Admin" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Admins</SelectItem>
                  {uniqueAdmins.map(admin => (
                    <SelectItem key={admin} value={admin}>{admin}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <Button variant="outline" size="sm" className="gap-2" onClick={() => toast.success("Audit log exported")}>
              <Download className="h-4 w-4" /> Export
            </Button>
          </div>

          <Card className="border-border/40">
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Admin Actions Log</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y divide-border/40">
                {filteredAudit.map((entry) => (
                  <div key={entry.id} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 hover:bg-muted/30 transition-colors gap-1">
                    <div>
                      <p className="text-sm">{entry.action}</p>
                      <p className="text-xs text-muted-foreground">by {entry.admin}</p>
                    </div>
                    <span className="text-xs text-muted-foreground whitespace-nowrap">{entry.timestamp}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
