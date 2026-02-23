import { Home, Newspaper, Users, MessageSquare, Search } from "lucide-react";
import { NavLink } from "@/components/NavLink";
import { useLocation } from "react-router-dom";
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { SearchDropdown } from "@/components/SearchDropdown";

const items = [
  { title: "Markets", url: "/", icon: Home },
  { title: "Community", url: "/community-feed", icon: MessageSquare },
  { title: "News", url: "/news", icon: Newspaper },
  { title: "Leaderboards", url: "/community", icon: Users },
];

export function MobileNav() {
  const location = useLocation();
  const [showSearch, setShowSearch] = useState(false);

  return (
    <>
      <Dialog open={showSearch} onOpenChange={setShowSearch}>
        <DialogContent className="top-4 translate-y-0 rounded-lg border-border/60 max-h-[80vh] overflow-hidden">
          <DialogHeader>
            <DialogTitle>Search</DialogTitle>
          </DialogHeader>
          <SearchDropdown embedded onResultClick={() => setShowSearch(false)} />
        </DialogContent>
      </Dialog>

      <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-border/50 bg-background/95 backdrop-blur-xl supports-[backdrop-filter]:bg-background/80">
        <div className="flex items-center justify-around h-14 max-w-lg mx-auto">
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
          
          {/* Search Button */}
          <button
            onClick={() => setShowSearch(true)}
            className="flex flex-col items-center justify-center flex-1 h-full gap-0.5 transition-colors active:scale-95"
          >
            <Search className="h-5 w-5 text-muted-foreground" strokeWidth={2} />
            <span className="text-[10px] text-muted-foreground">Search</span>
          </button>
        </div>
      </nav>
    </>
  );
}
