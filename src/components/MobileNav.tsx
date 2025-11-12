import { Home, Newspaper, Users, MessageSquare, HelpCircle } from "lucide-react";
import { NavLink } from "@/components/NavLink";
import { useLocation } from "react-router-dom";

const items = [
  { title: "Markets", url: "/", icon: Home },
  { title: "Community", url: "/community-feed", icon: MessageSquare },
  { title: "News", url: "/news", icon: Newspaper },
  { title: "Leaderboard", url: "/community", icon: Users },
];

export function MobileNav() {
  const location = useLocation();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-20 border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex items-center justify-around h-16">
        {items.map((item) => {
          const isActive = location.pathname === item.url;
          return (
            <NavLink
              key={item.url}
              to={item.url}
              end
              className="flex flex-col items-center justify-center flex-1 h-full gap-1 transition-colors"
            >
              <item.icon 
                className={`h-5 w-5 ${isActive ? 'text-primary' : 'text-muted-foreground'}`} 
              />
              <span className={`text-xs ${isActive ? 'text-primary font-medium' : 'text-muted-foreground'}`}>
                {item.title}
              </span>
            </NavLink>
          );
        })}
        <button className="flex flex-col items-center justify-center flex-1 h-full gap-1 transition-colors">
          <HelpCircle className="h-5 w-5 text-muted-foreground opacity-50" />
          <span className="text-xs text-muted-foreground opacity-50">
            Help
          </span>
        </button>
      </div>
    </nav>
  );
}
