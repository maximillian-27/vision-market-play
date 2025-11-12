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
        <DialogContent className="top-2 translate-y-0">
          <DialogHeader>
            <DialogTitle>Search Markets</DialogTitle>
          </DialogHeader>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input 
              placeholder="Search markets..." 
              className="pl-10 h-12 text-base"
              autoFocus
            />
          </div>
        </DialogContent>
      </Dialog>

      <div className="fixed bottom-0 left-0 right-0 z-20">
      {/* How it works button - thin bar above nav */}
      <button className="w-full py-1.5 border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 text-xs text-muted-foreground opacity-50 hover:opacity-70 transition-opacity">
        How it works?
      </button>
      
        {/* Main navigation */}
        <nav className="border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
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
            
            {/* Search Button */}
            <button
              onClick={() => setShowSearch(true)}
              className="flex flex-col items-center justify-center flex-1 h-full gap-1 transition-colors"
            >
              <Search className="h-5 w-5 text-muted-foreground" />
              <span className="text-xs text-muted-foreground">Search</span>
            </button>
          </div>
        </nav>
      </div>
    </>
  );
}
