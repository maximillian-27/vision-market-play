import { Card, CardContent } from "@/components/ui/card";
import { Clock, TrendingUp, BadgeCheck, Check, X } from "lucide-react";
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
      case "success": return "bg-success/10 border-success/20 hover:bg-success/15";
      case "destructive": return "bg-muted/30 border-border/30 hover:bg-muted/40";
      default: return "bg-primary/10 border-primary/20 hover:bg-primary/15";
    }
  };

  const getOutcomeIcon = (color?: string) => {
    switch (color) {
      case "success": return <Check className="h-3 w-3 sm:h-3.5 sm:w-3.5" />;
      case "destructive": return <X className="h-3 w-3 sm:h-3.5 sm:w-3.5" />;
      default: return <Check className="h-3 w-3 sm:h-3.5 sm:w-3.5" />;
    }
  };

  const getIconBgColor = (color?: string) => {
    switch (color) {
      case "success": return "bg-success text-success-foreground";
      case "destructive": return "bg-destructive text-destructive-foreground";
      default: return "bg-primary text-primary-foreground";
    }
  };

  const hasMultipleOutcomes = displayOutcomes.length > 2;

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

            {/* Outcomes - Scrollable for multi-outcome polls */}
            <div className={`space-y-1 ${hasMultipleOutcomes ? 'max-h-[120px] sm:max-h-[140px] overflow-y-auto scrollbar-thin scrollbar-thumb-border scrollbar-track-transparent hover:scrollbar-thumb-border/60 pr-1' : ''}`}>
              {displayOutcomes.map((outcome, index) => {
                const payout = outcome.price > 0 ? (10000 / outcome.price).toFixed(0) : 0;
                return (
                  <button 
                    key={index}
                    className={`w-full text-left rounded-lg px-2 sm:px-2.5 py-1.5 sm:py-2 border transition-all ${getOutcomeColor(outcome.color)} flex items-center gap-1.5 sm:gap-2`}
                    onClick={(e) => {
                      e.stopPropagation();
                      // Handle bet action
                    }}
                  >
                    <div className={`rounded-full p-1 flex-shrink-0 ${getIconBgColor(outcome.color)}`}>
                      {getOutcomeIcon(outcome.color)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-[10px] sm:text-xs font-bold text-foreground">{outcome.label}</div>
                      <div className="text-[8px] sm:text-[9px] text-muted-foreground font-medium">
                        $100 → ${payout}
                      </div>
                    </div>
                    <span className="text-sm sm:text-base font-bold text-foreground ml-auto">{outcome.price}¢</span>
                  </button>
                );
              })}
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
