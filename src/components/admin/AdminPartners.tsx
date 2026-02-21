import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Search, MoreHorizontal, Eye, TrendingUp, Users, DollarSign, Link2, Copy, Plus, Handshake } from "lucide-react";
import { toast } from "sonner";

const partners = [
  { id: 1, name: "BettingInsider", type: "Media", status: "Active", referrals: 3420, volume: 890000, commission: 34500, rate: 20 },
  { id: 2, name: "CryptoNews Daily", type: "Influencer", status: "Active", referrals: 2100, volume: 560000, commission: 22100, rate: 18 },
  { id: 3, name: "SportsBlogger", type: "Affiliate", status: "Active", referrals: 890, volume: 234000, commission: 8900, rate: 15 },
  { id: 4, name: "FinanceHub", type: "Media", status: "Pending", referrals: 0, volume: 0, commission: 0, rate: 15 },
];

export const AdminPartners = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const filtered = partners.filter(p =>
    p.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList className="bg-muted/50 p-1">
          <TabsTrigger value="overview" className="data-[state=active]:bg-background gap-2">
            <Handshake className="h-4 w-4" /> Overview
          </TabsTrigger>
          <TabsTrigger value="partners" className="data-[state=active]:bg-background gap-2">
            <Users className="h-4 w-4" /> Partners
          </TabsTrigger>
          <TabsTrigger value="reporting" className="data-[state=active]:bg-background gap-2">
            <TrendingUp className="h-4 w-4" /> Reporting
          </TabsTrigger>
          <TabsTrigger value="links" className="data-[state=active]:bg-background gap-2">
            <Link2 className="h-4 w-4" /> Links & Codes
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <Card className="border-border/40">
              <CardContent className="p-4">
                <div className="flex items-center gap-2 text-muted-foreground text-sm mb-1">
                  <Handshake className="h-4 w-4" /> Active Partners
                </div>
                <p className="text-2xl font-bold">{partners.filter(p => p.status === "Active").length}</p>
              </CardContent>
            </Card>
            <Card className="border-border/40">
              <CardContent className="p-4">
                <div className="flex items-center gap-2 text-muted-foreground text-sm mb-1">
                  <Users className="h-4 w-4" /> Total Referrals
                </div>
                <p className="text-2xl font-bold">{partners.reduce((a, p) => a + p.referrals, 0).toLocaleString()}</p>
              </CardContent>
            </Card>
            <Card className="border-border/40">
              <CardContent className="p-4">
                <div className="flex items-center gap-2 text-muted-foreground text-sm mb-1">
                  <TrendingUp className="h-4 w-4" /> Total Volume
                </div>
                <p className="text-2xl font-bold">${(partners.reduce((a, p) => a + p.volume, 0) / 1000000).toFixed(1)}M</p>
              </CardContent>
            </Card>
            <Card className="border-border/40 bg-success/5">
              <CardContent className="p-4">
                <div className="flex items-center gap-2 text-muted-foreground text-sm mb-1">
                  <DollarSign className="h-4 w-4" /> Commission Paid
                </div>
                <p className="text-2xl font-bold">${(partners.reduce((a, p) => a + p.commission, 0)).toLocaleString()}</p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="partners" className="space-y-4">
          <div className="flex items-center justify-between gap-3">
            <div className="relative flex-1 sm:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search partners..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="pl-9 h-9" />
            </div>
            <Button size="sm" className="gap-2" onClick={() => toast("Partner onboarding form would open here")}><Plus className="h-4 w-4" /> Add Partner</Button>
          </div>
          <Card className="border-border/40">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border/40 text-left text-sm text-muted-foreground">
                    <th className="p-4 font-medium">Partner</th>
                    <th className="p-4 font-medium">Type</th>
                    <th className="p-4 font-medium">Status</th>
                    <th className="p-4 font-medium">Referrals</th>
                    <th className="p-4 font-medium">Volume</th>
                    <th className="p-4 font-medium">Commission</th>
                    <th className="p-4 font-medium">Rate</th>
                    <th className="p-4 font-medium text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((p) => (
                    <tr key={p.id} className="border-b border-border/20 hover:bg-muted/30 transition-colors">
                      <td className="p-4 font-medium">{p.name}</td>
                      <td className="p-4"><Badge variant="outline" className="text-xs">{p.type}</Badge></td>
                      <td className="p-4"><Badge variant={p.status === "Active" ? "default" : "secondary"} className="text-xs">{p.status}</Badge></td>
                      <td className="p-4 text-sm">{p.referrals.toLocaleString()}</td>
                      <td className="p-4 text-sm font-medium">${p.volume.toLocaleString()}</td>
                      <td className="p-4 text-sm">${p.commission.toLocaleString()}</td>
                      <td className="p-4 text-sm">{p.rate}%</td>
                      <td className="p-4 text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-8 w-8"><MoreHorizontal className="h-4 w-4" /></Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="bg-popover">
                            <DropdownMenuItem className="gap-2" onClick={() => toast(`Opening partner: ${p.name}`)}><Eye className="h-4 w-4" /> View</DropdownMenuItem>
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

        <TabsContent value="reporting" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {partners.filter(p => p.status === "Active").map((p) => (
              <Card key={p.id} className="border-border/40">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-semibold">{p.name}</span>
                    <Badge variant="outline" className="text-xs">{p.type}</Badge>
                  </div>
                  <div className="grid grid-cols-2 gap-y-2 text-sm">
                    <span className="text-muted-foreground">Referrals</span><span className="text-right font-medium">{p.referrals.toLocaleString()}</span>
                    <span className="text-muted-foreground">Volume</span><span className="text-right font-medium">${p.volume.toLocaleString()}</span>
                    <span className="text-muted-foreground">Commission</span><span className="text-right font-medium">${p.commission.toLocaleString()}</span>
                    <span className="text-muted-foreground">Rate</span><span className="text-right font-medium">{p.rate}%</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="links" className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Partner Tracking Links</h3>
            <Button size="sm" className="gap-2" onClick={() => toast.success("New partner link generated")}><Plus className="h-4 w-4" /> Generate Link</Button>
          </div>
          <Card className="border-border/40">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border/40 text-left text-sm text-muted-foreground">
                    <th className="p-4 font-medium">Partner</th>
                    <th className="p-4 font-medium">Link</th>
                    <th className="p-4 font-medium">Clicks</th>
                    <th className="p-4 font-medium">Conversions</th>
                    <th className="p-4 font-medium text-right">Copy</th>
                  </tr>
                </thead>
                <tbody>
                  {partners.filter(p => p.status === "Active").map((p) => (
                    <tr key={p.id} className="border-b border-border/20 hover:bg-muted/30 transition-colors">
                      <td className="p-4 font-medium">{p.name}</td>
                      <td className="p-4"><code className="text-xs bg-muted px-2 py-1 rounded">pollgy.com/?ref={p.name.toLowerCase().replace(/\s/g, '')}</code></td>
                      <td className="p-4 text-sm">{(p.referrals * 3).toLocaleString()}</td>
                      <td className="p-4 text-sm">{p.referrals.toLocaleString()}</td>
                      <td className="p-4 text-right">
                        <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => { navigator.clipboard.writeText(`pollgy.com/?ref=${p.name.toLowerCase().replace(/\s/g, '')}`); toast.success("Link copied to clipboard"); }}><Copy className="h-4 w-4" /></Button>
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
