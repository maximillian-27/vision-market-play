import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { TrendingUp, Search } from "lucide-react";

const trendingMarkets = [
  { category: "Crypto", title: "Will Bitcoin reach $100K by end of 2025?", volume: "$2.4M" },
  { category: "Politics", title: "Next US Federal Reserve interest rate decision?", volume: "$3.1M" },
  { category: "Tech", title: "Will AI replace 25% of customer service jobs?", volume: "$1.8M" },
  { category: "Sports", title: "Who will win the NBA Championship?", volume: "$890K" },
];

const suggestedUsers = [
  { name: "MarketMaven", username: "@marketmaven", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Maven" },
  { name: "PredictPro", username: "@predictpro", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Pro" },
  { name: "TrendSetter", username: "@trendsetter", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Trend" },
];

export function TrendingSidebar() {
  return (
    <div className="w-72 hidden xl:block sticky top-20 self-start space-y-4 max-h-[calc(100vh-6rem)] overflow-y-auto scrollbar-thin">
      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <input
          type="text"
          placeholder="Search"
          className="w-full h-10 pl-10 pr-4 rounded-full bg-muted/60 border-0 text-sm placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all"
        />
      </div>

      {/* Trending Markets */}
      <div className="rounded-2xl bg-muted/30 border border-border/40 overflow-hidden">
        <h3 className="font-bold text-base px-4 pt-3 pb-2">Trending Markets</h3>
        <div className="divide-y divide-border/30">
          {trendingMarkets.map((market, i) => (
            <div key={i} className="px-4 py-2.5 hover:bg-muted/40 transition-colors cursor-pointer">
              <div className="flex items-center gap-1.5 text-[11px] text-muted-foreground">
                <span>{i + 1}</span>
                <span>·</span>
                <span>{market.category}</span>
                <span>·</span>
                <TrendingUp className="h-3 w-3" />
              </div>
              <p className="text-sm font-medium leading-snug mt-0.5 line-clamp-2">{market.title}</p>
              <span className="text-[11px] text-muted-foreground">{market.volume} volume</span>
            </div>
          ))}
        </div>
        <button className="w-full text-left px-4 py-3 text-sm text-primary hover:bg-muted/40 transition-colors">
          Show more
        </button>
      </div>

      {/* Who to follow */}
      <div className="rounded-2xl bg-muted/30 border border-border/40 overflow-hidden">
        <h3 className="font-bold text-base px-4 pt-3 pb-2">Who to follow</h3>
        <div className="divide-y divide-border/30">
          {suggestedUsers.map((user) => (
            <div key={user.username} className="flex items-center gap-3 px-4 py-3 hover:bg-muted/40 transition-colors cursor-pointer">
              <Avatar className="h-10 w-10">
                <AvatarImage src={user.avatar} alt={user.name} />
                <AvatarFallback>{user.name.slice(0, 2)}</AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold truncate">{user.name}</p>
                <p className="text-xs text-muted-foreground">{user.username}</p>
              </div>
              <Button size="sm" className="rounded-full h-8 px-4 text-xs font-bold">
                Follow
              </Button>
            </div>
          ))}
        </div>
        <button className="w-full text-left px-4 py-3 text-sm text-primary hover:bg-muted/40 transition-colors">
          Show more
        </button>
      </div>
    </div>
  );
}
