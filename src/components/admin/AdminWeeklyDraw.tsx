import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AdminFilters } from "./AdminFilters";
import { ExportDropdown } from "./ExportDropdown";
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent,
  AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Ticket, Users, DollarSign, Search, Shuffle, Send, RefreshCw, History } from "lucide-react";
import { toast } from "sonner";

const participants = [
  { id: 1, user: "CryptoKing99", tickets: 24, volume: 12400 },
  { id: 2, user: "BetMaster", tickets: 18, volume: 9200 },
  { id: 3, user: "LuckyShot", tickets: 45, volume: 23100 },
  { id: 4, user: "MarketPro", tickets: 12, volume: 6800 },
  { id: 5, user: "PredictorX", tickets: 31, volume: 15900 },
  { id: 6, user: "OddsHunter", tickets: 8, volume: 4100 },
  { id: 7, user: "TrendSetter", tickets: 56, volume: 28700 },
  { id: 8, user: "WhaleBet", tickets: 72, volume: 36800 },
  { id: 9, user: "SmartPlay", tickets: 15, volume: 7600 },
  { id: 10, user: "RiskTaker", tickets: 22, volume: 11300 },
];

const drawHistory = [
  { date: "2025-01-12", winners: "WhaleBet, TrendSetter, LuckyShot", prize: 2650, status: "Paid" },
  { date: "2025-01-05", winners: "PredictorX, CryptoKing99, BetMaster", prize: 2420, status: "Paid" },
  { date: "2024-12-29", winners: "SmartPlay, OddsHunter, MarketPro", prize: 2180, status: "Paid" },
  { date: "2024-12-22", winners: "RiskTaker, TrendSetter, WhaleBet", prize: 2890, status: "Paid" },
  { date: "2024-12-15", winners: "LuckyShot, BetMaster, PredictorX", prize: 2340, status: "Paid" },
];

export const AdminWeeklyDraw = () => {
  const [status, setStatus] = useState<"open" | "drawn" | "paid">("open");
  const [winners, setWinners] = useState<number[]>([]);
  const [search, setSearch] = useState("");

  const totalTickets = participants.reduce((a, p) => a + p.tickets, 0);
  const prizePool = 2840;

  const handleDraw = () => {
    const shuffled = [...participants].sort(() => Math.random() - 0.5);
    setWinners(shuffled.slice(0, 10).map(p => p.id));
    setStatus("drawn");
    toast.success("10 winners drawn");
  };

  const handleDistribute = () => {
    setStatus("paid");
    toast.success("Rewards distributed");
  };

  const handleRestart = () => {
    setWinners([]);
    setStatus("open");
    toast.success("Draw restarted");
  };

  const filtered = participants.filter(p => p.user.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="space-y-5">
      <AdminFilters showGeo={false} showCategory={false} />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="border-border/40"><CardContent className="p-4"><p className="text-xs text-muted-foreground mb-1">Status</p><Badge className={status === "open" ? "bg-success/10 text-success border-0" : status === "drawn" ? "bg-warning/10 text-warning border-0" : "bg-primary/10 text-primary border-0"}>{status === "open" ? "Accepting" : status === "drawn" ? "Drawn" : "Paid"}</Badge></CardContent></Card>
        <Card className="border-border/40"><CardContent className="p-4"><div className="flex items-center gap-1.5 text-muted-foreground text-xs mb-1"><Users className="h-3.5 w-3.5" /> Participants</div><p className="text-2xl font-bold">{participants.length}</p></CardContent></Card>
        <Card className="border-border/40"><CardContent className="p-4"><div className="flex items-center gap-1.5 text-muted-foreground text-xs mb-1"><Ticket className="h-3.5 w-3.5" /> Total Tickets</div><p className="text-2xl font-bold">{totalTickets}</p></CardContent></Card>
        <Card className="border-border/40 bg-success/5"><CardContent className="p-4"><div className="flex items-center gap-1.5 text-success text-xs mb-1"><DollarSign className="h-3.5 w-3.5" /> Prize Pool</div><p className="text-2xl font-bold">${prizePool.toLocaleString()}</p></CardContent></Card>
      </div>

      {/* Actions with confirmation dialogs */}
      <div className="flex items-center gap-2">
        {status === "open" && (
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button className="gap-1.5"><Shuffle className="h-4 w-4" /> Draw Winners</Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Draw Winners?</AlertDialogTitle>
                <AlertDialogDescription>This will randomly select 10 winners from {participants.length} participants with {totalTickets} total tickets. This action cannot be undone.</AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={handleDraw}>Draw Winners</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        )}
        {status === "drawn" && (
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button className="gap-1.5"><Send className="h-4 w-4" /> Distribute Rewards</Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Distribute Rewards?</AlertDialogTitle>
                <AlertDialogDescription>This will distribute ${prizePool.toLocaleString()} to the selected winners. 50% goes to 1st place, remainder split among runners-up. This action cannot be undone.</AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={handleDistribute}>Distribute</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        )}
        {status === "paid" && <Button onClick={handleRestart} variant="outline" className="gap-1.5"><RefreshCw className="h-4 w-4" /> Restart Draw</Button>}
      </div>

      <div className="relative max-w-sm">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input placeholder="Search participants..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-9 h-9" />
      </div>

      <Card className="border-border/40">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border/40 text-left text-xs text-muted-foreground">
                <th className="p-3 font-medium">User</th><th className="p-3 font-medium">Tickets</th><th className="p-3 font-medium">Volume</th><th className="p-3 font-medium">Win Prob</th><th className="p-3 font-medium">Winner</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((p) => (
                <tr key={p.id} className={`border-b border-border/20 hover:bg-muted/30 transition-colors ${winners.includes(p.id) ? 'bg-success/5' : ''}`}>
                  <td className="p-3 font-medium text-sm">{p.user}</td>
                  <td className="p-3 text-sm">{p.tickets}</td>
                  <td className="p-3 text-sm font-medium">${p.volume.toLocaleString()}</td>
                  <td className="p-3 text-sm">{((p.tickets / totalTickets) * 100).toFixed(1)}%</td>
                  <td className="p-3">{winners.includes(p.id) && <Badge className="text-xs bg-success/10 text-success border-0">Winner</Badge>}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Draw History */}
      <h3 className="text-sm font-semibold flex items-center gap-2"><History className="h-4 w-4 text-muted-foreground" /> Draw History</h3>
      <Card className="border-border/40">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border/40 text-left text-xs text-muted-foreground">
                <th className="p-3 font-medium">Draw Date</th><th className="p-3 font-medium">Winner(s)</th><th className="p-3 font-medium">Prize Amount</th><th className="p-3 font-medium">Payout Status</th>
              </tr>
            </thead>
            <tbody>
              {drawHistory.map((d, i) => (
                <tr key={i} className="border-b border-border/20 hover:bg-muted/30 transition-colors">
                  <td className="p-3 text-sm">{d.date}</td>
                  <td className="p-3 text-sm">{d.winners}</td>
                  <td className="p-3 text-sm font-medium text-success">${d.prize.toLocaleString()}</td>
                  <td className="p-3"><Badge variant="default" className="text-xs">{d.status}</Badge></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};
