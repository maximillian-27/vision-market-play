import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Ticket, BookOpen, MessageCircle, MoreHorizontal, Eye, UserPlus,
  ArrowUp, CheckCircle, Clock, AlertTriangle, Search,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

const tickets = [
  { id: "TKT-001", user: "john@example.com", subject: "Can't withdraw BTC", category: "Payment", priority: "High", status: "Open", created: "2025-01-15 14:32", assignedTo: "Agent 1" },
  { id: "TKT-002", user: "jane@example.com", subject: "Market not resolving correctly", category: "Market", priority: "Critical", status: "Escalated", created: "2025-01-15 12:18", assignedTo: "Senior Agent" },
  { id: "TKT-003", user: "bob@example.com", subject: "KYC verification stuck", category: "Account", priority: "Medium", status: "In Progress", created: "2025-01-15 10:45", assignedTo: "Agent 2" },
  { id: "TKT-004", user: "alice@example.com", subject: "Referral bonus not credited", category: "Payment", priority: "Low", status: "Open", created: "2025-01-14 16:20", assignedTo: "Unassigned" },
  { id: "TKT-005", user: "charlie@example.com", subject: "App crashing on mobile", category: "Other", priority: "Medium", status: "Resolved", created: "2025-01-14 14:10", assignedTo: "Agent 1" },
];

const kbCategories = [
  { name: "Getting Started", articles: 12, searches: 3400 },
  { name: "Deposits & Withdrawals", articles: 8, searches: 5600 },
  { name: "Markets & Trading", articles: 15, searches: 4200 },
  { name: "Account & KYC", articles: 6, searches: 2800 },
  { name: "Creator Program", articles: 5, searches: 1900 },
  { name: "Affiliate Program", articles: 4, searches: 1200 },
];

const priorityColors: Record<string, string> = {
  Critical: "bg-destructive/10 text-destructive",
  High: "bg-warning/10 text-warning",
  Medium: "bg-primary/10 text-primary",
  Low: "bg-muted text-muted-foreground",
};

export const AdminSupport = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredTickets = tickets.filter(t =>
    t.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
    t.user.toLowerCase().includes(searchQuery.toLowerCase()) ||
    t.id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const openTickets = tickets.filter(t => t.status === "Open").length;
  const escalated = tickets.filter(t => t.status === "Escalated").length;

  return (
    <div className="space-y-6">
      <Tabs defaultValue="tickets" className="space-y-4">
        <TabsList className="bg-muted/50 p-1 flex-wrap h-auto gap-1">
          <TabsTrigger value="tickets" className="data-[state=active]:bg-background gap-2"><Ticket className="h-4 w-4" /> Tickets</TabsTrigger>
          <TabsTrigger value="kb" className="data-[state=active]:bg-background gap-2"><BookOpen className="h-4 w-4" /> Knowledge Base</TabsTrigger>
          <TabsTrigger value="chat" className="data-[state=active]:bg-background gap-2"><MessageCircle className="h-4 w-4" /> Live Chat</TabsTrigger>
        </TabsList>

        {/* Tickets */}
        <TabsContent value="tickets" className="space-y-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <Card className="border-border/40 bg-warning/5"><CardContent className="p-4"><div className="flex items-center gap-2 text-warning text-sm mb-1"><Ticket className="h-4 w-4" /> Open Tickets</div><p className="text-2xl font-bold">{openTickets}</p></CardContent></Card>
            <Card className="border-border/40"><CardContent className="p-4"><p className="text-sm text-muted-foreground mb-1">Avg Response Time</p><p className="text-2xl font-bold">12 min</p></CardContent></Card>
            <Card className="border-border/40 bg-success/5"><CardContent className="p-4"><p className="text-sm text-muted-foreground mb-1">Resolution Rate</p><p className="text-2xl font-bold">94.2%</p></CardContent></Card>
            <Card className="border-border/40 bg-destructive/5"><CardContent className="p-4"><div className="flex items-center gap-2 text-destructive text-sm mb-1"><AlertTriangle className="h-4 w-4" /> Escalated</div><p className="text-2xl font-bold">{escalated}</p></CardContent></Card>
          </div>

          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search tickets..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="pl-9 h-9" />
          </div>

          <Card className="border-border/40">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border/40 text-left text-sm text-muted-foreground">
                    <th className="p-4 font-medium">ID</th>
                    <th className="p-4 font-medium">User</th>
                    <th className="p-4 font-medium">Subject</th>
                    <th className="p-4 font-medium">Category</th>
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
                      <td className="p-4 text-sm">{t.user}</td>
                      <td className="p-4 text-sm font-medium">{t.subject}</td>
                      <td className="p-4"><Badge variant="outline" className="text-xs">{t.category}</Badge></td>
                      <td className="p-4"><Badge className={`text-xs border-0 ${priorityColors[t.priority]}`}>{t.priority}</Badge></td>
                      <td className="p-4"><Badge variant={t.status === "Resolved" ? "default" : t.status === "Escalated" ? "destructive" : t.status === "In Progress" ? "secondary" : "outline"} className="text-xs">{t.status}</Badge></td>
                      <td className="p-4 text-sm text-muted-foreground">{t.assignedTo}</td>
                      <td className="p-4 text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild><Button variant="ghost" size="icon" className="h-8 w-8"><MoreHorizontal className="h-4 w-4" /></Button></DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="bg-popover">
                            <DropdownMenuItem className="gap-2" onClick={() => toast(`Opening ticket ${t.id}`)}><Eye className="h-4 w-4" /> View</DropdownMenuItem>
                            <DropdownMenuItem className="gap-2" onClick={() => toast(`Assigning ticket ${t.id}`)}><UserPlus className="h-4 w-4" /> Assign</DropdownMenuItem>
                            <DropdownMenuItem className="gap-2" onClick={() => toast.success(`Ticket ${t.id} escalated`)}><ArrowUp className="h-4 w-4" /> Escalate</DropdownMenuItem>
                            <DropdownMenuItem className="gap-2 text-success" onClick={() => toast.success(`Ticket ${t.id} resolved`)}><CheckCircle className="h-4 w-4" /> Resolve</DropdownMenuItem>
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
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

        {/* Live Chat */}
        <TabsContent value="chat" className="space-y-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <Card className="border-border/40 bg-success/5"><CardContent className="p-4"><div className="flex items-center gap-2 text-success text-sm mb-1"><MessageCircle className="h-4 w-4" /> Active Sessions</div><p className="text-2xl font-bold">7</p></CardContent></Card>
            <Card className="border-border/40"><CardContent className="p-4"><p className="text-sm text-muted-foreground mb-1">Queue Size</p><p className="text-2xl font-bold">3</p></CardContent></Card>
            <Card className="border-border/40"><CardContent className="p-4"><p className="text-sm text-muted-foreground mb-1">Avg Wait Time</p><p className="text-2xl font-bold">2 min</p></CardContent></Card>
            <Card className="border-border/40"><CardContent className="p-4"><p className="text-sm text-muted-foreground mb-1">Online Agents</p><p className="text-2xl font-bold">4</p></CardContent></Card>
          </div>
          <Card className="border-border/40">
            <CardContent className="p-8 text-center">
              <MessageCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="font-semibold mb-2">Live Chat Dashboard</h3>
              <p className="text-sm text-muted-foreground mb-4">Connect a live chat provider to manage conversations here.</p>
              <Button onClick={() => toast("Live chat integration settings would open here")}>Configure Live Chat</Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
