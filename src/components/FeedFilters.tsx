import { useState } from "react";
import { SlidersHorizontal, X, Search, Bookmark } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";

const categories = ["All", "My Markets", "Hot", "Closing Soon", "Politics", "Sports", "Crypto", "Tech", "Entertainment", "Finance"];

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

  const hasActiveFilters = filters.sortBy !== "trending" || filters.status !== "all" || filters.timeframe !== "all";

  return (
    <div className="space-y-2 sm:space-y-3 sticky top-14 z-10 bg-background/95 backdrop-blur-xl border-b border-border py-2 sm:py-3 -mx-4 px-4 sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
      {/* Mobile: Search bar + icons */}
      <div className="flex sm:hidden items-center gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder="Search markets..."
            className="h-9 pl-9 pr-3 text-sm rounded-full bg-secondary/50 border-border"
          />
        </div>
        <Button 
          variant={showFilters ? "default" : "outline"} 
          size="icon"
          className="h-9 w-9 flex-shrink-0 rounded-full"
          onClick={() => setShowFilters(!showFilters)}
        >
          <SlidersHorizontal className="h-4 w-4" />
          {hasActiveFilters && (
            <span className="absolute top-1 right-1 h-1.5 w-1.5 rounded-full bg-primary" />
          )}
        </Button>
        <Button variant="outline" size="icon" className="h-9 w-9 flex-shrink-0 rounded-full">
          <Bookmark className="h-4 w-4" />
        </Button>
      </div>

      {/* Mobile: Category pills row */}
      <div className="flex sm:hidden gap-1.5 overflow-x-auto pb-0.5 scrollbar-hide -mx-4 px-4">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => updateFilter('category', category)}
            className={`whitespace-nowrap font-medium px-3.5 py-1.5 text-[13px] rounded-full transition-all ${
              category === filters.category 
                ? "bg-primary text-primary-foreground" 
                : "text-muted-foreground hover:text-foreground hover:bg-secondary"
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Desktop: Pills left, Filters+Saved right */}
      <div className="hidden sm:flex items-center justify-between gap-3">
        <div className="flex gap-1 overflow-x-auto pb-0.5 scrollbar-hide">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => updateFilter('category', category)}
              className={`whitespace-nowrap font-medium px-3 py-1.5 text-sm rounded-full transition-all ${
                category === filters.category 
                  ? "bg-primary text-primary-foreground" 
                  : "text-muted-foreground hover:text-foreground hover:bg-secondary"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-1.5 flex-shrink-0">
          <Button 
            variant={showFilters ? "default" : "outline"} 
            size="sm"
            className="h-8 px-3 gap-1.5 font-medium"
            onClick={() => setShowFilters(!showFilters)}
          >
            <SlidersHorizontal className="h-3.5 w-3.5" />
            <span>Filters</span>
            {hasActiveFilters && (
              <span className="h-1.5 w-1.5 rounded-full bg-primary-foreground ml-0.5" />
            )}
          </Button>
          <Button variant="outline" size="icon" className="h-8 w-8">
            <Bookmark className="h-3.5 w-3.5" />
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
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <div className="space-y-1.5">
              <Label className="text-xs text-muted-foreground font-medium">Sort By</Label>
              <Select value={filters.sortBy} onValueChange={(v) => updateFilter('sortBy', v)}>
                <SelectTrigger className="h-9 text-sm rounded-lg">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="trending">Trending</SelectItem>
                  <SelectItem value="volume">Biggest Pots</SelectItem>
                  <SelectItem value="newest">Newest</SelectItem>
                  <SelectItem value="ending">Closing Soon</SelectItem>
                  <SelectItem value="active">Most Active</SelectItem>
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
              onClick={() => onFiltersChange({ ...filters, sortBy: "trending", status: "all", timeframe: "all" })}
            >
              Clear all filters
            </Button>
          )}
        </div>
      )}
    </div>
  );
}
