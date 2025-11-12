import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Clock, TrendingUp, Heart, MessageCircle, Share2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface Outcome {
  label: string;
  price: number;
  color?: string;
}

interface MarketCardProps {
  id: string;
  creator: {
    name: string;
    avatar: string;
  };
  title: string;
  subtitle?: string;
  image: string;
  outcomes?: Outcome[];
  yesPrice?: number;
  noPrice?: number;
  volume: string;
  endsIn: string;
  likes?: number;
  comments?: number;
}

export function MarketCard({ id, creator, title, subtitle, image, outcomes, yesPrice, noPrice, volume, endsIn, likes = 0, comments = 0 }: MarketCardProps) {
  const navigate = useNavigate();
  
  // Use outcomes if provided, otherwise fallback to binary yes/no
  const displayOutcomes = outcomes || [
    { label: "Yes", price: yesPrice || 0, color: "success" },
    { label: "No", price: noPrice || 0, color: "destructive" }
  ];

  const getOutcomeColor = (color?: string) => {
    switch (color) {
      case "success": return "border-success text-success hover:bg-success hover:text-success-foreground";
      case "destructive": return "border-destructive text-destructive hover:bg-destructive hover:text-destructive-foreground";
      default: return "border-primary text-primary hover:bg-primary hover:text-primary-foreground";
    }
  };

  return (
    <Card 
      className="overflow-hidden transition-all hover:shadow-md md:rounded-lg rounded-none border-x-0 md:border-x border-t-0 md:border-t first:border-t cursor-pointer"
      onClick={() => navigate(`/market/${id}`)}
    >
      <CardContent className="p-0">
        {/* Creator Info */}
        <div className="flex items-center gap-3 p-3 md:p-4 pb-2 md:pb-3">
          <Avatar className="h-10 w-10">
            <AvatarImage src={creator.avatar} alt={creator.name} />
            <AvatarFallback>{creator.name.slice(0, 2).toUpperCase()}</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <p className="font-semibold text-sm">{creator.name}</p>
          </div>
        </div>

        {/* Title */}
        <div className="px-3 md:px-4 pb-2 md:pb-3">
          <h3 className="text-base md:text-lg font-semibold leading-tight">{title}</h3>
          {subtitle && (
            <p className="text-sm text-muted-foreground mt-1">{subtitle}</p>
          )}
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
        <div className="p-3 md:p-4 space-y-3">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <TrendingUp className="h-4 w-4" />
            <span>{volume} volume</span>
            <span className="ml-auto flex items-center gap-1">
              <Clock className="h-4 w-4" />
              {endsIn}
            </span>
          </div>

          {/* Outcome Buttons */}
          <div className={`grid gap-2 ${displayOutcomes.length === 2 ? 'grid-cols-2' : displayOutcomes.length === 3 ? 'grid-cols-3' : 'grid-cols-2'}`}>
            {displayOutcomes.map((outcome, index) => (
              <Button 
                key={index}
                variant="outline" 
                className={`flex-1 transition-all ${getOutcomeColor(outcome.color)}`}
                onClick={(e) => {
                  e.stopPropagation();
                  // Handle bet action here
                }}
              >
                <div className="flex flex-col items-center w-full">
                  <span className="font-semibold text-xs md:text-sm">{outcome.label}</span>
                  <span className="text-xs">{outcome.price}¢</span>
                </div>
              </Button>
            ))}
          </div>

          {/* Engagement Indicators */}
          <div className="flex items-center gap-4 pt-2 border-t text-muted-foreground text-sm">
            <button 
              className="flex items-center gap-1.5 hover:text-destructive transition-colors"
              onClick={(e) => e.stopPropagation()}
            >
              <Heart className="h-4 w-4" />
              {likes > 0 && <span>{likes}</span>}
            </button>
            <button 
              className="flex items-center gap-1.5 hover:text-primary transition-colors"
              onClick={(e) => e.stopPropagation()}
            >
              <MessageCircle className="h-4 w-4" />
              {comments > 0 && <span>{comments}</span>}
            </button>
            <button 
              className="flex items-center gap-1.5 hover:text-primary transition-colors ml-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <Share2 className="h-4 w-4" />
            </button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
