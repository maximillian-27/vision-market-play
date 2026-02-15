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
    <nav className="fixed bottom-px left-4 right-4 z-50 bg-background rounded-2xl border border-border shadow-lg shrink-0" style={{ height: '60px', minHeight: '60px', maxHeight: '60px', flexShrink: 0, boxSizing: 'border-box', transform: 'none', transition: 'none' }}>
      <div className="flex items-stretch justify-around pt-2.5 pb-[env(safe-area-inset-bottom,6px)] -translate-y-1 h-full overflow-hidden">
        {items.map((item) => {
          const isActive = location.pathname === item.url;
          return (
            <NavLink
              key={item.url}
              to={item.url}
              end
              className="flex flex-col items-center justify-center gap-1 py-1.5 active:scale-95"
              style={{ width: '25%', boxSizing: 'border-box', flexShrink: 0, flexGrow: 0 }}
            >
              <item.icon 
                className={`h-5 w-5 ${isActive ? 'text-bet' : 'text-muted-foreground'}`} 
                strokeWidth={isActive ? 2.5 : 1.8}
              />
              <span className={`text-[10px] leading-none whitespace-nowrap overflow-hidden text-ellipsis ${isActive ? 'text-bet font-semibold' : 'text-muted-foreground font-medium'}`}>
                {item.title}
              </span>
            </NavLink>
          );
        })}
      </div>
    </nav>
  );
}
