import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { Monitor, Smartphone, Tablet, CheckCircle, XCircle, MinusCircle, Plus, Bug } from "lucide-react";

const features = ["Login", "Registration", "Market Browse", "Place Bet", "Deposit", "Withdrawal", "Profile", "Push Notifications"];
const browsers = ["Chrome 120", "Safari 17", "Firefox 121", "Edge 120"];
const devices = ["Desktop", "iPhone 15", "Samsung S24", "iPad Pro"];

type TestStatus = "pass" | "fail" | "untested";

// Deterministic test matrix
const testMatrix: Record<string, Record<string, TestStatus>> = {
  "Login": { "Chrome 120 - Desktop": "pass", "Chrome 120 - iPhone 15": "pass", "Chrome 120 - Samsung S24": "pass", "Chrome 120 - iPad Pro": "pass", "Safari 17 - Desktop": "pass", "Safari 17 - iPhone 15": "pass", "Safari 17 - Samsung S24": "untested", "Safari 17 - iPad Pro": "pass", "Firefox 121 - Desktop": "fail", "Firefox 121 - iPhone 15": "untested", "Firefox 121 - Samsung S24": "untested", "Firefox 121 - iPad Pro": "untested", "Edge 120 - Desktop": "pass", "Edge 120 - iPhone 15": "untested", "Edge 120 - Samsung S24": "untested", "Edge 120 - iPad Pro": "untested" },
  "Registration": { "Chrome 120 - Desktop": "pass", "Chrome 120 - iPhone 15": "pass", "Chrome 120 - Samsung S24": "pass", "Chrome 120 - iPad Pro": "pass", "Safari 17 - Desktop": "pass", "Safari 17 - iPhone 15": "pass", "Safari 17 - Samsung S24": "untested", "Safari 17 - iPad Pro": "pass", "Firefox 121 - Desktop": "pass", "Firefox 121 - iPhone 15": "untested", "Firefox 121 - Samsung S24": "untested", "Firefox 121 - iPad Pro": "untested", "Edge 120 - Desktop": "pass", "Edge 120 - iPhone 15": "untested", "Edge 120 - Samsung S24": "untested", "Edge 120 - iPad Pro": "untested" },
  "Market Browse": { "Chrome 120 - Desktop": "pass", "Chrome 120 - iPhone 15": "pass", "Chrome 120 - Samsung S24": "pass", "Chrome 120 - iPad Pro": "pass", "Safari 17 - Desktop": "pass", "Safari 17 - iPhone 15": "pass", "Safari 17 - Samsung S24": "untested", "Safari 17 - iPad Pro": "pass", "Firefox 121 - Desktop": "pass", "Firefox 121 - iPhone 15": "untested", "Firefox 121 - Samsung S24": "pass", "Firefox 121 - iPad Pro": "untested", "Edge 120 - Desktop": "pass", "Edge 120 - iPhone 15": "untested", "Edge 120 - Samsung S24": "untested", "Edge 120 - iPad Pro": "pass" },
  "Place Bet": { "Chrome 120 - Desktop": "pass", "Chrome 120 - iPhone 15": "pass", "Chrome 120 - Samsung S24": "pass", "Chrome 120 - iPad Pro": "pass", "Safari 17 - Desktop": "pass", "Safari 17 - iPhone 15": "pass", "Safari 17 - Samsung S24": "untested", "Safari 17 - iPad Pro": "pass", "Firefox 121 - Desktop": "pass", "Firefox 121 - iPhone 15": "untested", "Firefox 121 - Samsung S24": "untested", "Firefox 121 - iPad Pro": "untested", "Edge 120 - Desktop": "pass", "Edge 120 - iPhone 15": "untested", "Edge 120 - Samsung S24": "untested", "Edge 120 - iPad Pro": "untested" },
  "Deposit": { "Chrome 120 - Desktop": "pass", "Chrome 120 - iPhone 15": "pass", "Chrome 120 - Samsung S24": "fail", "Chrome 120 - iPad Pro": "pass", "Safari 17 - Desktop": "pass", "Safari 17 - iPhone 15": "pass", "Safari 17 - Samsung S24": "untested", "Safari 17 - iPad Pro": "pass", "Firefox 121 - Desktop": "pass", "Firefox 121 - iPhone 15": "untested", "Firefox 121 - Samsung S24": "untested", "Firefox 121 - iPad Pro": "untested", "Edge 120 - Desktop": "pass", "Edge 120 - iPhone 15": "untested", "Edge 120 - Samsung S24": "untested", "Edge 120 - iPad Pro": "untested" },
  "Withdrawal": { "Chrome 120 - Desktop": "pass", "Chrome 120 - iPhone 15": "pass", "Chrome 120 - Samsung S24": "pass", "Chrome 120 - iPad Pro": "pass", "Safari 17 - Desktop": "pass", "Safari 17 - iPhone 15": "pass", "Safari 17 - Samsung S24": "untested", "Safari 17 - iPad Pro": "pass", "Firefox 121 - Desktop": "pass", "Firefox 121 - iPhone 15": "untested", "Firefox 121 - Samsung S24": "untested", "Firefox 121 - iPad Pro": "untested", "Edge 120 - Desktop": "pass", "Edge 120 - iPhone 15": "untested", "Edge 120 - Samsung S24": "untested", "Edge 120 - iPad Pro": "untested" },
  "Profile": { "Chrome 120 - Desktop": "pass", "Chrome 120 - iPhone 15": "pass", "Chrome 120 - Samsung S24": "pass", "Chrome 120 - iPad Pro": "pass", "Safari 17 - Desktop": "pass", "Safari 17 - iPhone 15": "pass", "Safari 17 - Samsung S24": "untested", "Safari 17 - iPad Pro": "pass", "Firefox 121 - Desktop": "pass", "Firefox 121 - iPhone 15": "untested", "Firefox 121 - Samsung S24": "untested", "Firefox 121 - iPad Pro": "untested", "Edge 120 - Desktop": "fail", "Edge 120 - iPhone 15": "untested", "Edge 120 - Samsung S24": "untested", "Edge 120 - iPad Pro": "untested" },
  "Push Notifications": { "Chrome 120 - Desktop": "pass", "Chrome 120 - iPhone 15": "untested", "Chrome 120 - Samsung S24": "pass", "Chrome 120 - iPad Pro": "untested", "Safari 17 - Desktop": "pass", "Safari 17 - iPhone 15": "fail", "Safari 17 - Samsung S24": "untested", "Safari 17 - iPad Pro": "untested", "Firefox 121 - Desktop": "pass", "Firefox 121 - iPhone 15": "untested", "Firefox 121 - Samsung S24": "untested", "Firefox 121 - iPad Pro": "untested", "Edge 120 - Desktop": "pass", "Edge 120 - iPhone 15": "untested", "Edge 120 - Samsung S24": "untested", "Edge 120 - iPad Pro": "untested" },
};

const deviceList = [
  { name: "iPhone 15 Pro", os: "iOS 17.2", browser: "Safari 17", status: "Tested" },
  { name: "Samsung Galaxy S24", os: "Android 14", browser: "Chrome 120", status: "Tested" },
  { name: "iPad Pro 12.9", os: "iPadOS 17.2", browser: "Safari 17", status: "Tested" },
  { name: "MacBook Pro", os: "macOS 14.2", browser: "Chrome 120", status: "Tested" },
  { name: "Windows Desktop", os: "Windows 11", browser: "Edge 120", status: "Tested" },
  { name: "Pixel 8", os: "Android 14", browser: "Chrome 120", status: "Pending" },
];

const issues = [
  { id: 1, title: "Push notifications not showing on iOS Safari", severity: "High", device: "iPhone 15", assignee: "Dev Team", status: "Open" },
  { id: 2, title: "Deposit form cut off on small screens", severity: "Medium", device: "Samsung S24", assignee: "UI Team", status: "In Progress" },
  { id: 3, title: "Login redirect loop on Firefox", severity: "Critical", device: "Desktop", assignee: "Backend Team", status: "Open" },
  { id: 4, title: "Dark mode colors broken in Edge", severity: "Low", device: "Windows Desktop", assignee: "UI Team", status: "Resolved" },
];

const StatusIcon = ({ status }: { status: TestStatus }) => {
  if (status === "pass") return <CheckCircle className="h-4 w-4 text-success" />;
  if (status === "fail") return <XCircle className="h-4 w-4 text-destructive" />;
  return <MinusCircle className="h-4 w-4 text-muted-foreground" />;
};

export const AdminUAT = () => {
  const [selectedBrowser, setSelectedBrowser] = useState(browsers[0]);
  const cols = devices.map(d => `${selectedBrowser} - ${d}`);

  return (
    <div className="space-y-6">
      <Tabs defaultValue="matrix" className="space-y-4">
        <TabsList className="bg-muted/50 p-1">
          <TabsTrigger value="matrix" className="data-[state=active]:bg-background gap-2"><Monitor className="h-4 w-4" /> Test Matrix</TabsTrigger>
          <TabsTrigger value="devices" className="data-[state=active]:bg-background gap-2"><Smartphone className="h-4 w-4" /> Devices</TabsTrigger>
          <TabsTrigger value="issues" className="data-[state=active]:bg-background gap-2"><Bug className="h-4 w-4" /> Issues</TabsTrigger>
        </TabsList>

        <TabsContent value="matrix" className="space-y-4">
          <div className="flex items-center gap-3">
            <Select value={selectedBrowser} onValueChange={setSelectedBrowser}>
              <SelectTrigger className="w-48 h-9"><SelectValue /></SelectTrigger>
              <SelectContent>
                {browsers.map(b => <SelectItem key={b} value={b}>{b}</SelectItem>)}
              </SelectContent>
            </Select>
            <div className="flex items-center gap-4 text-xs text-muted-foreground ml-auto">
              <span className="flex items-center gap-1"><CheckCircle className="h-3 w-3 text-success" /> Pass</span>
              <span className="flex items-center gap-1"><XCircle className="h-3 w-3 text-destructive" /> Fail</span>
              <span className="flex items-center gap-1"><MinusCircle className="h-3 w-3 text-muted-foreground" /> Untested</span>
            </div>
          </div>
          <Card className="border-border/40">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border/40 text-left text-sm text-muted-foreground">
                    <th className="p-4 font-medium">Feature</th>
                    {devices.map(d => <th key={d} className="p-4 font-medium text-center">{d}</th>)}
                  </tr>
                </thead>
                <tbody>
                  {features.map(f => (
                    <tr key={f} className="border-b border-border/20 hover:bg-muted/30 transition-colors">
                      <td className="p-4 font-medium text-sm">{f}</td>
                      {cols.map(c => (
                        <td key={c} className="p-4 text-center">
                          <StatusIcon status={testMatrix[f]?.[c] || "untested"} />
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="devices" className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Target Devices</h3>
            <Button size="sm" className="gap-2"><Plus className="h-4 w-4" /> Add Device</Button>
          </div>
          <Card className="border-border/40">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border/40 text-left text-sm text-muted-foreground">
                    <th className="p-4 font-medium">Device</th>
                    <th className="p-4 font-medium">OS</th>
                    <th className="p-4 font-medium">Browser</th>
                    <th className="p-4 font-medium">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {deviceList.map((d, i) => (
                    <tr key={i} className="border-b border-border/20 hover:bg-muted/30 transition-colors">
                      <td className="p-4 font-medium text-sm">{d.name}</td>
                      <td className="p-4 text-sm">{d.os}</td>
                      <td className="p-4 text-sm">{d.browser}</td>
                      <td className="p-4"><Badge variant={d.status === "Tested" ? "default" : "secondary"} className="text-xs">{d.status}</Badge></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="issues" className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">UAT Issues</h3>
            <Button size="sm" className="gap-2"><Plus className="h-4 w-4" /> Report Issue</Button>
          </div>
          <Card className="border-border/40">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border/40 text-left text-sm text-muted-foreground">
                    <th className="p-4 font-medium">Issue</th>
                    <th className="p-4 font-medium">Severity</th>
                    <th className="p-4 font-medium">Device</th>
                    <th className="p-4 font-medium">Assignee</th>
                    <th className="p-4 font-medium">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {issues.map((issue) => (
                    <tr key={issue.id} className="border-b border-border/20 hover:bg-muted/30 transition-colors">
                      <td className="p-4 font-medium text-sm">{issue.title}</td>
                      <td className="p-4">
                        <Badge variant={issue.severity === "Critical" ? "destructive" : issue.severity === "High" ? "default" : "secondary"} className="text-xs">{issue.severity}</Badge>
                      </td>
                      <td className="p-4 text-sm">{issue.device}</td>
                      <td className="p-4 text-sm">{issue.assignee}</td>
                      <td className="p-4">
                        <Badge variant={issue.status === "Resolved" ? "default" : issue.status === "In Progress" ? "secondary" : "outline"} className="text-xs">{issue.status}</Badge>
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
