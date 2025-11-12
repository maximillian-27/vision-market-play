import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Trophy, TrendingUp } from "lucide-react";

const leaderboard = [
  { name: "Alex Chen", profit: "+$45,230", accuracy: "87%", rank: 1, avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex" },
  { name: "Jordan Smith", profit: "+$38,450", accuracy: "84%", rank: 2, avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Jordan" },
  { name: "Taylor Brown", profit: "+$32,100", accuracy: "82%", rank: 3, avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Taylor" },
  { name: "Morgan Lee", profit: "+$28,900", accuracy: "79%", rank: 4, avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Morgan" },
  { name: "Casey Wilson", profit: "+$25,670", accuracy: "76%", rank: 5, avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Casey" },
];

export default function Community() {
  return (
    <div className="w-full md:container md:max-w-2xl py-4 md:py-6 space-y-4 md:space-y-6 px-4">
      <h1 className="text-2xl font-bold">Community</h1>
      
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Trophy className="h-5 w-5 text-primary" />
            Top Traders
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {leaderboard.map((trader) => (
            <div key={trader.rank} className="flex items-center gap-4 p-3 rounded-lg hover:bg-accent transition-colors">
              <div className="font-bold text-lg text-muted-foreground w-6">
                #{trader.rank}
              </div>
              <Avatar className="h-10 w-10">
                <AvatarImage src={trader.avatar} alt={trader.name} />
                <AvatarFallback>{trader.name.slice(0, 2)}</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <p className="font-semibold">{trader.name}</p>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <span className="text-success font-medium">{trader.profit}</span>
                  <span>•</span>
                  <span>{trader.accuracy} accuracy</span>
                </div>
              </div>
              <TrendingUp className="h-5 w-5 text-success" />
            </div>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Active Challenges</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="p-4 border rounded-lg space-y-2">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-semibold">Weekly Prediction Master</h3>
                <p className="text-sm text-muted-foreground">Make 10 correct predictions this week</p>
              </div>
              <Badge variant="outline">5/10</Badge>
            </div>
          </div>
          <div className="p-4 border rounded-lg space-y-2">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-semibold">High Stakes Player</h3>
                <p className="text-sm text-muted-foreground">Trade over $1000 in volume</p>
              </div>
              <Badge variant="outline">$780/$1000</Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
