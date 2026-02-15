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
    <nav className="fixed bottom-0.5 left-4 right-4 z-50 bg-background rounded-2xl border border-border shadow-lg">
      <div className="flex items-stretch justify-around pt-2.5 pb-[env(safe-area-inset-bottom,6px)] -translate-y-1">
        {items.map((item) => {
          const isActive = location.pathname === item.url;
          return (
            <NavLink
              key={item.url}
              to={item.url}
              end
              className="flex flex-col items-center justify-center flex-1 gap-1 py-1.5 transition-colors active:scale-95"
            >
              <item.icon 
                className={`h-5 w-5 transition-colors ${isActive ? 'text-bet' : 'text-muted-foreground'}`} 
                strokeWidth={isActive ? 2.5 : 1.8}
              />
              <span className={`text-[10px] leading-none ${isActive ? 'text-bet font-semibold' : 'text-muted-foreground font-medium'}`}>
                {item.title}
              </span>
            </NavLink>
          );
        })}
      </div>
    </nav>
  );
}
