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
  Shield, FileCheck, Users, AlertTriangle, CheckCircle, Clock, Eye,
  MoreHorizontal, Download, Scale, Lock, UserCheck, XCircle, Search,
  FileText, Globe,
} from "lucide-react";
import { toast } from "sonner";

// KYC Pipeline
const kycQueue = [
  { id: 1, user: "john@example.com", wallet: "0x7a2...f3e1", type: "Enhanced", submitted: "2025-01-15", status: "Pending Review", riskLevel: "Medium", documents: 3 },
  { id: 2, user: "jane@example.com", wallet: "0x3b1...c8d2", type: "Standard", submitted: "2025-01-15", status: "Pending Review", riskLevel: "Low", documents: 2 },
  { id: 3, user: "bob@example.com", wallet: "0x9f4...a7b3", type: "Enhanced", submitted: "2025-01-14", status: "In Review", riskLevel: "High", documents: 4 },
  { id: 4, user: "alice@example.com", wallet: "0x2c8...d5e9", type: "Standard", submitted: "2025-01-14", status: "Approved", riskLevel: "Low", documents: 2 },
  { id: 5, user: "charlie@example.com", wallet: "0x6e3...b1f4", type: "Enhanced", submitted: "2025-01-13", status: "Rejected", riskLevel: "High", documents: 3 },
];

// AML Alerts
const amlAlerts = [
  { id: 1, user: "0x2c8...d5e9", type: "Structuring", description: "Multiple deposits just below $10K threshold", severity: "Critical", created: "2025-01-15", status: "Open" },
  { id: 2, user: "0x6e3...b1f4", type: "High-Risk Jurisdiction", description: "Deposits from sanctioned country IP", severity: "Critical", created: "2025-01-14", status: "Investigating" },
  { id: 3, user: "0x8d7...c2a6", type: "Unusual Pattern", description: "Rapid deposit-withdrawal cycle detected", severity: "High", created: "2025-01-13", status: "Investigating" },
  { id: 4, user: "0x1a5...e4d8", type: "PEP Match", description: "Possible politically exposed person match", severity: "Medium", created: "2025-01-12", status: "Resolved" },
];

// Regulatory Checklist
const regulatoryChecklist = [
  { item: "KYC Program", done: true, note: "Tiered verification: Standard ($10K), Enhanced ($50K+)" },
  { item: "AML Transaction Monitoring", done: true, note: "Real-time monitoring with configurable thresholds" },
  { item: "Sanctions Screening", done: true, note: "OFAC, EU, UN sanctions lists integrated" },
  { item: "PEP Screening", done: true, note: "Politically Exposed Persons database checked" },
  { item: "Suspicious Activity Reports (SAR)", done: true, note: "Auto-generated on flagged transactions" },
  { item: "Currency Transaction Reports (CTR)", done: false, note: "Pending: auto-file for transactions >$10K" },
  { item: "Record Retention (5 years)", done: true, note: "All KYC docs and transaction records archived" },
  { item: "Customer Due Diligence (CDD)", done: true, note: "Enhanced due diligence for high-risk users" },
  { item: "Travel Rule Compliance", done: false, note: "Pending: VASP-to-VASP data sharing protocol" },
  { item: "Data Privacy (GDPR)", done: true, note: "Privacy policy, data deletion requests handled" },
  { item: "Geo-Blocking", done: true, note: "Restricted jurisdictions blocked at IP level" },
  { item: "Responsible Gambling Limits", done: false, note: "Pending: self-exclusion and deposit limits UI" },
];

// Admin Roles
const adminUsers = [
  { id: 1, name: "Admin Primary", email: "admin@pollgy.com", role: "Super Admin", lastLogin: "2025-01-15 14:32", mfa: true, permissions: ["all"] },
  { id: 2, name: "Moderator 1", email: "mod@pollgy.com", role: "Moderator", lastLogin: "2025-01-15 12:18", mfa: true, permissions: ["markets", "support", "crm"] },
  { id: 3, name: "Finance Lead", email: "finance@pollgy.com", role: "Finance", lastLogin: "2025-01-14 16:20", mfa: true, permissions: ["transactions", "analytics", "compliance"] },
  { id: 4, name: "Support Agent 1", email: "support1@pollgy.com", role: "Support", lastLogin: "2025-01-15 10:45", mfa: false, permissions: ["support", "crm"] },
  { id: 5, name: "Marketing Lead", email: "marketing@pollgy.com", role: "Marketing", lastLogin: "2025-01-13 09:30", mfa: true, permissions: ["marketing", "analytics", "crm"] },
];

// Geo Restrictions
const restrictedJurisdictions = [
  { country: "United States", code: "US", status: "Fully Blocked", reason: "Regulatory uncertainty" },
  { country: "China", code: "CN", status: "Fully Blocked", reason: "Government ban on crypto" },
  { country: "North Korea", code: "KP", status: "Sanctioned", reason: "OFAC sanctions" },
  { country: "Iran", code: "IR", status: "Sanctioned", reason: "OFAC sanctions" },
  { country: "Cuba", code: "CU", status: "Sanctioned", reason: "OFAC sanctions" },
  { country: "Russia", code: "RU", status: "Restricted", reason: "Partial sanctions" },
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
  Marketing: "bg-purple-500/10 text-purple-500",
};

export const AdminCompliance = () => {
  const [kycStatusFilter, setKycStatusFilter] = useState("all");
  const [amlStatusFilter, setAmlStatusFilter] = useState("all");
  const [kycSearch, setKycSearch] = useState("");

  const filteredKyc = kycQueue.filter(k => {
    const matchesStatus = kycStatusFilter === "all" || k.status.toLowerCase().replace(" ", "") === kycStatusFilter;
    const matchesSearch = kycSearch === "" || k.user.toLowerCase().includes(kycSearch.toLowerCase()) || k.wallet.toLowerCase().includes(kycSearch.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const filteredAml = amlAlerts.filter(a => {
    return amlStatusFilter === "all" || a.status.toLowerCase() === amlStatusFilter;
  });

  const completedReg = regulatoryChecklist.filter(r => r.done).length;
  const totalReg = regulatoryChecklist.length;

  const kycPending = kycQueue.filter(k => k.status === "Pending Review").length;
  const kycInReview = kycQueue.filter(k => k.status === "In Review").length;
  const kycApproved = kycQueue.filter(k => k.status === "Approved").length;
  const kycRejected = kycQueue.filter(k => k.status === "Rejected").length;

  return (
    <div className="space-y-6">
      <Tabs defaultValue="kyc" className="space-y-4">
        <TabsList className="bg-muted/50 p-1 flex-wrap h-auto gap-1">
          <TabsTrigger value="kyc" className="data-[state=active]:bg-background gap-2"><UserCheck className="h-4 w-4" /> KYC Pipeline</TabsTrigger>
          <TabsTrigger value="aml" className="data-[state=active]:bg-background gap-2"><AlertTriangle className="h-4 w-4" /> AML Alerts</TabsTrigger>
          <TabsTrigger value="regulatory" className="data-[state=active]:bg-background gap-2"><Scale className="h-4 w-4" /> Regulatory</TabsTrigger>
          <TabsTrigger value="geo" className="data-[state=active]:bg-background gap-2"><Globe className="h-4 w-4" /> Geo Restrictions</TabsTrigger>
          <TabsTrigger value="access" className="data-[state=active]:bg-background gap-2"><Lock className="h-4 w-4" /> Admin Access</TabsTrigger>
        </TabsList>

        {/* KYC Pipeline */}
        <TabsContent value="kyc" className="space-y-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <Card className="border-border/40 bg-warning/5"><CardContent className="p-4"><div className="flex items-center gap-2 text-warning text-sm mb-1"><Clock className="h-4 w-4" /> Pending Review</div><p className="text-2xl font-bold">{kycPending}</p></CardContent></Card>
            <Card className="border-border/40 bg-primary/5"><CardContent className="p-4"><div className="flex items-center gap-2 text-primary text-sm mb-1"><Eye className="h-4 w-4" /> In Review</div><p className="text-2xl font-bold">{kycInReview}</p></CardContent></Card>
            <Card className="border-border/40 bg-success/5"><CardContent className="p-4"><div className="flex items-center gap-2 text-success text-sm mb-1"><CheckCircle className="h-4 w-4" /> Approved (30d)</div><p className="text-2xl font-bold">{kycApproved + 234}</p></CardContent></Card>
            <Card className="border-border/40 bg-destructive/5"><CardContent className="p-4"><div className="flex items-center gap-2 text-destructive text-sm mb-1"><XCircle className="h-4 w-4" /> Rejected (30d)</div><p className="text-2xl font-bold">{kycRejected + 18}</p></CardContent></Card>
          </div>

          <div className="flex items-center gap-3 flex-wrap">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search by email or wallet..." value={kycSearch} onChange={(e) => setKycSearch(e.target.value)} className="pl-9 h-9" />
            </div>
            <Select value={kycStatusFilter} onValueChange={setKycStatusFilter}>
              <SelectTrigger className="w-40 h-9"><SelectValue placeholder="Status" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="pendingreview">Pending Review</SelectItem>
                <SelectItem value="inreview">In Review</SelectItem>
                <SelectItem value="approved">Approved</SelectItem>
                <SelectItem value="rejected">Rejected</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" size="sm" className="gap-2" onClick={() => toast.success("KYC report exported")}>
              <Download className="h-4 w-4" /> Export
            </Button>
          </div>

          <Card className="border-border/40">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border/40 text-left text-sm text-muted-foreground">
                    <th className="p-4 font-medium">User</th>
                    <th className="p-4 font-medium">Wallet</th>
                    <th className="p-4 font-medium">Type</th>
                    <th className="p-4 font-medium">Risk</th>
                    <th className="p-4 font-medium">Docs</th>
                    <th className="p-4 font-medium">Submitted</th>
                    <th className="p-4 font-medium">Status</th>
                    <th className="p-4 font-medium text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredKyc.map((k) => (
                    <tr key={k.id} className="border-b border-border/20 hover:bg-muted/30 transition-colors">
                      <td className="p-4 text-sm">{k.user}</td>
                      <td className="p-4 text-sm font-mono">{k.wallet}</td>
                      <td className="p-4"><Badge variant="outline" className="text-xs">{k.type}</Badge></td>
                      <td className="p-4"><Badge className={`text-xs border-0 ${severityColors[k.riskLevel]}`}>{k.riskLevel}</Badge></td>
                      <td className="p-4 text-sm">{k.documents} files</td>
                      <td className="p-4 text-sm text-muted-foreground">{k.submitted}</td>
                      <td className="p-4"><Badge variant={k.status === "Approved" ? "default" : k.status === "Rejected" ? "destructive" : "secondary"} className="text-xs">{k.status}</Badge></td>
                      <td className="p-4 text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild><Button variant="ghost" size="icon" className="h-8 w-8"><MoreHorizontal className="h-4 w-4" /></Button></DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="bg-popover">
                            <DropdownMenuItem className="gap-2" onClick={() => toast(`Reviewing KYC for ${k.user}`)}><Eye className="h-4 w-4" /> Review Documents</DropdownMenuItem>
                            <DropdownMenuItem className="gap-2 text-success" onClick={() => toast.success(`KYC approved for ${k.user}`)}><CheckCircle className="h-4 w-4" /> Approve</DropdownMenuItem>
                            <DropdownMenuItem className="gap-2" onClick={() => toast(`Requesting additional docs from ${k.user}`)}><FileText className="h-4 w-4" /> Request More Docs</DropdownMenuItem>
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
        </TabsContent>

        {/* AML Alerts */}
        <TabsContent value="aml" className="space-y-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <Card className="border-border/40 bg-destructive/5"><CardContent className="p-4"><p className="text-sm text-muted-foreground mb-1">Open Alerts</p><p className="text-2xl font-bold">{amlAlerts.filter(a => a.status === "Open").length}</p></CardContent></Card>
            <Card className="border-border/40 bg-warning/5"><CardContent className="p-4"><p className="text-sm text-muted-foreground mb-1">Investigating</p><p className="text-2xl font-bold">{amlAlerts.filter(a => a.status === "Investigating").length}</p></CardContent></Card>
            <Card className="border-border/40 bg-success/5"><CardContent className="p-4"><p className="text-sm text-muted-foreground mb-1">Resolved (30d)</p><p className="text-2xl font-bold">{amlAlerts.filter(a => a.status === "Resolved").length + 12}</p></CardContent></Card>
            <Card className="border-border/40"><CardContent className="p-4"><p className="text-sm text-muted-foreground mb-1">SARs Filed (30d)</p><p className="text-2xl font-bold">3</p></CardContent></Card>
          </div>

          <div className="flex items-center gap-3">
            <Select value={amlStatusFilter} onValueChange={setAmlStatusFilter}>
              <SelectTrigger className="w-40 h-9"><SelectValue placeholder="Status" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="open">Open</SelectItem>
                <SelectItem value="investigating">Investigating</SelectItem>
                <SelectItem value="resolved">Resolved</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" size="sm" className="gap-2" onClick={() => toast("Generating SAR report...")}><FileText className="h-4 w-4" /> Generate SAR</Button>
          </div>

          <Card className="border-border/40">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border/40 text-left text-sm text-muted-foreground">
                    <th className="p-4 font-medium">User</th>
                    <th className="p-4 font-medium">Type</th>
                    <th className="p-4 font-medium">Description</th>
                    <th className="p-4 font-medium">Severity</th>
                    <th className="p-4 font-medium">Status</th>
                    <th className="p-4 font-medium">Date</th>
                    <th className="p-4 font-medium text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredAml.map((a) => (
                    <tr key={a.id} className="border-b border-border/20 hover:bg-muted/30 transition-colors">
                      <td className="p-4 text-sm font-mono">{a.user}</td>
                      <td className="p-4"><Badge variant="outline" className="text-xs">{a.type}</Badge></td>
                      <td className="p-4 text-sm max-w-xs truncate">{a.description}</td>
                      <td className="p-4"><Badge className={`text-xs border-0 ${severityColors[a.severity]}`}>{a.severity}</Badge></td>
                      <td className="p-4"><Badge variant={a.status === "Resolved" ? "default" : a.status === "Open" ? "destructive" : "secondary"} className="text-xs">{a.status}</Badge></td>
                      <td className="p-4 text-sm text-muted-foreground">{a.created}</td>
                      <td className="p-4 text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild><Button variant="ghost" size="icon" className="h-8 w-8"><MoreHorizontal className="h-4 w-4" /></Button></DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="bg-popover">
                            <DropdownMenuItem className="gap-2" onClick={() => toast(`Investigating AML alert for ${a.user}`)}><Eye className="h-4 w-4" /> Investigate</DropdownMenuItem>
                            <DropdownMenuItem className="gap-2" onClick={() => toast(`Filing SAR for ${a.user}`)}><FileText className="h-4 w-4" /> File SAR</DropdownMenuItem>
                            <DropdownMenuItem className="gap-2" onClick={() => toast.success(`User ${a.user} frozen pending investigation`)}><Lock className="h-4 w-4" /> Freeze Account</DropdownMenuItem>
                            <DropdownMenuItem className="gap-2 text-success" onClick={() => toast.success(`Alert resolved for ${a.user}`)}><CheckCircle className="h-4 w-4" /> Resolve</DropdownMenuItem>
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

        {/* Regulatory Checklist */}
        <TabsContent value="regulatory" className="space-y-4">
          <Card className="border-border/40">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base flex items-center gap-2"><Scale className="h-4 w-4" /> Regulatory Readiness</CardTitle>
                <span className="text-sm text-muted-foreground">{completedReg}/{totalReg} completed</span>
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
        </TabsContent>

        {/* Geo Restrictions */}
        <TabsContent value="geo" className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Restricted Jurisdictions</h3>
            <Button size="sm" className="gap-2" onClick={() => toast("Country restriction form would open")}><Globe className="h-4 w-4" /> Add Country</Button>
          </div>
          <Card className="border-border/40">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border/40 text-left text-sm text-muted-foreground">
                    <th className="p-4 font-medium">Country</th>
                    <th className="p-4 font-medium">Code</th>
                    <th className="p-4 font-medium">Status</th>
                    <th className="p-4 font-medium">Reason</th>
                    <th className="p-4 font-medium text-right">Active</th>
                  </tr>
                </thead>
                <tbody>
                  {restrictedJurisdictions.map((j) => (
                    <tr key={j.code} className="border-b border-border/20 hover:bg-muted/30 transition-colors">
                      <td className="p-4 font-medium">{j.country}</td>
                      <td className="p-4 text-sm font-mono">{j.code}</td>
                      <td className="p-4"><Badge variant={j.status === "Sanctioned" ? "destructive" : j.status === "Fully Blocked" ? "secondary" : "outline"} className="text-xs">{j.status}</Badge></td>
                      <td className="p-4 text-sm text-muted-foreground">{j.reason}</td>
                      <td className="p-4 text-right"><Switch defaultChecked /></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </TabsContent>

        {/* Admin Access */}
        <TabsContent value="access" className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Admin Users & Roles</h3>
            <Button size="sm" className="gap-2" onClick={() => toast("Invite admin form would open")}><Users className="h-4 w-4" /> Invite Admin</Button>
          </div>
          <Card className="border-border/40">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border/40 text-left text-sm text-muted-foreground">
                    <th className="p-4 font-medium">Name</th>
                    <th className="p-4 font-medium">Email</th>
                    <th className="p-4 font-medium">Role</th>
                    <th className="p-4 font-medium">Permissions</th>
                    <th className="p-4 font-medium">MFA</th>
                    <th className="p-4 font-medium">Last Login</th>
                    <th className="p-4 font-medium text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {adminUsers.map((admin) => (
                    <tr key={admin.id} className="border-b border-border/20 hover:bg-muted/30 transition-colors">
                      <td className="p-4 font-medium">{admin.name}</td>
                      <td className="p-4 text-sm text-muted-foreground">{admin.email}</td>
                      <td className="p-4"><Badge className={`text-xs border-0 ${roleColors[admin.role] || 'bg-muted text-muted-foreground'}`}>{admin.role}</Badge></td>
                      <td className="p-4">
                        <div className="flex gap-1 flex-wrap">
                          {admin.permissions.map(p => (
                            <Badge key={p} variant="outline" className="text-[10px]">{p}</Badge>
                          ))}
                        </div>
                      </td>
                      <td className="p-4">{admin.mfa ? <Badge className="text-xs bg-success/10 text-success border-0">Enabled</Badge> : <Badge variant="destructive" className="text-xs">Off</Badge>}</td>
                      <td className="p-4 text-sm text-muted-foreground">{admin.lastLogin}</td>
                      <td className="p-4 text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild><Button variant="ghost" size="icon" className="h-8 w-8"><MoreHorizontal className="h-4 w-4" /></Button></DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="bg-popover">
                            <DropdownMenuItem className="gap-2" onClick={() => toast(`Editing permissions for ${admin.name}`)}><Shield className="h-4 w-4" /> Edit Permissions</DropdownMenuItem>
                            <DropdownMenuItem className="gap-2" onClick={() => toast(`Resetting MFA for ${admin.name}`)}><Lock className="h-4 w-4" /> Reset MFA</DropdownMenuItem>
                            <DropdownMenuItem className="gap-2 text-destructive" onClick={() => toast.success(`${admin.name} access revoked`)}><XCircle className="h-4 w-4" /> Revoke Access</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
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
                <div className="flex items-center justify-between"><span className="text-sm">Auto-lock after 5 failed logins</span><Switch defaultChecked /></div>
              </div>
              <Button className="w-full" onClick={() => toast.success("Security policies saved")}>Save Policies</Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
