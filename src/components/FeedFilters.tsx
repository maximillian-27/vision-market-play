import { Search, SlidersHorizontal, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useState } from "react";

const categories = ["All", "Following", "Hot", "Politics", "Sports", "Crypto", "Tech", "Entertainment", "Finance"];

export function FeedFilters() {
  const [showFilters, setShowFilters] = useState(false);

  return (
    <div className="space-y-4">
      {/* Search and Filter Button */}
      <div className="flex gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder="Search markets..." 
            className="pl-9"
          />
        </div>
        <Button 
          variant={showFilters ? "default" : "outline"} 
          size="icon"
          onClick={() => setShowFilters(!showFilters)}
        >
          {showFilters ? <X className="h-4 w-4" /> : <SlidersHorizontal className="h-4 w-4" />}
        </Button>
      </div>

      {/* Filter Panel */}
      {showFilters && (
        <div className="rounded-lg border bg-card p-6 shadow-sm animate-in fade-in-0 slide-in-from-top-2">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Sort By */}
            <div className="space-y-3">
              <Label className="text-sm font-semibold">Sort By</Label>
              <RadioGroup defaultValue="trending" className="space-y-2">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="trending" id="trending" />
                  <Label htmlFor="trending" className="font-normal cursor-pointer text-sm">Trending</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="volume" id="volume" />
                  <Label htmlFor="volume" className="font-normal cursor-pointer text-sm">Highest Volume</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="newest" id="newest" />
                  <Label htmlFor="newest" className="font-normal cursor-pointer text-sm">Newest</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="ending" id="ending" />
                  <Label htmlFor="ending" className="font-normal cursor-pointer text-sm">Ending Soon</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="active" id="active" />
                  <Label htmlFor="active" className="font-normal cursor-pointer text-sm">Most Active</Label>
                </div>
              </RadioGroup>
            </div>

            {/* Region */}
            <div className="space-y-3">
              <Label className="text-sm font-semibold">Region</Label>
              <RadioGroup defaultValue="global" className="space-y-2">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="global" id="global" />
                  <Label htmlFor="global" className="font-normal cursor-pointer text-sm">Global</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="us" id="us" />
                  <Label htmlFor="us" className="font-normal cursor-pointer text-sm">United States</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="europe" id="europe" />
                  <Label htmlFor="europe" className="font-normal cursor-pointer text-sm">Europe</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="asia" id="asia" />
                  <Label htmlFor="asia" className="font-normal cursor-pointer text-sm">Asia</Label>
                </div>
              </RadioGroup>
            </div>

            {/* Status */}
            <div className="space-y-3">
              <Label className="text-sm font-semibold">Status</Label>
              <RadioGroup defaultValue="open" className="space-y-2">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="open" id="open" />
                  <Label htmlFor="open" className="font-normal cursor-pointer text-sm">Open</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="closing" id="closing" />
                  <Label htmlFor="closing" className="font-normal cursor-pointer text-sm">Closing Soon</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="resolved" id="resolved" />
                  <Label htmlFor="resolved" className="font-normal cursor-pointer text-sm">Resolved</Label>
                </div>
              </RadioGroup>
            </div>

            {/* Timeframe */}
            <div className="space-y-3">
              <Label className="text-sm font-semibold">Timeframe</Label>
              <RadioGroup defaultValue="all" className="space-y-2">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="24h" id="24h" />
                  <Label htmlFor="24h" className="font-normal cursor-pointer text-sm">Last 24 hours</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="7d" id="7d" />
                  <Label htmlFor="7d" className="font-normal cursor-pointer text-sm">Last 7 days</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="30d" id="30d" />
                  <Label htmlFor="30d" className="font-normal cursor-pointer text-sm">Last 30 days</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="all" id="all" />
                  <Label htmlFor="all" className="font-normal cursor-pointer text-sm">All time</Label>
                </div>
              </RadioGroup>
            </div>
          </div>
        </div>
      )}

      {/* Category Tags */}
      <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
        {categories.map((category) => (
          <Badge
            key={category}
            variant={category === "All" ? "default" : "outline"}
            className="cursor-pointer whitespace-nowrap transition-all hover:bg-primary hover:text-primary-foreground"
          >
            {category}
          </Badge>
        ))}
      </div>
    </div>
  );
}
