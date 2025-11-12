import { Search, SlidersHorizontal } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";

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
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon">
              <SlidersHorizontal className="h-4 w-4" />
            </Button>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>Filter Markets</SheetTitle>
              <SheetDescription>
                Customize your market feed with filters
              </SheetDescription>
            </SheetHeader>
            
            <div className="mt-6 space-y-6">
              <div className="space-y-3">
                <Label className="text-sm font-medium">Sort By</Label>
                <RadioGroup defaultValue="trending">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="trending" id="trending" />
                    <Label htmlFor="trending" className="font-normal cursor-pointer">Trending</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="volume" id="volume" />
                    <Label htmlFor="volume" className="font-normal cursor-pointer">Highest Volume</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="newest" id="newest" />
                    <Label htmlFor="newest" className="font-normal cursor-pointer">Newest</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="ending" id="ending" />
                    <Label htmlFor="ending" className="font-normal cursor-pointer">Ending Soon</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="active" id="active" />
                    <Label htmlFor="active" className="font-normal cursor-pointer">Most Active</Label>
                  </div>
                </RadioGroup>
              </div>

              <Separator />

              <div className="space-y-3">
                <Label className="text-sm font-medium">Region</Label>
                <RadioGroup defaultValue="global">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="global" id="global" />
                    <Label htmlFor="global" className="font-normal cursor-pointer">Global</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="us" id="us" />
                    <Label htmlFor="us" className="font-normal cursor-pointer">United States</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="europe" id="europe" />
                    <Label htmlFor="europe" className="font-normal cursor-pointer">Europe</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="asia" id="asia" />
                    <Label htmlFor="asia" className="font-normal cursor-pointer">Asia</Label>
                  </div>
                </RadioGroup>
              </div>

              <Separator />

              <div className="space-y-3">
                <Label className="text-sm font-medium">Status</Label>
                <RadioGroup defaultValue="open">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="open" id="open" />
                    <Label htmlFor="open" className="font-normal cursor-pointer">Open</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="closing" id="closing" />
                    <Label htmlFor="closing" className="font-normal cursor-pointer">Closing Soon</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="resolved" id="resolved" />
                    <Label htmlFor="resolved" className="font-normal cursor-pointer">Resolved</Label>
                  </div>
                </RadioGroup>
              </div>

              <Separator />

              <div className="space-y-3">
                <Label className="text-sm font-medium">Timeframe</Label>
                <RadioGroup defaultValue="all">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="24h" id="24h" />
                    <Label htmlFor="24h" className="font-normal cursor-pointer">Last 24 hours</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="7d" id="7d" />
                    <Label htmlFor="7d" className="font-normal cursor-pointer">Last 7 days</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="30d" id="30d" />
                    <Label htmlFor="30d" className="font-normal cursor-pointer">Last 30 days</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="all" id="all" />
                    <Label htmlFor="all" className="font-normal cursor-pointer">All time</Label>
                  </div>
                </RadioGroup>
              </div>
            </div>
          </SheetContent>
        </Sheet>
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
