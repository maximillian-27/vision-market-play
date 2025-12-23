import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Users, UserPlus, TrendingUp } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useProfileDialog } from "@/contexts/ProfileDialogContext";

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
  const { openProfile } = useProfileDialog();

  return (
    <div className="w-64 lg:w-72 space-y-4 hidden lg:block sticky top-20 self-start max-h-[calc(100vh-6rem)] overflow-y-auto scrollbar-thin">
      {/* Following Users */}
      <Card className="border-border/40 overflow-hidden">
        <CardHeader className="pb-2 pt-4 px-4">
          <CardTitle className="text-sm font-semibold flex items-center gap-2">
            <Users className="h-4 w-4 text-primary" />
            Following
          </CardTitle>
        </CardHeader>
        <CardContent className="p-2 pt-0">
          <ScrollArea className="h-[240px]">
            <div className="space-y-0.5 pr-2">
              {followingUsers.map((user) => (
                <div
                  key={user.username}
                  className="flex items-center gap-2.5 p-2.5 rounded-lg hover:bg-muted/50 cursor-pointer transition-colors"
                  onClick={() => openProfile(user.username.slice(1))}
                >
                  <Avatar className="h-9 w-9 flex-shrink-0 ring-1 ring-border/30">
                    <AvatarImage src={user.avatar} alt={user.name} />
                    <AvatarFallback className="text-xs">{user.name.slice(0, 2)}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{user.name}</p>
                    <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                      <span className="text-success font-medium">{user.profit}</span>
                      <span className="text-muted-foreground/40">•</span>
                      <span>{user.accuracy}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
          <Button
            variant="ghost"
            size="sm"
            className="w-full mt-2 text-xs text-muted-foreground hover:text-foreground"
            onClick={() => navigate("/community")}
          >
            <UserPlus className="h-3 w-3 mr-1.5" />
            Find more users
          </Button>
        </CardContent>
      </Card>

      {/* Following Creators */}
      <Card className="border-border/40 overflow-hidden">
        <CardHeader className="pb-2 pt-4 px-4">
          <CardTitle className="text-sm font-semibold flex items-center gap-2">
            <TrendingUp className="h-4 w-4 text-primary" />
            Top Creators
          </CardTitle>
        </CardHeader>
        <CardContent className="p-2 pt-0">
          <div className="space-y-0.5">
            {followingCreators.map((creator) => (
              <div
                key={creator.username}
                className="flex items-center gap-2.5 p-2.5 rounded-lg hover:bg-muted/50 cursor-pointer transition-colors"
                onClick={() => openProfile(creator.username.slice(1))}
              >
                <Avatar className="h-9 w-9 flex-shrink-0 ring-1 ring-border/30">
                  <AvatarImage src={creator.avatar} alt={creator.name} />
                  <AvatarFallback className="text-xs">{creator.name.slice(0, 2)}</AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{creator.name}</p>
                  <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                    <span className="font-medium">{creator.markets} markets</span>
                    <span className="text-muted-foreground/40">•</span>
                    <span>{creator.volume}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <Button
            variant="ghost"
            size="sm"
            className="w-full mt-2 text-xs text-muted-foreground hover:text-foreground"
            onClick={() => navigate("/community")}
          >
            <UserPlus className="h-3 w-3 mr-1.5" />
            Discover creators
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
