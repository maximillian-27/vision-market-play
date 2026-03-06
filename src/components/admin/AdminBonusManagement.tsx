import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Switch } from "@/components/ui/switch";
import { AdminFilters } from "./AdminFilters";
import { ExportDropdown } from "./ExportDropdown";
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal, Edit, Copy, Pause, Star } from "lucide-react";
import { toast } from "sonner";

const bonuses = [
  { id: 1, name: "Welcome Bonus", type: "Deposit Match", value: "100%", max: "$500", eligible: "New Users", claims: 1240, budget: 50000, spent: 32000, active: true, roi: 166 },
  { id: 2, name: "Weekend Free Ticket", type: "Free Ticket", value: "$10", max: "$10", eligible: "All Users", claims: 3400, budget: 34000, spent: 28000, active: true, roi: 50 },
  { id: 3, name: "VIP Cashback", type: "Cashback", value: "5%", max: "$1000", eligible: "VIP", claims: 89, budget: 20000, spent: 8900, active: true, roi: 282 },
  { id: 4, name: "Crypto Deposit Boost", type: "Deposit Match", value: "50%", max: "$250", eligible: "Crypto", claims: 456, budget: 15000, spent: 12300, active: false, roi: 46 },
];

const tiers = [
  { name: "Bronze", minPoints: 0, users: 45000, perks: "Basic access" },
  { name: "Silver", minPoints: 1000, users: 12000, perks: "5% cashback" },
  { name: "Gold", minPoints: 5000, users: 3400, perks: "10% cashback, exclusive markets" },
  { name: "Platinum", minPoints: 25000, users: 340, perks: "15% cashback, personal manager" },
];

export const AdminBonusManagement = () => {
  const totalBudget = bonuses.reduce((a, b) => a + b.budget, 0);
  const totalSpent = bonuses.reduce((a, b) => a + b.spent, 0);

  return (
    <div className="space-y-5">
      <AdminFilters showGeo={false} showCategory={false} />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="border-border/40"><CardContent className="p-4"><p className="text-xs text-muted-foreground mb-1">Active Bonuses</p><p className="text-2xl font-bold">{bonuses.filter(b => b.active).length}</p></CardContent></Card>
        <Card className="border-border/40"><CardContent className="p-4"><p className="text-xs text-muted-foreground mb-1">Total Claims</p><p className="text-2xl font-bold">{bonuses.reduce((a, b) => a + b.claims, 0).toLocaleString()}</p></CardContent></Card>
        <Card className="border-border/40 bg-warning/5"><CardContent className="p-4"><p className="text-xs text-muted-foreground mb-1">Budget Spent</p><p className="text-2xl font-bold">${(totalSpent / 1000).toFixed(0)}K <span className="text-sm font-normal text-muted-foreground">/ ${(totalBudget / 1000).toFixed(0)}K</span></p></CardContent></Card>
        <Card className="border-border/40 bg-success/5"><CardContent className="p-4"><p className="text-xs text-muted-foreground mb-1">Avg ROI</p><p className="text-2xl font-bold">{Math.round(bonuses.reduce((a, b) => a + b.roi, 0) / bonuses.length)}%</p></CardContent></Card>
      </div>

      {/* Bonus Table */}
      <div className="flex justify-end">
        <ExportDropdown data={bonuses.map(b => ({ ...b, budgetUsed: `${((b.spent / b.budget) * 100).toFixed(0)}%` }))} filename="bonuses" pdfTitle="Bonuses" />
      </div>
      <Card className="border-border/40">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border/40 text-left text-xs text-muted-foreground">
                <th className="p-3 font-medium">Bonus</th><th className="p-3 font-medium">Type</th><th className="p-3 font-medium">Value</th><th className="p-3 font-medium">Claims</th><th className="p-3 font-medium">Budget Cap</th><th className="p-3 font-medium">Budget Spent</th><th className="p-3 font-medium">ROI</th><th className="p-3 font-medium">Status</th><th className="p-3 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {bonuses.map((b) => (
                <tr key={b.id} className="border-b border-border/20 hover:bg-muted/30 transition-colors">
                  <td className="p-3 font-medium text-sm">{b.name}</td>
                  <td className="p-3"><Badge variant="outline" className="text-xs">{b.type}</Badge></td>
                  <td className="p-3 text-sm">{b.value} (max {b.max})</td>
                  <td className="p-3 text-sm">{b.claims.toLocaleString()}</td>
                  <td className="p-3 text-sm font-medium">${b.budget.toLocaleString()}</td>
                  <td className="p-3">
                    <Progress value={(b.spent / b.budget) * 100} className="h-1.5 w-20" />
                    <p className="text-[10px] text-muted-foreground mt-0.5">${b.spent.toLocaleString()} ({((b.spent / b.budget) * 100).toFixed(0)}%)</p>
                  </td>
                  <td className="p-3"><span className={`text-sm font-medium ${b.roi >= 0 ? 'text-success' : 'text-destructive'}`}>+{b.roi}%</span></td>
                  <td className="p-3"><Switch defaultChecked={b.active} onCheckedChange={(v) => toast.success(`${b.name} ${v ? "on" : "off"}`)} /></td>
                  <td className="p-3 text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild><Button variant="ghost" size="icon" className="h-7 w-7"><MoreHorizontal className="h-4 w-4" /></Button></DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="bg-popover">
                        <DropdownMenuItem className="gap-2" onClick={() => toast(`Editing ${b.name}`)}><Edit className="h-4 w-4" /> Edit</DropdownMenuItem>
                        <DropdownMenuItem className="gap-2" onClick={() => toast.success("Duplicated")}><Copy className="h-4 w-4" /> Duplicate</DropdownMenuItem>
                        <DropdownMenuItem className="gap-2 text-destructive" onClick={() => toast.success("Disabled")}><Pause className="h-4 w-4" /> Disable</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Loyalty Tiers */}
      <h3 className="text-sm font-semibold flex items-center gap-2"><Star className="h-4 w-4 text-warning" /> Loyalty Tiers</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {tiers.map((t) => (
          <Card key={t.name} className="border-border/40">
            <CardContent className="p-4">
              <p className="font-semibold text-sm">{t.name}</p>
              <p className="text-xs text-muted-foreground mb-2">{t.perks}</p>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Min Points</span>
                <span className="font-medium">{t.minPoints.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Users</span>
                <span className="font-medium">{t.users.toLocaleString()}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
