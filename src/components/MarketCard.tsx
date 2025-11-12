import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Clock, TrendingUp } from "lucide-react";

interface MarketCardProps {
  creator: {
    name: string;
    avatar: string;
  };
  title: string;
  image: string;
  yesPrice: number;
  noPrice: number;
  volume: string;
  endsIn: string;
}

export function MarketCard({ creator, title, image, yesPrice, noPrice, volume, endsIn }: MarketCardProps) {
  return (
    <Card className="overflow-hidden transition-all hover:shadow-md">
      <CardContent className="p-0">
        {/* Creator Info */}
        <div className="flex items-center gap-3 p-4 pb-3">
          <Avatar className="h-10 w-10">
            <AvatarImage src={creator.avatar} alt={creator.name} />
            <AvatarFallback>{creator.name.slice(0, 2).toUpperCase()}</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <p className="font-semibold text-sm">{creator.name}</p>
          </div>
        </div>

        {/* Title */}
        <div className="px-4 pb-3">
          <h3 className="text-lg font-semibold leading-tight">{title}</h3>
        </div>

        {/* Market Image */}
        <div className="relative aspect-video w-full overflow-hidden bg-muted">
          <img 
            src={image} 
            alt={title}
            className="h-full w-full object-cover"
          />
        </div>

        {/* Market Stats */}
        <div className="p-4 space-y-3">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <TrendingUp className="h-4 w-4" />
            <span>{volume} volume</span>
            <span className="ml-auto flex items-center gap-1">
              <Clock className="h-4 w-4" />
              {endsIn}
            </span>
          </div>

          {/* Yes/No Buttons */}
          <div className="grid grid-cols-2 gap-2">
            <Button 
              variant="outline" 
              className="flex-1 border-success text-success hover:bg-success hover:text-success-foreground transition-all"
            >
              <div className="flex flex-col items-center w-full">
                <span className="font-semibold">Yes</span>
                <span className="text-xs">{yesPrice}¢</span>
              </div>
            </Button>
            <Button 
              variant="outline"
              className="flex-1 border-destructive text-destructive hover:bg-destructive hover:text-destructive-foreground transition-all"
            >
              <div className="flex flex-col items-center w-full">
                <span className="font-semibold">No</span>
                <span className="text-xs">{noPrice}¢</span>
              </div>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
