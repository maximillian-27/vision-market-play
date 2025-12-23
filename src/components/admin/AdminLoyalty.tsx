import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Gift, Star, Trophy, Coins, Users, Settings, MoreHorizontal, Eye, Edit, Plus, Percent, Calendar, Target } from "lucide-react";

const loyaltyStats = {
  totalPoints: 2340000,
  pointsRedeemed: 890000,
  activeRewards: 12,
  totalBonuses: 45600,
};

const loyaltyTiers = [
  { name: "Bronze", users: 45000, minPoints: 0, benefits: "5% bonus on deposits", multiplier: 1, color: "bg-orange-500/10 text-orange-500" },
  { name: "Silver", users: 23000, minPoints: 1000, benefits: "10% bonus, priority support", multiplier: 1.5, color: "bg-slate-400/10 text-slate-400" },
  { name: "Gold", users: 8500, minPoints: 5000, benefits: "15% bonus, exclusive markets", multiplier: 2, color: "bg-yellow-500/10 text-yellow-500" },
  { name: "Platinum", users: 2100, minPoints: 20000, benefits: "20% bonus, VIP support", multiplier: 3, color: "bg-primary/10 text-primary" },
];

const rewards = [
  { id: 1, name: "Deposit Bonus 10%", type: "Bonus", cost: 500, claimed: 1234, status: "Active" },
  { id: 2, name: "Free Trade", type: "Perk", cost: 250, claimed: 890, status: "Active" },
  { id: 3, name: "VIP Support Access", type: "Access", cost: 1000, claimed: 456, status: "Active" },
  { id: 4, name: "Exclusive Market Access", type: "Access", cost: 2000, claimed: 234, status: "Active" },
  { id: 5, name: "Cash Reward $50", type: "Cash", cost: 5000, claimed: 89, status: "Limited" },
];

const bonuses = [
  { id: 1, name: "Welcome Bonus", type: "One-time", value: "100%", conditions: "First deposit", usage: 3456, status: "Active" },
  { id: 2, name: "Weekly Reload", type: "Recurring", value: "25%", conditions: "Min $100 deposit", usage: 1234, status: "Active" },
  { id: 3, name: "Referral Bonus", type: "Per action", value: "$25", conditions: "Friend signs up", usage: 890, status: "Active" },
  { id: 4, name: "Birthday Bonus", type: "Annual", value: "50%", conditions: "On user birthday", usage: 456, status: "Active" },
  { id: 5, name: "Holiday Special", type: "Limited", value: "75%", conditions: "Dec 20-31", usage: 0, status: "Scheduled" },
];

const promotions = [
  { id: 1, name: "New Year Trading Challenge", startDate: "2024-01-01", endDate: "2024-01-31", participants: 2340, prize: "$10,000", status: "Active" },
  { id: 2, name: "Prediction League", startDate: "2024-02-01", endDate: "2024-02-29", participants: 0, prize: "$5,000", status: "Upcoming" },
  { id: 3, name: "Holiday Giveaway", startDate: "2023-12-15", endDate: "2023-12-31", participants: 4560, prize: "$15,000", status: "Ended" },
];

export const AdminLoyalty = () => {
  return (
    <div className="space-y-6">
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList className="bg-muted/50 p-1 flex-wrap h-auto gap-1">
          <TabsTrigger value="overview" className="data-[state=active]:bg-background gap-2">
            <Star className="h-4 w-4" />
            Overview
          </TabsTrigger>
          <TabsTrigger value="tiers" className="data-[state=active]:bg-background gap-2">
            <Trophy className="h-4 w-4" />
            Tiers
          </TabsTrigger>
          <TabsTrigger value="rewards" className="data-[state=active]:bg-background gap-2">
            <Gift className="h-4 w-4" />
            Rewards
          </TabsTrigger>
          <TabsTrigger value="bonuses" className="data-[state=active]:bg-background gap-2">
            <Percent className="h-4 w-4" />
            Bonuses
          </TabsTrigger>
          <TabsTrigger value="promotions" className="data-[state=active]:bg-background gap-2">
            <Target className="h-4 w-4" />
            Promotions
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          {/* Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <Card className="border-border/40">
              <CardContent className="p-4">
                <div className="flex items-center gap-2 text-muted-foreground text-sm mb-1">
                  <Coins className="h-4 w-4" />
                  Total Points in Circulation
                </div>
                <p className="text-2xl font-bold">{(loyaltyStats.totalPoints / 1000000).toFixed(2)}M</p>
              </CardContent>
            </Card>
            <Card className="border-border/40">
              <CardContent className="p-4">
                <div className="flex items-center gap-2 text-muted-foreground text-sm mb-1">
                  <Gift className="h-4 w-4" />
                  Points Redeemed
                </div>
                <p className="text-2xl font-bold">{(loyaltyStats.pointsRedeemed / 1000).toFixed(0)}K</p>
              </CardContent>
            </Card>
            <Card className="border-border/40">
              <CardContent className="p-4">
                <p className="text-sm text-muted-foreground mb-1">Active Rewards</p>
                <p className="text-2xl font-bold">{loyaltyStats.activeRewards}</p>
              </CardContent>
            </Card>
            <Card className="border-border/40 bg-success/5">
              <CardContent className="p-4">
                <p className="text-sm text-muted-foreground mb-1">Total Bonuses Paid</p>
                <p className="text-2xl font-bold text-success">${loyaltyStats.totalBonuses.toLocaleString()}</p>
              </CardContent>
            </Card>
          </div>

          {/* Tier Distribution */}
          <Card className="border-border/40">
            <CardHeader className="pb-3">
              <CardTitle className="text-base">User Distribution by Tier</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {loyaltyTiers.map((tier) => {
                const total = loyaltyTiers.reduce((acc, t) => acc + t.users, 0);
                const percentage = (tier.users / total) * 100;
                return (
                  <div key={tier.name} className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-2">
                        <Badge className={`text-xs border-0 ${tier.color}`}>{tier.name}</Badge>
                        <span className="text-muted-foreground">{tier.users.toLocaleString()} users</span>
                      </div>
                      <span className="font-medium">{percentage.toFixed(1)}%</span>
                    </div>
                    <Progress value={percentage} className="h-2" />
                  </div>
                );
              })}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="tiers" className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Loyalty Tiers</h3>
            <Button variant="outline" size="sm" className="gap-2">
              <Settings className="h-4 w-4" />
              Configure Tiers
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {loyaltyTiers.map((tier) => (
              <Card key={tier.name} className="border-border/40">
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Trophy className="h-5 w-5" />
                      {tier.name}
                    </CardTitle>
                    <Badge className={`text-xs border-0 ${tier.color}`}>{tier.users.toLocaleString()} users</Badge>
                  </div>
                  <CardDescription>Min {tier.minPoints.toLocaleString()} points</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p className="text-sm text-muted-foreground">{tier.benefits}</p>
                  <div className="flex items-center justify-between pt-2 border-t border-border/40">
                    <span className="text-sm text-muted-foreground">Points Multiplier</span>
                    <Badge variant="secondary">{tier.multiplier}x</Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="rewards" className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Reward Catalog</h3>
            <Button size="sm" className="gap-2">
              <Plus className="h-4 w-4" />
              Add Reward
            </Button>
          </div>

          <Card className="border-border/40">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border/40 text-left text-sm text-muted-foreground">
                    <th className="p-4 font-medium">Reward</th>
                    <th className="p-4 font-medium">Type</th>
                    <th className="p-4 font-medium">Points Cost</th>
                    <th className="p-4 font-medium">Claimed</th>
                    <th className="p-4 font-medium">Status</th>
                    <th className="p-4 font-medium text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {rewards.map((reward) => (
                    <tr key={reward.id} className="border-b border-border/20 hover:bg-muted/30 transition-colors">
                      <td className="p-4 font-medium">{reward.name}</td>
                      <td className="p-4">
                        <Badge variant="outline" className="text-xs">{reward.type}</Badge>
                      </td>
                      <td className="p-4 text-sm">{reward.cost.toLocaleString()} pts</td>
                      <td className="p-4 text-sm">{reward.claimed.toLocaleString()}</td>
                      <td className="p-4">
                        <Badge
                          variant={reward.status === "Active" ? "default" : "secondary"}
                          className="text-xs"
                        >
                          {reward.status}
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
                              <Eye className="h-4 w-4" /> View
                            </DropdownMenuItem>
                            <DropdownMenuItem className="gap-2">
                              <Edit className="h-4 w-4" /> Edit
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

        <TabsContent value="bonuses" className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Bonus Programs</h3>
            <Button size="sm" className="gap-2">
              <Plus className="h-4 w-4" />
              Create Bonus
            </Button>
          </div>

          <Card className="border-border/40">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border/40 text-left text-sm text-muted-foreground">
                    <th className="p-4 font-medium">Bonus</th>
                    <th className="p-4 font-medium">Type</th>
                    <th className="p-4 font-medium">Value</th>
                    <th className="p-4 font-medium">Conditions</th>
                    <th className="p-4 font-medium">Usage</th>
                    <th className="p-4 font-medium">Status</th>
                    <th className="p-4 font-medium text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {bonuses.map((bonus) => (
                    <tr key={bonus.id} className="border-b border-border/20 hover:bg-muted/30 transition-colors">
                      <td className="p-4 font-medium">{bonus.name}</td>
                      <td className="p-4">
                        <Badge variant="outline" className="text-xs">{bonus.type}</Badge>
                      </td>
                      <td className="p-4 text-sm font-medium text-success">{bonus.value}</td>
                      <td className="p-4 text-sm text-muted-foreground">{bonus.conditions}</td>
                      <td className="p-4 text-sm">{bonus.usage.toLocaleString()}</td>
                      <td className="p-4">
                        <Badge
                          variant={bonus.status === "Active" ? "default" : "secondary"}
                          className="text-xs"
                        >
                          {bonus.status}
                        </Badge>
                      </td>
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

        <TabsContent value="promotions" className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Promotions & Challenges</h3>
            <Button size="sm" className="gap-2">
              <Plus className="h-4 w-4" />
              Create Promotion
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {promotions.map((promo) => (
              <Card key={promo.id} className="border-border/40">
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-base">{promo.name}</CardTitle>
                    <Badge
                      variant={promo.status === "Active" ? "default" : promo.status === "Upcoming" ? "secondary" : "outline"}
                      className="text-xs"
                    >
                      {promo.status}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Calendar className="h-4 w-4" />
                    {promo.startDate} - {promo.endDate}
                  </div>
                  <div className="flex items-center justify-between pt-2 border-t border-border/40">
                    <div>
                      <p className="text-xs text-muted-foreground">Participants</p>
                      <p className="font-medium">{promo.participants.toLocaleString()}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-muted-foreground">Prize Pool</p>
                      <p className="font-medium text-success">{promo.prize}</p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm" className="w-full">Manage</Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};
