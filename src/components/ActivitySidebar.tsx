import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Activity, TrendingUp, TrendingDown, MessageCircle, Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { ScrollArea } from "@/components/ui/scroll-area";

interface ActivityItem {
  id: string;
  user: {
    name: string;
    username: string;
    avatar: string;
  };
  action: "trade" | "comment" | "create";
  market: string;
  outcome?: string;
  amount?: string;
  timestamp: string;
  direction?: "up" | "down";
}

const recentActivity: ActivityItem[] = [
  {
    id: "1",
    user: {
      name: "Alex Chen",
      username: "@alexchen",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex"
    },
    action: "trade",
    market: "Bitcoin $100K by 2025?",
    outcome: "Yes",
    amount: "$250",
    timestamp: "2m ago",
    direction: "up"
  },
  {
    id: "2",
    user: {
      name: "Maria Garcia",
      username: "@mariagarcia",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Maria"
    },
    action: "comment",
    market: "Apple foldable iPhone?",
    timestamp: "5m ago"
  },
  {
    id: "3",
    user: {
      name: "David Kim",
      username: "@davidkim",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=David"
    },
    action: "trade",
    market: "Fed interest rate decision",
    outcome: "Hold",
    amount: "$180",
    timestamp: "8m ago",
    direction: "down"
  },
  {
    id: "4",
    user: {
      name: "Sophie Chen",
      username: "@sophiechen",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sophie"
    },
    action: "create",
    market: "Will Tesla hit $500 by Q3?",
    timestamp: "12m ago"
  },
  {
    id: "5",
    user: {
      name: "James Wilson",
      username: "@jameswilson",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=James"
    },
    action: "trade",
    market: "NBA Championship winner",
    outcome: "Celtics",
    amount: "$320",
    timestamp: "15m ago",
    direction: "up"
  },
  {
    id: "6",
    user: {
      name: "Emma Taylor",
      username: "@emmataylor",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Emma"
    },
    action: "comment",
    market: "AI customer service jobs",
    timestamp: "18m ago"
  },
  {
    id: "7",
    user: {
      name: "Ryan Park",
      username: "@ryanpark",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Ryan"
    },
    action: "trade",
    market: "Bitcoin $100K by 2025?",
    outcome: "No",
    amount: "$150",
    timestamp: "22m ago",
    direction: "down"
  }
];

export function ActivitySidebar() {
  const navigate = useNavigate();

  const getActionIcon = (action: ActivityItem["action"]) => {
    switch (action) {
      case "trade":
        return TrendingUp;
      case "comment":
        return MessageCircle;
      case "create":
        return Plus;
    }
  };

  const getActionText = (item: ActivityItem) => {
    switch (item.action) {
      case "trade":
        return (
          <>
            bought <span className="font-semibold text-foreground">{item.outcome}</span> for{" "}
            <span className="font-semibold text-foreground">{item.amount}</span>
          </>
        );
      case "comment":
        return "commented on";
      case "create":
        return "created";
    }
  };

  return (
    <div className="w-64 lg:w-72 hidden lg:block sticky top-16 self-start max-h-[calc(100vh-5rem)]">
      <Card className="border-border/40">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-semibold flex items-center gap-2">
            <Activity className="h-4 w-4 text-primary" />
            Live Activity
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <ScrollArea className="h-[calc(100vh-12rem)]">
            <div className="space-y-0.5 px-4 pb-4">
              {recentActivity.map((item) => {
                const ActionIcon = getActionIcon(item.action);
                return (
                  <div
                    key={item.id}
                    className="flex items-start gap-2 p-2 rounded-lg hover:bg-muted/50 cursor-pointer transition-colors"
                    onClick={() => navigate(`/market/${item.id}`)}
                  >
                    <Avatar className="h-8 w-8 flex-shrink-0">
                      <AvatarImage src={item.user.avatar} alt={item.user.name} />
                      <AvatarFallback>{item.user.name.slice(0, 2)}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0 space-y-1">
                      <div className="flex items-center gap-1.5">
                        <span 
                          className="text-xs font-medium text-foreground hover:underline"
                          onClick={(e) => {
                            e.stopPropagation();
                            navigate(`/profile/${item.user.username.slice(1)}`);
                          }}
                        >
                          {item.user.username}
                        </span>
                        {item.action === "trade" && item.direction && (
                          item.direction === "up" ? (
                            <TrendingUp className="h-3 w-3 text-success" />
                          ) : (
                            <TrendingDown className="h-3 w-3 text-destructive" />
                          )
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground leading-tight">
                        {getActionText(item)}{" "}
                        <span className="text-foreground font-medium line-clamp-1">
                          {item.market}
                        </span>
                      </p>
                      <span className="text-[10px] text-muted-foreground">
                        {item.timestamp}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  );
}
