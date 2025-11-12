import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Users, UserPlus, TrendingUp } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { ScrollArea } from "@/components/ui/scroll-area";

const followingUsers = [
  {
    username: "@alexthompson",
    name: "Alex Thompson",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=AlexT",
    accuracy: "87%",
    profit: "+$12.4K"
  },
  {
    username: "@mariagarcia",
    name: "Maria Garcia",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Maria",
    accuracy: "84%",
    profit: "+$9.8K"
  },
  {
    username: "@davidkim",
    name: "David Kim",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=David",
    accuracy: "91%",
    profit: "+$15.2K"
  },
  {
    username: "@sophiechen",
    name: "Sophie Chen",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sophie",
    accuracy: "78%",
    profit: "+$6.7K"
  }
];

const followingCreators = [
  {
    username: "@marketmaven",
    name: "MarketMaven",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Maven",
    markets: 47,
    volume: "$2.8M"
  },
  {
    username: "@predictpro",
    name: "PredictPro",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Pro",
    markets: 38,
    volume: "$2.1M"
  },
  {
    username: "@trendsetter",
    name: "TrendSetter",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Trend",
    markets: 31,
    volume: "$1.7M"
  }
];

export function FollowingSidebar() {
  const navigate = useNavigate();

  return (
    <div className="w-64 lg:w-72 space-y-4 hidden lg:block sticky top-16 self-start max-h-[calc(100vh-5rem)] overflow-y-auto">
      {/* Following Users */}
      <Card className="border-border/40">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-semibold flex items-center gap-2">
            <Users className="h-4 w-4 text-primary" />
            Following
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-1">
          <ScrollArea className="h-[280px]">
            {followingUsers.map((user) => (
              <div
                key={user.username}
                className="flex items-center gap-2 p-2 rounded-lg hover:bg-muted/50 cursor-pointer transition-colors"
                onClick={() => navigate(`/profile/${user.username.slice(1)}`)}
              >
                <Avatar className="h-9 w-9 flex-shrink-0">
                  <AvatarImage src={user.avatar} alt={user.name} />
                  <AvatarFallback>{user.name.slice(0, 2)}</AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{user.name}</p>
                  <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                    <span className="text-success">{user.profit}</span>
                    <span>•</span>
                    <span>{user.accuracy}</span>
                  </div>
                </div>
              </div>
            ))}
          </ScrollArea>
          <Button
            variant="ghost"
            size="sm"
            className="w-full mt-2 text-xs text-muted-foreground"
            onClick={() => navigate("/community")}
          >
            <UserPlus className="h-3 w-3 mr-1" />
            Find more users
          </Button>
        </CardContent>
      </Card>

      {/* Following Creators */}
      <Card className="border-border/40">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-semibold flex items-center gap-2">
            <TrendingUp className="h-4 w-4 text-primary" />
            Top Creators
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-1">
          {followingCreators.map((creator) => (
            <div
              key={creator.username}
              className="flex items-center gap-2 p-2 rounded-lg hover:bg-muted/50 cursor-pointer transition-colors"
              onClick={() => navigate(`/creator/${creator.username.slice(1)}`)}
            >
              <Avatar className="h-9 w-9 flex-shrink-0">
                <AvatarImage src={creator.avatar} alt={creator.name} />
                <AvatarFallback>{creator.name.slice(0, 2)}</AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{creator.name}</p>
                <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                  <span>{creator.markets} markets</span>
                  <span>•</span>
                  <span>{creator.volume}</span>
                </div>
              </div>
            </div>
          ))}
          <Button
            variant="ghost"
            size="sm"
            className="w-full mt-2 text-xs text-muted-foreground"
            onClick={() => navigate("/community")}
          >
            <UserPlus className="h-3 w-3 mr-1" />
            Discover creators
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
