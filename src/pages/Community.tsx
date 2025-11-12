import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Trophy, TrendingUp, Target, Zap, Award } from "lucide-react";

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

export default function Community() {
  const [communityFilter, setCommunityFilter] = useState<"earners" | "accurate">("earners");
  
  const communityData = communityFilter === "earners" ? topEarners : mostAccurate;

  return (
    <div className="w-full md:container md:max-w-2xl py-4 md:py-6 space-y-4 md:space-y-6 px-4 md:px-4">
      <h1 className="text-2xl font-bold">Community</h1>
      
      <Tabs defaultValue="community" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="community">Traders</TabsTrigger>
          <TabsTrigger value="creators">Creators</TabsTrigger>
        </TabsList>

        <TabsContent value="community" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Trophy className="h-5 w-5 text-primary" />
                  Community Leaderboard
                </CardTitle>
                <div className="flex gap-2">
                  <Badge 
                    variant={communityFilter === "earners" ? "default" : "outline"}
                    className="cursor-pointer"
                    onClick={() => setCommunityFilter("earners")}
                  >
                    Top Earners
                  </Badge>
                  <Badge 
                    variant={communityFilter === "accurate" ? "default" : "outline"}
                    className="cursor-pointer"
                    onClick={() => setCommunityFilter("accurate")}
                  >
                    Most Accurate
                  </Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-2">
              {communityData.map((trader) => (
                <div key={trader.rank} className="flex items-center gap-3 p-3 rounded-lg hover:bg-accent transition-colors">
                  <div className="font-bold text-lg text-muted-foreground w-8">
                    #{trader.rank}
                  </div>
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={trader.avatar} alt={trader.name} />
                    <AvatarFallback>{trader.name.slice(0, 2)}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold truncate">{trader.name}</p>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <span className="text-success font-medium">{trader.profit}</span>
                      <span>•</span>
                      <span>{trader.accuracy}</span>
                      <span>•</span>
                      <span>{trader.trades} trades</span>
                    </div>
                  </div>
                  <TrendingUp className="h-4 w-4 text-success flex-shrink-0" />
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="creators" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Award className="h-5 w-5 text-primary" />
                Top Creators
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {topCreators.map((creator) => (
                <div key={creator.rank} className="flex items-center gap-3 p-3 rounded-lg hover:bg-accent transition-colors">
                  <div className="font-bold text-lg text-muted-foreground w-8">
                    #{creator.rank}
                  </div>
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={creator.avatar} alt={creator.name} />
                    <AvatarFallback>{creator.name.slice(0, 2)}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold truncate">{creator.name}</p>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <span className="font-medium">{creator.volume} volume</span>
                      <span>•</span>
                      <span>{creator.markets} markets</span>
                      <span>•</span>
                      <span>{creator.followers} followers</span>
                    </div>
                  </div>
                  <Trophy className="h-4 w-4 text-primary flex-shrink-0" />
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

      </Tabs>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5 text-primary" />
            Active Challenges
          </CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4">
          {challenges.map((challenge, index) => {
            const Icon = challenge.icon;
            return (
              <div key={index} className="flex items-start gap-4 p-3 rounded-lg hover:bg-accent transition-colors">
                <div className="p-2 rounded-lg bg-primary/10">
                  <Icon className="h-5 w-5 text-primary" />
                </div>
                <div className="flex-1 space-y-2">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h3 className="font-semibold">{challenge.title}</h3>
                      <p className="text-sm text-muted-foreground mt-1">{challenge.description}</p>
                    </div>
                    <Badge variant="outline" className="flex-shrink-0">
                      {challenge.difficulty}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Progress: <span className="font-medium text-foreground">{challenge.progress}</span></span>
                    <span className="text-primary font-medium">{challenge.reward}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </CardContent>
      </Card>
    </div>
  );
}
