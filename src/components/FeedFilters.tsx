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
        <div className="rounded-lg bg-background/50 border border-border/30 p-3 animate-in fade-in-0 slide-in-from-top-2 duration-200">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5">
            <div className="space-y-1.5">
              <Label className="text-xs font-medium text-muted-foreground">Sort By</Label>
              <Select defaultValue="trending">
                <SelectTrigger className="h-9 border-border/20 bg-background/80 text-sm hover:bg-background transition-colors">
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
              <Label className="text-xs font-medium text-muted-foreground">Region</Label>
              <Select defaultValue="global">
                <SelectTrigger className="h-9 border-border/20 bg-background/80 text-sm hover:bg-background transition-colors">
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
              <Label className="text-xs font-medium text-muted-foreground">Status</Label>
              <Select defaultValue="open">
                <SelectTrigger className="h-9 border-border/20 bg-background/80 text-sm hover:bg-background transition-colors">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="open">Open</SelectItem>
                  <SelectItem value="closing">Closing Soon</SelectItem>
                  <SelectItem value="resolved">Resolved</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-1.5">
              <Label className="text-xs font-medium text-muted-foreground">Timeframe</Label>
              <Select defaultValue="all">
                <SelectTrigger className="h-9 border-border/20 bg-background/80 text-sm hover:bg-background transition-colors">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="24h">Last 24 hours</SelectItem>
                  <SelectItem value="7d">Last 7 days</SelectItem>
                  <SelectItem value="30d">Last 30 days</SelectItem>
                  <SelectItem value="all">All time</SelectItem>
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
        
        <div className="flex gap-1 overflow-x-auto pb-1 scrollbar-hide">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`whitespace-nowrap font-medium px-3.5 py-1.5 text-sm rounded-full transition-all duration-200 ${
                category === selectedCategory 
                  ? "bg-foreground text-background shadow-sm" 
                  : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
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
