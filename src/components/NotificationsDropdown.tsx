import { useState } from "react";
import { Bell, Check, MessageCircle, TrendingUp, Users, Sparkles, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useNavigate } from "react-router-dom";

interface Notification {
  id: string;
  type: "market" | "comment" | "follow" | "resolution" | "system";
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  avatar?: string;
  link?: string;
}

const mockNotifications: Notification[] = [
  {
    id: "1",
    type: "market",
    title: "Market Resolved",
    message: '"Will Bitcoin reach $100k?" resolved to YES. You won $245!',
    timestamp: "2m ago",
    read: false,
    link: "/market/1",
  },
  {
    id: "2",
    type: "comment",
    title: "New Comment",
    message: "Alex Chen replied to your comment on a market.",
    timestamp: "15m ago",
    read: false,
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex",
    link: "/market/1",
  },
  {
    id: "3",
    type: "follow",
    title: "New Follower",
    message: "Sarah Chen started following you.",
    timestamp: "1h ago",
    read: false,
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
    link: "/creator/sarah-chen",
  },
  {
    id: "4",
    type: "market",
    title: "Price Alert",
    message: '"NBA Championship" Celtics price moved +15% to 47¢',
    timestamp: "2h ago",
    read: true,
    link: "/market/2",
  },
  {
    id: "5",
    type: "system",
    title: "Deposit Confirmed",
    message: "Your deposit of $500 has been confirmed.",
    timestamp: "3h ago",
    read: true,
  },
  {
    id: "6",
    type: "resolution",
    title: "Dispute Period",
    message: '"Fed Rate Decision" is now in dispute period. 23h remaining.',
    timestamp: "5h ago",
    read: true,
    link: "/market/3",
  },
];

export function NotificationsDropdown() {
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState<Notification[]>(mockNotifications);
  const [open, setOpen] = useState(false);
  
  const unreadCount = notifications.filter(n => !n.read).length;

  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
  };

  const markAsRead = (id: string) => {
    setNotifications(notifications.map(n => 
      n.id === id ? { ...n, read: true } : n
    ));
  };

  const handleNotificationClick = (notification: Notification) => {
    markAsRead(notification.id);
    if (notification.link) {
      navigate(notification.link);
      setOpen(false);
    }
  };

  const getIcon = (type: Notification["type"]) => {
    switch (type) {
      case "market":
        return <TrendingUp className="h-4 w-4 text-primary" />;
      case "comment":
        return <MessageCircle className="h-4 w-4 text-blue-500" />;
      case "follow":
        return <Users className="h-4 w-4 text-purple-500" />;
      case "resolution":
        return <AlertCircle className="h-4 w-4 text-orange-500" />;
      case "system":
        return <Sparkles className="h-4 w-4 text-success" />;
      default:
        return <Bell className="h-4 w-4" />;
    }
  };

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground relative">
          <Bell className="h-4 w-4" />
          {unreadCount > 0 && (
            <span className="absolute top-1 right-1 h-2 w-2 bg-primary rounded-full" />
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent 
        align="end" 
        className="w-80 p-0 bg-popover rounded-xl border-border/60"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-border/40">
          <h3 className="font-semibold text-sm">Notifications</h3>
          {unreadCount > 0 && (
            <Button 
              variant="ghost" 
              size="sm" 
              className="h-7 text-xs text-primary hover:text-primary"
              onClick={markAllAsRead}
            >
              <Check className="h-3 w-3 mr-1" />
              Mark all read
            </Button>
          )}
        </div>

        {/* Notifications List */}
        <ScrollArea className="h-[360px]">
          {notifications.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <Bell className="h-10 w-10 text-muted-foreground/30 mb-3" />
              <p className="text-sm text-muted-foreground">No notifications yet</p>
            </div>
          ) : (
            <div className="divide-y divide-border/30">
              {notifications.map((notification) => (
                <button
                  key={notification.id}
                  className={`w-full flex items-start gap-3 p-3 text-left hover:bg-muted/50 transition-colors ${
                    !notification.read ? "bg-primary/5" : ""
                  }`}
                  onClick={() => handleNotificationClick(notification)}
                >
                  {/* Icon or Avatar */}
                  <div className="flex-shrink-0 mt-0.5">
                    {notification.avatar ? (
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={notification.avatar} />
                        <AvatarFallback className="text-[10px]">
                          {notification.title.slice(0, 2)}
                        </AvatarFallback>
                      </Avatar>
                    ) : (
                      <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center">
                        {getIcon(notification.type)}
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className={`text-sm font-medium ${!notification.read ? "text-foreground" : "text-muted-foreground"}`}>
                        {notification.title}
                      </span>
                      {!notification.read && (
                        <span className="h-1.5 w-1.5 rounded-full bg-primary flex-shrink-0" />
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground line-clamp-2 mt-0.5">
                      {notification.message}
                    </p>
                    <span className="text-[10px] text-muted-foreground/70 mt-1 block">
                      {notification.timestamp}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          )}
        </ScrollArea>

        {/* Footer */}
        <div className="border-t border-border/40 p-2">
          <Button 
            variant="ghost" 
            className="w-full h-8 text-xs text-muted-foreground"
            onClick={() => {
              navigate("/settings");
              setOpen(false);
            }}
          >
            Notification Settings
          </Button>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
