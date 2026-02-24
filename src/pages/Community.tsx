import { useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Trophy, Award, ChevronRight, Flame, ArrowUp, ArrowDown, TrendingUp, Minus, Crown, Zap } from "lucide-react";
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

const highlights = [
  { type: "streak" as const, name: "Sam Rivera", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sam", value: "9W Streak", sub: "Longest active streak", icon: <Flame className="h-4 w-4 text-orange-500" /> },
  { type: "win" as const, name: "Taylor Brown", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Taylor", value: "$8,420", sub: "Biggest win this week", icon: <TrendingUp className="h-4 w-4 text-success" /> },
  { type: "rising" as const, name: "Jamie Nguyen", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Jamie", value: "+47 ranks", sub: "Fastest climber", icon: <Zap className="h-4 w-4 text-primary" /> },
];

// --- Helpers ---

type TimePeriod = "week" | "month" | "all";
type PlayerSort = "winnings" | "winRate" | "streak";
type CreatorSort = "pot" | "markets" | "avgPot";

const medalColors = [
  "from-yellow-400/20 to-yellow-500/5 border-yellow-500/30",
  "from-slate-300/20 to-slate-400/5 border-slate-400/30",
  "from-amber-600/20 to-amber-700/5 border-amber-600/30",
];

const medalTextColors = ["text-yellow-600", "text-slate-500", "text-amber-600"];

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
  if (change === "new") return <Badge variant="default" className="text-[8px] px-1 py-0 h-4">NEW</Badge>;
  if (change === 0) return <Minus className="h-3 w-3 text-muted-foreground/40" />;
  if (change > 0) return <span className="flex items-center text-[10px] font-semibold text-success"><ArrowUp className="h-2.5 w-2.5" />{change}</span>;
  return <span className="flex items-center text-[10px] font-semibold text-destructive"><ArrowDown className="h-2.5 w-2.5" />{Math.abs(change)}</span>;
}

function StreakBadge({ streak }: { streak: number }) {
  if (streak < 2) return null;
  return (
    <span className="inline-flex items-center gap-0.5 text-[9px] font-bold text-orange-500 bg-orange-500/10 rounded-full px-1.5 py-0.5">
      <Flame className="h-2.5 w-2.5" />{streak}
    </span>
  );
}

// --- Podium Component ---

function Podium({ top3, getValue, getSecondary }: {
  top3: { name: string; avatar: string; rankChange: number | "new" }[];
  getValue: (p: any) => string;
  getSecondary: (p: any) => string;
}) {
  const isMobile = useIsMobile();
  // Display order: 2nd, 1st, 3rd
  const order = [top3[1], top3[0], top3[2]];
  const heights = ["h-16 sm:h-20", "h-20 sm:h-28", "h-12 sm:h-16"];
  const sizes = ["h-11 w-11 sm:h-14 sm:w-14", "h-14 w-14 sm:h-16 sm:w-16", "h-11 w-11 sm:h-14 sm:w-14"];
  const ranks = [2, 1, 3];

  return (
    <div className="flex items-end justify-center gap-2 sm:gap-4 pt-4 pb-2">
      {order.map((player, i) => (
        <Link
          key={player.name}
          to={`/profile/${player.name.toLowerCase().replace(' ', '-')}`}
          className="flex flex-col items-center group"
        >
          <div className="relative mb-1.5">
            {ranks[i] === 1 && (
              <Crown className="h-4 w-4 sm:h-5 sm:w-5 text-yellow-500 absolute -top-4 sm:-top-5 left-1/2 -translate-x-1/2" />
            )}
            <Avatar className={`${sizes[i]} ring-2 ${i === 1 ? 'ring-yellow-500/40' : i === 0 ? 'ring-slate-400/30' : 'ring-amber-600/30'}`}>
              <AvatarImage src={player.avatar} alt={player.name} />
              <AvatarFallback>{player.name.slice(0, 2)}</AvatarFallback>
            </Avatar>
          </div>
          <p className={`font-semibold text-[11px] sm:text-sm truncate max-w-[80px] sm:max-w-[100px] text-center ${ranks[i] === 1 ? '' : 'text-muted-foreground'}`}>
            {isMobile ? player.name.split(' ')[0] : player.name}
          </p>
          <p className="text-success font-bold text-xs sm:text-sm mt-0.5">{getValue(player)}</p>
          <p className="text-[9px] sm:text-[10px] text-muted-foreground">{getSecondary(player)}</p>
          {/* Podium bar */}
          <div className={`${heights[i]} w-16 sm:w-20 mt-2 rounded-t-lg bg-gradient-to-t ${medalColors[ranks[i] - 1]} border border-b-0 flex items-start justify-center pt-1.5`}>
            <span className={`text-sm sm:text-lg font-bold ${medalTextColors[ranks[i] - 1]}`}>
              #{ranks[i]}
            </span>
          </div>
        </Link>
      ))}
    </div>
  );
}

// --- Main Component ---

export default function Community() {
  const [timePeriod, setTimePeriod] = useState<TimePeriod>("week");
  const [playerSort, setPlayerSort] = useState<PlayerSort>("winnings");
  const [creatorSort, setCreatorSort] = useState<CreatorSort>("pot");
  const isMobile = useIsMobile();

  const timePeriodOptions: { label: string; shortLabel: string; value: TimePeriod }[] = [
    { label: "This Week", shortLabel: "Week", value: "week" },
    { label: "This Month", shortLabel: "Month", value: "month" },
    { label: "All Time", shortLabel: "All", value: "all" },
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

  function getPlayerValue(p: typeof players[0]) {
    if (playerSort === "winnings") return formatMoney(p.winnings);
    if (playerSort === "winRate") return `${p.winRate}%`;
    return `${p.streak}W`;
  }

  function getPlayerSecondary(p: typeof players[0]) {
    if (playerSort !== "winRate") return `${p.winRate}% win rate`;
    return formatMoney(p.winnings);
  }

  function getCreatorValue(c: typeof creators[0]) {
    if (creatorSort === "pot") return formatMoney(c.potGenerated);
    if (creatorSort === "markets") return `${c.marketsCreated}`;
    return formatMoney(c.avgPot);
  }

  function getCreatorSecondary(c: typeof creators[0]) {
    if (creatorSort !== "markets") return `${c.marketsCreated} markets`;
    return formatMoney(c.potGenerated);
  }

  const playerTop3 = sortedPlayers.slice(0, 3);
  const playerRest = sortedPlayers.slice(3);
  const creatorTop3 = sortedCreators.slice(0, 3);
  const creatorRest = sortedCreators.slice(3);

  return (
    <div className="w-full max-w-7xl mx-auto py-4 lg:py-6">
      <div className="flex gap-6 justify-center">
        <ActivitySidebar />

        <div className="w-full max-w-2xl space-y-3 sm:space-y-4 px-4">
          <div className="hidden sm:block">
            <PageHeader
              title="Leaderboards"
              subtitle="See who's dominating the predictions"
            />
          </div>



          {/* Leaderboard Tabs */}
          <Tabs defaultValue="players" className="w-full">
            <TabsList className="grid w-full grid-cols-2 h-10 sm:h-11">
              <TabsTrigger value="players" className="text-xs sm:text-sm gap-1.5">
                <Trophy className="h-3.5 w-3.5" />
                Players
              </TabsTrigger>
              <TabsTrigger value="creators" className="text-xs sm:text-sm gap-1.5">
                <Award className="h-3.5 w-3.5" />
                Creators
              </TabsTrigger>
            </TabsList>

            {/* Players Tab */}
            <TabsContent value="players" className="space-y-3 mt-3">
              {/* Filters */}
              <div className="flex items-center justify-between gap-2">
                <div className="flex gap-1">
                  {timePeriodOptions.map((o) => (
                    <button
                      key={o.value}
                      onClick={() => setTimePeriod(o.value)}
                      className={`px-2.5 py-1 rounded-full text-[10px] sm:text-[11px] font-medium transition-colors ${
                        timePeriod === o.value
                          ? "bg-primary text-primary-foreground"
                          : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                      }`}
                    >
                      {isMobile ? o.shortLabel : o.label}
                    </button>
                  ))}
                </div>
                <div className="flex gap-1">
                  {([["winnings", "💰", "Winnings"], ["winRate", "🎯", "Win %"], ["streak", "🔥", "Streak"]] as const).map(([val, emoji, label]) => (
                    <button
                      key={val}
                      onClick={() => setPlayerSort(val)}
                      className={`px-2 py-1 rounded-full text-[10px] sm:text-[11px] font-medium transition-colors ${
                        playerSort === val
                          ? "bg-muted text-foreground"
                          : "text-muted-foreground/60 hover:text-muted-foreground"
                      }`}
                    >
                      {isMobile ? emoji : label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Podium */}
              <Card className="border-border/40 overflow-hidden">
                <CardContent className="p-0 pb-0">
                  <Podium
                    top3={playerTop3}
                    getValue={getPlayerValue}
                    getSecondary={getPlayerSecondary}
                  />
                </CardContent>
              </Card>

              {/* Rest of rankings */}
              <Card className="border-border/40 overflow-hidden">
                <CardContent className="p-0">
                  <div className="divide-y divide-border/30">
                    {playerRest.map((player, i) => (
                      <Link
                        key={player.name}
                        to={`/profile/${player.name.toLowerCase().replace(' ', '-')}`}
                        className="flex items-center gap-2.5 sm:gap-3 py-2.5 sm:py-3 hover:bg-muted/30 px-3 sm:px-4 transition-colors group"
                      >
                        <div className="w-8 sm:w-9 flex items-center justify-center shrink-0">
                          <span className="text-xs sm:text-sm font-bold text-muted-foreground">{i + 4}</span>
                        </div>
                        <RankChange change={player.rankChange} />
                        <Avatar className="h-8 w-8 sm:h-9 sm:w-9">
                          <AvatarImage src={player.avatar} alt={player.name} />
                          <AvatarFallback>{player.name.slice(0, 2)}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-1.5">
                            <p className="font-medium text-[13px] sm:text-sm truncate">{player.name}</p>
                            <StreakBadge streak={player.streak} />
                          </div>
                          <p className="text-[10px] sm:text-xs text-muted-foreground mt-0.5">
                            {getPlayerSecondary(player)}
                          </p>
                        </div>
                        <span className="text-sm font-semibold text-success shrink-0">
                          {getPlayerValue(player)}
                        </span>
                        <ChevronRight className="h-3.5 w-3.5 text-muted-foreground/30 group-hover:text-muted-foreground transition-colors shrink-0 hidden sm:block" />
                      </Link>
                    ))}

                    {/* Your rank */}
                    <div className="border-t-2 border-dashed border-primary/20 !border-b-0">
                      <div className="flex items-center gap-2.5 sm:gap-3 py-2.5 sm:py-3 px-3 sm:px-4 bg-primary/[0.04]">
                        <div className="w-8 sm:w-9 flex items-center justify-center shrink-0">
                          <span className="text-xs sm:text-sm font-bold text-primary">
                            {playerSort === "winnings" ? 24 : playerSort === "winRate" ? 31 : 58}
                          </span>
                        </div>
                        <span className="flex items-center text-[10px] font-semibold text-success"><ArrowUp className="h-2.5 w-2.5" />3</span>
                        <Avatar className="h-8 w-8 sm:h-9 sm:w-9 ring-2 ring-primary/20">
                          <AvatarFallback className="bg-primary/10 text-primary font-bold text-xs">YOU</AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-1.5">
                            <p className="font-semibold text-[13px] sm:text-sm text-primary">You</p>
                            <StreakBadge streak={2} />
                          </div>
                          <p className="text-[10px] sm:text-xs text-muted-foreground mt-0.5">
                            {playerSort === "winnings" ? "72% win rate" : playerSort === "winRate" ? formatMoney(4200) : formatMoney(4200)}
                          </p>
                        </div>
                        <span className="text-sm font-semibold text-success shrink-0">
                          {playerSort === "winnings" ? "$4.2K" : playerSort === "winRate" ? "72%" : "2W"}
                        </span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Creators Tab */}
            <TabsContent value="creators" className="space-y-3 mt-3">
              {/* Filters */}
              <div className="flex items-center justify-between gap-2">
                <div className="flex gap-1">
                  {timePeriodOptions.map((o) => (
                    <button
                      key={o.value}
                      onClick={() => setTimePeriod(o.value)}
                      className={`px-2.5 py-1 rounded-full text-[10px] sm:text-[11px] font-medium transition-colors ${
                        timePeriod === o.value
                          ? "bg-primary text-primary-foreground"
                          : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                      }`}
                    >
                      {isMobile ? o.shortLabel : o.label}
                    </button>
                  ))}
                </div>
                <div className="flex gap-1">
                  {([["pot", "💰", "Pot"], ["markets", "📊", "Markets"], ["avgPot", "📈", "Avg Pot"]] as const).map(([val, emoji, label]) => (
                    <button
                      key={val}
                      onClick={() => setCreatorSort(val)}
                      className={`px-2 py-1 rounded-full text-[10px] sm:text-[11px] font-medium transition-colors ${
                        creatorSort === val
                          ? "bg-muted text-foreground"
                          : "text-muted-foreground/60 hover:text-muted-foreground"
                      }`}
                    >
                      {isMobile ? emoji : label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Podium */}
              <Card className="border-border/40 overflow-hidden">
                <CardContent className="p-0 pb-0">
                  <Podium
                    top3={creatorTop3}
                    getValue={getCreatorValue}
                    getSecondary={getCreatorSecondary}
                  />
                </CardContent>
              </Card>

              {/* Rest of rankings */}
              <Card className="border-border/40 overflow-hidden">
                <CardContent className="p-0">
                  <div className="divide-y divide-border/30">
                    {creatorRest.map((creator, i) => (
                      <Link
                        key={creator.name}
                        to={`/creator/${creator.name.toLowerCase().replace(' ', '-')}`}
                        className="flex items-center gap-2.5 sm:gap-3 py-2.5 sm:py-3 hover:bg-muted/30 px-3 sm:px-4 transition-colors group"
                      >
                        <div className="w-8 sm:w-9 flex items-center justify-center shrink-0">
                          <span className="text-xs sm:text-sm font-bold text-muted-foreground">{i + 4}</span>
                        </div>
                        <RankChange change={creator.rankChange} />
                        <Avatar className="h-8 w-8 sm:h-9 sm:w-9">
                          <AvatarImage src={creator.avatar} alt={creator.name} />
                          <AvatarFallback>{creator.name.slice(0, 2)}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-[13px] sm:text-sm truncate">{creator.name}</p>
                          <p className="text-[10px] sm:text-xs text-muted-foreground mt-0.5">
                            {getCreatorSecondary(creator)}
                          </p>
                        </div>
                        <span className="text-sm font-semibold text-success shrink-0">
                          {getCreatorValue(creator)}
                        </span>
                        <ChevronRight className="h-3.5 w-3.5 text-muted-foreground/30 group-hover:text-muted-foreground transition-colors shrink-0 hidden sm:block" />
                      </Link>
                    ))}

                    {/* Your rank */}
                    <div className="border-t-2 border-dashed border-primary/20 !border-b-0">
                      <div className="flex items-center gap-2.5 sm:gap-3 py-2.5 sm:py-3 px-3 sm:px-4 bg-primary/[0.04]">
                        <div className="w-8 sm:w-9 flex items-center justify-center shrink-0">
                          <span className="text-xs sm:text-sm font-bold text-primary">
                            {creatorSort === "pot" ? 42 : creatorSort === "markets" ? 37 : 29}
                          </span>
                        </div>
                        <span className="w-4" />
                        <Avatar className="h-8 w-8 sm:h-9 sm:w-9 ring-2 ring-primary/20">
                          <AvatarFallback className="bg-primary/10 text-primary font-bold text-xs">YOU</AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <p className="font-semibold text-[13px] sm:text-sm text-primary">You</p>
                          <p className="text-[10px] sm:text-xs text-muted-foreground mt-0.5">
                            {creatorSort === "pot" ? "3 markets" : creatorSort === "markets" ? "$12.4K pot" : "3 markets"}
                          </p>
                        </div>
                        <span className="text-sm font-semibold text-success shrink-0">
                          {creatorSort === "pot" ? "$12.4K" : creatorSort === "markets" ? "3" : "$4.1K"}
                        </span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        <MarketsSidebar />
      </div>
    </div>
  );
}
