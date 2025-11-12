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
      case "success": return "bg-success/20 text-success border-success/30";
      case "destructive": return "bg-destructive/20 text-destructive border-destructive/30";
      default: return "bg-primary/20 text-primary border-primary/30";
    }
  };

  return (
    <Card 
      className="group overflow-hidden transition-all hover:shadow-lg hover:scale-[1.02] cursor-pointer border-border/40 animate-fade-in"
      onClick={() => navigate(`/market/${id}`)}
    >
      <CardContent className="p-0">
        {/* Market Image */}
        <div className="relative aspect-square w-full overflow-hidden bg-muted/50">
          <img 
            src={image} 
            alt={title}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
          
          {/* Creator info at top */}
          <div 
            className="absolute top-2 left-2 flex items-center gap-1.5 bg-black/50 backdrop-blur-sm rounded-full px-2 py-1"
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
              <BadgeCheck className="h-3 w-3 text-white fill-white/30" />
            )}
          </div>

          {/* Outcomes at bottom */}
          <div className="absolute bottom-0 left-0 right-0 p-2 space-y-1">
            <div className="grid grid-cols-2 gap-1.5">
              {displayOutcomes.slice(0, 4).map((outcome, index) => (
                <div 
                  key={index}
                  className={`text-center rounded-md px-2 py-1 border backdrop-blur-sm ${getOutcomeColor(outcome.color)}`}
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="text-xs font-semibold">{outcome.price}¢</div>
                  <div className="text-[10px] opacity-90 truncate">{outcome.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Title & Stats */}
        <div className="p-3 space-y-2">
          <h3 className="text-sm font-semibold leading-tight line-clamp-2 min-h-[2.5rem] group-hover:text-primary transition-colors">
            {title}
          </h3>
          
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <div className="flex items-center gap-1">
              <TrendingUp className="h-3 w-3" />
              <span>{volume}</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              <span>{endsIn}</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
