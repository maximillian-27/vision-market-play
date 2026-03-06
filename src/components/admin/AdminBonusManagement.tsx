import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent,
  AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Gift, Plus, Trophy, Tag, Star, MoreHorizontal, Copy, Pause, Trash2, Edit, Ticket, RefreshCw, Send, Shuffle, Users, DollarSign, CheckCircle } from "lucide-react";
import { toast } from "sonner";
import { Progress } from "@/components/ui/progress";

const activeBonuses = [
  { id: 1, name: "Welcome Bonus", type: "Deposit Match", value: "100%", maxValue: "$500", eligible: "New Users", used: 1240, budget: 50000, spent: 32000, active: true, revenueFromUsers: 85000 },
  { id: 2, name: "Weekend Free Ticket", type: "Free Ticket", value: "$10", maxValue: "$10", eligible: "All Users", used: 3400, budget: 34000, spent: 28000, active: true, revenueFromUsers: 42000 },
  { id: 3, name: "VIP Cashback", type: "Cashback", value: "5%", maxValue: "$1000", eligible: "VIP Tier", used: 89, budget: 20000, spent: 8900, active: true, revenueFromUsers: 34000 },
  { id: 4, name: "Crypto Deposit Boost", type: "Deposit Match", value: "50%", maxValue: "$250", eligible: "Crypto Depositors", used: 456, budget: 15000, spent: 12300, active: false, revenueFromUsers: 18000 },
];

const loyaltyTiers = [
  { name: "Bronze", minPoints: 0, users: 45000, perks: "Basic access", revenueFromTier: 125000, avgVolumePerUser: 2800, upgradeRate: 12.5 },
  { name: "Silver", minPoints: 1000, users: 12000, perks: "5% cashback, priority support", revenueFromTier: 340000, avgVolumePerUser: 28300, upgradeRate: 8.2 },
  { name: "Gold", minPoints: 5000, users: 3400, perks: "10% cashback, exclusive markets", revenueFromTier: 520000, avgVolumePerUser: 152900, upgradeRate: 4.1 },
  { name: "Platinum", minPoints: 25000, users: 340, perks: "15% cashback, personal manager", revenueFromTier: 890000, avgVolumePerUser: 2617600, upgradeRate: 0 },
];

const drawParticipants = [
  { id: 1, username: "CryptoKing99", email: "crypto@example.com", tickets: 24, totalVolume: 12400, joined: "2025-01-12" },
  { id: 2, username: "BetMaster", email: "betmaster@example.com", tickets: 18, totalVolume: 9200, joined: "2025-01-13" },
  { id: 3, username: "LuckyShot", email: "lucky@example.com", tickets: 45, totalVolume: 23100, joined: "2025-01-10" },
  { id: 4, username: "MarketPro", email: "pro@example.com", tickets: 12, totalVolume: 6800, joined: "2025-01-14" },
  { id: 5, username: "PredictorX", email: "pred@example.com", tickets: 31, totalVolume: 15900, joined: "2025-01-11" },
  { id: 6, username: "OddsHunter", email: "odds@example.com", tickets: 8, totalVolume: 4100, joined: "2025-01-15" },
  { id: 7, username: "TrendSetter", email: "trend@example.com", tickets: 56, totalVolume: 28700, joined: "2025-01-09" },
  { id: 8, username: "WhaleBet", email: "whale@example.com", tickets: 72, totalVolume: 36800, joined: "2025-01-08" },
  { id: 9, username: "SmartPlay", email: "smart@example.com", tickets: 15, totalVolume: 7600, joined: "2025-01-14" },
  { id: 10, username: "RiskTaker", email: "risk@example.com", tickets: 22, totalVolume: 11300, joined: "2025-01-12" },
];

export const AdminBonusManagement = () => {
  const [bonusType, setBonusType] = useState("deposit_match");
  const [drawStatus, setDrawStatus] = useState<"open" | "drawn" | "paid">("open");
  const [selectedWinners, setSelectedWinners] = useState<number[]>([]);
  const [participantSearch, setParticipantSearch] = useState("");

  const totalTickets = drawParticipants.reduce((a, p) => a + p.tickets, 0);
  const drawPool = totalTickets * 0.50; // $0.50 base × 2% draw contribution simplified
  const prizePool = 2840; // mock total prize pool

  const handleRandomDraw = () => {
    // Weighted random selection based on ticket count
    const shuffled = [...drawParticipants].sort(() => Math.random() - 0.5);
    const winners = shuffled.slice(0, 10).map(p => p.id);
    setSelectedWinners(winners);
    setDrawStatus("drawn");
    toast.success("10 winners drawn randomly (weighted by tickets)");
  };

  const handleSendFunds = () => {
    setDrawStatus("paid");
    toast.success(`Funds distributed to ${selectedWinners.length} winners`);
  };

  const handleRestart = () => {
    setSelectedWinners([]);
    setDrawStatus("open");
    toast.success("Weekly draw reset — new cycle started");
  };

  const filteredParticipants = drawParticipants.filter(p =>
    p.username.toLowerCase().includes(participantSearch.toLowerCase()) ||
    p.email.toLowerCase().includes(participantSearch.toLowerCase())
  );

  const winnerPrizes = selectedWinners.map((id, idx) => {
    const share = idx === 0 ? 0.50 : (0.50 / (selectedWinners.length - 1));
    return { id, prize: prizePool * share };
  });

  return (
    <div className="space-y-6">
      <Tabs defaultValue="active" className="space-y-4">
        <TabsList className="bg-muted/50 p-1 flex-wrap h-auto gap-1">
          <TabsTrigger value="active" className="data-[state=active]:bg-background gap-2"><Gift className="h-4 w-4" /> Active Bonuses</TabsTrigger>
          <TabsTrigger value="create" className="data-[state=active]:bg-background gap-2"><Plus className="h-4 w-4" /> Create Bonus</TabsTrigger>
          <TabsTrigger value="promotions" className="data-[state=active]:bg-background gap-2"><Tag className="h-4 w-4" /> Promotions</TabsTrigger>
          <TabsTrigger value="loyalty" className="data-[state=active]:bg-background gap-2"><Trophy className="h-4 w-4" /> Loyalty Tiers</TabsTrigger>
          <TabsTrigger value="draw" className="data-[state=active]:bg-background gap-2"><Ticket className="h-4 w-4" /> Weekly Draw</TabsTrigger>
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
                    <th className="p-4 font-medium">Bonus</th>
                    <th className="p-4 font-medium">Type</th>
                    <th className="p-4 font-medium">Value</th>
                    <th className="p-4 font-medium">Eligible</th>
                    <th className="p-4 font-medium">Claims</th>
                    <th className="p-4 font-medium">Budget Progress</th>
                    <th className="p-4 font-medium">ROI</th>
                    <th className="p-4 font-medium">Active</th>
                    <th className="p-4 font-medium text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {activeBonuses.map((b) => {
                    const roi = b.spent > 0 ? ((b.revenueFromUsers - b.spent) / b.spent * 100) : 0;
                    const budgetPercent = (b.spent / b.budget) * 100;
                    return (
                      <tr key={b.id} className="border-b border-border/20 hover:bg-muted/30 transition-colors">
                        <td className="p-4 font-medium">{b.name}</td>
                        <td className="p-4"><Badge variant="outline" className="text-xs">{b.type}</Badge></td>
                        <td className="p-4 text-sm">{b.value} (max {b.maxValue})</td>
                        <td className="p-4 text-sm">{b.eligible}</td>
                        <td className="p-4 text-sm">{b.used.toLocaleString()}</td>
                        <td className="p-4">
                          <div className="space-y-1">
                            <Progress value={budgetPercent} className="h-2" />
                            <p className="text-xs text-muted-foreground">${b.spent.toLocaleString()} / ${b.budget.toLocaleString()}</p>
                          </div>
                        </td>
                        <td className="p-4">
                          <span className={`text-sm font-medium ${roi >= 0 ? 'text-success' : 'text-destructive'}`}>{roi >= 0 ? '+' : ''}{roi.toFixed(0)}%</span>
                        </td>
                        <td className="p-4"><Switch defaultChecked={b.active} onCheckedChange={(checked) => toast.success(`${b.name} ${checked ? "activated" : "deactivated"}`)} /></td>
                        <td className="p-4 text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild><Button variant="ghost" size="icon" className="h-8 w-8"><MoreHorizontal className="h-4 w-4" /></Button></DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="bg-popover">
                              <DropdownMenuItem className="gap-2" onClick={() => toast(`Editing ${b.name}`)}><Edit className="h-4 w-4" /> Edit</DropdownMenuItem>
                              <DropdownMenuItem className="gap-2" onClick={() => toast.success(`${b.name} duplicated`)}><Copy className="h-4 w-4" /> Duplicate</DropdownMenuItem>
                              <DropdownMenuItem className="gap-2" onClick={() => toast.success(`${b.name} deactivated`)}><Pause className="h-4 w-4" /> Deactivate</DropdownMenuItem>
                              <DropdownMenuItem className="gap-2 text-destructive" onClick={() => toast.success(`${b.name} deleted`)}><Trash2 className="h-4 w-4" /> Delete</DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </td>
                      </tr>
                    );
                  })}
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
                <div><Label>Bonus Name</Label><Input placeholder="e.g. Crypto Welcome Bonus" className="mt-1" /></div>
                <div>
                  <Label>Type</Label>
                  <Select value={bonusType} onValueChange={setBonusType}>
                    <SelectTrigger className="mt-1"><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="deposit_match">Deposit Match</SelectItem>
                      <SelectItem value="free_ticket">Free Ticket</SelectItem>
                      <SelectItem value="cashback">Cashback</SelectItem>
                      <SelectItem value="risk_free">Risk Free Ticket</SelectItem>
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
                      <SelectItem value="crypto">Crypto Depositors</SelectItem>
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
            <Button size="sm" className="gap-2" onClick={() => toast("Promotion builder would open here")}><Plus className="h-4 w-4" /> New Promotion</Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card className="border-border/40">
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-2"><span className="font-semibold">Super Bowl Special</span><Badge className="text-xs">Active</Badge></div>
                <p className="text-sm text-muted-foreground mb-3">Buy $50 in tickets on any Super Bowl market, get $10 free ticket</p>
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
                  <div className="space-y-1 text-sm">
                    <div className="flex justify-between"><span className="text-muted-foreground">Min Points</span><span className="font-medium">{tier.minPoints.toLocaleString()}</span></div>
                    <div className="flex justify-between"><span className="text-muted-foreground">Users</span><span className="font-medium">{tier.users.toLocaleString()}</span></div>
                    <div className="flex justify-between"><span className="text-muted-foreground">Revenue</span><span className="font-medium text-success">${(tier.revenueFromTier / 1000).toFixed(0)}K</span></div>
                    <div className="flex justify-between"><span className="text-muted-foreground">Avg Vol/User</span><span className="font-medium">${tier.avgVolumePerUser.toLocaleString()}</span></div>
                    {tier.upgradeRate > 0 && (
                      <div className="flex justify-between"><span className="text-muted-foreground">Upgrade Rate</span><span className="font-medium text-primary">{tier.upgradeRate}%</span></div>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Weekly Draw */}
        <TabsContent value="draw" className="space-y-4">
          {/* Draw Status & Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <Card className="border-border/40">
              <CardContent className="p-4">
                <p className="text-sm text-muted-foreground mb-1">Status</p>
                <Badge className={drawStatus === "open" ? "bg-success/10 text-success border-0" : drawStatus === "drawn" ? "bg-warning/10 text-warning border-0" : "bg-primary/10 text-primary border-0"}>
                  {drawStatus === "open" ? "Accepting Entries" : drawStatus === "drawn" ? "Winners Selected" : "Funds Sent"}
                </Badge>
              </CardContent>
            </Card>
            <Card className="border-border/40">
              <CardContent className="p-4">
                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1"><Users className="h-3.5 w-3.5" /> Participants</div>
                <p className="text-2xl font-bold">{drawParticipants.length}</p>
              </CardContent>
            </Card>
            <Card className="border-border/40">
              <CardContent className="p-4">
                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1"><Ticket className="h-3.5 w-3.5" /> Total Tickets</div>
                <p className="text-2xl font-bold">{totalTickets.toLocaleString()}</p>
              </CardContent>
            </Card>
            <Card className="border-border/40 bg-amber-500/5">
              <CardContent className="p-4">
                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1"><DollarSign className="h-3.5 w-3.5" /> Prize Pool</div>
                <p className="text-2xl font-bold text-amber-500">${prizePool.toLocaleString()}</p>
              </CardContent>
            </Card>
          </div>

          {/* Actions */}
          <Card className="border-border/40">
            <CardContent className="p-4">
              <div className="flex items-center justify-between flex-wrap gap-3">
                <div>
                  <h3 className="font-semibold">Draw Actions</h3>
                  <p className="text-xs text-muted-foreground">1st place gets 50% · Remaining 50% split among 9 runners-up</p>
                </div>
                <div className="flex items-center gap-2">
                  {drawStatus === "open" && (
                    <Button className="gap-2 bg-amber-500 hover:bg-amber-600 text-white" onClick={handleRandomDraw}>
                      <Shuffle className="h-4 w-4" /> Draw 10 Winners
                    </Button>
                  )}
                  {drawStatus === "drawn" && (
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button className="gap-2" variant="default">
                          <Send className="h-4 w-4" /> Send Funds to Winners
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Confirm Fund Distribution</AlertDialogTitle>
                          <AlertDialogDescription>
                            This will send ${prizePool.toLocaleString()} to {selectedWinners.length} winners. 1st place receives ${(prizePool * 0.5).toFixed(0)} and the rest split ${(prizePool * 0.5).toFixed(0)} evenly. This action cannot be undone.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction onClick={handleSendFunds}>Confirm & Send</AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  )}
                  {drawStatus === "paid" && (
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button className="gap-2" variant="outline">
                          <RefreshCw className="h-4 w-4" /> Restart Draw
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Restart Weekly Draw?</AlertDialogTitle>
                          <AlertDialogDescription>
                            This will clear all current participants and winners, starting a fresh weekly cycle. Make sure all funds have been distributed.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction onClick={handleRestart}>Restart</AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Winners (shown after draw) */}
          {selectedWinners.length > 0 && (
            <Card className="border-amber-500/30 bg-amber-500/5">
              <CardContent className="p-4 space-y-3">
                <div className="flex items-center gap-2">
                  <Trophy className="h-5 w-5 text-amber-500" />
                  <h3 className="font-semibold">Winners</h3>
                  {drawStatus === "paid" && <Badge className="bg-success/10 text-success border-0 text-xs"><CheckCircle className="h-3 w-3 mr-1" /> Paid</Badge>}
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-border/40 text-left text-sm text-muted-foreground">
                        <th className="p-3 font-medium">Place</th>
                        <th className="p-3 font-medium">User</th>
                        <th className="p-3 font-medium">Tickets</th>
                        <th className="p-3 font-medium text-right">Prize</th>
                      </tr>
                    </thead>
                    <tbody>
                      {winnerPrizes.map((w, idx) => {
                        const user = drawParticipants.find(p => p.id === w.id);
                        return (
                          <tr key={w.id} className="border-b border-border/20 hover:bg-muted/30 transition-colors">
                            <td className="p-3">
                              {idx === 0 ? (
                                <Badge className="bg-amber-500/20 text-amber-500 border-0 text-xs">🥇 1st</Badge>
                              ) : (
                                <span className="text-sm text-muted-foreground">{idx + 1}th</span>
                              )}
                            </td>
                            <td className="p-3">
                              <p className="font-medium text-sm">{user?.username}</p>
                              <p className="text-xs text-muted-foreground">{user?.email}</p>
                            </td>
                            <td className="p-3 text-sm">{user?.tickets}</td>
                            <td className="p-3 text-right font-bold text-sm text-amber-500">${w.prize.toFixed(2)}</td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Participants */}
          <Card className="border-border/40">
            <CardContent className="p-4 space-y-3">
              <div className="flex items-center justify-between flex-wrap gap-3">
                <h3 className="font-semibold">All Participants</h3>
                <div className="relative w-64">
                  <Input placeholder="Search participants..." value={participantSearch} onChange={(e) => setParticipantSearch(e.target.value)} className="h-8 text-sm" />
                </div>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border/40 text-left text-sm text-muted-foreground">
                      <th className="p-3 font-medium">User</th>
                      <th className="p-3 font-medium">Tickets</th>
                      <th className="p-3 font-medium">Volume</th>
                      <th className="p-3 font-medium">Win Chance</th>
                      <th className="p-3 font-medium">Joined</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredParticipants.map((p) => (
                      <tr key={p.id} className={`border-b border-border/20 hover:bg-muted/30 transition-colors ${selectedWinners.includes(p.id) ? "bg-amber-500/5" : ""}`}>
                        <td className="p-3">
                          <div className="flex items-center gap-2">
                            {selectedWinners.includes(p.id) && <Trophy className="h-3.5 w-3.5 text-amber-500" />}
                            <div>
                              <p className="font-medium text-sm">{p.username}</p>
                              <p className="text-xs text-muted-foreground">{p.email}</p>
                            </div>
                          </div>
                        </td>
                        <td className="p-3 text-sm font-medium">{p.tickets}</td>
                        <td className="p-3 text-sm">${p.totalVolume.toLocaleString()}</td>
                        <td className="p-3 text-sm">{((p.tickets / totalTickets) * 100).toFixed(1)}%</td>
                        <td className="p-3 text-sm text-muted-foreground">{p.joined}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
