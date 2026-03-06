import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AdminFilters } from "./AdminFilters";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Search, MoreHorizontal, Eye, UserX, Star, UserPlus, Percent, DollarSign,
} from "lucide-react";
import { toast } from "sonner";

const profiles = [
  { id: 1, name: "CryptoGuru", type: "Creator", tier: "Gold", markets: 12, referred: 0, volume: 890000, earnings: 5340, status: "Active" },
  { id: 2, name: "TechOracle", type: "Creator", tier: "Silver", markets: 8, referred: 0, volume: 456000, earnings: 2736, status: "Active" },
  { id: 3, name: "SportsAnalyst", type: "Creator", tier: "Platinum", markets: 15, referred: 0, volume: 1200000, earnings: 7200, status: "Active" },
  { id: 4, name: "MarketMaven", type: "Creator", tier: "Bronze", markets: 0, referred: 0, volume: 0, earnings: 0, status: "Pending" },
  { id: 5, name: "ReferKing", type: "Affiliate", tier: "Silver", markets: 0, referred: 145, volume: 234000, earnings: 1404, status: "Active" },
  { id: 6, name: "PromoQueen", type: "Affiliate", tier: "Gold", markets: 0, referred: 312, volume: 567000, earnings: 3402, status: "Active" },
  { id: 7, name: "AllRounder", type: "Both", tier: "Gold", markets: 6, referred: 78, volume: 345000, earnings: 4100, status: "Active" },
];

const tierColors: Record<string, string> = {
  Bronze: "bg-orange-500/10 text-orange-500",
  Silver: "bg-muted text-muted-foreground",
  Gold: "bg-warning/10 text-warning",
  Platinum: "bg-primary/10 text-primary",
};

export const AdminCreatorsAffiliates = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");

  const filtered = profiles.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = typeFilter === "all" || p.type.toLowerCase() === typeFilter || (typeFilter === "both" && p.type === "Both");
    return matchesSearch && matchesType;
  });

  const creators = profiles.filter(p => p.type === "Creator" || p.type === "Both");
  const affiliates = profiles.filter(p => p.type === "Affiliate" || p.type === "Both");
  const pending = profiles.filter(p => p.status === "Pending").length;

  return (
    <div className="space-y-5">
      <AdminFilters />

      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
        <Card className="border-border/40"><CardContent className="p-4"><div className="flex items-center gap-1.5 text-muted-foreground text-xs mb-1"><Star className="h-3.5 w-3.5" /> Creators</div><p className="text-2xl font-bold">{creators.length}</p></CardContent></Card>
        <Card className="border-border/40"><CardContent className="p-4"><div className="flex items-center gap-1.5 text-muted-foreground text-xs mb-1"><UserPlus className="h-3.5 w-3.5" /> Affiliates</div><p className="text-2xl font-bold">{affiliates.length}</p></CardContent></Card>
        <Card className="border-border/40 bg-success/5"><CardContent className="p-4"><p className="text-xs text-muted-foreground mb-1">Creator Earnings</p><p className="text-2xl font-bold">${(creators.reduce((a, c) => a + c.earnings, 0) / 1000).toFixed(1)}K</p></CardContent></Card>
        <Card className="border-border/40 bg-primary/5"><CardContent className="p-4"><p className="text-xs text-muted-foreground mb-1">Affiliate Earnings</p><p className="text-2xl font-bold">${(affiliates.reduce((a, a2) => a + a2.earnings, 0) / 1000).toFixed(1)}K</p></CardContent></Card>
        <Card className="border-border/40 bg-warning/5"><CardContent className="p-4"><p className="text-xs text-muted-foreground mb-1">Pending Apps</p><p className="text-2xl font-bold">{pending}</p></CardContent></Card>
      </div>

      <div className="flex items-center gap-3 flex-wrap">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="pl-9 h-9" />
        </div>
        <Select value={typeFilter} onValueChange={setTypeFilter}>
          <SelectTrigger className="w-40 h-9"><SelectValue /></SelectTrigger>
          <SelectContent><SelectItem value="all">All Types</SelectItem><SelectItem value="creator">Creators</SelectItem><SelectItem value="affiliate">Affiliates</SelectItem><SelectItem value="both">Both</SelectItem></SelectContent>
        </Select>
      </div>

      <Card className="border-border/40">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border/40 text-left text-xs text-muted-foreground">
                <th className="p-3 font-medium">Name</th><th className="p-3 font-medium">Type</th><th className="p-3 font-medium">Tier</th><th className="p-3 font-medium">Markets</th><th className="p-3 font-medium">Referred</th><th className="p-3 font-medium">Volume</th><th className="p-3 font-medium">Earnings</th><th className="p-3 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((p) => (
                <tr key={p.id} className="border-b border-border/20 hover:bg-muted/30 transition-colors">
                  <td className="p-3 font-medium text-sm">{p.name}</td>
                  <td className="p-3"><Badge className={`text-xs border-0 ${p.type === "Creator" ? "bg-primary/10 text-primary" : p.type === "Affiliate" ? "bg-accent text-accent-foreground" : "bg-warning/10 text-warning"}`}>{p.type}</Badge></td>
                  <td className="p-3"><Badge className={`text-xs border-0 ${tierColors[p.tier] || 'bg-muted text-muted-foreground'}`}>{p.tier}</Badge></td>
                  <td className="p-3 text-sm">{p.markets || "—"}</td>
                  <td className="p-3 text-sm">{p.referred || "—"}</td>
                  <td className="p-3 text-sm font-medium">${p.volume.toLocaleString()}</td>
                  <td className="p-3 text-sm font-medium text-success">${p.earnings.toLocaleString()}</td>
                  <td className="p-3 text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild><Button variant="ghost" size="icon" className="h-7 w-7"><MoreHorizontal className="h-4 w-4" /></Button></DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="bg-popover">
                        <DropdownMenuItem className="gap-2" onClick={() => toast(`Profile: ${p.name}`)}><Eye className="h-4 w-4" /> View Profile</DropdownMenuItem>
                        <DropdownMenuItem className="gap-2" onClick={() => toast(`Edit commission: ${p.name}`)}><Percent className="h-4 w-4" /> Edit Commission</DropdownMenuItem>
                        <DropdownMenuItem className="gap-2 text-destructive" onClick={() => toast.success("Suspended")}><UserX className="h-4 w-4" /> Suspend</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};
