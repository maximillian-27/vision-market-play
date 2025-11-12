import { Card, CardContent } from "@/components/ui/card";
import { Clock, TrendingUp, BadgeCheck } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface Outcome {
  label: string;
  price: number;
  color?: string;
}

interface MarketGridCardProps {
  id: string;
  creator: {
    name: string;
    avatar: string;
    id?: string;
    isCreator?: boolean;
  };
  title: string;
  image: string;
  outcomes?: Outcome[];
  yesPrice?: number;
  noPrice?: number;
  volume: string;
  endsIn: string;
}

export function MarketGridCard({ 
  id, 
  creator,
  title, 
  image, 
  outcomes, 
  yesPrice, 
  noPrice, 
  volume, 
  endsIn 
}: MarketGridCardProps) {
  const navigate = useNavigate();
  
  // Use outcomes if provided, otherwise fallback to binary yes/no
  const displayOutcomes = outcomes || [
    { label: "Yes", price: yesPrice || 0, color: "success" },
    { label: "No", price: noPrice || 0, color: "destructive" }
  ];

  const getOutcomeColor = (color?: string) => {
    switch (color) {
      case "success": return "bg-background border-border/60 hover:border-success/60 hover:bg-success/5 text-foreground";
      case "destructive": return "bg-background border-border/60 hover:border-destructive/60 hover:bg-destructive/5 text-foreground";
      default: return "bg-background border-border/60 hover:border-primary/60 hover:bg-primary/5 text-foreground";
    }
  };

  const visibleOutcomes = displayOutcomes.slice(0, 2);
  const remainingCount = displayOutcomes.length - 2;

  return (
    <Card 
      className="group overflow-hidden transition-all hover:shadow-md cursor-pointer border-border/50 animate-fade-in bg-card"
    >
      <CardContent className="p-0">
        {/* Mobile: Horizontal compact, Desktop: Vertical */}
        <div className="flex sm:flex-col">
          {/* Market Image */}
          <div 
            className="relative aspect-square sm:aspect-video w-24 sm:w-full overflow-hidden bg-muted/50 flex-shrink-0"
            onClick={() => navigate(`/market/${id}`)}
          >
            <img 
              src={image} 
              alt={title}
              className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
            
            {/* Creator info - desktop only */}
            <div 
              className="hidden sm:flex absolute top-2 left-2 items-center gap-1.5 bg-black/60 backdrop-blur-sm rounded-full px-2 py-1 hover:bg-black/70 transition-colors z-10"
              onClick={(e) => {
                e.stopPropagation();
                const profilePath = creator.isCreator !== false 
                  ? `/creator/${creator.id || creator.name.toLowerCase().replace(/\s+/g, '-')}`
                  : `/profile/${creator.id || creator.name.toLowerCase().replace(/\s+/g, '-')}`;
                navigate(profilePath);
              }}
            >
              <Avatar className="h-4 w-4 border border-white/20">
                <AvatarImage src={creator.avatar} alt={creator.name} />
                <AvatarFallback className="text-[8px]">{creator.name.slice(0, 2).toUpperCase()}</AvatarFallback>
              </Avatar>
              <span className="text-white text-[10px] font-medium">{creator.name}</span>
              {creator.isCreator !== false && (
                <BadgeCheck className="h-2.5 w-2.5 text-white fill-white/30 flex-shrink-0" />
              )}
            </div>
          </div>

          {/* Content */}
          <div className="p-2 sm:p-2 space-y-1.5 sm:space-y-2 flex-1 flex flex-col">
            {/* Title */}
            <h3 
              className="text-[11px] sm:text-xs font-semibold leading-tight line-clamp-2 min-h-[1.8rem] sm:min-h-[2rem] group-hover:text-primary transition-colors cursor-pointer"
              onClick={() => navigate(`/market/${id}`)}
            >
              {title}
            </h3>

            {/* Outcomes - Stacked vertically */}
            <div className="space-y-1">
              {visibleOutcomes.map((outcome, index) => {
                const payout = outcome.price > 0 ? (10000 / outcome.price).toFixed(0) : 0;
                return (
                  <button 
                    key={index}
                    className={`w-full text-left rounded-md px-1.5 sm:px-2 py-1 sm:py-1.5 border transition-all ${getOutcomeColor(outcome.color)} relative flex items-center justify-between`}
                    onClick={(e) => {
                      e.stopPropagation();
                      // Handle bet action
                    }}
                  >
                    <span className="text-[9px] sm:text-[10px] font-medium text-muted-foreground truncate flex-1">{outcome.label}</span>
                    <span className="absolute left-1/2 -translate-x-1/2 text-[8px] sm:text-[9px] text-muted-foreground/30 font-medium pointer-events-none">
                      100$...{payout}$
                    </span>
                    <span className="text-xs sm:text-sm font-bold text-foreground ml-2">{outcome.price}%</span>
                  </button>
                );
              })}
              {remainingCount > 0 && (
                <div 
                  className="w-full text-center text-[8px] sm:text-[9px] text-muted-foreground/60 py-0.5 sm:py-1 cursor-pointer hover:text-muted-foreground transition-colors"
                  onClick={() => navigate(`/market/${id}`)}
                >
                  ⋯ {remainingCount} more
                </div>
              )}
            </div>
            
            {/* Stats */}
            <div className="flex items-center justify-between text-[8px] sm:text-[9px] text-muted-foreground pt-1 border-t border-border/40">
              <div className="flex items-center gap-0.5 sm:gap-1">
                <TrendingUp className="h-2 sm:h-2.5 w-2 sm:w-2.5 flex-shrink-0" />
                <span className="truncate">{volume}</span>
              </div>
              <div className="flex items-center gap-0.5 sm:gap-1">
                <Clock className="h-2 sm:h-2.5 w-2 sm:w-2.5 flex-shrink-0" />
                <span className="truncate">{endsIn}</span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
