import { Home, Newspaper, Users, MessageSquare, Search } from "lucide-react";
import { NavLink } from "@/components/NavLink";
import { useLocation, useNavigate } from "react-router-dom";
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
  const navigate = useNavigate();
  const [showSearch, setShowSearch] = useState(false);

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const query = formData.get("search") as string;
    if (query.trim()) {
      navigate(`/search?q=${encodeURIComponent(query.trim())}`);
      setShowSearch(false);
    }
  };

  return (
    <>
      <Dialog open={showSearch} onOpenChange={setShowSearch}>
        <DialogContent className="top-4 translate-y-0 rounded-lg border-border/60">
          <DialogHeader>
            <DialogTitle>Search Markets</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSearch}>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground/50" />
              <Input 
                name="search"
                placeholder="Search markets..." 
                className="pl-10 h-11 text-base"
                autoFocus
              />
            </div>
          </form>
        </DialogContent>
      </Dialog>

      <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-border/50 bg-background safe-area-pb">
        <div className="flex items-center justify-around h-14 max-w-lg mx-auto">
          {items.map((item) => {
            const isActive = location.pathname === item.url;
            return (
              <NavLink
                key={item.url}
                to={item.url}
                end
                className="flex flex-col items-center justify-center flex-1 h-full gap-0.5 tap-scale"
              >
                <item.icon 
                  className={`h-5 w-5 ${isActive ? 'text-primary' : 'text-muted-foreground'}`} 
                  strokeWidth={isActive ? 2.5 : 2}
                />
                <span className={`text-[10px] ${isActive ? 'text-primary font-semibold' : 'text-muted-foreground'}`}>
                  {item.title}
                </span>
              </NavLink>
            );
          })}
          
          {/* Search Button */}
          <button
            onClick={() => setShowSearch(true)}
            className="flex flex-col items-center justify-center flex-1 h-full gap-0.5 tap-scale"
          >
            <Search className="h-5 w-5 text-muted-foreground" strokeWidth={2} />
            <span className="text-[10px] text-muted-foreground">Search</span>
          </button>
        </div>
      </nav>
    </>
  );
}
