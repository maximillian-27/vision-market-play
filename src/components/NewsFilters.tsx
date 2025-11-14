import { SlidersHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";

const categories = ["All", "Politics", "Business", "Technology", "Sports", "Entertainment", "Science", "World"];

export function NewsFilters() {
  const [showFilters, setShowFilters] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("All");

  return (
    <div className="space-y-3 sticky top-16 z-10 bg-background/98 backdrop-blur-md py-3 -mt-2">
      {/* Filter Panel */}
      {showFilters && (
        <div className="rounded-xl border border-border/10 bg-background shadow-lg p-5 animate-in fade-in-0 slide-in-from-top-2 duration-200">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="space-y-2.5">
              <Label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Sort By</Label>
              <Select defaultValue="recent">
                <SelectTrigger className="h-11 border-none bg-muted/50 hover:bg-muted transition-all text-sm font-medium rounded-lg shadow-sm">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="rounded-xl border-border/10 bg-background shadow-xl p-1">
                  <SelectItem value="recent" className="rounded-lg py-2.5 cursor-pointer">Most Recent</SelectItem>
                  <SelectItem value="trending" className="rounded-lg py-2.5 cursor-pointer">Trending</SelectItem>
                  <SelectItem value="popular" className="rounded-lg py-2.5 cursor-pointer">Most Popular</SelectItem>
                  <SelectItem value="discussed" className="rounded-lg py-2.5 cursor-pointer">Most Discussed</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2.5">
              <Label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Source</Label>
              <Select defaultValue="all">
                <SelectTrigger className="h-11 border-none bg-muted/50 hover:bg-muted transition-all text-sm font-medium rounded-lg shadow-sm">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="rounded-xl border-border/10 bg-background shadow-xl p-1">
                  <SelectItem value="all" className="rounded-lg py-2.5 cursor-pointer">All Sources</SelectItem>
                  <SelectItem value="verified" className="rounded-lg py-2.5 cursor-pointer">Verified Only</SelectItem>
                  <SelectItem value="official" className="rounded-lg py-2.5 cursor-pointer">Official Sources</SelectItem>
                  <SelectItem value="community" className="rounded-lg py-2.5 cursor-pointer">Community</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2.5">
              <Label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Region</Label>
              <Select defaultValue="global">
                <SelectTrigger className="h-11 border-none bg-muted/50 hover:bg-muted transition-all text-sm font-medium rounded-lg shadow-sm">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="rounded-xl border-border/10 bg-background shadow-xl p-1">
                  <SelectItem value="global" className="rounded-lg py-2.5 cursor-pointer">Global</SelectItem>
                  <SelectItem value="us" className="rounded-lg py-2.5 cursor-pointer">United States</SelectItem>
                  <SelectItem value="europe" className="rounded-lg py-2.5 cursor-pointer">Europe</SelectItem>
                  <SelectItem value="asia" className="rounded-lg py-2.5 cursor-pointer">Asia</SelectItem>
                  <SelectItem value="americas" className="rounded-lg py-2.5 cursor-pointer">Americas</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2.5">
              <Label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Timeframe</Label>
              <Select defaultValue="24h">
                <SelectTrigger className="h-11 border-none bg-muted/50 hover:bg-muted transition-all text-sm font-medium rounded-lg shadow-sm">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="rounded-xl border-border/10 bg-background shadow-xl p-1">
                  <SelectItem value="1h" className="rounded-lg py-2.5 cursor-pointer">Last Hour</SelectItem>
                  <SelectItem value="24h" className="rounded-lg py-2.5 cursor-pointer">Last 24 Hours</SelectItem>
                  <SelectItem value="7d" className="rounded-lg py-2.5 cursor-pointer">Last 7 Days</SelectItem>
                  <SelectItem value="30d" className="rounded-lg py-2.5 cursor-pointer">Last 30 Days</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      )}

      {/* Category Tags with Filter Button */}
      <div className="flex gap-2 items-center">
        {/* Filter Button - Icon only */}
        <Button 
          variant={showFilters ? "secondary" : "ghost"} 
          size="icon"
          className="h-9 w-9 flex-shrink-0 rounded-full"
          onClick={() => setShowFilters(!showFilters)}
        >
          <SlidersHorizontal className="h-4 w-4" />
        </Button>
        
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`whitespace-nowrap font-medium px-4 py-2 text-sm transition-colors border-b-2 ${
                category === selectedCategory 
                  ? "border-foreground text-foreground" 
                  : "border-transparent text-muted-foreground hover:text-foreground"
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
