import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AdminFilters } from "./AdminFilters";
import { ExportDropdown } from "./ExportDropdown";
import { SegmentsPanel, creatorSegments, affiliateSegments } from "./SegmentsPanel";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Search, MoreHorizontal, Eye, UserX, Star, UserPlus, Percent, CheckCircle, XCircle, Clock, FileText, Globe, MessageSquare, Filter,
} from "lucide-react";
import { toast } from "sonner";

const profiles = [
  { id: 1, name: "CryptoGuru", type: "Creator", tier: "Gold", markets: 12, referred: 0, volume: 890000, earnings: 5340, pendingEarnings: 1200, revenueShare: 20, payoutWallet: "0x7a2...f3e1", lastPayout: "2025-01-12", status: "Active" },
  { id: 2, name: "TechOracle", type: "Creator", tier: "Silver", markets: 8, referred: 0, volume: 456000, earnings: 2736, pendingEarnings: 680, revenueShare: 20, payoutWallet: "0x3b1...c8d2", lastPayout: "2025-01-12", status: "Active" },
  { id: 3, name: "SportsAnalyst", type: "Creator", tier: "Platinum", markets: 15, referred: 0, volume: 1200000, earnings: 7200, pendingEarnings: 1800, revenueShare: 20, payoutWallet: "0x9f4...a7b3", lastPayout: "2025-01-12", status: "Active" },
  { id: 4, name: "MarketMaven", type: "Creator", tier: "Bronze", markets: 0, referred: 0, volume: 0, earnings: 0, pendingEarnings: 0, revenueShare: 20, payoutWallet: "0x2c8...d5e9", lastPayout: "—", status: "Pending" },
  { id: 5, name: "ReferKing", type: "Affiliate", tier: "Silver", markets: 0, referred: 145, volume: 234000, earnings: 1404, pendingEarnings: 320, revenueShare: 20, payoutWallet: "0x6e3...b1f4", lastPayout: "2025-01-12", status: "Active" },
  { id: 6, name: "PromoQueen", type: "Affiliate", tier: "Gold", markets: 0, referred: 312, volume: 567000, earnings: 3402, pendingEarnings: 890, revenueShare: 20, payoutWallet: "0x8d7...c2a6", lastPayout: "2025-01-12", status: "Active" },
  { id: 7, name: "AllRounder", type: "Both", tier: "Gold", markets: 6, referred: 78, volume: 345000, earnings: 4100, pendingEarnings: 560, revenueShare: 20, payoutWallet: "0x1a5...e4d8", lastPayout: "2025-01-05", status: "Active" },
];

const pendingApplications = [
  { id: 101, name: "MarketMaven", wallet: "0x4a2...f8c1", appliedDate: "2025-01-15", topics: ["Crypto", "DeFi"], platforms: ["Twitter", "YouTube"], followers: "12.5K", bio: "DeFi analyst with 3 years of experience in crypto markets.", status: "Pending" },
  { id: 102, name: "NewsHound", wallet: "0x7b9...e3d5", appliedDate: "2025-01-14", topics: ["Politics", "World News"], platforms: ["Twitter", "Substack"], followers: "8.2K", bio: "Political journalist covering US and EU policy.", status: "Pending" },
  { id: 103, name: "SportsBetPro", wallet: "0x1c6...a7b2", appliedDate: "2025-01-13", topics: ["Sports", "NBA", "NFL"], platforms: ["Instagram", "TikTok"], followers: "45K", bio: "Sports analytics content creator focused on NBA and NFL predictions.", status: "Pending" },
  { id: 104, name: "TechInsider", wallet: "0x9e4...d2f8", appliedDate: "2025-01-12", topics: ["Tech", "AI"], platforms: ["YouTube", "Twitter"], followers: "22K", bio: "Tech reviewer and AI industry analyst.", status: "Under Review" },
  { id: 105, name: "CryptoWhale", wallet: "0x3f1...c9a4", appliedDate: "2025-01-11", topics: ["Crypto", "Trading"], platforms: ["Twitter"], followers: "3.1K", bio: "Day trader sharing market insights.", status: "Pending" },
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
  const [applications, setApplications] = useState(pendingApplications);

  const filtered = profiles.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = typeFilter === "all" || p.type.toLowerCase() === typeFilter || (typeFilter === "both" && p.type === "Both");
    return matchesSearch && matchesType;
  });

  const creators = profiles.filter(p => p.type === "Creator" || p.type === "Both");
  const affiliates = profiles.filter(p => p.type === "Affiliate" || p.type === "Both");
  const pendingCount = applications.filter(a => a.status === "Pending" || a.status === "Under Review").length;

  const handleApprove = (id: number) => {
    setApplications(prev => prev.filter(a => a.id !== id));
    toast.success("Application approved — creator account activated");
  };

  const handleReject = (id: number) => {
    setApplications(prev => prev.filter(a => a.id !== id));
    toast.success("Application rejected");
  };

  const handleMarkReview = (id: number) => {
    setApplications(prev => prev.map(a => a.id === id ? { ...a, status: "Under Review" } : a));
    toast("Marked for review");
  };

  return (
    <div className="space-y-5">
      <AdminFilters />

      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
        <Card className="border-border/40"><CardContent className="p-4"><div className="flex items-center gap-1.5 text-muted-foreground text-xs mb-1"><Star className="h-3.5 w-3.5" /> Creators</div><p className="text-2xl font-bold">{creators.length}</p></CardContent></Card>
        <Card className="border-border/40"><CardContent className="p-4"><div className="flex items-center gap-1.5 text-muted-foreground text-xs mb-1"><UserPlus className="h-3.5 w-3.5" /> Affiliates</div><p className="text-2xl font-bold">{affiliates.length}</p></CardContent></Card>
        <Card className="border-border/40 bg-success/5"><CardContent className="p-4"><p className="text-xs text-muted-foreground mb-1">Total Earnings</p><p className="text-2xl font-bold">${(profiles.reduce((a, c) => a + c.earnings, 0) / 1000).toFixed(1)}K</p></CardContent></Card>
        <Card className="border-border/40 bg-warning/5"><CardContent className="p-4"><p className="text-xs text-muted-foreground mb-1">Pending Earnings</p><p className="text-2xl font-bold">${(profiles.reduce((a, c) => a + c.pendingEarnings, 0) / 1000).toFixed(1)}K</p></CardContent></Card>
        <Card className="border-border/40 bg-primary/5"><CardContent className="p-4"><div className="flex items-center gap-1.5 text-primary text-xs mb-1"><Clock className="h-3.5 w-3.5" /> Pending Apps</div><p className="text-2xl font-bold">{pendingCount}</p></CardContent></Card>
      </div>

      <Tabs defaultValue="profiles" className="space-y-4">
        <TabsList className="flex-wrap h-auto gap-1">
          <TabsTrigger value="profiles">All Profiles</TabsTrigger>
          <TabsTrigger value="pending" className="gap-1.5">
            Pending Approval
            {pendingCount > 0 && <Badge className="ml-1 h-5 px-1.5 text-[10px] bg-warning/15 text-warning border-0">{pendingCount}</Badge>}
          </TabsTrigger>
          <TabsTrigger value="creator-segments" className="gap-1.5"><Filter className="h-3.5 w-3.5" /> Creator Segments</TabsTrigger>
          <TabsTrigger value="affiliate-segments" className="gap-1.5"><Filter className="h-3.5 w-3.5" /> Affiliate Segments</TabsTrigger>
        </TabsList>

        <TabsContent value="profiles" className="space-y-4">
          <div className="flex items-center gap-3 flex-wrap">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="pl-9 h-9" />
            </div>
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="w-40 h-9"><SelectValue /></SelectTrigger>
              <SelectContent><SelectItem value="all">All Types</SelectItem><SelectItem value="creator">Creators</SelectItem><SelectItem value="affiliate">Affiliates</SelectItem><SelectItem value="both">Both</SelectItem></SelectContent>
            </Select>
            <ExportDropdown data={filtered} filename="creators-affiliates" pdfTitle="Creators & Affiliates" />
          </div>

          <Card className="border-border/40">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border/40 text-left text-xs text-muted-foreground">
                    <th className="p-3 font-medium">Name</th><th className="p-3 font-medium">Type</th><th className="p-3 font-medium">Tier</th><th className="p-3 font-medium">Rev Share</th><th className="p-3 font-medium">Payout Wallet</th><th className="p-3 font-medium">Lifetime Earnings</th><th className="p-3 font-medium">Pending</th><th className="p-3 font-medium">Last Payout</th><th className="p-3 font-medium text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((p) => (
                    <tr key={p.id} className="border-b border-border/20 hover:bg-muted/30 transition-colors">
                      <td className="p-3 font-medium text-sm">{p.name}</td>
                      <td className="p-3"><Badge className={`text-xs border-0 ${p.type === "Creator" ? "bg-primary/10 text-primary" : p.type === "Affiliate" ? "bg-accent text-accent-foreground" : "bg-warning/10 text-warning"}`}>{p.type}</Badge></td>
                      <td className="p-3"><Badge className={`text-xs border-0 ${tierColors[p.tier] || 'bg-muted text-muted-foreground'}`}>{p.tier}</Badge></td>
                      <td className="p-3 text-sm">{p.revenueShare}%</td>
                      <td className="p-3 text-xs font-mono text-muted-foreground">{p.payoutWallet}</td>
                      <td className="p-3 text-sm font-medium text-success">${p.earnings.toLocaleString()}</td>
                      <td className="p-3 text-sm font-medium text-warning">${p.pendingEarnings.toLocaleString()}</td>
                      <td className="p-3 text-xs text-muted-foreground">{p.lastPayout}</td>
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
        </TabsContent>

        <TabsContent value="pending" className="space-y-4">
          {applications.length === 0 ? (
            <Card className="border-border/40">
              <CardContent className="p-12 text-center">
                <CheckCircle className="h-10 w-10 text-success mx-auto mb-3" />
                <p className="text-sm font-medium">All caught up!</p>
                <p className="text-xs text-muted-foreground mt-1">No pending creator applications.</p>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-3">
              {applications.map((app) => (
                <Card key={app.id} className="border-border/40">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1 space-y-3">
                        <div className="flex items-center gap-3">
                          <h4 className="font-semibold text-sm">{app.name}</h4>
                          <Badge className={`text-[10px] border-0 ${app.status === "Under Review" ? "bg-primary/10 text-primary" : "bg-warning/10 text-warning"}`}>{app.status}</Badge>
                          <span className="text-xs text-muted-foreground font-mono">{app.wallet}</span>
                        </div>
                        <p className="text-sm text-muted-foreground">{app.bio}</p>
                        <div className="flex items-center gap-4 flex-wrap">
                          <div className="flex items-center gap-1.5 text-xs text-muted-foreground"><FileText className="h-3.5 w-3.5" /><span className="font-medium text-foreground">{app.topics.join(", ")}</span></div>
                          <div className="flex items-center gap-1.5 text-xs text-muted-foreground"><Globe className="h-3.5 w-3.5" /><span className="font-medium text-foreground">{app.platforms.join(", ")}</span></div>
                          <div className="flex items-center gap-1.5 text-xs text-muted-foreground"><UserPlus className="h-3.5 w-3.5" /><span className="font-medium text-foreground">{app.followers} followers</span></div>
                          <span className="text-xs text-muted-foreground">Applied {app.appliedDate}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 shrink-0">
                        {app.status === "Pending" && (
                          <Button variant="outline" size="sm" className="h-8 text-xs gap-1.5" onClick={() => handleMarkReview(app.id)}><Eye className="h-3.5 w-3.5" /> Review</Button>
                        )}
                        <Button variant="outline" size="sm" className="h-8 text-xs gap-1.5" onClick={() => toast(`Message sent to ${app.name}`)}><MessageSquare className="h-3.5 w-3.5" /> Message</Button>
                        <Button size="sm" className="h-8 text-xs gap-1.5 bg-success hover:bg-success/90 text-success-foreground" onClick={() => handleApprove(app.id)}><CheckCircle className="h-3.5 w-3.5" /> Approve</Button>
                        <Button variant="outline" size="sm" className="h-8 text-xs gap-1.5 text-destructive hover:text-destructive" onClick={() => handleReject(app.id)}><XCircle className="h-3.5 w-3.5" /> Reject</Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="creator-segments">
          <SegmentsPanel builtInSegments={creatorSegments} entity="creator" />
        </TabsContent>

        <TabsContent value="affiliate-segments">
          <SegmentsPanel builtInSegments={affiliateSegments} entity="affiliate" />
        </TabsContent>
      </Tabs>
    </div>
  );
};
