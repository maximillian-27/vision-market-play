import { useState } from "react";
import { SlidersHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";

const categories = ["All", "My Markets", "Hot", "Closing Soon", "Politics", "Sports", "Crypto", "Tech", "Entertainment", "Finance"];

const sortOptions = [
  { value: "trending", label: "Trending" },
  { value: "volume", label: "Biggest Pots" },
  { value: "newest", label: "Newest" },
  { value: "ending", label: "Closing Soon" },
  { value: "active", label: "Most Active" },
];

const statusOptions = [
  { value: "all", label: "All" },
  { value: "open", label: "Open" },
  { value: "closing", label: "Closing Soon" },
  { value: "resolved", label: "Resolved" },
];

const timeframeOptions = [
  { value: "24h", label: "24h" },
  { value: "7d", label: "7 Days" },
  { value: "30d", label: "30 Days" },
  { value: "all", label: "All Time" },
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

function FilterRow({ label, options, value, onChange }: { label: string; options: { value: string; label: string }[]; value: string; onChange: (v: string) => void }) {
  return (
    <div className="flex items-center gap-2">
      <span className="text-[10px] font-medium text-muted-foreground uppercase tracking-wider w-10 shrink-0">{label}</span>
      <div className="flex gap-1 overflow-x-auto scrollbar-hide">
        {options.map((opt) => (
          <button
            key={opt.value}
            onClick={() => onChange(opt.value)}
            className={`whitespace-nowrap px-2.5 py-0.5 text-xs rounded-full transition-all font-medium ${
              value === opt.value
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:text-foreground hover:bg-secondary"
            }`}
          >
            {opt.label}
          </button>
        ))}
      </div>
    </div>
  );
}

export function FeedFilters({ filters, onFiltersChange }: FeedFiltersProps) {
  const [showFilters, setShowFilters] = useState(false);

  const updateFilter = (key: keyof FilterState, value: string) => {
    onFiltersChange({ ...filters, [key]: value });
  };

  const hasActiveFilters = filters.sortBy !== "trending" || filters.status !== "all" || filters.timeframe !== "all";

  return (
    <div className="space-y-1 sm:space-y-1.5 sticky top-14 z-20 bg-background py-1 sm:py-1.5 -mx-4 px-4 sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
      {/* Mobile: Category pills + filter button in one row */}
      <div className="flex sm:hidden gap-1 items-center overflow-x-auto pb-0.5 scrollbar-hide -mx-4 px-4">
        <button
          onClick={() => setShowFilters(!showFilters)}
          className={`whitespace-nowrap font-medium px-2.5 py-1 text-xs rounded-full transition-all flex items-center gap-1 shrink-0 ${
            showFilters || hasActiveFilters
              ? "bg-primary text-primary-foreground"
              : "text-muted-foreground hover:text-foreground hover:bg-secondary"
          }`}
        >
          <SlidersHorizontal className="h-3 w-3" />
          {hasActiveFilters && <span className="h-1.5 w-1.5 rounded-full bg-primary-foreground" />}
        </button>
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => updateFilter('category', category)}
            className={`whitespace-nowrap font-medium px-3 py-1 text-xs rounded-full transition-all ${
              category === filters.category 
                ? "bg-primary text-primary-foreground" 
                : "text-muted-foreground hover:text-foreground hover:bg-secondary"
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Desktop: Original layout */}
      <div className="hidden sm:flex gap-2 items-center">
        <Button 
          variant={showFilters ? "default" : "outline"} 
          size="sm"
          className="h-7 px-2.5 flex-shrink-0 gap-1 font-medium text-xs"
          onClick={() => setShowFilters(!showFilters)}
        >
          <SlidersHorizontal className="h-3 w-3" />
          <span>Filters</span>
          {hasActiveFilters && (
            <span className="h-1.5 w-1.5 rounded-full bg-primary-foreground ml-0.5" />
          )}
        </Button>

        <div className="flex gap-1 overflow-x-auto pb-0.5 scrollbar-hide">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => updateFilter('category', category)}
              className={`whitespace-nowrap font-medium px-2.5 py-1 text-xs rounded-full transition-all ${
                category === filters.category 
                  ? "bg-primary text-primary-foreground" 
                  : "text-muted-foreground hover:text-foreground hover:bg-secondary"
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Expanded Filter Panel — pill-based */}
      {showFilters && (
        <div className="space-y-1.5 pt-1.5 border-t border-border/50 animate-in fade-in-0 slide-in-from-top-1 duration-200">
          <FilterRow label="Sort" options={sortOptions} value={filters.sortBy} onChange={(v) => updateFilter('sortBy', v)} />
          <FilterRow label="Status" options={statusOptions} value={filters.status} onChange={(v) => updateFilter('status', v)} />
          <FilterRow label="Time" options={timeframeOptions} value={filters.timeframe} onChange={(v) => updateFilter('timeframe', v)} />
          {hasActiveFilters && (
            <button
              className="text-[10px] text-muted-foreground hover:text-foreground ml-12 transition-colors"
              onClick={() => onFiltersChange({ ...filters, sortBy: "trending", status: "all", timeframe: "all" })}
            >
              Reset filters
            </button>
          )}
        </div>
      )}
    </div>
  );
}
