import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { Gift, Plus, Trophy, Tag, Star } from "lucide-react";
import { toast } from "sonner";

const activeBonuses = [
  { id: 1, name: "Welcome Bonus", type: "Deposit Match", value: "100%", maxValue: "$500", eligible: "New Users", used: 1240, budget: 50000, spent: 32000, active: true },
  { id: 2, name: "Weekend Free Bet", type: "Free Bet", value: "$10", maxValue: "$10", eligible: "All Users", used: 3400, budget: 34000, spent: 28000, active: true },
  { id: 3, name: "VIP Cashback", type: "Cashback", value: "5%", maxValue: "$1000", eligible: "VIP Tier", used: 89, budget: 20000, spent: 8900, active: true },
  { id: 4, name: "Crypto Boost", type: "Deposit Match", value: "50%", maxValue: "$250", eligible: "Crypto Depositors", used: 456, budget: 15000, spent: 12300, active: false },
];

const loyaltyTiers = [
  { name: "Bronze", minPoints: 0, users: 45000, perks: "Basic access" },
  { name: "Silver", minPoints: 1000, users: 12000, perks: "5% cashback, priority support" },
  { name: "Gold", minPoints: 5000, users: 3400, perks: "10% cashback, exclusive markets" },
  { name: "Platinum", minPoints: 25000, users: 340, perks: "15% cashback, personal manager" },
];

export const AdminBonusManagement = () => {
  const [bonusType, setBonusType] = useState("deposit_match");

  return (
    <div className="space-y-6">
      <Tabs defaultValue="active" className="space-y-4">
        <TabsList className="bg-muted/50 p-1">
          <TabsTrigger value="active" className="data-[state=active]:bg-background gap-2"><Gift className="h-4 w-4" /> Active Bonuses</TabsTrigger>
          <TabsTrigger value="create" className="data-[state=active]:bg-background gap-2"><Plus className="h-4 w-4" /> Create Bonus</TabsTrigger>
          <TabsTrigger value="promotions" className="data-[state=active]:bg-background gap-2"><Tag className="h-4 w-4" /> Promotions</TabsTrigger>
          <TabsTrigger value="loyalty" className="data-[state=active]:bg-background gap-2"><Trophy className="h-4 w-4" /> Loyalty Tiers</TabsTrigger>
        </TabsList>

        <TabsContent value="active" className="space-y-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <Card className="border-border/40"><CardContent className="p-4"><p className="text-sm text-muted-foreground mb-1">Active Bonuses</p><p className="text-2xl font-bold">{activeBonuses.filter(b => b.active).length}</p></CardContent></Card>
            <Card className="border-border/40"><CardContent className="p-4"><p className="text-sm text-muted-foreground mb-1">Total Claims</p><p className="text-2xl font-bold">{activeBonuses.reduce((a, b) => a + b.used, 0).toLocaleString()}</p></CardContent></Card>
            <Card className="border-border/40 bg-success/5"><CardContent className="p-4"><p className="text-sm text-muted-foreground mb-1">Total Budget</p><p className="text-2xl font-bold">${(activeBonuses.reduce((a, b) => a + b.budget, 0) / 1000).toFixed(0)}K</p></CardContent></Card>
            <Card className="border-border/40 bg-warning/5"><CardContent className="p-4"><p className="text-sm text-muted-foreground mb-1">Budget Spent</p><p className="text-2xl font-bold">${(activeBonuses.reduce((a, b) => a + b.spent, 0) / 1000).toFixed(0)}K</p></CardContent></Card>
          </div>
          <Card className="border-border/40">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border/40 text-left text-sm text-muted-foreground">
                    <th className="p-4 font-medium">Bonus</th><th className="p-4 font-medium">Type</th><th className="p-4 font-medium">Value</th><th className="p-4 font-medium">Eligible</th><th className="p-4 font-medium">Claims</th><th className="p-4 font-medium">Budget</th><th className="p-4 font-medium">Active</th>
                  </tr>
                </thead>
                <tbody>
                  {activeBonuses.map((b) => (
                    <tr key={b.id} className="border-b border-border/20 hover:bg-muted/30 transition-colors">
                      <td className="p-4 font-medium">{b.name}</td>
                      <td className="p-4"><Badge variant="outline" className="text-xs">{b.type}</Badge></td>
                      <td className="p-4 text-sm">{b.value} (max {b.maxValue})</td>
                      <td className="p-4 text-sm">{b.eligible}</td>
                      <td className="p-4 text-sm">{b.used.toLocaleString()}</td>
                      <td className="p-4 text-sm">${b.spent.toLocaleString()} / ${b.budget.toLocaleString()}</td>
                      <td className="p-4"><Switch defaultChecked={b.active} onCheckedChange={(checked) => toast.success(`${b.name} ${checked ? "activated" : "deactivated"}`)} /></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="create" className="space-y-4">
          <Card className="border-border/40 max-w-2xl">
            <CardContent className="p-6 space-y-4">
              <h3 className="font-semibold text-lg">Create New Bonus</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div><Label>Bonus Name</Label><Input placeholder="e.g. Summer Special" className="mt-1" /></div>
                <div>
                  <Label>Type</Label>
                  <Select value={bonusType} onValueChange={setBonusType}>
                    <SelectTrigger className="mt-1"><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="deposit_match">Deposit Match</SelectItem>
                      <SelectItem value="free_bet">Free Bet</SelectItem>
                      <SelectItem value="cashback">Cashback</SelectItem>
                      <SelectItem value="risk_free">Risk Free Bet</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div><Label>Value</Label><Input placeholder="e.g. 100% or $10" className="mt-1" /></div>
                <div><Label>Max Value</Label><Input placeholder="e.g. $500" className="mt-1" /></div>
                <div><Label>Budget Cap</Label><Input placeholder="e.g. 50000" type="number" className="mt-1" /></div>
                <div><Label>Expiry Date</Label><Input type="date" className="mt-1" /></div>
                <div className="sm:col-span-2">
                  <Label>Eligible Segment</Label>
                  <Select defaultValue="all">
                    <SelectTrigger className="mt-1"><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Users</SelectItem>
                      <SelectItem value="new">New Users</SelectItem>
                      <SelectItem value="vip">VIP Tier</SelectItem>
                      <SelectItem value="inactive">Inactive 30d+</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <Button className="w-full" onClick={() => toast.success("Bonus created successfully")}>Create Bonus</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="promotions" className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Active Promotions</h3>
            <Button size="sm" className="gap-2"><Plus className="h-4 w-4" /> New Promotion</Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card className="border-border/40">
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-2"><span className="font-semibold">Super Bowl Special</span><Badge className="text-xs">Active</Badge></div>
                <p className="text-sm text-muted-foreground mb-3">Bet $50 on any Super Bowl market, get $10 free bet</p>
                <div className="flex justify-between text-sm"><span className="text-muted-foreground">Claims: 890</span><span className="text-muted-foreground">Ends: Mar 15</span></div>
              </CardContent>
            </Card>
            <Card className="border-border/40">
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-2"><span className="font-semibold">Crypto Markets Boost</span><Badge className="text-xs">Active</Badge></div>
                <p className="text-sm text-muted-foreground mb-3">2x points on all crypto market trades this week</p>
                <div className="flex justify-between text-sm"><span className="text-muted-foreground">Claims: 2,340</span><span className="text-muted-foreground">Ends: Feb 28</span></div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="loyalty" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {loyaltyTiers.map((tier) => (
              <Card key={tier.name} className="border-border/40">
                <CardContent className="p-4">
                  <div className="flex items-center gap-2 mb-2"><Star className="h-4 w-4 text-warning" /><span className="font-semibold">{tier.name}</span></div>
                  <p className="text-xs text-muted-foreground mb-3">{tier.perks}</p>
                  <div className="flex justify-between text-sm"><span className="text-muted-foreground">Min Points</span><span className="font-medium">{tier.minPoints.toLocaleString()}</span></div>
                  <div className="flex justify-between text-sm mt-1"><span className="text-muted-foreground">Users</span><span className="font-medium">{tier.users.toLocaleString()}</span></div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};
