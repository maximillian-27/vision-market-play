import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Search, MoreHorizontal, Eye, CheckCircle, XCircle, Star, TrendingUp, Users, Link2, Copy, Plus } from "lucide-react";

const creators = [
  { id: 1, name: "CryptoGuru", email: "crypto@guru.com", status: "Active", markets: 45, volume: 234000, followers: 12500, rating: 4.8, commission: 12400 },
  { id: 2, name: "TechOracle", email: "tech@oracle.com", status: "Active", markets: 32, volume: 189000, followers: 8900, rating: 4.6, commission: 8900 },
  { id: 3, name: "PoliticalPredict", email: "political@predict.com", status: "Active", markets: 28, volume: 156000, followers: 6700, rating: 4.5, commission: 6200 },
  { id: 4, name: "SportsAnalyst", email: "sports@analyst.com", status: "Pending", markets: 0, volume: 0, followers: 0, rating: 0, commission: 0 },
  { id: 5, name: "MarketMaven", email: "market@maven.com", status: "Suspended", markets: 12, volume: 45000, followers: 2300, rating: 3.2, commission: 1800 },
];

export const AdminCreators = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredCreators = creators.filter((c) =>
    c.name.toLowerCase().includes(searchQuery.toLowerCase()) || c.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const activeCreators = creators.filter(c => c.status === "Active").length;
  const totalVolume = creators.reduce((acc, c) => acc + c.volume, 0);

  return (
    <div className="space-y-6">
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList className="bg-muted/50 p-1">
          <TabsTrigger value="overview" className="data-[state=active]:bg-background gap-2"><TrendingUp className="h-4 w-4" /> Overview</TabsTrigger>
          <TabsTrigger value="creators" className="data-[state=active]:bg-background gap-2"><Users className="h-4 w-4" /> Creators</TabsTrigger>
          <TabsTrigger value="reporting" className="data-[state=active]:bg-background gap-2"><Star className="h-4 w-4" /> Reporting</TabsTrigger>
          <TabsTrigger value="links" className="data-[state=active]:bg-background gap-2"><Link2 className="h-4 w-4" /> Links & Codes</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <Card className="border-border/40">
              <CardContent className="p-4">
                <div className="flex items-center gap-2 text-muted-foreground text-sm mb-1"><Users className="h-4 w-4" /> Active Creators</div>
                <p className="text-2xl font-bold">{activeCreators}</p>
              </CardContent>
            </Card>
            <Card className="border-border/40 bg-warning/5">
              <CardContent className="p-4">
                <p className="text-sm text-muted-foreground mb-1">Pending Applications</p>
                <p className="text-2xl font-bold">{creators.filter(c => c.status === "Pending").length}</p>
              </CardContent>
            </Card>
            <Card className="border-border/40">
              <CardContent className="p-4">
                <div className="flex items-center gap-2 text-muted-foreground text-sm mb-1"><TrendingUp className="h-4 w-4" /> Total Volume</div>
                <p className="text-2xl font-bold">${(totalVolume / 1000).toFixed(0)}K</p>
              </CardContent>
            </Card>
            <Card className="border-border/40 bg-success/5">
              <CardContent className="p-4">
                <p className="text-sm text-muted-foreground mb-1">Commission Paid</p>
                <p className="text-2xl font-bold">${creators.reduce((a, c) => a + c.commission, 0).toLocaleString()}</p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="creators" className="space-y-4">
          <div className="flex items-center justify-end gap-3">
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search creators..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="pl-9 h-9" />
            </div>
          </div>
          <Card className="border-border/40">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border/40 text-left text-sm text-muted-foreground">
                    <th className="p-4 font-medium">Creator</th>
                    <th className="p-4 font-medium">Status</th>
                    <th className="p-4 font-medium">Markets</th>
                    <th className="p-4 font-medium">Volume</th>
                    <th className="p-4 font-medium">Followers</th>
                    <th className="p-4 font-medium">Rating</th>
                    <th className="p-4 font-medium text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredCreators.map((creator) => (
                    <tr key={creator.id} className="border-b border-border/20 hover:bg-muted/30 transition-colors">
                      <td className="p-4">
                        <p className="font-medium">{creator.name}</p>
                        <p className="text-sm text-muted-foreground">{creator.email}</p>
                      </td>
                      <td className="p-4">
                        <Badge variant={creator.status === "Active" ? "default" : creator.status === "Pending" ? "secondary" : "destructive"} className="text-xs">{creator.status}</Badge>
                      </td>
                      <td className="p-4 text-sm">{creator.markets}</td>
                      <td className="p-4 text-sm font-medium">${creator.volume.toLocaleString()}</td>
                      <td className="p-4 text-sm">{creator.followers.toLocaleString()}</td>
                      <td className="p-4">
                        <div className="flex items-center gap-1">
                          <Star className="h-3 w-3 fill-warning text-warning" />
                          <span className="text-sm">{creator.rating || "-"}</span>
                        </div>
                      </td>
                      <td className="p-4 text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild><Button variant="ghost" size="icon" className="h-8 w-8"><MoreHorizontal className="h-4 w-4" /></Button></DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="bg-popover">
                            <DropdownMenuItem className="gap-2"><Eye className="h-4 w-4" /> View Profile</DropdownMenuItem>
                            {creator.status === "Pending" && (
                              <>
                                <DropdownMenuItem className="gap-2 text-success"><CheckCircle className="h-4 w-4" /> Approve</DropdownMenuItem>
                                <DropdownMenuItem className="gap-2 text-destructive"><XCircle className="h-4 w-4" /> Reject</DropdownMenuItem>
                              </>
                            )}
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
            {creators.filter(c => c.status === "Active").map((c) => (
              <Card key={c.id} className="border-border/40">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-semibold">{c.name}</span>
                    <div className="flex items-center gap-1"><Star className="h-3 w-3 fill-warning text-warning" /><span className="text-sm">{c.rating}</span></div>
                  </div>
                  <div className="grid grid-cols-2 gap-y-2 text-sm">
                    <span className="text-muted-foreground">Markets Created</span><span className="text-right font-medium">{c.markets}</span>
                    <span className="text-muted-foreground">Volume Generated</span><span className="text-right font-medium">${c.volume.toLocaleString()}</span>
                    <span className="text-muted-foreground">Commission Earned</span><span className="text-right font-medium">${c.commission.toLocaleString()}</span>
                    <span className="text-muted-foreground">Followers</span><span className="text-right font-medium">{c.followers.toLocaleString()}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="links" className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Creator Tracking Links</h3>
            <Button size="sm" className="gap-2"><Plus className="h-4 w-4" /> Generate Link</Button>
          </div>
          <Card className="border-border/40">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border/40 text-left text-sm text-muted-foreground">
                    <th className="p-4 font-medium">Creator</th>
                    <th className="p-4 font-medium">Link</th>
                    <th className="p-4 font-medium">Clicks</th>
                    <th className="p-4 font-medium">Conversions</th>
                    <th className="p-4 font-medium text-right">Copy</th>
                  </tr>
                </thead>
                <tbody>
                  {creators.filter(c => c.status === "Active").map((c) => (
                    <tr key={c.id} className="border-b border-border/20 hover:bg-muted/30 transition-colors">
                      <td className="p-4 font-medium">{c.name}</td>
                      <td className="p-4"><code className="text-xs bg-muted px-2 py-1 rounded">pollgy.com/?ref={c.name.toLowerCase()}</code></td>
                      <td className="p-4 text-sm">{(c.followers * 2).toLocaleString()}</td>
                      <td className="p-4 text-sm">{Math.floor(c.followers * 0.15).toLocaleString()}</td>
                      <td className="p-4 text-right"><Button variant="ghost" size="icon" className="h-8 w-8"><Copy className="h-4 w-4" /></Button></td>
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
