import { useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Trophy, Award, ChevronRight, Flame, ArrowUp, ArrowDown, Star, TrendingUp, Minus } from "lucide-react";
import { MarketsSidebar } from "@/components/MarketsSidebar";
import { ActivitySidebar } from "@/components/ActivitySidebar";
import { PageHeader } from "@/components/PageHeader";
import { useIsMobile } from "@/hooks/use-mobile";

// --- Mock Data ---

const players = [
  { name: "Alex Chen", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex", rank: 1, winnings: 45230, winRate: 87, marketsEntered: 342, streak: 7, rankChange: 0 },
  { name: "Jordan Smith", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Jordan", rank: 2, winnings: 38450, winRate: 84, marketsEntered: 298, streak: 4, rankChange: 2 },
  { name: "Taylor Brown", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Taylor", rank: 3, winnings: 32100, winRate: 82, marketsEntered: 267, streak: 0, rankChange: -1 },
  { name: "Morgan Lee", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Morgan", rank: 4, winnings: 28900, winRate: 79, marketsEntered: 234, streak: 3, rankChange: 1 },
  { name: "Casey Wilson", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Casey", rank: 5, winnings: 25670, winRate: 76, marketsEntered: 211, streak: 0, rankChange: -2 },
  { name: "Sam Rivera", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sam", rank: 6, winnings: 22340, winRate: 94, marketsEntered: 127, streak: 9, rankChange: 3 },
  { name: "Chris Park", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Chris", rank: 7, winnings: 19100, winRate: 91, marketsEntered: 156, streak: 0, rankChange: 0 },
  { name: "Jamie Nguyen", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Jamie", rank: 8, winnings: 17800, winRate: 73, marketsEntered: 189, streak: 2, rankChange: "new" as const },
  { name: "Riley Torres", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Riley", rank: 9, winnings: 15200, winRate: 71, marketsEntered: 164, streak: 0, rankChange: -3 },
  { name: "Dakota Patel", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Dakota", rank: 10, winnings: 13900, winRate: 68, marketsEntered: 143, streak: 0, rankChange: 1 },
];

const creators = [
  { name: "MarketMaven", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Maven", rank: 1, potGenerated: 2800000, marketsCreated: 47, totalPlayers: 12300, avgPot: 59574, rankChange: 0 },
  { name: "PredictPro", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Pro", rank: 2, potGenerated: 2100000, marketsCreated: 38, totalPlayers: 9800, avgPot: 55263, rankChange: 1 },
  { name: "TrendSetter", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Trend", rank: 3, potGenerated: 1700000, marketsCreated: 31, totalPlayers: 8200, avgPot: 54839, rankChange: -1 },
  { name: "InsightHub", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Insight", rank: 4, potGenerated: 1500000, marketsCreated: 29, totalPlayers: 7100, avgPot: 51724, rankChange: 2 },
  { name: "DataDriven", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Data", rank: 5, potGenerated: 1200000, marketsCreated: 24, totalPlayers: 6400, avgPot: 50000, rankChange: 0 },
  { name: "OddsOracle", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Oracle", rank: 6, potGenerated: 980000, marketsCreated: 21, totalPlayers: 5100, avgPot: 46667, rankChange: "new" as const },
  { name: "BetBuilder", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Bet", rank: 7, potGenerated: 870000, marketsCreated: 19, totalPlayers: 4800, avgPot: 45789, rankChange: -2 },
  { name: "PollCraft", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Poll", rank: 8, potGenerated: 740000, marketsCreated: 16, totalPlayers: 3900, avgPot: 46250, rankChange: 1 },
  { name: "FutureSight", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Future", rank: 9, potGenerated: 650000, marketsCreated: 14, totalPlayers: 3200, avgPot: 46429, rankChange: 0 },
  { name: "CrowdCall", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Crowd", rank: 10, potGenerated: 520000, marketsCreated: 11, totalPlayers: 2700, avgPot: 47273, rankChange: -1 },
];

const hotStreaks = [
  { name: "Sam Rivera", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sam", streak: 9, lastWin: "Will Bitcoin hit $100K by March?" },
  { name: "Alex Chen", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex", streak: 7, lastWin: "Fed rate cut in February?" },
  { name: "Jordan Smith", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Jordan", streak: 4, lastWin: "Super Bowl LVIII Winner" },
];

const biggestWins = [
  { name: "Taylor Brown", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Taylor", market: "NBA Championship 2026", amount: 8420 },
  { name: "Morgan Lee", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Morgan", market: "Will AI replace 50% of jobs by 2030?", amount: 6150 },
  { name: "Casey Wilson", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Casey", market: "Tesla stock above $400?", amount: 4890 },
];

const risingStars = [
  { name: "Jamie Nguyen", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Jamie", rankChange: 47, currentRank: 8 },
  { name: "InsightHub", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Insight", rankChange: 31, currentRank: 4 },
  { name: "Sam Rivera", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sam", rankChange: 22, currentRank: 6 },
];

// --- Helpers ---

type TimePeriod = "week" | "month" | "all";
type PlayerSort = "winnings" | "winRate" | "streak";
type CreatorSort = "pot" | "markets" | "avgPot";

function getRankBadge(rank: number) {
  if (rank === 1) return "bg-yellow-500/10 text-yellow-600 border-yellow-500/20";
  if (rank === 2) return "bg-slate-400/10 text-slate-500 border-slate-400/20";
  if (rank === 3) return "bg-amber-600/10 text-amber-600 border-amber-600/20";
  return "bg-muted text-muted-foreground border-border";
}

function formatMoney(n: number) {
  if (n >= 1_000_000) return `$${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `$${(n / 1_000).toFixed(1)}K`;
  return `$${n.toLocaleString()}`;
}

function RankChange({ change }: { change: number | "new" }) {
  if (change === "new") return <Badge variant="default" className="text-[9px] px-1.5 py-0">NEW</Badge>;
  if (change === 0) return <Minus className="h-3 w-3 text-muted-foreground" />;
  if (change > 0) return <span className="flex items-center text-[11px] font-semibold text-success"><ArrowUp className="h-3 w-3" />{change}</span>;
  return <span className="flex items-center text-[11px] font-semibold text-destructive"><ArrowDown className="h-3 w-3" />{Math.abs(change)}</span>;
}

function StreakBadge({ streak }: { streak: number }) {
  if (streak < 2) return null;
  return (
    <span className="inline-flex items-center gap-0.5 text-[10px] font-bold text-orange-500 bg-orange-500/10 rounded-full px-1.5 py-0.5">
      <Flame className="h-3 w-3" />{streak}W
    </span>
  );
}

// --- Main Component ---

export default function Community() {
  const [timePeriod, setTimePeriod] = useState<TimePeriod>("week");
  const [playerSort, setPlayerSort] = useState<PlayerSort>("winnings");
  const [creatorSort, setCreatorSort] = useState<CreatorSort>("pot");
  const isMobile = useIsMobile();

  const timePeriodOptions: { label: string; shortLabel: string; value: TimePeriod }[] = [
    { label: "THIS WEEK", shortLabel: "WEEK", value: "week" },
    { label: "THIS MONTH", shortLabel: "MONTH", value: "month" },
    { label: "ALL TIME", shortLabel: "ALL", value: "all" },
  ];

  const sortedPlayers = [...players].sort((a, b) => {
    if (playerSort === "winnings") return b.winnings - a.winnings;
    if (playerSort === "winRate") return b.winRate - a.winRate;
    return b.streak - a.streak;
  });

  const sortedCreators = [...creators].sort((a, b) => {
    if (creatorSort === "pot") return b.potGenerated - a.potGenerated;
    if (creatorSort === "markets") return b.marketsCreated - a.marketsCreated;
    return b.avgPot - a.avgPot;
  });

  function getPlayerPrimary(p: typeof players[0]) {
    if (playerSort === "winnings") return <span className="text-success font-semibold">{formatMoney(p.winnings)}</span>;
    if (playerSort === "winRate") return <span className="font-semibold">{p.winRate}%</span>;
    return <span className="font-semibold">{p.streak}W streak</span>;
  }

  function getPlayerSecondary(p: typeof players[0]) {
    const parts: string[] = [];
    if (playerSort !== "winRate") parts.push(isMobile ? `${p.winRate}%` : `${p.winRate}% win rate`);
    if (playerSort !== "winnings") parts.push(formatMoney(p.winnings));
    parts.push(isMobile ? `${p.marketsEntered} mkts` : `${p.marketsEntered} entered`);
    return parts.slice(0, 2).join(" · ");
  }

  function getCreatorPrimary(c: typeof creators[0]) {
    if (creatorSort === "pot") return <span className="text-success font-semibold">{formatMoney(c.potGenerated)}</span>;
    if (creatorSort === "markets") return <span className="font-semibold">{c.marketsCreated} mkts</span>;
    return <span className="font-semibold">{formatMoney(c.avgPot)} avg</span>;
  }

  function getCreatorSecondary(c: typeof creators[0]) {
    const parts: string[] = [];
    if (creatorSort !== "markets") parts.push(isMobile ? `${c.marketsCreated} mkts` : `${c.marketsCreated} markets`);
    if (creatorSort !== "pot") parts.push(formatMoney(c.potGenerated) + " pot");
    parts.push(`${(c.totalPlayers / 1000).toFixed(1)}K players`);
    return parts.slice(0, 2).join(" · ");
  }

  return (
    <div className="w-full max-w-7xl mx-auto py-4 lg:py-6">
      <div className="flex gap-6 justify-center">
        <ActivitySidebar />

        <div className="w-full max-w-2xl space-y-3 sm:space-y-4 px-4">
          {/* Hide PageHeader on mobile */}
          <div className="hidden sm:block">
            <PageHeader
              title="Leaderboards"
              subtitle="See who's dominating the predictions"
            />
          </div>

          {/* Leaderboard Tabs */}
          <Tabs defaultValue="players" className="w-full">
            <TabsList className="grid w-full grid-cols-2 h-11">
              <TabsTrigger value="players" className="text-sm">Players</TabsTrigger>
              <TabsTrigger value="creators" className="text-sm">Creators</TabsTrigger>
            </TabsList>

            {/* Players Tab */}
            <TabsContent value="players" className="space-y-3 mt-3 sm:mt-4">
              {/* Single scrollable row on mobile, two rows on desktop */}
              <div className="sm:flex sm:flex-row sm:items-center sm:justify-between sm:gap-2">
                <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide pb-1 sm:pb-0 -mx-4 px-4 sm:mx-0 sm:px-0">
                  <div className="flex gap-1 shrink-0">
                    {timePeriodOptions.map((o) => (
                      <Badge
                        key={o.value}
                        variant={timePeriod === o.value ? "default" : "outline"}
                        className="cursor-pointer text-[10px] uppercase tracking-wider whitespace-nowrap"
                        onClick={() => setTimePeriod(o.value)}
                      >
                        {isMobile ? o.shortLabel : o.label}
                      </Badge>
                    ))}
                  </div>
                  <div className="w-px h-4 bg-border shrink-0 sm:hidden" />
                  <div className="flex gap-1 shrink-0 sm:hidden">
                    {([["winnings", "Winnings"], ["winRate", "Win Rate"], ["streak", "Streak"]] as const).map(([val, label]) => (
                      <Badge
                        key={val}
                        variant={playerSort === val ? "default" : "outline"}
                        className="cursor-pointer text-[10px] whitespace-nowrap"
                        onClick={() => setPlayerSort(val)}
                      >
                        {label}
                      </Badge>
                    ))}
                  </div>
                </div>
                {/* Desktop sort pills */}
                <div className="hidden sm:flex gap-1.5">
                  {([["winnings", "Winnings"], ["winRate", "Win Rate"], ["streak", "Streak"]] as const).map(([val, label]) => (
                    <Badge
                      key={val}
                      variant={playerSort === val ? "default" : "outline"}
                      className="cursor-pointer text-[10px]"
                      onClick={() => setPlayerSort(val)}
                    >
                      {label}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Card — hide header on mobile */}
              <Card className="border-border/50 sm:border-border/50">
                <CardHeader className="pb-2 hidden sm:block">
                  <CardTitle className="text-base flex items-center gap-2">
                    <Trophy className="h-4 w-4 text-primary" />
                    Top Players
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-2 sm:pt-2 px-2 sm:px-6">
                  <div className="divide-y divide-border/50">
                    {sortedPlayers.map((player, i) => (
                      <Link
                        key={player.name}
                        to={`/profile/${player.name.toLowerCase().replace(' ', '-')}`}
                        className="flex items-center gap-2 sm:gap-3 py-2 sm:py-3 hover:bg-muted/30 -mx-1 sm:-mx-2 px-1 sm:px-2 rounded-lg transition-colors group"
                      >
                        <div className="flex items-center gap-1 sm:gap-1.5 w-9 sm:w-10 shrink-0">
                          <div className={`w-6 h-6 sm:w-7 sm:h-7 rounded-full flex items-center justify-center text-[10px] sm:text-xs font-bold border ${getRankBadge(i + 1)}`}>
                            {i + 1}
                          </div>
                          <RankChange change={player.rankChange} />
                        </div>
                        <Avatar className="h-7 w-7 sm:h-9 sm:w-9">
                          <AvatarImage src={player.avatar} alt={player.name} />
                          <AvatarFallback>{player.name.slice(0, 2)}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-1.5">
                            <p className="font-medium text-sm truncate">{player.name}</p>
                            <StreakBadge streak={player.streak} />
                          </div>
                          <p className="text-xs text-muted-foreground truncate">{getPlayerSecondary(player)}</p>
                        </div>
                        <div className="text-right text-sm shrink-0">
                          {getPlayerPrimary(player)}
                        </div>
                        <ChevronRight className="h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity shrink-0 hidden sm:block" />
                      </Link>
                    ))}
                    {/* Your Rank */}
                    <div className="border-t-2 border-dashed border-primary/20 mt-1 pt-1">
                      <div className="flex items-center gap-2 sm:gap-3 py-2 sm:py-3 -mx-1 sm:-mx-2 px-1 sm:px-2 rounded-lg bg-primary/[0.04]">
                        <div className="flex items-center gap-1 sm:gap-1.5 w-9 sm:w-10 shrink-0">
                          <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full flex items-center justify-center text-[10px] sm:text-xs font-bold border border-primary/30 bg-primary/10 text-primary">
                            {playerSort === "winnings" ? 24 : playerSort === "winRate" ? 31 : 58}
                          </div>
                          <span className="flex items-center text-[11px] font-semibold text-success"><ArrowUp className="h-3 w-3" />3</span>
                        </div>
                        <Avatar className="h-7 w-7 sm:h-9 sm:w-9 ring-2 ring-primary/20">
                          <AvatarFallback className="bg-primary/10 text-primary font-bold text-[10px] sm:text-sm">YOU</AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-1.5">
                            <p className="font-medium text-sm text-primary">You</p>
                            <StreakBadge streak={2} />
                          </div>
                          <p className="text-xs text-muted-foreground truncate">
                            {playerSort === "winnings"
                              ? (isMobile ? "72% · 38 mkts" : "72% win rate · 38 entered")
                              : playerSort === "winRate"
                              ? (isMobile ? "$4.2K · 38 mkts" : "$4.2K · 38 entered")
                              : (isMobile ? "$4.2K · 72%" : "$4.2K · 72% win rate")}
                          </p>
                        </div>
                        <div className="text-right text-sm shrink-0">
                          {playerSort === "winnings" ? <span className="text-success font-semibold">$4.2K</span> : playerSort === "winRate" ? <span className="font-semibold">72%</span> : <span className="font-semibold">2W streak</span>}
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Creators Tab */}
            <TabsContent value="creators" className="space-y-3 mt-3 sm:mt-4">
              <div className="sm:flex sm:flex-row sm:items-center sm:justify-between sm:gap-2">
                <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide pb-1 sm:pb-0 -mx-4 px-4 sm:mx-0 sm:px-0">
                  <div className="flex gap-1 shrink-0">
                    {timePeriodOptions.map((o) => (
                      <Badge
                        key={o.value}
                        variant={timePeriod === o.value ? "default" : "outline"}
                        className="cursor-pointer text-[10px] uppercase tracking-wider whitespace-nowrap"
                        onClick={() => setTimePeriod(o.value)}
                      >
                        {isMobile ? o.shortLabel : o.label}
                      </Badge>
                    ))}
                  </div>
                  <div className="w-px h-4 bg-border shrink-0 sm:hidden" />
                  <div className="flex gap-1 shrink-0 sm:hidden">
                    {([["pot", "Pot"], ["markets", "Markets"], ["avgPot", "Avg Pot"]] as const).map(([val, label]) => (
                      <Badge
                        key={val}
                        variant={creatorSort === val ? "default" : "outline"}
                        className="cursor-pointer text-[10px] whitespace-nowrap"
                        onClick={() => setCreatorSort(val)}
                      >
                        {label}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div className="hidden sm:flex gap-1.5">
                  {([["pot", "Pot Generated"], ["markets", "Markets"], ["avgPot", "Avg Pot"]] as const).map(([val, label]) => (
                    <Badge
                      key={val}
                      variant={creatorSort === val ? "default" : "outline"}
                      className="cursor-pointer text-[10px]"
                      onClick={() => setCreatorSort(val)}
                    >
                      {label}
                    </Badge>
                  ))}
                </div>
              </div>

              <Card className="border-border/50">
                <CardHeader className="pb-2 hidden sm:block">
                  <CardTitle className="text-base flex items-center gap-2">
                    <Award className="h-4 w-4 text-primary" />
                    Top Creators
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-2 sm:pt-2 px-2 sm:px-6">
                  <div className="divide-y divide-border/50">
                    {sortedCreators.map((creator, i) => (
                      <Link
                        key={creator.name}
                        to={`/creator/${creator.name.toLowerCase().replace(' ', '-')}`}
                        className="flex items-center gap-2 sm:gap-3 py-2 sm:py-3 hover:bg-muted/30 -mx-1 sm:-mx-2 px-1 sm:px-2 rounded-lg transition-colors group"
                      >
                        <div className="flex items-center gap-1 sm:gap-1.5 w-9 sm:w-10 shrink-0">
                          <div className={`w-6 h-6 sm:w-7 sm:h-7 rounded-full flex items-center justify-center text-[10px] sm:text-xs font-bold border ${getRankBadge(i + 1)}`}>
                            {i + 1}
                          </div>
                          <RankChange change={creator.rankChange} />
                        </div>
                        <Avatar className="h-7 w-7 sm:h-9 sm:w-9">
                          <AvatarImage src={creator.avatar} alt={creator.name} />
                          <AvatarFallback>{creator.name.slice(0, 2)}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-sm truncate">{creator.name}</p>
                          <p className="text-xs text-muted-foreground truncate">{getCreatorSecondary(creator)}</p>
                        </div>
                        <div className="text-right text-sm shrink-0">
                          {getCreatorPrimary(creator)}
                        </div>
                        <ChevronRight className="h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity shrink-0 hidden sm:block" />
                      </Link>
                    ))}
                    {/* Your Rank */}
                    <div className="border-t-2 border-dashed border-primary/20 mt-1 pt-1">
                      <div className="flex items-center gap-2 sm:gap-3 py-2 sm:py-3 -mx-1 sm:-mx-2 px-1 sm:px-2 rounded-lg bg-primary/[0.04]">
                        <div className="flex items-center gap-1 sm:gap-1.5 w-9 sm:w-10 shrink-0">
                          <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full flex items-center justify-center text-[10px] sm:text-xs font-bold border border-primary/30 bg-primary/10 text-primary">
                            {creatorSort === "pot" ? 42 : creatorSort === "markets" ? 37 : 29}
                          </div>
                        </div>
                        <Avatar className="h-7 w-7 sm:h-9 sm:w-9 ring-2 ring-primary/20">
                          <AvatarFallback className="bg-primary/10 text-primary font-bold text-[10px] sm:text-sm">YOU</AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-sm text-primary">You</p>
                          <p className="text-xs text-muted-foreground truncate">
                            {creatorSort === "pot"
                              ? (isMobile ? "3 mkts · 1.2K players" : "3 markets · 1.2K players")
                              : creatorSort === "markets"
                              ? (isMobile ? "$12.4K · 1.2K players" : "$12.4K pot · 1.2K players")
                              : (isMobile ? "3 mkts · $12.4K" : "3 markets · $12.4K pot")}
                          </p>
                        </div>
                        <div className="text-right text-sm shrink-0">
                          {creatorSort === "pot" ? <span className="text-success font-semibold">$12.4K</span> : creatorSort === "markets" ? <span className="font-semibold">3 mkts</span> : <span className="font-semibold">$4.1K avg</span>}
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          {/* Highlights Section — compact on mobile */}
          <div className="space-y-2 sm:space-y-3">
            <h2 className="text-base font-semibold flex items-center gap-2 px-1">
              <Star className="h-4 w-4 text-primary" />
              Highlights
            </h2>

            {/* Hot Streaks */}
            <Card className="border-border/50">
              <CardHeader className="pb-1 sm:pb-2 pt-3 sm:pt-4 px-3 sm:px-4">
                <CardTitle className="text-sm flex items-center gap-2">
                  <Flame className="h-4 w-4 text-orange-500" />
                  Hot Streaks
                </CardTitle>
              </CardHeader>
              <CardContent className="px-3 sm:px-4 pb-3 sm:pb-4 pt-1">
                <div className="space-y-1 sm:space-y-2">
                  {hotStreaks.map((s) => (
                    <div key={s.name} className="flex items-center gap-2 sm:gap-3 py-1 sm:py-1.5">
                      <Avatar className="h-6 w-6 sm:h-7 sm:w-7">
                        <AvatarImage src={s.avatar} alt={s.name} />
                        <AvatarFallback>{s.name.slice(0, 2)}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium">{s.name}</p>
                        <p className="text-xs text-muted-foreground truncate">{s.lastWin}</p>
                      </div>
                      <span className="inline-flex items-center gap-0.5 text-xs font-bold text-orange-500 bg-orange-500/10 rounded-full px-2 py-0.5">
                        <Flame className="h-3 w-3" />{s.streak}W
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Biggest Wins */}
            <Card className="border-border/50">
              <CardHeader className="pb-1 sm:pb-2 pt-3 sm:pt-4 px-3 sm:px-4">
                <CardTitle className="text-sm flex items-center gap-2">
                  <TrendingUp className="h-4 w-4 text-success" />
                  Biggest Wins This Week
                </CardTitle>
              </CardHeader>
              <CardContent className="px-3 sm:px-4 pb-3 sm:pb-4 pt-1">
                <div className="space-y-1 sm:space-y-2">
                  {biggestWins.map((w) => (
                    <div key={w.name} className="flex items-center gap-2 sm:gap-3 py-1 sm:py-1.5">
                      <Avatar className="h-6 w-6 sm:h-7 sm:w-7">
                        <AvatarImage src={w.avatar} alt={w.name} />
                        <AvatarFallback>{w.name.slice(0, 2)}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium">{w.name}</p>
                        <p className="text-xs text-muted-foreground truncate">{w.market}</p>
                      </div>
                      <span className="text-sm font-semibold text-success">{formatMoney(w.amount)}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Rising Stars */}
            <Card className="border-border/50">
              <CardHeader className="pb-1 sm:pb-2 pt-3 sm:pt-4 px-3 sm:px-4">
                <CardTitle className="text-sm flex items-center gap-2">
                  <ArrowUp className="h-4 w-4 text-primary" />
                  Rising Stars
                </CardTitle>
              </CardHeader>
              <CardContent className="px-3 sm:px-4 pb-3 sm:pb-4 pt-1">
                <div className="space-y-1 sm:space-y-2">
                  {risingStars.map((r) => (
                    <div key={r.name} className="flex items-center gap-2 sm:gap-3 py-1 sm:py-1.5">
                      <Avatar className="h-6 w-6 sm:h-7 sm:w-7">
                        <AvatarImage src={r.avatar} alt={r.name} />
                        <AvatarFallback>{r.name.slice(0, 2)}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium">{r.name}</p>
                        <p className="text-xs text-muted-foreground">Now #{r.currentRank}</p>
                      </div>
                      <span className="flex items-center gap-0.5 text-xs font-bold text-success">
                        <ArrowUp className="h-3 w-3" />+{r.rankChange}
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <MarketsSidebar />
      </div>
    </div>
  );
}
