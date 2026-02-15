import { useState } from "react";
import { SlidersHorizontal, X, Bookmark, Flame } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const categories = [
  { label: "All", icon: null },
  { label: "Following", icon: null },
  { label: "Hot", icon: Flame },
  { label: "Politics", icon: null },
  { label: "Sports", icon: null },
  { label: "Crypto", icon: null },
  { label: "Climate", icon: null },
  { label: "Economics", icon: null },
  { label: "Mentions", icon: null },
  { label: "Companies", icon: null },
  { label: "Financials", icon: null },
  { label: "Tech & Science", icon: null },
];

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

  const hasActiveFilters = filters.sortBy !== "trending" || filters.region !== "global" || filters.status !== "all" || filters.timeframe !== "all";

  return (
    <div className="space-y-3 sticky top-14 z-10 bg-background/95 backdrop-blur-xl border-b border-border py-3 -mx-4 px-4 sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8 mt-3 sm:mt-0">
      {/* Category Tabs row */}
      <div className="flex items-center gap-2">
        {/* Category pills */}
        <div className="flex gap-1 overflow-x-auto pb-0.5 scrollbar-hide flex-1">
          {categories.map(({ label, icon: Icon }) => (
            <button
              key={label}
              onClick={() => updateFilter('category', label === "Hot" ? "Hot" : label)}
              className={`whitespace-nowrap font-medium px-3.5 py-1.5 text-sm rounded-full transition-all flex items-center gap-1.5 ${
                label === filters.category 
                  ? "bg-primary text-primary-foreground" 
                  : "text-muted-foreground hover:text-foreground hover:bg-secondary"
              }`}
            >
              {Icon && <Icon className="h-3.5 w-3.5 text-orange-500 fill-orange-500" />}
              {label}
            </button>
          ))}
        </div>

        {/* Right-side buttons - desktop only */}
        <div className="hidden sm:flex items-center gap-2 flex-shrink-0">
          <Button
            variant={showFilters ? "default" : "outline"}
            size="sm"
            className="h-8 px-3.5 gap-1.5 font-medium rounded-full"
            onClick={() => setShowFilters(!showFilters)}
          >
            <SlidersHorizontal className="h-3.5 w-3.5" />
            Filters
            {hasActiveFilters && (
              <span className="h-1.5 w-1.5 rounded-full bg-primary-foreground ml-0.5" />
            )}
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="h-8 px-3.5 gap-1.5 font-medium rounded-full"
          >
            <Bookmark className="h-3.5 w-3.5" />
            Saved
          </Button>
        </div>
      </div>

      {/* Expanded Filter Panel */}
      {showFilters && (
        <div className="rounded-xl border border-border bg-card p-4 animate-in fade-in-0 slide-in-from-top-2 duration-200 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm font-semibold">Filter Markets</span>
            <Button variant="ghost" size="icon" className="h-7 w-7 -mr-1" onClick={() => setShowFilters(false)}>
              <X className="h-4 w-4" />
            </Button>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="space-y-1.5">
              <Label className="text-xs text-muted-foreground font-medium">Sort By</Label>
              <Select value={filters.sortBy} onValueChange={(v) => updateFilter('sortBy', v)}>
                <SelectTrigger className="h-9 text-sm rounded-lg">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="trending">Trending</SelectItem>
                  <SelectItem value="volume">Highest Volume</SelectItem>
                  <SelectItem value="newest">Newest</SelectItem>
                  <SelectItem value="ending">Ending Soon</SelectItem>
                  <SelectItem value="active">Most Active</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-1.5">
              <Label className="text-xs text-muted-foreground font-medium">Region</Label>
              <Select value={filters.region} onValueChange={(v) => updateFilter('region', v)}>
                <SelectTrigger className="h-9 text-sm rounded-lg">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="global">Global</SelectItem>
                  <SelectItem value="us">United States</SelectItem>
                  <SelectItem value="europe">Europe</SelectItem>
                  <SelectItem value="asia">Asia</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-1.5">
              <Label className="text-xs text-muted-foreground font-medium">Status</Label>
              <Select value={filters.status} onValueChange={(v) => updateFilter('status', v)}>
                <SelectTrigger className="h-9 text-sm rounded-lg">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Markets</SelectItem>
                  <SelectItem value="open">Open</SelectItem>
                  <SelectItem value="closing">Closing Soon</SelectItem>
                  <SelectItem value="closed">Dispute Period</SelectItem>
                  <SelectItem value="resolved">Resolved</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-1.5">
              <Label className="text-xs text-muted-foreground font-medium">Timeframe</Label>
              <Select value={filters.timeframe} onValueChange={(v) => updateFilter('timeframe', v)}>
                <SelectTrigger className="h-9 text-sm rounded-lg">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="24h">Last 24h</SelectItem>
                  <SelectItem value="7d">Last 7 days</SelectItem>
                  <SelectItem value="30d">Last 30 days</SelectItem>
                  <SelectItem value="all">All time</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          {hasActiveFilters && (
            <Button 
              variant="ghost" 
              size="sm" 
              className="mt-4 text-xs text-muted-foreground hover:text-foreground"
              onClick={() => onFiltersChange({ ...filters, sortBy: "trending", region: "global", status: "all", timeframe: "all" })}
            >
              Clear all filters
            </Button>
          )}
        </div>
      )}
    </div>
  );
}
