import { Card, CardContent } from "@/components/ui/card";
import { TrendingUp, Target, Award, BarChart3, Users, Eye, DollarSign, Zap, Ticket } from "lucide-react";

interface ProfileStatsProps {
  type: "trader" | "creator";
  stats: {
    // Common stats
    followers?: string | number;
    following?: string | number;
    joinDate?: string;
    
    // Trader stats
    totalProfit?: string;
    winRate?: number;
    totalTrades?: number;
    accuracy?: number;
    
    // Creator stats
    marketsCreated?: number;
    totalVolume?: string;
    avgVolume?: string;
    successRate?: number;
    totalViews?: string | number;
    rank?: number;
  };
}

export function ProfileStats({ type, stats }: ProfileStatsProps) {
  if (type === "creator") {
    return (
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <StatCard
          icon={<DollarSign className="h-4 w-4" />}
          label="Pot Generated"
          value={stats.totalVolume || "$0"}
          valueClassName="text-success"
        />
        <StatCard
          icon={<Award className="h-4 w-4" />}
          label="Rank"
          value={`#${stats.rank || "-"}`}
        />
        <StatCard
          icon={<BarChart3 className="h-4 w-4" />}
          label="Markets Created"
          value={stats.marketsCreated?.toString() || "0"}
        />
        <StatCard
          icon={<TrendingUp className="h-4 w-4" />}
          label="Avg Pot / Market"
          value={stats.avgVolume || "$0"}
        />
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
      <StatCard
        icon={<TrendingUp className="h-4 w-4" />}
        label="Total Winnings"
        value={stats.totalProfit || "$0"}
        valueClassName={stats.totalProfit?.startsWith("+") ? "text-success" : stats.totalProfit?.startsWith("-") ? "text-destructive" : ""}
      />
      <StatCard
        icon={<Target className="h-4 w-4" />}
        label="Win Rate"
        value={`${stats.winRate || stats.accuracy || 0}%`}
      />
      <StatCard
        icon={<Ticket className="h-4 w-4" />}
        label="Markets Entered"
        value={stats.totalTrades?.toString() || "0"}
      />
      <StatCard
        icon={<Award className="h-4 w-4" />}
        label="Rank"
        value={`#${stats.rank || "-"}`}
      />
    </div>
  );
}

interface StatCardProps {
  icon: React.ReactNode;
  label: string;
  value: string;
  valueClassName?: string;
}

function StatCard({ icon, label, value, valueClassName = "" }: StatCardProps) {
  return (
    <Card className="border-border/40 bg-muted/20">
      <CardContent className="p-4">
        <div className="flex items-center gap-2 text-muted-foreground text-xs mb-1.5">
          {icon}
          {label}
        </div>
        <p className={`text-xl font-bold ${valueClassName}`}>{value}</p>
      </CardContent>
    </Card>
  );
}

function formatNumber(num: string | number | undefined): string {
  if (!num) return "0";
  if (typeof num === "string") return num;
  if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
  if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
  return num.toString();
}
