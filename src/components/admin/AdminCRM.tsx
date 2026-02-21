import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Search, MoreHorizontal, Mail, Phone, Tag, Users, UserCheck, UserX, MessageSquare, Send, Zap, Bell, Smartphone } from "lucide-react";

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

const channels = [
  { id: "email", name: "Email", icon: Mail, deliveryRate: 98.2, openRate: 34.5, optIns: 89400, status: "Active" },
  { id: "sms", name: "SMS", icon: Smartphone, deliveryRate: 99.1, openRate: 78.3, optIns: 45200, status: "Active" },
  { id: "push", name: "Push Notifications", icon: Bell, deliveryRate: 95.4, openRate: 12.8, optIns: 67800, status: "Active" },
  { id: "inapp", name: "In-App Messaging", icon: MessageSquare, deliveryRate: 100, openRate: 45.2, optIns: 124500, status: "Active" },
];

const automations = [
  { id: 1, name: "Welcome Series", trigger: "User Registration", channel: "Email + Push", status: "Active", sent: 12400, conversion: 23.4 },
  { id: 2, name: "Churn Prevention", trigger: "No activity 14 days", channel: "Email + In-App", status: "Active", sent: 3400, conversion: 8.2 },
  { id: 3, name: "Win Celebration", trigger: "Market won", channel: "Push + In-App", status: "Active", sent: 8900, conversion: 45.6 },
  { id: 4, name: "Deposit Reminder", trigger: "Balance < $10", channel: "Email", status: "Paused", sent: 2100, conversion: 12.1 },
  { id: 5, name: "Re-engagement", trigger: "No activity 30 days", channel: "Email + SMS", status: "Active", sent: 1200, conversion: 5.8 },
];

const contacts = [
  { id: 1, name: "John Doe", email: "john@example.com", segment: "High Value", lastContact: "2024-01-14", status: "Engaged" },
  { id: 2, name: "Jane Smith", email: "jane@example.com", segment: "At Risk", lastContact: "2023-12-20", status: "Inactive" },
  { id: 3, name: "Bob Wilson", email: "bob@example.com", segment: "New Users", lastContact: "2024-01-15", status: "Engaged" },
  { id: 4, name: "Alice Johnson", email: "alice@example.com", segment: "Whales", lastContact: "2024-01-13", status: "VIP" },
];

export const AdminCRM = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [segmentFilter, setSegmentFilter] = useState("all");

  return (
    <div className="space-y-6">
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList className="bg-muted/50 p-1 flex-wrap h-auto">
          <TabsTrigger value="overview" className="data-[state=active]:bg-background gap-2"><Users className="h-4 w-4" /> Overview</TabsTrigger>
          <TabsTrigger value="channels" className="data-[state=active]:bg-background gap-2"><Send className="h-4 w-4" /> Channels</TabsTrigger>
          <TabsTrigger value="segments" className="data-[state=active]:bg-background gap-2"><Tag className="h-4 w-4" /> Segments</TabsTrigger>
          <TabsTrigger value="campaigns" className="data-[state=active]:bg-background gap-2"><Mail className="h-4 w-4" /> Campaigns</TabsTrigger>
          <TabsTrigger value="automations" className="data-[state=active]:bg-background gap-2"><Zap className="h-4 w-4" /> Automations</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <Card className="border-border/40">
              <CardContent className="p-4">
                <div className="flex items-center gap-2 text-muted-foreground text-sm mb-1"><Users className="h-4 w-4" /> Total Contacts</div>
                <p className="text-2xl font-bold">124,500</p>
              </CardContent>
            </Card>
            <Card className="border-border/40 bg-success/5">
              <CardContent className="p-4">
                <div className="flex items-center gap-2 text-success text-sm mb-1"><UserCheck className="h-4 w-4" /> Active Users</div>
                <p className="text-2xl font-bold">89,200</p>
              </CardContent>
            </Card>
            <Card className="border-border/40 bg-destructive/5">
              <CardContent className="p-4">
                <div className="flex items-center gap-2 text-destructive text-sm mb-1"><UserX className="h-4 w-4" /> Churned (30d)</div>
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

        <TabsContent value="channels" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {channels.map((channel) => (
              <Card key={channel.id} className="border-border/40">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                        <channel.icon className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-semibold">{channel.name}</p>
                        <Badge variant="default" className="text-xs">{channel.status}</Badge>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">Configure</Button>
                  </div>
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div>
                      <p className="text-xs text-muted-foreground">Delivery</p>
                      <p className="text-lg font-bold">{channel.deliveryRate}%</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Open Rate</p>
                      <p className="text-lg font-bold">{channel.openRate}%</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Opt-ins</p>
                      <p className="text-lg font-bold">{(channel.optIns / 1000).toFixed(1)}K</p>
                    </div>
                  </div>
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
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-semibold">{segment.name}</span>
                    <Badge className={`text-xs border-0 ${segment.color}`}>{segment.count.toLocaleString()} users</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">{segment.description}</p>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" className="gap-1"><Mail className="h-3 w-3" /> Email All</Button>
                    <Button size="sm" variant="outline" className="gap-1"><Tag className="h-3 w-3" /> Edit</Button>
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
                      <td className="p-4"><Badge variant="outline" className="text-xs">{campaign.type}</Badge></td>
                      <td className="p-4">
                        <Badge variant={campaign.status === "Active" ? "default" : campaign.status === "Scheduled" ? "secondary" : "outline"} className="text-xs">{campaign.status}</Badge>
                      </td>
                      <td className="p-4 text-sm">{campaign.sent.toLocaleString()}</td>
                      <td className="p-4 text-sm">{campaign.opened.toLocaleString()}</td>
                      <td className="p-4 text-sm">{campaign.clicked.toLocaleString()}</td>
                      <td className="p-4 text-right"><Button variant="ghost" size="sm">Manage</Button></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="automations" className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Automated Journeys</h3>
            <Button size="sm">New Automation</Button>
          </div>
          <Card className="border-border/40">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border/40 text-left text-sm text-muted-foreground">
                    <th className="p-4 font-medium">Journey</th>
                    <th className="p-4 font-medium">Trigger</th>
                    <th className="p-4 font-medium">Channel</th>
                    <th className="p-4 font-medium">Status</th>
                    <th className="p-4 font-medium">Sent</th>
                    <th className="p-4 font-medium">Conversion</th>
                    <th className="p-4 font-medium text-right">Active</th>
                  </tr>
                </thead>
                <tbody>
                  {automations.map((a) => (
                    <tr key={a.id} className="border-b border-border/20 hover:bg-muted/30 transition-colors">
                      <td className="p-4 font-medium">{a.name}</td>
                      <td className="p-4 text-sm text-muted-foreground">{a.trigger}</td>
                      <td className="p-4 text-sm">{a.channel}</td>
                      <td className="p-4"><Badge variant={a.status === "Active" ? "default" : "secondary"} className="text-xs">{a.status}</Badge></td>
                      <td className="p-4 text-sm">{a.sent.toLocaleString()}</td>
                      <td className="p-4 text-sm font-medium">{a.conversion}%</td>
                      <td className="p-4 text-right"><Switch defaultChecked={a.status === "Active"} /></td>
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
