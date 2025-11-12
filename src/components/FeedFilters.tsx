import { Search, SlidersHorizontal, Check } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const categories = ["All", "Following", "Hot", "Politics", "Sports", "Crypto", "Tech", "Entertainment", "Finance"];

export function FeedFilters() {
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
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="icon">
              <SlidersHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>Sort By</DropdownMenuLabel>
            <DropdownMenuItem>
              <Check className="mr-2 h-4 w-4 opacity-0" />
              Trending
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Check className="mr-2 h-4 w-4 opacity-0" />
              Highest Volume
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Check className="mr-2 h-4 w-4 opacity-0" />
              Newest
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Check className="mr-2 h-4 w-4 opacity-0" />
              Ending Soon
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Check className="mr-2 h-4 w-4 opacity-0" />
              Most Active
            </DropdownMenuItem>
            
            <DropdownMenuSeparator />
            
            <DropdownMenuLabel>Region</DropdownMenuLabel>
            <DropdownMenuItem>
              <Check className="mr-2 h-4 w-4 opacity-0" />
              Global
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Check className="mr-2 h-4 w-4 opacity-0" />
              United States
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Check className="mr-2 h-4 w-4 opacity-0" />
              Europe
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Check className="mr-2 h-4 w-4 opacity-0" />
              Asia
            </DropdownMenuItem>
            
            <DropdownMenuSeparator />
            
            <DropdownMenuLabel>Status</DropdownMenuLabel>
            <DropdownMenuItem>
              <Check className="mr-2 h-4 w-4 opacity-0" />
              Open
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Check className="mr-2 h-4 w-4 opacity-0" />
              Closing Soon
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Check className="mr-2 h-4 w-4 opacity-0" />
              Resolved
            </DropdownMenuItem>
            
            <DropdownMenuSeparator />
            
            <DropdownMenuLabel>Timeframe</DropdownMenuLabel>
            <DropdownMenuItem>
              <Check className="mr-2 h-4 w-4 opacity-0" />
              Last 24 hours
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Check className="mr-2 h-4 w-4 opacity-0" />
              Last 7 days
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Check className="mr-2 h-4 w-4 opacity-0" />
              Last 30 days
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Check className="mr-2 h-4 w-4 opacity-0" />
              All time
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

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
