import { SlidersHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";

const categories = ["All", "Following", "Hot", "Politics", "Sports", "Crypto", "Tech", "Entertainment", "Finance"];

export function FeedFilters() {
  const [showFilters, setShowFilters] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("All");

  return (
    <div className="space-y-3 sticky top-16 z-10 bg-background/98 backdrop-blur-md py-3 -mt-2">
      {/* Filter Panel */}
      {showFilters && (
        <div className="rounded-xl border border-border/20 bg-card/40 backdrop-blur-sm p-4 animate-in fade-in-0 slide-in-from-top-2 duration-200 shadow-sm">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <div className="space-y-2">
              <Label className="text-xs font-semibold text-foreground/70 uppercase tracking-wide">Sort By</Label>
              <Select defaultValue="trending">
                <SelectTrigger className="h-10 border border-border/40 bg-background hover:border-border transition-all text-sm font-medium rounded-lg">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="rounded-lg border-border/40">
                  <SelectItem value="trending" className="rounded-md">Trending</SelectItem>
                  <SelectItem value="volume" className="rounded-md">Highest Volume</SelectItem>
                  <SelectItem value="newest" className="rounded-md">Newest</SelectItem>
                  <SelectItem value="ending" className="rounded-md">Ending Soon</SelectItem>
                  <SelectItem value="active" className="rounded-md">Most Active</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label className="text-xs font-semibold text-foreground/70 uppercase tracking-wide">Region</Label>
              <Select defaultValue="global">
                <SelectTrigger className="h-10 border border-border/40 bg-background hover:border-border transition-all text-sm font-medium rounded-lg">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="rounded-lg border-border/40">
                  <SelectItem value="global" className="rounded-md">Global</SelectItem>
                  <SelectItem value="us" className="rounded-md">United States</SelectItem>
                  <SelectItem value="europe" className="rounded-md">Europe</SelectItem>
                  <SelectItem value="asia" className="rounded-md">Asia</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label className="text-xs font-semibold text-foreground/70 uppercase tracking-wide">Status</Label>
              <Select defaultValue="open">
                <SelectTrigger className="h-10 border border-border/40 bg-background hover:border-border transition-all text-sm font-medium rounded-lg">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="rounded-lg border-border/40">
                  <SelectItem value="open" className="rounded-md">Open</SelectItem>
                  <SelectItem value="closing" className="rounded-md">Closing Soon</SelectItem>
                  <SelectItem value="resolved" className="rounded-md">Resolved</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label className="text-xs font-semibold text-foreground/70 uppercase tracking-wide">Timeframe</Label>
              <Select defaultValue="all">
                <SelectTrigger className="h-10 border border-border/40 bg-background hover:border-border transition-all text-sm font-medium rounded-lg">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="rounded-lg border-border/40">
                  <SelectItem value="24h" className="rounded-md">Last 24 hours</SelectItem>
                  <SelectItem value="7d" className="rounded-md">Last 7 days</SelectItem>
                  <SelectItem value="30d" className="rounded-md">Last 30 days</SelectItem>
                  <SelectItem value="all" className="rounded-md">All time</SelectItem>
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
