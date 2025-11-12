import { Card, CardContent } from "@/components/ui/card";
import { Clock, TrendingUp } from "lucide-react";
import { useNavigate } from "react-router-dom";

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
      case "success": return "text-success";
      case "destructive": return "text-destructive";
      default: return "text-primary";
    }
  };

  const topOutcome = displayOutcomes.reduce((max, outcome) => 
    outcome.price > max.price ? outcome : max
  );

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
          {/* Overlay with top outcome */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-3 text-white">
            <div className="flex items-center justify-between mb-2">
              <div className={`text-2xl font-bold ${getOutcomeColor(topOutcome.color)}`}>
                {topOutcome.price}¢
              </div>
              <div className="text-xs opacity-90">{topOutcome.label}</div>
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
