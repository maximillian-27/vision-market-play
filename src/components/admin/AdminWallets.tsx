import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { AdminFilters } from "./AdminFilters";
import { ArrowUpRight, Lock } from "lucide-react";
import { toast } from "sonner";

const wallets = [
  { name: "ETH Hot Wallet", balance: "$2,450,000", chain: "Ethereum", inflow: "+$120K", outflow: "-$45K", lastTxn: "2 min ago" },
  { name: "BTC Hot Wallet", balance: "$1,890,000", chain: "Bitcoin", inflow: "+$89K", outflow: "-$32K", lastTxn: "15 min ago" },
  { name: "SOL Hot Wallet", balance: "$680,000", chain: "Solana", inflow: "+$45K", outflow: "-$18K", lastTxn: "8 min ago" },
  { name: "USDT Reserve", balance: "$5,200,000", chain: "Multi-chain", inflow: "+$380K", outflow: "-$125K", lastTxn: "3 min ago" },
  { name: "Cold Storage", balance: "$12,500,000", chain: "Multi-chain", inflow: "+$0", outflow: "-$0", lastTxn: "3 days ago" },
];

export const AdminWallets = () => {
  return (
    <div className="space-y-5">
      <AdminFilters showGeo={false} showCategory={false} />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {wallets.map((w) => (
          <Card key={w.name} className="border-border/40">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <p className="font-semibold text-sm">{w.name}</p>
                  <p className="text-xs text-muted-foreground">{w.chain}</p>
                </div>
                <Badge variant="default" className="text-xs">Active</Badge>
              </div>
              <p className="text-2xl font-bold text-primary mb-3">{w.balance}</p>
              <div className="space-y-1 text-sm">
                <div className="flex justify-between"><span className="text-muted-foreground">24h Inflow</span><span className="text-success font-medium">{w.inflow}</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">24h Outflow</span><span className="text-destructive font-medium">{w.outflow}</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">Last Txn</span><span>{w.lastTxn}</span></div>
              </div>
              <div className="flex gap-2 mt-3">
                <Button size="sm" variant="outline" className="gap-1 flex-1 text-xs" onClick={() => toast(`Transfer from ${w.name}`)}><ArrowUpRight className="h-3 w-3" /> Transfer</Button>
                <Button size="sm" variant="outline" className="gap-1 flex-1 text-xs text-destructive" onClick={() => toast.success(`${w.name} frozen`)}><Lock className="h-3 w-3" /> Freeze</Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
