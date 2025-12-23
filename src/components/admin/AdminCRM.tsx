import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Search, MoreHorizontal, Mail, Phone, Tag, Users, UserCheck, UserX, MessageSquare, Send, Calendar } from "lucide-react";

const segments = [
  { id: 1, name: "High Value", count: 2340, description: "Portfolio > $10K", color: "bg-success/10 text-success" },
  { id: 2, name: "At Risk", count: 456, description: "No activity 30+ days", color: "bg-destructive/10 text-destructive" },
  { id: 3, name: "New Users", count: 1890, description: "Joined last 7 days", color: "bg-primary/10 text-primary" },
  { id: 4, name: "Whales", count: 89, description: "Portfolio > $100K", color: "bg-warning/10 text-warning" },
];

const campaigns = [
  { id: 1, name: "Welcome Series", type: "Email", status: "Active", sent: 4560, opened: 2340, clicked: 890 },
  { id: 2, name: "Re-engagement", type: "Push", status: "Active", sent: 1200, opened: 450, clicked: 120 },
  { id: 3, name: "Deposit Bonus", type: "Email", status: "Scheduled", sent: 0, opened: 0, clicked: 0 },
  { id: 4, name: "VIP Promotion", type: "SMS", status: "Completed", sent: 89, opened: 78, clicked: 45 },
];

const contacts = [
  { id: 1, name: "John Doe", email: "john@example.com", phone: "+1234567890", segment: "High Value", lastContact: "2024-01-14", status: "Engaged" },
  { id: 2, name: "Jane Smith", email: "jane@example.com", phone: "+1234567891", segment: "At Risk", lastContact: "2023-12-20", status: "Inactive" },
  { id: 3, name: "Bob Wilson", email: "bob@example.com", phone: "+1234567892", segment: "New Users", lastContact: "2024-01-15", status: "Engaged" },
  { id: 4, name: "Alice Johnson", email: "alice@example.com", phone: "+1234567893", segment: "Whales", lastContact: "2024-01-13", status: "VIP" },
];

export const AdminCRM = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [segmentFilter, setSegmentFilter] = useState("all");

  return (
    <div className="space-y-6">
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList className="bg-muted/50 p-1">
          <TabsTrigger value="overview" className="data-[state=active]:bg-background gap-2">
            <Users className="h-4 w-4" />
            Overview
          </TabsTrigger>
          <TabsTrigger value="segments" className="data-[state=active]:bg-background gap-2">
            <Tag className="h-4 w-4" />
            Segments
          </TabsTrigger>
          <TabsTrigger value="campaigns" className="data-[state=active]:bg-background gap-2">
            <Send className="h-4 w-4" />
            Campaigns
          </TabsTrigger>
          <TabsTrigger value="contacts" className="data-[state=active]:bg-background gap-2">
            <MessageSquare className="h-4 w-4" />
            Contacts
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          {/* CRM Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <Card className="border-border/40">
              <CardContent className="p-4">
                <div className="flex items-center gap-2 text-muted-foreground text-sm mb-1">
                  <Users className="h-4 w-4" />
                  Total Contacts
                </div>
                <p className="text-2xl font-bold">124,500</p>
              </CardContent>
            </Card>
            <Card className="border-border/40 bg-success/5">
              <CardContent className="p-4">
                <div className="flex items-center gap-2 text-success text-sm mb-1">
                  <UserCheck className="h-4 w-4" />
                  Active Users
                </div>
                <p className="text-2xl font-bold">89,200</p>
              </CardContent>
            </Card>
            <Card className="border-border/40 bg-destructive/5">
              <CardContent className="p-4">
                <div className="flex items-center gap-2 text-destructive text-sm mb-1">
                  <UserX className="h-4 w-4" />
                  Churned (30d)
                </div>
                <p className="text-2xl font-bold">1,234</p>
              </CardContent>
            </Card>
            <Card className="border-border/40">
              <CardContent className="p-4">
                <p className="text-sm text-muted-foreground mb-1">Avg LTV</p>
                <p className="text-2xl font-bold">$2,450</p>
              </CardContent>
            </Card>
          </div>

          {/* Quick Segments */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {segments.map((segment) => (
              <Card key={segment.id} className="border-border/40 cursor-pointer hover:bg-muted/30 transition-colors">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <Badge className={`text-xs border-0 ${segment.color}`}>{segment.name}</Badge>
                    <span className="text-lg font-bold">{segment.count.toLocaleString()}</span>
                  </div>
                  <p className="text-xs text-muted-foreground">{segment.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="segments" className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">User Segments</h3>
            <Button size="sm">Create Segment</Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {segments.map((segment) => (
              <Card key={segment.id} className="border-border/40">
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-base">{segment.name}</CardTitle>
                    <Badge className={`text-xs border-0 ${segment.color}`}>{segment.count.toLocaleString()} users</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-3">{segment.description}</p>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" className="gap-1">
                      <Mail className="h-3 w-3" /> Email All
                    </Button>
                    <Button size="sm" variant="outline" className="gap-1">
                      <Tag className="h-3 w-3" /> Edit
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="campaigns" className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Marketing Campaigns</h3>
            <Button size="sm">New Campaign</Button>
          </div>
          <Card className="border-border/40">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border/40 text-left text-sm text-muted-foreground">
                    <th className="p-4 font-medium">Campaign</th>
                    <th className="p-4 font-medium">Type</th>
                    <th className="p-4 font-medium">Status</th>
                    <th className="p-4 font-medium">Sent</th>
                    <th className="p-4 font-medium">Opened</th>
                    <th className="p-4 font-medium">Clicked</th>
                    <th className="p-4 font-medium text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {campaigns.map((campaign) => (
                    <tr key={campaign.id} className="border-b border-border/20 hover:bg-muted/30 transition-colors">
                      <td className="p-4 font-medium">{campaign.name}</td>
                      <td className="p-4">
                        <Badge variant="outline" className="text-xs">{campaign.type}</Badge>
                      </td>
                      <td className="p-4">
                        <Badge
                          variant={campaign.status === "Active" ? "default" : campaign.status === "Scheduled" ? "secondary" : "outline"}
                          className="text-xs"
                        >
                          {campaign.status}
                        </Badge>
                      </td>
                      <td className="p-4 text-sm">{campaign.sent.toLocaleString()}</td>
                      <td className="p-4 text-sm">{campaign.opened.toLocaleString()}</td>
                      <td className="p-4 text-sm">{campaign.clicked.toLocaleString()}</td>
                      <td className="p-4 text-right">
                        <Button variant="ghost" size="sm">Manage</Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="contacts" className="space-y-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <h3 className="text-lg font-semibold">Contact Management</h3>
            <div className="flex items-center gap-3 w-full sm:w-auto">
              <div className="relative flex-1 sm:w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search contacts..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9 h-9"
                />
              </div>
              <Select value={segmentFilter} onValueChange={setSegmentFilter}>
                <SelectTrigger className="w-32 h-9">
                  <SelectValue placeholder="Segment" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="high-value">High Value</SelectItem>
                  <SelectItem value="at-risk">At Risk</SelectItem>
                  <SelectItem value="new">New Users</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <Card className="border-border/40">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border/40 text-left text-sm text-muted-foreground">
                    <th className="p-4 font-medium">Contact</th>
                    <th className="p-4 font-medium">Segment</th>
                    <th className="p-4 font-medium">Status</th>
                    <th className="p-4 font-medium">Last Contact</th>
                    <th className="p-4 font-medium text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {contacts.map((contact) => (
                    <tr key={contact.id} className="border-b border-border/20 hover:bg-muted/30 transition-colors">
                      <td className="p-4">
                        <div>
                          <p className="font-medium">{contact.name}</p>
                          <p className="text-sm text-muted-foreground">{contact.email}</p>
                        </div>
                      </td>
                      <td className="p-4">
                        <Badge variant="secondary" className="text-xs">{contact.segment}</Badge>
                      </td>
                      <td className="p-4">
                        <Badge
                          variant={contact.status === "VIP" ? "default" : contact.status === "Engaged" ? "secondary" : "outline"}
                          className="text-xs"
                        >
                          {contact.status}
                        </Badge>
                      </td>
                      <td className="p-4 text-sm">{contact.lastContact}</td>
                      <td className="p-4 text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="bg-popover">
                            <DropdownMenuItem className="gap-2">
                              <Mail className="h-4 w-4" /> Send Email
                            </DropdownMenuItem>
                            <DropdownMenuItem className="gap-2">
                              <Phone className="h-4 w-4" /> Call
                            </DropdownMenuItem>
                            <DropdownMenuItem className="gap-2">
                              <Calendar className="h-4 w-4" /> Schedule
                            </DropdownMenuItem>
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
      </Tabs>
    </div>
  );
};
