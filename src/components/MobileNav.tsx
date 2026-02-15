import { Home, Newspaper, MessageSquare, Search } from "lucide-react";
import { NavLink } from "@/components/NavLink";
import { useLocation } from "react-router-dom";

const items = [
  { title: "Home", url: "/", icon: Home },
  { title: "Community", url: "/community-feed", icon: MessageSquare },
  { title: "News", url: "/news", icon: Newspaper },
  { title: "Search", url: "/search", icon: Search },
];

export function MobileNav() {
  const location = useLocation();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-border bg-background">
      <div className="flex items-center justify-around h-[60px]">
        {items.map((item) => {
          const isActive = location.pathname === item.url;
          return (
            <NavLink
              key={item.url}
              to={item.url}
              end
              className="flex flex-col items-center justify-center flex-1 h-full gap-0.5 transition-colors active:scale-95"
            >
              <item.icon 
                className={`h-5 w-5 transition-colors ${isActive ? 'text-primary' : 'text-muted-foreground'}`} 
                strokeWidth={isActive ? 2.5 : 2}
              />
              <span className={`text-[10px] ${isActive ? 'text-primary font-medium' : 'text-muted-foreground'}`}>
                {item.title}
              </span>
            </NavLink>
          );
        })}
      </div>
    </nav>
  );
}
