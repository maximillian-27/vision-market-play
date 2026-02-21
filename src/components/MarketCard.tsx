import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import { Clock, TrendingUp, Heart, MessageCircle, Share2, Repeat2, BadgeCheck } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { QuoteRepostDialog } from "@/components/QuoteRepostDialog";

interface Outcome {
  label: string;
  price: number;
  color?: string;
  logo?: string;
}

interface MarketCardProps {
  id: string;
  creator: {
    name: string;
    avatar: string;
    id?: string;
    isCreator?: boolean;
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
  hideEngagement?: boolean;
}

export function MarketCard({ id, creator, title, subtitle, image, outcomes, yesPrice, noPrice, volume, endsIn, likes = 0, comments = 0, hideEngagement = false }: MarketCardProps) {
  const navigate = useNavigate();
  const [showRepostDialog, setShowRepostDialog] = useState(false);
  
  const displayOutcomes = outcomes || [
    { label: "Yes", price: yesPrice || 0, color: "success" },
    { label: "No", price: noPrice || 0, color: "destructive" }
  ];

  const isBinary = displayOutcomes.length === 2 && !outcomes;

  return (
    <>
      <Card 
        className="overflow-hidden transition-all hover:bg-accent/30 cursor-pointer border-border/40"
        onClick={() => navigate(`/market/${id}`)}
      >
        <div className="flex gap-3 p-3">
          {/* Thumbnail */}
          <div className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-xl overflow-hidden bg-secondary flex-shrink-0">
            <img 
              src={image} 
              alt={title}
              className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
            {/* Creator badge */}
            <button 
              className="absolute bottom-1.5 left-1.5 flex items-center gap-1 bg-black/70 backdrop-blur-sm rounded-full px-1.5 py-0.5 hover:bg-black/80 transition-colors"
              onClick={(e) => {
                e.stopPropagation();
                const profilePath = creator.isCreator !== false 
                  ? `/creator/${creator.id || creator.name.toLowerCase().replace(/\s+/g, '-')}`
                  : `/profile/${creator.id || creator.name.toLowerCase().replace(/\s+/g, '-')}`;
                navigate(profilePath);
              }}
            >
              <Avatar className="h-4 w-4">
                <AvatarImage src={creator.avatar} alt={creator.name} />
                <AvatarFallback className="text-[7px]">{creator.name.slice(0, 2)}</AvatarFallback>
              </Avatar>
              <span className="text-white text-[10px] font-medium max-w-[60px] truncate">{creator.name.split(' ')[0]}</span>
              {creator.isCreator !== false && (
                <BadgeCheck className="h-3 w-3 text-white fill-white/30" />
              )}
            </button>
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0 flex flex-col">
            {/* Title */}
            <h3 className="text-sm sm:text-base font-semibold leading-snug line-clamp-2 group-hover:text-primary transition-colors">
              {title}
            </h3>
            
            {/* Stats */}
            <div className="flex items-center gap-3 text-xs text-muted-foreground mt-1.5 mb-2">
              <span className="flex items-center gap-1 font-bold text-gold bg-gold/15 border border-gold/20 rounded-full px-2.5 py-0.5 text-xs">
                {volume} Pot
              </span>
              <span className="flex items-center gap-1">
                <Clock className="h-3.5 w-3.5" />
                {endsIn}
              </span>
            </div>

            {/* Outcomes */}
            <div className="mt-auto">
              {isBinary ? (
                <div className="flex gap-2">
                  {displayOutcomes.map((outcome, index) => (
                    <button 
                      key={index}
                      className={`flex-1 rounded-lg py-2 text-center transition-all active:scale-[0.98] ${
                        outcome.color === 'success'
                          ? 'bg-success/10 hover:bg-success/15 text-success border border-success/20'
                          : 'bg-secondary hover:bg-secondary/80 text-muted-foreground border border-border/50'
                      }`}
                      onClick={(e) => e.stopPropagation()}
                    >
                      <div className="text-lg font-bold">{outcome.price}%</div>
                      <div className="text-[10px] font-medium">{outcome.label}</div>
                    </button>
                  ))}
                </div>
              ) : (
                <div className="flex flex-wrap gap-1.5">
                  {displayOutcomes.slice(0, 3).map((outcome, index) => (
                    <button 
                      key={index}
                      className="flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 bg-secondary/60 hover:bg-secondary border border-border/30 hover:border-border/50 transition-all active:scale-[0.98]"
                      onClick={(e) => e.stopPropagation()}
                    >
                      {outcome.logo ? (
                        <img src={outcome.logo} alt={outcome.label} className="h-4 w-4 object-contain" />
                      ) : (
                        <div className="h-4 w-4 rounded-full bg-primary/10 flex items-center justify-center text-[9px] font-bold text-primary">
                          {outcome.label.charAt(0)}
                        </div>
                      )}
                      <span className="text-xs font-medium">{outcome.label}</span>
                      <span className="text-xs font-bold text-primary">{outcome.price}%</span>
                    </button>
                  ))}
                  {displayOutcomes.length > 3 && (
                    <span className="text-[10px] text-muted-foreground self-center">+{displayOutcomes.length - 3}</span>
                  )}
                </div>
              )}
            </div>

            {/* Engagement */}
            {!hideEngagement && (
              <div className="flex items-center gap-1 mt-2 -ml-1.5">
                <button 
                  className="flex items-center gap-1 px-1.5 py-1 rounded-md hover:bg-muted/60 text-muted-foreground hover:text-foreground transition-all text-xs"
                  onClick={(e) => e.stopPropagation()}
                >
                  <Heart className="h-3.5 w-3.5" />
                  {likes > 0 && <span>{likes}</span>}
                </button>
                <button 
                  className="flex items-center gap-1 px-1.5 py-1 rounded-md hover:bg-muted/60 text-muted-foreground hover:text-foreground transition-all text-xs"
                  onClick={(e) => e.stopPropagation()}
                >
                  <MessageCircle className="h-3.5 w-3.5" />
                  {comments > 0 && <span>{comments}</span>}
                </button>
                <button 
                  className="flex items-center gap-1 px-1.5 py-1 rounded-md hover:bg-muted/60 text-muted-foreground hover:text-foreground transition-all"
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowRepostDialog(true);
                  }}
                >
                  <Repeat2 className="h-3.5 w-3.5" />
                </button>
                <button 
                  className="flex items-center gap-1 px-1.5 py-1 rounded-md hover:bg-muted/60 text-muted-foreground hover:text-foreground transition-all ml-auto"
                  onClick={(e) => e.stopPropagation()}
                >
                  <Share2 className="h-3.5 w-3.5" />
                </button>
              </div>
            )}
          </div>
        </div>
      </Card>

      <QuoteRepostDialog
        open={showRepostDialog}
        onOpenChange={setShowRepostDialog}
        marketTitle={title}
        marketImage={image}
      />
    </>
  );
}
