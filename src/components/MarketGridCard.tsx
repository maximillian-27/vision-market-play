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
      case "success": return "bg-success/15 text-success border-success/50 hover:bg-success/25 hover:border-success";
      case "destructive": return "bg-destructive/15 text-destructive border-destructive/50 hover:bg-destructive/25 hover:border-destructive";
      default: return "bg-primary/15 text-primary border-primary/50 hover:bg-primary/25 hover:border-primary";
    }
  };

  const visibleOutcomes = displayOutcomes.slice(0, 4);
  const remainingCount = displayOutcomes.length - 4;

  return (
    <Card 
      className="group overflow-hidden transition-all hover:shadow-lg md:hover:scale-[1.02] cursor-pointer border-border/40 animate-fade-in"
    >
      <CardContent className="p-0">
        {/* Mobile: Horizontal layout, Desktop: Vertical */}
        <div className="md:flex-col flex">
          {/* Market Image */}
          <div 
            className="relative md:aspect-square aspect-[4/3] md:w-full w-[35%] overflow-hidden bg-muted/50 flex-shrink-0"
            onClick={() => navigate(`/market/${id}`)}
          >
            <img 
              src={image} 
              alt={title}
              className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
            
            {/* Creator info - desktop only */}
            <div 
              className="hidden md:flex absolute top-2 left-2 items-center gap-1.5 bg-black/60 backdrop-blur-sm rounded-full px-2 py-1 hover:bg-black/70 transition-colors z-10"
              onClick={(e) => {
                e.stopPropagation();
                const profilePath = creator.isCreator !== false 
                  ? `/creator/${creator.id || creator.name.toLowerCase().replace(/\s+/g, '-')}`
                  : `/profile/${creator.id || creator.name.toLowerCase().replace(/\s+/g, '-')}`;
                navigate(profilePath);
              }}
            >
              <Avatar className="h-5 w-5 border border-white/20">
                <AvatarImage src={creator.avatar} alt={creator.name} />
                <AvatarFallback className="text-xs">{creator.name.slice(0, 2).toUpperCase()}</AvatarFallback>
              </Avatar>
              <span className="text-white text-xs font-medium">{creator.name}</span>
              {creator.isCreator !== false && (
                <BadgeCheck className="h-3 w-3 text-white fill-white/30 flex-shrink-0" />
              )}
            </div>
          </div>

          {/* Content - beside image on mobile, below on desktop */}
          <div className="p-2.5 md:p-3 space-y-2 flex-1 flex flex-col">
            {/* Creator info - mobile only */}
            <div 
              className="flex md:hidden items-center gap-1.5 pb-1.5 border-b border-border/40"
              onClick={(e) => {
                e.stopPropagation();
                const profilePath = creator.isCreator !== false 
                  ? `/creator/${creator.id || creator.name.toLowerCase().replace(/\s+/g, '-')}`
                  : `/profile/${creator.id || creator.name.toLowerCase().replace(/\s+/g, '-')}`;
                navigate(profilePath);
              }}
            >
              <Avatar className="h-6 w-6">
                <AvatarImage src={creator.avatar} alt={creator.name} />
                <AvatarFallback className="text-xs">{creator.name.slice(0, 2).toUpperCase()}</AvatarFallback>
              </Avatar>
              <span className="text-xs font-medium flex-1 truncate">{creator.name}</span>
              {creator.isCreator !== false && (
                <BadgeCheck className="h-3.5 w-3.5 text-primary fill-primary/20 flex-shrink-0" />
              )}
            </div>

            {/* Title */}
            <h3 
              className="text-[13px] md:text-sm font-semibold leading-tight line-clamp-2 md:min-h-[2.5rem] group-hover:text-primary transition-colors cursor-pointer flex-1"
              onClick={() => navigate(`/market/${id}`)}
            >
              {title}
            </h3>

            {/* Outcomes - Clickable buttons */}
            <div className="space-y-1.5">
              <div className="grid grid-cols-2 gap-2">
                {visibleOutcomes.map((outcome, index) => (
                  <button 
                    key={index}
                    className={`text-center rounded-lg px-2 md:px-3 py-2 md:py-2.5 border-2 transition-all duration-200 font-medium shadow-sm hover:shadow-md active:scale-95 ${getOutcomeColor(outcome.color)}`}
                    onClick={(e) => {
                      e.stopPropagation();
                      // Handle bet action
                    }}
                  >
                    <div className="text-base md:text-lg font-bold leading-none mb-1">{outcome.price}¢</div>
                    <div className="text-[10px] md:text-xs font-medium opacity-80 truncate leading-tight">{outcome.label}</div>
                  </button>
                ))}
              </div>
              {remainingCount > 0 && (
                <button 
                  className="w-full text-center text-xs font-medium text-muted-foreground hover:text-foreground transition-colors py-1.5 rounded-md hover:bg-muted/50"
                  onClick={() => navigate(`/market/${id}`)}
                >
                  +{remainingCount} more option{remainingCount > 1 ? 's' : ''}
                </button>
              )}
            </div>
            
            {/* Stats */}
            <div className="flex items-center justify-between text-[10px] md:text-xs text-muted-foreground pt-1 border-t border-border/40">
              <div className="flex items-center gap-1">
                <TrendingUp className="h-3 w-3 flex-shrink-0" />
                <span className="truncate">{volume}</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="h-3 w-3 flex-shrink-0" />
                <span className="truncate">{endsIn}</span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
