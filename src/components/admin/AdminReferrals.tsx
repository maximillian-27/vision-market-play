import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AdminFilters } from "./AdminFilters";
import { ExportCsvButton } from "./ExportCsvButton";
import { Share2, Users, DollarSign, TrendingUp } from "lucide-react";

const referrals = [
  { referrer: "PromoQueen", referred: 312, volume: "$567K", earnings: "$3,402", deposits: 245, tradingVolume: 567000 },
  { referrer: "ReferKing", referred: 145, volume: "$234K", earnings: "$1,404", deposits: 112, tradingVolume: 234000 },
  { referrer: "GrowthHacker", referred: 89, volume: "$156K", earnings: "$936", deposits: 67, tradingVolume: 156000 },
  { referrer: "MarketingPro", referred: 67, volume: "$98K", earnings: "$588", deposits: 48, tradingVolume: 98000 },
  { referrer: "InfluencerMax", referred: 45, volume: "$67K", earnings: "$402", deposits: 32, tradingVolume: 67000 },
  { referrer: "CryptoGuru", referred: 28, volume: "$42K", earnings: "$252", deposits: 21, tradingVolume: 42000 },
];

const totalReferred = referrals.reduce((a, r) => a + r.referred, 0);
const totalDeposits = referrals.reduce((a, r) => a + r.deposits, 0);
const totalVolume = referrals.reduce((a, r) => a + r.tradingVolume, 0);

export const AdminReferrals = () => {
  return (
    <div className="space-y-5">
      <AdminFilters showCategory={false} />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="border-border/40"><CardContent className="p-4"><div className="flex items-center gap-1.5 text-muted-foreground text-xs mb-1"><Share2 className="h-3.5 w-3.5" /> Total Referrals</div><p className="text-2xl font-bold">{totalReferred}</p></CardContent></Card>
        <Card className="border-border/40 bg-success/5"><CardContent className="p-4"><div className="flex items-center gap-1.5 text-success text-xs mb-1"><Users className="h-3.5 w-3.5" /> Referral Signups</div><p className="text-2xl font-bold">{totalReferred}</p></CardContent></Card>
        <Card className="border-border/40 bg-primary/5"><CardContent className="p-4"><div className="flex items-center gap-1.5 text-primary text-xs mb-1"><DollarSign className="h-3.5 w-3.5" /> Referral Deposits</div><p className="text-2xl font-bold">{totalDeposits}</p></CardContent></Card>
        <Card className="border-border/40"><CardContent className="p-4"><div className="flex items-center gap-1.5 text-muted-foreground text-xs mb-1"><TrendingUp className="h-3.5 w-3.5" /> Referral Trading Volume</div><p className="text-2xl font-bold">${(totalVolume / 1e6).toFixed(2)}M</p></CardContent></Card>
      </div>

      <div className="flex justify-end">
        <ExportCsvButton data={referrals} filename="referrals" />
      </div>

      <Card className="border-border/40">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border/40 text-left text-xs text-muted-foreground">
                <th className="p-3 font-medium">Referrer</th><th className="p-3 font-medium">Users Referred</th><th className="p-3 font-medium">Deposits</th><th className="p-3 font-medium">Trading Volume</th><th className="p-3 font-medium">Earnings</th>
              </tr>
            </thead>
            <tbody>
              {referrals.map((r) => (
                <tr key={r.referrer} className="border-b border-border/20 hover:bg-muted/30 transition-colors">
                  <td className="p-3 font-medium text-sm">{r.referrer}</td>
                  <td className="p-3 text-sm">{r.referred}</td>
                  <td className="p-3 text-sm">{r.deposits}</td>
                  <td className="p-3 text-sm font-medium">{r.volume}</td>
                  <td className="p-3 text-sm font-medium text-success">{r.earnings}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};
