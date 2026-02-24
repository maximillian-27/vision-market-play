import { Home, Users, MessageSquare, Search } from "lucide-react";
import { NavLink } from "@/components/NavLink";
import { useLocation } from "react-router-dom";
import { useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { SearchDropdown } from "@/components/SearchDropdown";
import { ArrowLeft } from "lucide-react";

const items = [
  { title: "Markets", url: "/", icon: Home },
  { title: "Community", url: "/community-feed", icon: MessageSquare },
  { title: "Leaderboards", url: "/community", icon: Users },
];

export function MobileNav() {
  const location = useLocation();
  const [showSearch, setShowSearch] = useState(false);

  return (
    <>
      <Dialog open={showSearch} onOpenChange={setShowSearch}>
        <DialogContent hideClose className="top-4 translate-y-0 rounded-lg border-border/60 max-h-[80vh] overflow-hidden p-0 gap-0">
          <div className="flex items-center gap-3 p-4 border-b border-border/40">
            <button
              onClick={() => setShowSearch(false)}
              className="h-8 w-8 rounded-full flex items-center justify-center hover:bg-muted transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
            </button>
            <h2 className="text-base font-semibold">Search</h2>
          </div>
          <div className="p-4">
            <SearchDropdown embedded onResultClick={() => setShowSearch(false)} />
          </div>
        </DialogContent>
      </Dialog>

      <nav className="fixed bottom-3 left-4 right-4 z-50 bg-background border border-border/50 rounded-2xl shadow-lg shadow-black/10">
        <div className="flex items-center justify-around h-[60px] max-w-lg mx-auto">
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
