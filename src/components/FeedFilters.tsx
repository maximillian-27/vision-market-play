import { useState } from "react";
import { SlidersHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const categories = ["All", "Following", "Hot", "Politics", "Sports", "Crypto", "Tech", "Entertainment", "Finance"];

export interface FilterState {
  category: string;
  sortBy: string;
  region: string;
  status: string;
  timeframe: string;
}

interface FeedFiltersProps {
  filters: FilterState;
  onFiltersChange: (filters: FilterState) => void;
}

export function FeedFilters({ filters, onFiltersChange }: FeedFiltersProps) {
  const [showFilters, setShowFilters] = useState(false);

  const updateFilter = (key: keyof FilterState, value: string) => {
    onFiltersChange({ ...filters, [key]: value });
  };

  return (
    <div className="space-y-3 sticky top-14 z-10 bg-background/95 backdrop-blur-sm py-2">
      {/* Filter Panel */}
      {showFilters && (
        <div className="rounded-xl border border-border/10 bg-background shadow-lg p-5 animate-in fade-in-0 slide-in-from-top-2 duration-200">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="space-y-2.5">
              <Label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Sort By</Label>
              <Select value={filters.sortBy} onValueChange={(v) => updateFilter('sortBy', v)}>
                <SelectTrigger className="h-11 border-none bg-muted/50 hover:bg-muted transition-all text-sm font-medium rounded-lg shadow-sm">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="rounded-xl border-border/10 bg-background shadow-xl p-1">
                  <SelectItem value="trending" className="rounded-lg py-2.5 cursor-pointer">Trending</SelectItem>
                  <SelectItem value="volume" className="rounded-lg py-2.5 cursor-pointer">Highest Volume</SelectItem>
                  <SelectItem value="newest" className="rounded-lg py-2.5 cursor-pointer">Newest</SelectItem>
                  <SelectItem value="ending" className="rounded-lg py-2.5 cursor-pointer">Ending Soon</SelectItem>
                  <SelectItem value="active" className="rounded-lg py-2.5 cursor-pointer">Most Active</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2.5">
              <Label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Region</Label>
              <Select value={filters.region} onValueChange={(v) => updateFilter('region', v)}>
                <SelectTrigger className="h-11 border-none bg-muted/50 hover:bg-muted transition-all text-sm font-medium rounded-lg shadow-sm">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="rounded-xl border-border/10 bg-background shadow-xl p-1">
                  <SelectItem value="global" className="rounded-lg py-2.5 cursor-pointer">Global</SelectItem>
                  <SelectItem value="us" className="rounded-lg py-2.5 cursor-pointer">United States</SelectItem>
                  <SelectItem value="europe" className="rounded-lg py-2.5 cursor-pointer">Europe</SelectItem>
                  <SelectItem value="asia" className="rounded-lg py-2.5 cursor-pointer">Asia</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2.5">
              <Label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Status</Label>
              <Select value={filters.status} onValueChange={(v) => updateFilter('status', v)}>
                <SelectTrigger className="h-11 border-none bg-muted/50 hover:bg-muted transition-all text-sm font-medium rounded-lg shadow-sm">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="rounded-xl border-border/10 bg-background shadow-xl p-1">
                  <SelectItem value="all" className="rounded-lg py-2.5 cursor-pointer">All Markets</SelectItem>
                  <SelectItem value="open" className="rounded-lg py-2.5 cursor-pointer">Open</SelectItem>
                  <SelectItem value="closing" className="rounded-lg py-2.5 cursor-pointer">Closing Soon</SelectItem>
                  <SelectItem value="closed" className="rounded-lg py-2.5 cursor-pointer">Closed (Dispute Period)</SelectItem>
                  <SelectItem value="resolved" className="rounded-lg py-2.5 cursor-pointer">Resolved</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2.5">
              <Label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Timeframe</Label>
              <Select value={filters.timeframe} onValueChange={(v) => updateFilter('timeframe', v)}>
                <SelectTrigger className="h-11 border-none bg-muted/50 hover:bg-muted transition-all text-sm font-medium rounded-lg shadow-sm">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="rounded-xl border-border/10 bg-background shadow-xl p-1">
                  <SelectItem value="24h" className="rounded-lg py-2.5 cursor-pointer">Last 24 hours</SelectItem>
                  <SelectItem value="7d" className="rounded-lg py-2.5 cursor-pointer">Last 7 days</SelectItem>
                  <SelectItem value="30d" className="rounded-lg py-2.5 cursor-pointer">Last 30 days</SelectItem>
                  <SelectItem value="all" className="rounded-lg py-2.5 cursor-pointer">All time</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      )}

      {/* Category Tags with Filter Button */}
      <div className="flex gap-2 items-center">
        {/* Filter Button */}
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
              onClick={() => updateFilter('category', category)}
              className={`whitespace-nowrap font-medium px-4 py-2 text-sm transition-colors border-b-2 ${
                category === filters.category 
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
