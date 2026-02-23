import { useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Trophy, TrendingUp, Target, Zap, Award, ChevronRight } from "lucide-react";
import { MarketsSidebar } from "@/components/MarketsSidebar";
import { ActivitySidebar } from "@/components/ActivitySidebar";
import { PageHeader } from "@/components/PageHeader";

const topEarners = [
  { name: "Alex Chen", profit: "+$45,230", accuracy: "87%", trades: 342, rank: 1, avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex" },
  { name: "Jordan Smith", profit: "+$38,450", accuracy: "84%", trades: 298, rank: 2, avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Jordan" },
  { name: "Taylor Brown", profit: "+$32,100", accuracy: "82%", trades: 267, rank: 3, avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Taylor" },
  { name: "Morgan Lee", profit: "+$28,900", accuracy: "79%", trades: 234, rank: 4, avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Morgan" },
  { name: "Casey Wilson", profit: "+$25,670", accuracy: "76%", trades: 211, rank: 5, avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Casey" },
];

const mostAccurate = [
  { name: "Sam Rivera", profit: "+$18,340", accuracy: "94%", trades: 127, rank: 1, avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sam" },
  { name: "Chris Park", profit: "+$22,100", accuracy: "91%", trades: 156, rank: 2, avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Chris" },
  { name: "Alex Chen", profit: "+$45,230", accuracy: "87%", trades: 342, rank: 3, avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex" },
  { name: "Jordan Smith", profit: "+$38,450", accuracy: "84%", trades: 298, rank: 4, avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Jordan" },
  { name: "Taylor Brown", profit: "+$32,100", accuracy: "82%", trades: 267, rank: 5, avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Taylor" },
];

const topCreators = [
  { name: "MarketMaven", markets: 47, volume: "$2.8M", followers: "12.3K", rank: 1, avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Maven" },
  { name: "PredictPro", markets: 38, volume: "$2.1M", followers: "9.8K", rank: 2, avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Pro" },
  { name: "TrendSetter", markets: 31, volume: "$1.7M", followers: "8.2K", rank: 3, avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Trend" },
  { name: "InsightHub", markets: 29, volume: "$1.5M", followers: "7.1K", rank: 4, avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Insight" },
  { name: "DataDriven", markets: 24, volume: "$1.2M", followers: "6.4K", rank: 5, avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Data" },
];

const challenges = [
  { 
    title: "Weekly Prediction Master", 
    description: "Make 10 correct predictions this week",
    progress: "5/10",
    reward: "500 points",
    icon: Target,
    difficulty: "Medium"
  },
  { 
    title: "High Stakes Player", 
    description: "Trade over $1000 in volume this month",
    progress: "$780/$1000",
    reward: "1000 points",
    icon: TrendingUp,
    difficulty: "Hard"
  },
  { 
    title: "Perfect Streak", 
    description: "Win 5 predictions in a row",
    progress: "3/5",
    reward: "750 points",
    icon: Zap,
    difficulty: "Hard"
  },
  { 
    title: "Community Helper", 
    description: "Create 3 quality markets",
    progress: "1/3",
    reward: "300 points",
    icon: Award,
    difficulty: "Easy"
  },
];

function getRankBadge(rank: number) {
  if (rank === 1) return "bg-yellow-500/10 text-yellow-600 border-yellow-500/20";
  if (rank === 2) return "bg-slate-400/10 text-slate-500 border-slate-400/20";
  if (rank === 3) return "bg-amber-600/10 text-amber-600 border-amber-600/20";
  return "bg-muted text-muted-foreground border-border";
}

export default function Community() {
  const [communityFilter, setCommunityFilter] = useState<"earners" | "accurate">("earners");
  
  const communityData = communityFilter === "earners" ? topEarners : mostAccurate;

  return (
    <div className="w-full max-w-7xl mx-auto py-4 lg:py-6">
      <div className="flex gap-6 justify-center">
        <ActivitySidebar />
        
        <div className="w-full max-w-2xl space-y-6 px-4">
          <PageHeader 
            title="Leaderboards"
            subtitle="See who's making the best predictions"
          />
          
          <Tabs defaultValue="community" className="w-full">
            <TabsList className="grid w-full grid-cols-2 h-11">
              <TabsTrigger value="community" className="text-sm">Traders</TabsTrigger>
              <TabsTrigger value="creators" className="text-sm">Creators</TabsTrigger>
            </TabsList>

            <TabsContent value="community" className="space-y-4 mt-4">
              <Card className="border-border/50">
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-base flex items-center gap-2">
                      <Trophy className="h-4 w-4 text-primary" />
                      Top Traders
                    </CardTitle>
                    <div className="flex gap-1.5">
                      <Badge 
                        variant={communityFilter === "earners" ? "default" : "outline"}
                        className="cursor-pointer text-xs"
                        onClick={() => setCommunityFilter("earners")}
                      >
                        Earnings
                      </Badge>
                      <Badge 
                        variant={communityFilter === "accurate" ? "default" : "outline"}
                        className="cursor-pointer text-xs"
                        onClick={() => setCommunityFilter("accurate")}
                      >
                        Accuracy
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pt-2">
                  <div className="divide-y divide-border/50">
                    {communityData.map((trader) => (
                      <Link 
                        key={trader.rank} 
                        to={`/profile/${trader.name.toLowerCase().replace(' ', '-')}`}
                        className="flex items-center gap-3 py-3 hover:bg-muted/30 -mx-2 px-2 rounded-lg transition-colors group"
                      >
                        <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold border ${getRankBadge(trader.rank)}`}>
                          {trader.rank}
                        </div>
                        <Avatar className="h-10 w-10">
                          <AvatarImage src={trader.avatar} alt={trader.name} />
                          <AvatarFallback>{trader.name.slice(0, 2)}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-sm">{trader.name}</p>
                          <div className="flex items-center gap-2 text-xs text-muted-foreground">
                            <span className="text-success font-medium">{trader.profit}</span>
                            <span className="text-muted-foreground/50">•</span>
                            <span>{trader.accuracy} accuracy</span>
                          </div>
                        </div>
                        <ChevronRight className="h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                      </Link>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="creators" className="space-y-4 mt-4">
              <Card className="border-border/50">
                <CardHeader className="pb-2">
                  <CardTitle className="text-base flex items-center gap-2">
                    <Award className="h-4 w-4 text-primary" />
                    Top Creators
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-2">
                  <div className="divide-y divide-border/50">
                    {topCreators.map((creator) => (
                      <Link 
                        key={creator.rank} 
                        to={`/creator/${creator.name.toLowerCase().replace(' ', '-')}`}
                        className="flex items-center gap-3 py-3 hover:bg-muted/30 -mx-2 px-2 rounded-lg transition-colors group"
                      >
                        <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold border ${getRankBadge(creator.rank)}`}>
                          {creator.rank}
                        </div>
                        <Avatar className="h-10 w-10">
                          <AvatarImage src={creator.avatar} alt={creator.name} />
                          <AvatarFallback>{creator.name.slice(0, 2)}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-sm">{creator.name}</p>
                          <div className="flex items-center gap-2 text-xs text-muted-foreground">
                            <span className="font-medium">{creator.volume}</span>
                            <span className="text-muted-foreground/50">•</span>
                            <span>{creator.markets} markets</span>
                          </div>
                        </div>
                        <ChevronRight className="h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                      </Link>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          <Card className="border-border/50">
            <CardHeader className="pb-2">
              <CardTitle className="text-base flex items-center gap-2">
                <Target className="h-4 w-4 text-primary" />
                Active Challenges
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-2">
              <div className="space-y-3">
                {challenges.map((challenge, index) => {
                  const Icon = challenge.icon;
                  return (
                    <div key={index} className="flex items-start gap-3 p-3 rounded-lg border border-border/50 hover:border-primary/20 hover:bg-muted/20 transition-all cursor-pointer">
                      <div className="p-2 rounded-lg bg-primary/10 flex-shrink-0">
                        <Icon className="h-4 w-4 text-primary" />
                      </div>
                      <div className="flex-1 min-w-0 space-y-1.5">
                        <div className="flex items-center justify-between gap-2">
                          <h3 className="font-medium text-sm">{challenge.title}</h3>
                          <Badge variant="outline" className="text-[10px] flex-shrink-0">
                            {challenge.difficulty}
                          </Badge>
                        </div>
                        <p className="text-xs text-muted-foreground">{challenge.description}</p>
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-muted-foreground">
                            Progress: <span className="font-medium text-foreground">{challenge.progress}</span>
                          </span>
                          <span className="text-primary font-medium">{challenge.reward}</span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </div>
        
        <MarketsSidebar />
      </div>
    </div>
  );
}
