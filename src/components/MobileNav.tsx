import { Home, Newspaper, Users, MessageSquare, Search } from "lucide-react";
import { NavLink } from "@/components/NavLink";
import { useLocation } from "react-router-dom";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

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
        <DialogContent className="top-4 translate-y-0 rounded-2xl border-border/60 shadow-elevated">
          <DialogHeader>
            <DialogTitle>Search Markets</DialogTitle>
          </DialogHeader>
          <div className="relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground/60" />
            <Input 
              placeholder="Search markets..." 
              className="pl-11 h-12 text-base rounded-xl"
              autoFocus
            />
          </div>
        </DialogContent>
      </Dialog>

      <div className="fixed bottom-0 left-0 right-0 z-50">
        {/* How it works - subtle link */}
        <button className="w-full py-2 border-t border-border/40 bg-background/95 backdrop-blur-xl text-xs text-muted-foreground/60 hover:text-muted-foreground transition-colors">
          How it works?
        </button>
        
        {/* Main navigation */}
        <nav className="border-t border-border/40 bg-background/95 backdrop-blur-xl supports-[backdrop-filter]:bg-background/80">
          <div className="flex items-center justify-around h-14 max-w-lg mx-auto px-2">
            {items.map((item) => {
              const isActive = location.pathname === item.url;
              return (
                <NavLink
                  key={item.url}
                  to={item.url}
                  end
                  className="flex flex-col items-center justify-center flex-1 h-full gap-0.5 transition-all duration-200 active:scale-95"
                >
                  <div className={`p-1.5 rounded-xl transition-colors ${isActive ? 'bg-primary/10' : ''}`}>
                    <item.icon 
                      className={`h-5 w-5 transition-colors ${isActive ? 'text-primary' : 'text-muted-foreground'}`} 
                      strokeWidth={isActive ? 2.5 : 2}
                    />
                  </div>
                  <span className={`text-[10px] transition-colors ${isActive ? 'text-primary font-semibold' : 'text-muted-foreground'}`}>
                    {item.title}
                  </span>
                </NavLink>
              );
            })}
            
            {/* Search Button */}
            <button
              onClick={() => setShowSearch(true)}
              className="flex flex-col items-center justify-center flex-1 h-full gap-0.5 transition-all duration-200 active:scale-95"
            >
              <div className="p-1.5 rounded-xl">
                <Search className="h-5 w-5 text-muted-foreground" />
              </div>
              <span className="text-[10px] text-muted-foreground">Search</span>
            </button>
          </div>
        </nav>
      </div>
    </>
  );
}