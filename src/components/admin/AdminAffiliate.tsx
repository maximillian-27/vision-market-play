import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Search, MoreHorizontal, UserPlus, Users, DollarSign, TrendingUp, Link, Copy, Eye, Ban, Edit, ArrowUpRight } from "lucide-react";
import { Progress } from "@/components/ui/progress";

const affiliateStats = {
  totalAffiliates: 892,
  activeAffiliates: 654,
  totalReferrals: 12450,
  totalPayouts: 124500,
  pendingPayouts: 8900,
  conversionRate: 4.8,
};

const affiliates = [
  { id: 1, name: "CryptoInfluencer", email: "crypto@influencer.com", code: "CRYPTO20", referrals: 234, earnings: 4560, pending: 450, status: "Active", tier: "Gold" },
  { id: 2, name: "TradingGuru", email: "trading@guru.com", code: "TRADE10", referrals: 189, earnings: 3240, pending: 320, status: "Active", tier: "Silver" },
  { id: 3, name: "PredictionPro", email: "prediction@pro.com", code: "PRED15", referrals: 156, earnings: 2890, pending: 0, status: "Active", tier: "Silver" },
  { id: 4, name: "MarketWatch", email: "market@watch.com", code: "MARKET", referrals: 98, earnings: 1450, pending: 200, status: "Paused", tier: "Bronze" },
  { id: 5, name: "BettingKing", email: "betting@king.com", code: "BETKING", referrals: 312, earnings: 6780, pending: 890, status: "Active", tier: "Platinum" },
];

const payouts = [
  { id: 1, affiliate: "BettingKing", amount: 890, method: "Bank Transfer", status: "Pending", date: "2024-01-15" },
  { id: 2, affiliate: "CryptoInfluencer", amount: 450, method: "Crypto (BTC)", status: "Pending", date: "2024-01-14" },
  { id: 3, name: "TradingGuru", amount: 320, method: "PayPal", status: "Processing", date: "2024-01-13" },
  { id: 4, name: "MarketWatch", amount: 200, method: "Bank Transfer", status: "Completed", date: "2024-01-10" },
];

const tiers = [
  { name: "Bronze", commission: 10, minReferrals: 0, affiliates: 234 },
  { name: "Silver", commission: 15, minReferrals: 50, affiliates: 156 },
  { name: "Gold", commission: 20, minReferrals: 150, affiliates: 89 },
  { name: "Platinum", commission: 25, minReferrals: 300, affiliates: 23 },
];

export const AdminAffiliate = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredAffiliates = affiliates.filter((affiliate) => {
    return affiliate.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      affiliate.code.toLowerCase().includes(searchQuery.toLowerCase());
  });

  return (
    <div className="space-y-6">
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList className="bg-muted/50 p-1">
          <TabsTrigger value="overview" className="data-[state=active]:bg-background gap-2">
            <TrendingUp className="h-4 w-4" />
            Overview
          </TabsTrigger>
          <TabsTrigger value="affiliates" className="data-[state=active]:bg-background gap-2">
            <Users className="h-4 w-4" />
            Affiliates
          </TabsTrigger>
          <TabsTrigger value="payouts" className="data-[state=active]:bg-background gap-2">
            <DollarSign className="h-4 w-4" />
            Payouts
          </TabsTrigger>
          <TabsTrigger value="tiers" className="data-[state=active]:bg-background gap-2">
            <Link className="h-4 w-4" />
            Commission Tiers
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          {/* Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
            <Card className="border-border/40">
              <CardContent className="p-4">
                <div className="flex items-center gap-2 text-muted-foreground text-sm mb-1">
                  <Users className="h-4 w-4" />
                  Total Affiliates
                </div>
                <p className="text-2xl font-bold">{affiliateStats.totalAffiliates}</p>
                <p className="text-xs text-muted-foreground">{affiliateStats.activeAffiliates} active</p>
              </CardContent>
            </Card>
            <Card className="border-border/40">
              <CardContent className="p-4">
                <div className="flex items-center gap-2 text-muted-foreground text-sm mb-1">
                  <UserPlus className="h-4 w-4" />
                  Total Referrals
                </div>
                <p className="text-2xl font-bold">{affiliateStats.totalReferrals.toLocaleString()}</p>
              </CardContent>
            </Card>
            <Card className="border-border/40">
              <CardContent className="p-4">
                <div className="flex items-center gap-2 text-muted-foreground text-sm mb-1">
                  <TrendingUp className="h-4 w-4" />
                  Conversion Rate
                </div>
                <p className="text-2xl font-bold">{affiliateStats.conversionRate}%</p>
              </CardContent>
            </Card>
            <Card className="border-border/40 bg-success/5">
              <CardContent className="p-4">
                <div className="flex items-center gap-2 text-success text-sm mb-1">
                  <DollarSign className="h-4 w-4" />
                  Total Payouts
                </div>
                <p className="text-2xl font-bold">${affiliateStats.totalPayouts.toLocaleString()}</p>
              </CardContent>
            </Card>
            <Card className="border-border/40 bg-warning/5">
              <CardContent className="p-4">
                <div className="flex items-center gap-2 text-warning text-sm mb-1">
                  <DollarSign className="h-4 w-4" />
                  Pending Payouts
                </div>
                <p className="text-2xl font-bold">${affiliateStats.pendingPayouts.toLocaleString()}</p>
              </CardContent>
            </Card>
            <Card className="border-border/40">
              <CardContent className="p-4">
                <p className="text-sm text-muted-foreground mb-1">Avg Earnings/Affiliate</p>
                <p className="text-2xl font-bold">${Math.round(affiliateStats.totalPayouts / affiliateStats.totalAffiliates)}</p>
              </CardContent>
            </Card>
          </div>

          {/* Top Affiliates */}
          <Card className="border-border/40">
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Top Performing Affiliates</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {affiliates.slice(0, 5).sort((a, b) => b.earnings - a.earnings).map((affiliate, index) => (
                <div key={affiliate.id} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-medium text-muted-foreground w-4">{index + 1}</span>
                    <div>
                      <p className="font-medium text-sm">{affiliate.name}</p>
                      <p className="text-xs text-muted-foreground">{affiliate.referrals} referrals</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-success">${affiliate.earnings.toLocaleString()}</p>
                    <Badge variant="secondary" className="text-xs">{affiliate.tier}</Badge>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="affiliates" className="space-y-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <h3 className="text-lg font-semibold">Manage Affiliates</h3>
            <div className="flex items-center gap-3 w-full sm:w-auto">
              <div className="relative flex-1 sm:w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search affiliates..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9 h-9"
                />
              </div>
              <Button size="sm" className="gap-2">
                <UserPlus className="h-4 w-4" />
                Add Affiliate
              </Button>
            </div>
          </div>

          <Card className="border-border/40">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border/40 text-left text-sm text-muted-foreground">
                    <th className="p-4 font-medium">Affiliate</th>
                    <th className="p-4 font-medium">Code</th>
                    <th className="p-4 font-medium">Tier</th>
                    <th className="p-4 font-medium">Referrals</th>
                    <th className="p-4 font-medium">Earnings</th>
                    <th className="p-4 font-medium">Pending</th>
                    <th className="p-4 font-medium">Status</th>
                    <th className="p-4 font-medium text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredAffiliates.map((affiliate) => (
                    <tr key={affiliate.id} className="border-b border-border/20 hover:bg-muted/30 transition-colors">
                      <td className="p-4">
                        <div>
                          <p className="font-medium">{affiliate.name}</p>
                          <p className="text-sm text-muted-foreground">{affiliate.email}</p>
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center gap-2">
                          <code className="px-2 py-1 rounded bg-muted text-sm">{affiliate.code}</code>
                          <Button variant="ghost" size="icon" className="h-6 w-6">
                            <Copy className="h-3 w-3" />
                          </Button>
                        </div>
                      </td>
                      <td className="p-4">
                        <Badge variant="secondary" className="text-xs">{affiliate.tier}</Badge>
                      </td>
                      <td className="p-4 text-sm">{affiliate.referrals}</td>
                      <td className="p-4 text-sm font-medium text-success">${affiliate.earnings.toLocaleString()}</td>
                      <td className="p-4 text-sm text-warning">${affiliate.pending}</td>
                      <td className="p-4">
                        <Badge
                          variant={affiliate.status === "Active" ? "default" : "secondary"}
                          className="text-xs"
                        >
                          {affiliate.status}
                        </Badge>
                      </td>
                      <td className="p-4 text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="bg-popover">
                            <DropdownMenuItem className="gap-2">
                              <Eye className="h-4 w-4" /> View Details
                            </DropdownMenuItem>
                            <DropdownMenuItem className="gap-2">
                              <Edit className="h-4 w-4" /> Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem className="gap-2 text-destructive">
                              <Ban className="h-4 w-4" /> Suspend
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

        <TabsContent value="payouts" className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Payout Management</h3>
            <Button size="sm">Process All Pending</Button>
          </div>

          <Card className="border-border/40">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border/40 text-left text-sm text-muted-foreground">
                    <th className="p-4 font-medium">Affiliate</th>
                    <th className="p-4 font-medium">Amount</th>
                    <th className="p-4 font-medium">Method</th>
                    <th className="p-4 font-medium">Status</th>
                    <th className="p-4 font-medium">Date</th>
                    <th className="p-4 font-medium text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {payouts.map((payout) => (
                    <tr key={payout.id} className="border-b border-border/20 hover:bg-muted/30 transition-colors">
                      <td className="p-4 font-medium">{payout.affiliate}</td>
                      <td className="p-4 text-sm font-medium">${payout.amount.toLocaleString()}</td>
                      <td className="p-4 text-sm text-muted-foreground">{payout.method}</td>
                      <td className="p-4">
                        <Badge
                          variant={payout.status === "Completed" ? "default" : payout.status === "Processing" ? "secondary" : "outline"}
                          className="text-xs"
                        >
                          {payout.status}
                        </Badge>
                      </td>
                      <td className="p-4 text-sm">{payout.date}</td>
                      <td className="p-4 text-right">
                        {payout.status === "Pending" && (
                          <Button size="sm" variant="outline">Approve</Button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="tiers" className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Commission Tiers</h3>
            <Button size="sm" variant="outline">Configure Tiers</Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {tiers.map((tier) => (
              <Card key={tier.name} className="border-border/40">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">{tier.name}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Commission</span>
                    <span className="text-xl font-bold text-success">{tier.commission}%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Min Referrals</span>
                    <span className="font-medium">{tier.minReferrals}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Affiliates</span>
                    <Badge variant="secondary">{tier.affiliates}</Badge>
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
