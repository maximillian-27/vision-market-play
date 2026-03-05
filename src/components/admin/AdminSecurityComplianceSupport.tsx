import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Wallet, AlertTriangle, Bug, ClipboardList, Eye, Shield, Ban,
  Search as SearchIcon, MoreHorizontal, Plus, Download, DollarSign,
  UserCheck, XCircle, CheckCircle, Clock, Lock, Scale, Globe,
  FileText, Users, Ticket, BookOpen, MessageCircle, ArrowUp, ThumbsUp, Star,
  UserPlus,
} from "lucide-react";
import { toast } from "sonner";

// === Wallet Monitoring Data ===
const walletBalances = [
  { name: "Hot Wallet (ETH)", balance: "$2,450,000", change: "+$120K (24h)", status: "Normal" },
  { name: "Hot Wallet (BTC)", balance: "$1,890,000", change: "-$45K (24h)", status: "Normal" },
  { name: "Cold Storage", balance: "$12,500,000", change: "+$0 (24h)", status: "Secure" },
  { name: "USDT Reserve", balance: "$5,200,000", change: "+$380K (24h)", status: "Normal" },
];

const largeTransactions = [
  { id: 1, user: "0x7a2...f3e1", amount: "$312,000", type: "Deposit", asset: "BTC", time: "8 min ago", flagged: true },
  { id: 2, user: "0x3b1...c8d2", amount: "$89,000", type: "Withdrawal", asset: "ETH", time: "25 min ago", flagged: false },
  { id: 3, user: "0x9f4...a7b3", amount: "$156,000", type: "Deposit", asset: "USDT", time: "1h ago", flagged: true },
];

// === Fraud Detection Data ===
const suspiciousActivity = [
  { id: 1, user: "0x2c8...d5e9", reason: "Multiple accounts detected", riskScore: 85, status: "Investigating", date: "2025-01-15" },
  { id: 2, user: "0x6e3...b1f4", reason: "Rapid deposit/withdrawal cycle", riskScore: 72, status: "Flagged", date: "2025-01-14" },
  { id: 3, user: "0x8d7...c2a6", reason: "Unusual betting pattern", riskScore: 68, status: "Monitoring", date: "2025-01-13" },
  { id: 4, user: "0x1a5...e4d8", reason: "IP address mismatch", riskScore: 55, status: "Resolved", date: "2025-01-12" },
];

// === KYC Data ===
const kycQueue = [
  { id: 1, user: "john@example.com", wallet: "0x7a2...f3e1", type: "Enhanced", submitted: "2025-01-15", status: "Pending Review", riskLevel: "Medium", documents: 3 },
  { id: 2, user: "jane@example.com", wallet: "0x3b1...c8d2", type: "Standard", submitted: "2025-01-15", status: "Pending Review", riskLevel: "Low", documents: 2 },
  { id: 3, user: "bob@example.com", wallet: "0x9f4...a7b3", type: "Enhanced", submitted: "2025-01-14", status: "In Review", riskLevel: "High", documents: 4 },
  { id: 4, user: "alice@example.com", wallet: "0x2c8...d5e9", type: "Standard", submitted: "2025-01-14", status: "Approved", riskLevel: "Low", documents: 2 },
];

// === AML Data ===
const amlAlerts = [
  { id: 1, user: "0x2c8...d5e9", type: "Structuring", description: "Multiple deposits just below $10K threshold", severity: "Critical", created: "2025-01-15", status: "Open" },
  { id: 2, user: "0x6e3...b1f4", type: "High-Risk Jurisdiction", description: "Deposits from sanctioned country IP", severity: "Critical", created: "2025-01-14", status: "Investigating" },
  { id: 3, user: "0x8d7...c2a6", type: "Unusual Pattern", description: "Rapid deposit-withdrawal cycle detected", severity: "High", created: "2025-01-13", status: "Investigating" },
];

// === Compliance Data ===
const regulatoryChecklist = [
  { item: "KYC Program", done: true, note: "Tiered verification: Standard ($10K), Enhanced ($50K+)" },
  { item: "AML Transaction Monitoring", done: true, note: "Real-time monitoring with configurable thresholds" },
  { item: "Sanctions Screening", done: true, note: "OFAC, EU, UN sanctions lists integrated" },
  { item: "PEP Screening", done: true, note: "Politically Exposed Persons database checked" },
  { item: "Currency Transaction Reports (CTR)", done: false, note: "Pending: auto-file for transactions >$10K" },
  { item: "Travel Rule Compliance", done: false, note: "Pending: VASP-to-VASP data sharing protocol" },
  { item: "Responsible Gambling Limits", done: false, note: "Pending: self-exclusion and deposit limits UI" },
];

// === Admin Access ===
const adminUsers = [
  { id: 1, name: "Admin Primary", email: "admin@pollgy.com", role: "Super Admin", lastLogin: "2025-01-15 14:32", mfa: true },
  { id: 2, name: "Moderator 1", email: "mod@pollgy.com", role: "Moderator", lastLogin: "2025-01-15 12:18", mfa: true },
  { id: 3, name: "Finance Lead", email: "finance@pollgy.com", role: "Finance", lastLogin: "2025-01-14 16:20", mfa: true },
  { id: 4, name: "Support Agent 1", email: "support1@pollgy.com", role: "Support", lastLogin: "2025-01-15 10:45", mfa: false },
];

// === Bug Reports ===
const bugReports = [
  { id: 1, title: "Wallet disconnect on mobile Safari", severity: "High", status: "Open", assignee: "Dev Team", created: "2025-01-15" },
  { id: 2, title: "Slow market resolution on high traffic", severity: "Medium", status: "In Progress", assignee: "Backend", created: "2025-01-14" },
  { id: 3, title: "Chart rendering glitch on Firefox", severity: "Low", status: "Open", assignee: "Frontend", created: "2025-01-13" },
];

// === Audit Log ===
const auditLog = [
  { id: 1, admin: "admin@pollgy.com", action: "Resolved market: Bitcoin Price EOY → Yes", timestamp: "2025-01-15 14:32" },
  { id: 2, admin: "admin@pollgy.com", action: "Suspended user: 0x2c8...d5e9", timestamp: "2025-01-15 12:18" },
  { id: 3, admin: "mod@pollgy.com", action: "Approved payout: $3,200 to SportsAnalyst", timestamp: "2025-01-15 10:45" },
  { id: 4, admin: "admin@pollgy.com", action: "Updated platform fee: 3% → 3%", timestamp: "2025-01-14 16:20" },
  { id: 5, admin: "mod@pollgy.com", action: "Approved creator application: MarketMaven", timestamp: "2025-01-14 14:10" },
];

// === Support Data ===
const tickets = [
  { id: "TKT-001", user: "john@example.com", subject: "Can't withdraw BTC", category: "Payment", priority: "High", status: "Open", created: "2025-01-15 14:32", assignedTo: "Agent 1" },
  { id: "TKT-002", user: "jane@example.com", subject: "Market not resolving correctly", category: "Market", priority: "Critical", status: "Escalated", created: "2025-01-15 12:18", assignedTo: "Senior Agent" },
  { id: "TKT-003", user: "bob@example.com", subject: "KYC verification stuck", category: "Account", priority: "Medium", status: "In Progress", created: "2025-01-15 10:45", assignedTo: "Agent 2" },
  { id: "TKT-004", user: "alice@example.com", subject: "Referral bonus not credited", category: "Payment", priority: "Low", status: "Open", created: "2025-01-14 16:20", assignedTo: "Unassigned" },
];

const kbCategories = [
  { name: "Getting Started", articles: 12, searches: 3400 },
  { name: "Deposits & Withdrawals", articles: 8, searches: 5600 },
  { name: "Markets & Trading", articles: 15, searches: 4200 },
  { name: "Account & KYC", articles: 6, searches: 2800 },
];

const severityColors: Record<string, string> = {
  Critical: "bg-destructive/10 text-destructive",
  High: "bg-warning/10 text-warning",
  Medium: "bg-primary/10 text-primary",
  Low: "bg-muted text-muted-foreground",
};

const roleColors: Record<string, string> = {
  "Super Admin": "bg-destructive/10 text-destructive",
  Moderator: "bg-primary/10 text-primary",
  Finance: "bg-success/10 text-success",
  Support: "bg-warning/10 text-warning",
};

export const AdminSecurityComplianceSupport = () => {
  const [fraudStatusFilter, setFraudStatusFilter] = useState("all");
  const [kycStatusFilter, setKycStatusFilter] = useState("all");
  const [auditSearch, setAuditSearch] = useState("");
  const [ticketSearch, setTicketSearch] = useState("");
  const [ticketStatusFilter, setTicketStatusFilter] = useState("all");

  const filteredSuspicious = suspiciousActivity.filter(s => {
    return fraudStatusFilter === "all" || s.status.toLowerCase() === fraudStatusFilter;
  });

  const filteredKyc = kycQueue.filter(k => {
    return kycStatusFilter === "all" || k.status.toLowerCase().replace(" ", "") === kycStatusFilter;
  });

  const filteredAudit = auditLog.filter(e => {
    return auditSearch === "" || e.action.toLowerCase().includes(auditSearch.toLowerCase());
  });

  const filteredTickets = tickets.filter(t => {
    const matchesSearch = t.subject.toLowerCase().includes(ticketSearch.toLowerCase()) || t.user.toLowerCase().includes(ticketSearch.toLowerCase());
    const matchesStatus = ticketStatusFilter === "all" || t.status.toLowerCase().replace(" ", "") === ticketStatusFilter;
    return matchesSearch && matchesStatus;
  });

  const completedReg = regulatoryChecklist.filter(r => r.done).length;
  const totalReg = regulatoryChecklist.length;

  return (
    <div className="space-y-6">
      <Tabs defaultValue="wallets" className="space-y-4">
        <TabsList className="bg-muted/50 p-1 flex-wrap h-auto gap-1">
          <TabsTrigger value="wallets" className="data-[state=active]:bg-background gap-2"><Wallet className="h-4 w-4" /> Wallets</TabsTrigger>
          <TabsTrigger value="fraud" className="data-[state=active]:bg-background gap-2"><AlertTriangle className="h-4 w-4" /> Fraud</TabsTrigger>
          <TabsTrigger value="kyc" className="data-[state=active]:bg-background gap-2"><UserCheck className="h-4 w-4" /> KYC/AML</TabsTrigger>
          <TabsTrigger value="compliance" className="data-[state=active]:bg-background gap-2"><Scale className="h-4 w-4" /> Compliance</TabsTrigger>
          <TabsTrigger value="bugs" className="data-[state=active]:bg-background gap-2"><Bug className="h-4 w-4" /> Bugs</TabsTrigger>
          <TabsTrigger value="audit" className="data-[state=active]:bg-background gap-2"><ClipboardList className="h-4 w-4" /> Audit Log</TabsTrigger>
          <TabsTrigger value="tickets" className="data-[state=active]:bg-background gap-2"><Ticket className="h-4 w-4" /> Support</TabsTrigger>
          <TabsTrigger value="kb" className="data-[state=active]:bg-background gap-2"><BookOpen className="h-4 w-4" /> KB</TabsTrigger>
        </TabsList>

        {/* Wallet Monitoring */}
        <TabsContent value="wallets" className="space-y-4">
          <Card className="border-border/40 bg-primary/5">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 text-primary text-sm mb-1"><DollarSign className="h-4 w-4" /> Total Platform Holdings</div>
              <p className="text-3xl font-bold text-primary">$22,040,000</p>
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
            <CardHeader className="pb-3"><CardTitle className="text-base">Large Transactions (Auto-flagged)</CardTitle></CardHeader>
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
            <Card className="border-border/40 bg-destructive/5"><CardContent className="p-4"><p className="text-sm text-muted-foreground mb-1">Investigating</p><p className="text-2xl font-bold">{suspiciousActivity.filter(s => s.status === "Investigating").length}</p></CardContent></Card>
            <Card className="border-border/40 bg-warning/5"><CardContent className="p-4"><p className="text-sm text-muted-foreground mb-1">Flagged</p><p className="text-2xl font-bold">{suspiciousActivity.filter(s => s.status === "Flagged").length}</p></CardContent></Card>
            <Card className="border-border/40"><CardContent className="p-4"><p className="text-sm text-muted-foreground mb-1">Monitoring</p><p className="text-2xl font-bold">{suspiciousActivity.filter(s => s.status === "Monitoring").length}</p></CardContent></Card>
            <Card className="border-border/40 bg-success/5"><CardContent className="p-4"><p className="text-sm text-muted-foreground mb-1">Resolved</p><p className="text-2xl font-bold">{suspiciousActivity.filter(s => s.status === "Resolved").length}</p></CardContent></Card>
          </div>
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
          <Card className="border-border/40">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border/40 text-left text-sm text-muted-foreground">
                    <th className="p-4 font-medium">User</th>
                    <th className="p-4 font-medium">Reason</th>
                    <th className="p-4 font-medium">Risk</th>
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
                      <td className="p-4"><Badge className={`text-xs border-0 ${s.riskScore >= 80 ? 'bg-destructive/10 text-destructive' : s.riskScore >= 60 ? 'bg-warning/10 text-warning' : 'bg-muted text-muted-foreground'}`}>{s.riskScore}/100</Badge></td>
                      <td className="p-4"><Badge variant={s.status === "Resolved" ? "default" : "secondary"} className="text-xs">{s.status}</Badge></td>
                      <td className="p-4 text-sm text-muted-foreground">{s.date}</td>
                      <td className="p-4 text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild><Button variant="ghost" size="icon" className="h-8 w-8"><MoreHorizontal className="h-4 w-4" /></Button></DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="bg-popover">
                            <DropdownMenuItem className="gap-2" onClick={() => toast(`Investigating ${s.user}`)}><SearchIcon className="h-4 w-4" /> Investigate</DropdownMenuItem>
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

        {/* KYC/AML */}
        <TabsContent value="kyc" className="space-y-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <Card className="border-border/40 bg-warning/5"><CardContent className="p-4"><div className="flex items-center gap-2 text-warning text-sm mb-1"><Clock className="h-4 w-4" /> Pending Review</div><p className="text-2xl font-bold">{kycQueue.filter(k => k.status === "Pending Review").length}</p></CardContent></Card>
            <Card className="border-border/40 bg-primary/5"><CardContent className="p-4"><div className="flex items-center gap-2 text-primary text-sm mb-1"><Eye className="h-4 w-4" /> In Review</div><p className="text-2xl font-bold">{kycQueue.filter(k => k.status === "In Review").length}</p></CardContent></Card>
            <Card className="border-border/40 bg-success/5"><CardContent className="p-4"><div className="flex items-center gap-2 text-success text-sm mb-1"><CheckCircle className="h-4 w-4" /> Approved (30d)</div><p className="text-2xl font-bold">235</p></CardContent></Card>
            <Card className="border-border/40 bg-destructive/5"><CardContent className="p-4"><div className="flex items-center gap-2 text-destructive text-sm mb-1"><XCircle className="h-4 w-4" /> AML Alerts</div><p className="text-2xl font-bold">{amlAlerts.filter(a => a.status !== "Resolved").length}</p></CardContent></Card>
          </div>

          <div className="flex items-center gap-3">
            <Select value={kycStatusFilter} onValueChange={setKycStatusFilter}>
              <SelectTrigger className="w-40 h-9"><SelectValue placeholder="Status" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="pendingreview">Pending Review</SelectItem>
                <SelectItem value="inreview">In Review</SelectItem>
                <SelectItem value="approved">Approved</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" size="sm" className="gap-2" onClick={() => toast.success("KYC report exported")}><Download className="h-4 w-4" /> Export</Button>
          </div>

          <Card className="border-border/40">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border/40 text-left text-sm text-muted-foreground">
                    <th className="p-4 font-medium">User</th>
                    <th className="p-4 font-medium">Type</th>
                    <th className="p-4 font-medium">Risk</th>
                    <th className="p-4 font-medium">Docs</th>
                    <th className="p-4 font-medium">Status</th>
                    <th className="p-4 font-medium text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredKyc.map((k) => (
                    <tr key={k.id} className="border-b border-border/20 hover:bg-muted/30 transition-colors">
                      <td className="p-4 text-sm">{k.user}</td>
                      <td className="p-4"><Badge variant="outline" className="text-xs">{k.type}</Badge></td>
                      <td className="p-4"><Badge className={`text-xs border-0 ${severityColors[k.riskLevel]}`}>{k.riskLevel}</Badge></td>
                      <td className="p-4 text-sm">{k.documents} files</td>
                      <td className="p-4"><Badge variant={k.status === "Approved" ? "default" : "secondary"} className="text-xs">{k.status}</Badge></td>
                      <td className="p-4 text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild><Button variant="ghost" size="icon" className="h-8 w-8"><MoreHorizontal className="h-4 w-4" /></Button></DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="bg-popover">
                            <DropdownMenuItem className="gap-2" onClick={() => toast(`Reviewing KYC for ${k.user}`)}><Eye className="h-4 w-4" /> Review</DropdownMenuItem>
                            <DropdownMenuItem className="gap-2 text-success" onClick={() => toast.success(`KYC approved for ${k.user}`)}><CheckCircle className="h-4 w-4" /> Approve</DropdownMenuItem>
                            <DropdownMenuItem className="gap-2 text-destructive" onClick={() => toast.success(`KYC rejected for ${k.user}`)}><XCircle className="h-4 w-4" /> Reject</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>

          {/* AML Alerts */}
          <Card className="border-border/40">
            <CardHeader className="pb-3"><CardTitle className="text-base">AML Alerts</CardTitle></CardHeader>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border/40 text-left text-sm text-muted-foreground">
                      <th className="p-4 font-medium">User</th>
                      <th className="p-4 font-medium">Type</th>
                      <th className="p-4 font-medium">Severity</th>
                      <th className="p-4 font-medium">Status</th>
                      <th className="p-4 font-medium text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {amlAlerts.map((a) => (
                      <tr key={a.id} className="border-b border-border/20 hover:bg-muted/30 transition-colors">
                        <td className="p-4 text-sm font-mono">{a.user}</td>
                        <td className="p-4 text-sm">{a.type}</td>
                        <td className="p-4"><Badge className={`text-xs border-0 ${severityColors[a.severity]}`}>{a.severity}</Badge></td>
                        <td className="p-4"><Badge variant={a.status === "Open" ? "destructive" : "secondary"} className="text-xs">{a.status}</Badge></td>
                        <td className="p-4 text-right">
                          <Button variant="ghost" size="sm" onClick={() => toast(`Investigating AML alert for ${a.user}`)}>Investigate</Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Compliance */}
        <TabsContent value="compliance" className="space-y-4">
          <Card className="border-border/40">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base flex items-center gap-2"><Scale className="h-4 w-4" /> Regulatory Readiness</CardTitle>
                <span className="text-sm text-muted-foreground">{completedReg}/{totalReg}</span>
              </div>
              <Progress value={(completedReg / totalReg) * 100} className="h-2 mt-2" />
            </CardHeader>
            <CardContent className="space-y-2">
              {regulatoryChecklist.map((item) => (
                <div key={item.item} className="flex items-start gap-3 p-3 rounded-lg hover:bg-muted/30 transition-colors">
                  <Checkbox checked={item.done} disabled className="mt-0.5" />
                  <div className="flex-1 min-w-0">
                    <p className={`text-sm font-medium ${item.done ? 'text-muted-foreground line-through' : ''}`}>{item.item}</p>
                    <p className="text-xs text-muted-foreground">{item.note}</p>
                  </div>
                  {!item.done && <Badge variant="outline" className="text-xs text-warning border-warning/30">Pending</Badge>}
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Admin Access */}
          <Card className="border-border/40">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base">Admin Users & Roles</CardTitle>
                <Button size="sm" className="gap-2" onClick={() => toast("Invite admin form would open")}><Users className="h-4 w-4" /> Invite</Button>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border/40 text-left text-sm text-muted-foreground">
                      <th className="p-4 font-medium">Name</th>
                      <th className="p-4 font-medium">Role</th>
                      <th className="p-4 font-medium">MFA</th>
                      <th className="p-4 font-medium">Last Login</th>
                      <th className="p-4 font-medium text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {adminUsers.map((admin) => (
                      <tr key={admin.id} className="border-b border-border/20 hover:bg-muted/30 transition-colors">
                        <td className="p-4">
                          <p className="font-medium">{admin.name}</p>
                          <p className="text-xs text-muted-foreground">{admin.email}</p>
                        </td>
                        <td className="p-4"><Badge className={`text-xs border-0 ${roleColors[admin.role] || 'bg-muted text-muted-foreground'}`}>{admin.role}</Badge></td>
                        <td className="p-4">{admin.mfa ? <Badge className="text-xs bg-success/10 text-success border-0">On</Badge> : <Badge variant="destructive" className="text-xs">Off</Badge>}</td>
                        <td className="p-4 text-sm text-muted-foreground">{admin.lastLogin}</td>
                        <td className="p-4 text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild><Button variant="ghost" size="icon" className="h-8 w-8"><MoreHorizontal className="h-4 w-4" /></Button></DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="bg-popover">
                              <DropdownMenuItem className="gap-2" onClick={() => toast(`Editing ${admin.name}`)}><Shield className="h-4 w-4" /> Edit Permissions</DropdownMenuItem>
                              <DropdownMenuItem className="gap-2 text-destructive" onClick={() => toast.success(`${admin.name} access revoked`)}><XCircle className="h-4 w-4" /> Revoke</DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          {/* Security Policies */}
          <Card className="border-border/40 max-w-2xl">
            <CardContent className="p-6 space-y-4">
              <h3 className="font-semibold text-lg">Security Policies</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between"><span className="text-sm">Require MFA for all admins</span><Switch defaultChecked /></div>
                <div className="flex items-center justify-between"><span className="text-sm">Session timeout (minutes)</span><Input defaultValue="30" type="number" className="w-24 h-8" /></div>
                <div className="flex items-center justify-between"><span className="text-sm">IP whitelist for admin access</span><Switch /></div>
                <div className="flex items-center justify-between"><span className="text-sm">Log all admin actions</span><Switch defaultChecked /></div>
                <div className="flex items-center justify-between"><span className="text-sm">Require approval for payouts {'>'} $10K</span><Switch defaultChecked /></div>
              </div>
              <Button className="w-full" onClick={() => toast.success("Security policies saved")}>Save Policies</Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Bug Reports */}
        <TabsContent value="bugs" className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Bug Reports</h3>
            <Button size="sm" className="gap-2" onClick={() => toast("Issue report form would open here")}><Plus className="h-4 w-4" /> Report</Button>
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
                      <td className="p-4"><Badge variant={b.status === "In Progress" ? "secondary" : "outline"} className="text-xs">{b.status}</Badge></td>
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
          <div className="flex items-center gap-3">
            <div className="relative flex-1 max-w-md">
              <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search audit log..." value={auditSearch} onChange={(e) => setAuditSearch(e.target.value)} className="pl-9 h-9" />
            </div>
            <Button variant="outline" size="sm" className="gap-2" onClick={() => toast.success("Audit log exported")}><Download className="h-4 w-4" /> Export</Button>
          </div>
          <Card className="border-border/40">
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

        {/* Support Tickets */}
        <TabsContent value="tickets" className="space-y-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <Card className="border-border/40 bg-warning/5"><CardContent className="p-4"><div className="flex items-center gap-2 text-warning text-sm mb-1"><Ticket className="h-4 w-4" /> Open</div><p className="text-2xl font-bold">{tickets.filter(t => t.status === "Open").length}</p></CardContent></Card>
            <Card className="border-border/40"><CardContent className="p-4"><p className="text-sm text-muted-foreground mb-1">Avg Response</p><p className="text-2xl font-bold">12 min</p></CardContent></Card>
            <Card className="border-border/40 bg-success/5"><CardContent className="p-4"><p className="text-sm text-muted-foreground mb-1">Resolution Rate</p><p className="text-2xl font-bold">94.2%</p></CardContent></Card>
            <Card className="border-border/40 bg-success/5"><CardContent className="p-4"><div className="flex items-center gap-2 text-success text-sm mb-1"><ThumbsUp className="h-4 w-4" /> CSAT</div><p className="text-2xl font-bold">92%</p></CardContent></Card>
          </div>
          <div className="flex items-center gap-3 flex-wrap">
            <div className="relative flex-1 max-w-md">
              <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search tickets..." value={ticketSearch} onChange={(e) => setTicketSearch(e.target.value)} className="pl-9 h-9" />
            </div>
            <Select value={ticketStatusFilter} onValueChange={setTicketStatusFilter}>
              <SelectTrigger className="w-36 h-9"><SelectValue placeholder="Status" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="open">Open</SelectItem>
                <SelectItem value="inprogress">In Progress</SelectItem>
                <SelectItem value="escalated">Escalated</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Card className="border-border/40">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border/40 text-left text-sm text-muted-foreground">
                    <th className="p-4 font-medium">ID</th>
                    <th className="p-4 font-medium">Subject</th>
                    <th className="p-4 font-medium">Priority</th>
                    <th className="p-4 font-medium">Status</th>
                    <th className="p-4 font-medium">Assigned</th>
                    <th className="p-4 font-medium text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredTickets.map((t) => (
                    <tr key={t.id} className="border-b border-border/20 hover:bg-muted/30 transition-colors">
                      <td className="p-4"><code className="text-xs bg-muted px-2 py-1 rounded">{t.id}</code></td>
                      <td className="p-4 text-sm font-medium">{t.subject}</td>
                      <td className="p-4"><Badge className={`text-xs border-0 ${severityColors[t.priority]}`}>{t.priority}</Badge></td>
                      <td className="p-4"><Badge variant={t.status === "Escalated" ? "destructive" : t.status === "In Progress" ? "secondary" : "outline"} className="text-xs">{t.status}</Badge></td>
                      <td className="p-4 text-sm text-muted-foreground">{t.assignedTo}</td>
                      <td className="p-4 text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild><Button variant="ghost" size="icon" className="h-8 w-8"><MoreHorizontal className="h-4 w-4" /></Button></DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="bg-popover">
                            <DropdownMenuItem className="gap-2" onClick={() => toast(`Opening ${t.id}`)}><Eye className="h-4 w-4" /> View</DropdownMenuItem>
                            <DropdownMenuItem className="gap-2" onClick={() => toast.success(`${t.id} escalated`)}><ArrowUp className="h-4 w-4" /> Escalate</DropdownMenuItem>
                            <DropdownMenuItem className="gap-2 text-success" onClick={() => toast.success(`${t.id} resolved`)}><CheckCircle className="h-4 w-4" /> Resolve</DropdownMenuItem>
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

        {/* Knowledge Base */}
        <TabsContent value="kb" className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Knowledge Base</h3>
            <Button size="sm" onClick={() => toast("Article editor would open here")}>New Article</Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {kbCategories.map((cat) => (
              <Card key={cat.name} className="border-border/40 cursor-pointer hover:bg-muted/30 transition-colors" onClick={() => toast(`Opening ${cat.name} articles`)}>
                <CardContent className="p-4">
                  <p className="font-semibold mb-2">{cat.name}</p>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">{cat.articles} articles</span>
                    <span className="text-muted-foreground">{cat.searches.toLocaleString()} searches</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};
