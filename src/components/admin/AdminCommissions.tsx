import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { DollarSign, Users, Handshake, UserPlus, Link2, Copy, Plus, Search } from "lucide-react";

const creatorCommissions = [
  { id: 1, name: "CryptoGuru", rate: 15, model: "Revenue Share", payout: "Monthly", earned: 12400, status: "Active" },
  { id: 2, name: "TechOracle", rate: 12, model: "Revenue Share", payout: "Monthly", earned: 8900, status: "Active" },
  { id: 3, name: "PoliticalPredict", rate: 10, model: "CPA", payout: "Weekly", earned: 6200, status: "Active" },
  { id: 4, name: "SportsAnalyst", rate: 10, model: "Revenue Share", payout: "Monthly", earned: 0, status: "Pending" },
];

const partnerCommissions = [
  { id: 1, name: "BettingInsider", rate: 20, model: "Revenue Share", payout: "Monthly", earned: 34500, status: "Active" },
  { id: 2, name: "CryptoNews Daily", rate: 18, model: "CPA + Rev Share", payout: "Monthly", earned: 22100, status: "Active" },
  { id: 3, name: "SportsBlogger", rate: 15, model: "CPA", payout: "Weekly", earned: 8900, status: "Active" },
];

const codes = [
  { id: 1, code: "POLLGY-INSIDER20", type: "Partner", owner: "BettingInsider", uses: 342, limit: 1000, expiry: "2026-06-30", active: true },
  { id: 2, code: "CRYPTO-GURU15", type: "Creator", owner: "CryptoGuru", uses: 189, limit: 500, expiry: "2026-12-31", active: true },
  { id: 3, code: "WELCOME50", type: "Promo", owner: "Platform", uses: 1240, limit: 5000, expiry: "2026-03-31", active: true },
  { id: 4, code: "EXPIRED-CODE", type: "Promo", owner: "Platform", uses: 200, limit: 200, expiry: "2025-12-31", active: false },
];

export const AdminCommissions = () => {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="space-y-6">
      <Tabs defaultValue="creators" className="space-y-4">
        <TabsList className="bg-muted/50 p-1">
          <TabsTrigger value="creators" className="data-[state=active]:bg-background gap-2">
            <Users className="h-4 w-4" />
            Creator
          </TabsTrigger>
          <TabsTrigger value="partners" className="data-[state=active]:bg-background gap-2">
            <Handshake className="h-4 w-4" />
            Partner
          </TabsTrigger>
          <TabsTrigger value="raf" className="data-[state=active]:bg-background gap-2">
            <UserPlus className="h-4 w-4" />
            RAF
          </TabsTrigger>
          <TabsTrigger value="codes" className="data-[state=active]:bg-background gap-2">
            <Link2 className="h-4 w-4" />
            Codes & Links
          </TabsTrigger>
        </TabsList>

        <TabsContent value="creators" className="space-y-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <Card className="border-border/40">
              <CardContent className="p-4">
                <p className="text-sm text-muted-foreground mb-1">Active Creators</p>
                <p className="text-2xl font-bold">{creatorCommissions.filter(c => c.status === "Active").length}</p>
              </CardContent>
            </Card>
            <Card className="border-border/40">
              <CardContent className="p-4">
                <p className="text-sm text-muted-foreground mb-1">Avg Commission</p>
                <p className="text-2xl font-bold">11.75%</p>
              </CardContent>
            </Card>
            <Card className="border-border/40 bg-success/5">
              <CardContent className="p-4">
                <p className="text-sm text-muted-foreground mb-1">Total Paid Out</p>
                <p className="text-2xl font-bold">${(27500).toLocaleString()}</p>
              </CardContent>
            </Card>
            <Card className="border-border/40">
              <CardContent className="p-4">
                <p className="text-sm text-muted-foreground mb-1">Pending Payouts</p>
                <p className="text-2xl font-bold">$4,200</p>
              </CardContent>
            </Card>
          </div>

          <Card className="border-border/40">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border/40 text-left text-sm text-muted-foreground">
                    <th className="p-4 font-medium">Creator</th>
                    <th className="p-4 font-medium">Rate</th>
                    <th className="p-4 font-medium">Model</th>
                    <th className="p-4 font-medium">Payout</th>
                    <th className="p-4 font-medium">Earned</th>
                    <th className="p-4 font-medium">Status</th>
                    <th className="p-4 font-medium text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {creatorCommissions.map((c) => (
                    <tr key={c.id} className="border-b border-border/20 hover:bg-muted/30 transition-colors">
                      <td className="p-4 font-medium">{c.name}</td>
                      <td className="p-4">
                        <Input defaultValue={c.rate} className="w-20 h-8 text-center" type="number" />
                      </td>
                      <td className="p-4 text-sm">{c.model}</td>
                      <td className="p-4 text-sm">{c.payout}</td>
                      <td className="p-4 text-sm font-medium">${c.earned.toLocaleString()}</td>
                      <td className="p-4">
                        <Badge variant={c.status === "Active" ? "default" : "secondary"} className="text-xs">{c.status}</Badge>
                      </td>
                      <td className="p-4 text-right">
                        <Button variant="ghost" size="sm">Edit</Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="partners" className="space-y-4">
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
            <Card className="border-border/40">
              <CardContent className="p-4">
                <p className="text-sm text-muted-foreground mb-1">Active Partners</p>
                <p className="text-2xl font-bold">{partnerCommissions.length}</p>
              </CardContent>
            </Card>
            <Card className="border-border/40">
              <CardContent className="p-4">
                <p className="text-sm text-muted-foreground mb-1">Avg Rate</p>
                <p className="text-2xl font-bold">17.7%</p>
              </CardContent>
            </Card>
            <Card className="border-border/40 bg-success/5">
              <CardContent className="p-4">
                <p className="text-sm text-muted-foreground mb-1">Total Paid</p>
                <p className="text-2xl font-bold">${(65500).toLocaleString()}</p>
              </CardContent>
            </Card>
          </div>
          <Card className="border-border/40">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border/40 text-left text-sm text-muted-foreground">
                    <th className="p-4 font-medium">Partner</th>
                    <th className="p-4 font-medium">Rate</th>
                    <th className="p-4 font-medium">Model</th>
                    <th className="p-4 font-medium">Payout</th>
                    <th className="p-4 font-medium">Earned</th>
                    <th className="p-4 font-medium text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {partnerCommissions.map((p) => (
                    <tr key={p.id} className="border-b border-border/20 hover:bg-muted/30 transition-colors">
                      <td className="p-4 font-medium">{p.name}</td>
                      <td className="p-4">
                        <Input defaultValue={p.rate} className="w-20 h-8 text-center" type="number" />
                      </td>
                      <td className="p-4 text-sm">{p.model}</td>
                      <td className="p-4 text-sm">{p.payout}</td>
                      <td className="p-4 text-sm font-medium">${p.earned.toLocaleString()}</td>
                      <td className="p-4 text-right">
                        <Button variant="ghost" size="sm">Edit</Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="raf" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="border-border/40">
              <CardContent className="p-6 space-y-4">
                <h3 className="font-semibold">Refer-a-Friend Settings</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">RAF Program Active</span>
                    <Switch defaultChecked />
                  </div>
                  <div>
                    <label className="text-sm text-muted-foreground">Commission Rate (%)</label>
                    <Input defaultValue="10" type="number" className="mt-1 h-9" />
                  </div>
                  <div>
                    <label className="text-sm text-muted-foreground">Duration (months)</label>
                    <Input defaultValue="12" type="number" className="mt-1 h-9" />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Allow referral codes</span>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Allow referral links</span>
                    <Switch defaultChecked />
                  </div>
                  <Button size="sm" className="w-full">Save Settings</Button>
                </div>
              </CardContent>
            </Card>
            <Card className="border-border/40">
              <CardContent className="p-6 space-y-4">
                <h3 className="font-semibold">RAF Performance</h3>
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Total Referrals</span>
                    <span className="font-medium">3,456</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Converted Users</span>
                    <span className="font-medium">2,890</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Conversion Rate</span>
                    <span className="font-medium">83.6%</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Total Commission Paid</span>
                    <span className="font-medium">$45,230</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Revenue Generated</span>
                    <span className="font-medium">$452,300</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Avg Referral LTV</span>
                    <span className="font-medium">$156</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="codes" className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search codes..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="pl-9 h-9" />
            </div>
            <Button size="sm" className="gap-2"><Plus className="h-4 w-4" /> Generate Code</Button>
          </div>
          <Card className="border-border/40">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border/40 text-left text-sm text-muted-foreground">
                    <th className="p-4 font-medium">Code</th>
                    <th className="p-4 font-medium">Type</th>
                    <th className="p-4 font-medium">Owner</th>
                    <th className="p-4 font-medium">Uses</th>
                    <th className="p-4 font-medium">Expiry</th>
                    <th className="p-4 font-medium">Status</th>
                    <th className="p-4 font-medium text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {codes.map((c) => (
                    <tr key={c.id} className="border-b border-border/20 hover:bg-muted/30 transition-colors">
                      <td className="p-4">
                        <code className="text-xs bg-muted px-2 py-1 rounded font-mono">{c.code}</code>
                      </td>
                      <td className="p-4"><Badge variant="outline" className="text-xs">{c.type}</Badge></td>
                      <td className="p-4 text-sm">{c.owner}</td>
                      <td className="p-4 text-sm">{c.uses} / {c.limit}</td>
                      <td className="p-4 text-sm">{c.expiry}</td>
                      <td className="p-4">
                        <Badge variant={c.active ? "default" : "secondary"} className="text-xs">{c.active ? "Active" : "Expired"}</Badge>
                      </td>
                      <td className="p-4 text-right">
                        <Button variant="ghost" size="icon" className="h-8 w-8"><Copy className="h-4 w-4" /></Button>
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
