import { Card, CardContent } from "@/components/ui/card";
import { TrendingUp, Target, Award, BarChart3, DollarSign, Ticket, Trophy } from "lucide-react";

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
    biggestWin?: string;
    
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
    <div className="grid grid-cols-4 gap-2 sm:gap-3">
      <StatCard
        icon={<TrendingUp className="h-3.5 w-3.5 sm:h-4 sm:w-4" />}
        label="Total Winnings"
        value={stats.totalProfit || "$0"}
        valueClassName={stats.totalProfit?.startsWith("+") ? "text-success" : stats.totalProfit?.startsWith("-") ? "text-destructive" : ""}
        rank={24}
      />
      <StatCard
        icon={<Target className="h-3.5 w-3.5 sm:h-4 sm:w-4" />}
        label="Win Rate"
        value={`${stats.winRate || stats.accuracy || 0}%`}
        rank={18}
      />
      <StatCard
        icon={<Ticket className="h-3.5 w-3.5 sm:h-4 sm:w-4" />}
        label="All Entries"
        value={stats.totalTrades?.toString() || "0"}
      />
      <StatCard
        icon={<Trophy className="h-3.5 w-3.5 sm:h-4 sm:w-4" />}
        label="Biggest Win"
        value={stats.biggestWin || "$0"}
        valueClassName="text-success"
      />
    </div>
  );
}

interface StatCardProps {
  icon: React.ReactNode;
  label: string;
  value: string;
  valueClassName?: string;
  rank?: number;
}

function StatCard({ icon, label, value, valueClassName = "", rank }: StatCardProps) {
  return (
    <Card className="border-border/40 bg-muted/20 relative">
      <CardContent className="p-3 sm:p-4">
        {rank && (
          <span className="absolute top-1.5 right-2 text-[8px] sm:text-[9px] text-muted-foreground/50 font-medium">#{rank}</span>
        )}
        <div className="flex items-center gap-1.5 text-muted-foreground text-[10px] sm:text-xs mb-1">
          {icon}
          <span className="truncate">{label}</span>
        </div>
        <p className={`text-base sm:text-xl font-bold ${valueClassName}`}>{value}</p>
      </CardContent>
    </Card>
  );
}
